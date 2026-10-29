import { PAGE_SEGMENT_KEY } from "./module-65360.js";
export function getFlightDataPartsFromPath(e) {
    let [tree, seedData, head, isHeadPartial] = e.slice(-4);
    let segmentPath = e.slice(0, -4);
    return {
        pathToSegment: segmentPath.slice(0, -1),
        segmentPath,
        segment: segmentPath[segmentPath.length - 1] ?? "",
        tree,
        seedData,
        head,
        isHeadPartial,
        isRootRender: e.length === 4
    };
}
export function getNextFlightSegmentPath(e) {
    return e.slice(2);
}
export function normalizeFlightData(e) {
    if (typeof e === "string") {
        return e;
    }
    return e.map((e)=>getFlightDataPartsFromPath(e));
}
export function prepareFlightRouterStateForRequest(e, t) {
    if (t) {
        return encodeURIComponent(JSON.stringify(e));
    }
    return encodeURIComponent(JSON.stringify(function e([o, i, s, l, u, c]) {
        let r;
        let a;
        let f = typeof (r = o) === "string" && r.startsWith(`${PAGE_SEGMENT_KEY}?`) ? PAGE_SEGMENT_KEY : r;
        let d = {};
        for (let [t, r] of Object.entries(i)){
            d[t] = e(r);
        }
        let p = [
            f,
            d,
            null,
            (a = l) && a !== "refresh" ? l : null
        ];
        if (u !== undefined) {
            p[4] = u;
        }
        if (c !== undefined) {
            p[5] = c;
        }
        return p;
    }(e)));
}
