import { S6 } from "./module-62751.js";
import { v } from "./module-8934.js";
export let bg = ()=>({
        status: "unverified",
        originalUrl: null,
        acquiredUrl: null,
        usageNote: null,
        checkedAt: null
    });
export function Iz(e) {
    let a = e.sourceMeta?.dataVersion;
    let dataVersion = typeof a === "number" && Number.isSafeInteger(a) && a > 0 ? a : null;
    let n = dataVersion === null ? null : v(dataVersion);
    return {
        format: e.format === "litematic" || e.format === "schem" ? e.format : null,
        dataVersion,
        version: n && !n.endsWith("+") ? n : null,
        fileAuthor: ((e, t = 500)=>{
            if (typeof e !== "string") {
                return null;
            }
            let a = e.replace(/[\x00-\x1f\x7f<>]/g, "").trim();
            if (a) {
                return Array.from(a).slice(0, t).join("");
            }
            return null;
        })(e.author, 100)
    };
}
[
    ...S6
];
