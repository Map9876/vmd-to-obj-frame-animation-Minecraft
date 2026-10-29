import { n, s } from "../jsx-runtime-Db0DjQYK.js";
import { M, O, T, f, g, h, k, v as v_1, x as x_1 } from "../keys-CMeqocw_.js";
export class v extends h {
    #e;
    #t;
    #n;
    #r;
    constructor(e){
        super();
        this.#e = e.client;
        this.mutationId = e.mutationId;
        this.#n = e.mutationCache;
        this.#t = [];
        this.state = e.state || y();
        this.setOptions(e.options);
        this.scheduleGc();
    }
    setOptions(e) {
        this.options = e;
        this.updateGcTime(this.options.gcTime);
    }
    get meta() {
        return this.options.meta;
    }
    addObserver(e) {
        if (!this.#t.includes(e)) {
            this.#t.push(e);
            this.clearGcTimeout();
            this.#n.notify({
                type: `observerAdded`,
                mutation: this,
                observer: e
            });
        }
    }
    removeObserver(e) {
        this.#t = this.#t.filter((t)=>t !== e);
        this.scheduleGc();
        this.#n.notify({
            type: `observerRemoved`,
            mutation: this,
            observer: e
        });
    }
    optionalRemove() {
        if (!this.#t.length) {
            if (this.state.status === `pending`) {
                this.scheduleGc();
            } else {
                this.#n.remove(this);
            }
        }
    }
    continue() {
        return this.#r?.continue() ?? this.execute(this.state.variables);
    }
    async execute(variables) {
        let onContinue = ()=>{
            this.#i({
                type: `continue`
            });
        };
        let n = {
            client: this.#e,
            meta: this.options.meta,
            mutationKey: this.options.mutationKey
        };
        this.#r = g({
            fn: ()=>{
                if (this.options.mutationFn) {
                    return this.options.mutationFn(variables, n);
                }
                return Promise.reject(Error(`No mutationFn found`));
            },
            onFail: (failureCount, error)=>{
                this.#i({
                    type: `failed`,
                    failureCount,
                    error
                });
            },
            onPause: ()=>{
                this.#i({
                    type: `pause`
                });
            },
            onContinue,
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: ()=>this.#n.canRun(this)
        });
        let r = this.state.status === `pending`;
        let isPaused = !this.#r.canStart();
        try {
            if (r) {
                onContinue();
            } else {
                this.#i({
                    type: `pending`,
                    variables,
                    isPaused
                });
                if (this.#n.config.onMutate) {
                    await this.#n.config.onMutate(variables, this, n);
                }
                let context = await this.options.onMutate?.(variables, n);
                if (context !== this.state.context) {
                    this.#i({
                        type: `pending`,
                        context,
                        variables,
                        isPaused
                    });
                }
            }
            let a = await this.#r.start();
            await this.#n.config.onSuccess?.(a, variables, this.state.context, this, n);
            await this.options.onSuccess?.(a, variables, this.state.context, n);
            await this.#n.config.onSettled?.(a, null, this.state.variables, this.state.context, this, n);
            await this.options.onSettled?.(a, null, variables, this.state.context, n);
            this.#i({
                type: `success`,
                data: a
            });
            return a;
        } catch (error) {
            try {
                await this.#n.config.onError?.(error, variables, this.state.context, this, n);
            } catch (err) {
                Promise.reject(err);
            }
            try {
                await this.options.onError?.(error, variables, this.state.context, n);
            } catch (err) {
                Promise.reject(err);
            }
            try {
                await this.#n.config.onSettled?.(undefined, error, this.state.variables, this.state.context, this, n);
            } catch (err) {
                Promise.reject(err);
            }
            try {
                await this.options.onSettled?.(undefined, error, variables, this.state.context, n);
            } catch (err) {
                Promise.reject(err);
            }
            this.#i({
                type: `error`,
                error
            });
            throw error;
        } finally{
            this.#n.runNext(this);
        }
    }
    #i(action) {
        let t = (state)=>{
            switch(action.type){
                case `failed`:
                    return {
                        ...state,
                        failureCount: action.failureCount,
                        failureReason: action.error
                    };
                case `pause`:
                    return {
                        ...state,
                        isPaused: true
                    };
                case `continue`:
                    return {
                        ...state,
                        isPaused: false
                    };
                case `pending`:
                    return {
                        ...state,
                        context: action.context,
                        data: undefined,
                        failureCount: 0,
                        failureReason: null,
                        error: null,
                        isPaused: action.isPaused,
                        status: `pending`,
                        variables: action.variables,
                        submittedAt: Date.now()
                    };
                case `success`:
                    return {
                        ...state,
                        data: action.data,
                        failureCount: 0,
                        failureReason: null,
                        error: null,
                        status: `success`,
                        isPaused: false
                    };
                case `error`:
                    return {
                        ...state,
                        data: undefined,
                        error: action.error,
                        failureCount: state.failureCount + 1,
                        failureReason: action.error,
                        isPaused: false,
                        status: `error`
                    };
            }
        };
        this.state = t(this.state);
        v_1.batch(()=>{
            this.#t.forEach((t)=>{
                t.onMutationUpdate(action);
            });
            this.#n.notify({
                mutation: this,
                type: `updated`,
                action
            });
        });
    }
}
function y() {
    return {
        context: undefined,
        data: undefined,
        error: null,
        failureCount: 0,
        failureReason: null,
        isPaused: false,
        status: `idle`,
        variables: undefined,
        submittedAt: 0
    };
}
class b extends M {
    #e;
    #t = undefined;
    #n;
    #r;
    constructor(e, t){
        super();
        this.#e = e;
        this.setOptions(t);
        this.bindMethods();
        this.#i();
    }
    bindMethods() {
        this.mutate = this.mutate.bind(this);
        this.reset = this.reset.bind(this);
    }
    setOptions(e) {
        let options = this.options;
        this.options = this.#e.defaultMutationOptions(e);
        if (!O(this.options, options)) {
            this.#e.getMutationCache().notify({
                type: `observerOptionsUpdated`,
                mutation: this.#n,
                observer: this
            });
        }
        if (options?.mutationKey && this.options.mutationKey && x_1(options.mutationKey) !== x_1(this.options.mutationKey)) {
            this.reset();
        } else if (this.#n?.state.status === `pending`) {
            this.#n.setOptions(this.options);
        }
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            this.#n?.removeObserver(this);
        }
    }
    onMutationUpdate(e) {
        this.#i();
        this.#a(e);
    }
    getCurrentResult() {
        return this.#t;
    }
    reset() {
        this.#n?.removeObserver(this);
        this.#n = undefined;
        this.#i();
        this.#a();
    }
    mutate(e, t) {
        this.#r = t;
        this.#n?.removeObserver(this);
        this.#n = this.#e.getMutationCache().build(this.#e, this.options);
        this.#n.addObserver(this);
        return this.#n.execute(e);
    }
    #i() {
        let e = this.#n?.state ?? y();
        this.#t = {
            ...e,
            isPending: e.status === `pending`,
            isSuccess: e.status === `success`,
            isError: e.status === `error`,
            isIdle: e.status === `idle`,
            mutate: this.mutate,
            reset: this.reset
        };
    }
    #a(e) {
        v_1.batch(()=>{
            if (this.#r && this.hasListeners()) {
                let t = this.#t.variables;
                let n = this.#t.context;
                let r = {
                    client: this.#e,
                    meta: this.options.meta,
                    mutationKey: this.options.mutationKey
                };
                if (e?.type === `success`) {
                    try {
                        this.#r.onSuccess?.(e.data, t, n, r);
                    } catch (error) {
                        Promise.reject(error);
                    }
                    try {
                        this.#r.onSettled?.(e.data, null, t, n, r);
                    } catch (error) {
                        Promise.reject(error);
                    }
                } else if (e?.type === `error`) {
                    try {
                        this.#r.onError?.(e.error, t, n, r);
                    } catch (error) {
                        Promise.reject(error);
                    }
                    try {
                        this.#r.onSettled?.(undefined, e.error, t, n, r);
                    } catch (error) {
                        Promise.reject(error);
                    }
                }
            }
            this.listeners.forEach((e)=>{
                e(this.#t);
            });
        });
    }
}
export const x = s(n(), 1);
export function S(e, t) {
    let n = f(t);
    let [r] = x.useState(()=>new b(n, e));
    x.useEffect(()=>{
        r.setOptions(e);
    }, [
        r,
        e
    ]);
    let i = x.useSyncExternalStore(x.useCallback((e)=>r.subscribe(v_1.batchCalls(e)), [
        r
    ]), ()=>r.getCurrentResult(), ()=>r.getCurrentResult());
    let mutate = x.useCallback((e, t)=>{
        r.mutate(e, t).catch(T);
    }, [
        r
    ]);
    if (i.error && k(r.options.throwOnError, [
        i.error
    ])) {
        throw i.error;
    }
    return {
        ...i,
        mutate,
        mutateAsync: i.mutate
    };
}
