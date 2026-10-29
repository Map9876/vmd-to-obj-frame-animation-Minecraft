import { K2 } from "./module-59431.js";
let s = "minecraft:air";
let r = [
    "head",
    "chest",
    "legs",
    "feet",
    "mainHand",
    "offHand"
];
export function nI(e) {
    if (e.kind === "leash_knot") {
        return "minecraft:lead";
    }
    if (e.kind === "falling_block") {
        let n = e.fallingBlock?.blockId ?? e.blockId;
        if (n && n !== s) {
            return n;
        }
        return e.entityId;
    }
    let l = e.entityId.replace(/^minecraft:/, "");
    if (e.kind === "boat" && (l === "boat" || l === "chest_boat")) {
        let t = e.boat?.woodType ?? "oak";
        let i = l === "chest_boat";
        if (t === "bamboo") {
            if (i) {
                return "minecraft:bamboo_chest_raft";
            }
            return "minecraft:bamboo_raft";
        }
        return `minecraft:${t}_${i ? "chest_boat" : "boat"}`;
    }
    return e.entityId;
}
export function lP(e) {
    let o = [];
    let a = e.itemFrame?.item?.itemId;
    if (a) {
        o.push(a);
    }
    let h = e.armorStand?.equipment;
    if (h) {
        for (let e of r){
            let t = h[e];
            if (t) {
                o.push(t);
            }
        }
    }
    let e_minecart = e.minecart;
    let c = e_minecart?.displayBlock?.blockId;
    if (e_minecart && c && c !== s && c !== `minecraft:${e_minecart.variant}`) {
        o.push(c);
    }
    return o;
}
let a = {
    "minecraft:block_display": "方块展示实体",
    "minecraft:item_display": "物品展示实体",
    "minecraft:text_display": "文字展示实体",
    "minecraft:falling_block": "下落方块",
    "minecraft:spawner_minecart": "刷怪笼矿车"
};
export function QC(e) {
    return a[e];
}
export function AD(e, t, i) {
    let length = Math.max(0, i);
    let r = Array.from({
        length
    }, ()=>new Map);
    let a = Array.from({
        length
    }, ()=>new Map);
    if (e && e.length > 0 && t.size > 0) {
        let i = K2(e);
        for(let n = 0; n < e.length; n++){
            let s = t.get(i[n]);
            if (s !== undefined && r[s]) {
                for (let t of (c(r[s], nI(e[n])), lP(e[n]))){
                    c(a[s], t);
                }
            }
        }
    }
    return r.map((e, t)=>[
            ...d(r[t], "entity"),
            ...d(a[t], "carried")
        ]);
}
function c(e, t) {
    e.set(t, (e.get(t) ?? 0) + 1);
}
function d(e, role) {
    return Array.from(e.entries()).sort((e, t)=>t[1] - e[1]).map(([itemId, count])=>({
            itemId,
            count,
            role
        }));
}
