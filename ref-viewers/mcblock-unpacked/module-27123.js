import { k1 } from "./module-89135.js";
import { S } from "./module-97731.js";
import { SB } from "./module-22758.js";
import { Cj, h4, n2, y5 } from "./module-31209.js";
import { e as e_1 } from "./module-47434.js";
import { et, xl } from "./module-51290.js";
export function LE(e, t, r, n) {
    let sdk = Cj(r);
    let s = {
        sent_at: new Date().toISOString(),
        ...sdk && {
            sdk
        },
        ...!!n && t && {
            dsn: SB(t)
        }
    };
    let l = "aggregates" in e ? [
        {
            type: "sessions"
        },
        e
    ] : [
        {
            type: "session"
        },
        e.toJSON()
    ];
    return h4(s, [
        l
    ]);
}
export function V7(e, t, r, n) {
    let a = Cj(r);
    let type = e.type && e.type !== "replay_event" ? e.type : "event";
    ((e, t)=>{
        if (!t) {
            return;
        }
        let r = e.sdk || {};
        e.sdk = {
            ...r,
            name: r.name || t.name,
            version: r.version || t.version,
            integrations: [
                ...e.sdk?.integrations || [],
                ...t.integrations || []
            ],
            packages: [
                ...e.sdk?.packages || [],
                ...t.packages || []
            ],
            settings: e.sdk?.settings || t.settings ? {
                ...e.sdk?.settings,
                ...t.settings
            } : undefined
        };
    })(e, r?.sdk);
    let s = n2(e, a, n, t);
    delete e.sdkProcessingMetadata;
    let l = [
        {
            type
        },
        e
    ];
    return h4(s, [
        l
    ]);
}
export function lu(e, t) {
    let trace = k1(e[0]);
    let u = t?.getDsn();
    let c = t?.getOptions().tunnel;
    let f = {
        sent_at: new Date().toISOString(),
        ...!!trace.trace_id && !!trace.public_key && {
            trace
        },
        ...!!c && u && {
            dsn: SB(u)
        }
    };
    let { beforeSendSpan, ignoreSpans } = t?.getOptions() || {};
    let h = ignoreSpans?.length ? e.filter((e)=>!e_1(et(e), ignoreSpans)) : e;
    let _ = e.length - h.length;
    if (_) {
        t?.recordDroppedEvent("before_send", "span", _);
    }
    let m = beforeSendSpan ? (e)=>{
        let t = et(e);
        let r = S(beforeSendSpan) ? t : beforeSendSpan(t);
        return r || (xl(), t);
    } : et;
    let g = [];
    for (let e of h){
        let t = m(e);
        if (t) {
            g.push(y5(t));
        }
    }
    return h4(f, g);
}
