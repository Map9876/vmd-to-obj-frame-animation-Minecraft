import { G } from "./chunk_kc.js";
import { q } from "./chunk_Rc.js";
import { Jg } from "./chunk_Jg.js";
const Ug = new G;
export function Wg() {
    q.getLuminanceCoefficients(Ug);
    return [
        `float luminance( const in vec3 rgb ) {`,
        `	const vec3 weights = vec3( ${Ug.x.toFixed(4)}, ${Ug.y.toFixed(4)}, ${Ug.z.toFixed(4)} );`,
        `	return dot( weights, rgb );`,
        `}`
    ].join(`
`);
}
export function Gg(e) {
    return [
        e.extensionClipCullDistance ? `#extension GL_ANGLE_clip_cull_distance : require` : ``,
        e.extensionMultiDraw ? `#extension GL_ANGLE_multi_draw : require` : ``
    ].filter(Jg).join(`
`);
}
export function Kg(e) {
    let t = [];
    for(let n in e){
        let r = e[n];
        if (r !== false) {
            t.push(`#define ` + n + ` ` + r);
        }
    }
    return t.join(`
`);
}
export function qg(e, t) {
    let n = {};
    let r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
    for(let i = 0; i < r; i++){
        let r = e.getActiveAttrib(t, i);
        let a = r.name;
        let locationSize = 1;
        if (r.type === e.FLOAT_MAT2) {
            locationSize = 2;
        }
        if (r.type === e.FLOAT_MAT3) {
            locationSize = 3;
        }
        if (r.type === e.FLOAT_MAT4) {
            locationSize = 4;
        }
        n[a] = {
            type: r.type,
            location: e.getAttribLocation(t, a),
            locationSize
        };
    }
    return n;
}
