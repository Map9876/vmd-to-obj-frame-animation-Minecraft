import { jsx } from "./module-86897.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "./module-61426.js";
import { NRn, PTz, Pq0, YHV, YJl, cj9 } from "./module-85339.js";
import * as o from "./module-59040.js";
import { Hl } from "./module-30258.js";
import * as i from "./module-77954.js";
import { A as A_1 } from "./module-58199.js";
import { J2, Pm, _7 } from "./module-22724.js";
import { H7 } from "./module-46422.js";
import * as h from "./module-5838.js";
import * as m from "./module-25112.js";
import { I as I_1 } from "./module-88432.js";
import { AT, cr, y5 } from "./module-4336.js";
import { A as A_2 } from "./module-33622.js";
import { b as b_1 } from "./module-74956.js";
import { n as n_1 } from "./module-35330.js";
import { G } from "./module-473.js";
import { y6 } from "./module-37578.js";
import { vf } from "./module-60384.js";
import { Iz } from "./module-87875.js";
import { A as A_3 } from "./module-19535.js";
import { A as A_4 } from "./module-64521.js";
import { A as A_5 } from "./module-2186.js";
import * as en from "./module-22734.js";
import * as eo from "./module-35297.js";
function D1Component({ speed, locked }) {
    return <>{locked && <div data-testid="first-person-crosshair" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-6 w-6 -translate-x-1/2 -translate-y-1/2"><svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor"><path d="M12 2v6m0 8v6M2 12h6m8 0h6" strokeWidth="4" className="text-border-hard"/><path d="M12 2v6m0 8v6M2 12h6m8 0h6" strokeWidth="2" className="text-text-primary"/></svg></div>}<div role="status" aria-label="行走速度" aria-live="polite" aria-atomic="true" className="pointer-events-none absolute left-24 top-4 z-20 max-w-[calc(100%-112px)] border-2 border-border-hard bg-bg-card px-3 py-2 shadow-block-sm"><div className="flex flex-wrap items-center gap-2 text-xs font-bold text-text-muted"><A_1 size={16} className="text-brand-primary"/> 行走速度<span className="font-pixel text-xl tabular-nums text-text-primary">{speed.toFixed(1)}</span><span>格/秒</span></div><div className="mt-1 text-xs font-bold text-text-muted">{locked ? "滚轮↑加速 · ↓减速" : "点击画面锁定鼠标后，滚轮调速"}</div></div></>;
}
function P1Component({ controlsRef, camera, blocks, stepIndex, mode, enabled, onDetach }) {
    let { camera: camera_1, size } = o.C();
    let mRef = useRef(null);
    if (mRef.current === null) {
        mRef.current = camera_1.fov ?? 60;
    }
    let xRef = useRef(null);
    let bRef = useRef(null);
    useEffect(()=>{
        if (!enabled || mode !== "follow" || !camera) {
            return;
        }
        let controlsRef_current = controlsRef.current;
        if (!controlsRef_current?.object || !controlsRef_current?.target) {
            return;
        }
        let l = size.height > 0 ? size.width / size.height : 16 / 9;
        let o = _7(camera, blocks ?? [], l);
        let fromFov = camera_1.fov ?? o.fov;
        let fromTarget = controlsRef_current.target.clone();
        let toTarget = new Pq0(...o.target);
        let g = new YHV().setFromVector3(controlsRef_current.object.position.clone().sub(fromTarget));
        let y = new YHV().setFromVector3(new Pq0(...o.position).sub(toTarget));
        let dTheta = ((e, t)=>{
            let n = 2 * Math.PI;
            let r = (t - e) % n;
            if (r > Math.PI) {
                r -= n;
            }
            if (r <= -Math.PI) {
                r += n;
            }
            return r;
        })(g.theta, y.theta);
        let dPhi = y.phi - g.phi;
        let seconds = Math.min(1.6, Math.max(0.6, 180 * Math.hypot(dTheta, dPhi) / Math.PI * 1.5 / 180));
        xRef.current = {
            fromTarget,
            toTarget,
            fromRadius: g.radius,
            dRadius: y.radius - g.radius,
            fromPhi: g.phi,
            dPhi,
            fromTheta: g.theta,
            dTheta,
            fromFov,
            dFov: o.fov - fromFov,
            seconds,
            start: performance.now()
        };
        let k = ()=>{
            let xRef_current = xRef.current;
            let controlsRef_current = controlsRef.current;
            if (!xRef_current || !controlsRef_current?.object || !controlsRef_current?.target) {
                return;
            }
            let l = Math.min(1, (performance.now() - xRef_current.start) / (1000 * xRef_current.seconds));
            let a = l * l * (3 - 2 * l);
            controlsRef_current.target.lerpVectors(xRef_current.fromTarget, xRef_current.toTarget, a);
            let [o, s, i] = Pm(xRef_current.fromRadius + xRef_current.dRadius * a, xRef_current.fromPhi + xRef_current.dPhi * a, xRef_current.fromTheta + xRef_current.dTheta * a);
            controlsRef_current.object.position.set(controlsRef_current.target.x + o, controlsRef_current.target.y + s, controlsRef_current.target.z + i);
            if (xRef_current.dFov !== 0 && controlsRef_current.object.isPerspectiveCamera) {
                controlsRef_current.object.fov = xRef_current.fromFov + xRef_current.dFov * a;
                controlsRef_current.object.updateProjectionMatrix();
            }
            controlsRef_current.update?.();
            if (l < 1) {
                bRef.current = requestAnimationFrame(k);
            } else {
                xRef.current = null;
                bRef.current = null;
            }
        };
        bRef.current = requestAnimationFrame(k);
        return ()=>{
            if (bRef.current !== null) {
                cancelAnimationFrame(bRef.current);
            }
            bRef.current = null;
            xRef.current = null;
        };
    }, [
        enabled,
        mode,
        camera,
        blocks,
        stepIndex,
        controlsRef,
        camera_1,
        size.width,
        size.height
    ]);
    useEffect(()=>{
        if (enabled) {
            return;
        }
        let mRef_current = mRef.current;
        if (mRef_current !== null && camera_1.isPerspectiveCamera && camera_1.fov !== mRef_current) {
            camera_1.fov = mRef_current;
            camera_1.updateProjectionMatrix();
        }
    }, [
        enabled,
        camera_1
    ]);
    useEffect(()=>{
        if (!enabled || mode !== "follow") {
            return;
        }
        let controlsRef_current = controlsRef.current;
        let t = controlsRef_current?.domElement;
        if (!t) {
            return;
        }
        let r = ()=>{
            if (bRef.current !== null) {
                cancelAnimationFrame(bRef.current);
            }
            bRef.current = null;
            xRef.current = null;
            onDetach?.();
        };
        t.addEventListener("pointerdown", r);
        t.addEventListener("wheel", r, {
            passive: true
        });
        return ()=>{
            t.removeEventListener("pointerdown", r);
            t.removeEventListener("wheel", r);
        };
    }, [
        enabled,
        mode,
        controlsRef,
        onDetach
    ]);
    return null;
}
const g = require(67909);
let k = {
    x: 0,
    y: 1,
    z: 2
};
let M = {
    x: [
        "y",
        "z"
    ],
    y: [
        "x",
        "z"
    ],
    z: [
        "x",
        "y"
    ]
};
let z = (e, t, n)=>`${e},${t},${n}`;
let P = (e)=>`${e[0]},${e[1]},${e[2]}`;
let N = (e)=>[
        e.max[0] - e.min[0] + 1,
        e.max[1] - e.min[1] + 1,
        e.max[2] - e.min[2] + 1
    ];
function S(e, t, n, r, l) {
    let a = k[t];
    let o = [
        n[0],
        n[1],
        n[2]
    ];
    let s = [];
    let i = null;
    for(let t = r; t <= l + 1; t++){
        o[a] = t;
        let n = t <= l && e(o);
        if (n && i === null) {
            i = t;
        }
        if (!(n || i === null)) {
            s.push([
                i,
                t - 1
            ]);
            i = null;
        }
    }
    return s;
}
function C(e, t, n) {
    let r = k[t];
    let l = S((t)=>e.set.has(P(t)), t, n, e.min[r], e.max[r]).filter((e)=>e[1] - e[0] + 1 >= 3);
    if (l.length) {
        return l.reduce((acc, item)=>{
            if (item[1] - item[0] > acc[1] - acc[0]) {
                return item;
            }
            return acc;
        });
    }
    return null;
}
function A(axis, t, n, r) {
    let l = k[axis];
    let from = [
        t[0],
        t[1],
        t[2]
    ];
    let to = [
        t[0],
        t[1],
        t[2]
    ];
    from[l] = n;
    to[l] = r;
    let s = [];
    for(let e = n; e <= r; e++){
        let n = [
            t[0],
            t[1],
            t[2]
        ];
        n[l] = e;
        s.push(n);
    }
    return {
        axis,
        from,
        to,
        n: r - n + 1,
        cells: s
    };
}
function E(e, t) {
    let [n, r] = M[t].map((e)=>k[e]);
    let l = new Map;
    for (let t of e.cells){
        let e = [
            t.x,
            t.y,
            t.z
        ];
        l.set(`${e[n]}|${e[r]}`, e);
    }
    let a = null;
    for (let p of l.values()){
        let r = C(e, t, p);
        if (!r) {
            continue;
        }
        let len = r[1] - r[0] + 1;
        if (!a || len > a.len || len === a.len && t !== "y" && p[1] > a.p[1]) {
            a = {
                len,
                r,
                p
            };
        }
    }
    if (a) {
        return A(t, a.p, a.r[0], a.r[1]);
    }
    return null;
}
function I(cells, occupied) {
    if (!cells.length || cells.length > 30000) {
        return [];
    }
    let n = ((cells_1)=>{
        let t = new Map;
        for (let n of cells_1){
            t.set(z(n.x, n.y, n.z), n);
        }
        let n = new Set;
        let r = [];
        let l = [
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
                1,
                0
            ],
            [
                0,
                -1,
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
            ]
        ];
        for (let [e, a] of t){
            if (n.has(e)) {
                continue;
            }
            let o = [];
            let s = [
                a
            ];
            for(n.add(e); s.length;){
                let e = s.pop();
                for (let [r, a, i] of (o.push(e), l)){
                    let l = z(e.x + r, e.y + a, e.z + i);
                    let o = t.get(l);
                    if (o && !n.has(l)) {
                        n.add(l);
                        s.push(o);
                    }
                }
            }
            let min = [
                Infinity,
                Infinity,
                Infinity
            ];
            let max = [
                -Infinity,
                -Infinity,
                -Infinity
            ];
            for (let e of o){
                let t = [
                    e.x,
                    e.y,
                    e.z
                ];
                for(let e = 0; e < 3; e++){
                    if (t[e] < min[e]) {
                        min[e] = t[e];
                    }
                    if (t[e] > max[e]) {
                        max[e] = t[e];
                    }
                }
            }
            let d = {
                id: r.length,
                cells: o,
                set: new Set(o.map((e)=>z(e.x, e.y, e.z))),
                min,
                max,
                count: o.length,
                shape: "point"
            };
            d.shape = ((e)=>{
                let [t, n, r] = N(e);
                if (t === 1 && r === 1) {
                    if (n >= 2) {
                        return "column";
                    }
                    return "point";
                }
                if (e.count <= 2) {
                    return "point";
                }
                if (n === 1) {
                    if (t === 1 || r === 1) {
                        return "line";
                    }
                    if (e.count / (t * r) >= 0.8) {
                        return "fill";
                    }
                    let n = 0;
                    for (let t of e.cells){
                        if (t.x === e.min[0] || t.x === e.max[0] || t.z === e.min[2] || t.z === e.max[2]) {
                            n++;
                        }
                    }
                    if (n / e.count >= 0.9 && t >= 3 && r >= 3) {
                        return "ring";
                    }
                    return "patch";
                }
                if (t === 1 || r === 1) {
                    return "panel";
                }
                if (e.count / (t * n * r) >= 0.7) {
                    return "solid";
                }
                return "mass";
            })(d);
            r.push(d);
        }
        return r;
    })(cells);
    let r = n.reduce((acc, item)=>{
        if (item.count > acc.count) {
            return item;
        }
        return acc;
    });
    let length = n.filter((e)=>e.shape === "point" || e.shape === "column").length;
    let a = length >= 2 && length >= 0.6 * n.length;
    let o = [];
    let s = (e, role, group, prio)=>{
        if (e && e.n >= 3) {
            o.push({
                ...e,
                kind: "run",
                role,
                group,
                prio
            });
        }
    };
    for (let e of n){
        let [t, n, l] = N(e);
        let o = e === r && e.count >= 4 ? 90 : 50 + Math.min(20, e.count / 4);
        let i = e.max[1];
        switch(e.shape){
            case "column":
                {
                    let t = A("y", [
                        e.min[0],
                        0,
                        e.min[2]
                    ], e.min[1], e.max[1]);
                    s(t, "height", `height:y:${t.n}`, a ? 85 : o);
                    break;
                }
            case "line":
                {
                    let n = t > 1 ? "x" : "z";
                    let r = E(e, n);
                    if (r) {
                        s(r, "length", `length:${n}:${r.n}`, o);
                    }
                    break;
                }
            case "panel":
                {
                    let n = t > 1 ? "x" : "z";
                    let r = k[n];
                    let l = [
                        e.min[0],
                        i,
                        e.min[2]
                    ];
                    let a = C(e, n, l);
                    let c = a ? A(n, l, a[0], a[1]) : E(e, n);
                    for (let t of (c && s(c, "length", `length:${n}:${c.n}`, o), [
                        e.min[r],
                        e.max[r]
                    ])){
                        let n = [
                            e.min[0],
                            0,
                            e.min[2]
                        ];
                        n[r] = t;
                        let l = C(e, "y", n);
                        if (l) {
                            s(A("y", n, l[0], l[1]), "height", `height:y:${l[1] - l[0] + 1}`, o - 4);
                        }
                    }
                    break;
                }
            case "fill":
            case "ring":
            case "solid":
                for (let n of [
                    e.min[2],
                    e.max[2]
                ]){
                    s(A("x", [
                        0,
                        i,
                        n
                    ], e.min[0], e.max[0]), "width", `width:x:${t}`, o);
                }
                for (let t of [
                    e.min[0],
                    e.max[0]
                ]){
                    s(A("z", [
                        t,
                        i,
                        0
                    ], e.min[2], e.max[2]), "depth", `depth:z:${l}`, o);
                }
                if (n >= 3) {
                    for (let t of [
                        e.min[0],
                        e.max[0]
                    ]){
                        for (let n of [
                            e.min[2],
                            e.max[2]
                        ]){
                            let r = C(e, "y", [
                                t,
                                0,
                                n
                            ]);
                            if (r) {
                                s(A("y", [
                                    t,
                                    0,
                                    n
                                ], r[0], r[1]), "height", `height:y:${r[1] - r[0] + 1}`, o - 4);
                            }
                        }
                    }
                }
                break;
            case "patch":
            case "mass":
                {
                    let t = E(e, "x");
                    let n = E(e, "z");
                    if (t) {
                        s(t, "width", `width:x:${t.n}`, o - 10);
                    }
                    if (n) {
                        s(n, "depth", `depth:z:${n.n}`, o - 10);
                    }
                }
        }
    }
    let i = new Map;
    for (let e of n){
        for (let t of e.cells){
            i.set(z(t.x, t.y, t.z), e);
        }
    }
    let c = (e)=>i.has(P(e));
    for (let n of [
        "x",
        "z"
    ]){
        let r = k[n];
        let l = 2 * (n === "x");
        let s = new Map;
        let d = Infinity;
        let u = -Infinity;
        for (let t of cells){
            let e = [
                t.x,
                t.y,
                t.z
            ];
            let n = `${e[1]}|${e[l]}`;
            if (!s.has(n)) {
                s.set(n, e);
            }
            if (e[r] < d) {
                d = e[r];
            }
            if (e[r] > u) {
                u = e[r];
            }
        }
        for (let e of s.values()){
            let s = S(c, n, e, d, u);
            for(let c = 1; c < s.length; c++){
                let d = s[c - 1][1];
                let u = s[c][0];
                let p = u - d - 1;
                if (p < 2 || p > 24) {
                    continue;
                }
                let f = [
                    e[0],
                    e[1],
                    e[2]
                ];
                let h = true;
                for(let e = d + 1; e < u; e++){
                    f[r] = e;
                    if (occupied(f[0], f[1], f[2])) {
                        h = false;
                        break;
                    }
                }
                if (!h) {
                    continue;
                }
                let m = [
                    e[0],
                    e[1],
                    e[2]
                ];
                m[r] = d;
                let x = [
                    e[0],
                    e[1],
                    e[2]
                ];
                x[r] = u;
                let b = i.get(P(m));
                let g = i.get(P(x));
                let y = (e)=>!!e && e.max[l] === e.min[l];
                let v = A(n, e, d + 1, u - 1);
                if (y(b) && y(g)) {
                    o.push({
                        ...v,
                        kind: "gap",
                        role: "spacing",
                        group: `spacing:${n}:${p}`,
                        prio: (a ? 86 : 60) + Math.min(p, 24) / 6
                    });
                } else if (b && b === g && (b.shape === "fill" || b.shape === "patch" || b.shape === "ring") && p >= 3) {
                    let e = 0;
                    for (let n of v.cells){
                        let r = [
                            n[0],
                            n[1],
                            n[2]
                        ];
                        let a = [
                            n[0],
                            n[1],
                            n[2]
                        ];
                        r[l]--;
                        a[l]++;
                        if (occupied(r[0], r[1], r[2]) || occupied(a[0], a[1], a[2])) {
                            e++;
                        }
                    }
                    if (e / v.n >= 0.6) {
                        o.push({
                            ...v,
                            kind: "gap",
                            role: "hole",
                            group: "hole",
                            prio: 30 + p / 10
                        });
                    }
                }
            }
        }
    }
    return o.map((e)=>({
            ...e,
            id: `${e.role}|${e.axis}|${P(e.from)}|${P(e.to)}`
        }));
}
function q(e) {
    if (e.axis === "y") {
        return `v|${e.from[0]}|${e.from[2]}|${e.n}`;
    }
    return `${e.kind}|${e.axis}|${e.from[0]}|${e.from[2]}|${e.to[0]}|${e.to[2]}`;
}
let R = /flower|potted|torch|lantern|button|carpet|sign|banner|candle|sapling|^short_grass|^tall_grass|^grass$|fern|dead_bush|^azalea$|^flowering_azalea$|vine|lily|poppy|dandelion|tulip|orchid|allium|bluet|daisy|cornflower|lilac|peony|rose_bush|sunflower|pickle|kelp|seagrass|cobweb|lever|pressure_plate|tripwire|rail|redstone_wire|head|skull|end_rod|lightning_rod|amethyst_cluster|_bud$|chain$|bell$|campfire|cake|brewing|hopper|decorated_pot/;
let D = /glass|leaves|pane|bars|ladder|rail|vine|chain|torch|lantern|sapling|flower|rose|bush|azalea|fern|grass(?!_block)|cluster|bud|sign|banner|scaffolding|door|trapdoor|fence|gate|wall|carpet|slab|stairs|button|pressure|lever|candle|pot|bed|cake|web|snow$|amethyst|lectern|campfire|end_rod|cocoa|farmland|dirt_path|water|lava/;
let F = {
    x: 0,
    y: 1,
    z: 2
};
function B(e, t, occupied, r) {
    let l;
    let o;
    let nrm;
    let tdir;
    let c = F[e.axis];
    let d = e.from[c];
    let u = e.to[c] + 1;
    let e_cells = e.cells;
    let f = (e)=>!occupied(e[0], e[1], e[2]);
    if (e.kind === "gap") {
        let t = +(e.role === "hole");
        let [n, r, c] = e.from;
        o = (l = new Pq0(n + 0.5, r + t + 0.02, c + 0.5)).clone();
        nrm = new Pq0(0, 1, 0);
        tdir = e.axis === "x" ? new Pq0(0, 0, 1) : new Pq0(1, 0, 0);
    } else if (e.axis === "y") {
        let [n, , r] = e.from;
        let c = new Pq0(t.x - n - 0.5, 0, t.z - r - 0.5).normalize();
        let d = [
            1,
            0
        ];
        let u = -Infinity;
        for (let [e, t] of [
            [
                1,
                0
            ],
            [
                -1,
                0
            ],
            [
                0,
                1
            ],
            [
                0,
                -1
            ]
        ]){
            let n = 0;
            for (let r of e_cells){
                if (f([
                    r[0] + e,
                    r[1],
                    r[2] + t
                ])) {
                    n++;
                }
            }
            let r = (e * c.x + t * c.z) * 1.2 + n / e_cells.length * 2;
            if (r > u) {
                u = r;
                d = [
                    e,
                    t
                ];
            }
        }
        let h = n + 0.5 + 0.52 * d[0];
        let m = r + 0.5 + 0.52 * d[1];
        l = new Pq0(h, 0, m);
        o = new Pq0(h, 0, m);
        nrm = new Pq0(d[0], 0, d[1]);
        tdir = d[0] !== 0 ? new Pq0(0, 0, 1) : new Pq0(1, 0, 0);
    } else {
        let [n, r, c] = e.from;
        let d = 2 * (e.axis === "x");
        let u = e.from[d];
        let h = 0;
        for (let e of e_cells){
            if (f([
                e[0],
                e[1] + 1,
                e[2]
            ])) {
                h++;
            }
        }
        let m = t.y > r + 1.1 ? h / e_cells.length * 2 + Math.min(1, (t.y - r - 1) / 8) : -Infinity;
        let x = {
            sg: 1,
            s: -Infinity
        };
        for (let sg of [
            1,
            -1
        ]){
            let n = 0;
            for (let t of e_cells){
                let r = [
                    t[0],
                    t[1],
                    t[2]
                ];
                r[d] += sg;
                if (f(r)) {
                    n++;
                }
            }
            let r = Math.sign(((d === 2 ? t.z : t.x) - (u + 0.5)) * sg);
            let s_1 = n / e_cells.length * 2 + 1.2 * r;
            if (s_1 > x.s) {
                x = {
                    sg,
                    s: s_1
                };
            }
        }
        if (m >= x.s) {
            o = (l = new Pq0(n + 0.5, r + 1 + 0.02, c + 0.5)).clone();
            nrm = new Pq0(0, 1, 0);
            tdir = d === 2 ? new Pq0(0, 0, 1) : new Pq0(1, 0, 0);
        } else {
            let e = [
                n + 0.5,
                r + 0.5,
                c + 0.5
            ];
            e[d] = u + 0.5 + 0.52 * x.sg;
            l = new Pq0(...e);
            o = new Pq0(...e);
            nrm = d === 2 ? new Pq0(0, 0, x.sg) : new Pq0(x.sg, 0, 0);
            tdir = new Pq0(0, 1, 0);
        }
    }
    l.setComponent(c, d);
    o.setComponent(c, u);
    let h = l.clone().lerp(o, 0.5);
    let m = tdir.clone();
    if (m.dot(h.clone().sub(r)) < 0) {
        m.negate();
    }
    return {
        p0: l,
        p1: o,
        nrm,
        tdir,
        out: m,
        mid: h,
        dir: o.clone().sub(l).normalize()
    };
}
function TComponent({ model, stepData, mode, currentIndex, enabled, focusMode = false, explodedSpacing = 0, labelLayer, onChange }) {
    let { camera, size } = o.C();
    let xRef = useRef(null);
    let b = useCallback(()=>{
        let xRef_current = xRef.current;
        if (xRef_current && xRef_current.model === model && xRef_current.stepData === stepData) {
            return xRef_current.index;
        }
        let index = ((model_1, stepData_1)=>{
            let l;
            let e_blocks = model_1.blocks;
            let o = Infinity;
            let minY = Infinity;
            let i = Infinity;
            let c = -Infinity;
            let d = -Infinity;
            let u = -Infinity;
            for (let e of e_blocks){
                let [t, n, r] = e.position;
                if (t < o) {
                    o = t;
                }
                if (n < minY) {
                    minY = n;
                }
                if (r < i) {
                    i = r;
                }
                if (t > c) {
                    c = t;
                }
                if (n > d) {
                    d = n;
                }
                if (r > u) {
                    u = r;
                }
            }
            let p = c - o + 1;
            let f = d - minY + 1;
            let h = (e, t, n)=>e - o + p * (t - minY + f * (n - i));
            let m = new Map;
            let x = stepData_1?.length ?? 0;
            if (stepData_1) {
                stepData_1.forEach((e, t)=>{
                    for (let n of e.blocks){
                        m.set(h(n.x, n.y, n.z), t);
                    }
                });
            }
            let b = new Map;
            let length = e_blocks.length ? d - minY + 1 : 0;
            let byLayer = Array.from({
                length
            }, ()=>[]);
            let byStep = Array.from({
                length: x || length
            }, ()=>[]);
            for (let e of e_blocks){
                let [t, n, a] = e.position;
                let o = h(t, n, a);
                let i = n - minY;
                let c = x ? m.get(o) ?? x - 1 : i;
                let d = e.blockId.replace(/^minecraft:/, "");
                let u = R.test(d);
                b.set(o, 4 * c + +!!u + 2 * !D.test(d));
                if (!u) {
                    byLayer[i].push({
                        x: t,
                        y: n,
                        z: a
                    });
                    if ((l = byStep[c]) != null) {
                        l.push({
                            x: t,
                            y: n,
                            z: a
                        });
                    }
                }
            }
            return {
                at: (e, t, n)=>{
                    if (e < o || e > c || t < minY || t > d || n < i || n > u) {
                        return -1;
                    }
                    return b.get(h(e, t, n)) ?? -1;
                },
                minY,
                byStep,
                byLayer
            };
        })(model, stepData);
        xRef.current = {
            model,
            stepData,
            index
        };
        return index;
    }, [
        model,
        stepData
    ]);
    let object = useMemo(()=>new YJl, []);
    let yRef = useRef(onChange);
    yRef.current = onChange;
    let k = useMemo(()=>{
        let e = (e)=>{
            let { base = 1, ...rest } = e ?? {};
            let r = new G({
                worldUnits: false,
                transparent: true,
                depthWrite: false,
                ...rest
            });
            r.polygonOffset = true;
            r.polygonOffsetFactor = -2;
            r.polygonOffsetUnits = -2;
            r.userData.base = base;
            return r;
        };
        return {
            xray: e({
                color: 16777215,
                linewidth: 2,
                depthTest: false,
                opacity: 0.22,
                base: 0.22
            }),
            under: e({
                color: 723723,
                linewidth: 5.5,
                depthTest: true,
                opacity: 0.85,
                base: 0.85
            }),
            white: e({
                color: 16777215,
                linewidth: 2.5,
                depthTest: true
            }),
            dash: e({
                color: 16777215,
                linewidth: 2.5,
                depthTest: true,
                dashed: true,
                dashSize: 0.28,
                gapSize: 0.2,
                opacity: 0.85,
                base: 0.85
            })
        };
    }, []);
    useEffect(()=>{
        for (let e of Object.values(k)){
            e.resolution.set(size.width, size.height);
        }
    }, [
        k,
        size.width,
        size.height
    ]);
    useEffect(()=>()=>{
            for (let e of Object.values(k)){
                e.dispose();
            }
            for (let e of [
                ...object.children
            ]){
                object.remove(e);
                e.geometry.dispose();
            }
        }, [
        k,
        object
    ]);
    let MRef = useRef({
        measures: [],
        labels: new Map,
        fade: 0,
        target: 0,
        pending: true,
        pendingSince: 0,
        minDelay: 300,
        repick: false,
        still: 0,
        lastPos: new Pq0(Infinity, 0, 0),
        lastQuat: new PTz,
        overall: {
            sideZ: 1,
            sideX: 1,
            corner: ""
        }
    });
    let z = enabled && explodedSpacing <= 0;
    function P() {
        let MRef_current = MRef.current;
        for (let { el } of MRef_current.labels.values()){
            el.remove();
        }
        for (let e of (MRef_current.labels.clear(), MRef_current.measures = [], [
            ...object.children
        ])){
            object.remove(e);
            e.geometry.dispose();
        }
        yRef.current?.({
            count: 0,
            hasGap: false
        });
    }
    useEffect(()=>{
        let MRef_current = MRef.current;
        MRef_current.target = 0;
        labelLayer.current?.classList.add("is-hidden");
        MRef_current.pending = z;
        MRef_current.pendingSince = performance.now();
        MRef_current.minDelay = 450;
        MRef_current.repick = false;
        if (!z) {
            P();
        }
    }, [
        z,
        currentIndex,
        mode,
        focusMode,
        model,
        stepData
    ]);
    useEffect(()=>()=>P(), []);
    let N = useCallback((e, t)=>(mode === "step" ? e.byStep[t] : e.byLayer[t]) ?? [], [
        mode
    ]);
    let S = useCallback((e, t, n)=>{
        if (mode === "step") {
            return t >> 2;
        }
        return n - e.minY;
    }, [
        mode
    ]);
    let C = useCallback((e, t)=>(n, r, l)=>{
            let a = e.at(n, r, l);
            return a >= 0 && S(e, a, r) <= t;
        }, [
        S
    ]);
    let A = useCallback((e)=>{
        let t = e.clone().project(camera);
        return {
            x: (t.x + 1) / 2 * size.width,
            y: (1 - t.y) / 2 * size.height,
            behind: t.z > 1
        };
    }, [
        camera,
        size.width,
        size.height
    ]);
    let E = useCallback((e, t)=>{
        let n = A(e.mid);
        let r = A(e.mid.clone().addScaledVector(e.out, t));
        let l = r.x - n.x;
        let a = r.y - n.y;
        let o = Math.hypot(l, a) || 1;
        return {
            x: n.x + l / o * 17,
            y: n.y + a / o * 17,
            behind: n.behind
        };
    }, [
        A
    ]);
    let F = useCallback((e, t)=>{
        let MRef_current = MRef.current;
        MRef_current.measures = e;
        let l = new Set(e.map((e)=>e.id));
        for (let [e, t] of MRef_current.labels){
            if (l.has(e)) {
                continue;
            }
            let n = t.el;
            n.classList.remove("is-in");
            window.setTimeout(()=>n.remove(), 220);
            MRef_current.labels.delete(e);
        }
        for (let m_1 of e){
            let e = MRef_current.labels.get(m_1.id);
            if (e) {
                e.m = m_1;
                continue;
            }
            let el_1 = document.createElement("div");
            el_1.className = `tv-measure-label${m_1.kind === "gap" ? " is-gap" : ""}`;
            if (m_1.overall) {
                el_1.innerHTML = `${m_1.n}<em>格</em>`;
                el_1.title = `整栋${m_1.role === "width" ? "长" : m_1.role === "depth" ? "宽" : "高"} ${m_1.n} 格`;
            } else {
                el_1.textContent = String(m_1.n);
                el_1.title = m_1.kind === "gap" ? `中间空 ${m_1.n} 格` : `这一段 ${m_1.n} 块${m_1.axis === "y" ? "（高）" : ""}`;
            }
            t.appendChild(el_1);
            MRef_current.labels.set(m_1.id, {
                el: el_1,
                m: m_1
            });
            requestAnimationFrame(()=>requestAnimationFrame(()=>el_1.classList.add("is-in")));
        }
        for (let e of [
            ...object.children
        ]){
            object.remove(e);
            e.geometry.dispose();
        }
        let o = {
            xray: [],
            under: [],
            white: [],
            dash: []
        };
        let s = (e, t, n)=>o[e].push(t.x, t.y, t.z, n.x, n.y, n.z);
        let i = e.filter((e)=>e.overall);
        let c = i.length === 3 ? Math.hypot(i[0].n, i[1].n) / 2 : 0;
        let d = Math.max(1, c / 16);
        let u = Math.min(2.2, Math.max(0.75, 0.035 * c));
        for (let t of e){
            if (t.overall) {
                let e = 0.55 * d;
                for (let n of (s("xray", t.p0, t.p1), s("under", t.p0, t.p1), s("white", t.p0, t.p1), [
                    t.p0,
                    t.p1
                ])){
                    let r = n.clone().addScaledVector(t.tdir, -e / 2);
                    let l = n.clone().addScaledVector(t.tdir, e / 2);
                    s("under", r, l);
                    s("white", r, l);
                    s("xray", n.clone().addScaledVector(t.out, -u), n.clone().addScaledVector(t.out, 0.3 * d));
                }
                continue;
            }
            if (t.kind === "gap") {
                let e = t.p0.y;
                for (let n of t.cells){
                    let t = [
                        [
                            0.12,
                            0.12
                        ],
                        [
                            0.88,
                            0.12
                        ],
                        [
                            0.88,
                            0.88
                        ],
                        [
                            0.12,
                            0.88
                        ]
                    ].map(([r, l])=>new Pq0(n[0] + r, e, n[2] + l));
                    for(let e = 0; e < 4; e++){
                        s("dash", t[e], t[(e + 1) % 4]);
                    }
                }
                continue;
            }
            s("xray", t.p0, t.p1);
            s("under", t.p0, t.p1);
            s("white", t.p0, t.p1);
            for(let e = 0; e <= t.n; e++){
                let n = e === 0 || e === t.n ? 0.42 : 0.22;
                let r = t.p0.clone().addScaledVector(t.dir, e);
                let l = r.clone().addScaledVector(t.tdir, -n);
                let a = r.clone().addScaledVector(t.tdir, n);
                s("under", l, a);
                s("white", l, a);
            }
        }
        let p = {
            xray: 1,
            under: 2,
            white: 3,
            dash: 3
        };
        for (let e of Object.keys(o)){
            if (!o[e].length) {
                continue;
            }
            let t = new n_1;
            t.setPositions(o[e]);
            let n = new b_1(t, k[e]);
            n.renderOrder = 20 + p[e];
            if (e === "dash") {
                n.computeLineDistances();
            }
            object.add(n);
        }
        yRef.current?.({
            count: e.length,
            hasGap: e.some((e)=>e.kind === "gap")
        });
    }, [
        object,
        E,
        k
    ]);
    let T = useCallback(()=>{
        let MRef_current = MRef.current;
        let labelLayer_current = labelLayer.current;
        if (!labelLayer_current) {
            return;
        }
        if (mode === "preview") {
            return void F((([l, o, s], camera_1, n)=>{
                let i = Math.hypot(l, s) / 2;
                let c = l / 2;
                let d = s / 2;
                let t_position = camera_1.position;
                let p = Math.max(0.6, 0.15 * i);
                if (t_position.z - d > p) {
                    n.sideZ = 1;
                } else if (t_position.z - d < -p) {
                    n.sideZ = -1;
                }
                if (t_position.x - c > p) {
                    n.sideX = 1;
                } else if (t_position.x - c < -p) {
                    n.sideX = -1;
                }
                let f = Math.min(2.2, Math.max(0.75, 0.035 * i));
                let h = (role, axis, n, r, l, a, tdir)=>({
                        id: `overall|${role}`,
                        kind: "run",
                        role,
                        axis,
                        from: [
                            0,
                            0,
                            0
                        ],
                        to: [
                            0,
                            0,
                            0
                        ],
                        n,
                        cells: [],
                        repeat: 1,
                        score: 0,
                        group: `overall|${role}`,
                        prio: 100,
                        p0: r,
                        p1: l,
                        dir: l.clone().sub(r).normalize(),
                        mid: r.clone().lerp(l, 0.5),
                        out: a,
                        nrm: a.clone(),
                        tdir,
                        push: 1,
                        overall: true
                    });
                let m = (n.sideZ > 0 ? s : 0) + n.sideZ * f;
                let x = new Pq0(0, 0, n.sideZ);
                let b = h("width", "x", l, new Pq0(0, 0, m), new Pq0(l, 0, m), x, x.clone());
                let g = (n.sideX > 0 ? l : 0) + n.sideX * f;
                let y = new Pq0(n.sideX, 0, 0);
                let v = h("depth", "z", s, new Pq0(g, 0, 0), new Pq0(g, 0, s), y, y.clone());
                let w = camera_1.aspect || 1;
                let j = (e)=>{
                    let n = e.clone().project(camera_1);
                    return {
                        x: n.x,
                        y: n.y
                    };
                };
                let k = (e, t)=>Math.hypot((e.x - t.x) * w, e.y - t.y);
                let M = j(b.mid);
                let z = j(v.mid);
                let P = [];
                for (let e of [
                    0,
                    l
                ]){
                    for (let t of [
                        0,
                        s
                    ]){
                        let n_2 = new Pq0(Math.sign(e - c) || 1, 0, Math.sign(t - d) || 1).normalize();
                        let l = new Pq0(e + n_2.x * f, 0, t + n_2.z * f);
                        let s = l.clone().setY(o);
                        let i = j(l.clone().lerp(s, 0.5));
                        let u = `${+(e > c)}${+(t > d)}`;
                        P.push({
                            n: n_2,
                            p0: l,
                            p1: s,
                            key: u,
                            mid: i,
                            clear: k(i, M) >= 0.24 && k(i, z) >= 0.24,
                            rank: i.x + 0.06 * (u === n.corner)
                        });
                    }
                }
                P.sort((e, t)=>t.rank - e.rank);
                let N = P.find((e)=>e.clear) ?? P[0];
                n.corner = N.key;
                let S = new Pq0(N.n.z, 0, -N.n.x).normalize();
                return [
                    b,
                    v,
                    h("height", "y", o, N.p0, N.p1, N.n, S)
                ];
            })(model.size, camera, MRef_current.overall), labelLayer_current);
        }
        let r = b();
        let l = N(r, currentIndex);
        let occupied = C(r, currentIndex);
        let c = (e, t, n)=>{
            let l = r.at(e, t, n);
            if (l < 0 || !(2 & l)) {
                return false;
            }
            let a = S(r, l, t);
            if (focusMode) {
                return a === currentIndex;
            }
            return a <= currentIndex;
        };
        let u = new NRn;
        for (let e of l){
            u.expandByPoint(new Pq0(e.x, e.y, e.z));
            u.expandByPoint(new Pq0(e.x + 1, e.y + 1, e.z + 1));
        }
        let f = l.length ? u.getCenter(new Pq0) : new Pq0;
        let m = camera.position.clone();
        camera.updateMatrixWorld();
        let previous = l.length > 8000 ? [] : [
            currentIndex - 1,
            currentIndex - 2
        ].filter((e)=>e >= 0).map((e)=>({
                cells: N(r, e),
                occupied: C(r, e)
            }));
        let g = (({ cells, occupied, previous = [], rate })=>{
            let a = I(cells, occupied);
            if (!a.length) {
                return [];
            }
            let suppress = new Set;
            for (let e of previous){
                for (let t of I(e.cells, e.occupied)){
                    suppress.add(q(t));
                }
            }
            return ((e, { count, rate = ()=>0, suppress })=>{
                let a = new Map;
                let o = new Set;
                for (let t of e){
                    if (suppress && suppress.has(q(t)) && (t.role === "width" || t.role === "depth")) {
                        o.add(t.group);
                    }
                }
                for (let t of e){
                    if (o.has(t.group) || suppress && suppress.has(q(t))) {
                        continue;
                    }
                    let e = a.get(t.group);
                    if (e) {
                        e.push(t);
                    } else {
                        a.set(t.group, [
                            t
                        ]);
                    }
                }
                let s = [];
                for (let e of a.values()){
                    let t = null;
                    let n = -Infinity;
                    for (let l of e){
                        let e = rate(l);
                        if (e > n) {
                            n = e;
                            t = l;
                        }
                    }
                    if (t && n > -Infinity) {
                        s.push({
                            ...t,
                            repeat: e.length,
                            score: t.prio + n
                        });
                    }
                }
                s.sort((e, t)=>t.score - e.score);
                let i = count <= 4 ? 2 : count <= 16 ? 3 : 4;
                let c = {
                    x: 0,
                    y: 0,
                    z: 0
                };
                let d = [];
                for (let e of s){
                    if (d.length >= i) {
                        break;
                    }
                    if (!(c[e.axis] >= 2)) {
                        c[e.axis]++;
                        d.push(e);
                    }
                }
                return d;
            })(a, {
                count: cells.length,
                rate,
                suppress
            });
        })({
            cells: l,
            occupied,
            previous,
            rate: (e)=>{
                let t = B(e, m, occupied, f);
                let n = 0;
                for (let e of [
                    0.12,
                    0.5,
                    0.88
                ]){
                    if (!((e, t, n)=>{
                        let r = [
                            t.x - e.x,
                            t.y - e.y,
                            t.z - e.z
                        ];
                        let l = Math.hypot(r[0], r[1], r[2]);
                        if (l < 0.000001) {
                            return false;
                        }
                        let a = r.map((e)=>e / l);
                        let o = [
                            Math.floor(e.x),
                            Math.floor(e.y),
                            Math.floor(e.z)
                        ];
                        let s = [
                            Math.floor(t.x),
                            Math.floor(t.y),
                            Math.floor(t.z)
                        ];
                        let i = [
                            e.x,
                            e.y,
                            e.z
                        ];
                        let c = a.map((e)=>{
                            if (e > 0) {
                                return 1;
                            }
                            if (e < 0) {
                                return -1;
                            }
                            return 0;
                        });
                        let d = [
                            0,
                            1,
                            2
                        ].map((e)=>{
                            if (c[e] === 0) {
                                return Infinity;
                            }
                            return (c[e] > 0 ? o[e] + 1 - i[e] : i[e] - o[e]) / Math.abs(a[e]);
                        });
                        let u = [
                            0,
                            1,
                            2
                        ].map((e)=>{
                            if (c[e] === 0) {
                                return Infinity;
                            }
                            return 1 / Math.abs(a[e]);
                        });
                        for(let e = 0; e < 4000 && (o[0] !== s[0] || o[1] !== s[1] || o[2] !== s[2]); e++){
                            if (n(o[0], o[1], o[2])) {
                                return true;
                            }
                            let e = d[0] < d[1] ? d[0] < d[2] ? 0 : 2 : d[1] < d[2] ? 1 : 2;
                            if (d[e] > l) {
                                break;
                            }
                            o[e] += c[e];
                            d[e] += u[e];
                        }
                        return false;
                    })(m, t.p0.clone().lerp(t.p1, e).addScaledVector(t.nrm, 0.06), c)) {
                        n++;
                    }
                }
                if (n < 2) {
                    return -Infinity;
                }
                let r = t.mid.clone().project(camera);
                if (!(r.z < 1 && Math.abs(r.x) < 0.94 && Math.abs(r.y) < 0.9)) {
                    return -Infinity;
                }
                let l = A(t.p0);
                let a = A(t.p1);
                if (Math.hypot(a.x - l.x, a.y - l.y) < 28) {
                    return -Infinity;
                }
                return n + 3 * t.nrm.dot(m.clone().sub(t.mid).normalize()) - t.mid.distanceTo(m) / 25;
            }
        });
        let y = [];
        let v = [];
        for (let e of g){
            let t = {
                ...e,
                ...B(e, m, occupied, f),
                push: 1
            };
            let n = 11 * String(e.n).length + 8;
            for (let e of [
                1,
                -1
            ]){
                let r = E(t, e);
                if (r.behind) {
                    continue;
                }
                let l = {
                    l: r.x - n / 2 - 3,
                    r: r.x + n / 2 + 3,
                    t: r.y - 10 - 3,
                    b: r.y + 10 + 3
                };
                if (!y.some((e)=>!(l.r < e.l || l.l > e.r || l.b < e.t || l.t > e.b))) {
                    y.push(l);
                    t.push = e;
                    v.push(t);
                    break;
                }
            }
        }
        F(v, labelLayer_current);
    }, [
        camera,
        N,
        currentIndex,
        focusMode,
        b,
        object,
        S,
        labelLayer,
        E,
        k,
        C,
        A
    ]);
    useEffect(()=>{
        MRef.current.repick = true;
    }, [
        size.width,
        size.height
    ]);
    o.D((e, t)=>{
        let MRef_current = MRef.current;
        let r = camera.position.distanceToSquared(MRef_current.lastPos) > 1e-8 || 1 - Math.abs(camera.quaternion.dot(MRef_current.lastQuat)) > 1e-10;
        MRef_current.lastPos.copy(camera.position);
        MRef_current.lastQuat.copy(camera.quaternion);
        MRef_current.still = r ? 0 : MRef_current.still + 1;
        if (r && !MRef_current.pending && MRef_current.measures.length) {
            MRef_current.repick = true;
        }
        if (z && MRef_current.still >= 6) {
            if (MRef_current.pending && performance.now() - MRef_current.pendingSince >= MRef_current.minDelay) {
                MRef_current.pending = false;
                MRef_current.repick = false;
                T();
                MRef_current.target = 1;
                labelLayer.current?.classList.remove("is-hidden");
            } else {
                if (MRef_current.repick && !MRef_current.pending) {
                    MRef_current.repick = false;
                    T();
                }
            }
        }
        for (let e of (MRef_current.fade += Math.sign(MRef_current.target - MRef_current.fade) * Math.min(Math.abs(MRef_current.target - MRef_current.fade), t / 0.16), Object.values(k))){
            e.opacity = e.userData.base * MRef_current.fade;
        }
        for (let { el, m } of (object.visible = MRef_current.fade > 0.001, MRef_current.labels.values())){
            let n = E(m, m.push);
            el.style.visibility = n.behind ? "hidden" : "";
            el.style.transform = `translate(${n.x}px, ${n.y}px) translate(-50%, -50%)`;
        }
    });
    return <primitive object={object}/>;
}
let L = new Map;
let $ = new Map;
async function O(e) {
    let t = `下载失败: ${e.status}`;
    try {
        let n = await e.json();
        if (n?.error) {
            t = n.error;
        }
    } catch (e) {}
    return t;
}
async function U(e) {
    let t = ((e)=>{
        let n = e.projectionIdentity === undefined ? "" : `:identity:${e.projectionIdentity ?? "unknown"}`;
        if (e.buildingId) {
            return `building:${e.buildingId}:${e.projectionFileUrl || ""}${n}`;
        }
        if (e.projectionFileUrl) {
            return `url:${e.projectionFileUrl}${n}`;
        }
        throw Error("缺少投影文件来源");
    })(e);
    let r = e.projectionIdentity === null ? null : ((e)=>{
        let t = L.get(e);
        if (t) {
            if (Date.now() - t.cachedAt > 600000) {
                L.delete(e);
                return null;
            }
            t.lastAccessed = Date.now();
            return t.model;
        }
        return null;
    })(t);
    if (r) {
        return r;
    }
    let l = $.get(t);
    if (l) {
        return l;
    }
    let a = (async ()=>{
        var byteLength;
        let o = await fetch(((e)=>{
            if (e.buildingId) {
                let t = vf(e.buildingId, e.projectionFileUrl);
                if (e.projectionIdentity) {
                    return `${t}${t.includes("?") ? "&" : "?"}identity=${encodeURIComponent(e.projectionIdentity)}`;
                }
                return t;
            }
            if (e.projectionFileUrl) {
                return e.projectionFileUrl;
            }
            throw Error("缺少投影文件来源");
        })(e), {
            cache: e.projectionIdentity === null ? "no-store" : "force-cache"
        });
        if (!o.ok) {
            throw Error(await O(o));
        }
        let s = await o.arrayBuffer();
        if (e.projectionIdentity) {
            let t = o.headers.get("X-Projection-Sha256");
            if (globalThis.crypto?.subtle) {
                t = Array.from(new Uint8Array(await globalThis.crypto.subtle.digest("SHA-256", s)), (e)=>e.toString(16).padStart(2, "0")).join("");
            }
            if (t !== e.projectionIdentity) {
                throw Error("投影文件已更新，请刷新页面后重新加载");
            }
        }
        let i = o.headers.get("X-File-Extension")?.replace(/^\./, "");
        let c = e.projectionFileUrl || `projection.${i || "litematic"}`;
        let d = e.projectionFileUrl && i ? `${e.projectionFileUrl}.${i}` : c;
        let { parseProjectionBuffer } = await import("./module-7882.js");
        let model = await parseProjectionBuffer(s, d);
        if (e.projectionIdentity !== null) {
            byteLength = s.byteLength;
            L.set(t, {
                model,
                byteLength,
                cachedAt: Date.now(),
                lastAccessed: Date.now()
            });
            (()=>{
                let e = 0;
                for (let t of L.values()){
                    e += t.model.totalBlockCount;
                }
                while(L.size > 3 || e > 180000){
                    let t = Array.from(L.entries()).sort((e, t)=>e[1].lastAccessed - t[1].lastAccessed)[0];
                    if (!t) {
                        return;
                    }
                    L.delete(t[0]);
                    e -= t[1].model.totalBlockCount;
                }
            })();
        }
        return model;
    })();
    $.set(t, a);
    a.then(()=>$.delete(t), ()=>$.delete(t));
    return a;
}
const Z = require(49294);
const X = require(44748);
const W = require(26545);
const J = require(21258);
const K = require(73610);
const Q = require(64991);
const et = require(51750);
const er = require(97003);
const el = require(44460);
const ea = require(24048);
let es = g.default(()=>import("./module-41449.js"), {
    loadableGenerated: {
        webpack: ()=>[
                41449
            ]
    },
    ssr: false
});
let ei = g.default(()=>Promise.all([
        require.e(1733),
        require.e(5239),
        require.e(4200),
        require.e(594)
    ]).then(require.bind(require, 20594)).then((e)=>({
            default: e.TeachingControlPanel
        })), {
    loadableGenerated: {
        webpack: ()=>[
                20594
            ]
    },
    ssr: false
});
function EcComponent({ cameraFov, configFov }) {
    let r = o.C((e)=>e.camera);
    useEffect(()=>{
        if (cameraFov == null) {
            if (r.isPerspectiveCamera && r.fov !== configFov) {
                r.fov = configFov;
                r.updateProjectionMatrix();
            }
        }
    }, [
        r,
        cameraFov,
        configFov
    ]);
    return null;
}
function EdComponent({ buildingId, projectionFileUrl, projectionIdentity, onProjectionInfo, teachingData, buildingName = "建筑教学", onExit, onError, onTeachingReady, externalState, hideBuiltinUI = false, resetCameraKey, highlightedBlockId, onEntityClick, onPointerMissed, selectedEntity, measurePoints, showFirstPersonPreviewButton, cameraMode, onCameraModeChange, hideFloatingTools = false, cameraZoomPercent, cameraPitchDeg, cameraCommandNonce, cameraPreset, cameraPresetNonce, focusBlock, showGroundGrid = true, cameraFov, stepOutlineMode = "off", selectionContourMode = "object", firstPersonSpeed, onFirstPersonSpeedChange, stepCameraFollowEnabled = false, stepCameraFollow = "follow", onStepCameraDetach, orbitOverrides, autoMeasure = false, onAutoMeasureChange }) {
    let eN = y5();
    let [eS, setES] = useState("idle");
    let [eA, setEA] = useState("");
    let [eI, setEI] = useState(null);
    let [eR, setER] = useState(null);
    let [eF, setEF] = useState(undefined);
    let eTRef = useRef("");
    let eVRef = useRef(null);
    let e_Ref = useRef(null);
    let [eL, setEL] = useState(false);
    let eORef = useRef(0);
    let eURef = useRef(null);
    let eHRef = useRef(null);
    let [eZ, setEZ] = useState("orbit");
    let mode = cameraMode ?? eZ;
    let eG = useCallback((e)=>{
        setEZ(e);
        onCameraModeChange?.(e);
    }, [
        onCameraModeChange
    ]);
    let eW = showFirstPersonPreviewButton ?? !hideBuiltinUI;
    let eJ = eR ? Math.min(60, Math.max(10, 0.4 * Math.max(...eR.size))) : 10;
    let moveSpeed = firstPersonSpeed ?? eJ;
    let [speed, setSpeed] = useState(moveSpeed);
    useEffect(()=>{
        setSpeed(moveSpeed);
    }, [
        moveSpeed
    ]);
    let onSpeedChange = useCallback((e)=>{
        setSpeed(e);
        onFirstPersonSpeedChange?.(e);
    }, [
        onFirstPersonSpeedChange
    ]);
    useEffect(()=>{
        let e = ()=>{
            setEL(!!(e_Ref.current && document.pointerLockElement === e_Ref.current));
        };
        document.addEventListener("pointerlockchange", e);
        return ()=>document.removeEventListener("pointerlockchange", e);
    }, []);
    let e2 = eo.c();
    let { state, actions } = externalState || e2;
    useEffect(()=>{
        if (!state.isReady || eHRef.current != null) {
            return;
        }
        let eVRef_current = eVRef.current;
        if (eVRef_current && eVRef_current.object && eVRef_current.target) {
            try {
                eHRef.current = typeof eVRef_current.getDistance === "function" ? eVRef_current.getDistance() : eVRef_current.object.position.distanceTo(eVRef_current.target);
            } catch (e) {
                eHRef.current = null;
            }
        }
    }, [
        state.isReady
    ]);
    useEffect(()=>{
        if (!cameraCommandNonce || mode !== "orbit") {
            return;
        }
        let eVRef_current = eVRef.current;
        if (!eVRef_current || !eVRef_current.object || !eVRef_current.target) {
            return;
        }
        let t_object = eVRef_current.object;
        let r = t_object.position.clone().sub(eVRef_current.target);
        let l = new YHV().setFromVector3(r);
        let o = eHRef.current ?? l.radius;
        let s = Math.min(200, Math.max(40, cameraZoomPercent ?? 100));
        let c = typeof eVRef_current.minDistance === "number" ? eVRef_current.minDistance : 3;
        l.radius = Math.min(typeof eVRef_current.maxDistance === "number" ? eVRef_current.maxDistance : 200, Math.max(c, 100 / s * o));
        let d = typeof eVRef_current.maxPolarAngle === "number" ? eVRef_current.maxPolarAngle : i.S;
        let u = Math.min(90, Math.max(0, cameraPitchDeg ?? 28));
        l.phi = Math.min(d - 0.001, Math.max(0.05, cj9.degToRad(u)));
        r.setFromSpherical(l);
        t_object.position.copy(eVRef_current.target).add(r);
        if (typeof t_object.updateProjectionMatrix === "function") {
            t_object.updateProjectionMatrix();
        }
        if (typeof eVRef_current.update === "function") {
            eVRef_current.update();
        }
    }, [
        cameraCommandNonce,
        cameraZoomPercent,
        cameraPitchDeg,
        mode
    ]);
    useEffect(()=>{
        if (!cameraPresetNonce || !cameraPreset || mode !== "orbit") {
            return;
        }
        let eVRef_current = eVRef.current;
        if (!eVRef_current || !eVRef_current.object || !eVRef_current.target) {
            return;
        }
        let o_object = eVRef_current.object;
        let i = o_object.position.clone().sub(eVRef_current.target);
        let c = new YHV().setFromVector3(i);
        let d = eHRef.current ?? c.radius;
        c.radius = Math.min(eVRef_current.maxDistance ?? 200, Math.max(eVRef_current.minDistance ?? 3, d));
        switch(cameraPreset){
            case "front":
                c.phi = Math.PI / 2 - 0.001;
                c.theta = 0;
                break;
            case "side":
                c.phi = Math.PI / 2 - 0.001;
                c.theta = Math.PI / 2;
                break;
            case "top":
                c.phi = 0.05;
                c.theta = 0;
                break;
            default:
                c.phi = Math.PI / 4;
                c.theta = Math.PI / 4;
        }
        i.setFromSpherical(c);
        o_object.position.copy(eVRef_current.target).add(i);
        o_object.lookAt(eVRef_current.target);
        o_object.updateProjectionMatrix?.();
        eVRef_current.update?.();
    }, [
        mode,
        cameraPreset,
        cameraPresetNonce
    ]);
    useEffect(()=>{
        if (!focusBlock || !state.isReady || mode !== "orbit" || !eR || eORef.current === focusBlock.nonce) {
            return;
        }
        let eVRef_current = eVRef.current;
        if (!eVRef_current?.object || !eVRef_current?.target) {
            return;
        }
        let r = new Pq0(...focusBlock.position).addScalar(0.5);
        let l = eVRef_current.object.position.clone().sub(eVRef_current.target);
        if (l.lengthSq() < 1e-8) {
            l.set(1, 1, 1);
        }
        l.normalize();
        let o = Math.min(eVRef_current.maxDistance ?? 200, Math.max(eVRef_current.minDistance ?? 3, Math.min(12, Math.max(3, 0.06 * Math.hypot(...eR.size)))));
        eVRef_current.target.copy(r);
        eVRef_current.object.position.copy(r).addScaledVector(l, o);
        eVRef_current.update();
        eORef.current = focusBlock.nonce;
    }, [
        focusBlock,
        state.isReady,
        mode,
        eR
    ]);
    useEffect(()=>{
        if (!teachingData) {
            return void setEF(undefined);
        }
        try {
            let e = JSON.parse(teachingData);
            if (e.steps && Array.isArray(e.steps)) {
                let t = e.steps.map((e, t)=>({
                        stepNumber: e.stepNumber ?? t + 1,
                        title: e.title || `步骤 ${t + 1}`,
                        description: e.description || "",
                        blocks: Array.isArray(e.blocks) ? e.blocks : [],
                        materials: Array.isArray(e.materials) ? e.materials : e.materials && typeof e.materials === "object" ? Object.entries(e.materials).map(([t, n])=>({
                                name: t,
                                count: Number(n) || 0
                            })) : [],
                        ...J2(e.camera) ? {
                            camera: J2(e.camera)
                        } : {},
                        ...H7(e.entities)
                    }));
                setEF(t);
                return;
            }
            if (e.blockSteps && Array.isArray(e.blockSteps)) {
                let t = e.blockSteps.map((e, t)=>({
                        stepNumber: e.stepNumber ?? t + 1,
                        title: e.title || `步骤 ${t + 1}`,
                        description: e.description || "",
                        blocks: Array.isArray(e.blocks) ? e.blocks : [],
                        materials: Array.isArray(e.materials) ? e.materials : e.materials && typeof e.materials === "object" ? Object.entries(e.materials).map(([t, n])=>({
                                name: t,
                                count: Number(n) || 0
                            })) : [],
                        ...H7(e.entities)
                    }));
                setEF(t);
                return;
            }
            setEF(undefined);
        } catch (e) {
            console.warn("解析 teachingData 失败");
            setEF(undefined);
        }
    }, [
        teachingData
    ]);
    useEffect(()=>{
        let e = `${buildingId || projectionFileUrl || ""}:${projectionIdentity ?? ""}`;
        if (!buildingId && !projectionFileUrl || !e || eTRef.current === e) {
            return;
        }
        eTRef.current = e;
        let t = false;
        (async ()=>{
            try {
                setES("fetching");
                setEA("正在准备投影文件...");
                setEI(null);
                y6().catch(()=>{});
                import("./module-41449.js").catch(()=>{});
                setES("parsing");
                setEA("正在解析方块数据...");
                let e = await U({
                    buildingId,
                    projectionFileUrl,
                    projectionIdentity
                });
                if (t) {
                    return;
                }
                setER(e);
                setES("ready");
                setEA("");
            } catch (error) {
                if (t) {
                    return;
                }
                console.error("投影文件加载失败:", error);
                let e = error.message || "加载投影文件失败";
                setEI(e);
                setES("error");
                onError?.(e);
            }
        })();
        return ()=>{
            t = true;
            if (eTRef.current === e) {
                eTRef.current = "";
            }
        };
    }, [
        buildingId,
        projectionFileUrl,
        projectionIdentity,
        onError
    ]);
    useEffect(()=>{
        if (onProjectionInfo) {
            if (!eR || eS !== "ready") {
                return void onProjectionInfo(null);
            }
            onProjectionInfo(Iz(eR));
        }
    }, [
        eR,
        eS,
        onProjectionInfo
    ]);
    let e4 = useCallback((e)=>{
        actions.handleBlockClick(e);
    }, [
        actions
    ]);
    let onModeChange = useCallback((e)=>{
        eG(e);
    }, []);
    let onClick = useCallback(()=>{
        actions.handleBlockClick(null);
        eG(mode === "firstPerson" ? "orbit" : "firstPerson");
    }, [
        actions,
        mode,
        eG
    ]);
    let e9 = mode === "orbit" || eL;
    let onPointerMissed_1 = useCallback(()=>{
        if (e9) {
            if (state.selectedBlock) {
                actions.handleBlockClick(null);
            }
            if (onPointerMissed != null) {
                onPointerMissed();
            }
        }
    }, [
        e9,
        state.selectedBlock,
        actions,
        onPointerMissed
    ]);
    let onReady = useCallback((e)=>{
        actions.handleReady(e);
        onTeachingReady?.(e);
    }, [
        actions,
        onTeachingReady
    ]);
    let tt = useMemo(()=>{
        if (eR) {
            return {
                center: [
                    eR.size[0] / 2,
                    eR.size[1] / 2,
                    eR.size[2] / 2
                ],
                radius: Math.hypot(eR.size[0], eR.size[2]) / 2
            };
        }
        return null;
    }, [
        eR
    ]);
    if (eS !== "ready" || !eR) {
        return <div className="absolute inset-0 flex items-center justify-center bg-bg-primary">{onExit && <er.$ onClick={onExit} size="sm" variant="secondary" className="absolute top-4 left-4 z-10"><Z.A size={16}/>返回图片</er.$>}{eS === "error" ? <div className="text-center"><X.A size={36} className="text-status-error mb-4"/><p className="text-text-primary font-bold mb-2">加载失败</p><p className="text-text-secondary text-sm">{eI}</p><er.$ onClick={()=>{
            eTRef.current = "";
            setES("idle");
        }} size="sm" className="mt-4">重试</er.$></div> : <div className="text-center"><et.y size="md" className="mb-3"/><p className="text-text-muted font-bold text-sm">{eA || "准备中..."}</p><p className="text-text-muted/60 text-xs mt-1">{eS === "fetching" && "正在从服务器获取投影文件"}{eS === "parsing" && "正在解析方块数据，请稍候"}</p></div>}</div>;
    }
    state.mode === "step" ? state.stepCount : state.layerCount;
    let tn = eo.n(state, actions);
    return <div className="absolute inset-0 overflow-hidden mcb-viewport"><Hl camera={{
        position: [
            15,
            15,
            15
        ],
        fov: cameraFov ?? eN.camera.fov
    }} {...h.$i(eN, {
        alpha: true
    })} resize={{
        offsetSize: true
    }} style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    }} onCreated={({ gl, scene })=>{
        e_Ref.current = gl.domElement;
        h.yh(gl, scene, eN, {
            transparent: true
        });
    }} onPointerMissed={onPointerMissed_1}><cr.Provider value={eN}><m.c entry="teaching" transparent/><EcComponent cameraFov={cameraFov} configFov={eN.camera.fov}/><h.AA center={tt?.center} fitRadius={tt?.radius}/>{showGroundGrid && <h.sK center={tt?.center} fitRadius={tt?.radius}/>}<h.Pk center={tt?.center} fitRadius={tt?.radius}/><i.m mode={mode} onModeChange={onModeChange} orbitRef={eVRef} enabled={state.isReady} moveSpeed={moveSpeed} onSpeedChange={onSpeedChange} orbitConfig={{
        enableDamping: true,
        dampingFactor: 0.1,
        minDistance: 3,
        maxDistance: 200,
        ...orbitOverrides
    }}/><P1Component controlsRef={eVRef} camera={eF?.[state.currentIndex]?.camera} blocks={eF?.[state.currentIndex]?.blocks} stepIndex={state.currentIndex} mode={stepCameraFollow} enabled={stepCameraFollowEnabled && state.isReady && mode === "orbit"} onDetach={onStepCameraDetach}/>{jsx(es, {
        model: eR,
        stepData: eF,
        mode: state.mode,
        currentIndex: state.currentIndex,
        enableAnimation: true,
        stepOutlineMode,
        selectionContourMode,
        onBlockClick: e9 ? e4 : undefined,
        onEntityClick: e9 ? onEntityClick : undefined,
        selectedEntity: e9 ? selectedEntity : null,
        onReady,
        controlsRef: eVRef,
        resetCameraKey,
        focusMode: state.focusMode,
        explodedSpacing: state.explodedSpacing,
        highlightedBlockId: highlightedBlockId ?? state.highlightedBlockId,
        selectedBlockPosition: state.selectedBlock?.position ?? null,
        emissiveConfig: eN.emissive,
        showDecorEntities: state.showDecorEntities,
        showCreatures: state.showCreatures
    })}{autoMeasure && <TComponent model={eR} stepData={eF} mode={state.mode} currentIndex={state.currentIndex} enabled={state.isReady && mode === "orbit"} focusMode={state.focusMode} explodedSpacing={state.explodedSpacing} labelLayer={eURef} onChange={onAutoMeasureChange}/>}{measurePoints && measurePoints.length > 0 && <A_2 pointA={measurePoints[0]} pointB={measurePoints.length >= 2 ? measurePoints[1] : null} confirmed={measurePoints.length >= 2}/>}<I_1/></cr.Provider></Hl><i className="mcb-viewport-vignette" aria-hidden="true"/>{state.isReady && mode === "firstPerson" && <D1Component speed={speed} locked={eL}/>}<en.v model={eR}/>{autoMeasure && <div ref={eURef} className="tv-measure-layer is-hidden" aria-hidden="true"/>}{!state.isReady && <div className="absolute inset-0 z-[50] flex items-center justify-center bg-bg-primary pointer-events-auto"><div className="text-center"><et.y size="md" className="mb-3"/><p className="text-text-muted font-bold text-sm">正在加载模型...</p><p className="text-text-muted/60 text-xs mt-1">方块较多时稍候数秒</p></div></div>}{mode === "firstPerson" && eW && <div className="bdi-control-hint bdi-first-person-hint"><A_3 size={11} className="text-brand-cta"/><span><b>只读行走预览</b> · <span className="bdi-hint-action"><kbd>左键</kbd>点击画面进入</span>，<span className="bdi-hint-action"><kbd>WASD</kbd> 移动</span>，<span className="bdi-hint-action"><kbd>空格</kbd>上升</span> / <span className="bdi-hint-action"><kbd>Shift</kbd> 下降</span>，<span className="bdi-hint-action"><kbd>滚轮</kbd>调速</span>，<span className="bdi-hint-action"><kbd>Esc</kbd> 退出</span></span></div>}{!hideFloatingTools && <div className="absolute left-4 top-16 z-[100] flex flex-col gap-2">{eW && state.isReady && <er.$ onClick={onClick} aria-pressed={mode === "firstPerson"} size="xs" variant={mode === "firstPerson" ? "primary" : "secondary"} className="group justify-start">{mode === "firstPerson" ? <A_4 size={11}/> : <A_3 size={11}/>}<span>{mode === "firstPerson" ? "轨道" : "行走"}</span><span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-fast whitespace-nowrap bg-bg-card text-text-primary text-xs px-3 py-2 border-2 border-border-hard shadow-block-sm max-w-[220px]">{mode === "firstPerson" ? "返回轨道视角" : "只读行走预览，适合查看内饰结构"}</span></er.$>}{state.mode !== "preview" && state.isReady && <er.$ onClick={()=>actions.toggleFocusMode()} aria-pressed={state.focusMode} size="xs" variant={state.focusMode ? "primary" : "secondary"} className="group justify-start">{state.focusMode ? <W.A size={11}/> : <J.A size={11}/>}<span>{state.focusMode ? "已聚焦" : "聚焦"}</span><span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-fast whitespace-nowrap bg-bg-card text-text-primary text-xs px-3 py-2 border-2 border-border-hard shadow-block-sm max-w-[200px]">{state.focusMode ? "点击退出聚焦，恢复累积显示" : "只显示当前层方块，其他层显示为线框轮廓"}</span></er.$>}{state.isReady && state.layerCount > 1 && <er.$ onClick={()=>actions.toggleExplode()} aria-pressed={state.explodedSpacing > 0} size="xs" variant={state.explodedSpacing > 0 ? "primary" : "secondary"} className="group justify-start"><K.A size={11}/><span>{state.explodedSpacing > 0 ? "收拢" : "爆炸图"}</span><span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-fast whitespace-nowrap bg-bg-card text-text-primary text-xs px-3 py-2 border-2 border-border-hard shadow-block-sm max-w-[200px]">{state.explodedSpacing > 0 ? "点击收拢，恢复正常视图" : "逐层拉开间距，查看建筑内部结构"}</span></er.$>}</div>}{!hideBuiltinUI && <>{onExit && <er.$ onClick={onExit} size="sm" variant="secondary" className="absolute top-4 left-4 z-10"><Z.A size={16}/>返回图片</er.$>}<div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2"><ea.I value={state.mode} onValueChange={(e)=>actions.setMode(e)} size="sm" label="教学查看模式">{[
        "preview",
        "layer",
        "step"
    ].map((e)=><ea.d key={e} value={e}>{e === "preview" ? "预览" : e === "layer" ? "层级" : "步骤"}</ea.d>)}</ea.I>{state.mode !== "preview" && state.isReady && <el.K onClick={()=>actions.toggleFocusMode()} label={state.focusMode ? "退出聚焦当前层" : "聚焦当前层"} aria-pressed={state.focusMode} size="sm" variant={state.focusMode ? "primary" : "secondary"} className="md:hidden">{state.focusMode ? <W.A size={16}/> : <J.A size={16}/>}</el.K>}</div>{state.explodedSpacing > 0 && state.isReady && <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 bg-bg-card border-2 border-border-hard rounded-md shadow-block px-4 py-3 flex items-center gap-3 w-[280px]"><K.A size={12} className="text-brand-cta shrink-0"/><input type="range" min="0" max="3" step="0.1" value={state.explodedSpacing} onChange={(e)=>actions.setExplodeSpacing(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-bg-elevated border-2 border-border-hard rounded-sm appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-brand-cta [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-border-hard [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:shadow-block-sm"/><span className="text-xs font-extrabold text-text-primary w-8 text-right shrink-0">{state.explodedSpacing.toFixed(1)}x</span></div>}{state.mode !== "preview" && state.isReady && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[320px]">{jsx(ei, {
        ...tn,
        theme: "dark"
    })}</div>}{state.selectedBlock && (()=>{
        let t = state.selectedBlock.blockId?.replace("minecraft:", "") || "";
        let n = state.materialStats.find((e)=>e.blockId === state.selectedBlock.blockId || e.blockId.replace("minecraft:", "") === t);
        return <div className="absolute bottom-16 left-3 w-[260px] bg-bg-card border-2 border-border-hard rounded-md shadow-block p-3 flex flex-col gap-2.5 z-[4]"><div className="grid grid-cols-[40px_1fr_32px] max-md:grid-cols-[40px_1fr_44px] items-center gap-2.5"><div className="w-10 h-10 bg-bg-elevated border-2 border-border-hard rounded-sm shadow-inset flex items-center justify-center text-brand-cta text-lg overflow-hidden"><Q.A size={16}/></div><div className="min-w-0 flex flex-col gap-[2px]"><div className="text-[13px] font-extrabold text-text-primary truncate tracking-tight">{t}</div><div className="text-[9.5px] text-text-muted font-semibold font-mono truncate">{state.selectedBlock.blockId || ""}</div></div><el.K onClick={()=>actions.handleBlockClick(null)} label="关闭方块信息" size="xs" variant="secondary" className="hover:bg-error hover:text-white hover:border-error"><A_5 size={16}/></el.K></div><div className="grid grid-cols-2 gap-x-2.5 gap-y-1 p-2 bg-bg-card border-2 border-border-soft rounded-sm">{state.selectedBlock.position && <div className="flex flex-col gap-[1px] min-w-0"><span className="text-[9px] font-bold text-text-muted uppercase tracking-wide">坐标</span><span className="text-[11px] font-bold text-text-primary truncate">({state.selectedBlock.position[0]}, {state.selectedBlock.position[1]}, {state.selectedBlock.position[2]})</span></div>}{n && <div className="flex flex-col gap-[1px] min-w-0"><span className="text-[9px] font-bold text-text-muted uppercase tracking-wide">数量</span><span className="text-[11px] font-bold text-text-primary truncate">{n.count} 个</span></div>}</div><er.$ onClick={()=>actions.highlightMaterial(state.selectedBlock?.blockId || null)} aria-pressed={state.highlightedBlockId === state.selectedBlock.blockId} size="xs" variant={state.highlightedBlockId === state.selectedBlock.blockId ? "warning" : "primary"}><W.A size={10}/>{state.highlightedBlockId === state.selectedBlock.blockId ? "已高亮" : "高亮所有同类方块"}</er.$></div>;
    })()}<div className="absolute bottom-4 right-4 z-10 text-xs text-white/50">{state.isReady && <span>{state.totalBlocks} 方块 | {state.layerCount} 层{state.stepCount !== state.layerCount && ` | ${state.stepCount} 步`}</span>}</div></>}</div>;
}
export function ProjectionTeachingViewer(e) {
    return <AT><EdComponent {...e}/></AT>;
}
let ep = ProjectionTeachingViewer;
export { ep as default };
