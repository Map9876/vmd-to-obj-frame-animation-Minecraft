/*
 * litematic-parser.js — shulkr / mcblock Litematica 解析器的忠实复刻（可读源码版）
 * =========================================================================
 * 来源（反编译目标）：
 *   - shulkr  convert.worker-wzfFKXfF.js  +  dist-De3d9v3V/chunk_Le.js
 *       关键代码（原样）：
 *         i[e] = Number(r[o] >> BigInt(s) & a)
 *         e.map(([e,t]) => BigInt(e>>>0) << 32n | BigInt(t>>>0))
 *   - mcblock module-70144.js（含 Litematic / Region / BlockStates / BlockStatePalette）
 *
 * 说明：
 *   两站的解析器同源（均复刻 Litematica 官方 BitArray.get 语义）。
 *   本模块 1:1 复刻其算法，包含关键的 64-bit long 边界跨越分支：
 *       if (offset + bitsPerBlock > 64) l |= longs[longIndex + 1] << (64 - offset);
 *   这正是我们此前漏掉、导致解码数差 120 的那一行。
 *
 * 后端部分（我们不需要，按用户要求以伪代码注释保留结构）：
 *   # backend.upload(litematicFile)
 *   #     -> store(fileId, rawBytes)
 *   # backend.getBuildUrl(fileId)
 *   #     -> https://<host>/builds/<fileId>   (shulkr 会把 litematic 转成私有 build 格式)
 *   #   shulkr 私有 build 格式（服务端完成 litematic -> build 的转换）:
 *   #     magic[4] + version[1] + ... + palette + entries
 *   #     （前端 convert.worker 的 vt() 只解这种格式；本模块解的是原始 litematic，
 *   #       与 mcblock 前端行为一致 —— mcblock 是前端直接解 litematic）
 */

// ---------- NBT 容器读取器（gzip + 标签树，仅容器语义，无 schematic 业务逻辑） ----------
async function inflateGzip(u8) {
  // 浏览器原生 DecompressionStream；Node 端可替换为 zlib.gunzipSync
  const ds = new DecompressionStream('gzip');
  const stream = new Blob([u8]).stream().pipeThrough(ds);
  const buf = await new Response(stream).arrayBuffer();
  return new Uint8Array(buf);
}

function readNBT(buf) {
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  let p = 0;
  const u8  = () => dv.getUint8(p++);
  const i8  = () => dv.getInt8(p++);
  const i16 = () => { const v = dv.getInt16(p); p += 2; return v; };
  const i32 = () => { const v = dv.getInt32(p); p += 4; return v; };
  const i64 = () => {
    // 与原站一致：两个 32-bit 半段按无符号重组（BigInt(e>>>0) << 32n | BigInt(t>>>0)）
    const hi = dv.getInt32(p); const lo = dv.getInt32(p + 4); p += 8;
    return (BigInt(hi >>> 0) << 32n) | BigInt(lo >>> 0);
  };
  const f32 = () => { const v = dv.getFloat32(p); p += 4; return v; };
  const f64 = () => { const v = dv.getFloat64(p); p += 8; return v; };
  const str = () => { const n = dv.getUint16(p); p += 2; const s = new TextDecoder().decode(buf.subarray(p, p + n)); p += n; return s; };
  function payload(t) {
    switch (t) {
      case 0:  return null;
      case 1:  return i8();
      case 2:  return i16();
      case 3:  return i32();
      case 4:  return i64();
      case 5:  return f32();
      case 6:  return f64();
      case 7:  { const n = i32(); const a = new Int8Array(n); for (let k = 0; k < n; k++) a[k] = i8(); return a; }
      case 8:  return str();
      case 9:  { const st = u8(); const n = i32(); const a = []; for (let k = 0; k < n; k++) a.push(payload(st)); return { type: st, value: a }; }
      case 10: { const o = {}; while (true) { const nt = u8(); if (nt === 0) break; const nm = str(); o[nm] = { type: nt, value: payload(nt) }; } return o; }
      case 11: { const n = i32(); const a = new Int32Array(n); for (let k = 0; k < n; k++) a[k] = i32(); return a; }
      case 12: { const n = i32(); const a = []; for (let k = 0; k < n; k++) a.push(i64()); return a; }
      default: throw new Error('unknown tag ' + t);
    }
  }
  const rootType = u8();
  const rootName = str();
  return { type: rootType, name: rootName, value: payload(rootType) };
}

// ---------- Litematica 位解包（THEIR BitArray.get，含 long 边界跨越） ----------
function makeBlockAccessor(longs, bitsPerBlock, paletteSize) {
  const bits = Math.max(2, Math.ceil(Math.log2(paletteSize)));
  const mask = (1n << BigInt(bits)) - 1n;
  return function get(entryIndex) {
    const bitIndex = entryIndex * bits;
    const longIndex = Math.floor(bitIndex / 64);
    const offset = bitIndex % 64;
    let l = longs[longIndex] >> BigInt(offset);
    // 关键：跨越 64-bit 边界时并入下一个 long（Litematica BitArray.get 语义）
    if (offset + bits > 64 && longIndex + 1 < longs.length) {
      l |= longs[longIndex + 1] << BigInt(64 - offset);
    }
    return Number(l & mask);
  };
}

// ---------- 对外接口：解析 litematic 字节 -> { size, palette, blocks } ----------
export async function decodeLitematic(fileOrBuffer) {
  let raw;
  if (fileOrBuffer instanceof ArrayBuffer) raw = new Uint8Array(fileOrBuffer);
  else if (ArrayBuffer.isView(fileOrBuffer)) raw = new Uint8Array(fileOrBuffer.buffer, fileOrBuffer.byteOffset, fileOrBuffer.byteLength);
  else raw = new Uint8Array(await fileOrBuffer.arrayBuffer());

  const nbt = readNBT(await inflateGzip(raw));
  const root = nbt.value;
  const regions = root.Regions.value;

  const regionsOut = [];
  for (const rname of Object.keys(regions)) {
    const reg = regions[rname].value;
    const palette = reg.BlockStatePalette.value.value.map(c => c.Name.value);
    const longs = reg.BlockStates.value;
    const size = reg.Size.value;
    const sx = size.x.value, sy = size.y.value, sz = size.z.value;
    const get = makeBlockAccessor(longs, Math.max(2, Math.ceil(Math.log2(palette.length))), palette.length);
    // Litematica 线性序：x 最快，其次 y，最后 z
    const blocks = [];
    for (let z = 0; z < sz; z++) {
      for (let y = 0; y < sy; y++) {
        for (let x = 0; x < sx; x++) {
          const idx = get(x + y * sx + z * sx * sy);
          const name = palette[idx];
          if (name === 'minecraft:air' || name === 'minecraft:cave_air' || name === 'minecraft:void_air') continue;
          blocks.push({ x, y, z, name });
        }
      }
    }
    regionsOut.push({ name: rname, size: { x: sx, y: sy, z: sz }, palette, blocks });
  }
  return { regions: regionsOut };
}

/*
 * 渲染端复刻说明（mcblock module-53281.js 的 InstancedMesh-per-variant 方案）：
 *   - 按方块状态(variantKey)分组，每组一个 THREE.InstancedMesh
 *   - 逐实例 mesh.setMatrixAt(i, makeTranslation(x - cx, y - cy, z - cz))
 *   - 贴图来自 bundle.zip 的 block-face-textures.json + block-textures/*.png
 *     （单贴图方块六面同图；NearestFilter 保证像素风）
 *   参考实现见 ../player/main.js（数据已由 ../player/build.mjs 预解码）
 */
