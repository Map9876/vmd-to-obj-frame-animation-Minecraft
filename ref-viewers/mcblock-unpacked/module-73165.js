import { LM } from "./module-13402.js";
import { h } from "./module-36595.js";
import { G } from "./module-19696.js";
import { D } from "./module-40623.js";
import { t as t_1 } from "./module-22749.js";
export class J extends h {
    type;
    constructor(e, t){
        super(e ?? []);
        this.type = this.items.length === 0 ? t_1.End : t ?? this.items[0].getId();
    }
    static make(e, t) {
        return new J(t.map((t)=>new e(t)));
    }
    getId() {
        return t_1.List;
    }
    equals(e) {
        return e.isList() && this.type === e.type && this.length === e.length && this.items.every((t, r)=>t.equals(e.items[r]));
    }
    getType() {
        return this.type;
    }
    getNumber(e) {
        let t = this.get(e);
        if (t?.isNumber()) {
            return t.getAsNumber();
        }
        return 0;
    }
    getString(e) {
        let t = this.get(e);
        if (t?.isString()) {
            return t.getAsString();
        }
        return "";
    }
    getList(e, t) {
        let r = this.get(e);
        if (r?.isList() && r.getType() === t) {
            return r;
        }
        return J.create();
    }
    getCompound(e) {
        let t = this.get(e);
        if (t?.isCompound()) {
            return t;
        }
        return G.create();
    }
    set(e, t) {
        this.updateType(t);
        super.set(e, t);
    }
    add(e) {
        this.updateType(e);
        super.add(e);
    }
    insert(e, t) {
        this.updateType(t);
        super.insert(e, t);
    }
    updateType(e) {
        if (e.getId() !== t_1.End) {
            if (this.type === t_1.End) {
                this.type = e.getId();
            } else if (this.type !== e.getId()) {
                throw Error(`Trying to add tag of type ${t_1[e.getId()]} to list of ${t_1[this.type]}`);
            }
        }
    }
    clear() {
        super.clear();
        this.type = t_1.End;
    }
    toString() {
        return `[${this.items.map((e)=>e.toString()).join(",")}]`;
    }
    toPrettyString(e = "  ", t = 0) {
        if (this.length === 0) {
            return "[]";
        }
        let r = e.repeat(t);
        let s = e.repeat(t + 1);
        return `[
${this.map((r)=>s + r.toPrettyString(e, t + 1)).join(",\n")}
${r}]`;
    }
    toSimplifiedJson() {
        return this.map((e)=>e.toSimplifiedJson());
    }
    toJson() {
        return {
            type: this.type,
            items: this.items.map((e)=>e.toJson())
        };
    }
    toBytes(e) {
        for (let t of (this.items.length === 0 ? this.type = t_1.End : this.type = this.items[0].getId(), e.writeByte(this.type), e.writeInt(this.items.length), this.items)){
            t.toBytes(e);
        }
    }
    static create() {
        return new J;
    }
    static fromJson(e) {
        let t = LM.readObject(e) ?? {};
        let r = LM.readNumber(t.type) ?? t_1.Compound;
        return new J((LM.readArray(t.items) ?? []).flatMap((e)=>{
            if (e !== undefined) {
                return [
                    D.fromJson(e, r)
                ];
            }
            return [];
        }), r);
    }
    static fromBytes(e) {
        let t = e.readByte();
        let r = e.readInt();
        if (t === t_1.End && r > 0) {
            throw Error(`Missing type on ListTag but length is ${r}`);
        }
        let s = [];
        for(let n = 0; n < r; n += 1){
            s.push(D.fromBytes(e, t));
        }
        return new J(s, t);
    }
}
D.register(t_1.List, J);
