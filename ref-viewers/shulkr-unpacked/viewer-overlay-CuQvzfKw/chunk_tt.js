import { V } from "./chunk_pe.js";
import { H } from "./chunk_be.js";
export function tt(e, t) {
    let { dims, origin } = e.instructions;
    let i = (e)=>({
            x: e.x + origin.x,
            y: e.y + origin.y,
            z: e.z + origin.z
        });
    if (t.kind === `restock`) {
        return null;
    }
    if (!H(t)) {
        return {
            min: i(t.min),
            max: i(t.max)
        };
    }
    if (t.cells.length === 0) {
        return null;
    }
    let a = Infinity;
    let o = Infinity;
    let s = Infinity;
    let c = -Infinity;
    let l = -Infinity;
    let u = -Infinity;
    for (let e of t.cells){
        let { x, y, z } = V(dims, e);
        if (x < a) {
            a = x;
        }
        if (y < o) {
            o = y;
        }
        if (z < s) {
            s = z;
        }
        if (x > c) {
            c = x;
        }
        if (y > l) {
            l = y;
        }
        if (z > u) {
            u = z;
        }
    }
    return {
        min: i({
            x: a,
            y: o,
            z: s
        }),
        max: i({
            x: c,
            y: l,
            z: u
        })
    };
}
export function nt(e, t) {
    let { dims, origin } = e.instructions;
    let i = V(dims, t);
    return {
        x: i.x + origin.x,
        y: i.y + origin.y,
        z: i.z + origin.z
    };
}
