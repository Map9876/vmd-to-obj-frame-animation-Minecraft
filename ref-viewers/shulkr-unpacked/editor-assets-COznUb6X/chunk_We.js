import { at } from "./chunk_at.js";
export const We = 4;
export const Ge = 10;
export const Ke = 8;
export const qe = 4;
export const Je = 16 / 96;
export const Ye = 0.05;
export const Xe = {
    white: 16777215,
    orange: 16351261,
    magenta: 13061821,
    light_blue: 3847130,
    yellow: 16701501,
    lime: 8439583,
    pink: 15961002,
    gray: 4673362,
    light_gray: 10329495,
    cyan: 1481884,
    purple: 8991416,
    blue: 3949738,
    brown: 8606770,
    green: 6192150,
    red: 11546150,
    black: 0
};
export const Ze = new WeakMap;
export const tt = {
    south: 0,
    west: 90,
    north: 180,
    east: 270
};
export function nt(e, t) {
    if (e.endsWith(`_wall_sign`)) {
        let yaw = tt[t.facing ?? `south`];
        if (yaw === undefined) {
            return null;
        }
        return {
            centerY: 8.5,
            frontZ: 2,
            centerZ: 1,
            yaw
        };
    }
    if (e.endsWith(`_sign`)) {
        let e = Number.parseInt(t.rotation ?? `0`, 10);
        if (Number.isFinite(e)) {
            return {
                centerY: 12,
                frontZ: 9,
                centerZ: 8,
                yaw: (e & 15) * 22.5
            };
        }
        return null;
    }
    return null;
}
export const rt = [
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
export function it(e, t) {
    let n = Array(16).fill(0);
    for(let r = 0; r < 4; r++){
        for(let i = 0; i < 4; i++){
            let a = 0;
            for(let n = 0; n < 4; n++){
                a += e[r * 4 + n] * t[n * 4 + i];
            }
            n[r * 4 + i] = a;
        }
    }
    return n;
}
export function ot(e) {
    let t = -e * Math.PI / 180;
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
}
export function st(e, t, n, r) {
    return it(at(t, n, r), it(e, at(-t, -n, -r)));
}
