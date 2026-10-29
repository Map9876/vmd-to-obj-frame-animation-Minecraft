import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';
import { decodeLitematic } from '../restored/litematic-parser.js';

const app = document.getElementById('app');
const loadingEl = document.getElementById('loading');
const loadStatus = document.getElementById('loadStatus');
import { createLoader } from './loader.js';
// Verbatim port of shulkr.com brand-cube loading animation (canvas, progress sweep).
const loader = createLoader(document.getElementById('loaderCanvas'), { size: 120 });
function setLoaderProgress(pct) { loader.setValue(pct); }
function setStatus(text, pct) {
  loadStatus.textContent = text;
  if (typeof pct === 'number') setLoaderProgress(pct);
}

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
// shulkr-like sun: blocks cast shadows onto each other (MC-style)
renderer.shadowMap.enabled = false; // default OFF: 人物太大+投影会糊住细节（可在代码里改 true 开启）
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e0f12);
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 4000);
camera.position.set(70, 70, 110);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, 0, 0);

const hemi = new THREE.HemisphereLight(0xffffff, 0x4a4a55, 0.35); scene.add(hemi);
scene.add(new THREE.AmbientLight(0xffffff, 0.22));
// sun: single shadow-casting directional light (MC-style directional shading + cast shadows)
const dir = new THREE.DirectionalLight(0xfff2d6, 1.7);
dir.position.set(90, 180, 120);
dir.castShadow = false; // default OFF（MC 式自投影：改 true 即开）
dir.shadow.mapSize.set(2048, 2048);
dir.shadow.camera.near = 1;
dir.shadow.camera.far = 600;
dir.shadow.camera.left = -150; dir.shadow.camera.right = 150;
dir.shadow.camera.top = 150; dir.shadow.camera.bottom = -150;
dir.shadow.bias = -0.0004;
dir.shadow.normalBias = 0.6;
dir.shadow.camera.updateProjectionMatrix();
scene.add(dir);
scene.add(dir.target);
// cool sky fill (no shadow), keeps shadowed sides readable
const dir2 = new THREE.DirectionalLight(0xbfd4ff, 0.35); dir2.position.set(-80, 40, -60); scene.add(dir2);

const texLoader = new THREE.TextureLoader();
texLoader.crossOrigin = 'anonymous';
const geo = new THREE.BoxGeometry(1, 1, 1);
// MC-style per-face shading baked into vertex colors (top brightest -> bottom darkest).
// BoxGeometry face order: +X,-X,+Y,-Y,+Z,-Z (4 verts each).
(function applyFaceShading(g) {
  const faceShade = [0.6, 0.6, 1.0, 0.5, 0.8, 0.8]; // east,west,top,bottom,south,north
  const colors = new Float32Array(g.attributes.position.count * 3);
  for (let f = 0; f < 6; f++) {
    const vsh = faceShade[f];
    for (let v = 0; v < 4; v++) {
      const i = (f * 4 + v) * 3;
      colors[i] = vsh; colors[i + 1] = vsh; colors[i + 2] = vsh;
    }
  }
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
})(geo);

function makeFallbackTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 16;
  const g = c.getContext('2d');
  g.fillStyle = '#ff4fd8'; g.fillRect(0, 0, 16, 16);
  g.fillStyle = '#2a2a2a'; g.fillRect(0, 0, 8, 8); g.fillRect(8, 8, 8, 8);
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const FALLBACK = makeFallbackTexture();

let faceMap = {};
const matCache = new Map();
async function ensureMaterials(names) {
  const todo = [...new Set(names)].filter(n => !matCache.has(n));
  await Promise.all(todo.map(name => {
    const rel = faceMap[name];
    const file = rel ? (rel.startsWith('minecraft/') ? rel.slice('minecraft/'.length) : rel) : null;
    const url = file ? ('./assets/block-textures/' + file) : null;
    return new Promise(resolve => {
      if (!url) { matCache.set(name, new THREE.MeshLambertMaterial({ map: FALLBACK, vertexColors: true })); return resolve(); }
      texLoader.load(url, t => {
        t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestMipmapNearestFilter;
        t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
        matCache.set(name, new THREE.MeshLambertMaterial({ map: t, vertexColors: true })); resolve();
      }, undefined, () => { matCache.set(name, new THREE.MeshLambertMaterial({ map: FALLBACK, vertexColors: true })); resolve(); });
    });
  }));
}
function getMat(name) { return matCache.get(name) || new THREE.MeshLambertMaterial({ map: FALLBACK, vertexColors: true }); }

// 由 {size, blocks:[{x,y,z,name}]} 构建一组 InstancedMesh
function buildGroup(sizeArr, blocksByGroup) {
  const g = new THREE.Group();
  const cx = sizeArr[0] / 2, cy = sizeArr[1] / 2, cz = sizeArr[2] / 2;
  for (const [name, pos] of Object.entries(blocksByGroup)) {
    const count = pos.length / 3;
    const mesh = new THREE.InstancedMesh(geo, getMat(name), count);
    mesh.castShadow = true; mesh.receiveShadow = true;
    const m = new THREE.Matrix4();
    for (let i = 0; i < count; i++) {
      m.makeTranslation(pos[i*3]-cx, pos[i*3+1]-cy, pos[i*3+2]-cz);
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true; mesh.count = count;
    g.add(mesh);
  }
  return g;
}

// ---------------- 30 帧动画 ----------------
let frameGroups = [];
let current = 0;
let animFrames = null;
let mode = 'anim';

async function loadAnimation() {
  const qp = new URLSearchParams(location.search);
  const framesSrc = qp.get('src') || './data/frames.json';
  // ---- streaming download with progress (covers the big 58MB transfer) ----
  const resp = await fetch(framesSrc);
  const total = +resp.headers.get('Content-Length') || 0;
  let buf;
  if (resp.body && resp.body.getReader) {
    const reader = resp.body.getReader();
    const chunks = []; let received = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value); received += value.length;
      setStatus(total
        ? '下载帧数据 ' + Math.round(received / total * 100) + '%'
        : '下载帧数据 ' + (received / 1048576).toFixed(1) + ' MB',
        total ? (received / total * 100) : null);
    }
    buf = new Uint8Array(received);
    let off = 0; for (const c of chunks) { buf.set(c, off); off += c.length; }
  } else {
    buf = new Uint8Array(await resp.arrayBuffer());
  }
  setStatus('解析帧数据…', 100);
  const frames = JSON.parse(new TextDecoder().decode(buf));
  const fm = await (await fetch('./data/face-textures.json')).json();
  console.log('frames source:', framesSrc, 'frames', frames.length);
  faceMap = fm; animFrames = frames;
  const used = new Set();
  frames.forEach(f => Object.keys(f.groups).forEach(n => used.add(n)));
  setStatus('加载材质…', 100);
  await ensureMaterials([...used]);
  // ---- build instanced meshes one frame at a time, reporting progress ----
  frameGroups = [];
  for (let fi = 0; fi < frames.length; fi++) {
    const frame = frames[fi];
    const g = buildGroup([frame.sx, frame.sy, frame.sz], frame.groups);
    g.visible = (fi === 0); scene.add(g); frameGroups.push(g);
    setStatus('构建场景 ' + Math.round((fi + 1) / frames.length * 100) + '%', (fi + 1) / frames.length * 100);
    // yield a frame so the loading text/animation actually paints between heavy builds
    await new Promise(r => requestAnimationFrame(r));
  }
  const per = Math.round(frames.reduce((a, f) => a + Object.values(f.groups).reduce((s, p) => s + p.length/3, 0), 0) / frames.length);
  document.getElementById('blk').textContent = per.toLocaleString();
  document.getElementById('ftot').textContent = frames.length;
  const maxY = Math.max(...frames.map(f => f.sy));
  camera.position.set(70, maxY * 0.6, 120);
  loadingEl.style.display = 'none';
  loader.stop();
  document.getElementById('ui').style.display = 'flex';
  setupUI(frames.length);
}

// ---------------- 上传 / 拖拽 ----------------
let uploadGroup = null;
async function showUpload(arrayBuffer, label) {
  loadingEl.style.display = 'flex'; loader.start(); setStatus('Decoding ' + label + ' …');
  try {
    const res = await decodeLitematic(arrayBuffer);
    const all = [];
    for (const reg of res.regions) for (const b of reg.blocks) all.push(b);
    const names = [...new Set(all.map(b => b.name))];
    await ensureMaterials(names);
    const groups = {};
    let minx=1e9,miny=1e9,minz=1e9,maxx=-1e9,maxy=-1e9,maxz=-1e9;
    for (const b of all) { if(b.x<minx)minx=b.x; if(b.x>maxx)maxx=b.x; if(b.y<miny)miny=b.y; if(b.y>maxy)maxy=b.y; if(b.z<minz)minz=b.z; if(b.z>maxz)maxz=b.z; }
    for (const b of all) (groups[b.name] ||= []).push(b.x, b.y, b.z);
    const size = [maxx-minx+1, maxy-miny+1, maxz-minz+1];
    for (const k of Object.keys(groups)) { const a = groups[k]; for (let i=0;i<a.length;i+=3){ a[i]-=minx; a[i+1]-=miny; a[i+2]-=minz; } }
    const g = buildGroup(size, groups);
    if (uploadGroup) { scene.remove(uploadGroup); disposeGroup(uploadGroup); }
    uploadGroup = g; g.visible = true; scene.add(g);
    frameGroups.forEach(fg => fg.visible = false);
    mode = 'upload';
    document.getElementById('ui').style.display = 'none';
    document.getElementById('backBtn').style.display = 'inline-block';
    document.getElementById('uploadBtn').style.display = 'none';
    document.getElementById('blk').textContent = all.length.toLocaleString();
    controls.target.set(0,0,0);
    camera.position.set(size[0]*1.2, size[1]*0.6, size[2]*1.6 + 60);
    loadingEl.style.display = 'none';
  loader.stop();
  } catch (e) {
    setStatus('解码失败: ' + e.message);
  }
}
function disposeGroup(g) { g.traverse(o => { if (o.isInstancedMesh) { o.geometry.dispose?.(); } }); }
function backToAnim() {
  if (uploadGroup) { scene.remove(uploadGroup); disposeGroup(uploadGroup); uploadGroup = null; }
  mode = 'anim';
  frameGroups.forEach((fg, i) => fg.visible = (i === current));
  document.getElementById('ui').style.display = 'flex';
  document.getElementById('backBtn').style.display = 'none';
  document.getElementById('uploadBtn').style.display = 'inline-block';
}

document.getElementById('uploadBtn').onclick = () => document.getElementById('file').click();
document.getElementById('file').onchange = (e) => {
  const f = e.target.files[0]; if (!f) return;
  f.arrayBuffer().then(ab => showUpload(ab, f.name));
};
document.getElementById('backBtn').onclick = backToAnim;
const dropEl = document.getElementById('drop');
window.addEventListener('dragover', e => { e.preventDefault(); dropEl.classList.add('show'); });
window.addEventListener('dragleave', e => { if (e.target === dropEl || e.relatedTarget === null) dropEl.classList.remove('show'); });
window.addEventListener('drop', e => {
  e.preventDefault(); dropEl.classList.remove('show');
  const f = e.dataTransfer.files[0]; if (f) f.arrayBuffer().then(ab => showUpload(ab, f.name));
});

// ---------------- 播放控制 ----------------
let playing = false, speed = 1, lastT = performance.now(), acc = 0;
function showFrame(i) {
  const n = frameGroups.length; current = (i + n) % n;
  frameGroups.forEach((g, k) => g.visible = (k === current));
  document.getElementById('scrub').value = current;
  document.getElementById('fnum').textContent = current + 1;
}
function animate() {
  requestAnimationFrame(animate);
  const now = performance.now(); const dt = now - lastT; lastT = now;
  if (playing && mode === 'anim') {
    acc += dt; const interval = 1000 / (30 * speed);
    while (acc >= interval) { acc -= interval; showFrame(current + 1); }
  }
  controls.update();
  renderer.render(scene, camera);
}
function setupUI(n) {
  const playBtn = document.getElementById('play');
  const scrub = document.getElementById('scrub');
  const speedSel = document.getElementById('speed');
  scrub.max = String(n - 1);
  playBtn.onclick = () => { playing = !playing; playBtn.textContent = playing ? '⏸ 暂停' : '▶ Play'; if (playing) { lastT = performance.now(); acc = 0; } };
  scrub.oninput = () => { playing = false; playBtn.textContent = '▶ Play'; showFrame(parseInt(scrub.value, 10)); };
  document.getElementById('stepf').onclick = () => { playing = false; playBtn.textContent = '▶ Play'; showFrame(current + 1); };
  document.getElementById('stepb').onclick = () => { playing = false; playBtn.textContent = '▶ Play'; showFrame(current - 1); };
  speedSel.onchange = () => speed = parseFloat(speedSel.value);
  window.addEventListener('keydown', e => {
    if (e.code === 'Space') { e.preventDefault(); if (mode==='anim') playBtn.click(); }
    else if (e.code === 'ArrowRight') { if (mode==='anim') showFrame(current + 1); }
    else if (e.code === 'ArrowLeft') { if (mode==='anim') showFrame(current - 1); }
  });
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

loadAnimation().catch(err => { setStatus('加载失败: ' + err.message); console.error(err); });
animate();
