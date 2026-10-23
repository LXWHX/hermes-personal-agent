"""Host resource collector — load, memory, swap, disk, the two memory-hardening
knobs and outbound reachability of the platforms the agents depend on.

/proc is the source; anything unreadable becomes None instead of a guess.
A 4xx/5xx answer from a probe still proves the network path is alive — only
timeouts, DNS and connection failures count as unreachable.
"""
from __future__ import annotations

import os
import shutil
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor

from util import iso, run

# Public endpoints only; no credentials are attached.
PROBES = [
    ("telegram", "Telegram API", "https://api.telegram.org/"),
    ("discord", "Discord API", "https://discord.com/api/v10/gateway"),
    ("xiaoheihe", "小黑盒", "https://chat.xiaoheihe.cn/"),
    ("opencode", "OpenCode", "https://opencode.ai/"),
]
UA = "HermesDashboard/1.0"


def _read(path: str) -> str:
    try:
        with open(path, encoding="ascii", errors="replace") as fh:
            return fh.read()
    except OSError:
        return ""


def _meminfo() -> dict[str, int]:
    """Parse /proc/meminfo kB values into bytes."""
    out: dict[str, int] = {}
    for line in _read("/proc/meminfo").splitlines():
        key, _, rest = line.partition(":")
        fields = rest.split()
        if fields and fields[0].isdigit():
            out[key] = int(fields[0]) * 1024
    return out


def collect_host() -> dict:
    cores = os.cpu_count()
    fields = _read("/proc/loadavg").split()
    try:
        load = [float(v) for v in fields[:3]]
    except ValueError:
        load = None
    uptime_fields = _read("/proc/uptime").split()
    try:
        uptime_seconds = int(float(uptime_fields[0]))
    except (ValueError, IndexError):
        uptime_seconds = None

    mem = _meminfo()
    total = mem.get("MemTotal")
    available = mem.get("MemAvailable", mem.get("MemFree"))
    memory = {
        "total": total,
        "available": available,
        "used_pct": round((total - available) / total * 100, 1)
                    if total and available is not None else None,
    }
    swap = {"total": None, "used": None, "used_pct": None}
    swap_total = mem.get("SwapTotal") or 0
    if swap_total:
        used = swap_total - (mem.get("SwapFree") or 0)
        swap = {"total": swap_total, "used": used,
                "used_pct": round(used / swap_total * 100, 1)}

    raw = _read("/proc/sys/vm/swappiness").strip()
    swappiness = int(raw) if raw.isdigit() else None

    disk = None
    try:
        usage = shutil.disk_usage("/")
        disk = {"total": usage.total, "used": usage.used, "free": usage.free,
                "percent": round(usage.used / usage.total * 100, 1)}
    except (OSError, ZeroDivisionError):
        pass

    # gateway memory hardening (2026-10-23): MALLOC_ARENA_MAX comes from the
    # unit's Environment, not the live process, so it survives restarts
    arena = None
    rc, out, _ = run(["systemctl", "show", "hermes-gateway", "-p", "Environment"], timeout=5)
    if rc == 0:
        for token in out.replace("Environment=", "").split():
            key, _, value = token.partition("=")
            if key == "MALLOC_ARENA_MAX" and value.isdigit():
                arena = int(value)

    warnings = []
    if load is None and uptime_seconds is None:
        warnings.append("procfs 不可用，主机指标缺失")
    return {
        "cores": cores,
        "load": load,
        "uptime_seconds": uptime_seconds,
        "memory": memory,
        "swap": swap,
        "swappiness": swappiness,
        "malloc_arena_max": arena,
        "disk": disk,
        "_warnings": warnings,
    }


def _probe(url: str) -> dict:
    started = time.perf_counter()
    try:
        request = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(request, timeout=4) as response:
            status = response.status
    except urllib.error.HTTPError as exc:  # answered, just refused — path is alive
        status = exc.code
    except Exception as exc:
        return {"ok": False, "status": None, "latency_ms": None, "error": type(exc).__name__}
    return {"ok": True, "status": status,
            "latency_ms": round((time.perf_counter() - started) * 1000)}


def collect_network() -> dict:
    with ThreadPoolExecutor(max_workers=len(PROBES)) as pool:
        results = list(pool.map(lambda probe: _probe(probe[2]), PROBES))
    network = [{"id": pid, "name": name, **result}
               for (pid, name, _), result in zip(PROBES, results)]
    down = [item["name"] for item in network if not item["ok"]]
    return {
        "network": network,
        "checked": iso(),
        "_warnings": [f"出站不可达：{'、'.join(down)}"] if down else [],
    }
