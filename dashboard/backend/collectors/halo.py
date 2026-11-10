"""HALOFLUX aggregate contract: one payload for the /halo/ wall.

Every field is derived from an existing collector.  Guest masking happens here,
server-side, before the response leaves the process — the frontend never
receives hidden material and then hides it with CSS.

Owner-only sources (errors / events / outputs / logs) are simply absent from
the guest payload: `events`, `outputs` and `logs` are empty lists, job names
collapse to 「秘密任务」, and approvals stay `null`.
"""
from __future__ import annotations

from typing import Any

from util import now

GUEST_JOB_NAME = "秘密任务"
GUEST_JOB_KEYS = ("last_run", "next_run", "result")
ONLINE_STATES = {"online", "typing", "silent"}


def _int(value: Any) -> int | None:
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def _messages_today(activity_today: dict, activity_week: dict) -> int | None:
    """Prefer the 24h collector; fall back to today's cells in the 7d set."""
    if isinstance(activity_today, dict):
        if activity_today.get("available") is False:
            return None
        if activity_today.get("total") is not None:
            return _int(activity_today.get("total"))
    cells = activity_week.get("cells")
    if not isinstance(cells, list):
        return None
    today = now().strftime("%Y-%m-%d")
    return sum(_int(cell.get("count")) or 0 for cell in cells if cell.get("date") == today)


def _roles(overview: dict) -> list[dict]:
    rows = []
    for role in overview.get("roles") or []:
        rows.append({
            "id": role.get("id"),
            "name": role.get("name"),
            "state": role.get("state"),
            "state_label": role.get("state_label"),
            "messages_today": role.get("messages_today"),
            "last_active": role.get("last_active"),
        })
    return rows


def _services(services: dict) -> list[dict]:
    rows = []
    for unit in services.get("units") or []:
        rows.append({
            "unit": unit.get("unit"),
            "label": unit.get("label"),
            "role": unit.get("role"),
            "state": unit.get("state"),
            "active": unit.get("active"),
            "restarts": unit.get("restarts"),
            "uptime_seconds": unit.get("uptime_seconds"),
            "segments": [
                {"start": seg.get("start"), "up": bool(seg.get("up"))}
                for seg in unit.get("segments") or []
            ],
        })
    return rows


def _jobs(jobs: dict, viewer: str) -> list[dict]:
    rows = jobs.get("jobs")
    if not isinstance(rows, list):
        return []
    if viewer == "guest":
        return [
            {"name": GUEST_JOB_NAME, **{key: job.get(key) for key in GUEST_JOB_KEYS}}
            for job in rows
        ]
    return [
        {
            "name": job.get("name"),
            "owner": job.get("owner"),
            "last_run": job.get("last_run"),
            "next_run": job.get("next_run"),
            "result": job.get("result"),
        }
        for job in rows
    ]


def _activity(activity: dict) -> dict:
    return {
        "range": activity.get("range") or "7d",
        "roles": activity.get("roles") or [],
        "cells": [
            {
                "role": cell.get("role"),
                "date": cell.get("date"),
                "hour": cell.get("hour"),
                "count": cell.get("count"),
            }
            for cell in activity.get("cells") or []
        ],
        "totals": activity.get("totals") or {},
        "total": activity.get("total"),
    }


def _usage(usage: dict) -> dict:
    return {
        "quota": [
            {
                "label": item.get("label"),
                "available": bool(item.get("available")),
                "remaining": item.get("remaining"),
                "rolling": item.get("rolling"),
                "weekly": item.get("weekly"),
                "monthly": item.get("monthly"),
                "resets_at": item.get("resets_at"),
                "resets": item.get("resets"),
                "history": item.get("history"),
            }
            for item in usage.get("quota") or []
        ],
        "profiles": [
            {
                "id": profile.get("id"),
                "name": profile.get("name"),
                "requests": profile.get("requests"),
                "tokens_in": profile.get("tokens_in"),
                "tokens_out": profile.get("tokens_out"),
                "p50_ms": profile.get("p50_ms"),
                "p95_ms": profile.get("p95_ms"),
            }
            for profile in usage.get("profiles") or []
        ],
        "tokens_today": _int(usage.get("tokens_today")),
        "estimate_note": usage.get("estimate_note"),
    }


def _delivery_summary(outputs: dict) -> list[dict]:
    """Channel-level counts only — safe for guests, no task identity."""
    counts: dict[str, dict] = {}
    order: list[str] = []
    for item in outputs.get("items") or []:
        for delivery in item.get("deliveries") or []:
            target = delivery.get("target")
            if not target:
                continue
            if target not in counts:
                counts[target] = {"target": target, "ok": 0, "failed": 0}
                order.append(target)
            if delivery.get("ok"):
                counts[target]["ok"] += 1
            else:
                counts[target]["failed"] += 1
    return [counts[target] for target in order]


def _deliveries_today(outputs: dict) -> int | None:
    items = outputs.get("items")
    if not isinstance(items, list):
        return None
    # All sentinels unavailable means "unknown", not a real zero.
    if not any(item.get("available", True) for item in items):
        return None
    today = now().strftime("%Y-%m-%d")
    total = 0
    for item in items:
        if str(item.get("last_run") or "").startswith(today):
            total += len(item.get("deliveries") or [])
    return total


def _quota_min_remaining(quota: list[dict]) -> int | None:
    values = [
        _int(item.get("remaining"))
        for item in quota
        if item.get("available") and item.get("remaining") is not None
    ]
    values = [value for value in values if value is not None]
    return min(values) if values else None


def _events(events: dict) -> list[dict]:
    return [
        {
            "time": event.get("time"),
            "type": event.get("type"),
            "severity": event.get("severity"),
            "title": event.get("title"),
            "detail": event.get("detail"),
        }
        for event in events.get("events") or []
    ]


def _outputs(outputs: dict) -> list[dict]:
    return [
        {
            "name": item.get("name"),
            "deliveries": [
                {
                    "target": delivery.get("target"),
                    "ok": bool(delivery.get("ok")),
                    "note": delivery.get("note"),
                }
                for delivery in item.get("deliveries") or []
            ],
        }
        for item in outputs.get("items") or []
    ]


def _logs(logs: list) -> list[dict]:
    rows = []
    for entry in logs or []:
        line = entry.get("line") if isinstance(entry, dict) else entry
        if line:
            rows.append({"line": str(line)[:800]})
    return rows[-40:]


def collect(services: dict, jobs: dict, activity: dict, activity_today: dict,
            usage: dict, overview: dict, *, errors: dict | None = None,
            outputs: dict | None = None, events: dict | None = None,
            logs: list | None = None, viewer: str = "owner") -> dict:
    """Build the /api/halo payload and apply viewer masking."""
    errors = errors or {}
    outputs = outputs or {}
    events = events or {}
    logs = logs or []

    roles = _roles(overview)
    role_states = [role.get("state") for role in roles]
    services_rows = _services(services)
    job_rows = _jobs(jobs, viewer)
    activity_data = _activity(activity)
    usage_data = _usage(usage)
    delivery_summary = _delivery_summary(outputs)

    service_summary = services.get("summary") or {}
    jobs_source = jobs.get("jobs")
    jobs_total = len(jobs_source) if isinstance(jobs_source, list) else None
    jobs_failed = (
        sum(1 for job in jobs_source if job.get("result") == "failed")
        if isinstance(jobs_source, list) else None
    )

    summary = {
        "messages_today": _messages_today(activity_today, activity),
        "roles_online": sum(1 for state in role_states if state in ONLINE_STATES) if roles else None,
        "roles_total": len(roles) if roles else None,
        "jobs_total": jobs_total,
        "jobs_failed": jobs_failed,
        "services_online": _int(service_summary.get("online")),
        "services_total": _int(service_summary.get("total")),
        "approvals_pending": (
            None if viewer == "guest"
            else _int((errors.get("approvals") or {}).get("pending"))
        ),
        "deliveries_today": _deliveries_today(outputs),
        "tokens_today": usage_data["tokens_today"],
        "quota_min_remaining": _quota_min_remaining(usage_data["quota"]),
        "api_ok": (services.get("api") or {}).get("ok"),
    }

    return {
        "summary": summary,
        "roles": roles,
        "services": services_rows,
        "jobs": job_rows,
        "activity": activity_data,
        "usage": usage_data,
        "delivery_summary": delivery_summary,
        "events": [] if viewer == "guest" else _events(events),
        "outputs": [] if viewer == "guest" else _outputs(outputs),
        "logs": [] if viewer == "guest" else _logs(logs),
        "viewer": viewer,
    }


def from_demo(snapshot: dict, viewer: str = "owner") -> dict:
    """Adapt demo.snapshot() (mixed shapes) to the same contract."""
    activity = snapshot.get("activity") or {}
    today = now().strftime("%Y-%m-%d")
    cells_today = [cell for cell in activity.get("cells") or [] if cell.get("date") == today]
    activity_today = {
        "range": "24h",
        "cells": cells_today,
        "total": sum(_int(cell.get("count")) or 0 for cell in cells_today),
        "available": True,
    }
    return collect(
        snapshot.get("services") or {},
        snapshot.get("jobs") or {},
        activity,
        activity_today,
        snapshot.get("usage") or {},
        snapshot.get("overview") or {},
        errors=snapshot.get("errors") or {},
        outputs=snapshot.get("outputs") or {},
        events=snapshot.get("events") or {},
        logs=[{"line": line} for line in snapshot.get("logs") or []],
        viewer=viewer,
    )
