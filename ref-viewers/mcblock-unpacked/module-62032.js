import { searchParamsToUrlQuery } from "./module-33078.js";
import { parseRelativeUrl } from "./module-40579.js";
export function parseUrl(e) {
    if (e.startsWith("/")) {
        return parseRelativeUrl(e);
    }
    let t = new URL(e);
    return {
        hash: t.hash,
        hostname: t.hostname,
        href: t.href,
        pathname: t.pathname,
        port: t.port,
        protocol: t.protocol,
        query: searchParamsToUrlQuery(t.searchParams),
        search: t.search,
        slashes: t.href.slice(t.protocol.length, t.protocol.length + 2) === "//"
    };
}
