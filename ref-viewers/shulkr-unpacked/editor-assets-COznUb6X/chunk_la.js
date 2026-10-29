import { sr } from "./chunk_sr.js";
const la = 0.000001;
const ua = (e, t)=>Math.abs(e[0] - t[0]) < la && Math.abs(e[1] - t[1]) < la && Math.abs(e[2] - t[2]) < la;
const da = [
    0,
    90,
    180,
    270
];
const fa = [
    [
        1,
        0,
        0
    ],
    [
        0,
        1,
        0
    ],
    [
        0,
        0,
        1
    ]
];
export function pa(e) {
    let t = fa.map(e);
    for (let x of da){
        for (let y of da){
            for (let z of da){
                if (fa.every((i, a)=>ua(sr(i, x, y, z), t[a]))) {
                    return {
                        model: ``,
                        ...x ? {
                            x
                        } : {},
                        ...y ? {
                            y
                        } : {},
                        ...z ? {
                            z
                        } : {}
                    };
                }
            }
        }
    }
    return {
        model: ``
    };
}
export function ma(e) {
    return ({
        south: 0,
        west: 90,
        north: 180,
        east: 270,
        up: 0,
        down: 0
    })[e];
}
