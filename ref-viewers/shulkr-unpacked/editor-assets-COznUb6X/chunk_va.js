import { Qa } from "./chunk_Qa.js";
export const va = {
    up: {
        x: 0,
        y: 0
    },
    down: {
        x: 180,
        y: 0
    },
    north: {
        x: 90,
        y: 0
    },
    south: {
        x: 90,
        y: 180
    },
    east: {
        x: 90,
        y: 90
    },
    west: {
        x: 90,
        y: 270
    }
};
const up = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
];
function Na(e, t) {
    let n = Array(16).fill(0);
    for(let r = 0; r < 4; r++){
        for(let i = 0; i < 4; i++){
            for(let a = 0; a < 4; a++){
                n[r * 4 + i] += e[r * 4 + a] * t[a * 4 + i];
            }
        }
    }
    return n;
}
export function Pa(...e) {
    return e.reduce((acc, item)=>Na(item, acc), up);
}
export function Fa(...e) {
    return e.reduce((acc, item)=>Na(acc, item), up);
}
export const Ia = (e, t, n)=>[
        1,
        0,
        0,
        e,
        0,
        1,
        0,
        t,
        0,
        0,
        1,
        n,
        0,
        0,
        0,
        1
    ];
export const La = (e)=>{
    let t = e * Math.PI / 180;
    let n = Math.cos(t);
    let r = Math.sin(t);
    return [
        1,
        0,
        0,
        0,
        0,
        n,
        -r,
        0,
        0,
        r,
        n,
        0,
        0,
        0,
        0,
        1
    ];
};
export const Ra = (e)=>{
    let t = e * Math.PI / 180;
    let n = Math.cos(t);
    let r = Math.sin(t);
    return [
        n,
        0,
        r,
        0,
        0,
        1,
        0,
        0,
        -r,
        0,
        n,
        0,
        0,
        0,
        0,
        1
    ];
};
export const za = (e)=>{
    let t = e * Math.PI / 180;
    let n = Math.cos(t);
    let r = Math.sin(t);
    return [
        n,
        -r,
        0,
        0,
        r,
        n,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
export const Ba = (...e)=>Pa(Ia(-0.5, -0.5, -0.5), ...e, Ia(0.5, 0.5, 0.5));
export const Va = {
    up: `down`,
    down: `up`,
    north: `south`,
    south: `north`,
    east: `west`,
    west: `east`
};
export const Ha = {
    up,
    down: La(180),
    north: Na(La(90), za(180)),
    south: La(90),
    west: Na(La(90), za(90)),
    east: Na(La(90), za(270))
};
export const Ua = (e)=>{
    if (e === `up` || e === `down`) {
        return 0;
    }
    let t = Qa[e];
    if (e === `east` || e === `west`) {
        return -t;
    }
    return t;
};
export const Wa = (e)=>{
    if (e === `up`) {
        return -90;
    }
    if (e === `down`) {
        return 90;
    }
    return 0;
};
