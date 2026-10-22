"""Cron collectors: Hermes cron jobs + system crontab.

Hermes' `cron list` output is not a stable machine format, so this parser is
deliberately defensive: it understands the documented block shape
(`<id> [status]` heading + `Name:` / `Schedule:` lines) and degrades to
`[UNKNOWN]` rather than inventing fields.
"""
from __future__ import annotations

import re
from datetime import datetime, timedelta
from pathlib import Path

from util import ROOT, TZ, now, redact, run, tail

CRON_OUTPUT = ROOT / ".hermes" / "cron" / "output"

# command fragment -> (name, owner, log path for last-run / result evidence)
CRONTAB_MAP = [
    ("error-collector.py", "错误采集", "系统", "/root/hermes-errors/collector.log"),
    ("digest.py", "每日 digest", "憨包", "/root/hermes-digest/digest.log"),
    ("doctrine-trigger.sh", "教义触发", "汉堡", "/root/hermes-doctrine/trigger.log"),
    ("repair-watcher.sh", "修复 watcher", "系统", "/root/hermes-errors/watcher.log"),
    ("go-usage-presence.py", "配额签名", "系统", "/root/hermes-discord-presence/presence.log"),
    ("nickname-presence.py", "昵称签名", "系统", None),
    ("game-news.py", "游戏快报", "哨兵", "/root/hermes-game-news/game-news.log"),
    ("game-trends.py", "游戏热度", "哨兵", "/root/hermes-game-trends/game-trends.log"),
    ("twitch-drops.py", "Twitch Drops", "哨兵", "/root/hermes-twitch-drops/twitch-drops.log"),
    ("etf-monitor/monitor.py", "ETF 溢价", "哨兵", "/root/hermes-etf-monitor/etf.log"),
    ("etf-monitor/patrol.py", "ETF 盘后巡检", "哨兵", "/root/hermes-etf-monitor/etf.log"),
    ("etf-monitor/calibrate.py", "ETF 参数校准", "哨兵", "/root/hermes-etf-monitor/etf.log"),
]

HERMES_FALLBACK_SCHEDULE = {
    "憨包早报": ("0 8 * * *", "08:00"),
    "憨包心跳": ("0 9-22 * * *", "09–22 整点"),
    "错误巡视": ("30 22 * * *", "22:30"),
    "错误修复": (None, "手动触发"),
    "每日教义": ("0 10 1 1 *", "由教义触发器唤起"),
}


def _field_match(field: str, value: int) -> bool:
    for part in field.split(","):
        part = part.strip()
        if not part:
            continue
        step = 1
        if "/" in part:
            part, _, step_s = part.partition("/")
            try:
                step = int(step_s)
            except ValueError:
                step = 1
        if part in ("*", "?"):
            low, high = 0, (59 if value <= 59 else 23)
        elif "-" in part:
            a, _, b = part.partition("-")
            try:
                low, high = int(a), int(b)
            except ValueError:
                continue
        else:
            try:
                low = high = int(part)
            except ValueError:
                continue
        if low <= value <= high and (value - low) % step == 0:
            return True
    return False


def next_run(expr: str | None, after: datetime | None = None) -> datetime | None:
    """Next matching minute for a standard 5-field cron expression."""
    if not expr:
        return None
    fields = expr.split()
    if len(fields) != 5:
        return None
    minute, hour, dom, month, dow = fields
    cursor = (after or now()).replace(second=0, microsecond=0) + timedelta(minutes=1)
    for _ in range(60 * 24 * 70):
        if not _field_match(minute, cursor.minute):
            cursor += timedelta(minutes=1)
            continue
        if not _field_match(hour, cursor.hour):
            cursor += timedelta(minutes=1)
            continue
        if not _field_match(month, cursor.month):
            cursor = (cursor.replace(day=1) + timedelta(days=32)).replace(day=1, hour=0, minute=0)
            continue
        dom_ok = _field_match(dom, cursor.day)
        dow_ok = _field_match(dow, cursor.isoweekday() % 7)
        # cron semantics: when both day fields are restricted, either may match
        if dom != "*" and dow != "*":
            day_ok = dom_ok or dow_ok
        else:
            day_ok = dom_ok and dow_ok
        if not day_ok:
            cursor += timedelta(minutes=1)
            continue
        return cursor
    return None


def _crontab() -> tuple[list[dict], int, str | None]:
    rc, out, err = run(["crontab", "-l"], timeout=6)
    if rc != 0:
        return [], 0, redact(err or "crontab 不可读")[:160]
    entries = [line for line in out.splitlines() if line.strip() and not line.lstrip().startswith("#")]
    jobs = []
    for line in entries:
        parts = line.split(None, 5)
        if len(parts) < 6:
            continue
        expr = " ".join(parts[:5])
        command = parts[5]
        name, owner, log_path = "系统任务", "系统", None
        for fragment, label, who, path in CRONTAB_MAP:
            if fragment in command:
                name, owner, log_path = label, who, path
                break
        else:
            name = Path(command.split()[0]).name if command else "系统任务"
        schedule_label = _human_schedule(expr)
        jobs.append({
            "id": f"crontab:{expr}:{name}",
            "name": name,
            "owner": owner,
            "source": "crontab",
            "schedule": expr,
            "schedule_label": schedule_label,
            "command": command[:160],
            "log_path": log_path,
            "next_run": (next_run(expr) or None),
        })
    return jobs, len(entries), None


def _human_schedule(expr: str) -> str:
    parts = expr.split()
    if len(parts) != 5:
        return expr
    minute, hour, dom, month, dow = parts
    if minute.startswith("*/"):
        return f"每 {minute[2:]} 分钟"
    if hour == "*" and dom == "*" and month == "*" and dow == "*":
        return f"每小时 :{int(minute):02d}" if minute.isdigit() else f"每小时 {minute}"
    if hour.isdigit() and dom == "*" and month == "*" and dow == "*":
        return f"{int(hour):02d}:{int(minute):02d}" if minute.isdigit() else f"{hour}:{minute}"
    if hour.startswith("*/"):
        return f"每 {hour[2:]} 小时"
    return expr


def _parse_hermes(text: str) -> list[dict]:
    """Parse `hermes cron list` block output.

    Shape used by current Hermes builds:
        1a2b3c4d [enabled]
          Name: 憨包早报
          Schedule: 0 8 * * *
          Next run: 2026-10-23 08:00
          ...
    Parser tolerates extra fields and localized labels.
    """
    jobs: list[dict] = []
    current: dict | None = None
    for raw in text.splitlines():
        line = raw.rstrip()
        heading = re.match(r"^\s*([0-9a-f]{6,})\b\s*(?:\[([^\]]+)\])?", line)
        if heading:
            if current:
                jobs.append(current)
            current = {"id": heading.group(1), "status_text": heading.group(2) or "", "raw": []}
            continue
        if current is None:
            continue
        current["raw"].append(line.strip())
        match = re.match(r"^\s*(?:Name|名称)\s*[:：]\s*(.+)$", line, re.I)
        if match:
            current["name"] = match.group(1).strip()
        match = re.match(r"^\s*(?:Schedule|计划|Cron)\s*[:：]\s*(.+)$", line, re.I)
        if match:
            current["schedule"] = match.group(1).strip()
        match = re.match(r"^\s*(?:Next(?:\s*run)?|下次运行)\s*[:：]\s*(.+)$", line, re.I)
        if match:
            current["next_text"] = match.group(1).strip()
        match = re.match(r"^\s*(?:Last(?:\s*run)?|上次运行)\s*[:：]\s*(.+)$", line, re.I)
        if match:
            current["last_text"] = match.group(1).strip()
        match = re.match(r"^\s*(?:Profile|配置)\s*[:：]\s*(.+)$", line, re.I)
        if match:
            current["profile"] = match.group(1).strip()
    if current:
        jobs.append(current)
    for job in jobs:
        job.setdefault("name", "[UNKNOWN]")
    return jobs


def _hermes_jobs() -> tuple[list[dict], str | None]:
    rc, out, err = run(["bash", "-lc", "hermes cron list"], timeout=30)
    if rc != 0:
        return [], redact(err or out or "hermes cron list 失败")[:160]
    if not out.strip():
        return [], "hermes cron list 无输出"
    jobs = _parse_hermes(out)
    if not jobs:
        return [], "hermes cron list 输出格式无法解析（已标 UNKNOWN）"
    return jobs, None


def _result_from_text(text: str) -> tuple[str, str]:
    lowered = text.lower()
    if "[silent]" in lowered:
        return "silent", "静默完成（无内容投递）"
    if re.search(r"traceback|error|failed|exception|fatal", lowered):
        line = next((l for l in reversed(text.splitlines()) if l.strip()), "")
        return "failed", redact(line.strip())[:180] or "执行失败"
    line = next((l for l in reversed(text.splitlines()) if l.strip()), "")
    return "success", redact(line.strip())[:180] or "执行完成"


def _output_evidence(job_id: str) -> dict:
    """Look for Hermes' own cron output records: ~/.hermes/cron/output/<id>/."""
    folder = CRON_OUTPUT / job_id
    if not folder.is_dir():
        return {}
    files = sorted(
        (p for p in folder.rglob("*") if p.is_file()),
        key=lambda p: p.stat().st_mtime,
        reverse=True,
    )
    if not files:
        return {}
    newest = files[0]
    try:
        mtime = datetime.fromtimestamp(newest.stat().st_mtime, TZ)
    except OSError:
        return {}
    text = "\n".join(tail(newest, 40))
    result, summary = _result_from_text(text)
    return {"last_run": mtime.isoformat(timespec="seconds"), "result": result, "summary": summary}


def _log_evidence(path: str | None) -> dict:
    if not path:
        return {}
    target = Path(path)
    if not target.is_file():
        return {}
    try:
        mtime = datetime.fromtimestamp(target.stat().st_mtime, TZ)
    except OSError:
        return {}
    text = "\n".join(tail(target, 12))
    result, summary = _result_from_text(text)
    return {"last_run": mtime.isoformat(timespec="seconds"), "result": result, "summary": summary}


def collect() -> dict:
    warnings: list[str] = []
    crontab_jobs, entries, crontab_error = _crontab()
    if crontab_error:
        warnings.append(f"crontab：{crontab_error}")
    if entries and entries < 14:
        warnings.append(f"系统 crontab 仅 {entries} 条（预期 ≥ 14）——疑似被清空")

    hermes_jobs, hermes_error = _hermes_jobs()
    if hermes_error:
        warnings.append(f"Hermes cron：{hermes_error}")

    out = []
    for job in hermes_jobs:
        name = job.get("name", "[UNKNOWN]")
        expr = job.get("schedule")
        if expr and not re.match(r"^[\d*/,\- ]+$", expr):
            expr = None
        if not expr and name in HERMES_FALLBACK_SCHEDULE:
            expr = HERMES_FALLBACK_SCHEDULE[name][0]
        schedule_label = _human_schedule(expr) if expr else HERMES_FALLBACK_SCHEDULE.get(name, (None, "手动触发"))[1]
        evidence = _output_evidence(job["id"])
        result = evidence.get("result", "unknown")
        summary = evidence.get("summary", "[UNKNOWN] 无本机 cron 输出记录")
        owner = "汉堡" if job.get("profile") == "hamburger" else "憨包"
        out.append({
            "id": job["id"],
            "name": name,
            "owner": owner,
            "source": "hermes",
            "schedule": expr,
            "schedule_label": schedule_label,
            "last_run": evidence.get("last_run"),
            "next_run": (next_run(expr) or None) if expr else None,
            "duration_s": None,
            "result": result,
            "summary": summary,
            "enabled": "disabled" not in job.get("status_text", "").lower(),
        })

    for job in crontab_jobs:
        evidence = _log_evidence(job.pop("log_path", None))
        job.update({
            "last_run": evidence.get("last_run"),
            "result": evidence.get("result", "unknown"),
            "summary": evidence.get("summary", "[UNKNOWN] 无日志证据"),
        })
        out.append(job)

    # Sort by next run, unknown last.
    for job in out:
        if isinstance(job.get("next_run"), datetime):
            job["next_run"] = job["next_run"].isoformat(timespec="seconds")
    fallback = (now() + timedelta(days=365)).isoformat(timespec="seconds")
    out.sort(key=lambda j: j.get("next_run") or fallback)
    known = sum(1 for j in out if j["result"] in ("success", "silent", "failed", "skipped"))
    return {
        "jobs": out,
        "crontab_entries": entries,
        "crontab_min": 14,
        "hermes_parse": "degraded" if hermes_error else "ok",
        "known_results": known,
        "_warnings": warnings,
    }
