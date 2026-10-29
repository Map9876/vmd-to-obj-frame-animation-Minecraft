import { callServer } from "./module-41209.js";
import { findSourceMapURL } from "./module-85153.js";
import { ACTION_HEADER, NEXT_ACTION_NOT_FOUND_HEADER, NEXT_IS_PRERENDER_HEADER, NEXT_ROUTER_STATE_TREE_HEADER, NEXT_URL, RSC_CONTENT_TYPE_HEADER } from "./module-52486.js";
import { UnrecognizedActionError } from "./module-12845.js";
import s from "./module-99062.js";
import { PrefetchKind } from "./module-86871.js";
import { assignLocation } from "./module-66640.js";
import { createHrefFromUrl } from "./module-29658.js";
import f from "./module-35737.js";
import d from "./module-60895.js";
import p from "./module-44707.js";
import { handleMutable } from "./module-11126.js";
import _ from "./module-30637.js";
import { createEmptyCacheNode } from "./module-17297.js";
import g from "./module-48915.js";
import { handleSegmentMismatch } from "./module-97332.js";
import v from "./module-23597.js";
import { normalizeFlightData, prepareFlightRouterStateForRequest } from "./module-16378.js";
import { getRedirectError } from "./module-86542.js";
import { RedirectType } from "./module-86437.js";
import { createSeededPrefetchCacheEntry } from "./module-83571.js";
import { removeBasePath } from "./module-51755.js";
import { hasBasePath } from "./module-92929.js";
import { extractInfoFromServerReferenceId, omitUnusedArgs } from "./module-77519.js";
import "./module-66048.js";
let s_createFromFetch = s.createFromFetch;
async function w(state, t, { actionId, actionArgs }) {
    let redirectType;
    let revalidatedParts;
    let actionResult;
    let actionFlightData;
    let temporaryReferences = s.createTemporaryReferenceSet();
    let m = extractInfoFromServerReferenceId(actionId);
    let g = m.type === "use-cache" ? omitUnusedArgs(actionArgs, m) : actionArgs;
    let body = await s.encodeReply(g, {
        temporaryReferences
    });
    let v = await fetch(state.canonicalUrl, {
        method: "POST",
        headers: {
            Accept: RSC_CONTENT_TYPE_HEADER,
            [ACTION_HEADER]: actionId,
            [NEXT_ROUTER_STATE_TREE_HEADER]: prepareFlightRouterStateForRequest(state.tree),
            ...{},
            ...t ? {
                [NEXT_URL]: t
            } : {}
        },
        body
    });
    if (v.headers.get(NEXT_ACTION_NOT_FOUND_HEADER) === "1") {
        throw Object.defineProperty(new UnrecognizedActionError(`Server Action "${actionId}" was not found on the server. 
Read more: https://nextjs.org/docs/messages/failed-to-find-server-action`), "__NEXT_ERROR_CODE", {
            value: "E715",
            enumerable: false,
            configurable: true
        });
    }
    let E = v.headers.get("x-action-redirect");
    let [S, P] = E?.split(";") || [];
    switch(P){
        case "push":
            redirectType = RedirectType.push;
            break;
        case "replace":
            redirectType = RedirectType.replace;
            break;
        default:
            redirectType = undefined;
    }
    let isPrerender = !!v.headers.get(NEXT_IS_PRERENDER_HEADER);
    try {
        let e = JSON.parse(v.headers.get("x-action-revalidated") || "[[],0,0]");
        revalidatedParts = {
            paths: e[0] || [],
            tag: !!e[1],
            cookie: e[2]
        };
    } catch (e) {
        revalidatedParts = x;
    }
    let redirectLocation = S ? assignLocation(S, new URL(state.canonicalUrl, window.location.href)) : undefined;
    let A = v.headers.get("content-type");
    let C = !!(A && A.startsWith(RSC_CONTENT_TYPE_HEADER));
    if (!C && !redirectLocation) {
        throw Object.defineProperty(Error(v.status >= 400 && A === "text/plain" ? await v.text() : "An unexpected response was received from the server."), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if (C) {
        let e = await s_createFromFetch(Promise.resolve(v), {
            callServer,
            findSourceMapURL,
            temporaryReferences
        });
        actionResult = redirectLocation ? undefined : e.a;
        actionFlightData = normalizeFlightData(e.f);
    } else {
        actionResult = undefined;
        actionFlightData = undefined;
    }
    return {
        actionResult,
        actionFlightData,
        redirectLocation,
        redirectType,
        revalidatedParts,
        isPrerender
    };
}
let x = {
    paths: [],
    tag: false,
    cookie: false
};
export function serverActionReducer(state, t) {
    let { resolve, reject } = t;
    let a = {};
    let e_tree = state.tree;
    a.preserveCustomHistoryState = false;
    let i = state.nextUrl && g.hasInterceptionRouteInCurrentTree(state.tree) ? state.nextUrl : null;
    let navigatedAt = Date.now();
    return w(state, i, t).then(async (u)=>{
        let g;
        let { actionResult, actionFlightData, redirectLocation, redirectType, isPrerender, revalidatedParts } = u;
        if (redirectLocation) {
            if (redirectType === RedirectType.replace) {
                state.pushRef.pendingPush = false;
                a.pendingPush = false;
            } else {
                state.pushRef.pendingPush = true;
                a.pendingPush = true;
            }
            a.canonicalUrl = g = createHrefFromUrl(redirectLocation, false);
        }
        if (!actionFlightData) {
            resolve(actionResult);
            if (redirectLocation) {
                return f.handleExternalUrl(state, a, redirectLocation.href, state.pushRef.pendingPush);
            }
            return state;
        }
        if (typeof actionFlightData === "string") {
            resolve(actionResult);
            return f.handleExternalUrl(state, a, actionFlightData, state.pushRef.pendingPush);
        }
        let C = revalidatedParts.paths.length > 0 || revalidatedParts.tag || revalidatedParts.cookie;
        for (let n of actionFlightData){
            let { tree, seedData, head, isRootRender } = n;
            if (!isRootRender) {
                console.log("SERVER ACTION APPLY FAILED");
                resolve(actionResult);
                return state;
            }
            let updatedTree = d.applyRouterStatePatchToTree([
                ""
            ], e_tree, tree, g || state.canonicalUrl);
            if (updatedTree === null) {
                resolve(actionResult);
                return handleSegmentMismatch(state, t, tree);
            }
            if (p.isNavigatingToNewRootLayout(e_tree, updatedTree)) {
                resolve(actionResult);
                return f.handleExternalUrl(state, a, g || state.canonicalUrl, state.pushRef.pendingPush);
            }
            if (seedData !== null) {
                let t = seedData[1];
                let updatedCache = createEmptyCacheNode();
                updatedCache.rsc = t;
                updatedCache.prefetchRsc = null;
                updatedCache.loading = seedData[3];
                _.fillLazyItemsTillLeafWithHead(navigatedAt, updatedCache, undefined, tree, seedData, head, undefined);
                a.cache = updatedCache;
                a.prefetchCache = new Map;
                if (C) {
                    await v.refreshInactiveParallelSegments({
                        navigatedAt,
                        state,
                        updatedTree,
                        updatedCache,
                        includeNextUrl: !!i,
                        canonicalUrl: a.canonicalUrl || state.canonicalUrl
                    });
                }
            }
            a.patchedTree = updatedTree;
            e_tree = updatedTree;
        }
        if (redirectLocation && g) {
            if (!C) {
                createSeededPrefetchCacheEntry({
                    url: redirectLocation,
                    data: {
                        flightData: actionFlightData,
                        canonicalUrl: undefined,
                        couldBeIntercepted: false,
                        prerendered: false,
                        postponed: false,
                        staleTime: -1
                    },
                    tree: state.tree,
                    prefetchCache: state.prefetchCache,
                    nextUrl: state.nextUrl,
                    kind: isPrerender ? PrefetchKind.FULL : PrefetchKind.AUTO
                });
                a.prefetchCache = state.prefetchCache;
            }
            reject(getRedirectError(hasBasePath(g) ? removeBasePath(g) : g, redirectType || RedirectType.push));
        } else {
            resolve(actionResult);
        }
        return handleMutable(state, a);
    }, (t)=>{
        reject(t);
        return state;
    });
}
