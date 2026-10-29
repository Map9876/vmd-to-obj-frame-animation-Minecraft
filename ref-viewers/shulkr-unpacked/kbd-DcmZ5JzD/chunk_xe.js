import { t as t_1 } from "../clamp-D2lSjr8C.js";
export function N(e, t) {
    return e - t;
}
function P(e, t, n) {
    let r = e.slice();
    r[t] = n;
    return r.sort(N);
}
export function xe(e, t, n, r, i, a) {
    let o = e;
    o = t_1(o, n, r);
    if (i) {
        o = P(a, t, t_1(o, a[t - 1] ?? -Infinity, a[t + 1] ?? Infinity));
    }
    return o;
}
