import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT = '/workspace/mc-voxel-video/ref-viewers';
const sites = [
  {
    name: 'shulkr-full',
    urls: [
      'https://www.shulkr.com/zh/schematics/zASw919KD2Ov/tree-farm-for-create',
      'https://www.shulkr.com/zh/schematics/zASw919KD2Ov/tree-farm-for-create?view=3d',
      'https://www.shulkr.com/'
    ]
  },
  {
    name: 'mcblock-full',
    urls: [
      'https://mcblock.top/buildings/5ee2396d-6639-4b26-a085-f6e37eb399a6',
      'https://mcblock.top/',
      'https://mcblock.top/buildings'
    ]
  }
];

const ASSET_RE = /\.(js|mjs|css|json|png|jpe?g|webp|gif|svg|woff2?|ttf|otf|wasm|map|html?)(\?|$)/i;
const browser = await chromium.launch();
let saved = 0;
const seen = new Set();
function saveResponse(resp) {
  const url = resp.url();
  const ct = resp.headers()['content-type'] || '';
  if (!ASSET_RE.test(url) && !/javascript|css|json|font|image|webassembly|html|text/.test(ct)) return;
  if (url.startsWith('data:') || url.startsWith('blob:')) return;
  if (seen.has(url)) return;
  seen.add(url);
  try {
    const u = new URL(url);
    let p = u.pathname;
    if (u.search && /(width=|format=|v=|id=)/.test(u.search)) p = p + '_' + u.search.replace(/[?=&]/g, '_');
    const isHtml = /html/.test(ct) || (p.endsWith('/') && !path.extname(p));
    const rel = path.join(OUT, 'MIRROR', u.host + (isHtml ? p + 'index.html' : p));
    if (fs.existsSync(rel)) { saved++; return; }
    resp.body().then(buf => {
      if (!buf || !buf.length) return;
      fs.mkdirSync(path.dirname(rel), { recursive: true });
      fs.writeFileSync(rel, buf);
      saved++;
    }).catch(() => {});
  } catch (e) {}
}

for (const s of sites) {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  page.on('response', saveResponse);
  for (const u of s.urls) {
    try { await page.goto(u, { waitUntil: 'networkidle', timeout: 45000 }); } catch (e) { console.log('goto fail', u, e.message); }
    await page.waitForTimeout(3500);
  }
  await ctx.close();
  console.log(s.name, 'saved so far:', saved);
}
await browser.close();
console.log('TOTAL saved files:', saved, 'unique urls:', seen.size);
