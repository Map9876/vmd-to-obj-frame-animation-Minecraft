const fs=require('fs');
const path=require('path');
const PNG=require('/workspace/objtoschematic_tool/node_modules/pngjs').PNG;
const dir=process.argv[2]||'/workspace/mc-voxel-video/shots';
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.png')).sort()){
  const p=path.join(dir,f);
  const png=PNG.sync.read(fs.readFileSync(p));
  const {width,height,data}=png; let n=0,tr=0,tg=0,tb=0,colorful=0,maxchan=0;
  for(let i=0;i<data.length;i+=4){const r=data[i],g=data[i+1],b=data[i+2];const lum=(r+g+b)/3;
    if(lum>40){n++;tr+=r;tg+=g;tb+=b;const mm=Math.max(r,g,b)-Math.min(r,g,b);if(mm>40)colorful++;maxchan=Math.max(maxchan,r,g,b);}}
  console.log(f, 'nonbg='+(n/(width*height)*100).toFixed(0)+'%', 'meanRGB='+(n?(tr/n|0)+','+(tg/n|0)+','+(tb/n|0):'na'), 'colorful%='+(n?(colorful/n*100).toFixed(0):0), 'maxchan='+maxchan);
}