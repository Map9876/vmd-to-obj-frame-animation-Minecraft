import { invalidateCacheByRouterState } from "./module-94201.js";
import a from "./module-30637.js";
import { createRouterCacheKey } from "./module-69190.js";
import { PAGE_SEGMENT_KEY } from "./module-65360.js";
function s(navigatedAt, t, r, { segmentPath, seedData, tree, head }, l, u) {
    let h = t;
    let _ = r;
    for(let t = 0; t < segmentPath.length; t += 2){
        let r = segmentPath[t];
        let s = segmentPath[t + 1];
        let m = t === segmentPath.length - 2;
        let g = createRouterCacheKey(s);
        let y = _.parallelRoutes.get(r);
        if (!y) {
            continue;
        }
        let v = h.parallelRoutes.get(r);
        if (!(v && v !== y)) {
            v = new Map(y);
            h.parallelRoutes.set(r, v);
        }
        let b = y.get(g);
        let E = v.get(g);
        if (m) {
            if (seedData && (!E || !E.lazyData || E === b)) {
                let t = seedData[0];
                let r = seedData[1];
                let loading = seedData[3];
                E = {
                    lazyData: null,
                    rsc: u || t !== PAGE_SEGMENT_KEY ? r : null,
                    prefetchRsc: null,
                    head: null,
                    prefetchHead: null,
                    loading,
                    parallelRoutes: u && b ? new Map(b.parallelRoutes) : new Map,
                    navigatedAt
                };
                if (b && u) {
                    invalidateCacheByRouterState(E, b, tree);
                }
                if (u) {
                    a.fillLazyItemsTillLeafWithHead(navigatedAt, E, b, tree, seedData, head, l);
                }
                v.set(g, E);
            }
            continue;
        }
        if (E && b) {
            if (E === b) {
                E = {
                    lazyData: E.lazyData,
                    rsc: E.rsc,
                    prefetchRsc: E.prefetchRsc,
                    head: E.head,
                    prefetchHead: E.prefetchHead,
                    parallelRoutes: new Map(E.parallelRoutes),
                    loading: E.loading
                };
                v.set(g, E);
            }
            h = E;
            _ = b;
        }
    }
}
export function fillCacheWithNewSubTreeData(e, t, r, n, a) {
    s(e, t, r, n, a, true);
}
export function fillCacheWithNewSubTreeDataButOnlyLoading(e, t, r, n, a) {
    s(e, t, r, n, a, false);
}
