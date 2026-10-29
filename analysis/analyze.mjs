import { chromium } from 'playwright';
import fs from 'fs';

const OUT = '/workspace/mc-voxel-video/analysis';
const targets = [
  { name: 'shulkr', url: 'https://www.shulkr.com/zh/schematics/zASw919KD2Ov/tree-farm-for-create' },
  { name: 'mcblock', url: 'https://mcblock.top/buildings/5ee2396d-6639-4b26-a085-f6e37eb399a6' }
];

const browser = await chromium.launch();
for (const t of targets) {
  console.log('\n===== ' + t.name + ' =====');
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const reqs = [], responses = [], consoleMsgs = [];
  page.on('request', r => reqs.push(r.url()));
  page.on('response', r => responses.push({ url: r.url(), ct: r.headers()['content-type'] || '' }));
  page.on('console', m => consoleMsgs.push(m.type() + ': ' + m.text().slice(0, 300)));
  try {
    await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch (e) { console.log('goto error:', e.message); }
  await page.waitForTimeout(9000);
  let info = {};
  try {
    info = await page.evaluate(() => {
      const c = document.querySelector('canvas');
      let gl = false;
      try { gl = !!document.createElement('canvas').getContext('webgl') || !!document.createElement('canvas').getContext('webgl2'); } catch (e) {}
      return {
        title: document.title,
        hasCanvas: !!c,
        canvasW: c ? c.width : 0,
        canvasH: c ? c.height : 0,
        webglAvailable: gl,
        threeGlobal: typeof window.THREE !== 'undefined'
      };
    });
  } catch (e) { info = { evalError: e.message }; }
  console.log('info:', JSON.stringify(info));
  await page.screenshot({ path: OUT + '/' + t.name + '.png' }).catch(() => {});
  // interesting requests
  const imgReqs = reqs.filter(u => /\.(png|jpe?g|webp|gif|svg|bmp)(\?|$)/i.test(u));
  const jsReqs = reqs.filter(u => /\.js(\?|$)/i.test(u));
  const extReqs = reqs.filter(u => !u.includes(t.url.split('/')[2]) && !u.startsWith('data:'));
  console.log('total requests:', reqs.length, '| js:', jsReqs.length, '| images:', imgReqs.length, '| external hosts:', extReqs.length);
  console.log('external/3rd-party sample:', extReqs.slice(0, 20).join('\n  '));
  console.log('image URLs:', imgReqs.slice(0, 30).join('\n  '));
  console.log('console (first 15):'); consoleMsgs.slice(0, 15).forEach(m => console.log('  ' + m));
  fs.writeFileSync(OUT + '/net_' + t.name + '.json', JSON.stringify({ info, requests: reqs, responses, console: consoleMsgs }, null, 2));
  await ctx.close();
}
await browser.close();
console.log('\nDONE');
