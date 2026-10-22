"""PLAN.md / STATUS.md parser (read-only)."""
from __future__ import annotations

import re
from datetime import datetime

from util import BOARD_DIR, now, read_text, redact

RE_SECTION = re.compile(r"^##\s+(.+)$")
RE_ENTRY = re.compile(r"^###\s+(?:\[(\d{4}-\d{2}-\d{2})\]\s*)?(.+)$")
RE_FIELD = re.compile(r"^[-*]\s*([^:：]+)\s*[:：]\s*(.*)$")
DONE_WORDS = ("完成", "已归档", "结束", "已康复", "已消退")


def _kv(line: str) -> tuple[str, str] | None:
    match = RE_FIELD.match(line.strip())
    if not match:
        return None
    return match.group(1).strip(), match.group(2).strip()


def _parse_plan() -> dict:
    text = read_text(BOARD_DIR / "PLAN.md")
    sections: list[dict] = []
    current_section = None
    current: dict | None = None
    today = now().date()

    def flush() -> None:
        nonlocal current
        if current and current_section is not None:
            current_section["tasks"].append(current)
        current = None

    for raw in text.splitlines():
        line = raw.rstrip()
        section_match = RE_SECTION.match(line)
        if section_match:
            flush()
            current_section = {"name": section_match.group(1).strip(), "tasks": []}
            sections.append(current_section)
            continue
        entry_match = RE_ENTRY.match(line)
        if entry_match:
            flush()
            current = {
                "title": redact(entry_match.group(2).strip())[:160],
                "created": entry_match.group(1),
                "due": None,
                "next": "",
                "reminder": "",
                "status": "进行中",
                "updated": None,
                "overdue": False,
            }
            continue
        if current is None:
            continue
        pair = _kv(line)
        if pair:
            key, value = pair
            if key == "截止":
                current["due"] = value[:20]
            elif key in ("下一步", "下一步计划"):
                current["next"] = redact(value)[:220]
            elif key == "提醒":
                current["reminder"] = redact(value)[:220]
            elif key == "状态":
                current["status"] = value[:20]
            elif key == "更新":
                current["updated"] = value[:20]
    flush()

    overdue = 0
    for section in sections:
        for task in section["tasks"]:
            if task["due"]:
                try:
                    due = datetime.strptime(task["due"], "%Y-%m-%d").date()
                    task["overdue"] = due < today and not any(w in task["status"] for w in DONE_WORDS)
                except ValueError:
                    pass
            if task["overdue"]:
                overdue += 1

    return {
        "title": next((l[2:].strip() for l in text.splitlines() if l.startswith("# ")), "PLAN"),
        "updated": next((t["updated"] for t in (s["tasks"][-1] for s in reversed(sections) if s["tasks"]) if t), None),
        "sections": sections,
        "overdue": overdue,
        "available": bool(text),
    }


def _parse_status() -> dict:
    text = read_text(BOARD_DIR / "STATUS.md")
    sections: list[dict] = []
    current_section = None
    current: dict | None = None

    def flush() -> None:
        nonlocal current
        if current and current_section is not None:
            current_section["items"].append(current)
        current = None

    for raw in text.splitlines():
        line = raw.rstrip()
        section_match = RE_SECTION.match(line)
        if section_match:
            flush()
            current_section = {"name": section_match.group(1).strip(), "items": []}
            sections.append(current_section)
            continue
        entry_match = RE_ENTRY.match(line)
        if entry_match:
            flush()
            current = {
                "title": redact(entry_match.group(2).strip())[:160],
                "created": entry_match.group(1),
                "fields": {},
                "status": "",
            }
            continue
        if current is None:
            continue
        pair = _kv(line)
        if pair:
            key, value = pair
            current["fields"][key] = redact(value)[:220]
            if key == "状态":
                current["status"] = value[:20]
    flush()

    next_transition = None
    transition_at = None
    for section in sections:
        for item in section["items"]:
            at = item["fields"].get("转段")
            if at and "已提" not in item["fields"]:
                try:
                    parsed = datetime.fromisoformat(at.replace(" ", "T"))
                    if parsed.tzinfo is None:
                        parsed = parsed.replace(tzinfo=now().tzinfo)
                    if next_transition is None or parsed < transition_at:
                        transition_at = parsed
                        next_transition = {
                            "title": item["title"],
                            "at": at,
                            "stage": item["fields"].get("阶段", ""),
                            "note": item["fields"].get("护理", ""),
                        }
                except ValueError:
                    pass
    if next_transition:
        delta = (transition_at - now()).total_seconds()
        next_transition["starts_in"] = int(delta)

    return {
        "title": next((l[2:].strip() for l in text.splitlines() if l.startswith("# ")), "STATUS"),
        "sections": sections,
        "next_transition": next_transition,
        "available": bool(text),
    }


def collect() -> dict:
    warnings = []
    plan = _parse_plan()
    status = _parse_status()
    if not plan["available"]:
        warnings.append("PLAN.md 不可读")
    if not status["available"]:
        warnings.append("STATUS.md 不可读")
    return {"plan": plan, "status": status, "_warnings": warnings}
