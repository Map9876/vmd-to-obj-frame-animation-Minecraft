const fs = require('fs');
const PW = '/root/.npm/_npx/705bc6b22212b352/node_modules/playwright';
const { chromium } = require(PW);
const CHROME = '/root/.npm/_npx/705bc6b22212b352/node_modules/playwright-core/.local-browsers/chromium-1248/chrome-linux64/chrome';
(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox','--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERR: '+e.message));
  await page.goto('http://localhost:8123/player/index.html', { waitUntil: 'load' });
  const ok = await page.waitForFunction(() => { const u=document.getElementById('ui'); return u && u.style.display==='flex'; }, { timeout: 30000 }).then(()=>true).catch(()=>false);
  console.log('ui shown:', ok, 'loading:', await page.evaluate(()=> (document.getElementById('loading')||{}).textContent||''));
  await page.waitForTimeout(2500);
  const frames = [0, 7, 14, 21, 29];
  for (const f of frames) {
    await page.evaluate((n) => { const s=document.getElementById('scrub'); s.value=String(n); s.dispatchEvent(new Event('input')); }, f);
    await page.waitForTimeout(900);
    const data = await page.evaluate(() => document.querySelector('canvas').toDataURL('image/png'));
    const out = '/workspace/mc-voxel-video/shots/frame_' + String(f+1).padStart(2,'0') + '.png';
    fs.writeFileSync(out, Buffer.from(data.split(',')[1], 'base64'));
    console.log('shot', f+1, '->', out, errors.length? ('ERR:'+errors[0]) : '');
  }
  console.log('ERRORS:', errors.length ? errors.slice(0,5) : 'none');
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
