import { L } from "./module-91305.js";
import { D } from "./module-40623.js";
import { t } from "./module-22749.js";
export class Q extends D {
    value;
    constructor(e){
        super();
        this.value = e;
    }
    getId() {
        return t.Int;
    }
    equals(e) {
        return e.isInt() && this.value === e.value;
    }
    getAsNumber() {
        return this.value;
    }
    toString() {
        return this.value.toFixed();
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
        e.writeInt(this.value);
    }
    static create() {
        return new Q(0);
    }
    static fromJson(e) {
        return new Q(L.readInt(e) ?? 0);
    }
    static fromBytes(e) {
        return new Q(e.readInt());
    }
}
D.register(t.Int, Q);
