import { n, r } from "./blockStateParser-3kR-Ucao/chunk_e.js";
import { o } from "./blockStateParser-3kR-Ucao/chunk_i.js";
import { c, s } from "./blockStateParser-3kR-Ucao/chunk_s.js";
import { p } from "./blockStateParser-3kR-Ucao/chunk_f.js";
import "./dist-C66QuM2X.js";
function l(e) {
    if (!e) {
        return {};
    }
    let t = {};
    for (let [n, r] of Object.entries(e)){
        t[n] = String(r);
    }
    return t;
}
function u(e, t, n) {
    return `${e}-${t}-${n}`;
}
function d(e) {
    let [x, y, z] = e.split(`-`).map(Number);
    return {
        x,
        y,
        z
    };
}
export function t(e) {
    return {
        x: e.max.x - e.min.x + 1,
        y: e.max.y - e.min.y + 1,
        z: e.max.z - e.min.z + 1
    };
}
function h(e) {
    if (typeof e == `number` && Number.isFinite(e)) {
        return e;
    }
    return null;
}
function g(e) {
    let t = e.Pos ?? e.pos;
    if (Array.isArray(t) && t.length >= 3) {
        let e = h(t[0]);
        let n = h(t[1]);
        let r = h(t[2]);
        if (e !== null && n !== null && r !== null) {
            return [
                e,
                n,
                r
            ];
        }
    }
    let n = h(e.x ?? e.X);
    let r = h(e.y ?? e.Y);
    let i = h(e.z ?? e.Z);
    if (n !== null && r !== null && i !== null) {
        return [
            n,
            r,
            i
        ];
    }
    return null;
}
function _(e, t) {
    let n = new Map;
    for (let r of e ?? []){
        let e = g(r);
        if (!e) {
            continue;
        }
        let [i, a, o] = e;
        n.set(u(i, a, o), r);
        if (t) {
            n.set(u(t.x + i, t.y + a, t.z + o), r);
        }
    }
    return n;
}
export { o as a, l as c, r as d, p as i, u as l, _ as n, d as o, s as r, c as s, n as u };
