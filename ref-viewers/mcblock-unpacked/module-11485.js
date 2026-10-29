import { LoY, TDQ, qtW } from "./module-85339.js";
export function $(e) {
    let t = e.getAttribute("position");
    if (!t) {
        return e;
    }
    let r = e.getIndex();
    let a = r ? r.count : t.count;
    let l = (e)=>{
        if (r) {
            return r.getX(e);
        }
        return e;
    };
    let o = (e)=>`${Math.round(10000 * t.getX(e))},` + `${Math.round(10000 * t.getY(e))},` + `${Math.round(10000 * t.getZ(e))}`;
    let s = new Set;
    let u = [];
    let c = false;
    for(let e = 0; e + 2 < a; e += 3){
        let t = o(l(e));
        let r = o(l(e + 1));
        let n = o(l(e + 2));
        let a = t <= r && t <= n ? `${t}|${r}|${n}` : r <= n ? `${r}|${n}|${t}` : `${n}|${t}|${r}`;
        if (s.has(a)) {
            c = true;
            continue;
        }
        s.add(a);
        u.push(e);
    }
    if (!c) {
        return e;
    }
    let i = new Float32Array(9 * u.length);
    let f = 0;
    for (let e of u){
        for(let r = 0; r < 3; r++){
            let n = l(e + r);
            i[f++] = t.getX(n);
            i[f++] = t.getY(n);
            i[f++] = t.getZ(n);
        }
    }
    let m = new LoY;
    m.setAttribute("position", new qtW(i, 3));
    return m;
}
export function y(e, t = 1) {
    let r = $(e);
    let l = new TDQ(r, t);
    if (r !== e) {
        r.dispose();
    }
    return l;
}
