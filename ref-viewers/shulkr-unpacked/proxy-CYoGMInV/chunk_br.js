export function br(e, t) {
    if (e?.inherit && t) {
        let { inherit, ...rest } = e;
        return {
            ...t,
            ...rest
        };
    }
    return e;
}
export function xr(e, t) {
    let n = e?.[t] ?? e?.default ?? e;
    if (n === e) {
        return n;
    }
    return br(n, e);
}
