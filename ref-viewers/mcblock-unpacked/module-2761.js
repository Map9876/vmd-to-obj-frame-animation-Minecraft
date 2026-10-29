function i(t) {
    if (t === undefined) {
        throw ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return t;
}
function n(t, Animation) {
    t.prototype = Object.create(Animation.prototype);
    t.prototype.constructor = t;
    t.__proto__ = Animation;
}
var s;
let a;
let o;
let globalTimeline;
let h;
let _;
let f;
let l;
var c;
var d;
var p;
export const Yz = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
        lineHeight: ""
    }
};
const defaults = {
    duration: 0.5,
    overwrite: false,
    delay: 0
};
const g = 2 * Math.PI;
const y = g / 4;
let T = 0;
export const vQ = function(t) {
    return typeof t === "string";
};
const D = function(t) {
    return typeof t === "function";
};
const M = (t)=>typeof t === "number";
export const OF = function(t) {
    return t === undefined;
};
const C = (t)=>typeof t === "object";
const R = (t)=>t !== false;
const E = ()=>typeof window !== "undefined";
const S = (t)=>D(t) || vQ(t);
const z = typeof ArrayBuffer === "function" && ArrayBuffer.isView || (()=>{});
const P = /random\([^)]+\)/g;
const F = /,\s*/g;
const L = /(?:-?\.?\d|\.)+/gi;
export const vX = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g;
export const vM = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g;
const B = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi;
export const Ks = /[+-]=-?[.\d]+/;
const N = /[^,'"\[\]\s]+/gi;
const Q = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i;
const V = {};
let j = {};
const install = function(t) {
    return (j = tw(t, V)) && os;
};
export const dg = function(t, e) {
    return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
};
const Y = (t, e)=>!e && console.warn(t);
const globals = function(t, e) {
    return t && (V[t] = e) && j && (j[t] = e) || V;
};
const J = function() {
    return 0;
};
const K = {
    suppressEvents: true,
    isStart: true,
    kill: false
};
const X = {
    suppressEvents: true,
    kill: false
};
const Z = {
    suppressEvents: true
};
const $ = {};
const tt = [];
let te = {};
export const wU = {};
const effects = {};
let tn = 30;
const ts = [];
let ta = "";
const to = (t)=>{
    let e;
    let r;
    const i = t[0];
    if (!(C(i) || D(i))) {
        t = [
            t
        ];
    }
    if (!(e = (i._gsap || {}).harness)) {
        for(r = ts.length; r-- && !ts[r].targetTest(i););
        e = ts[r];
    }
    for(r = t.length; r--;){
        if (!(t[r] && (t[r]._gsap || (t[r]._gsap = new n6(t[r], e))))) {
            t.splice(r, 1);
        }
    }
    return t;
};
export const a0 = function(t) {
    return t._gsap || to(toArray(t))[0]._gsap;
};
const th = function(t, e, r) {
    if ((r = t[e]) && D(r)) {
        return t[e]();
    }
    return OF(r) && t.getAttribute && t.getAttribute(e) || r;
};
export { th as n };
export const fA = function(t, e) {
    return (t = t.split(",")).forEach(e) || t;
};
export const E_ = function(t) {
    return Math.round(100000 * t) / 100000 || 0;
};
const tl = (t)=>Math.round(10000000 * t) / 10000000 || 0;
export const B0 = function(t, e) {
    const r = e.charAt(0);
    const i = parseFloat(e.substr(2));
    t = parseFloat(t);
    switch(r){
        case "+":
            return t + i;
        case "-":
            return t - i;
        case "*":
            return t * i;
        default:
            return t / i;
    }
};
const td = (_targets, e)=>{
    for(var r = e.length, i = 0; _targets.indexOf(e[i]) < 0 && ++i < r;);
    return i < r;
};
const tp = ()=>{
    let t;
    let e;
    const tt_length = tt.length;
    const i = tt.slice(0);
    t = 0;
    te = {};
    for(tt.length = 0; t < tt_length; t++){
        if ((e = i[t]) && e._lazy) {
            e.render(e._lazy[0], e._lazy[1], true)._lazy = 0;
        }
    }
};
const tm = (t)=>!!(t._initted || t._startAt || t.add);
const tv = (t, e, r, i)=>{
    if (tt.length && !a) {
        tp();
    }
    t.render(e, r, i || !!(a && e < 0 && tm(t)));
    if (tt.length && !a) {
        tp();
    }
};
const tg = function(t) {
    const e = parseFloat(t);
    if ((e || e === 0) && `${t}`.match(N).length < 2) {
        return e;
    }
    if (vQ(t)) {
        return t.trim();
    }
    return t;
};
const ty = function(t) {
    return t;
};
const tT = function(t, e) {
    for(const r in e){
        if (!(r in t)) {
            t[r] = e[r];
        }
    }
    return t;
};
var tw = (t, e)=>{
    for(const r in e){
        t[r] = e[r];
    }
    return t;
};
const tb = function t(e, r) {
    for(const i in r){
        if (i !== "__proto__" && i !== "constructor" && i !== "prototype") {
            e[i] = C(r[i]) ? t(e[i] || (e[i] = {}), r[i]) : r[i];
        }
    }
    return e;
};
const tk = (t, e)=>{
    let r;
    const i = {};
    for(r in t){
        if (!(r in e)) {
            i[r] = t[r];
        }
    }
    return i;
};
const tx = (t)=>{
    let e;
    let r = t.parent || globalTimeline;
    const i = t.keyframes ? (e = Array.isArray(t.keyframes), (t, r)=>{
        for(const i in r){
            if (!(i in t || i === "duration" && e || i === "ease")) {
                t[i] = r[i];
            }
        }
    }) : tT;
    if (R(t.inherit)) {
        while(r){
            i(t, r.vars.defaults);
            r = r.parent || r._dp;
        }
    }
    return t;
};
const tD = (_targets, e)=>{
    for(var r = _targets.length, i = r === e.length; i && r-- && _targets[r] === e[r];);
    return r < 0;
};
const tM = (t, e, r = "_first", i = "_last", n)=>{
    let s;
    let a = t[i];
    if (n) {
        for(s = e[n]; a && a[n] > s;){
            a = a._prev;
        }
    }
    if (a) {
        e._next = a._next;
        a._next = e;
    } else {
        e._next = t[r];
        t[r] = e;
    }
    if (e._next) {
        e._next._prev = e;
    } else {
        t[i] = e;
    }
    e._prev = a;
    e.parent = e._dp = t;
    return e;
};
const _removeLinkedListItem = function(t, e, r = "_first", i = "_last") {
    const { _prev, _next } = e;
    if (_prev) {
        _prev._next = _next;
    } else if (t[r] === e) {
        t[r] = _next;
    }
    if (_next) {
        _next._prev = _prev;
    } else if (t[i] === e) {
        t[i] = _prev;
    }
    e._next = e._prev = e.parent = null;
};
const tC = (t, e)=>{
    if (t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove) {
        t.parent.remove(t);
    }
    t._act = 0;
};
const tR = (t, e)=>{
    if (t && (!e || e._end > t._dur || e._start < 0)) {
        for(let r = t; r;){
            r._dirty = 1;
            r = r.parent;
        }
    }
    return t;
};
const tE = (t)=>{
    for(let e = t.parent; e && e.parent;){
        e._dirty = 1;
        e.totalDuration();
        e = e.parent;
    }
    return t;
};
const tS = (t, e, r, i)=>t._startAt && (a ? t._startAt.revert(X) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, true, i));
const tz = (t)=>{
    if (t._repeat) {
        return tO(t._tTime, t = t.duration() + t._rDelay) * t;
    }
    return 0;
};
var tO = (t, e)=>{
    const r = Math.floor(t = tl(t / e));
    if (t && r === t) {
        return r - 1;
    }
    return r;
};
const tP = (t, e)=>(t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
const tF = (t)=>t._end = tl(t._start + (t._tDur / Math.abs(t._ts || t._rts || 1e-8) || 0));
const tL = (t, e)=>{
    const t__dp = t._dp;
    if (t__dp && t__dp.smoothChildTiming && t._ts) {
        t._start = tl(t__dp._time - (t._ts > 0 ? e / t._ts : -(((t._dirty ? t.totalDuration() : t._tDur) - e) / t._ts)));
        tF(t);
        if (!t__dp._dirty) {
            tR(t__dp, t);
        }
    }
    return t;
};
const tI = (t, e)=>{
    let r;
    if (e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) {
        r = tP(t.rawTime(), e);
        if (!e._dur || tX(0, e.totalDuration(), r) - e._tTime > 1e-8) {
            e.render(r, true);
        }
    }
    if (tR(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
        if (t._dur < t.duration()) {
            for(r = t; r._dp;){
                if (r.rawTime() >= 0) {
                    r.totalTime(r._tTime);
                }
                r = r._dp;
            }
        }
        t._zTime = -1e-8;
    }
};
const tU = (t, e, r, i)=>{
    if (e.parent) {
        tC(e);
    }
    e._start = tl((M(r) ? r : r || t !== globalTimeline ? tH(t, r, e) : t._time) + e._delay);
    e._end = tl(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0));
    tM(t, e, "_first", "_last", t._sort ? "_start" : 0);
    if (!tQ(e)) {
        t._recent = e;
    }
    if (!i) {
        tI(t, e);
    }
    if (t._ts < 0) {
        tL(t, t._tTime);
    }
    return t;
};
const tB = (t, scrollTrigger)=>(V.ScrollTrigger || dg("scrollTrigger", scrollTrigger)) && V.ScrollTrigger.create(scrollTrigger, t);
const tq = (t, e, r, i, n)=>{
    eU(t, e, n);
    if (t._initted) {
        if (!r && t._pt && !a && (t._dur && t.vars.lazy !== false || !t._dur && t.vars.lazy) && c !== au.frame) {
            tt.push(t);
            t._lazy = [
                n,
                i
            ];
            return 1;
        }
        return undefined;
    }
    return 1;
};
const tN = function t({ parent }) {
    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || t(parent));
};
var tQ = ({ data })=>data === "isFromStart" || data === "isStart";
const tV = (t, e, r, i)=>{
    let n;
    let s;
    let o;
    let t_ratio = t.ratio;
    let h = e < 0 || !e && (!t._start && tN(t) && !(!t._initted && tQ(t)) || (t._ts < 0 || t._dp._ts < 0) && !tQ(t)) ? 0 : 1;
    const t__rDelay = t._rDelay;
    let f = 0;
    if (t__rDelay && t._repeat) {
        s = tO(f = tX(0, t._tDur, e), t__rDelay);
        if (t._yoyo && 1 & s) {
            h = 1 - h;
        }
        if (s !== tO(t._tTime, t__rDelay)) {
            t_ratio = 1 - h;
            if (t.vars.repeatRefresh && t._initted) {
                t.invalidate();
            }
        }
    }
    if (h !== t_ratio || a || i || t._zTime === 1e-8 || !e && t._zTime) {
        if (!t._initted && tq(t, e, i, r, f)) {
            return;
        }
        o = t._zTime;
        t._zTime = e || 1e-8 * !!r;
        if (!r) {
            r = e && !o;
        }
        t.ratio = h;
        if (t._from) {
            h = 1 - h;
        }
        t._time = 0;
        t._tTime = f;
        for(n = t._pt; n;){
            n.r(h, n.d);
            n = n._next;
        }
        if (e < 0) {
            tS(t, e, r, true);
        }
        if (t._onUpdate && !r) {
            er(t, "onUpdate");
        }
        if (f && t._repeat && !r && t.parent) {
            er(t, "onRepeat");
        }
        if ((e >= t._tDur || e < 0) && t.ratio === h) {
            if (h) {
                tC(t, 1);
            }
            if (!(r || a)) {
                er(t, h ? "onComplete" : "onReverseComplete", true);
                if (t._prom) {
                    t._prom();
                }
            }
        }
    } else {
        if (!t._zTime) {
            t._zTime = e;
        }
    }
};
const tj = (t, e, r)=>{
    let i;
    if (r > e) {
        for(i = t._first; i && i._start <= r;){
            if (i.data === "isPause" && i._start > e) {
                return i;
            }
            i = i._next;
        }
    } else {
        for(i = t._last; i && i._start >= r;){
            if (i.data === "isPause" && i._start < e) {
                return i;
            }
            i = i._prev;
        }
    }
};
const tG = (t, e, r, i)=>{
    const t__repeat = t._repeat;
    const s = tl(e) || 0;
    const a = t._tTime / t._tDur;
    if (a && !i) {
        t._time *= s / t._dur;
    }
    t._dur = s;
    t._tDur = t__repeat ? t__repeat < 0 ? 10000000000 : tl(s * (t__repeat + 1) + t._rDelay * t__repeat) : s;
    if (a > 0 && !i) {
        tL(t, t._tTime = t._tDur * a);
    }
    if (t.parent) {
        tF(t);
    }
    if (!r) {
        tR(t.parent, t);
    }
    return t;
};
const tW = (t)=>{
    if (t instanceof Timeline) {
        return tR(t);
    }
    return tG(t, t._dur);
};
const tY = {
    _start: 0,
    endTime: J,
    totalDuration: J
};
var tH = function t(e, r, i) {
    let n;
    let s;
    let a;
    const e_labels = e.labels;
    const u = e._recent || tY;
    const h = e.duration() >= 100000000 ? u.endTime(false) : e._dur;
    if (vQ(r) && (isNaN(r) || r in e_labels)) {
        s = r.charAt(0);
        a = r.substr(-1) === "%";
        n = r.indexOf("=");
        if (s === "<" || s === ">") {
            if (n >= 0) {
                r = r.replace(/=/, "");
            }
            return (s === "<" ? u._start : u.endTime(u._repeat >= 0)) + (parseFloat(r.substr(1)) || 0) * (a ? (n < 0 ? u : i).totalDuration() / 100 : 1);
        }
        if (n < 0) {
            if (!(r in e_labels)) {
                e_labels[r] = h;
            }
            return e_labels[r];
        }
        s = parseFloat(r.charAt(n - 1) + r.substr(n + 1));
        if (a && i) {
            s = s / 100 * (Array.isArray(i) ? i[0] : i).totalDuration();
        }
        if (n > 1) {
            return t(e, r.substr(0, n - 1), i) + s;
        }
        return h + s;
    }
    if (r == null) {
        return h;
    }
    return +r;
};
const tJ = (t, e, r)=>{
    let i;
    let n;
    const s = M(e[1]);
    const a = (s ? 2 : 1) + (t < 2 ? 0 : 1);
    const o = e[a];
    if (s) {
        o.duration = e[1];
    }
    o.parent = r;
    if (t) {
        i = o;
        for(n = r; n && !("immediateRender" in i);){
            i = n.vars.defaults || {};
            n = R(n.vars.inherit) && n.parent;
        }
        o.immediateRender = R(i.immediateRender);
        if (t < 2) {
            o.runBackwards = 1;
        } else {
            o.startAt = e[a - 1];
        }
    }
    return new Tween(e[0], o, e[a + 1]);
};
const tK = (t, e)=>{
    if (t || t === 0) {
        return e(t);
    }
    return e;
};
var tX = (t, e, r)=>{
    if (r < t) {
        return t;
    }
    if (r > e) {
        return e;
    }
    return r;
};
export const l_ = function(t, e) {
    if (vQ(t) && (e = Q.exec(t))) {
        return e[1];
    }
    return "";
};
const slice = [].slice;
const t0 = (t, e)=>t && C(t) && "length" in t && (!e && !t.length || t.length - 1 in t && C(t[0])) && !t.nodeType && t !== h;
var toArray = function(t, e, r) {
    let i;
    if (o && !e && o.selector) {
        return o.selector(t);
    }
    if (vQ(t) && !r && (_ || !ep())) {
        return slice.call((e || f).querySelectorAll(t), 0);
    }
    if (Array.isArray(t)) {
        if (i === undefined) {
            i = [];
        }
        return t.forEach((t)=>{
            if (vQ(t) && !r || t0(t, 1)) {
                return i.push(...toArray(t));
            }
            return i.push(t);
        }) || i;
    }
    if (t0(t)) {
        return slice.call(t, 0);
    }
    if (t) {
        return [
            t
        ];
    }
    return [];
};
const selector = function(t) {
    t = toArray(t)[0] || Y("Invalid scope") || {};
    return function(e) {
        const r = t.current || t.nativeElement || t;
        return toArray(e, r.querySelectorAll ? r : r === t ? Y("Invalid scope") || f.createElement("div") : t);
    };
};
const shuffle = function(t) {
    return t.sort(()=>0.5 - Math.random());
};
const distribute = function(each) {
    if (D(each)) {
        return each;
    }
    const e = C(each) ? each : {
        each
    };
    let r = ex(e.ease);
    const i = e.from || 0;
    const n = parseFloat(e.base) || 0;
    const s = {};
    const a = i > 0 && i < 1;
    const o = isNaN(i) || a;
    const e_axis = e.axis;
    let h = i;
    let _ = i;
    if (vQ(i)) {
        h = _ = ({
            center: 0.5,
            edges: 0.5,
            end: 1
        })[i] || 0;
    } else if (!a && o) {
        h = i[0];
        _ = i[1];
    }
    return function(t, a, f) {
        let l;
        let c;
        let d;
        let p;
        let m;
        let v;
        let g;
        let y;
        let T;
        let length = (f || e).length;
        let k = s[length];
        if (!k) {
            if (!(T = e.grid === "auto" ? 0 : (e.grid || [
                1,
                100000000
            ])[1])) {
                for(g = -100000000; g < (g = f[T++].getBoundingClientRect().left) && T < length;);
                if (T < length) {
                    T--;
                }
            }
            v = 0;
            k = s[length] = [];
            l = o ? Math.min(T, length) * h - 0.5 : i % T;
            c = T === 100000000 ? 0 : o ? length * _ / T - 0.5 : i / T | 0;
            g = 0;
            for(y = 100000000; v < length; v++){
                d = v % T - l;
                p = c - (v / T | 0);
                k[v] = m = e_axis ? Math.abs(e_axis === "y" ? p : d) : Math.sqrt(d * d + p * p);
                if (m > g) {
                    g = m;
                }
                if (m < y) {
                    y = m;
                }
            }
            if (i === "random") {
                shuffle(k);
            }
            k.max = g - y;
            k.min = y;
            k.v = length = (parseFloat(e.amount) || parseFloat(e.each) * (T > length ? length - 1 : e_axis ? e_axis === "y" ? length / T : T : Math.max(T, length / T)) || 0) * (i === "edges" ? -1 : 1);
            k.b = length < 0 ? n - length : n;
            k.u = l_(e.amount || e.each) || 0;
            r = r && length < 0 ? eb(r) : r;
        }
        length = (k[t] - k.min) / k.max || 0;
        return tl(k.b + (r ? r(length) : length) * k.v) + k.u;
    };
};
const t3 = function(t) {
    const e = 10 ** (`${t}`.split(".")[1] || "").length;
    return function(r) {
        const i = tl(Math.round(parseFloat(r) / t) * t * e);
        return (i - i % 1) / e + (M(r) ? 0 : l_(r));
    };
};
const snap = function(t, e) {
    let r;
    let i;
    let n = Array.isArray(t);
    if (!n && C(t)) {
        r = n = t.radius || 100000000;
        if (t.values) {
            if (i = !M((t = toArray(t.values))[0])) {
                r *= r;
            }
        } else {
            t = t3(t.increment);
        }
    }
    return tK(e, n ? D(t) ? function(e) {
        if (Math.abs((i = t(e)) - e) <= r) {
            return i;
        }
        return e;
    } : function(e) {
        let n;
        let s;
        const a = parseFloat(i ? e.x : e);
        const o = parseFloat(i ? e.y : 0);
        let u = 100000000;
        let h = 0;
        for(let _ = t.length; _--;){
            if ((n = i ? (n = t[_].x - a) * n + (s = t[_].y - o) * s : Math.abs(t[_] - a)) < u) {
                u = n;
                h = _;
            }
        }
        h = !r || u <= r ? t[h] : e;
        if (i || h === e || M(e)) {
            return h;
        }
        return h + l_(e);
    } : t3(t));
};
const random = function(t, e, r, i) {
    return tK(Array.isArray(t) ? !e : r === true ? (r = 0, false) : !i, function() {
        if (Array.isArray(t)) {
            return t[~~(Math.random() * t.length)];
        }
        return (i = (r = r || 0.00001) < 1 ? 10 ** (`${r}`.length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + 0.99 * r)) / r) * r * i) / i;
    });
};
const t9 = (t, e, r)=>tK(r, function(r) {
        return t[~~e(r)];
    });
export const Vy = function(t) {
    return t.replace(P, (t)=>{
        const e = t.indexOf("[") + 1;
        const r = t.substring(e || 7, e ? t.indexOf("]") : t.length - 1).split(F);
        return random(e ? r : +r[0], e ? 0 : +r[1], +r[2] || 0.00001);
    });
};
const mapRange = function(t, e, r, i, n) {
    const s = e - t;
    const a = i - r;
    return tK(n, function(e) {
        return r + ((e - t) / s * a || 0);
    });
};
const ee = (t, e, r)=>{
    let i;
    let n;
    let s;
    const t_labels = t.labels;
    let o = 100000000;
    for(i in t_labels){
        if ((n = t_labels[i] - e) < 0 == !!r && n && o > (n = Math.abs(n))) {
            s = i;
            o = n;
        }
    }
    return s;
};
var er = (t, e, r)=>{
    let i;
    let n;
    let s;
    const t_vars = t.vars;
    const u = t_vars[e];
    const h = o;
    const t__ctx = t._ctx;
    if (u) {
        i = t_vars[`${e}Params`];
        n = t_vars.callbackScope || t;
        if (r && tt.length) {
            tp();
        }
        if (t__ctx) {
            o = t__ctx;
        }
        s = i ? u.apply(n, i) : u.call(n);
        o = h;
        return s;
    }
};
const ei = (t)=>{
    tC(t);
    if (t.scrollTrigger) {
        t.scrollTrigger.kill(!!a);
    }
    if (t.progress() < 1) {
        er(t, "onInterrupt");
    }
    return t;
};
const en = [];
const es = function(t) {
    if (t) {
        t = !t.name && t.default || t;
        if (E() || t.headless) {
            let e = t.name;
            const r = D(t);
            const i = e && !r && t.init ? function() {
                this._props = [];
            } : t;
            const n = {
                init: J,
                render,
                add,
                kill,
                modifier,
                rawVars: 0
            };
            const s = {
                targetTest: 0,
                get: 0,
                getSetter: Dx,
                aliases: {},
                register: 0
            };
            ep();
            if (t !== i) {
                if (wU[e]) {
                    return;
                }
                tT(i, tT(tk(t, n), s));
                tw(i.prototype, tw(n, tk(t, s)));
                wU[i.prop = e] = i;
                if (t.targetTest) {
                    ts.push(i);
                    $[e] = 1;
                }
                e = `${e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)}Plugin`;
            }
            globals(e, i);
            if (t.register) {
                t.register(os, i, J7);
            }
        } else {
            en.push(t);
        }
    }
};
const ea = {
    aqua: [
        0,
        255,
        255
    ],
    lime: [
        0,
        255,
        0
    ],
    silver: [
        192,
        192,
        192
    ],
    black: [
        0,
        0,
        0
    ],
    maroon: [
        128,
        0,
        0
    ],
    teal: [
        0,
        128,
        128
    ],
    blue: [
        0,
        0,
        255
    ],
    navy: [
        0,
        0,
        128
    ],
    white: [
        255,
        255,
        255
    ],
    olive: [
        128,
        128,
        0
    ],
    yellow: [
        255,
        255,
        0
    ],
    orange: [
        255,
        165,
        0
    ],
    gray: [
        128,
        128,
        128
    ],
    purple: [
        128,
        0,
        128
    ],
    green: [
        0,
        128,
        0
    ],
    red: [
        255,
        0,
        0
    ],
    pink: [
        255,
        192,
        203
    ],
    cyan: [
        0,
        255,
        255
    ],
    transparent: [
        255,
        255,
        255,
        0
    ]
};
const eo = (t, e, r)=>(6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1 ? e + (r - e) * t * 6 : t < 0.5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * 255 + 0.5 | 0;
const splitColor = function(t, e, r) {
    let i;
    let n;
    let s;
    let a;
    let o;
    let u;
    let h;
    let _;
    let f;
    let l;
    let c = t ? M(t) ? [
        t >> 16,
        t >> 8 & 255,
        255 & t
    ] : 0 : ea.black;
    if (!c) {
        if (t.substr(-1) === ",") {
            t = t.substr(0, t.length - 1);
        }
        if (ea[t]) {
            c = ea[t];
        } else if (t.charAt(0) === "#") {
            if (t.length < 6) {
                i = t.charAt(1);
                t = `#${i}${i}${n = t.charAt(2)}${n}${s = t.charAt(3)}${s}${t.length === 5 ? t.charAt(4) + t.charAt(4) : ""}`;
            }
            if (t.length === 9) {
                return [
                    (c = parseInt(t.substr(1, 6), 16)) >> 16,
                    c >> 8 & 255,
                    255 & c,
                    parseInt(t.substr(7), 16) / 255
                ];
            }
            c = [
                (t = parseInt(t.substr(1), 16)) >> 16,
                t >> 8 & 255,
                255 & t
            ];
        } else if (t.substr(0, 3) === "hsl") {
            c = l = t.match(L);
            if (e) {
                if (~t.indexOf("=")) {
                    c = t.match(vX);
                    if (r && c.length < 4) {
                        c[3] = 1;
                    }
                    return c;
                }
            } else {
                a = c[0] % 360 / 360;
                o = c[1] / 100;
                n = (u = c[2] / 100) <= 0.5 ? u * (o + 1) : u + o - u * o;
                i = 2 * u - n;
                if (c.length > 3) {
                    c[3] *= 1;
                }
                c[0] = eo(a + 1 / 3, i, n);
                c[1] = eo(a, i, n);
                c[2] = eo(a - 1 / 3, i, n);
            }
        } else {
            c = t.match(L) || ea.transparent;
        }
        c = c.map(Number);
    }
    if (e && !l) {
        i = c[0] / 255;
        u = ((h = Math.max(i, n = c[1] / 255, s = c[2] / 255)) + (_ = Math.min(i, n, s))) / 2;
        if (h === _) {
            o = 0;
            a = 0;
        } else {
            f = h - _;
            o = u > 0.5 ? f / (2 - h - _) : f / (h + _);
            a = (h === i ? (n - s) / f + 6 * (n < s) : h === n ? (s - i) / f + 2 : (i - n) / f + 4) * 60;
        }
        c[0] = ~~(a + 0.5);
        c[1] = ~~(100 * o + 0.5);
        c[2] = ~~(100 * u + 0.5);
    }
    if (r && c.length < 4) {
        c[3] = 1;
    }
    return c;
};
const eh = (t)=>{
    const e = [];
    const r = [];
    let i = -1;
    t.split(qA).forEach((t)=>{
        const n = t.match(vM) || [];
        e.push(...n);
        r.push(i += n.length + 1);
    });
    e.c = r;
    return e;
};
const e_ = (t, e, r)=>{
    let i;
    let n;
    let s;
    let a;
    let o = "";
    let u = (t + o).match(qA);
    const h = e ? "hsla(" : "rgba(";
    let _ = 0;
    if (!u) {
        return t;
    }
    u = u.map((t)=>(t = splitColor(t, e, 1)) && `${h + (e ? `${t[0]},${t[1]}%,${t[2]}%,${t[3]}` : t.join(","))})`);
    if (r && (s = eh(t), (i = r.c).join(o) !== s.c.join(o))) {
        for(a = (n = t.replace(qA, "1").split(vM)).length - 1; _ < a; _++){
            o += n[_] + (~i.indexOf(_) ? u.shift() || `${h}0,0,0,0)` : (s.length ? s : u.length ? u : r).shift());
        }
    }
    if (!n) {
        for(a = (n = t.split(qA)).length - 1; _ < a; _++){
            o += n[_] + u[_];
        }
    }
    return o + n[a];
};
export var qA = (()=>{
    let t;
    let e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
    for(t in ea){
        e += `|${t}\\b`;
    }
    return RegExp(`${e})`, "gi");
})();
const el = /hsl[a]?\(/;
export const Uc = function(t) {
    let e;
    const r = t.join(" ");
    qA.lastIndex = 0;
    if (qA.test(r)) {
        e = el.test(r);
        t[1] = e_(t[1], e);
        t[0] = e_(t[0], e, eh(t[1]));
        return true;
    }
};
export var au = (()=>{
    let t;
    let e;
    let r;
    let i;
    let n;
    let s;
    let o = 500;
    let u = 33;
    let c = Date.now();
    let d = c;
    let m = 1000 / 240;
    let v = 1000 / 240;
    const _listeners = [];
    const y = function r(h) {
        let _;
        let f;
        let l;
        let p;
        const y = Date.now() - d;
        const T = h === true;
        if (y > o || y < 0) {
            c += y - u;
        }
        d += y;
        if ((_ = (l = d - c) - v) > 0 || T) {
            p = ++i.frame;
            n = l - 1000 * i.time;
            i.time = l /= 1000;
            v += _ + (_ >= m ? 4 : m - _);
            f = 1;
        }
        if (!T) {
            t = e(r);
        }
        if (f) {
            for(s = 0; s < _listeners.length; s++){
                _listeners[s](l, n, p, h);
            }
        }
    };
    return i = {
        time: 0,
        frame: 0,
        tick: function() {
            y(true);
        },
        deltaRatio: function(t) {
            return n / (1000 / (t || 60));
        },
        wake: function() {
            if (l) {
                if (!_ && E()) {
                    f = (h = _ = window).document || {};
                    V.gsap = os;
                    (h.gsapVersions || (h.gsapVersions = [])).push(os.version);
                    install(j || h.GreenSockGlobals || !h.gsap && h || {});
                    en.forEach(es);
                }
                r = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame;
                if (t) {
                    i.sleep();
                }
                e = r || function(t) {
                    return setTimeout(t, v - 1000 * i.time + 1 | 0);
                };
                p = 1;
                y(2);
            }
        },
        sleep: function() {
            (r ? cancelAnimationFrame : clearTimeout)(t);
            p = 0;
            e = J;
        },
        lagSmoothing: function(t, e) {
            u = Math.min(e || 33, o = t || Infinity);
        },
        fps: function(t) {
            m = 1000 / (t || 240);
            v = 1000 * i.time + m;
        },
        add: function(t, e, r) {
            var n = e ? function(e, r, s, a) {
                t(e, r, s, a);
                i.remove(n);
            } : t;
            i.remove(t);
            _listeners[r ? "unshift" : "push"](n);
            ep();
            return n;
        },
        remove: function(t, e) {
            if (~(e = _listeners.indexOf(t)) && _listeners.splice(e, 1) && s >= e) {
                s--;
            }
        },
        _listeners
    };
})();
var ep = ()=>!p && au.wake();
const em = {};
const ev = /^[\d.\-M][\d.\-,\s]/;
const eg = /["']/g;
const ey = (t)=>{
    let e;
    let r;
    let i;
    const n = {};
    const s = t.substr(1, t.length - 3).split(":");
    let a = s[0];
    for(let o = 1, u = s.length; o < u; o++){
        r = s[o];
        e = o !== u - 1 ? r.lastIndexOf(",") : r.length;
        i = r.substr(0, e);
        n[a] = isNaN(i) ? i.replace(eg, "").trim() : +i;
        a = r.substr(e + 1).trim();
    }
    return n;
};
const eT = (t)=>{
    const e = t.indexOf("(") + 1;
    const r = t.indexOf(")");
    const i = t.indexOf("(", e);
    return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r);
};
const ew = (t)=>{
    const e = `${t}`.split("(");
    const r = em[e[0]];
    if (r && e.length > 1 && r.config) {
        return r.config.apply(null, ~t.indexOf("{") ? [
            ey(e[1])
        ] : eT(t).split(",").map(tg));
    }
    if (em._CE && ev.test(t)) {
        return em._CE("", t);
    }
    return r;
};
var eb = (t)=>function(e) {
        return 1 - t(1 - e);
    };
const ek = function t(e, r) {
    let i;
    for(let n = e._first; n;){
        if (n instanceof Timeline) {
            t(n, r);
        } else {
            if (!(!n.vars.yoyoEase || n._yoyo && n._repeat || n._yoyo === r)) {
                if (n.timeline) {
                    t(n.timeline, r);
                } else {
                    i = n._ease;
                    n._ease = n._yEase;
                    n._yEase = i;
                    n._yoyo = r;
                }
            }
        }
        n = n._next;
    }
};
var ex = (t, e)=>t && (D(t) ? t : em[t] || ew(t)) || e;
const eD = (t, easeIn, easeOut = function(t) {
    return 1 - easeIn(1 - t);
}, easeInOut = function(t) {
    if (t < 0.5) {
        return easeIn(2 * t) / 2;
    }
    return 1 - easeIn((1 - t) * 2) / 2;
})=>{
    let n;
    const s = {
        easeIn,
        easeOut,
        easeInOut
    };
    fA(t, function(t) {
        em[t] = V[t] = s;
        em[n = t.toLowerCase()] = easeOut;
        for(const e in s){
            em[n + (e === "easeIn" ? ".in" : e === "easeOut" ? ".out" : ".inOut")] = em[`${t}.${e}`] = s[e];
        }
    });
    return s;
};
const eM = (t)=>function(e) {
        if (e < 0.5) {
            return (1 - t(1 - 2 * e)) / 2;
        }
        return 0.5 + t((e - 0.5) * 2) / 2;
    };
const eA = function t(e, r, i) {
    const n = r >= 1 ? r : 1;
    let s = (i || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1);
    const a = s / g * (Math.asin(1 / n) || 0);
    const o = function(t) {
        if (t === 1) {
            return 1;
        }
        return n * 2 ** (-10 * t) * Math.sin((t - a) * s) + 1;
    };
    const u = e === "out" ? o : e === "in" ? function(t) {
        return 1 - o(1 - t);
    } : eM(o);
    s = g / s;
    u.config = function(r, i) {
        return t(e, r, i);
    };
    return u;
};
const eC = function t(e, r = 1.70158) {
    const i = function(t) {
        if (t) {
            return --t * t * ((r + 1) * t + r) + 1;
        }
        return 0;
    };
    const n = e === "out" ? i : e === "in" ? function(t) {
        return 1 - i(1 - t);
    } : eM(i);
    n.config = function(r) {
        return t(e, r);
    };
    return n;
};
fA("Linear,Quad,Cubic,Quart,Quint,Strong", function(t, e) {
    const r = e < 5 ? e + 1 : e;
    eD(`${t},Power${r - 1}`, e ? function(t) {
        return t ** r;
    } : function(t) {
        return t;
    }, function(t) {
        return 1 - (1 - t) ** r;
    }, function(t) {
        if (t < 0.5) {
            return (2 * t) ** r / 2;
        }
        return 1 - ((1 - t) * 2) ** r / 2;
    });
});
em.Linear.easeNone = em.none = em.Linear.easeIn;
eD("Elastic", eA("in"), eA("out"), eA());
(()=>{
    const t = 7.5625;
    const e = 2.75;
    const r = 1 / 2.75;
    const i = 1 / 2.75 * 2;
    const n = 1 / 2.75 * 2.5;
    const s = function(s) {
        if (s < r) {
            return 7.5625 * s * s;
        }
        if (s < i) {
            return 7.5625 * (s - 1.5 / 2.75) ** 2 + 0.75;
        }
        if (s < n) {
            return t * (s -= 2.25 / e) * s + 0.9375;
        }
        return t * (s - 2.625 / e) ** 2 + 0.984375;
    };
    eD("Bounce", function(t) {
        return 1 - s(1 - t);
    }, s);
})();
eD("Expo", function(t) {
    return 2 ** (10 * (t - 1)) * t + t * t * t * t * t * t * (1 - t);
});
eD("Circ", function(t) {
    return -(Math.sqrt(1 - t * t) - 1);
});
eD("Sine", function(t) {
    if (t === 1) {
        return 1;
    }
    return -Math.cos(t * y) + 1;
});
eD("Back", eC("in"), eC("out"), eC());
em.SteppedEase = em.steps = V.SteppedEase = {
    config: function(t = 1, e) {
        const r = 1 / t;
        const i = t + +!e;
        const n = +!!e;
        const s = 0.99999999;
        return function(t) {
            return ((i * tX(0, s, t) | 0) + n) * r;
        };
    }
};
defaults.ease = em["quad.out"];
fA("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(t) {
    return ta += `${t},${t}Params,`;
});
export var n6 = function(t, e) {
    this.id = T++;
    t._gsap = this;
    this.target = t;
    this.harness = e;
    this.get = e ? e.get : th;
    this.set = e ? e.getSetter : Dx;
};
const Animation = (()=>{
    function t(t) {
        this.vars = t;
        this._delay = +t.delay || 0;
        if (this._repeat = t.repeat === Infinity ? -2 : t.repeat || 0) {
            this._rDelay = t.repeatDelay || 0;
            this._yoyo = !!t.yoyo || !!t.yoyoEase;
        }
        this._ts = 1;
        tG(this, +t.duration, 1, 1);
        this.data = t.data;
        if (o) {
            this._ctx = o;
            o.data.push(this);
        }
        if (!p) {
            au.wake();
        }
    }
    const t_prototype = t.prototype;
    t_prototype.delay = function(t) {
        if (t || t === 0) {
            if (this.parent && this.parent.smoothChildTiming) {
                this.startTime(this._start + t - this._delay);
            }
            this._delay = t;
            return this;
        }
        return this._delay;
    };
    t_prototype.duration = function(t) {
        if (arguments.length) {
            return this.totalDuration(this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t);
        }
        return this.totalDuration() && this._dur;
    };
    t_prototype.totalDuration = function(t) {
        if (arguments.length) {
            this._dirty = 0;
            return tG(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1));
        }
        return this._tDur;
    };
    t_prototype.totalTime = function(t, e) {
        ep();
        if (!arguments.length) {
            return this._tTime;
        }
        let _dp = this._dp;
        if (_dp && _dp.smoothChildTiming && this._ts) {
            tL(this, t);
            if (!(!_dp._dp || _dp.parent)) {
                tI(_dp, this);
            }
            while(_dp && _dp.parent){
                if (_dp.parent._time !== _dp._start + (_dp._ts >= 0 ? _dp._tTime / _dp._ts : -((_dp.totalDuration() - _dp._tTime) / _dp._ts))) {
                    _dp.totalTime(_dp._tTime, true);
                }
                _dp = _dp.parent;
            }
            if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && t < this._tDur || this._ts < 0 && t > 0 || !this._tDur && !t)) {
                tU(this._dp, this, this._start - this._delay);
            }
        }
        if (this._tTime !== t || !this._dur && !e || this._initted && Math.abs(this._zTime) === 1e-8 || !this._initted && this._dur && t || !t && !this._initted && (this.add || this._ptLookup)) {
            if (!this._ts) {
                this._pTime = t;
            }
            tv(this, t, e);
        }
        return this;
    };
    t_prototype.time = function(t, e) {
        if (arguments.length) {
            return this.totalTime(Math.min(this.totalDuration(), t + tz(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e);
        }
        return this._time;
    };
    t_prototype.totalProgress = function(t, e) {
        if (arguments.length) {
            return this.totalTime(this.totalDuration() * t, e);
        }
        if (this.totalDuration()) {
            return Math.min(1, this._tTime / this._tDur);
        }
        if (this.rawTime() >= 0 && this._initted) {
            return 1;
        }
        return 0;
    };
    t_prototype.progress = function(t, e) {
        if (arguments.length) {
            return this.totalTime(this.duration() * (this._yoyo && !(1 & this.iteration()) ? 1 - t : t) + tz(this), e);
        }
        if (this.duration()) {
            return Math.min(1, this._time / this._dur);
        }
        return +(this.rawTime() > 0);
    };
    t_prototype.iteration = function(t, e) {
        const r = this.duration() + this._rDelay;
        if (arguments.length) {
            return this.totalTime(this._time + (t - 1) * r, e);
        }
        if (this._repeat) {
            return tO(this._tTime, r) + 1;
        }
        return 1;
    };
    t_prototype.timeScale = function(t, e) {
        if (!arguments.length) {
            if (this._rts === -1e-8) {
                return 0;
            }
            return this._rts;
        }
        if (this._rts === t) {
            return this;
        }
        const r = this.parent && this._ts ? tP(this.parent._time, this) : this._tTime;
        this._rts = +t || 0;
        this._ts = this._ps || t === -1e-8 ? 0 : this._rts;
        this.totalTime(tX(-Math.abs(this._delay), this.totalDuration(), r), e !== false);
        tF(this);
        return tE(this);
    };
    t_prototype.paused = function(t) {
        if (arguments.length) {
            if (this._ps !== t) {
                this._ps = t;
                if (t) {
                    this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
                    this._ts = this._act = 0;
                } else {
                    ep();
                    this._ts = this._rts;
                    this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== 1e-8 && (this._tTime -= 1e-8));
                }
            }
            return this;
        }
        return this._ps;
    };
    t_prototype.startTime = function(t) {
        if (arguments.length) {
            this._start = tl(t);
            const e = this.parent || this._dp;
            if (e && (e._sort || !this.parent)) {
                tU(e, this, this._start - this._delay);
            }
            return this;
        }
        return this._start;
    };
    t_prototype.endTime = function(t) {
        return this._start + (R(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
    };
    t_prototype.rawTime = function(t) {
        const e = this.parent || this._dp;
        if (e) {
            if (t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1)) {
                return this._tTime % (this._dur + this._rDelay);
            }
            if (this._ts) {
                return tP(e.rawTime(t), this);
            }
            return this._tTime;
        }
        return this._tTime;
    };
    t_prototype.revert = function(t = Z) {
        const e = a;
        a = t;
        if (tm(this)) {
            if (this.timeline) {
                this.timeline.revert(t);
            }
            this.totalTime(-0.01, t.suppressEvents);
        }
        if (this.data !== "nested" && t.kill !== false) {
            this.kill();
        }
        a = e;
        return this;
    };
    t_prototype.globalTime = function(t) {
        for(var e = this, r = arguments.length ? t : e.rawTime(); e;){
            r = e._start + r / (Math.abs(e._ts) || 1);
            e = e._dp;
        }
        if (!this.parent && this._sat) {
            return this._sat.globalTime(t);
        }
        return r;
    };
    t_prototype.repeat = function(t) {
        if (arguments.length) {
            this._repeat = t === Infinity ? -2 : t;
            return tW(this);
        }
        if (this._repeat === -2) {
            return Infinity;
        }
        return this._repeat;
    };
    t_prototype.repeatDelay = function(t) {
        if (arguments.length) {
            const e = this._time;
            this._rDelay = t;
            tW(this);
            if (e) {
                return this.time(e);
            }
            return this;
        }
        return this._rDelay;
    };
    t_prototype.yoyo = function(t) {
        if (arguments.length) {
            this._yoyo = t;
            return this;
        }
        return this._yoyo;
    };
    t_prototype.seek = function(t, e) {
        return this.totalTime(tH(this, t), R(e));
    };
    t_prototype.restart = function(t, e) {
        this.play().totalTime(t ? -this._delay : 0, R(e));
        if (!this._dur) {
            this._zTime = -1e-8;
        }
        return this;
    };
    t_prototype.play = function(t, e) {
        if (t != null) {
            this.seek(t, e);
        }
        return this.reversed(false).paused(false);
    };
    t_prototype.reverse = function(t, e) {
        if (t != null) {
            this.seek(t || this.totalDuration(), e);
        }
        return this.reversed(true).paused(false);
    };
    t_prototype.pause = function(t, e) {
        if (t != null) {
            this.seek(t, e);
        }
        return this.paused(true);
    };
    t_prototype.resume = function() {
        return this.paused(false);
    };
    t_prototype.reversed = function(t) {
        if (arguments.length) {
            if (!!t !== this.reversed()) {
                this.timeScale(-this._rts || (t ? -1e-8 : 0));
            }
            return this;
        }
        return this._rts < 0;
    };
    t_prototype.invalidate = function() {
        this._initted = this._act = 0;
        this._zTime = -1e-8;
        return this;
    };
    t_prototype.isActive = function() {
        let t;
        const e = this.parent || this._dp;
        const _start = this._start;
        return !!(!e || this._ts && this._initted && e.isActive() && (t = e.rawTime(true)) >= _start && t < this.endTime(true) - 1e-8);
    };
    t_prototype.eventCallback = function(t, e, r) {
        const vars = this.vars;
        if (arguments.length > 1) {
            if (e) {
                vars[t] = e;
                if (r) {
                    vars[`${t}Params`] = r;
                }
                if (t === "onUpdate") {
                    this._onUpdate = e;
                }
            } else {
                delete vars[t];
            }
            return this;
        }
        return vars[t];
    };
    t_prototype.then = function(t) {
        const e = this;
        const e__prom = e._prom;
        return new Promise((resolve)=>{
            let n = D(t) ? t : ty;
            const s = function() {
                const e_then = e.then;
                e.then = null;
                if (e__prom) {
                    e__prom();
                }
                if (D(n) && (n = n(e)) && (n.then || n === e)) {
                    e.then = e_then;
                }
                resolve(n);
                e.then = e_then;
            };
            if (e._initted && e.totalProgress() === 1 && e._ts >= 0 || !e._tTime && e._ts < 0) {
                s();
            } else {
                e._prom = s;
            }
        });
    };
    t_prototype.kill = function() {
        ei(this);
    };
    return t;
})();
tT(Animation.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -1e-8,
    _prom: 0,
    _ps: false,
    _rts: 1
});
var Timeline = ((Animation_1)=>{
    function e(e = {}, r) {
        let n;
        n = Animation_1.call(this, e) || this;
        n.labels = {};
        n.smoothChildTiming = !!e.smoothChildTiming;
        n.autoRemoveChildren = !!e.autoRemoveChildren;
        n._sort = R(e.sortChildren);
        if (globalTimeline) {
            tU(e.parent || globalTimeline, i(n), r);
        }
        if (e.reversed) {
            n.reverse();
        }
        if (e.paused) {
            n.paused(true);
        }
        if (e.scrollTrigger) {
            tB(i(n), e.scrollTrigger);
        }
        return n;
    }
    n(e, Animation_1);
    const e_prototype = e.prototype;
    e_prototype.to = function(t, e, r) {
        tJ(0, arguments, this);
        return this;
    };
    e_prototype.from = function(t, e, r) {
        tJ(1, arguments, this);
        return this;
    };
    e_prototype.fromTo = function(t, e, r, i) {
        tJ(2, arguments, this);
        return this;
    };
    e_prototype.set = function(t, e, r) {
        e.duration = 0;
        e.parent = this;
        if (!tx(e).repeatDelay) {
            e.repeat = 0;
        }
        e.immediateRender = !!e.immediateRender;
        new Tween(t, e, tH(this, r), 1);
        return this;
    };
    e_prototype.call = function(t, e, r) {
        return tU(this, Tween.delayedCall(0, t, e), r);
    };
    e_prototype.staggerTo = function(t, e, r, i, n, s, a) {
        r.duration = e;
        r.stagger = r.stagger || i;
        r.onComplete = s;
        r.onCompleteParams = a;
        r.parent = this;
        new Tween(t, r, tH(this, n));
        return this;
    };
    e_prototype.staggerFrom = function(t, e, r, i, n, s, a) {
        r.runBackwards = 1;
        tx(r).immediateRender = R(r.immediateRender);
        return this.staggerTo(t, e, r, i, n, s, a);
    };
    e_prototype.staggerFromTo = function(t, e, r, i, n, s, a, o) {
        i.startAt = r;
        tx(i).immediateRender = R(i.immediateRender);
        return this.staggerTo(t, e, i, n, s, a, o);
    };
    e_prototype.render = function(t, e, r) {
        let i;
        let n;
        let s;
        let o;
        let h;
        let _;
        let f;
        let l;
        let c;
        let d;
        let p;
        let m;
        let _time = this._time;
        let g = this._dirty ? this.totalDuration() : this._tDur;
        let _dur = this._dur;
        let T = t <= 0 ? 0 : tl(t);
        const w = this._zTime < 0 != t < 0 && (this._initted || !_dur);
        if (this !== globalTimeline && T > g && t >= 0) {
            T = g;
        }
        if (T !== this._tTime || r || w) {
            if (_time !== this._time && _dur) {
                T += this._time - _time;
                t += this._time - _time;
            }
            i = T;
            c = this._start;
            _ = !(l = this._ts);
            if (w) {
                if (!_dur) {
                    _time = this._zTime;
                }
                if (t || !e) {
                    this._zTime = t;
                }
            }
            if (this._repeat) {
                p = this._yoyo;
                h = _dur + this._rDelay;
                if (this._repeat < -1 && t < 0) {
                    return this.totalTime(100 * h + t, e, r);
                }
                i = tl(T % h);
                if (T === g) {
                    o = this._repeat;
                    i = _dur;
                } else {
                    if ((o = ~~(d = tl(T / h))) && o === d) {
                        i = _dur;
                        o--;
                    }
                    if (i > _dur) {
                        i = _dur;
                    }
                }
                d = tO(this._tTime, h);
                if (!_time && this._tTime && d !== o && this._tTime - d * h - this._dur <= 0) {
                    d = o;
                }
                if (p && 1 & o) {
                    i = _dur - i;
                    m = 1;
                }
                if (o !== d && !this._lock) {
                    let b = p && 1 & d;
                    const k = b === (p && 1 & o);
                    if (o < d) {
                        b = !b;
                    }
                    _time = b ? 0 : T % _dur ? _dur : T;
                    this._lock = 1;
                    this.render(_time || (m ? 0 : tl(o * h)), e, !_dur)._lock = 0;
                    this._tTime = T;
                    if (!e && this.parent) {
                        er(this, "onRepeat");
                    }
                    if (this.vars.repeatRefresh && !m) {
                        this.invalidate()._lock = 1;
                        d = o;
                    }
                    if (_time && _time !== this._time || !this._ts !== _ || this.vars.onRepeat && !this.parent && !this._act || (_dur = this._dur, g = this._tDur, k && (this._lock = 2, _time = b ? _dur : -0.0001, this.render(_time, true), this.vars.repeatRefresh && !m && this.invalidate()), this._lock = 0, !this._ts && !_)) {
                        return this;
                    }
                    ek(this, m);
                }
            }
            if (this._hasPause && !this._forcing && this._lock < 2 && (f = tj(this, tl(_time), tl(i)))) {
                T -= i - (i = f._start);
            }
            this._tTime = T;
            this._time = i;
            this._act = !l;
            if (!this._initted) {
                this._onUpdate = this.vars.onUpdate;
                this._initted = 1;
                this._zTime = t;
                _time = 0;
            }
            if (!_time && T && _dur && !e && !d && (er(this, "onStart"), this._tTime !== T)) {
                return this;
            }
            if (i >= _time && t >= 0) {
                for(n = this._first; n;){
                    s = n._next;
                    if ((n._act || i >= n._start) && n._ts && f !== n) {
                        if (n.parent !== this) {
                            return this.render(t, e, r);
                        }
                        n.render(n._ts > 0 ? (i - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (i - n._start) * n._ts, e, r);
                        if (i !== this._time || !this._ts && !_) {
                            f = 0;
                            if (s) {
                                T += this._zTime = -1e-8;
                            }
                            break;
                        }
                    }
                    n = s;
                }
            } else {
                n = this._last;
                const x = t < 0 ? t : i;
                while(n){
                    s = n._prev;
                    if ((n._act || x <= n._end) && n._ts && f !== n) {
                        if (n.parent !== this) {
                            return this.render(t, e, r);
                        }
                        n.render(n._ts > 0 ? (x - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (x - n._start) * n._ts, e, r || a && tm(n));
                        if (i !== this._time || !this._ts && !_) {
                            f = 0;
                            if (s) {
                                T += this._zTime = x ? -1e-8 : 1e-8;
                            }
                            break;
                        }
                    }
                    n = s;
                }
            }
            if (f && !e && (this.pause(), f.render(i >= _time ? 0 : -1e-8)._zTime = i >= _time ? 1 : -1, this._ts)) {
                this._start = c;
                tF(this);
                return this.render(t, e, r);
            }
            if (this._onUpdate && !e) {
                er(this, "onUpdate", true);
            }
            if ((T === g && this._tTime >= this.totalDuration() || !T && _time) && (c === this._start || Math.abs(l) !== Math.abs(this._ts)) && !this._lock) {
                if ((t || !_dur) && (T === g && this._ts > 0 || !T && this._ts < 0)) {
                    tC(this, 1);
                }
                if (!(e || t < 0 && !_time || !T && !_time && g)) {
                    er(this, T === g && t >= 0 ? "onComplete" : "onReverseComplete", true);
                    if (this._prom && !(T < g && this.timeScale() > 0)) {
                        this._prom();
                    }
                }
            }
        }
        return this;
    };
    e_prototype.add = function(t, e) {
        const r = this;
        if (!M(e)) {
            e = tH(this, e, t);
        }
        if (!(t instanceof Animation)) {
            if (Array.isArray(t)) {
                t.forEach((t)=>r.add(t, e));
                return this;
            }
            if (vQ(t)) {
                return this.addLabel(t, e);
            }
            if (!D(t)) {
                return this;
            }
            t = Tween.delayedCall(0, t);
        }
        if (this !== t) {
            return tU(this, t, e);
        }
        return this;
    };
    e_prototype.getChildren = function(t = true, e = true, r = true, i = -100000000) {
        const n = [];
        for(let s = this._first; s;){
            if (s._start >= i) {
                if (s instanceof Tween) {
                    if (e) {
                        n.push(s);
                    }
                } else {
                    if (r) {
                        n.push(s);
                    }
                    if (t) {
                        n.push(...s.getChildren(true, e, r));
                    }
                }
            }
            s = s._next;
        }
        return n;
    };
    e_prototype.getById = function(t) {
        const e = this.getChildren(1, 1, 1);
        for(let r = e.length; r--;){
            if (e[r].vars.id === t) {
                return e[r];
            }
        }
    };
    e_prototype.remove = function(t) {
        if (vQ(t)) {
            return this.removeLabel(t);
        }
        if (D(t)) {
            return this.killTweensOf(t);
        }
        if (t.parent === this) {
            _removeLinkedListItem(this, t);
        }
        if (t === this._recent) {
            this._recent = this._last;
        }
        return tR(this);
    };
    e_prototype.totalTime = function(e, r) {
        if (arguments.length) {
            this._forcing = 1;
            if (!this._dp && this._ts) {
                this._start = tl(au.time - (this._ts > 0 ? e / this._ts : -((this.totalDuration() - e) / this._ts)));
            }
            Animation_1.prototype.totalTime.call(this, e, r);
            this._forcing = 0;
            return this;
        }
        return this._tTime;
    };
    e_prototype.addLabel = function(t, e) {
        this.labels[t] = tH(this, e);
        return this;
    };
    e_prototype.removeLabel = function(t) {
        delete this.labels[t];
        return this;
    };
    e_prototype.addPause = function(t, e, r) {
        const i = Tween.delayedCall(0, e || J, r);
        i.data = "isPause";
        this._hasPause = 1;
        return tU(this, i, tH(this, t));
    };
    e_prototype.removePause = function(t) {
        let _first = this._first;
        for(t = tH(this, t); _first;){
            if (_first._start === t && _first.data === "isPause") {
                tC(_first);
            }
            _first = _first._next;
        }
    };
    e_prototype.killTweensOf = function(t, e, r) {
        const i = this.getTweensOf(t, r);
        for(let n = i.length; n--;){
            if (ez !== i[n]) {
                i[n].kill(t, e);
            }
        }
        return this;
    };
    e_prototype.getTweensOf = function(t, e) {
        let r;
        const i = [];
        const n = toArray(t);
        for(let s = this._first, a = M(e); s;){
            if (s instanceof Tween) {
                if (td(s._targets, n) && (a ? (!ez || s._initted && s._ts) && s.globalTime(0) <= e && s.globalTime(s.totalDuration()) > e : !e || s.isActive())) {
                    i.push(s);
                }
            } else if ((r = s.getTweensOf(n, e)).length) {
                i.push(...r);
            }
            s = s._next;
        }
        return i;
    };
    e_prototype.tweenTo = function(t, e) {
        e = e || {};
        let r;
        const i = this;
        const time = tH(i, t);
        const s = e;
        const { startAt, onStart, onStartParams, immediateRender } = s;
        var _ = Tween.to(i, tT({
            ease: e.ease || "none",
            lazy: false,
            immediateRender: false,
            time,
            overwrite: "auto",
            duration: e.duration || Math.abs((time - (startAt && "time" in startAt ? startAt.time : i._time)) / i.timeScale()) || 1e-8,
            onStart: function() {
                i.pause();
                if (!r) {
                    const t = e.duration || Math.abs((time - (startAt && "time" in startAt ? startAt.time : i._time)) / i.timeScale());
                    if (_._dur !== t) {
                        tG(_, t, 0, 1).render(_._time, true, true);
                    }
                    r = 1;
                }
                if (onStart) {
                    onStart.apply(_, onStartParams || []);
                }
            }
        }, e));
        if (immediateRender) {
            return _.render(0);
        }
        return _;
    };
    e_prototype.tweenFromTo = function(t, e, r) {
        return this.tweenTo(e, tT({
            startAt: {
                time: tH(this, t)
            }
        }, r));
    };
    e_prototype.recent = function() {
        return this._recent;
    };
    e_prototype.nextLabel = function(t = this._time) {
        return ee(this, tH(this, t));
    };
    e_prototype.previousLabel = function(t = this._time) {
        return ee(this, tH(this, t), 1);
    };
    e_prototype.currentLabel = function(t) {
        if (arguments.length) {
            return this.seek(t, true);
        }
        return this.previousLabel(this._time + 1e-8);
    };
    e_prototype.shiftChildren = function(t, e, r = 0) {
        let i;
        let _first = this._first;
        const labels = this.labels;
        for(t = tl(t); _first;){
            if (_first._start >= r) {
                _first._start += t;
                _first._end += t;
            }
            _first = _first._next;
        }
        if (e) {
            for(i in labels){
                if (labels[i] >= r) {
                    labels[i] += t;
                }
            }
        }
        return tR(this);
    };
    e_prototype.invalidate = function(e) {
        let _first = this._first;
        for(this._lock = 0; _first;){
            _first.invalidate(e);
            _first = _first._next;
        }
        return Animation_1.prototype.invalidate.call(this, e);
    };
    e_prototype.clear = function(t = true) {
        let e;
        for(let r = this._first; r;){
            e = r._next;
            this.remove(r);
            r = e;
        }
        if (this._dp) {
            this._time = this._tTime = this._pTime = 0;
        }
        if (t) {
            this.labels = {};
        }
        return tR(this);
    };
    e_prototype.totalDuration = function(t) {
        let e;
        let r;
        let i;
        let n = 0;
        let _last = this._last;
        let a = 100000000;
        if (arguments.length) {
            return this.timeScale((this._repeat < 0 ? this.duration() : this.totalDuration()) / (this.reversed() ? -t : t));
        }
        if (this._dirty) {
            for(i = this.parent; _last;){
                e = _last._prev;
                if (_last._dirty) {
                    _last.totalDuration();
                }
                if ((r = _last._start) > a && this._sort && _last._ts && !this._lock) {
                    this._lock = 1;
                    tU(this, _last, r - _last._delay, 1)._lock = 0;
                } else {
                    a = r;
                }
                if (r < 0 && _last._ts) {
                    n -= r;
                    if (!i && !this._dp || i && i.smoothChildTiming) {
                        this._start += tl(r / this._ts);
                        this._time -= r;
                        this._tTime -= r;
                    }
                    this.shiftChildren(-r, false, -Infinity);
                    a = 0;
                }
                if (_last._end > n && _last._ts) {
                    n = _last._end;
                }
                _last = e;
            }
            tG(this, this === globalTimeline && this._time > n ? this._time : n, 1, 1);
            this._dirty = 0;
        }
        return this._tDur;
    };
    e.updateRoot = function(t) {
        if (globalTimeline._ts) {
            tv(globalTimeline, tP(t, globalTimeline));
            c = au.frame;
        }
        if (au.frame >= tn) {
            tn += Yz.autoSleep || 120;
            let e = globalTimeline._first;
            if ((!e || !e._ts) && Yz.autoSleep && au._listeners.length < 2) {
                while(e && !e._ts){
                    e = e._next;
                }
                if (!e) {
                    au.sleep();
                }
            }
        }
    };
    return e;
})(Animation);
tT(Timeline.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
});
var ez;
let eO;
const eP = function(t, e, r, i, n, s, a) {
    let o;
    let u;
    let h;
    let _;
    let f;
    let s_1;
    let c;
    let d;
    const p = new J7(this._pt, t, e, 0, 1, l1, null, n);
    let m = 0;
    let v = 0;
    p.b = r;
    p.e = i;
    r += "";
    i += "";
    if (c = ~i.indexOf("random(")) {
        i = Vy(i);
    }
    if (s) {
        s(d = [
            r,
            i
        ], t, e);
        r = d[0];
        i = d[1];
    }
    for(u = r.match(B) || []; o = B.exec(i);){
        _ = o[0];
        f = i.substring(m, o.index);
        if (h) {
            h = (h + 1) % 5;
        } else if (f.substr(-5) === "rgba(") {
            h = 1;
        }
        if (_ !== u[v++]) {
            s_1 = parseFloat(u[v - 1]) || 0;
            p._pt = {
                _next: p._pt,
                p: f || v === 1 ? f : ",",
                s: s_1,
                c: _.charAt(1) === "=" ? B0(s_1, _) - s_1 : parseFloat(_) - s_1,
                m: h && h < 4 ? Math.round : 0
            };
            m = B.lastIndex;
        }
    }
    p.c = m < i.length ? i.substring(m, i.length) : "";
    p.fp = a;
    if (Ks.test(i) || c) {
        p.e = 0;
    }
    this._pt = p;
    return p;
};
var add = function(t, e, r, i, n, s, a, o, u, h) {
    if (D(i)) {
        i = i(n || 0, t, s);
    }
    let _;
    const f = t[e];
    const l = r !== "get" ? r : D(f) ? u ? t[e.indexOf("set") || !D(t[`get${e.substr(3)}`]) ? e : `get${e.substr(3)}`](u) : t[e]() : f;
    const c = D(f) ? u ? eH : eY : eW;
    if (vQ(i)) {
        if (~i.indexOf("random(")) {
            i = Vy(i);
        }
        if (i.charAt(1) === "=" && ((_ = B0(l, i) + (l_(l) || 0)) || _ === 0)) {
            i = _;
        }
    }
    if (!h || l !== i || eO) {
        if (isNaN(l * i) || i === "") {
            if (!(f || e in t)) {
                dg(e, i);
            }
            return eP.call(this, t, e, l, i, c, o || Yz.stringFilter, u);
        }
        _ = new J7(this._pt, t, e, +l || 0, i - (l || 0), typeof f === "boolean" ? eZ : eX, 0, c);
        if (u) {
            _.fp = u;
        }
        if (a) {
            _.modifier(a, this, t);
        }
        return this._pt = _;
    }
};
const eL = (t, e, r, i, n)=>{
    if (D(t)) {
        t = eQ(t, n, e, r, i);
    }
    if (!C(t) || t.style && t.nodeType || Array.isArray(t) || z(t)) {
        if (vQ(t)) {
            return eQ(t, n, e, r, i);
        }
        return t;
    }
    let s;
    const a = {};
    for(s in t){
        a[s] = eQ(t[s], n, e, r, i);
    }
    return a;
};
export const Zm = function(t, e, r, i, n, s) {
    let a;
    let o;
    let u;
    let h;
    if (wU[t] && (a = new wU[t]).init(n, a.rawVars ? e[t] : eL(e[t], i, n, s, r), r, i, s) !== false && (r._pt = o = new J7(r._pt, n, t, 0, 1, a.render, a, 0, a.priority), r !== d)) {
        u = r._ptLookup[r._targets.indexOf(n)];
        for(h = a._props.length; h--;){
            u[a._props[h]] = o;
        }
    }
    return a;
};
var eU = function t(e, r, i) {
    let n;
    let o;
    let h;
    let _;
    let f;
    let l;
    let c;
    let d;
    let p;
    let m;
    let g;
    let y;
    let T;
    const e_vars = e.vars;
    let w_ease = e_vars.ease;
    const w_startAt = e_vars.startAt;
    let w_immediateRender = e_vars.immediateRender;
    let w_lazy = e_vars.lazy;
    const { onUpdate, runBackwards } = e_vars;
    let w_yoyoEase = e_vars.yoyoEase;
    const { keyframes, autoRevert } = e_vars;
    const { _dur, _startAt, _targets, parent } = e;
    const L = parent && parent.data === "nested" ? parent.vars.targets : _targets;
    const I = e._overwrite === "auto" && !s;
    const e_timeline = e.timeline;
    if (!(!e_timeline || keyframes && w_ease)) {
        w_ease = "none";
    }
    e._ease = ex(w_ease, defaults.ease);
    e._yEase = w_yoyoEase ? eb(ex(w_yoyoEase === true ? w_ease : w_yoyoEase, defaults.ease)) : 0;
    if (w_yoyoEase && e._yoyo && !e._repeat) {
        w_yoyoEase = e._yEase;
        e._yEase = e._ease;
        e._ease = w_yoyoEase;
    }
    e._from = !e_timeline && !!e_vars.runBackwards;
    if (!e_timeline || keyframes && !e_vars.stagger) {
        y = (d = _targets[0] ? a0(_targets[0]).harness : 0) && e_vars[d.prop];
        n = tk(e_vars, $);
        if (_startAt) {
            if (_startAt._zTime < 0) {
                _startAt.progress(1);
            }
            if (r < 0 && runBackwards && w_immediateRender && !autoRevert) {
                _startAt.render(-1, true);
            } else {
                _startAt.revert(runBackwards && _dur ? X : K);
            }
            _startAt._lazy = 0;
        }
        if (w_startAt) {
            tC(e._startAt = Tween.set(_targets, tT({
                data: "isStart",
                overwrite: false,
                parent,
                immediateRender: true,
                lazy: !_startAt && R(w_lazy),
                startAt: null,
                delay: 0,
                onUpdate: onUpdate && function() {
                    return er(e, "onUpdate");
                },
                stagger: 0
            }, w_startAt)));
            e._startAt._dp = 0;
            e._startAt._sat = e;
            if (r < 0 && (a || !w_immediateRender && !autoRevert)) {
                e._startAt.revert(X);
            }
            if (w_immediateRender && _dur && r <= 0 && i <= 0) {
                if (r) {
                    e._zTime = r;
                }
                return;
            }
        } else if (runBackwards && _dur && !_startAt) {
            if (r) {
                w_immediateRender = false;
            }
            h = tT({
                overwrite: false,
                data: "isFromStart",
                lazy: w_immediateRender && !_startAt && R(w_lazy),
                immediateRender: w_immediateRender,
                stagger: 0,
                parent
            }, n);
            if (y) {
                h[d.prop] = y;
            }
            tC(e._startAt = Tween.set(_targets, h));
            e._startAt._dp = 0;
            e._startAt._sat = e;
            if (r < 0) {
                if (a) {
                    e._startAt.revert(X);
                } else {
                    e._startAt.render(-1, true);
                }
            }
            e._zTime = r;
            if (w_immediateRender) {
                if (!r) {
                    return;
                }
            } else {
                t(e._startAt, 1e-8, 1e-8);
            }
        }
        o = 0;
        e._pt = e._ptCache = 0;
        for(w_lazy = _dur && R(w_lazy) || w_lazy && !_dur; o < _targets.length; o++){
            c = (f = _targets[o])._gsap || to(_targets)[o]._gsap;
            e._ptLookup[o] = m = {};
            if (te[c.id] && tt.length) {
                tp();
            }
            g = L === _targets ? o : L.indexOf(f);
            if (d && (p = new d).init(f, y || n, e, g, L) !== false) {
                e._pt = _ = new J7(e._pt, f, p.name, 0, 1, p.render, p, 0, p.priority);
                p._props.forEach((t)=>{
                    m[t] = _;
                });
                if (p.priority) {
                    l = 1;
                }
            }
            if (!d || y) {
                for(h in n){
                    if (wU[h] && (p = Zm(h, n, e, g, f, L))) {
                        if (p.priority) {
                            l = 1;
                        }
                    } else {
                        m[h] = _ = add.call(e, f, h, "get", n[h], g, L, 0, e_vars.stringFilter);
                    }
                }
            }
            if (e._op && e._op[o]) {
                e.kill(f, e._op[o]);
            }
            if (I && e._pt) {
                ez = e;
                globalTimeline.killTweensOf(f, m, e.globalTime(r));
                T = !e.parent;
                ez = 0;
            }
            if (e._pt && w_lazy) {
                te[c.id] = 1;
            }
        }
        if (l) {
            St(e);
        }
        if (e._onInit) {
            e._onInit(e);
        }
    }
    e._onUpdate = onUpdate;
    e._initted = (!e._op || e._pt) && !T;
    if (keyframes && r <= 0) {
        e_timeline.render(100000000, true, true);
    }
};
const eB = (t, e, r, i, n, s, a, o)=>{
    let u;
    let h;
    let _;
    let f;
    let l = (t._pt && t._ptCache || (t._ptCache = {}))[e];
    if (!l) {
        l = t._ptCache[e] = [];
        _ = t._ptLookup;
        for(f = t._targets.length; f--;){
            if ((u = _[f][e]) && u.d && u.d._pt) {
                for(u = u.d._pt; u && u.p !== e && u.fp !== e;){
                    u = u._next;
                }
            }
            if (!u) {
                eO = 1;
                t.vars[e] = "+=0";
                eU(t, a);
                eO = 0;
                if (o) {
                    return Y(`${e} not eligible for reset`);
                }
                return 1;
            }
            l.push(u);
        }
    }
    for(f = l.length; f--;){
        u = (h = l[f])._pt || h;
        u.s = (i || i === 0) && !n ? i : u.s + (i || 0) + s * u.c;
        u.c = r - u.s;
        if (h.e) {
            h.e = E_(r) + l_(h.e);
        }
        if (h.b) {
            h.b = u.s + l_(h.b);
        }
    }
};
const eq = (_targets, e)=>{
    let r;
    let i;
    let n;
    let s;
    const a = _targets[0] ? a0(_targets[0]).harness : 0;
    const o = a && a.aliases;
    if (!o) {
        return e;
    }
    r = tw({}, e);
    for(i in o){
        if (i in r) {
            for(n = (s = o[i].split(",")).length; n--;){
                r[s[n]] = r[i];
            }
        }
    }
    return r;
};
const eN = (t, e, r, easeEach)=>{
    let n;
    let s;
    const e_1 = e.ease || easeEach || "power1.inOut";
    if (Array.isArray(e)) {
        s = r[t] || (r[t] = []);
        e.forEach((v_1, r)=>s.push({
                t: r / (e.length - 1) * 100,
                v: v_1,
                e: e_1
            }));
    } else {
        for(n in e){
            s = r[n] || (r[n] = []);
            if (n !== "ease") {
                s.push({
                    t: parseFloat(t),
                    v: e[n],
                    e: e_1
                });
            }
        }
    }
};
var eQ = (t, e, r, i, n)=>{
    if (D(t)) {
        return t.call(e, r, i, n);
    }
    if (vQ(t) && ~t.indexOf("random(")) {
        return Vy(t);
    }
    return t;
};
const eV = `${ta}repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert`;
const ej = {};
fA(`${eV},id,stagger,delay,duration,paused,scrollTrigger`, function(t) {
    return ej[t] = 1;
});
var Tween = ((Animation_1)=>{
    function e(e, r, n, a) {
        if (typeof r === "number") {
            n.duration = r;
            r = n;
            n = null;
        }
        let o;
        let h;
        let _;
        let f;
        let l;
        let c;
        let d;
        let p;
        const v = Animation_1.call(this, a ? r : tx(r)) || this;
        const v_vars = v.vars;
        let g_duration = v_vars.duration;
        let g_delay = v_vars.delay;
        const { immediateRender, stagger, overwrite, keyframes, defaults, scrollTrigger, yoyoEase } = v_vars;
        const P = r.parent || globalTimeline;
        const F = (Array.isArray(e) || z(e) ? M(e[0]) : "length" in r) ? [
            e
        ] : toArray(e);
        v._targets = F.length ? to(F) : Y(`GSAP target ${e} not found. https://gsap.com`, !Yz.nullTargetWarn) || [];
        v._ptLookup = [];
        v._overwrite = overwrite;
        if (keyframes || stagger || S(g_duration) || S(g_delay)) {
            r = v.vars;
            (o = v.timeline = new Timeline({
                data: "nested",
                defaults: defaults || {},
                targets: P && P.data === "nested" ? P.vars.targets : F
            })).kill();
            o.parent = o._dp = i(v);
            o._start = 0;
            if (stagger || S(g_duration) || S(g_delay)) {
                f = F.length;
                d = stagger && distribute(stagger);
                if (C(stagger)) {
                    for(l in stagger){
                        if (~eV.indexOf(l)) {
                            if (!p) {
                                p = {};
                            }
                            p[l] = stagger[l];
                        }
                    }
                }
                for(h = 0; h < f; h++){
                    _ = tk(r, ej);
                    _.stagger = 0;
                    if (yoyoEase) {
                        _.yoyoEase = yoyoEase;
                    }
                    if (p) {
                        tw(_, p);
                    }
                    c = F[h];
                    _.duration = +eQ(g_duration, i(v), h, c, F);
                    _.delay = (+eQ(g_delay, i(v), h, c, F) || 0) - v._delay;
                    if (!stagger && f === 1 && _.delay) {
                        v._delay = g_delay = _.delay;
                        v._start += g_delay;
                        _.delay = 0;
                    }
                    o.to(c, _, d ? d(h, c, F) : 0);
                    o._ease = em.none;
                }
                if (o.duration()) {
                    g_delay = 0;
                    g_duration = 0;
                } else {
                    v.timeline = 0;
                }
            } else if (keyframes) {
                tx(tT(o.vars.defaults, {
                    ease: "none"
                }));
                o._ease = ex(keyframes.ease || r.ease || "none");
                let L;
                let I;
                let U;
                let B = 0;
                if (Array.isArray(keyframes)) {
                    keyframes.forEach((t)=>o.to(F, t, ">"));
                    o.duration();
                } else {
                    _ = {};
                    for(l in keyframes){
                        if (!(l === "ease" || l === "easeEach")) {
                            eN(l, keyframes[l], _, keyframes.easeEach);
                        }
                    }
                    for(l in _){
                        h = 0;
                        L = _[l].sort((t, e)=>t.t - e.t);
                        for(B = 0; h < L.length; h++){
                            U = {
                                ease: (I = L[h]).e,
                                duration: (I.t - (h ? L[h - 1].t : 0)) / 100 * g_duration
                            };
                            U[l] = I.v;
                            o.to(F, U, B);
                            B += U.duration;
                        }
                    }
                    if (o.duration() < g_duration) {
                        o.to({}, {
                            duration: g_duration - o.duration()
                        });
                    }
                }
            }
            if (!g_duration) {
                v.duration(g_duration = o.duration());
            }
        } else {
            v.timeline = 0;
        }
        if (!(overwrite !== true || s)) {
            ez = i(v);
            globalTimeline.killTweensOf(F);
            ez = 0;
        }
        tU(P, i(v), n);
        if (r.reversed) {
            v.reverse();
        }
        if (r.paused) {
            v.paused(true);
        }
        if (immediateRender || !g_duration && !keyframes && v._start === tl(P._time) && R(immediateRender) && function t(e) {
            return !e || e._ts && t(e.parent);
        }(i(v)) && P.data !== "nested") {
            v._tTime = -1e-8;
            v.render(Math.max(0, -g_delay) || 0);
        }
        if (scrollTrigger) {
            tB(i(v), scrollTrigger);
        }
        return v;
    }
    n(e, Animation_1);
    const e_prototype = e.prototype;
    e_prototype.render = function(t, e, r) {
        let i;
        let n;
        let s;
        let a;
        let o;
        let u;
        let h;
        let _;
        let f;
        const _time = this._time;
        const _tDur = this._tDur;
        const _dur = this._dur;
        const p = t < 0;
        const m = t > _tDur - 1e-8 && !p ? _tDur : t < 1e-8 ? 0 : t;
        if (_dur) {
            if (m !== this._tTime || !t || r || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== p || this._lazy) {
                i = m;
                _ = this.timeline;
                if (this._repeat) {
                    a = _dur + this._rDelay;
                    if (this._repeat < -1 && p) {
                        return this.totalTime(100 * a + t, e, r);
                    }
                    i = tl(m % a);
                    if (m === _tDur) {
                        s = this._repeat;
                        i = _dur;
                    } else if ((s = ~~(o = tl(m / a))) && s === o) {
                        i = _dur;
                        s--;
                    } else if (i > _dur) {
                        i = _dur;
                    }
                    if (u = this._yoyo && 1 & s) {
                        f = this._yEase;
                        i = _dur - i;
                    }
                    o = tO(this._tTime, a);
                    if (i === _time && !r && this._initted && s === o) {
                        this._tTime = m;
                        return this;
                    }
                    if (s !== o) {
                        if (_ && this._yEase) {
                            ek(_, u);
                        }
                        if (this.vars.repeatRefresh && !u && !this._lock && i !== a && this._initted) {
                            this._lock = r = 1;
                            this.render(tl(a * s), true).invalidate()._lock = 0;
                        }
                    }
                }
                if (!this._initted) {
                    if (tq(this, p ? t : i, r, e, m)) {
                        this._tTime = 0;
                        return this;
                    }
                    if (_time !== this._time && !(r && this.vars.repeatRefresh && s !== o)) {
                        return this;
                    }
                    if (_dur !== this._dur) {
                        return this.render(t, e, r);
                    }
                }
                this._tTime = m;
                this._time = i;
                if (!this._act && this._ts) {
                    this._act = 1;
                    this._lazy = 0;
                }
                this.ratio = h = (f || this._ease)(i / _dur);
                if (this._from) {
                    this.ratio = h = 1 - h;
                }
                if (!_time && m && !e && !o && (er(this, "onStart"), this._tTime !== m)) {
                    return this;
                }
                for(n = this._pt; n;){
                    n.r(h, n.d);
                    n = n._next;
                }
                if (!(_ && _.render(t < 0 ? t : _._dur * _._ease(i / this._dur), e, r))) {
                    if (this._startAt) {
                        this._zTime = t;
                    }
                }
                if (this._onUpdate && !e) {
                    if (p) {
                        tS(this, t, e, r);
                    }
                    er(this, "onUpdate");
                }
                if (this._repeat && s !== o && this.vars.onRepeat && !e && this.parent) {
                    er(this, "onRepeat");
                }
                if ((m === this._tDur || !m) && this._tTime === m) {
                    if (p && !this._onUpdate) {
                        tS(this, t, true, true);
                    }
                    if ((t || !_dur) && (m === this._tDur && this._ts > 0 || !m && this._ts < 0)) {
                        tC(this, 1);
                    }
                    if (!e && !(p && !_time) && (m || _time || u)) {
                        er(this, m === _tDur ? "onComplete" : "onReverseComplete", true);
                        if (this._prom && !(m < _tDur && this.timeScale() > 0)) {
                            this._prom();
                        }
                    }
                }
            }
        } else {
            tV(this, t, e, r);
        }
        return this;
    };
    e_prototype.targets = function() {
        return this._targets;
    };
    e_prototype.invalidate = function(e) {
        if (!(e && this.vars.runBackwards)) {
            this._startAt = 0;
        }
        this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
        this._ptLookup = [];
        if (this.timeline) {
            this.timeline.invalidate(e);
        }
        return Animation_1.prototype.invalidate.call(this, e);
    };
    e_prototype.resetTo = function(t, e, r, i, n) {
        if (!p) {
            au.wake();
        }
        if (!this._ts) {
            this.play();
        }
        const s = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
        if (!this._initted) {
            eU(this, s);
        }
        if (eB(this, t, e, r, i, this._ease(s / this._dur), s, n)) {
            return this.resetTo(t, e, r, i, 1);
        }
        tL(this, 0);
        if (!this.parent) {
            tM(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
        }
        return this.render(0);
    };
    e_prototype.kill = function(t, e = "all") {
        if (!t && (!e || e === "all")) {
            this._lazy = this._pt = 0;
            if (this.parent) {
                ei(this);
            } else if (this.scrollTrigger) {
                this.scrollTrigger.kill(!!a);
            }
            return this;
        }
        if (this.timeline) {
            const r = this.timeline.totalDuration();
            if (!this.timeline.killTweensOf(t, e, ez && ez.vars.overwrite !== true)._first) {
                ei(this);
            }
            if (this.parent && r !== this.timeline.totalDuration()) {
                tG(this, this._dur * this.timeline._tDur / r, 0, 1);
            }
            return this;
        }
        let i;
        let n;
        let s;
        let o;
        let u;
        let h;
        let _;
        const _targets = this._targets;
        const l = t ? toArray(t) : _targets;
        const _ptLookup = this._ptLookup;
        const _pt = this._pt;
        if ((!e || e === "all") && tD(_targets, l)) {
            if (e === "all") {
                this._pt = 0;
            }
            return ei(this);
        }
        i = this._op = this._op || [];
        if (e !== "all") {
            if (vQ(e)) {
                u = {};
                fA(e, function(t) {
                    return u[t] = 1;
                });
                e = u;
            }
            e = eq(_targets, e);
        }
        for(_ = _targets.length; _--;){
            if (~l.indexOf(_targets[_])) {
                n = _ptLookup[_];
                if (e === "all") {
                    i[_] = e;
                    o = n;
                    s = {};
                } else {
                    s = i[_] = i[_] || {};
                    o = e;
                }
                for(u in o){
                    if (h = n && n[u]) {
                        if (!("kill" in h.d && h.d.kill(u) !== true)) {
                            _removeLinkedListItem(this, h, "_pt");
                        }
                        delete n[u];
                    }
                    if (s !== "all") {
                        s[u] = 1;
                    }
                }
            }
        }
        if (this._initted && !this._pt && _pt) {
            ei(this);
        }
        return this;
    };
    e.to = function(t, r, ...args) {
        return new e(t, r, args[0]);
    };
    e.from = function(t, e) {
        return tJ(1, arguments);
    };
    e.delayedCall = function(delay, r, i, callbackScope) {
        return new e(r, 0, {
            immediateRender: false,
            lazy: false,
            overwrite: false,
            delay,
            onComplete: r,
            onReverseComplete: r,
            onCompleteParams: i,
            onReverseCompleteParams: i,
            callbackScope
        });
    };
    e.fromTo = function(t, e, r) {
        return tJ(2, arguments);
    };
    e.set = function(t, r) {
        r.duration = 0;
        if (!r.repeatDelay) {
            r.repeat = 0;
        }
        return new e(t, r);
    };
    e.killTweensOf = function(t, e, r) {
        return globalTimeline.killTweensOf(t, e, r);
    };
    return e;
})(Animation);
tT(Tween.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
});
fA("staggerTo,staggerFrom,staggerFromTo", function(t) {
    Tween[t] = function() {
        const e = new Timeline;
        const r = slice.call(arguments, 0);
        r.splice(t === "staggerFromTo" ? 5 : 4, 0, 0);
        return e[t](...r);
    };
});
var eW = function(t, e, r) {
    return t[e] = r;
};
var eY = function(t, e, r) {
    return t[e](r);
};
var eH = function(t, e, r, i) {
    return t[e](i.fp, r);
};
const eJ = function(t, e, r) {
    return t.setAttribute(e, r);
};
export var Dx = function(t, e) {
    if (D(t[e])) {
        return eY;
    }
    if (OF(t[e]) && t.setAttribute) {
        return eJ;
    }
    return eW;
};
var eX = function(t, e) {
    return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1000000) / 1000000, e);
};
var eZ = function(t, e) {
    return e.set(e.t, e.p, !!(e.s + e.c * t), e);
};
export var l1 = function(t, e) {
    let e__pt = e._pt;
    let i = "";
    if (!t && e.b) {
        i = e.b;
    } else if (t === 1 && e.e) {
        i = e.e;
    } else {
        while(e__pt){
            i = e__pt.p + (e__pt.m ? e__pt.m(e__pt.s + e__pt.c * t) : Math.round((e__pt.s + e__pt.c * t) * 10000) / 10000) + i;
            e__pt = e__pt._next;
        }
        i += e.c;
    }
    e.set(e.t, e.p, i, e);
};
var render = function(t, e) {
    for(let r = e._pt; r;){
        r.r(t, r.d);
        r = r._next;
    }
};
var modifier = function(t, e, r, i) {
    let n;
    for(let s = this._pt; s;){
        n = s._next;
        if (s.p === i) {
            s.modifier(t, e, r);
        }
        s = n;
    }
};
var kill = function(t) {
    let e;
    let r;
    for(let i = this._pt; i;){
        r = i._next;
        if ((i.p !== t || i.op) && i.op !== t) {
            if (!i.dep) {
                e = 1;
            }
        } else {
            _removeLinkedListItem(this, i, "_pt");
        }
        i = r;
    }
    return !e;
};
const e5 = function(t, e, r, i) {
    i.mSet(t, e, i.m.call(i.tween, r, i.mt), i);
};
export var St = function(t) {
    let e;
    let r;
    let i;
    let n;
    for(let s = t._pt; s;){
        e = s._next;
        for(r = i; r && r.pr > s.pr;){
            r = r._next;
        }
        if (s._prev = r ? r._prev : n) {
            s._prev._next = s;
        } else {
            i = s;
        }
        if (s._next = r) {
            r._prev = s;
        } else {
            n = s;
        }
        s = e;
    }
    t._pt = i;
};
export class J7 {
    constructor(t, e, r, i, n, s, a, o, u){
        this.t = e;
        this.s = i;
        this.c = n;
        this.p = r;
        this.r = s || eX;
        this.d = a || this;
        this.set = o || eW;
        this.pr = u || 0;
        this._next = t;
        if (t) {
            t._prev = this;
        }
    }
    modifier(t, e, r) {
        this.mSet = this.mSet || this.set;
        this.set = e5;
        this.m = t;
        this.mt = r;
        this.tween = e;
    }
}
fA(`${ta}parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger`, function(t) {
    return $[t] = 1;
});
V.TweenMax = V.TweenLite = Tween;
V.TimelineLite = V.TimelineMax = Timeline;
globalTimeline = new Timeline({
    sortChildren: false,
    defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
});
Yz.stringFilter = Uc;
const e6 = [];
const e4 = {};
const e9 = [];
let e7 = 0;
let rt = 0;
const re = (t)=>(e4[t] || e9).map((t)=>t());
const rr = function() {
    const t = Date.now();
    const e = [];
    if (t - e7 > 2) {
        re("matchMediaInit");
        e6.forEach((t)=>{
            let r;
            let i;
            let n;
            let s;
            const { queries, conditions } = t;
            for(i in queries){
                if (r = h.matchMedia(queries[i]).matches) {
                    n = 1;
                }
                if (r !== conditions[i]) {
                    conditions[i] = r;
                    s = 1;
                }
            }
            if (s) {
                t.revert();
                if (n) {
                    e.push(t);
                }
            }
        });
        re("matchMediaRevert");
        e.forEach((t)=>t.onMatch(t, function(e) {
                return t.add(null, e);
            }));
        e7 = t;
        re("matchMedia");
    }
};
const ri = (()=>{
    function t(t, e) {
        this.selector = e && selector(e);
        this.data = [];
        this._r = [];
        this.isReverted = false;
        this.id = rt++;
        if (t) {
            this.add(t);
        }
    }
    const t_prototype = t.prototype;
    t_prototype.add = function(t, e, r) {
        if (D(t)) {
            r = e;
            e = t;
            t = D;
        }
        const i = this;
        const n = function() {
            let t;
            const n = o;
            const i_selector = i.selector;
            if (n && n !== i) {
                n.data.push(i);
            }
            if (r) {
                i.selector = selector(r);
            }
            o = i;
            t = e.apply(i, arguments);
            if (D(t)) {
                i._r.push(t);
            }
            o = n;
            i.selector = i_selector;
            i.isReverted = false;
            return t;
        };
        i.last = n;
        if (t === D) {
            return n(i, function(t) {
                return i.add(null, t);
            });
        }
        if (t) {
            return i[t] = n;
        }
        return n;
    };
    t_prototype.ignore = function(t) {
        const e = o;
        o = null;
        t(this);
        o = e;
    };
    t_prototype.getTweens = function() {
        const e = [];
        this.data.forEach((r)=>{
            if (r instanceof t) {
                return e.push(...r.getTweens());
            }
            return r instanceof Tween && !(r.parent && r.parent.data === "nested") && e.push(r);
        });
        return e;
    };
    t_prototype.clear = function() {
        this._r.length = this.data.length = 0;
    };
    t_prototype.kill = function(t, e) {
        const r = this;
        if (t) {
            let i;
            const n = r.getTweens();
            for(var s = r.data.length; s--;){
                if ((i = r.data[s]).data === "isFlip") {
                    i.revert();
                    i.getChildren(true, true, false).forEach((t)=>n.splice(n.indexOf(t), 1));
                }
            }
            n.map((t)=>({
                    g: t._dur || t._delay || t._sat && !t._sat.vars.immediateRender ? t.globalTime(0) : -Infinity,
                    t
                })).sort((t, e)=>e.g - t.g || -Infinity).forEach((e)=>e.t.revert(t));
            for(s = r.data.length; s--;){
                if ((i = r.data[s]) instanceof Timeline) {
                    if (i.data !== "nested") {
                        if (i.scrollTrigger) {
                            i.scrollTrigger.revert();
                        }
                        i.kill();
                    }
                } else if (!(i instanceof Tween || !i.revert)) {
                    i.revert(t);
                }
            }
            r._r.forEach((e)=>e(t, r));
            r.isReverted = true;
        } else {
            this.data.forEach((t)=>t.kill && t.kill());
        }
        this.clear();
        if (e) {
            for(let a = e6.length; a--;){
                if (e6[a].id === this.id) {
                    e6.splice(a, 1);
                }
            }
        }
    };
    t_prototype.revert = function(t) {
        this.kill(t || {});
    };
    return t;
})();
class rn {
    constructor(t){
        this.contexts = [];
        this.scope = t;
        if (o) {
            o.data.push(this);
        }
    }
    add(matches, e, r) {
        if (!C(matches)) {
            matches = {
                matches
            };
        }
        let i;
        let n;
        let s;
        const a = new ri(0, r || this.scope);
        const u = a.conditions = {};
        if (o && !a.selector) {
            a.selector = o.selector;
        }
        this.contexts.push(a);
        e = a.add("onMatch", e);
        a.queries = matches;
        for(n in matches){
            if (n === "all") {
                s = 1;
            } else {
                if (i = h.matchMedia(matches[n])) {
                    if (e6.indexOf(a) < 0) {
                        e6.push(a);
                    }
                    if (u[n] = i.matches) {
                        s = 1;
                    }
                    if (i.addListener) {
                        i.addListener(rr);
                    } else {
                        i.addEventListener("change", rr);
                    }
                }
            }
        }
        if (s) {
            e(a, function(t) {
                return a.add(null, t);
            });
        }
        return this;
    }
    revert(t) {
        this.kill(t || {});
    }
    kill(t) {
        this.contexts.forEach((e)=>e.kill(t, true));
    }
}
const rs = {
    registerPlugin: function(...e) {
        e.forEach((t)=>es(t));
    },
    timeline: function(t) {
        return new Timeline(t);
    },
    getTweensOf: function(t, e) {
        return globalTimeline.getTweensOf(t, e);
    },
    getProperty: function(t, e, r, i) {
        if (vQ(t)) {
            t = toArray(t)[0];
        }
        const get = a0(t || {}).get;
        const s = r ? ty : tg;
        if (r === "native") {
            r = "";
        }
        if (t) {
            if (e) {
                return s((wU[e] && wU[e].get || get)(t, e, r, i));
            }
            return function(e, r, i) {
                return s((wU[e] && wU[e].get || get)(t, e, r, i));
            };
        }
        return t;
    },
    quickSetter: function(t, e, r) {
        if ((t = toArray(t)).length > 1) {
            const i = t.map((t)=>os.quickSetter(t, e, r));
            const n = i.length;
            return function(t) {
                for(let e = n; e--;){
                    i[e](t);
                }
            };
        }
        t = t[0] || {};
        const s = wU[e];
        const a = a0(t);
        const o = a.harness && (a.harness.aliases || {})[e] || e;
        const u = s ? function(e) {
            const i = new s;
            d._pt = 0;
            i.init(t, r ? e + r : e, d, 0, [
                t
            ]);
            i.render(1, i);
            if (d._pt) {
                render(1, d);
            }
        } : a.set(t, o);
        if (s) {
            return u;
        }
        return function(e) {
            return u(t, o, r ? e + r : e, a, 1);
        };
    },
    quickTo: function(t, e, r) {
        const n = os.to(t, tT({
            [e]: "+=0.1",
            paused: true,
            stagger: 0
        }, r || {}));
        const s = function(t, r, i) {
            return n.resetTo(e, t, r, i);
        };
        s.tween = n;
        return s;
    },
    isTweening: function(t) {
        return globalTimeline.getTweensOf(t, true).length > 0;
    },
    defaults: function(t) {
        if (t && t.ease) {
            t.ease = ex(t.ease, defaults.ease);
        }
        return tb(defaults, t || {});
    },
    config: function(t) {
        return tb(Yz, t || {});
    },
    registerEffect: function({ name, effect, plugins, defaults, extendTimeline }) {
        (plugins || "").split(",").forEach((t)=>t && !wU[t] && !V[t] && Y(`${name} effect requires ${t} plugin.`));
        effects[name] = function(t, e, i) {
            return effect(toArray(t), tT(e || {}, defaults), i);
        };
        if (extendTimeline) {
            Timeline.prototype[name] = function(t, r, i) {
                return this.add(effects[name](t, C(r) ? r : (i = r) && {}, this), i);
            };
        }
    },
    registerEase: function(t, e) {
        em[t] = ex(e);
    },
    parseEase: function(t, e) {
        if (arguments.length) {
            return ex(t, e);
        }
        return em;
    },
    getById: function(t) {
        return globalTimeline.getById(t);
    },
    exportRoot: function(t = {}, e) {
        let r;
        let i;
        const n = new Timeline(t);
        n.smoothChildTiming = R(t.smoothChildTiming);
        globalTimeline.remove(n);
        n._dp = 0;
        n._time = n._tTime = globalTimeline._time;
        for(r = globalTimeline._first; r;){
            i = r._next;
            if (e || !(!r._dur && r instanceof Tween && r.vars.onComplete === r._targets[0])) {
                tU(n, r, r._start - r._delay);
            }
            r = i;
        }
        tU(globalTimeline, n, 0);
        return n;
    },
    context: function(t, e) {
        if (t) {
            return new ri(t, e);
        }
        return o;
    },
    matchMedia: function(t) {
        return new rn(t);
    },
    matchMediaRefresh: function() {
        return e6.forEach((t)=>{
            let e;
            let r;
            const t_conditions = t.conditions;
            for(r in t_conditions){
                if (t_conditions[r]) {
                    t_conditions[r] = false;
                    e = 1;
                }
            }
            if (e) {
                t.revert();
            }
        }) || rr();
    },
    addEventListener: function(t, e) {
        const r = e4[t] || (e4[t] = []);
        if (!~r.indexOf(e)) {
            r.push(e);
        }
    },
    removeEventListener: function(t, e) {
        const r = e4[t];
        const i = r && r.indexOf(e);
        if (i >= 0) {
            r.splice(i, 1);
        }
    },
    utils: {
        wrap: function t(e, r, i) {
            const n = r - e;
            if (Array.isArray(e)) {
                return t9(e, t(0, e.length), r);
            }
            return tK(i, function(t) {
                return (n + (t - e) % n) % n + e;
            });
        },
        wrapYoyo: function t(e, r, i) {
            const n = r - e;
            const s = 2 * n;
            if (Array.isArray(e)) {
                return t9(e, t(0, e.length - 1), r);
            }
            return tK(i, function(t) {
                t = (s + (t - e) % s) % s || 0;
                return e + (t > n ? s - t : t);
            });
        },
        distribute,
        random,
        snap,
        normalize: function(t, e, r) {
            return mapRange(t, e, 0, 1, r);
        },
        getUnit: l_,
        clamp: function(t, e, r) {
            return tK(r, function(r) {
                return tX(t, e, r);
            });
        },
        splitColor,
        toArray,
        selector,
        mapRange,
        pipe: function(...e_1) {
            return function(t) {
                return e_1.reduce((acc, item)=>item(acc), t);
            };
        },
        unitize: function(t, e) {
            return function(r) {
                return t(parseFloat(r)) + (e || l_(r));
            };
        },
        interpolate: function t(e, r, i, n) {
            let s = isNaN(e + r) ? 0 : function(t) {
                return (1 - t) * e + t * r;
            };
            if (!s) {
                let a;
                let o;
                let u;
                let h;
                let _;
                const f = vQ(e);
                const l = {};
                if (i === true && (n = 1)) {
                    i = null;
                }
                if (f) {
                    e = {
                        p: e
                    };
                    r = {
                        p: r
                    };
                } else if (Array.isArray(e) && !Array.isArray(r)) {
                    o = 1;
                    u = [];
                    for(_ = (h = e.length) - 2; o < h; o++){
                        u.push(t(e[o - 1], e[o]));
                    }
                    h--;
                    s = function(t) {
                        const e = Math.min(_, ~~(t *= h));
                        return u[e](t - e);
                    };
                    i = r;
                } else {
                    if (!n) {
                        e = tw(Array.isArray(e) ? [] : {}, e);
                    }
                }
                if (!u) {
                    for(a in r){
                        add.call(l, e, a, "get", r[a]);
                    }
                    s = function(t) {
                        return render(t, l) || (f ? e.p : e);
                    };
                }
            }
            return tK(i, s);
        },
        shuffle
    },
    install,
    effects,
    ticker: au,
    updateRoot: Timeline.updateRoot,
    plugins: wU,
    globalTimeline,
    core: {
        PropTween: J7,
        globals,
        Tween,
        Timeline,
        Animation,
        getCache: a0,
        _removeLinkedListItem,
        reverting: function() {
            return a;
        },
        context: function(t) {
            if (t && o) {
                o.data.push(t);
                t._ctx = o;
            }
            return o;
        },
        suppressOverwrites: function(t) {
            return s = t;
        }
    }
};
fA("to,from,fromTo,delayedCall,set,killTweensOf", function(t) {
    return rs[t] = Tween[t];
});
au.add(Timeline.updateRoot);
d = rs.to({}, {
    duration: 0
});
const ra = (t, e)=>{
    for(var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e;){
        r = r._next;
    }
    return r;
};
const ro = (t, e)=>{
    let r;
    let i;
    let n;
    const t__targets = t._targets;
    for(r in e){
        for(i = t__targets.length; i--;){
            if ((n = t._ptLookup[i][r]) && (n = n.d)) {
                if (n._pt) {
                    n = ra(n, r);
                }
                if (n && n.modifier) {
                    n.modifier(e[r], t, t__targets[i], r);
                }
            }
        }
    }
};
const ru = (name, e)=>({
        name,
        headless: 1,
        rawVars: 1,
        init: function(t, r, i) {
            i._onInit = function(t) {
                let i;
                let n;
                if (vQ(r)) {
                    i = {};
                    fA(r, function(t) {
                        return i[t] = 1;
                    });
                    r = i;
                }
                if (e) {
                    i = {};
                    for(n in r){
                        i[n] = e(r[n]);
                    }
                    r = i;
                }
                ro(t, r);
            };
        }
    });
export var os = rs.registerPlugin({
    name: "attr",
    init: function(t, e, r, i, n) {
        let s;
        let a;
        let o;
        this.tween = r;
        for(s in e){
            o = t.getAttribute(s) || "";
            a = this.add(t, "setAttribute", `${o || 0}`, e[s], i, n, 0, 0, s);
            a.op = s;
            a.b = o;
            this._props.push(s);
        }
    },
    render: function(t, e) {
        for(let r = e._pt; r;){
            if (a) {
                r.set(r.t, r.p, r.b, r);
            } else {
                r.r(t, r.d);
            }
            r = r._next;
        }
    }
}, {
    name: "endArray",
    headless: 1,
    init: function(t, e) {
        for(let r = e.length; r--;){
            this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
        }
    }
}, ru("roundProps", t3), ru("modifiers"), ru("snap", snap)) || rs;
Tween.version = Timeline.version = os.version = "3.14.2";
l = 1;
if (E()) {
    ep();
}
em.Power0;
em.Power1;
em.Power2;
em.Power3;
em.Power4;
em.Linear;
em.Quad;
em.Cubic;
em.Quart;
em.Quint;
em.Strong;
em.Elastic;
em.Back;
em.SteppedEase;
em.Bounce;
em.Sine;
em.Expo;
em.Circ;
