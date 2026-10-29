import { getPathMatch } from "./module-28406.js";
import { matchHas, prepareDestination } from "./module-87037.js";
import { removeTrailingSlash } from "./module-77700.js";
import { normalizeLocalePath } from "./module-61940.js";
import { removeBasePath } from "./module-51755.js";
import { parseRelativeUrl } from "./module-40579.js";
export function A(asPath, t, r, query, c, f) {
    let resolvedHref;
    let matchedPage = false;
    let externalDest = false;
    let parsedAs = parseRelativeUrl(asPath);
    let m = removeTrailingSlash(normalizeLocalePath(removeBasePath(parsedAs.pathname), f).pathname);
    let g = (r)=>{
        let params = getPathMatch(`${r.source}`, {
            removeUnnamedParams: true,
            strict: true
        })(parsedAs.pathname);
        if ((r.has || r.missing) && params) {
            let e = matchHas({
                headers: {
                    host: document.location.hostname,
                    "user-agent": navigator.userAgent
                },
                cookies: document.cookie.split("; ").reduce((acc, item)=>{
                    let [r, ...n] = item.split("=");
                    acc[r] = n.join("=");
                    return acc;
                }, {})
            }, parsedAs.query, r.has, r.missing);
            if (e) {
                Object.assign(params, e);
            } else {
                params = false;
            }
        }
        if (params) {
            if (!r.destination) {
                externalDest = true;
                return true;
            }
            let n = prepareDestination({
                appendParamsToQuery: true,
                destination: r.destination,
                params,
                query
            });
            parsedAs = n.parsedDestination;
            asPath = n.newUrl;
            Object.assign(query, n.parsedDestination.query);
            m = removeTrailingSlash(normalizeLocalePath(removeBasePath(asPath), f).pathname);
            if (t.includes(m)) {
                matchedPage = true;
                resolvedHref = m;
                return true;
            }
            if ((resolvedHref = c(m)) !== asPath && t.includes(resolvedHref)) {
                matchedPage = true;
                return true;
            }
        }
    };
    let y = false;
    for(let e = 0; e < r.beforeFiles.length; e++){
        g(r.beforeFiles[e]);
    }
    if (!(matchedPage = t.includes(m))) {
        if (!y) {
            for(let e = 0; e < r.afterFiles.length; e++){
                if (g(r.afterFiles[e])) {
                    y = true;
                    break;
                }
            }
        }
        if (!y) {
            resolvedHref = c(m);
            y = matchedPage = t.includes(resolvedHref);
        }
        if (!y) {
            for(let e = 0; e < r.fallback.length; e++){
                if (g(r.fallback[e])) {
                    y = true;
                    break;
                }
            }
        }
    }
    return {
        asPath,
        parsedAs,
        matchedPage,
        resolvedHref,
        externalDest
    };
}
