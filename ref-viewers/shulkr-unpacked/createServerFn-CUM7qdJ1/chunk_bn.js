import { k } from "./chunk_T.js";
function bn(base, i) {
    if (i < 0 || !Number.isFinite(i) || !Number.isInteger(i)) {
        throw new k({
            t: 4,
            i
        });
    }
    if (base.refs.has(i)) {
        throw Error(`Conflicted ref id: ` + i);
    }
}
function xn(e, t, n) {
    bn(e.base, t);
    if (e.state.marked.has(t)) {
        e.base.refs.set(t, n);
    }
    return n;
}
function Sn(e, t, n) {
    bn(e.base, t);
    e.base.refs.set(t, n);
    return n;
}
export function V(e, t, n) {
    if (e.mode === 1) {
        return xn(e, t, n);
    }
    return Sn(e, t, n);
}
