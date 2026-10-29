"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "applyRouterStatePatchToTree", {
    enumerable: true,
    get: function() {
        return function e(t, r, n, l) {
            let u;
            let [c, f, d, p, h] = r;
            if (t.length === 1) {
                let e = s(r, n);
                i.addRefreshMarkerToActiveParallelSegments(e, l);
                return e;
            }
            let [_, m] = t;
            if (!o.matchSegment(_, c)) {
                return null;
            }
            if (t.length === 2) {
                u = s(f[m], n);
            } else if ((u = e(a.getNextFlightSegmentPath(t), f[m], n, l)) === null) {
                return null;
            }
            let g = [
                t[0],
                {
                    ...f,
                    [m]: u
                },
                d,
                p
            ];
            if (h) {
                g[4] = true;
            }
            i.addRefreshMarkerToActiveParallelSegments(g, l);
            return g;
        };
    }
});
let n = require("./module-65360.js");
let a = require("./module-16378.js");
let o = require("./module-7460.js");
let i = require("./module-23597.js");
function s(e, t) {
    let [r, a] = e;
    let [i, l] = t;
    if (i === n.DEFAULT_SEGMENT_KEY && r !== n.DEFAULT_SEGMENT_KEY) {
        return e;
    }
    if (o.matchSegment(r, i)) {
        let t = {};
        for(let e in a){
            if (l[e] !== undefined) {
                t[e] = s(a[e], l[e]);
            } else {
                t[e] = a[e];
            }
        }
        for(let e in l){
            if (!t[e]) {
                t[e] = l[e];
            }
        }
        let n = [
            r,
            t
        ];
        if (e[2]) {
            n[2] = e[2];
        }
        if (e[3]) {
            n[3] = e[3];
        }
        if (e[4]) {
            n[4] = e[4];
        }
        return n;
    }
    return t;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
