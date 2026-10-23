"""Config drift collector — repo checkout vs live deployed copies.

/root/HamburgerBao is the source of truth; deploy scripts copy artifacts into
the Hermes profile homes.  This module only compares digests and mtimes —
file contents never leave the server and absolute paths never reach the API.
"""
from __future__ import annotations

import hashlib
from datetime import datetime
from pathlib import Path

from util import ROOT, TZ, redact, run

REPO = ROOT / "HamburgerBao"

# Deploy semantics per artifact:
#   plain copy   — board-deploy.sh / hamburger-deploy.sh `cp`
#   joined copy  — agent-bridge-deploy.sh writes SOUL.md + "\n\n" + PROFILE_EXTRA.md
#   template     — server/config.yaml is a template synced by hand; drift is by
#                  design (tolerated) and must not raise a red flag
ARTIFACTS = [
    {
        "id": "hanbao-soul",
        "label": "憨包 SOUL",
        "repo_files": ["server/SOUL.md"],
        "live": ROOT / ".hermes" / "SOUL.md",
        "live_label": ".hermes/SOUL.md",
        "deploy": "board-deploy.sh",
    },
    {
        "id": "hamburger-soul",
        "label": "汉堡 SOUL",
        "repo_files": ["server/hamburger/SOUL.md"],
        "live": ROOT / ".hermes" / "profiles" / "hamburger" / "SOUL.md",
        "live_label": "profiles/hamburger/SOUL.md",
        "deploy": "hamburger-deploy.sh",
    },
    {
        "id": "heybox-soul",
        "label": "heybox SOUL",
        "repo_files": ["server/heybox/SOUL.md", "server/heybox/PROFILE_EXTRA.md"],
        "live": ROOT / ".hermes" / "profiles" / "heybox" / "SOUL.md",
        "live_label": "profiles/heybox/SOUL.md",
        "deploy": "agent-bridge-deploy.sh",
    },
    {
        "id": "biubiu-soul",
        "label": "biubiu SOUL",
        "repo_files": ["server/biubiu/SOUL.md", "server/biubiu/PROFILE_EXTRA.md"],
        "live": ROOT / ".hermes" / "profiles" / "biubiu" / "SOUL.md",
        "live_label": "profiles/biubiu/SOUL.md",
        "deploy": "agent-bridge-deploy.sh",
    },
    {
        "id": "config",
        "label": "config.yaml（模板）",
        "repo_files": ["server/config.yaml"],
        "live": ROOT / ".hermes" / "config.yaml",
        "live_label": ".hermes/config.yaml",
        "deploy": "手工同步",
        "tolerated": True,
    },
]
JOIN = b"\n\n"  # agent-bridge-deploy.sh joins SOUL and PROFILE_EXTRA with a blank line


def _read(path: Path) -> bytes | None:
    try:
        return path.read_bytes()
    except OSError:
        return None


def _digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()[:12]


def _mtime(path: Path) -> str | None:
    try:
        return datetime.fromtimestamp(path.stat().st_mtime, TZ).isoformat(timespec="seconds")
    except OSError:
        return None


def _repo_state() -> dict:
    state = {"commit": None, "committed_at": None, "subject": None,
             "dirty_files": 0, "dirty_sample": []}
    rc, out, _ = run(["git", "-C", str(REPO), "log", "-1", "--format=%h%x1f%cI%x1f%s"], timeout=5)
    if rc == 0 and out.strip():
        commit, committed_at, subject = (out.strip().split("\x1f", 2) + ["", ""])[:3]
        state.update(commit=commit or None, committed_at=committed_at or None,
                     subject=redact(subject)[:160] or None)
    rc, out, _ = run(["git", "-C", str(REPO), "status", "--porcelain"], timeout=5)
    if rc == 0:
        lines = [line.strip() for line in out.splitlines() if line.strip()]
        state["dirty_files"] = len(lines)
        state["dirty_sample"] = [redact(line)[:120] for line in lines[:5]]
    return state


def collect() -> dict:
    warnings: list[str] = []
    artifacts = []
    counts = {"same": 0, "drift": 0, "template": 0, "missing": 0}
    for spec in ARTIFACTS:
        parts = [_read(REPO / rel) for rel in spec["repo_files"]]
        live = _read(Path(spec["live"]))
        if any(part is None for part in parts):
            status = "repo_missing"
        elif live is None:
            status = "live_missing"
        elif _digest(JOIN.join(parts)) == _digest(live):
            status = "same"
        else:
            status = "drift"
        if spec.get("tolerated") and status == "drift":
            status = "template"
        counts[status if status in counts else "missing"] += 1
        artifacts.append({
            "id": spec["id"],
            "label": spec["label"],
            "repo_label": " + ".join(spec["repo_files"]),
            "live_label": spec["live_label"],
            "deploy": spec["deploy"],
            "status": status,
            "repo_mtime": max((v for v in (_mtime(REPO / rel) for rel in spec["repo_files"]) if v),
                              default=None),
            "live_mtime": _mtime(Path(spec["live"])),
            "tolerated": bool(spec.get("tolerated")),
        })
    if counts["drift"]:
        warnings.append(f"{counts['drift']} 个线上副本与仓库不一致（需重新部署）")
    if counts["missing"]:
        warnings.append(f"{counts['missing']} 个副本文件缺失")
    return {
        "repo": _repo_state(),
        "artifacts": artifacts,
        "summary": counts,
        "_warnings": warnings,
    }
