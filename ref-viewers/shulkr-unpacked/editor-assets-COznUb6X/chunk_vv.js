import { l } from "../dist-C5TDMOul.js";
import { W } from "./chunk_kc.js";
import { Nf, Pl, gd } from "./chunk_Pl.js";
import { X } from "./chunk_Ys.js";
import { Gf } from "./chunk_Rf.js";
import { Cv } from "./chunk_hv.js";
const vv = {
    dark: {
        background: 3091488,
        gridMinorOpacity: 0.24,
        gridMajorOpacity: 0.46
    },
    light: {
        background: 16053230,
        gridMinorOpacity: 0.34,
        gridMajorOpacity: 0.6
    }
};
const yv = 8000;
const bv = 0.05;
const vertexShader = `
  varying vec3 vWorldPos;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;
const fragmentShader = `
  precision highp float;
  varying vec3 vWorldPos;
  uniform vec3 uColor;
  uniform float uMinorOpacity;
  uniform float uMajorOpacity;
  uniform vec2 uCenter;
  uniform float uFadeStart;
  uniform float uFadeEnd;

  const float N = 5.0;
  const float TARGET_PX = 32.0;

  float lineCoverage(vec2 coord, float cell, vec2 footprint) {
    vec2 c = coord / cell;
    vec2 d = footprint / cell;
    vec2 g = abs(fract(c - 0.5) - 0.5) / max(d, vec2(1e-5));
    return 1.0 - clamp(min(g.x, g.y), 0.0, 1.0);
  }

  void main() {
    vec2 coord = vWorldPos.xz;
    vec2 ddx = dFdx(coord);
    vec2 ddy = dFdy(coord);
    vec2 footprint = vec2(length(vec2(ddx.x, ddy.x)), length(vec2(ddx.y, ddy.y)));
    float unitsPerPixel = sqrt(abs(ddx.x * ddy.y - ddx.y * ddy.x));

    float lod = max(0.0, log(unitsPerPixel * TARGET_PX) / log(N));
    float f = fract(lod);
    float cell0 = pow(N, floor(lod));
    float cell1 = cell0 * N;
    float cell2 = cell1 * N;

    float minor = mix(lineCoverage(coord, cell0, footprint), lineCoverage(coord, cell1, footprint), f) * uMinorOpacity;
    float major = mix(lineCoverage(coord, cell1, footprint), lineCoverage(coord, cell2, footprint), f) * uMajorOpacity;
    float alpha = max(minor, major);

    float dist = length(coord - uCenter);
    alpha *= 1.0 - smoothstep(uFadeStart, uFadeEnd, dist);

    if (alpha < 0.002) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;
export class wv {
    constructor(e){
        this.scene = e;
        this.fogEnabled = true;
        this.theme = `dark`;
        let t = vv[this.theme];
        this.background = t.background;
        e.background = new X(t.background);
        this.gridMaterial = new Gf({
            transparent: true,
            depthWrite: false,
            fog: false,
            side: 2,
            uniforms: {
                uColor: {
                    value: new X(Cv(t.background))
                },
                uMinorOpacity: {
                    value: t.gridMinorOpacity
                },
                uMajorOpacity: {
                    value: t.gridMajorOpacity
                },
                uCenter: {
                    value: new W(0, 0)
                },
                uFadeStart: {
                    value: 140
                },
                uFadeEnd: {
                    value: 560
                }
            },
            vertexShader,
            fragmentShader
        });
        this.grid = new gd(new Nf(yv, yv), this.gridMaterial);
        this.grid.rotation.x = -Math.PI / 2;
        this.grid.position.y = -0.05;
        this.grid.renderOrder = 0.5;
        e.add(this.grid);
        this.fog = new Pl(new X(t.background), 120, 600);
        e.fog = this.fog;
    }
    setGroundY(e) {
        this.grid.position.y = e - bv;
    }
    setGridVisible(e) {
        this.grid.visible = e;
    }
    setFogVisible(e) {
        this.fogEnabled = e;
        this.scene.fog = e && this.background !== null ? this.fog : null;
    }
    setBackground(e) {
        this.background = e;
        this.scene.background = e === null ? null : new X(e);
        this.scene.fog = e === null || !this.fogEnabled ? null : this.fog;
        if (e !== null) {
            this.fog.color.setHex(e);
            this.gridMaterial.uniforms.uColor.value.setHex(Cv(e));
        }
    }
    getBackground() {
        return this.background;
    }
    setExtent(e) {
        this.gridMaterial.uniforms.uFadeStart.value = Math.max(e * 3, 40);
        this.gridMaterial.uniforms.uFadeEnd.value = Math.max(e * 8, 200);
        this.fog.near = Math.max(e * 5, 120);
        this.fog.far = Math.max(e * 16, 600);
    }
    setTheme(e) {
        if (e === this.theme) {
            return;
        }
        this.theme = e;
        let t = vv[e];
        this.gridMaterial.uniforms.uMinorOpacity.value = t.gridMinorOpacity;
        this.gridMaterial.uniforms.uMajorOpacity.value = t.gridMajorOpacity;
        if (this.background !== null) {
            this.setBackground(t.background);
        }
    }
    update(e, t) {
        this.grid.position.x = t.x;
        this.grid.position.z = t.z;
        this.grid.renderOrder = e.y >= this.grid.position.y ? 0.5 : 2;
        this.gridMaterial.uniforms.uCenter.value.set(t.x, t.z);
    }
    dispose() {
        this.grid.geometry.dispose();
        this.gridMaterial.dispose();
    }
}
const Tv = [
    0.5,
    1,
    2,
    4
];
export function Ev(e) {
    return Tv.some((t)=>t === e);
}
export function Dv(e, t) {
    let n = Tv.indexOf(e) + t;
    return Tv[Math.min(Math.max(n, 0), Tv.length - 1)];
}
export function Ov(e) {
    return Tv[(Tv.indexOf(e) + 1) % Tv.length];
}
