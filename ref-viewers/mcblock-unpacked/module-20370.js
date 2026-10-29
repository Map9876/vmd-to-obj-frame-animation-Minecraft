import { O } from "./module-49636.js";
import { AS, aj, s5 } from "./module-21010.js";
let o = null;
export function r(e) {
    let t = "unhandledrejection";
    s5(t, e);
    AS(t, s);
}
function s() {
    o = O.onunhandledrejection;
    O.onunhandledrejection = function(e) {
        aj("unhandledrejection", e);
        return !o || o.apply(this, arguments);
    };
    O.onunhandledrejection.__SENTRY_INSTRUMENTED__ = true;
}
