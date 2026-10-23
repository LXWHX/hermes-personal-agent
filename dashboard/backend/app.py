"""Hermes dashboard backend — read-only FastAPI sidecar.

Run locally:
    uvicorn app:app --host 127.0.0.1 --port 8787
Demo (no server data required):
    HERMES_DASHBOARD_DEMO=1 uvicorn app:app --host 127.0.0.1 --port 8787
"""
from __future__ import annotations

import json
import os
import threading
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from typing import Any

from fastapi import FastAPI, Query, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles

import demo
from cache import CACHE
from collectors import activity, board, drift, errors, events, jobs, outputs, overview, services, system, usage
from util import DEMO, ROOT, envelope, iso, redact, tail

FRONTEND = Path(__file__).resolve().parent.parent / "frontend"
TTL = float(os.environ.get("HERMES_DASHBOARD_TTL", "20"))

app = FastAPI(title="Hermes Dashboard", docs_url=None, redoc_url=None)


def _load(name: str, loader, *args, **kwargs) -> dict:
    if DEMO:
        return demo.snapshot()[name.split(":", 1)[0]]
    try:
        return CACHE.get(name, TTL, lambda: loader(*args, **kwargs))
    except Exception as exc:  # one bad source must not take down the page
        return {"error": redact(f"{type(exc).__name__}: {exc}")[:240],
                "_warnings": [f"{name} 采集失败"]}


def _respond(data: dict, warnings: list[str] | None = None) -> JSONResponse:
    payload = dict(data or {})
    extra = payload.pop("_warnings", []) or []
    all_warnings = list(warnings or []) + list(extra)
    if DEMO:
        all_warnings.insert(0, "演示数据 · 后端未连接真实数据源")
    return JSONResponse(jsonable_encoder(envelope(payload, all_warnings)))


def _services() -> dict:
    return _load("services", services.collect)


def _jobs() -> dict:
    return _load("jobs", jobs.collect)


def _errors() -> dict:
    return _load("errors", errors.collect)


def _board() -> dict:
    return _load("board", board.collect)


def _activity(range_: str = "7d") -> dict:
    days = 1 if range_ == "24h" else 7
    return _load(f"activity:{days}", activity.collect, days)


def _outputs() -> dict:
    return _load("outputs", outputs.collect)


def _usage(include_quota: bool = True) -> dict:
    if DEMO:
        return demo.snapshot()["usage"]
    if include_quota:
        return CACHE.get("usage", 60, usage.collect)
    return CACHE.get("usage:profiles", 45, lambda: usage.collect(False))


def _drift() -> dict:
    if DEMO:
        return demo.snapshot()["drift"]
    try:
        return CACHE.get("drift", 60, drift.collect)
    except Exception as exc:  # git may be missing or the repo may be gone
        return {"error": redact(f"{type(exc).__name__}: {exc}")[:240],
                "_warnings": ["drift 采集失败"]}


def _system() -> dict:
    if DEMO:
        return demo.snapshot()["system"]
    host = _load("system:host", system.collect_host)
    try:
        # outbound probes are slow; cache them longer than the /proc numbers
        net = CACHE.get("system:net", 120, system.collect_network)
    except Exception as exc:
        net = {"network": None, "checked": None,
               "_warnings": [f"system:net 采集失败：{redact(str(exc))[:120]}"]}
    merged = {key: value for key, value in host.items() if key != "_warnings"}
    merged["network"] = net.get("network")
    merged["checked"] = net.get("checked")
    warnings = list(host.get("_warnings") or []) + list(net.get("_warnings") or [])
    if warnings:
        merged["_warnings"] = warnings
    return merged


@app.get("/health")
def health() -> dict:
    return {"ok": True, "service": "hermes-dashboard", "demo": DEMO, "generated_at": iso()}


@app.get("/api/overview")
def api_overview():
    if DEMO:
        return _respond(demo.snapshot()["overview"])
    try:
        with ThreadPoolExecutor(max_workers=7) as pool:
            futures = {
                "services": pool.submit(_services),
                "jobs": pool.submit(_jobs),
                "errors": pool.submit(_errors),
                "board": pool.submit(_board),
                "activity": pool.submit(_activity),
                "outputs": pool.submit(_outputs),
                "usage": pool.submit(lambda: _usage(False)),
            }
            loaded = {name: future.result() for name, future in futures.items()}
        data = overview.collect(loaded["services"], loaded["jobs"], loaded["errors"],
                                loaded["board"], loaded["activity"], loaded["outputs"],
                                loaded["usage"])
    except Exception as exc:
        return _respond({"error": redact(f"{type(exc).__name__}: {exc}")[:240]},
                        ["overview 聚合失败"])
    return _respond(data)


@app.get("/api/services")
def api_services():
    return _respond(_services())


@app.get("/api/jobs")
def api_jobs():
    return _respond(_jobs())


@app.get("/api/activity")
def api_activity(range: str = Query("7d", pattern="^(24h|7d)$")):
    data = _activity(range)
    data["range"] = range
    if DEMO and range == "24h":
        today = iso()[:10]
        cells = [c for c in data.get("cells", []) if c.get("date") == today]
        data["cells"] = cells
        data["total"] = sum(c.get("count", 0) for c in cells)
    return _respond(data)


@app.get("/api/errors")
def api_errors():
    return _respond(_errors())


@app.get("/api/board")
def api_board():
    return _respond(_board())


@app.get("/api/outputs")
def api_outputs():
    return _respond(_outputs())


@app.get("/api/usage")
def api_usage():
    return _respond(_usage())


@app.get("/api/drift")
def api_drift():
    return _respond(_drift())


@app.get("/api/system")
def api_system():
    return _respond(_system())


@app.get("/api/events")
def api_events():
    if DEMO:
        return _respond(demo.snapshot()["events"])
    data = events.collect(_services(), _jobs(), _errors(), _board())
    return _respond(data)


LOG_FILES = {
    "hanbao": [ROOT / ".hermes" / "logs" / "hermes.log", ROOT / ".hermes" / "logs" / "errors.log"],
    "hamburger": [ROOT / ".hermes" / "profiles" / "hamburger" / "logs" / "hermes.log",
                  ROOT / ".hermes" / "profiles" / "hamburger" / "logs" / "errors.log"],
    "biubiu": [ROOT / "hermes-biubiu" / "biubiu.log", ROOT / "hermes-biubiu" / "logs" / "biubiu.log"],
    "system": [ROOT / "hermes-errors" / "collector.log", ROOT / "hermes-errors" / "watcher.log",
               ROOT / "hermes-digest" / "digest.log"],
}
ROLE_LABEL = {"hanbao": "憨包", "hamburger": "汉堡", "biubiu": "biubiu", "system": "系统"}


def _sse(event: str, data: Any) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


def _log_tail(role: str, lines: int = 30) -> list[dict]:
    rows: list[dict] = []
    for path in LOG_FILES.get(role, []):
        for line in tail(path, lines):
            if line.strip():
                rows.append({"role": role, "source": ROLE_LABEL.get(role, role), "line": redact(line)[:800]})
    return rows[-lines:]


def _follow(role: str):
    offsets: dict[Path, int] = {}
    paths = LOG_FILES.get(role, [])
    for path in paths:
        try:
            offsets[path] = max(0, path.stat().st_size - 8000)
        except OSError:
            offsets[path] = 0

    for row in _log_tail(role, 25):
        yield _sse("log", row)

    last_ping = time.monotonic()
    while True:
        wrote = False
        for path in paths:
            try:
                size = path.stat().st_size
            except OSError:
                continue
            start = offsets.get(path, 0)
            if size < start:
                start = 0
            if size > start:
                try:
                    with path.open("rb") as fh:
                        fh.seek(start)
                        raw = fh.read(min(size - start, 200_000))
                        offsets[path] = fh.tell()
                    chunk = raw.decode("utf-8", errors="replace")
                except OSError:
                    continue
                for line in chunk.splitlines():
                    if line.strip():
                        wrote = True
                        yield _sse("log", {"role": role, "source": ROLE_LABEL.get(role, role),
                                          "line": redact(line)[:800]})
        now_mono = time.monotonic()
        if now_mono - last_ping > 15:
            # Cloudflare Tunnel tears down idle streams at ~100s.
            yield ": keepalive\n\n"
            last_ping = now_mono
        if not wrote:
            time.sleep(2)


@app.get("/api/logs/stream")
def api_logs_stream(request: Request, role: str = Query("all")):
    if DEMO:
        def gen():
            lines = demo.snapshot()["logs"]
            yield _sse("log", {"role": "system", "source": "演示", "line": "演示日志流 · 后端未连接"})
            for line in lines:
                time.sleep(0.7)
                clock, _, text = line.partition(" ")
                yield _sse("log", {"role": role if role != "all" else "system", "source": "演示", "line": text, "time": clock})
            while True:
                time.sleep(15)
                yield ": keepalive\n\n"
        return StreamingResponse(gen(), media_type="text/event-stream",
                                 headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})
    if role == "all":
        # one stream per role would require multiplexing; default to the main line
        role = "hanbao"
    return StreamingResponse(_follow(role), media_type="text/event-stream",
                             headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no",
                                      "Connection": "keep-alive"})


@app.get("/api/logs/recent")
def api_logs_recent(role: str = "all"):
    if DEMO:
        return _respond({"lines": [{"role": "system", "source": "演示", "line": l} for l in demo.snapshot()["logs"]]})
    if role == "all":
        rows = []
        for key in ("hanbao", "hamburger", "biubiu", "system"):
            rows.extend(_log_tail(key, 10))
        rows = rows[-60:]
    else:
        rows = _log_tail(role, 40)
    return _respond({"lines": rows})


def _warm_caches() -> None:
    """Fill the expensive collectors before the first browser hits them."""
    if DEMO:
        return
    try:
        with ThreadPoolExecutor(max_workers=9) as pool:
            futures = [
                pool.submit(_services), pool.submit(_jobs), pool.submit(_errors),
                pool.submit(_board), pool.submit(_activity), pool.submit(_outputs),
                pool.submit(_usage), pool.submit(_drift), pool.submit(_system),
            ]
            for future in futures:
                future.result()
    except Exception:
        pass


@app.on_event("startup")
def _startup_warmup() -> None:
    threading.Thread(target=_warm_caches, name="warm-caches", daemon=True).start()


if FRONTEND.is_dir():
    app.mount("/", StaticFiles(directory=str(FRONTEND), html=True), name="frontend")
