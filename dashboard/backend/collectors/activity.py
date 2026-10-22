"""Read-only activity statistics from Hermes state databases.

There is one SQLite DB per profile:
  ~/.hermes/state.db                       -> 憨包 (default)
  ~/.hermes/profiles/hamburger/state.db    -> 汉堡 (Discord)
  ~/.hermes/profiles/heybox/state.db       -> 汉堡 (小黑盒)
  ~/.hermes/profiles/biubiu/state.db       -> biubiu
All are opened with `mode=ro` (never `immutable=1`), and only role/timestamp
metadata is read — never message content.
"""
from __future__ import annotations

import sqlite3
from collections import Counter
from datetime import date, timedelta

from util import ROOT, STATE_DB, now, redact

STATE_DB_SOURCES = [
    (STATE_DB, "hanbao"),
    (ROOT / ".hermes" / "profiles" / "hamburger" / "state.db", "hamburger"),
    (ROOT / ".hermes" / "profiles" / "heybox" / "state.db", "hamburger"),
    (ROOT / ".hermes" / "profiles" / "biubiu" / "state.db", "biubiu"),
]

ROLE_MAP = {
    "default": "hanbao", "hanbao": "hanbao", "憨包": "hanbao", "main": "hanbao",
    "hamburger": "hamburger", "汉堡": "hamburger",
    "heybox": "hamburger",
    "biubiu": "biubiu", "铲铲": "biubiu",
    "system": "system", "cron": "system",
}
TIME_CANDIDATES = ("created_at", "timestamp", "time", "ts", "created", "date", "updated_at")
PROFILE_CANDIDATES = ("profile", "agent", "profile_name", "bot", "source")
MESSAGE_TABLES = ("messages", "message", "history", "conversation", "chat_messages")


def _connect(path):
    uri = f"file:{path.as_posix()}?mode=ro"
    con = sqlite3.connect(uri, uri=True, timeout=3)
    con.row_factory = sqlite3.Row
    return con


def _tables(con) -> dict[str, list[str]]:
    rows = con.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
    out = {}
    for row in rows:
        name = row["name"]
        if name.startswith("sqlite_"):
            continue
        cols = con.execute(f'PRAGMA table_info("{name}")').fetchall()
        out[name] = [c["name"] for c in cols]
    return out


def _pick(table: dict[str, list[str]]) -> tuple[str | None, str | None, str | None]:
    preferred = [t for t in table if t.lower() in MESSAGE_TABLES]
    candidates = preferred or [
        t for t, cols in table.items()
        if any(c in cols for c in ("content", "text", "body", "message"))
    ]
    for name in candidates:
        cols = table[name]
        ts = next((c for c in TIME_CANDIDATES if c in cols), None)
        if not ts:
            continue
        profile = next((c for c in PROFILE_CANDIDATES if c in cols), None)
        return name, ts, profile
    return None, None, None


def _normalize_role(value: str | None) -> str:
    if not value:
        return "unknown"
    key = str(value).strip().lower()
    return ROLE_MAP.get(key, key[:24])


def _sessions_rows(con, days: int) -> list | None:
    tables = {row[0] for row in con.execute("SELECT name FROM sqlite_master WHERE type='table'")}
    if not {"messages", "sessions"}.issubset(tables):
        return None
    msg_cols = {c["name"] for c in con.execute('PRAGMA table_info("messages")')}
    ses_cols = {c["name"] for c in con.execute('PRAGMA table_info("sessions")')}
    if not ({"session_id", "timestamp", "role"} <= msg_cols and
            {"id", "profile_name"} <= ses_cols):
        return None
    sql = (
        "SELECT s.profile_name AS profile, "
        "date(m.timestamp, 'unixepoch', '+8 hours') AS day, "
        "CAST(strftime('%H', m.timestamp, 'unixepoch', '+8 hours') AS INTEGER) AS hour, "
        "COUNT(*) AS n "
        "FROM messages m JOIN sessions s ON m.session_id = s.id "
        "WHERE m.role IN ('user', 'assistant') AND m.timestamp >= ? "
        "GROUP BY s.profile_name, day, hour"
    )
    cutoff = now().replace(hour=0, minute=0, second=0, microsecond=0).timestamp() - (days - 1) * 86400
    return list(con.execute(sql, (cutoff,)))


def _legacy_rows(con, table: dict, days: int) -> list | None:
    name, ts_col, profile_col = _pick(table)
    if not name or not ts_col:
        return None
    sample = con.execute(f'SELECT "{ts_col}" AS ts FROM "{name}" ORDER BY "{ts_col}" DESC LIMIT 1').fetchone()
    numeric = isinstance(sample["ts"], (int, float)) if sample else False
    if numeric:
        raw = sample["ts"]
        dt_expr = f'datetime("{ts_col}", "unixepoch")' if raw and raw < 10_000_000_000 else f'datetime("{ts_col}" / 1000, "unixepoch")'
    else:
        dt_expr = f'datetime("{ts_col}")'
    profile_expr = f'"{profile_col}"' if profile_col else "NULL"
    cutoff = (now().date() - timedelta(days=days - 1)).isoformat()
    sql = (
        f'SELECT {profile_expr} AS profile, '
        f'date({dt_expr}) AS day, '
        f'CAST(strftime("%H", {dt_expr}) AS INTEGER) AS hour, '
        f'COUNT(*) AS n '
        f'FROM "{name}" WHERE date({dt_expr}) >= ? '
        f'GROUP BY profile, day, hour'
    )
    return list(con.execute(sql, (cutoff,)))


def _collect_db(path, default_role: str, days: int) -> tuple[list[dict], list[str]]:
    """Return normalized cells and warnings for one profile database."""
    warnings: list[str] = []
    if not path.is_file():
        return [], []
    try:
        con = _connect(path)
    except sqlite3.Error as exc:
        return [], [f"{path.name} 打开失败：{redact(str(exc))[:100]}"]
    try:
        rows = _sessions_rows(con, days)
        joined = rows is not None
        if rows is None:
            rows = _legacy_rows(con, _tables(con), days)
        if rows is None:
            return [], [f"{path.name} 无法识别消息表结构"]
    except sqlite3.Error as exc:
        return [], [f"{path.name} 查询失败：{redact(str(exc))[:100]}"]
    finally:
        try:
            con.close()
        except sqlite3.Error:
            pass

    cells = []
    for row in rows:
        # Sidecar DBs only contain one agent; trust the directory mapping.
        role = default_role if path != STATE_DB else (_normalize_role(row["profile"]) if joined else _normalize_role(row["profile"]))
        if role == "system":
            continue
        cells.append({
            "role": role,
            "date": row["day"],
            "hour": int(row["hour"] or 0),
            "count": int(row["n"]),
        })
    return cells, warnings


def collect(days: int = 7) -> dict:
    warnings: list[str] = []
    cells: list[dict] = []
    seen = set()
    available = 0
    for path, role in STATE_DB_SOURCES:
        key = str(path)
        if key in seen:
            continue
        seen.add(key)
        if not path.is_file():
            continue
        available += 1
        part, db_warnings = _collect_db(path, role, days)
        warnings.extend(db_warnings)
        cells.extend(part)

    if not available:
        return {"range": f"{days}d", "cells": [], "roles": [], "total": 0,
                "peak": None, "available": False,
                "_warnings": [f"state.db 不存在：{STATE_DB.name}"]}

    totals: Counter[str] = Counter()
    for cell in cells:
        totals[cell["role"]] += cell["count"]

    if not cells:
        warnings.append("窗口内没有消息元数据")

    peak = max(cells, key=lambda c: c["count"]) if cells else None
    return {
        "range": f"{days}d",
        "cells": cells,
        "roles": list(totals.keys()),
        "totals": dict(totals),
        "total": sum(totals.values()),
        "peak": peak,
        "available": True,
        "_warnings": warnings,
    }
