import { LM } from "./module-13402.js";
import { h } from "./module-36595.js";
import { Q } from "./module-51190.js";
import { D } from "./module-40623.js";
import { t } from "./module-22749.js";
export class P extends h {
    constructor(e){
        super(Array.from(e ?? [], (e)=>{
            if (typeof e === "number") {
                return new Q(e);
            }
            return e;
        }));
    }
    getId() {
        return t.IntArray;
    }
    equals(e) {
        return e.isIntArray() && this.length === e.length && this.items.every((t, r)=>t.equals(e.items[r]));
    }
    getType() {
        return t.Int;
    }
    get length() {
        return this.items.length;
    }
    toString() {
        return `[I;${this.items.map((e)=>e.getAsNumber().toFixed()).join(",")}]`;
    }
    toPrettyString() {
        return this.toString();
    }
    toSimplifiedJson() {
        return this.items.map((e)=>e.getAsNumber());
    }
    toJson() {
        return this.items.map((e)=>e.getAsNumber());
    }
    toBytes(e) {
        for (let t of (e.writeInt(this.items.length), this.items)){
            e.writeInt(t.getAsNumber());
        }
    }
    static create() {
        return new P;
    }
    static fromJson(e) {
        return new P(LM.readArray(e, (e)=>LM.readNumber(e) ?? 0) ?? []);
    }
    static fromBytes(e) {
        let t = e.readInt();
        let r = [];
        for(let s = 0; s < t; s += 1){
            r.push(e.readInt());
        }
        return new P(r);
    }
}
D.register(t.IntArray, P);
