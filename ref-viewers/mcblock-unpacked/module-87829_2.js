import { K2 } from "./module-59431.js";
let a = "minecraft:air";
let l = [
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
        if (n && n !== a) {
            return n;
        }
        return e.entityId;
    }
    let i = e.entityId.replace(/^minecraft:/, "");
    if (e.kind === "boat" && (i === "boat" || i === "chest_boat")) {
        let t = e.boat?.woodType ?? "oak";
        let r = i === "chest_boat";
        if (t === "bamboo") {
            if (r) {
                return "minecraft:bamboo_chest_raft";
            }
            return "minecraft:bamboo_raft";
        }
        return `minecraft:${t}_${r ? "chest_boat" : "boat"}`;
    }
    return e.entityId;
}
export function lP(e) {
    let o = [];
    let c = e.itemFrame?.item?.itemId;
    if (c) {
        o.push(c);
    }
    let s = e.armorStand?.equipment;
    if (s) {
        for (let e of l){
            let t = s[e];
            if (t) {
                o.push(t);
            }
        }
    }
    let e_minecart = e.minecart;
    let u = e_minecart?.displayBlock?.blockId;
    if (e_minecart && u && u !== a && u !== `minecraft:${e_minecart.variant}`) {
        o.push(u);
    }
    return o;
}
let c = {
    "minecraft:block_display": "方块展示实体",
    "minecraft:item_display": "物品展示实体",
    "minecraft:text_display": "文字展示实体",
    "minecraft:falling_block": "下落方块",
    "minecraft:spawner_minecart": "刷怪笼矿车"
};
export function QC(e) {
    return c[e];
}
export function AD(e, t, r) {
    let length = Math.max(0, r);
    let l = Array.from({
        length
    }, ()=>new Map);
    let c = Array.from({
        length
    }, ()=>new Map);
    if (e && e.length > 0 && t.size > 0) {
        let r = K2(e);
        for(let n = 0; n < e.length; n++){
            let a = t.get(r[n]);
            if (a !== undefined && l[a]) {
                for (let t of (u(l[a], nI(e[n])), lP(e[n]))){
                    u(c[a], t);
                }
            }
        }
    }
    return l.map((e, t)=>[
            ...m(l[t], "entity"),
            ...m(c[t], "carried")
        ]);
}
function u(e, t) {
    e.set(t, (e.get(t) ?? 0) + 1);
}
function m(e, role) {
    return Array.from(e.entries()).sort((e, t)=>t[1] - e[1]).map(([itemId, count])=>({
            itemId,
            count,
            role
        }));
}
