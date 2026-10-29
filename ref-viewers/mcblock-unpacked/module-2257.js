import { h } from "./module-76636.js";
import { BY, EU } from "./module-60057.js";
import { H } from "./module-66941.js";
import { Z } from "./module-17588.js";
let n;
export function Bi() {
    return n !== undefined;
}
export function o5() {
    let e = EU();
    return h(e).getCurrentScope();
}
export function rm() {
    let e = EU();
    return h(e).getIsolationScope();
}
export function m6() {
    return BY("globalScope", ()=>new H);
}
export function v4(...e) {
    let t = EU();
    let r = h(t);
    if (e.length === 2) {
        let [t, n] = e;
        if (t) {
            return r.withSetScope(t, n);
        }
        return r.withScope(n);
    }
    return r.withScope(e[0]);
}
export function KU() {
    return o5().getClient();
}
export function vn(e) {
    let t = n?.();
    if (t) {
        return {
            trace_id: t.traceId,
            span_id: t.spanId
        };
    }
    let { traceId, parentSpanId, propagationSpanId } = e.getPropagationContext();
    let i = {
        trace_id: traceId,
        span_id: propagationSpanId || Z()
    };
    if (parentSpanId) {
        i.parent_span_id = parentSpanId;
    }
    return i;
}
