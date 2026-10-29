"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fillLazyItemsTillLeafWithHead", {
    enumerable: true,
    get: function() {
        return function e(navigatedAt, r, o, i, s, l, u) {
            if (Object.keys(i[1]).length === 0) {
                r.head = l;
                return;
            }
            for(let c in i[1]){
                let f;
                let d = i[1][c];
                let p = d[0];
                let h = n.createRouterCacheKey(p);
                let _ = s !== null && s[2][c] !== undefined ? s[2][c] : null;
                if (o) {
                    let n = o.parallelRoutes.get(c);
                    if (n) {
                        let o;
                        let i = u?.kind === "auto" && u.status === a.PrefetchCacheEntryStatus.reusable;
                        let s = new Map(n);
                        let f = s.get(h);
                        o = _ !== null ? {
                            lazyData: null,
                            rsc: _[1],
                            prefetchRsc: null,
                            head: null,
                            prefetchHead: null,
                            loading: _[3],
                            parallelRoutes: new Map(f?.parallelRoutes),
                            navigatedAt
                        } : i && f ? {
                            lazyData: f.lazyData,
                            rsc: f.rsc,
                            prefetchRsc: f.prefetchRsc,
                            head: f.head,
                            prefetchHead: f.prefetchHead,
                            parallelRoutes: new Map(f.parallelRoutes),
                            loading: f.loading
                        } : {
                            lazyData: null,
                            rsc: null,
                            prefetchRsc: null,
                            head: null,
                            prefetchHead: null,
                            parallelRoutes: new Map(f?.parallelRoutes),
                            loading: null,
                            navigatedAt
                        };
                        s.set(h, o);
                        e(navigatedAt, o, f, d, _ || null, l, u);
                        r.parallelRoutes.set(c, s);
                        continue;
                    }
                }
                if (_ !== null) {
                    let rsc = _[1];
                    let loading = _[3];
                    f = {
                        lazyData: null,
                        rsc,
                        prefetchRsc: null,
                        head: null,
                        prefetchHead: null,
                        parallelRoutes: new Map,
                        loading,
                        navigatedAt
                    };
                } else {
                    f = {
                        lazyData: null,
                        rsc: null,
                        prefetchRsc: null,
                        head: null,
                        prefetchHead: null,
                        parallelRoutes: new Map,
                        loading: null,
                        navigatedAt
                    };
                }
                let m = r.parallelRoutes.get(c);
                if (m) {
                    m.set(h, f);
                } else {
                    r.parallelRoutes.set(c, new Map([
                        [
                            h,
                            f
                        ]
                    ]));
                }
                e(navigatedAt, f, undefined, d, _, l, u);
            }
        };
    }
});
let n = require("./module-69190.js");
let a = require("./module-86871.js");
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
