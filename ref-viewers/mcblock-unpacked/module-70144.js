import { TD } from "./module-82084.js";
import * as i from "./module-5166.js";
import { oT } from "./module-74002.js";
import { Qv, l5 } from "./module-67721.js";
import { EG, pm } from "./module-17975.js";
import { Zi } from "./module-39372.js";
import { ew } from "./module-69605.js";
const a = require(55822);
const s = require(49745);
export async function e(e, t) {
    let n;
    let m;
    let h = new Uint8Array(e);
    let root = TD.read(h).root;
    let dataVersion = root.has("MinecraftDataVersion") ? root.getNumber("MinecraftDataVersion") : undefined;
    let litematicVersion = root.has("Version") ? root.getNumber("Version") : undefined;
    let litematicSubVersion = root.has("SubVersion") ? root.getNumber("SubVersion") : undefined;
    let z = root.getCompound("Metadata");
    let name = ew(z.has("Name") ? z.getString("Name") : undefined, t);
    let author = z.has("Author") ? z.getString("Author") : undefined;
    let k = root.getCompound("Regions");
    let M = Array.from(k.keys());
    if (M.length === 0) {
        throw Error("Litematic 文件中没有找到任何区域");
    }
    let blocks = [];
    let C = [];
    let B = Infinity;
    let S = Infinity;
    let x = Infinity;
    let A = -Infinity;
    let N = -Infinity;
    let E = -Infinity;
    for (let [e, t] of M.entries()){
        let n = k.getCompound(t);
        let r = n.getCompound("Size");
        let c = r.getNumber("x");
        let m = r.getNumber("y");
        let h = r.getNumber("z");
        let d = Math.abs(c);
        let b = Math.abs(m);
        let y = Math.abs(h);
        let z = n.getCompound("Position");
        let v = z.getNumber("x");
        let w = z.getNumber("y");
        let M = z.getNumber("z");
        let I = c < 0 ? v + c + 1 : v;
        let D = m < 0 ? w + m + 1 : w;
        let P = h < 0 ? M + h + 1 : M;
        let T = ((e, t)=>{
            let n = new Map;
            for (let r of [
                "TileEntities",
                "BlockEntities",
                "tile_entities",
                "block_entities"
            ]){
                let i;
                if (e.has(r)) {
                    try {
                        i = e.getList(r, 10);
                    } catch (e) {
                        continue;
                    }
                    for(let e = 0; e < i.length; e++){
                        let r = i.getCompound(e);
                        let o = a.Ak(r);
                        let l = a.MV(r);
                        if (!o || !l) {
                            continue;
                        }
                        let [s, u, f] = l;
                        n.set(g(s, u, f), o);
                        n.set(g(s + t[0], u + t[1], f + t[2]), o);
                    }
                }
            }
            return n;
        })(n, [
            I,
            D,
            P
        ]);
        let V = oT([
            n
        ], [
            d,
            b,
            y
        ], dataVersion);
        let L = l5([
            n
        ], [
            d,
            b,
            y
        ], dataVersion);
        let U = s.jB([
            n
        ], [
            d,
            b,
            y
        ]);
        C.push(...pm([
            n
        ]).map(({ entity, listIndex })=>({
                entity: listIndex === null ? entity : {
                    ...entity,
                    docKey: Zi(e, listIndex)
                },
                regionPos: [
                    v,
                    w,
                    M
                ]
            })));
        let j = n.getList("BlockStatePalette", 10);
        let K = [];
        for(let e = 0; e < j.length; e++){
            let t = j.getCompound(e);
            let blockId = i.C(t.getString("Name"));
            let r = {};
            if (t.has("Properties")) {
                t.getCompound("Properties").forEach((e, t)=>{
                    r[e] = t.getAsString();
                });
            }
            K.push({
                blockId,
                properties: i.G(r)
            });
        }
        let O = n.getLongArray("BlockStates").getItems();
        let q = d * b * y;
        let G = ((e, t, n)=>{
            let r = new Uint32Array(n);
            let i = (1n << BigInt(t)) - 1n;
            for(let a = 0; a < n; a++){
                let n = a * t;
                let o = Math.floor(n / 64);
                let l = n % 64;
                if (o >= e.length) {
                    break;
                }
                let s = BigInt.asUintN(64, e[o].toBigInt()) >> BigInt(l) & i;
                if (l + t > 64 && o + 1 < e.length) {
                    let n = 64 - l;
                    s |= (BigInt.asUintN(64, e[o + 1].toBigInt()) & (1n << BigInt(t - n)) - 1n) << BigInt(n);
                }
                r[a] = Number(s);
            }
            return r;
        })(O, Math.max(2, Math.ceil(Math.log2(K.length))), q);
        for(let e = 0; e < q; e++){
            let t = G[e];
            if (t >= K.length) {
                continue;
            }
            let { blockId, properties } = K[t];
            if (blockId === "minecraft:air" || blockId === "minecraft:cave_air" || blockId === "minecraft:void_air" || blockId === "minecraft:light" || blockId === "minecraft:barrier" || blockId === "minecraft:structure_void") {
                continue;
            }
            let i = Math.floor(e / (y * d));
            let o = Math.floor(e % (y * d) / d);
            let u = e % d + I;
            let f = i + D;
            let c = o + P;
            let banner = a.HP(blockId) ? T.get(g(u, f, c)) : undefined;
            let tileText = V.size > 0 ? V.get(e) : undefined;
            let skull = U.size > 0 && s.CZ(blockId) ? U.get(e) : undefined;
            let sign = L.size > 0 && Qv(blockId) ? L.get(e) : undefined;
            blocks.push({
                blockId,
                properties,
                position: [
                    u,
                    f,
                    c
                ],
                ...banner ? {
                    renderData: {
                        banner
                    }
                } : skull ? {
                    renderData: {
                        skull
                    }
                } : sign ? {
                    renderData: {
                        sign
                    }
                } : {},
                ...tileText ? {
                    tileText
                } : {}
            });
            B = Math.min(B, u);
            S = Math.min(S, f);
            x = Math.min(x, c);
            A = Math.max(A, u);
            N = Math.max(N, f);
            E = Math.max(E, c);
        }
    }
    if (blocks.length > 0) {
        for (let e of blocks){
            e.position[0] -= B;
            e.position[1] -= S;
            e.position[2] -= x;
        }
    }
    n = C;
    m = blocks.length > 0 ? {
        min: [
            B,
            S,
            x
        ],
        max: [
            A,
            N,
            E
        ]
    } : null;
    let entities = n.length === 0 ? [] : n.map(({ entity, regionPos })=>{
        let entity_position = entity.position;
        let i = [
            entity_position[0] + regionPos[0],
            entity_position[1] + regionPos[1],
            entity_position[2] + regionPos[2]
        ];
        if (m) {
            return EG(entity, [
                i[0] - m.min[0],
                i[1] - m.min[1],
                i[2] - m.min[2]
            ]);
        }
        return EG(entity, i);
    });
    let D = blocks.length > 0 ? A - B + 1 : 0;
    let P = blocks.length > 0 ? N - S + 1 : 0;
    let T = blocks.length > 0 ? E - x + 1 : 0;
    let V = new Set(blocks.map((e)=>e.blockId));
    return {
        name,
        author,
        size: [
            D,
            P,
            T
        ],
        blocks,
        ...entities.length > 0 ? {
            entities
        } : {},
        blockTypeCount: V.size,
        totalBlockCount: blocks.length,
        format: "litematic",
        sourceMeta: {
            ...dataVersion !== undefined ? {
                dataVersion
            } : {},
            ...litematicVersion !== undefined ? {
                litematicVersion
            } : {},
            ...litematicSubVersion !== undefined ? {
                litematicSubVersion
            } : {}
        },
        originOffset: blocks.length > 0 ? [
            B,
            S,
            x
        ] : [
            0,
            0,
            0
        ]
    };
}
function g(e, t, n) {
    return `${e},${t},${n}`;
}
