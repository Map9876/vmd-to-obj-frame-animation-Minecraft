import { l } from "./ClientOnly-BiCdmN1s/chunk_c.js";
import { f } from "./ClientOnly-BiCdmN1s/chunk_d.js";
import { F, I } from "./ClientOnly-BiCdmN1s/chunk_F.js";
import { B } from "./ClientOnly-BiCdmN1s/chunk_z.js";
import { n, s as s_1, t } from "./jsx-runtime-Db0DjQYK.js";
import { E as E_1, p as p_1 } from "./useStore-DX_rDZVw.js";
function a(e) {
    let t = new Map;
    let n;
    let prev;
    let i = (e)=>{
        if (e.next) {
            if (e.prev) {
                e.prev.next = e.next;
                e.next.prev = e.prev;
                e.next = undefined;
                if (prev) {
                    prev.next = e;
                    e.prev = prev;
                }
            } else {
                e.next.prev = undefined;
                n = e.next;
                e.next = undefined;
                if (prev) {
                    e.prev = prev;
                    prev.next = e;
                }
            }
            prev = e;
        }
    };
    return {
        get (e) {
            let n = t.get(e);
            if (n) {
                i(n);
                return n.value;
            }
        },
        set (a, o) {
            if (t.size >= e && n) {
                let e = n;
                t.delete(e.key);
                if (e.next) {
                    n = e.next;
                    e.next.prev = undefined;
                }
                if (e === prev) {
                    prev = undefined;
                }
            }
            let s = t.get(a);
            if (s) {
                s.value = o;
                i(s);
            } else {
                let e = {
                    key: a,
                    value: o,
                    prev
                };
                if (prev) {
                    prev.next = e;
                }
                prev = e;
                n ||= e;
                t.set(a, e);
            }
        },
        clear () {
            t.clear();
            n = undefined;
            prev = undefined;
        }
    };
}
const o = 4;
const s = 5;
function u(e, t, n, r, i, a, c) {
    c?.(n);
    let d = r;
    {
        let r = n.fullPath ?? n.from;
        let c = r.length;
        let u = n.options?.caseSensitive ?? e;
        let f = n.options?.params?.parse ?? n.options?.parseParams;
        while(d < c){
            let e = l(r, d, t);
            let o;
            let s = d;
            let c = e[5];
            d = c + 1;
            a++;
            switch(e[0]){
                case 0:
                    {
                        let t = r.substring(e[2], e[3]);
                        if (u) {
                            let e = i.static?.get(t);
                            if (e) {
                                o = e;
                            } else {
                                i.static ??= new Map;
                                let e = p(n.fullPath ?? n.from);
                                e.parent = i;
                                e.depth = a;
                                o = e;
                                i.static.set(t, e);
                            }
                        } else {
                            let e = t.toLowerCase();
                            let r = i.staticInsensitive?.get(e);
                            if (r) {
                                o = r;
                            } else {
                                i.staticInsensitive ??= new Map;
                                let t = p(n.fullPath ?? n.from);
                                t.parent = i;
                                t.depth = a;
                                o = t;
                                i.staticInsensitive.set(e, t);
                            }
                        }
                        break;
                    }
                case 1:
                    {
                        let t = r.substring(s, e[1]);
                        let l = r.substring(e[4], c);
                        let d = u && !!(t || l);
                        let p = t ? d ? t : t.toLowerCase() : undefined;
                        let h = l ? d ? l : l.toLowerCase() : undefined;
                        let g = !f && i.dynamic?.find((e)=>!e.parse && e.caseSensitive === d && e.prefix === p && e.suffix === h);
                        if (g) {
                            o = g;
                        } else {
                            let e = m(1, n.fullPath ?? n.from, d, p, h);
                            o = e;
                            e.depth = a;
                            e.parent = i;
                            i.dynamic ??= [];
                            i.dynamic.push(e);
                        }
                        break;
                    }
                case 3:
                    {
                        let t = r.substring(s, e[1]);
                        let l = r.substring(e[4], c);
                        let d = u && !!(t || l);
                        let p = t ? d ? t : t.toLowerCase() : undefined;
                        let h = l ? d ? l : l.toLowerCase() : undefined;
                        let g = !f && i.optional?.find((e)=>!e.parse && e.caseSensitive === d && e.prefix === p && e.suffix === h);
                        if (g) {
                            o = g;
                        } else {
                            let e = m(3, n.fullPath ?? n.from, d, p, h);
                            o = e;
                            e.parent = i;
                            e.depth = a;
                            i.optional ??= [];
                            i.optional.push(e);
                        }
                        break;
                    }
                case 2:
                    {
                        let t = r.substring(s, e[1]);
                        let l = r.substring(e[4], c);
                        let d = u && !!(t || l);
                        let f = t ? d ? t : t.toLowerCase() : undefined;
                        let p = l ? d ? l : l.toLowerCase() : undefined;
                        let h = m(2, n.fullPath ?? n.from, d, f, p);
                        o = h;
                        h.parent = i;
                        h.depth = a;
                        i.wildcard ??= [];
                        i.wildcard.push(h);
                    }
            }
            i = o;
        }
        if (f && n.children && !n.isRoot && n.id && n.id.charCodeAt(n.id.lastIndexOf(`/`) + 1) === 95) {
            let e = p(n.fullPath ?? n.from);
            e.kind = s;
            e.parent = i;
            a++;
            e.depth = a;
            i.pathless ??= [];
            i.pathless.push(e);
            i = e;
        }
        let h = (n.path || !n.children) && !n.isRoot;
        if (h && r.endsWith(`/`)) {
            let e = p(n.fullPath ?? n.from);
            e.kind = o;
            e.parent = i;
            a++;
            e.depth = a;
            i.index = e;
            i = e;
        }
        i.parse = f ?? null;
        i.priority = n.options?.params?.priority ?? 0;
        if (h && !i.route) {
            i.route = n;
            i.fullPath = n.fullPath ?? n.from;
        }
    }
    if (n.children) {
        for (let r of n.children){
            u(e, t, r, d, i, a, c);
        }
    }
}
function p(e) {
    return {
        kind: 0,
        depth: 0,
        pathless: null,
        index: null,
        static: null,
        staticInsensitive: null,
        dynamic: null,
        optional: null,
        wildcard: null,
        route: null,
        fullPath: e,
        parent: null,
        parse: null,
        priority: 0
    };
}
function m(kind, t, caseSensitive, prefix, suffix) {
    return {
        kind,
        depth: 0,
        pathless: null,
        index: null,
        static: null,
        staticInsensitive: null,
        dynamic: null,
        optional: null,
        wildcard: null,
        route: null,
        fullPath: t,
        parent: null,
        parse: null,
        priority: 0,
        caseSensitive,
        prefix,
        suffix
    };
}
function h(e, t) {
    let n = p(`/`);
    let r = new Uint16Array(6);
    for (let t of e){
        u(false, r, t, 1, n, 0);
    }
    f(n);
    t.masksTree = n;
    t.flatCache = a(1000);
}
function g(e, t) {
    e ||= `/`;
    let n = t.flatCache.get(e);
    if (n) {
        return n;
    }
    let r = x(e, t.masksTree);
    t.flatCache.set(e, r);
    return r;
}
function _(from, t, n, r, i) {
    from ||= `/`;
    r ||= `/`;
    let a = t ? `case\0${from}` : from;
    let o = i.singleCache.get(a);
    if (!o) {
        o = p(`/`);
        u(t, new Uint16Array(6), {
            from
        }, 1, o, 0);
        i.singleCache.set(a, o);
    }
    return x(r, o, n);
}
function v(e, t, n = false) {
    let r = n ? e : `nofuzz\0${e}`;
    let i = t.matchCache.get(r);
    if (i !== undefined) {
        return i;
    }
    e ||= `/`;
    let a;
    try {
        a = x(e, t.segmentTree, n);
    } catch (error) {
        if (error instanceof URIError) {
            a = null;
        } else {
            throw error;
        }
    }
    if (a) {
        a.branch = C(a.route);
    }
    t.matchCache.set(r, a);
    return a;
}
function y(e) {
    if (e === `/`) {
        return e;
    }
    return e.replace(/\/{1,}$/, ``);
}
function b(e, t = false, n) {
    let segmentTree = p(e.fullPath);
    let o = new Uint16Array(6);
    let routesById = {};
    let routesByPath = {};
    let l = 0;
    u(t, o, e, 1, segmentTree, 0, (e)=>{
        n?.(e, l);
        if (e.id in routesById) {
            p_1();
        }
        routesById[e.id] = e;
        if (l !== 0 && e.path) {
            let t = y(e.fullPath);
            if (!routesByPath[t] || e.fullPath.endsWith(`/`)) {
                routesByPath[t] = e;
            }
        }
        l++;
    });
    f(segmentTree);
    return {
        processedTree: {
            segmentTree,
            singleCache: a(1000),
            matchCache: a(1000),
            flatCache: null,
            masksTree: null
        },
        routesById,
        routesByPath
    };
}
function x(e, t, n = false) {
    let r = e.split(`/`);
    let i = T(e, r, t, n);
    if (!i) {
        return null;
    }
    let [rawParams] = S(e, r, i);
    return {
        route: i.node.route,
        rawParams
    };
}
function S(e, t, n) {
    let r = w(n.node);
    let i = null;
    let a = Object.create(null);
    let part = n.extract?.part ?? 0;
    let l = n.extract?.node ?? 0;
    let path = n.extract?.path ?? 0;
    let segment = n.extract?.segment ?? 0;
    for(; l < r.length; part++, l++, path++, segment++){
        let f = r[l];
        if (f.kind === o) {
            break;
        }
        if (f.kind === s) {
            segment--;
            part--;
            path--;
            continue;
        }
        let p = t[part];
        let m = path;
        if (p) {
            path += p.length;
        }
        if (f.kind === 1) {
            i ??= n.node.fullPath.split(`/`);
            let e = i[segment];
            let t = f.prefix?.length ?? 0;
            if (e.charCodeAt(t) === 123) {
                let n = f.suffix?.length ?? 0;
                let r = e.substring(t + 2, e.length - n - 1);
                let i = p.substring(t, p.length - n);
                a[r] = decodeURIComponent(i);
            } else {
                let t = e.substring(1);
                a[t] = decodeURIComponent(p);
            }
        } else if (f.kind === 3) {
            if (n.skipped & 1 << l) {
                part--;
                path = m - 1;
                continue;
            }
            i ??= n.node.fullPath.split(`/`);
            let e = i[segment];
            let t = f.prefix?.length ?? 0;
            let r = f.suffix?.length ?? 0;
            let o = e.substring(t + 3, e.length - r - 1);
            let s = f.suffix || f.prefix ? p.substring(t, p.length - r) : p;
            if (s) {
                a[o] = decodeURIComponent(s);
            }
        } else if (f.kind === 2) {
            let t = f;
            let n = e.substring(m + (t.prefix?.length ?? 0), e.length - (t.suffix?.length ?? 0));
            let r = decodeURIComponent(n);
            a[`*`] = r;
            a._splat = r;
            break;
        }
    }
    if (n.rawParams) {
        Object.assign(a, n.rawParams);
    }
    return [
        a,
        {
            part,
            node: l,
            path,
            segment
        }
    ];
}
function C(e) {
    let t = [
        e
    ];
    while(e.parentRoute){
        e = e.parentRoute;
        t.push(e);
    }
    t.reverse();
    return t;
}
function w(e) {
    let t = Array(e.depth + 1);
    do {
        t[e.depth] = e;
        e = e.parent;
    }while (e)
    return t;
}
function T(e, t, n, i) {
    if (e === `/` && n.index) {
        return {
            node: n.index,
            skipped: 0
        };
    }
    let a = !E_1(t);
    let s = a && e !== `/`;
    let index_1 = t.length - +!!a;
    let l = [
        {
            node: n,
            index: 1,
            skipped: 0,
            depth: 1,
            statics: 0,
            dynamics: 0,
            optionals: 0
        }
    ];
    let u = null;
    let d = null;
    while(l.length){
        let n = l.pop();
        let { node, index, skipped, depth, statics, dynamics, optionals } = n;
        let { extract, rawParams } = n;
        if (node.kind === 2 && node.route && !k(d, n)) {
            continue;
        }
        if (node.parse) {
            if (!O(e, t, n)) {
                continue;
            }
            rawParams = n.rawParams;
            extract = n.extract;
        }
        if (i && node.route && node.kind !== o && k(u, n)) {
            u = n;
        }
        let y = index === index_1;
        if (y && (node.route && (!s || node.kind === o || node.kind === 2) && k(d, n) && (d = n), !node.optional && !node.wildcard && !node.index && !node.pathless)) {
            continue;
        }
        let b = y ? undefined : t[index];
        let x;
        if (y && node.index) {
            let n = {
                node: node.index,
                index,
                skipped,
                depth: depth + 1,
                statics,
                dynamics,
                optionals,
                extract,
                rawParams
            };
            let i = true;
            if (node.index.parse) {
                if (!O(e, t, n)) {
                    i = false;
                }
            }
            if (i) {
                if (!dynamics && !optionals && !skipped && D(statics, index_1)) {
                    return n;
                }
                if (k(d, n)) {
                    d = n;
                }
            }
        }
        if (node.wildcard) {
            for(let e = node.wildcard.length - 1; e >= 0; e--){
                let n = node.wildcard[e];
                let { prefix, suffix } = n;
                if (!(prefix && (y || !(n.caseSensitive ? b : x ??= b.toLowerCase()).startsWith(prefix)))) {
                    if (suffix) {
                        if (y) {
                            continue;
                        }
                        let e = t.slice(index).join(`/`).slice(-suffix.length);
                        if ((n.caseSensitive ? e : e.toLowerCase()) !== suffix) {
                            continue;
                        }
                    }
                    l.push({
                        node: n,
                        index: index_1,
                        skipped,
                        depth: depth + 1,
                        statics,
                        dynamics,
                        optionals,
                        extract,
                        rawParams
                    });
                }
            }
        }
        if (node.optional) {
            let skipped_1 = skipped | 1 << depth;
            let t = depth + 1;
            for(let n = node.optional.length - 1; n >= 0; n--){
                let i = node.optional[n];
                l.push({
                    node: i,
                    index,
                    skipped: skipped_1,
                    depth: t,
                    statics,
                    dynamics,
                    optionals,
                    extract,
                    rawParams
                });
            }
            if (!y) {
                for(let e = node.optional.length - 1; e >= 0; e--){
                    let n = node.optional[e];
                    let { prefix, suffix } = n;
                    if (prefix || suffix) {
                        let e = n.caseSensitive ? b : x ??= b.toLowerCase();
                        if (prefix && !e.startsWith(prefix) || suffix && !e.endsWith(suffix)) {
                            continue;
                        }
                    }
                    l.push({
                        node: n,
                        index: index + 1,
                        skipped,
                        depth: t,
                        statics,
                        dynamics,
                        optionals: optionals + E(index_1, index),
                        extract,
                        rawParams
                    });
                }
            }
        }
        if (!y && node.dynamic && b) {
            for(let e = node.dynamic.length - 1; e >= 0; e--){
                let t = node.dynamic[e];
                let { prefix, suffix } = t;
                if (prefix || suffix) {
                    let e = t.caseSensitive ? b : x ??= b.toLowerCase();
                    if (prefix && !e.startsWith(prefix) || suffix && !e.endsWith(suffix)) {
                        continue;
                    }
                }
                l.push({
                    node: t,
                    index: index + 1,
                    skipped,
                    depth: depth + 1,
                    statics,
                    dynamics: dynamics + E(index_1, index),
                    optionals,
                    extract,
                    rawParams
                });
            }
        }
        if (!y && node.staticInsensitive) {
            let e = node.staticInsensitive.get(x ??= b.toLowerCase());
            if (e) {
                l.push({
                    node: e,
                    index: index + 1,
                    skipped,
                    depth: depth + 1,
                    statics: statics + E(index_1, index),
                    dynamics,
                    optionals,
                    extract,
                    rawParams
                });
            }
        }
        if (!y && node.static) {
            let e = node.static.get(b);
            if (e) {
                l.push({
                    node: e,
                    index: index + 1,
                    skipped,
                    depth: depth + 1,
                    statics: statics + E(index_1, index),
                    dynamics,
                    optionals,
                    extract,
                    rawParams
                });
            }
        }
        if (node.pathless) {
            let e = depth + 1;
            for(let t = node.pathless.length - 1; t >= 0; t--){
                let n = node.pathless[t];
                l.push({
                    node: n,
                    index,
                    skipped,
                    depth: e,
                    statics,
                    dynamics,
                    optionals,
                    extract,
                    rawParams
                });
            }
        }
    }
    if (d) {
        return d;
    }
    if (i && u) {
        let n = u.index;
        for(let e = 0; e < u.index; e++){
            n += t[e].length;
        }
        let r = n === e.length ? `/` : e.slice(n);
        u.rawParams ??= Object.create(null);
        u.rawParams[`**`] = decodeURIComponent(r);
        return u;
    }
    return null;
}
function E(index, t) {
    return 2 ** (index - t - 1);
}
function D(statics, index) {
    return statics === 2 ** (index - 1) - 1;
}
function O(e, t, n) {
    let r;
    let i;
    try {
        [r, i] = S(e, t, n);
    } catch  {
        return null;
    }
    n.rawParams = r;
    n.extract = i;
    if (!n.node.parse) {
        return true;
    }
    try {
        if (n.node.parse(r) === false) {
            return null;
        }
    } catch  {}
    return true;
}
function k(e, t) {
    if (e) {
        return t.statics > e.statics || t.statics === e.statics && (t.dynamics > e.dynamics || t.dynamics === e.dynamics && (t.optionals > e.optionals || t.optionals === e.optionals && ((t.node.kind === o) > (e.node.kind === o) || t.node.kind === o == (e.node.kind === o) && t.depth > e.depth)));
    }
    return true;
}
function A(e) {
    return r(e.filter((e)=>e !== undefined).join(`/`));
}
export function r(e) {
    return e.replace(/\/{2,}/g, `/`);
}
export function d(e) {
    if (e === `/`) {
        return e;
    }
    return e.replace(/^\/{1,}/, ``);
}
function N(e) {
    let e_length = e.length;
    if (e_length > 1 && e[e_length - 1] === `/`) {
        return e.replace(/\/{1,}$/, ``);
    }
    return e;
}
function P(e) {
    return N(d(e));
}
function L({ base, to, trailingSlash = `never`, cache }) {
    let a = to.startsWith(`/`);
    let o = !a && to === `.`;
    let s;
    if (cache) {
        s = a ? to : o ? base : base + `\0` + to;
        let n = cache.get(s);
        if (n) {
            return n;
        }
    }
    let c;
    if (o) {
        c = base.split(`/`);
    } else if (a) {
        c = to.split(`/`);
    } else {
        for(c = base.split(`/`); c.length > 1 && E_1(c) === ``;){
            c.pop();
        }
        let n = to.split(`/`);
        for(let e = 0, t = n.length; e < t; e++){
            let r = n[e];
            if (r === ``) {
                if (e) {
                    if (e === t - 1) {
                        c.push(r);
                    }
                } else {
                    c = [
                        r
                    ];
                }
            } else if (r === `..`) {
                c.pop();
            } else if (r !== `.`) {
                c.push(r);
            }
        }
    }
    if (c.length > 1) {
        if (E_1(c) === ``) {
            if (trailingSlash === `never`) {
                c.pop();
            }
        } else if (trailingSlash === `always`) {
            c.push(``);
        }
    }
    let l = r(c.join(`/`)) || `/`;
    if (s && cache) {
        cache.set(s, l);
    }
    return l;
}
export function i(e) {
    let t = new Map(e.map((e)=>[
            encodeURIComponent(e),
            e
        ]));
    let n = Array.from(t.keys()).map((e)=>e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`)).join(`|`);
    let r = new RegExp(n, `g`);
    return (e)=>e.replace(r, (e)=>t.get(e) ?? e);
}
const H = s_1(n(), 1);
const U = t();
function WComponent({ children, fallback = null }) {
    if (useG()) {
        return <>{children}</>;
    }
    return <>{fallback}</>;
}
function useG() {
    return H.useSyncExternalStore(K, ()=>true, ()=>false);
}
function K() {
    return ()=>{};
}
export { h as _, I as a, F as c, N as f, _ as g, v as h, L as l, g as m, useG as n, B as o, C as p, A as s, WComponent as t, P as u, b as v, a as y };
