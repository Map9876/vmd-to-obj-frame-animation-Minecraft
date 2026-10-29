import { p } from "../useStore-DX_rDZVw.js";
import { a } from "../redirect-Coy-z-9D.js";
function T(e) {
    return `Seroval Error (specific: ${e})`;
}
export class E extends Error {
    constructor(e){
        super(T(1));
        this.value = e;
    }
}
export class D extends Error {
    constructor(e){
        super(T(2));
    }
}
export class ut extends Error {
    constructor(e){
        super(T(3));
    }
}
export class O extends Error {
    constructor(e){
        super(T(4));
    }
}
export class dt extends Error {
    constructor(e){
        super(T(5));
        this.value = e;
    }
}
export class ft extends Error {
    constructor(e){
        super(T(6));
    }
}
export class pt extends Error {
    constructor(e){
        super(T(7));
    }
}
export class k extends Error {
    constructor(e){
        super(T(8));
    }
}
export class mt extends Error {
    constructor(e){
        super(T(9));
    }
}
export class ht {
    constructor(e, t){
        this.value = e;
        this.replacement = t;
    }
}
export const A = ()=>{
    let e = {
        p: 0,
        s: 0,
        f: 0
    };
    e.p = new Promise((resolve, reject)=>{
        e.s = resolve;
        e.f = reject;
    });
    return e;
};
export const gt = ()=>{
    let e = [];
    let t = [];
    let n = true;
    let r = false;
    let i = 0;
    let a = {
        flush (e, n, r) {
            for(r = 0; r < i; r++){
                if (t[r]) {
                    t[r][n](e);
                }
            }
        },
        up (t, i, a, o) {
            i = 0;
            for(a = e.length; i < a; i++){
                o = e[i];
                if (!n && i === a - 1) {
                    t[r ? `return` : `throw`](o);
                } else {
                    t.next(o);
                }
            }
        },
        on (e, r) {
            if (n) {
                r = i++;
                t[r] = e;
            }
            a.up(e);
            return ()=>{
                if (n) {
                    t[r] = t[i];
                    t[i--] = undefined;
                }
            };
        }
    };
    return {
        __SEROVAL_STREAM__: true,
        on (e) {
            return a.on(e);
        },
        next (t) {
            if (n) {
                e.push(t);
                a.flush(t, `next`);
            }
        },
        throw (i) {
            if (n) {
                e.push(i);
                a.flush(i, `throw`);
                n = false;
                r = false;
                t.length = 0;
            }
        },
        return (i) {
            if (n) {
                e.push(i);
                a.flush(i, `return`);
                n = false;
                r = true;
                t.length = 0;
            }
        }
    };
};
export const _t = (e)=>(t)=>()=>{
            let n = 0;
            let r = {
                [e] () {
                    return r;
                },
                next () {
                    if (n > t.d) {
                        return {
                            done: true,
                            value: undefined
                        };
                    }
                    let e = n++;
                    let r = t.v[e];
                    if (e === t.t) {
                        throw r;
                    }
                    return {
                        done: e === t.d,
                        value: r
                    };
                }
            };
            return r;
        };
export const vt = (e, t)=>(n)=>()=>{
            let r = 0;
            let i = -1;
            let a = false;
            let o = [];
            let s = [];
            let c = {
                finalize (e = 0, t = s.length) {
                    for(; e < t; e++){
                        s[e].s({
                            done: true,
                            value: undefined
                        });
                    }
                }
            };
            n.on({
                next (e) {
                    let t = s.shift();
                    if (t) {
                        t.s({
                            done: false,
                            value: e
                        });
                    }
                    o.push(e);
                },
                throw (e) {
                    let t = s.shift();
                    if (t) {
                        t.f(e);
                    }
                    c.finalize();
                    i = o.length;
                    a = true;
                    o.push(e);
                },
                return (e) {
                    let t = s.shift();
                    if (t) {
                        t.s({
                            done: true,
                            value: e
                        });
                    }
                    c.finalize();
                    i = o.length;
                    o.push(e);
                }
            });
            let l = {
                [e] () {
                    return l;
                },
                next () {
                    if (i === -1) {
                        let e = r++;
                        if (e >= o.length) {
                            let e = t();
                            s.push(e);
                            return e.p;
                        }
                        return {
                            done: false,
                            value: o[e]
                        };
                    }
                    if (r > i) {
                        return {
                            done: true,
                            value: undefined
                        };
                    }
                    let e = r++;
                    let n = o[e];
                    if (e !== i) {
                        return {
                            done: false,
                            value: n
                        };
                    }
                    if (a) {
                        throw n;
                    }
                    return {
                        done: true,
                        value: n
                    };
                }
            };
            return l;
        };
export const yt = (e)=>{
    let t = atob(e);
    let t_length = t.length;
    let r = new Uint8Array(t_length);
    for(let e = 0; e < t_length; e++){
        r[e] = t.charCodeAt(e);
    }
    return r.buffer;
};
