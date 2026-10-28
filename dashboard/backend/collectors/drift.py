"""Config drift collector — repo checkout vs live deployed copies.

/root/HamburgerBao is the source of truth; deploy scripts copy artifacts into
the Hermes profile homes.  This module only compares digests and mtimes —
file contents never leave the server and absolute paths never reach the API.
"""
from __future__ import annotations

import hashlib
import json
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
# Sidecars (heybox / biubiu) are separate from the Hermes profiles: deploy scripts
# copy Python, config, persona and helper scripts into /root/hermes-*.  The profile
# SOUL check above cannot see a missed sidecar deploy (2026-10-27: biubiu.py sat one
# commit behind while the panel was green), so each sidecar is checked as a small
# bundle.  `changed` names the offending files without exposing contents.
# Tuple: (repo-relative path, live path, display name, kind[, ignore keys]).
SIDECAR_ARTIFACTS = [
    {
        "id": "heybox-sidecar-code",
        "label": "heybox sidecar 代码",
        "repo_label": "server/heybox/*.py + server/shared/*",
        "live_label": "hermes-heybox/*.py",
        "deploy": "heybox-deploy.sh",
        "pairs": [
            ("server/heybox/heybox.py", ROOT / "hermes-heybox" / "heybox.py", "heybox.py", "bytes"),
            ("server/shared/watchlist.py", ROOT / "hermes-heybox" / "watchlist.py", "watchlist.py", "bytes"),
            ("server/shared/playstats.py", ROOT / "hermes-heybox" / "playstats.py", "playstats.py", "bytes"),
            ("server/scripts/mem0-retrieval-fix.py", ROOT / "hermes-heybox" / "mem0-retrieval-fix.py",
             "mem0-retrieval-fix.py", "bytes"),
            ("server/agent-bridge/owner_schedule.py", ROOT / "hermes-heybox" / "owner_schedule.py",
             "owner_schedule.py", "bytes"),
            ("server/heybox/scripts/nickname-presence.py",
             ROOT / "hermes-heybox" / "scripts" / "nickname-presence.py", "nickname-presence.py", "bytes"),
            ("server/heybox/scripts/game-night-reminder.py",
             ROOT / "hermes-heybox" / "scripts" / "game-night-reminder.py", "game-night-reminder.py", "bytes"),
        ],
    },
    {
        "id": "heybox-sidecar-config",
        "label": "heybox sidecar 配置/人设",
        "repo_label": "server/heybox/{config,SOUL,PROFILE_EXTRA,service,mem0}",
        "live_label": "hermes-heybox/{config,SOUL,PROFILE_EXTRA,service,mem0}",
        "deploy": "heybox-deploy.sh",
        "pairs": [
            ("server/heybox/heybox-config.json", ROOT / "hermes-heybox" / "heybox-config.json",
             "heybox-config.json", "json", ("allowed_room_ids",)),
            ("server/heybox/SOUL.md", ROOT / "hermes-heybox" / "SOUL.md", "SOUL.md", "bytes"),
            ("server/heybox/PROFILE_EXTRA.md", ROOT / "hermes-heybox" / "PROFILE_EXTRA.md",
             "PROFILE_EXTRA.md", "bytes"),
            ("server/heybox/hermes-heybox.service", ROOT / "hermes-heybox" / "hermes-heybox.service",
             "hermes-heybox.service", "bytes"),
            ("server/heybox/heybox-mem0-template.json", ROOT / "hermes-heybox" / "heybox-mem0-template.json",
             "heybox-mem0-template.json", "bytes"),
        ],
    },
    {
        "id": "biubiu-sidecar-code",
        "label": "biubiu sidecar 代码",
        "repo_label": "server/biubiu/*.py + server/scripts/*",
        "live_label": "hermes-biubiu/*.py",
        "deploy": "biubiu-deploy.sh",
        "pairs": [
            ("server/biubiu/biubiu.py", ROOT / "hermes-biubiu" / "biubiu.py", "biubiu.py", "bytes"),
            ("server/scripts/mem0-retrieval-fix.py", ROOT / "hermes-biubiu" / "mem0-retrieval-fix.py",
             "mem0-retrieval-fix.py", "bytes"),
            ("server/agent-bridge/owner_schedule.py", ROOT / "hermes-biubiu" / "owner_schedule.py",
             "owner_schedule.py", "bytes"),
            ("server/biubiu/scripts/nickname-presence.py",
             ROOT / "hermes-biubiu" / "scripts" / "nickname-presence.py", "nickname-presence.py", "bytes"),
        ],
    },
    {
        "id": "biubiu-sidecar-config",
        "label": "biubiu sidecar 配置/人设",
        "repo_label": "server/biubiu/{config,SOUL,PROFILE_EXTRA,service,mem0}",
        "live_label": "hermes-biubiu/{config,SOUL,PROFILE_EXTRA,service,mem0}",
        "deploy": "biubiu-deploy.sh",
        "pairs": [
            ("server/biubiu/biubiu-config.json", ROOT / "hermes-biubiu" / "biubiu-config.json",
             "biubiu-config.json", "json", ("allowed_room_ids",)),
            ("server/biubiu/SOUL.md", ROOT / "hermes-biubiu" / "SOUL.md", "SOUL.md", "bytes"),
            ("server/biubiu/PROFILE_EXTRA.md", ROOT / "hermes-biubiu" / "PROFILE_EXTRA.md",
             "PROFILE_EXTRA.md", "bytes"),
            ("server/biubiu/hermes-biubiu.service", ROOT / "hermes-biubiu" / "hermes-biubiu.service",
             "hermes-biubiu.service", "bytes"),
            ("server/biubiu/biubiu-mem0-template.json", ROOT / "hermes-biubiu" / "biubiu-mem0-template.json",
             "biubiu-mem0-template.json", "bytes"),
        ],
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


def _canon_json(data: bytes, ignore: tuple[str, ...] = ()) -> bytes | None:
    """Canonical JSON for configs that deploy scripts rewrite with room ids/formatting."""
    try:
        obj = json.loads(data.decode("utf-8"))
    except (ValueError, UnicodeDecodeError):
        return None
    if isinstance(obj, dict):
        for key in ignore:
            obj.pop(key, None)
    return json.dumps(obj, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")


def _max_mtime(paths) -> str | None:
    values = [v for v in (_mtime(Path(p)) for p in paths) if v]
    return max(values) if values else None


def _bundle_artifact(spec: dict) -> dict:
    """Compare a group of repo files against their deployed copies."""
    changed: list[str] = []
    repo_missing = live_missing = False
    for pair in spec["pairs"]:
        repo_rel, live_path, name, kind = pair[:4]
        ignore = pair[4] if len(pair) > 4 else ()
        repo_path = REPO / repo_rel
        live_path = Path(live_path)
        repo_bytes = _read(repo_path)
        live_bytes = _read(live_path)
        if repo_bytes is None:
            repo_missing = True
            changed.append(name)
            continue
        if live_bytes is None:
            live_missing = True
            changed.append(name)
            continue
        if kind == "json":
            repo_cmp = _canon_json(repo_bytes, ignore)
            live_cmp = _canon_json(live_bytes, ignore)
            same = (repo_bytes == live_bytes) if (repo_cmp is None or live_cmp is None) \
                else (repo_cmp == live_cmp)
        else:
            same = repo_bytes == live_bytes
        if not same:
            changed.append(name)

    if repo_missing:
        status = "repo_missing"
    elif live_missing:
        status = "live_missing"
    elif changed:
        status = "drift"
    else:
        status = "same"
    if spec.get("tolerated") and status == "drift":
        status = "template"
    return {
        "id": spec["id"],
        "label": spec["label"],
        "repo_label": spec["repo_label"],
        "live_label": spec["live_label"],
        "deploy": spec["deploy"],
        "status": status,
        "repo_mtime": _max_mtime(REPO / p[0] for p in spec["pairs"]),
        "live_mtime": _max_mtime(p[1] for p in spec["pairs"]),
        "tolerated": bool(spec.get("tolerated")),
        "changed": changed,
    }


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


def _plain_artifact(spec: dict) -> dict:
    """Single live copy built from one or more repo files (SOUL / joined SOUL)."""
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
    return {
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
        "changed": [],
    }


def collect() -> dict:
    warnings: list[str] = []
    artifacts = [_plain_artifact(spec) for spec in ARTIFACTS]
    artifacts.extend(_bundle_artifact(spec) for spec in SIDECAR_ARTIFACTS)
    counts = {"same": 0, "drift": 0, "template": 0, "missing": 0}
    for art in artifacts:
        status = art["status"]
        counts[status if status in counts else "missing"] += 1
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
