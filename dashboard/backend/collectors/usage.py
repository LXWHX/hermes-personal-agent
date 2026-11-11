"""Quota + token usage.

Quota comes from OpenCode Go's key-authenticated usage endpoint:
GET https://opencode.ai/zen/go/v1/usage  ->  usage.{rolling,weekly,monthly}.
Keys are read server-side only and never serialized.

Token usage comes from each profile's Hermes state.db (sessions table):
one DB per profile, opened read-only.  Per-request latency and failure counts
are not stored by Hermes, so they stay `null` instead of being estimated.
"""
from __future__ import annotations

import hashlib
import json
import sqlite3
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import timedelta
from pathlib import Path

from util import ROOT, STATE_DB, now, redact

USAGE_URL = "https://opencode.ai/zen/go/v1/usage"
UA = "HermesDashboard/1.0"
SOURCES = [
    ("main", "主线路", ROOT / ".hermes" / ".env", "OPENCODE_GO_API_KEY"),
    ("hamburger", "汉堡", ROOT / ".hermes" / "profiles" / "hamburger" / ".env", "OPENCODE_GO_API_KEY"),
    ("sidecar", "小黑盒", ROOT / "hermes-heybox" / ".env", "OPENCODE_API_KEY"),
    ("biubiu", "biubiu", ROOT / "hermes-biubiu" / ".env", "OPENCODE_API_KEY"),
]

DB_SOURCES = [
    (STATE_DB, "hanbao", "憨包"),
    (ROOT / ".hermes" / "profiles" / "hamburger" / "state.db", "hamburger", "汉堡"),
    (ROOT / ".hermes" / "profiles" / "heybox" / "state.db", "hamburger", "汉堡"),
    (ROOT / ".hermes" / "profiles" / "biubiu" / "state.db", "biubiu", "biubiu"),
]


def _read_key(path: Path, name: str) -> str:
    try:
        for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
            line = line.strip()
            if line.startswith(name + "="):
                return line.partition("=")[2].strip().strip("'\"")
    except OSError:
        pass
    return ""


def _fetch(key: str) -> dict:
    request = urllib.request.Request(USAGE_URL, headers={
        "Authorization": f"Bearer {key}",
        "User-Agent": UA,
    })
    with urllib.request.urlopen(request, timeout=6) as response:
        return json.loads(response.read())


def _quota_item(key_id: str, label: str, path: Path, env_name: str) -> dict:
    key = _read_key(path, env_name)
    if not key:
        return {"key": key_id, "label": label, "available": False,
                "error": "未配置 key", "remaining": None}
    fingerprint = hashlib.sha256(key.encode()).hexdigest()[:12]
    try:
        payload = _fetch(key)
        usage = payload.get("usage", payload)
    except Exception as exc:
        return {"key": key_id, "label": label, "available": False,
                "error": redact(f"{type(exc).__name__}: {exc}")[:120],
                "remaining": None, "_fingerprint": fingerprint}
    windows = {}
    used = []
    for window in ("rolling", "weekly", "monthly"):
        data = usage.get(window) or {}
        percent = float(data.get("percent", 0) or 0)
        status = data.get("status", "ok")
        if status != "ok":
            percent = 100.0
        windows[window] = {"percent": round(percent, 1), "resets_at": data.get("resetsAt")}
        used.append(percent)
    remaining = max(0, min(100, 100 - int(max(used) if used else 0)))
    return {
        "key": key_id, "label": label, "available": True,
        "remaining": remaining,
        "rolling": windows["rolling"]["percent"],
        "weekly": windows["weekly"]["percent"],
        "monthly": windows["monthly"]["percent"],
        "resets_at": windows["monthly"]["resets_at"],
        "resets": {
            "rolling": windows["rolling"]["resets_at"],
            "weekly": windows["weekly"]["resets_at"],
            "monthly": windows["monthly"]["resets_at"],
        },
        "windows": windows,
        "_fingerprint": fingerprint,
    }


def _one_db(path: Path, role: str, name: str) -> dict | None:
    if not path.is_file():
        return None
    try:
        con = sqlite3.connect(f"file:{path.as_posix()}?mode=ro", uri=True, timeout=3)
        con.row_factory = sqlite3.Row
        cols = {r["name"] for r in con.execute('PRAGMA table_info("sessions")')}
        if not {"input_tokens", "output_tokens"} <= cols:
            con.close()
            return None
        cost_expr = "COALESCE(SUM(estimated_cost_usd), 0)" if "estimated_cost_usd" in cols else "0"
        call_expr = "COALESCE(SUM(api_call_count), 0)" if "api_call_count" in cols else "COUNT(*)"
        row = con.execute(
            f"SELECT COUNT(*) AS sessions, {call_expr} AS requests, "
            f"COALESCE(SUM(input_tokens), 0) AS tin, "
            f"COALESCE(SUM(output_tokens), 0) AS tout, {cost_expr} AS cost "
            "FROM sessions"
        ).fetchone()
        model_row = con.execute(
            "SELECT model, COUNT(*) AS n FROM sessions WHERE model IS NOT NULL "
            "GROUP BY model ORDER BY n DESC LIMIT 1"
        ).fetchone() if "model" in cols else None
        today = now().strftime("%Y-%m-%d")
        today_row = con.execute(
            f"SELECT {call_expr} AS requests, COALESCE(SUM(input_tokens),0) AS tin, "
            f"COALESCE(SUM(output_tokens),0) AS tout, {cost_expr} AS cost "
            "FROM sessions WHERE date(started_at, 'unixepoch', '+8 hours') = ?",
            (today,),
        ).fetchone() if "started_at" in cols else None
        daily = con.execute(
            f"SELECT date(started_at, 'unixepoch', '+8 hours') AS day, "
            f"{cost_expr} AS cost, {call_expr} AS requests "
            "FROM sessions WHERE started_at >= ? "
            "GROUP BY day ORDER BY day",
            (now().timestamp() - 7 * 86400,),
        ).fetchall() if "started_at" in cols else []
        latencies: list[float] = []
        msg_cols = {r["name"] for r in con.execute('PRAGMA table_info("messages")')}
        if {"session_id", "role", "timestamp"} <= msg_cols and "started_at" in cols:
            rows = con.execute(
                "SELECT session_id, role, timestamp FROM messages "
                "WHERE role IN ('user','assistant') AND timestamp >= ? "
                "ORDER BY session_id, timestamp",
                (now().timestamp() - 7 * 86400,),
            ).fetchall()
            pending: dict[str, float] = {}
            for msg in rows:
                if msg["role"] == "user":
                    pending[msg["session_id"]] = float(msg["timestamp"])
                elif msg["session_id"] in pending:
                    delta = (float(msg["timestamp"]) - pending.pop(msg["session_id"])) * 1000
                    if 0 <= delta <= 300_000:
                        latencies.append(delta)
        con.close()
    except sqlite3.Error as exc:
        return {"role": role, "name": name, "error": redact(str(exc))[:100]}
    return {
        "role": role,
        "name": name,
        "sessions": int(row["sessions"] or 0),
        "requests": int(row["requests"] or 0),
        "tokens_in": int(row["tin"] or 0),
        "tokens_out": int(row["tout"] or 0),
        "cost": float(row["cost"] or 0),
        "model": model_row["model"] if model_row else None,
        "today": dict(today_row) if today_row else None,
        "daily": [dict(d) for d in daily],
        "latencies": latencies,
    }


def _percentile(values: list[float], p: float) -> float | None:
    if not values:
        return None
    ordered = sorted(values)
    index = min(len(ordered) - 1, max(0, int(round((p / 100) * (len(ordered) - 1)))))
    return ordered[index]


def _merge_profiles(parts: list[dict]) -> tuple[list[dict], list[dict], float | None, int | None]:
    grouped: dict[str, dict] = {}
    daily: dict[str, float] = {}
    any_cost = False
    any_today = False
    tokens_today = 0
    for part in parts:
        if part.get("error"):
            continue
        role = part["role"]
        target = grouped.setdefault(role, {
            "id": role, "name": part["name"], "requests": 0, "failures": None,
            "tokens_in": 0, "tokens_out": 0, "p50_ms": None, "p95_ms": None,
            "cost_usd": 0.0, "model": part.get("model"), "_latencies": [],
        })
        for field in ("requests", "tokens_in", "tokens_out"):
            target[field] += part.get(field) or 0
        target["_latencies"].extend(part.get("latencies") or [])
        if part.get("cost"):
            any_cost = True
            target["cost_usd"] += part["cost"]
        today = part.get("today")
        if today is not None:
            any_today = True
            tokens_today += int(today.get("tin") or 0) + int(today.get("tout") or 0)
        for day in part.get("daily") or []:
            if day.get("cost"):
                daily[day["day"]] = daily.get(day["day"], 0.0) + float(day["cost"])
    profiles = list(grouped.values())
    for p in profiles:
        latencies = p.pop("_latencies", [])
        p["p50_ms"] = round(_percentile(latencies, 50)) if latencies else None
        p["p95_ms"] = round(_percentile(latencies, 95)) if latencies else None
        if not any_cost:
            p["cost_usd"] = None
    trend = [{"date": day, "cost": cost} for day, cost in sorted(daily.items())]
    today_cost = daily.get(now().strftime("%Y-%m-%d")) if daily else None
    return profiles, trend, today_cost, (tokens_today if any_today else None)


def _legacy_tokens() -> tuple[list[dict], str | None]:
    """Fallback for older schemas with a usage/token table."""
    if not STATE_DB.is_file():
        return [], "state.db 不存在，token 本地估算不可用"
    try:
        con = sqlite3.connect(f"file:{STATE_DB.as_posix()}?mode=ro", uri=True, timeout=3)
        con.row_factory = sqlite3.Row
        tables = {r["name"] for r in con.execute("SELECT name FROM sqlite_master WHERE type='table'")}
        target = next((t for t in tables if "usage" in t.lower() or "token" in t.lower()), None)
        if not target:
            con.close()
            return [], "会话库无 usage 表，token 用量不可用"
        cols = [r["name"] for r in con.execute(f'PRAGMA table_info("{target}")')]
        profile = next((c for c in ("profile", "agent") if c in cols), None)
        tin = next((c for c in ("input_tokens", "tokens_in", "prompt_tokens") if c in cols), None)
        tout = next((c for c in ("output_tokens", "tokens_out", "completion_tokens") if c in cols), None)
        if not (tin or tout):
            con.close()
            return [], f"{target} 表缺少 token 列"
        select = [
            f'"{profile}" AS profile' if profile else "NULL AS profile",
            f'SUM("{tin}") AS tokens_in' if tin else "0 AS tokens_in",
            f'SUM("{tout}") AS tokens_out' if tout else "0 AS tokens_out",
            "COUNT(*) AS requests",
        ]
        rows = con.execute(f'SELECT {", ".join(select)} FROM "{target}" GROUP BY profile').fetchall()
        con.close()
    except sqlite3.Error as exc:
        return [], f"token 用量查询失败：{redact(str(exc))[:100]}"
    from collectors.activity import _normalize_role
    out = []
    for row in rows:
        out.append({
            "id": _normalize_role(row["profile"]), "name": row["profile"] or "unknown",
            "requests": int(row["requests"] or 0), "failures": None,
            "tokens_in": int(row["tokens_in"] or 0), "tokens_out": int(row["tokens_out"] or 0),
            "p50_ms": None, "p95_ms": None, "cost_usd": None,
        })
    return out, None


def collect(include_quota: bool = True) -> dict:
    warnings = []

    quota = []
    if include_quota:
        with ThreadPoolExecutor(max_workers=4) as pool:
            quota_raw = list(pool.map(lambda args: _quota_item(*args), SOURCES))

        # The main and hamburger profiles currently share one OpenCode key.
        # Merge duplicate keys instead of pretending they are independent quotas.
        merged: dict[str, dict] = {}
        for item in quota_raw:
            fingerprint = item.pop("_fingerprint", None)
            if fingerprint and fingerprint in merged:
                existing = merged[fingerprint]
                merged_label = existing["label"]
                if item["label"] not in merged_label:
                    merged_label = f"{merged_label} / {item['label']}"
                if not existing.get("available") and item.get("available"):
                    existing.update(item)
                existing["label"] = merged_label
                continue
            merged[fingerprint or item["key"]] = item
        quota = list(merged.values())

        unavailable = [q["label"] for q in quota if not q.get("available")]
        if unavailable:
            warnings.append("额度不可用：" + " / ".join(unavailable))

    parts = [p for p in (_one_db(path, role, name) for path, role, name in DB_SOURCES) if p]
    profiles, trend, today_cost, tokens_today = _merge_profiles(parts)
    if not profiles:
        profiles, err = _legacy_tokens()
        tokens_today = None
        if err:
            warnings.append(err)

    for part in parts:
        if part.get("error"):
            warnings.append(f"{part['name']} token 读取失败：{part['error']}")

    any_cost = bool(profiles and profiles[0].get("cost_usd") is not None)
    note = ("成本取自 Hermes 会话记录" if any_cost
            else "OpenCode Go 为订阅制，会话库未记录 token 单价；仅显示用量，成本不可用")
    return {
        "profiles": profiles,
        "quota": quota,
        "tokens_today": tokens_today,
        "today_cost_usd": today_cost if any_cost else None,
        "cost_trend": trend if any_cost else [],
        "estimate_note": note,
        "_warnings": warnings,
    }
