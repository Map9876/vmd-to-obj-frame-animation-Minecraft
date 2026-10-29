import { l } from "../dist-C5TDMOul.js";
import { Vt } from "./chunk_Vt.js";
export class Yt {
    constructor(e){
        this.source = e;
        this.cache = new Map;
    }
    boxesFor(e) {
        let t = this.cache.get(e.stateKey);
        if (t !== undefined) {
            return t;
        }
        let n = Vt(e, this.source.resolveModel(e), this.source.blockTypeOf(e.id));
        this.cache.set(e.stateKey, n);
        return n;
    }
    clear() {
        this.cache.clear();
    }
    get size() {
        return this.cache.size;
    }
}
const Xt = new Set([
    `minecraft:ladder`,
    `minecraft:vine`,
    `minecraft:twisting_vines`,
    `minecraft:twisting_vines_plant`,
    `minecraft:weeping_vines`,
    `minecraft:weeping_vines_plant`,
    `minecraft:cave_vines`,
    `minecraft:cave_vines_plant`
]);
const Zt = new Set([
    `minecraft:trapdoor`,
    `minecraft:weathering_copper_trapdoor`
]);
export function Qt(e, t) {
    if (e === null || e.blockType === undefined) {
        return false;
    }
    if (Xt.has(e.blockType)) {
        return true;
    }
    if (!Zt.has(e.blockType) || e.properties.open !== `true`) {
        return false;
    }
    let n = t();
    return n?.blockType === `minecraft:ladder` && n.properties.facing === e.properties.facing;
}
