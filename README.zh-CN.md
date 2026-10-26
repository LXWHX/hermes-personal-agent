# Hermes Personal Agent

[English](README.md) | **简体中文**

> 一套 24/7 在线、多平台分身、自带监控面板的个人 AI 助理系统。

基于 [Nous Research Hermes Agent](https://hermes-agent.nousresearch.com/) 搭建，常驻东京云服务器
全年无休：一个模型订阅驱动四个 agent 分身（Telegram 私人秘书「憨包」、Discord 频道的
「汉堡」、黑盒语音房的「汉堡大王」和「BIUBIU」），mem0 长期记忆，十几个定时任务，
外加一圈无人值守的数据哨兵（游戏快讯 / 游戏热度 / Twitch Drops / ETF 溢价监控）。

这个仓库是整套系统的**展示切片**：核心是 [hamburger.joeli.site](https://hamburger.joeli.site)
背后的只读监控面板，含完整开发历史与设计文档。

## 在线参观

| 入口 | 说明 |
|---|---|
| **[hamburger.joeli.site](https://hamburger.joeli.site)** | 访客视图，直接打开——角色卡、服务健康、活跃度、任务时间轴、模型额度、系统状态 |
| hermes.joeli.site | 完整 11 模块视图，Cloudflare Access 邮箱验证保护，不对公众开放 |

访客视图不是前端打码：同一个 FastAPI 进程按 Host 头在**服务端**裁剪，访客请求拿不到的
接口直接 403，敏感模块（错误中枢 / 计划板 / 日志）整块不存在于响应中。

## 监控面板

```
浏览器 → Cloudflare Access → cloudflared（出站隧道，零入站端口）
                                      ↓
                            FastAPI 只读 sidecar（127.0.0.1:8787）
                                      ↓
     systemd / journalctl / crontab / 错误中枢（18 源）/ 任务板 / 四个 profile 的 state.db
```

- **只读**：没有任何写线上状态的接口；8787 只绑 loopback，公网入口全靠 cloudflared 出站隧道
- **脱敏**：服务端 `util.redact()` 统一处理 key / Bearer / chat_id / IPv4 / 长数字 / 绝对路径
- **诚实降级**：单源失败只降级对应模块（`warnings` + 空数据），绝不编字段；订阅制没有
  成本数据就显示「—」而不是估算金额
- **访客 / 站主同进程分视图**：权限判定 100% 在服务端，前端不做「先拿数据再模糊」
- **视觉**：Balenciaga post-2017——单一 Helvetica 字族、极端字阶、零圆角零阴影，
  红色只留给失败与逾期；十字准星读数光标等动效见 `dashboard/frontend/`

## 本地跑 demo（无需服务器）

```bash
cd dashboard/backend
pip install -r requirements.txt          # 只有 fastapi + uvicorn 两个依赖
HERMES_DASHBOARD_DEMO=1 python -m uvicorn app:app --port 8787
# 打开 http://127.0.0.1:8787 —— 所有响应带 "demo": true，页面顶部有黑色 DEMO 条
```

也可以直接双击 `dashboard/frontend/index.html`：接口不可达时自动切换离线演示数据。

## 仓库结构

```
├── README.md            # English (default)
├── README.zh-CN.md      # 本文件
├── DESIGN.md            # 设计文档：模块、数据源、接口契约、部署与验收清单
├── LICENSE              # MIT
└── dashboard/
    ├── backend/         # FastAPI：13 个只读 API（含 SSE 日志流）+ TTL 缓存 + 服务端脱敏
    │   ├── app.py
    │   └── collectors/  # services / jobs / errors / board / activity / outputs /
    │                   #            usage / events / overview / drift / system
    └── frontend/        # 零依赖原生 JS/CSS + 离线 demo 数据
```

> 完整系统远不止这个面板——出于隐私只公开监控面板这一层；设计取舍、口径与验收过程
> 都在 [`DESIGN.md`](DESIGN.md)。

## License

[MIT](LICENSE)
