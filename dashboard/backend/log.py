"""Dashboard 应用日志 —— 落到 /root/hermes-dashboard/logs/dashboard.log。

错误中枢把这份文件当「网站后台」文件源（server/scripts/error-collector.py）。
所以这里只写 WARNING 及以上：采集器失败、未捕获异常、HTTP 5xx、启停。

同一 key 默认 10 分钟节流：某个采集器持续失败时，TTL 缓存每 20s 会重试一次，
不去重的话一天能刷出几千行，把错误档案淹掉。文件 2MB 轮转一份 `.log.1`，
不依赖 logrotate，也不写 systemd 之外的状态。
"""
from __future__ import annotations

import os
import threading
import time
import traceback
from datetime import datetime
from pathlib import Path

LOG_DIR = Path(os.environ.get("HERMES_DASHBOARD_LOG_DIR", "/root/hermes-dashboard/logs"))
LOG_PATH = LOG_DIR / "dashboard.log"
MAX_BYTES = 2 * 1024 * 1024
THROTTLE_SECONDS = 600

_lock = threading.Lock()
_last_emit: dict[str, float] = {}


def _timestamp() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S,%f")[:-3]


def _rotate_locked() -> None:
    try:
        if LOG_PATH.stat().st_size < MAX_BYTES:
            return
    except OSError:
        return
    try:
        os.replace(LOG_PATH, LOG_PATH.with_suffix(".log.1"))
    except OSError:
        pass


def log(level: str, message: str, *, throttle_key: str | None = None) -> None:
    """写一行；同 throttle_key 在 10 分钟内只落一次。写失败静默（日志不能反噬服务）。"""
    if throttle_key:
        now = time.monotonic()
        with _lock:
            if now - _last_emit.get(throttle_key, 0.0) < THROTTLE_SECONDS:
                return
            _last_emit[throttle_key] = now
    line = f"{_timestamp()} {level} dashboard: {message}"
    try:
        with _lock:
            _rotate_locked()
            LOG_DIR.mkdir(parents=True, exist_ok=True)
            with LOG_PATH.open("a", encoding="utf-8", errors="replace") as fh:
                fh.write(line + "\n")
    except OSError:
        pass


def warning(message: str, *, throttle_key: str | None = None) -> None:
    log("WARNING", message, throttle_key=throttle_key)


def error(message: str, exc: BaseException | None = None, *,
          throttle_key: str | None = None) -> None:
    if exc is not None:
        message = f"{message}: {type(exc).__name__}: {exc}"
    log("ERROR", message, throttle_key=throttle_key or message[:120])


def exception(message: str) -> None:
    """未捕获异常：带 traceback（采集器会把续行吸附进同一组）。"""
    log("ERROR", f"{message}\n{traceback.format_exc().rstrip()}")
