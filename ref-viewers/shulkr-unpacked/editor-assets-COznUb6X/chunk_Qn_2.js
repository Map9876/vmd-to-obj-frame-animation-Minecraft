export const Qn = {
    down: [
        0,
        -1,
        0
    ],
    up: [
        0,
        1,
        0
    ],
    north: [
        0,
        0,
        -1
    ],
    south: [
        0,
        0,
        1
    ],
    west: [
        -1,
        0,
        0
    ],
    east: [
        1,
        0,
        0
    ]
};
const $n = (e)=>e * Math.PI / 180;
const er = (e)=>Math.abs(e % 90) < 0.000001;
export function tr(e, t, n = 0) {
    return er(e) && er(t) && er(n);
}
export function nr([i, a, o], t, n, r = 0) {
    let s = (e, t)=>{
        if (e === 0) {
            return;
        }
        let n = -$n(e);
        t(Math.cos(n), Math.sin(n));
    };
    s(t, (e, t)=>{
        let n = a * e - o * t;
        let r = a * t + o * e;
        a = n;
        o = r;
    });
    s(n, (e, t)=>{
        let n = i * e + o * t;
        let r = -i * t + o * e;
        i = n;
        o = r;
    });
    s(r, (e, t)=>{
        let n = i * e - a * t;
        let r = i * t + a * e;
        i = n;
        a = r;
    });
    return [
        i,
        a,
        o
    ];
}
export function ir(e, t) {
    let n = [
        t.origin[0] / 16,
        t.origin[1] / 16,
        t.origin[2] / 16
    ];
    let r = $n(t.x);
    let i = $n(t.y);
    let a = $n(t.z);
    let o = Math.max(Math.abs(r), Math.abs(i), Math.abs(a));
    let s = t.rescale && o !== 0 ? 1 / Math.cos(o) : 1;
    for (let t of e){
        let e = t[0] - n[0];
        let o = t[1] - n[1];
        let c = t[2] - n[2];
        if (r !== 0) {
            let e = Math.cos(r);
            let t = Math.sin(r);
            let n = o;
            let i = c;
            o = n * e - i * t;
            c = n * t + i * e;
        }
        if (i !== 0) {
            let t = Math.cos(i);
            let n = Math.sin(i);
            let r = e;
            let a = c;
            e = r * t + a * n;
            c = -r * n + a * t;
        }
        if (a !== 0) {
            let t = Math.cos(a);
            let n = Math.sin(a);
            let r = e;
            let i = o;
            e = r * t - i * n;
            o = r * n + i * t;
        }
        t[0] = e * s + n[0];
        t[1] = o * s + n[1];
        t[2] = c * s + n[2];
    }
}
export const ar = [
    0.5,
    0.5,
    0.5
];
