import { my } from "./module-73314.js";
import { Qw, hY } from "./module-78714.js";
import { O } from "./module-49636.js";
let n;
export function eJ(e = (()=>{
    let e = O;
    return e.crypto || e.msCrypto;
})()) {
    try {
        if (e?.randomUUID) {
            return Qw(()=>e.randomUUID()).replace(/-/g, "");
        }
    } catch  {}
    if (!n) {
        n = "10000000100040008000100000000000";
    }
    return n.replace(/[018]/g, (e)=>(e ^ (15 & 16 * hY()) >> e / 4).toString(16));
}
function l(e) {
    return e.exception?.values?.[0];
}
export function $X(e) {
    let { message, event_id } = e;
    if (message) {
        return message;
    }
    let n = l(e);
    if (n) {
        if (n.type && n.value) {
            return `${n.type}: ${n.value}`;
        }
        return n.type || n.value || event_id || "<unknown>";
    }
    return event_id || "<unknown>";
}
export function gO(e, t, r) {
    let n = e.exception = e.exception || {};
    let a = n.values = n.values || [];
    let o = a[0] = a[0] || {};
    if (!o.value) {
        o.value = t || "";
    }
    if (!o.type) {
        o.type = r || "Error";
    }
}
export function M6(e, t) {
    let r = l(e);
    if (!r) {
        return;
    }
    let r_mechanism = r.mechanism;
    r.mechanism = {
        type: "generic",
        handled: true,
        ...r_mechanism,
        ...t
    };
    if (t && "data" in t) {
        let e = {
            ...r_mechanism?.data,
            ...t.data
        };
        r.mechanism.data = e;
    }
}
export function GR(e) {
    if (((e)=>{
        try {
            return e.__sentry_captured__;
        } catch  {}
    })(e)) {
        return true;
    }
    try {
        my(e, "__sentry_captured__", true);
    } catch  {}
    return false;
}
