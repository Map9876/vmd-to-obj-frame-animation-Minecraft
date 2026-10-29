import { _ } from "../dist-7IP26fql.js";
function Vt(e) {
    return e.visibility === `hidden` || e.visibility === `collapse`;
}
export function Ht(e, t = e ? _(e) : null) {
    if (!e || !e.isConnected || !t || Vt(t)) {
        return false;
    }
    if (typeof e.checkVisibility == `function`) {
        return e.checkVisibility();
    }
    return t.display !== `none` && t.display !== `contents`;
}
