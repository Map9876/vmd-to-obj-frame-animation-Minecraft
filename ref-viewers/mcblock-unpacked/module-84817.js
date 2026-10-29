import { n } from "./module-78356.js";
import { LoY, THS } from "./module-85339.js";
import { Li, Mi, e as e_1, gw, kO } from "./module-82084.js";
import { $ } from "./module-70219.js";
import { a4, e7, jX, mD, nf, qv, vD, wd } from "./module-28857.js";
const s = require(49745);
let c = {
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
function i(e, t) {
    let { blockDefinitions, blockModels, atlas } = t;
    let v = new Map;
    for (let [g, w] of e){
        let e;
        let _ = w.blockId;
        let d = w.properties;
        let h = n(_, d, t);
        let hasFluidTopCapGroup = false;
        let b = _.replace("minecraft:", "");
        let A = /(^|_)banner$/.test(b) || /(^|_)wall_banner$/.test(b);
        let F = A ? null : e7(_, h, atlas, blockModels);
        if (a4(_)) {
            e = nf(h, atlas);
        } else if (A) {
            e = jX(_, h, atlas) ?? m();
        } else if (F) {
            e = F;
        } else if (vD(_)) {
            let t = {
                keepTopFace: true
            };
            e = mD(_, h, atlas, t);
            hasFluidTopCapGroup = wd(h, t);
        } else {
            let t = gw.parse(_);
            let n = blockDefinitions.getBlockDefinition(t);
            if (n) {
                try {
                    e = n.getMesh(t, h, atlas, blockModels, {});
                } catch (t) {
                    e = m();
                }
            } else {
                e = m();
            }
        }
        if (e.quads.length === 0) {
            let t = jX(_, h, atlas);
            e = t ?? m();
        }
        let y = ((e)=>c[e.replace("minecraft:", "")] ?? null)(_);
        if (y) {
            ((e, t)=>{
                for (let r of e.quads){
                    for (let e of r.vertices()){
                        let r = e.color;
                        if (r && (r[0] < 0.99 || r[1] < 0.99 || r[2] < 0.99)) {
                            e.color = t;
                        }
                    }
                }
            })(e, y);
        }
        e.computeNormals();
        let classifiedFromAtlas = !!t.alphaSource && !w.properties[s.LN];
        let { geometry, alphaClasses } = $(e.quads, classifiedFromAtlas ? t.alphaSource : undefined, f, hasFluidTopCapGroup ? qv : 0);
        v.set(g, {
            variantKey: g,
            geometry,
            group: w,
            alphaClasses,
            classifiedFromAtlas,
            hasFluidTopCapGroup
        });
    }
    return v;
}
export { i as s };
function f(e) {
    let t = 4 * e.length;
    let r = 6 * e.length;
    let n = new Float32Array(3 * t);
    let l = new Float32Array(2 * t);
    let o = new Float32Array(3 * t);
    let s = new Float32Array(3 * t);
    let u = new Uint32Array(r);
    for(let t = 0; t < e.length; t++){
        let r = e[t].vertices();
        let a = 4 * t;
        let v = 6 * t;
        for(let e = 0; e < 4; e++){
            let t = r[e];
            let u = (a + e) * 3;
            let v = (a + e) * 2;
            n[u] = t.pos.x;
            n[u + 1] = t.pos.y;
            n[u + 2] = t.pos.z;
            if (t.texture) {
                l[v] = t.texture[0];
                l[v + 1] = t.texture[1];
            }
            if (t.normal) {
                o[u] = t.normal.x;
                o[u + 1] = t.normal.y;
                o[u + 2] = t.normal.z;
            }
            let p = t.color ?? [
                1,
                1,
                1
            ];
            s[u] = p[0] ?? 1;
            s[u + 1] = p[1] ?? 1;
            s[u + 2] = p[2] ?? 1;
        }
        u[v] = a;
        u[v + 1] = a + 1;
        u[v + 2] = a + 2;
        u[v + 3] = a;
        u[v + 4] = a + 2;
        u[v + 5] = a + 3;
    }
    let v = new LoY;
    v.setAttribute("position", new THS(n, 3));
    v.setAttribute("uv", new THS(l, 2));
    v.setAttribute("normal", new THS(o, 3));
    v.setAttribute("color", new THS(s, 3));
    v.setIndex(new THS(u, 1));
    return v;
}
function m() {
    let e = [];
    let t = [
        1,
        0,
        1
    ];
    for (let r of [
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
        let n = r.verts.map(([n, a, o])=>{
            let s = new Mi(n, a, o);
            let u = new Mi(r.normal[0], r.normal[1], r.normal[2]);
            return new Li(s, t, undefined, undefined, u, undefined);
        });
        e.push(new kO(n[0], n[1], n[2], n[3]));
    }
    return new e_1(e);
}
