export function Mr(e, t) {
    let n = (n, r)=>Nr(e, t(n, 0), t(0, r), t(n, r)) * 16;
    return {
        nw: n(-1, -1),
        ne: n(1, -1),
        se: n(1, 1),
        sw: n(-1, 1)
    };
}
function Nr(e, t, n, r) {
    let i = t > 0 || n > 0 ? [
        e,
        t,
        n,
        r
    ] : [
        e,
        t,
        n
    ];
    let a = 0;
    let o = 0;
    for (let e of i){
        if (!(e < 0)) {
            if (e >= 1) {
                return 1;
            }
            if (e >= 0.8) {
                a += e * 10;
                o += 10;
            } else {
                a += e;
                o += 1;
            }
        }
    }
    if (o > 0) {
        return a / o;
    }
    return e;
}
export function Br(e) {
    let t = e * 180 / Math.PI;
    return (Math.round(t / 90) * 90 % 360 + 360) % 360;
}
