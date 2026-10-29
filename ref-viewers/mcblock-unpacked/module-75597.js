"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "invalidateCacheBelowFlightSegmentPath", {
    enumerable: true,
    get: function() {
        return function e(t, r, o) {
            let i = o.length <= 2;
            let [s, l] = o;
            let u = n.createRouterCacheKey(l);
            let c = r.parallelRoutes.get(s);
            if (!c) {
                return;
            }
            let f = t.parallelRoutes.get(s);
            if (!(f && f !== c)) {
                f = new Map(c);
                t.parallelRoutes.set(s, f);
            }
            if (i) {
                return void f.delete(u);
            }
            let d = c.get(u);
            let p = f.get(u);
            if (p && d) {
                if (p === d) {
                    p = {
                        lazyData: p.lazyData,
                        rsc: p.rsc,
                        prefetchRsc: p.prefetchRsc,
                        head: p.head,
                        prefetchHead: p.prefetchHead,
                        parallelRoutes: new Map(p.parallelRoutes)
                    };
                    f.set(u, p);
                }
                e(p, d, a.getNextFlightSegmentPath(o));
            }
        };
    }
});
let n = require("./module-69190.js");
let a = require("./module-16378.js");
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
