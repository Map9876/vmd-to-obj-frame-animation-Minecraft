import { useCallback, useContext, useEffect, useId } from "./module-61426.js";
import { t as t_1 } from "./module-59686.js";
export function xQ(...args) {
    let t = !(args.length > 0) || args[0] === undefined || args[0];
    let e = useContext(t_1);
    if (e === null) {
        return [
            true,
            null
        ];
    }
    let { isPresent, onExitComplete, register } = e;
    let a = useId();
    useEffect(()=>{
        if (t) {
            return register(a);
        }
    }, [
        t
    ]);
    let l = useCallback(()=>t && onExitComplete && onExitComplete(a), [
        a,
        onExitComplete,
        t
    ]);
    if (!isPresent && onExitComplete) {
        return [
            false,
            l
        ];
    }
    return [
        true
    ];
}
