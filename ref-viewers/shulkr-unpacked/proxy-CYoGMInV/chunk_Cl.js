export function Cl(e, t, n) {
    return {
        min: wl(e, t),
        max: wl(e, n)
    };
}
function wl(e, t) {
    if (typeof e == `number`) {
        return e;
    }
    return e[t] || 0;
}
