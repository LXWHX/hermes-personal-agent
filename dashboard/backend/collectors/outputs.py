"""Sentinel / briefing output wall.

Reads the newest evidence each pipeline leaves behind (log mtime + tail) and
classifies the result.  `[SILENT]` is a first-class result: "ran, had nothing to
say" must never look like "did not run".
"""
from __future__ import annotations

import re
from datetime import datetime
from pathlib import Path

from util import ROOT, TZ, now, read_text, redact, tail

SENTINELS = [
    {"id": "game-news", "name": "游戏快报", "latin": "GAME NEWS",
     "log": "/root/hermes-game-news/game-news.log", "state": "/root/hermes-game-news/state.json"},
    {"id": "game-trends", "name": "游戏热度", "latin": "GAME TRENDS",
     "log": "/root/hermes-game-trends/game-trends.log", "state": "/root/hermes-game-trends/state.json"},
    {"id": "twitch-drops", "name": "Twitch Drops", "latin": "TWITCH DROPS",
     "log": "/root/hermes-twitch-drops/twitch-drops.log", "state": "/root/hermes-twitch-drops/state.json"},
    {"id": "etf", "name": "ETF 溢价", "latin": "ETF PREMIUM",
     "log": "/root/hermes-etf-monitor/etf.log", "state": "/root/hermes-etf-monitor/state.json"},
]
DELIVERY_WORDS = [
    ("Telegram", ("telegram", "tg")),
    ("DC #教义厅", ("discord", "教义厅", "dc")),
    ("冲冲冲房", ("冲冲冲", "guild")),
    ("小黑盒", ("heybox", "黑盒")),
    ("BiuNews", ("biunews",)),
    ("Bark", ("bark",)),
]


def _classify(text: str) -> str:
    lowered = text.lower()
    if "[silent]" in lowered:
        return "silent"
    if re.search(r"traceback|http 4\d\d|http 5\d\d|error|failed|exception", lowered):
        return "failed"
    return "success"


def _deliveries(text: str) -> list[dict]:
    lowered = text.lower()
    found = []
    for label, needles in DELIVERY_WORDS:
        if any(n in lowered for n in needles):
            failed = bool(re.search(r"(?:failed|error|未投递|失败)[^\n]{0,40}" + re.escape(label.lower()), lowered))
            found.append({"target": label, "ok": not failed, "note": "日志有投递记录"})
    return found


def _log_item(meta: dict) -> dict:
    path = Path(meta["log"])
    if not path.is_file():
        return {**meta, "last_run": None, "result": "unknown", "title": "无日志",
                "excerpt": "[UNAVAILABLE] 日志文件不存在", "deliveries": [], "available": False}
    try:
        mtime = datetime.fromtimestamp(path.stat().st_mtime, TZ)
    except OSError:
        mtime = None
    lines = tail(path, 30)
    text = "\n".join(lines)
    result = _classify(text)
    title = "无新内容"
    if result == "failed":
        title = "执行失败"
    elif result == "silent":
        title = "静默（无新内容）"
    else:
        # prefer the last meaningful line that is not a bare timestamp / INFO noise
        for line in reversed(lines):
            clean = re.sub(r"^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}[,.]?\d*\s*", "", line).strip()
            if clean and not clean.startswith("["):
                title = redact(clean)[:100]
                break
    excerpt_lines = [re.sub(r"^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}[,.]?\d*\s*", "", l).strip()
                     for l in lines if l.strip()][-4:]
    excerpt = redact(" / ".join(excerpt_lines))[:300]
    return {
        "id": meta["id"], "name": meta["name"], "latin": meta["latin"],
        "last_run": mtime.isoformat(timespec="seconds") if mtime else None,
        "result": result, "title": title, "excerpt": excerpt,
        "deliveries": _deliveries(text), "available": True,
    }


def _latest_file(folder: Path, patterns=("*",), depth: int = 2) -> Path | None:
    if not folder.is_dir():
        return None
    files = [p for p in folder.rglob("*") if p.is_file()]
    files = [p for p in files if any(p.match(pat) for pat in patterns)]
    if not files:
        return None
    return max(files, key=lambda p: p.stat().st_mtime)


def _digest_item() -> dict:
    base = Path("/root/hermes-digest")
    log = base / "digest.log"
    drafts = base / "drafts"
    newest = _latest_file(drafts, ("*.md",), depth=1)
    evidence = log if log.is_file() else newest
    if not evidence:
        return {"id": "digest", "name": "每日 digest", "latin": "DAILY DIGEST", "last_run": None,
                "result": "unknown", "title": "无产物", "excerpt": "[UNAVAILABLE] digest 目录为空",
                "deliveries": [], "available": False}
    mtime = datetime.fromtimestamp(evidence.stat().st_mtime, TZ)
    title = "问答草稿"
    excerpt = ""
    if newest:
        content = read_text(newest, 4000)
        heading = next((l[2:].strip() for l in content.splitlines() if l.startswith("# ")), newest.stem)
        title = redact(heading)[:100]
        excerpt = redact(" ".join(l.strip() for l in content.splitlines()[1:6] if l.strip()))[:280]
    text = "\n".join(tail(log, 30)) if log.is_file() else ""
    return {"id": "digest", "name": "每日 digest", "latin": "DAILY DIGEST",
            "last_run": mtime.isoformat(timespec="seconds"), "result": _classify(text),
            "title": title, "excerpt": excerpt or "草稿已生成", "deliveries": _deliveries(text),
            "available": True}


def _briefing_item() -> dict:
    output = ROOT / ".hermes" / "cron" / "output"
    candidates = []
    if output.is_dir():
        files = sorted((p for p in output.rglob("*") if p.is_file()),
                       key=lambda p: p.stat().st_mtime, reverse=True)[:120]
        for path in files:
            try:
                head = path.read_text(encoding="utf-8", errors="replace")[:600]
            except OSError:
                continue
            haystack = head.lower()
            if "憨包早报" in head or "morning briefing" in haystack or "morning-briefing" in haystack:
                candidates.append(path)
    newest = candidates[0] if candidates else None
    if not newest:
        return {"id": "briefing", "name": "憨包早报", "latin": "MORNING BRIEFING",
                "last_run": None, "result": "unknown", "title": "无记录",
                "excerpt": "[UNAVAILABLE] 未找到 cron 输出记录", "deliveries": [], "available": False}
    mtime = datetime.fromtimestamp(newest.stat().st_mtime, TZ)
    text = read_text(newest, 80_000)
    response = text.split("## Response", 1)[-1] if "## Response" in text else text
    meaningful = [l.strip() for l in response.splitlines() if l.strip() and not l.startswith("```")]
    title = meaningful[0][:100] if meaningful else "早报"
    if "[SILENT]" in response:
        result, title = "silent", "静默（无内容投递）"
    elif "[CRON_FAILURE]" in response:
        result = "failed"
    else:
        result = "success"
    return {"id": "briefing", "name": "憨包早报", "latin": "MORNING BRIEFING",
            "last_run": mtime.isoformat(timespec="seconds"), "result": result,
            "title": redact(title)[:100],
            "excerpt": redact(" ".join(meaningful[:3]))[:280],
            "deliveries": _deliveries(text), "available": True}


def collect() -> dict:
    warnings = []
    items = [_briefing_item()] + [_log_item(meta) for meta in SENTINELS] + [_digest_item()]
    for item in items:
        if not item.get("available"):
            warnings.append(f"{item['name']}：无数据")
    return {"items": items, "_warnings": warnings}
