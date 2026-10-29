import { removeTrailingSlash } from "./module-77700.js";
import { addPathPrefix } from "./module-73879.js";
import { addPathSuffix } from "./module-77886.js";
import { addLocale } from "./module-6997.js";
export function formatNextPathnameInfo(e) {
    let t = addLocale(e.pathname, e.locale, e.buildId ? undefined : e.defaultLocale, e.ignorePrefix);
    if (e.buildId || !e.trailingSlash) {
        t = removeTrailingSlash(t);
    }
    if (e.buildId) {
        t = addPathSuffix(addPathPrefix(t, `/_next/data/${e.buildId}`), e.pathname === "/" ? "index.json" : ".json");
    }
    t = addPathPrefix(t, e.basePath);
    if (!e.buildId && e.trailingSlash) {
        if (t.endsWith("/")) {
            return t;
        }
        return addPathSuffix(t, "/");
    }
    return removeTrailingSlash(t);
}
