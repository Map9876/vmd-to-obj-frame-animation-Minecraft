"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "clearCacheNodeDataForSegmentPath", {
    enumerable: true,
    get: function() {
        return function e(t, r, o) {
            let i = o.length <= 2;
            let [s, l] = o;
            let u = a.createRouterCacheKey(l);
            let c = r.parallelRoutes.get(s);
            let f = t.parallelRoutes.get(s);
            if (!(f && f !== c)) {
                f = new Map(c);
                t.parallelRoutes.set(s, f);
            }
            let d = c?.get(u);
            let p = f.get(u);
            if (i) {
                if (!(p && p.lazyData && p !== d)) {
                    f.set(u, {
                        lazyData: null,
                        rsc: null,
                        prefetchRsc: null,
                        head: null,
                        prefetchHead: null,
                        parallelRoutes: new Map,
                        loading: null,
                        navigatedAt: -1
                    });
                }
                return;
            }
            if (!p || !d) {
                if (!p) {
                    f.set(u, {
                        lazyData: null,
                        rsc: null,
                        prefetchRsc: null,
                        head: null,
                        prefetchHead: null,
                        parallelRoutes: new Map,
                        loading: null,
                        navigatedAt: -1
                    });
                }
                return;
            }
            if (p === d) {
                p = {
                    lazyData: p.lazyData,
                    rsc: p.rsc,
                    prefetchRsc: p.prefetchRsc,
                    head: p.head,
                    prefetchHead: p.prefetchHead,
                    parallelRoutes: new Map(p.parallelRoutes),
                    loading: p.loading
                };
                f.set(u, p);
            }
            return e(p, d, n.getNextFlightSegmentPath(o));
        };
    }
});
let n = require("./module-16378.js");
let a = require("./module-69190.js");
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
