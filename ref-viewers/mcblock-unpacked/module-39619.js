import { O } from "./module-49636.js";
import { my, pO, sp } from "./module-73314.js";
import { v4 } from "./module-2257.js";
import { M6, gO } from "./module-28385.js";
import { Cp } from "./module-27122.js";
import { $N } from "./module-60567.js";
Object.defineProperty(exports, "LV", {
    enumerable: true,
    get: ()=>function e(t, r = {}) {
            if (typeof t !== "function") {
                return t;
            }
            try {
                let e = t.__sentry_wrapped__;
                if (e) {
                    if (typeof e === "function") {
                        return e;
                    } else {
                        return t;
                    }
                }
                if (sp(t)) {
                    return t;
                }
            } catch  {
                return t;
            }
            let n = function(...n) {
                try {
                    let a = n.map((t)=>e(t, r));
                    return t.apply(this, a);
                } catch (error) {
                    c++;
                    setTimeout(()=>{
                        c--;
                    });
                    v4((t)=>{
                        t.addEventProcessor((e)=>{
                            if (r.mechanism) {
                                gO(e, undefined, undefined);
                                M6(e, r.mechanism);
                            }
                            e.extra = {
                                ...e.extra,
                                arguments: n
                            };
                            return e;
                        });
                        Cp(error);
                    });
                    throw error;
                }
            };
            try {
                for(let e in t){
                    if (Object.prototype.hasOwnProperty.call(t, e)) {
                        n[e] = t[e];
                    }
                }
            } catch  {}
            pO(n, t);
            my(t, "__sentry_wrapped__", n);
            try {
                if (Object.getOwnPropertyDescriptor(n, "name").configurable) {
                    Object.defineProperty(n, "name", {
                        get: ()=>t.name
                    });
                }
            } catch  {}
            return n;
        }
});
export let jf = O;
let c = 0;
export function jN() {
    return c > 0;
}
export function AP() {
    let url = $N();
    let { referrer } = jf.document || {};
    let { userAgent } = jf.navigator || {};
    return {
        url,
        headers: {
            ...referrer && {
                Referer: referrer
            },
            ...userAgent && {
                "User-Agent": userAgent
            }
        }
    };
}
