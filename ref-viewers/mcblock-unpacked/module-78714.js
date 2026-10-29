import { O } from "./module-49636.js";
let n;
export function Qw(e) {
    if (n !== undefined) {
        if (n) {
            return n(e);
        }
        return e();
    }
    let SYMBOL_SENTRY_SAFE_RANDOM_ID_WRAPPER_ = Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__");
    let r = O;
    if (SYMBOL_SENTRY_SAFE_RANDOM_ID_WRAPPER_ in r && typeof r[SYMBOL_SENTRY_SAFE_RANDOM_ID_WRAPPER_] === "function") {
        return (n = r[SYMBOL_SENTRY_SAFE_RANDOM_ID_WRAPPER_])(e);
    }
    n = null;
    return e();
}
export function hY() {
    return Qw(()=>Math.random());
}
export function Wk() {
    return Qw(()=>Date.now());
}
