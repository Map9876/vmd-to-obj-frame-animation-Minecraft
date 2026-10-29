import "./module-11807.js";
import { createPrefetchURL } from "./module-17297.js";
import { FetchStrategy, PrefetchPriority, cancelPrefetchTask, createCacheKey, isPrefetchTaskDirty, schedulePrefetchTask } from "./module-66048.js";
import { startTransition } from "./module-61426.js";
import { PrefetchKind } from "./module-86871.js";
import { InvariantError } from "./module-48302.js";
let l = null;
export let PENDING_LINK_STATUS = {
    pending: true
};
export let IDLE_LINK_STATUS = {
    pending: false
};
export function setLinkForCurrentNavigation(e) {
    startTransition(()=>{
        l?.setOptimisticLinkStatus(IDLE_LINK_STATUS);
        e?.setOptimisticLinkStatus(PENDING_LINK_STATUS);
        l = e;
    });
}
export function unmountLinkForCurrentNavigation(e) {
    if (l === e) {
        l = null;
    }
}
let p = typeof WeakMap === "function" ? new WeakMap : new Map;
let h = new Set;
let _ = typeof IntersectionObserver === "function" ? new IntersectionObserver(function(e) {
    for (let t of e){
        let e = t.intersectionRatio > 0;
        onLinkVisibilityChanged(t.target, e);
    }
}, {
    rootMargin: "200px"
}) : null;
function m(e, t) {
    if (p.get(e) !== undefined) {
        unmountPrefetchableInstance(e);
    }
    p.set(e, t);
    if (_ !== null) {
        _.observe(e);
    }
}
function g(e) {
    try {
        return createPrefetchURL(e);
    } catch (t) {
        (typeof reportError === "function" ? reportError : console.error)(`Cannot prefetch '${e}' because it cannot be converted to a URL.`);
        return null;
    }
}
export function mountLinkInstance(e, t, r, n, a, setOptimisticLinkStatus) {
    if (a) {
        let a = g(t);
        if (a !== null) {
            let t = {
                router: r,
                fetchStrategy: n,
                isVisible: false,
                prefetchTask: null,
                prefetchHref: a.href,
                setOptimisticLinkStatus
            };
            m(e, t);
            return t;
        }
    }
    return {
        router: r,
        fetchStrategy: n,
        isVisible: false,
        prefetchTask: null,
        prefetchHref: null,
        setOptimisticLinkStatus
    };
}
export function mountFormInstance(e, t, r, n) {
    let a = g(t);
    if (a !== null) {
        m(e, {
            router: r,
            fetchStrategy: n,
            isVisible: false,
            prefetchTask: null,
            prefetchHref: a.href,
            setOptimisticLinkStatus: null
        });
    }
}
export function unmountPrefetchableInstance(e) {
    let t = p.get(e);
    if (t !== undefined) {
        p.delete(e);
        h.delete(t);
        let r = t.prefetchTask;
        if (r !== null) {
            cancelPrefetchTask(r);
        }
    }
    if (_ !== null) {
        _.unobserve(e);
    }
}
export function onLinkVisibilityChanged(e, t) {
    let r = p.get(e);
    if (r !== undefined) {
        r.isVisible = t;
        if (t) {
            h.add(r);
        } else {
            h.delete(r);
        }
        S(r, PrefetchPriority.Default);
    }
}
export function onNavigationIntent(e, t) {
    let r = p.get(e);
    if (r !== undefined && r !== undefined) {
        S(r, PrefetchPriority.Intent);
    }
}
function S(e, t) {
    let r;
    let e_prefetchTask = e.prefetchTask;
    if (!e.isVisible) {
        if (e_prefetchTask !== null) {
            cancelPrefetchTask(e_prefetchTask);
        }
        return;
    }
    r = e;
    (async ()=>{
        let kind;
        switch(r.fetchStrategy){
            case FetchStrategy.PPR:
                kind = PrefetchKind.AUTO;
                break;
            case FetchStrategy.Full:
                kind = PrefetchKind.FULL;
                break;
            case FetchStrategy.PPRRuntime:
                throw Object.defineProperty(new InvariantError("FetchStrategy.PPRRuntime should never be used when `experimental.clientSegmentCache` is disabled"), "__NEXT_ERROR_CODE", {
                    value: "E772",
                    enumerable: false,
                    configurable: true
                });
            default:
                r.fetchStrategy;
                kind = undefined;
        }
        return r.router.prefetch(r.prefetchHref, {
            kind
        });
    })().catch((e)=>{});
}
export function pingVisibleLinks(e, t) {
    for (let r of h){
        let n = r.prefetchTask;
        if (n !== null && !isPrefetchTaskDirty(n, e, t)) {
            continue;
        }
        if (n !== null) {
            cancelPrefetchTask(n);
        }
        let o = createCacheKey(r.prefetchHref, e);
        r.prefetchTask = schedulePrefetchTask(o, t, r.fetchStrategy, PrefetchPriority.Default, null);
    }
}
