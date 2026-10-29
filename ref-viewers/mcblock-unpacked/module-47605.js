import { B0, Dx, E_, J7, Ks, OF, St, Uc, Vy, Yz, Zm, a0, au, dg, fA, l1, l_, n as n_1, n6, os, qA, vM, vQ, vX, wU } from "./module-2761.js";
let n;
let s;
let i;
let a;
let o;
let p;
let l;
const u = {};
const c = 180 / Math.PI;
const h = Math.PI / 180;
const d = /([A-Z])/g;
const m = /(left|right|width|margin|padding|x)/i;
const v = /[\s,\(]\S/;
const aliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
};
const x = function(t, e) {
    return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 10000) / 10000 + e.u, e);
};
const _ = function(t, e) {
    return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 10000) / 10000 + e.u, e);
};
const b = function(t, e) {
    return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 10000) / 10000 + e.u : e.b, e);
};
const O = function(t, e) {
    return e.set(e.t, e.p, t === 1 ? e.e : t ? Math.round((e.s + e.c * t) * 10000) / 10000 + e.u : e.b, e);
};
const w = function(t, e) {
    const r = e.s + e.c * t;
    e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
};
const M = function(t, e) {
    return e.set(e.t, e.p, t ? e.e : e.b, e);
};
const A = function(t, e) {
    return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
};
const E = function(t, e, r) {
    return t.style[e] = r;
};
const P = function(t, e, r) {
    return t.style.setProperty(e, r);
};
const C = function(t, e, r) {
    return t._gsap[e] = r;
};
const Y = function(t, e, r) {
    return t._gsap.scaleX = t._gsap.scaleY = r;
};
const z = function({ _gsap }, e, r, n, s) {
    _gsap.scaleX = _gsap.scaleY = r;
    _gsap.renderTransform(s, _gsap);
};
const F = function({ _gsap }, e, r, n, s) {
    _gsap[e] = r;
    _gsap.renderTransform(s, _gsap);
};
let T = "transform";
let S = `${T}Origin`;
const save = function t(e, r) {
    const n = this;
    const target = this.target;
    const { style, _gsap } = target;
    if (e in u && style) {
        this.tfm = this.tfm || {};
        if (e === "transform") {
            return aliases.transform.split(",").forEach((e)=>t.call(n, e, r));
        }
        if (~(e = aliases[e] || e).indexOf(",")) {
            e.split(",").forEach((t)=>n.tfm[t] = get(target, t));
        } else {
            this.tfm[e] = _gsap.x ? _gsap[e] : get(target, e);
        }
        if (e === S) {
            this.tfm.zOrigin = _gsap.zOrigin;
        }
        if (this.props.indexOf(T) >= 0) {
            return;
        }
        if (_gsap.svg) {
            this.svgo = target.getAttribute("data-svg-origin");
            this.props.push(S, r, "");
        }
        e = T;
    }
    if (style || r) {
        this.props.push(e, r, style[e]);
    }
};
const k = (t)=>{
    if (t.translate) {
        t.removeProperty("translate");
        t.removeProperty("scale");
        t.removeProperty("rotate");
    }
};
const revert = function() {
    let t;
    let e;
    const props = this.props;
    const target = this.target;
    const { style, _gsap } = target;
    for(t = 0; t < props.length; t += 3){
        if (props[t + 1]) {
            if (props[t + 1] === 2) {
                target[props[t]](props[t + 2]);
            } else {
                target[props[t]] = props[t + 2];
            }
        } else if (props[t + 2]) {
            style[props[t]] = props[t + 2];
        } else {
            style.removeProperty(props[t].substr(0, 2) === "--" ? props[t] : props[t].replace(d, "-$1").toLowerCase());
        }
    }
    if (this.tfm) {
        for(e in this.tfm){
            _gsap[e] = this.tfm[e];
        }
        if (_gsap.svg) {
            _gsap.renderTransform();
            target.setAttribute("data-svg-origin", this.svgo || "");
        }
        if (!((t = p()) && t.isStart || style[T])) {
            k(style);
            if (_gsap.zOrigin && style[S]) {
                style[S] += ` ${_gsap.zOrigin}px`;
                _gsap.zOrigin = 0;
                _gsap.renderTransform();
            }
            _gsap.uncache = 1;
        }
    }
};
const N = function(target, e) {
    const r = {
        target,
        props: [],
        revert,
        save
    };
    if (!target._gsap) {
        os.core.getCache(target);
    }
    if (e && target.style && target.nodeType) {
        e.split(",").forEach((t)=>r.save(t));
    }
    return r;
};
const V = (t, e)=>{
    const r = n.createElementNS ? n.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : n.createElement(t);
    if (r && r.style) {
        return r;
    }
    return n.createElement(t);
};
const q = function t(e, r, n) {
    const s = getComputedStyle(e);
    return s[r] || s.getPropertyValue(r.replace(d, "-$1").toLowerCase()) || s.getPropertyValue(r) || !n && t(e, I(r) || r, 1) || "";
};
const D = "O,Moz,ms,Ms,Webkit".split(",");
var I = function(t, e, r) {
    const style = (e || a).style;
    let s = 5;
    if (t in style && !r) {
        return t;
    }
    for(t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(D[s] + t in style););
    if (s < 0) {
        return null;
    }
    return (s === 3 ? "ms" : s >= 0 ? D[s] : "") + t;
};
const register = function() {
    if (typeof window !== "undefined" && window.document) {
        s = (n = window.document).documentElement;
        a = V("div") || {
            style: {}
        };
        V("div");
        S = `${T = I(T)}Origin`;
        a.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
        l = !!I("perspective");
        p = os.core.reverting;
        i = 1;
    }
};
const j = (t)=>{
    let e;
    const t_ownerSVGElement = t.ownerSVGElement;
    const n = V("svg", t_ownerSVGElement && t_ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg");
    const i = t.cloneNode(true);
    i.style.display = "block";
    n.appendChild(i);
    s.appendChild(n);
    try {
        e = i.getBBox();
    } catch (t) {}
    n.removeChild(i);
    s.removeChild(n);
    return e;
};
const L = (t, e)=>{
    for(let r = e.length; r--;){
        if (t.hasAttribute(e[r])) {
            return t.getAttribute(e[r]);
        }
    }
};
const R = (t)=>{
    let e;
    let r;
    try {
        e = t.getBBox();
    } catch (n) {
        e = j(t);
        r = 1;
    }
    if (!(e && (e.width || e.height) || r)) {
        e = j(t);
    }
    if (!e || e.width || e.x || e.y) {
        return e;
    }
    return {
        x: +L(t, [
            "x",
            "cx",
            "x1"
        ]) || 0,
        y: +L(t, [
            "y",
            "cy",
            "y1"
        ]) || 0,
        width: 0,
        height: 0
    };
};
const W = (t)=>!!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && R(t));
const _removeProperty = function(t, e) {
    if (e) {
        let r;
        const n = t.style;
        if (e in u && e !== S) {
            e = T;
        }
        if (n.removeProperty) {
            if ((r = e.substr(0, 2)) === "ms" || e.substr(0, 6) === "webkit") {
                e = `-${e}`;
            }
            n.removeProperty(r === "--" ? e : e.replace(d, "-$1").toLowerCase());
        } else {
            n.removeAttribute(e);
        }
    }
};
const G = (t, e, r, n, s, i)=>{
    const a = new J7(t._pt, e, r, 0, 1, i ? A : M);
    t._pt = a;
    a.b = n;
    a.e = s;
    t._props.push(r);
    return a;
};
const H = {
    deg: 1,
    rad: 1,
    turn: 1
};
const U = {
    grid: 1,
    flex: 1
};
const $ = function t(e, r, s, i) {
    let o;
    let p;
    let l;
    let c;
    let h = parseFloat(s) || 0;
    const g = `${s}`.trim().substr(`${h}`.length) || "px";
    const a_style = a.style;
    const v = m.test(r);
    const y = e.tagName.toLowerCase() === "svg";
    const x = (y ? "client" : "offset") + (v ? "Width" : "Height");
    const _ = i === "px";
    const b = i === "%";
    if (i === g || !h || H[i] || H[g]) {
        return h;
    }
    if (!(g === "px" || _)) {
        h = t(e, r, s, "px");
    }
    c = e.getCTM && W(e);
    if ((b || g === "%") && (u[r] || ~r.indexOf("adius"))) {
        o = c ? e.getBBox()[v ? "width" : "height"] : e[x];
        return E_(b ? h / o * 100 : h / 100 * o);
    }
    a_style[v ? "width" : "height"] = 100 + (_ ? g : i);
    p = i !== "rem" && ~r.indexOf("adius") || i === "em" && e.appendChild && !y ? e : e.parentNode;
    if (c) {
        p = (e.ownerSVGElement || {}).parentNode;
    }
    if (!(p && p !== n && p.appendChild)) {
        p = n.body;
    }
    if ((l = p._gsap) && b && l.width && v && l.time === au.time && !l.uncache) {
        return E_(h / l.width * 100);
    }
    if (b && (r === "height" || r === "width")) {
        const O = e.style[r];
        e.style[r] = 100 + i;
        o = e[x];
        if (O) {
            e.style[r] = O;
        } else {
            _removeProperty(e, r);
        }
    } else {
        if ((b || g === "%") && !U[q(p, "display")]) {
            a_style.position = q(e, "position");
        }
        if (p === e) {
            a_style.position = "static";
        }
        p.appendChild(a);
        o = a[x];
        p.removeChild(a);
        a_style.position = "absolute";
    }
    if (v && b) {
        l = a0(p);
        l.time = au.time;
        l.width = p[x];
    }
    return E_(_ ? o * h / 100 : o && h ? 100 / o * h : 0);
};
var get = function(t, e, r, n) {
    let s;
    if (!i) {
        register();
    }
    if (e in aliases && e !== "transform" && ~(e = aliases[e]).indexOf(",")) {
        e = e.split(",")[0];
    }
    if (u[e] && e !== "transform") {
        s = tf(t, n);
        s = e !== "transformOrigin" ? s[e] : s.svg ? s.origin : `${tu(q(t, S))} ${s.zOrigin}px`;
    } else if (!(s = t.style[e]) || s === "auto" || n || ~`${s}`.indexOf("calc(")) {
        s = tn[e] && tn[e](t, e, r) || q(t, e) || n_1(t, e) || +(e === "opacity");
    }
    if (r && !~`${s}`.trim().indexOf(" ")) {
        return $(t, e, s, r) + r;
    }
    return s;
};
const K = function(t, e, r, n) {
    if (!r || r === "none") {
        const s = I(e, t, 1);
        const i = s && q(t, s, 1);
        if (i && i !== r) {
            e = s;
            r = i;
        } else if (e === "borderColor") {
            r = q(t, "borderTopColor");
        }
    }
    let a;
    let o;
    let p;
    let s_1;
    let u;
    let c;
    let h;
    let g;
    let d;
    let m;
    let v;
    const y = new J7(this._pt, t.style, e, 0, 1, l1);
    let x = 0;
    let _ = 0;
    y.b = r;
    y.e = n;
    r += "";
    if ((n += "").substring(0, 6) === "var(--") {
        n = q(t, n.substring(4, n.indexOf(")")));
    }
    if (n === "auto") {
        c = t.style[e];
        t.style[e] = n;
        n = q(t, e) || n;
        if (c) {
            t.style[e] = c;
        } else {
            _removeProperty(t, e);
        }
    }
    a = [
        r,
        n
    ];
    Uc(a);
    r = a[0];
    n = a[1];
    p = r.match(vM) || [];
    if ((n.match(vM) || []).length) {
        while(o = vM.exec(n)){
            h = o[0];
            d = n.substring(x, o.index);
            if (u) {
                u = (u + 1) % 5;
            } else if (d.substr(-5) === "rgba(" || d.substr(-5) === "hsla(") {
                u = 1;
            }
            if (h !== (c = p[_++] || "")) {
                s_1 = parseFloat(c) || 0;
                v = c.substr(`${s_1}`.length);
                if (h.charAt(1) === "=") {
                    h = B0(s_1, h) + v;
                }
                g = parseFloat(h);
                m = h.substr(`${g}`.length);
                x = vM.lastIndex - m.length;
                if (!m) {
                    m = m || Yz.units[e] || v;
                    if (x === n.length) {
                        n += m;
                        y.e += m;
                    }
                }
                if (v !== m) {
                    s_1 = $(t, e, c, m) || 0;
                }
                y._pt = {
                    _next: y._pt,
                    p: d || _ === 1 ? d : ",",
                    s: s_1,
                    c: g - s_1,
                    m: u && u < 4 || e === "zIndex" ? Math.round : 0
                };
            }
        }
        y.c = x < n.length ? n.substring(x, n.length) : "";
    } else {
        y.r = e === "display" && n === "none" ? A : M;
    }
    if (Ks.test(n)) {
        y.e = 0;
    }
    this._pt = y;
    return y;
};
const tt = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
};
const te = (t)=>{
    const e = t.split(" ");
    let r = e[0];
    let n = e[1] || "50%";
    if (r === "top" || r === "bottom" || n === "left" || n === "right") {
        t = r;
        r = n;
        n = t;
    }
    e[0] = tt[r] || r;
    e[1] = tt[n] || n;
    return e.join(" ");
};
const tr = function(t, e) {
    if (e.tween && e.tween._time === e.tween._dur) {
        let r;
        let n;
        let s;
        const i = e.t;
        const a = i.style;
        let o = e.u;
        const p = i._gsap;
        if (o === "all" || o === true) {
            a.cssText = "";
            n = 1;
        } else {
            for(s = (o = o.split(",")).length; --s > -1;){
                if (u[r = o[s]]) {
                    n = 1;
                    r = r === "transformOrigin" ? S : T;
                }
                _removeProperty(i, r);
            }
        }
        if (n) {
            _removeProperty(i, T);
            if (p) {
                if (p.svg) {
                    i.removeAttribute("transform");
                }
                a.scale = a.rotate = a.translate = "none";
                tf(i, 1);
                p.uncache = 1;
                k(a);
            }
        }
    }
};
var tn = {
    clearProps: function(t, e, r, n, s) {
        if (s.data !== "isFromStart") {
            const i = t._pt = new J7(t._pt, e, r, 0, 0, tr);
            i.u = n;
            i.pr = -10;
            i.tween = s;
            t._props.push(r);
            return 1;
        }
    }
};
const ts = [
    1,
    0,
    0,
    1,
    0,
    0
];
const ti = {};
const ta = (t)=>t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
const to = (t)=>{
    const e = q(t, T);
    if (ta(e)) {
        return ts;
    }
    return e.substr(7).match(vX).map(E_);
};
const _getMatrix = function(t, e) {
    let r;
    let n;
    let i;
    let a;
    const o = t._gsap || a0(t);
    const t_style = t.style;
    let l = to(t);
    if (o.svg && t.getAttribute("transform")) {
        if ((l = [
            (i = t.transform.baseVal.consolidate().matrix).a,
            i.b,
            i.c,
            i.d,
            i.e,
            i.f
        ]).join(",") === "1,0,0,1,0,0") {
            return ts;
        }
        return l;
    }
    if (!(l !== ts || t.offsetParent || t === s || o.svg)) {
        i = t_style.display;
        t_style.display = "block";
        if (!((r = t.parentNode) && (t.offsetParent || t.getBoundingClientRect().width))) {
            a = 1;
            n = t.nextElementSibling;
            s.appendChild(t);
        }
        l = to(t);
        if (i) {
            t_style.display = i;
        } else {
            _removeProperty(t, "display");
        }
        if (a) {
            if (n) {
                r.insertBefore(t, n);
            } else if (r) {
                r.appendChild(t);
            } else {
                s.removeChild(t);
            }
        }
    }
    if (e && l.length > 6) {
        return [
            l[0],
            l[1],
            l[4],
            l[5],
            l[12],
            l[13]
        ];
    }
    return l;
};
const tl = (t, e, r, n, s, i)=>{
    let a;
    let o;
    let p;
    let l;
    const t__gsap = t._gsap;
    const u = s || _getMatrix(t, true);
    const c = t__gsap.xOrigin || 0;
    const h = t__gsap.yOrigin || 0;
    const g = t__gsap.xOffset || 0;
    const d = t__gsap.yOffset || 0;
    const m = u[0];
    const v = u[1];
    const y = u[2];
    const x = u[3];
    let _ = u[4];
    let b = u[5];
    const O = e.split(" ");
    let w = parseFloat(O[0]) || 0;
    let M = parseFloat(O[1]) || 0;
    if (r) {
        if (u !== ts && (o = m * x - v * y)) {
            p = x / o * w + -y / o * M + (y * b - x * _) / o;
            l = -v / o * w + m / o * M - (m * b - v * _) / o;
            w = p;
            M = l;
        }
    } else {
        w = (a = R(t)).x + (~O[0].indexOf("%") ? w / 100 * a.width : w);
        M = a.y + (~(O[1] || O[0]).indexOf("%") ? M / 100 * a.height : M);
    }
    if (n || n !== false && t__gsap.smooth) {
        t__gsap.xOffset = g + ((_ = w - c) * m + (b = M - h) * y) - _;
        t__gsap.yOffset = d + (_ * v + b * x) - b;
    } else {
        t__gsap.xOffset = t__gsap.yOffset = 0;
    }
    t__gsap.xOrigin = w;
    t__gsap.yOrigin = M;
    t__gsap.smooth = !!n;
    t__gsap.origin = e;
    t__gsap.originIsAbsolute = !!r;
    t.style[S] = "0px 0px";
    if (i) {
        G(i, t__gsap, "xOrigin", c, w);
        G(i, t__gsap, "yOrigin", h, M);
        G(i, t__gsap, "xOffset", g, t__gsap.xOffset);
        G(i, t__gsap, "yOffset", d, t__gsap.yOffset);
    }
    t.setAttribute("data-svg-origin", `${w} ${M}`);
};
var tf = (t, e)=>{
    const r = t._gsap || new n6(t);
    if ("x" in r && !e && !r.uncache) {
        return r;
    }
    let n;
    let s;
    let i;
    let a;
    let o;
    let p;
    let u;
    let d;
    let m;
    let v;
    let y;
    let x;
    let _;
    let b;
    let O;
    let w;
    let M;
    let A;
    let E;
    let P;
    let C;
    let Y;
    let z;
    let F;
    let X;
    let k;
    let B;
    let N;
    let V;
    let D;
    let I;
    let J;
    const t_style = t.style;
    const L = r.scaleX < 0;
    const R = getComputedStyle(t);
    let Z = q(t, S) || "0";
    y = 0;
    v = 0;
    m = 0;
    d = 0;
    u = 0;
    p = 0;
    i = 0;
    s = 0;
    n = 0;
    o = 1;
    a = 1;
    r.svg = !!(t.getCTM && W(t));
    if (R.translate) {
        if (R.translate !== "none" || R.scale !== "none" || R.rotate !== "none") {
            t_style[T] = (R.translate !== "none" ? `translate3d(${`${R.translate} 0 0`.split(" ").slice(0, 3).join(", ")}) ` : "") + (R.rotate !== "none" ? `rotate(${R.rotate}) ` : "") + (R.scale !== "none" ? `scale(${R.scale.split(" ").join(",")}) ` : "") + (R[T] !== "none" ? R[T] : "");
        }
        t_style.scale = t_style.rotate = t_style.translate = "none";
    }
    b = _getMatrix(t, r.svg);
    if (r.svg) {
        if (r.uncache) {
            X = t.getBBox();
            Z = `${r.xOrigin - X.x}px ${r.yOrigin - X.y}px`;
            F = "";
        } else {
            F = !e && t.getAttribute("data-svg-origin");
        }
        tl(t, F || Z, !!F || r.originIsAbsolute, r.smooth !== false, b);
    }
    x = r.xOrigin || 0;
    _ = r.yOrigin || 0;
    if (b !== ts) {
        A = b[0];
        E = b[1];
        P = b[2];
        C = b[3];
        n = Y = b[4];
        s = z = b[5];
        if (b.length === 6) {
            a = Math.sqrt(A * A + E * E);
            o = Math.sqrt(C * C + P * P);
            p = A || E ? Math.atan2(E, A) * c : 0;
            if (m = P || C ? Math.atan2(P, C) * c + p : 0) {
                o *= Math.abs(Math.cos(m * h));
            }
            if (r.svg) {
                n -= x - (x * A + _ * P);
                s -= _ - (x * E + _ * C);
            }
        } else {
            J = b[6];
            D = b[7];
            B = b[8];
            N = b[9];
            V = b[10];
            I = b[11];
            n = b[12];
            s = b[13];
            i = b[14];
            u = (O = Math.atan2(J, V)) * c;
            if (O) {
                F = Y * (w = Math.cos(-O)) + B * (M = Math.sin(-O));
                X = z * w + N * M;
                k = J * w + V * M;
                B = -(Y * M) + B * w;
                N = -(z * M) + N * w;
                V = -(J * M) + V * w;
                I = -(D * M) + I * w;
                Y = F;
                z = X;
                J = k;
            }
            d = (O = Math.atan2(-P, V)) * c;
            if (O) {
                F = A * (w = Math.cos(-O)) - B * (M = Math.sin(-O));
                X = E * w - N * M;
                k = P * w - V * M;
                I = C * M + I * w;
                A = F;
                E = X;
                P = k;
            }
            p = (O = Math.atan2(E, A)) * c;
            if (O) {
                F = A * (w = Math.cos(O)) + E * (M = Math.sin(O));
                X = Y * w + z * M;
                E = E * w - A * M;
                z = z * w - Y * M;
                A = F;
                Y = X;
            }
            if (u && Math.abs(u) + Math.abs(p) > 359.9) {
                p = 0;
                u = 0;
                d = 180 - d;
            }
            a = E_(Math.sqrt(A * A + E * E + P * P));
            o = E_(Math.sqrt(z * z + J * J));
            m = Math.abs(O = Math.atan2(Y, z)) > 0.0002 ? O * c : 0;
            y = I ? 1 / (I < 0 ? -I : I) : 0;
        }
        if (r.svg) {
            F = t.getAttribute("transform");
            r.forceCSS = t.setAttribute("transform", "") || !ta(q(t, T));
            if (F) {
                t.setAttribute("transform", F);
            }
        }
    }
    if (Math.abs(m) > 90 && Math.abs(m) < 270) {
        if (L) {
            a *= -1;
            m += p <= 0 ? 180 : -180;
            p += p <= 0 ? 180 : -180;
        } else {
            o *= -1;
            m += m <= 0 ? 180 : -180;
        }
    }
    e = e || r.uncache;
    r.x = `${n - ((r.xPercent = n && (!e && r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0)}px`;
    r.y = `${s - ((r.yPercent = s && (!e && r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-s) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0)}px`;
    r.z = `${i}px`;
    r.scaleX = E_(a);
    r.scaleY = E_(o);
    r.rotation = `${E_(p)}deg`;
    r.rotationX = `${E_(u)}deg`;
    r.rotationY = `${E_(d)}deg`;
    r.skewX = `${m}deg`;
    r.skewY = `${v}deg`;
    r.transformPerspective = `${y}px`;
    if (r.zOrigin = parseFloat(Z.split(" ")[2]) || !e && r.zOrigin || 0) {
        t_style[S] = tu(Z);
    }
    r.xOffset = r.yOffset = 0;
    r.force3D = Yz.force3D;
    r.renderTransform = r.svg ? tm : l ? td : th;
    r.uncache = 0;
    return r;
};
var tu = (t)=>`${(t = t.split(" "))[0]} ${t[1]}`;
const tc = (target, e, r)=>{
    const n = l_(e);
    return E_(parseFloat(e) + parseFloat($(target, "x", `${r}px`, n))) + n;
};
var th = function(t, e) {
    e.z = "0px";
    e.rotationY = e.rotationX = "0deg";
    e.force3D = 0;
    td(t, e);
};
const tg = "0deg";
var td = function(t, e) {
    const r = e || this;
    const { xPercent, yPercent } = r;
    let i = r.x;
    let a = r.y;
    let o = r.z;
    const { rotation, rotationY, rotationX, skewX, skewY, scaleX, scaleY, transformPerspective, force3D, target, zOrigin } = r;
    let _ = "";
    const b = force3D === "auto" && t && t !== 1 || force3D === true;
    if (zOrigin && (rotationX !== tg || rotationY !== tg)) {
        let O;
        let w = parseFloat(rotationY) * h;
        const M = Math.sin(w);
        const A = Math.cos(w);
        i = tc(target, i, -(M * (O = Math.cos(w = parseFloat(rotationX) * h)) * zOrigin));
        a = tc(target, a, -(-Math.sin(w) * zOrigin));
        o = tc(target, o, -(A * O * zOrigin) + zOrigin);
    }
    if (transformPerspective !== "0px") {
        _ += `perspective(${transformPerspective}) `;
    }
    if (xPercent || yPercent) {
        _ += `translate(${xPercent}%, ${yPercent}%) `;
    }
    if (b || i !== "0px" || a !== "0px" || o !== "0px") {
        _ += o !== "0px" || b ? `translate3d(${i}, ${a}, ${o}) ` : `translate(${i}, ${a}) `;
    }
    if (rotation !== tg) {
        _ += `rotate(${rotation}) `;
    }
    if (rotationY !== tg) {
        _ += `rotateY(${rotationY}) `;
    }
    if (rotationX !== tg) {
        _ += `rotateX(${rotationX}) `;
    }
    if (skewX !== tg || skewY !== tg) {
        _ += `skew(${skewX}, ${skewY}) `;
    }
    if (scaleX !== 1 || scaleY !== 1) {
        _ += `scale(${scaleX}, ${scaleY}) `;
    }
    target.style[T] = _ || "translate(0, 0)";
};
var tm = function(t, e) {
    let r;
    let n;
    let s;
    let i;
    let a;
    const o = e || this;
    const { xPercent, yPercent, x: x_1, y: y_1 } = o;
    let o_rotation = o.rotation;
    let o_skewX = o.skewX;
    let o_skewY = o.skewY;
    const { scaleX, scaleY, target, xOrigin, yOrigin, xOffset, yOffset, forceCSS } = o;
    let A = parseFloat(x_1);
    let E = parseFloat(y_1);
    o_rotation = parseFloat(o_rotation);
    o_skewX = parseFloat(o_skewX);
    if (o_skewY = parseFloat(o_skewY)) {
        o_skewX += o_skewY = parseFloat(o_skewY);
        o_rotation += o_skewY;
    }
    if (o_rotation || o_skewX) {
        o_rotation *= h;
        o_skewX *= h;
        r = Math.cos(o_rotation) * scaleX;
        n = Math.sin(o_rotation) * scaleX;
        s = -(Math.sin(o_rotation - o_skewX) * scaleY);
        i = Math.cos(o_rotation - o_skewX) * scaleY;
        if (o_skewX) {
            o_skewY *= h;
            s *= a = Math.sqrt(1 + (a = Math.tan(o_skewX - o_skewY)) * a);
            i *= a;
            if (o_skewY) {
                r *= a = Math.sqrt(1 + (a = Math.tan(o_skewY)) * a);
                n *= a;
            }
        }
        r = E_(r);
        n = E_(n);
        s = E_(s);
        i = E_(i);
    } else {
        r = scaleX;
        i = scaleY;
        s = 0;
        n = 0;
    }
    if (A && !~`${x_1}`.indexOf("px") || E && !~`${y_1}`.indexOf("px")) {
        A = $(target, "x", x_1, "px");
        E = $(target, "y", y_1, "px");
    }
    if (xOrigin || yOrigin || xOffset || yOffset) {
        A = E_(A + xOrigin - (xOrigin * r + yOrigin * s) + xOffset);
        E = E_(E + yOrigin - (xOrigin * n + yOrigin * i) + yOffset);
    }
    if (xPercent || yPercent) {
        a = target.getBBox();
        A = E_(A + xPercent / 100 * a.width);
        E = E_(E + yPercent / 100 * a.height);
    }
    a = `matrix(${r},${n},${s},${i},${A},${E})`;
    target.setAttribute("transform", a);
    if (forceCSS) {
        target.style[T] = a;
    }
};
const tv = (t, e, r, n, s)=>{
    let i;
    let a;
    const o = vQ(s);
    let p = parseFloat(s) * (o && ~s.indexOf("rad") ? c : 1) - n;
    const l = `${n + p}deg`;
    if (o) {
        if ((i = s.split("_")[1]) === "short" && (p %= 360) != p % 180) {
            p += p < 0 ? 360 : -360;
        }
        if (i === "cw" && p < 0) {
            p = (p + 36000000000) % 360 - 360 * ~~(p / 360);
        } else if (i === "ccw" && p > 0) {
            p = (p - 36000000000) % 360 - 360 * ~~(p / 360);
        }
    }
    t._pt = a = new J7(t._pt, e, r, n, p, _);
    a.e = l;
    a.u = "deg";
    t._props.push(r);
    return a;
};
const ty = (t, e)=>{
    for(const r in e){
        t[r] = e[r];
    }
    return t;
};
const tx = (t, e, r)=>{
    let n;
    let s;
    let i;
    let a;
    let o;
    let p;
    let l;
    const c = ty({}, r._gsap);
    const r_style = r.style;
    if (c.svg) {
        i = r.getAttribute("transform");
        r.setAttribute("transform", "");
        r_style[T] = e;
        n = tf(r, 1);
        _removeProperty(r, T);
        r.setAttribute("transform", i);
    } else {
        i = getComputedStyle(r)[T];
        r_style[T] = e;
        n = tf(r, 1);
        r_style[T] = i;
    }
    for(s in u){
        if ((i = c[s]) !== (a = n[s]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(s) < 0) {
            o = l_(i) !== (l = l_(a)) ? $(r, s, i, l) : parseFloat(i);
            p = parseFloat(a);
            t._pt = new J7(t._pt, n, s, o, p - o, x);
            t._pt.u = l || 0;
            t._props.push(s);
        }
    }
    ty(n, c);
};
fA("padding,margin,Width,Radius", function(t, e) {
    const r = "Right";
    const n = "Bottom";
    const s = "Left";
    const i = (e < 3 ? [
        "Top",
        r,
        n,
        s
    ] : [
        `Top${s}`,
        `Top${r}`,
        n + r,
        n + s
    ]).map((r)=>{
        if (e < 2) {
            return t + r;
        }
        return `border${r}${t}`;
    });
    tn[e > 1 ? `border${t}` : t] = function(t, e, r, n, s) {
        let a;
        let o;
        if (arguments.length < 4) {
            if ((o = (a = i.map((e)=>get(t, e, r))).join(" ")).split(a[0]).length === 5) {
                return a[0];
            }
            return o;
        }
        a = `${n}`.split(" ");
        o = {};
        i.forEach((t, e)=>o[t] = a[e] = a[e] || a[(e - 1) / 2 | 0]);
        t.init(e, o, s);
    };
});
const t_ = {
    name: "css",
    register,
    targetTest: function(t) {
        return t.style && t.nodeType;
    },
    init: function(t, e, r, n, s) {
        let a;
        let o;
        let p;
        let l;
        let c;
        let h;
        let g;
        let d;
        let m;
        let _;
        let M;
        let A;
        let E;
        let P;
        let C;
        let Y;
        let z;
        const _props = this._props;
        const t_style = t.style;
        const startAt = r.vars.startAt;
        if (!i) {
            register();
        }
        this.styles = this.styles || N(t);
        Y = this.styles.props;
        this.tween = r;
        for(g in e){
            if (g !== "autoRound" && (o = e[g], !(wU[g] && Zm(g, e, r, n, t, s)))) {
                c = typeof o;
                h = tn[g];
                if (c === "function") {
                    c = typeof (o = o.call(r, n, t, s));
                }
                if (c === "string" && ~o.indexOf("random(")) {
                    o = Vy(o);
                }
                if (h) {
                    if (h(this, t, g, o, r)) {
                        C = 1;
                    }
                } else if (g.substr(0, 2) === "--") {
                    a = `${getComputedStyle(t).getPropertyValue(g)}`.trim();
                    o += "";
                    qA.lastIndex = 0;
                    if (!qA.test(a)) {
                        d = l_(a);
                        if (m = l_(o)) {
                            if (d !== m) {
                                a = $(t, g, a, m) + m;
                            }
                        } else if (d) {
                            o += d;
                        }
                    }
                    this.add(t_style, "setProperty", a, o, n, s, 0, 0, g);
                    _props.push(g);
                    Y.push(g, 0, t_style[g]);
                } else if (c !== "undefined") {
                    if (startAt && g in startAt) {
                        a = typeof startAt[g] === "function" ? startAt[g].call(r, n, t, s) : startAt[g];
                        if (vQ(a) && ~a.indexOf("random(")) {
                            a = Vy(a);
                        }
                        if (!(l_(`${a}`) || a === "auto")) {
                            a += Yz.units[g] || l_(get(t, g)) || "";
                        }
                        if (`${a}`.charAt(1) === "=") {
                            a = get(t, g);
                        }
                    } else {
                        a = get(t, g);
                    }
                    l = parseFloat(a);
                    if (_ = c === "string" && o.charAt(1) === "=" && o.substr(0, 2)) {
                        o = o.substr(2);
                    }
                    p = parseFloat(o);
                    if (g in aliases) {
                        if (g === "autoAlpha") {
                            if (l === 1 && get(t, "visibility") === "hidden" && p) {
                                l = 0;
                            }
                            Y.push("visibility", 0, t_style.visibility);
                            G(this, t_style, "visibility", l ? "inherit" : "hidden", p ? "inherit" : "hidden", !p);
                        }
                        if (g !== "scale" && g !== "transform" && ~(g = aliases[g]).indexOf(",")) {
                            g = g.split(",")[0];
                        }
                    }
                    if (M = g in u) {
                        this.styles.save(g);
                        z = o;
                        if (c === "string" && o.substring(0, 6) === "var(--") {
                            if ((o = q(t, o.substring(4, o.indexOf(")")))).substring(0, 5) === "calc(") {
                                const B = t.style.perspective;
                                t.style.perspective = o;
                                o = q(t, "perspective");
                                if (B) {
                                    t.style.perspective = B;
                                } else {
                                    _removeProperty(t, "perspective");
                                }
                            }
                            p = parseFloat(o);
                        }
                        if (!A) {
                            if (!((E = t._gsap).renderTransform && !e.parseTransform)) {
                                tf(t, e.parseTransform);
                            }
                            P = e.smoothOrigin !== false && E.smooth;
                            A = this._pt = new J7(this._pt, t_style, T, 0, 1, E.renderTransform, E, 0, -1);
                            A.dep = 1;
                        }
                        if (g === "scale") {
                            this._pt = new J7(this._pt, E, "scaleY", E.scaleY, (_ ? B0(E.scaleY, _ + p) : p) - E.scaleY || 0, x);
                            this._pt.u = 0;
                            _props.push("scaleY", g);
                            g += "X";
                        } else if (g === "transformOrigin") {
                            Y.push(S, 0, t_style[S]);
                            o = te(o);
                            if (E.svg) {
                                tl(t, o, 0, P, 0, this);
                            } else {
                                if ((m = parseFloat(o.split(" ")[2]) || 0) !== E.zOrigin) {
                                    G(this, E, "zOrigin", E.zOrigin, m);
                                }
                                G(this, t_style, g, tu(a), tu(o));
                            }
                            continue;
                        } else if (g === "svgOrigin") {
                            tl(t, o, 1, P, 0, this);
                            continue;
                        } else if (g in ti) {
                            tv(this, E, g, l, _ ? B0(l, _ + o) : o);
                            continue;
                        } else if (g === "smoothOrigin") {
                            G(this, E, "smooth", E.smooth, o);
                            continue;
                        } else if (g === "force3D") {
                            E[g] = o;
                            continue;
                        } else if (g === "transform") {
                            tx(this, o, t);
                            continue;
                        }
                    } else {
                        if (!(g in t_style)) {
                            g = I(g) || g;
                        }
                    }
                    if (M || (p || p === 0) && (l || l === 0) && !v.test(o) && g in t_style) {
                        d = `${a}`.substr(`${l}`.length);
                        if (!p) {
                            p = 0;
                        }
                        m = l_(o) || (g in Yz.units ? Yz.units[g] : d);
                        if (d !== m) {
                            l = $(t, g, a, m);
                        }
                        this._pt = new J7(this._pt, M ? E : t_style, g, l, (_ ? B0(l, _ + p) : p) - l, !M && (m === "px" || g === "zIndex") && e.autoRound !== false ? w : x);
                        this._pt.u = m || 0;
                        if (M && z !== o) {
                            this._pt.b = a;
                            this._pt.e = z;
                            this._pt.r = O;
                        } else if (d !== m && m !== "%") {
                            this._pt.b = a;
                            this._pt.r = b;
                        }
                    } else if (g in t_style) {
                        K.call(this, t, g, a, _ ? _ + o : o);
                    } else if (g in t) {
                        this.add(t, g, a || t[g], _ ? _ + o : o, n, s);
                    } else if (g !== "parseTransform") {
                        dg(g, o);
                        continue;
                    }
                    if (!M) {
                        if (g in t_style) {
                            Y.push(g, 0, t_style[g]);
                        } else if (typeof t[g] === "function") {
                            Y.push(g, 2, t[g]());
                        } else {
                            Y.push(g, 1, a || t[g]);
                        }
                    }
                    _props.push(g);
                }
            }
        }
        if (C) {
            St(this);
        }
    },
    render: function(t, e) {
        if (e.tween._time || !p()) {
            for(let r = e._pt; r;){
                r.r(t, r.d);
                r = r._next;
            }
        } else {
            e.styles.revert();
        }
    },
    get,
    aliases,
    getSetter: function(t, e, r) {
        const n = aliases[e];
        if (n && n.indexOf(",") < 0) {
            e = n;
        }
        if (e in u && e !== S && (t._gsap.x || get(t, "x"))) {
            if (r && o === r) {
                if (e === "scale") {
                    return Y;
                }
                return C;
            }
            o = r || {};
            if (e === "scale") {
                return z;
            }
            return F;
        }
        if (t.style && !OF(t.style[e])) {
            return E;
        }
        if (~e.indexOf("-")) {
            return P;
        }
        return Dx(t, e);
    },
    core: {
        _removeProperty,
        _getMatrix
    }
};
os.utils.checkPrefix = I;
os.core.getStyleSaver = N;
(()=>{
    const t = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent";
    const e = "rotation,rotationX,rotationY,skewX,skewY";
    const r = "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective";
    const n = "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY";
    const s = fA(`${t},${e},${r}`, function(t) {
        u[t] = 1;
    });
    fA(e, function(t) {
        Yz.units[t] = "deg";
        ti[t] = 1;
    });
    aliases[s[13]] = `${t},${e}`;
    fA(n, function(t) {
        const e = t.split(":");
        aliases[e[1]] = s[e[0]];
    });
})();
fA("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(t) {
    Yz.units[t] = "px";
});
os.registerPlugin(t_);
export const Ay = os.registerPlugin(t_) || os;
Ay.core.Tween;
