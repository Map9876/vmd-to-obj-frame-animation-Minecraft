import { LM } from "./module-13402.js";
import { D } from "./module-40623.js";
import { t } from "./module-22749.js";
export class Q extends D {
    value;
    constructor(e){
        super();
        this.value = e;
    }
    getId() {
        return t.Double;
    }
    equals(e) {
        return e.isDouble() && this.value === e.value;
    }
    getAsNumber() {
        return this.value;
    }
    toString() {
        if (Number.isInteger(this.value)) {
            return this.value.toFixed(1);
        }
        return this.value.toString();
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
        e.writeDouble(this.value);
    }
    static create() {
        return new Q(0);
    }
    static fromJson(e) {
        return new Q(LM.readNumber(e) ?? 0);
    }
    static fromBytes(e) {
        return new Q(e.readDouble());
    }
}
D.register(t.Double, Q);
