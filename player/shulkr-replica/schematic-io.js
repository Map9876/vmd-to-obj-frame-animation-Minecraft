// =====================================================================
// schematic-io.js — shulkr.com structure / blueprint import & export
// ---------------------------------------------------------------------
// PART OF: /workspace/mc-voxel-video/player/shulkr-replica/  (do NOT edit
//          engine.js / bridge.js / replica.js / index.html)
//
// This module is the faithful bridge between the REAL shulkr.com file
// format and the replica's internal `shulkr-blueprint` consumed by
// bridge.js / engine.js.
//
// ---------------------------------------------------------------------
// REVERSE-ENGINEERED shulkr SCHEMA  (provenance: /tmp/sh_engine.js)
// ---------------------------------------------------------------------
// Two related shapes exist in shulkr's code:
//
// (A) AUTHENTIC shulkr STRUCTURE  — produced by the engine's region
//     exporter `sa(world, region, sourceFormat='schem')` and the editor
//     export path. This is what a real shulkr-exported .json / pasted
//     structure looks like.  (See sh_engine.js ~line 67285 & 67387.)
//
//     {
//       mcVersion:   <number|string>,        // data version (e.g. 3571)
//       sourceFormat:'schem'|'schematic'|'structure'|'litematic'|'nbt',
//       blocks:      Map | object | array of block entries, keyed by "x,y,z":
//                     entry = {
//                       namespace: 'minecraft',
//                       name:      'stone',            // block id (no ns)
//                       id:        <number>,            // numeric MC id
//                       pos:       { x, y, z },         // relative to bounds.min
//                       properties:{ ... },             // block-state props
//                       stateKey:  'minecraft:stone' | '...[east=true,...]',
//                       blockEntity?: { ... }           // optional
//                     },
//       bounds:      { min:{x,y,z}, max:{x,y,z} }       // size = max-min+1
//     }
//     · air is NEVER stored (only non-air blocks appear).
//     · coordinates are RELATIVE to bounds.min (the exporter subtracts
//       region.min, so the common case is bounds.min = {0,0,0}).
//     · `blocks` is a Map in memory; when serialised to JSON it becomes a
//       plain object keyed by "x,y,z" (key fn = `${x},${y},${z}`).
//
// (B) DENORMALISED "shulkr-blueprint"  — the replica's canonical form
//     (also what bridge.js::schematicToBlueprint already recognises).
//     It is the SAME data but flattened into a palette + a flat int array,
//     which is what engine.js / the replica renderer want to eat:
//
//     {
//       format:  'shulkr-blueprint',
//       name:    <string>,
//       size:    [sx, sy, sz],                 // x=width, y=height, z=depth
//       palette: [ { id, name, texture|null }, ... ],   // name = 'minecraft:stone'
//       blocks:  [ x,y,z,id,  x,y,z,id, ... ],  // flat, 4 ints / block
//       regions: [ { min:[x,y,z], max:[x,y,z] } ]
//     }
//
// parseShulkrStructure(input)   : (A) OR (B)  ->  (B)   (canonical)
// serializeShulkrStructure(bp)  : (B)  ->  (A)            (real file)
//
// Both directions are robust to missing/optional fields and to the
// alternative encodings (size as [x,y,z] or {x,y,z}; blocks as flat
// array, array-of-objects, or "x,y,z"-keyed object; palette ids present
// or implied by index).
// =====================================================================

// mcVersion the replica stamps on exported structures. shulkr's engine
// uses an internal constant (Qi) we cannot read here; this is a safe,
// recent-ish placeholder. Override via opts.mcVersion if you know it.
const DEFAULT_MC_VERSION = 3571;
const DEFAULT_SOURCE_FORMAT = 'schem';

// ---------------------------------------------------------------------
// small helpers
// ---------------------------------------------------------------------

function toInt(v, fallback = 0) {
  const n = typeof v === 'string' ? parseInt(v, 10) : v;
  return Number.isFinite(n) ? n : fallback;
}

// size: accept [x,y,z] or {x,y,z}
function readSize(size) {
  if (Array.isArray(size)) return [toInt(size[0]), toInt(size[1]), toInt(size[2])];
  if (size && typeof size === 'object') {
    return [toInt(size.x), toInt(size.y), toInt(size.z)];
  }
  return null;
}

// split a block name into [namespace, name]; default namespace = minecraft
function splitName(name) {
  if (typeof name !== 'string') return ['minecraft', 'stone'];
  if (name.includes(':')) {
    const i = name.indexOf(':');
    return [name.slice(0, i) || 'minecraft', name.slice(i + 1)];
  }
  return ['minecraft', name];
}

// best-effort block id (string) from a structure block entry
function entryName(e) {
  if (!e || typeof e !== 'object') return 'minecraft:air';
  if (e.namespace && e.name) {
    return `${e.namespace}:${e.name}`;
  }
  if (typeof e.name === 'string') {
    return e.name.includes(':') ? e.name : `minecraft:${e.name}`;
  }
  if (typeof e.stateKey === 'string') {
    // stateKey may be 'minecraft:oak_fence[east=false,...]' -> base id
    const base = e.stateKey.split('[')[0];
    return base.includes(':') ? base : `minecraft:${base}`;
  }
  if (typeof e.id === 'string' && e.id.includes(':')) return e.id;
  return 'minecraft:air';
}

// pull {x,y,z} out of a structure block entry (pos.x/y/z or x/y/z)
function entryPos(e) {
  if (e.pos && typeof e.pos === 'object') {
    return [toInt(e.pos.x), toInt(e.pos.y), toInt(e.pos.z)];
  }
  return [toInt(e.x), toInt(e.y), toInt(e.z)];
}

// iterate every block entry from a structure's `blocks` field regardless
// of whether it is a Map, a "x,y,z"-keyed object, or a plain array.
function* eachEntry(blocks) {
  if (!blocks) return;
  if (blocks instanceof Map) {
    for (const v of blocks.values()) yield v;
    return;
  }
  if (Array.isArray(blocks)) {
    for (const v of blocks) {
      if (v && typeof v === 'object') yield v;
    }
    return;
  }
  if (typeof blocks === 'object') {
    for (const v of Object.values(blocks)) {
      if (v && typeof v === 'object') yield v;
    }
  }
}

function defaultRegions(size) {
  if (!size) return [];
  const [sx, sy, sz] = size;
  return [{ min: [0, 0, 0], max: [sx - 1, sy - 1, sz - 1] }];
}

// ---------------------------------------------------------------------
// (B) denormalised blueprint  ->  canonical (B)  (normalise / validate)
// ---------------------------------------------------------------------

function normalizeBlueprint(data) {
  const name = typeof data.name === 'string' ? data.name : 'structure';
  const size = readSize(data.size) || [0, 0, 0];

  // ---- palette ----
  let palette = Array.isArray(data.palette) ? data.palette.slice() : [];
  palette = palette.map((p, i) => {
    const id = Number.isInteger(p && p.id) ? p.id : i;
    const nm = typeof p === 'string' ? p : (p && p.name) || `minecraft:unknown_${i}`;
    const tex = (p && (p.texture ?? p.textureUrl ?? null)) || null;
    return { id, name: nm, texture: tex };
  });
  // re-index palette so ids are contiguous 0..n-1 and lookups are O(1)
  const byOldId = new Map();
  palette.forEach((p, i) => byOldId.set(p.id, i));
  const reindexed = palette.map((p, i) => ({ id: i, name: p.name, texture: p.texture }));

  // map an OLD palette id -> NEW palette id
  const mapId = (oldId) => {
    if (byOldId.has(oldId)) return byOldId.get(oldId);
    return oldId; // best effort
  };

  // ---- blocks ----
  let flat = [];
  const b = data.blocks;
  if (Array.isArray(b)) {
    if (b.length && typeof b[0] === 'number') {
      // already flat [x,y,z,id, ...]
      flat = b.slice();
    } else {
      // array of objects {x,y,z,id|name}
      for (const e of b) {
        const [x, y, z] = entryPos(e);
        let id;
        if (Number.isInteger(e.id)) id = mapId(e.id);
        else {
          const nm = entryName(e);
          let found = reindexed.findIndex((p) => p.name === nm);
          if (found < 0) {
            found = reindexed.length;
            reindexed.push({ id: found, name: nm, texture: null });
          }
          id = found;
        }
        flat.push(x, y, z, id);
      }
    }
  } else if (b && typeof b === 'object') {
    // "x,y,z"-keyed object of block objects
    for (const e of eachEntry(b)) {
      const [x, y, z] = entryPos(e);
      let id;
      if (Number.isInteger(e.id)) id = mapId(e.id);
      else {
        const nm = entryName(e);
        let found = reindexed.findIndex((p) => p.name === nm);
        if (found < 0) {
          found = reindexed.length;
          reindexed.push({ id: found, name: nm, texture: null });
        }
        id = found;
      }
      flat.push(x, y, z, id);
    }
  }

  const regions =
    Array.isArray(data.regions) && data.regions.length
      ? data.regions.map((r) => ({
          min: Array.isArray(r.min) ? r.min.slice() : [r.min?.x, r.min?.y, r.min?.z],
          max: Array.isArray(r.max) ? r.max.slice() : [r.max?.x, r.max?.y, r.max?.z],
        }))
      : defaultRegions(size);

  return {
    format: 'shulkr-blueprint',
    name,
    size,
    palette: reindexed,
    blocks: flat,
    regions,
  };
}

// ---------------------------------------------------------------------
// (A) authentic shulkr structure  ->  canonical (B)
// ---------------------------------------------------------------------

function structureToBlueprint(data, opts = {}) {
  const name =
    typeof data.name === 'string'
      ? data.name
      : typeof data.structureName === 'string'
      ? data.structureName
      : 'structure';

  // ---- gather blocks + build palette (dedup by name) ----
  const paletteByName = new Map();
  const palette = [];
  const flat = [];

  const ensurePalette = (nm) => {
    let idx = paletteByName.get(nm);
    if (idx === undefined) {
      idx = palette.length;
      paletteByName.set(nm, idx);
      palette.push({ id: idx, name: nm, texture: null });
    }
    return idx;
  };

  for (const e of eachEntry(data.blocks)) {
    const [x, y, z] = entryPos(e);
    const nm = entryName(e);
    const id = ensurePalette(nm);
    flat.push(x, y, z, id);
  }

  // ---- bounds / size ----
  let bounds = data.bounds;
  if (!bounds || !bounds.max) {
    // derive from blocks
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    for (let i = 0; i < flat.length; i += 4) {
      const x = flat[i], y = flat[i + 1], z = flat[i + 2];
      if (x < minX) minX = x; if (y < minY) minY = y; if (z < minZ) minZ = z;
      if (x > maxX) maxX = x; if (y > maxY) maxY = y; if (z > maxZ) maxZ = z;
    }
    if (!Number.isFinite(minX)) { minX = minY = minZ = 0; maxX = maxY = maxZ = -1; }
    bounds = { min: { x: minX, y: minY, z: minZ }, max: { x: maxX, y: maxY, z: maxZ } };
  }

  const bmin = bounds.min, bmax = bounds.max;
  const size = [
    Math.max(0, toInt(bmax.x) - toInt(bmin.x) + 1),
    Math.max(0, toInt(bmax.y) - toInt(bmin.y) + 1),
    Math.max(0, toInt(bmax.z) - toInt(bmin.z) + 1),
  ];

  // if bounds.min is non-zero, shift blocks so the replica (which assumes
  // 0-origin) keeps a correct relative layout.
  const ox = toInt(bmin.x), oy = toInt(bmin.y), oz = toInt(bmin.z);
  if (ox || oy || oz) {
    for (let i = 0; i < flat.length; i += 4) {
      flat[i] -= ox; flat[i + 1] -= oy; flat[i + 2] -= oz;
    }
  }

  const regions = [
    { min: [0, 0, 0], max: [size[0] - 1, size[1] - 1, size[2] - 1] },
  ];

  return {
    format: 'shulkr-blueprint',
    name,
    size,
    palette,
    blocks: flat,
    regions,
  };
}

// ---------------------------------------------------------------------
// PUBLIC: parseShulkrStructure
// ---------------------------------------------------------------------

export function parseShulkrStructure(input, opts = {}) {
  let data = input;
  if (typeof input === 'string') {
    data = JSON.parse(input);
  }
  if (Array.isArray(data)) {
    // a frames array slipped in — take the first structure
    data = data[0] || {};
  }
  if (!data || typeof data !== 'object') {
    throw new Error('parseShulkrStructure: expected a shulkr structure object or JSON string');
  }

  // Already denormalised blueprint? (palette + size/blocks present)
  if (data.palette && (data.size || data.blocks)) {
    return normalizeBlueprint(data);
  }

  // Authentic shulkr structure (mcVersion/sourceFormat/blocks/bounds)
  if (data.blocks || data.bounds) {
    return structureToBlueprint(data, opts);
  }

  // Last resort: treat as denormalised blueprint
  return normalizeBlueprint(data);
}

// ---------------------------------------------------------------------
// PUBLIC: serializeShulkrStructure  (canonical (B) -> authentic (A))
// ---------------------------------------------------------------------

export function serializeShulkrStructure(blueprint, opts = {}) {
  const bp = blueprint && blueprint.palette ? blueprint : parseShulkrStructure(blueprint, opts);

  const [sx, sy, sz] = bp.size;
  const mcVersion = opts.mcVersion ?? bp.mcVersion ?? DEFAULT_MC_VERSION;
  const sourceFormat = opts.sourceFormat ?? bp.sourceFormat ?? DEFAULT_SOURCE_FORMAT;

  // bounds: replica coordinates are 0-origin -> emit {0,0,0}..{sx-1,...}
  const bounds = {
    min: { x: 0, y: 0, z: 0 },
    max: { x: sx - 1, y: sy - 1, z: sz - 1 },
  };

  // build a lookup: name -> {namespace, name, stateKey}
  const blocksObj = {};
  const b = bp.blocks;
  for (let i = 0; i < b.length; i += 4) {
    const x = b[i], y = b[i + 1], z = b[i + 2];
    const id = b[i + 3];
    const def = bp.palette[id] || { name: 'minecraft:air' };
    const [namespace, name] = splitName(def.name);
    const key = `${x},${y},${z}`;
    blocksObj[key] = {
      namespace,
      name,
      id: Number.isInteger(def.id) ? def.id : id,
      pos: { x, y, z },
      properties: {},
      stateKey: `${namespace}:${name}`,
    };
  }

  return {
    name: bp.name,
    mcVersion,
    sourceFormat,
    blocks: blocksObj,
    bounds,
  };
}

// convenience stringifier used by the export button
export function serializeShulkrStructureToString(blueprint, opts = {}) {
  return JSON.stringify(serializeShulkrStructure(blueprint, opts), null, 2);
}

// expose the reverse-engineered markers for documentation / debugging
export const SHULKR_SCHEMA = {
  format: 'shulkr-blueprint',
  authenticStructure: {
    fields: ['mcVersion', 'sourceFormat', 'blocks', 'bounds'],
    blockEntry: ['namespace', 'name', 'id', 'pos', 'properties', 'stateKey', 'blockEntity?'],
  },
  blueprint: {
    fields: ['format', 'name', 'size', 'palette', 'blocks', 'regions'],
    paletteEntry: ['id', 'name', 'texture|null'],
  },
};
