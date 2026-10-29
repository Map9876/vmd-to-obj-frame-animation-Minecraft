import "./module-86897.js";
import { createContext, useSyncExternalStore } from "./module-61426.js";
import { J0 } from "./module-78036.js";
export let cr = createContext(null);
let s = new Set([
    "__proto__",
    "prototype",
    "constructor"
]);
export function $N(e, r) {
    let i = (e, r, t)=>{
        if (t.has(r)) {
            throw Error("deepMerge 不接受循环对象");
        }
        t.add(r);
        let n = {
            ...e
        };
        try {
            for (let o of Object.keys(r)){
                if (s.has(o)) {
                    throw Error(`deepMerge 拒绝不安全键：${o}`);
                }
                let a = r[o];
                if (a != null) {
                    if (typeof a !== "object" || Array.isArray(a) || typeof e[o] !== "object" || e[o] === null || Array.isArray(e[o])) {
                        n[o] = a;
                    } else {
                        n[o] = i(e[o], a, t);
                    }
                }
            }
        } finally{
            t.delete(r);
        }
        return n;
    };
    return i(e, r, new WeakSet);
}
export function y5() {
    return useSyncExternalStore(J0.subscribe, J0.getSnapshot, J0.getServerSnapshot).config;
}
export function AT({ children }) {
    let value = y5();
    return <cr.Provider value={value}>{children}</cr.Provider>;
}
