"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "abortTask", {
    enumerable: true,
    get () {
        return h;
    }
});
Object.defineProperty(exports, "listenForDynamicRequest", {
    enumerable: true,
    get () {
        return p;
    }
});
Object.defineProperty(exports, "startPPRNavigation", {
    enumerable: true,
    get () {
        return u;
    }
});
Object.defineProperty(exports, "updateCacheNodeOnPopstateRestoration", {
    enumerable: true,
    get () {
        return function e(t, [, n]) {
            let t_parallelRoutes = t.parallelRoutes;
            let i = new Map(t_parallelRoutes);
            for(let t in n){
                let r = n[t];
                let s = r[0];
                let l = o.createRouterCacheKey(s);
                let u = t_parallelRoutes.get(t);
                if (u !== undefined) {
                    let n = u.get(l);
                    if (n !== undefined) {
                        let a = e(n, r);
                        let o = new Map(u);
                        o.set(l, a);
                        i.set(t, o);
                    }
                }
            }
            let t_rsc = t.rsc;
            let l = g(t_rsc) && t_rsc.status === "pending";
            return {
                lazyData: null,
                rsc: t_rsc,
                head: t.head,
                prefetchHead: l ? t.prefetchHead : [
                    null,
                    null
                ],
                prefetchRsc: l ? t.prefetchRsc : null,
                loading: t.loading,
                parallelRoutes: i,
                navigatedAt: t.navigatedAt
            };
        };
    }
});
let n = require("./module-65360.js");
let a = require("./module-7460.js");
let o = require("./module-69190.js");
let i = require("./module-44707.js");
let s = require("./module-83571.js");
let l = {
    route: null,
    node: null,
    dynamicRequestTree: null,
    children: null
};
function u(e, t, r, i, s, u, d, p, h) {
    return function e(t, r, [, y], s, u, d, p, h, _, m, g) {
        let v = s[1];
        let b = d !== null ? d[2] : null;
        if (!u) {
            if (s[4] === true) {
                u = true;
            }
        }
        let r_parallelRoutes = r.parallelRoutes;
        let R = new Map(r_parallelRoutes);
        let S = {};
        let P = null;
        let O = false;
        let T = {};
        for(let r in v){
            let i;
            let s = v[r];
            let f = y[r];
            let d = r_parallelRoutes.get(r);
            let j = b !== null ? b[r] : null;
            let w = s[0];
            let x = m.concat([
                r,
                w
            ]);
            let A = o.createRouterCacheKey(w);
            let C = f !== undefined ? f[0] : undefined;
            let M = d !== undefined ? d.get(A) : undefined;
            if ((i = w === n.DEFAULT_SEGMENT_KEY ? f !== undefined ? {
                route: f,
                node: null,
                dynamicRequestTree: null,
                children: null
            } : c(t, f, s, M, u, j !== undefined ? j : null, p, h, x, g) : _ && Object.keys(s[1]).length === 0 ? c(t, f, s, M, u, j !== undefined ? j : null, p, h, x, g) : f !== undefined && C !== undefined && a.matchSegment(w, C) && M !== undefined && f !== undefined ? e(t, M, f, s, u, j, p, h, _, x, g) : c(t, f, s, M, u, j !== undefined ? j : null, p, h, x, g)) !== null) {
                if (i.route === null) {
                    return l;
                }
                if (P === null) {
                    P = new Map;
                }
                P.set(r, i);
                let e = i.node;
                if (e !== null) {
                    let t = new Map(d);
                    t.set(A, e);
                    R.set(r, t);
                }
                let t = i.route;
                S[r] = t;
                let n = i.dynamicRequestTree;
                if (n !== null) {
                    O = true;
                    T[r] = n;
                } else {
                    T[r] = t;
                }
            } else {
                S[r] = s;
                T[r] = s;
            }
        }
        if (P === null) {
            return null;
        }
        let node = {
            lazyData: null,
            rsc: r.rsc,
            prefetchRsc: r.prefetchRsc,
            head: r.head,
            prefetchHead: r.prefetchHead,
            loading: r.loading,
            parallelRoutes: R,
            navigatedAt: t
        };
        return {
            route: f(s, S),
            node,
            dynamicRequestTree: O ? f(s, T) : null,
            children: P
        };
    }(e, t, r, i, false, s, u, d, p, [], h);
}
function c(e, t, r, n, a, u, c, p, h, _) {
    if (!a && (t === undefined || i.isNavigatingToNewRootLayout(t, r))) {
        return l;
    }
    return function e(t, r, n, a, i, l, u, c) {
        let rsc;
        let loading;
        let head;
        let m;
        let g = r[1];
        let y = Object.keys(g).length === 0;
        if (n !== undefined && n.navigatedAt + s.DYNAMIC_STALETIME_MS > t) {
            rsc = n.rsc;
            loading = n.loading;
            head = n.head;
            m = n.navigatedAt;
        } else if (a === null) {
            return d(t, r, null, i, l, u, c);
        } else {
            rsc = a[1];
            loading = a[3];
            head = y ? i : null;
            m = t;
            if (a[4] || l && y) {
                return d(t, r, a, i, l, u, c);
            }
        }
        let v = a !== null ? a[2] : null;
        let b = new Map;
        let E = n !== undefined ? n.parallelRoutes : null;
        let R = new Map(E);
        let S = {};
        let P = false;
        if (y) {
            c.push(u);
        } else {
            for(let r in g){
                let n = g[r];
                let a = v !== null ? v[r] : null;
                let s = E !== null ? E.get(r) : undefined;
                let f = n[0];
                let d = u.concat([
                    r,
                    f
                ]);
                let p = o.createRouterCacheKey(f);
                let h = e(t, n, s !== undefined ? s.get(p) : undefined, a, i, l, d, c);
                b.set(r, h);
                let _ = h.dynamicRequestTree;
                if (_ !== null) {
                    P = true;
                    S[r] = _;
                } else {
                    S[r] = n;
                }
                let m = h.node;
                if (m !== null) {
                    let e = new Map;
                    e.set(p, m);
                    R.set(r, e);
                }
            }
        }
        return {
            route: r,
            node: {
                lazyData: null,
                rsc,
                prefetchRsc: null,
                head,
                prefetchHead: null,
                loading,
                parallelRoutes: R,
                navigatedAt: m
            },
            dynamicRequestTree: P ? f(r, S) : null,
            children: b
        };
    }(e, r, n, u, c, p, h, _);
}
function f(e, t) {
    let r = [
        e[0],
        t
    ];
    if (2 in e) {
        r[2] = e[2];
    }
    if (3 in e) {
        r[3] = e[3];
    }
    if (4 in e) {
        r[4] = e[4];
    }
    return r;
}
function d(e, t, r, n, a, i, s) {
    let dynamicRequestTree = f(t, t[1]);
    dynamicRequestTree[3] = "refetch";
    return {
        route: t,
        node: function e(t, [, u], n, a, i, s, l) {
            let c = n !== null ? n[2] : null;
            let f = new Map;
            for(let r in u){
                let n = u[r];
                let d = c !== null ? c[r] : null;
                let p = n[0];
                let h = s.concat([
                    r,
                    p
                ]);
                let _ = o.createRouterCacheKey(p);
                let m = e(t, n, d === undefined ? null : d, a, i, h, l);
                let g = new Map;
                g.set(_, m);
                f.set(r, g);
            }
            let d = f.size === 0;
            if (d) {
                l.push(s);
            }
            let p = n !== null ? n[1] : null;
            let h = n !== null ? n[3] : null;
            return {
                lazyData: null,
                parallelRoutes: f,
                prefetchRsc: p !== undefined ? p : null,
                prefetchHead: d ? a : [
                    null,
                    null
                ],
                loading: h !== undefined ? h : null,
                rsc: y(),
                head: d ? y() : null,
                navigatedAt: t
            };
        }(e, t, r, n, a, i, s),
        dynamicRequestTree,
        children: null
    };
}
function p(e, t) {
    t.then(({ flightData })=>{
        if (typeof flightData !== "string") {
            for (let t of flightData){
                let { segmentPath, tree, seedData, head } = t;
                if (seedData) {
                    ((e, segmentPath_1, tree_1, seedData_1, head_1)=>{
                        let s = e;
                        for(let e = 0; e < segmentPath_1.length; e += 2){
                            let r = segmentPath_1[e];
                            let n = segmentPath_1[e + 1];
                            let o = s.children;
                            if (o !== null) {
                                let e = o.get(r);
                                if (e !== undefined) {
                                    let t = e.route[0];
                                    if (a.matchSegment(n, t)) {
                                        s = e;
                                        continue;
                                    }
                                }
                            }
                            return;
                        }
                        (function e(t, tree_1_1, seedData_1_1, head_1_1) {
                            if (t.dynamicRequestTree === null) {
                                return;
                            }
                            let t_children = t.children;
                            let t_node = t.node;
                            if (t_children === null) {
                                if (t_node !== null) {
                                    (function e(t_node_1, [, l], n, i, s) {
                                        let u = n[1];
                                        let c = i[2];
                                        let t_parallelRoutes = t_node_1.parallelRoutes;
                                        for(let t in l){
                                            let r = l[t];
                                            let n = u[t];
                                            let i = c[t];
                                            let d = t_parallelRoutes.get(t);
                                            let p = r[0];
                                            let h = o.createRouterCacheKey(p);
                                            let m = d !== undefined ? d.get(h) : undefined;
                                            if (m !== undefined) {
                                                if (n !== undefined && a.matchSegment(p, n[0]) && i != null) {
                                                    e(m, r, n, i, s);
                                                } else {
                                                    _(r, m, null);
                                                }
                                            }
                                        }
                                        let t_rsc = t_node_1.rsc;
                                        let p = i[1];
                                        if (t_rsc === null) {
                                            t_node_1.rsc = p;
                                        } else if (g(t_rsc)) {
                                            t_rsc.resolve(p);
                                        }
                                        let t_head = t_node_1.head;
                                        if (g(t_head)) {
                                            t_head.resolve(s);
                                        }
                                    })(t_node, t.route, tree_1_1, seedData_1_1, head_1_1);
                                    t.dynamicRequestTree = null;
                                }
                                return;
                            }
                            let u = tree_1_1[1];
                            let c = seedData_1_1[2];
                            for(let t in tree_1_1){
                                let r = u[t];
                                let n = c[t];
                                let o = t_children.get(t);
                                if (o !== undefined) {
                                    let t = o.route[0];
                                    if (a.matchSegment(r[0], t) && n != null) {
                                        return e(o, r, n, head_1_1);
                                    }
                                }
                            }
                        })(s, tree_1, seedData_1, head_1);
                    })(e, segmentPath, tree, seedData, head);
                }
            }
            h(e, null);
        }
    }, (t)=>{
        h(e, t);
    });
}
function h(e, t) {
    let e_node = e.node;
    if (e_node === null) {
        return;
    }
    let e_children = e.children;
    if (e_children === null) {
        _(e.route, e_node, t);
    } else {
        for (let e of e_children.values()){
            h(e, t);
        }
    }
    e.dynamicRequestTree = null;
}
function _([, n], t, r) {
    let t_parallelRoutes = t.parallelRoutes;
    for(let e in n){
        let t = n[e];
        let i = t_parallelRoutes.get(e);
        if (i === undefined) {
            continue;
        }
        let s = t[0];
        let l = o.createRouterCacheKey(s);
        let u = i.get(l);
        if (u !== undefined) {
            _(t, u, r);
        }
    }
    let t_rsc = t.rsc;
    if (g(t_rsc)) {
        if (r === null) {
            t_rsc.resolve(null);
        } else {
            t_rsc.reject(r);
        }
    }
    let t_head = t.head;
    if (g(t_head)) {
        t_head.resolve(null);
    }
}
let m = Symbol();
function g(e) {
    return e && e.tag === m;
}
function y() {
    let e;
    let t;
    let r = new Promise((resolve, reject)=>{
        e = resolve;
        t = reject;
    });
    r.status = "pending";
    r.resolve = (t)=>{
        if (r.status === "pending") {
            r.status = "fulfilled";
            r.value = t;
            e(t);
        }
    };
    r.reject = (e)=>{
        if (r.status === "pending") {
            r.status = "rejected";
            r.reason = e;
            t(e);
        }
    };
    r.tag = m;
    return r;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
