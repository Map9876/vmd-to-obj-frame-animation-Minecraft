import { LM, r } from "./module-13402.js";
import { t as t_1 } from "./module-22749.js";
export class D {
    static FACTORIES = new Map;
    static register(e, t) {
        let r = t.create().getId();
        if (r !== e) {
            throw Error(`Registered factory ${t_1[r]} does not match type ${t_1[e]}`);
        }
        D.FACTORIES.set(e, t);
    }
    isEnd() {
        return this.getId() === t_1.End;
    }
    isByte() {
        return this.getId() === t_1.Byte;
    }
    isShort() {
        return this.getId() === t_1.Short;
    }
    isInt() {
        return this.getId() === t_1.Int;
    }
    isLong() {
        return this.getId() === t_1.Long;
    }
    isFloat() {
        return this.getId() === t_1.Float;
    }
    isDouble() {
        return this.getId() === t_1.Double;
    }
    isByteArray() {
        return this.getId() === t_1.ByteArray;
    }
    isString() {
        return this.getId() === t_1.String;
    }
    isList() {
        return this.getId() === t_1.List;
    }
    isCompound() {
        return this.getId() === t_1.Compound;
    }
    isIntArray() {
        return this.getId() === t_1.IntArray;
    }
    isLongArray() {
        return this.getId() === t_1.LongArray;
    }
    isNumber() {
        return this.isByte() || this.isShort() || this.isInt() || this.isLong() || this.isFloat() || this.isDouble();
    }
    isArray() {
        return this.isByteArray() || this.isIntArray() || this.isLongArray();
    }
    isListOrArray() {
        return this.isList() || this.isArray();
    }
    getAsNumber() {
        return 0;
    }
    getAsString() {
        return "";
    }
    toJsonWithId() {
        return {
            type: this.getId(),
            value: this.toJson()
        };
    }
    static getFactory(e) {
        let t = this.FACTORIES.get(e);
        if (!t) {
            throw Error(`Invalid tag id ${e}`);
        }
        return t;
    }
    static create(e) {
        return this.getFactory(e).create();
    }
    static fromString(e) {
        let t = typeof e === "string" ? new r(e) : e;
        return this.getFactory(t_1.Compound).fromString(t);
    }
    static fromJson(e, t = t_1.Compound) {
        return this.getFactory(t).fromJson(e);
    }
    static fromJsonWithId(e) {
        let t = LM.readObject(e) ?? {};
        let r = LM.readInt(t.type) ?? 0;
        return D.fromJson(t.value ?? {}, r);
    }
    static fromBytes(e, t = t_1.Compound) {
        return this.getFactory(t).fromBytes(e);
    }
}
