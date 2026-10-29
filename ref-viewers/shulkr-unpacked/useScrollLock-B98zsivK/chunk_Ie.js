import { pe } from "./chunk_le.js";
import { ye } from "./chunk_he.js";
export function Ie(e) {
    if (e.pointerType === `` && e.isTrusted) {
        return true;
    }
    if (pe && e.pointerType) {
        return e.type === `click` && e.buttons === 1;
    }
    return e.detail === 0 && !e.pointerType;
}
export function Le(e) {
    if (ye) {
        return false;
    }
    return !pe && e.width === 0 && e.height === 0 || pe && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === `mouse` || e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === `touch`;
}
