import * as a from "./module-78356.js";
import { LoY, THS } from "./module-85339.js";
import { CV, Tl, vt } from "./module-85250.js";
import { IM, Li, Mi, OP, e as e_1, gw, kO } from "./module-82084.js";
import { ae } from "./module-37578.js";
import { a9, bD, cO, dH } from "./module-46397.js";
import { a4, e7, jX, mD, nf, vD, yN } from "./module-28857.js";
import { $ } from "./module-70219.js";
const u = require(55822);
const p = require(49745);
let h = {
    up: [
        0,
        1,
        0
    ],
    down: [
        0,
        -1,
        0
    ],
    north: [
        0,
        0,
        -1
    ],
    south: [
        0,
        0,
        1
    ],
    east: [
        1,
        0,
        0
    ],
    west: [
        -1,
        0,
        0
    ]
};
function m(e) {
    return !a9(e, dH);
}
let d = {
    grass_block: [
        0.569,
        0.741,
        0.349
    ],
    short_grass: [
        0.569,
        0.741,
        0.349
    ],
    grass: [
        0.569,
        0.741,
        0.349
    ],
    tall_grass: [
        0.569,
        0.741,
        0.349
    ],
    fern: [
        0.569,
        0.741,
        0.349
    ],
    large_fern: [
        0.569,
        0.741,
        0.349
    ],
    potted_fern: [
        0.569,
        0.741,
        0.349
    ],
    sugar_cane: [
        0.569,
        0.741,
        0.349
    ],
    oak_leaves: [
        0.467,
        0.671,
        0.184
    ],
    jungle_leaves: [
        0.467,
        0.671,
        0.184
    ],
    acacia_leaves: [
        0.467,
        0.671,
        0.184
    ],
    dark_oak_leaves: [
        0.467,
        0.671,
        0.184
    ],
    mangrove_leaves: [
        0.467,
        0.671,
        0.184
    ],
    vine: [
        0.467,
        0.671,
        0.184
    ],
    spruce_leaves: [
        0.38,
        0.6,
        0.38
    ],
    birch_leaves: [
        0.502,
        0.655,
        0.333
    ],
    azalea_leaves: [
        0.467,
        0.671,
        0.184
    ],
    flowering_azalea_leaves: [
        0.467,
        0.671,
        0.184
    ]
};
function g(e) {
    return d[e.replace("minecraft:", "")] ?? null;
}
function v(e, t) {
    for (let l of e.quads){
        for (let e of l.vertices()){
            let l = e.color;
            if (l && (l[0] < 0.99 || l[1] < 0.99 || l[2] < 0.99)) {
                e.color = t;
            }
        }
    }
}
function w(e, t) {
    let { blockDefinitions, blockModels, atlas } = t = a.g(t, e);
    let f = new Map;
    for (let t of e.blocks){
        let e = `${t.position[0]},${t.position[1]},${t.position[2]}`;
        f.set(e, t);
    }
    let p = e.totalBlockCount > 5000;
    let d = new Set;
    if (p) {
        for (let t of e.blocks){
            if (!m(t.blockId)) {
                continue;
            }
            let [e, l, a] = t.position;
            let o = true;
            for (let [t, n, s] of Object.values(h)){
                let r = f.get(`${e + t},${l + n},${a + s}`);
                if (!r || !m(r.blockId)) {
                    o = false;
                    break;
                }
            }
            if (o) {
                d.add(`${e},${l},${a}`);
            }
        }
    }
    let w = new Map;
    for (let r of e.blocks){
        let e;
        let c = `${r.position[0]},${r.position[1]},${r.position[2]}`;
        if (p && d.has(c)) {
            continue;
        }
        let [k, y, q] = r.position;
        let A = r.blockId;
        let D = yN(r, f);
        let M = a.n(A, D, t);
        if (vD(A)) {
            let e = mD(A, M, atlas);
            let t = vt();
            Tl(t, t, [
                k,
                y,
                q
            ]);
            e.transform(t);
            e.computeNormals();
            let l = new Mi(k, y, q);
            for (let t of e.quads){
                t.forEach((e)=>{
                    e.blockPos = l;
                });
            }
            if (!w.has(A)) {
                w.set(A, {
                    quads: [],
                    positions: []
                });
            }
            let a = w.get(A);
            a.quads.push(...e.quads);
            a.positions.push(r.position);
            continue;
        }
        let S = gw.parse(A);
        let P = blockDefinitions.getBlockDefinition(S);
        let T = A.replace("minecraft:", "");
        let C = /(^|_)banner$/.test(T) || /(^|_)wall_banner$/.test(T);
        let F = C ? null : e7(A, M, atlas, blockModels);
        if (a4(A)) {
            e = nf(M, atlas);
        } else if (C) {
            e = jX(A, M, atlas) ?? b();
        } else if (F) {
            e = F;
        } else if (P) {
            let t = {};
            if (m(A)) {
                for (let e of OP.ALL){
                    let [l, a, o] = h[e];
                    let n = `${k + l},${y + a},${q + o}`;
                    let s = f.get(n);
                    if (s && m(s.blockId)) {
                        t[e] = true;
                    }
                }
            }
            try {
                e = P.getMesh(S, M, atlas, blockModels, t);
            } catch (t) {
                e = b();
            }
        } else {
            e = b();
        }
        if (e.quads.length === 0) {
            let t = jX(A, M, atlas);
            if (!t) {
                continue;
            }
            e = t;
        }
        let H = g(A);
        if (H) {
            v(e, H);
        }
        let N = vt();
        Tl(N, N, [
            k,
            y,
            q
        ]);
        e.transform(N);
        e.computeNormals();
        let x = new Mi(k, y, q);
        for (let t of e.quads){
            t.forEach((e)=>{
                e.blockPos = x;
            });
        }
        if (!w.has(A)) {
            w.set(A, {
                quads: [],
                positions: []
            });
        }
        let I = w.get(A);
        I.quads.push(...e.quads);
        I.positions.push(r.position);
    }
    let y = [];
    for (let [e, { quads, positions }] of w.entries()){
        if (quads.length === 0) {
            continue;
        }
        let geometry = k(quads);
        y.push({
            blockId: e,
            geometry,
            blockPositions: positions,
            needsAlphaTest: a9(e, bD),
            needsTransparent: a9(e, cO) || vD(e),
            animationInfo: ae(e)
        });
    }
    return y;
}
export { w as ae };
function k(e) {
    let t = 4 * e.length;
    let l = 6 * e.length;
    let a = new Float32Array(3 * t);
    let n = new Float32Array(2 * t);
    let s = new Float32Array(3 * t);
    let r = new Float32Array(3 * t);
    let c = new Float32Array(3 * t);
    let i = new Uint32Array(l);
    for(let t = 0; t < e.length; t++){
        let l = e[t].vertices();
        let o = 4 * t;
        let m = 6 * t;
        for(let e = 0; e < 4; e++){
            let t = l[e];
            let i = (o + e) * 3;
            let m = (o + e) * 2;
            a[i] = t.pos.x;
            a[i + 1] = t.pos.y;
            a[i + 2] = t.pos.z;
            if (t.texture) {
                n[m] = t.texture[0];
                n[m + 1] = t.texture[1];
            }
            if (t.normal) {
                s[i] = t.normal.x;
                s[i + 1] = t.normal.y;
                s[i + 2] = t.normal.z;
            }
            let d = t.color ?? [
                1,
                1,
                1
            ];
            r[i] = d[0] ?? 1;
            r[i + 1] = d[1] ?? 1;
            r[i + 2] = d[2] ?? 1;
            if (t.blockPos) {
                c[i] = t.blockPos.x;
                c[i + 1] = t.blockPos.y;
                c[i + 2] = t.blockPos.z;
            }
        }
        i[m] = o;
        i[m + 1] = o + 1;
        i[m + 2] = o + 2;
        i[m + 3] = o;
        i[m + 4] = o + 2;
        i[m + 5] = o + 3;
    }
    let m = new LoY;
    m.setAttribute("position", new THS(a, 3));
    m.setAttribute("uv", new THS(n, 2));
    m.setAttribute("normal", new THS(s, 3));
    m.setAttribute("color", new THS(r, 3));
    m.setAttribute("blockPos", new THS(c, 3));
    m.setIndex(new THS(i, 1));
    return m;
}
function b() {
    let e = [];
    let t = [
        1,
        0,
        1
    ];
    for (let l of [
        {
            verts: [
                [
                    0,
                    1,
                    0
                ],
                [
                    0,
                    1,
                    1
                ],
                [
                    1,
                    1,
                    1
                ],
                [
                    1,
                    1,
                    0
                ]
            ],
            normal: [
                0,
                1,
                0
            ]
        },
        {
            verts: [
                [
                    0,
                    0,
                    1
                ],
                [
                    0,
                    0,
                    0
                ],
                [
                    1,
                    0,
                    0
                ],
                [
                    1,
                    0,
                    1
                ]
            ],
            normal: [
                0,
                -1,
                0
            ]
        },
        {
            verts: [
                [
                    1,
                    1,
                    0
                ],
                [
                    1,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0
                ],
                [
                    0,
                    1,
                    0
                ]
            ],
            normal: [
                0,
                0,
                -1
            ]
        },
        {
            verts: [
                [
                    0,
                    1,
                    1
                ],
                [
                    0,
                    0,
                    1
                ],
                [
                    1,
                    0,
                    1
                ],
                [
                    1,
                    1,
                    1
                ]
            ],
            normal: [
                0,
                0,
                1
            ]
        },
        {
            verts: [
                [
                    1,
                    1,
                    1
                ],
                [
                    1,
                    0,
                    1
                ],
                [
                    1,
                    0,
                    0
                ],
                [
                    1,
                    1,
                    0
                ]
            ],
            normal: [
                1,
                0,
                0
            ]
        },
        {
            verts: [
                [
                    0,
                    1,
                    0
                ],
                [
                    0,
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
                    1,
                    1
                ]
            ],
            normal: [
                -1,
                0,
                0
            ]
        }
    ]){
        let a = l.verts.map(([a, o, n])=>{
            let r = new Mi(a, o, n);
            let c = new Mi(l.normal[0], l.normal[1], l.normal[2]);
            return new Li(r, t, undefined, undefined, c, undefined);
        });
        e.push(new kO(a[0], a[1], a[2], a[3]));
    }
    return new e_1(e);
}
export function qA(e, t, l) {
    let o;
    let { blockDefinitions, blockModels, atlas } = l;
    let h = a.n(e, t, l);
    let m = false;
    let d = u.HP(e) ? null : e7(e, h, atlas, blockModels);
    if (a4(e)) {
        o = nf(h, atlas);
    } else if (u.HP(e)) {
        o = jX(e, h, atlas) ?? b();
    } else if (d) {
        o = d;
    } else if (vD(e)) {
        o = mD(e, h, atlas);
    } else {
        let t = gw.parse(e);
        let l = blockDefinitions.getBlockDefinition(t);
        if (l) {
            try {
                o = l.getMesh(t, h, atlas, blockModels, {});
            } catch (e) {
                o = b();
                m = true;
            }
        } else {
            o = b();
            m = true;
        }
    }
    if (o.quads.length === 0) {
        let t = jX(e, h, atlas);
        if (t) {
            o = t;
            m = false;
        } else {
            o = b();
            m = true;
        }
    }
    let _ = g(e);
    if (_) {
        v(o, _);
    }
    o.computeNormals();
    let y = !!l.alphaSource && !t[p.LN];
    let { geometry, alphaClasses } = $(o.quads, y ? l.alphaSource : undefined, k);
    geometry.userData.magentaFallback = m;
    geometry.userData.alphaClasses = alphaClasses;
    geometry.userData.classifiedFromAtlas = y;
    return geometry;
}
export function hu(e, t) {
    let l = e.startsWith("minecraft:") ? e : `minecraft:${e}`;
    let a = t.blockModels.getBlockModel(gw.parse(l));
    if (!a) {
        return null;
    }
    let o = a.getMesh(t.atlas, {});
    if (o.quads.length === 0) {
        return null;
    }
    o.computeNormals();
    let n = $(o.quads, t.alphaSource, k);
    n.geometry.userData.alphaClasses = n.alphaClasses;
    n.geometry.userData.classifiedFromAtlas = !!t.alphaSource;
    return n.geometry;
}
export function hG(e, t, l) {
    let o;
    let r = l.blockModels.getBlockModel(gw.parse(e));
    if (!r) {
        return null;
    }
    let c = a.n(t, {}, l);
    let i = IM[gw.parse(t).path];
    try {
        o = r.getMesh(l.atlas, {}, i?.(c));
    } catch (e) {
        return null;
    }
    if (o.quads.length === 0) {
        return null;
    }
    let u = g(t);
    if (u) {
        v(o, u);
    }
    o.transform(CV(vt(), [
        1 / 16,
        1 / 16,
        1 / 16
    ]));
    o.computeNormals();
    let p = $(o.quads, l.alphaSource, k);
    p.geometry.userData.alphaClasses = p.alphaClasses;
    p.geometry.userData.classifiedFromAtlas = !!l.alphaSource;
    return p.geometry;
}
