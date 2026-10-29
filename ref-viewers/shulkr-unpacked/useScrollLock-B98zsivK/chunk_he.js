import { n, s } from "../jsx-runtime-Db0DjQYK.js";
import { G, U, me } from "./chunk_le.js";
export const ve = me || G;
export const ge = typeof CSS < `u` && !!CSS.supports?.(`-webkit-backdrop-filter:none`);
export const _e = !ge && U.includes(`firefox`);
export const ye = /jsdom|happydom/.test(U);
export const K = s(n(), 1);
const be = [];
export function xe(e) {
    K.useEffect(e, be);
}
