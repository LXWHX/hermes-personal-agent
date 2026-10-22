#!/usr/bin/env python3
"""Regenerate frontend/demo-data.js from demo.py (single source of truth)."""
from __future__ import annotations

import json
from pathlib import Path

import demo

target = Path(__file__).resolve().parent.parent / "frontend" / "demo-data.js"
target.write_text(
    "window.HERMES_DEMO = " + json.dumps(demo.snapshot(), ensure_ascii=False, indent=1) + ";\n",
    encoding="utf-8",
)
print(f"wrote {target} ({target.stat().st_size} bytes)")
