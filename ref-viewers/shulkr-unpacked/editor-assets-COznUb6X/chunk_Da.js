import { _a, ca, ga } from "./chunk_ca.js";
import { pa } from "./chunk_la.js";
import { Va } from "./chunk_va.js";
export function Da(e) {
    return {
        ...pa(ga(e)),
        model: `create:block/shaft_half`
    };
}
export function ka(model, t) {
    return {
        ...pa(t === `x` ? (e)=>ca(e, `z`, 90) : t === `z` ? (e)=>ca(e, `x`, 90) : (e)=>e),
        model
    };
}
export function ja(e) {
    let t = e.facing ?? `north`;
    return [
        _a(`simulated:block/directional_gearshift/barrel`, t),
        {
            ...pa(ga(t)),
            model: `simulated:block/directional_gearshift/barrel_shaft`
        },
        {
            ...pa(ga(Va[t])),
            model: `simulated:block/directional_gearshift/barrel_shaft`
        }
    ];
}
