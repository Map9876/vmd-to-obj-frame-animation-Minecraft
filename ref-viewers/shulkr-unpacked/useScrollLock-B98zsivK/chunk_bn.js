import { M, x } from "../dist-7IP26fql.js";
import { t } from "../owner-Bmp_Sgwo.js";
const bn = {
    inert: new WeakMap,
    "aria-hidden": new WeakMap
};
const xn = `data-base-ui-inert`;
const Sn = {
    inert: new WeakSet,
    "aria-hidden": new WeakSet
};
let Cn = new WeakMap;
let wn = 0;
function Tn(e) {
    return Sn[e];
}
function En(e) {
    if (e) {
        if (M(e)) {
            return e.host;
        }
        return En(e.parentNode);
    }
    return null;
}
const Dn = (body, t)=>t.map((t)=>{
        if (body.contains(t)) {
            return t;
        }
        let n = En(t);
        if (body.contains(n)) {
            return n;
        }
        return null;
    }).filter((e)=>e != null);
const On = (e)=>{
    let t = new Set;
    e.forEach((e)=>{
        let n = e;
        while(n && !t.has(n)){
            t.add(n);
            n = n.parentNode;
        }
    });
    return t;
};
const kn = (body, t, n)=>{
    let r = [];
    let i = (e)=>{
        if (!(!e || n.has(e))) {
            Array.from(e.children).forEach((e)=>{
                if (x(e) !== `script`) {
                    if (t.has(e)) {
                        i(e);
                    } else {
                        r.push(e);
                    }
                }
            });
        }
    };
    i(body);
    return r;
};
function An(e, body, ariaHidden, inert, { mark = true }) {
    let a = null;
    if (inert) {
        a = `inert`;
    } else if (ariaHidden) {
        a = `aria-hidden`;
    }
    let o = null;
    let s = null;
    let c = Dn(body, e);
    let l = mark ? kn(body, On(c), new Set(c)) : [];
    let u = [];
    let d = [];
    if (a) {
        let e = bn[a];
        let n = Tn(a);
        s = n;
        o = e;
        let r = Dn(body, Array.from(body.querySelectorAll(`[aria-live]`)));
        let i = c.concat(r);
        kn(body, On(i), new Set(i)).forEach((t)=>{
            let r = t.getAttribute(a);
            let i = r !== null && r !== `false`;
            let o = (e.get(t) || 0) + 1;
            e.set(t, o);
            u.push(t);
            if (o === 1 && i) {
                n.add(t);
            }
            if (!i) {
                t.setAttribute(a, a === `inert` ? `` : `true`);
            }
        });
    }
    if (mark) {
        l.forEach((e)=>{
            let t = (Cn.get(e) || 0) + 1;
            Cn.set(e, t);
            d.push(e);
            if (t === 1) {
                e.setAttribute(xn, ``);
            }
        });
    }
    wn += 1;
    return ()=>{
        if (o) {
            u.forEach((e)=>{
                let t = (o.get(e) || 0) - 1;
                o.set(e, t);
                if (!t) {
                    if (!s?.has(e) && a) {
                        e.removeAttribute(a);
                    }
                    s?.delete(e);
                }
            });
        }
        if (mark) {
            d.forEach((e)=>{
                let t = (Cn.get(e) || 0) - 1;
                Cn.set(e, t);
                if (!t) {
                    e.removeAttribute(xn);
                }
            });
        }
        --wn;
        if (!wn) {
            bn.inert = new WeakMap;
            bn[`aria-hidden`] = new WeakMap;
            Sn.inert = new WeakSet;
            Sn[`aria-hidden`] = new WeakSet;
            Cn = new WeakMap;
        }
    };
}
export function jn(e, { ariaHidden = false, inert = false, mark = true } = {}) {
    let body = t(e[0]).body;
    return An(e, body, ariaHidden, inert, {
        mark
    });
}
