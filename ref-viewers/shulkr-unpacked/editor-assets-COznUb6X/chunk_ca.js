import { ma, pa } from "./chunk_la.js";
import { va } from "./chunk_va.js";
export function ca(e, t, n) {
    let r = n * Math.PI / 180;
    let i = Math.cos(r);
    let a = Math.sin(r);
    let [o, s, c] = e;
    if (t === `x`) {
        return [
            o,
            s * i - c * a,
            s * a + c * i
        ];
    }
    if (t === `y`) {
        return [
            o * i + c * a,
            s,
            -o * a + c * i
        ];
    }
    return [
        o * i - s * a,
        o * a + s * i,
        c
    ];
}
function ha(e) {
    if (e === `up`) {
        return 90;
    }
    if (e === `down`) {
        return 270;
    }
    return 0;
}
export function ga(e) {
    let t = ma(e);
    let n = ha(e);
    return (e)=>ca(ca(e, `x`, n), `y`, t);
}
export function _a(e, t) {
    return {
        ...pa(ga(t)),
        model: e
    };
}
export function ya(e, t) {
    let { x, y } = va[t];
    return {
        ...pa((e)=>ca(ca(e, `x`, -x), `y`, -y)),
        model: e
    };
}
export function ba(e) {
    let { x, y } = va[e];
    return {
        ...pa((e)=>ca(ca(e, `x`, -x), `y`, -y)),
        model: `create:block/water_wheel/wheel`
    };
}
export function xa(e, t) {
    if (t === `sideways`) {
        return (e)=>e;
    }
    if (e === `east` || e === `west`) {
        return (e)=>ca(e, `x`, 90);
    }
    return (e)=>ca(e, `z`, 90);
}
export function Sa(e, t) {
    let n = t === `upward`;
    let r = t === `downward`;
    let i = n || r;
    let a = t === `sideways`;
    let o = t === `vertical`;
    let s = e === `east` || e === `west`;
    let c = e === `north` || e === `south`;
    let l = (!i && t !== `horizontal` ? 90 : 0) + (r ? 180 : 0) + (a ? 90 : 0) + (o && c ? 180 : 0);
    let u = ma(e) + (i !== s && !r ? 180 : 0) + (a && c ? 180 : 0) + (o && s ? 90 : 0);
    let d = (a ? 90 : 0) + (o && s ? 90 : 0);
    return (e)=>ca(ca(ca(e, `z`, d), `y`, u), `x`, l);
}
