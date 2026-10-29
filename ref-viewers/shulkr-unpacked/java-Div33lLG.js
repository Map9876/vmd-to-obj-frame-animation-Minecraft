import { f, l, n, p, s } from "./java-Div33lLG/chunk_n.js";
import { n as n_1, t } from "./registry-BETwVLpc.js";
function m(r, i) {
    if (!n(r)) {
        return {};
    }
    let blockEntity = {};
    let o = s(r);
    if (o !== undefined) {
        blockEntity.customName = o;
    }
    let c = l(r);
    if (c !== undefined) {
        blockEntity.items = c;
    }
    let u = f(r);
    if (u !== undefined) {
        blockEntity.sign = u;
    }
    let d = p(r);
    if (d !== undefined) {
        blockEntity.loot = d;
    }
    let m = n_1(i);
    if (m) {
        Object.assign(blockEntity, m.extract(r));
    }
    let residual = t(r, i);
    return {
        ...Object.keys(blockEntity).length > 0 ? {
            blockEntity
        } : {},
        ...residual ? {
            residual
        } : {}
    };
}
export { m as t };
