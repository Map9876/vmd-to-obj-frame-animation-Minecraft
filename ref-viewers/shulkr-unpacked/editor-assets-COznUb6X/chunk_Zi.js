import { _ } from "./chunk_go.js";
import { j } from "./chunk_ee.js";
import { ea, ia } from "./chunk_ea.js";
export const Zi = `26.3`;
export const Qi = Zi;
const $i = {
    x: 0,
    y: 0,
    z: 0
};
function ta(e, t, n = $i) {
    for (let r of e.blocks.values()){
        let e = ea(r);
        let i = r.pos.x + n.x;
        let a = r.pos.y + n.y;
        let o = r.pos.z + n.z;
        t.setBlock(i, a, o, e);
        if (r.blockEntity) {
            t.setBlockEntity(i, a, o, r.blockEntity);
        }
        if (r.debug?.rawBlockEntity !== undefined) {
            t.setRawBlockEntity(i, a, o, r.debug.rawBlockEntity);
        }
    }
}
export function na(e) {
    let t = new j;
    ta(e, t);
    return t;
}
export function aa(e) {
    let t = new j;
    let n = e.computeBounds();
    if (!n) {
        return t;
    }
    let r = n.max.z - n.min.z + 1;
    e.forEachBlock((i, a, o, s)=>{
        let c = i - n.min.x;
        let l = a - n.min.y;
        let u = o - n.min.z;
        let d = r - 1 - u;
        let f = c;
        let p = _({
            id: s.id,
            properties: ia(s.properties)
        });
        t.setBlock(d, l, f, p);
        let m = e.getBlockEntity(i, a, o);
        if (m) {
            t.setBlockEntity(d, l, f, m);
        }
    });
    return t;
}
