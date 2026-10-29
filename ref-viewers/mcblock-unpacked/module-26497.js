import "./module-86897.js";
import { Children, Component, cloneElement, isValidElement, useCallback, useContext, useEffect, useId, useInsertionEffect, useMemo, useRef, useState } from "./module-61426.js";
import { L } from "./module-60296.js";
import { M as M_1 } from "./module-94416.js";
import { E } from "./module-86553.js";
import { t } from "./module-59686.js";
import { s } from "./module-81402.js";
import { Q } from "./module-53127.js";
import { xQ } from "./module-75601.js";
function i(e, t) {
    if (typeof e === "function") {
        return e(t);
    }
    if (e != null) {
        e.current = t;
    }
}
class D extends Component {
    getSnapshotBeforeUpdate(e) {
        let current = this.props.childRef.current;
        if (current && e.isPresent && !this.props.isPresent) {
            let e = current.offsetParent;
            let n = s(e) && e.offsetWidth || 0;
            let r = this.props.sizeRef.current;
            r.height = current.offsetHeight || 0;
            r.width = current.offsetWidth || 0;
            r.top = current.offsetTop;
            r.left = current.offsetLeft;
            r.right = n - r.width - r.left;
        }
        return null;
    }
    componentDidUpdate() {}
    render() {
        return this.props.children;
    }
}
function P1Component({ children, isPresent, anchorX, root }) {
    let o = useId();
    let uRef = useRef(null);
    let cRef = useRef({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0
    });
    let { nonce } = useContext(Q);
    let ref = ((...t_2)=>useCallback(((...t_1)=>(e)=>{
                let n = false;
                let r = t_1.map((t)=>{
                    let r = i(t, e);
                    if (!(n || typeof r !== "function")) {
                        n = true;
                    }
                    return r;
                });
                if (n) {
                    return ()=>{
                        for(let e = 0; e < r.length; e++){
                            let n = r[e];
                            if (typeof n === "function") {
                                n();
                            } else {
                                i(t_1[e], null);
                            }
                        }
                    };
                }
            })(...t_2), t_2))(uRef, children?.ref);
    useInsertionEffect(()=>{
        let { width, height, top, left, right } = cRef.current;
        if (isPresent || !uRef.current || !width || !height) {
            return;
        }
        uRef.current.dataset.motionPopId = o;
        let i = document.createElement("style");
        if (nonce) {
            i.nonce = nonce;
        }
        let d = root ?? document.head;
        d.appendChild(i);
        if (i.sheet) {
            i.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${anchorX === "left" ? `left: ${left}` : `right: ${right}`}px !important;
            top: ${top}px !important;
          }
        `);
        }
        return ()=>{
            if (d.contains(i)) {
                d.removeChild(i);
            }
        };
    }, [
        isPresent
    ]);
    return <D isPresent={isPresent} childRef={uRef} sizeRef={cRef}>{cloneElement(children, {
        ref
    })}</D>;
}
let FComponent = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, root })=>{
    let v = M_1(g);
    let id = useId();
    let k = true;
    let M = useMemo(()=>{
        k = false;
        return {
            id,
            initial,
            isPresent,
            custom,
            onExitComplete: (e)=>{
                for (let t of (v.set(e, true), v.values())){
                    if (!t) {
                        return;
                    }
                }
                if (onExitComplete) {
                    onExitComplete();
                }
            },
            register: (e)=>{
                v.set(e, false);
                return ()=>v.delete(e);
            }
        };
    }, [
        isPresent,
        v,
        onExitComplete
    ]);
    if (presenceAffectsLayout && k) {
        M = {
            ...M
        };
    }
    useMemo(()=>{
        v.forEach((e, t)=>v.set(t, false));
    }, [
        isPresent
    ]);
    useEffect(()=>{
        if (!(isPresent || v.size || !onExitComplete)) {
            onExitComplete();
        }
    }, [
        isPresent
    ]);
    if (mode === "popLayout") {
        children = <P1Component isPresent={isPresent} anchorX={anchorX} root={root}>{children}</P1Component>;
    }
    return <t.Provider value={M}>{children}</t.Provider>;
};
function g() {
    return new Map;
}
let y = (e)=>e.key || "";
function k(e) {
    let t = [];
    Children.forEach(e, (e)=>{
        if (isValidElement(e)) {
            t.push(e);
        }
    });
    return t;
}
export let N = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", root })=>{
    let [M, m] = xQ(propagate);
    let A = useMemo(()=>k(children), [
        children
    ]);
    let P = propagate && !M ? [] : A.map(y);
    let xRef = useRef(true);
    let ERef = useRef(A);
    let R = M_1(()=>new Map);
    let [w, setW] = useState(A);
    let [b, setB] = useState(A);
    E(()=>{
        xRef.current = false;
        ERef.current = A;
        for(let e = 0; e < b.length; e++){
            let t = y(b[e]);
            if (P.includes(t)) {
                R.delete(t);
            } else if (R.get(t) !== true) {
                R.set(t, false);
            }
        }
    }, [
        b,
        P.length,
        P.join("-")
    ]);
    let S = [];
    if (A !== w) {
        let e = [
            ...A
        ];
        for(let t = 0; t < b.length; t++){
            let n = b[t];
            let r = y(n);
            if (!P.includes(r)) {
                e.splice(t, 0, n);
                S.push(n);
            }
        }
        if (mode === "wait" && S.length) {
            e = S;
        }
        setB(k(e));
        setW(A);
        return null;
    }
    let { forceRender } = useContext(L);
    return <>{b.map((children_1)=>{
        let t = y(children_1);
        let isPresent = (!propagate || !!M) && (A === b || P.includes(t));
        return <FComponent key={t} isPresent={isPresent} initial={(!xRef.current || !!initial) && undefined} custom={custom} presenceAffectsLayout={presenceAffectsLayout} mode={mode} root={root} onExitComplete={isPresent ? undefined : ()=>{
            if (!R.has(t)) {
                return;
            }
            R.set(t, true);
            let e = true;
            R.forEach((t)=>{
                if (!t) {
                    e = false;
                }
            });
            if (e) {
                if (forceRender != null) {
                    forceRender();
                }
                setB(ERef.current);
                if (propagate) {
                    if (m != null) {
                        m();
                    }
                }
                if (onExitComplete) {
                    onExitComplete();
                }
            }
        }} anchorX={anchorX}>{children_1}</FComponent>;
    })}</>;
};
