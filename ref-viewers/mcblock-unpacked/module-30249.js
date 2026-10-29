import { T } from "./module-61571.js";
import { Yz } from "./module-43275.js";
import { Kg } from "./module-16649.js";
export let sv = "sentry-";
export function yD(e) {
    let t = D0(e);
    if (!t) {
        return;
    }
    let r = Object.entries(t).reduce((acc, [t, r])=>{
        if (t.startsWith(sv)) {
            acc[t.slice(sv.length)] = r;
        }
        return acc;
    }, {});
    if (Object.keys(r).length > 0) {
        return r;
    }
}
export function De(e) {
    if (e) {
        const t = Object.entries(e).reduce((acc, [t, r])=>{
            if (r) {
                acc[`${sv}${t}`] = r;
            }
            return acc;
        }, {});
        if (Object.keys(t).length !== 0) {
            return Object.entries(t).reduce((acc, [t, r], index)=>{
                let i = `${encodeURIComponent(t)}=${encodeURIComponent(r)}`;
                let s = index === 0 ? i : `${acc},${i}`;
                if (s.length > 8192) {
                    if (T) {
                        Yz.warn(`Not adding key: ${t} with val: ${r} to baggage header due to exceeding baggage size limits.`);
                    }
                    return acc;
                }
                return s;
            }, "");
        }
        return undefined;
    }
}
export function D0(e) {
    if (e && (Kg(e) || Array.isArray(e))) {
        if (Array.isArray(e)) {
            return e.reduce((acc, item)=>{
                Object.entries(c(item)).forEach(([t, r])=>{
                    acc[t] = r;
                });
                return acc;
            }, {});
        }
        return c(e);
    }
}
function c(e) {
    return e.split(",").map((e)=>{
        let t = e.indexOf("=");
        if (t === -1) {
            return [];
        }
        return [
            e.slice(0, t),
            e.slice(t + 1)
        ].map((e)=>{
            try {
                return decodeURIComponent(e.trim());
            } catch  {
                return;
            }
        });
    }).reduce((acc, [t, r])=>{
        if (t && r) {
            acc[t] = r;
        }
        return acc;
    }, {});
}
