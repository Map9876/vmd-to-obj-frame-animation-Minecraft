import { Bi, KU, o5, rm, v4 } from "./module-2257.js";
import { T as T_1 } from "./module-61571.js";
import { E1, Ef, JD, Lc, Le, Sn, fs, i_, jG, sy, uT, xc } from "./module-88722.js";
import { Yz, pq } from "./module-43275.js";
import { f as f_1 } from "./module-90929.js";
import { e as e_1 } from "./module-47434.js";
import * as m from "./module-43316.js";
import { Bk, CC as traceFlags, Ck, G_, HQ, Hu, Qh, RD, VS, aO, cI, et as et_1, i$, pK, uU, xO, yW, zU } from "./module-51290.js";
import { k3, lu, zf } from "./module-87624.js";
import { LZ, ao, k1 } from "./module-89135.js";
import * as b from "./module-17588.js";
import { lu as lu_1 } from "./module-27123.js";
import * as O from "./module-13651.js";
import { F3, N8, TJ } from "./module-13590.js";
import { h } from "./module-76636.js";
import { EU } from "./module-60057.js";
import { i as i_1 } from "./module-40364.js";
import { L as L_1 } from "./module-54402.js";
import { r as r_1 } from "./module-20370.js";
import { O as O_1 } from "./module-49636.js";
import { Iy, MI, TC, kM } from "./module-64189.js";
import { $N, Hd, xE } from "./module-60567.js";
import { CH, Dl, f as f_2, kg, nt, zm } from "./module-69142.js";
import { my } from "./module-73314.js";
import { Xr } from "./module-35868.js";
import { ks, sO, tH } from "./module-16649.js";
import { j as j_1 } from "./module-38599.js";
import { T as T_2 } from "./module-96812.js";
import { qQ } from "./module-85236.js";
import { Z as Z_1 } from "./module-14356.js";
import e4 from "./module-95704.js";
import { _ } from "./module-79152.js";
import { T as T_3 } from "./module-91488.js";
import { AP, jf } from "./module-39619.js";
import { B$, ur } from "./module-81725.js";
import { De, sv } from "./module-30249.js";
import { Ol } from "./module-27122.js";
import { Er, Mn } from "./module-62234.js";
let n;
let a;
let o;
let i;
let s;
let l;
let u;
class E {
    constructor(e = {}){
        this._traceId = e.traceId || b.e();
        this._spanId = e.spanId || b.Z();
        this.dropReason = e.dropReason;
    }
    spanContext() {
        return {
            spanId: this._spanId,
            traceId: this._traceId,
            traceFlags
        };
    }
    end(e) {}
    setAttribute(e, t) {
        return this;
    }
    setAttributes(e) {
        return this;
    }
    setStatus(e) {
        return this;
    }
    updateName(e) {
        return this;
    }
    isRecording() {
        return false;
    }
    addEvent(e, t, r) {
        return this;
    }
    addLink(e) {
        return this;
    }
    addLinks(e) {
        return this;
    }
    recordException(e, t) {}
}
function S(_events) {
    if (!_events || _events.length === 0) {
        return;
    }
    let t = {};
    _events.forEach((e)=>{
        let r = e.attributes || {};
        let unit = r[Sn];
        let a = r[xc];
        if (typeof unit === "string" && typeof a === "number") {
            t[e.name] = {
                value: a,
                unit
            };
        }
    });
    return t;
}
function P(e) {
    return e.getOptions().traceLifecycle === "stream";
}
class T {
    constructor(e = {}){
        this._traceId = e.traceId || b.e();
        this._spanId = e.spanId || b.Z();
        this._startTime = e.startTimestamp || zf();
        this._links = e.links;
        this._attributes = {};
        this.setAttributes({
            [JD]: "manual",
            [uT]: e.op,
            ...e.attributes
        });
        this._name = e.name;
        if (e.parentSpanId) {
            this._parentSpanId = e.parentSpanId;
        }
        if ("sampled" in e) {
            this._sampled = e.sampled;
        }
        if (e.endTimestamp) {
            this._endTime = e.endTimestamp;
        }
        this._events = [];
        this._isStandaloneSpan = e.isStandalone;
        if (this._endTime) {
            this._onSpanEnded();
        }
    }
    addLink(e) {
        if (this._links) {
            this._links.push(e);
        } else {
            this._links = [
                e
            ];
        }
        return this;
    }
    addLinks(e) {
        if (this._links) {
            this._links.push(...e);
        } else {
            this._links = e;
        }
        return this;
    }
    recordException(e, t) {}
    spanContext() {
        let { _spanId, _traceId, _sampled } = this;
        return {
            spanId: _spanId,
            traceId: _traceId,
            traceFlags: _sampled ? aO : traceFlags
        };
    }
    setAttribute(e, t) {
        if (t === undefined) {
            delete this._attributes[e];
        } else {
            this._attributes[e] = t;
        }
        return this;
    }
    setAttributes(e) {
        Object.keys(e).forEach((t)=>this.setAttribute(t, e[t]));
        return this;
    }
    updateStartTime(e) {
        this._startTime = cI(e);
    }
    setStatus(e) {
        this._status = e;
        return this;
    }
    updateName(e) {
        this._name = e;
        this.setAttribute(i_, "custom");
        return this;
    }
    end(e) {
        if (!this._endTime) {
            this._endTime = cI(e);
            ((e)=>{
                if (!T_1) {
                    return;
                }
                let { description = "< unknown name >", op = "< unknown op >" } = et_1(e);
                let { spanId } = e.spanContext();
                let a = zU(e) === e;
                let o = `[Tracing] Finishing "${op}" ${a ? "root " : ""}span "${description}" with ID ${spanId}`;
                Yz.log(o);
            })(this);
            this._onSpanEnded();
        }
    }
    getSpanJSON() {
        return {
            data: this._attributes,
            description: this._name,
            op: this._attributes[uT],
            parent_span_id: this._parentSpanId,
            span_id: this._spanId,
            start_timestamp: this._startTime,
            status: yW(this._status),
            timestamp: this._endTime,
            trace_id: this._traceId,
            origin: this._attributes[JD],
            profile_id: this._attributes[E1],
            exclusive_time: this._attributes[jG],
            measurements: S(this._events),
            is_segment: this._isStandaloneSpan && zU(this) === this || undefined,
            segment_id: this._isStandaloneSpan ? zU(this).spanContext().spanId : undefined,
            links: uU(this._links)
        };
    }
    getStreamedSpanJSON() {
        return {
            name: this._name ?? "",
            span_id: this._spanId,
            trace_id: this._traceId,
            parent_span_id: this._parentSpanId,
            start_timestamp: this._startTime,
            end_timestamp: this._endTime ?? this._startTime,
            is_segment: this._isStandaloneSpan || this === zU(this),
            status: i$(this._status),
            attributes: this._attributes,
            links: HQ(this._links)
        };
    }
    isRecording() {
        return !this._endTime && !!this._sampled;
    }
    addEvent(e, t, r) {
        if (T_1) {
            Yz.log("[Tracing] Adding an event to span:", e);
        }
        let n = j(t) ? t : r || zf();
        let a = j(t) ? {} : t || {};
        let o = {
            name: e,
            time: cI(n),
            attributes: a
        };
        this._events.push(o);
        return this;
    }
    isStandaloneSpan() {
        return !!this._isStandaloneSpan;
    }
    _onSpanEnded() {
        let e = KU();
        if (e) {
            e.emit("spanEnd", this);
            if (!this._isStandaloneSpan) {
                e.emit("afterSpanEnd", this);
            }
        }
        if (!(this._isStandaloneSpan || this === zU(this))) {
            return;
        }
        if (this._isStandaloneSpan) {
            return void (this._sampled ? ((e)=>{
                let t = KU();
                if (!t) {
                    return;
                }
                let r = e[1];
                if (!r || r.length === 0) {
                    return t.recordDroppedEvent("before_send", "span");
                }
                t.sendEnvelope(e);
            })(lu_1([
                this
            ], e)) : (T_1 && Yz.log("[Tracing] Discarding standalone span because its trace was not chosen to be sampled."), e && e.recordDroppedEvent("sample_rate", "span")));
        }
        if (e && P(e)) {
            return void e.emit("afterSegmentSpanEnd", this);
        }
        let t = this._convertSpanToTransaction();
        if (t) {
            (O.L(this).scope || o5()).captureEvent(t);
        }
    }
    _convertSpanToTransaction() {
        if (!w(et_1(this))) {
            return;
        }
        if (!this._name) {
            if (T_1) {
                Yz.warn("Transaction has no name, falling back to `<unlabeled transaction>`.");
            }
            this._name = "<unlabeled transaction>";
        }
        let { scope, isolationScope } = O.L(this);
        let request = scope?.getScopeData().sdkProcessingMetadata?.normalizedRequest;
        if (this._sampled !== true) {
            return;
        }
        let n = xO(this).filter((e)=>{
            var t;
            return e !== this && !((t = e) instanceof T && t.isStandaloneSpan());
        }).map((e)=>et_1(e)).filter(w);
        let source = this._attributes[i_];
        delete this._attributes[Le];
        n.forEach((e)=>{
            delete e.data[Le];
        });
        let o = {
            contexts: {
                trace: Ck(this)
            },
            spans: n.length > 1000 ? n.sort((e, t)=>e.start_timestamp - t.start_timestamp).slice(0, 1000) : n,
            start_timestamp: this._startTime,
            timestamp: this._endTime,
            transaction: this._name,
            type: "transaction",
            sdkProcessingMetadata: {
                capturedSpanScope: scope,
                capturedSpanIsolationScope: isolationScope,
                dynamicSamplingContext: k1(this)
            },
            request,
            ...source && {
                transaction_info: {
                    source
                }
            }
        };
        let i = S(this._events);
        if (i && Object.keys(i).length) {
            if (T_1) {
                Yz.log("[Measurements] Adding measurements to transaction event", JSON.stringify(i, undefined, 2));
            }
            o.measurements = i;
        }
        return o;
    }
}
function j(e) {
    return e && typeof e === "number" || e instanceof Date || Array.isArray(e);
}
function w(e) {
    return !!e.start_timestamp && !!e.timestamp && !!e.span_id && !!e.trace_id;
}
function N(e) {
    let t = I();
    if (t.startInactiveSpan) {
        return t.startInactiveSpan(e);
    }
    let spanArguments = ((e)=>{
        let t = {
            isStandalone: (e.experimental || {}).standalone,
            ...e
        };
        if (e.startTime) {
            let r = {
                ...t
            };
            r.startTimestamp = cI(e.startTime);
            delete r.startTime;
            return r;
        }
        return t;
    })(e);
    let { forceTransaction, parentSpan } = e;
    return (e.scope ? (t)=>v4(e.scope, t) : parentSpan !== undefined ? (e)=>k(parentSpan, e) : (e)=>e())(()=>{
        let scope = o5();
        let o = ((scope_1, parentSpan_1)=>{
            if (parentSpan_1) {
                return parentSpan_1;
            }
            if (parentSpan_1 === null) {
                return;
            }
            let r = m.f(scope_1);
            if (!r) {
                return;
            }
            let n = KU();
            if ((n ? n.getOptions() : {}).parentSpanIsAlwaysRootSpan) {
                return zU(r);
            }
            return r;
        })(scope, parentSpan);
        let i = KU();
        if (e.onlyIfParent && !o) {
            i?.recordDroppedEvent("no_parent_span", "span");
            return new E;
        }
        return (({ parentSpan, spanArguments, forceTransaction, scope })=>{
            let a;
            if (!f_1()) {
                let n = new E;
                if (forceTransaction || !parentSpan) {
                    let e = {
                        sampled: "false",
                        sample_rate: "0",
                        transaction: spanArguments.name,
                        ...k1(n)
                    };
                    LZ(n, e);
                }
                return n;
            }
            let o = KU();
            if (((e, spanArguments_1)=>{
                let r = e?.getOptions().ignoreSpans;
                return !!e && !!P(e) && !!r?.length && e_1({
                    description: spanArguments_1.name || "",
                    op: spanArguments_1.attributes?.[uT] || spanArguments_1.op
                }, r);
            })(o, spanArguments)) {
                if (!L(scope)) {
                    o?.recordDroppedEvent("ignored", "span");
                }
                return new E({
                    dropReason: "ignored",
                    traceId: parentSpan?.spanContext().traceId ?? scope.getPropagationContext().traceId
                });
            }
            let i = rm();
            if (parentSpan && !forceTransaction) {
                a = ((parentSpan_1, scope_1, spanArguments_1)=>{
                    let { spanId, traceId } = parentSpan_1.spanContext();
                    let o = L(scope_1);
                    let sampled = !o && pK(parentSpan_1);
                    let s = sampled ? new T({
                        ...spanArguments_1,
                        parentSpanId: spanId,
                        traceId,
                        sampled
                    }) : new E({
                        traceId
                    });
                    Hu(parentSpan_1, s);
                    let l = KU();
                    if (l) {
                        if (P(l) && s instanceof E) {
                            if (parentSpan_1 instanceof E && parentSpan_1.dropReason) {
                                s.dropReason = parentSpan_1.dropReason;
                                l.recordDroppedEvent(parentSpan_1.dropReason, "span");
                            } else if (!o) {
                                s.dropReason = "sample_rate";
                                l.recordDroppedEvent("sample_rate", "span");
                            }
                        }
                        l.emit("spanStart", s);
                        if (spanArguments_1.endTimestamp) {
                            l.emit("spanEnd", s);
                            l.emit("afterSpanEnd", s);
                        }
                    }
                    return s;
                })(parentSpan, scope, spanArguments);
                Hu(parentSpan, a);
            } else if (parentSpan) {
                let r = k1(parentSpan);
                let { traceId, spanId } = parentSpan.spanContext();
                let s = pK(parentSpan);
                a = D({
                    traceId,
                    parentSpanId: spanId,
                    ...spanArguments
                }, scope, s);
                LZ(a, r);
            } else {
                let { traceId, dsc, parentSpanId, sampled } = {
                    ...i.getPropagationContext(),
                    ...scope.getPropagationContext()
                };
                a = D({
                    traceId,
                    parentSpanId,
                    ...spanArguments
                }, scope, sampled);
                if (dsc) {
                    LZ(a, dsc);
                }
            }
            ((e)=>{
                if (!T_1) {
                    return;
                }
                let { description = "< unknown name >", op = "< unknown op >", parent_span_id } = et_1(e);
                let { spanId } = e.spanContext();
                let o = pK(e);
                let i = zU(e);
                let s = i === e;
                let l = `[Tracing] Starting ${o ? "sampled" : "unsampled"} ${s ? "root " : ""}span`;
                let u = [
                    `op: ${op}`,
                    `name: ${description}`,
                    `ID: ${spanId}`
                ];
                if (parent_span_id) {
                    u.push(`parent ID: ${parent_span_id}`);
                }
                if (!s) {
                    let { op: op_1, description: description_1 } = et_1(i);
                    u.push(`root ID: ${i.spanContext().spanId}`);
                    if (op_1) {
                        u.push(`root op: ${op_1}`);
                    }
                    if (description_1) {
                        u.push(`root description: ${description_1}`);
                    }
                }
                Yz.log(`${l}
  ${u.join("\n  ")}`);
            })(a);
            O.d(a, scope, i);
            return a;
        })({
            parentSpan: o,
            spanArguments,
            forceTransaction,
            scope
        });
    });
}
function k(e, t) {
    let r = I();
    if (r.withActiveSpan) {
        return r.withActiveSpan(e, t);
    }
    return v4((r)=>{
        m.r(r, e || undefined);
        return t(r);
    });
}
function I() {
    let e = EU();
    return h(e);
}
function D(e, scope, parentSampled_1) {
    let n = KU();
    let a = n?.getOptions() || {};
    let { name = "" } = e;
    let i = {
        spanAttributes: {
            ...e.attributes
        },
        spanName: name,
        parentSampled: parentSampled_1
    };
    n?.emit("beforeSampling", i, {
        decision: false
    });
    let parentSampled = i.parentSampled ?? parentSampled_1;
    let i_spanAttributes = i.spanAttributes;
    let u = scope.getPropagationContext();
    let _ = L(scope);
    let [m, g, y] = _ ? [
        false
    ] : ((e, t, r)=>{
        let n;
        let a;
        if (!f_1(e)) {
            return [
                false
            ];
        }
        if (typeof e.tracesSampler === "function") {
            n = e.tracesSampler({
                ...t,
                inheritOrSampleWith: (e)=>{
                    if (typeof t.parentSampleRate === "number") {
                        return t.parentSampleRate;
                    }
                    if (typeof t.parentSampled === "boolean") {
                        return Number(t.parentSampled);
                    }
                    return e;
                }
            });
            a = true;
        } else if (t.parentSampled !== undefined) {
            n = t.parentSampled;
        } else if (e.tracesSampleRate !== undefined) {
            n = e.tracesSampleRate;
            a = true;
        }
        let o = i_1(n);
        if (o === undefined) {
            if (T_1) {
                Yz.warn(`[Tracing] Discarding root span because of invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(n)} of type ${JSON.stringify(typeof n)}.`);
            }
            return [
                false
            ];
        }
        if (!o) {
            if (T_1) {
                Yz.log(`[Tracing] Discarding transaction because ${typeof e.tracesSampler === "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`);
            }
            return [
                false,
                o,
                a
            ];
        }
        let i = r < o;
        if (!i && T_1) {
            Yz.log(`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(n)})`);
        }
        return [
            i,
            o,
            a
        ];
    })(a, {
        name,
        parentSampled,
        attributes: i_spanAttributes,
        parentSampleRate: i_1(u.dsc?.sample_rate)
    }, u.sampleRand);
    let v = new T({
        ...e,
        attributes: {
            [i_]: "custom",
            [sy]: g !== undefined && y ? g : undefined,
            ...i_spanAttributes
        },
        sampled: m
    });
    if (!(m || !n || _)) {
        if (T_1) {
            Yz.log("[Tracing] Discarding root span because its trace was not chosen to be sampled.");
        }
        n.recordDroppedEvent("sample_rate", P(n) ? "span" : "transaction");
    }
    if (n) {
        n.emit("spanStart", v);
    }
    return v;
}
function L(scope) {
    return scope.getScopeData().sdkProcessingMetadata.__SENTRY_SUPPRESS_TRACING__ === true;
}
let U = {
    idleTimeout: 1000,
    finalTimeout: 30000,
    childSpanTimeout: 15000
};
function H(e, t = {}) {
    let r;
    let n = new Map;
    let a = false;
    let o = "externalFinish";
    let i = !t.disableAutoFinish;
    let s = [];
    let { idleTimeout = U.idleTimeout, finalTimeout = U.finalTimeout, childSpanTimeout = U.childSpanTimeout, beforeSpanEnd, trimIdleSpanEndTimestamp = true } = t;
    let P = KU();
    if (!P || !f_1()) {
        let e = new E;
        let t = {
            sample_rate: "0",
            sampled: "false",
            ...k1(e)
        };
        LZ(e, t);
        return e;
    }
    let O = o5();
    let j = Bk();
    let w = ((e)=>{
        let t = N(e);
        m.r(o5(), t);
        if (T_1) {
            Yz.log("[Tracing] Started span is an idle span");
        }
        return t;
    })(e);
    function A() {
        if (r) {
            clearTimeout(r);
            r = undefined;
        }
    }
    function C(e) {
        A();
        r = setTimeout(()=>{
            if (!a && n.size === 0 && i) {
                o = "idleTimeout";
                w.end(e);
            }
        }, idleTimeout);
    }
    function M(e) {
        r = setTimeout(()=>{
            if (!a && i) {
                o = "heartbeatFailed";
                w.end(e);
            }
        }, childSpanTimeout);
    }
    function k(e) {
        a = true;
        n.clear();
        s.forEach((e)=>e());
        m.r(O, j);
        let t = et_1(w);
        let { start_timestamp } = t;
        if (!start_timestamp) {
            return;
        }
        if (!t.data[fs]) {
            w.setAttribute(fs, o);
        }
        let t_status = t.status;
        if (!(t_status && t_status !== "unknown")) {
            w.setStatus({
                code: F3
            });
        }
        Yz.log(`[Tracing] Idle span "${t.op}" finished`);
        let c = xO(w).filter((e)=>e !== w);
        let h = 0;
        c.forEach((t)=>{
            if (t.isRecording()) {
                t.setStatus({
                    code: TJ,
                    message: "cancelled"
                });
                t.end(e);
                if (T_1) {
                    Yz.log("[Tracing] Cancelling span since span ended early", JSON.stringify(t, undefined, 2));
                }
            }
            let { timestamp = 0, start_timestamp = 0 } = et_1(t);
            let a = start_timestamp <= e;
            let o = timestamp - start_timestamp <= (finalTimeout + idleTimeout) / 1000;
            if (T_1) {
                let e = JSON.stringify(t, undefined, 2);
                if (a) {
                    if (!o) {
                        Yz.log("[Tracing] Discarding span since it finished after idle span final timeout", e);
                    }
                } else {
                    Yz.log("[Tracing] Discarding span since it happened after idle span was finished", e);
                }
            }
            if (!o || !a) {
                VS(w, t);
                h++;
            }
        });
        if (h > 0) {
            w.setAttribute("sentry.idle_span_discarded_spans", h);
        }
    }
    w.end = new Proxy(w.end, {
        apply (e, t, r) {
            if (beforeSpanEnd) {
                beforeSpanEnd(w);
            }
            if (t instanceof E) {
                return;
            }
            let [n, ...a] = r;
            let o = n || zf();
            let i = cI(o);
            let s = xO(w).filter((e)=>e !== w);
            let l = et_1(w);
            if (!s.length || !trimIdleSpanEndTimestamp) {
                k(i);
                return Reflect.apply(e, t, [
                    i,
                    ...a
                ]);
            }
            let ignoreSpans = P.getOptions().ignoreSpans;
            let f = s?.reduce((e, t)=>{
                let r = et_1(t);
                if (!r.timestamp || ignoreSpans && e_1(r, ignoreSpans)) {
                    return e;
                }
                if (e) {
                    return Math.max(e, r.timestamp);
                }
                return r.timestamp;
            }, undefined);
            let l_start_timestamp = l.start_timestamp;
            let p = Math.min(l_start_timestamp ? l_start_timestamp + finalTimeout / 1000 : Infinity, Math.max(l_start_timestamp || -Infinity, Math.min(i, f || Infinity)));
            k(p);
            return Reflect.apply(e, t, [
                p,
                ...a
            ]);
        }
    });
    s.push(P.on("spanStart", (e)=>{
        var t;
        if (!(a || e === w || et_1(e).timestamp || e instanceof T && e.isStandaloneSpan()) && xO(w).includes(e)) {
            t = e.spanContext().spanId;
            A();
            n.set(t, true);
            M(zf() + childSpanTimeout / 1000);
        }
    }));
    s.push(P.on("spanEnd", (e)=>{
        if (!a) {
            var t;
            t = e.spanContext().spanId;
            if (n.has(t)) {
                n.delete(t);
            }
            if (n.size === 0) {
                C(zf() + idleTimeout / 1000);
            }
        }
    }));
    s.push(P.on("idleSpanEnableAutoFinish", (e)=>{
        if (e === w) {
            i = true;
            C();
            if (n.size) {
                M();
            }
        }
    }));
    if (!t.disableAutoFinish) {
        C();
    }
    setTimeout(()=>{
        if (!a) {
            w.setStatus({
                code: TJ,
                message: "deadline_exceeded"
            });
            o = "finalTimeout";
            w.end();
        }
    }, finalTimeout);
    return w;
}
let B = false;
let Z = (e, t, r, reportAllChanges)=>{
    let a;
    let o;
    return (i)=>{
        if (t.value >= 0 && (i || reportAllChanges) && ((o = t.value - (a ?? 0)) || a === undefined)) {
            a = t.value;
            t.delta = o;
            t.rating = ((e, t)=>{
                if (e > t[1]) {
                    return "poor";
                }
                if (e > t[0]) {
                    return "needs-improvement";
                }
                return "good";
            })(t.value, r);
            e(t);
        }
    };
};
let ee = (e = true)=>{
    let t = j_1.performance?.getEntriesByType?.("navigation")[0];
    if (!e || t && t.responseStart > 0 && t.responseStart < performance.now()) {
        return t;
    }
};
let et = ()=>{
    let e = ee();
    return e?.activationStart ?? 0;
};
function er(e, t, r) {
    if (j_1.document) {
        j_1.addEventListener(e, t, r);
    }
}
function en(e, t, r) {
    if (j_1.document) {
        j_1.removeEventListener(e, t, r);
    }
}
let firstHiddenTime = -1;
let eo = new Set;
let ei = (e)=>{
    if ((e.type === "pagehide" || j_1.document?.visibilityState === "hidden") && firstHiddenTime > -1) {
        if (e.type === "visibilitychange" || e.type === "pagehide") {
            for (let e of eo){
                e();
            }
        }
        if (!isFinite(firstHiddenTime)) {
            firstHiddenTime = e.type === "visibilitychange" ? e.timeStamp : 0;
            en("prerenderingchange", ei, true);
        }
    }
};
let es = ()=>{
    if (j_1.document && firstHiddenTime < 0) {
        let e = et();
        firstHiddenTime = (j_1.document.prerendering ? undefined : globalThis.performance.getEntriesByType("visibility-state").filter((t)=>t.name === "hidden" && t.startTime > e)[0]?.startTime) ?? (j_1.document?.visibilityState !== "hidden" || j_1.document?.prerendering ? Infinity : 0);
        er("visibilitychange", ei, true);
        er("pagehide", ei, true);
        er("prerenderingchange", ei, true);
    }
    return {
        get firstHiddenTime () {
            return firstHiddenTime;
        },
        onHidden (e) {
            eo.add(e);
        }
    };
};
let el = (e, value = -1)=>{
    let r = ee();
    let navigationType = "navigate";
    if (r) {
        if (j_1.document?.prerendering || et() > 0) {
            navigationType = "prerender";
        } else if (j_1.document?.wasDiscarded) {
            navigationType = "restore";
        } else if (r.type) {
            navigationType = r.type.replace(/_/g, "-");
        }
    }
    return {
        name: e,
        value,
        rating: "good",
        delta: 0,
        entries: [],
        id: `v5-${Date.now()}-${Math.floor(Math.random() * (9000000000000 - 1)) + 1000000000000}`,
        navigationType
    };
};
let eu = new WeakMap;
function ec(e, t) {
    try {
        if (!eu.get(e)) {
            eu.set(e, new t);
        }
        return eu.get(e);
    } catch (e) {
        return new t;
    }
}
class ef {
    constructor(){
        this._sessionValue = 0;
        this._sessionEntries = [];
    }
    _processEntry(e) {
        if (e.hadRecentInput) {
            return;
        }
        let t = this._sessionEntries[0];
        let r = this._sessionEntries[this._sessionEntries.length - 1];
        if (this._sessionValue && t && r && e.startTime - r.startTime < 1000 && e.startTime - t.startTime < 5000) {
            this._sessionValue += e.value;
            this._sessionEntries.push(e);
        } else {
            this._sessionValue = e.value;
            this._sessionEntries = [
                e
            ];
        }
        this._onAfterProcessingUnexpectedShift?.(e);
    }
}
let ed = (e, t, r = {})=>{
    try {
        if (PerformanceObserver.supportedEntryTypes.includes(e)) {
            let n = new PerformanceObserver((e)=>{
                Promise.resolve().then(()=>{
                    t(e.getEntries());
                });
            });
            n.observe({
                type: e,
                buffered: true,
                ...r
            });
            return n;
        }
    } catch  {}
};
let ep = (e)=>{
    let t = false;
    return ()=>{
        if (!t) {
            e();
            t = true;
        }
    };
};
let eh = (e)=>{
    if (j_1.document?.prerendering) {
        addEventListener("prerenderingchange", ()=>e(), true);
    } else {
        e();
    }
};
let e_ = [
    1800,
    3000
];
let em = [
    0.1,
    0.25
];
let eg = 0;
let ey = Infinity;
let ev = 0;
let eb = (e)=>{
    e.forEach((e)=>{
        if (e.interactionId) {
            ey = Math.min(ey, e.interactionId);
            eg = (ev = Math.max(ev, e.interactionId)) ? (ev - ey) / 7 + 1 : 0;
        }
    });
};
let eE = ()=>{
    if (n) {
        return eg;
    }
    return performance.interactionCount || 0;
};
let eR = 0;
class eS {
    constructor(){
        this._longestInteractionList = [];
        this._longestInteractionMap = new Map;
    }
    _resetInteractions() {
        eR = eE();
        this._longestInteractionList.length = 0;
        this._longestInteractionMap.clear();
    }
    _estimateP98LongestInteraction() {
        let e = Math.min(this._longestInteractionList.length - 1, Math.floor((eE() - eR) / 50));
        return this._longestInteractionList[e];
    }
    _processEntry(e) {
        this._onBeforeProcessingEntry?.(e);
        if (!(e.interactionId || e.entryType === "first-input")) {
            return;
        }
        let t = this._longestInteractionList.at(-1);
        let r = this._longestInteractionMap.get(e.interactionId);
        if (r || this._longestInteractionList.length < 10 || e.duration > t._latency) {
            if (r) {
                if (e.duration > r._latency) {
                    r.entries = [
                        e
                    ];
                    r._latency = e.duration;
                } else if (e.duration === r._latency && e.startTime === r.entries[0].startTime) {
                    r.entries.push(e);
                }
            } else {
                r = {
                    id: e.interactionId,
                    entries: [
                        e
                    ],
                    _latency: e.duration
                };
                this._longestInteractionMap.set(r.id, r);
                this._longestInteractionList.push(r);
            }
            this._longestInteractionList.sort((e, t)=>t._latency - e._latency);
            if (this._longestInteractionList.length > 10) {
                for (let e of this._longestInteractionList.splice(10)){
                    this._longestInteractionMap.delete(e.id);
                }
            }
            this._onAfterProcessingINPCandidate?.(r);
        }
    }
}
let eP = (e)=>{
    let t = j_1.requestIdleCallback || j_1.setTimeout;
    if (j_1.document?.visibilityState === "hidden") {
        e();
    } else {
        er("visibilitychange", e = ep(e), {
            once: true,
            capture: true
        });
        er("pagehide", e, {
            once: true,
            capture: true
        });
        t(()=>{
            e();
            en("visibilitychange", e, {
                capture: true
            });
            en("pagehide", e, {
                capture: true
            });
        });
    }
};
let eO = [
    200,
    500
];
class eT {
    _processEntry(e) {
        this._onBeforeProcessingEntry?.(e);
    }
}
let ej = [
    2500,
    4000
];
let ew = [
    800,
    1800
];
let ex = (e)=>{
    if (j_1.document?.prerendering) {
        eh(()=>ex(e));
    } else if (j_1.document?.readyState !== "complete") {
        addEventListener("load", ()=>ex(e), true);
    } else {
        setTimeout(e);
    }
};
let eA = {};
let eC = {};
function eM(e, t = false) {
    return e$("cls", e, eL, a, t);
}
function eN(e, t = false) {
    return e$("lcp", e, eU, o, t);
}
function ek(e) {
    return e$("inp", e, eF, s);
}
function eI(e, t) {
    eB(e, t);
    if (!eC[e]) {
        ((e)=>{
            let t = {};
            if (e === "event") {
                t.durationThreshold = 0;
            }
            ed(e, (entries)=>{
                eD(e, {
                    entries
                });
            }, t);
        })(e);
        eC[e] = true;
    }
    return ez(e, t);
}
function eD(e, t) {
    let r = eA[e];
    if (r?.length) {
        for (let n of r){
            try {
                n(t);
            } catch (error) {
                if (T_2) {
                    Yz.error(`Error while triggering instrumentation handler.
Type: ${e}
Name: ${qQ(n)}
Error:`, error);
                }
            }
        }
    }
}
function eL() {
    return ((e, t = {})=>{
        ((e, t = {})=>{
            eh(()=>{
                let r;
                let n = es();
                let a = el("FCP");
                let o = ed("paint", (e)=>{
                    for (let t of e){
                        if (t.name === "first-contentful-paint") {
                            o.disconnect();
                            if (t.startTime < n.firstHiddenTime) {
                                a.value = Math.max(t.startTime - et(), 0);
                                a.entries.push(t);
                                r(true);
                            }
                        }
                    }
                });
                if (o) {
                    r = Z(e, a, e_, t.reportAllChanges);
                }
            });
        })(ep(()=>{
            let r;
            let n = el("CLS", 0);
            let a = es();
            let o = ec(t, ef);
            let i = (e)=>{
                for (let t of e){
                    o._processEntry(t);
                }
                if (o._sessionValue > n.value) {
                    n.value = o._sessionValue;
                    n.entries = o._sessionEntries;
                    r();
                }
            };
            let s = ed("layout-shift", i);
            if (s) {
                r = Z(e, n, em, t.reportAllChanges);
                a.onHidden(()=>{
                    i(s.takeRecords());
                    r(true);
                });
                j_1?.setTimeout?.(r);
            }
        }));
    })((e)=>{
        eD("cls", {
            metric: e
        });
        a = e;
    }, {
        reportAllChanges: true
    });
}
function eU() {
    return ((e, t = {})=>{
        eh(()=>{
            let r;
            let n = es();
            let a = el("LCP");
            let o = ec(t, eT);
            let i = (e)=>{
                for (let i of (t.reportAllChanges || (e = e.slice(-1)), e)){
                    o._processEntry(i);
                    if (i.startTime < n.firstHiddenTime) {
                        a.value = Math.max(i.startTime - et(), 0);
                        a.entries = [
                            i
                        ];
                        r();
                    }
                }
            };
            let s = ed("largest-contentful-paint", i);
            if (s) {
                r = Z(e, a, ej, t.reportAllChanges);
                let n = ep(()=>{
                    i(s.takeRecords());
                    s.disconnect();
                    r(true);
                });
                let o = (e)=>{
                    if (e.isTrusted) {
                        eP(n);
                        en(e.type, o, {
                            capture: true
                        });
                    }
                };
                for (let e of [
                    "keydown",
                    "click",
                    "visibilitychange"
                ]){
                    er(e, o, {
                        capture: true
                    });
                }
            }
        });
    })((e)=>{
        eD("lcp", {
            metric: e
        });
        o = e;
    }, {
        reportAllChanges: true
    });
}
function eH() {
    return ((e, t = {})=>{
        let r = el("TTFB");
        let n = Z(e, r, ew, t.reportAllChanges);
        ex(()=>{
            let e = ee();
            if (e) {
                r.value = Math.max(e.responseStart - et(), 0);
                r.entries = [
                    e
                ];
                n(true);
            }
        });
    })((e)=>{
        eD("ttfb", {
            metric: e
        });
        i = e;
    });
}
function eF() {
    return ((e, t = {})=>{
        if (!(globalThis.PerformanceEventTiming && "interactionId" in PerformanceEventTiming.prototype)) {
            return;
        }
        let r = es();
        eh(()=>{
            let a;
            if (!("interactionCount" in performance || n)) {
                n = ed("event", eb, {
                    type: "event",
                    buffered: true,
                    durationThreshold: 0
                });
            }
            let o = el("INP");
            let i = ec(t, eS);
            let s = (e)=>{
                eP(()=>{
                    for (let t of e){
                        i._processEntry(t);
                    }
                    let t = i._estimateP98LongestInteraction();
                    if (t && t._latency !== o.value) {
                        o.value = t._latency;
                        o.entries = t.entries;
                        a();
                    }
                });
            };
            let l = ed("event", s, {
                durationThreshold: t.durationThreshold ?? 40
            });
            a = Z(e, o, eO, t.reportAllChanges);
            if (l) {
                l.observe({
                    type: "first-input",
                    buffered: true
                });
                r.onHidden(()=>{
                    s(l.takeRecords());
                    a(true);
                });
            }
        });
    })((e)=>{
        eD("inp", {
            metric: e
        });
        s = e;
    });
}
function e$(e, t, r, n, a = false) {
    let o;
    eB(e, t);
    if (!eC[e]) {
        o = r();
        eC[e] = true;
    }
    if (n) {
        t({
            metric: n
        });
    }
    return ez(e, t, a ? o : undefined);
}
function eB(e, t) {
    eA[e] = eA[e] || [];
    eA[e].push(t);
}
function ez(e, t, r) {
    return ()=>{
        if (r) {
            r();
        }
        let n = eA[e];
        if (!n) {
            return;
        }
        let a = n.indexOf(t);
        if (a !== -1) {
            n.splice(a, 1);
        }
    };
}
function eY(e) {
    return typeof e === "number" && isFinite(e);
}
function eq(e, t, r, { ...rest }) {
    let start_timestamp = et_1(e).start_timestamp;
    if (start_timestamp && start_timestamp > t && typeof e.updateStartTime === "function") {
        e.updateStartTime(t);
    }
    return k(e, ()=>{
        let e = N({
            startTime: t,
            ...rest
        });
        if (e) {
            e.end(r);
        }
        return e;
    });
}
function eW(e) {
    let t;
    let r = KU();
    if (!r) {
        return;
    }
    let { name, transaction, attributes, startTime } = e;
    let { release, environment, sendDefaultPii } = r.getOptions();
    let f = r.getIntegrationByName("Replay");
    let d = f?.getReplayId();
    let p = o5();
    let h = p.getUser();
    let _ = h !== undefined ? h.email || h.id || h.ip_address : undefined;
    try {
        t = p.getScopeData().contexts.profile.profile_id;
    } catch  {}
    return N({
        name,
        attributes: {
            release,
            environment,
            user: _ || undefined,
            profile_id: t || undefined,
            replay_id: d || undefined,
            transaction,
            "user_agent.original": j_1.navigator?.userAgent,
            "client.address": sendDefaultPii ? "{{auto}}" : undefined,
            ...attributes
        },
        startTime,
        experimental: {
            standalone: true
        }
    });
}
function eX() {
    return j_1.addEventListener && j_1.performance;
}
function eK(e) {
    return e / 1000;
}
function eG(e) {
    try {
        return PerformanceObserver.supportedEntryTypes.includes(e);
    } catch  {
        return false;
    }
}
function eV(client, t) {
    let r;
    let n = false;
    function a(e) {
        if (!n && r) {
            t(e, r.spanContext().spanId, r);
        }
        n = true;
    }
    let o = (e)=>{
        if (e.type === "pagehide" || j_1.document?.visibilityState === "hidden") {
            a("pagehide");
        }
    };
    er("visibilitychange", o, {
        capture: true,
        once: true
    });
    er("pagehide", o, {
        capture: true,
        once: true
    });
    let i = client.on("beforeStartNavigationSpan", (e, t)=>{
        if (!t?.isRedirect) {
            a("navigation");
            i();
            s();
        }
    });
    let s = client.on("afterStartPageLoadSpan", (e)=>{
        r = e;
        s();
    });
}
function eJ(e) {
    return e != null && e > 0 && e <= 60000;
}
function eQ(e) {
    if (e) {
        return ((k3() || performance.timeOrigin) + e) / 1000;
    }
    return e;
}
function eZ(e) {
    let t = {};
    if (e.nextHopProtocol != undefined) {
        let { name, version } = ((e)=>{
            let t = "unknown";
            let version_1 = "unknown";
            let n = "";
            for (let a of e){
                if (a === "/") {
                    [t, version_1] = e.split("/");
                    break;
                }
                if (!isNaN(Number(a))) {
                    t = n === "h" ? "http" : n;
                    version_1 = e.split(n)[1];
                    break;
                }
                n += a;
            }
            if (n === e) {
                t = n;
            }
            return {
                name: t,
                version: version_1
            };
        })(e.nextHopProtocol);
        t["network.protocol.version"] = version;
        t["network.protocol.name"] = name;
    }
    if (k3() || eX()?.timeOrigin) {
        return Object.fromEntries(Object.entries({
            ...t,
            "http.request.redirect_start": eQ(e.redirectStart),
            "http.request.redirect_end": eQ(e.redirectEnd),
            "http.request.worker_start": eQ(e.workerStart),
            "http.request.fetch_start": eQ(e.fetchStart),
            "http.request.domain_lookup_start": eQ(e.domainLookupStart),
            "http.request.domain_lookup_end": eQ(e.domainLookupEnd),
            "http.request.connect_start": eQ(e.connectStart),
            "http.request.secure_connection_start": eQ(e.secureConnectionStart),
            "http.request.connection_end": eQ(e.connectEnd),
            "http.request.request_start": eQ(e.requestStart),
            "http.request.response_start": eQ(e.responseStart),
            "http.request.response_end": eQ(e.responseEnd),
            "http.request.time_to_first_byte": e.responseStart != null ? e.responseStart / 1000 : undefined
        }).filter(([, e])=>e != null));
    }
    return t;
}
let e0 = 0;
let e1 = {};
function e2(e, t, r, n, a = r) {
    let o;
    let i = t[(o = r) === "secureConnection" ? "connectEnd" : o === "fetch" ? "domainLookupStart" : `${o}End`];
    let s = t[`${r}Start`];
    if (s && i) {
        eq(e, n + eK(s), n + eK(i), {
            op: `browser.${a}`,
            name: t.name,
            attributes: {
                [JD]: "auto.ui.browser.metrics",
                ...r === "redirect" && t.redirectCount != null ? {
                    "http.redirect_count": t.redirectCount
                } : {}
            }
        });
    }
}
let e5 = [];
let e6 = new Map;
let e7 = new Map;
let e8 = {
    click: "click",
    pointerdown: "click",
    pointerup: "click",
    mousedown: "click",
    mouseup: "click",
    touchstart: "click",
    touchend: "click",
    mouseover: "hover",
    mouseout: "hover",
    mouseenter: "hover",
    mouseleave: "hover",
    pointerover: "hover",
    pointerout: "hover",
    pointerenter: "hover",
    pointerleave: "hover",
    dragstart: "drag",
    dragend: "drag",
    drag: "drag",
    dragenter: "drag",
    dragleave: "drag",
    dragover: "drag",
    drop: "drag",
    keydown: "press",
    keyup: "press",
    keypress: "press",
    input: "press"
};
let e9 = ({ metric })=>{
    if (metric.value == undefined) {
        return;
    }
    let t = eK(metric.value);
    if (t > 60) {
        return;
    }
    let r = metric.entries.find((t)=>t.duration === metric.value && e8[t.name]);
    if (!r) {
        return;
    }
    let { interactionId } = r;
    let a = e8[r.name];
    let o = eK(k3() + r.startTime);
    let i = Bk();
    let s = i ? zU(i) : undefined;
    let l = interactionId != null ? e6.get(interactionId) : undefined;
    let u = l?.span || s;
    let transaction = u ? et_1(u).description : o5().getScopeData().transactionName;
    let p = eW({
        name: l?.elementName || Hd(r.target),
        transaction,
        attributes: {
            [JD]: "auto.http.browser.inp",
            [uT]: `ui.interaction.${a}`,
            [jG]: r.duration
        },
        startTime: o
    });
    if (p) {
        p.addEvent("inp", {
            [Sn]: "millisecond",
            [xc]: metric.value
        });
        p.end(o + t);
    }
};
function te({ name, op, origin, metricName, value, attributes, parentSpan, reportEvent, startTime, endTime }) {
    let transactionName = o5().getScopeData().transactionName;
    let h = {
        [JD]: origin,
        [uT]: op,
        [jG]: 0,
        [`browser.web_vital.${metricName}.value`]: value,
        "sentry.transaction": transactionName,
        "user_agent.original": j_1.navigator?.userAgent,
        ...attributes
    };
    if (parentSpan && RD(parentSpan).attributes?.[uT] === "pageload") {
        h["sentry.pageload.span_id"] = parentSpan.spanContext().spanId;
    }
    if (reportEvent) {
        h[`browser.web_vital.${metricName}.report_event`] = reportEvent;
    }
    let _ = N({
        name,
        attributes: h,
        startTime,
        parentSpan
    });
    if (_) {
        _.end(endTime ?? startTime);
    }
}
let ta = "sentry_previous_trace";
function to(e) {
    return e.traceFlags === 1;
}
function tu(e = {}) {
    let t = e.client || KU();
    if (!Ol() || !t) {
        return {};
    }
    let r = EU();
    let n = h(r);
    if (n.getTraceData) {
        return n.getTraceData(e);
    }
    let a = e.scope || o5();
    let o = e.span || Bk();
    if (!o && Bi()) {
        return {};
    }
    let i = o ? Qh(o) : ((e)=>{
        let { traceId, sampled, propagationSpanId } = e.getPropagationContext();
        return TC(traceId, propagationSpanId, sampled);
    })(a);
    let s = o ? k1(o) : ao(t, a);
    let baggage = De(s);
    if (!MI.test(i)) {
        Yz.warn("Invalid sentry-trace data. Cannot generate trace data");
        return {};
    }
    let u = {
        "sentry-trace": i,
        baggage
    };
    if (e.propagateTraceparent) {
        u.traceparent = o ? G_(o) : ((e)=>{
            let { traceId, sampled, propagationSpanId } = e.getPropagationContext();
            return Iy(traceId, propagationSpanId, sampled);
        })(a);
    }
    return u;
}
function tc(e) {
    return typeof e === "string" && e.split(",").some((e)=>e.trim().startsWith(sv));
}
function tf(url, t, method, spanOrigin) {
    let a = {
        url: zm(url),
        type: "fetch",
        "http.method": method,
        [JD]: spanOrigin,
        [uT]: "http.client"
    };
    if (t) {
        if (!nt(t)) {
            a["http.url"] = zm(t.href);
            a["server.address"] = t.host;
        }
        if (t.search) {
            a["http.query"] = t.search;
        }
        if (t.hash) {
            a["http.fragment"] = t.hash;
        }
    }
    return a;
}
function tp(url) {
    try {
        return new URL(url, jf.location.origin).href;
    } catch  {
        return;
    }
}
function th(e) {
    try {
        return new Headers(e);
    } catch  {
        return;
    }
}
Symbol.for("sentry__originalRequestBody");
let t_ = new WeakMap;
let tm = new Map;
let tg = {
    traceFetch: true,
    traceXHR: true,
    enableHTTPTimings: true,
    trackFetchStreamPerformance: false
};
function ty(e, t) {
    let { url } = et_1(e).data;
    if (!url || typeof url !== "string") {
        return;
    }
    let n = ()=>void setTimeout(a);
    if (P(t)) {
        let t = e.end.bind(e);
        e.end = (e)=>{
            let r = e ?? zf();
            let o = false;
            let i = ()=>{
                if (!o) {
                    o = true;
                    setTimeout(a);
                    t(r);
                    clearTimeout(s);
                }
            };
            n = i;
            let s = setTimeout(i, 300);
        };
    }
    let a = eI("resource", ({ entries })=>{
        entries.forEach((t)=>{
            if (t.entryType === "resource" && "initiatorType" in t && typeof t.nextHopProtocol === "string" && (t.initiatorType === "fetch" || t.initiatorType === "xmlhttprequest") && t.name.endsWith(url)) {
                e.setAttributes(eZ(t));
                n();
            }
        });
    });
}
let tv = /Googlebot|Google-InspectionTool|Storebot-Google|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Facebot|facebookexternalhit|LinkedInBot|Twitterbot|Applebot/i;
export function e3() {
    let jf_navigator = jf.navigator;
    return !!jf_navigator?.userAgent && tv.test(jf_navigator.userAgent);
}
let tE = {
    ...U,
    instrumentNavigation: true,
    instrumentPageLoad: true,
    markBackgroundSpan: true,
    enableLongTask: true,
    enableLongAnimationFrame: true,
    enableInp: true,
    ignoreResourceSpans: [],
    ignorePerformanceApiSpans: [],
    detectRedirects: true,
    linkPreviousTrace: "in-memory",
    consistentTraceSampling: false,
    enableReportPageLoaded: false,
    _experiments: {},
    ...tg
};
export let dp = (e = {})=>{
    let t;
    let r;
    let n;
    if ("enableElementTiming" in e) {
        pq(()=>{
            console.warn("[Sentry] `enableElementTiming` is deprecated and no longer has any effect. Use the standalone `elementTimingIntegration` instead.");
        });
    }
    let a = {
        name: undefined,
        source: undefined
    };
    let jf_document = jf.document;
    let { enableInp, enableLongTask, enableLongAnimationFrame, _experiments: { enableInteractions, enableStandaloneClsSpans, enableStandaloneLcpSpans }, beforeStartSpan, idleTimeout, finalTimeout, childSpanTimeout, markBackgroundSpan, traceFetch, traceXHR, trackFetchStreamPerformance, shouldCreateSpanForRequest, enableHTTPTimings, ignoreResourceSpans, ignorePerformanceApiSpans, instrumentPageLoad, instrumentNavigation, detectRedirects, linkPreviousTrace, consistentTraceSampling, enableReportPageLoaded, onRequestSpanStart, onRequestSpanEnd } = {
        ...tE,
        ...e
    };
    let ec = e3();
    function ef(client, r, i = true) {
        let s;
        let h;
        let disableAutoFinish = r.op === "pageload";
        let r_name = r.name;
        let b = beforeStartSpan ? beforeStartSpan(r) : r;
        let E = b.attributes || {};
        if (r_name !== b.name) {
            E[i_] = "custom";
            b.attributes = E;
        }
        if (!i) {
            let e = lu();
            N({
                ...b,
                startTime: e
            }).end(e);
            return;
        }
        a.name = b.name;
        a.source = E[i_];
        let R = H(b, {
            idleTimeout,
            finalTimeout,
            childSpanTimeout,
            disableAutoFinish,
            beforeSpanEnd: (r)=>{
                var a;
                var o;
                t?.();
                let spanStreamingEnabled = P(client);
                ((e, t)=>{
                    let r = eX();
                    let n = k3();
                    if (!r?.getEntries || !n) {
                        return;
                    }
                    let { spanStreamingEnabled, ignorePerformanceApiSpans, ignoreResourceSpans, recordClsOnPageloadSpan, recordLcpOnPageloadSpan } = t;
                    let h = eK(n);
                    let _ = r.getEntries();
                    let { op, start_timestamp } = et_1(e);
                    _.slice(e0).forEach((t)=>{
                        let r = eK(t.startTime);
                        let n = eK(Math.max(0, t.duration));
                        if (op !== "navigation" || !start_timestamp || !(h + r < start_timestamp)) {
                            switch(t.entryType){
                                case "navigation":
                                    var a;
                                    var s;
                                    var l;
                                    a = e;
                                    s = t;
                                    l = h;
                                    [
                                        "unloadEvent",
                                        "redirect",
                                        "domContentLoadedEvent",
                                        "loadEvent",
                                        "connect"
                                    ].forEach((e)=>{
                                        e2(a, s, e, l);
                                    });
                                    e2(a, s, "secureConnection", l, "TLS/SSL");
                                    e2(a, s, "fetch", l, "cache");
                                    e2(a, s, "domainLookup", l, "DNS");
                                    ((e, t, r)=>{
                                        let n = r + eK(t.requestStart);
                                        let a = r + eK(t.responseEnd);
                                        let o = r + eK(t.responseStart);
                                        if (t.responseEnd) {
                                            eq(e, n, a, {
                                                op: "browser.request",
                                                name: t.name,
                                                attributes: {
                                                    [JD]: "auto.ui.browser.metrics"
                                                }
                                            });
                                            eq(e, o, a, {
                                                op: "browser.response",
                                                name: t.name,
                                                attributes: {
                                                    [JD]: "auto.ui.browser.metrics"
                                                }
                                            });
                                        }
                                    })(a, s, l);
                                    break;
                                case "mark":
                                case "paint":
                                case "measure":
                                    {
                                        ((e, t, r, n, a, ignorePerformanceApiSpans_1)=>{
                                            if (((e)=>{
                                                if (e?.entryType === "measure") {
                                                    try {
                                                        return e.detail.devtools.track === "Components ⚛";
                                                    } catch  {
                                                        return;
                                                    }
                                                }
                                            })(t) || [
                                                "mark",
                                                "measure"
                                            ].includes(t.entryType) && Xr(t.name, ignorePerformanceApiSpans_1)) {
                                                return;
                                            }
                                            let i = ee(false);
                                            let s = a + Math.max(r, eK(i ? i.requestStart : 0));
                                            let l = a + r;
                                            let u = l + n;
                                            let c = {
                                                [JD]: "auto.resource.browser.metrics"
                                            };
                                            if (s !== l) {
                                                c["sentry.browser.measure_happened_before_request"] = true;
                                                c["sentry.browser.measure_start_time"] = s;
                                            }
                                            ((e, t)=>{
                                                try {
                                                    let r = t.detail;
                                                    if (!r) {
                                                        return;
                                                    }
                                                    if (typeof r === "object") {
                                                        for (let [t, n] of Object.entries(r)){
                                                            if (n && sO(n)) {
                                                                e[`sentry.browser.measure.detail.${t}`] = n;
                                                            } else if (n !== undefined) {
                                                                try {
                                                                    e[`sentry.browser.measure.detail.${t}`] = JSON.stringify(n);
                                                                } catch  {}
                                                            }
                                                        }
                                                        return;
                                                    }
                                                    if (sO(r)) {
                                                        e["sentry.browser.measure.detail"] = r;
                                                        return;
                                                    }
                                                    try {
                                                        e["sentry.browser.measure.detail"] = JSON.stringify(r);
                                                    } catch  {}
                                                } catch  {}
                                            })(c, t);
                                            if (s <= u) {
                                                eq(e, s, u, {
                                                    name: t.name,
                                                    op: t.entryType,
                                                    attributes: c
                                                });
                                            }
                                        })(e, t, r, n, h, ignorePerformanceApiSpans);
                                        let a = es();
                                        let i = t.startTime < a.firstHiddenTime;
                                        if (t.name === "first-paint" && i) {
                                            e1.fp = {
                                                value: t.startTime,
                                                unit: "millisecond"
                                            };
                                        }
                                        if (t.name === "first-contentful-paint" && i) {
                                            e1.fcp = {
                                                value: t.startTime,
                                                unit: "millisecond"
                                            };
                                        }
                                        break;
                                    }
                                case "resource":
                                    ((e, t, r, n, a, o, ignoreResourceSpans_1)=>{
                                        let s;
                                        let l;
                                        if (t.initiatorType === "xmlhttprequest" || t.initiatorType === "fetch") {
                                            return;
                                        }
                                        let u = t.initiatorType ? `resource.${t.initiatorType}` : "resource.other";
                                        if (ignoreResourceSpans_1?.includes(u)) {
                                            return;
                                        }
                                        let c = {
                                            [JD]: "auto.resource.browser.metrics"
                                        };
                                        let f = Dl(r);
                                        if (f.protocol) {
                                            c["url.scheme"] = f.protocol.split(":").pop();
                                        }
                                        if (f.host) {
                                            c["server.address"] = f.host;
                                        }
                                        c["url.same_origin"] = r.includes(j_1.location.origin);
                                        s = t;
                                        l = c;
                                        [
                                            [
                                                "responseStatus",
                                                "http.response.status_code"
                                            ],
                                            [
                                                "transferSize",
                                                "http.response_transfer_size"
                                            ],
                                            [
                                                "encodedBodySize",
                                                "http.response_content_length"
                                            ],
                                            [
                                                "decodedBodySize",
                                                "http.decoded_response_content_length"
                                            ],
                                            [
                                                "renderBlockingStatus",
                                                "resource.render_blocking_status"
                                            ],
                                            [
                                                "deliveryType",
                                                "http.response_delivery_type"
                                            ]
                                        ].forEach(([e, t])=>{
                                            let r = s[e];
                                            if (r != null && (typeof r === "number" && r < 2147483647 || typeof r === "string")) {
                                                l[t] = r;
                                            }
                                        });
                                        let p = {
                                            ...c,
                                            ...eZ(t)
                                        };
                                        let h = o + n;
                                        eq(e, h, h + a, {
                                            name: r.replace(j_1.location.origin, ""),
                                            op: u,
                                            attributes: p
                                        });
                                    })(e, t, t.name, r, n, h, ignoreResourceSpans);
                            }
                        }
                    });
                    e0 = Math.max(_.length - 1, 0);
                    ((e, spanStreamingEnabled_1)=>{
                        let j_1_navigator = j_1.navigator;
                        if (!j_1_navigator) {
                            return;
                        }
                        let r_connection = j_1_navigator.connection;
                        if (r_connection) {
                            if (r_connection.effectiveType) {
                                e.setAttribute(spanStreamingEnabled_1 ? "network.connection.effective_type" : "effectiveConnectionType", r_connection.effectiveType);
                            }
                            if (r_connection.type) {
                                e.setAttribute(spanStreamingEnabled_1 ? "network.connection.type" : "connectionType", r_connection.type);
                            }
                            if (eY(r_connection.rtt)) {
                                e1["connection.rtt"] = {
                                    value: r_connection.rtt,
                                    unit: "millisecond"
                                };
                                if (spanStreamingEnabled_1) {
                                    e.setAttribute("network.connection.rtt", r_connection.rtt);
                                }
                            }
                        }
                        if (eY(j_1_navigator.deviceMemory)) {
                            if (spanStreamingEnabled_1) {
                                e.setAttribute("device.memory.estimated_capacity", j_1_navigator.deviceMemory);
                            } else {
                                e.setAttribute("deviceMemory", `${j_1_navigator.deviceMemory} GB`);
                            }
                        }
                        if (eY(j_1_navigator.hardwareConcurrency)) {
                            if (spanStreamingEnabled_1) {
                                e.setAttribute("device.processor_count", j_1_navigator.hardwareConcurrency);
                            } else {
                                e.setAttribute("hardwareConcurrency", String(j_1_navigator.hardwareConcurrency));
                            }
                        }
                    })(e, spanStreamingEnabled);
                    if (op === "pageload") {
                        ((e)=>{
                            let t = ee(false);
                            if (!t) {
                                return;
                            }
                            let { responseStart, requestStart } = t;
                            if (requestStart <= responseStart) {
                                e["ttfb.requestTime"] = {
                                    value: responseStart - requestStart,
                                    unit: "millisecond"
                                };
                            }
                        })(e1);
                        if (spanStreamingEnabled) {
                            let t = (t, r, n)=>{
                                let a = n ?? `browser.web_vital.${t}.value`;
                                e.setAttribute(a, r);
                                if (T_2) {
                                    Yz.log("Setting web vital attribute", {
                                        [a]: r
                                    }, "on pageload span");
                                }
                            };
                            [
                                "ttfb",
                                "fp",
                                "fcp"
                            ].forEach((e)=>{
                                if (e1[e]) {
                                    t(e, e1[e].value);
                                }
                            });
                            if (e1["ttfb.requestTime"]) {
                                t("ttfb.requestTime", e1["ttfb.requestTime"].value, "browser.web_vital.ttfb.request_time");
                            }
                        } else {
                            let b;
                            let E;
                            if (!recordClsOnPageloadSpan) {
                                delete e1.cls;
                            }
                            if (!recordLcpOnPageloadSpan) {
                                delete e1.lcp;
                            }
                            Object.entries(e1).forEach(([e, t])=>{
                                ((e, t, r, n = Bk())=>{
                                    let a = n && zU(n);
                                    if (a) {
                                        if (T_1) {
                                            Yz.log(`[Measurement] Setting measurement on root span: ${e} = ${t} ${r}`);
                                        }
                                        a.addEvent(e, {
                                            [xc]: t,
                                            [Sn]: r
                                        });
                                    }
                                })(e, t.value, t.unit);
                            });
                            b = e;
                            E = t;
                            if (l && E.recordLcpOnPageloadSpan) {
                                if (l.element) {
                                    b.setAttribute("lcp.element", Hd(l.element));
                                }
                                if (l.id) {
                                    b.setAttribute("lcp.id", l.id);
                                }
                                if (l.url) {
                                    b.setAttribute("lcp.url", l.url.trim().slice(0, 200));
                                }
                                if (l.loadTime != null) {
                                    b.setAttribute("lcp.loadTime", l.loadTime);
                                }
                                if (l.renderTime != null) {
                                    b.setAttribute("lcp.renderTime", l.renderTime);
                                }
                                b.setAttribute("lcp.size", l.size);
                            }
                            if (u?.sources && E.recordClsOnPageloadSpan) {
                                u.sources.forEach((e, t)=>b.setAttribute(`cls.source.${t + 1}`, Hd(e.node)));
                            }
                        }
                        e.setAttribute(spanStreamingEnabled ? "browser.performance.time_origin" : "performance.timeOrigin", h);
                        e.setAttribute(spanStreamingEnabled ? "browser.performance.navigation.activation_start" : "performance.activationStart", et());
                    }
                    l = undefined;
                    u = undefined;
                    e1 = {};
                })(r, {
                    recordClsOnPageloadSpan: !spanStreamingEnabled && !enableStandaloneClsSpans,
                    recordLcpOnPageloadSpan: !spanStreamingEnabled && !enableStandaloneLcpSpans,
                    ignoreResourceSpans,
                    ignorePerformanceApiSpans,
                    spanStreamingEnabled
                });
                a = client;
                o = undefined;
                my(a, tj, o);
                let s = o5();
                let h = s.getPropagationContext();
                s.setPropagationContext({
                    ...h,
                    traceId: R.spanContext().traceId,
                    sampled: pK(R),
                    dsc: k1(r)
                });
                if (disableAutoFinish) {
                    n = undefined;
                }
            },
            trimIdleSpanEndTimestamp: !enableReportPageLoaded
        });
        function x() {
            if (jf_document && [
                "interactive",
                "complete"
            ].includes(jf_document.readyState)) {
                client.emit("idleSpanEnableAutoFinish", R);
            }
        }
        if (disableAutoFinish && enableReportPageLoaded) {
            n = R;
        }
        s = client;
        h = R;
        my(s, tj, h);
        if (disableAutoFinish && !enableReportPageLoaded && jf_document) {
            jf_document.addEventListener("readystatechange", ()=>{
                x();
            });
            x();
        }
    }
    return {
        name: "BrowserTracing",
        setup (client) {
            if (ec) {
                if (T_3) {
                    Yz.log("[Tracing] Skipping browserTracingIntegration setup for bot user agent.");
                }
                return;
            }
            function a() {
                let e = Bk();
                let t = e && zU(e);
                if (t) {
                    let e = "internal_error";
                    if (T_1) {
                        Yz.log(`[Tracing] Root span: ${e} -> Global error occurred`);
                    }
                    t.setStatus({
                        code: TJ,
                        message: e
                    });
                }
            }
            if (!B) {
                a.tag = "sentry_tracingErrorCallback";
                B = true;
                L_1(a);
                r_1(a);
            }
            let v = P(client);
            t = (({ recordClsStandaloneSpans, recordLcpStandaloneSpans, client })=>{
                let n = eX();
                if (n && k3()) {
                    if (n.mark) {
                        j_1.performance.mark("sentry-tracing-init");
                    }
                    let a = recordLcpStandaloneSpans ? ((client_1)=>{
                        let t;
                        let r = 0;
                        if (!eG("largest-contentful-paint")) {
                            return;
                        }
                        let n = eN(({ metric })=>{
                            let n = metric.entries[metric.entries.length - 1];
                            if (n && eJ(metric.value)) {
                                r = metric.value;
                                t = n;
                            }
                        }, true);
                        eV(client_1, (e, a)=>{
                            ((e, t, r, n)=>{
                                if (!eJ(e)) {
                                    return;
                                }
                                if (T_2) {
                                    Yz.log(`Sending LCP span (${e})`);
                                }
                                let a = eK((k3() || 0) + (t?.startTime || 0));
                                let transactionName = o5().getScopeData().transactionName;
                                let i = t ? Hd(t.element) : "Largest contentful paint";
                                let s = {
                                    [JD]: "auto.http.browser.lcp",
                                    [uT]: "ui.webvital.lcp",
                                    [jG]: 0,
                                    "sentry.pageload.span_id": r,
                                    "sentry.report_event": n
                                };
                                if (t) {
                                    if (t.element) {
                                        s["lcp.element"] = Hd(t.element);
                                    }
                                    if (t.id) {
                                        s["lcp.id"] = t.id;
                                    }
                                    if (t.url) {
                                        s["lcp.url"] = t.url;
                                    }
                                    if (t.loadTime != null) {
                                        s["lcp.loadTime"] = t.loadTime;
                                    }
                                    if (t.renderTime != null) {
                                        s["lcp.renderTime"] = t.renderTime;
                                    }
                                    if (t.size != null) {
                                        s["lcp.size"] = t.size;
                                    }
                                }
                                let l = eW({
                                    name: i,
                                    transaction: transactionName,
                                    attributes: s,
                                    startTime: a
                                });
                                if (l) {
                                    l.addEvent("lcp", {
                                        [Sn]: "millisecond",
                                        [xc]: e
                                    });
                                    l.end(a);
                                }
                            })(r, t, a, e);
                            n();
                        });
                    })(client) : recordLcpStandaloneSpans === false ? eN(({ metric })=>{
                        let t = metric.entries[metric.entries.length - 1];
                        if (t && eJ(metric.value)) {
                            e1.lcp = {
                                value: metric.value,
                                unit: "millisecond"
                            };
                            l = t;
                        }
                    }, true) : undefined;
                    let o = recordClsStandaloneSpans ? ((client_1)=>{
                        let t;
                        let r = 0;
                        if (!eG("layout-shift")) {
                            return;
                        }
                        let n = eM(({ metric })=>{
                            let n = metric.entries[metric.entries.length - 1];
                            if (n) {
                                r = metric.value;
                                t = n;
                            }
                        }, true);
                        eV(client_1, (e, a)=>{
                            ((e, t, r, n)=>{
                                if (T_2) {
                                    Yz.log(`Sending CLS span (${e})`);
                                }
                                let a = t ? eK((k3() || 0) + t.startTime) : zf();
                                let transactionName = o5().getScopeData().transactionName;
                                let i = t ? Hd(t.sources[0]?.node) : "Layout shift";
                                let s = {
                                    [JD]: "auto.http.browser.cls",
                                    [uT]: "ui.webvital.cls",
                                    [jG]: 0,
                                    "sentry.pageload.span_id": r,
                                    "sentry.report_event": n
                                };
                                if (t?.sources) {
                                    t.sources.forEach((e, t)=>{
                                        s[`cls.source.${t + 1}`] = Hd(e.node);
                                    });
                                }
                                let l = eW({
                                    name: i,
                                    transaction: transactionName,
                                    attributes: s,
                                    startTime: a
                                });
                                if (l) {
                                    l.addEvent("cls", {
                                        [Sn]: "",
                                        [xc]: e
                                    });
                                    l.end(a);
                                }
                            })(r, t, a, e);
                            n();
                        });
                    })(client) : recordClsStandaloneSpans === false ? eM(({ metric })=>{
                        let t = metric.entries[metric.entries.length - 1];
                        if (t) {
                            e1.cls = {
                                value: metric.value,
                                unit: ""
                            };
                            u = t;
                        }
                    }, true) : undefined;
                    let s = e$("ttfb", ({ metric })=>{
                        if (metric.entries[metric.entries.length - 1]) {
                            e1.ttfb = {
                                value: metric.value,
                                unit: "millisecond"
                            };
                        }
                    }, eH, i);
                    return ()=>{
                        s();
                        a?.();
                        o?.();
                    };
                }
                return ()=>undefined;
            })({
                recordClsStandaloneSpans: v ? undefined : enableStandaloneClsSpans || false,
                recordLcpStandaloneSpans: v ? undefined : enableStandaloneLcpSpans || false,
                client
            });
            if (v) {
                !((client_1)=>{
                    let t;
                    let r = 0;
                    if (!eG("largest-contentful-paint")) {
                        return;
                    }
                    let n = eN(({ metric })=>{
                        let n = metric.entries[metric.entries.length - 1];
                        if (n && eJ(metric.value)) {
                            r = metric.value;
                            t = n;
                        }
                    }, true);
                    eV(client_1, (e, a, o)=>{
                        ((e, t, r, n)=>{
                            if (!eJ(e)) {
                                return;
                            }
                            if (T_2) {
                                Yz.log(`Sending LCP span (${e})`);
                            }
                            let a = k3() || 0;
                            let o = eK(a);
                            let endTime = eK(a + (t?.startTime || 0));
                            let s = t ? Hd(t.element) : "Largest contentful paint";
                            let l = {};
                            if (t?.element) {
                                l["browser.web_vital.lcp.element"] = Hd(t.element);
                            }
                            if (t?.id) {
                                l["browser.web_vital.lcp.id"] = t.id;
                            }
                            if (t?.url) {
                                l["browser.web_vital.lcp.url"] = t.url;
                            }
                            if (t?.loadTime != null) {
                                l["browser.web_vital.lcp.load_time"] = t.loadTime;
                            }
                            if (t?.renderTime != null) {
                                l["browser.web_vital.lcp.render_time"] = t.renderTime;
                            }
                            if (t?.size != null) {
                                l["browser.web_vital.lcp.size"] = t.size;
                            }
                            te({
                                name: s,
                                op: "ui.webvital.lcp",
                                origin: "auto.http.browser.lcp",
                                metricName: "lcp",
                                value: e,
                                attributes: l,
                                parentSpan: r,
                                reportEvent: n,
                                startTime: o,
                                endTime
                            });
                        })(r, t, o, e);
                        n();
                    });
                })(client);
                !((client_1)=>{
                    let t;
                    let r = 0;
                    if (!eG("layout-shift")) {
                        return;
                    }
                    let n = eM(({ metric })=>{
                        let n = metric.entries[metric.entries.length - 1];
                        if (n) {
                            r = metric.value;
                            t = n;
                        }
                    }, true);
                    eV(client_1, (e, a, o)=>{
                        ((e, t, r, n)=>{
                            if (T_2) {
                                Yz.log(`Sending CLS span (${e})`);
                            }
                            let a = t ? eK((k3() || 0) + t.startTime) : zf();
                            let o = t ? Hd(t.sources[0]?.node) : "Layout shift";
                            let i = {};
                            if (t?.sources) {
                                t.sources.forEach((e, t)=>{
                                    i[`browser.web_vital.cls.source.${t + 1}`] = Hd(e.node);
                                });
                            }
                            te({
                                name: o,
                                op: "ui.webvital.cls",
                                origin: "auto.http.browser.cls",
                                metricName: "cls",
                                value: e,
                                attributes: i,
                                parentSpan: r,
                                reportEvent: n,
                                startTime: a
                            });
                        })(r, t, o, e);
                        n();
                    });
                })(client);
                if (enableInp && eX() && k3()) {
                    ek(({ metric })=>{
                        if (metric.value == null || eK(metric.value) > 60) {
                            return;
                        }
                        let t = metric.entries.find((t)=>t.duration === metric.value && e8[t.name]);
                        if (t) {
                            ((e, t)=>{
                                let r;
                                if (T_2) {
                                    Yz.log(`Sending INP span (${e})`);
                                }
                                let n = eK(k3() + t.startTime);
                                let a = eK(e);
                                let o = e8[t.name];
                                r = t.interactionId;
                                let i = r != null ? e6.get(r) : undefined;
                                let s = Bk();
                                let l = s ? zU(s) : undefined;
                                let u = i?.span || l;
                                let f = u ? RD(u).name : o5().getScopeData().transactionName;
                                te({
                                    name: i?.elementName || Hd(t.target),
                                    op: `ui.interaction.${o}`,
                                    origin: "auto.http.browser.inp",
                                    metricName: "inp",
                                    value: e,
                                    attributes: {
                                        [jG]: t.duration,
                                        "sentry.transaction": f
                                    },
                                    startTime: n,
                                    endTime: n + a,
                                    parentSpan: u
                                });
                            })(metric.value, t);
                        }
                    });
                }
            } else if (enableInp) {
                (()=>{
                    if (eX() && k3()) {
                        let e = ek(e9);
                        ()=>{
                            e();
                        };
                    }
                })();
            }
            if (enableLongAnimationFrame && O_1.PerformanceObserver && PerformanceObserver.supportedEntryTypes?.includes("long-animation-frame")) {
                new PerformanceObserver((e)=>{
                    let t = Bk();
                    if (t) {
                        for (let r of e.getEntries()){
                            if (!r.scripts[0]) {
                                continue;
                            }
                            let e = eK(k3() + r.startTime);
                            let { start_timestamp, op } = et_1(t);
                            if (op === "navigation" && start_timestamp && e < start_timestamp) {
                                continue;
                            }
                            let o = eK(r.duration);
                            let i = {
                                [JD]: "auto.ui.browser.metrics"
                            };
                            let { invoker, invokerType, sourceURL, sourceFunctionName, sourceCharPosition } = r.scripts[0];
                            i["browser.script.invoker"] = invoker;
                            i["browser.script.invoker_type"] = invokerType;
                            if (sourceURL) {
                                i["code.filepath"] = sourceURL;
                            }
                            if (sourceFunctionName) {
                                i["code.function"] = sourceFunctionName;
                            }
                            if (sourceCharPosition !== -1) {
                                i["browser.script.source_char_position"] = sourceCharPosition;
                            }
                            eq(t, e, e + o, {
                                name: "Main UI thread blocked",
                                op: "ui.long-animation-frame",
                                attributes: i
                            });
                        }
                    }
                }).observe({
                    type: "long-animation-frame",
                    buffered: true
                });
            } else if (enableLongTask) {
                eI("longtask", ({ entries })=>{
                    let t = Bk();
                    if (!t) {
                        return;
                    }
                    let { op, start_timestamp } = et_1(t);
                    for (let a of entries){
                        let e = eK(k3() + a.startTime);
                        let o = eK(a.duration);
                        if (!(op === "navigation" && start_timestamp && e < start_timestamp)) {
                            eq(t, e, e + o, {
                                name: "Main UI thread blocked",
                                op: "ui.long-task",
                                attributes: {
                                    [JD]: "auto.ui.browser.metrics"
                                }
                            });
                        }
                    }
                });
            }
            if (enableInteractions) {
                eI("event", ({ entries })=>{
                    let t = Bk();
                    if (t) {
                        for (let r of entries){
                            if (r.name === "click") {
                                let e = eK(k3() + r.startTime);
                                let n = eK(r.duration);
                                let a = {
                                    name: Hd(r.target),
                                    op: `ui.interaction.${r.name}`,
                                    startTime: e,
                                    attributes: {
                                        [JD]: "auto.ui.browser.metrics"
                                    }
                                };
                                let o = xE(r.target);
                                if (o) {
                                    a.attributes["ui.component_name"] = o;
                                }
                                eq(t, e, e + n, a);
                            }
                        }
                    }
                });
            }
            if (detectRedirects && jf_document) {
                let e = ()=>{
                    r = zf();
                };
                addEventListener("click", e, {
                    capture: true
                });
                addEventListener("keydown", e, {
                    capture: true,
                    passive: true
                });
            }
            function E() {
                let t = client[tj];
                if (t && !et_1(t).timestamp) {
                    if (T_3) {
                        Yz.log(`[Tracing] Finishing current active span with op: ${et_1(t).op}`);
                    }
                    t.setAttribute(fs, "cancelled");
                    t.end();
                }
            }
            client.on("startNavigationSpan", (t, n)=>{
                if (KU() !== client) {
                    return;
                }
                if (n?.isRedirect) {
                    if (T_3) {
                        Yz.warn("[Tracing] Detected redirect, navigation span will not be the root span, but a child span.");
                    }
                    ef(client, {
                        op: "navigation.redirect",
                        ...t
                    }, false);
                    return;
                }
                r = undefined;
                E();
                rm().setPropagationContext({
                    traceId: b.e(),
                    sampleRand: Math.random(),
                    propagationSpanId: f_1() ? undefined : b.Z()
                });
                let a = o5();
                a.setPropagationContext({
                    traceId: b.e(),
                    sampleRand: Math.random(),
                    propagationSpanId: f_1() ? undefined : b.Z()
                });
                a.setSDKProcessingMetadata({
                    normalizedRequest: undefined
                });
                ef(client, {
                    op: "navigation",
                    ...t,
                    parentSpan: null,
                    forceTransaction: true
                });
            });
            client.on("startPageLoadSpan", (t, r = {})=>{
                if (KU() !== client) {
                    return;
                }
                E();
                let n = r.sentryTrace || tO("sentry-trace") || tT("sentry-trace");
                let a = r.baggage || tO("baggage") || tT("baggage");
                let o = kM(n, a);
                let i = o5();
                i.setPropagationContext(o);
                if (!f_1()) {
                    i.getPropagationContext().propagationSpanId = b.Z();
                }
                i.setSDKProcessingMetadata({
                    normalizedRequest: AP()
                });
                ef(client, {
                    op: "pageload",
                    ...t
                });
            });
            client.on("endPageloadSpan", ()=>{
                if (enableReportPageLoaded && n) {
                    n.setAttribute(fs, "reportPageLoaded");
                    n.end();
                }
            });
        },
        afterAllSetup (e) {
            let t;
            let idleTimeout_1;
            let finalTimeout_1;
            let childSpanTimeout_1;
            let l;
            let u;
            if (ec) {
                return;
            }
            let f = $N();
            if (linkPreviousTrace !== "off") {
                ((e, { linkPreviousTrace, consistentTraceSampling })=>{
                    let n = linkPreviousTrace === "session-storage";
                    let a = n ? (()=>{
                        try {
                            let e = jf.sessionStorage?.getItem(ta);
                            return JSON.parse(e);
                        } catch  {
                            return;
                        }
                    })() : undefined;
                    e.on("spanStart", (e)=>{
                        if (zU(e) !== e) {
                            return;
                        }
                        let t = o5().getPropagationContext();
                        a = ((e, t, r)=>{
                            let n = et_1(t);
                            let a = {
                                spanContext: t.spanContext(),
                                startTimestamp: n.start_timestamp,
                                sampleRate: (()=>{
                                    try {
                                        return Number(r.dsc?.sample_rate) ?? Number(n.data?.[sy]);
                                    } catch  {
                                        return 0;
                                    }
                                })(),
                                sampleRand: r.sampleRand
                            };
                            if (!e) {
                                return a;
                            }
                            let e_spanContext = e.spanContext;
                            if (e_spanContext.traceId === n.trace_id) {
                                return e;
                            }
                            if (Date.now() / 1000 - e.startTimestamp <= 3600) {
                                if (T_3) {
                                    Yz.log(`Adding previous_trace \`${JSON.stringify(e_spanContext)}\` link to span \`${JSON.stringify({
                                        op: n.op,
                                        ...t.spanContext()
                                    })}\``);
                                }
                                t.addLink({
                                    context: e_spanContext,
                                    attributes: {
                                        [Lc]: "previous_trace"
                                    }
                                });
                                t.setAttribute("sentry.previous_trace", `${e_spanContext.traceId}-${e_spanContext.spanId}-${+!!to(e_spanContext)}`);
                            }
                            return a;
                        })(a, e, t);
                        if (n) {
                            ((e)=>{
                                try {
                                    jf.sessionStorage.setItem(ta, JSON.stringify(e));
                                } catch (error) {
                                    if (T_3) {
                                        Yz.warn("Could not store previous trace in sessionStorage", error);
                                    }
                                }
                            })(a);
                        }
                    });
                    let o = true;
                    if (consistentTraceSampling) {
                        e.on("beforeSampling", (e)=>{
                            if (!a) {
                                return;
                            }
                            let t = o5();
                            let r = t.getPropagationContext();
                            if (o && r.parentSpanId) {
                                o = false;
                                return;
                            }
                            t.setPropagationContext({
                                ...r,
                                dsc: {
                                    ...r.dsc,
                                    sample_rate: String(a.sampleRate),
                                    sampled: String(to(a.spanContext))
                                },
                                sampleRand: a.sampleRand
                            });
                            e.parentSampled = to(a.spanContext);
                            e.parentSampleRate = a.sampleRate;
                            e.spanAttributes = {
                                ...e.spanAttributes,
                                [Ef]: a.sampleRate
                            };
                        });
                    }
                })(e, {
                    linkPreviousTrace,
                    consistentTraceSampling
                });
            }
            if (jf.location) {
                if (instrumentPageLoad) {
                    let t = k3();
                    Sx(e, {
                        name: jf.location.pathname,
                        startTime: t ? t / 1000 : undefined,
                        attributes: {
                            [i_]: "url",
                            [JD]: "auto.pageload.browser"
                        }
                    });
                }
                if (instrumentNavigation) {
                    _(({ to, from })=>{
                        if (from === undefined && f?.indexOf(to) !== -1) {
                            f = undefined;
                            return;
                        }
                        f = undefined;
                        let a = kg(to);
                        let o = e[tj];
                        let isRedirect = o && detectRedirects && ((e, t)=>{
                            let r = et_1(e);
                            let n = lu();
                            return !(n - r.start_timestamp > 1.5) && (!t || !(n - t <= 1.5));
                        })(o, r);
                        Nt(e, {
                            name: a?.pathname || jf.location.pathname,
                            attributes: {
                                [i_]: "url",
                                [JD]: "auto.navigation.browser"
                            }
                        }, {
                            url: to,
                            isRedirect
                        });
                    });
                }
            }
            if (markBackgroundSpan) {
                if (jf.document) {
                    jf.document.addEventListener("visibilitychange", ()=>{
                        let e = Bk();
                        if (!e) {
                            return;
                        }
                        let t = zU(e);
                        if (jf.document.hidden && t) {
                            let e = "cancelled";
                            let { op, status } = et_1(t);
                            if (T_3) {
                                Yz.log(`[Tracing] Transaction: ${e} -> since tab moved to the background, op: ${op}`);
                            }
                            if (!status) {
                                t.setStatus({
                                    code: TJ,
                                    message: e
                                });
                            }
                            t.setAttribute("sentry.cancellation_reason", "document.hidden");
                            t.end();
                        }
                    });
                } else if (T_3) {
                    Yz.warn("[Tracing] Could not set up background tab detection due to lack of global document");
                }
            }
            if (enableInteractions) {
                t = e;
                idleTimeout_1 = idleTimeout;
                finalTimeout_1 = finalTimeout;
                childSpanTimeout_1 = childSpanTimeout;
                l = a;
                if (jf.document) {
                    addEventListener("click", ()=>{
                        let e = "ui.action.click";
                        let r = ((e)=>e[tj])(t);
                        if (r && [
                            "navigation",
                            "pageload"
                        ].includes(et_1(r).op)) {
                            if (T_3) {
                                Yz.warn(`[Tracing] Did not create ${e} span because a pageload or navigation span is in progress.`);
                            }
                            return;
                        }
                        if (u) {
                            u.setAttribute(fs, "interactionInterrupted");
                            u.end();
                            u = undefined;
                        }
                        if (!l.name) {
                            if (T_3) {
                                Yz.warn(`[Tracing] Did not create ${e} transaction because _latestRouteName is missing.`);
                            }
                            return;
                        }
                        u = H({
                            name: l.name,
                            op: e,
                            attributes: {
                                [i_]: l.source || "url"
                            }
                        }, {
                            idleTimeout: idleTimeout_1,
                            finalTimeout: finalTimeout_1,
                            childSpanTimeout: childSpanTimeout_1
                        });
                    }, {
                        capture: true
                    });
                }
            }
            if (enableInp) {
                (()=>{
                    let e = Object.keys(e8);
                    function t(e) {
                        let e_target = e.target;
                        if (!e_target) {
                            return;
                        }
                        let r = Hd(e_target);
                        let n = Math.round(e.timeStamp);
                        e7.set(n, r);
                        if (e7.size > 50) {
                            let e = e7.keys().next().value;
                            if (e !== undefined) {
                                e7.delete(e);
                            }
                        }
                    }
                    if (typeof window !== "undefined" && (!(!Z_1() && Object.prototype.toString.call(e4 !== undefined ? e4 : 0) === "[object process]") || (()=>{
                        let O_1_process = O_1.process;
                        return O_1_process?.type === "renderer";
                    })())) {
                        e.forEach((e)=>{
                            j_1.addEventListener(e, t, {
                                capture: true,
                                passive: true
                            });
                        });
                    }
                    let r = ({ entries })=>{
                        let t = Bk();
                        let r = t && zU(t);
                        entries.forEach((e)=>{
                            if (!("duration" in e)) {
                                return;
                            }
                            let e_interactionId = e.interactionId;
                            if (e_interactionId == null || e6.has(e_interactionId)) {
                                return;
                            }
                            let elementName = e.target ? Hd(e.target) : ((e)=>{
                                let t = Math.round(e.startTime);
                                let r = e7.get(t);
                                if (!r) {
                                    for(let e = -5; e <= 5; e++){
                                        let n = e7.get(t + e);
                                        if (n) {
                                            r = n;
                                            break;
                                        }
                                    }
                                }
                                return r || "<unknown>";
                            })(e);
                            if (e5.length > 10) {
                                let e = e5.shift();
                                e6.delete(e);
                            }
                            e5.push(e_interactionId);
                            e6.set(e_interactionId, {
                                span: r,
                                elementName
                            });
                        });
                    };
                    eI("event", r);
                    eI("first-input", r);
                })();
            }
            ((e, t)=>{
                let { traceFetch, traceXHR, trackFetchStreamPerformance, shouldCreateSpanForRequest, enableHTTPTimings, tracePropagationTargets, onRequestSpanStart, onRequestSpanEnd } = {
                    ...tg,
                    ...t
                };
                let f = typeof shouldCreateSpanForRequest === "function" ? shouldCreateSpanForRequest : (e)=>true;
                let _ = (e)=>((e, tracePropagationTargets_1)=>{
                        let r = $N();
                        if (r) {
                            let n;
                            let a;
                            try {
                                n = new URL(e, r);
                                a = new URL(r).origin;
                            } catch  {
                                return false;
                            }
                            let o = n.origin === a;
                            if (tracePropagationTargets_1) {
                                return Xr(n.toString(), tracePropagationTargets_1) || o && Xr(n.pathname, tracePropagationTargets_1);
                            }
                            return o;
                        }
                        {
                            let r = !!e.match(/^\/(?!\/)/);
                            if (tracePropagationTargets_1) {
                                return Xr(e, tracePropagationTargets_1);
                            }
                            return r;
                        }
                    })(e, tracePropagationTargets);
                let m = {};
                let propagateTraceparent = e.getOptions().propagateTraceparent;
                if (traceFetch) {
                    e.addEventProcessor((e)=>{
                        if (e.type === "transaction" && e.spans) {
                            e.spans.forEach((e)=>{
                                if (e.op === "http.client") {
                                    let t = tm.get(e.span_id);
                                    if (t) {
                                        e.timestamp = t / 1000;
                                        tm.delete(e.span_id);
                                    }
                                }
                            });
                        }
                        return e;
                    });
                    if (trackFetchStreamPerformance) {
                        B$((e)=>{
                            if (e.response) {
                                let t = t_.get(e.response);
                                if (t && e.endTimestamp) {
                                    tm.set(t, e.endTimestamp);
                                }
                            }
                        });
                    }
                    ur((t)=>{
                        let r = ((e, t, r, n, spanOrigin_1)=>{
                            if (!e.fetchData) {
                                return;
                            }
                            let { method, url } = e.fetchData;
                            let s = f_1() && t(url);
                            if (e.endTimestamp) {
                                let t = e.fetchData.__span;
                                if (!t) {
                                    return;
                                }
                                let r = n[t];
                                if (r) {
                                    if (s) {
                                        ((e, t)=>{
                                            if (t.response) {
                                                N8(e, t.response.status);
                                                let r = t.response?.headers?.get("content-length");
                                                if (r) {
                                                    let t = parseInt(r);
                                                    if (t > 0) {
                                                        e.setAttribute("http.response_content_length", t);
                                                    }
                                                }
                                            } else {
                                                if (t.error) {
                                                    e.setStatus({
                                                        code: TJ,
                                                        message: "internal_error"
                                                    });
                                                }
                                            }
                                            e.end();
                                        })(r, e);
                                        ((e, t, spanOrigin_1_1)=>{
                                            let n = typeof spanOrigin_1_1 === "object" && spanOrigin_1_1 !== null ? spanOrigin_1_1.onRequestSpanEnd : undefined;
                                            n?.(e, {
                                                headers: t.response?.headers,
                                                error: t.error
                                            });
                                        })(r, e, spanOrigin_1);
                                    }
                                    delete n[t];
                                }
                                return;
                            }
                            let { spanOrigin = "auto.http.browser", propagateTraceparent = false } = typeof spanOrigin_1 === "object" ? spanOrigin_1 : {
                                spanOrigin: spanOrigin_1
                            };
                            let f = KU();
                            let d = !!Bk();
                            let p = s && d ? N(((url_1, method_1, spanOrigin_1)=>{
                                if (url_1.startsWith("data:")) {
                                    let n = zm(url_1);
                                    return {
                                        name: `${method_1} ${n}`,
                                        attributes: tf(url_1, undefined, method_1, spanOrigin_1)
                                    };
                                }
                                let n = kg(url_1);
                                let a = n ? CH(n) : url_1;
                                return {
                                    name: `${method_1} ${a}`,
                                    attributes: tf(url_1, n, method_1, spanOrigin_1)
                                };
                            })(url, method, spanOrigin)) : new E;
                            if (s && !d) {
                                f?.recordDroppedEvent("no_parent_span", "span");
                            }
                            e.fetchData.__span = p.spanContext().spanId;
                            n[p.spanContext().spanId] = p;
                            if (r(e.fetchData.url)) {
                                let t = e.args[0];
                                let r = {
                                    ...e.args[1] || {}
                                };
                                let n = ((e, t, r, propagateTraceparent_1)=>{
                                    let a;
                                    let o;
                                    let i = tu({
                                        span: r,
                                        propagateTraceparent: propagateTraceparent_1
                                    });
                                    let s = i["sentry-trace"];
                                    let i_baggage = i.baggage;
                                    let i_traceparent = i.traceparent;
                                    if (!s) {
                                        return;
                                    }
                                    let c = t.headers || (ks(e) ? e.headers : undefined);
                                    if (!c) {
                                        return {
                                            ...i
                                        };
                                    }
                                    a = c;
                                    if (typeof Headers !== "undefined" && tH(a, Headers)) {
                                        let e = new Headers(c);
                                        if (!e.get("sentry-trace")) {
                                            e.set("sentry-trace", s);
                                        }
                                        if (propagateTraceparent_1 && i_traceparent && !e.get("traceparent")) {
                                            e.set("traceparent", i_traceparent);
                                        }
                                        if (i_baggage) {
                                            let t = e.get("baggage");
                                            if (t) {
                                                if (!tc(t)) {
                                                    e.set("baggage", `${t},${i_baggage}`);
                                                }
                                            } else {
                                                e.set("baggage", i_baggage);
                                            }
                                        }
                                        return e;
                                    }
                                    if (Array.isArray(o = c) && o.every((e)=>Array.isArray(e) && e.length === 2 && typeof e[0] === "string")) {
                                        let e = [
                                            ...c
                                        ];
                                        if (!e.find((e)=>e[0] === "sentry-trace")) {
                                            e.push([
                                                "sentry-trace",
                                                s
                                            ]);
                                        }
                                        if (propagateTraceparent_1 && i_traceparent && !e.find((e)=>e[0] === "traceparent")) {
                                            e.push([
                                                "traceparent",
                                                i_traceparent
                                            ]);
                                        }
                                        let t = c.find((e)=>e[0] === "baggage" && typeof e[1] === "string" && tc(e[1]));
                                        if (i_baggage && !t) {
                                            e.push([
                                                "baggage",
                                                i_baggage
                                            ]);
                                        }
                                        return e;
                                    }
                                    {
                                        let e = "sentry-trace" in c ? c["sentry-trace"] : undefined;
                                        let t = "traceparent" in c ? c.traceparent : undefined;
                                        let r = "baggage" in c ? c.baggage : undefined;
                                        let a = r ? Array.isArray(r) ? [
                                            ...r
                                        ] : [
                                            r
                                        ] : [];
                                        let o = r && (Array.isArray(r) ? r.find((e)=>tc(e)) : tc(r));
                                        if (i_baggage && !o) {
                                            a.push(i_baggage);
                                        }
                                        let i = {
                                            ...c,
                                            "sentry-trace": e ?? s,
                                            baggage: a.length > 0 ? a.join(",") : undefined
                                        };
                                        if (propagateTraceparent_1 && i_traceparent && !t) {
                                            i.traceparent = i_traceparent;
                                        }
                                        return i;
                                    }
                                })(t, r, f_1() && d ? p : undefined, propagateTraceparent);
                                if (n) {
                                    e.args[1] = r;
                                    r.headers = n;
                                }
                            }
                            if (f) {
                                let t = {
                                    input: e.args,
                                    response: e.response,
                                    startTimestamp: e.startTimestamp,
                                    endTimestamp: e.endTimestamp
                                };
                                f.emit("beforeOutgoingRequestSpan", p, t);
                            }
                            return p;
                        })(t, f, _, m, {
                            propagateTraceparent,
                            onRequestSpanEnd
                        });
                        if (t.response && t.fetchData.__span) {
                            t_.set(t.response, t.fetchData.__span);
                        }
                        if (r) {
                            let n = tp(t.fetchData.url);
                            let a = n ? Dl(n).host : undefined;
                            r.setAttributes({
                                "http.url": n ? zm(n) : undefined,
                                "server.address": a
                            });
                            if (enableHTTPTimings) {
                                ty(r, e);
                            }
                            onRequestSpanStart?.(r, {
                                headers: t.headers
                            });
                        }
                    });
                }
                if (traceXHR) {
                    Mn((t)=>{
                        let r = ((e, t, r, n, propagateTraceparent_2, onRequestSpanEnd_1)=>{
                            let e_xhr = e.xhr;
                            let s = e_xhr?.[Er];
                            if (!e_xhr || e_xhr.__sentry_own_request__ || !s) {
                                return;
                            }
                            let { url, method } = s;
                            let f = f_1() && t(url);
                            if (e.endTimestamp) {
                                let t = e_xhr.__sentry_xhr_span_id__;
                                if (!t) {
                                    return;
                                }
                                let r = n[t];
                                if (r) {
                                    if (f && s.status_code !== undefined) {
                                        N8(r, s.status_code);
                                        r.end();
                                        onRequestSpanEnd_1?.(r, {
                                            headers: th(((e_xhr_1)=>{
                                                let t;
                                                try {
                                                    t = e_xhr_1.getAllResponseHeaders();
                                                } catch (error) {
                                                    if (T_2) {
                                                        Yz.error(error, "Failed to get xhr response headers", e_xhr_1);
                                                    }
                                                    return {};
                                                }
                                                if (t) {
                                                    return t.split("\r\n").reduce((acc, item)=>{
                                                        let [r, n] = item.split(": ");
                                                        if (n) {
                                                            acc[r.toLowerCase()] = n;
                                                        }
                                                        return acc;
                                                    }, {});
                                                }
                                                return {};
                                            })(e_xhr)),
                                            error: e.error
                                        });
                                    }
                                    delete n[t];
                                }
                                return;
                            }
                            let _ = tp(url);
                            let m = _ ? Dl(_) : Dl(url);
                            let y = zm(f_2(url));
                            let v = KU();
                            let b = !!Bk();
                            let R = f && b ? N({
                                name: `${method} ${y}`,
                                attributes: {
                                    url: zm(url),
                                    type: "xhr",
                                    "http.method": method,
                                    "http.url": _ ? zm(_) : undefined,
                                    "server.address": m?.host,
                                    [JD]: "auto.http.browser",
                                    [uT]: "http.client",
                                    ...m?.search && {
                                        "http.query": m?.search
                                    },
                                    ...m?.hash && {
                                        "http.fragment": m?.hash
                                    }
                                }
                            }) : new E;
                            if (f && !b) {
                                v?.recordDroppedEvent("no_parent_span", "span");
                            }
                            e_xhr.__sentry_xhr_span_id__ = R.spanContext().spanId;
                            n[e_xhr.__sentry_xhr_span_id__] = R;
                            if (r(url)) {
                                ((e_xhr_1, t, propagateTraceparent_1)=>{
                                    let { "sentry-trace": sentry_trace, baggage, traceparent } = tu({
                                        span: t,
                                        propagateTraceparent: propagateTraceparent_1
                                    });
                                    if (sentry_trace) {
                                        ((e_xhr_1_1, sentry_trace_1, baggage_1, traceparent_1)=>{
                                            let a = e_xhr_1_1.__sentry_xhr_v3__?.request_headers;
                                            if (!a?.["sentry-trace"] && e_xhr_1_1.setRequestHeader) {
                                                try {
                                                    e_xhr_1_1.setRequestHeader("sentry-trace", sentry_trace_1);
                                                    if (traceparent_1 && !a?.traceparent) {
                                                        e_xhr_1_1.setRequestHeader("traceparent", traceparent_1);
                                                    }
                                                    if (baggage_1) {
                                                        let t = a?.baggage;
                                                        if (!(t && t.split(",").some((e)=>e.trim().startsWith("sentry-")))) {
                                                            e_xhr_1_1.setRequestHeader("baggage", baggage_1);
                                                        }
                                                    }
                                                } catch  {}
                                            }
                                        })(e_xhr_1, sentry_trace, baggage, traceparent);
                                    }
                                })(e_xhr, f_1() && b ? R : undefined, propagateTraceparent_2);
                            }
                            if (v) {
                                v.emit("beforeOutgoingRequestSpan", R, e);
                            }
                            return R;
                        })(t, f, _, m, propagateTraceparent, onRequestSpanEnd);
                        if (r) {
                            if (enableHTTPTimings) {
                                ty(r, e);
                            }
                            onRequestSpanStart?.(r, {
                                headers: th(t.xhr.__sentry_xhr_v3__?.request_headers)
                            });
                        }
                    });
                }
            })(e, {
                traceFetch,
                traceXHR,
                trackFetchStreamPerformance,
                tracePropagationTargets: e.getOptions().tracePropagationTargets,
                shouldCreateSpanForRequest,
                enableHTTPTimings,
                onRequestSpanStart,
                onRequestSpanEnd
            });
        }
    };
};
export function Sx(e, t, r) {
    e.emit("startPageLoadSpan", t, r);
    o5().setTransactionName(t.name);
    let n = e[tj];
    if (n) {
        e.emit("afterStartPageLoadSpan", n);
    }
    return n;
}
export function Nt(e, t, r) {
    let { url, isRedirect } = r || {};
    e.emit("beforeStartNavigationSpan", t, {
        isRedirect
    });
    e.emit("startNavigationSpan", t, {
        isRedirect
    });
    let o = o5();
    o.setTransactionName(t.name);
    if (url && !isRedirect) {
        o.setSDKProcessingMetadata({
            normalizedRequest: {
                ...AP(),
                url
            }
        });
    }
    return e[tj];
}
function tO(e) {
    let jf_document = jf.document;
    let r = jf_document?.querySelector(`meta[name=${e}]`);
    return r?.getAttribute("content") || undefined;
}
function tT(e) {
    let t = jf.performance?.getEntriesByType?.("navigation")[0];
    let r = t?.serverTiming?.find((t)=>t.name === e);
    return r?.description;
}
let tj = "_sentry_idleSpan";
