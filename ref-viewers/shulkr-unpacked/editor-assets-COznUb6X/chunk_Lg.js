import { K } from "./chunk_kc.js";
import { B } from "./chunk_$s.js";
import { Gs, Ws } from "./chunk_go.js";
import { q } from "./chunk_Rc.js";
const Lg = new K;
function Rg(e) {
    q._getMatrix(Lg, q.workingColorSpace, e);
    let t = `mat3( ${Lg.elements.map((e)=>e.toFixed(4))} )`;
    switch(q.getTransfer(e)){
        case Ws:
            return [
                t,
                `LinearTransferOETF`
            ];
        case Gs:
            return [
                t,
                `sRGBTransferOETF`
            ];
        default:
            B(`WebGLProgram: Unsupported color space: `, e);
            return [
                t,
                `LinearTransferOETF`
            ];
    }
}
export function Bg(e, t) {
    let n = Rg(t);
    return [
        `vec4 ${e}( vec4 value ) {`,
        `	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,
        `}`
    ].join(`
`);
}
