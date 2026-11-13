"""Error hub collector: groups.json + approvals + recent raw log lines."""
from __future__ import annotations

import re
from datetime import datetime, timedelta
from pathlib import Path

from util import ERRORS_DIR, TZ, now, read_json, redact, tail

APPROVALS = ERRORS_DIR / "approvals"
DAILY = ERRORS_DIR / "daily"
STATUS_ORDER = ["待批", "已批准", "修复中", "已修复", "已消退", "已忽略"]
RE_TS = re.compile(r"^\[?(\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2})")
RE_LEVEL = re.compile(r"\b(CRITICAL|FATAL|ERROR|ERR|WARNING|WARN|INFO|DEBUG)\b", re.I)


def _groups_for(day: str) -> dict | None:
    return read_json(DAILY / f"{day}-groups.json")


def _source_levels(source: dict) -> dict[str, int]:
    levels: dict[str, int] = {}
    groups = source.get("groups") or {}
    if isinstance(groups, dict):
        for value in groups.values():
            level = str((value or {}).get("level", "error")).upper()
            count = int((value or {}).get("count", 0) or 0)
            levels[level] = levels.get(level, 0) + count
    return levels



# 归档里的「状态」常带括号备注（"已修复（2026-11-04，...）"），严格相等匹配会把它们全算成待批
# （2026-11-13 面板显示 14 条待批的真因）。这里按前缀归一：只要以规范状态开头就算该状态。
_STATUS_PREFIXES = (
    ("已修复", "已修复"), ("已结案", "已修复"), ("已关闭", "已忽略"), ("已搁置", "已忽略"),
    ("已忽略", "已忽略"), ("已消退", "已消退"), ("已批准", "已批准"), ("修复中", "修复中"),
    ("待批", "待批"),
)


def _status_key(raw: str) -> str:
    text = (raw or "").strip()
    for prefix, key in _STATUS_PREFIXES:
        if text.startswith(prefix):
            return key
    return "待批"


def _approvals() -> dict:
    items = []
    if not APPROVALS.is_dir():
        return {"items": [], "counts": {k: 0 for k in STATUS_ORDER}, "pending": 0,
                "error": "approvals/ 不存在或不可读"}
    for path in sorted(APPROVALS.glob("*.md")):
        try:
            text = path.read_text(encoding="utf-8", errors="replace")[:12_000]
        except OSError:
            continue
        title = path.stem
        status = "未知"
        raised = None
        severity = "中"
        summary = ""
        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("# ") and title == path.stem:
                title = stripped[2:].strip()
            if stripped.startswith("- 状态:") or stripped.startswith("- 状态："):
                status = stripped.split(":", 1)[-1].split("：", 1)[-1].strip()
            match = re.search(r"提出日期\s*[:：]\s*(\d{4}-\d{2}-\d{2})", stripped)
            if match:
                raised = match.group(1)
            match = re.search(r"(?:严重度|优先级|级别)\s*[:：]\s*(\S+)", stripped)
            if match:
                severity = match.group(1)
        for line in text.splitlines():
            if line.strip().startswith("## 摘要") or line.strip().startswith("摘要:"):
                lines = text.splitlines()
                try:
                    idx = lines.index(line)
                    summary = " ".join(l.strip() for l in lines[idx + 1:idx + 4] if l.strip())
                except ValueError:
                    pass
                break
        days_open = None
        if raised:
            try:
                days_open = (now().date() - datetime.strptime(raised, "%Y-%m-%d").date()).days
            except ValueError:
                pass
        items.append({
            "file": path.name,
            "title": redact(title)[:120],
            "status": status,
            "severity": severity,
            "raised": raised,
            "days_open": days_open,
            "summary": redact(summary)[:240],
        })
    counts = {key: 0 for key in STATUS_ORDER}
    for item in items:
        counts[_status_key(item["status"])] += 1
    pending = counts.get("待批", 0) + counts.get("已批准", 0) + counts.get("修复中", 0)
    return {"items": items, "counts": counts, "pending": pending}


def _recent(limit: int = 60) -> list[dict]:
    day = now().strftime("%Y-%m-%d")
    rows: list[dict] = []
    groups = _groups_for(day)
    source_names = list((groups or {}).get("sources", {}).keys())
    if not source_names and (DAILY / day).is_dir():
        source_names = [p.stem for p in (DAILY / day).glob("*.log")]
    for slug in source_names:
        path = DAILY / day / f"{slug}.log"
        for line in tail(path, 14):
            if not line.strip():
                continue
            text = redact(line.strip())[:400]
            match = RE_TS.match(text)
            timestamp = match.group(1) if match else None
            level_match = RE_LEVEL.search(text)
            rows.append({
                "source": slug,
                "time": timestamp,
                "level": (level_match.group(1).upper() if level_match else "ERROR"),
                "summary": text[:240],
                "raw": text,
            })
    rows.sort(key=lambda r: r.get("time") or "", reverse=True)
    return rows[:limit]


def collect() -> dict:
    warnings: list[str] = []
    today = now().strftime("%Y-%m-%d")
    groups = _groups_for(today)
    sources = []
    total = 0
    failed_sources = []
    if groups:
        for slug, info in (groups.get("sources") or {}).items():
            hits = int((info or {}).get("hits", 0) or 0)
            failed = (info or {}).get("failed")
            levels = _source_levels(info or {})
            total += hits
            sources.append({
                "slug": slug,
                "hits": hits,
                "levels": levels,
                "failed": redact(str(failed))[:160] if failed else None,
            })
            if failed:
                failed_sources.append(slug)
        sources.sort(key=lambda s: (-s["hits"], s["slug"]))
    else:
        warnings.append(f"今日分组文件缺失：{today}-groups.json")

    trend = []
    for offset in range(6, -1, -1):
        day = (now() - timedelta(days=offset)).strftime("%Y-%m-%d")
        data = _groups_for(day)
        count = 0
        if data:
            for info in (data.get("sources") or {}).values():
                count += int((info or {}).get("hits", 0) or 0)
        trend.append({"date": day, "count": count, "available": bool(data)})

    approvals = _approvals()
    if approvals.get("error"):
        warnings.append(approvals["error"])

    recent = _recent()
    if not recent:
        warnings.append("最近错误流为空")

    # restart classification comes from the archive written by error-collector.py
    restarts = {"self_heal": 0, "manual": 0, "crash": 0}
    md = DAILY / f"{today}.md"
    try:
        for line in md.read_text(encoding="utf-8", errors="replace").splitlines():
            if "失败自愈重启" in line:
                restarts["crash" if "窗口外" in line else "self_heal"] += 1
            elif "手动重启" in line:
                restarts["manual"] += 1
    except OSError:
        pass

    return {
        "date": today,
        "sources": sources,
        "total_hits": total,
        "failed_sources": failed_sources,
        "trend": trend,
        "approvals": approvals,
        "recent": recent,
        "restarts": restarts,
        "_warnings": warnings,
    }
