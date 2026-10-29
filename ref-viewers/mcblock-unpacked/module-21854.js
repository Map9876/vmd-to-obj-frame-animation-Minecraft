import { DEFAULT_SEGMENT_KEY, PAGE_SEGMENT_KEY, addSearchParamsIfPageSegment } from "./module-65360.js";
import { createEmptyCacheNode } from "./module-17297.js";
import o from "./module-60895.js";
import { createHrefFromUrl } from "./module-29658.js";
import { createRouterCacheKey } from "./module-69190.js";
import { fillCacheWithNewSubTreeDataButOnlyLoading } from "./module-60543.js";
import { handleMutable } from "./module-11126.js";
import c from "./module-35737.js";
export function handleAliasedPrefetchEntry(e, t, r, f, p) {
    let h;
    let t_tree = t.tree;
    let t_cache = t.cache;
    let g = createHrefFromUrl(f);
    let y = [];
    if (typeof r === "string") {
        return false;
    }
    for (let t of r){
        if (!function e(t) {
            if (!t) {
                return false;
            }
            let r = t[2];
            if (t[3]) {
                return true;
            }
            for(let t in r){
                if (e(r[t])) {
                    return true;
                }
            }
            return false;
        }(t.seedData)) {
            continue;
        }
        let r = t.tree;
        r = addSearchParamsToPageSegments(r, Object.fromEntries(f.searchParams));
        let { seedData, isRootRender, pathToSegment } = t;
        let v = [
            "",
            ...pathToSegment
        ];
        r = addSearchParamsToPageSegments(r, Object.fromEntries(f.searchParams));
        let b = o.applyRouterStatePatchToTree(v, t_tree, r, g);
        let E = createEmptyCacheNode();
        if (isRootRender && seedData) {
            let t = seedData[1];
            E.loading = seedData[3];
            E.rsc = t;
            (function e(navigatedAt, r, t_cache_1, o, seedData_1) {
                if (Object.keys(o[1]).length !== 0) {
                    for(let l in o[1]){
                        let u;
                        let c = o[1][l];
                        let f = c[0];
                        let d = createRouterCacheKey(f);
                        let p = seedData_1 !== null && seedData_1[2][l] !== undefined ? seedData_1[2][l] : null;
                        if (p !== null) {
                            let e = p[1];
                            let loading = p[3];
                            u = {
                                lazyData: null,
                                rsc: f.includes(PAGE_SEGMENT_KEY) ? null : e,
                                prefetchRsc: null,
                                head: null,
                                prefetchHead: null,
                                parallelRoutes: new Map,
                                loading,
                                navigatedAt
                            };
                        } else {
                            u = {
                                lazyData: null,
                                rsc: null,
                                prefetchRsc: null,
                                head: null,
                                prefetchHead: null,
                                parallelRoutes: new Map,
                                loading: null,
                                navigatedAt: -1
                            };
                        }
                        let h = r.parallelRoutes.get(l);
                        if (h) {
                            h.set(d, u);
                        } else {
                            r.parallelRoutes.set(l, new Map([
                                [
                                    d,
                                    u
                                ]
                            ]));
                        }
                        e(navigatedAt, u, t_cache_1, c, p);
                    }
                }
            })(e, E, t_cache, r, seedData);
        } else {
            E.rsc = t_cache.rsc;
            E.prefetchRsc = t_cache.prefetchRsc;
            E.loading = t_cache.loading;
            E.parallelRoutes = new Map(t_cache.parallelRoutes);
            fillCacheWithNewSubTreeDataButOnlyLoading(e, E, t_cache, t);
        }
        for (let e of (b && (t_tree = b, t_cache = E, h = true), c.generateSegmentsFromPatch(r))){
            let r = [
                ...t.pathToSegment,
                ...e
            ];
            if (r[r.length - 1] !== DEFAULT_SEGMENT_KEY) {
                y.push(r);
            }
        }
    }
    return !!h && (p.patchedTree = t_tree, p.cache = t_cache, p.canonicalUrl = g, p.hashFragment = f.hash, p.scrollableSegments = y, handleMutable(t, p));
}
export function addSearchParamsToPageSegments([r, a, ...o], t) {
    if (r.includes(PAGE_SEGMENT_KEY)) {
        return [
            addSearchParamsIfPageSegment(r, t),
            a,
            ...o
        ];
    }
    let i = {};
    for (let [e, r] of Object.entries(a)){
        i[e] = addSearchParamsToPageSegments(r, t);
    }
    return [
        r,
        i,
        ...o
    ];
}
