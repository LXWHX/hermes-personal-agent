"""Read-only activity statistics from ~/.hermes/state.db.

WAL requires `mode=ro` (never `immutable=1`), otherwise new rows are invisible.
The schema is introspected instead of hard-coded; when the DB is absent or the
shape is unknown the collector returns a warning instead of guessing counts.
"""
from __future__ import annotations

import sqlite3
from collections import Counter
from datetime import date, timedelta

from util import STATE_DB, now, redact

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


def _connect():
    uri = f"file:{STATE_DB.as_posix()}?mode=ro"
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
    """Return (message table, timestamp column, profile column)."""
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


def collect(days: int = 7) -> dict:
    warnings: list[str] = []
    if not STATE_DB.is_file():
        return {"range": f"{days}d", "cells": [], "roles": [], "total": 0,
                "peak": None, "available": False,
                "_warnings": [f"state.db 不存在：{STATE_DB.name}"]}
    try:
        con = _connect()
    except sqlite3.Error as exc:
        return {"range": f"{days}d", "cells": [], "roles": [], "total": 0,
                "peak": None, "available": False,
                "_warnings": [f"state.db 打开失败：{redact(str(exc))[:120]}"]}

    try:
        table = _tables(con)
        name, ts_col, profile_col = _pick(table)
        if not name or not ts_col:
            return {"range": f"{days}d", "cells": [], "roles": [], "total": 0,
                    "peak": None, "available": False,
                    "_warnings": ["无法识别 state.db 的表结构（未找到消息表 / 时间列）"]}

        sample = con.execute(f'SELECT "{ts_col}" AS ts FROM "{name}" ORDER BY "{ts_col}" DESC LIMIT 1').fetchone()
        numeric = isinstance(sample["ts"], (int, float)) if sample else False
        if numeric:
            raw = sample["ts"]
            # seconds vs milliseconds
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
            f'FROM "{name}" '
            f'WHERE date({dt_expr}) >= ? '
            f'GROUP BY profile, day, hour'
        )
        rows = con.execute(sql, (cutoff,)).fetchall()
    except sqlite3.Error as exc:
        con.close()
        return {"range": f"{days}d", "cells": [], "roles": [], "total": 0,
                "peak": None, "available": False,
                "_warnings": [f"state.db 查询失败：{redact(str(exc))[:140]}"]}
    finally:
        try:
            con.close()
        except sqlite3.Error:
            pass

    cells = []
    totals: Counter[str] = Counter()
    for row in rows:
        role = _normalize_role(row["profile"])
        if role == "system":
            continue
        cells.append({"role": role, "date": row["day"], "hour": int(row["hour"] or 0), "count": int(row["n"])})
        totals[role] += int(row["n"])

    if not cells:
        warnings.append("今日窗口内没有消息元数据")
    if not profile_col:
        warnings.append("state.db 无 profile 列，消息计数无法按角色拆分")

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
