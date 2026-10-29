import { AS, aj, s5 } from "./module-21010.js";
import { NJ } from "./module-51217.js";
import { GS } from "./module-73314.js";
import { j } from "./module-38599.js";
let n;
export function _(e) {
    let t = "history";
    s5(t, e);
    AS(t, u);
}
function u() {
    function e(e) {
        return function(...t) {
            let r = t.length > 2 ? t[2] : undefined;
            if (r) {
                let o = n;
                let to = ((e)=>{
                    try {
                        return new URL(e, j.location.origin).toString();
                    } catch  {
                        return e;
                    }
                })(String(r));
                n = to;
                if (o === to) {
                    return e.apply(this, t);
                }
                aj("history", {
                    from: o,
                    to
                });
            }
            return e.apply(this, t);
        };
    }
    j.addEventListener("popstate", ()=>{
        let href = j.location.href;
        let t = n;
        n = href;
        if (t !== href) {
            aj("history", {
                from: t,
                to: href
            });
        }
    });
    if (NJ()) {
        GS(j.history, "pushState", e);
        GS(j.history, "replaceState", e);
    }
}
