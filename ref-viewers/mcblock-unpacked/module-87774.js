import { c as c_1 } from "./module-62035.js";
import { T } from "./module-15409.js";
import { yN } from "./module-28857.js";
import { gG } from "./module-46422.js";
import { AD } from "./module-87829.js";
function a(e, t, i) {
    return `${e},${t},${i}`;
}
export function Ru(model, t, f = "layer") {
    let c;
    let stepMeta;
    let e_blocks = model.blocks;
    if (e_blocks.length === 0) {
        return {
            variants: new Map,
            stepCount: 0,
            layerCount: 0,
            stepMeta: [],
            layerMeta: [],
            totalBlocks: 0,
            entityStepIndex: new Map,
            model
        };
    }
    let m = Infinity;
    let g = -Infinity;
    for (let e of e_blocks){
        let t = e.position[1];
        if (t < m) {
            m = t;
        }
        if (t > g) {
            g = t;
        }
    }
    let y = g - m + 1;
    let v = Array(y).fill(0);
    for (let e of e_blocks){
        e.layerIndex = e.position[1] - m;
        v[e.layerIndex]++;
    }
    if (t && t.length > 0) {
        c = t.length;
        let e = new Map;
        for(let i = 0; i < t.length; i++){
            for (let n of t[i].blocks){
                e.set(a(n.x, n.y, n.z), i);
            }
        }
        for (let t of e_blocks){
            let n = a(t.position[0], t.position[1], t.position[2]);
            t.stepIndex = e.get(n) ?? c - 1;
        }
        stepMeta = t.map((e, t)=>({
                title: e.title || `步骤 ${t + 1}`,
                description: e.description || "",
                blockCount: e.blocks.length,
                materials: [],
                entityMaterials: []
            }));
    } else {
        for (let e of (c = y, e_blocks)){
            e.stepIndex = e.layerIndex;
        }
        stepMeta = Array.from({
            length: c
        }, (e, t)=>{
            let i = m + t;
            return {
                title: `第 ${t + 1} 层 (Y=${i})`,
                description: `高度 ${i} 的所有方块`,
                blockCount: v[t] || 0,
                materials: [],
                entityMaterials: []
            };
        });
    }
    let entityStepIndex = gG(model.entities, t, c);
    let k = Array.from({
        length: y
    }, ()=>new Map);
    let x = Array.from({
        length: c
    }, ()=>new Map);
    for (let e of e_blocks){
        let t = e.layerIndex;
        let i = e.stepIndex;
        let s = c_1(e.blockId, e.properties);
        if (t != null && k[t]) {
            k[t].set(e.blockId, (k[t].get(e.blockId) || 0) + s);
        }
        if (i != null && x[i]) {
            x[i].set(e.blockId, (x[i].get(e.blockId) || 0) + s);
        }
    }
    let M = (e)=>Array.from(e.entries()).sort((e, t)=>t[1] - e[1]).map(([blockId, count])=>({
                blockId,
                count
            }));
    let w = AD(model.entities, entityStepIndex, c);
    for(let e = 0; e < stepMeta.length; e++){
        stepMeta[e].materials = M(x[e] ?? new Map);
        stepMeta[e].entityMaterials = w[e] ?? [];
    }
    let C = new Map;
    for (let e of e_blocks){
        C.set(a(e.position[0], e.position[1], e.position[2]), e);
    }
    let S = new Map;
    for (let block of e_blocks){
        let properties = yN(block, C);
        let i = ((block_1, properties_1)=>{
            let n = Object.entries(properties_1 ?? block_1.properties ?? {}).sort(([i], [n])=>i.localeCompare(n)).map(([t, i])=>`${t}=${i}`).join(",");
            if (n) {
                return `${block_1.blockId}|${n}`;
            }
            return block_1.blockId;
        })(block, properties);
        if (!S.has(i)) {
            S.set(i, {
                blockId: block.blockId,
                properties,
                instances: []
            });
        }
        S.get(i).instances.push({
            block,
            stepIndex: block.stepIndex,
            layerIndex: block.layerIndex
        });
    }
    let variants = new Map;
    for (let [e, t] of S){
        if (f === "step") {
            t.instances.sort((e, t)=>e.stepIndex - t.stepIndex || e.layerIndex - t.layerIndex);
        } else {
            t.instances.sort((e, t)=>e.layerIndex - t.layerIndex || e.stepIndex - t.stepIndex);
        }
        let instances = t.instances.map((e, instanceIndex)=>({
                block: e.block,
                stepIndex: e.stepIndex,
                layerIndex: e.layerIndex,
                instanceIndex
            }));
        let stepCumulativeCounts = Array(c).fill(0);
        for (let e of instances){
            stepCumulativeCounts[e.stepIndex]++;
        }
        for(let e = 1; e < c; e++){
            stepCumulativeCounts[e] += stepCumulativeCounts[e - 1];
        }
        let layerCumulativeCounts = Array(y).fill(0);
        for (let e of instances){
            layerCumulativeCounts[e.layerIndex]++;
        }
        for(let e = 1; e < y; e++){
            layerCumulativeCounts[e] += layerCumulativeCounts[e - 1];
        }
        let visualProfile = T(t.blockId, t.properties);
        variants.set(e, {
            variantKey: e,
            blockId: t.blockId,
            properties: t.properties,
            instances,
            stepCumulativeCounts,
            layerCumulativeCounts,
            needsAlphaTest: visualProfile.needsAlphaTest,
            needsTransparent: visualProfile.needsTransparent,
            needsEmissive: visualProfile.needsEmissive,
            emissiveColor: visualProfile.emissiveColor,
            visualProfile
        });
    }
    let layerMeta = Array.from({
        length: y
    }, (e, t)=>({
            y: m + t,
            blockCount: v[t] || 0,
            materials: M(k[t] ?? new Map)
        }));
    return {
        variants,
        stepCount: c,
        layerCount: y,
        stepMeta,
        layerMeta,
        totalBlocks: e_blocks.length,
        entityStepIndex,
        model
    };
}
