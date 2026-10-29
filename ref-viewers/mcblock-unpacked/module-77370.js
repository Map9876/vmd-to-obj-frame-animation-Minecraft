import { wellKnownProperties } from "./module-23982.js";
let a = new WeakMap;
export function createRenderParamsFromClient(e) {
    let t = a.get(e);
    if (t) {
        return t;
    }
    let r = Promise.resolve(e);
    a.set(e, r);
    Object.keys(e).forEach((t)=>{
        if (!wellKnownProperties.has(t)) {
            r[t] = e[t];
        }
    });
    return r;
}
