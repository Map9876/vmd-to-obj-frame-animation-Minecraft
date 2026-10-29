const fs=require('fs');
const frames=JSON.parse(fs.readFileSync('/workspace/mc-voxel-video/player/data/frames.json','utf8'));
function analyze(fi){
  const f=frames[fi]; const set=new Set();
  for(const name of Object.keys(f.groups)){ const a=f.groups[name]; for(let i=0;i<a.length;i+=3) set.add(a[i]+','+a[i+1]+','+a[i+2]); }
  const seen=new Set(); let comps=0, largest=0;
  for(const start of set){ if(seen.has(start)) continue; comps++; let sz=0; const st=[start]; seen.add(start);
    while(st.length){ const cur=st.pop(); sz++; const A=cur.split(','); const x=+A[0],y=+A[1],z=+A[2];
      const nb=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
      for(const nn of nb){ const nk=(x+nn[0])+','+(y+nn[1])+','+(z+nn[2]); if(set.has(nk)&&!seen.has(nk)){ seen.add(nk); st.push(nk); } } }
    if(sz>largest) largest=sz; }
  console.log('frame',fi+1,f.file,'grid',f.sx,f.sy,f.sz,'voxels',set.size,'components',comps,'largest',largest,'('+(100*largest/set.size).toFixed(1)+'%)');
  // ASCII front view (project over z)
  const cols=64; const rows=Math.max(1,Math.round(cols*f.sy/f.sx*0.5));
  const grid=[]; for(let r=0;r<rows;r++) grid.push(new Array(cols).fill(' '));
  for(const k of set){ const A=k.split(','); const x=+A[0],y=+A[1];
    let cx=Math.floor(x/f.sx*cols); let cy=Math.floor((f.sy-1-y)/f.sy*rows);
    if(cx<0)cx=0; if(cx>=cols)cx=cols-1; if(cy<0)cy=0; if(cy>=rows)cy=rows-1; grid[cy][cx]='#'; }
  console.log(grid.map(r=>r.join('')).join(String.fromCharCode(10)));
}
analyze(0); console.log('====='); analyze(3);
