import { LM } from "./module-13402.js";
import { D } from "./module-40623.js";
import { t } from "./module-22749.js";
export class z extends D {
    static ZERO = new z(0);
    static ONE = new z(1);
    value;
    constructor(e){
        super();
        this.value = typeof e === "number" ? e : +!!e;
    }
    getId() {
        return t.Byte;
    }
    equals(e) {
        return e.isByte() && this.value === e.value;
    }
    getAsNumber() {
        return this.value;
    }
    toString() {
        return `${this.value.toFixed()}b`;
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
        e.writeByte(this.value);
    }
    static create() {
        return z.ZERO;
    }
    static fromJson(e) {
        return new z(LM.readInt(e) ?? 0);
    }
    static fromBytes(e) {
        return new z(e.readByte());
    }
}
D.register(t.Byte, z);
