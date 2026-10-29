import { getRouteMatcher } from "./module-92385.js";
import { getRouteRegex } from "./module-98156.js";
export function interpolateAs(e, t, r) {
    let result = "";
    let i = getRouteRegex(e);
    let i_groups = i.groups;
    let l = (t !== e ? getRouteMatcher(i)(t) : "") || r;
    result = e;
    let params = Object.keys(i_groups);
    if (!params.every((e)=>{
        let t = l[e] || "";
        let { repeat, optional } = i_groups[e];
        let a = `[${repeat ? "..." : ""}${e}]`;
        if (optional) {
            a = `${t ? "" : "/"}[${a}]`;
        }
        if (repeat && !Array.isArray(t)) {
            t = [
                t
            ];
        }
        return (optional || e in l) && (result = result.replace(a, repeat ? t.map((e)=>encodeURIComponent(e)).join("/") : encodeURIComponent(t)) || "/");
    })) {
        result = "";
    }
    return {
        params,
        result
    };
}
