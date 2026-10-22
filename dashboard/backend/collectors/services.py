"""systemd + local API port collector (read-only)."""
from __future__ import annotations

import re
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta

from util import (SERVICE_UNITS, TZ, UNIT_LABELS, human_bytes, iso, now, parse_iso,
                  redact, run, since_days)

PROPS = "Id,ActiveState,SubState,MainPID,NRestarts,MemoryCurrent,CPUUsageNSec,ActiveEnterTimestamp"
RE_JOURNAL = re.compile(r"^(\S+)\s+(\S+)\s+([^:\s][^:]*):\s?(.*)$")


def _unit_blocks(stdout: str) -> dict[str, dict[str, str]]:
    """`systemctl show unit1 unit2` prints one key=value block per unit."""
    blocks: dict[str, dict[str, str]] = {}
    current: dict[str, str] = {}
    for line in stdout.splitlines():
        if not line.strip():
            if current.get("Id"):
                blocks[current["Id"].removesuffix(".service")] = current
            current = {}
            continue
        if "=" not in line:
            continue
        key, _, value = line.partition("=")
        current[key] = value
    if current.get("Id"):
        blocks[current["Id"].removesuffix(".service")] = current
    return blocks


def _segments(unit: str, active: bool) -> tuple[list[dict], str]:
    """48 × 30min uptime strip for the trailing 24h."""
    end = now().replace(minute=0, second=0, microsecond=0) + timedelta(hours=1)
    start = end - timedelta(hours=24)
    rc, out, err = run(
        ["journalctl", "-u", unit, "--since", start.strftime("%Y-%m-%d %H:%M:%S"),
         "--no-pager", "-o", "short-iso"], timeout=6)
    events: list[tuple[datetime, bool]] = []
    if rc == 0:
        for line in out.splitlines():
            match = RE_JOURNAL.match(line)
            if not match:
                continue
            text = match.group(4)
            if "Started" in text or "Deactivated" not in text and "Starting" in text:
                state = True
            elif re.search(r"Stopping|Stopped|Deactivated|Failed with result|Main process exited", text):
                state = False
            else:
                continue
            try:
                ts = datetime.fromisoformat(match.group(1))
            except ValueError:
                continue
            events.append((ts.astimezone(TZ), state))
    events.sort(key=lambda item: item[0])

    state = active
    segments = []
    cursor = start
    for _ in range(48):
        seg_end = cursor + timedelta(minutes=30)
        for ts, value in events:
            if cursor <= ts < seg_end:
                state = value
        segments.append({"start": cursor.isoformat(timespec="minutes"), "up": state})
        cursor = seg_end
    last = "本周期无重启"
    if events:
        ts, value = events[-1]
        last = f"{ts.strftime('%H:%M:%S')} " + ("启动" if value else "停止")
    if rc != 0 and err:
        return segments, f"journal 不可用（{redact(err)[:80]}）"
    return segments, last


def _parse_systemd_ts(value: str | None) -> datetime | None:
    """systemd prints `Thu 2026-10-22 10:00:00 CST`, not ISO."""
    if not value or value.startswith("n/a"):
        return None
    match = re.search(r"(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})", value)
    if match:
        try:
            return datetime.fromisoformat(f"{match.group(1)}T{match.group(2)}").replace(tzinfo=TZ)
        except ValueError:
            return None
    return parse_iso(value)


def _probe_api() -> dict:
    checked = iso()
    for path in ("/health", "/"):
        url = f"http://127.0.0.1:8642{path}"
        try:
            request = urllib.request.Request(url, headers={"User-Agent": "HermesDashboard/1.0"})
            with urllib.request.urlopen(request, timeout=2.5) as response:
                return {"port": 8642, "ok": response.status < 500, "status": response.status,
                        "path": path, "checked": checked}
        except urllib.error.HTTPError as exc:
            return {"port": 8642, "ok": exc.code < 500, "status": exc.code,
                    "path": path, "checked": checked}
        except Exception:
            continue
    return {"port": 8642, "ok": False, "status": None, "path": None, "checked": checked}


def collect() -> dict:
    warnings: list[str] = []
    rc, out, err = run(["systemctl", "show", *SERVICE_UNITS, "-p", PROPS], timeout=10)
    blocks = _unit_blocks(out) if rc == 0 else {}
    if rc != 0:
        warnings.append(f"systemctl 不可用：{redact(err)[:120] or '无输出'}")

    units = []
    online = 0
    current_states = {
        unit: (blocks.get(unit, {}).get("ActiveState", "unknown") == "active")
        for unit in SERVICE_UNITS
    }
    with ThreadPoolExecutor(max_workers=6) as pool:
        segments_map = dict(zip(SERVICE_UNITS, pool.map(
            lambda unit: _segments(unit, current_states[unit]), SERVICE_UNITS)))
    for unit in SERVICE_UNITS:
        label, role = UNIT_LABELS[unit]
        block = blocks.get(unit, {})
        active = block.get("ActiveState", "unknown")
        sub = block.get("SubState", "unknown")
        if active == "active":
            online += 1
        memory_raw = block.get("MemoryCurrent", "")
        memory = int(memory_raw) if memory_raw.isdigit() else None
        cpu_ns = block.get("CPUUsageNSec", "")
        cpu = int(cpu_ns) / 1e9 if cpu_ns.isdigit() else None
        restarts = int(block["NRestarts"]) if block.get("NRestarts", "").isdigit() else None
        pid = int(block["MainPID"]) if block.get("MainPID", "").isdigit() else None
        entered = _parse_systemd_ts(block.get("ActiveEnterTimestamp"))
        uptime_s = (now() - entered).total_seconds() if entered and active == "active" else None
        segments, last_event = segments_map.get(unit, ([], "—"))
        if active == "active" and entered:
            last_event = f"{entered.strftime('%H:%M')} 启动"
        units.append({
            "unit": unit,
            "label": label,
            "role": role,
            "active": active,
            "sub": sub,
            "state": "active" if active == "active" else ("failed" if "failed" in sub or active == "failed" else "offline"),
            "pid": pid if pid else None,
            "restarts": restarts,
            "memory_bytes": memory,
            "memory_human": human_bytes(memory),
            "cpu_seconds": round(cpu, 1) if cpu is not None else None,
            "since": entered.isoformat(timespec="seconds") if entered else None,
            "uptime_seconds": int(uptime_s) if uptime_s else None,
            "segments": segments,
            "last_event": last_event,
        })

    api = _probe_api()
    if not api["ok"]:
        warnings.append("本地 API 端口 8642 探测失败")

    # restart tiers are already parsed in detail by error-collector.py; reuse its
    # authority by reading today's generated archive instead of duplicating logic.
    tiers = {"self_heal": [], "manual": [], "crash": []}
    archive = since_days(0).strftime("%Y-%m-%d")
    from util import ERRORS_DIR
    md = ERRORS_DIR / "daily" / f"{archive}.md"
    try:
        text = md.read_text(encoding="utf-8", errors="replace")
        for line in text.splitlines():
            if "失败自愈重启" in line:
                key = "crash" if "窗口外" in line else "self_heal"
                tiers[key].append({"text": redact(line.lstrip("- ").strip())})
            elif "手动重启" in line:
                tiers["manual"].append({"text": redact(line.lstrip("- ").strip())})
    except OSError:
        pass

    return {
        "units": units,
        "api": api,
        "restart_tiers": tiers,
        "summary": {"total": len(SERVICE_UNITS), "online": online,
                    "restarts_24h": sum(u["restarts"] or 0 for u in units)},
        "_warnings": warnings,
    }
