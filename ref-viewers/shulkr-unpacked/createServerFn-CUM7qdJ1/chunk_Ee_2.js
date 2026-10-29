import { dt, ft } from "./chunk_T.js";
export const x = `__SEROVAL_REFS__`;
const Te = new Map;
export const S = new Map;
export function Ee(e) {
    return Te.has(e);
}
function De(e) {
    return S.has(e);
}
export function Oe(e) {
    if (Ee(e)) {
        return Te.get(e);
    }
    throw new dt(e);
}
export function ke(e) {
    if (De(e)) {
        return S.get(e);
    }
    throw new ft(e);
}
