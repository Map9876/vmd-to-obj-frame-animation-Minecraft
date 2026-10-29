import n from "./module-30637.js";
import { fillCacheWithNewSubTreeData } from "./module-60543.js";
export function applyFlightData(e, t, r, o, i) {
    let { tree, seedData, head, isRootRender } = o;
    if (seedData === null) {
        return false;
    }
    if (isRootRender) {
        let a = seedData[1];
        r.loading = seedData[3];
        r.rsc = a;
        r.prefetchRsc = null;
        n.fillLazyItemsTillLeafWithHead(e, r, t, tree, seedData, head, i);
    } else {
        r.rsc = t.rsc;
        r.prefetchRsc = t.prefetchRsc;
        r.parallelRoutes = new Map(t.parallelRoutes);
        r.loading = t.loading;
        fillCacheWithNewSubTreeData(e, r, t, o, i);
    }
    return true;
}
