import * as r from "./module-59040.js";
import { B } from "./module-59040.js";
import { Suspense, useEffect, useImperativeHandle, useMemo, useRef, useState } from "./module-61426.js";
import * as i from "./module-87548.js";
import { Af } from "./module-54735.js";
import "./module-86897.js";
import "./module-1975.js";
import "./module-77719.js";
import "./module-66451.js";
function a(e, t) {
    let n;
    return (...r)=>{
        window.clearTimeout(n);
        n = window.setTimeout(()=>e(...r), t);
    };
}
let l = [
    "x",
    "y",
    "top",
    "bottom",
    "left",
    "right",
    "width",
    "height"
];
function UComponent({ ref, children, fallback, resize, style, gl, events = r.f, eventSource, eventPrefix, shadows, linear, flat, legacy, orthographic, frameloop, dpr, performance, raycaster, camera, scene, onPointerMissed, onCreated, ...rest }) {
    useMemo(()=>r.e(i), []);
    let S = r.u();
    let [ref_1, A] = (({ debounce, scroll, polyfill, offsetSize } = {
        debounce: 0,
        scroll: false,
        offsetSize: false
    })=>{
        let i;
        let s;
        let c;
        let u = polyfill || (typeof window === "undefined" ? class {
        } : window.ResizeObserver);
        if (!u) {
            throw Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");
        }
        let [p, setP] = useState({
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            bottom: 0,
            right: 0,
            x: 0,
            y: 0
        });
        let fRef = useRef({
            element: null,
            scrollContainers: null,
            resizeObserver: null,
            lastBounds: p,
            orientationHandler: null
        });
        let h = debounce ? typeof debounce === "number" ? debounce : debounce.scroll : null;
        let m = debounce ? typeof debounce === "number" ? debounce : debounce.resize : null;
        let vRef = useRef(false);
        useEffect(()=>{
            vRef.current = true;
            return ()=>void (vRef.current = false);
        });
        let [b, g, y] = useMemo(()=>{
            let e = ()=>{
                let e;
                let t;
                if (!fRef.current.element) {
                    return;
                }
                let { left, top, width, height, bottom, right, x, y } = fRef.current.element.getBoundingClientRect();
                let h = {
                    left,
                    top,
                    width,
                    height,
                    bottom,
                    right,
                    x,
                    y
                };
                if (fRef.current.element instanceof HTMLElement && offsetSize) {
                    h.height = fRef.current.element.offsetHeight;
                    h.width = fRef.current.element.offsetWidth;
                }
                Object.freeze(h);
                if (vRef.current && (e = fRef.current.lastBounds, t = h, !l.every((n)=>e[n] === t[n]))) {
                    setP(fRef.current.lastBounds = h);
                }
            };
            return [
                e,
                m ? a(e, m) : e,
                h ? a(e, h) : e
            ];
        }, [
            setP,
            offsetSize,
            h,
            m
        ]);
        function w() {
            if (fRef.current.scrollContainers) {
                fRef.current.scrollContainers.forEach((e)=>e.removeEventListener("scroll", y, true));
                fRef.current.scrollContainers = null;
            }
            if (fRef.current.resizeObserver) {
                fRef.current.resizeObserver.disconnect();
                fRef.current.resizeObserver = null;
            }
            if (fRef.current.orientationHandler) {
                if ("orientation" in screen && "removeEventListener" in screen.orientation) {
                    screen.orientation.removeEventListener("change", fRef.current.orientationHandler);
                } else if ("onorientationchange" in window) {
                    window.removeEventListener("orientationchange", fRef.current.orientationHandler);
                }
            }
        }
        function j() {
            if (fRef.current.element) {
                fRef.current.resizeObserver = new u(y);
                fRef.current.resizeObserver.observe(fRef.current.element);
                if (scroll && fRef.current.scrollContainers) {
                    fRef.current.scrollContainers.forEach((e)=>e.addEventListener("scroll", y, {
                            capture: true,
                            passive: true
                        }));
                }
                fRef.current.orientationHandler = ()=>{
                    y();
                };
                if ("orientation" in screen && "addEventListener" in screen.orientation) {
                    screen.orientation.addEventListener("change", fRef.current.orientationHandler);
                } else if ("onorientationchange" in window) {
                    window.addEventListener("orientationchange", fRef.current.orientationHandler);
                }
            }
        }
        i = y;
        s = !!scroll;
        useEffect(()=>{
            if (s) {
                window.addEventListener("scroll", i, {
                    capture: true,
                    passive: true
                });
                return ()=>void window.removeEventListener("scroll", i, true);
            }
        }, [
            i,
            s
        ]);
        c = g;
        useEffect(()=>{
            window.addEventListener("resize", c);
            return ()=>void window.removeEventListener("resize", c);
        }, [
            c
        ]);
        useEffect(()=>{
            w();
            j();
        }, [
            scroll,
            y,
            g
        ]);
        useEffect(()=>w, []);
        return [
            (e)=>{
                if (e && e !== fRef.current.element) {
                    w();
                    fRef.current.element = e;
                    fRef.current.scrollContainers = function e(t) {
                        let n = [];
                        if (!t || t === document.body) {
                            return n;
                        }
                        let { overflow, overflowX, overflowY } = window.getComputedStyle(t);
                        if ([
                            overflow,
                            overflowX,
                            overflowY
                        ].some((e)=>e === "auto" || e === "scroll")) {
                            n.push(t);
                        }
                        return [
                            ...n,
                            ...e(t.parentElement)
                        ];
                    }(e);
                    j();
                }
            },
            p,
            b
        ];
    })({
        scroll: true,
        debounce: {
            scroll: 50,
            resize: 0
        },
        ...resize
    });
    let _RefRef = useRef(null);
    let IRef = useRef(null);
    useImperativeHandle(ref, ()=>_RefRef.current);
    let L = r.a(onPointerMissed);
    let [R, setR] = useState(false);
    let [D, setD] = useState(false);
    if (R) {
        throw R;
    }
    if (D) {
        throw D;
    }
    let HRef = useRef(null);
    r.b(()=>{
        let _Ref_current = _RefRef.current;
        if (A.width > 0 && A.height > 0 && _Ref_current) {
            if (!HRef.current) {
                HRef.current = r.c(_Ref_current);
            }
            (async ()=>{
                await HRef.current.configure({
                    gl,
                    scene,
                    events,
                    shadows,
                    linear,
                    flat,
                    legacy,
                    orthographic,
                    frameloop,
                    dpr,
                    performance,
                    raycaster,
                    camera,
                    size: A,
                    onPointerMissed: (...e)=>L.current?.(...e),
                    onCreated: (e)=>{
                        e.events.connect?.(eventSource ? r.i(eventSource) ? eventSource.current : eventSource : IRef.current);
                        if (eventPrefix) {
                            e.setEvents({
                                compute: (e, t)=>{
                                    let n = e[`${eventPrefix}X`];
                                    let r = e[`${eventPrefix}Y`];
                                    t.pointer.set(n / t.size.width * 2 - 1, -(2 * (r / t.size.height)) + 1);
                                    t.raycaster.setFromCamera(t.pointer, t.camera);
                                }
                            });
                        }
                        onCreated?.(e);
                    }
                });
                HRef.current.render(<S><r.E set={setD}><Suspense fallback=<B set={setR}/>>{children ?? null}</Suspense></r.E></S>);
            })();
        }
    });
    useEffect(()=>{
        let _Ref_current = _RefRef.current;
        if (_Ref_current) {
            return ()=>r.d(_Ref_current);
        }
    }, []);
    let pointerEvents = eventSource ? "none" : "auto";
    return <div ref={IRef} style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents,
        ...style
    }} {...rest}><div ref={ref_1} style={{
        width: "100%",
        height: "100%"
    }}><canvas ref={_RefRef} style={{
        display: "block"
    }}>{fallback}</canvas></div></div>;
}
export function Hl(e) {
    return <Af><UComponent {...e}/></Af>;
}
