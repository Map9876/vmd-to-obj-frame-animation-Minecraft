import { G } from "./chunk_kc.js";
export function Mv(e) {
    return (t)=>{
        if (e) {
            e.updateWorldMatrix(true, true);
            e.traverse((e)=>{
                let n = e.geometry?.getAttribute(`position`);
                if (!n) {
                    return;
                }
                let e_matrixWorld = e.matrixWorld;
                for(let e = 0; e < n.count; e++){
                    Nv.set(n.getX(e), n.getY(e), n.getZ(e)).applyMatrix4(e_matrixWorld);
                    t(Nv.x, Nv.y, Nv.z);
                }
            });
        }
    };
}
var Nv = new G;
export function Pv(e, t) {
    return (n)=>{
        for (let r of [
            e.x,
            t.x
        ]){
            for (let i of [
                e.y,
                t.y
            ]){
                for (let a of [
                    e.z,
                    t.z
                ]){
                    n(r, i, a);
                }
            }
        }
    };
}
