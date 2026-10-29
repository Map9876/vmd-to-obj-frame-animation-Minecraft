import { useDebugValue, useEffect, useMemo, useRef } from "./module-61426.js";
import { useSyncExternalStore } from "./module-30125.js";
const i = typeof Object.is === "function" ? Object.is : (e, t)=>e === t && (e !== 0 || 1 / e == 1 / t) || e != e && t != t;
const useSyncExternalStore_1 = useSyncExternalStore;
const useRef_1 = useRef;
const useEffect_1 = useEffect;
const useMemo_1 = useMemo;
const useDebugValue_1 = useDebugValue;
export const useSyncExternalStoreWithSelector = function(e, t, n, r, o) {
    let p = useRef_1(null);
    if (p.current === null) {
        var d = {
            hasValue: false,
            value: null
        };
        p.current = d;
    } else {
        d = p.current;
    }
    const f = useSyncExternalStore_1(e, (p = useMemo_1(function() {
        function e(e) {
            if (!s) {
                s = true;
                a = e;
                e = r(e);
                if (o !== undefined && d.hasValue) {
                    var t = d.value;
                    if (o(t, e)) {
                        return l = t;
                    }
                }
                return l = e;
            }
            t = l;
            if (i(a, e)) {
                return t;
            }
            const n = r(e);
            if (o !== undefined && o(t, n)) {
                a = e;
                return t;
            }
            a = e;
            return l = n;
        }
        var a;
        var l;
        var s = false;
        const c = n === undefined ? null : n;
        return [
            function() {
                return e(t());
            },
            c === null ? undefined : function() {
                return e(c());
            }
        ];
    }, [
        t,
        n,
        r,
        o
    ]))[0], p[1]);
    useEffect_1(function() {
        d.hasValue = true;
        d.value = f;
    }, [
        f
    ]);
    useDebugValue_1(f);
    return f;
};
