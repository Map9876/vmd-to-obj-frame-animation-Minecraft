import { LM } from "./module-13402.js";
import { E } from "./module-67882.js";
class i {
    chunks;
    constructor(e){
        for (let t of (this.chunks = Array(1024).fill(undefined), e)){
            let e = a.getIndex(t.x, t.z);
            this.chunks[e] = t;
        }
    }
    getChunkPositions() {
        return this.chunks.flatMap((e)=>{
            if (e) {
                return [
                    [
                        e.x,
                        e.z
                    ]
                ];
            }
            return [];
        });
    }
    getChunk(e) {
        if (!(e < 0) && !(e >= 1024)) {
            return this.chunks[e];
        }
    }
    findChunk(e, t) {
        return this.getChunk(a.getIndex(e, t));
    }
    getFirstChunk() {
        return this.chunks.filter((e)=>e !== undefined)[0];
    }
    filter(e) {
        return this.chunks.filter((t)=>t !== undefined && e(t));
    }
    map(e) {
        return this.chunks.flatMap((t)=>{
            if (t !== undefined) {
                return [
                    e(t)
                ];
            }
            return [];
        });
    }
}
class a extends i {
    constructor(e){
        super(e);
    }
    write() {
        let e = 0;
        for (let t of this.chunks){
            if (t !== undefined) {
                e += Math.ceil(t.getRaw().length / 4096);
            }
        }
        let t = new Uint8Array(8192 + 4096 * e);
        let r = new DataView(t.buffer);
        let s = 2;
        for (let e of this.chunks){
            if (e === undefined) {
                continue;
            }
            let n = e.getRaw();
            let i = 4 * ((31 & e.x) + (31 & e.z) * 32);
            let a = Math.ceil(n.length / 4096);
            r.setInt8(i, s >> 16);
            r.setInt16(i + 1, 65535 & s);
            r.setInt8(i + 3, a);
            r.setInt32(i + 4096, e.timestamp);
            let o = 4096 * s;
            r.setInt32(o, n.length + 1);
            r.setInt8(o + 4, e.compression);
            t.set(n, o + 5);
            s += a;
        }
        return t;
    }
    static read(e) {
        let t = [];
        for(let r = 0; r < 32; r += 1){
            for(let s = 0; s < 32; s += 1){
                let i = 4 * ((31 & r) + (31 & s) * 32);
                if (e[i + 3] === 0) {
                    continue;
                }
                let a = (e[i] << 16) + (e[i + 1] << 8) + e[i + 2];
                let o = (e[i + 4096] << 24) + (e[i + 4097] << 16) + (e[i + 4098] << 8) + e[i + 4099];
                let u = 4096 * a;
                let c = (e[u] << 24) + (e[u + 1] << 16) + (e[u + 2] << 8) + e[u + 3];
                let h = e[u + 4];
                let l = e.slice(u + 5, u + 4 + c);
                t.push(new E(r, s, h, o, l));
            }
        }
        return new a(t);
    }
    static getIndex(e, t) {
        return (31 & e) + (31 & t) * 32;
    }
    toJson() {
        return {
            chunks: this.map((e)=>e.toJson())
        };
    }
    static fromJson(e, t) {
        let r = LM.readObject(e) ?? {};
        let i = (LM.readArray(r.chunks) ?? []).flatMap((e)=>{
            if (e !== undefined) {
                return [
                    E.fromJson(e, t)
                ];
            }
            return [];
        });
        return new a.Ref(i);
    }
}
((e)=>{
    class t extends i {
    }
    e.Ref = t;
})(a = a || (a = {}));
