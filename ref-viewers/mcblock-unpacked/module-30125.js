import { useDebugValue, useEffect, useLayoutEffect, useState, useSyncExternalStore as useSyncExternalStore_1 } from "./module-61426.js";
const o = typeof Object.is === "function" ? Object.is : (e, t)=>e === t && (e !== 0 || 1 / e == 1 / t) || e != e && t != t;
const useState_1 = useState;
const useEffect_1 = useEffect;
const useLayoutEffect_1 = useLayoutEffect;
const useDebugValue_1 = useDebugValue;
function c(e) {
    const e_getSnapshot = e.getSnapshot;
    e = e.value;
    try {
        const n = e_getSnapshot();
        return !o(e, n);
    } catch (e) {
        return true;
    }
}
const u = typeof window === "undefined" || window.document === undefined || window.document.createElement === undefined ? function(e, t) {
    return t();
} : function(e, getSnapshot) {
    const n = getSnapshot();
    const r = useState_1({
        inst: {
            value: n,
            getSnapshot
        }
    });
    const inst = r[0].inst;
    const u = r[1];
    useLayoutEffect_1(function() {
        inst.value = n;
        inst.getSnapshot = getSnapshot;
        if (c(inst)) {
            u({
                inst
            });
        }
    }, [
        e,
        n,
        getSnapshot
    ]);
    useEffect_1(function() {
        if (c(inst)) {
            u({
                inst
            });
        }
        return e(function() {
            if (c(inst)) {
                u({
                    inst
                });
            }
        });
    }, [
        e
    ]);
    useDebugValue_1(n);
    return n;
};
export const useSyncExternalStore = useSyncExternalStore_1 !== undefined ? useSyncExternalStore_1 : u;
