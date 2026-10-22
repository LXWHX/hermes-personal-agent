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
    "last_active": "2026-10-22T16:30:00+08:00",
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
    "last_active": "2026-10-22T16:33:00+08:00",
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
    "last_active": "2026-10-22T14:41:00+08:00",
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
   "checked": "2026-10-22T16:34:30+08:00"
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
    "since": "2026-10-21T00:00:00+08:00",
    "uptime_seconds": 475200,
    "segments": [
     {
      "start": "2026-10-21T16:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T17:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T17:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T18:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T18:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T19:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T19:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T20:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T20:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T21:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T21:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T22:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T22:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T23:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T23:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T00:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T00:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T01:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T01:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T02:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T02:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T03:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T03:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T04:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T04:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T05:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T05:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T06:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T06:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T07:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T07:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T08:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T08:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T09:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T09:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T10:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T10:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T11:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T11:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T12:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T12:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T13:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T13:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T14:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T14:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T15:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T15:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T16:04+08:00",
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
    "since": "2026-10-21T00:00:00+08:00",
    "uptime_seconds": 388800,
    "segments": [
     {
      "start": "2026-10-21T16:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T17:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T17:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T18:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T18:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T19:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T19:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T20:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T20:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T21:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T21:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T22:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T22:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T23:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T23:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T00:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T00:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T01:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T01:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T02:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T02:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T03:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T03:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T04:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T04:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T05:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T05:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T06:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T06:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T07:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T07:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T08:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T08:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T09:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T09:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T10:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T10:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T11:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T11:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T12:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T12:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T13:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T13:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T14:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T14:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T15:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T15:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T16:04+08:00",
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
    "since": "2026-10-22T13:17:00+08:00",
    "uptime_seconds": 0,
    "segments": [
     {
      "start": "2026-10-21T16:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T17:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T17:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T18:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T18:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T19:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T19:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T20:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T20:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T21:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T21:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T22:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T22:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T23:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T23:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T00:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T00:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T01:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T01:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T02:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T02:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T03:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T03:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T04:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T04:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T05:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T05:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T06:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T06:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T07:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T07:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T08:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T08:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T09:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T09:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T10:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T10:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T11:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T11:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T12:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T12:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T13:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T13:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T14:04+08:00",
      "up": false
     },
     {
      "start": "2026-10-22T14:34+08:00",
      "up": false
     },
     {
      "start": "2026-10-22T15:04+08:00",
      "up": false
     },
     {
      "start": "2026-10-22T15:34+08:00",
      "up": false
     },
     {
      "start": "2026-10-22T16:04+08:00",
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
    "since": "2026-10-21T00:00:00+08:00",
    "uptime_seconds": 784800,
    "segments": [
     {
      "start": "2026-10-21T16:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T17:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T17:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T18:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T18:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T19:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T19:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T20:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T20:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T21:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T21:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T22:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T22:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T23:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T23:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T00:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T00:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T01:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T01:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T02:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T02:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T03:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T03:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T04:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T04:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T05:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T05:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T06:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T06:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T07:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T07:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T08:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T08:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T09:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T09:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T10:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T10:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T11:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T11:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T12:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T12:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T13:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T13:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T14:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T14:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T15:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T15:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T16:04+08:00",
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
    "since": "2026-10-21T00:00:00+08:00",
    "uptime_seconds": 784800,
    "segments": [
     {
      "start": "2026-10-21T16:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T17:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T17:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T18:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T18:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T19:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T19:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T20:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T20:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T21:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T21:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T22:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T22:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T23:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T23:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T00:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T00:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T01:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T01:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T02:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T02:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T03:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T03:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T04:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T04:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T05:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T05:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T06:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T06:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T07:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T07:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T08:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T08:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T09:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T09:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T10:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T10:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T11:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T11:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T12:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T12:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T13:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T13:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T14:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T14:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T15:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T15:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T16:04+08:00",
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
    "since": "2026-10-21T00:00:00+08:00",
    "uptime_seconds": 784800,
    "segments": [
     {
      "start": "2026-10-21T16:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T17:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T17:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T18:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T18:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T19:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T19:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T20:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T20:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T21:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T21:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T22:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T22:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T23:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-21T23:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T00:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T00:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T01:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T01:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T02:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T02:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T03:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T03:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T04:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T04:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T05:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T05:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T06:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T06:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T07:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T07:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T08:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T08:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T09:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T09:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T10:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T10:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T11:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T11:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T12:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T12:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T13:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T13:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T14:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T14:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T15:04+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T15:34+08:00",
      "up": true
     },
     {
      "start": "2026-10-22T16:04+08:00",
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
    "last_run": "2026-10-22T08:00:00+08:00",
    "next_run": "2026-10-23T08:00:00+08:00",
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
    "last_run": "2026-10-22T22:00:00+08:00",
    "next_run": "2026-10-22T22:00:00+08:00",
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
    "last_run": "2026-10-22T22:30:00+08:00",
    "next_run": "2026-10-22T22:30:00+08:00",
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
    "last_run": "2026-10-22T10:00:00+08:00",
    "next_run": "2026-10-23T10:00:00+08:00",
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
    "last_run": "2026-10-22T12:23:00+08:00",
    "next_run": "2026-10-23T12:23:00+08:00",
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
    "last_run": "2026-10-22T09:30:00+08:00",
    "next_run": "2026-10-23T09:30:00+08:00",
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
    "last_run": "2026-10-22T17:30:00+08:00",
    "next_run": "2026-10-22T17:30:00+08:00",
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
    "last_run": "2026-10-22T10:35:00+08:00",
    "next_run": "2026-10-23T10:35:00+08:00",
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
    "last_run": "2026-10-22T13:05:00+08:00",
    "next_run": "2026-10-23T13:05:00+08:00",
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
    "next_run": "2026-10-23T14:35:00+08:00",
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
    "last_run": "2026-10-22T19:35:00+08:00",
    "next_run": "2026-10-22T19:35:00+08:00",
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
    "last_run": "2026-10-22T23:50:00+08:00",
    "next_run": "2026-10-22T23:50:00+08:00",
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
    "last_run": "2026-10-22T15:13:00+08:00",
    "next_run": "2026-10-23T15:13:00+08:00",
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
    "last_run": "2026-10-22T16:30:00+08:00",
    "next_run": "2026-10-23T16:30:00+08:00",
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
    "last_run": "2026-10-22T16:30:00+08:00",
    "next_run": "2026-10-23T16:30:00+08:00",
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
    "date": "2026-10-16",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 7,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 8,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 9,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 10,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 11,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 12,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 13,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 14,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 16,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 17,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 18,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 19,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 20,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 21,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 22,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-10-16",
    "hour": 23,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 7,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 8,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 9,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 10,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 11,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 12,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 13,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 14,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 16,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 17,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 18,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 19,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 20,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 21,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 22,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-17",
    "hour": 23,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 7,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 8,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 9,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 10,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 11,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 12,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 13,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 14,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 15,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 16,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 17,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 18,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 19,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 20,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 21,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 22,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-18",
    "hour": 23,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 8,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 9,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 10,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 11,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 12,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 13,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 14,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 15,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 16,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 17,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 18,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 19,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 20,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 21,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 22,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-10-19",
    "hour": 23,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 8,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 9,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 10,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 11,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 12,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 13,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 14,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 16,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 17,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 18,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 19,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 20,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 21,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 22,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-10-20",
    "hour": 23,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 7,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 8,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 9,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 10,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 11,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 12,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 13,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 14,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 16,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 17,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 18,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 19,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 20,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 21,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 22,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-10-21",
    "hour": 23,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 7,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 8,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 9,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 10,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 11,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 12,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 13,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 14,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 15,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 16,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 17,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 18,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 19,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 20,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 21,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 22,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-10-22",
    "hour": 23,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 1,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 3,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 4,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 5,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 7,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 8,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 9,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 10,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 11,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 12,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 13,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 14,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 15,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 16,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 17,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 18,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 19,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 20,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 21,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 22,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-16",
    "hour": 23,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 1,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 4,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 5,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 8,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 9,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 10,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 11,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 12,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 13,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 14,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 16,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 17,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 18,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 19,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 20,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 21,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 22,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-10-17",
    "hour": 23,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 0,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 1,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 2,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 4,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 5,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 6,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 7,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 8,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 9,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 10,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 11,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 12,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 13,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 14,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 16,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 17,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 18,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 19,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 20,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 21,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 22,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-18",
    "hour": 23,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 0,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 4,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 5,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 7,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 8,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 9,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 10,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 11,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 12,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 13,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 14,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 15,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 16,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 17,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 18,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 19,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 20,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 21,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 22,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-19",
    "hour": 23,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 0,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 1,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 2,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 3,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 5,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 7,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 8,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 9,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 10,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 11,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 12,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 13,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 14,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 15,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 16,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 17,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 18,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 19,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 20,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 21,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 22,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-10-20",
    "hour": 23,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 0,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 1,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 2,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 4,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 8,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 9,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 10,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 11,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 12,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 13,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 14,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 15,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 16,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 17,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 18,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 19,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 20,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 21,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 22,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-10-21",
    "hour": 23,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 0,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 5,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 8,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 9,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 10,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 11,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 12,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 13,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 14,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 15,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 16,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 17,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 18,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 19,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 20,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 21,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 22,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-10-22",
    "hour": 23,
    "count": 1
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 13,
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 14,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 15,
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 16,
    "count": 1
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 17,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 18,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 19,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 20,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 21,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 22,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-10-16",
    "hour": 23,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 13,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 14,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 15,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 16,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 17,
    "count": 5
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 18,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 19,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 20,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 21,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 22,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-17",
    "hour": 23,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 13,
    "count": 1
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 14,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 15,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 16,
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 17,
    "count": 3
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 18,
    "count": 3
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 19,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 20,
    "count": 4
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 21,
    "count": 3
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 22,
    "count": 4
   },
   {
    "role": "biubiu",
    "date": "2026-10-18",
    "hour": 23,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 13,
    "count": 3
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 14,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 15,
    "count": 5
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 16,
    "count": 4
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 17,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 18,
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 19,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 20,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 21,
    "count": 5
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 22,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-10-19",
    "hour": 23,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 13,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 14,
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 15,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 16,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 17,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 18,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 19,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 20,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 21,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 22,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-10-20",
    "hour": 23,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 13,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 14,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 15,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 16,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 17,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 18,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 19,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 20,
    "count": 1
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 21,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 22,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-21",
    "hour": 23,
    "count": 5
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 13,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 14,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 15,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 16,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 17,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 18,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 19,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 20,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 21,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 22,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-10-22",
    "hour": 23,
    "count": 0
   }
  ],
  "peak": {
   "role": "hamburger",
   "date": "2026-10-21",
   "hour": 21,
   "count": 26
  },
  "total": 1392
 },
 "errors": {
  "date": "2026-10-22",
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
    "date": "2026-10-16",
    "count": 5,
    "available": true
   },
   {
    "date": "2026-10-17",
    "count": 8,
    "available": true
   },
   {
    "date": "2026-10-18",
    "count": 3,
    "available": true
   },
   {
    "date": "2026-10-19",
    "count": 11,
    "available": true
   },
   {
    "date": "2026-10-20",
    "count": 7,
    "available": true
   },
   {
    "date": "2026-10-21",
    "count": 4,
    "available": true
   },
   {
    "date": "2026-10-22",
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
    "time": "2026-10-22T22:14:00+08:00",
    "source": "Biubiu",
    "level": "ERROR",
    "summary": "websocket closed: 1006 abnormal closure, reconnect 3/5",
    "raw": "websocket closed: 1006 abnormal closure, reconnect 3/5"
   },
   {
    "time": "2026-10-22T22:13:00+08:00",
    "source": "憨包引擎",
    "level": "ERROR",
    "summary": "cron heartbeat: delivery failed (retry ok)",
    "raw": "cron heartbeat: delivery failed (retry ok)"
   },
   {
    "time": "2026-10-22T21:58:00+08:00",
    "source": "夜巡",
    "level": "WARNING",
    "summary": "guild member sweep exceeded 30s",
    "raw": "guild member sweep exceeded 30s"
   },
   {
    "time": "2026-10-22T19:41:00+08:00",
    "source": "ETF溢价",
    "level": "WARNING",
    "summary": "premium 3.12% crossed alert threshold",
    "raw": "premium 3.12% crossed alert threshold"
   },
   {
    "time": "2026-10-22T17:30:00+08:00",
    "source": "游戏快报",
    "level": "ERROR",
    "summary": "twitch drops fetch HTTP 403",
    "raw": "twitch drops fetch HTTP 403"
   },
   {
    "time": "2026-10-22T16:02:00+08:00",
    "source": "问答流水线",
    "level": "WARNING",
    "summary": "digest draft truncated at 8000 chars",
    "raw": "digest draft truncated at 8000 chars"
   },
   {
    "time": "2026-10-22T13:05:00+08:00",
    "source": "ETF溢价",
    "level": "ERROR",
    "summary": "bark push timeout 10s (retry ok)",
    "raw": "bark push timeout 10s (retry ok)"
   },
   {
    "time": "2026-10-22T11:20:00+08:00",
    "source": "Biubiu",
    "level": "ERROR",
    "summary": "room join failed: token expired",
    "raw": "room join failed: token expired"
   },
   {
    "time": "2026-10-22T09:31:00+08:00",
    "source": "游戏热度",
    "level": "WARNING",
    "summary": "youtube source unavailable",
    "raw": "youtube source unavailable"
   },
   {
    "time": "2026-10-22T08:12:00+08:00",
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
   "updated": "2026-10-22",
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
       "start": "2026-10-22",
       "end": "2026-10-22",
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
        "转段": "2026-10-22T20:00",
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
    "at": "2026-10-22T20:00",
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
    "last_run": "2026-10-22T08:00:00+08:00",
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
    "last_run": "2026-10-22T12:23:00+08:00",
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
    "last_run": "2026-10-22T09:30:00+08:00",
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
    "last_run": "2026-10-22T17:30:00+08:00",
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
    "last_run": "2026-10-22T19:35:00+08:00",
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
    "last_run": "2026-10-21T23:50:00+08:00",
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
    "resets_at": "2026-10-23",
    "available": true
   },
   {
    "label": "汉堡",
    "key": "hamburger",
    "remaining": 72,
    "rolling": 18,
    "weekly": 28,
    "monthly": 24,
    "resets_at": "2026-10-25",
    "available": true
   },
   {
    "label": "小黑盒 / biubiu",
    "key": "sidecar",
    "remaining": 86,
    "rolling": 9,
    "weekly": 14,
    "monthly": 12,
    "resets_at": "2026-10-27",
    "available": true
   }
  ],
  "today_cost_usd": 5.98,
  "cost_trend": [
   {
    "date": "2026-10-16",
    "cost": 3.2
   },
   {
    "date": "2026-10-17",
    "cost": 4.8
   },
   {
    "date": "2026-10-18",
    "cost": 2.9
   },
   {
    "date": "2026-10-19",
    "cost": 6.1
   },
   {
    "date": "2026-10-20",
    "cost": 5.4
   },
   {
    "date": "2026-10-21",
    "cost": 4.2
   },
   {
    "date": "2026-10-22",
    "cost": 5.98
   }
  ],
  "estimate_note": "本地按 token 估算，与账单可能存在 ±5% 偏差"
 },
 "events": {
  "events": [
   {
    "id": "e1",
    "time": "2026-10-22T22:14:00+08:00",
    "type": "error",
    "severity": "error",
    "title": "Biubiu WebSocket 异常关闭",
    "detail": "重连 3/5，房间暂时不可用",
    "role": "biubiu"
   },
   {
    "id": "e2",
    "time": "2026-10-22T22:17:00+08:00",
    "type": "service",
    "severity": "warning",
    "title": "hermes-biubiu 停止",
    "detail": "服务进入 inactive 状态",
    "role": "biubiu"
   },
   {
    "id": "e3",
    "time": "2026-10-22T22:13:00+08:00",
    "type": "errors",
    "severity": "info",
    "title": "错误采集完成",
    "detail": "13 源 · 新增 6 条",
    "role": "system"
   },
   {
    "id": "e4",
    "time": "2026-10-22T19:41:00+08:00",
    "type": "alert",
    "severity": "warning",
    "title": "ETF 溢价越过阈值",
    "detail": "最高 3.12% · Bark 已推送",
    "role": "sentinel"
   },
   {
    "id": "e5",
    "time": "2026-10-22T17:30:00+08:00",
    "type": "cron",
    "severity": "error",
    "title": "Twitch Drops 任务失败",
    "detail": "HTTP 403 · 重试 2 次",
    "role": "sentinel"
   },
   {
    "id": "e6",
    "time": "2026-10-22T13:05:00+08:00",
    "type": "alert",
    "severity": "warning",
    "title": "Bark 推送超时后成功",
    "detail": "10s timeout · retry ok",
    "role": "sentinel"
   },
   {
    "id": "e7",
    "time": "2026-10-22T10:00:00+08:00",
    "type": "output",
    "severity": "info",
    "title": "每日教义已发布",
    "detail": "DC #教义厅 + 小黑盒",
    "role": "hamburger"
   },
   {
    "id": "e8",
    "time": "2026-10-22T08:00:00+08:00",
    "type": "output",
    "severity": "info",
    "title": "早报已发送",
    "detail": "语音 + 文字 · Telegram",
    "role": "hanbao"
   },
   {
    "id": "e9",
    "time": "2026-10-22T03:12:00+08:00",
    "type": "service",
    "severity": "warning",
    "title": "gateway 失败自愈重启",
    "detail": "部署窗口外 · 建议查看 OOM",
    "role": "system"
   },
   {
    "id": "e10",
    "time": "2026-10-22T00:12:00+08:00",
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
