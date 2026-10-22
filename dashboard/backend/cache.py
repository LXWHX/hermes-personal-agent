"""Tiny TTL cache shared by the read-only collectors.

The dashboard is polled every 30s by every open tab.  Without a cache a single
poll would exec `systemctl` a dozen times and read the same JSON files again.
Each collector gets its own key and TTL; failures are cached too, briefly, so a
dead data source cannot turn into a request storm.
"""
from __future__ import annotations

import threading
import time
from typing import Any, Callable


class TTLCache:
    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._items: dict[str, tuple[float, Any]] = {}

    def get(self, key: str, ttl: float, loader: Callable[[], Any]) -> Any:
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
