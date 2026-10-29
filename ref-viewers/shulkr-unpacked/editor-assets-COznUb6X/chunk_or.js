import { ar, nr } from "./chunk_Qn_2.js";
import { cr } from "./chunk_sr.js";
export function or(e, t, n) {
    if (!(t === 0 && n === 0)) {
        for (let r of e){
            let e = nr([
                r[0] - 0.5,
                r[1] - 0.5,
                r[2] - 0.5
            ], t, n);
            r[0] = e[0] + ar[0];
            r[1] = e[1] + ar[1];
            r[2] = e[2] + ar[2];
        }
    }
}
export function lr(e, t) {
    for (let n of e){
        let e = cr([
            n[0] - 0.5,
            n[1] - 0.5,
            n[2] - 0.5
        ], t);
        n[0] = e[0] + ar[0];
        n[1] = e[1] + ar[1];
        n[2] = e[2] + ar[2];
    }
}
