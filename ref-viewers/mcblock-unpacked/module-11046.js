import { y_p } from "./module-85339.js";
let s = new WeakMap;
function i(e) {
    let t = s.get(e);
    if (!t) {
        t = {
            owners: 0,
            desiredToneMapping: e.toneMapping,
            desiredExposure: e.toneMappingExposure
        };
        s.set(e, t);
    }
    return t;
}
export function R(e, t, n) {
    let s = i(e);
    s.desiredToneMapping = t;
    s.desiredExposure = n;
    e.toneMappingExposure = n;
    e.toneMapping = s.owners > 0 ? y_p : t;
}
export function _(e) {
    let t = i(e);
    t.owners += 1;
    e.toneMapping = y_p;
    e.toneMappingExposure = t.desiredExposure;
    let n = false;
    return ()=>{
        if (!n) {
            n = true;
            t.owners = Math.max(0, t.owners - 1);
            queueMicrotask(()=>{
                if (t.owners > 0) {
                    e.toneMapping = y_p;
                    e.toneMappingExposure = t.desiredExposure;
                    return;
                }
                e.toneMapping = t.desiredToneMapping;
                e.toneMappingExposure = t.desiredExposure;
            });
        }
    };
}
