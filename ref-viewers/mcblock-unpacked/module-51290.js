import { h } from "./module-76636.js";
import { EU } from "./module-60057.js";
import { o5 } from "./module-2257.js";
import { JD, uT } from "./module-88722.js";
import { F3, a3 } from "./module-13590.js";
import { L } from "./module-13651.js";
import { my } from "./module-73314.js";
import { Z } from "./module-17588.js";
import { zf } from "./module-87624.js";
import { Iy, TC } from "./module-64189.js";
import { pq } from "./module-43275.js";
import { f } from "./module-43316.js";
export let CC = 0;
export let aO = 1;
let g = false;
export function Ck(e) {
    let { spanId, traceId } = e.spanContext();
    let { data, op, parent_span_id, status, origin, links } = et(e);
    return {
        parent_span_id,
        span_id: spanId,
        trace_id: traceId,
        data,
        op,
        status,
        origin,
        links
    };
}
export function kX(e) {
    let { spanId, traceId, isRemote } = e.spanContext();
    let parent_span_id = isRemote ? spanId : et(e).parent_span_id;
    let scope = L(e).scope;
    return {
        parent_span_id,
        span_id: isRemote ? scope?.getPropagationContext().propagationSpanId || Z() : spanId,
        trace_id: traceId
    };
}
export function Qh(e) {
    let { traceId, spanId } = e.spanContext();
    let n = pK(e);
    return TC(traceId, spanId, n);
}
export function G_(e) {
    let { traceId, spanId } = e.spanContext();
    let n = pK(e);
    return Iy(traceId, spanId, n);
}
export function uU(e) {
    if (e && e.length > 0) {
        return e.map(({ context: { spanId, traceId, traceFlags, ...rest }, attributes })=>({
                span_id: spanId,
                trace_id: traceId,
                sampled: traceFlags === aO,
                attributes,
                ...rest
            }));
    }
}
export function HQ(e) {
    if (e?.length) {
        return e.map(({ context: { spanId, traceId, traceFlags }, attributes })=>({
                span_id: spanId,
                trace_id: traceId,
                sampled: traceFlags === aO,
                attributes
            }));
    }
}
export function cI(e) {
    if (typeof e === "number") {
        return O(e);
    }
    if (Array.isArray(e)) {
        return e[0] + e[1] / 1000000000;
    }
    if (e instanceof Date) {
        return O(e.getTime());
    }
    return zf();
}
function O(e) {
    if (e > 9999999999) {
        return e / 1000;
    }
    return e;
}
export function et(e) {
    if (A(e)) {
        return e.getSpanJSON();
    }
    let { spanId, traceId } = e.spanContext();
    if (x(e)) {
        let { attributes, startTime, name, endTime, status, links } = e;
        return {
            span_id: spanId,
            trace_id: traceId,
            data: attributes,
            description: name,
            parent_span_id: w(e),
            start_timestamp: cI(startTime),
            timestamp: cI(endTime) || undefined,
            status: yW(status),
            op: attributes[uT],
            origin: attributes[JD],
            links: uU(links)
        };
    }
    return {
        span_id: spanId,
        trace_id: traceId,
        start_timestamp: 0,
        data: {}
    };
}
export function RD(e) {
    if (A(e)) {
        return e.getStreamedSpanJSON();
    }
    let { spanId, traceId } = e.spanContext();
    if (x(e)) {
        let { attributes, startTime, name, endTime, status, links } = e;
        return {
            name,
            span_id: spanId,
            trace_id: traceId,
            parent_span_id: w(e),
            start_timestamp: cI(startTime),
            end_timestamp: cI(endTime),
            is_segment: e === zU(e),
            status: i$(status),
            attributes,
            links: HQ(links)
        };
    }
    return {
        span_id: spanId,
        trace_id: traceId,
        start_timestamp: 0,
        name: "",
        end_timestamp: 0,
        status: "ok",
        is_segment: e === zU(e)
    };
}
function w(e) {
    if ("parentSpanId" in e) {
        return e.parentSpanId;
    }
    if ("parentSpanContext" in e) {
        return e.parentSpanContext?.spanId;
    }
}
function x(e) {
    return !!e.attributes && !!e.startTime && !!e.name && !!e.endTime && !!e.status;
}
function A(e) {
    return typeof e.getSpanJSON === "function";
}
export function pK(e) {
    let { traceFlags } = e.spanContext();
    return traceFlags === aO;
}
export function yW(e) {
    if (e && e.code !== a3) {
        if (e.code === F3) {
            return "ok";
        }
        return e.message || "internal_error";
    }
}
export function i$(e) {
    if (e && e.code !== F3 && e.code !== a3 && e.message !== "cancelled") {
        return "error";
    }
    return "ok";
}
let k = "_sentryChildSpans";
let I = "_sentryRootSpan";
export function Hu(e, t) {
    let r = e[I] || e;
    my(t, I, r);
    if (e[k]) {
        e[k].add(t);
    } else {
        my(e, k, new Set([
            t
        ]));
    }
}
export function VS(e, t) {
    if (e[k]) {
        e[k].delete(t);
    }
}
export function xO(e) {
    let t = new Set;
    (function e(r) {
        if (!t.has(r) && pK(r)) {
            for (let n of (t.add(r), r[k] ? Array.from(r[k]) : [])){
                e(n);
            }
        }
    })(e);
    return Array.from(t);
}
export function zU(e) {
    return e[I] || e;
}
export function Bk() {
    let e = EU();
    let t = h(e);
    if (t.getActiveSpan) {
        return t.getActiveSpan();
    }
    return f(o5());
}
export function xl() {
    if (!g) {
        pq(()=>{
            console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.");
        });
        g = true;
    }
}
