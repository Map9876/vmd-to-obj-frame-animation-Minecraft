import { d, h } from "../dist-7IP26fql.js";
export const $ = (e, t, n, r, i, a, ...o)=>{
    if (o.length > 0) {
        throw Error(d(1));
    }
    let s;
    if (e && t && n && r && i && a) {
        s = (o, s, c, l)=>a(e(o, s, c, l), t(o, s, c, l), n(o, s, c, l), r(o, s, c, l), i(o, s, c, l), s, c, l);
    } else if (e && t && n && r && i) {
        s = (a, o, s, c)=>i(e(a, o, s, c), t(a, o, s, c), n(a, o, s, c), r(a, o, s, c), o, s, c);
    } else if (e && t && n && r) {
        s = (i, a, o, s)=>r(e(i, a, o, s), t(i, a, o, s), n(i, a, o, s), a, o, s);
    } else if (e && t && n) {
        s = (r, i, a, o)=>n(e(r, i, a, o), t(r, i, a, o), i, a, o);
    } else if (e && t) {
        s = (n, r, i, a)=>t(e(n, r, i, a), r, i, a);
    } else if (e) {
        s = e;
    } else {
        throw Error(`Missing arguments`);
    }
    return s;
};
const lr = [];
let ur;
export function dr() {
    return ur;
}
export function fr(e) {
    lr.push(e);
}
export function pr(e) {
    let t = (t, n)=>{
        let current = h(hr).current;
        let i;
        try {
            ur = current;
            for (let e of lr){
                e.before(current);
            }
            i = e(t, n);
            for (let e of lr){
                e.after(current);
            }
            current.didInitialize = true;
        } finally{
            ur = undefined;
        }
        return i;
    };
    t.displayName = e.displayName || e.name;
    return t;
}
function hr() {
    return {
        didInitialize: false
    };
}
