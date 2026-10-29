// =====================================================================
// shulkr-replica: 完整移植 shulkr.com 的 WebGL 渲染引擎 (裸 three.js)
// ---------------------------------------------------------------------
// 经逆向确认, shulkr 的 3D 引擎底层就是 three.js (非裸 WebGL)。
// 本文件是"复刻包"的总装: 真实 shulkr loader + 引擎(光照舞台 Hv 逐字移植)
// + 双向数据桥 + 5 个由 subagent 移植的子模块:
//   face-shading.js  —— 逐面明暗(与 shulkr AO 模型一致的 MC 标准常量)
//   grid.js         —— shulkr 世界网格(自适应 LOD shader, uColor 取背景亮度)
//   camera-modes.js —— shulkr 相机状态机(orbit/plan/explore, easeOutCubic 过渡)
//   explore-mode.js —— shulkr 第一人称探索(指针锁定 + WASD)
//   schematic-io.js —— 真实 shulkr 结构/blueprint 导入导出
// =====================================================================
import * as THREE from 'three';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { createLoader } from '../loader.js';
import { framesToBlueprint, blueprintToSchematic } from './bridge.js';
import { FACE_SHADE, shulkrFaceVertexColors } from './face-shading.js';
import { createShulkrGrid } from './grid.js';
import { ShulkrCameraController } from './camera-modes.js';
import { ExploreMode } from './explore-mode.js';
import { parseShulkrStructure, serializeShulkrStructureToString } from './schematic-io.js';

const app = document.getElementById('app');
// 兜底: 防止旧缓存的 index.html(无 #app) 与新的 replica.js 并存导致 null 崩溃
const mount = app || document.body;
const loadingEl = document.getElementById('loading');
const loadStatus = document.getElementById('loadStatus');
const canvas3d = document.getElementById('view') || document.createElement('canvas');

const loader = createLoader(document.getElementById('loaderCanvas'), { size: 120 });
function setLoaderProgress(p){ loader.setValue(p); }
function setStatus(text, pct){ loadStatus.textContent = text; if (typeof pct === 'number') setLoaderProgress(pct); }

// ---- verbatim port of shulkr sun-direction helper (Vv) ----
function Vv(azDeg, elDeg){
  const n = azDeg * Math.PI / 180, r = elDeg * Math.PI / 180;
  return new THREE.Vector3(Math.cos(r) * Math.sin(n), Math.sin(r), Math.cos(r) * Math.cos(n)).normalize();
}

// ---- verbatim port of shulkr lighting/stage controller (Hv) ----
class ShulkrStage {
  constructor(scene, opts = {}){
    this.center = new THREE.Vector3();
    this.radius = 1;
    this.azDeg = 0; this.elDeg = 45;
    this.maxShadowMapSize = opts.maxShadowMapSize ?? 4096;
    this.ambient = new THREE.AmbientLight(0xffffff, opts.ambient ?? 0.45);
    this.hemisphere = new THREE.HemisphereLight(0xcfe6ff, 0x8899aa, opts.hemisphere ?? 0.8);
    this.light = new THREE.DirectionalLight(0xfff4e2, opts.sun ?? 1.85);
    this.light.castShadow = true;
    this.light.shadow.normalBias = 0.04;
    this.light.shadow.bias = -5e-4;
    scene.add(this.ambient); scene.add(this.hemisphere); scene.add(this.light); scene.add(this.light.target);
  }
  static configureRenderer(renderer){
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;   // shulkr: type 1 (PCF), not PCFSoft
    renderer.shadowMap.autoUpdate = false;
  }
  static invalidate(renderer){ renderer.shadowMap.needsUpdate = true; }
  setExtent(center, size){
    this.center.copy(center);
    this.radius = size / 2;
    const n = this.light.shadow.camera;
    n.left = -this.radius; n.right = this.radius; n.top = this.radius; n.bottom = -this.radius;
    const r = 2 ** Math.ceil(Math.log2(Math.max(1, size)));
    const i = Math.min(this.maxShadowMapSize, Math.max(1024, r));
    if (this.light.shadow.mapSize.x !== i){ this.light.shadow.mapSize.set(i, i); this.light.shadow.map && this.light.shadow.map.dispose(); this.light.shadow.map = null; }
    this.place();
  }
  aim(az, el){ this.azDeg = az; this.elDeg = el; this.place(); }
  place(){
    const e = Math.max(this.radius * 2, 1);
    this.light.target.position.copy(this.center);
    this.light.position.copy(this.center).addScaledVector(Vv(this.azDeg, this.elDeg), e);
    const t = this.light.shadow.camera;
    t.near = Math.max(0.05, e - this.radius * 1.05);
    t.far = e + this.radius * 1.05;
    t.updateProjectionMatrix();
  }
  dispose(){ this.light.shadow.map && this.light.shadow.map.dispose(); this.light.dispose(); this.ambient.dispose(); this.hemisphere.dispose(); }
}

// 阴影默认 OFF (用户: 人物太大 + 阴影导致看不清); 可一键开启 shulkr 真实阴影
let SHADOWS = false;

const renderer = new THREE.WebGLRenderer({ canvas: canvas3d, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
if (SHADOWS) ShulkrStage.configureRenderer(renderer);
mount.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe6e9ee);   // shulkr 风格浅色影棚背景
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 8000);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.dampingFactor = 0.08;
controls.zoomSpeed = 1.6;            // 我们的原始手感: 缩放更灵敏
controls.zoomToCursor = true;        // 滚轮缩放到光标处, 更接近直觉

const stage = new ShulkrStage(scene);
const camCtl = new ShulkrCameraController(camera, controls);

// 世界网格 (shulkr 风格自适应 LOD)
let grid = createShulkrGrid({ bgColorHex: 0xe6e9ee });
scene.add(grid);
let gridOn = true;
function setGrid(on, bp){
  grid.visible = on && !!bp;
  if (bp){
    const ext = Math.max(bp.size[0], bp.size[1], bp.size[2]);
    grid.setExtent(ext * 0.5);
    grid.setCenter(bp.size[0] / 2, bp.size[2] / 2);
    grid.setGroundY(0);
  }
}

const texLoader = new THREE.TextureLoader(); texLoader.crossOrigin = 'anonymous';
// 立方体几何: 每面施加 shulkr 风格的逐面明暗顶点色 (FACE_SHADE)
const geo = new THREE.BoxGeometry(1, 1, 1);
shulkrFaceVertexColors(geo, { ao: true });
let faceMap = {};

// 两种材质变体:
//  - Lambert(vertexColors) : shulkr 真实光照观感(逐面明暗 + 方向光)
//  - Basic (无光影)        : 纯平面无光照, 每面显示完整贴图色, 脚底不再发黑
let FLAT = false;
const matLambert = new Map();
const matFlat = new Map();
function hashColor(name){
  let h = 2166136261; for (let i = 0; i < name.length; i++){ h ^= name.charCodeAt(i); h = Math.imul(h, 16777619); }
  return new THREE.Color().setHSL(((h >>> 0) % 360) / 360, 0.45, 0.6);
}
function ensureMats(def){
  if (matLambert.has(def.name)) return;
  const lm = new THREE.MeshLambertMaterial({ vertexColors: true });
  const fm = new THREE.MeshBasicMaterial({ vertexColors: false });
  matLambert.set(def.name, lm);
  matFlat.set(def.name, fm);
  const file = def.texture;
  if (file){
    const url = '../assets/block-textures/' + (file.startsWith('minecraft/') ? file.slice('minecraft/'.length) : file);
    texLoader.load(url, t => {
      t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.colorSpace = THREE.SRGBColorSpace;
      lm.map = t; fm.map = t; lm.needsUpdate = true; fm.needsUpdate = true;
      if (SHADOWS) ShulkrStage.invalidate(renderer);
    }, undefined, () => { lm.color.set(0xff00ff); fm.color.set(0xff00ff); });
  } else {
    const c = hashColor(def.name);
    lm.color.copy(c); fm.color.copy(c);
  }
}
function getMat(def){ ensureMats(def); return FLAT ? matFlat.get(def.name) : matLambert.get(def.name); }
// 切换 无光影 / 真实光照 后就地替换已构建帧的材质
function applyRenderMode(){
  frameGroups.forEach(g => g.traverse(o => { if (o.isInstancedMesh) o.material = getMat(o.userData.def); }));
}

// 计算 blueprint 实际包围盒(用于相机框定 / 网格范围)
function computeBounds(bp){
  const b = bp.blocks;
  let mnx = 1e9, mny = 1e9, mnz = 1e9, mxx = -1e9, mxy = -1e9, mxz = -1e9;
  for (let i = 0; i < b.length; i += 4){
    const x = b[i], y = b[i + 1], z = b[i + 2];
    if (x < mnx) mnx = x; if (y < mny) mny = y; if (z < mnz) mnz = z;
    if (x > mxx) mxx = x; if (y > mxy) mxy = y; if (z > mxz) mxz = z;
  }
  return { min: { x: mnx, y: mny, z: mnz }, max: { x: mxx, y: mxy, z: mxz },
           size: [mxx - mnx + 1, mxy - mny + 1, mxz - mnz + 1] };
}

// 把 blueprint 里的方块按调色板 id 分组, 每组一个 InstancedMesh (shulkr 的方式)
function buildFrame(bp){
  const g = new THREE.Group();
  const b = bp.blocks;
  let mnx = 1e9, mny = 1e9, mnz = 1e9;
  for (let i = 0; i < b.length; i += 4){
    if (b[i] < mnx) mnx = b[i];
    if (b[i + 1] < mny) mny = b[i + 1];
    if (b[i + 2] < mnz) mnz = b[i + 2];
  }
  const byId = new Map();
  for (let i = 0; i < b.length; i += 4){
    const id = b[i + 3];
    let arr = byId.get(id); if (!arr){ arr = []; byId.set(id, arr); }
    arr.push(b[i] - mnx, b[i + 1] - mny, b[i + 2] - mnz);
  }
  const types = []; const meshes = [];
  for (const [id, pos] of byId){
    const def = bp.palette[id];
    const count = pos.length / 3;
    const mesh = new THREE.InstancedMesh(geo, getMat(def), count);
    mesh.castShadow = SHADOWS; mesh.receiveShadow = SHADOWS;
    mesh.userData.def = def; mesh.userData.type = id;
    const m = new THREE.Matrix4();
    for (let i = 0; i < count; i++){ m.makeTranslation(pos[i*3], pos[i*3+1], pos[i*3+2]); mesh.setMatrixAt(i, m); }
    mesh.instanceMatrix.needsUpdate = true; mesh.count = count;
    g.add(mesh); types.push(id); meshes.push(mesh);
  }
  g.userData.types = types; g.userData.meshes = meshes; g.userData.byId = byId; g.userData.match = null;
  return g;
}

// ---------------- 加载 & 动画 ----------------
// ---- 帧间平滑: 在播放器内做位置插值, 不重烤、不破坏体素实心观感 ----
function matchType(pa, pb){
  const inv = 0.5;
  const grid = new Map();
  const nb = pb.length / 3;
  for (let j = 0; j < nb; j++){
    const key = Math.floor(pb[j*3]*inv) + "_" + Math.floor(pb[j*3+1]*inv) + "_" + Math.floor(pb[j*3+2]*inv);
    let a = grid.get(key); if (!a){ a = []; grid.set(key, a); } a.push(j);
  }
  const na = pa.length / 3;
  const posB = new Float32Array(pa.length);
  for (let k = 0; k < na; k++){
    const ax = pa[k*3], ay = pa[k*3+1], az = pa[k*3+2];
    const gx = Math.floor(ax*inv), gy = Math.floor(ay*inv), gz = Math.floor(az*inv);
    let best = -1, bd = 1e18;
    for (let dx=-1; dx<=1; dx++) for (let dy=-1; dy<=1; dy++) for (let dz=-1; dz<=1; dz++){
      const arr = grid.get((gx+dx)+"_"+(gy+dy)+"_"+(gz+dz)); if (!arr) continue;
      for (const j of arr){ const ex=ax-pb[j*3], ey=ay-pb[j*3+1], ez=az-pb[j*3+2]; const d=ex*ex+ey*ey+ez*ez; if (d<bd){ bd=d; best=j; } }
    }
    if (best >= 0){ posB[k*3]=pb[best*3]; posB[k*3+1]=pb[best*3+1]; posB[k*3+2]=pb[best*3+2]; }
    else { posB[k*3]=ax; posB[k*3+1]=ay; posB[k*3+2]=az; }
  }
  return { posB };
}
function buildMatches(){
  for (let i = 0; i < frameGroups.length - 1; i++){
    const a = frameGroups[i], b = frameGroups[i+1];
    const m = {};
    for (const t of a.userData.types){
      const pa = a.userData.byId[t];
      const pb = b.userData.byId[t];
      m[t] = pb ? matchType(pa, pb) : { posB: pa };
    }
    a.userData.match = m;
  }
  if (frameGroups.length) frameGroups[frameGroups.length-1].userData.match = null;
}
function renderInterp(base, alpha){
  const a = frameGroups[base]; if (!a) return;
  const types = a.userData.types, meshes = a.userData.meshes, byId = a.userData.byId;
  const match = a.userData.match;
  for (let k = 0; k < meshes.length; k++){
    const t = types[k], mesh = meshes[k], pa = byId[t];
    const useMatch = match && match[t] && alpha > 0;
    const pb = useMatch ? match[t].posB : pa;
    const n = pa.length / 3;
    for (let i = 0; i < n; i++){
      let x, y, z;
      if (useMatch){ x = pa[i*3]+(pb[i*3]-pa[i*3])*alpha; y = pa[i*3+1]+(pb[i*3+1]-pa[i*3+1])*alpha; z = pa[i*3+2]+(pb[i*3+2]-pa[i*3+2])*alpha; }
      else { x = pa[i*3]; y = pa[i*3+1]; z = pa[i*3+2]; }
      tmpM.makeTranslation(x, y, z); mesh.setMatrixAt(i, tmpM);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }
  current = base;
  document.getElementById("fnum").textContent = base + 1;
  document.getElementById("scrub").value = base;
}

let blueprints = [];
let frameGroups = [];
let current = 0;
let playing = false, speed = 1, lastT = performance.now(), acc = 0;
let playT = 0;
const SRC_FPS = 30;
let SMOOTH = true;
const tmpM = new THREE.Matrix4();

async function loadAnimation(){
  const qp = new URLSearchParams(location.search);
  const framesSrc = qp.get('src') || '../data/frames.json';
  const resp = await fetch(framesSrc);
  const total = +resp.headers.get('Content-Length') || 0;
  let buf;
  if (resp.body && resp.body.getReader){
    const reader = resp.body.getReader(); const chunks = []; let received = 0;
    while (true){
      const { done, value } = await reader.read(); if (done) break;
      chunks.push(value); received += value.length;
      setStatus(total ? '下载帧数据 ' + Math.round(received/total*100) + '%' : '下载帧数据 ' + (received/1048576).toFixed(1) + ' MB', total ? received/total*100 : null);
    }
    buf = new Uint8Array(received); let off = 0; for (const c of chunks){ buf.set(c, off); off += c.length; }
  } else { buf = new Uint8Array(await resp.arrayBuffer()); }
  setStatus('解析帧数据…', 100);
  const frames = JSON.parse(new TextDecoder().decode(buf));
  faceMap = await (await fetch('../data/face-textures.json')).json();
  setStatus('构建 shulkr 蓝图 (双向桥) …', 100);
  blueprints = framesToBlueprint(frames, { textureFor: (name) => faceMap[name] || null });
  frameGroups = [];
  for (let fi = 0; fi < blueprints.length; fi++){
    const g = buildFrame(blueprints[fi]);
    g.visible = (fi === 0); scene.add(g); frameGroups.push(g);
    setStatus('构建场景 ' + Math.round((fi+1)/blueprints.length*100) + '%', (fi+1)/blueprints.length*100);
    await new Promise(r => requestAnimationFrame(r));
  }
  buildMatches();
  const per = Math.round(blueprints.reduce((a, bp) => a + bp.blocks.length/4, 0) / blueprints.length);
  document.getElementById('blk').textContent = per.toLocaleString();
  document.getElementById('ftot').textContent = blueprints.length;
  const bp0 = blueprints[0];
  const ext = Math.max(bp0.size[0], bp0.size[1], bp0.size[2]);
  const B = computeBounds(bp0);
  const W = B.size[0], H = B.size[1], D = B.size[2];
  // 人物已站在 y=0 水平面上(buildFrame 把最低方块平移到 0); 相机用 shulkr 等距轨道视图框住全身(含脚部)
  camCtl.setWorldBounds({ x: 0, y: 0, z: 0 }, { x: W, y: H, z: D });
  camCtl.setMode('orbit');   // iso 视图, target=(W/2,H/2,D/2)=模型中心
  stage.setExtent(new THREE.Vector3(W/2, H/2, D/2), Math.max(W, H, D));
  stage.aim(0, 45);
  if (SHADOWS) ShulkrStage.invalidate(renderer);
  setGrid(true, bp0);
  loadingEl.style.display = 'none'; loader.stop();
  document.getElementById('ui').style.display = 'flex';
  setupUI(blueprints.length);
}

function showFrame(i){
  const n = frameGroups.length; current = (i + n) % n; playT = current;
  frameGroups.forEach((g, k) => g.visible = (k === current));
  const bp = blueprints[current];
  stage.setExtent(new THREE.Vector3(bp.size[0]/2, bp.size[1]/2, bp.size[2]/2), Math.max(bp.size[0], bp.size[1], bp.size[2]));
  setGrid(gridOn, bp);
  renderInterp(current, 0);
}

let explore = new ExploreMode(camera, renderer.domElement, { orbitControls: controls });

function animate(){
  requestAnimationFrame(animate);
  const now = performance.now(); const dt = (now - lastT) / 1000; lastT = now;
  if (playing && SMOOTH){
    playT += dt * SRC_FPS * speed;
    const last = frameGroups.length - 1;
    if (playT >= last) playT -= last;
    if (playT < 0) playT = 0;
    let base = Math.floor(playT);
    if (base >= last) base = (last - 1 < 0) ? 0 : last - 1;
    renderInterp(base, playT - base);
  } else if (playing){
    acc += dt * 1000; const interval = 1000/(SRC_FPS*speed); while (acc >= interval){ acc -= interval; showFrame(current + 1); }
  }
  if (explore.enabled) explore.update(dt);
  else { camCtl.update(dt * 1000); controls.update(); }
  renderer.render(scene, camera);
}

function setupUI(n){
  const playBtn = document.getElementById('play');
  const scrub = document.getElementById('scrub');
  const speedSel = document.getElementById('speed');
  scrub.max = String(n - 1);
  playBtn.onclick = () => { playing = !playing; playBtn.textContent = playing ? '暂停' : '播放'; if (playing){ lastT = performance.now(); acc = 0; } };
  scrub.oninput = () => { playing = false; playBtn.textContent = '播放'; showFrame(parseInt(scrub.value, 10)); };
  document.getElementById('stepf').onclick = () => { playing = false; playBtn.textContent = '播放'; showFrame(current + 1); };
  document.getElementById('stepb').onclick = () => { playing = false; playBtn.textContent = '播放'; showFrame(current - 1); };
  speedSel.onchange = () => speed = parseFloat(speedSel.value);
  // 相机模式: orbit / plan / explore(俯视/贴近)
  const btnOrbit = document.getElementById('btnOrbit');
  const btnPlan = document.getElementById('btnPlan');
  const btnExplore = document.getElementById('btnExplore');
  function setCamButtons(active){
    btnOrbit.classList.toggle('on', active === 'orbit');
    btnPlan.classList.toggle('on', active === 'plan');
    btnExplore.classList.toggle('on', active === 'explore');
  }
  btnOrbit.onclick = () => { if (explore.enabled) explore.disable(); camCtl.setMode('orbit'); setCamButtons('orbit'); };
  btnPlan.onclick = () => { if (explore.enabled) explore.disable(); camCtl.setMode('plan'); setCamButtons('plan'); };
  btnExplore.onclick = () => {
    if (explore.enabled){ explore.disable(); setCamButtons('orbit'); }
    else { explore.enable(); setCamButtons('explore'); }
  };
  // 退出探索(按 Esc 失去指针锁)时, 让按钮状态回到 orbit
  window.addEventListener('shulkr-explore-exit', () => setCamButtons('orbit'));
  document.getElementById('btnShadow').onclick = (e) => {
    SHADOWS = !SHADOWS;
    if (SHADOWS) ShulkrStage.configureRenderer(renderer); else renderer.shadowMap.enabled = false;
    frameGroups.forEach(g => g.traverse(o => { if (o.isInstancedMesh){ o.castShadow = SHADOWS; o.receiveShadow = SHADOWS; } }));
    if (SHADOWS) ShulkrStage.invalidate(renderer);
    e.target.classList.toggle('on', SHADOWS);
  };
  document.getElementById('btnGrid').onclick = (e) => { gridOn = !gridOn; setGrid(gridOn, blueprints[current]); e.target.classList.toggle('on', gridOn); };
  document.getElementById('btnFlat').onclick = (e) => { FLAT = !FLAT; applyRenderMode(); e.target.classList.toggle('on', FLAT); };
  document.getElementById('btnSmooth').onclick = (e) => { SMOOTH = !SMOOTH; if (!SMOOTH){ showFrame(current); } e.target.classList.toggle('on', SMOOTH); };
  document.getElementById('btnExport').onclick = () => exportBlueprint();
  document.getElementById('file').onchange = (e) => { const f = e.target.files[0]; if (f) importStructure(f); };
  document.getElementById('btnImport').onclick = () => document.getElementById('file').click();
  window.addEventListener('keydown', e => {
    if (e.code === 'Space'){ e.preventDefault(); playBtn.click(); }
    else if (e.code === 'ArrowRight'){ showFrame(current + 1); }
    else if (e.code === 'ArrowLeft'){ showFrame(current - 1); }
  });
  window.addEventListener('resize', () => { camera.aspect = window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
}

function exportBlueprint(){
  const bp = blueprints[current];
  // 导出为真实 shulkr 结构格式(可被 shulkr 重新导入)
  const data = serializeShulkrStructureToString(bp);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (bp.name || 'shulkr') + '.shulkr-structure.json';
  a.click();
  setStatus('已导出 shulkr 结构: ' + a.download);
}

async function importStructure(file){
  try {
    const text = await file.text();
    const bp = parseShulkrStructure(text);
    blueprints = [bp];
    frameGroups.forEach(g => { scene.remove(g); g.traverse(o => { if (o.isInstancedMesh) o.dispose && o.dispose(); }); });
    frameGroups = [];
    const g = buildFrame(bp); g.visible = true; scene.add(g); frameGroups.push(g);
    const Ib = computeBounds(bp);
    camCtl.setWorldBounds({x:0,y:0,z:0}, {x:Ib.size[0],y:Ib.size[1],z:Ib.size[2]});
    stage.setExtent(new THREE.Vector3(Ib.size[0]/2, Ib.size[1]/2, Ib.size[2]/2), Math.max(Ib.size[0],Ib.size[1],Ib.size[2]));
    setGrid(gridOn, bp);
    setupUI(1);
    setStatus('已导入 shulkr 结构: ' + (bp.name || 'structure'));
  } catch (err) { setStatus('导入失败: ' + err.message); }
}

loadAnimation().catch(err => { setStatus('加载失败: ' + err.message); console.error(err); });
animate();
