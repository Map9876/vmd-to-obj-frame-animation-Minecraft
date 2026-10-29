// engine.js — shulkr WebGL 引擎的复刻包（复刻自 shulkr.com 的 three.js 渲染管线）
//
// 关键事实：shulkr.com 的 "WebGL 引擎" 本体就是 three.js（其打包产物含 three 内置 shader chunk：
// tonemapping_fragment / colorspace_fragment 等）。因此"完整复刻"= 复刻 shulkr 对 three.js 的
// 配置方式：MC 式逐面明暗 + 太阳方向光 + 天空雾 + 相机控制器（orbit/plan/explore，easeOutCubic 过渡）。
//
// 以下常量均来自 shulkr 引擎源码：
//   - 相机过渡缓动 v = e => 1 - (1-e)**3   （easeOutCubic，原样移植）
//   - 立方体逐面明暗 [东,西,顶,底,南,北] = [0.6,0.6,1.0,0.5,0.8,0.8]  （标准 MC face shading）

import * as THREE from 'three';
import { OrbitControls } from '../vendor/OrbitControls.js';

// ---- shulkr 相机过渡缓动（原样移植自 shulkr 引擎） ----
const easeOutCubic = (e) => 1 - (1 - e) ** 3;

// ---- MC 逐面明暗（BoxGeometry 面序：+X,-X,+Y,-Y,+Z,-Z） ----
const FACE_SHADE = [0.6, 0.6, 1.0, 0.5, 0.8, 0.8];

function makeShadedBoxGeometry() {
  const g = new THREE.BoxGeometry(1, 1, 1);
  const pos = g.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  // 每面 4 个顶点，按面序循环
  for (let v = 0; v < pos.count; v++) {
    const face = Math.floor(v / 4);
    const s = FACE_SHADE[face];
    colors[v * 3] = s; colors[v * 3 + 1] = s; colors[v * 3 + 2] = s;
  }
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return g;
}

// 由名字生成稳定颜色（无贴图时的纯色体素） — 与 shulkr 用 block 名区分调色一致
function colorFromName(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const hue = (h % 360) / 360;
  const c = new THREE.Color();
  c.setHSL(hue, 0.45, 0.6);
  return c;
}

// ---- shulkr 相机控制器（移植自 shulkr 引擎的 modeTween / advanceCameraMove 逻辑） ----
class ShulkrCameraController {
  constructor(camera, controls) {
    this.camera = camera;
    this.controls = controls;
    this.mode = 'orbit';
    this.transition = null;     // { from, to, elapsed, duration, tween }
    this.orbitFov = 55;
    this.exploreFov = 75;
  }
  fovFor(mode) { return mode === 'explore' ? this.exploreFov : this.orbitFov; }
  to(mode) {
    if (mode === this.mode && !this.transition) return;
    if (this.transition && mode === this.transition.to) return;
    const from = this.mode;
    const tween = this._beginCameraMove(from, mode);
    this.transition = { from, to: mode, elapsed: 0, duration: tween.duration, tween };
    this.mode = mode;
  }
  _beginCameraMove(from, to) {
    const cam = this.camera, ctr = this.controls;
    if (to === 'plan') {
      // 俯视切片视角
      const d = cam.position.distanceTo(ctr.target) || 100;
      const up = new THREE.Vector3(0, 0, -1);
      const pos = new THREE.Vector3(ctr.target.x, ctr.target.y + d, ctr.target.z);
      return { duration: 600, fromPos: cam.position.clone(), toPos: pos,
               fromTarget: ctr.target.clone(), toTarget: ctr.target.clone(), fromUp: cam.up.clone(), toUp: up };
    } else if (to === 'explore') {
      // 贴近观察
      const dir = new THREE.Vector3().subVectors(cam.position, ctr.target).normalize();
      const pos = new THREE.Vector3().copy(ctr.target).addScaledVector(dir, 18);
      return { duration: 500, fromPos: cam.position.clone(), toPos: pos,
               fromTarget: ctr.target.clone(), toTarget: ctr.target.clone(), fromUp: cam.up.clone(), toUp: new THREE.Vector3(0,1,0) };
    }
    // 回到 orbit：恢复世界 up
    return { duration: 500, fromPos: cam.position.clone(), toPos: cam.position.clone(),
             fromTarget: ctr.target.clone(), toTarget: ctr.target.clone(), fromUp: cam.up.clone(), toUp: new THREE.Vector3(0,1,0) };
  }
  advanceCameraMove(t) {
    const tw = this.transition?.tween; if (!tw) return;
    this.camera.position.lerpVectors(tw.fromPos, tw.toPos, t);
    this.controls.target.lerpVectors(tw.fromTarget, tw.toTarget, t);
    this.camera.up.lerpVectors(tw.fromUp, tw.toUp, t);
  }
  update(dtMs) {
    const tr = this.transition; if (!tr) return;
    tr.elapsed += dtMs;
    const n = Math.min(1, tr.elapsed / tr.duration);
    this.advanceCameraMove(easeOutCubic(n));   // 原样使用 shulkr 的 easeOutCubic
    if (n >= 1) this.transition = null;
  }
}

export class ShulkrEngine {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.background = opts.background ?? 0xbfd1e0;
    this.fog = opts.fog ?? 0xbfd1e0;
    this.sunDir = opts.sunDir ?? new THREE.Vector3(0.35458, 0.90834, 0.13383); // 取自 shulkr 引擎方向向量
    this.geo = makeShadedBoxGeometry();
    this.matCache = new Map();
    this.frameGroups = [];
    this.current = 0;
    this.colorMap = opts.colorMap || null; // 可选：name -> hex
    this._init();
  }

  _init() {
    const r = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    r.setSize(window.innerWidth, window.innerHeight);
    r.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer = r;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(this.background);
    scene.fog = new THREE.Fog(this.fog, 300, 1200); // shulkr 风格大气雾
    this.scene = scene;

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(70, 60, 120);
    this.camera = camera;

    const controls = new OrbitControls(camera, r.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    this.controls = controls;

    this.controller = new ShulkrCameraController(camera, controls);

    // ---- 光照：太阳方向光 + 半球光 + 环境光（shulkr/MC 配方） ----
    const sun = new THREE.DirectionalLight(0xfff2d6, 1.7);
    sun.position.copy(this.sunDir).multiplyScalar(100);
    scene.add(sun);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x4a4a55, 0.35));
    scene.add(new THREE.AmbientLight(0xffffff, 0.22));
    // 冷色天空补光，保证背光面可读
    const fill = new THREE.DirectionalLight(0xbfd4ff, 0.35);
    fill.position.set(-80, 40, -60);
    scene.add(fill);

    this._onResize = () => this.resize();
    window.addEventListener('resize', this._onResize);
    this._loop = this._loop.bind(this);
    this._last = performance.now();
    requestAnimationFrame(this._loop);
  }

  _mat(name) {
    if (this.matCache.has(name)) return this.matCache.get(name);
    const base = this.colorMap && this.colorMap[name] != null
      ? new THREE.Color(this.colorMap[name])
      : colorFromName(name);
    const m = new THREE.MeshLambertMaterial({ color: base, vertexColors: true });
    this.matCache.set(name, m);
    return m;
  }

  // 管道输入：直接吃我们的体素（frames 形态）
  loadFrames(frames) {
    this.clear();
    for (const f of frames) {
      const g = new THREE.Group();
      const cx = f.sx / 2, cy = f.sy / 2, cz = f.sz / 2;
      for (const [name, arr] of Object.entries(f.groups)) {
        const count = arr.length / 3;
        const mesh = new THREE.InstancedMesh(this.geo, this._mat(name), count);
        const m = new THREE.Matrix4();
        for (let i = 0; i < count; i++) {
          m.makeTranslation(arr[i*3]-cx, arr[i*3+1]-cy, arr[i*3+2]-cz);
          mesh.setMatrixAt(i, m);
        }
        mesh.instanceMatrix.needsUpdate = true; mesh.count = count;
        g.add(mesh);
      }
      g.visible = false;
      this.scene.add(g);
      this.frameGroups.push(g);
    }
    if (this.frameGroups[0]) this.frameGroups[0].visible = true;
    // 取整体包围盒中心作为轨道目标
    const f0 = frames[0];
    this.controls.target.set(0, f0.sy / 2, 0);
    this.camera.position.set(f0.sx * 1.2, f0.sy * 0.8, f0.sz * 1.6 + 80);
  }

  // 管道输入：直接吃 shulkr blueprint 的某个结构（placement + size）
  loadStructure(placement, size) {
    this.clear();
    const g = new THREE.Group();
    const cx = size[0]/2, cy = size[1]/2, cz = size[2]/2;
    for (const [name, arr] of Object.entries(placement)) {
      const count = arr.length / 3;
      const mesh = new THREE.InstancedMesh(this.geo, this._mat(name), count);
      const m = new THREE.Matrix4();
      for (let i = 0; i < count; i++) {
        m.makeTranslation(arr[i*3]-cx, arr[i*3+1]-cy, arr[i*3+2]-cz);
        mesh.setMatrixAt(i, m);
      }
      mesh.instanceMatrix.needsUpdate = true; mesh.count = count;
      g.add(mesh);
    }
    this.scene.add(g);
    this.frameGroups = [g];
    this.current = 0;
  }

  clear() {
    for (const g of this.frameGroups) {
      this.scene.remove(g);
      g.traverse(o => { if (o.isInstancedMesh) o.dispose?.(); });
    }
    this.frameGroups = [];
  }

  setFrame(i) {
    const n = this.frameGroups.length; if (!n) return;
    this.current = (i + n) % n;
    this.frameGroups.forEach((g, k) => g.visible = (k === this.current));
  }
  get frameCount() { return this.frameGroups.length; }

  setMode(mode) { this.controller.to(mode); }
  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  _loop() {
    const now = performance.now();
    const dt = now - this._last; this._last = now;
    this.controller.update(dt);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }
}
