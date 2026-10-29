import { m6 } from "./module-2257.js";
import { k1 } from "./module-89135.js";
import o from "./module-76871.js";
import { et, kX, zU } from "./module-51290.js";
export function e2(e, t) {
    let r;
    let n;
    let o;
    let s;
    let { fingerprint, span, breadcrumbs, sdkProcessingMetadata } = t;
    ((e, { extra, tags, user, contexts, level, transactionName })=>{
        if (Object.keys(extra).length) {
            e.extra = {
                ...extra,
                ...e.extra
            };
        }
        if (Object.keys(tags).length) {
            e.tags = {
                ...tags,
                ...e.tags
            };
        }
        if (Object.keys(user).length) {
            e.user = {
                ...user,
                ...e.user
            };
        }
        if (Object.keys(contexts).length) {
            e.contexts = {
                ...contexts,
                ...e.contexts
            };
        }
        if (level) {
            e.level = level;
        }
        if (transactionName && e.type !== "transaction") {
            e.transaction = transactionName;
        }
    })(e, t);
    if (span) {
        ((e, span_1)=>{
            e.contexts = {
                trace: kX(span_1),
                ...e.contexts
            };
            e.sdkProcessingMetadata = {
                dynamicSamplingContext: k1(span_1),
                ...e.sdkProcessingMetadata
            };
            let r = zU(span_1);
            let description = et(r).description;
            if (description && !e.transaction && e.type === "transaction") {
                e.transaction = description;
            }
        })(e, span);
    }
    r = e;
    n = fingerprint;
    r.fingerprint = r.fingerprint ? Array.isArray(r.fingerprint) ? r.fingerprint : [
        r.fingerprint
    ] : [];
    if (n) {
        r.fingerprint = r.fingerprint.concat(n);
    }
    if (!r.fingerprint.length) {
        delete r.fingerprint;
    }
    ((e, breadcrumbs_1)=>{
        let r = [
            ...e.breadcrumbs || [],
            ...breadcrumbs_1
        ];
        e.breadcrumbs = r.length ? r : undefined;
    })(e, breadcrumbs);
    o = e;
    s = sdkProcessingMetadata;
    o.sdkProcessingMetadata = {
        ...o.sdkProcessingMetadata,
        ...s
    };
}
function l(e, { extra, tags, attributes, user, contexts, level, sdkProcessingMetadata, breadcrumbs, fingerprint, eventProcessors, attachments, propagationContext, transactionName, span }) {
    u(e, "extra", extra);
    u(e, "tags", tags);
    u(e, "attributes", attributes);
    u(e, "user", user);
    u(e, "contexts", contexts);
    e.sdkProcessingMetadata = o.h(e.sdkProcessingMetadata, sdkProcessingMetadata, 2);
    if (level) {
        e.level = level;
    }
    if (transactionName) {
        e.transactionName = transactionName;
    }
    if (span) {
        e.span = span;
    }
    if (breadcrumbs.length) {
        e.breadcrumbs = [
            ...e.breadcrumbs,
            ...breadcrumbs
        ];
    }
    if (fingerprint.length) {
        e.fingerprint = [
            ...e.fingerprint,
            ...fingerprint
        ];
    }
    if (eventProcessors.length) {
        e.eventProcessors = [
            ...e.eventProcessors,
            ...eventProcessors
        ];
    }
    if (attachments.length) {
        e.attachments = [
            ...e.attachments,
            ...attachments
        ];
    }
    e.propagationContext = {
        ...e.propagationContext,
        ...propagationContext
    };
}
function u(e, t, r) {
    e[t] = o.h(e[t], r, 1);
}
export function Om(e, t) {
    let r = m6().getScopeData();
    if (e) {
        l(r, e.getScopeData());
    }
    if (t) {
        l(r, t.getScopeData());
    }
    return r;
}
