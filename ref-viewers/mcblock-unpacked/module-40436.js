import { D } from "./module-40623.js";
import { t } from "./module-22749.js";
export class G extends D {
    static EMPTY = new G("");
    value;
    constructor(e){
        super();
        this.value = e;
    }
    getId() {
        return t.String;
    }
    equals(e) {
        return e.isString() && this.value === e.value;
    }
    getAsString() {
        return this.value;
    }
    toString() {
        return `"${this.value.replace(/(\\|")/g, "\\$1")}"`;
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
        e.writeString(this.value);
    }
    static create() {
        return G.EMPTY;
    }
    static fromJson(e) {
        return new G(typeof e === "string" ? e : "");
    }
    static fromBytes(e) {
        return new G(e.readString());
    }
}
D.register(t.String, G);
