"""Shared helpers: paths, time, subprocess and redaction.

Everything here is read-only by design.  No helper writes to a monitored path.
"""
from __future__ import annotations

import json
import os
import re
import subprocess
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

TZ = ZoneInfo(os.environ.get("HERMES_DASHBOARD_TZ", "Asia/Shanghai"))

ROOT = Path(os.environ.get("HERMES_DASHBOARD_ROOT", "/root"))
ERRORS_DIR = Path(os.environ.get("HERMES_ERRORS_DIR", str(ROOT / "hermes-errors")))
BOARD_DIR = Path(os.environ.get("HERMES_BOARD_DIR", str(ROOT / "hermes-board")))
STATE_DB = Path(os.environ.get("HERMES_STATE_DB", str(ROOT / ".hermes" / "state.db")))
LIVE_LOG = Path(os.environ.get("HERMES_LIVE_LOG", str(ROOT / ".hermes" / "logs" / "hermes.log")))
DEMO = os.environ.get("HERMES_DASHBOARD_DEMO", "") not in ("", "0", "false", "False")

# Guest view: a hostname allow-list.  Only the `Host` header is trusted (never a
# query parameter) because 8787 is loopback-only and the outside world reaches it
# exclusively through the Cloudflare tunnel, which sets `Host` itself.
GUEST_HOSTS = {
    h.strip().lower()
    for h in os.environ.get("HERMES_DASHBOARD_GUEST_HOSTS", "").split(",")
    if h.strip()
}
# Local-only override for eyeballing the guest layout against demo data.
FORCE_VIEWER = os.environ.get("HERMES_DASHBOARD_FORCE_VIEWER", "").strip().lower()

UNIT_LABELS = {
    "hermes-gateway": ("憨包网关", "telegram"),
    "hermes-heybox": ("汉堡大王", "heybox"),
    "hermes-biubiu": ("biubiu 房间", "biubiu"),
    "hermes-eye": ("汉堡之眼", "hamburger"),
    "hamburger-nightwatch": ("夜巡", "hamburger"),
    "hamburger-guild-guard": ("公会守卫", "hamburger"),
    "hermes-kb": ("问答知识库", "kb"),
}
SERVICE_UNITS = list(UNIT_LABELS)


def now() -> datetime:
    return datetime.now(TZ)


def iso(dt: datetime | None = None) -> str:
    return (dt or now()).isoformat(timespec="seconds")


def parse_iso(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
        return dt if dt.tzinfo else dt.replace(tzinfo=TZ)
    except (ValueError, TypeError):
        return None


def run(cmd: list[str], timeout: float = 8, check: bool = False,
        env: dict[str, str] | None = None) -> tuple[int, str, str]:
    """Run a command without a shell.  Returns (rc, stdout, stderr)."""
    try:
        proc = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=timeout,
            encoding="utf-8",
            errors="replace",
            env=env,
        )
        if check and proc.returncode != 0:
            raise RuntimeError((proc.stderr or proc.stdout).strip()[:300])
        return proc.returncode, proc.stdout, proc.stderr
    except FileNotFoundError:
        return 127, "", f"{cmd[0]} not found"
    except subprocess.TimeoutExpired:
        return 124, "", f"{cmd[0]} timed out after {timeout:g}s"
    except OSError as exc:
        return 1, "", f"{type(exc).__name__}: {exc}"


def read_json(path: Path, default: Any = None) -> Any:
    try:
        with path.open(encoding="utf-8", errors="replace") as fh:
            return json.load(fh)
    except FileNotFoundError:
        return default
    except (OSError, json.JSONDecodeError):
        return default


def read_text(path: Path, limit: int = 200_000) -> str:
    try:
        with path.open(encoding="utf-8", errors="replace") as fh:
            return fh.read(limit)
    except OSError:
        return ""


def tail(path: Path, lines: int = 80, limit: int = 400_000) -> list[str]:
    """Read the tail of a file without slurping a giant log into memory."""
    try:
        size = path.stat().st_size
        with path.open("rb") as fh:
            if size > limit:
                fh.seek(-limit, os.SEEK_END)
            raw = fh.read().decode("utf-8", errors="replace")
        return raw.splitlines()[-lines:]
    except OSError:
        return []


def human_bytes(value: float | int | None) -> str:
    if value is None:
        return "—"
    value = float(value)
    for unit in ("B", "KB", "MB", "GB", "TB"):
        if abs(value) < 1024 or unit == "TB":
            return f"{value:.0f} {unit}" if unit in ("B", "KB") else f"{value:.1f} {unit}"
        value /= 1024
    return "—"


def human_duration(seconds: float | None) -> str:
    if seconds is None or seconds < 0:
        return "—"
    seconds = int(seconds)
    days, rem = divmod(seconds, 86400)
    hours, rem = divmod(rem, 3600)
    minutes = rem // 60
    if days:
        return f"{days}d {hours}h"
    if hours:
        return f"{hours}h {minutes}m"
    return f"{minutes}m"


# --- redaction -------------------------------------------------------------
# The browser must never receive keys, chat ids, IPs or absolute paths.
_IPV4 = re.compile(r"\b(?:\d{1,3}\.){3}\d{1,3}\b")
_LONG_NUM = re.compile(r"\b\d{7,}\b")
_SECRET = re.compile(
    r"(?i)\b(?:sk|pk|key|token|secret|bearer)[-_ ]?[A-Za-z0-9._~+/=-]{12,}"
)
_BEARER = re.compile(r"(?i)\bauthorization:\s*bearer\s+\S+")
_ENV = re.compile(r"(?im)^([A-Z0-9_]*(?:KEY|TOKEN|SECRET|CHAT_ID|PASSWORD)[A-Z0-9_]*)=\S+")
_ABS = re.compile(r"(?<![\w.])/(?:root|home|var|etc|proc|tmp)/[\w./-]+")


def redact(text: str) -> str:
    text = _ENV.sub(lambda m: m.group(1) + "=***", text)
    text = _BEARER.sub("Authorization: Bearer ***", text)
    text = _SECRET.sub(lambda m: (m.group(0)[:3] if m.group(0)[:3].lower() in ("sk-", "pk-") else "") + "***", text)
    text = _IPV4.sub("***.***.***.***", text)
    text = _LONG_NUM.sub(lambda m: m.group(0)[:2] + "…" + m.group(0)[-2:], text)
    text = _ABS.sub("…/…", text)
    return text


def error(message: str) -> dict[str, Any]:
    """Uniform per-source degradation payload."""
    return {"error": redact(str(message))[:300]}


def envelope(data: Any, warnings: list[str] | None = None, viewer: str = "owner") -> dict[str, Any]:
    return {
        "ok": True,
        "generated_at": iso(),
        "data": data,
        "warnings": warnings or [],
        "demo": DEMO,
        "viewer": viewer,
    }


def viewer_for(request) -> str:
    """owner | guest.

    Default is owner: DEMO mode and an empty allow-list never expose the guest
    view.  ``HERMES_DASHBOARD_FORCE_VIEWER`` is a local-only escape hatch for
    eyeballing the guest layout; it is not read from the request.
    """
    if FORCE_VIEWER in ("guest", "owner"):
        return FORCE_VIEWER
    if DEMO or not GUEST_HOSTS:
        return "owner"
    host = (request.headers.get("host") or "").split(":")[0].strip().lower()
    return "guest" if host in GUEST_HOSTS else "owner"


def since_days(days: int) -> datetime:
    return now() - timedelta(days=days)
