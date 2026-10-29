// face-shading.js
// ---------------------------------------------------------------
// Face shading + ambient occlusion for the shulkr engine replica.
//
// WHAT SHULKR ACTUALLY DOES (reverse-engineered from /tmp/sh_engine.js):
//
//   shulkr's voxel mesher (the `yi` / `vi` functions) does NOT bake a
//   static per-direction brightness multiplier into its cube geometry.
//   Instead every block vertex colour is computed as:
//
//       color = AO_level * dimFactor * faceTint * modelColor
//
//   where:
//     * AO_level  comes from the ambient-occlusion sampler `mi`, indexed
//                 into `di = [1, .7, .5, .2]`  (sh_engine.js)
//                 -> 4 discrete occlusion brightness levels.
//     * dimFactor is `li = .3` applied only when `dimAt(x,y,z)` is truthy
//                 (a per-dimension "dim" flag, e.g. the Nether); otherwise 1.
//     * faceTint / modelColor come from the block model's own `color` field
//                 (default white 1,1,1) and the per-face `tintindex`.
//
//   There is NO occurrence of the Minecraft classic directional shade
//   array [0.6,0.6,1.0,0.5,0.8,0.8] anywhere in sh_engine.js, and the
//   parsed block-model `shade` flag is stored but never consumed for a
//   directional multiply.
//
//   => shulkr's "per-face brightness" is produced by per-VERTEX AO, not by
//      a fixed +X/-X/+Y/-Y/+Z/-Z shade table.
//
// For the replica we render individual cubes with THREE.BoxGeometry, which
// have no neighbouring blocks to occlude them; AO therefore collapses to 1.0
// and a cube would look flat without a directional term. To recover the
// canonical Minecraft look that shulkr visually reproduces, we export the
// Minecraft-standard directional brightness as `FACE_SHADE` and multiply it
// by the (optionally supplied) AO term, mirroring how Minecraft combines
// direction shade * AO. This is the faithful visual result.
// ---------------------------------------------------------------

import * as THREE from 'three';

// Minecraft canonical per-face directional brightness, in the same order
// THREE.BoxGeometry builds its faces:
//   index 0 = +X (east)  -> 0.6
//   index 1 = -X (west)  -> 0.6
//   index 2 = +Y (up)    -> 1.0
//   index 3 = -Y (down)  -> 0.5
//   index 4 = +Z (north/south) -> 0.8
//   index 5 = -Z (south/north) -> 0.8
export const FACE_SHADE = [0.6, 0.6, 1.0, 0.5, 0.8, 0.8];

// shulkr's actual ambient-occlusion brightness levels (`di` in sh_engine.js).
// Index 0 = fully lit, 3 = most occluded. Used by shulkrFaceVertexColors
// when real neighbour/occlusion data is supplied.
export const AO_LEVELS = [1.0, 0.7, 0.5, 0.2];

// THREE.BoxGeometry emits 4 vertices per face, in this order:
export const BOX_FACE_ORDER = ['+X', '-X', '+Y', '-Y', '+Z', '-Z'];

/**
 * Build a per-vertex `color` attribute for a THREE.BoxGeometry, applying the
 * per-face directional shade (FACE_SHADE) and, optionally, an ambient-occlusion
 * term (shulkr's AO_LEVELS model).
 *
 * @param {THREE.BoxGeometry} geometry - a standard THREE.BoxGeometry (24 verts,
 *        4 per face, in +X,-X,+Y,-Y,+Z,-Z order).
 * @param {Object} [opts]
 * @param {boolean|number[]} [opts.ao=true]
 *        - true  : apply AO. With no `aoFactors` supplied (a lone cube has no
 *                  occluding neighbours) every vertex is fully lit (AO = 1.0).
 *        - false : no AO, AO term = 1.0 for all vertices.
 *        - number[] : explicit per-vertex AO multipliers (length must equal
 *                  geometry vertex count, i.e. 24). Values are clamped to
 *                  [0, 1]; pass AO_LEVELS indices' brightness directly.
 * @param {number[]} [opts.aoFactors] Optional explicit per-vertex AO multipliers
 *        (length === vertex count). Overrides `ao=true` sampling.
 * @returns {Float32Array} the colour attribute array (length = verts * 3).
 */
export function shulkrFaceVertexColors(geometry, { ao = true, aoFactors = null } = {}) {
  const pos = geometry.attributes.position;
  if (!pos) {
    throw new Error('shulkrFaceVertexColors: geometry has no "position" attribute');
  }

  const vertCount = pos.count;            // 24 for a standard BoxGeometry
  const vertsPerFace = vertCount / 6;     // 4
  if (!Number.isInteger(vertsPerFace)) {
    throw new Error(
      'shulkrFaceVertexColors: expected 4 vertices per face (24 total for BoxGeometry)'
    );
  }

  const colors = new Float32Array(vertCount * 3);

  // Resolve the AO term per vertex.
  let aoFor = null; // function(index) -> number in [0,1]
  if (Array.isArray(aoFactors)) {
    if (aoFactors.length !== vertCount) {
      throw new Error(
        `shulkrFaceVertexColors: aoFactors length ${aoFactors.length} != vertex count ${vertCount}`
      );
    }
    aoFor = (i) => Math.min(1, Math.max(0, aoFactors[i]));
  } else if (ao === true) {
    // No neighbour data for a standalone box -> everything fully lit (AO = 1).
    aoFor = () => 1.0;
  } else {
    aoFor = () => 1.0;
  }

  for (let face = 0; face < 6; face++) {
    const shade = FACE_SHADE[face];
    for (let v = 0; v < vertsPerFace; v++) {
      const idx = face * vertsPerFace + v;
      const c = shade * aoFor(idx);
      colors[idx * 3 + 0] = c;
      colors[idx * 3 + 1] = c;
      colors[idx * 3 + 2] = c;
    }
  }

  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  return colors;
}
