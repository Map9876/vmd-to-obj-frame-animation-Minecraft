import { CV, Tl, Z8, hs, kN, vt } from "./module-85250.js";
import { Li, Mi, e as e_1, gw, kO, y6 } from "./module-82084.js";
import { Cs, xl } from "./module-67454.js";
const l = require(55822);
const o = require(49745);
let c = new Set([
    "minecraft:water",
    "minecraft:lava",
    "minecraft:flowing_water",
    "minecraft:flowing_lava"
]);
let s = {
    up: "__mcblock_fluid_face_up",
    down: "__mcblock_fluid_face_down",
    north: "__mcblock_fluid_face_north",
    south: "__mcblock_fluid_face_south",
    east: "__mcblock_fluid_face_east",
    west: "__mcblock_fluid_face_west"
};
let f = {
    northWest: "__mcblock_fluid_h_nw",
    northEast: "__mcblock_fluid_h_ne",
    southEast: "__mcblock_fluid_h_se",
    southWest: "__mcblock_fluid_h_sw"
};
export function vD(e) {
    return c.has(e);
}
function d(blockId) {
    if (blockId.includes("water")) {
        return "water";
    }
    if (blockId.includes("lava")) {
        return "lava";
    }
    return null;
}
function h(e, t, n) {
    return `${e},${t},${n}`;
}
function g(blockId, t) {
    if (!t) {
        return false;
    }
    let n = d(blockId);
    return n !== null && d(t.blockId) === n;
}
export function yN(e, t) {
    let r = e.properties || {};
    let c = vD(e.blockId);
    let d = l.HP(e.blockId) ? e.renderData?.banner : undefined;
    let _ = o.CZ(e.blockId) ? e.renderData?.skull : undefined;
    if (!c && !d && !_) {
        return r;
    }
    let m = {
        ...r
    };
    if (_) {
        if (_.textureHash) {
            m[o.LN] = _.textureHash;
        }
        m[o.iy] = Cs(_);
    }
    if (c) {
        let [n, a, r] = e.position;
        let l = {
            up: t.get(h(n, a + 1, r)),
            down: t.get(h(n, a - 1, r)),
            north: t.get(h(n, a, r - 1)),
            south: t.get(h(n, a, r + 1)),
            east: t.get(h(n + 1, a, r)),
            west: t.get(h(n - 1, a, r))
        };
        for (let t of Object.keys(s)){
            m[s[t]] = g(e.blockId, l[t]) ? "false" : "true";
        }
        m[f.northWest] = p(w(e, t, [
            [
                0,
                0
            ],
            [
                -1,
                0
            ],
            [
                0,
                -1
            ],
            [
                -1,
                -1
            ]
        ]));
        m[f.northEast] = p(w(e, t, [
            [
                0,
                0
            ],
            [
                1,
                0
            ],
            [
                0,
                -1
            ],
            [
                1,
                -1
            ]
        ]));
        m[f.southEast] = p(w(e, t, [
            [
                0,
                0
            ],
            [
                1,
                0
            ],
            [
                0,
                1
            ],
            [
                1,
                1
            ]
        ]));
        m[f.southWest] = p(w(e, t, [
            [
                0,
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
                -1,
                1
            ]
        ]));
    }
    if (d) {
        if (d.baseColor) {
            m[l.Rf] = d.baseColor;
        }
        let e = l.am(d.patterns);
        if (e) {
            m[l.X1] = e;
        }
    }
    return m;
}
let m = new Set([
    "minecraft:player_head",
    "minecraft:zombie_head",
    "minecraft:skeleton_skull",
    "minecraft:wither_skeleton_skull",
    "minecraft:creeper_head",
    "minecraft:dragon_head",
    "minecraft:piglin_head"
]);
export function cw(e, t) {
    if (!e || !m.has(e)) {
        return;
    }
    let n = {
        rotation: "8"
    };
    if (e === "minecraft:player_head" && t) {
        if (t.textureHash) {
            n[o.LN] = t.textureHash;
        }
        n[o.iy] = Cs(t);
    }
    return n;
}
function w(e, t, n) {
    let [l, o, i] = e.position;
    let c = 0;
    let s = 0;
    for (let [r, f] of n){
        let n = r === 0 && f === 0 ? e : t.get(h(l + r, o, i + f));
        if (!g(e.blockId, n)) {
            continue;
        }
        if (g(e.blockId, t.get(h(l + r, o + 1, i + f)))) {
            return 1;
        }
        let u = M(n?.properties ?? {});
        let d = u >= 0.8 ? 10 : 1;
        c += u * d;
        s += d;
    }
    if (s > 0) {
        return c / s;
    }
    return M(e.properties ?? {});
}
function p(e) {
    return Math.max(0, Math.min(1, e)).toFixed(4);
}
export function mD(e, n = {}, a, l) {
    let o = [];
    let i = e.includes("water");
    let c = i ? [
        0.2,
        0.4,
        0.9
    ] : [
        0.9,
        0.5,
        0.1
    ];
    let u = M(n);
    let d = x(n, f.northWest, u);
    let h = x(n, f.northEast, u);
    let g = x(n, f.southEast, u);
    let _ = x(n, f.southWest, u);
    let uv_1 = V(a, i ? "minecraft:block/water_still" : "minecraft:block/lava_still");
    let uv = V(a, i ? "minecraft:block/water_flow" : "minecraft:block/lava_flow") ?? uv_1;
    let w = [];
    for (let e of [
        {
            face: "up",
            verts: [
                [
                    0,
                    d,
                    0
                ],
                [
                    0,
                    _,
                    1
                ],
                [
                    1,
                    g,
                    1
                ],
                [
                    1,
                    h,
                    0
                ]
            ],
            normal: [
                0,
                1,
                0
            ],
            uv: uv_1
        },
        {
            face: "down",
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
            ],
            uv: uv_1
        },
        {
            face: "north",
            verts: [
                [
                    1,
                    h,
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
                    d,
                    0
                ]
            ],
            normal: [
                0,
                0,
                -1
            ],
            uv
        },
        {
            face: "south",
            verts: [
                [
                    0,
                    _,
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
                    g,
                    1
                ]
            ],
            normal: [
                0,
                0,
                1
            ],
            uv
        },
        {
            face: "east",
            verts: [
                [
                    1,
                    g,
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
                    h,
                    0
                ]
            ],
            normal: [
                1,
                0,
                0
            ],
            uv
        },
        {
            face: "west",
            verts: [
                [
                    0,
                    d,
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
                    _,
                    1
                ]
            ],
            normal: [
                -1,
                0,
                0
            ],
            uv
        }
    ]){
        let t = n[s[e.face]] === "false";
        let a = e.face === "up" && t && l?.keepTopFace === true;
        if (t && !a) {
            continue;
        }
        let i = ((e)=>{
            if (!e) {
                return [
                    undefined,
                    undefined,
                    undefined,
                    undefined
                ];
            }
            let [t, n, a, r] = e;
            return [
                [
                    t,
                    n
                ],
                [
                    t,
                    r
                ],
                [
                    a,
                    r
                ],
                [
                    a,
                    n
                ]
            ];
        })(e.uv);
        let f = e.verts.map(([a, l, o], n)=>{
            let s = new Mi(a, l, o);
            let f = new Mi(e.normal[0], e.normal[1], e.normal[2]);
            return new Li(s, c, i[n], undefined, f, undefined);
        });
        let u = new kO(f[0], f[1], f[2], f[3]);
        if (a) {
            w.push(u);
        } else {
            o.push(u);
        }
    }
    return new e_1([
        ...o,
        ...w
    ]);
}
export let qv = 1;
export function wd(e, t) {
    return t?.keepTopFace === true && e[s.up] === "false";
}
function M(e) {
    let n = Number.parseInt(e.level ?? "0", 10);
    if (!Number.isFinite(n) || n <= 0) {
        return 8 / 9;
    }
    if (n >= 8) {
        return 1;
    }
    return Math.max(1 / 9, (8 - n) / 9);
}
function x(e, t, n) {
    let r = Number.parseFloat(e[t] ?? "");
    if (Number.isFinite(r)) {
        return Math.max(0, Math.min(1, r));
    }
    return n;
}
function V(e, t) {
    if (!e) {
        return null;
    }
    try {
        let n = e.getTextureUV(gw.parse(t));
        if (n && n.length === 4) {
            return [
                n[0],
                n[1],
                n[2],
                n[3]
            ];
        }
        return null;
    } catch (e) {
        return null;
    }
}
let N = [
    5.5,
    0.25,
    10.5,
    10.25
];
let I = [
    0.25,
    0.25,
    5.25,
    10.25
];
let R = [
    0,
    0.25,
    0.25,
    10.25
];
let T = [
    5.25,
    0.25,
    5.5,
    10.25
];
let O = [
    0.25,
    0,
    5.25,
    0.25
];
let C = [
    5.25,
    0,
    10.25,
    0.25
];
function F(e, t, n) {
    let a = V(e, t);
    if (!a) {
        return null;
    }
    let [r, l, o, i] = a;
    let c = (o - r) / 16;
    let s = (i - l) / 16;
    return [
        r + n[0] * c,
        l + n[1] * s,
        r + n[2] * c,
        l + n[3] * s
    ];
}
export function a4(e) {
    return e === "minecraft:redstone_wire" || e === "minecraft:redstone";
}
export function nf(l = {}, o) {
    let i = ((e)=>{
        let t = j(e);
        if (t === 0) {
            return [
                0.42,
                0.03,
                0.02
            ];
        }
        let n = t / 15;
        return [
            0.72 + 0.28 * n,
            0.06 + 0.1 * n,
            0.03 + 0.03 * n
        ];
    })(l.power);
    let c = ((e)=>{
        let t = j(e);
        if (t === 0) {
            return [
                0.35,
                0.02,
                0.015
            ];
        }
        let n = t / 15;
        return [
            0.95 + 0.05 * n,
            0.11 + 0.14 * n,
            0.06 + 0.05 * n
        ];
    })(l.power);
    let s = V(o, "minecraft:block/redstone_dust_dot") ?? ((e)=>{
        if (!e) {
            return null;
        }
        for (let t of [
            "minecraft:block/white_stained_glass",
            "minecraft:block/quartz_block",
            "minecraft:block/white_wool"
        ]){
            try {
                let n = e.getTextureUV(gw.parse(t));
                if (n && n.length === 4) {
                    return [
                        n[0],
                        n[1],
                        n[2],
                        n[3]
                    ];
                }
            } catch (e) {}
        }
        return null;
    })(o);
    let f = V(o, "minecraft:block/redstone_dust_line0") ?? s;
    let u = V(o, "minecraft:block/redstone_dust_line1") ?? f;
    let d = V(o, "minecraft:block/redstone_dust_overlay") ?? null;
    let h = [];
    let g = 5 / 16;
    let _ = 11 / 16;
    let m = 6 / 16;
    let b = 1 / 64;
    let w = 1 / 48;
    let p = {
        north: P(l.north),
        south: P(l.south),
        east: P(l.east),
        west: P(l.west)
    };
    let v = Object.values(p).some((e)=>e !== "none");
    D(h, g, g, _, _, b, i, s);
    if (v) {
        if (p.north !== "none") {
            D(h, m, 0, 0.625, g, b, i, f);
        }
        if (p.south !== "none") {
            D(h, m, _, 0.625, 1, b, i, f);
        }
        if (p.west !== "none") {
            D(h, 0, m, g, 0.625, b, i, u);
        }
        if (p.east !== "none") {
            D(h, _, m, 1, 0.625, b, i, u);
        }
        if (d && j(l.power) > 0) {
            D(h, g, g, _, _, w, c, d);
        }
    } else if (d) {
        D(h, g, g, _, _, w, c, d);
    }
    if (p.north === "up") {
        E(h, "north", m, 0.625, i, f);
    }
    if (p.south === "up") {
        E(h, "south", m, 0.625, i, f);
    }
    if (p.west === "up") {
        E(h, "west", m, 0.625, i, u);
    }
    if (p.east === "up") {
        E(h, "east", m, 0.625, i, u);
    }
    return new e_1(h);
}
function P(e) {
    if (e === "side" || e === "up") {
        return e;
    }
    return "none";
}
function j(e) {
    return Math.max(0, Math.min(15, Number.parseInt(e ?? "0", 10) || 0));
}
function D(e, t, n, a, r, l, o, i) {
    et(e, t, l, n, a, l, r, "top", o, i);
}
function E(e, t, n, a, r, l) {
    let o = 1 / 64;
    switch(t){
        case "north":
            et(e, n, 1 / 64, o, a, 1, o, "back", r, l);
            break;
        case "south":
            et(e, n, 1 / 64, 1 - o, a, 1, 1 - o, "front", r, l);
            break;
        case "west":
            et(e, o, 1 / 64, n, o, 1, a, "left", r, l);
            break;
        case "east":
            et(e, 1 - o, 1 / 64, n, 1 - o, 1, a, "right", r, l);
    }
}
let U = new Set([
    "skeleton_skull",
    "skeleton_wall_skull",
    "wither_skeleton_skull",
    "wither_skeleton_wall_skull",
    "zombie_head",
    "zombie_wall_head",
    "creeper_head",
    "creeper_wall_head",
    "player_head",
    "player_wall_head",
    "piglin_head",
    "piglin_wall_head",
    "dragon_head",
    "dragon_wall_head"
]);
let X = {
    chest: [
        0.6,
        0.4,
        0.2
    ],
    trapped_chest: [
        0.6,
        0.4,
        0.2
    ],
    ender_chest: [
        0.1,
        0.2,
        0.3
    ],
    shulker_box: [
        0.6,
        0.3,
        0.6
    ],
    bed: [
        0.7,
        0.2,
        0.2
    ],
    banner: [
        0.9,
        0.9,
        0.9
    ],
    head: [
        0.7,
        0.6,
        0.5
    ],
    skull: [
        0.8,
        0.8,
        0.7
    ],
    sign: [
        0.6,
        0.5,
        0.3
    ],
    wall_sign: [
        0.6,
        0.5,
        0.3
    ],
    hanging_sign: [
        0.6,
        0.5,
        0.3
    ],
    bell: [
        0.8,
        0.7,
        0.2
    ],
    conduit: [
        0.5,
        0.7,
        0.8
    ],
    enchanting_table: [
        0.3,
        0.1,
        0.1
    ],
    lectern: [
        0.6,
        0.4,
        0.2
    ],
    brewing_stand: [
        0.4,
        0.4,
        0.4
    ],
    decorated_pot: [
        0.7,
        0.5,
        0.3
    ],
    campfire: [
        0.5,
        0.3,
        0.1
    ],
    soul_campfire: [
        0.2,
        0.4,
        0.5
    ],
    piston_head: [
        0.6,
        0.6,
        0.5
    ],
    moving_piston: [
        0.6,
        0.6,
        0.5
    ],
    end_portal_frame: [
        0.3,
        0.5,
        0.3
    ],
    end_portal: [
        0.05,
        0.05,
        0.1
    ],
    end_gateway: [
        0.05,
        0.05,
        0.1
    ],
    spawner: [
        0.2,
        0.2,
        0.3
    ],
    wall_banner: [
        0.9,
        0.9,
        0.9
    ],
    flower_pot: [
        0.6,
        0.3,
        0.2
    ]
};
let L = {
    chest: [
        1 / 16,
        0,
        1 / 16,
        0.875,
        0.875,
        0.875
    ],
    trapped_chest: [
        1 / 16,
        0,
        1 / 16,
        0.875,
        0.875,
        0.875
    ],
    ender_chest: [
        1 / 16,
        0,
        1 / 16,
        0.875,
        0.875,
        0.875
    ],
    shulker_box: [
        1 / 16,
        0,
        1 / 16,
        0.875,
        0.875,
        0.875
    ],
    bed: [
        0,
        0,
        0,
        1,
        9 / 16,
        1
    ],
    head: [
        0.25,
        0,
        0.25,
        0.5,
        0.5,
        0.5
    ],
    skull: [
        0.25,
        0,
        0.25,
        0.5,
        0.5,
        0.5
    ],
    sign: [
        0,
        0,
        7 / 16,
        1,
        1,
        2 / 16
    ],
    wall_sign: [
        0,
        4.5 / 16,
        0,
        1,
        0.5,
        2 / 16
    ],
    hanging_sign: [
        1 / 16,
        0,
        7 / 16,
        0.875,
        0.625,
        2 / 16
    ],
    bell: [
        5 / 16,
        1 / 16,
        5 / 16,
        6 / 16,
        9 / 16,
        6 / 16
    ],
    conduit: [
        5 / 16,
        5 / 16,
        5 / 16,
        6 / 16,
        6 / 16,
        6 / 16
    ],
    enchanting_table: [
        0,
        0,
        0,
        1,
        0.75,
        1
    ],
    lectern: [
        0,
        0,
        0,
        1,
        0.875,
        1
    ],
    brewing_stand: [
        0.25,
        0,
        0.25,
        0.5,
        0.875,
        0.5
    ],
    flower_pot: [
        5 / 16,
        0,
        5 / 16,
        6 / 16,
        6 / 16,
        6 / 16
    ],
    campfire: [
        0,
        0,
        0,
        1,
        7 / 16,
        1
    ],
    soul_campfire: [
        0,
        0,
        0,
        1,
        7 / 16,
        1
    ],
    decorated_pot: [
        2 / 16,
        0,
        2 / 16,
        0.75,
        0.75,
        0.75
    ],
    end_portal_frame: [
        0,
        0,
        0,
        1,
        13 / 16,
        1
    ],
    end_portal: [
        0,
        0,
        0,
        1,
        0.75,
        1
    ]
};
export function jX(e, t, n) {
    let f = e.replace("minecraft:", "");
    if (/^(waxed_)?(exposed_|weathered_|oxidized_)?copper_golem_statue$/.test(f) && n) {
        let e = f.replace(/^waxed_/, "").replace(/copper_golem_statue$/, "").replace(/_$/, "");
        let l = y6.copperGolemStatueRenderer(gw.create(e ? `copper_golem_${e}` : "copper_golem"))(n, t?.copper_golem_pose ?? "standing");
        let o = t?.facing ?? "north";
        let i = vt();
        Tl(i, i, [
            8,
            8,
            8
        ]);
        Z8(i, i, (o === "west" ? 90 : o === "south" ? 180 : 270 * (o === "east")) * Math.PI / 180);
        Tl(i, i, [
            -8,
            -8,
            -8
        ]);
        l.transform(i);
        return l.transform(CV(vt(), [
            1 / 16,
            1 / 16,
            1 / 16
        ]));
    }
    if (U.has(f.replace("minecraft:", "")) && n) {
        return ((e, t, n)=>{
            let l;
            let c = e.replace("minecraft:", "");
            let s = c.includes("_wall_");
            let f = S[c.replace("_wall_", "_")];
            if (f) {
                let e = [];
                let l = c === "player_head" || c === "player_wall_head";
                if (l ? t[o.LN] : undefined) {
                    A(e, W, q, 64, 64);
                    A(e, Z, q, 64, 64);
                } else {
                    let a = l ? t[o.iy] : undefined;
                    A(e, W, V(n, xl(a) ? `minecraft:entity/player/${a}` : f.texture) ?? [
                        0,
                        0,
                        0,
                        0
                    ], 64, f.texHeight);
                }
                let d = new e_1(e);
                d.transform(((e, t)=>{
                    let n;
                    let r = vt();
                    if (e) {
                        let e = G[t.facing] ? t.facing : "north";
                        let [l, o] = G[e];
                        kN(r, [
                            0.5 - 0.25 * l,
                            0.25,
                            0.5 - 0.25 * o
                        ]);
                        n = B[e];
                    } else {
                        kN(r, [
                            0.5,
                            0,
                            0.5
                        ]);
                        let e = Number.parseInt(t.rotation ?? "0", 10);
                        n = (Number.isFinite(e) ? e : 0) * 22.5;
                    }
                    Z8(r, r, -n * Math.PI / 180);
                    hs(r, r, [
                        -1 / 16,
                        -1 / 16,
                        1 / 16
                    ]);
                    return r;
                })(s, t));
                return d;
            }
            if (c === "dragon_head" || c === "dragon_wall_head") {
                l = y6.dragonHeadRenderer()(n);
            } else if (c === "piglin_head" || c === "piglin_wall_head") {
                l = y6.piglinHeadRenderer()(n);
            } else {
                throw Error(`Unsupported skull block: ${e}`);
            }
            let d = s ? Y(t.facing) : 180 + ee(t.rotation);
            let h = vt();
            Tl(h, h, [
                8,
                8,
                8
            ]);
            Z8(h, h, d * Math.PI / 180);
            Tl(h, h, [
                -8,
                -8,
                -8
            ]);
            if (s) {
                Tl(h, h, [
                    0,
                    4,
                    -4
                ]);
            }
            l.transform(h);
            let g = vt();
            hs(g, g, [
                1 / 16,
                1 / 16,
                1 / 16
            ]);
            l.transform(g);
            return l;
        })(e, t ?? {}, n);
    }
    if (f === "conduit" && n) {
        let e = y6.conduitRenderer(n);
        let t = vt();
        hs(t, t, [
            1 / 16,
            1 / 16,
            1 / 16
        ]);
        e.transform(t);
        return e;
    }
    if (/(^|_)banner$/.test(f) || /(^|_)wall_banner$/.test(f)) {
        return ((e, t, n)=>{
            let i;
            let c;
            let s;
            let f;
            let u;
            let d;
            let h;
            let g;
            let _;
            let m = e.replace("minecraft:", "").includes("wall_banner");
            let b = ((e, t)=>{
                let r = l.rm(t?.[l.Rf]);
                if (r) {
                    return l.tX[r] ?? l.tX.white;
                }
                let o = e.replace("minecraft:", "").match(/^([a-z_]+?)_(wall_)?banner$/);
                if (o) {
                    let e = o[1];
                    return l.tX[e] ?? l.tX.white;
                }
                return l.tX.white;
            })(e, t);
            let w = [
                0.45,
                0.3,
                0.2
            ];
            let p = null;
            if (n) {
                for (let e of [
                    "minecraft:block/white_stained_glass",
                    "minecraft:block/oak_planks"
                ]){
                    try {
                        let t = n.getTextureUV(gw.parse(e));
                        if (t && t.length === 4) {
                            p = [
                                t[0],
                                t[1],
                                t[2],
                                t[3]
                            ];
                            break;
                        }
                    } catch (e) {}
                }
            }
            let v = p;
            let k = (e)=>F(n, "minecraft:entity/banner/base", e) ?? p;
            let y = [];
            if (m) {
                s = 1 / 12;
                f = 11 / 12;
                u = -0.8;
                d = 13 / 15;
                h = 5 / 48;
                g = 7 / 48;
                _ = [
                    1 / 12,
                    47 / 60,
                    1 / 48,
                    11 / 12,
                    13 / 15,
                    5 / 48
                ];
            } else {
                s = 1 / 12;
                f = 11 / 12;
                u = 1 / 6;
                d = 11 / 6;
                h = 13 / 24;
                g = 7 / 12;
                _ = [
                    1 / 12,
                    7 / 4,
                    11 / 24,
                    11 / 12,
                    11 / 6,
                    13 / 24
                ];
            }
            et(y, s, u, g, f, d, g, "front", b, k(N));
            et(y, s, u, h, f, d, h, "back", b, k(I));
            et(y, s, d, h, f, d, g, "top", b, k(O));
            et(y, s, u, h, f, u, g, "bottom", b, k(C));
            et(y, s, u, h, s, d, g, "left", b, k(R));
            et(y, f, u, h, f, d, g, "right", b, k(T));
            let M = l.jL(t[l.X1]);
            for(let e = 0; e < M.length; e++){
                let t = M[e];
                let a = l.tX[t.color] ?? l.tX.white;
                let r = `minecraft:entity/banner/${t.pattern}`;
                let i = F(n, r, N);
                let c = F(n, r, I);
                if (!i && !c) {
                    continue;
                }
                let _ = (e + 1) * 0.0008;
                if (i) {
                    et(y, s, u, g + _, f, d, g + _, "front", a, i);
                }
                if (c) {
                    et(y, s, u, h - _, f, d, h - _, "back", a, c);
                }
            }
            en(y, _[0], _[1], _[2], _[3], _[4], _[5], w, v);
            if (!m) {
                en(y, 11 / 24, 0, 11 / 24, 13 / 24, 7 / 4, 13 / 24, w, v);
            }
            let x = new e_1(y);
            i = m;
            c = t;
            let V = i ? Y(c.facing) : ee(c.rotation);
            if (V !== 0) {
                let e = V * Math.PI / 180;
                let t = vt();
                let n = m ? 0.5 : 1.5;
                Tl(t, t, [
                    0.5,
                    n,
                    0.5
                ]);
                Z8(t, t, e);
                Tl(t, t, [
                    -0.5,
                    -n,
                    -0.5
                ]);
                x.transform(t);
            }
            return x;
        })(e, t ?? {}, n);
    }
    for (let [e, t] of Object.entries(X)){
        if (f.includes(e)) {
            let n = L[e];
            if (n) {
                return Q(t, n[0], n[1], n[2], n[3], n[4], n[5]);
            }
            return Q(t, 0, 0, 0, 1, 1, 1);
        }
    }
    return null;
}
let S = {
    skeleton_skull: {
        texture: "minecraft:entity/skeleton/skeleton",
        texHeight: 32
    },
    wither_skeleton_skull: {
        texture: "minecraft:entity/skeleton/wither_skeleton",
        texHeight: 32
    },
    creeper_head: {
        texture: "minecraft:entity/creeper/creeper",
        texHeight: 32
    },
    zombie_head: {
        texture: "minecraft:entity/zombie/zombie",
        texHeight: 64
    },
    player_head: {
        texture: "minecraft:entity/player/wide/steve",
        texHeight: 64
    }
};
let W = {
    texU: 0,
    texV: 0,
    grow: 0
};
let Z = {
    texU: 32,
    texV: 0,
    grow: 0.25
};
let q = [
    0,
    0,
    1,
    1
];
let G = {
    north: [
        0,
        -1
    ],
    south: [
        0,
        1
    ],
    west: [
        -1,
        0
    ],
    east: [
        1,
        0
    ]
};
let B = {
    north: 0,
    south: 180,
    east: 90,
    west: 270
};
function A(e, t, n, a, l) {
    let t_grow = t.grow;
    let [i, c, s] = [
        -4 - t_grow,
        -8 - t_grow,
        -4 - t_grow
    ];
    let [f, u, d] = [
        4 + t_grow,
        t_grow,
        4 + t_grow
    ];
    let h = [
        i,
        c,
        s
    ];
    let g = [
        f,
        c,
        s
    ];
    let _ = [
        f,
        u,
        s
    ];
    let m = [
        i,
        u,
        s
    ];
    let b = [
        i,
        c,
        d
    ];
    let w = [
        f,
        c,
        d
    ];
    let p = [
        f,
        u,
        d
    ];
    let v = [
        i,
        u,
        d
    ];
    let { texU, texV } = t;
    let M = texU + 8;
    let x = texU + 16;
    let V = texU + 24;
    let N = texV + 8;
    let I = texV + 16;
    let [R, T, O, C] = n;
    let F = (e, t)=>[
            R + e / a * (O - R),
            T + t / l * (C - T)
        ];
    let H = [
        1,
        1,
        1
    ];
    for (let [t, [n, a, l, o]] of [
        [
            [
                w,
                b,
                h,
                g
            ],
            [
                M,
                texV,
                x,
                N
            ]
        ],
        [
            [
                _,
                m,
                v,
                p
            ],
            [
                x,
                N,
                texU + 24,
                texV
            ]
        ],
        [
            [
                h,
                b,
                v,
                m
            ],
            [
                texU,
                N,
                M,
                I
            ]
        ],
        [
            [
                g,
                h,
                m,
                _
            ],
            [
                M,
                N,
                x,
                I
            ]
        ],
        [
            [
                w,
                g,
                _,
                p
            ],
            [
                x,
                N,
                V,
                I
            ]
        ],
        [
            [
                b,
                w,
                p,
                v
            ],
            [
                V,
                N,
                texU + 32,
                I
            ]
        ]
    ]){
        let i = [
            F(l, a),
            F(n, a),
            F(n, o),
            F(l, o)
        ];
        let c = t.map(([n, a, l], t)=>new Li(new Mi(n, a, l), H, i[t], undefined, undefined, undefined));
        e.push(new kO(c[0], c[1], c[2], c[3]));
    }
}
let J = [
    "oak",
    "spruce",
    "birch",
    "jungle",
    "acacia",
    "dark_oak",
    "mangrove",
    "cherry",
    "bamboo",
    "crimson",
    "warped",
    "pale_oak",
    "poplar"
];
export function e7(e, i = {}, c, s) {
    let o;
    if (!c) {
        return null;
    }
    let f = ((e)=>{
        let t = e.replace("minecraft:", "");
        let n = /^([a-z_]+)_hanging_sign$/.exec(t);
        if (n && J.includes(n[1])) {
            return {
                wood: n[1],
                hanging: true
            };
        }
        let a = /^([a-z_]+)_sign$/.exec(t);
        if (a && J.includes(a[1])) {
            return {
                wood: a[1],
                hanging: false
            };
        }
        return null;
    })(e);
    if (!f) {
        return null;
    }
    if (f.wood === "poplar") {
        let e = f.hanging ? i.attached === "true" ? "hanging_sign_attached_rot_0" : "hanging_sign_rot_0" : "sign_rot_0";
        let n = s?.getBlockModel(gw.create(`block/poplar_${e}`));
        if (!n) {
            return null;
        }
        o = n.getMesh(c, {});
        let l = Number.parseInt(i.rotation ?? "0", 10);
        let u = vt();
        Tl(u, u, [
            8,
            8,
            8
        ]);
        Z8(u, u, -(Number.isFinite(l) ? l : 0) * Math.PI / 8);
        Tl(u, u, [
            -8,
            -8,
            -8
        ]);
        o.transform(u);
        return o.transform(CV(vt(), [
            1 / 16,
            1 / 16,
            1 / 16
        ]));
    }
    try {
        if (f.hanging) {
            let e = String(i.attached ?? "false") === "true";
            o = y6.hangingSignRenderer(gw.create(f.wood))(e, c);
        } else {
            o = y6.signRenderer(gw.create(f.wood))(c);
        }
    } catch (e) {
        return null;
    }
    if (!o || o.quads.length === 0) {
        return null;
    }
    let u = Number.parseInt(i.rotation ?? "0", 10);
    let d = 180 - (Number.isFinite(u) ? u : 0) * 22.5;
    let h = vt();
    Tl(h, h, [
        8,
        8,
        8
    ]);
    Z8(h, h, d * Math.PI / 180);
    hs(h, h, [
        2 / 3,
        2 / 3,
        2 / 3
    ]);
    Tl(h, h, [
        -8,
        -8,
        -8
    ]);
    o.transform(h);
    let g = vt();
    hs(g, g, [
        1 / 16,
        1 / 16,
        1 / 16
    ]);
    o.transform(g);
    return o;
}
function Q(e, t, n, a, l, o, i) {
    let c = [];
    let s = t + l;
    let f = n + o;
    let u = a + i;
    for (let l of [
        {
            verts: [
                [
                    t,
                    f,
                    a
                ],
                [
                    t,
                    f,
                    u
                ],
                [
                    s,
                    f,
                    u
                ],
                [
                    s,
                    f,
                    a
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
                    t,
                    n,
                    u
                ],
                [
                    t,
                    n,
                    a
                ],
                [
                    s,
                    n,
                    a
                ],
                [
                    s,
                    n,
                    u
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
                    s,
                    f,
                    a
                ],
                [
                    s,
                    n,
                    a
                ],
                [
                    t,
                    n,
                    a
                ],
                [
                    t,
                    f,
                    a
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
                    t,
                    f,
                    u
                ],
                [
                    t,
                    n,
                    u
                ],
                [
                    s,
                    n,
                    u
                ],
                [
                    s,
                    f,
                    u
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
                    s,
                    f,
                    u
                ],
                [
                    s,
                    n,
                    u
                ],
                [
                    s,
                    n,
                    a
                ],
                [
                    s,
                    f,
                    a
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
                    t,
                    f,
                    a
                ],
                [
                    t,
                    n,
                    a
                ],
                [
                    t,
                    n,
                    u
                ],
                [
                    t,
                    f,
                    u
                ]
            ],
            normal: [
                -1,
                0,
                0
            ]
        }
    ]){
        let t = l.verts.map(([n, a, o])=>{
            let i = new Mi(n, a, o);
            let c = new Mi(l.normal[0], l.normal[1], l.normal[2]);
            return new Li(i, e, undefined, undefined, c, undefined);
        });
        c.push(new kO(t[0], t[1], t[2], t[3]));
    }
    return new e_1(c);
}
function Y(facing) {
    switch(facing ?? "south"){
        case "south":
        default:
            return 0;
        case "east":
            return 90;
        case "north":
            return 180;
        case "west":
            return 270;
    }
}
function ee(rotation) {
    let t = parseInt(rotation ?? "0", 10);
    if (Number.isNaN(t)) {
        return 0;
    }
    return -(22.5 * t);
}
function et(e, t, n, a, l, o, i, c, s, f) {
    let u;
    let d;
    let h;
    let [g, _, m, b] = f ?? [
        0,
        0,
        0,
        0
    ];
    let w = f ? [
        [
            g,
            _
        ],
        [
            g,
            b
        ],
        [
            m,
            b
        ],
        [
            m,
            _
        ]
    ] : [
        undefined,
        undefined,
        undefined,
        undefined
    ];
    switch(c){
        case "front":
            u = [
                [
                    t,
                    o,
                    i
                ],
                [
                    t,
                    n,
                    i
                ],
                [
                    l,
                    n,
                    i
                ],
                [
                    l,
                    o,
                    i
                ]
            ];
            d = [
                0,
                0,
                1
            ];
            h = w;
            break;
        case "back":
            u = [
                [
                    l,
                    o,
                    a
                ],
                [
                    l,
                    n,
                    a
                ],
                [
                    t,
                    n,
                    a
                ],
                [
                    t,
                    o,
                    a
                ]
            ];
            d = [
                0,
                0,
                -1
            ];
            h = f ? [
                [
                    m,
                    _
                ],
                [
                    m,
                    b
                ],
                [
                    g,
                    b
                ],
                [
                    g,
                    _
                ]
            ] : [
                undefined,
                undefined,
                undefined,
                undefined
            ];
            break;
        case "top":
            u = [
                [
                    t,
                    o,
                    a
                ],
                [
                    t,
                    o,
                    i
                ],
                [
                    l,
                    o,
                    i
                ],
                [
                    l,
                    o,
                    a
                ]
            ];
            d = [
                0,
                1,
                0
            ];
            h = w;
            break;
        case "bottom":
            u = [
                [
                    t,
                    n,
                    i
                ],
                [
                    t,
                    n,
                    a
                ],
                [
                    l,
                    n,
                    a
                ],
                [
                    l,
                    n,
                    i
                ]
            ];
            d = [
                0,
                -1,
                0
            ];
            h = w;
            break;
        case "left":
            u = [
                [
                    t,
                    o,
                    a
                ],
                [
                    t,
                    n,
                    a
                ],
                [
                    t,
                    n,
                    i
                ],
                [
                    t,
                    o,
                    i
                ]
            ];
            d = [
                -1,
                0,
                0
            ];
            h = w;
            break;
        case "right":
            u = [
                [
                    l,
                    o,
                    i
                ],
                [
                    l,
                    n,
                    i
                ],
                [
                    l,
                    n,
                    a
                ],
                [
                    l,
                    o,
                    a
                ]
            ];
            d = [
                1,
                0,
                0
            ];
            h = w;
    }
    let p = u.map((e, t)=>{
        let n = new Mi(e[0], e[1], e[2]);
        let a = new Mi(d[0], d[1], d[2]);
        return new Li(n, s, h[t], undefined, a, undefined);
    });
    e.push(new kO(p[0], p[1], p[2], p[3]));
}
function en(e, t, n, a, l, o, i, c, s) {
    let w_1 = Math.abs(l - t);
    let h_1 = Math.abs(o - n);
    let d = Math.abs(i - a);
    for (let h of [
        {
            verts: [
                [
                    t,
                    o,
                    a
                ],
                [
                    t,
                    o,
                    i
                ],
                [
                    l,
                    o,
                    i
                ],
                [
                    l,
                    o,
                    a
                ]
            ],
            normal: [
                0,
                1,
                0
            ],
            w: w_1,
            h: d
        },
        {
            verts: [
                [
                    t,
                    n,
                    i
                ],
                [
                    t,
                    n,
                    a
                ],
                [
                    l,
                    n,
                    a
                ],
                [
                    l,
                    n,
                    i
                ]
            ],
            normal: [
                0,
                -1,
                0
            ],
            w: w_1,
            h: d
        },
        {
            verts: [
                [
                    l,
                    o,
                    a
                ],
                [
                    l,
                    n,
                    a
                ],
                [
                    t,
                    n,
                    a
                ],
                [
                    t,
                    o,
                    a
                ]
            ],
            normal: [
                0,
                0,
                -1
            ],
            w: w_1,
            h: h_1
        },
        {
            verts: [
                [
                    t,
                    o,
                    i
                ],
                [
                    t,
                    n,
                    i
                ],
                [
                    l,
                    n,
                    i
                ],
                [
                    l,
                    o,
                    i
                ]
            ],
            normal: [
                0,
                0,
                1
            ],
            w: w_1,
            h: h_1
        },
        {
            verts: [
                [
                    l,
                    o,
                    i
                ],
                [
                    l,
                    n,
                    i
                ],
                [
                    l,
                    n,
                    a
                ],
                [
                    l,
                    o,
                    a
                ]
            ],
            normal: [
                1,
                0,
                0
            ],
            w: d,
            h: h_1
        },
        {
            verts: [
                [
                    t,
                    o,
                    a
                ],
                [
                    t,
                    n,
                    a
                ],
                [
                    t,
                    n,
                    i
                ],
                [
                    t,
                    o,
                    i
                ]
            ],
            normal: [
                -1,
                0,
                0
            ],
            w: d,
            h: h_1
        }
    ]){
        let t = ((e, t, n)=>{
            if (!e || !(t > 0) || !(n > 0)) {
                return e;
            }
            let [a, r, l, o] = e;
            let i = l - a;
            let c = o - r;
            let s = t / n;
            let f = i;
            let u = c;
            if (s >= 1) {
                u = c / s;
            } else {
                f = i * s;
            }
            let d = (a + l) / 2;
            let h = (r + o) / 2;
            return [
                d - f / 2,
                h - u / 2,
                d + f / 2,
                h + u / 2
            ];
        })(s, h.w, h.h);
        let [n, a, l, o] = t ?? [
            0,
            0,
            0,
            0
        ];
        let i = t ? [
            [
                n,
                a
            ],
            [
                n,
                o
            ],
            [
                l,
                o
            ],
            [
                l,
                a
            ]
        ] : [
            undefined,
            undefined,
            undefined,
            undefined
        ];
        let f = h.verts.map(([n, a, l], t)=>{
            let o = new Mi(n, a, l);
            let s = new Mi(h.normal[0], h.normal[1], h.normal[2]);
            return new Li(o, c, i[t], undefined, s, undefined);
        });
        e.push(new kO(f[0], f[1], f[2], f[3]));
    }
}
export function uO(e, t) {
    if (!t) {
        return e;
    }
    if (Object.keys(e).length > 0) {
        let n = false;
        let a = {
            ...e
        };
        for (let [e, r] of Object.entries(t)){
            if (!(e in a)) {
                a[e] = r;
                n = true;
            }
        }
        if (n) {
            return a;
        }
        return e;
    }
    return {
        ...t
    };
}
