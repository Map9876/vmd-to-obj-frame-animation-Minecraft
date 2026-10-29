import { createHrefFromUrl } from "./module-29658.js";
import a from "./module-30637.js";
import o from "./module-86343.js";
import { STATIC_STALETIME_MS, createSeededPrefetchCacheEntry } from "./module-83571.js";
import { PrefetchKind } from "./module-86871.js";
import l from "./module-23597.js";
import { getFlightDataPartsFromPath } from "./module-16378.js";
export function createInitialRouterState({ navigatedAt, initialFlightData, initialCanonicalUrlParts, initialParallelRoutes, location, couldBeIntercepted, postponed, prerendered }) {
    let y = initialCanonicalUrlParts.join("/");
    let v = getFlightDataPartsFromPath(initialFlightData[0]);
    let { tree, seedData, head } = v;
    let cache = {
        lazyData: null,
        rsc: seedData?.[1],
        prefetchRsc: null,
        head: null,
        prefetchHead: null,
        parallelRoutes: initialParallelRoutes,
        loading: seedData?.[3] ?? null,
        navigatedAt
    };
    let canonicalUrl = location ? createHrefFromUrl(location) : y;
    l.addRefreshMarkerToActiveParallelSegments(tree, canonicalUrl);
    let prefetchCache = new Map;
    if (initialParallelRoutes === null || initialParallelRoutes.size === 0) {
        a.fillLazyItemsTillLeafWithHead(navigatedAt, cache, undefined, tree, seedData, head, undefined);
    }
    let T = {
        tree,
        cache,
        prefetchCache,
        pushRef: {
            pendingPush: false,
            mpaNavigation: false,
            preserveCustomHistoryState: true
        },
        focusAndScrollRef: {
            apply: false,
            onlyHashChange: false,
            hashFragment: null,
            segmentPaths: []
        },
        canonicalUrl,
        nextUrl: (o.extractPathFromFlightRouterState(tree) || location?.pathname) ?? null
    };
    if (location) {
        let url = new URL(`${location.pathname}${location.search}`, location.origin);
        createSeededPrefetchCacheEntry({
            url,
            data: {
                flightData: [
                    v
                ],
                canonicalUrl: undefined,
                couldBeIntercepted: !!couldBeIntercepted,
                prerendered,
                postponed,
                staleTime: prerendered && 1 ? STATIC_STALETIME_MS : -1
            },
            tree: T.tree,
            prefetchCache: T.prefetchCache,
            nextUrl: T.nextUrl,
            kind: prerendered ? PrefetchKind.FULL : PrefetchKind.AUTO
        });
    }
    return T;
}
