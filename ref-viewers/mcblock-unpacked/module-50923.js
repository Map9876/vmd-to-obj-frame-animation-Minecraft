import { p8, tb } from "./module-97633.js";
export function vt() {
    const e = new tb(3);
    if (tb != Float32Array) {
        e[0] = 0;
        e[1] = 0;
        e[2] = 0;
    }
    return e;
}
export function fA(e, t, r) {
    const n = new tb(3);
    n[0] = e;
    n[1] = t;
    n[2] = r;
    return n;
}
export function ze(e, t) {
    e[0] = -t[0];
    e[1] = -t[1];
    e[2] = -t[2];
    return e;
}
export function Z0(e, [s, n, i], r) {
    let a = r[3] * s + r[7] * n + r[11] * i + r[15];
    a = a || 1;
    e[0] = (r[0] * s + r[4] * n + r[8] * i + r[12]) / a;
    e[1] = (r[1] * s + r[5] * n + r[9] * i + r[13]) / a;
    e[2] = (r[2] * s + r[6] * n + r[10] * i + r[14]) / a;
    return e;
}
export function aI([r, n, i], t) {
    const a = t[0];
    const o = t[1];
    const u = t[2];
    return Math.abs(r - a) <= p8 * Math.max(1, Math.abs(r), Math.abs(a)) && Math.abs(n - o) <= p8 * Math.max(1, Math.abs(n), Math.abs(o)) && Math.abs(i - u) <= p8 * Math.max(1, Math.abs(i), Math.abs(u));
}
vt();
