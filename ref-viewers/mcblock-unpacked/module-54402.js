import { O } from "./module-49636.js";
import { AS, aj, s5 } from "./module-21010.js";
let o = null;
export function L(e) {
    let t = "error";
    s5(t, e);
    AS(t, s);
}
function s() {
    o = O.onerror;
    O.onerror = function(msg, url, line, column, error) {
        aj("error", {
            column,
            error,
            line,
            msg,
            url
        });
        return !!o && o.apply(this, arguments);
    };
    O.onerror.__SENTRY_INSTRUMENTED__ = true;
}
