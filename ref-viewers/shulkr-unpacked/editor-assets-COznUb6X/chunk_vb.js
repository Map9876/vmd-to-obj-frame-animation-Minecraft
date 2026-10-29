const vb = 0.4;
export function yb(e, t = 38) {
    let n = Math.min(t, e * vb);
    if (n < 11) {
        return 0;
    }
    return n;
}
