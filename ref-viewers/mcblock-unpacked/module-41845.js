import { TD } from "./module-82084.js";
import { C, G } from "./module-5166.js";
import { oT } from "./module-74002.js";
import { Qv, l5 } from "./module-67721.js";
import { EG, pm } from "./module-17975.js";
import { Zi } from "./module-39372.js";
import { ew } from "./module-69605.js";
const a = require(55822);
const s = require(49745);
let m = new Set([
    "minecraft:air",
    "minecraft:cave_air",
    "minecraft:void_air",
    "minecraft:light",
    "minecraft:barrier",
    "minecraft:structure_void"
]);
async function g(e, t) {
    let n;
    let g;
    let b;
    let author;
    let z;
    let v;
    let w = new Uint8Array(e);
    let root = TD.read(w).root;
    let M = root.has("Schematic");
    if (M) {
        root = root.getCompound("Schematic");
    }
    let _ = root.has("Version") ? root.getNumber("Version") : M ? 3 : 2;
    if (_ < 1 || _ > 3) {
        throw Error(`不支持的 Sponge Schematic 版本: ${_}（支持 v2/v3）`);
    }
    let dataVersion = root.has("DataVersion") ? root.getNumber("DataVersion") : undefined;
    let B = root.getNumber("Width");
    let S = root.getNumber("Height");
    let x = root.getNumber("Length");
    if (B <= 0 || S <= 0 || x <= 0) {
        throw Error(`无效的尺寸: ${B}×${S}×${x}`);
    }
    let A = ew(t, "mcblock-work");
    if (root.has("Metadata")) {
        try {
            let e = root.getCompound("Metadata");
            if (e.has("Name")) {
                A = ew(e.getString("Name"), A);
            }
            if (e.has("Author")) {
                author = e.getString("Author");
            }
        } catch (e) {}
    }
    let originOffset = [
        0,
        0,
        0
    ];
    if (root.has("Offset")) {
        try {
            let e = root.getIntArray("Offset").getItems();
            if (e.length >= 3) {
                originOffset = [
                    e[0].getAsNumber(),
                    e[1].getAsNumber(),
                    e[2].getAsNumber()
                ];
            }
        } catch (e) {}
    }
    if (root.has("Blocks")) {
        let e = root.getCompound("Blocks");
        z = e.getCompound("Palette");
        v = e.getByteArray("Data").getItems();
    } else if (root.has("Palette") && (root.has("BlockData") || root.has("Data"))) {
        z = root.getCompound("Palette");
        let e = root.has("BlockData") ? "BlockData" : "Data";
        v = root.getByteArray(e).getItems();
    } else {
        throw Error("无法识别的 .schem 文件结构：找不到 Palette 或 BlockData");
    }
    let E = new Map;
    z.forEach((e, t)=>{
        let n = t.getAsNumber();
        let { blockId, properties } = ((e)=>{
            let t = e.indexOf("[");
            if (t === -1) {
                return {
                    blockId: C(e),
                    properties: {}
                };
            }
            let n = e.substring(0, t);
            let r = e.substring(t + 1, e.length - 1);
            let a = {};
            if (r) {
                for (let e of r.split(",")){
                    let [t, n] = e.split("=");
                    if (t && n) {
                        a[t.trim()] = n.trim();
                    }
                }
            }
            return {
                blockId: C(n),
                properties: G(a)
            };
        })(e);
        E.set(n, {
            blockId,
            properties
        });
    });
    if (E.size === 0) {
        throw Error(".schem 文件的调色板为空");
    }
    let I = ((e, t)=>{
        let n = new Uint32Array(t);
        let r = 0;
        let i = 0;
        while(i < e.length && r < t){
            let t;
            let a = 0;
            let o = 0;
            do {
                a |= (127 & (t = 255 & e[i].getAsNumber())) << o;
                o += 7;
                i++;
            }while ((128 & t) != 0 && i < e.length)
            n[r++] = a;
        }
        return n;
    })(v, B * S * x);
    let D = ((root_1)=>{
        let t = [
            root_1
        ];
        if (root_1.has("Blocks")) {
            try {
                t.push(root_1.getCompound("Blocks"));
            } catch (e) {}
        }
        return t;
    })(root);
    let P = ((root_1)=>{
        let t = [];
        if (d(root_1)) {
            t.push(root_1);
        }
        if (root_1.has("Blocks")) {
            try {
                let n = root_1.getCompound("Blocks");
                if (d(n)) {
                    t.push(n);
                }
            } catch (e) {}
        }
        return t;
    })(root);
    let T = ((e)=>{
        let t = new Map;
        let n = new Set;
        for (let r of e){
            if (!n.has(r)) {
                for (let e of (n.add(r), [
                    "BlockEntities",
                    "TileEntities",
                    "block_entities",
                    "tile_entities"
                ])){
                    let n;
                    if (r.has(e)) {
                        try {
                            n = r.getList(e, 10);
                        } catch (e) {
                            continue;
                        }
                        for(let e = 0; e < n.length; e++){
                            let r = n.getCompound(e);
                            let i = a.Ak(r);
                            let o = a.MV(r);
                            if (i && o) {
                                t.set(p(o[0], o[1], o[2]), i);
                            }
                        }
                    }
                }
            }
        }
        return t;
    })(D);
    let V = oT(D, [
        B,
        S,
        x
    ], dataVersion);
    let L = l5(D, [
        B,
        S,
        x
    ], dataVersion);
    let U = s.jB(D, [
        B,
        S,
        x
    ]);
    n = pm(P).map(({ entity, container, listIndex })=>{
        if (container === root && listIndex !== null) {
            return {
                ...entity,
                docKey: Zi(0, listIndex)
            };
        }
        return entity;
    });
    g = [
        B,
        S,
        x
    ];
    b = originOffset;
    let entities = n.length === 0 || b[0] === 0 && b[1] === 0 && b[2] === 0 ? n : n.map((e)=>{
        if (h(e.position, g)) {
            return e;
        }
        let t = [
            e.position[0] - b[0],
            e.position[1] - b[1],
            e.position[2] - b[2]
        ];
        if (h(t, g)) {
            return EG(e, t);
        }
        return e;
    });
    let blocks = [];
    let O = x * B;
    for(let e = 0; e < I.length; e++){
        let t = I[e];
        let n = E.get(t);
        if (!n || m.has(n.blockId)) {
            continue;
        }
        let r = Math.floor(e / O);
        let o = Math.floor(e % O / B);
        let u = e % B;
        let blockId = C(n.blockId);
        let banner = a.HP(blockId) ? T.get(p(u, r, o)) : undefined;
        let tileText = V.size > 0 ? V.get(e) : undefined;
        let skull = U.size > 0 && s.CZ(blockId) ? U.get(e) : undefined;
        let sign = L.size > 0 && Qv(blockId) ? L.get(e) : undefined;
        blocks.push({
            blockId,
            properties: G(n.properties),
            position: [
                u,
                r,
                o
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
    }
    let q = new Set(blocks.map((e)=>e.blockId));
    return {
        name: A,
        author,
        size: [
            B,
            S,
            x
        ],
        blocks,
        ...entities.length > 0 ? {
            entities
        } : {},
        blockTypeCount: q.size,
        totalBlockCount: blocks.length,
        format: "schem",
        ...dataVersion !== undefined ? {
            sourceMeta: {
                dataVersion
            }
        } : {},
        originOffset
    };
}
export { g };
function h(e, t) {
    return e[0] >= -2 && e[0] <= t[0] + 2 && e[1] >= -2 && e[1] <= t[1] + 2 && e[2] >= -2 && e[2] <= t[2] + 2;
}
function d(e) {
    return e.has("Entities") || e.has("entities");
}
function p(e, t, n) {
    return `${e},${t},${n}`;
}
