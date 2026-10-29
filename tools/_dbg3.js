const fs = require('fs');
const NBT = require('/workspace/ObjToSchematic/node_modules/prismarine-nbt');
const buf = fs.readFileSync('/workspace/mc-voxel-video/frames_ots/frame_00001.litematic');
NBT.parse(buf).then(({ parsed }) => {
  const region = parsed.value.Regions.value['Unnamed'].value;
  const pal = region.BlockStatePalette.value.value;
  console.log(JSON.stringify(pal.slice(0,3), null, 0));
}).catch(e=>{console.error('ERR',e);process.exit(1);});
