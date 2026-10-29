import { chromium } from 'playwright';
const logs = [];
const browser = await chromium.launch({ args: ['--use-gl=swiftshader','--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1100, height: 720 } });
page.on('pageerror', e => logs.push('PAGEERROR: ' + e.message));
page.on('console', m => logs.push('CONSOLE['+m.type()+']: ' + m.text()));
page.on('requestfailed', r => logs.push('REQFAIL: ' + r.url() + ' ' + (r.failure()&&r.failure().errorText)));
await page.goto('http://localhost:8123/player/index.html', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(4000);
const info = await page.evaluate(() => ({
  url: location.href,
  hasFile: !!document.getElementById('file'),
  hasUI: !!document.getElementById('ui'),
  blk: document.getElementById('blk')?.textContent,
  loading: document.getElementById('loading')?.textContent,
}));
console.log('INFO', JSON.stringify(info));
console.log('LOGS:\n' + logs.join('\n'));
await browser.close();
