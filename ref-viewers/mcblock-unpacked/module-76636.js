import { BY, EU, Se } from "./module-60057.js";
import { H } from "./module-66941.js";
import { Qg } from "./module-16649.js";
let o = (e)=>e instanceof Promise && !e[i];
let i = Symbol("chained PromiseLike");
class l {
    constructor(e, t){
        let r;
        let n;
        r = e || new H;
        n = t || new H;
        this._stack = [
            {
                scope: r
            }
        ];
        this._isolationScope = n;
    }
    withScope(e) {
        let t;
        let r = this._pushScope();
        try {
            t = e(r);
        } catch (error) {
            this._popScope();
            throw error;
        }
        if (Qg(t)) {
            return ((e, t, r)=>{
                let n = e.then((e)=>{
                    t(e);
                    return e;
                }, (e)=>{
                    r(e);
                    throw e;
                });
                if (o(n) && o(e)) {
                    return n;
                }
                return ((e, t)=>{
                    let r = false;
                    for(let n in e){
                        if (n in t) {
                            continue;
                        }
                        r = true;
                        let a = e[n];
                        if (typeof a === "function") {
                            Object.defineProperty(t, n, {
                                value: (...t)=>a.apply(e, t),
                                enumerable: true,
                                configurable: true,
                                writable: true
                            });
                        } else {
                            t[n] = a;
                        }
                    }
                    if (r) {
                        Object.assign(t, {
                            [i]: true
                        });
                    }
                    return t;
                })(e, n);
            })(t, ()=>this._popScope(), ()=>this._popScope());
        }
        this._popScope();
        return t;
    }
    getClient() {
        return this.getStackTop().client;
    }
    getScope() {
        return this.getStackTop().scope;
    }
    getIsolationScope() {
        return this._isolationScope;
    }
    getStackTop() {
        return this._stack[this._stack.length - 1];
    }
    _pushScope() {
        let e = this.getScope().clone();
        this._stack.push({
            client: this.getClient(),
            scope: e
        });
        return e;
    }
    _popScope() {
        return !(this._stack.length <= 1) && !!this._stack.pop();
    }
}
function u() {
    let e = EU();
    let t = Se(e);
    return t.stack = t.stack || new l(BY("defaultCurrentScope", ()=>new H), BY("defaultIsolationScope", ()=>new H));
}
function withScope(e) {
    return u().withScope(e);
}
function withSetScope(e, t) {
    let r = u();
    return r.withScope(()=>{
        r.getStackTop().scope = e;
        return t(e);
    });
}
function withIsolationScope(e) {
    return u().withScope(()=>e(u().getIsolationScope()));
}
export function h(e) {
    let t = Se(e);
    if (t.acs) {
        return t.acs;
    }
    return {
        withIsolationScope,
        withScope,
        withSetScope,
        withSetIsolationScope: (e, t)=>withIsolationScope(t),
        getCurrentScope: ()=>u().getScope(),
        getIsolationScope: ()=>u().getIsolationScope()
    };
}
