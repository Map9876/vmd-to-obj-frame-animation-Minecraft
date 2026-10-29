import { Bt, It, Lt, Rt, zt } from "./chunk_It.js";
export function Vt(e, t, n) {
    if (n !== undefined && Rt.has(n) || n === `minecraft:fence_gate` && e.properties.open === `true`) {
        return null;
    }
    if (n === `minecraft:ladder`) {
        return [
            Ht(e.properties.facing)
        ];
    }
    let r = Wt(t);
    if (r.length === 0) {
        return null;
    }
    if (n !== undefined && Bt.has(n)) {
        return Ut(r.map((e)=>[
                e[0],
                0,
                e[2],
                e[3],
                It,
                e[5]
            ]));
    }
    return Ut(r);
}
function Ht(facing) {
    let t = zt;
    let n = 1 - zt;
    switch(facing){
        case `south`:
            return [
                0,
                0,
                0,
                1,
                1,
                t
            ];
        case `east`:
            return [
                0,
                0,
                0,
                t,
                1,
                1
            ];
        case `west`:
            return [
                n,
                0,
                0,
                1,
                1,
                1
            ];
        default:
            return [
                0,
                0,
                n,
                1,
                1,
                1
            ];
    }
}
function Ut(e) {
    let t = [];
    for (let n of e){
        if (!t.some((e)=>e.every((e, t)=>e === n[t]))) {
            t.push(n);
        }
    }
    return t;
}
function Wt(e) {
    let t = [];
    for (let n of e.parts){
        if (!(n.attachmentRotation || n.attachmentMatrix)) {
            for (let e of n.elements){
                let r = Gt(Kt(e.from, e.to, n.x, n.y));
                if (r[3] - r[0] > Lt && r[4] - r[1] > Lt && r[5] - r[2] > Lt) {
                    t.push(r);
                }
            }
        }
    }
    return t;
}
function Gt(e) {
    return [
        Math.max(0, e[0]),
        Math.max(0, e[1]),
        Math.max(0, e[2]),
        Math.min(1, e[3]),
        Math.min(1, e[4]),
        Math.min(1, e[5])
    ];
}
function Kt(from, t, n, r) {
    let i = qt(from[0] / 16, from[1] / 16, from[2] / 16, n, r);
    let a = qt(t[0] / 16, t[1] / 16, t[2] / 16, n, r);
    return [
        Math.min(i[0], a[0]),
        Math.min(i[1], a[1]),
        Math.min(i[2], a[2]),
        Math.max(i[0], a[0]),
        Math.max(i[1], a[1]),
        Math.max(i[2], a[2])
    ];
}
function qt(e, t, n, r, i) {
    let a = e - 0.5;
    let o = t - 0.5;
    let s = n - 0.5;
    if (r !== 0) {
        let [e, t] = Jt(-r);
        let n = o * t - s * e;
        let i = o * e + s * t;
        o = n;
        s = i;
    }
    if (i !== 0) {
        let [e, t] = Jt(-i);
        let n = a * t + s * e;
        let r = -a * e + s * t;
        a = n;
        s = r;
    }
    return [
        a + 0.5,
        o + 0.5,
        s + 0.5
    ];
}
function Jt(e) {
    switch((e % 360 + 360) % 360){
        case 0:
            return [
                0,
                1
            ];
        case 90:
            return [
                1,
                0
            ];
        case 180:
            return [
                0,
                -1
            ];
        case 270:
            return [
                -1,
                0
            ];
        default:
            {
                let t = e * Math.PI / 180;
                return [
                    Math.sin(t),
                    Math.cos(t)
                ];
            }
    }
}
