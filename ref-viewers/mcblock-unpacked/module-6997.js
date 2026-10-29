import { addPathPrefix } from "./module-73879.js";
import { pathHasPrefix } from "./module-2018.js";
export function addLocale(e, t, r, o) {
    if (!t || t === r) {
        return e;
    }
    let i = e.toLowerCase();
    if (!o && (pathHasPrefix(i, "/api") || pathHasPrefix(i, `/${t.toLowerCase()}`))) {
        return e;
    }
    return addPathPrefix(e, `/${t}`);
}
