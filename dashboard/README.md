# Hermes Dashboard

只读可视化监控面板。设计依据：[`docs/dashboard-plan.md`](../docs/dashboard-plan.md)。
视觉风格：**balenciaga-post-2017**（Brutalist / Raw）——单一 Helvetica/Arial 字族、极端字阶、
零圆角、零阴影、黑白为主，红色只用于失败与逾期。

```
浏览器 → Cloudflare Access → cloudflared（出站）→ 127.0.0.1:8787
                                                        │
                                              FastAPI 只读 sidecar
                                                        │
       systemd / journalctl / crontab / hermes-errors / hermes-board / state.db
```

## 当前状态（2026-10-23 · 全部完成）

- **外网已上线**：`https://hermes.joeli.site`（Cloudflare Access 邮箱 OTP；cloudflared 出站隧道，不开入站端口）
- 服务器：`hermes-dashboard` + `cloudflared` 均 active/enabled，8787 仍只绑 `127.0.0.1`
- M1–M3 全部完成：最后两块为配置漂移（`/api/drift`）与系统资源（`/api/system`），commit `0c27f67`
- 停服演练通过（停 biubiu +15s 变红）；DNS 已从 DNSPod 迁入 Cloudflare（记录与过程见计划 §12.9）
- 应急通道：SSH 隧道 `ssh -L 8788:127.0.0.1:8787 root@<server>`
- 数据源已核对：6/6 服务、四个 profile 的 state.db、14 个错误源、approvals 计数一致
- 详细验证数据、口径与每日检查清单见 [`docs/dashboard-plan.md` §12–§13](../docs/dashboard-plan.md)

## 快速开始

### 演示数据（本机，无需服务器）

```bash
cd dashboard/backend
python -m pip install -r requirements.txt
HERMES_DASHBOARD_DEMO=1 python -m uvicorn app:app --host 127.0.0.1 --port 8787
# 打开 http://127.0.0.1:8787
```

演示模式的所有响应都带 `"demo": true`，页面顶部有黑色 DEMO 条；不会伪装成真实数据。
也可以直接双击打开 `frontend/index.html`：接口不可达时会自动读取 `frontend/demo-data.js`。
修改 `backend/demo.py` 后执行 `python backend/build_demo.py` 重新生成该文件。

### 真实数据（服务器）

```bash
ssh root@<server>
cd /root/HamburgerBao
bash server/dashboard-deploy.sh          # 幂等安装 systemd + venv
bash server/dashboard-deploy.sh --check  # 健康检查
```

systemd 单元 `hermes-dashboard` 只绑 `127.0.0.1:8787`，脚本会拒绝公网绑定。
部署脚本不会写入 `/root/hermes-board/` 或 `/root/hermes-errors/`。

### Cloudflare Tunnel（✅ 2026-10-23 已上线）

zone 已迁入 Cloudflare（NS：`elisabeth` / `jaziel.ns.cloudflare.com`，从 DNSPod 平迁，零停机）。
Tunnel `hermes-dashboard`（remotely-managed），token 在 `/etc/cloudflared/token`（600），
systemd `cloudflared` active/enabled，4 条 QUIC 连接挂东京边缘。

- Public hostname：`hermes.joeli.site` → `http://localhost:8787`（CF 界面在 Tunnel 详情 **Routes** 标签）
- Access：Self-hosted app + policy `Allow + Emails`（One-time PIN 邮箱验证码，24h 会话）
- 排障：`journalctl -u cloudflared -f`；重启 `systemctl restart cloudflared`
- 换 token：更新 `/etc/cloudflared/token` 后 `systemctl restart cloudflared`
- 不开任何入站端口；`8787` 始终只绑 loopback

### 访客视图（`hamburger.joeli.site`，2026-10-23）

同一个进程、同一个端口，按 **Host 头** 在服务端裁剪，前端不做任何“先拿数据再 blur”。

| 域名 | 访问策略 | 视图 |
|---|---|---|
| `hermes.joeli.site` | Cloudflare Access（邮箱 OTP，24h） | 全量 11 块 |
| `hamburger.joeli.site` | Access `Bypass + Everyone` | 01 / 03 / 04 / 08 可见；其余 7 块 mosaic |

- 可见：角色卡、活跃度、定时任务（摘要列打码 `▓▓▓`）、模型与额度。
- 隐藏（403 + 马赛克）：`/api/services` `/api/errors` `/api/board` `/api/outputs`
  `/api/drift` `/api/system` `/api/events` `/api/logs/recent` `/api/logs/stream`。
- `overview` 的派生字段（服务数、API 探活、待批、逾期、角色 metrics、uptime）在
  guest 下统一置空，避免从 01 绕过马赛克。
- 配置：systemd `Environment=HERMES_DASHBOARD_GUEST_HOSTS=hamburger.joeli.site`
  （逗号分隔可写多个；**留空 = 关闭访客视图**，所有 Host 都按 owner 处理）。
- 临时关闭访客域名：删掉 Tunnel 的 Route，或把该 Access 应用改回 OTP；服务端无需改动。
- 本地验样式：`HERMES_DASHBOARD_FORCE_VIEWER=guest HERMES_DASHBOARD_DEMO=1 python -m uvicorn app:app --port 8787`。
- ⚠️ Tunnel Route 的 service 必须是 **HTTP `127.0.0.1:8787`**，写成 HTTPS 会 `Host Error`。

## 接口

统一响应：

```json
{ "ok": true, "generated_at": "2026-10-22T12:00:00+08:00", "data": {}, "warnings": [], "demo": false }
```

| 接口 | 内容 |
|---|---|
| `GET /api/overview` | 三角色卡 + 全局状态 |
| `GET /api/services` | systemd 明细、24h 条带、8642 探活 |
| `GET /api/jobs` | Hermes cron + 系统 crontab、上次/下次、结果 |
| `GET /api/activity?range=24h\|7d` | 会话热力图 `[{role,date,hour,count}]` |
| `GET /api/errors` | 动态错误源、7 天趋势、approvals、最近错误 |
| `GET /api/board` | PLAN.md / STATUS.md 解析结果 |
| `GET /api/outputs` | 五类哨兵 + 早报 + digest 最近一期 |
| `GET /api/usage` | OpenCode Go 三窗额度 + 本地 token 估算 |
| `GET /api/drift` | 仓库 HEAD/脏文件 + SOUL/config 线上副本 sha256 一致性 |
| `GET /api/system` | 主机负载/内存/swap/磁盘/加固旋钮 + 出站可达性 |
| `GET /api/events` | 合并事件流 |
| `GET /api/logs/stream?role=` | SSE 日志（脱敏，15s keepalive） |
| `GET /api/logs/recent` | 日志快照（SSE 不可用时兜底） |

单源失败只让对应模块返回 `{"error": ...}` 或空数据 + `warnings`，不影响整页。
缓存默认 20s（`HERMES_DASHBOARD_TTL`），额度/漂移 60s，出站探测 120s。

## 采集器与数据源

| 模块 | 真源 | 说明 |
|---|---|---|
| `services.py` | `systemctl show`、`journalctl`、8642 | `MemoryCurrent` 非数值按不可用处理 |
| `jobs.py` | `hermes cron list`、`crontab -l`、`~/.hermes/cron/output/<id>/` | 解析失败整块标 UNKNOWN，不编字段 |
| `errors.py` | `daily/<date>-groups.json`、`approvals/*.md`、`daily/<date>/*.log` | 错误源数量动态枚举 |
| `board.py` | `/root/hermes-board/PLAN.md`、`STATUS.md` | 逾期按截止日与状态判断 |
| `activity.py` | `~/.hermes/state.db`（`mode=ro`） | 表结构自省；找不到消息表就明确不可用 |
| `outputs.py` | 哨兵日志 / state / drafts、cron 输出 | `[SILENT]` 与失败分开 |
| `usage.py` | `https://opencode.ai/zen/go/v1/usage` + key | key 只在服务端读取，永不返回 |
| `events.py` | 上述模块合并 | 静音仅写浏览器 localStorage |
| `drift.py` | `git`（只读）+ 各部署落点 | 只比对 sha256 摘要与 mtime；config.yaml 为模板，差异属预期 |
| `system.py` | `/proc`、`disk_usage`、4 个公网探测 | 4xx/5xx 也算可达；仅超时/DNS 失败算断 |

## 安全与脱敏

- 面板只读；没有写线上状态的接口。
- 服务端 `util.redact()` 统一处理 key、Bearer、chat_id、IPv4、长数字、绝对路径。
- 前端源码与响应中不含 API key / chat_id / 服务器 IP / 房间号。
- 默认 `noindex`，外网必须经 Cloudflare Access。
- SSE 每 15s 发送 `: keepalive`，避免 Tunnel 100s 空闲断开。

## 已知限制

- `state.db` 已在 2026-10-22 对真实库验证：`messages` JOIN `sessions`，按四个 profile 库汇总；
  tool 消息不计入活跃度。
- token 用量真实；**成本不可用**：OpenCode Go 为订阅制，`sessions.estimated_cost_usd` 全为 0，
  面板显示“—”而不是编造金额。
- p50/p95 是“用户消息 → 下一条助手消息”的端到端延迟，包含工具循环，不是模型首 token 延迟。
- `hermes cron list` 输出格式可能随版本变化；解析失败时标 `UNKNOWN`，不会编字段。
- Cloudflare DNS 迁移与 Access 策略需在窗口期人工确认，部署脚本不代改 DNS。
- 移动端 390px / 平板 768px / 桌面 1440px 已做布局检查，无横向溢出；表格与热力图在小屏内横向滚动。

## 文件

```
dashboard/
├── backend/
│   ├── app.py                 # FastAPI 路由 + SSE + 静态托管
│   ├── cache.py               # TTL 缓存
│   ├── demo.py                # 明确标注的演示快照
│   ├── build_demo.py          # 重新生成 frontend/demo-data.js
│   ├── util.py                # 时间/子进程/脱敏
│   └── collectors/            # services jobs errors board activity outputs usage events overview drift system
├── frontend/
│   ├── index.html
│   ├── app.js                 # 轮询 / 渲染 / SSE / 静音
│   ├── styles.css             # Balenciaga post-2017 设计系统
│   └── demo-data.js           # 离线兜底（由 demo.py 生成）
└── README.md
server/dashboard-deploy.sh
```
