import { parsePath } from "./module-5240.js";
export function addPathSuffix(e, t) {
    if (!e.startsWith("/") || !t) {
        return e;
    }
    let { pathname, query, hash } = parsePath(e);
    return `${pathname}${t}${query}${hash}`;
}
