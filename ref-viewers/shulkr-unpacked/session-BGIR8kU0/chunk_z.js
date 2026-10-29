import { f } from "../keys-CMeqocw_.js";
import { x } from "./chunk_v.js";
import { C as queryKey } from "./chunk_C.js";
export function z() {
    let e = f();
    x.useEffect(()=>G(e, window.location.search), [
        e
    ]);
    return x.useSyncExternalStore(U, ()=>V, ()=>false);
}
let B = false;
var V = false;
const H = new Set;
function U(e) {
    H.add(e);
    return ()=>H.delete(e);
}
function W(e) {
    V = e;
    for (let e of H){
        e();
    }
}
function G(e, search) {
    if (B || new URLSearchParams(search).get(`subscribed`) !== `1`) {
        return;
    }
    B = true;
    W(true);
    let n = 0;
    let r = async ()=>{
        let t = e.getQueryData(queryKey);
        await e.invalidateQueries({
            queryKey
        });
        let i = (e.getQueryData(queryKey)?.user.capabilities.length ?? 0) > (t?.user.capabilities.length ?? 0);
        if (i) {
            e.invalidateQueries();
        }
        if (i || ++n >= q) {
            W(false);
            return;
        }
        setTimeout(r, K);
    };
    setTimeout(r, K);
}
var K = 1200;
var q = 8;
