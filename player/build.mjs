import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { execSync } from 'child_process';

const ROOT = '/workspace/mc-voxel-video';
const FRAMES_SRC = path.join(ROOT, 'frames_ots');
const BUNDLE = path.join(ROOT, 'ref-viewers/mcblock/bundle.zip');
const OUT = path.join(ROOT, 'player');
const DATA = path.join(OUT, 'data');
const TEXDIR = path.join(OUT, 'assets/block-textures');

// ---- THEIR NBT 容器读取器（gzip + 标签树） ----
function readNBT(buf) {
  let p = 0;
  const u16 = () => { const v = buf.readUInt16BE(p); p += 2; return v; };
  const u8 = () => { const v = buf.readUInt8(p); p += 1; return v; };
  const i8 = () => { const v = buf.readInt8(p); p += 1; return v; };
  const i16 = () => { const v = buf.readInt16BE(p); p += 2; return v; };
  const i32 = () => { const v = buf.readInt32BE(p); p += 4; return v; };
  const i64 = () => { const hi = buf.readInt32BE(p); const lo = buf.readInt32BE(p + 4); p += 8; return (BigInt(hi >>> 0) << 32n) | BigInt(lo >>> 0); };
  const str = () => { const n = u16(); const s = buf.toString('utf8', p, p + n); p += n; return s; };
  function payload(t) {
    switch (t) {
      case 0: return null;
      case 1: return i8();
      case 2: return i16();
      case 3: return i32();
      case 4: return i64();
      case 5: return i32();
      case 6: return i32();
      case 7: { const n = i32(); const a = []; for (let k = 0; k < n; k++) a.push(i8()); return a; }
      case 8: return str();
      case 9: { const st = u8(); const n = i32(); const a = []; for (let k = 0; k < n; k++) a.push(payload(st)); return { type: st, value: a }; }
      case 10: { const o = {}; while (true) { const nt = u8(); if (nt === 0) break; const nm = str(); o[nm] = { type: nt, value: payload(nt) }; } return o; }
      case 11: { const n = i32(); const a = []; for (let k = 0; k < n; k++) a.push(i32()); return a; }
      case 12: { const n = i32(); const a = []; for (let k = 0; k < n; k++) a.push(i64()); return a; }
      default: throw new Error('unknown tag ' + t);
    }
  }
  const rootType = u8();
  const rootName = str();
  return { type: rootType, name: rootName, value: payload(rootType) };
}

// ---- THEIR Litematica 解码（位解包，含 long 边界跨越 = Litematica BitArray.get） ----
function decodeLitematic(file) {
  const parsed = readNBT(zlib.gunzipSync(fs.readFileSync(file)));
  const root = parsed.value;
  const regions = root.Regions.value;
  const out = [];
  for (const rname of Object.keys(regions)) {
    const reg = regions[rname].value;
    const paletteArr = reg.BlockStatePalette.value.value;
    const names = paletteArr.map(c => c.Name.value);
    const paletteSize = names.length;
    const bits = Math.max(2, Math.ceil(Math.log2(paletteSize)));
    const mask = (1n << BigInt(bits)) - 1n;
    const longs = reg.BlockStates.value;
    const size = reg.Size.value;
    const sx = size.x.value, sy = size.y.value, sz = size.z.value;
    const groups = {};
    const used = new Set();
    // Robust against ObjToSchematic allocating the BlockStates long array for a
    // smaller volume than the declared Size (empty margin). Derive the real
    // voxel count the long array holds and never index past its end.
    const maxVoxels = Math.floor((longs.length * 64) / bits);
    for (let e = 0; e < maxVoxels; e++) {
      const x = e % sx;
      const z = Math.floor(e / sx) % sz;
      const y = Math.floor(e / (sx * sz));
      const bitIndex = e * bits;
      const o = Math.floor(bitIndex / 64);
      const s = bitIndex % 64;
      let l = BigInt(longs[o]) >> BigInt(s);
      if (s + bits > 64 && o + 1 < longs.length) {
        l |= BigInt(longs[o + 1]) << BigInt(64 - s);
      }
      const idx = Number(l & mask);
      if (idx === 0) continue;
      const name = names[idx];
      used.add(name);
      (groups[name] ||= []).push(x, y, z);
    }
    out.push({ region: rname, sx, sy, sz, groups, used: [...used] });
  }
  return out;
}

function extractBundle(usedNames) {
  const tmp = '/tmp/bundle_extract';
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.mkdirSync(tmp, { recursive: true });
  execSync('unzip -o "' + BUNDLE + '" block-face-textures.json -d "' + tmp + '" >/dev/null 2>&1');
  const faceMap = JSON.parse(fs.readFileSync(path.join(tmp, 'block-face-textures.json'), 'utf8'));
  const needed = {};
  const prefix = 'minecraft/';
  for (const name of usedNames) {
    const rel = faceMap[name];
    if (!rel) { console.warn('未找到贴图映射:', name); continue; }
    needed[name] = rel;
    const texFile = rel.startsWith(prefix) ? rel.slice(prefix.length) : rel;
    try { execSync('unzip -o "' + BUNDLE + '" "block-textures/' + texFile + '" -d "' + tmp + '" >/dev/null 2>&1'); }
    catch (e) { console.warn('贴图缺失:', texFile); }
  }
  fs.rmSync(TEXDIR, { recursive: true, force: true });
  fs.mkdirSync(TEXDIR, { recursive: true });
  const btDir = path.join(tmp, 'block-textures');
  fs.mkdirSync(btDir, { recursive: true });
  const allUsed = new Set();
  for (const f of fs.readdirSync(btDir)) {
    fs.copyFileSync(path.join(btDir, f), path.join(TEXDIR, f));
    allUsed.add(f);
  }
  return { faceMap: needed, texCount: allUsed.size };
}

const files = fs.readdirSync(FRAMES_SRC).filter(f => f.endsWith('.litematic')).sort();
const frames = [];
const allUsed = new Set();
let totalBlocks = 0;
for (let i = 0; i < files.length; i++) {
  const dec = decodeLitematic(path.join(FRAMES_SRC, files[i]));
  const merged = { groups: {}, sx: 0, sy: 0, sz: 0 };
  for (const r of dec) {
    merged.sx = Math.max(merged.sx, r.sx);
    merged.sy = Math.max(merged.sy, r.sy);
    merged.sz = Math.max(merged.sz, r.sz);
    for (const name of Object.keys(r.groups)) {
      (merged.groups[name] ||= []).push(...r.groups[name]);
      allUsed.add(name);
      totalBlocks += r.groups[name].length / 3;
    }
  }
  frames.push({ file: files[i], sx: merged.sx, sy: merged.sy, sz: merged.sz, groups: merged.groups });
  if ((i + 1) % 5 === 0) console.log('decoded ' + (i + 1) + '/' + files.length + ' (blocks so far ' + totalBlocks + ')');
}
fs.writeFileSync(path.join(DATA, 'frames.json'), JSON.stringify(frames));
console.log('frames.json written: ' + frames.length + ' frames, ' + totalBlocks + ' blocks');
const r2 = extractBundle([...allUsed]);
fs.writeFileSync(path.join(DATA, 'face-textures.json'), JSON.stringify(r2.faceMap));
console.log('face-textures.json: ' + Object.keys(r2.faceMap).length + ' blocks -> ' + r2.texCount + ' textures');
console.log('DONE');
