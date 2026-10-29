function a(e, t) {
    let r = (e)=>e.replace("minecraft:", "");
    let a = r(e);
    let n = r(t);
    if (a.endsWith("_door") && n.endsWith("_door") || a.endsWith("_bed") && n.endsWith("_bed") || a.endsWith("_stairs") && n.endsWith("_stairs") || a.endsWith("_slab") && n.endsWith("_slab") || a.endsWith("_fence") && n.endsWith("_fence") || a.endsWith("_fence_gate") && n.endsWith("_fence_gate") || a.endsWith("_trapdoor") && n.endsWith("_trapdoor") || a.endsWith("_wall") && n.endsWith("_wall") || a.endsWith("_button") && n.endsWith("_button") || a.endsWith("_pressure_plate") && n.endsWith("_pressure_plate") || (a.endsWith("_log") || a.endsWith("_wood")) && (n.endsWith("_log") || n.endsWith("_wood")) || a.endsWith("_planks") && n.endsWith("_planks") || a.endsWith("_leaves") && n.endsWith("_leaves") || a.endsWith("_sign") && n.endsWith("_sign") || a.endsWith("_shulker_box") && n.endsWith("_shulker_box") || a.endsWith("_glazed_terracotta") && n.endsWith("_glazed_terracotta")) {
        return true;
    }
    let s = new Set([
        "chest",
        "trapped_chest"
    ]);
    return s.has(a) && s.has(n);
}
export function Xj(e, t) {
    if (e === t) {
        return true;
    }
    let r = (e)=>{
        if (!e.startsWith("minecraft:")) {
            return e;
        }
        let t = e.slice(10);
        if (t.endsWith("_banner")) {
            return "banner";
        }
        if (t.endsWith("_hanging_sign")) {
            return "hanging_sign";
        }
        if (t.endsWith("_sign")) {
            return "sign";
        }
        if (t === "shulker_box" || t.endsWith("_shulker_box")) {
            return "shulker_box";
        }
        if (t.endsWith("_head") || t.endsWith("_skull")) {
            return "skull";
        }
        if (t.endsWith("_bed")) {
            return "bed";
        }
        if (t === "chest" || t === "trapped_chest") {
            return "chest";
        }
        return e;
    };
    return r(e) === r(t);
}
export function ym(e, t) {
    let r = new Set(t.positions.map(i));
    let n = a(t.fromBlockId, t.toBlockId);
    for (let a of e){
        if (r.has(i(a.position)) && a.blockId === t.fromBlockId) {
            a.blockId = t.toBlockId;
            if (!n) {
                a.properties = {};
            }
        }
    }
}
export function CQ(e, t) {
    let r = new Set(t.positions.map(i));
    let n = a(t.toBlockId, t.fromBlockId);
    for (let a of e){
        if (r.has(i(a.position)) && a.blockId === t.toBlockId) {
            a.blockId = t.fromBlockId;
            if (!n) {
                a.properties = {};
            }
        }
    }
}
function i(e) {
    return `${e[0]},${e[1]},${e[2]}`;
}
