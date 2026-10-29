import { DEFAULT_SEGMENT_KEY, PAGE_SEGMENT_KEY, addSearchParamsIfPageSegment } from "./module-65360.js";
import { ROOT_SEGMENT_REQUEST_KEY } from "./module-64425.js";
import { NEXT_REWRITTEN_PATH_HEADER, NEXT_REWRITTEN_QUERY_HEADER, NEXT_RSC_UNION_QUERY } from "./module-52486.js";
export function getRenderedSearch(e) {
    let t = e.headers.get(NEXT_REWRITTEN_QUERY_HEADER);
    if (t !== null) {
        if (t === "") {
            return "";
        }
        return `?${t}`;
    }
    return urlToUrlWithoutFlightMarker(new URL(e.url)).search;
}
export function getRenderedPathname(e) {
    let t = e.headers.get(NEXT_REWRITTEN_PATH_HEADER);
    return t ?? urlToUrlWithoutFlightMarker(new URL(e.url)).pathname;
}
export function parseDynamicParamFromURLPart(e, t, r) {
    switch(e){
        case "c":
        case "ci":
            if (r < t.length) {
                return t.slice(r).map((e)=>encodeURIComponent(e));
            }
            return [];
        case "oc":
            if (r < t.length) {
                return t.slice(r).map((e)=>encodeURIComponent(e));
            }
            return null;
        case "d":
        case "di":
            if (r >= t.length) {
                return "";
            }
            return encodeURIComponent(t[r]);
        default:
            return "";
    }
}
export function doesStaticSegmentAppearInURL(e) {
    return !(e === ROOT_SEGMENT_REQUEST_KEY || e.startsWith(PAGE_SEGMENT_KEY) || e[0] === "(" && e.endsWith(")")) && e !== DEFAULT_SEGMENT_KEY && e !== "/_not-found";
}
export function getCacheKeyForDynamicParam(e, t) {
    if (typeof e === "string") {
        return addSearchParamsIfPageSegment(e, Object.fromEntries(new URLSearchParams(t)));
    }
    if (e === null) {
        return "";
    }
    return e.join("/");
}
export function urlToUrlWithoutFlightMarker(e) {
    let t = new URL(e);
    t.searchParams.delete(NEXT_RSC_UNION_QUERY);
    return t;
}
export function getParamValueFromCacheKey(e, t) {
    if (t === "c" || t === "oc") {
        return e.split("/");
    }
    return e;
}
