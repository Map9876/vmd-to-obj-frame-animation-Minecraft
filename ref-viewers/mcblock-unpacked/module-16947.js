import { aI } from "./module-50923.js";
import { Tl, vt } from "./module-85250.js";
import { IX, Mi, OP } from "./module-82084.js";
import { e as e_1 } from "./module-31206.js";
import { y } from "./module-21337.js";
export class v {
    gl;
    structure;
    resources;
    chunks = [];
    chunkSize;
    constructor(e, t, r, s = 16){
        this.gl = e;
        this.structure = t;
        this.resources = r;
        this.chunkSize = typeof s === "number" ? [
            s,
            s,
            s
        ] : s;
        this.updateStructureBuffers();
    }
    setStructure(e) {
        this.structure = e;
        this.updateStructureBuffers();
    }
    updateStructureBuffers(e) {
        if (this.structure) {
            for (let t of (e ? e.forEach((e)=>{
                let t = this.getChunk(e);
                t.mesh.clear();
                t.transparentMesh.clear();
            }) : this.chunks.forEach((e)=>e.forEach((e)=>e.forEach((e)=>{
                        e.mesh.clear();
                        e.transparentMesh.clear();
                    }))), this.structure.getBlocks())){
                let r = t.state.getName();
                let n = t.state.getProperties();
                Object.entries(this.resources.getDefaultBlockProperties(r) ?? {}).forEach(([e, t])=>{
                    if (!n[e]) {
                        n[e] = t;
                    }
                });
                let u = [
                    Math.floor(t.pos[0] / this.chunkSize[0]),
                    Math.floor(t.pos[1] / this.chunkSize[1]),
                    Math.floor(t.pos[2] / this.chunkSize[2])
                ];
                if (e && !e.some((e)=>aI(e, u))) {
                    continue;
                }
                let c = this.getChunk(u);
                try {
                    let e = this.resources.getBlockDefinition(r);
                    let s = {
                        up: this.needsCull(t, OP.UP),
                        down: this.needsCull(t, OP.DOWN),
                        west: this.needsCull(t, OP.WEST),
                        east: this.needsCull(t, OP.EAST),
                        north: this.needsCull(t, OP.NORTH),
                        south: this.needsCull(t, OP.SOUTH)
                    };
                    let u = new e_1;
                    if (e) {
                        u.merge(e.getMesh(r, n, this.resources, this.resources, s));
                    }
                    let h = y.getBlockMesh(t.state, t.nbt, this.resources, s);
                    if (!h.isEmpty()) {
                        u.merge(h);
                    }
                    if (!u.isEmpty()) {
                        this.finishChunkMesh(u, t.pos);
                        if (this.resources.getBlockFlags(t.state.getName())?.semi_transparent) {
                            c.transparentMesh.merge(u);
                        } else {
                            c.mesh.merge(u);
                        }
                    }
                } catch (error) {
                    console.error(`Error rendering block ${r}`, error);
                }
            }
            if (e) {
                e.forEach((e)=>{
                    let t = this.getChunk(e);
                    t.mesh.rebuild(this.gl, {
                        pos: true,
                        color: true,
                        texture: true,
                        normal: true,
                        blockPos: true
                    });
                    t.transparentMesh.rebuild(this.gl, {
                        pos: true,
                        color: true,
                        texture: true,
                        normal: true,
                        blockPos: true
                    });
                });
            } else {
                this.chunks.forEach((e)=>e.forEach((e)=>e.forEach((e)=>{
                            e.mesh.rebuild(this.gl, {
                                pos: true,
                                color: true,
                                texture: true,
                                normal: true,
                                blockPos: true
                            });
                            e.transparentMesh.rebuild(this.gl, {
                                pos: true,
                                color: true,
                                texture: true,
                                normal: true,
                                blockPos: true
                            });
                        })));
            }
        }
    }
    getMeshes() {
        let e = this.chunks.flatMap((e)=>e.flatMap((e)=>e.flatMap((e)=>e ?? [])));
        return e.flatMap((e)=>{
            if (e.mesh.isEmpty()) {
                return [];
            }
            return e.mesh;
        }).concat(e.flatMap((e)=>{
            if (e.transparentMesh.isEmpty()) {
                return [];
            }
            return e.transparentMesh;
        }));
    }
    needsCull(e, t) {
        let r = this.structure.getBlock(IX.towards(e.pos, t))?.state;
        if (!r) {
            return false;
        }
        let s = this.resources.getBlockFlags(r.getName());
        return !!(e.state.getName().equals(r.getName()) && s?.self_culling) || (s?.opaque ? !(t === OP.UP && e.state.isWaterlogged()) : e.state.isWaterlogged() && r.isWaterlogged());
    }
    finishChunkMesh(e, t) {
        let r = vt();
        for (let s of (Tl(r, r, t), e.transform(r), e.quads)){
            let e = s.normal();
            s.forEach((t)=>t.normal = e);
            s.forEach((e)=>e.blockPos = new Mi(t[0], t[1], t[2]));
        }
    }
    getChunk(e) {
        let t = 2 * Math.abs(e[0]) + +(e[0] < 0);
        let r = 2 * Math.abs(e[1]) + +(e[1] < 0);
        let s = 2 * Math.abs(e[2]) + +(e[2] < 0);
        if (!this.chunks[t]) {
            this.chunks[t] = [];
        }
        if (!this.chunks[t][r]) {
            this.chunks[t][r] = [];
        }
        if (!this.chunks[t][r][s]) {
            this.chunks[t][r][s] = {
                mesh: new e_1,
                transparentMesh: new e_1
            };
        }
        return this.chunks[t][r][s];
    }
}
