import { my } from "./module-73314.js";
let a = "_sentrySpan";
export function r(e, t) {
    if (t) {
        my(e, a, t);
    } else {
        delete e[a];
    }
}
export function f(e) {
    return e[a];
}
