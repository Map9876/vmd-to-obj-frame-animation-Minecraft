import { ShaderChunk } from "./module-87548.js";
import { $EB as side, CSG, Ho_, I9Y, LlO, N5j, Pq0, _4j, aVO, eaF } from "./module-85339.js";
export let Do = /\bvoid\s+main\s*\(\s*\)\s*{/g;
function o(e) {
    return e.replace(/^[ \t]*#include +<([\w\d./]+)>/gm, (e, t)=>{
        let r = ShaderChunk[t];
        if (r) {
            return o(r);
        }
        return e;
    });
}
let l = [];
for(let e = 0; e < 256; e++){
    l[e] = (e < 16 ? "0" : "") + e.toString(16);
}
let s = Object.assign || function(e) {
    for(let t = 1, r = arguments.length; t < r; t++){
        let r = arguments[t];
        if (r) {
            for(let t in r){
                if (Object.prototype.hasOwnProperty.call(r, t)) {
                    e[t] = r[t];
                }
            }
        }
    }
    return e;
};
let f = Date.now();
let c = new WeakMap;
let u = new Map;
let v = 10000000000;
export function Fh(e, t) {
    let r = ((e)=>{
        let t = JSON.stringify(e, g);
        let r = m.get(t);
        if (r == null) {
            m.set(t, r = ++p);
        }
        return r;
    })(t);
    let n = c.get(e);
    if (!n) {
        c.set(e, n = Object.create(null));
    }
    if (n[r]) {
        return new n[r];
    }
    let i = `_onBeforeCompile${r}`;
    let b = function(n, a) {
        e.onBeforeCompile.call(this, n, a);
        let l = `${this.customProgramCacheKey()}|${n.vertexShader}|${n.fragmentShader}`;
        let c = u[l];
        if (!c) {
            let e = ((e, { vertexShader, fragmentShader }, { vertexDefs, vertexMainIntro, vertexMainOutro, vertexTransform, fragmentDefs, fragmentMainIntro, fragmentMainOutro, fragmentColorTransform, customRewriter, timeUniform }, a)=>{
                vertexDefs = vertexDefs || "";
                vertexMainIntro = vertexMainIntro || "";
                vertexMainOutro = vertexMainOutro || "";
                fragmentDefs = fragmentDefs || "";
                fragmentMainIntro = fragmentMainIntro || "";
                fragmentMainOutro = fragmentMainOutro || "";
                if (vertexTransform || customRewriter) {
                    vertexShader = o(vertexShader);
                }
                if (fragmentColorTransform || customRewriter) {
                    fragmentShader = o(fragmentShader = fragmentShader.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm, "\n//!BEGIN_POST_CHUNK $1\n$&\n//!END_POST_CHUNK\n"));
                }
                if (customRewriter) {
                    let e = customRewriter({
                        vertexShader,
                        fragmentShader
                    });
                    vertexShader = e.vertexShader;
                    fragmentShader = e.fragmentShader;
                }
                if (fragmentColorTransform) {
                    let e = [];
                    fragmentShader = fragmentShader.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm, (t)=>{
                        e.push(t);
                        return "";
                    });
                    fragmentMainOutro = `${fragmentColorTransform}
${e.join("\n")}
${fragmentMainOutro}`;
                }
                if (timeUniform) {
                    let e = `
uniform float ${timeUniform};
`;
                    vertexDefs = e + vertexDefs;
                    fragmentDefs = e + fragmentDefs;
                }
                if (vertexTransform) {
                    vertexShader = `vec3 troika_position_${a};
vec3 troika_normal_${a};
vec2 troika_uv_${a};
${vertexShader}
`;
                    vertexDefs = `${vertexDefs}
void troikaVertexTransform${a}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${vertexTransform}
}
`;
                    vertexMainIntro = `
troika_position_${a} = vec3(position);
troika_normal_${a} = vec3(normal);
troika_uv_${a} = vec2(uv);
troikaVertexTransform${a}(troika_position_${a}, troika_normal_${a}, troika_uv_${a});
${vertexMainIntro}
`;
                    vertexShader = vertexShader.replace(/\b(position|normal|uv)\b/g, (e, t, r, n)=>{
                        if (/\battribute\s+vec[23]\s+$/.test(n.substr(0, r))) {
                            return t;
                        }
                        return `troika_${t}_${a}`;
                    });
                    if (!(e.map && e.map.channel > 0)) {
                        vertexShader = vertexShader.replace(/\bMAP_UV\b/g, `troika_uv_${a}`);
                    }
                }
                return {
                    vertexShader: vertexShader = h(vertexShader, a, vertexDefs, vertexMainIntro, vertexMainOutro),
                    fragmentShader: fragmentShader = h(fragmentShader, a, fragmentDefs, fragmentMainIntro, fragmentMainOutro)
                };
            })(this, n, t, r);
            c = u[l] = e;
        }
        n.vertexShader = c.vertexShader;
        n.fragmentShader = c.fragmentShader;
        s(n.uniforms, this.uniforms);
        if (t.timeUniform) {
            n.uniforms[t.timeUniform] = {
                get value () {
                    return Date.now() - f;
                }
            };
        }
        if (this[i]) {
            this[i](n);
        }
    };
    let y = function() {
        return _(t.chained ? e : e.clone());
    };
    let _ = (n)=>{
        let a = Object.create(n, w);
        Object.defineProperty(a, "baseMaterial", {
            value: e
        });
        Object.defineProperty(a, "id", {
            value: v++
        });
        a.uuid = (()=>{
            let e = 4294967295 * Math.random() | 0;
            let t = 4294967295 * Math.random() | 0;
            let r = 4294967295 * Math.random() | 0;
            let n = 4294967295 * Math.random() | 0;
            return `${l[255 & e] + l[e >> 8 & 255] + l[e >> 16 & 255] + l[e >> 24 & 255]}-${l[255 & t]}${l[t >> 8 & 255]}-${l[t >> 16 & 15 | 64]}${l[t >> 24 & 255]}-${l[63 & r | 128]}${l[r >> 8 & 255]}-${l[r >> 16 & 255]}${l[r >> 24 & 255]}${l[255 & n]}${l[n >> 8 & 255]}${l[n >> 16 & 255]}${l[n >> 24 & 255]}`.toUpperCase();
        })();
        a.uniforms = s({}, n.uniforms, t.uniforms);
        a.defines = s({}, n.defines, t.defines);
        a.defines[`TROIKA_DERIVED_MATERIAL_${r}`] = "";
        a.extensions = s({}, n.extensions, t.extensions);
        a._listeners = undefined;
        return a;
    };
    let w = {
        constructor: {
            value: y
        },
        isDerivedMaterial: {
            value: true
        },
        type: {
            get: ()=>e.type,
            set: (t)=>{
                e.type = t;
            }
        },
        isDerivedFrom: {
            writable: true,
            configurable: true,
            value: function(e) {
                let baseMaterial = this.baseMaterial;
                return e === baseMaterial || baseMaterial.isDerivedMaterial && baseMaterial.isDerivedFrom(e) || false;
            }
        },
        customProgramCacheKey: {
            writable: true,
            configurable: true,
            value: function() {
                return `${e.customProgramCacheKey()}|${r}`;
            }
        },
        onBeforeCompile: {
            get: ()=>b,
            set (e) {
                this[i] = e;
            }
        },
        copy: {
            writable: true,
            configurable: true,
            value: function(t) {
                e.copy.call(this, t);
                if (!(e.isShaderMaterial || e.isDerivedMaterial)) {
                    s(this.extensions, t.extensions);
                    s(this.defines, t.defines);
                    s(this.uniforms, LlO.clone(t.uniforms));
                }
                return this;
            }
        },
        clone: {
            writable: true,
            configurable: true,
            value: function() {
                return _(new e.constructor).copy(this);
            }
        },
        getDepthMaterial: {
            writable: true,
            configurable: true,
            value: function() {
                let _depthMaterial = this._depthMaterial;
                if (!_depthMaterial) {
                    (_depthMaterial = this._depthMaterial = Fh(e.isDerivedMaterial ? e.getDepthMaterial() : new CSG({
                        depthPacking: N5j
                    }), t)).defines.IS_DEPTH_MATERIAL = "";
                    _depthMaterial.uniforms = this.uniforms;
                }
                return _depthMaterial;
            }
        },
        getDistanceMaterial: {
            writable: true,
            configurable: true,
            value: function() {
                let _distanceMaterial = this._distanceMaterial;
                if (!_distanceMaterial) {
                    (_distanceMaterial = this._distanceMaterial = Fh(e.isDerivedMaterial ? e.getDistanceMaterial() : new aVO, t)).defines.IS_DISTANCE_MATERIAL = "";
                    _distanceMaterial.uniforms = this.uniforms;
                }
                return _distanceMaterial;
            }
        },
        dispose: {
            writable: true,
            configurable: true,
            value () {
                let { _depthMaterial, _distanceMaterial } = this;
                if (_depthMaterial) {
                    _depthMaterial.dispose();
                }
                if (_distanceMaterial) {
                    _distanceMaterial.dispose();
                }
                e.dispose.call(this);
            }
        }
    };
    n[r] = y;
    return new y;
}
function h(e, t, r, n, a) {
    if (n || a || r) {
        e = e.replace(Do, `
${r}
void troikaOrigMain${t}() {`) + `
void main() {
  ${n}
  troikaOrigMain${t}();
  ${a}
}`;
    }
    return e;
}
function g(e, t) {
    if (e === "uniforms") {
        return undefined;
    }
    if (typeof t === "function") {
        return t.toString();
    }
    return t;
}
let p = 0;
let m = new Map;
let vertexDefs = `
uniform vec3 pointA;
uniform vec3 controlA;
uniform vec3 controlB;
uniform vec3 pointB;
uniform float radius;
varying float bezierT;

vec3 cubicBezier(vec3 p1, vec3 c1, vec3 c2, vec3 p2, float t) {
  float t2 = 1.0 - t;
  float b0 = t2 * t2 * t2;
  float b1 = 3.0 * t * t2 * t2;
  float b2 = 3.0 * t * t * t2;
  float b3 = t * t * t;
  return b0 * p1 + b1 * c1 + b2 * c2 + b3 * p2;
}

vec3 cubicBezierDerivative(vec3 p1, vec3 c1, vec3 c2, vec3 p2, float t) {
  float t2 = 1.0 - t;
  return -3.0 * p1 * t2 * t2 +
    c1 * (3.0 * t2 * t2 - 6.0 * t2 * t) +
    c2 * (6.0 * t2 * t - 3.0 * t * t) +
    3.0 * p2 * t * t;
}
`;
let vertexTransform = `
float t = position.y;
bezierT = t;
vec3 bezierCenterPos = cubicBezier(pointA, controlA, controlB, pointB, t);
vec3 bezierDir = normalize(cubicBezierDerivative(pointA, controlA, controlB, pointB, t));

// Make "sideways" always perpendicular to the camera ray; this ensures that any twists
// in the cylinder occur where you won't see them: 
vec3 viewDirection = normalMatrix * vec3(0.0, 0.0, 1.0);
if (bezierDir == viewDirection) {
  bezierDir = normalize(cubicBezierDerivative(pointA, controlA, controlB, pointB, t == 1.0 ? t - 0.0001 : t + 0.0001));
}
vec3 sideways = normalize(cross(bezierDir, viewDirection));
vec3 upish = normalize(cross(sideways, bezierDir));

// Build a matrix for transforming this disc in the cylinder:
mat4 discTx;
discTx[0].xyz = sideways * radius;
discTx[1].xyz = bezierDir * radius;
discTx[2].xyz = upish * radius;
discTx[3].xyz = bezierCenterPos;
discTx[3][3] = 1.0;

// Apply transform, ignoring original y
position = (discTx * vec4(position.x, 0.0, position.z, 1.0)).xyz;
normal = normalize(mat3(discTx) * normal);
`;
let fragmentDefs = `
uniform vec3 dashing;
varying float bezierT;
`;
let fragmentMainIntro = `
if (dashing.x + dashing.y > 0.0) {
  float dashFrac = mod(bezierT - dashing.z, dashing.x + dashing.y);
  if (dashFrac > dashing.x) {
    discard;
  }
}
`;
let x = null;
let E = new _4j({
    color: 16777215,
    side
});
class M extends eaF {
    static getGeometry() {
        return x || (x = new Ho_(1, 1, 1, 6, 64).translate(0, 0.5, 0));
    }
    constructor(){
        super(M.getGeometry(), E);
        this.pointA = new Pq0;
        this.controlA = new Pq0;
        this.controlB = new Pq0;
        this.pointB = new Pq0;
        this.radius = 0.01;
        this.dashArray = new I9Y;
        this.dashOffset = 0;
        this.frustumCulled = false;
    }
    get material() {
        let _derivedMaterial = this._derivedMaterial;
        let t = this._baseMaterial || this._defaultMaterial || (this._defaultMaterial = E.clone());
        if (!(_derivedMaterial && _derivedMaterial.baseMaterial === t)) {
            _derivedMaterial = this._derivedMaterial = Fh(t, {
                chained: true,
                uniforms: {
                    pointA: {
                        value: new Pq0
                    },
                    controlA: {
                        value: new Pq0
                    },
                    controlB: {
                        value: new Pq0
                    },
                    pointB: {
                        value: new Pq0
                    },
                    radius: {
                        value: 0.01
                    },
                    dashing: {
                        value: new Pq0
                    }
                },
                vertexDefs,
                vertexTransform,
                fragmentDefs,
                fragmentMainIntro
            });
            t.addEventListener("dispose", function r() {
                t.removeEventListener("dispose", r);
                _derivedMaterial.dispose();
            });
        }
        return _derivedMaterial;
    }
    set material(e) {
        this._baseMaterial = e;
    }
    get customDepthMaterial() {
        return this.material.getDepthMaterial();
    }
    set customDepthMaterial(e) {}
    get customDistanceMaterial() {
        return this.material.getDistanceMaterial();
    }
    set customDistanceMaterial(e) {}
    onBeforeRender() {
        let { uniforms } = this.material;
        let { pointA, controlA, controlB, pointB, radius, dashArray, dashOffset } = this;
        uniforms.pointA.value.copy(pointA);
        uniforms.controlA.value.copy(controlA);
        uniforms.controlB.value.copy(controlB);
        uniforms.pointB.value.copy(pointB);
        uniforms.radius.value = radius;
        uniforms.dashing.value.set(dashArray.x, dashArray.y, dashOffset || 0);
    }
    raycast() {}
}
