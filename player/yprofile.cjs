const fs=require('fs');
const NL=String.fromCharCode(10);
const frames=JSON.parse(fs.readFileSync('/workspace/mc-voxel-video/player/data/frames.json','utf8'));
function profile(fi){
  const f=frames[fi], sy=f.sy;
  const cnt=new Array(sy).fill(0);
  const maxY=sy-1;
  for(const n of Object.keys(f.groups)){const p=f.groups[n];
    for(let i=1;i<p.length;i+=3){const y=p[i];if(y>=0&&y<=maxY)cnt[y]++;}}
  const max=Math.max(1,...cnt);
  let bars=[];
  for(let y=maxY;y>=0;y--){
    const r=cnt[y]/max;
    const ch = r<=0.01?' ': (r<0.15?'.':(r<0.4?':':(r<0.7?'+':'#')));
    bars.push(ch);
  }
  return bars.join('');
}
for(const idx of [0,8,14,18,21,29]){
  console.log('frame '+(idx+1)+':');
  console.log(profile(idx));
}
