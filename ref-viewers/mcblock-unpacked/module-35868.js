import { Kg, L2, gd } from "./module-16649.js";
import { nY } from "./module-85236.js";
export function xv(e, t = 0) {
    if (typeof e !== "string" || t === 0 || e.length <= t) {
        return e;
    }
    return `${e.slice(0, t)}...`;
}
export function gt(e, t) {
    if (!Array.isArray(e)) {
        return "";
    }
    let r = [];
    for (const o of e){
        try {
            if (L2(o)) {
                r.push(nY(o));
            } else {
                r.push(String(o));
            }
        } catch  {
            r.push("[value cannot be serialized]");
        }
    }
    return r.join(t);
}
export function _c(e, t, r = false) {
    return !!Kg(e) && (gd(t) ? t.test(e) : Kg(t) ? r ? e === t : e.includes(t) : typeof t === "function" && t(e));
}
export function Xr(e, t = [], r = false) {
    return t.some((t)=>_c(e, t, r));
}
