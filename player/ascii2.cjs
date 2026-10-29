const fs=require('fs');
const NL=String.fromCharCode(10);
const frames=JSON.parse(fs.readFileSync('/workspace/mc-voxel-video/player/data/frames.json','utf8'));
function sil(fi){
  const f=frames[fi], sx=f.sx, sy=f.sy, sz=f.sz;
  const W=sx, H=sy;
  const grid=Array.from({length:H},()=>new Array(W).fill(0));
  for(const n of Object.keys(f.groups)){const p=f.groups[n];
    for(let i=0;i<p.length;i+=3){const x=p[i],y=p[i+1];if(x>=0&&x<W&&y>=0&&y<H)grid[H-1-y][x]++;}}
  const flat=[];for(const r of grid)for(const v of r)flat.push(v);
  const max=Math.max(1,...flat);
  const sH=Math.max(1,Math.floor(H/64)), sW=Math.max(1,Math.floor(W/90));
  const L=[];
  for(let y=0;y<H;y+=sH){let line='';for(let x=0;x<W;x+=sW){const v=grid[y][x];line+=v>0?(v>max*0.35?'#':'.'):' ';}L.push(line);}
  return L.join(NL);
}
console.log('=== FRAME 19 (idx18) front ===');
console.log(sil(18));
