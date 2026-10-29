import { a, i } from "./useStore-DX_rDZVw/chunk_i.js";
import { p } from "./useStore-DX_rDZVw/chunk_p.js";
import { S } from "./useStore-DX_rDZVw/chunk_b.js";
import { D } from "./useStore-DX_rDZVw/chunk_T.js";
import { n as n_1, r, s } from "./jsx-runtime-Db0DjQYK.js";
export function E(e) {
    return e[e.length - 1];
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
function c(e) {
    for(let t in e){
        if (hasOwnProperty.call(e, t)) {
            return true;
        }
    }
    return false;
}
const l = ()=>Object.create(null);
const u = (e, t)=>O(e, t, l);
export function O(e, t, n = ()=>({}), r = 0) {
    if (e === t) {
        return e;
    }
    if (r > 500) {
        return t;
    }
    let i = t;
    let a = h(e) && h(i);
    if (!a && !(p(e) && p(i))) {
        return i;
    }
    let s = a ? e : f(e);
    if (!s) {
        return i;
    }
    let c = a ? i : f(i);
    if (!c) {
        return i;
    }
    let s_length = s.length;
    let c_length = c.length;
    let m = a ? Array(c_length) : n();
    let g = 0;
    for(let t = 0; t < c_length; t++){
        let s = a ? t : c[t];
        let u = e[s];
        let f = i[s];
        if (u === f) {
            m[s] = u;
            if (a ? t < s_length : hasOwnProperty.call(e, s)) {
                g++;
            }
            continue;
        }
        if (u === null || f === null || typeof u != `object` || typeof f != `object`) {
            m[s] = f;
            continue;
        }
        let p = O(u, f, n, r + 1);
        m[s] = p;
        if (p === u) {
            g++;
        }
    }
    if (s_length === c_length && g === s_length) {
        return e;
    }
    return m;
}
function f(e) {
    let t = Object.getOwnPropertyNames(e);
    for (let n of t){
        if (!propertyIsEnumerable.call(e, n)) {
            return false;
        }
    }
    let n = Object.getOwnPropertySymbols(e);
    if (n.length === 0) {
        return t;
    }
    let r = t;
    for (let t of n){
        if (!propertyIsEnumerable.call(e, t)) {
            return false;
        }
        r.push(t);
    }
    return r;
}
function h(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length;
}
export function v(e, t, n) {
    if (e === t) {
        return true;
    }
    if (typeof e != typeof t) {
        return false;
    }
    if (Array.isArray(e) && Array.isArray(t)) {
        if (e.length !== t.length) {
            return false;
        }
        for(let r = 0, i = e.length; r < i; r++){
            if (!v(e[r], t[r], n)) {
                return false;
            }
        }
        return true;
    }
    if (p(e) && p(t)) {
        let r = n?.ignoreUndefined ?? true;
        if (n?.partial) {
            for(let i in t){
                if ((!r || t[i] !== undefined) && !v(e[i], t[i], n)) {
                    return false;
                }
            }
            return true;
        }
        let i = 0;
        if (!r) {
            i = Object.keys(e).length;
        } else {
            for(let t in e){
                if (e[t] !== undefined) {
                    i++;
                }
            }
        }
        let a = 0;
        for(let o in t){
            if ((!r || t[o] !== undefined) && (a++, a > i || !v(e[o], t[o], n))) {
                return false;
            }
        }
        return i === a;
    }
    return false;
}
export function g(e) {
    let t;
    let n;
    let r = new Promise((resolve, reject)=>{
        t = resolve;
        n = reject;
    });
    r.status = `pending`;
    r.resolve = (n)=>{
        r.status = `resolved`;
        r.value = n;
        t(n);
        e?.(n);
    };
    r.reject = (e)=>{
        r.status = `rejected`;
        n(e);
    };
    return r;
}
export function w(e) {
    if (typeof e?.message == `string`) {
        return e.message.startsWith(`Failed to fetch dynamically imported module`) || e.message.startsWith(`error loading dynamically imported module`) || e.message.startsWith(`Importing a module script failed`);
    }
    return false;
}
export function T(e) {
    return !!(e && typeof e == `object` && typeof e.then == `function`);
}
export const m = [
    `http:`,
    `https:`,
    `mailto:`,
    `tel:`
];
export function C(e, t) {
    if (!e) {
        return false;
    }
    try {
        let n = new URL(e);
        return !t.has(n.protocol);
    } catch  {
        return false;
    }
}
export function _(e) {
    if (!e || !/[%\\\x00-\x1f\x7f]/.test(e) && !e.startsWith(`//`)) {
        return {
            path: e,
            handledProtocolRelativeURL: false
        };
    }
    let t = /%25|%5C/gi;
    let n = 0;
    let r = ``;
    let i;
    while((i = t.exec(e)) !== null){
        r += S(e.slice(n, i.index)) + i[0];
        n = t.lastIndex;
    }
    r += S(n ? e.slice(n) : e);
    let handledProtocolRelativeURL = false;
    if (r.startsWith(`//`)) {
        handledProtocolRelativeURL = true;
        r = `/` + r.replace(/^\/+/, ``);
    }
    return {
        path: r,
        handledProtocolRelativeURL
    };
}
export function y(e) {
    if (/\s|[^\u0000-\u007F]/.test(e)) {
        return e.replace(/\s|[^\u0000-\u007F]/gu, encodeURIComponent);
    }
    return e;
}
function A(e, t) {
    if (e === t) {
        return true;
    }
    if (e.length !== t.length) {
        return false;
    }
    for(let n = 0; n < e.length; n++){
        if (e[n] !== t[n]) {
            return false;
        }
    }
    return true;
}
function j() {
    throw Error(`Invariant failed`);
}
const M = s(n_1(), 1);
const M_use = M.use;
export const d = typeof window < `u` ? M.useLayoutEffect : M.useEffect;
function useF(e) {
    let tRef = M.useRef({
        value: e,
        prev: null
    });
    let value = tRef.current.value;
    if (e !== value) {
        tRef.current = {
            value: e,
            prev: value
        };
    }
    return tRef.current.prev;
}
function useI(e, t, n = {}, r = {}) {
    M.useEffect(()=>{
        if (!e.current || r.disabled || typeof IntersectionObserver != `function`) {
            return;
        }
        let i = new IntersectionObserver(([e])=>{
            t(e);
        }, n);
        i.observe(e.current);
        return ()=>{
            i.disconnect();
        };
    }, [
        t,
        n,
        r.disabled,
        e
    ]);
}
function useL(e) {
    let tRef = M.useRef(null);
    M.useImperativeHandle(e, ()=>tRef.current, []);
    return tRef;
}
const RContext = M.createContext(null);
function useZ(e) {
    return M.useContext(RContext);
}
const BContext = M.createContext(undefined);
const VContext = M.createContext(undefined);
const H = r((t)=>{
    var n = n_1();
    function r(e, t) {
        return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
    }
    var i = typeof Object.is == `function` ? Object.is : r;
    var n_useState = n.useState;
    var n_useEffect = n.useEffect;
    var n_useLayoutEffect = n.useLayoutEffect;
    var n_useDebugValue = n.useDebugValue;
    function l(e, getSnapshot) {
        const n = getSnapshot();
        const r = n_useState({
            inst: {
                value: n,
                getSnapshot
            }
        });
        const inst = r[0].inst;
        const l = r[1];
        n_useLayoutEffect(function() {
            inst.value = n;
            inst.getSnapshot = getSnapshot;
            if (u(inst)) {
                l({
                    inst
                });
            }
        }, [
            e,
            n,
            getSnapshot
        ]);
        n_useEffect(function() {
            if (u(inst)) {
                l({
                    inst
                });
            }
            return e(function() {
                if (u(inst)) {
                    l({
                        inst
                    });
                }
            });
        }, [
            e
        ]);
        n_useDebugValue(n);
        return n;
    }
    function u(e) {
        const e_getSnapshot = e.getSnapshot;
        e = e.value;
        try {
            const n = e_getSnapshot();
            return !i(e, n);
        } catch  {
            return true;
        }
    }
    function d(e, t) {
        return t();
    }
    var f = typeof window > `u` || window.document === undefined || window.document.createElement === undefined ? d : l;
    t.useSyncExternalStore = n.useSyncExternalStore === undefined ? f : n.useSyncExternalStore;
});
const U = r((e, t)=>{
    t.exports = H();
});
const W = r((t)=>{
    var n = n_1();
    var r = U();
    function i(e, t) {
        return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
    }
    var a = typeof Object.is == `function` ? Object.is : i;
    var r_useSyncExternalStore = r.useSyncExternalStore;
    var n_useRef = n.useRef;
    var n_useEffect = n.useEffect;
    var n_useMemo = n.useMemo;
    var n_useDebugValue = n.useDebugValue;
    t.useSyncExternalStoreWithSelector = function(e, t, n, r, i) {
        let d = n_useRef(null);
        if (d.current === null) {
            var f = {
                hasValue: false,
                value: null
            };
            d.current = f;
        } else {
            f = d.current;
        }
        d = n_useMemo(function() {
            function e(e) {
                if (!o) {
                    o = true;
                    s = e;
                    e = r(e);
                    if (i !== undefined && f.hasValue) {
                        var t = f.value;
                        if (i(t, e)) {
                            return c = t;
                        }
                    }
                    return c = e;
                }
                t = c;
                if (a(s, e)) {
                    return t;
                }
                const n = r(e);
                if (i !== undefined && i(t, n)) {
                    s = e;
                    return t;
                }
                s = e;
                return c = n;
            }
            var o = false;
            var s;
            var c;
            const l = n === undefined ? null : n;
            return [
                function() {
                    return e(t());
                },
                l === null ? undefined : function() {
                    return e(l());
                }
            ];
        }, [
            t,
            n,
            r,
            i
        ]);
        const p = r_useSyncExternalStore(e, d[0], d[1]);
        n_useEffect(function() {
            f.hasValue = true;
            f.value = p;
        }, [
            p
        ]);
        n_useDebugValue(p);
        return p;
    };
});
export const n = r((e, t)=>{
    t.exports = W();
});
const K = n();
function q(e, t) {
    return e === t;
}
function useJ(e, t, n = q) {
    let r = M.useCallback((t)=>{
        if (!e) {
            return ()=>{};
        }
        let { unsubscribe } = e.subscribe(t);
        return unsubscribe;
    }, [
        e
    ]);
    let i = M.useCallback(()=>e?.get(), [
        e
    ]);
    return K.useSyncExternalStoreWithSelector(r, i, i, t, n);
}
export { u as D, c as S, BContext as a, D as b, M_use as c, useF as f, A as h, VContext as i, useL as l, useZ as o, j as p, U as r, RContext as s, useJ as t, useI as u, a as x };
