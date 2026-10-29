import { useCallback, useDebugValue, useSyncExternalStore } from "./module-61426.js";
import { y } from "./module-90490.js";
let h = (a)=>{
    let t = y(a);
    let e = (a)=>((a, t = (a)=>a)=>{
            let e = useSyncExternalStore(a.subscribe, useCallback(()=>t(a.getState()), [
                a,
                t
            ]), useCallback(()=>t(a.getInitialState()), [
                a,
                t
            ]));
            useDebugValue(e);
            return e;
        })(t, a);
    Object.assign(e, t);
    return e;
};
export let v = (a)=>{
    if (a) {
        return h(a);
    }
    return h;
};
