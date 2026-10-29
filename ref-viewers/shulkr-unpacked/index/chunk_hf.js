export function hf(e, t, n, r, i, a) {
    return r >= t != a >= t && e <= (i - n) * (t - r) / (a - r) + n;
}
export function gf(e, t, n, r, i, a, o, s, c, l) {
    let u = false;
    if (hf(e, t, n, r, i, a)) {
        u = !u;
    }
    if (hf(e, t, i, a, o, s)) {
        u = !u;
    }
    if (hf(e, t, o, s, c, l)) {
        u = !u;
    }
    if (hf(e, t, c, l, n, r)) {
        u = !u;
    }
    return u;
}
