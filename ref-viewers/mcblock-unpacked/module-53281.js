import { ShaderChunk } from "./module-87548.js";
import { $EB as side_1, BKk, DXC, I9Y, IUQ, LoY, Pq0, Q1f, THS, XIg, YJl, ZLX, bdM, eaF, hB5 as defaultSide, imn, kn4, mrM } from "./module-85339.js";
import { Cx } from "./module-18514.js";
import { p as p_1 } from "./module-86709.js";
import { H8, i7, xS } from "./module-30080.js";
import { $, y as y_1 } from "./module-11485.js";
import { o } from "./module-93429.js";
import { eL, fu } from "./module-65227.js";
import { a } from "./module-15409.js";
import { Mz, nt } from "./module-64775.js";
import * as p from "./module-31588.js";
const f = require(49745);
let m = {
    color: 16747068,
    widthCss: 1,
    fadeLoPx: 6,
    fadeHiPx: 9,
    farCompensation: 1
};
let g = {
    skip: 0,
    inner: 1,
    contour: 2
};
let y = new IUQ;
class v {
    getObject3D() {
        return this.group;
    }
    setGeometry(e) {
        this.geometry = e;
        if (!e) {
            this.group.visible = false;
            return;
        }
        if (!e.boundingBox) {
            e.computeBoundingBox();
        }
        this.group.userData.maskGeometry = e;
        this.mask.setGeometry(e);
        this.group.visible = true;
    }
    dispose() {
        this.mask.dispose();
        this.maskMaterial.dispose();
        this.compositeMaterial.dispose();
        this.compositeGeometry.dispose();
        this.geometry = null;
    }
    renderMask(e, t) {
        let geometry = this.geometry;
        if (!geometry?.boundingBox) {
            return;
        }
        let n = m.widthCss * e.getPixelRatio();
        this.maskMaterial.uniforms.uWidth.value = n;
        let uniforms = this.maskMaterial.uniforms;
        uniforms.uOrtho.value = +!!t.isOrthographicCamera;
        e.getCurrentViewport(y);
        uniforms.uPxScale.value = t.projectionMatrix.elements[5] * y.w / 2;
        let r = this.mask.render(e, t, this.group.matrixWorld, geometry.boundingBox, 0.5 * n + 1);
        if (!r) {
            return void this.compositeMaterial.uniforms.uNdcRect.value.set(0, 0, 0, 0);
        }
        let uniforms_1 = this.compositeMaterial.uniforms;
        uniforms_1.uMask.value = this.mask.texture;
        uniforms_1.uMaskTexel.value.set(1 / this.mask.width, 1 / this.mask.height);
        uniforms_1.uRect.value.set(r.x, r.y, r.w, r.h);
        uniforms_1.uNdcRect.value.set(...r.ndc);
    }
    constructor(){
        this.geometry = null;
        this.group = new YJl;
        this.group.name = "StepGridOutline";
        this.maskMaterial = new BKk({
            uniforms: {
                uPxScale: {
                    value: 1
                },
                uOrtho: {
                    value: 0
                },
                uWidth: {
                    value: m.widthCss
                },
                uLodLo: {
                    value: m.fadeLoPx
                },
                uLodHi: {
                    value: m.fadeHiPx
                },
                uFar: {
                    value: m.farCompensation
                }
            },
            vertexShader: "\nattribute vec3 aBary;\nattribute vec3 aEdge;\nuniform float uPxScale;\nuniform float uOrtho;\n// centroid 是给「万一以后把 MASK_SAMPLES 开回去」留的保险：开了 MSAA，边缘像素的插值默认按像素中心算，\n// 中心落在三角形外时重心坐标会被外推成负数，下面 abs() 一折就是个假的「离边几像素」。现在 MSAA 是关的，这里等同普通插值。\ncentroid varying vec3 vBary;\nvarying vec3 vEdge;\nvarying float vPx;\n\nvoid main() {\n  vec4 mv = modelViewMatrix * vec4(position, 1.0);\n  vBary = aBary;\n  vEdge = aEdge;\n  // 一格方块此刻在屏幕上有多少像素（正交时与距离无关）\n  vPx = uOrtho > 0.5 ? uPxScale : uPxScale / max(-mv.z, 0.0001);\n  gl_Position = projectionMatrix * mv;\n}\n",
            fragmentShader: "\nuniform float uWidth;\nuniform float uLodLo;\nuniform float uLodHi;\nuniform float uFar;\ncentroid varying vec3 vBary;\nvarying vec3 vEdge;\nvarying float vPx;\n\nvoid main() {\n  // 重心坐标除以它在屏幕上的梯度 = 到那条边有几个像素（解析值，亚像素精度）\n  vec3 dx = dFdx(vBary);\n  vec3 dy = dFdy(vBary);\n  vec3 grad = max(sqrt(dx * dx + dy * dy), vec3(1e-6));\n  vec3 dist = abs(vBary) / grad;\n  // 重心坐标 1 对应的像素数 = 从对着这条边的那个顶点到这条边的屏幕距离；\n  // 平行四边形前提下也就是「到对面那条平行边」的距离，补角时拿它换算\n  vec3 span = 1.0 / grad;\n\n  // 线宽恒 = 1 CSS 像素 × DPR（renderMask 给），不随一格像素数收细（规范 §2.1）\n  float w = uWidth;\n  // 块间缝：一格 ≤ uLodLo 设备像素不画、≥ uLodHi 全画，中间 smoothstep（绝对阈值，规范 §2.3）\n  float lod = smoothstep(uLodLo, uLodHi, vPx);\n  // 远处两条补偿的强度：定稿常开（uFar = 1，规范 §2.1）\n  float far = uFar;\n  float best = 0.0;\n  for (int i = 0; i < 3; i++) {\n    float raw = vEdge[i];\n    float type = raw > 3.5 ? raw - 4.0 : raw;\n    if (raw > 3.5) {\n      // 补角：对面那条平行边是轮廓，而本三角形在靠对角线那个角上盖住了紧挨它的像素（见 aEdge 文档）\n      float df = span[i] - dist[i];\n      best = max(best, far * clamp(min(df, w + 1.0 - df), 0.0, 1.0));\n    }\n    if (type < 0.5) continue;\n    bool contour = type > 1.5;\n    // 内部边两侧各有三角形，各画半条正好凑成一条；轮廓边外侧没有片元，整条都画在里面\n    // （🔴 别把这个变量叫 half —— GLSL ES 的保留字，编译直接报错、描边整个不画）\n    float reach = contour ? w : w * 0.5;\n    float aOld = clamp(reach + 0.5 - dist[i], 0.0, 1.0);\n    // 轮廓边换成两头都收的梯形：外侧没有片元，老式只剩半个梯形 → 行能量随亚像素相位摆动 → 暗带爬动。\n    // 两头都有 1 像素斜坡后逐行能量与相位无关，内部缝一直是这样才稳（实测 CV 0.07%）。\n    float aNew = clamp(min(dist[i], reach + 1.0 - dist[i]), 0.0, 1.0);\n    float a = contour ? mix(aOld, aNew, far) : aOld;\n    best = max(best, contour ? a : a * lod);\n  }\n  // 🔴 这里**不能** discard：没有线的地方也要把深度写进去，面才挡得住自己背面的棱\n  //    （discard 掉的片元不写深度 —— 试过一次，每个方块都能透出背面那三条边，像一堆空心盒子）\n  gl_FragColor = vec4(1.0, 1.0, 1.0, best);\n}\n",
            side: side_1,
            blending: XIg
        });
        this.mask = new p.r(this.maskMaterial, 0);
        this.compositeMaterial = new BKk({
            uniforms: {
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
                uColor: {
                    value: new Q1f(m.color)
                }
            },
            vertexShader: p.b,
            fragmentShader: "\nuniform sampler2D uMask;\nuniform vec2 uMaskTexel;\nuniform vec4 uRect;\nuniform vec3 uColor;\n\nvoid main() {\n  vec2 p = gl_FragCoord.xy - uRect.xy;\n  if (p.x < 0.0 || p.y < 0.0 || p.x >= uRect.z || p.y >= uRect.w) discard;\n  float a = texture2D(uMask, p * uMaskTexel).a;\n  if (a < 0.004) discard;\n  gl_FragColor = vec4(uColor, a);\n  #include <colorspace_fragment>\n}\n",
            transparent: true,
            depthTest: false,
            depthWrite: false
        });
        this.compositeGeometry = new bdM(2, 2);
        this.composite = new eaF(this.compositeGeometry, this.compositeMaterial);
        this.composite.renderOrder = 901;
        this.composite.frustumCulled = false;
        this.composite.raycast = ()=>{};
        this.composite.onBeforeRender = (e, t, i)=>this.renderMask(e, i);
        this.group.add(this.composite);
        this.group.visible = false;
    }
}
let b = {
    color: 4890367,
    opacity: 0.18
};
let k = ShaderChunk.uv_pars_vertex.replace("varying vec2 vMapUv;", "centroid varying vec2 vMapUv;");
let x = ShaderChunk.uv_pars_fragment.replace("varying vec2 vMapUv;", "centroid varying vec2 vMapUv;");
function M(material) {
    if (Array.isArray(material)) {
        return material;
    }
    return [
        material
    ];
}
function w(e) {
    return e.nx * e.nx + e.ny * e.ny + e.nz * e.nz < 1e-12;
}
let C = (e, t)=>e.nx * t.nx + e.ny * t.ny + e.nz * t.nz;
function S(e, t) {
    if (e.code < 6 || t.code < 6 || w(e) || w(t)) {
        return e.code === t.code;
    }
    return C(e, t) > 0.999;
}
function I(e, t, i) {
    if (i) {
        return e.code === t.code;
    }
    return S(e, t);
}
let A = [
    0,
    0,
    0
];
let B = [
    0,
    0,
    0
];
function O(e, t, i, n) {
    let s = 9 * t + (i + 1) % 3 * 3;
    let r = 9 * t + (i + 2) % 3 * 3;
    n[0] = e[r] - e[s];
    n[1] = e[r + 1] - e[s + 1];
    n[2] = e[r + 2] - e[s + 2];
    return Math.hypot(n[0], n[1], n[2]);
}
export class e {
    getContainer() {
        return this.container;
    }
    initialize(e, t, i, sortMode = "layer", r) {
        this.dispose();
        this.model = e;
        this.atlasTexture = i;
        let l = Infinity;
        for (let [, t] of e.variants){
            for (let e of t.instances){
                if (e.block.position[1] < l) {
                    l = e.block.position[1];
                }
            }
        }
        this.modelMinY = l;
        let o = new kn4;
        for (let [l, h] of e.variants){
            let fluidTopCapMaterial;
            let u = t.get(l);
            if (!u) {
                continue;
            }
            let c = h.instances.length;
            if (c === 0) {
                continue;
            }
            let d = h.properties[f.LN];
            let p = u.alphaClasses?.length ? u.alphaClasses : [
                "legacy"
            ];
            let m = d ? [
                this.createSkullSkinMaterial(h, d, i, r)
            ] : p.map((e)=>this.createMaterial(h, i, r, u.classifiedFromAtlas ? e : "legacy"));
            if (u.hasFluidTopCapGroup) {
                fluidTopCapMaterial = this.createMaterial(h, i, r);
                m.push(fluidTopCapMaterial);
            }
            let g = m.length === 1 ? m[0] : m;
            let mesh = new ZLX(u.geometry, g, c);
            mesh.userData.variantKey = l;
            mesh.frustumCulled = false;
            mesh.raycast = function(e, t) {
                this.boundingSphere = null;
                ZLX.prototype.raycast.call(this, e, t);
            };
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            for(let e = 0; e < c; e++){
                let [t, i, n] = h.instances[e].block.position;
                o.makeTranslation(t, i, n);
                mesh.setMatrixAt(e, o);
            }
            mesh.instanceMatrix.needsUpdate = true;
            mesh.count = c;
            this.container.add(mesh);
            this.meshes.push({
                variantKey: l,
                mesh,
                group: h,
                alphaClasses: u.classifiedFromAtlas ? p : undefined,
                sortMode,
                fluidTopCapMaterial
            });
        }
        this.setFluidTopCapVisible(false);
        this.buildBlockLookup();
        this.prepareEdgesCache(t);
    }
    setVisibleStep(e) {
        if (this.model) {
            this.currentMode = "step";
            this.currentIndex = e;
            this.setFluidTopCapVisible(true);
            if (this.focusMode) {
                this.applyFocusVisibility("step", e);
            } else {
                for (let t of this.meshes){
                    let i = t.group.stepCumulativeCounts;
                    if (e < 0) {
                        t.mesh.count = 0;
                    } else if (e >= i.length) {
                        t.mesh.count = t.group.instances.length;
                    } else {
                        t.mesh.count = i[e];
                    }
                }
            }
            this.refreshHighlightIfActive();
            this.refreshStepOutline();
        }
    }
    setVisibleLayer(e) {
        if (this.model) {
            this.currentMode = "layer";
            this.currentIndex = e;
            this.setFluidTopCapVisible(true);
            if (this.focusMode) {
                this.applyFocusVisibility("layer", e);
            } else {
                for (let t of this.meshes){
                    let i = t.group.layerCumulativeCounts;
                    if (e < 0) {
                        t.mesh.count = 0;
                    } else if (e >= i.length) {
                        t.mesh.count = t.group.instances.length;
                    } else {
                        t.mesh.count = i[e];
                    }
                }
            }
            this.refreshHighlightIfActive();
            this.refreshStepOutline();
        }
    }
    showAll() {
        for (let e of (this.currentMode = "all", this.currentIndex = -1, this.focusMode && this.setFocusMode(false), this.meshes)){
            e.mesh.count = e.group.instances.length;
        }
        this.setFluidTopCapVisible(false);
        this.refreshHighlightIfActive();
        this.refreshStepOutline();
    }
    setFocusMode(e) {
        if (this.focusMode !== e) {
            this.focusMode = e;
            if (e) {
                if (this.currentMode === "layer" || this.currentMode === "step") {
                    this.applyFocusVisibility(this.currentMode, this.currentIndex);
                }
            } else {
                this.restoreAllSolidMatrices();
                this.hideAllWireframes();
                if (this.currentMode === "layer") {
                    this.focusMode = false;
                    this.setVisibleLayer(this.currentIndex);
                } else if (this.currentMode === "step") {
                    this.focusMode = false;
                    this.setVisibleStep(this.currentIndex);
                }
            }
        }
    }
    isFocusMode() {
        return this.focusMode;
    }
    setExplodedView(e) {
        if (this.model) {
            let t = this.model.layerCount > 50 ? 150 / this.model.layerCount : 3;
            e = Math.min(e, t);
        }
        this.explodedSpacing = e;
        let t = new kn4;
        for (let i of this.meshes){
            for(let n = 0; n < i.group.instances.length; n++){
                let [s, r, l] = i.group.instances[n].block.position;
                let o = r + (r - this.modelMinY) * e;
                t.makeTranslation(s, o, l);
                i.mesh.setMatrixAt(n, t);
            }
            i.mesh.instanceMatrix.needsUpdate = true;
        }
        this.applyExplodeToWireframes(this.wireframeByLayer, e);
        this.applyExplodeToWireframes(this.wireframeByStep, e);
        if (this.highlightWireframe) {
            this.refreshHighlightIfActive();
        }
        this.refreshStepOutline();
        this.placeSelectionOutline();
    }
    applyExplodeToWireframes(e, t) {
        for (let i of e){
            let e = i.geometry.getAttribute("position");
            if (!e) {
                continue;
            }
            if (!i.userData.originalPositions) {
                i.userData.originalPositions = new Float32Array(e.array);
            }
            let n = i.userData.originalPositions;
            let s = e.array;
            for(let i = 0; i < e.count; i++){
                let e = n[3 * i + 1];
                s[3 * i + 1] = e + (e - this.modelMinY) * t;
            }
            e.needsUpdate = true;
            i.geometry.computeBoundingSphere();
        }
    }
    getExplodedSpacing() {
        return this.explodedSpacing;
    }
    getModelMinY() {
        return this.modelMinY;
    }
    getNewInstanceRange(e, t, i) {
        let n = new Map;
        for (let s of this.meshes){
            let r = e === "step" ? s.group.stepCumulativeCounts : s.group.layerCumulativeCounts;
            let l = t >= 0 && t < r.length ? r[t] : 0;
            let o = i >= 0 && i < r.length ? r[i] : s.group.instances.length;
            if (o > l) {
                n.set(s.variantKey, {
                    mesh: s.mesh,
                    start: l,
                    end: o
                });
            }
        }
        return n;
    }
    setInstanceScale(e, t, i, n, r) {
        let l = new kn4;
        e.getMatrixAt(t, l);
        let o = new Pq0;
        o.setFromMatrixPosition(l);
        l.makeTranslation(o.x, o.y, o.z);
        let a = new kn4().makeScale(i, n, r);
        l.multiply(a);
        e.setMatrixAt(t, l);
        e.instanceMatrix.needsUpdate = true;
    }
    resetInstanceScales(e, t, i) {
        let n = new kn4;
        for(let s = t; s < i; s++){
            let t = this.meshes.find((t)=>t.mesh === e);
            if (!t) {
                continue;
            }
            let i = t.group.instances[s];
            if (!i) {
                continue;
            }
            let [r, l, o] = i.block.position;
            n.makeTranslation(r, l, o);
            e.setMatrixAt(s, n);
        }
        e.instanceMatrix.needsUpdate = true;
    }
    getBlockFromHit(e, t) {
        let variantKey = e.userData.variantKey;
        if (!variantKey) {
            return null;
        }
        let s = this.meshes.find((e)=>e.variantKey === variantKey);
        if (!s) {
            return null;
        }
        let r = s.group.instances[t];
        return r?.block ?? null;
    }
    getBlockAtPosition(e, t, i) {
        let s = `${e},${t},${i}`;
        let r = this.blockLookup.get(s);
        return r?.block ?? null;
    }
    copyBlockTransform(e, t) {
        let i = this.blockLookup.get(e.position.join(","));
        let n = i && this.meshes.find((e)=>e.variantKey === i.variantKey);
        return !!i && !!n && !!n.mesh.visible && !(i.instance.instanceIndex >= n.mesh.count) && (n.mesh.getMatrixAt(i.instance.instanceIndex, t), t.elements[0] !== 0 && t.elements[5] !== 0 && t.elements[10] !== 0);
    }
    highlightBlock(e) {
        this.highlight = null;
        this.selectedPosition = e;
        if (!e) {
            if (this.selectionOutline) {
                this.selectionOutline.setVisible(false);
            }
            return;
        }
        if (!this.selectionOutline) {
            this.selectionOutline = new Cx({
                contourMode: this.selectionContourMode
            });
            this.container.add(this.selectionOutline.getObject3D());
        }
        let t = `${e[0]},${e[1]},${e[2]}`;
        let i = this.blockLookup.get(t);
        let n = i ? this.meshes.find((e)=>e.variantKey === i.variantKey) : undefined;
        if (n) {
            let e = M(n.mesh.material);
            let t = e[0];
            let i = (n.alphaClasses ? n.alphaClasses.some((e)=>e === "cutout" || e === "blend-cutout") : n.group.needsAlphaTest && !n.group.needsTransparent) && !this.isUnitCube(n);
            let side = e.some((e)=>e.side === side_1) ? side_1 : defaultSide;
            this.selectionOutline.setGeometry(n.mesh.geometry, {
                map: i ? t.map ?? this.atlasTexture : null,
                alphaTest: i ? t.alphaTest || 0.5 : 0,
                side
            });
        } else {
            this.selectionOutline.resetGeometry();
        }
        this.placeSelectionOutline();
    }
    setSelectionContourMode(e) {
        this.selectionContourMode = e;
        this.selectionOutline?.setContourMode(e);
    }
    updateSelectionOutline(e) {
        let selectionOutline = this.selectionOutline;
        if (!selectionOutline) {
            return;
        }
        selectionOutline.updateTime(e);
        let selectedPosition = this.selectedPosition;
        if (!selectedPosition) {
            this.selectionCulledFaces = 0;
            return;
        }
        let n = 0;
        for (let [e, t, s, r, l] of xS){
            if ((t === 0 || !(this.explodedSpacing > 0)) && this.occluderFacesAt(selectedPosition[0] + e, selectedPosition[1] + t, selectedPosition[2] + s) & l) {
                n |= r;
            }
        }
        this.selectionCulledFaces = n;
        selectionOutline.setCulledFaces(n);
    }
    getSelectionCulledFaces() {
        return this.selectionCulledFaces;
    }
    placeSelectionOutline() {
        let selectedPosition = this.selectedPosition;
        if (!selectedPosition || !this.selectionOutline) {
            return;
        }
        let [t, i, n] = selectedPosition;
        this.selectionOutline.setPosition(t, i + (i - this.modelMinY) * this.explodedSpacing, n);
    }
    isUnitCube(e) {
        let t = this.unitCubeCache.get(e.variantKey);
        if (t === undefined) {
            t = i7(e.mesh.geometry);
            this.unitCubeCache.set(e.variantKey, t);
        }
        return t;
    }
    occluderFacesAt(e, t, i) {
        let n = this.blockLookup.get(`${e},${t},${i}`);
        if (!n) {
            return 0;
        }
        let s = this.meshes.find((e)=>e.variantKey === n.variantKey);
        if (!s || !s.mesh.visible) {
            return 0;
        }
        let instanceIndex = n.instance.instanceIndex;
        if (instanceIndex >= s.mesh.count) {
            return 0;
        }
        let array = s.mesh.instanceMatrix.array;
        if (array[16 * instanceIndex] > 0.999 && array[16 * instanceIndex + 5] > 0.999 && array[16 * instanceIndex + 10] > 0.999) {
            return this.solidFacesOfManaged(s);
        }
        return 0;
    }
    solidFacesOfManaged(e) {
        let t = this.solidFacesCache.get(e.variantKey);
        if (t === undefined) {
            t = H8(e.mesh.geometry, e.mesh.material);
            this.solidFacesCache.set(e.variantKey, t);
        }
        return t;
    }
    updateMaterialAnimations(e) {
        for (let t of this.meshes){
            for (let i of M(t.mesh.material)){
                eL(i, e);
            }
        }
    }
    getAllMeshes() {
        return this.meshes.map((e)=>e.mesh);
    }
    getVisibilityState() {
        return {
            mode: this.currentMode,
            index: this.currentIndex
        };
    }
    getStepCount() {
        return this.model?.stepCount ?? 0;
    }
    getLayerCount() {
        return this.model?.layerCount ?? 0;
    }
    getBlockCount(e, t) {
        if (this.model) {
            if (e === "step") {
                return this.model.stepMeta[t]?.blockCount ?? 0;
            }
            return this.model.layerMeta[t]?.blockCount ?? 0;
        }
        return 0;
    }
    getVisibleBlockCount() {
        let e = 0;
        for (let t of this.meshes){
            e += t.mesh.count;
        }
        return e;
    }
    dispose() {
        for (let e of (this.highlightBlock(null), this.setHighlightByBlockId(null), this.highlightWireframeMaterial && (this.highlightWireframeMaterial.dispose(), this.highlightWireframeMaterial = null), this.selectionOutline && (this.container.remove(this.selectionOutline.getObject3D()), this.selectionOutline.dispose(), this.selectionOutline = null), this.focusMode = false, this.disposeStepOutlineObjects(), this.stepGridOutline && (this.container.remove(this.stepGridOutline.getObject3D()), this.stepGridOutline.dispose(), this.stepGridOutline = null), this.disposeWireframeGroups(), this.skinReleases)){
            e();
        }
        for (let [, e] of (this.skinReleases = [], this.edgesCache)){
            e.dispose();
        }
        for (let e of (this.edgesCache.clear(), this.meshes)){
            for (let t of (this.container.remove(e.mesh), e.mesh.dispose(), M(e.mesh.material))){
                t.dispose();
            }
        }
        this.meshes = [];
        this.blockLookup.clear();
        this.unitCubeCache.clear();
        this.solidFacesCache.clear();
        this.model = null;
    }
    createMaterial(e, atlasTexture, emissiveConfig, r = "legacy") {
        let animationConfig = p_1(e.blockId);
        let emissionMaskConfig = o(e.blockId);
        let d = fu({
            kind: "standard",
            atlasTexture,
            visualProfile: a(e.visualProfile, r),
            emissiveConfig,
            animationConfig,
            emissionMaskConfig,
            defaultSide
        });
        ((e)=>{
            if (k === ShaderChunk.uv_pars_vertex || x === ShaderChunk.uv_pars_fragment) {
                return;
            }
            let e_onBeforeCompile = e.onBeforeCompile;
            let i = e.customProgramCacheKey.bind(e);
            e.customProgramCacheKey = ()=>`${i()}|centroid-uv`;
            e.onBeforeCompile = (i, n)=>{
                e_onBeforeCompile.call(e, i, n);
                if (i.vertexShader.includes("#include <uv_pars_vertex>") && i.fragmentShader.includes("#include <uv_pars_fragment>")) {
                    i.vertexShader = i.vertexShader.replace("#include <uv_pars_vertex>", k);
                    i.fragmentShader = i.fragmentShader.replace("#include <uv_pars_fragment>", x);
                }
            };
        })(d);
        return d;
    }
    createSkullSkinMaterial(e, t, i, n) {
        let r = Mz(e.properties[f.iy]);
        let l = this.createMaterial(e, r.texture ?? i, n);
        let o = nt(t, (e)=>{
            if (e.state === "ready" && e.texture) {
                l.map = e.texture;
            }
        });
        if (o.state === "ready" && o.texture) {
            l.map = o.texture;
        }
        this.skinReleases.push(()=>o.release(), ()=>r.release());
        return l;
    }
    setFluidTopCapVisible(e) {
        for (let t of this.meshes){
            if (t.fluidTopCapMaterial) {
                t.fluidTopCapMaterial.visible = e;
            }
        }
    }
    buildBlockLookup() {
        for (let e of (this.blockLookup.clear(), this.meshes)){
            for (let instance of e.group.instances){
                let [i, n, s] = instance.block.position;
                let r = `${i},${n},${s}`;
                this.blockLookup.set(r, {
                    variantKey: e.variantKey,
                    instanceId: instance.instanceIndex,
                    block: instance.block,
                    instance
                });
            }
        }
    }
    setStepOutlineMode(e) {
        if (this.stepOutlineMode !== e || (e === "off" ? this.stepGridGeometry : !this.stepGridGeometry)) {
            this.stepOutlineMode = e;
            this.refreshStepOutline();
        }
    }
    getStepOutlineMode() {
        return this.stepOutlineMode;
    }
    refreshStepOutline() {
        this.disposeStepOutlineObjects();
        if (this.stepOutlineMode === "off" || !this.model || this.currentMode !== "step" && this.currentMode !== "layer" || this.currentIndex < 0) {
            return;
        }
        let e = this.buildCurrentGroupSolid();
        if (e) {
            if (!this.stepGridOutline) {
                this.stepGridOutline = new v;
                this.container.add(this.stepGridOutline.getObject3D());
            }
            this.stepGridOutline.setGeometry(e);
            this.stepGridGeometry = e;
        }
    }
    buildCurrentGroupSolid() {
        if (!this.model) {
            return null;
        }
        let e = new Set;
        let t = [];
        for (let managed_1 of this.meshes){
            let n = this.currentMode === "layer" ? managed_1.group.layerCumulativeCounts : managed_1.group.stepCumulativeCounts;
            if (this.currentIndex >= n.length) {
                continue;
            }
            let s = this.currentIndex > 0 ? n[this.currentIndex - 1] : 0;
            let r = n[this.currentIndex];
            if (!(r <= s)) {
                t.push({
                    managed: managed_1,
                    start: s,
                    end: r
                });
                for(let t = s; t < r; t++){
                    let n = managed_1.group.instances[t];
                    if (n) {
                        e.add(n.block.position.join(","));
                    }
                }
            }
        }
        if (t.length === 0) {
            return null;
        }
        let i = [];
        let n = [];
        let r = [
            new Pq0,
            new Pq0,
            new Pq0
        ];
        let l = [
            new Pq0,
            new Pq0,
            new Pq0
        ];
        let o = new Pq0;
        let h = new Pq0;
        let u = new Pq0;
        let c = (e, t, i)=>`${Math.round(10000 * e)},${Math.round(10000 * t)},${Math.round(10000 * i)}`;
        let d = (e, t)=>e < 0.001 && t < 0.001 || e > 0.999 && t > 0.999;
        let block = 0;
        for (let { managed, start, end } of t){
            let t = $(managed.mesh.geometry);
            let g = t.getAttribute("position");
            if (!g) {
                continue;
            }
            let y = t.getIndex();
            let v = y ? y.count : g.count;
            for(let t = start; t < end; t++){
                let a = managed.group.instances[t];
                if (!a) {
                    continue;
                }
                let [p, m, b] = a.block.position;
                let k = m + (m - this.modelMinY) * this.explodedSpacing;
                block++;
                for(let t = 0; t + 2 < v; t += 3){
                    for(let e = 0; e < 3; e++){
                        l[e].fromBufferAttribute(g, y ? y.getX(t + e) : t + e);
                        r[e].set(l[e].x + p, l[e].y + k, l[e].z + b);
                    }
                    u.copy(o.subVectors(r[1], r[0])).cross(h.subVectors(r[2], r[0]));
                    if (u.lengthSq() > 1e-12) {
                        u.normalize();
                    }
                    let code = u.x > 0.9 ? 0 : u.x < -0.9 ? 1 : u.y > 0.9 ? 2 : u.y < -0.9 ? 3 : u.z > 0.9 ? 4 : u.z < -0.9 ? 5 : 6;
                    if (code < 6) {
                        let t = code >> 1;
                        let i = (1 & code) == 0;
                        let n = (e)=>{
                            switch(t){
                                case 0:
                                    return l[e].x;
                                case 1:
                                    return l[e].y;
                                default:
                                    return l[e].z;
                            }
                        };
                        if (i ? n(0) > 0.999 && n(1) > 0.999 && n(2) > 0.999 : n(0) < 0.001 && n(1) < 0.001 && n(2) < 0.001) {
                            let n = i ? 1 : -1;
                            let s = t === 0 ? `${p + n},${m},${b}` : t === 1 ? `${p},${m + n},${b}` : `${p},${m},${b + n}`;
                            if (e.has(s)) {
                                continue;
                            }
                        }
                    }
                    i.push(r[0].x, r[0].y, r[0].z, r[1].x, r[1].y, r[1].z, r[2].x, r[2].y, r[2].z);
                    let onCell = [
                        false,
                        false,
                        false
                    ];
                    for(let e = 0; e < 3; e++){
                        let t = (e + 1) % 3;
                        let i = (e + 2) % 3;
                        onCell[e] = d(l[t].x, l[i].x) || d(l[t].y, l[i].y) || d(l[t].z, l[i].z);
                    }
                    n.push({
                        block,
                        code,
                        nx: u.x,
                        ny: u.y,
                        nz: u.z,
                        keys: [
                            c(r[0].x, r[0].y, r[0].z),
                            c(r[1].x, r[1].y, r[1].z),
                            c(r[2].x, r[2].y, r[2].z)
                        ],
                        onCell
                    });
                }
            }
        }
        if (n.length === 0) {
            return null;
        }
        let p = new Map;
        let m = (e, t)=>{
            if (e < t) {
                return `${e}|${t}`;
            }
            return `${t}|${e}`;
        };
        for (let e of n){
            for(let t = 0; t < 3; t++){
                let i = m(e.keys[(t + 1) % 3], e.keys[(t + 2) % 3]);
                let n = p.get(i);
                if (n) {
                    n.push(e);
                } else {
                    p.set(i, [
                        e
                    ]);
                }
            }
        }
        let y = new Float32Array(9 * n.length);
        let v = new Float32Array(9 * n.length);
        let b = (e, t)=>p.get(m(e.keys[(t + 1) % 3], e.keys[(t + 2) % 3])) ?? [
                e
            ];
        let k = Array(n.length);
        for(let e = 0; e < n.length; e++){
            let t = n[e];
            y.set([
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ], 9 * e);
            let i = w(t);
            let s = [
                0,
                0,
                0
            ];
            for(let e = 0; e < 3; e++){
                let n;
                let r = b(t, e);
                let l = false;
                for (let e of r){
                    if (e !== t && e.block === t.block && I(e, t, i)) {
                        l = true;
                        break;
                    }
                }
                if (l) {
                    n = g.skip;
                } else if (r.length < 2) {
                    n = g.contour;
                } else {
                    let s = 0;
                    let l = 0;
                    let o = !i;
                    let a = true;
                    for (let e of r){
                        if (e === t) {
                            continue;
                        }
                        s++;
                        let n = !(e.code !== 6 || t.code !== 6 || w(e) || w(t)) && C(e, t) < -0.999;
                        if (!(e.block === t.block && n)) {
                            o = false;
                        }
                        if (!n) {
                            if (I(e, t, i)) {
                                l++;
                            } else {
                                a = false;
                            }
                        }
                    }
                    n = s > 0 && o ? g.contour : a && l > 0 ? g.inner : t.onCell[e] ? g.contour : g.inner;
                }
                s[e] = n;
            }
            k[e] = s;
        }
        let x = new Uint8Array(3 * n.length);
        let M = new Map;
        for(let e = 0; e < n.length; e++){
            M.set(n[e], e);
        }
        for(let e = 0; e < n.length; e++){
            let t = n[e];
            for(let n = 0; n < 3; n++){
                if (k[e][n] === g.skip) {
                    for (let s of b(t, n)){
                        if (s === t || s.block !== t.block || !S(s, t)) {
                            continue;
                        }
                        let n = M.get(s);
                        if (n !== undefined) {
                            for(let r = 0; r < 3; r++){
                                if (k[e][r] === g.skip) {
                                    continue;
                                }
                                let l = t.keys[(r + 1) % 3];
                                let o = t.keys[(r + 2) % 3];
                                for(let t = 0; t < 3; t++){
                                    let a = s.keys[(t + 1) % 3];
                                    let h = s.keys[(t + 2) % 3];
                                    if (a !== l && a !== o && h !== l && h !== o) {
                                        if (k[n][t] === g.contour && ((e, t, i, n, s)=>{
                                            let r = O(e, t, i, A);
                                            let l = O(e, n, s, B);
                                            if (r < 0.000001 || l < 0.000001) {
                                                return false;
                                            }
                                            let o = A[1] * B[2] - A[2] * B[1];
                                            return Math.hypot(o, A[2] * B[0] - A[0] * B[2], A[0] * B[1] - A[1] * B[0]) <= 0.001 * r * l;
                                        })(i, e, r, n, t)) {
                                            x[3 * e + r] = 4;
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for(let e = 0; e < n.length; e++){
            let t = k[e];
            for(let i = 0; i < 3; i++){
                let n = t[i] + x[3 * e + i];
                v[9 * e + i] = n;
                v[9 * e + 3 + i] = n;
                v[9 * e + 6 + i] = n;
            }
        }
        let F = new LoY;
        F.setAttribute("position", new THS(new Float32Array(i), 3));
        F.setAttribute("aBary", new THS(y, 3));
        F.setAttribute("aEdge", new THS(v, 3));
        F.computeBoundingBox();
        return F;
    }
    disposeStepOutlineObjects() {
        this.stepGridOutline?.setGeometry(null);
        this.stepGridGeometry?.dispose();
        this.stepGridGeometry = null;
    }
    prepareEdgesCache(e) {
        for (let [, e] of this.edgesCache){
            e.dispose();
        }
        for (let [t, i] of (this.edgesCache.clear(), e)){
            this.edgesCache.set(t, y_1(i.geometry));
        }
    }
    ensureWireframeGroups(e) {
        if (this.model && this.edgesCache.size !== 0) {
            if (e === "layer" && this.wireframeByLayer.length !== this.model.layerCount) {
                for (let e of this.wireframeByLayer){
                    this.container.remove(e);
                    e.geometry.dispose();
                    if (e.material instanceof imn) {
                        e.material.dispose();
                    }
                }
                this.wireframeByLayer = this.buildGroupedWireframes(this.model, this.edgesCache, "layer", this.model.layerCount);
            }
            if (e === "step" && this.wireframeByStep.length !== this.model.stepCount) {
                for (let e of this.wireframeByStep){
                    this.container.remove(e);
                    e.geometry.dispose();
                    if (e.material instanceof imn) {
                        e.material.dispose();
                    }
                }
                this.wireframeByStep = this.buildGroupedWireframes(this.model, this.edgesCache, "step", this.model.stepCount);
            }
        }
    }
    buildGroupedWireframes(e, t, i, n) {
        let r = [];
        let l = new Map;
        for(let e = 0; e < n; e++){
            l.set(e, []);
        }
        for (let [variantKey, n] of e.variants){
            for (let e of n.instances){
                let n = i === "layer" ? e.layerIndex : e.stepIndex;
                let s = l.get(n);
                if (s) {
                    s.push({
                        variantKey,
                        position: e.block.position
                    });
                }
            }
        }
        let o = new mrM({
            color: b.color,
            transparent: true,
            opacity: b.opacity,
            depthWrite: false
        });
        for(let e = 0; e < n; e++){
            let n = l.get(e);
            if (!n || n.length === 0) {
                let e = new LoY;
                e.setAttribute("position", new THS(new Float32Array(0), 3));
                let t = new DXC(e, o);
                t.visible = false;
                t.frustumCulled = false;
                t.raycast = ()=>{};
                this.container.add(t);
                r.push(t);
                continue;
            }
            let a = 0;
            for (let e of n){
                let i = t.get(e.variantKey);
                if (i) {
                    a += i.getAttribute("position").count;
                }
            }
            let h = new Float32Array(3 * a);
            let u = 0;
            for (let e of n){
                let i = t.get(e.variantKey);
                if (!i) {
                    continue;
                }
                let n = i.getAttribute("position");
                let [s, r, l] = e.position;
                for(let e = 0; e < n.count; e++){
                    h[u] = n.getX(e) + s;
                    h[u + 1] = n.getY(e) + r;
                    h[u + 2] = n.getZ(e) + l;
                    u += 3;
                }
            }
            let c = new LoY;
            c.setAttribute("position", new THS(h, 3));
            let d = new DXC(c, o);
            d.name = `Wireframe_${i}_${e}`;
            d.visible = false;
            d.frustumCulled = false;
            d.raycast = ()=>{};
            this.container.add(d);
            r.push(d);
        }
        return r;
    }
    buildMergedWireframe(e, t, i) {
        if (e.length === 0) {
            return null;
        }
        let n = 0;
        for (let i of e){
            let e = t.get(i.variantKey);
            if (e) {
                n += e.getAttribute("position").count;
            }
        }
        if (n === 0) {
            return null;
        }
        let r = new Float32Array(3 * n);
        let l = 0;
        for (let i of e){
            let e = t.get(i.variantKey);
            if (!e) {
                continue;
            }
            let n = e.getAttribute("position");
            let [s, o, a] = i.position;
            for(let e = 0; e < n.count; e++){
                r[l] = n.getX(e) + s;
                r[l + 1] = n.getY(e) + o;
                r[l + 2] = n.getZ(e) + a;
                l += 3;
            }
        }
        let o = new LoY;
        o.setAttribute("position", new THS(r, 3));
        return new DXC(o, i);
    }
    setHighlightByBlockId(e) {
        if (this.highlightWireframe) {
            this.container.remove(this.highlightWireframe);
            this.highlightWireframe.geometry.dispose();
            this.highlightWireframe = null;
        }
        this.currentHighlightBlockId = e;
        if (!e) {
            for (let e of this.meshes){
                e.mesh.visible = true;
            }
            return;
        }
        let t = [];
        for (let i of this.meshes){
            let n = i.group.blockId.replace("minecraft:", "") === e || i.group.blockId === e;
            i.mesh.visible = n;
            if (!n) {
                let e = i.mesh.count;
                for(let n = 0; n < e; n++){
                    let e = i.group.instances[n];
                    if (!e) {
                        continue;
                    }
                    let [s, r, l] = e.block.position;
                    let o = r + (r - this.modelMinY) * this.explodedSpacing;
                    t.push({
                        variantKey: i.variantKey,
                        position: [
                            s,
                            o,
                            l
                        ]
                    });
                }
            }
        }
        if (this.edgesCache.size > 0 && t.length > 0) {
            if (!this.highlightWireframeMaterial) {
                this.highlightWireframeMaterial = new mrM({
                    color: b.color,
                    transparent: true,
                    opacity: b.opacity,
                    depthWrite: false
                });
            }
            let e = this.buildMergedWireframe(t, this.edgesCache, this.highlightWireframeMaterial);
            if (e) {
                e.name = "HighlightWireframe_NonTarget";
                e.frustumCulled = false;
                e.raycast = ()=>{};
                this.container.add(e);
                this.highlightWireframe = e;
            }
        }
    }
    refreshHighlightIfActive() {
        if (this.currentHighlightBlockId) {
            this.setHighlightByBlockId(this.currentHighlightBlockId);
        }
    }
    applyFocusVisibility(e, t) {
        this.ensureWireframeGroups(e);
        this.restoreAllSolidMatrices();
        let i = new kn4().makeScale(0, 0, 0);
        for (let n of this.meshes){
            let s = e === "layer" ? n.group.layerCumulativeCounts : n.group.stepCumulativeCounts;
            if (t < 0) {
                n.mesh.count = 0;
            } else if (t >= s.length) {
                n.mesh.count = n.group.instances.length;
            } else {
                n.mesh.count = s[t];
            }
            let r = t > 0 && t - 1 < s.length ? s[t - 1] : 0;
            for(let e = 0; e < r; e++){
                n.mesh.setMatrixAt(e, i);
            }
            n.mesh.instanceMatrix.needsUpdate = true;
        }
        let n = e === "layer" ? this.wireframeByLayer : this.wireframeByStep;
        for(let e = 0; e < n.length; e++){
            n[e].visible = e < t;
        }
        for (let t of e === "layer" ? this.wireframeByStep : this.wireframeByLayer){
            t.visible = false;
        }
    }
    restoreAllSolidMatrices() {
        let e = new kn4;
        for (let t of this.meshes){
            for(let i = 0; i < t.group.instances.length; i++){
                let [n, s, r] = t.group.instances[i].block.position;
                let l = s + (s - this.modelMinY) * this.explodedSpacing;
                e.makeTranslation(n, l, r);
                t.mesh.setMatrixAt(i, e);
            }
            t.mesh.instanceMatrix.needsUpdate = true;
        }
    }
    hideAllWireframes() {
        for (let e of this.wireframeByLayer){
            e.visible = false;
        }
        for (let e of this.wireframeByStep){
            e.visible = false;
        }
    }
    disposeWireframeGroups() {
        let e = [
            ...this.wireframeByLayer,
            ...this.wireframeByStep
        ];
        let t = new Set;
        for (let i of e){
            this.container.remove(i);
            i.geometry.dispose();
            if (i.material instanceof imn) {
                t.add(i.material);
            }
        }
        for (let e of t){
            e.dispose();
        }
        this.wireframeByLayer = [];
        this.wireframeByStep = [];
    }
    constructor(){
        this.meshes = [];
        this.model = null;
        this.atlasTexture = null;
        this.currentMode = "all";
        this.currentIndex = -1;
        this.highlight = null;
        this.selectionOutline = null;
        this.selectionContourMode = "object";
        this.selectedPosition = null;
        this.selectionCulledFaces = 0;
        this.unitCubeCache = new Map;
        this.solidFacesCache = new Map;
        this.focusMode = false;
        this.stepOutlineMode = "off";
        this.stepGridOutline = null;
        this.stepGridGeometry = null;
        this.explodedSpacing = 0;
        this.modelMinY = 0;
        this.wireframeByLayer = [];
        this.wireframeByStep = [];
        this.edgesCache = new Map;
        this.highlightWireframe = null;
        this.highlightWireframeMaterial = null;
        this.currentHighlightBlockId = null;
        this.skinReleases = [];
        this.blockLookup = new Map;
        this.container = new YJl;
        this.container.name = "TeachingBlocks";
    }
}
