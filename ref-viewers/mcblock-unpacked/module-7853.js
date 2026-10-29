import { D } from "./module-40623.js";
import { t } from "./module-22749.js";
export class p extends D {
    value;
    constructor(e){
        super();
        this.value = e;
    }
    getId() {
        return t.Short;
    }
    equals(e) {
        return e.isShort() && this.value === e.value;
    }
    getAsNumber() {
        return this.value;
    }
    toString() {
        return `${this.value.toFixed()}s`;
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
        e.writeShort(this.value);
    }
    static create() {
        return new p(0);
    }
    static fromJson(e) {
        return new p(typeof e === "number" ? Math.floor(e) : 0);
    }
    static fromBytes(e) {
        return new p(e.readShort());
    }
}
D.register(t.Short, p);
