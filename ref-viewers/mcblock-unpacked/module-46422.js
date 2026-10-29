import { K2, KO } from "./module-59431.js";
export function gG(e, t, n) {
    let a = new Map;
    if (!e || e.length === 0 || !t || t.length === 0 || n <= 0 || !t.some((e)=>Array.isArray(e.entities))) {
        return a;
    }
    let l = new Map;
    for(let e = 0; e < t.length; e++){
        for (let n of t[e].entities ?? []){
            l.set(n, e);
        }
    }
    let o = K2(e);
    for(let t = 0; t < e.length; t++){
        if (KO(e[t])) {
            a.set(o[t], l.get(o[t]) ?? n - 1);
        }
    }
    return a;
}
export function _0(e, t, n) {
    let i = new Map;
    let a = gG(e, t, n);
    if (!e || a.size === 0) {
        return i;
    }
    let l = K2(e);
    for(let t = 0; t < e.length; t++){
        let n = a.get(l[t]);
        if (n !== undefined) {
            i.set(e[t], n);
        }
    }
    return i;
}
export function IO(e, t, n, r) {
    if (n === "step" && t !== undefined) {
        return t > r;
    }
    return (n === "layer" || n === "step") && r >= 0 && Math.floor(e) > r;
}
export function H7(e) {
    if (Array.isArray(e)) {
        return {
            entities: e.filter((e)=>typeof e === "string")
        };
    }
    return {};
}
