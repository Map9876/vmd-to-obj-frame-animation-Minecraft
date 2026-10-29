import n from "./module-99062.js";
import { NEXT_DID_POSTPONE_HEADER, NEXT_ROUTER_PREFETCH_HEADER, NEXT_ROUTER_STALE_TIME_HEADER, NEXT_ROUTER_STATE_TREE_HEADER, NEXT_RSC_UNION_QUERY, NEXT_URL, RSC_CONTENT_TYPE_HEADER, RSC_HEADER } from "./module-52486.js";
import { callServer } from "./module-41209.js";
import { findSourceMapURL } from "./module-85153.js";
import { PrefetchKind } from "./module-86871.js";
import { normalizeFlightData, prepareFlightRouterStateForRequest } from "./module-16378.js";
import { getAppBuildId } from "./module-3201.js";
import { setCacheBustingSearchParam } from "./module-20396.js";
import { urlToUrlWithoutFlightMarker } from "./module-93223.js";
let n_createFromReadableStream = n.createFromReadableStream;
function p(e) {
    return {
        flightData: urlToUrlWithoutFlightMarker(new URL(e, location.origin)).toString(),
        canonicalUrl: undefined,
        couldBeIntercepted: false,
        prerendered: false,
        postponed: false,
        staleTime: -1
    };
}
let h = new AbortController;
export async function fetchServerResponse(e, t) {
    let { flightRouterState, nextUrl, prefetchKind } = t;
    let i = {
        [RSC_HEADER]: "1",
        [NEXT_ROUTER_STATE_TREE_HEADER]: prepareFlightRouterStateForRequest(flightRouterState, t.isHmrRefresh)
    };
    if (prefetchKind === PrefetchKind.AUTO) {
        i[NEXT_ROUTER_PREFETCH_HEADER] = "1";
    }
    if (nextUrl) {
        i[NEXT_URL] = nextUrl;
    }
    try {
        let t = prefetchKind ? prefetchKind === PrefetchKind.TEMPORARY ? "high" : "low" : "auto";
        let r = await createFetch(e, i, t, h.signal);
        let n = urlToUrlWithoutFlightMarker(new URL(r.url));
        let canonicalUrl = r.redirected ? n : undefined;
        let _ = r.headers.get("content-type") || "";
        let couldBeIntercepted = !!r.headers.get("vary")?.includes(NEXT_URL);
        let postponed = !!r.headers.get(NEXT_DID_POSTPONE_HEADER);
        let b = r.headers.get(NEXT_ROUTER_STALE_TIME_HEADER);
        let staleTime = b !== null ? 1000 * parseInt(b, 10) : -1;
        if (!_.startsWith(RSC_CONTENT_TYPE_HEADER) || !r.ok || !r.body) {
            if (e.hash) {
                n.hash = e.hash;
            }
            return p(n.toString());
        }
        let R = postponed ? ((e)=>{
            let t = e.getReader();
            return new ReadableStream({
                async pull (e) {
                    while(true){
                        let { done, value } = await t.read();
                        if (!done) {
                            e.enqueue(value);
                            continue;
                        }
                        return;
                    }
                }
            });
        })(r.body) : r.body;
        let S = await createFromNextReadableStream(R);
        if (getAppBuildId() !== S.b) {
            return p(r.url);
        }
        return {
            flightData: normalizeFlightData(S.f),
            canonicalUrl,
            couldBeIntercepted,
            prerendered: S.S,
            postponed,
            staleTime
        };
    } catch (error) {
        if (!h.signal.aborted) {
            console.error(`Failed to fetch RSC payload for ${e}. Falling back to browser navigation.`, error);
        }
        return {
            flightData: e.toString(),
            canonicalUrl: undefined,
            couldBeIntercepted: false,
            prerendered: false,
            postponed: false,
            staleTime: -1
        };
    }
}
export async function createFetch(e, headers, r, signal) {
    let o = new URL(e);
    setCacheBustingSearchParam(o, headers);
    let i = await fetch(o, {
        credentials: "same-origin",
        headers,
        priority: r || undefined,
        signal
    });
    let i_redirected = i.redirected;
    let l = new URL(i.url, o);
    l.searchParams.delete(NEXT_RSC_UNION_QUERY);
    return {
        url: l.href,
        redirected: i_redirected,
        ok: i.ok,
        headers: i.headers,
        body: i.body,
        status: i.status
    };
}
export function createFromNextReadableStream(e) {
    return n_createFromReadableStream(e, {
        callServer,
        findSourceMapURL
    });
}
window.addEventListener("pagehide", ()=>{
    h.abort();
});
window.addEventListener("pageshow", ()=>{
    h = new AbortController;
});
