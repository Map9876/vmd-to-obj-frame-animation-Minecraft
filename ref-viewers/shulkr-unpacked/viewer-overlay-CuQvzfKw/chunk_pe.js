import { n, s } from "../jsx-runtime-Db0DjQYK.js";
import { f } from "../current-Bq9r6xhE.js";
import { t } from "../createLucideIcon-BB7uFOth.js";
export const pe = t(`pause`, [
    [
        `rect`,
        {
            x: `14`,
            y: `3`,
            width: `5`,
            height: `18`,
            rx: `1`,
            key: `kaeet6`
        }
    ],
    [
        `rect`,
        {
            x: `5`,
            y: `3`,
            width: `5`,
            height: `18`,
            rx: `1`,
            key: `1wsw3u`
        }
    ]
]);
export const me = t(`scan-box`, [
    [
        `path`,
        {
            d: `M12 12v5.5`,
            key: `1fezw7`
        }
    ],
    [
        `path`,
        {
            d: `M17 3h2a2 2 0 012 2v2`,
            key: `sxhzt8`
        }
    ],
    [
        `path`,
        {
            d: `M21 17v2a2 2 0 01-2 2h-2`,
            key: `b4b27w`
        }
    ],
    [
        `path`,
        {
            d: `M3 7V5a2 2 0 012-2h2`,
            key: `5quapj`
        }
    ],
    [
        `path`,
        {
            d: `M7 21H5a2 2 0 01-2-2v-2`,
            key: `rx7q13`
        }
    ],
    [
        `path`,
        {
            d: `M7.264 9.252 12 12l4.737-2.748`,
            key: `176tmc`
        }
    ],
    [
        `path`,
        {
            d: `M7.995 8.514A2 2 0 007 10.244v3.516a2 2 0 00.996 1.73l3 1.74a2 2 0 002.008 0l3-1.74A2 2 0 0017 13.76v-3.517a2 2 0 00-.995-1.73l-3-1.742a2 2 0 00-1.892-.064z`,
            key: `7zy66p`
        }
    ]
]);
export const z = s(n(), 1);
export const he = s(f(), 1);
export const B = (e, t, n, r)=>(n * e.dz + r) * e.dx + t;
const ge = (e, t)=>t % e.dx;
const _e = (e, t)=>Math.floor(t / e.dx) % e.dz;
const ve = (e, t)=>Math.floor(t / (e.dx * e.dz));
export function V(e, t) {
    return {
        x: ge(e, t),
        y: ve(e, t),
        z: _e(e, t)
    };
}
