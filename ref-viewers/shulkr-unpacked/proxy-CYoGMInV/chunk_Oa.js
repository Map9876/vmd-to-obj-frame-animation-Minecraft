export function Oa(e, t, n) {
    return n + t * (e - n);
}
function ka(e, t, n, r, i) {
    if (i !== undefined) {
        e = Oa(e, i, r);
    }
    return Oa(e, n, r) + t;
}
export function Aa(e, t = 0, n = 1, r, i) {
    e.min = ka(e.min, t, n, r, i);
    e.max = ka(e.max, t, n, r, i);
}
export function ja(e, { x, y }) {
    Aa(e.x, x.translate, x.scale, x.originPoint);
    Aa(e.y, y.translate, y.scale, y.originPoint);
}
