const fs = require('fs');
const NBT = require('/workspace/ObjToSchematic/node_modules/prismarine-nbt');
const buf = fs.readFileSync('/workspace/mc-voxel-video/frames_ots/frame_00001.litematic');
NBT.parse(buf).then((res) => {
  console.log('result keys:', Object.keys(res));
  const parsed = res.parsed;
  console.log('parsed type:', parsed && parsed.type, '| isObj:', typeof parsed);
  const val = parsed && parsed.type === 'compound' ? parsed.value : parsed;
  console.log('top keys:', val ? Object.keys(val) : 'none');
  console.log('top types:', val ? Object.fromEntries(Object.entries(val).map(([k,v])=>[k, v.type])) : 'none');
  // peek one level deeper for litematica root
  for (const k of (val?Object.keys(val):[])) {
    const c = val[k];
    if (c.type === 'compound') {
      console.log('  ', k, '->', Object.keys(c.value));
    }
  }
}).catch(e=>{console.error('ERR',e);process.exit(1);});
