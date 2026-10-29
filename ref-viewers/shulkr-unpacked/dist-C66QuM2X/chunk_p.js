import { f } from "./chunk_d.js";
export const p = new TextDecoder;
export const m = 200;
function h(e, t, n) {
    let r = e.subarray(t, t + n);
    return p.decode(r);
}
export function g(e, t, n) {
    if (n > m) {
        return h(e, t, n);
    }
    return f(e, t, n);
}
