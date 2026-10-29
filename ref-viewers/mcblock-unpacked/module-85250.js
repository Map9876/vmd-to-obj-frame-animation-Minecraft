import { p8, tb } from "./module-97633.js";
export function vt() {
    const t = new tb(16);
    if (tb != Float32Array) {
        t[1] = 0;
        t[2] = 0;
        t[3] = 0;
        t[4] = 0;
        t[6] = 0;
        t[7] = 0;
        t[8] = 0;
        t[9] = 0;
        t[11] = 0;
        t[12] = 0;
        t[13] = 0;
        t[14] = 0;
    }
    t[0] = 1;
    t[5] = 1;
    t[10] = 1;
    t[15] = 1;
    return t;
}
export function C(t, e) {
    t[0] = e[0];
    t[1] = e[1];
    t[2] = e[2];
    t[3] = e[3];
    t[4] = e[4];
    t[5] = e[5];
    t[6] = e[6];
    t[7] = e[7];
    t[8] = e[8];
    t[9] = e[9];
    t[10] = e[10];
    t[11] = e[11];
    t[12] = e[12];
    t[13] = e[13];
    t[14] = e[14];
    t[15] = e[15];
    return t;
}
export function Tl(t, e, r) {
    let n;
    let a;
    let i;
    let s;
    let l;
    let u;
    let o;
    let h;
    let c;
    let f;
    let g;
    let p;
    const d = r[0];
    const m = r[1];
    const v = r[2];
    if (e === t) {
        t[12] = e[0] * d + e[4] * m + e[8] * v + e[12];
        t[13] = e[1] * d + e[5] * m + e[9] * v + e[13];
        t[14] = e[2] * d + e[6] * m + e[10] * v + e[14];
        t[15] = e[3] * d + e[7] * m + e[11] * v + e[15];
    } else {
        n = e[0];
        a = e[1];
        i = e[2];
        s = e[3];
        l = e[4];
        u = e[5];
        o = e[6];
        h = e[7];
        c = e[8];
        f = e[9];
        g = e[10];
        p = e[11];
        t[0] = n;
        t[1] = a;
        t[2] = i;
        t[3] = s;
        t[4] = l;
        t[5] = u;
        t[6] = o;
        t[7] = h;
        t[8] = c;
        t[9] = f;
        t[10] = g;
        t[11] = p;
        t[12] = n * d + l * m + c * v + e[12];
        t[13] = a * d + u * m + f * v + e[13];
        t[14] = i * d + o * m + g * v + e[14];
        t[15] = s * d + h * m + p * v + e[15];
    }
    return t;
}
export function hs(t, e, [n, a, i]) {
    t[0] = e[0] * n;
    t[1] = e[1] * n;
    t[2] = e[2] * n;
    t[3] = e[3] * n;
    t[4] = e[4] * a;
    t[5] = e[5] * a;
    t[6] = e[6] * a;
    t[7] = e[7] * a;
    t[8] = e[8] * i;
    t[9] = e[9] * i;
    t[10] = e[10] * i;
    t[11] = e[11] * i;
    t[12] = e[12];
    t[13] = e[13];
    t[14] = e[14];
    t[15] = e[15];
    return t;
}
export function e$(t, e, r, a) {
    let i;
    let s;
    let l;
    let u;
    let o;
    let h;
    let c;
    let f;
    let g;
    let p;
    let d;
    let m;
    let v;
    let y;
    let M;
    let x;
    let I;
    let w;
    let T;
    let E;
    let B;
    let k;
    let A;
    let b;
    let N = a[0];
    let P = a[1];
    let j = a[2];
    let z = Math.sqrt(N * N + P * P + j * j);
    if (z < p8) {
        return null;
    }
    N *= z = 1 / z;
    P *= z;
    j *= z;
    i = Math.sin(r);
    l = 1 - (s = Math.cos(r));
    u = e[0];
    o = e[1];
    h = e[2];
    c = e[3];
    f = e[4];
    g = e[5];
    p = e[6];
    d = e[7];
    m = e[8];
    v = e[9];
    y = e[10];
    M = e[11];
    x = N * N * l + s;
    I = P * N * l + j * i;
    w = j * N * l - P * i;
    T = N * P * l - j * i;
    E = P * P * l + s;
    B = j * P * l + N * i;
    k = N * j * l + P * i;
    A = P * j * l - N * i;
    b = j * j * l + s;
    t[0] = u * x + f * I + m * w;
    t[1] = o * x + g * I + v * w;
    t[2] = h * x + p * I + y * w;
    t[3] = c * x + d * I + M * w;
    t[4] = u * T + f * E + m * B;
    t[5] = o * T + g * E + v * B;
    t[6] = h * T + p * E + y * B;
    t[7] = c * T + d * E + M * B;
    t[8] = u * k + f * A + m * b;
    t[9] = o * k + g * A + v * b;
    t[10] = h * k + p * A + y * b;
    t[11] = c * k + d * A + M * b;
    if (e !== t) {
        t[12] = e[12];
        t[13] = e[13];
        t[14] = e[14];
        t[15] = e[15];
    }
    return t;
}
export function eL(t, e, r) {
    const n = Math.sin(r);
    const a = Math.cos(r);
    const i = e[4];
    const s = e[5];
    const l = e[6];
    const u = e[7];
    const o = e[8];
    const h = e[9];
    const c = e[10];
    const f = e[11];
    if (e !== t) {
        t[0] = e[0];
        t[1] = e[1];
        t[2] = e[2];
        t[3] = e[3];
        t[12] = e[12];
        t[13] = e[13];
        t[14] = e[14];
        t[15] = e[15];
    }
    t[4] = i * a + o * n;
    t[5] = s * a + h * n;
    t[6] = l * a + c * n;
    t[7] = u * a + f * n;
    t[8] = o * a - i * n;
    t[9] = h * a - s * n;
    t[10] = c * a - l * n;
    t[11] = f * a - u * n;
    return t;
}
export function Z8(t, e, r) {
    const n = Math.sin(r);
    const a = Math.cos(r);
    const i = e[0];
    const s = e[1];
    const l = e[2];
    const u = e[3];
    const o = e[8];
    const h = e[9];
    const c = e[10];
    const f = e[11];
    if (e !== t) {
        t[4] = e[4];
        t[5] = e[5];
        t[6] = e[6];
        t[7] = e[7];
        t[12] = e[12];
        t[13] = e[13];
        t[14] = e[14];
        t[15] = e[15];
    }
    t[0] = i * a - o * n;
    t[1] = s * a - h * n;
    t[2] = l * a - c * n;
    t[3] = u * a - f * n;
    t[8] = i * n + o * a;
    t[9] = s * n + h * a;
    t[10] = l * n + c * a;
    t[11] = u * n + f * a;
    return t;
}
export function Qr(t, e, r) {
    const n = Math.sin(r);
    const a = Math.cos(r);
    const i = e[0];
    const s = e[1];
    const l = e[2];
    const u = e[3];
    const o = e[4];
    const h = e[5];
    const c = e[6];
    const f = e[7];
    if (e !== t) {
        t[8] = e[8];
        t[9] = e[9];
        t[10] = e[10];
        t[11] = e[11];
        t[12] = e[12];
        t[13] = e[13];
        t[14] = e[14];
        t[15] = e[15];
    }
    t[0] = i * a + o * n;
    t[1] = s * a + h * n;
    t[2] = l * a + c * n;
    t[3] = u * a + f * n;
    t[4] = o * a - i * n;
    t[5] = h * a - s * n;
    t[6] = c * a - l * n;
    t[7] = f * a - u * n;
    return t;
}
export function kN(t, e) {
    t[0] = 1;
    t[1] = 0;
    t[2] = 0;
    t[3] = 0;
    t[4] = 0;
    t[5] = 1;
    t[6] = 0;
    t[7] = 0;
    t[8] = 0;
    t[9] = 0;
    t[10] = 1;
    t[11] = 0;
    t[12] = e[0];
    t[13] = e[1];
    t[14] = e[2];
    t[15] = 1;
    return t;
}
export function CV(t, e) {
    t[0] = e[0];
    t[1] = 0;
    t[2] = 0;
    t[3] = 0;
    t[4] = 0;
    t[5] = e[1];
    t[6] = 0;
    t[7] = 0;
    t[8] = 0;
    t[9] = 0;
    t[10] = e[2];
    t[11] = 0;
    t[12] = 0;
    t[13] = 0;
    t[14] = 0;
    t[15] = 1;
    return t;
}
export const fN = function(t, e, r, n, a) {
    const i = 1 / Math.tan(e / 2);
    t[0] = i / r;
    t[1] = 0;
    t[2] = 0;
    t[3] = 0;
    t[4] = 0;
    t[5] = i;
    t[6] = 0;
    t[7] = 0;
    t[8] = 0;
    t[9] = 0;
    t[11] = -1;
    t[12] = 0;
    t[13] = 0;
    t[15] = 0;
    if (a != null && a !== Infinity) {
        const s = 1 / (n - a);
        t[10] = (a + n) * s;
        t[14] = 2 * a * n * s;
    } else {
        t[10] = -1;
        t[14] = -2 * n;
    }
    return t;
};
export const v3 = function(t, e, r, n, a, i, s) {
    const l = 1 / (e - r);
    const u = 1 / (n - a);
    const o = 1 / (i - s);
    t[0] = -2 * l;
    t[1] = 0;
    t[2] = 0;
    t[3] = 0;
    t[4] = 0;
    t[5] = -2 * u;
    t[6] = 0;
    t[7] = 0;
    t[8] = 0;
    t[9] = 0;
    t[10] = 2 * o;
    t[11] = 0;
    t[12] = (e + r) * l;
    t[13] = (a + n) * u;
    t[14] = (s + i) * o;
    t[15] = 1;
    return t;
};
