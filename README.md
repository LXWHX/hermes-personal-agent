# Hermes Personal Agent

**English** | [简体中文](README.zh-CN.md)

> A 24/7, multi-persona personal AI assistant system — with its own monitoring dashboard.

Built on [Nous Research Hermes Agent](https://hermes-agent.nousresearch.com/) and running
year-round on a cloud server in Tokyo: a single model subscription drives four agent
personas (憨包, a private secretary on Telegram; 汉堡 on Discord; 汉堡大王 and BIUBIU in
Heybox voice rooms), mem0-powered long-term memory, a dozen scheduled jobs, plus a ring
of unattended data sentinels (game news / game trends / Twitch Drops / ETF premium
monitoring).

This repository is a **showcase slice** of that system: the read-only monitoring
dashboard behind [hamburger.joeli.site](https://hamburger.joeli.site), with its full
development history and design document.

## See it live

| Entry | Notes |
|---|---|
| **[hamburger.joeli.site](https://hamburger.joeli.site)** | Guest view, open to everyone — role cards, service health, activity, job timeline, model quota, system status |
| hermes.joeli.site | Full 11-module view, gated by Cloudflare Access email OTP — not open to the public |

The guest view is not a front-end blur: one FastAPI process trims it **server-side** by
Host header. Endpoints a guest may not see simply return 403, and sensitive modules
(error hub / task boards / logs) never exist in the response at all.

## The dashboard

```
Browser → Cloudflare Access → cloudflared (outbound tunnel, zero inbound ports)
                                        ↓
                            FastAPI read-only sidecar (127.0.0.1:8787)
                                        ↓
  systemd / journalctl / crontab / error hub (18 sources) / task boards / 4 profile state.db
```

- **Read-only**: no endpoint writes live state; 8787 binds to loopback only, and public
  ingress rides entirely on an outbound cloudflared tunnel
- **Redaction**: server-side `util.redact()` uniformly strips keys / Bearer tokens /
  chat IDs / IPv4s / long numbers / absolute paths
- **Honest degradation**: a failed source only downgrades its own module (`warnings` +
  empty data) — nothing is fabricated; a subscription tier with no cost data shows "—"
  instead of a made-up estimate
- **Guest / owner split within one process**: authorization is decided 100% server-side;
  the frontend never does "fetch first, blur later"
- **Visuals**: Balenciaga post-2017 — a single Helvetica family, extreme type scale,
  zero radius and zero shadows, red reserved for failure and overdue; the crosshair
  readout cursor and friends live in `dashboard/frontend/`

## Run the demo locally (no server needed)

```bash
cd dashboard/backend
pip install -r requirements.txt          # just fastapi + uvicorn
HERMES_DASHBOARD_DEMO=1 python -m uvicorn app:app --port 8787
# open http://127.0.0.1:8787 — every response carries "demo": true, with a black DEMO bar on top
```

You can also just double-click `dashboard/frontend/index.html`: when the API is
unreachable it automatically falls back to bundled offline demo data.

## Repository layout

```
├── README.md            # this file
├── README.zh-CN.md      # 简体中文版
├── DESIGN.md            # design doc: modules, data sources, API contracts, deploy & acceptance
├── LICENSE              # MIT
└── dashboard/
    ├── backend/         # FastAPI: 13 read-only APIs (incl. an SSE log stream) + TTL cache + server-side redaction
    │   ├── app.py
    │   └── collectors/  # services / jobs / errors / board / activity / outputs /
    │                   #            usage / events / overview / drift / system
    └── frontend/        # zero-dependency vanilla JS/CSS + offline demo data
```

> The full system is much more than this dashboard — for privacy, only this monitoring
> layer is public. Design trade-offs, data calibers and acceptance records all live in
> [`DESIGN.md`](DESIGN.md).

## License

[MIT](LICENSE)
