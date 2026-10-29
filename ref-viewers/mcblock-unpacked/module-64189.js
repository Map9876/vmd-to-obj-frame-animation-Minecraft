import { yD } from "./module-30249.js";
import { i } from "./module-40364.js";
import { Z, e as e_1 } from "./module-17588.js";
import { hY } from "./module-78714.js";
export let MI = RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");
export function kM(e, t) {
    let r = ((e)=>{
        let parentSampled_1;
        if (!e) {
            return;
        }
        let r = e.match(MI);
        if (r) {
            if (r[3] === "1") {
                parentSampled_1 = true;
            } else if (r[3] === "0") {
                parentSampled_1 = false;
            }
            return {
                traceId: r[1],
                parentSampled: parentSampled_1,
                parentSpanId: r[2]
            };
        }
    })(e);
    let l = yD(t);
    if (!r?.traceId) {
        return {
            traceId: e_1(),
            sampleRand: hY()
        };
    }
    let sampleRand = ((e, t)=>{
        let r = i(t?.sample_rand);
        if (r !== undefined) {
            return r;
        }
        let n = i(t?.sample_rate);
        if (n && e?.parentSampled !== undefined) {
            if (e.parentSampled) {
                return hY() * n;
            }
            return n + hY() * (1 - n);
        }
        return hY();
    })(r, l);
    if (l) {
        l.sample_rand = sampleRand.toString();
    }
    let { traceId, parentSpanId, parentSampled } = r;
    return {
        traceId,
        parentSpanId,
        sampled: parentSampled,
        dsc: l || {},
        sampleRand
    };
}
export function TC(e = e_1(), t = Z(), r) {
    let n = "";
    if (r !== undefined) {
        n = r ? "-1" : "-0";
    }
    return `${e}-${t}${n}`;
}
export function Iy(e = e_1(), t = Z(), r) {
    return `00-${e}-${t}-${r ? "01" : "00"}`;
}
