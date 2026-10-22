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
    '/api/events': 'events',
    '/api/logs/recent': 'logs',
  };

  const state = {
    range: '7d',
    loading: false,
    demo: false,
    mode: null,
    lastUpdate: null,
    nextPollAt: null,
    stamps: {},
    muted: new Set(JSON.parse(localStorage.getItem('hermes-muted-events') || '[]')),
    logRole: 'hanbao',
    logSource: null,
    lastFocus: null,
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const esc = (value) => String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const num = (value) => value === null || value === undefined || Number.isNaN(Number(value))
    ? '—' : Number(value).toLocaleString('en-US');

  const pct = (value) => (value === null || value === undefined) ? '—' : `${Math.round(value)}%`;

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
  }

  /* ------------------------------------------------------------------ roles */
  function renderGlobal(overview, payload) {
    const g = (overview && overview.global) || {};
    const bar = $('#global-bar');
    bar.dataset.state = g.state === 'ok' ? 'ok' : g.state === 'error' ? 'error' : 'degraded';
    $('#global-state').textContent = g.label || '未知';
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
        <p class="system-card__big">${num(global.online_services)}<small> / ${num(global.total_services)}</small></p>
        <p class="system-card__state ${global.state === 'ok' ? '' : 'is-bad'}">${global.state === 'ok' ? 'ALL SERVICES NOMINAL' : 'ATTENTION REQUIRED'}</p>
        <div class="system-card__rows">
          <div class="system-card__row"><span>API 8642</span><span>${api.ok ? 'OK' : api.status || 'DOWN'}</span></div>
          <div class="system-card__row"><span>待批 / 修复</span><span>${esc(openApprovals)}</span></div>
          <div class="system-card__row"><span>失败任务</span><span>${esc(failedJobs)}</span></div>
          <div class="system-card__row"><span>逾期计划</span><span>${esc(global.overdue_tasks ?? '—')}</span></div>
          <div class="system-card__row"><span>Gateway UP</span><span>${duration(gateway.uptime_seconds)}</span></div>
          <div class="system-card__row"><span>Gateway 重启</span><span>${num(gateway.restarts)}</span></div>
        </div>
        <p class="system-card__foot">只读 / 30s 轮询<br>所有时间 Asia/Shanghai</p>
      </article>`;

    grid.innerHTML = cards + systemCard;
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
        return `<i class="${cls}" title="${esc(s.start)} ${s.up ? '在线' : '离线'}"></i>`;
      }).join('');
      return `<tr>
        <td><span class="service-name">${esc(u.label)}</span><span class="service-unit">${esc(u.unit)}</span></td>
        <td><span class="state-tag state-tag--${tagClass}">${esc(active ? 'ACTIVE' : (u.active || 'UNKNOWN'))}</span></td>
        <td class="num">${u.pid ? esc(u.pid) : '—'}</td>
        <td class="num">${u.restarts === null || u.restarts === undefined ? '—' : esc(u.restarts)}</td>
        <td class="num">${esc(u.memory_human || '—')}</td>
        <td class="num">${u.cpu_seconds === null || u.cpu_seconds === undefined ? '—' : `${u.cpu_seconds}s`}</td>
        <td><div class="uptime" aria-label="24 小时在线条带">${segs}</div></td>
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
      return;
    }
    const cells = data.cells;
    const dates = Array.from(new Set(cells.map((c) => c.date))).sort();
    const roles = ROLE_ORDER.filter((r) => cells.some((c) => c.role === r))
      .concat(Array.from(new Set(cells.map((c) => c.role))).filter((r) => !ROLE_ORDER.includes(r)));
    const max = Math.max(1, ...cells.map((c) => c.count));
    const byKey = new Map(cells.map((c) => [`${c.role}|${c.date}|${c.hour}`, c.count]));

    host.innerHTML = roles.map((role) => {
      const roleCells = cells.filter((c) => c.role === role);
      const total = roleCells.reduce((sum, c) => sum + c.count, 0);
      const hours = Array.from({ length: 24 }, (_, h) => {
        const label = [0, 6, 12, 18, 23].includes(h) ? String(h).padStart(2, '0') : '';
        return `<span class="heatmap__hour">${label}</span>`;
      }).join('');
      const rows = dates.map((date) => {
        const row = Array.from({ length: 24 }, (_, hour) => {
          const count = byKey.get(`${role}|${date}|${hour}`) || 0;
          const alpha = count === 0 ? 0.03 : Math.max(0.1, Math.min(1, count / max));
          return `<span class="heatmap__cell" style="--a:${alpha.toFixed(3)}" title="${esc(date)} ${String(hour).padStart(2, '0')}:00 · ${count} 条"></span>`;
        }).join('');
        return `<span class="heatmap__day">${dateLabel(date)}</span>${row}`;
      }).join('');
      return `
        <div class="heatmap">
          <div class="heatmap__head">
            <p class="heatmap__name">${esc((ROLES[role] || { name: role }).name)}<span>${esc((ROLES[role] || { latin: role }).latin)}</span></p>
            <p class="heatmap__total">${num(total)} 条 / ${dates.length} 天</p>
          </div>
          <div class="heatmap__body">
            <span class="heatmap__day"></span>${hours}${rows}
          </div>
        </div>`;
    }).join('');

    $('#activity-total').textContent = num(data.total);
    if (data.peak) {
      $('#activity-peak').textContent = `${String(data.peak.hour).padStart(2, '0')}:00`;
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
    if (!jobs.length) {
      timeline.innerHTML = `<p class="empty">任务数据不可用</p>`;
      $('#jobs-body').innerHTML = `<tr><td colspan="8" class="empty">任务数据不可用</td></tr>`;
      return;
    }
    const hours = Array.from({ length: 24 }, () => []);
    for (const job of jobs) {
      const last = parseDate(job.last_run);
      const next = parseDate(job.next_run);
      if (last) hours[last.getHours()].push({ job, kind: 'last' });
      if (next) hours[next.getHours()].push({ job, kind: 'next' });
    }
    timeline.innerHTML = `
      <div class="jt-grid">
        ${hours.map((items, hour) => `
          <div class="jt-hour">
            <span class="jt-hour__label">${String(hour).padStart(2, '0')}</span>
            ${items.map(({ job, kind }) => {
              const cls = kind === 'next' ? 'jt-marker--next'
                : job.result === 'failed' ? 'jt-marker--fail'
                : job.result === 'silent' ? 'jt-marker--silent' : 'jt-marker--last';
              return `<i class="jt-marker ${cls}" title="${esc(job.name)} · ${kind === 'next' ? '下次' : '上次'} ${hhmm(job.last_run || job.next_run)}"></i>`;
            }).join('')}
          </div>`).join('')}
      </div>
      <div class="jt-legend">
        <span><i class="jt-marker--last"></i>上次运行</span>
        <span><i class="jt-marker--next"></i>下次运行</span>
        <span><i class="jt-marker--silent"></i>静默</span>
        <span><i class="jt-marker--fail"></i>失败</span>
      </div>`;

    $('#jobs-body').innerHTML = jobs.map((job) => `
      <tr>
        <td>${esc(job.name)}</td>
        <td>${esc(job.owner || '—')}</td>
        <td title="${esc(job.schedule || '')}">${esc(job.schedule_label || job.schedule || '—')}</td>
        <td class="num">${job.last_run ? hhmm(job.last_run) : '—'}</td>
        <td class="num">${job.duration_s === null || job.duration_s === undefined ? '—' : `${job.duration_s}s`}</td>
        <td class="num">${job.next_run ? `${dateLabel(job.next_run)} ${hhmm(job.next_run)}` : '—'}</td>
        <td>${resultTag(job.result)}</td>
        <td title="${esc(job.summary || '')}">${esc(job.summary || '—')}</td>
      </tr>`).join('');

    const failed = jobs.filter((j) => j.result === 'failed').length;
    const silent = jobs.filter((j) => j.result === 'silent').length;
    $('#jobs-foot').textContent = `CRONTAB ${data.crontab_entries ?? '—'} 条（下限 ${data.crontab_min ?? '—'}） · HERMES 解析 ${data.hermes_parse || '—'} · 失败 ${failed} · 静默 ${silent} · 共 ${jobs.length} 项`;
  }

  /* ----------------------------------------------------------------- errors */
  function sparkline(values, { width = 300, height = 60, alertLast = false } = {}) {
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
    return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="趋势图">
      <polygon points="${area}" fill="rgba(0,0,0,0.055)"></polygon>
      <polyline points="${line}" fill="none" stroke="#000" stroke-width="1.4" vector-effect="non-scaling-stroke"></polyline>
      <line x1="0" y1="${height - 1}" x2="${width}" y2="${height - 1}" stroke="rgba(0,0,0,.25)" stroke-width="1" vector-effect="non-scaling-stroke"></line>
      <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="2.4" fill="${alertLast ? '#c4001a' : '#000'}"></circle>
    </svg>`;
  }

  function renderErrors(payload) {
    setStamp('errors-stamp', payload);
    const data = payload && payload.data;
    if (!data) {
      $('#error-stream').innerHTML = `<p class="empty">错误数据不可用</p>`;
      return;
    }
    const trend = data.trend || [];
    const today = data.total_hits ?? trend[trend.length - 1]?.count ?? 0;
    const yday = trend[trend.length - 2]?.count ?? 0;
    $('#errors-total').textContent = num(today);
    const delta = today - yday;
    $('#errors-delta').textContent = trend.length > 1
      ? `较昨日 ${delta > 0 ? '+' : ''}${num(delta)}`
      : '无趋势数据';
    $('#error-spark').innerHTML = sparkline(trend.map((d) => d.count || 0), { alertLast: today > Math.max(5, yday * 1.8) });

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
    $('#source-list').innerHTML = sources.length ? sources.map((s) => `
      <div class="source-row">
        <span class="source-row__name" title="${esc(s.slug)}">${esc(s.slug)}</span>
        <span class="source-row__bar"><i class="${s.hits === 0 ? 'is-zero' : s.failed ? 'is-fail' : ''}" style="width:${s.hits === 0 ? 100 : Math.max(3, (s.hits / max) * 100)}%"></i></span>
        <span class="source-row__count">${num(s.hits)}</span>
        ${s.failed ? `<span class="source-row__error">读取失败：${esc(s.failed)}</span>` : ''}
      </div>`).join('') : `<p class="empty">当日 groups.json 无错误源</p>`;

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
          <div class="quota__pct ${low ? 'is-low' : ''}">${num(q.remaining)}<small>%</small></div>
        </div>
        <div class="quota__bar"><i class="${low ? 'is-low' : ''}" style="width:${Math.max(1, q.remaining)}%"></i></div>
        <p class="quota__reset">剩余 · 重置 ${q.resets_at ? esc(String(q.resets_at).slice(0, 10)) : '—'}</p>
      </div>`;
    }).join('') : `<p class="empty">未配置额度 key</p>`;

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
    $('#cost-spark').innerHTML = trend.length ? sparkline(trend.map((d) => d.cost || 0), { width: 240, height: 34 }) : '';
    $('#today-cost').textContent = data.today_cost_usd == null ? '—' : `$${Number(data.today_cost_usd).toFixed(2)}`;
    $('#usage-note').textContent = data.estimate_note || '';
  }

  /* ----------------------------------------------------------------- events */
  function saveMuted() {
    localStorage.setItem('hermes-muted-events', JSON.stringify(Array.from(state.muted)));
  }

  function renderEvents(payload) {
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
        <span class="event__action"><button type="button" class="mute-btn" data-mute="${esc(e.id)}">${muted ? '取消静音' : '静音'}</button></span>
      </div>`;
    }).join('');
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

    if (state.demo) {
      const lines = (window.HERMES_DEMO && window.HERMES_DEMO.logs) || [];
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

    let overview = null;
    if (state.mode === null || state.mode === 'offline') {
      const probe = await fetchJSON('/api/overview');
      if (probe && probe.ok) {
        state.mode = probe.demo ? 'demo' : 'live';
        overview = probe;
        if (probe.demo) activateDemo();
      } else {
        const fallback = demoPayload('overview');
        if (fallback) {
          state.mode = 'demo';
          overview = fallback;
          activateDemo();
        } else {
          state.mode = 'offline';
        }
      }
    }

    const [overviewRes, services, jobs, activity, errors, board, outputs, usage, events] = await Promise.all([
      overview ? Promise.resolve(overview) : load('overview', '/api/overview'),
      load('services', '/api/services'),
      load('jobs', '/api/jobs'),
      load('activity', `/api/activity?range=${state.range}`),
      load('errors', '/api/errors'),
      load('board', '/api/board'),
      load('outputs', '/api/outputs'),
      load('usage', '/api/usage'),
      load('events', '/api/events'),
    ]);

    try { renderRoles(overviewRes && overviewRes.data, services && services.data, overviewRes); } catch (e) { console.error(e); }
    try { renderServices(services); } catch (e) { console.error(e); }
    try { renderJobs(jobs); } catch (e) { console.error(e); }
    try { renderActivity(activity); } catch (e) { console.error(e); }
    try { renderErrors(errors); } catch (e) { console.error(e); }
    try { renderBoard(board); } catch (e) { console.error(e); }
    try { renderOutputs(outputs); } catch (e) { console.error(e); }
    try { renderUsage(usage); } catch (e) { console.error(e); }
    try { renderEvents(events); } catch (e) { console.error(e); }

    state.lastUpdate = Date.now();
    state.nextPollAt = Date.now() + POLL_MS;
    state.loading = false;
    $('#global-updated').textContent = `UPDATED ${hhmmss(new Date())}`;
    updatePollLabel();
  }

  function updatePollLabel() {
    const el = $('#poll-state');
    if (document.hidden) {
      el.textContent = 'PAUSED';
      return;
    }
    if (state.loading) {
      el.textContent = 'SYNC…';
      return;
    }
    if (!state.nextPollAt) {
      el.textContent = 'AUTO 30S';
      return;
    }
    const left = Math.max(0, Math.ceil((state.nextPollAt - Date.now()) / 1000));
    el.textContent = `AUTO 30S · ${left}s`;
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
        if (!state.lastUpdate || Date.now() - state.lastUpdate > POLL_MS) refreshAll();
      }
    });

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id;
        $$('.index__link').forEach((link) => {
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
    bind();
    refreshAll();
    connectLogs('hanbao');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
