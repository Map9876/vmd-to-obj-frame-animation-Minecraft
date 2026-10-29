const fs = require('fs');
const zlib = require('zlib');

// 通用 NBT 容器读取器（仅 gzip + 标签树，不涉及 schematic 语义）。
function readNBT(buf) {
  let p = 0;
  const u16 = () => { const v = buf.readUInt16BE(p); p += 2; return v; };
  const u8 = () => { const v = buf.readUInt8(p); p += 1; return v; };
  const i8 = () => { const v = buf.readInt8(p); p += 1; return v; };
  const i16 = () => { const v = buf.readInt16BE(p); p += 2; return v; };
  const i32 = () => { const v = buf.readInt32BE(p); p += 4; return v; };
  const i64 = () => { const hi = buf.readInt32BE(p); const lo = buf.readInt32BE(p+4); p += 8; return (BigInt(hi >>> 0) << 32n) | BigInt(lo >>> 0); };
  const str = () => { const n = u16(); const s = buf.toString('utf8', p, p+n); p += n; return s; };
  function payload(t) {
    switch (t) {
      case 0: return null;
      case 1: return i8();
      case 2: return i16();
      case 3: return i32();
      case 4: return i64();
      case 5: return i32(); // float (treat as int bits, unused here)
      case 6: return i32(); // double (unused)
      case 7: { const n = i32(); const arr = []; for (let k=0;k<n;k++) arr.push(i8()); return arr; }
      case 8: return str();
      case 9: { const st = u8(); const n = i32(); const arr = []; for (let k=0;k<n;k++) arr.push(payload(st)); return { type: st, value: arr }; }
      case 10: { const obj = {}; while (true) { const nt = u8(); if (nt === 0) break; const nm = str(); obj[nm] = { type: nt, value: payload(nt) }; } return obj; }
      case 11: { const n = i32(); const arr = []; for (let k=0;k<n;k++) arr.push(i32()); return arr; }
      case 12: { const n = i32(); const arr = []; for (let k=0;k<n;k++) arr.push(i64()); return arr; }
      default: throw new Error('unknown tag ' + t);
    }
  }
  const rootType = u8();
  const rootName = str();
  return { type: rootType, name: rootName, value: payload(rootType) };
}

function decodeLitematic(file) {
  const raw = fs.readFileSync(file);
  const un = zlib.gunzipSync(raw);
  const parsed = readNBT(un);
  const root = parsed.value;
  const regions = root.Regions.value;
  const out = [];
  for (const rname of Object.keys(regions)) {
    const reg = regions[rname].value;
    const paletteArr = reg.BlockStatePalette.value.value; // array of compounds
    const names = paletteArr.map(c => c.Name.value);
    const paletteSize = names.length;
    const bits = Math.max(2, Math.ceil(Math.log2(paletteSize)));
    const mask = (1n << BigInt(bits)) - 1n;
    const longs = reg.BlockStates.value; // BigInt[]
    const size = reg.Size.value;
    const sx = size.x.value, sy = size.y.value, sz = size.z.value;
    const totalVol = sx * sy * sz;
    const counts = {};
    let nonAir = 0;
    for (let e = 0; e < totalVol; e++) {
      const bitIndex = e * bits;
      const o = Math.floor(bitIndex / 64);
      const s = bitIndex % 64;
      // Litematica BitArray.get: entry bits may cross a 64-bit long boundary
      let l = longs[o] >> BigInt(s);
      if (s + bits > 64 && o + 1 < longs.length) {
        l |= longs[o + 1] << BigInt(64 - s);
      }
      const idx = Number(l & mask);
      if (idx !== 0) { nonAir++; const nm = names[idx]; counts[nm] = (counts[nm]||0)+1; }
    }
    const meta = root.Metadata.value;
    out.push({ region: rname, sx, sy, sz, totalVol, nonAir, reportedTotal: meta.TotalBlocks.value, paletteSize, counts });
  }
  return out;
}

const file = process.argv[2] || '/workspace/mc-voxel-video/frames_ots/frame_00001.litematic';
const res = decodeLitematic(file);
for (const r of res) {
  console.log('region', r.region, 'size', r.sx+'x'+r.sy+'x'+r.sz, 'volume', r.totalVol);
  console.log('  decoded non-air blocks:', r.nonAir, '| reported TotalBlocks:', r.reportedTotal, '| match:', r.nonAir === r.reportedTotal);
  console.log('  distinct block types:', Object.keys(r.counts).length);
  const top = Object.entries(r.counts).sort((a,b)=>b[1]-a[1]).slice(0,8);
  top.forEach(([n,c]) => console.log('    ', c, n));
}
