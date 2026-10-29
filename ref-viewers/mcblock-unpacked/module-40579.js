import { getLocationOrigin } from "./module-62296.js";
import { searchParamsToUrlQuery } from "./module-33078.js";
export function parseRelativeUrl(e, t, r = true) {
    let o = new URL(getLocationOrigin());
    let i = t ? new URL(t, o) : e.startsWith(".") ? new URL(window.location.href) : o;
    let { pathname, searchParams, search, hash, href, origin } = new URL(e, i);
    if (origin !== o.origin) {
        throw Object.defineProperty(Error(`invariant: invalid relative URL, router received ${e}`), "__NEXT_ERROR_CODE", {
            value: "E159",
            enumerable: false,
            configurable: true
        });
    }
    return {
        pathname,
        query: r ? searchParamsToUrlQuery(searchParams) : undefined,
        search,
        hash,
        href: href.slice(origin.length),
        slashes: undefined
    };
}
