"""Overview aggregation: three role cards + global state.

Only fields that can be derived from real evidence are filled.  Unknown values
stay `null` so the UI can print "—" instead of inventing numbers.
"""
from __future__ import annotations

from datetime import datetime

from util import now


def _role_activity(activity: dict, role: str) -> tuple[int | None, str | None]:
    today = now().strftime("%Y-%m-%d")
    cells = [c for c in activity.get("cells", []) if c.get("role") == role and c.get("date") == today]
    if not activity.get("available") and not cells:
        return None, None
    total = sum(c["count"] for c in cells)
    if not cells:
        return 0, None
    last = max(cells, key=lambda c: c["hour"])
    stamp = datetime.fromisoformat(f"{last['date']}T{last['hour']:02d}:00:00")
    return total, stamp.isoformat(timespec="seconds")


def _find_service(services: dict, unit: str) -> dict:
    return next((u for u in services.get("units", []) if u.get("unit") == unit), {})


def _find_job(jobs: dict, *names: str) -> dict:
    for job in jobs.get("jobs", []):
        if job.get("name") in names:
            return job
    return {}


def _find_output(outputs: dict, item_id: str) -> dict:
    return next((o for o in outputs.get("items", []) if o.get("id") == item_id), {})


def _result_cn(value: str | None) -> str:
    return {"success": "成功", "silent": "静默", "failed": "失败",
            "skipped": "跳过", "unknown": "未知"}.get(value or "", value or "—")


def _short_time(value: str | None) -> str:
    if not value:
        return "—"
    return value[11:16] if len(value) >= 16 and value[10] == "T" else value


def collect(services: dict, jobs: dict, errors: dict, board: dict, activity: dict,
            outputs: dict, usage: dict) -> dict:
    gateway = _find_service(services, "hermes-gateway")
    eye = _find_service(services, "hermes-eye")
    biubiu = _find_service(services, "hermes-biubiu")

    usage_by_id = {p.get("id"): p for p in usage.get("profiles", [])}
    failed_total = sum(p.get("failures") or 0 for p in usage.get("profiles", []))
    model = "deepseek-v4.1-flash"

    hanbao_msgs, hanbao_last = _role_activity(activity, "hanbao")
    burger_msgs, burger_last = _role_activity(activity, "hamburger")
    biu_msgs, biu_last = _role_activity(activity, "biubiu")

    heartbeat = _find_job(jobs, "憨包心跳")
    briefing = _find_output(outputs, "briefing")
    doctrine = _find_job(jobs, "每日教义")
    game_news = _find_output(outputs, "game-news")

    plan = board.get("plan") or {}
    tasks = [t for s in plan.get("sections", []) for t in s.get("tasks", [])]
    open_tasks = [t for t in tasks if "完成" not in (t.get("status") or "")]
    status_board = board.get("status") or {}
    body_items = [i for s in status_board.get("sections", []) if s.get("name") == "身体" for i in s.get("items", [])]

    def role_state(service: dict, msgs: int | None, last: str | None) -> tuple[str, str]:
        if service.get("active") and service.get("active") != "active":
            return "offline", "离线"
        if service.get("active") == "active":
            if not msgs:
                return "silent", "静默"
            last_dt = None
            if last:
                try:
                    last_dt = datetime.fromisoformat(last)
                except (ValueError, TypeError):
                    last_dt = None
            if last_dt and last_dt.tzinfo is None:
                last_dt = last_dt.replace(tzinfo=now().tzinfo)
            if last_dt and (now() - last_dt).total_seconds() > 7200:
                return "silent", "静默"
            return "online", "在线"
        return "unknown", "未知"

    hanbao_state = role_state(gateway, hanbao_msgs, hanbao_last)
    burger_state = role_state(eye, burger_msgs, burger_last)
    biu_state = role_state(biubiu, biu_msgs, biu_last)

    roles = [
        {
            "id": "hanbao", "name": "憨包", "latin": "HANBAO",
            "role": "TELEGRAM 主秘书", "platform": "Telegram · 私聊",
            "state": hanbao_state[0], "state_label": hanbao_state[1],
            "uptime_seconds": gateway.get("uptime_seconds"),
            "last_active": hanbao_last or gateway.get("since"),
            "messages_today": hanbao_msgs, "replies_today": None,
            "latency_ms": (usage_by_id.get("hanbao") or {}).get("p50_ms"),
            "model": model, "failed_requests": failed_total,
            "metrics": [
                {"label": "心跳轮次", "value": heartbeat.get("schedule_label") or "—",
                 "note": f"上次 {_short_time(heartbeat.get('last_run'))} · {_result_cn(heartbeat.get('result'))}"},
                {"label": "早报", "value": _short_time(briefing.get("last_run")),
                 "note": _result_cn(briefing.get("result"))},
                {"label": "PLAN / STATUS", "value": f"{len(open_tasks)} / {len(body_items)}",
                 "note": f"{plan.get('overdue', 0)} 条逾期"},
            ],
            "headline": f"心跳 {heartbeat.get('schedule_label') or '未知'} · 今日消息 {hanbao_msgs if hanbao_msgs is not None else '—'}",
        },
        {
            "id": "hamburger", "name": "汉堡", "latin": "HAMBURGER",
            "role": "DISCORD + 黑盒语音", "platform": "Discord · 冲冲冲",
            "state": burger_state[0], "state_label": burger_state[1],
            "uptime_seconds": eye.get("uptime_seconds"),
            "last_active": burger_last or eye.get("since"),
            "messages_today": burger_msgs, "replies_today": None,
            "latency_ms": (usage_by_id.get("hamburger") or {}).get("p50_ms"),
            "model": model, "failed_requests": (usage_by_id.get("hamburger") or {}).get("failures"),
            "metrics": [
                {"label": "Eye 观察", "value": "运行中" if eye.get("active") == "active" else "停止",
                 "note": eye.get("last_event") or "—"},
                {"label": "今日教义", "value": "10:00",
                 "note": f"触发器 · {_result_cn(doctrine.get('result'))}"},
                {"label": "游戏快报", "value": _result_cn(game_news.get("result")),
                 "note": f"上次 {_short_time(game_news.get('last_run'))}"},
            ],
            "headline": f"Discord + 黑盒语音 · 今日消息 {burger_msgs if burger_msgs is not None else '—'}",
        },
        {
            "id": "biubiu", "name": "biubiu", "latin": "BIUBIU",
            "role": "铲铲大王房 · SIDECAR", "platform": "黑盒语音 · 房间",
            "state": biu_state[0], "state_label": biu_state[1],
            "uptime_seconds": biubiu.get("uptime_seconds"),
            "last_active": biu_last or biubiu.get("since"),
            "messages_today": biu_msgs, "replies_today": None,
            "latency_ms": (usage_by_id.get("biubiu") or {}).get("p50_ms"),
            "model": model, "failed_requests": (usage_by_id.get("biubiu") or {}).get("failures"),
            "metrics": [
                {"label": "房间状态", "value": "在线" if biubiu.get("active") == "active" else "离线",
                 "note": biubiu.get("unit") or "—"},
                {"label": "语音回合", "value": biu_msgs if biu_msgs is not None else "—", "note": "今日消息"},
                {"label": "BiuNews", "value": _result_cn(_find_output(outputs, "digest").get("result")),
                 "note": f"上次 {_short_time(_find_output(outputs, 'digest').get('last_run'))}"},
            ],
            "headline": "房间在线" if biubiu.get("active") == "active" else "服务停止，房间不可用",
        },
    ]

    online_services = services.get("summary", {}).get("online", 0)
    total_services = services.get("summary", {}).get("total", 0)
    failed_jobs = sum(1 for j in jobs.get("jobs", []) if j.get("result") == "failed")
    pending = (errors.get("approvals") or {}).get("pending", 0)
    offline = [r["name"] for r in roles if r["state"] == "offline"]
    note_bits = []
    if offline:
        note_bits.append(f"{len(offline)} 个角色离线")
    if failed_jobs:
        note_bits.append(f"{failed_jobs} 个任务失败")
    if plan.get("overdue"):
        note_bits.append(f"{plan['overdue']} 条任务逾期")
    crashes = (errors.get("restarts") or {}).get("crash") or 0
    if crashes:
        note_bits.append(f"gateway 窗口外崩溃 {crashes} 次")
    if not note_bits:
        note_bits.append("无待处理告警")
    state = "degraded" if (offline or failed_jobs or plan.get("overdue") or crashes) else "ok"

    return {
        "global": {
            "state": state,
            "label": "部分降级" if state == "degraded" else "全部正常",
            "note": " · ".join(note_bits),
            "online_services": online_services,
            "total_services": total_services,
            "open_approvals": pending,
            "overdue_tasks": plan.get("overdue", 0),
            "failed_jobs": failed_jobs,
            "api_ok": (services.get("api") or {}).get("ok"),
        },
        "roles": roles,
    }
