export const p8 = 0.000001;
export const tb = typeof Float32Array !== "undefined" ? Float32Array : Array;
const i = Math.PI / 180;
export function DF(e) {
    return e * i;
}
