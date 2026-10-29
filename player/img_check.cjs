const fs=require('fs');
const path=require('path');
const PNG=require('/workspace/objtoschematic_tool/node_modules/pngjs').PNG;
const dir=process.argv[2]||'/workspace/mc-voxel-video/shots';
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.png')).sort()){
  const p=path.join(dir,f);
  const png=PNG.sync.read(fs.readFileSync(p));
  const {width,height,data}=png;
  const W=Math.min(90,width), H=Math.min(48,height);
  const sx=Math.floor(width/W), sy=Math.floor(height/H);
  const grid=[]; let nonbg=0, total=W*H; const hues={};
  for(let gy=0;gy<H;gy++){let line='';for(let gx=0;gx<W;gx++){
    let r=0,g=0,b=0,n=0;
    for(let yy=gy*sy;yy<(gy+1)*sy;yy++)for(let xx=gx*sx;xx<(gx+1)*sx;xx++){
      const i=(yy*width+xx)*4; r+=data[i];g+=data[i+1];b+=data[i+2];n++;}
    r/=n;g/=n;b/=n; const lum=(r+g+b)/3;
    if(lum>40){nonbg++; line+='#';} else line+=' ';
    const key=Math.round(r/64)+','+Math.round(g/64)+','+Math.round(b/64); hues[key]=(hues[key]||0)+1;
  } grid.push(line);}
  const top=Object.entries(hues).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k,v])=>k+':'+v);
  console.log('=== '+f+' nonbg='+(100*nonbg/total).toFixed(0)+'%');
  console.log(grid.join(String.fromCharCode(10)));
  console.log('top colors:', top.join('  '));
}