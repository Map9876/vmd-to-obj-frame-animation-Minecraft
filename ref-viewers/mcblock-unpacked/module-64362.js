import { D } from "./module-40623.js";
import { t } from "./module-22749.js";
class i extends D {
    static INSTANCE = new i;
    constructor(){
        super();
    }
    getId() {
        return t.End;
    }
    equals(e) {
        return e.isEnd();
    }
    toString() {
        return "END";
    }
    toPrettyString() {
        return this.toString();
    }
    toSimplifiedJson() {
        return null;
    }
    toJson() {
        return null;
    }
    toBytes() {}
    static create() {
        return i.INSTANCE;
    }
    static fromJson() {
        return i.INSTANCE;
    }
    static fromBytes() {
        return i.INSTANCE;
    }
}
D.register(t.End, i);
