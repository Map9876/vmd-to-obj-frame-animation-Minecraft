import { a } from "../jsx-runtime-Db0DjQYK.js";
export const U_ = 4410944;
export const W_ = 64 * 1024 * 1024;
export const G_ = 640 * 1024 * 1024;
export class K_ extends Error {
    constructor(e){
        super(e);
        this.name = `SchematicTooLargeError`;
    }
}
export function q_(e) {
    return e instanceof K_ || e instanceof Error && e.name === `SchematicTooLargeError`;
}
export function J_(e, t, n) {
    if ([
        e,
        t,
        n
    ].some((e)=>!Number.isInteger(e) || e < 0)) {
        throw new K_(`Invalid schematic dimensions (${e}×${t}×${n}).`);
    }
    if (e * t * n > 4410944) {
        throw new K_(`This schematic is too large: at most ${U_.toLocaleString(`en-US`)} blocks (got ${(e * t * n).toLocaleString(`en-US`)}).`);
    }
}
export function Y_(e) {
    if (!Array.isArray(e.entries)) {
        throw new K_(`This build file is corrupt: no block data.`);
    }
    if (e.entries.length > 4410944) {
        throw new K_(`This schematic is too large: at most ${U_.toLocaleString(`en-US`)} blocks (got ${e.entries.length.toLocaleString(`en-US`)}).`);
    }
    let { min, max } = e.bounds ?? {};
    if (!min || !max) {
        throw new K_(`This build file is corrupt: no bounds.`);
    }
    J_(max.x - min.x + 1, max.y - min.y + 1, max.z - min.z + 1);
}
