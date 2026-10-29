import { LM } from "./module-13402.js";
import { h } from "./module-36595.js";
import { l } from "./module-96667.js";
import { D } from "./module-40623.js";
import { t } from "./module-22749.js";
export class U extends h {
    constructor(e){
        super(Array.from(e ?? [], (e)=>{
            if (typeof e === "bigint" || Array.isArray(e)) {
                return new l(e);
            }
            return e;
        }));
    }
    getId() {
        return t.LongArray;
    }
    equals(e) {
        return e.isLongArray() && this.length === e.length && this.items.every((t, r)=>t.equals(e.items[r]));
    }
    getType() {
        return t.Long;
    }
    get length() {
        return this.items.length;
    }
    toString() {
        return `[I;${this.items.map((e)=>e.toString()).join(",")}]`;
    }
    toPrettyString() {
        return this.toString();
    }
    toSimplifiedJson() {
        return this.items.map((e)=>e.getAsPair());
    }
    toJson() {
        return this.items.map((e)=>e.getAsPair());
    }
    toBytes(e) {
        for (let t of (e.writeInt(this.items.length), this.items)){
            let [r, s] = t.getAsPair();
            e.writeInt(r);
            e.writeInt(s);
        }
    }
    static create() {
        return new U;
    }
    static fromJson(e) {
        return new U(LM.readArray(e, (e)=>LM.readPair(e, (e)=>LM.readNumber(e) ?? 0) ?? [
                0,
                0
            ]) ?? []);
    }
    static fromBytes(e) {
        let t = e.readInt();
        let r = [];
        for(let s = 0; s < t; s += 1){
            r.push([
                e.readInt(),
                e.readInt()
            ]);
        }
        return new U(r);
    }
}
D.register(t.LongArray, U);
