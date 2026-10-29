import { DecodeError } from "./module-62296.js";
import { safeRouteMatcher } from "./module-34738.js";
export function getRouteMatcher({ re, groups }) {
    return safeRouteMatcher((e)=>{
        let a = re.exec(e);
        if (!a) {
            return false;
        }
        let o = (e)=>{
            try {
                return decodeURIComponent(e);
            } catch (e) {
                throw Object.defineProperty(new DecodeError("failed to decode param"), "__NEXT_ERROR_CODE", {
                    value: "E528",
                    enumerable: false,
                    configurable: true
                });
            }
        };
        let i = {};
        for (let [e, t] of Object.entries(groups)){
            let r = a[t.pos];
            if (r !== undefined) {
                if (t.repeat) {
                    i[e] = r.split("/").map((e)=>o(e));
                } else {
                    i[e] = o(r);
                }
            }
        }
        return i;
    });
}
