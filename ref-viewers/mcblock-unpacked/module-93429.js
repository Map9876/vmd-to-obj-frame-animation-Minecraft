import { NS } from "./module-37578.js";
export function o(e) {
    let regions = NS(e).map((e)=>({
            sourceU0: e.sourceU0,
            sourceV0: e.sourceV0,
            sourceU1: e.sourceU1,
            sourceV1: e.sourceV1,
            maskU0: e.maskU0,
            maskV0: e.maskV0,
            maskU1: e.maskU1,
            maskV1: e.maskV1
        }));
    if (regions.length === 0) {
        return null;
    }
    return {
        regions
    };
}
