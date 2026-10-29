import { PromiseQueue } from "./module-79889.js";
import { getOrCreatePrefetchCacheEntry, prunePrefetchCache } from "./module-83571.js";
export let prefetchQueue = new PromiseQueue(5);
export let prefetchReducer = function(e, t) {
    prunePrefetchCache(e.prefetchCache);
    let { url } = t;
    getOrCreatePrefetchCacheEntry({
        url,
        nextUrl: e.nextUrl,
        prefetchCache: e.prefetchCache,
        kind: t.kind,
        tree: e.tree,
        allowAliasing: true
    });
    return e;
};
