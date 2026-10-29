import { Y, cl } from "./chunk_Vc.js";
export const Hm = {
    r: 0,
    b: 0,
    g: 0
};
export const Um = new cl;
export const Wm = new Y;
const t_ = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
export function n_(e) {
    return e.replace(t_, r_);
}
function r_(e, t, n, r) {
    let i = ``;
    for(let e = parseInt(t); e < parseInt(n); e++){
        i += r.replace(/\[\s*i\s*\]/g, `[ ` + e + ` ]`).replace(/UNROLLED_LOOP_INDEX/g, e);
    }
    return i;
}
export function i_(e) {
    let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;
    if (e.precision === `highp`) {
        t += `
#define HIGH_PRECISION`;
    } else if (e.precision === `mediump`) {
        t += `
#define MEDIUM_PRECISION`;
    } else if (e.precision === `lowp`) {
        t += `
#define LOW_PRECISION`;
    }
    return t;
}
