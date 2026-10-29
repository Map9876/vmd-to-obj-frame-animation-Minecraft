import { fetchServerResponse } from "./module-32753.js";
import { createHrefFromUrl } from "./module-29658.js";
import o from "./module-60895.js";
import i from "./module-44707.js";
import s from "./module-35737.js";
import { handleMutable } from "./module-11126.js";
import u from "./module-30637.js";
import { createEmptyCacheNode } from "./module-17297.js";
import { handleSegmentMismatch } from "./module-97332.js";
import d from "./module-48915.js";
import p from "./module-23597.js";
import "./module-66048.js";
export function refreshReducer(state, t) {
    let { origin } = t;
    let h = {};
    let e_canonicalUrl = state.canonicalUrl;
    let e_tree = state.tree;
    h.preserveCustomHistoryState = false;
    let updatedCache = createEmptyCacheNode();
    let includeNextUrl = d.hasInterceptionRouteInCurrentTree(state.tree);
    updatedCache.lazyData = fetchServerResponse(new URL(e_canonicalUrl, origin), {
        flightRouterState: [
            e_tree[0],
            e_tree[1],
            e_tree[2],
            "refetch"
        ],
        nextUrl: includeNextUrl ? state.nextUrl : null
    });
    let navigatedAt = Date.now();
    return updatedCache.lazyData.then(async ({ flightData, canonicalUrl })=>{
        if (typeof flightData === "string") {
            return s.handleExternalUrl(state, h, flightData, state.pushRef.pendingPush);
        }
        for (let r of (updatedCache.lazyData = null, flightData)){
            let { tree, seedData, head, isRootRender } = r;
            if (!isRootRender) {
                console.log("REFRESH FAILED");
                return state;
            }
            let updatedTree = o.applyRouterStatePatchToTree([
                ""
            ], e_tree, tree, state.canonicalUrl);
            if (updatedTree === null) {
                return handleSegmentMismatch(state, t, tree);
            }
            if (i.isNavigatingToNewRootLayout(e_tree, updatedTree)) {
                return s.handleExternalUrl(state, h, e_canonicalUrl, state.pushRef.pendingPush);
            }
            let R = canonicalUrl ? createHrefFromUrl(canonicalUrl) : undefined;
            if (canonicalUrl) {
                h.canonicalUrl = R;
            }
            if (seedData !== null) {
                let e = seedData[1];
                let t = seedData[3];
                updatedCache.rsc = e;
                updatedCache.prefetchRsc = null;
                updatedCache.loading = t;
                u.fillLazyItemsTillLeafWithHead(navigatedAt, updatedCache, undefined, tree, seedData, head, undefined);
                h.prefetchCache = new Map;
            }
            await p.refreshInactiveParallelSegments({
                navigatedAt,
                state,
                updatedTree,
                updatedCache,
                includeNextUrl,
                canonicalUrl: h.canonicalUrl || state.canonicalUrl
            });
            h.cache = updatedCache;
            h.patchedTree = updatedTree;
            e_tree = updatedTree;
        }
        return handleMutable(state, h);
    }, ()=>state);
}
