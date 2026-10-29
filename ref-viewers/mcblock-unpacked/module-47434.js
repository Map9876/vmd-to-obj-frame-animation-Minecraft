import { T } from "./module-61571.js";
import { Yz } from "./module-43275.js";
import { _c } from "./module-35868.js";
function i(e) {
    Yz.log(`Ignoring span ${e.op} - ${e.description} because it matches \`ignoreSpans\`.`);
}
export function e(e, t) {
    if (!t?.length || !e.description) {
        return false;
    }
    for (let a of t){
        let r;
        if (typeof (r = a) === "string" || r instanceof RegExp) {
            if (_c(e.description, a)) {
                if (T) {
                    i(e);
                }
                return true;
            }
            continue;
        }
        if (!a.name && !a.op) {
            continue;
        }
        let t = !a.name || _c(e.description, a.name);
        let s = !a.op || e.op && _c(e.op, a.op);
        if (t && s) {
            if (T) {
                i(e);
            }
            return true;
        }
    }
    return false;
}
export function R(e, { parent_span_id, span_id }) {
    if (parent_span_id) {
        for (let t of e){
            if (t.parent_span_id === span_id) {
                t.parent_span_id = parent_span_id;
            }
        }
    }
}
