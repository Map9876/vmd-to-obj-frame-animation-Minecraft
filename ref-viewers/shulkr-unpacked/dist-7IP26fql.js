import { X } from "./dist-7IP26fql/chunk_ve.js";
import { n as n_1, s as s_1 } from "./jsx-runtime-Db0DjQYK.js";
import { n } from "./utils-B6KiDbIe.js";
const r = s_1(n_1(), 1);
function i() {
    return typeof window < `u`;
}
function a(e) {
    if (c(e)) {
        return (e.nodeName || ``).toLowerCase();
    }
    return `#document`;
}
function o(e) {
    return e?.ownerDocument?.defaultView || window;
}
function s(e) {
    return ((c(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function c(e) {
    if (i()) {
        return e instanceof Node || e instanceof o(e).Node;
    }
    return false;
}
export function D(e) {
    if (i()) {
        return e instanceof Element || e instanceof o(e).Element;
    }
    return false;
}
export function O(e) {
    if (i()) {
        return e instanceof HTMLElement || e instanceof o(e).HTMLElement;
    }
    return false;
}
function d(e) {
    if (!i() || typeof ShadowRoot > `u`) {
        return false;
    }
    return e instanceof ShadowRoot || e instanceof o(e).ShadowRoot;
}
function f(e) {
    let { overflow, overflowX, overflowY, display } = b(e);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== `inline` && display !== `contents`;
}
function p(e) {
    return /^(table|td|th)$/.test(a(e));
}
function m(e) {
    try {
        if (e.matches(`:popover-open`)) {
            return true;
        }
    } catch  {}
    try {
        return e.matches(`:modal`);
    } catch  {
        return false;
    }
}
const ee = /transform|translate|scale|rotate|perspective|filter/;
const te = /paint|layout|strict|content/;
const h = (e)=>!!e && e !== `none`;
let g;
function _(e) {
    let t = D(e) ? b(e) : e;
    return h(t.transform) || h(t.translate) || h(t.scale) || h(t.rotate) || h(t.perspective) || !v() && (h(t.backdropFilter) || h(t.filter)) || ee.test(t.willChange || ``) || te.test(t.contain || ``);
}
function ne(e) {
    let t = x(e);
    while(O(t) && !y(t)){
        if (_(t)) {
            return t;
        }
        if (m(t)) {
            return null;
        }
        t = x(t);
    }
    return null;
}
function v() {
    g ??= typeof CSS < `u` && CSS.supports && CSS.supports(`-webkit-backdrop-filter`, `none`);
    return g;
}
function y(e) {
    return /^(html|body|#document)$/.test(a(e));
}
function b(e) {
    return o(e).getComputedStyle(e);
}
function re(e) {
    if (D(e)) {
        return {
            scrollLeft: e.scrollLeft,
            scrollTop: e.scrollTop
        };
    }
    return {
        scrollLeft: e.scrollX,
        scrollTop: e.scrollY
    };
}
function x(e) {
    if (a(e) === `html`) {
        return e;
    }
    let t = e.assignedSlot || e.parentNode || d(e) && e.host || s(e);
    if (d(t)) {
        return t.host;
    }
    return t;
}
function S(e) {
    let t = x(e);
    if (y(t)) {
        if (e.ownerDocument) {
            return e.ownerDocument.body;
        }
        return e.body;
    }
    if (O(t) && f(t)) {
        return t;
    }
    return S(t);
}
function C(e, t = [], n = true) {
    let r = S(e);
    let i = r === e.ownerDocument?.body;
    let a = o(r);
    if (i) {
        let e = w(a);
        return t.concat(a, a.visualViewport || [], f(r) ? r : [], e && n ? C(e) : []);
    } else {
        return t.concat(r, C(r, [], n));
    }
}
function w(e) {
    if (e.parent && Object.getPrototypeOf(e.parent)) {
        return e.frameElement;
    }
    return null;
}
const T = {
    ...r
};
const E = {};
function useD(e, t) {
    let nRef = r.useRef(E);
    if (nRef.current === E) {
        nRef.current = e(t);
    }
    return nRef;
}
const T_useInsertionEffect = T.useInsertionEffect;
const ie = T_useInsertionEffect && T_useInsertionEffect !== T.useLayoutEffect ? T_useInsertionEffect : (e)=>e();
function k(e) {
    let current = useD(ae).current;
    current.next = e;
    ie(current.effect);
    return current.trampoline;
}
function ae() {
    let e = {
        next: undefined,
        callback,
        trampoline: (...t)=>e.callback?.(...t),
        effect: ()=>{
            e.callback = e.next;
        }
    };
    return e;
}
function callback() {}
const A = typeof document < `u` ? r.useLayoutEffect : ()=>{};
function j(e, t) {
    if (e && !t) {
        return e;
    }
    if (!e && t) {
        return t;
    }
    if (e || t) {
        return {
            ...e,
            ...t
        };
    }
}
const M = {};
function N(e, t, n, r, i) {
    if (!n && !r && !i && !e) {
        return P(t);
    }
    let a = P(e);
    if (t) {
        a = F(a, t);
    }
    if (n) {
        a = F(a, n);
    }
    if (r) {
        a = F(a, r);
    }
    if (i) {
        a = F(a, i);
    }
    return a;
}
function se(props) {
    if (props.length === 0) {
        return M;
    }
    if (props.length === 1) {
        return P(props[0]);
    }
    let t = P(props[0]);
    for(let n = 1; n < props.length; n += 1){
        t = F(t, props[n]);
    }
    return t;
}
function P(e) {
    if (L(e)) {
        return {
            ...R(e, M)
        };
    }
    return ce(e);
}
function F(e, t) {
    if (L(t)) {
        return R(t, e);
    }
    return le(e, t);
}
function ce(e) {
    let t = {
        ...e
    };
    for(let e in t){
        let n = t[e];
        if (I(e, n)) {
            t[e] = z(n);
        }
    }
    return t;
}
function le(e, t) {
    if (!t) {
        return e;
    }
    for(let n in t){
        let r = t[n];
        switch(n){
            case `style`:
                e[n] = j(e.style, r);
                break;
            case `className`:
                e[n] = V(e.className, r);
                break;
            default:
                if (I(n, r)) {
                    e[n] = ue(e[n], r);
                } else {
                    e[n] = r;
                }
        }
    }
    return e;
}
function I(e, t) {
    let n = e.charCodeAt(0);
    let r = e.charCodeAt(1);
    let i = e.charCodeAt(2);
    return n === 111 && r === 110 && i >= 65 && i <= 90 && (typeof t == `function` || t === undefined);
}
function L(e) {
    return typeof e == `function`;
}
function R(e, t) {
    if (L(e)) {
        return e(t);
    }
    return e ?? M;
}
function ue(e, t) {
    if (t) {
        if (e) {
            return (...n)=>{
                let r = n[0];
                if (H(r)) {
                    let i = r;
                    B(i);
                    let a = t(...n);
                    if (!i.baseUIHandlerPrevented) {
                        e?.(...n);
                    }
                    return a;
                }
                let i = t(...n);
                e?.(...n);
                return i;
            };
        }
        return z(t);
    }
    return e;
}
function z(e) {
    return e && ((...t)=>{
        let n = t[0];
        if (H(n)) {
            B(n);
        }
        return e(...t);
    });
}
function B(e) {
    e.preventBaseUIHandler = ()=>{
        e.baseUIHandlerPrevented = true;
    };
    return e;
}
function V(className, t) {
    if (t) {
        if (className) {
            return t + ` ` + className;
        }
        return t;
    }
    return className;
}
function H(e) {
    return typeof e == `object` && !!e && `nativeEvent` in e;
}
function de(e, t) {
    return function(n, ...r) {
        let i = new URL(e);
        i.searchParams.set(`code`, n.toString());
        r.forEach((e)=>i.searchParams.append(`args[]`, e));
        return `${t} error #${n}; visit ${i} for the full message.`;
    };
}
const U = de(`https://base-ui.com/production-error`, `Base UI`);
const WContext = r.createContext(undefined);
function useG(e = false) {
    let t = r.useContext(WContext);
    if (t === undefined && !e) {
        throw Error(U(16));
    }
    return t;
}
function useFe({ focusableWhenDisabled, disabled, composite = false, tabIndex = 0, isNativeButton }) {
    let s = composite && focusableWhenDisabled !== false;
    let c = composite && focusableWhenDisabled === false;
    return {
        props: r.useMemo(()=>{
            let e = {
                onKeyDown (e) {
                    if (disabled && focusableWhenDisabled && e.key !== `Tab`) {
                        e.preventDefault();
                    }
                }
            };
            if (!composite) {
                e.tabIndex = tabIndex;
                if (!isNativeButton && disabled) {
                    e.tabIndex = focusableWhenDisabled ? tabIndex : -1;
                }
            }
            if (isNativeButton && (focusableWhenDisabled || s) || !isNativeButton && disabled) {
                e[`aria-disabled`] = disabled;
            }
            if (isNativeButton && (!focusableWhenDisabled || c)) {
                e.disabled = disabled;
            }
            return e;
        }, [
            composite,
            disabled,
            focusableWhenDisabled,
            s,
            c,
            isNativeButton,
            tabIndex
        ])
    };
}
function usePe({ disabled = false, focusableWhenDisabled, tabIndex = 0, native = true, composite } = {}) {
    let sRef = r.useRef(null);
    let c = useG(true);
    let composite_1 = composite ?? c !== undefined;
    let { props } = useFe({
        focusableWhenDisabled,
        disabled,
        composite: composite_1,
        tabIndex,
        isNativeButton: native
    });
    let d = r.useCallback(()=>{
        let sRef_current = sRef.current;
        if (K(sRef_current) && composite_1 && disabled && props.disabled === undefined && sRef_current.disabled) {
            sRef_current.disabled = false;
        }
    }, [
        disabled,
        props.disabled,
        composite_1
    ]);
    A(d, [
        d
    ]);
    return {
        getButtonProps: r.useCallback(({ onClick, onMouseDown, onKeyUp, onKeyDown, onPointerDown, ...rest } = {})=>N({
                onClick (e) {
                    if (disabled) {
                        e.preventDefault();
                        return;
                    }
                    onClick?.(e);
                },
                onMouseDown (e) {
                    if (!disabled) {
                        onMouseDown?.(e);
                    }
                },
                onKeyDown (e) {
                    if (disabled || (B(e), onKeyDown?.(e), e.baseUIHandlerPrevented)) {
                        return;
                    }
                    let r = e.target === e.currentTarget;
                    let e_currentTarget = e.currentTarget;
                    let s = K(e_currentTarget);
                    let c = !native && me(e_currentTarget);
                    let u = r && (native ? s : !c);
                    let d = e.key === `Enter`;
                    let f = e.key === ` `;
                    let p = e_currentTarget.getAttribute(`role`);
                    let m = p?.startsWith(`menuitem`) || p === `option` || p === `gridcell`;
                    if (r && composite_1 && f) {
                        if (e.defaultPrevented && m) {
                            return;
                        }
                        e.preventDefault();
                        if (c || native && s) {
                            e_currentTarget.click();
                            e.preventBaseUIHandler();
                        } else if (u) {
                            onClick?.(e);
                            e.preventBaseUIHandler();
                        }
                        return;
                    }
                    if (u) {
                        if (!native && (f || d)) {
                            e.preventDefault();
                        }
                        if (!native && d) {
                            onClick?.(e);
                        }
                    }
                },
                onKeyUp (e) {
                    if (!disabled) {
                        B(e);
                        onKeyUp?.(e);
                        if (e.target === e.currentTarget && native && composite_1 && K(e.currentTarget) && e.key === ` `) {
                            e.preventDefault();
                            return;
                        }
                        if (!e.baseUIHandlerPrevented) {
                            if (e.target === e.currentTarget && !native && !composite_1 && e.key === ` `) {
                                onClick?.(e);
                            }
                        }
                    }
                },
                onPointerDown (e) {
                    if (disabled) {
                        e.preventDefault();
                        return;
                    }
                    onPointerDown?.(e);
                }
            }, native ? {
                type: `button`
            } : {
                role: `button`
            }, props, rest), [
            disabled,
            props,
            composite_1,
            native
        ]),
        buttonRef: k((e)=>{
            sRef.current = e;
            d();
        })
    };
}
function K(e) {
    return O(e) && e.tagName === `BUTTON`;
}
function me(e) {
    return !!(e?.tagName === `A` && e?.href);
}
function q(e, t, n, r) {
    let current = useD(J).current;
    if (ge(current, e, t, n, r)) {
        Y(current, [
            e,
            t,
            n,
            r
        ]);
    }
    return current.callback;
}
function he(e) {
    let current = useD(J).current;
    if (_e(current, e)) {
        Y(current, e);
    }
    return current.callback;
}
function J() {
    return {
        callback: null,
        cleanup: null,
        refs: []
    };
}
function ge(e, t, n, r, i) {
    return e.refs[0] !== t || e.refs[1] !== n || e.refs[2] !== r || e.refs[3] !== i;
}
function _e(e, t) {
    return e.refs.length !== t.length || e.refs.some((e, n)=>e !== t[n]);
}
function Y(e, t) {
    e.refs = t;
    if (t.every((e)=>e == null)) {
        e.callback = null;
        return;
    }
    e.callback = (n)=>{
        e.cleanup &&= (e.cleanup(), null);
        if (n != null) {
            let r = Array(t.length).fill(null);
            for(let e = 0; e < t.length; e += 1){
                let i = t[e];
                if (i != null) {
                    switch(typeof i){
                        case `function`:
                            {
                                let t = i(n);
                                if (typeof t == `function`) {
                                    r[e] = t;
                                }
                                break;
                            }
                        case `object`:
                            i.current = n;
                            break;
                        default:
                    }
                }
            }
            e.cleanup = ()=>{
                for(let e = 0; e < t.length; e += 1){
                    let n = t[e];
                    if (n != null) {
                        switch(typeof n){
                            case `function`:
                                {
                                    let t = r[e];
                                    if (typeof t == `function`) {
                                        t();
                                    } else {
                                        n(null);
                                    }
                                    break;
                                }
                            case `object`:
                                n.current = null;
                                break;
                            default:
                        }
                    }
                }
            };
        }
    };
}
function Z(render) {
    if (!r.isValidElement(render)) {
        return null;
    }
    let t = render;
    let t_props = t.props;
    return (X(19) ? t_props?.ref : t.ref) ?? null;
}
function ye() {}
const be = Object.freeze([]);
const Q = Object.freeze({});
function xe(state, stateAttributesMapping) {
    let n = {};
    for(let r in state){
        let i = state[r];
        if (stateAttributesMapping?.hasOwnProperty(r)) {
            let e = stateAttributesMapping[r](i);
            if (e != null) {
                Object.assign(n, e);
            }
            continue;
        }
        if (i === true) {
            n[`data-${r.toLowerCase()}`] = ``;
        } else if (i) {
            n[`data-${r.toLowerCase()}`] = i.toString();
        }
    }
    return n;
}
function Se(className, state) {
    if (typeof className == `function`) {
        return className(state);
    }
    return className;
}
function Ce(style, state) {
    if (typeof style == `function`) {
        return style(state);
    }
    return style;
}
function we(e, t, n = {}) {
    let t_render = t.render;
    let i = Te(t, n);
    if (n.enabled === false) {
        return null;
    }
    return Oe(e, t_render, i, n.state ?? Q);
}
function Te({ className, style, render }, { state = Q, ref, props, stateAttributesMapping, enabled = true } = {}) {
    let u = enabled ? Se(className, state) : undefined;
    let d = enabled ? Ce(style, state) : undefined;
    let f = enabled ? xe(state, stateAttributesMapping) : Q;
    let p = enabled && props ? Ee(props) : undefined;
    let m = enabled ? j(f, p) ?? {} : Q;
    if (typeof document < `u`) {
        if (enabled) {
            if (Array.isArray(ref)) {
                m.ref = he([
                    m.ref,
                    Z(render),
                    ...ref
                ]);
            } else {
                m.ref = q(m.ref, Z(render), ref);
            }
        } else {
            q(null, null);
        }
    }
    if (enabled) {
        if (u !== undefined) {
            m.className = V(m.className, u);
        }
        if (d !== undefined) {
            m.style = j(m.style, d);
        }
        return m;
    }
    return Q;
}
function Ee(props) {
    if (Array.isArray(props)) {
        return se(props);
    }
    return N(undefined, props);
}
const De = Symbol.for(`react.lazy`);
function Oe(e, t, n, i) {
    if (t) {
        if (typeof t == `function`) {
            return t(n, i);
        }
        let e = N(n, t.props);
        e.ref = n.ref;
        let a = t;
        if (a?.$$typeof === De) {
            a = r.Children.toArray(t)[0];
        }
        return r.cloneElement(a, e);
    }
    if (e && typeof e == `string`) {
        return KeComponent(e, n);
    }
    throw Error(U(8));
}
function KeComponent(e, t) {
    if (e === `button`) {
        return <button type={`button`} {...t} key={t.key}/>;
    }
    if (e === `img`) {
        return <img alt={``} {...t} key={t.key}/>;
    }
    return r.createElement(e, t);
}
const Ae = (e)=>{
    if (typeof e == `boolean`) {
        return `${e}`;
    }
    if (e === 0) {
        return `0`;
    }
    return e;
};
const $ = n;
const je = (e, t)=>(n)=>{
        if (t?.variants == null) {
            return $(e, n?.class, n?.className);
        }
        let { variants, defaultVariants } = t;
        let a = Object.keys(variants).map((e)=>{
            let t = n?.[e];
            let a = defaultVariants?.[e];
            if (t === null) {
                return null;
            }
            let o = Ae(t) || Ae(a);
            return variants[e][o];
        });
        let o = n && Object.entries(n).reduce((acc, [n, r])=>{
            if (r !== undefined) {
                acc[n] = r;
            }
            return acc;
        }, {});
        return $(e, a, t?.compoundVariants?.reduce((e, { class: _class, className, ...rest })=>{
            if (Object.entries(rest).every(([t, n])=>{
                if (Array.isArray(n)) {
                    return n.includes({
                        ...defaultVariants,
                        ...o
                    }[t]);
                }
                return ({
                    ...defaultVariants,
                    ...o
                })[t] === n;
            })) {
                return [
                    ...e,
                    _class,
                    className
                ];
            }
            return e;
        }, []), n?.class, n?.className);
    };
export { c as A, C, _ as E, v as F, d as M, p as N, m as P, re as S, o as T, b as _, ye as a, w as b, usePe as c, U as d, N as f, T as g, useD as h, Q as i, f as j, y as k, WContext as l, k as m, we as n, X as o, A as p, be as r, q as s, je as t, useG as u, ne as v, x as w, a as x, s as y };
