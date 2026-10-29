import { D, N } from "../dist-C5TDMOul.js";
export function sv(e, t) {
    let e_dimensions = e.dimensions;
    let r = e_dimensions ? e_dimensions.x * e_dimensions.y * e_dimensions.z : 0;
    let i = D[t];
    return r > 0 && r <= i.maxVolume && (e.blockCount ?? 0) <= i.maxBlockCount;
}
export function cv(e) {
    return N.map((format)=>({
            format,
            available: sv(e, format)
        }));
}
