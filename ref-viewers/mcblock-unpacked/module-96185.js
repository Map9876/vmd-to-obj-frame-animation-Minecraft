export function Ew(t) {
    return t * t;
}
export function qE(t, e, r) {
    return Math.max(e, Math.min(r, t));
}
export function uE(t, e, r) {
    return Math.fround(e + Math.fround(t * Math.fround(r - e)));
}
function s(t, e, r, n, a, i) {
    let s;
    return (s = r + t * (n - r)) + e * (a + t * (i - a) - s);
}
export function nX(t, e, r, n, a, i, l, u, o, h, c) {
    let f;
    return (f = s(t, e, n, a, i, l)) + r * (s(t, e, u, o, h, c) - f);
}
function u(t, e, r) {
    switch(t){
        case 0:
            return e();
        case 1:
            return r();
        default:
            return e() + t * (r() - e());
    }
}
function o(t, e, r, n, a, i) {
    return u(e, ()=>u(t, r, n), ()=>u(t, a, i));
}
export function pT(t, e, r, n, a, i, s, l, h, c, f) {
    return u(r, ()=>o(t, e, n, a, i, s), ()=>o(t, e, l, h, c, f));
}
export function MV(t, e, r) {
    if (t < 0) {
        return e;
    }
    if (t > 1) {
        return r;
    }
    return e + t * (r - e);
}
export function TF(t) {
    return t * t * t * (t * (6 * t - 15) + 10);
}
export function Tj(t, e, r, n, a) {
    return n + (t - e) / (r - e) * (a - n);
}
export function y8(t) {
    return qE(Math.floor(t), -2147483648, 2147483647);
}
export function t$(t) {
    return qE(Math.floor(t), -9223372036854776000, 9223372036854776000);
}
export function El(t, e, r) {
    let n = e - t;
    while(n > 0){
        let e = Math.floor(n / 2);
        let a = t + e;
        if (r(a)) {
            n = e;
            continue;
        }
        t = a + 1;
        n -= e + 1;
    }
    return t;
}
export function sA(t, e, r) {
    let n = BigInt.asIntN(64, BigInt(t) * BigInt(3129871) ^ BigInt(r) * BigInt(116129781) ^ BigInt(e));
    return (n = BigInt.asIntN(64, BigInt.asIntN(64, n * n * BigInt(42317861)) + BigInt.asIntN(64, n * BigInt(11)))) >> BigInt(16);
}
export function kE(t, e, r, n, a, i, s, l) {
    return BigInt(t) << BigInt(56) | BigInt(e) << BigInt(48) | BigInt(r) << BigInt(40) | BigInt(n) << BigInt(32) | BigInt(a) << BigInt(24) | BigInt(i) << BigInt(16) | BigInt(s) << BigInt(8) | BigInt(l);
}
export function r6(t) {
    return (t & t - 1) == 0;
}
export function Hj(t) {
    t = Math.ceil(t) - 1;
    t |= t >> 1;
    t |= t >> 2;
    t |= t >> 4;
    t |= t >> 8;
    t |= t >> 18;
    return (t |= t >> 32) + 1;
}
export function sb(t, e, r) {
    return t.nextInt(r - e + 1) + e;
}
export function vz(t, e, r) {
    if (e >= r) {
        return e;
    }
    return t.nextInt(r - e + 1) + e;
}
export function k4(t, e) {
    for(let r = t.length; r > 1; r--){
        let n = e.nextInt(r);
        let a = t[n];
        t[n] = t[r - 1];
        t[r - 1] = a;
    }
}
export function s5(t) {
    for(var e = 0, r = 0; e < t.length; e++){
        r = Math.imul(31, r) + t.charCodeAt(e) | 0;
    }
    return r;
}
