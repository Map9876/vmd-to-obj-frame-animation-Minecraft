const fs = require('fs');
const NL = String.fromCharCode(10);
const frames = JSON.parse(fs.readFileSync('/workspace/mc-voxel-video/player/data/frames.json','utf8'));
function silhouette(fi, axis){
  const f = frames[fi];
  const sx=f.sx, sy=f.sy, sz=f.sz;
  let W,H,proj;
  if(axis==='z'){ W=sx; H=sy; proj=function(x,y,z){return [x,y];}; }
  else if(axis==='y'){ W=sx; H=sz; proj=function(x,y,z){return [x,z];}; }
  else { W=sz; H=sy; proj=function(x,y,z){return [z,y];}; }
  const grid=Array.from({length:H},function(){return new Array(W).fill(0);});
  for(const name of Object.keys(f.groups)){
    const p=f.groups[name];
    for(let i=0;i<p.length;i+=3){
      const ab=proj(p[i],p[i+1],p[i+2]);
      const a=ab[0], b=ab[1];
      if(a>=0&&a<W&&b>=0&&b<H) grid[H-1-b][a]++;
    }
  }
  const flat=[]; for(const row of grid) for(const v of row) flat.push(v);
  const max=Math.max(1,...flat);
  const stepW=Math.max(1,Math.floor(W/90));
  const stepH=Math.max(1,Math.floor(H/70));
  const lines=[];
  for(let y=0;y<H;y+=stepH){
    let line='';
    for(let x=0;x<W;x+=stepW){
      const v=grid[y][x];
      line += v>0 ? (v>max*0.4?'#':'.') : ' ';
    }
    lines.push(line);
  }
  return lines.join(NL);
}
console.log('=== FRAME 1 front (y up) ===');
console.log(silhouette(0,'z'));
console.log('=== FRAME 15 front ===');
console.log(silhouette(14,'z'));
