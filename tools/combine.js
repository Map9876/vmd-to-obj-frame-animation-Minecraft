const fs = require('fs');
const zlib = require('zlib');
const NBT = require('prismarine-nbt');
const path = require('path');

const SRC = '/workspace/mc-voxel-video/frames_ots';
const OUT = '/workspace/mc-voxel-video/schematics';
const GAP = 3;

function readLitematic(file) {
  const buf = fs.readFileSync(file);
  return NBT.parse(buf).then(r => r.parsed);
}

function intTag(n) { return { type: 'int', value: n }; }
function longTag(n) { return { type: 'long', value: n }; }
function stringTag(s) { return { type: 'string', value: s }; }
function compTag(o) { return { type: 'compound', value: o }; }

async function main() {
  const files = fs.readdirSync(SRC).filter(f => f.endsWith('.litematic')).sort();
  if (!files.length) throw new Error('no litematics found in ' + SRC);
  console.log('Found', files.length, 'litematics');

  const regions = {};
  const offsets = [];
  let totalBlocks = 0;
  let totalVolume = 0;
  let maxY = 0, maxZ = 0;
  const sxList = [];

  for (let i = 0; i < files.length; i++) {
    const parsed = await readLitematic(path.join(SRC, files[i]));
    const region = parsed.value.Regions.value.Unnamed;
    const size = region.value.Size.value;
    const sx = size.x.value, sy = size.y.value, sz = size.z.value;
    sxList.push(sx);
    const meta = parsed.value.Metadata.value;
    totalBlocks += meta.TotalBlocks.value;
    totalVolume += meta.TotalVolume.value;
    maxY = Math.max(maxY, sy);
    maxZ = Math.max(maxZ, sz);

    const step = sx + GAP;
    const xoff = i * step;
    const clone = structuredClone(region);
    clone.value.Position = compTag({ x: intTag(xoff), y: intTag(0), z: intTag(0) });
    regions['frame_' + String(i + 1).padStart(5, '0')] = clone;

    offsets.push({
      frame: i + 1,
      region: 'frame_' + String(i + 1).padStart(5, '0'),
      litematic: files[i],
      offset: { x: xoff, y: 0, z: 0 },
      size: { x: sx, y: sy, z: sz },
      center: { x: xoff + Math.floor(sx / 2), y: Math.floor(sy / 2), z: Math.floor(sz / 2) },
      src_glb: 'frames_glb/' + files[i].replace('.litematic', '.glb')
    });
  }

  const totalX = (files.length - 1) * (sxList[0] + GAP) + sxList[0];

  const base = await readLitematic(path.join(SRC, files[0]));
  const md = base.value.Metadata.value;
  md.RegionCount = intTag(files.length);
  md.Size = compTag({ x: intTag(totalX), y: intTag(maxY), z: intTag(maxZ) });
  md.TotalBlocks = intTag(totalBlocks);
  md.TotalVolume = intTag(totalVolume);
  md.Name = stringTag('mmd_dance_30frames');
  md.Author = stringTag('mc-voxel-video pipeline');
  md.Description = stringTag('30 MMD dance frames voxelized via ObjToSchematic, placed along +X as separate regions.');
  md.TimeModified = longTag(0);
  base.value.Regions = compTag(regions);

  const raw = NBT.writeUncompressed(base);
  const gz = zlib.gzipSync(raw);
  fs.mkdirSync(OUT, { recursive: true });
  const outFile = path.join(OUT, 'mmd_dance_30frames.litematic');
  fs.writeFileSync(outFile, gz);

  fs.writeFileSync(path.join(OUT, 'offsets.json'), JSON.stringify({
    schematic: 'mmd_dance_30frames.litematic',
    frame_count: files.length,
    gap: GAP,
    bounding_size: { x: totalX, y: maxY, z: maxZ },
    total_blocks: totalBlocks,
    total_volume: totalVolume,
    frames: offsets
  }, null, 2));

  console.log('Wrote', outFile, '(' + gz.length + ' bytes)');
  console.log('  bounding size X,Y,Z =', totalX, maxY, maxZ);
  console.log('  total blocks =', totalBlocks, ' total volume =', totalVolume);
  console.log('  offsets.json written with', offsets.length, 'frames');
}

main().catch(e => { console.error('ERR', e); process.exit(1); });
