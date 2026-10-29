export function sr([i, a, o], t, n, r) {
    let s = (e)=>(e % 360 + 360) % 360 / 90;
    for(let e = 0; e < s(t); e++){
        let e = o;
        o = -a;
        a = e;
    }
    for(let e = 0; e < s(n); e++){
        let e = -o;
        o = i;
        i = e;
    }
    for(let e = 0; e < s(r); e++){
        let e = i;
        i = a;
        a = -e;
    }
    return [
        i,
        a,
        o
    ];
}
export function cr(e, t) {
    return sr(e, t.x, t.y, t.z);
}
export function ur(e, t) {
    let [n, r, i] = e;
    e[0] = t[0] * n + t[1] * r + t[2] * i + t[3];
    e[1] = t[4] * n + t[5] * r + t[6] * i + t[7];
    e[2] = t[8] * n + t[9] * r + t[10] * i + t[11];
}
