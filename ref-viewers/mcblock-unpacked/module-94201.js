import { createRouterCacheKey } from "./module-69190.js";
export function invalidateCacheByRouterState(e, t, r) {
    for(let a in r[1]){
        let o = r[1][a][0];
        let i = createRouterCacheKey(o);
        let s = t.parallelRoutes.get(a);
        if (s) {
            let t = new Map(s);
            t.delete(i);
            e.parallelRoutes.set(a, t);
        }
    }
}
