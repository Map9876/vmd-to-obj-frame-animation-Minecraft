// =====================================================================
// Bidirectional Data Bridge (双向数据桥)
// ---------------------------------------------------------------------
// Maps our per-frame voxel data (frames.json) <-> shulkr's
// schematic/blueprint structure format.
//
// Our frames.json shape:
//   [ { file, sx, sy, sz,
//       groups: { "<mc-block-name>": [x,y,z, x,y,z, ...], ... } }, ... ]
//
// Canonical blueprint shape (mirrors shulkr's viewer input: a sized region
// + a block palette + per-block coords). block-name IS a Minecraft block
// id, so it is natively isomorphic to shulkr's data model:
//   {
//     format: "shulkr-blueprint",
//     name, size:[sx,sy,sz],
//     palette: [ { id, name, texture } ],        // texture may be null
//     blocks:  [ x,y,z,id,  x,y,z,id, ... ],      // flat, 4 per block
//     regions: [ { min:[x,y,z], max:[x,y,z] } ]
//   }
//
// Three core directions:
//   framesToBlueprint / blueprintToFrames  -> our voxels <-> blueprint
//   blueprintToSchematic / schematicToBlueprint -> blueprint <-> shulkr-importable
// =====================================================================

export function frameToBlueprint(frame, opts = {}) {
  const { sx, sy, sz, groups } = frame;
  const nameToId = Object.create(null);
  const palette = [];
  const blocks = [];
  const textureFor = opts.textureFor || (() => null);

  for (const [name, arr] of Object.entries(groups)) {
    let id = nameToId[name];
    if (id === undefined) {
      id = palette.length;
      nameToId[name] = id;
      palette.push({ id, name, texture: textureFor(name) || null });
    }
    for (let i = 0; i < arr.length; i += 3) {
      blocks.push(arr[i], arr[i + 1], arr[i + 2], id);
    }
  }

  const regions = [{ min: [0, 0, 0], max: [sx - 1, sy - 1, sz - 1] }];
  return {
    format: 'shulkr-blueprint',
    name: frame.file || 'frame',
    size: [sx, sy, sz],
    palette,
    blocks,
    regions,
  };
}

export function framesToBlueprint(frames, opts = {}) {
  const list = Array.isArray(frames) ? frames : [frames];
  return list.map((fr) => frameToBlueprint(fr, opts));
}

export function blueprintToFrame(bp) {
  const groups = Object.create(null);
  const b = bp.blocks;
  for (let i = 0; i < b.length; i += 4) {
    const id = b[i + 3];
    const def = bp.palette[id];
    const name = def ? def.name : 'minecraft:stone';
    let arr = groups[name];
    if (!arr) { arr = []; groups[name] = arr; }
    arr.push(b[i], b[i + 1], b[i + 2]);
  }
  const [sx, sy, sz] = bp.size;
  return { file: bp.name, sx, sy, sz, groups };
}

export function blueprintToFrames(blueprints) {
  const list = Array.isArray(blueprints) ? blueprints : [blueprints];
  return list.map(blueprintToFrame);
}

export function blueprintToSchematic(bp) {
  return {
    format: 'shulkr-blueprint',
    generator: 'mc-voxel-video bridge',
    name: bp.name,
    size: bp.size,
    palette: bp.palette,
    blocks: bp.blocks,
    regions: bp.regions,
  };
}

export function schematicToBlueprint(json) {
  return {
    format: 'shulkr-blueprint',
    name: json.name,
    size: json.size,
    palette: json.palette,
    blocks: json.blocks,
    regions: json.regions || [{ min: [0, 0, 0], max: [json.size[0] - 1, json.size[1] - 1, json.size[2] - 1] }],
  };
}

export function framesToSchematic(frames, opts = {}) {
  return framesToBlueprint(frames, opts).map(blueprintToSchematic);
}
