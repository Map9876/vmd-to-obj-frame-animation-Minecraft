import { D9, a9, d, nK } from "./module-46397.js";
import { FG } from "./module-23922.js";
const o = require(49745);
export function T(blockId, t = {}) {
    let { alphaMode, needsAlphaTest, needsTransparent } = FG(blockId);
    let r = D9(blockId, t);
    let needsEmissive = a9(blockId, nK) && r.needsEmissive;
    if (t[o.LN] && o.CZ(blockId)) {
        return {
            blockId,
            properties: {
                ...t
            },
            alphaMode: "cutout",
            needsAlphaTest: true,
            needsDoubleSide: true,
            needsTransparent: false,
            needsEmissive: false,
            emissiveColor: null,
            emissiveIntensityMultiplier: r.intensityMultiplier,
            emissiveLuminanceThreshold: r.luminanceThreshold,
            emissiveLuminanceSoftness: r.luminanceSoftness,
            alphaTest: 0.1,
            transparent: true,
            opacity: 1,
            highlightedOpacity: 1,
            depthWrite: true,
            polygonOffset: true,
            polygonOffsetFactor: -1,
            polygonOffsetUnits: -1,
            forceSinglePass: true
        };
    }
    return {
        blockId,
        properties: {
            ...t
        },
        alphaMode,
        needsAlphaTest,
        needsDoubleSide: d(blockId),
        needsTransparent,
        needsEmissive,
        emissiveColor: r.color,
        emissiveIntensityMultiplier: r.intensityMultiplier,
        emissiveLuminanceThreshold: r.luminanceThreshold,
        emissiveLuminanceSoftness: r.luminanceSoftness,
        alphaTest: 0.1 * !!needsAlphaTest,
        transparent: needsTransparent,
        opacity: needsTransparent ? 0.7 : 1,
        highlightedOpacity: needsTransparent ? 0.85 : 1,
        depthWrite: true,
        polygonOffset: needsAlphaTest,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
        forceSinglePass: needsAlphaTest
    };
}
export function a(e, t) {
    if (t === "legacy") {
        return e;
    }
    let n = e.blockId.replace(/^minecraft:/, "");
    let i = n === "water" || n === "flowing_water" || n === "bubble_column" || n === "glass" || n === "glass_pane" || n === "tinted_glass" || n.endsWith("_stained_glass") || n.endsWith("_stained_glass_pane") || n === "ice" || n === "frosted_ice" || n === "honey_block" || n === "slime_block";
    let a = t === "cutout" || t === "blend-cutout";
    let o = t === "blend" || t === "blend-cutout" || i;
    return {
        ...e,
        alphaMode: o ? "blend" : a ? "cutout" : "opaque",
        needsAlphaTest: a,
        needsTransparent: o,
        alphaTest: 0.1 * !!a,
        transparent: o,
        opacity: i ? 0.7 : 1,
        highlightedOpacity: i ? 0.85 : 1,
        polygonOffset: a,
        forceSinglePass: a
    };
}
