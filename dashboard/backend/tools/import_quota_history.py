"""Backfill the HALO quota chart from local CC Switch / OpenCode usage.

CC Switch stores one row per local OpenCode request in
``proxy_request_logs`` (tokens + cost, no quota percentage).  The OpenCode Go
usage endpoint only exposes the current rolling/weekly/monthly percentages, so
the dashboard's own 5-minute sampler starts from zero on first deploy.

This tool has two modes:

  export  read ``cc-switch.db`` and write a compact 5-minute series of raw
          rolling / weekly / monthly costs (no secrets, no prompts)
  import  scale that series to the live API percentages already stored in
          ``quota-history.db`` and insert it with ``source='ccswitch'``

Imported rows are estimates, not API samples.  They are drawn dashed in the
HALO chart and must never overwrite live rows.

Example (local export):

  python dashboard/backend/tools/import_quota_history.py export \
    --ccswitch-db C:/Users/TME/.cc-switch/cc-switch.db \
    --monthly-start 2026-10-14T05:46:55Z \
    --out-json C:/Users/TME/AppData/Local/Temp/opencode/ccswitch-quota.json

Example (server import):

  python tools/import_quota_history.py import \
    --json /tmp/ccswitch-quota.json \
    --quota-db /root/hermes-dashboard/quota-history.db \
    --all-keys
"""
from __future__ import annotations

import argparse
import bisect
import json
import sqlite3
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROLLING_SECONDS = 5 * 3600
WEEK_SECONDS = 7 * 86400
DEFAULT_STEP = 300
DEFAULT_MODEL = "deepseek-v4.1-flash"
DEFAULT_PROVIDER = "_opencode_session"


def _iso(value: str | None) -> datetime | None:
    if not value:
        return None
    text = value.strip()
    if text.endswith("Z"):
        text = text[:-1] + "+00:00"
    dt = datetime.fromisoformat(text)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


def _week_start(ts: int) -> int:
    dt = datetime.fromtimestamp(ts, timezone.utc)
    monday = dt - timedelta(
        days=dt.weekday(), hours=dt.hour, minutes=dt.minute,
        seconds=dt.second, microseconds=dt.microsecond,
    )
    return int(monday.timestamp())


def _sum_range(ts_list: list[int], prefix: list[float], a: int, b: int) -> float:
    i = bisect.bisect_left(ts_list, a)
    j = bisect.bisect_right(ts_list, b)
    return prefix[j] - prefix[i]


def export_ccswitch(args: argparse.Namespace) -> int:
    monthly_start = _iso(args.monthly_start)
    if monthly_start is None:
        raise SystemExit("--monthly-start is required for export")
    end = _iso(args.end) or datetime.now(timezone.utc)
    if end.tzinfo is None:
        end = end.replace(tzinfo=timezone.utc)
    end_ts = int(end.timestamp())
    start_ts = int(monthly_start.timestamp())

    db = Path(args.ccswitch_db)
    con = sqlite3.connect(f"file:{db.as_posix()}?mode=ro", uri=True, timeout=5)
    try:
        rows = con.execute(
            "SELECT created_at, total_cost_usd FROM proxy_request_logs "
            "WHERE provider_id=? AND model=? AND created_at>=? AND created_at<=? "
            "ORDER BY created_at",
            (args.provider, args.model, start_ts - ROLLING_SECONDS, end_ts),
        ).fetchall()
    finally:
        con.close()

    ts_list = [int(row[0]) for row in rows]
    prefix = [0.0]
    for row in rows:
        try:
            cost = float(row[1] or 0)
        except (TypeError, ValueError):
            cost = 0.0
        prefix.append(prefix[-1] + max(0.0, cost))

    if not ts_list:
        raise SystemExit("no CC Switch rows for the selected provider/model/window")

    first = ts_list[0]
    step = max(60, int(args.step))
    grid_start = max(start_ts, (first // step) * step)
    points_ts = list(range(grid_start, end_ts + 1, step))
    if not points_ts or points_ts[-1] != end_ts:
        points_ts.append(end_ts)

    points = []
    for ts in points_ts:
        rolling = _sum_range(ts_list, prefix, ts - ROLLING_SECONDS, ts)
        weekly = _sum_range(ts_list, prefix, _week_start(ts), ts)
        monthly = _sum_range(ts_list, prefix, start_ts, ts) if ts >= start_ts else 0.0
        points.append({
            "t": ts,
            "rolling_cost": round(rolling, 6),
            "weekly_cost": round(weekly, 6),
            "monthly_cost": round(monthly, 6),
        })

    payload = {
        "source": "ccswitch",
        "model": args.model,
        "provider": args.provider,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "monthly_start": monthly_start.isoformat(),
        "ccswitch_first": datetime.fromtimestamp(first, timezone.utc).isoformat(),
        "ccswitch_last": datetime.fromtimestamp(ts_list[-1], timezone.utc).isoformat(),
        "points": points,
    }
    out = Path(args.out_json)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
    print(
        f"exported {len(points)} points ({len(ts_list)} requests) "
        f"{payload['ccswitch_first']} -> {payload['ccswitch_last']} to {out}"
    )
    return 0


def _migrate(con: sqlite3.Connection) -> None:
    con.execute(
        "CREATE TABLE IF NOT EXISTS samples ("
        "key TEXT NOT NULL, ts INTEGER NOT NULL, "
        "rolling REAL, weekly REAL, monthly REAL, remaining REAL, "
        "source TEXT NOT NULL DEFAULT 'api', "
        "PRIMARY KEY (key, ts))"
    )
    cols = {row[1] for row in con.execute("PRAGMA table_info(samples)")}
    if "source" not in cols:
        con.execute("ALTER TABLE samples ADD COLUMN source TEXT NOT NULL DEFAULT 'api'")


def _fetch_api(api_url: str, host: str) -> dict:
    req = urllib.request.Request(api_url, headers={"Host": host})
    with urllib.request.urlopen(req, timeout=10) as response:
        return json.loads(response.read())


def _scale(percent: float | None, cost: float, limit: float,
           fallback_percent: float | None = None,
           fallback_cost: float | None = None) -> float:
    if percent is not None and cost > 0 and float(percent) > 0:
        return float(percent) / cost
    if (fallback_percent is not None and fallback_cost is not None
            and float(fallback_percent) > 0 and float(fallback_cost) > 0):
        return float(fallback_percent) / float(fallback_cost)
    return 100.0 / limit


def _live_rows(con: sqlite3.Connection, key: str) -> list[sqlite3.Row]:
    return con.execute(
        "SELECT ts, rolling, weekly, monthly FROM samples "
        "WHERE key=? AND source='api' ORDER BY ts ASC",
        (key,),
    ).fetchall()


def _point_at(points: list[dict], ts: int) -> dict | None:
    candidates = [p for p in points if int(p["t"]) <= ts]
    return candidates[-1] if candidates else None


def import_json(args: argparse.Namespace) -> int:
    payload = json.loads(Path(args.json).read_text(encoding="utf-8"))
    points = payload.get("points") or []
    if not points:
        raise SystemExit("JSON has no points")
    monthly_start = _iso(payload.get("monthly_start"))

    con = sqlite3.connect(args.quota_db, timeout=10)
    con.row_factory = sqlite3.Row
    con.execute("PRAGMA journal_mode=WAL")
    _migrate(con)

    api_payload = None
    if args.api_url:
        try:
            api_payload = _fetch_api(args.api_url, args.host)
        except Exception as exc:  # best effort; live samples are enough
            print(f"warning: API read failed: {type(exc).__name__}: {exc}")
    if api_payload and monthly_start:
        quota = ((api_payload.get("data") or {}).get("usage") or {}).get("quota") or []
        reset = _iso(((quota[0].get("resets") or {}) if quota else {}).get("monthly"))
        if reset:
            expected = reset - timedelta(days=30)
            if abs((expected - monthly_start).total_seconds()) > 3600:
                print(
                    "warning: JSON monthly_start "
                    f"{monthly_start.isoformat()} != current "
                    f"{expected.isoformat()}; re-export with the current window"
                )

    if args.all_keys:
        keys = [row[0] for row in con.execute(
            "SELECT DISTINCT key FROM samples WHERE source='api' ORDER BY key"
        )]
    else:
        keys = [args.key]

    if not keys:
        raise SystemExit("no live API samples in quota-history.db; run the dashboard first")

    total_inserted = 0
    for key in keys:
        live_rows = _live_rows(con, key)
        if not live_rows:
            print(f"{key}: no live sample, skipped")
            continue
        t0 = int(live_rows[0]["ts"])
        live = live_rows[0]
        candidates = [p for p in points if int(p["t"]) <= t0]
        if not candidates:
            print(f"{key}: no imported point before the first live sample, skipped")
            continue
        p0 = candidates[-1]

        def first_positive(window: str) -> tuple[float | None, float | None]:
            for row in live_rows:
                value = row[window]
                if value is not None and float(value) > 0:
                    point = _point_at(points, int(row["ts"]))
                    cost = point.get(window + "_cost") if point else None
                    return float(value), (float(cost) if cost is not None else None)
            return None, None

        r_pct, r_cost = first_positive("rolling")
        w_pct, w_cost = first_positive("weekly")
        m_pct, m_cost = first_positive("monthly")
        scale_rolling = _scale(
            live["rolling"], float(p0["rolling_cost"]), args.limit_rolling,
            r_pct, r_cost,
        )
        scale_weekly = _scale(
            live["weekly"], float(p0["weekly_cost"]), args.limit_weekly,
            w_pct, w_cost,
        )
        scale_monthly = _scale(
            live["monthly"], float(p0["monthly_cost"]), args.limit_monthly,
            m_pct, m_cost,
        )

        # Idempotent: replace only previously imported estimate rows.
        con.execute("DELETE FROM samples WHERE key=? AND source='ccswitch'", (key,))
        inserted = 0
        skipped = 0
        for point in points:
            ts = int(point["t"])
            if ts >= t0:
                continue
            rolling = min(100.0, max(0.0, float(point["rolling_cost"]) * scale_rolling))
            weekly = min(100.0, max(0.0, float(point["weekly_cost"]) * scale_weekly))
            monthly = min(100.0, max(0.0, float(point["monthly_cost"]) * scale_monthly))
            remaining = max(0.0, 100.0 - max(rolling, weekly, monthly))
            before = con.total_changes
            con.execute(
                "INSERT OR IGNORE INTO samples"
                "(key, ts, rolling, weekly, monthly, remaining, source) "
                "VALUES (?, ?, ?, ?, ?, ?, 'ccswitch')",
                (
                    key, ts, round(rolling, 1), round(weekly, 1),
                    round(monthly, 1), round(remaining, 1),
                ),
            )
            if con.total_changes > before:
                inserted += 1
            else:
                skipped += 1
        con.commit()
        total_inserted += inserted
        print(
            f"{key}: live since {datetime.fromtimestamp(t0, timezone.utc).isoformat()} "
            f"| scales {scale_rolling:.3f}/{scale_weekly:.3f}/{scale_monthly:.3f} "
            f"| fallback {r_pct}/{w_pct}/{m_pct} "
            f"| inserted {inserted}, kept live/duplicate {skipped}"
        )

    con.close()
    print(f"done: {total_inserted} estimated rows")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="mode", required=True)

    exp = sub.add_parser("export", help="read cc-switch.db and write a JSON series")
    exp.add_argument("--ccswitch-db", required=True)
    exp.add_argument("--out-json", required=True)
    exp.add_argument("--monthly-start", required=True,
                     help="current monthly window start, ISO-8601 (UTC)")
    exp.add_argument("--end", help="export end, ISO-8601 (default: now)")
    exp.add_argument("--step", type=int, default=DEFAULT_STEP)
    exp.add_argument("--model", default=DEFAULT_MODEL)
    exp.add_argument("--provider", default=DEFAULT_PROVIDER)

    imp = sub.add_parser("import", help="merge a JSON series into quota-history.db")
    imp.add_argument("--json", required=True)
    imp.add_argument("--quota-db", required=True)
    imp.add_argument("--key", default="main")
    imp.add_argument("--all-keys", action="store_true")
    imp.add_argument("--api-url", default="http://127.0.0.1:8787/api/halo")
    imp.add_argument("--host", default="hamburger.joeli.site")
    imp.add_argument("--limit-rolling", type=float, default=20.0)
    imp.add_argument("--limit-weekly", type=float, default=50.0)
    imp.add_argument("--limit-monthly", type=float, default=100.0)

    args = parser.parse_args()
    if args.mode == "export":
        return export_ccswitch(args)
    return import_json(args)


if __name__ == "__main__":
    raise SystemExit(main())
