import "./module-28140.js";
import "./module-49417.js";
import "./module-86897.js";
import * as i from "./module-61426.js";
import { AppRouterContext, GlobalLayoutRouterContext, LayoutRouterContext } from "./module-46752.js";
import { ACTION_RESTORE } from "./module-86871.js";
import { createHrefFromUrl } from "./module-29658.js";
import { PathParamsContext, PathnameContext, SearchParamsContext } from "./module-3865.js";
import { dispatchAppRouterAction, useActionQueue } from "./module-76248.js";
import { isBot } from "./module-93913.js";
import { addBasePath } from "./module-96058.js";
import { AppRouterAnnouncer } from "./module-43443.js";
import { RedirectBoundary } from "./module-10531.js";
import { findHeadInCache } from "./module-10836.js";
import { unresolvedThenable } from "./module-48359.js";
import { removeBasePath } from "./module-51755.js";
import { hasBasePath } from "./module-92929.js";
import b from "./module-86343.js";
import { useNavFailureHandler } from "./module-61489.js";
import { dispatchTraverseAction, publicAppRouterInstance } from "./module-11807.js";
import { getRedirectTypeFromError, getURLFromRedirectError } from "./module-86542.js";
import { RedirectType, isRedirectError } from "./module-86437.js";
import "./module-63499.js";
import O from "./module-28890.js";
import errorComponent from "./module-57150.js";
import { RootLayoutBoundary } from "./module-24431.js";
let w = {};
export function isExternalURL(e) {
    return e.origin !== window.location.origin;
}
export function createPrefetchURL(e) {
    let t;
    if (isBot(window.navigator.userAgent)) {
        return null;
    }
    try {
        t = new URL(addBasePath(e), window.location.href);
    } catch (t) {
        throw Object.defineProperty(Error(`Cannot prefetch '${e}' because it cannot be converted to a URL.`), "__NEXT_ERROR_CODE", {
            value: "E234",
            enumerable: false,
            configurable: true
        });
    }
    if (isExternalURL(t)) {
        return null;
    }
    return t;
}
function CComponent({ appRouterState }) {
    i.useInsertionEffect(()=>{
        let { tree, pushRef, canonicalUrl } = appRouterState;
        let a = {
            ...pushRef.preserveCustomHistoryState ? window.history.state : {},
            __NA: true,
            __PRIVATE_NEXTJS_INTERNALS_TREE: tree
        };
        if (pushRef.pendingPush && createHrefFromUrl(new URL(window.location.href)) !== canonicalUrl) {
            pushRef.pendingPush = false;
            window.history.pushState(a, "", canonicalUrl);
        } else {
            window.history.replaceState(a, "", canonicalUrl);
        }
    }, [
        appRouterState
    ]);
    i.useEffect(()=>{}, [
        appRouterState.nextUrl,
        appRouterState.tree
    ]);
    return null;
}
export function createEmptyCacheNode() {
    return {
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
function N(e) {
    if (e == null) {
        e = {};
    }
    let state = window.history.state;
    let r = state?.__NA;
    if (r) {
        e.__NA = r;
    }
    let n = state?.__PRIVATE_NEXTJS_INTERNALS_TREE;
    if (n) {
        e.__PRIVATE_NEXTJS_INTERNALS_TREE = n;
    }
    return e;
}
function KComponent({ headCacheNode }) {
    let r = headCacheNode !== null ? headCacheNode.head : null;
    let n = headCacheNode !== null ? headCacheNode.prefetchHead : null;
    let a = n !== null ? n : r;
    return i.useDeferredValue(r, a);
}
function IComponent({ actionQueue, assetPrefix, globalError }) {
    let t;
    let appRouterState = useActionQueue(actionQueue);
    let { canonicalUrl } = appRouterState;
    let { searchParams, pathname } = i.useMemo(()=>{
        let e = new URL(canonicalUrl, window.location.href);
        return {
            searchParams: e.searchParams,
            pathname: hasBasePath(e.pathname) ? removeBasePath(e.pathname) : e.pathname
        };
    }, [
        canonicalUrl
    ]);
    i.useEffect(()=>{
        function e(e) {
            if (e.persisted && window.history.state?.__PRIVATE_NEXTJS_INTERNALS_TREE) {
                w.pendingMpaPath = undefined;
                dispatchAppRouterAction({
                    type: ACTION_RESTORE,
                    url: new URL(window.location.href),
                    tree: window.history.state.__PRIVATE_NEXTJS_INTERNALS_TREE
                });
            }
        }
        window.addEventListener("pageshow", e);
        return ()=>{
            window.removeEventListener("pageshow", e);
        };
    }, []);
    i.useEffect(()=>{
        function e(e) {
            let t = "reason" in e ? e.reason : e.error;
            if (isRedirectError(t)) {
                e.preventDefault();
                let r = getURLFromRedirectError(t);
                if (getRedirectTypeFromError(t) === RedirectType.push) {
                    publicAppRouterInstance.push(r, {});
                } else {
                    publicAppRouterInstance.replace(r, {});
                }
            }
        }
        window.addEventListener("error", e);
        window.addEventListener("unhandledrejection", e);
        return ()=>{
            window.removeEventListener("error", e);
            window.removeEventListener("unhandledrejection", e);
        };
    }, []);
    let { pushRef } = appRouterState;
    if (pushRef.mpaNavigation) {
        if (w.pendingMpaPath !== canonicalUrl) {
            let e = window.location;
            if (pushRef.pendingPush) {
                e.assign(canonicalUrl);
            } else {
                e.replace(canonicalUrl);
            }
            w.pendingMpaPath = canonicalUrl;
        }
        throw unresolvedThenable;
    }
    i.useEffect(()=>{
        let e = window.history.pushState.bind(window.history);
        let t = window.history.replaceState.bind(window.history);
        let r = (e)=>{
            let href = window.location.href;
            let tree_1 = window.history.state?.__PRIVATE_NEXTJS_INTERNALS_TREE;
            i.startTransition(()=>{
                dispatchAppRouterAction({
                    type: ACTION_RESTORE,
                    url: new URL(e ?? href, href),
                    tree: tree_1
                });
            });
        };
        window.history.pushState = function(t, n, a) {
            if (!(t?.__NA || t?._N)) {
                t = N(t);
                if (a) {
                    r(a);
                }
            }
            return e(t, n, a);
        };
        window.history.replaceState = function(e, n, a) {
            if (!(e?.__NA || e?._N)) {
                e = N(e);
                if (a) {
                    r(a);
                }
            }
            return t(e, n, a);
        };
        let n = (e)=>{
            if (e.state) {
                if (!e.state.__NA) {
                    return void window.location.reload();
                }
                i.startTransition(()=>{
                    dispatchTraverseAction(window.location.href, e.state.__PRIVATE_NEXTJS_INTERNALS_TREE);
                });
            }
        };
        window.addEventListener("popstate", n);
        return ()=>{
            window.history.pushState = e;
            window.history.replaceState = t;
            window.removeEventListener("popstate", n);
        };
    }, []);
    let { cache, tree, nextUrl, focusAndScrollRef } = appRouterState;
    let D = i.useMemo(()=>findHeadInCache(cache, tree[1]), [
        cache,
        tree
    ]);
    let L = i.useMemo(()=>b.getSelectedParams(tree), [
        tree
    ]);
    let U = i.useMemo(()=>({
            parentTree: tree,
            parentCacheNode: cache,
            parentSegmentPath: null,
            url: canonicalUrl
        }), [
        tree,
        cache,
        canonicalUrl
    ]);
    let F = i.useMemo(()=>({
            tree,
            focusAndScrollRef,
            nextUrl
        }), [
        tree,
        focusAndScrollRef,
        nextUrl
    ]);
    if (D !== null) {
        let [headCacheNode, r, n] = D;
        t = <KComponent key={r} headCacheNode={headCacheNode}/>;
    } else {
        t = null;
    }
    let $ = <RedirectBoundary>{t}<RootLayoutBoundary>{cache.rsc}</RootLayoutBoundary><AppRouterAnnouncer tree={tree}/></RedirectBoundary>;
    $ = <O errorComponent={globalError[0]} errorStyles={globalError[1]}>{$}</O>;
    return <><CComponent appRouterState={appRouterState}/><HComponent/><PathParamsContext.Provider value={L}><PathnameContext.Provider value={pathname}><SearchParamsContext.Provider value={searchParams}><GlobalLayoutRouterContext.Provider value={F}><AppRouterContext.Provider value={publicAppRouterInstance}><LayoutRouterContext.Provider value={U}>{$}</LayoutRouterContext.Provider></AppRouterContext.Provider></GlobalLayoutRouterContext.Provider></SearchParamsContext.Provider></PathnameContext.Provider></PathParamsContext.Provider></>;
}
function DComponent({ actionQueue, globalErrorState, assetPrefix }) {
    useNavFailureHandler();
    let a = <IComponent actionQueue={actionQueue} assetPrefix={assetPrefix} globalError={globalErrorState}/>;
    return <O errorComponent={errorComponent}>{a}</O>;
}
export { DComponent as default };
let L = new Set;
let U = new Set;
function HComponent() {
    let [, setE] = i.default.useState(0);
    let L_size = L.size;
    i.useEffect(()=>{
        let r = ()=>setE((e)=>e + 1);
        U.add(r);
        if (L_size !== L.size) {
            r();
        }
        return ()=>{
            U.delete(r);
        };
    }, [
        L_size,
        setE
    ]);
    return [
        ...L
    ].map((e, t)=><link key={t} rel="stylesheet" href={`${e}`} precedence="next"/>);
}
globalThis._N_E_STYLE_LOAD = function(e) {
    let L_size = L.size;
    L.add(e);
    if (L.size !== L_size) {
        U.forEach((e)=>e());
    }
    return Promise.resolve();
};
if ((typeof DComponent === "function" || typeof DComponent === "object" && DComponent !== null) && DComponent.__esModule === undefined) {
    Object.defineProperty(DComponent, "__esModule", {
        value: true
    });
    Object.assign(DComponent, {
        createEmptyCacheNode,
        createPrefetchURL,
        default: DComponent,
        isExternalURL
    });
}
