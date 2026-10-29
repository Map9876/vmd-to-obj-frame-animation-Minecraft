import { Mi } from "./module-82084.js";
import { N } from "./module-63281.js";
import { L } from "./module-98169.js";
export class e {
    quads;
    lines;
    posBuffer;
    colorBuffer;
    textureBuffer;
    textureLimitBuffer;
    normalBuffer;
    blockPosBuffer;
    indexBuffer;
    linePosBuffer;
    lineColorBuffer;
    constructor(e = [], t = []){
        this.quads = e;
        this.lines = t;
    }
    clear() {
        this.quads = [];
        this.lines = [];
        return this;
    }
    isEmpty() {
        return this.quads.length === 0 && this.lines.length === 0;
    }
    quadVertices() {
        return 4 * this.quads.length;
    }
    quadIndices() {
        return 6 * this.quads.length;
    }
    lineVertices() {
        return 2 * this.lines.length;
    }
    merge(e) {
        this.quads = this.quads.concat(e.quads);
        this.lines = this.lines.concat(e.lines);
        return this;
    }
    addLine(e, t, r, a, o, u, c) {
        let h = new N(L.fromPos(new Mi(e, t, r)), L.fromPos(new Mi(a, o, u))).setColor(c);
        this.lines.push(h);
        return this;
    }
    addLineCube(e, t, r, s, n, i, a) {
        this.addLine(e, t, r, e, t, i, a);
        this.addLine(s, t, r, s, t, i, a);
        this.addLine(e, t, r, s, t, r, a);
        this.addLine(e, t, i, s, t, i, a);
        this.addLine(e, t, r, e, n, r, a);
        this.addLine(s, t, r, s, n, r, a);
        this.addLine(e, t, i, e, n, i, a);
        this.addLine(s, t, i, s, n, i, a);
        this.addLine(e, n, r, e, n, i, a);
        this.addLine(s, n, r, s, n, i, a);
        this.addLine(e, n, r, s, n, r, a);
        this.addLine(e, n, i, s, n, i, a);
        return this;
    }
    transform(e) {
        for (let t of this.quads){
            t.transform(e);
        }
        return this;
    }
    computeNormals() {
        for (let e of this.quads){
            let t = e.normal();
            e.forEach((e)=>e.normal = t);
        }
    }
    rebuild(e, t) {
        let r = (t, r, s)=>{
            if (!t) {
                t = e.createBuffer() ?? undefined;
            }
            if (!t) {
                throw Error("Cannot create new buffer");
            }
            e.bindBuffer(r, t);
            e.bufferData(r, s, e.DYNAMIC_DRAW);
            return t;
        };
        let s = (t, s, n)=>{
            if (t.length === 0) {
                if (s) {
                    e.deleteBuffer(s);
                }
                return;
            }
            let i = t.flatMap((e)=>e.vertices().flatMap((e)=>{
                    let t = n(e);
                    if (!t) {
                        throw Error("Missing vertex component");
                    }
                    return t;
                }));
            return r(s, e.ARRAY_BUFFER, new Float32Array(i));
        };
        if (t.pos) {
            this.posBuffer = s(this.quads, this.posBuffer, (e)=>e.pos.components());
            this.linePosBuffer = s(this.lines, this.linePosBuffer, (e)=>e.pos.components());
        }
        if (t.color) {
            this.colorBuffer = s(this.quads, this.colorBuffer, (e)=>e.color);
            this.lineColorBuffer = s(this.lines, this.lineColorBuffer, (e)=>e.color);
        }
        if (t.texture) {
            this.textureBuffer = s(this.quads, this.textureBuffer, (e)=>e.texture);
            this.textureLimitBuffer = s(this.quads, this.textureLimitBuffer, (e)=>e.textureLimit);
        }
        if (t.normal) {
            this.normalBuffer = s(this.quads, this.normalBuffer, (e)=>e.normal?.components());
        }
        if (t.blockPos) {
            this.blockPosBuffer = s(this.quads, this.blockPosBuffer, (e)=>e.blockPos?.components());
        }
        if (this.quads.length === 0) {
            if (this.indexBuffer) {
                e.deleteBuffer(this.indexBuffer);
            }
            this.indexBuffer = undefined;
        } else {
            this.indexBuffer = r(this.indexBuffer, e.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.quads.flatMap((e, t)=>[
                    4 * t,
                    4 * t + 1,
                    4 * t + 2,
                    4 * t,
                    4 * t + 2,
                    4 * t + 3
                ], true)));
        }
        return this;
    }
}
