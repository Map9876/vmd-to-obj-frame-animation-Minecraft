const fs = require('fs');
const NBT = require('/workspace/ObjToSchematic/node_modules/prismarine-nbt');
const file = process.argv[2] || '/workspace/mc-voxel-video/frames_ots/frame_00001.litematic';
const buf = fs.readFileSync(file);
NBT.parse(buf).then(({ parsed }) => {
  const root = parsed.value;
  const meta = root.Metadata.value;
  const region = root.Regions.value['Unnamed'].value;
  const pal = region.BlockStatePalette.value.value;
  const counts = {};
  for (const e of pal) {
    const name = e.Name.value;
    counts[name] = (counts[name] || 0) + 1;
  }
  console.log('TotalBlocks:', meta.TotalBlocks.value, '| palette distinct block types:', Object.keys(counts).length);
  const entries = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  for (const [n,c] of entries) console.log('  ', c, n);
}).catch(e=>{console.error('ERR',e);process.exit(1);});
