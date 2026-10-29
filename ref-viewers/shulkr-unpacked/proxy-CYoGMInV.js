import { c, d, l, o, s, u } from "./proxy-CYoGMInV/chunk_o.js";
import { ht } from "./proxy-CYoGMInV/chunk_mt.js";
import { Rt } from "./proxy-CYoGMInV/chunk_Lt.js";
import { rn } from "./proxy-CYoGMInV/chunk_nn.js";
import { pr } from "./proxy-CYoGMInV/chunk_fr.js";
import { br, xr } from "./proxy-CYoGMInV/chunk_br.js";
import { Cr } from "./proxy-CYoGMInV/chunk_Sr.js";
import { Er, G } from "./proxy-CYoGMInV/chunk_Tr.js";
import { Br, Vr, zr } from "./proxy-CYoGMInV/chunk_zr.js";
import { Ci, Si, Ti } from "./proxy-CYoGMInV/chunk_Si.js";
import { Di } from "./proxy-CYoGMInV/chunk_Ei.js";
import { da, pa, ua } from "./proxy-CYoGMInV/chunk_ua.js";
import { wa } from "./proxy-CYoGMInV/chunk_Ca.js";
import { Ea } from "./proxy-CYoGMInV/chunk_Ea.js";
import { Aa, Oa, ja } from "./proxy-CYoGMInV/chunk_Oa.js";
import { yo } from "./proxy-CYoGMInV/chunk_vo.js";
import { Z, bo } from "./proxy-CYoGMInV/chunk_bo.js";
import { Bo } from "./proxy-CYoGMInV/chunk_zo.js";
import { Ho } from "./proxy-CYoGMInV/chunk_Vo_2.js";
import { Wo } from "./proxy-CYoGMInV/chunk_Uo.js";
import { Ys } from "./proxy-CYoGMInV/chunk_Js.js";
import { jc } from "./proxy-CYoGMInV/chunk_Ac.js";
import { al, rl } from "./proxy-CYoGMInV/chunk_rl.js";
import { gl } from "./proxy-CYoGMInV/chunk_hl.js";
import { vl } from "./proxy-CYoGMInV/chunk__l.js";
import { Cl } from "./proxy-CYoGMInV/chunk_Cl.js";
import { a, i, n, o as o_1, s as s_1, t } from "./jsx-runtime-Db0DjQYK.js";
function f(e, t) {
    if (e.indexOf(t) === -1) {
        e.push(t);
    }
}
function p(e, t) {
    let n = e.indexOf(t);
    if (n > -1) {
        e.splice(n, 1);
    }
}
const m = (e, t, n)=>{
    if (n > t) {
        return t;
    }
    if (n < e) {
        return e;
    }
    return n;
};
const h = {};
const g = (e)=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function _(e) {
    return typeof e == `object` && !!e;
}
const v = (e)=>/^0[^.\s]+$/u.test(e);
function y(e) {
    let t;
    return ()=>{
        if (t === undefined) {
            t = e();
        }
        return t;
    };
}
const linear = (e)=>e;
const x = (e, t)=>(n)=>t(e(n));
const S = (...e)=>e.reduce(x);
const C = (e, t, n)=>{
    let r = t - e;
    if (r === 0) {
        return 1;
    }
    return (n - e) / r;
};
class w {
    constructor(){
        this.subscriptions = [];
    }
    add(e) {
        f(this.subscriptions, e);
        return ()=>p(this.subscriptions, e);
    }
    notify(e, t, n) {
        let length = this.subscriptions.length;
        if (length) {
            if (length === 1) {
                this.subscriptions[0](e, t, n);
            } else {
                for(let i = 0; i < length; i++){
                    let r = this.subscriptions[i];
                    if (r) {
                        r(e, t, n);
                    }
                }
            }
        }
    }
    getSize() {
        return this.subscriptions.length;
    }
    clear() {
        this.subscriptions.length = 0;
    }
}
const T = (e)=>e * 1000;
const E = (e)=>e / 1000;
function D(e, t) {
    if (t) {
        return 1000 / t * e;
    }
    return 0;
}
const ee = (e, t, n)=>(((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e;
const te = 1e-7;
const ne = 12;
function re(e, t, n, r, i) {
    let a;
    let o;
    let s = 0;
    do {
        o = t + (n - t) / 2;
        a = ee(o, r, i) - e;
        if (a > 0) {
            n = o;
        } else {
            t = o;
        }
    }while (Math.abs(a) > te && ++s < ne)
    return o;
}
function ie(e, t, n, r) {
    if (e === t && n === r) {
        return linear;
    }
    let i = (t)=>re(t, 0, 1, e, n);
    return (e)=>{
        if (e === 0 || e === 1) {
            return e;
        }
        return ee(i(e), t, r);
    };
}
const ae = (e)=>(t)=>{
        if (t <= 0.5) {
            return e(2 * t) / 2;
        }
        return (2 - e(2 * (1 - t))) / 2;
    };
const oe = (e)=>(t)=>1 - e(1 - t);
const backOut = ie(0.33, 1.53, 0.69, 0.99);
const backIn = oe(backOut);
const backInOut = ae(backIn);
const anticipate = (e)=>{
    if (e >= 1) {
        return 1;
    }
    if ((e *= 2) < 1) {
        return 0.5 * backIn(e);
    }
    return 0.5 * (2 - 2 ** (-10 * (e - 1)));
};
const circIn = (e)=>1 - Math.sin(Math.acos(e));
const circOut = oe(circIn);
const circInOut = ae(circIn);
const easeIn = ie(0.42, 0, 1, 1);
const easeOut = ie(0, 0, 0.58, 1);
const easeInOut = ie(0.42, 0, 0.58, 1);
const _e = (ease)=>Array.isArray(ease) && typeof ease[0] != `number`;
const ve = (e)=>Array.isArray(e) && typeof e[0] == `number`;
const ye = {
    linear,
    easeIn,
    easeInOut,
    easeOut,
    circIn,
    circInOut,
    circOut,
    backIn,
    backInOut,
    backOut,
    anticipate
};
const be = (e)=>typeof e == `string`;
const xe = (e)=>{
    if (ve(e)) {
        e.length;
        let [t, n, r, i] = e;
        return ie(t, n, r, i);
    } else if (be(e)) {
        ye[e];
        `${e}`;
        return ye[e];
    }
    return e;
};
const Se = [
    `setup`,
    `read`,
    `resolveKeyframes`,
    `preUpdate`,
    `update`,
    `preRender`,
    `render`,
    `postRender`
];
const O = {
    value: null,
    addProjectionMetrics: null
};
function Ce(e, t) {
    let n = new Set;
    let r = new Set;
    let i = false;
    let a = false;
    let o = new WeakSet;
    let s = {
        delta: 0,
        timestamp: 0,
        isProcessing: false
    };
    let c = 0;
    function l(t) {
        if (o.has(t)) {
            u.schedule(t);
            e();
        }
        c++;
        t(s);
    }
    let u = {
        schedule: (e, t = false, a = false)=>{
            let s = a && i ? n : r;
            if (t) {
                o.add(e);
            }
            s.add(e);
            return e;
        },
        cancel: (e)=>{
            r.delete(e);
            o.delete(e);
        },
        process: (e)=>{
            s = e;
            if (i) {
                a = true;
                return;
            }
            i = true;
            let o = n;
            n = r;
            r = o;
            n.forEach(l);
            if (t && O.value) {
                O.value.frameloop[t].push(c);
            }
            c = 0;
            n.clear();
            i = false;
            if (a) {
                a = false;
                u.process(e);
            }
        }
    };
    return u;
}
const we = 40;
function Te(e, t) {
    let n = false;
    let r = true;
    let state_1 = {
        delta: 0,
        timestamp: 0,
        isProcessing: false
    };
    let a = ()=>n = true;
    let steps_1 = Se.reduce((acc, item)=>{
        acc[item] = Ce(a, t ? item : undefined);
        return acc;
    }, {});
    let { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender } = steps_1;
    let g = ()=>{
        let h_useManualTiming = h.useManualTiming;
        let o = h_useManualTiming ? state_1.timestamp : performance.now();
        n = false;
        if (!h_useManualTiming) {
            state_1.delta = r ? 1000 / 60 : Math.max(Math.min(o - state_1.timestamp, we), 1);
        }
        state_1.timestamp = o;
        state_1.isProcessing = true;
        setup.process(state_1);
        read.process(state_1);
        resolveKeyframes.process(state_1);
        preUpdate.process(state_1);
        update.process(state_1);
        preRender.process(state_1);
        render.process(state_1);
        postRender.process(state_1);
        state_1.isProcessing = false;
        if (n && t) {
            r = false;
            e(g);
        }
    };
    let _ = ()=>{
        n = true;
        r = true;
        if (!state_1.isProcessing) {
            e(g);
        }
    };
    return {
        schedule: Se.reduce((acc, item)=>{
            let r = steps_1[item];
            acc[item] = (e, t = false, i = false)=>{
                if (!n) {
                    _();
                }
                return r.schedule(e, t, i);
            };
            return acc;
        }, {}),
        cancel: (e)=>{
            for(let t = 0; t < Se.length; t++){
                steps_1[Se[t]].cancel(e);
            }
        },
        state: state_1,
        steps: steps_1
    };
}
const { schedule, cancel, state, steps } = Te(typeof requestAnimationFrame < `u` ? requestAnimationFrame : linear, true);
let De;
function Oe() {
    De = undefined;
}
var M = {
    now: ()=>{
        if (De === undefined) {
            M.set(state.isProcessing || h.useManualTiming ? state.timestamp : performance.now());
        }
        return De;
    },
    set: (e)=>{
        De = e;
        queueMicrotask(Oe);
    }
};
const N = {
    layout: 0,
    mainThread: 0,
    waapi: 0
};
const ke = (e)=>(t)=>typeof t == `string` && t.startsWith(e);
const Ae = ke(`--`);
const je = ke(`var(--`);
const Me = (e)=>{
    if (je(e)) {
        return Ne.test(e.split(`/*`)[0].trim());
    }
    return false;
};
var Ne = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Pe(e) {
    if (typeof e == `string`) {
        return e.split(`/*`)[0].includes(`var(--`);
    }
    return false;
}
const Fe = {
    test: (e)=>typeof e == `number`,
    parse: parseFloat,
    transform: (e)=>e
};
const Ie = {
    ...Fe,
    transform: (e)=>m(0, 1, e)
};
const Le = {
    ...Fe,
    default: 1
};
const Re = (e)=>Math.round(e * 100000) / 100000;
const ze = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Be(e) {
    return e == null;
}
const Ve = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
const He = (e, t)=>(n)=>!!(typeof n == `string` && Ve.test(n) && n.startsWith(e) || t && !Be(n) && Object.prototype.hasOwnProperty.call(n, t));
const Ue = (e, t, n)=>(r)=>{
        if (typeof r != `string`) {
            return r;
        }
        let [i, a, o, s] = r.match(ze);
        return {
            [e]: parseFloat(i),
            [t]: parseFloat(a),
            [n]: parseFloat(o),
            alpha: s === undefined ? 1 : parseFloat(s)
        };
    };
const We = (e)=>m(0, 255, e);
const Ge = {
    ...Fe,
    transform: (e)=>Math.round(We(e))
};
const P = {
    test: He(`rgb`, `red`),
    parse: Ue(`red`, `green`, `blue`),
    transform: ({ red, green, blue, alpha = 1 })=>`rgba(` + Ge.transform(red) + `, ` + Ge.transform(green) + `, ` + Ge.transform(blue) + `, ` + Re(Ie.transform(alpha)) + `)`
};
function Ke(e) {
    let t = ``;
    let n = ``;
    let r = ``;
    let i = ``;
    if (e.length > 5) {
        t = e.substring(1, 3);
        n = e.substring(3, 5);
        r = e.substring(5, 7);
        i = e.substring(7, 9);
    } else {
        t = e.substring(1, 2);
        n = e.substring(2, 3);
        r = e.substring(3, 4);
        i = e.substring(4, 5);
        t += t;
        n += n;
        r += r;
        i += i;
    }
    return {
        red: parseInt(t, 16),
        green: parseInt(n, 16),
        blue: parseInt(r, 16),
        alpha: i ? parseInt(i, 16) / 255 : 1
    };
}
const qe = {
    test: He(`#`),
    parse: Ke,
    transform: P.transform
};
const Je = (e)=>({
        test: (t)=>typeof t == `string` && t.endsWith(e) && t.split(` `).length === 1,
        parse: parseFloat,
        transform: (t)=>`${t}${e}`
    });
const F = Je(`deg`);
const I = Je(`%`);
const L = Je(`px`);
const Ye = Je(`vh`);
const Xe = Je(`vw`);
const Ze = {
    ...I,
    parse: (e)=>I.parse(e) / 100,
    transform: (e)=>I.transform(e * 100)
};
const Qe = {
    test: He(`hsl`, `hue`),
    parse: Ue(`hue`, `saturation`, `lightness`),
    transform: ({ hue, saturation, lightness, alpha = 1 })=>`hsla(` + Math.round(hue) + `, ` + I.transform(Re(saturation)) + `, ` + I.transform(Re(lightness)) + `, ` + Re(Ie.transform(alpha)) + `)`
};
var R = {
    test: (e)=>P.test(e) || qe.test(e) || Qe.test(e),
    parse: (e)=>{
        if (P.test(e)) {
            return P.parse(e);
        }
        if (Qe.test(e)) {
            return Qe.parse(e);
        }
        return qe.parse(e);
    },
    transform: (e)=>{
        if (typeof e == `string`) {
            return e;
        }
        if (e.hasOwnProperty(`red`)) {
            return P.transform(e);
        }
        return Qe.transform(e);
    },
    getAnimatableNone: (e)=>{
        let t = R.parse(e);
        t.alpha = 0;
        return R.transform(t);
    }
};
const $e = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function test(e) {
    return isNaN(e) && typeof e == `string` && (e.match(ze)?.length || 0) + (e.match($e)?.length || 0) > 0;
}
const tt = `number`;
const nt = `color`;
const rt = `var`;
const it = `var(`;
const at = "${}";
const ot = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function st(e) {
    let t = e.toString();
    let values = [];
    let indexes = {
        color: [],
        number: [],
        var: []
    };
    let types = [];
    let a = 0;
    return {
        values,
        split: t.replace(ot, (e)=>{
            if (R.test(e)) {
                indexes.color.push(a);
                types.push(nt);
                values.push(R.parse(e));
            } else if (e.startsWith(it)) {
                indexes.var.push(a);
                types.push(rt);
                values.push(e);
            } else {
                indexes.number.push(a);
                types.push(tt);
                values.push(parseFloat(e));
            }
            ++a;
            return at;
        }).split(at),
        indexes,
        types
    };
}
function ct(e) {
    return st(e).values;
}
function lt({ split, types }) {
    let split_length = split.length;
    return (r)=>{
        let i = ``;
        for(let a = 0; a < split_length; a++){
            i += split[a];
            if (r[a] !== undefined) {
                let e = types[a];
                if (e === tt) {
                    i += Re(r[a]);
                } else if (e === nt) {
                    i += R.transform(r[a]);
                } else {
                    i += r[a];
                }
            }
        }
        return i;
    };
}
function createTransformer(e) {
    return lt(st(e));
}
const dt = (e)=>{
    if (typeof e == `number`) {
        return 0;
    }
    if (R.test(e)) {
        return R.getAnimatableNone(e);
    }
    return e;
};
const ft = (e, t)=>{
    if (typeof e == `number`) {
        if (t?.trim().endsWith(`/`)) {
            return e;
        }
        return 0;
    }
    return dt(e);
};
function getAnimatableNone(e) {
    let t = st(e);
    return lt(t)(t.values.map((e, n)=>ft(e, t.split[n])));
}
const z = {
    test,
    parse: ct,
    createTransformer,
    getAnimatableNone
};
function gt(e, t) {
    return (n)=>{
        if (n > 0) {
            return t;
        }
        return e;
    };
}
const B = (e, t, n)=>e + (t - e) * n;
const _t = (e, t, n)=>{
    let r = e * e;
    let i = n * (t * t - r) + r;
    if (i < 0) {
        return 0;
    }
    return Math.sqrt(i);
};
const vt = [
    qe,
    P,
    Qe
];
const yt = (e)=>vt.find((t)=>t.test(e));
function bt(e) {
    let t = yt(e);
    `${e}`;
    if (!t) {
        return false;
    }
    let n = t.parse(e);
    if (t === Qe) {
        n = ht(n);
    }
    return n;
}
const xt = (e, t)=>{
    let n = bt(e);
    let r = bt(t);
    if (!n || !r) {
        return gt(e, t);
    }
    let i = {
        ...n
    };
    return (e)=>{
        i.red = _t(n.red, r.red, e);
        i.green = _t(n.green, r.green, e);
        i.blue = _t(n.blue, r.blue, e);
        i.alpha = B(n.alpha, r.alpha, e);
        return P.transform(i);
    };
};
const St = new Set([
    `none`,
    `hidden`
]);
function Ct(e, t) {
    if (St.has(e)) {
        return (n)=>{
            if (n <= 0) {
                return e;
            }
            return t;
        };
    }
    return (n)=>{
        if (n >= 1) {
            return t;
        }
        return e;
    };
}
function wt(e, t) {
    return (n)=>B(e, t, n);
}
function Tt(e) {
    if (typeof e == `number`) {
        return wt;
    }
    if (typeof e == `string`) {
        if (Me(e)) {
            return gt;
        }
        if (R.test(e)) {
            return xt;
        }
        return kt;
    }
    if (Array.isArray(e)) {
        return Et;
    }
    if (typeof e == `object`) {
        if (R.test(e)) {
            return xt;
        }
        return Dt;
    }
    return gt;
}
function Et(e, t) {
    let n = [
        ...e
    ];
    let n_length = n.length;
    let i = e.map((e, n)=>Tt(e)(e, t[n]));
    return (e)=>{
        for(let t = 0; t < n_length; t++){
            n[t] = i[t](e);
        }
        return n;
    };
}
function Dt(e, t) {
    let n = {
        ...e,
        ...t
    };
    let r = {};
    for(let i in n){
        if (e[i] !== undefined && t[i] !== undefined) {
            r[i] = Tt(e[i])(e[i], t[i]);
        }
    }
    return (e)=>{
        for(let t in r){
            n[t] = r[t](e);
        }
        return n;
    };
}
function Ot(e, t) {
    let n = [];
    let r = {
        color: 0,
        var: 0,
        number: 0
    };
    for(let i = 0; i < t.values.length; i++){
        let a = t.types[i];
        let o = e.indexes[a][r[a]];
        n[i] = e.values[o] ?? 0;
        r[a]++;
    }
    return n;
}
var kt = (e, t)=>{
    let n = z.createTransformer(t);
    let r = st(e);
    let i = st(t);
    if (r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r.indexes.number.length >= i.indexes.number.length) {
        if (St.has(e) && !i.values.length || St.has(t) && !r.values.length) {
            return Ct(e, t);
        }
        return S(Et(Ot(r, i), i.values), n);
    }
    `${e}${t}`;
    return gt(e, t);
};
function At(e, t, n) {
    if (typeof e == `number` && typeof t == `number` && typeof n == `number`) {
        return B(e, t, n);
    }
    return Tt(e)(e, t);
}
const jt = (e)=>{
    let t = ({ timestamp })=>e(timestamp);
    return {
        start: (e = true)=>schedule.update(t, e),
        stop: ()=>cancel(t),
        now: ()=>{
            if (state.isProcessing) {
                return state.timestamp;
            }
            return M.now();
        }
    };
};
const Mt = (e, t, n = 10)=>{
    let r = ``;
    let i = Math.max(Math.round(t / n), 2);
    for(let t = 0; t < i; t++){
        r += Math.round(e(t / (i - 1)) * 10000) / 10000 + `, `;
    }
    return `linear(${r.substring(0, r.length - 2)})`;
};
const Nt = 20000;
function Pt(e) {
    let t = 0;
    let n = e.next(t);
    while(!n.done && t < 20000){
        t += 50;
        n = e.next(t);
    }
    if (t >= 20000) {
        return Infinity;
    }
    return t;
}
function Ft(e, t = 100, spring) {
    let r = spring({
        ...e,
        keyframes: [
            0,
            t
        ]
    });
    let i = Math.min(Pt(r), Nt);
    return {
        type: `keyframes`,
        ease: (e)=>r.next(i * e).value / t,
        duration: E(i)
    };
}
const V = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: {
        granular: 0.01,
        default: 2
    },
    restDelta: {
        granular: 0.005,
        default: 0.5
    },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1
};
function It(e, t) {
    return e * Math.sqrt(1 - t * t);
}
const zt = 0.001;
function Bt({ duration = V.duration, bounce = V.bounce, velocity = V.velocity, mass = V.mass }) {
    let i;
    let a;
    V.maxDuration;
    let o = 1 - bounce;
    o = m(V.minDamping, V.maxDamping, o);
    duration = m(V.minDuration, V.maxDuration, E(duration));
    if (o < 1) {
        i = (t)=>{
            let r = t * o;
            let i = r * duration;
            let a = r - velocity;
            let s = It(t, o);
            let c = Math.exp(-i);
            return zt - a / s * c;
        };
        a = (t)=>{
            let r = t * o * duration;
            let a = r * velocity + velocity;
            let s = o ** 2 * t ** 2 * duration;
            let c = Math.exp(-r);
            let l = It(t ** 2, o);
            return (-i(t) + zt > 0 ? -1 : 1) * ((a - s) * c) / l;
        };
    } else {
        i = (t)=>-0.001 + Math.exp(-t * duration) * ((t - velocity) * duration + 1);
        a = (t)=>Math.exp(-t * duration) * ((velocity - t) * (duration * duration));
    }
    let s = 5 / duration;
    let c = Rt(i, a, s);
    duration = T(duration);
    if (isNaN(c)) {
        return {
            stiffness: V.stiffness,
            damping: V.damping,
            duration
        };
    }
    {
        let t = c ** 2 * mass;
        return {
            stiffness: t,
            damping: o * 2 * Math.sqrt(mass * t),
            duration
        };
    }
}
const Vt = [
    `duration`,
    `bounce`
];
const Ht = [
    `stiffness`,
    `damping`,
    `mass`
];
function Ut(e, t) {
    return t.some((t)=>e[t] !== undefined);
}
function Wt(e) {
    let t = {
        velocity: V.velocity,
        stiffness: V.stiffness,
        damping: V.damping,
        mass: V.mass,
        isResolvedFromDuration: false,
        ...e
    };
    if (!Ut(e, Ht) && Ut(e, Vt)) {
        t.velocity = 0;
        if (e.visualDuration) {
            let n = e.visualDuration;
            let r = 2 * Math.PI / (n * 1.2);
            let i = r * r;
            let damping = 2 * m(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
            t = {
                ...t,
                mass: V.mass,
                stiffness: i,
                damping
            };
        } else {
            let n = Bt({
                ...e,
                velocity: 0
            });
            t = {
                ...t,
                ...n,
                mass: V.mass
            };
            t.isResolvedFromDuration = true;
        }
    }
    return t;
}
function spring(visualDuration = V.visualDuration, bounce = V.bounce) {
    let n = typeof visualDuration == `object` ? visualDuration : {
        visualDuration,
        keyframes: [
            0,
            1
        ],
        bounce
    };
    let { restSpeed, restDelta } = n;
    let a = n.keyframes[0];
    let o = n.keyframes[n.keyframes.length - 1];
    let s = {
        done: false,
        value: a
    };
    let { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = Wt({
        ...n,
        velocity: -E(n.velocity || 0)
    });
    let m = velocity || 0;
    let h = damping / (2 * Math.sqrt(stiffness * mass));
    let g = o - a;
    let _ = E(Math.sqrt(stiffness / mass));
    let v = Math.abs(g) < 5;
    restSpeed ||= v ? V.restSpeed.granular : V.restSpeed.default;
    restDelta ||= v ? V.restDelta.granular : V.restDelta.default;
    let y;
    let b;
    let x;
    let S;
    let C;
    let w;
    if (h < 1) {
        x = It(_, h);
        S = (m + h * _ * g) / x;
        y = (e)=>o - Math.exp(-h * _ * e) * (S * Math.sin(x * e) + g * Math.cos(x * e));
        C = h * _ * S + g * x;
        w = h * _ * g - S * x;
        b = (e)=>Math.exp(-h * _ * e) * (C * Math.sin(x * e) + w * Math.cos(x * e));
    } else if (h === 1) {
        y = (e)=>o - Math.exp(-_ * e) * (g + (m + _ * g) * e);
        let e = m + _ * g;
        b = (t)=>Math.exp(-_ * t) * (_ * e * t - m);
    } else {
        let e = _ * Math.sqrt(h * h - 1);
        y = (t)=>{
            let n = Math.exp(-h * _ * t);
            let r = Math.min(e * t, 300);
            return o - n * ((m + h * _ * g) * Math.sinh(r) + e * g * Math.cosh(r)) / e;
        };
        let t = (m + h * _ * g) / e;
        let n = h * _ * t - g * e;
        let r = h * _ * g - t * e;
        b = (t)=>{
            let i = Math.exp(-h * _ * t);
            let a = Math.min(e * t, 300);
            return i * (n * Math.sinh(a) + r * Math.cosh(a));
        };
    }
    let D = {
        calculatedDuration: isResolvedFromDuration && duration || null,
        velocity: (e)=>T(b(e)),
        next: (e)=>{
            if (!isResolvedFromDuration && h < 1) {
                let t = Math.exp(-h * _ * e);
                let n = Math.sin(x * e);
                let a = Math.cos(x * e);
                let c = o - t * (S * n + g * a);
                let l = T(t * (C * n + w * a));
                s.done = Math.abs(l) <= restSpeed && Math.abs(o - c) <= restDelta;
                s.value = s.done ? o : c;
                return s;
            }
            let t = y(e);
            if (isResolvedFromDuration) {
                s.done = e >= duration;
            } else {
                let n = T(b(e));
                s.done = Math.abs(n) <= restSpeed && Math.abs(o - t) <= restDelta;
            }
            s.value = s.done ? o : t;
            return s;
        },
        toString: ()=>{
            let e = Math.min(Pt(D), Nt);
            let t = Mt((t)=>D.next(e * t).value, e, 30);
            return e + `ms ` + t;
        },
        toTransition: ()=>{}
    };
    return D;
}
spring.applyToOptions = (e)=>{
    let t = Ft(e, 100, spring);
    e.ease = t.ease;
    e.duration = T(t.duration);
    e.type = `keyframes`;
    return e;
};
const Kt = 5;
function qt(e, t, n) {
    let r = Math.max(t - Kt, 0);
    return D(n - e(r), t - r);
}
function Jt({ keyframes, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
    let d = keyframes[0];
    let f = {
        done: false,
        value: d
    };
    let p = (e)=>min !== undefined && e < min || max !== undefined && e > max;
    let m = (e)=>{
        if (min === undefined) {
            return max;
        }
        if (max === undefined || Math.abs(min - e) < Math.abs(max - e)) {
            return min;
        }
        return max;
    };
    let h = power * velocity;
    let g = d + h;
    let _ = modifyTarget === undefined ? g : modifyTarget(g);
    if (_ !== g) {
        h = _ - d;
    }
    let v = (e)=>-h * Math.exp(-e / timeConstant);
    let y = (e)=>_ + v(e);
    let b = (e)=>{
        let t = v(e);
        let n = y(e);
        f.done = Math.abs(t) <= restDelta;
        f.value = f.done ? _ : n;
    };
    let x;
    let S;
    let C = (e)=>{
        if (p(f.value)) {
            x = e;
            S = spring({
                keyframes: [
                    f.value,
                    m(f.value)
                ],
                velocity: qt(y, e, f.value),
                damping: bounceDamping,
                stiffness: bounceStiffness,
                restDelta,
                restSpeed
            });
        }
    };
    C(0);
    return {
        calculatedDuration: null,
        next: (e)=>{
            let t = false;
            if (!S && x === undefined) {
                t = true;
                b(e);
                C(e);
            }
            if (x !== undefined && e >= x) {
                return S.next(e - x);
            }
            if (!t) {
                b(e);
            }
            return f;
        }
    };
}
function Yt(e, ease, mixer) {
    let r = [];
    let i = mixer || h.mix || At;
    let a = e.length - 1;
    for(let n = 0; n < a; n++){
        let a = i(e[n], e[n + 1]);
        if (ease) {
            a = S(Array.isArray(ease) ? ease[n] || linear : ease, a);
        }
        r.push(a);
    }
    return r;
}
function Xt(e, t, { clamp = true, ease, mixer } = {}) {
    let e_length = e.length;
    t.length;
    if (e_length === 1) {
        return ()=>t[0];
    }
    if (e_length === 2 && t[0] === t[1]) {
        return ()=>t[1];
    }
    let o = e[0] === e[1];
    if (e[0] > e[e_length - 1]) {
        e = [
            ...e
        ].reverse();
        t = [
            ...t
        ].reverse();
    }
    let s = Yt(t, ease, mixer);
    let s_length = s.length;
    let l = (n)=>{
        if (o && n < e[0]) {
            return t[0];
        }
        let r = 0;
        if (s_length > 1) {
            for(; r < e.length - 2 && !(n < e[r + 1]); r++);
        }
        let i = C(e[r], e[r + 1], n);
        return s[r](i);
    };
    if (clamp) {
        return (t)=>l(m(e[0], e[e_length - 1], t));
    }
    return l;
}
function Zt(e, t) {
    let n = e[e.length - 1];
    for(let r = 1; r <= t; r++){
        let i = C(0, t, r);
        e.push(B(n, 1, i));
    }
}
function Qt(keyframes) {
    let t = [
        0
    ];
    Zt(t, keyframes.length - 1);
    return t;
}
function $t(e, duration) {
    return e.map((e)=>e * duration);
}
function en(keyframes, t) {
    return keyframes.map(()=>t || easeInOut).splice(0, keyframes.length - 1);
}
function tn({ duration = 300, keyframes, times, ease = `easeInOut` }) {
    let i = _e(ease) ? ease.map(xe) : xe(ease);
    let a = {
        done: false,
        value: keyframes[0]
    };
    let o = Xt($t(times && times.length === keyframes.length ? times : Qt(keyframes), duration), keyframes, {
        ease: Array.isArray(i) ? i : en(keyframes, i)
    });
    return {
        calculatedDuration: duration,
        next: (t)=>{
            a.value = o(t);
            a.done = t >= duration;
            return a;
        }
    };
}
const an = {
    decay: Jt,
    inertia: Jt,
    tween: tn,
    keyframes: tn,
    spring
};
function on(e) {
    if (typeof e.type == `string`) {
        e.type = an[e.type];
    }
}
class sn {
    constructor(){
        this.updateFinished();
    }
    get finished() {
        return this._finished;
    }
    updateFinished() {
        this._finished = new Promise((resolve)=>{
            this.resolve = resolve;
        });
    }
    notifyFinished() {
        this.resolve();
    }
    then(e, t) {
        return this.finished.then(e, t);
    }
}
const cn = (e)=>e / 100;
class ln extends sn {
    constructor(e){
        super();
        this.state = `idle`;
        this.startTime = null;
        this.isStopped = false;
        this.currentTime = 0;
        this.holdTime = null;
        this.playbackSpeed = 1;
        this.delayState = {
            done: false,
            value: undefined
        };
        this.stop = ()=>{
            let { motionValue } = this.options;
            if (motionValue && motionValue.updatedAt !== M.now()) {
                this.tick(M.now());
            }
            this.isStopped = true;
            if (this.state !== `idle`) {
                this.teardown();
                this.options.onStop?.();
            }
        };
        N.mainThread++;
        this.options = e;
        this.initAnimation();
        this.play();
        if (e.autoplay === false) {
            this.pause();
        }
    }
    initAnimation() {
        let { options } = this;
        on(options);
        let { type = tn, repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = options;
        let { keyframes } = options;
        let s = type || tn;
        if (s !== tn && typeof keyframes[0] != `number`) {
            this.mixKeyframes = S(cn, At(keyframes[0], keyframes[1]));
            keyframes = [
                0,
                100
            ];
        }
        let c = s({
            ...options,
            keyframes
        });
        if (repeatType === `mirror`) {
            this.mirroredGenerator = s({
                ...options,
                keyframes: [
                    ...keyframes
                ].reverse(),
                velocity: -velocity
            });
        }
        if (c.calculatedDuration === null) {
            c.calculatedDuration = Pt(c);
        }
        let { calculatedDuration } = c;
        this.calculatedDuration = calculatedDuration;
        this.resolvedDuration = calculatedDuration + repeatDelay;
        this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
        this.generator = c;
    }
    updateTime(e) {
        let t = Math.round(e - this.startTime) * this.playbackSpeed;
        if (this.holdTime === null) {
            this.currentTime = t;
        } else {
            this.currentTime = this.holdTime;
        }
    }
    tick(e, t = false) {
        let { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration } = this;
        if (this.startTime === null) {
            return generator.next(0);
        }
        let { delay = 0, keyframes, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe } = this.options;
        if (this.speed > 0) {
            this.startTime = Math.min(this.startTime, e);
        } else if (this.speed < 0) {
            this.startTime = Math.min(e - totalDuration / this.speed, this.startTime);
        }
        if (t) {
            this.currentTime = e;
        } else {
            this.updateTime(e);
        }
        let _ = this.currentTime - delay * (this.playbackSpeed >= 0 ? 1 : -1);
        let v = this.playbackSpeed >= 0 ? _ < 0 : _ > totalDuration;
        this.currentTime = Math.max(_, 0);
        if (this.state === `finished` && this.holdTime === null) {
            this.currentTime = totalDuration;
        }
        let currentTime = this.currentTime;
        let b = generator;
        if (repeat) {
            let e = Math.min(this.currentTime, totalDuration) / resolvedDuration;
            let t = Math.floor(e);
            let n = e % 1;
            if (!n && e >= 1) {
                n = 1;
            }
            if (n === 1) {
                t--;
            }
            t = Math.min(t, repeat + 1);
            if (t % 2) {
                if (repeatType === `reverse`) {
                    n = 1 - n;
                    if (repeatDelay) {
                        n -= repeatDelay / resolvedDuration;
                    }
                } else if (repeatType === `mirror`) {
                    b = mirroredGenerator;
                }
            }
            currentTime = m(0, 1, n) * resolvedDuration;
        }
        let x;
        if (v) {
            this.delayState.value = keyframes[0];
            x = this.delayState;
        } else {
            x = b.next(currentTime);
        }
        if (mixKeyframes && !v) {
            x.value = mixKeyframes(x.value);
        }
        let { done } = x;
        if (!v && calculatedDuration !== null) {
            done = this.playbackSpeed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
        }
        let C = this.holdTime === null && (this.state === `finished` || this.state === `running` && done);
        if (C && type !== Jt) {
            x.value = rn(keyframes, this.options, finalKeyframe, this.speed);
        }
        if (onUpdate) {
            onUpdate(x.value);
        }
        if (C) {
            this.finish();
        }
        return x;
    }
    then(e, t) {
        return this.finished.then(e, t);
    }
    get duration() {
        return E(this.calculatedDuration);
    }
    get iterationDuration() {
        let { delay = 0 } = this.options || {};
        return this.duration + E(delay);
    }
    get time() {
        return E(this.currentTime);
    }
    set time(e) {
        e = T(e);
        this.currentTime = e;
        if (this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0) {
            this.holdTime = e;
        } else if (this.driver) {
            this.startTime = this.driver.now() - e / this.playbackSpeed;
        }
        if (this.driver) {
            this.driver.start(false);
        } else {
            this.startTime = 0;
            this.state = `paused`;
            this.holdTime = e;
            this.tick(e);
        }
    }
    getGeneratorVelocity() {
        let currentTime = this.currentTime;
        if (currentTime <= 0) {
            return this.options.velocity || 0;
        }
        if (this.generator.velocity) {
            return this.generator.velocity(currentTime);
        }
        let value = this.generator.next(currentTime).value;
        return qt((e)=>this.generator.next(e).value, currentTime, value);
    }
    get speed() {
        return this.playbackSpeed;
    }
    set speed(e) {
        let t = this.playbackSpeed !== e;
        if (t && this.driver) {
            this.updateTime(M.now());
        }
        this.playbackSpeed = e;
        if (t && this.driver) {
            this.time = E(this.currentTime);
        }
    }
    play() {
        if (this.isStopped) {
            return;
        }
        let { driver = jt, startTime } = this.options;
        this.driver ||= driver((e)=>this.tick(e));
        this.options.onPlay?.();
        let n = this.driver.now();
        if (this.state === `finished`) {
            this.updateFinished();
            this.startTime = n;
        } else if (this.holdTime === null) {
            this.startTime ||= startTime ?? n;
        } else {
            this.startTime = n - this.holdTime;
        }
        if (this.state === `finished` && this.speed < 0) {
            this.startTime += this.calculatedDuration;
        }
        this.holdTime = null;
        this.state = `running`;
        this.driver.start();
    }
    pause() {
        this.state = `paused`;
        this.updateTime(M.now());
        this.holdTime = this.currentTime;
    }
    complete() {
        if (this.state !== `running`) {
            this.play();
        }
        this.state = `finished`;
        this.holdTime = null;
    }
    finish() {
        this.notifyFinished();
        this.teardown();
        this.state = `finished`;
        this.options.onComplete?.();
    }
    cancel() {
        this.holdTime = null;
        this.startTime = 0;
        this.tick(0);
        this.teardown();
        this.options.onCancel?.();
    }
    teardown() {
        this.state = `idle`;
        this.stopDriver();
        this.startTime = this.holdTime = null;
        N.mainThread--;
    }
    stopDriver() {
        this.driver &&= (this.driver.stop(), undefined);
    }
    sample(e) {
        this.startTime = 0;
        return this.tick(e, true);
    }
    attachTimeline(e) {
        if (this.options.allowFlatten) {
            this.options.type = `keyframes`;
            this.options.ease = `linear`;
            this.initAnimation();
        }
        this.driver?.stop();
        return e.observe(this);
    }
}
function un(unresolvedKeyframes) {
    for(let t = 1; t < unresolvedKeyframes.length; t++){
        unresolvedKeyframes[t] ?? (unresolvedKeyframes[t] = unresolvedKeyframes[t - 1]);
    }
}
const H = (e)=>e * 180 / Math.PI;
const dn = (e)=>pn(H(Math.atan2(e[1], e[0])));
const fn = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (e)=>(Math.abs(e[0]) + Math.abs(e[3])) / 2,
    rotate: dn,
    rotateZ: dn,
    skewX: (e)=>H(Math.atan(e[1])),
    skewY: (e)=>H(Math.atan(e[2])),
    skew: (e)=>(Math.abs(e[1]) + Math.abs(e[2])) / 2
};
var pn = (e)=>{
    e %= 360;
    if (e < 0) {
        e += 360;
    }
    return e;
};
const mn = dn;
const scaleX = (e)=>Math.sqrt(e[0] * e[0] + e[1] * e[1]);
const scaleY = (e)=>Math.sqrt(e[4] * e[4] + e[5] * e[5]);
const _n = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX,
    scaleY,
    scale: (e)=>(scaleX(e) + scaleY(e)) / 2,
    rotateX: (e)=>pn(H(Math.atan2(e[6], e[5]))),
    rotateY: (e)=>pn(H(Math.atan2(-e[2], e[0]))),
    rotateZ: mn,
    rotate: mn,
    skewX: (e)=>H(Math.atan(e[4])),
    skewY: (e)=>H(Math.atan(e[1])),
    skew: (e)=>(Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function vn(e) {
    return +!!e.includes(`scale`);
}
function yn(transform, t) {
    if (!transform || transform === `none`) {
        return vn(t);
    }
    let n = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let r;
    let i;
    if (n) {
        r = _n;
        i = n;
    } else {
        let t = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        r = fn;
        i = t;
    }
    if (!i) {
        return vn(t);
    }
    let a = r[t];
    let o = i[1].split(`,`).map(xn);
    if (typeof a == `function`) {
        return a(o);
    }
    return o[a];
}
const bn = (e, t)=>{
    let { transform = `none` } = getComputedStyle(e);
    return yn(transform, t);
};
function xn(e) {
    return parseFloat(e.trim());
}
const Sn = [
    `transformPerspective`,
    `x`,
    `y`,
    `z`,
    `translateX`,
    `translateY`,
    `translateZ`,
    `scale`,
    `scaleX`,
    `scaleY`,
    `rotate`,
    `rotateX`,
    `rotateY`,
    `rotateZ`,
    `skew`,
    `skewX`,
    `skewY`
];
const Cn = new Set(Sn);
const wn = (e)=>e === Fe || e === L;
const Tn = new Set([
    `x`,
    `y`,
    `z`
]);
const En = Sn.filter((e)=>!Tn.has(e));
function Dn(e) {
    let t = [];
    En.forEach((n)=>{
        let r = e.getValue(n);
        if (r !== undefined) {
            t.push([
                n,
                r.get()
            ]);
            r.set(+!!n.startsWith(`scale`));
        }
    });
    return t;
}
const U = {
    width: ({ x }, { paddingLeft = `0`, paddingRight = `0`, boxSizing })=>{
        let i = x.max - x.min;
        if (boxSizing === `border-box`) {
            return i;
        }
        return i - parseFloat(paddingLeft) - parseFloat(paddingRight);
    },
    height: ({ y }, { paddingTop = `0`, paddingBottom = `0`, boxSizing })=>{
        let i = y.max - y.min;
        if (boxSizing === `border-box`) {
            return i;
        }
        return i - parseFloat(paddingTop) - parseFloat(paddingBottom);
    },
    top: (e, { top })=>parseFloat(top),
    left: (e, { left })=>parseFloat(left),
    bottom: ({ y }, { top })=>parseFloat(top) + (y.max - y.min),
    right: ({ x }, { left })=>parseFloat(left) + (x.max - x.min),
    x: (e, { transform })=>yn(transform, `x`),
    y: (e, { transform })=>yn(transform, `y`)
};
U.translateX = U.x;
U.translateY = U.y;
const W = new Set;
let On = false;
let kn = false;
let An = false;
function jn() {
    if (kn) {
        let e = Array.from(W).filter((e)=>e.needsMeasurement);
        let t = new Set(e.map((e)=>e.element));
        let n = new Map;
        t.forEach((e)=>{
            let t = Dn(e);
            if (t.length) {
                n.set(e, t);
                e.render();
            }
        });
        e.forEach((e)=>e.measureInitialState());
        t.forEach((e)=>{
            e.render();
            let t = n.get(e);
            if (t) {
                t.forEach(([t, n])=>{
                    e.getValue(t)?.set(n);
                });
            }
        });
        e.forEach((e)=>e.measureEndState());
        e.forEach((e)=>{
            if (e.suspendedScrollY !== undefined) {
                window.scrollTo(0, e.suspendedScrollY);
            }
        });
    }
    kn = false;
    On = false;
    W.forEach((e)=>e.complete(An));
    W.clear();
}
function Mn() {
    W.forEach((e)=>{
        e.readKeyframes();
        if (e.needsMeasurement) {
            kn = true;
        }
    });
}
function Nn() {
    An = true;
    Mn();
    jn();
    An = false;
}
class Pn {
    constructor(e, t, n, r, i, a = false){
        this.state = `pending`;
        this.isAsync = false;
        this.needsMeasurement = false;
        this.unresolvedKeyframes = [
            ...e
        ];
        this.onComplete = t;
        this.name = n;
        this.motionValue = r;
        this.element = i;
        this.isAsync = a;
    }
    scheduleResolve() {
        this.state = `scheduled`;
        if (this.isAsync) {
            W.add(this);
            if (!On) {
                On = true;
                schedule.read(Mn);
                schedule.resolveKeyframes(jn);
            }
        } else {
            this.readKeyframes();
            this.complete();
        }
    }
    readKeyframes() {
        let { unresolvedKeyframes, name, element, motionValue } = this;
        if (unresolvedKeyframes[0] === null) {
            let i = motionValue?.get();
            let a = unresolvedKeyframes[unresolvedKeyframes.length - 1];
            if (i !== undefined) {
                unresolvedKeyframes[0] = i;
            } else if (element && name) {
                let r = element.readValue(name, a);
                if (r != null) {
                    unresolvedKeyframes[0] = r;
                }
            }
            if (unresolvedKeyframes[0] === undefined) {
                unresolvedKeyframes[0] = a;
            }
            if (motionValue && i === undefined) {
                motionValue.set(unresolvedKeyframes[0]);
            }
        }
        un(unresolvedKeyframes);
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete(e = false) {
        this.state = `complete`;
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e);
        W.delete(this);
    }
    cancel() {
        if (this.state === `scheduled`) {
            W.delete(this);
            this.state = `pending`;
        }
    }
    resume() {
        if (this.state === `pending`) {
            this.scheduleResolve();
        }
    }
}
const Fn = (name)=>name.startsWith(`--`);
function In(element, name, n) {
    if (Fn(name)) {
        element.style.setProperty(name, n);
    } else {
        element.style[name] = n;
    }
}
const Ln = {};
function Rn(e, t) {
    let n = y(e);
    return ()=>Ln[t] ?? n();
}
const zn = Rn(()=>window.ScrollTimeline !== undefined, `scrollTimeline`);
const Bn = Rn(()=>{
    try {
        document.createElement(`div`).animate({
            opacity: 0
        }, {
            easing: `linear(0, 1)`
        });
    } catch  {
        return false;
    }
    return true;
}, `linearEasing`);
const Vn = ([e, t, n, r])=>`cubic-bezier(${e}, ${t}, ${n}, ${r})`;
const Hn = {
    linear: `linear`,
    ease: `ease`,
    easeIn: `ease-in`,
    easeOut: `ease-out`,
    easeInOut: `ease-in-out`,
    circIn: Vn([
        0,
        0.65,
        0.55,
        1
    ]),
    circOut: Vn([
        0.55,
        0,
        1,
        0.45
    ]),
    backIn: Vn([
        0.31,
        0.01,
        0.66,
        -0.59
    ]),
    backOut: Vn([
        0.33,
        1.53,
        0.69,
        0.99
    ])
};
function Un(e, t) {
    if (e) {
        if (typeof e == `function`) {
            if (Bn()) {
                return Mt(e, t);
            }
            return `ease-out`;
        }
        if (ve(e)) {
            return Vn(e);
        }
        if (Array.isArray(e)) {
            return e.map((e)=>Un(e, t) || Hn.easeOut);
        }
        return Hn[e];
    }
}
function Wn(element, name, keyframes, { delay = 0, duration = 300, repeat = 0, repeatType = `loop`, ease = `easeOut`, times } = {}, l = undefined) {
    let u = {
        [name]: keyframes
    };
    if (times) {
        u.offset = times;
    }
    let d = Un(ease, duration);
    if (Array.isArray(d)) {
        u.easing = d;
    }
    if (O.value) {
        N.waapi++;
    }
    let f = {
        delay,
        duration,
        easing: Array.isArray(d) ? `linear` : d,
        fill: `both`,
        iterations: repeat + 1,
        direction: repeatType === `reverse` ? `alternate` : `normal`
    };
    if (l) {
        f.pseudoElement = l;
    }
    let p = element.animate(u, f);
    if (O.value) {
        p.finished.finally(()=>{
            N.waapi--;
        });
    }
    return p;
}
function Gn(type) {
    return typeof type == `function` && `applyToOptions` in type;
}
function Kn({ type, ...rest }) {
    if (Gn(type) && Bn()) {
        return type.applyToOptions(rest);
    }
    rest.duration ??= 300;
    rest.ease ??= `easeOut`;
    return rest;
}
class qn extends sn {
    constructor(e){
        super();
        this.finishedTime = null;
        this.isStopped = false;
        this.manualStartTime = null;
        if (!e) {
            return;
        }
        let { element, name, keyframes, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = e;
        this.isPseudoElement = !!pseudoElement;
        this.allowFlatten = allowFlatten;
        this.options = e;
        e.type;
        let c = Kn(e);
        this.animation = Wn(element, name, keyframes, c, pseudoElement);
        if (c.autoplay === false) {
            this.animation.pause();
        }
        this.animation.onfinish = ()=>{
            this.finishedTime = this.time;
            if (!pseudoElement) {
                let e = rn(keyframes, this.options, finalKeyframe, this.speed);
                if (this.updateMotionValue) {
                    this.updateMotionValue(e);
                }
                In(element, name, e);
                this.animation.cancel();
            }
            onComplete?.();
            this.notifyFinished();
        };
    }
    play() {
        if (!this.isStopped) {
            this.manualStartTime = null;
            this.animation.play();
            if (this.state === `finished`) {
                this.updateFinished();
            }
        }
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.finish?.();
    }
    cancel() {
        try {
            this.animation.cancel();
        } catch  {}
    }
    stop() {
        if (this.isStopped) {
            return;
        }
        this.isStopped = true;
        let { state } = this;
        if (!(state === `idle` || state === `finished`)) {
            if (this.updateMotionValue) {
                this.updateMotionValue();
            } else {
                this.commitStyles();
            }
            if (!this.isPseudoElement) {
                this.cancel();
            }
        }
    }
    commitStyles() {
        let e = this.options?.element;
        if (!this.isPseudoElement && e?.isConnected) {
            this.animation.commitStyles?.();
        }
    }
    get duration() {
        let e = this.animation.effect?.getComputedTiming?.().duration || 0;
        return E(Number(e));
    }
    get iterationDuration() {
        let { delay = 0 } = this.options || {};
        return this.duration + E(delay);
    }
    get time() {
        return E(Number(this.animation.currentTime) || 0);
    }
    set time(e) {
        let t = this.finishedTime !== null;
        this.manualStartTime = null;
        this.finishedTime = null;
        this.animation.currentTime = T(e);
        if (t) {
            this.animation.pause();
        }
    }
    get speed() {
        return this.animation.playbackRate;
    }
    set speed(e) {
        if (e < 0) {
            this.finishedTime = null;
        }
        this.animation.playbackRate = e;
    }
    get state() {
        if (this.finishedTime === null) {
            return this.animation.playState;
        }
        return `finished`;
    }
    get startTime() {
        return this.manualStartTime ?? Number(this.animation.startTime);
    }
    set startTime(e) {
        this.manualStartTime = this.animation.startTime = e;
    }
    attachTimeline({ timeline, rangeStart, rangeEnd, observe }) {
        if (this.allowFlatten) {
            this.animation.effect?.updateTiming({
                easing: `linear`
            });
        }
        this.animation.onfinish = null;
        if (timeline && zn()) {
            this.animation.timeline = timeline;
            if (rangeStart) {
                this.animation.rangeStart = rangeStart;
            }
            if (rangeEnd) {
                this.animation.rangeEnd = rangeEnd;
            }
            return linear;
        }
        return observe(this);
    }
}
const Jn = {
    anticipate,
    backInOut,
    circInOut
};
function Yn(ease) {
    return ease in Jn;
}
function Xn(e) {
    if (typeof e.ease == `string` && Yn(e.ease)) {
        e.ease = Jn[e.ease];
    }
}
const Zn = 10;
class Qn extends qn {
    constructor(e){
        Xn(e);
        on(e);
        super(e);
        if (e.startTime !== undefined && e.autoplay !== false) {
            this.startTime = e.startTime;
        }
        this.options = e;
    }
    updateMotionValue(e) {
        let { motionValue, onUpdate, onComplete, element, ...rest } = this.options;
        if (!motionValue) {
            return;
        }
        if (e !== undefined) {
            motionValue.set(e);
            return;
        }
        let o = new ln({
            ...rest,
            autoplay: false
        });
        let s = Math.max(Zn, M.now() - this.startTime);
        let c = m(0, Zn, s - Zn);
        let value = o.sample(s).value;
        let { name } = this.options;
        if (element && name) {
            In(element, name, value);
        }
        motionValue.setWithVelocity(o.sample(Math.max(0, s - c)).value, value, c);
        o.stop();
    }
}
const $n = (e, name)=>{
    if (name === `zIndex`) {
        return false;
    }
    return !!(typeof e == `number` || Array.isArray(e) || typeof e == `string` && (z.test(e) || e === `0`) && !e.startsWith(`url(`));
};
function er(keyframes) {
    let t = keyframes[0];
    if (keyframes.length === 1) {
        return true;
    }
    for(let n = 0; n < keyframes.length; n++){
        if (keyframes[n] !== t) {
            return true;
        }
    }
}
function tr(keyframes, name, type, velocity) {
    let i = keyframes[0];
    if (i === null) {
        return false;
    }
    if (name === `display` || name === `visibility`) {
        return true;
    }
    let a = keyframes[keyframes.length - 1];
    let o = $n(i, name);
    let s = $n(a, name);
    `${name}${i}${a}${o ? a : i}`;
    if (!o || !s) {
        return false;
    }
    return er(keyframes) || (type === `spring` || Gn(type)) && velocity;
}
function nr(e) {
    e.duration = 0;
    e.type = `keyframes`;
}
const rr = new Set([
    `opacity`,
    `clipPath`,
    `filter`,
    `transform`
]);
const ir = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function ar(keyframes) {
    for(let t = 0; t < keyframes.length; t++){
        if (typeof keyframes[t] == `string` && ir.test(keyframes[t])) {
            return true;
        }
    }
    return false;
}
const or = new Set([
    `color`,
    `backgroundColor`,
    `outlineColor`,
    `fill`,
    `stroke`,
    `borderColor`,
    `borderTopColor`,
    `borderRightColor`,
    `borderBottomColor`,
    `borderLeftColor`
]);
const sr = y(()=>Object.hasOwnProperty.call(Element.prototype, `animate`));
function cr({ motionValue, name, repeatDelay, repeatType, damping, type, keyframes }) {
    if (!(motionValue?.owner?.current instanceof HTMLElement)) {
        return false;
    }
    let { onUpdate, transformTemplate } = motionValue.owner.getProps();
    return sr() && name && (rr.has(name) || or.has(name) && ar(keyframes)) && (name !== `transform` || !transformTemplate) && !onUpdate && !repeatDelay && repeatType !== `mirror` && damping !== 0 && type !== `inertia`;
}
const lr = 40;
class ur extends sn {
    constructor({ autoplay = true, delay = 0, type = `keyframes`, repeat = 0, repeatDelay = 0, repeatType = `loop`, keyframes, name, motionValue, element, ...rest }){
        super();
        this.stop = ()=>{
            if (this._animation) {
                this._animation.stop();
                this.stopTimeline?.();
            }
            this.keyframeResolver?.cancel();
        };
        this.createdAt = M.now();
        let d = {
            autoplay,
            delay,
            type,
            repeat,
            repeatDelay,
            repeatType,
            name,
            motionValue,
            element,
            ...rest
        };
        let f = element?.KeyframeResolver || Pn;
        this.keyframeResolver = new f(keyframes, (e, t, n)=>this.onKeyframesResolved(e, t, d, !n), name, motionValue, element);
        this.keyframeResolver?.scheduleResolve();
    }
    onKeyframesResolved(keyframes, finalKeyframe, n, r) {
        this.keyframeResolver = undefined;
        let { name, type, velocity, delay, isHandoff, onUpdate } = n;
        this.resolvedAt = M.now();
        let u = true;
        if (!tr(keyframes, name, type, velocity)) {
            u = false;
            if (h.instantAnimations || !delay) {
                onUpdate?.(rn(keyframes, n, finalKeyframe));
            }
            keyframes[0] = keyframes[keyframes.length - 1];
            nr(n);
            n.repeat = 0;
        }
        let d = {
            startTime: r ? this.resolvedAt && this.resolvedAt - this.createdAt > lr ? this.resolvedAt : this.createdAt : undefined,
            finalKeyframe,
            ...n,
            keyframes
        };
        let f = u && !isHandoff && cr(d);
        let element = d.motionValue?.owner?.current;
        let m;
        if (f) {
            try {
                m = new Qn({
                    ...d,
                    element
                });
            } catch  {
                m = new ln(d);
            }
        } else {
            m = new ln(d);
        }
        m.finished.then(()=>{
            this.notifyFinished();
        }).catch(linear);
        this.pendingTimeline &&= (this.stopTimeline = m.attachTimeline(this.pendingTimeline), undefined);
        this._animation = m;
    }
    get finished() {
        if (this._animation) {
            return this.animation.finished;
        }
        return this._finished;
    }
    then(e, t) {
        return this.finished.finally(e).then(()=>{});
    }
    get animation() {
        if (!this._animation) {
            this.keyframeResolver?.resume();
            Nn();
        }
        return this._animation;
    }
    get duration() {
        return this.animation.duration;
    }
    get iterationDuration() {
        return this.animation.iterationDuration;
    }
    get time() {
        return this.animation.time;
    }
    set time(e) {
        this.animation.time = e;
    }
    get speed() {
        return this.animation.speed;
    }
    get state() {
        return this.animation.state;
    }
    set speed(e) {
        this.animation.speed = e;
    }
    get startTime() {
        return this.animation.startTime;
    }
    attachTimeline(e) {
        if (this._animation) {
            this.stopTimeline = this.animation.attachTimeline(e);
        } else {
            this.pendingTimeline = e;
        }
        return ()=>this.stop();
    }
    play() {
        this.animation.play();
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.complete();
    }
    cancel() {
        if (this._animation) {
            this.animation.cancel();
        }
        this.keyframeResolver?.cancel();
    }
}
function dr(e, t, n, r = 0, i = 1) {
    let a = Array.from(e).sort((e, t)=>e.sortNodePosition(t)).indexOf(t);
    let e_size = e.size;
    let s = (e_size - 1) * r;
    if (typeof n == `function`) {
        return n(a, e_size);
    }
    if (i === 1) {
        return a * r;
    }
    return s - a * r;
}
function mr(e, t, n = 1) {
    `${e}`;
    let [r, i] = pr(e);
    if (!r) {
        return;
    }
    let a = window.getComputedStyle(t).getPropertyValue(r);
    if (a) {
        let e = a.trim();
        if (g(e)) {
            return parseFloat(e);
        }
        return e;
    }
    if (Me(i)) {
        return mr(i, t, n + 1);
    }
    return i;
}
const hr = {
    type: `spring`,
    stiffness: 500,
    damping: 25,
    restSpeed: 10
};
const gr = (e)=>({
        type: `spring`,
        stiffness: 550,
        damping: e === 0 ? 2 * Math.sqrt(550) : 30,
        restSpeed: 10
    });
const _r = {
    type: `keyframes`,
    duration: 0.8
};
const vr = {
    type: `keyframes`,
    ease: [
        0.25,
        0.1,
        0.35,
        1
    ],
    duration: 0.3
};
const yr = (e, { keyframes })=>{
    if (keyframes.length > 2) {
        return _r;
    }
    if (Cn.has(e)) {
        if (e.startsWith(`scale`)) {
            return gr(keyframes[1]);
        }
        return hr;
    }
    return vr;
};
const wr = (e, motionValue, n, r = {}, i, a)=>(o)=>{
        let s = xr(r, e) || {};
        let c = s.delay || r.delay || 0;
        let { elapsed = 0 } = r;
        elapsed -= T(c);
        let u = {
            keyframes: Array.isArray(n) ? n : [
                null,
                n
            ],
            ease: `easeOut`,
            velocity: motionValue.getVelocity(),
            ...s,
            delay: -elapsed,
            onUpdate: (e)=>{
                motionValue.set(e);
                if (s.onUpdate) {
                    s.onUpdate(e);
                }
            },
            onComplete: ()=>{
                o();
                if (s.onComplete) {
                    s.onComplete();
                }
            },
            name: e,
            motionValue,
            element: a ? undefined : i
        };
        if (!Cr(s)) {
            Object.assign(u, yr(e, u));
        }
        u.duration &&= T(u.duration);
        u.repeatDelay &&= T(u.repeatDelay);
        if (u.from !== undefined) {
            u.keyframes[0] = u.from;
        }
        let d = false;
        if (u.type === false || u.duration === 0 && !u.repeatDelay) {
            nr(u);
            if (u.delay === 0) {
                d = true;
            }
        }
        if (h.instantAnimations || h.skipAnimations || i?.shouldSkipAnimations) {
            d = true;
            nr(u);
            u.delay = 0;
        }
        u.allowFlatten = !s.type && !s.ease;
        if (d && !a && motionValue.get() !== undefined) {
            let e = rn(u.keyframes, s);
            if (e !== undefined) {
                schedule.update(()=>{
                    u.onUpdate(e);
                    u.onComplete();
                });
                return;
            }
        }
        if (s.isSync) {
            return new ln(u);
        }
        return new ur(u);
    };
const Dr = new Set([
    `width`,
    `height`,
    `top`,
    `left`,
    `right`,
    `bottom`,
    ...Sn
]);
const Or = 30;
const kr = (e)=>!isNaN(parseFloat(e));
const Ar = {
    current: undefined
};
class jr {
    constructor(e, t = {}){
        this.canTrackVelocity = null;
        this.events = {};
        this.updateAndNotify = (e)=>{
            let t = M.now();
            if (this.updatedAt !== t) {
                this.setPrevFrameValue();
            }
            this.prev = this.current;
            this.setCurrent(e);
            if (this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents)) {
                for (let e of this.dependents){
                    e.dirty();
                }
            }
        };
        this.hasAnimated = false;
        this.setCurrent(e);
        this.owner = t.owner;
    }
    setCurrent(e) {
        this.current = e;
        this.updatedAt = M.now();
        if (this.canTrackVelocity === null && e !== undefined) {
            this.canTrackVelocity = kr(this.current);
        }
    }
    setPrevFrameValue(e = this.current) {
        this.prevFrameValue = e;
        this.prevUpdatedAt = this.updatedAt;
    }
    onChange(e) {
        return this.on(`change`, e);
    }
    on(e, t) {
        if (!this.events[e]) {
            this.events[e] = new w;
        }
        let n = this.events[e].add(t);
        if (e === `change`) {
            return ()=>{
                n();
                schedule.read(()=>{
                    if (!this.events.change.getSize()) {
                        this.stop();
                    }
                });
            };
        }
        return n;
    }
    clearListeners() {
        for(let e in this.events){
            this.events[e].clear();
        }
    }
    attach(e, t) {
        this.passiveEffect = e;
        this.stopPassiveEffect = t;
    }
    set(e) {
        if (this.passiveEffect) {
            this.passiveEffect(e, this.updateAndNotify);
        } else {
            this.updateAndNotify(e);
        }
    }
    setWithVelocity(e, t, n) {
        this.set(t);
        this.prev = undefined;
        this.prevFrameValue = e;
        this.prevUpdatedAt = this.updatedAt - n;
    }
    jump(e, t = true) {
        this.updateAndNotify(e);
        this.prev = e;
        this.prevUpdatedAt = this.prevFrameValue = undefined;
        if (t) {
            this.stop();
        }
        if (this.stopPassiveEffect) {
            this.stopPassiveEffect();
        }
    }
    dirty() {
        this.events.change?.notify(this.current);
    }
    addDependent(e) {
        this.dependents ||= new Set;
        this.dependents.add(e);
    }
    removeDependent(e) {
        if (this.dependents) {
            this.dependents.delete(e);
        }
    }
    get() {
        if (Ar.current) {
            Ar.current.push(this);
        }
        return this.current;
    }
    getPrevious() {
        return this.prev;
    }
    getVelocity() {
        let e = M.now();
        if (!this.canTrackVelocity || this.prevFrameValue === undefined || e - this.updatedAt > Or) {
            return 0;
        }
        let t = Math.min(this.updatedAt - this.prevUpdatedAt, Or);
        return D(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
    }
    start(e) {
        this.stop();
        return new Promise((resolve)=>{
            this.hasAnimated = true;
            this.animation = e(resolve);
            if (this.events.animationStart) {
                this.events.animationStart.notify();
            }
        }).then(()=>{
            if (this.events.animationComplete) {
                this.events.animationComplete.notify();
            }
            this.clearAnimation();
        });
    }
    stop() {
        if (this.animation) {
            this.animation.stop();
            if (this.events.animationCancel) {
                this.events.animationCancel.notify();
            }
        }
        this.clearAnimation();
    }
    isAnimating() {
        return !!this.animation;
    }
    clearAnimation() {
        delete this.animation;
    }
    destroy() {
        this.dependents?.clear();
        this.events.destroy?.notify();
        this.clearListeners();
        this.stop();
        if (this.stopPassiveEffect) {
            this.stopPassiveEffect();
        }
    }
}
function Mr(e, t) {
    return new jr(e, t);
}
const Nr = (e)=>Array.isArray(e);
function Pr(e, t, n) {
    if (e.hasValue(t)) {
        e.getValue(t).set(n);
    } else {
        e.addValue(t, Mr(n));
    }
}
function Fr(e) {
    if (Nr(e)) {
        return e[e.length - 1] || 0;
    }
    return e;
}
function Ir(e, t) {
    let { transitionEnd = {}, transition = {}, ...rest } = G(e, t) || {};
    rest = {
        ...rest,
        ...transitionEnd
    };
    for(let t in rest){
        Pr(e, t, Fr(rest[t]));
    }
}
const K = (e)=>!!(e && e.getVelocity);
function Lr(e) {
    return !!(K(e) && e.add);
}
function Rr(e, t) {
    let n = e.getValue(`willChange`);
    if (Lr(n)) {
        return n.add(t);
    }
    if (!n && h.WillChange) {
        let n = new h.WillChange(`auto`);
        e.addValue(`willChange`, n);
        n.add(t);
    }
}
function Hr({ protectedKeys, needsAnimating }, n) {
    let r = protectedKeys.hasOwnProperty(n) && needsAnimating[n] !== true;
    needsAnimating[n] = false;
    return r;
}
function Ur(e, { transition, transitionEnd, ...rest }, { delay = 0, transitionOverride, type } = {}) {
    let c = e.getDefaultTransition();
    transition = transition ? br(transition, c) : c;
    let l = transition?.reduceMotion;
    if (transitionOverride) {
        transition = transitionOverride;
    }
    let u = [];
    let d = type && e.animationState && e.animationState.getState()[type];
    for(let t in rest){
        let r = e.getValue(t, e.latestValues[t] ?? null);
        let i = rest[t];
        if (i === undefined || d && Hr(d, t)) {
            continue;
        }
        let o = {
            delay,
            ...xr(transition || {}, t)
        };
        let c = r.get();
        if (c !== undefined && !r.isAnimating() && !Array.isArray(i) && i === c && !o.velocity) {
            schedule.update(()=>r.set(i));
            continue;
        }
        let f = false;
        if (window.MotionHandoffAnimation) {
            let n = Vr(e);
            if (n) {
                let e = window.MotionHandoffAnimation(n, t, schedule);
                if (e !== null) {
                    o.startTime = e;
                    f = true;
                }
            }
        }
        Rr(e, t);
        let p = l ?? e.shouldReduceMotion;
        r.start(wr(t, r, i, p && Dr.has(t) ? {
            type: false
        } : o, e, f));
        let m = r.animation;
        if (m) {
            u.push(m);
        }
    }
    if (transitionEnd) {
        let t = ()=>schedule.update(()=>{
                if (transitionEnd) {
                    Ir(e, transitionEnd);
                }
            });
        if (u.length) {
            Promise.all(u).then(t);
        } else {
            t();
        }
    }
    return u;
}
function Wr(e, t, n = {}) {
    let r = G(e, t, n.type === `exit` ? e.presenceContext?.custom : undefined);
    let { transition = e.getDefaultTransition() || {} } = r || {};
    if (n.transitionOverride) {
        transition = n.transitionOverride;
    }
    let a = r ? ()=>Promise.all(Ur(e, r, n)) : ()=>Promise.resolve();
    let o = e.variantChildren && e.variantChildren.size ? (r = 0)=>{
        let { delayChildren = 0, staggerChildren, staggerDirection } = transition;
        return Gr(e, t, r, delayChildren, staggerChildren, staggerDirection, n);
    } : ()=>Promise.resolve();
    let { when } = transition;
    if (when) {
        let [e, t] = when === `beforeChildren` ? [
            a,
            o
        ] : [
            o,
            a
        ];
        return e().then(()=>t());
    } else {
        return Promise.all([
            a(),
            o(n.delay)
        ]);
    }
}
function Gr(e, t, n = 0, r = 0, i = 0, a = 1, o) {
    let s = [];
    for (let c of e.variantChildren){
        c.notify(`AnimationStart`, t);
        s.push(Wr(c, t, {
            ...o,
            delay: n + (typeof r == `function` ? 0 : r) + dr(e.variantChildren, c, r, i, a)
        }).then(()=>c.notify(`AnimationComplete`, t)));
    }
    return Promise.all(s);
}
function Kr(e, animation, n = {}) {
    e.notify(`AnimationStart`, animation);
    let r;
    if (Array.isArray(animation)) {
        let i = animation.map((t)=>Wr(e, t, n));
        r = Promise.all(i);
    } else if (typeof animation == `string`) {
        r = Wr(e, animation, n);
    } else {
        let i = typeof animation == `function` ? G(e, animation, n.custom) : animation;
        r = Promise.all(Ur(e, i, n));
    }
    return r.then(()=>{
        e.notify(`AnimationComplete`, animation);
    });
}
const qr = {
    test: (e)=>e === `auto`,
    parse: (e)=>e
};
const Jr = (e)=>(t)=>t.test(e);
const Yr = [
    Fe,
    L,
    I,
    F,
    Xe,
    Ye,
    qr
];
const Xr = (e)=>Yr.find(Jr(e));
function Zr(e) {
    if (typeof e == `number`) {
        return e === 0;
    }
    if (e === null) {
        return true;
    }
    return e === `none` || e === `0` || v(e);
}
const Qr = new Set([
    `brightness`,
    `contrast`,
    `saturate`,
    `opacity`
]);
function $r(e) {
    let [t, n] = e.slice(0, -1).split(`(`);
    if (t === `drop-shadow`) {
        return e;
    }
    let [r] = n.match(ze) || [];
    if (!r) {
        return e;
    }
    let i = n.replace(r, ``);
    let a = +!!Qr.has(t);
    if (r !== n) {
        a *= 100;
    }
    return t + `(` + a + i + `)`;
}
const ei = /\b([a-z-]*)\(.*?\)/gu;
const ti = {
    ...z,
    getAnimatableNone: (e)=>{
        let t = e.match(ei);
        if (t) {
            return t.map($r).join(` `);
        }
        return e;
    }
};
const ni = {
    ...z,
    getAnimatableNone: (e)=>{
        let t = z.parse(e);
        return z.createTransformer(e)(t.map((e)=>{
            if (typeof e == `number`) {
                return 0;
            }
            if (typeof e == `object`) {
                return {
                    ...e,
                    alpha: 1
                };
            }
            return e;
        }));
    }
};
const ri = {
    ...Fe,
    transform: Math.round
};
const ii = {
    borderWidth: L,
    borderTopWidth: L,
    borderRightWidth: L,
    borderBottomWidth: L,
    borderLeftWidth: L,
    borderRadius: L,
    borderTopLeftRadius: L,
    borderTopRightRadius: L,
    borderBottomRightRadius: L,
    borderBottomLeftRadius: L,
    width: L,
    maxWidth: L,
    height: L,
    maxHeight: L,
    top: L,
    right: L,
    bottom: L,
    left: L,
    inset: L,
    insetBlock: L,
    insetBlockStart: L,
    insetBlockEnd: L,
    insetInline: L,
    insetInlineStart: L,
    insetInlineEnd: L,
    padding: L,
    paddingTop: L,
    paddingRight: L,
    paddingBottom: L,
    paddingLeft: L,
    paddingBlock: L,
    paddingBlockStart: L,
    paddingBlockEnd: L,
    paddingInline: L,
    paddingInlineStart: L,
    paddingInlineEnd: L,
    margin: L,
    marginTop: L,
    marginRight: L,
    marginBottom: L,
    marginLeft: L,
    marginBlock: L,
    marginBlockStart: L,
    marginBlockEnd: L,
    marginInline: L,
    marginInlineStart: L,
    marginInlineEnd: L,
    fontSize: L,
    backgroundPositionX: L,
    backgroundPositionY: L,
    rotate: F,
    rotateX: F,
    rotateY: F,
    rotateZ: F,
    scale: Le,
    scaleX: Le,
    scaleY: Le,
    scaleZ: Le,
    skew: F,
    skewX: F,
    skewY: F,
    distance: L,
    translateX: L,
    translateY: L,
    translateZ: L,
    x: L,
    y: L,
    z: L,
    perspective: L,
    transformPerspective: L,
    opacity: Ie,
    originX: Ze,
    originY: Ze,
    originZ: L,
    zIndex: ri,
    fillOpacity: Ie,
    strokeOpacity: Ie,
    numOctaves: ri
};
const ai = {
    ...ii,
    color: R,
    backgroundColor: R,
    outlineColor: R,
    fill: R,
    stroke: R,
    borderColor: R,
    borderTopColor: R,
    borderRightColor: R,
    borderBottomColor: R,
    borderLeftColor: R,
    filter: ti,
    WebkitFilter: ti,
    mask: ni,
    WebkitMask: ni
};
const oi = (e)=>ai[e];
const si = new Set([
    ti,
    ni
]);
function ci(e, t) {
    let n = oi(e);
    if (!si.has(n)) {
        n = z;
    }
    if (n.getAnimatableNone) {
        return n.getAnimatableNone(t);
    }
}
const li = new Set([
    `auto`,
    `none`,
    `0`
]);
function ui(unresolvedKeyframes, t, name) {
    let r = 0;
    let i;
    while(r < unresolvedKeyframes.length && !i){
        let t = unresolvedKeyframes[r];
        if (typeof t == `string` && !li.has(t) && st(t).values.length) {
            i = unresolvedKeyframes[r];
        }
        r++;
    }
    if (i && name) {
        for (let r of t){
            unresolvedKeyframes[r] = ci(name, i);
        }
    }
}
class di extends Pn {
    constructor(e, t, n, r, i){
        super(e, t, n, r, i, true);
    }
    readKeyframes() {
        let { unresolvedKeyframes, element, name } = this;
        if (!element || !element.current) {
            return;
        }
        super.readKeyframes();
        for(let n = 0; n < unresolvedKeyframes.length; n++){
            let r = unresolvedKeyframes[n];
            if (typeof r == `string` && (r = r.trim(), Me(r))) {
                let i = mr(r, element.current);
                if (i !== undefined) {
                    unresolvedKeyframes[n] = i;
                }
                if (n === unresolvedKeyframes.length - 1) {
                    this.finalKeyframe = r;
                }
            }
        }
        this.resolveNoneKeyframes();
        if (!Dr.has(name) || unresolvedKeyframes.length !== 2) {
            return;
        }
        let [r, i] = unresolvedKeyframes;
        let a = Xr(r);
        let o = Xr(i);
        if (Pe(r) !== Pe(i) && U[name]) {
            this.needsMeasurement = true;
            return;
        }
        if (a !== o) {
            if (wn(a) && wn(o)) {
                for(let t = 0; t < unresolvedKeyframes.length; t++){
                    let unresolvedKeyframe = unresolvedKeyframes[t];
                    if (typeof unresolvedKeyframe == `string`) {
                        unresolvedKeyframes[t] = parseFloat(unresolvedKeyframe);
                    }
                }
            } else {
                if (U[name]) {
                    this.needsMeasurement = true;
                }
            }
        }
    }
    resolveNoneKeyframes() {
        let { unresolvedKeyframes, name } = this;
        let n = [];
        for(let t = 0; t < unresolvedKeyframes.length; t++){
            if (unresolvedKeyframes[t] === null || Zr(unresolvedKeyframes[t])) {
                n.push(t);
            }
        }
        if (n.length) {
            ui(unresolvedKeyframes, n, name);
        }
    }
    measureInitialState() {
        let { element, unresolvedKeyframes, name } = this;
        if (!element || !element.current) {
            return;
        }
        if (name === `height`) {
            this.suspendedScrollY = window.pageYOffset;
        }
        this.measuredOrigin = U[name](element.measureViewportBox(), window.getComputedStyle(element.current));
        unresolvedKeyframes[0] = this.measuredOrigin;
        let r = unresolvedKeyframes[unresolvedKeyframes.length - 1];
        if (r !== undefined) {
            element.getValue(name, r).jump(r, false);
        }
    }
    measureEndState() {
        let { element, name, unresolvedKeyframes } = this;
        if (!element || !element.current) {
            return;
        }
        let r = element.getValue(name);
        if (r) {
            r.jump(this.measuredOrigin, false);
        }
        let i = unresolvedKeyframes.length - 1;
        let a = unresolvedKeyframes[i];
        unresolvedKeyframes[i] = U[name](element.measureViewportBox(), window.getComputedStyle(element.current));
        if (a !== null && this.finalKeyframe === undefined) {
            this.finalKeyframe = a;
        }
        if (this.removedTransforms?.length) {
            this.removedTransforms.forEach(([t, n])=>{
                element.getValue(t).set(n);
            });
        }
        this.resolveNoneKeyframes();
    }
}
function fi(e, t, n) {
    if (e == null) {
        return [];
    }
    if (e instanceof EventTarget) {
        return [
            e
        ];
    }
    if (typeof e == `string`) {
        let r = document;
        if (t) {
            r = t.current;
        }
        let i = n?.[e] ?? r.querySelectorAll(e);
        if (i) {
            return Array.from(i);
        }
        return [];
    }
    return Array.from(e).filter((e)=>e != null);
}
const pi = (e, t)=>{
    if (t && typeof e == `number`) {
        return t.transform(e);
    }
    return e;
};
function mi(e) {
    return _(e) && `offsetHeight` in e && !(`ownerSVGElement` in e);
}
const { schedule: schedule_1, cancel: cancel_1 } = Te(queueMicrotask, false);
const q = {
    x: false,
    y: false
};
function _i() {
    return q.x || q.y;
}
function vi(drag) {
    if (drag === `x` || drag === `y`) {
        if (q[drag]) {
            return null;
        }
        q[drag] = true;
        return ()=>{
            q[drag] = false;
        };
    }
    if (q.x || q.y) {
        return null;
    }
    q.x = q.y = true;
    return ()=>{
        q.x = q.y = false;
    };
}
function yi(e, t) {
    let n = fi(e);
    let r = new AbortController;
    return [
        n,
        {
            passive: true,
            ...t,
            signal: r.signal
        },
        ()=>r.abort()
    ];
}
function bi(e) {
    return !(e.pointerType === `touch` || _i());
}
function xi(e, t, n = {}) {
    let [r, i, a] = yi(e, n);
    r.forEach((e)=>{
        let n = false;
        let r = false;
        let a;
        let o = ()=>{
            e.removeEventListener(`pointerleave`, u);
        };
        let s = (e)=>{
            a &&= (a(e), undefined);
            o();
        };
        let c = (e)=>{
            n = false;
            window.removeEventListener(`pointerup`, c);
            window.removeEventListener(`pointercancel`, c);
            if (r) {
                r = false;
                s(e);
            }
        };
        let l = ()=>{
            n = true;
            window.addEventListener(`pointerup`, c, i);
            window.addEventListener(`pointercancel`, c, i);
        };
        let u = (e)=>{
            if (e.pointerType !== `touch`) {
                if (n) {
                    r = true;
                    return;
                }
                s(e);
            }
        };
        e.addEventListener(`pointerenter`, (n)=>{
            if (!bi(n)) {
                return;
            }
            r = false;
            let o = t(e, n);
            if (typeof o == `function`) {
                a = o;
                e.addEventListener(`pointerleave`, u, i);
            }
        }, i);
        e.addEventListener(`pointerdown`, l, i);
    });
    return a;
}
const Oi = new WeakSet;
function ki(e) {
    return (t)=>{
        if (t.key === `Enter`) {
            e(t);
        }
    };
}
function Ai(e, t) {
    e.dispatchEvent(new PointerEvent(`pointer` + t, {
        isPrimary: true,
        bubbles: true
    }));
}
const ji = (e, t)=>{
    let e_currentTarget = e.currentTarget;
    if (!e_currentTarget) {
        return;
    }
    let r = ki(()=>{
        if (Oi.has(e_currentTarget)) {
            return;
        }
        Ai(e_currentTarget, `down`);
        let e = ki(()=>{
            Ai(e_currentTarget, `up`);
        });
        e_currentTarget.addEventListener(`keyup`, e, t);
        e_currentTarget.addEventListener(`blur`, ()=>Ai(e_currentTarget, `cancel`), t);
    });
    e_currentTarget.addEventListener(`keydown`, r, t);
    e_currentTarget.addEventListener(`blur`, ()=>e_currentTarget.removeEventListener(`keydown`, r), t);
};
function Mi(e) {
    return Ci(e) && !_i();
}
const Ni = new WeakSet;
function Pi(e, t, n = {}) {
    let [r, i, a] = yi(e, n);
    let o = (e)=>{
        let e_currentTarget = e.currentTarget;
        if (!Mi(e) || Ni.has(e)) {
            return;
        }
        Oi.add(e_currentTarget);
        if (n.stopPropagation) {
            Ni.add(e);
        }
        let a = t(e_currentTarget, e);
        let o = (e, success)=>{
            window.removeEventListener(`pointerup`, s);
            window.removeEventListener(`pointercancel`, c);
            if (Oi.has(e_currentTarget)) {
                Oi.delete(e_currentTarget);
            }
            if (Mi(e) && typeof a == `function`) {
                a(e, {
                    success
                });
            }
        };
        let s = (e)=>{
            o(e, e_currentTarget === window || e_currentTarget === document || n.useGlobalTarget || Si(e_currentTarget, e.target));
        };
        let c = (e)=>{
            o(e, false);
        };
        window.addEventListener(`pointerup`, s, i);
        window.addEventListener(`pointercancel`, c, i);
    };
    r.forEach((e)=>{
        (n.useGlobalTarget ? window : e).addEventListener(`pointerdown`, o, i);
        if (mi(e)) {
            e.addEventListener(`focus`, (e)=>ji(e, i));
            if (!Ti(e) && !e.hasAttribute(`tabindex`)) {
                e.tabIndex = 0;
            }
        }
    });
    return a;
}
function Fi(e) {
    return _(e) && `ownerSVGElement` in e;
}
const Ii = new WeakMap;
let Li;
const Ri = (e, t, n)=>(r, i)=>{
        if (i && i[0]) {
            return i[0][e + `Size`];
        }
        if (Fi(r) && `getBBox` in r) {
            return r.getBBox()[t];
        }
        return r[n];
    };
const zi = Ri(`inline`, `width`, `offsetWidth`);
const Bi = Ri(`block`, `height`, `offsetHeight`);
function Vi({ target, borderBoxSize }) {
    Ii.get(target)?.forEach((n)=>{
        n(target, {
            get width () {
                return zi(target, borderBoxSize);
            },
            get height () {
                return Bi(target, borderBoxSize);
            }
        });
    });
}
function Hi(e) {
    e.forEach(Vi);
}
function Ui() {
    if (!(typeof ResizeObserver > `u`)) {
        Li = new ResizeObserver(Hi);
    }
}
function Wi(e, t) {
    if (!Li) {
        Ui();
    }
    let n = fi(e);
    n.forEach((e)=>{
        let n = Ii.get(e);
        if (!n) {
            n = new Set;
            Ii.set(e, n);
        }
        n.add(t);
        Li?.observe(e);
    });
    return ()=>{
        n.forEach((e)=>{
            let n = Ii.get(e);
            n?.delete(t);
            if (!n?.size) {
                Li?.unobserve(e);
            }
        });
    };
}
const Gi = new Set;
let Ki;
function qi() {
    Ki = ()=>{
        let e = {
            get width () {
                return window.innerWidth;
            },
            get height () {
                return window.innerHeight;
            }
        };
        Gi.forEach((t)=>t(e));
    };
    window.addEventListener(`resize`, Ki);
}
function Ji(e) {
    Gi.add(e);
    if (!Ki) {
        qi();
    }
    return ()=>{
        Gi.delete(e);
        if (!Gi.size && typeof Ki == `function`) {
            window.removeEventListener(`resize`, Ki);
            Ki = undefined;
        }
    };
}
function Yi(e, t) {
    if (typeof e == `function`) {
        return Ji(e);
    }
    return Wi(e, t);
}
function Xi(e) {
    return Fi(e) && e.tagName === `svg`;
}
const Zi = [
    ...Yr,
    R,
    z
];
const Qi = (e)=>Zi.find(Jr(e));
const $i = ()=>({
        translate: 0,
        scale: 1,
        origin: 0,
        originPoint: 0
    });
const ea = ()=>({
        x: $i(),
        y: $i()
    });
const ta = ()=>({
        min: 0,
        max: 0
    });
const J = ()=>({
        x: ta(),
        y: ta()
    });
const na = new WeakMap;
function ra(e) {
    return typeof e == `object` && !!e && typeof e.start == `function`;
}
function ia(e) {
    return typeof e == `string` || Array.isArray(e);
}
const aa = [
    `animate`,
    `whileInView`,
    `whileFocus`,
    `whileHover`,
    `whileTap`,
    `whileDrag`,
    `exit`
];
const oa = [
    `initial`,
    ...aa
];
function sa(e) {
    return ra(e.animate) || oa.some((t)=>ia(e[t]));
}
function ca(e) {
    return !!(sa(e) || e.variants);
}
function la(owner, t, prevMotionValues) {
    for(let r in t){
        let i = t[r];
        let a = prevMotionValues[r];
        if (K(i)) {
            owner.addValue(r, i);
        } else if (K(a)) {
            owner.addValue(r, Mr(i, {
                owner
            }));
        } else if (a !== i) {
            if (owner.hasValue(r)) {
                let t = owner.getValue(r);
                if (t.liveStyle === true) {
                    t.jump(i);
                } else if (!t.hasAnimated) {
                    t.set(i);
                }
            } else {
                let t = owner.getStaticValue(r);
                owner.addValue(r, Mr(t === undefined ? i : t, {
                    owner
                }));
            }
        }
    }
    for(let r in prevMotionValues){
        if (t[r] === undefined) {
            owner.removeValue(r);
        }
    }
    return t;
}
const ma = [
    `AnimationStart`,
    `AnimationComplete`,
    `Update`,
    `BeforeLayoutMeasure`,
    `LayoutMeasure`,
    `LayoutAnimationStart`,
    `LayoutAnimationComplete`
];
let ha = {};
function ga(e) {
    ha = e;
}
function _a() {
    return ha;
}
class va {
    scrapeMotionValuesFromProps(e, t, n) {
        return {};
    }
    constructor({ parent, props, presenceContext, reducedMotionConfig, skipAnimations, blockInitialAnimation, visualState }, s = {}){
        this.current = null;
        this.children = new Set;
        this.isVariantNode = false;
        this.isControllingVariants = false;
        this.shouldReduceMotion = null;
        this.shouldSkipAnimations = false;
        this.values = new Map;
        this.KeyframeResolver = Pn;
        this.features = {};
        this.valueSubscriptions = new Map;
        this.prevMotionValues = {};
        this.hasBeenMounted = false;
        this.events = {};
        this.propEventSubscriptions = {};
        this.notifyUpdate = ()=>this.notify(`Update`, this.latestValues);
        this.render = ()=>{
            if (this.current) {
                this.triggerBuild();
                this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
            }
        };
        this.renderScheduledAt = 0;
        this.scheduleRender = ()=>{
            let e = M.now();
            if (this.renderScheduledAt < e) {
                this.renderScheduledAt = e;
                schedule.render(this.render, false, true);
            }
        };
        let { latestValues, renderState } = visualState;
        this.latestValues = latestValues;
        this.baseTarget = {
            ...latestValues
        };
        this.initialValues = props.initial ? {
            ...latestValues
        } : {};
        this.renderState = renderState;
        this.parent = parent;
        this.props = props;
        this.presenceContext = presenceContext;
        this.depth = parent ? parent.depth + 1 : 0;
        this.reducedMotionConfig = reducedMotionConfig;
        this.skipAnimationsConfig = skipAnimations;
        this.options = s;
        this.blockInitialAnimation = !!blockInitialAnimation;
        this.isControllingVariants = sa(props);
        this.isVariantNode = ca(props);
        if (this.isVariantNode) {
            this.variantChildren = new Set;
        }
        this.manuallyAnimateOnMount = !!(parent && parent.current);
        let { willChange, ...rest } = this.scrapeMotionValuesFromProps(props, {}, this);
        for(let e in rest){
            let t = rest[e];
            if (latestValues[e] !== undefined && K(t)) {
                t.set(latestValues[e]);
            }
        }
    }
    mount(e) {
        if (this.hasBeenMounted) {
            for(let e in this.initialValues){
                this.values.get(e)?.jump(this.initialValues[e]);
                this.latestValues[e] = this.initialValues[e];
            }
        }
        this.current = e;
        na.set(e, this);
        if (this.projection && !this.projection.instance) {
            this.projection.mount(e);
        }
        if (this.parent && this.isVariantNode && !this.isControllingVariants) {
            this.removeFromVariantTree = this.parent.addVariantChild(this);
        }
        this.values.forEach((e, t)=>this.bindToMotionValue(t, e));
        if (this.reducedMotionConfig === `never`) {
            this.shouldReduceMotion = false;
        } else if (this.reducedMotionConfig === `always`) {
            this.shouldReduceMotion = true;
        } else {
            if (!da.current) {
                pa();
            }
            this.shouldReduceMotion = ua.current;
        }
        this.shouldSkipAnimations = this.skipAnimationsConfig ?? false;
        this.parent?.addChild(this);
        this.update(this.props, this.presenceContext);
        this.hasBeenMounted = true;
    }
    unmount() {
        if (this.projection) {
            this.projection.unmount();
        }
        cancel(this.notifyUpdate);
        cancel(this.render);
        this.valueSubscriptions.forEach((e)=>e());
        this.valueSubscriptions.clear();
        if (this.removeFromVariantTree) {
            this.removeFromVariantTree();
        }
        this.parent?.removeChild(this);
        for(let e in this.events){
            this.events[e].clear();
        }
        for(let e in this.features){
            let t = this.features[e];
            if (t) {
                t.unmount();
                t.isMounted = false;
            }
        }
        this.current = null;
    }
    addChild(e) {
        this.children.add(e);
        this.enteringChildren ??= new Set;
        this.enteringChildren.add(e);
    }
    removeChild(e) {
        this.children.delete(e);
        if (this.enteringChildren) {
            this.enteringChildren.delete(e);
        }
    }
    bindToMotionValue(e, t) {
        if (this.valueSubscriptions.has(e)) {
            this.valueSubscriptions.get(e)();
        }
        if (t.accelerate && rr.has(e) && this.current instanceof HTMLElement) {
            let { factory, keyframes, times, ease, duration } = t.accelerate;
            let s = new qn({
                element: this.current,
                name: e,
                keyframes,
                times,
                ease,
                duration: T(duration)
            });
            let c = factory(s);
            this.valueSubscriptions.set(e, ()=>{
                c();
                s.cancel();
            });
            return;
        }
        let n = Cn.has(e);
        if (n && this.onBindTransform) {
            this.onBindTransform();
        }
        let r = t.on(`change`, (t)=>{
            this.latestValues[e] = t;
            if (this.props.onUpdate) {
                schedule.preRender(this.notifyUpdate);
            }
            if (n && this.projection) {
                this.projection.isTransformDirty = true;
            }
            this.scheduleRender();
        });
        let i;
        if (typeof window < `u` && window.MotionCheckAppearSync) {
            i = window.MotionCheckAppearSync(this, e, t);
        }
        this.valueSubscriptions.set(e, ()=>{
            r();
            if (i) {
                i();
            }
            if (t.owner) {
                t.stop();
            }
        });
    }
    sortNodePosition(e) {
        if (!this.current || !this.sortInstanceNodePosition || this.type !== e.type) {
            return 0;
        }
        return this.sortInstanceNodePosition(this.current, e.current);
    }
    updateFeatures() {
        let e = `animation`;
        for(e in ha){
            let t = ha[e];
            if (!t) {
                continue;
            }
            let { isEnabled, Feature } = t;
            if (!this.features[e] && Feature && isEnabled(this.props)) {
                this.features[e] = new Feature(this);
            }
            if (this.features[e]) {
                let t = this.features[e];
                if (t.isMounted) {
                    t.update();
                } else {
                    t.mount();
                    t.isMounted = true;
                }
            }
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props);
    }
    measureViewportBox() {
        if (this.current) {
            return this.measureInstanceViewportBox(this.current, this.props);
        }
        return J();
    }
    getStaticValue(e) {
        return this.latestValues[e];
    }
    setStaticValue(e, t) {
        this.latestValues[e] = t;
    }
    update(e, t) {
        if (e.transformTemplate || this.props.transformTemplate) {
            this.scheduleRender();
        }
        this.prevProps = this.props;
        this.props = e;
        this.prevPresenceContext = this.presenceContext;
        this.presenceContext = t;
        for (const n of ma){
            if (this.propEventSubscriptions[n]) {
                this.propEventSubscriptions[n]();
                delete this.propEventSubscriptions[n];
            }
            let r = e[`on` + n];
            if (r) {
                this.propEventSubscriptions[n] = this.on(n, r);
            }
        }
        this.prevMotionValues = la(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues);
        if (this.handleChildMotionValue) {
            this.handleChildMotionValue();
        }
    }
    getProps() {
        return this.props;
    }
    getVariant(e) {
        if (this.props.variants) {
            return this.props.variants[e];
        }
    }
    getDefaultTransition() {
        return this.props.transition;
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
        if (this.isVariantNode) {
            return this;
        }
        if (this.parent) {
            return this.parent.getClosestVariantNode();
        }
    }
    addVariantChild(e) {
        let t = this.getClosestVariantNode();
        if (t) {
            if (t.variantChildren) {
                t.variantChildren.add(e);
            }
            return ()=>t.variantChildren.delete(e);
        }
    }
    addValue(e, t) {
        let n = this.values.get(e);
        if (t !== n) {
            if (n) {
                this.removeValue(e);
            }
            this.bindToMotionValue(e, t);
            this.values.set(e, t);
            this.latestValues[e] = t.get();
        }
    }
    removeValue(e) {
        this.values.delete(e);
        let t = this.valueSubscriptions.get(e);
        if (t) {
            t();
            this.valueSubscriptions.delete(e);
        }
        delete this.latestValues[e];
        this.removeValueFromRenderState(e, this.renderState);
    }
    hasValue(e) {
        return this.values.has(e);
    }
    getValue(e, t) {
        if (this.props.values && this.props.values[e]) {
            return this.props.values[e];
        }
        let n = this.values.get(e);
        if (n === undefined && t !== undefined) {
            n = Mr(t === null ? undefined : t, {
                owner: this
            });
            this.addValue(e, n);
        }
        return n;
    }
    readValue(e, t) {
        let n = this.latestValues[e] !== undefined || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
        if (n != null) {
            if (typeof n == `string` && (g(n) || v(n))) {
                n = parseFloat(n);
            } else if (!Qi(n) && z.test(t)) {
                n = ci(e, t);
            }
            this.setBaseTarget(e, K(n) ? n.get() : n);
        }
        if (K(n)) {
            return n.get();
        }
        return n;
    }
    setBaseTarget(e, t) {
        this.baseTarget[e] = t;
    }
    getBaseTarget(e) {
        let { initial } = this.props;
        let n;
        if (typeof initial == `string` || typeof initial == `object`) {
            let r = Er(this.props, initial, this.presenceContext?.custom);
            if (r) {
                n = r[e];
            }
        }
        if (initial && n !== undefined) {
            return n;
        }
        let r = this.getBaseTargetFromProps(this.props, e);
        if (r !== undefined && !K(r)) {
            return r;
        }
        if (this.initialValues[e] !== undefined && n === undefined) {
            return undefined;
        }
        return this.baseTarget[e];
    }
    on(e, t) {
        if (!this.events[e]) {
            this.events[e] = new w;
        }
        return this.events[e].add(t);
    }
    notify(e, ...t) {
        if (this.events[e]) {
            this.events[e].notify(...t);
        }
    }
    scheduleRenderMicrotask() {
        schedule_1.render(this.render);
    }
}
class ya extends va {
    constructor(){
        super(...arguments);
        this.KeyframeResolver = di;
    }
    sortInstanceNodePosition(e, t) {
        if (e.compareDocumentPosition(t) & 2) {
            return 1;
        }
        return -1;
    }
    getBaseTargetFromProps({ style }, t) {
        if (style) {
            return style[t];
        }
    }
    removeValueFromRenderState(e, { vars, style }) {
        delete vars[e];
        delete style[e];
    }
    handleChildMotionValue() {
        if (this.childSubscription) {
            this.childSubscription();
            delete this.childSubscription;
        }
        let { children } = this.props;
        if (K(children)) {
            this.childSubscription = children.on(`change`, (e)=>{
                if (this.current) {
                    this.current.textContent = `${e}`;
                }
            });
        }
    }
}
class Y {
    constructor(e){
        this.isMounted = false;
        this.node = e;
    }
    update() {}
}
function ba({ top, left, right, bottom }) {
    return {
        x: {
            min: left,
            max: right
        },
        y: {
            min: top,
            max: bottom
        }
    };
}
function xa({ x, y }) {
    return {
        top: y.min,
        right: x.max,
        bottom: y.max,
        left: x.min
    };
}
function Sa(e, t) {
    if (!t) {
        return e;
    }
    let n = t({
        x: e.left,
        y: e.top
    });
    let r = t({
        x: e.right,
        y: e.bottom
    });
    return {
        top: n.y,
        left: n.x,
        bottom: r.y,
        right: r.x
    };
}
function Ta(latestValues) {
    return wa(latestValues) || Ea(latestValues) || latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.skewX || latestValues.skewY;
}
const Ma = 0.999999999999;
const Na = 1.0000000000001;
function Pa(layoutCorrected, treeScale, path, r = false) {
    let n_length = path.length;
    if (!n_length) {
        return;
    }
    treeScale.x = treeScale.y = 1;
    let a;
    let o;
    for(let s = 0; s < n_length; s++){
        a = path[s];
        o = a.projectionDelta;
        let { visualElement } = a.options;
        if (!(visualElement && visualElement.props.style && visualElement.props.style.display === `contents`)) {
            if (r && a.options.layoutScroll && a.scroll && a !== a.root) {
                X(layoutCorrected.x, -a.scroll.offset.x);
                X(layoutCorrected.y, -a.scroll.offset.y);
            }
            if (o) {
                treeScale.x *= o.x.scale;
                treeScale.y *= o.y.scale;
                ja(layoutCorrected, o);
            }
            if (r && Ta(a.latestValues)) {
                La(layoutCorrected, a.latestValues, a.layout?.layoutBox);
            }
        }
    }
    if (treeScale.x < Na && treeScale.x > Ma) {
        treeScale.x = 1;
    }
    if (treeScale.y < Na && treeScale.y > Ma) {
        treeScale.y = 1;
    }
}
function X(e, t) {
    e.min += t;
    e.max += t;
}
function Fa(e, t, n, scale, i = 0.5) {
    Aa(e, t, n, B(e.min, e.max, i), scale);
}
function Ia(e, t) {
    if (typeof e == `string`) {
        return parseFloat(e) / 100 * (t.max - t.min);
    }
    return e;
}
function La(e, latestValues, n) {
    let r = n ?? e;
    Fa(e.x, Ia(latestValues.x, r.x), latestValues.scaleX, latestValues.scale, latestValues.originX);
    Fa(e.y, Ia(latestValues.y, r.y), latestValues.scaleY, latestValues.scale, latestValues.originY);
}
function Ra(e, t) {
    return ba(Sa(e.getBoundingClientRect(), t));
}
function za(dragConstraints_current, root, n) {
    let r = Ra(dragConstraints_current, n);
    let { scroll } = root;
    if (scroll) {
        X(r.x, scroll.offset.x);
        X(r.y, scroll.offset.y);
    }
    return r;
}
const Ba = {
    x: `translateX`,
    y: `translateY`,
    z: `translateZ`,
    transformPerspective: `perspective`
};
const Sn_length = Sn.length;
function Ha(e, transform, n) {
    let r = ``;
    let i = true;
    for(let a = 0; a < Sn_length; a++){
        let o = Sn[a];
        let s = e[o];
        if (s === undefined) {
            continue;
        }
        let c = true;
        if (typeof s == `number`) {
            c = s === +!!o.startsWith(`scale`);
        } else {
            let e = parseFloat(s);
            c = o.startsWith(`scale`) ? e === 1 : e === 0;
        }
        if (!c || n) {
            let e = pi(s, ii[o]);
            if (!c) {
                i = false;
                let t = Ba[o] || o;
                r += `${t}(${e}) `;
            }
            if (n) {
                transform[o] = e;
            }
        }
    }
    r = r.trim();
    if (n) {
        r = n(transform, i ? `` : r);
    } else if (i) {
        r = `none`;
    }
    return r;
}
function Ua(e, t, transformTemplate) {
    let { style, vars, transformOrigin } = e;
    let o = false;
    let s = false;
    for(let e in t){
        let n = t[e];
        if (Cn.has(e)) {
            o = true;
            continue;
        } else if (Ae(e)) {
            vars[e] = n;
            continue;
        } else {
            let t = pi(n, ii[e]);
            if (e.startsWith(`origin`)) {
                s = true;
                transformOrigin[e] = t;
            } else {
                style[e] = t;
            }
        }
    }
    if (!t.transform) {
        if (o || transformTemplate) {
            style.transform = Ha(t, e.transform, transformTemplate);
        } else {
            style.transform &&= `none`;
        }
    }
    if (s) {
        let { originX = `50%`, originY = `50%`, originZ = 0 } = transformOrigin;
        style.transformOrigin = `${originX} ${originY} ${originZ}`;
    }
}
function Wa({ style }, { style: style_1, vars }, r, i) {
    let o;
    for(o in style_1){
        style[o] = style_1[o];
    }
    i?.applyProjectionStyles(style, r);
    for(o in vars){
        style.setProperty(o, vars[o]);
    }
}
function Ga(e, t) {
    if (t.max === t.min) {
        return 0;
    }
    return e / (t.max - t.min) * 100;
}
const Ka = {
    correct: (e, t)=>{
        if (!t.target) {
            return e;
        }
        if (typeof e == `string`) {
            if (L.test(e)) {
                e = parseFloat(e);
            } else {
                return e;
            }
        }
        return `${Ga(e, t.target.x)}% ${Ga(e, t.target.y)}%`;
    }
};
const boxShadow = {
    correct: (e, { treeScale, projectionDelta })=>{
        let r = e;
        let i = z.parse(e);
        if (i.length > 5) {
            return r;
        }
        let a = z.createTransformer(e);
        let o = typeof i[0] == `number` ? 0 : 1;
        let s = projectionDelta.x.scale * treeScale.x;
        let c = projectionDelta.y.scale * treeScale.y;
        i[0 + o] /= s;
        i[1 + o] /= c;
        let l = B(s, c, 0.5);
        if (typeof i[2 + o] == `number`) {
            i[2 + o] /= l;
        }
        if (typeof i[3 + o] == `number`) {
            i[3 + o] /= l;
        }
        return a(i);
    }
};
const Ja = {
    borderRadius: {
        ...Ka,
        applyTo: [
            `borderTopLeftRadius`,
            `borderTopRightRadius`,
            `borderBottomLeftRadius`,
            `borderBottomRightRadius`
        ]
    },
    borderTopLeftRadius: Ka,
    borderTopRightRadius: Ka,
    borderBottomLeftRadius: Ka,
    borderBottomRightRadius: Ka,
    boxShadow
};
function Ya(e, { layout, layoutId }) {
    return Cn.has(e) || e.startsWith(`origin`) || (layout || layoutId !== undefined) && (!!Ja[e] || e === `opacity`);
}
function Xa(e, t, n) {
    let e_style = e.style;
    let i = t?.style;
    let a = {};
    if (!e_style) {
        return a;
    }
    for(let t in e_style){
        if (K(e_style[t]) || i && K(i[t]) || Ya(t, e) || n?.getValue(t)?.liveStyle !== undefined) {
            a[t] = e_style[t];
        }
    }
    return a;
}
function Za(e) {
    return window.getComputedStyle(e);
}
class Qa extends ya {
    constructor(){
        super(...arguments);
        this.type = `html`;
        this.renderInstance = Wa;
    }
    readValueFromInstance(e, t) {
        if (Cn.has(t)) {
            if (this.projection?.isProjecting) {
                return vn(t);
            }
            return bn(e, t);
        }
        {
            let n = Za(e);
            let r = (Ae(t) ? n.getPropertyValue(t) : n[t]) || 0;
            if (typeof r == `string`) {
                return r.trim();
            }
            return r;
        }
    }
    measureInstanceViewportBox(e, { transformPagePoint }) {
        return Ra(e, transformPagePoint);
    }
    build(e, t, n) {
        Ua(e, t, n.transformTemplate);
    }
    scrapeMotionValuesFromProps(e, t, n) {
        return Xa(e, t, n);
    }
}
const $a = {
    offset: `stroke-dashoffset`,
    array: `stroke-dasharray`
};
const eo = {
    offset: `strokeDashoffset`,
    array: `strokeDasharray`
};
function to(attrs, pathLength, n = 1, r = 0, i = true) {
    attrs.pathLength = 1;
    let a = i ? $a : eo;
    attrs[a.offset] = `${-r}`;
    attrs[a.array] = `${pathLength} ${n}`;
}
const no = [
    `offsetDistance`,
    `offsetPath`,
    `offsetRotate`,
    `offsetAnchor`
];
function ro(e, { attrX, attrY, attrScale, pathLength, pathSpacing = 1, pathOffset = 0, ...rest }, c, transformTemplate, u) {
    Ua(e, rest, transformTemplate);
    if (c) {
        if (e.style.viewBox) {
            e.attrs.viewBox = e.style.viewBox;
        }
        return;
    }
    e.attrs = e.style;
    e.style = {};
    let { attrs, style } = e;
    if (attrs.transform) {
        style.transform = attrs.transform;
        delete attrs.transform;
    }
    if (style.transform || attrs.transformOrigin) {
        style.transformOrigin = attrs.transformOrigin ?? `50% 50%`;
        delete attrs.transformOrigin;
    }
    if (style.transform) {
        style.transformBox = u?.transformBox ?? `fill-box`;
        delete attrs.transformBox;
    }
    for (let e of no){
        if (attrs[e] !== undefined) {
            style[e] = attrs[e];
            delete attrs[e];
        }
    }
    if (attrX !== undefined) {
        attrs.x = attrX;
    }
    if (attrY !== undefined) {
        attrs.y = attrY;
    }
    if (attrScale !== undefined) {
        attrs.scale = attrScale;
    }
    if (pathLength !== undefined) {
        to(attrs, pathLength, pathSpacing, pathOffset, false);
    }
}
const io = new Set([
    `baseFrequency`,
    `diffuseConstant`,
    `kernelMatrix`,
    `kernelUnitLength`,
    `keySplines`,
    `keyTimes`,
    `limitingConeAngle`,
    `markerHeight`,
    `markerWidth`,
    `numOctaves`,
    `targetX`,
    `targetY`,
    `surfaceScale`,
    `specularConstant`,
    `specularExponent`,
    `stdDeviation`,
    `tableValues`,
    `viewBox`,
    `gradientTransform`,
    `pathLength`,
    `startOffset`,
    `textLength`,
    `lengthAdjust`
]);
const ao = (e)=>typeof e == `string` && e.toLowerCase() === `svg`;
function oo(e, t, n, r) {
    Wa(e, t, undefined, r);
    for(let n in t.attrs){
        e.setAttribute(io.has(n) ? n : zr(n), t.attrs[n]);
    }
}
function so(e, t, n) {
    let r = Xa(e, t, n);
    for(let n in e){
        if (K(e[n]) || K(t[n])) {
            let t = Sn.indexOf(n) === -1 ? n : `attr` + n.charAt(0).toUpperCase() + n.substring(1);
            r[t] = e[n];
        }
    }
    return r;
}
class co extends ya {
    constructor(){
        super(...arguments);
        this.type = `svg`;
        this.isSVGTag = false;
        this.measureInstanceViewportBox = J;
    }
    getBaseTargetFromProps(e, t) {
        return e[t];
    }
    readValueFromInstance(e, t) {
        if (Cn.has(t)) {
            let e = oi(t);
            return e && e.default || 0;
        }
        t = io.has(t) ? t : zr(t);
        return e.getAttribute(t);
    }
    scrapeMotionValuesFromProps(e, t, n) {
        return so(e, t, n);
    }
    build(e, t, n) {
        ro(e, t, this.isSVGTag, n.transformTemplate, n.style);
    }
    renderInstance(e, t, n, r) {
        oo(e, t, n, r);
    }
    mount(e) {
        this.isSVGTag = ao(e.tagName);
        super.mount(e);
    }
}
const oa_length = oa.length;
function uo(parent) {
    if (!parent) {
        return;
    }
    if (!parent.isControllingVariants) {
        let t = parent.parent && uo(parent.parent) || {};
        if (parent.props.initial !== undefined) {
            t.initial = parent.props.initial;
        }
        return t;
    }
    let t = {};
    for(let n = 0; n < oa_length; n++){
        let r = oa[n];
        let i = parent.props[r];
        if (ia(i) || i === false) {
            t[r] = i;
        }
    }
    return t;
}
function fo(e, t) {
    if (!Array.isArray(t)) {
        return false;
    }
    let t_length = t.length;
    if (t_length !== e.length) {
        return false;
    }
    for(let r = 0; r < t_length; r++){
        if (t[r] !== e[r]) {
            return false;
        }
    }
    return true;
}
const po = [
    ...aa
].reverse();
const aa_length = aa.length;
function ho(e) {
    return (t)=>Promise.all(t.map(({ animation, options })=>Kr(e, animation, options)));
}
function go(e) {
    let t = ho(e);
    let n = yo();
    let r = true;
    let i = false;
    let a = (t)=>(n, r)=>{
            let i = G(e, r, t === `exit` ? e.presenceContext?.custom : undefined);
            if (i) {
                let { transition, transitionEnd, ...rest } = i;
                n = {
                    ...n,
                    ...rest,
                    ...transitionEnd
                };
            }
            return n;
        };
    function setAnimateFunction(n) {
        t = n(e);
    }
    function animateChanges(o) {
        let { props } = e;
        let c = uo(e.parent) || {};
        let l = [];
        let u = new Set;
        let d = {};
        let f = Infinity;
        for(let t = 0; t < aa_length; t++){
            let p = po[t];
            let m = n[p];
            let h = props[p] === undefined ? c[p] : props[p];
            let g = ia(h);
            let _ = p === o ? m.isActive : null;
            if (_ === false) {
                f = t;
            }
            let v = h === c[p] && h !== props[p] && g;
            if (v && (r || i) && e.manuallyAnimateOnMount) {
                v = false;
            }
            m.protectedKeys = {
                ...d
            };
            if (!m.isActive && _ === null || !h && !m.prevProp || ra(h) || typeof h == `boolean`) {
                continue;
            }
            if (p === `exit` && m.isActive && _ !== true) {
                if (m.prevResolvedValues) {
                    d = {
                        ...d,
                        ...m.prevResolvedValues
                    };
                }
                continue;
            }
            let y = _o(m.prevProp, h);
            let b = y || p === o && m.isActive && !v && g || t > f && g;
            let x = false;
            let S = Array.isArray(h) ? h : [
                h
            ];
            let C = S.reduce(a(p), {});
            if (_ === false) {
                C = {};
            }
            let { prevResolvedValues = {} } = m;
            let T = {
                ...prevResolvedValues,
                ...C
            };
            let E = (t)=>{
                b = true;
                if (u.has(t)) {
                    x = true;
                    u.delete(t);
                }
                m.needsAnimating[t] = true;
                let n = e.getValue(t);
                if (n) {
                    n.liveStyle = false;
                }
            };
            for(let e in T){
                let t = C[e];
                let n = prevResolvedValues[e];
                if (d.hasOwnProperty(e)) {
                    continue;
                }
                let r = false;
                r = Nr(t) && Nr(n) ? !fo(t, n) : t !== n;
                if (r) {
                    if (t == null) {
                        u.add(e);
                    } else {
                        E(e);
                    }
                } else if (t !== undefined && u.has(e)) {
                    E(e);
                } else {
                    m.protectedKeys[e] = true;
                }
            }
            m.prevProp = h;
            m.prevResolvedValues = C;
            if (m.isActive) {
                d = {
                    ...d,
                    ...C
                };
            }
            if ((r || i) && e.blockInitialAnimation) {
                b = false;
            }
            let D = v && y;
            if (b && (!D || x)) {
                l.push(...S.map((t)=>{
                    let options = {
                        type: p
                    };
                    if (typeof t == `string` && (r || i) && !D && e.manuallyAnimateOnMount && e.parent) {
                        let { parent } = e;
                        let i = G(parent, t);
                        if (parent.enteringChildren && i) {
                            let { delayChildren } = i.transition || {};
                            options.delay = dr(parent.enteringChildren, e, delayChildren);
                        }
                    }
                    return {
                        animation: t,
                        options
                    };
                }));
            }
        }
        if (u.size) {
            let t = {};
            if (typeof props.initial != `boolean`) {
                let n = G(e, Array.isArray(props.initial) ? props.initial[0] : props.initial);
                if (n && n.transition) {
                    t.transition = n.transition;
                }
            }
            u.forEach((n)=>{
                let r = e.getBaseTarget(n);
                let i = e.getValue(n);
                if (i) {
                    i.liveStyle = true;
                }
                t[n] = r ?? null;
            });
            l.push({
                animation: t
            });
        }
        let p = !!l.length;
        if (r && (props.initial === false || props.initial === props.animate) && !e.manuallyAnimateOnMount) {
            p = false;
        }
        r = false;
        i = false;
        if (p) {
            return t(l);
        }
        return Promise.resolve();
    }
    function setActive(t, r) {
        if (n[t].isActive === r) {
            return Promise.resolve();
        }
        e.variantChildren?.forEach((e)=>e.animationState?.setActive(t, r));
        n[t].isActive = r;
        let i = animateChanges(t);
        for(let e in n){
            n[e].protectedKeys = {};
        }
        return i;
    }
    return {
        animateChanges,
        setActive,
        setAnimateFunction,
        getState: ()=>n,
        reset: ()=>{
            n = yo();
            i = true;
        }
    };
}
function _o(prevProp, t) {
    if (typeof t == `string`) {
        return t !== prevProp;
    }
    if (Array.isArray(t)) {
        return !fo(t, prevProp);
    }
    return false;
}
function xo(e, t) {
    e.translate = t.translate;
    e.scale = t.scale;
    e.originPoint = t.originPoint;
    e.origin = t.origin;
}
const So = 0.9999;
const Co = 1.0001;
const wo = -0.01;
const To = 0.01;
function Q(e) {
    return e.max - e.min;
}
function Eo(e, t, n) {
    return Math.abs(e - t) <= n;
}
function Do(e, t, n, r = 0.5) {
    e.origin = r;
    e.originPoint = B(t.min, t.max, e.origin);
    e.scale = Q(n) / Q(t);
    e.translate = B(n.min, n.max, e.origin) - e.originPoint;
    if (e.scale >= So && e.scale <= Co || isNaN(e.scale)) {
        e.scale = 1;
    }
    if (e.translate >= wo && e.translate <= To || isNaN(e.translate)) {
        e.translate = 0;
    }
}
function Oo(e, t, n, r) {
    Do(e.x, t.x, n.x, r ? r.originX : undefined);
    Do(e.y, t.y, n.y, r ? r.originY : undefined);
}
function ko(e, t, n, r = 0) {
    e.min = (r ? B(n.min, n.max, r) : n.min) + t.min;
    e.max = e.min + Q(t);
}
function Ao(target, relativeTarget, n, r) {
    ko(target.x, relativeTarget.x, n.x, r?.x);
    ko(target.y, relativeTarget.y, n.y, r?.y);
}
function jo(e, t, n, r = 0) {
    let i = r ? B(n.min, n.max, r) : n.min;
    e.min = t.min - i;
    e.max = e.min + Q(t);
}
function Mo(e, t, n, r) {
    jo(e.x, t.x, n.x, r?.x);
    jo(e.y, t.y, n.y, r?.y);
}
function No(e, t, n, r, scale) {
    e -= t;
    e = Oa(e, 1 / n, r);
    if (scale !== undefined) {
        e = Oa(e, 1 / scale, r);
    }
    return e;
}
function Po(e, t = 0, n = 1, r = 0.5, scale, a = e, o = e) {
    if (I.test(t)) {
        t = parseFloat(t);
        t = B(o.min, o.max, t / 100) - o.min;
    }
    if (typeof t != `number`) {
        return;
    }
    let s = B(a.min, a.max, r);
    if (e === a) {
        s -= t;
    }
    e.min = No(e.min, t, n, s, scale);
    e.max = No(e.max, t, n, s, scale);
}
function Fo(e, latestValues, [n, r, i], a, o) {
    Po(e, latestValues[n], latestValues[r], latestValues[i], latestValues.scale, a, o);
}
const Io = [
    `x`,
    `scaleX`,
    `originX`
];
const Lo = [
    `y`,
    `scaleY`,
    `originY`
];
function Ro(e, latestValues, n, r) {
    Fo(e.x, latestValues, Io, n ? n.x : undefined, r ? r.x : undefined);
    Fo(e.y, latestValues, Lo, n ? n.y : undefined, r ? r.y : undefined);
}
function Go(e) {
    return Q(e.x) / Q(e.y);
}
function Ko(e, t) {
    return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint;
}
function $(e) {
    return [
        e(`x`),
        e(`y`)
    ];
}
function qo(projectionDeltaWithTransform, treeScale, n) {
    let r = ``;
    let i = projectionDeltaWithTransform.x.translate / treeScale.x;
    let a = projectionDeltaWithTransform.y.translate / treeScale.y;
    let o = n?.z || 0;
    if (i || a || o) {
        r = `translate3d(${i}px, ${a}px, ${o}px) `;
    }
    if (treeScale.x !== 1 || treeScale.y !== 1) {
        r += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
    }
    if (n) {
        let { transformPerspective, rotate, rotateX, rotateY, skewX, skewY } = n;
        if (transformPerspective) {
            r = `perspective(${transformPerspective}px) ${r}`;
        }
        if (rotate) {
            r += `rotate(${rotate}deg) `;
        }
        if (rotateX) {
            r += `rotateX(${rotateX}deg) `;
        }
        if (rotateY) {
            r += `rotateY(${rotateY}deg) `;
        }
        if (skewX) {
            r += `skewX(${skewX}deg) `;
        }
        if (skewY) {
            r += `skewY(${skewY}deg) `;
        }
    }
    let s = projectionDeltaWithTransform.x.scale * treeScale.x;
    let c = projectionDeltaWithTransform.y.scale * treeScale.y;
    if (s !== 1 || c !== 1) {
        r += `scale(${s}, ${c})`;
    }
    return r || `none`;
}
const Jo = [
    `borderTopLeftRadius`,
    `borderTopRightRadius`,
    `borderBottomLeftRadius`,
    `borderBottomRightRadius`
];
const Jo_length = Jo.length;
const Xo = (e)=>{
    if (typeof e == `string`) {
        return parseFloat(e);
    }
    return e;
};
const Zo = (e)=>typeof e == `number` || L.test(e);
function Qo(e, t, latestValues, r, i, a) {
    if (i) {
        e.opacity = B(0, latestValues.opacity ?? 1, es(r));
        e.opacityExit = B(t.opacity ?? 1, 0, ts(r));
    } else if (a) {
        e.opacity = B(t.opacity ?? 1, latestValues.opacity ?? 1, r);
    }
    for(let i = 0; i < Jo_length; i++){
        let a = Jo[i];
        let o = $o(t, a);
        let s = $o(latestValues, a);
        if (!(o === undefined && s === undefined)) {
            o ||= 0;
            s ||= 0;
            if (o === 0 || s === 0 || Zo(o) === Zo(s)) {
                e[a] = Math.max(B(Xo(o), Xo(s), r), 0);
                if (I.test(s) || I.test(o)) {
                    e[a] += `%`;
                }
            } else {
                e[a] = s;
            }
        }
    }
    if (t.rotate || latestValues.rotate) {
        e.rotate = B(t.rotate || 0, latestValues.rotate || 0, r);
    }
}
function $o(e, t) {
    if (e[t] === undefined) {
        return e.borderRadius;
    }
    return e[t];
}
var es = ns(0, 0.5, circOut);
var ts = ns(0.5, 0.95, linear);
function ns(e, t, n) {
    return (r)=>{
        if (r < e) {
            return 0;
        }
        if (r > t) {
            return 1;
        }
        return n(C(e, t, r));
    };
}
function rs(motionValue, t, n) {
    let r = K(motionValue) ? motionValue : Mr(motionValue);
    r.start(wr(``, r, t, n));
    return r.animation;
}
function is(e, t, n, r = {
    passive: true
}) {
    e.addEventListener(t, n, r);
    return ()=>e.removeEventListener(t, n);
}
const as = (e, t)=>e.depth - t.depth;
class os {
    constructor(){
        this.children = [];
        this.isDirty = false;
    }
    add(e) {
        f(this.children, e);
        this.isDirty = true;
    }
    remove(e) {
        p(this.children, e);
        this.isDirty = true;
    }
    forEach(e) {
        if (this.isDirty) {
            this.children.sort(as);
        }
        this.isDirty = false;
        this.children.forEach(e);
    }
}
function ss(e, t) {
    let n = M.now();
    let r = ({ timestamp })=>{
        let a = timestamp - n;
        if (a >= t) {
            cancel(r);
            e(a - t);
        }
    };
    schedule.setup(r, true);
    return ()=>cancel(r);
}
function cs(e) {
    if (K(e)) {
        return e.get();
    }
    return e;
}
class ls {
    constructor(){
        this.members = [];
    }
    add(e) {
        f(this.members, e);
        for(let t = this.members.length - 1; t >= 0; t--){
            let n = this.members[t];
            if (n === e || n === this.lead || n === this.prevLead) {
                continue;
            }
            let r = n.instance;
            if ((!r || r.isConnected === false) && !n.snapshot) {
                p(this.members, n);
                n.unmount();
            }
        }
        e.scheduleRender();
    }
    remove(e) {
        p(this.members, e);
        if (e === this.prevLead) {
            this.prevLead = undefined;
        }
        if (e === this.lead) {
            let e = this.members[this.members.length - 1];
            if (e) {
                this.promote(e);
            }
        }
    }
    relegate(e) {
        for(let t = this.members.indexOf(e) - 1; t >= 0; t--){
            let e = this.members[t];
            if (e.isPresent !== false && e.instance?.isConnected !== false) {
                this.promote(e);
                return true;
            }
        }
        return false;
    }
    promote(e, t) {
        let lead = this.lead;
        if (e !== lead && (this.prevLead = lead, this.lead = e, e.show(), lead)) {
            lead.updateSnapshot();
            e.scheduleRender();
            let { layoutDependency } = lead.options;
            let { layoutDependency: layoutDependency_1 } = e.options;
            if (layoutDependency === undefined || layoutDependency !== layoutDependency_1) {
                e.resumeFrom = lead;
                if (t) {
                    lead.preserveOpacity = true;
                }
                if (lead.snapshot) {
                    e.snapshot = lead.snapshot;
                    e.snapshot.latestValues = lead.animationValues || lead.latestValues;
                }
                if (e.root?.isUpdating) {
                    e.isLayoutDirty = true;
                }
            }
            if (e.options.crossfade === false) {
                lead.hide();
            }
        }
    }
    exitAnimationComplete() {
        this.members.forEach((e)=>{
            e.options.onExitComplete?.();
            e.resumingFrom?.options.onExitComplete?.();
        });
    }
    scheduleRender() {
        this.members.forEach((e)=>e.instance && e.scheduleRender(false));
    }
    removeLeadSnapshot() {
        if (this.lead?.snapshot) {
            this.lead.snapshot = undefined;
        }
    }
}
const us = {
    hasAnimatedSinceResize: true,
    hasEverUpdated: false
};
const ds = {
    nodes: 0,
    calculatedTargetDeltas: 0,
    calculatedProjections: 0
};
const fs = [
    ``,
    `X`,
    `Y`,
    `Z`
];
const ps = 1000;
let ms = 0;
function hs(e, visualElement, n, animationValues) {
    let { latestValues } = visualElement;
    if (latestValues[e]) {
        n[e] = latestValues[e];
        visualElement.setStaticValue(e, 0);
        if (animationValues) {
            animationValues[e] = 0;
        }
    }
}
function gs(e) {
    e.hasCheckedOptimisedAppear = true;
    if (e.root === e) {
        return;
    }
    let { visualElement } = e.options;
    if (!visualElement) {
        return;
    }
    let n = Vr(visualElement);
    if (window.MotionHasOptimisedAnimation(n, `transform`)) {
        let { layout, layoutId } = e.options;
        window.MotionCancelOptimisedAnimation(n, `transform`, schedule, !(layout || layoutId));
    }
    let { parent } = e;
    if (parent && !parent.hasCheckedOptimisedAppear) {
        gs(parent);
    }
}
function _s({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
    return class {
        constructor(e = {}, n = defaultParent?.()){
            this.id = ms++;
            this.animationId = 0;
            this.animationCommitId = 0;
            this.children = new Set;
            this.options = {};
            this.isTreeAnimating = false;
            this.isAnimationBlocked = false;
            this.isLayoutDirty = false;
            this.isProjectionDirty = false;
            this.isSharedProjectionDirty = false;
            this.isTransformDirty = false;
            this.updateManuallyBlocked = false;
            this.updateBlockedByResize = false;
            this.isUpdating = false;
            this.isSVG = false;
            this.needsReset = false;
            this.shouldResetTransform = false;
            this.hasCheckedOptimisedAppear = false;
            this.treeScale = {
                x: 1,
                y: 1
            };
            this.eventHandlers = new Map;
            this.hasTreeAnimated = false;
            this.layoutVersion = 0;
            this.updateScheduled = false;
            this.scheduleUpdate = ()=>this.update();
            this.projectionUpdateScheduled = false;
            this.checkUpdateFailed = ()=>{
                if (this.isUpdating) {
                    this.isUpdating = false;
                    this.clearAllSnapshots();
                }
            };
            this.updateProjection = ()=>{
                this.projectionUpdateScheduled = false;
                if (O.value) {
                    ds.nodes = ds.calculatedTargetDeltas = ds.calculatedProjections = 0;
                }
                this.nodes.forEach(bs);
                this.nodes.forEach(ks);
                this.nodes.forEach(As);
                this.nodes.forEach(xs);
                if (O.addProjectionMetrics) {
                    O.addProjectionMetrics(ds);
                }
            };
            this.resolvedRelativeTargetAt = 0;
            this.linkedParentVersion = 0;
            this.hasProjected = false;
            this.isVisible = true;
            this.animationProgress = 0;
            this.sharedNodes = new Map;
            this.latestValues = e;
            this.root = n ? n.root || n : this;
            this.path = n ? [
                ...n.path,
                n
            ] : [];
            this.parent = n;
            this.depth = n ? n.depth + 1 : 0;
            for(let e = 0; e < this.path.length; e++){
                this.path[e].shouldResetTransform = true;
            }
            if (this.root === this) {
                this.nodes = new os;
            }
        }
        addEventListener(e, t) {
            if (!this.eventHandlers.has(e)) {
                this.eventHandlers.set(e, new w);
            }
            return this.eventHandlers.get(e).add(t);
        }
        notifyListeners(e, ...t) {
            let n = this.eventHandlers.get(e);
            if (n) {
                n.notify(...t);
            }
        }
        hasListeners(e) {
            return this.eventHandlers.has(e);
        }
        mount(t) {
            if (this.instance) {
                return;
            }
            this.isSVG = Fi(t) && !Xi(t);
            this.instance = t;
            let { layoutId, layout, visualElement } = this.options;
            if (visualElement && !visualElement.current) {
                visualElement.mount(t);
            }
            this.root.nodes.add(this);
            if (this.parent) {
                this.parent.children.add(this);
            }
            if (this.root.hasTreeAnimated && (layout || layoutId)) {
                this.isLayoutDirty = true;
            }
            if (attachResizeListener) {
                let n;
                let r = 0;
                let i = ()=>this.root.updateBlockedByResize = false;
                schedule.read(()=>{
                    r = window.innerWidth;
                });
                attachResizeListener(t, ()=>{
                    let window_innerWidth = window.innerWidth;
                    if (window_innerWidth !== r) {
                        r = window_innerWidth;
                        this.root.updateBlockedByResize = true;
                        if (n) {
                            n();
                        }
                        n = ss(i, 250);
                        if (us.hasAnimatedSinceResize) {
                            us.hasAnimatedSinceResize = false;
                            this.nodes.forEach(Os);
                        }
                    }
                });
            }
            if (layoutId) {
                this.root.registerSharedNode(layoutId, this);
            }
            if (this.options.animate !== false && visualElement && (layoutId || layout)) {
                this.addEventListener(`didUpdate`, ({ delta, hasLayoutChanged, hasRelativeLayoutChanged, layout })=>{
                    if (this.isTreeAnimationBlocked()) {
                        this.target = undefined;
                        this.relativeTarget = undefined;
                        return;
                    }
                    let a = this.options.transition || visualElement.getDefaultTransition() || Ls;
                    let { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
                    let c = !this.targetLayout || !Wo(this.targetLayout, layout);
                    let l = !hasLayoutChanged && hasRelativeLayoutChanged;
                    if (this.options.layoutRoot || this.resumeFrom || l || hasLayoutChanged && (c || !this.currentAnimation)) {
                        if (this.resumeFrom) {
                            this.resumingFrom = this.resumeFrom;
                            this.resumingFrom.resumingFrom = undefined;
                        }
                        let t = {
                            ...xr(a, `layout`),
                            onPlay: onLayoutAnimationStart,
                            onComplete: onLayoutAnimationComplete
                        };
                        if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
                            t.delay = 0;
                            t.type = false;
                        }
                        this.startAnimation(t);
                        this.setAnimationOrigin(delta, l);
                    } else {
                        if (!hasLayoutChanged) {
                            Os(this);
                        }
                        if (this.isLead() && this.options.onExitComplete) {
                            this.options.onExitComplete();
                        }
                    }
                    this.targetLayout = layout;
                });
            }
        }
        unmount() {
            if (this.options.layoutId) {
                this.willUpdate();
            }
            this.root.nodes.remove(this);
            let e = this.getStack();
            if (e) {
                e.remove(this);
            }
            if (this.parent) {
                this.parent.children.delete(this);
            }
            this.instance = undefined;
            this.eventHandlers.clear();
            cancel(this.updateProjection);
        }
        blockUpdate() {
            this.updateManuallyBlocked = true;
        }
        unblockUpdate() {
            this.updateManuallyBlocked = false;
        }
        isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
        }
        isTreeAnimationBlocked() {
            return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
        }
        startUpdate() {
            if (!this.isUpdateBlocked()) {
                this.isUpdating = true;
                if (this.nodes) {
                    this.nodes.forEach(js);
                }
                this.animationId++;
            }
        }
        getTransformTemplate() {
            let { visualElement } = this.options;
            return visualElement && visualElement.getProps().transformTemplate;
        }
        willUpdate(e = true) {
            this.root.hasTreeAnimated = true;
            if (this.root.isUpdateBlocked()) {
                if (this.options.onExitComplete) {
                    this.options.onExitComplete();
                }
                return;
            }
            if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear) {
                gs(this);
            }
            if (!this.root.isUpdating) {
                this.root.startUpdate();
            }
            if (this.isLayoutDirty) {
                return;
            }
            this.isLayoutDirty = true;
            for(let e = 0; e < this.path.length; e++){
                let t = this.path[e];
                t.shouldResetTransform = true;
                if (typeof t.latestValues.x == `string` || typeof t.latestValues.y == `string`) {
                    t.isLayoutDirty = true;
                }
                t.updateScroll(`snapshot`);
                if (t.options.layoutRoot) {
                    t.willUpdate(false);
                }
            }
            let { layoutId, layout } = this.options;
            if (layoutId === undefined && !layout) {
                return;
            }
            let r = this.getTransformTemplate();
            this.prevTransformTemplateValue = r ? r(this.latestValues, ``) : undefined;
            this.updateSnapshot();
            if (e) {
                this.notifyListeners(`willUpdate`);
            }
        }
        update() {
            this.updateScheduled = false;
            if (this.isUpdateBlocked()) {
                let e = this.updateBlockedByResize;
                this.unblockUpdate();
                this.updateBlockedByResize = false;
                this.clearAllSnapshots();
                if (e) {
                    this.nodes.forEach(ws);
                }
                this.nodes.forEach(Cs);
                return;
            }
            if (this.animationId <= this.animationCommitId) {
                this.nodes.forEach(Ts);
                return;
            }
            this.animationCommitId = this.animationId;
            if (this.isUpdating) {
                this.isUpdating = false;
                this.nodes.forEach(Es);
                this.nodes.forEach(Ds);
                this.nodes.forEach(vs);
                this.nodes.forEach(ys);
            } else {
                this.nodes.forEach(Ts);
            }
            this.clearAllSnapshots();
            let e = M.now();
            state.delta = m(0, 1000 / 60, e - state.timestamp);
            state.timestamp = e;
            state.isProcessing = true;
            steps.update.process(state);
            steps.preRender.process(state);
            steps.render.process(state);
            state.isProcessing = false;
        }
        didUpdate() {
            if (!this.updateScheduled) {
                this.updateScheduled = true;
                schedule_1.read(this.scheduleUpdate);
            }
        }
        clearAllSnapshots() {
            this.nodes.forEach(Ss);
            this.sharedNodes.forEach(Ms);
        }
        scheduleUpdateProjection() {
            if (!this.projectionUpdateScheduled) {
                this.projectionUpdateScheduled = true;
                schedule.preRender(this.updateProjection, false, true);
            }
        }
        scheduleCheckAfterUnmount() {
            schedule.postRender(()=>{
                if (this.isLayoutDirty) {
                    this.root.didUpdate();
                } else {
                    this.root.checkUpdateFailed();
                }
            });
        }
        updateSnapshot() {
            if (!(this.snapshot || !this.instance)) {
                this.snapshot = this.measure();
                if (this.snapshot && !Q(this.snapshot.measuredBox.x) && !Q(this.snapshot.measuredBox.y)) {
                    this.snapshot = undefined;
                }
            }
        }
        updateLayout() {
            if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)) {
                return;
            }
            if (this.resumeFrom && !this.resumeFrom.instance) {
                for(let e = 0; e < this.path.length; e++){
                    this.path[e].updateScroll();
                }
            }
            let layout = this.layout;
            this.layout = this.measure(false);
            this.layoutVersion++;
            this.layoutCorrected ||= J();
            this.isLayoutDirty = false;
            this.projectionDelta = undefined;
            this.notifyListeners(`measure`, this.layout.layoutBox);
            let { visualElement } = this.options;
            if (visualElement) {
                visualElement.notify(`LayoutMeasure`, this.layout.layoutBox, layout ? layout.layoutBox : undefined);
            }
        }
        updateScroll(phase = `measure`) {
            let t = !!(this.options.layoutScroll && this.instance);
            if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
                t = false;
            }
            if (t && this.instance) {
                let isRoot = checkIsScrollRoot(this.instance);
                this.scroll = {
                    animationId: this.root.animationId,
                    phase,
                    isRoot,
                    offset: measureScroll(this.instance),
                    wasRoot: this.scroll ? this.scroll.isRoot : isRoot
                };
            }
        }
        resetTransform() {
            if (!resetTransform) {
                return;
            }
            let e = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
            let t = this.projectionDelta && !Bo(this.projectionDelta);
            let n = this.getTransformTemplate();
            let r = n ? n(this.latestValues, ``) : undefined;
            let a = r !== this.prevTransformTemplateValue;
            if (e && this.instance && (t || Ta(this.latestValues) || a)) {
                resetTransform(this.instance, r);
                this.shouldResetTransform = false;
                this.scheduleRender();
            }
        }
        measure(e = true) {
            let measuredBox = this.measurePageBox();
            let layoutBox = this.removeElementScroll(measuredBox);
            if (e) {
                layoutBox = this.removeTransform(layoutBox);
            }
            Vs(layoutBox);
            return {
                animationId: this.root.animationId,
                measuredBox,
                layoutBox,
                latestValues: {},
                source: this.id
            };
        }
        measurePageBox() {
            let { visualElement } = this.options;
            if (!visualElement) {
                return J();
            }
            let t = visualElement.measureViewportBox();
            if (!(this.scroll?.wasRoot || this.path.some(Us))) {
                let { scroll } = this.root;
                if (scroll) {
                    X(t.x, scroll.offset.x);
                    X(t.y, scroll.offset.y);
                }
            }
            return t;
        }
        removeElementScroll(e) {
            let t = J();
            Z(t, e);
            if (this.scroll?.wasRoot) {
                return t;
            }
            for(let n = 0; n < this.path.length; n++){
                let r = this.path[n];
                let { scroll, options } = r;
                if (r !== this.root && scroll && options.layoutScroll) {
                    if (scroll.wasRoot) {
                        Z(t, e);
                    }
                    X(t.x, scroll.offset.x);
                    X(t.y, scroll.offset.y);
                }
            }
            return t;
        }
        applyTransform(e, t = false, n) {
            let r = n || J();
            Z(r, e);
            for(let e = 0; e < this.path.length; e++){
                let n = this.path[e];
                if (!t && n.options.layoutScroll && n.scroll && n !== n.root) {
                    X(r.x, -n.scroll.offset.x);
                    X(r.y, -n.scroll.offset.y);
                }
                if (Ta(n.latestValues)) {
                    La(r, n.latestValues, n.layout?.layoutBox);
                }
            }
            if (Ta(this.latestValues)) {
                La(r, this.latestValues, this.layout?.layoutBox);
            }
            return r;
        }
        removeTransform(e) {
            let t = J();
            Z(t, e);
            for(let e = 0; e < this.path.length; e++){
                let n = this.path[e];
                if (!Ta(n.latestValues)) {
                    continue;
                }
                let r;
                if (n.instance) {
                    if (wa(n.latestValues)) {
                        n.updateSnapshot();
                    }
                    r = J();
                    Z(r, n.measurePageBox());
                }
                Ro(t, n.latestValues, n.snapshot?.layoutBox, r);
            }
            if (Ta(this.latestValues)) {
                Ro(t, this.latestValues);
            }
            return t;
        }
        setTargetDelta(e) {
            this.targetDelta = e;
            this.root.scheduleUpdateProjection();
            this.isProjectionDirty = true;
        }
        setOptions(e) {
            this.options = {
                ...this.options,
                ...e,
                crossfade: e.crossfade === undefined ? true : e.crossfade
            };
        }
        clearMeasurements() {
            this.scroll = undefined;
            this.layout = undefined;
            this.snapshot = undefined;
            this.prevTransformTemplateValue = undefined;
            this.targetDelta = undefined;
            this.target = undefined;
            this.isLayoutDirty = false;
        }
        forceRelativeParentToResolveTarget() {
            if (this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== state.timestamp) {
                this.relativeParent.resolveTargetDelta(true);
            }
        }
        resolveTargetDelta(e = false) {
            let t = this.getLead();
            this.isProjectionDirty ||= t.isProjectionDirty;
            this.isTransformDirty ||= t.isTransformDirty;
            this.isSharedProjectionDirty ||= t.isSharedProjectionDirty;
            let n = !!this.resumingFrom || this !== t;
            if (!(e || n && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) {
                return;
            }
            let { layout, layoutId } = this.options;
            if (!this.layout || !(layout || layoutId)) {
                return;
            }
            this.resolvedRelativeTargetAt = state.timestamp;
            let a = this.getClosestProjectingParent();
            if (a && this.linkedParentVersion !== a.layoutVersion && !a.options.layoutRoot) {
                this.removeRelativeTarget();
            }
            if (!this.targetDelta && !this.relativeTarget) {
                if (this.options.layoutAnchor !== false && a && a.layout) {
                    this.createRelativeTarget(a, this.layout.layoutBox, a.layout.layoutBox);
                } else {
                    this.removeRelativeTarget();
                }
            }
            if (!(!this.relativeTarget && !this.targetDelta)) {
                if (!this.target) {
                    this.target = J();
                    this.targetWithTransforms = J();
                }
                if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
                    this.forceRelativeParentToResolveTarget();
                    Ao(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || undefined);
                } else if (this.targetDelta) {
                    if (this.resumingFrom) {
                        this.applyTransform(this.layout.layoutBox, false, this.target);
                    } else {
                        Z(this.target, this.layout.layoutBox);
                    }
                    ja(this.target, this.targetDelta);
                } else {
                    Z(this.target, this.layout.layoutBox);
                }
                if (this.attemptToResolveRelativeTarget) {
                    this.attemptToResolveRelativeTarget = false;
                    if (this.options.layoutAnchor !== false && a && !!a.resumingFrom == !!this.resumingFrom && !a.options.layoutScroll && a.target && this.animationProgress !== 1) {
                        this.createRelativeTarget(a, this.target, a.target);
                    } else {
                        this.relativeParent = this.relativeTarget = undefined;
                    }
                }
                if (O.value) {
                    ds.calculatedTargetDeltas++;
                }
            }
        }
        getClosestProjectingParent() {
            if (!(!this.parent || wa(this.parent.latestValues) || Ea(this.parent.latestValues))) {
                if (this.parent.isProjecting()) {
                    return this.parent;
                }
                return this.parent.getClosestProjectingParent();
            }
        }
        isProjecting() {
            return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
        }
        createRelativeTarget(e, t, n) {
            this.relativeParent = e;
            this.linkedParentVersion = e.layoutVersion;
            this.forceRelativeParentToResolveTarget();
            this.relativeTarget = J();
            this.relativeTargetOrigin = J();
            Mo(this.relativeTargetOrigin, t, n, this.options.layoutAnchor || undefined);
            Z(this.relativeTarget, this.relativeTargetOrigin);
        }
        removeRelativeTarget() {
            this.relativeParent = this.relativeTarget = undefined;
        }
        calcProjection() {
            let e = this.getLead();
            let t = !!this.resumingFrom || this !== e;
            let n = true;
            if (this.isProjectionDirty || this.parent?.isProjectionDirty) {
                n = false;
            }
            if (t && (this.isSharedProjectionDirty || this.isTransformDirty)) {
                n = false;
            }
            if (this.resolvedRelativeTargetAt === state.timestamp) {
                n = false;
            }
            if (n) {
                return;
            }
            let { layout, layoutId } = this.options;
            this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
            if (!this.isTreeAnimating) {
                this.targetDelta = this.relativeTarget = undefined;
            }
            if (!this.layout || !(layout || layoutId)) {
                return;
            }
            Z(this.layoutCorrected, this.layout.layoutBox);
            let a = this.treeScale.x;
            let o = this.treeScale.y;
            Pa(this.layoutCorrected, this.treeScale, this.path, t);
            if (e.layout && !e.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
                e.target = e.layout.layoutBox;
                e.targetWithTransforms = J();
            }
            let { target } = e;
            if (!target) {
                if (this.prevProjectionDelta) {
                    this.createProjectionDeltas();
                    this.scheduleRender();
                }
                return;
            }
            if (!this.projectionDelta || !this.prevProjectionDelta) {
                this.createProjectionDeltas();
            } else {
                xo(this.prevProjectionDelta.x, this.projectionDelta.x);
                xo(this.prevProjectionDelta.y, this.projectionDelta.y);
            }
            Oo(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
            if (this.treeScale.x !== a || this.treeScale.y !== o || !Ko(this.projectionDelta.x, this.prevProjectionDelta.x) || !Ko(this.projectionDelta.y, this.prevProjectionDelta.y)) {
                this.hasProjected = true;
                this.scheduleRender();
                this.notifyListeners(`projectionUpdate`, target);
            }
            if (O.value) {
                ds.calculatedProjections++;
            }
        }
        hide() {
            this.isVisible = false;
        }
        show() {
            this.isVisible = true;
        }
        scheduleRender(e = true) {
            this.options.visualElement?.scheduleRender();
            if (e) {
                let e = this.getStack();
                if (e) {
                    e.scheduleRender();
                }
            }
            if (this.resumingFrom && !this.resumingFrom.instance) {
                this.resumingFrom = undefined;
            }
        }
        createProjectionDeltas() {
            this.prevProjectionDelta = ea();
            this.projectionDelta = ea();
            this.projectionDeltaWithTransform = ea();
        }
        setAnimationOrigin(e, t = false) {
            let snapshot = this.snapshot;
            let r = snapshot ? snapshot.latestValues : {};
            let i = {
                ...this.latestValues
            };
            let a = ea();
            if (!this.relativeParent || !this.relativeParent.options.layoutRoot) {
                this.relativeTarget = this.relativeTargetOrigin = undefined;
            }
            this.attemptToResolveRelativeTarget = !t;
            let o = J();
            let s = (snapshot ? snapshot.source : undefined) !== (this.layout ? this.layout.source : undefined);
            let c = this.getStack();
            let l = !c || c.members.length <= 1;
            let u = !!(s && !l && this.options.crossfade === true && !this.path.some(Is));
            this.animationProgress = 0;
            let d;
            this.mixTargetDelta = (t)=>{
                let n = t / 1000;
                Ns(a.x, e.x, n);
                Ns(a.y, e.y, n);
                this.setTargetDelta(a);
                if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
                    Mo(o, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || undefined);
                    Fs(this.relativeTarget, this.relativeTargetOrigin, o, n);
                    if (d && Ho(this.relativeTarget, d)) {
                        this.isProjectionDirty = false;
                    }
                    d ||= J();
                    Z(d, this.relativeTarget);
                }
                if (s) {
                    this.animationValues = i;
                    Qo(i, r, this.latestValues, n, u, l);
                }
                this.root.scheduleUpdateProjection();
                this.scheduleRender();
                this.animationProgress = n;
            };
            this.mixTargetDelta(this.options.layoutRoot ? 1000 : 0);
        }
        startAnimation(e) {
            this.notifyListeners(`animationStart`);
            this.currentAnimation?.stop();
            this.resumingFrom?.currentAnimation?.stop();
            this.pendingAnimation &&= (cancel(this.pendingAnimation), undefined);
            this.pendingAnimation = schedule.update(()=>{
                us.hasAnimatedSinceResize = true;
                N.layout++;
                this.motionValue ||= Mr(0);
                this.motionValue.jump(0, false);
                this.currentAnimation = rs(this.motionValue, [
                    0,
                    1000
                ], {
                    ...e,
                    velocity: 0,
                    isSync: true,
                    onUpdate: (t)=>{
                        this.mixTargetDelta(t);
                        if (e.onUpdate) {
                            e.onUpdate(t);
                        }
                    },
                    onStop: ()=>{
                        N.layout--;
                    },
                    onComplete: ()=>{
                        N.layout--;
                        if (e.onComplete) {
                            e.onComplete();
                        }
                        this.completeAnimation();
                    }
                });
                if (this.resumingFrom) {
                    this.resumingFrom.currentAnimation = this.currentAnimation;
                }
                this.pendingAnimation = undefined;
            });
        }
        completeAnimation() {
            if (this.resumingFrom) {
                this.resumingFrom.currentAnimation = undefined;
                this.resumingFrom.preserveOpacity = undefined;
            }
            let e = this.getStack();
            if (e) {
                e.exitAnimationComplete();
            }
            this.resumingFrom = this.currentAnimation = this.animationValues = undefined;
            this.notifyListeners(`animationComplete`);
        }
        finishAnimation() {
            if (this.currentAnimation) {
                if (this.mixTargetDelta) {
                    this.mixTargetDelta(ps);
                }
                this.currentAnimation.stop();
            }
            this.completeAnimation();
        }
        applyTransformsToTarget() {
            let e = this.getLead();
            let { targetWithTransforms, target, layout, latestValues } = e;
            if (!(!targetWithTransforms || !target || !layout)) {
                if (this !== e && this.layout && layout && Hs(this.options.animationType, this.layout.layoutBox, layout.layoutBox)) {
                    target = this.target || J();
                    let t = Q(this.layout.layoutBox.x);
                    target.x.min = e.target.x.min;
                    target.x.max = target.x.min + t;
                    let r = Q(this.layout.layoutBox.y);
                    target.y.min = e.target.y.min;
                    target.y.max = target.y.min + r;
                }
                Z(targetWithTransforms, target);
                La(targetWithTransforms, latestValues);
                Oo(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
            }
        }
        registerSharedNode(e, t) {
            if (!this.sharedNodes.has(e)) {
                this.sharedNodes.set(e, new ls);
            }
            this.sharedNodes.get(e).add(t);
            let initialPromotionConfig = t.options.initialPromotionConfig;
            t.promote({
                transition: initialPromotionConfig ? initialPromotionConfig.transition : undefined,
                preserveFollowOpacity: initialPromotionConfig && initialPromotionConfig.shouldPreserveFollowOpacity ? initialPromotionConfig.shouldPreserveFollowOpacity(t) : undefined
            });
        }
        isLead() {
            let e = this.getStack();
            if (e) {
                return e.lead === this;
            }
            return true;
        }
        getLead() {
            let { layoutId } = this.options;
            return layoutId && this.getStack()?.lead || this;
        }
        getPrevLead() {
            let { layoutId } = this.options;
            if (layoutId) {
                return this.getStack()?.prevLead;
            }
        }
        getStack() {
            let { layoutId } = this.options;
            if (layoutId) {
                return this.root.sharedNodes.get(layoutId);
            }
        }
        promote({ needsReset, transition, preserveFollowOpacity } = {}) {
            let r = this.getStack();
            if (r) {
                r.promote(this, preserveFollowOpacity);
            }
            if (needsReset) {
                this.projectionDelta = undefined;
                this.needsReset = true;
            }
            if (transition) {
                this.setOptions({
                    transition
                });
            }
        }
        relegate() {
            let e = this.getStack();
            if (e) {
                return e.relegate(this);
            }
            return false;
        }
        resetSkewAndRotation() {
            let { visualElement } = this.options;
            if (!visualElement) {
                return;
            }
            let t = false;
            let { latestValues } = visualElement;
            if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) {
                t = true;
            }
            if (!t) {
                return;
            }
            let r = {};
            if (latestValues.z) {
                hs(`z`, visualElement, r, this.animationValues);
            }
            for(let t = 0; t < fs.length; t++){
                hs(`rotate${fs[t]}`, visualElement, r, this.animationValues);
                hs(`skew${fs[t]}`, visualElement, r, this.animationValues);
            }
            visualElement.render();
            for(let t in r){
                visualElement.setStaticValue(t, r[t]);
                if (this.animationValues) {
                    this.animationValues[t] = r[t];
                }
            }
            visualElement.scheduleRender();
        }
        applyProjectionStyles(e, t) {
            if (!this.instance || this.isSVG) {
                return;
            }
            if (!this.isVisible) {
                e.visibility = `hidden`;
                return;
            }
            let n = this.getTransformTemplate();
            if (this.needsReset) {
                this.needsReset = false;
                e.visibility = ``;
                e.opacity = ``;
                e.pointerEvents = cs(t?.pointerEvents) || ``;
                e.transform = n ? n(this.latestValues, ``) : `none`;
                return;
            }
            let r = this.getLead();
            if (!this.projectionDelta || !this.layout || !r.target) {
                if (this.options.layoutId) {
                    e.opacity = this.latestValues.opacity === undefined ? 1 : this.latestValues.opacity;
                    e.pointerEvents = cs(t?.pointerEvents) || ``;
                }
                if (this.hasProjected && !Ta(this.latestValues)) {
                    e.transform = n ? n({}, ``) : `none`;
                    this.hasProjected = false;
                }
                return;
            }
            e.visibility = ``;
            let i = r.animationValues || r.latestValues;
            this.applyTransformsToTarget();
            let a = qo(this.projectionDeltaWithTransform, this.treeScale, i);
            if (n) {
                a = n(i, a);
            }
            e.transform = a;
            let { x, y } = this.projectionDelta;
            e.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
            if (r.animationValues) {
                e.opacity = r === this ? i.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : i.opacityExit;
            } else {
                e.opacity = r === this ? i.opacity === undefined ? `` : i.opacity : i.opacityExit === undefined ? 0 : i.opacityExit;
            }
            for(let t in Ja){
                if (i[t] === undefined) {
                    continue;
                }
                let { correct, applyTo, isCSSVariable } = Ja[t];
                let c = a === `none` ? i[t] : correct(i[t], r);
                if (applyTo) {
                    let t = applyTo.length;
                    for(let n = 0; n < t; n++){
                        e[applyTo[n]] = c;
                    }
                } else {
                    if (isCSSVariable) {
                        this.options.visualElement.renderState.vars[t] = c;
                    } else {
                        e[t] = c;
                    }
                }
            }
            if (this.options.layoutId) {
                e.pointerEvents = r === this ? cs(t?.pointerEvents) || `` : `none`;
            }
        }
        clearSnapshot() {
            this.resumeFrom = this.snapshot = undefined;
        }
        resetTree() {
            this.root.nodes.forEach((e)=>e.currentAnimation?.stop());
            this.root.nodes.forEach(Cs);
            this.root.sharedNodes.clear();
        }
    };
}
function vs(e) {
    e.updateLayout();
}
function ys(e) {
    let snapshot_1 = e.resumeFrom?.snapshot || e.snapshot;
    if (e.isLead() && e.layout && snapshot_1 && e.hasListeners(`didUpdate`)) {
        let { layoutBox, measuredBox } = e.layout;
        let { animationType } = e.options;
        let a = snapshot_1.source !== e.layout.source;
        if (animationType === `size`) {
            $((e)=>{
                let r = a ? snapshot_1.measuredBox[e] : snapshot_1.layoutBox[e];
                let i = Q(r);
                r.min = layoutBox[e].min;
                r.max = r.min + i;
            });
        } else if (animationType === `x` || animationType === `y`) {
            let e = animationType === `x` ? `y` : `x`;
            bo(a ? snapshot_1.measuredBox[e] : snapshot_1.layoutBox[e], layoutBox[e]);
        } else {
            if (Hs(animationType, snapshot_1.layoutBox, layoutBox)) {
                $((r)=>{
                    let i = a ? snapshot_1.measuredBox[r] : snapshot_1.layoutBox[r];
                    let o = Q(layoutBox[r]);
                    i.max = i.min + o;
                    if (e.relativeTarget && !e.currentAnimation) {
                        e.isProjectionDirty = true;
                        e.relativeTarget[r].max = e.relativeTarget[r].min + o;
                    }
                });
            }
        }
        let layoutDelta = ea();
        Oo(layoutDelta, layoutBox, snapshot_1.layoutBox);
        let delta = ea();
        if (a) {
            Oo(delta, e.applyTransform(measuredBox, true), snapshot_1.measuredBox);
        } else {
            Oo(delta, layoutBox, snapshot_1.layoutBox);
        }
        let hasLayoutChanged = !Bo(layoutDelta);
        let hasRelativeLayoutChanged = false;
        if (!e.resumeFrom) {
            let r = e.getClosestProjectingParent();
            if (r && !r.resumeFrom) {
                let { snapshot, layout } = r;
                if (snapshot && layout) {
                    let o = e.options.layoutAnchor || undefined;
                    let s = J();
                    Mo(s, snapshot_1.layoutBox, snapshot.layoutBox, o);
                    let c = J();
                    Mo(c, layoutBox, layout.layoutBox, o);
                    if (!Wo(s, c)) {
                        hasRelativeLayoutChanged = true;
                    }
                    if (r.options.layoutRoot) {
                        e.relativeTarget = c;
                        e.relativeTargetOrigin = s;
                        e.relativeParent = r;
                    }
                }
            }
        }
        e.notifyListeners(`didUpdate`, {
            layout: layoutBox,
            snapshot: snapshot_1,
            delta,
            layoutDelta,
            hasLayoutChanged,
            hasRelativeLayoutChanged
        });
    } else if (e.isLead()) {
        let { onExitComplete } = e.options;
        if (onExitComplete) {
            onExitComplete();
        }
    }
    e.options.transition = undefined;
}
function bs(e) {
    if (O.value) {
        ds.nodes++;
    }
    if (e.parent) {
        if (!e.isProjecting()) {
            e.isProjectionDirty = e.parent.isProjectionDirty;
        }
        e.isSharedProjectionDirty ||= !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty);
        e.isTransformDirty ||= e.parent.isTransformDirty;
    }
}
function xs(e) {
    e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = false;
}
function Ss(e) {
    e.clearSnapshot();
}
function Cs(e) {
    e.clearMeasurements();
}
function ws(e) {
    e.isLayoutDirty = true;
    e.updateLayout();
}
function Ts(e) {
    e.isLayoutDirty = false;
}
function Es(e) {
    if (e.isAnimationBlocked && e.layout && !e.isLayoutDirty) {
        e.snapshot = e.layout;
        e.isLayoutDirty = true;
    }
}
function Ds(e) {
    let { visualElement } = e.options;
    if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
        visualElement.notify(`BeforeLayoutMeasure`);
    }
    e.resetTransform();
}
function Os(e) {
    e.finishAnimation();
    e.targetDelta = e.relativeTarget = e.target = undefined;
    e.isProjectionDirty = true;
}
function ks(e) {
    e.resolveTargetDelta();
}
function As(e) {
    e.calcProjection();
}
function js(e) {
    e.resetSkewAndRotation();
}
function Ms(e) {
    e.removeLeadSnapshot();
}
function Ns(e, t, n) {
    e.translate = B(t.translate, 0, n);
    e.scale = B(t.scale, 1, n);
    e.origin = t.origin;
    e.originPoint = t.originPoint;
}
function Ps(e, t, n, r) {
    e.min = B(t.min, n.min, r);
    e.max = B(t.max, n.max, r);
}
function Fs(relativeTarget, relativeTargetOrigin, n, r) {
    Ps(relativeTarget.x, relativeTargetOrigin.x, n.x, r);
    Ps(relativeTarget.y, relativeTargetOrigin.y, n.y, r);
}
function Is(e) {
    return e.animationValues && e.animationValues.opacityExit !== undefined;
}
var Ls = {
    duration: 0.45,
    ease: [
        0.4,
        0,
        0.1,
        1
    ]
};
const Rs = (e)=>typeof navigator < `u` && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e);
const zs = Rs(`applewebkit/`) && !Rs(`chrome/`) ? Math.round : linear;
function Bs(e) {
    e.min = zs(e.min);
    e.max = zs(e.max);
}
function Vs(layoutBox) {
    Bs(layoutBox.x);
    Bs(layoutBox.y);
}
function Hs(animationType, layoutBox, n) {
    return animationType === `position` || animationType === `preserve-aspect` && !Eo(Go(layoutBox), Go(n), 0.2);
}
function Us(e) {
    return e !== e.root && e.scroll?.wasRoot;
}
const Ws = _s({
    attachResizeListener: (e, t)=>is(e, `resize`, t),
    measureScroll: ()=>({
            x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
            y: document.documentElement.scrollTop || document.body?.scrollTop || 0
        }),
    checkIsScrollRoot: ()=>true
});
const Gs = {
    current: undefined
};
const ProjectionNode = _s({
    measureScroll: (e)=>({
            x: e.scrollLeft,
            y: e.scrollTop
        }),
    defaultParent: ()=>{
        if (!Gs.current) {
            let e = new Ws({});
            e.mount(window);
            e.setOptions({
                layoutScroll: true
            });
            Gs.current = e;
        }
        return Gs.current;
    },
    resetTransform: (e, t)=>{
        e.style.transform = t === undefined ? `none` : t;
    },
    checkIsScrollRoot: (e)=>window.getComputedStyle(e).position === `fixed`
});
const QsContext = s.createContext({
    transformPagePoint: (e)=>e,
    isStatic: false,
    reducedMotion: `never`
});
function useXs(...e) {
    return s.useCallback(Ys(...e), e);
}
class Zs extends s.Component {
    getSnapshotBeforeUpdate(e) {
        let current = this.props.childRef.current;
        if (mi(current) && e.isPresent && !this.props.isPresent && this.props.pop !== false) {
            let e = current.offsetParent;
            let n = mi(e) && e.offsetWidth || 0;
            let r = mi(e) && e.offsetHeight || 0;
            let i = getComputedStyle(current);
            let a = this.props.sizeRef.current;
            a.height = parseFloat(i.height);
            a.width = parseFloat(i.width);
            a.top = current.offsetTop;
            a.left = current.offsetLeft;
            a.right = n - a.width - a.left;
            a.bottom = r - a.height - a.top;
        }
        return null;
    }
    componentDidUpdate() {}
    render() {
        return this.props.children;
    }
}
function QsComponent({ children, isPresent, anchorX, anchorY, root, pop }) {
    let c = s.useId();
    let lRef = s.useRef(null);
    let uRef = s.useRef({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    });
    let { nonce } = s.useContext(QsContext);
    let f = useXs(lRef, children.props?.ref ?? children?.ref);
    s.useInsertionEffect(()=>{
        let { width, height, top, left, right, bottom } = uRef.current;
        if (isPresent || pop === false || !lRef.current || !width || !height) {
            return;
        }
        let h = anchorX === `left` ? `left: ${left}` : `right: ${right}`;
        let g = anchorY === `bottom` ? `bottom: ${bottom}` : `top: ${top}`;
        lRef.current.dataset.motionPopId = c;
        let _ = document.createElement(`style`);
        if (nonce) {
            _.nonce = nonce;
        }
        let v = root ?? document.head;
        v.appendChild(_);
        if (_.sheet) {
            _.sheet.insertRule(`
          [data-motion-pop-id="${c}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${h}px !important;
            ${g}px !important;
          }
        `);
        }
        return ()=>{
            lRef.current?.removeAttribute(`data-motion-pop-id`);
            if (v.contains(_)) {
                v.removeChild(_);
            }
        };
    }, [
        isPresent
    ]);
    return <Zs isPresent={isPresent} childRef={lRef} sizeRef={uRef} pop={pop}>{pop === false ? children : s.cloneElement(children, {
        ref: f
    })}</Zs>;
}
const SComponent = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root })=>{
    let m = l(ec);
    let id = s.useId();
    let g = true;
    let _ = s.useMemo(()=>{
        g = false;
        return {
            id,
            initial,
            isPresent,
            custom,
            onExitComplete: (e)=>{
                m.set(e, true);
                for (let e of m.values()){
                    if (!e) {
                        return;
                    }
                }
                if (onExitComplete) {
                    onExitComplete();
                }
            },
            register: (e)=>{
                m.set(e, false);
                return ()=>m.delete(e);
            }
        };
    }, [
        isPresent,
        m,
        onExitComplete
    ]);
    if (presenceAffectsLayout && g) {
        _ = {
            ..._
        };
    }
    s.useMemo(()=>{
        m.forEach((e, t)=>m.set(t, false));
    }, [
        isPresent
    ]);
    s.useEffect(()=>{
        if (!isPresent && !m.size && onExitComplete) {
            onExitComplete();
        }
    }, [
        isPresent
    ]);
    children = <QsComponent pop={mode === `popLayout`} isPresent={isPresent} anchorX={anchorX} anchorY={anchorY} root={root}>{children}</QsComponent>;
    return <d.Provider value={_}>{children}</d.Provider>;
};
function ec() {
    return new Map;
}
function useTc(e = true) {
    let t = s.useContext(d);
    if (t === null) {
        return [
            true,
            null
        ];
    }
    let { isPresent, onExitComplete, register } = t;
    let a = s.useId();
    s.useEffect(()=>{
        if (e) {
            return register(a);
        }
    }, [
        e
    ]);
    let o = s.useCallback(()=>e && onExitComplete && onExitComplete(a), [
        a,
        onExitComplete,
        e
    ]);
    if (!isPresent && onExitComplete) {
        return [
            false,
            o
        ];
    }
    return [
        true
    ];
}
const nc = (e)=>e.key || ``;
function rc(e) {
    let t = [];
    s.Children.forEach(e, (e)=>{
        if (s.isValidElement(e)) {
            t.push(e);
        }
    });
    return t;
}
const IcComponent = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = `sync`, propagate = false, anchorX = `left`, anchorY = `top`, root })=>{
    let [h, g] = useTc(propagate);
    let _ = s.useMemo(()=>rc(children), [
        children
    ]);
    let v = propagate && !h ? [] : _.map(nc);
    let yRef = s.useRef(true);
    let bRef = s.useRef(_);
    let x = l(()=>new Map);
    let SRef = s.useRef(new Set);
    let [C, setC] = s.useState(_);
    let [T, setT] = s.useState(_);
    u(()=>{
        yRef.current = false;
        bRef.current = _;
        for(let e = 0; e < T.length; e++){
            let t = nc(T[e]);
            if (v.includes(t)) {
                x.delete(t);
                SRef.current.delete(t);
            } else if (x.get(t) !== true) {
                x.set(t, false);
            }
        }
    }, [
        T,
        v.length,
        v.join(`-`)
    ]);
    let D = [];
    if (_ !== C) {
        let e = [
            ..._
        ];
        for(let t = 0; t < T.length; t++){
            let n = T[t];
            let r = nc(n);
            if (!v.includes(r)) {
                e.splice(t, 0, n);
                D.push(n);
            }
        }
        if (mode === `wait` && D.length) {
            e = D;
        }
        setT(rc(e));
        setC(_);
        return null;
    }
    let { forceRender } = s.useContext(c);
    return <>{T.map((e)=>{
        let s = nc(e);
        let isPresent = propagate && !h ? false : _ === T || v.includes(s);
        return <SComponent key={s} isPresent={isPresent} initial={!yRef.current || initial ? undefined : false} custom={custom} presenceAffectsLayout={presenceAffectsLayout} mode={mode} root={root} onExitComplete={isPresent ? undefined : ()=>{
            if (SRef.current.has(s)) {
                return;
            }
            if (x.has(s)) {
                SRef.current.add(s);
                x.set(s, true);
            } else {
                return;
            }
            let e = true;
            x.forEach((t)=>{
                if (!t) {
                    e = false;
                }
            });
            if (e) {
                forceRender?.();
                setT(bRef.current);
                if (propagate) {
                    g?.();
                }
                if (onExitComplete) {
                    onExitComplete();
                }
            }
        }} anchorX={anchorX} anchorY={anchorY}>{e}</SComponent>;
    })}</>;
};
const AcContext = s.createContext({
    strict: false
});
const oc = {
    animation: [
        `animate`,
        `variants`,
        `whileHover`,
        `whileTap`,
        `exit`,
        `whileInView`,
        `whileFocus`,
        `whileDrag`
    ],
    exit: [
        `exit`
    ],
    drag: [
        `drag`,
        `dragControls`
    ],
    focus: [
        `whileFocus`
    ],
    hover: [
        `whileHover`,
        `onHoverStart`,
        `onHoverEnd`
    ],
    tap: [
        `whileTap`,
        `onTap`,
        `onTapStart`,
        `onTapCancel`
    ],
    pan: [
        `onPan`,
        `onPanStart`,
        `onPanSessionStart`,
        `onPanEnd`
    ],
    inView: [
        `whileInView`,
        `onViewportEnter`,
        `onViewportLeave`
    ],
    layout: [
        `layout`,
        `layoutId`
    ]
};
let sc = false;
function cc() {
    if (sc) {
        return;
    }
    let e = {};
    for(let t in oc){
        e[t] = {
            isEnabled: (e)=>oc[t].some((t)=>!!e[t])
        };
    }
    ga(e);
    sc = true;
}
function lc() {
    cc();
    return _a();
}
function uc(e) {
    let t = lc();
    for(let n in e){
        t[n] = {
            ...t[n],
            ...e[n]
        };
    }
    ga(t);
}
const dc = new Set(`animate.exit.variants.initial.style.values.variants.transition.transformTemplate.custom.inherit.onBeforeLayoutMeasure.onAnimationStart.onAnimationComplete.onUpdate.onDragStart.onDrag.onDragEnd.onMeasureDragConstraints.onDirectionLock.onDragTransitionEnd._dragX._dragY.onHoverStart.onHoverEnd.onViewportEnter.onViewportLeave.globalTapTarget.propagate.ignoreStrict.viewport`.split(`.`));
function fc(e) {
    return e.startsWith(`while`) || e.startsWith(`drag`) && e !== `draggable` || e.startsWith(`layout`) || e.startsWith(`onTap`) || e.startsWith(`onPan`) || e.startsWith(`onLayout`) || dc.has(e);
}
const pc = a({
    default: ()=>mc
});
var mc;
const hc = i(()=>{
    mc = {};
    throw Error(`Could not resolve "@emotion/is-prop-valid" imported by "framer-motion". Is it installed?`);
});
let gc = (e)=>!fc(e);
function _c(e) {
    if (typeof e == `function`) {
        gc = (t)=>{
            if (t.startsWith(`on`)) {
                return !fc(t);
            }
            return e(t);
        };
    }
}
try {
    _c((hc(), o_1(pc)).default);
} catch  {}
function vc(e, t, n) {
    let r = {};
    for(let i in e){
        if (!(i === `values` && typeof e.values == `object` || K(e[i]))) {
            if (gc(i) || n === true && fc(i) || !t && !fc(i) || e.draggable && i.startsWith(`onDrag`)) {
                r[i] = e[i];
            }
        }
    }
    return r;
}
const YcContext = s.createContext({});
function bc(e, t) {
    if (sa(e)) {
        let { initial, animate } = e;
        return {
            initial: initial === false || ia(initial) ? initial : undefined,
            animate: ia(animate) ? animate : undefined
        };
    }
    if (e.inherit === false) {
        return {};
    }
    return t;
}
function useXc(e) {
    let { initial, animate } = bc(e, s.useContext(YcContext));
    return s.useMemo(()=>({
            initial,
            animate
        }), [
        Sc(initial),
        Sc(animate)
    ]);
}
function Sc(e) {
    if (Array.isArray(e)) {
        return e.join(` `);
    }
    return e;
}
const Cc = ()=>({
        style: {},
        transform: {},
        transformOrigin: {},
        vars: {}
    });
function wc(e, t, n) {
    for(let r in t){
        if (!K(t[r]) && !Ya(r, n)) {
            e[r] = t[r];
        }
    }
}
function Tc({ transformTemplate }, t) {
    return s.useMemo(()=>{
        let n = Cc();
        Ua(n, t, transformTemplate);
        return {
            ...n.vars,
            ...n.style
        };
    }, [
        t
    ]);
}
function Ec(e, t) {
    let n = e.style || {};
    let r = {};
    wc(r, n, e);
    Object.assign(r, Tc(e, t));
    return r;
}
function Dc(e, t) {
    let n = {};
    let r = Ec(e, t);
    if (e.drag && e.dragListener !== false) {
        n.draggable = false;
        r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = `none`;
        r.touchAction = e.drag === true ? `none` : `pan-${e.drag === `x` ? `y` : `x`}`;
    }
    if (e.tabIndex === undefined && (e.onTap || e.onTapStart || e.whileTap)) {
        n.tabIndex = 0;
    }
    n.style = r;
    return n;
}
const Oc = ()=>({
        ...Cc(),
        attrs: {}
    });
function useKc(e, t, n, r) {
    let i = s.useMemo(()=>{
        let n = Oc();
        ro(n, t, ao(r), e.transformTemplate, e.style);
        return {
            ...n.attrs,
            style: {
                ...n.style
            }
        };
    }, [
        t
    ]);
    if (e.style) {
        let t = {};
        wc(t, e.style, e);
        i.style = {
            ...t,
            ...i.style
        };
    }
    return i;
}
function useMc(e, t, n, { latestValues }, isStatic, a = false, o) {
    let c = (o ?? jc(e) ? useKc : Dc)(t, latestValues, isStatic, e);
    let l = vc(t, typeof e == `string`, a);
    let u = e === s.Fragment ? {} : {
        ...l,
        ...c,
        ref: n
    };
    let { children } = t;
    let children_1 = s.useMemo(()=>{
        if (K(children)) {
            return children.get();
        }
        return children;
    }, [
        children
    ]);
    return s.createElement(e, {
        ...u,
        children: children_1
    });
}
function Nc({ scrapeMotionValuesFromProps, createRenderState }, n, r, i) {
    return {
        latestValues: Pc(n, r, i, scrapeMotionValuesFromProps),
        renderState: createRenderState()
    };
}
function Pc(e, t, n, scrapeMotionValuesFromProps) {
    let i = {};
    let a = scrapeMotionValuesFromProps(e, {});
    for(let e in a){
        i[e] = cs(a[e]);
    }
    let { initial, animate } = e;
    let c = sa(e);
    let l = ca(e);
    if (t && l && !c && e.inherit !== false) {
        if (initial === undefined) {
            initial = t.initial;
        }
        if (animate === undefined) {
            animate = t.animate;
        }
    }
    let u = n ? n.initial === false : false;
    u ||= initial === false;
    let d = u ? animate : initial;
    if (d && typeof d != `boolean` && !ra(d)) {
        let t = Array.isArray(d) ? d : [
            d
        ];
        for(let n = 0; n < t.length; n++){
            let r = Er(e, t[n]);
            if (r) {
                let { transitionEnd, transition, ...rest } = r;
                for(let e in rest){
                    let t = rest[e];
                    if (Array.isArray(t)) {
                        let e = u ? t.length - 1 : 0;
                        t = t[e];
                    }
                    if (t !== null) {
                        i[e] = t;
                    }
                }
                for(let t in transitionEnd){
                    i[t] = transitionEnd[t];
                }
            }
        }
    }
    return i;
}
const Fc = (e)=>(t, n)=>{
        let r = s.useContext(YcContext);
        let i = s.useContext(d);
        let a = ()=>Nc(e, t, r, i);
        if (n) {
            return a();
        }
        return l(a);
    };
const Ic = Fc({
    scrapeMotionValuesFromProps: Xa,
    createRenderState: Cc
});
const Lc = Fc({
    scrapeMotionValuesFromProps: so,
    createRenderState: Oc
});
const Rc = Symbol.for(`motionComponentSymbol`);
function useZc(e, visualElement, n) {
    let rRef = s.useRef(n);
    s.useInsertionEffect(()=>{
        rRef.current = n;
    });
    let iRef = s.useRef(null);
    return s.useCallback((n)=>{
        if (n) {
            e.onMount?.(n);
        }
        let rRef_current = rRef.current;
        if (typeof rRef_current == `function`) {
            if (n) {
                let e = rRef_current(n);
                if (typeof e == `function`) {
                    iRef.current = e;
                }
            } else {
                if (iRef.current) {
                    iRef.current();
                    iRef.current = null;
                } else {
                    rRef_current(n);
                }
            }
        } else {
            if (rRef_current) {
                rRef_current.current = n;
            }
        }
        if (visualElement) {
            if (n) {
                visualElement.mount(n);
            } else {
                visualElement.unmount();
            }
        }
    }, [
        visualElement
    ]);
}
const BcContext = s.createContext({});
function Vc(dragConstraints) {
    return dragConstraints && typeof dragConstraints == `object` && Object.prototype.hasOwnProperty.call(dragConstraints, `current`);
}
function useHc(e, visualState, props, r, ProjectionNode, isSVG) {
    let { visualElement } = s.useContext(YcContext);
    let c = s.useContext(AcContext);
    let presenceContext = s.useContext(d);
    let f = s.useContext(QsContext);
    let f_reducedMotion = f.reducedMotion;
    let f_skipAnimations = f.skipAnimations;
    let hRef = s.useRef(null);
    let gRef = s.useRef(false);
    r ||= c.renderer;
    if (!hRef.current && r) {
        hRef.current = r(e, {
            visualState,
            parent: visualElement,
            props,
            presenceContext,
            blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
            reducedMotionConfig: f_reducedMotion,
            skipAnimations: f_skipAnimations,
            isSVG
        });
        if (gRef.current && hRef.current) {
            hRef.current.manuallyAnimateOnMount = true;
        }
    }
    let hRef_current = hRef.current;
    let v = s.useContext(BcContext);
    if (hRef_current && !hRef_current.projection && ProjectionNode && (hRef_current.type === `html` || hRef_current.type === `svg`)) {
        Uc(hRef.current, props, ProjectionNode, v);
    }
    let yRef = s.useRef(false);
    s.useInsertionEffect(()=>{
        if (hRef_current && yRef.current) {
            hRef_current.update(props, presenceContext);
        }
    });
    let b = props[Br];
    let xRef = s.useRef(!!b && typeof window < `u` && !window.MotionHandoffIsComplete?.(b) && window.MotionHasOptimisedAnimation?.(b));
    u(()=>{
        gRef.current = true;
        if (hRef_current) {
            yRef.current = true;
            window.MotionIsMounted = true;
            hRef_current.updateFeatures();
            hRef_current.scheduleRenderMicrotask();
            if (xRef.current && hRef_current.animationState) {
                hRef_current.animationState.animateChanges();
            }
        }
    });
    s.useEffect(()=>{
        if (hRef_current) {
            if (!xRef.current && hRef_current.animationState) {
                hRef_current.animationState.animateChanges();
            }
            xRef.current &&= (queueMicrotask(()=>{
                window.MotionHandoffMarkAsComplete?.(b);
            }), false);
            hRef_current.enteringChildren = undefined;
        }
    });
    return hRef_current;
}
function Uc(visualElement, props, ProjectionNode, initialPromotionConfig) {
    let { layoutId, layout, drag, dragConstraints, layoutScroll, layoutRoot, layoutAnchor, layoutCrossfade } = props;
    visualElement.projection = new ProjectionNode(visualElement.latestValues, props[`data-framer-portal-id`] ? undefined : Wc(visualElement.parent));
    visualElement.projection.setOptions({
        layoutId,
        layout,
        alwaysMeasureLayout: !!drag || dragConstraints && Vc(dragConstraints),
        visualElement,
        animationType: typeof layout == `string` ? layout : `both`,
        initialPromotionConfig,
        crossfade: layoutCrossfade,
        layoutScroll,
        layoutRoot,
        layoutAnchor
    });
}
function Wc(parent) {
    if (parent) {
        if (parent.options.allowProjection === false) {
            return Wc(parent.parent);
        }
        return parent.projection;
    }
}
function Gc(e, { forwardMotionProps = false, type } = {}, r, i) {
    if (r) {
        uc(r);
    }
    let a = type ? type === `svg` : jc(e);
    let c = a ? Lc : Ic;
    function LComponent(n, l) {
        let u;
        let d = {
            ...s.useContext(QsContext),
            ...n,
            layoutId: Kc(n)
        };
        let { isStatic } = d;
        let p = useXc(n);
        let m = c(n, isStatic);
        if (!isStatic && typeof window < `u`) {
            useQc(d, r);
            let t = Jc(d);
            u = t.MeasureLayout;
            p.visualElement = useHc(e, m, d, i, t.ProjectionNode, a);
        }
        return <YcContext.Provider value={p}>{u && p.visualElement ? o.jsx(u, {
            visualElement: p.visualElement,
            ...d
        }) : null}{useMc(e, n, useZc(m, p.visualElement, l), m, isStatic, forwardMotionProps, a)}</YcContext.Provider>;
    }
    LComponent.displayName = `motion.${typeof e == `string` ? e : `create(${e.displayName ?? e.name ?? ``})`}`;
    let u = s.forwardRef(LComponent);
    u[Rc] = e;
    return u;
}
function Kc({ layoutId }) {
    let t = s.useContext(c).id;
    if (t && layoutId !== undefined) {
        return t + `-` + layoutId;
    }
    return layoutId;
}
function useQc(e, t) {
    s.useContext(AcContext).strict;
}
function Jc(e) {
    let { drag, layout } = lc();
    if (!drag && !layout) {
        return {};
    }
    let r = {
        ...drag,
        ...layout
    };
    return {
        MeasureLayout: drag?.isEnabled(e) || layout?.isEnabled(e) ? r.MeasureLayout : undefined,
        ProjectionNode: r.ProjectionNode
    };
}
function Yc(e, t) {
    if (typeof Proxy > `u`) {
        return Gc;
    }
    let n = new Map;
    let r = (n, r)=>Gc(n, r, e, t);
    return new Proxy((e, t)=>r(e, t), {
        get: (i, a)=>{
            if (a === `create`) {
                return r;
            }
            if (!n.has(a)) {
                n.set(a, Gc(a, undefined, e, t));
            }
            return n.get(a);
        }
    });
}
const Xc = (e, t)=>{
    if (t.isSVG ?? jc(e)) {
        return new co(t);
    }
    return new Qa(t, {
        allowProjection: e !== s.Fragment
    });
};
class Zc extends Y {
    constructor(e){
        super(e);
        e.animationState ||= go(e);
    }
    updateAnimationControlsSubscription() {
        let { animate } = this.node.getProps();
        if (ra(animate)) {
            this.unmountControls = animate.subscribe(this.node);
        }
    }
    mount() {
        this.updateAnimationControlsSubscription();
    }
    update() {
        let { animate } = this.node.getProps();
        let { animate: animate_1 } = this.node.prevProps || {};
        if (animate !== animate_1) {
            this.updateAnimationControlsSubscription();
        }
    }
    unmount() {
        this.node.animationState.reset();
        this.unmountControls?.();
    }
}
let Qc = 0;
const $c = {
    animation: {
        Feature: Zc
    },
    exit: {
        Feature: class extends Y {
            constructor(){
                super(...arguments);
                this.id = Qc++;
                this.isExitComplete = false;
            }
            update() {
                if (!this.node.presenceContext) {
                    return;
                }
                let { isPresent, onExitComplete } = this.node.presenceContext;
                let { isPresent: isPresent_1 } = this.node.prevPresenceContext || {};
                if (!this.node.animationState || isPresent === isPresent_1) {
                    return;
                }
                if (isPresent && isPresent_1 === false) {
                    if (this.isExitComplete) {
                        let { initial, custom } = this.node.getProps();
                        if (typeof initial == `string`) {
                            let n = G(this.node, initial, custom);
                            if (n) {
                                let { transition, transitionEnd, ...rest } = n;
                                for(let e in rest){
                                    this.node.getValue(e)?.jump(rest[e]);
                                }
                            }
                        }
                        this.node.animationState.reset();
                        this.node.animationState.animateChanges();
                    } else {
                        this.node.animationState.setActive(`exit`, false);
                    }
                    this.isExitComplete = false;
                    return;
                }
                let r = this.node.animationState.setActive(`exit`, !isPresent);
                if (onExitComplete && !isPresent) {
                    r.then(()=>{
                        this.isExitComplete = true;
                        onExitComplete(this.id);
                    });
                }
            }
            mount() {
                let { register, onExitComplete } = this.node.presenceContext || {};
                if (onExitComplete) {
                    onExitComplete(this.id);
                }
                if (register) {
                    this.unmount = register(this.id);
                }
            }
            unmount() {}
        }
    }
};
function el(e) {
    return {
        point: {
            x: e.pageX,
            y: e.pageY
        }
    };
}
const tl = (e)=>(t)=>Ci(t) && e(t, el(t));
function nl(e, t, n, r) {
    return is(e, t, tl(n), r);
}
const ol = new Set([
    `auto`,
    `scroll`
]);
class sl {
    constructor(e, t, { transformPagePoint, contextWindow = window, dragSnapToOrigin = false, distanceThreshold = 3, element } = {}){
        this.startEvent = null;
        this.lastMoveEvent = null;
        this.lastMoveEventInfo = null;
        this.lastRawMoveEventInfo = null;
        this.handlers = {};
        this.contextWindow = window;
        this.scrollPositions = new Map;
        this.removeScrollListeners = null;
        this.onElementScroll = (e)=>{
            this.handleScroll(e.target);
        };
        this.onWindowScroll = ()=>{
            this.handleScroll(window);
        };
        this.updatePoint = ()=>{
            if (!(this.lastMoveEvent && this.lastMoveEventInfo)) {
                return;
            }
            if (this.lastRawMoveEventInfo) {
                this.lastMoveEventInfo = cl(this.lastRawMoveEventInfo, this.transformPagePoint);
            }
            let e = ul(this.lastMoveEventInfo, this.history);
            let t = this.startEvent !== null;
            let n = al(e.offset, {
                x: 0,
                y: 0
            }) >= this.distanceThreshold;
            if (!t && !n) {
                return;
            }
            let { point } = e;
            let { timestamp } = state;
            this.history.push({
                ...point,
                timestamp
            });
            let { onStart, onMove } = this.handlers;
            if (!t) {
                if (onStart) {
                    onStart(this.lastMoveEvent, e);
                }
                this.startEvent = this.lastMoveEvent;
            }
            if (onMove) {
                onMove(this.lastMoveEvent, e);
            }
        };
        this.handlePointerMove = (e, t)=>{
            this.lastMoveEvent = e;
            this.lastRawMoveEventInfo = t;
            this.lastMoveEventInfo = cl(t, this.transformPagePoint);
            schedule.update(this.updatePoint, true);
        };
        this.handlePointerUp = (e, t)=>{
            this.end();
            let { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
            if ((this.dragSnapToOrigin || !this.startEvent) && resumeAnimation) {
                resumeAnimation();
            }
            if (!(this.lastMoveEvent && this.lastMoveEventInfo)) {
                return;
            }
            let a = ul(e.type === `pointercancel` ? this.lastMoveEventInfo : cl(t, this.transformPagePoint), this.history);
            if (this.startEvent && onEnd) {
                onEnd(e, a);
            }
            if (onSessionEnd) {
                onSessionEnd(e, a);
            }
        };
        if (!Ci(e)) {
            return;
        }
        this.dragSnapToOrigin = dragSnapToOrigin;
        this.handlers = t;
        this.transformPagePoint = transformPagePoint;
        this.distanceThreshold = distanceThreshold;
        this.contextWindow = contextWindow || window;
        let s = cl(el(e), this.transformPagePoint);
        let { point } = s;
        let { timestamp } = state;
        this.history = [
            {
                ...point,
                timestamp
            }
        ];
        let { onSessionStart } = t;
        if (onSessionStart) {
            onSessionStart(e, ul(s, this.history));
        }
        this.removeListeners = S(nl(this.contextWindow, `pointermove`, this.handlePointerMove), nl(this.contextWindow, `pointerup`, this.handlePointerUp), nl(this.contextWindow, `pointercancel`, this.handlePointerUp));
        if (element) {
            this.startScrollTracking(element);
        }
    }
    startScrollTracking({ parentElement }) {
        while(parentElement){
            let e = getComputedStyle(parentElement);
            if (ol.has(e.overflowX) || ol.has(e.overflowY)) {
                this.scrollPositions.set(parentElement, {
                    x: parentElement.scrollLeft,
                    y: parentElement.scrollTop
                });
            }
            parentElement = parentElement.parentElement;
        }
        this.scrollPositions.set(window, {
            x: window.scrollX,
            y: window.scrollY
        });
        window.addEventListener(`scroll`, this.onElementScroll, {
            capture: true
        });
        window.addEventListener(`scroll`, this.onWindowScroll);
        this.removeScrollListeners = ()=>{
            window.removeEventListener(`scroll`, this.onElementScroll, {
                capture: true
            });
            window.removeEventListener(`scroll`, this.onWindowScroll);
        };
    }
    handleScroll(e) {
        let t = this.scrollPositions.get(e);
        if (!t) {
            return;
        }
        let n = e === window;
        let r = n ? {
            x: window.scrollX,
            y: window.scrollY
        } : {
            x: e.scrollLeft,
            y: e.scrollTop
        };
        let i = {
            x: r.x - t.x,
            y: r.y - t.y
        };
        if (!(i.x === 0 && i.y === 0)) {
            if (n) {
                if (this.lastMoveEventInfo) {
                    this.lastMoveEventInfo.point.x += i.x;
                    this.lastMoveEventInfo.point.y += i.y;
                }
            } else if (this.history.length > 0) {
                this.history[0].x -= i.x;
                this.history[0].y -= i.y;
            }
            this.scrollPositions.set(e, r);
            schedule.update(this.updatePoint, true);
        }
    }
    updateHandlers(e) {
        this.handlers = e;
    }
    end() {
        if (this.removeListeners) {
            this.removeListeners();
        }
        if (this.removeScrollListeners) {
            this.removeScrollListeners();
        }
        this.scrollPositions.clear();
        cancel(this.updatePoint);
    }
}
function cl(e, transformPagePoint) {
    if (transformPagePoint) {
        return {
            point: transformPagePoint(e.point)
        };
    }
    return e;
}
function ll(point, t) {
    return {
        x: point.x - t.x,
        y: point.y - t.y
    };
}
function ul({ point }, history) {
    return {
        point,
        delta: ll(point, fl(history)),
        offset: ll(point, dl(history)),
        velocity: pl(history, 0.1)
    };
}
function dl(history) {
    return history[0];
}
function fl(e) {
    return e[e.length - 1];
}
function pl(history, t) {
    if (history.length < 2) {
        return {
            x: 0,
            y: 0
        };
    }
    let n = history.length - 1;
    let r = null;
    let i = fl(history);
    while(n >= 0 && (r = history[n], !(i.timestamp - r.timestamp > T(t)))){
        n--;
    }
    if (!r) {
        return {
            x: 0,
            y: 0
        };
    }
    if (r === history[0] && history.length > 2 && i.timestamp - r.timestamp > T(t) * 2) {
        r = history[1];
    }
    let a = E(i.timestamp - r.timestamp);
    if (a === 0) {
        return {
            x: 0,
            y: 0
        };
    }
    let o = {
        x: (i.x - r.x) / a,
        y: (i.y - r.y) / a
    };
    if (o.x === Infinity) {
        o.x = 0;
    }
    if (o.y === Infinity) {
        o.y = 0;
    }
    return o;
}
function ml(e, { min, max }, r) {
    if (min !== undefined && e < min) {
        e = r ? B(min, e, r.min) : Math.max(e, min);
    } else if (max !== undefined && e > max) {
        e = r ? B(max, e, r.max) : Math.min(e, max);
    }
    return e;
}
function yl(e, t) {
    let n = 0.5;
    let r = Q(e);
    let i = Q(t);
    if (i > r) {
        n = C(t.min, t.max - r, e.min);
    } else if (r > i) {
        n = C(e.min, e.max - i, t.min);
    }
    return m(0, 1, n);
}
function bl(e, t) {
    let n = {};
    if (t.min !== undefined) {
        n.min = t.min - e.min;
    }
    if (t.max !== undefined) {
        n.max = t.max - e.min;
    }
    return n;
}
const xl = 0.35;
function Sl(e = xl) {
    if (e === false) {
        e = 0;
    } else if (e === true) {
        e = xl;
    }
    return {
        x: Cl(e, `left`, `right`),
        y: Cl(e, `top`, `bottom`)
    };
}
const Tl = new WeakMap;
class El {
    constructor(e){
        this.openDragLock = null;
        this.isDragging = false;
        this.currentDirection = null;
        this.originPoint = {
            x: 0,
            y: 0
        };
        this.constraints = false;
        this.hasMutatedConstraints = false;
        this.elastic = J();
        this.latestPointerEvent = null;
        this.latestPanInfo = null;
        this.visualElement = e;
    }
    start(e, { snapToCursor = false, distanceThreshold } = {}) {
        let { presenceContext } = this.visualElement;
        if (presenceContext && presenceContext.isPresent === false) {
            return;
        }
        let onSessionStart = (e)=>{
            if (snapToCursor) {
                this.snapToCursor(el(e).point);
            }
            this.stopAnimation();
        };
        let onStart = (e, t)=>{
            let { drag, dragPropagation, onDragStart } = this.getProps();
            if (drag && !dragPropagation && (this.openDragLock && this.openDragLock(), this.openDragLock = vi(drag), !this.openDragLock)) {
                return;
            }
            this.latestPointerEvent = e;
            this.latestPanInfo = t;
            this.isDragging = true;
            this.currentDirection = null;
            this.resolveConstraints();
            if (this.visualElement.projection) {
                this.visualElement.projection.isAnimationBlocked = true;
                this.visualElement.projection.target = undefined;
            }
            $((e)=>{
                let t = this.getAxisMotionValue(e).get() || 0;
                if (I.test(t)) {
                    let { projection } = this.visualElement;
                    if (projection && projection.layout) {
                        let r = projection.layout.layoutBox[e];
                        if (r) {
                            t = Q(r) * (parseFloat(t) / 100);
                        }
                    }
                }
                this.originPoint[e] = t;
            });
            if (onDragStart) {
                schedule.update(()=>onDragStart(e, t), false, true);
            }
            Rr(this.visualElement, `transform`);
            let { animationState } = this.visualElement;
            if (animationState) {
                animationState.setActive(`whileDrag`, true);
            }
        };
        let onMove = (e, t)=>{
            this.latestPointerEvent = e;
            this.latestPanInfo = t;
            let { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
            if (!dragPropagation && !this.openDragLock) {
                return;
            }
            let { offset } = t;
            if (dragDirectionLock && this.currentDirection === null) {
                this.currentDirection = Al(offset);
                if (this.currentDirection !== null && onDirectionLock) {
                    onDirectionLock(this.currentDirection);
                }
                return;
            }
            this.updateAxis(`x`, t.point, offset);
            this.updateAxis(`y`, t.point, offset);
            this.visualElement.render();
            if (onDrag) {
                schedule.update(()=>onDrag(e, t), false, true);
            }
        };
        let onSessionEnd = (e, t)=>{
            this.latestPointerEvent = e;
            this.latestPanInfo = t;
            this.stop(e, t);
            this.latestPointerEvent = null;
            this.latestPanInfo = null;
        };
        let resumeAnimation = ()=>{
            let { dragSnapToOrigin } = this.getProps();
            if (dragSnapToOrigin || this.constraints) {
                this.startAnimation({
                    x: 0,
                    y: 0
                });
            }
        };
        let { dragSnapToOrigin } = this.getProps();
        this.panSession = new sl(e, {
            onSessionStart,
            onStart,
            onMove,
            onSessionEnd,
            resumeAnimation
        }, {
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin,
            distanceThreshold,
            contextWindow: rl(this.visualElement),
            element: this.visualElement.current
        });
    }
    stop(e, t) {
        let n = e || this.latestPointerEvent;
        let r = t || this.latestPanInfo;
        let isDragging = this.isDragging;
        this.cancel();
        if (!isDragging || !r || !n) {
            return;
        }
        let { velocity } = r;
        this.startAnimation(velocity);
        let { onDragEnd } = this.getProps();
        if (onDragEnd) {
            schedule.postRender(()=>onDragEnd(n, r));
        }
    }
    cancel() {
        this.isDragging = false;
        let { projection, animationState } = this.visualElement;
        if (projection) {
            projection.isAnimationBlocked = false;
        }
        this.endPanSession();
        let { dragPropagation } = this.getProps();
        if (!dragPropagation && this.openDragLock) {
            this.openDragLock();
            this.openDragLock = null;
        }
        if (animationState) {
            animationState.setActive(`whileDrag`, false);
        }
    }
    endPanSession() {
        if (this.panSession) {
            this.panSession.end();
        }
        this.panSession = undefined;
    }
    updateAxis(e, t, n) {
        let { drag } = this.getProps();
        if (!n || !kl(e, drag, this.currentDirection)) {
            return;
        }
        let i = this.getAxisMotionValue(e);
        let a = this.originPoint[e] + n[e];
        if (this.constraints && this.constraints[e]) {
            a = ml(a, this.constraints[e], this.elastic[e]);
        }
        i.set(a);
    }
    resolveConstraints() {
        let { dragConstraints, dragElastic } = this.getProps();
        let n = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : this.visualElement.projection?.layout;
        let constraints = this.constraints;
        if (dragConstraints && Vc(dragConstraints)) {
            this.constraints ||= this.resolveRefConstraints();
        } else if (dragConstraints && n) {
            this.constraints = gl(n.layoutBox, dragConstraints);
        } else {
            this.constraints = false;
        }
        this.elastic = Sl(dragElastic);
        if (constraints !== this.constraints && !Vc(dragConstraints) && n && this.constraints && !this.hasMutatedConstraints) {
            $((e)=>{
                if (this.constraints !== false && this.getAxisMotionValue(e)) {
                    this.constraints[e] = bl(n.layoutBox[e], this.constraints[e]);
                }
            });
        }
    }
    resolveRefConstraints() {
        let { dragConstraints, onMeasureDragConstraints } = this.getProps();
        if (!dragConstraints || !Vc(dragConstraints)) {
            return false;
        }
        let dragConstraints_current = dragConstraints.current;
        let { projection } = this.visualElement;
        if (!projection || !projection.layout) {
            return false;
        }
        let i = za(dragConstraints_current, projection.root, this.visualElement.getTransformPagePoint());
        let a = vl(projection.layout.layoutBox, i);
        if (onMeasureDragConstraints) {
            let e = onMeasureDragConstraints(xa(a));
            this.hasMutatedConstraints = !!e;
            if (e) {
                a = ba(e);
            }
        }
        return a;
    }
    startAnimation(e) {
        let { drag, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
        let s = this.constraints || {};
        let c = $((o)=>{
            if (!kl(o, drag, this.currentDirection)) {
                return;
            }
            let c = s && s[o] || {};
            if (dragSnapToOrigin === true || dragSnapToOrigin === o) {
                c = {
                    min: 0,
                    max: 0
                };
            }
            let bounceStiffness = dragElastic ? 200 : 1000000;
            let bounceDamping = dragElastic ? 40 : 10000000;
            let d = {
                type: `inertia`,
                velocity: dragMomentum ? e[o] : 0,
                bounceStiffness,
                bounceDamping,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...dragTransition,
                ...c
            };
            return this.startAxisValueAnimation(o, d);
        });
        return Promise.all(c).then(onDragTransitionEnd);
    }
    startAxisValueAnimation(e, t) {
        let n = this.getAxisMotionValue(e);
        Rr(this.visualElement, e);
        return n.start(wr(e, n, 0, t, this.visualElement, false));
    }
    stopAnimation() {
        $((e)=>this.getAxisMotionValue(e).stop());
    }
    getAxisMotionValue(e) {
        let t = `_drag${e.toUpperCase()}`;
        let n = this.visualElement.getProps();
        return n[t] || this.visualElement.getValue(e, (n.initial ? n.initial[e] : undefined) || 0);
    }
    snapToCursor(e) {
        $((t)=>{
            let { drag } = this.getProps();
            if (!kl(t, drag, this.currentDirection)) {
                return;
            }
            let { projection } = this.visualElement;
            let i = this.getAxisMotionValue(t);
            if (projection && projection.layout) {
                let { min, max } = projection.layout.layoutBox[t];
                let o = i.get() || 0;
                i.set(e[t] - B(min, max, 0.5) + o);
            }
        });
    }
    scalePositionWithinConstraints() {
        if (!this.visualElement.current) {
            return;
        }
        let { drag, dragConstraints } = this.getProps();
        let { projection } = this.visualElement;
        if (!Vc(dragConstraints) || !projection || !this.constraints) {
            return;
        }
        this.stopAnimation();
        let r = {
            x: 0,
            y: 0
        };
        $((e)=>{
            let t = this.getAxisMotionValue(e);
            if (t && this.constraints !== false) {
                let n = t.get();
                r[e] = yl({
                    min: n,
                    max: n
                }, this.constraints[e]);
            }
        });
        let { transformTemplate } = this.visualElement.getProps();
        this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, ``) : `none`;
        if (projection.root) {
            projection.root.updateScroll();
        }
        projection.updateLayout();
        this.constraints = false;
        this.resolveConstraints();
        $((t)=>{
            if (!kl(t, drag, null)) {
                return;
            }
            let n = this.getAxisMotionValue(t);
            let { min, max } = this.constraints[t];
            n.set(B(min, max, r[t]));
        });
        this.visualElement.render();
    }
    addListeners() {
        if (!this.visualElement.current) {
            return;
        }
        Tl.set(this.visualElement, this);
        let current = this.visualElement.current;
        let t = nl(current, `pointerdown`, (t)=>{
            let { drag, dragListener = true } = this.getProps();
            let t_target = t.target;
            let a = t_target !== current && Di(t_target);
            if (drag && dragListener && !a) {
                this.start(t);
            }
        });
        let n;
        let r = ()=>{
            let { dragConstraints } = this.getProps();
            if (Vc(dragConstraints) && dragConstraints.current) {
                this.constraints = this.resolveRefConstraints();
                n ||= Ol(current, dragConstraints.current, ()=>this.scalePositionWithinConstraints());
            }
        };
        let { projection } = this.visualElement;
        let a = projection.addEventListener(`measure`, r);
        if (projection && !projection.layout) {
            if (projection.root) {
                projection.root.updateScroll();
            }
            projection.updateLayout();
        }
        schedule.read(r);
        let o = is(window, `resize`, ()=>this.scalePositionWithinConstraints());
        let s = projection.addEventListener(`didUpdate`, ({ delta, hasLayoutChanged })=>{
            if (this.isDragging && hasLayoutChanged) {
                $((t)=>{
                    let n = this.getAxisMotionValue(t);
                    if (n) {
                        this.originPoint[t] += delta[t].translate;
                        n.set(n.get() + delta[t].translate);
                    }
                });
                this.visualElement.render();
            }
        });
        return ()=>{
            o();
            t();
            a();
            if (s) {
                s();
            }
            if (n) {
                n();
            }
        };
    }
    getProps() {
        let e = this.visualElement.getProps();
        let { drag = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = xl, dragMomentum = true } = e;
        return {
            ...e,
            drag,
            dragDirectionLock,
            dragPropagation,
            dragConstraints,
            dragElastic,
            dragMomentum
        };
    }
}
function Dl(e) {
    let t = true;
    return ()=>{
        if (t) {
            t = false;
            return;
        }
        e();
    };
}
function Ol(e, t, n) {
    let r = Yi(e, Dl(n));
    let i = Yi(t, Dl(n));
    return ()=>{
        r();
        i();
    };
}
function kl(e, drag, n) {
    return (drag === true || drag === e) && (n === null || n === e);
}
function Al(offset, t = 10) {
    let n = null;
    if (Math.abs(offset.y) > t) {
        n = `y`;
    } else if (Math.abs(offset.x) > t) {
        n = `x`;
    }
    return n;
}
class jl extends Y {
    constructor(e){
        super(e);
        this.removeGroupControls = linear;
        this.removeListeners = linear;
        this.controls = new El(e);
    }
    mount() {
        let { dragControls } = this.node.getProps();
        if (dragControls) {
            this.removeGroupControls = dragControls.subscribe(this.controls);
        }
        this.removeListeners = this.controls.addListeners() || linear;
    }
    update() {
        let { dragControls } = this.node.getProps();
        let { dragControls: dragControls_1 } = this.node.prevProps || {};
        if (dragControls !== dragControls_1) {
            this.removeGroupControls();
            if (dragControls) {
                this.removeGroupControls = dragControls.subscribe(this.controls);
            }
        }
    }
    unmount() {
        this.removeGroupControls();
        this.removeListeners();
        if (!this.controls.isDragging) {
            this.controls.endPanSession();
        }
    }
}
const Ml = (e)=>(t, n)=>{
        if (e) {
            schedule.update(()=>e(t, n), false, true);
        }
    };
class Nl extends Y {
    constructor(){
        super(...arguments);
        this.removePointerDownListener = linear;
    }
    onPointerDown(e) {
        this.session = new sl(e, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: rl(this.node)
        });
    }
    createPanHandlers() {
        let { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
        return {
            onSessionStart: Ml(onPanSessionStart),
            onStart: Ml(onPanStart),
            onMove: Ml(onPan),
            onEnd: (e, t)=>{
                delete this.session;
                if (onPanEnd) {
                    schedule.postRender(()=>onPanEnd(e, t));
                }
            }
        };
    }
    mount() {
        this.removePointerDownListener = nl(this.node.current, `pointerdown`, (e)=>this.onPointerDown(e));
    }
    update() {
        if (this.session) {
            this.session.updateHandlers(this.createPanHandlers());
        }
    }
    unmount() {
        this.removePointerDownListener();
        if (this.session) {
            this.session.end();
        }
    }
}
let Pl = false;
class Fl extends s.Component {
    componentDidMount() {
        let { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
        let { projection } = visualElement;
        if (projection) {
            if (layoutGroup.group) {
                layoutGroup.group.add(projection);
            }
            if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
                switchLayoutGroup.register(projection);
            }
            if (Pl) {
                projection.root.didUpdate();
            }
            projection.addEventListener(`animationComplete`, ()=>{
                this.safeToRemove();
            });
            projection.setOptions({
                ...projection.options,
                layoutDependency: this.props.layoutDependency,
                onExitComplete: ()=>this.safeToRemove()
            });
        }
        us.hasEverUpdated = true;
    }
    getSnapshotBeforeUpdate(e) {
        let { layoutDependency, visualElement, drag, isPresent } = this.props;
        let { projection } = visualElement;
        if (projection) {
            projection.isPresent = isPresent;
            if (e.layoutDependency !== layoutDependency) {
                projection.setOptions({
                    ...projection.options,
                    layoutDependency
                });
            }
            Pl = true;
            if (drag || e.layoutDependency !== layoutDependency || layoutDependency === undefined || e.isPresent !== isPresent) {
                projection.willUpdate();
            } else {
                this.safeToRemove();
            }
            if (e.isPresent !== isPresent) {
                if (isPresent) {
                    projection.promote();
                } else if (!projection.relegate()) {
                    schedule.postRender(()=>{
                        let e = projection.getStack();
                        if (!e || !e.members.length) {
                            this.safeToRemove();
                        }
                    });
                }
            }
            return null;
        }
        return null;
    }
    componentDidUpdate() {
        let { visualElement, layoutAnchor } = this.props;
        let { projection } = visualElement;
        if (projection) {
            projection.options.layoutAnchor = layoutAnchor;
            projection.root.didUpdate();
            schedule_1.postRender(()=>{
                if (!projection.currentAnimation && projection.isLead()) {
                    this.safeToRemove();
                }
            });
        }
    }
    componentWillUnmount() {
        let { visualElement, layoutGroup, switchLayoutGroup } = this.props;
        let { projection } = visualElement;
        Pl = true;
        if (projection) {
            projection.scheduleCheckAfterUnmount();
            if (layoutGroup && layoutGroup.group) {
                layoutGroup.group.remove(projection);
            }
            if (switchLayoutGroup && switchLayoutGroup.deregister) {
                switchLayoutGroup.deregister(projection);
            }
        }
    }
    safeToRemove() {
        let { safeToRemove } = this.props;
        if (safeToRemove) {
            safeToRemove();
        }
    }
    render() {
        return null;
    }
}
function IlComponent(e) {
    let [isPresent, safeToRemove] = useTc();
    let layoutGroup = s.useContext(c);
    return <Fl {...e} layoutGroup={layoutGroup} switchLayoutGroup={s.useContext(BcContext)} isPresent={isPresent} safeToRemove={safeToRemove}/>;
}
const Ll = {
    pan: {
        Feature: Nl
    },
    drag: {
        Feature: jl,
        ProjectionNode,
        MeasureLayout: IlComponent
    }
};
function Rl(node, t, n) {
    let { props } = node;
    if (node.animationState && props.whileHover) {
        node.animationState.setActive(`whileHover`, n === `Start`);
    }
    let i = props[`onHover` + n];
    if (i) {
        schedule.postRender(()=>i(t, el(t)));
    }
}
class zl extends Y {
    mount() {
        let { current } = this.node;
        if (current) {
            this.unmount = xi(current, (e, t)=>{
                Rl(this.node, t, `Start`);
                return (e)=>Rl(this.node, e, `End`);
            });
        }
    }
    unmount() {}
}
class Bl extends Y {
    constructor(){
        super(...arguments);
        this.isActive = false;
    }
    onFocus() {
        let e = false;
        try {
            e = this.node.current.matches(`:focus-visible`);
        } catch  {
            e = true;
        }
        if (!(!e || !this.node.animationState)) {
            this.node.animationState.setActive(`whileFocus`, true);
            this.isActive = true;
        }
    }
    onBlur() {
        if (!(!this.isActive || !this.node.animationState)) {
            this.node.animationState.setActive(`whileFocus`, false);
            this.isActive = false;
        }
    }
    mount() {
        this.unmount = S(is(this.node.current, `focus`, ()=>this.onFocus()), is(this.node.current, `blur`, ()=>this.onBlur()));
    }
    unmount() {}
}
function Vl(node, t, n) {
    let { props } = node;
    if (node.current instanceof HTMLButtonElement && node.current.disabled) {
        return;
    }
    if (node.animationState && props.whileTap) {
        node.animationState.setActive(`whileTap`, n === `Start`);
    }
    let i = props[`onTap` + (n === `End` ? `` : n)];
    if (i) {
        schedule.postRender(()=>i(t, el(t)));
    }
}
class Hl extends Y {
    mount() {
        let { current } = this.node;
        if (!current) {
            return;
        }
        let { globalTapTarget, propagate } = this.node.props;
        this.unmount = Pi(current, (e, t)=>{
            Vl(this.node, t, `Start`);
            return (e, { success })=>Vl(this.node, e, success ? `End` : `Cancel`);
        }, {
            useGlobalTarget: globalTapTarget,
            stopPropagation: propagate?.tap === false
        });
    }
    unmount() {}
}
const Ul = new WeakMap;
const Wl = new WeakMap;
const Gl = (e)=>{
    let t = Ul.get(e.target);
    if (t) {
        t(e);
    }
};
const Kl = (e)=>{
    e.forEach(Gl);
};
function ql({ root, ...rest }) {
    let n = root || document;
    if (!Wl.has(n)) {
        Wl.set(n, {});
    }
    let r = Wl.get(n);
    let i = JSON.stringify(rest);
    if (!r[i]) {
        r[i] = new IntersectionObserver(Kl, {
            root,
            ...rest
        });
    }
    return r[i];
}
function Jl(e, t, n) {
    let r = ql(t);
    Ul.set(e, n);
    r.observe(e);
    return ()=>{
        Ul.delete(e);
        r.unobserve(e);
    };
}
const Yl = {
    some: 0,
    all: 1
};
class Xl extends Y {
    constructor(){
        super(...arguments);
        this.hasEnteredView = false;
        this.isInView = false;
    }
    startObserver() {
        this.stopObserver?.();
        let { viewport = {} } = this.node.getProps();
        let { root, margin, amount = `some`, once } = viewport;
        let a = {
            root: root ? root.current : undefined,
            rootMargin: margin,
            threshold: typeof amount == `number` ? amount : Yl[amount]
        };
        let o = (e)=>{
            let { isIntersecting } = e;
            if (this.isInView === isIntersecting || (this.isInView = isIntersecting, once && !isIntersecting && this.hasEnteredView)) {
                return;
            }
            if (isIntersecting) {
                this.hasEnteredView = true;
            }
            if (this.node.animationState) {
                this.node.animationState.setActive(`whileInView`, isIntersecting);
            }
            let { onViewportEnter, onViewportLeave } = this.node.getProps();
            let a = isIntersecting ? onViewportEnter : onViewportLeave;
            if (a) {
                a(e);
            }
        };
        this.stopObserver = Jl(this.node.current, a, o);
    }
    mount() {
        this.startObserver();
    }
    update() {
        if (typeof IntersectionObserver > `u`) {
            return;
        }
        let { props, prevProps } = this.node;
        if ([
            `amount`,
            `margin`,
            `root`
        ].some(Zl(props, prevProps))) {
            this.startObserver();
        }
    }
    unmount() {
        this.stopObserver?.();
        this.hasEnteredView = false;
        this.isInView = false;
    }
}
function Zl({ viewport = {} }, { viewport: viewport_1 = {} } = {}) {
    return (n)=>viewport[n] !== viewport_1[n];
}
const Ql = {
    inView: {
        Feature: Xl
    },
    tap: {
        Feature: Hl
    },
    focus: {
        Feature: Bl
    },
    hover: {
        Feature: zl
    }
};
const $l = {
    layout: {
        ProjectionNode,
        MeasureLayout: IlComponent
    }
};
const eu = Yc({
    ...$c,
    ...Ql,
    ...Ll,
    ...$l
}, Xc);
export { ua as a, da as i, IcComponent as n, pa as r, eu as t };
