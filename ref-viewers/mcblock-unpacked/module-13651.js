import { my } from "./module-73314.js";
import { O } from "./module-49636.js";
let o = "_sentryScope";
let i = "_sentryIsolationScope";
export function d(e, t, r) {
    if (e) {
        my(e, i, ((e)=>{
            try {
                let t = O.WeakRef;
                if (typeof t === "function") {
                    return new t(e);
                }
            } catch  {}
            return e;
        })(r));
        my(e, o, t);
    }
}
export function L(e) {
    return {
        scope: e[o],
        isolationScope: ((e)=>{
            if (e) {
                if (typeof e === "object" && "deref" in e && typeof e.deref === "function") {
                    try {
                        return e.deref();
                    } catch  {
                        return;
                    }
                }
                return e;
            }
        })(e[i])
    };
}
