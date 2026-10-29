const PW = '/root/.npm/_npx/705bc6b22212b352/node_modules/playwright';
const { chromium } = require(PW);
const CHROME = '/root/.npm/_npx/705bc6b22212b352/node_modules/playwright-core/.local-browsers/chromium-1248/chrome-linux64/chrome';
(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox','--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('http://localhost:8123/player/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => { const u=document.getElementById('ui'); return u && u.style.display==='flex'; }, { timeout: 30000 }).catch(()=>{});
  await page.waitForTimeout(2500);
  const stats = await page.evaluate(() => {
    const c = document.querySelector('canvas');
    const tmp = document.createElement('canvas'); tmp.width=c.width; tmp.height=c.height;
    const ctx = tmp.getContext('2d'); ctx.drawImage(c,0,0);
    const d = ctx.getImageData(0,0,c.width,c.height).data;
    const W=c.width,H=c.height;
    const bg=[32,35,41]; let nonBg=0, sum=0, minB=255, maxB=0;
    // brightness histogram buckets
    const buckets=new Array(8).fill(0);
    // bottom vs top strips
    const yTop=Math.floor(H*0.15), yBot=Math.floor(H*0.85);
    let topSum=0,topN=0,botSum=0,botN=0;
    for (let y=0;y<H;y++){
      for (let x=0;x<W;x++){
        const i=(y*W+x)*4; const r=d[i],g=d[i+1],b=d[i+2];
        const bright=(r+g+b)/3;
        const isBg = Math.abs(r-bg[0])<6&&Math.abs(g-bg[1])<6&&Math.abs(b-bg[2])<6;
        if(!isBg){ nonBg++; sum+=bright; if(bright<minB)minB=bright; if(bright>maxB)maxB=bright; buckets[Math.min(7,Math.floor(bright/32))]++; }
        if(y<yTop){ topSum+=bright; topN++; } else if(y>yBot){ botSum+=bright; botN++; }
      }
    }
    return { W,H, nonBg, modelMean: nonBg? (sum/nonBg):0, minB, maxB, buckets, topMean: topSum/topN, botMean: botSum/botN };
  });
  console.log(JSON.stringify(stats,null,1));
  await browser.close();
})().catch(e=>{console.error('FATAL',e);process.exit(1);});
