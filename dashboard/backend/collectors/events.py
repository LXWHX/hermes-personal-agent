"""Merge service restarts, cron failures, error spikes, approvals and overdue
tasks into one event stream.  Acknowledging / muting is a browser-side concern
(localStorage) — the backend stays read-only.
"""
from __future__ import annotations

from datetime import datetime

from util import TZ, now


def _event(time: str | None, kind: str, severity: str, title: str, detail: str, role: str = "system") -> dict:
    return {
        "id": f"{kind}:{time or ''}:{title}"[:120],
        "time": time,
        "type": kind,
        "severity": severity,
        "title": title,
        "detail": detail,
        "role": role,
    }


def collect(services: dict, jobs: dict, errors: dict, board: dict) -> dict:
    items: list[dict] = []

    for unit in services.get("units", []):
        if unit.get("active") != "active":
            items.append(_event(unit.get("since"), "service", "error",
                                f"{unit['label']} 离线",
                                f"{unit['unit']} · {unit.get('sub', 'unknown')}",
                                unit.get("role", "system")))
        elif unit.get("restarts"):
            items.append(_event(unit.get("since"), "service", "info",
                                f"{unit['label']} 运行中",
                                f"累计重启 {unit['restarts']} 次 · PID {unit.get('pid') or '—'}",
                                unit.get("role", "system")))

    for job in jobs.get("jobs", []):
        if job.get("result") == "failed":
            items.append(_event(job.get("last_run"), "cron", "error",
                                f"{job['name']} 失败",
                                job.get("summary", "")[:180], "system"))

    for approval in (errors.get("approvals") or {}).get("items", []):
        if approval.get("status") in ("待批", "已批准"):
            items.append(_event(approval.get("raised"), "approval",
                                "warning" if approval.get("status") == "待批" else "info",
                                f"议题{approval['status']}：{approval['title']}",
                                f"已挂 {approval.get('days_open') or '?'} 天 · {approval.get('severity', '')}",
                                "system"))

    trend = errors.get("trend") or []
    if len(trend) >= 2:
        today_count = trend[-1].get("count") or 0
        history = [d.get("count") or 0 for d in trend[:-1]]
        if history and today_count >= max(5, sum(history) / len(history) * 2):
            items.append(_event(now().isoformat(timespec="seconds"), "error", "error",
                                "错误量异常升高",
                                f"今日 {today_count} 条，前 6 日均值 {sum(history) / len(history):.1f}",
                                "system"))

    for section in (board.get("plan") or {}).get("sections", []):
        for task in section.get("tasks", []):
            if task.get("overdue"):
                items.append(_event(task.get("due"), "task", "warning",
                                    f"任务逾期：{task['title']}",
                                    f"截止 {task['due']} · {task.get('status', '')}",
                                    "hanbao"))

    transition = (board.get("status") or {}).get("next_transition")
    if transition:
        items.append(_event(transition.get("at"), "body", "info",
                            f"身体转段：{transition['title']}",
                            transition.get("note", "")[:180], "hanbao"))

    # Newest first; entries without a timestamp go last.
    items.sort(key=lambda e: (e.get("time") is not None, e.get("time") or ""), reverse=True)
    return {"events": items[:60], "_warnings": []}
