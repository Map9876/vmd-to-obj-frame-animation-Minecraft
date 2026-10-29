import { Se } from "./module-60057.js";
import { SB } from "./module-22758.js";
import { S8 } from "./module-2332.js";
import { O } from "./module-49636.js";
export function h4(e, t = []) {
    return [
        e,
        t
    ];
}
export function W3([r, n], t) {
    return [
        r,
        [
            ...n,
            t
        ]
    ];
}
export function yH(e, t) {
    for (let r of e[1]){
        let e = r[0].type;
        if (t(r, e)) {
            return true;
        }
    }
    return false;
}
export function hP(e, t) {
    return yH(e, (e, r)=>t.includes(r));
}
function f(e) {
    let t = Se(O);
    if (t.encodePolyfill) {
        return t.encodePolyfill(e);
    }
    return new TextEncoder().encode(e);
}
export function bN([t, r]) {
    let n = JSON.stringify(t);
    function a(e) {
        if (typeof n === "string") {
            n = typeof e === "string" ? n + e : [
                f(n),
                e
            ];
        } else {
            n.push(typeof e === "string" ? f(e) : e);
        }
    }
    for (let e of r){
        let [t, r] = e;
        a(`
${JSON.stringify(t)}
`);
        if (typeof r === "string" || r instanceof Uint8Array) {
            a(r);
        } else {
            let e;
            try {
                e = JSON.stringify(r);
            } catch  {
                e = JSON.stringify(S8(r));
            }
            a(e);
        }
    }
    if (typeof n === "string") {
        return n;
    }
    return ((e)=>{
        let t = new Uint8Array(e.reduce((acc, item)=>acc + item.length, 0));
        let r = 0;
        for (let n of e){
            t.set(n, r);
            r += n.length;
        }
        return t;
    })(n);
}
export function y5(e) {
    return [
        {
            type: "span"
        },
        e
    ];
}
export function bm(e) {
    let t = typeof e.data === "string" ? f(e.data) : e.data;
    return [
        {
            type: "attachment",
            length: t.length,
            filename: e.filename,
            content_type: e.contentType,
            attachment_type: e.attachmentType
        },
        t
    ];
}
let _ = {
    sessions: "session",
    event: "error",
    client_report: "internal",
    user_report: "default",
    profile_chunk: "profile",
    replay_event: "replay",
    replay_recording: "replay",
    check_in: "monitor",
    raw_security: "security",
    log: "log_item",
    trace_metric: "metric"
};
export function zk(e) {
    if (e in _) {
        return _[e];
    }
    return e;
}
export function Cj(e) {
    if (!e?.sdk) {
        return;
    }
    let { name, version } = e.sdk;
    return {
        name,
        version
    };
}
export function n2(e, sdk, r, n) {
    let trace = e.sdkProcessingMetadata?.dynamicSamplingContext;
    return {
        event_id: e.event_id,
        sent_at: new Date().toISOString(),
        ...sdk && {
            sdk
        },
        ...!!r && n && {
            dsn: SB(n)
        },
        ...trace && {
            trace
        }
    };
}
