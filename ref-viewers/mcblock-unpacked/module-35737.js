"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateSegmentsFromPatch", {
    enumerable: true,
    get () {
        return b;
    }
});
Object.defineProperty(exports, "handleExternalUrl", {
    enumerable: true,
    get () {
        return v;
    }
});
Object.defineProperty(exports, "navigateReducer", {
    enumerable: true,
    get () {
        return function e(t, r) {
            let { url, isExternalUrl, navigateType, shouldScroll, allowAliasing } = r;
            let T = {};
            let { hash } = url;
            let w = a.createHrefFromUrl(url);
            let x = navigateType === "push";
            m.prunePrefetchCache(t.prefetchCache);
            T.preserveCustomHistoryState = false;
            T.pendingPush = x;
            if (isExternalUrl) {
                return v(t, T, url.toString(), x);
            }
            if (document.getElementById("__next-page-redirect")) {
                return v(t, T, w, x);
            }
            let A = m.getOrCreatePrefetchCacheEntry({
                url,
                nextUrl: t.nextUrl,
                tree: t.tree,
                prefetchCache: t.prefetchCache,
                allowAliasing
            });
            let { treeAtTimeOfPrefetch, data } = A;
            d.prefetchQueue.bump(data);
            return data.then(({ flightData, canonicalUrl, postponed })=>{
                let O = Date.now();
                let M = false;
                if (!A.lastUsedTime) {
                    A.lastUsedTime = O;
                    M = true;
                }
                if (A.aliased) {
                    let n = new URL(url.href);
                    if (canonicalUrl) {
                        n.pathname = canonicalUrl.pathname;
                    }
                    let a = y.handleAliasedPrefetchEntry(O, t, flightData, n, T);
                    if (a === false) {
                        return e(t, {
                            ...r,
                            allowAliasing: false
                        });
                    }
                    return a;
                }
                if (typeof flightData === "string") {
                    return v(t, T, flightData, x);
                }
                let N = canonicalUrl ? a.createHrefFromUrl(canonicalUrl) : w;
                if (hash && t.canonicalUrl.split("#", 1)[0] === N.split("#", 1)[0]) {
                    T.onlyHashChange = true;
                    T.canonicalUrl = N;
                    T.shouldScroll = shouldScroll;
                    T.hashFragment = hash;
                    T.scrollableSegments = [];
                    return c.handleMutable(t, T);
                }
                let t_tree = t.tree;
                let t_cache = t.cache;
                let D = [];
                for (let e of flightData){
                    let { pathToSegment, seedData, head, isHeadPartial, isRootRender } = e;
                    let y = e.tree;
                    let R = [
                        "",
                        ...pathToSegment
                    ];
                    let P = i.applyRouterStatePatchToTree(R, t_tree, y, w);
                    if (P === null) {
                        P = i.applyRouterStatePatchToTree(R, treeAtTimeOfPrefetch, y, w);
                    }
                    if (P !== null) {
                        if (seedData && isRootRender && postponed) {
                            let e = _.startPPRNavigation(O, t_cache, t_tree, y, seedData, head, isHeadPartial, false, D);
                            if (e !== null) {
                                if (e.route === null) {
                                    return v(t, T, w, x);
                                }
                                P = e.route;
                                let r = e.node;
                                if (r !== null) {
                                    T.cache = r;
                                }
                                let flightRouterState = e.dynamicRequestTree;
                                if (flightRouterState !== null) {
                                    let r = n.fetchServerResponse(new URL(N, url.origin), {
                                        flightRouterState,
                                        nextUrl: t.nextUrl
                                    });
                                    _.listenForDynamicRequest(e, r);
                                }
                            } else {
                                P = y;
                            }
                        } else {
                            if (l.isNavigatingToNewRootLayout(t_tree, P)) {
                                return v(t, T, w, x);
                            }
                            let n = p.createEmptyCacheNode();
                            let a = false;
                            for (let t of (A.status !== u.PrefetchCacheEntryStatus.stale || M ? a = f.applyFlightData(O, t_cache, n, e, A) : (a = ((e, t_cache_1, pathToSegment_1, n)=>{
                                let a = false;
                                for (let o of (e.rsc = t_cache_1.rsc, e.prefetchRsc = t_cache_1.prefetchRsc, e.loading = t_cache_1.loading, e.parallelRoutes = new Map(t_cache_1.parallelRoutes), b(n).map((e)=>[
                                        ...pathToSegment_1,
                                        ...e
                                    ]))){
                                    g.clearCacheNodeDataForSegmentPath(e, t_cache_1, o);
                                    a = true;
                                }
                                return a;
                            })(n, t_cache, pathToSegment, y), A.lastUsedTime = O), s.shouldHardNavigate(R, t_tree) ? (n.rsc = t_cache.rsc, n.prefetchRsc = t_cache.prefetchRsc, o.invalidateCacheBelowFlightSegmentPath(n, t_cache, pathToSegment), T.cache = n) : a && (T.cache = n, t_cache = n), b(y))){
                                let e = [
                                    ...pathToSegment,
                                    ...t
                                ];
                                if (e[e.length - 1] !== h.DEFAULT_SEGMENT_KEY) {
                                    D.push(e);
                                }
                            }
                        }
                        t_tree = P;
                    }
                }
                T.patchedTree = t_tree;
                T.canonicalUrl = N;
                T.scrollableSegments = D;
                T.hashFragment = hash;
                T.shouldScroll = shouldScroll;
                return c.handleMutable(t, T);
            }, ()=>t);
        };
    }
});
let n = require("./module-32753.js");
let a = require("./module-29658.js");
let o = require("./module-75597.js");
let i = require("./module-60895.js");
let s = require("./module-58130.js");
let l = require("./module-44707.js");
let u = require("./module-86871.js");
let c = require("./module-11126.js");
let f = require("./module-77609.js");
let d = require("./module-43933.js");
let p = require("./module-17297.js");
let h = require("./module-65360.js");
let _ = require("./module-87317.js");
let m = require("./module-83571.js");
let g = require("./module-1281.js");
let y = require("./module-21854.js");
function v(e, t, r, n) {
    t.mpaNavigation = true;
    t.canonicalUrl = r;
    t.pendingPush = n;
    t.scrollableSegments = undefined;
    return c.handleMutable(e, t);
}
function b(e) {
    let t = [];
    let [r, n] = e;
    if (Object.keys(n).length === 0) {
        return [
            [
                r
            ]
        ];
    }
    for (let [e, a] of Object.entries(n)){
        for (let n of b(a)){
            if (r === "") {
                t.push([
                    e,
                    ...n
                ]);
            } else {
                t.push([
                    r,
                    e,
                    ...n
                ]);
            }
        }
    }
    return t;
}
require("./module-66048.js");
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
