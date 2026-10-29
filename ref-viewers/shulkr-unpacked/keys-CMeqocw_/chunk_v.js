import { w } from "./chunk_w.js";
export function v(e) {
    return JSON.stringify(e, (e, t)=>{
        if (w(t)) {
            return Object.keys(t).sort().reduce((acc, key)=>{
                acc[key] = t[key];
                return acc;
            }, {});
        }
        return t;
    });
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function x(e, t, n = 0) {
    if (e === t) {
        return e;
    }
    if (n > 500) {
        return t;
    }
    let r = C(e) && C(t);
    if (!r && !(w(e) && w(t))) {
        return t;
    }
    let length = (r ? e : Object.keys(e)).length;
    let a = r ? t : Object.keys(t);
    let a_length = a.length;
    let s = r ? Array(a_length) : {};
    let c = 0;
    for(let l = 0; l < a_length; l++){
        let o = r ? l : a[l];
        let u = e[o];
        let d = t[o];
        if (u === d) {
            s[o] = u;
            if (r ? l < length : hasOwnProperty.call(e, o)) {
                c++;
            }
            continue;
        }
        if (u === null || d === null || typeof u != `object` || typeof d != `object`) {
            s[o] = d;
            continue;
        }
        let f = x(u, d, n + 1);
        s[o] = f;
        if (f === u) {
            c++;
        }
    }
    if (length === a_length && c === length) {
        return e;
    }
    return s;
}
function C(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length;
}
