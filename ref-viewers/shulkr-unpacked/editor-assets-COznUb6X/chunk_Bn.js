import { cn, nn } from "./chunk_$t.js";
const Bn = 0.05;
export function Vn(e, t, n, r) {
    let i = (n, r)=>cn(e, nn(t, n, 0, r));
    let a = (e)=>{
        if (Math.abs(e) < Bn) {
            return 0;
        }
        if (e > 0) {
            return e - Bn;
        }
        return e + Bn;
    };
    let o = n;
    let s = r;
    while(o !== 0 && !i(o, 0)){
        o = a(o);
    }
    while(s !== 0 && !i(0, s)){
        s = a(s);
    }
    while(o !== 0 && s !== 0 && !i(o, s)){
        o = a(o);
        s = a(s);
    }
    return [
        o,
        s
    ];
}
