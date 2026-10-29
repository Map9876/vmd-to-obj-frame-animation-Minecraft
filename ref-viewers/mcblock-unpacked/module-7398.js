import n from "./module-80797.js";
function o(e, t) {
    for (const o of t){
        o.enumerable = o.enumerable || false;
        o.configurable = true;
        if ("value" in o) {
            o.writable = true;
        }
        Object.defineProperty(e, n(o.key), o);
    }
}
export default function(e, t, r) {
    if (t) {
        o(e.prototype, t);
    }
    if (r) {
        o(e, r);
    }
    Object.defineProperty(e, "prototype", {
        writable: false
    });
    return e;
};
