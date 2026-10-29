import { U } from "./module-26552.js";
import { T as T_1 } from "./module-61571.js";
import { Yz } from "./module-43275.js";
import { Qg } from "./module-16649.js";
import { XW, xg } from "./module-43115.js";
import { H } from "./module-66941.js";
import { O } from "./module-49636.js";
import { M6, eJ } from "./module-28385.js";
import { S8 } from "./module-2332.js";
import { Om, e2 } from "./module-3055.js";
import { xv } from "./module-35868.js";
import { lu } from "./module-87624.js";
let n;
let a;
let o;
let i;
export function mG(e, t, r, v, b, E) {
    let R;
    let S;
    let { normalizeDepth = 3, normalizeMaxBreadth = 1000 } = e;
    let T = {
        ...t,
        event_id: t.event_id || r.event_id || eJ(),
        timestamp: t.timestamp || lu()
    };
    let j = r.integrations || e.integrations.map((e)=>e.name);
    ((e, { environment, release, dist, maxValueLength })=>{
        e.environment = e.environment || environment || U;
        if (!e.release && release) {
            e.release = release;
        }
        if (!e.dist && dist) {
            e.dist = dist;
        }
        let e_request = e.request;
        if (e_request?.url && maxValueLength) {
            e_request.url = xv(e_request.url, maxValueLength);
        }
        if (maxValueLength) {
            e.exception?.values?.forEach((e)=>{
                if (e.value) {
                    e.value = xv(e.value, maxValueLength);
                }
            });
        }
    })(T, e);
    R = T;
    if ((S = j).length > 0) {
        R.sdk = R.sdk || {};
        R.sdk.integrations = [
            ...R.sdk.integrations || [],
            ...S
        ];
    }
    if (b) {
        b.emit("applyFrameMetadata", t);
    }
    if (t.type === undefined) {
        ((e, t)=>{
            let r = ((e)=>{
                let O_1__sentryDebugIds = O._sentryDebugIds;
                let O_1__debugIds = O._debugIds;
                if (!O_1__sentryDebugIds && !O_1__debugIds) {
                    return {};
                }
                let s = O_1__sentryDebugIds ? Object.keys(O_1__sentryDebugIds) : [];
                let l = O_1__debugIds ? Object.keys(O_1__debugIds) : [];
                if (i && s.length === a && l.length === o) {
                    return i;
                }
                a = s.length;
                o = l.length;
                i = {};
                if (!n) {
                    n = {};
                }
                let u = (t, r)=>{
                    for (let a of t){
                        let t = r[a];
                        let o = n?.[a];
                        if (o && i && t) {
                            i[o[0]] = t;
                            if (n) {
                                n[a] = [
                                    o[0],
                                    t
                                ];
                            }
                        } else if (t) {
                            let r = e(a);
                            for(let e = r.length - 1; e >= 0; e--){
                                let o = r[e];
                                let s = o?.filename;
                                if (s && i && n) {
                                    i[s] = t;
                                    n[a] = [
                                        s,
                                        t
                                    ];
                                    break;
                                }
                            }
                        }
                    }
                };
                if (O_1__sentryDebugIds) {
                    u(s, O_1__sentryDebugIds);
                }
                if (O_1__debugIds) {
                    u(l, O_1__debugIds);
                }
                return i;
            })(t);
            e.exception?.values?.forEach((e)=>{
                e.stacktrace?.frames?.forEach((e)=>{
                    if (e.filename) {
                        e.debug_id = r[e.filename];
                    }
                });
            });
        })(T, e.stackParser);
    }
    let w = ((e, t)=>{
        if (!t) {
            return e;
        }
        let r = e ? e.clone() : new H;
        r.update(t);
        return r;
    })(v, r.captureContext);
    if (r.mechanism) {
        M6(T, r.mechanism);
    }
    let x = b ? b.getEventProcessors() : [];
    let A = Om(E, w);
    let C = [
        ...r.attachments || [],
        ...A.attachments
    ];
    if (C.length) {
        r.attachments = C;
    }
    e2(T, A);
    let M = [
        ...x,
        ...A.eventProcessors
    ];
    return (r.data && r.data.__sentry__ === true ? XW(T) : ((e, t, r, n = 0)=>{
        try {
            let a = function e(t, r, n, a) {
                let o = n[a];
                if (!t || !o) {
                    return t;
                }
                let i = o({
                    ...t
                }, r);
                if (T_1 && i === null) {
                    Yz.log(`Event processor "${o.id || "?"}" dropped event`);
                }
                if (Qg(i)) {
                    return i.then((t)=>e(t, r, n, a + 1));
                }
                return e(i, r, n, a + 1);
            }(t, r, e, n);
            if (Qg(a)) {
                return a;
            }
            return XW(a);
        } catch (error) {
            return xg(error);
        }
    })(M, T, r)).then((e)=>{
        if (e) {
            ((e)=>{
                let t = {};
                e.exception?.values?.forEach((e)=>{
                    e.stacktrace?.frames?.forEach((e)=>{
                        if (e.debug_id) {
                            if (e.abs_path) {
                                t[e.abs_path] = e.debug_id;
                            } else if (e.filename) {
                                t[e.filename] = e.debug_id;
                            }
                            delete e.debug_id;
                        }
                    });
                });
                if (Object.keys(t).length === 0) {
                    return;
                }
                e.debug_meta = e.debug_meta || {};
                e.debug_meta.images = e.debug_meta.images || [];
                let images = e.debug_meta.images;
                Object.entries(t).forEach(([code_file, debug_id])=>{
                    images.push({
                        type: "sourcemap",
                        code_file,
                        debug_id
                    });
                });
            })(e);
        }
        if (typeof normalizeDepth === "number" && normalizeDepth > 0) {
            return ((e, normalizeDepth_1, normalizeMaxBreadth_1)=>{
                if (!e) {
                    return null;
                }
                let n = {
                    ...e,
                    ...e.breadcrumbs && {
                        breadcrumbs: e.breadcrumbs.map((e)=>({
                                ...e,
                                ...e.data && {
                                    data: S8(e.data, normalizeDepth_1, normalizeMaxBreadth_1)
                                }
                            }))
                    },
                    ...e.user && {
                        user: S8(e.user, normalizeDepth_1, normalizeMaxBreadth_1)
                    },
                    ...e.contexts && {
                        contexts: S8(e.contexts, normalizeDepth_1, normalizeMaxBreadth_1)
                    },
                    ...e.extra && {
                        extra: S8(e.extra, normalizeDepth_1, normalizeMaxBreadth_1)
                    }
                };
                if (e.contexts?.trace && n.contexts) {
                    n.contexts.trace = e.contexts.trace;
                    if (e.contexts.trace.data) {
                        n.contexts.trace.data = S8(e.contexts.trace.data, normalizeDepth_1, normalizeMaxBreadth_1);
                    }
                }
                if (e.spans) {
                    n.spans = e.spans.map((e)=>({
                            ...e,
                            ...e.data && {
                                data: S8(e.data, normalizeDepth_1, normalizeMaxBreadth_1)
                            }
                        }));
                }
                if (e.contexts?.flags && n.contexts) {
                    n.contexts.flags = S8(e.contexts.flags, 3, normalizeMaxBreadth_1);
                }
                return n;
            })(e, normalizeDepth, normalizeMaxBreadth);
        }
        return e;
    });
}
export function li(captureContext) {
    if (captureContext) {
        let t;
        if ((t = captureContext) instanceof H || typeof t === "function" || Object.keys(captureContext).some((e)=>E.includes(e))) {
            return {
                captureContext
            };
        }
        return captureContext;
    }
}
let E = [
    "user",
    "level",
    "extra",
    "contexts",
    "tags",
    "fingerprint",
    "propagationContext"
];
