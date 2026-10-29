import { O } from "./module-49636.js";
import { Ow, Yz, Z9, pq } from "./module-43275.js";
import { M as version_1 } from "./module-81259.js";
import { J0, J5, SA, o as o_1, r as r_1 } from "./module-27122.js";
import { T } from "./module-61571.js";
import { $X, GR, M6, eJ as eJ_1, gO } from "./module-28385.js";
import { Xr, gt } from "./module-35868.js";
import { KU, o5, rm, vn } from "./module-2257.js";
import { GS, HF, my, sp } from "./module-73314.js";
import { E1, Fy, JD, i_, jG, uT } from "./module-88722.js";
import { et as et_1, xl } from "./module-51290.js";
import { RV, gd, qQ, vk, yF } from "./module-85236.js";
import { U as U_1 } from "./module-26552.js";
import { LE, V7 } from "./module-27123.js";
import { BY } from "./module-60057.js";
import { AD, SB, hH } from "./module-22758.js";
import { W3, bN, bm, h4, hP, yH, zk } from "./module-31209.js";
import { qO } from "./module-24617.js";
import { ao } from "./module-89135.js";
import { S } from "./module-97731.js";
import { XW, xg } from "./module-43115.js";
import { Wk, hY } from "./module-78714.js";
import { k3, lu } from "./module-87624.js";
import { BD, Kg, NF, Qd, Qg, T2, W6, bJ, sO, tH, xH } from "./module-16649.js";
import V from "./module-76871.js";
import { i as i_1 } from "./module-40364.js";
import { mG } from "./module-71350.js";
import * as Z from "./module-47434.js";
import { e as e_1 } from "./module-14356.js";
import * as ev from "./module-2332.js";
import * as ew from "./module-39619.js";
import { AS, aj, s5 } from "./module-21010.js";
import { ur } from "./module-81725.js";
import { $N, Hd, xE } from "./module-60567.js";
import { Dl, f, zm } from "./module-69142.js";
import { j } from "./module-38599.js";
import { Er, Mn } from "./module-62234.js";
import { _ as __1 } from "./module-79152.js";
import { T as T_1 } from "./module-91488.js";
import { L as L_1 } from "./module-54402.js";
import { r as r_2 } from "./module-20370.js";
import { a3 } from "./module-51217.js";
import { T as T_3 } from "./module-96812.js";
import { version } from "./module-61426.js";
import { T as T_4 } from "./module-5424.js";
import tu from "./module-95704.js";
import { Nt, Sx, dp, e3 as e3_1 } from "./module-47848.js";
import { NI, jw, q3 } from "./module-91815.js";
import { D0 } from "./module-30249.js";
import tp from "./module-73360.js";
import * as tE from "./module-71702.js";
let n;
let a;
let o;
let i;
function c(e, t, r = [
    t
], n = "npm") {
    let a = (e._metadata = e._metadata || {}).sdk = e._metadata.sdk || {};
    if (!a.name) {
        a.name = `sentry.javascript.${t}`;
        a.packages = r.map((e)=>({
                name: `${n}:@sentry/${e}`,
                version: version_1
            }));
        a.version = version_1;
    }
}
let p = [];
function h(e, t) {
    for (let r of t){
        if (r?.afterAllSetup) {
            r.afterAllSetup(e);
        }
    }
}
function _(e, t, r) {
    if (r[t.name]) {
        if (T) {
            Yz.log(`Integration skipped because it was already installed: ${t.name}`);
        }
        return;
    }
    r[t.name] = t;
    if (!(p.includes(t.name) || typeof t.setupOnce !== "function")) {
        t.setupOnce();
        p.push(t.name);
    }
    if (t.setup && typeof t.setup === "function") {
        t.setup(e);
    }
    if (typeof t.preprocessEvent === "function") {
        let r = t.preprocessEvent.bind(t);
        e.on("preprocessEvent", (t, n)=>r(t, n, e));
    }
    if (typeof t.processEvent === "function") {
        let r = t.processEvent.bind(t);
        let n = Object.assign((t, n)=>r(t, n, e), {
            id: t.name
        });
        e.addEventProcessor(n);
    }
    [
        "processSpan",
        "processSegmentSpan"
    ].forEach((r)=>{
        let n = t[r];
        if (typeof n === "function") {
            e.on(r, (r)=>n.call(t, r, e));
        }
    });
    if (T) {
        Yz.log(`Integration installed: ${t.name}`);
    }
}
function m(e) {
    let t = [];
    if (e.message) {
        t.push(e.message);
    }
    try {
        let r = e.exception.values[e.exception.values.length - 1];
        if (r?.value) {
            t.push(r.value);
            if (r.type) {
                t.push(`${r.type}: ${r.value}`);
            }
        }
    } catch  {}
    return t;
}
let v = [
    /^Script error\.?$/,
    /^Javascript error: Script error\.? on line 0$/,
    /^ResizeObserver loop completed with undelivered notifications.$/,
    /^Cannot redefine property: googletag$/,
    /^Can't find variable: gmo$/,
    /^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,
    /can't redefine non-configurable property "solana"/,
    /vv\(\)\.getRestrictions is not a function/,
    /Can't find variable: _AutofillCallbackHandler/,
    /Object Not Found Matching Id:\d+, MethodName:simulateEvent/,
    /^Java exception was raised during method invocation$/
];
function b(e = {}, t = {}) {
    return {
        allowUrls: [
            ...e.allowUrls || [],
            ...t.allowUrls || []
        ],
        denyUrls: [
            ...e.denyUrls || [],
            ...t.denyUrls || []
        ],
        ignoreErrors: [
            ...e.ignoreErrors || [],
            ...t.ignoreErrors || [],
            ...e.disableErrorDefaults ? [] : v
        ],
        ignoreTransactions: [
            ...e.ignoreTransactions || [],
            ...t.ignoreTransactions || []
        ]
    };
}
function E(e) {
    try {
        let t = [
            ...e.exception?.values ?? []
        ].reverse().find((e)=>e.mechanism?.parent_id === undefined && e.stacktrace?.frames?.length);
        let r = t?.stacktrace?.frames;
        if (r) {
            return ((e = [])=>{
                for(let t = e.length - 1; t >= 0; t--){
                    let r = e[t];
                    if (r && r.filename !== "<anonymous>" && r.filename !== "[native code]") {
                        return r.filename || null;
                    }
                }
                return null;
            })(r);
        }
        return null;
    } catch  {
        if (T) {
            Yz.error(`Cannot extract url for event ${$X(e)}`);
        }
        return null;
    }
}
let P = new WeakMap;
function w(e, t) {
    let r = RV(e);
    let n = RV(t);
    if (!r && !n) {
        return true;
    }
    if (r && !n || !r && n || n.length !== r.length) {
        return false;
    }
    for(let e = 0; e < n.length; e++){
        let t = n[e];
        let a = r[e];
        if (t.filename !== a.filename || t.lineno !== a.lineno || t.colno !== a.colno || t.function !== a.function) {
            return false;
        }
    }
    return true;
}
function x({ fingerprint }, t) {
    let t_fingerprint = t.fingerprint;
    if (!fingerprint && !t_fingerprint) {
        return true;
    }
    if (fingerprint && !t_fingerprint || !fingerprint && t_fingerprint) {
        return false;
    }
    try {
        return fingerprint.join("") === t_fingerprint.join("");
    } catch  {
        return false;
    }
}
function A(e) {
    return e.exception?.values?.[0];
}
function D(e, t) {
    let r;
    let n = t ?? (r = e, L().get(r)) ?? [];
    if (n.length === 0) {
        return;
    }
    let a = e.getOptions();
    let o = ((e, t, r, n)=>{
        let a = {};
        if (t?.sdk) {
            a.sdk = {
                name: t.sdk.name,
                version: t.sdk.version
            };
        }
        if (r && n) {
            a.dsn = SB(n);
        }
        return h4(a, [
            [
                {
                    type: "log",
                    item_count: e.length,
                    content_type: "application/vnd.sentry.items.log+json"
                },
                {
                    items: e
                }
            ]
        ]);
    })(n, a._metadata, a.tunnel, e.getDsn());
    L().set(e, []);
    e.emit("flushLogs");
    e.sendEnvelope(o);
}
function L() {
    return BY("clientToLogBufferMap", ()=>new WeakMap);
}
function U(e, t) {
    let r;
    let n = t ?? (r = e, H().get(r)) ?? [];
    if (n.length === 0) {
        return;
    }
    let a = e.getOptions();
    let o = ((e, t, r, n)=>{
        let a = {};
        if (t?.sdk) {
            a.sdk = {
                name: t.sdk.name,
                version: t.sdk.version
            };
        }
        if (r && n) {
            a.dsn = SB(n);
        }
        return h4(a, [
            [
                {
                    type: "trace_metric",
                    item_count: e.length,
                    content_type: "application/vnd.sentry.items.trace-metric+json"
                },
                {
                    items: e
                }
            ]
        ]);
    })(n, a._metadata, a.tunnel, e.getDsn());
    H().set(e, []);
    e.emit("flushMetrics");
    e.sendEnvelope(o);
}
function H() {
    return BY("clientToMetricBufferMap", ()=>new WeakMap);
}
function Y(e) {
    if (typeof e === "object" && typeof e.unref === "function") {
        e.unref();
    }
    return e;
}
let SYMBOL_SENTRY_BUFFER_FULL_ERROR = Symbol.for("SentryBufferFullError");
function W(e = 100) {
    let t = new Set;
    return {
        get $ () {
            return Array.from(t);
        },
        add: function(r) {
            if (!(t.size < e)) {
                return xg(SYMBOL_SENTRY_BUFFER_FULL_ERROR);
            }
            let n = r();
            t.add(n);
            n.then(()=>{
                t.delete(n);
            }, ()=>{
                t.delete(n);
            });
            return n;
        },
        drain: function(e) {
            if (!t.size) {
                return XW(true);
            }
            let r = Promise.allSettled(Array.from(t)).then(()=>true);
            if (e) {
                return Promise.race([
                    r,
                    new Promise((resolve)=>Y(setTimeout(()=>resolve(false), e)))
                ]);
            }
            return r;
        }
    };
}
let ee = "Not capturing exception because it's already been captured.";
let et = "Discarded session because of missing or non-string release";
let SYMBOL_SENTRY_INTERNAL_ERROR = Symbol.for("SentryInternalError");
let SYMBOL_SENTRY_DO_NOT_SEND_EVENT_ERROR = Symbol.for("SentryDoNotSendEventError");
function ea(e) {
    return {
        message: e,
        [SYMBOL_SENTRY_INTERNAL_ERROR]: true
    };
}
function eo(e) {
    return {
        message: e,
        [SYMBOL_SENTRY_DO_NOT_SEND_EVENT_ERROR]: true
    };
}
function ei(e) {
    return !!e && typeof e === "object" && SYMBOL_SENTRY_INTERNAL_ERROR in e;
}
function es(e) {
    return !!e && typeof e === "object" && SYMBOL_SENTRY_DO_NOT_SEND_EVENT_ERROR in e;
}
function el(e, t, r, n, a) {
    let o;
    let i = 0;
    let s = false;
    e.on(r, ()=>{
        i = 0;
        clearTimeout(o);
        s = false;
    });
    e.on(t, (t)=>{
        if ((i += n(t)) >= 800000) {
            a(e);
        } else if (!s) {
            s = true;
            o = Y(setTimeout(()=>{
                a(e);
            }, 5000));
        }
    });
    e.on("flush", ()=>{
        a(e);
    });
}
class eu {
    constructor(e){
        this._options = e;
        this._integrations = {};
        this._numProcessing = 0;
        this._outcomes = {};
        this._hooks = {};
        this._eventProcessors = [];
        this._promiseBuffer = W(e.transportOptions?.bufferSize ?? 64);
        if (e.dsn) {
            this._dsn = AD(e.dsn);
        } else if (T) {
            Yz.warn("No DSN provided, client will not send events.");
        }
        if (this._dsn) {
            let url = ((e, t, r)=>t || `${((e)=>{
                    let t = e.protocol ? `${e.protocol}:` : "";
                    let r = e.port ? `:${e.port}` : "";
                    return `${t}//${e.host}${r}${e.path ? `/${e.path}` : ""}/api/`;
                })(e)}${e.projectId}/envelope/?${((e, t)=>{
                    let r = {
                        sentry_version: "7"
                    };
                    if (e.publicKey) {
                        r.sentry_key = e.publicKey;
                    }
                    if (t) {
                        r.sentry_client = `${t.name}/${t.version}`;
                    }
                    return new URLSearchParams(r).toString();
                })(e, r)}`)(this._dsn, e.tunnel, e._metadata ? e._metadata.sdk : undefined);
            this._transport = e.transport({
                tunnel: this._options.tunnel,
                recordDroppedEvent: this.recordDroppedEvent.bind(this),
                ...e.transportOptions,
                url
            });
        }
        this._options.enableLogs = this._options.enableLogs ?? this._options._experiments?.enableLogs;
        if (this._options.enableLogs) {
            el(this, "afterCaptureLog", "flushLogs", eh, D);
        }
        if (this._options.enableMetrics ?? this._options._experiments?.enableMetrics ?? true) {
            el(this, "afterCaptureMetric", "flushMetrics", ep, U);
        }
    }
    captureException(e, t, r) {
        let n = eJ_1();
        if (GR(e)) {
            if (T) {
                Yz.log(ee);
            }
            return n;
        }
        let a = {
            event_id: n,
            ...t
        };
        this._process(()=>this.eventFromException(e, a).then((e)=>this._captureEvent(e, a, r)).then((e)=>e), "error");
        return a.event_id;
    }
    captureMessage(e, t, r, n) {
        let a = {
            event_id: eJ_1(),
            ...r
        };
        let o = NF(e) ? e : String(e);
        let i = sO(e);
        let s = i ? this.eventFromMessage(o, t, a) : this.eventFromException(e, a);
        this._process(()=>s.then((e)=>this._captureEvent(e, a, n)), i ? "unknown" : "error");
        return a.event_id;
    }
    captureEvent(e, t, r) {
        let n = eJ_1();
        if (t?.originalException && GR(t.originalException)) {
            if (T) {
                Yz.log(ee);
            }
            return n;
        }
        let a = {
            event_id: n,
            ...t
        };
        let o = e.sdkProcessingMetadata || {};
        let o_capturedSpanScope = o.capturedSpanScope;
        let o_capturedSpanIsolationScope = o.capturedSpanIsolationScope;
        let u = ec(e.type);
        this._process(()=>this._captureEvent(e, a, o_capturedSpanScope || r, o_capturedSpanIsolationScope), u);
        return a.event_id;
    }
    captureSession(e) {
        this.sendSession(e);
        qO(e, {
            init: false
        });
    }
    getDsn() {
        return this._dsn;
    }
    getOptions() {
        return this._options;
    }
    getSdkMetadata() {
        return this._options._metadata;
    }
    getTransport() {
        return this._transport;
    }
    async flush(e) {
        let _transport = this._transport;
        if (!_transport) {
            return true;
        }
        this.emit("flush");
        let r = await this._isClientDoneProcessing(e);
        let n = await _transport.flush(e);
        return r && n;
    }
    async close(e) {
        D(this);
        let t = await this.flush(e);
        this.getOptions().enabled = false;
        this.emit("close");
        return t;
    }
    getEventProcessors() {
        return this._eventProcessors;
    }
    addEventProcessor(e) {
        this._eventProcessors.push(e);
    }
    init() {
        if (this._isEnabled() || this._options.integrations.some(({ name })=>name.startsWith("Spotlight"))) {
            this._setupIntegrations();
        }
    }
    getIntegrationByName(e) {
        return this._integrations[e];
    }
    addIntegration(e) {
        let t = this._integrations[e.name];
        if (!t && e.beforeSetup) {
            e.beforeSetup(this);
        }
        _(this, e, this._integrations);
        if (!t) {
            h(this, [
                e
            ]);
        }
    }
    sendEvent(e, t = {}) {
        this.emit("beforeSendEvent", e, t);
        let r = V7(e, this._dsn, this._options._metadata, this._options.tunnel);
        for (let e of t.attachments || []){
            r = W3(r, bm(e));
        }
        this.sendEnvelope(r).then((t)=>this.emit("afterSendEvent", e, t));
    }
    sendSession(e) {
        let { release, environment = U_1 } = this._options;
        if ("aggregates" in e) {
            let n = e.attrs || {};
            if (!n.release && !release) {
                if (T) {
                    Yz.warn(et);
                }
                return;
            }
            n.release = n.release || release;
            n.environment = n.environment || environment;
            e.attrs = n;
        } else {
            if (!e.release && !release) {
                if (T) {
                    Yz.warn(et);
                }
                return;
            }
            e.release = e.release || release;
            e.environment = e.environment || environment;
        }
        this.emit("beforeSendSession", e);
        let n = LE(e, this._dsn, this._options._metadata, this._options.tunnel);
        this.sendEnvelope(n);
    }
    recordDroppedEvent(e, t, r = 1) {
        if (this._options.sendClientReports) {
            let n = `${e}:${t}`;
            if (T) {
                Yz.log(`Recording outcome: "${n}"${r > 1 ? ` (${r} times)` : ""}`);
            }
            this._outcomes[n] = (this._outcomes[n] || 0) + r;
        }
    }
    on(e, t) {
        let r = this._hooks[e] = this._hooks[e] || new Set;
        let n = (...e)=>t(...e);
        r.add(n);
        return ()=>{
            r.delete(n);
        };
    }
    emit(e, ...t) {
        let r = this._hooks[e];
        if (r) {
            r.forEach((e)=>e(...t));
        }
    }
    async sendEnvelope(e) {
        this.emit("beforeEnvelope", e);
        if (this._isEnabled() && this._transport) {
            try {
                return await this._transport.send(e);
            } catch (error) {
                if (T) {
                    Yz.error("Error while sending envelope:", error);
                }
                return {};
            }
        }
        if (T) {
            Yz.error("Transport disabled");
        }
        return {};
    }
    dispose() {}
    _setupIntegrations() {
        let { integrations } = this._options;
        this._integrations = ((e, integrations_1)=>{
            let r = {};
            integrations_1.forEach((t)=>{
                if (t?.beforeSetup) {
                    t.beforeSetup(e);
                }
            });
            integrations_1.forEach((t)=>{
                if (t) {
                    _(e, t, r);
                }
            });
            return r;
        })(this, integrations);
        h(this, integrations);
    }
    _updateSessionFromEvent(e, t) {
        let r = t.level === "fatal";
        let n = false;
        let a = t.exception?.values;
        if (a) {
            for (let e of (n = true, r = false, a)){
                if (e.mechanism?.handled === false) {
                    r = true;
                    break;
                }
            }
        }
        let o = e.status === "ok";
        if (o && e.errors === 0 || o && r) {
            qO(e, {
                ...r && {
                    status: "crashed"
                },
                errors: e.errors || Number(n || r)
            });
            this.captureSession(e);
        }
    }
    async _isClientDoneProcessing(e) {
        let t = 0;
        while(!e || t < e){
            await new Promise((resolve)=>setTimeout(resolve, 1));
            if (!this._numProcessing) {
                return true;
            }
            t++;
        }
        return false;
    }
    _isEnabled() {
        return this.getOptions().enabled !== false && this._transport !== undefined;
    }
    _prepareEvent(e, t, r, n) {
        let a = this.getOptions();
        let o = Object.keys(this._integrations);
        if (!t.integrations && o?.length) {
            t.integrations = o;
        }
        this.emit("preprocessEvent", e, t);
        if (!e.type) {
            n.setLastEventId(e.event_id || t.event_id);
        }
        return mG(a, e, t, r, this, n).then((e)=>{
            if (e !== null) {
                this.emit("postprocessEvent", e, t);
                e.contexts = {
                    trace: {
                        ...e.contexts?.trace,
                        ...vn(r)
                    },
                    ...e.contexts
                };
                e.sdkProcessingMetadata = {
                    dynamicSamplingContext: ao(this, r),
                    ...e.sdkProcessingMetadata
                };
            }
            return e;
        });
    }
    _captureEvent(e, t = {}, r = o5(), n = rm()) {
        if (T && ef(e)) {
            Yz.log(`Captured error event \`${m(e)[0] || "<unknown>"}\``);
        }
        return this._processEvent(e, t, r, n).then((e)=>e.event_id, (e)=>{
            if (T) {
                if (es(e)) {
                    Yz.log(e.message);
                } else if (ei(e)) {
                    Yz.warn(e.message);
                } else {
                    Yz.warn(e);
                }
            }
        });
    }
    _processEvent(e, t, r, n) {
        let a = this.getOptions();
        let { sampleRate } = a;
        let i = ed(e);
        let s = ef(e);
        let l = e.type || "error";
        let u = `before send for type \`${l}\``;
        let c = sampleRate === undefined ? undefined : i_1(sampleRate);
        if (s && typeof c === "number" && hY() > c) {
            this.recordDroppedEvent("sample_rate", "error");
            return xg(eo(`Discarding event because it's not included in the random sample (sampling rate = ${sampleRate})`));
        }
        let f = ec(e.type);
        return this._prepareEvent(e, t, r, n).then((e)=>{
            if (e === null) {
                this.recordDroppedEvent("event_processor", f);
                throw eo("An event processor returned `null`, will not send event.");
            }
            if (t.data?.__sentry__ === true) {
                return e;
            }
            return ((e, t)=>{
                let r = `${t} must return \`null\` or a valid event.`;
                if (Qg(e)) {
                    return e.then((e)=>{
                        if (!Qd(e) && e !== null) {
                            throw ea(r);
                        }
                        return e;
                    }, (e)=>{
                        throw ea(`${t} rejected with ${e}`);
                    });
                }
                if (!Qd(e) && e !== null) {
                    throw ea(r);
                }
                return e;
            })(((e, t, r, n)=>{
                let { beforeSend, beforeSendTransaction, ignoreSpans } = t;
                let s = !S(t.beforeSendSpan) && t.beforeSendSpan;
                let l = r;
                if (ef(l) && beforeSend) {
                    return beforeSend(l, n);
                }
                if (ed(l)) {
                    if (s || ignoreSpans) {
                        let t = ((e)=>{
                            let { trace_id, parent_span_id, span_id, status, origin, data, op } = e.contexts?.trace ?? {};
                            return {
                                data: data ?? {},
                                description: e.transaction,
                                op,
                                parent_span_id,
                                span_id: span_id ?? "",
                                start_timestamp: e.start_timestamp ?? 0,
                                status,
                                timestamp: e.timestamp,
                                trace_id: trace_id ?? "",
                                origin,
                                profile_id: data?.[E1],
                                exclusive_time: data?.[jG],
                                measurements: e.measurements,
                                is_segment: true
                            };
                        })(l);
                        if (ignoreSpans?.length && Z.e(t, ignoreSpans)) {
                            return null;
                        }
                        if (s) {
                            let e = s(t);
                            if (e) {
                                l = V.h(r, {
                                    type: "transaction",
                                    timestamp: e.timestamp,
                                    start_timestamp: e.start_timestamp,
                                    transaction: e.description,
                                    contexts: {
                                        trace: {
                                            trace_id: e.trace_id,
                                            span_id: e.span_id,
                                            parent_span_id: e.parent_span_id,
                                            op: e.op,
                                            status: e.status,
                                            origin: e.origin,
                                            data: {
                                                ...e.data,
                                                ...e.profile_id && {
                                                    [E1]: e.profile_id
                                                },
                                                ...e.exclusive_time && {
                                                    [jG]: e.exclusive_time
                                                }
                                            }
                                        }
                                    },
                                    measurements: e.measurements
                                });
                            } else {
                                xl();
                            }
                        }
                        if (l.spans) {
                            let t = [];
                            let r = l.spans;
                            for (let e of r){
                                if (ignoreSpans?.length && Z.e(e, ignoreSpans)) {
                                    Z.R(r, e);
                                    continue;
                                }
                                if (s) {
                                    let r = s(e);
                                    if (r) {
                                        t.push(r);
                                    } else {
                                        xl();
                                        t.push(e);
                                    }
                                } else {
                                    t.push(e);
                                }
                            }
                            let n = l.spans.length - t.length;
                            if (n) {
                                e.recordDroppedEvent("before_send", "span", n);
                            }
                            l.spans = t;
                        }
                    }
                    if (beforeSendTransaction) {
                        if (l.spans) {
                            let spanCountBeforeProcessing = l.spans.length;
                            l.sdkProcessingMetadata = {
                                ...r.sdkProcessingMetadata,
                                spanCountBeforeProcessing
                            };
                        }
                        return beforeSendTransaction(l, n);
                    }
                }
                return l;
            })(this, a, e, t), u);
        }).then((a)=>{
            if (a === null) {
                this.recordDroppedEvent("before_send", f);
                if (i) {
                    let t = 1 + (e.spans || []).length;
                    this.recordDroppedEvent("before_send", "span", t);
                }
                throw eo(`${u} returned \`null\`, will not send event.`);
            }
            let o = r.getSession() || n.getSession();
            if (s && o) {
                this._updateSessionFromEvent(o, a);
            }
            if (i) {
                let e = (a.sdkProcessingMetadata?.spanCountBeforeProcessing || 0) - (a.spans ? a.spans.length : 0);
                if (e > 0) {
                    this.recordDroppedEvent("before_send", "span", e);
                }
            }
            let a_transaction_info = a.transaction_info;
            if (i && a_transaction_info && a.transaction !== e.transaction) {
                a.transaction_info = {
                    ...a_transaction_info,
                    source: "custom"
                };
            }
            this.sendEvent(a, t);
            return a;
        }).then(null, (e)=>{
            if (es(e) || ei(e)) {
                throw e;
            }
            this.captureException(e, {
                mechanism: {
                    handled: false,
                    type: "internal"
                },
                data: {
                    __sentry__: true
                },
                originalException: e
            });
            throw ea(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${e}`);
        });
    }
    _process(e, t) {
        this._numProcessing++;
        this._promiseBuffer.add(e).then((e)=>{
            this._numProcessing--;
            return e;
        }, (e)=>{
            this._numProcessing--;
            if (e === SYMBOL_SENTRY_BUFFER_FULL_ERROR) {
                this.recordDroppedEvent("queue_overflow", t);
            }
            return e;
        });
    }
    _clearOutcomes() {
        let _outcomes = this._outcomes;
        this._outcomes = {};
        return Object.entries(_outcomes).map(([e, quantity])=>{
            let [reason, category] = e.split(":");
            return {
                reason,
                category,
                quantity
            };
        });
    }
    _flushOutcomes() {
        if (T) {
            Yz.log("Flushing outcomes...");
        }
        let e = this._clearOutcomes();
        if (e.length === 0) {
            if (T) {
                Yz.log("No outcomes to send");
            }
            return;
        }
        if (!this._dsn) {
            if (T) {
                Yz.log("No dsn provided, will not send outcomes");
            }
            return;
        }
        if (T) {
            Yz.log("Sending outcomes:", e);
        }
        let t = ((discarded_events, dsn, r)=>{
            let n = [
                {
                    type: "client_report"
                },
                {
                    timestamp: lu(),
                    discarded_events
                }
            ];
            return h4(dsn ? {
                dsn
            } : {}, [
                n
            ]);
        })(e, this._options.tunnel && SB(this._dsn));
        this.sendEnvelope(t);
    }
}
function ec(type) {
    if (type === "replay_event") {
        return "replay";
    }
    return type || "error";
}
function ef(e) {
    return e.type === undefined;
}
function ed(e) {
    return e.type === "transaction";
}
function ep(e) {
    let t = 0;
    if (e.name) {
        t += 2 * e.name.length;
    }
    return (t += 8) + e_(e.attributes);
}
function eh(e) {
    let t = 0;
    if (e.message) {
        t += 2 * e.message.length;
    }
    return t + e_(e.attributes);
}
function e_(attributes) {
    if (!attributes) {
        return 0;
    }
    let t = 0;
    Object.values(attributes).forEach((e)=>{
        if (Array.isArray(e)) {
            t += e.length * em(e[0]);
        } else if (sO(e)) {
            t += em(e);
        } else {
            t += 100;
        }
    });
    return t;
}
function em(e) {
    if (typeof e === "string") {
        return 2 * e.length;
    }
    if (typeof e === "number") {
        return 8;
    }
    return 4 * (typeof e === "boolean");
}
function ey(e) {
    if ("aggregates" in e) {
        if (e.attrs?.ip_address === undefined) {
            e.attrs = {
                ...e.attrs,
                ip_address: "{{auto}}"
            };
        }
    } else if (e.ipAddress === undefined) {
        e.ipAddress = "{{auto}}";
    }
}
function eb(e) {
    if (bJ(e) && "__sentry_fetch_url_host__" in e && typeof e.__sentry_fetch_url_host__ === "string") {
        return `${e.message} (${e.__sentry_fetch_url_host__})`;
    }
    return e.message;
}
function eE(e, t) {
    let r = eS(e, t);
    let n = {
        type: ((e)=>{
            let t = e?.name;
            if (!t && eO(e)) {
                if (e.message && Array.isArray(e.message) && e.message.length == 2) {
                    return e.message[0];
                }
                return "WebAssembly.Exception";
            }
            return t;
        })(t),
        value: ((e)=>{
            let t = e?.message;
            if (eO(e)) {
                if (Array.isArray(e.message) && e.message.length == 2) {
                    return e.message[1];
                }
                return "wasm exception";
            }
            if (t) {
                if (t.error && typeof t.error.message === "string") {
                    return eb(t.error);
                }
                return eb(e);
            }
            return "No error message";
        })(t)
    };
    if (r.length) {
        n.stacktrace = {
            frames: r
        };
    }
    if (n.type === undefined && n.value === "") {
        n.value = "Unrecoverable error caught";
    }
    return n;
}
function eR(e, t) {
    return {
        exception: {
            values: [
                eE(e, t)
            ]
        }
    };
}
function eS(e, t) {
    let r;
    let n;
    let a = t.stacktrace || t.stack || "";
    let o = (r = t) && eP.test(r.message) ? 1 : 0;
    let i = typeof (n = t).framesToPop === "number" ? n.framesToPop : 0;
    try {
        return e(a, o, i);
    } catch  {}
    return [];
}
let eP = /Minified React error #\d+;/i;
function eO(e) {
    return typeof WebAssembly !== "undefined" && WebAssembly.Exception !== undefined && e instanceof WebAssembly.Exception;
}
function eT(e, t, r, n, a) {
    let o;
    if (T2(t) && t.error) {
        return eR(e, t.error);
    }
    if (BD(t) || W6(t)) {
        if ("stack" in t) {
            o = eR(e, t);
        } else {
            let a = t.name || (BD(t) ? "DOMError" : "DOMException");
            let i = t.message ? `${a}: ${t.message}` : a;
            o = ej(e, i, r, n);
            gO(o, i);
        }
        if ("code" in t) {
            o.tags = {
                ...o.tags,
                "DOMException.code": `${t.code}`
            };
        }
        return o;
    }
    if (bJ(t)) {
        return eR(e, t);
    }
    if (Qd(t) || xH(t)) {
        o = ((e, t, r, isUnhandledRejection)=>{
            let a = KU();
            let o = a?.getOptions().normalizeDepth;
            let i = Object.values(t).find((e)=>e instanceof Error);
            let extra = {
                __serialized__: ev.cd(t, o)
            };
            if (i) {
                return {
                    exception: {
                        values: [
                            eE(e, i)
                        ]
                    },
                    extra
                };
            }
            let l = {
                exception: {
                    values: [
                        {
                            type: xH(t) ? t.constructor.name : isUnhandledRejection ? "UnhandledRejection" : "Error",
                            value: ((e, { isUnhandledRejection })=>{
                                let r = HF(e);
                                let n = isUnhandledRejection ? "promise rejection" : "exception";
                                if (T2(e)) {
                                    return `Event \`ErrorEvent\` captured as ${n} with message \`${e.message}\``;
                                }
                                if (xH(e)) {
                                    let t = ((e)=>{
                                        try {
                                            let t = Object.getPrototypeOf(e);
                                            if (t) {
                                                return t.constructor.name;
                                            }
                                            return undefined;
                                        } catch  {}
                                    })(e);
                                    return `Event \`${t}\` (type=${e.type}) captured as ${n}`;
                                }
                                return `Object captured as ${n} with keys: ${r}`;
                            })(t, {
                                isUnhandledRejection
                            })
                        }
                    ]
                },
                extra
            };
            if (r) {
                let t = eS(e, r);
                if (t.length) {
                    l.exception.values[0].stacktrace = {
                        frames: t
                    };
                }
            }
            return l;
        })(e, t, r, a);
    } else {
        o = ej(e, t, r, n);
        gO(o, `${t}`, undefined);
    }
    M6(o, {
        synthetic: true
    });
    return o;
}
function ej(e, t, r, n) {
    let a = {};
    if (n && r) {
        let n = eS(e, r);
        if (n.length) {
            a.exception = {
                values: [
                    {
                        value: t,
                        stacktrace: {
                            frames: n
                        }
                    }
                ]
            };
        }
        M6(a, {
            synthetic: true
        });
    }
    if (NF(t)) {
        let { __sentry_template_string__, __sentry_template_values__ } = t;
        a.logentry = {
            message: __sentry_template_string__,
            params: __sentry_template_values__
        };
        return a;
    }
    a.message = t;
    return a;
}
class ex extends eu {
    constructor(e){
        var t;
        t = e;
        let r = {
            release: typeof __SENTRY_RELEASE__ === "string" ? __SENTRY_RELEASE__ : ew.jf.SENTRY_RELEASE?.id,
            sendClientReports: true,
            parentSpanIsAlwaysRootSpan: true,
            ...t
        };
        c(r, "browser", [
            "browser"
        ], ew.jf.SENTRY_SDK_SOURCE || e_1());
        if (r._metadata?.sdk) {
            r._metadata.sdk.settings = {
                infer_ip: r.sendDefaultPii ? "auto" : "never",
                ...r._metadata.sdk.settings
            };
        }
        super(r);
        let { sendDefaultPii, sendClientReports, enableLogs, _experiments, enableMetrics } = this._options;
        let l = enableMetrics ?? _experiments?.enableMetrics ?? true;
        if (ew.jf.document && (sendClientReports || enableLogs || l)) {
            ew.jf.document.addEventListener("visibilitychange", ()=>{
                if (ew.jf.document.visibilityState === "hidden") {
                    if (sendClientReports) {
                        this._flushOutcomes();
                    }
                    if (enableLogs) {
                        D(this);
                    }
                    if (l) {
                        U(this);
                    }
                }
            });
        }
        if (sendDefaultPii) {
            this.on("beforeSendSession", ey);
        }
    }
    eventFromException(e, t) {
        return ((e, t, r, n)=>{
            let a = eT(e, t, r?.syntheticException || undefined, n);
            M6(a);
            a.level = "error";
            if (r?.event_id) {
                a.event_id = r.event_id;
            }
            return XW(a);
        })(this._options.stackParser, e, t, this._options.attachStacktrace);
    }
    eventFromMessage(e, t = "info", r) {
        return ((e, t, r = "info", n, a)=>{
            let o = ej(e, t, n?.syntheticException || undefined, a);
            o.level = r;
            if (n?.event_id) {
                o.event_id = n.event_id;
            }
            return XW(o);
        })(this._options.stackParser, e, t, r, this._options.attachStacktrace);
    }
    _prepareEvent(e, t, r, n) {
        e.platform = e.platform || "javascript";
        return super._prepareEvent(e, t, r, n);
    }
}
function eC() {
    if ("console" in O) {
        Ow.forEach((level)=>{
            if (level in O.console) {
                GS(O.console, level, function(t) {
                    Z9[level] = t;
                    return function(...args) {
                        aj("console", {
                            args,
                            level
                        });
                        let r = Z9[level];
                        r?.apply(O.console, args);
                    };
                });
            }
        });
    }
}
function eN(e, t) {
    let r = KU();
    let n = rm();
    if (!r) {
        return;
    }
    let { beforeBreadcrumb = null, maxBreadcrumbs = 100 } = r.getOptions();
    if (maxBreadcrumbs <= 0) {
        return;
    }
    let i = {
        timestamp: lu(),
        ...e
    };
    let s = beforeBreadcrumb ? pq(()=>beforeBreadcrumb(i, t)) : i;
    if (s !== null) {
        if (r.emit) {
            r.emit("beforeAddBreadcrumb", s, t);
        }
        n.addBreadcrumb(s, maxBreadcrumbs);
    }
}
function eI(status_code) {
    if (status_code !== undefined) {
        if (status_code >= 400 && status_code < 500) {
            return "warning";
        }
        if (status_code >= 500) {
            return "error";
        }
        return undefined;
    }
}
function eU() {
    if (!j.document) {
        return;
    }
    let e = aj.bind(null, "dom");
    let t = eH(e, true);
    j.document.addEventListener("click", t, false);
    j.document.addEventListener("keypress", t, false);
    [
        "EventTarget",
        "Node"
    ].forEach((t)=>{
        let r = j;
        let n = r[t]?.prototype;
        if (n?.hasOwnProperty?.("addEventListener")) {
            GS(n, "addEventListener", function(t) {
                return function(r, n, a) {
                    if (r === "click" || r == "keypress") {
                        try {
                            let n = this.__sentry_instrumentation_handlers__ = this.__sentry_instrumentation_handlers__ || {};
                            let o = n[r] = n[r] || {
                                refCount: 0
                            };
                            if (!o.handler) {
                                let n = eH(e);
                                o.handler = n;
                                t.call(this, r, n, a);
                            }
                            o.refCount++;
                        } catch  {}
                    }
                    return t.call(this, r, n, a);
                };
            });
            GS(n, "removeEventListener", function(e) {
                return function(t, r, n) {
                    if (t === "click" || t == "keypress") {
                        try {
                            let r = this.__sentry_instrumentation_handlers__ || {};
                            let a = r[t];
                            if (a) {
                                a.refCount--;
                                if (a.refCount <= 0) {
                                    e.call(this, t, a.handler, n);
                                    a.handler = undefined;
                                    delete r[t];
                                }
                                if (Object.keys(r).length === 0) {
                                    delete this.__sentry_instrumentation_handlers__;
                                }
                            }
                        } catch  {}
                    }
                    return e.call(this, t, r, n);
                };
            });
        }
    });
}
function eH(e, global = false) {
    return (r)=>{
        var n;
        if (!r || r._sentryCaptured) {
            return;
        }
        let s = ((e)=>{
            try {
                return e.target;
            } catch  {
                return null;
            }
        })(r);
        n = r.type;
        if (n === "keypress" && (!s?.tagName || s.tagName !== "INPUT" && s.tagName !== "TEXTAREA" && !s.isContentEditable && 1)) {
            return;
        }
        my(r, "_sentryCaptured", true);
        if (s && !s._sentryId) {
            my(s, "_sentryId", eJ_1());
        }
        let name = r.type === "keypress" ? "input" : r.type;
        if (!((e)=>{
            if (e.type !== o) {
                return false;
            }
            try {
                if (!e.target || e.target._sentryId !== i) {
                    return false;
                }
            } catch  {}
            return true;
        })(r)) {
            e({
                event: r,
                name,
                global
            });
            o = r.type;
            i = s ? s._sentryId : undefined;
        }
        clearTimeout(a);
        a = j.setTimeout(()=>{
            i = undefined;
            o = undefined;
        }, 1000);
    };
}
let ez = "EventTarget,Window,Node,ApplicationCache,AudioTrackList,BroadcastChannel,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");
function eY(e) {
    return function(...t) {
        let r = t[0];
        t[0] = ew.LV(r, {
            mechanism: {
                handled: false,
                type: `auto.browser.browserapierrors.${qQ(e)}`
            }
        });
        return e.apply(this, t);
    };
}
function eq(e) {
    return function(t) {
        return e.apply(this, [
            ew.LV(t, {
                mechanism: {
                    data: {
                        handler: qQ(e)
                    },
                    handled: false,
                    type: "auto.browser.browserapierrors.requestAnimationFrame"
                }
            })
        ]);
    };
}
function eW(e) {
    return function(...t) {
        let r = this;
        [
            "onload",
            "onerror",
            "onprogress",
            "onreadystatechange"
        ].forEach((e)=>{
            if (e in r && typeof r[e] === "function") {
                GS(r, e, function(t) {
                    let r = {
                        mechanism: {
                            data: {
                                handler: qQ(t)
                            },
                            handled: false,
                            type: `auto.browser.browserapierrors.xhr.${e}`
                        }
                    };
                    let n = sp(t);
                    if (n) {
                        r.mechanism.data.handler = qQ(n);
                    }
                    return ew.LV(t, r);
                });
            }
        });
        return e.apply(this, t);
    };
}
function eX() {
    try {
        let e = ew.jf.Intl;
        if (!e) {
            return;
        }
        let t = e.DateTimeFormat().resolvedOptions();
        return {
            locale: t.locale,
            timezone: t.timeZone,
            calendar: t.calendar
        };
    } catch  {
        return;
    }
}
function eV(e) {
    if (T_1) {
        Yz.log(`Global Handler attached: ${e}`);
    }
}
function eJ() {
    let e = KU();
    return e?.getOptions() || {
        stackParser: ()=>[],
        attachStacktrace: false
    };
}
function eQ(e) {
    return Array.isArray(e.errors);
}
function eZ(e, t, r) {
    e.mechanism = {
        handled: true,
        type: "auto.core.linked_errors",
        ...eQ(r) && {
            is_exception_group: true
        },
        ...e.mechanism,
        exception_id: t
    };
}
function e0(e, source, r, parent_id) {
    e.mechanism = {
        handled: true,
        ...e.mechanism,
        type: "chained",
        source,
        exception_id: r,
        parent_id
    };
}
function e1(filename, t, r, n) {
    let a = {
        filename,
        function: t === "<anonymous>" ? yF : t,
        in_app: true
    };
    if (r !== undefined) {
        a.lineno = r;
    }
    if (n !== undefined) {
        a.colno = n;
    }
    return a;
}
let e2 = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;
let e3 = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
let e4 = /\((\S*)(?::(\d+))(?::(\d+))\)/;
let e5 = /at (.+?) ?\(data:(.+?),/;
let e6 = [
    30,
    (e)=>{
        let t = e.match(e5);
        if (t) {
            return {
                filename: `<data:${t[2]}>`,
                function: t[1]
            };
        }
        let r = e2.exec(e);
        if (r) {
            let [, e, t, n] = r;
            return e1(e, yF, +t, +n);
        }
        let n = e3.exec(e);
        if (n) {
            if (n[2]?.indexOf("eval") === 0) {
                let e = e4.exec(n[2]);
                if (e) {
                    n[2] = e[1];
                    n[3] = e[2];
                    n[4] = e[3];
                }
            }
            let [e, t] = tt(n[1] || yF, n[2]);
            return e1(t, e, n[3] ? +n[3] : undefined, n[4] ? +n[4] : undefined);
        }
    }
];
let e7 = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
let e8 = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
let e9 = [
    50,
    (e)=>{
        let t = e7.exec(e);
        if (t) {
            if (t[3] && t[3].indexOf(" > eval") > -1) {
                let e = e8.exec(t[3]);
                if (e) {
                    t[1] = t[1] || "eval";
                    t[3] = e[1];
                    t[4] = e[2];
                    t[5] = "";
                }
            }
            let e = t[3];
            let r = t[1] || yF;
            [r, e] = tt(r, e);
            return e1(e, r, t[4] ? +t[4] : undefined, t[5] ? +t[5] : undefined);
        }
    }
];
let te = gd(e6, e9);
let tt = (e, t)=>{
    let r = e.indexOf("safari-extension") !== -1;
    let n = e.indexOf("safari-web-extension") !== -1;
    if (r || n) {
        return [
            e.indexOf("@") !== -1 ? e.split("@")[0] : yF,
            r ? `safari-extension:${t}` : `safari-web-extension:${t}`
        ];
    }
    return [
        e,
        t
    ];
};
let ta = {};
function to(e, t = (()=>{
    const e = "fetch";
    let t = ta[e];
    if (t) {
        return t;
    }
    let r = j[e];
    if (a3(r)) {
        return ta[e] = r.bind(j);
    }
    let j_document = j.document;
    if (j_document && typeof j_document.createElement === "function") {
        try {
            let t = j_document.createElement("iframe");
            t.hidden = true;
            j_document.head.appendChild(t);
            let a = t.contentWindow;
            if (a?.[e]) {
                r = a[e];
            }
            j_document.head.removeChild(t);
        } catch (error) {
            if (T_3) {
                Yz.warn(`Could not create sandbox iframe for ${e} check, bailing to window.${e}: `, error);
            }
        }
    }
    if (r) {
        return ta[e] = r.bind(j);
    }
    return r;
})()) {
    let r = 0;
    let n = 0;
    async function a(a) {
        let length = a.body.length;
        r += length;
        n++;
        let i = {
            body: a.body,
            method: "POST",
            referrerPolicy: "strict-origin",
            headers: e.headers,
            keepalive: r <= 60000 && n < 15,
            ...e.fetchOptions
        };
        try {
            let r = await t(e.url, i);
            return {
                statusCode: r.status,
                headers: {
                    "x-sentry-rate-limits": r.headers.get("X-Sentry-Rate-Limits"),
                    "retry-after": r.headers.get("Retry-After")
                }
            };
        } catch (error) {
            ta.fetch = undefined;
            throw error;
        } finally{
            r -= length;
            n--;
        }
    }
    return ((e, t, r = W(e.bufferSize || 64))=>{
        let n = {};
        return {
            send: function(a) {
                let o = [];
                yH(a, (t, r)=>{
                    let a = zk(r);
                    if (!((e, t, r = Wk())=>(e[t] || e.all || 0) > r)(n, a)) {
                        o.push(t);
                    } else {
                        e.recordDroppedEvent("ratelimit_backoff", a);
                    }
                });
                if (o.length === 0) {
                    return Promise.resolve({});
                }
                let i = h4(a[0], o);
                let s = (t)=>{
                    if (hP(i, [
                        "client_report"
                    ])) {
                        if (T) {
                            Yz.warn(`Dropping client report. Will not send outcomes (reason: ${t}).`);
                        }
                        return;
                    }
                    yH(i, (r, n)=>{
                        e.recordDroppedEvent(t, zk(n));
                    });
                };
                return r.add(()=>t({
                        body: bN(i)
                    }).then((e)=>{
                        if (e.statusCode === 413) {
                            if (T) {
                                Yz.error("Sentry responded with status code 413. Envelope was discarded due to exceeding size limits.");
                            }
                            s("send_error");
                        } else {
                            if (T && e.statusCode !== undefined && (e.statusCode < 200 || e.statusCode >= 300)) {
                                Yz.warn(`Sentry responded with status code ${e.statusCode} to sent event.`);
                            }
                            n = ((e, { statusCode, headers }, n = Wk())=>{
                                let a = {
                                    ...e
                                };
                                let o = headers?.["x-sentry-rate-limits"];
                                let i = headers?.["retry-after"];
                                if (o) {
                                    for (let e of o.trim().split(",")){
                                        let [t, r, , , o] = e.split(":", 5);
                                        let i = parseInt(t, 10);
                                        let s = (isNaN(i) ? 60 : i) * 1000;
                                        if (r) {
                                            for (let e of r.split(";")){
                                                if (e === "metric_bucket") {
                                                    if (!o || o.split(";").includes("custom")) {
                                                        a[e] = n + s;
                                                    }
                                                } else {
                                                    a[e] = n + s;
                                                }
                                            }
                                        } else {
                                            a.all = n + s;
                                        }
                                    }
                                } else {
                                    if (i) {
                                        a.all = n + ((e, t = Wk())=>{
                                            let r = parseInt(`${e}`, 10);
                                            if (!isNaN(r)) {
                                                return 1000 * r;
                                            }
                                            let n = Date.parse(`${e}`);
                                            if (isNaN(n)) {
                                                return 60000;
                                            }
                                            return n - t;
                                        })(i, n);
                                    } else if (statusCode === 429) {
                                        a.all = n + 60000;
                                    }
                                }
                                return a;
                            })(n, e);
                        }
                        return e;
                    }, (e)=>{
                        s("network_error");
                        if (T) {
                            Yz.error("Encountered error running transport request:", e);
                        }
                        throw e;
                    })).then((e)=>e, (e)=>{
                    if (e === SYMBOL_SENTRY_BUFFER_FULL_ERROR) {
                        if (T) {
                            Yz.error("Skipped sending event because buffer is full.");
                        }
                        s("queue_overflow");
                        return Promise.resolve({});
                    }
                    throw e;
                });
            },
            flush: (e)=>r.drain(e)
        };
    })(e, a, W(e.bufferSize || 40));
}
function ti(e) {
    let t;
    return [
        ((e = {})=>({
                ...((e = {})=>{
                    let t;
                    return {
                        name: "EventFilters",
                        setup (r) {
                            t = b(e, r.getOptions());
                        },
                        processEvent: (r, n, a)=>{
                            if (!t) {
                                t = b(e, a.getOptions());
                            }
                            if (!((e, t)=>{
                                if (e.type) {
                                    if (e.type === "transaction" && ((e, t)=>{
                                        if (!t?.length) {
                                            return false;
                                        }
                                        let e_transaction = e.transaction;
                                        return !!e_transaction && Xr(e_transaction, t);
                                    })(e, t.ignoreTransactions)) {
                                        if (T) {
                                            Yz.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${$X(e)}`);
                                        }
                                        return true;
                                    }
                                } else {
                                    let r;
                                    let n;
                                    let a;
                                    r = e;
                                    n = t.ignoreErrors;
                                    if (n?.length && m(r).some((e)=>Xr(e, n))) {
                                        if (T) {
                                            Yz.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${$X(e)}`);
                                        }
                                        return true;
                                    }
                                    a = e;
                                    if (a.exception?.values?.length && !a.message && !a.exception.values.some((e)=>e.stacktrace || e.type && e.type !== "Error" || e.value)) {
                                        if (T) {
                                            Yz.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${$X(e)}`);
                                        }
                                        return true;
                                    }
                                    if (((e, t)=>{
                                        if (!t?.length) {
                                            return false;
                                        }
                                        let r = E(e);
                                        return !!r && Xr(r, t);
                                    })(e, t.denyUrls)) {
                                        if (T) {
                                            Yz.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${$X(e)}.
Url: ${E(e)}`);
                                        }
                                        return true;
                                    }
                                    if (!((e, t)=>{
                                        if (!t?.length) {
                                            return true;
                                        }
                                        let r = E(e);
                                        return !r || Xr(r, t);
                                    })(e, t.allowUrls)) {
                                        if (T) {
                                            Yz.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${$X(e)}.
Url: ${E(e)}`);
                                        }
                                        return true;
                                    }
                                }
                                return false;
                            })(r, t)) {
                                return r;
                            }
                            return null;
                        }
                    };
                })(e),
                name: "InboundFilters"
            }))(),
        {
            name: "FunctionToString",
            setupOnce () {
                n = Function.prototype.toString;
                try {
                    Function.prototype.toString = function(...e) {
                        let t = sp(this);
                        let r = P.has(KU()) && t !== undefined ? t : this;
                        return n.apply(r, e);
                    };
                } catch  {}
            },
            setup (e) {
                P.set(e, true);
            }
        },
        {
            name: "ConversationId",
            setup (e) {
                e.on("spanStart", (e)=>{
                    let t = o5().getScopeData();
                    let r = rm().getScopeData();
                    let n = t.conversationId || r.conversationId;
                    if (n) {
                        let { op, data, description } = et_1(e);
                        if (!op?.startsWith("gen_ai.") && !data["ai.operationId"] && !description?.startsWith("ai.")) {
                            return;
                        }
                        e.setAttribute(Fy, n);
                    }
                });
            }
        },
        ((e = {})=>{
            let t = {
                XMLHttpRequest: true,
                eventTarget: true,
                requestAnimationFrame: true,
                setInterval: true,
                setTimeout: true,
                unregisterOriginalCallbacks: false,
                ...e
            };
            return {
                name: "BrowserApiErrors",
                setupOnce () {
                    if (t.setTimeout) {
                        GS(ew.jf, "setTimeout", eY);
                    }
                    if (t.setInterval) {
                        GS(ew.jf, "setInterval", eY);
                    }
                    if (t.requestAnimationFrame) {
                        GS(ew.jf, "requestAnimationFrame", eq);
                    }
                    if (t.XMLHttpRequest && "XMLHttpRequest" in ew.jf) {
                        GS(XMLHttpRequest.prototype, "send", eW);
                    }
                    let t_eventTarget = t.eventTarget;
                    if (t_eventTarget) {
                        (Array.isArray(t_eventTarget) ? t_eventTarget : ez).forEach((e)=>((target, t)=>{
                                let r = ew.jf;
                                let n = r[target]?.prototype;
                                if (n?.hasOwnProperty?.("addEventListener")) {
                                    GS(n, "addEventListener", function(r) {
                                        return function(n, a, o) {
                                            let i;
                                            let s;
                                            let l;
                                            let u;
                                            try {
                                                i = a;
                                                if (typeof i.handleEvent === "function") {
                                                    a.handleEvent = ew.LV(a.handleEvent, {
                                                        mechanism: {
                                                            data: {
                                                                handler: qQ(a),
                                                                target
                                                            },
                                                            handled: false,
                                                            type: "auto.browser.browserapierrors.handleEvent"
                                                        }
                                                    });
                                                }
                                            } catch  {}
                                            if (t.unregisterOriginalCallbacks) {
                                                s = this;
                                                l = n;
                                                u = a;
                                                if (s && typeof s === "object" && "removeEventListener" in s && typeof s.removeEventListener === "function") {
                                                    s.removeEventListener(l, u);
                                                }
                                            }
                                            return r.apply(this, [
                                                n,
                                                ew.LV(a, {
                                                    mechanism: {
                                                        data: {
                                                            handler: qQ(a),
                                                            target
                                                        },
                                                        handled: false,
                                                        type: "auto.browser.browserapierrors.addEventListener"
                                                    }
                                                }),
                                                o
                                            ]);
                                        };
                                    });
                                    GS(n, "removeEventListener", function(e) {
                                        return function(t, r, n) {
                                            try {
                                                let a = r.__sentry_wrapped__;
                                                if (a) {
                                                    e.call(this, t, a, n);
                                                }
                                            } catch  {}
                                            return e.call(this, t, r, n);
                                        };
                                    });
                                }
                            })(e, t));
                    }
                }
            };
        })(),
        ((e = {})=>{
            let t = {
                console: true,
                dom: true,
                fetch: true,
                history: true,
                sentry: true,
                xhr: true,
                ...e
            };
            return {
                name: "Breadcrumbs",
                setup (e) {
                    let r;
                    let n;
                    let a;
                    let o;
                    let i;
                    let s;
                    let u;
                    if (t.console) {
                        ((e)=>{
                            let t = "console";
                            s5(t, e);
                            AS(t, eC);
                        })((r = e, function(e) {
                            let t;
                            if (KU() !== r) {
                                return;
                            }
                            let n = {
                                category: "console",
                                data: {
                                    arguments: e.args,
                                    logger: "console"
                                },
                                level: (t = e.level) === "warn" ? "warning" : [
                                    "fatal",
                                    "error",
                                    "warning",
                                    "log",
                                    "info",
                                    "debug"
                                ].includes(t) ? t : "log",
                                message: gt(e.args, " ")
                            };
                            if (e.level === "assert") {
                                if (e.args[0] !== false) {
                                    return;
                                } else {
                                    n.message = `Assertion failed: ${gt(e.args.slice(1), " ") || "console.assert"}`;
                                    n.data.arguments = e.args.slice(1);
                                }
                            }
                            eN(n, {
                                input: e.args,
                                level: e.level
                            });
                        }));
                    }
                    if (t.dom) {
                        n = e;
                        a = t.dom;
                        s5("dom", function(e) {
                            let t;
                            let r;
                            if (KU() !== n) {
                                return;
                            }
                            let keyAttrs = typeof a === "object" ? a.serializeAttribute : undefined;
                            let maxStringLength = typeof a === "object" && typeof a.maxStringLength === "number" ? a.maxStringLength : undefined;
                            if (maxStringLength && maxStringLength > 1024) {
                                if (T_1) {
                                    Yz.warn(`\`dom.maxStringLength\` cannot exceed 1024, but a value of ${maxStringLength} was configured. Sentry will use 1024 instead.`);
                                }
                                maxStringLength = 1024;
                            }
                            if (typeof keyAttrs === "string") {
                                keyAttrs = [
                                    keyAttrs
                                ];
                            }
                            try {
                                let s;
                                let n = e.event;
                                let a = (s = n) && s.target ? n.target : n;
                                t = Hd(a, {
                                    keyAttrs,
                                    maxStringLength
                                });
                                r = xE(a);
                            } catch  {
                                t = "<unknown>";
                            }
                            if (t.length === 0) {
                                return;
                            }
                            let u = {
                                category: `ui.${e.name}`,
                                message: t
                            };
                            if (r) {
                                u.data = {
                                    "ui.component_name": r
                                };
                            }
                            eN(u, {
                                event: e.event,
                                name: e.name,
                                global: e.global
                            });
                        });
                        AS("dom", eU);
                    }
                    if (t.xhr) {
                        Mn((o = e, function(e) {
                            if (KU() !== o) {
                                return;
                            }
                            let { startTimestamp, endTimestamp } = e;
                            let n = e.xhr[Er];
                            if (!startTimestamp || !endTimestamp || !n) {
                                return;
                            }
                            let { method, url, status_code, body } = n;
                            let u = {
                                xhr: e.xhr,
                                input: body,
                                startTimestamp,
                                endTimestamp
                            };
                            let c = {
                                category: "xhr",
                                data: {
                                    method,
                                    url,
                                    status_code
                                },
                                type: "http",
                                level: eI(status_code)
                            };
                            o.emit("beforeOutgoingRequestBreadcrumb", c, u);
                            eN(c, u);
                        }));
                    }
                    if (t.fetch) {
                        ur((i = e, function(e) {
                            if (KU() !== i) {
                                return;
                            }
                            let { startTimestamp, endTimestamp } = e;
                            if (endTimestamp && (!e.fetchData.url.match(/sentry_key/) || e.fetchData.method !== "POST")) {
                                if (e.error) {
                                    let n = {
                                        data: e.error,
                                        input: e.args,
                                        startTimestamp,
                                        endTimestamp
                                    };
                                    let a = {
                                        category: "fetch",
                                        data: e.fetchData,
                                        level: "error",
                                        type: "http"
                                    };
                                    i.emit("beforeOutgoingRequestBreadcrumb", a, n);
                                    eN(a, n);
                                } else {
                                    let response = e.response;
                                    let a = {
                                        ...e.fetchData,
                                        status_code: response?.status
                                    };
                                    let o = {
                                        input: e.args,
                                        response,
                                        startTimestamp,
                                        endTimestamp
                                    };
                                    let s = {
                                        category: "fetch",
                                        data: a,
                                        type: "http",
                                        level: eI(a.status_code)
                                    };
                                    i.emit("beforeOutgoingRequestBreadcrumb", s, o);
                                    eN(s, o);
                                }
                            }
                        }));
                    }
                    if (t.history) {
                        __1((s = e, function(e) {
                            if (KU() !== s) {
                                return;
                            }
                            let e_from = e.from;
                            let to_1 = e.to;
                            let n = Dl(ew.jf.location.href);
                            let a = e_from ? Dl(e_from) : undefined;
                            let o = Dl(to_1);
                            if (!a?.path) {
                                a = n;
                            }
                            if (n.protocol === o.protocol && n.host === o.host) {
                                to_1 = o.relative;
                            }
                            if (n.protocol === a.protocol && n.host === a.host) {
                                e_from = a.relative;
                            }
                            eN({
                                category: "navigation",
                                data: {
                                    from: e_from,
                                    to: to_1
                                }
                            });
                        }));
                    }
                    if (t.sentry) {
                        e.on("beforeSendEvent", (u = e, function(e) {
                            if (KU() === u) {
                                eN({
                                    category: `sentry.${e.type === "transaction" ? "transaction" : "event"}`,
                                    event_id: e.event_id,
                                    level: e.level,
                                    message: $X(e)
                                }, {
                                    event: e
                                });
                            }
                        }));
                    }
                }
            };
        })(),
        ((e = {})=>{
            let t = {
                onerror: true,
                onunhandledrejection: true,
                ...e
            };
            return {
                name: "GlobalHandlers",
                setupOnce () {
                    Error.stackTraceLimit = 50;
                },
                setup (e) {
                    let r;
                    let n;
                    if (t.onerror) {
                        r = e;
                        L_1((e)=>{
                            let { stackParser, attachStacktrace } = eJ();
                            if (KU() !== r || ew.jN()) {
                                return;
                            }
                            let { msg, url, line, column, error } = e;
                            let u = ((e, url_1, lineno, colno)=>{
                                let a = e.exception = e.exception || {};
                                let o = a.values = a.values || [];
                                let i = o[0] = o[0] || {};
                                let s = i.stacktrace = i.stacktrace || {};
                                let l = s.frames = s.frames || [];
                                if (l.length === 0) {
                                    l.push({
                                        colno,
                                        lineno,
                                        filename: ((url_1_1)=>{
                                            if (Kg(url_1_1) && url_1_1.length !== 0) {
                                                if (url_1_1.startsWith("data:")) {
                                                    return `<${zm(url_1_1, false)}>`;
                                                }
                                                return url_1_1;
                                            }
                                        })(url_1) ?? $N(),
                                        function: yF,
                                        in_app: true
                                    });
                                }
                                return e;
                            })(eT(stackParser, error || msg, undefined, attachStacktrace, false), url, line, column);
                            u.level = "error";
                            r_1(u, {
                                originalException: error,
                                mechanism: {
                                    handled: false,
                                    type: "auto.browser.global_handlers.onerror"
                                }
                            });
                        });
                        eV("onerror");
                    }
                    if (t.onunhandledrejection) {
                        n = e;
                        r_2((e)=>{
                            var t;
                            let { stackParser, attachStacktrace } = eJ();
                            if (KU() !== n || ew.jN()) {
                                return;
                            }
                            let o = ((e)=>{
                                if (sO(e)) {
                                    return e;
                                }
                                try {
                                    if ("reason" in e) {
                                        return e.reason;
                                    }
                                    if ("detail" in e && "reason" in e.detail) {
                                        return e.detail.reason;
                                    }
                                } catch  {}
                                return e;
                            })(e);
                            let i = sO(o) ? (t = o, {
                                exception: {
                                    values: [
                                        {
                                            type: "UnhandledRejection",
                                            value: `Non-Error promise rejection captured with value: ${String(t)}`
                                        }
                                    ]
                                }
                            }) : eT(stackParser, o, undefined, attachStacktrace, true);
                            i.level = "error";
                            r_1(i, {
                                originalException: o,
                                mechanism: {
                                    handled: false,
                                    type: "auto.browser.global_handlers.onunhandledrejection"
                                }
                            });
                        });
                        eV("onunhandledrejection");
                    }
                }
            };
        })(),
        ((e = {})=>{
            let t = e.limit || 5;
            let r = e.key || "cause";
            return {
                name: "LinkedErrors",
                preprocessEvent (e, n, a) {
                    ((e, t, r, n, a, o)=>{
                        if (!a.exception?.values || !o || !tH(o.originalException, Error)) {
                            return;
                        }
                        let i = a.exception.values.length > 0 ? a.exception.values[a.exception.values.length - 1] : undefined;
                        if (i) {
                            a.exception.values = function e(t, r, n, a, o, i, s, l) {
                                if (i.length >= n + 1) {
                                    return i;
                                }
                                let u = [
                                    ...i
                                ];
                                if (tH(a[o], Error)) {
                                    eZ(s, l, a);
                                    let i = t(r, a[o]);
                                    let c = u.length;
                                    e0(i, o, c, l);
                                    u = e(t, r, n, a[o], o, [
                                        i,
                                        ...u
                                    ], i, c);
                                }
                                if (eQ(a)) {
                                    a.errors.forEach((i, c)=>{
                                        if (tH(i, Error)) {
                                            eZ(s, l, a);
                                            let f = t(r, i);
                                            let d = u.length;
                                            e0(f, `errors[${c}]`, d, l);
                                            u = e(t, r, n, i, o, [
                                                f,
                                                ...u
                                            ], f, d);
                                        }
                                    });
                                }
                                return u;
                            }(e, t, n, o.originalException, r, a.exception.values, i, 0);
                        }
                    })(eE, a.getOptions().stackParser, r, t, e, n);
                }
            };
        })(),
        {
            name: "Dedupe",
            processEvent (e) {
                if (e.type) {
                    return e;
                }
                try {
                    let r;
                    let n;
                    r = e;
                    if ((n = t) && (((e, t)=>{
                        let e_message = e.message;
                        let t_message = t.message;
                        return (!!e_message || !!t_message) && (!e_message || !!t_message) && (!!e_message || !t_message) && e_message === t_message && !!x(e, t) && !!w(e, t) && true;
                    })(r, n) || ((e, t)=>{
                        let r = A(t);
                        let n = A(e);
                        return !!r && !!n && r.type === n.type && r.value === n.value && !!x(e, t) && !!w(e, t);
                    })(r, n))) {
                        if (T) {
                            Yz.warn("Event dropped due to being a duplicate of previously captured event.");
                        }
                        return null;
                    }
                } catch  {}
                return t = e;
            }
        },
        {
            name: "HttpContext",
            preprocessEvent (e) {
                if (!ew.jf.navigator && !ew.jf.location && !ew.jf.document) {
                    return;
                }
                let t = ew.AP();
                let headers = {
                    ...t.headers,
                    ...e.request?.headers
                };
                e.request = {
                    ...t,
                    ...e.request,
                    headers
                };
            }
        },
        {
            name: "CultureContext",
            preprocessEvent (e) {
                let t = eX();
                if (t) {
                    e.contexts = {
                        ...e.contexts,
                        culture: {
                            ...t,
                            ...e.contexts?.culture
                        }
                    };
                }
            },
            processSegmentSpan (e) {
                let t = eX();
                if (t) {
                    e.attributes = {
                        "culture.locale": t.locale,
                        "culture.timezone": t.timezone,
                        "culture.calendar": t.calendar,
                        ...e.attributes
                    };
                }
            }
        },
        ((e = {})=>{
            let t = e.lifecycle ?? "route";
            return {
                name: "BrowserSession",
                setupOnce () {
                    if (ew.jf.document === undefined) {
                        if (T_1) {
                            Yz.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");
                        }
                        return;
                    }
                    J0({
                        ignoreDuration: true
                    });
                    J5();
                    let e = rm();
                    let r = e.getUser();
                    e.addScopeListener((e)=>{
                        let t = e.getUser();
                        if (r?.id !== t?.id || r?.ip_address !== t?.ip_address) {
                            J5();
                            r = t;
                        }
                    });
                    if (t === "route") {
                        __1(({ from, to })=>{
                            if (from !== to) {
                                J0({
                                    ignoreDuration: true
                                });
                                J5();
                            }
                        });
                    }
                }
            };
        })()
    ];
}
let t_ = tp.events ? tp : tp.default;
let tm = ew.jf;
let tg = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
function ty(...e) {
    let t = "";
    let r = false;
    for(let n = e.length - 1; n >= -1 && !r; n--){
        let a = n >= 0 ? e[n] : "/";
        if (a) {
            t = `${a}/${t}`;
            r = a.charAt(0) === "/";
        }
    }
    t = ((e, t)=>{
        let r = 0;
        for(let t = e.length - 1; t >= 0; t--){
            let n = e[t];
            switch(n){
                case ".":
                    e.splice(t, 1);
                    break;
                case "..":
                    e.splice(t, 1);
                    r++;
                    break;
                default:
                    if (r) {
                        e.splice(t, 1);
                        r--;
                    }
            }
        }
        if (t) {
            while(r--){
                e.unshift("..");
            }
        }
        return e;
    })(t.split("/").filter((e)=>!!e), !r).join("/");
    return (r ? "/" : "") + t || ".";
}
function tv(e) {
    let t = 0;
    for(; t < e.length && e[t] === ""; t++);
    let r = e.length - 1;
    for(; r >= 0 && e[r] === ""; r--);
    if (t > r) {
        return [];
    }
    return e.slice(t, r - t + 1);
}
class tb {
    constructor(e){
        this._maxSize = e;
        this._cache = new Map;
    }
    get size() {
        return this._cache.size;
    }
    get(e) {
        let t = this._cache.get(e);
        if (t !== undefined) {
            this._cache.delete(e);
            this._cache.set(e, t);
            return t;
        }
    }
    set(e, t) {
        if (this._cache.size >= this._maxSize) {
            let e = this._cache.keys().next().value;
            this._cache.delete(e);
        }
        this._cache.set(e, t);
    }
    remove(e) {
        let t = this._cache.get(e);
        if (t) {
            this._cache.delete(e);
        }
        return t;
    }
    clear() {
        this._cache.clear();
    }
    keys() {
        return Array.from(this._cache.keys());
    }
    values() {
        let e = [];
        this._cache.forEach((t)=>e.push(t));
        return e;
    }
}
let tR = new tb(100);
let tP = O;
let tT = false;
let tj = O;
export function TsN(e) {
    if (tT) {
        pq(()=>{
            console.warn("[@sentry/nextjs] You are calling `Sentry.init()` more than once on the client. This can happen if you have both a `sentry.client.config.ts` and a `instrumentation-client.ts` file with `Sentry.init()` calls. It is recommended to call `Sentry.init()` once in `instrumentation-client.ts`.");
        });
    }
    tT = true;
    if (!T_4 && e.debug) {
        pq(()=>{
            console.warn("[@sentry/nextjs] You have enabled `debug: true`, but Sentry debug logging was removed from your bundle (likely via `withSentryConfig({ disableLogger: true })` / `webpack.treeshake.removeDebugLogging: true`). Set that option to `false` to see Sentry debug output.");
        });
    }
    if (typeof __SENTRY_TRACING__ === "undefined" || __SENTRY_TRACING__) {
        (()=>{
            if (ew.jf.document && ((e)=>{
                let t = tE.D(e) || e;
                let r = tR.get(t);
                if (r !== undefined) {
                    return r;
                }
                let n = tE.c();
                if (!n?.isrRoutes || !Array.isArray(n.isrRoutes) || n.isrRoutes.length === 0) {
                    tR.set(t, false);
                    return false;
                }
                let a = n.isrRoutes.includes(t);
                tR.set(t, a);
                return a;
            })(ew.jf.location.pathname)) {
                e("sentry-trace");
                e("baggage");
            }
            function e(e) {
                try {
                    let t = ew.jf.document.querySelector(`meta[name="${e}"]`);
                    if (t) {
                        t.remove();
                    }
                } catch  {}
            }
        })();
    }
    let t = {
        environment: e.environment || tu.env.SENTRY_ENVIRONMENT || (()=>{
            const e = true;
            let t = e ? tu.env.NEXT_PUBLIC_VERCEL_ENV : tu.env.VERCEL_ENV;
            if (t) {
                return `vercel-${t}`;
            }
        })() || "production",
        defaultIntegrations: ((e)=>{
            let t = ti(e);
            if (typeof __SENTRY_TRACING__ === "undefined" || __SENTRY_TRACING__) {
                t.push(((e = {})=>{
                    let t = dp({
                        ...e,
                        instrumentNavigation: false,
                        instrumentPageLoad: false,
                        onRequestSpanStart (...t) {
                            let [r, { headers }] = t;
                            if (headers?.get("next-router-prefetch")) {
                                r?.setAttribute("http.request.prefetch", true);
                            }
                            return e.onRequestSpanStart?.(...t);
                        }
                    });
                    let { instrumentPageLoad = true, instrumentNavigation = true } = e;
                    return {
                        ...t,
                        afterAllSetup (e) {
                            if (!e3_1()) {
                                if (instrumentNavigation) {
                                    ((e)=>{
                                        if (ew.jf.document.getElementById("__NEXT_DATA__")) {
                                            t_.events.on("routeChangeStart", (t)=>{
                                                let r;
                                                let n;
                                                let a = f(t);
                                                let o = ((e)=>{
                                                    let t = tm.__BUILD_MANIFEST?.sortedPages;
                                                    if (t) {
                                                        return t.find((t)=>{
                                                            let r = ((e)=>{
                                                                let t = e.split("/");
                                                                let r = "";
                                                                if (t[t.length - 1]?.match(/^\[\[\.\.\..+\]\]$/)) {
                                                                    t.pop();
                                                                    r = "(?:/(.+?))?";
                                                                }
                                                                let n = t.map((e)=>e.replace(/^\[\.\.\..+\]$/, "(.+?)").replace(/^\[.*\]$/, "([^/]+?)")).join("/");
                                                                return RegExp(`^${n}${r}(?:/)?$`);
                                                            })(t);
                                                            return e.match(r);
                                                        });
                                                    }
                                                })(a);
                                                if (o) {
                                                    r = o;
                                                    n = "route";
                                                } else {
                                                    r = a;
                                                    n = "url";
                                                }
                                                Nt(e, {
                                                    name: r,
                                                    attributes: {
                                                        [uT]: "navigation",
                                                        [JD]: "auto.navigation.nextjs.pages_router_instrumentation",
                                                        [i_]: n
                                                    }
                                                });
                                            });
                                        } else {
                                            q3(e);
                                        }
                                    })(e);
                                }
                                t.afterAllSetup(e);
                                if (instrumentPageLoad) {
                                    ((e)=>{
                                        if (ew.jf.document.getElementById("__NEXT_DATA__")) {
                                            let { route, params, sentryTrace, baggage } = (()=>{
                                                let e;
                                                let t = tm.document.getElementById("__NEXT_DATA__");
                                                if (t?.innerHTML) {
                                                    try {
                                                        e = JSON.parse(t.innerHTML);
                                                    } catch  {
                                                        if (T_4) {
                                                            Yz.warn("Could not extract __NEXT_DATA__");
                                                        }
                                                    }
                                                }
                                                if (!e) {
                                                    return {};
                                                }
                                                let r = {};
                                                let { page, query, props } = e;
                                                r.route = page;
                                                r.params = query;
                                                if (props?.pageProps) {
                                                    r.sentryTrace = props.pageProps._sentryTraceData;
                                                    r.baggage = props.pageProps._sentryBaggage;
                                                }
                                                return r;
                                            })();
                                            let o = D0(baggage);
                                            let i = route || tm.location.pathname;
                                            if (o?.["sentry-transaction"] && i === "/_error") {
                                                i = (i = o["sentry-transaction"]).replace(/^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS|TRACE|CONNECT)\s+/i, "");
                                            }
                                            let s = k3();
                                            Sx(e, {
                                                name: i,
                                                startTime: s ? s / 1000 : undefined,
                                                attributes: {
                                                    [uT]: "pageload",
                                                    [JD]: "auto.pageload.nextjs.pages_router_instrumentation",
                                                    [i_]: route ? "route" : "url",
                                                    ...params && e.getOptions().sendDefaultPii && {
                                                        ...params
                                                    }
                                                }
                                            }, {
                                                sentryTrace,
                                                baggage
                                            });
                                        } else {
                                            jw(e);
                                        }
                                    })(e);
                                }
                            }
                        }
                    };
                })());
            }
            let rewriteFramesAssetPrefixPath = tu.env._sentryRewriteFramesAssetPrefixPath || tj._sentryRewriteFramesAssetPrefixPath || "";
            let assetPrefix = tu.env._sentryAssetPrefix || tj._sentryAssetPrefix;
            let basePath = tu.env._sentryBasePath || tj._sentryBasePath;
            let experimentalThirdPartyOriginStackFrames = tu.env._experimentalThirdPartyOriginStackFrames === "true" || tj._experimentalThirdPartyOriginStackFrames === "true";
            t.push((({ assetPrefix, basePath, rewriteFramesAssetPrefixPath, experimentalThirdPartyOriginStackFrames })=>({
                    ...((e = {})=>{
                        let e_root = e.root;
                        let prefix = e.prefix || "app:///";
                        let isBrowser = "window" in O && !!O.window;
                        let a = e.iteratee || (({ isBrowser, root, prefix })=>(n)=>{
                                if (!n.filename) {
                                    return n;
                                }
                                let a = /^[a-zA-Z]:\\/.test(n.filename) || n.filename.includes("\\") && !n.filename.includes("/");
                                let o = /^\//.test(n.filename);
                                if (isBrowser) {
                                    if (root) {
                                        let e = n.filename;
                                        if (e.indexOf(root) === 0) {
                                            n.filename = e.replace(root, prefix);
                                        }
                                    }
                                } else if (a || o) {
                                    let e = a ? n.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/") : n.filename;
                                    let o = root ? ((root_1, t)=>{
                                        root_1 = ty(root_1).slice(1);
                                        t = ty(t).slice(1);
                                        let r = tv(root_1.split("/"));
                                        let n = tv(t.split("/"));
                                        let a = Math.min(r.length, n.length);
                                        let o = a;
                                        for(let e = 0; e < a; e++){
                                            if (r[e] !== n[e]) {
                                                o = e;
                                                break;
                                            }
                                        }
                                        let i = [];
                                        for(let e = o; e < r.length; e++){
                                            i.push("..");
                                        }
                                        return (i = i.concat(n.slice(o))).join("/");
                                    })(root, e) : ((e)=>{
                                        let t = e.length > 1024 ? `<truncated>${e.slice(-1024)}` : e;
                                        let r = tg.exec(t);
                                        if (r) {
                                            return r.slice(1);
                                        }
                                        return [];
                                    })(e)[2] || "";
                                    n.filename = `${prefix}${o}`;
                                }
                                return n;
                            })({
                            isBrowser,
                            root: e_root,
                            prefix
                        });
                        return {
                            name: "RewriteFrames",
                            processEvent (e) {
                                let t = e;
                                if (e.exception && Array.isArray(e.exception.values)) {
                                    t = ((e)=>{
                                        try {
                                            return {
                                                ...e,
                                                exception: {
                                                    ...e.exception,
                                                    values: e.exception.values.map((e)=>{
                                                        var t;
                                                        return {
                                                            ...e,
                                                            ...e.stacktrace && {
                                                                stacktrace: {
                                                                    ...t = e.stacktrace,
                                                                    frames: t?.frames?.map((e)=>a(e))
                                                                }
                                                            }
                                                        };
                                                    })
                                                }
                                            };
                                        } catch  {
                                            return e;
                                        }
                                    })(t);
                                }
                                return t;
                            }
                        };
                    })({
                        iteratee: (a)=>{
                            if (experimentalThirdPartyOriginStackFrames) {
                                let r = typeof window !== "undefined" && window.location ? window.location.origin : "";
                                if (a.filename?.startsWith(r) && !a.filename.endsWith(".js")) {
                                    return a;
                                }
                                if (assetPrefix) {
                                    if (a.filename?.startsWith(assetPrefix)) {
                                        a.filename = a.filename.replace(assetPrefix, "app://");
                                    }
                                } else if (basePath) {
                                    try {
                                        let { origin } = new URL(a.filename);
                                        if (origin === r) {
                                            a.filename = a.filename?.replace(origin, "app://").replace(basePath, "");
                                        }
                                    } catch  {}
                                }
                            } else {
                                try {
                                    let { origin } = new URL(a.filename);
                                    a.filename = a.filename?.replace(origin, "app://").replace(rewriteFramesAssetPrefixPath, "");
                                } catch  {}
                            }
                            if (experimentalThirdPartyOriginStackFrames) {
                                if (a.filename?.includes("/_next")) {
                                    a.filename = decodeURI(a.filename);
                                }
                                if (a.filename?.match(/\/_next\/static\/chunks\/(main-|main-app-|polyfills-|webpack-|framework-|framework\.)[0-9a-f]+\.js$/)) {
                                    a.in_app = false;
                                }
                            } else {
                                if (a.filename?.startsWith("app:///_next")) {
                                    a.filename = decodeURI(a.filename);
                                }
                                if (a.filename?.match(/^app:\/\/\/_next\/static\/chunks\/(main-|main-app-|polyfills-|webpack-|framework-|framework\.)[0-9a-f]+\.js$/)) {
                                    a.in_app = false;
                                }
                            }
                            return a;
                        }
                    }),
                    name: "NextjsClientStackFrameNormalization"
                }))({
                assetPrefix,
                basePath,
                rewriteFramesAssetPrefixPath,
                experimentalThirdPartyOriginStackFrames
            }));
            return t;
        })(e),
        release: tu.env._sentryRelease || tj._sentryRelease,
        ...e
    };
    ((e)=>{
        let t = tu.env._sentryRewritesTunnelPath || tP._sentryRewritesTunnelPath;
        if (t && e.dsn) {
            let r = hH(e.dsn);
            if (!r) {
                return;
            }
            let n = r.host.match(/^o(\d+)\.ingest(?:\.([a-z]{2}))?\.sentry\.io$/);
            if (n) {
                let a = n[1];
                let o = n[2];
                let i = `${t}?o=${a}&p=${r.projectId}`;
                if (o) {
                    i += `&r=${o}`;
                }
                e.tunnel = i;
                if (T_4) {
                    Yz.log(`Tunneling events to "${i}"`);
                }
            } else {
                if (T_4) {
                    Yz.warn("Provided DSN is not a Sentry SaaS DSN. Will not tunnel events.");
                }
            }
        }
    })(t);
    c(t, "nextjs", [
        "nextjs",
        "react"
    ]);
    let r = ((e)=>{
        let t = {
            ...e
        };
        c(t, "react");
        o_1("react", {
            version
        });
        return ((e = {})=>{
            let t;
            let r = !e.skipBrowserExtensionCheck && !!(()=>{
                if (ew.jf.window === undefined) {
                    return false;
                }
                let e = ew.jf;
                if (e.nw) {
                    return false;
                }
                let t = e.chrome || e.browser;
                if (!t?.runtime?.id) {
                    return false;
                }
                let r = $N();
                return !(ew.jf === ew.jf.top && /^(?:chrome-extension|moz-extension|ms-browser-extension|safari-web-extension):\/\//.test(r));
            })() && (T_1 && pq(()=>{
                console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/");
            }), true);
            let defaultIntegrations = e.defaultIntegrations ?? ti();
            let a = {
                ...e,
                enabled: !r && e.enabled,
                stackParser: vk(e.stackParser || te),
                integrations: ((e)=>{
                    let t;
                    let r = e.defaultIntegrations || [];
                    let e_integrations = e.integrations;
                    r.forEach((e)=>{
                        e.isDefaultInstance = true;
                    });
                    if (Array.isArray(e_integrations)) {
                        t = [
                            ...r,
                            ...e_integrations
                        ];
                    } else if (typeof e_integrations === "function") {
                        let e = e_integrations(r);
                        t = Array.isArray(e) ? e : [
                            e
                        ];
                    } else {
                        t = r;
                    }
                    let a = {};
                    t.forEach((e)=>{
                        let { name } = e;
                        let r = a[name];
                        if (!(r && !r.isDefaultInstance && e.isDefaultInstance)) {
                            a[name] = e;
                        }
                    });
                    return Object.values(a);
                })({
                    integrations: e.integrations,
                    defaultIntegrations
                }),
                transport: e.transport || to
            };
            if (a.debug === true) {
                if (T) {
                    Yz.enable();
                } else {
                    pq(()=>{
                        console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
                    });
                }
            }
            o5().update(a.initialScope);
            let o = new ex(a);
            t = o;
            o5().setClient(t);
            o.init();
            return o;
        })(t);
    })(t);
    let n = (e)=>{
        if (e.type === "transaction" && e.transaction === "/404") {
            return null;
        }
        return e;
    };
    n.id = "NextClient404Filter";
    SA(n);
    let a = (e)=>{
        if (e.type === "transaction" && e.transaction === NI) {
            return null;
        }
        return e;
    };
    a.id = "IncompleteTransactionFilter";
    SA(a);
    let o = (e, t)=>{
        var o;
        o = t?.originalException;
        if (bJ(o) && typeof o.digest === "string" && o.digest.startsWith("NEXT_REDIRECT;") || e.exception?.values?.[0]?.value === "NEXT_REDIRECT") {
            return null;
        }
        return e;
    };
    o.id = "NextRedirectErrorFilter";
    SA(o);
    return r;
}
