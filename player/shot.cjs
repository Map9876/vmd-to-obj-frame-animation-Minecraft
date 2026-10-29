const path = require('path');
const PW = '/workspace/mc-voxel-video/analysis/node_modules/playwright';
const { chromium } = require(PW);
const CHROME = '/root/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox','--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERR: '+e.message));
  await page.goto('http://localhost:8123/player/index.html', { waitUntil: 'networkidle' });
  // wait until loading hidden (textures loaded)
  await page.waitForFunction(() => { const u=document.getElementById('ui'); return u && u.style.display==='flex'; }, { timeout: 30000 }).catch(()=>{});
  await page.waitForTimeout(2000);
  const frames = [0, 7, 14, 21, 29];
  for (const f of frames) {
    await page.evaluate((n) => {
      const s = document.getElementById('scrub');
      s.value = String(n);
      s.dispatchEvent(new Event('input'));
    }, f);
    await page.waitForTimeout(900);
    const out = '/workspace/mc-voxel-video/shots/frame_' + String(f+1).padStart(2,'0') + '.png';
    await page.screenshot({ path: out });
    console.log('shot', f+1, '->', out);
  }
  console.log('ERRORS:', errors.length ? errors.slice(0,5) : 'none');
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
