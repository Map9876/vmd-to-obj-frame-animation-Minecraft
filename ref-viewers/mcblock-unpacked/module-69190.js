import { PAGE_SEGMENT_KEY } from "./module-65360.js";
export function createRouterCacheKey(e, t) {
    if (t === undefined) {
        t = false;
    }
    if (Array.isArray(e)) {
        return `${e[0]}|${e[1]}|${e[2]}`;
    }
    if (t && e.startsWith(PAGE_SEGMENT_KEY)) {
        return PAGE_SEGMENT_KEY;
    }
    return e;
}
