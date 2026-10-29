export function F(e, t) {
    if (e?.endsWith(`/`) && e !== `/` && e !== `${t}/`) {
        return e.slice(0, -1);
    }
    return e;
}
export function I(e, t, n) {
    return F(e, n) === F(t, n);
}
