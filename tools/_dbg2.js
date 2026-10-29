const fs = require('fs');
const NBT = require('/workspace/ObjToSchematic/node_modules/prismarine-nbt');
const buf = fs.readFileSync('/workspace/mc-voxel-video/frames_ots/frame_00001.litematic');
NBT.parse(buf).then(({ parsed }) => {
  const region = parsed.value.Regions.value['Unnamed'].value;
  const pal = region.BlockStatePalette.value.value;
  console.log('palette length:', pal.length);
  console.log('first 3 entries shape:');
  for (const e of pal.slice(0,3)) {
    console.log('  type=', e.type, 'hasValue=', !!e.value, 'keys=', e.value?Object.keys(e.value):'(none)', 'Name?', e.value&&e.value.Name?e.value.Name.value:'NO');
  }
}).catch(e=>{console.error('ERR',e);process.exit(1);});
