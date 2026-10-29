function Z(e) {
    return e !== `__proto__` && e !== `constructor` && e !== `prototype`;
}
export function Q(e, t) {
    let n = Object.create(null);
    if (e) {
        for (let t of Object.keys(e)){
            if (Z(t)) {
                n[t] = e[t];
            }
        }
    }
    if (t && typeof t == `object`) {
        for (let e of Object.keys(t)){
            if (Z(e)) {
                n[e] = t[e];
            }
        }
    }
    return n;
}
export function qr(e) {
    if (!e) {
        return Object.create(null);
    }
    let t = Object.create(null);
    for (let n of Object.keys(e)){
        if (Z(n)) {
            t[n] = e[n];
        }
    }
    return t;
}
