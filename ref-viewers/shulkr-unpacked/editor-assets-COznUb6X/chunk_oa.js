import { l as l_1 } from "../blockStateParser-3kR-Ucao.js";
import { Qi as mcVersion } from "./chunk_Zi.js";
export function oa(e, t = `schem`) {
    let n = new Map;
    e.forEachBlock((t, r, i, o)=>{
        let s = e.getBlockEntity(t, r, i);
        n.set(l_1(t, r, i), {
            namespace: o.namespace,
            name: o.name,
            id: o.id,
            pos: {
                x: t,
                y: r,
                z: i
            },
            properties: {
                ...o.properties
            },
            stateKey: o.stateKey,
            ...s ? {
                blockEntity: s
            } : {}
        });
    });
    return {
        mcVersion,
        sourceFormat: t,
        blocks: n,
        bounds: e.computeBounds() ?? {
            min: {
                x: 0,
                y: 0,
                z: 0
            },
            max: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    };
}
export function sa(e, t, n = `schem`) {
    let r = new Map;
    e.forEachInRegion(t, (n, i, o, s)=>{
        let c = n - t.min.x;
        let l = i - t.min.y;
        let u = o - t.min.z;
        let d = e.getBlockEntity(n, i, o);
        r.set(l_1(c, l, u), {
            namespace: s.namespace,
            name: s.name,
            id: s.id,
            pos: {
                x: c,
                y: l,
                z: u
            },
            properties: {
                ...s.properties
            },
            stateKey: s.stateKey,
            ...d ? {
                blockEntity: d
            } : {}
        });
    });
    return {
        mcVersion,
        sourceFormat: n,
        blocks: r,
        bounds: {
            min: {
                x: 0,
                y: 0,
                z: 0
            },
            max: {
                x: t.max.x - t.min.x,
                y: t.max.y - t.min.y,
                z: t.max.z - t.min.z
            }
        }
    };
}
