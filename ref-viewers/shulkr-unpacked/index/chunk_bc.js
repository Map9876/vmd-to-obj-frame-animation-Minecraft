import { q } from "./chunk_rs.js";
import { _c } from "./chunk_uc.js";
export function bc(e) {
    return q.lazy(()=>_c(e));
}
export function xc(e) {
    let t = null;
    let n = false;
    let r = new Set;
    let preload = ()=>{
        if (!n) {
            n = true;
            _c(e).then((e)=>{
                t = e;
                for (let e of r){
                    e();
                }
            }, ()=>{});
        }
    };
    let a = (e)=>{
        r.add(e);
        return ()=>r.delete(e);
    };
    function useO(e) {
        let n = q.useSyncExternalStore(a, ()=>t, ()=>null);
        q.useEffect(preload, []);
        if (n) {
            return q.createElement(n, e);
        }
        return null;
    }
    return {
        Island: useO,
        preload
    };
}
export function Sc(e) {
    _c(e).catch(()=>{});
}
