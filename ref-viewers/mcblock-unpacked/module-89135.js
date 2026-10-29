import { U } from "./module-26552.js";
import { KU } from "./module-2257.js";
import { Ef, i_, sy } from "./module-88722.js";
import { yD } from "./module-30249.js";
import { ul } from "./module-22758.js";
import { f } from "./module-90929.js";
import { my } from "./module-73314.js";
import { et, pK, zU } from "./module-51290.js";
import { L } from "./module-13651.js";
let d = "_frozenDsc";
export function LZ(e, t) {
    my(e, d, t);
}
function h(trace_id, t) {
    let r = t.getOptions();
    let { publicKey } = t.getDsn() || {};
    let o = {
        environment: r.environment || U,
        release: r.release,
        public_key: publicKey,
        trace_id,
        org_id: ul(t)
    };
    t.emit("createDsc", o);
    return o;
}
export function ao(e, t) {
    let r = t.getPropagationContext();
    return r.dsc || h(r.traceId, e);
}
export function k1(e) {
    let t = KU();
    if (!t) {
        return {};
    }
    let r = zU(e);
    let n = et(r);
    let n_data = n.data;
    let traceState = r.spanContext().traceState;
    let p = traceState?.get("sentry.sample_rate") ?? n_data[sy] ?? n_data[Ef];
    function _(e) {
        if (typeof p === "number" || typeof p === "string") {
            e.sample_rate = `${p}`;
        }
        return e;
    }
    let m = r[d];
    if (m) {
        return _(m);
    }
    let g = traceState?.get("sentry.dsc");
    let y = g && yD(g);
    if (y) {
        return _(y);
    }
    let v = h(e.spanContext().traceId, t);
    let b = n_data[i_] ?? n_data["sentry.span.source"];
    let n_description = n.description;
    if (b !== "url" && n_description) {
        v.transaction = n_description;
    }
    if (f()) {
        v.sampled = String(pK(r));
        v.sample_rand = traceState?.get("sentry.sample_rand") ?? L(r).scope?.getPropagationContext().sampleRand.toString();
    }
    _(v);
    t.emit("createDsc", v, r);
    return v;
}
