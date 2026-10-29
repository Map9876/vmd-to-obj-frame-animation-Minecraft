import { searchParamsToUrlQuery } from "./module-33078.js";
import { formatWithValidation } from "./module-47670.js";
import { omit } from "./module-13644.js";
import { normalizeRepeatedSlashes } from "./module-62296.js";
import { normalizePathTrailingSlash } from "./module-71239.js";
import { isLocalURL } from "./module-58607.js";
import { isDynamicRoute } from "./module-55287.js";
import { interpolateAs } from "./module-2471.js";
import { getRouteRegex } from "./module-98156.js";
import { getRouteMatcher } from "./module-92385.js";
export function resolveHref(e, t, r) {
    let p;
    let h = typeof t === "string" ? t : formatWithValidation(t);
    let _ = h.match(/^[a-z][a-z0-9+.-]*:\/\//i);
    let m = _ ? h.slice(_[0].length) : h;
    if ((m.split("?", 1)[0] || "").match(/(\/\/|\\)/)) {
        console.error(`Invalid href '${h}' passed to next/router in page: '${e.pathname}'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.`);
        let t = normalizeRepeatedSlashes(m);
        h = (_ ? _[0] : "") + t;
    }
    if (!isLocalURL(h)) {
        if (r) {
            return [
                h
            ];
        }
        return h;
    }
    try {
        let t = h.startsWith("#") ? e.asPath : e.pathname;
        if (h.startsWith("?") && (t = e.asPath, isDynamicRoute(e.pathname))) {
            t = e.pathname;
            let r = getRouteRegex(e.pathname);
            if (!getRouteMatcher(r)(e.asPath)) {
                t = e.asPath;
            }
        }
        p = new URL(t, "http://n");
    } catch (e) {
        p = new URL("/", "http://n");
    }
    try {
        let e = new URL(h, p);
        e.pathname = normalizePathTrailingSlash(e.pathname);
        let t = "";
        if (isDynamicRoute(e.pathname) && e.searchParams && r) {
            let r = searchParamsToUrlQuery(e.searchParams);
            let { result, params } = interpolateAs(e.pathname, e.pathname, r);
            if (result) {
                t = formatWithValidation({
                    pathname: result,
                    hash: e.hash,
                    query: omit(r, params)
                });
            }
        }
        let i = e.origin === p.origin ? e.href.slice(e.origin.length) : e.href;
        if (r) {
            return [
                i,
                t || i
            ];
        }
        return i;
    } catch (e) {
        if (r) {
            return [
                h
            ];
        }
        return h;
    }
}
