const fs = require('fs');
const NBT = require('prismarine-nbt');
const path = require('path');
const SRC = '/workspace/mc-voxel-video/frames_ots';
const COMB = '/workspace/mc-voxel-video/schematics/mmd_dance_30frames.litematic';

function origInfo(f) {
  return NBT.parse(fs.readFileSync(path.join(SRC, f))).then(r => {
    const reg = r.parsed.value.Regions.value.Unnamed.value;
    return {
      bsLen: reg.BlockStates.value.length,
      palLen: reg.BlockStatePalette.value.value.length,
      sx: reg.Size.value.x.value, sy: reg.Size.value.y.value, sz: reg.Size.value.z.value,
      total: r.parsed.value.Metadata.value.TotalBlocks.value
    };
  });
}

NBT.parse(fs.readFileSync(COMB)).then(async (r) => {
  const root = r.parsed;
  const md = root.value.Metadata.value;
  const regs = root.value.Regions.value;
  const names = Object.keys(regs);
  console.log('Combined RegionCount meta =', md.RegionCount.value);
  console.log('Combined actual regions =', names.length);
  console.log('Combined Size =', md.Size.value.x.value, md.Size.value.y.value, md.Size.value.z.value);
  console.log('Combined TotalBlocks =', md.TotalBlocks.value, ' TotalVolume =', md.TotalVolume.value);
  let ok = true;
  const files = fs.readdirSync(SRC).filter(f => f.endsWith('.litematic')).sort();
  let sumBlocks = 0, sumVol = 0;
  for (let i = 0; i < names.length; i++) {
    const reg = regs[names[i]].value;
    const oi = await origInfo(files[i]);
    const bsLen = reg.BlockStates.value.length;
    const palLen = reg.BlockStatePalette.value.value.length;
    const posX = reg.Position.value.x.value;
    const expectedPosX = i * (oi.sx + 3);
    const match = bsLen === oi.bsLen && palLen === oi.palLen &&
      reg.Size.value.x.value === oi.sx && reg.Size.value.y.value === oi.sy && reg.Size.value.z.value === oi.sz &&
      posX === expectedPosX;
    if (!match) { ok = false; console.log('MISMATCH', names[i], {bsLen, oiBs: oi.bsLen, palLen, oiPal: oi.palLen, posX, expectedPosX}); }
    sumBlocks += oi.total; sumVol += oi.sx*oi.sy*oi.sz;
  }
  console.log('All 30 regions match originals:', ok);
  console.log('Sum of original TotalBlocks =', sumBlocks, ' (meta says', md.TotalBlocks.value + ')');
  console.log('Sum of original volumes =', sumVol, ' (meta says', md.TotalVolume.value + ')');
}).catch(e => { console.error('ERR', e); process.exit(1); });
