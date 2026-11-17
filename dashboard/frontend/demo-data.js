window.HERMES_DEMO = {
 "overview": {
  "global": {
   "state": "degraded",
   "label": "部分降级",
   "note": "1 个角色离线 · 1 个任务失败 · 1 条任务逾期",
   "online_services": 6,
   "total_services": 7,
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
    "last_active": "2026-11-17T14:11:00+08:00",
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
    "role": "DISCORD + 黑盒语音",
    "platform": "Discord · 冲冲冲",
    "state": "typing",
    "state_label": "正在回复",
    "uptime_seconds": 388800,
    "last_active": "2026-11-17T14:14:00+08:00",
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
    "platform": "黑盒语音 · 房间",
    "state": "offline",
    "state_label": "离线",
    "uptime_seconds": 0,
    "last_active": "2026-11-17T12:41:00+08:00",
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
   "checked": "2026-11-17T14:15:49+08:00"
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
    "since": "2026-11-16T00:00:00+08:00",
    "uptime_seconds": 475200,
    "segments": [
     {
      "start": "2026-11-16T14:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T14:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T15:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T15:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T16:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T16:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T17:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T17:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T18:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T18:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T19:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T19:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T20:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T20:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T21:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T21:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T22:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T22:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T23:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T23:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T00:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T00:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T01:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T01:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T02:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T02:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T03:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T03:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T04:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T04:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T05:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T05:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T06:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T06:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T07:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T07:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T08:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T08:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T09:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T09:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T10:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T10:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T11:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T11:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T12:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T12:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T13:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T13:45+08:00",
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
    "since": "2026-11-16T00:00:00+08:00",
    "uptime_seconds": 388800,
    "segments": [
     {
      "start": "2026-11-16T14:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T14:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T15:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T15:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T16:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T16:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T17:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T17:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T18:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T18:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T19:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T19:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T20:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T20:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T21:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T21:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T22:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T22:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T23:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T23:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T00:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T00:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T01:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T01:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T02:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T02:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T03:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T03:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T04:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T04:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T05:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T05:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T06:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T06:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T07:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T07:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T08:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T08:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T09:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T09:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T10:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T10:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T11:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T11:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T12:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T12:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T13:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T13:45+08:00",
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
    "since": "2026-11-17T11:17:00+08:00",
    "uptime_seconds": 0,
    "segments": [
     {
      "start": "2026-11-16T14:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T14:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T15:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T15:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T16:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T16:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T17:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T17:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T18:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T18:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T19:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T19:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T20:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T20:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T21:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T21:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T22:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T22:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T23:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T23:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T00:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T00:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T01:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T01:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T02:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T02:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T03:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T03:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T04:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T04:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T05:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T05:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T06:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T06:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T07:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T07:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T08:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T08:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T09:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T09:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T10:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T10:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T11:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T11:45+08:00",
      "up": false
     },
     {
      "start": "2026-11-17T12:15+08:00",
      "up": false
     },
     {
      "start": "2026-11-17T12:45+08:00",
      "up": false
     },
     {
      "start": "2026-11-17T13:15+08:00",
      "up": false
     },
     {
      "start": "2026-11-17T13:45+08:00",
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
    "since": "2026-11-16T00:00:00+08:00",
    "uptime_seconds": 784800,
    "segments": [
     {
      "start": "2026-11-16T14:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T14:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T15:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T15:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T16:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T16:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T17:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T17:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T18:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T18:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T19:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T19:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T20:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T20:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T21:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T21:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T22:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T22:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T23:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T23:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T00:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T00:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T01:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T01:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T02:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T02:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T03:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T03:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T04:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T04:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T05:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T05:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T06:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T06:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T07:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T07:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T08:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T08:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T09:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T09:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T10:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T10:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T11:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T11:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T12:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T12:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T13:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T13:45+08:00",
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
    "since": "2026-11-16T00:00:00+08:00",
    "uptime_seconds": 784800,
    "segments": [
     {
      "start": "2026-11-16T14:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T14:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T15:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T15:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T16:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T16:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T17:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T17:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T18:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T18:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T19:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T19:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T20:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T20:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T21:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T21:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T22:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T22:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T23:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T23:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T00:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T00:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T01:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T01:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T02:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T02:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T03:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T03:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T04:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T04:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T05:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T05:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T06:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T06:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T07:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T07:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T08:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T08:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T09:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T09:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T10:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T10:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T11:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T11:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T12:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T12:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T13:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T13:45+08:00",
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
    "since": "2026-11-16T00:00:00+08:00",
    "uptime_seconds": 784800,
    "segments": [
     {
      "start": "2026-11-16T14:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T14:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T15:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T15:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T16:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T16:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T17:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T17:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T18:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T18:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T19:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T19:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T20:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T20:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T21:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T21:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T22:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T22:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T23:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T23:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T00:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T00:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T01:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T01:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T02:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T02:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T03:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T03:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T04:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T04:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T05:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T05:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T06:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T06:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T07:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T07:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T08:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T08:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T09:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T09:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T10:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T10:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T11:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T11:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T12:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T12:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T13:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T13:45+08:00",
      "up": true
     }
    ],
    "last_event": "本周期无重启"
   },
   {
    "unit": "hermes-kb",
    "label": "问答知识库",
    "role": "kb",
    "active": "active",
    "sub": "running",
    "state": "active",
    "pid": 971000,
    "restarts": 0,
    "memory_bytes": 48000000,
    "memory_human": "46 MB",
    "cpu_seconds": 2.4,
    "since": "2026-11-16T00:00:00+08:00",
    "uptime_seconds": 529200,
    "segments": [
     {
      "start": "2026-11-16T14:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T14:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T15:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T15:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T16:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T16:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T17:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T17:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T18:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T18:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T19:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T19:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T20:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T20:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T21:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T21:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T22:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T22:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T23:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-16T23:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T00:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T00:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T01:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T01:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T02:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T02:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T03:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T03:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T04:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T04:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T05:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T05:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T06:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T06:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T07:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T07:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T08:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T08:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T09:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T09:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T10:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T10:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T11:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T11:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T12:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T12:45+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T13:15+08:00",
      "up": true
     },
     {
      "start": "2026-11-17T13:45+08:00",
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
   "total": 7,
   "online": 6,
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
    "last_run": "2026-11-17T08:00:00+08:00",
    "next_run": "2026-11-18T08:00:00+08:00",
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
    "last_run": "2026-11-17T22:00:00+08:00",
    "next_run": "2026-11-17T22:00:00+08:00",
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
    "last_run": "2026-11-17T22:30:00+08:00",
    "next_run": "2026-11-17T22:30:00+08:00",
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
    "last_run": "2026-11-17T10:00:00+08:00",
    "next_run": "2026-11-18T10:00:00+08:00",
    "duration_s": 118,
    "result": "success",
    "summary": "DC #教义厅 + 黑盒语音 双投"
   },
   {
    "id": "游戏快报",
    "name": "游戏快报",
    "owner": "哨兵",
    "source": "cron",
    "schedule": "23 12 * * *",
    "schedule_label": "12:23",
    "last_run": "2026-11-17T12:23:00+08:00",
    "next_run": "2026-11-18T12:23:00+08:00",
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
    "last_run": "2026-11-17T09:30:00+08:00",
    "next_run": "2026-11-18T09:30:00+08:00",
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
    "last_run": "2026-11-17T17:30:00+08:00",
    "next_run": "2026-11-17T17:30:00+08:00",
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
    "last_run": "2026-11-17T10:35:00+08:00",
    "next_run": "2026-11-18T10:35:00+08:00",
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
    "last_run": "2026-11-17T13:05:00+08:00",
    "next_run": "2026-11-18T13:05:00+08:00",
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
    "next_run": "2026-11-17T14:35:00+08:00",
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
    "last_run": "2026-11-17T19:35:00+08:00",
    "next_run": "2026-11-17T19:35:00+08:00",
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
    "last_run": "2026-11-17T23:50:00+08:00",
    "next_run": "2026-11-17T23:50:00+08:00",
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
    "last_run": "2026-11-17T13:13:00+08:00",
    "next_run": "2026-11-18T13:13:00+08:00",
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
    "last_run": "2026-11-17T14:10:00+08:00",
    "next_run": "2026-11-18T14:10:00+08:00",
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
    "last_run": "2026-11-17T14:15:00+08:00",
    "next_run": "2026-11-18T14:15:00+08:00",
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
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 8,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 9,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 10,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 11,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 12,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 13,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 14,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 15,
    "count": 9
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
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 18,
    "count": 3
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
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 21,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 22,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-11",
    "hour": 23,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 7,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 8,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 9,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 10,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 11,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 12,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 13,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 14,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 16,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 17,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 18,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 19,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 20,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 21,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 22,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-12",
    "hour": 23,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 7,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 8,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 9,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 10,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 11,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 12,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 13,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 14,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 15,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 16,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 17,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 18,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 19,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 20,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 21,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 22,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-13",
    "hour": 23,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 8,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 9,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 10,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 11,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 12,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 13,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 14,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 15,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 16,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 17,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 18,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 19,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 20,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 21,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 22,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-11-14",
    "hour": 23,
    "count": 3
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 8,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 9,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 10,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 11,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 12,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 13,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 14,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 16,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 17,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 18,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 19,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 20,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 21,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 22,
    "count": 2
   },
   {
    "role": "hanbao",
    "date": "2026-11-15",
    "hour": 23,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 7,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 8,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 9,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 10,
    "count": 8
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 11,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 12,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 13,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 14,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 16,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 17,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 18,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 19,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 20,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 21,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 22,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-16",
    "hour": 23,
    "count": 1
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 7,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 8,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 9,
    "count": 9
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 10,
    "count": 7
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 11,
    "count": 4
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 12,
    "count": 6
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 13,
    "count": 5
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 14,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 15,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 16,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 17,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 18,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 19,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 20,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 21,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 22,
    "count": 0
   },
   {
    "role": "hanbao",
    "date": "2026-11-17",
    "hour": 23,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 1,
    "count": 2
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
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 4,
    "count": 1
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
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 8,
    "count": 1
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
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 11,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 12,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 13,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 14,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 15,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 16,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 17,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 18,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 19,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 20,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 21,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 22,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-11",
    "hour": 23,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 0,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 1,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 4,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 5,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 8,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 9,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 10,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 11,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 12,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 13,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 14,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 16,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 17,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 18,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 19,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 20,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 21,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 22,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-12",
    "hour": 23,
    "count": 6
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 0,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 1,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 2,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 4,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 5,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 6,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 7,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 8,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 9,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 10,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 11,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 12,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 13,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 14,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 15,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 16,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 17,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 18,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 19,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 20,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 21,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 22,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-13",
    "hour": 23,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 0,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 4,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 5,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 7,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 8,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 9,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 10,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 11,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 12,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 13,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 14,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 15,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 16,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 17,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 18,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 19,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 20,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 21,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 22,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-14",
    "hour": 23,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 0,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 1,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 2,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 3,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 5,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 7,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 8,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 9,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 10,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 11,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 12,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 13,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 14,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 15,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 16,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 17,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 18,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 19,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 20,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 21,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 22,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-15",
    "hour": 23,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 0,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 1,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 2,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 4,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 5,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 8,
    "count": 2
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 9,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 10,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 11,
    "count": 8
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 12,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 13,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 14,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 15,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 16,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 17,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 18,
    "count": 4
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 19,
    "count": 3
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 20,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 21,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 22,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-16",
    "hour": 23,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 0,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 1,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 2,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 3,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 4,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 5,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 6,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 7,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 8,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 9,
    "count": 1
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 10,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 11,
    "count": 9
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 12,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 13,
    "count": 7
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 14,
    "count": 5
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 15,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 16,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 17,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 18,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 19,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 20,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 21,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 22,
    "count": 0
   },
   {
    "role": "hamburger",
    "date": "2026-11-17",
    "hour": 23,
    "count": 0
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
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 14,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 15,
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 16,
    "count": 1
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 17,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 18,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 19,
    "count": 2
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
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 22,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-11-11",
    "hour": 23,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 13,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 14,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 15,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 16,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 17,
    "count": 5
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 18,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 19,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 20,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 21,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 22,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-12",
    "hour": 23,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 13,
    "count": 1
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 14,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 15,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 16,
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 17,
    "count": 3
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 18,
    "count": 3
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 19,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 20,
    "count": 4
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 21,
    "count": 3
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 22,
    "count": 4
   },
   {
    "role": "biubiu",
    "date": "2026-11-13",
    "hour": 23,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 13,
    "count": 3
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 14,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 15,
    "count": 5
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 16,
    "count": 4
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 17,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 18,
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 19,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 20,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 21,
    "count": 5
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 22,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-11-14",
    "hour": 23,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 13,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 14,
    "count": 6
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 15,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 16,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 17,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 18,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 19,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 20,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 21,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 22,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-11-15",
    "hour": 23,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 13,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 14,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 15,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 16,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 17,
    "count": 2
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 18,
    "count": 7
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 19,
    "count": 9
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 20,
    "count": 1
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 21,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 22,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-16",
    "hour": 23,
    "count": 5
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 0,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 1,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 2,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 3,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 4,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 5,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 6,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 7,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 8,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 9,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 10,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 11,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 12,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 13,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 14,
    "count": 8
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 15,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 16,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 17,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 18,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 19,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 20,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 21,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 22,
    "count": 0
   },
   {
    "role": "biubiu",
    "date": "2026-11-17",
    "hour": 23,
    "count": 0
   }
  ],
  "peak": {
   "role": "hamburger",
   "date": "2026-11-16",
   "hour": 21,
   "count": 26
  },
  "total": 1307
 },
 "errors": {
  "date": "2026-11-17",
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
    "date": "2026-11-11",
    "count": 5,
    "available": true
   },
   {
    "date": "2026-11-12",
    "count": 8,
    "available": true
   },
   {
    "date": "2026-11-13",
    "count": 3,
    "available": true
   },
   {
    "date": "2026-11-14",
    "count": 11,
    "available": true
   },
   {
    "date": "2026-11-15",
    "count": 7,
    "available": true
   },
   {
    "date": "2026-11-16",
    "count": 4,
    "available": true
   },
   {
    "date": "2026-11-17",
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
    "time": "2026-11-17T22:14:00+08:00",
    "source": "Biubiu",
    "level": "ERROR",
    "summary": "websocket closed: 1006 abnormal closure, reconnect 3/5",
    "raw": "websocket closed: 1006 abnormal closure, reconnect 3/5"
   },
   {
    "time": "2026-11-17T22:13:00+08:00",
    "source": "憨包引擎",
    "level": "ERROR",
    "summary": "cron heartbeat: delivery failed (retry ok)",
    "raw": "cron heartbeat: delivery failed (retry ok)"
   },
   {
    "time": "2026-11-17T21:58:00+08:00",
    "source": "夜巡",
    "level": "WARNING",
    "summary": "guild member sweep exceeded 30s",
    "raw": "guild member sweep exceeded 30s"
   },
   {
    "time": "2026-11-17T19:41:00+08:00",
    "source": "ETF溢价",
    "level": "WARNING",
    "summary": "premium 3.12% crossed alert threshold",
    "raw": "premium 3.12% crossed alert threshold"
   },
   {
    "time": "2026-11-17T17:30:00+08:00",
    "source": "游戏快报",
    "level": "ERROR",
    "summary": "twitch drops fetch HTTP 403",
    "raw": "twitch drops fetch HTTP 403"
   },
   {
    "time": "2026-11-17T16:02:00+08:00",
    "source": "问答流水线",
    "level": "WARNING",
    "summary": "digest draft truncated at 8000 chars",
    "raw": "digest draft truncated at 8000 chars"
   },
   {
    "time": "2026-11-17T13:05:00+08:00",
    "source": "ETF溢价",
    "level": "ERROR",
    "summary": "bark push timeout 10s (retry ok)",
    "raw": "bark push timeout 10s (retry ok)"
   },
   {
    "time": "2026-11-17T11:20:00+08:00",
    "source": "Biubiu",
    "level": "ERROR",
    "summary": "room join failed: token expired",
    "raw": "room join failed: token expired"
   },
   {
    "time": "2026-11-17T09:31:00+08:00",
    "source": "游戏热度",
    "level": "WARNING",
    "summary": "youtube source unavailable",
    "raw": "youtube source unavailable"
   },
   {
    "time": "2026-11-17T08:12:00+08:00",
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
   "updated": "2026-11-17",
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
       "start": "2026-11-17",
       "end": "2026-11-17",
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
        "转段": "2026-11-17T20:00",
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
    "at": "2026-11-17T20:00",
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
    "last_run": "2026-11-17T08:00:00+08:00",
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
    "last_run": "2026-11-17T12:23:00+08:00",
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
      "target": "黑盒语音",
      "ok": true,
      "note": "静默"
     }
    ]
   },
   {
    "id": "game-trends",
    "name": "游戏热度",
    "latin": "GAME TRENDS",
    "last_run": "2026-11-17T09:30:00+08:00",
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
    "last_run": "2026-11-17T17:30:00+08:00",
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
    "last_run": "2026-11-17T19:35:00+08:00",
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
    "last_run": "2026-11-16T23:50:00+08:00",
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
   "黑盒语音",
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
    "resets_at": "2026-11-20",
    "resets": {
     "rolling": "2026-11-17T16:00:00+08:00",
     "weekly": "2026-11-19T00:00:00+08:00",
     "monthly": "2026-11-20T00:00:00+08:00"
    },
    "history": {
     "rolling": [
      {
       "t": 1794885349,
       "v": 2.1
      },
      {
       "t": 1794885532,
       "v": 3.2
      },
      {
       "t": 1794885715,
       "v": 4.4
      },
      {
       "t": 1794885898,
       "v": 5.5
      },
      {
       "t": 1794886081,
       "v": 6.6
      },
      {
       "t": 1794886264,
       "v": 7.6
      },
      {
       "t": 1794886447,
       "v": 8.6
      },
      {
       "t": 1794886630,
       "v": 9.5
      },
      {
       "t": 1794886813,
       "v": 10.4
      },
      {
       "t": 1794886996,
       "v": 11.2
      },
      {
       "t": 1794887179,
       "v": 11.9
      },
      {
       "t": 1794887362,
       "v": 12.6
      },
      {
       "t": 1794887545,
       "v": 13.1
      },
      {
       "t": 1794887729,
       "v": 13.6
      },
      {
       "t": 1794887912,
       "v": 14.1
      },
      {
       "t": 1794888095,
       "v": 14.4
      },
      {
       "t": 1794888278,
       "v": 14.7
      },
      {
       "t": 1794888461,
       "v": 15.0
      },
      {
       "t": 1794888644,
       "v": 15.2
      },
      {
       "t": 1794888827,
       "v": 15.4
      },
      {
       "t": 1794889010,
       "v": 15.6
      },
      {
       "t": 1794889193,
       "v": 15.7
      },
      {
       "t": 1794889376,
       "v": 15.9
      },
      {
       "t": 1794889559,
       "v": 16.1
      },
      {
       "t": 1794889742,
       "v": 16.3
      },
      {
       "t": 1794889925,
       "v": 16.5
      },
      {
       "t": 1794890108,
       "v": 16.8
      },
      {
       "t": 1794890291,
       "v": 17.2
      },
      {
       "t": 1794890474,
       "v": 17.6
      },
      {
       "t": 1794890657,
       "v": 18.1
      },
      {
       "t": 1794890840,
       "v": 18.6
      },
      {
       "t": 1794891023,
       "v": 19.2
      },
      {
       "t": 1794891207,
       "v": 19.9
      },
      {
       "t": 1794891390,
       "v": 20.7
      },
      {
       "t": 1794891573,
       "v": 21.6
      },
      {
       "t": 1794891756,
       "v": 22.5
      },
      {
       "t": 1794891939,
       "v": 23.5
      },
      {
       "t": 1794892122,
       "v": 24.5
      },
      {
       "t": 1794892305,
       "v": 25.6
      },
      {
       "t": 1794892488,
       "v": 26.7
      },
      {
       "t": 1794892671,
       "v": 27.9
      },
      {
       "t": 1794892854,
       "v": 29.0
      },
      {
       "t": 1794893037,
       "v": 30.2
      },
      {
       "t": 1794893220,
       "v": 31.3
      },
      {
       "t": 1794893403,
       "v": 32.5
      },
      {
       "t": 1794893586,
       "v": 33.6
      },
      {
       "t": 1794893769,
       "v": 34.6
      },
      {
       "t": 1794893952,
       "v": 35.6
      },
      {
       "t": 1794894135,
       "v": 36.6
      },
      {
       "t": 1794894318,
       "v": 37.4
      },
      {
       "t": 1794894501,
       "v": 38.3
      },
      {
       "t": 1794894684,
       "v": 39.0
      },
      {
       "t": 1794894868,
       "v": 39.6
      },
      {
       "t": 1794895051,
       "v": 40.2
      },
      {
       "t": 1794895234,
       "v": 40.7
      },
      {
       "t": 1794895417,
       "v": 41.2
      },
      {
       "t": 1794895600,
       "v": 41.6
      },
      {
       "t": 1794895783,
       "v": 41.9
      },
      {
       "t": 1794895966,
       "v": 42.1
      },
      {
       "t": 1794896149,
       "v": 41
      }
     ],
     "weekly": [
      {
       "t": 1794464149,
       "v": 1.5
      },
      {
       "t": 1794469354,
       "v": 2.0
      },
      {
       "t": 1794474559,
       "v": 2.5
      },
      {
       "t": 1794479763,
       "v": 3.0
      },
      {
       "t": 1794484968,
       "v": 3.5
      },
      {
       "t": 1794490173,
       "v": 4.0
      },
      {
       "t": 1794495378,
       "v": 4.5
      },
      {
       "t": 1794500583,
       "v": 4.9
      },
      {
       "t": 1794505787,
       "v": 5.4
      },
      {
       "t": 1794510992,
       "v": 5.8
      },
      {
       "t": 1794516197,
       "v": 6.2
      },
      {
       "t": 1794521402,
       "v": 6.6
      },
      {
       "t": 1794526607,
       "v": 7.0
      },
      {
       "t": 1794531812,
       "v": 7.3
      },
      {
       "t": 1794537016,
       "v": 7.6
      },
      {
       "t": 1794542221,
       "v": 7.9
      },
      {
       "t": 1794547426,
       "v": 8.2
      },
      {
       "t": 1794552631,
       "v": 8.4
      },
      {
       "t": 1794557836,
       "v": 8.7
      },
      {
       "t": 1794563040,
       "v": 8.9
      },
      {
       "t": 1794568245,
       "v": 9.2
      },
      {
       "t": 1794573450,
       "v": 9.4
      },
      {
       "t": 1794578655,
       "v": 9.6
      },
      {
       "t": 1794583860,
       "v": 9.9
      },
      {
       "t": 1794589065,
       "v": 10.2
      },
      {
       "t": 1794594269,
       "v": 10.5
      },
      {
       "t": 1794599474,
       "v": 10.8
      },
      {
       "t": 1794604679,
       "v": 11.1
      },
      {
       "t": 1794609884,
       "v": 11.5
      },
      {
       "t": 1794615089,
       "v": 11.9
      },
      {
       "t": 1794620293,
       "v": 12.3
      },
      {
       "t": 1794625498,
       "v": 12.7
      },
      {
       "t": 1794630703,
       "v": 13.2
      },
      {
       "t": 1794635908,
       "v": 13.7
      },
      {
       "t": 1794641113,
       "v": 14.3
      },
      {
       "t": 1794646318,
       "v": 14.8
      },
      {
       "t": 1794651522,
       "v": 15.4
      },
      {
       "t": 1794656727,
       "v": 16.0
      },
      {
       "t": 1794661932,
       "v": 16.6
      },
      {
       "t": 1794667137,
       "v": 17.2
      },
      {
       "t": 1794672342,
       "v": 17.8
      },
      {
       "t": 1794677546,
       "v": 18.5
      },
      {
       "t": 1794682751,
       "v": 19.1
      },
      {
       "t": 1794687956,
       "v": 19.7
      },
      {
       "t": 1794693161,
       "v": 20.3
      },
      {
       "t": 1794698366,
       "v": 20.9
      },
      {
       "t": 1794703571,
       "v": 21.5
      },
      {
       "t": 1794708775,
       "v": 22.0
      },
      {
       "t": 1794713980,
       "v": 22.6
      },
      {
       "t": 1794719185,
       "v": 23.1
      },
      {
       "t": 1794724390,
       "v": 23.5
      },
      {
       "t": 1794729595,
       "v": 24.0
      },
      {
       "t": 1794734799,
       "v": 24.4
      },
      {
       "t": 1794740004,
       "v": 24.8
      },
      {
       "t": 1794745209,
       "v": 25.2
      },
      {
       "t": 1794750414,
       "v": 25.5
      },
      {
       "t": 1794755619,
       "v": 25.9
      },
      {
       "t": 1794760824,
       "v": 26.2
      },
      {
       "t": 1794766028,
       "v": 26.5
      },
      {
       "t": 1794771233,
       "v": 26.8
      },
      {
       "t": 1794776438,
       "v": 27.1
      },
      {
       "t": 1794781643,
       "v": 27.4
      },
      {
       "t": 1794786848,
       "v": 27.7
      },
      {
       "t": 1794792052,
       "v": 28.0
      },
      {
       "t": 1794797257,
       "v": 28.3
      },
      {
       "t": 1794802462,
       "v": 28.6
      },
      {
       "t": 1794807667,
       "v": 29.0
      },
      {
       "t": 1794812872,
       "v": 29.3
      },
      {
       "t": 1794818077,
       "v": 29.7
      },
      {
       "t": 1794823281,
       "v": 30.2
      },
      {
       "t": 1794828486,
       "v": 30.6
      },
      {
       "t": 1794833691,
       "v": 31.1
      },
      {
       "t": 1794838896,
       "v": 31.6
      },
      {
       "t": 1794844101,
       "v": 32.2
      },
      {
       "t": 1794849306,
       "v": 32.7
      },
      {
       "t": 1794854510,
       "v": 33.3
      },
      {
       "t": 1794859715,
       "v": 33.9
      },
      {
       "t": 1794864920,
       "v": 34.6
      },
      {
       "t": 1794870125,
       "v": 35.2
      },
      {
       "t": 1794875330,
       "v": 35.9
      },
      {
       "t": 1794880534,
       "v": 36.5
      },
      {
       "t": 1794885739,
       "v": 37.2
      },
      {
       "t": 1794890944,
       "v": 37.8
      },
      {
       "t": 1794896149,
       "v": 38
      }
     ],
     "monthly": [
      {
       "t": 1792563349,
       "v": 1.2
      },
      {
       "t": 1792582952,
       "v": 1.3
      },
      {
       "t": 1792602556,
       "v": 1.3
      },
      {
       "t": 1792622159,
       "v": 1.4
      },
      {
       "t": 1792641762,
       "v": 1.5
      },
      {
       "t": 1792661366,
       "v": 1.6
      },
      {
       "t": 1792680969,
       "v": 1.8
      },
      {
       "t": 1792700572,
       "v": 1.9
      },
      {
       "t": 1792720176,
       "v": 2.0
      },
      {
       "t": 1792739779,
       "v": 2.2
      },
      {
       "t": 1792759382,
       "v": 2.3
      },
      {
       "t": 1792778986,
       "v": 2.5
      },
      {
       "t": 1792798589,
       "v": 2.7
      },
      {
       "t": 1792818193,
       "v": 2.8
      },
      {
       "t": 1792837796,
       "v": 3.0
      },
      {
       "t": 1792857399,
       "v": 3.2
      },
      {
       "t": 1792877003,
       "v": 3.4
      },
      {
       "t": 1792896606,
       "v": 3.6
      },
      {
       "t": 1792916209,
       "v": 3.8
      },
      {
       "t": 1792935813,
       "v": 4.0
      },
      {
       "t": 1792955416,
       "v": 4.2
      },
      {
       "t": 1792975019,
       "v": 4.4
      },
      {
       "t": 1792994623,
       "v": 4.7
      },
      {
       "t": 1793014226,
       "v": 4.9
      },
      {
       "t": 1793033830,
       "v": 5.1
      },
      {
       "t": 1793053433,
       "v": 5.4
      },
      {
       "t": 1793073036,
       "v": 5.6
      },
      {
       "t": 1793092640,
       "v": 5.9
      },
      {
       "t": 1793112243,
       "v": 6.1
      },
      {
       "t": 1793131846,
       "v": 6.4
      },
      {
       "t": 1793151450,
       "v": 6.6
      },
      {
       "t": 1793171053,
       "v": 6.9
      },
      {
       "t": 1793190656,
       "v": 7.2
      },
      {
       "t": 1793210260,
       "v": 7.4
      },
      {
       "t": 1793229863,
       "v": 7.7
      },
      {
       "t": 1793249467,
       "v": 8.0
      },
      {
       "t": 1793269070,
       "v": 8.3
      },
      {
       "t": 1793288673,
       "v": 8.5
      },
      {
       "t": 1793308277,
       "v": 8.8
      },
      {
       "t": 1793327880,
       "v": 9.1
      },
      {
       "t": 1793347483,
       "v": 9.4
      },
      {
       "t": 1793367087,
       "v": 9.7
      },
      {
       "t": 1793386690,
       "v": 10.0
      },
      {
       "t": 1793406293,
       "v": 10.3
      },
      {
       "t": 1793425897,
       "v": 10.6
      },
      {
       "t": 1793445500,
       "v": 10.9
      },
      {
       "t": 1793465104,
       "v": 11.3
      },
      {
       "t": 1793484707,
       "v": 11.6
      },
      {
       "t": 1793504310,
       "v": 11.9
      },
      {
       "t": 1793523914,
       "v": 12.2
      },
      {
       "t": 1793543517,
       "v": 12.5
      },
      {
       "t": 1793563120,
       "v": 12.9
      },
      {
       "t": 1793582724,
       "v": 13.2
      },
      {
       "t": 1793602327,
       "v": 13.5
      },
      {
       "t": 1793621930,
       "v": 13.9
      },
      {
       "t": 1793641534,
       "v": 14.2
      },
      {
       "t": 1793661137,
       "v": 14.6
      },
      {
       "t": 1793680740,
       "v": 14.9
      },
      {
       "t": 1793700344,
       "v": 15.3
      },
      {
       "t": 1793719947,
       "v": 15.6
      },
      {
       "t": 1793739551,
       "v": 16.0
      },
      {
       "t": 1793759154,
       "v": 16.3
      },
      {
       "t": 1793778757,
       "v": 16.7
      },
      {
       "t": 1793798361,
       "v": 17.0
      },
      {
       "t": 1793817964,
       "v": 17.4
      },
      {
       "t": 1793837567,
       "v": 17.8
      },
      {
       "t": 1793857171,
       "v": 18.1
      },
      {
       "t": 1793876774,
       "v": 18.5
      },
      {
       "t": 1793896377,
       "v": 18.9
      },
      {
       "t": 1793915981,
       "v": 19.3
      },
      {
       "t": 1793935584,
       "v": 19.7
      },
      {
       "t": 1793955188,
       "v": 20.0
      },
      {
       "t": 1793974791,
       "v": 20.4
      },
      {
       "t": 1793994394,
       "v": 20.8
      },
      {
       "t": 1794013998,
       "v": 21.2
      },
      {
       "t": 1794033601,
       "v": 21.6
      },
      {
       "t": 1794053204,
       "v": 22.0
      },
      {
       "t": 1794072808,
       "v": 22.4
      },
      {
       "t": 1794092411,
       "v": 22.8
      },
      {
       "t": 1794112014,
       "v": 23.2
      },
      {
       "t": 1794131618,
       "v": 23.6
      },
      {
       "t": 1794151221,
       "v": 24.0
      },
      {
       "t": 1794170825,
       "v": 24.4
      },
      {
       "t": 1794190428,
       "v": 24.8
      },
      {
       "t": 1794210031,
       "v": 25.2
      },
      {
       "t": 1794229635,
       "v": 25.6
      },
      {
       "t": 1794249238,
       "v": 26.1
      },
      {
       "t": 1794268841,
       "v": 26.5
      },
      {
       "t": 1794288445,
       "v": 26.9
      },
      {
       "t": 1794308048,
       "v": 27.3
      },
      {
       "t": 1794327651,
       "v": 27.8
      },
      {
       "t": 1794347255,
       "v": 28.2
      },
      {
       "t": 1794366858,
       "v": 28.6
      },
      {
       "t": 1794386461,
       "v": 29.0
      },
      {
       "t": 1794406065,
       "v": 29.5
      },
      {
       "t": 1794425668,
       "v": 29.9
      },
      {
       "t": 1794445272,
       "v": 30.4
      },
      {
       "t": 1794464875,
       "v": 30.8
      },
      {
       "t": 1794484478,
       "v": 31.2
      },
      {
       "t": 1794504082,
       "v": 31.7
      },
      {
       "t": 1794523685,
       "v": 32.1
      },
      {
       "t": 1794543288,
       "v": 32.6
      },
      {
       "t": 1794562892,
       "v": 33.0
      },
      {
       "t": 1794582495,
       "v": 33.5
      },
      {
       "t": 1794602098,
       "v": 33.9
      },
      {
       "t": 1794621702,
       "v": 34.4
      },
      {
       "t": 1794641305,
       "v": 34.9
      },
      {
       "t": 1794660909,
       "v": 35.3
      },
      {
       "t": 1794680512,
       "v": 35.8
      },
      {
       "t": 1794700115,
       "v": 36.2
      },
      {
       "t": 1794719719,
       "v": 36.7
      },
      {
       "t": 1794739322,
       "v": 37.2
      },
      {
       "t": 1794758925,
       "v": 37.7
      },
      {
       "t": 1794778529,
       "v": 38.1
      },
      {
       "t": 1794798132,
       "v": 38.6
      },
      {
       "t": 1794817735,
       "v": 39.1
      },
      {
       "t": 1794837339,
       "v": 39.6
      },
      {
       "t": 1794856942,
       "v": 40.0
      },
      {
       "t": 1794876546,
       "v": 40.5
      },
      {
       "t": 1794896149,
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
    "resets_at": "2026-11-20",
    "resets": {
     "rolling": "2026-11-17T17:00:00+08:00",
     "weekly": "2026-11-20T00:00:00+08:00",
     "monthly": "2026-11-20T00:00:00+08:00"
    },
    "history": {
     "rolling": [
      {
       "t": 1794885349,
       "v": 0.9
      },
      {
       "t": 1794885532,
       "v": 1.4
      },
      {
       "t": 1794885715,
       "v": 1.9
      },
      {
       "t": 1794885898,
       "v": 2.4
      },
      {
       "t": 1794886081,
       "v": 2.9
      },
      {
       "t": 1794886264,
       "v": 3.3
      },
      {
       "t": 1794886447,
       "v": 3.8
      },
      {
       "t": 1794886630,
       "v": 4.2
      },
      {
       "t": 1794886813,
       "v": 4.6
      },
      {
       "t": 1794886996,
       "v": 4.9
      },
      {
       "t": 1794887179,
       "v": 5.2
      },
      {
       "t": 1794887362,
       "v": 5.5
      },
      {
       "t": 1794887545,
       "v": 5.8
      },
      {
       "t": 1794887729,
       "v": 6.0
      },
      {
       "t": 1794887912,
       "v": 6.2
      },
      {
       "t": 1794888095,
       "v": 6.3
      },
      {
       "t": 1794888278,
       "v": 6.5
      },
      {
       "t": 1794888461,
       "v": 6.6
      },
      {
       "t": 1794888644,
       "v": 6.7
      },
      {
       "t": 1794888827,
       "v": 6.8
      },
      {
       "t": 1794889010,
       "v": 6.8
      },
      {
       "t": 1794889193,
       "v": 6.9
      },
      {
       "t": 1794889376,
       "v": 7.0
      },
      {
       "t": 1794889559,
       "v": 7.0
      },
      {
       "t": 1794889742,
       "v": 7.1
      },
      {
       "t": 1794889925,
       "v": 7.2
      },
      {
       "t": 1794890108,
       "v": 7.4
      },
      {
       "t": 1794890291,
       "v": 7.5
      },
      {
       "t": 1794890474,
       "v": 7.7
      },
      {
       "t": 1794890657,
       "v": 7.9
      },
      {
       "t": 1794890840,
       "v": 8.2
      },
      {
       "t": 1794891023,
       "v": 8.4
      },
      {
       "t": 1794891207,
       "v": 8.8
      },
      {
       "t": 1794891390,
       "v": 9.1
      },
      {
       "t": 1794891573,
       "v": 9.5
      },
      {
       "t": 1794891756,
       "v": 9.9
      },
      {
       "t": 1794891939,
       "v": 10.3
      },
      {
       "t": 1794892122,
       "v": 10.8
      },
      {
       "t": 1794892305,
       "v": 11.2
      },
      {
       "t": 1794892488,
       "v": 11.7
      },
      {
       "t": 1794892671,
       "v": 12.2
      },
      {
       "t": 1794892854,
       "v": 12.7
      },
      {
       "t": 1794893037,
       "v": 13.3
      },
      {
       "t": 1794893220,
       "v": 13.8
      },
      {
       "t": 1794893403,
       "v": 14.3
      },
      {
       "t": 1794893586,
       "v": 14.7
      },
      {
       "t": 1794893769,
       "v": 15.2
      },
      {
       "t": 1794893952,
       "v": 15.6
      },
      {
       "t": 1794894135,
       "v": 16.1
      },
      {
       "t": 1794894318,
       "v": 16.4
      },
      {
       "t": 1794894501,
       "v": 16.8
      },
      {
       "t": 1794894684,
       "v": 17.1
      },
      {
       "t": 1794894868,
       "v": 17.4
      },
      {
       "t": 1794895051,
       "v": 17.7
      },
      {
       "t": 1794895234,
       "v": 17.9
      },
      {
       "t": 1794895417,
       "v": 18.1
      },
      {
       "t": 1794895600,
       "v": 18.2
      },
      {
       "t": 1794895783,
       "v": 18.4
      },
      {
       "t": 1794895966,
       "v": 18.5
      },
      {
       "t": 1794896149,
       "v": 18
      }
     ],
     "weekly": [
      {
       "t": 1794464149,
       "v": 1.1
      },
      {
       "t": 1794469354,
       "v": 1.5
      },
      {
       "t": 1794474559,
       "v": 1.8
      },
      {
       "t": 1794479763,
       "v": 2.2
      },
      {
       "t": 1794484968,
       "v": 2.6
      },
      {
       "t": 1794490173,
       "v": 2.9
      },
      {
       "t": 1794495378,
       "v": 3.3
      },
      {
       "t": 1794500583,
       "v": 3.6
      },
      {
       "t": 1794505787,
       "v": 4.0
      },
      {
       "t": 1794510992,
       "v": 4.3
      },
      {
       "t": 1794516197,
       "v": 4.6
      },
      {
       "t": 1794521402,
       "v": 4.9
      },
      {
       "t": 1794526607,
       "v": 5.1
      },
      {
       "t": 1794531812,
       "v": 5.4
      },
      {
       "t": 1794537016,
       "v": 5.6
      },
      {
       "t": 1794542221,
       "v": 5.8
      },
      {
       "t": 1794547426,
       "v": 6.0
      },
      {
       "t": 1794552631,
       "v": 6.2
      },
      {
       "t": 1794557836,
       "v": 6.4
      },
      {
       "t": 1794563040,
       "v": 6.6
      },
      {
       "t": 1794568245,
       "v": 6.7
      },
      {
       "t": 1794573450,
       "v": 6.9
      },
      {
       "t": 1794578655,
       "v": 7.1
      },
      {
       "t": 1794583860,
       "v": 7.3
      },
      {
       "t": 1794589065,
       "v": 7.5
      },
      {
       "t": 1794594269,
       "v": 7.7
      },
      {
       "t": 1794599474,
       "v": 7.9
      },
      {
       "t": 1794604679,
       "v": 8.2
      },
      {
       "t": 1794609884,
       "v": 8.5
      },
      {
       "t": 1794615089,
       "v": 8.7
      },
      {
       "t": 1794620293,
       "v": 9.1
      },
      {
       "t": 1794625498,
       "v": 9.4
      },
      {
       "t": 1794630703,
       "v": 9.7
      },
      {
       "t": 1794635908,
       "v": 10.1
      },
      {
       "t": 1794641113,
       "v": 10.5
      },
      {
       "t": 1794646318,
       "v": 10.9
      },
      {
       "t": 1794651522,
       "v": 11.3
      },
      {
       "t": 1794656727,
       "v": 11.8
      },
      {
       "t": 1794661932,
       "v": 12.2
      },
      {
       "t": 1794667137,
       "v": 12.7
      },
      {
       "t": 1794672342,
       "v": 13.1
      },
      {
       "t": 1794677546,
       "v": 13.6
      },
      {
       "t": 1794682751,
       "v": 14.1
      },
      {
       "t": 1794687956,
       "v": 14.5
      },
      {
       "t": 1794693161,
       "v": 15.0
      },
      {
       "t": 1794698366,
       "v": 15.4
      },
      {
       "t": 1794703571,
       "v": 15.8
      },
      {
       "t": 1794708775,
       "v": 16.2
      },
      {
       "t": 1794713980,
       "v": 16.6
      },
      {
       "t": 1794719185,
       "v": 17.0
      },
      {
       "t": 1794724390,
       "v": 17.4
      },
      {
       "t": 1794729595,
       "v": 17.7
      },
      {
       "t": 1794734799,
       "v": 18.0
      },
      {
       "t": 1794740004,
       "v": 18.3
      },
      {
       "t": 1794745209,
       "v": 18.6
      },
      {
       "t": 1794750414,
       "v": 18.8
      },
      {
       "t": 1794755619,
       "v": 19.1
      },
      {
       "t": 1794760824,
       "v": 19.3
      },
      {
       "t": 1794766028,
       "v": 19.5
      },
      {
       "t": 1794771233,
       "v": 19.7
      },
      {
       "t": 1794776438,
       "v": 20.0
      },
      {
       "t": 1794781643,
       "v": 20.2
      },
      {
       "t": 1794786848,
       "v": 20.4
      },
      {
       "t": 1794792052,
       "v": 20.6
      },
      {
       "t": 1794797257,
       "v": 20.8
      },
      {
       "t": 1794802462,
       "v": 21.1
      },
      {
       "t": 1794807667,
       "v": 21.3
      },
      {
       "t": 1794812872,
       "v": 21.6
      },
      {
       "t": 1794818077,
       "v": 21.9
      },
      {
       "t": 1794823281,
       "v": 22.2
      },
      {
       "t": 1794828486,
       "v": 22.6
      },
      {
       "t": 1794833691,
       "v": 22.9
      },
      {
       "t": 1794838896,
       "v": 23.3
      },
      {
       "t": 1794844101,
       "v": 23.7
      },
      {
       "t": 1794849306,
       "v": 24.1
      },
      {
       "t": 1794854510,
       "v": 24.6
      },
      {
       "t": 1794859715,
       "v": 25.0
      },
      {
       "t": 1794864920,
       "v": 25.5
      },
      {
       "t": 1794870125,
       "v": 25.9
      },
      {
       "t": 1794875330,
       "v": 26.4
      },
      {
       "t": 1794880534,
       "v": 26.9
      },
      {
       "t": 1794885739,
       "v": 27.4
      },
      {
       "t": 1794890944,
       "v": 27.9
      },
      {
       "t": 1794896149,
       "v": 28
      }
     ],
     "monthly": [
      {
       "t": 1792563349,
       "v": 0.7
      },
      {
       "t": 1792582952,
       "v": 0.7
      },
      {
       "t": 1792602556,
       "v": 0.8
      },
      {
       "t": 1792622159,
       "v": 0.8
      },
      {
       "t": 1792641762,
       "v": 0.9
      },
      {
       "t": 1792661366,
       "v": 1.0
      },
      {
       "t": 1792680969,
       "v": 1.0
      },
      {
       "t": 1792700572,
       "v": 1.1
      },
      {
       "t": 1792720176,
       "v": 1.2
      },
      {
       "t": 1792739779,
       "v": 1.3
      },
      {
       "t": 1792759382,
       "v": 1.4
      },
      {
       "t": 1792778986,
       "v": 1.5
      },
      {
       "t": 1792798589,
       "v": 1.6
      },
      {
       "t": 1792818193,
       "v": 1.7
      },
      {
       "t": 1792837796,
       "v": 1.8
      },
      {
       "t": 1792857399,
       "v": 1.9
      },
      {
       "t": 1792877003,
       "v": 2.0
      },
      {
       "t": 1792896606,
       "v": 2.1
      },
      {
       "t": 1792916209,
       "v": 2.2
      },
      {
       "t": 1792935813,
       "v": 2.3
      },
      {
       "t": 1792955416,
       "v": 2.5
      },
      {
       "t": 1792975019,
       "v": 2.6
      },
      {
       "t": 1792994623,
       "v": 2.7
      },
      {
       "t": 1793014226,
       "v": 2.9
      },
      {
       "t": 1793033830,
       "v": 3.0
      },
      {
       "t": 1793053433,
       "v": 3.1
      },
      {
       "t": 1793073036,
       "v": 3.3
      },
      {
       "t": 1793092640,
       "v": 3.4
      },
      {
       "t": 1793112243,
       "v": 3.6
      },
      {
       "t": 1793131846,
       "v": 3.7
      },
      {
       "t": 1793151450,
       "v": 3.9
      },
      {
       "t": 1793171053,
       "v": 4.0
      },
      {
       "t": 1793190656,
       "v": 4.2
      },
      {
       "t": 1793210260,
       "v": 4.3
      },
      {
       "t": 1793229863,
       "v": 4.5
      },
      {
       "t": 1793249467,
       "v": 4.7
      },
      {
       "t": 1793269070,
       "v": 4.8
      },
      {
       "t": 1793288673,
       "v": 5.0
      },
      {
       "t": 1793308277,
       "v": 5.2
      },
      {
       "t": 1793327880,
       "v": 5.3
      },
      {
       "t": 1793347483,
       "v": 5.5
      },
      {
       "t": 1793367087,
       "v": 5.7
      },
      {
       "t": 1793386690,
       "v": 5.9
      },
      {
       "t": 1793406293,
       "v": 6.0
      },
      {
       "t": 1793425897,
       "v": 6.2
      },
      {
       "t": 1793445500,
       "v": 6.4
      },
      {
       "t": 1793465104,
       "v": 6.6
      },
      {
       "t": 1793484707,
       "v": 6.8
      },
      {
       "t": 1793504310,
       "v": 7.0
      },
      {
       "t": 1793523914,
       "v": 7.2
      },
      {
       "t": 1793543517,
       "v": 7.3
      },
      {
       "t": 1793563120,
       "v": 7.5
      },
      {
       "t": 1793582724,
       "v": 7.7
      },
      {
       "t": 1793602327,
       "v": 7.9
      },
      {
       "t": 1793621930,
       "v": 8.1
      },
      {
       "t": 1793641534,
       "v": 8.3
      },
      {
       "t": 1793661137,
       "v": 8.5
      },
      {
       "t": 1793680740,
       "v": 8.7
      },
      {
       "t": 1793700344,
       "v": 8.9
      },
      {
       "t": 1793719947,
       "v": 9.1
      },
      {
       "t": 1793739551,
       "v": 9.3
      },
      {
       "t": 1793759154,
       "v": 9.6
      },
      {
       "t": 1793778757,
       "v": 9.8
      },
      {
       "t": 1793798361,
       "v": 10.0
      },
      {
       "t": 1793817964,
       "v": 10.2
      },
      {
       "t": 1793837567,
       "v": 10.4
      },
      {
       "t": 1793857171,
       "v": 10.6
      },
      {
       "t": 1793876774,
       "v": 10.8
      },
      {
       "t": 1793896377,
       "v": 11.1
      },
      {
       "t": 1793915981,
       "v": 11.3
      },
      {
       "t": 1793935584,
       "v": 11.5
      },
      {
       "t": 1793955188,
       "v": 11.7
      },
      {
       "t": 1793974791,
       "v": 12.0
      },
      {
       "t": 1793994394,
       "v": 12.2
      },
      {
       "t": 1794013998,
       "v": 12.4
      },
      {
       "t": 1794033601,
       "v": 12.6
      },
      {
       "t": 1794053204,
       "v": 12.9
      },
      {
       "t": 1794072808,
       "v": 13.1
      },
      {
       "t": 1794092411,
       "v": 13.3
      },
      {
       "t": 1794112014,
       "v": 13.6
      },
      {
       "t": 1794131618,
       "v": 13.8
      },
      {
       "t": 1794151221,
       "v": 14.0
      },
      {
       "t": 1794170825,
       "v": 14.3
      },
      {
       "t": 1794190428,
       "v": 14.5
      },
      {
       "t": 1794210031,
       "v": 14.8
      },
      {
       "t": 1794229635,
       "v": 15.0
      },
      {
       "t": 1794249238,
       "v": 15.3
      },
      {
       "t": 1794268841,
       "v": 15.5
      },
      {
       "t": 1794288445,
       "v": 15.7
      },
      {
       "t": 1794308048,
       "v": 16.0
      },
      {
       "t": 1794327651,
       "v": 16.2
      },
      {
       "t": 1794347255,
       "v": 16.5
      },
      {
       "t": 1794366858,
       "v": 16.7
      },
      {
       "t": 1794386461,
       "v": 17.0
      },
      {
       "t": 1794406065,
       "v": 17.3
      },
      {
       "t": 1794425668,
       "v": 17.5
      },
      {
       "t": 1794445272,
       "v": 17.8
      },
      {
       "t": 1794464875,
       "v": 18.0
      },
      {
       "t": 1794484478,
       "v": 18.3
      },
      {
       "t": 1794504082,
       "v": 18.5
      },
      {
       "t": 1794523685,
       "v": 18.8
      },
      {
       "t": 1794543288,
       "v": 19.1
      },
      {
       "t": 1794562892,
       "v": 19.3
      },
      {
       "t": 1794582495,
       "v": 19.6
      },
      {
       "t": 1794602098,
       "v": 19.9
      },
      {
       "t": 1794621702,
       "v": 20.1
      },
      {
       "t": 1794641305,
       "v": 20.4
      },
      {
       "t": 1794660909,
       "v": 20.7
      },
      {
       "t": 1794680512,
       "v": 20.9
      },
      {
       "t": 1794700115,
       "v": 21.2
      },
      {
       "t": 1794719719,
       "v": 21.5
      },
      {
       "t": 1794739322,
       "v": 21.8
      },
      {
       "t": 1794758925,
       "v": 22.0
      },
      {
       "t": 1794778529,
       "v": 22.3
      },
      {
       "t": 1794798132,
       "v": 22.6
      },
      {
       "t": 1794817735,
       "v": 22.9
      },
      {
       "t": 1794837339,
       "v": 23.2
      },
      {
       "t": 1794856942,
       "v": 23.4
      },
      {
       "t": 1794876546,
       "v": 23.7
      },
      {
       "t": 1794896149,
       "v": 24
      }
     ]
    },
    "available": true
   },
   {
    "label": "黑盒语音 / biubiu",
    "key": "sidecar",
    "remaining": 86,
    "rolling": 9,
    "weekly": 14,
    "monthly": 12,
    "resets_at": "2026-11-22",
    "resets": {
     "rolling": "2026-11-17T18:00:00+08:00",
     "weekly": "2026-11-22T00:00:00+08:00",
     "monthly": "2026-11-22T00:00:00+08:00"
    },
    "history": {
     "rolling": [
      {
       "t": 1794885349,
       "v": 0.5
      },
      {
       "t": 1794885532,
       "v": 0.7
      },
      {
       "t": 1794885715,
       "v": 1.0
      },
      {
       "t": 1794885898,
       "v": 1.2
      },
      {
       "t": 1794886081,
       "v": 1.4
      },
      {
       "t": 1794886264,
       "v": 1.7
      },
      {
       "t": 1794886447,
       "v": 1.9
      },
      {
       "t": 1794886630,
       "v": 2.1
      },
      {
       "t": 1794886813,
       "v": 2.3
      },
      {
       "t": 1794886996,
       "v": 2.5
      },
      {
       "t": 1794887179,
       "v": 2.6
      },
      {
       "t": 1794887362,
       "v": 2.8
      },
      {
       "t": 1794887545,
       "v": 2.9
      },
      {
       "t": 1794887729,
       "v": 3.0
      },
      {
       "t": 1794887912,
       "v": 3.1
      },
      {
       "t": 1794888095,
       "v": 3.2
      },
      {
       "t": 1794888278,
       "v": 3.2
      },
      {
       "t": 1794888461,
       "v": 3.3
      },
      {
       "t": 1794888644,
       "v": 3.3
      },
      {
       "t": 1794888827,
       "v": 3.4
      },
      {
       "t": 1794889010,
       "v": 3.4
      },
      {
       "t": 1794889193,
       "v": 3.4
      },
      {
       "t": 1794889376,
       "v": 3.5
      },
      {
       "t": 1794889559,
       "v": 3.5
      },
      {
       "t": 1794889742,
       "v": 3.6
      },
      {
       "t": 1794889925,
       "v": 3.6
      },
      {
       "t": 1794890108,
       "v": 3.7
      },
      {
       "t": 1794890291,
       "v": 3.8
      },
      {
       "t": 1794890474,
       "v": 3.9
      },
      {
       "t": 1794890657,
       "v": 4.0
      },
      {
       "t": 1794890840,
       "v": 4.1
      },
      {
       "t": 1794891023,
       "v": 4.2
      },
      {
       "t": 1794891207,
       "v": 4.4
      },
      {
       "t": 1794891390,
       "v": 4.5
      },
      {
       "t": 1794891573,
       "v": 4.7
      },
      {
       "t": 1794891756,
       "v": 4.9
      },
      {
       "t": 1794891939,
       "v": 5.2
      },
      {
       "t": 1794892122,
       "v": 5.4
      },
      {
       "t": 1794892305,
       "v": 5.6
      },
      {
       "t": 1794892488,
       "v": 5.9
      },
      {
       "t": 1794892671,
       "v": 6.1
      },
      {
       "t": 1794892854,
       "v": 6.4
      },
      {
       "t": 1794893037,
       "v": 6.6
      },
      {
       "t": 1794893220,
       "v": 6.9
      },
      {
       "t": 1794893403,
       "v": 7.1
      },
      {
       "t": 1794893586,
       "v": 7.4
      },
      {
       "t": 1794893769,
       "v": 7.6
      },
      {
       "t": 1794893952,
       "v": 7.8
      },
      {
       "t": 1794894135,
       "v": 8.0
      },
      {
       "t": 1794894318,
       "v": 8.2
      },
      {
       "t": 1794894501,
       "v": 8.4
      },
      {
       "t": 1794894684,
       "v": 8.6
      },
      {
       "t": 1794894868,
       "v": 8.7
      },
      {
       "t": 1794895051,
       "v": 8.8
      },
      {
       "t": 1794895234,
       "v": 8.9
      },
      {
       "t": 1794895417,
       "v": 9.0
      },
      {
       "t": 1794895600,
       "v": 9.1
      },
      {
       "t": 1794895783,
       "v": 9.2
      },
      {
       "t": 1794895966,
       "v": 9.2
      },
      {
       "t": 1794896149,
       "v": 9
      }
     ],
     "weekly": [
      {
       "t": 1794464149,
       "v": 0.6
      },
      {
       "t": 1794469354,
       "v": 0.7
      },
      {
       "t": 1794474559,
       "v": 0.9
      },
      {
       "t": 1794479763,
       "v": 1.1
      },
      {
       "t": 1794484968,
       "v": 1.3
      },
      {
       "t": 1794490173,
       "v": 1.5
      },
      {
       "t": 1794495378,
       "v": 1.6
      },
      {
       "t": 1794500583,
       "v": 1.8
      },
      {
       "t": 1794505787,
       "v": 2.0
      },
      {
       "t": 1794510992,
       "v": 2.1
      },
      {
       "t": 1794516197,
       "v": 2.3
      },
      {
       "t": 1794521402,
       "v": 2.4
      },
      {
       "t": 1794526607,
       "v": 2.6
      },
      {
       "t": 1794531812,
       "v": 2.7
      },
      {
       "t": 1794537016,
       "v": 2.8
      },
      {
       "t": 1794542221,
       "v": 2.9
      },
      {
       "t": 1794547426,
       "v": 3.0
      },
      {
       "t": 1794552631,
       "v": 3.1
      },
      {
       "t": 1794557836,
       "v": 3.2
      },
      {
       "t": 1794563040,
       "v": 3.3
      },
      {
       "t": 1794568245,
       "v": 3.4
      },
      {
       "t": 1794573450,
       "v": 3.5
      },
      {
       "t": 1794578655,
       "v": 3.6
      },
      {
       "t": 1794583860,
       "v": 3.6
      },
      {
       "t": 1794589065,
       "v": 3.7
      },
      {
       "t": 1794594269,
       "v": 3.9
      },
      {
       "t": 1794599474,
       "v": 4.0
      },
      {
       "t": 1794604679,
       "v": 4.1
      },
      {
       "t": 1794609884,
       "v": 4.2
      },
      {
       "t": 1794615089,
       "v": 4.4
      },
      {
       "t": 1794620293,
       "v": 4.5
      },
      {
       "t": 1794625498,
       "v": 4.7
      },
      {
       "t": 1794630703,
       "v": 4.9
      },
      {
       "t": 1794635908,
       "v": 5.1
      },
      {
       "t": 1794641113,
       "v": 5.3
      },
      {
       "t": 1794646318,
       "v": 5.5
      },
      {
       "t": 1794651522,
       "v": 5.7
      },
      {
       "t": 1794656727,
       "v": 5.9
      },
      {
       "t": 1794661932,
       "v": 6.1
      },
      {
       "t": 1794667137,
       "v": 6.3
      },
      {
       "t": 1794672342,
       "v": 6.6
      },
      {
       "t": 1794677546,
       "v": 6.8
      },
      {
       "t": 1794682751,
       "v": 7.0
      },
      {
       "t": 1794687956,
       "v": 7.3
      },
      {
       "t": 1794693161,
       "v": 7.5
      },
      {
       "t": 1794698366,
       "v": 7.7
      },
      {
       "t": 1794703571,
       "v": 7.9
      },
      {
       "t": 1794708775,
       "v": 8.1
      },
      {
       "t": 1794713980,
       "v": 8.3
      },
      {
       "t": 1794719185,
       "v": 8.5
      },
      {
       "t": 1794724390,
       "v": 8.7
      },
      {
       "t": 1794729595,
       "v": 8.8
      },
      {
       "t": 1794734799,
       "v": 9.0
      },
      {
       "t": 1794740004,
       "v": 9.1
      },
      {
       "t": 1794745209,
       "v": 9.3
      },
      {
       "t": 1794750414,
       "v": 9.4
      },
      {
       "t": 1794755619,
       "v": 9.5
      },
      {
       "t": 1794760824,
       "v": 9.6
      },
      {
       "t": 1794766028,
       "v": 9.8
      },
      {
       "t": 1794771233,
       "v": 9.9
      },
      {
       "t": 1794776438,
       "v": 10.0
      },
      {
       "t": 1794781643,
       "v": 10.1
      },
      {
       "t": 1794786848,
       "v": 10.2
      },
      {
       "t": 1794792052,
       "v": 10.3
      },
      {
       "t": 1794797257,
       "v": 10.4
      },
      {
       "t": 1794802462,
       "v": 10.5
      },
      {
       "t": 1794807667,
       "v": 10.7
      },
      {
       "t": 1794812872,
       "v": 10.8
      },
      {
       "t": 1794818077,
       "v": 11.0
      },
      {
       "t": 1794823281,
       "v": 11.1
      },
      {
       "t": 1794828486,
       "v": 11.3
      },
      {
       "t": 1794833691,
       "v": 11.5
      },
      {
       "t": 1794838896,
       "v": 11.7
      },
      {
       "t": 1794844101,
       "v": 11.8
      },
      {
       "t": 1794849306,
       "v": 12.1
      },
      {
       "t": 1794854510,
       "v": 12.3
      },
      {
       "t": 1794859715,
       "v": 12.5
      },
      {
       "t": 1794864920,
       "v": 12.7
      },
      {
       "t": 1794870125,
       "v": 13.0
      },
      {
       "t": 1794875330,
       "v": 13.2
      },
      {
       "t": 1794880534,
       "v": 13.5
      },
      {
       "t": 1794885739,
       "v": 13.7
      },
      {
       "t": 1794890944,
       "v": 13.9
      },
      {
       "t": 1794896149,
       "v": 14
      }
     ],
     "monthly": [
      {
       "t": 1792563349,
       "v": 0.4
      },
      {
       "t": 1792582952,
       "v": 0.4
      },
      {
       "t": 1792602556,
       "v": 0.4
      },
      {
       "t": 1792622159,
       "v": 0.4
      },
      {
       "t": 1792641762,
       "v": 0.4
      },
      {
       "t": 1792661366,
       "v": 0.5
      },
      {
       "t": 1792680969,
       "v": 0.5
      },
      {
       "t": 1792700572,
       "v": 0.6
      },
      {
       "t": 1792720176,
       "v": 0.6
      },
      {
       "t": 1792739779,
       "v": 0.6
      },
      {
       "t": 1792759382,
       "v": 0.7
      },
      {
       "t": 1792778986,
       "v": 0.7
      },
      {
       "t": 1792798589,
       "v": 0.8
      },
      {
       "t": 1792818193,
       "v": 0.8
      },
      {
       "t": 1792837796,
       "v": 0.9
      },
      {
       "t": 1792857399,
       "v": 0.9
      },
      {
       "t": 1792877003,
       "v": 1.0
      },
      {
       "t": 1792896606,
       "v": 1.1
      },
      {
       "t": 1792916209,
       "v": 1.1
      },
      {
       "t": 1792935813,
       "v": 1.2
      },
      {
       "t": 1792955416,
       "v": 1.2
      },
      {
       "t": 1792975019,
       "v": 1.3
      },
      {
       "t": 1792994623,
       "v": 1.4
      },
      {
       "t": 1793014226,
       "v": 1.4
      },
      {
       "t": 1793033830,
       "v": 1.5
      },
      {
       "t": 1793053433,
       "v": 1.6
      },
      {
       "t": 1793073036,
       "v": 1.6
      },
      {
       "t": 1793092640,
       "v": 1.7
      },
      {
       "t": 1793112243,
       "v": 1.8
      },
      {
       "t": 1793131846,
       "v": 1.9
      },
      {
       "t": 1793151450,
       "v": 1.9
      },
      {
       "t": 1793171053,
       "v": 2.0
      },
      {
       "t": 1793190656,
       "v": 2.1
      },
      {
       "t": 1793210260,
       "v": 2.2
      },
      {
       "t": 1793229863,
       "v": 2.3
      },
      {
       "t": 1793249467,
       "v": 2.3
      },
      {
       "t": 1793269070,
       "v": 2.4
      },
      {
       "t": 1793288673,
       "v": 2.5
      },
      {
       "t": 1793308277,
       "v": 2.6
      },
      {
       "t": 1793327880,
       "v": 2.7
      },
      {
       "t": 1793347483,
       "v": 2.8
      },
      {
       "t": 1793367087,
       "v": 2.8
      },
      {
       "t": 1793386690,
       "v": 2.9
      },
      {
       "t": 1793406293,
       "v": 3.0
      },
      {
       "t": 1793425897,
       "v": 3.1
      },
      {
       "t": 1793445500,
       "v": 3.2
      },
      {
       "t": 1793465104,
       "v": 3.3
      },
      {
       "t": 1793484707,
       "v": 3.4
      },
      {
       "t": 1793504310,
       "v": 3.5
      },
      {
       "t": 1793523914,
       "v": 3.6
      },
      {
       "t": 1793543517,
       "v": 3.7
      },
      {
       "t": 1793563120,
       "v": 3.8
      },
      {
       "t": 1793582724,
       "v": 3.9
      },
      {
       "t": 1793602327,
       "v": 4.0
      },
      {
       "t": 1793621930,
       "v": 4.1
      },
      {
       "t": 1793641534,
       "v": 4.2
      },
      {
       "t": 1793661137,
       "v": 4.3
      },
      {
       "t": 1793680740,
       "v": 4.4
      },
      {
       "t": 1793700344,
       "v": 4.5
      },
      {
       "t": 1793719947,
       "v": 4.6
      },
      {
       "t": 1793739551,
       "v": 4.7
      },
      {
       "t": 1793759154,
       "v": 4.8
      },
      {
       "t": 1793778757,
       "v": 4.9
      },
      {
       "t": 1793798361,
       "v": 5.0
      },
      {
       "t": 1793817964,
       "v": 5.1
      },
      {
       "t": 1793837567,
       "v": 5.2
      },
      {
       "t": 1793857171,
       "v": 5.3
      },
      {
       "t": 1793876774,
       "v": 5.4
      },
      {
       "t": 1793896377,
       "v": 5.5
      },
      {
       "t": 1793915981,
       "v": 5.6
      },
      {
       "t": 1793935584,
       "v": 5.8
      },
      {
       "t": 1793955188,
       "v": 5.9
      },
      {
       "t": 1793974791,
       "v": 6.0
      },
      {
       "t": 1793994394,
       "v": 6.1
      },
      {
       "t": 1794013998,
       "v": 6.2
      },
      {
       "t": 1794033601,
       "v": 6.3
      },
      {
       "t": 1794053204,
       "v": 6.4
      },
      {
       "t": 1794072808,
       "v": 6.6
      },
      {
       "t": 1794092411,
       "v": 6.7
      },
      {
       "t": 1794112014,
       "v": 6.8
      },
      {
       "t": 1794131618,
       "v": 6.9
      },
      {
       "t": 1794151221,
       "v": 7.0
      },
      {
       "t": 1794170825,
       "v": 7.1
      },
      {
       "t": 1794190428,
       "v": 7.3
      },
      {
       "t": 1794210031,
       "v": 7.4
      },
      {
       "t": 1794229635,
       "v": 7.5
      },
      {
       "t": 1794249238,
       "v": 7.6
      },
      {
       "t": 1794268841,
       "v": 7.8
      },
      {
       "t": 1794288445,
       "v": 7.9
      },
      {
       "t": 1794308048,
       "v": 8.0
      },
      {
       "t": 1794327651,
       "v": 8.1
      },
      {
       "t": 1794347255,
       "v": 8.2
      },
      {
       "t": 1794366858,
       "v": 8.4
      },
      {
       "t": 1794386461,
       "v": 8.5
      },
      {
       "t": 1794406065,
       "v": 8.6
      },
      {
       "t": 1794425668,
       "v": 8.8
      },
      {
       "t": 1794445272,
       "v": 8.9
      },
      {
       "t": 1794464875,
       "v": 9.0
      },
      {
       "t": 1794484478,
       "v": 9.1
      },
      {
       "t": 1794504082,
       "v": 9.3
      },
      {
       "t": 1794523685,
       "v": 9.4
      },
      {
       "t": 1794543288,
       "v": 9.5
      },
      {
       "t": 1794562892,
       "v": 9.7
      },
      {
       "t": 1794582495,
       "v": 9.8
      },
      {
       "t": 1794602098,
       "v": 9.9
      },
      {
       "t": 1794621702,
       "v": 10.1
      },
      {
       "t": 1794641305,
       "v": 10.2
      },
      {
       "t": 1794660909,
       "v": 10.3
      },
      {
       "t": 1794680512,
       "v": 10.5
      },
      {
       "t": 1794700115,
       "v": 10.6
      },
      {
       "t": 1794719719,
       "v": 10.7
      },
      {
       "t": 1794739322,
       "v": 10.9
      },
      {
       "t": 1794758925,
       "v": 11.0
      },
      {
       "t": 1794778529,
       "v": 11.2
      },
      {
       "t": 1794798132,
       "v": 11.3
      },
      {
       "t": 1794817735,
       "v": 11.4
      },
      {
       "t": 1794837339,
       "v": 11.6
      },
      {
       "t": 1794856942,
       "v": 11.7
      },
      {
       "t": 1794876546,
       "v": 11.9
      },
      {
       "t": 1794896149,
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
    "date": "2026-11-11",
    "cost": 3.2
   },
   {
    "date": "2026-11-12",
    "cost": 4.8
   },
   {
    "date": "2026-11-13",
    "cost": 2.9
   },
   {
    "date": "2026-11-14",
    "cost": 6.1
   },
   {
    "date": "2026-11-15",
    "cost": 5.4
   },
   {
    "date": "2026-11-16",
    "cost": 4.2
   },
   {
    "date": "2026-11-17",
    "cost": 5.98
   }
  ],
  "estimate_note": "本地按 token 估算，与账单可能存在 ±5% 偏差"
 },
 "drift": {
  "repo": {
   "commit": "9f2c1ab",
   "committed_at": "2026-11-17T11:50:00+08:00",
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
    "repo_mtime": "2026-11-13T15:44",
    "live_mtime": "2026-11-13T15:44",
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
    "repo_mtime": "2026-11-16T10:12",
    "live_mtime": "2026-11-14T17:13",
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
    "repo_mtime": "2026-11-14T16:37",
    "live_mtime": "2026-11-14T16:37",
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
    "repo_mtime": "2026-11-14T16:37",
    "live_mtime": "2026-11-14T16:37",
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
    "repo_mtime": "2026-11-17T11:50",
    "live_mtime": "2026-11-17T11:49",
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
    "repo_mtime": "2026-11-16T18:03",
    "live_mtime": "2026-11-16T18:03",
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
    "repo_mtime": "2026-11-16T18:03",
    "live_mtime": "2026-11-16T18:03",
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
    "repo_mtime": "2026-11-16T17:50",
    "live_mtime": "2026-11-16T16:41",
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
    "repo_mtime": "2026-11-16T13:50",
    "live_mtime": "2026-11-16T16:42",
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
    "name": "黑盒语音",
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
  "checked": "2026-11-17T14:15:49+08:00"
 },
 "events": {
  "events": [
   {
    "id": "e1",
    "time": "2026-11-17T22:14:00+08:00",
    "type": "error",
    "severity": "error",
    "title": "Biubiu WebSocket 异常关闭",
    "detail": "重连 3/5，房间暂时不可用",
    "role": "biubiu"
   },
   {
    "id": "e2",
    "time": "2026-11-17T22:17:00+08:00",
    "type": "service",
    "severity": "warning",
    "title": "hermes-biubiu 停止",
    "detail": "服务进入 inactive 状态",
    "role": "biubiu"
   },
   {
    "id": "e3",
    "time": "2026-11-17T22:13:00+08:00",
    "type": "errors",
    "severity": "info",
    "title": "错误采集完成",
    "detail": "13 源 · 新增 6 条",
    "role": "system"
   },
   {
    "id": "e4",
    "time": "2026-11-17T19:41:00+08:00",
    "type": "alert",
    "severity": "warning",
    "title": "ETF 溢价越过阈值",
    "detail": "最高 3.12% · Bark 已推送",
    "role": "sentinel"
   },
   {
    "id": "e5",
    "time": "2026-11-17T17:30:00+08:00",
    "type": "cron",
    "severity": "error",
    "title": "Twitch Drops 任务失败",
    "detail": "HTTP 403 · 重试 2 次",
    "role": "sentinel"
   },
   {
    "id": "e6",
    "time": "2026-11-17T13:05:00+08:00",
    "type": "alert",
    "severity": "warning",
    "title": "Bark 推送超时后成功",
    "detail": "10s timeout · retry ok",
    "role": "sentinel"
   },
   {
    "id": "e7",
    "time": "2026-11-17T10:00:00+08:00",
    "type": "output",
    "severity": "info",
    "title": "每日教义已发布",
    "detail": "DC #教义厅 + 黑盒语音",
    "role": "hamburger"
   },
   {
    "id": "e8",
    "time": "2026-11-17T08:00:00+08:00",
    "type": "output",
    "severity": "info",
    "title": "早报已发送",
    "detail": "语音 + 文字 · Telegram",
    "role": "hanbao"
   },
   {
    "id": "e9",
    "time": "2026-11-17T03:12:00+08:00",
    "type": "service",
    "severity": "warning",
    "title": "gateway 失败自愈重启",
    "detail": "部署窗口外 · 建议查看 OOM",
    "role": "system"
   },
   {
    "id": "e10",
    "time": "2026-11-17T00:12:00+08:00",
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
