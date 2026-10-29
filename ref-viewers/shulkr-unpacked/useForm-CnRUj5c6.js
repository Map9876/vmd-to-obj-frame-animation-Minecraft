import { ne } from "./useForm-CnRUj5c6/chunk_te.js";
import { ce } from "./useForm-CnRUj5c6/chunk_ae.js";
import { de } from "./useForm-CnRUj5c6/chunk_de.js";
import { U, W, he } from "./useForm-CnRUj5c6/chunk_pe.js";
import { n, s as s_1, t } from "./jsx-runtime-Db0DjQYK.js";
import { n as n_2 } from "./useStore-DX_rDZVw.js";
const i = ((e)=>{
    e[e.None = 0] = `None`;
    e[e.Mutable = 1] = `Mutable`;
    e[e.Watching = 2] = `Watching`;
    e[e.RecursedCheck = 4] = `RecursedCheck`;
    e[e.Recursed = 8] = `Recursed`;
    e[e.Dirty = 16] = `Dirty`;
    e[e.Pending = 32] = `Pending`;
    return e;
})({});
function a({ update, notify, unwatched }) {
    return {
        link: link_1,
        unlink: unlink_1,
        propagate: propagate_1,
        checkDirty: checkDirty_1,
        shallowPropagate: shallowPropagate_1
    };
    function link_1(dep, sub, version) {
        let t_depsTail = sub.depsTail;
        if (t_depsTail !== undefined && t_depsTail.dep === dep) {
            return;
        }
        let nextDep = t_depsTail === undefined ? sub.deps : t_depsTail.nextDep;
        if (nextDep !== undefined && nextDep.dep === dep) {
            nextDep.version = version;
            sub.depsTail = nextDep;
            return;
        }
        let e_subsTail = dep.subsTail;
        if (e_subsTail !== undefined && e_subsTail.version === version && e_subsTail.sub === sub) {
            return;
        }
        let o = sub.depsTail = dep.subsTail = {
            version,
            dep,
            sub,
            prevDep: t_depsTail,
            nextDep,
            prevSub: e_subsTail,
            nextSub: undefined
        };
        if (nextDep !== undefined) {
            nextDep.prevDep = o;
        }
        if (t_depsTail === undefined) {
            sub.deps = o;
        } else {
            t_depsTail.nextDep = o;
        }
        if (e_subsTail === undefined) {
            dep.subs = o;
        } else {
            e_subsTail.nextSub = o;
        }
    }
    function unlink_1(e, t = e.sub) {
        let e_dep = e.dep;
        let e_prevDep = e.prevDep;
        let e_nextDep = e.nextDep;
        let e_nextSub = e.nextSub;
        let e_prevSub = e.prevSub;
        if (e_nextDep === undefined) {
            t.depsTail = e_prevDep;
        } else {
            e_nextDep.prevDep = e_prevDep;
        }
        if (e_prevDep === undefined) {
            t.deps = e_nextDep;
        } else {
            e_prevDep.nextDep = e_nextDep;
        }
        if (e_nextSub === undefined) {
            e_dep.subsTail = e_prevSub;
        } else {
            e_nextSub.prevSub = e_prevSub;
        }
        if (e_prevSub === undefined) {
            if ((e_dep.subs = e_nextSub) === undefined) {
                unwatched(e_dep);
            }
        } else {
            e_prevSub.nextSub = e_nextSub;
        }
        return e_nextDep;
    }
    function propagate_1(e) {
        let e_nextSub = e.nextSub;
        let r;
        top: do {
            let a = e.sub;
            let o = a.flags;
            if (o & (i.RecursedCheck | i.Recursed | i.Dirty | i.Pending)) {
                if (o & (i.RecursedCheck | i.Recursed)) {
                    if (o & i.RecursedCheck) {
                        if (!(o & (i.Dirty | i.Pending)) && l(e, a)) {
                            a.flags = o | (i.Recursed | i.Pending);
                            o &= i.Mutable;
                        } else {
                            o = i.None;
                        }
                    } else {
                        a.flags = o & ~i.Recursed | i.Pending;
                    }
                } else {
                    o = i.None;
                }
            } else {
                a.flags = o | i.Pending;
            }
            if (o & i.Watching) {
                notify(a);
            }
            if (o & i.Mutable) {
                let t = a.subs;
                if (t !== undefined) {
                    let i = (e = t).nextSub;
                    if (i !== undefined) {
                        r = {
                            value: e_nextSub,
                            prev: r
                        };
                        e_nextSub = i;
                    }
                    continue;
                }
            }
            if ((e = e_nextSub) !== undefined) {
                e_nextSub = e.nextSub;
                continue;
            }
            while(r !== undefined){
                e = r.value;
                r = r.prev;
                if (e !== undefined) {
                    e_nextSub = e.nextSub;
                    continue top;
                }
            }
            break;
        }while (true)
    }
    function checkDirty_1(t, n) {
        let r;
        let a = 0;
        let o = false;
        top: do {
            let s = t.dep;
            let l = s.flags;
            if (n.flags & i.Dirty) {
                o = true;
            } else if ((l & (i.Mutable | i.Dirty)) === (i.Mutable | i.Dirty)) {
                if (update(s)) {
                    let e = s.subs;
                    if (e.nextSub !== undefined) {
                        shallowPropagate_1(e);
                    }
                    o = true;
                }
            } else if ((l & (i.Mutable | i.Pending)) === (i.Mutable | i.Pending)) {
                if (t.nextSub !== undefined || t.prevSub !== undefined) {
                    r = {
                        value: t,
                        prev: r
                    };
                }
                t = s.deps;
                n = s;
                ++a;
                continue;
            }
            if (!o) {
                let e = t.nextDep;
                if (e !== undefined) {
                    t = e;
                    continue;
                }
            }
            while(a--){
                let a = n.subs;
                let s = a.nextSub !== undefined;
                if (s) {
                    t = r.value;
                    r = r.prev;
                } else {
                    t = a;
                }
                if (o) {
                    if (update(n)) {
                        if (s) {
                            shallowPropagate_1(a);
                        }
                        n = t.sub;
                        continue;
                    }
                    o = false;
                } else {
                    n.flags &= ~i.Pending;
                }
                n = t.sub;
                let l = t.nextDep;
                if (l !== undefined) {
                    t = l;
                    continue top;
                }
            }
            return o;
        }while (true)
    }
    function shallowPropagate_1(e) {
        do {
            let n = e.sub;
            let r = n.flags;
            if ((r & (i.Pending | i.Dirty)) === i.Pending) {
                n.flags = r | i.Dirty;
                if ((r & (i.Watching | i.RecursedCheck)) === i.Watching) {
                    notify(n);
                }
            }
        }while ((e = e.nextSub) !== undefined)
    }
    function l(e, { depsTail }) {
        while(depsTail !== undefined){
            if (depsTail === e) {
                return true;
            }
            depsTail = depsTail.prevDep;
        }
        return false;
    }
}
function o(e, t, n) {
    let r = typeof e == `object`;
    let i = r ? e : undefined;
    return {
        next: (r ? e.next : e)?.bind(i),
        error: (r ? e.error : t)?.bind(i),
        complete: (r ? e.complete : n)?.bind(i)
    };
}
const s = [];
let c = 0;
var { link, unlink, propagate, checkDirty, shallowPropagate } = a({
    update (e) {
        return e._update();
    },
    notify (e) {
        s[h++] = e;
        e.flags &= ~i.Watching;
    },
    unwatched (e) {
        if (e.depsTail !== undefined) {
            e.depsTail = undefined;
            e.flags = i.Mutable | i.Dirty;
            y(e);
        }
    }
});
let m = 0;
var h = 0;
let g;
let _ = 0;
function v(e) {
    try {
        ++_;
        e();
    } finally{
        if (!--_) {
            b();
        }
    }
}
function y(e) {
    let e_depsTail = e.depsTail;
    let n = e_depsTail === undefined ? e.deps : e_depsTail.nextDep;
    while(n !== undefined){
        n = unlink(n, e);
    }
}
function b() {
    if (!(_ > 0)) {
        while(m < h){
            let e = s[m];
            s[m++] = undefined;
            e.notify();
        }
        m = 0;
        h = 0;
    }
}
function x(e, t) {
    let n = typeof e == `function`;
    let r = e;
    let a = {
        _snapshot: n ? undefined : e,
        subs: undefined,
        subsTail: undefined,
        deps: undefined,
        depsTail: undefined,
        flags: n ? i.None : i.Mutable,
        get () {
            if (g !== undefined) {
                link(a, g, c);
            }
            return a._snapshot;
        },
        subscribe (e) {
            let t = o(e);
            let n = {
                current: false
            };
            let r = S(()=>{
                a.get();
                if (n.current) {
                    t.next?.(a._snapshot);
                } else {
                    n.current = true;
                }
            });
            return {
                unsubscribe: ()=>{
                    r.stop();
                }
            };
        },
        _update (e) {
            let o = g;
            let s = t?.compare ?? Object.is;
            if (n) {
                g = a;
                ++c;
                a.depsTail = undefined;
            } else if (e === undefined) {
                return false;
            }
            if (n) {
                a.flags = i.Mutable | i.RecursedCheck;
            }
            try {
                let t = a._snapshot;
                let i = typeof e == `function` ? e(t) : e === undefined && n ? r(t) : e;
                if (t === undefined || !s(t, i)) {
                    a._snapshot = i;
                    return true;
                }
                return false;
            } finally{
                g = o;
                if (n) {
                    a.flags &= ~i.RecursedCheck;
                }
                y(a);
            }
        }
    };
    if (n) {
        a.flags = i.Mutable | i.Dirty;
        a.get = function() {
            let a_flags = a.flags;
            if (a_flags & i.Dirty || a_flags & i.Pending && checkDirty(a.deps, a)) {
                if (a._update()) {
                    let e = a.subs;
                    if (e !== undefined) {
                        shallowPropagate(e);
                    }
                }
            } else {
                if (a_flags & i.Pending) {
                    a.flags = a_flags & ~i.Pending;
                }
            }
            if (g !== undefined) {
                link(a, g, c);
            }
            return a._snapshot;
        };
    } else {
        a.set = function(e) {
            if (a._update(e)) {
                let e = a.subs;
                if (e !== undefined) {
                    propagate(e);
                    shallowPropagate(e);
                    b();
                }
            }
        };
    }
    return a;
}
function S(e) {
    let t = ()=>{
        let t = g;
        g = n;
        ++c;
        n.depsTail = undefined;
        n.flags = i.Watching | i.RecursedCheck;
        try {
            return e();
        } finally{
            g = t;
            n.flags &= ~i.RecursedCheck;
            y(n);
        }
    };
    let n = {
        deps: undefined,
        depsTail: undefined,
        subs: undefined,
        subsTail: undefined,
        flags: i.Watching | i.RecursedCheck,
        notify () {
            let flags = this.flags;
            if (flags & i.Dirty || flags & i.Pending && checkDirty(this.deps, this)) {
                t();
            } else {
                this.flags = i.Watching;
            }
        },
        stop () {
            this.flags = i.None;
            this.depsTail = undefined;
            y(this);
        }
    };
    t();
    return n;
}
class C {
    constructor(e, t){
        this.atom = x(e);
        this.get = this.get.bind(this);
        this.setState = this.setState.bind(this);
        this.subscribe = this.subscribe.bind(this);
        if (t) {
            this.actions = t(this);
        }
    }
    setState(e) {
        this.atom.set(e);
    }
    get state() {
        return this.atom.get();
    }
    get() {
        return this.state;
    }
    subscribe(e) {
        return this.atom.subscribe(o(e));
    }
}
class ee {
    constructor(e){
        this.atom = x(e);
    }
    get state() {
        return this.atom.get();
    }
    get() {
        return this.state;
    }
    subscribe(e) {
        return this.atom.subscribe(o(e));
    }
}
function w(e, t) {
    if (typeof e == `function`) {
        return new ee(e);
    }
    if (t) {
        return new C(e, t);
    }
    return new C(e);
}
class re {
    #e = true;
    #t;
    #n;
    #r;
    #i;
    #a;
    #o;
    #s;
    #c = 0;
    #l = 5;
    #u = false;
    #d = false;
    #f = null;
    #p = ()=>{
        this.debugLog(`Connected to event bus`);
        this.#a = true;
        this.#u = false;
        this.debugLog(`Emitting queued events`, this.#i);
        this.#i.forEach((e)=>this.emitEventToBus(e));
        this.#i = [];
        this.stopConnectLoop();
        this.#n().removeEventListener(`tanstack-connect-success`, this.#p);
    };
    #m = ()=>{
        if (this.#c < this.#l) {
            this.#c++;
            this.dispatchCustomEvent(`tanstack-connect`, {});
            return;
        }
        this.#n().removeEventListener(`tanstack-connect`, this.#m);
        this.#d = true;
        this.debugLog(`Max retries reached, giving up on connection`);
        this.stopConnectLoop();
    };
    #h = ()=>{
        if (!this.#u) {
            this.#u = true;
            this.#n().addEventListener(`tanstack-connect-success`, this.#p);
            this.#m();
        }
    };
    constructor({ pluginId, debug = false, enabled = true, reconnectEveryMs = 300 }){
        this.#t = pluginId;
        this.#e = enabled;
        this.#n = this.getGlobalTarget;
        this.#r = debug;
        this.debugLog(` Initializing event subscription for plugin`, this.#t);
        this.#i = [];
        this.#a = false;
        this.#d = false;
        this.#o = null;
        this.#s = reconnectEveryMs;
    }
    startConnectLoop() {
        if (!(this.#o !== null || this.#a)) {
            this.debugLog(`Starting connect loop (every ${this.#s}ms)`);
            this.#o = setInterval(this.#m, this.#s);
        }
    }
    stopConnectLoop() {
        this.#u = false;
        if (this.#o !== null) {
            clearInterval(this.#o);
            this.#o = null;
            this.#i = [];
            this.debugLog(`Stopped connect loop`);
        }
    }
    debugLog(...e) {
        if (this.#r) {
            console.log(`🌴 [tanstack-devtools:${this.#t}-plugin]`, ...e);
        }
    }
    getGlobalTarget() {
        if (typeof globalThis < `u` && globalThis.__TANSTACK_EVENT_TARGET__) {
            this.debugLog(`Using global event target`);
            return globalThis.__TANSTACK_EVENT_TARGET__;
        }
        if (typeof window < `u` && window.addEventListener !== undefined) {
            this.debugLog(`Using window as event target`);
            return window;
        }
        let e = typeof EventTarget < `u` ? new EventTarget : undefined;
        if (e === undefined || e.addEventListener === undefined) {
            this.debugLog(`No event mechanism available, running in non-web environment`);
            return {
                addEventListener: ()=>{},
                removeEventListener: ()=>{},
                dispatchEvent: ()=>false
            };
        }
        this.debugLog(`Using new EventTarget as fallback`);
        return e;
    }
    getPluginId() {
        return this.#t;
    }
    dispatchCustomEventShim(e, detail) {
        try {
            let n = new Event(e, {
                detail
            });
            this.#n().dispatchEvent(n);
        } catch  {
            this.debugLog(`Failed to dispatch shim event`);
        }
    }
    dispatchCustomEvent(e, detail) {
        try {
            this.#n().dispatchEvent(new CustomEvent(e, {
                detail
            }));
        } catch  {
            this.dispatchCustomEventShim(e, detail);
        }
    }
    emitEventToBus(e) {
        this.debugLog(`Emitting event to client bus`, e);
        this.dispatchCustomEvent(`tanstack-dispatch-event`, e);
    }
    createEventPayload(e, payload) {
        return {
            type: `${this.#t}:${e}`,
            payload,
            pluginId: this.#t
        };
    }
    emit(e, t) {
        if (!this.#e) {
            this.debugLog(`Event bus client is disabled, not emitting event`, e, t);
            return;
        }
        if (this.#f) {
            this.debugLog(`Emitting event to internal event target`, e, t);
            this.#f.dispatchEvent(new CustomEvent(`${this.#t}:${e}`, {
                detail: this.createEventPayload(e, t)
            }));
        }
        if (this.#d) {
            this.debugLog(`Previously failed to connect, not emitting to bus`);
            return;
        }
        if (!this.#a) {
            this.debugLog(`Bus not available, will be pushed as soon as connected`);
            this.#i.push(this.createEventPayload(e, t));
            if (typeof CustomEvent < `u` && !this.#u) {
                this.#h();
                this.startConnectLoop();
            }
            return;
        }
        return this.emitEventToBus(this.createEventPayload(e, t));
    }
    on(e, t, n) {
        let r = n?.withEventTarget ?? false;
        let i = `${this.#t}:${e}`;
        if (r) {
            this.#f ||= new EventTarget;
            this.#f.addEventListener(i, (e)=>{
                t(e.detail);
            });
        }
        if (!this.#e) {
            this.debugLog(`Event bus client is disabled, not registering event`, i);
            return ()=>{};
        }
        let a = (e)=>{
            this.debugLog(`Received event from bus`, e.detail);
            t(e.detail);
        };
        this.#n().addEventListener(i, a);
        this.debugLog(`Registered event to bus`, i);
        return ()=>{
            if (r) {
                this.#f?.removeEventListener(i, a);
            }
            this.#n().removeEventListener(i, a);
        };
    }
    onAll(e) {
        if (!this.#e) {
            this.debugLog(`Event bus client is disabled, not registering event`);
            return ()=>{};
        }
        let t = (t)=>{
            let t_detail = t.detail;
            e(t_detail);
        };
        this.#n().addEventListener(`tanstack-devtools-global`, t);
        return ()=>this.#n().removeEventListener(`tanstack-devtools-global`, t);
    }
    onAllPluginEvents(e) {
        if (!this.#e) {
            this.debugLog(`Event bus client is disabled, not registering event`);
            return ()=>{};
        }
        let t = (t)=>{
            let t_detail = t.detail;
            if (!(this.#t && t_detail.pluginId !== this.#t)) {
                e(t_detail);
            }
        };
        this.#n().addEventListener(`tanstack-devtools-global`, t);
        return ()=>this.#n().removeEventListener(`tanstack-devtools-global`, t);
    }
}
const T = new class extends re {
    constructor(){
        super({
            pluginId: `form-devtools`,
            reconnectEveryMs: 1000
        });
    }
};
function E(e, t) {
    if (typeof e == `function`) {
        return e(t);
    }
    return e;
}
function D(e, t) {
    return ce(t).reduce((acc, item)=>{
        if (acc === null) {
            return null;
        }
        if (acc !== undefined) {
            return acc[item];
        }
    }, e);
}
function O(e, t, n) {
    let r = ce(t);
    function i(e) {
        if (!r.length) {
            return E(n, e);
        }
        let t = r.shift();
        if (typeof t == `string` || typeof t == `number` && !Array.isArray(e)) {
            if (typeof e == `object`) {
                if (e === null) {
                    e = {};
                }
                return {
                    ...e,
                    [t]: i(e[t])
                };
            }
            return {
                [t]: i()
            };
        }
        if (Array.isArray(e) && typeof t == `number`) {
            let n = e.slice(0, t);
            return [
                ...n.length ? n : Array(t),
                i(e[t]),
                ...e.slice(t + 1)
            ];
        }
        return [
            ...Array(t),
            i()
        ];
    }
    return i(e);
}
function ie(values, t) {
    let n = ce(t);
    function r(e) {
        if (!e) {
            return;
        }
        if (n.length === 1) {
            let t = n[0];
            if (Array.isArray(e) && typeof t == `number`) {
                return e.filter((e, n)=>n !== t);
            }
            let { [t]: r, ...rest } = e;
            return rest;
        }
        let t = n.shift();
        if ((typeof t == `string` || typeof t == `number` && !Array.isArray(e)) && typeof e == `object`) {
            return {
                ...e,
                [t]: r(e[t])
            };
        }
        if (typeof t == `number` && Array.isArray(e)) {
            if (t >= e.length) {
                return e;
            }
            let n = e.slice(0, t);
            return [
                ...n.length ? n : Array(t),
                r(e[t]),
                ...e.slice(t + 1)
            ];
        }
        throw Error(`It seems we have created an infinite loop in deleteBy. `);
    }
    return r(values);
}
function le(e) {
    return !(Array.isArray(e) && e.length === 0);
}
function j(type, t) {
    return t.validationLogic({
        form: t.form,
        group: t.group,
        validators: t.validators,
        event: {
            type,
            fieldName: t.fieldName,
            async: false
        },
        runValidation: (e)=>e.validators.filter(Boolean).map((e)=>({
                    cause: e.cause,
                    validate: e.fn
                }))
    });
}
function M(e, t) {
    let { asyncDebounceMs } = t;
    let { onBlurAsyncDebounceMs, onChangeAsyncDebounceMs, onDynamicAsyncDebounceMs } = t.validators || {};
    let o = asyncDebounceMs ?? 0;
    return t.validationLogic({
        form: t.form,
        group: t.group,
        validators: t.validators,
        event: {
            type: e,
            fieldName: t.fieldName,
            async: true
        },
        runValidation: (t)=>t.validators.filter(Boolean).map((t)=>{
                let cause = t?.cause || e;
                let debounceMs = o;
                switch(cause){
                    case `change`:
                        debounceMs = onChangeAsyncDebounceMs ?? o;
                        break;
                    case `blur`:
                        debounceMs = onBlurAsyncDebounceMs ?? o;
                        break;
                    case `dynamic`:
                        debounceMs = onDynamicAsyncDebounceMs ?? o;
                        break;
                    case `submit`:
                        debounceMs = 0;
                        break;
                }
                if (e === `submit`) {
                    debounceMs = 0;
                }
                return {
                    cause,
                    validate: t.fn,
                    debounceMs
                };
            })
    });
}
const N = (e)=>!!e && typeof e == `object` && `fields` in e;
function P(e, t) {
    if (Object.is(e, t)) {
        return true;
    }
    if (typeof e != `object` || !e || typeof t != `object` || !t) {
        return false;
    }
    if (e instanceof Date && t instanceof Date) {
        return e.getTime() === t.getTime();
    }
    if (e instanceof Map && t instanceof Map) {
        if (e.size !== t.size) {
            return false;
        }
        for (let [n, r] of e){
            if (!t.has(n) || !Object.is(r, t.get(n))) {
                return false;
            }
        }
        return true;
    }
    if (e instanceof Set && t instanceof Set) {
        if (e.size !== t.size) {
            return false;
        }
        for (let n of e){
            if (!t.has(n)) {
                return false;
            }
        }
        return true;
    }
    let n = Object.keys(e);
    let r = Object.keys(t);
    if (n.length !== r.length || n.length === 0 && !Array.isArray(e) && !Array.isArray(t) && (Object.getPrototypeOf(e) !== Object.prototype || Object.getPrototypeOf(t) !== Object.prototype)) {
        return false;
    }
    for (let i of n){
        if (!r.includes(i) || !P(e[i], t[i])) {
            return false;
        }
    }
    return true;
}
const ue = ({ newFormValidatorError, isPreviousErrorFromFormValidator, previousErrorValue })=>{
    if (newFormValidatorError) {
        return {
            newErrorValue: newFormValidatorError,
            newSource: `form`
        };
    }
    if (isPreviousErrorFromFormValidator) {
        return {
            newErrorValue: undefined,
            newSource: undefined
        };
    }
    if (previousErrorValue) {
        return {
            newErrorValue: previousErrorValue,
            newSource: `field`
        };
    }
    return {
        newErrorValue: undefined,
        newSource: undefined
    };
};
const F = ({ formLevelError, fieldLevelError })=>{
    if (fieldLevelError) {
        return {
            newErrorValue: fieldLevelError,
            newSource: `field`
        };
    }
    if (formLevelError) {
        return {
            newErrorValue: formLevelError,
            newSource: `form`
        };
    }
    return {
        newErrorValue: undefined,
        newSource: undefined
    };
};
function I(e, t) {
    if (e == null) {
        return t;
    }
    return {
        ...e,
        ...t
    };
}
const fe = ne((e)=>T.emit(`form-state`, {
        id: e.formId,
        state: e.store.state
    }), {
    wait: 300
});
function B(e) {
    if (typeof e != `object` || !e) {
        return e;
    }
    if (e instanceof Date) {
        return new Date(e.getTime());
    }
    if (Array.isArray(e)) {
        let t = [];
        for(let n = 0; n < e.length; n++){
            t[n] = B(e[n]);
        }
        return t;
    }
    if (e instanceof Map) {
        let t = new Map;
        e.forEach((e, n)=>{
            t.set(n, B(e));
        });
        return t;
    }
    if (e instanceof Set) {
        let t = new Set;
        e.forEach((e)=>{
            t.add(B(e));
        });
        return t;
    }
    let t = {};
    for(let n in e){
        if (Object.prototype.hasOwnProperty.call(e, n)) {
            t[n] = B(e[n]);
        }
    }
    return t;
}
function V(e, t) {
    return t === e || t.startsWith(`${e}.`) || t.startsWith(`${e}[`);
}
const H = (e)=>{
    if (!e.validators) {
        return e.runValidation({
            validators: [],
            form: e.form
        });
    }
    let async = e.event.async;
    let n = async ? undefined : {
        fn: e.validators.onMount,
        cause: `mount`
    };
    let r = {
        fn: async ? e.validators.onChangeAsync : e.validators.onChange,
        cause: `change`
    };
    let i = {
        fn: async ? e.validators.onBlurAsync : e.validators.onBlur,
        cause: `blur`
    };
    let a = {
        fn: async ? e.validators.onSubmitAsync : e.validators.onSubmit,
        cause: `submit`
    };
    let o = async ? undefined : {
        fn: ()=>undefined,
        cause: `server`
    };
    switch(e.event.type){
        case `mount`:
            return e.runValidation({
                validators: [
                    n
                ],
                form: e.form
            });
        case `submit`:
            return e.runValidation({
                validators: [
                    r,
                    i,
                    a,
                    o
                ],
                form: e.form
            });
        case `server`:
            return e.runValidation({
                validators: [],
                form: e.form
            });
        case `blur`:
            return e.runValidation({
                validators: [
                    i,
                    o
                ],
                form: e.form
            });
        case `change`:
            return e.runValidation({
                validators: [
                    r,
                    o
                ],
                form: e.form
            });
        default:
            throw Error(`Unknown validation event type: ${e.event.type}`);
    }
};
function G(e) {
    function bumpArrayVersion(t) {
        let n = e.getFieldMeta(t) ?? W;
        e.setFieldMeta(t, {
            ...n,
            _arrayVersion: (n._arrayVersion || 0) + 1
        });
    }
    function handleArrayMove(n, r, i) {
        bumpArrayVersion(n);
        let a = s(n, r, `move`, i);
        let c = Math.min(r, i);
        let u = Math.max(r, i);
        for(let e = c; e <= u; e++){
            a.push(o(n, e));
        }
        let d = Object.keys(e.fieldInfo).reduce((acc, key)=>{
            if (key.startsWith(o(n, r))) {
                acc.set(key, e.getFieldMeta(key));
            }
            return acc;
        }, new Map);
        l(a, r < i ? `up` : `down`);
        Object.keys(e.fieldInfo).filter((e)=>e.startsWith(o(n, i))).forEach((t)=>{
            let a = t.replace(o(n, i), o(n, r));
            let s = d.get(a);
            if (s) {
                e.setFieldMeta(t, s);
            }
        });
    }
    function handleArrayRemove(e, n) {
        bumpArrayVersion(e);
        l(s(e, n, `remove`), `up`);
    }
    function handleArraySwap(n, r, i) {
        bumpArrayVersion(n);
        s(n, r, `swap`, i).forEach((t)=>{
            if (!t.toString().startsWith(o(n, r))) {
                return;
            }
            let a = t.toString().replace(o(n, r), o(n, i));
            let [s, c] = [
                e.getFieldMeta(t),
                e.getFieldMeta(a)
            ];
            if (s) {
                e.setFieldMeta(a, s);
            }
            if (c) {
                e.setFieldMeta(t, c);
            }
        });
    }
    function handleArrayInsert(n, r) {
        bumpArrayVersion(n);
        let i = s(n, r, `insert`);
        l(i, `down`);
        i.forEach((t)=>{
            if (t.toString().startsWith(o(n, r))) {
                e.setFieldMeta(t, u());
            }
        });
    }
    function o(e, t) {
        return `${e}[${t}]`;
    }
    function s(t, n, r, i) {
        let a = [
            o(t, n)
        ];
        switch(r){
            case `swap`:
                a.push(o(t, i));
                break;
            case `move`:
                {
                    let [e, r] = [
                        Math.min(n, i),
                        Math.max(n, i)
                    ];
                    for(let n = e; n <= r; n++){
                        a.push(o(t, n));
                    }
                    break;
                }
            default:
                {
                    let r = e.getFieldValue(t);
                    let i = Array.isArray(r) ? r.length : 0;
                    for(let e = n + 1; e < i; e++){
                        a.push(o(t, e));
                    }
                    break;
                }
        }
        return Object.keys(e.fieldInfo).filter((e)=>a.some((t)=>e.startsWith(t)));
    }
    function c(e, t) {
        return e.replace(/\[(\d+)\]/, (e, n)=>{
            let r = parseInt(n, 10);
            return `[${t === `up` ? r + 1 : Math.max(0, r - 1)}]`;
        });
    }
    function l(t, n) {
        (n === `up` ? t : [
            ...t
        ].reverse()).forEach((t)=>{
            let r = c(t.toString(), n);
            let i = e.getFieldMeta(r);
            if (i) {
                e.setFieldMeta(t, i);
            } else {
                e.setFieldMeta(t, u());
            }
        });
    }
    let u = ()=>W;
    return {
        bumpArrayVersion,
        handleArrayMove,
        handleArrayRemove,
        handleArraySwap,
        handleArrayInsert
    };
}
function ge(e) {
    return {
        values: e.values ?? {},
        errorMap: e.errorMap ?? {},
        fieldMetaBase: e.fieldMetaBase ?? {},
        formGroupStateBase: e.formGroupStateBase ?? {},
        isSubmitted: e.isSubmitted ?? false,
        isSubmitting: e.isSubmitting ?? false,
        isValidating: e.isValidating ?? false,
        submissionAttempts: e.submissionAttempts ?? 0,
        isSubmitSuccessful: e.isSubmitSuccessful ?? false,
        validationMetaMap: e.validationMetaMap ?? {
            onChange: undefined,
            onBlur: undefined,
            onSubmit: undefined,
            onMount: undefined,
            onServer: undefined,
            onDynamic: undefined
        }
    };
}
class _e {
    constructor(e){
        this.options = {};
        this.fieldInfo = {};
        this.formGroupApis = new Set;
        this.mount = ()=>{
            let e = this.store.subscribe(()=>{
                fe(this);
            });
            let t = T.on(`request-form-state`, (e)=>{
                if (e.payload.id === this._formId) {
                    T.emit(`form-api`, {
                        id: this._formId,
                        state: this.store.state,
                        options: this.options
                    });
                }
            });
            let n = T.on(`request-form-reset`, (e)=>{
                if (e.payload.id === this._formId) {
                    this.reset();
                }
            });
            let r = T.on(`request-form-force-submit`, (e)=>{
                if (e.payload.id === this._formId) {
                    this._devtoolsSubmissionOverride = true;
                    this.handleSubmit();
                    this._devtoolsSubmissionOverride = false;
                }
            });
            let i = ()=>{
                r();
                n();
                t();
                e.unsubscribe();
                T.emit(`form-unmounted`, {
                    id: this._formId
                });
            };
            this.options.listeners?.onMount?.({
                formApi: this
            });
            let { onMount } = this.options.validators || {};
            T.emit(`form-api`, {
                id: this._formId,
                state: this.store.state,
                options: this.options
            });
            if (onMount) {
                this.validateSync(`mount`);
            }
            return i;
        };
        this.update = (e)=>{
            if (!e) {
                return;
            }
            let options = this.options;
            this.options = e;
            let n = e.defaultValues && !P(e.defaultValues, options.defaultValues) && !this.state.isTouched;
            let r = !P(e.defaultState, options.defaultState) && !this.state.isTouched;
            if (!(!n && !r)) {
                v(()=>{
                    this.baseStore.setState(()=>ge({
                            ...this.state,
                            ...r ? e.defaultState : {},
                            ...n ? {
                                values: e.defaultValues
                            } : {}
                        }));
                });
                if (n) {
                    let e = G(this);
                    for (let t of Object.keys(this.fieldInfo)){
                        if (Array.isArray(this.getFieldValue(t))) {
                            e.bumpArrayVersion(t);
                        }
                    }
                }
                T.emit(`form-api`, {
                    id: this._formId,
                    state: this.store.state,
                    options: this.options
                });
            }
        };
        this.reset = (defaultValues, t)=>{
            let { fieldMeta } = this.state;
            let fieldMetaBase = this.resetFieldMeta(fieldMeta);
            if (defaultValues && !t?.keepDefaultValues) {
                this.options = {
                    ...this.options,
                    defaultValues
                };
            }
            this.baseStore.setState(()=>{
                let values = defaultValues ?? this.options.defaultValues ?? this.options.defaultState?.values;
                if (!defaultValues) {
                    Object.values(this.fieldInfo).forEach((e)=>{
                        if (e.instance && e.instance.options.defaultValue !== undefined) {
                            values = O(values, e.instance.name, e.instance.options.defaultValue);
                        }
                    });
                }
                return ge({
                    ...this.options.defaultState,
                    values,
                    fieldMetaBase
                });
            });
        };
        this.validateAllFields = async (e)=>{
            let t = [];
            v(()=>{
                Object.values(this.fieldInfo).forEach((n)=>{
                    if (!n.instance) {
                        return;
                    }
                    let n_instance = n.instance;
                    t.push(Promise.resolve().then(()=>n_instance.validate(e, {
                            skipFormValidation: true,
                            skipGroupValidation: true
                        })));
                    if (!n.instance.store.state.meta.isTouched) {
                        n.instance.setMeta((e)=>({
                                ...e,
                                isTouched: true
                            }));
                    }
                });
            });
            return (await Promise.all(t)).flat();
        };
        this.validateArrayFieldsStartingFrom = async (e, t, n)=>{
            let r = this.getFieldValue(e);
            let i = Array.isArray(r) ? Math.max(r.length - 1, 0) : null;
            let a = [
                `${e}[${t}]`
            ];
            for(let n = t + 1; n <= (i ?? 0); n++){
                a.push(`${e}[${n}]`);
            }
            let o = Object.keys(this.fieldInfo).filter((e)=>a.some((t)=>e.startsWith(t)));
            let s = [];
            v(()=>{
                o.forEach((e)=>{
                    s.push(Promise.resolve().then(()=>this.validateField(e, n)));
                });
            });
            return (await Promise.all(s)).flat();
        };
        this.validateField = (e, t)=>{
            let n = this.fieldInfo[e]?.instance;
            if (!n) {
                let { hasErrored } = this.validateSync(t);
                if (hasErrored && !this.options.asyncAlways) {
                    return this.getFieldMeta(e)?.errors ?? [];
                }
                return this.validateAsync(t).then(()=>this.getFieldMeta(e)?.errors ?? []);
            }
            if (!n.store.state.meta.isTouched) {
                n.setMeta((e)=>({
                        ...e,
                        isTouched: true
                    }));
            }
            return n.validate(t);
        };
        this.validateSync = (e, t)=>{
            let n = j(e, {
                ...this.options,
                form: this,
                group: t?.group,
                validationLogic: this.options.validationLogic || H
            });
            let r = false;
            let fieldsErrorMap = {};
            v(()=>{
                for (let e of n){
                    if (!e.validate) {
                        continue;
                    }
                    let { formError, fieldErrors } = K(this.runValidator({
                        validate: e.validate,
                        value: {
                            value: this.state.values,
                            formApi: this,
                            validationSource: `form`
                        },
                        type: `validate`
                    }));
                    let o = q(e.cause);
                    let s = new Set([
                        ...Object.keys(this.state.fieldMeta),
                        ...Object.keys(fieldErrors || {})
                    ]);
                    if (t?.filterFieldNames) {
                        s = new Set([
                            ...s
                        ].filter(t.filterFieldNames));
                    }
                    for (let e of s){
                        if (this.baseStore.state.fieldMetaBase[e] === undefined && !fieldErrors?.[e]) {
                            continue;
                        }
                        let { errorMap, errorSourceMap } = this.getFieldMeta(e) ?? W;
                        let r = fieldErrors?.[e];
                        let { newErrorValue, newSource } = ue({
                            newFormValidatorError: r,
                            isPreviousErrorFromFormValidator: errorSourceMap?.[o] === `form`,
                            previousErrorValue: errorMap?.[o]
                        });
                        if (newSource === `form`) {
                            fieldsErrorMap[e] = {
                                ...fieldsErrorMap[e],
                                [o]: r
                            };
                        }
                        if (errorMap?.[o] !== newErrorValue) {
                            this.setFieldMeta(e, (e = W)=>({
                                    ...e,
                                    errorMap: {
                                        ...e.errorMap,
                                        [o]: newErrorValue
                                    },
                                    errorSourceMap: {
                                        ...e.errorSourceMap,
                                        [o]: newSource
                                    }
                                }));
                        }
                    }
                    if (!t?.dontUpdateFormErrorMap) {
                        if (this.state.errorMap?.[o] !== formError) {
                            this.baseStore.setState((e)=>({
                                    ...e,
                                    errorMap: {
                                        ...e.errorMap,
                                        [o]: formError
                                    }
                                }));
                        }
                    }
                    if (formError || fieldErrors) {
                        r = true;
                    }
                }
                if (t?.dontUpdateFormErrorMap) {
                    return;
                }
                let a = q(`submit`);
                if (this.state.errorMap?.[a] && e !== `submit` && !r) {
                    this.baseStore.setState((e)=>({
                            ...e,
                            errorMap: {
                                ...e.errorMap,
                                [a]: undefined
                            }
                        }));
                }
                let o = q(`server`);
                if (this.state.errorMap?.[o] && e !== `server` && !r) {
                    this.baseStore.setState((e)=>({
                            ...e,
                            errorMap: {
                                ...e.errorMap,
                                [o]: undefined
                            }
                        }));
                }
            });
            return {
                hasErrored: r,
                fieldsErrorMap
            };
        };
        this.validateAsync = async (e, t)=>{
            let n = M(e, {
                ...this.options,
                form: this,
                group: t?.group,
                validationLogic: this.options.validationLogic || H
            });
            if (!this.state.isFormValidating) {
                this.baseStore.setState((e)=>({
                        ...e,
                        isFormValidating: true
                    }));
            }
            let r = [];
            let fieldErrors_1;
            for (let e of n){
                if (!e.validate) {
                    continue;
                }
                let n = q(e.cause);
                this.state.validationMetaMap[n]?.lastAbortController.abort();
                let a = new AbortController;
                this.state.validationMetaMap[n] = {
                    lastAbortController: a
                };
                r.push(new Promise(async (resolve)=>{
                    let r;
                    try {
                        r = await new Promise((resolvePromise, rejectPromise)=>{
                            setTimeout(async ()=>{
                                if (a.signal.aborted) {
                                    return resolvePromise(undefined);
                                }
                                try {
                                    resolvePromise(await this.runValidator({
                                        validate: e.validate,
                                        value: {
                                            value: this.state.values,
                                            formApi: this,
                                            validationSource: `form`,
                                            signal: a.signal
                                        },
                                        type: `validateAsync`
                                    }));
                                } catch (error) {
                                    rejectPromise(error);
                                }
                            }, e.debounceMs);
                        });
                    } catch (error) {
                        r = error;
                    }
                    let { formError, fieldErrors } = K(r);
                    if (fieldErrors) {
                        fieldErrors_1 = fieldErrors_1 ? {
                            ...fieldErrors_1,
                            ...fieldErrors
                        } : fieldErrors;
                    }
                    let errorMapKey = q(e.cause);
                    let l = new Set([
                        ...Object.keys(this.state.fieldMeta),
                        ...Object.keys(fieldErrors_1 || {})
                    ]);
                    let u = Array.from(l);
                    if (t?.filterFieldNames) {
                        u = u.filter(t.filterFieldNames);
                    }
                    for (let e of u){
                        if (this.baseStore.state.fieldMetaBase[e] === undefined && !fieldErrors_1?.[e]) {
                            continue;
                        }
                        let { errorMap, errorSourceMap } = this.getFieldMeta(e) ?? W;
                        let newFormValidatorError = fieldErrors_1?.[e];
                        let { newErrorValue, newSource } = ue({
                            newFormValidatorError,
                            isPreviousErrorFromFormValidator: errorSourceMap?.[errorMapKey] === `form`,
                            previousErrorValue: errorMap?.[errorMapKey]
                        });
                        if (errorMap?.[errorMapKey] !== newErrorValue) {
                            this.setFieldMeta(e, (e = W)=>({
                                    ...e,
                                    errorMap: {
                                        ...e.errorMap,
                                        [errorMapKey]: newErrorValue
                                    },
                                    errorSourceMap: {
                                        ...e.errorSourceMap,
                                        [errorMapKey]: newSource
                                    }
                                }));
                        }
                    }
                    if (!t?.dontUpdateFormErrorMap) {
                        this.baseStore.setState((e)=>({
                                ...e,
                                errorMap: {
                                    ...e.errorMap,
                                    [errorMapKey]: formError
                                }
                            }));
                    }
                    resolve(fieldErrors_1 ? {
                        fieldErrors: fieldErrors_1,
                        errorMapKey
                    } : undefined);
                }));
            }
            let a = [];
            let o = {};
            if (r.length) {
                a = await Promise.all(r);
                for (let e of a){
                    if (e?.fieldErrors) {
                        let { errorMapKey } = e;
                        for (let [n, r] of Object.entries(e.fieldErrors)){
                            o[n] = {
                                ...o[n] || {},
                                [errorMapKey]: r
                            };
                        }
                    }
                }
            }
            this.baseStore.setState((e)=>({
                    ...e,
                    isFormValidating: false
                }));
            return o;
        };
        this.validate = (e, t)=>{
            let { hasErrored, fieldsErrorMap } = this.validateSync(e, t);
            if (hasErrored && !this.options.asyncAlways) {
                return fieldsErrorMap;
            }
            return this.validateAsync(e, t);
        };
        this._handleSubmit = async (e)=>{
            this.baseStore.setState((e)=>({
                    ...e,
                    isSubmitted: false,
                    submissionAttempts: e.submissionAttempts + 1,
                    isSubmitSuccessful: false
                }));
            v(()=>{
                Object.values(this.fieldInfo).forEach((e)=>{
                    if (e.instance) {
                        if (!e.instance.store.state.meta.isTouched) {
                            e.instance.setMeta((e)=>({
                                    ...e,
                                    isTouched: true
                                }));
                        }
                    }
                });
            });
            let t = e ?? this.options.onSubmitMeta;
            if (!this.state.canSubmit && !this._devtoolsSubmissionOverride && this.baseStore.state.submissionAttempts <= 1) {
                this.options.onSubmitInvalid?.({
                    value: this.state.values,
                    formApi: this,
                    meta: t
                });
                return;
            }
            this.baseStore.setState((e)=>({
                    ...e,
                    isSubmitting: true
                }));
            let n = ()=>{
                this.baseStore.setState((e)=>({
                        ...e,
                        isSubmitting: false
                    }));
            };
            await this.validateAllFields(`submit`);
            if (!this.state.isFieldsValid) {
                n();
                this.options.onSubmitInvalid?.({
                    value: this.state.values,
                    formApi: this,
                    meta: t
                });
                T.emit(`form-submission`, {
                    id: this._formId,
                    submissionAttempt: this.state.submissionAttempts,
                    successful: false,
                    stage: `validateAllFields`,
                    errors: Object.values(this.state.fieldMeta).map((e)=>e.errors).flat()
                });
                return;
            }
            await this.validate(`submit`);
            if (!this.state.isValid) {
                n();
                this.options.onSubmitInvalid?.({
                    value: this.state.values,
                    formApi: this,
                    meta: t
                });
                T.emit(`form-submission`, {
                    id: this._formId,
                    submissionAttempt: this.state.submissionAttempts,
                    successful: false,
                    stage: `validate`,
                    errors: this.state.errors
                });
                return;
            }
            v(()=>{
                Object.values(this.fieldInfo).forEach((e)=>{
                    e.instance?.triggerOnSubmitListener();
                });
            });
            this.options.listeners?.onSubmit?.({
                formApi: this,
                meta: t
            });
            try {
                await this.options.onSubmit?.({
                    value: this.state.values,
                    formApi: this,
                    meta: t
                });
                v(()=>{
                    this.baseStore.setState((e)=>({
                            ...e,
                            isSubmitted: true,
                            isSubmitSuccessful: true
                        }));
                    T.emit(`form-submission`, {
                        id: this._formId,
                        submissionAttempt: this.state.submissionAttempts,
                        successful: true
                    });
                    n();
                });
            } catch (onError) {
                this.baseStore.setState((e)=>({
                        ...e,
                        isSubmitSuccessful: false
                    }));
                T.emit(`form-submission`, {
                    id: this._formId,
                    submissionAttempt: this.state.submissionAttempts,
                    successful: false,
                    stage: `inflight`,
                    onError
                });
                n();
                throw onError;
            }
        };
        this.getFieldValue = (e)=>D(this.state.values, e);
        this.getFieldMeta = (e)=>this.state.fieldMeta[e];
        this.getFormGroupMeta = (e)=>this.formGroupMetaDerived.state[e];
        this.getFieldInfo = (e)=>this.fieldInfo[e] ||= {
                instance: null,
                validationMetaMap: {
                    onChange: undefined,
                    onBlur: undefined,
                    onSubmit: undefined,
                    onMount: undefined,
                    onServer: undefined,
                    onDynamic: undefined
                }
            };
        this.setFieldMeta = (e, t)=>{
            this.baseStore.setState((n)=>({
                    ...n,
                    fieldMetaBase: {
                        ...n.fieldMetaBase,
                        [e]: E(t, n.fieldMetaBase[e])
                    }
                }));
        };
        this.resetFieldMeta = (e)=>Object.keys(e).reduce((acc, key)=>{
                let n = key;
                acc[n] = W;
                return acc;
            }, {});
        this.setFieldValue = (e, t, n)=>{
            let r = n?.dontUpdateMeta ?? false;
            let i = n?.dontRunListeners ?? false;
            let a = n?.dontValidate ?? false;
            v(()=>{
                if (!r) {
                    this.setFieldMeta(e, (e)=>({
                            ...e,
                            isTouched: true,
                            isDirty: true,
                            errorMap: {
                                ...e?.errorMap,
                                onMount: undefined
                            }
                        }));
                }
                this.baseStore.setState((n)=>({
                        ...n,
                        values: O(n.values, e, t)
                    }));
            });
            if (!i) {
                this.getFieldInfo(e).instance?.triggerOnChangeListener();
            }
            if (!a) {
                this.validateField(e, `change`);
            }
        };
        this.deleteField = (e)=>{
            let t = [
                ...Object.keys(this.fieldInfo).filter((t)=>{
                    let n = e.toString();
                    return t !== n && t.startsWith(n);
                }),
                e
            ];
            this.baseStore.setState((e)=>{
                let n = {
                    ...e
                };
                t.forEach((e)=>{
                    n.values = ie(n.values, e);
                    delete this.fieldInfo[e];
                    delete n.fieldMetaBase[e];
                });
                return n;
            });
        };
        this.pushFieldValue = (e, t, n)=>{
            this.setFieldValue(e, (e)=>[
                    ...Array.isArray(e) ? e : [],
                    t
                ], n);
            G(this).bumpArrayVersion(e);
        };
        this.insertFieldValue = async (e, t, n, r)=>{
            this.setFieldValue(e, (e)=>[
                    ...e.slice(0, t),
                    n,
                    ...e.slice(t)
                ], I(r, {
                dontValidate: true
            }));
            let i = r?.dontValidate ?? false;
            if (!i) {
                await this.validateField(e, `change`);
            }
            G(this).handleArrayInsert(e, t);
            if (!i) {
                await this.validateArrayFieldsStartingFrom(e, t, `change`);
            }
        };
        this.replaceFieldValue = async (e, t, n, r)=>{
            this.setFieldValue(e, (e)=>e.map((e, r)=>{
                    if (r === t) {
                        return n;
                    }
                    return e;
                }), I(r, {
                dontValidate: true
            }));
            G(this).bumpArrayVersion(e);
            if (!(r?.dontValidate ?? false)) {
                await this.validateField(e, `change`);
                await this.validateArrayFieldsStartingFrom(e, t, `change`);
            }
        };
        this.removeFieldValue = async (e, t, n)=>{
            let r = this.getFieldValue(e);
            let i = Array.isArray(r) ? Math.max(r.length - 1, 0) : null;
            this.setFieldValue(e, (e)=>e.filter((e, n)=>n !== t), I(n, {
                dontValidate: true
            }));
            G(this).handleArrayRemove(e, t);
            if (i !== null) {
                let t = `${e}[${i}]`;
                this.deleteField(t);
            }
            if (!(n?.dontValidate ?? false)) {
                await this.validateField(e, `change`);
                await this.validateArrayFieldsStartingFrom(e, t, `change`);
            }
        };
        this.swapFieldValues = (e, t, n, r)=>{
            this.setFieldValue(e, (e)=>{
                let r = e[t];
                let i = e[n];
                return O(O(e, `${t}`, i), `${n}`, r);
            }, I(r, {
                dontValidate: true
            }));
            G(this).handleArraySwap(e, t, n);
            if (!(r?.dontValidate ?? false)) {
                this.validateField(e, `change`);
                this.validateField(`${e}[${t}]`, `change`);
                this.validateField(`${e}[${n}]`, `change`);
            }
        };
        this.moveFieldValues = (e, t, n, r)=>{
            this.setFieldValue(e, (e)=>{
                let r = [
                    ...e
                ];
                r.splice(n, 0, r.splice(t, 1)[0]);
                return r;
            }, I(r, {
                dontValidate: true
            }));
            G(this).handleArrayMove(e, t, n);
            if (!(r?.dontValidate ?? false)) {
                this.validateField(e, `change`);
                this.validateField(`${e}[${t}]`, `change`);
                this.validateField(`${e}[${n}]`, `change`);
            }
        };
        this.clearFieldValues = (e, t)=>{
            let n = this.getFieldValue(e);
            let r = Array.isArray(n) ? Math.max(n.length - 1, 0) : null;
            this.setFieldValue(e, [], I(t, {
                dontValidate: true
            }));
            G(this).bumpArrayVersion(e);
            if (r !== null) {
                for(let t = 0; t <= r; t++){
                    let n = `${e}[${t}]`;
                    this.deleteField(n);
                }
            }
            if (!(t?.dontValidate ?? false)) {
                this.validateField(e, `change`);
            }
        };
        this.resetField = (e)=>{
            this.baseStore.setState((t)=>{
                let n = this.getFieldInfo(e).instance?.options.defaultValue;
                let r = D(this.options.defaultValues, e);
                let i = n ?? r;
                return {
                    ...t,
                    fieldMetaBase: {
                        ...t.fieldMetaBase,
                        [e]: W
                    },
                    values: i === undefined ? t.values : O(t.values, e, i)
                };
            });
        };
        this.setErrorMap = (e)=>{
            v(()=>{
                Object.entries(e).forEach(([e, t])=>{
                    let n = e;
                    if (N(t)) {
                        let { formError, fieldErrors } = K(t);
                        for (let e of Object.keys(this.fieldInfo)){
                            if (this.getFieldMeta(e)) {
                                this.setFieldMeta(e, (t)=>({
                                        ...t,
                                        errorMap: {
                                            ...t.errorMap,
                                            [n]: fieldErrors?.[e]
                                        },
                                        errorSourceMap: {
                                            ...t.errorSourceMap,
                                            [n]: `form`
                                        }
                                    }));
                            }
                        }
                        this.baseStore.setState((t)=>({
                                ...t,
                                errorMap: {
                                    ...t.errorMap,
                                    [n]: formError
                                }
                            }));
                    } else {
                        this.baseStore.setState((e)=>({
                                ...e,
                                errorMap: {
                                    ...e.errorMap,
                                    [n]: t
                                }
                            }));
                    }
                });
            });
        };
        this.getAllErrors = ()=>({
                form: {
                    errors: this.state.errors,
                    errorMap: this.state.errorMap
                },
                fields: Object.entries(this.state.fieldMeta).reduce((acc, [t, n])=>{
                    if (Object.keys(n).length && n.errors.length) {
                        acc[t] = {
                            errors: n.errors,
                            errorMap: n.errorMap
                        };
                    }
                    return acc;
                }, {})
            });
        this.parseValuesWithSchema = (e)=>U.validate({
                value: this.state.values,
                validationSource: `form`
            }, e);
        this.parseValuesWithSchemaAsync = (e)=>U.validateAsync({
                value: this.state.values,
                validationSource: `form`
            }, e);
        this.timeoutIds = {
            validations: {},
            listeners: {},
            formListeners: {}
        };
        this._formId = e?.formId ?? de();
        this._devtoolsSubmissionOverride = false;
        let state = ge({
            ...e?.defaultState,
            values: e?.defaultValues ?? e?.defaultState?.values
        });
        if (e?.transform) {
            state = e.transform({
                state
            }).state;
            for (let e of Object.keys(state.errorMap)){
                let n = state.errorMap[e];
                if (!(n === undefined || !N(n))) {
                    for (let r of Object.keys(n.fields)){
                        let i = n.fields[r];
                        if (i === undefined) {
                            continue;
                        }
                        let a = state.fieldMetaBase[r];
                        state.fieldMetaBase[r] = {
                            isTouched: false,
                            isValidating: false,
                            isBlurred: false,
                            isDirty: false,
                            _arrayVersion: 0,
                            _pendingValidationsCount: 0,
                            ...a ?? {},
                            errorSourceMap: {
                                ...a?.errorSourceMap ?? {},
                                onChange: `form`
                            },
                            errorMap: {
                                ...a?.errorMap ?? {},
                                [e]: i
                            }
                        };
                    }
                }
            }
        }
        this.baseStore = w(state);
        let n;
        this.fieldMetaDerived = w((e)=>{
            let t = this.baseStore.get();
            let r = 0;
            let i = {};
            for (let a of Object.keys(t.fieldMetaBase)){
                let o = t.fieldMetaBase[a];
                let s = n?.fieldMetaBase[a];
                let c = e?.[a];
                let l = D(t.values, a);
                let u = c?.errors;
                if (!s || o.errorMap !== s.errorMap) {
                    u = Object.values(o.errorMap ?? {}).filter((e)=>e !== undefined);
                    let e = this.getFieldInfo(a)?.instance;
                    if (!e || !e.options.disableErrorFlat) {
                        u = u.flat(1);
                    }
                }
                let d = !le(u);
                let f = !o.isDirty;
                let p = P(l, this.getFieldInfo(a)?.instance?.options.defaultValue ?? D(this.options.defaultValues, a));
                if (c && c.isPristine === f && c.isValid === d && c.isDefaultValue === p && c.errors === u && o === s) {
                    i[a] = c;
                    r++;
                    continue;
                }
                i[a] = {
                    ...o,
                    errors: u ?? [],
                    isPristine: f,
                    isValid: d,
                    isDefaultValue: p
                };
            }
            if (Object.keys(t.fieldMetaBase).length) {
                if (e && r === Object.keys(t.fieldMetaBase).length) {
                    return e;
                }
                n = this.baseStore.get();
                return i;
            }
            return i;
        });
        this.formGroupMetaDerived = w((e)=>{
            let t = this.baseStore.get();
            let n = this.fieldMetaDerived.get();
            let r = {};
            for (let i of this.formGroupApis){
                let a = i.name;
                let o = t.formGroupStateBase[a] ?? {
                    isSubmitted: false,
                    isSubmitting: false,
                    isValidating: false,
                    submissionAttempts: 0,
                    isSubmitSuccessful: false
                };
                let s = n[a];
                let c = false;
                let l = true;
                let u = false;
                let d = false;
                let f = true;
                let p = false;
                for(let e in n){
                    if (e === a || !V(a, e)) {
                        continue;
                    }
                    let t = n[e];
                    if (t) {
                        if (t.isValidating) {
                            c = true;
                        }
                        if (!t.isValid) {
                            l = false;
                        }
                        if (t.isTouched) {
                            u = true;
                        }
                        if (t.isBlurred) {
                            d = true;
                        }
                        if (!t.isDefaultValue) {
                            f = false;
                        }
                        if (t.isDirty) {
                            p = true;
                        }
                    }
                }
                let m = !p;
                let h = !!c || o.isValidating;
                let g = s?.errorMap ?? {};
                let _ = s?.errorSourceMap ?? {};
                let v = !!(g.onMount || Object.entries(n).some(([e, t])=>t && e !== a && V(a, e) && t.errorMap.onMount));
                let y = e?.[a];
                let b = y?.errors ?? [];
                if (!y || y.__srcErrorMap !== g) {
                    b = Object.values(g).reduce((acc, item)=>{
                        if (item === undefined) {
                            return acc;
                        }
                        if (item && typeof item == `object` && `fields` in item) {
                            let n = item.group;
                            if (n !== undefined) {
                                acc.push(n);
                            }
                            return acc;
                        }
                        acc.push(item);
                        return acc;
                    }, []);
                }
                let x = b.length === 0;
                let S = l && x;
                let C = i.options.canSubmitWhenInvalid ?? false;
                let ee = o.submissionAttempts === 0 && !u && !v || !h && !o.isSubmitting && S || C;
                if (y && y.errorMap === g && y.errorSourceMap === _ && y.errors === b && y.isFieldsValidating === c && y.isFieldsValid === l && y.isGroupValid === x && y.isValid === S && y.canSubmit === ee && y.isTouched === u && y.isBlurred === d && y.isPristine === m && y.isDefaultValue === f && y.isDirty === p && y.isValidating === h && y.isSubmitting === o.isSubmitting && y.isSubmitted === o.isSubmitted && y.submissionAttempts === o.submissionAttempts && y.isSubmitSuccessful === o.isSubmitSuccessful) {
                    r[a] = y;
                    continue;
                }
                let w = {
                    ...o,
                    errorMap: g,
                    errorSourceMap: _,
                    _arrayVersion: s?._arrayVersion ?? 0,
                    isTouched: u,
                    isBlurred: d,
                    isDirty: p,
                    isPristine: m,
                    isDefaultValue: f,
                    isValid: S,
                    errors: b,
                    isValidating: h,
                    isFieldsValidating: c,
                    isFieldsValid: l,
                    isGroupValid: x,
                    canSubmit: ee
                };
                Object.defineProperty(w, "__srcErrorMap", {
                    value: g,
                    enumerable: false,
                    configurable: true
                });
                r[a] = w;
            }
            return r;
        });
        let r;
        this.store = w((e)=>{
            let t = this.baseStore.get();
            let n = this.fieldMetaDerived.get();
            let i = Object.values(n).filter(Boolean);
            let a = i.some((e)=>e.isValidating);
            let o = i.every((e)=>e.isValid);
            let s = i.some((e)=>e.isTouched);
            let c = i.some((e)=>e.isBlurred);
            let l = i.every((e)=>e.isDefaultValue);
            let u = s && t.errorMap?.onMount;
            let d = i.some((e)=>e.isDirty);
            let f = !d;
            let p = !!(t.errorMap?.onMount || i.some((e)=>e?.errorMap?.onMount));
            let m = !!a;
            let h = e?.errors ?? [];
            if (!r || t.errorMap !== r.errorMap) {
                h = Object.values(t.errorMap).reduce((acc, item)=>{
                    if (item === undefined) {
                        return acc;
                    }
                    if (item && N(item)) {
                        acc.push(item.form);
                        return acc;
                    }
                    acc.push(item);
                    return acc;
                }, []);
            }
            let isFormValid = h.length === 0;
            let _ = o && isFormValid;
            let v = this.options.canSubmitWhenInvalid ?? false;
            let y = t.submissionAttempts === 0 && !s && !p || !m && !t.isSubmitting && _ || v;
            let t_errorMap = t.errorMap;
            if (u) {
                h = h.filter((e)=>e !== t.errorMap.onMount);
                t_errorMap = Object.assign(t_errorMap, {
                    onMount: undefined
                });
            }
            if (e && r && e.errorMap === t_errorMap && e.fieldMeta === this.fieldMetaDerived.state && e.errors === h && e.isFieldsValidating === a && e.isFieldsValid === o && e.isFormValid === isFormValid && e.isValid === _ && e.canSubmit === y && e.isTouched === s && e.isBlurred === c && e.isPristine === f && e.isDefaultValue === l && e.isDirty === d && P(r, t)) {
                return e;
            }
            let x = {
                ...t,
                errorMap: t_errorMap,
                fieldMeta: this.fieldMetaDerived.state,
                errors: h,
                isFieldsValidating: a,
                isFieldsValid: o,
                isFormValid,
                isValid: _,
                canSubmit: y,
                isTouched: s,
                isBlurred: c,
                isPristine: f,
                isDefaultValue: l,
                isDirty: d
            };
            r = this.baseStore.get();
            return x;
        });
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update(e || {});
    }
    get state() {
        return this.store.state;
    }
    get formId() {
        return this._formId;
    }
    runValidator(e) {
        if (he(e.validate)) {
            return U[e.type](e.value, e.validate);
        }
        return e.validate(e.value);
    }
    handleSubmit(e) {
        return this._handleSubmit(e);
    }
}
function K(formError) {
    if (formError) {
        if (N(formError)) {
            return {
                formError: K(formError.form).formError,
                fieldErrors: formError.fields
            };
        }
        return {
            formError
        };
    }
    return {
        formError: undefined
    };
}
function q(e) {
    switch(e){
        case `submit`:
            return `onSubmit`;
        case `blur`:
            return `onBlur`;
        case `mount`:
            return `onMount`;
        case `server`:
            return `onServer`;
        case `dynamic`:
            return `onDynamic`;
        default:
            return `onChange`;
    }
}
const ve = class e {
    constructor(t){
        this.options = {};
        this.mount = ()=>{
            if (this.options.defaultValue !== undefined && !this.getMeta().isTouched) {
                this.form.setFieldValue(this.name, this.options.defaultValue, {
                    dontUpdateMeta: true
                });
            }
            let e = this.getInfo();
            e.instance = this;
            this.update(this.options);
            let { onMount } = this.options.validators || {};
            if (onMount) {
                let e = this.runValidator({
                    validate: onMount,
                    value: {
                        value: this.state.value,
                        fieldApi: this,
                        validationSource: `field`
                    },
                    type: `validate`
                });
                if (e) {
                    this.setMeta((t)=>({
                            ...t,
                            errorMap: {
                                ...t?.errorMap,
                                onMount: e
                            },
                            errorSourceMap: {
                                ...t?.errorSourceMap,
                                onMount: `field`
                            }
                        }));
                }
            }
            this.options.listeners?.onMount?.({
                value: this.state.value,
                fieldApi: this
            });
            return ()=>{
                for (let [e, t] of Object.entries(this.timeoutIds.validations)){
                    if (t) {
                        clearTimeout(t);
                        this.timeoutIds.validations[e] = null;
                    }
                }
                for (let [e, t] of Object.entries(this.timeoutIds.listeners)){
                    if (t) {
                        clearTimeout(t);
                        this.timeoutIds.listeners[e] = null;
                    }
                }
                for (let [e, t] of Object.entries(this.timeoutIds.formListeners)){
                    if (t) {
                        clearTimeout(t);
                        this.timeoutIds.formListeners[e] = null;
                    }
                }
                let e = this.form.fieldInfo[this.name];
                if (e && e.instance === this) {
                    for (let [t, n] of Object.entries(e.validationMetaMap)){
                        n?.lastAbortController.abort();
                        e.validationMetaMap[t] = undefined;
                    }
                    this.form.baseStore.setState((e)=>({
                            ...e,
                            fieldMetaBase: {
                                ...e.fieldMetaBase,
                                [this.name]: {
                                    ...W,
                                    isTouched: e.fieldMetaBase[this.name]?.isTouched ?? W.isTouched,
                                    isBlurred: e.fieldMetaBase[this.name]?.isBlurred ?? W.isBlurred,
                                    isDirty: e.fieldMetaBase[this.name]?.isDirty ?? W.isDirty
                                }
                            }
                        }));
                    e.instance = null;
                    this.options.listeners?.onUnmount?.({
                        value: this.state.value,
                        fieldApi: this
                    });
                    this.form.options.listeners?.onFieldUnmount?.({
                        formApi: this.form,
                        fieldApi: this
                    });
                }
            };
        };
        this.update = (e)=>{
            this.options = e;
            this.name = e.name;
            if (!this.state.meta.isTouched && this.options.defaultValue !== undefined) {
                if (!P(this.form.getFieldValue(this.name), e.defaultValue)) {
                    this.form.setFieldValue(this.name, e.defaultValue, {
                        dontUpdateMeta: true,
                        dontValidate: true,
                        dontRunListeners: true
                    });
                }
            }
            if (!this.form.getFieldMeta(this.name)) {
                this.form.setFieldMeta(this.name, this.state.meta);
            }
        };
        this.getValue = ()=>this.form.getFieldValue(this.name);
        this.setValue = (e, t)=>{
            this.form.setFieldValue(this.name, e, I(t, {
                dontRunListeners: true,
                dontValidate: true
            }));
            if (!t?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
            if (!t?.dontValidate) {
                this.validate(`change`);
            }
        };
        this.getMeta = ()=>this.store.state.meta;
        this.setMeta = (e)=>this.form.setFieldMeta(this.name, e);
        this.getInfo = ()=>this.form.getFieldInfo(this.name);
        this.pushValue = (e, t)=>{
            this.form.pushFieldValue(this.name, e, I(t, {
                dontRunListeners: true
            }));
            if (!t?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
        };
        this.insertValue = (e, t, n)=>{
            this.form.insertFieldValue(this.name, e, t, I(n, {
                dontRunListeners: true
            }));
            if (!n?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
        };
        this.replaceValue = (e, t, n)=>{
            this.form.replaceFieldValue(this.name, e, t, I(n, {
                dontRunListeners: true
            }));
            if (!n?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
        };
        this.removeValue = (e, t)=>{
            this.form.removeFieldValue(this.name, e, I(t, {
                dontRunListeners: true
            }));
            if (!t?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
        };
        this.swapValues = (e, t, n)=>{
            this.form.swapFieldValues(this.name, e, t, I(n, {
                dontRunListeners: true
            }));
            if (!n?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
        };
        this.moveValue = (e, t, n)=>{
            this.form.moveFieldValues(this.name, e, t, I(n, {
                dontRunListeners: true
            }));
            if (!n?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
        };
        this.clearValues = (e)=>{
            this.form.clearFieldValues(this.name, I(e, {
                dontRunListeners: true
            }));
            if (!e?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
        };
        this.getLinkedFields = (t)=>{
            let n = Object.values(this.form.fieldInfo);
            let r = [];
            for (let i of n){
                if (!i.instance || !(i.instance instanceof e)) {
                    continue;
                }
                let { onChangeListenTo, onBlurListenTo } = i.instance.options.validators || {};
                if (t === `change` && onChangeListenTo?.includes(this.name)) {
                    r.push(i.instance);
                }
                if (t === `blur` && onBlurListenTo?.includes(this.name)) {
                    r.push(i.instance);
                }
            }
            return r;
        };
        this.validateSync = (e, t)=>{
            let n = j(e, {
                ...this.options,
                form: this.form,
                fieldName: this.name,
                validationLogic: this.form.options.validationLogic || H
            });
            let r = this.getLinkedFields(e).reduce((acc, item)=>{
                let r = j(e, {
                    ...item.options,
                    form: item.form,
                    fieldName: item.name,
                    validationLogic: item.form.options.validationLogic || H
                });
                r.forEach((e)=>{
                    e.field = item;
                });
                return acc.concat(r);
            }, []);
            let i = false;
            v(()=>{
                let e = (e, n)=>{
                    let r = J(n.cause);
                    let a = n.validate ? ye(e.runValidator({
                        validate: n.validate,
                        value: {
                            value: e.store.state.value,
                            validationSource: `field`,
                            fieldApi: e
                        },
                        type: `validate`
                    })) : undefined;
                    let o = t[r];
                    let { newErrorValue, newSource } = F({
                        formLevelError: o,
                        fieldLevelError: a
                    });
                    if (e.state.meta.errorMap?.[r] !== newErrorValue) {
                        e.setMeta((e)=>({
                                ...e,
                                errorMap: {
                                    ...e.errorMap,
                                    [r]: newErrorValue
                                },
                                errorSourceMap: {
                                    ...e.errorSourceMap,
                                    [r]: newSource
                                }
                            }));
                    }
                    if (newErrorValue) {
                        i = true;
                    }
                };
                for (let t of n){
                    e(this, t);
                }
                for (let t of r){
                    if (t.validate) {
                        e(t.field, t);
                    }
                }
            });
            let a = J(`submit`);
            if (this.state.meta.errorMap?.[a] && e !== `submit` && !i) {
                this.setMeta((e)=>({
                        ...e,
                        errorMap: {
                            ...e.errorMap,
                            [a]: undefined
                        },
                        errorSourceMap: {
                            ...e.errorSourceMap,
                            [a]: undefined
                        }
                    }));
            }
            return {
                hasErrored: i
            };
        };
        this.validateAsync = async (e, t)=>{
            let n = M(e, {
                ...this.options,
                form: this.form,
                fieldName: this.name,
                validationLogic: this.form.options.validationLogic || H
            });
            let r = await t;
            let i = this.getLinkedFields(e).reduce((acc, item)=>{
                let r = M(e, {
                    ...item.options,
                    form: item.form,
                    fieldName: item.name,
                    validationLogic: item.form.options.validationLogic || H
                });
                r.forEach((e)=>{
                    e.field = item;
                });
                return acc.concat(r);
            }, []);
            let a = [];
            let o = [];
            let s = n.some((e)=>e.validate);
            let c = Array.from(new Set(i.filter((e)=>e.validate).map((e)=>e.field)));
            v(()=>{
                if (s) {
                    this.startValidation();
                }
                for (let e of c){
                    e.startValidation();
                }
            });
            let l = (e, t, n)=>{
                let i = J(t.cause);
                let a = e.getInfo();
                a.validationMetaMap[i]?.lastAbortController.abort();
                let o = new AbortController;
                a.validationMetaMap[i] = {
                    lastAbortController: o
                };
                n.push(new Promise(async (resolve)=>{
                    let a;
                    try {
                        a = await new Promise((resolvePromise, rejectPromise)=>{
                            if (e.timeoutIds.validations[t.cause]) {
                                clearTimeout(e.timeoutIds.validations[t.cause]);
                                e.endValidation();
                            }
                            e.timeoutIds.validations[t.cause] = setTimeout(async ()=>{
                                if (o.signal.aborted) {
                                    return resolvePromise(undefined);
                                }
                                try {
                                    resolvePromise(await this.runValidator({
                                        validate: t.validate,
                                        value: {
                                            value: e.store.state.value,
                                            fieldApi: e,
                                            signal: o.signal,
                                            validationSource: `field`
                                        },
                                        type: `validateAsync`
                                    }));
                                } catch (error) {
                                    rejectPromise(error);
                                }
                            }, t.debounceMs);
                        });
                    } catch (error) {
                        a = error;
                    }
                    if (o.signal.aborted) {
                        return resolve(undefined);
                    }
                    let s = ye(a);
                    let c = r[e.name]?.[i];
                    let { newErrorValue, newSource } = F({
                        formLevelError: c,
                        fieldLevelError: s
                    });
                    if (e.getInfo().instance !== e) {
                        return resolve(undefined);
                    }
                    e.setMeta((e)=>({
                            ...e,
                            errorMap: {
                                ...e?.errorMap,
                                [i]: newErrorValue
                            },
                            errorSourceMap: {
                                ...e.errorSourceMap,
                                [i]: newSource
                            }
                        }));
                    resolve(newErrorValue);
                }));
            };
            for (let e of n){
                if (e.validate) {
                    l(this, e, a);
                }
            }
            for (let e of i){
                if (e.validate) {
                    l(e.field, e, o);
                }
            }
            let u = [];
            if (a.length || o.length) {
                u = await Promise.all(a);
                await Promise.all(o);
            }
            v(()=>{
                if (s) {
                    this.endValidation();
                }
                for (let e of c){
                    e.endValidation();
                }
            });
            return u.filter(Boolean);
        };
        this.validate = (e, t)=>{
            if (!this.state.meta.isTouched) {
                return [];
            }
            let n = t?.skipGroupValidation ? [] : Array.from(this.form.formGroupApis).filter((e)=>this.name.startsWith(e.name));
            let r = (t?.skipFormValidation ? {
                fieldsErrorMap: {}
            } : this.form.validateSync(e)).fieldsErrorMap[this.name] ?? {};
            if (!t?.skipFormValidation) {
                for (let group of n){
                    if (group.state.meta.submissionAttempts === 0) {
                        continue;
                    }
                    let { fieldsErrorMap } = this.form.validateSync(e, {
                        group,
                        dontUpdateFormErrorMap: true,
                        filterFieldNames: (e)=>V(group.name, e)
                    });
                    r = {
                        ...r,
                        ...fieldsErrorMap[this.name] ?? {}
                    };
                }
            }
            let { hasErrored } = this.validateSync(e, r);
            let a = new WeakMap;
            for (let t of n){
                let { hasErrored: hasErrored_1 } = t.validateSync(e, {}, {
                    skipRelatedFieldValidation: true
                });
                a.set(t, hasErrored_1);
            }
            if (hasErrored && !this.options.asyncAlways) {
                this.getInfo().validationMetaMap[J(e)]?.lastAbortController.abort();
                let t = [];
                for (let r of n){
                    r.getInfo().validationMetaMap[J(e)]?.lastAbortController.abort();
                    t.push(r.state.meta.errors);
                }
                return [
                    ...this.state.meta.errors,
                    ...t.flat()
                ];
            }
            let o = t?.skipFormValidation ? Promise.resolve({}) : this.form.validateAsync(e);
            let s = this.validateAsync(e, o);
            let c = [];
            for (let t of n){
                if (!(a.get(t) && !t.options.asyncAlways)) {
                    c.push(t.validateAsync(e, o, {
                        skipRelatedFieldValidation: true
                    }));
                }
            }
            if (c.length === 0) {
                return s;
            }
            return Promise.all([
                s,
                ...c
            ]).then((e)=>e.flat());
        };
        this.handleChange = (e)=>{
            this.setValue(e);
        };
        this.handleBlur = ()=>{
            if (!this.state.meta.isTouched) {
                this.setMeta((e)=>({
                        ...e,
                        isTouched: true
                    }));
            }
            if (!this.state.meta.isBlurred) {
                this.setMeta((e)=>({
                        ...e,
                        isBlurred: true
                    }));
            }
            this.validate(`blur`);
            this.triggerOnBlurListener();
        };
        this.setErrorMap = (e)=>{
            this.setMeta((t)=>({
                    ...t,
                    errorMap: {
                        ...t.errorMap,
                        ...e
                    }
                }));
        };
        this.parseValueWithSchema = (e)=>U.validate({
                value: this.state.value,
                validationSource: `field`
            }, e);
        this.parseValueWithSchemaAsync = (e)=>U.validateAsync({
                value: this.state.value,
                validationSource: `field`
            }, e);
        this.triggerOnBlurListener = ()=>{
            let e = this.form.options.listeners?.onBlurDebounceMs;
            if (e && e > 0) {
                if (this.timeoutIds.formListeners.blur) {
                    clearTimeout(this.timeoutIds.formListeners.blur);
                }
                this.timeoutIds.formListeners.blur = setTimeout(()=>{
                    this.form.options.listeners?.onBlur?.({
                        formApi: this.form,
                        fieldApi: this
                    });
                }, e);
            } else {
                this.form.options.listeners?.onBlur?.({
                    formApi: this.form,
                    fieldApi: this
                });
            }
            let t = this.options.listeners?.onBlurDebounceMs;
            if (t && t > 0) {
                if (this.timeoutIds.listeners.blur) {
                    clearTimeout(this.timeoutIds.listeners.blur);
                }
                this.timeoutIds.listeners.blur = setTimeout(()=>{
                    this.options.listeners?.onBlur?.({
                        value: this.state.value,
                        fieldApi: this
                    });
                }, t);
            } else {
                this.options.listeners?.onBlur?.({
                    value: this.state.value,
                    fieldApi: this
                });
            }
        };
        this.triggerOnChangeListener = ()=>{
            let e = this.form.options.listeners?.onChangeDebounceMs;
            if (e && e > 0) {
                if (this.timeoutIds.formListeners.change) {
                    clearTimeout(this.timeoutIds.formListeners.change);
                }
                this.timeoutIds.formListeners.change = setTimeout(()=>{
                    this.form.options.listeners?.onChange?.({
                        formApi: this.form,
                        fieldApi: this
                    });
                }, e);
            } else {
                this.form.options.listeners?.onChange?.({
                    formApi: this.form,
                    fieldApi: this
                });
            }
            let t = this.options.listeners?.onChangeDebounceMs;
            if (t && t > 0) {
                if (this.timeoutIds.listeners.change) {
                    clearTimeout(this.timeoutIds.listeners.change);
                }
                this.timeoutIds.listeners.change = setTimeout(()=>{
                    this.options.listeners?.onChange?.({
                        value: this.state.value,
                        fieldApi: this
                    });
                }, t);
            } else {
                this.options.listeners?.onChange?.({
                    value: this.state.value,
                    fieldApi: this
                });
            }
            for (let e of this.form.formGroupApis){
                if (V(e.name, this.name)) {
                    e.triggerOnChangeListener();
                }
            }
        };
        this.triggerOnSubmitListener = ()=>{
            this.options.listeners?.onSubmit?.({
                value: this.state.value,
                fieldApi: this
            });
        };
        this.form = t.form;
        this.name = t.name;
        this.options = t;
        this.timeoutIds = {
            validations: {},
            listeners: {},
            formListeners: {}
        };
        this.store = w((e)=>{
            this.form.store.get();
            let n = this.form.getFieldMeta(this.name) ?? {
                ...W,
                ...t.defaultMeta
            };
            let r = this.form.getFieldValue(this.name);
            if (!n.isTouched && r === undefined && this.options.defaultValue !== undefined && !P(r, this.options.defaultValue)) {
                r = this.options.defaultValue;
            }
            if (e && e.value === r && e.meta === n) {
                return e;
            }
            return {
                value: r,
                meta: n
            };
        });
    }
    get state() {
        return this.store.state;
    }
    runValidator(e) {
        if (he(e.validate)) {
            return U[e.type](e.value, e.validate);
        }
        return e.validate(e.value);
    }
    startValidation() {
        this.setMeta((e)=>{
            let t = e._pendingValidationsCount + 1;
            return {
                ...e,
                _pendingValidationsCount: t,
                isValidating: t > 0 && !e.isValidating ? true : e.isValidating
            };
        });
    }
    endValidation() {
        this.setMeta((e)=>{
            let t = Math.max(0, e._pendingValidationsCount - 1);
            return {
                ...e,
                _pendingValidationsCount: t,
                isValidating: t === 0 && e.isValidating ? false : e.isValidating
            };
        });
    }
};
function ye(e) {
    if (e) {
        return e;
    }
}
function J(e) {
    switch(e){
        case `submit`:
            return `onSubmit`;
        case `blur`:
            return `onBlur`;
        case `mount`:
            return `onMount`;
        case `server`:
            return `onServer`;
        case `dynamic`:
            return `onDynamic`;
        default:
            return `onChange`;
    }
}
function be(e) {
    return {
        isSubmitted: e.isSubmitted ?? false,
        isSubmitting: e.isSubmitting ?? false,
        isValidating: e.isValidating ?? false,
        submissionAttempts: e.submissionAttempts ?? 0,
        isSubmitSuccessful: e.isSubmitSuccessful ?? false
    };
}
function xe(defaultMeta) {
    return {
        ...W,
        ...defaultMeta,
        errors: [],
        isPristine: true,
        isValid: true,
        isDefaultValue: true,
        isFieldsValidating: false,
        isFieldsValid: true,
        isGroupValid: true,
        canSubmit: true,
        isSubmitting: false,
        isSubmitted: false,
        isValidating: false,
        submissionAttempts: 0,
        isSubmitSuccessful: false
    };
}
const Se = class e {
    constructor(t){
        this.options = {};
        this.setFormGroupState = (e)=>{
            this.form.baseStore.setState((t)=>{
                let n = t.formGroupStateBase[this.name] ?? be({});
                return {
                    ...t,
                    formGroupStateBase: {
                        ...t.formGroupStateBase,
                        [this.name]: e(n)
                    }
                };
            });
        };
        this._lastDistributedFieldNames = {};
        this.update = (e)=>{
            this.options = e;
            this.name = e.name;
            if (!this.state.meta.isTouched && this.options.defaultValue !== undefined) {
                if (!P(this.form.getFieldValue(this.name), e.defaultValue)) {
                    this.form.setFieldValue(this.name, e.defaultValue, {
                        dontUpdateMeta: true,
                        dontValidate: true,
                        dontRunListeners: true
                    });
                }
            }
            if (!this.form.getFieldMeta(this.name)) {
                this.form.setFieldMeta(this.name, {
                    ...W,
                    ...this.options.defaultMeta
                });
            }
        };
        this.mount = ()=>{
            this.update(this.options);
            this.form.formGroupApis.add(this);
            this.fieldInfo.instance = this;
            this.form.baseStore.setState((e)=>({
                    ...e,
                    formGroupStateBase: {
                        ...e.formGroupStateBase,
                        [this.name]: e.formGroupStateBase[this.name] ?? be({
                            ...this.options.defaultState
                        })
                    }
                }));
            let { onMount } = this.options.validators || {};
            if (onMount) {
                let t = this.runValidator({
                    validate: onMount,
                    value: {
                        value: this.state.value,
                        groupApi: this,
                        validationSource: `form`
                    },
                    type: `validate`
                });
                let n = t;
                let r;
                if (we(t)) {
                    n = t.group;
                    r = t.fields;
                }
                let i = Ce(n);
                if (i) {
                    this.setMeta((e)=>({
                            ...e,
                            errorMap: {
                                ...e.errorMap,
                                onMount: i
                            },
                            errorSourceMap: {
                                ...e.errorSourceMap,
                                onMount: `field`
                            }
                        }));
                }
                this.distributeFieldErrors(`onMount`, r);
            }
            this.options.listeners?.onMount?.({
                value: this.state.value,
                groupApi: this
            });
            return ()=>{
                for (let [e, t] of Object.entries(this.timeoutIds.validations)){
                    if (t) {
                        clearTimeout(t);
                        this.timeoutIds.validations[e] = null;
                    }
                }
                for (let [e, t] of Object.entries(this.timeoutIds.listeners)){
                    if (t) {
                        clearTimeout(t);
                        this.timeoutIds.listeners[e] = null;
                    }
                }
                for (let [e, t] of Object.entries(this.timeoutIds.formListeners)){
                    if (t) {
                        clearTimeout(t);
                        this.timeoutIds.formListeners[e] = null;
                    }
                }
                if (this.fieldInfo.instance === this) {
                    for (let [e, t] of Object.entries(this.fieldInfo.validationMetaMap)){
                        t?.lastAbortController.abort();
                        this.fieldInfo.validationMetaMap[e] = undefined;
                    }
                    this.form.formGroupApis.delete(this);
                    this.form.baseStore.setState((e)=>({
                            ...e,
                            formGroupStateBase: {
                                ...e.formGroupStateBase,
                                [this.name]: be({})
                            }
                        }));
                    this.fieldInfo.instance = null;
                    this.options.listeners?.onUnmount?.({
                        value: this.state.value,
                        groupApi: this
                    });
                }
            };
        };
        this.setValue = (e, t)=>{
            this.form.setFieldValue(this.name, e, I(t, {
                dontRunListeners: true,
                dontValidate: true
            }));
            if (!t?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
            if (!t?.dontValidate) {
                this.validate(`change`);
            }
        };
        this.getMeta = ()=>this.store.state.meta;
        this.setMeta = (e)=>this.form.setFieldMeta(this.name, e);
        this.getInfo = ()=>this.fieldInfo;
        this.getRelatedFields = ()=>{
            let e = Object.values(this.form.fieldInfo);
            let t = [];
            for (let n of e){
                if (n.instance && n.instance instanceof ve && n.instance.name.startsWith(this.name)) {
                    t.push(n.instance);
                }
            }
            return t;
        };
        this.getRelatedFieldMetasDerived = ()=>{
            let e = Object.entries(this.form.fieldMetaDerived.state);
            let t = [];
            for (let [n, r] of e){
                if (n !== this.name && V(this.name, n)) {
                    t.push({
                        ...r,
                        name: n
                    });
                }
            }
            return t;
        };
        this.buildChildFieldName = (e)=>{
            if (e === ``) {
                return this.name;
            }
            if (e.startsWith(`[`)) {
                return `${this.name}${e}`;
            }
            return `${this.name}.${e}`;
        };
        this.distributeFieldErrors = (e, t)=>{
            let n = this._lastDistributedFieldNames[e] ?? new Set;
            let r = new Set;
            if (t) {
                for (let [e, n] of Object.entries(t)){
                    if (!(n == null || n === false)) {
                        r.add(this.buildChildFieldName(e));
                    }
                }
            }
            let i = new Set([
                ...n,
                ...r
            ]);
            let a = false;
            for (let n of i){
                let r = n.startsWith(this.name + `[`) ? n.slice(this.name.length) : n.slice(this.name.length + 1);
                let i = t?.[r];
                let o = this.form.getFieldMeta(n);
                if (!o && !i) {
                    continue;
                }
                let previousErrorValue = o?.errorMap[e];
                let { newErrorValue, newSource } = ue({
                    newFormValidatorError: i,
                    isPreviousErrorFromFormValidator: o?.errorSourceMap[e] === `form`,
                    previousErrorValue
                });
                if (newErrorValue) {
                    a = true;
                }
                if (!(previousErrorValue === newErrorValue && o?.errorSourceMap[e] === newSource)) {
                    this.form.setFieldMeta(n, (t = W)=>({
                            ...t,
                            errorMap: {
                                ...t.errorMap,
                                [e]: newErrorValue
                            },
                            errorSourceMap: {
                                ...t.errorSourceMap,
                                [e]: newSource
                            }
                        }));
                }
            }
            this._lastDistributedFieldNames[e] = r;
            return a;
        };
        this.validateSync = (t, n, r = {})=>{
            let i = j(t, {
                ...this.options,
                form: this.form,
                group: this,
                validationLogic: this.options.validationLogic || this.form.options.validationLogic || H
            });
            let a = (r.skipRelatedFieldValidation ? [] : this.getRelatedFields()).reduce((acc, item)=>{
                let r = j(t, {
                    ...item.options,
                    form: item.form,
                    validationLogic: item.form.options.validationLogic || H
                });
                r.forEach((e)=>{
                    e.field = item;
                });
                return acc.concat(r);
            }, []);
            let o = false;
            v(()=>{
                let t = (t, r)=>{
                    let i = Y(r.cause);
                    let a = t === this;
                    let s;
                    if (r.validate) {
                        s = t.runValidator({
                            validate: r.validate,
                            value: {
                                value: t.store.state.value,
                                validationSource: a ? `form` : `field`,
                                ...t instanceof e ? {
                                    groupApi: t
                                } : {
                                    fieldApi: t
                                }
                            },
                            type: `validate`
                        });
                    }
                    let c = s;
                    let l;
                    if (a && we(s)) {
                        c = s.group;
                        l = s.fields;
                    }
                    let u = Ce(c);
                    let d = n[i];
                    let { newErrorValue, newSource } = F({
                        formLevelError: d,
                        fieldLevelError: u
                    });
                    if (t.state.meta.errorMap?.[i] !== newErrorValue) {
                        t.setMeta((e)=>({
                                ...e,
                                errorMap: {
                                    ...e.errorMap,
                                    [i]: newErrorValue
                                },
                                errorSourceMap: {
                                    ...e.errorSourceMap,
                                    [i]: newSource
                                }
                            }));
                    }
                    if (newErrorValue) {
                        o = true;
                    }
                    if (a && this.distributeFieldErrors(i, l)) {
                        o = true;
                    }
                };
                for (let e of i){
                    t(this, e);
                }
                for (let e of a){
                    if (e.validate) {
                        t(e.field, e);
                    }
                }
            });
            let s = Y(`submit`);
            if (this.state.meta.errorMap?.[s] && t !== `submit` && !o) {
                this.setMeta((e)=>({
                        ...e,
                        errorMap: {
                            ...e.errorMap,
                            [s]: undefined
                        },
                        errorSourceMap: {
                            ...e.errorSourceMap,
                            [s]: undefined
                        }
                    }));
            }
            return {
                hasErrored: o
            };
        };
        this.validateAsync = async (t, n, r = {})=>{
            let i = M(t, {
                ...this.options,
                form: this.form,
                group: this,
                validationLogic: this.options.validationLogic || this.form.options.validationLogic || H
            });
            let a = await n;
            let o = r.skipRelatedFieldValidation ? [] : this.getRelatedFields();
            let s = o.reduce((acc, item)=>{
                let r = M(t, {
                    ...item.options,
                    form: item.form,
                    validationLogic: item.form.options.validationLogic || H
                });
                r.forEach((e)=>{
                    e.field = item;
                });
                return acc.concat(r);
            }, []);
            let c = [];
            let l = [];
            let u = i.some((e)=>e.validate) || s.some((e)=>e.validate);
            if (u) {
                if (!this.state.meta.isValidating) {
                    this.setMeta((e)=>({
                            ...e,
                            isValidating: true
                        }));
                }
                for (let e of o){
                    e.setMeta((e)=>({
                            ...e,
                            isValidating: true
                        }));
                }
            }
            let d = (t, n, r)=>{
                let i = Y(n.cause);
                let o = t.getInfo();
                o.validationMetaMap[i]?.lastAbortController.abort();
                let s = new AbortController;
                o.validationMetaMap[i] = {
                    lastAbortController: s
                };
                let c = t === this;
                r.push(new Promise(async (resolve)=>{
                    let o;
                    try {
                        o = await new Promise((resolvePromise, rejectPromise)=>{
                            if (t.timeoutIds.validations[n.cause]) {
                                clearTimeout(t.timeoutIds.validations[n.cause]);
                            }
                            t.timeoutIds.validations[n.cause] = setTimeout(async ()=>{
                                if (s.signal.aborted) {
                                    return resolvePromise(undefined);
                                }
                                try {
                                    resolvePromise(await this.runValidator({
                                        validate: n.validate,
                                        value: {
                                            value: t.store.state.value,
                                            signal: s.signal,
                                            validationSource: c ? `form` : `field`,
                                            ...t instanceof e ? {
                                                groupApi: t
                                            } : {
                                                fieldApi: t
                                            }
                                        },
                                        type: `validateAsync`
                                    }));
                                } catch (error) {
                                    rejectPromise(error);
                                }
                            }, n.debounceMs);
                        });
                    } catch (error) {
                        o = error;
                    }
                    if (s.signal.aborted) {
                        return resolve(undefined);
                    }
                    let l = o;
                    let u;
                    if (c && we(o)) {
                        l = o.group;
                        u = o.fields;
                    }
                    let d = Ce(l);
                    let f = a[t.name]?.[i];
                    let { newErrorValue, newSource } = F({
                        formLevelError: f,
                        fieldLevelError: d
                    });
                    if (t.getInfo().instance !== t) {
                        return resolve(undefined);
                    }
                    t.setMeta((e)=>({
                            ...e,
                            errorMap: {
                                ...e?.errorMap,
                                [i]: newErrorValue
                            },
                            errorSourceMap: {
                                ...e.errorSourceMap,
                                [i]: newSource
                            }
                        }));
                    if (c) {
                        this.distributeFieldErrors(i, u);
                    }
                    resolve(newErrorValue);
                }));
            };
            for (let e of i){
                if (e.validate) {
                    d(this, e, c);
                }
            }
            for (let e of s){
                if (e.validate) {
                    d(e.field, e, l);
                }
            }
            let f = [];
            if (c.length || l.length) {
                f = await Promise.all(c);
                await Promise.all(l);
            }
            if (u) {
                this.setMeta((e)=>({
                        ...e,
                        isValidating: false
                    }));
                for (let e of o){
                    e.setMeta((e)=>({
                            ...e,
                            isValidating: false
                        }));
                }
            }
            return f.filter(Boolean);
        };
        this.validateAllFields = async (e)=>{
            let t = [];
            v(()=>{
                Object.values(this.getRelatedFields()).forEach((n)=>{
                    t.push(Promise.resolve().then(()=>n.validate(e, {
                            skipFormValidation: true,
                            skipGroupValidation: true
                        })));
                    if (!n.store.state.meta.isTouched) {
                        n.setMeta((e)=>({
                                ...e,
                                isTouched: true
                            }));
                    }
                });
            });
            return (await Promise.all(t)).flat();
        };
        this.validateArrayFieldsStartingFrom = (e, t, n)=>this.form.validateArrayFieldsStartingFrom(e, t, n);
        this.validateField = (e, t)=>this.form.validateField(e, t);
        this.getFieldValue = (e)=>this.form.getFieldValue(e);
        this.getFieldMeta = (e)=>this.form.getFieldMeta(e);
        this.setFieldMeta = (e, t)=>this.form.setFieldMeta(e, t);
        this.setFieldValue = (e, t)=>this.form.setFieldValue(e, t);
        this.deleteField = (e)=>this.form.deleteField(e);
        this.pushFieldValue = (e, t)=>this.form.pushFieldValue(e, t);
        this.insertFieldValue = (e, t, n)=>this.form.insertFieldValue(e, t, n);
        this.replaceFieldValue = (e, t, n)=>this.form.replaceFieldValue(e, t, n);
        this.swapFieldValues = (e, t, n)=>this.form.swapFieldValues(e, t, n);
        this.moveFieldValues = (e, t, n)=>this.form.moveFieldValues(e, t, n);
        this.clearFieldValues = (e)=>this.form.clearFieldValues(e);
        this.resetField = (e)=>this.form.resetField(e);
        this.removeFieldValue = (e, t)=>this.form.removeFieldValue(e, t);
        this.areRelatedFieldsValid = ()=>Object.values(this.getRelatedFields()).every((e)=>e.state.meta.isValid);
        this.validate = (e, t)=>{
            let { fieldsErrorMap } = t?.skipFormValidation ? {
                fieldsErrorMap: {}
            } : this.form.validateSync(e, {
                dontUpdateFormErrorMap: true,
                filterFieldNames: (e)=>V(this.name, e)
            });
            let { hasErrored } = this.validateSync(e, fieldsErrorMap[this.name] ?? {}, {
                skipRelatedFieldValidation: t?.skipRelatedFieldValidation
            });
            if (hasErrored && !this.options.asyncAlways) {
                this.getInfo().validationMetaMap[Y(e)]?.lastAbortController.abort();
                return this.state.meta.errors;
            }
            let i = t?.skipFormValidation ? Promise.resolve({}) : this.form.validateAsync(e, {
                dontUpdateFormErrorMap: true,
                filterFieldNames: (e)=>V(this.name, e)
            });
            return this.validateAsync(e, i, {
                skipRelatedFieldValidation: t?.skipRelatedFieldValidation
            });
        };
        this.triggerOnChangeListener = ()=>{
            let e = this.form.options.listeners?.onChangeGroupDebounceMs;
            if (e && e > 0) {
                if (this.timeoutIds.formListeners.change) {
                    clearTimeout(this.timeoutIds.formListeners.change);
                }
                this.timeoutIds.formListeners.change = setTimeout(()=>{
                    this.form.options.listeners?.onChangeGroup?.({
                        formApi: this.form,
                        groupApi: this
                    });
                }, e);
            } else {
                this.form.options.listeners?.onChangeGroup?.({
                    formApi: this.form,
                    groupApi: this
                });
            }
            let t = this.options.listeners?.onChangeDebounceMs;
            if (t && t > 0) {
                if (this.timeoutIds.listeners.change) {
                    clearTimeout(this.timeoutIds.listeners.change);
                }
                this.timeoutIds.listeners.change = setTimeout(()=>{
                    this.options.listeners?.onChange?.({
                        value: this.state.value,
                        groupApi: this
                    });
                }, t);
            } else {
                this.options.listeners?.onChange?.({
                    value: this.state.value,
                    groupApi: this
                });
            }
        };
        this.triggerOnSubmitListener = ()=>{
            this.options.listeners?.onSubmit?.({
                value: this.state.value,
                groupApi: this
            });
        };
        this._handleSubmit = async (e)=>{
            this.setFormGroupState((e)=>({
                    ...e,
                    isSubmitted: false,
                    submissionAttempts: e.submissionAttempts + 1,
                    isSubmitSuccessful: false
                }));
            v(()=>{
                Object.values(this.getRelatedFields()).forEach((e)=>{
                    if (!e.state.meta.isTouched) {
                        e.setMeta((e)=>({
                                ...e,
                                isTouched: true
                            }));
                    }
                });
            });
            let t = e ?? this.options.onSubmitMeta;
            this.setFormGroupState((e)=>({
                    ...e,
                    isSubmitting: true
                }));
            let n = ()=>{
                this.setFormGroupState((e)=>({
                        ...e,
                        isSubmitting: false
                    }));
            };
            await this.validateAllFields(`submit`);
            if (!this.areRelatedFieldsValid()) {
                n();
                this.options.onGroupSubmitInvalid?.({
                    value: this.state.value,
                    groupApi: this,
                    meta: t
                });
                return;
            }
            await this.validate(`submit`, {
                skipRelatedFieldValidation: true
            });
            if (!this.areRelatedFieldsValid() || !this.state.meta.isValid) {
                n();
                this.options.onGroupSubmitInvalid?.({
                    value: this.state.value,
                    groupApi: this,
                    meta: t
                });
                return;
            }
            v(()=>{
                Object.values(this.getRelatedFields()).forEach((e)=>{
                    e.options.listeners?.onGroupSubmit?.({
                        value: e.state.value,
                        fieldApi: e
                    });
                });
            });
            this.options.listeners?.onSubmit?.({
                groupApi: this,
                value: this.state.value
            });
            try {
                await this.options.onGroupSubmit?.({
                    value: this.state.value,
                    groupApi: this,
                    meta: t
                });
                v(()=>{
                    this.setFormGroupState((e)=>({
                            ...e,
                            isSubmitted: true,
                            isSubmitSuccessful: true
                        }));
                    n();
                });
            } catch (error) {
                this.setFormGroupState((e)=>({
                        ...e,
                        isSubmitSuccessful: false
                    }));
                n();
                throw error;
            }
        };
        this.form = t.form;
        this.name = t.name;
        this.options = t;
        this.timeoutIds = {
            validations: {},
            listeners: {},
            formListeners: {}
        };
        this.fieldInfo = {
            instance: null,
            validationMetaMap: {
                onChange: undefined,
                onBlur: undefined,
                onSubmit: undefined,
                onMount: undefined,
                onServer: undefined,
                onDynamic: undefined
            }
        };
        this.store = w((e)=>{
            this.form.formGroupMetaDerived.get();
            this.form.baseStore.get();
            let n = this.form.getFormGroupMeta(this.name) ?? xe(t.defaultMeta);
            let r = this.form.getFieldValue(this.name);
            if (!n.isTouched && r === undefined && this.options.defaultValue !== undefined && !P(r, this.options.defaultValue)) {
                r = this.options.defaultValue;
            }
            if (e && e.value === r && e.meta === n) {
                return e;
            }
            return {
                value: r,
                meta: n
            };
        });
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    get state() {
        return this.store.state;
    }
    runValidator(e) {
        if (he(e.validate)) {
            let t = U[e.type](e.value, e.validate);
            if (e.type === `validate`) {
                return Te(t);
            }
            return t.then(Te);
        }
        return e.validate(e.value);
    }
    handleSubmit(e) {
        return this._handleSubmit(e);
    }
};
function Ce(e) {
    if (e) {
        return e;
    }
}
function we(e) {
    return !!e && typeof e == `object` && `fields` in e;
}
function Te(e) {
    if (!e || typeof e != `object` || !(`form` in e) && !(`fields` in e)) {
        return e;
    }
    let { form, fields, ...rest } = e;
    return {
        ...rest,
        group: form,
        fields
    };
}
function Y(e) {
    switch(e){
        case `submit`:
            return `onSubmit`;
        case `blur`:
            return `onBlur`;
        case `mount`:
            return `onMount`;
        case `server`:
            return `onServer`;
        case `dynamic`:
            return `onDynamic`;
        default:
            return `onChange`;
    }
}
function Ee(e, transform) {
    if (!transform) {
        return;
    }
    let n = {
        ...e,
        state: B(e.state)
    };
    transform(n);
    if (n.fieldInfo !== e.fieldInfo) {
        e.fieldInfo = n.fieldInfo;
    }
    if (n.options !== e.options) {
        e.options = n.options;
    }
    let r = Object.keys({
        values: null,
        validationMetaMap: null,
        fieldMetaBase: null,
        formGroupStateBase: null,
        isSubmitting: null,
        isSubmitted: null,
        isValidating: null,
        submissionAttempts: null,
        isSubmitSuccessful: null,
        _force_re_eval: null
    }).reduce((acc, key)=>{
        if (e.state[key] !== n.state[key]) {
            acc[key] = n.state[key];
        }
        return acc;
    }, {});
    v(()=>{
        if (Object.keys(r).length) {
            e.baseStore.setState((e)=>({
                    ...e,
                    ...r
                }));
        }
        if (n.state.errorMap !== e.state.errorMap) {
            e.setErrorMap(n.state.errorMap);
        }
    });
    return n;
}
const X = s_1(n(), 1);
const De = n_2();
function Oe(e, t) {
    return e === t;
}
function useZ(e, t = (e)=>e, n) {
    let r = n?.compare ?? Oe;
    let i = X.useCallback((t)=>{
        let { unsubscribe } = e.subscribe(t);
        return unsubscribe;
    }, [
        e
    ]);
    let a = X.useCallback(()=>e.get(), [
        e
    ]);
    return De.useSyncExternalStoreWithSelector(i, a, a, t, r);
}
const Q = t();
const $ = typeof window < `u` ? X.useLayoutEffect : X.useEffect;
function useKe(rest) {
    let [t, setT] = X.useState(()=>({
            form: rest.form,
            name: rest.name
        }));
    let [r, setR] = X.useState(()=>new ve({
            ...rest
        }));
    let a = r;
    if (t.form !== rest.form || t.name !== rest.name) {
        a = new ve({
            ...rest
        });
        setR(a);
        setT({
            form: rest.form,
            name: rest.name
        });
    }
    let o = useZ(a.store, rest.mode === `array` ? (e)=>e.meta._arrayVersion || 0 : (e)=>e.value);
    let s = useZ(a.store, (e)=>e.meta.isTouched);
    let c = useZ(a.store, (e)=>e.meta.isBlurred);
    let l = useZ(a.store, (e)=>e.meta.isDirty);
    let u = useZ(a.store, (e)=>e.meta.errorMap);
    let d = useZ(a.store, (e)=>e.meta.errorSourceMap);
    let f = useZ(a.store, (e)=>e.meta.isValidating);
    let p = X.useMemo(()=>({
            ...a,
            get state () {
                return {
                    value: rest.mode === `array` ? a.state.value : o,
                    get meta () {
                        return {
                            ...a.state.meta,
                            isTouched: s,
                            isBlurred: c,
                            isDirty: l,
                            errorMap: u,
                            errorSourceMap: d,
                            isValidating: f
                        };
                    }
                };
            }
        }), [
        a,
        rest.mode,
        o,
        s,
        c,
        l,
        u,
        d,
        f
    ]);
    $(a.mount, [
        a
    ]);
    $(()=>{
        a.update(rest);
    });
    return p;
}
const AeComponent = ({ children, ...rest })=>{
    let n = useKe(rest);
    return <>{X.useMemo(()=>E(children, n), [
        children,
        n
    ])}</>;
};
function useJe() {
    return X.useState(()=>de())[0];
}
const Ne = `19.2.4`.split(`.`)[0] === `17` ? useJe : X.useId;
function usePe(rest) {
    let [t, setT] = X.useState(()=>({
            form: rest.form,
            name: rest.name
        }));
    let [r, setR] = X.useState(()=>new Se({
            ...rest
        }));
    if (t.form !== rest.form || t.name !== rest.name) {
        setR(new Se({
            ...rest
        }));
        setT({
            form: rest.form,
            name: rest.name
        });
    }
    let a = useZ(r.store, (e)=>e.value);
    let o = useZ(r.store, (e)=>e.meta.isTouched);
    let s = useZ(r.store, (e)=>e.meta.isBlurred);
    let c = useZ(r.store, (e)=>e.meta.isDirty);
    let l = useZ(r.store, (e)=>e.meta.errorMap);
    let u = useZ(r.store, (e)=>e.meta.errorSourceMap);
    let d = useZ(r.store, (e)=>e.meta.isValidating);
    let isSubmitting = useZ(r.store, (e)=>e.meta.isSubmitting);
    let isSubmitted = useZ(r.store, (e)=>e.meta.isSubmitted);
    let submissionAttempts = useZ(r.store, (e)=>e.meta.submissionAttempts);
    let isSubmitSuccessful = useZ(r.store, (e)=>e.meta.isSubmitSuccessful);
    let g = useZ(r.store, (e)=>e.meta.canSubmit);
    let _ = useZ(r.store, (e)=>e.meta.isValid);
    let v = useZ(r.store, (e)=>e.meta.isFieldsValid);
    let y = useZ(r.store, (e)=>e.meta.isFieldsValidating);
    let b = useZ(r.store, (e)=>e.meta.isGroupValid);
    let x = X.useMemo(()=>({
            ...r,
            handleSubmit: (...e)=>r._handleSubmit(...e),
            get state () {
                return {
                    ...r.state,
                    value: a,
                    get meta () {
                        return {
                            ...r.state.meta,
                            isTouched: o,
                            isBlurred: s,
                            isDirty: c,
                            errorMap: l,
                            errorSourceMap: u,
                            isValidating: d,
                            isSubmitting,
                            isSubmitted,
                            submissionAttempts,
                            isSubmitSuccessful,
                            canSubmit: g,
                            isValid: _,
                            isFieldsValid: v,
                            isFieldsValidating: y,
                            isGroupValid: b
                        };
                    }
                };
            }
        }), [
        r,
        a,
        o,
        s,
        c,
        l,
        u,
        d,
        isSubmitting,
        isSubmitted,
        submissionAttempts,
        isSubmitSuccessful,
        g,
        _,
        v,
        y,
        b
    ]);
    $(r.mount, [
        r
    ]);
    $(()=>{
        r.update(rest);
    });
    return x;
}
const FeComponent = ({ children, ...rest })=>{
    let n = usePe(rest);
    return <>{X.useMemo(()=>E(children, n), [
        children,
        n
    ])}</>;
};
function IeComponent({ form, selector = (e)=>e, children }) {
    return <>{E(children, useZ(form.store, selector))}</>;
}
function useLe(e) {
    let t = Ne();
    let [n, setN] = X.useState(e?.formId);
    let [i, setI] = X.useState(()=>new _e({
            ...e,
            formId: e?.formId ?? t
        }));
    if (n !== e?.formId) {
        let formId = e?.formId ?? t;
        setI(new _e({
            ...e,
            formId
        }));
        setN(formId);
    }
    let o = X.useMemo(()=>{
        let e = {
            ...i,
            handleSubmit: (...e)=>i._handleSubmit(...e),
            get formId () {
                return i._formId;
            },
            get state () {
                return i.store.state;
            }
        };
        e.Field = function(e) {
            return <AeComponent {...e} form={i}/>;
        };
        e.FormGroup = function(e) {
            return <FeComponent {...e} form={i}/>;
        };
        e.Subscribe = function(e) {
            return <IeComponent form={i} selector={e.selector}>{e.children}</IeComponent>;
        };
        return e;
    }, [
        i
    ]);
    $(i.mount, []);
    $(()=>{
        i.update(e);
    });
    let sRef = X.useRef(false);
    $(()=>{
        if (sRef.current && e?.transform) {
            Ee(i, e.transform);
        }
    }, [
        i,
        e?.transform
    ]);
    $(()=>{
        sRef.current = true;
    });
    return o;
}
export { useZ as n, useLe as t };
