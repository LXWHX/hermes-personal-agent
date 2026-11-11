"""Tiny TTL cache shared by the read-only collectors.

The dashboard is polled every 30s by every open tab.  Without a cache a single
poll would exec `systemctl` a dozen times and read the same JSON files again.
Per-key locks also coalesce the first-load stampede (overview + section routes
asking for the same collector at the same time).
"""
from __future__ import annotations

import threading
import time
from typing import Any, Callable


class TTLCache:
    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._items: dict[str, tuple[float, Any]] = {}
        self._key_locks: dict[str, threading.Lock] = {}
        self._refreshing: set[str] = set()

    def _refresh(self, key: str, loader: Callable[[], Any]) -> None:
        """Recompute in the background, coalescing concurrent refreshes."""
        with self._lock:
            if key in self._refreshing:
                return
            self._refreshing.add(key)

        def run() -> None:
            try:
                value = loader()
            except Exception:
                # Keep the last good value: a stale dashboard beats a blank one.
                try:
                    import log as dlog
                    dlog.exception(f"cache refresh failed: {key}")
                except Exception:
                    pass
                return
            else:
                with self._lock:
                    self._items[key] = (time.monotonic(), value)
            finally:
                with self._lock:
                    self._refreshing.discard(key)

        threading.Thread(target=run, name=f"cache-refresh:{key}", daemon=True).start()

    def get(self, key: str, ttl: float, loader: Callable[[], Any],
            stale: float = 0) -> Any:
        """Return a cached value, optionally serving stale data while refreshing.

        `stale` is the extra grace window after `ttl`: within it the caller gets
        the previous value immediately and a background thread recomputes it.
        The slow /halo aggregate can then answer in ~0.1s instead of blocking
        the browser for the full collector latency.
        """
        now = time.monotonic()
        with self._lock:
            hit = self._items.get(key)
            key_lock = self._key_locks.setdefault(key, threading.Lock())
        if hit:
            age = now - hit[0]
            if age < ttl:
                return hit[1]
            if stale and age < ttl + stale:
                self._refresh(key, loader)
                return hit[1]
        with key_lock:
            # Another request may have filled it while we waited.
            now = time.monotonic()
            with self._lock:
                hit = self._items.get(key)
            if hit and now - hit[0] < ttl:
                return hit[1]
            value = loader()
            with self._lock:
                self._items[key] = (time.monotonic(), value)
            return value

    def clear(self, prefix: str | None = None) -> None:
        with self._lock:
            if prefix is None:
                self._items.clear()
            else:
                for key in [k for k in self._items if k.startswith(prefix)]:
                    self._items.pop(key, None)


CACHE = TTLCache()
