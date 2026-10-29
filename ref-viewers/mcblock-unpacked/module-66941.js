import { T } from "./module-61571.js";
import { qO } from "./module-24617.js";
import { Yz } from "./module-43275.js";
import { Qd } from "./module-16649.js";
import s from "./module-76871.js";
import { eJ } from "./module-28385.js";
import { e } from "./module-17588.js";
import { hY } from "./module-78714.js";
import { f, r } from "./module-43316.js";
import { xv } from "./module-35868.js";
import { lu } from "./module-87624.js";
export class H {
    constructor(){
        this._notifyingListeners = false;
        this._scopeListeners = [];
        this._eventProcessors = [];
        this._breadcrumbs = [];
        this._attachments = [];
        this._user = {};
        this._tags = {};
        this._attributes = {};
        this._extra = {};
        this._contexts = {};
        this._sdkProcessingMetadata = {};
        this._propagationContext = {
            traceId: e(),
            sampleRand: hY()
        };
    }
    clone() {
        let e = new H;
        e._breadcrumbs = [
            ...this._breadcrumbs
        ];
        e._tags = {
            ...this._tags
        };
        e._attributes = {
            ...this._attributes
        };
        e._extra = {
            ...this._extra
        };
        e._contexts = {
            ...this._contexts
        };
        if (this._contexts.flags) {
            e._contexts.flags = {
                values: [
                    ...this._contexts.flags.values
                ]
            };
        }
        e._user = this._user;
        e._level = this._level;
        e._session = this._session;
        e._transactionName = this._transactionName;
        e._fingerprint = this._fingerprint;
        e._eventProcessors = [
            ...this._eventProcessors
        ];
        e._attachments = [
            ...this._attachments
        ];
        e._sdkProcessingMetadata = {
            ...this._sdkProcessingMetadata
        };
        e._propagationContext = {
            ...this._propagationContext
        };
        e._client = this._client;
        e._lastEventId = this._lastEventId;
        e._conversationId = this._conversationId;
        r(e, f(this));
        return e;
    }
    setClient(e) {
        this._client = e;
    }
    setLastEventId(e) {
        this._lastEventId = e;
    }
    getClient() {
        return this._client;
    }
    lastEventId() {
        return this._lastEventId;
    }
    addScopeListener(e) {
        this._scopeListeners.push(e);
    }
    addEventProcessor(e) {
        this._eventProcessors.push(e);
        return this;
    }
    setUser(user) {
        this._user = user || {
            email: undefined,
            id: undefined,
            ip_address: undefined,
            username: undefined
        };
        if (this._session) {
            qO(this._session, {
                user
            });
        }
        this._notifyScopeListeners();
        return this;
    }
    getUser() {
        return this._user;
    }
    setConversationId(e) {
        this._conversationId = e || undefined;
        this._notifyScopeListeners();
        return this;
    }
    setTags(e) {
        this._tags = {
            ...this._tags,
            ...e
        };
        this._notifyScopeListeners();
        return this;
    }
    setTag(e, t) {
        return this.setTags({
            [e]: t
        });
    }
    setAttributes(e) {
        this._attributes = {
            ...this._attributes,
            ...e
        };
        this._notifyScopeListeners();
        return this;
    }
    setAttribute(e, t) {
        return this.setAttributes({
            [e]: t
        });
    }
    removeAttribute(e) {
        if (e in this._attributes) {
            delete this._attributes[e];
            this._notifyScopeListeners();
        }
        return this;
    }
    setExtras(e) {
        this._extra = {
            ...this._extra,
            ...e
        };
        this._notifyScopeListeners();
        return this;
    }
    setExtra(e, t) {
        this._extra = {
            ...this._extra,
            [e]: t
        };
        this._notifyScopeListeners();
        return this;
    }
    setFingerprint(e) {
        this._fingerprint = e;
        this._notifyScopeListeners();
        return this;
    }
    setLevel(e) {
        this._level = e;
        this._notifyScopeListeners();
        return this;
    }
    setTransactionName(e) {
        this._transactionName = e;
        this._notifyScopeListeners();
        return this;
    }
    setContext(e, t) {
        if (t === null) {
            delete this._contexts[e];
        } else {
            this._contexts[e] = t;
        }
        this._notifyScopeListeners();
        return this;
    }
    setSession(e) {
        if (e) {
            this._session = e;
        } else {
            delete this._session;
        }
        this._notifyScopeListeners();
        return this;
    }
    getSession() {
        return this._session;
    }
    update(e) {
        if (!e) {
            return this;
        }
        let t = typeof e === "function" ? e(this) : e;
        let { tags, attributes, extra, user, contexts, level, fingerprint = [], propagationContext, conversationId } = (t instanceof H ? t.getScopeData() : Qd(t) ? e : undefined) || {};
        this._tags = {
            ...this._tags,
            ...tags
        };
        this._attributes = {
            ...this._attributes,
            ...attributes
        };
        this._extra = {
            ...this._extra,
            ...extra
        };
        this._contexts = {
            ...this._contexts,
            ...contexts
        };
        if (user && Object.keys(user).length) {
            this._user = user;
        }
        if (level) {
            this._level = level;
        }
        if (fingerprint.length) {
            this._fingerprint = fingerprint;
        }
        if (propagationContext) {
            this._propagationContext = propagationContext;
        }
        if (conversationId) {
            this._conversationId = conversationId;
        }
        return this;
    }
    clear() {
        this._breadcrumbs = [];
        this._tags = {};
        this._attributes = {};
        this._extra = {};
        this._user = {};
        this._contexts = {};
        this._level = undefined;
        this._transactionName = undefined;
        this._fingerprint = undefined;
        this._session = undefined;
        this._conversationId = undefined;
        r(this, undefined);
        this._attachments = [];
        this.setPropagationContext({
            traceId: e(),
            sampleRand: hY()
        });
        this._notifyScopeListeners();
        return this;
    }
    addBreadcrumb(e, t) {
        let r = typeof t === "number" ? t : 100;
        if (r <= 0) {
            return this;
        }
        let n = {
            timestamp: lu(),
            ...e,
            message: e.message ? xv(e.message, 2048) : e.message
        };
        this._breadcrumbs.push(n);
        if (this._breadcrumbs.length > r) {
            this._breadcrumbs = this._breadcrumbs.slice(-r);
            this._client?.recordDroppedEvent("buffer_overflow", "log_item");
        }
        this._notifyScopeListeners();
        return this;
    }
    getLastBreadcrumb() {
        return this._breadcrumbs[this._breadcrumbs.length - 1];
    }
    clearBreadcrumbs() {
        this._breadcrumbs = [];
        this._notifyScopeListeners();
        return this;
    }
    addAttachment(e) {
        this._attachments.push(e);
        return this;
    }
    clearAttachments() {
        this._attachments = [];
        return this;
    }
    getScopeData() {
        return {
            breadcrumbs: this._breadcrumbs,
            attachments: this._attachments,
            contexts: this._contexts,
            tags: this._tags,
            attributes: this._attributes,
            extra: this._extra,
            user: this._user,
            level: this._level,
            fingerprint: this._fingerprint || [],
            eventProcessors: this._eventProcessors,
            propagationContext: this._propagationContext,
            sdkProcessingMetadata: this._sdkProcessingMetadata,
            transactionName: this._transactionName,
            span: f(this),
            conversationId: this._conversationId
        };
    }
    setSDKProcessingMetadata(e) {
        this._sdkProcessingMetadata = s.h(this._sdkProcessingMetadata, e, 2);
        return this;
    }
    setPropagationContext(e) {
        this._propagationContext = e;
        return this;
    }
    getPropagationContext() {
        return this._propagationContext;
    }
    captureException(e, t) {
        let r = t?.event_id || eJ();
        if (!this._client) {
            if (T) {
                Yz.warn("No client configured on scope - will not capture exception!");
            }
            return r;
        }
        let a = Error("Sentry syntheticException");
        this._client.captureException(e, {
            originalException: e,
            syntheticException: a,
            ...t,
            event_id: r
        }, this);
        return r;
    }
    captureMessage(e, t, r) {
        let a = r?.event_id || eJ();
        if (!this._client) {
            if (T) {
                Yz.warn("No client configured on scope - will not capture message!");
            }
            return a;
        }
        let i = r?.syntheticException ?? Error(e);
        this._client.captureMessage(e, t, {
            originalException: e,
            syntheticException: i,
            ...r,
            event_id: a
        }, this);
        return a;
    }
    captureEvent(e, t) {
        let r = e.event_id || t?.event_id || eJ();
        if (this._client) {
            this._client.captureEvent(e, {
                ...t,
                event_id: r
            }, this);
        } else if (T) {
            Yz.warn("No client configured on scope - will not capture event!");
        }
        return r;
    }
    _notifyScopeListeners() {
        if (!this._notifyingListeners) {
            this._notifyingListeners = true;
            this._scopeListeners.forEach((e)=>{
                e(this);
            });
            this._notifyingListeners = false;
        }
    }
}
