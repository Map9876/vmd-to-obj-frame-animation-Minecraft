import { parsePath } from "./module-5240.js";
export function addPathPrefix(e, t) {
    if (!e.startsWith("/") || !t) {
        return e;
    }
    let { pathname, query, hash } = parsePath(e);
    return `${t}${pathname}${query}${hash}`;
}
