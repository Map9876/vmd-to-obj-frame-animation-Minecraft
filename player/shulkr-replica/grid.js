/**
 * grid.js — faithful replica of shulkr.com's world grid.
 *
 * Findings extracted from /tmp/sh_engine.js (shulkr engine):
 *
 * 1. GRID MATERIAL (ShaderMaterial, minified as `Gf`)
 *    Built by the Stage/grid controller `wv`:
 *      new Gf({
 *        transparent: true, depthWrite: false, fog: false, side: 2, // DoubleSide
 *        uniforms: {
 *          uColor:        { value: new X(Cv(t.background)) }, // X=THREE.Color
 *          uMinorOpacity: { value: t.gridMinorOpacity },
 *          uMajorOpacity: { value: t.gridMajorOpacity },
 *          uCenter:       { value: new W(0, 0) }, // W=THREE.Vector2 (world XZ)
 *          uFadeStart:    { value: 140 },
 *          uFadeEnd:      { value: 560 }
 *        },
 *        vertexShader: xv, fragmentShader: Sv
 *      })
 *    Grid mesh: `new gd(new Nf(yv, yv), this.gridMaterial)`
 *      gd=THREE.Mesh, Nf=THREE.PlaneGeometry, yv=8e3 (8000)
 *      rotation.x = -PI/2, position.y = -0.05 (bv=0.05), renderOrder = 0.5
 *
 * 2. COLOR HELPER `Cv(e)` (mirrored exactly):
 *      _v(e) = 0.299*r + 0.587*g + 0.114*b   (relative luminance, r/g/b in [0,1])
 *      Cv(e) = _v(e) > 0.5 ? gv : hv
 *      gv = 8157289  (0x7C6E69 — dark line,  used when BACKGROUND is LIGHT)
 *      hv = 15000280 (0xE4E2D8 — light line, used when BACKGROUND is DARK)
 *    Grid colour is one of two fixed tones picked by BG luminance (subtle contrast).
 *
 * 3. THEME OPACITIES (vv): minor/major line opacity by theme:
 *      dark:  { gridMinorOpacity: .24, gridMajorOpacity: .46 }
 *      light: { gridMinorOpacity: .34, gridMajorOpacity: .6  }
 *    We pick the matching pair from the background luminance.
 *
 * 4. FRAGMENT SHADER `Sv` (verbatim GLSL) draws an adaptive-LOD grid mixing
 *    lineCoverage at three nested cell sizes so minor+major lines keep a
 *    constant pixel width at any zoom, then fades out from `uCenter`.
 *
 * 5. FADE vs STRUCTURE EXTENT (setExtent):
 *      uFadeStart = max(extent*3, 40);  uFadeEnd = max(extent*8, 200)
 */

import * as THREE from 'three';

const GRID_PLANE_SIZE = 8e3;   // yv = 8e3
const GROUND_OFFSET   = 0.05;  // bv = 0.05

const GRID_COLOR_LIGHT_BG = 8157289;  // gv
const GRID_COLOR_DARK_BG  = 15000280; // hv

const OPACITY_DARK_BG  = { minor: 0.24, major: 0.46 };
const OPACITY_LIGHT_BG = { minor: 0.34, major: 0.60 };

function luminance(hex) {
  const r = (hex >> 16 & 255) / 255;
  const g = (hex >> 8 & 255) / 255;
  const b = (hex & 255) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function gridColorForBackground(bgHex) {
  return luminance(bgHex) > 0.5 ? GRID_COLOR_LIGHT_BG : GRID_COLOR_DARK_BG;
}

function toHexInt(c) {
  if (typeof c === 'number' && Number.isFinite(c)) return c >>> 0;
  if (typeof c === 'string') {
    const s = c.trim().replace(/^#/, '');
    if (/^[0-9a-fA-F]{6}$/.test(s)) return parseInt(s, 16) >>> 0;
    if (/^[0-9a-fA-F]{3}$/.test(s)) {
      return parseInt(s.split('').map((x) => x + x).join(''), 16) >>> 0;
    }
  }
  const col = new THREE.Color(c);
  return ((Math.round(col.r * 255) << 16) |
          (Math.round(col.g * 255) << 8) |
           Math.round(col.b * 255)) >>> 0;
}

const VERTEX_SHADER = [
  'varying vec3 vWorldPos;',
  'void main() {',
  '  vec4 wp = modelMatrix * vec4(position, 1.0);',
  '  vWorldPos = wp.xyz;',
  '  gl_Position = projectionMatrix * viewMatrix * wp;',
  '}'
].join('\n');

const FRAGMENT_SHADER = [
  'precision highp float;',
  'varying vec3 vWorldPos;',
  'uniform vec3 uColor;',
  'uniform float uMinorOpacity;',
  'uniform float uMajorOpacity;',
  'uniform vec2 uCenter;',
  'uniform float uFadeStart;',
  'uniform float uFadeEnd;',
  '',
  'const float N = 5.0;',
  'const float TARGET_PX = 32.0;',
  '',
  'float lineCoverage(vec2 coord, float cell, vec2 footprint) {',
  '  vec2 c = coord / cell;',
  '  vec2 d = footprint / cell;',
  '  vec2 g = abs(fract(c - 0.5) - 0.5) / max(d, vec2(1e-5));',
  '  return 1.0 - clamp(min(g.x, g.y), 0.0, 1.0);',
  '}',
  '',
  'void main() {',
  '  vec2 coord = vWorldPos.xz;',
  '  vec2 ddx = dFdx(coord);',
  '  vec2 ddy = dFdy(coord);',
  '  vec2 footprint = vec2(length(vec2(ddx.x, ddy.x)), length(vec2(ddx.y, ddy.y)));',
  '  float unitsPerPixel = sqrt(abs(ddx.x * ddy.y - ddx.y * ddy.x));',
  '',
  '  float lod = max(0.0, log(unitsPerPixel * TARGET_PX) / log(N));',
  '  float f = fract(lod);',
  '  float cell0 = pow(N, floor(lod));',
  '  float cell1 = cell0 * N;',
  '  float cell2 = cell1 * N;',
  '',
  '  float minor = mix(lineCoverage(coord, cell0, footprint), lineCoverage(coord, cell1, footprint), f) * uMinorOpacity;',
  '  float major = mix(lineCoverage(coord, cell1, footprint), lineCoverage(coord, cell2, footprint), f) * uMajorOpacity;',
  '  float alpha = max(minor, major);',
  '',
  '  float dist = length(coord - uCenter);',
  '  alpha *= 1.0 - smoothstep(uFadeStart, uFadeEnd, dist);',
  '',
  '  if (alpha < 0.002) discard;',
  '  gl_FragColor = vec4(uColor, alpha);',
  '}'
].join('\n');

/**
 * Create the shulkr-style world grid.
 *
 * @param {object} opts
 * @param {number} [opts.size=8000]   Plane extent in world units (shulkr: yv=8e3).
 *                                    The plane is huge so it never ends; the fade bounds it.
 * @param {number} [opts.divisions]   Accepted for GridHelper-style API symmetry. UNUSED —
 *                                    shulkr's grid is a continuous adaptive-LOD shader, not a
 *                                    fixed-division lattice.
 * @param {number|string} [opts.bgColorHex=3091488]  Background colour (hex int or CSS string).
 *                                    Drives grid-line colour via Cv() and opacities via theme.
 * @returns {THREE.Mesh}  a GridHelper-like Object3D (flat on XZ at y≈0) with helpers:
 *                        .setGroundY(y), .setExtent(e), .setCenter(x,z), .setBackground(hex)
 */
export function createShulkrGrid({ size = GRID_PLANE_SIZE, divisions, bgColorHex = 3091488 } = {}) {
  const bg = toHexInt(bgColorHex);
  const isLightBg = luminance(bg) > 0.5;
  const op = isLightBg ? OPACITY_LIGHT_BG : OPACITY_DARK_BG;
  const gridColor = gridColorForBackground(bg);

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    fog: false,
    side: THREE.DoubleSide,
    extensions: { derivatives: true },
    uniforms: {
      uColor:        { value: new THREE.Color(gridColor) },
      uMinorOpacity: { value: op.minor },
      uMajorOpacity: { value: op.major },
      uCenter:       { value: new THREE.Vector2(0, 0) },
      uFadeStart:    { value: 140 },
      uFadeEnd:      { value: 560 },
    },
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
  });

  const geometry = new THREE.PlaneGeometry(size, size, 1, 1);
  const grid = new THREE.Mesh(geometry, material);
  grid.name = 'shulkr-grid';
  grid.rotation.x = -Math.PI / 2;
  grid.position.y = -GROUND_OFFSET;
  grid.renderOrder = 0.5;

  grid.setGroundY = (groundY) => { grid.position.y = groundY - GROUND_OFFSET; };
  grid.setExtent = (extent) => {
    material.uniforms.uFadeStart.value = Math.max(extent * 3, 40);
    material.uniforms.uFadeEnd.value   = Math.max(extent * 8, 200);
  };
  grid.setCenter = (x, z) => {
    material.uniforms.uCenter.value.set(x, z);
    grid.position.x = x;
    grid.position.z = z;
  };
  grid.setBackground = (hex) => {
    const h = toHexInt(hex);
    const light = luminance(h) > 0.5;
    const o = light ? OPACITY_LIGHT_BG : OPACITY_DARK_BG;
    material.uniforms.uColor.value.setHex(gridColorForBackground(h));
    material.uniforms.uMinorOpacity.value = o.minor;
    material.uniforms.uMajorOpacity.value = o.major;
  };

  return grid;
}

export default createShulkrGrid;

/*
 * INTEGRATION NOTE (for replica.js):
 *
 *   import { createShulkrGrid } from './grid.js';
 *
 *   const grid = createShulkrGrid({ size: 8000, bgColorHex: scene.background?.getHex?.() ?? 0x2f2c20 });
 *   scene.add(grid);
 *   // once structure bounds are known:
 *   grid.setExtent(structureRadius); // fades floor to background past the model
 */
