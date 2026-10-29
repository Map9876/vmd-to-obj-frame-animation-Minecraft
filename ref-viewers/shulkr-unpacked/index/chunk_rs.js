import { a, n, s, t } from "../jsx-runtime-Db0DjQYK.js";
import { A, C, D, E, M, S, T, _, b, j, m, v, w, x } from "../keys-CMeqocw_.js";
import { _ as __1 } from "../session-BGIR8kU0.js";
class rs extends M {
    constructor(e = {}){
        super();
        this.config = e;
        this.#e = new Set;
        this.#t = new Map;
        this.#n = 0;
    }
    #e;
    #t;
    #n;
    build(e, t, n) {
        let r = new __1({
            client: e,
            mutationCache: this,
            mutationId: ++this.#n,
            options: e.defaultMutationOptions(t),
            state: n
        });
        this.add(r);
        return r;
    }
    add(e) {
        this.#e.add(e);
        let t = is(e);
        if (typeof t == `string`) {
            let n = this.#t.get(t);
            if (n) {
                n.push(e);
            } else {
                this.#t.set(t, [
                    e
                ]);
            }
        }
        this.notify({
            type: `added`,
            mutation: e
        });
    }
    remove(e) {
        if (this.#e.delete(e)) {
            let t = is(e);
            if (typeof t == `string`) {
                let n = this.#t.get(t);
                if (n) {
                    if (n.length > 1) {
                        let t = n.indexOf(e);
                        if (t !== -1) {
                            n.splice(t, 1);
                        }
                    } else {
                        if (n[0] === e) {
                            this.#t.delete(t);
                        }
                    }
                }
            }
        }
        this.notify({
            type: `removed`,
            mutation: e
        });
    }
    canRun(e) {
        let t = is(e);
        if (typeof t == `string`) {
            let n = this.#t.get(t)?.find((e)=>e.state.status === `pending`);
            return !n || n === e;
        } else {
            return true;
        }
    }
    runNext(e) {
        let t = is(e);
        if (typeof t == `string`) {
            return this.#t.get(t)?.find((t)=>t !== e && t.state.isPaused)?.continue() ?? Promise.resolve();
        }
        return Promise.resolve();
    }
    clear() {
        v.batch(()=>{
            this.#e.forEach((mutation)=>{
                this.notify({
                    type: `removed`,
                    mutation
                });
            });
            this.#e.clear();
            this.#t.clear();
        });
    }
    getAll() {
        return Array.from(this.#e);
    }
    find(e) {
        let t = {
            exact: true,
            ...e
        };
        return this.getAll().find((e)=>C(t, e));
    }
    findAll(e = {}) {
        return this.getAll().filter((t)=>C(e, t));
    }
    notify(e) {
        v.batch(()=>{
            this.listeners.forEach((t)=>{
                t(e);
            });
        });
    }
    resumePausedMutations() {
        let e = this.getAll().filter((e)=>e.state.isPaused);
        return v.batch(()=>Promise.all(e.map((e)=>e.continue().catch(T))));
    }
}
function is(e) {
    return e.options.scope?.id;
}
class as extends M {
    constructor(e = {}){
        super();
        this.config = e;
        this.#e = new Map;
    }
    #e;
    build(e, t, n) {
        let t_queryKey = t.queryKey;
        let queryHash = t.queryHash ?? S(t_queryKey, t);
        let a = this.get(queryHash);
        if (!a) {
            a = new m({
                client: e,
                queryKey: t_queryKey,
                queryHash,
                options: e.defaultQueryOptions(t),
                state: n,
                defaultOptions: e.getQueryDefaults(t_queryKey)
            });
            this.add(a);
        }
        return a;
    }
    add(e) {
        if (!this.#e.has(e.queryHash)) {
            this.#e.set(e.queryHash, e);
            this.notify({
                type: `added`,
                query: e
            });
        }
    }
    remove(e) {
        let t = this.#e.get(e.queryHash);
        if (t) {
            e.destroy();
            if (t === e) {
                this.#e.delete(e.queryHash);
            }
            this.notify({
                type: `removed`,
                query: e
            });
        }
    }
    clear() {
        v.batch(()=>{
            this.getAll().forEach((e)=>{
                this.remove(e);
            });
        });
    }
    get(e) {
        return this.#e.get(e);
    }
    getAll() {
        return [
            ...this.#e.values()
        ];
    }
    find(e) {
        let t = {
            exact: true,
            ...e
        };
        return this.getAll().find((e)=>w(t, e));
    }
    findAll(e = {}) {
        let t = this.getAll();
        if (Object.keys(e).length > 0) {
            return t.filter((t)=>w(e, t));
        }
        return t;
    }
    notify(e) {
        v.batch(()=>{
            this.listeners.forEach((t)=>{
                t(e);
            });
        });
    }
    onFocus() {
        v.batch(()=>{
            this.getAll().forEach((e)=>{
                e.onFocus();
            });
        });
    }
    onOnline() {
        v.batch(()=>{
            this.getAll().forEach((e)=>{
                e.onOnline();
            });
        });
    }
}
export class os {
    #e;
    #t;
    #n;
    #r;
    #i;
    #a;
    #o;
    #s;
    constructor(e = {}){
        this.#e = e.queryCache || new as;
        this.#t = e.mutationCache || new rs;
        this.#n = e.defaultOptions || {};
        this.#r = new Map;
        this.#i = new Map;
        this.#a = 0;
    }
    mount() {
        this.#a++;
        if (this.#a === 1) {
            this.#o = j.subscribe(async (e)=>{
                if (e) {
                    await this.resumePausedMutations();
                    this.#e.onFocus();
                }
            });
            this.#s = _.subscribe(async (e)=>{
                if (e) {
                    await this.resumePausedMutations();
                    this.#e.onOnline();
                }
            });
        }
    }
    unmount() {
        this.#a--;
        if (this.#a === 0) {
            this.#o?.();
            this.#o = undefined;
            this.#s?.();
            this.#s = undefined;
        }
    }
    isFetching(e) {
        return this.#e.findAll({
            ...e,
            fetchStatus: `fetching`
        }).length;
    }
    isMutating(e) {
        return this.#t.findAll({
            ...e,
            status: `pending`
        }).length;
    }
    getQueryData(e) {
        let t = this.defaultQueryOptions({
            queryKey: e
        });
        return this.#e.get(t.queryHash)?.state.data;
    }
    ensureQueryData(e) {
        let t = this.defaultQueryOptions(e);
        let n = this.#e.build(this, t);
        let data = n.state.data;
        if (data === undefined) {
            return this.fetchQuery(e);
        }
        if (e.revalidateIfStale && n.isStaleByTime(D(t.staleTime, n))) {
            this.prefetchQuery(t);
        }
        return Promise.resolve(data);
    }
    getQueriesData(e) {
        return this.#e.findAll(e).map(({ queryKey, state })=>[
                queryKey,
                state.data
            ]);
    }
    setQueryData(e, t, n) {
        let r = this.defaultQueryOptions({
            queryKey: e
        });
        let i = this.#e.get(r.queryHash)?.state.data;
        let a = b(t, i);
        if (a !== undefined) {
            return this.#e.build(this, r).setData(a, {
                ...n,
                manual: true
            });
        }
    }
    setQueriesData(e, t, n) {
        return v.batch(()=>this.#e.findAll(e).map(({ queryKey })=>[
                    queryKey,
                    this.setQueryData(queryKey, t, n)
                ]));
    }
    getQueryState(e) {
        let t = this.defaultQueryOptions({
            queryKey: e
        });
        return this.#e.get(t.queryHash)?.state;
    }
    removeQueries(e) {
        let t = this.#e;
        v.batch(()=>{
            t.findAll(e).forEach((e)=>{
                t.remove(e);
            });
        });
    }
    resetQueries(e, t) {
        let n = this.#e;
        return v.batch(()=>{
            n.findAll(e).forEach((e)=>{
                e.reset();
            });
            return this.refetchQueries({
                type: `active`,
                ...e
            }, t);
        });
    }
    cancelQueries(e, t = {}) {
        let n = {
            revert: true,
            ...t
        };
        let r = v.batch(()=>this.#e.findAll(e).map((e)=>e.cancel(n)));
        return Promise.all(r).then(T).catch(T);
    }
    invalidateQueries(e, t = {}) {
        return v.batch(()=>{
            this.#e.findAll(e).forEach((e)=>{
                e.invalidate();
            });
            if (e?.refetchType === `none`) {
                return Promise.resolve();
            }
            return this.refetchQueries({
                ...e,
                type: e?.refetchType ?? e?.type ?? `active`
            }, t);
        });
    }
    refetchQueries(e, t = {}) {
        let n = {
            ...t,
            cancelRefetch: t.cancelRefetch ?? true
        };
        let r = v.batch(()=>this.#e.findAll(e).filter((e)=>!e.isDisabled() && !e.isStatic()).map((e)=>{
                let t = e.fetch(undefined, n);
                if (!n.throwOnError) {
                    t = t.catch(T);
                }
                if (e.state.fetchStatus === `paused`) {
                    return Promise.resolve();
                }
                return t;
            }));
        return Promise.all(r).then(T);
    }
    fetchQuery(e) {
        let t = this.defaultQueryOptions(e);
        if (t.retry === undefined) {
            t.retry = false;
        }
        let n = this.#e.build(this, t);
        if (n.isStaleByTime(D(t.staleTime, n))) {
            return n.fetch(t);
        }
        return Promise.resolve(n.state.data);
    }
    prefetchQuery(e) {
        return this.fetchQuery(e).then(T).catch(T);
    }
    fetchInfiniteQuery(e) {
        e._type = `infinite`;
        return this.fetchQuery(e);
    }
    prefetchInfiniteQuery(e) {
        return this.fetchInfiniteQuery(e).then(T).catch(T);
    }
    ensureInfiniteQueryData(e) {
        e._type = `infinite`;
        return this.ensureQueryData(e);
    }
    resumePausedMutations() {
        if (_.isOnline()) {
            return this.#t.resumePausedMutations();
        }
        return Promise.resolve();
    }
    getQueryCache() {
        return this.#e;
    }
    getMutationCache() {
        return this.#t;
    }
    getDefaultOptions() {
        return this.#n;
    }
    setDefaultOptions(e) {
        this.#n = e;
    }
    setQueryDefaults(e, t) {
        this.#r.set(x(e), {
            queryKey: e,
            defaultOptions: t
        });
    }
    getQueryDefaults(e) {
        let t = [
            ...this.#r.values()
        ];
        let n = {};
        t.forEach((t)=>{
            if (E(e, t.queryKey)) {
                Object.assign(n, t.defaultOptions);
            }
        });
        return n;
    }
    setMutationDefaults(mutationKey, t) {
        this.#i.set(x(mutationKey), {
            mutationKey,
            defaultOptions: t
        });
    }
    getMutationDefaults(e) {
        let t = [
            ...this.#i.values()
        ];
        let n = {};
        t.forEach((t)=>{
            if (E(e, t.mutationKey)) {
                Object.assign(n, t.defaultOptions);
            }
        });
        return n;
    }
    defaultQueryOptions(e) {
        if (e._defaulted) {
            return e;
        }
        let t = {
            ...this.#n.queries,
            ...this.getQueryDefaults(e.queryKey),
            ...e,
            _defaulted: true
        };
        t.queryHash ||= S(t.queryKey, t);
        if (t.refetchOnReconnect === undefined) {
            t.refetchOnReconnect = t.networkMode !== `always`;
        }
        if (t.throwOnError === undefined) {
            t.throwOnError = !!t.suspense;
        }
        if (!t.networkMode && t.persister) {
            t.networkMode = `offlineFirst`;
        }
        if (t.queryFn === A) {
            t.enabled = false;
        }
        return t;
    }
    defaultMutationOptions(e) {
        if (e?._defaulted) {
            return e;
        }
        return {
            ...this.#n.mutations,
            ...e?.mutationKey && this.getMutationDefaults(e.mutationKey),
            ...e,
            _defaulted: true
        };
    }
    clear() {
        this.#e.clear();
        this.#t.clear();
    }
}
export const q = s(n(), 1);
export const J = t();
