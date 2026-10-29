import { BKk, I9Y, IUQ, K52, Pq0, Q1f, XIg, YJl, bdM, dwI, eaF, hB5 as side, iNn, xSv } from "./module-85339.js";
import { b as vertexShader, r } from "./module-31588.js";
import { D0 } from "./module-30080.js";
export let tN = 10288983;
let fragmentShader = `
#include <packing>
#define MAX_R ${8}
uniform sampler2D uMask;
uniform vec2 uMaskTexel;
uniform vec4 uRect;
uniform float uInner;
uniform float uOuter;
uniform float uDpr;
uniform float uNear;
uniform float uFar;
uniform float uOrtho;
uniform float uPxWorld;
uniform float uHidden;
uniform float uTime;
uniform vec3 uEdge;
uniform vec3 uWhite;

// p：矩形内的像素坐标（像素中心 = 整数 + 0.5）→ (是否盖住, 深度)
vec2 maskAt(vec2 p) {
  if (p.x < 0.0 || p.y < 0.0 || p.x >= uRect.z || p.y >= uRect.w) return vec2(0.0, 1.0);
  vec4 s = texture2D(uMask, p * uMaskTexel);
  return vec2(s.a, unpackRGBToDepth(s.rgb));
}

#define TRY(o) { float d2 = dot(o, o); if (d2 < best2 && d2 <= r2) { vec2 m = maskAt(p + (o)); if (m.x > 0.5) { best2 = d2; depth = m.y; } } }

void main() {
  vec2 p = gl_FragCoord.xy - uRect.xy;
  vec2 self = maskAt(p);
  float best2 = 1e6;
  float depth = 1.0;
  float r2 = uOuter * uOuter;
  if (self.x > 0.5) {
    best2 = 0.0;
    depth = self.y;
  } else {
    // 按方环由内往外找最近的遮罩像素：第 k 圈的像素离中心至少 k，找到的已经不超过 k+1 就不用再往外
    for (int k = 1; k <= MAX_R; k++) {
      float fk = float(k);
      if (fk > uOuter) break;
      for (int i = -MAX_R; i <= MAX_R; i++) {
        if (i < -k || i > k) continue;
        float fi = float(i);
        TRY(vec2(fi, fk))
        TRY(vec2(fi, -fk))
        if (i > -k && i < k) {
          TRY(vec2(fk, fi))
          TRY(vec2(-fk, fi))
        }
      }
      if (best2 <= (fk + 1.0) * (fk + 1.0)) break;
    }
    if (best2 > r2) discard;
  }

  float dist = sqrt(best2);
  vec4 color;
  if (best2 < 0.5) {
    // 物体本身：屏幕空间斜纹（远近一样密，不会混叠成一块）；被挡住的部分不铺
    if (uHidden > 0.5) discard;
    float diag = (gl_FragCoord.x + gl_FragCoord.y) / uDpr;
    float f = fract((diag + uTime * 10.0) / 10.0);
    float stripe = 1.0 - smoothstep(0.16, 0.28, abs(f - 0.5));
    color = vec4(uEdge, mix(0.14, 0.55, stripe) * (0.9 + 0.1 * sin(uTime * 3.0)));
  } else {
    // 绿边贴着物体、白边在外；外沿 1px 渐隐，斜边不起锯齿
    float breath = 0.75 + 0.25 * sin(uTime * 3.0);
    float a = clamp(uOuter + 0.5 - dist, 0.0, 1.0) * breath;
    color = vec4(dist <= uInner + 0.5 ? uEdge : uWhite, a * (uHidden > 0.5 ? 0.38 : 1.0));
  }

  // 深度 = 最近那个遮罩像素的深度，往相机拉：底数 0.02 格 + 每离开物体 1px 拉 2 个像素宽
  // （斜着看同一平面上的邻居方块，深度随像素变化；这点余量盖住约 60° 以内的斜度，边不会和邻居抢深度而闪）
  float viewZ = uOrtho > 0.5 ? orthographicDepthToViewZ(depth, uNear, uFar) : perspectiveDepthToViewZ(depth, uNear, uFar);
  float pxWorld = uOrtho > 0.5 ? uPxWorld : -viewZ * uPxWorld;
  viewZ = min(viewZ + 0.02 + (dist + 1.0) * pxWorld * 2.0, -uNear * 1.0001);
  gl_FragDepth = uOrtho > 0.5 ? viewZToOrthographicDepth(viewZ, uNear, uFar) : viewZToPerspectiveDepth(viewZ, uNear, uFar);

  gl_FragColor = color;
  #include <colorspace_fragment>
}
`;
export class vf {
    padPx(e) {
        return Math.min(3.5 * e.getPixelRatio(), 8);
    }
    applyFrame(e, t, n, i) {
        let uniforms = this.uniforms;
        if (!i) {
            return void uniforms.uNdcRect.value.set(0, 0, 0, 0);
        }
        let l = e.getPixelRatio();
        let r = this.padPx(e);
        uniforms.uMask.value = n.texture;
        uniforms.uMaskTexel.value.set(1 / n.width, 1 / n.height);
        uniforms.uRect.value.set(i.x, i.y, i.w, i.h);
        uniforms.uNdcRect.value.set(...i.ndc);
        uniforms.uInner.value = Math.min(2 * l, r);
        uniforms.uOuter.value = r;
        uniforms.uDpr.value = l;
        uniforms.uNear.value = t.near ?? 0.1;
        uniforms.uFar.value = t.far ?? 1000;
        uniforms.uOrtho.value = +!!t.isOrthographicCamera;
        uniforms.uPxWorld.value = 2 / (t.projectionMatrix.elements[5] * i.viewportHeight);
    }
    setTime(e) {
        this.uniforms.uTime.value = e;
    }
    dispose() {
        this.compositeGeometry.dispose();
        this.hiddenMaterial.dispose();
        this.visibleMaterial.dispose();
    }
    constructor(e = tN){
        this.uniforms = {
            uMask: {
                value: null
            },
            uMaskTexel: {
                value: new I9Y(1, 1)
            },
            uRect: {
                value: new IUQ
            },
            uNdcRect: {
                value: new IUQ
            },
            uInner: {
                value: 2
            },
            uOuter: {
                value: 3.5
            },
            uDpr: {
                value: 1
            },
            uNear: {
                value: 0.1
            },
            uFar: {
                value: 1000
            },
            uOrtho: {
                value: 0
            },
            uPxWorld: {
                value: 0.001
            },
            uTime: {
                value: 0
            },
            uEdge: {
                value: new Q1f(e)
            },
            uWhite: {
                value: new Q1f(16777215)
            }
        };
        let t = (e)=>new BKk({
                uniforms: {
                    ...this.uniforms,
                    uHidden: {
                        value: +!!e
                    }
                },
                vertexShader,
                fragmentShader,
                transparent: true,
                depthWrite: false,
                depthTest: true,
                depthFunc: e ? K52 : xSv
            });
        this.hiddenMaterial = t(true);
        this.visibleMaterial = t(false);
        this.compositeGeometry = new bdM(2, 2);
        this.hiddenPass = new eaF(this.compositeGeometry, this.hiddenMaterial);
        this.hiddenPass.renderOrder = 990;
        this.hiddenPass.frustumCulled = false;
        this.hiddenPass.raycast = ()=>{};
        this.visiblePass = new eaF(this.compositeGeometry, this.visibleMaterial);
        this.visiblePass.renderOrder = 991;
        this.visiblePass.frustumCulled = false;
        this.visiblePass.raycast = ()=>{};
    }
}
export class Cx {
    setGeometry(e, s = {}) {
        if (!e.boundingBox) {
            e.computeBoundingBox();
        }
        this.geometry = e;
        this.mask.setGeometry(e);
        let l = s.map ?? null;
        let uniforms = this.maskMaterial.uniforms;
        uniforms.uMap.value = l;
        uniforms.uUseMap.value = l && (s.alphaTest ?? 0) > 0 ? 1 : 0;
        uniforms.uAlphaTest.value = s.alphaTest ?? 0.5;
        if (l) {
            if (l.matrixAutoUpdate) {
                l.updateMatrix();
            }
            uniforms.uMapTransform.value.copy(l.matrix);
        }
        let u = s.side ?? side;
        if (this.maskMaterial.side !== u) {
            this.maskMaterial.side = u;
            this.maskMaterial.needsUpdate = true;
        }
    }
    resetGeometry() {
        this.setGeometry(this.defaultGeometry);
    }
    setCulledFaces(e) {
        let uniforms = this.maskMaterial.uniforms;
        uniforms.uCullPos.value.set(e & D0.px ? 1 : 0, e & D0.py ? 1 : 0, e & D0.pz ? 1 : 0);
        uniforms.uCullNeg.value.set(e & D0.nx ? 1 : 0, e & D0.ny ? 1 : 0, e & D0.nz ? 1 : 0);
    }
    setPosition(e, t, n) {
        this.group.position.set(e, t, n);
        this.group.visible = true;
    }
    getObject3D() {
        return this.group;
    }
    updateTime(e) {
        this.passes.setTime(e);
    }
    setVisible(e) {
        this.group.visible = e;
    }
    setContourMode(e) {
        this.maskMaterial.uniforms.uPreserveWholeGeometry.value = +(e === "whole-object");
    }
    dispose() {
        this.defaultGeometry.dispose();
        this.maskMaterial.dispose();
        this.mask.dispose();
        this.passes.dispose();
    }
    renderMask(e, t) {
        let n = this.passes.padPx(e);
        let i = this.mask.render(e, t, this.group.matrixWorld, this.geometry.boundingBox, n);
        this.passes.applyFrame(e, t, this.mask, i);
    }
    constructor(e = {}){
        this.group = new YJl;
        this.group.name = "BlockSelectionOutline";
        this.defaultGeometry = new iNn(1, 1, 1);
        this.defaultGeometry.translate(0.5, 0.5, 0.5);
        this.defaultGeometry.computeBoundingBox();
        this.geometry = this.defaultGeometry;
        this.maskMaterial = new BKk({
            uniforms: {
                uMap: {
                    value: null
                },
                uUseMap: {
                    value: 0
                },
                uAlphaTest: {
                    value: 0.5
                },
                uMapTransform: {
                    value: new dwI
                },
                uCullPos: {
                    value: new Pq0
                },
                uCullNeg: {
                    value: new Pq0
                },
                uPreserveWholeGeometry: {
                    value: +(e.contourMode === "whole-object")
                }
            },
            vertexShader: "\nuniform mat3 uMapTransform;\nvarying vec2 vUv;\nvarying vec3 vLocal;\nvarying vec3 vLocalNormal;\n\nvoid main() {\n  vUv = (uMapTransform * vec3(uv, 1.0)).xy;\n  vLocal = position;\n  vLocalNormal = normal;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",
            fragmentShader: "\n#include <packing>\nuniform sampler2D uMap;\nuniform float uUseMap;\nuniform float uAlphaTest;\nuniform vec3 uCullPos;\nuniform vec3 uCullNeg;\nuniform float uPreserveWholeGeometry;\nvarying vec2 vUv;\nvarying vec3 vLocal;\nvarying vec3 vLocalNormal;\n\nvoid main() {\n  // 紧贴实心邻居的那一面（方块几何在 [0,1] 局部空间，面落在边界平面上、法线朝外）\n  const float EDGE = 0.002;\n  vec3 n = vLocalNormal;\n  if (uPreserveWholeGeometry < 0.5) {\n  if ((uCullPos.x > 0.5 && n.x > 0.5 && vLocal.x > 1.0 - EDGE) || (uCullNeg.x > 0.5 && n.x < -0.5 && vLocal.x < EDGE)\n    || (uCullPos.y > 0.5 && n.y > 0.5 && vLocal.y > 1.0 - EDGE) || (uCullNeg.y > 0.5 && n.y < -0.5 && vLocal.y < EDGE)\n    || (uCullPos.z > 0.5 && n.z > 0.5 && vLocal.z > 1.0 - EDGE) || (uCullNeg.z > 0.5 && n.z < -0.5 && vLocal.z < EDGE)) discard;\n  }\n  if (uUseMap > 0.5 && texture2D(uMap, vUv).a < uAlphaTest) discard;\n  gl_FragColor = vec4(packDepthToRGB(gl_FragCoord.z), 1.0);\n}\n",
            side,
            blending: XIg
        });
        this.mask = new r(this.maskMaterial);
        this.mask.setGeometry(this.geometry);
        this.passes = new vf(e.color ?? tN);
        this.passes.hiddenPass.onBeforeRender = (e, t, n)=>this.renderMask(e, n);
        this.group.add(this.passes.hiddenPass);
        this.group.add(this.passes.visiblePass);
        this.group.visible = false;
    }
}
