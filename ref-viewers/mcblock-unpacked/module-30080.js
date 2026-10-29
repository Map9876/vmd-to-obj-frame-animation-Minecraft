import { Pq0 } from "./module-85339.js";
export let D0 = {
    px: 1,
    nx: 2,
    py: 4,
    ny: 8,
    pz: 16,
    nz: 32
};
export let xS = [
    [
        1,
        0,
        0,
        D0.px,
        D0.nx
    ],
    [
        -1,
        0,
        0,
        D0.nx,
        D0.px
    ],
    [
        0,
        1,
        0,
        D0.py,
        D0.ny
    ],
    [
        0,
        -1,
        0,
        D0.ny,
        D0.py
    ],
    [
        0,
        0,
        1,
        D0.pz,
        D0.nz
    ],
    [
        0,
        0,
        -1,
        D0.nz,
        D0.pz
    ]
];
export let Xb = "";
export function sN(e, t, n) {
    let a;
    let r = n?.hidden ?? null;
    let u = (a = n?.layersApart) != null && a;
    let groups = new Map;
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
    let total = 0;
    for (let n of e){
        if (r?.has(n)) {
            continue;
        }
        let e = n.split(",");
        if (e.length !== 3) {
            continue;
        }
        let i = Number(e[0]);
        let a = Number(e[1]);
        let p = Number(e[2]);
        if (!Number.isInteger(i) || !Number.isInteger(a) || !Number.isInteger(p)) {
            continue;
        }
        let h = t?.variantAt(n) ?? Xb;
        let v = 0;
        if (t) {
            for (let [e, n, s, l, r] of xS){
                if ((!u || n === 0) && t.occluderFacesAt(`${i + e},${a + n},${p + s}`) & r) {
                    v |= l;
                }
            }
        }
        let g = groups.get(h);
        if (!g) {
            g = {
                positions: [],
                culls: []
            };
            groups.set(h, g);
        }
        g.positions.push(i, a, p);
        g.culls.push(v);
        total++;
        if (i < min[0]) {
            min[0] = i;
        }
        if (a < min[1]) {
            min[1] = a;
        }
        if (p < min[2]) {
            min[2] = p;
        }
        if (i + 1 > max[0]) {
            max[0] = i + 1;
        }
        if (a + 1 > max[1]) {
            max[1] = a + 1;
        }
        if (p + 1 > max[2]) {
            max[2] = p + 1;
        }
    }
    return {
        groups,
        total,
        min,
        max
    };
}
let r = [
    [
        D0.nx,
        D0.px
    ],
    [
        D0.ny,
        D0.py
    ],
    [
        D0.nz,
        D0.pz
    ]
];
let u = [
    D0.px,
    D0.nx,
    D0.py,
    D0.ny,
    D0.pz,
    D0.nz
];
let c = (material)=>!!material && !material.transparent && !(material.alphaTest > 0);
export function H8(e, material) {
    let n = e.getAttribute("position");
    if (!n) {
        return 0;
    }
    let a = e.getIndex();
    let o = e.getAttribute("normal");
    let count = a ? a.count : n.count;
    let l = Array.isArray(material) ? material : null;
    let m = l ? e.groups.length > 0 ? e.groups.map((e)=>({
            start: e.start,
            count: e.count,
            material: l[e.materialIndex ?? 0]
        })) : [
        {
            start: 0,
            count,
            material: l[0]
        }
    ] : [
        {
            start: 0,
            count,
            material
        }
    ];
    let f = new Float64Array(6);
    let d = new Pq0;
    let p = new Pq0;
    let h = new Pq0;
    let v = new Pq0;
    for (let e of m){
        if (!c(e.material)) {
            continue;
        }
        let t = Math.min(e.start + e.count, count);
        for(let i = e.start; i + 2 < t; i += 3){
            let e = a ? a.getX(i) : i;
            let t = a ? a.getX(i + 1) : i + 1;
            let s = a ? a.getX(i + 2) : i + 2;
            d.fromBufferAttribute(n, e);
            p.fromBufferAttribute(n, t);
            h.fromBufferAttribute(n, s);
            if (o) {
                v.fromBufferAttribute(o, e);
            }
            for(let e = 0; e < 3; e++){
                let t = d.getComponent(e);
                let n = p.getComponent(e);
                let i = h.getComponent(e);
                let a = -1;
                if (Math.abs(t) < 0.0001 && Math.abs(n) < 0.0001 && Math.abs(i) < 0.0001) {
                    a = 0;
                } else if (Math.abs(t - 1) < 0.0001 && Math.abs(n - 1) < 0.0001 && Math.abs(i - 1) < 0.0001) {
                    a = 1;
                }
                if (a < 0 || o && (a === 1 ? v.getComponent(e) < 0.5 : v.getComponent(e) > -0.5)) {
                    continue;
                }
                let s = r[e][a];
                f[u.indexOf(s)] += p.clone().sub(d).cross(h.clone().sub(d)).length() / 2;
            }
        }
    }
    let g = 0;
    for(let e = 0; e < 6; e++){
        if (f[e] >= 0.999) {
            g |= u[e];
        }
    }
    return g;
}
export function i7(e) {
    let t = e.getAttribute("position");
    if (!t || t.count < 24) {
        return false;
    }
    let t_array = t.array;
    for(let e = 0; e < 3 * t.count; e++){
        let t = t_array[e];
        if (Math.abs(t) > 0.0001 && Math.abs(t - 1) > 0.0001) {
            return false;
        }
    }
    return true;
}
