"""Hermes dashboard backend — read-only FastAPI sidecar.

Run locally:
    uvicorn app:app --host 127.0.0.1 --port 8787
Demo (no server data required):
    HERMES_DASHBOARD_DEMO=1 uvicorn app:app --host 127.0.0.1 --port 8787
"""
from __future__ import annotations

import asyncio
import copy
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
import log as dlog
from cache import CACHE
from collectors import (activity, board, drift, errors, events, halo, jobs, outputs,
                        overview, services, system, usage)
from util import DEMO, ROOT, envelope, iso, redact, tail, viewer_for

FRONTEND = Path(__file__).resolve().parent.parent / "frontend"
TTL = float(os.environ.get("HERMES_DASHBOARD_TTL", "20"))

app = FastAPI(title="Hermes Dashboard", docs_url=None, redoc_url=None)


class _NoCacheStatic:
    """StaticFiles sends no Cache-Control; behind the Cloudflare tunnel the
    edge keeps serving stale css/js for hours after each deploy. Force
    revalidation on every hit (ETag still answers 304)."""

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http" or scope.get("path", "").startswith("/api/"):
            await self.app(scope, receive, send)
            return

        async def send_no_cache(message):
            if message["type"] == "http.response.start":
                message.setdefault("headers", []).append((b"cache-control", b"no-cache"))
            await send(message)

        await self.app(scope, receive, send_no_cache)


app.add_middleware(_NoCacheStatic)

# Modules a guest must never reach.  /api/logs/stream is added separately so the
# gate answers 403 *before* any StreamingResponse/generator is created.
GUEST_BLOCKED = {
    "/api/errors", "/api/board", "/api/outputs",
    "/api/events", "/api/logs/recent", "/api/logs/stream",
}
GUEST_HIDDEN_BODY = {"ok": False, "hidden": True, "viewer": "guest",
                     "error": "hidden_in_guest_view"}


@app.middleware("http")
async def _guest_gate(request: Request, call_next):
    viewer = viewer_for(request)
    request.state.viewer = viewer
    if viewer == "guest" and request.url.path in GUEST_BLOCKED:
        return JSONResponse(GUEST_HIDDEN_BODY, status_code=403)
    path = request.url.path
    try:
        response = await call_next(request)
    except Exception:
        # 未捕获异常会由 Starlette 转成 500；这里先落盘，错误中枢才看得见。
        dlog.exception(f"unhandled {request.method} {path}")
        raise
    if response.status_code >= 500:
        dlog.error(f"HTTP {response.status_code} {request.method} {path}",
                   throttle_key=f"http:{path}:{response.status_code}")
    return response


def _viewer(request: Request) -> str:
    return getattr(request.state, "viewer", "owner")


def _load(name: str, loader, *args, **kwargs) -> dict:
    if DEMO:
        return demo.snapshot()[name.split(":", 1)[0]]
    try:
        return CACHE.get(name, TTL, lambda: loader(*args, **kwargs))
    except Exception as exc:  # one bad source must not take down the page
        dlog.error(f"{name} 采集失败", exc, throttle_key=f"collect:{name}")
        return {"error": redact(f"{type(exc).__name__}: {exc}")[:240],
                "_warnings": [f"{name} 采集失败"]}


def _respond(data: dict, warnings: list[str] | None = None,
             viewer: str = "owner") -> JSONResponse:
    payload = dict(data or {})
    extra = payload.pop("_warnings", []) or []
    all_warnings = list(warnings or []) + list(extra)
    if DEMO:
        all_warnings.insert(0, "演示数据 · 后端未连接真实数据源")
    return JSONResponse(jsonable_encoder(envelope(payload, all_warnings, viewer)))


GUEST_NOTE = "访客视图 · 部分模块隐藏"


def _guest_overview(data: dict) -> dict:
    """Strip every field derived from a hidden module (05/06/07/09/10).

    02 services and 11 system/drift are visible for guests, so service
    counts/API/uptime stay.
    """
    data = copy.deepcopy(data)
    g = data.setdefault("global", {})
    for key in ("overdue_tasks", "open_approvals"):
        g[key] = None
    g["note"] = GUEST_NOTE
    g.pop("label", None)
    roles = data.get("roles") or []
    for role in roles:
        role["metrics"] = []
    g["state"] = "degraded" if any(r.get("state") == "offline" for r in roles) else "ok"
    return data


GUEST_JOB_NAME = "秘密任务"
GUEST_JOB_KEYS = ("last_run", "next_run", "result")


def _guest_jobs(data: dict) -> dict:
    """04 只给访客时间轴：任务身份一律在服务端裁剪。

    时间轴只需要上次 / 下次 / 结果；任务名统一成「秘密任务」，其余字段
    （crontab id、命令行、计划、摘要等可能反推出身份的细节）全部不下发。
    前端再兜一层，缓存切换期也不会闪出真名。
    """
    data = copy.deepcopy(data)
    jobs = data.get("jobs")
    if not isinstance(jobs, list):
        return data
    data["jobs"] = [
        {"name": GUEST_JOB_NAME,
         **{key: job.get(key) for key in GUEST_JOB_KEYS}}
        for job in jobs
    ]
    return data


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
        dlog.error("drift 采集失败", exc, throttle_key="collect:drift")
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
        dlog.error("system:net 采集失败", exc, throttle_key="collect:system:net")
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
def health(request: Request) -> dict:
    viewer = _viewer(request)
    payload = {"ok": True, "service": "hermes-dashboard", "demo": DEMO, "generated_at": iso()}
    if viewer == "guest":
        payload["viewer"] = "guest"
    return payload


@app.get("/api/overview")
def api_overview(request: Request):
    viewer = _viewer(request)
    if DEMO:
        data = demo.snapshot()["overview"]
        return _respond(_guest_overview(data) if viewer == "guest" else data, viewer=viewer)
    try:
        with ThreadPoolExecutor(max_workers=7) as pool:
            futures = {
                # 01 角色卡的状态由 systemd 活跃度推导；services 只用于重算，
                # 裁剪后其中的明细（02）不会出现在响应里。
                "services": pool.submit(_services),
                "jobs": pool.submit(_jobs),
                "activity": pool.submit(_activity),
                "usage": pool.submit(lambda: _usage(False)),
            }
            if viewer != "guest":
                futures.update({
                    "errors": pool.submit(_errors),
                    "board": pool.submit(_board),
                    "outputs": pool.submit(_outputs),
                })
            loaded = {name: future.result() for name, future in futures.items()}
        data = overview.collect(loaded.get("services", {}), loaded.get("jobs", {}),
                                loaded.get("errors", {}), loaded.get("board", {}),
                                loaded.get("activity", {}), loaded.get("outputs", {}),
                                loaded.get("usage", {}))
        if viewer == "guest":
            data = _guest_overview(data)
    except Exception as exc:
        return _respond({"error": redact(f"{type(exc).__name__}: {exc}")[:240]},
                        ["overview 聚合失败"], viewer=viewer)
    return _respond(data, viewer=viewer)


@app.get("/api/services")
def api_services(request: Request):
    return _respond(_services(), viewer=_viewer(request))


@app.get("/api/jobs")
def api_jobs(request: Request):
    viewer = _viewer(request)
    data = _jobs()
    if viewer == "guest":
        data = _guest_jobs(data)
    return _respond(data, viewer=viewer)


@app.get("/api/activity")
def api_activity(request: Request, range: str = Query("7d", pattern="^(24h|7d)$")):
    data = _activity(range)
    data["range"] = range
    if DEMO and range == "24h":
        today = iso()[:10]
        cells = [c for c in data.get("cells", []) if c.get("date") == today]
        data["cells"] = cells
        data["total"] = sum(c.get("count", 0) for c in cells)
    return _respond(data, viewer=_viewer(request))


@app.get("/api/errors")
def api_errors(request: Request):
    return _respond(_errors(), viewer=_viewer(request))


@app.get("/api/board")
def api_board(request: Request):
    return _respond(_board(), viewer=_viewer(request))


@app.get("/api/outputs")
def api_outputs(request: Request):
    return _respond(_outputs(), viewer=_viewer(request))


@app.get("/api/usage")
def api_usage(request: Request):
    return _respond(_usage(), viewer=_viewer(request))


@app.get("/api/drift")
def api_drift(request: Request):
    return _respond(_drift(), viewer=_viewer(request))


@app.get("/api/system")
def api_system(request: Request):
    return _respond(_system(), viewer=_viewer(request))


@app.get("/api/events")
def api_events(request: Request):
    viewer = _viewer(request)
    if DEMO:
        return _respond(demo.snapshot()["events"], viewer=viewer)
    data = events.collect(_services(), _jobs(), _errors(), _board())
    return _respond(data, viewer=viewer)


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


def _halo_logs(limit: int = 40) -> list[dict]:
    """Owner-only EXEC LOG window: redacted tails woven across all four streams."""
    streams = [_log_tail(key, 10) for key in ("hanbao", "hamburger", "biubiu", "system")]
    rows: list[dict] = []
    for index in range(max((len(stream) for stream in streams), default=0)):
        for stream in streams:
            if index < len(stream):
                rows.append(stream[index])
    return [{"line": row["line"]} for row in rows[-limit:]]


# HERMES_PATCH: dashboard-sse-disconnect-v1
# 原来是同步生成器 + time.sleep：客户端断开后线程仍在跑，uvicorn 收尾会一直等这条连接，
# systemd 只能等满 TimeoutStopSec 再 SIGKILL（10-26 九次 502 的真凶）。
async def _follow(role: str, request: Request):
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
        if await request.is_disconnected():  # 客户端走了就收工，别拖住 shutdown
            return
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
            await asyncio.sleep(2)


@app.get("/api/logs/stream")
def api_logs_stream(request: Request, role: str = Query("all")):
    if DEMO:
        async def gen():
            lines = demo.snapshot()["logs"]
            yield _sse("log", {"role": "system", "source": "演示", "line": "演示日志流 · 后端未连接"})
            for line in lines:
                await asyncio.sleep(0.7)
                clock, _, text = line.partition(" ")
                yield _sse("log", {"role": role if role != "all" else "system", "source": "演示", "line": text, "time": clock})
            while True:
                if await request.is_disconnected():
                    return
                await asyncio.sleep(15)
                yield ": keepalive\n\n"
        return StreamingResponse(gen(), media_type="text/event-stream",
                                 headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})
    if role == "all":
        # one stream per role would require multiplexing; default to the main line
        role = "hanbao"
    return StreamingResponse(_follow(role, request), media_type="text/event-stream",
                             headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no",
                                      "Connection": "keep-alive"})


@app.get("/api/logs/recent")
def api_logs_recent(request: Request, role: str = "all"):
    if DEMO:
        return _respond({"lines": [{"role": "system", "source": "演示", "line": l} for l in demo.snapshot()["logs"]]},
                        viewer=_viewer(request))
    if role == "all":
        rows = []
        for key in ("hanbao", "hamburger", "biubiu", "system"):
            rows.extend(_log_tail(key, 10))
        rows = rows[-60:]
    else:
        rows = _log_tail(role, 40)
    return _respond({"lines": rows}, viewer=_viewer(request))


def _halo_data(viewer: str) -> dict:
    """One aggregate read for /halo/ — owner/guest split happens in halo.collect.

    `outputs` is loaded for guests too because `delivery_summary` (channel-level
    ok/failed counts) is derived from it; the raw items never leave the server.
    """
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = {
            "services": pool.submit(_services),
            "jobs": pool.submit(_jobs),
            "activity": pool.submit(_activity, "7d"),
            "activity_today": pool.submit(_activity, "24h"),
            "usage": pool.submit(_usage),
            "outputs": pool.submit(_outputs),
        }
        if viewer != "guest":
            futures["errors"] = pool.submit(_errors)
        loaded = {name: future.result() for name, future in futures.items()}

    errors_data = loaded.get("errors") or {}
    overview_data = overview.collect(
        loaded["services"], loaded["jobs"], errors_data, {},
        loaded["activity"], loaded["outputs"], loaded["usage"])
    events_data = (events.collect(loaded["services"], loaded["jobs"], errors_data, {})
                   if viewer != "guest" else {})
    data = halo.collect(
        loaded["services"], loaded["jobs"], loaded["activity"], loaded["activity_today"],
        loaded["usage"], overview_data,
        errors=errors_data,
        outputs=loaded["outputs"],
        events=events_data,
        logs=_halo_logs() if viewer != "guest" else [],
        viewer=viewer,
    )
    if viewer != "guest":
        warnings: list[str] = []
        for source in loaded.values():
            if isinstance(source, dict):
                warnings.extend(source.get("_warnings") or [])
        if warnings:
            data["_warnings"] = list(dict.fromkeys(warnings))
    return data


@app.get("/api/halo")
def api_halo(request: Request):
    viewer = _viewer(request)
    if DEMO:
        return _respond(halo.from_demo(demo.snapshot(), viewer), viewer=viewer)
    try:
        data = _halo_data(viewer)
    except Exception as exc:
        dlog.exception("halo 聚合失败")
        return _respond({"error": redact(f"{type(exc).__name__}: {exc}")[:240]},
                        ["halo 聚合失败"], viewer=viewer)
    return _respond(data, viewer=viewer)


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
        dlog.exception("启动预热失败")


@app.on_event("startup")
def _startup_warmup() -> None:
    threading.Thread(target=_warm_caches, name="warm-caches", daemon=True).start()


if FRONTEND.is_dir():
    app.mount("/", StaticFiles(directory=str(FRONTEND), html=True), name="frontend")
