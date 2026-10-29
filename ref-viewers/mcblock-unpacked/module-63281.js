import { L } from "./module-98169.js";
export class N {
    v1;
    v2;
    constructor(e, t){
        this.v1 = e;
        this.v2 = t;
    }
    vertices() {
        return [
            this.v1,
            this.v2
        ];
    }
    forEach(e) {
        e(this.v1);
        e(this.v2);
        return this;
    }
    transform(e) {
        this.forEach((t)=>t.transform(e));
        return this;
    }
    setColor(e) {
        this.forEach((t)=>t.color = e);
        return this;
    }
    toString() {
        return `Line(${this.v1.pos.toString()}, ${this.v2.pos.toString()})`;
    }
    static fromPoints(e, t) {
        return new N(L.fromPos(e), L.fromPos(t));
    }
}
