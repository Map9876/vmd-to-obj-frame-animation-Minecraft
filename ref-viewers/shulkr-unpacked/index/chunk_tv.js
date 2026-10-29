import { O } from "../dist-C5TDMOul.js";
export function tv(e) {
    return O[e]?.edition ?? null;
}
export function nv(e) {
    return e.sourceVersion?.edition ?? tv(e.sourceFormat);
}
