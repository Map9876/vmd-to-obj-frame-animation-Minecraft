import { createHrefFromUrl } from "./module-29658.js";
import a from "./module-60895.js";
import o from "./module-44707.js";
import i from "./module-35737.js";
import { applyFlightData } from "./module-77609.js";
import { handleMutable } from "./module-11126.js";
import { createEmptyCacheNode } from "./module-17297.js";
export function serverPatchReducer(e, { serverResponse: { flightData, canonicalUrl }, navigatedAt }) {
    let d = {};
    d.preserveCustomHistoryState = false;
    if (typeof flightData === "string") {
        return i.handleExternalUrl(e, d, flightData, e.pushRef.pendingPush);
    }
    let e_tree = e.tree;
    let e_cache = e.cache;
    for (let t of flightData){
        let { segmentPath, tree } = t;
        let _ = a.applyRouterStatePatchToTree([
            "",
            ...segmentPath
        ], e_tree, tree, e.canonicalUrl);
        if (_ === null) {
            return e;
        }
        if (o.isNavigatingToNewRootLayout(e_tree, _)) {
            return i.handleExternalUrl(e, d, e.canonicalUrl, e.pushRef.pendingPush);
        }
        let m = canonicalUrl ? createHrefFromUrl(canonicalUrl) : undefined;
        if (m) {
            d.canonicalUrl = m;
        }
        let g = createEmptyCacheNode();
        applyFlightData(navigatedAt, e_cache, g, t);
        d.patchedTree = _;
        d.cache = g;
        e_cache = g;
        e_tree = _;
    }
    return handleMutable(e, d);
}
