import { c } from "../blockStateParser-3kR-Ucao.js";
import { _ } from "./chunk_go.js";
export function ea(e) {
    return _({
        id: e.id,
        name: e.name,
        namespace: e.namespace,
        properties: c(e.properties),
        stateKey: e.stateKey
    });
}
const ra = {
    north: `east`,
    east: `south`,
    south: `west`,
    west: `north`
};
export function ia(e) {
    let t = {};
    for (let [n, r] of Object.entries(e)){
        if (n === `facing`) {
            t.facing = ra[r] ?? r;
        } else if (n === `axis`) {
            t.axis = r === `x` ? `z` : r === `z` ? `x` : r;
        } else if (n === `rotation`) {
            let e = Number(r);
            t.rotation = Number.isFinite(e) ? String((((e | 0) + 4) % 16 + 16) % 16) : r;
        } else {
            if (n === `north` || n === `south` || n === `east` || n === `west`) {
                t[ra[n]] = r;
            } else {
                t[n] = r;
            }
        }
    }
    return t;
}
