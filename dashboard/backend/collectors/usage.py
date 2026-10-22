"""Quota + local token estimate.

Real quota comes from OpenCode Go's key-authenticated usage endpoint:
GET https://opencode.ai/zen/go/v1/usage  ->  usage.{rolling,weekly,monthly}.
Keys are read server-side only and never serialized.
"""
from __future__ import annotations

import json
import sqlite3
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from pathlib import Path

from util import ROOT, STATE_DB, TZ, now, redact

USAGE_URL = "https://opencode.ai/zen/go/v1/usage"
UA = "HermesDashboard/1.0"
SOURCES = [
    ("main", "主线路", ROOT / ".hermes" / ".env", "OPENCODE_GO_API_KEY"),
    ("hamburger", "汉堡", ROOT / ".hermes" / "profiles" / "hamburger" / ".env", "OPENCODE_GO_API_KEY"),
    ("sidecar", "小黑盒 / biubiu", ROOT / "hermes-heybox" / ".env", "OPENCODE_API_KEY"),
    ("biubiu", "biubiu 独立 key", ROOT / "hermes-biubiu" / ".env", "OPENCODE_API_KEY"),
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
    try:
        payload = _fetch(key)
        usage = payload.get("usage", payload)
    except Exception as exc:
        return {"key": key_id, "label": label, "available": False,
                "error": redact(f"{type(exc).__name__}: {exc}")[:120], "remaining": None}
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
        "windows": windows,
    }


def _token_estimate() -> tuple[list[dict], str | None]:
    """Best-effort local token aggregation. Never fabricates values."""
    if not STATE_DB.is_file():
        return [], "state.db 不存在，token 本地估算不可用"
    try:
        con = sqlite3.connect(f"file:{STATE_DB.as_posix()}?mode=ro", uri=True, timeout=3)
        con.row_factory = sqlite3.Row
        tables = {r["name"]: r for r in con.execute(
            "SELECT name FROM sqlite_master WHERE type='table'").fetchall()}
        target = next((t for t in tables if "usage" in t.lower() or "token" in t.lower()), None)
        if not target:
            con.close()
            return [], "会话库无 usage 表，token 本地估算暂不可用"
        cols = [r["name"] for r in con.execute(f'PRAGMA table_info("{target}")').fetchall()]
        profile = next((c for c in ("profile", "agent") if c in cols), None)
        tin = next((c for c in ("input_tokens", "tokens_in", "prompt_tokens") if c in cols), None)
        tout = next((c for c in ("output_tokens", "tokens_out", "completion_tokens") if c in cols), None)
        requests = next((c for c in ("requests", "count", "calls") if c in cols), None)
        if not (tin or tout):
            con.close()
            return [], f"{target} 表缺少 token 列"
        select = []
        select.append(f'"{profile}" AS profile' if profile else "NULL AS profile")
        select.append(f'SUM("{tin}") AS tokens_in' if tin else "0 AS tokens_in")
        select.append(f'SUM("{tout}") AS tokens_out' if tout else "0 AS tokens_out")
        select.append(f'COUNT(*) AS requests' if not requests else f'SUM("{requests}") AS requests')
        rows = con.execute(f'SELECT {", ".join(select)} FROM "{target}" GROUP BY profile').fetchall()
        con.close()
    except sqlite3.Error as exc:
        return [], f"token 估算查询失败：{redact(str(exc))[:100]}"

    from collectors.activity import _normalize_role
    out = []
    for row in rows:
        requests_n = int(row["requests"] or 0)
        tokens_in = int(row["tokens_in"] or 0)
        tokens_out = int(row["tokens_out"] or 0)
        # 0.13 USD / 1M input + 0.55 / 1M output is an explicit estimate band
        cost = tokens_in / 1_000_000 * 0.13 + tokens_out / 1_000_000 * 0.55
        out.append({
            "id": _normalize_role(row["profile"]),
            "name": row["profile"] or "unknown",
            "requests": requests_n, "failures": None,
            "tokens_in": tokens_in, "tokens_out": tokens_out,
            "p50_ms": None, "p95_ms": None,
            "cost_usd": round(cost, 2),
        })
    return out, None


def collect() -> dict:
    warnings = []
    with ThreadPoolExecutor(max_workers=4) as pool:
        quota = list(pool.map(lambda args: _quota_item(*args), SOURCES))
    # drop exact duplicate sidecar key entry when both point at the same box
    if len(quota) > 3 and quota[3].get("available") is False:
        quota = quota[:3]
    unavailable = [q["label"] for q in quota if not q.get("available")]
    if unavailable:
        warnings.append("额度不可用：" + " / ".join(unavailable))

    profiles, token_error = _token_estimate()
    if token_error:
        warnings.append(token_error)

    return {
        "profiles": profiles,
        "quota": quota,
        "today_cost_usd": None,
        "cost_trend": [],
        "estimate_note": "成本为本地 token 估算（非账单）" if profiles else "token 用量数据不可用",
        "_warnings": warnings,
    }
