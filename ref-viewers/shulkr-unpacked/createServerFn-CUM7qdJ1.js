import { ee } from "./createServerFn-CUM7qdJ1/chunk_ee.js";
import { Se, _, _e, be, ge, he, ve, xe, ye } from "./createServerFn-CUM7qdJ1/chunk_he.js";
import { y } from "./createServerFn-CUM7qdJ1/chunk_Ce.js";
import { b } from "./createServerFn-CUM7qdJ1/chunk_we.js";
import { Ee, Oe, S as value, ke, x } from "./createServerFn-CUM7qdJ1/chunk_Ee_2.js";
import { ct, lt } from "./createServerFn-CUM7qdJ1/chunk_rt.js";
import { A, D, E, O, _t, gt, ht, k, mt, pt, ut, vt, yt } from "./createServerFn-CUM7qdJ1/chunk_T.js";
import { cn } from "./createServerFn-CUM7qdJ1/chunk_sn.js";
import { vn } from "./createServerFn-CUM7qdJ1/chunk_gn.js";
import { V } from "./createServerFn-CUM7qdJ1/chunk_bn.js";
import { K, dr, hr, lr, mr, pr, q, sr } from "./createServerFn-CUM7qdJ1/chunk_sr.js";
import { Ir } from "./createServerFn-CUM7qdJ1/chunk_Fr.js";
import { Kr } from "./createServerFn-CUM7qdJ1/chunk_Wr.js";
import { Q, qr } from "./createServerFn-CUM7qdJ1/chunk_qr.js";
import { p } from "./useStore-DX_rDZVw.js";
import { a as a_1, n, o, t as t_1 } from "./redirect-Coy-z-9D.js";
const a = `__TSS_CONTEXT`;
export const i = Symbol.for(`TSS_SERVER_FUNCTION`);
const s = Symbol.for(`TSS_SERVER_FUNCTION_FACTORY`);
const c = `application/x-tss-framed`;
const l = {
    JSON: 0,
    CHUNK: 1,
    END: 2,
    ERROR: 3
};
`${c}`;
const f = ()=>window.__TSS_START_OPTIONS__;
const ue = {
    [Symbol.asyncIterator]: 0,
    [Symbol.hasInstance]: 1,
    [Symbol.isConcatSpreadable]: 2,
    [Symbol.iterator]: 3,
    [Symbol.match]: 4,
    [Symbol.matchAll]: 5,
    [Symbol.replace]: 6,
    [Symbol.search]: 7,
    [Symbol.species]: 8,
    [Symbol.split]: 9,
    [Symbol.toPrimitive]: 10,
    [Symbol.toStringTag]: 11,
    [Symbol.unscopables]: 12
};
const de = {
    0: Symbol.asyncIterator,
    1: Symbol.hasInstance,
    2: Symbol.isConcatSpreadable,
    3: Symbol.iterator,
    4: Symbol.match,
    5: Symbol.matchAll,
    6: Symbol.replace,
    7: Symbol.search,
    8: Symbol.species,
    9: Symbol.split,
    10: Symbol.toPrimitive,
    11: Symbol.toStringTag,
    12: Symbol.unscopables
};
const fe = {
    2: true,
    3: false,
    1: undefined,
    0: null,
    4: -0,
    5: Infinity,
    6: -Infinity,
    7: NaN
};
const pe = {
    0: `Error`,
    1: `EvalError`,
    2: `RangeError`,
    3: `ReferenceError`,
    4: `SyntaxError`,
    5: `TypeError`,
    6: `URIError`
};
const me = {
    0: Error,
    1: EvalError,
    2: RangeError,
    3: ReferenceError,
    4: SyntaxError,
    5: TypeError,
    6: URIError
};
if (typeof globalThis < `u`) {
    Object.defineProperty(globalThis, x, {
        value,
        configurable: true,
        writable: false,
        enumerable: false
    });
} else if (typeof window < `u`) {
    Object.defineProperty(window, x, {
        value,
        configurable: true,
        writable: false,
        enumerable: false
    });
} else if (typeof self < `u`) {
    Object.defineProperty(self, x, {
        value,
        configurable: true,
        writable: false,
        enumerable: false
    });
} else if (typeof global < `u`) {
    Object.defineProperty(global, x, {
        value,
        configurable: true,
        writable: false,
        enumerable: false
    });
}
function C(e) {
    if (e instanceof EvalError) {
        return 1;
    }
    if (e instanceof RangeError) {
        return 2;
    }
    if (e instanceof ReferenceError) {
        return 3;
    }
    if (e instanceof SyntaxError) {
        return 4;
    }
    if (e instanceof TypeError) {
        return 5;
    }
    if (e instanceof URIError) {
        return 6;
    }
    return 0;
}
function Ae(e) {
    let t = pe[C(e)];
    if (e.name === t) {
        if (e.constructor.name === t) {
            return {};
        }
        return {
            name: e.constructor.name
        };
    }
    return {
        name: e.name
    };
}
function je(e, features) {
    let n = Ae(e);
    let r = Object.getOwnPropertyNames(e);
    for(let i = 0, a = r.length, o; i < a; i++){
        o = r[i];
        if (o !== `name` && o !== `message`) {
            if (o === `stack`) {
                if (features & 4) {
                    n ||= {};
                    n[o] = e[o];
                }
            } else {
                n ||= {};
                n[o] = e[o];
            }
        }
    }
    return n;
}
function Me(e) {
    if (Object.isFrozen(e)) {
        return 3;
    }
    if (Object.isSealed(e)) {
        return 2;
    }
    return +!Object.isExtensible(e);
}
function Ne(e) {
    switch(e){
        case Infinity:
            return be;
        case -Infinity:
            return xe;
    }
    if (e === e) {
        if (Object.is(e, -0)) {
            return ye;
        }
        return _(0, undefined, e, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    }
    return Se;
}
function Pe(e) {
    return _(1, undefined, y(e), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
}
function Fe(e) {
    return _(3, undefined, `` + e, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
}
function Ie(e) {
    return _(4, e, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
}
function Le(e, t) {
    let n = t.valueOf();
    return _(5, e, n === n ? t.toISOString() : ``, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
}
function w(e, t, n) {
    return _(36, e, n.toString(), t, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
}
function Re(e, t) {
    return _(6, e, undefined, y(t.source), t.flags, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
}
function ze(e, t) {
    return _(17, e, ue[t], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
}
function Be(e, t) {
    return _(18, e, y(Oe(t)), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
}
function Ve(e, tag, n) {
    return _(25, e, n, y(tag), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
}
function He(e, t, n) {
    return _(9, e, undefined, undefined, undefined, undefined, undefined, n, undefined, undefined, Me(t), undefined);
}
function Ue(e, t) {
    return _(21, e, undefined, undefined, undefined, undefined, undefined, undefined, t, undefined, undefined, undefined);
}
function We(e, t, n) {
    return _(15, e, undefined, t.constructor.name, undefined, undefined, undefined, undefined, n, t.byteOffset, undefined, t.length);
}
function Ge(e, t, n) {
    return _(16, e, undefined, t.constructor.name, undefined, undefined, undefined, undefined, n, t.byteOffset, undefined, t.length);
}
function Ke(e, t, n) {
    return _(20, e, undefined, undefined, undefined, undefined, undefined, undefined, n, t.byteOffset, undefined, t.byteLength);
}
function qe(e, t, n) {
    return _(13, e, C(t), undefined, y(t.message), n, undefined, undefined, undefined, undefined, undefined, undefined);
}
function Je(e, t, n) {
    return _(14, e, C(t), undefined, y(t.message), n, undefined, undefined, undefined, undefined, undefined, undefined);
}
function Ye(e, t) {
    return _(7, e, undefined, undefined, undefined, undefined, undefined, t, undefined, undefined, undefined, undefined);
}
function Xe(e, t) {
    return _(28, undefined, undefined, undefined, undefined, undefined, undefined, [
        e,
        t
    ], undefined, undefined, undefined, undefined);
}
function Ze(e, t) {
    return _(30, undefined, undefined, undefined, undefined, undefined, undefined, [
        e,
        t
    ], undefined, undefined, undefined, undefined);
}
function Qe(e, t, n) {
    return _(31, e, undefined, undefined, undefined, undefined, undefined, n, t, undefined, undefined, undefined);
}
function $e(e, t) {
    return _(32, e, undefined, undefined, undefined, undefined, undefined, undefined, t, undefined, undefined, undefined);
}
function et(e, t) {
    return _(33, e, undefined, undefined, undefined, undefined, undefined, undefined, t, undefined, undefined, undefined);
}
function tt(e, t) {
    return _(34, e, undefined, undefined, undefined, undefined, undefined, undefined, t, undefined, undefined, undefined);
}
function nt(e, t, n, r) {
    return _(35, e, n, undefined, undefined, undefined, undefined, t, undefined, undefined, undefined, r);
}
function bt(e) {
    return `__SEROVAL_SEQUENCE__` in e;
}
function xt(e, t, d) {
    return {
        __SEROVAL_SEQUENCE__: true,
        v: e,
        t,
        d
    };
}
function St(e) {
    let t = [];
    let n = -1;
    let r = -1;
    let i = e[Symbol.iterator]();
    while(true){
        try {
            let e = i.next();
            t.push(e.value);
            if (e.done) {
                r = t.length - 1;
                break;
            }
        } catch (error) {
            n = t.length;
            t.push(error);
        }
    }
    return xt(t, n, r);
}
const Ct = _t(Symbol.iterator);
function wt(e) {
    return Ct(e);
}
const Tt = {};
const Et = {};
const Dt = {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {}
};
function Ot(e) {
    return `__SEROVAL_STREAM__` in e;
}
function j() {
    return gt();
}
function kt(e) {
    let t = j();
    let n = e[Symbol.asyncIterator]();
    async function r() {
        try {
            let e = await n.next();
            if (e.done) {
                t.return(e.value);
            } else {
                t.next(e.value);
                await r();
            }
        } catch (error) {
            t.throw(error);
        }
    }
    r().catch(()=>{});
    return t;
}
const At = vt(Symbol.asyncIterator, A);
function jt(e) {
    return At(e);
}
async function Mt(e) {
    try {
        return [
            1,
            await e
        ];
    } catch (error) {
        return [
            0,
            error
        ];
    }
}
function Nt(mode, t) {
    return {
        plugins: t.plugins,
        mode,
        marked: new Set,
        features: 127 ^ (t.disabledFeatures || 0),
        refs: t.refs || new Map,
        depthLimit: t.depthLimit || 1000
    };
}
function M(e, t) {
    e.marked.add(t);
}
function Pt(e, t) {
    let size = e.refs.size;
    e.refs.set(t, size);
    return size;
}
function N(e, t) {
    let n = e.refs.get(t);
    if (n == null) {
        return {
            type: 0,
            value: Pt(e, t)
        };
    }
    M(e, n);
    return {
        type: 1,
        value: Ie(n)
    };
}
function P(e, t) {
    let n = N(e, t);
    if (n.type === 1) {
        return n;
    }
    if (Ee(t)) {
        return {
            type: 2,
            value: Be(n.value, t)
        };
    }
    return n;
}
function F(base, t) {
    let n = P(base, t);
    if (n.type !== 0) {
        return n.value;
    }
    if (t in ue) {
        return ze(n.value, t);
    }
    throw new E(t);
}
function I(base, t) {
    let n = N(base, Dt[t]);
    if (n.type === 1) {
        return n.value;
    }
    return _(26, n.value, t, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
}
function Ft(base) {
    let t = N(base, Tt);
    if (t.type === 1) {
        return t.value;
    }
    return _(27, t.value, undefined, undefined, undefined, undefined, undefined, undefined, F(base, Symbol.iterator), undefined, undefined, undefined);
}
function It(base) {
    let t = N(base, Et);
    if (t.type === 1) {
        return t.value;
    }
    return _(29, t.value, undefined, undefined, undefined, undefined, undefined, [
        I(base, 1),
        F(base, Symbol.asyncIterator)
    ], undefined, undefined, undefined, undefined);
}
function Lt(e, t, n, r) {
    return _(n ? 11 : 10, e, undefined, undefined, undefined, r, undefined, undefined, undefined, undefined, Me(t), undefined);
}
function Rt(base, t, k_1, r) {
    return _(8, t, undefined, undefined, undefined, undefined, {
        k: k_1,
        v: r
    }, undefined, I(base, 0), undefined, undefined, undefined);
}
function zt(base, t, n) {
    let r = new Uint8Array(n);
    let i = ``;
    for(let e = 0, t = r.length; e < t; e++){
        i += String.fromCharCode(r[e]);
    }
    return _(19, t, y(btoa(i)), undefined, undefined, undefined, undefined, undefined, I(base, 5), undefined, undefined, undefined);
}
function Bt(e, t) {
    return {
        base: Nt(e, t),
        child: undefined
    };
}
var Vt = class {
    constructor(e, t){
        this._p = e;
        this.depth = t;
    }
    parse(e) {
        return z(this._p, this.depth, e);
    }
};
async function Ht(e, t, n) {
    let r = [];
    for(let i = 0, a = n.length; i < a; i++){
        if (i in n) {
            r[i] = await z(e, t, n[i]);
        } else {
            r[i] = 0;
        }
    }
    return r;
}
async function Ut(e, t, n, r) {
    return He(n, r, await Ht(e, t, r));
}
async function L(e, t, n) {
    let r = Object.entries(n);
    let k_1 = [];
    let a = [];
    for(let n = 0, o = r.length; n < o; n++){
        k_1.push(y(r[n][0]));
        a.push(await z(e, t, r[n][1]));
    }
    if (Symbol.iterator in n) {
        k_1.push(F(e.base, Symbol.iterator));
        a.push(Xe(Ft(e.base), await z(e, t, St(n))));
    }
    if (Symbol.asyncIterator in n) {
        k_1.push(F(e.base, Symbol.asyncIterator));
        a.push(Ze(It(e.base), await z(e, t, kt(n))));
    }
    if (Symbol.toStringTag in n) {
        k_1.push(F(e.base, Symbol.toStringTag));
        a.push(Pe(n[Symbol.toStringTag]));
    }
    if (Symbol.isConcatSpreadable in n) {
        k_1.push(F(e.base, Symbol.isConcatSpreadable));
        a.push(n[Symbol.isConcatSpreadable] ? he : ge);
    }
    return {
        k: k_1,
        v: a
    };
}
async function R(e, t, n, r, i) {
    return Lt(n, r, i, await L(e, t, r));
}
async function Wt(e, t, n, r) {
    return Ue(n, await z(e, t, r.valueOf()));
}
async function Gt(e, t, n, r) {
    return We(n, r, await z(e, t, r.buffer));
}
async function Kt(e, t, n, r) {
    return Ge(n, r, await z(e, t, r.buffer));
}
async function qt(e, t, n, r) {
    return Ke(n, r, await z(e, t, r.buffer));
}
async function Jt(e, t, n, r) {
    let i = je(r, e.base.features);
    return qe(n, r, i ? await L(e, t, i) : undefined);
}
async function Yt(e, t, n, r) {
    let i = je(r, e.base.features);
    return Je(n, r, i ? await L(e, t, i) : undefined);
}
async function Xt(e, t, n, r) {
    let i = [];
    let a = [];
    for (let [n, o] of r.entries()){
        i.push(await z(e, t, n));
        a.push(await z(e, t, o));
    }
    return Rt(e.base, n, i, a);
}
async function Zt(e, t, n, r) {
    let i = [];
    for (let n of r.keys()){
        i.push(await z(e, t, n));
    }
    return Ye(n, i);
}
async function Qt(e, t, n, r) {
    let plugins = e.base.plugins;
    if (plugins) {
        for(let a = 0, o = plugins.length; a < o; a++){
            let plugin = plugins[a];
            if (plugin.parse.async && plugin.test(r)) {
                return Ve(n, plugin.tag, await plugin.parse.async(r, new Vt(e, t), {
                    id: n
                }));
            }
        }
    }
}
async function $t(e, t, n, r) {
    let [i, a] = await Mt(r);
    return _(12, n, i, undefined, undefined, undefined, undefined, undefined, await z(e, t, a), undefined, undefined, undefined);
}
function en(e, t, n, r, i) {
    let a = [];
    let o = n.on({
        next: (n)=>{
            M(this.base, t);
            z(this, e, n).then((e)=>{
                a.push($e(t, e));
            }, (e)=>{
                i(e);
                o();
            });
        },
        throw: (n)=>{
            M(this.base, t);
            z(this, e, n).then((e)=>{
                a.push(et(t, e));
                r(a);
                o();
            }, (e)=>{
                i(e);
                o();
            });
        },
        return: (n)=>{
            M(this.base, t);
            z(this, e, n).then((e)=>{
                a.push(tt(t, e));
                r(a);
                o();
            }, (e)=>{
                i(e);
                o();
            });
        }
    });
}
async function tn(e, t, n, r) {
    return Qe(n, I(e.base, 4), await new Promise(en.bind(e, t, n, r)));
}
async function nn(e, t, n, r) {
    let i = [];
    for(let n = 0, a = r.v.length; n < a; n++){
        i[n] = await z(e, t, r.v[n]);
    }
    return nt(n, i, r.t, r.d);
}
async function rn(e, t, n, r) {
    if (Array.isArray(r)) {
        return Ut(e, t, n, r);
    }
    if (Ot(r)) {
        return tn(e, t, n, r);
    }
    if (bt(r)) {
        return nn(e, t, n, r);
    }
    let r_constructor = r.constructor;
    if (r_constructor !== undefined && typeof r_constructor != `function`) {
        let e = Object.getPrototypeOf(r);
        r_constructor = e === null ? undefined : e.constructor;
    }
    if (r_constructor === ht) {
        return z(e, t, r.replacement);
    }
    let a = await Qt(e, t, n, r);
    if (a) {
        return a;
    }
    switch(r_constructor){
        case Object:
            return R(e, t, n, r, false);
        case undefined:
            return R(e, t, n, r, true);
        case Date:
            return Le(n, r);
        case Error:
        case EvalError:
        case RangeError:
        case ReferenceError:
        case SyntaxError:
        case TypeError:
        case URIError:
            return Jt(e, t, n, r);
        case Number:
        case Boolean:
        case String:
        case BigInt:
            return Wt(e, t, n, r);
        case ArrayBuffer:
            return zt(e.base, n, r);
        case Int8Array:
        case Int16Array:
        case Int32Array:
        case Uint8Array:
        case Uint16Array:
        case Uint32Array:
        case Uint8ClampedArray:
        case Float32Array:
        case Float64Array:
            return Gt(e, t, n, r);
        case DataView:
            return qt(e, t, n, r);
        case Map:
            return Xt(e, t, n, r);
        case Set:
            return Zt(e, t, n, r);
        default:
            break;
    }
    if (r_constructor === Promise || r instanceof Promise) {
        return $t(e, t, n, r);
    }
    let features = e.base.features;
    if (features & 32 && r_constructor === RegExp) {
        return Re(n, r);
    }
    if (features & 16) {
        switch(r_constructor){
            case BigInt64Array:
            case BigUint64Array:
                return Kt(e, t, n, r);
            default:
                break;
        }
    }
    if (features & 1 && typeof AggregateError < `u` && (r_constructor === AggregateError || r instanceof AggregateError)) {
        return Yt(e, t, n, r);
    }
    if (features & 64 && typeof Temporal < `u`) {
        switch(r_constructor){
            case Temporal.Instant:
                return w(n, 0, r);
            case Temporal.Duration:
                return w(n, 1, r);
            case Temporal.PlainDate:
                return w(n, 2, r);
            case Temporal.PlainDateTime:
                return w(n, 3, r);
            case Temporal.PlainMonthDay:
                return w(n, 4, r);
            case Temporal.PlainTime:
                return w(n, 5, r);
            case Temporal.PlainYearMonth:
                return w(n, 6, r);
            case Temporal.ZonedDateTime:
                return w(n, 7, r);
            default:
                break;
        }
    }
    if (r instanceof Error) {
        return Jt(e, t, n, r);
    }
    if (Symbol.iterator in r || Symbol.asyncIterator in r) {
        return R(e, t, n, r, !!r_constructor);
    }
    throw new E(r);
}
async function an(e, t, n) {
    let r = P(e.base, n);
    if (r.type !== 0) {
        return r.value;
    }
    let i = await Qt(e, t, r.value, n);
    if (i) {
        return i;
    }
    throw new E(n);
}
async function z(e, t, n) {
    if (t >= e.base.depthLimit) {
        throw new mt(e.base.depthLimit);
    }
    switch(typeof n){
        case `boolean`:
            if (n) {
                return he;
            }
            return ge;
        case `undefined`:
            return _e;
        case `string`:
            return Pe(n);
        case `number`:
            return Ne(n);
        case `bigint`:
            return Fe(n);
        case `object`:
            if (n) {
                let r = P(e.base, n);
                if (r.type === 0) {
                    return await rn(e, t + 1, r.value, n);
                }
                return r.value;
            }
            return ve;
        case `symbol`:
            return F(e.base, n);
        case `function`:
            return an(e, t, n);
        default:
            throw new E(n);
    }
}
async function on(e, t) {
    try {
        return await z(e, 0, t);
    } catch (error) {
        throw error instanceof ct ? error : new ct(error);
    }
}
function B(e) {
    return e;
}
function ln(e) {
    switch(e){
        case `Int8Array`:
            return Int8Array;
        case `Int16Array`:
            return Int16Array;
        case `Int32Array`:
            return Int32Array;
        case `Uint8Array`:
            return Uint8Array;
        case `Uint16Array`:
            return Uint16Array;
        case `Uint32Array`:
            return Uint32Array;
        case `Uint8ClampedArray`:
            return Uint8ClampedArray;
        case `Float32Array`:
            return Float32Array;
        case `Float64Array`:
            return Float64Array;
        case `BigInt64Array`:
            return BigInt64Array;
        case `BigUint64Array`:
            return BigUint64Array;
        default:
            throw new pt(e);
    }
}
function un(e) {
    switch(e){
        case `constructor`:
        case `__proto__`:
        case `prototype`:
        case `__defineGetter__`:
        case `__defineSetter__`:
        case `__lookupGetter__`:
        case `__lookupSetter__`:
            return false;
        default:
            return true;
    }
}
function dn(e) {
    switch(e){
        case Symbol.asyncIterator:
        case Symbol.isConcatSpreadable:
        case Symbol.toStringTag:
        case Symbol.iterator:
            return true;
        default:
            return false;
    }
}
const fn = 1000000;
const pn = 10000;
const mn = 20000;
function hn(e, t) {
    switch(t){
        case 3:
            return Object.freeze(e);
        case 1:
            return Object.preventExtensions(e);
        case 2:
            return Object.seal(e);
        default:
            return e;
    }
}
var yn = class {
    constructor(e, t){
        this._p = e;
        this.depth = t;
    }
    deserialize(e) {
        return W(this._p, this.depth, e);
    }
};
function H(e, t, n) {
    if (Object.hasOwn(t, n)) {
        return t[n];
    }
    throw new k(e);
}
function Cn(e, t) {
    return V(e, t.i, ke(b(t.s)));
}
function wn(e, t, n) {
    let r = n.a;
    let r_length = r.length;
    let a = V(e, n.i, Array(r_length));
    for(let n = 0, o; n < r_length; n++){
        o = r[n];
        if (o) {
            a[n] = W(e, t, o);
        }
    }
    hn(a, n.o);
    return a;
}
function Tn(e, t, n) {
    if (un(t)) {
        e[t] = n;
    } else {
        Object.defineProperty(e, t, {
            value: n,
            configurable: true,
            enumerable: true,
            writable: true
        });
    }
}
function En(e, t, n, r, i) {
    if (typeof r == `string`) {
        Tn(n, b(r), W(e, t, i));
    } else {
        let a = W(e, t, r);
        switch(typeof a){
            case `string`:
                Tn(n, a, W(e, t, i));
                break;
            case `symbol`:
                if (dn(a)) {
                    n[a] = W(e, t, i);
                }
                break;
            default:
                throw new k(r);
        }
    }
}
function Dn(e, t, n) {
    e.base.refs.types.set(t, n);
}
function U(e, t, n, r) {
    if (e.base.refs.types.get(n) !== r) {
        throw new k(t);
    }
}
function On(e, t, n, r) {
    let i = n.k;
    if (i.length > 0) {
        for(let a = 0, o = n.v, s = i.length; a < s; a++){
            En(e, t, r, i[a], o[a]);
        }
    }
    return r;
}
function kn(e, t, n) {
    let r = V(e, n.i, n.t === 10 ? {} : Object.create(null));
    On(e, t, n.p, r);
    hn(r, n.o);
    return r;
}
function An(e, t) {
    return V(e, t.i, new Date(t.s));
}
function jn(e, t) {
    if (!(e.base.features & 64)) {
        throw new D(t);
    }
    let n;
    switch(t.c){
        case 0:
            n = Temporal.Instant.from(t.s);
            break;
        case 1:
            n = Temporal.Duration.from(t.s);
            break;
        case 2:
            n = Temporal.PlainDate.from(t.s);
            break;
        case 3:
            n = Temporal.PlainDateTime.from(t.s);
            break;
        case 4:
            n = Temporal.PlainMonthDay.from(t.s);
            break;
        case 5:
            n = Temporal.PlainTime.from(t.s);
            break;
        case 6:
            n = Temporal.PlainYearMonth.from(t.s);
            break;
        case 7:
            n = Temporal.ZonedDateTime.from(t.s);
            break;
        default:
            throw new k(t);
    }
    return V(e, t.i, n);
}
function Mn(e, t) {
    if (e.base.features & 32) {
        let n = b(t.c);
        if (n.length > mn) {
            throw new k(t);
        }
        return V(e, t.i, new RegExp(n, t.m));
    }
    throw new D(t);
}
function Nn(e, t, n) {
    let r = V(e, n.i, new Set);
    for(let i = 0, a = n.a, o = a.length; i < o; i++){
        r.add(W(e, t, a[i]));
    }
    return r;
}
function Pn(e, t, n) {
    let r = V(e, n.i, new Map);
    for(let i = 0, a = n.e.k, o = n.e.v, s = a.length; i < s; i++){
        r.set(W(e, t, a[i]), W(e, t, o[i]));
    }
    return r;
}
function Fn(e, t) {
    if (t.s.length > fn) {
        throw new k(t);
    }
    return V(e, t.i, yt(b(t.s)));
}
function In(e, t, n) {
    let r = ln(n.c);
    let i = W(e, t, n.f);
    let a = n.b ?? 0;
    if (a < 0 || a > i.byteLength) {
        throw new k(n);
    }
    return V(e, n.i, new r(i, a, n.l));
}
function Ln(e, t, n) {
    let r = W(e, t, n.f);
    let i = n.b ?? 0;
    if (i < 0 || i > r.byteLength) {
        throw new k(n);
    }
    return V(e, n.i, new DataView(r, i, n.l));
}
function Rn(e, t, n, r) {
    if (n.p) {
        let i = On(e, t, n.p, {});
        Object.defineProperties(r, Object.getOwnPropertyDescriptors(i));
    }
    return r;
}
function zn(e, t, n) {
    return Rn(e, t, n, V(e, n.i, AggregateError([], b(n.m))));
}
function Bn(e, t, n) {
    let r = H(n, me, n.s);
    return Rn(e, t, n, V(e, n.i, new r(b(n.m))));
}
function Vn(e, t, n) {
    let r = A();
    let i = V(e, n.i, r.p);
    let a = W(e, t, n.f);
    if (n.s) {
        r.s(a);
    } else {
        r.f(a);
    }
    return i;
}
function Hn(e, t, n) {
    return V(e, n.i, Object(W(e, t, n.f)));
}
function Un(e, t, n) {
    let plugins = e.base.plugins;
    if (plugins) {
        let i = b(n.c);
        for(let a = 0, o = plugins.length; a < o; a++){
            let plugin = plugins[a];
            if (plugin.tag === i) {
                return V(e, n.i, plugin.deserialize(n.s, new yn(e, t), {
                    id: n.i
                }));
            }
        }
    }
    throw new ut(n.c);
}
function Wn(e, t) {
    let n = V(e, t.i, V(e, t.s, A()).p);
    Dn(e, t.s, 22);
    return n;
}
function Gn(e, t, n) {
    let r = e.base.refs.get(n.i);
    if (r) {
        U(e, n, n.i, 22);
        r.s(W(e, t, n.a[1]));
        return;
    }
    throw new O(`Promise`);
}
function Kn(e, t, n) {
    let r = e.base.refs.get(n.i);
    if (r) {
        U(e, n, n.i, 22);
        r.f(W(e, t, n.a[1]));
        return;
    }
    throw new O(`Promise`);
}
function qn(e, t, n) {
    W(e, t, n.a[0]);
    return wt(W(e, t, n.a[1]));
}
function Jn(e, t, n) {
    W(e, t, n.a[0]);
    return jt(W(e, t, n.a[1]));
}
function Yn(e, t, n) {
    let r = V(e, n.i, j());
    Dn(e, n.i, 31);
    let i = n.a;
    let i_length = i.length;
    if (i_length) {
        for(let n = 0; n < i_length; n++){
            W(e, t, i[n]);
        }
    }
    return r;
}
function Xn(e, t, n) {
    let r = e.base.refs.get(n.i);
    if (r) {
        U(e, n, n.i, 31);
        r.next(W(e, t, n.f));
        return;
    }
    throw new O(`Stream`);
}
function Zn(e, t, n) {
    let r = e.base.refs.get(n.i);
    if (r) {
        U(e, n, n.i, 31);
        r.throw(W(e, t, n.f));
        return;
    }
    throw new O(`Stream`);
}
function Qn(e, t, n) {
    let r = e.base.refs.get(n.i);
    if (r) {
        U(e, n, n.i, 31);
        r.return(W(e, t, n.f));
        return;
    }
    throw new O(`Stream`);
}
function $n(e, t, n) {
    W(e, t, n.f);
}
function er(e, t, n) {
    W(e, t, n.a[1]);
}
function tr(e, t, n) {
    let r = V(e, n.i, xt([], n.s, n.l));
    for(let i = 0, a = n.a.length; i < a; i++){
        r.v[i] = W(e, t, n.a[i]);
    }
    return r;
}
function W(e, t, n) {
    if (t > e.base.depthLimit) {
        throw new mt(e.base.depthLimit);
    }
    t += 1;
    switch(n.t){
        case 2:
            return H(n, fe, n.s);
        case 0:
            return Number(n.s);
        case 1:
            return b(String(n.s));
        case 3:
            if (String(n.s).length > pn) {
                throw new k(n);
            }
            return BigInt(n.s);
        case 4:
            return e.base.refs.get(n.i);
        case 18:
            return Cn(e, n);
        case 9:
            return wn(e, t, n);
        case 10:
        case 11:
            return kn(e, t, n);
        case 5:
            return An(e, n);
        case 6:
            return Mn(e, n);
        case 7:
            return Nn(e, t, n);
        case 8:
            return Pn(e, t, n);
        case 19:
            return Fn(e, n);
        case 16:
        case 15:
            return In(e, t, n);
        case 20:
            return Ln(e, t, n);
        case 14:
            return zn(e, t, n);
        case 13:
            return Bn(e, t, n);
        case 12:
            return Vn(e, t, n);
        case 17:
            return H(n, de, n.s);
        case 21:
            return Hn(e, t, n);
        case 25:
            return Un(e, t, n);
        case 22:
            return Wn(e, n);
        case 23:
            return Gn(e, t, n);
        case 24:
            return Kn(e, t, n);
        case 28:
            return qn(e, t, n);
        case 30:
            return Jn(e, t, n);
        case 31:
            return Yn(e, t, n);
        case 32:
            return Xn(e, t, n);
        case 33:
            return Zn(e, t, n);
        case 34:
            return Qn(e, t, n);
        case 27:
            return $n(e, t, n);
        case 29:
            return er(e, t, n);
        case 35:
            return tr(e, t, n);
        case 36:
            return jn(e, n);
        default:
            throw new D(n);
    }
}
function nr(e, t) {
    try {
        return W(e, 0, t);
    } catch (error) {
        throw new lt(error);
    }
}
function rr(e, t) {
    return nr(vn({
        plugins: cn(t.plugins),
        refs: t.refs,
        features: t.features,
        disabledFeatures: t.disabledFeatures,
        depthLimit: t.depthLimit
    }), e);
}
async function ir(e, t = {}) {
    let n = Bt(1, {
        plugins: cn(t.plugins),
        disabledFeatures: t.disabledFeatures
    });
    return {
        t: await on(n, e),
        f: n.base.features,
        m: Array.from(n.base.marked)
    };
}
function ar(e) {
    return e;
}
function or(e) {
    return B({
        tag: `$TSR/t/` + e.key,
        test: e.test,
        parse: {
            sync (t, n, r) {
                return {
                    v: n.parse(e.toSerializable(t))
                };
            },
            async async (t, n, r) {
                return {
                    v: await n.parse(e.toSerializable(t))
                };
            },
            stream (t, n, r) {
                return {
                    v: n.parse(e.toSerializable(t))
                };
            }
        },
        serialize: undefined,
        deserialize (t, n, r) {
            return e.fromSerializable(n.deserialize(t.v));
        }
    });
}
function gr(stream) {
    let t = j();
    let n = stream.getReader();
    (async ()=>{
        try {
            while(true){
                let { done, value } = await n.read();
                if (done) {
                    t.return(undefined);
                    break;
                }
                t.next(lr(value));
            }
        } catch (error) {
            t.throw(error);
        } finally{
            n.releaseLock();
        }
    })();
    return t;
}
function _r(stream) {
    let t = j();
    let n = stream.getReader();
    let r = new TextDecoder(`utf-8`, {
        fatal: true
    });
    (async ()=>{
        try {
            while(true){
                let { done, value } = await n.read();
                if (done) {
                    try {
                        let e = r.decode();
                        if (e.length > 0) {
                            t.next(e);
                        }
                    } catch  {}
                    t.return(undefined);
                    break;
                }
                try {
                    let e = r.decode(value, {
                        stream: true
                    });
                    if (e.length > 0) {
                        t.next(e);
                    }
                } catch  {
                    t.next({
                        $b64: lr(value)
                    });
                }
            }
        } catch (error) {
            t.throw(error);
        } finally{
            n.releaseLock();
        }
    })();
    return t;
}
const vr = B({
    tag: `tss/RawStream`,
    extends: [
        B({
            tag: `tss/RawStreamFactory`,
            test (e) {
                return e === K;
            },
            parse: {
                sync (e, t, n) {
                    return {};
                },
                async async (e, t, n) {
                    return {};
                },
                stream (e, t, n) {
                    return {};
                }
            },
            serialize (e, t, n) {
                return mr;
            },
            deserialize (e, t, n) {
                return K;
            }
        }),
        B({
            tag: `tss/RawStreamFactoryText`,
            test (e) {
                return e === q;
            },
            parse: {
                sync (e, t, n) {
                    return {};
                },
                async async (e, t, n) {
                    return {};
                },
                stream (e, t, n) {
                    return {};
                }
            },
            serialize (e, t, n) {
                return hr;
            },
            deserialize (e, t, n) {
                return q;
            }
        })
    ],
    test (e) {
        return e instanceof sr;
    },
    parse: {
        sync (e, t, n) {
            let r = e.hint === `text` ? q : K;
            return {
                hint: t.parse(e.hint),
                factory: t.parse(r),
                stream: t.parse(j())
            };
        },
        async async (e, t, n) {
            let r = e.hint === `text` ? q : K;
            let i = e.hint === `text` ? _r(e.stream) : gr(e.stream);
            return {
                hint: await t.parse(e.hint),
                factory: await t.parse(r),
                stream: await t.parse(i)
            };
        },
        stream (e, t, n) {
            let r = e.hint === `text` ? q : K;
            let i = e.hint === `text` ? _r(e.stream) : gr(e.stream);
            return {
                hint: t.parse(e.hint),
                factory: t.parse(r),
                stream: t.parse(i)
            };
        }
    },
    serialize (e, t, n) {
        return `(` + t.serialize(e.factory) + `)(` + t.serialize(e.stream) + `)`;
    },
    deserialize (e, t, n) {
        let r = t.deserialize(e.stream);
        if (t.deserialize(e.hint) === `text`) {
            return pr(r);
        }
        return dr(r);
    }
});
function yr(getOrCreateStream) {
    return B({
        tag: `tss/RawStream`,
        test: ()=>false,
        parse: {},
        serialize () {
            throw Error(`RawStreamDeserializePlugin.serialize should not be called. Client only deserializes.`);
        },
        deserialize (t, n, r) {
            return getOrCreateStream(typeof n?.deserialize == `function` ? n.deserialize(t.streamId) : t.streamId);
        }
    });
}
const br = B({
    tag: `$TSR/Error`,
    test (e) {
        return e instanceof Error;
    },
    parse: {
        sync (e, t) {
            return {
                message: t.parse(e.message)
            };
        },
        async async (e, t) {
            return {
                message: await t.parse(e.message)
            };
        },
        stream (e, t) {
            return {
                message: t.parse(e.message)
            };
        }
    },
    serialize (e, t) {
        return `new Error(` + t.serialize(e.message) + `)`;
    },
    deserialize (e, t) {
        return Error(t.deserialize(e.message));
    }
});
const J = {};
const xr = (e)=>new ReadableStream({
        start (t) {
            e.on({
                next (e) {
                    try {
                        t.enqueue(e);
                    } catch  {}
                },
                throw (e) {
                    t.error(e);
                },
                return () {
                    try {
                        t.close();
                    } catch  {}
                }
            });
        }
    });
const Sr = B({
    tag: `seroval-plugins/web/ReadableStreamFactory`,
    test (e) {
        return e === J;
    },
    parse: {
        sync () {
            return J;
        },
        async async () {
            return await Promise.resolve(J);
        },
        stream () {
            return J;
        }
    },
    serialize () {
        return xr.toString();
    },
    deserialize () {
        return J;
    }
});
async function Cr(e, t) {
    try {
        let n = await t.read();
        if (n.done) {
            e.return(n.value);
            t.releaseLock();
        } else {
            e.next(n.value);
            await Cr(e, t);
        }
    } catch (error) {
        e.throw(error);
    }
}
function wr(e) {
    e.cancel().catch(()=>{});
    e.releaseLock();
}
function Tr(e) {
    let t = j();
    let n = e.getReader();
    let r = wr.bind(null, n);
    Cr(t, n).catch(r);
    return [
        t,
        r
    ];
}
const Er = [
    br,
    vr,
    B({
        tag: `seroval/plugins/web/ReadableStream`,
        extends: [
            Sr
        ],
        test (e) {
            if (typeof ReadableStream > `u`) {
                return false;
            }
            return e instanceof ReadableStream;
        },
        parse: {
            sync (e, t) {
                return {
                    factory: t.parse(J),
                    stream: t.parse(j())
                };
            },
            async async (e, t) {
                return {
                    factory: await t.parse(J),
                    stream: await t.parse(Tr(e)[0])
                };
            },
            stream (e, t) {
                let [n, r] = Tr(e);
                t.addCleanup(r);
                return {
                    factory: t.parse(J),
                    stream: t.parse(n)
                };
            }
        },
        serialize (e, t) {
            return `(` + t.serialize(e.factory) + `)(` + t.serialize(e.stream) + `)`;
        },
        deserialize (e, t) {
            return xr(t.deserialize(e.stream));
        }
    })
];
function Dr() {
    return [
        ...f()?.serializationAdapters?.map(or) ?? [],
        ...Er
    ];
}
const Or = new TextDecoder;
const kr = new Uint8Array;
const Ar = 16 * 1024 * 1024;
const jr = 32 * 1024 * 1024;
const Mr = 1024;
const Nr = 100000;
function Pr(body) {
    let t = new Map;
    let n = new Map;
    let r = new Set;
    let i = false;
    let a = null;
    let o = 0;
    let s;
    let jsonChunks = new ReadableStream({
        start (e) {
            s = e;
        },
        cancel () {
            i = true;
            try {
                a?.cancel();
            } catch  {}
            t.forEach((e)=>{
                try {
                    e.error(Error(`Framed response cancelled`));
                } catch  {}
            });
            t.clear();
            n.clear();
            r.clear();
        }
    });
    function getOrCreateStream(e) {
        let i = n.get(e);
        if (i) {
            return i;
        }
        if (r.has(e)) {
            return new ReadableStream({
                start (e) {
                    e.close();
                }
            });
        }
        if (n.size >= Mr) {
            throw Error(`Too many raw streams in framed response (max ${Mr})`);
        }
        let a = new ReadableStream({
            start (n) {
                t.set(e, n);
            },
            cancel () {
                r.add(e);
                t.delete(e);
                n.delete(e);
            }
        });
        n.set(e, a);
        return a;
    }
    function d(streamId) {
        getOrCreateStream(streamId);
        return t.get(streamId);
    }
    (async ()=>{
        let n = body.getReader();
        a = n;
        let c = [];
        let u = 0;
        function ee() {
            if (u < 9) {
                return null;
            }
            let e = c[0];
            if (e.length >= 9) {
                return {
                    type: e[0],
                    streamId: (e[1] << 24 | e[2] << 16 | e[3] << 8 | e[4]) >>> 0,
                    length: (e[5] << 24 | e[6] << 16 | e[7] << 8 | e[8]) >>> 0
                };
            }
            let t = new Uint8Array(9);
            let n = 0;
            let r = 9;
            for(let e = 0; e < c.length && r > 0; e++){
                let i = c[e];
                let a = Math.min(i.length, r);
                t.set(i.subarray(0, a), n);
                n += a;
                r -= a;
            }
            return {
                type: t[0],
                streamId: (t[1] << 24 | t[2] << 16 | t[3] << 8 | t[4]) >>> 0,
                length: (t[5] << 24 | t[6] << 16 | t[7] << 8 | t[8]) >>> 0
            };
        }
        function f(e) {
            if (e === 0) {
                return kr;
            }
            let t = c[0];
            if (t && t.length >= e) {
                let n = t.subarray(0, e);
                if (t.length === e) {
                    c.shift();
                } else {
                    c[0] = t.subarray(e);
                }
                u -= e;
                return n;
            }
            let n = new Uint8Array(e);
            let r = 0;
            let i = e;
            while(i > 0 && c.length > 0){
                let e = c[0];
                if (!e) {
                    break;
                }
                let t = Math.min(e.length, i);
                n.set(e.subarray(0, t), r);
                r += t;
                i -= t;
                if (t === e.length) {
                    c.shift();
                } else {
                    c[0] = e.subarray(t);
                }
            }
            u -= e;
            return n;
        }
        try {
            while(true){
                let { done, value } = await n.read();
                if (i || done) {
                    break;
                }
                if (value) {
                    if (u + value.length > jr) {
                        throw Error(`Framed response buffer exceeded ${jr} bytes`);
                    }
                    c.push(value);
                    for(u += value.length;;){
                        let e = ee();
                        if (!e) {
                            break;
                        }
                        let { type, streamId, length } = e;
                        if (type !== l.JSON && type !== l.CHUNK && type !== l.END && type !== l.ERROR) {
                            throw Error(`Unknown frame type: ${type}`);
                        }
                        if (type === l.JSON) {
                            if (streamId !== 0) {
                                throw Error(`Invalid JSON frame streamId (expected 0)`);
                            }
                        } else if (streamId === 0) {
                            throw Error(`Invalid raw frame streamId (expected non-zero)`);
                        }
                        if (length > Ar) {
                            throw Error(`Frame payload too large: ${length} bytes (max ${Ar})`);
                        }
                        let c = 9 + length;
                        if (u < c) {
                            break;
                        }
                        if (++o > Nr) {
                            throw Error(`Too many frames in framed response (max ${Nr})`);
                        }
                        f(9);
                        let p = f(length);
                        switch(type){
                            case l.JSON:
                                try {
                                    s.enqueue(Or.decode(p));
                                } catch  {}
                                break;
                            case l.CHUNK:
                                {
                                    let e = d(streamId);
                                    if (e) {
                                        e.enqueue(p);
                                    }
                                    break;
                                }
                            case l.END:
                                {
                                    let e = d(streamId);
                                    r.add(streamId);
                                    if (e) {
                                        try {
                                            e.close();
                                        } catch  {}
                                        t.delete(streamId);
                                    }
                                    break;
                                }
                            case l.ERROR:
                                {
                                    let e = d(streamId);
                                    r.add(streamId);
                                    if (e) {
                                        let n = Or.decode(p);
                                        e.error(Error(n));
                                        t.delete(streamId);
                                    }
                                    break;
                                }
                        }
                    }
                }
            }
            if (u !== 0) {
                throw Error(`Incomplete frame at end of framed response`);
            }
            try {
                s.close();
            } catch  {}
            t.forEach((e)=>{
                try {
                    e.close();
                } catch  {}
            });
            t.clear();
        } catch (error) {
            try {
                s.error(error);
            } catch  {}
            t.forEach((t)=>{
                try {
                    t.error(error);
                } catch  {}
            });
            t.clear();
        } finally{
            try {
                n.releaseLock();
            } catch  {}
            a = null;
        }
    })();
    return {
        getOrCreateStream,
        jsonChunks
    };
}
let plugins_1 = null;
async function X(e) {
    if (e.length > 0) {
        await Promise.allSettled(e);
    }
}
async function Lr(e, n, r) {
    plugins_1 ||= Dr();
    let i = n[0];
    let a = i.fetch ?? r;
    let o = i.data instanceof FormData ? `formData` : `payload`;
    let headers = i.headers ? new Headers(i.headers) : new Headers;
    headers.set(`x-tsr-serverFn`, `true`);
    if (o === `payload`) {
        headers.set(`accept`, `${c}, application/x-ndjson, application/json`);
    }
    if (i.method === `GET`) {
        if (o === `formData`) {
            throw Error(`FormData is not supported with GET requests`);
        }
        let payload = await Rr(i);
        if (payload !== undefined) {
            let r = a_1({
                payload
            });
            if (e.includes(`?`)) {
                e += `&${r}`;
            } else {
                e += `?${r}`;
            }
        }
    }
    let l;
    if (i.method === `POST`) {
        let e = await Br(i);
        if (e?.contentType) {
            headers.set(`content-type`, e.contentType);
        }
        l = e?.body;
    }
    return await Vr(async ()=>a(e, {
            method: i.method,
            headers,
            signal: i.signal,
            body: l
        }));
}
async function Rr(e) {
    let t = false;
    let n = {};
    if (e.data !== undefined) {
        t = true;
        n.data = e.data;
    }
    if (e.context && Ir(e.context)) {
        t = true;
        n.context = e.context;
    }
    if (t) {
        return zr(n);
    }
}
async function zr(e) {
    return JSON.stringify(await Promise.resolve(ir(e, {
        plugins: plugins_1
    })));
}
async function Br(e) {
    if (e.data instanceof FormData) {
        let t;
        if (e.context && Ir(e.context)) {
            t = await zr(e.context);
        }
        if (t !== undefined) {
            e.data.set(a, t);
        }
        return {
            body: e.data
        };
    }
    let t = await Rr(e);
    if (t) {
        return {
            body: t,
            contentType: `application/json`
        };
    }
}
async function Vr(t) {
    let i;
    try {
        i = await t();
    } catch (error) {
        if (error instanceof Response) {
            i = error;
        } else {
            console.log(error);
            throw error;
        }
    }
    if (i.headers.get(`x-tss-raw`) === `true`) {
        return i;
    }
    let a = i.headers.get(`content-type`);
    if (!a) {
        p();
    }
    if (i.headers.get(`x-tss-serialized`)) {
        let t;
        if (a.includes(`application/x-tss-framed`)) {
            ee(a);
            if (!i.body) {
                throw Error(`No response body for framed response`);
            }
            let { getOrCreateStream, jsonChunks } = Pr(i.body);
            let plugins = [
                yr(getOrCreateStream),
                ...plugins_1 || []
            ];
            let refs = new Map;
            t = await Hr({
                jsonStream: jsonChunks,
                onMessage: (e)=>rr(e, {
                        refs,
                        plugins
                    }),
                onError (e, t) {
                    console.error(e, t);
                }
            });
        } else if (a.includes(`application/json`)) {
            let e = await i.json();
            let n = [];
            try {
                t = rr(e, {
                    plugins: plugins_1
                });
            } finally{}
            await X(n);
        }
        if (!t) {
            p();
        }
        if (t instanceof Error) {
            throw t;
        }
        return t;
    }
    if (a.includes(`application/json`)) {
        let e = await i.json();
        let t = n(e);
        if (t) {
            throw t;
        }
        if (o(e)) {
            throw e;
        }
        return e;
    }
    if (!i.ok) {
        throw Error(await i.text());
    }
    return i;
}
async function Hr({ jsonStream, onMessage, onError }) {
    let r = jsonStream.getReader();
    let { value, done } = await r.read();
    if (done || !value) {
        throw Error(`Stream ended before first object`);
    }
    let o = JSON.parse(value);
    let s = false;
    let c = (async ()=>{
        try {
            while(true){
                let { value, done } = await r.read();
                if (done) {
                    break;
                }
                if (value) {
                    try {
                        let n = [];
                        try {
                            onMessage(JSON.parse(value));
                        } finally{}
                        await X(n);
                    } catch (error) {
                        onError?.(`Invalid JSON: ${value}`, error);
                    }
                }
            }
        } catch (error) {
            if (!s) {
                onError?.(`Stream processing error:`, error);
            }
        }
    })();
    let l;
    let u = [];
    try {
        l = onMessage(o);
    } catch (error) {
        s = true;
        r.cancel().catch(()=>{});
        throw error;
    }
    await X(u);
    Promise.resolve(l).catch(()=>{
        s = true;
        r.cancel().catch(()=>{});
    });
    c.finally(()=>{
        try {
            r.releaseLock();
        } catch  {}
    });
    return l;
}
function Ur(e) {
    let url = `/_serverFn/` + e;
    return Object.assign((...e)=>{
        let n = f()?.serverFns?.fetch;
        return Lr(url, e, n ?? fetch);
    }, {
        url,
        serverFnMeta: {
            id: e
        },
        [i]: true
    });
}
const Jr = ()=>{
    throw Error(`createServerOnlyFn() functions can only be called on the server!`);
};
const $ = (e, t)=>{
    let options = t || e || {};
    if (options.method === undefined) {
        options.method = `GET`;
    }
    let i = (e)=>$(undefined, {
            ...options,
            validator: e,
            inputValidator: e
        });
    return Object.assign((e)=>$(undefined, {
            ...options,
            ...e
        }), {
        options,
        middleware: (e)=>{
            let middleware = [
                ...options.middleware || []
            ];
            e.map((e)=>{
                if (s in e) {
                    if (e.options.middleware) {
                        middleware.push(...e.options.middleware);
                    }
                } else {
                    middleware.push(e);
                }
            });
            let n = $(undefined, {
                ...options,
                middleware
            });
            n[s] = true;
            return n;
        },
        validator: i,
        inputValidator: i,
        handler: (...e)=>{
            let [t, serverFn] = e;
            let a = {
                ...options,
                extractedFn: t,
                serverFn
            };
            let o = [
                ...a.middleware || [],
                Qr(a)
            ];
            t.method = options.method;
            return Object.assign(async (e)=>{
                let r = await Yr(o, `client`, {
                    ...t,
                    ...a,
                    data: e?.data,
                    headers: e?.headers,
                    signal: e?.signal,
                    fetch: e?.fetch,
                    context: qr()
                });
                let i = n(r.error);
                if (i) {
                    throw i;
                }
                if (r.error) {
                    throw r.error;
                }
                return r.result;
            }, {
                ...t,
                method: options.method,
                __executeServer: async (e)=>{
                    let n = Jr();
                    let n_contextAfterGlobalMiddlewares = n.contextAfterGlobalMiddlewares;
                    return await Yr(o, `server`, {
                        ...t,
                        ...e,
                        serverFnMeta: t.serverFnMeta,
                        context: Q(e.context, n_contextAfterGlobalMiddlewares),
                        request: n.request
                    }).then((e)=>({
                            result: e.result,
                            error: e.error,
                            context: e.sendContext
                        }));
                }
            });
        }
    });
};
async function Yr(e, t, n) {
    let r = Xr([
        ...f()?.functionMiddleware || [],
        ...e
    ]);
    if (t === `server`) {
        let e = Jr({
            throwIfNotFound: false
        });
        if (e?.executedRequestMiddlewares) {
            r = r.filter((t)=>!e.executedRequestMiddlewares.has(t));
        }
    }
    let a = async (e)=>{
        let n = r.shift();
        if (!n) {
            return e;
        }
        try {
            let r = `validator` in n.options ? n.options.validator : undefined;
            if (!r && `inputValidator` in n.options) {
                r = n.options.inputValidator;
            }
            if (r && t === `server`) {
                e.data = await Zr(r, e.data);
            }
            let o;
            if (t === `client`) {
                if (`client` in n.options) {
                    o = n.options.client;
                }
            } else if (`server` in n.options) {
                o = n.options.server;
            }
            if (o) {
                let next = async (t = {})=>{
                    let n = await a({
                        ...e,
                        ...t,
                        context: Q(e.context, t.context),
                        sendContext: Q(e.sendContext, t.sendContext),
                        headers: Kr(e.headers, t.headers),
                        _callSiteFetch: e._callSiteFetch,
                        fetch: e._callSiteFetch ?? t.fetch ?? e.fetch,
                        result: t.result === undefined ? t instanceof Response ? t : e.result : t.result,
                        error: t.error ?? e.error
                    });
                    if (n.error) {
                        throw n.error;
                    }
                    return n;
                };
                let n = await o({
                    ...e,
                    next
                });
                if (t_1(n)) {
                    return {
                        ...e,
                        error: n
                    };
                }
                if (n instanceof Response) {
                    return {
                        ...e,
                        result: n
                    };
                }
                if (!n) {
                    throw Error(`User middleware returned undefined. You must call next() or return a result in your middlewares.`);
                }
                return n;
            }
            return a(e);
        } catch (error) {
            return {
                ...e,
                error
            };
        }
    };
    return a({
        ...n,
        headers: n.headers || {},
        sendContext: n.sendContext || {},
        context: n.context || qr(),
        _callSiteFetch: n.fetch
    });
}
function Xr(e, t = 100) {
    let n = new Set;
    let r = [];
    let i = (e, a)=>{
        if (a > t) {
            throw Error(`Middleware nesting depth exceeded maximum of ${t}. Check for circular references.`);
        }
        e.forEach((e)=>{
            if (e.options.middleware) {
                i(e.options.middleware, a + 1);
            }
            if (!n.has(e)) {
                n.add(e);
                r.push(e);
            }
        });
    };
    i(e, 0);
    return r;
}
async function Zr(e, data) {
    if (e == null) {
        return {};
    }
    if (`~standard` in e) {
        let n = await e[`~standard`].validate(data);
        if (n.issues) {
            throw Error(JSON.stringify(n.issues, undefined, 2));
        }
        return n.value;
    }
    if (`parse` in e) {
        return e.parse(data);
    }
    if (typeof e == `function`) {
        return e(data);
    }
    throw Error(`Invalid validator type!`);
}
function Qr(e) {
    return {
        "~types": undefined,
        options: {
            inputValidator: e.validator ?? e.inputValidator,
            client: async ({ next, sendContext, fetch, ...rest })=>{
                let a = {
                    ...rest,
                    context: sendContext,
                    fetch
                };
                return next(await e.extractedFn?.(a));
            },
            server: async ({ next, ...rest })=>{
                let result = await e.serverFn?.(rest);
                return next({
                    ...rest,
                    result
                });
            }
        }
    };
}
export { Ur as n, ar as r, $ as t };
