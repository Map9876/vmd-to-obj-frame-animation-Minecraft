export function dt(e, t) {
    return e === `minecraft` && t.endsWith(`_sign`) && !t.includes(`hanging`);
}
export const bt = new Map;
const xt = new Map;
const St = new Map;
export function Ct(e, t, n, r) {
    bt.set(e, t);
    if (n) {
        xt.set(e, new Set(n));
    }
    if (r) {
        St.set(e, new Set(r));
    }
}
export function wt(e, t) {
    if (dt(e, t)) {
        return true;
    }
    return xt.get(e)?.has(t) ?? false;
}
export function Tt(e, t) {
    return St.get(e)?.has(t) ?? false;
}
