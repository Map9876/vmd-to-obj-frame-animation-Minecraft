function Tr(e) {
    let t = [
        {},
        {}
    ];
    e?.values.forEach((e, n)=>{
        t[0][n] = e.get();
        t[1][n] = e.getVelocity();
    });
    return t;
}
export function Er(e, t, n, r) {
    if (typeof t == `function`) {
        let [i, a] = Tr(r);
        t = t(n === undefined ? e.custom : n, i, a);
    }
    if (typeof t == `string`) {
        t = e.variants && e.variants[t];
    }
    if (typeof t == `function`) {
        let [i, a] = Tr(r);
        t = t(n === undefined ? e.custom : n, i, a);
    }
    return t;
}
export function G(e, t, n) {
    let r = e.getProps();
    return Er(r, t, n === undefined ? r.custom : n, e);
}
