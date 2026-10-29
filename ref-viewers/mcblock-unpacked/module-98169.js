import { Z0, vt } from "./module-50923.js";
import { Mi } from "./module-19023.js";
export class L {
    pos;
    color;
    texture;
    textureLimit;
    normal;
    blockPos;
    static VEC = vt();
    constructor(e, t, r, s, n, i){
        this.pos = e;
        this.color = t;
        this.texture = r;
        this.textureLimit = s;
        this.normal = n;
        this.blockPos = i;
    }
    transform(e) {
        L.VEC[0] = this.pos.x;
        L.VEC[1] = this.pos.y;
        L.VEC[2] = this.pos.z;
        Z0(L.VEC, L.VEC, e);
        this.pos = new Mi(L.VEC[0], L.VEC[1], L.VEC[2]);
        return this;
    }
    static fromPos(e) {
        return new L(e, [
            0,
            0,
            0
        ], [
            0,
            0
        ], [
            0,
            0,
            0,
            0
        ], undefined, undefined);
    }
}
