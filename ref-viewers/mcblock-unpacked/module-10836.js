import { DEFAULT_SEGMENT_KEY } from "./module-65360.js";
import { createRouterCacheKey } from "./module-69190.js";
export function findHeadInCache(e, t) {
    return function e(t, r, o, i) {
        if (Object.keys(r).length === 0) {
            return [
                t,
                o,
                i
            ];
        }
        let s = Object.keys(r).filter((e)=>e !== "children");
        for (let i of ("children" in r && s.unshift("children"), s)){
            let [s, l] = r[i];
            if (s === DEFAULT_SEGMENT_KEY) {
                continue;
            }
            let u = t.parallelRoutes.get(i);
            if (!u) {
                continue;
            }
            let c = createRouterCacheKey(s);
            let f = createRouterCacheKey(s, true);
            let d = u.get(c);
            if (!d) {
                continue;
            }
            let p = e(d, l, `${o}/${c}`, `${o}/${f}`);
            if (p) {
                return p;
            }
        }
        return null;
    }(e, t, "", "");
}
