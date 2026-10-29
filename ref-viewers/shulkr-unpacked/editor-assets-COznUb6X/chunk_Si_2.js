import { Yn } from "./chunk_Wn.js";
import { Bi, Gi, Ui } from "./chunk_Ii.js";
import { Hi } from "./chunk_Vi.js";
const Si = new Set([
    `glass`,
    `tinted_glass`,
    `ice`,
    `packed_ice`,
    `blue_ice`,
    `frosted_ice`,
    `slime_block`,
    `honey_block`
]);
export function Ci(e) {
    if (e === `water` || e === `lava` || Si.has(e) || e.endsWith(`_stained_glass`)) {
        return e;
    }
    return null;
}
export function wi(e) {
    return Si.has(e) || e.endsWith(`_stained_glass`) || e.endsWith(`_leaves`);
}
export const Ti = (e, t, n, r)=>(e * r + t) * r + n;
export async function Ki(e, t, n = []) {
    let r = await Bi(e);
    let i = [
        ...new Set(t)
    ].filter((e)=>e && e !== `minecraft`);
    if (i.length > 0) {
        let t = await Promise.all(i.map((t)=>Ui(e, t)));
        for (let e of t){
            if (e) {
                Hi(r, e);
            }
        }
    }
    if (n.length > 0) {
        (await Promise.all(n.map((t)=>Gi(e, t.id)))).forEach((e, t)=>{
            if (e) {
                Yn(r, e, n[t].options);
            }
        });
    }
    return r;
}
