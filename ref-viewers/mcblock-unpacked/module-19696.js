import { LM, r as r_1 } from "./module-13402.js";
import { s } from "./module-87118.js";
import { E } from "./module-84224.js";
import { P } from "./module-18023.js";
import { J } from "./module-73165.js";
import { U } from "./module-59276.js";
import { D } from "./module-40623.js";
import { t as t_1 } from "./module-22749.js";
export class G extends D {
    properties;
    constructor(e){
        super();
        this.properties = e ?? new Map;
    }
    getId() {
        return t_1.Compound;
    }
    equals(e) {
        return e.isCompound() && this.size === e.size && [
            ...this.properties.entries()
        ].every(([t, r])=>{
            let s = e.properties.get(t);
            return s !== undefined && r.equals(s);
        });
    }
    has(e) {
        return this.properties.has(e);
    }
    hasNumber(e) {
        return this.get(e)?.isNumber() ?? false;
    }
    hasString(e) {
        return this.get(e)?.isString() ?? false;
    }
    hasList(e, t, r) {
        let s = this.get(e);
        return (s?.isList() && (t === undefined || s.getType() === t) && (r === undefined || s.length === r)) ?? false;
    }
    hasCompound(e) {
        return this.get(e)?.isCompound() ?? false;
    }
    get(e) {
        return this.properties.get(e);
    }
    getString(e) {
        return this.get(e)?.getAsString() ?? "";
    }
    getNumber(e) {
        return this.get(e)?.getAsNumber() ?? 0;
    }
    getBoolean(e) {
        return this.getNumber(e) !== 0;
    }
    getList(e, t) {
        let r = this.get(e);
        if (r?.isList() && (t === undefined || r.getType() === t)) {
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
    getByteArray(e) {
        let t = this.get(e);
        if (t?.isByteArray()) {
            return t;
        }
        return E.create();
    }
    getIntArray(e) {
        let t = this.get(e);
        if (t?.isIntArray()) {
            return t;
        }
        return P.create();
    }
    getLongArray(e) {
        let t = this.get(e);
        if (t?.isLongArray()) {
            return t;
        }
        return U.create();
    }
    keys() {
        return this.properties.keys();
    }
    get size() {
        return this.properties.size;
    }
    map(e) {
        return Object.fromEntries([
            ...this.properties.entries()
        ].map(([t, r])=>e(t, r, this)));
    }
    forEach(e) {
        [
            ...this.properties.entries()
        ].forEach(([t, r])=>e(t, r, this));
    }
    set(e, t) {
        this.properties.set(e, t);
        return this;
    }
    delete(e) {
        return this.properties.delete(e);
    }
    clear() {
        this.properties.clear();
        return this;
    }
    toString() {
        let e = [];
        for (let [t, r] of this.properties.entries()){
            let n = t.split("").some((e)=>!r_1.isAllowedInUnquotedString(e));
            e.push(`${n ? JSON.stringify(t) : t}:${r.toString()}`);
        }
        return `{${e.join(",")}}`;
    }
    toPrettyString(e = "  ", t = 0) {
        if (this.size === 0) {
            return "{}";
        }
        let r = e.repeat(t);
        let n = e.repeat(t + 1);
        let i = [];
        for (let [r, n] of this.properties.entries()){
            let a = r.split("").some((e)=>!r_1.isAllowedInUnquotedString(e));
            i.push(`${a ? JSON.stringify(r) : r}: ${n.toPrettyString(e, t + 1)}`);
        }
        return `{
${i.map((e)=>n + e).join(",\n")}
${r}}`;
    }
    toSimplifiedJson() {
        return this.map((e, t)=>[
                e,
                t.toSimplifiedJson()
            ]);
    }
    toJson() {
        return this.map((e, t)=>[
                e,
                {
                    type: t.getId(),
                    value: t.toJson()
                }
            ]);
    }
    toBytes(e) {
        for (let [t, r] of this.properties.entries()){
            let s = r.getId();
            e.writeByte(s);
            e.writeString(t);
            r.toBytes(e);
        }
        e.writeByte(t_1.End);
    }
    static create() {
        return new G;
    }
    static fromString(e) {
        return s.readTag(e);
    }
    static fromJson(e) {
        return new G(new Map(Object.entries(LM.readMap(e, (e)=>{
            let { type, value } = LM.readObject(e) ?? {};
            let n = LM.readNumber(type);
            return D.fromJson(value ?? {}, n);
        }))));
    }
    static fromBytes(e) {
        let t = new Map;
        while(true){
            let r = e.readByte();
            if (r === t_1.End) {
                break;
            }
            let s = e.readString();
            let n = D.fromBytes(e, r);
            t.set(s, n);
        }
        return new G(t);
    }
}
D.register(t_1.Compound, G);
