import { L } from "./chunk_L.js";
const hasOwnProperty = {}.hasOwnProperty;
export function ct(e) {
    let t = {};
    let n = -1;
    while(++n < e.length){
        lt(t, e[n]);
    }
    return t;
}
function lt(e, t) {
    let n;
    for(n in t){
        let r = (hasOwnProperty.call(e, n) ? e[n] : undefined) || (e[n] = {});
        let i = t[n];
        let a;
        if (i) {
            for(a in i){
                if (!hasOwnProperty.call(r, a)) {
                    r[a] = [];
                }
                let e = i[a];
                ut(r[a], Array.isArray(e) ? e : e ? [
                    e
                ] : []);
            }
        }
    }
}
function ut(e, t) {
    let n = -1;
    let r = [];
    while(++n < t.length){
        (t[n].add === `after` ? e : r).push(t[n]);
    }
    L(e, 0, 0, r);
}
