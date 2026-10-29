import { LM } from "./module-13402.js";
import { D } from "./module-40623.js";
import { t } from "./module-22749.js";
export class N extends D {
    value;
    constructor(e){
        super();
        this.value = e;
    }
    getId() {
        return t.Float;
    }
    equals(e) {
        return e.isFloat() && this.value === e.value;
    }
    getAsNumber() {
        return this.value;
    }
    toString() {
        return `${this.value.toString()}f`;
    }
    toPrettyString() {
        return this.toString();
    }
    toSimplifiedJson() {
        return this.value;
    }
    toJson() {
        return this.value;
    }
    toBytes(e) {
        e.writeFloat(this.value);
    }
    static create() {
        return new N(0);
    }
    static fromJson(e) {
        return new N(LM.readNumber(e) ?? 0);
    }
    static fromBytes(e) {
        return new N(e.readFloat());
    }
}
D.register(t.Float, N);
