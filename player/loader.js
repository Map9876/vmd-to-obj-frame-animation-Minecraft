// Verbatim port of shulkr.com's brand-cube loading animation (progress variant).
// Source: shulkr.com /assets/index-*.js  (logo from brand-CB6zNvIp.js + canvas loader
// in the main bundle). The 16x16 logo is rebuilt from shulkr's real path data,
// then each cell sweeps in along the r+c diagonal as progress goes 0..100,
// with per-cell scale + alpha + a leading-edge glow (the light/dark variation).
const COLORS = { light: '#b97fd2', mid: '#9a5cb4', dark: '#7e4498', deep: '#5f3175' };
const PATHS = {
  light: 'M1 1h6v1h-6zM1 2h5v1h-5zM1 3h4v1h-4zM1 4h3v1h-3zM1 5h2v1h-2zM1 6h1v1h-1z',
  mid:   'M7 1h7v1h-7zM6 2h7v1h-7zM5 3h7v1h-7zM4 4h7v1h-7zM3 5h7v1h-7zM2 6h7v1h-7zM1 7h7v1h-7zM1 8h6v1h-6zM1 9h5v1h-5zM1 10h4v1h-4zM1 11h3v1h-3zM1 12h2v1h-2zM1 13h1v1h-1z',
  dark:  'M14 1h1v1h-1zM13 2h2v1h-2zM12 3h3v1h-3zM11 4h4v1h-4zM10 5h5v1h-5zM9 6h6v1h-6zM8 7h7v1h-7zM7 8h7v1h-7zM6 9h7v1h-7zM5 10h7v1h-7zM4 11h7v1h-7zM3 12h7v1h-7zM2 13h7v1h-7zM1 14h7v1h-7z',
  deep:  'M14 8h1v1h-1zM13 9h2v1h-2zM12 10h3v1h-3zM11 11h4v1h-4zM10 12h5v1h-5zM9 13h6v1h-6zM8 14h7v1h-7z'
};
const Y_ = /M(\d+) (\d+)h(\d+)v1h-\d+z/g;

function buildCells() {
  const layers = ['light', 'mid', 'dark', 'deep'];
  const cells = [];
  for (const layer of layers) {
    const col = COLORS[layer];
    const re = new RegExp(Y_.source, 'g');
    for (const m of PATHS[layer].matchAll(re)) {
      const c0 = +m[1], r0 = +m[2], w = +m[3];
      for (let i = 0; i < w; i++) cells.push({ r: r0, c: c0 + i, col, d: r0 + (c0 + i) });
    }
  }
  cells.sort((a, b) => a.r - b.r || a.c - b.c);
  return cells;
}
const nv = buildCells();
const X_ = '#f1dcfa', Z_ = 0.02, cv = 1000 / 60;
const rv = e => e - Math.floor(e);
const iv = e => Math.max(0, Math.min(1, e));
const av = (e, t, n) => iv((e - t) / (n - t));
const ov = e => 1 - (1 - e) ** 3;
const sv = e => { const t = e - 1; return t * t * (3.2 * t + 2.2) + 1; };
const lv = (e, t, n) => { const r = Math.min(n, 3 * cv) / cv; return e + (t - e) * (1 - Math.pow(0.82, r)); };

export function createLoader(canvas, { size = 120 } = {}) {
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.round(size * dpr);
  canvas.height = Math.round(size * dpr);
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  const state = { variant: 'progress', speed: 1, value: 0, drawnValue: 0, easedAt: undefined };

  function dv() {
    return (t, { scale: n = 1, alpha: r = 1, dx: i = 0, dy: a = 0, rot: o = 0, glow: s = 0 } = {}) => {
      if (r <= 0.01 || n <= 0.01) return;
      ctx.globalAlpha = r; ctx.fillStyle = t.col;
      const c = t.c + 0.5 + i, l = t.r + 0.5 + a, u = n / 2 + Z_;
      ctx.fillRect(c - u, l - u, u * 2, u * 2);
      if (s) { ctx.globalAlpha = r * s; ctx.fillStyle = X_; ctx.fillRect(c - u, l - u, u * 2, u * 2); }
    };
  }

  function draw(now) {
    const r = canvas.width;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, r, r);
    ctx.setTransform(r / 16, 0, 0, r / 16, 0, 0);
    const cell = dv();
    const delta = state.easedAt === undefined ? cv : now - state.easedAt;
    state.drawnValue = lv(state.drawnValue, state.value, delta);
    state.easedAt = now;
    const i = 2 + state.drawnValue / 100 * 27;
    for (const t of nv) {
      const rr = iv(i - t.d + 1);
      const a = state.drawnValue < 99.5 && rr > 0 && t.d > i - 1.5;
      cell(t, { scale: 0.62 + 0.38 * rr, alpha: 0.14 + 0.86 * rr, glow: a ? 0.6 : 0 });
    }
    ctx.globalAlpha = 1;
  }

  let raf = null;
  function loop(now) { draw(now); raf = requestAnimationFrame(loop); }
  function start() { if (!raf) raf = requestAnimationFrame(loop); }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }
  function setValue(pct) { state.value = Math.max(0, Math.min(100, pct)); }
  function setComplete() { state.value = 100; }
  start();
  return { setValue, setComplete, start, stop };
}
