import { normalizeLocalePath } from "./module-61940.js";
import { removePathPrefix } from "./module-76726.js";
import { pathHasPrefix } from "./module-2018.js";
export function getNextPathnameInfo(pathname, t) {
    let { basePath, i18n, trailingSlash } = t.nextConfig ?? {};
    let c = {
        pathname,
        trailingSlash: pathname !== "/" ? pathname.endsWith("/") : trailingSlash
    };
    if (basePath && pathHasPrefix(c.pathname, basePath)) {
        c.pathname = removePathPrefix(c.pathname, basePath);
        c.basePath = basePath;
    }
    let c_pathname = c.pathname;
    if (c.pathname.startsWith("/_next/data/") && c.pathname.endsWith(".json")) {
        let e = c.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
        c.buildId = e[0];
        c_pathname = e[1] !== "index" ? `/${e.slice(1).join("/")}` : "/";
        if (t.parseData === true) {
            c.pathname = c_pathname;
        }
    }
    if (i18n) {
        let e = t.i18nProvider ? t.i18nProvider.analyze(c.pathname) : normalizeLocalePath(c.pathname, i18n.locales);
        c.locale = e.detectedLocale;
        c.pathname = e.pathname ?? c.pathname;
        if (!e.detectedLocale && c.buildId && (e = t.i18nProvider ? t.i18nProvider.analyze(c_pathname) : normalizeLocalePath(c_pathname, i18n.locales)).detectedLocale) {
            c.locale = e.detectedLocale;
        }
    }
    return c;
}
