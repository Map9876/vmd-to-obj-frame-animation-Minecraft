function a(e) {
    return e == null || typeof e == `number` || typeof e == `boolean`;
}
export function o(e, t, n, r) {
    let i = a(r) ? r : n(r);
    let o = t.get(i);
    if (o === undefined) {
        o = e.call(this, r);
        t.set(i, o);
    }
    return o;
}
