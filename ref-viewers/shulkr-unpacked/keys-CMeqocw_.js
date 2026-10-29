import { v, x } from "./keys-CMeqocw_/chunk_v.js";
import { D, O } from "./keys-CMeqocw_/chunk_D.js";
import { n, s as s_1, t as t_1 } from "./jsx-runtime-Db0DjQYK.js";
class r {
    constructor(){
        this.listeners = new Set;
        this.subscribe = this.subscribe.bind(this);
    }
    subscribe(e) {
        this.listeners.add(e);
        this.onSubscribe();
        return ()=>{
            this.listeners.delete(e);
            this.onUnsubscribe();
        };
    }
    hasListeners() {
        return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
}
const i = new class extends r {
    #e;
    #t;
    #n;
    constructor(){
        super();
        this.#n = (e)=>{
            if (typeof window < `u` && window.addEventListener) {
                let t = ()=>e();
                window.addEventListener(`visibilitychange`, t, false);
                return ()=>{
                    window.removeEventListener(`visibilitychange`, t);
                };
            }
        };
    }
    onSubscribe() {
        if (!this.#t) {
            this.setEventListener(this.#n);
        }
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            this.#t?.();
            this.#t = undefined;
        }
    }
    setEventListener(e) {
        this.#n = e;
        this.#t?.();
        this.#t = e((e)=>{
            if (typeof e == `boolean`) {
                this.setFocused(e);
            } else {
                this.onFocus();
            }
        });
    }
    setFocused(e) {
        if (this.#e !== e) {
            this.#e = e;
            this.onFocus();
        }
    }
    onFocus() {
        let e = this.isFocused();
        this.listeners.forEach((t)=>{
            t(e);
        });
    }
    isFocused() {
        if (typeof this.#e == `boolean`) {
            return this.#e;
        }
        return globalThis.document?.visibilityState !== `hidden`;
    }
};
const a = {
    setTimeout: (e, t)=>setTimeout(e, t),
    clearTimeout: (e)=>clearTimeout(e),
    setInterval: (e, t)=>setInterval(e, t),
    clearInterval: (e)=>clearInterval(e)
};
const o = new class {
    #e = a;
    setTimeoutProvider(e) {
        this.#e = e;
    }
    setTimeout(e, t) {
        return this.#e.setTimeout(e, t);
    }
    clearTimeout(e) {
        this.#e.clearTimeout(e);
    }
    setInterval(e, t) {
        return this.#e.setInterval(e, t);
    }
    clearInterval(e) {
        this.#e.clearInterval(e);
    }
};
function s(e) {
    setTimeout(e, 0);
}
const c = typeof window > `u` || `Deno` in globalThis;
export function T() {}
export function b(e, t) {
    if (typeof e == `function`) {
        return e(t);
    }
    return e;
}
function d(e) {
    return typeof e == `number` && e >= 0 && e !== Infinity;
}
function f(e, t) {
    return Math.max(e + (t || 0) - Date.now(), 0);
}
function p(e, t) {
    if (typeof e == `function`) {
        return e(t);
    }
    return e;
}
function m(e, t) {
    if (typeof e == `function`) {
        return e(t);
    }
    return e;
}
export function w({ type = `all`, exact, fetchStatus, predicate, queryKey, stale }, t) {
    if (queryKey) {
        if (exact) {
            if (t.queryHash !== _(queryKey, t.options)) {
                return false;
            }
        } else if (!y(t.queryKey, queryKey)) {
            return false;
        }
    }
    if (type !== `all`) {
        let e = t.isActive();
        if (type === `active` && !e || type === `inactive` && e) {
            return false;
        }
    }
    return !(typeof stale == `boolean` && t.isStale() !== stale || fetchStatus && fetchStatus !== t.state.fetchStatus || predicate && !predicate(t));
}
export function C({ exact, status, predicate, mutationKey }, t) {
    if (mutationKey) {
        if (!t.options.mutationKey) {
            return false;
        }
        if (exact) {
            if (v(t.options.mutationKey) !== v(mutationKey)) {
                return false;
            }
        } else if (!y(t.options.mutationKey, mutationKey)) {
            return false;
        }
    }
    return !(status && t.state.status !== status || predicate && !predicate(t));
}
function _(e, t) {
    return (t?.queryKeyHashFn || v)(e);
}
function y(e, t) {
    if (e === t) {
        return true;
    }
    if (typeof e != typeof t) {
        return false;
    }
    if (e && t && typeof e == `object` && typeof t == `object`) {
        if (Array.isArray(e) && Array.isArray(t)) {
            for(let n = 0; n < t.length; n++){
                if (!y(e[n], t[n])) {
                    return false;
                }
            }
            return true;
        }
        let n = Object.keys(t);
        for (let r of n){
            if (!y(e[r], t[r])) {
                return false;
            }
        }
        return true;
    }
    return false;
}
function S(e, t) {
    if (!t || Object.keys(e).length !== Object.keys(t).length) {
        return false;
    }
    for(let n in e){
        if (e[n] !== t[n]) {
            return false;
        }
    }
    return true;
}
function ee(e) {
    return new Promise((resolve)=>{
        o.setTimeout(resolve, e);
    });
}
function E(e, t, n) {
    if (typeof n.structuralSharing == `function`) {
        return n.structuralSharing(e, t);
    }
    if (n.structuralSharing === false) {
        return t;
    }
    return x(e, t);
}
function te(e, t, n = 0) {
    let r = [
        ...e,
        t
    ];
    if (n && r.length > n) {
        return r.slice(1);
    }
    return r;
}
function ne(e, t, n = 0) {
    let r = [
        t,
        ...e
    ];
    if (n && r.length > n) {
        return r.slice(0, -1);
    }
    return r;
}
function k(e, t) {
    if (typeof e == `function`) {
        return e(...t);
    }
    return !!e;
}
function re(e, t, n) {
    let r = false;
    let i;
    Object.defineProperty(e, "signal", {
        enumerable: true,
        get: ()=>{
            i ??= t();
            if (r) {
                return i;
            }
            r = true;
            if (i.aborted) {
                n();
            } else {
                i.addEventListener(`abort`, n, {
                    once: true
                });
            }
            return i;
        }
    });
    return e;
}
const A = (()=>{
    let e = ()=>c;
    return {
        isServer () {
            return e();
        },
        setIsServer (t) {
            e = t;
        }
    };
})();
function j() {
    let e;
    let t;
    let n = new Promise((resolve, reject)=>{
        e = resolve;
        t = reject;
    });
    n.status = `pending`;
    n.catch(()=>{});
    function r(e) {
        Object.assign(n, e);
        delete n.resolve;
        delete n.reject;
    }
    n.resolve = (t)=>{
        r({
            status: `fulfilled`,
            value: t
        });
        e(t);
    };
    n.reject = (reason)=>{
        r({
            status: `rejected`,
            reason
        });
        t(reason);
    };
    return n;
}
function ie(e) {
    let t;
    e.then((e)=>{
        t = e;
        return e;
    }, T)?.catch(T);
    if (t !== undefined) {
        return {
            data: t
        };
    }
}
const ae = s;
function oe() {
    let e = [];
    let t = 0;
    let n = (e)=>{
        e();
    };
    let r = (e)=>{
        e();
    };
    let i = ae;
    let schedule = (r)=>{
        if (t) {
            e.push(r);
        } else {
            i(()=>{
                n(r);
            });
        }
    };
    let o = ()=>{
        let t = e;
        e = [];
        if (t.length) {
            i(()=>{
                r(()=>{
                    t.forEach((e)=>{
                        n(e);
                    });
                });
            });
        }
    };
    return {
        batch: (e)=>{
            let n;
            t++;
            try {
                n = e();
            } finally{
                t--;
                if (!t) {
                    o();
                }
            }
            return n;
        },
        batchCalls: (e)=>(...t)=>{
                schedule(()=>{
                    e(...t);
                });
            },
        schedule,
        setNotifyFunction: (e)=>{
            n = e;
        },
        setBatchNotifyFunction: (e)=>{
            r = e;
        },
        setScheduler: (e)=>{
            i = e;
        }
    };
}
const M = oe();
const N = new class extends r {
    #e = true;
    #t;
    #n;
    constructor(){
        super();
        this.#n = (e)=>{
            if (typeof window < `u` && window.addEventListener) {
                let t = ()=>e(true);
                let n = ()=>e(false);
                window.addEventListener(`online`, t, false);
                window.addEventListener(`offline`, n, false);
                return ()=>{
                    window.removeEventListener(`online`, t);
                    window.removeEventListener(`offline`, n);
                };
            }
        };
    }
    onSubscribe() {
        if (!this.#t) {
            this.setEventListener(this.#n);
        }
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            this.#t?.();
            this.#t = undefined;
        }
    }
    setEventListener(e) {
        this.#n = e;
        this.#t?.();
        this.#t = e(this.setOnline.bind(this));
    }
    setOnline(e) {
        if (this.#e !== e) {
            this.#e = e;
            this.listeners.forEach((t)=>{
                t(e);
            });
        }
    }
    isOnline() {
        return this.#e;
    }
};
function se(e) {
    return Math.min(1000 * 2 ** e, 30000);
}
function P(networkMode) {
    if ((networkMode ?? `online`) === `online`) {
        return N.isOnline();
    }
    return true;
}
class F extends Error {
    constructor(e){
        super(`CancelledError`);
        this.revert = e?.revert;
        this.silent = e?.silent;
    }
}
export function g(e) {
    let t = false;
    let n = 0;
    let r;
    let promise = j();
    let o = ()=>promise.status !== `pending`;
    let cancel = (t)=>{
        if (!o()) {
            let n = new F(t);
            p(n);
            e.onCancel?.(n);
        }
    };
    let cancelRetry = ()=>{
        t = true;
    };
    let continueRetry = ()=>{
        t = false;
    };
    let u = ()=>i.isFocused() && (e.networkMode === `always` || N.isOnline()) && e.canRun();
    let canStart = ()=>P(e.networkMode) && e.canRun();
    let f = (e)=>{
        if (!o()) {
            r?.();
            promise.resolve(e);
        }
    };
    let p = (e)=>{
        if (!o()) {
            r?.();
            promise.reject(e);
        }
    };
    let m = ()=>new Promise((resolve)=>{
            r = (e)=>{
                if (o() || u()) {
                    resolve(e);
                }
            };
            e.onPause?.();
        }).then(()=>{
            r = undefined;
            if (!o()) {
                e.onContinue?.();
            }
        });
    let h = ()=>{
        if (o()) {
            return;
        }
        let r;
        let i = n === 0 ? e.initialPromise : undefined;
        try {
            r = i ?? e.fn();
        } catch (error) {
            r = Promise.reject(error);
        }
        Promise.resolve(r).then(f).catch((r)=>{
            if (o()) {
                return;
            }
            let i = e.retry ?? (A.isServer() ? 0 : 3);
            let a = e.retryDelay ?? se;
            let s = typeof a == `function` ? a(n, r) : a;
            let c = i === true || typeof i == `number` && n < i || typeof i == `function` && i(n, r);
            if (t || !c) {
                p(r);
                return;
            }
            n++;
            e.onFail?.(n, r);
            ee(s).then(()=>{
                if (u()) {
                    return undefined;
                }
                return m();
            }).then(()=>{
                if (t) {
                    p(r);
                } else {
                    h();
                }
            });
        });
    };
    return {
        promise,
        status: ()=>promise.status,
        cancel,
        continue: ()=>{
            r?.();
            return promise;
        },
        cancelRetry,
        continueRetry,
        canStart,
        start: ()=>{
            if (canStart()) {
                h();
            } else {
                m().then(h);
            }
            return promise;
        }
    };
}
export class h {
    #e;
    destroy() {
        this.clearGcTimeout();
    }
    scheduleGc() {
        this.clearGcTimeout();
        if (d(this.gcTime)) {
            this.#e = o.setTimeout(()=>{
                this.optionalRemove();
            }, this.gcTime);
        }
    }
    updateGcTime(e) {
        this.gcTime = Math.max(this.gcTime || 0, e ?? (A.isServer() ? Infinity : 300 * 1000));
    }
    clearGcTimeout() {
        if (this.#e !== undefined) {
            o.clearTimeout(this.#e);
            this.#e = undefined;
        }
    }
}
function ce(e) {
    return {
        onFetch: (t, n)=>{
            let t_options = t.options;
            let i = t.fetchOptions?.meta?.fetchMore?.direction;
            let pages = t.state.data?.pages || [];
            let pageParams = t.state.data?.pageParams || [];
            let s = {
                pages: [],
                pageParams: []
            };
            let c = 0;
            let l = async ()=>{
                let n = false;
                let l = (e)=>{
                    re(e, ()=>t.signal, ()=>n = true);
                };
                let u = O(t.options, t.fetchOptions);
                let d = async (e, pageParam, i)=>{
                    if (n) {
                        return Promise.reject(t.signal.reason);
                    }
                    if (pageParam == null && e.pages.length) {
                        return Promise.resolve(e);
                    }
                    let a = await u((()=>{
                        let e = {
                            client: t.client,
                            queryKey: t.queryKey,
                            pageParam,
                            direction: i ? `backward` : `forward`,
                            meta: t.options.meta
                        };
                        l(e);
                        return e;
                    })());
                    let { maxPages } = t.options;
                    let s = i ? ne : te;
                    return {
                        pages: s(e.pages, a, maxPages),
                        pageParams: s(e.pageParams, pageParam, maxPages)
                    };
                };
                if (i && pages.length) {
                    let e = i === `backward`;
                    let t = e ? le : R;
                    let n = {
                        pages,
                        pageParams
                    };
                    s = await d(n, t(t_options, n), e);
                } else {
                    let t = e ?? pages.length;
                    do {
                        let e = c === 0 ? pageParams[0] ?? t_options.initialPageParam : R(t_options, s);
                        if (c > 0 && e == null) {
                            break;
                        }
                        s = await d(s, e);
                        c++;
                    }while (c < t)
                }
                return s;
            };
            if (t.options.persister) {
                t.fetchFn = ()=>t.options.persister?.(l, {
                        client: t.client,
                        queryKey: t.queryKey,
                        meta: t.options.meta,
                        signal: t.signal
                    }, n);
            } else {
                t.fetchFn = l;
            }
        }
    };
}
function R(e, { pages, pageParams }) {
    let r = pages.length - 1;
    if (pages.length > 0) {
        return e.getNextPageParam(pages[r], pages, pageParams[r], pageParams);
    }
}
function le(e, { pages, pageParams }) {
    if (pages.length > 0) {
        return e.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams);
    }
}
class ue extends h {
    #e;
    #t;
    #n;
    #r;
    #i;
    #a;
    #o;
    #s;
    constructor(e){
        super();
        this.#s = false;
        this.#o = e.defaultOptions;
        this.setOptions(e.options);
        this.observers = [];
        this.#i = e.client;
        this.#r = this.#i.getQueryCache();
        this.queryKey = e.queryKey;
        this.queryHash = e.queryHash;
        this.#t = V(this.options);
        this.state = e.state ?? this.#t;
        this.scheduleGc();
    }
    get meta() {
        return this.options.meta;
    }
    get queryType() {
        return this.#e;
    }
    get promise() {
        return this.#a?.promise;
    }
    setOptions(e) {
        this.options = {
            ...this.#o,
            ...e
        };
        if (e?._type) {
            this.#e = e._type;
        }
        this.updateGcTime(this.options.gcTime);
        if (this.state && this.state.data === undefined) {
            let e = V(this.options);
            if (e.data !== undefined) {
                this.setState(B(e.data, e.dataUpdatedAt));
                this.#t = e;
            }
        }
    }
    optionalRemove() {
        if (!this.observers.length && this.state.fetchStatus === `idle`) {
            this.#r.remove(this);
        }
    }
    setData(e, t) {
        let n = E(this.state.data, e, this.options);
        this.#l({
            data: n,
            type: `success`,
            dataUpdatedAt: t?.updatedAt,
            manual: t?.manual
        });
        return n;
    }
    setState(state) {
        this.#l({
            type: `setState`,
            state
        });
    }
    cancel(e) {
        let t = this.#a?.promise;
        this.#a?.cancel(e);
        if (t) {
            return t.then(T).catch(T);
        }
        return Promise.resolve();
    }
    destroy() {
        super.destroy();
        this.cancel({
            silent: true
        });
    }
    get resetState() {
        return this.#t;
    }
    reset() {
        this.destroy();
        this.setState(this.resetState);
    }
    isActive() {
        return this.observers.some((e)=>m(e.options.enabled, this) !== false);
    }
    isDisabled() {
        if (this.getObserversCount() > 0) {
            return !this.isActive();
        }
        return this.options.queryFn === D || !this.isFetched();
    }
    isFetched() {
        return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
    }
    isStatic() {
        if (this.getObserversCount() > 0) {
            return this.observers.some((e)=>p(e.options.staleTime, this) === `static`);
        }
        return false;
    }
    isStale() {
        if (this.getObserversCount() > 0) {
            return this.observers.some((e)=>e.getCurrentResult().isStale);
        }
        return this.state.data === undefined || this.state.isInvalidated;
    }
    isStaleByTime(e = 0) {
        if (this.state.data === undefined) {
            return true;
        }
        if (e === `static`) {
            return false;
        }
        if (this.state.isInvalidated) {
            return true;
        }
        return !f(this.state.dataUpdatedAt, e);
    }
    onFocus() {
        this.observers.find((e)=>e.shouldFetchOnWindowFocus())?.refetch({
            cancelRefetch: false
        });
        this.#a?.continue();
    }
    onOnline() {
        this.observers.find((e)=>e.shouldFetchOnReconnect())?.refetch({
            cancelRefetch: false
        });
        this.#a?.continue();
    }
    addObserver(e) {
        if (!this.observers.includes(e)) {
            this.observers.push(e);
            this.clearGcTimeout();
            this.#r.notify({
                type: `observerAdded`,
                query: this,
                observer: e
            });
        }
    }
    removeObserver(e) {
        if (this.observers.includes(e)) {
            this.observers = this.observers.filter((t)=>t !== e);
            if (!this.observers.length) {
                if (this.#a) {
                    if (this.#s || this.#c()) {
                        this.#a.cancel({
                            revert: true
                        });
                    } else {
                        this.#a.cancelRetry();
                    }
                }
                this.scheduleGc();
            }
            this.#r.notify({
                type: `observerRemoved`,
                query: this,
                observer: e
            });
        }
    }
    getObserversCount() {
        return this.observers.length;
    }
    #c() {
        return this.state.fetchStatus === `paused` && this.state.status === `pending`;
    }
    invalidate() {
        if (!this.state.isInvalidated) {
            this.#l({
                type: `invalidate`
            });
        }
    }
    async fetch(e, fetchOptions) {
        if (this.state.fetchStatus !== `idle` && this.#a?.status() !== `rejected`) {
            if (this.state.data !== undefined && fetchOptions?.cancelRefetch) {
                this.cancel({
                    silent: true
                });
            } else if (this.#a) {
                this.#a.continueRetry();
                return this.#a.promise;
            }
        }
        if (e) {
            this.setOptions(e);
        }
        if (!this.options.queryFn) {
            let e = this.observers.find((e)=>e.options.queryFn);
            if (e) {
                this.setOptions(e.options);
            }
        }
        let n = new AbortController;
        let r = (e)=>{
            Object.defineProperty(e, "signal", {
                enumerable: true,
                get: ()=>{
                    this.#s = true;
                    return n.signal;
                }
            });
        };
        let fetchFn = ()=>{
            let e = O(this.options, fetchOptions);
            let n = (()=>{
                let e = {
                    client: this.#i,
                    queryKey: this.queryKey,
                    meta: this.meta
                };
                r(e);
                return e;
            })();
            this.#s = false;
            if (this.options.persister) {
                return this.options.persister(e, n, this);
            }
            return e(n);
        };
        let a = (()=>{
            let e = {
                fetchOptions,
                options: this.options,
                queryKey: this.queryKey,
                client: this.#i,
                state: this.state,
                fetchFn
            };
            r(e);
            return e;
        })();
        (this.#e === `infinite` ? ce(this.options.pages) : this.options.behavior)?.onFetch(a, this);
        this.#n = this.state;
        if (this.state.fetchStatus === `idle` || this.state.fetchMeta !== a.fetchOptions?.meta) {
            this.#l({
                type: `fetch`,
                meta: a.fetchOptions?.meta
            });
        }
        this.#a = g({
            initialPromise: fetchOptions?.initialPromise,
            fn: a.fetchFn,
            onCancel: (e)=>{
                if (e instanceof F && e.revert) {
                    this.setState({
                        ...this.#n,
                        fetchStatus: `idle`
                    });
                }
                n.abort();
            },
            onFail: (failureCount, error)=>{
                this.#l({
                    type: `failed`,
                    failureCount,
                    error
                });
            },
            onPause: ()=>{
                this.#l({
                    type: `pause`
                });
            },
            onContinue: ()=>{
                this.#l({
                    type: `continue`
                });
            },
            retry: a.options.retry,
            retryDelay: a.options.retryDelay,
            networkMode: a.options.networkMode,
            canRun: ()=>true
        });
        try {
            let e = await this.#a.start();
            if (e === undefined) {
                throw Error(`${this.queryHash} data is undefined`);
            }
            this.setData(e);
            this.#r.config.onSuccess?.(e, this);
            this.#r.config.onSettled?.(e, this.state.error, this);
            return e;
        } catch (error) {
            if (error instanceof F) {
                if (error.silent) {
                    return this.#a.promise;
                }
                if (error.revert) {
                    if (this.state.data === undefined) {
                        throw error;
                    }
                    return this.state.data;
                }
            }
            this.#l({
                type: `error`,
                error
            });
            this.#r.config.onError?.(error, this);
            this.#r.config.onSettled?.(this.state.data, error, this);
            throw error;
        } finally{
            this.scheduleGc();
        }
    }
    #l(action) {
        let t = (state)=>{
            switch(action.type){
                case `failed`:
                    return {
                        ...state,
                        fetchFailureCount: action.failureCount,
                        fetchFailureReason: action.error
                    };
                case `pause`:
                    return {
                        ...state,
                        fetchStatus: `paused`
                    };
                case `continue`:
                    return {
                        ...state,
                        fetchStatus: `fetching`
                    };
                case `fetch`:
                    return {
                        ...state,
                        ...z(state.data, this.options),
                        fetchMeta: action.meta ?? null
                    };
                case `success`:
                    let n = {
                        ...state,
                        ...B(action.data, action.dataUpdatedAt),
                        dataUpdateCount: state.dataUpdateCount + 1,
                        ...!action.manual && {
                            fetchStatus: `idle`,
                            fetchFailureCount: 0,
                            fetchFailureReason: null
                        }
                    };
                    this.#n = action.manual ? n : undefined;
                    return n;
                case `error`:
                    let r = action.error;
                    return {
                        ...state,
                        error: r,
                        errorUpdateCount: state.errorUpdateCount + 1,
                        errorUpdatedAt: Date.now(),
                        fetchFailureCount: state.fetchFailureCount + 1,
                        fetchFailureReason: r,
                        fetchStatus: `idle`,
                        status: `error`,
                        isInvalidated: true
                    };
                case `invalidate`:
                    return {
                        ...state,
                        isInvalidated: true
                    };
                case `setState`:
                    return {
                        ...state,
                        ...action.state
                    };
            }
        };
        this.state = t(this.state);
        M.batch(()=>{
            this.observers.forEach((e)=>{
                e.onQueryUpdate();
            });
            this.#r.notify({
                query: this,
                type: `updated`,
                action
            });
        });
    }
}
function z(data, options) {
    return {
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchStatus: P(options.networkMode) ? `fetching` : `paused`,
        ...data === undefined && {
            error: null,
            status: `pending`
        }
    };
}
function B(data, dataUpdatedAt) {
    return {
        data,
        dataUpdatedAt: dataUpdatedAt ?? Date.now(),
        error: null,
        isInvalidated: false,
        status: `success`
    };
}
function V(options) {
    let t = typeof options.initialData == `function` ? options.initialData() : options.initialData;
    let n = t !== undefined;
    let r = n ? typeof options.initialDataUpdatedAt == `function` ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
    return {
        data: t,
        dataUpdateCount: 0,
        dataUpdatedAt: n ? r ?? Date.now() : 0,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: false,
        status: n ? `success` : `pending`,
        fetchStatus: `idle`
    };
}
class H extends r {
    constructor(e, t){
        super();
        this.options = t;
        this.#e = e;
        this.#s = null;
        this.#o = j();
        this.bindMethods();
        this.setOptions(t);
    }
    #e;
    #t = undefined;
    #n = undefined;
    #r = undefined;
    #i;
    #a;
    #o;
    #s;
    #c;
    #l;
    #u;
    #d;
    #f;
    #p;
    #m = new Set;
    bindMethods() {
        this.refetch = this.refetch.bind(this);
    }
    onSubscribe() {
        if (this.listeners.size === 1) {
            this.#t.addObserver(this);
            if (U(this.#t, this.options)) {
                this.#h();
            } else {
                this.updateResult();
            }
            this.#y();
        }
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            this.destroy();
        }
    }
    shouldFetchOnReconnect() {
        return W(this.#t, this.options, this.options.refetchOnReconnect);
    }
    shouldFetchOnWindowFocus() {
        return W(this.#t, this.options, this.options.refetchOnWindowFocus);
    }
    destroy() {
        this.listeners = new Set;
        this.#b();
        this.#x();
        this.#t.removeObserver(this);
    }
    setOptions(e) {
        let options = this.options;
        let n = this.#t;
        this.options = this.#e.defaultQueryOptions(e);
        if (this.options.enabled !== undefined && typeof this.options.enabled != `boolean` && typeof this.options.enabled != `function` && typeof m(this.options.enabled, this.#t) != `boolean`) {
            throw Error(`Expected enabled to be a boolean or a callback that returns a boolean`);
        }
        this.#S();
        this.#t.setOptions(this.options);
        if (options._defaulted && !S(this.options, options)) {
            this.#e.getQueryCache().notify({
                type: `observerOptionsUpdated`,
                query: this.#t,
                observer: this
            });
        }
        let r = this.hasListeners();
        if (r && G(this.#t, n, this.options, options)) {
            this.#h();
        }
        this.updateResult();
        if (r && (this.#t !== n || m(this.options.enabled, this.#t) !== m(options.enabled, this.#t) || p(this.options.staleTime, this.#t) !== p(options.staleTime, this.#t))) {
            this.#g();
        }
        let i = this.#_();
        if (r && (this.#t !== n || m(this.options.enabled, this.#t) !== m(options.enabled, this.#t) || i !== this.#p)) {
            this.#v(i);
        }
    }
    getOptimisticResult(e) {
        let t = this.#e.getQueryCache().build(this.#e, e);
        let n = this.createResult(t, e);
        if (fe(this, n)) {
            this.#r = n;
            this.#a = this.options;
            this.#i = this.#t.state;
        }
        return n;
    }
    getCurrentResult() {
        return this.#r;
    }
    trackResult(e, t) {
        return new Proxy(e, {
            get: (e, n)=>{
                this.trackProp(n);
                t?.(n);
                if (n === `promise`) {
                    this.trackProp(`data`);
                    if (!this.options.experimental_prefetchInRender && this.#o.status === `pending`) {
                        this.#o.reject(Error(`experimental_prefetchInRender feature flag is not enabled`));
                    }
                }
                return Reflect.get(e, n);
            }
        });
    }
    trackProp(e) {
        this.#m.add(e);
    }
    getCurrentQuery() {
        return this.#t;
    }
    refetch({ ...rest } = {}) {
        return this.fetch({
            ...rest
        });
    }
    fetchOptimistic(e) {
        let t = this.#e.defaultQueryOptions(e);
        let n = this.#e.getQueryCache().build(this.#e, t);
        return n.fetch().then(()=>this.createResult(n, t));
    }
    fetch(e) {
        return this.#h({
            ...e,
            cancelRefetch: e.cancelRefetch ?? true
        }).then(()=>{
            this.updateResult();
            return this.#r;
        });
    }
    #h(e) {
        this.#S();
        let t = this.#t.fetch(this.options, e);
        if (!e?.throwOnError) {
            t = t.catch(T);
        }
        return t;
    }
    #g() {
        this.#b();
        let e = p(this.options.staleTime, this.#t);
        if (A.isServer() || this.#r.isStale || !d(e)) {
            return;
        }
        let t = f(this.#r.dataUpdatedAt, e) + 1;
        this.#d = o.setTimeout(()=>{
            if (!this.#r.isStale) {
                this.updateResult();
            }
        }, t);
    }
    #_() {
        return (typeof this.options.refetchInterval == `function` ? this.options.refetchInterval(this.#t) : this.options.refetchInterval) ?? false;
    }
    #v(e) {
        this.#x();
        this.#p = e;
        if (!(A.isServer() || m(this.options.enabled, this.#t) === false || !d(this.#p) || this.#p === 0)) {
            this.#f = o.setInterval(()=>{
                if (this.options.refetchIntervalInBackground || i.isFocused()) {
                    this.#h();
                }
            }, this.#p);
        }
    }
    #y() {
        this.#g();
        this.#v(this.#_());
    }
    #b() {
        if (this.#d !== undefined) {
            o.clearTimeout(this.#d);
            this.#d = undefined;
        }
    }
    #x() {
        if (this.#f !== undefined) {
            o.clearInterval(this.#f);
            this.#f = undefined;
        }
    }
    createResult(e, t) {
        let n = this.#t;
        let options = this.options;
        let i = this.#r;
        let a = this.#i;
        let o = this.#a;
        let s = e === n ? this.#n : e.state;
        let { state } = e;
        let l = {
            ...state
        };
        let isPlaceholderData = false;
        let d;
        if (t._optimisticResults) {
            let i = this.hasListeners();
            let a = !i && U(e, t);
            let o = i && G(e, n, t, options);
            if (a || o) {
                l = {
                    ...l,
                    ...z(state.data, e.options)
                };
            }
            if (t._optimisticResults === `isRestoring`) {
                l.fetchStatus = `idle`;
            }
        }
        let { error, errorUpdatedAt, status } = l;
        d = l.data;
        let g = false;
        if (t.placeholderData !== undefined && d === undefined && status === `pending`) {
            let e;
            if (i?.isPlaceholderData && t.placeholderData === o?.placeholderData) {
                e = i.data;
                g = true;
            } else {
                e = typeof t.placeholderData == `function` ? t.placeholderData(this.#u?.state.data, this.#u) : t.placeholderData;
            }
            if (e !== undefined) {
                status = `success`;
                d = E(i?.data, e, t);
                isPlaceholderData = true;
            }
        }
        if (t.select && d !== undefined && !g) {
            if (i && d === a?.data && t.select === this.#c) {
                d = this.#l;
            } else {
                try {
                    this.#c = t.select;
                    d = t.select(d);
                    d = E(i?.data, d, t);
                    this.#l = d;
                    this.#s = null;
                } catch (err) {
                    this.#s = err;
                }
            }
        }
        if (this.#s) {
            error = this.#s;
            d = this.#l;
            errorUpdatedAt = Date.now();
            status = `error`;
        }
        let isFetching = l.fetchStatus === `fetching`;
        let isPending = status === `pending`;
        let isError = status === `error`;
        let b = isPending && isFetching;
        let x = d !== undefined;
        let S = {
            status,
            fetchStatus: l.fetchStatus,
            isPending,
            isSuccess: status === `success`,
            isError,
            isInitialLoading: b,
            isLoading: b,
            data: d,
            dataUpdatedAt: l.dataUpdatedAt,
            error,
            errorUpdatedAt,
            failureCount: l.fetchFailureCount,
            failureReason: l.fetchFailureReason,
            errorUpdateCount: l.errorUpdateCount,
            isFetched: e.isFetched(),
            isFetchedAfterMount: l.dataUpdateCount > s.dataUpdateCount || l.errorUpdateCount > s.errorUpdateCount,
            isFetching,
            isRefetching: isFetching && !isPending,
            isLoadingError: isError && !x,
            isPaused: l.fetchStatus === `paused`,
            isPlaceholderData,
            isRefetchError: isError && x,
            isStale: K(e, t),
            refetch: this.refetch,
            promise: this.#o,
            isEnabled: m(t.enabled, e) !== false
        };
        if (this.options.experimental_prefetchInRender) {
            let t = S.data !== undefined;
            let r = S.status === `error` && !t;
            let i = (e)=>{
                if (r) {
                    e.reject(S.error);
                } else if (t) {
                    e.resolve(S.data);
                }
            };
            let a = ()=>{
                i(this.#o = S.promise = j());
            };
            let o = this.#o;
            switch(o.status){
                case `pending`:
                    if (e.queryHash === n.queryHash) {
                        i(o);
                    }
                    break;
                case `fulfilled`:
                    if (r || S.data !== o.value) {
                        a();
                    }
                    break;
                case `rejected`:
                    if (!r || S.error !== o.reason) {
                        a();
                    }
                    break;
            }
        }
        return S;
    }
    updateResult() {
        let e = this.#r;
        let t = this.createResult(this.#t, this.options);
        this.#i = this.#t.state;
        this.#a = this.options;
        if (this.#i.data !== undefined) {
            this.#u = this.#t;
        }
        if (!S(t, e)) {
            this.#r = t;
            this.#C({
                listeners: (()=>{
                    if (!e) {
                        return true;
                    }
                    let { notifyOnChangeProps } = this.options;
                    let n = typeof notifyOnChangeProps == `function` ? notifyOnChangeProps() : notifyOnChangeProps;
                    if (n === `all` || !n && !this.#m.size) {
                        return true;
                    }
                    let r = new Set(n ?? this.#m);
                    if (this.options.throwOnError) {
                        r.add(`error`);
                    }
                    return Object.keys(this.#r).some((t)=>{
                        let n = t;
                        return this.#r[n] !== e[n] && r.has(n);
                    });
                })()
            });
        }
    }
    #S() {
        let e = this.#e.getQueryCache().build(this.#e, this.options);
        if (e === this.#t) {
            return;
        }
        let t = this.#t;
        this.#t = e;
        this.#n = e.state;
        if (this.hasListeners()) {
            t?.removeObserver(this);
            e.addObserver(this);
        }
    }
    onQueryUpdate() {
        this.updateResult();
        if (this.hasListeners()) {
            this.#y();
        }
    }
    #C(e) {
        M.batch(()=>{
            if (e.listeners) {
                this.listeners.forEach((e)=>{
                    e(this.#r);
                });
            }
            this.#e.getQueryCache().notify({
                query: this.#t,
                type: `observerResultsUpdated`
            });
        });
    }
}
function de(e, t) {
    return m(t.enabled, e) !== false && e.state.data === undefined && !(e.state.status === `error` && m(t.retryOnMount, e) === false);
}
function U(e, t) {
    return de(e, t) || e.state.data !== undefined && W(e, t, t.refetchOnMount);
}
function W(e, t, n) {
    if (m(t.enabled, e) !== false && p(t.staleTime, e) !== `static`) {
        let r = typeof n == `function` ? n(e) : n;
        return r === `always` || r !== false && K(e, t);
    }
    return false;
}
function G(e, t, n, options) {
    return (e !== t || m(options.enabled, e) === false) && (!n.suspense || e.state.status !== `error`) && K(e, n);
}
function K(e, t) {
    return m(t.enabled, e) !== false && e.isStaleByTime(p(t.staleTime, e));
}
function fe(e, t) {
    return !S(e.getCurrentResult(), t);
}
const q = s_1(n(), 1);
const pe = t_1();
const JContext = q.createContext(undefined);
const useY = (e)=>{
    let t = q.useContext(JContext);
    if (e) {
        return e;
    }
    if (!t) {
        throw Error(`No QueryClient set, use QueryClientProvider to set one`);
    }
    return t;
};
const MeComponent = ({ client, children })=>{
    q.useEffect(()=>{
        client.mount();
        return ()=>{
            client.unmount();
        };
    }, [
        client
    ]);
    return <JContext.Provider value={client}>{children}</JContext.Provider>;
};
const XContext = q.createContext(false);
const useHe = ()=>q.useContext(XContext);
XContext.Provider;
function ge() {
    let e = false;
    return {
        clearReset: ()=>{
            e = false;
        },
        reset: ()=>{
            e = true;
        },
        isReset: ()=>e
    };
}
const _eContext = q.createContext(ge());
const useVe = ()=>q.useContext(_eContext);
const ye = (e, errorResetBoundary, query)=>{
    let r = query?.state.error && typeof e.throwOnError == `function` ? k(e.throwOnError, [
        query.state.error,
        query
    ]) : e.throwOnError;
    if (e.suspense || e.experimental_prefetchInRender || r) {
        if (!errorResetBoundary.isReset()) {
            e.retryOnMount = false;
        }
    }
};
const useBe = (errorResetBoundary)=>{
    q.useEffect(()=>{
        errorResetBoundary.clearReset();
    }, [
        errorResetBoundary
    ]);
};
const xe = ({ result, errorResetBoundary, throwOnError, query, suspense })=>result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === undefined || k(throwOnError, [
        result.error,
        query
    ]));
const Se = (e, t)=>t.state.data === undefined;
const Ce = (e)=>{
    if (e.suspense) {
        let t = 1000;
        let n = (e)=>{
            if (e === `static`) {
                return e;
            }
            return Math.max(e ?? t, t);
        };
        let r = e.staleTime;
        e.staleTime = typeof r == `function` ? (...e)=>n(r(...e)) : n(r);
        if (typeof e.gcTime == `number`) {
            e.gcTime = Math.max(e.gcTime, t);
        }
    }
};
const we = (result, t)=>result.isLoading && result.isFetching && !t;
const Te = (e, result)=>e?.suspense && result.isPending;
const Z = (e, t, errorResetBoundary)=>t.fetchOptimistic(e).catch(()=>{
        errorResetBoundary.clearReset();
    });
function useEe(e, t, n) {
    let r = useHe();
    let errorResetBoundary = useVe();
    let a = useY(n);
    let o = a.defaultQueryOptions(e);
    a.getDefaultOptions().queries?._experimental_beforeQuery?.(o);
    let query = a.getQueryCache().get(o.queryHash);
    let c = e.subscribed !== false;
    o._optimisticResults = r ? `isRestoring` : c ? `optimistic` : undefined;
    Ce(o);
    ye(o, errorResetBoundary, query);
    useBe(errorResetBoundary);
    let u = !a.getQueryCache().get(o.queryHash);
    let [d] = q.useState(()=>new t(a, o));
    let result = d.getOptimisticResult(o);
    let p = !r && c;
    q.useSyncExternalStore(q.useCallback((e)=>{
        let t = p ? d.subscribe(M.batchCalls(e)) : T;
        d.updateResult();
        return t;
    }, [
        d,
        p
    ]), ()=>d.getCurrentResult(), ()=>d.getCurrentResult());
    q.useEffect(()=>{
        d.setOptions(o);
    }, [
        o,
        d
    ]);
    if (Te(o, result)) {
        throw Z(o, d, errorResetBoundary);
    }
    if (xe({
        result,
        errorResetBoundary,
        throwOnError: o.throwOnError,
        query,
        suspense: o.suspense
    })) {
        throw result.error;
    }
    a.getDefaultOptions().queries?._experimental_afterQuery?.(o, result);
    if (o.experimental_prefetchInRender && !A.isServer() && we(result, r)) {
        (u ? Z(o, d, errorResetBoundary) : query?.promise)?.catch(T).finally(()=>{
            d.updateResult();
        });
    }
    if (o.notifyOnChangeProps) {
        return result;
    }
    return d.trackResult(result);
}
function De(e, t) {
    return useEe(e, H, t);
}
export const t = [
    `listings`
];
const Oe = (e)=>[
        ...t,
        `page-as-viewer`,
        e
    ];
const ke = (e)=>[
        ...t,
        `download-as-viewer`,
        e
    ];
const Ae = (e)=>[
        ...t,
        `profile-tab`,
        e
    ];
const je = (e, t, n)=>[
        ...Ae(t),
        e,
        n
    ];
async function $(e, queryKey) {
    e.removeQueries({
        queryKey,
        type: `inactive`
    });
    await e.invalidateQueries({
        queryKey,
        type: `active`
    });
}
function Me(e) {
    return $(e, t);
}
function useNe() {
    let e = useY();
    return q.useCallback(()=>Me(e), [
        e
    ]);
}
export { D as A, p as D, y as E, r as M, S as O, _ as S, N as _, je as a, De as c, MeComponent as d, useY as f, Oe as i, i as j, k, useEe as l, ue as m, ke as n, Ae as o, H as p, $ as r, useNe as s, Se as u, M as v, v as x, ie as y };
