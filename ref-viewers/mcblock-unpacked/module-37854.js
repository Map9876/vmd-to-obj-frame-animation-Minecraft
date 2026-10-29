import { createHrefFromUrl } from "./module-29658.js";
import a from "./module-86343.js";
import "./module-87317.js";
export function restoreReducer(e, { url, tree }) {
    let canonicalUrl = createHrefFromUrl(url);
    let tree_1 = tree || e.tree;
    let e_cache = e.cache;
    return {
        canonicalUrl,
        pushRef: {
            pendingPush: false,
            mpaNavigation: false,
            preserveCustomHistoryState: true
        },
        focusAndScrollRef: e.focusAndScrollRef,
        cache: e_cache,
        prefetchCache: e.prefetchCache,
        tree: tree_1,
        nextUrl: a.extractPathFromFlightRouterState(tree_1) ?? url.pathname
    };
}
