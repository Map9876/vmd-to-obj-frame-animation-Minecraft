import { ACTION_NAVIGATE, ACTION_PREFETCH, ACTION_REFRESH, ACTION_RESTORE, ACTION_SERVER_ACTION, PrefetchKind } from "./module-86871.js";
import { reducer } from "./module-68451.js";
import { startTransition } from "./module-61426.js";
import { isThenable } from "./module-54089.js";
import "./module-66048.js";
import { dispatchAppRouterAction } from "./module-76248.js";
import { addBasePath } from "./module-96058.js";
import { createPrefetchURL, isExternalURL } from "./module-17297.js";
import { prefetchReducer } from "./module-43933.js";
import { setLinkForCurrentNavigation } from "./module-63499.js";
function d(actionQueue, setState) {
    if (actionQueue.pending !== null) {
        actionQueue.pending = actionQueue.pending.next;
        if (actionQueue.pending !== null) {
            p({
                actionQueue,
                action: actionQueue.pending,
                setState
            });
        } else if (actionQueue.needsRefresh) {
            actionQueue.needsRefresh = false;
            actionQueue.dispatch({
                type: ACTION_REFRESH,
                origin: window.location.origin
            }, setState);
        }
    }
}
async function p({ actionQueue, action, setState }) {
    let actionQueue_state = actionQueue.state;
    actionQueue.pending = action;
    let action_payload = action.payload;
    let s = actionQueue.action(actionQueue_state, action_payload);
    function l(e) {
        if (!action.discarded) {
            actionQueue.state = e;
            d(actionQueue, setState);
            action.resolve(e);
        }
    }
    if (isThenable(s)) {
        s.then(l, (e)=>{
            d(actionQueue, setState);
            action.reject(e);
        });
    } else {
        l(s);
    }
}
let h = null;
export function createMutableActionQueue(state, t) {
    let r = {
        state,
        dispatch: (e, t)=>((actionQueue, payload, r)=>{
                let a = {
                    resolve: r,
                    reject: ()=>{}
                };
                if (payload.type !== ACTION_RESTORE) {
                    let e = new Promise((resolve, reject)=>{
                        a = {
                            resolve,
                            reject
                        };
                    });
                    startTransition(()=>{
                        r(e);
                    });
                }
                let action = {
                    payload,
                    next: null,
                    resolve: a.resolve,
                    reject: a.reject
                };
                if (actionQueue.pending === null) {
                    actionQueue.last = action;
                    p({
                        actionQueue,
                        action,
                        setState: r
                    });
                } else if (payload.type === ACTION_NAVIGATE || payload.type === ACTION_RESTORE) {
                    actionQueue.pending.discarded = true;
                    action.next = actionQueue.pending.next;
                    if (actionQueue.pending.payload.type === ACTION_SERVER_ACTION) {
                        actionQueue.needsRefresh = true;
                    }
                    p({
                        actionQueue,
                        action,
                        setState: r
                    });
                } else {
                    if (actionQueue.last !== null) {
                        actionQueue.last.next = action;
                    }
                    actionQueue.last = action;
                }
            })(r, e, t),
        action: async (e, t)=>reducer(e, t),
        pending: null,
        last: null,
        onRouterTransitionStart: t !== null && typeof t.onRouterTransitionStart === "function" ? t.onRouterTransitionStart : null
    };
    if (h !== null) {
        throw Object.defineProperty(Error("Internal Next.js Error: createMutableActionQueue was called more than once"), "__NEXT_ERROR_CODE", {
            value: "E624",
            enumerable: false,
            configurable: true
        });
    }
    h = r;
    return r;
}
export function getCurrentAppRouterState() {
    if (h !== null) {
        return h.state;
    }
    return null;
}
function g() {
    if (h !== null) {
        return h.onRouterTransitionStart;
    }
    return null;
}
export function dispatchNavigateAction(e, navigateType, shouldScroll, a) {
    let o = new URL(addBasePath(e), location.href);
    setLinkForCurrentNavigation(a);
    let i = g();
    if (i !== null) {
        i(e, navigateType);
    }
    dispatchAppRouterAction({
        type: ACTION_NAVIGATE,
        url: o,
        isExternalUrl: isExternalURL(o),
        locationSearch: location.search,
        shouldScroll,
        navigateType,
        allowAliasing: true
    });
}
export function dispatchTraverseAction(e, tree) {
    let r = g();
    if (r !== null) {
        r(e, "traverse");
    }
    dispatchAppRouterAction({
        type: ACTION_RESTORE,
        url: new URL(e),
        tree
    });
}
export let publicAppRouterInstance = {
    back: ()=>window.history.back(),
    forward: ()=>window.history.forward(),
    prefetch: (e, t)=>{
        let r = (()=>{
            if (h === null) {
                throw Object.defineProperty(Error("Internal Next.js error: Router action dispatched before initialization."), "__NEXT_ERROR_CODE", {
                    value: "E668",
                    enumerable: false,
                    configurable: true
                });
            }
            return h;
        })();
        let a = createPrefetchURL(e);
        if (a !== null) {
            prefetchReducer(r.state, {
                type: ACTION_PREFETCH,
                url: a,
                kind: t?.kind ?? PrefetchKind.FULL
            });
        }
    },
    replace: (e, t)=>{
        startTransition(()=>{
            var r;
            dispatchNavigateAction(e, "replace", (r = t?.scroll) == null || r, null);
        });
    },
    push: (e, t)=>{
        startTransition(()=>{
            var r;
            dispatchNavigateAction(e, "push", (r = t?.scroll) == null || r, null);
        });
    },
    refresh: ()=>{
        startTransition(()=>{
            dispatchAppRouterAction({
                type: ACTION_REFRESH,
                origin: window.location.origin
            });
        });
    },
    hmrRefresh: ()=>{
        throw Object.defineProperty(Error("hmrRefresh can only be used in development mode. Please use refresh instead."), "__NEXT_ERROR_CODE", {
            value: "E485",
            enumerable: false,
            configurable: true
        });
    }
};
if (window.next) {
    window.next.router = publicAppRouterInstance;
}
