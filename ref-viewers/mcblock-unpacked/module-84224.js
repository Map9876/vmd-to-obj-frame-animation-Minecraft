import { LM } from "./module-13402.js";
import { h } from "./module-36595.js";
import { z } from "./module-4215.js";
import { D } from "./module-40623.js";
import { t } from "./module-22749.js";
export class E extends h {
    constructor(e){
        super(Array.from(e ?? [], (e)=>{
            if (typeof e === "number") {
                return new z(e);
            }
            return e;
        }));
    }
    getId() {
        return t.ByteArray;
    }
    equals(e) {
        return e.isByteArray() && this.length === e.length && this.items.every((t, r)=>t.equals(e.items[r]));
    }
    getType() {
        return t.Byte;
    }
    toString() {
        return `[B;${this.items.map((e)=>`${e.getAsNumber().toFixed()}B`).join(",")}]`;
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
        e.writeInt(this.items.length);
        e.writeBytes(this.items.map((e)=>e.getAsNumber()));
    }
    static create() {
        return new E([]);
    }
    static fromJson(e) {
        return new E(LM.readArray(e, (e)=>LM.readNumber(e) ?? 0) ?? []);
    }
    static fromBytes(e) {
        let t = e.readInt();
        return new E(e.readBytes(t));
    }
}
D.register(t.ByteArray, E);
