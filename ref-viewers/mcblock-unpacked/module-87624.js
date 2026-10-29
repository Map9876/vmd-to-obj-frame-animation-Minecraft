import { Qw, Wk } from "./module-78714.js";
import { O } from "./module-49636.js";
let n;
export function lu() {
    return Wk() / 1000;
}
export function zf() {
    return (n ??= (()=>{
        let { performance } = O;
        if (!performance?.now || !performance.timeOrigin) {
            return lu;
        }
        let performance_timeOrigin = performance.timeOrigin;
        return ()=>(performance_timeOrigin + Qw(()=>performance.now())) / 1000;
    })())();
}
let l = null;
export function k3() {
    if (l === null) {
        l = (()=>{
            let { performance } = O;
            if (!performance?.now) {
                return;
            }
            let t = Qw(()=>performance.now());
            let r = Wk();
            let performance_timeOrigin = performance.timeOrigin;
            if (typeof performance_timeOrigin === "number" && Math.abs(performance_timeOrigin + t - r) < 300000) {
                return performance_timeOrigin;
            }
            let i = performance.timing?.navigationStart;
            if (typeof i === "number" && Math.abs(i + t - r) < 300000) {
                return i;
            }
            return r - t;
        })();
    }
    return l;
}
