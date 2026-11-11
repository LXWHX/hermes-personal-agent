window.HERMES_DEMO = {
 "overview": {
  "global": {
   "state": "degraded",
   "label": "部分降级",
   "note": "1 个角色离线 · 1 个任务失败 · 1 条任务逾期",
   "online_services": 5,
   "total_services": 6,
   "open_approvals": 3,
   "overdue_tasks": 1,
   "failed_jobs": 1,
   "api_ok": true
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
    "last_active": "2026-11-11T10:07:00+08:00",
    "messages_today": 42,
    "replies_today": 39,
    "latency_ms": 1840,
    "model": "deepseek-v4.1-flash",
    "failed_requests": 1,
    "metrics": [
     {
      "label": "心跳轮次",
      "value": "09–22",
      "note": "13 轮全到"
     },
     {
      "label": "早报",
      "value": "08:00",
      "note": "语音版已发"
     },
     {
      "label": "PLAN / STATUS",
      "value": "3 / 2",
      "note": "1 条逾期"
     }
    ],
    "headline": "主秘书在线，早报与心跳均按时。"
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
    "last_active": "2026-11-11T10:10:00+08:00",
    "messages_today": 87,
    "replies_today": 71,
    "latency_ms": 2360,
    "model": "deepseek-v4.1-flash",
    "failed_requests": 0,
    "metrics": [
     {
      "label": "活跃线程",
      "value": "8",
      "note": "2 个待回复"
     },
     {
      "label": "今日教义",
      "value": "10:00",
      "note": "已发布"
     },
     {
      "label": "Eye 观察",
      "value": "142",
      "note": "0 异常"
     }
    ],
    "headline": "双平台均在线，教义已发布，线程积压 2。"
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
    "last_active": "2026-11-11T08:41:00+08:00",
    "messages_today": 0,
    "replies_today": 0,
    "latency_ms": null,
    "model": "deepseek-v4.1-flash",
    "failed_requests": 0,
    "metrics": [
     {
      "label": "房间在线",
      "value": "—",
      "note": "服务离线"
     },
     {
      "label": "语音回合",
      "value": "0",
      "note": "今日无回合"
     },
     {
      "label": "BiuNews",
      "value": "未投递",
      "note": "等待房间恢复"
     }
    ],
    "headline": "服务 hermes-biubiu 停止，房间已空 2 小时 41 分。"
   }
  ]
 },
 "services": {
  "api": {
   "port": 8642,
   "ok": true,
   "status": 200,
   "latency_ms": 41,
   "path": "/health",
   "checked": "2026-11-11T10:11:17+08:00"
  },
  "units": [
   {
    "unit": "hermes-gateway",
    "label": "憨包网关",
    "role": "telegram",
    "active": "active",
    "sub": "running",
    "state": "active",
    "pid": 971003,
    "restarts": 3,
    "memory_bytes": 214000000,
    "memory_human": "204 MB",
    "cpu_seconds": 61.2,
    "since": "2026-11-10T00:00:00+08:00",
    "uptime_seconds": 475200,
    "segments": [
     {
      "start": "2026-11-10T10:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T10:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T11:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T11:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T12:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T12:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T13:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T13:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T14:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T14:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T15:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T15:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T16:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T16:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T17:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T17:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T18:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T18:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T19:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T19:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T20:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T20:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T21:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T21:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T22:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T22:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T23:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T23:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T00:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T00:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T01:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T01:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T02:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T02:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T03:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T03:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T04:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T04:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T05:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T05:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T06:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T06:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T07:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T07:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T08:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T08:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T09:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T09:41+08:00",
      "up": true
     }
    ],
    "last_event": "本周期无重启"
   },
   {
    "unit": "hermes-heybox",
    "label": "汉堡大王",
    "role": "heybox",
    "active": "active",
    "sub": "running",
    "state": "active",
    "pid": 971001,
    "restarts": 1,
    "memory_bytes": 168000000,
    "memory_human": "160 MB",
    "cpu_seconds": 22.4,
    "since": "2026-11-10T00:00:00+08:00",
    "uptime_seconds": 388800,
    "segments": [
     {
      "start": "2026-11-10T10:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T10:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T11:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T11:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T12:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T12:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T13:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T13:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T14:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T14:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T15:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T15:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T16:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T16:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T17:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T17:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T18:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T18:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T19:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T19:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T20:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T20:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T21:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T21:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T22:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T22:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T23:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T23:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T00:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T00:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T01:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T01:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T02:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T02:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T03:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T03:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T04:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T04:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T05:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T05:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T06:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T06:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T07:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T07:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T08:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T08:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T09:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T09:41+08:00",
      "up": true
     }
    ],
    "last_event": "本周期无重启"
   },
   {
    "unit": "hermes-biubiu",
    "label": "biubiu 房间",
    "role": "biubiu",
    "active": "inactive",
    "sub": "dead",
    "state": "failed",
    "pid": null,
    "restarts": 2,
    "memory_bytes": 0,
    "memory_human": "—",
    "cpu_seconds": 0.0,
    "since": "2026-11-11T07:17:00+08:00",
    "uptime_seconds": 0,
    "segments": [
     {
      "start": "2026-11-10T10:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T10:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T11:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T11:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T12:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T12:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T13:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T13:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T14:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T14:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T15:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T15:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T16:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T16:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T17:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T17:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T18:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T18:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T19:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T19:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T20:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T20:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T21:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T21:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T22:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T22:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T23:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T23:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T00:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T00:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T01:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T01:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T02:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T02:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T03:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T03:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T04:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T04:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T05:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T05:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T06:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T06:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T07:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T07:41+08:00",
      "up": false
     },
     {
      "start": "2026-11-11T08:11+08:00",
      "up": false
     },
     {
      "start": "2026-11-11T08:41+08:00",
      "up": false
     },
     {
      "start": "2026-11-11T09:11+08:00",
      "up": false
     },
     {
      "start": "2026-11-11T09:41+08:00",
      "up": false
     }
    ],
    "last_event": "22:17:04 服务停止（deploy/restart）"
   },
   {
    "unit": "hermes-eye",
    "label": "汉堡之眼",
    "role": "hamburger",
    "active": "active",
    "sub": "running",
    "state": "active",
    "pid": 971000,
    "restarts": 0,
    "memory_bytes": 92000000,
    "memory_human": "88 MB",
    "cpu_seconds": 8.1,
    "since": "2026-11-10T00:00:00+08:00",
    "uptime_seconds": 784800,
    "segments": [
     {
      "start": "2026-11-10T10:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T10:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T11:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T11:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T12:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T12:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T13:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T13:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T14:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T14:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T15:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T15:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T16:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T16:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T17:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T17:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T18:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T18:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T19:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T19:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T20:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T20:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T21:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T21:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T22:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T22:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T23:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T23:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T00:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T00:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T01:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T01:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T02:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T02:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T03:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T03:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T04:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T04:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T05:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T05:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T06:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T06:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T07:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T07:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T08:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T08:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T09:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T09:41+08:00",
      "up": true
     }
    ],
    "last_event": "本周期无重启"
   },
   {
    "unit": "hamburger-nightwatch",
    "label": "夜巡",
    "role": "hamburger",
    "active": "active",
    "sub": "running",
    "state": "active",
    "pid": 971000,
    "restarts": 0,
    "memory_bytes": 41000000,
    "memory_human": "39 MB",
    "cpu_seconds": 1.2,
    "since": "2026-11-10T00:00:00+08:00",
    "uptime_seconds": 784800,
    "segments": [
     {
      "start": "2026-11-10T10:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T10:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T11:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T11:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T12:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T12:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T13:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T13:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T14:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T14:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T15:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T15:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T16:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T16:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T17:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T17:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T18:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T18:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T19:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T19:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T20:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T20:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T21:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T21:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T22:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T22:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T23:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T23:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T00:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T00:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T01:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T01:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T02:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T02:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T03:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T03:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T04:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T04:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T05:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T05:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T06:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T06:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T07:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T07:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T08:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T08:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T09:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T09:41+08:00",
      "up": true
     }
    ],
    "last_event": "本周期无重启"
   },
   {
    "unit": "hamburger-guild-guard",
    "label": "公会守卫",
    "role": "hamburger",
    "active": "active",
    "sub": "running",
    "state": "active",
    "pid": 971000,
    "restarts": 0,
    "memory_bytes": 37000000,
    "memory_human": "35 MB",
    "cpu_seconds": 0.9,
    "since": "2026-11-10T00:00:00+08:00",
    "uptime_seconds": 784800,
    "segments": [
     {
      "start": "2026-11-10T10:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T10:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T11:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T11:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T12:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T12:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T13:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T13:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T14:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T14:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T15:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T15:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T16:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T16:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T17:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T17:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T18:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T18:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T19:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T19:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T20:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T20:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T21:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T21:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T22:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T22:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T23:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-10T23:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T00:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T00:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T01:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T01:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T02:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T02:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T03:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T03:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T04:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T04:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T05:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T05:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T06:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T06:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T07:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T07:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T08:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T08:41+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T09:11+08:00",
      "up": true
     },
     {
      "start": "2026-11-11T09:41+08:00",
      "up": true
     }
    ],
    "last_event": "本周期无重启"
   }
  ],
  "restart_tiers": {
   "self_heal": [
    {
     "text": "⚠️ 失败自愈重启 03:12:20 —— 窗口外（真崩溃，告警档）"
    }
   ],
   "manual": [
    {
     "text": "手动重启 08:02:10（有 Stopping 记录，不计）"
    }
   ],
   "crash": []
  },
  "summary": {
   "total": 6,
   "online": 5,
   "restarts_24h": 1
  }
 },
 "jobs": {
  "jobs": [
   {
    "id": "憨包早报",
    "name": "憨包早报",
    "owner": "憨包",
    "source": "hermes",
    "schedule": "0 8 * * *",
    "schedule_label": "08:00",
    "last_run": "2026-11-11T08:00:00+08:00",
    "next_run": "2026-11-12T08:00:00+08:00",
    "duration_s": 74,
    "result": "success",
    "summary": "语音早报已发送 · Telegram"
   },
   {
    "id": "憨包心跳",
    "name": "憨包心跳",
    "owner": "憨包",
    "source": "hermes",
    "schedule": "0 9-22 * * *",
    "schedule_label": "09–22 整点",
    "last_run": "2026-11-11T22:00:00+08:00",
    "next_run": "2026-11-11T22:00:00+08:00",
    "duration_s": 22,
    "result": "success",
    "summary": "第 13 轮完成，无待办"
   },
   {
    "id": "错误巡视",
    "name": "错误巡视",
    "owner": "憨包",
    "source": "hermes",
    "schedule": "30 22 * * *",
    "schedule_label": "22:30",
    "last_run": "2026-11-11T22:30:00+08:00",
    "next_run": "2026-11-11T22:30:00+08:00",
    "duration_s": 96,
    "result": "success",
    "summary": "13 源扫描 · 3 项待批"
   },
   {
    "id": "每日教义",
    "name": "每日教义",
    "owner": "汉堡",
    "source": "hermes",
    "schedule": "0 10 * * *",
    "schedule_label": "10:00",
    "last_run": "2026-11-11T10:00:00+08:00",
    "next_run": "2026-11-12T10:00:00+08:00",
    "duration_s": 118,
    "result": "success",
    "summary": "DC #教义厅 + 小黑盒 双投"
   },
   {
    "id": "游戏快报",
    "name": "游戏快报",
    "owner": "哨兵",
    "source": "cron",
    "schedule": "23 12 * * *",
    "schedule_label": "12:23",
    "last_run": "2026-11-11T12:23:00+08:00",
    "next_run": "2026-11-11T12:23:00+08:00",
    "duration_s": 41,
    "result": "silent",
    "summary": "[SILENT] 无新官方资讯"
   },
   {
    "id": "游戏热度",
    "name": "游戏热度",
    "owner": "哨兵",
    "source": "cron",
    "schedule": "30 9 * * *",
    "schedule_label": "09:30",
    "last_run": "2026-11-11T09:30:00+08:00",
    "next_run": "2026-11-12T09:30:00+08:00",
    "duration_s": 132,
    "result": "success",
    "summary": "2 个榜单变化 · 已投递"
   },
   {
    "id": "Twitch Drops",
    "name": "Twitch Drops",
    "owner": "哨兵",
    "source": "cron",
    "schedule": "30 17 * * *",
    "schedule_label": "17:30",
    "last_run": "2026-11-11T17:30:00+08:00",
    "next_run": "2026-11-11T17:30:00+08:00",
    "duration_s": 210,
    "result": "failed",
    "summary": "HTTP 403 · 重试 2 次后放弃"
   },
   {
    "id": "ETF 溢价 · 早",
    "name": "ETF 溢价 · 早",
    "owner": "哨兵",
    "source": "cron",
    "schedule": "35 10 * * 1-5",
    "schedule_label": "10:35",
    "last_run": "2026-11-11T10:35:00+08:00",
    "next_run": "2026-11-11T10:35:00+08:00",
    "duration_s": 18,
    "result": "success",
    "summary": "溢价 1.82% · 未触发阈值"
   },
   {
    "id": "ETF 溢价 · 午",
    "name": "ETF 溢价 · 午",
    "owner": "哨兵",
    "source": "cron",
    "schedule": "5 13 * * 1-5",
    "schedule_label": "13:05",
    "last_run": "2026-11-11T13:05:00+08:00",
    "next_run": "2026-11-11T13:05:00+08:00",
    "duration_s": 16,
    "result": "success",
    "summary": "溢价 2.04% · Bark 已推送"
   },
   {
    "id": "ETF 溢价 · 晚",
    "name": "ETF 溢价 · 晚",
    "owner": "哨兵",
    "source": "cron",
    "schedule": "35 14 * * 1-5",
    "schedule_label": "14:35",
    "last_run": null,
    "next_run": "2026-11-11T14:35:00+08:00",
    "duration_s": null,
    "result": "skipped",
    "summary": "非交易日跳过"
   },
   {
    "id": "ETF 盘后巡检",
    "name": "ETF 盘后巡检",
    "owner": "哨兵",
    "source": "cron",
    "schedule": "35 19 * * 1-5",
    "schedule_label": "19:35",
    "last_run": "2026-11-11T19:35:00+08:00",
    "next_run": "2026-11-11T19:35:00+08:00",
    "duration_s": 27,
    "result": "success",
    "summary": "全量 14 只 · 无异常"
   },
   {
    "id": "每日 digest",
    "name": "每日 digest",
    "owner": "憨包",
    "source": "cron",
    "schedule": "50 23 * * *",
    "schedule_label": "23:50",
    "last_run": "2026-11-11T23:50:00+08:00",
    "next_run": "2026-11-11T23:50:00+08:00",
    "duration_s": 65,
    "result": "success",
    "summary": "草稿 2 篇待发布"
   },
   {
    "id": "错误采集",
    "name": "错误采集",
    "owner": "系统",
    "source": "cron",
    "schedule": "13 * * * *",
    "schedule_label": "每小时 :13",
    "last_run": "2026-11-11T09:13:00+08:00",
    "next_run": "2026-11-12T09:13:00+08:00",
    "duration_s": 12,
    "result": "success",
    "summary": "13 源 · 新增 6 条"
   },
   {
    "id": "修复 watcher",
    "name": "修复 watcher",
    "owner": "系统",
    "source": "cron",
    "schedule": "*/10 * * * *",
    "schedule_label": "每 10 分钟",
    "last_run": "2026-11-11T10:10:00+08:00",
    "next_run": "2026-11-12T10:10:00+08:00",
    "duration_s": 4,
    "result": "success",
    "summary": "无已批准议题"
   },
   {
    "id": "昵称签名 · DC",
    "name": "昵称签名 · DC",
    "owner": "系统",
    "source": "cron",
    "schedule": "*/5 * * * *",
    "schedule_label": "每 5 分钟",
    "last_run": "2026-11-11T10:10:00+08:00",
    "next_run": "2026-11-12T10:10:00+08:00",
    "duration_s": 9,
    "result": "success",
    "summary": "签名仍为 59%"
   }
  ],
  "crontab_entries": 14,
  "crontab_min": 14,
  "hermes_parse": "ok"
 },
 "activity": {
  "range": "7d",
  "roles": [
   "hanbao",
   "hamburger",
   "biubiu"
  ],
  "cells": [
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 7,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 8,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 9,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 10,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 11,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 12,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 13,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 14,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 16,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 17,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 18,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 19,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 20,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 21,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 22,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-05",
    "hour": 23,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 7,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 8,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 9,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 10,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 11,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 12,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 13,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 14,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 16,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 17,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 18,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 19,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 20,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 21,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 22,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-06",
    "hour": 23,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 7,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 8,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 9,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 10,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 11,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 12,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 13,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 14,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 15,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 16,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 17,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 18,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 19,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 20,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 21,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 22,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-07",
    "hour": 23,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 8,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 9,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 10,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 11,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 12,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 13,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 14,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 15,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 16,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 17,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 18,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 19,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 20,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 21,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 22,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-11-08",
    "hour": 23,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 8,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 9,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 10,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 11,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 12,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 13,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 14,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 16,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 17,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 18,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 19,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 20,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 21,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 22,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-11-09",
    "hour": 23,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 7,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 8,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 9,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 10,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 11,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 12,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 13,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 14,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 16,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 17,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 18,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 19,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 20,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 21,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 22,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-10",
    "hour": 23,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 7,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 8,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 9,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 10,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 11,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 12,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 13,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 14,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 15,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 16,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 17,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 18,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 19,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 20,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 21,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 22,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 23,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 1,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 3,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 4,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 5,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 7,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 8,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 9,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 10,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 11,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 12,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 13,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 14,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 15,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 16,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 17,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 18,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 19,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 20,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 21,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 22,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-05",
    "hour": 23,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 1,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 4,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 5,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 8,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 9,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 10,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 11,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 12,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 13,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 14,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 16,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 17,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 18,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 19,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 20,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 21,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 22,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-06",
    "hour": 23,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 0,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 1,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 2,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 4,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 5,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 6,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 7,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 8,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 9,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 10,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 11,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 12,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 13,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 14,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 16,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 17,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 18,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 19,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 20,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 21,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 22,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-07",
    "hour": 23,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 0,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 4,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 5,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 7,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 8,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 9,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 10,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 11,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 12,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 13,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 14,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 15,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 16,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 17,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 18,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 19,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 20,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 21,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 22,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-08",
    "hour": 23,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 0,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 1,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 2,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 3,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 5,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 7,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 8,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 9,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 10,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 11,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 12,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 13,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 14,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 15,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 16,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 17,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 18,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 19,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 20,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 21,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 22,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-09",
    "hour": 23,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 0,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 1,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 2,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 4,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 8,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 9,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 10,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 11,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 12,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 13,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 14,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 15,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 16,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 17,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 18,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 19,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 20,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 21,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 22,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-10",
    "hour": 23,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 0,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 5,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 8,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 9,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 10,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 11,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 12,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 13,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 14,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 15,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 16,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 17,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 18,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 19,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 20,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 21,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 22,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 23,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 13,
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 14,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 15,
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 16,
    "count": 1
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 17,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 18,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 19,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 20,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 21,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 22,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-11-05",
    "hour": 23,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 13,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 14,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 15,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 16,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 17,
    "count": 5
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 18,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 19,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 20,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 21,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 22,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-06",
    "hour": 23,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 13,
    "count": 1
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 14,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 15,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 16,
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 17,
    "count": 3
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 18,
    "count": 3
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 19,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 20,
    "count": 4
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 21,
    "count": 3
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 22,
    "count": 4
   },
   {
    "role": "biubiu",
    "date": "2026-11-07",
    "hour": 23,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 13,
    "count": 3
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 14,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 15,
    "count": 5
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 16,
    "count": 4
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 17,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 18,
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 19,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 20,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 21,
    "count": 5
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 22,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-11-08",
    "hour": 23,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 13,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 14,
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 15,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 16,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 17,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 18,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 19,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 20,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 21,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 22,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-11-09",
    "hour": 23,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 13,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 14,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 15,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 16,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 17,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 18,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 19,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 20,
    "count": 1
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 21,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 22,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-10",
    "hour": 23,
    "count": 5
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 13,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 14,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 15,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 16,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 17,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 18,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 19,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 20,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 21,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 22,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 23,
    "count": 0
   }
  ],
  "peak": {
   "role": "hamburger",
   "date": "2026-11-10",
   "hour": 21,
   "count": 26
  },
  "total": 1255
 },
 "errors": {
  "date": "2026-11-11",
  "sources": [
   {
    "slug": "憨包引擎",
    "hits": 4,
    "failed": null,
    "levels": {
     "ERROR": 4
    }
   },
   {
    "slug": "汉堡引擎",
    "hits": 2,
    "failed": null,
    "levels": {
     "ERROR": 2
    }
   },
   {
    "slug": "问答流水线",
    "hits": 1,
    "failed": null,
    "levels": {
     "ERROR": 1
    }
   },
   {
    "slug": "教义触发器",
    "hits": 0,
    "failed": null,
    "levels": {
     "ERROR": 0
    }
   },
   {
    "slug": "配额签名",
    "hits": 0,
    "failed": null,
    "levels": {
     "ERROR": 0
    }
   },
   {
    "slug": "游戏快报",
    "hits": 3,
    "failed": null,
    "levels": {
     "ERROR": 3
    }
   },
   {
    "slug": "游戏热度",
    "hits": 1,
    "failed": null,
    "levels": {
     "ERROR": 1
    }
   },
   {
    "slug": "ETF溢价",
    "hits": 2,
    "failed": null,
    "levels": {
     "ERROR": 2
    }
   },
   {
    "slug": "网关",
    "hits": 0,
    "failed": null,
    "levels": {
     "ERROR": 0
    }
   },
   {
    "slug": "黑盒",
    "hits": 0,
    "failed": null,
    "levels": {
     "ERROR": 0
    }
   },
   {
    "slug": "Biubiu",
    "hits": 5,
    "failed": null,
    "levels": {
     "ERROR": 5
    }
   },
   {
    "slug": "汉堡之眼",
    "hits": 1,
    "failed": null,
    "levels": {
     "ERROR": 1
    }
   },
   {
    "slug": "夜巡",
    "hits": 2,
    "failed": null,
    "levels": {
     "ERROR": 2
    }
   },
   {
    "slug": "公会守卫",
    "hits": 0,
    "failed": null,
    "levels": {
     "ERROR": 0
    }
   }
  ],
  "total_hits": 21,
  "failed_sources": [],
  "trend": [
   {
    "date": "2026-11-05",
    "count": 5,
    "available": true
   },
   {
    "date": "2026-11-06",
    "count": 8,
    "available": true
   },
   {
    "date": "2026-11-07",
    "count": 3,
    "available": true
   },
   {
    "date": "2026-11-08",
    "count": 11,
    "available": true
   },
   {
    "date": "2026-11-09",
    "count": 7,
    "available": true
   },
   {
    "date": "2026-11-10",
    "count": 4,
    "available": true
   },
   {
    "date": "2026-11-11",
    "count": 21,
    "available": true
   }
  ],
  "approvals": {
   "items": [
    {
     "file": "2026-10-18-twitch-403.md",
     "title": "Twitch Drops 403 限流",
     "status": "待批",
     "days_open": 4,
     "severity": "高",
     "summary": "连续两日重试失败，建议改走备用 UA"
    },
    {
     "file": "2026-10-20-biubiu-restart.md",
     "title": "biubiu 反复退出",
     "status": "修复中",
     "days_open": 2,
     "severity": "高",
     "summary": "内存峰值 380MB，疑似 WebSocket 泄漏"
    },
    {
     "file": "2026-10-16-digest-timeout.md",
     "title": "digest 超时",
     "status": "已批准",
     "days_open": 6,
     "severity": "中",
     "summary": "每晚 23:50 偶发 >90s"
    },
    {
     "file": "2026-10-14-heybox-token.md",
     "title": "黑盒 token 刷新",
     "status": "已修复",
     "days_open": 8,
     "severity": "中",
     "summary": "已加入自动刷新"
    },
    {
     "file": "2026-10-12-nightwatch-noise.md",
     "title": "夜巡日志噪音",
     "status": "已消退",
     "days_open": 10,
     "severity": "低",
     "summary": "规则误报，已合并"
    },
    {
     "file": "2026-10-21-eye-lag.md",
     "title": "Eye 观察延迟",
     "status": "待批",
     "days_open": 1,
     "severity": "低",
     "summary": "观察间隔 90s，偶发 4min"
    }
   ],
   "counts": {
    "待批": 2,
    "已批准": 1,
    "修复中": 1,
    "已修复": 1,
    "已消退": 1
   },
   "pending": 3
  },
  "recent": [
   {
    "time": "2026-11-11T22:14:00+08:00",
    "source": "Biubiu",
    "level": "ERROR",
    "summary": "websocket closed: 1006 abnormal closure, reconnect 3/5",
    "raw": "websocket closed: 1006 abnormal closure, reconnect 3/5"
   },
   {
    "time": "2026-11-11T22:13:00+08:00",
    "source": "憨包引擎",
    "level": "ERROR",
    "summary": "cron heartbeat: delivery failed (retry ok)",
    "raw": "cron heartbeat: delivery failed (retry ok)"
   },
   {
    "time": "2026-11-11T21:58:00+08:00",
    "source": "夜巡",
    "level": "WARNING",
    "summary": "guild member sweep exceeded 30s",
    "raw": "guild member sweep exceeded 30s"
   },
   {
    "time": "2026-11-11T19:41:00+08:00",
    "source": "ETF溢价",
    "level": "WARNING",
    "summary": "premium 3.12% crossed alert threshold",
    "raw": "premium 3.12% crossed alert threshold"
   },
   {
    "time": "2026-11-11T17:30:00+08:00",
    "source": "游戏快报",
    "level": "ERROR",
    "summary": "twitch drops fetch HTTP 403",
    "raw": "twitch drops fetch HTTP 403"
   },
   {
    "time": "2026-11-11T16:02:00+08:00",
    "source": "问答流水线",
    "level": "WARNING",
    "summary": "digest draft truncated at 8000 chars",
    "raw": "digest draft truncated at 8000 chars"
   },
   {
    "time": "2026-11-11T13:05:00+08:00",
    "source": "ETF溢价",
    "level": "ERROR",
    "summary": "bark push timeout 10s (retry ok)",
    "raw": "bark push timeout 10s (retry ok)"
   },
   {
    "time": "2026-11-11T11:20:00+08:00",
    "source": "Biubiu",
    "level": "ERROR",
    "summary": "room join failed: token expired",
    "raw": "room join failed: token expired"
   },
   {
    "time": "2026-11-11T09:31:00+08:00",
    "source": "游戏热度",
    "level": "WARNING",
    "summary": "youtube source unavailable",
    "raw": "youtube source unavailable"
   },
   {
    "time": "2026-11-11T08:12:00+08:00",
    "source": "汉堡引擎",
    "level": "ERROR",
    "summary": "discord rate limit 429, backoff 6s",
    "raw": "discord rate limit 429, backoff 6s"
   }
  ],
  "restarts": {
   "self_heal": 1,
   "manual": 1,
   "crash": 0
  }
 },
 "board": {
  "plan": {
   "title": "Joe 的计划板",
   "updated": "2026-11-11",
   "sections": [
    {
     "name": "进行中 / 等待中",
     "tasks": [
      {
       "title": "Hermes 每日问答 → 网站发布",
       "created": "2026-10-12",
       "due": "2026-10-26",
       "status": "等待中",
       "next": "试用两周后看草稿质量，决定是否接网站发布",
       "reminder": "截止前 3 天开始催老板拍板",
       "updated": "2026-10-12",
       "overdue": false
      },
      {
       "title": "监控面板 M1 上线",
       "created": "2026-10-20",
       "due": "2026-10-24",
       "status": "进行中",
       "next": "cloudflared Tunnel + Access 策略",
       "reminder": "每天问一次进度",
       "updated": "2026-10-22",
       "overdue": false
      },
      {
       "title": "ETF 阈值重新校准",
       "created": "2026-10-01",
       "due": "2026-10-18",
       "status": "进行中",
       "next": "等老板确认新版阈值",
       "reminder": "每周一问",
       "updated": "2026-10-17",
       "overdue": true
      }
     ]
    },
    {
     "name": "待办（无明确时间）",
     "tasks": [
      {
       "title": "整理 ArcTracker 装备清单",
       "created": "2026-10-22",
       "due": null,
       "status": "待办",
       "next": "有空时做",
       "updated": "2026-10-22",
       "overdue": false
      }
     ]
    },
    {
     "name": "随口提的",
     "tasks": []
    },
    {
     "name": "归档",
     "tasks": []
    }
   ],
   "overdue": 1
  },
  "status": {
   "title": "Joe 的状态板",
   "sections": [
    {
     "name": "作息",
     "items": [
      {
       "title": "正常上班",
       "type": "上班",
       "start": "2026-11-11",
       "end": "2026-11-11",
       "status": "进行中",
       "fields": {
        "类型": "上班"
       }
      }
     ]
    },
    {
     "name": "身体",
     "items": [
      {
       "title": "脖子拉伤",
       "type": "身体",
       "status": "进行中",
       "fields": {
        "发生": "2026-10-20",
        "护理": "48 小时内冰敷，之后热敷",
        "转段": "2026-11-11T20:00",
        "阶段": "热敷期",
        "预计康复": "2026-10-27"
       }
      }
     ]
    },
    {
     "name": "近况",
     "items": [
      {
       "title": "这周末去成都看朋友",
       "type": "近况",
       "status": "",
       "fields": {}
      }
     ]
    }
   ],
   "next_transition": {
    "title": "脖子拉伤 · 转段",
    "at": "2026-11-11T20:00",
    "note": "改热敷，每次 15 分钟",
    "starts_in": 3600
   }
  }
 },
 "outputs": {
  "items": [
   {
    "id": "briefing",
    "name": "憨包早报",
    "latin": "MORNING BRIEFING",
    "last_run": "2026-11-11T08:00:00+08:00",
    "result": "success",
    "title": "周四早报 · 降温与三件事",
    "excerpt": "成都今天 14–19°C，下午有雨。今天需要拍板：监控面板窗口期、ETF 阈值、周末行程。",
    "deliveries": [
     {
      "target": "Telegram",
      "ok": true,
      "note": "语音 + 文字"
     }
    ]
   },
   {
    "id": "game-news",
    "name": "游戏快报",
    "latin": "GAME NEWS",
    "last_run": "2026-11-11T12:23:00+08:00",
    "result": "silent",
    "title": "无新官方资讯",
    "excerpt": "[SILENT] 关注的 4 个官方源均无新条目，未投递。",
    "deliveries": [
     {
      "target": "DC #教义厅",
      "ok": true,
      "note": "静默"
     },
     {
      "target": "小黑盒",
      "ok": true,
      "note": "静默"
     }
    ]
   },
   {
    "id": "game-trends",
    "name": "游戏热度",
    "latin": "GAME TRENDS",
    "last_run": "2026-11-11T09:30:00+08:00",
    "result": "success",
    "title": "Steam Top 20 变动 2 项",
    "excerpt": "《ARC Raiders》升至第 4，《Baldur's Gate 3》跌出前 10；讨论区热度集中在赛季更新。",
    "deliveries": [
     {
      "target": "DC #教义厅",
      "ok": true,
      "note": "已投递"
     }
    ]
   },
   {
    "id": "twitch-drops",
    "name": "Twitch Drops",
    "latin": "TWITCH DROPS",
    "last_run": "2026-11-11T17:30:00+08:00",
    "result": "failed",
    "title": "抓取失败",
    "excerpt": "HTTP 403 — 上游拒绝请求，已重试 2 次。今日无 Drops 投递。",
    "deliveries": [
     {
      "target": "DC #教义厅",
      "ok": false,
      "note": "未投递"
     }
    ]
   },
   {
    "id": "etf",
    "name": "ETF 溢价",
    "latin": "ETF PREMIUM",
    "last_run": "2026-11-11T19:35:00+08:00",
    "result": "success",
    "title": "QDII 溢价巡检 · 最高 3.12%",
    "excerpt": "14 只 QDII 中 3 只溢价超过 2%，纳指 ETF 溢价 3.12% 触发阈值，Bark 已推送。",
    "deliveries": [
     {
      "target": "Bark",
      "ok": true,
      "note": "已推送"
     }
    ]
   },
   {
    "id": "digest",
    "name": "每日 digest",
    "latin": "DAILY DIGEST",
    "last_run": "2026-11-10T23:50:00+08:00",
    "result": "success",
    "title": "问答草稿 · 2 篇",
    "excerpt": "《为什么 AI 总是先道歉》《远程办公的边界》两篇草稿已完成，等待发布确认。",
    "deliveries": [
     {
      "target": "BiuNews",
      "ok": true,
      "note": "草稿"
     }
    ]
   }
  ],
  "channels": [
   "Telegram",
   "DC #教义厅",
   "冲冲冲房",
   "小黑盒",
   "BiuNews",
   "Bark"
  ]
 },
 "usage": {
  "profiles": [
   {
    "id": "hanbao",
    "name": "憨包",
    "requests": 412,
    "failures": 3,
    "tokens_in": 1842000,
    "tokens_out": 318000,
    "p50_ms": 1420,
    "p95_ms": 3860,
    "cost_usd": 2.84
   },
   {
    "id": "hamburger",
    "name": "汉堡",
    "requests": 287,
    "failures": 1,
    "tokens_in": 1204000,
    "tokens_out": 194000,
    "p50_ms": 1680,
    "p95_ms": 4420,
    "cost_usd": 1.96
   },
   {
    "id": "biubiu",
    "name": "biubiu",
    "requests": 64,
    "failures": 0,
    "tokens_in": 286000,
    "tokens_out": 41000,
    "p50_ms": 980,
    "p95_ms": 2110,
    "cost_usd": 0.41
   },
   {
    "id": "sentinels",
    "name": "哨兵",
    "requests": 51,
    "failures": 2,
    "tokens_in": 612000,
    "tokens_out": 88000,
    "p50_ms": 2210,
    "p95_ms": 6120,
    "cost_usd": 0.77
   }
  ],
  "quota": [
   {
    "label": "主线路",
    "key": "main",
    "remaining": 59,
    "rolling": 41,
    "weekly": 38,
    "monthly": 41,
    "resets_at": "2026-11-14",
    "resets": {
     "rolling": "2026-11-11T12:00:00+08:00",
     "weekly": "2026-11-13T00:00:00+08:00",
     "monthly": "2026-11-14T00:00:00+08:00"
    },
    "history": {
     "rolling": [
      {
       "t": 1794352277,
       "v": 2.1
      },
      {
       "t": 1794352460,
       "v": 3.2
      },
      {
       "t": 1794352643,
       "v": 4.4
      },
      {
       "t": 1794352826,
       "v": 5.5
      },
      {
       "t": 1794353009,
       "v": 6.6
      },
      {
       "t": 1794353192,
       "v": 7.6
      },
      {
       "t": 1794353375,
       "v": 8.6
      },
      {
       "t": 1794353558,
       "v": 9.5
      },
      {
       "t": 1794353741,
       "v": 10.4
      },
      {
       "t": 1794353924,
       "v": 11.2
      },
      {
       "t": 1794354107,
       "v": 11.9
      },
      {
       "t": 1794354290,
       "v": 12.6
      },
      {
       "t": 1794354473,
       "v": 13.1
      },
      {
       "t": 1794354657,
       "v": 13.6
      },
      {
       "t": 1794354840,
       "v": 14.1
      },
      {
       "t": 1794355023,
       "v": 14.4
      },
      {
       "t": 1794355206,
       "v": 14.7
      },
      {
       "t": 1794355389,
       "v": 15.0
      },
      {
       "t": 1794355572,
       "v": 15.2
      },
      {
       "t": 1794355755,
       "v": 15.4
      },
      {
       "t": 1794355938,
       "v": 15.6
      },
      {
       "t": 1794356121,
       "v": 15.7
      },
      {
       "t": 1794356304,
       "v": 15.9
      },
      {
       "t": 1794356487,
       "v": 16.1
      },
      {
       "t": 1794356670,
       "v": 16.3
      },
      {
       "t": 1794356853,
       "v": 16.5
      },
      {
       "t": 1794357036,
       "v": 16.8
      },
      {
       "t": 1794357219,
       "v": 17.2
      },
      {
       "t": 1794357402,
       "v": 17.6
      },
      {
       "t": 1794357585,
       "v": 18.1
      },
      {
       "t": 1794357768,
       "v": 18.6
      },
      {
       "t": 1794357951,
       "v": 19.2
      },
      {
       "t": 1794358134,
       "v": 19.9
      },
      {
       "t": 1794358318,
       "v": 20.7
      },
      {
       "t": 1794358501,
       "v": 21.6
      },
      {
       "t": 1794358684,
       "v": 22.5
      },
      {
       "t": 1794358867,
       "v": 23.5
      },
      {
       "t": 1794359050,
       "v": 24.5
      },
      {
       "t": 1794359233,
       "v": 25.6
      },
      {
       "t": 1794359416,
       "v": 26.7
      },
      {
       "t": 1794359599,
       "v": 27.9
      },
      {
       "t": 1794359782,
       "v": 29.0
      },
      {
       "t": 1794359965,
       "v": 30.2
      },
      {
       "t": 1794360148,
       "v": 31.3
      },
      {
       "t": 1794360331,
       "v": 32.5
      },
      {
       "t": 1794360514,
       "v": 33.6
      },
      {
       "t": 1794360697,
       "v": 34.6
      },
      {
       "t": 1794360880,
       "v": 35.6
      },
      {
       "t": 1794361063,
       "v": 36.6
      },
      {
       "t": 1794361246,
       "v": 37.4
      },
      {
       "t": 1794361429,
       "v": 38.3
      },
      {
       "t": 1794361612,
       "v": 39.0
      },
      {
       "t": 1794361796,
       "v": 39.6
      },
      {
       "t": 1794361979,
       "v": 40.2
      },
      {
       "t": 1794362162,
       "v": 40.7
      },
      {
       "t": 1794362345,
       "v": 41.2
      },
      {
       "t": 1794362528,
       "v": 41.6
      },
      {
       "t": 1794362711,
       "v": 41.9
      },
      {
       "t": 1794362894,
       "v": 42.1
      },
      {
       "t": 1794363077,
       "v": 41
      }
     ],
     "weekly": [
      {
       "t": 1793931077,
       "v": 1.5
      },
      {
       "t": 1793936282,
       "v": 2.0
      },
      {
       "t": 1793941486,
       "v": 2.5
      },
      {
       "t": 1793946691,
       "v": 3.0
      },
      {
       "t": 1793951896,
       "v": 3.5
      },
      {
       "t": 1793957101,
       "v": 4.0
      },
      {
       "t": 1793962306,
       "v": 4.5
      },
      {
       "t": 1793967511,
       "v": 4.9
      },
      {
       "t": 1793972715,
       "v": 5.4
      },
      {
       "t": 1793977920,
       "v": 5.8
      },
      {
       "t": 1793983125,
       "v": 6.2
      },
      {
       "t": 1793988330,
       "v": 6.6
      },
      {
       "t": 1793993535,
       "v": 7.0
      },
      {
       "t": 1793998740,
       "v": 7.3
      },
      {
       "t": 1794003944,
       "v": 7.6
      },
      {
       "t": 1794009149,
       "v": 7.9
      },
      {
       "t": 1794014354,
       "v": 8.2
      },
      {
       "t": 1794019559,
       "v": 8.4
      },
      {
       "t": 1794024764,
       "v": 8.7
      },
      {
       "t": 1794029968,
       "v": 8.9
      },
      {
       "t": 1794035173,
       "v": 9.2
      },
      {
       "t": 1794040378,
       "v": 9.4
      },
      {
       "t": 1794045583,
       "v": 9.6
      },
      {
       "t": 1794050788,
       "v": 9.9
      },
      {
       "t": 1794055993,
       "v": 10.2
      },
      {
       "t": 1794061197,
       "v": 10.5
      },
      {
       "t": 1794066402,
       "v": 10.8
      },
      {
       "t": 1794071607,
       "v": 11.1
      },
      {
       "t": 1794076812,
       "v": 11.5
      },
      {
       "t": 1794082017,
       "v": 11.9
      },
      {
       "t": 1794087221,
       "v": 12.3
      },
      {
       "t": 1794092426,
       "v": 12.7
      },
      {
       "t": 1794097631,
       "v": 13.2
      },
      {
       "t": 1794102836,
       "v": 13.7
      },
      {
       "t": 1794108041,
       "v": 14.3
      },
      {
       "t": 1794113246,
       "v": 14.8
      },
      {
       "t": 1794118450,
       "v": 15.4
      },
      {
       "t": 1794123655,
       "v": 16.0
      },
      {
       "t": 1794128860,
       "v": 16.6
      },
      {
       "t": 1794134065,
       "v": 17.2
      },
      {
       "t": 1794139270,
       "v": 17.8
      },
      {
       "t": 1794144474,
       "v": 18.5
      },
      {
       "t": 1794149679,
       "v": 19.1
      },
      {
       "t": 1794154884,
       "v": 19.7
      },
      {
       "t": 1794160089,
       "v": 20.3
      },
      {
       "t": 1794165294,
       "v": 20.9
      },
      {
       "t": 1794170499,
       "v": 21.5
      },
      {
       "t": 1794175703,
       "v": 22.0
      },
      {
       "t": 1794180908,
       "v": 22.6
      },
      {
       "t": 1794186113,
       "v": 23.1
      },
      {
       "t": 1794191318,
       "v": 23.5
      },
      {
       "t": 1794196523,
       "v": 24.0
      },
      {
       "t": 1794201727,
       "v": 24.4
      },
      {
       "t": 1794206932,
       "v": 24.8
      },
      {
       "t": 1794212137,
       "v": 25.2
      },
      {
       "t": 1794217342,
       "v": 25.5
      },
      {
       "t": 1794222547,
       "v": 25.9
      },
      {
       "t": 1794227752,
       "v": 26.2
      },
      {
       "t": 1794232956,
       "v": 26.5
      },
      {
       "t": 1794238161,
       "v": 26.8
      },
      {
       "t": 1794243366,
       "v": 27.1
      },
      {
       "t": 1794248571,
       "v": 27.4
      },
      {
       "t": 1794253776,
       "v": 27.7
      },
      {
       "t": 1794258980,
       "v": 28.0
      },
      {
       "t": 1794264185,
       "v": 28.3
      },
      {
       "t": 1794269390,
       "v": 28.6
      },
      {
       "t": 1794274595,
       "v": 29.0
      },
      {
       "t": 1794279800,
       "v": 29.3
      },
      {
       "t": 1794285005,
       "v": 29.7
      },
      {
       "t": 1794290209,
       "v": 30.2
      },
      {
       "t": 1794295414,
       "v": 30.6
      },
      {
       "t": 1794300619,
       "v": 31.1
      },
      {
       "t": 1794305824,
       "v": 31.6
      },
      {
       "t": 1794311029,
       "v": 32.2
      },
      {
       "t": 1794316233,
       "v": 32.7
      },
      {
       "t": 1794321438,
       "v": 33.3
      },
      {
       "t": 1794326643,
       "v": 33.9
      },
      {
       "t": 1794331848,
       "v": 34.6
      },
      {
       "t": 1794337053,
       "v": 35.2
      },
      {
       "t": 1794342258,
       "v": 35.9
      },
      {
       "t": 1794347462,
       "v": 36.5
      },
      {
       "t": 1794352667,
       "v": 37.2
      },
      {
       "t": 1794357872,
       "v": 37.8
      },
      {
       "t": 1794363077,
       "v": 38
      }
     ],
     "monthly": [
      {
       "t": 1792030277,
       "v": 1.2
      },
      {
       "t": 1792049880,
       "v": 1.3
      },
      {
       "t": 1792069484,
       "v": 1.3
      },
      {
       "t": 1792089087,
       "v": 1.4
      },
      {
       "t": 1792108690,
       "v": 1.5
      },
      {
       "t": 1792128294,
       "v": 1.6
      },
      {
       "t": 1792147897,
       "v": 1.8
      },
      {
       "t": 1792167500,
       "v": 1.9
      },
      {
       "t": 1792187104,
       "v": 2.0
      },
      {
       "t": 1792206707,
       "v": 2.2
      },
      {
       "t": 1792226310,
       "v": 2.3
      },
      {
       "t": 1792245914,
       "v": 2.5
      },
      {
       "t": 1792265517,
       "v": 2.7
      },
      {
       "t": 1792285121,
       "v": 2.8
      },
      {
       "t": 1792304724,
       "v": 3.0
      },
      {
       "t": 1792324327,
       "v": 3.2
      },
      {
       "t": 1792343931,
       "v": 3.4
      },
      {
       "t": 1792363534,
       "v": 3.6
      },
      {
       "t": 1792383137,
       "v": 3.8
      },
      {
       "t": 1792402741,
       "v": 4.0
      },
      {
       "t": 1792422344,
       "v": 4.2
      },
      {
       "t": 1792441947,
       "v": 4.4
      },
      {
       "t": 1792461551,
       "v": 4.7
      },
      {
       "t": 1792481154,
       "v": 4.9
      },
      {
       "t": 1792500758,
       "v": 5.1
      },
      {
       "t": 1792520361,
       "v": 5.4
      },
      {
       "t": 1792539964,
       "v": 5.6
      },
      {
       "t": 1792559568,
       "v": 5.9
      },
      {
       "t": 1792579171,
       "v": 6.1
      },
      {
       "t": 1792598774,
       "v": 6.4
      },
      {
       "t": 1792618378,
       "v": 6.6
      },
      {
       "t": 1792637981,
       "v": 6.9
      },
      {
       "t": 1792657584,
       "v": 7.2
      },
      {
       "t": 1792677188,
       "v": 7.4
      },
      {
       "t": 1792696791,
       "v": 7.7
      },
      {
       "t": 1792716395,
       "v": 8.0
      },
      {
       "t": 1792735998,
       "v": 8.3
      },
      {
       "t": 1792755601,
       "v": 8.5
      },
      {
       "t": 1792775205,
       "v": 8.8
      },
      {
       "t": 1792794808,
       "v": 9.1
      },
      {
       "t": 1792814411,
       "v": 9.4
      },
      {
       "t": 1792834015,
       "v": 9.7
      },
      {
       "t": 1792853618,
       "v": 10.0
      },
      {
       "t": 1792873221,
       "v": 10.3
      },
      {
       "t": 1792892825,
       "v": 10.6
      },
      {
       "t": 1792912428,
       "v": 10.9
      },
      {
       "t": 1792932031,
       "v": 11.3
      },
      {
       "t": 1792951635,
       "v": 11.6
      },
      {
       "t": 1792971238,
       "v": 11.9
      },
      {
       "t": 1792990842,
       "v": 12.2
      },
      {
       "t": 1793010445,
       "v": 12.5
      },
      {
       "t": 1793030048,
       "v": 12.9
      },
      {
       "t": 1793049652,
       "v": 13.2
      },
      {
       "t": 1793069255,
       "v": 13.5
      },
      {
       "t": 1793088858,
       "v": 13.9
      },
      {
       "t": 1793108462,
       "v": 14.2
      },
      {
       "t": 1793128065,
       "v": 14.6
      },
      {
       "t": 1793147668,
       "v": 14.9
      },
      {
       "t": 1793167272,
       "v": 15.3
      },
      {
       "t": 1793186875,
       "v": 15.6
      },
      {
       "t": 1793206479,
       "v": 16.0
      },
      {
       "t": 1793226082,
       "v": 16.3
      },
      {
       "t": 1793245685,
       "v": 16.7
      },
      {
       "t": 1793265289,
       "v": 17.0
      },
      {
       "t": 1793284892,
       "v": 17.4
      },
      {
       "t": 1793304495,
       "v": 17.8
      },
      {
       "t": 1793324099,
       "v": 18.1
      },
      {
       "t": 1793343702,
       "v": 18.5
      },
      {
       "t": 1793363305,
       "v": 18.9
      },
      {
       "t": 1793382909,
       "v": 19.3
      },
      {
       "t": 1793402512,
       "v": 19.7
      },
      {
       "t": 1793422116,
       "v": 20.0
      },
      {
       "t": 1793441719,
       "v": 20.4
      },
      {
       "t": 1793461322,
       "v": 20.8
      },
      {
       "t": 1793480926,
       "v": 21.2
      },
      {
       "t": 1793500529,
       "v": 21.6
      },
      {
       "t": 1793520132,
       "v": 22.0
      },
      {
       "t": 1793539736,
       "v": 22.4
      },
      {
       "t": 1793559339,
       "v": 22.8
      },
      {
       "t": 1793578942,
       "v": 23.2
      },
      {
       "t": 1793598546,
       "v": 23.6
      },
      {
       "t": 1793618149,
       "v": 24.0
      },
      {
       "t": 1793637752,
       "v": 24.4
      },
      {
       "t": 1793657356,
       "v": 24.8
      },
      {
       "t": 1793676959,
       "v": 25.2
      },
      {
       "t": 1793696563,
       "v": 25.6
      },
      {
       "t": 1793716166,
       "v": 26.1
      },
      {
       "t": 1793735769,
       "v": 26.5
      },
      {
       "t": 1793755373,
       "v": 26.9
      },
      {
       "t": 1793774976,
       "v": 27.3
      },
      {
       "t": 1793794579,
       "v": 27.8
      },
      {
       "t": 1793814183,
       "v": 28.2
      },
      {
       "t": 1793833786,
       "v": 28.6
      },
      {
       "t": 1793853389,
       "v": 29.0
      },
      {
       "t": 1793872993,
       "v": 29.5
      },
      {
       "t": 1793892596,
       "v": 29.9
      },
      {
       "t": 1793912200,
       "v": 30.4
      },
      {
       "t": 1793931803,
       "v": 30.8
      },
      {
       "t": 1793951406,
       "v": 31.2
      },
      {
       "t": 1793971010,
       "v": 31.7
      },
      {
       "t": 1793990613,
       "v": 32.1
      },
      {
       "t": 1794010216,
       "v": 32.6
      },
      {
       "t": 1794029820,
       "v": 33.0
      },
      {
       "t": 1794049423,
       "v": 33.5
      },
      {
       "t": 1794069026,
       "v": 33.9
      },
      {
       "t": 1794088630,
       "v": 34.4
      },
      {
       "t": 1794108233,
       "v": 34.9
      },
      {
       "t": 1794127837,
       "v": 35.3
      },
      {
       "t": 1794147440,
       "v": 35.8
      },
      {
       "t": 1794167043,
       "v": 36.2
      },
      {
       "t": 1794186647,
       "v": 36.7
      },
      {
       "t": 1794206250,
       "v": 37.2
      },
      {
       "t": 1794225853,
       "v": 37.7
      },
      {
       "t": 1794245457,
       "v": 38.1
      },
      {
       "t": 1794265060,
       "v": 38.6
      },
      {
       "t": 1794284663,
       "v": 39.1
      },
      {
       "t": 1794304267,
       "v": 39.6
      },
      {
       "t": 1794323870,
       "v": 40.0
      },
      {
       "t": 1794343473,
       "v": 40.5
      },
      {
       "t": 1794363077,
       "v": 41
      }
     ]
    },
    "available": true
   },
   {
    "label": "汉堡",
    "key": "hamburger",
    "remaining": 72,
    "rolling": 18,
    "weekly": 28,
    "monthly": 24,
    "resets_at": "2026-11-14",
    "resets": {
     "rolling": "2026-11-11T13:00:00+08:00",
     "weekly": "2026-11-14T00:00:00+08:00",
     "monthly": "2026-11-14T00:00:00+08:00"
    },
    "history": {
     "rolling": [
      {
       "t": 1794352277,
       "v": 0.9
      },
      {
       "t": 1794352460,
       "v": 1.4
      },
      {
       "t": 1794352643,
       "v": 1.9
      },
      {
       "t": 1794352826,
       "v": 2.4
      },
      {
       "t": 1794353009,
       "v": 2.9
      },
      {
       "t": 1794353192,
       "v": 3.3
      },
      {
       "t": 1794353375,
       "v": 3.8
      },
      {
       "t": 1794353558,
       "v": 4.2
      },
      {
       "t": 1794353741,
       "v": 4.6
      },
      {
       "t": 1794353924,
       "v": 4.9
      },
      {
       "t": 1794354107,
       "v": 5.2
      },
      {
       "t": 1794354290,
       "v": 5.5
      },
      {
       "t": 1794354473,
       "v": 5.8
      },
      {
       "t": 1794354657,
       "v": 6.0
      },
      {
       "t": 1794354840,
       "v": 6.2
      },
      {
       "t": 1794355023,
       "v": 6.3
      },
      {
       "t": 1794355206,
       "v": 6.5
      },
      {
       "t": 1794355389,
       "v": 6.6
      },
      {
       "t": 1794355572,
       "v": 6.7
      },
      {
       "t": 1794355755,
       "v": 6.8
      },
      {
       "t": 1794355938,
       "v": 6.8
      },
      {
       "t": 1794356121,
       "v": 6.9
      },
      {
       "t": 1794356304,
       "v": 7.0
      },
      {
       "t": 1794356487,
       "v": 7.0
      },
      {
       "t": 1794356670,
       "v": 7.1
      },
      {
       "t": 1794356853,
       "v": 7.2
      },
      {
       "t": 1794357036,
       "v": 7.4
      },
      {
       "t": 1794357219,
       "v": 7.5
      },
      {
       "t": 1794357402,
       "v": 7.7
      },
      {
       "t": 1794357585,
       "v": 7.9
      },
      {
       "t": 1794357768,
       "v": 8.2
      },
      {
       "t": 1794357951,
       "v": 8.4
      },
      {
       "t": 1794358134,
       "v": 8.8
      },
      {
       "t": 1794358318,
       "v": 9.1
      },
      {
       "t": 1794358501,
       "v": 9.5
      },
      {
       "t": 1794358684,
       "v": 9.9
      },
      {
       "t": 1794358867,
       "v": 10.3
      },
      {
       "t": 1794359050,
       "v": 10.8
      },
      {
       "t": 1794359233,
       "v": 11.2
      },
      {
       "t": 1794359416,
       "v": 11.7
      },
      {
       "t": 1794359599,
       "v": 12.2
      },
      {
       "t": 1794359782,
       "v": 12.7
      },
      {
       "t": 1794359965,
       "v": 13.3
      },
      {
       "t": 1794360148,
       "v": 13.8
      },
      {
       "t": 1794360331,
       "v": 14.3
      },
      {
       "t": 1794360514,
       "v": 14.7
      },
      {
       "t": 1794360697,
       "v": 15.2
      },
      {
       "t": 1794360880,
       "v": 15.6
      },
      {
       "t": 1794361063,
       "v": 16.1
      },
      {
       "t": 1794361246,
       "v": 16.4
      },
      {
       "t": 1794361429,
       "v": 16.8
      },
      {
       "t": 1794361612,
       "v": 17.1
      },
      {
       "t": 1794361796,
       "v": 17.4
      },
      {
       "t": 1794361979,
       "v": 17.7
      },
      {
       "t": 1794362162,
       "v": 17.9
      },
      {
       "t": 1794362345,
       "v": 18.1
      },
      {
       "t": 1794362528,
       "v": 18.2
      },
      {
       "t": 1794362711,
       "v": 18.4
      },
      {
       "t": 1794362894,
       "v": 18.5
      },
      {
       "t": 1794363077,
       "v": 18
      }
     ],
     "weekly": [
      {
       "t": 1793931077,
       "v": 1.1
      },
      {
       "t": 1793936282,
       "v": 1.5
      },
      {
       "t": 1793941486,
       "v": 1.8
      },
      {
       "t": 1793946691,
       "v": 2.2
      },
      {
       "t": 1793951896,
       "v": 2.6
      },
      {
       "t": 1793957101,
       "v": 2.9
      },
      {
       "t": 1793962306,
       "v": 3.3
      },
      {
       "t": 1793967511,
       "v": 3.6
      },
      {
       "t": 1793972715,
       "v": 4.0
      },
      {
       "t": 1793977920,
       "v": 4.3
      },
      {
       "t": 1793983125,
       "v": 4.6
      },
      {
       "t": 1793988330,
       "v": 4.9
      },
      {
       "t": 1793993535,
       "v": 5.1
      },
      {
       "t": 1793998740,
       "v": 5.4
      },
      {
       "t": 1794003944,
       "v": 5.6
      },
      {
       "t": 1794009149,
       "v": 5.8
      },
      {
       "t": 1794014354,
       "v": 6.0
      },
      {
       "t": 1794019559,
       "v": 6.2
      },
      {
       "t": 1794024764,
       "v": 6.4
      },
      {
       "t": 1794029968,
       "v": 6.6
      },
      {
       "t": 1794035173,
       "v": 6.7
      },
      {
       "t": 1794040378,
       "v": 6.9
      },
      {
       "t": 1794045583,
       "v": 7.1
      },
      {
       "t": 1794050788,
       "v": 7.3
      },
      {
       "t": 1794055993,
       "v": 7.5
      },
      {
       "t": 1794061197,
       "v": 7.7
      },
      {
       "t": 1794066402,
       "v": 7.9
      },
      {
       "t": 1794071607,
       "v": 8.2
      },
      {
       "t": 1794076812,
       "v": 8.5
      },
      {
       "t": 1794082017,
       "v": 8.7
      },
      {
       "t": 1794087221,
       "v": 9.1
      },
      {
       "t": 1794092426,
       "v": 9.4
      },
      {
       "t": 1794097631,
       "v": 9.7
      },
      {
       "t": 1794102836,
       "v": 10.1
      },
      {
       "t": 1794108041,
       "v": 10.5
      },
      {
       "t": 1794113246,
       "v": 10.9
      },
      {
       "t": 1794118450,
       "v": 11.3
      },
      {
       "t": 1794123655,
       "v": 11.8
      },
      {
       "t": 1794128860,
       "v": 12.2
      },
      {
       "t": 1794134065,
       "v": 12.7
      },
      {
       "t": 1794139270,
       "v": 13.1
      },
      {
       "t": 1794144474,
       "v": 13.6
      },
      {
       "t": 1794149679,
       "v": 14.1
      },
      {
       "t": 1794154884,
       "v": 14.5
      },
      {
       "t": 1794160089,
       "v": 15.0
      },
      {
       "t": 1794165294,
       "v": 15.4
      },
      {
       "t": 1794170499,
       "v": 15.8
      },
      {
       "t": 1794175703,
       "v": 16.2
      },
      {
       "t": 1794180908,
       "v": 16.6
      },
      {
       "t": 1794186113,
       "v": 17.0
      },
      {
       "t": 1794191318,
       "v": 17.4
      },
      {
       "t": 1794196523,
       "v": 17.7
      },
      {
       "t": 1794201727,
       "v": 18.0
      },
      {
       "t": 1794206932,
       "v": 18.3
      },
      {
       "t": 1794212137,
       "v": 18.6
      },
      {
       "t": 1794217342,
       "v": 18.8
      },
      {
       "t": 1794222547,
       "v": 19.1
      },
      {
       "t": 1794227752,
       "v": 19.3
      },
      {
       "t": 1794232956,
       "v": 19.5
      },
      {
       "t": 1794238161,
       "v": 19.7
      },
      {
       "t": 1794243366,
       "v": 20.0
      },
      {
       "t": 1794248571,
       "v": 20.2
      },
      {
       "t": 1794253776,
       "v": 20.4
      },
      {
       "t": 1794258980,
       "v": 20.6
      },
      {
       "t": 1794264185,
       "v": 20.8
      },
      {
       "t": 1794269390,
       "v": 21.1
      },
      {
       "t": 1794274595,
       "v": 21.3
      },
      {
       "t": 1794279800,
       "v": 21.6
      },
      {
       "t": 1794285005,
       "v": 21.9
      },
      {
       "t": 1794290209,
       "v": 22.2
      },
      {
       "t": 1794295414,
       "v": 22.6
      },
      {
       "t": 1794300619,
       "v": 22.9
      },
      {
       "t": 1794305824,
       "v": 23.3
      },
      {
       "t": 1794311029,
       "v": 23.7
      },
      {
       "t": 1794316233,
       "v": 24.1
      },
      {
       "t": 1794321438,
       "v": 24.6
      },
      {
       "t": 1794326643,
       "v": 25.0
      },
      {
       "t": 1794331848,
       "v": 25.5
      },
      {
       "t": 1794337053,
       "v": 25.9
      },
      {
       "t": 1794342258,
       "v": 26.4
      },
      {
       "t": 1794347462,
       "v": 26.9
      },
      {
       "t": 1794352667,
       "v": 27.4
      },
      {
       "t": 1794357872,
       "v": 27.9
      },
      {
       "t": 1794363077,
       "v": 28
      }
     ],
     "monthly": [
      {
       "t": 1792030277,
       "v": 0.7
      },
      {
       "t": 1792049880,
       "v": 0.7
      },
      {
       "t": 1792069484,
       "v": 0.8
      },
      {
       "t": 1792089087,
       "v": 0.8
      },
      {
       "t": 1792108690,
       "v": 0.9
      },
      {
       "t": 1792128294,
       "v": 1.0
      },
      {
       "t": 1792147897,
       "v": 1.0
      },
      {
       "t": 1792167500,
       "v": 1.1
      },
      {
       "t": 1792187104,
       "v": 1.2
      },
      {
       "t": 1792206707,
       "v": 1.3
      },
      {
       "t": 1792226310,
       "v": 1.4
      },
      {
       "t": 1792245914,
       "v": 1.5
      },
      {
       "t": 1792265517,
       "v": 1.6
      },
      {
       "t": 1792285121,
       "v": 1.7
      },
      {
       "t": 1792304724,
       "v": 1.8
      },
      {
       "t": 1792324327,
       "v": 1.9
      },
      {
       "t": 1792343931,
       "v": 2.0
      },
      {
       "t": 1792363534,
       "v": 2.1
      },
      {
       "t": 1792383137,
       "v": 2.2
      },
      {
       "t": 1792402741,
       "v": 2.3
      },
      {
       "t": 1792422344,
       "v": 2.5
      },
      {
       "t": 1792441947,
       "v": 2.6
      },
      {
       "t": 1792461551,
       "v": 2.7
      },
      {
       "t": 1792481154,
       "v": 2.9
      },
      {
       "t": 1792500758,
       "v": 3.0
      },
      {
       "t": 1792520361,
       "v": 3.1
      },
      {
       "t": 1792539964,
       "v": 3.3
      },
      {
       "t": 1792559568,
       "v": 3.4
      },
      {
       "t": 1792579171,
       "v": 3.6
      },
      {
       "t": 1792598774,
       "v": 3.7
      },
      {
       "t": 1792618378,
       "v": 3.9
      },
      {
       "t": 1792637981,
       "v": 4.0
      },
      {
       "t": 1792657584,
       "v": 4.2
      },
      {
       "t": 1792677188,
       "v": 4.3
      },
      {
       "t": 1792696791,
       "v": 4.5
      },
      {
       "t": 1792716395,
       "v": 4.7
      },
      {
       "t": 1792735998,
       "v": 4.8
      },
      {
       "t": 1792755601,
       "v": 5.0
      },
      {
       "t": 1792775205,
       "v": 5.2
      },
      {
       "t": 1792794808,
       "v": 5.3
      },
      {
       "t": 1792814411,
       "v": 5.5
      },
      {
       "t": 1792834015,
       "v": 5.7
      },
      {
       "t": 1792853618,
       "v": 5.9
      },
      {
       "t": 1792873221,
       "v": 6.0
      },
      {
       "t": 1792892825,
       "v": 6.2
      },
      {
       "t": 1792912428,
       "v": 6.4
      },
      {
       "t": 1792932031,
       "v": 6.6
      },
      {
       "t": 1792951635,
       "v": 6.8
      },
      {
       "t": 1792971238,
       "v": 7.0
      },
      {
       "t": 1792990842,
       "v": 7.2
      },
      {
       "t": 1793010445,
       "v": 7.3
      },
      {
       "t": 1793030048,
       "v": 7.5
      },
      {
       "t": 1793049652,
       "v": 7.7
      },
      {
       "t": 1793069255,
       "v": 7.9
      },
      {
       "t": 1793088858,
       "v": 8.1
      },
      {
       "t": 1793108462,
       "v": 8.3
      },
      {
       "t": 1793128065,
       "v": 8.5
      },
      {
       "t": 1793147668,
       "v": 8.7
      },
      {
       "t": 1793167272,
       "v": 8.9
      },
      {
       "t": 1793186875,
       "v": 9.1
      },
      {
       "t": 1793206479,
       "v": 9.3
      },
      {
       "t": 1793226082,
       "v": 9.6
      },
      {
       "t": 1793245685,
       "v": 9.8
      },
      {
       "t": 1793265289,
       "v": 10.0
      },
      {
       "t": 1793284892,
       "v": 10.2
      },
      {
       "t": 1793304495,
       "v": 10.4
      },
      {
       "t": 1793324099,
       "v": 10.6
      },
      {
       "t": 1793343702,
       "v": 10.8
      },
      {
       "t": 1793363305,
       "v": 11.1
      },
      {
       "t": 1793382909,
       "v": 11.3
      },
      {
       "t": 1793402512,
       "v": 11.5
      },
      {
       "t": 1793422116,
       "v": 11.7
      },
      {
       "t": 1793441719,
       "v": 12.0
      },
      {
       "t": 1793461322,
       "v": 12.2
      },
      {
       "t": 1793480926,
       "v": 12.4
      },
      {
       "t": 1793500529,
       "v": 12.6
      },
      {
       "t": 1793520132,
       "v": 12.9
      },
      {
       "t": 1793539736,
       "v": 13.1
      },
      {
       "t": 1793559339,
       "v": 13.3
      },
      {
       "t": 1793578942,
       "v": 13.6
      },
      {
       "t": 1793598546,
       "v": 13.8
      },
      {
       "t": 1793618149,
       "v": 14.0
      },
      {
       "t": 1793637752,
       "v": 14.3
      },
      {
       "t": 1793657356,
       "v": 14.5
      },
      {
       "t": 1793676959,
       "v": 14.8
      },
      {
       "t": 1793696563,
       "v": 15.0
      },
      {
       "t": 1793716166,
       "v": 15.3
      },
      {
       "t": 1793735769,
       "v": 15.5
      },
      {
       "t": 1793755373,
       "v": 15.7
      },
      {
       "t": 1793774976,
       "v": 16.0
      },
      {
       "t": 1793794579,
       "v": 16.2
      },
      {
       "t": 1793814183,
       "v": 16.5
      },
      {
       "t": 1793833786,
       "v": 16.7
      },
      {
       "t": 1793853389,
       "v": 17.0
      },
      {
       "t": 1793872993,
       "v": 17.3
      },
      {
       "t": 1793892596,
       "v": 17.5
      },
      {
       "t": 1793912200,
       "v": 17.8
      },
      {
       "t": 1793931803,
       "v": 18.0
      },
      {
       "t": 1793951406,
       "v": 18.3
      },
      {
       "t": 1793971010,
       "v": 18.5
      },
      {
       "t": 1793990613,
       "v": 18.8
      },
      {
       "t": 1794010216,
       "v": 19.1
      },
      {
       "t": 1794029820,
       "v": 19.3
      },
      {
       "t": 1794049423,
       "v": 19.6
      },
      {
       "t": 1794069026,
       "v": 19.9
      },
      {
       "t": 1794088630,
       "v": 20.1
      },
      {
       "t": 1794108233,
       "v": 20.4
      },
      {
       "t": 1794127837,
       "v": 20.7
      },
      {
       "t": 1794147440,
       "v": 20.9
      },
      {
       "t": 1794167043,
       "v": 21.2
      },
      {
       "t": 1794186647,
       "v": 21.5
      },
      {
       "t": 1794206250,
       "v": 21.8
      },
      {
       "t": 1794225853,
       "v": 22.0
      },
      {
       "t": 1794245457,
       "v": 22.3
      },
      {
       "t": 1794265060,
       "v": 22.6
      },
      {
       "t": 1794284663,
       "v": 22.9
      },
      {
       "t": 1794304267,
       "v": 23.2
      },
      {
       "t": 1794323870,
       "v": 23.4
      },
      {
       "t": 1794343473,
       "v": 23.7
      },
      {
       "t": 1794363077,
       "v": 24
      }
     ]
    },
    "available": true
   },
   {
    "label": "小黑盒 / biubiu",
    "key": "sidecar",
    "remaining": 86,
    "rolling": 9,
    "weekly": 14,
    "monthly": 12,
    "resets_at": "2026-11-16",
    "resets": {
     "rolling": "2026-11-11T14:00:00+08:00",
     "weekly": "2026-11-16T00:00:00+08:00",
     "monthly": "2026-11-16T00:00:00+08:00"
    },
    "history": {
     "rolling": [
      {
       "t": 1794352277,
       "v": 0.5
      },
      {
       "t": 1794352460,
       "v": 0.7
      },
      {
       "t": 1794352643,
       "v": 1.0
      },
      {
       "t": 1794352826,
       "v": 1.2
      },
      {
       "t": 1794353009,
       "v": 1.4
      },
      {
       "t": 1794353192,
       "v": 1.7
      },
      {
       "t": 1794353375,
       "v": 1.9
      },
      {
       "t": 1794353558,
       "v": 2.1
      },
      {
       "t": 1794353741,
       "v": 2.3
      },
      {
       "t": 1794353924,
       "v": 2.5
      },
      {
       "t": 1794354107,
       "v": 2.6
      },
      {
       "t": 1794354290,
       "v": 2.8
      },
      {
       "t": 1794354473,
       "v": 2.9
      },
      {
       "t": 1794354657,
       "v": 3.0
      },
      {
       "t": 1794354840,
       "v": 3.1
      },
      {
       "t": 1794355023,
       "v": 3.2
      },
      {
       "t": 1794355206,
       "v": 3.2
      },
      {
       "t": 1794355389,
       "v": 3.3
      },
      {
       "t": 1794355572,
       "v": 3.3
      },
      {
       "t": 1794355755,
       "v": 3.4
      },
      {
       "t": 1794355938,
       "v": 3.4
      },
      {
       "t": 1794356121,
       "v": 3.4
      },
      {
       "t": 1794356304,
       "v": 3.5
      },
      {
       "t": 1794356487,
       "v": 3.5
      },
      {
       "t": 1794356670,
       "v": 3.6
      },
      {
       "t": 1794356853,
       "v": 3.6
      },
      {
       "t": 1794357036,
       "v": 3.7
      },
      {
       "t": 1794357219,
       "v": 3.8
      },
      {
       "t": 1794357402,
       "v": 3.9
      },
      {
       "t": 1794357585,
       "v": 4.0
      },
      {
       "t": 1794357768,
       "v": 4.1
      },
      {
       "t": 1794357951,
       "v": 4.2
      },
      {
       "t": 1794358134,
       "v": 4.4
      },
      {
       "t": 1794358318,
       "v": 4.5
      },
      {
       "t": 1794358501,
       "v": 4.7
      },
      {
       "t": 1794358684,
       "v": 4.9
      },
      {
       "t": 1794358867,
       "v": 5.2
      },
      {
       "t": 1794359050,
       "v": 5.4
      },
      {
       "t": 1794359233,
       "v": 5.6
      },
      {
       "t": 1794359416,
       "v": 5.9
      },
      {
       "t": 1794359599,
       "v": 6.1
      },
      {
       "t": 1794359782,
       "v": 6.4
      },
      {
       "t": 1794359965,
       "v": 6.6
      },
      {
       "t": 1794360148,
       "v": 6.9
      },
      {
       "t": 1794360331,
       "v": 7.1
      },
      {
       "t": 1794360514,
       "v": 7.4
      },
      {
       "t": 1794360697,
       "v": 7.6
      },
      {
       "t": 1794360880,
       "v": 7.8
      },
      {
       "t": 1794361063,
       "v": 8.0
      },
      {
       "t": 1794361246,
       "v": 8.2
      },
      {
       "t": 1794361429,
       "v": 8.4
      },
      {
       "t": 1794361612,
       "v": 8.6
      },
      {
       "t": 1794361796,
       "v": 8.7
      },
      {
       "t": 1794361979,
       "v": 8.8
      },
      {
       "t": 1794362162,
       "v": 8.9
      },
      {
       "t": 1794362345,
       "v": 9.0
      },
      {
       "t": 1794362528,
       "v": 9.1
      },
      {
       "t": 1794362711,
       "v": 9.2
      },
      {
       "t": 1794362894,
       "v": 9.2
      },
      {
       "t": 1794363077,
       "v": 9
      }
     ],
     "weekly": [
      {
       "t": 1793931077,
       "v": 0.6
      },
      {
       "t": 1793936282,
       "v": 0.7
      },
      {
       "t": 1793941486,
       "v": 0.9
      },
      {
       "t": 1793946691,
       "v": 1.1
      },
      {
       "t": 1793951896,
       "v": 1.3
      },
      {
       "t": 1793957101,
       "v": 1.5
      },
      {
       "t": 1793962306,
       "v": 1.6
      },
      {
       "t": 1793967511,
       "v": 1.8
      },
      {
       "t": 1793972715,
       "v": 2.0
      },
      {
       "t": 1793977920,
       "v": 2.1
      },
      {
       "t": 1793983125,
       "v": 2.3
      },
      {
       "t": 1793988330,
       "v": 2.4
      },
      {
       "t": 1793993535,
       "v": 2.6
      },
      {
       "t": 1793998740,
       "v": 2.7
      },
      {
       "t": 1794003944,
       "v": 2.8
      },
      {
       "t": 1794009149,
       "v": 2.9
      },
      {
       "t": 1794014354,
       "v": 3.0
      },
      {
       "t": 1794019559,
       "v": 3.1
      },
      {
       "t": 1794024764,
       "v": 3.2
      },
      {
       "t": 1794029968,
       "v": 3.3
      },
      {
       "t": 1794035173,
       "v": 3.4
      },
      {
       "t": 1794040378,
       "v": 3.5
      },
      {
       "t": 1794045583,
       "v": 3.6
      },
      {
       "t": 1794050788,
       "v": 3.6
      },
      {
       "t": 1794055993,
       "v": 3.7
      },
      {
       "t": 1794061197,
       "v": 3.9
      },
      {
       "t": 1794066402,
       "v": 4.0
      },
      {
       "t": 1794071607,
       "v": 4.1
      },
      {
       "t": 1794076812,
       "v": 4.2
      },
      {
       "t": 1794082017,
       "v": 4.4
      },
      {
       "t": 1794087221,
       "v": 4.5
      },
      {
       "t": 1794092426,
       "v": 4.7
      },
      {
       "t": 1794097631,
       "v": 4.9
      },
      {
       "t": 1794102836,
       "v": 5.1
      },
      {
       "t": 1794108041,
       "v": 5.3
      },
      {
       "t": 1794113246,
       "v": 5.5
      },
      {
       "t": 1794118450,
       "v": 5.7
      },
      {
       "t": 1794123655,
       "v": 5.9
      },
      {
       "t": 1794128860,
       "v": 6.1
      },
      {
       "t": 1794134065,
       "v": 6.3
      },
      {
       "t": 1794139270,
       "v": 6.6
      },
      {
       "t": 1794144474,
       "v": 6.8
      },
      {
       "t": 1794149679,
       "v": 7.0
      },
      {
       "t": 1794154884,
       "v": 7.3
      },
      {
       "t": 1794160089,
       "v": 7.5
      },
      {
       "t": 1794165294,
       "v": 7.7
      },
      {
       "t": 1794170499,
       "v": 7.9
      },
      {
       "t": 1794175703,
       "v": 8.1
      },
      {
       "t": 1794180908,
       "v": 8.3
      },
      {
       "t": 1794186113,
       "v": 8.5
      },
      {
       "t": 1794191318,
       "v": 8.7
      },
      {
       "t": 1794196523,
       "v": 8.8
      },
      {
       "t": 1794201727,
       "v": 9.0
      },
      {
       "t": 1794206932,
       "v": 9.1
      },
      {
       "t": 1794212137,
       "v": 9.3
      },
      {
       "t": 1794217342,
       "v": 9.4
      },
      {
       "t": 1794222547,
       "v": 9.5
      },
      {
       "t": 1794227752,
       "v": 9.6
      },
      {
       "t": 1794232956,
       "v": 9.8
      },
      {
       "t": 1794238161,
       "v": 9.9
      },
      {
       "t": 1794243366,
       "v": 10.0
      },
      {
       "t": 1794248571,
       "v": 10.1
      },
      {
       "t": 1794253776,
       "v": 10.2
      },
      {
       "t": 1794258980,
       "v": 10.3
      },
      {
       "t": 1794264185,
       "v": 10.4
      },
      {
       "t": 1794269390,
       "v": 10.5
      },
      {
       "t": 1794274595,
       "v": 10.7
      },
      {
       "t": 1794279800,
       "v": 10.8
      },
      {
       "t": 1794285005,
       "v": 11.0
      },
      {
       "t": 1794290209,
       "v": 11.1
      },
      {
       "t": 1794295414,
       "v": 11.3
      },
      {
       "t": 1794300619,
       "v": 11.5
      },
      {
       "t": 1794305824,
       "v": 11.7
      },
      {
       "t": 1794311029,
       "v": 11.8
      },
      {
       "t": 1794316233,
       "v": 12.1
      },
      {
       "t": 1794321438,
       "v": 12.3
      },
      {
       "t": 1794326643,
       "v": 12.5
      },
      {
       "t": 1794331848,
       "v": 12.7
      },
      {
       "t": 1794337053,
       "v": 13.0
      },
      {
       "t": 1794342258,
       "v": 13.2
      },
      {
       "t": 1794347462,
       "v": 13.5
      },
      {
       "t": 1794352667,
       "v": 13.7
      },
      {
       "t": 1794357872,
       "v": 13.9
      },
      {
       "t": 1794363077,
       "v": 14
      }
     ],
     "monthly": [
      {
       "t": 1792030277,
       "v": 0.4
      },
      {
       "t": 1792049880,
       "v": 0.4
      },
      {
       "t": 1792069484,
       "v": 0.4
      },
      {
       "t": 1792089087,
       "v": 0.4
      },
      {
       "t": 1792108690,
       "v": 0.4
      },
      {
       "t": 1792128294,
       "v": 0.5
      },
      {
       "t": 1792147897,
       "v": 0.5
      },
      {
       "t": 1792167500,
       "v": 0.6
      },
      {
       "t": 1792187104,
       "v": 0.6
      },
      {
       "t": 1792206707,
       "v": 0.6
      },
      {
       "t": 1792226310,
       "v": 0.7
      },
      {
       "t": 1792245914,
       "v": 0.7
      },
      {
       "t": 1792265517,
       "v": 0.8
      },
      {
       "t": 1792285121,
       "v": 0.8
      },
      {
       "t": 1792304724,
       "v": 0.9
      },
      {
       "t": 1792324327,
       "v": 0.9
      },
      {
       "t": 1792343931,
       "v": 1.0
      },
      {
       "t": 1792363534,
       "v": 1.1
      },
      {
       "t": 1792383137,
       "v": 1.1
      },
      {
       "t": 1792402741,
       "v": 1.2
      },
      {
       "t": 1792422344,
       "v": 1.2
      },
      {
       "t": 1792441947,
       "v": 1.3
      },
      {
       "t": 1792461551,
       "v": 1.4
      },
      {
       "t": 1792481154,
       "v": 1.4
      },
      {
       "t": 1792500758,
       "v": 1.5
      },
      {
       "t": 1792520361,
       "v": 1.6
      },
      {
       "t": 1792539964,
       "v": 1.6
      },
      {
       "t": 1792559568,
       "v": 1.7
      },
      {
       "t": 1792579171,
       "v": 1.8
      },
      {
       "t": 1792598774,
       "v": 1.9
      },
      {
       "t": 1792618378,
       "v": 1.9
      },
      {
       "t": 1792637981,
       "v": 2.0
      },
      {
       "t": 1792657584,
       "v": 2.1
      },
      {
       "t": 1792677188,
       "v": 2.2
      },
      {
       "t": 1792696791,
       "v": 2.3
      },
      {
       "t": 1792716395,
       "v": 2.3
      },
      {
       "t": 1792735998,
       "v": 2.4
      },
      {
       "t": 1792755601,
       "v": 2.5
      },
      {
       "t": 1792775205,
       "v": 2.6
      },
      {
       "t": 1792794808,
       "v": 2.7
      },
      {
       "t": 1792814411,
       "v": 2.8
      },
      {
       "t": 1792834015,
       "v": 2.8
      },
      {
       "t": 1792853618,
       "v": 2.9
      },
      {
       "t": 1792873221,
       "v": 3.0
      },
      {
       "t": 1792892825,
       "v": 3.1
      },
      {
       "t": 1792912428,
       "v": 3.2
      },
      {
       "t": 1792932031,
       "v": 3.3
      },
      {
       "t": 1792951635,
       "v": 3.4
      },
      {
       "t": 1792971238,
       "v": 3.5
      },
      {
       "t": 1792990842,
       "v": 3.6
      },
      {
       "t": 1793010445,
       "v": 3.7
      },
      {
       "t": 1793030048,
       "v": 3.8
      },
      {
       "t": 1793049652,
       "v": 3.9
      },
      {
       "t": 1793069255,
       "v": 4.0
      },
      {
       "t": 1793088858,
       "v": 4.1
      },
      {
       "t": 1793108462,
       "v": 4.2
      },
      {
       "t": 1793128065,
       "v": 4.3
      },
      {
       "t": 1793147668,
       "v": 4.4
      },
      {
       "t": 1793167272,
       "v": 4.5
      },
      {
       "t": 1793186875,
       "v": 4.6
      },
      {
       "t": 1793206479,
       "v": 4.7
      },
      {
       "t": 1793226082,
       "v": 4.8
      },
      {
       "t": 1793245685,
       "v": 4.9
      },
      {
       "t": 1793265289,
       "v": 5.0
      },
      {
       "t": 1793284892,
       "v": 5.1
      },
      {
       "t": 1793304495,
       "v": 5.2
      },
      {
       "t": 1793324099,
       "v": 5.3
      },
      {
       "t": 1793343702,
       "v": 5.4
      },
      {
       "t": 1793363305,
       "v": 5.5
      },
      {
       "t": 1793382909,
       "v": 5.6
      },
      {
       "t": 1793402512,
       "v": 5.8
      },
      {
       "t": 1793422116,
       "v": 5.9
      },
      {
       "t": 1793441719,
       "v": 6.0
      },
      {
       "t": 1793461322,
       "v": 6.1
      },
      {
       "t": 1793480926,
       "v": 6.2
      },
      {
       "t": 1793500529,
       "v": 6.3
      },
      {
       "t": 1793520132,
       "v": 6.4
      },
      {
       "t": 1793539736,
       "v": 6.6
      },
      {
       "t": 1793559339,
       "v": 6.7
      },
      {
       "t": 1793578942,
       "v": 6.8
      },
      {
       "t": 1793598546,
       "v": 6.9
      },
      {
       "t": 1793618149,
       "v": 7.0
      },
      {
       "t": 1793637752,
       "v": 7.1
      },
      {
       "t": 1793657356,
       "v": 7.3
      },
      {
       "t": 1793676959,
       "v": 7.4
      },
      {
       "t": 1793696563,
       "v": 7.5
      },
      {
       "t": 1793716166,
       "v": 7.6
      },
      {
       "t": 1793735769,
       "v": 7.8
      },
      {
       "t": 1793755373,
       "v": 7.9
      },
      {
       "t": 1793774976,
       "v": 8.0
      },
      {
       "t": 1793794579,
       "v": 8.1
      },
      {
       "t": 1793814183,
       "v": 8.2
      },
      {
       "t": 1793833786,
       "v": 8.4
      },
      {
       "t": 1793853389,
       "v": 8.5
      },
      {
       "t": 1793872993,
       "v": 8.6
      },
      {
       "t": 1793892596,
       "v": 8.8
      },
      {
       "t": 1793912200,
       "v": 8.9
      },
      {
       "t": 1793931803,
       "v": 9.0
      },
      {
       "t": 1793951406,
       "v": 9.1
      },
      {
       "t": 1793971010,
       "v": 9.3
      },
      {
       "t": 1793990613,
       "v": 9.4
      },
      {
       "t": 1794010216,
       "v": 9.5
      },
      {
       "t": 1794029820,
       "v": 9.7
      },
      {
       "t": 1794049423,
       "v": 9.8
      },
      {
       "t": 1794069026,
       "v": 9.9
      },
      {
       "t": 1794088630,
       "v": 10.1
      },
      {
       "t": 1794108233,
       "v": 10.2
      },
      {
       "t": 1794127837,
       "v": 10.3
      },
      {
       "t": 1794147440,
       "v": 10.5
      },
      {
       "t": 1794167043,
       "v": 10.6
      },
      {
       "t": 1794186647,
       "v": 10.7
      },
      {
       "t": 1794206250,
       "v": 10.9
      },
      {
       "t": 1794225853,
       "v": 11.0
      },
      {
       "t": 1794245457,
       "v": 11.2
      },
      {
       "t": 1794265060,
       "v": 11.3
      },
      {
       "t": 1794284663,
       "v": 11.4
      },
      {
       "t": 1794304267,
       "v": 11.6
      },
      {
       "t": 1794323870,
       "v": 11.7
      },
      {
       "t": 1794343473,
       "v": 11.9
      },
      {
       "t": 1794363077,
       "v": 12
      }
     ]
    },
    "available": true
   }
  ],
  "today_cost_usd": 5.98,
  "tokens_today": 214600,
  "cost_trend": [
   {
    "date": "2026-11-05",
    "cost": 3.2
   },
   {
    "date": "2026-11-06",
    "cost": 4.8
   },
   {
    "date": "2026-11-07",
    "cost": 2.9
   },
   {
    "date": "2026-11-08",
    "cost": 6.1
   },
   {
    "date": "2026-11-09",
    "cost": 5.4
   },
   {
    "date": "2026-11-10",
    "cost": 4.2
   },
   {
    "date": "2026-11-11",
    "cost": 5.98
   }
  ],
  "estimate_note": "本地按 token 估算，与账单可能存在 ±5% 偏差"
 },
 "drift": {
  "repo": {
   "commit": "9f2c1ab",
   "committed_at": "2026-11-11T11:50:00+08:00",
   "subject": "config: 去掉 teams/google_chat 的 platform_toolsets",
   "dirty_files": 0,
   "dirty_sample": []
  },
  "artifacts": [
   {
    "id": "hanbao-soul",
    "label": "憨包 SOUL",
    "repo_label": "server/SOUL.md",
    "live_label": ".hermes/SOUL.md",
    "deploy": "board-deploy.sh",
    "status": "same",
    "repo_mtime": "2026-11-07T15:44",
    "live_mtime": "2026-11-07T15:44",
    "tolerated": false,
    "changed": []
   },
   {
    "id": "hamburger-soul",
    "label": "汉堡 SOUL",
    "repo_label": "server/hamburger/SOUL.md",
    "live_label": "profiles/hamburger/SOUL.md",
    "deploy": "hamburger-deploy.sh",
    "status": "drift",
    "repo_mtime": "2026-11-10T10:12",
    "live_mtime": "2026-11-08T17:13",
    "tolerated": false,
    "changed": []
   },
   {
    "id": "heybox-soul",
    "label": "heybox SOUL",
    "repo_label": "server/heybox/SOUL.md + PROFILE_EXTRA.md",
    "live_label": "profiles/heybox/SOUL.md",
    "deploy": "agent-bridge-deploy.sh",
    "status": "same",
    "repo_mtime": "2026-11-08T16:37",
    "live_mtime": "2026-11-08T16:37",
    "tolerated": false,
    "changed": []
   },
   {
    "id": "biubiu-soul",
    "label": "biubiu SOUL",
    "repo_label": "server/biubiu/SOUL.md + PROFILE_EXTRA.md",
    "live_label": "profiles/biubiu/SOUL.md",
    "deploy": "agent-bridge-deploy.sh",
    "status": "same",
    "repo_mtime": "2026-11-08T16:37",
    "live_mtime": "2026-11-08T16:37",
    "tolerated": false,
    "changed": []
   },
   {
    "id": "config",
    "label": "config.yaml（模板）",
    "repo_label": "server/config.yaml",
    "live_label": ".hermes/config.yaml",
    "deploy": "手工同步",
    "status": "template",
    "repo_mtime": "2026-11-11T11:50",
    "live_mtime": "2026-11-11T11:49",
    "tolerated": true,
    "changed": []
   },
   {
    "id": "heybox-sidecar-code",
    "label": "heybox sidecar 代码",
    "repo_label": "server/heybox/*.py + server/shared/*",
    "live_label": "hermes-heybox/*.py",
    "deploy": "heybox-deploy.sh",
    "status": "same",
    "repo_mtime": "2026-11-10T18:03",
    "live_mtime": "2026-11-10T18:03",
    "tolerated": false,
    "changed": []
   },
   {
    "id": "heybox-sidecar-config",
    "label": "heybox sidecar 配置/人设",
    "repo_label": "server/heybox/{config,SOUL,PROFILE_EXTRA,service,mem0}",
    "live_label": "hermes-heybox/{config,SOUL,PROFILE_EXTRA,service,mem0}",
    "deploy": "heybox-deploy.sh",
    "status": "same",
    "repo_mtime": "2026-11-10T18:03",
    "live_mtime": "2026-11-10T18:03",
    "tolerated": false,
    "changed": []
   },
   {
    "id": "biubiu-sidecar-code",
    "label": "biubiu sidecar 代码",
    "repo_label": "server/biubiu/*.py + server/scripts/*",
    "live_label": "hermes-biubiu/*.py",
    "deploy": "biubiu-deploy.sh",
    "status": "drift",
    "repo_mtime": "2026-11-10T17:50",
    "live_mtime": "2026-11-10T16:41",
    "tolerated": false,
    "changed": [
     "biubiu.py"
    ]
   },
   {
    "id": "biubiu-sidecar-config",
    "label": "biubiu sidecar 配置/人设",
    "repo_label": "server/biubiu/{config,SOUL,PROFILE_EXTRA,service,mem0}",
    "live_label": "hermes-biubiu/{config,SOUL,PROFILE_EXTRA,service,mem0}",
    "deploy": "biubiu-deploy.sh",
    "status": "same",
    "repo_mtime": "2026-11-10T13:50",
    "live_mtime": "2026-11-10T16:42",
    "tolerated": false,
    "changed": []
   }
  ],
  "summary": {
   "same": 7,
   "drift": 1,
   "template": 1,
   "missing": 0
  }
 },
 "system": {
  "cores": 1,
  "load": [
   0.71,
   0.97,
   0.79
  ],
  "uptime_seconds": 1103880,
  "memory": {
   "total": 2059308032,
   "available": 1122500800,
   "used_pct": 45.5
  },
  "swap": {
   "total": 5660000000,
   "used": 913600000,
   "used_pct": 16.1
  },
  "swappiness": 10,
  "malloc_arena_max": 2,
  "disk": {
   "total": 55834574848,
   "used": 23622320128,
   "free": 30064771072,
   "percent": 45.0
  },
  "network": [
   {
    "id": "telegram",
    "name": "Telegram API",
    "ok": true,
    "status": 200,
    "latency_ms": 187
   },
   {
    "id": "discord",
    "name": "Discord API",
    "ok": true,
    "status": 200,
    "latency_ms": 142
   },
   {
    "id": "xiaoheihe",
    "name": "小黑盒",
    "ok": true,
    "status": 200,
    "latency_ms": 64
   },
   {
    "id": "opencode",
    "name": "OpenCode",
    "ok": false,
    "status": null,
    "latency_ms": null,
    "error": "TimeoutError"
   }
  ],
  "checked": "2026-11-11T10:11:17+08:00"
 },
 "events": {
  "events": [
   {
    "id": "e1",
    "time": "2026-11-11T22:14:00+08:00",
    "type": "error",
    "severity": "error",
    "title": "Biubiu WebSocket 异常关闭",
    "detail": "重连 3/5，房间暂时不可用",
    "role": "biubiu"
   },
   {
    "id": "e2",
    "time": "2026-11-11T22:17:00+08:00",
    "type": "service",
    "severity": "warning",
    "title": "hermes-biubiu 停止",
    "detail": "服务进入 inactive 状态",
    "role": "biubiu"
   },
   {
    "id": "e3",
    "time": "2026-11-11T22:13:00+08:00",
    "type": "errors",
    "severity": "info",
    "title": "错误采集完成",
    "detail": "13 源 · 新增 6 条",
    "role": "system"
   },
   {
    "id": "e4",
    "time": "2026-11-11T19:41:00+08:00",
    "type": "alert",
    "severity": "warning",
    "title": "ETF 溢价越过阈值",
    "detail": "最高 3.12% · Bark 已推送",
    "role": "sentinel"
   },
   {
    "id": "e5",
    "time": "2026-11-11T17:30:00+08:00",
    "type": "cron",
    "severity": "error",
    "title": "Twitch Drops 任务失败",
    "detail": "HTTP 403 · 重试 2 次",
    "role": "sentinel"
   },
   {
    "id": "e6",
    "time": "2026-11-11T13:05:00+08:00",
    "type": "alert",
    "severity": "warning",
    "title": "Bark 推送超时后成功",
    "detail": "10s timeout · retry ok",
    "role": "sentinel"
   },
   {
    "id": "e7",
    "time": "2026-11-11T10:00:00+08:00",
    "type": "output",
    "severity": "info",
    "title": "每日教义已发布",
    "detail": "DC #教义厅 + 小黑盒",
    "role": "hamburger"
   },
   {
    "id": "e8",
    "time": "2026-11-11T08:00:00+08:00",
    "type": "output",
    "severity": "info",
    "title": "早报已发送",
    "detail": "语音 + 文字 · Telegram",
    "role": "hanbao"
   },
   {
    "id": "e9",
    "time": "2026-11-11T03:12:00+08:00",
    "type": "service",
    "severity": "warning",
    "title": "gateway 失败自愈重启",
    "detail": "部署窗口外 · 建议查看 OOM",
    "role": "system"
   },
   {
    "id": "e10",
    "time": "2026-11-11T00:12:00+08:00",
    "type": "approval",
    "severity": "info",
    "title": "新增待批议题",
    "detail": "Twitch 403 限流",
    "role": "system"
   }
  ]
 },
 "logs": [
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
  "22:50:02 INFO  gateway    cron digest scheduled 23:50"
 ]
};
