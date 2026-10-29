import { useCallback, useRef } from "./module-61426.js";
export function useMergedRef(e, t) {
    let nRef = useRef(null);
    let uRef = useRef(null);
    return useCallback((r)=>{
        if (r === null) {
            let e = nRef.current;
            if (e) {
                nRef.current = null;
                e();
            }
            let t = uRef.current;
            if (t) {
                uRef.current = null;
                t();
            }
        } else {
            if (e) {
                nRef.current = l(e, r);
            }
            if (t) {
                uRef.current = l(t, r);
            }
        }
    }, [
        e,
        t
    ]);
}
function l(e, t) {
    if (typeof e !== "function") {
        e.current = t;
        return ()=>{
            e.current = null;
        };
    }
    {
        let n = e(t);
        if (typeof n === "function") {
            return n;
        }
        return ()=>e(null);
    }
}
