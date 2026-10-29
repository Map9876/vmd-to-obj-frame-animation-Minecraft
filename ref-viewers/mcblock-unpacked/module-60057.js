import { M } from "./module-81259.js";
import { O } from "./module-49636.js";
export function EU() {
    Se(O);
    return O;
}
export function Se(e) {
    let t = e.__SENTRY__ = e.__SENTRY__ || {};
    t.version = t.version || M;
    return t[M] = t[M] || {};
}
export function BY(e, t, r = O) {
    let o = r.__SENTRY__ = r.__SENTRY__ || {};
    let i = o[M] = o[M] || {};
    return i[e] || (i[e] = t());
}
