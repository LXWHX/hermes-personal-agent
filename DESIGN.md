# Hermes 可视化监控面板 — 设计与实施计划

> 状态：**全部完成，外网已上线**（M1–M3 + 停服演练 + Cloudflare Tunnel/Access + 访客视图；2026-10-22 立项、2026-10-23 收官）
> 目标文件：`dashboard/`、`server/dashboard-deploy.sh`
> 当前版本：commit `0c27f67`（M3 收尾）+ 访客视图；systemd `hermes-dashboard` + `cloudflared` 已运行；
> 老板 `hermes.joeli.site`（Cloudflare Access，§12.9），访客 `hamburger.joeli.site`（公开裁剪视图，§12.10）
> 本文档是执行依据：模块清单、数据源、接口契约、分期任务、验收标准、上线记录与每日续跑清单都在这里。
> 实现说明见 `dashboard/README.md`；本机演示：`HERMES_DASHBOARD_DEMO=1`。
> 计划任务全部完成（2026-10-23）。日常只需 §13.1 例行核对；面板问题走既有 runbook。

---

## 1. 目标

在网页上实时看清三个 agent 的健康度与工作产出：

| 角色 | 形态 | 角色专属指标 |
|---|---|---|
| 憨包 | Telegram 主秘书 + cron | 心跳轮次、早报、PLAN/STATUS 板、错误巡视、提醒是否发出 |
| 汉堡 | Discord profile + 黑盒语音「汉堡大王」+ Eye | DC 频道/线程活跃、教义发布、Eye 观察、双平台是否都在线 |
| biubiu | 黑盒语音「铲铲大王房」sidecar | 房间在线人数、语音回合、BiuNews 投递、独立额度消耗 |

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
**12. 系统资源**：CPU/内存/磁盘、东京节点网络延迟、Telegram/Discord/黑盒语音 API 可达性
**13. 记忆与群活跃**：mem0 各 collection 条数、DC 频道与黑盒语音房间活跃 Top

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
| `GET /api/drift` | 仓库 HEAD/脏文件 + SOUL/config 线上副本 sha256 一致性 |
| `GET /api/system` | 主机负载/内存/swap/磁盘/加固旋钮 + 出站可达探测 |
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
  （✅ 2026-10-23 已执行，实际基线与本文预写不同：DNS 实挂 **DNSPod** 而非 Vercel，apex A=`216.198.79.1`，另有 `wf` 子域 CNAME→`82e2e8454695b620.vercel-dns-017.com`；共 3 条记录全部灰云照抄，无 MX/TXT/DNSSEC。NS=`elisabeth.ns.cloudflare.com`/`jaziel.ns.cloudflare.com`。详见 §12.9。）
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
- [x] 定接口契约，起 FastAPI 骨架 + 统一响应格式
- [x] `services` 采集器（systemd + 端口 + uptime 条带）
- [x] `jobs` 采集器（hermes cron + crontab 解析）
- [x] `errors` 采集器（groups.json + approvals）
- [x] `overview` 聚合
- [x] 前端：角色卡 + 服务健康 + 任务看板 + 错误区
- [x] `dashboard-deploy.sh` + systemd，绑定 127.0.0.1（2026-10-22 已部署，`active/enabled`）
- [x] cloudflared 部署（2026-10-23：DNS 迁 CF + Tunnel + Access + 登录墙验收，见 §12.9）
- [x] 端到端验证（2026-10-23 演练：停 biubiu 后 15s 变红并给出原因，恢复 +20s，见 §12.8）

### M2 — 特色模块
- [x] `activity`（state.db 只读 + 7d 热力图）
- [x] `board`（PLAN/STATUS 解析 + 逾期高亮）
- [x] `outputs`（五类哨兵产出墙）
- [x] `events`（重启 / cron 失败 / 错误高峰 / 审批合并）
- [x] 前端补齐对应区块

### M3 — 成本与实时
- [x] `usage`（按 profile 的 token/成本，额度不可得时明确标注；**实测：token 真实，成本因订阅制无单价而标不可用**）
- [x] SSE 日志流 + 脱敏
- [x] 配置漂移与系统资源（2026-10-23：`drift.py` 比对 4 个 SOUL 副本 + config 模板；`system.py` /proc 指标 + 加固旋钮 + 4 路出站探测；实测 4 same + 1 template）
- [x] 移动端适配（手机上也能看）

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
2. **首版形态**——**已决（2026-10-22）**：先做可点击原型并内置演示数据（`dashboard/frontend/demo-data.js`），再接真实接口；真实数据不可用时整块显示"数据不可用"。
3. **额度数据**——**已确认**：OpenCode Go 有 key 鉴权的 `https://opencode.ai/zen/go/v1/usage`（三窗 remaining），`usage.py` 已接入；token/成本仍为本地估算，拿不到就标不可用。
4. **技术栈**——**已决（2026-10-22）**：Vanilla 单页 + 手写 SVG，不引 UI 框架与图表库。

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

> 读 `docs/dashboard-plan.md`，先看 §12 上线记录和 §13 每日续跑清单，不要重做已完成模块。
> 当前面板**外网已上线**：`hermes.joeli.site`（Cloudflare Access；服务器侧 `hermes-dashboard` +
> `cloudflared`）。计划任务已全部完成（§12.7–§12.9），每天只做 §13 的例行核对即可。
> 面板只读，任何 repair 动作走既有 runbook，不通过面板写线上状态；不要覆盖 `/root/hermes-board/`
> 与 `/root/hermes-errors/`。改代码后按 §13.4 的发布流程走，并把结果补进 §12。
> 遇到老板正在修的问题（§12.3）不要重复修，只记录状态。

---

## 12. 上线与验证记录（2026-10-22）

### 12.1 部署现状

- 代码基线：commit `05ead9b`（已推 `origin` 与 `server` 两端）；之后仅文档收尾，未改面板逻辑
- systemd：`hermes-dashboard` **active / enabled**，`ExecStart` 使用 `/root/hermes-dashboard/.venv/bin/uvicorn`
- 监听：`127.0.0.1:8787`；外部访问 8787 超时，未开入站端口
- 部署方式：`bash server/dashboard-deploy.sh`（幂等，已重新执行确认）
- 访问：当前只能 SSH 隧道，例如 `ssh -L 8788:127.0.0.1:8787 root@<server>` → `http://127.0.0.1:8788`
- **外网未上线**：`cloudflared` 未安装；`joeli.site` DNS 仍在 Vercel（验证时解析到 `216.198.79.1`）；
  `hermes.joeli.site` 尚不解析

### 12.2 数据核对（验证时点 2026-10-22 17:30 左右）

| 项目 | 实测 |
|---|---|
| 服务 | 6 / 6 active；8642 API 200 |
| 角色 | 憨包在线；汉堡、biubiu 服务在线但静默 >2h |
| 今日消息 | 憨包 228 / 汉堡 16 / biubiu 19 |
| 7d 活跃度 | 504 格；hanbao 1720 / hamburger 180 / biubiu 105 |
| 定时任务 | crontab 14 条；`hermes_parse=ok`；共 28 项（含个人提醒） |
| 错误中枢 | 14 源、295 条；与当日 `groups.json` 源数一致 |
| 审批 | 待批 3；`approvals/` 实际 16 个文件，状态计数一致 |
| 额度 | 3 个唯一 key（主线路+汉堡共用一把）；余量 75% |
| 延迟 | p50：憨包 11.3s / 汉堡 11.4s / biubiu 5.3s |
| 事件 | 8 条，含 gateway 崩溃、watcher 失败、Twitch 失败、身体转段 |

> 2026-10-26 更新：错误源已扩到 **18**（新增「网站后台」「站点探活」「网站进程」「隧道」），
> crontab **15** 条（新增每分钟 `site-probe.py`）；上表为 10-23 的验收快照。
> 现状见 `dashboard/README.md`「错误日志与可用性监控」。

### 12.3 面板暴露出的真实问题（老板修复中，不属面板缺陷）

1. **gateway 当天窗口外崩溃重启 5 次**（10:48、12:09、12:54 等）——✅ 已关闭：真相是
   hermes 自动更新（v0.21.6→+406）与部署重启被旧分类逻辑误判；`2c434b8` 改三档分类
   （只认 Scheduled restart 计数），另有 2G 内存加固 `bdcd0ce`（swappiness=10 +
   MALLOC_ARENA_MAX=2）。2026-10-23 面板 crash=0。
2. **`repair-watcher.sh` 八进制 bug**：`line 52` 把 `08`/`09` 当八进制 → `NOW_MIN: unbound variable`，每 10 分钟空跑——✅ 已修：`10#` 强制十进制，并加每小时一条
   `[WATCHER_OK]` 成功心跳（面板不再长挂 failed）。
3. **Twitch Drops** 2026-10-21 17:33 因 LLM 503 跳过——✅ 下轮自然恢复；另见 2026-10-23
   老板在修的「黑盒图片漏发」（与面板无关）。

> 面板当时正确标红，修复均在面板之外完成，dashboard 代码未绕过或降级显示。

### 12.4 本轮已修复的采集问题

1. systemd 的 `Id=hermes-gateway.service` 与配置 key 不一致 → 统一去 `.service` 后缀。
2. 活跃度只读主库 → 改为四库只读汇总（default / hamburger / heybox / biubiu），排除 tool 消息。
3. 服务环境 PATH 无 `hermes` → 绝对路径 `/root/.local/bin/hermes`，default + hamburger 两个 profile 都解析。
4. `[COLLECTED]` 误判失败、`[LLM_FAILED]` 漏判 → 修正日志分类。
5. `每日教义` 占位 schedule 显示成每年 1 月 1 日 → 改为“由教义触发器唤起 · 10:00”。
6. 三路 ETF、两路昵称签名重名 → 加计划/平台后缀区分。
7. 首屏 overview 冷启动 8s → 启动预热 + 并发采集 + 同 key 锁合并，热态约 1s。
8. 成本全为 0 → 不再显示 `$0.00`，明确标“订阅制、成本不可用”，token 照常显示。
9. 角色延迟为空 → 用 user→assistant 消息配对计算 p50/p95（上限 5 分钟）。
10. 角色“静默”判定 → 服务在线但 2 小时无消息即显示静默。

### 12.5 数据口径（后续不要误解）

- **active 消息**：只统计 `user` / `assistant`，不含 tool；四个 profile 库合并。
- **p50/p95**：端到端“用户消息 → 下一条助手消息”，包含工具循环与思考时间，不是模型首 token 延迟。
- **成本**：OpenCode Go 为订阅制，`sessions.estimated_cost_usd` 全为 0；只展示 token 用量，成本标不可用。
- **额度**：主线路与汉堡 profile 共用同一把 key，已合并展示；黑盒、biubiu 各有独立 key。
- **静默**：服务 active 且 2 小时内无消息；不等于进程挂掉。
- **jobs**：包含全部 Hermes cron（含一次性个人提醒）与系统 crontab，所以数量会多于 §2 的核心任务清单。

### 12.6 验收标准对照

| # | 标准 | 状态 |
|---|---|---|
| 1 | 停服务 30s 内角色卡变红 | **已验证**（2026-10-23 演练：+15s 变红 +「服务停止，房间不可用」，见 §12.8） |
| 2 | cron 失败在任务板与事件流同时可见 | **已验证**（watcher / Twitch 实际失败均出现） |
| 3 | 待批/修复中与 approvals 一致 | **已验证**（待批 3，文件计数一致） |
| 4 | 刷新无写操作、无 exec 报错 | **已验证**（接口只读；journal 无 exec 报错） |
| 5 | 外网不能直连 8787、前端无密钥 | **已验证**（8787 仅 loopback；`hermes.joeli.site` 走 Tunnel+Access 未登录 302；无新开入站端口） |
| 6 | 单源故障不影响其他模块 | **本地已验证**（空数据下 9 个模块独立降级；生产当前全源健康） |

### 12.7 M3 收尾上线（2026-10-23）

- Commit `0c27f67`：新增 `collectors/drift.py`（仓库 ↔ 线上副本 sha256 一致性）与
  `collectors/system.py`（/proc 主机指标 + 4 个出站探测），路由 `/api/drift`（缓存 60s）
  与 `/api/system`（主机 20s / 探测 120s 分离缓存），前端新增 [11] 系统与配置区块，demo 同步。
- 实测（12:17）：仓库 HEAD `0c27f67` dirty=0；4 个 SOUL 副本 `same`（heybox/biubiu 按
  `SOUL.md + "\n\n" + PROFILE_EXTRA.md` 拼接比对成立）；config.yaml `template`（手工同步
  模板，差异属预期）；1 核 / 负载 0.49 / 内存 45.7% / swap 15.2% / 磁盘 42.4% /
  swappiness 10 / MALLOC_ARENA_MAX 2；Telegram·Discord·黑盒语音·OpenCode 四路出站全部 200
  （0.9–2.6s，东京单核冷连接正常水平）。
- 出站探测口径：**拿到任何 HTTP 应答（含 4xx/5xx）即算可达**；只有超时/DNS/连接失败才标
  DOWN。延迟为完整 TLS 建连 + 响应头耗时，非 ping。
- 发布时注意：本地工作树有老板未提交的 Twitch Drops 黑盒图片修复 WIP（CHANGELOG /
  phase-o / twitch-drops 三处），按「只暂存 dashboard → stash 其 WIP → rebase → pop」
  流程避开，未动其内容。
- §13.2 两项老板修复同日验证关闭（见 §12.3）。

### 12.8 停服演练通过（2026-10-23 13:48）

- 预检：biubiu active，房间上次活跃 09:05（空闲时段）；基线角色卡 silent。
- `systemctl stop hermes-biubiu` → **+15s** `/api/services` 变 `inactive/offline`；角色卡
  **offline「服务停止，房间不可用」** —— 变红 + 原因，验收标准 1 通过（30s 内）。
- 停机 16s 后 `start` → **+20s** API 回 active；服务日志确认重连完成
  （预约簿 / biubiu_mem0 / 推送接口 /「已连接」）。
- 前端 30s 轮询，页面可见最多再晚一个轮询周期；biubiu 的 24h uptime 条带在该时段
  留一段红格，属预期不是故障。

### 12.9 上外网：Cloudflare DNS 迁移 + Tunnel + Access（2026-10-23）

- **DNS**：joeli.site 的 zone 从 DNSPod 迁入 Cloudflare 免费版。实际记录 3 条（`@ A 216.198.79.1`、
  `www CNAME cname-china.vercel-dns.com`、`wf CNAME 82e2e8454695b620.vercel-dns-017.com`），
  全部 **DNS only 灰云**直连 Vercel；无 MX / TXT / DNSSEC（DS 为空确认后才切 NS）。腾讯云 ~14:20
  提交 NS 变更（`elisabeth` / `jaziel.ns.cloudflare.com`），`.site` 注册局 **14:26 翻面**（委派
  TTL 900s），1.1.1.1 / 8.8.8.8 即时跟上；期间新旧 zone 应答一致，全程零停机。
- **Tunnel**：Zero Trust remotely-managed tunnel `hermes-dashboard`；token 落 `/etc/cloudflared/token`
  （600），`dashboard-deploy.sh --with-tunnel` 安装 systemd `cloudflared`（active/enabled）。4 条 QUIC
  连接注册东京边缘（nrt01/12/14/16）。Public hostname `hermes.joeli.site → HTTP localhost:8787`
  ——新版 CF 界面里该配置在 Tunnel 详情的 **Routes** 标签（旧文档写的 Public Hostname 标签已改名）。
- **Access**：Self-hosted app `hermes-dashboard`，policy `boss` = Allow + Emails `643130468@qq.com`
  （One-time PIN），session 24h。未登录访问 302 → `muddy-meadow-5c62.cloudflareaccess.com` 登录页。
- **验收实测**：本机（CN 出口）与服务器（东京）双视角均 302 登录墙 ✓；apex/www/wf 三站迁移前后
  200/307/200 一致 ✓；`ss` 复核 8787 仍只绑 127.0.0.1、无新开入站端口 ✓（公网 8080 为原有
  bark-server，与本次无关）。cloudflared 经 pkg.cloudflare.com apt 源安装（2026.10.3）。
- **既有观察（非本次问题，留档）**：`www.joeli.site` 证书不带 www SAN（迁移前如此：Vercel 边缘只发
  CN=joeli.site，忽略证书后 307 → apex）；要修在 Vercel 项目设置里把 www 加进域名列表即可。
- **坑：Tunnel Route 的 service 必须是 HTTP**。新增 hostname 时把 service 写成 `https://localhost:8787`
  会让 cloudflared 对源站发起 TLS 握手、页面报 `Host Error`，日志是
  `tls: first record does not look like a TLS handshake`（2026-10-23 14:36 实测一次）。
  正确写法：`HTTP` → `127.0.0.1:8787`。
- **应急通道**：SSH 隧道仍可用（`ssh -L 8788:127.0.0.1:8787 root@<server>`），CF/Access 故障时用。

### 12.10 访客视图（2026-10-23）

- **两个域名**：`hermes.joeli.site`（老板，Access OTP，全量）与 `hamburger.joeli.site`
  （访客，Access `Bypass + Everyone`，裁剪视图）。8787 仍只绑 loopback，外网只经 cloudflared。
- **判定方式**：服务端 `util.viewer_for(request)` 只读 `Host` 头（剥端口、小写），
  与 systemd 的 `HERMES_DASHBOARD_GUEST_HOSTS=hamburger.joeli.site` 比对，命中即 `guest`。
  绝不接受 `?view=guest` 一类客户端参数。DEMO 默认 owner；本地可用
  `HERMES_DASHBOARD_FORCE_VIEWER=guest` 看样式。
- **安全前提**：8787 只绑 loopback 且只有 Cloudflare Tunnel 能进，`Host` 由边缘决定，客户端无法伪造成
  owner 域名。**若以后在前面加反向代理，必须改用 `Cf-Access-Authenticated-User-Email` 或验 JWT。**
- **可见**：01 角色、02 服务健康、03 活跃度、04 定时任务、08 模型与额度、11 系统与漂移。
  其中 04 只保留 24h 时间轴，明细表与 footer 仅在 owner 视图显示。05/06/07/09/10
  整块从访客页面移除（DOM 仍存在以复用同一份静态文件，guest 下 CSS 隐藏、导航项隐藏），
  不再使用黑白图片马赛克；04 摘要等仍需要遮挡的字段用字符 `▓▓▓` 表示。
- **字段级裁剪**（服务端完成，前端不 blur 真实数据）：
  - `/api/overview`：`overdue_tasks/open_approvals → null`（分别来自 06/05）；
    `note` 固定「访客视图 · 部分模块隐藏」；`roles[].metrics → []`（指标混有 05/06/07）；
    `online_services/total_services/api_ok` 与 `uptime_seconds` 保留（02 可见）；
    `global.state` 只看 `roles` 是否有 `offline`。
  - `/api/jobs`：访客只下发 `name`（统一为「秘密任务」）/ `last_run` / `next_run` / `result`；
    摘要、crontab id、命令行、计划等身份细节全部裁掉，时间轴悬浮也只显示「秘密任务」。
  - `/api/services`、`/api/activity`、`/api/usage`、`/api/drift`、`/api/system`：原样。
  - `/health`：guest 时带 `"viewer": "guest"`。
- **403 端点**：`/api/errors`、`/api/board`、`/api/outputs`、`/api/events`、
  `/api/logs/recent`、`/api/logs/stream`；统一返回
  `{"ok":false,"hidden":true,"viewer":"guest","error":"hidden_in_guest_view"}`。
  中间件在路由前拦截，`/api/logs/stream` 不会创建任何生成器/线程。
- **前端**：只探活一次 `/api/overview` 拿到 `viewer`，guest 拉
  overview/services/jobs/activity/usage/drift/system 七个接口（60s 轮询），不建立 SSE；
  `demo-data.js` 改为离线时懒加载，首屏不再下载 103 KB。
- **验收结果（服务器侧，2026-10-23）**：guest 403 矩阵 6/6（含 `/api/logs/stream`）；
  guest 200：overview/services/jobs/activity/usage/drift/system；`/health` 带 `viewer=guest`；
  `overview` 的 `overdue_tasks/open_approvals` 为 null、角色 `metrics=[]`，服务数与 uptime 保留；
  `jobs` 的 `summary` 全为 null；owner 侧全量不变。`bash server/dashboard-deploy.sh --check` 全绿。
- **上线状态**：`hamburger.joeli.site` 已通过 Tunnel Route（HTTP `127.0.0.1:8787`）+
  Access `Bypass + Everyone` 公开，DNS CNAME 指向
  `cb91dc08-9649-4d44-b80e-a70c6e4257bf.cfargotunnel.com`（橙云）；`hermes.joeli.site`
  仍 302 到 Access 登录页。

### 12.11 漂移扩展到 sidecar（2026-10-28）

- **动机**：10-27 改完 SOUL 后面板全绿，但 biubiu 的 sidecar 代码仍停在 16:41（漏跑一次
  `biubiu-deploy.sh`，漏了 `52e6593` 的 `playing_announce_stops` 默认值）。旧 `drift.py`
  只比 4 个 SOUL + config 模板，看不到 `/root/hermes-*` 的部署产物。
- **新增 4 个 bundle**：`heybox-sidecar-code` / `heybox-sidecar-config` /
  `biubiu-sidecar-code` / `biubiu-sidecar-config`。code 覆盖 `*.py`、`shared/watchlist.py`、
  `shared/playstats.py`、`mem0-retrieval-fix.py`、`owner_schedule.py`、`nickname-presence.py`、
  `game-night-reminder.py`；config 覆盖 sidecar JSON、SOUL、PROFILE_EXTRA、systemd unit、
  mem0 模板（不含含 key 的 `mem0.json` 与 `.env`）。
- **比对口径**：脚本/文本按字节；sidecar JSON 先规范化（`sort_keys`、紧凑分隔符）再比，
  并忽略部署期才写入的 `allowed_room_ids`，只保留真实配置差异。响应新增 `changed`
  文件名数组（只回文件名，不回内容/绝对路径），前端在该行下方红字列出（最多 3 个 + 共 N 个）。
- **实测**：修复后 8 same + 1 template、0 drift；demo 数据同步到 9 行，并保留一条
  `biubiu.py` 漂移样例便于验证红字渲染。


---

## 13. 每日续跑清单（次日从这里开始）

### 13.1 例行核对（5 分钟）

```bash
ssh root@<server>
systemctl is-active hermes-dashboard
bash /root/HamburgerBao/server/dashboard-deploy.sh --check
curl -s http://127.0.0.1:8787/api/overview | python3 -m json.tool | head -40
curl -s http://127.0.0.1:8787/api/jobs | python3 -m json.tool | head -60
curl -s http://127.0.0.1:8787/api/drift | python3 -m json.tool | head -20
```

页面/接口重点看：

1. `global.online_services` 是否 6/6；API 8642 是否 OK。
2. `jobs` 中 `result=failed` 的项；是否有新增失败。
3. `approvals.pending` 是否等于 `approvals/` 的实际状态计数。
4. `errors.trend` 是否异常翻倍；`failed_sources` 是否非空。
5. `usage.quota[].remaining` 是否低于 20%。
6. 三个角色是否长时间 `silent`（2h 无消息）而服务仍 active。
7. `warnings` 是否出现 `state.db`、`crontab`、`hermes cron` 读取失败。
8. `drift` 中出现 `drift`/`missing` 状态（线上与仓库漂移，需重新部署对应脚本）；`system.network` 出现 DOWN（出站不可达）。
9. `hamburger.joeli.site` 无需登录即可打开、7 块 mosaic、导航 7 项锁定；两端 Host 断言见
   `bash server/dashboard-deploy.sh --check` 的 `== guest view ==`（guest 403 / owner 200）。

> 面板本身只读。以上任何异常，修复动作走对应服务的既有 runbook，不通过面板写状态。

### 13.2 老板正在修的两项

- [x] gateway 窗口外崩溃：实为自动更新/部署重启误分类，`2c434b8` 修正三档分类 + `bdcd0ce`
  内存加固；2026-10-23 `errors.restarts.crash` = 0（manual 2 为计划内部署重启）。
- [x] `repair-watcher.sh`：八进制已修（`10#$(date +%H)`）+ 每小时一条 `[WATCHER_OK]`
  成功心跳（2026-10-23 已有 3 条）；面板「修复 watcher」不再 failed。

两项均于 2026-10-23 复核关闭，详见 §12.3。

### 13.3 仍待执行（需窗口期）

（已全部完成：Cloudflare 迁移 + Tunnel + Access 见 §12.9；停服演练见 §12.8；M3 见 §12.7。本节清空。）

### 13.4 改代码后的发布流程

```bash
# 本地
git add dashboard server/dashboard-deploy.sh docs/dashboard-plan.md
git commit -m "dashboard: ..."
git push origin main
git push server main

# 服务器
cd /root/HamburgerBao
bash server/dashboard-deploy.sh
bash server/dashboard-deploy.sh --check

# 验证
curl -s http://127.0.0.1:8787/api/overview | python3 -m json.tool | head -40
systemctl status hermes-dashboard --no-pager
```

发布后把新 commit、异常与数据口径变化补进 §12，保持“计划 = 事实”。

### 13.5 不要做的事

- 不要通过面板触发 cron、跑 repair、改 board / approvals / 配置。
- 不要让部署脚本覆盖 `/root/hermes-board/` 与 `/root/hermes-errors/`。
- 不要在未备份 DNS 记录、未确认 DNSSEC/MX 的情况下切 NS。
- 不要把演示数据当成实时数据；有 `demo=true` 或 DEMO 黑条时必须明确标注。
