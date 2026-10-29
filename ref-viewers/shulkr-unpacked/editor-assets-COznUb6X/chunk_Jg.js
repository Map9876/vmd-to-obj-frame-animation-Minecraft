import { B } from "./chunk_$s.js";
import { Q } from "./chunk_Gm.js";
export function Jg(e) {
    return e !== ``;
}
export function Yg(e, t) {
    let n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
    return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
export function Xg(e, t) {
    return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const Zg = /^[ \t]*#include +<([\w\d./]+)>/gm;
export function Qg(e) {
    return e.replace(Zg, e_);
}
const $g = new Map;
function e_(e, t) {
    let n = Q[t];
    if (n === undefined) {
        let e = $g.get(t);
        if (e !== undefined) {
            n = Q[e];
            B(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`, t, e);
        } else {
            throw Error(`Can not resolve #include <` + t + `>`);
        }
    }
    return Qg(n);
}
