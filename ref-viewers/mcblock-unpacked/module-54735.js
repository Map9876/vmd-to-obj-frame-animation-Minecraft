import { Component, createContext, use, useContext, useEffect, useId, useLayoutEffect, useMemo, useState } from "./module-61426.js";
export function Nz(e, t, n) {
    if (!e) {
        return;
    }
    if (n(e) === true) {
        return e;
    }
    let r = t ? e.return : e.child;
    while(r){
        let e = Nz(r, t, n);
        if (e) {
            return e;
        }
        r = t ? null : r.sibling;
    }
}
function i(e) {
    try {
        return Object.defineProperties(e, {
            _currentRenderer: {
                get: ()=>null,
                set () {}
            },
            _currentRenderer2: {
                get: ()=>null,
                set () {}
            }
        });
    } catch (t) {
        return e;
    }
}
typeof window !== "undefined" && (window.document?.createElement || window.navigator?.product === "ReactNative") ? useLayoutEffect : useEffect;
let a = i(createContext(null));
export class Af extends Component {
    render() {
        return <a.Provider value={this._reactInternals}>{this.props.children}</a.Provider>;
    }
}
export function u5() {
    let e = useContext(a);
    if (e === null) {
        throw Error("its-fine: useFiber must be called within a <FiberProvider />!");
    }
    let t = useId();
    return useMemo(()=>{
        for (let n of [
            e,
            e?.alternate
        ]){
            if (!n) {
                continue;
            }
            let e = Nz(n, false, (e)=>{
                let e_memoizedState = e.memoizedState;
                while(e_memoizedState){
                    if (e_memoizedState.memoizedState === t) {
                        return true;
                    }
                    e_memoizedState = e_memoizedState.next;
                }
            });
            if (e) {
                return e;
            }
        }
    }, [
        e,
        t
    ]);
}
let SYMBOL_REACT_CONTEXT = Symbol.for("react.context");
let u = (e)=>e !== null && typeof e === "object" && "$$typeof" in e && e.$$typeof === SYMBOL_REACT_CONTEXT;
export function y3() {
    let e = (()=>{
        let e = u5();
        let [t] = useState(()=>new Map);
        t.clear();
        let n = e;
        while(n){
            let e = n.type;
            if (u(e) && e !== a && !t.has(e)) {
                t.set(e, use(i(e)));
            }
            n = n.return;
        }
        return t;
    })();
    return useMemo(()=>Array.from(e.keys()).reduce((acc, item)=>(o)=><acc><item.Provider {...o} value={e.get(item)}/></acc>, (e)=><Af {...e}/>), [
        e
    ]);
}
