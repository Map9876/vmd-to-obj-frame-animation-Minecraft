"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addRefreshMarkerToActiveParallelSegments", {
    enumerable: true,
    get () {
        return function e(t, r) {
            let [n, a, , i] = t;
            for(let s in n.includes(o.PAGE_SEGMENT_KEY) && i !== "refresh" && (t[2] = r, t[3] = "refresh"), a){
                e(a[s], r);
            }
        };
    }
});
Object.defineProperty(exports, "refreshInactiveParallelSegments", {
    enumerable: true,
    get () {
        return i;
    }
});
let n = require("./module-77609.js");
let a = require("./module-32753.js");
let o = require("./module-65360.js");
async function i(e) {
    let fetchedSegments = new Set;
    await s({
        ...e,
        rootTree: e.updatedTree,
        fetchedSegments
    });
}
async function s({ navigatedAt, state, updatedTree, updatedCache, includeNextUrl, fetchedSegments, rootTree = updatedTree, canonicalUrl }) {
    let [, d, p, h] = updatedTree;
    let _ = [];
    if (p && p !== canonicalUrl && h === "refresh" && !fetchedSegments.has(p)) {
        fetchedSegments.add(p);
        let e = a.fetchServerResponse(new URL(p, location.origin), {
            flightRouterState: [
                rootTree[0],
                rootTree[1],
                rootTree[2],
                "refetch"
            ],
            nextUrl: includeNextUrl ? state.nextUrl : null
        }).then(({ flightData })=>{
            if (typeof flightData !== "string") {
                for (let e of flightData){
                    n.applyFlightData(navigatedAt, updatedCache, updatedCache, e);
                }
            }
        });
        _.push(e);
    }
    for(let e in d){
        let n = s({
            navigatedAt,
            state,
            updatedTree: d[e],
            updatedCache,
            includeNextUrl,
            fetchedSegments,
            rootTree,
            canonicalUrl
        });
        _.push(n);
    }
    await Promise.all(_);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
