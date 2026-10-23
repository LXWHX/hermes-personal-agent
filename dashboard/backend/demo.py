"""Deterministic demo fixture.

Only used when HERMES_DASHBOARD_DEMO=1, or when the frontend cannot reach the
API and falls back to `frontend/demo-data.js`.  The UI labels every response as
DATA / DEMO, so demo values can never be mistaken for a live reading.
"""
from __future__ import annotations

import random
from datetime import timedelta

from util import iso, now


def _at(hour: int, minute: int = 0, day_offset: int = 0) -> str:
    base = now().replace(hour=hour, minute=minute, second=0, microsecond=0)
    return (base + timedelta(days=day_offset)).isoformat(timespec="seconds")


def roles() -> dict:
    return {
        "global": {
            "state": "degraded",
            "label": "部分降级",
            "note": "1 个角色离线 · 1 个任务失败 · 1 条任务逾期",
            "online_services": 5,
            "total_services": 6,
            "open_approvals": 3,
            "overdue_tasks": 1,
            "failed_jobs": 1,
            "api_ok": True,
        },
        "roles": [
            {
                "id": "hanbao",
                "name": "憨包",
                "latin": "HANBAO",
                "role": "TELEGRAM 主秘书",
                "platform": "Telegram · 私聊",
                "state": "online",
                "state_label": "在线",
                "uptime_seconds": 561600,
                "last_active": _at(now().hour, max(0, now().minute - 4)),
                "messages_today": 42,
                "replies_today": 39,
                "latency_ms": 1840,
                "model": "deepseek-v4.1-flash",
                "failed_requests": 1,
                "metrics": [
                    {"label": "心跳轮次", "value": "09–22", "note": "13 轮全到"},
                    {"label": "早报", "value": "08:00", "note": "语音版已发"},
                    {"label": "PLAN / STATUS", "value": "3 / 2", "note": "1 条逾期"},
                ],
                "headline": "主秘书在线，早报与心跳均按时。",
            },
            {
                "id": "hamburger",
                "name": "汉堡",
                "latin": "HAMBURGER",
                "role": "DISCORD + 小黑盒",
                "platform": "Discord · 冲冲冲",
                "state": "typing",
                "state_label": "正在回复",
                "uptime_seconds": 388800,
                "last_active": _at(now().hour, max(0, now().minute - 1)),
                "messages_today": 87,
                "replies_today": 71,
                "latency_ms": 2360,
                "model": "deepseek-v4.1-flash",
                "failed_requests": 0,
                "metrics": [
                    {"label": "活跃线程", "value": "8", "note": "2 个待回复"},
                    {"label": "今日教义", "value": "10:00", "note": "已发布"},
                    {"label": "Eye 观察", "value": "142", "note": "0 异常"},
                ],
                "headline": "双平台均在线，教义已发布，线程积压 2。",
            },
            {
                "id": "biubiu",
                "name": "biubiu",
                "latin": "BIUBIU",
                "role": "铲铲大王房 · SIDECAR",
                "platform": "小黑盒 · 房间",
                "state": "offline",
                "state_label": "离线",
                "uptime_seconds": 0,
                "last_active": _at(max(0, now().hour - 2), 41),
                "messages_today": 0,
                "replies_today": 0,
                "latency_ms": None,
                "model": "deepseek-v4.1-flash",
                "failed_requests": 0,
                "metrics": [
                    {"label": "房间在线", "value": "—", "note": "服务离线"},
                    {"label": "语音回合", "value": "0", "note": "今日无回合"},
                    {"label": "BiuNews", "value": "未投递", "note": "等待房间恢复"},
                ],
                "headline": "服务 hermes-biubiu 停止，房间已空 2 小时 41 分。",
            },
        ],
    }


def services() -> dict:
    units = [
        ("hermes-gateway", "憨包网关", "telegram", "active", "running", 3, 214_000_000, 61_200_000_000, 5 * 86400 + 12 * 3600),
        ("hermes-heybox", "汉堡大王", "heybox", "active", "running", 1, 168_000_000, 22_400_000_000, 4 * 86400 + 12 * 3600),
        ("hermes-biubiu", "biubiu 房间", "biubiu", "inactive", "dead", 2, 0, 0, 0),
        ("hermes-eye", "汉堡之眼", "hamburger", "active", "running", 0, 92_000_000, 8_100_000_000, 9 * 86400 + 2 * 3600),
        ("hamburger-nightwatch", "夜巡", "hamburger", "active", "running", 0, 41_000_000, 1_200_000_000, 9 * 86400 + 2 * 3600),
        ("hamburger-guild-guard", "公会守卫", "hamburger", "active", "running", 0, 37_000_000, 900_000_000, 9 * 86400 + 2 * 3600),
    ]
    out = []
    for unit, label, role, active, sub, restarts, mem, cpu, uptime in units:
        segments = []
        for i in range(48):
            up = not (unit == "hermes-biubiu" and i >= 43)
            seconds = i * 30 * 60
            start = (now() - timedelta(hours=24) + timedelta(seconds=seconds)).isoformat(timespec="minutes")
            segments.append({"start": start, "up": up})
        out.append({
            "unit": unit,
            "label": label,
            "role": role,
            "active": active,
            "sub": sub,
            "state": "active" if active == "active" else "failed",
            "pid": 971000 + restarts if active == "active" else None,
            "restarts": restarts,
            "memory_bytes": mem,
            "memory_human": f"{mem / 1024 / 1024:.0f} MB" if mem else "—",
            "cpu_seconds": round(cpu / 1e9, 1),
            "since": _at(0, 0, -1) if active == "active" else _at(max(0, now().hour - 3), 17),
            "uptime_seconds": uptime,
            "segments": segments,
            "last_event": "22:17:04 服务停止（deploy/restart）" if unit == "hermes-biubiu" else "本周期无重启",
        })
    return {
        "api": {"port": 8642, "ok": True, "status": 200, "latency_ms": 41, "path": "/health", "checked": iso()},
        "units": out,
        "restart_tiers": {
            "self_heal": [{"text": "⚠️ 失败自愈重启 03:12:20 —— 窗口外（真崩溃，告警档）"}],
            "manual": [{"text": "手动重启 08:02:10（有 Stopping 记录，不计）"}],
            "crash": [],
        },
        "summary": {"total": 6, "online": 5, "restarts_24h": 1},
    }


def _next_occurrence(hour: int, minute: int, day_offset: int = 0) -> str:
    base = now().replace(hour=hour, minute=minute, second=0, microsecond=0)
    candidate = base + timedelta(days=day_offset)
    if candidate <= now():
        candidate += timedelta(days=1)
    return candidate.isoformat(timespec="seconds")


def jobs() -> dict:
    rows = [
        ("憨包早报", "08:00", "0 8 * * *", "hermes", "憨包", "success", 8, 0, 74, "语音早报已发送 · Telegram"),
        ("憨包心跳", "09–22 整点", "0 9-22 * * *", "hermes", "憨包", "success", 22, 0, 22, "第 13 轮完成，无待办"),
        ("错误巡视", "22:30", "30 22 * * *", "hermes", "憨包", "success", 22, 30, 96, "13 源扫描 · 3 项待批"),
        ("每日教义", "10:00", "0 10 * * *", "hermes", "汉堡", "success", 10, 0, 118, "DC #教义厅 + 小黑盒 双投"),
        ("游戏快报", "12:23", "23 12 * * *", "cron", "哨兵", "silent", 12, 23, 41, "[SILENT] 无新官方资讯"),
        ("游戏热度", "09:30", "30 9 * * *", "cron", "哨兵", "success", 9, 30, 132, "2 个榜单变化 · 已投递"),
        ("Twitch Drops", "17:30", "30 17 * * *", "cron", "哨兵", "failed", 17, 30, 210, "HTTP 403 · 重试 2 次后放弃"),
        ("ETF 溢价 · 早", "10:35", "35 10 * * 1-5", "cron", "哨兵", "success", 10, 35, 18, "溢价 1.82% · 未触发阈值"),
        ("ETF 溢价 · 午", "13:05", "5 13 * * 1-5", "cron", "哨兵", "success", 13, 5, 16, "溢价 2.04% · Bark 已推送"),
        ("ETF 溢价 · 晚", "14:35", "35 14 * * 1-5", "cron", "哨兵", "skipped", 14, 35, None, "非交易日跳过"),
        ("ETF 盘后巡检", "19:35", "35 19 * * 1-5", "cron", "哨兵", "success", 19, 35, 27, "全量 14 只 · 无异常"),
        ("每日 digest", "23:50", "50 23 * * *", "cron", "憨包", "success", 23, 50, 65, "草稿 2 篇待发布"),
        ("错误采集", "每小时 :13", "13 * * * *", "cron", "系统", "success", max(0, now().hour - 1), 13, 12, "13 源 · 新增 6 条"),
        ("修复 watcher", "每 10 分钟", "*/10 * * * *", "cron", "系统", "success", now().hour, max(0, now().minute - (now().minute % 10)), 4, "无已批准议题"),
        ("昵称签名 · DC", "每 5 分钟", "*/5 * * * *", "cron", "系统", "success", now().hour, max(0, now().minute - (now().minute % 5)), 9, "签名仍为 59%"),
    ]
    out = []
    for name, sched_label, cron, source, owner, result, hour, minute, duration_s, summary in rows:
        out.append({
            "id": name, "name": name, "owner": owner, "source": source,
            "schedule": cron, "schedule_label": sched_label,
            "last_run": _at(hour, minute) if result != "skipped" else None,
            "next_run": _next_occurrence(hour, minute),
            "duration_s": duration_s,
            "result": result, "summary": summary,
        })
    return {"jobs": out, "crontab_entries": 14, "crontab_min": 14, "hermes_parse": "ok"}


def activity() -> dict:
    rng = random.Random(7)
    cells = []
    profiles = {"hanbao": (7, 23), "hamburger": (10, 26), "biubiu": (13, 25)}
    today = now()
    for role, (start, end) in profiles.items():
        for d in range(7):
            date = (today - timedelta(days=6 - d)).strftime("%Y-%m-%d")
            for hour in range(24):
                if start <= hour <= end:
                    count = rng.randint(0, 9)
                    if role == "biubiu" and d == 6 and hour > today.hour:
                        count = 0
                    if role == "biubiu" and d == 6 and hour >= 20:
                        count = 0
                else:
                    count = rng.randint(0, 2) if role == "hamburger" else 0
                cells.append({"role": role, "date": date, "hour": hour, "count": count})
    return {
        "range": "7d", "roles": ["hanbao", "hamburger", "biubiu"], "cells": cells,
        "peak": {"role": "hamburger", "date": (today - timedelta(days=1)).strftime("%Y-%m-%d"), "hour": 21, "count": 26},
        "total": sum(c["count"] for c in cells),
    }


def errors() -> dict:
    sources = [
        ("憨包引擎", 4), ("汉堡引擎", 2), ("问答流水线", 1), ("教义触发器", 0),
        ("配额签名", 0), ("游戏快报", 3), ("游戏热度", 1), ("ETF溢价", 2),
        ("网关", 0), ("黑盒", 0), ("Biubiu", 5), ("汉堡之眼", 1), ("夜巡", 2),
        ("公会守卫", 0),
    ]
    trend = [{"date": (now() - timedelta(days=6 - i)).strftime("%Y-%m-%d"), "count": c, "available": True}
             for i, c in enumerate([5, 8, 3, 11, 7, 4, 21])]
    approvals = [
        ("2026-10-18-twitch-403.md", "Twitch Drops 403 限流", "待批", 4, "高", "连续两日重试失败，建议改走备用 UA"),
        ("2026-10-20-biubiu-restart.md", "biubiu 反复退出", "修复中", 2, "高", "内存峰值 380MB，疑似 WebSocket 泄漏"),
        ("2026-10-16-digest-timeout.md", "digest 超时", "已批准", 6, "中", "每晚 23:50 偶发 >90s"),
        ("2026-10-14-heybox-token.md", "黑盒 token 刷新", "已修复", 8, "中", "已加入自动刷新"),
        ("2026-10-12-nightwatch-noise.md", "夜巡日志噪音", "已消退", 10, "低", "规则误报，已合并"),
        ("2026-10-21-eye-lag.md", "Eye 观察延迟", "待批", 1, "低", "观察间隔 90s，偶发 4min"),
    ]
    recent = [
        (_at(22, 14), "Biubiu", "ERROR", "websocket closed: 1006 abnormal closure, reconnect 3/5"),
        (_at(22, 13), "憨包引擎", "ERROR", "cron heartbeat: delivery failed (retry ok)"),
        (_at(21, 58), "夜巡", "WARNING", "guild member sweep exceeded 30s"),
        (_at(19, 41), "ETF溢价", "WARNING", "premium 3.12% crossed alert threshold"),
        (_at(17, 30), "游戏快报", "ERROR", "twitch drops fetch HTTP 403"),
        (_at(16, 2), "问答流水线", "WARNING", "digest draft truncated at 8000 chars"),
        (_at(13, 5), "ETF溢价", "ERROR", "bark push timeout 10s (retry ok)"),
        (_at(11, 20), "Biubiu", "ERROR", "room join failed: token expired"),
        (_at(9, 31), "游戏热度", "WARNING", "youtube source unavailable"),
        (_at(8, 12), "汉堡引擎", "ERROR", "discord rate limit 429, backoff 6s"),
    ]
    return {
        "date": now().strftime("%Y-%m-%d"),
        "sources": [{"slug": s, "hits": h, "failed": None, "levels": {"ERROR": h}} for s, h in sources],
        "total_hits": sum(h for _, h in sources),
        "failed_sources": [],
        "trend": trend,
        "approvals": {
            "items": [
                {"file": f, "title": t, "status": s, "days_open": d, "severity": sev, "summary": summ}
                for f, t, s, d, sev, summ in approvals
            ],
            "counts": {"待批": 2, "已批准": 1, "修复中": 1, "已修复": 1, "已消退": 1},
            "pending": 3,
        },
        "recent": [
            {"time": t, "source": s, "level": lvl, "summary": msg, "raw": msg}
            for t, s, lvl, msg in recent
        ],
        "restarts": {"self_heal": 1, "manual": 1, "crash": 0},
    }


def board() -> dict:
    plan = {
        "title": "Joe 的计划板",
        "updated": now().strftime("%Y-%m-%d"),
        "sections": [
            {
                "name": "进行中 / 等待中",
                "tasks": [
                    {"title": "Hermes 每日问答 → 网站发布", "created": "2026-10-12", "due": "2026-10-26", "status": "等待中", "next": "试用两周后看草稿质量，决定是否接网站发布", "reminder": "截止前 3 天开始催老板拍板", "updated": "2026-10-12", "overdue": False},
                    {"title": "监控面板 M1 上线", "created": "2026-10-20", "due": "2026-10-24", "status": "进行中", "next": "cloudflared Tunnel + Access 策略", "reminder": "每天问一次进度", "updated": "2026-10-22", "overdue": False},
                    {"title": "ETF 阈值重新校准", "created": "2026-10-01", "due": "2026-10-18", "status": "进行中", "next": "等老板确认新版阈值", "reminder": "每周一问", "updated": "2026-10-17", "overdue": True},
                ],
            },
            {"name": "待办（无明确时间）", "tasks": [{"title": "整理 ArcTracker 装备清单", "created": "2026-10-22", "due": None, "status": "待办", "next": "有空时做", "updated": "2026-10-22", "overdue": False}]},
            {"name": "随口提的", "tasks": []},
            {"name": "归档", "tasks": []},
        ],
        "overdue": 1,
    }
    status = {
        "title": "Joe 的状态板",
        "sections": [
            {"name": "作息", "items": [{"title": "正常上班", "type": "上班", "start": now().strftime("%Y-%m-%d"), "end": now().strftime("%Y-%m-%d"), "status": "进行中", "fields": {"类型": "上班"}}]},
            {"name": "身体", "items": [{"title": "脖子拉伤", "type": "身体", "status": "进行中", "fields": {"发生": "2026-10-20", "护理": "48 小时内冰敷，之后热敷", "转段": _at(20, 0)[:16], "阶段": "热敷期", "预计康复": "2026-10-27"}}]},
            {"name": "近况", "items": [{"title": "这周末去成都看朋友", "type": "近况", "status": "", "fields": {}}]},
        ],
        "next_transition": {"title": "脖子拉伤 · 转段", "at": _at(20, 0)[:16], "note": "改热敷，每次 15 分钟", "starts_in": 3600},
    }
    return {"plan": plan, "status": status}


def outputs() -> dict:
    return {
        "items": [
            {"id": "briefing", "name": "憨包早报", "latin": "MORNING BRIEFING", "last_run": _at(8, 0), "result": "success", "title": "周四早报 · 降温与三件事", "excerpt": "成都今天 14–19°C，下午有雨。今天需要拍板：监控面板窗口期、ETF 阈值、周末行程。", "deliveries": [{"target": "Telegram", "ok": True, "note": "语音 + 文字"}]},
            {"id": "game-news", "name": "游戏快报", "latin": "GAME NEWS", "last_run": _at(12, 23), "result": "silent", "title": "无新官方资讯", "excerpt": "[SILENT] 关注的 4 个官方源均无新条目，未投递。", "deliveries": [{"target": "DC #教义厅", "ok": True, "note": "静默"}, {"target": "小黑盒", "ok": True, "note": "静默"}]},
            {"id": "game-trends", "name": "游戏热度", "latin": "GAME TRENDS", "last_run": _at(9, 30), "result": "success", "title": "Steam Top 20 变动 2 项", "excerpt": "《ARC Raiders》升至第 4，《Baldur's Gate 3》跌出前 10；讨论区热度集中在赛季更新。", "deliveries": [{"target": "DC #教义厅", "ok": True, "note": "已投递"}]},
            {"id": "twitch-drops", "name": "Twitch Drops", "latin": "TWITCH DROPS", "last_run": _at(17, 30), "result": "failed", "title": "抓取失败", "excerpt": "HTTP 403 — 上游拒绝请求，已重试 2 次。今日无 Drops 投递。", "deliveries": [{"target": "DC #教义厅", "ok": False, "note": "未投递"}]},
            {"id": "etf", "name": "ETF 溢价", "latin": "ETF PREMIUM", "last_run": _at(19, 35), "result": "success", "title": "QDII 溢价巡检 · 最高 3.12%", "excerpt": "14 只 QDII 中 3 只溢价超过 2%，纳指 ETF 溢价 3.12% 触发阈值，Bark 已推送。", "deliveries": [{"target": "Bark", "ok": True, "note": "已推送"}]},
            {"id": "digest", "name": "每日 digest", "latin": "DAILY DIGEST", "last_run": _at(23, 50, -1), "result": "success", "title": "问答草稿 · 2 篇", "excerpt": "《为什么 AI 总是先道歉》《远程办公的边界》两篇草稿已完成，等待发布确认。", "deliveries": [{"target": "BiuNews", "ok": True, "note": "草稿"}]},
        ],
        "channels": ["Telegram", "DC #教义厅", "冲冲冲房", "小黑盒", "BiuNews", "Bark"],
    }


def usage() -> dict:
    return {
        "profiles": [
            {"id": "hanbao", "name": "憨包", "requests": 412, "failures": 3, "tokens_in": 1_842_000, "tokens_out": 318_000, "p50_ms": 1420, "p95_ms": 3860, "cost_usd": 2.84},
            {"id": "hamburger", "name": "汉堡", "requests": 287, "failures": 1, "tokens_in": 1_204_000, "tokens_out": 194_000, "p50_ms": 1680, "p95_ms": 4420, "cost_usd": 1.96},
            {"id": "biubiu", "name": "biubiu", "requests": 64, "failures": 0, "tokens_in": 286_000, "tokens_out": 41_000, "p50_ms": 980, "p95_ms": 2110, "cost_usd": 0.41},
            {"id": "sentinels", "name": "哨兵", "requests": 51, "failures": 2, "tokens_in": 612_000, "tokens_out": 88_000, "p50_ms": 2210, "p95_ms": 6120, "cost_usd": 0.77},
        ],
        "quota": [
            {"label": "主线路", "key": "main", "remaining": 59, "rolling": 41, "weekly": 38, "monthly": 41, "resets_at": _at(0, 0, 1)[:10], "available": True},
            {"label": "汉堡", "key": "hamburger", "remaining": 72, "rolling": 18, "weekly": 28, "monthly": 24, "resets_at": _at(0, 0, 3)[:10], "available": True},
            {"label": "小黑盒 / biubiu", "key": "sidecar", "remaining": 86, "rolling": 9, "weekly": 14, "monthly": 12, "resets_at": _at(0, 0, 5)[:10], "available": True},
        ],
        "today_cost_usd": 5.98,
        "cost_trend": [{"date": (now() - timedelta(days=6 - i)).strftime("%Y-%m-%d"), "cost": c} for i, c in enumerate([3.2, 4.8, 2.9, 6.1, 5.4, 4.2, 5.98])],
        "estimate_note": "本地按 token 估算，与账单可能存在 ±5% 偏差",
    }


def drift() -> dict:
    return {
        "repo": {
            "commit": "9f2c1ab",
            "committed_at": _at(11, 50),
            "subject": "config: 去掉 teams/google_chat 的 platform_toolsets",
            "dirty_files": 0,
            "dirty_sample": [],
        },
        "artifacts": [
            {"id": "hanbao-soul", "label": "憨包 SOUL", "repo_label": "server/SOUL.md", "live_label": ".hermes/SOUL.md", "deploy": "board-deploy.sh", "status": "same", "repo_mtime": _at(15, 44, -4)[:16], "live_mtime": _at(15, 44, -4)[:16], "tolerated": False},
            {"id": "hamburger-soul", "label": "汉堡 SOUL", "repo_label": "server/hamburger/SOUL.md", "live_label": "profiles/hamburger/SOUL.md", "deploy": "hamburger-deploy.sh", "status": "drift", "repo_mtime": _at(10, 12, -1)[:16], "live_mtime": _at(17, 13, -3)[:16], "tolerated": False},
            {"id": "heybox-soul", "label": "heybox SOUL", "repo_label": "server/heybox/SOUL.md + PROFILE_EXTRA.md", "live_label": "profiles/heybox/SOUL.md", "deploy": "agent-bridge-deploy.sh", "status": "same", "repo_mtime": _at(16, 37, -3)[:16], "live_mtime": _at(16, 37, -3)[:16], "tolerated": False},
            {"id": "biubiu-soul", "label": "biubiu SOUL", "repo_label": "server/biubiu/SOUL.md + PROFILE_EXTRA.md", "live_label": "profiles/biubiu/SOUL.md", "deploy": "agent-bridge-deploy.sh", "status": "same", "repo_mtime": _at(16, 37, -3)[:16], "live_mtime": _at(16, 37, -3)[:16], "tolerated": False},
            {"id": "config", "label": "config.yaml（模板）", "repo_label": "server/config.yaml", "live_label": ".hermes/config.yaml", "deploy": "手工同步", "status": "template", "repo_mtime": _at(11, 50)[:16], "live_mtime": _at(11, 49)[:16], "tolerated": True},
        ],
        "summary": {"same": 3, "drift": 1, "template": 1, "missing": 0},
    }


def system() -> dict:
    return {
        "cores": 1,
        "load": [0.71, 0.97, 0.79],
        "uptime_seconds": 12 * 86400 + 18 * 3600 + 2280,
        "memory": {"total": 2_059_308_032, "available": 1_122_500_800, "used_pct": 45.5},
        "swap": {"total": 5_660_000_000, "used": 913_600_000, "used_pct": 16.1},
        "swappiness": 10,
        "malloc_arena_max": 2,
        "disk": {"total": 52 * 1024 ** 3, "used": 22 * 1024 ** 3, "free": 28 * 1024 ** 3, "percent": 45.0},
        "network": [
            {"id": "telegram", "name": "Telegram API", "ok": True, "status": 200, "latency_ms": 187},
            {"id": "discord", "name": "Discord API", "ok": True, "status": 200, "latency_ms": 142},
            {"id": "xiaoheihe", "name": "小黑盒", "ok": True, "status": 200, "latency_ms": 64},
            {"id": "opencode", "name": "OpenCode", "ok": False, "status": None, "latency_ms": None, "error": "TimeoutError"},
        ],
        "checked": iso(),
    }


def events() -> dict:
    return {
        "events": [
            {"id": "e1", "time": _at(22, 14), "type": "error", "severity": "error", "title": "Biubiu WebSocket 异常关闭", "detail": "重连 3/5，房间暂时不可用", "role": "biubiu"},
            {"id": "e2", "time": _at(22, 17), "type": "service", "severity": "warning", "title": "hermes-biubiu 停止", "detail": "服务进入 inactive 状态", "role": "biubiu"},
            {"id": "e3", "time": _at(22, 13), "type": "errors", "severity": "info", "title": "错误采集完成", "detail": "13 源 · 新增 6 条", "role": "system"},
            {"id": "e4", "time": _at(19, 41), "type": "alert", "severity": "warning", "title": "ETF 溢价越过阈值", "detail": "最高 3.12% · Bark 已推送", "role": "sentinel"},
            {"id": "e5", "time": _at(17, 30), "type": "cron", "severity": "error", "title": "Twitch Drops 任务失败", "detail": "HTTP 403 · 重试 2 次", "role": "sentinel"},
            {"id": "e6", "time": _at(13, 5), "type": "alert", "severity": "warning", "title": "Bark 推送超时后成功", "detail": "10s timeout · retry ok", "role": "sentinel"},
            {"id": "e7", "time": _at(10, 0), "type": "output", "severity": "info", "title": "每日教义已发布", "detail": "DC #教义厅 + 小黑盒", "role": "hamburger"},
            {"id": "e8", "time": _at(8, 0), "type": "output", "severity": "info", "title": "早报已发送", "detail": "语音 + 文字 · Telegram", "role": "hanbao"},
            {"id": "e9", "time": _at(3, 12), "type": "service", "severity": "warning", "title": "gateway 失败自愈重启", "detail": "部署窗口外 · 建议查看 OOM", "role": "system"},
            {"id": "e10", "time": _at(0, 12), "type": "approval", "severity": "info", "title": "新增待批议题", "detail": "Twitch 403 限流", "role": "system"},
        ]
    }


def logs() -> list[str]:
    return [
        "22:44:58 INFO  gateway    heartbeat round 13/13 complete, 0 pending",
        "22:45:03 INFO  presence   signature synced (go usage remaining 59%)",
        "22:45:12 WARN  biubiu     room join skipped: service inactive",
        "22:46:01 INFO  hamburger  thread reply sent in #教义厅 (1.9s)",
        "22:46:30 INFO  gateway    telegram message from boss handled (1.4s)",
        "22:47:02 WARN  eye        observer lag 212s (threshold 180s)",
        "22:47:44 INFO  sentinel   etf patrol idle (market closed)",
        "22:48:10 ERROR biubiu     websocket closed: 1006 abnormal closure",
        "22:48:11 INFO  biubiu     reconnect attempt 4/5 in 8s",
        "22:48:19 ERROR biubiu     reconnect failed, giving up",
        "22:49:00 INFO  system     error collector next run in 24m",
        "22:50:02 INFO  gateway    cron digest scheduled 23:50",
    ]


def snapshot() -> dict:
    return {
        "overview": roles(),
        "services": services(),
        "jobs": jobs(),
        "activity": activity(),
        "errors": errors(),
        "board": board(),
        "outputs": outputs(),
        "usage": usage(),
        "drift": drift(),
        "system": system(),
        "events": events(),
        "logs": logs(),
    }


if __name__ == "__main__":
    import json

    print(json.dumps(snapshot(), ensure_ascii=False, indent=1))
