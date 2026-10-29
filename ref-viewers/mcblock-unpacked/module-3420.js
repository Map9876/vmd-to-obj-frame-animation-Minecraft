import { L } from "./module-98169.js";
export class k {
    v1;
    v2;
    v3;
    v4;
    constructor(e, t, r, s){
        this.v1 = e;
        this.v2 = t;
        this.v3 = r;
        this.v4 = s;
    }
    vertices() {
        return [
            this.v1,
            this.v2,
            this.v3,
            this.v4
        ];
    }
    forEach(e) {
        e(this.v1);
        e(this.v2);
        e(this.v3);
        e(this.v4);
        return this;
    }
    transform(e) {
        this.forEach((t)=>t.transform(e));
        return this;
    }
    normal() {
        let e = this.v2.pos.sub(this.v1.pos);
        let t = this.v3.pos.sub(this.v1.pos);
        return e.cross(t).normalize();
    }
    reverse() {
        [this.v1, this.v2, this.v3, this.v4] = [
            this.v4,
            this.v3,
            this.v2,
            this.v1
        ];
        return this;
    }
    setColor(e) {
        this.forEach((t)=>t.color = e);
        return this;
    }
    setTexture(e, t) {
        this.v1.textureLimit = t;
        this.v2.textureLimit = t;
        this.v3.textureLimit = t;
        this.v4.textureLimit = t;
        this.v1.texture = [
            e[0],
            e[1]
        ];
        this.v2.texture = [
            e[2],
            e[3]
        ];
        this.v3.texture = [
            e[4],
            e[5]
        ];
        this.v4.texture = [
            e[6],
            e[7]
        ];
        return this;
    }
    toString() {
        return `Quad(${this.v1.pos.toString()}, ${this.v2.pos.toString()}, ${this.v3.pos.toString()}, ${this.v4.pos.toString()})`;
    }
    static fromPoints(e, t, r, i) {
        return new k(L.fromPos(e), L.fromPos(t), L.fromPos(r), L.fromPos(i));
    }
}
