"""Cron collectors: Hermes cron jobs + system crontab.

Hermes' `cron list` output is human-oriented; this parser understands the
documented block shape (`<id> [status]` heading + `Name:` / `Next run:` lines)
and degrades to UNKNOWN instead of inventing fields.

The dashboard service runs with a minimal systemd PATH, so Hermes is invoked
through an absolute path (the installer puts it in /root/.local/bin).
"""
from __future__ import annotations

import os
import re
import shutil
from datetime import datetime, timedelta
from pathlib import Path

from util import ROOT, now, parse_iso, read_json, redact, run, tail

CRON_OUTPUT = ROOT / ".hermes" / "cron" / "output"
HERMES_CANDIDATES = [
    "/root/.local/bin/hermes",
    "/usr/local/bin/hermes",
    "/root/.hermes/hermes-agent/.hermes/bin/hermes",
]
# Cron store per profile, plus the CLI args kept for the rare fallback path.
# `hermes cron list` boots the whole agent (≈2.5s per profile), while the wall
# only needs scheduler metadata.  Reading jobs.json directly is the same
# authority and turns the 5s collector into a few milliseconds.
HERMES_PROFILES = [
    ("default", ROOT / ".hermes" / "cron" / "jobs.json", []),
    ("hamburger", ROOT / ".hermes" / "profiles" / "hamburger" / "cron" / "jobs.json",
     ["-p", "hamburger"]),
]

# command fragment -> (name, owner, log path for last-run / result evidence)
CRONTAB_MAP = [
    ("error-collector.py", "错误采集", "系统", "/root/hermes-errors/collector.log"),
    ("digest.py", "每日 digest", "憨包", "/root/hermes-digest/digest.log"),
    ("doctrine-trigger.sh", "教义触发", "汉堡", "/root/hermes-doctrine/trigger.log"),
    ("repair-watcher.sh", "修复 watcher", "系统", "/root/hermes-errors/watcher.log"),
    ("go-usage-presence.py", "配额签名", "系统", "/root/hermes-discord-presence/presence.log"),
    ("game-news.py", "游戏快报", "哨兵", "/root/hermes-game-news/game-news.log"),
    ("game-trends.py", "游戏热度", "哨兵", "/root/hermes-game-trends/game-trends.log"),
    ("twitch-drops.py", "Twitch Drops", "哨兵", "/root/hermes-twitch-drops/twitch-drops.log"),
    ("etf-monitor/monitor.py", "ETF 溢价", "哨兵", "/root/hermes-etf-monitor/etf.log"),
    ("etf-monitor/patrol.py", "ETF 盘后巡检", "哨兵", "/root/hermes-etf-monitor/etf.log"),
    ("etf-monitor/calibrate.py", "ETF 参数校准", "哨兵", "/root/hermes-etf-monitor/etf.log"),
]

NAME_OWNERS = {
    "憨包早报": "憨包", "憨包心跳": "憨包", "错误巡视": "憨包", "错误修复": "憨包",
    "板子体检": "憨包", "每日 digest": "憨包",
    "每日教义": "汉堡",
    "ETF参数校准": "哨兵",
}
HERMES_FALLBACK_SCHEDULE = {
    "憨包早报": ("0 8 * * *", "08:00"),
    "憨包心跳": ("0 9-22 * * *", "09–22 整点"),
    "错误巡视": ("30 22 * * *", "22:30"),
    "错误修复": (None, "手动触发"),
    "每日教义": ("0 10 1 1 *", "由教义触发器唤起"),
}


def _hermes_bin() -> str | None:
    for candidate in HERMES_CANDIDATES:
        if os.access(candidate, os.X_OK):
            return candidate
    return shutil.which("hermes")


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
    if not expr:
        return None
    fields = expr.split()
    if len(fields) != 5:
        return None
    minute, hour, dom, month, dow = fields
    cursor = (after or now()).replace(second=0, microsecond=0) + timedelta(minutes=1)
    for _ in range(60 * 24 * 70):
        if not _field_match(minute, cursor.minute) or not _field_match(hour, cursor.hour):
            cursor += timedelta(minutes=1)
            continue
        if not _field_match(month, cursor.month):
            cursor = (cursor.replace(day=1) + timedelta(days=32)).replace(day=1, hour=0, minute=0)
            continue
        dom_ok = _field_match(dom, cursor.day)
        dow_ok = _field_match(dow, cursor.isoweekday() % 7)
        day_ok = (dom_ok or dow_ok) if dom != "*" and dow != "*" else (dom_ok and dow_ok)
        if not day_ok:
            cursor += timedelta(minutes=1)
            continue
        return cursor
    return None


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
    if minute == "0" and "-" in hour and dom == "*" and month == "*" and dow == "*":
        start, _, end = hour.partition("-")
        if start.isdigit() and end.isdigit():
            return f"{int(start):02d}–{int(end):02d} 整点"
    if hour.startswith("*/"):
        return f"每 {hour[2:]} 小时"
    return expr


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
            if "nickname-presence.py" in command:
                name = "昵称签名"
                owner = "系统"
                if "hermes-heybox" in command:
                    name = "昵称签名 · 黑盒语音"
                    log_path = "/root/hermes-heybox/nickname-presence.log"
                elif "hermes-biubiu" in command:
                    name = "昵称签名 · biubiu"
                    log_path = "/root/hermes-biubiu/nickname-presence.log"
            else:
                name = Path(command.split()[-1]).name if command else "系统任务"
        jobs.append({
            "id": f"crontab:{expr}:{name}",
            "name": name,
            "owner": owner,
            "source": "crontab",
            "schedule": expr,
            "schedule_label": _human_schedule(expr),
            "command": command[:160],
            "log_path": log_path,
            "next_run": next_run(expr),
        })
    return jobs, len(entries), None


def _parse_hermes(text: str, profile: str) -> list[dict]:
    jobs: list[dict] = []
    current: dict | None = None
    for raw in text.splitlines():
        line = raw.rstrip()
        heading = re.match(r"^\s*([0-9a-f]{8,})\b\s*(?:\[([^\]]+)\])?", line)
        if heading:
            if current:
                jobs.append(current)
            current = {"id": heading.group(1), "status_text": heading.group(2) or "",
                       "profile": profile, "raw": []}
            continue
        if current is None:
            continue
        current["raw"].append(line.strip())
        match = re.match(r"^\s*(Name|名称)\s*[:：]\s*(.+)$", line, re.I)
        if match:
            current["name"] = match.group(1) and match.group(2).strip()
        match = re.match(r"^\s*(Schedule|计划|Cron)\s*[:：]\s*(.+)$", line, re.I)
        if match:
            current["schedule"] = match.group(2).strip()
        match = re.match(r"^\s*(Next(?:\s*run)?|下次运行)\s*[:：]\s*(.+)$", line, re.I)
        if match:
            current["next_text"] = match.group(2).strip()
        match = re.match(r"^\s*(Last(?:\s*run)?|上次运行)\s*[:：]\s*(\S+)\s*(\S*)", line, re.I)
        if match:
            current["last_text"] = match.group(2).strip()
            current["last_status"] = (match.group(3) or "").strip()
    if current:
        jobs.append(current)
    for job in jobs:
        job.setdefault("name", "[UNKNOWN]")
    return jobs


def _store_jobs(path: Path, profile: str) -> list[dict] | None:
    """Read one profile's `cron/jobs.json` in the shape `_parse_hermes` emits.

    Returns None when the file is missing/unreadable so the caller can fall
    back to the CLI instead of silently reporting zero jobs.
    """
    data = read_json(path)
    rows = data.get("jobs") if isinstance(data, dict) else data
    if not isinstance(rows, list):
        return None
    jobs: list[dict] = []
    for job in rows:
        if not isinstance(job, dict):
            continue
        job_id = str(job.get("id") or "").strip()
        if not job_id:
            continue
        schedule = job.get("schedule") if isinstance(job.get("schedule"), dict) else {}
        # `schedule_display` mirrors what the CLI prints ("weekdays at 18:05").
        # Fall back to the raw expression only for older stores.
        raw_schedule = job.get("schedule_display") or schedule.get("display") or schedule.get("expr")
        next_text = job.get("next_run_at")
        last_text = job.get("last_run_at")
        last_status = job.get("last_status")
        jobs.append({
            "id": job_id,
            "name": str(job.get("name") or "[UNKNOWN]"),
            "status_text": "" if job.get("enabled", True) else "disabled",
            "profile": profile,
            "schedule": str(raw_schedule) if raw_schedule else None,
            "next_text": next_text if isinstance(next_text, str) else None,
            "last_text": last_text if isinstance(last_text, str) else None,
            "last_status": str(last_status) if last_status else "",
        })
    return jobs


def _hermes_jobs() -> tuple[list[dict], str | None]:
    binary = _hermes_bin()
    out_jobs: list[dict] = []
    errors: list[str] = []
    seen: set[str] = set()
    fallback: list[tuple[str, list[str]]] = []

    for profile, path, args in HERMES_PROFILES:
        parsed = _store_jobs(path, profile)
        if parsed is None:
            fallback.append((profile, args))
            continue
        for job in parsed:
            if job["id"] in seen:
                continue
            seen.add(job["id"])
            out_jobs.append(job)

    if fallback and not binary:
        errors.append("未找到 hermes 可执行文件（已查 /root/.local/bin 与 PATH）")
    elif fallback:
        env = dict(os.environ)
        env["PATH"] = f"{Path(binary).parent}:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
        env.setdefault("HOME", str(ROOT))
        for profile, args in fallback:
            rc, out, err = run([binary, *args, "cron", "list"], timeout=40, env=env)
            if rc != 0:
                errors.append(f"{profile}: {redact(err or out or '执行失败')[:120]}")
                continue
            for job in _parse_hermes(out, profile):
                if job["id"] in seen:
                    continue
                seen.add(job["id"])
                out_jobs.append(job)

    return out_jobs, ("；".join(errors) if errors else None)


def _result_from_text(text: str) -> tuple[str, str]:
    lowered = text.lower()
    if "[cron_failure]" in lowered:
        return "failed", "cron 标记失败"
    if "[silent]" in lowered:
        return "silent", "静默完成（无内容投递）"
    if "[collected]" in lowered and "[collected]" in lowered.rsplit("\n", 1)[-1]:
        return "success", redact(text.strip().splitlines()[-1])[:180]
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    last = lines[-1] if lines else ""
    if re.search(r"traceback|unbound variable|error token|http [45]\d\d|\[(?:llm_)?fail(?:ed)?\]|\b(?:fatal|critical)\b|\bfailed\b", last, re.I):
        return "failed", redact(last)[:180] or "执行失败"
    return "success", redact(last)[:180] or "执行完成"


def _output_evidence(job_id: str, last_status: str = "") -> dict:
    folder = CRON_OUTPUT / job_id
    if not folder.is_dir():
        return {}
    files = sorted((p for p in folder.rglob("*") if p.is_file()),
                   key=lambda p: p.stat().st_mtime, reverse=True)
    if not files:
        return {}
    newest = files[0]
    try:
        mtime = datetime.fromtimestamp(newest.stat().st_mtime, now().tzinfo)
    except OSError:
        return {}
    lines = tail(newest, 300)
    text = "\n".join(lines)
    response = text
    if "## Response" in text:
        response = text.split("## Response", 1)[1]
    clean = "\n".join(line for line in response.splitlines()
                      if not line.strip().startswith("**") and line.strip() != "```")
    lowered = clean.lower()
    if "[silent]" in lowered:
        result, summary = "silent", "静默完成（无内容投递）"
    elif "[cron_failure]" in lowered:
        result, summary = "failed", "cron 标记失败"
    else:
        meaningful = [line.strip() for line in clean.splitlines() if line.strip()]
        result = "failed" if last_status and last_status.lower() not in ("ok", "success") else "success"
        summary = redact(meaningful[0])[:180] if meaningful else (
            "执行完成（无输出记录）" if result == "success" else f"执行失败（{last_status}）"
        )
    if not clean.strip() and last_status:
        result = "success" if last_status.lower() == "ok" else "failed"
        summary = "执行完成（无输出记录）" if result == "success" else f"执行失败（{last_status}）"
    return {"last_run": mtime.isoformat(timespec="seconds"), "result": result, "summary": summary}


def _log_evidence(path: str | None) -> dict:
    if not path:
        return {}
    target = Path(path)
    if not target.is_file():
        return {}
    try:
        mtime = datetime.fromtimestamp(target.stat().st_mtime, now().tzinfo)
    except OSError:
        return {}
    text = "\n".join(tail(target, 15))
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

    out: list[dict] = []
    for job in hermes_jobs:
        name = job.get("name", "[UNKNOWN]")
        raw_schedule = job.get("schedule")
        expr = raw_schedule if raw_schedule and re.match(r"^[\d*/,\- ]+$", raw_schedule) else None
        if not expr and name in HERMES_FALLBACK_SCHEDULE:
            expr = HERMES_FALLBACK_SCHEDULE[name][0]
        schedule_label = (_human_schedule(expr) if expr else
                          (raw_schedule or HERMES_FALLBACK_SCHEDULE.get(name, (None, "手动触发"))[1]))
        next_text = job.get("next_text")
        next_dt = parse_iso(next_text) if next_text else (next_run(expr) if expr else None)
        if name == "每日教义":
            # Hermes stores a placeholder schedule; the actual daily trigger is
            # the system crontab entry doctrine-trigger.sh at 10:00.
            schedule_label = "由教义触发器唤起 · 10:00"
            next_dt = next_run("0 10 * * *")
        last_text = job.get("last_text")
        last_dt = parse_iso(last_text) if last_text else None
        evidence = _output_evidence(job["id"], job.get("last_status", ""))
        result = evidence.get("result", "unknown")
        summary = evidence.get("summary", "[UNKNOWN] 无本机 cron 输出记录")
        if not evidence and job.get("last_status", "").lower() == "ok":
            result, summary = "success", "执行完成（无输出记录）"
        if last_dt and not evidence.get("last_run"):
            evidence["last_run"] = last_dt.isoformat(timespec="seconds")
        owner = NAME_OWNERS.get(name) or ("汉堡" if job.get("profile") == "hamburger" else "憨包")
        out.append({
            "id": job["id"],
            "name": name,
            "owner": owner,
            "source": "hermes",
            "schedule": expr,
            "schedule_label": schedule_label,
            "last_run": evidence.get("last_run"),
            "next_run": next_dt.isoformat(timespec="seconds") if next_dt else None,
            "duration_s": None,
            "result": result,
            "summary": summary,
            "enabled": "disabled" not in job.get("status_text", "").lower(),
        })

    for job in crontab_jobs:
        evidence = _log_evidence(job.pop("log_path", None))
        next_dt = job.pop("next_run", None)
        job.update({
            "last_run": evidence.get("last_run"),
            "result": evidence.get("result", "unknown"),
            "summary": evidence.get("summary", "[UNKNOWN] 无日志证据"),
            "next_run": next_dt.isoformat(timespec="seconds") if isinstance(next_dt, datetime) else next_dt,
            "duration_s": None,
        })
        out.append(job)

    # Disambiguate repeated crontab labels (three ETF runs, two nickname jobs).
    counts: dict[str, int] = {}
    for job in out:
        counts[job["name"]] = counts.get(job["name"], 0) + 1
    for job in out:
        if counts.get(job["name"], 0) > 1 and job.get("source") == "crontab":
            job["name"] = f"{job['name']} · {job.get('schedule_label')}"

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
