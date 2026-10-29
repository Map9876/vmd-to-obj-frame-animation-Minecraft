import { G, U, W, me, pe } from "./useScrollLock-B98zsivK/chunk_le.js";
import { K, _e, ge, ve, xe, ye } from "./useScrollLock-B98zsivK/chunk_he.js";
import { q } from "./useScrollLock-B98zsivK/chunk_Se.js";
import { Ie, Le } from "./useScrollLock-B98zsivK/chunk_Ie.js";
import { tt } from "./useScrollLock-B98zsivK/chunk_tt.js";
import { kt } from "./useScrollLock-B98zsivK/chunk_Tt_2.js";
import { Nt } from "./useScrollLock-B98zsivK/chunk_Mt.js";
import { Ht } from "./useScrollLock-B98zsivK/chunk_Vt.js";
import { Qt } from "./useScrollLock-B98zsivK/chunk_Zt.js";
import { yn } from "./useScrollLock-B98zsivK/chunk_vn.js";
import { jn } from "./useScrollLock-B98zsivK/chunk_bn.js";
import { $, dr, fr, pr } from "./useScrollLock-B98zsivK/chunk_dr.js";
import { $r, Jr, Qr, Xr, Yr, Zr, ai, ci, ei, ii, li, ni, oi, ri, si, ti } from "./useScrollLock-B98zsivK/chunk_Ur.js";
import { di } from "./useScrollLock-B98zsivK/chunk_ui.js";
import { fi } from "./useScrollLock-B98zsivK/chunk_fi.js";
import { n, s, t } from "./jsx-runtime-Db0DjQYK.js";
import { f } from "./current-Bq9r6xhE.js";
import { n as n_2, r } from "./useStore-DX_rDZVw.js";
import { A, D, M as M_1, O, T, _, a, d, h, i, j, k, m as m_1, n as n_3, o, p, s as s_2, w, x } from "./dist-7IP26fql.js";
import { C as C_1, D as D_2, O as O_2, S, d as d_2, f as f_2, i as i_2, t as t_2 } from "./createBaseUIEventDetails-Df69IYx-.js";
import { i as i_3, n as n_4, r as r_2, t as t_3 } from "./owner-Bmp_Sgwo.js";
export const Tn = ((e)=>{
    e.startingStyle = `data-starting-style`;
    e.endingStyle = `data-ending-style`;
    return e;
})({});
const oe = {
    [Tn.startingStyle]: ``
};
const M = {
    [Tn.endingStyle]: ``
};
export const En = {
    transitionStatus (e) {
        if (e === `starting`) {
            return oe;
        }
        if (e === `ending`) {
            return M;
        }
        return null;
    }
};
export const bn = ((e)=>{
    e.open = `data-open`;
    e.closed = `data-closed`;
    e[e.startingStyle = Tn.startingStyle] = `startingStyle`;
    e[e.endingStyle = Tn.endingStyle] = `endingStyle`;
    e.anchorHidden = `data-anchor-hidden`;
    e.side = `data-side`;
    e.align = `data-align`;
    return e;
})({});
export const xn = ((e)=>{
    e.popupOpen = `data-popup-open`;
    e.pressed = `data-pressed`;
    return e;
})({});
const se = {
    [xn.popupOpen]: ``
};
const I = {
    [xn.popupOpen]: ``,
    [xn.pressed]: ``
};
const L = {
    [bn.open]: ``
};
const R = {
    [bn.closed]: ``
};
const z = {
    [bn.anchorHidden]: ``
};
export const wn = {
    open (e) {
        if (e) {
            return se;
        }
        return null;
    }
};
export const Cn = {
    open (e) {
        if (e) {
            return I;
        }
        return null;
    }
};
export const Sn = {
    open (e) {
        if (e) {
            return L;
        }
        return R;
    },
    anchorHidden (e) {
        if (e) {
            return z;
        }
        return null;
    }
};
W.startsWith(`win`);
if (!pe) {
    /^(linux|chrome os)/.test(W);
}
if (!ge) {
    U.includes(`chrom`);
}
globalThis.requestAnimationFrame;
function we() {
    let current = h(q.create).current;
    xe(current.disposeEffect);
    return current;
}
const Te = s(f(), 1);
const J = t();
const Ee = r();
const De = n_2();
export function dn(e, t = false, n = false) {
    let [r, setR] = K.useState(e && t ? `idle` : undefined);
    let [a, setA] = K.useState(e);
    if (e && !a) {
        setA(true);
        setR(`starting`);
    }
    if (!e && a && r !== `ending` && !n) {
        setR(`ending`);
    }
    if (!e && !a && r === `ending`) {
        setR(undefined);
    }
    p(()=>{
        if (!e && a && r !== `ending` && n) {
            let e = q.request(()=>{
                setR(`ending`);
            });
            return ()=>{
                q.cancel(e);
            };
        }
    }, [
        e,
        a,
        r,
        n
    ]);
    p(()=>{
        if (!e || t) {
            return;
        }
        let n = q.request(()=>{
            setR(undefined);
        });
        return ()=>{
            q.cancel(n);
        };
    }, [
        t,
        e
    ]);
    p(()=>{
        if (!e || !t) {
            return;
        }
        if (e && a && r !== `idle`) {
            setR(`starting`);
        }
        let n = q.request(()=>{
            setR(`idle`);
        });
        return ()=>{
            q.cancel(n);
        };
    }, [
        t,
        e,
        a,
        r
    ]);
    return {
        mounted: a,
        setMounted: setA,
        transitionStatus: r
    };
}
function Y(e) {
    if (e == null) {
        return e;
    }
    if (`current` in e) {
        return e.current;
    }
    return e;
}
export function un(e, t = false, n = true) {
    let r = we();
    return m_1((i, a = null)=>{
        r.cancel();
        let o = Y(e);
        if (o == null) {
            return;
        }
        let s = o;
        let c = ()=>{
            Te.flushSync(i);
        };
        if (typeof s.getAnimations != `function` || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
            i();
            return;
        }
        function l() {
            Promise.all(s.getAnimations().map((e)=>e.finished)).then(()=>{
                if (!a?.aborted) {
                    c();
                }
            }).catch(()=>{
                if (n) {
                    if (!a?.aborted) {
                        c();
                    }
                    return;
                }
                let e = s.getAnimations();
                if (!a?.aborted && e.length > 0 && e.some((e)=>e.pending || e.playState !== `finished`)) {
                    l();
                }
            });
        }
        if (t) {
            let e = Tn.startingStyle;
            if (!s.hasAttribute(e)) {
                r.request(l);
                return;
            }
            let t = new MutationObserver(()=>{
                if (!s.hasAttribute(e)) {
                    t.disconnect();
                    l();
                }
            });
            t.observe(s, {
                attributes: true,
                attributeFilter: [
                    e
                ]
            });
            a?.addEventListener(`abort`, ()=>t.disconnect(), {
                once: true
            });
            return;
        }
        r.request(l);
    });
}
function useAe({ enabled = true, open, ref, onComplete }) {
    let a = m_1(onComplete);
    let o = un(ref, open, false);
    K.useEffect(()=>{
        if (!enabled) {
            return;
        }
        let e = new AbortController;
        o(a, e.signal);
        return ()=>{
            e.abort();
        };
    }, [
        enabled,
        open,
        a,
        o
    ]);
}
const je = 0;
export const sn = class e {
    static create() {
        return new e;
    }
    currentId = je;
    start(e, t) {
        this.clear();
        this.currentId = setTimeout(()=>{
            this.currentId = je;
            t();
        }, e);
    }
    isStarted() {
        return this.currentId !== je;
    }
    clear = ()=>{
        if (this.currentId !== je) {
            clearTimeout(this.currentId);
            this.currentId = je;
        }
    };
    disposeEffect = ()=>this.clear;
};
function Ne() {
    let current = h(sn.create).current;
    xe(current.disposeEffect);
    return current;
}
function Pe(e) {
    e.preventDefault();
    e.stopPropagation();
}
function Fe(e) {
    return `nativeEvent` in e;
}
function Re(e, t) {
    let n = [
        `mouse`,
        `pen`
    ];
    if (!t) {
        n.push(``, undefined);
    }
    return n.includes(e);
}
function ze({ type }) {
    return type === `click` || type === `mousedown` || type === `keydown` || type === `keyup`;
}
const Be = `data-base-ui-focusable`;
const Ve = `input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])`;
const He = `ArrowLeft`;
const Ue = `ArrowRight`;
const We = `ArrowUp`;
const Ge = `ArrowDown`;
function Ke(e, t) {
    if (!D(e)) {
        return false;
    }
    let n = e;
    if (t.hasElement(n)) {
        return !n.hasAttribute(`data-trigger-disabled`);
    }
    for (let [, e] of t.entries()){
        if (r_2(e, n)) {
            return !e.hasAttribute(`data-trigger-disabled`);
        }
    }
    return false;
}
function qe(e, t) {
    if (t == null) {
        return false;
    }
    if (`composedPath` in e) {
        return e.composedPath().includes(t);
    }
    let n = e;
    return n.target != null && t.contains(n.target);
}
function Je(e) {
    return e.matches(`html,body`);
}
export function Zt(e) {
    return O(e) && e.matches(`input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])`);
}
function Xe(e) {
    return e?.closest(`button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${Ve}`) != null;
}
function Ze(e) {
    if (e) {
        return e.getAttribute(`role`) === `combobox` && Zt(e);
    }
    return false;
}
function Qe(e) {
    if (!e || ye) {
        return true;
    }
    try {
        return e.matches(`:focus-visible`);
    } catch  {
        return true;
    }
}
function $e(e) {
    if (e) {
        if (e.hasAttribute(`data-base-ui-focusable`)) {
            return e;
        }
        return e.querySelector(`[data-base-ui-focusable]`) || e;
    }
    return null;
}
function X(e, t, n, r) {
    e.addEventListener(t, n, r);
    return ()=>{
        e.removeEventListener(t, n, r);
    };
}
function et(...e) {
    return ()=>{
        for(let t = 0; t < e.length; t += 1){
            let n = e[t];
            if (n) {
                n();
            }
        }
    };
}
const rt = {
    clipPath: `inset(50%)`,
    overflow: `hidden`,
    whiteSpace: `nowrap`,
    border: 0,
    padding: 0,
    width: 1,
    height: 1,
    margin: -1
};
const style = {
    ...rt,
    position: `fixed`,
    top: 0,
    left: 0
};
const at = {
    ...rt,
    position: `absolute`
};
const Ot1 = K.forwardRef(function(e, t) {
    let [n, setN] = K.useState();
    p(()=>{
        if (ve && ge) {
            setN(`button`);
        }
    }, []);
    let i = {
        tabIndex: 0,
        role: n
    };
    return <span {...e} ref={t} style={style} aria-hidden={n ? undefined : true} {...i} data-base-ui-focus-guard={``}/>;
});
const st = [
    `top`,
    `right`,
    `bottom`,
    `left`
];
export const Lt = Math.min;
export const It = Math.max;
const Math_round = Math.round;
const Math_floor = Math.floor;
export const St = (e)=>({
        x: e,
        y: e
    });
const pt = {
    left: `right`,
    right: `left`,
    bottom: `top`,
    top: `bottom`
};
export function xt(e, t, n) {
    return It(e, Lt(t, n));
}
function ht(e, t) {
    if (typeof e == `function`) {
        return e(t);
    }
    return e;
}
function gt(e) {
    return e.split(`-`)[0];
}
export function Tt(e) {
    return e.split(`-`)[1];
}
export function At(e) {
    if (e === `x`) {
        return `y`;
    }
    return `x`;
}
export function Ot(e) {
    if (e === `y`) {
        return `height`;
    }
    return `width`;
}
function bt([t]) {
    if (t === `t` || t === `b`) {
        return `y`;
    }
    return `x`;
}
export function Et(e) {
    return At(bt(e));
}
export function Dt(e, t, n = false) {
    let r = Tt(e);
    let i = Et(e);
    let a = Ot(i);
    let o = i === `x` ? r === (n ? `end` : `start`) ? `right` : `left` : r === `start` ? `bottom` : `top`;
    if (t.reference[a] > t.floating[a]) {
        o = Mt(o);
    }
    return [
        o,
        Mt(o)
    ];
}
function Ct(e) {
    let t = Mt(e);
    return [
        wt(e),
        t,
        wt(t)
    ];
}
function wt(e) {
    if (e.includes(`start`)) {
        return e.replace(`start`, `end`);
    }
    return e.replace(`end`, `start`);
}
export function jt(e, t, n, r) {
    let i = Tt(e);
    let a = kt(gt(e), n === `start`, r);
    if (i) {
        a = a.map((e)=>e + `-` + i);
        if (t) {
            a = a.concat(a.map(wt));
        }
    }
    return a;
}
export function Mt(e) {
    let t = gt(e);
    return pt[t] + e.slice(t.length);
}
function Pt({ x, y, width, height }) {
    return {
        width,
        height,
        top: y,
        left: x,
        right: x + width,
        bottom: y + height,
        x,
        y
    };
}
function Ft(e, t, n) {
    return Math.floor(e / t) !== n;
}
export function yt(e, t) {
    return t < 0 || t >= e.length;
}
export function _t(e, t) {
    return mt(e.current, {
        disabledIndices: t
    });
}
function Rt(e, t) {
    return mt(e.current, {
        decrement: true,
        startingIndex: e.current.length,
        disabledIndices: t
    });
}
export function mt(e, { startingIndex = -1, decrement = false, disabledIndices, amount = 1 } = {}) {
    let a = startingIndex;
    do {
        a += decrement ? -amount : amount;
    }while (a >= 0 && a <= e.length - 1 && Bt(e, a, disabledIndices))
    return a;
}
function zt(e, { event, orientation, loopFocus, onLoop, rtl, cols, disabledIndices, minIndex, maxIndex, prevIndex, stopEvent = false }) {
    let f = prevIndex;
    let p;
    if (event.key === `ArrowUp`) {
        p = `up`;
    } else if (event.key === `ArrowDown`) {
        p = `down`;
    }
    if (p) {
        let n = [];
        let a = [];
        let m = false;
        let h = 0;
        {
            let t = null;
            let r = -1;
            e.forEach((e, i)=>{
                if (e == null) {
                    return;
                }
                h += 1;
                let o = e.closest(`[role="row"]`);
                if (o) {
                    m = true;
                }
                if (o !== t || r === -1) {
                    t = o;
                    r += 1;
                    n[r] = [];
                }
                n[r].push(i);
                a[i] = r;
            });
        }
        let g = false;
        let _ = 0;
        if (m) {
            for (let e of n){
                let t = e.length;
                if (t > _) {
                    _ = t;
                }
                if (t !== cols) {
                    g = true;
                }
            }
        }
        let v = g && h < e.length;
        let amount = _ || cols;
        let b = (o)=>{
            if (!g || prevIndex === -1) {
                return;
            }
            let c = a[prevIndex];
            if (c == null) {
                return;
            }
            let l = n[c].indexOf(prevIndex);
            let d = o === `up` ? -1 : 1;
            for(let o = c + d, f = 0; f < n.length; f += 1, o += d){
                if (o < 0 || o >= n.length) {
                    if (!loopFocus || v) {
                        return;
                    }
                    o = o < 0 ? n.length - 1 : 0;
                    if (onLoop) {
                        let e = Math.min(l, n[o].length - 1);
                        o = a[onLoop(event, prevIndex, n[o][e] ?? n[o][0])] ?? o;
                    }
                }
                let c = n[o];
                for(let t = Math.min(l, c.length - 1); t >= 0; --t){
                    let n = c[t];
                    if (!Bt(e, n, disabledIndices)) {
                        return n;
                    }
                }
            }
        };
        let x = (t)=>{
            if (!v || prevIndex === -1) {
                return;
            }
            let n = prevIndex % amount;
            let i = t === `up` ? -amount : amount;
            let a = maxIndex - maxIndex % amount;
            let o = Math_floor(maxIndex / amount) + 1;
            for(let t = prevIndex - n + i, c = 0; c < o; c += 1, t += i){
                if (t < 0 || t > maxIndex) {
                    if (!loopFocus) {
                        return;
                    }
                    t = t < 0 ? a : 0;
                }
                let i = Math.min(t + amount - 1, maxIndex);
                for(let r = Math.min(t + n, i); r >= t; --r){
                    if (!Bt(e, r, disabledIndices)) {
                        return r;
                    }
                }
            }
        };
        if (stopEvent) {
            Pe(event);
        }
        let S = b(p) ?? x(p);
        if (S !== undefined) {
            f = S;
        } else if (prevIndex === -1) {
            f = p === `up` ? maxIndex : minIndex;
        } else {
            f = mt(e, {
                startingIndex: prevIndex,
                amount,
                decrement: p === `up`,
                disabledIndices
            });
            if (loopFocus) {
                if (p === `up` && (prevIndex - amount < minIndex || f < 0)) {
                    let e = prevIndex % amount;
                    let n = maxIndex % amount;
                    let r = maxIndex - (n - e);
                    f = n === e ? maxIndex : n > e ? r : r - amount;
                    if (onLoop) {
                        f = onLoop(event, prevIndex, f);
                    }
                }
                if (p === `down` && prevIndex + amount > maxIndex) {
                    f = mt(e, {
                        startingIndex: prevIndex % amount - amount,
                        amount,
                        disabledIndices
                    });
                    if (onLoop) {
                        f = onLoop(event, prevIndex, f);
                    }
                }
            }
        }
        if (yt(e, f)) {
            f = prevIndex;
        }
    }
    if (orientation === `both`) {
        let n = Math_floor(prevIndex / cols);
        if (event.key === (rtl ? `ArrowLeft` : `ArrowRight`)) {
            if (stopEvent) {
                Pe(event);
            }
            if (prevIndex % cols === cols - 1) {
                if (loopFocus) {
                    f = mt(e, {
                        startingIndex: prevIndex - prevIndex % cols - 1,
                        disabledIndices
                    });
                    if (onLoop) {
                        f = onLoop(event, prevIndex, f);
                    }
                }
            } else {
                f = mt(e, {
                    startingIndex: prevIndex,
                    disabledIndices
                });
                if (loopFocus && Ft(f, cols, n)) {
                    f = mt(e, {
                        startingIndex: prevIndex - prevIndex % cols - 1,
                        disabledIndices
                    });
                    if (onLoop) {
                        f = onLoop(event, prevIndex, f);
                    }
                }
            }
            if (Ft(f, cols, n)) {
                f = prevIndex;
            }
        }
        if (event.key === (rtl ? `ArrowRight` : `ArrowLeft`)) {
            if (stopEvent) {
                Pe(event);
            }
            if (prevIndex % cols === 0) {
                if (loopFocus) {
                    f = mt(e, {
                        startingIndex: prevIndex + (cols - prevIndex % cols),
                        decrement: true,
                        disabledIndices
                    });
                    if (onLoop) {
                        f = onLoop(event, prevIndex, f);
                    }
                }
            } else {
                f = mt(e, {
                    startingIndex: prevIndex,
                    decrement: true,
                    disabledIndices
                });
                if (loopFocus && Ft(f, cols, n)) {
                    f = mt(e, {
                        startingIndex: prevIndex + (cols - prevIndex % cols),
                        decrement: true,
                        disabledIndices
                    });
                    if (onLoop) {
                        f = onLoop(event, prevIndex, f);
                    }
                }
            }
            if (Ft(f, cols, n)) {
                f = prevIndex;
            }
        }
        let c = Math_floor(maxIndex / cols) === n;
        if (yt(e, f)) {
            if (loopFocus && c) {
                f = event.key === (rtl ? `ArrowRight` : `ArrowLeft`) ? maxIndex : mt(e, {
                    startingIndex: prevIndex - prevIndex % cols - 1,
                    disabledIndices
                });
                if (onLoop) {
                    f = onLoop(event, prevIndex, f);
                }
            } else {
                f = prevIndex;
            }
        }
    }
    return f;
}
function Bt(e, t, n) {
    if (typeof n == `function` ? n(t) : n?.includes(t) ?? false) {
        return true;
    }
    let r = e[t];
    if (r) {
        if (Ht(r)) {
            return !n && (r.hasAttribute(`disabled`) || r.getAttribute(`aria-disabled`) === `true`);
        }
        return true;
    }
    return false;
}
const Ut = `a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]`;
function Wt(e) {
    let e_assignedSlot = e.assignedSlot;
    if (e_assignedSlot) {
        return e_assignedSlot;
    }
    if (e.parentElement) {
        return e.parentElement;
    }
    let n = e.getRootNode();
    if (M_1(n)) {
        return n.host;
    }
    return null;
}
function Gt(e) {
    for (let t of Array.from(e.children)){
        if (x(t) === `summary`) {
            return t;
        }
    }
    return null;
}
function Kt(e, t) {
    let n = Gt(t);
    return !!n && (e === n || r_2(n, e));
}
function qt(e) {
    let t = e ? x(e) : ``;
    return e != null && e.matches(Ut) && (t !== `summary` || e.parentElement != null && x(e.parentElement) === `details` && Gt(e.parentElement) === e) && (t !== `details` || Gt(e) == null) && (t !== `input` || e.type !== `hidden`);
}
function Jt(e) {
    if (!qt(e) || !e.isConnected || e.matches(`:disabled`)) {
        return false;
    }
    for(let t = e; t; t = Wt(t)){
        let n = t !== e;
        let r = x(t) === `slot`;
        if (t.hasAttribute(`inert`) || n && x(t) === `details` && !t.open && !Kt(e, t) || t.hasAttribute(`hidden`) || !r && !Yt(t, n)) {
            return false;
        }
    }
    return true;
}
function Yt(e, t) {
    let n = _(e);
    if (t) {
        return n.display !== `none`;
    }
    return Ht(e, n);
}
function Xt(e) {
    let e_tabIndex = e.tabIndex;
    if (e_tabIndex < 0) {
        let t = x(e);
        if (t === `details` || t === `audio` || t === `video` || O(e) && e.isContentEditable) {
            return 0;
        }
    }
    return e_tabIndex;
}
function $t(e) {
    if (O(e) && x(e) === `slot`) {
        let t = e.assignedElements({
            flatten: true
        });
        if (t.length > 0) {
            return t;
        }
    }
    if (O(e) && e.shadowRoot) {
        return Array.from(e.shadowRoot.children);
    }
    return Array.from(e.children);
}
function en(e, t) {
    $t(e).forEach((e)=>{
        if (qt(e)) {
            t.push(e);
        }
        en(e, t);
    });
}
function tn(e, t, n) {
    $t(e).forEach((e)=>{
        if (O(e) && e.matches(t)) {
            n.push(e);
        }
        tn(e, t, n);
    });
}
function nn(e) {
    return Jt(e) && Xt(e) >= 0;
}
function rn(e) {
    let t = [];
    en(e, t);
    return t.filter(Jt);
}
function an(e) {
    let t = rn(e);
    return t.filter((e)=>Xt(e) >= 0 && Qt(e, t));
}
function on(e, t) {
    let n = an(e);
    let n_length = n.length;
    if (n_length === 0) {
        return;
    }
    let i = n_4(t_3(e));
    let a = n.indexOf(i);
    return n[a === -1 ? t === 1 ? 0 : n_length - 1 : a + t];
}
export function ut(e) {
    return on(t_3(e).body, 1) || e;
}
function cn(e) {
    return on(t_3(e).body, -1) || e;
}
function ln(e, t) {
    if (!e) {
        return null;
    }
    let n = an(t_3(e).body);
    let n_length = n.length;
    if (n_length === 0) {
        return null;
    }
    let i = n.indexOf(e);
    if (i === -1) {
        return null;
    }
    return n[(i + t + n_length) % n_length];
}
export function dt(e) {
    return ln(e, 1);
}
export function ft(e) {
    return ln(e, -1);
}
function fn(e, t) {
    let n = t || e.currentTarget;
    let e_relatedTarget = e.relatedTarget;
    return !e_relatedTarget || !r_2(n, e_relatedTarget);
}
function pn(e) {
    an(e).forEach((e)=>{
        e.dataset.tabindex = e.getAttribute(`tabindex`) || ``;
        e.setAttribute(`tabindex`, `-1`);
    });
}
function mn(e) {
    let t = [];
    tn(e, `[data-tabindex]`, t);
    t.forEach((e)=>{
        let tabindex = e.dataset.tabindex;
        delete e.dataset.tabindex;
        if (tabindex) {
            e.setAttribute(`tabindex`, tabindex);
        } else {
            e.removeAttribute(`tabindex`);
        }
    });
}
export function lt(e, t, n = true) {
    return e.filter((e)=>e.parentId === t).flatMap((t)=>[
            ...!n || t.context?.open ? [
                t
            ] : [],
            ...lt(e, t.id, n)
        ]);
}
function gn(e, t) {
    let n = [];
    let r = e.find((e)=>e.id === t)?.parentId;
    while(r){
        let t = e.find((e)=>e.id === r);
        r = t?.parentId;
        if (t) {
            n = n.concat(t);
        }
    }
    return n;
}
export function ct(e) {
    return `data-base-ui-${e}`;
}
export const it = {
    style: {
        transition: `none`
    }
};
const Nn = `data-base-ui-click-trigger`;
const Pn = {
    fallbackAxisSide: `none`
};
export const ot = {
    fallbackAxisSide: `end`
};
const style_1 = {
    clipPath: `inset(50%)`,
    position: `fixed`,
    top: 0,
    left: 0
};
const LnContext = K.createContext(null);
const useRn = ()=>K.useContext(LnContext);
const zn = ct(`portal`);
export function nt({ ref, container, componentProps = i, elementProps } = {}) {
    let a = i_2();
    let s = useRn()?.portalNode;
    let [c, setC] = K.useState(null);
    let [portalNode, setPortalNode] = K.useState(null);
    let f = m_1((e)=>{
        if (e !== null) {
            setPortalNode(e);
        }
    });
    let pRef = K.useRef(null);
    p(()=>{
        if (container === null) {
            if (pRef.current) {
                pRef.current = null;
                setPortalNode(null);
                setC(null);
            }
            return;
        }
        if (a == null) {
            return;
        }
        let e = (container && (A(container) ? container : container.current)) ?? s ?? document.body;
        if (e == null) {
            if (pRef.current) {
                pRef.current = null;
                setPortalNode(null);
                setC(null);
            }
            return;
        }
        if (pRef.current !== e) {
            pRef.current = e;
            setPortalNode(null);
            setC(e);
        }
    }, [
        container,
        s,
        a
    ]);
    let m = n_3(`div`, componentProps, {
        ref: [
            ref,
            f
        ],
        props: [
            {
                id: a,
                [zn]: ``
            },
            elementProps
        ]
    });
    return {
        portalNode,
        portalSubtree: c && m ? Te.createPortal(m, c) : null
    };
}
const Vn = K.forwardRef(function(componentProps, t) {
    let { render, className, style, children, container, renderGuards, ...rest } = componentProps;
    let { portalNode, portalSubtree } = nt({
        container,
        ref: t,
        componentProps,
        elementProps: rest
    });
    let dRef = K.useRef(null);
    let fRef = K.useRef(null);
    let pRef = K.useRef(null);
    let mRef = K.useRef(null);
    let [h, setH] = K.useState(null);
    let _RefRef = K.useRef(false);
    let v = h?.modal;
    let y = h?.open;
    let b = typeof renderGuards == `boolean` ? renderGuards : !!h && !h.modal && h.open && !!portalNode;
    K.useEffect(()=>{
        if (!portalNode || v) {
            return;
        }
        function e(e) {
            if (portalNode && e.relatedTarget && fn(e)) {
                if (e.type === `focusin`) {
                    _RefRef.current &&= (mn(portalNode), false);
                } else {
                    pn(portalNode);
                    _RefRef.current = true;
                }
            }
        }
        return et(X(portalNode, `focusin`, e, true), X(portalNode, `focusout`, e, true));
    }, [
        portalNode,
        v
    ]);
    p(()=>{
        if (!(!portalNode || y !== true || !_RefRef.current)) {
            mn(portalNode);
            _RefRef.current = false;
        }
    }, [
        y,
        portalNode
    ]);
    let value = K.useMemo(()=>({
            beforeOutsideRef: dRef,
            afterOutsideRef: fRef,
            beforeInsideRef: pRef,
            afterInsideRef: mRef,
            portalNode,
            setFocusManagerState: setH
        }), [
        portalNode
    ]);
    return <>{portalSubtree}<LnContext.Provider value={value}>{b && portalNode && <Ot1 data-type={`outside`} ref={dRef} onFocus={(e)=>{
        if (fn(e, portalNode)) {
            pRef.current?.focus();
        } else {
            cn(h ? h.domReference : null)?.focus();
        }
    }}/>}{b && portalNode && <span aria-owns={portalNode.id} style={style_1}/>}{portalNode && Te.createPortal(children, portalNode)}{b && portalNode && <Ot1 data-type={`outside`} ref={fRef} onFocus={(e)=>{
        if (fn(e, portalNode)) {
            mRef.current?.focus();
        } else {
            ut(h ? h.domReference : null)?.focus();
            if (h?.closeOnFocusOut) {
                h?.onOpenChange(false, t_2(`focus-out`, e.nativeEvent));
            }
        }
    }}/>}</LnContext.Provider></>;
});
function Hn() {
    let e = new Map;
    return {
        emit (t, n) {
            e.get(t)?.forEach((e)=>e(n));
        },
        on (t, n) {
            if (!e.has(t)) {
                e.set(t, new Set);
            }
            e.get(t).add(n);
        },
        off (t, n) {
            e.get(t)?.delete(n);
        }
    };
}
class Un {
    nodesRef = {
        current: []
    };
    events = Hn();
    addNode(e) {
        this.nodesRef.current.push(e);
    }
    removeNode(e) {
        let t = this.nodesRef.current.findIndex((t)=>t === e);
        if (t !== -1) {
            this.nodesRef.current.splice(t, 1);
        }
    }
}
const WnContext = K.createContext(null);
const GnContext = K.createContext(null);
const useKn = ()=>K.useContext(WnContext)?.id || null;
const useQn = (e)=>{
    let t = K.useContext(GnContext);
    return e ?? t;
};
function Jn(e) {
    let t = i_2();
    let n = useQn(e);
    let r = useKn();
    p(()=>{
        if (!t) {
            return;
        }
        let e = {
            id: t,
            parentId: r
        };
        n?.addNode(e);
        return ()=>{
            n?.removeNode(e);
        };
    }, [
        n,
        t,
        r
    ]);
    return t;
}
function YnComponent({ children, id }) {
    let r = useKn();
    return <WnContext.Provider value={K.useMemo(()=>({
            id,
            parentId: r
        }), [
        id,
        r
    ])}>{children}</WnContext.Provider>;
}
function XnComponent({ children, externalTree }) {
    let current = h(()=>externalTree ?? new Un).current;
    return <GnContext.Provider value={current}>{children}</GnContext.Provider>;
}
function Zn(nativeEvent, t) {
    let n = T(i_3(nativeEvent));
    if (nativeEvent instanceof n.KeyboardEvent) {
        return `keyboard`;
    }
    if (nativeEvent instanceof n.FocusEvent) {
        return t || `keyboard`;
    }
    if (`pointerType` in nativeEvent) {
        return nativeEvent.pointerType || `keyboard`;
    }
    if (`touches` in nativeEvent) {
        return `touch`;
    }
    if (nativeEvent instanceof n.MouseEvent) {
        return t || (nativeEvent.detail === 0 ? `keyboard` : `mouse`);
    }
    return ``;
}
const Qn = 20;
let Q = [];
function $n() {
    Q = Q.filter((e)=>e.deref()?.isConnected);
}
function er(e) {
    $n();
    if (e && x(e) !== `body`) {
        Q.push(new WeakRef(e));
        if (Q.length > Qn) {
            Q = Q.slice(-20);
        }
    }
}
function tr() {
    $n();
    return Q[Q.length - 1]?.deref();
}
function nr(e) {
    if (e) {
        if (nn(e)) {
            return e;
        }
        return an(e)[0] || e;
    }
    return null;
}
function rr(e) {
    if (e.hasAttribute(`tabindex`) && !e.hasAttribute(`data-tabindex`) || !e.getAttribute(`role`)?.includes(`dialog`)) {
        return;
    }
    let t = rn(e).filter((e)=>{
        let t = e.getAttribute(`data-tabindex`) || ``;
        return nn(e) || e.hasAttribute(`data-tabindex`) && !t.startsWith(`-`);
    });
    let n = e.getAttribute(`tabindex`);
    if (t.length === 0) {
        if (n !== `0`) {
            e.setAttribute(`tabindex`, `0`);
            e.setAttribute(`data-tabindex`, `0`);
        }
    } else if (n !== `-1` || e.hasAttribute(`data-tabindex`) && e.getAttribute(`data-tabindex`) !== `-1`) {
        e.setAttribute(`tabindex`, `-1`);
        e.setAttribute(`data-tabindex`, `-1`);
    }
}
function IrComponent({ context, children, disabled = false, initialFocus = true, returnFocus = true, restoreFocus = false, modal = true, closeOnFocusOut = true, openInteractionType = ``, nextFocusableElement, previousFocusableElement, beforeContentFocusGuardRef, externalTree, getInsideElements }) {
    let g = `rootStore` in context ? context.rootStore : context;
    let _ = g.useState(`open`);
    let domReference = g.useState(`domReferenceElement`);
    let b = g.useState(`floatingElement`);
    let { events, dataRef } = g.context;
    let T = m_1(()=>dataRef.current.floatingContext?.nodeId);
    let te = initialFocus === false;
    let E = Ze(domReference) && te;
    let ne = tt(initialFocus);
    let D = tt(returnFocus);
    let j = tt(openInteractionType);
    let oe = tt(_);
    let M = useQn(externalTree);
    let N = useRn();
    let PRef = K.useRef(false);
    let FRef = K.useRef(false);
    let seRef = K.useRef(false);
    let IRef = K.useRef(null);
    let LRef = K.useRef(``);
    let RRef = K.useRef(``);
    let zRef = K.useRef(null);
    let BRef = K.useRef(null);
    let V = s_2(zRef, beforeContentFocusGuardRef, N?.beforeInsideRef);
    let ce = s_2(BRef, N?.afterInsideRef);
    let le = Ne();
    let ue = Ne();
    let de = we();
    let H = N != null;
    let U = $e(b);
    let W = m_1((e = U)=>{
        if (e) {
            return an(e);
        }
        return [];
    });
    let G = m_1(()=>getInsideElements?.().filter((e)=>e != null) ?? []);
    K.useEffect(()=>{
        if (disabled || !modal) {
            return;
        }
        function e(e) {
            if (e.key === `Tab` && r_2(U, n_4(t_3(U))) && W().length === 0 && !E) {
                Pe(e);
            }
        }
        return X(t_3(U), `keydown`, e);
    }, [
        disabled,
        U,
        modal,
        E,
        W
    ]);
    K.useEffect(()=>{
        if (disabled || !_) {
            return;
        }
        let e = t_3(U);
        function t() {
            seRef.current = false;
        }
        function n(e) {
            let t = i_3(e);
            let n = G();
            seRef.current = !(r_2(b, t) || r_2(domReference, t) || r_2(N?.portalNode, t) || n.some((e)=>e === t || r_2(e, t)));
            RRef.current = e.pointerType || `keyboard`;
            if (t?.closest(`[data-base-ui-click-trigger]`)) {
                FRef.current = true;
                ue.start(0, ()=>{
                    FRef.current = false;
                });
            }
        }
        function i() {
            RRef.current = `keyboard`;
        }
        return et(X(e, `pointerdown`, n, true), X(e, `pointerup`, t, true), X(e, `pointercancel`, t, true), X(e, `keydown`, i, true), t);
    }, [
        disabled,
        b,
        domReference,
        U,
        _,
        N,
        ue,
        G
    ]);
    K.useEffect(()=>{
        if (disabled || !closeOnFocusOut) {
            return;
        }
        let e = t_3(U);
        function t() {
            FRef.current = true;
            ue.start(0, ()=>{
                FRef.current = false;
            });
        }
        function n(e) {
            let t = i_3(e);
            if (nn(t)) {
                IRef.current = t;
            }
        }
        function i(t) {
            let t_relatedTarget = t.relatedTarget;
            let t_currentTarget = t.currentTarget;
            let i = i_3(t);
            if (modal && t_relatedTarget == null && i != null && r_2(b, i)) {
                er(i);
            }
            queueMicrotask(()=>{
                let a = T();
                let triggerElements = g.context.triggerElements;
                let u = G();
                let p = t_relatedTarget?.hasAttribute(ct(`focus-guard`)) && [
                    zRef.current,
                    BRef.current,
                    N?.beforeInsideRef.current,
                    N?.afterInsideRef.current,
                    N?.beforeOutsideRef.current,
                    N?.afterOutsideRef.current,
                    Y(previousFocusableElement),
                    Y(nextFocusableElement)
                ].includes(t_relatedTarget);
                let m = !(r_2(domReference, t_relatedTarget) || r_2(b, t_relatedTarget) || r_2(t_relatedTarget, b) || r_2(N?.portalNode, t_relatedTarget) || u.some((e)=>e === t_relatedTarget || r_2(e, t_relatedTarget)) || t_relatedTarget != null && triggerElements.hasElement(t_relatedTarget) || triggerElements.hasMatchingElement((e)=>r_2(e, t_relatedTarget)) || p || M && (lt(M.nodesRef.current, a).find((e)=>r_2(e.context?.elements.floating, t_relatedTarget) || r_2(e.context?.elements.domReference, t_relatedTarget)) || gn(M.nodesRef.current, a).find((e)=>[
                        e.context?.elements.floating,
                        $e(e.context?.elements.floating)
                    ].includes(t_relatedTarget) || e.context?.elements.domReference === t_relatedTarget)));
                if (t_currentTarget === domReference && U) {
                    rr(U);
                }
                if (restoreFocus && t_currentTarget !== domReference && !Ht(i) && n_4(e) === e.body) {
                    if (O(U) && (U.focus(), restoreFocus === `popup`)) {
                        de.request(()=>{
                            U.focus();
                        });
                        return;
                    }
                    let e = W();
                    let t = IRef.current;
                    let n = (t && e.includes(t) ? t : null) || e[e.length - 1] || U;
                    if (O(n)) {
                        n.focus();
                    }
                }
                if (dataRef.current.insideReactTree) {
                    dataRef.current.insideReactTree = false;
                    return;
                }
                if ((E || !modal) && t_relatedTarget && m && !FRef.current && (E || t_relatedTarget !== tr())) {
                    PRef.current = true;
                    g.setOpen(false, t_2(f_2, t));
                }
            });
        }
        function a() {
            if (!seRef.current) {
                dataRef.current.insideReactTree = true;
                le.start(0, ()=>{
                    dataRef.current.insideReactTree = false;
                });
            }
        }
        let u = O(domReference) ? domReference : null;
        if (!(!b && !u)) {
            return et(u && X(u, `focusout`, i), u && X(u, `pointerdown`, t), b && X(b, `focusin`, n), b && X(b, `focusout`, i), b && N && X(b, `focusout`, a, true));
        }
    }, [
        disabled,
        domReference,
        b,
        U,
        modal,
        M,
        N,
        g,
        closeOnFocusOut,
        restoreFocus,
        W,
        E,
        T,
        dataRef,
        le,
        ue,
        de,
        nextFocusableElement,
        previousFocusableElement,
        G
    ]);
    K.useEffect(()=>{
        if (disabled || !b || !_) {
            return;
        }
        let e = Array.from(N?.portalNode?.querySelectorAll(`[${ct(`portal`)}]`) || []);
        let t = (M ? gn(M.nodesRef.current, T()) : []).find((e)=>Ze(e.context?.elements.domReference || null))?.context?.elements.domReference;
        let n = jn([
            b,
            ...e,
            zRef.current,
            BRef.current,
            N?.beforeOutsideRef.current,
            N?.afterOutsideRef.current,
            ...G(),
            t,
            Y(previousFocusableElement),
            Y(nextFocusableElement),
            E ? domReference : null
        ].filter((e)=>e != null), {
            ariaHidden: modal || E,
            mark: false
        });
        let i = jn([
            b,
            ...e
        ].filter((e)=>e != null));
        return ()=>{
            i();
            n();
        };
    }, [
        _,
        disabled,
        domReference,
        b,
        modal,
        N,
        E,
        M,
        T,
        nextFocusableElement,
        previousFocusableElement,
        G
    ]);
    p(()=>{
        if (!_ || disabled || !O(U)) {
            return;
        }
        let e = t_3(U);
        let t = n_4(e);
        queueMicrotask(()=>{
            let ne_current = ne.current;
            let r = typeof ne_current == `function` ? ne_current(j.current || ``) : ne_current;
            if (r === undefined || r === false || r_2(U, t)) {
                return;
            }
            let i = null;
            let a = ()=>{
                i ??= W(U);
                return i[0] || U;
            };
            let o;
            o = r === true || r === null ? a() : Y(r);
            o ||= a();
            let s = r_2(U, n_4(e));
            yn(o, {
                preventScroll: o === U,
                shouldFocus () {
                    if (!oe.current) {
                        return false;
                    }
                    if (s) {
                        return true;
                    }
                    let t = n_4(e);
                    return !(t !== o && r_2(U, t));
                }
            });
        });
    }, [
        disabled,
        _,
        U,
        W,
        ne,
        j,
        oe
    ]);
    p(()=>{
        if (disabled || !U) {
            return;
        }
        let e = t_3(U);
        let t = n_4(e);
        let n = j.current == null;
        er(t);
        function i(e) {
            if (!e.open) {
                LRef.current = Zn(e.nativeEvent, RRef.current);
            }
            if (e.reason === `trigger-hover` && e.nativeEvent.type === `mouseleave`) {
                PRef.current = true;
            }
            if (e.reason === `outside-press`) {
                if (e.nested) {
                    PRef.current = false;
                } else if (Ie(e.nativeEvent) || Le(e.nativeEvent)) {
                    PRef.current = false;
                } else {
                    let e = false;
                    t_3(U).createElement(`div`).focus({
                        get preventScroll () {
                            e = true;
                            return false;
                        }
                    });
                    if (e) {
                        PRef.current = false;
                    } else {
                        PRef.current = true;
                    }
                }
            }
        }
        events.on(`openchange`, i);
        function a() {
            let D_current = D.current;
            let r = typeof D_current == `function` ? D_current(LRef.current) : D_current;
            if (r === undefined || r === false) {
                return null;
            }
            if (r === null) {
                r = true;
            }
            let i = domReference?.isConnected ? domReference : null;
            let a = t?.isConnected && x(t) !== `body` ? t : null;
            let o = n ? a || i : i || a;
            o ||= tr() || null;
            if (typeof r == `boolean`) {
                return o;
            }
            return Y(r) || o || null;
        }
        return ()=>{
            events.off(`openchange`, i);
            let t = n_4(e);
            let n = G();
            let r = r_2(b, t) || n.some((e)=>e === t || r_2(e, t)) || M && lt(M.nodesRef.current, T(), false).some((e)=>r_2(e.context?.elements.floating, t));
            let D_current = D.current;
            let s = a();
            queueMicrotask(()=>{
                let n = nr(s);
                let i = typeof D_current != `boolean`;
                if (D_current && !PRef.current && O(n) && (!(!i && n !== t && t !== e.body) || r)) {
                    n.focus({
                        preventScroll: true
                    });
                }
                PRef.current = false;
            });
        };
    }, [
        disabled,
        b,
        U,
        D,
        j,
        events,
        M,
        domReference,
        T,
        G
    ]);
    p(()=>{
        if (!ge || _ || !b) {
            return;
        }
        let e = n_4(t_3(b));
        if (!(!O(e) || !Zt(e))) {
            if (r_2(b, e)) {
                e.blur();
            }
        }
    }, [
        _,
        b
    ]);
    p(()=>{
        if (!(disabled || !N)) {
            N.setFocusManagerState({
                modal,
                closeOnFocusOut,
                open: _,
                onOpenChange: g.setOpen,
                domReference
            });
            return ()=>{
                N.setFocusManagerState(null);
            };
        }
    }, [
        disabled,
        N,
        modal,
        _,
        g,
        closeOnFocusOut,
        domReference
    ]);
    p(()=>{
        if (!(disabled || !U)) {
            rr(U);
            return ()=>{
                queueMicrotask($n);
            };
        }
    }, [
        disabled,
        U
    ]);
    let fe = !disabled && (modal ? !E : true) && (H || modal);
    return <>{fe && <Ot1 data-type={`inside`} ref={V} onFocus={(e)=>{
        if (modal) {
            let e = W();
            yn(e[e.length - 1]);
        } else {
            if (N?.portalNode) {
                PRef.current = false;
                if (fn(e, N.portalNode)) {
                    ut(domReference)?.focus();
                } else {
                    Y(previousFocusableElement ?? N.beforeOutsideRef)?.focus();
                }
            }
        }
    }}/>}{children}{fe && <Ot1 data-type={`inside`} ref={ce} onFocus={(e)=>{
        if (modal) {
            yn(W()[0]);
        } else {
            if (N?.portalNode) {
                if (closeOnFocusOut) {
                    PRef.current = true;
                }
                if (fn(e, N.portalNode)) {
                    cn(domReference)?.focus();
                } else {
                    Y(nextFocusableElement ?? N.afterOutsideRef)?.focus();
                }
            }
        }
    }}/>}</>;
}
function ar() {
    return false;
}
function or(bubbles) {
    return {
        escapeKey: typeof bubbles == `boolean` ? bubbles : bubbles?.escapeKey ?? false,
        outsidePress: typeof bubbles == `boolean` ? bubbles : bubbles?.outsidePress ?? true
    };
}
function useSr(e, { enabled = true, escapeKey = true, outsidePress = true, outsidePressEvent = `sloppy`, referencePress = ar, bubbles, externalTree } = {}) {
    let p = `rootStore` in e ? e.rootStore : e;
    let m = p.useState(`open`);
    let h = p.useState(`floatingElement`);
    let { dataRef } = p.context;
    let y = useQn(externalTree);
    let b = m_1(typeof outsidePress == `function` ? outsidePress : ()=>false);
    let x = typeof outsidePress == `function` ? b : outsidePress;
    let S = x !== false;
    let C = m_1(()=>outsidePressEvent);
    let { escapeKey: escapeKey_1, outsidePress: outsidePress_1 } = or(bubbles);
    let reRef = K.useRef(false);
    let DRef = K.useRef(false);
    let ORef = K.useRef(false);
    let jRef = K.useRef(false);
    let oeRef = K.useRef(``);
    let MRef = K.useRef(null);
    let N = Ne();
    let P = Ne();
    let F = m_1(()=>{
        P.clear();
        dataRef.current.insideReactTree = false;
    });
    let se = m_1((e)=>{
        let t = dataRef.current.floatingContext?.nodeId;
        return (y ? lt(y.nodesRef.current, t) : []).some((t)=>t.context?.open && !t.context.dataRef.current[e]);
    });
    let I = m_1((e)=>qe(e, p.select(`floatingElement`)) || qe(e, p.select(`domReferenceElement`)));
    let L = m_1((e)=>{
        if (referencePress()) {
            p.setOpen(false, t_2(O_2, e.nativeEvent));
        }
    });
    let onKeyDown = m_1((e)=>{
        if (!m || !enabled || !escapeKey || e.key !== `Escape` || jRef.current || !escapeKey_1 && se(`__escapeKeyBubbles`)) {
            return;
        }
        let t = t_2(d_2, Fe(e) ? e.nativeEvent : e);
        p.setOpen(false, t);
        if (!t.isCanceled) {
            e.preventDefault();
        }
        if (!escapeKey_1 && !t.isPropagationAllowed) {
            e.stopPropagation();
        }
    });
    let z = m_1(()=>{
        dataRef.current.insideReactTree = true;
        P.start(0, F);
    });
    let B = m_1((e)=>{
        if (!m || !enabled || e.button !== 0) {
            return;
        }
        let t = i_3(e.nativeEvent);
        if (r_2(p.select(`floatingElement`), t)) {
            if (!reRef.current) {
                reRef.current = true;
                DRef.current = false;
            }
        }
    });
    let V = m_1((e)=>{
        if (!(!m || !enabled)) {
            if ((e.defaultPrevented || e.nativeEvent.defaultPrevented) && reRef.current) {
                DRef.current = true;
            }
        }
    });
    K.useEffect(()=>{
        if (!m || !enabled) {
            return;
        }
        dataRef.current.__escapeKeyBubbles = escapeKey_1;
        dataRef.current.__outsidePressBubbles = outsidePress_1;
        let e = new sn;
        let t = new sn;
        function i() {
            e.clear();
            jRef.current = true;
        }
        function a() {
            e.start(ge ? 5 : 0, ()=>{
                jRef.current = false;
            });
        }
        function o() {
            ORef.current = true;
            t.start(0, ()=>{
                ORef.current = false;
            });
        }
        function u() {
            reRef.current = false;
            DRef.current = false;
        }
        function f() {
            let oeRef_current = oeRef.current;
            let t = oeRef_current === `pen` || !oeRef_current ? `mouse` : oeRef_current;
            let n = C();
            let r = typeof n == `function` ? n() : n;
            if (typeof r == `string`) {
                return r;
            }
            return r[t];
        }
        function v(e) {
            let t = f();
            return t === `intentional` && e.type !== `click` || t === `sloppy` && e.type === `click`;
        }
        function b(e) {
            let t = dataRef.current.floatingContext?.nodeId;
            let n = y && lt(y.nodesRef.current, t).some((t)=>qe(e, t.context?.elements.floating));
            return I(e) || n;
        }
        function te(e) {
            if (v(e)) {
                if (e.type !== `click` && !I(e)) {
                    t.clear();
                    ORef.current = false;
                }
                F();
                return;
            }
            if (dataRef.current.insideReactTree) {
                F();
                return;
            }
            let n = i_3(e);
            let r = `[${ct(`inert`)}]`;
            let i = D(n) ? n.getRootNode() : null;
            let a = Array.from((M_1(i) ? i : t_3(p.select(`floatingElement`))).querySelectorAll(r));
            let triggerElements = p.context.triggerElements;
            if (n && (triggerElements.hasElement(n) || triggerElements.hasMatchingElement((e)=>r_2(e, n)))) {
                return;
            }
            let u = D(n) ? n : null;
            while(u && !k(u)){
                let e = w(u);
                if (k(e) || !D(e)) {
                    break;
                }
                u = e;
            }
            if (!(a.length && D(n) && !Je(n) && !r_2(n, p.select(`floatingElement`)) && a.every((e)=>!r_2(u, e)))) {
                if (O(n) && !(`touches` in e)) {
                    let t = k(n);
                    let r = _(n);
                    let i = /auto|scroll/;
                    let a = t || i.test(r.overflowX);
                    let o = t || i.test(r.overflowY);
                    let s = a && n.clientWidth > 0 && n.scrollWidth > n.clientWidth;
                    let c = o && n.clientHeight > 0 && n.scrollHeight > n.clientHeight;
                    let l = r.direction === `rtl`;
                    let u = c && (l ? e.offsetX <= n.offsetWidth - n.clientWidth : e.offsetX > n.clientWidth);
                    let f = s && e.offsetY > n.clientHeight;
                    if (u || f) {
                        return;
                    }
                }
                if (!b(e)) {
                    if (f() === `intentional` && ORef.current) {
                        t.clear();
                        ORef.current = false;
                        return;
                    }
                    if (!(typeof x == `function` && !x(e) || se(`__outsidePressBubbles`))) {
                        p.setOpen(false, t_2(C_1, e));
                        F();
                    }
                }
            }
        }
        function ne(e) {
            if (!(f() !== `sloppy` || e.pointerType === `touch` || !p.select(`open`) || !enabled || I(e))) {
                te(e);
            }
        }
        function P(e) {
            if (f() !== `sloppy` || !p.select(`open`) || !enabled || I(e)) {
                return;
            }
            let t = e.touches[0];
            if (t) {
                MRef.current = {
                    startTime: Date.now(),
                    startX: t.clientX,
                    startY: t.clientY,
                    dismissOnTouchEnd: false,
                    dismissOnMouseDown: true
                };
                N.start(1000, ()=>{
                    if (MRef.current) {
                        MRef.current.dismissOnTouchEnd = false;
                        MRef.current.dismissOnMouseDown = false;
                    }
                });
            }
        }
        function L(e, t) {
            let n = i_3(e);
            if (!n) {
                return;
            }
            let r = X(n, e.type, ()=>{
                t(e);
                r();
            });
        }
        function z(e) {
            oeRef.current = `touch`;
            L(e, P);
        }
        function B(e) {
            N.clear();
            if (e.type === `pointerdown`) {
                oeRef.current = e.pointerType;
            }
            if (!(e.type === `mousedown` && MRef.current && !MRef.current.dismissOnMouseDown)) {
                L(e, (e)=>{
                    if (e.type === `pointerdown`) {
                        ne(e);
                    } else {
                        te(e);
                    }
                });
            }
        }
        function V(e) {
            if (!reRef.current) {
                return;
            }
            let DRef_current = DRef.current;
            u();
            if (f() === `intentional`) {
                if (e.type === `pointercancel`) {
                    if (DRef_current) {
                        o();
                    }
                    return;
                }
                if (!b(e)) {
                    if (DRef_current) {
                        o();
                        return;
                    }
                    if (!(typeof x == `function` && !x(e))) {
                        t.clear();
                        ORef.current = true;
                        F();
                    }
                }
            }
        }
        function ce(e) {
            if (f() !== `sloppy` || !MRef.current || I(e)) {
                return;
            }
            let t = e.touches[0];
            if (!t) {
                return;
            }
            let n = Math.abs(t.clientX - MRef.current.startX);
            let r = Math.abs(t.clientY - MRef.current.startY);
            let i = Math.sqrt(n * n + r * r);
            if (i > 5) {
                MRef.current.dismissOnTouchEnd = true;
            }
            if (i > 10) {
                te(e);
                N.clear();
                MRef.current = null;
            }
        }
        function le(e) {
            L(e, ce);
        }
        function ue(e) {
            if (!(f() !== `sloppy` || !MRef.current || I(e))) {
                if (MRef.current.dismissOnTouchEnd) {
                    te(e);
                }
                N.clear();
                MRef.current = null;
            }
        }
        function de(e) {
            L(e, ue);
        }
        let H = t_3(h);
        let U = et(escapeKey && et(X(H, `keydown`, onKeyDown), X(H, `compositionstart`, i), X(H, `compositionend`, a)), S && et(X(H, `click`, B, true), X(H, `pointerdown`, B, true), X(H, `pointerup`, V, true), X(H, `pointercancel`, V, true), X(H, `mousedown`, B, true), X(H, `mouseup`, V, true), X(H, `touchstart`, z, true), X(H, `touchmove`, le, true), X(H, `touchend`, de, true)));
        return ()=>{
            U();
            e.clear();
            t.clear();
            u();
            ORef.current = false;
        };
    }, [
        dataRef,
        h,
        escapeKey,
        S,
        x,
        m,
        enabled,
        escapeKey_1,
        outsidePress_1,
        onKeyDown,
        F,
        C,
        se,
        I,
        y,
        p,
        N
    ]);
    K.useEffect(F, [
        x,
        F
    ]);
    let ce = K.useMemo(()=>({
            onKeyDown,
            onPointerDown: L,
            onClick: L
        }), [
        onKeyDown,
        L
    ]);
    let floating = K.useMemo(()=>({
            onKeyDown,
            onPointerDown: V,
            onMouseDown: V,
            onClickCapture: z,
            onMouseDownCapture (e) {
                z();
                B(e);
            },
            onPointerDownCapture (e) {
                z();
                B(e);
            },
            onMouseUpCapture: z,
            onTouchEndCapture: z,
            onTouchMoveCapture: z
        }), [
        onKeyDown,
        z,
        B,
        V
    ]);
    return K.useMemo(()=>{
        if (enabled) {
            return {
                reference: ce,
                floating,
                trigger: ce
            };
        }
        return {};
    }, [
        enabled,
        ce,
        floating
    ]);
}
function useCr(e) {
    let tRef = K.useRef(true);
    if (tRef.current) {
        tRef.current = false;
        e();
    }
}
function mr(e) {
    return K.forwardRef(pr(e));
}
const gr = o(19) ? yr : br;
function _r(e, t, n, r, i) {
    return gr(e, t, n, r, i);
}
function useVr(store, selector, n, r, i) {
    let a = K.useCallback(()=>selector(store.getSnapshot(), n, r, i), [
        store,
        selector,
        n,
        r,
        i
    ]);
    return Ee.useSyncExternalStore(store.subscribe, a, a);
}
fr({
    before (e) {
        e.syncIndex = 0;
        if (!e.didInitialize) {
            e.syncTick = 1;
            e.syncHooks = [];
            e.didChangeStore = true;
            e.getSnapshot = ()=>{
                let t = false;
                for(let n = 0; n < e.syncHooks.length; n += 1){
                    let syncHook = e.syncHooks[n];
                    let i = syncHook.selector(syncHook.store.state, syncHook.a1, syncHook.a2, syncHook.a3);
                    if (!Object.is(syncHook.value, i)) {
                        t = true;
                        syncHook.value = i;
                    }
                }
                if (t) {
                    e.syncTick += 1;
                }
                return e.syncTick;
            };
        }
    },
    after (e) {
        if (e.syncHooks.length > 0) {
            if (e.didChangeStore) {
                e.didChangeStore = false;
                e.subscribe = (t)=>{
                    let n = new Set;
                    for (let t of e.syncHooks){
                        n.add(t.store);
                    }
                    let r = [];
                    for (let e of n){
                        r.push(e.subscribe(t));
                    }
                    return ()=>{
                        for (let e of r){
                            e();
                        }
                    };
                };
            }
            Ee.useSyncExternalStore(e.subscribe, e.getSnapshot, e.getSnapshot);
        }
    }
});
function yr(store, selector, a1, a2, a3) {
    let a = dr();
    if (!a) {
        return useVr(store, selector, a1, a2, a3);
    }
    let a_syncIndex = a.syncIndex;
    a.syncIndex += 1;
    let s;
    if (a.didInitialize) {
        s = a.syncHooks[a_syncIndex];
        if (s.store !== store || s.selector !== selector || !Object.is(s.a1, a1) || !Object.is(s.a2, a2) || !Object.is(s.a3, a3)) {
            if (s.store !== store) {
                a.didChangeStore = true;
            }
            s.store = store;
            s.selector = selector;
            s.a1 = a1;
            s.a2 = a2;
            s.a3 = a3;
            s.value = selector(store.getSnapshot(), a1, a2, a3);
        }
    } else {
        s = {
            store,
            selector,
            a1,
            a2,
            a3,
            value: selector(store.getSnapshot(), a1, a2, a3)
        };
        a.syncHooks.push(s);
    }
    return s.value;
}
function br(e, t, n, r, i) {
    return De.useSyncExternalStoreWithSelector(e.subscribe, e.getSnapshot, e.getSnapshot, (e)=>t(e, n, r, i));
}
class xr {
    constructor(e){
        this.state = e;
        this.listeners = new Set;
        this.updateTick = 0;
    }
    subscribe = (e)=>{
        this.listeners.add(e);
        return ()=>{
            this.listeners.delete(e);
        };
    };
    getSnapshot = ()=>this.state;
    setState(e) {
        if (this.state === e) {
            return;
        }
        this.state = e;
        this.updateTick += 1;
        let updateTick = this.updateTick;
        for (let n of this.listeners){
            if (updateTick !== this.updateTick) {
                return;
            }
            n(e);
        }
    }
    update(e) {
        for(let t in e){
            if (!Object.is(this.state[t], e[t])) {
                this.setState({
                    ...this.state,
                    ...e
                });
                return;
            }
        }
    }
    set(e, t) {
        if (!Object.is(this.state[e], t)) {
            this.setState({
                ...this.state,
                [e]: t
            });
        }
    }
    notifyAll() {
        let e = {
            ...this.state
        };
        this.setState(e);
    }
    use(e, t, n, r) {
        return _r(this, e, t, n, r);
    }
}
class Sr extends xr {
    constructor(e, t = {}, n){
        super(e);
        this.context = t;
        this.selectors = n;
    }
    useSyncedValue(e, t) {
        K.useDebugValue(e);
        let n = this;
        p(()=>{
            if (n.state[e] !== t) {
                n.set(e, t);
            }
        }, [
            n,
            e,
            t
        ]);
    }
    useSyncedValueWithCleanup(e, t) {
        let n = this;
        p(()=>{
            if (n.state[e] !== t) {
                n.set(e, t);
            }
            return ()=>{
                n.set(e, undefined);
            };
        }, [
            n,
            e,
            t
        ]);
    }
    useSyncedValues(e) {
        let t = this;
        p(()=>{
            t.update(e);
        }, [
            t,
            ...Object.values(e)
        ]);
    }
    useControlledProp(e, t) {
        K.useDebugValue(e);
        let n = this;
        let r = t !== undefined;
        p(()=>{
            if (r && !Object.is(n.state[e], t)) {
                n.setState({
                    ...n.state,
                    [e]: t
                });
            }
        }, [
            n,
            e,
            t,
            r
        ]);
    }
    select(e, t, n, r) {
        let i = this.selectors[e];
        return i(this.state, t, n, r);
    }
    useState(e, t, n, r) {
        K.useDebugValue(e);
        return _r(this, this.selectors[e], t, n, r);
    }
    useContextCallback(e, t) {
        K.useDebugValue(e);
        let n = m_1(t ?? a);
        this.context[e] = n;
    }
    useStateSetter(e) {
        let tRef = K.useRef(undefined);
        if (tRef.current === undefined) {
            tRef.current = (t)=>{
                this.set(e, t);
            };
        }
        return tRef.current;
    }
    observe(e, t) {
        let n;
        n = typeof e == `function` ? e : this.selectors[e];
        let r = n(this.state);
        t(r, r, this);
        return this.subscribe((e)=>{
            let i = n(e);
            if (!Object.is(r, i)) {
                let e = r;
                r = i;
                t(i, e, this);
            }
        });
    }
}
const Cr = {
    open: $((e)=>e.open),
    transitionStatus: $((e)=>e.transitionStatus),
    domReferenceElement: $((e)=>e.domReferenceElement),
    referenceElement: $((e)=>e.positionReference ?? e.referenceElement),
    floatingElement: $((e)=>e.floatingElement),
    floatingId: $((e)=>e.floatingId)
};
class wr extends Sr {
    constructor(e){
        let { syncOnly, nested, onOpenChange, triggerElements, ...rest } = e;
        super({
            ...rest,
            positionReference: rest.referenceElement,
            domReferenceElement: rest.referenceElement
        }, {
            onOpenChange,
            dataRef: {
                current: {}
            },
            events: Hn(),
            nested,
            triggerElements
        }, Cr);
        this.syncOnly = syncOnly;
    }
    syncOpenEvent = (e, t)=>{
        if (!e || !this.state.open || t != null && ze(t)) {
            this.context.dataRef.current.openEvent = e ? t : undefined;
        }
    };
    dispatchOpenChange = (e, t)=>{
        this.syncOpenEvent(e, t.event);
        let n = {
            open: e,
            reason: t.reason,
            nativeEvent: t.event,
            nested: this.context.nested,
            triggerElement: t.trigger
        };
        this.context.events.emit(`openchange`, n);
    };
    setOpen = (e, t)=>{
        if (this.syncOnly) {
            this.context.onOpenChange?.(e, t);
            return;
        }
        this.dispatchOpenChange(e, t);
        this.context.onOpenChange?.(e, t);
    };
}
function useTr({ popupStore, treatPopupAsFloatingElement = false, floatingRootContext, floatingId, nested, onOpenChange }) {
    let c = popupStore.useState(`open`);
    let referenceElement = popupStore.useState(`activeTriggerElement`);
    let floatingElement = popupStore.useState(treatPopupAsFloatingElement ? `popupElement` : `positionerElement`);
    let triggerElements = popupStore.context.triggerElements;
    let onOpenChange_1 = onOpenChange;
    let pRef = K.useRef(null);
    if (floatingRootContext === undefined && pRef.current === null) {
        pRef.current = new wr({
            open: c,
            transitionStatus: undefined,
            referenceElement,
            floatingElement,
            triggerElements,
            onOpenChange: onOpenChange_1,
            floatingId,
            syncOnly: true,
            nested
        });
    }
    let m = floatingRootContext ?? pRef.current;
    popupStore.useSyncedValue(`floatingId`, floatingId);
    p(()=>{
        let e = {
            open: c,
            floatingId,
            referenceElement,
            floatingElement
        };
        if (D(referenceElement)) {
            e.domReferenceElement = referenceElement;
        }
        if (m.state.positionReference === m.state.referenceElement) {
            e.positionReference = referenceElement;
        }
        m.update(e);
    }, [
        c,
        floatingId,
        referenceElement,
        floatingElement,
        m
    ]);
    m.context.onOpenChange = onOpenChange_1;
    m.context.nested = nested;
    return m;
}
const Er = {
    tabIndex: -1,
    [Be]: ``
};
function Dr(e) {
    return (t)=>{
        if (t === `touch`) {
            return e.current;
        }
        return true;
    };
}
function useOr(e, t, treatPopupAsFloatingElement = false) {
    let floatingId = i_2();
    let nested = useKn() != null;
    let aRef = K.useRef(null);
    if (e === undefined && aRef.current === null) {
        aRef.current = t(floatingId, nested);
    }
    let o = e ?? aRef.current;
    useTr({
        popupStore: o,
        treatPopupAsFloatingElement,
        floatingRootContext: o.state.floatingRootContext,
        floatingId,
        nested,
        onOpenChange: o.setOpen
    });
    return {
        store: o,
        internalStore: aRef.current
    };
}
function useKr(e, t) {
    let nRef = K.useRef(null);
    let rRef = K.useRef(null);
    return K.useCallback((i)=>{
        if (e === undefined) {
            return;
        }
        let a = false;
        if (nRef.current !== null) {
            let e = nRef.current;
            let i = rRef.current;
            let o = t.context.triggerElements.getById(e);
            if (i && o === i) {
                t.context.triggerElements.delete(e);
                a = true;
            }
            nRef.current = null;
            rRef.current = null;
        }
        if (i !== null) {
            nRef.current = e;
            rRef.current = i;
            t.context.triggerElements.add(e, i);
            a = true;
        }
        if (a) {
            let e = t.context.triggerElements.size;
            if (t.select(`open`) && t.state.triggerCount !== e) {
                t.set(`triggerCount`, e);
            }
        }
    }, [
        t,
        e
    ]);
}
function Ar(e, t, n, r = false) {
    if (t) {
        e.preventUnmountingOnClose = false;
    } else if (r) {
        e.preventUnmountingOnClose = true;
    }
    let i = n?.id ?? null;
    if (i || t) {
        e.activeTriggerId = i;
        e.activeTriggerElement = n ?? null;
    }
}
function jr(e) {
    let t = false;
    e.preventUnmountOnClose = ()=>{
        t = true;
    };
    return ()=>t;
}
function Mr(e, t, n, r = {}) {
    let n_reason = n.reason;
    let a = n_reason === D_2;
    let o = t && n_reason === `trigger-focus`;
    let s = !t && (n_reason === `trigger-press` || n_reason === `escape-key`);
    let c = jr(n);
    e.context.onOpenChange?.(t, n);
    if (n.isCanceled) {
        return;
    }
    r.onBeforeDispatch?.();
    e.state.floatingRootContext.dispatchOpenChange(t, n);
    let l = ()=>{
        let i = {
            ...r.extraState,
            open: t
        };
        if (o) {
            i.instantType = `focus`;
        } else if (s) {
            i.instantType = `dismiss`;
        } else if (a) {
            i.instantType = undefined;
        }
        Ar(i, t, n.trigger, c());
        e.update(i);
    };
    if (a) {
        Te.flushSync(l);
    } else {
        l();
    }
}
function Nr(e, t, n, activeTriggerId) {
    useCr(()=>{
        if (t === undefined && e.state.open === false && n) {
            e.state = {
                ...e.state,
                open: true,
                activeTriggerId,
                preventUnmountingOnClose: false
            };
        }
    });
}
function usePr(activeTriggerId, t, n, r) {
    let isMountedByThisTrigger = n.useState(`isMountedByTrigger`, activeTriggerId);
    let a = useKr(activeTriggerId, n);
    let registerTrigger = m_1((activeTriggerElement)=>{
        a(activeTriggerElement);
        if (!activeTriggerElement) {
            return;
        }
        let i = n.select(`open`);
        let o = n.select(`activeTriggerId`);
        if (o === activeTriggerId) {
            n.update({
                activeTriggerElement,
                ...i ? r : null
            });
            return;
        }
        if (o == null && i) {
            n.update({
                activeTriggerId,
                activeTriggerElement,
                ...r
            });
        }
    });
    p(()=>{
        if (isMountedByThisTrigger) {
            n.update({
                activeTriggerElement: t.current,
                ...r
            });
        }
    }, [
        isMountedByThisTrigger,
        n,
        t,
        ...Object.values(r)
    ]);
    return {
        registerTrigger,
        isMountedByThisTrigger
    };
}
function useFr(e, { closeOnActiveTriggerUnmount = false } = {}) {
    let r = e.useState(`open`);
    p(()=>{
        if (!r) {
            if (e.state.triggerCount !== 0) {
                e.set(`triggerCount`, 0);
            }
            return;
        }
        let size = e.context.triggerElements.size;
        let i = {};
        if (e.state.triggerCount !== size) {
            i.triggerCount = size;
        }
        let a = e.select(`activeTriggerId`);
        let o = null;
        if (a) {
            let t = e.context.triggerElements.getById(a);
            if (t) {
                if (t !== e.state.activeTriggerElement) {
                    i.activeTriggerElement = t;
                }
            } else {
                o = a;
            }
        }
        if (!o && !a && size === 1) {
            let t = e.context.triggerElements.entries().next();
            if (!t.done) {
                let [e, n] = t.value;
                i.activeTriggerId = e;
                i.activeTriggerElement = n;
            }
        }
        if (i.triggerCount !== undefined || i.activeTriggerId !== undefined || i.activeTriggerElement !== undefined) {
            e.update(i);
        }
        if (o && closeOnActiveTriggerUnmount) {
            queueMicrotask(()=>{
                if (e.select(`open`) && e.select(`activeTriggerId`) === o && !e.context.triggerElements.getById(o)) {
                    let t = t_2(S);
                    e.setOpen(false, t);
                    if (!t.isCanceled) {
                        e.update({
                            activeTriggerId: null,
                            activeTriggerElement: null
                        });
                    }
                }
            });
        }
    }, [
        r,
        e,
        e.useState(`triggerCount`),
        closeOnActiveTriggerUnmount
    ]);
}
function useIr(e, t, n) {
    let { mounted, setMounted, transitionStatus } = dn(e);
    let o = t.useState(`preventUnmountingOnClose`);
    let preventUnmountingOnClose = e ? false : o;
    t.useSyncedValues({
        mounted,
        transitionStatus,
        preventUnmountingOnClose
    });
    let forceUnmount = m_1(()=>{
        setMounted(false);
        t.update({
            activeTriggerId: null,
            activeTriggerElement: null,
            mounted: false,
            preventUnmountingOnClose: false
        });
        n?.();
        t.context.onOpenChangeComplete?.(false);
    });
    useAe({
        enabled: mounted && !e && !preventUnmountingOnClose,
        open: e,
        ref: t.context.popupRef,
        onComplete () {
            if (!e) {
                forceUnmount();
            }
        }
    });
    return {
        forceUnmount,
        transitionStatus
    };
}
function Lr(e, t) {
    e.useSyncedValues(t);
    p(()=>()=>{
            e.update({
                activeTriggerProps: i,
                inactiveTriggerProps: i,
                popupProps: i
            });
        }, [
        e
    ]);
}
function Rr(e, t) {
    p(()=>{
        if (!t && e.state.openMethod !== null) {
            e.set(`openMethod`, null);
        }
    }, [
        t,
        e
    ]);
    p(()=>()=>{
            if (e.state.openMethod !== null) {
                e.set(`openMethod`, null);
            }
        }, [
        e
    ]);
}
class zr {
    constructor(){
        this.elementsSet = new Set;
        this.idMap = new Map;
    }
    add(e, t) {
        let n = this.idMap.get(e);
        if (n !== t) {
            if (n !== undefined) {
                this.elementsSet.delete(n);
            }
            this.elementsSet.add(t);
            this.idMap.set(e, t);
        }
    }
    delete(e) {
        let t = this.idMap.get(e);
        if (t) {
            this.elementsSet.delete(t);
            this.idMap.delete(e);
        }
    }
    hasElement(e) {
        return this.elementsSet.has(e);
    }
    hasMatchingElement(e) {
        for (let t of this.elementsSet){
            if (e(t)) {
                return true;
            }
        }
        return false;
    }
    getById(e) {
        return this.idMap.get(e);
    }
    entries() {
        return this.idMap.entries();
    }
    elements() {
        return this.elementsSet.values();
    }
    get size() {
        return this.idMap.size;
    }
}
function Br() {
    return new wr({
        open: false,
        transitionStatus: undefined,
        floatingElement: null,
        referenceElement: null,
        triggerElements: new zr,
        floatingId: undefined,
        syncOnly: false,
        nested: false,
        onOpenChange: undefined
    });
}
function Vr() {
    return {
        open: false,
        openProp: undefined,
        mounted: false,
        transitionStatus: undefined,
        floatingRootContext: Br(),
        floatingId: undefined,
        triggerCount: 0,
        preventUnmountingOnClose: false,
        payload: undefined,
        activeTriggerId: null,
        activeTriggerElement: null,
        triggerIdProp: undefined,
        popupElement: null,
        positionerElement: null,
        activeTriggerProps: i,
        inactiveTriggerProps: i,
        popupProps: i
    };
}
function Hr(triggerElements, floatingId, nested = false) {
    return new wr({
        open: false,
        transitionStatus: undefined,
        floatingElement: null,
        referenceElement: null,
        triggerElements,
        floatingId,
        syncOnly: true,
        nested,
        onOpenChange: undefined
    });
}
function hi(e) {
    if (o(19)) {
        return e;
    }
    if (e) {
        return `true`;
    }
}
const gi = K.forwardRef(function({ cutout, ...rest }, t) {
    let clipPath;
    if (cutout) {
        let e = cutout.getBoundingClientRect();
        clipPath = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${e.left}px ${e.top}px,${e.left}px ${e.bottom}px,${e.right}px ${e.bottom}px,${e.right}px ${e.top}px,${e.left}px ${e.top}px)`;
    }
    return <div ref={t} role={`presentation`} data-base-ui-inert={``} {...rest} style={{
        position: `fixed`,
        inset: 0,
        userSelect: `none`,
        WebkitUserSelect: `none`,
        clipPath
    }}/>;
});
let _i = {};
let vi = {};
let yi = ``;
function bi(e) {
    if (typeof document > `u`) {
        return false;
    }
    let t = t_3(e);
    return T(t).innerWidth - t.documentElement.clientWidth > 0;
}
function xi(e) {
    if (!(typeof CSS < `u` && CSS.supports && CSS.supports(`scrollbar-gutter`, `stable`)) || typeof document > `u`) {
        return false;
    }
    let t = t_3(e);
    let t_documentElement = t.documentElement;
    let t_body = t.body;
    let i = j(t_documentElement) ? t_documentElement : t_body;
    let overflowY = i.style.overflowY;
    let scrollbarGutter = t_documentElement.style.scrollbarGutter;
    t_documentElement.style.scrollbarGutter = `stable`;
    i.style.overflowY = `scroll`;
    let i_offsetWidth = i.offsetWidth;
    i.style.overflowY = `hidden`;
    let i_offsetWidth_1 = i.offsetWidth;
    i.style.overflowY = overflowY;
    t_documentElement.style.scrollbarGutter = scrollbarGutter;
    return i_offsetWidth === i_offsetWidth_1;
}
function Si(e) {
    let t = t_3(e);
    let t_documentElement = t.documentElement;
    let t_body = t.body;
    let i = j(t_documentElement) ? t_documentElement : t_body;
    let a = {
        overflowY: i.style.overflowY,
        overflowX: i.style.overflowX
    };
    Object.assign(i.style, {
        overflowY: `hidden`,
        overflowX: `hidden`
    });
    return ()=>{
        Object.assign(i.style, a);
    };
}
function Ci(e) {
    let t = t_3(e);
    let t_documentElement = t.documentElement;
    let t_body = t.body;
    let i = T(t_documentElement);
    let a = 0;
    let o = 0;
    let s = false;
    let c = q.create();
    if (ge && (i.visualViewport?.scale ?? 1) !== 1) {
        return ()=>{};
    }
    function l() {
        let t = i.getComputedStyle(t_documentElement);
        let c = i.getComputedStyle(t_body);
        let scrollbarGutter = (t.scrollbarGutter || ``).includes(`both-edges`) ? `stable both-edges` : `stable`;
        a = t_documentElement.scrollTop;
        o = t_documentElement.scrollLeft;
        _i = {
            scrollbarGutter: t_documentElement.style.scrollbarGutter,
            overflowY: t_documentElement.style.overflowY,
            overflowX: t_documentElement.style.overflowX
        };
        yi = t_documentElement.style.scrollBehavior;
        vi = {
            position: t_body.style.position,
            height: t_body.style.height,
            width: t_body.style.width,
            boxSizing: t_body.style.boxSizing,
            overflowY: t_body.style.overflowY,
            overflowX: t_body.style.overflowX,
            scrollBehavior: t_body.style.scrollBehavior
        };
        let u = t_documentElement.scrollHeight > t_documentElement.clientHeight;
        let d = t_documentElement.scrollWidth > t_documentElement.clientWidth;
        let f = t.overflowY === `scroll` || c.overflowY === `scroll`;
        let p = t.overflowX === `scroll` || c.overflowX === `scroll`;
        let m = Math.max(0, i.innerWidth - t_body.clientWidth);
        let h = Math.max(0, i.innerHeight - t_body.clientHeight);
        let _ = parseFloat(c.marginTop) + parseFloat(c.marginBottom);
        let v = parseFloat(c.marginLeft) + parseFloat(c.marginRight);
        let y = j(t_documentElement) ? t_documentElement : t_body;
        s = xi(e);
        if (s) {
            t_documentElement.style.scrollbarGutter = scrollbarGutter;
            y.style.overflowY = `hidden`;
            y.style.overflowX = `hidden`;
            return;
        }
        Object.assign(t_documentElement.style, {
            scrollbarGutter,
            overflowY: `hidden`,
            overflowX: `hidden`
        });
        if (u || f) {
            t_documentElement.style.overflowY = `scroll`;
        }
        if (d || p) {
            t_documentElement.style.overflowX = `scroll`;
        }
        Object.assign(t_body.style, {
            position: `relative`,
            height: _ || h ? `calc(100dvh - ${_ + h}px)` : `100dvh`,
            width: v || m ? `calc(100vw - ${v + m}px)` : `100vw`,
            boxSizing: `border-box`,
            overflow: `hidden`,
            scrollBehavior: `unset`
        });
        t_body.scrollTop = a;
        t_body.scrollLeft = o;
        t_documentElement.setAttribute(`data-base-ui-scroll-locked`, ``);
        t_documentElement.style.scrollBehavior = `unset`;
    }
    function d() {
        Object.assign(t_documentElement.style, _i);
        Object.assign(t_body.style, vi);
        if (!s) {
            t_documentElement.scrollTop = a;
            t_documentElement.scrollLeft = o;
            t_documentElement.removeAttribute(`data-base-ui-scroll-locked`);
            t_documentElement.style.scrollBehavior = yi;
        }
    }
    function f() {
        d();
        c.request(l);
    }
    l();
    let p = X(i, `resize`, f);
    return ()=>{
        c.cancel();
        d();
        if (typeof i.removeEventListener == `function`) {
            p();
        }
    };
}
const wi = new class {
    lockCount = 0;
    restore = null;
    timeoutLock = sn.create();
    timeoutUnlock = sn.create();
    acquire(e) {
        this.lockCount += 1;
        if (this.lockCount === 1 && this.restore === null) {
            this.timeoutLock.start(0, ()=>this.lock(e));
        }
        return this.release;
    }
    release = ()=>{
        --this.lockCount;
        if (this.lockCount === 0 && this.restore) {
            this.timeoutUnlock.start(0, this.unlock);
        }
    };
    unlock = ()=>{
        if (this.lockCount === 0 && this.restore) {
            this.restore?.();
            this.restore = null;
        }
    };
    lock(e) {
        if (this.lockCount === 0 || this.restore !== null) {
            return;
        }
        let documentElement = t_3(e).documentElement;
        let overflowY = T(documentElement).getComputedStyle(documentElement).overflowY;
        if (overflowY === `hidden` || overflowY === `clip`) {
            this.restore = a;
            return;
        }
        let r = G || !bi(e);
        this.restore = r ? Si(e) : Ci(e);
    }
};
function Ti(e = true, t = null) {
    p(()=>{
        if (e) {
            return wi.acquire(t);
        }
    }, [
        e,
        t
    ]);
}
export { useQn as $, Ge as $t, useFr as A, Sr as B, st as Bt, Jr as C, ht as Ct, jr as D, Mr as E, useOr as F, bt as Ft, $ as G, et as Gt, _r as H, style as Ht, usePr as I, IrComponent as J, Xe as Jt, useCr as K, X as Kt, useKr as L, useIr as M, Lr as N, Nt, Dr as O, Rr as P, gt as Pt, useKn as Q, Qe as Qt, useTr as R, Pt as Rt, Hr as S, Er as T, pr as U, at as Ut, xr as V, Ot1 as Vt, mr as W, tt as Wt, XnComponent as X, Ze as Xt, YnComponent as Y, Ke as Yt, Jn as Z, ii as _, pe as _n, oi as a, Le as an, Pn as at, fi as b, Bt as bt, Yr as c, Ne as cn, ni as d, He as en, Un as et, ri as f, we as fn, ci as g, ge as gn, Rt as gt, ei as h, _e as hn, zt as ht, Xr as i, Ie as in, Nr as j, Ar as k, Ct as kt, si as l, useAe as ln, ti as m, ye as mn, gi as n, We as nn, Zr as o, Pe as on, li as p, xe as pn, fn as pt, useSr as q, $e as qt, hi as r, Re as rn, Nn as rt, Qr as s, yn as st, Ti as t, Ue as tn, Vn as tt, $r as u, ai as v, G as vn, Ht as vt, zr as w, Math_floor as wt, Vr as x, di as y, me as yn, wr as z, Math_round as zt };
