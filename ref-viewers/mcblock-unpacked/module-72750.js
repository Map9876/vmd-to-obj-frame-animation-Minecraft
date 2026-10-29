import { $EB, BKk, CSG, DXC, G_z, I9Y, LoY, N5j, NRn, Pq0, Q1f, THS, Tap, Wk7, YJl, Z58, ZyN, bdM, cj9, dth, eaF, er$, hB5, hxR, kn4, mrM, q2, ubm } from "./module-85339.js";
import { WebGLRenderer } from "./module-87548.js";
import { L as L_1 } from "./module-2519.js";
import { V as V_1 } from "./module-44777.js";
let i = /glass|leaves|pane|bars|ladder|rail|vine|chain|torch|lantern|sapling|flower|rose|bush|azalea|fern|grass|cluster|bud|sign|banner|scaffolding|door|trapdoor|fence|gate|wall|carpet|slab|stairs|button|pressure|lever|candle|pot|bed|cake|web|snow_layer|amethyst|lectern|campfire|end_rod|cocoa|farmland|dirt_path/;
let s = [
    [
        0,
        0,
        0,
        1,
        0,
        0
    ],
    [
        1,
        0,
        0,
        1,
        0,
        1
    ],
    [
        1,
        0,
        1,
        0,
        0,
        1
    ],
    [
        0,
        0,
        1,
        0,
        0,
        0
    ],
    [
        0,
        1,
        0,
        1,
        1,
        0
    ],
    [
        1,
        1,
        0,
        1,
        1,
        1
    ],
    [
        1,
        1,
        1,
        0,
        1,
        1
    ],
    [
        0,
        1,
        1,
        0,
        1,
        0
    ],
    [
        0,
        0,
        0,
        0,
        1,
        0
    ],
    [
        1,
        0,
        0,
        1,
        1,
        0
    ],
    [
        1,
        0,
        1,
        1,
        1,
        1
    ],
    [
        0,
        0,
        1,
        0,
        1,
        1
    ]
];
const u = require(11428);
let f = cj9.degToRad(33);
export let DROP_MS = 320;
export function inject(e, t, a) {
    e.onBeforeCompile = (e)=>{
        e.uniforms.uStep = t.uStep;
        e.uniforms.uCur = t.uCur;
        e.uniforms.uPulse = t.uPulse;
        e.uniforms.uDrop = t.uDrop;
        e.vertexShader = e.vertexShader.replace("#include <common>", "#include <common>\nattribute float aStep; attribute float aHide; varying float vStep; varying float vHide; uniform float uCur; uniform float uDrop;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvStep = aStep; vHide = aHide;\nif (abs(aStep - uCur) < 0.5) transformed.y += uDrop * 1.40;");
        e.fragmentShader = e.fragmentShader.replace("#include <common>", "#include <common>\nuniform float uStep; uniform float uCur; uniform float uPulse; varying float vStep; varying float vHide;").replace("#include <clipping_planes_fragment>", `#include <clipping_planes_fragment>
${a.discard}`).replace("#include <color_fragment>", `#include <color_fragment>
${a.color || ""}`);
    };
    e.customProgramCacheKey = ()=>a.key;
    return e;
}
export let RULE_SOLID = {
    key: "solid",
    discard: "if (vStep > uStep + 0.5) discard;\nif (vHide <= uStep + 0.5) discard;",
    color: "if (abs(vStep - uCur) < 0.5) diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.36, 0.85, 0.28), 0.34 + 0.26 * uPulse); else diffuseColor.rgb *= 0.86;"
};
export let RULE_CUR = {
    key: "cur",
    discard: "if (abs(vStep - uCur) > 0.5) discard;"
};
let h = {
    foliage: 7842607,
    birch: 8431445,
    spruce: 6396257
};
export function tintFor(e, t) {
    if (t && (t[0] < 0.98 || t[1] < 0.98 || t[2] < 0.98)) {
        return new Q1f(t[0], t[1], t[2]);
    }
    return new Q1f(/birch_leaves/.test(e) ? h.birch : /spruce_leaves/.test(e) ? h.spruce : /(oak|jungle|acacia|mangrove|dark_oak)_leaves|^vine$|sugar_cane/.test(e) ? h.foliage : 16777215);
}
function g(e, t) {
    e.idx = Math.max(0, Math.min(e.max, t));
    e.U.uStep.value = e.idx;
    e.U.uCur.value = e.idx;
    e.since = performance.now();
}
export function createStage(canvas, t, a) {
    let h = new WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });
    h.setClearColor(0, 0);
    h.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    h.shadowMap.enabled = true;
    h.shadowMap.type = Wk7;
    let w = new Z58;
    w.add(new dth(16777215, 9408399, 1.75));
    let M = new ZyN(16777215, 1.05);
    M.position.set(5, 10, 6);
    w.add(M);
    M.castShadow = true;
    M.shadow.mapSize.set(1024, 1024);
    M.shadow.bias = -0.00015;
    M.shadow.normalBias = 0.025;
    M.shadow.camera.near = 0.5;
    M.shadow.camera.far = 180;
    w.add(M.target);
    let y = new ZyN(16777215, 0.6);
    y.position.set(-6, 4, -3);
    w.add(y);
    let x = new ubm(30, 1, 0.1, 600);
    let b = false;
    let S = true;
    let A = 1;
    let C = 1;
    let P = 40;
    let z = 40;
    let F = 0;
    let _ = 0;
    let E = true;
    let L = 0;
    let R = null;
    let T = null;
    let H = 0;
    let k = 10;
    let j = new Pq0(5, 5, 5);
    let D = new Pq0(5, 5, 5);
    let U = new Map;
    let Y = new Map;
    let map = null;
    let O = null;
    let B = new Map;
    function Z() {
        let e = a.margin(A, C);
        return {
            l: e.l,
            r: A - e.r,
            t: e.t,
            b: C - e.b
        };
    }
    function q() {
        let e = T;
        if (!e) {
            return;
        }
        let e_cum = e.cum;
        let r = 6 * Math.max(0, Math.min(e.max, e.idx));
        let o = (e_cum[r + 3] - e_cum[r]) / 2;
        let l = (e_cum[r + 4] - e_cum[r + 1]) / 2;
        let i = (e_cum[r + 5] - e_cum[r + 2]) / 2;
        let s = (e_cum[r + 1] + e_cum[r + 4]) / 2;
        let u = Math.max(l, 0.35 * D.y);
        j.set(Math.max(o, 0.6 * D.x), u, Math.max(i, 0.6 * D.z));
        _ = Math.max(-D.y + u, Math.min(D.y - u, s));
        z = (()=>{
            let e = cj9.degToRad(30);
            let t = k / Math.sin(e / 2) * 0.7;
            let r = Z();
            let o = _;
            let l = [];
            for (let e of [
                -1,
                1
            ]){
                for (let t of [
                    -1,
                    1
                ]){
                    for (let a of [
                        -1,
                        1
                    ]){
                        l.push(new Pq0(e * j.x, o + t * j.y, a * j.z));
                    }
                }
            }
            let i = new kn4;
            let s = new Pq0;
            for(let e = 0; e < 4; e++){
                x.position.set(0, o + t * Math.sin(f), t * Math.cos(f));
                x.lookAt(0, o, 0);
                x.updateMatrixWorld(true);
                s.set(0, o, 0).project(x);
                let e = (s.x + 1) / 2 * A;
                let n = (1 - s.y) / 2 * C;
                let u = 0;
                let d = 0;
                let p = 0;
                let c = 0;
                for(let t = 0; t < 16; t++){
                    for (let a of (i.makeRotationY(t / 16 * Math.PI * 2), l)){
                        s.copy(a).applyMatrix4(i).project(x);
                        let t = (s.x + 1) / 2 * A;
                        let r = (1 - s.y) / 2 * C;
                        u = Math.max(u, e - t);
                        d = Math.max(d, t - e);
                        p = Math.max(p, n - r);
                        c = Math.max(c, r - n);
                    }
                }
                t *= Math.max(u / Math.max(1, e - r.l), d / Math.max(1, r.r - e), p / Math.max(1, n - r.t), c / Math.max(1, r.b - n)) * a.fill;
            }
            return t;
        })();
    }
    function resize() {
        if (b) {
            return;
        }
        let t = canvas.getBoundingClientRect();
        A = Math.max(1, t.width);
        C = Math.max(1, t.height);
        h.setSize(A, C, false);
        let a = h.getDrawingBufferSize(new I9Y);
        let matches = window.matchMedia("(max-width: 1023px)").matches;
        U.forEach((e)=>e.ground?.setViewport(a, matches));
        x.aspect = A / C;
        let o = Z();
        let l = ((o.l + o.r) / 2 - A / 2) / A;
        let i = ((o.t + o.b) / 2 - C / 2) / C;
        if (Math.abs(l) > 0.001 || Math.abs(i) > 0.001) {
            x.setViewOffset(A, C, -A * l, -C * i, A, C);
        } else {
            x.clearViewOffset();
        }
        x.updateProjectionMatrix();
        if (T) {
            q();
        }
    }
    function W(e, t) {
        let a = !T;
        if (T) {
            T.pivot.visible = false;
        }
        T = e;
        k = e.radius;
        D.copy(e.size).multiplyScalar(0.5);
        e.pivot.visible = true;
        e.pivot.rotation.y = e.yaw + 0.55;
        let n = Math.max(8, 1.7 * (Math.hypot(e.size.x, e.size.z) / 2) + 3);
        Object.assign(M.shadow.camera, {
            left: -n,
            right: n,
            top: n,
            bottom: -n
        });
        M.shadow.camera.updateProjectionMatrix();
        if (e.idx < 1) {
            g(e, 1);
        }
        q();
        if (t || a) {
            P = z;
            F = _;
        }
        E = true;
        e.playing = true;
        e.since = performance.now();
    }
    async function N(e) {
        let M;
        let y = t[e];
        let [x, b] = await Promise.all([
            (!O && (O = new Tap().loadAsync(`${a.modelBase}atlas.png`).then((e)=>{
                e.magFilter = hxR;
                e.minFilter = hxR;
                e.generateMipmaps = false;
                e.colorSpace = er$;
                e.needsUpdate = true;
                map = e;
                return e;
            })), O),
            y.stepDataUrl ? fetch(y.stepDataUrl).then((e)=>{
                if (e.ok) {
                    return e.json();
                }
                return Promise.reject(Error(`steps ${e.status}`));
            }) : Promise.resolve(null)
        ]);
        let S = await new V_1().setPath(a.modelBase).loadAsync(`${y.modelKey}.mtl.txt`);
        S.create = (e)=>{
            var a;
            let r;
            a = S.materialsInfo[e]?.kd;
            if (!(r = B.get(e))) {
                r = new G_z({
                    map,
                    color: tintFor(e, a),
                    alphaTest: 0.5,
                    side: $EB
                });
                r.name = e;
                B.set(e, r);
            }
            return r;
        };
        let A = await new L_1().setMaterials(S).setPath(a.modelBase).loadAsync(`${y.modelKey}.obj.txt`);
        let C = 0.5 / (x.image?.width || 2048);
        A.traverse((e)=>{
            if (!e.isMesh) {
                return;
            }
            let t = e.geometry.getAttribute("uv");
            if (t) {
                for(let e = 0; e < t.count / 3; e++){
                    let a = 3 * e;
                    let n = (t.getX(a) + t.getX(a + 1) + t.getX(a + 2)) / 3;
                    let r = (t.getY(a) + t.getY(a + 1) + t.getY(a + 2)) / 3;
                    for(let e = 0; e < 3; e++){
                        let o = a + e;
                        let l = t.getX(o);
                        let i = t.getY(o);
                        t.setXY(o, l + Math.sign(n - l) * Math.min(C, Math.abs(n - l)), i + Math.sign(r - i) * Math.min(C, Math.abs(r - i)));
                    }
                }
                t.needsUpdate = true;
            }
        });
        if (b) {
            M = ((e)=>{
                let n = u.lC(e, "内饰")?.steps ?? [
                    {
                        chapter: "",
                        root: "",
                        count: 0,
                        fast: false
                    }
                ];
                let r = u.W_(e);
                let o = (e, t, a)=>`${e},${t},${a}`;
                let l = n.length - 1;
                let i = [
                    [
                        0,
                        -1,
                        0
                    ],
                    [
                        1,
                        0,
                        0
                    ],
                    [
                        -1,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        1
                    ],
                    [
                        0,
                        0,
                        -1
                    ],
                    [
                        0,
                        1,
                        0
                    ]
                ];
                return {
                    steps: n,
                    stepOf: (e, t, a)=>r.get(o(e, t, a)) ?? ((e, t, a)=>{
                            let n = -1;
                            for (let [l, s, u] of i){
                                let i = r.get(o(e + l, t + s, a + u));
                                if (i !== undefined && i > n) {
                                    n = i;
                                }
                            }
                            if (n > 0) {
                                return n;
                            }
                            return null;
                        })(e, t, a) ?? l,
                    isStray: (e, t, a)=>!r.has(o(e, t, a))
                };
            })(b);
        } else {
            let e = new NRn().setFromObject(A);
            M = ((e, t)=>{
                let a = [
                    {
                        chapter: "",
                        root: "",
                        count: 0,
                        fast: false
                    }
                ];
                for(let t = 0; t < e; t++){
                    a.push({
                        chapter: "按层",
                        root: "按层",
                        count: 0,
                        fast: false
                    });
                }
                return {
                    steps: a,
                    stepOf: (a, n)=>Math.max(1, Math.min(e, n - t + 1)),
                    isStray: ()=>false
                };
            })(Math.max(1, Math.round(e.max.y - e.min.y)), Math.round(e.min.y));
        }
        let P = ((e, t, a, yaw)=>{
            let U_1 = {
                uStep: {
                    value: 0
                },
                uCur: {
                    value: 0
                },
                uPulse: {
                    value: 0
                },
                uDrop: {
                    value: 0
                }
            };
            let l = new Map;
            let u = new Map;
            let f = [];
            for (let a of (e.traverse((e)=>{
                if (!e.isMesh) {
                    return;
                }
                let e_geometry = e.geometry;
                let r = e_geometry.getAttribute("position");
                let i = e_geometry.getAttribute("normal");
                let s = Array.isArray(e.material) ? e.material[0] : e.material;
                let s_name = s.name;
                let m = new Float32Array(r.count);
                for(let e = 0; e < r.count / 3; e++){
                    let a = 3 * e;
                    let n = (r.getX(a) + r.getX(a + 1) + r.getX(a + 2)) / 3;
                    let o = (r.getY(a) + r.getY(a + 1) + r.getY(a + 2)) / 3;
                    let s = (r.getZ(a) + r.getZ(a + 1) + r.getZ(a + 2)) / 3;
                    let u = i ? i.getX(a) : 0;
                    let f = i ? i.getY(a) : 0;
                    let p = i ? i.getZ(a) : 0;
                    let x_1 = Math.floor(n - 0.02 * u);
                    let y_1 = Math.floor(o - 0.02 * f);
                    let z_1 = Math.floor(s - 0.02 * p);
                    let g = `${x_1},${y_1},${z_1}`;
                    let w = l.get(g);
                    if (!w) {
                        w = {
                            x: x_1,
                            y: y_1,
                            z: z_1,
                            mat: s_name,
                            step: t.stepOf(x_1, y_1, z_1),
                            stray: t.isStray(x_1, y_1, z_1),
                            lo: [
                                9,
                                9,
                                9
                            ],
                            hi: [
                                -9,
                                -9,
                                -9
                            ]
                        };
                        l.set(g, w);
                    }
                    for(let e = 0; e < 3; e++){
                        let t = a + e;
                        let n = r.getX(t) - x_1;
                        let o = r.getY(t) - y_1;
                        let l = r.getZ(t) - z_1;
                        if (n < w.lo[0]) {
                            w.lo[0] = n;
                        }
                        if (n > w.hi[0]) {
                            w.hi[0] = n;
                        }
                        if (o < w.lo[1]) {
                            w.lo[1] = o;
                        }
                        if (o > w.hi[1]) {
                            w.hi[1] = o;
                        }
                        if (l < w.lo[2]) {
                            w.lo[2] = l;
                        }
                        if (l > w.hi[2]) {
                            w.hi[2] = l;
                        }
                    }
                    m[a] = m[a + 1] = m[a + 2] = w.step;
                }
                e_geometry.setAttribute("aStep", new THS(m, 1));
                f.push(e);
                let h = u.get(s_name);
                if (!h) {
                    h = inject(s.clone(), U_1, RULE_SOLID);
                    u.set(s_name, h);
                }
                e.material = h;
            }), l.values())){
                a.full = !i.test(a.mat) && a.hi[0] - a.lo[0] > 0.98 && a.hi[1] - a.lo[1] > 0.98 && a.hi[2] - a.lo[2] > 0.98;
            }
            for (let e of f){
                let t = e.geometry;
                let a = t.getAttribute("position");
                let r = t.getAttribute("normal");
                let o = new Float32Array(a.count).fill(1000000);
                for(let e = 0; e < a.count / 3; e++){
                    let t = 3 * e;
                    let n = r ? r.getX(t) : 0;
                    let i = r ? r.getY(t) : 0;
                    let s = r ? r.getZ(t) : 0;
                    let u = 0;
                    let f = 0;
                    let d = 0;
                    if (Math.abs(n) > 0.99) {
                        u = n > 0 ? 1 : -1;
                    } else if (Math.abs(i) > 0.99) {
                        f = i > 0 ? 1 : -1;
                    } else {
                        if (!(Math.abs(s) > 0.99)) {
                            continue;
                        }
                        d = s > 0 ? 1 : -1;
                    }
                    let p = (a.getX(t) + a.getX(t + 1) + a.getX(t + 2)) / 3;
                    let c = (a.getY(t) + a.getY(t + 1) + a.getY(t + 2)) / 3;
                    let m = (a.getZ(t) + a.getZ(t + 1) + a.getZ(t + 2)) / 3;
                    let h = Math.floor(p - 0.02 * n);
                    let v = Math.floor(c - 0.02 * i);
                    let g = Math.floor(m - 0.02 * s);
                    if (!(u ? Math.abs(p - (h + +(u > 0))) < 0.01 : f ? Math.abs(c - (v + +(f > 0))) < 0.01 : Math.abs(m - (g + +(d > 0))) < 0.01)) {
                        continue;
                    }
                    let w = l.get(`${h},${v},${g}`);
                    let M = l.get(`${h + u},${v + f},${g + d}`);
                    if (M && M.full && w && w.full) {
                        o[t] = o[t + 1] = o[t + 2] = M.step;
                    }
                }
                t.setAttribute("aHide", new THS(o, 1));
            }
            let d = [
                ...l.values()
            ];
            let h = new YJl;
            h.add(((e, U_1_1)=>{
                let a = [];
                let r = [];
                for (let t of e){
                    for (let e of s){
                        a.push(t.x + e[0], t.y + e[1], t.z + e[2], t.x + e[3], t.y + e[4], t.z + e[5]);
                        r.push(t.step, t.step);
                    }
                }
                let o = new LoY;
                o.setAttribute("position", new THS(new Float32Array(a), 3));
                o.setAttribute("aStep", new THS(new Float32Array(r), 1));
                o.setAttribute("aHide", new THS(new Float32Array(r.length).fill(1000000), 1));
                return new DXC(o, inject(new mrM({
                    color: 4767542
                }), U_1_1, RULE_CUR));
            })(d.filter((e)=>!e.stray), U_1));
            let v = new NRn().setFromObject(e);
            let w = v.getCenter(new Pq0);
            let size = v.getSize(new Pq0);
            let pivot = new YJl;
            e.position.set(-w.x, -w.y, -w.z);
            h.position.copy(e.position);
            pivot.add(e);
            pivot.add(h);
            let max = t.steps.length - 1;
            let cum = new Float32Array((max + 1) * 6);
            let S = Array(max + 1).fill(null);
            for (let e of d){
                if (e.step < 1) {
                    continue;
                }
                let t = Math.min(max, e.step);
                let a = S[t];
                if (!a) {
                    a = [
                        Infinity,
                        Infinity,
                        Infinity,
                        -Infinity,
                        -Infinity,
                        -Infinity
                    ];
                    S[t] = a;
                }
                if (e.x < a[0]) {
                    a[0] = e.x;
                }
                if (e.y < a[1]) {
                    a[1] = e.y;
                }
                if (e.z < a[2]) {
                    a[2] = e.z;
                }
                if (e.x + 1 > a[3]) {
                    a[3] = e.x + 1;
                }
                if (e.y + 1 > a[4]) {
                    a[4] = e.y + 1;
                }
                if (e.z + 1 > a[5]) {
                    a[5] = e.z + 1;
                }
            }
            let A = [
                Infinity,
                Infinity,
                Infinity,
                -Infinity,
                -Infinity,
                -Infinity
            ];
            for(let e = 0; e <= max; e++){
                let t = S[e];
                if (t) {
                    A = [
                        Math.min(A[0], t[0]),
                        Math.min(A[1], t[1]),
                        Math.min(A[2], t[2]),
                        Math.max(A[3], t[3]),
                        Math.max(A[4], t[4]),
                        Math.max(A[5], t[5])
                    ];
                }
                cum.set(isFinite(A[0]) ? [
                    A[0] - w.x,
                    A[1] - w.y,
                    A[2] - w.z,
                    A[3] - w.x,
                    A[4] - w.y,
                    A[5] - w.z
                ] : [
                    -size.x / 2,
                    -size.y / 2,
                    -size.z / 2,
                    size.x / 2,
                    size.y / 2,
                    size.z / 2
                ], 6 * e);
            }
            let C = {
                pivot,
                ground: null,
                depthMaterial: null,
                radius: size.length() / 2,
                size,
                yaw,
                U: U_1,
                steps: t.steps,
                max,
                cum,
                idx: 0,
                since: 0,
                playing: true
            };
            g(C, a);
            return C;
        })(A, M, b ? y.startAt ?? 60 : 1, y.yaw ?? -0.62);
        P.ground = ((e, t, a, r, o)=>{
            let l = Math.hypot(a.x, a.z) / 2;
            let i = 2.7 * l * 2.3;
            let s = ()=>new bdM(1, 1).rotateX(-Math.PI / 2);
            let u = new BKk({
                transparent: true,
                depthWrite: false,
                toneMapped: false,
                side: hB5,
                vertexShader: "\nuniform float extent;\nuniform vec2 offset;\nvarying vec2 vCell;\nvarying vec2 vLocal;\nvoid main() {\n  vec2 local = position.xz * extent;\n  vCell = local - offset;\n  vLocal = local;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}",
                fragmentShader: "\nuniform float radius;\nuniform vec2 viewport;\nuniform float leftFade;\nvarying vec2 vCell;\nvarying vec2 vLocal;\nfloat lineAt(float size, float thickness) {\n  vec2 p = vCell / size;\n  vec2 d = abs(fract(p - 0.5) - 0.5) / (fwidth(p) * thickness);\n  return 1.0 - min(min(d.x, d.y), 1.0);\n}\nvoid main() {\n  float minor = lineAt(1.0, 1.0);\n  float major = lineAt(12.0, 0.8);\n  float distanceFade = 1.0 - smoothstep(radius * 1.05, radius * 2.7, length(vLocal));\n  float layoutFade = smoothstep(leftFade, leftFade + 0.14, gl_FragCoord.x / viewport.x);\n  /* WebGL 的屏幕坐标从左下起算：在舞台底部提前淡出，避免被容器硬裁成一条横线。 */\n  float bottomFade = smoothstep(0.0, 0.12, gl_FragCoord.y / viewport.y);\n  float alpha = max(minor * 0.075, major * 0.16) * distanceFade * 1.3 * layoutFade * bottomFade;\n  if (alpha <= 0.002) discard;\n  gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);\n}",
                uniforms: {
                    extent: {
                        value: i
                    },
                    offset: {
                        value: new I9Y(t.position.x, t.position.z)
                    },
                    radius: {
                        value: l
                    },
                    viewport: {
                        value: r.clone()
                    },
                    leftFade: {
                        value: 0.37 * !o
                    }
                }
            });
            let grid = new eaF(s(), u);
            grid.position.y = -a.y / 2 - 0.01;
            grid.scale.set(i, 1, i);
            grid.renderOrder = -2;
            grid.frustumCulled = false;
            grid.raycast = ()=>{};
            let d = new q2({
                opacity: 0.55,
                depthWrite: false,
                side: hB5
            });
            let shadow = new eaF(s(), d);
            shadow.position.y = -a.y / 2 + 0.004;
            shadow.scale.set(i, 1, i);
            shadow.receiveShadow = true;
            shadow.renderOrder = -1;
            shadow.frustumCulled = false;
            shadow.raycast = ()=>{};
            e.add(grid, shadow);
            return {
                grid,
                shadow,
                setViewport (e, t) {
                    u.uniforms.viewport.value.copy(e);
                    u.uniforms.leftFade.value = 0.37 * !t;
                }
            };
        })(P.pivot, A, P.size, h.getDrawingBufferSize(new I9Y), window.matchMedia("(max-width: 1023px)").matches);
        let z = ((e, map)=>{
            let a = new CSG({
                depthPacking: N5j,
                map,
                alphaTest: 0.5,
                side: $EB
            });
            a.onBeforeCompile = (t)=>{
                t.uniforms.uStep = e.uStep;
                t.uniforms.uCur = e.uCur;
                t.uniforms.uDrop = e.uDrop;
                t.vertexShader = t.vertexShader.replace("#include <common>", "#include <common>\nattribute float aStep; attribute float aHide; varying float vStep; varying float vHide; uniform float uCur; uniform float uDrop;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvStep = aStep; vHide = aHide; if (abs(aStep - uCur) < 0.5) transformed.y += uDrop * 1.4;");
                t.fragmentShader = t.fragmentShader.replace("#include <common>", "#include <common>\nuniform float uStep; varying float vStep; varying float vHide;").replace("#include <clipping_planes_fragment>", "#include <clipping_planes_fragment>\nif (vStep > uStep + 0.5) discard; if (vHide <= uStep + 0.5) discard;");
            };
            a.customProgramCacheKey = ()=>"step-landing-depth-v1";
            return a;
        })(P.U, x);
        P.depthMaterial = z;
        A.traverse((e)=>{
            if (e.isMesh) {
                e.castShadow = true;
                e.customDepthMaterial = z;
            }
        });
        P.pivot.visible = false;
        w.add(P.pivot);
        return P;
    }
    let V = null;
    let G = 0;
    let K = (t)=>{
        V = t.clientX;
        G = performance.now();
        L = 0;
        canvas.setPointerCapture(t.pointerId);
        canvas.parentElement?.classList.add("is-grabbing");
        E = false;
        if (R) {
            clearTimeout(R);
        }
        if (T) {
            T.playing = false;
        }
    };
    let $ = (e)=>{
        if (V === null || !T) {
            return;
        }
        let t = performance.now();
        let a = Math.max(8, t - G) / 1000;
        let n = (e.clientX - V) * 0.0075;
        V = e.clientX;
        G = t;
        T.pivot.rotation.y += n;
        L = 0.6 * L + n / a * 0.4;
    };
    let J = ()=>{
        var t;
        if (V !== null) {
            V = null;
            if ((t = canvas.parentElement) != null) {
                t.classList.remove("is-grabbing");
            }
            L = Math.max(-6, Math.min(6, L));
            if (R) {
                clearTimeout(R);
            }
            R = setTimeout(()=>{
                E = true;
                if (T) {
                    T.playing = true;
                    T.since = performance.now();
                }
            }, 2000);
        }
    };
    canvas.addEventListener("pointerdown", K);
    canvas.addEventListener("pointermove", $);
    canvas.addEventListener("pointerup", J);
    canvas.addEventListener("pointercancel", J);
    let Q = performance.now();
    let ee = 0;
    ee = requestAnimationFrame(function e(t) {
        ee = requestAnimationFrame(e);
        let n = Math.min(0.05, (t - Q) / 1000);
        Q = t;
        if (!S) {
            return;
        }
        let r = T;
        if (r && L) {
            r.pivot.rotation.y += L * n;
            if (Math.abs(L *= 0.955 ** (60 * n)) < 0.02) {
                L = 0;
            }
        }
        if (r && E && !a.reduceMotion) {
            r.pivot.rotation.y += 0.085 * n;
        }
        if (r) {
            r.U.uPulse.value = 0.5 + 0.5 * Math.sin(t / 160);
            let e = Math.min(1, (t - r.since) / DROP_MS);
            r.U.uDrop.value = 1 - (1 - (1 - e) ** 3);
            if (r.playing && (t - r.since) / 1000 >= ((e)=>{
                let t = e.steps[e.idx];
                if (e.idx === 0) {
                    return 0.6;
                }
                if (e.idx === e.max) {
                    return 2.4;
                }
                if (t.fast) {
                    return 0.07;
                }
                let a = Math.min(1, 0.34 + 0.03 * (t.count || 1));
                let n = e.steps[e.idx - 1];
                if (n && n.chapter !== t.chapter) {
                    a += 0.5;
                }
                return a;
            })(r)) {
                g(r, r.idx >= r.max ? 1 : r.idx + 1);
                q();
            }
        }
        let o = Math.min(1, 3 * n);
        P += (z - P) * o;
        F += (_ - F) * o;
        x.position.set(0, F + P * Math.sin(f), P * Math.cos(f));
        x.lookAt(0, F, 0);
        h.render(w, x);
    });
    let et = new ResizeObserver(()=>resize());
    function ea(e) {
        e.pivot.traverse((e)=>{
            if (e.geometry) {
                e.geometry.dispose();
            }
            let e_material = e.material;
            if (Array.isArray(e_material)) {
                e_material.forEach((e)=>e.dispose());
            } else if (e_material != null) {
                e_material.dispose();
            }
        });
        e.depthMaterial?.dispose();
        w.remove(e.pivot);
    }
    if (canvas.parentElement) {
        et.observe(canvas.parentElement);
    }
    window.addEventListener("resize", resize);
    resize();
    return {
        goTo: function(e) {
            if (b) {
                return;
            }
            let t_length = t.length;
            H = (e % t_length + t_length) % t_length;
            let l = U.get(H);
            if (l) {
                W(l, false);
                a.onLoadState?.(H, "ready");
                return;
            }
            if (T) {
                T.pivot.visible = false;
                T = null;
            }
            a.onLoadState?.(H, "loading");
            let i = H;
            ((e)=>{
                let t = U.get(e);
                if (t) {
                    return Promise.resolve(t);
                }
                let a = Y.get(e);
                if (!a) {
                    a = N(e).then((t)=>{
                        if (b) {
                            ea(t);
                            throw Error("disposed");
                        }
                        U.set(e, t);
                        return t;
                    }).finally(()=>Y.delete(e));
                    Y.set(e, a);
                }
                return a;
            })(i).then((e)=>{
                var t;
                if (!b) {
                    if ((t = a.onLoadState) != null) {
                        t.call(a, i, "ready");
                    }
                    if (H === i) {
                        W(e, true);
                    }
                }
            }).catch((e)=>{
                var r;
                if (!(b || e?.message === "disposed")) {
                    console.error("[StepLandingStage] model load failed:", t[i]?.modelKey, e);
                    if ((r = a.onLoadState) != null) {
                        r.call(a, i, "error");
                    }
                }
            });
        },
        resize,
        setRunning (e) {
            S = e;
            if (e && T) {
                T.since = performance.now();
            }
            Q = performance.now();
        },
        dispose () {
            if (!b) {
                for (let t of (b = true, cancelAnimationFrame(ee), R && clearTimeout(R), et.disconnect(), window.removeEventListener("resize", resize), canvas.removeEventListener("pointerdown", K), canvas.removeEventListener("pointermove", $), canvas.removeEventListener("pointerup", J), canvas.removeEventListener("pointercancel", J), U.values())){
                    ea(t);
                }
                U.clear();
                B.forEach((e)=>e.dispose());
                map?.dispose();
                h.dispose();
                h.forceContextLoss();
            }
        }
    };
}
