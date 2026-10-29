import { O } from "../dist-7IP26fql.js";
function ui(e) {
    return O(e) && e.tagName === `INPUT`;
}
export function di(e) {
    return !!(ui(e) && e.selectionStart != null || O(e) && e.tagName === `TEXTAREA`);
}
