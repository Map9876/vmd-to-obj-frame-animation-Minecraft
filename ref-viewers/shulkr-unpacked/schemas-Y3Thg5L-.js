import { a, i } from "./schemas-Y3Thg5L-/chunk_i.js";
import { p } from "./schemas-Y3Thg5L-/chunk_f.js";
import { w } from "./schemas-Y3Thg5L-/chunk_C.js";
import { G } from "./schemas-Y3Thg5L-/chunk_G.js";
let e;
function t(e, t, n) {
    function r(n, def) {
        if (!n._zod) {
            Object.defineProperty(n, "_zod", {
                value: {
                    def,
                    constr,
                    traits: new Set
                },
                enumerable: false
            });
        }
        if (n._zod.traits.has(e)) {
            return;
        }
        n._zod.traits.add(e);
        t(n, def);
        let o_prototype = constr.prototype;
        let a = Object.keys(o_prototype);
        for (const t of a){
            if (!(t in n)) {
                n[t] = o_prototype[t].bind(n);
            }
        }
    }
    let i = n?.Parent ?? Object;
    class a extends i {
    }
    Object.defineProperty(a, "name", {
        value: e
    });
    function constr(e) {
        let t;
        let i = n?.Parent ? new a : this;
        r(i, e);
        (t = i._zod).deferred ?? (t.deferred = []);
        for (let e of i._zod.deferred){
            e();
        }
        return i;
    }
    Object.defineProperty(constr, "init", {
        value: r
    });
    Object.defineProperty(constr, Symbol.hasInstance, {
        value: (t)=>{
            if (n?.Parent && t instanceof n.Parent) {
                return true;
            }
            return t?._zod?.traits?.has(e);
        }
    });
    Object.defineProperty(constr, "name", {
        value: e
    });
    return constr;
}
class n extends Error {
    constructor(){
        super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
    }
}
class r extends Error {
    constructor(e){
        super(`Encountered unidirectional transform during encode: ${e}`);
        this.name = `ZodEncodeError`;
    }
}
(e = globalThis).__zod_globalConfig ?? (e.__zod_globalConfig = {});
function o(e) {
    let t = Object.values(e).filter((e)=>typeof e == `number`);
    return Object.entries(e).filter(([e, n])=>t.indexOf(+e) === -1).map(([e, t])=>t);
}
function s(e, t) {
    if (typeof t == `bigint`) {
        return t.toString();
    }
    return t;
}
function c(e) {
    return {
        get value () {
            {
                let t = e();
                Object.defineProperty(this, "value", {
                    value: t
                });
                return t;
            }
            throw Error(`cached value already set`);
        }
    };
}
function l(e) {
    return e == null;
}
function u(e) {
    let t = +!!e.startsWith(`^`);
    let n = e.endsWith(`$`) ? e.length - 1 : e.length;
    return e.slice(t, n);
}
function d(e, t) {
    let n = e / t;
    let r = Math.round(n);
    let i = 2 ** -52 * Math.max(Math.abs(n), 1);
    if (Math.abs(n - r) < i) {
        return 0;
    }
    return n - r;
}
function m(e, t, n) {
    Object.defineProperty(e, t, {
        value: n,
        writable: true,
        enumerable: true,
        configurable: true
    });
}
function h(...e) {
    let t = {};
    for (let n of e){
        Object.assign(t, Object.getOwnPropertyDescriptors(n));
    }
    return Object.defineProperties({}, t);
}
function ee(e) {
    return JSON.stringify(e);
}
function te(e) {
    return e.toLowerCase().trim().replace(/[^\w\s-]/g, ``).replace(/[\s_-]+/g, `-`).replace(/^-+|-+$/g, ``);
}
const ne = `captureStackTrace` in Error ? Error.captureStackTrace : (...e)=>{};
function g(e) {
    return typeof e == `object` && !!e && !Array.isArray(e);
}
const re = c(()=>{
    if (i.jitless || typeof navigator < `u` && navigator?.userAgent?.includes(`Cloudflare`)) {
        return false;
    }
    try {
        Function(``);
        return true;
    } catch  {
        return false;
    }
});
function _(e) {
    if (g(e) === false) {
        return false;
    }
    let e_constructor = e.constructor;
    if (e_constructor === undefined || typeof e_constructor != `function`) {
        return true;
    }
    let t_prototype = e_constructor.prototype;
    return !(g(t_prototype) === false || Object.prototype.hasOwnProperty.call(t_prototype, `isPrototypeOf`) === false);
}
function ie(e) {
    if (_(e)) {
        return {
            ...e
        };
    }
    if (Array.isArray(e)) {
        return [
            ...e
        ];
    }
    if (e instanceof Map) {
        return new Map(e);
    }
    if (e instanceof Set) {
        return new Set(e);
    }
    return e;
}
const ae = new Set([
    `string`,
    `number`,
    `symbol`
]);
function v(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
function y(e, t, n) {
    let r = new e._zod.constr(t ?? e._zod.def);
    if (!t || n?.parent) {
        r._zod.parent = e;
    }
    return r;
}
function b(e) {
    let t = e;
    if (!t) {
        return {};
    }
    if (typeof t == `string`) {
        return {
            error: ()=>t
        };
    }
    if (t?.message !== undefined) {
        if (t?.error !== undefined) {
            throw Error("Cannot specify both `message` and `error` params");
        }
        t.error = t.message;
    }
    delete t.message;
    if (typeof t.error == `string`) {
        return {
            ...t,
            error: ()=>t.error
        };
    }
    return t;
}
function oe(shape) {
    return Object.keys(shape).filter((t)=>shape[t]._zod.optin === `optional` && shape[t]._zod.optout === `optional`);
}
const se = {
    safeint: [
        -(2 ** 53 - 1),
        2 ** 53 - 1
    ],
    int32: [
        -2147483648,
        2147483647
    ],
    uint32: [
        0,
        4294967295
    ],
    float32: [
        -3.4028234663852886e+38,
        3.4028234663852886e+38
    ],
    float64: [
        -Number.MAX_VALUE,
        Number.MAX_VALUE
    ]
};
function ce(e, t) {
    let def = e._zod.def;
    let n_checks = def.checks;
    if (n_checks && n_checks.length > 0) {
        throw Error(`.pick() cannot be used on object schemas containing refinements`);
    }
    return y(e, h(e._zod.def, {
        get shape () {
            let e = {};
            for(let r in t){
                if (!(r in def.shape)) {
                    throw Error(`Unrecognized key: "${r}"`);
                }
                if (t[r]) {
                    e[r] = def.shape[r];
                }
            }
            m(this, `shape`, e);
            return e;
        },
        checks: []
    }));
}
function le(e, t) {
    let def = e._zod.def;
    let n_checks = def.checks;
    if (n_checks && n_checks.length > 0) {
        throw Error(`.omit() cannot be used on object schemas containing refinements`);
    }
    return y(e, h(e._zod.def, {
        get shape () {
            let r = {
                ...e._zod.def.shape
            };
            for(let e in t){
                if (!(e in def.shape)) {
                    throw Error(`Unrecognized key: "${e}"`);
                }
                if (t[e]) {
                    delete r[e];
                }
            }
            m(this, `shape`, r);
            return r;
        },
        checks: []
    }));
}
function ue(e, t) {
    if (!_(t)) {
        throw Error(`Invalid input to extend: expected a plain object`);
    }
    let checks = e._zod.def.checks;
    if (checks && checks.length > 0) {
        let n = e._zod.def.shape;
        for(let e in t){
            if (Object.getOwnPropertyDescriptor(n, e) !== undefined) {
                throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
            }
        }
    }
    return y(e, h(e._zod.def, {
        get shape () {
            let n = {
                ...e._zod.def.shape,
                ...t
            };
            m(this, `shape`, n);
            return n;
        }
    }));
}
function de(e, t) {
    if (!_(t)) {
        throw Error(`Invalid input to safeExtend: expected a plain object`);
    }
    return y(e, h(e._zod.def, {
        get shape () {
            let n = {
                ...e._zod.def.shape,
                ...t
            };
            m(this, `shape`, n);
            return n;
        }
    }));
}
function fe(e, t) {
    if (e._zod.def.checks?.length) {
        throw Error(`.merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.`);
    }
    return y(e, h(e._zod.def, {
        get shape () {
            let n = {
                ...e._zod.def.shape,
                ...t._zod.def.shape
            };
            m(this, `shape`, n);
            return n;
        },
        get catchall () {
            return t._zod.def.catchall;
        },
        checks: t._zod.def.checks ?? []
    }));
}
function pe(e, t, n) {
    let checks = t._zod.def.checks;
    if (checks && checks.length > 0) {
        throw Error(`.partial() cannot be used on object schemas containing refinements`);
    }
    return y(t, h(t._zod.def, {
        get shape () {
            let shape = t._zod.def.shape;
            let i = {
                ...shape
            };
            if (n) {
                for(let t in n){
                    if (!(t in shape)) {
                        throw Error(`Unrecognized key: "${t}"`);
                    }
                    if (n[t]) {
                        i[t] = e ? new e({
                            type: `optional`,
                            innerType: shape[t]
                        }) : shape[t];
                    }
                }
            } else {
                for(let t in shape){
                    i[t] = e ? new e({
                        type: `optional`,
                        innerType: shape[t]
                    }) : shape[t];
                }
            }
            m(this, `shape`, i);
            return i;
        },
        checks: []
    }));
}
function me(e, t, n) {
    return y(t, h(t._zod.def, {
        get shape () {
            let shape = t._zod.def.shape;
            let i = {
                ...shape
            };
            if (n) {
                for(let t in n){
                    if (!(t in i)) {
                        throw Error(`Unrecognized key: "${t}"`);
                    }
                    if (n[t]) {
                        i[t] = new e({
                            type: `nonoptional`,
                            innerType: shape[t]
                        });
                    }
                }
            } else {
                for(let t in shape){
                    i[t] = new e({
                        type: `nonoptional`,
                        innerType: shape[t]
                    });
                }
            }
            m(this, `shape`, i);
            return i;
        }
    }));
}
function x(e, t = 0) {
    if (e.aborted === true) {
        return true;
    }
    for(let n = t; n < e.issues.length; n++){
        if (e.issues[n]?.continue !== true) {
            return true;
        }
    }
    return false;
}
function he(e, t = 0) {
    if (e.aborted === true) {
        return true;
    }
    for(let n = t; n < e.issues.length; n++){
        if (e.issues[n]?.continue === false) {
            return true;
        }
    }
    return false;
}
function S(e, issues) {
    return issues.map((t)=>{
        var n;
        (n = t).path ?? (n.path = []);
        t.path.unshift(e);
        return t;
    });
}
function T(e) {
    if (Array.isArray(e)) {
        return `array`;
    }
    if (typeof e == `string`) {
        return `string`;
    }
    return `unknown`;
}
function E(...e) {
    let [t, n, r] = e;
    if (typeof t == `string`) {
        return {
            message: t,
            code: `custom`,
            input: n,
            inst: r
        };
    }
    return {
        ...t
    };
}
const ge = (e, t)=>{
    e.name = `$ZodError`;
    Object.defineProperty(e, "_zod", {
        value: e._zod,
        enumerable: false
    });
    Object.defineProperty(e, "issues", {
        value: t,
        enumerable: false
    });
    e.message = JSON.stringify(t, s, 2);
    Object.defineProperty(e, "toString", {
        value: ()=>e.message,
        enumerable: false
    });
};
const _e = t(`$ZodError`, ge);
const ve = t(`$ZodError`, ge, {
    Parent: Error
});
function ye(e, t = (e)=>e.message) {
    let fieldErrors = {};
    let formErrors = [];
    for (let i of e.issues){
        if (i.path.length > 0) {
            fieldErrors[i.path[0]] = fieldErrors[i.path[0]] || [];
            fieldErrors[i.path[0]].push(t(i));
        } else {
            formErrors.push(t(i));
        }
    }
    return {
        formErrors,
        fieldErrors
    };
}
function be(e, t = (e)=>e.message) {
    let n = {
        _errors: []
    };
    let r = (e, i = [])=>{
        for (let a of e.issues){
            if (a.code === `invalid_union` && a.errors.length) {
                a.errors.map((issues)=>r({
                        issues
                    }, [
                        ...i,
                        ...a.path
                    ]));
            } else if (a.code === `invalid_key`) {
                r({
                    issues: a.issues
                }, [
                    ...i,
                    ...a.path
                ]);
            } else if (a.code === `invalid_element`) {
                r({
                    issues: a.issues
                }, [
                    ...i,
                    ...a.path
                ]);
            } else {
                let e = [
                    ...i,
                    ...a.path
                ];
                if (e.length === 0) {
                    n._errors.push(t(a));
                } else {
                    let r = n;
                    let i = 0;
                    while(i < e.length){
                        let n = e[i];
                        if (i === e.length - 1) {
                            r[n] = r[n] || {
                                _errors: []
                            };
                            r[n]._errors.push(t(a));
                        } else {
                            r[n] = r[n] || {
                                _errors: []
                            };
                        }
                        r = r[n];
                        i++;
                    }
                }
            }
        }
    };
    r(e);
    return n;
}
const D = (e)=>(t, r, i, o)=>{
        let s = i ? {
            ...i,
            async: false
        } : {
            async: false
        };
        let c = t._zod.run({
            value: r,
            issues: []
        }, s);
        if (c instanceof Promise) {
            throw new n;
        }
        if (c.issues.length) {
            let t = new (o?.Err ?? e)(c.issues.map((e)=>w(e, s, a())));
            ne(t, o?.callee);
            throw t;
        }
        return c.value;
    };
const xe = (e)=>async (t, n, r, i)=>{
        let o = r ? {
            ...r,
            async: true
        } : {
            async: true
        };
        let s = t._zod.run({
            value: n,
            issues: []
        }, o);
        if (s instanceof Promise) {
            s = await s;
        }
        if (s.issues.length) {
            let t = new (i?.Err ?? e)(s.issues.map((e)=>w(e, o, a())));
            ne(t, i?.callee);
            throw t;
        }
        return s.value;
    };
const O = (e)=>(t, r, i)=>{
        let o = i ? {
            ...i,
            async: false
        } : {
            async: false
        };
        let s = t._zod.run({
            value: r,
            issues: []
        }, o);
        if (s instanceof Promise) {
            throw new n;
        }
        if (s.issues.length) {
            return {
                success: false,
                error: new (e ?? _e)(s.issues.map((e)=>w(e, o, a())))
            };
        }
        return {
            success: true,
            data: s.value
        };
    };
const Se = O(ve);
const k = (e)=>async (t, n, r)=>{
        let i = r ? {
            ...r,
            async: true
        } : {
            async: true
        };
        let o = t._zod.run({
            value: n,
            issues: []
        }, i);
        if (o instanceof Promise) {
            o = await o;
        }
        if (o.issues.length) {
            return {
                success: false,
                error: new e(o.issues.map((e)=>w(e, i, a())))
            };
        }
        return {
            success: true,
            data: o.value
        };
    };
const Ce = k(ve);
const we = (e)=>(t, n, r)=>{
        let i = r ? {
            ...r,
            direction: `backward`
        } : {
            direction: `backward`
        };
        return D(e)(t, n, i);
    };
const Te = (e)=>(t, n, r)=>D(e)(t, n, r);
const Ee = (e)=>async (t, n, r)=>{
        let i = r ? {
            ...r,
            direction: `backward`
        } : {
            direction: `backward`
        };
        return xe(e)(t, n, i);
    };
const De = (e)=>async (t, n, r)=>xe(e)(t, n, r);
const Oe = (e)=>(t, n, r)=>{
        let i = r ? {
            ...r,
            direction: `backward`
        } : {
            direction: `backward`
        };
        return O(e)(t, n, i);
    };
const ke = (e)=>(t, n, r)=>O(e)(t, n, r);
const Ae = (e)=>async (t, n, r)=>{
        let i = r ? {
            ...r,
            direction: `backward`
        } : {
            direction: `backward`
        };
        return k(e)(t, n, i);
    };
const je = (e)=>async (t, n, r)=>k(e)(t, n, r);
const Me = /^[cC][0-9a-z]{6,}$/;
const Ne = /^[0-9a-z]+$/;
const Pe = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
const Fe = /^[0-9a-vA-V]{20}$/;
const Ie = /^[A-Za-z0-9]{27}$/;
const Le = /^[a-zA-Z0-9_-]{21}$/;
const Re = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
const ze = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
const Be = (e)=>{
    if (e) {
        return RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
    }
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
};
const Ve = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
const He = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function Ue() {
    return new RegExp(He, `u`);
}
const We = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const Ge = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
const Ke = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
const qe = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const Je = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
const Ye = /^[A-Za-z0-9_-]*$/;
const Xe = /^https?$/;
const Ze = /^\+[1-9]\d{6,14}$/;
const Qe = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
const $e = RegExp(`^${Qe}$`);
function et(e) {
    let t = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
    if (typeof e.precision == `number`) {
        if (e.precision === -1) {
            return `${t}`;
        }
        if (e.precision === 0) {
            return `${t}:[0-5]\\d`;
        }
        return `${t}:[0-5]\\d\\.\\d{${e.precision}}`;
    }
    return `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function tt(e) {
    return RegExp(`^${et(e)}$`);
}
function nt(e) {
    let t = et({
        precision: e.precision
    });
    let n = [
        `Z`
    ];
    if (e.local) {
        n.push(``);
    }
    if (e.offset) {
        n.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
    }
    let r = `${t}(?:${n.join(`|`)})`;
    return RegExp(`^${Qe}T(?:${r})$`);
}
const rt = (bag)=>{
    let t = bag ? `[\\s\\S]{${bag?.minimum ?? 0},${bag?.maximum ?? ``}}` : `[\\s\\S]*`;
    return RegExp(`^${t}$`);
};
const it = /^-?\d+n?$/;
const at = /^-?\d+$/;
const ot = /^-?\d+(?:\.\d+)?$/;
const st = /^(?:true|false)$/i;
const ct = /^[^A-Z]*$/;
const lt = /^[^a-z]*$/;
const A = t(`$ZodCheck`, (e, t)=>{
    var n;
    e._zod ??= {};
    e._zod.def = t;
    (n = e._zod).onattach ?? (n.onattach = []);
});
const ut = {
    number: `number`,
    bigint: `bigint`,
    object: `date`
};
const dt = t(`$ZodCheckLessThan`, (e, t)=>{
    A.init(e, t);
    let n = ut[typeof t.value];
    e._zod.onattach.push((e)=>{
        let bag = e._zod.bag;
        let r = (t.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Infinity;
        if (t.value < r) {
            if (t.inclusive) {
                bag.maximum = t.value;
            } else {
                bag.exclusiveMaximum = t.value;
            }
        }
    });
    e._zod.check = (r)=>{
        if (!(t.inclusive ? r.value <= t.value : r.value < t.value)) {
            r.issues.push({
                origin: n,
                code: `too_big`,
                maximum: typeof t.value == `object` ? t.value.getTime() : t.value,
                input: r.value,
                inclusive: t.inclusive,
                inst: e,
                continue: !t.abort
            });
        }
    };
});
const ft = t(`$ZodCheckGreaterThan`, (e, t)=>{
    A.init(e, t);
    let n = ut[typeof t.value];
    e._zod.onattach.push((e)=>{
        let bag = e._zod.bag;
        let r = (t.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? -Infinity;
        if (t.value > r) {
            if (t.inclusive) {
                bag.minimum = t.value;
            } else {
                bag.exclusiveMinimum = t.value;
            }
        }
    });
    e._zod.check = (r)=>{
        if (!(t.inclusive ? r.value >= t.value : r.value > t.value)) {
            r.issues.push({
                origin: n,
                code: `too_small`,
                minimum: typeof t.value == `object` ? t.value.getTime() : t.value,
                input: r.value,
                inclusive: t.inclusive,
                inst: e,
                continue: !t.abort
            });
        }
    };
});
const pt = t(`$ZodCheckMultipleOf`, (e, t)=>{
    A.init(e, t);
    e._zod.onattach.push((e)=>{
        var n;
        (n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
    });
    e._zod.check = (n)=>{
        if (typeof n.value != typeof t.value) {
            throw Error(`Cannot mix number and bigint in multiple_of check.`);
        }
        if (!(typeof n.value == `bigint` ? n.value % t.value === BigInt(0) : d(n.value, t.value) === 0)) {
            n.issues.push({
                origin: typeof n.value,
                code: `not_multiple_of`,
                divisor: t.value,
                input: n.value,
                inst: e,
                continue: !t.abort
            });
        }
    };
});
const mt = t(`$ZodCheckNumberFormat`, (e, t)=>{
    A.init(e, t);
    t.format = t.format || `float64`;
    let n = t.format?.includes(`int`);
    let r = n ? `int` : `number`;
    let [i, a] = se[t.format];
    e._zod.onattach.push((e)=>{
        let bag = e._zod.bag;
        bag.format = t.format;
        bag.minimum = i;
        bag.maximum = a;
        if (n) {
            bag.pattern = at;
        }
    });
    e._zod.check = (o)=>{
        let o_value = o.value;
        if (n) {
            if (!Number.isInteger(o_value)) {
                o.issues.push({
                    expected: r,
                    format: t.format,
                    code: `invalid_type`,
                    continue: false,
                    input: o_value,
                    inst: e
                });
                return;
            }
            if (!Number.isSafeInteger(o_value)) {
                if (o_value > 0) {
                    o.issues.push({
                        input: o_value,
                        code: `too_big`,
                        maximum: 2 ** 53 - 1,
                        note: `Integers must be within the safe integer range.`,
                        inst: e,
                        origin: r,
                        inclusive: true,
                        continue: !t.abort
                    });
                } else {
                    o.issues.push({
                        input: o_value,
                        code: `too_small`,
                        minimum: -(2 ** 53 - 1),
                        note: `Integers must be within the safe integer range.`,
                        inst: e,
                        origin: r,
                        inclusive: true,
                        continue: !t.abort
                    });
                }
                return;
            }
        }
        if (o_value < i) {
            o.issues.push({
                origin: `number`,
                input: o_value,
                code: `too_small`,
                minimum: i,
                inclusive: true,
                inst: e,
                continue: !t.abort
            });
        }
        if (o_value > a) {
            o.issues.push({
                origin: `number`,
                input: o_value,
                code: `too_big`,
                maximum: a,
                inclusive: true,
                inst: e,
                continue: !t.abort
            });
        }
    };
});
const ht = t(`$ZodCheckMaxLength`, (e, t)=>{
    var n;
    A.init(e, t);
    (n = e._zod.def).when ?? (n.when = (e)=>{
        let e_value = e.value;
        return !l(e_value) && e_value.length !== undefined;
    });
    e._zod.onattach.push((e)=>{
        let n = e._zod.bag.maximum ?? Infinity;
        if (t.maximum < n) {
            e._zod.bag.maximum = t.maximum;
        }
    });
    e._zod.check = (n)=>{
        let n_value = n.value;
        if (n_value.length <= t.maximum) {
            return;
        }
        let i = T(n_value);
        n.issues.push({
            origin: i,
            code: `too_big`,
            maximum: t.maximum,
            inclusive: true,
            input: n_value,
            inst: e,
            continue: !t.abort
        });
    };
});
const gt = t(`$ZodCheckMinLength`, (e, t)=>{
    var n;
    A.init(e, t);
    (n = e._zod.def).when ?? (n.when = (e)=>{
        let e_value = e.value;
        return !l(e_value) && e_value.length !== undefined;
    });
    e._zod.onattach.push((e)=>{
        let n = e._zod.bag.minimum ?? -Infinity;
        if (t.minimum > n) {
            e._zod.bag.minimum = t.minimum;
        }
    });
    e._zod.check = (n)=>{
        let n_value = n.value;
        if (n_value.length >= t.minimum) {
            return;
        }
        let i = T(n_value);
        n.issues.push({
            origin: i,
            code: `too_small`,
            minimum: t.minimum,
            inclusive: true,
            input: n_value,
            inst: e,
            continue: !t.abort
        });
    };
});
const _t = t(`$ZodCheckLengthEquals`, (e, t)=>{
    var n;
    A.init(e, t);
    (n = e._zod.def).when ?? (n.when = (e)=>{
        let e_value = e.value;
        return !l(e_value) && e_value.length !== undefined;
    });
    e._zod.onattach.push((e)=>{
        let bag = e._zod.bag;
        bag.minimum = t.length;
        bag.maximum = t.length;
        bag.length = t.length;
    });
    e._zod.check = (n)=>{
        let n_value = n.value;
        let r_length = n_value.length;
        if (r_length === t.length) {
            return;
        }
        let a = T(n_value);
        let o = r_length > t.length;
        n.issues.push({
            origin: a,
            ...o ? {
                code: `too_big`,
                maximum: t.length
            } : {
                code: `too_small`,
                minimum: t.length
            },
            inclusive: true,
            exact: true,
            input: n.value,
            inst: e,
            continue: !t.abort
        });
    };
});
const j = t(`$ZodCheckStringFormat`, (e, t)=>{
    var n;
    var r;
    A.init(e, t);
    e._zod.onattach.push((e)=>{
        let bag = e._zod.bag;
        bag.format = t.format;
        if (t.pattern) {
            bag.patterns ??= new Set;
            bag.patterns.add(t.pattern);
        }
    });
    t.pattern ? (n = e._zod).check ?? (n.check = (n)=>{
        t.pattern.lastIndex = 0;
        if (!t.pattern.test(n.value)) {
            n.issues.push({
                origin: `string`,
                code: `invalid_format`,
                format: t.format,
                input: n.value,
                ...t.pattern ? {
                    pattern: t.pattern.toString()
                } : {},
                inst: e,
                continue: !t.abort
            });
        }
    }) : (r = e._zod).check ?? (r.check = ()=>{});
});
const vt = t(`$ZodCheckRegex`, (e, t)=>{
    j.init(e, t);
    e._zod.check = (n)=>{
        t.pattern.lastIndex = 0;
        if (!t.pattern.test(n.value)) {
            n.issues.push({
                origin: `string`,
                code: `invalid_format`,
                format: `regex`,
                input: n.value,
                pattern: t.pattern.toString(),
                inst: e,
                continue: !t.abort
            });
        }
    };
});
const yt = t(`$ZodCheckLowerCase`, (e, t)=>{
    t.pattern ??= ct;
    j.init(e, t);
});
const bt = t(`$ZodCheckUpperCase`, (e, t)=>{
    t.pattern ??= lt;
    j.init(e, t);
});
const xt = t(`$ZodCheckIncludes`, (e, t)=>{
    A.init(e, t);
    let n = v(t.includes);
    let r = new RegExp(typeof t.position == `number` ? `^.{${t.position}}${n}` : n);
    t.pattern = r;
    e._zod.onattach.push((e)=>{
        let bag = e._zod.bag;
        bag.patterns ??= new Set;
        bag.patterns.add(r);
    });
    e._zod.check = (n)=>{
        if (!n.value.includes(t.includes, t.position)) {
            n.issues.push({
                origin: `string`,
                code: `invalid_format`,
                format: `includes`,
                includes: t.includes,
                input: n.value,
                inst: e,
                continue: !t.abort
            });
        }
    };
});
const St = t(`$ZodCheckStartsWith`, (e, t)=>{
    A.init(e, t);
    let n = RegExp(`^${v(t.prefix)}.*`);
    t.pattern ??= n;
    e._zod.onattach.push((e)=>{
        let bag = e._zod.bag;
        bag.patterns ??= new Set;
        bag.patterns.add(n);
    });
    e._zod.check = (n)=>{
        if (!n.value.startsWith(t.prefix)) {
            n.issues.push({
                origin: `string`,
                code: `invalid_format`,
                format: `starts_with`,
                prefix: t.prefix,
                input: n.value,
                inst: e,
                continue: !t.abort
            });
        }
    };
});
const Ct = t(`$ZodCheckEndsWith`, (e, t)=>{
    A.init(e, t);
    let n = RegExp(`.*${v(t.suffix)}$`);
    t.pattern ??= n;
    e._zod.onattach.push((e)=>{
        let bag = e._zod.bag;
        bag.patterns ??= new Set;
        bag.patterns.add(n);
    });
    e._zod.check = (n)=>{
        if (!n.value.endsWith(t.suffix)) {
            n.issues.push({
                origin: `string`,
                code: `invalid_format`,
                format: `ends_with`,
                suffix: t.suffix,
                input: n.value,
                inst: e,
                continue: !t.abort
            });
        }
    };
});
const wt = t(`$ZodCheckOverwrite`, (e, t)=>{
    A.init(e, t);
    e._zod.check = (e)=>{
        e.value = t.tx(e.value);
    };
});
class Tt {
    constructor(e = []){
        this.content = [];
        this.indent = 0;
        if (this) {
            this.args = e;
        }
    }
    indented(e) {
        this.indent += 1;
        e(this);
        --this.indent;
    }
    write(e) {
        if (typeof e == `function`) {
            e(this, {
                execution: `sync`
            });
            e(this, {
                execution: `async`
            });
            return;
        }
        let t = e.split(`
`).filter((e)=>e);
        let n = Math.min(...t.map((e)=>e.length - e.trimStart().length));
        let r = t.map((e)=>e.slice(n)).map((e)=>` `.repeat(this.indent * 2) + e);
        for (let e of r){
            this.content.push(e);
        }
    }
    compile() {
        let e = Function;
        let t = this?.args;
        let n = [
            ...(this?.content ?? [
                ``
            ]).map((e)=>`  ${e}`)
        ];
        return new e(...t, n.join(`
`));
    }
}
const Et = {
    major: 4,
    minor: 4,
    patch: 3
};
const M = t(`$ZodType`, (e, t)=>{
    var r;
    e ??= {};
    e._zod.def = t;
    e._zod.bag = e._zod.bag || {};
    e._zod.version = Et;
    let i = [
        ...e._zod.def.checks ?? []
    ];
    if (e._zod.traits.has(`$ZodCheck`)) {
        i.unshift(e);
    }
    for (let t of i){
        for (let n of t._zod.onattach){
            n(e);
        }
    }
    if (i.length === 0) {
        (r = e._zod).deferred ?? (r.deferred = []);
        e._zod.deferred?.push(()=>{
            e._zod.run = e._zod.parse;
        });
    } else {
        let t = (e, t, r)=>{
            let i = x(e);
            let a;
            for (let o of t){
                if (o._zod.def.when) {
                    if (he(e) || !o._zod.def.when(e)) {
                        continue;
                    }
                } else if (i) {
                    continue;
                }
                let t = e.issues.length;
                let s = o._zod.check(e);
                if (s instanceof Promise && r?.async === false) {
                    throw new n;
                }
                if (a || s instanceof Promise) {
                    a = (a ?? Promise.resolve()).then(async ()=>{
                        await s;
                        if (e.issues.length !== t) {
                            i ||= x(e, t);
                        }
                    });
                } else {
                    if (e.issues.length === t) {
                        continue;
                    }
                    i ||= x(e, t);
                }
            }
            if (a) {
                return a.then(()=>e);
            }
            return e;
        };
        let r = (r, a, o)=>{
            if (x(r)) {
                r.aborted = true;
                return r;
            }
            let s = t(a, i, o);
            if (s instanceof Promise) {
                if (o.async === false) {
                    throw new n;
                }
                return s.then((t)=>e._zod.parse(t, o));
            }
            return e._zod.parse(s, o);
        };
        e._zod.run = (a, o)=>{
            if (o.skipChecks) {
                return e._zod.parse(a, o);
            }
            if (o.direction === `backward`) {
                let t = e._zod.parse({
                    value: a.value,
                    issues: []
                }, {
                    ...o,
                    skipChecks: true
                });
                if (t instanceof Promise) {
                    return t.then((e)=>r(e, a, o));
                }
                return r(t, a, o);
            }
            let s = e._zod.parse(a, o);
            if (s instanceof Promise) {
                if (o.async === false) {
                    throw new n;
                }
                return s.then((e)=>t(e, i, o));
            }
            return t(s, i, o);
        };
    }
    p(e, `~standard`, ()=>({
            validate: (t)=>{
                try {
                    let n = Se(e, t);
                    if (n.success) {
                        return {
                            value: n.data
                        };
                    }
                    return {
                        issues: n.error?.issues
                    };
                } catch  {
                    return Ce(e, t).then((e)=>{
                        if (e.success) {
                            return {
                                value: e.data
                            };
                        }
                        return {
                            issues: e.error?.issues
                        };
                    });
                }
            },
            vendor: `zod`,
            version: 1
        }));
});
const N = t(`$ZodString`, (e, t)=>{
    M.init(e, t);
    e._zod.pattern = [
        ...e?._zod.bag?.patterns ?? []
    ].pop() ?? rt(e._zod.bag);
    e._zod.parse = (n, r)=>{
        if (t.coerce) {
            try {
                n.value = String(n.value);
            } catch  {}
        }
        if (typeof n.value != `string`) {
            n.issues.push({
                expected: `string`,
                code: `invalid_type`,
                input: n.value,
                inst: e
            });
        }
        return n;
    };
});
const P = t(`$ZodStringFormat`, (e, t)=>{
    j.init(e, t);
    N.init(e, t);
});
const Dt = t(`$ZodGUID`, (e, t)=>{
    t.pattern ??= ze;
    P.init(e, t);
});
const Ot = t(`$ZodUUID`, (e, t)=>{
    if (t.version) {
        let e = {
            v1: 1,
            v2: 2,
            v3: 3,
            v4: 4,
            v5: 5,
            v6: 6,
            v7: 7,
            v8: 8
        }[t.version];
        if (e === undefined) {
            throw Error(`Invalid UUID version: "${t.version}"`);
        }
        t.pattern ??= Be(e);
    } else {
        t.pattern ??= Be();
    }
    P.init(e, t);
});
const kt = t(`$ZodEmail`, (e, t)=>{
    t.pattern ??= Ve;
    P.init(e, t);
});
const At = t(`$ZodURL`, (e, t)=>{
    P.init(e, t);
    e._zod.check = (n)=>{
        try {
            let r = n.value.trim();
            if (!t.normalize && t.protocol?.source === Xe.source && !/^https?:\/\//i.test(r)) {
                n.issues.push({
                    code: `invalid_format`,
                    format: `url`,
                    note: `Invalid URL format`,
                    input: n.value,
                    inst: e,
                    continue: !t.abort
                });
                return;
            }
            let i = new URL(r);
            if (t.hostname) {
                t.hostname.lastIndex = 0;
                if (!t.hostname.test(i.hostname)) {
                    n.issues.push({
                        code: `invalid_format`,
                        format: `url`,
                        note: `Invalid hostname`,
                        pattern: t.hostname.source,
                        input: n.value,
                        inst: e,
                        continue: !t.abort
                    });
                }
            }
            if (t.protocol) {
                t.protocol.lastIndex = 0;
                if (!t.protocol.test(i.protocol.endsWith(`:`) ? i.protocol.slice(0, -1) : i.protocol)) {
                    n.issues.push({
                        code: `invalid_format`,
                        format: `url`,
                        note: `Invalid protocol`,
                        pattern: t.protocol.source,
                        input: n.value,
                        inst: e,
                        continue: !t.abort
                    });
                }
            }
            if (t.normalize) {
                n.value = i.href;
            } else {
                n.value = r;
            }
            return;
        } catch  {
            n.issues.push({
                code: `invalid_format`,
                format: `url`,
                input: n.value,
                inst: e,
                continue: !t.abort
            });
        }
    };
});
const jt = t(`$ZodEmoji`, (e, t)=>{
    t.pattern ??= Ue();
    P.init(e, t);
});
const Mt = t(`$ZodNanoID`, (e, t)=>{
    t.pattern ??= Le;
    P.init(e, t);
});
const Nt = t(`$ZodCUID`, (e, t)=>{
    t.pattern ??= Me;
    P.init(e, t);
});
const Pt = t(`$ZodCUID2`, (e, t)=>{
    t.pattern ??= Ne;
    P.init(e, t);
});
const Ft = t(`$ZodULID`, (e, t)=>{
    t.pattern ??= Pe;
    P.init(e, t);
});
const It = t(`$ZodXID`, (e, t)=>{
    t.pattern ??= Fe;
    P.init(e, t);
});
const Lt = t(`$ZodKSUID`, (e, t)=>{
    t.pattern ??= Ie;
    P.init(e, t);
});
const Rt = t(`$ZodISODateTime`, (e, t)=>{
    t.pattern ??= nt(t);
    P.init(e, t);
});
const zt = t(`$ZodISODate`, (e, t)=>{
    t.pattern ??= $e;
    P.init(e, t);
});
const Bt = t(`$ZodISOTime`, (e, t)=>{
    t.pattern ??= tt(t);
    P.init(e, t);
});
const Vt = t(`$ZodISODuration`, (e, t)=>{
    t.pattern ??= Re;
    P.init(e, t);
});
const Ht = t(`$ZodIPv4`, (e, t)=>{
    t.pattern ??= We;
    P.init(e, t);
    e._zod.bag.format = `ipv4`;
});
const Ut = t(`$ZodIPv6`, (e, t)=>{
    t.pattern ??= Ge;
    P.init(e, t);
    e._zod.bag.format = `ipv6`;
    e._zod.check = (n)=>{
        try {
            new URL(`http://[${n.value}]`);
        } catch  {
            n.issues.push({
                code: `invalid_format`,
                format: `ipv6`,
                input: n.value,
                inst: e,
                continue: !t.abort
            });
        }
    };
});
const Wt = t(`$ZodCIDRv4`, (e, t)=>{
    t.pattern ??= Ke;
    P.init(e, t);
});
const Gt = t(`$ZodCIDRv6`, (e, t)=>{
    t.pattern ??= qe;
    P.init(e, t);
    e._zod.check = (n)=>{
        let r = n.value.split(`/`);
        try {
            if (r.length !== 2) {
                throw Error();
            }
            let [e, t] = r;
            if (!t) {
                throw Error();
            }
            let n = Number(t);
            if (`${n}` !== t || n < 0 || n > 128) {
                throw Error();
            }
            new URL(`http://[${e}]`);
        } catch  {
            n.issues.push({
                code: `invalid_format`,
                format: `cidrv6`,
                input: n.value,
                inst: e,
                continue: !t.abort
            });
        }
    };
});
function Kt(e) {
    if (e === ``) {
        return true;
    }
    if (/\s/.test(e) || e.length % 4 != 0) {
        return false;
    }
    try {
        atob(e);
        return true;
    } catch  {
        return false;
    }
}
const qt = t(`$ZodBase64`, (e, t)=>{
    t.pattern ??= Je;
    P.init(e, t);
    e._zod.bag.contentEncoding = `base64`;
    e._zod.check = (n)=>{
        if (!Kt(n.value)) {
            n.issues.push({
                code: `invalid_format`,
                format: `base64`,
                input: n.value,
                inst: e,
                continue: !t.abort
            });
        }
    };
});
function Jt(e) {
    if (!Ye.test(e)) {
        return false;
    }
    let t = e.replace(/[-_]/g, (e)=>{
        if (e === `-`) {
            return `+`;
        }
        return `/`;
    });
    return Kt(t.padEnd(Math.ceil(t.length / 4) * 4, `=`));
}
const Yt = t(`$ZodBase64URL`, (e, t)=>{
    t.pattern ??= Ye;
    P.init(e, t);
    e._zod.bag.contentEncoding = `base64url`;
    e._zod.check = (n)=>{
        if (!Jt(n.value)) {
            n.issues.push({
                code: `invalid_format`,
                format: `base64url`,
                input: n.value,
                inst: e,
                continue: !t.abort
            });
        }
    };
});
const Xt = t(`$ZodE164`, (e, t)=>{
    t.pattern ??= Ze;
    P.init(e, t);
});
function Zt(e, t = null) {
    try {
        let n = e.split(`.`);
        if (n.length !== 3) {
            return false;
        }
        let [r] = n;
        if (!r) {
            return false;
        }
        let i = JSON.parse(atob(r));
        return !(`typ` in i && i?.typ !== `JWT` || !i.alg || t && (!(`alg` in i) || i.alg !== t));
    } catch  {
        return false;
    }
}
const Qt = t(`$ZodJWT`, (e, t)=>{
    P.init(e, t);
    e._zod.check = (n)=>{
        if (!Zt(n.value, t.alg)) {
            n.issues.push({
                code: `invalid_format`,
                format: `jwt`,
                input: n.value,
                inst: e,
                continue: !t.abort
            });
        }
    };
});
const $t = t(`$ZodNumber`, (e, t)=>{
    M.init(e, t);
    e._zod.pattern = e._zod.bag.pattern ?? ot;
    e._zod.parse = (n, r)=>{
        if (t.coerce) {
            try {
                n.value = Number(n.value);
            } catch  {}
        }
        let n_value = n.value;
        if (typeof n_value == `number` && !Number.isNaN(n_value) && Number.isFinite(n_value)) {
            return n;
        }
        let received = typeof n_value == `number` ? Number.isNaN(n_value) ? `NaN` : Number.isFinite(n_value) ? undefined : `Infinity` : undefined;
        n.issues.push({
            expected: `number`,
            code: `invalid_type`,
            input: n_value,
            inst: e,
            ...received ? {
                received
            } : {}
        });
        return n;
    };
});
const en = t(`$ZodNumberFormat`, (e, t)=>{
    mt.init(e, t);
    $t.init(e, t);
});
const tn = t(`$ZodBoolean`, (e, t)=>{
    M.init(e, t);
    e._zod.pattern = st;
    e._zod.parse = (n, r)=>{
        if (t.coerce) {
            try {
                n.value = !!n.value;
            } catch  {}
        }
        let n_value = n.value;
        if (typeof n_value != `boolean`) {
            n.issues.push({
                expected: `boolean`,
                code: `invalid_type`,
                input: n_value,
                inst: e
            });
        }
        return n;
    };
});
const nn = t(`$ZodBigInt`, (e, t)=>{
    M.init(e, t);
    e._zod.pattern = it;
    e._zod.parse = (n, r)=>{
        if (t.coerce) {
            try {
                n.value = BigInt(n.value);
            } catch  {}
        }
        if (typeof n.value != `bigint`) {
            n.issues.push({
                expected: `bigint`,
                code: `invalid_type`,
                input: n.value,
                inst: e
            });
        }
        return n;
    };
});
const rn = t(`$ZodUnknown`, (e, t)=>{
    M.init(e, t);
    e._zod.parse = (e)=>e;
});
const an = t(`$ZodNever`, (e, t)=>{
    M.init(e, t);
    e._zod.parse = (t, n)=>{
        t.issues.push({
            expected: `never`,
            code: `invalid_type`,
            input: t.value,
            inst: e
        });
        return t;
    };
});
function on(e, t, n) {
    if (e.issues.length) {
        t.issues.push(...S(n, e.issues));
    }
    t.value[n] = e.value;
}
const sn = t(`$ZodArray`, (e, t)=>{
    M.init(e, t);
    e._zod.parse = (n, r)=>{
        let n_value = n.value;
        if (!Array.isArray(n_value)) {
            n.issues.push({
                expected: `array`,
                code: `invalid_type`,
                input: n_value,
                inst: e
            });
            return n;
        }
        n.value = Array(n_value.length);
        let a = [];
        for(let e = 0; e < n_value.length; e++){
            let o = n_value[e];
            let s = t.element._zod.run({
                value: o,
                issues: []
            }, r);
            if (s instanceof Promise) {
                a.push(s.then((t)=>on(t, n, e)));
            } else {
                on(s, n, e);
            }
        }
        if (a.length) {
            return Promise.all(a).then(()=>n);
        }
        return n;
    };
});
function F(e, t, n, r, i, a) {
    let o = n in r;
    if (e.issues.length) {
        if (i && a && !o) {
            return;
        }
        t.issues.push(...S(n, e.issues));
    }
    if (!o && !i) {
        if (!e.issues.length) {
            t.issues.push({
                code: `invalid_type`,
                expected: `nonoptional`,
                input: undefined,
                path: [
                    n
                ]
            });
        }
        return;
    }
    if (e.value === undefined) {
        if (o) {
            t.value[n] = undefined;
        }
    } else {
        t.value[n] = e.value;
    }
}
function cn(e) {
    let t = Object.keys(e.shape);
    for (let n of t){
        if (!e.shape?.[n]?._zod?.traits?.has(`$ZodType`)) {
            throw Error(`Invalid element at key "${n}": expected a Zod schema`);
        }
    }
    let n = oe(e.shape);
    return {
        ...e,
        keys: t,
        keySet: new Set(t),
        numKeys: t.length,
        optionalKeys: new Set(n)
    };
}
function ln(e, t, n, r, i, a) {
    let o = [];
    let i_keySet = i.keySet;
    let _zod = i.catchall._zod;
    let type = _zod.def.type;
    let u = _zod.optin === `optional`;
    let d = _zod.optout === `optional`;
    for(let i in t){
        if (i === `__proto__` || i_keySet.has(i)) {
            continue;
        }
        if (type === `never`) {
            o.push(i);
            continue;
        }
        let a = _zod.run({
            value: t[i],
            issues: []
        }, r);
        if (a instanceof Promise) {
            e.push(a.then((e)=>F(e, n, i, t, u, d)));
        } else {
            F(a, n, i, t, u, d);
        }
    }
    if (o.length) {
        n.issues.push({
            code: `unrecognized_keys`,
            keys: o,
            input: t,
            inst: a
        });
    }
    if (e.length) {
        return Promise.all(e).then(()=>n);
    }
    return n;
}
const un = t(`$ZodObject`, (e, t)=>{
    M.init(e, t);
    if (!Object.getOwnPropertyDescriptor(t, `shape`)?.get) {
        let e = t.shape;
        Object.defineProperty(t, "shape", {
            get: ()=>{
                let n = {
                    ...e
                };
                Object.defineProperty(t, "shape", {
                    value: n
                });
                return n;
            }
        });
    }
    let n = c(()=>cn(t));
    p(e._zod, `propValues`, ()=>{
        let t_shape = t.shape;
        let n = {};
        for(let t in t_shape){
            let r = t_shape[t]._zod;
            if (r.values) {
                n[t] ?? (n[t] = new Set);
                for (let e of r.values){
                    n[t].add(e);
                }
            }
        }
        return n;
    });
    let r = g;
    let t_catchall = t.catchall;
    let a;
    e._zod.parse = (t, o)=>{
        a ??= n.value;
        let t_value = t.value;
        if (!r(t_value)) {
            t.issues.push({
                expected: `object`,
                code: `invalid_type`,
                input: t_value,
                inst: e
            });
            return t;
        }
        t.value = {};
        let c = [];
        let a_shape = a.shape;
        for (let e of a.keys){
            let n = a_shape[e];
            let r = n._zod.optin === `optional`;
            let i = n._zod.optout === `optional`;
            let a = n._zod.run({
                value: t_value[e],
                issues: []
            }, o);
            if (a instanceof Promise) {
                c.push(a.then((n)=>F(n, t, e, t_value, r, i)));
            } else {
                F(a, t, e, t_value, r, i);
            }
        }
        if (t_catchall) {
            return ln(c, t_value, t, o, n.value, e);
        }
        if (c.length) {
            return Promise.all(c).then(()=>t);
        }
        return t;
    };
});
const dn = t(`$ZodObjectJIT`, (e, t)=>{
    un.init(e, t);
    let parse = e._zod.parse;
    let r = c(()=>cn(t));
    let a = (shape)=>{
        let t = new Tt([
            `shape`,
            `payload`,
            `ctx`
        ]);
        let r_value = r.value;
        let i = (e)=>{
            let t = ee(e);
            return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
        };
        t.write(`const input = payload.value;`);
        let a = Object.create(null);
        let o = 0;
        for (let e of r_value.keys){
            a[e] = `key_${o++}`;
        }
        t.write(`const newResult = {};`);
        for (let r of r_value.keys){
            let n = a[r];
            let o = ee(r);
            let s = shape[r];
            let c = s?._zod?.optin === `optional`;
            let l = s?._zod?.optout === `optional`;
            t.write(`const ${n} = ${i(r)};`);
            if (c && l) {
                t.write(`
        if (${n}.issues.length) {
          if (${o} in input) {
            payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${o}, ...iss.path] : [${o}]
            })));
          }
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `);
            } else if (c) {
                t.write(`
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `);
            } else {
                t.write(`
        const ${n}_present = ${o} in input;
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${o}]
          });
        }

        if (${n}_present) {
          if (${n}.value === undefined) {
            newResult[${o}] = undefined;
          } else {
            newResult[${o}] = ${n}.value;
          }
        }

      `);
            }
        }
        t.write(`payload.value = newResult;`);
        t.write(`return payload;`);
        let s = t.compile();
        return (t, n)=>s(shape, t, n);
    };
    let o;
    let s = g;
    let l = !i.jitless;
    let u = l && re.value;
    let t_catchall = t.catchall;
    let f;
    e._zod.parse = (i, c)=>{
        f ??= r.value;
        let i_value = i.value;
        if (s(i_value)) {
            if (l && u && c?.async === false && c.jitless !== true) {
                o ||= a(t.shape);
                i = o(i, c);
                if (t_catchall) {
                    return ln([], i_value, i, c, f, e);
                }
                return i;
            }
            return parse(i, c);
        }
        i.issues.push({
            expected: `object`,
            code: `invalid_type`,
            input: i_value,
            inst: e
        });
        return i;
    };
});
function fn(e, t, n, r) {
    for (let n of e){
        if (n.issues.length === 0) {
            t.value = n.value;
            return t;
        }
    }
    let i = e.filter((e)=>!x(e));
    if (i.length === 1) {
        t.value = i[0].value;
        return i[0];
    }
    t.issues.push({
        code: `invalid_union`,
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>w(e, r, a())))
    });
    return t;
}
const pn = t(`$ZodUnion`, (e, t)=>{
    M.init(e, t);
    p(e._zod, `optin`, ()=>{
        if (t.options.some((e)=>e._zod.optin === `optional`)) {
            return `optional`;
        }
    });
    p(e._zod, `optout`, ()=>{
        if (t.options.some((e)=>e._zod.optout === `optional`)) {
            return `optional`;
        }
    });
    p(e._zod, `values`, ()=>{
        if (t.options.every((e)=>e._zod.values)) {
            return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
        }
    });
    p(e._zod, `pattern`, ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>u(e.source)).join(`|`)})$`);
        }
    });
    let n = t.options.length === 1 ? t.options[0]._zod.run : null;
    e._zod.parse = (r, i)=>{
        if (n) {
            return n(r, i);
        }
        let a = false;
        let o = [];
        for (let e of t.options){
            let t = e._zod.run({
                value: r.value,
                issues: []
            }, i);
            if (t instanceof Promise) {
                o.push(t);
                a = true;
            } else {
                if (t.issues.length === 0) {
                    return t;
                }
                o.push(t);
            }
        }
        if (a) {
            return Promise.all(o).then((t)=>fn(t, r, e, i));
        }
        return fn(o, r, e, i);
    };
});
const mn = t(`$ZodDiscriminatedUnion`, (e, t)=>{
    t.inclusive = false;
    pn.init(e, t);
    let parse = e._zod.parse;
    p(e._zod, `propValues`, ()=>{
        let e = {};
        for (let n of t.options){
            let r = n._zod.propValues;
            if (!r || Object.keys(r).length === 0) {
                throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
            }
            for (let [t, n] of Object.entries(r)){
                if (!e[t]) {
                    e[t] = new Set;
                }
                for (let r of n){
                    e[t].add(r);
                }
            }
        }
        return e;
    });
    let r = c(()=>{
        let t_options = t.options;
        let n = new Map;
        for (let r of t_options){
            let e = r._zod.propValues?.[t.discriminator];
            if (!e || e.size === 0) {
                throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            }
            for (let t of e){
                if (n.has(t)) {
                    throw Error(`Duplicate discriminator value "${String(t)}"`);
                }
                n.set(t, r);
            }
        }
        return n;
    });
    e._zod.parse = (i, a)=>{
        let i_value = i.value;
        if (!g(i_value)) {
            i.issues.push({
                code: `invalid_type`,
                expected: `object`,
                input: i_value,
                inst: e
            });
            return i;
        }
        let s = r.value.get(i_value?.[t.discriminator]);
        if (s) {
            return s._zod.run(i, a);
        }
        if (t.unionFallback || a.direction === `backward`) {
            return parse(i, a);
        }
        i.issues.push({
            code: `invalid_union`,
            errors: [],
            note: `No matching discriminator`,
            discriminator: t.discriminator,
            options: Array.from(r.value.keys()),
            input: i_value,
            path: [
                t.discriminator
            ],
            inst: e
        });
        return i;
    };
});
const hn = t(`$ZodIntersection`, (e, t)=>{
    M.init(e, t);
    e._zod.parse = (e, n)=>{
        let e_value = e.value;
        let i = t.left._zod.run({
            value: e_value,
            issues: []
        }, n);
        let a = t.right._zod.run({
            value: e_value,
            issues: []
        }, n);
        if (i instanceof Promise || a instanceof Promise) {
            return Promise.all([
                i,
                a
            ]).then(([t, n])=>gn(e, t, n));
        }
        return gn(e, i, a);
    };
});
function I(e, t) {
    if (e === t || e instanceof Date && t instanceof Date && +e == +t) {
        return {
            valid: true,
            data: e
        };
    }
    if (_(e) && _(t)) {
        let n = Object.keys(t);
        let r = Object.keys(e).filter((e)=>n.indexOf(e) !== -1);
        let i = {
            ...e,
            ...t
        };
        for (let n of r){
            let r = I(e[n], t[n]);
            if (!r.valid) {
                return {
                    valid: false,
                    mergeErrorPath: [
                        n,
                        ...r.mergeErrorPath
                    ]
                };
            }
            i[n] = r.data;
        }
        return {
            valid: true,
            data: i
        };
    }
    if (Array.isArray(e) && Array.isArray(t)) {
        if (e.length !== t.length) {
            return {
                valid: false,
                mergeErrorPath: []
            };
        }
        let n = [];
        for(let r = 0; r < e.length; r++){
            let i = e[r];
            let a = t[r];
            let o = I(i, a);
            if (!o.valid) {
                return {
                    valid: false,
                    mergeErrorPath: [
                        r,
                        ...o.mergeErrorPath
                    ]
                };
            }
            n.push(o.data);
        }
        return {
            valid: true,
            data: n
        };
    }
    return {
        valid: false,
        mergeErrorPath: []
    };
}
function gn(e, t, n) {
    let r = new Map;
    let i;
    for (let n of t.issues){
        if (n.code === `unrecognized_keys`) {
            i ??= n;
            for (let e of n.keys){
                if (!r.has(e)) {
                    r.set(e, {});
                }
                r.get(e).l = true;
            }
        } else {
            e.issues.push(n);
        }
    }
    for (let t of n.issues){
        if (t.code === `unrecognized_keys`) {
            for (let e of t.keys){
                if (!r.has(e)) {
                    r.set(e, {});
                }
                r.get(e).r = true;
            }
        } else {
            e.issues.push(t);
        }
    }
    let a = [
        ...r
    ].filter(([, e])=>e.l && e.r).map(([e])=>e);
    if (a.length && i) {
        e.issues.push({
            ...i,
            keys: a
        });
    }
    if (x(e)) {
        return e;
    }
    let o = I(t.value, n.value);
    if (!o.valid) {
        throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
    }
    e.value = o.data;
    return e;
}
const _n = t(`$ZodTuple`, (e, t)=>{
    M.init(e, t);
    let t_items = t.items;
    e._zod.parse = (r, i)=>{
        let r_value = r.value;
        if (!Array.isArray(r_value)) {
            r.issues.push({
                input: r_value,
                inst: e,
                expected: `tuple`,
                code: `invalid_type`
            });
            return r;
        }
        r.value = [];
        let o = [];
        let minimum = vn(t_items, `optin`);
        let c = vn(t_items, `optout`);
        if (!t.rest) {
            if (r_value.length < minimum) {
                r.issues.push({
                    code: `too_small`,
                    minimum,
                    inclusive: true,
                    input: r_value,
                    inst: e,
                    origin: `array`
                });
                return r;
            }
            if (r_value.length > t_items.length) {
                r.issues.push({
                    code: `too_big`,
                    maximum: t_items.length,
                    inclusive: true,
                    input: r_value,
                    inst: e,
                    origin: `array`
                });
            }
        }
        let l = Array(t_items.length);
        for(let e = 0; e < t_items.length; e++){
            let t = t_items[e]._zod.run({
                value: r_value[e],
                issues: []
            }, i);
            if (t instanceof Promise) {
                o.push(t.then((t)=>{
                    l[e] = t;
                }));
            } else {
                l[e] = t;
            }
        }
        if (t.rest) {
            let e = t_items.length - 1;
            let s = r_value.slice(t_items.length);
            for (let n of s){
                e++;
                let a = t.rest._zod.run({
                    value: n,
                    issues: []
                }, i);
                if (a instanceof Promise) {
                    o.push(a.then((t)=>yn(t, r, e)));
                } else {
                    yn(a, r, e);
                }
            }
        }
        if (o.length) {
            return Promise.all(o).then(()=>bn(l, r, t_items, r_value, c));
        }
        return bn(l, r, t_items, r_value, c);
    };
});
function vn(e, t) {
    for(let n = e.length - 1; n >= 0; n--){
        if (e[n]._zod[t] !== `optional`) {
            return n + 1;
        }
    }
    return 0;
}
function yn(e, t, n) {
    if (e.issues.length) {
        t.issues.push(...S(n, e.issues));
    }
    t.value[n] = e.value;
}
function bn(e, t, n, r, i) {
    for(let a = 0; a < n.length; a++){
        let n = e[a];
        let o = a < r.length;
        if (n.issues.length) {
            if (!o && a >= i) {
                t.value.length = a;
                break;
            }
            t.issues.push(...S(a, n.issues));
        }
        t.value[a] = n.value;
    }
    for(let e = t.value.length - 1; e >= r.length && n[e]._zod.optout === `optional` && t.value[e] === undefined; e--){
        t.value.length = e;
    }
    return t;
}
const xn = t(`$ZodRecord`, (e, t)=>{
    M.init(e, t);
    e._zod.parse = (n, r)=>{
        let n_value = n.value;
        if (!_(n_value)) {
            n.issues.push({
                expected: `record`,
                code: `invalid_type`,
                input: n_value,
                inst: e
            });
            return n;
        }
        let o = [];
        let values = t.keyType._zod.values;
        if (values) {
            n.value = {};
            let c = new Set;
            for (let l of values){
                if (typeof l == `string` || typeof l == `number` || typeof l == `symbol`) {
                    c.add(typeof l == `number` ? l.toString() : l);
                    let s = t.keyType._zod.run({
                        value: l,
                        issues: []
                    }, r);
                    if (s instanceof Promise) {
                        throw Error(`Async schemas not supported in object keys currently`);
                    }
                    if (s.issues.length) {
                        n.issues.push({
                            code: `invalid_key`,
                            origin: `record`,
                            issues: s.issues.map((e)=>w(e, r, a())),
                            input: l,
                            path: [
                                l
                            ],
                            inst: e
                        });
                        continue;
                    }
                    let u = s.value;
                    let d = t.valueType._zod.run({
                        value: n_value[l],
                        issues: []
                    }, r);
                    if (d instanceof Promise) {
                        o.push(d.then((e)=>{
                            if (e.issues.length) {
                                n.issues.push(...S(l, e.issues));
                            }
                            n.value[u] = e.value;
                        }));
                    } else {
                        if (d.issues.length) {
                            n.issues.push(...S(l, d.issues));
                        }
                        n.value[u] = d.value;
                    }
                }
            }
            let l;
            for(let e in n_value){
                if (!c.has(e)) {
                    l ??= [];
                    l.push(e);
                }
            }
            if (l && l.length > 0) {
                n.issues.push({
                    code: `unrecognized_keys`,
                    input: n_value,
                    inst: e,
                    keys: l
                });
            }
        } else {
            n.value = {};
            for (let s of Reflect.ownKeys(n_value)){
                if (s === `__proto__` || !Object.prototype.propertyIsEnumerable.call(n_value, s)) {
                    continue;
                }
                let c = t.keyType._zod.run({
                    value: s,
                    issues: []
                }, r);
                if (c instanceof Promise) {
                    throw Error(`Async schemas not supported in object keys currently`);
                }
                if (typeof s == `string` && ot.test(s) && c.issues.length) {
                    let e = t.keyType._zod.run({
                        value: Number(s),
                        issues: []
                    }, r);
                    if (e instanceof Promise) {
                        throw Error(`Async schemas not supported in object keys currently`);
                    }
                    if (e.issues.length === 0) {
                        c = e;
                    }
                }
                if (c.issues.length) {
                    if (t.mode === `loose`) {
                        n.value[s] = n_value[s];
                    } else {
                        n.issues.push({
                            code: `invalid_key`,
                            origin: `record`,
                            issues: c.issues.map((e)=>w(e, r, a())),
                            input: s,
                            path: [
                                s
                            ],
                            inst: e
                        });
                    }
                    continue;
                }
                let l = t.valueType._zod.run({
                    value: n_value[s],
                    issues: []
                }, r);
                if (l instanceof Promise) {
                    o.push(l.then((e)=>{
                        if (e.issues.length) {
                            n.issues.push(...S(s, e.issues));
                        }
                        n.value[c.value] = e.value;
                    }));
                } else {
                    if (l.issues.length) {
                        n.issues.push(...S(s, l.issues));
                    }
                    n.value[c.value] = l.value;
                }
            }
        }
        if (o.length) {
            return Promise.all(o).then(()=>n);
        }
        return n;
    };
});
const Sn = t(`$ZodEnum`, (e, t)=>{
    M.init(e, t);
    let values = o(t.entries);
    let r = new Set(values);
    e._zod.values = r;
    e._zod.pattern = RegExp(`^(${values.filter((e)=>ae.has(typeof e)).map((e)=>{
        if (typeof e == `string`) {
            return v(e);
        }
        return e.toString();
    }).join(`|`)})$`);
    e._zod.parse = (t, i)=>{
        let t_value = t.value;
        if (!r.has(t_value)) {
            t.issues.push({
                code: `invalid_value`,
                values,
                input: t_value,
                inst: e
            });
        }
        return t;
    };
});
const Cn = t(`$ZodLiteral`, (e, t)=>{
    M.init(e, t);
    if (t.values.length === 0) {
        throw Error(`Cannot create literal schema with no valid values`);
    }
    let n = new Set(t.values);
    e._zod.values = n;
    e._zod.pattern = RegExp(`^(${t.values.map((e)=>{
        if (typeof e == `string`) {
            return v(e);
        }
        if (e) {
            return v(e.toString());
        }
        return String(e);
    }).join(`|`)})$`);
    e._zod.parse = (r, i)=>{
        let r_value = r.value;
        if (!n.has(r_value)) {
            r.issues.push({
                code: `invalid_value`,
                values: t.values,
                input: r_value,
                inst: e
            });
        }
        return r;
    };
});
const wn = t(`$ZodTransform`, (e, t)=>{
    M.init(e, t);
    e._zod.optin = `optional`;
    e._zod.parse = (i, a)=>{
        if (a.direction === `backward`) {
            throw new r(e.constructor.name);
        }
        let o = t.transform(i.value, i);
        if (a.async) {
            return (o instanceof Promise ? o : Promise.resolve(o)).then((e)=>{
                i.value = e;
                i.fallback = true;
                return i;
            });
        }
        if (o instanceof Promise) {
            throw new n;
        }
        i.value = o;
        i.fallback = true;
        return i;
    };
});
function Tn(e, t) {
    if (t === undefined && (e.issues.length || e.fallback)) {
        return {
            issues: [],
            value: undefined
        };
    }
    return e;
}
const En = t(`$ZodOptional`, (e, t)=>{
    M.init(e, t);
    e._zod.optin = `optional`;
    e._zod.optout = `optional`;
    p(e._zod, `values`, ()=>{
        if (t.innerType._zod.values) {
            return new Set([
                ...t.innerType._zod.values,
                undefined
            ]);
        }
    });
    p(e._zod, `pattern`, ()=>{
        let pattern = t.innerType._zod.pattern;
        if (pattern) {
            return RegExp(`^(${u(pattern.source)})?$`);
        }
    });
    e._zod.parse = (e, n)=>{
        if (t.innerType._zod.optin === `optional`) {
            let r = e.value;
            let i = t.innerType._zod.run(e, n);
            if (i instanceof Promise) {
                return i.then((e)=>Tn(e, r));
            }
            return Tn(i, r);
        }
        if (e.value === undefined) {
            return e;
        }
        return t.innerType._zod.run(e, n);
    };
});
const Dn = t(`$ZodExactOptional`, (e, t)=>{
    En.init(e, t);
    p(e._zod, `values`, ()=>t.innerType._zod.values);
    p(e._zod, `pattern`, ()=>t.innerType._zod.pattern);
    e._zod.parse = (e, n)=>t.innerType._zod.run(e, n);
});
const On = t(`$ZodNullable`, (e, t)=>{
    M.init(e, t);
    p(e._zod, `optin`, ()=>t.innerType._zod.optin);
    p(e._zod, `optout`, ()=>t.innerType._zod.optout);
    p(e._zod, `pattern`, ()=>{
        let pattern = t.innerType._zod.pattern;
        if (pattern) {
            return RegExp(`^(${u(pattern.source)}|null)$`);
        }
    });
    p(e._zod, `values`, ()=>{
        if (t.innerType._zod.values) {
            return new Set([
                ...t.innerType._zod.values,
                null
            ]);
        }
    });
    e._zod.parse = (e, n)=>{
        if (e.value === null) {
            return e;
        }
        return t.innerType._zod.run(e, n);
    };
});
const kn = t(`$ZodDefault`, (e, t)=>{
    M.init(e, t);
    e._zod.optin = `optional`;
    p(e._zod, `values`, ()=>t.innerType._zod.values);
    e._zod.parse = (e, n)=>{
        if (n.direction === `backward`) {
            return t.innerType._zod.run(e, n);
        }
        if (e.value === undefined) {
            e.value = t.defaultValue;
            return e;
        }
        let r = t.innerType._zod.run(e, n);
        if (r instanceof Promise) {
            return r.then((e)=>An(e, t));
        }
        return An(r, t);
    };
});
function An(e, t) {
    if (e.value === undefined) {
        e.value = t.defaultValue;
    }
    return e;
}
const jn = t(`$ZodPrefault`, (e, t)=>{
    M.init(e, t);
    e._zod.optin = `optional`;
    p(e._zod, `values`, ()=>t.innerType._zod.values);
    e._zod.parse = (e, n)=>{
        if (n.direction !== `backward`) {
            if (e.value === undefined) {
                e.value = t.defaultValue;
            }
        }
        return t.innerType._zod.run(e, n);
    };
});
const Mn = t(`$ZodNonOptional`, (e, t)=>{
    M.init(e, t);
    p(e._zod, `values`, ()=>{
        let values = t.innerType._zod.values;
        if (values) {
            return new Set([
                ...values
            ].filter((e)=>e !== undefined));
        }
    });
    e._zod.parse = (n, r)=>{
        let i = t.innerType._zod.run(n, r);
        if (i instanceof Promise) {
            return i.then((t)=>Nn(t, e));
        }
        return Nn(i, e);
    };
});
function Nn(e, t) {
    if (!e.issues.length && e.value === undefined) {
        e.issues.push({
            code: `invalid_type`,
            expected: `nonoptional`,
            input: e.value,
            inst: t
        });
    }
    return e;
}
const Pn = t(`$ZodCatch`, (e, t)=>{
    M.init(e, t);
    e._zod.optin = `optional`;
    p(e._zod, `optout`, ()=>t.innerType._zod.optout);
    p(e._zod, `values`, ()=>t.innerType._zod.values);
    e._zod.parse = (e, n)=>{
        if (n.direction === `backward`) {
            return t.innerType._zod.run(e, n);
        }
        let r = t.innerType._zod.run(e, n);
        if (r instanceof Promise) {
            return r.then((r)=>{
                e.value = r.value;
                if (r.issues.length) {
                    e.value = t.catchValue({
                        ...e,
                        error: {
                            issues: r.issues.map((e)=>w(e, n, a()))
                        },
                        input: e.value
                    });
                    e.issues = [];
                    e.fallback = true;
                }
                return e;
            });
        }
        e.value = r.value;
        if (r.issues.length) {
            e.value = t.catchValue({
                ...e,
                error: {
                    issues: r.issues.map((e)=>w(e, n, a()))
                },
                input: e.value
            });
            e.issues = [];
            e.fallback = true;
        }
        return e;
    };
});
const Fn = t(`$ZodPipe`, (e, t)=>{
    M.init(e, t);
    p(e._zod, `values`, ()=>t.in._zod.values);
    p(e._zod, `optin`, ()=>t.in._zod.optin);
    p(e._zod, `optout`, ()=>t.out._zod.optout);
    p(e._zod, `propValues`, ()=>t.in._zod.propValues);
    e._zod.parse = (e, n)=>{
        if (n.direction === `backward`) {
            let r = t.out._zod.run(e, n);
            if (r instanceof Promise) {
                return r.then((e)=>L(e, t.in, n));
            }
            return L(r, t.in, n);
        }
        let r = t.in._zod.run(e, n);
        if (r instanceof Promise) {
            return r.then((e)=>L(e, t.out, n));
        }
        return L(r, t.out, n);
    };
});
function L(e, t, n) {
    if (e.issues.length) {
        e.aborted = true;
        return e;
    }
    return t._zod.run({
        value: e.value,
        issues: e.issues,
        fallback: e.fallback
    }, n);
}
const In = t(`$ZodReadonly`, (e, t)=>{
    M.init(e, t);
    p(e._zod, `propValues`, ()=>t.innerType._zod.propValues);
    p(e._zod, `values`, ()=>t.innerType._zod.values);
    p(e._zod, `optin`, ()=>t.innerType?._zod?.optin);
    p(e._zod, `optout`, ()=>t.innerType?._zod?.optout);
    e._zod.parse = (e, n)=>{
        if (n.direction === `backward`) {
            return t.innerType._zod.run(e, n);
        }
        let r = t.innerType._zod.run(e, n);
        if (r instanceof Promise) {
            return r.then(Ln);
        }
        return Ln(r);
    };
});
function Ln(e) {
    e.value = Object.freeze(e.value);
    return e;
}
const Rn = t(`$ZodCustom`, (e, t)=>{
    A.init(e, t);
    M.init(e, t);
    e._zod.parse = (e, t)=>e;
    e._zod.check = (n)=>{
        let n_value = n.value;
        let i = t.fn(n_value);
        if (i instanceof Promise) {
            return i.then((t)=>zn(t, n, n_value, e));
        }
        zn(i, n, n_value, e);
    };
});
function zn(e, t, n, r) {
    if (!e) {
        let e = {
            code: `custom`,
            input: n,
            inst: r,
            path: [
                ...r._zod.def.path ?? []
            ],
            continue: !r._zod.def.abort
        };
        if (r._zod.def.params) {
            e.params = r._zod.def.params;
        }
        t.issues.push(E(e));
    }
}
let Bn;
class Vn {
    constructor(){
        this._map = new WeakMap;
        this._idmap = new Map;
    }
    add(e, ...t) {
        let n = t[0];
        this._map.set(e, n);
        if (n && typeof n == `object` && `id` in n) {
            this._idmap.set(n.id, e);
        }
        return this;
    }
    clear() {
        this._map = new WeakMap;
        this._idmap = new Map;
        return this;
    }
    remove(e) {
        let t = this._map.get(e);
        if (t && typeof t == `object` && `id` in t) {
            this._idmap.delete(t.id);
        }
        this._map.delete(e);
        return this;
    }
    get(e) {
        let parent = e._zod.parent;
        if (parent) {
            let n = {
                ...this.get(parent) ?? {}
            };
            delete n.id;
            let r = {
                ...n,
                ...this._map.get(e)
            };
            if (Object.keys(r).length) {
                return r;
            }
            return undefined;
        }
        return this._map.get(e);
    }
    has(e) {
        return this._map.has(e);
    }
}
function Hn() {
    return new Vn;
}
(Bn = globalThis).__zod_globalRegistry ?? (Bn.__zod_globalRegistry = Hn());
const globalThis___zod_globalRegistry = globalThis.__zod_globalRegistry;
function Un(e, t) {
    return new e({
        type: `string`,
        ...b(t)
    });
}
function Wn(e, t) {
    return new e({
        type: `string`,
        format: `email`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function Gn(e, t) {
    return new e({
        type: `string`,
        format: `guid`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function Kn(e, t) {
    return new e({
        type: `string`,
        format: `uuid`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function qn(e, t) {
    return new e({
        type: `string`,
        format: `uuid`,
        check: `string_format`,
        abort: false,
        version: `v4`,
        ...b(t)
    });
}
function Jn(e, t) {
    return new e({
        type: `string`,
        format: `uuid`,
        check: `string_format`,
        abort: false,
        version: `v6`,
        ...b(t)
    });
}
function Yn(e, t) {
    return new e({
        type: `string`,
        format: `uuid`,
        check: `string_format`,
        abort: false,
        version: `v7`,
        ...b(t)
    });
}
function Xn(e, t) {
    return new e({
        type: `string`,
        format: `url`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function Zn(e, t) {
    return new e({
        type: `string`,
        format: `emoji`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function Qn(e, t) {
    return new e({
        type: `string`,
        format: `nanoid`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function $n(e, t) {
    return new e({
        type: `string`,
        format: `cuid`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function er(e, t) {
    return new e({
        type: `string`,
        format: `cuid2`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function tr(e, t) {
    return new e({
        type: `string`,
        format: `ulid`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function nr(e, t) {
    return new e({
        type: `string`,
        format: `xid`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function rr(e, t) {
    return new e({
        type: `string`,
        format: `ksuid`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function ir(e, t) {
    return new e({
        type: `string`,
        format: `ipv4`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function ar(e, t) {
    return new e({
        type: `string`,
        format: `ipv6`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function or(e, t) {
    return new e({
        type: `string`,
        format: `cidrv4`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function sr(e, t) {
    return new e({
        type: `string`,
        format: `cidrv6`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function cr(e, t) {
    return new e({
        type: `string`,
        format: `base64`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function lr(e, t) {
    return new e({
        type: `string`,
        format: `base64url`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function ur(e, t) {
    return new e({
        type: `string`,
        format: `e164`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function dr(e, t) {
    return new e({
        type: `string`,
        format: `jwt`,
        check: `string_format`,
        abort: false,
        ...b(t)
    });
}
function fr(e, t) {
    return new e({
        type: `string`,
        format: `datetime`,
        check: `string_format`,
        offset: false,
        local: false,
        precision: null,
        ...b(t)
    });
}
function pr(e, t) {
    return new e({
        type: `string`,
        format: `date`,
        check: `string_format`,
        ...b(t)
    });
}
function mr(e, t) {
    return new e({
        type: `string`,
        format: `time`,
        check: `string_format`,
        precision: null,
        ...b(t)
    });
}
function hr(e, t) {
    return new e({
        type: `string`,
        format: `duration`,
        check: `string_format`,
        ...b(t)
    });
}
function gr(e, t) {
    return new e({
        type: `number`,
        checks: [],
        ...b(t)
    });
}
function _r(e, t) {
    return new e({
        type: `number`,
        coerce: true,
        checks: [],
        ...b(t)
    });
}
function vr(e, t) {
    return new e({
        type: `number`,
        check: `number_format`,
        abort: false,
        format: `safeint`,
        ...b(t)
    });
}
function yr(e, t) {
    return new e({
        type: `boolean`,
        ...b(t)
    });
}
function br(e, t) {
    return new e({
        type: `bigint`,
        ...b(t)
    });
}
function xr(e) {
    return new e({
        type: `unknown`
    });
}
function Sr(e, t) {
    return new e({
        type: `never`,
        ...b(t)
    });
}
function z(e, t) {
    return new dt({
        check: `less_than`,
        ...b(t),
        value: e,
        inclusive: false
    });
}
function B(e, t) {
    return new dt({
        check: `less_than`,
        ...b(t),
        value: e,
        inclusive: true
    });
}
function V(e, t) {
    return new ft({
        check: `greater_than`,
        ...b(t),
        value: e,
        inclusive: false
    });
}
function H(e, t) {
    return new ft({
        check: `greater_than`,
        ...b(t),
        value: e,
        inclusive: true
    });
}
function Cr(e, t) {
    return new pt({
        check: `multiple_of`,
        ...b(t),
        value: e
    });
}
function wr(maximum, t) {
    return new ht({
        check: `max_length`,
        ...b(t),
        maximum
    });
}
function U(minimum, t) {
    return new gt({
        check: `min_length`,
        ...b(t),
        minimum
    });
}
function Tr(length, t) {
    return new _t({
        check: `length_equals`,
        ...b(t),
        length
    });
}
function Er(pattern, t) {
    return new vt({
        check: `string_format`,
        format: `regex`,
        ...b(t),
        pattern
    });
}
function Dr(e) {
    return new yt({
        check: `string_format`,
        format: `lowercase`,
        ...b(e)
    });
}
function Or(e) {
    return new bt({
        check: `string_format`,
        format: `uppercase`,
        ...b(e)
    });
}
function kr(includes, t) {
    return new xt({
        check: `string_format`,
        format: `includes`,
        ...b(t),
        includes
    });
}
function Ar(prefix, t) {
    return new St({
        check: `string_format`,
        format: `starts_with`,
        ...b(t),
        prefix
    });
}
function jr(suffix, t) {
    return new Ct({
        check: `string_format`,
        format: `ends_with`,
        ...b(t),
        suffix
    });
}
function W(tx) {
    return new wt({
        check: `overwrite`,
        tx
    });
}
function Mr(e) {
    return W((t)=>t.normalize(e));
}
function Nr() {
    return W((e)=>e.trim());
}
function Pr() {
    return W((e)=>e.toLowerCase());
}
function Fr() {
    return W((e)=>e.toUpperCase());
}
function Ir() {
    return W((e)=>te(e));
}
function Lr(e, element, n) {
    return new e({
        type: `array`,
        element,
        ...b(n)
    });
}
function Rr(e, fn_1, n) {
    return new e({
        type: `custom`,
        check: `custom`,
        fn: fn_1,
        ...b(n)
    });
}
function zr(e, t) {
    let n = Br((t)=>{
        t.addIssue = (e)=>{
            if (typeof e == `string`) {
                t.issues.push(E(e, t.value, n._zod.def));
            } else {
                let r = e;
                if (r.fatal) {
                    r.continue = false;
                }
                r.code ??= `custom`;
                r.input ??= t.value;
                r.inst ??= n;
                r.continue ??= !n._zod.def.abort;
                t.issues.push(E(r));
            }
        };
        return e(t.value, t);
    }, t);
    return n;
}
function Br(e, t) {
    let n = new A({
        check: `custom`,
        ...b(t)
    });
    n._zod.check = e;
    return n;
}
function Vr(e) {
    let target = e?.target ?? `draft-2020-12`;
    if (target === `draft-4`) {
        target = `draft-04`;
    }
    if (target === `draft-7`) {
        target = `draft-07`;
    }
    return {
        processors: e.processors ?? {},
        metadataRegistry: e?.metadata ?? globalThis___zod_globalRegistry,
        target,
        unrepresentable: e?.unrepresentable ?? `throw`,
        override: e?.override ?? (()=>{}),
        io: e?.io ?? `output`,
        counter: 0,
        seen: new Map,
        cycles: e?.cycles ?? `ref`,
        reused: e?.reused ?? `inline`,
        external: e?.external ?? undefined
    };
}
function Hr(e, t) {
    let n = e.seen.get(t);
    if (!n) {
        throw Error(`Unprocessed schema. This is a bug in Zod.`);
    }
    let r = new Map;
    for (let t of e.seen.entries()){
        let n = e.metadataRegistry.get(t[0])?.id;
        if (n) {
            let e = r.get(n);
            if (e && e !== t[0]) {
                throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
            }
            r.set(n, t[0]);
        }
    }
    let i = (t)=>{
        let r = e.target === `draft-2020-12` ? `$defs` : `definitions`;
        if (e.external) {
            let n = e.external.registry.get(t[0])?.id;
            let i = e.external.uri ?? ((e)=>e);
            if (n) {
                return {
                    ref: i(n)
                };
            }
            let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
            t[1].defId = a;
            return {
                defId: a,
                ref: `${i(`__shared`)}#/${r}/${a}`
            };
        }
        if (t[1] === n) {
            return {
                ref: `#`
            };
        }
        let i = `#/${r}/`;
        let a = t[1].schema.id ?? `__schema${e.counter++}`;
        return {
            defId: a,
            ref: i + a
        };
    };
    let a = (e)=>{
        if (e[1].schema.$ref) {
            return;
        }
        let t = e[1];
        let { ref, defId } = i(e);
        t.def = {
            ...t.schema
        };
        if (defId) {
            t.defId = defId;
        }
        let t_schema = t.schema;
        for(let e in t_schema){
            delete t_schema[e];
        }
        t_schema.$ref = ref;
    };
    if (e.cycles === `throw`) {
        for (let t of e.seen.entries()){
            let e = t[1];
            if (e.cycle) {
                throw Error(`Cycle detected: #/${e.cycle?.join(`/`)}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
            }
        }
    }
    for (let n of e.seen.entries()){
        let r = n[1];
        if (t === n[0]) {
            a(n);
            continue;
        }
        if (e.external) {
            let r = e.external.registry.get(n[0])?.id;
            if (t !== n[0] && r) {
                a(n);
                continue;
            }
        }
        if (e.metadataRegistry.get(n[0])?.id) {
            a(n);
            continue;
        }
        if (r.cycle) {
            a(n);
            continue;
        }
        if (r.count > 1 && e.reused === `ref`) {
            a(n);
            continue;
        }
    }
}
function Ur(e, t) {
    let n = e.seen.get(t);
    if (!n) {
        throw Error(`Unprocessed schema. This is a bug in Zod.`);
    }
    let r = (zodSchema)=>{
        let n = e.seen.get(zodSchema);
        if (n.ref === null) {
            return;
        }
        let jsonSchema = n.def ?? n.schema;
        let a = {
            ...jsonSchema
        };
        let n_ref = n.ref;
        n.ref = null;
        if (n_ref) {
            r(n_ref);
            let n = e.seen.get(n_ref);
            let s = n.schema;
            if (s.$ref && (e.target === `draft-07` || e.target === `draft-04` || e.target === `openapi-3.0`)) {
                jsonSchema.allOf = jsonSchema.allOf ?? [];
                jsonSchema.allOf.push(s);
            } else {
                Object.assign(jsonSchema, s);
            }
            Object.assign(jsonSchema, a);
            if (zodSchema._zod.parent === n_ref) {
                for(let e in jsonSchema){
                    if (!(e === `$ref` || e === `allOf` || e in a)) {
                        delete jsonSchema[e];
                    }
                }
            }
            if (s.$ref && n.def) {
                for(let e in jsonSchema){
                    if (!(e === `$ref` || e === `allOf`)) {
                        if (e in n.def && JSON.stringify(jsonSchema[e]) === JSON.stringify(n.def[e])) {
                            delete jsonSchema[e];
                        }
                    }
                }
            }
        }
        let parent = zodSchema._zod.parent;
        if (parent && parent !== n_ref) {
            r(parent);
            let t = e.seen.get(parent);
            if (t?.schema.$ref && (jsonSchema.$ref = t.schema.$ref, t.def)) {
                for(let e in jsonSchema){
                    if (!(e === `$ref` || e === `allOf`)) {
                        if (e in t.def && JSON.stringify(jsonSchema[e]) === JSON.stringify(t.def[e])) {
                            delete jsonSchema[e];
                        }
                    }
                }
            }
        }
        e.override({
            zodSchema,
            jsonSchema,
            path: n.path ?? []
        });
    };
    for (let t of [
        ...e.seen.entries()
    ].reverse()){
        r(t[0]);
    }
    let i = {};
    if (e.target === `draft-2020-12`) {
        i.$schema = `https://json-schema.org/draft/2020-12/schema`;
    } else if (e.target === `draft-07`) {
        i.$schema = `http://json-schema.org/draft-07/schema#`;
    } else if (e.target === `draft-04`) {
        i.$schema = `http://json-schema.org/draft-04/schema#`;
    } else {
        e.target;
    }
    if (e.external?.uri) {
        let n = e.external.registry.get(t)?.id;
        if (!n) {
            throw Error("Schema is missing an `id` property");
        }
        i.$id = e.external.uri(n);
    }
    Object.assign(i, n.def ?? n.schema);
    let a = e.metadataRegistry.get(t)?.id;
    if (a !== undefined && i.id === a) {
        delete i.id;
    }
    let o = e.external?.defs ?? {};
    for (let t of e.seen.entries()){
        let e = t[1];
        if (e.def && e.defId) {
            if (e.def.id === e.defId) {
                delete e.def.id;
            }
            o[e.defId] = e.def;
        }
    }
    if (!e.external) {
        if (Object.keys(o).length > 0) {
            if (e.target === `draft-2020-12`) {
                i.$defs = o;
            } else {
                i.definitions = o;
            }
        }
    }
    try {
        let n = JSON.parse(JSON.stringify(i));
        Object.defineProperty(n, "~standard", {
            value: {
                ...t[`~standard`],
                jsonSchema: {
                    input: q(t, `input`, e.processors),
                    output: q(t, `output`, e.processors)
                }
            },
            enumerable: false,
            writable: false
        });
        return n;
    } catch  {
        throw Error(`Error converting schema to JSON.`);
    }
}
const Wr = (e, t = {})=>(n)=>{
        let r = Vr({
            ...n,
            processors: t
        });
        G(e, r);
        Hr(r, e);
        return Ur(r, e);
    };
var q = (e, io, n = {})=>(r)=>{
        let { libraryOptions, target } = r ?? {};
        let o = Vr({
            ...libraryOptions ?? {},
            target,
            io,
            processors: n
        });
        G(e, o);
        Hr(o, e);
        return Ur(o, e);
    };
const Gr = {
    guid: `uuid`,
    url: `uri`,
    datetime: `date-time`,
    json_string: `json-string`,
    regex: ``
};
const Kr = (e, t, n, r)=>{
    let i = n;
    i.type = `string`;
    let { minimum, maximum, format, patterns, contentEncoding } = e._zod.bag;
    if (typeof minimum == `number`) {
        i.minLength = minimum;
    }
    if (typeof maximum == `number`) {
        i.maxLength = maximum;
    }
    if (format) {
        i.format = Gr[format] ?? format;
        if (i.format === ``) {
            delete i.format;
        }
        if (format === `time`) {
            delete i.format;
        }
    }
    if (contentEncoding) {
        i.contentEncoding = contentEncoding;
    }
    if (patterns && patterns.size > 0) {
        let e = [
            ...patterns
        ];
        if (e.length === 1) {
            i.pattern = e[0].source;
        } else if (e.length > 1) {
            i.allOf = [
                ...e.map((e)=>({
                        ...t.target === `draft-07` || t.target === `draft-04` || t.target === `openapi-3.0` ? {
                            type: `string`
                        } : {},
                        pattern: e.source
                    }))
            ];
        }
    }
};
const qr = (e, t, n, r)=>{
    let i = n;
    let { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = e._zod.bag;
    if (typeof format == `string` && format.includes(`int`)) {
        i.type = `integer`;
    } else {
        i.type = `number`;
    }
    let d = typeof exclusiveMinimum == `number` && exclusiveMinimum >= (minimum ?? -Infinity);
    let f = typeof exclusiveMaximum == `number` && exclusiveMaximum <= (maximum ?? Infinity);
    let p = t.target === `draft-04` || t.target === `openapi-3.0`;
    if (d) {
        if (p) {
            i.minimum = exclusiveMinimum;
            i.exclusiveMinimum = true;
        } else {
            i.exclusiveMinimum = exclusiveMinimum;
        }
    } else if (typeof minimum == `number`) {
        i.minimum = minimum;
    }
    if (f) {
        if (p) {
            i.maximum = exclusiveMaximum;
            i.exclusiveMaximum = true;
        } else {
            i.exclusiveMaximum = exclusiveMaximum;
        }
    } else if (typeof maximum == `number`) {
        i.maximum = maximum;
    }
    if (typeof multipleOf == `number`) {
        i.multipleOf = multipleOf;
    }
};
const Jr = (e, t, n, r)=>{
    n.type = `boolean`;
};
const Yr = (e, t, n, r)=>{
    if (t.unrepresentable === `throw`) {
        throw Error(`BigInt cannot be represented in JSON Schema`);
    }
};
const Xr = (e, t, n, r)=>{
    n.not = {};
};
const Zr = (e, t, n, r)=>{
    let def = e._zod.def;
    let a = o(def.entries);
    if (a.every((e)=>typeof e == `number`)) {
        n.type = `number`;
    }
    if (a.every((e)=>typeof e == `string`)) {
        n.type = `string`;
    }
    n.enum = a;
};
const Qr = (e, t, n, r)=>{
    let def = e._zod.def;
    let a = [];
    for (let e of def.values){
        if (e === undefined) {
            if (t.unrepresentable === `throw`) {
                throw Error("Literal `undefined` cannot be represented in JSON Schema");
            }
        } else if (typeof e == `bigint`) {
            if (t.unrepresentable === `throw`) {
                throw Error(`BigInt literals cannot be represented in JSON Schema`);
            }
            a.push(Number(e));
        } else {
            a.push(e);
        }
    }
    if (a.length !== 0) {
        if (a.length === 1) {
            let e = a[0];
            n.type = e === null ? `null` : typeof e;
            if (t.target === `draft-04` || t.target === `openapi-3.0`) {
                n.enum = [
                    e
                ];
            } else {
                n.const = e;
            }
        } else {
            if (a.every((e)=>typeof e == `number`)) {
                n.type = `number`;
            }
            if (a.every((e)=>typeof e == `string`)) {
                n.type = `string`;
            }
            if (a.every((e)=>typeof e == `boolean`)) {
                n.type = `boolean`;
            }
            if (a.every((e)=>e === null)) {
                n.type = `null`;
            }
            n.enum = a;
        }
    }
};
const $r = (e, t, n, r)=>{
    if (t.unrepresentable === `throw`) {
        throw Error(`Custom types cannot be represented in JSON Schema`);
    }
};
const ei = (e, t, n, r)=>{
    if (t.unrepresentable === `throw`) {
        throw Error(`Transforms cannot be represented in JSON Schema`);
    }
};
const ti = (e, t, n, r)=>{
    let i = n;
    let def = e._zod.def;
    let { minimum, maximum } = e._zod.bag;
    if (typeof minimum == `number`) {
        i.minItems = minimum;
    }
    if (typeof maximum == `number`) {
        i.maxItems = maximum;
    }
    i.type = `array`;
    i.items = G(def.element, t, {
        ...r,
        path: [
            ...r.path,
            `items`
        ]
    });
};
const ni = (e, t, n, r)=>{
    let i = n;
    let def = e._zod.def;
    i.type = `object`;
    i.properties = {};
    let a_shape = def.shape;
    for(let e in a_shape){
        i.properties[e] = G(a_shape[e], t, {
            ...r,
            path: [
                ...r.path,
                `properties`,
                e
            ]
        });
    }
    let s = new Set(Object.keys(a_shape));
    let c = new Set([
        ...s
    ].filter((e)=>{
        let _zod = def.shape[e]._zod;
        if (t.io === `input`) {
            return _zod.optin === undefined;
        }
        return _zod.optout === undefined;
    }));
    if (c.size > 0) {
        i.required = Array.from(c);
    }
    if (def.catchall?._zod.def.type === `never`) {
        i.additionalProperties = false;
    } else if (def.catchall) {
        if (def.catchall) {
            i.additionalProperties = G(def.catchall, t, {
                ...r,
                path: [
                    ...r.path,
                    `additionalProperties`
                ]
            });
        }
    } else if (t.io === `output`) {
        i.additionalProperties = false;
    }
};
const ri = (e, t, n, r)=>{
    let def = e._zod.def;
    let a = def.inclusive === false;
    let o = def.options.map((e, n)=>G(e, t, {
            ...r,
            path: [
                ...r.path,
                a ? `oneOf` : `anyOf`,
                n
            ]
        }));
    if (a) {
        n.oneOf = o;
    } else {
        n.anyOf = o;
    }
};
const ii = (e, t, n, r)=>{
    let def = e._zod.def;
    let a = G(def.left, t, {
        ...r,
        path: [
            ...r.path,
            `allOf`,
            0
        ]
    });
    let o = G(def.right, t, {
        ...r,
        path: [
            ...r.path,
            `allOf`,
            1
        ]
    });
    let s = (e)=>`allOf` in e && Object.keys(e).length === 1;
    n.allOf = [
        ...s(a) ? a.allOf : [
            a
        ],
        ...s(o) ? o.allOf : [
            o
        ]
    ];
};
const ai = (e, t, n, r)=>{
    let i = n;
    let def = e._zod.def;
    i.type = `array`;
    let o = t.target === `draft-2020-12` ? `prefixItems` : `items`;
    let s = t.target === `draft-2020-12` || t.target === `openapi-3.0` ? `items` : `additionalItems`;
    let anyOf = def.items.map((e, n)=>G(e, t, {
            ...r,
            path: [
                ...r.path,
                o,
                n
            ]
        }));
    let l = def.rest ? G(def.rest, t, {
        ...r,
        path: [
            ...r.path,
            s,
            ...t.target === `openapi-3.0` ? [
                def.items.length
            ] : []
        ]
    }) : null;
    if (t.target === `draft-2020-12`) {
        i.prefixItems = anyOf;
        if (l) {
            i.items = l;
        }
    } else if (t.target === `openapi-3.0`) {
        i.items = {
            anyOf
        };
        if (l) {
            i.items.anyOf.push(l);
        }
        i.minItems = anyOf.length;
        if (!l) {
            i.maxItems = anyOf.length;
        }
    } else {
        i.items = anyOf;
        if (l) {
            i.additionalItems = l;
        }
    }
    let { minimum, maximum } = e._zod.bag;
    if (typeof minimum == `number`) {
        i.minItems = minimum;
    }
    if (typeof maximum == `number`) {
        i.maxItems = maximum;
    }
};
const oi = (e, t, n, r)=>{
    let i = n;
    let def = e._zod.def;
    i.type = `object`;
    let a_keyType = def.keyType;
    let s = a_keyType._zod.bag?.patterns;
    if (def.mode === `loose` && s && s.size > 0) {
        let e = G(def.valueType, t, {
            ...r,
            path: [
                ...r.path,
                `patternProperties`,
                `*`
            ]
        });
        i.patternProperties = {};
        for (let t of s){
            i.patternProperties[t.source] = e;
        }
    } else {
        if (t.target === `draft-07` || t.target === `draft-2020-12`) {
            i.propertyNames = G(def.keyType, t, {
                ...r,
                path: [
                    ...r.path,
                    `propertyNames`
                ]
            });
        }
        i.additionalProperties = G(def.valueType, t, {
            ...r,
            path: [
                ...r.path,
                `additionalProperties`
            ]
        });
    }
    let values = a_keyType._zod.values;
    if (values) {
        let e = [
            ...values
        ].filter((e)=>typeof e == `string` || typeof e == `number`);
        if (e.length > 0) {
            i.required = e;
        }
    }
};
const si = (e, t, n, r)=>{
    let def = e._zod.def;
    let a = G(def.innerType, t, r);
    let o = t.seen.get(e);
    if (t.target === `openapi-3.0`) {
        o.ref = def.innerType;
        n.nullable = true;
    } else {
        n.anyOf = [
            a,
            {
                type: `null`
            }
        ];
    }
};
const ci = (e, t, n, r)=>{
    let def = e._zod.def;
    G(def.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = def.innerType;
};
const li = (e, t, n, r)=>{
    let def = e._zod.def;
    G(def.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = def.innerType;
    n.default = JSON.parse(JSON.stringify(def.defaultValue));
};
const ui = (e, t, n, r)=>{
    let def = e._zod.def;
    G(def.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = def.innerType;
    if (t.io === `input`) {
        n._prefault = JSON.parse(JSON.stringify(def.defaultValue));
    }
};
const di = (e, t, n, r)=>{
    let def = e._zod.def;
    G(def.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = def.innerType;
    let o;
    try {
        o = def.catchValue(undefined);
    } catch  {
        throw Error(`Dynamic catch values are not supported in JSON Schema`);
    }
    n.default = o;
};
const fi = (e, t, n, r)=>{
    let def = e._zod.def;
    let a = def.in._zod.traits.has(`$ZodTransform`);
    let o = t.io === `input` ? a ? def.out : def.in : def.out;
    G(o, t, r);
    let s = t.seen.get(e);
    s.ref = o;
};
const pi = (e, t, n, r)=>{
    let def = e._zod.def;
    G(def.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = def.innerType;
    n.readOnly = true;
};
const mi = (e, t, n, r)=>{
    let def = e._zod.def;
    G(def.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = def.innerType;
};
const hi = t(`ZodISODateTime`, (e, t)=>{
    Rt.init(e, t);
    Z.init(e, t);
});
function gi(e) {
    return fr(hi, e);
}
const _i = t(`ZodISODate`, (e, t)=>{
    zt.init(e, t);
    Z.init(e, t);
});
function vi(e) {
    return pr(_i, e);
}
const yi = t(`ZodISOTime`, (e, t)=>{
    Bt.init(e, t);
    Z.init(e, t);
});
function bi(e) {
    return mr(yi, e);
}
const xi = t(`ZodISODuration`, (e, t)=>{
    Vt.init(e, t);
    Z.init(e, t);
});
function Si(e) {
    return hr(xi, e);
}
const J = t(`ZodError`, (e, t)=>{
    _e.init(e, t);
    e.name = `ZodError`;
    Object.defineProperties(e, {
        format: {
            value: (t)=>be(e, t)
        },
        flatten: {
            value: (t)=>ye(e, t)
        },
        addIssue: {
            value: (t)=>{
                e.issues.push(t);
                e.message = JSON.stringify(e.issues, s, 2);
            }
        },
        addIssues: {
            value: (t)=>{
                e.issues.push(...t);
                e.message = JSON.stringify(e.issues, s, 2);
            }
        },
        isEmpty: {
            get () {
                return e.issues.length === 0;
            }
        }
    });
}, {
    Parent: Error
});
const Ci = D(J);
const wi = xe(J);
const Ti = O(J);
const Ei = k(J);
const Di = we(J);
const Oi = Te(J);
const ki = Ee(J);
const Ai = De(J);
const ji = Oe(J);
const Mi = ke(J);
const Ni = Ae(J);
const Pi = je(J);
const Fi = new WeakMap;
function Y(e, t, n) {
    let r = Object.getPrototypeOf(e);
    let i = Fi.get(r);
    if (!i) {
        i = new Set;
        Fi.set(r, i);
    }
    if (!i.has(t)) {
        i.add(t);
        for(let e in n){
            let t = n[e];
            Object.defineProperty(r, e, {
                configurable: true,
                enumerable: false,
                get () {
                    let n = t.bind(this);
                    Object.defineProperty(this, e, {
                        configurable: true,
                        writable: true,
                        enumerable: true,
                        value: n
                    });
                    return n;
                },
                set (t) {
                    Object.defineProperty(this, e, {
                        configurable: true,
                        writable: true,
                        enumerable: true,
                        value: t
                    });
                }
            });
        }
    }
}
const X = t(`ZodType`, (e, t)=>{
    M.init(e, t);
    Object.assign(e[`~standard`], {
        jsonSchema: {
            input: q(e, `input`),
            output: q(e, `output`)
        }
    });
    e.toJSONSchema = Wr(e, {});
    e.def = t;
    e.type = t.type;
    Object.defineProperty(e, "_def", {
        value: t
    });
    e.parse = (t, n)=>Ci(e, t, n, {
            callee: e.parse
        });
    e.safeParse = (t, n)=>Ti(e, t, n);
    e.parseAsync = async (t, n)=>wi(e, t, n, {
            callee: e.parseAsync
        });
    e.safeParseAsync = async (t, n)=>Ei(e, t, n);
    e.spa = e.safeParseAsync;
    e.encode = (t, n)=>Di(e, t, n);
    e.decode = (t, n)=>Oi(e, t, n);
    e.encodeAsync = async (t, n)=>ki(e, t, n);
    e.decodeAsync = async (t, n)=>Ai(e, t, n);
    e.safeEncode = (t, n)=>ji(e, t, n);
    e.safeDecode = (t, n)=>Mi(e, t, n);
    e.safeEncodeAsync = async (t, n)=>Ni(e, t, n);
    e.safeDecodeAsync = async (t, n)=>Pi(e, t, n);
    Y(e, `ZodType`, {
        check (...e) {
            let def = this.def;
            return this.clone(h(def, {
                checks: [
                    ...def.checks ?? [],
                    ...e.map((check)=>{
                        if (typeof check == `function`) {
                            return {
                                _zod: {
                                    check,
                                    def: {
                                        check: `custom`
                                    },
                                    onattach: []
                                }
                            };
                        }
                        return check;
                    })
                ]
            }), {
                parent: true
            });
        },
        with (...e) {
            return this.check(...e);
        },
        clone (e, t) {
            return y(this, e, t);
        },
        brand () {
            return this;
        },
        register (e, t) {
            e.add(this, t);
            return this;
        },
        refine (e, t) {
            return this.check(to(e, t));
        },
        superRefine (e, t) {
            return this.check(no(e, t));
        },
        overwrite (e) {
            return this.check(W(e));
        },
        optional () {
            return La(this);
        },
        exactOptional () {
            return za(this);
        },
        nullable () {
            return Va(this);
        },
        nullish () {
            return La(Va(this));
        },
        nonoptional (e) {
            return qa(this, e);
        },
        array () {
            return ga(this);
        },
        or (e) {
            return xa([
                this,
                e
            ]);
        },
        and (e) {
            return Ta(this, e);
        },
        transform (e) {
            return Za(this, Fa(e));
        },
        default (e) {
            return Ua(this, e);
        },
        prefault (e) {
            return Ga(this, e);
        },
        catch (e) {
            return Ya(this, e);
        },
        pipe (e) {
            return Za(this, e);
        },
        readonly () {
            return $a(this);
        },
        describe (description) {
            let t = this.clone();
            globalThis___zod_globalRegistry.add(t, {
                description
            });
            return t;
        },
        meta (...e) {
            if (e.length === 0) {
                return globalThis___zod_globalRegistry.get(this);
            }
            let t = this.clone();
            globalThis___zod_globalRegistry.add(t, e[0]);
            return t;
        },
        isOptional () {
            return this.safeParse(undefined).success;
        },
        isNullable () {
            return this.safeParse(null).success;
        },
        apply (e) {
            return e(this);
        }
    });
    Object.defineProperty(e, "description", {
        get () {
            return globalThis___zod_globalRegistry.get(e)?.description;
        },
        configurable: true
    });
    return e;
});
const Ii = t(`_ZodString`, (e, t)=>{
    N.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>Kr(e, t, n, r);
    let bag = e._zod.bag;
    e.format = bag.format ?? null;
    e.minLength = bag.minimum ?? null;
    e.maxLength = bag.maximum ?? null;
    Y(e, `_ZodString`, {
        regex (...e) {
            return this.check(Er(...e));
        },
        includes (...e) {
            return this.check(kr(...e));
        },
        startsWith (...e) {
            return this.check(Ar(...e));
        },
        endsWith (...e) {
            return this.check(jr(...e));
        },
        min (...e) {
            return this.check(U(...e));
        },
        max (...e) {
            return this.check(wr(...e));
        },
        length (...e) {
            return this.check(Tr(...e));
        },
        nonempty (...e) {
            return this.check(U(1, ...e));
        },
        lowercase (e) {
            return this.check(Dr(e));
        },
        uppercase (e) {
            return this.check(Or(e));
        },
        trim () {
            return this.check(Nr());
        },
        normalize (...e) {
            return this.check(Mr(...e));
        },
        toLowerCase () {
            return this.check(Pr());
        },
        toUpperCase () {
            return this.check(Fr());
        },
        slugify () {
            return this.check(Ir());
        }
    });
});
const Li = t(`ZodString`, (e, t)=>{
    N.init(e, t);
    Ii.init(e, t);
    e.email = (t)=>e.check(Wn(zi, t));
    e.url = (t)=>e.check(Xn(Hi, t));
    e.jwt = (t)=>e.check(dr(ra, t));
    e.emoji = (t)=>e.check(Zn(Ui, t));
    e.guid = (t)=>e.check(Gn(Vi, t));
    e.uuid = (t)=>e.check(Kn(Q, t));
    e.uuidv4 = (t)=>e.check(qn(Q, t));
    e.uuidv6 = (t)=>e.check(Jn(Q, t));
    e.uuidv7 = (t)=>e.check(Yn(Q, t));
    e.nanoid = (t)=>e.check(Qn(Wi, t));
    e.guid = (t)=>e.check(Gn(Vi, t));
    e.cuid = (t)=>e.check($n(Gi, t));
    e.cuid2 = (t)=>e.check(er(Ki, t));
    e.ulid = (t)=>e.check(tr(qi, t));
    e.base64 = (t)=>e.check(cr(ea, t));
    e.base64url = (t)=>e.check(lr(ta, t));
    e.xid = (t)=>e.check(nr(Ji, t));
    e.ksuid = (t)=>e.check(rr(Yi, t));
    e.ipv4 = (t)=>e.check(ir(Xi, t));
    e.ipv6 = (t)=>e.check(ar(Zi, t));
    e.cidrv4 = (t)=>e.check(or(Qi, t));
    e.cidrv6 = (t)=>e.check(sr($i, t));
    e.e164 = (t)=>e.check(ur(na, t));
    e.datetime = (t)=>e.check(gi(t));
    e.date = (t)=>e.check(vi(t));
    e.time = (t)=>e.check(bi(t));
    e.duration = (t)=>e.check(Si(t));
});
function Ri(e) {
    return Un(Li, e);
}
var Z = t(`ZodStringFormat`, (e, t)=>{
    P.init(e, t);
    Ii.init(e, t);
});
var zi = t(`ZodEmail`, (e, t)=>{
    kt.init(e, t);
    Z.init(e, t);
});
function Bi(e) {
    return Wn(zi, e);
}
var Vi = t(`ZodGUID`, (e, t)=>{
    Dt.init(e, t);
    Z.init(e, t);
});
var Q = t(`ZodUUID`, (e, t)=>{
    Ot.init(e, t);
    Z.init(e, t);
});
var Hi = t(`ZodURL`, (e, t)=>{
    At.init(e, t);
    Z.init(e, t);
});
var Ui = t(`ZodEmoji`, (e, t)=>{
    jt.init(e, t);
    Z.init(e, t);
});
var Wi = t(`ZodNanoID`, (e, t)=>{
    Mt.init(e, t);
    Z.init(e, t);
});
var Gi = t(`ZodCUID`, (e, t)=>{
    Nt.init(e, t);
    Z.init(e, t);
});
var Ki = t(`ZodCUID2`, (e, t)=>{
    Pt.init(e, t);
    Z.init(e, t);
});
var qi = t(`ZodULID`, (e, t)=>{
    Ft.init(e, t);
    Z.init(e, t);
});
var Ji = t(`ZodXID`, (e, t)=>{
    It.init(e, t);
    Z.init(e, t);
});
var Yi = t(`ZodKSUID`, (e, t)=>{
    Lt.init(e, t);
    Z.init(e, t);
});
var Xi = t(`ZodIPv4`, (e, t)=>{
    Ht.init(e, t);
    Z.init(e, t);
});
var Zi = t(`ZodIPv6`, (e, t)=>{
    Ut.init(e, t);
    Z.init(e, t);
});
var Qi = t(`ZodCIDRv4`, (e, t)=>{
    Wt.init(e, t);
    Z.init(e, t);
});
var $i = t(`ZodCIDRv6`, (e, t)=>{
    Gt.init(e, t);
    Z.init(e, t);
});
var ea = t(`ZodBase64`, (e, t)=>{
    qt.init(e, t);
    Z.init(e, t);
});
var ta = t(`ZodBase64URL`, (e, t)=>{
    Yt.init(e, t);
    Z.init(e, t);
});
var na = t(`ZodE164`, (e, t)=>{
    Xt.init(e, t);
    Z.init(e, t);
});
var ra = t(`ZodJWT`, (e, t)=>{
    Qt.init(e, t);
    Z.init(e, t);
});
const ia = t(`ZodNumber`, (e, t)=>{
    $t.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>qr(e, t, n, r);
    Y(e, `ZodNumber`, {
        gt (e, t) {
            return this.check(V(e, t));
        },
        gte (e, t) {
            return this.check(H(e, t));
        },
        min (e, t) {
            return this.check(H(e, t));
        },
        lt (e, t) {
            return this.check(z(e, t));
        },
        lte (e, t) {
            return this.check(B(e, t));
        },
        max (e, t) {
            return this.check(B(e, t));
        },
        int (e) {
            return this.check(sa(e));
        },
        safe (e) {
            return this.check(sa(e));
        },
        positive (e) {
            return this.check(V(0, e));
        },
        nonnegative (e) {
            return this.check(H(0, e));
        },
        negative (e) {
            return this.check(z(0, e));
        },
        nonpositive (e) {
            return this.check(B(0, e));
        },
        multipleOf (e, t) {
            return this.check(Cr(e, t));
        },
        step (e, t) {
            return this.check(Cr(e, t));
        },
        finite () {
            return this;
        }
    });
    let bag = e._zod.bag;
    e.minValue = Math.max(bag.minimum ?? -Infinity, bag.exclusiveMinimum ?? -Infinity) ?? null;
    e.maxValue = Math.min(bag.maximum ?? Infinity, bag.exclusiveMaximum ?? Infinity) ?? null;
    e.isInt = (bag.format ?? ``).includes(`int`) || Number.isSafeInteger(bag.multipleOf ?? 0.5);
    e.isFinite = true;
    e.format = bag.format ?? null;
});
function aa(e) {
    return gr(ia, e);
}
var oa = t(`ZodNumberFormat`, (e, t)=>{
    en.init(e, t);
    ia.init(e, t);
});
function sa(e) {
    return vr(oa, e);
}
const ca = t(`ZodBoolean`, (e, t)=>{
    tn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>Jr(e, t, n, r);
});
function la(e) {
    return yr(ca, e);
}
const ua = t(`ZodBigInt`, (e, t)=>{
    nn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>Yr(e, t, n, r);
    e.gte = (t, n)=>e.check(H(t, n));
    e.min = (t, n)=>e.check(H(t, n));
    e.gt = (t, n)=>e.check(V(t, n));
    e.gte = (t, n)=>e.check(H(t, n));
    e.min = (t, n)=>e.check(H(t, n));
    e.lt = (t, n)=>e.check(z(t, n));
    e.lte = (t, n)=>e.check(B(t, n));
    e.max = (t, n)=>e.check(B(t, n));
    e.positive = (t)=>e.check(V(BigInt(0), t));
    e.negative = (t)=>e.check(z(BigInt(0), t));
    e.nonpositive = (t)=>e.check(B(BigInt(0), t));
    e.nonnegative = (t)=>e.check(H(BigInt(0), t));
    e.multipleOf = (t, n)=>e.check(Cr(t, n));
    let bag = e._zod.bag;
    e.minValue = bag.minimum ?? null;
    e.maxValue = bag.maximum ?? null;
    e.format = bag.format ?? null;
});
function da(e) {
    return br(ua, e);
}
const fa = t(`ZodUnknown`, (e, t)=>{
    rn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (e, t, n)=>undefined;
});
function $() {
    return xr(fa);
}
const pa = t(`ZodNever`, (e, t)=>{
    an.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>Xr(e, t, n, r);
});
function ma(e) {
    return Sr(pa, e);
}
var ha = t(`ZodArray`, (e, t)=>{
    sn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>ti(e, t, n, r);
    e.element = t.element;
    Y(e, `ZodArray`, {
        min (e, t) {
            return this.check(U(e, t));
        },
        nonempty (e) {
            return this.check(U(1, e));
        },
        max (e, t) {
            return this.check(wr(e, t));
        },
        length (e, t) {
            return this.check(Tr(e, t));
        },
        unwrap () {
            return this.element;
        }
    });
});
function ga(e, t) {
    return Lr(ha, e, t);
}
const _a = t(`ZodObject`, (e, t)=>{
    dn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>ni(e, t, n, r);
    p(e, `shape`, ()=>t.shape);
    Y(e, `ZodObject`, {
        keyof () {
            return ja(Object.keys(this._zod.def.shape));
        },
        catchall (catchall) {
            return this.clone({
                ...this._zod.def,
                catchall
            });
        },
        passthrough () {
            return this.clone({
                ...this._zod.def,
                catchall: $()
            });
        },
        loose () {
            return this.clone({
                ...this._zod.def,
                catchall: $()
            });
        },
        strict () {
            return this.clone({
                ...this._zod.def,
                catchall: ma()
            });
        },
        strip () {
            return this.clone({
                ...this._zod.def,
                catchall: undefined
            });
        },
        extend (e) {
            return ue(this, e);
        },
        safeExtend (e) {
            return de(this, e);
        },
        merge (e) {
            return fe(this, e);
        },
        pick (e) {
            return ce(this, e);
        },
        omit (e) {
            return le(this, e);
        },
        partial (...e) {
            return pe(Ia, this, e[0]);
        },
        required (...e) {
            return me(Ka, this, e[0]);
        }
    });
});
function va(e, t) {
    return new _a({
        type: `object`,
        shape: e ?? {},
        ...b(t)
    });
}
function ya(shape, t) {
    return new _a({
        type: `object`,
        shape,
        catchall: $(),
        ...b(t)
    });
}
var ba = t(`ZodUnion`, (e, t)=>{
    pn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>ri(e, t, n, r);
    e.options = t.options;
});
function xa(e, t) {
    return new ba({
        type: `union`,
        options: e,
        ...b(t)
    });
}
const Sa = t(`ZodDiscriminatedUnion`, (e, t)=>{
    ba.init(e, t);
    mn.init(e, t);
});
function Ca(discriminator, t, n) {
    return new Sa({
        type: `union`,
        options: t,
        discriminator,
        ...b(n)
    });
}
var wa = t(`ZodIntersection`, (e, t)=>{
    hn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>ii(e, t, n, r);
});
function Ta(left, right) {
    return new wa({
        type: `intersection`,
        left,
        right
    });
}
const Ea = t(`ZodTuple`, (e, t)=>{
    _n.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>ai(e, t, n, r);
    e.rest = (rest)=>e.clone({
            ...e._zod.def,
            rest
        });
});
function Da(items, t, n) {
    let r = t instanceof M;
    return new Ea({
        type: `tuple`,
        items,
        rest: r ? t : null,
        ...b(r ? n : t)
    });
}
const Oa = t(`ZodRecord`, (e, t)=>{
    xn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>oi(e, t, n, r);
    e.keyType = t.keyType;
    e.valueType = t.valueType;
});
function ka(e, valueType, n) {
    if (!valueType || !valueType._zod) {
        return new Oa({
            type: `record`,
            keyType: Ri(),
            valueType: e,
            ...b(valueType)
        });
    }
    return new Oa({
        type: `record`,
        keyType: e,
        valueType,
        ...b(n)
    });
}
var Aa = t(`ZodEnum`, (e, t)=>{
    Sn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>Zr(e, t, n, r);
    e.enum = t.entries;
    e.options = Object.values(t.entries);
    let n = new Set(Object.keys(t.entries));
    e.extract = (e, r)=>{
        let i = {};
        for (let r of e){
            if (n.has(r)) {
                i[r] = t.entries[r];
            } else {
                throw Error(`Key ${r} not found in enum`);
            }
        }
        return new Aa({
            ...t,
            checks: [],
            ...b(r),
            entries: i
        });
    };
    e.exclude = (e, r)=>{
        let i = {
            ...t.entries
        };
        for (let t of e){
            if (n.has(t)) {
                delete i[t];
            } else {
                throw Error(`Key ${t} not found in enum`);
            }
        }
        return new Aa({
            ...t,
            checks: [],
            ...b(r),
            entries: i
        });
    };
});
function ja(e, t) {
    return new Aa({
        type: `enum`,
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...b(t)
    });
}
const Ma = t(`ZodLiteral`, (e, t)=>{
    Cn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>Qr(e, t, n, r);
    e.values = new Set(t.values);
    Object.defineProperty(e, "value", {
        get () {
            if (t.values.length > 1) {
                throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
            }
            return t.values[0];
        }
    });
});
function Na(e, t) {
    return new Ma({
        type: `literal`,
        values: Array.isArray(e) ? e : [
            e
        ],
        ...b(t)
    });
}
var Pa = t(`ZodTransform`, (e, t)=>{
    wn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>ei(e, t, n, r);
    e._zod.parse = (n, i)=>{
        if (i.direction === `backward`) {
            throw new r(e.constructor.name);
        }
        n.addIssue = (r)=>{
            if (typeof r == `string`) {
                n.issues.push(E(r, n.value, t));
            } else {
                let t = r;
                if (t.fatal) {
                    t.continue = false;
                }
                t.code ??= `custom`;
                t.input ??= n.value;
                t.inst ??= e;
                n.issues.push(E(t));
            }
        };
        let a = t.transform(n.value, n);
        if (a instanceof Promise) {
            return a.then((e)=>{
                n.value = e;
                n.fallback = true;
                return n;
            });
        }
        n.value = a;
        n.fallback = true;
        return n;
    };
});
function Fa(transform) {
    return new Pa({
        type: `transform`,
        transform
    });
}
var Ia = t(`ZodOptional`, (e, t)=>{
    En.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>mi(e, t, n, r);
    e.unwrap = ()=>e._zod.def.innerType;
});
function La(e) {
    return new Ia({
        type: `optional`,
        innerType: e
    });
}
var Ra = t(`ZodExactOptional`, (e, t)=>{
    Dn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>mi(e, t, n, r);
    e.unwrap = ()=>e._zod.def.innerType;
});
function za(e) {
    return new Ra({
        type: `optional`,
        innerType: e
    });
}
var Ba = t(`ZodNullable`, (e, t)=>{
    On.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>si(e, t, n, r);
    e.unwrap = ()=>e._zod.def.innerType;
});
function Va(e) {
    return new Ba({
        type: `nullable`,
        innerType: e
    });
}
var Ha = t(`ZodDefault`, (e, t)=>{
    kn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>li(e, t, n, r);
    e.unwrap = ()=>e._zod.def.innerType;
    e.removeDefault = e.unwrap;
});
function Ua(e, t) {
    return new Ha({
        type: `default`,
        innerType: e,
        get defaultValue () {
            if (typeof t == `function`) {
                return t();
            }
            return ie(t);
        }
    });
}
var Wa = t(`ZodPrefault`, (e, t)=>{
    jn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>ui(e, t, n, r);
    e.unwrap = ()=>e._zod.def.innerType;
});
function Ga(e, t) {
    return new Wa({
        type: `prefault`,
        innerType: e,
        get defaultValue () {
            if (typeof t == `function`) {
                return t();
            }
            return ie(t);
        }
    });
}
var Ka = t(`ZodNonOptional`, (e, t)=>{
    Mn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>ci(e, t, n, r);
    e.unwrap = ()=>e._zod.def.innerType;
});
function qa(e, t) {
    return new Ka({
        type: `nonoptional`,
        innerType: e,
        ...b(t)
    });
}
var Ja = t(`ZodCatch`, (e, t)=>{
    Pn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>di(e, t, n, r);
    e.unwrap = ()=>e._zod.def.innerType;
    e.removeCatch = e.unwrap;
});
function Ya(e, t) {
    return new Ja({
        type: `catch`,
        innerType: e,
        catchValue: typeof t == `function` ? t : ()=>t
    });
}
var Xa = t(`ZodPipe`, (e, t)=>{
    Fn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>fi(e, t, n, r);
    e.in = t.in;
    e.out = t.out;
});
function Za(e, out) {
    return new Xa({
        type: `pipe`,
        in: e,
        out
    });
}
var Qa = t(`ZodReadonly`, (e, t)=>{
    In.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>pi(e, t, n, r);
    e.unwrap = ()=>e._zod.def.innerType;
});
function $a(e) {
    return new Qa({
        type: `readonly`,
        innerType: e
    });
}
var eo = t(`ZodCustom`, (e, t)=>{
    Rn.init(e, t);
    X.init(e, t);
    e._zod.processJSONSchema = (t, n, r)=>$r(e, t, n, r);
});
function to(e, t = {}) {
    return Rr(eo, e, t);
}
function no(e, t) {
    return zr(e, t);
}
export { _r as _, la as a, Na as c, va as d, ka as f, $ as g, xa as h, da as i, ya as l, Da as m, ja as n, Ca as o, Ri as p, ga as r, Bi as s, ia as t, aa as u };
