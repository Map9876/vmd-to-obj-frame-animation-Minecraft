export let ic = Object.freeze({
    "minecraft:trapdoor": "minecraft:oak_trapdoor",
    "minecraft:chain": "minecraft:iron_chain",
    "minecraft:grass_path": "minecraft:dirt_path",
    "minecraft:grass": "minecraft:short_grass",
    "minecraft:sign": "minecraft:oak_sign",
    "minecraft:wall_sign": "minecraft:oak_wall_sign",
    "minecraft:banner": "minecraft:white_banner",
    "minecraft:wall_banner": "minecraft:white_wall_banner",
    "minecraft:bed": "minecraft:red_bed",
    "minecraft:skull": "minecraft:skeleton_skull",
    "minecraft:wall_skull": "minecraft:skeleton_wall_skull"
});
let a = new Set([
    "minecraft:air",
    "minecraft:cave_air",
    "minecraft:void_air",
    "minecraft:moving_piston"
]);
export function O5(e) {
    return ((e)=>{
        if (typeof e !== "string") {
            return null;
        }
        let r = e.trim().toLowerCase();
        if (!r) {
            return null;
        }
        let a = r.indexOf("[");
        let l = (a >= 0 ? r.slice(0, a) : r).trim();
        if (!/^(?:[a-z0-9_.-]+:)?[a-z0-9_./-]+$/.test(l)) {
            return null;
        }
        let i = l.includes(":") ? l : `minecraft:${l}`;
        let blockId = ic[i] ?? i;
        let properties = {};
        if (a >= 0) {
            if (!r.endsWith("]")) {
                return null;
            }
            let e = r.slice(a + 1, -1).trim();
            if (e) {
                for (let t of e.split(",")){
                    let e = t.indexOf("=");
                    if (e <= 0 || e === t.length - 1) {
                        return null;
                    }
                    let r = t.slice(0, e).trim();
                    let n = t.slice(e + 1).trim();
                    if (!/^[a-z0-9_.-]+$/.test(r) || !/^[a-z0-9_.-]+$/.test(n)) {
                        return null;
                    }
                    properties[r] = n;
                }
            }
        }
        return {
            blockId,
            properties
        };
    })(e)?.blockId ?? null;
}
export function Yg(e, t) {
    let r = O5(e);
    return !!r && !a.has(r) && t.has(r);
}
