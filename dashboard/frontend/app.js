/* HERMES CONTROL ROOM — vanilla single page, no framework, no chart library. */
(() => {
  'use strict';

  const POLL_MS = 30000;
  const ROLES = {
    hanbao: { name: '憨包', latin: 'HANBAO' },
    hamburger: { name: '汉堡', latin: 'HAMBURGER' },
    biubiu: { name: 'biubiu', latin: 'BIUBIU' },
    system: { name: '系统', latin: 'SYSTEM' },
  };
  const ROLE_ORDER = ['hanbao', 'hamburger', 'biubiu'];
  const STATUS_ORDER = ['待批', '已批准', '修复中', '已修复', '已消退'];
  const EVENT_TYPES = {
    service: '服务', cron: '任务', error: '错误', errors: '采集', approval: '审批',
    task: '计划', body: '身体', output: '产出', alert: '告警',
  };
  const DEMO_KEY_MAP = {
    '/api/overview': 'overview',
    '/api/services': 'services',
    '/api/jobs': 'jobs',
    '/api/activity': 'activity',
    '/api/errors': 'errors',
    '/api/board': 'board',
    '/api/outputs': 'outputs',
    '/api/usage': 'usage',
    '/api/drift': 'drift',
    '/api/system': 'system',
    '/api/events': 'events',
    '/api/logs/recent': 'logs',
  };

  const state = {
    range: '7d',
    loading: false,
    demo: false,
    mode: null,
    viewer: 'owner',
    logsStarted: false,
    demoLoading: null,
    lastUpdate: null,
    nextPollAt: null,
    stamps: {},
    muted: new Set(JSON.parse(localStorage.getItem('hermes-muted-events') || '[]')),
    logRole: 'hanbao',
    logSource: null,
    lastFocus: null,
    activitySig: null,
    jobsSig: null,
    sparkSig: null,
    costSig: null,
    statusPayloads: null,
    statusOpen: false,
    statusCloseTimer: 0,
    motionPrimed: false,
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const esc = (value) => String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const num = (value) => value === null || value === undefined || Number.isNaN(Number(value))
    ? '—' : Number(value).toLocaleString('en-US');

  const pct = (value) => (value === null || value === undefined || !Number.isFinite(value)) ? '—' : `${Math.round(value)}%`;

  const humanBytes = (value) => {
    if (value === null || value === undefined || !Number.isFinite(value)) return '—';
    if (value >= 1024 ** 3) return `${(value / 1024 ** 3).toFixed(1)} GB`;
    if (value >= 1024 ** 2) return `${(value / 1024 ** 2).toFixed(0)} MB`;
    return `${(value / 1024).toFixed(0)} KB`;
  };

  /* --------------------------------------------------------- motion layer */
  const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GLYPHS = 'HERMES#/<>*+%';

  const sigOf = (value) => {
    try { return JSON.stringify(value); } catch (_) { return null; }
  };

  function setPollLine(ratio) {
    const el = $('#poll-line-i');
    if (el) el.style.transform = `scaleX(${Math.max(0, Math.min(1, ratio)).toFixed(4)})`;
  }

  function scramble(el) {
    const spans = $$('.wm-l');
    if (!spans.length || el.dataset.scrambling) return;
    el.dataset.scrambling = '1';
    let frame = 0;
    const timer = setInterval(() => {
      frame += 1;
      spans.forEach((span, i) => {
        span.textContent = frame >= 5 + i * 2 ? span.dataset.ch : GLYPHS.charAt((Math.random() * GLYPHS.length) | 0);
      });
      if (frame >= 5 + spans.length * 2) { clearInterval(timer); delete el.dataset.scrambling; }
    }, 40);
  }

  /* ------------------------------------------------- cursor layer (v2) */
  const FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const WIPE_SEL = '.index__link, .toc-rail__link, .range__btn, .log-filter, .text-btn, .mute-btn';

  /* ink block wipes in from the entered edge, retracts toward the exited edge */
  function initWipes() {
    $$(WIPE_SEL).forEach((el) => el.classList.add('wipe'));
    if (!FINE) return;
    const sideOf = (el, x) => {
      const r = el.getBoundingClientRect();
      return x < r.left + r.width / 2 ? 'left' : 'right';
    };
    const crossed = (e) => {
      const el = e.target instanceof Element ? e.target.closest('.wipe') : null;
      if (!el || (e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) return null;
      return el;
    };
    document.addEventListener('pointerover', (e) => {
      const el = crossed(e);
      if (el) el.style.setProperty('--wipe-x', sideOf(el, e.clientX));
    });
    document.addEventListener('pointerout', (e) => {
      const el = crossed(e);
      if (el) el.style.setProperty('--wipe-x', sideOf(el, e.clientX));
    });
  }

  /* crosshair reticle: hairlines lead the pointer, readout trails */
  function initReticle() {
    if (!FINE || !motionOK) return;
    const root = $('.reticle');
    if (!root) return;
    const lineX = root.querySelector('.reticle__x');
    const lineY = root.querySelector('.reticle__y');
    const tag = root.querySelector('.reticle__tag');
    let tx = 0, ty = 0, x = 0, y = 0, lx = 0, ly = 0;
    let raf = 0, seen = false, mode = '';

    const pad = (n) => String(Math.max(0, Math.round(n))).padStart(4, '0');
    const setMode = (next) => {
      if (mode === next) return;
      mode = next;
      if (next) {
        tag.textContent = next;
        tag.classList.remove('is-swap');
        void tag.offsetWidth;
        tag.classList.add('is-swap');
      }
    };

    const frame = () => {
      x += (tx - x) * 0.5;
      y += (ty - y) * 0.5;
      lx += (tx - lx) * 0.16;
      ly += (ty - ly) * 0.16;
      lineX.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      lineY.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
      tag.style.transform = `translate3d(${(lx + 14).toFixed(1)}px, ${(ly + 16).toFixed(1)}px, 0)`;
      if (!mode) tag.textContent = `X ${pad(x)} · Y ${pad(y)}`;
      const settled = Math.abs(tx - lx) < 0.4 && Math.abs(ty - ly) < 0.4;
      raf = settled ? 0 : requestAnimationFrame(frame);
    };
    const wake = () => { if (!raf) raf = requestAnimationFrame(frame); };

    document.addEventListener('pointermove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) { seen = true; x = lx = tx; y = ly = ty; }
      root.classList.add('is-on');
      const el = e.target instanceof Element ? e.target : null;
      if (el && el.closest('.log-console')) setMode('TAIL');
      else if (el && el.closest('a, button, summary, input, select, textarea')) setMode('▸ EXEC');
      else setMode('');
      wake();
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => root.classList.remove('is-on'));
    document.documentElement.classList.add('cursor-on');
  }

  /* heatmap: the hovered hour column lights across all days */
  function initHeatColumns() {
    if (!FINE) return;
    const host = $('#heatmaps');
    if (!host) return;
    let marked = [];
    const clear = () => {
      marked.forEach((el) => el.classList.remove('is-col'));
      marked = [];
    };
    host.addEventListener('pointerover', (e) => {
      const cell = e.target instanceof Element ? e.target.closest('.heatmap__cell') : null;
      if (!cell || cell.dataset.h === undefined) { clear(); return; }
      const map = cell.closest('.heatmap');
      if (!map) { clear(); return; }
      if (marked.length && marked[0].dataset.h === cell.dataset.h
          && marked[0].closest('.heatmap') === map) return;
      clear();
      marked = Array.from(map.querySelectorAll(`[data-h="${cell.dataset.h}"]`));
      marked.forEach((el) => el.classList.add('is-col'));
    });
    host.addEventListener('pointerleave', clear);
  }

  /* uptime wave: the hovered band's segments ride a cosine wave — the
     segment under the pointer lifts highest, neighbours fall off */
  function initUptimeWave() {
    if (!FINE || !motionOK) return;
    const host = $('#services-body');
    if (!host) return;
    const RADIUS = 4.5; /* segments */
    let band = null;
    let raf = 0, px = 0;
    const settle = () => {
      raf = 0;
      if (!band || !band.isConnected) { band = null; return; }
      const rect = band.getBoundingClientRect();
      const t = Math.max(rect.left, Math.min(px, rect.right));
      const pos = ((t - rect.left) / Math.max(1, rect.width)) * band.children.length - 0.5;
      Array.from(band.children).forEach((seg, i) => {
        const d = Math.abs(i - pos);
        const f = d >= RADIUS ? 0 : Math.cos((d / RADIUS) * Math.PI / 2);
        seg.style.transform = f > 0.02 ? `scaleY(${(1 + f * 0.75).toFixed(3)})` : '';
      });
    };
    const calm = () => {
      if (band) Array.from(band.children).forEach((seg) => { seg.style.transform = ''; });
      band = null;
    };
    host.addEventListener('pointermove', (e) => {
      const cell = e.target instanceof Element ? e.target.closest('.uptime-cell') : null;
      const next = cell ? cell.querySelector('.uptime') : null;
      if (next !== band) { calm(); band = next; }
      if (!band) return;
      px = e.clientX;
      if (!raf) raf = requestAnimationFrame(settle);
    });
    host.addEventListener('pointerleave', calm);
  }

  /* heatmap lens: cells bulge in a smooth ridge around the pointer — cell
     centres are cached on map enter, --f set from pixel distance */
  function initHeatLens() {
    if (!FINE || !motionOK) return;
    const host = $('#heatmaps');
    if (!host) return;
    const RADIUS = 56; /* px */
    let map = null, cells = [], lit = [];
    let raf = 0, px = 0, py = 0;
    const settle = () => {
      raf = 0;
      if (!map || !map.isConnected) { rest(); return; }
      const keep = [];
      for (const cell of cells) {
        const dx = cell.cx - px, dy = cell.cy - py;
        const d = Math.sqrt(dx * dx + dy * dy);
        let f = 0;
        if (d < RADIUS) {
          f = 1 - d / RADIUS;
          f = f * f * (3 - 2 * f); /* smoothstep, no pop at the rim */
        }
        if (f > 0.015) {
          cell.el.style.setProperty('--f', f.toFixed(3));
          keep.push(cell);
        } else if (cell.el.style.getPropertyValue('--f')) {
          cell.el.style.removeProperty('--f');
        }
      }
      lit = keep;
    };
    const rest = () => {
      lit.forEach((cell) => cell.el.style.removeProperty('--f'));
      lit = [];
      map = null;
      cells = [];
    };
    host.addEventListener('pointerover', (e) => {
      const body = e.target instanceof Element ? e.target.closest('.heatmap__body') : null;
      const next = body ? body.closest('.heatmap') : null;
      if (next === map) return;
      rest();
      map = next;
      if (!map) return;
      cells = Array.from(map.querySelectorAll('.heatmap__cell')).map((el) => {
        const r = el.getBoundingClientRect();
        return { el, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
      });
    });
    host.addEventListener('pointermove', (e) => {
      if (!map) return;
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(settle);
    });
    host.addEventListener('pointerleave', rest);
    /* any scroll (window or the heatmap's own overflow-x) stalemates the
       cached centres — drop the lens and let the next enter rebuild */
    window.addEventListener('scroll', () => { if (map) rest(); }, { passive: true });
    host.addEventListener('scroll', () => { if (map) rest(); }, { passive: true, capture: true });
  }

  /* job timeline wave: hour columns ride the same ridge in column space —
     --f on the column (markers inherit), nearest column flagged is-peak */
  function initJobWave() {
    if (!FINE || !motionOK) return;
    const host = $('#job-timeline');
    if (!host) return;
    const RADIUS = 2.5; /* hour columns */
    let grid = null, cols = [], peak = null;
    let raf = 0, px = 0;
    const settle = () => {
      raf = 0;
      if (!grid || !grid.isConnected) { rest(); return; }
      const rect = grid.getBoundingClientRect();
      const t = Math.max(rect.left, Math.min(px, rect.right));
      const pos = ((t - rect.left) / Math.max(1, rect.width)) * cols.length - 0.5;
      let best = -1, bestD = 1e9;
      cols.forEach((col, i) => {
        const d = Math.abs(i - pos);
        const f = d >= RADIUS ? 0 : Math.cos((d / RADIUS) * Math.PI / 2);
        col.style.setProperty('--f', f > 0.02 ? f.toFixed(3) : '0');
        if (d < bestD) { bestD = d; best = i; }
      });
      const nextPeak = best >= 0 ? cols[best] : null;
      if (peak !== nextPeak) {
        if (peak) peak.classList.remove('is-peak');
        peak = nextPeak;
        if (peak) peak.classList.add('is-peak');
      }
    };
    const rest = () => {
      cols.forEach((col) => {
        col.style.removeProperty('--f');
        col.classList.remove('is-peak');
      });
      cols = [];
      grid = null;
      peak = null;
    };
    host.addEventListener('pointerover', (e) => {
      const next = e.target instanceof Element ? e.target.closest('.jt-grid:not(.jt-grid--sk)') : null;
      if (next === grid) return;
      rest();
      grid = next;
      if (grid) cols = Array.from(grid.querySelectorAll(':scope > .jt-hour'));
    });
    host.addEventListener('pointermove', (e) => {
      if (!grid) return;
      px = e.clientX;
      if (!raf) raf = requestAnimationFrame(settle);
    });
    host.addEventListener('pointerleave', rest);
  }

  /* floating tip pinned to the cursor for [data-tip] carriers (uptime band,
     heatmap cells, job markers) — replaces the native title popup */
  function initCursorTip() {
    if (!FINE) return;
    const tip = document.createElement('div');
    tip.className = 'cursor-tip';
    tip.hidden = true;
    document.body.appendChild(tip);
    let carrier = null;
    const place = (e) => {
      const r = tip.getBoundingClientRect();
      /* top-right of the cursor — the reticle readout owns the bottom-right */
      let x = e.clientX + 14;
      let y = e.clientY - r.height - 14;
      if (x + r.width > window.innerWidth - 8) x = e.clientX - r.width - 14;
      if (y < 8) y = e.clientY + 20;
      tip.style.transform = `translate(${x}px, ${y}px)`;
    };
    const hide = () => {
      carrier = null;
      tip.hidden = true;
    };
    document.addEventListener('pointerover', (e) => {
      const el = e.target instanceof Element ? e.target.closest('[data-tip]') : null;
      if (!el || el === carrier) return;
      carrier = el;
      tip.textContent = el.dataset.tip;
      tip.hidden = false;
      place(e);
    });
    document.addEventListener('pointermove', (e) => {
      if (!carrier) return;
      if (!carrier.isConnected) { hide(); return; } /* section re-rendered mid-hover */
      place(e);
    });
    document.addEventListener('pointerout', (e) => {
      if (!carrier) return;
      if (e.relatedTarget instanceof Node && carrier.contains(e.relatedTarget)) return;
      hide();
    });
    window.addEventListener('scroll', hide, { passive: true });
  }

  /* bars morph from previous width to new width across polls */
  const barPrev = new Map();
  function morphBars(root) {
    if (!root) return;
    const bars = Array.from(root.querySelectorAll('[data-w]'));
    if (!bars.length) return;
    bars.forEach((el) => { el.style.width = (el.dataset.key && barPrev.get(el.dataset.key)) || '0%'; });
    void root.offsetWidth;
    bars.forEach((el) => {
      el.style.width = el.dataset.w;
      if (el.dataset.key) barPrev.set(el.dataset.key, el.dataset.w);
    });
  }

  /* charts + bars replay their entrance when a section slides back in
     after having left the viewport (blanked off-screen by clear below) */
  function replaySectionMotion(section) {
    if (!section || !motionOK) return;
    const bars = Array.from(section.querySelectorAll('.uptime, .source-row__bar i, .quota__bar i, .meter i'));
    bars.forEach((el, i) => {
      el.classList.remove('is-grow');
      el.style.setProperty('--gi', String(i % 6));
    });
    const sparks = Array.from(section.querySelectorAll('.spark svg'));
    sparks.forEach((svg) => svg.classList.remove('is-draw'));
    const maps = Array.from(section.querySelectorAll('.heatmap'));
    maps.forEach((map) => map.classList.remove('is-enter'));
    const grids = Array.from(section.querySelectorAll('.jt-grid'));
    grids.forEach((grid) => grid.classList.remove('is-enter'));
    if (!bars.length && !sparks.length && !maps.length && !grids.length) return;
    void section.offsetWidth;
    bars.forEach((el) => el.classList.add('is-grow'));
    sparks.forEach((svg) => svg.classList.add('is-draw'));
    maps.forEach((map) => map.classList.add('is-enter'));
    grids.forEach((grid) => grid.classList.add('is-enter'));
  }

  /* blank the section's charts again — rest state while fully off-screen */
  function clearSectionMotion(section) {
    section.classList.add('is-pending');
    section.querySelectorAll('.uptime, .source-row__bar i, .quota__bar i, .meter i')
      .forEach((el) => el.classList.remove('is-grow'));
    section.querySelectorAll('.spark svg').forEach((svg) => svg.classList.remove('is-draw'));
    section.querySelectorAll('.heatmap').forEach((map) => map.classList.remove('is-enter'));
    section.querySelectorAll('.jt-grid').forEach((grid) => grid.classList.remove('is-enter'));
  }

  function initSectionMotion() {
    if (!motionOK || !('IntersectionObserver' in window)) return;
    const shown = new WeakMap();
    /* draw once the section's top edge has risen past the viewport
       midline. Charts sit at the section top, so firing at the old 75%
       line played the sweep while the timeline was still pinned to the
       bottom screen edge — finished by the time it reached a
       comfortable reading position, reading as static. Dipping back
       below the midline does NOT re-arm — only a full viewport exit
       (see clear below) resets the section, so a chart that is still
       on screen never blanks and replays under the cursor */
    const draw = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (shown.get(entry.target) === true) continue;
        shown.set(entry.target, true);
        entry.target.classList.remove('is-pending');
        replaySectionMotion(entry.target);
      }
    }, { threshold: 0, rootMargin: '0px 0px -50% 0px' });
    /* blank + re-arm as soon as the section leaves the viewport entirely,
       so the reset happens off-screen and sliding back just replays */
    const clear = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) continue;
        shown.set(entry.target, false);
        clearSectionMotion(entry.target);
      }
    }, { threshold: 0 });
    $$('main .section').forEach((section) => {
      section.classList.add('is-pending'); /* rest blank until first draw */
      draw.observe(section);
      clear.observe(section);
    });
  }

  /* numbers flash ink when the value changed since last poll */
  const valSeen = new Map();
  function flashVal(el, text, key) {
    if (!el) return;
    const next = String(text);
    const changed = valSeen.has(key) && valSeen.get(key) !== next;
    el.textContent = next;
    valSeen.set(key, next);
    if (changed && motionOK) {
      el.classList.remove('is-flash');
      void el.offsetWidth;
      el.classList.add('is-flash');
      setTimeout(() => el.classList.remove('is-flash'), 620);
    }
  }

  function markFlash(root) {
    if (!root) return;
    root.querySelectorAll('[data-v]').forEach((el) => {
      const key = el.dataset.vk || '';
      const changed = valSeen.has(key) && valSeen.get(key) !== el.dataset.v;
      valSeen.set(key, el.dataset.v);
      if (changed && motionOK) {
        el.classList.add('is-flash');
        setTimeout(() => el.classList.remove('is-flash'), 620);
      }
    });
  }

  function parseDate(value) {
    if (!value) return null;
    if (/^\d{2}:\d{2}(:\d{2})?$/.test(String(value))) {
      const d = new Date();
      const [h, m] = String(value).split(':').map(Number);
      d.setHours(h, m, 0, 0);
      return d;
    }
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  function hhmm(value) {
    const d = parseDate(value);
    if (!d) return '—';
    return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  function hhmmss(value) {
    const d = parseDate(value);
    if (!d) return '—';
    return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  }

  function dateLabel(value) {
    const d = parseDate(value);
    if (!d) return '—';
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  }

  function duration(seconds) {
    if (seconds === null || seconds === undefined || seconds < 0) return '—';
    seconds = Math.floor(seconds);
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (d) return `${d}d ${h}h`;
    if (h) return `${h}h ${m}m`;
    return `${m}m`;
  }

  function relTime(iso) {
    const d = parseDate(iso);
    if (!d) return '—';
    const diff = Math.round((Date.now() - d.getTime()) / 1000);
    if (diff < 5) return '刚刚';
    if (diff < 60) return `${diff}s 前`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m 前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h 前`;
    return `${Math.floor(diff / 86400)}d 前`;
  }

  function resultTag(result) {
    const map = {
      success: ['OK', 'ok'], silent: ['SILENT', 'warn'], failed: ['FAIL', 'bad'],
      skipped: ['SKIP', 'unknown'], unknown: ['UNKNOWN', 'unknown'],
    };
    const [label, cls] = map[result] || ['UNKNOWN', 'unknown'];
    return `<span class="state-tag state-tag--${cls}">${label}</span>`;
  }

  function resultText(result) {
    return { success: '成功', silent: '静默', failed: '失败', skipped: '跳过', unknown: '未知' }[result] || '未知';
  }

  /* ------------------------------------------------------------- fetching */
  async function fetchJSON(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  function demoPayload(key) {
    const snapshot = window.HERMES_DEMO;
    if (!snapshot) return null;
    if (key === 'logs') return { data: { lines: (snapshot.logs || []).map((line) => ({ role: 'system', source: '演示', line })) }, demo: true, warnings: ['演示数据'] };
    const data = snapshot[key];
    return data ? { data, demo: true, warnings: ['演示数据 · 后端未连接'], generated_at: new Date().toISOString() } : null;
  }

  function activateDemo() {
    if (!state.demo) {
      state.demo = true;
      $('#demo-banner').hidden = false;
    }
  }

  const pollMs = () => (state.viewer === 'guest' ? 60000 : POLL_MS);

  // Sections a guest does not get at all (removed, not mosaicked).
  const GUEST_REMOVED = ['errors', 'board', 'outputs', 'events', 'logs'];

  /* Server-side gating is the real boundary; this only mirrors it: removed
     sections and their index links disappear, no image mosaic. */
  function applyGuestView() {
    document.body.classList.add('is-guest');
    $$('.index__link, .toc-rail__link').forEach((link) => {
      const id = String(link.getAttribute('href') || '').replace('#', '');
      if (!GUEST_REMOVED.includes(id)) return;
      link.classList.add('guest-remove');
      link.removeAttribute('href');
    });
    updatePollLabel();
  }

  /* demo-data.js is 100 KB and only needed when the backend is unreachable. */
  function loadDemoData() {
    if (window.HERMES_DEMO) return Promise.resolve(true);
    if (state.demoLoading) return state.demoLoading;
    state.demoLoading = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'demo-data.js';
      script.async = true;
      script.onload = () => resolve(Boolean(window.HERMES_DEMO));
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
    return state.demoLoading;
  }

  async function load(key, url) {
    if (state.mode === 'demo') {
      const payload = await fetchJSON(url);
      if (payload && payload.ok) {
        if (payload.demo) activateDemo();
        return payload;
      }
      return demoPayload(key);
    }
    if (state.mode !== 'live') return null;
    const payload = await fetchJSON(url);
    if (!payload || !payload.ok) return null;
    if (payload.demo) activateDemo();
    return payload;
  }

  /* ---------------------------------------------------------------- stamps */
  function setStamp(id, payload) {
    state.stamps[id] = {
      at: payload && (payload.generated_at || new Date().toISOString()),
      warnings: (payload && payload.warnings) || [],
    };
  }

  function tickStamps() {
    for (const [id, stamp] of Object.entries(state.stamps)) {
      const el = document.getElementById(id);
      if (!el) continue;
      const d = parseDate(stamp.at);
      const age = d ? Math.max(0, Math.round((Date.now() - d.getTime()) / 1000)) : null;
      const warn = stamp.warnings.length ? ` · ! ${stamp.warnings.length}` : '';
      el.textContent = d ? `${hhmmss(d)} · ${age}s${warn}` : '—';
      el.title = stamp.warnings.join('\n');
      el.classList.toggle('is-stale', age !== null && age > 90);
    }
    tickStatusPop();
  }

  /* ------------------------------------------------------------------ roles */
  function renderGlobal(overview, payload) {
    const g = (overview && overview.global) || {};
    const bar = $('#global-bar');
    bar.dataset.state = g.state === 'ok' ? 'ok' : g.state === 'error' ? 'error' : 'degraded';
    $('#global-state').textContent = g.label || (state.viewer === 'guest'
      ? (g.state === 'ok' ? '全部正常' : '部分降级') : '未知');
    $('#global-note').textContent = g.note || '—';
    $('#global-services').textContent = `${num(g.online_services)} / ${num(g.total_services)} 服务`;
    $('#global-api').textContent = g.api_ok === true ? 'API 8642 OK' : g.api_ok === false ? 'API 8642 DOWN' : 'API 8642 —';
    $('#global-updated').textContent = state.lastUpdate ? `UPDATED ${hhmmss(new Date(state.lastUpdate))}` : '—';
    setStamp('roles-stamp', payload);
  }

  function renderRoles(overview, services, payload) {
    renderGlobal(overview, payload);
    const roles = (overview && overview.roles) || [];
    const grid = $('#roles-grid');
    if (!roles.length) {
      grid.innerHTML = `<article class="role skeleton"><p class="micro">角色数据不可用</p></article>`;
      return;
    }
    const serviceByUnit = Object.fromEntries(((services && services.units) || []).map((u) => [u.unit, u]));
    const global = (overview && overview.global) || {};
    const api = (services && services.api) || {};

    const cards = roles.map((role) => {
      const stats = [
        { value: role.messages_today === null || role.messages_today === undefined ? '—' : num(role.messages_today), label: '今日消息' },
        { value: role.last_active ? hhmm(role.last_active) : '—', label: '最后活跃' },
        { value: role.latency_ms === null || role.latency_ms === undefined ? '—' : `${(role.latency_ms / 1000).toFixed(1)}s`, label: 'p50 延迟' },
      ];
      const metrics = (role.metrics || []).map((m) => `
        <div class="role__metric">
          <span class="role__metric-label">${esc(m.label)}</span>
          <span class="role__metric-value">${esc(m.value)}</span>
          <span class="role__metric-note">${esc(m.note || '')}</span>
        </div>`).join('');
      return `
        <article class="role role--${esc(role.id)} state--${esc(role.state)}">
          <div class="role__top">
            <div>
              <p class="role__latin">${esc(role.latin || '')}</p>
              <h3 class="role__name">${esc(role.name)}</h3>
              <p class="role__role">${esc(role.role)}</p>
              <p class="role__platform">${esc(role.platform)}</p>
            </div>
            <span class="role__state"><i class="pulse" aria-hidden="true"></i>${esc(role.state_label || role.state)}</span>
          </div>
          <div class="role__stats">
            ${stats.map((s) => `<div class="role__stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join('')}
          </div>
          <div class="role__metrics">${metrics}</div>
          <p class="role__headline">${esc(role.headline || '')}</p>
          <div class="role__foot">
            <span>${esc(role.model || '—')}</span>
            <span>FAILED ${role.failed_requests === null || role.failed_requests === undefined ? '—' : num(role.failed_requests)}</span>
            <span>UP ${duration(role.uptime_seconds)}</span>
          </div>
        </article>`;
    }).join('');

    const gateway = serviceByUnit['hermes-gateway'] || {};
    const openApprovals = global.open_approvals ?? '—';
    const failedJobs = global.failed_jobs ?? '—';
    const systemCard = `
      <article class="system-card">
        <p class="system-card__title">SYSTEM HEALTH / 系统健康</p>
        <p class="system-card__big" data-vk="sys-services" data-v="${num(global.online_services)}">${num(global.online_services)}<small> / ${num(global.total_services)}</small></p>
        <p class="system-card__state ${global.state === 'ok' ? '' : 'is-bad'}">${global.state === 'ok' ? 'ALL SERVICES NOMINAL' : 'ATTENTION REQUIRED'}</p>
        <div class="system-card__rows">
          <div class="system-card__row"><span>API 8642</span><span>${api.ok ? 'OK' : api.status || 'DOWN'}</span></div>
          <div class="system-card__row"><span>待批 / 修复</span><span>${esc(openApprovals)}</span></div>
          <div class="system-card__row"><span>失败任务</span><span>${esc(failedJobs)}</span></div>
          <div class="system-card__row"><span>逾期计划</span><span>${esc(global.overdue_tasks ?? '—')}</span></div>
          <div class="system-card__row"><span>Gateway UP</span><span>${duration(gateway.uptime_seconds)}</span></div>
          <div class="system-card__row"><span>Gateway 重启</span><span>${num(gateway.restarts)}</span></div>
        </div>
        <p class="system-card__foot">只读 / ${state.viewer === 'guest' ? '60s' : '30s'} 轮询<br>所有时间 Asia/Shanghai</p>
      </article>`;

    grid.innerHTML = cards + systemCard;
    markFlash(grid);
  }

  /* --------------------------------------------------------------- services */
  function renderServices(payload) {
    setStamp('services-stamp', payload);
    const data = payload && payload.data;
    if (!data) {
      $('#services-body').innerHTML = `<tr><td colspan="8" class="empty">服务数据不可用</td></tr>`;
      return;
    }
    const units = data.units || [];
    $('#services-body').innerHTML = units.map((u) => {
      const active = u.active === 'active';
      const unknown = !u.active || u.active === 'unknown';
      const tagClass = unknown ? 'unknown' : active ? 'ok' : 'bad';
      const segs = (u.segments || []).map((s) => {
        const cls = s.up === true ? '' : s.up === false ? 'down' : 'unknown';
        return `<i class="${cls}" data-tip="${esc(s.start)} · ${s.up ? '在线' : '离线'}"></i>`;
      }).join('');
      return `<tr>
        <td><span class="service-name">${esc(u.label)}</span><span class="service-unit">${esc(u.unit)}</span></td>
        <td><span class="state-tag state-tag--${tagClass}">${esc(active ? 'ACTIVE' : (u.active || 'UNKNOWN'))}</span></td>
        <td class="num">${u.pid ? esc(u.pid) : '—'}</td>
        <td class="num">${u.restarts === null || u.restarts === undefined ? '—' : esc(u.restarts)}</td>
        <td class="num">${esc(u.memory_human || '—')}</td>
        <td class="num">${u.cpu_seconds === null || u.cpu_seconds === undefined ? '—' : `${u.cpu_seconds}s`}</td>
        <td class="uptime-cell"><div class="uptime" aria-label="24 小时在线条带">${segs}</div></td>
        <td>${esc(u.last_event || '—')}</td>
      </tr>`;
    }).join('') || `<tr><td colspan="8" class="empty">没有服务记录</td></tr>`;

    const tiers = data.restart_tiers || {};
    const counts = ['self_heal', 'manual', 'crash'].map((k) => `${({ self_heal: '自愈', manual: '手动', crash: '窗口外' })[k]} ${(tiers[k] || []).length}`).join(' / ');
    $('#services-restarts').textContent = `重启分类：${counts}`;
    const api = data.api || {};
    $('#services-api').textContent = `API 127.0.0.1:${api.port || 8642} → ${api.ok ? `OK ${api.status}` : 'DOWN'}${api.path ? ` · ${api.path}` : ''} · ${relTime(api.checked)}`;
    $('#services-legend').textContent = '■ 在线　■ 离线（红）　□ 未知　条带 = 最近 24h，每格 30min';
  }

  /* --------------------------------------------------------------- activity */
  function renderActivity(payload) {
    setStamp('activity-stamp', payload);
    const data = payload && payload.data;
    const host = $('#heatmaps');
    if (!data || !data.cells || !data.cells.length) {
      host.innerHTML = `<p class="empty">活跃度不可用${data && data._warnings ? ' · ' + esc(data._warnings[0]) : ''}</p>`;
      $('#activity-total').textContent = '—';
      $('#activity-peak').textContent = '—';
      state.activitySig = null;
      return;
    }
    const cells = data.cells;
    const dates = Array.from(new Set(cells.map((c) => c.date))).sort();
    const roles = ROLE_ORDER.filter((r) => cells.some((c) => c.role === r))
      .concat(Array.from(new Set(cells.map((c) => c.role))).filter((r) => !ROLE_ORDER.includes(r)));
    const max = Math.max(1, ...cells.map((c) => c.count));
    const byKey = new Map(cells.map((c) => [`${c.role}|${c.date}|${c.hour}`, c.count]));

    const sig = sigOf([state.range, cells]);
    const rebuild = sig !== state.activitySig;
    if (rebuild) state.activitySig = sig;
    if (rebuild) host.innerHTML = roles.map((role) => {
      const roleCells = cells.filter((c) => c.role === role);
      const total = roleCells.reduce((sum, c) => sum + c.count, 0);
      const hours = Array.from({ length: 24 }, (_, h) => {
        const label = [0, 6, 12, 18, 23].includes(h) ? String(h).padStart(2, '0') : '';
        return `<span class="heatmap__hour" data-h="${h}">${label}</span>`;
      }).join('');
      const rows = dates.map((date, di) => {
        const row = Array.from({ length: 24 }, (_, hour) => {
          const count = byKey.get(`${role}|${date}|${hour}`) || 0;
          const alpha = count === 0 ? 0.03 : Math.max(0.1, Math.min(1, count / max));
          return `<span class="heatmap__cell" data-h="${hour}" style="--a:${alpha.toFixed(3)};--d:${di * 6 + hour * 16}ms" data-tip="${esc(date)} ${String(hour).padStart(2, '0')}:00 · ${count} 条"></span>`;
        }).join('');
        return `<span class="heatmap__day">${dateLabel(date)}</span>${row}`;
      }).join('');
      return `
        <div class="heatmap is-enter">
          <div class="heatmap__head">
            <p class="heatmap__name">${esc((ROLES[role] || { name: role }).name)}<span>${esc((ROLES[role] || { latin: role }).latin)}</span></p>
            <p class="heatmap__total">${num(total)} 条 / ${dates.length} 天</p>
          </div>
          <div class="heatmap__body">
            <span class="heatmap__day"></span>${hours}${rows}
          </div>
        </div>`;
    }).join('');

    flashVal($('#activity-total'), num(data.total), 'activity-total');
    if (data.peak) {
      flashVal($('#activity-peak'), `${String(data.peak.hour).padStart(2, '0')}:00`, 'activity-peak');
      $('#activity-peak-note').textContent = `${ROLES[data.peak.role]?.name || data.peak.role} · ${data.peak.date} · ${data.peak.count} 条`;
    } else {
      $('#activity-peak').textContent = '—';
      $('#activity-peak-note').textContent = '无峰值数据';
    }
  }

  /* ------------------------------------------------------------------- jobs */
  function renderJobs(payload) {
    setStamp('jobs-stamp', payload);
    const data = payload && payload.data;
    const jobs = (data && data.jobs) || [];
    const timeline = $('#job-timeline');
    const sig = sigOf(data);
    const rebuild = !(sig && sig === state.jobsSig);
    if (rebuild) state.jobsSig = sig;
    if (!jobs.length) {
      timeline.innerHTML = `<p class="empty">任务数据不可用</p>`;
      timeline.setAttribute('aria-busy', 'false');
      $('#jobs-body').innerHTML = `<tr><td colspan="8" class="empty">任务数据不可用</td></tr>`;
      state.jobsSig = null;
      return;
    }
    timeline.setAttribute('aria-busy', 'false');
    const hours = Array.from({ length: 24 }, () => []);
    for (const job of jobs) {
      const last = parseDate(job.last_run);
      const next = parseDate(job.next_run);
      if (last) hours[last.getHours()].push({ job, kind: 'last' });
      if (next) hours[next.getHours()].push({ job, kind: 'next' });
    }
    if (rebuild) timeline.innerHTML = `
      <div class="jt-grid is-enter">
        ${hours.map((items, hour) => `
          <div class="jt-hour">
            <span class="jt-hour__label">${String(hour).padStart(2, '0')}</span>
            ${items.map(({ job, kind }, idx) => {
              const cls = kind === 'next' ? 'jt-marker--next'
                : job.result === 'failed' ? 'jt-marker--fail'
                : job.result === 'silent' ? 'jt-marker--silent' : 'jt-marker--last';
              const when = kind === 'next'
                ? `下次 ${hhmm(job.next_run)}`
                : `上次 ${hhmm(job.last_run)}${job.result ? ` · ${resultText(job.result)}` : ''}`;
              return `<i class="jt-marker ${cls}" style="--d:${hour * 26 + idx * 40}ms" data-tip="${esc(job.name)} · ${when}"></i>`;
            }).join('')}
          </div>`).join('')}
      </div>
      <div class="jt-legend">
        <span><i class="jt-marker--last"></i>上次运行</span>
        <span><i class="jt-marker--next"></i>下次运行</span>
        <span><i class="jt-marker--silent"></i>静默</span>
        <span><i class="jt-marker--fail"></i>失败</span>
      </div>`;

    if (rebuild) $('#jobs-body').innerHTML = jobs.map((job) => {
      const summary = state.viewer === 'guest'
        ? '<span class="redacted">▓▓▓</span>'
        : esc(job.summary || '—');
      return `
      <tr>
        <td>${esc(job.name)}</td>
        <td>${esc(job.owner || '—')}</td>
        <td title="${esc(job.schedule || '')}">${esc(job.schedule_label || job.schedule || '—')}</td>
        <td class="num">${job.last_run ? hhmm(job.last_run) : '—'}</td>
        <td class="num">${job.duration_s === null || job.duration_s === undefined ? '—' : `${job.duration_s}s`}</td>
        <td class="num">${job.next_run ? `${dateLabel(job.next_run)} ${hhmm(job.next_run)}` : '—'}</td>
        <td>${resultTag(job.result)}</td>
        <td title="${state.viewer === 'guest' ? '' : esc(job.summary || '')}">${summary}</td>
      </tr>`;
    }).join('');

    const failed = jobs.filter((j) => j.result === 'failed').length;
    const silent = jobs.filter((j) => j.result === 'silent').length;
    $('#jobs-foot').textContent = `CRONTAB ${data.crontab_entries ?? '—'} 条（下限 ${data.crontab_min ?? '—'}） · HERMES 解析 ${data.hermes_parse || '—'} · 失败 ${failed} · 静默 ${silent} · 共 ${jobs.length} 项`;
  }

  /* ----------------------------------------------------------------- errors */
  function sparkline(values, { width = 300, height = 60, alertLast = false, animate = false } = {}) {
    if (!values.length) return '';
    const max = Math.max(1, ...values);
    const step = values.length > 1 ? width / (values.length - 1) : width;
    const points = values.map((v, i) => {
      const x = i * step;
      const y = height - 4 - (v / max) * (height - 10);
      return [x, y];
    });
    const line = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
    const area = `0,${height} ${line} ${width},${height}`;
    const last = points[points.length - 1];
    return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="趋势图" class="${animate ? 'is-draw' : ''}">
      <polygon points="${area}" fill="rgba(0,0,0,0.055)"></polygon>
      <polyline points="${line}" fill="none" stroke="#000" stroke-width="1.4" vector-effect="non-scaling-stroke" pathLength="1"></polyline>
      <line x1="0" y1="${height - 1}" x2="${width}" y2="${height - 1}" stroke="rgba(0,0,0,.25)" stroke-width="1" vector-effect="non-scaling-stroke"></line>
      <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="2.4" fill="${alertLast ? '#c4001a' : '#000'}"></circle>
    </svg>`;
  }

  function renderErrors(payload) {
    if (state.viewer === 'guest') return;
    setStamp('errors-stamp', payload);
    const data = payload && payload.data;
    if (!data) {
      $('#error-stream').innerHTML = `<p class="empty">错误数据不可用</p>`;
      return;
    }
    const trend = data.trend || [];
    const today = data.total_hits ?? trend[trend.length - 1]?.count ?? 0;
    const yday = trend[trend.length - 2]?.count ?? 0;
    flashVal($('#errors-total'), num(today), 'errors-total');
    const delta = today - yday;
    $('#errors-delta').textContent = trend.length > 1
      ? `较昨日 ${delta > 0 ? '+' : ''}${num(delta)}`
      : '无趋势数据';
    const trendSig = sigOf(trend.map((d) => d.count || 0));
    $('#error-spark').innerHTML = sparkline(trend.map((d) => d.count || 0), {
      alertLast: today > Math.max(5, yday * 1.8),
      animate: trendSig !== state.sparkSig,
    });
    state.sparkSig = trendSig;

    const approvals = data.approvals || {};
    const counts = approvals.counts || {};
    $('#approval-counts').innerHTML = STATUS_ORDER.map((status) => `
      <div class="approval-cell ${status === '待批' ? 'is-pending' : ''}">
        <strong>${num(counts[status] ?? 0)}</strong>
        <span>${esc(status)}</span>
      </div>`).join('');

    const sources = data.sources || [];
    $('#errors-source-count').textContent = `${sources.length} 源 · ${data.failed_sources?.length || 0} 源读取失败`;
    const max = Math.max(1, ...sources.map((s) => s.hits || 0));
    $('#source-list').innerHTML = sources.length ? sources.map((s) => {
      const bar = s.hits === 0
        ? `<i class="is-zero"></i>`
        : `<i class="${s.failed ? 'is-fail' : ''}" data-w="${Math.max(3, (s.hits / max) * 100).toFixed(2)}%" data-key="src:${esc(s.slug)}"></i>`;
      return `
      <div class="source-row">
        <span class="source-row__name" title="${esc(s.slug)}">${esc(s.slug)}</span>
        <span class="source-row__bar">${bar}</span>
        <span class="source-row__count">${num(s.hits)}</span>
        ${s.failed ? `<span class="source-row__error">读取失败：${esc(s.failed)}</span>` : ''}
      </div>`;
    }).join('') : `<p class="empty">当日 groups.json 无错误源</p>`;
    morphBars($('#source-list'));

    const items = approvals.items || [];
    $('#approvals-body').innerHTML = items.length ? items.map((a) => {
      const cls = a.status === '待批' ? 'bad' : a.status === '已修复' || a.status === '已消退' ? 'ok' : 'warn';
      return `<tr>
        <td>${esc(a.title)}</td>
        <td><span class="state-tag state-tag--${cls}">${esc(a.status)}</span></td>
        <td>${esc(a.severity || '—')}</td>
        <td class="num">${a.days_open === null || a.days_open === undefined ? '—' : `${a.days_open}d`}</td>
        <td>${esc(a.summary || '—')}</td>
      </tr>`;
    }).join('') : `<tr><td colspan="5" class="empty">approvals/ 为空</td></tr>`;

    const recent = data.recent || [];
    $('#error-stream').innerHTML = recent.length ? recent.map((r) => {
      const level = String(r.level || 'ERROR').toUpperCase();
      return `<details class="error-item ${level.includes('ERROR') || level.includes('CRIT') ? 'is-error' : ''}">
        <summary>
          <span class="error-item__time">${esc(r.time ? r.time.slice(11, 19) : '—')}</span>
          <span class="error-item__summary">${esc(r.summary)}</span>
          <span class="error-item__meta"><span>${esc(r.source)}</span><span class="lvl">${esc(level)}</span></span>
        </summary>
        <pre class="error-item__raw">${esc(r.raw || r.summary)}</pre>
      </details>`;
    }).join('') : `<p class="empty">最近错误流为空</p>`;
  }

  /* ------------------------------------------------------------------ board */
  function renderBoard(payload) {
    if (state.viewer === 'guest') return;
    setStamp('board-stamp', payload);
    const data = payload && payload.data;
    if (!data) {
      $('#plan-content').innerHTML = `<p class="empty">计划板不可用</p>`;
      $('#status-content').innerHTML = `<p class="empty">状态板不可用</p>`;
      return;
    }
    const plan = data.plan || {};
    const tasks = (plan.sections || []).flatMap((s) => s.tasks || []);
    const open = tasks.filter((t) => !String(t.status || '').includes('完成'));
    $('#plan-summary').textContent = `${open.length} 项进行 · ${plan.overdue || 0} 项逾期 · 更新 ${plan.updated || '—'}`;
    $('#plan-content').innerHTML = (plan.sections || []).map((section) => `
      <div class="plan-section">
        <p class="plan-section__name">${esc(section.name)} <span class="micro">${(section.tasks || []).length}</span></p>
        ${(section.tasks || []).length ? section.tasks.map((task) => `
          <div class="task ${task.overdue ? 'is-overdue' : ''}">
            <div class="task__main">
              <div class="task__title">${esc(task.title)}</div>
              ${task.next ? `<div class="task__next">${esc(task.next)}</div>` : ''}
            </div>
            <div class="task__due">${esc(task.due || '—')}</div>
            <div class="task__status">${esc(task.status || '—')}</div>
            <div class="task__updated">${esc(task.updated || '')}</div>
          </div>`).join('') : `<p class="empty">（空）</p>`}
      </div>`).join('') || `<p class="empty">PLAN.md 无条目</p>`;

    const status = data.status || {};
    const transition = status.next_transition;
    const transitionBlock = transition ? `
      <div class="transition">
        <p class="micro">NEXT TRANSITION / 下一个转段</p>
        <p class="transition__time">${esc(String(transition.at || '').slice(11, 16) || '—')}</p>
        <p class="transition__title">${esc(transition.title)}</p>
        <p class="transition__note">${esc(transition.note || '')}${transition.starts_in !== undefined ? ` · ${transition.starts_in > 0 ? `还有 ${duration(transition.starts_in)}` : '已到时刻'}` : ''}</p>
      </div>` : '';
    const sections = (status.sections || []).filter((s) => !s.name.includes('心跳注记'));
    $('#status-content').innerHTML = transitionBlock + (sections.map((section) => `
      <div class="plan-section">
        <p class="plan-section__name">${esc(section.name)}</p>
        ${(section.items || []).length ? section.items.map((item) => `
          <div class="status-item">
            <p class="status-item__title">${esc(item.title)} ${item.status ? `<span class="micro">${esc(item.status)}</span>` : ''}</p>
            ${Object.keys(item.fields || {}).length ? `<dl class="status-fields">${Object.entries(item.fields).filter(([k]) => k !== '状态').map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>` : ''}
          </div>`).join('') : `<p class="empty">（空）</p>`}
      </div>`).join('') || `<p class="empty">STATUS.md 无条目</p>`);
  }

  /* ---------------------------------------------------------------- outputs */
  function renderOutputs(payload) {
    if (state.viewer === 'guest') return;
    setStamp('outputs-stamp', payload);
    const data = payload && payload.data;
    const items = (data && data.items) || [];
    if (!items.length) {
      $('#outputs-grid').innerHTML = `<p class="empty">产出数据不可用</p>`;
      return;
    }
    $('#outputs-grid').innerHTML = items.map((item, index) => {
      const cls = item.result === 'failed' ? 'is-failed' : item.result === 'silent' ? 'is-silent' : '';
      const deliveries = (item.deliveries || []).map((d) =>
        `<span class="delivery ${d.ok ? 'is-ok' : 'is-bad'}" title="${esc(d.note || '')}">${esc(d.target)}${d.ok ? '' : ' ×'}</span>`).join('');
      return `
        <article class="output ${cls}">
          <div class="output__top">
            <div>
              <p class="output__name">${esc(item.name)}</p>
              <p class="output__latin">${esc(item.latin || '')}</p>
            </div>
            <span class="output__num">${String(index + 1).padStart(2, '0')}</span>
          </div>
          <p class="output__title">${esc(item.title)}</p>
          <p class="output__excerpt">${esc(item.excerpt || '—')}</p>
          <div class="output__foot">
            <div class="deliveries">${deliveries || '<span class="delivery">NO DELIVERY</span>'}</div>
            <span class="micro">${item.last_run ? `${dateLabel(item.last_run)} ${hhmm(item.last_run)}` : '—'} · ${esc(resultText(item.result))}</span>
          </div>
        </article>`;
    }).join('');
  }

  /* ------------------------------------------------------------------ usage */
  function renderUsage(payload) {
    setStamp('usage-stamp', payload);
    const data = payload && payload.data;
    if (!data) {
      $('#quota-list').innerHTML = `<p class="empty">额度数据不可用</p>`;
      $('#usage-body').innerHTML = `<tr><td colspan="8" class="empty">用量数据不可用</td></tr>`;
      return;
    }
    const quota = data.quota || [];
    $('#quota-list').innerHTML = quota.length ? quota.map((q) => {
      if (!q.available) {
        return `<div class="quota is-unavailable">
          <div class="quota__top"><div><p class="quota__label">${esc(q.label)}</p><p class="quota__windows">UNAVAILABLE</p></div><div class="quota__pct">—</div></div>
          <p class="quota__reset">${esc(q.error || '额度接口不可用')}</p>
        </div>`;
      }
      const low = q.remaining <= 20;
      return `<div class="quota">
        <div class="quota__top">
          <div>
            <p class="quota__label">${esc(q.label)}</p>
            <p class="quota__windows">5H ${pct(q.rolling)} · 周 ${pct(q.weekly)} · 月 ${pct(q.monthly)} 已用</p>
          </div>
          <div class="quota__pct ${low ? 'is-low' : ''}" data-vk="quota:${esc(q.label)}" data-v="${num(q.remaining)}">${num(q.remaining)}<small>%</small></div>
        </div>
        <div class="quota__bar"><i class="${low ? 'is-low' : ''}" data-w="${Math.max(1, q.remaining)}%" data-key="quota:${esc(q.label)}"></i></div>
        <p class="quota__reset">剩余 · 重置 ${q.resets_at ? esc(String(q.resets_at).slice(0, 10)) : '—'}</p>
      </div>`;
    }).join('') : `<p class="empty">未配置额度 key</p>`;
    morphBars($('#quota-list'));
    markFlash($('#quota-list'));

    const profiles = data.profiles || [];
    $('#usage-body').innerHTML = profiles.length ? profiles.map((p) => `
      <tr>
        <td>${esc(p.name)}</td>
        <td class="num">${num(p.requests)}</td>
        <td class="num">${num(p.failures)}</td>
        <td class="num">${num(p.tokens_in)}</td>
        <td class="num">${num(p.tokens_out)}</td>
        <td class="num">${p.p50_ms == null ? '—' : `${(p.p50_ms / 1000).toFixed(1)}s`}</td>
        <td class="num">${p.p95_ms == null ? '—' : `${(p.p95_ms / 1000).toFixed(1)}s`}</td>
        <td class="num">${p.cost_usd == null ? '—' : `$${Number(p.cost_usd).toFixed(2)}`}</td>
      </tr>`).join('') : `<tr><td colspan="8" class="empty">${esc(data.estimate_note || 'token 用量不可用')}</td></tr>`;

    const trend = data.cost_trend || [];
    const costSig = sigOf(trend.map((d) => d.cost || 0));
    $('#cost-spark').innerHTML = trend.length ? sparkline(trend.map((d) => d.cost || 0), { width: 240, height: 34, animate: costSig !== state.costSig }) : '';
    state.costSig = costSig;
    flashVal($('#today-cost'), data.today_cost_usd == null ? '—' : `$${Number(data.today_cost_usd).toFixed(2)}`, 'today-cost');
    $('#usage-note').textContent = data.estimate_note || '';
  }

  /* -------------------------------------------------------- system / drift */
  function driftTag(status) {
    const map = {
      same: ['SAME', 'ok'], drift: ['DRIFT', 'bad'], template: ['TEMPLATE', 'unknown'],
      repo_missing: ['NO REPO', 'bad'], live_missing: ['未部署', 'bad'],
    };
    const [label, cls] = map[status] || ['UNKNOWN', 'unknown'];
    return `<span class="state-tag state-tag--${cls}">${label}</span>`;
  }

  function renderDrift(payload) {
    const data = payload && payload.data;
    if (!data || data.error) {
      $('#repo-card').innerHTML = `<p class="empty">漂移数据不可用</p>`;
      $('#drift-body').innerHTML = `<tr><td colspan="4" class="empty">漂移数据不可用</td></tr>`;
      return;
    }
    const repo = data.repo || {};
    const dirty = repo.dirty_files || 0;
    $('#repo-dirty').textContent = repo.commit ? `${repo.commit} · ${dirty ? `DIRTY ${dirty}` : 'CLEAN'}` : '—';
    $('#repo-card').innerHTML = `
      <p class="repo-card__commit">${esc(repo.commit || '—')}</p>
      <p class="repo-card__subject">${esc(repo.subject || '—')}</p>
      <p class="micro">${repo.committed_at ? `${dateLabel(repo.committed_at)} ${hhmm(repo.committed_at)} · ${relTime(repo.committed_at)}` : '—'}</p>
      ${dirty ? `<p class="repo-card__dirty">工作树 ${num(dirty)} 个未提交改动：${esc((repo.dirty_sample || []).join(' · '))}</p>` : ''}`;
    const s = data.summary || {};
    $('#drift-summary').textContent = `${s.same ?? '—'} 一致 · ${s.drift ?? '—'} 漂移 · ${s.missing ?? '—'} 缺失`;
    const arts = data.artifacts || [];
    $('#drift-body').innerHTML = arts.map((a) => `
      <tr>
        <td><span class="service-name">${esc(a.label)}</span><span class="service-unit">${esc(a.live_label)}</span></td>
        <td>${driftTag(a.status)}</td>
        <td class="micro">${esc(a.deploy)}</td>
        <td class="num" title="仓库 ${esc(a.repo_mtime || '—')}">${a.live_mtime ? `${dateLabel(a.live_mtime)} ${String(a.live_mtime).slice(11, 16)}` : '—'}</td>
      </tr>`).join('') || `<tr><td colspan="4" class="empty">没有漂移条目</td></tr>`;
    $('#drift-foot').textContent = '一致性 = sha256(仓库检出) vs 线上副本；config.yaml 为手工同步模板，差异属预期。';
  }

  function renderSystem(payload) {
    setStamp('system-stamp', payload);
    const data = payload && payload.data;
    const hostEl = $('#host-rows');
    if (!data || data.error) {
      hostEl.innerHTML = `<p class="empty">系统数据不可用</p>`;
      $('#reach-body').innerHTML = `<tr><td colspan="4" class="empty">探测数据不可用</td></tr>`;
      return;
    }
    const mem = data.memory || {};
    const swap = data.swap || {};
    const disk = data.disk || {};
    const load = Array.isArray(data.load) ? data.load : null;
    const meter = (label, value, note, key) => {
      const width = Number.isFinite(value) ? Math.max(1, Math.min(100, value)) : 1;
      return `<div class="host-meter">
        <div class="host-meter__top"><span>${esc(label)}</span><span class="tabular">${pct(value)}</span></div>
        <div class="meter"><i class="${value > 85 ? 'is-high' : ''}" data-w="${width}%" data-key="meter:${key}"></i></div>
        <span class="micro">${esc(note)}</span>
      </div>`;
    };
    hostEl.innerHTML = `
      <div class="host-row">
        <span>负载 / UPTIME</span>
        <strong>${load ? `${load[0].toFixed(2)} ${load[1].toFixed(2)} ${load[2].toFixed(2)}` : '—'}</strong>
        <span class="host-note">${num(data.cores)} 核 · 开机 ${duration(data.uptime_seconds)}</span>
      </div>
      ${meter('内存 / MEMORY', mem.used_pct, `已用 ${humanBytes(mem.total != null && mem.available != null ? mem.total - mem.available : null)} / ${humanBytes(mem.total)} · 可用 ${humanBytes(mem.available)}`, 'mem')}
      ${meter('SWAP', swap.used_pct, `${humanBytes(swap.used)} / ${humanBytes(swap.total)}`, 'swap')}
      ${meter('磁盘 / DISK', disk.percent, `${humanBytes(disk.used)} / ${humanBytes(disk.total)} · 剩余 ${humanBytes(disk.free)}`, 'disk')}
      <div class="host-row">
        <span>内核旋钮 / TUNING</span>
        <strong>swappiness ${data.swappiness ?? '—'} · ARENA ${data.malloc_arena_max ?? '—'}</strong>
        <span class="host-note">2G VPS 内存加固：低 swappiness + MALLOC_ARENA_MAX=2</span>
      </div>`;
    morphBars(hostEl);
    const net = data.network || [];
    $('#reach-body').innerHTML = net.length ? net.map((n) => `
      <tr>
        <td class="service-name">${esc(n.name)}</td>
        <td><span class="state-tag state-tag--${n.ok ? 'ok' : 'bad'}">${n.ok ? 'REACHABLE' : 'DOWN'}</span></td>
        <td class="num">${n.status ?? '—'}</td>
        <td class="num">${n.latency_ms == null ? esc(n.error || '—') : `${num(n.latency_ms)} ms`}</td>
      </tr>`).join('') : `<tr><td colspan="4" class="empty">无探测结果</td></tr>`;
    $('#reach-note').textContent = data.checked ? `T ${relTime(data.checked)}` : '—';
  }

  /* ----------------------------------------------------------------- events */
  function saveMuted() {
    localStorage.setItem('hermes-muted-events', JSON.stringify(Array.from(state.muted)));
  }

  function renderEvents(payload) {
    if (state.viewer === 'guest') return;
    setStamp('events-stamp', payload);
    const data = payload && payload.data;
    const events = (data && data.events) || [];
    if (!events.length) {
      $('#events-list').innerHTML = `<p class="empty">事件数据不可用</p>`;
      return;
    }
    $('#events-list').innerHTML = events.map((e) => {
      const muted = state.muted.has(e.id);
      const cls = [e.severity === 'error' ? 'is-error' : '', muted ? 'is-muted' : ''].join(' ');
      return `<div class="event ${cls}" data-event-id="${esc(e.id)}">
        <span class="event__time">${e.time ? `${dateLabel(e.time)} ${hhmm(e.time)}` : '—'}</span>
        <span class="event__type">${esc(EVENT_TYPES[e.type] || e.type)}</span>
        <div><p class="event__title">${esc(e.title)}</p><p class="event__detail">${esc(e.detail || '')}</p></div>
        <span class="event__action"><button type="button" class="mute-btn wipe" data-mute="${esc(e.id)}">${muted ? '取消静音' : '静音'}</button></span>
      </div>`;
    }).join('');
  }

  /* ----------------------------------------------------------- system status */
  function statusStripStates(units) {
    const max = units.reduce((m, u) => Math.max(m, (u.segments || []).length), 0);
    if (!max) return [];
    const out = [];
    for (let i = 0; i < max; i += 1) {
      let down = false;
      let unknown = false;
      let seen = false;
      for (const unit of units) {
        const segment = (unit.segments || [])[i];
        if (!segment) continue;
        seen = true;
        if (segment.up === false) down = true;
        else if (segment.up !== true) unknown = true;
      }
      out.push(!seen ? 'unknown' : down ? 'down' : unknown ? 'unknown' : 'up');
    }
    return out;
  }

  function statusPct(states) {
    if (!states.length) return null;
    const up = states.filter((s) => s === 'up').length;
    return Math.round((up / states.length) * 1000) / 10;
  }

  function statusModel() {
    const payloads = state.statusPayloads || {};
    const overview = payloads.overview || {};
    const global = overview.global || {};
    const services = payloads.services || {};
    const units = Array.isArray(services.units) ? services.units : [];
    const api = services.api || {};
    const jobs = payloads.jobs || {};
    const jobList = Array.isArray(jobs.jobs) ? jobs.jobs : null;
    const gateway = units.find((u) => u.unit === 'hermes-gateway') || units[0] || {};
    const aggregate = statusStripStates(units);
    const gatewayStates = (gateway.segments || []).map((s) => s.up === true ? 'up' : s.up === false ? 'down' : 'unknown');
    const total = global.total_services ?? units.length;
    const online = global.online_services ?? units.filter((u) => u.active === 'active').length;
    const overall = global.state === 'ok' ? 'ok'
      : global.state === 'error' ? 'error'
      : global.state === 'degraded' ? 'degraded'
      : units.length ? (online === total ? 'ok' : 'degraded') : 'unknown';
    const title = overall === 'ok' ? '系统运行正常'
      : overall === 'error' ? '系统需要处理'
      : overall === 'degraded' ? '部分服务降级'
      : '等待数据';
    const note = global.note || (total ? `${online} / ${total} 服务在线` : '正在读取数据源');
    return {
      overall,
      title,
      note,
      hasData: Boolean(global.state || units.length),
      online,
      total,
      aggregate,
      gateway,
      gatewayStates,
      api,
      failed: global.failed_jobs ?? (jobList ? jobList.filter((j) => j.result === 'failed').length : null),
      approvals: global.open_approvals,
      overdue: global.overdue_tasks,
      updated: state.lastUpdate,
    };
  }

  function statusStrip(states, animate) {
    if (!states.length) return '<p class="sys-pop__row-note">暂无 24H 条带</p>';
    return `<div class="sys-strip${animate ? ' is-animate' : ''}" aria-hidden="true">${
      states.map((s, i) => `<i class="is-${s}" style="--i:${i}"></i>`).join('')
    }</div>`;
  }

  function statusUpdatedText() {
    return state.lastUpdate ? `更新于 ${relTime(new Date(state.lastUpdate))}` : '更新于 —';
  }

  function updateStatusPill() {
    const pill = $('#sys-pill');
    if (!pill) return;
    const model = statusModel();
    const fresh = Boolean(state.lastUpdate && Date.now() - state.lastUpdate < 90000);
    pill.classList.toggle('is-stale', !fresh);
    pill.classList.toggle('is-error', model.overall === 'error');
    pill.classList.toggle('is-warn', model.overall === 'degraded');
    pill.dataset.state = model.overall;
    pill.title = `${model.title} · ${model.note}`;
    const count = $('#sys-pill-count');
    if (count) count.textContent = model.total ? `${model.online}/${model.total}` : '—';
  }

  function renderStatusPop(animate) {
    const body = $('#sys-pop-body');
    const pop = $('#sys-pop');
    if (!body || !pop) return;
    const model = statusModel();
    pop.dataset.state = model.overall;
    $('#sys-pop-title').textContent = model.title;
    $('#sys-pop-note').textContent = model.note;
    $('#sys-pop-updated').textContent = statusUpdatedText();

    if (!model.hasData) {
      body.innerHTML = '<p class="sys-pop__empty micro">等待数据源…</p>';
      return;
    }

    const aggregatePct = statusPct(model.aggregate);
    const gatewayPct = statusPct(model.gatewayStates);
    const gateway = model.gateway;
    const api = model.api;
    const bad = (value) => Number(value) > 0 ? ' is-bad' : '';
    body.innerHTML = `
      <div class="sys-pop__row">
        <div class="sys-pop__row-top">
          <span class="sys-pop__row-name">服务健康 <span>SYSTEMD</span></span>
          <span class="sys-pop__row-value">${aggregatePct == null ? '—' : `${aggregatePct}%`}</span>
        </div>
        <p class="sys-pop__row-note">${num(model.online)} / ${num(model.total)} 在线 · 24H</p>
        ${statusStrip(model.aggregate, animate)}
      </div>
      ${gateway.unit ? `<div class="sys-pop__row">
        <div class="sys-pop__row-top">
          <span class="sys-pop__row-name">GATEWAY <span>${esc(gateway.label || gateway.unit)}</span></span>
          <span class="sys-pop__row-value">${gatewayPct == null ? '—' : `${gatewayPct}%`}</span>
        </div>
        <p class="sys-pop__row-note">${esc(gateway.active || gateway.state || 'UNKNOWN')} · PID ${esc(gateway.pid || '—')} · ${esc(gateway.memory_human || '—')}</p>
        ${statusStrip(model.gatewayStates, animate)}
      </div>` : ''}
      <div class="sys-pop__api">
        <span>API ${esc(api.port || 8642)}</span>
        <span class="${api.ok ? '' : 'is-bad'}">${api.ok ? `OK · ${api.latency_ms == null ? '—' : `${num(api.latency_ms)} ms`}` : `DOWN${api.status ? ` · ${esc(api.status)}` : ''}`}</span>
      </div>
      <div class="sys-pop__stats">
        <div class="sys-pop__stat"><span class="micro">失败任务</span><strong class="${bad(model.failed)}">${num(model.failed)}</strong></div>
        <div class="sys-pop__stat"><span class="micro">待批</span><strong>${num(model.approvals)}</strong></div>
        <div class="sys-pop__stat"><span class="micro">逾期</span><strong class="${bad(model.overdue)}">${num(model.overdue)}</strong></div>
        <div class="sys-pop__stat"><span class="micro">Gateway 重启</span><strong>${num(gateway.restarts)}</strong></div>
      </div>`;
  }

  function openStatusPop() {
    if (state.statusOpen) return;
    const pop = $('#sys-pop');
    const pill = $('#sys-pill');
    if (!pop || !pill) return;
    clearTimeout(state.statusCloseTimer);
    state.statusOpen = true;
    renderStatusPop(true);
    pop.hidden = false;
    pop.classList.remove('is-open');
    void pop.offsetWidth;
    pop.classList.add('is-open');
    pill.setAttribute('aria-expanded', 'true');
  }

  function closeStatusPop() {
    if (!state.statusOpen) return;
    const pop = $('#sys-pop');
    const pill = $('#sys-pill');
    state.statusOpen = false;
    if (pop) {
      pop.classList.remove('is-open');
      clearTimeout(state.statusCloseTimer);
      state.statusCloseTimer = setTimeout(() => {
        if (!state.statusOpen && pop) pop.hidden = true;
      }, 180);
    }
    if (pill) pill.setAttribute('aria-expanded', 'false');
  }

  function tickStatusPop() {
    const updated = $('#sys-pop-updated');
    if (updated) updated.textContent = statusUpdatedText();
    updateStatusPill();
  }

  function placeStatusWrap() {
    const wrap = $('.sys-wrap');
    const rail = $('.toc-rail');
    const foot = $('.footer__col--right');
    if (!wrap || !rail || !foot) return;
    const wide = window.matchMedia('(min-width: 1241px)').matches;
    const host = wide ? rail : foot;
    if (wrap.parentElement !== host) {
      if (wide) rail.appendChild(wrap);
      else foot.insertBefore(wrap, foot.firstChild);
    }
    wrap.classList.toggle('sys-wrap--rail', wide);
  }

  function initStatusPop() {
    const pill = $('#sys-pill');
    const pop = $('#sys-pop');
    const close = $('#sys-pop-close');
    if (!pill || !pop) return;
    placeStatusWrap();
    const mq = window.matchMedia('(min-width: 1241px)');
    const onMq = () => {
      closeStatusPop();
      placeStatusWrap();
    };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
    else if (mq.addListener) mq.addListener(onMq);
    pill.addEventListener('click', () => {
      if (state.statusOpen) closeStatusPop();
      else openStatusPop();
    });
    if (close) close.addEventListener('click', closeStatusPop);
    const link = $('#sys-pop-link');
    if (link) link.addEventListener('click', closeStatusPop);
    document.addEventListener('pointerdown', (e) => {
      if (!state.statusOpen) return;
      if (pop.contains(e.target) || pill.contains(e.target)) return;
      closeStatusPop();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.statusOpen) {
        closeStatusPop();
        pill.focus();
      }
    });
    updateStatusPill();
  }

  /* ------------------------------------------------------------------- logs */
  function appendLog(row) {
    const consoleEl = $('#log-console');
    if (consoleEl.querySelector('.log-empty')) consoleEl.innerHTML = '';
    const raw = String(row.line || '');
    const match = raw.match(/^\[?(\d{2}:\d{2}:\d{2})\]?\s*/);
    const time = row.time || (match ? match[1] : hhmmss(new Date()));
    const text = match ? raw.slice(match[0].length) : raw;
    const error = /\b(error|fatal|critical|failed|traceback)\b/i.test(text) || /错误|失败|异常/.test(text);
    const line = document.createElement('span');
    line.className = `log-line ${error ? 'is-error' : ''}`;
    line.innerHTML = `<span class="log-line__time">${esc(time)}</span> <span class="log-line__src">${esc(row.source || row.role || 'log')}</span> <span class="log-line__text">${esc(text)}</span>`;
    const nearBottom = consoleEl.scrollHeight - consoleEl.scrollTop - consoleEl.clientHeight < 80;
    consoleEl.appendChild(line);
    while (consoleEl.childElementCount > 400) consoleEl.removeChild(consoleEl.firstElementChild);
    if (nearBottom) consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  function connectLogs(role) {
    state.logRole = role;
    if (state.logSource) {
      state.logSource.close();
      state.logSource = null;
    }
    $('#log-console').innerHTML = '<span class="log-empty">连接日志流…</span>';
    const status = $('#log-status');
    status.textContent = '连接中';
    status.classList.remove('is-live');

    if (state.demo && window.HERMES_DEMO) {
      const lines = (window.HERMES_DEMO.logs) || [];
      let i = 0;
      status.textContent = 'DEMO STREAM';
      status.classList.add('is-live');
      const timer = setInterval(() => {
        const line = lines[i % lines.length];
        i += 1;
        appendLog({ source: '演示', line });
      }, 900);
      state.logSource = { close: () => clearInterval(timer) };
      return;
    }

    try {
      const source = new EventSource(`/api/logs/stream?role=${encodeURIComponent(role)}`);
      state.logSource = source;
      source.addEventListener('open', () => {
        status.textContent = 'LIVE';
        status.classList.add('is-live');
      });
      source.addEventListener('log', (event) => {
        try { appendLog(JSON.parse(event.data)); } catch (_) { /* ignore malformed frame */ }
      });
      source.addEventListener('error', () => {
        status.textContent = '重连中 / DISCONNECTED';
        status.classList.remove('is-live');
      });
    } catch (err) {
      status.textContent = '日志流不可用';
    }
  }

  /* ------------------------------------------------------------------ fetch */
  async function refreshAll() {
    if (state.loading) return;
    state.loading = true;
    $('#poll-state').textContent = 'SYNC…';
    setPollLine(0);

    let overview = null;
    if (state.mode === null || state.mode === 'offline') {
      const probe = await fetchJSON('/api/overview');
      if (probe && probe.ok) {
        state.mode = probe.demo ? 'demo' : 'live';
        overview = probe;
        if (probe.demo) activateDemo();
        if (probe.viewer === 'guest') {
          state.viewer = 'guest';
          applyGuestView();
        }
      } else {
        // Only pull the 100 KB demo snapshot when the backend is unreachable.
        const ready = await loadDemoData();
        const fallback = ready ? demoPayload('overview') : null;
        if (fallback) {
          state.mode = 'demo';
          overview = fallback;
          activateDemo();
        } else {
          state.mode = 'offline';
        }
      }
    }

    const guest = state.viewer === 'guest';
    const [overviewRes, services, jobs, activity, errors, board, outputs, usage, drift, system, events] = await Promise.all([
      overview ? Promise.resolve(overview) : load('overview', '/api/overview'),
      load('services', '/api/services'),
      load('jobs', '/api/jobs'),
      load('activity', `/api/activity?range=${state.range}`),
      guest ? null : load('errors', '/api/errors'),
      guest ? null : load('board', '/api/board'),
      guest ? null : load('outputs', '/api/outputs'),
      load('usage', '/api/usage'),
      load('drift', '/api/drift'),
      load('system', '/api/system'),
      guest ? null : load('events', '/api/events'),
    ]);

    try { renderRoles(overviewRes && overviewRes.data, services && services.data, overviewRes); } catch (e) { console.error(e); }
    try { renderServices(services); } catch (e) { console.error(e); }
    try { renderJobs(jobs); } catch (e) { console.error(e); }
    try { renderActivity(activity); } catch (e) { console.error(e); }
    try { renderErrors(errors); } catch (e) { console.error(e); }
    try { renderBoard(board); } catch (e) { console.error(e); }
    try { renderOutputs(outputs); } catch (e) { console.error(e); }
    try { renderUsage(usage); } catch (e) { console.error(e); }
    try { renderDrift(drift); } catch (e) { console.error(e); }
    try { renderSystem(system); } catch (e) { console.error(e); }
    try { renderEvents(events); } catch (e) { console.error(e); }

    // Never open the SSE stream for a guest (the server would 403 anyway).
    if (!state.logsStarted && state.mode && state.viewer !== 'guest') {
      state.logsStarted = true;
      connectLogs(state.logRole);
    }

    state.statusPayloads = {
      overview: overviewRes && overviewRes.data,
      services: services && services.data,
      jobs: jobs && jobs.data,
    };
    state.lastUpdate = Date.now();
    state.nextPollAt = Date.now() + pollMs();
    state.loading = false;
    $('#global-updated').textContent = `UPDATED ${hhmmss(new Date())}`;
    updateStatusPill();
    if (state.statusOpen) renderStatusPop(false);
    updatePollLabel();

    /* first data paint: replay charts already on screen (the observer fired too early) */
    if (motionOK && !state.motionPrimed) {
      state.motionPrimed = true;
      $$('main .section').forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) replaySectionMotion(section);
      });
    }
  }

  function updatePollLabel() {
    const el = $('#poll-state');
    if (document.hidden) {
      el.textContent = 'PAUSED';
      return;
    }
    if (state.loading) {
      el.textContent = 'SYNC…';
      setPollLine(0);
      return;
    }
    if (!state.nextPollAt) {
      el.textContent = state.viewer === 'guest' ? 'AUTO 60S' : 'AUTO 30S';
      return;
    }
    const total = pollMs() / 1000;
    const left = Math.max(0, Math.ceil((state.nextPollAt - Date.now()) / 1000));
    el.textContent = `AUTO ${total}S · ${left}s`;
    setPollLine(1 - left / total);
  }

  /* ------------------------------------------------------------------- init */
  function bind() {
    $('#refresh-btn').addEventListener('click', () => {
      state.mode = null;
      refreshAll();
    });

    $$('.range__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.range === state.range) return;
        state.range = btn.dataset.range;
        $$('.range__btn').forEach((b) => b.classList.toggle('is-active', b === btn));
        load('activity', `/api/activity?range=${state.range}`).then(renderActivity);
      });
    });

    $$('.log-filter').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (state.viewer === 'guest') return;
        $$('.log-filter').forEach((b) => b.classList.toggle('is-active', b === btn));
        connectLogs(btn.dataset.logRole);
      });
    });

    $('#events-list').addEventListener('click', (event) => {
      const button = event.target.closest('[data-mute]');
      if (!button) return;
      const id = button.dataset.mute;
      if (state.muted.has(id)) state.muted.delete(id); else state.muted.add(id);
      saveMuted();
      const row = button.closest('.event');
      const muted = state.muted.has(id);
      row.classList.toggle('is-muted', muted);
      button.textContent = muted ? '取消静音' : '静音';
    });

    document.addEventListener('visibilitychange', () => {
      updatePollLabel();
      if (!document.hidden) {
        if (!state.lastUpdate || Date.now() - state.lastUpdate > pollMs()) refreshAll();
      }
    });

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id;
        $$('.index__link').forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
        $$('.toc-rail__link').forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    }, { rootMargin: '-42% 0px -52% 0px' });
    $$('main .section').forEach((section) => observer.observe(section));

    setInterval(updatePollLabel, 1000);
    setInterval(tickStamps, 1000);
    setInterval(() => {
      if (document.hidden) return;
      if (state.nextPollAt && Date.now() >= state.nextPollAt) refreshAll();
    }, 1000);
    setInterval(() => {
      const now = new Date();
      $('#clock').textContent = now.toLocaleTimeString('zh-CN', { hour12: false });
    }, 1000);
  }

  function init() {
    $('#built-at').textContent = `BUILD ${new Date().toISOString().slice(0, 10)}`;
    $('#clock').textContent = new Date().toLocaleTimeString('zh-CN', { hour12: false });
    document.documentElement.classList.add('js-motion');
    initWipes();
    initReticle();
    initHeatColumns();
    initUptimeWave();
    initHeatLens();
    initJobWave();
    initCursorTip();
    initSectionMotion();
    if (motionOK) {
      const wm = $('.wordmark h1');
      const wmSpans = $$('.wm-l');
      wmSpans.forEach((span) => { span.dataset.ch = span.textContent; });
      if (wm) {
        const REPLAY_MIN_MS = 5000;
        const REPLAY_MAX_MS = 15000;
        let replayTimer = 0;
        let scrambleTimer = 0;

        /* hover replays the glyph decode only */
        const play = (scrambleDelay) => {
          clearTimeout(scrambleTimer);
          scrambleTimer = setTimeout(() => scramble(wm), scrambleDelay);
        };

        /* full entrance = slide-up (wm-rise restart) + decode overlapping it */
        const entrance = () => {
          wmSpans.forEach((span) => { span.style.animation = 'none'; });
          void wm.offsetWidth;
          wmSpans.forEach((span) => { span.style.animation = ''; });
          play(120);
        };

        const schedule = () => {
          clearTimeout(replayTimer);
          const wait = REPLAY_MIN_MS + Math.random() * (REPLAY_MAX_MS - REPLAY_MIN_MS);
          replayTimer = setTimeout(() => {
            if (!document.hidden) entrance();
            schedule();
          }, wait);
        };

        wm.addEventListener('mouseenter', () => { play(0); schedule(); });
        /* on load the CSS wm-rise is already running; just overlap the decode */
        play(120);
        schedule();
      }
      if ('IntersectionObserver' in window) {
        const reveal = new IntersectionObserver((entries, obs) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-in');
            obs.unobserve(entry.target);
          }
        }, { rootMargin: '0px 0px -6% 0px' });
        $$('main .section').forEach((section) => reveal.observe(section));
      }
    }
    setTimeout(() => { $$('main .section').forEach((section) => section.classList.add('is-in')); }, 2200);
    bind();
    initStatusPop();
    refreshAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
