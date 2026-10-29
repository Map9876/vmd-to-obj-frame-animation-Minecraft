import { hexHash } from "./module-60075.js";
export function computeCacheBustingSearchParam(e, t, r, a) {
    if ((e === undefined || e === "0") && t === undefined && r === undefined && a === undefined) {
        return "";
    }
    return hexHash([
        e || "0",
        t || "0",
        r || "0",
        a || "0"
    ].join(","));
}
