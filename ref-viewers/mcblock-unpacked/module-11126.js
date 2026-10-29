import n from "./module-86343.js";
function a(e) {
    return e !== undefined;
}
export function handleMutable(e, t) {
    let r;
    let i = (r = t.shouldScroll) == null || r;
    let e_nextUrl = e.nextUrl;
    if (a(t.patchedTree)) {
        let r = n.computeChangedPath(e.tree, t.patchedTree);
        if (r) {
            e_nextUrl = r;
        } else if (!e_nextUrl) {
            e_nextUrl = e.canonicalUrl;
        }
    }
    return {
        canonicalUrl: a(t.canonicalUrl) ? t.canonicalUrl === e.canonicalUrl ? e.canonicalUrl : t.canonicalUrl : e.canonicalUrl,
        pushRef: {
            pendingPush: a(t.pendingPush) ? t.pendingPush : e.pushRef.pendingPush,
            mpaNavigation: a(t.mpaNavigation) ? t.mpaNavigation : e.pushRef.mpaNavigation,
            preserveCustomHistoryState: a(t.preserveCustomHistoryState) ? t.preserveCustomHistoryState : e.pushRef.preserveCustomHistoryState
        },
        focusAndScrollRef: {
            apply: !!i && (!!a(t?.scrollableSegments) || e.focusAndScrollRef.apply),
            onlyHashChange: t.onlyHashChange || false,
            hashFragment: i ? t.hashFragment && t.hashFragment !== "" ? decodeURIComponent(t.hashFragment.slice(1)) : e.focusAndScrollRef.hashFragment : null,
            segmentPaths: i ? t?.scrollableSegments ?? e.focusAndScrollRef.segmentPaths : []
        },
        cache: t.cache ? t.cache : e.cache,
        prefetchCache: t.prefetchCache ? t.prefetchCache : e.prefetchCache,
        tree: a(t.patchedTree) ? t.patchedTree : e.tree,
        nextUrl: e_nextUrl
    };
}
