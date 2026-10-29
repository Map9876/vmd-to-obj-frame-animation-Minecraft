import { ae } from "./module-37578.js";
let a = {
    "minecraft:fire": 12,
    "minecraft:soul_fire": 12,
    "minecraft:lava": 8,
    "minecraft:flowing_lava": 8,
    "minecraft:nether_portal": 10
};
export function p(e) {
    let o = ((e)=>{
        let t = String(e || "").trim().toLowerCase().replace(/\[.*\]$/, "");
        if (t) {
            if (t.includes(":")) {
                return t;
            }
            return `minecraft:${t}`;
        }
        return "minecraft:air";
    })(e);
    let s = ae(o);
    let regions = s?.regions?.filter((e)=>e.frameCount > 1 && e.vOffsetPerFrame > 0).map((e)=>({
            u0: e.u0,
            v0: e.v0,
            u1: e.u1,
            v1: e.v1,
            frameCount: e.frameCount,
            vOffsetPerFrame: e.vOffsetPerFrame,
            uOffsetPerFrame: e.uOffsetPerFrame,
            frameColumns: e.frameColumns,
            frames: e.frames,
            interpolate: e.interpolate
        })) ?? [];
    if (regions.length === 0) {
        return null;
    }
    return {
        fps: a[o] ?? 10,
        regions
    };
}
