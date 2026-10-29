export const read = function(t, e, r, n, i) {
    let s;
    let a;
    const o = 8 * i - n - 1;
    const f = (1 << o) - 1;
    const h = f >> 1;
    let u = -7;
    let l = r ? i - 1 : 0;
    const c = r ? -1 : 1;
    let d = t[e + l];
    l += c;
    s = d & (1 << -u) - 1;
    d >>= -u;
    for(u += o; u > 0; s = 256 * s + t[e + l], l += c, u -= 8);
    a = s & (1 << -u) - 1;
    s >>= -u;
    for(u += n; u > 0; a = 256 * a + t[e + l], l += c, u -= 8);
    if (s === 0) {
        s = 1 - h;
    } else {
        if (s === f) {
            if (a) {
                return NaN;
            }
            return Infinity * (d ? -1 : 1);
        }
        a += 2 ** n;
        s -= h;
    }
    return (d ? -1 : 1) * a * 2 ** (s - n);
};
export const write = function(t, e, r, n, i, s) {
    let a;
    let o;
    let f;
    let h = 8 * s - i - 1;
    const u = (1 << h) - 1;
    const l = u >> 1;
    const c = 5.960464477539062e-8 * (i === 23);
    let d = n ? 0 : s - 1;
    const p = n ? 1 : -1;
    const m = +(e < 0 || e === 0 && 1 / e < 0);
    for(isNaN(e = Math.abs(e)) || e === Infinity ? (o = +!!isNaN(e), a = u) : (a = Math.floor(Math.log(e) / Math.LN2), e * (f = 2 ** -a) < 1 && (a--, f *= 2), a + l >= 1 ? e += c / f : e += c * 2 ** (1 - l), e * f >= 2 && (a++, f /= 2), a + l >= u ? (o = 0, a = u) : a + l >= 1 ? (o = (e * f - 1) * 2 ** i, a += l) : (o = e * 2 ** (l - 1) * 2 ** i, a = 0)); i >= 8; t[r + d] = 255 & o, d += p, o /= 256, i -= 8);
    a = a << i | o;
    for(h += i; h > 0; t[r + d] = 255 & a, d += p, a /= 256, h -= 8);
    t[r + d - p] |= 128 * m;
};
