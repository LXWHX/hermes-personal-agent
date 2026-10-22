# Hermes 可视化监控面板 — 设计与实施计划

> 状态：**待开发**（2026-10-22 立项；同日托管/访问方案定稿：Cloudflare Tunnel，见 §5。计划在独立会话执行）
> 目标文件：`dashboard/`（新增），部署脚本 `server/dashboard-deploy.sh`
> 本文档是执行依据：模块清单、数据源、接口契约、分期任务、验收标准都在这里。

---

## 1. 目标

在网页上实时看清三个 agent 的健康度与工作产出：

| 角色 | 形态 | 角色专属指标 |
|---|---|---|
| 憨包 | Telegram 主秘书 + cron | 心跳轮次、早报、PLAN/STATUS 板、错误巡视、提醒是否发出 |
| 汉堡 | Discord profile + 小黑盒「汉堡大王」+ Eye | DC 频道/线程活跃、教义发布、Eye 观察、双平台是否都在线 |
| biubiu | 小黑盒「铲铲大王房」sidecar | 房间在线人数、语音回合、BiuNews 投递、独立额度消耗 |

原则：
- **只读**。面板不写任何线上状态（不触发 cron、不改 board、不动配置文件）。
- **一屏看懂"谁挂了、谁没干活、有什么要处理"**，不做炫技大屏。
- 三个角色卡片不做成同一模板，各自突出职责。
- 内部面板，默认不公开。

---

## 2. 信息架构

### P0 — 没有就不算监控页

**1. 三角色状态卡（首屏核心）**
- 服务在线/离线、当前平台、最后活跃时间、运行时长
- 今日消息数 / 回复数、平均响应延迟
- 当前模型、失败请求数
- 角色专属指标（见上表）
- 卡片顶部"心跳脉冲"动效，在线才跳

**2. 服务健康（systemd）**
- 6 个服务，以 `server/scripts/error-collector.py` 的 `SERVICE_UNITS` 为权威清单：
  `hermes-gateway` / `hermes-heybox` / `hermes-biubiu` / `hermes-eye` / `hamburger-nightwatch` / `hamburger-guild-guard`
- 状态、重启次数、内存/CPU、`127.0.0.1:8642` API 端口探活
- 24 小时 uptime 条带（绿色连续条，断开处即宕机）；gateway 重启三档（自愈/手动/崩溃）复用 `error-collector.py` 已有的解析逻辑

**3. 定时任务看板**
- 憨包早报 08:00、心跳 9–22 整点、错误巡视 22:30、每日教义
- 哨兵：游戏新闻 12:23、游戏热度 9:30、Twitch Drops 17:30、ETF、digest 23:50
- 每项：上次运行 / 下次运行 / 耗时 / 结果（成功·静默·失败·跳过）/ 一行输出摘要
- 用 24h 时间轴展示，比表格直观

**4. 活跃度热力图**
- 7 天 × 24 小时消息热力，按角色分色
- 用于发现"憨包今天早上没说话""汉堡凌晨还在接客"

**5. 错误中枢**
- 错误源分组计数 + 7 天趋势 sparkline（当前 13 源 = `error-collector.py` 8 文件源 + 5 journal 源；面板**动态枚举**当日 `groups.json` 的 `sources` 键，不硬编码数量）
- 修复闭环状态机：待批 / 已批准 / 修复中 / 已修复 / 已消退
- 最近错误流（时间、来源、摘要），点击展开原始行

### P1 — 体现项目特色

**6. 任务与生活状态板**
- `PLAN.md`：进行中 / 逾期 / 已完成，按截止日排序
- `STATUS.md`：当前作息（旅游/请假/加班）、身体护理阶段与下一个「转段」时刻、近况

**7. 情报产出墙**
- 早报、游戏新闻、热度、Drops、ETF 最近一期卡片 + 内容预览
- 投递目标（Telegram / DC #教义厅 / 冲冲冲房 / BiuNews）与投递结果
- 失败与 `[SILENT]` 分色，避免"没发"和"没跑"混淆

**8. 模型与额度**
- 按 profile 拆分的 token 用量、请求数、失败率、p50/p95 延迟
- OpenCode Go 三条独立 key 的额度余量
- 今日成本估算 + 7 天趋势

**9. 事件时间线**
- 服务重启、cron 失败、错误高峰、修复审批合并成一条流
- 支持"已确认/静音"，防告警疲劳

### P2 — 有余力再加

**10. 统一日志流**：三端日志聚合，按角色/级别过滤，SSE 实时 tail
**11. 配置漂移**：SOUL.md / config.yaml / 部署脚本最后部署时间、git commit、线上与仓库是否一致
**12. 系统资源**：CPU/内存/磁盘、东京节点网络延迟、Telegram/Discord/小黑盒 API 可达性
**13. 记忆与群活跃**：mem0 各 collection 条数、DC 频道与小黑盒房间活跃 Top

---

## 3. 页面布局

```
┌────────────────────────────────────────────────────────────┐
│ Hermes 控制台   全部正常 ●   时间范围 24h/7d   自动刷新 30s │
├────────────────────────────────────────────────────────────┤
│ ┌─憨包──────┐ ┌─汉堡──────┐ ┌─biubiu────┐ ┌─系统健康──┐ │
│ │ 在线 6d12h │ │ DC+盒 在线 │ │ 房间 3人   │ │ 4/4 服务  │ │
│ │ 今日 42 条 │ │ 线程 8 个  │ │ 语音 12 轮 │ │ 负载/磁盘 │ │
│ └───────────┘ └───────────┘ └───────────┘ └───────────┘ │
├──────────────────────────────┬─────────────────────────────┤
│ 活跃度热力图（7d × 24h）      │ 即将运行 / 最近失败的任务    │
├──────────────────────────────┼─────────────────────────────┤
│ 错误趋势 + 修复闭环           │ 事件时间线                   │
├──────────────────────────────┼─────────────────────────────┤
│ PLAN 任务板 / STATUS 状态板   │ 情报产出墙（最近一期）        │
├──────────────────────────────┴─────────────────────────────┤
│ 实时日志流（按角色过滤）                                     │
└────────────────────────────────────────────────────────────┘
```

视觉：
- 三个角色各一主色 + 头像；状态用"在线脉冲 / 打字中 / 静默 / 离线"区分，不用单一绿点。
- 深色底 + 低饱和卡片，红色只留给失败与逾期。
- 热力图、sparkline 用手写 SVG，不引重型图表库。

---

## 4. 数据源清单

### 服务
```bash
systemctl show -p ActiveState,SubState,MainPID,NRestarts,MemoryCurrent,CPUUsageNSec \
  hermes-gateway hermes-heybox hermes-biubiu hermes-eye
journalctl -u hermes-gateway --since "24 hours ago" -o json
curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8642/
```
> 执行前先确认 8642 的健康路径（`/health` 或根路径），以实测为准。

### 错误中枢
- `/root/hermes-errors/daily/<date>-groups.json`（机读分组，保留 14 天；源清单以当日 `sources` 键为准，动态枚举，不硬编码）
- `/root/hermes-errors/daily/<date>/<源名>.log`
- `/root/hermes-errors/approvals/*.md`（状态机真源）
- `/root/hermes-errors/collector.log`、`watcher.log`

### 任务与状态板
- `/root/hermes-board/PLAN.md`
- `/root/hermes-board/STATUS.md`

### 定时任务
```bash
hermes cron list            # 先确认是否有 --json；没有就解析文本
crontab -l                  # digest 23:50 / game-news / game-trends / twitch / 采集器 / watcher
```
任务清单参考：`docs/deployment.md`、`CLAUDE.md`。

### 会话与消息
- `~/.hermes/state.db`（**只读打开**：`file:...?mode=ro`，不要 `immutable=1`，WAL 模式下会读不到新数据）
- 只取元数据（时间、平台、角色、条数），不取正文；日志流做脱敏。

### 哨兵产出
- `game-news` / `game-trends` / `twitch-drops` / `etf-monitor` 的日志、`state.json`、产物目录
- digest：`/root/hermes-digest/drafts/*.md`、`digest.log`

### 额度与成本
- 目前**没有现成采集脚本**，需要新增：按 profile 从会话库统计 token，或接入 OpenCode Go 用量接口。
- 先做"本地估算"，接口拿不到就标注 `[UNAVAILABLE]`，不要编数。

---

## 5. 技术方案

### 后端（只读 sidecar）
- FastAPI，监听 `127.0.0.1:8787`，systemd `hermes-dashboard`
- 采集器分模块、各自带超时和异常兜底：单源失败返回 `{ "error": ... }`，不拖垮整页
- 内存缓存 15–30s，避免每次请求都 exec `systemctl`

接口契约（先定这个，前端不直接读文件）：

| 接口 | 内容 |
|---|---|
| `GET /api/overview` | 三角色卡 + 系统健康 + 全局状态 |
| `GET /api/services` | systemd 明细 + 24h uptime 条带 |
| `GET /api/jobs` | 定时任务列表、上次/下次、结果 |
| `GET /api/activity?range=7d` | 热力图数据 `[{role, date, hour, count}]` |
| `GET /api/errors` | 分组计数、趋势、approvals 状态机、最近错误 |
| `GET /api/board` | 解析后的 PLAN/STATUS |
| `GET /api/outputs` | 情报产出最近一期 + 投递结果 |
| `GET /api/usage` | token/成本/额度 |
| `GET /api/events` | 合并事件时间线 |
| `GET /api/logs/stream` | SSE 实时日志（脱敏） |

所有响应统一：
```json
{ "ok": true, "generated_at": "2026-10-22T12:00:00+08:00", "data": {}, "warnings": [] }
```

### 前端
- 首版单页，Vanilla + 少量组件即可；也可用 Vite + React，不引 UI 框架
- 30s 轮询关键接口，日志用 SSE；页面隐藏时暂停轮询
- 断源显示"数据过期 xx 秒"，不要显示旧数据冒充实时

### 安全与访问（托管方案 2026-10-22 定稿：Cloudflare Tunnel，不用 Vercel）

访问链路：

```
浏览器 → Cloudflare Access（邮箱 OTP / GitHub 登录）
       → CF 边缘 → cloudflared（服务器上，仅出站连接）→ 127.0.0.1:8787
```

- **为什么不走 Vercel 子页**：后端必须住在服务器上（数据源全是服务器本地：systemd / journalctl / state.db / /root/hermes-errors / /root/hermes-board）。Vercel 只能托管前端，浏览器仍要回源调服务器 API——要么把 API 暴露公网（多开一个攻击面），要么退化成静态快照（失去 30s 轮询与 SSE 实时日志）。且 joeli.site 是公开站点，PLAN/STATUS（作息、身体护理阶段）与错误中枢内容属个人隐私，不适合做公开子页。
- cloudflared 只走出站连接：**不开任何入站端口、不暴露源站 IP**；8787 仍只绑 `127.0.0.1`。
- 面板地址：`hermes.joeli.site`，认证用 Cloudflare Access 免费档（邮箱 OTP / GitHub）。
- **前置（M1 执行，动手前与老板约窗口期）**：joeli.site 的 DNS zone 迁入 Cloudflare——域名在腾讯云注册，DNS 现挂 Vercel。步骤：CF 免费版 Add site `joeli.site` → 对照 Vercel 控制台抄全记录（apex `A 76.76.21.21`、`www CNAME cname.vercel-dns.com`，如有邮箱 MX 必须原样抄）→ 腾讯云控制台把 NS 换成 CF 分配的两个 → 先抄全再切 NS，理论零停机。**joeli.site 网站本体继续留在 Vercel，不动。**
- 备选：Tailscale（不动 DNS：服务器 + 自有设备装 app，`tailscale serve` 把 localhost:8787 变 `https://<host>.<tailnet>.ts.net`，仅 tailnet 内可达）；SSH 隧道（`ssh -L 8787:127.0.0.1:8787 root@<server>`，桌面应急）。

脱敏（不变）：
- API key、chat_id、服务器 IP、房间号一律不进前端
- 日志与消息摘要脱敏（IP / 手机号 / key / 路径 / 个人标识）

---

## 6. 建议目录结构

```
dashboard/
├── backend/
│   ├── app.py                # FastAPI 入口 + 路由
│   ├── cache.py              # TTL 缓存
│   └── collectors/
│       ├── services.py       # systemd / 端口
│       ├── jobs.py           # hermes cron + crontab
│       ├── errors.py         # hermes-errors
│       ├── board.py          # PLAN.md / STATUS.md
│       ├── activity.py       # state.db 只读统计
│       ├── outputs.py        # 哨兵产物
│       ├── usage.py          # token / 额度
│       └── events.py         # 事件合并
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── styles.css
└── README.md                 # 本地运行 / 部署 / 接口说明
server/dashboard-deploy.sh    # 幂等部署 + systemd
```

---

## 7. 分期任务

### M1 — 可用的看家面板
- [ ] 定接口契约，起 FastAPI 骨架 + 统一响应格式
- [ ] `services` 采集器（systemd + 端口 + uptime 条带）
- [ ] `jobs` 采集器（hermes cron + crontab 解析）
- [ ] `errors` 采集器（groups.json + approvals）
- [ ] `overview` 聚合
- [ ] 前端：角色卡 + 服务健康 + 任务看板 + 错误区
- [ ] `dashboard-deploy.sh` + systemd，绑定 127.0.0.1
- [ ] cloudflared 部署：systemd 服务 + ingress → `localhost:8787`，`hermes.joeli.site` Tunnel hostname + Access policy（前置：DNS zone 迁入 Cloudflare，见 §5；动手前与老板约窗口期）
- [ ] 端到端验证：手动停 `hermes-biubiu`，页面 30s 内变红

### M2 — 特色模块
- [ ] `activity`（state.db 只读 + 7d 热力图）
- [ ] `board`（PLAN/STATUS 解析 + 逾期高亮）
- [ ] `outputs`（五类哨兵产出墙）
- [ ] `events`（重启 / cron 失败 / 错误高峰 / 审批合并）
- [ ] 前端补齐对应区块

### M3 — 成本与实时
- [ ] `usage`（按 profile 的 token/成本，额度不可得时明确标注）
- [ ] SSE 日志流 + 脱敏
- [ ] 配置漂移与系统资源
- [ ] 移动端适配（手机上也能看）

---

## 8. 验收标准

1. 任一受监控服务停止，30s 内该角色卡变红并给出原因。
2. 任一 cron 任务失败，任务看板与事件时间线同时可见。
3. 错误中枢的待批 / 修复中数量与 `approvals/` 目录一致。
4. 页面刷新不产生任何写操作；后端日志无 exec 报错。
5. 外网无法直接访问 8787；服务器未新开任何入站端口（`hermes.joeli.site` 走 cloudflared 出站隧道）；前端源码中无密钥、IP、chat_id。
6. 单源故障时页面其余模块正常，故障模块显示"数据不可用"。

---

## 9. 待定问题（开工前确认）

1. **访问范围**——**已决（2026-10-22）**：私有，不公开。`hermes.joeli.site` + Cloudflare Access 认证（架构与迁移步骤见 §5）。若日后想公开展示，另做脱敏静态快照页，不复用本面板。
2. **首版形态**：先用假数据做可点击原型定视觉，还是直接接真实接口？
3. **额度数据**：OpenCode Go 是否有可调用的用量接口？没有就只做本地估算。
4. **技术栈**：Vanilla 单页（最省）还是 React（后续扩展方便）。

---

## 10. 已知坑

- `state.db` 用 WAL：只读连接要 `mode=ro`，不要用 `immutable=1`；并发读取失败就退避重试，绝不写锁。
- `hermes cron list` 的输出格式可能随版本变化，解析要有兜底，失败时整块标 `[UNKNOWN]`。
- systemd 的 `MemoryCurrent` 可能是 `[not set]`，要按不可用处理。
- 哨兵的"没发"有两种：`[SILENT]`（正常静默）和失败，页面必须区分。
- 服务器时区是 Asia/Shanghai，后端统一输出带时区的时间，前端不再二次换算。
- 部署脚本要幂等，且**不要**覆盖 `/root/hermes-board/` 与 `/root/hermes-errors/` 的线上内容。
- SSE 经 Cloudflare Tunnel 空闲约 100s 会被断开：日志流须每 15s 发一行 `: keepalive` 注释帧保活。

---

## 11. 新会话开场提示词

> 读 `docs/dashboard-plan.md`，按 M1 开始实现。先定接口契约和后端骨架，再写前端。数据源以服务器实际输出为准，不要编造字段。每完成一个采集器，用真实命令验证一次。遇到需要我决策的（技术栈/额度接口）先问再动手；访问与托管已定稿（§5），按 Cloudflare Tunnel 执行，DNS 迁移动手前先约窗口期。
