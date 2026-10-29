import { pathHasPrefix } from "./module-2018.js";
export function removePathPrefix(e, t) {
    if (!pathHasPrefix(e, t)) {
        return e;
    }
    let r = e.slice(t.length);
    if (r.startsWith("/")) {
        return r;
    }
    return `/${r}`;
}
