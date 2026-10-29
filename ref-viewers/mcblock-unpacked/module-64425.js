import { PAGE_SEGMENT_KEY } from "./module-65360.js";
export let ROOT_SEGMENT_REQUEST_KEY = "";
export let ROOT_SEGMENT_CACHE_KEY = "";
export function createSegmentRequestKeyPart(e) {
    if (typeof e === "string") {
        if (e.startsWith(PAGE_SEGMENT_KEY)) {
            return PAGE_SEGMENT_KEY;
        }
        if (e === "/_not-found") {
            return "_not-found";
        }
        return f(e);
    }
    let t = e[0];
    let r = e[2];
    return `\$${r}\$${f(t)}`;
}
export function appendSegmentRequestKeyPart(e, t, r) {
    return `${e}/${t === "children" ? r : `@${f(t)}/${r}`}`;
}
export function createSegmentCacheKeyPart(e, t) {
    if (typeof t === "string") {
        return e;
    }
    return `${e}\$${f(t[1])}`;
}
export function appendSegmentCacheKeyPart(e, t, r) {
    return `${e}/${t === "children" ? r : `@${f(t)}/${r}`}`;
}
let c = /^[a-zA-Z0-9\-_@]+$/;
function f(e) {
    if (c.test(e)) {
        return e;
    }
    return `!${btoa(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}`;
}
export function convertSegmentPathToStaticExportFilename(e) {
    return `__next${e.replace(/\//g, ".")}.txt`;
}
