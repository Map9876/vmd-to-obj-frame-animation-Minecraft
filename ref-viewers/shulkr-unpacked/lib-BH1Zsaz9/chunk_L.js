export function L(e, t, n, r) {
    let e_length = e.length;
    let a = 0;
    let o;
    t = t < 0 ? -t > e_length ? 0 : e_length + t : t > e_length ? e_length : t;
    n = n > 0 ? n : 0;
    if (r.length < 10000) {
        o = Array.from(r);
        o.unshift(t, n);
        e.splice(...o);
    } else {
        for(n && e.splice(t, n); a < r.length;){
            o = r.slice(a, a + 10000);
            o.unshift(t, 0);
            e.splice(...o);
            a += 10000;
            t += 10000;
        }
    }
}
export function R(e, t) {
    if (e.length > 0) {
        L(e, e.length, 0, t);
        return e;
    }
    return t;
}
