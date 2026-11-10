"""Persistent quota samples for the /halo/ quota chart.

The public usage endpoint only exposes the *current* rolling/weekly/monthly
percentages; it has no history.  This module keeps a small SQLite ring of
samples (one every five minutes, 35 days) so the wall can draw a real time
series instead of a flat line.

The database is dashboard-owned, never a monitored data directory:
`/root/hermes-dashboard/quota-history.db` by default.  Writes are best-effort:
a read-only or missing directory simply yields an empty history.
"""
from __future__ import annotations

import math
import os
import sqlite3
import threading
from pathlib import Path

from util import ROOT, now

DB_PATH = Path(os.environ.get(
    "HERMES_DASHBOARD_QUOTA_DB",
    str(ROOT / "hermes-dashboard" / "quota-history.db"),
))
SAMPLE_SECONDS = 300          # one point every 5 minutes
KEEP_DAYS = 35
BUCKETS = {"rolling": 300, "weekly": 3600, "monthly": 10800}
WINDOW_SECONDS = {"rolling": 5 * 3600, "weekly": 7 * 86400, "monthly": 30 * 86400}
_LOCK = threading.Lock()


def _connect() -> sqlite3.Connection | None:
    con = None
    try:
        DB_PATH.parent.mkdir(parents=True, exist_ok=True)
        con = sqlite3.connect(DB_PATH, timeout=3)
        con.execute("PRAGMA journal_mode=WAL")
        con.execute(
            "CREATE TABLE IF NOT EXISTS samples ("
            "key TEXT NOT NULL, ts INTEGER NOT NULL, "
            "rolling REAL, weekly REAL, monthly REAL, remaining REAL, "
            "source TEXT NOT NULL DEFAULT 'api', "
            "PRIMARY KEY (key, ts))"
        )
        cols = {row[1] for row in con.execute("PRAGMA table_info(samples)")}
        if "source" not in cols:
            con.execute(
                "ALTER TABLE samples ADD COLUMN source TEXT NOT NULL DEFAULT 'api'"
            )
        return con
    except (OSError, sqlite3.Error):
        if con is not None:
            con.close()
        return None


def _float(value) -> float | None:
    try:
        number = float(value)
        return number if math.isfinite(number) else None
    except (TypeError, ValueError):
        return None


def _key(item: dict) -> str:
    return str(item.get("key") or item.get("label") or "quota")


def record(quota: list[dict]) -> None:
    """Append at most one sample per key per SAMPLE_SECONDS."""
    rows = []
    stamp = int(now().timestamp())
    for item in quota or []:
        if not item.get("available"):
            continue
        rows.append((
            _key(item), stamp,
            _float(item.get("rolling")),
            _float(item.get("weekly")),
            _float(item.get("monthly")),
            _float(item.get("remaining")),
        ))
    if not rows:
        return
    with _LOCK:
        con = _connect()
        if con is None:
            return
        try:
            for key, ts, rolling, weekly, monthly, remaining in rows:
                last = con.execute(
                    "SELECT ts FROM samples WHERE key=? AND source='api' "
                    "ORDER BY ts DESC LIMIT 1",
                    (key,),
                ).fetchone()
                if last and ts - int(last[0]) < SAMPLE_SECONDS:
                    continue
                con.execute(
                    "INSERT OR REPLACE INTO samples"
                    "(key, ts, rolling, weekly, monthly, remaining, source) "
                    "VALUES (?, ?, ?, ?, ?, ?, 'api')",
                    (key, ts, rolling, weekly, monthly, remaining),
                )
            con.execute("DELETE FROM samples WHERE ts < ?", (stamp - KEEP_DAYS * 86400,))
            con.commit()
        except sqlite3.Error:
            pass
        finally:
            con.close()


def _series(con: sqlite3.Connection, key: str, column: str, since: int,
            bucket: int) -> list[dict]:
    """Aggregate samples into fixed time buckets (5m / 1h / 3h)."""
    try:
        rows = con.execute(
            f"SELECT (ts / ?) * ? AS t, AVG({column}) AS v, "
            f"MIN(CASE WHEN source='ccswitch' THEN 1 ELSE 0 END) AS est "
            f"FROM samples WHERE key=? AND ts>=? AND {column} IS NOT NULL "
            f"GROUP BY ts / ? ORDER BY t",
            (bucket, bucket, key, since, bucket),
        ).fetchall()
        last = con.execute(
            f"SELECT ts, {column}, source FROM samples "
            f"WHERE key=? AND {column} IS NOT NULL "
            "ORDER BY ts DESC LIMIT 1",
            (key,),
        ).fetchone()
    except sqlite3.Error:
        return []
    if not rows:
        return []
    out = [
        {"t": int(row[0]), "v": round(float(row[1]), 1), "est": bool(row[2])}
        for row in rows
    ]
    # Keep the exact newest sample even when it sits inside the current bucket.
    if last and int(last[0]) > out[-1]["t"]:
        out.append({
            "t": int(last[0]),
            "v": round(float(last[1]), 1),
            "est": last[2] == "ccswitch",
        })
    return out


def attach(usage: dict) -> dict:
    """Return a shallow copy of `usage` whose quota items carry a compact history.

    `/api/usage` keeps its original lean shape; only the halo aggregate calls
    this.  The current sample is recorded first, so a fresh page always has at
    least one point.
    """
    quota = usage.get("quota") or []
    record(quota)
    stamp = int(now().timestamp())
    histories: dict[str, dict] = {}
    with _LOCK:
        con = _connect()
        if con is not None:
            try:
                for item in quota:
                    key = _key(item)
                    histories[key] = {
                        name: _series(con, key, name, stamp - window,
                                      BUCKETS[name])
                        for name, window in WINDOW_SECONDS.items()
                    }
            finally:
                con.close()
    out = dict(usage)
    out["quota"] = []
    for item in quota:
        copy = dict(item)
        copy["history"] = histories.get(_key(item)) or {
            name: [] for name in WINDOW_SECONDS
        }
        out["quota"].append(copy)
    return out
