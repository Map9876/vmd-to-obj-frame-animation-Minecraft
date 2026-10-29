import { Cr, kr } from "./chunk_vr.js";
import { Mr } from "./chunk_Mr.js";
export const si = 2147483647;
export class ci {
    constructor(){
        this.data = new Float32Array(1024);
        this.length = 0;
    }
    reserve(e) {
        if (this.length + e <= this.data.length) {
            return;
        }
        let t = this.data.length * 2;
        while(t < this.length + e){
            t *= 2;
        }
        let n = new Float32Array(t);
        n.set(this.data.subarray(0, this.length));
        this.data = n;
    }
    push1(e) {
        this.reserve(1);
        this.data[this.length++] = e;
    }
    push2(e, t) {
        this.reserve(2);
        this.data[this.length++] = e;
        this.data[this.length++] = t;
    }
    push3(e, t, n) {
        this.reserve(3);
        this.data[this.length++] = e;
        this.data[this.length++] = t;
        this.data[this.length++] = n;
    }
    finish() {
        return this.data.slice(0, this.length);
    }
}
export const li = 0.3;
export const ui = [
    [
        `down`,
        0,
        -1,
        0
    ],
    [
        `up`,
        0,
        1,
        0
    ],
    [
        `north`,
        0,
        0,
        -1
    ],
    [
        `south`,
        0,
        0,
        1
    ],
    [
        `west`,
        -1,
        0,
        0
    ],
    [
        `east`,
        1,
        0,
        0
    ]
];
export const di = [
    1,
    0.7,
    0.5,
    0.2
];
export const fi = [
    [
        1,
        -1,
        0,
        2
    ],
    [
        1,
        1,
        0,
        2
    ],
    [
        2,
        -1,
        0,
        1
    ],
    [
        2,
        1,
        0,
        1
    ],
    [
        0,
        -1,
        2,
        1
    ],
    [
        0,
        1,
        2,
        1
    ]
];
const bi = {
    north: [
        0,
        -1
    ],
    south: [
        0,
        1
    ],
    west: [
        -1,
        0
    ],
    east: [
        1,
        0
    ]
};
export function xi(e, t, n, r, i, a, o, s, c, l, u) {
    let r_type = r.type;
    let f = (e, t, n)=>t >= a && t < i && u(e, t, n)?.type === r_type;
    let p = (e, t, n, r)=>{
        if (f(e, t + 1, n)) {
            return 16;
        }
        return kr(r.level);
    };
    let height = p(e, t, n, r);
    let corners = Mr(height / 16, (r, o)=>{
        if (s(e + r, t, n + o)) {
            return -1;
        }
        let c = t >= a && t < i ? u(e + r, t, n + o) : null;
        if (!c || c.type !== r_type) {
            return 0;
        }
        return p(e + r, t, n + o, c) / 16;
    });
    let g = r.level >= 8;
    let _ = g ? 0 : r.level;
    let v = g || r.level >= 1 && r.level <= 7;
    let culled = new Set;
    let b = corners.nw >= 16 && corners.ne >= 16 && corners.se >= 16 && corners.sw >= 16;
    if (f(e, t + 1, n) || o(e, t + 1, n) && b) {
        culled.add(`up`);
    }
    if (f(e, t - 1, n) || o(e, t - 1, n)) {
        culled.add(`down`);
    }
    let x = 0;
    let S = 0;
    let C = v;
    let w = {
        north: 0,
        south: 0,
        east: 0,
        west: 0
    };
    for (let r of Cr){
        let [s, c] = bi[r];
        if (o(e + s, t, n + c)) {
            culled.add(r);
        }
        let f = t >= a && t < i ? u(e + s, t, n + c) : null;
        if (f && f.type === r_type) {
            let i = p(e + s, t, n + c, f);
            if (i >= height) {
                culled.add(r);
            } else if (i > 0) {
                w[r] = i;
                C = true;
            }
            if (v || i < height && i > 0) {
                let e = f.level >= 8 ? 0 : f.level;
                x += s * (e - _);
                S += c * (e - _);
            }
        } else {
            if (v && l(e + s, t, n + c) === null) {
                x += s;
                S += c;
            }
        }
    }
    let T = x !== 0 || S !== 0;
    let flowAngle = C && T ? -Math.atan2(x, S) : 0;
    let topFlow = C && !g && (r.level > 0 && r.level < 8 || T);
    let sides = {};
    for (let i of Cr){
        let [a, o] = bi[i];
        let sprite = r_type === `water` && c(e + a, t, n + o) ? `overlay` : r.level > 0 || w[i] > 0 ? `flow` : `still`;
        sides[i] = {
            clipY: w[i],
            sprite
        };
    }
    let k = r.waterlogged ? 0.1 : 0.05;
    return {
        spec: {
            height,
            topFlow,
            flowAngle,
            sides,
            footprint: {
                minX: f(e - 1, t, n) ? 0 : k,
                maxX: f(e + 1, t, n) ? 16 : 16 - k,
                minZ: f(e, t, n - 1) ? 0 : k,
                maxZ: f(e, t, n + 1) ? 16 : 16 - k,
                bottomY: f(e, t - 1, n) ? 0 : k
            }
        },
        corners,
        culled
    };
}
