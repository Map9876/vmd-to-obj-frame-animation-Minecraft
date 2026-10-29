import { B } from "./chunk_$s.js";
const Vg = {
    1: `Linear`,
    2: `Reinhard`,
    3: `Cineon`,
    4: `ACESFilmic`,
    6: `AgX`,
    7: `Neutral`,
    5: `Custom`
};
export function Hg(e, t) {
    let n = Vg[t];
    if (n === undefined) {
        B(`WebGLProgram: Unsupported toneMapping:`, t);
        return `vec3 ` + e + `( vec3 color ) { return LinearToneMapping( color ); }`;
    }
    return `vec3 ` + e + `( vec3 color ) { return ` + n + `ToneMapping( color ); }`;
}
