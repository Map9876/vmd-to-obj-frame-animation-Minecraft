import { N, xe } from "./kbd-DcmZ5JzD/chunk_xe.js";
import { De, H } from "./kbd-DcmZ5JzD/chunk_De.js";
import { Oe } from "./kbd-DcmZ5JzD/chunk_Oe.js";
import { n, s, t } from "./jsx-runtime-Db0DjQYK.js";
import { r } from "./useStore-DX_rDZVw.js";
import { t as t_2 } from "./utils-B6KiDbIe.js";
import { D as D_1, T, a, d, f, m, n as n_2, p, s as s_2 } from "./dist-7IP26fql.js";
import { Ht, Kt, Qt, Wt, c, fn, h, i, l, m as m_2, o, s as s_3, u } from "./useScrollLock-B98zsivK.js";
import { h as h_2, n as n_3, r as r_1, t as t_3, y } from "./createBaseUIEventDetails-Df69IYx-.js";
import { i as i_2, n as n_4, r as r_2, t as t_4 } from "./owner-Bmp_Sgwo.js";
import { Jn, Ln, On, Pn, Zn } from "./index-DmN1rqCo.js";
import { n as n_5, t as t_5 } from "./clamp-D2lSjr8C.js";
import { i as i_3, l as l_2, n as n_6, r as r_3, s as s_4, t as t_6 } from "./useRegisterFieldControl-DiRFoMvR.js";
import { i as i_4, n as n_7, r as r_4, t as t_7 } from "./stringifyLocale-DBC8-l-E.js";
const M = s(n(), 1);
function Se(e, step, minStepsBetweenValues) {
    if (!Array.isArray(e)) {
        return true;
    }
    let r = e.reduce((acc, item, index, r)=>{
        if (index !== r.length - 1) {
            acc.push(Math.abs(item - r[index + 1]));
        }
        return acc;
    }, []);
    return Math.min(...r) >= step * minStepsBetweenValues;
}
const stateAttributesMapping = {
    activeThumbIndex: ()=>null,
    max: ()=>null,
    min: ()=>null,
    minStepsBetweenValues: ()=>null,
    step: ()=>null,
    values: ()=>null,
    ...l_2
};
const FContext = M.createContext(undefined);
function useWe() {
    let e = M.useContext(FContext);
    if (e === undefined) {
        throw Error(d(62));
    }
    return e;
}
const I = t();
function L(e) {
    if (`key` in e) {
        return y;
    }
    return h_2;
}
function Te(e, t) {
    if (typeof e == `number` && typeof t == `number`) {
        return e === t;
    }
    if (Array.isArray(e) && Array.isArray(t)) {
        return i_4(e, t);
    }
    return false;
}
const R = M.forwardRef(function(e, t) {
    let { "aria-labelledby": aria_labelledby, className, defaultValue, disabled = false, id, format, largeStep = 10, locale, render, max = 100, min = 0, minStepsBetweenValues = 0, form, name, onValueChange, onValueCommitted, orientation = `horizontal`, step = 1, thumbCollisionBehavior = `push`, thumbAlignment = `center`, value, style, ...rest } = e;
    let id_1 = r_1(id);
    let rootLabelId = n_7(id_1);
    let pe = m(onValueChange);
    let onValueCommitted_1 = m(onValueCommitted);
    let { clearErrors } = i_3();
    let { state, disabled: disabled_1, name: name_1, setTouched, setDirty, validityData, validation } = s_4();
    let { labelId } = r_3();
    let [Ee, setEe] = M.useState();
    let labelId_1 = aria_labelledby ?? r_4(labelId, Ee);
    let U = disabled_1 || disabled;
    let Oe = name_1 ?? name;
    let [W, ke] = Zn({
        controlled: value,
        default: defaultValue ?? min,
        name: `Slider`
    });
    let GRef = M.useRef(null);
    let KRef = M.useRef(null);
    let qRef = M.useRef([]);
    let JRef = M.useRef(null);
    let AeRef = M.useRef(null);
    let jeRef = M.useRef(-1);
    let YRef = M.useRef(null);
    let MeRef = M.useRef(`none`);
    let formatOptionsRef = Wt(format);
    let [Pe, setPe] = M.useState(-1);
    let [Ie, setIe] = M.useState(-1);
    let [X, setX] = M.useState(false);
    let [Re, setRe] = M.useState(()=>new Map);
    let [Be, setBe] = M.useState([
        undefined,
        undefined
    ]);
    let setActive = m((e)=>{
        setPe(e);
        if (e !== -1) {
            setIe(e);
        }
    });
    t_6(validation.inputRef, id_1, W, undefined, !U, name);
    On(W, ()=>{
        clearErrors(Oe);
        validation.change(W);
        let validityData_initialValue = validityData.initialValue;
        let t;
        t = Array.isArray(W) && Array.isArray(validityData_initialValue) ? !i_4(W, validityData_initialValue) : W !== validityData_initialValue;
        setDirty(t);
    });
    let registerFieldControlRef = m((e)=>{
        if (e) {
            KRef.current = e;
        }
    });
    let Ue = Array.isArray(W);
    let values = M.useMemo(()=>{
        if (Ue) {
            return W.slice().sort(N);
        }
        return [
            t_5(W, min, max)
        ];
    }, [
        max,
        min,
        Ue,
        W
    ]);
    let setValue = m((e, t)=>{
        if (Number.isNaN(e) || Te(e, W)) {
            return false;
        }
        let n = t ?? t_3(`none`, undefined, undefined, {
            activeThumbIndex: -1
        });
        let n_event = n.event;
        let i = new (n_event.constructor ?? Event)(n_event.type, n_event);
        Object.defineProperty(i, "target", {
            writable: true,
            value: {
                value: e,
                name: Oe
            }
        });
        n.event = i;
        pe(e, n);
        if (n.isCanceled) {
            return false;
        }
        MeRef.current = n.reason;
        ke(e);
        return true;
    });
    let handleInputChange = m((e, activeThumbIndex, n)=>{
        let r = xe(e, activeThumbIndex, min, max, Ue, values);
        if (Se(r, step, minStepsBetweenValues)) {
            let e = L(n);
            let i = setValue(r, t_3(e, n.nativeEvent, undefined, {
                activeThumbIndex
            }));
            setTouched(true);
            if (i) {
                onValueCommitted_1(r, n_3(e, n.nativeEvent));
            }
        }
    });
    p(()=>{
        let e = n_4(t_4(GRef.current));
        if (U && r_2(GRef.current, e)) {
            e.blur();
        }
    }, [
        U
    ]);
    if (U && Pe !== -1) {
        setActive(-1);
    }
    let state_1 = M.useMemo(()=>({
            ...state,
            activeThumbIndex: Pe,
            disabled: U,
            dragging: X,
            orientation,
            max,
            min,
            minStepsBetweenValues,
            step,
            values
        }), [
        state,
        Pe,
        U,
        X,
        max,
        min,
        minStepsBetweenValues,
        orientation,
        step,
        values
    ]);
    let value_1 = M.useMemo(()=>({
            active: Pe,
            controlRef: KRef,
            disabled: U,
            dragging: X,
            validation,
            formatOptionsRef,
            handleInputChange,
            indicatorPosition: Be,
            inset: thumbAlignment !== `center`,
            labelId: labelId_1,
            rootLabelId,
            largeStep,
            lastUsedThumbIndex: Ie,
            lastChangeReasonRef: MeRef,
            form,
            locale,
            max,
            min,
            minStepsBetweenValues,
            name: Oe,
            onValueCommitted: onValueCommitted_1,
            orientation,
            pressedInputRef: JRef,
            pressedThumbCenterOffsetRef: AeRef,
            pressedThumbIndexRef: jeRef,
            pressedValuesRef: YRef,
            registerFieldControlRef,
            renderBeforeHydration: thumbAlignment === `edge`,
            setActive,
            setDragging: setX,
            setIndicatorPosition: setBe,
            setLabelId: setEe,
            setValue,
            state: state_1,
            step,
            thumbCollisionBehavior,
            thumbMap: Re,
            thumbRefs: qRef,
            values
        }), [
        Pe,
        KRef,
        labelId_1,
        rootLabelId,
        U,
        X,
        validation,
        formatOptionsRef,
        handleInputChange,
        Be,
        largeStep,
        Ie,
        MeRef,
        form,
        locale,
        max,
        min,
        minStepsBetweenValues,
        Oe,
        onValueCommitted_1,
        orientation,
        JRef,
        AeRef,
        jeRef,
        YRef,
        registerFieldControlRef,
        setActive,
        setX,
        setBe,
        setEe,
        setValue,
        state_1,
        step,
        thumbCollisionBehavior,
        thumbAlignment,
        Re,
        qRef,
        values
    ]);
    let Je = n_2(`div`, e, {
        state: state_1,
        ref: [
            t,
            GRef
        ],
        props: [
            {
                "aria-labelledby": labelId_1,
                id: id_1,
                role: `group`
            },
            rest,
            (e)=>validation.getValidationProps(U, e)
        ],
        stateAttributesMapping
    });
    return <FContext.Provider value={value_1}><Pn elementsRef={qRef} onMapChange={setRe}>{Je}</Pn></FContext.Provider>;
});
const z = new Map;
function B(e, options) {
    let n = JSON.stringify({
        locale: t_7(e),
        options
    });
    let r = z.get(n);
    if (r) {
        return r;
    }
    let i = new Intl.NumberFormat(e, options);
    z.set(n, i);
    return i;
}
function V(e, locale, n) {
    if (e == null) {
        return ``;
    }
    return B(locale, n).format(e);
}
function Ee(e) {
    let t = e.getBoundingClientRect();
    return {
        x: (t.left + t.right) / 2,
        y: (t.top + t.bottom) / 2
    };
}
const W = 2;
function ke(e, t) {
    if (!e) {
        return {
            start: 0,
            end: 0
        };
    }
    function n(e) {
        let t = e == null ? 0 : parseFloat(e);
        if (Number.isNaN(t)) {
            return 0;
        }
        return t;
    }
    let r = t ? `Top` : `InlineStart`;
    let i = t ? `Bottom` : `InlineEnd`;
    return {
        start: n(e[`border${r}Width`]) + n(e[`padding${r}`]),
        end: n(e[`border${i}Width`]) + n(e[`padding${i}`])
    };
}
function G(e, kRef) {
    if (kRef.current != null && e.changedTouches) {
        let n = e;
        for(let e = 0; e < n.changedTouches.length; e += 1){
            let changedTouch = n.changedTouches[e];
            if (changedTouch.identifier === kRef.current) {
                return {
                    x: changedTouch.clientX,
                    y: changedTouch.clientY
                };
            }
        }
        return null;
    }
    return {
        x: e.clientX,
        y: e.clientY
    };
}
const K = M.forwardRef(function(e, t) {
    let { render, className, style, ...rest } = e;
    let { disabled, dragging, inset, lastChangeReasonRef, max, min, minStepsBetweenValues, onValueCommitted, orientation, pressedInputRef, pressedThumbCenterOffsetRef, pressedThumbIndexRef, pressedValuesRef, registerFieldControlRef, renderBeforeHydration, setActive, setDragging, setValue, state, step, thumbCollisionBehavior, thumbRefs, values } = useWe();
    let _e = Ln();
    let ve = values.length > 1;
    let D = orientation === `vertical`;
    let ORef = M.useRef(null);
    let yeRef = M.useRef(null);
    let be = m((e)=>{
        if (e && yeRef.current == null) {
            yeRef.current = T(e).getComputedStyle(e);
        }
    });
    let kRef = M.useRef(null);
    let ARef = M.useRef(0);
    let jRef = M.useRef(0);
    let NRef = M.useRef(null);
    let P = Wt(values);
    function xe(e) {
        if (pressedThumbIndexRef.current !== e) {
            pressedThumbIndexRef.current = e;
        }
        let t = thumbRefs.current[e];
        if (!t) {
            pressedThumbCenterOffsetRef.current = null;
            pressedInputRef.current = null;
            return;
        }
        pressedInputRef.current = t.querySelector(`input[type="range"]`);
    }
    function F() {
        pressedThumbIndexRef.current = -1;
        pressedThumbCenterOffsetRef.current = null;
        pressedInputRef.current = null;
    }
    function I(e) {
        if (D_1(e)) {
            return thumbRefs.current.some((t)=>{
                if (!D_1(t) || !r_2(t, e)) {
                    return false;
                }
                return t.querySelector(`input[type="range"]`)?.disabled === true;
            });
        }
        return false;
    }
    function L(e) {
        let ORef_current = ORef.current;
        let pressedThumbIndexRef_current = pressedThumbIndexRef.current;
        if (!ORef_current || !ve && (pressedThumbIndexRef_current < 0 || pressedThumbIndexRef_current >= values.length)) {
            return null;
        }
        let { width, height, bottom, left, right } = ORef_current.getBoundingClientRect();
        let c = ke(yeRef.current, D);
        let jRef_current = jRef.current;
        let u = (D ? height : width) - c.start - c.end - jRef_current * 2;
        let d = pressedThumbCenterOffsetRef.current ?? 0;
        let f = e.x - d;
        let p = e.y - d;
        let h = t_5(((D ? bottom - p - c.end : (_e === `rtl` ? right - f : f - left) - c.start) - jRef_current) / u, 0, 1);
        let _ = (max - min) * h + min;
        _ = De(_, step, min);
        _ = t_5(_, min, max);
        if (ve) {
            if (pressedThumbIndexRef_current < 0) {
                return null;
            }
            return Oe({
                behavior: thumbCollisionBehavior,
                values,
                currentValues: P.current ?? values,
                initialValues: pressedValuesRef.current,
                pressedIndex: pressedThumbIndexRef_current,
                nextValue: _,
                min,
                max,
                step,
                minStepsBetweenValues
            });
        }
        return {
            value: _,
            thumbIndex: pressedThumbIndexRef_current,
            didSwap: false
        };
    }
    function Te(e) {
        pressedValuesRef.current = ve ? values.slice() : null;
        NRef.current = null;
        P.current = values;
        let pressedThumbIndexRef_current = pressedThumbIndexRef.current;
        let n = pressedThumbIndexRef_current;
        if (pressedThumbIndexRef_current > -1 && pressedThumbIndexRef_current < values.length) {
            if (values[pressedThumbIndexRef_current] === max) {
                let e = pressedThumbIndexRef_current;
                while(e > 0 && values[e - 1] === max){
                    --e;
                }
                n = e;
            }
        } else {
            let t = D ? `y` : `x`;
            let r;
            n = -1;
            for(let i = 0; i < thumbRefs.current.length; i += 1){
                let o = thumbRefs.current[i];
                if (D_1(o) && !o.querySelector(`input[type="range"]`)?.disabled) {
                    let a = Ee(o);
                    let s = Math.abs(e[t] - a[t]);
                    if (r === undefined || s <= r) {
                        n = i;
                        r = s;
                    }
                }
            }
        }
        if (n > -1 && n !== pressedThumbIndexRef_current) {
            xe(n);
        }
        if (inset) {
            let e = thumbRefs.current[n];
            if (D_1(e)) {
                jRef.current = e.getBoundingClientRect()[D ? `height` : `width`] / 2;
            }
        }
    }
    function R(thumbIndex) {
        let t = thumbRefs.current?.[thumbIndex]?.querySelector(`input[type="range"]`);
        if (t) {
            t.focus({
                preventScroll: true,
                focusVisible: false
            });
        }
    }
    function z(e, t, n) {
        let r = setValue(e.value, t_3(t, n, undefined, {
            activeThumbIndex: e.thumbIndex
        }));
        if (r) {
            NRef.current = e.value;
            P.current = Array.isArray(e.value) ? e.value : [
                e.value
            ];
            if (e.didSwap) {
                xe(e.thumbIndex);
            }
        }
        return r;
    }
    let B = m((e)=>{
        let t = G(e, kRef);
        if (t == null) {
            return;
        }
        ARef.current += 1;
        if (e.type === `pointermove` && e.buttons === 0) {
            V(e);
            return;
        }
        let n = L(t);
        if (n != null && Se(n.value, step, minStepsBetweenValues)) {
            if (!dragging && ARef.current > W) {
                setDragging(true);
            }
            if (z(n, `drag`, e) && n.didSwap) {
                R(n.thumbIndex);
            }
        }
    });
    let V = m((e)=>{
        setActive(-1);
        setDragging(false);
        pressedInputRef.current = null;
        pressedThumbCenterOffsetRef.current = null;
        if (NRef.current != null) {
            let t = lastChangeReasonRef.current;
            onValueCommitted(NRef.current, n_3(t, e));
        }
        if (`pointerType` in e && ORef.current?.hasPointerCapture(e.pointerId)) {
            ORef.current?.releasePointerCapture(e.pointerId);
        }
        pressedThumbIndexRef.current = -1;
        kRef.current = null;
        pressedValuesRef.current = null;
        NRef.current = null;
        U();
    });
    let H = m((e)=>{
        if (disabled) {
            return;
        }
        if (I(i_2(e))) {
            F();
            return;
        }
        let t = e.changedTouches[0];
        if (t != null) {
            kRef.current = t.identifier;
        }
        let n = G(e, kRef);
        if (n != null) {
            Te(n);
            let t = L(n);
            if (t == null) {
                return;
            }
            R(t.thumbIndex);
            if (z(t, `track-press`, e) && t.didSwap) {
                R(t.thumbIndex);
            }
        }
        ARef.current = 0;
        let r = t_4(ORef.current);
        r.addEventListener(`touchmove`, B, {
            passive: true
        });
        r.addEventListener(`touchend`, V, {
            passive: true
        });
    });
    let U = m(()=>{
        let e = t_4(ORef.current);
        e.removeEventListener(`pointermove`, B);
        e.removeEventListener(`pointerup`, V);
        e.removeEventListener(`touchmove`, B);
        e.removeEventListener(`touchend`, V);
        pressedValuesRef.current = null;
        NRef.current = null;
    });
    let K = fn();
    M.useEffect(()=>{
        let ORef_current = ORef.current;
        if (!ORef_current) {
            return ()=>U();
        }
        let t = Kt(ORef_current, `touchstart`, H, {
            passive: true
        });
        return ()=>{
            t();
            K.cancel();
            U();
        };
    }, [
        U,
        H,
        ORef,
        K
    ]);
    M.useEffect(()=>{
        if (disabled) {
            U();
        }
    }, [
        disabled,
        U
    ]);
    return n_2(`div`, e, {
        state,
        ref: [
            t,
            registerFieldControlRef,
            ORef,
            be
        ],
        props: [
            {
                "data-base-ui-slider-control": renderBeforeHydration ? `` : undefined,
                onPointerDown (e) {
                    let ORef_current = ORef.current;
                    let n = i_2(e.nativeEvent);
                    if (!ORef_current || disabled || e.defaultPrevented || !D_1(n) || e.button !== 0) {
                        return;
                    }
                    if (I(n)) {
                        F();
                        return;
                    }
                    let r = G(e, kRef);
                    if (r != null) {
                        Te(r);
                        let n = L(r);
                        if (n == null) {
                            return;
                        }
                        if (r_2(thumbRefs.current[n.thumbIndex], n_4(t_4(ORef_current)))) {
                            e.preventDefault();
                        } else {
                            K.request(()=>{
                                R(n.thumbIndex);
                            });
                        }
                        setDragging(true);
                        if (pressedThumbCenterOffsetRef.current == null && z(n, `track-press`, e.nativeEvent) && n.didSwap) {
                            R(n.thumbIndex);
                        }
                    }
                    if (e.nativeEvent.pointerId) {
                        ORef_current.setPointerCapture(e.nativeEvent.pointerId);
                    }
                    ARef.current = 0;
                    let i = t_4(ORef.current);
                    i.addEventListener(`pointermove`, B, {
                        passive: true
                    });
                    i.addEventListener(`pointerup`, V, {
                        once: true
                    });
                }
            },
            rest
        ],
        stateAttributesMapping
    });
});
const Q1 = M.forwardRef(function(e, t) {
    let { render, className, style, ...rest } = e;
    let { state } = useWe();
    return n_2(`div`, e, {
        state,
        ref: t,
        props: [
            {
                style: {
                    position: `relative`
                }
            },
            rest
        ],
        stateAttributesMapping
    });
});
const J = r();
function Ae() {
    return a;
}
function je() {
    return false;
}
function Y() {
    return true;
}
function useMe() {
    return J.useSyncExternalStore(Ae, je, Y);
}
function Ne(e, min, max) {
    return (e - min) * 100 / (max - min);
}
const Pe = ((e)=>{
    e.index = `data-index`;
    e.dragging = `data-dragging`;
    e.orientation = `data-orientation`;
    e.disabled = `data-disabled`;
    e.valid = `data-valid`;
    e.invalid = `data-invalid`;
    e.touched = `data-touched`;
    e.dirty = `data-dirty`;
    e.focused = `data-focused`;
    return e;
})({});
const Fe = new Set([
    ...l,
    h,
    m_2
]);
function Ie(values, t, n, locale) {
    if (!(t < 0)) {
        if (values.length === 2) {
            if (t === 0) {
                return `${V(values[t], locale, n)} start range`;
            }
            return `${V(values[t], locale, n)} end range`;
        }
        if (n) {
            return V(values[t], locale, n);
        }
        return undefined;
    }
}
function Le(e, t, n, min, max) {
    let a = n === 1 ? e + t : e - t;
    return t_5(Number(a.toFixed(Math.max(H(e), H(t), H(min)))), min, max);
}
const X = M.forwardRef(function(e, t) {
    let { render, children, className, "aria-describedby": aria_describedby, "aria-label": aria_label, "aria-labelledby": aria_labelledby, "aria-valuetext": aria_valuetext, disabled = false, getAriaLabel, getAriaValueText, id, index, inputRef, onBlur, onFocus, onKeyDown, tabIndex, style, ...rest } = e;
    let { nonce } = n_5();
    let id_1 = r_1(id);
    let { active, lastUsedThumbIndex, controlRef, disabled: disabled_1, validation, formatOptionsRef, handleInputChange, inset, labelId, largeStep, locale, max, min, minStepsBetweenValues, form, name, orientation, pressedInputRef, pressedThumbCenterOffsetRef, pressedThumbIndexRef, renderBeforeHydration, setActive, setIndicatorPosition, state, step, values } = useWe();
    let Ae = Ln();
    let je = disabled || disabled_1;
    let Y = values.length > 1;
    let X = orientation === `vertical`;
    let Z = Ae === `rtl`;
    let { setTouched, setFocused, validationMode } = s_4();
    let QRef = M.useRef(null);
    let VeRef = M.useRef(null);
    let HeRef = M.useRef(false);
    let Ue = r_1();
    let We = n_6();
    let Ge = Y ? Ue : We;
    let { ref, index: index_1 } = Jn({
        metadata: M.useMemo(()=>({
                inputId: Ge
            }), [
            Ge
        ])
    });
    let $ = Y ? index ?? index_1 : 0;
    let Je = $ === values.length - 1;
    let Ye = values[$];
    let Xe = Ne(Ye, min, max);
    let [Ze, setZe] = M.useState();
    let $e = useMe();
    let et = lastUsedThumbIndex >= 0 && lastUsedThumbIndex < values.length ? lastUsedThumbIndex : -1;
    let tt = m(()=>{
        let controlRef_current = controlRef.current;
        let QRef_current = QRef.current;
        if (!controlRef_current || !QRef_current) {
            return;
        }
        let n = QRef_current.getBoundingClientRect();
        let r = controlRef_current.getBoundingClientRect();
        let i = X ? `height` : `width`;
        let a = r[i] - n[i];
        let o = (n[i] / 2 + a * Xe / 100) / r[i] * 100;
        let s = Number.isFinite(o) ? o : undefined;
        setZe(s);
        if ($ === 0) {
            setIndicatorPosition((e)=>[
                    s,
                    e[1]
                ]);
        } else if (Je) {
            setIndicatorPosition((e)=>[
                    e[0],
                    s
                ]);
        }
    });
    p(()=>{
        if (inset) {
            queueMicrotask(tt);
        }
    }, [
        tt,
        inset
    ]);
    p(()=>{
        if (inset) {
            tt();
        }
    }, [
        tt,
        inset,
        Xe
    ]);
    p(()=>{
        if (!inset) {
            return;
        }
        let controlRef_current = controlRef.current;
        let QRef_current = QRef.current;
        if (!controlRef_current || !QRef_current) {
            return;
        }
        let ResizeObserver = T(controlRef_current).ResizeObserver;
        if (typeof ResizeObserver != `function`) {
            return;
        }
        let r = new ResizeObserver(tt);
        r.observe(controlRef_current);
        r.observe(QRef_current);
        return ()=>{
            r.disconnect();
        };
    }, [
        controlRef,
        tt,
        inset
    ]);
    let nt = X ? `bottom` : `insetInlineStart`;
    let rt = X ? `left` : `top`;
    let zIndex;
    if (Y) {
        if (active === $) {
            zIndex = 2;
        } else if (et === $) {
            zIndex = 1;
        }
    } else if (active === $) {
        zIndex = 1;
    }
    let style_1;
    style_1 = inset ? {
        "--position": `${Ze ?? 0}%`,
        visibility: renderBeforeHydration && $e || Ze === undefined ? `hidden` : undefined,
        position: `absolute`,
        [nt]: `var(--position)`,
        [rt]: `50%`,
        translate: `${(X || !Z ? -1 : 1) * 50}% ${(X ? 1 : -1) * 50}%`,
        zIndex
    } : Number.isFinite(Xe) ? {
        position: `absolute`,
        [nt]: `${Xe}%`,
        [rt]: `50%`,
        translate: `${(X || !Z ? -1 : 1) * 50}% ${(X ? 1 : -1) * 50}%`,
        zIndex
    } : Ht;
    let writingMode;
    if (orientation === `vertical`) {
        writingMode = Z ? `vertical-rl` : `vertical-lr`;
    }
    let st = typeof getAriaLabel == `function` ? getAriaLabel($) : aria_label;
    let ct = f({
        "aria-label": st,
        "aria-labelledby": aria_labelledby ?? (st == null ? labelId : undefined),
        "aria-describedby": aria_describedby,
        "aria-orientation": orientation,
        "aria-valuenow": Ye,
        "aria-valuetext": typeof getAriaValueText == `function` ? getAriaValueText(V(Ye, locale, formatOptionsRef.current ?? undefined), Ye, $) : aria_valuetext ?? Ie(values, $, formatOptionsRef.current ?? undefined, locale),
        disabled: je,
        form,
        id: Ge,
        max,
        min,
        name,
        onChange (e) {
            handleInputChange(e.currentTarget.valueAsNumber, $, e);
        },
        onFocus (e) {
            let HeRef_current = HeRef.current;
            HeRef.current = false;
            setActive($);
            setFocused(true);
            if (HeRef_current) {
                e.stopPropagation();
            }
        },
        onBlur (e) {
            if (HeRef.current) {
                e.stopPropagation();
                return;
            }
            if (QRef.current) {
                setActive(-1);
                setTouched(true);
                setFocused(false);
                if (validationMode === `onBlur`) {
                    validation.commit(xe(Ye, $, min, max, Y, values));
                }
            }
        },
        onKeyDown (e) {
            if (e.defaultPrevented || !Fe.has(e.key)) {
                return;
            }
            if (l.has(e.key)) {
                e.stopPropagation();
            }
            let t = null;
            let n = De(Ye, step, min);
            switch(e.key){
                case c:
                    t = Le(n, e.shiftKey ? largeStep : step, 1, min, max);
                    break;
                case s_3:
                    t = Le(n, e.shiftKey ? largeStep : step, Z ? -1 : 1, min, max);
                    break;
                case i:
                    t = Le(n, e.shiftKey ? largeStep : step, -1, min, max);
                    break;
                case o:
                    t = Le(n, e.shiftKey ? largeStep : step, Z ? 1 : -1, min, max);
                    break;
                case h:
                    t = Le(n, largeStep, 1, min, max);
                    break;
                case m_2:
                    t = Le(n, largeStep, -1, min, max);
                    break;
                case `End`:
                    t = max;
                    if (Y) {
                        t = Number.isFinite(values[$ + 1]) ? values[$ + 1] - step * minStepsBetweenValues : max;
                    }
                    break;
                case u:
                    t = min;
                    if (Y) {
                        t = Number.isFinite(values[$ - 1]) ? values[$ - 1] + step * minStepsBetweenValues : min;
                    }
                    break;
                default:
                    break;
            }
            if (t !== null) {
                let n = e.currentTarget;
                if (!Qt(n)) {
                    HeRef.current = true;
                    n.blur();
                    n.focus({
                        preventScroll: true,
                        focusVisible: true
                    });
                }
                handleInputChange(t, $, e);
                e.preventDefault();
            }
        },
        step,
        style: {
            ...Ht,
            width: `100%`,
            height: `100%`,
            writingMode
        },
        tabIndex: tabIndex ?? undefined,
        type: `range`,
        value: Ye ?? ``
    }, (e)=>validation.getValidationProps(je, e), {
        onKeyDown
    });
    let lt = s_2(VeRef, validation.inputRef, inputRef);
    return n_2(`div`, e, {
        state,
        ref: [
            t,
            ref,
            QRef
        ],
        props: [
            {
                [Pe.index]: $,
                children: <>{children}<input ref={lt} {...ct} suppressHydrationWarning/>{inset && $e && renderBeforeHydration && Je && <script nonce={nonce} dangerouslySetInnerHTML={{
                    __html: '!function(){const t=document.currentScript?.parentElement;if(!t)return;const e=t.closest("[data-base-ui-slider-control]");if(!e)return;const r=e.querySelector("[data-base-ui-slider-indicator]"),i=e.getBoundingClientRect(),n="vertical"===e.getAttribute("data-orientation")?"height":"width",o=e.querySelectorAll(\'input[type="range"]\'),l=o.length>1,s=o.length-1;let a=null,u=null;for(let t=0;t<o.length;t+=1){const e=o[t],y=parseFloat(e.getAttribute("value")??"");if(Number.isNaN(y))return;const c=e.parentElement;if(!c)return;const p=parseFloat(e.getAttribute("max")??"100"),g=parseFloat(e.getAttribute("min")??"0"),b=c?.getBoundingClientRect(),d=i[n]-b[n],m=100*(y-g)/(p-g),v=(b[n]/2+d*m/100)/i[n]*100;c.style.setProperty("--position",`${v}%`),Number.isFinite(v)&&(c.style.removeProperty("visibility"),r&&(0===t?(a=v,r.style.setProperty("--start-position",`${v}%`),l||r.style.removeProperty("visibility")):t===s&&(u=v-(a??0),r.style.setProperty("--end-position",`${v}%`),r.style.setProperty("--relative-size",`${u}%`),r.style.removeProperty("visibility"))))}}();'
                }} suppressHydrationWarning/>}</>,
                id: id_1,
                onBlur,
                onFocus,
                onPointerDown (e) {
                    if (!je) {
                        pressedThumbIndexRef.current = $;
                        if (QRef.current != null) {
                            let t = orientation === `horizontal` ? `x` : `y`;
                            let n = Ee(QRef.current);
                            pressedThumbCenterOffsetRef.current = (orientation === `horizontal` ? e.clientX : e.clientY) - n[t];
                        }
                        if (VeRef.current != null && pressedInputRef.current !== VeRef.current) {
                            pressedInputRef.current = VeRef.current;
                        }
                    }
                },
                style: style_1,
                suppressHydrationWarning: renderBeforeHydration || undefined
            },
            rest
        ],
        stateAttributesMapping
    });
});
function Z(e, t, n, r, renderBeforeHydration, a) {
    let o = n === undefined || t && r === undefined ? `hidden` : undefined;
    let s = e ? `bottom` : `insetInlineStart`;
    let c = e ? `height` : `width`;
    let l = {
        visibility: renderBeforeHydration && a ? `hidden` : o,
        position: e ? `absolute` : `relative`,
        [e ? `width` : `height`]: `inherit`
    };
    l[`--start-position`] = `${n ?? 0}%`;
    if (t) {
        l[`--relative-size`] = `${(r ?? 0) - (n ?? 0)}%`;
        l[s] = `var(--start-position)`;
        l[c] = `var(--relative-size)`;
        return l;
    }
    l[s] = 0;
    l[c] = `var(--start-position)`;
    return l;
}
function Re(e, t, n, r) {
    let i = e ? `bottom` : `insetInlineStart`;
    let a = e ? `height` : `width`;
    let o = {
        position: e ? `absolute` : `relative`,
        [e ? `width` : `height`]: `inherit`
    };
    if (!t) {
        o[i] = 0;
        o[a] = `${n}%`;
        return o;
    }
    let s = r - n;
    o[i] = `${n}%`;
    o[a] = `${s}%`;
    return o;
}
const Ze1 = M.forwardRef(function(e, t) {
    let { render, className, style, ...rest } = e;
    let { indicatorPosition, inset, max, min, orientation, renderBeforeHydration, state, values } = useWe();
    let h = useMe();
    let g = orientation === `vertical`;
    let _ = values.length > 1;
    let style_1 = inset ? Z(g, _, indicatorPosition[0], indicatorPosition[1], renderBeforeHydration, h) : Re(g, _, Ne(values[0], min, max), Ne(values[values.length - 1], min, max));
    return n_2(`div`, e, {
        state,
        ref: t,
        props: [
            {
                "data-base-ui-slider-indicator": renderBeforeHydration ? `` : undefined,
                style: style_1,
                suppressHydrationWarning: renderBeforeHydration || undefined
            },
            rest
        ],
        stateAttributesMapping
    });
});
function BeComponent({ className, defaultValue, value, min = 0, max = 100, ...rest }) {
    let s = Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [
        min,
        max
    ];
    return <R className={t_2(`data-horizontal:w-full data-vertical:h-full`, className)} data-slot={`slider`} defaultValue={defaultValue} value={value} min={min} max={max} thumbAlignment={`edge`} {...rest}><K className={`relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col`}><Q1 data-slot={`slider-track`} className={`relative grow overflow-hidden rounded-full bg-muted select-none data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1`}><Ze1 data-slot={`slider-range`} className={`bg-primary select-none data-horizontal:h-full data-vertical:w-full`}/></Q1>{Array.from({
        length: s.length
    }, (e, key)=><X key={key} data-slot={`slider-thumb`} className={`relative block size-3 shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50`}/>)}</K></R>;
}
function QComponent({ className, ...rest }) {
    return <kbd data-slot={`kbd`} className={t_2(`pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*='size-'])]:size-3`, className)} {...rest}/>;
}
export { BeComponent as n, QComponent as t };
