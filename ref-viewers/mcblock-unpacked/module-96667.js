import { D } from "./module-40623.js";
import { t } from "./module-22749.js";
export class l extends D {
    static dataview = new DataView(new Uint8Array(8).buffer);
    value;
    constructor(e){
        super();
        this.value = l.toPair(e);
    }
    static toPair(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return l.bigintToPair(e);
    }
    static bigintToPair(e) {
        l.dataview.setBigInt64(0, e);
        return [
            l.dataview.getInt32(0),
            l.dataview.getInt32(4)
        ];
    }
    static pairToBigint(e) {
        l.dataview.setInt32(0, Number(e[0]));
        l.dataview.setInt32(4, Number(e[1]));
        return l.dataview.getBigInt64(0);
    }
    static pairToString(e) {
        return l.pairToBigint(e).toString();
    }
    static pairToNumber(e) {
        return Number(l.pairToBigint(e));
    }
    getId() {
        return t.Long;
    }
    equals(e) {
        return e.isLong() && this.value[0] === e.value[0] && this.value[1] === e.value[1];
    }
    getAsNumber() {
        return l.pairToNumber(this.value);
    }
    getAsPair() {
        return this.value;
    }
    toBigInt() {
        return l.pairToBigint(this.value);
    }
    toString() {
        return `${l.pairToString(this.value)}L`;
    }
    toPrettyString() {
        return this.toString();
    }
    toSimplifiedJson() {
        return l.pairToNumber(this.value);
    }
    toJson() {
        return this.value;
    }
    toBytes(e) {
        e.writeInt(this.value[0]);
        e.writeInt(this.value[1]);
    }
    static create() {
        return new l([
            0,
            0
        ]);
    }
    static fromJson(e) {
        return new l(Array.isArray(e) && e.length === 2 ? e.map((e)=>{
            if (typeof e === "number") {
                return e;
            }
            return 0;
        }) : [
            0,
            0
        ]);
    }
    static fromBytes(e) {
        return new l([
            e.readInt(),
            e.readInt()
        ]);
    }
}
D.register(t.Long, l);
