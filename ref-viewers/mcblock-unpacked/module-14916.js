import { Ay } from "./module-41210.js";
import { LM } from "./module-13402.js";
import { t$ } from "./module-23273.js";
import { G } from "./module-19696.js";
class a {
    littleEndian;
    offset;
    buffer;
    array;
    view;
    constructor(e){
        this.littleEndian = e?.littleEndian ?? false;
        this.offset = e?.offset ?? 0;
        this.buffer = new ArrayBuffer(e?.initialSize ?? 1024);
        this.array = new Uint8Array(this.buffer);
        this.view = new DataView(this.buffer);
    }
    accommodate(e) {
        let t = this.offset + e;
        if (this.buffer.byteLength >= t) {
            return;
        }
        let byteLength = this.buffer.byteLength;
        while(byteLength < t){
            byteLength *= 2;
        }
        let s = new ArrayBuffer(byteLength);
        let n = new Uint8Array(s);
        n.set(this.array);
        if (this.offset > this.buffer.byteLength) {
            n.fill(0, this.buffer.byteLength, this.offset);
        }
        this.buffer = s;
        this.view = new DataView(s);
        this.array = n;
    }
    writeNumber(e, t, r) {
        this.accommodate(t);
        this.view[e](this.offset, r, this.littleEndian);
        this.offset += t;
    }
    writeByte = this.writeNumber.bind(this, "setInt8", 1);
    writeShort = this.writeNumber.bind(this, "setInt16", 2);
    writeInt = this.writeNumber.bind(this, "setInt32", 4);
    writeFloat = this.writeNumber.bind(this, "setFloat32", 4);
    writeDouble = this.writeNumber.bind(this, "setFloat64", 8);
    writeBytes(e) {
        this.accommodate(e.length);
        this.array.set(e, this.offset);
        this.offset += e.length;
    }
    writeString(e) {
        let t = ((e)=>{
            let t;
            let r;
            const s = [];
            for(t = 0; t < e.length; t++){
                if ((r = e.charCodeAt(t)) < 128) {
                    s.push(r);
                } else {
                    if (r < 2048) {
                        s.push(192 | r >> 6);
                    } else {
                        if (r < 65536) {
                            s.push(224 | r >> 12);
                        } else {
                            s.push(240 | r >> 18 & 7);
                            s.push(128 | r >> 12 & 63);
                        }
                        s.push(128 | r >> 6 & 63);
                    }
                    s.push(128 | 63 & r);
                }
            }
            return s;
        })(e);
        this.writeShort(t.length);
        this.writeBytes(t);
    }
    getData() {
        this.accommodate(0);
        return this.array.slice(0, this.offset);
    }
}
class o {
    littleEndian;
    offset;
    array;
    view;
    constructor(e, t){
        this.littleEndian = t?.littleEndian ?? false;
        this.offset = t?.offset ?? 0;
        this.array = e instanceof Uint8Array ? e : new Uint8Array(e);
        this.view = new DataView(this.array.buffer, this.array.byteOffset);
    }
    readNumber(e, t) {
        let r = this.view[e](this.offset, this.littleEndian);
        this.offset += t;
        return r;
    }
    readByte = this.readNumber.bind(this, "getInt8", 1);
    readShort = this.readNumber.bind(this, "getInt16", 2);
    readInt = this.readNumber.bind(this, "getInt32", 4);
    readFloat = this.readNumber.bind(this, "getFloat32", 4);
    readDouble = this.readNumber.bind(this, "getFloat64", 8);
    readBytes(e) {
        let t = this.array.slice(this.offset, this.offset + e);
        this.offset += e;
        return t;
    }
    readString() {
        let e = this.readShort();
        let t;
        const r = this.readBytes(e);
        const s = [];
        for(t = 0; t < r.length; t++){
            if ((128 & r[t]) == 0) {
                s.push(127 & r[t]);
            } else if (t + 1 < r.length && (224 & r[t]) == 192 && (192 & r[t + 1]) == 128) {
                s.push((31 & r[t]) << 6 | 63 & r[t + 1]);
            } else if (t + 2 < r.length && (240 & r[t]) == 224 && (192 & r[t + 1]) == 128 && (192 & r[t + 2]) == 128) {
                s.push((15 & r[t]) << 12 | (63 & r[t + 1]) << 6 | 63 & r[t + 2]);
            } else if (t + 3 < r.length && (248 & r[t]) == 240 && (192 & r[t + 1]) == 128 && (192 & r[t + 2]) == 128 && (192 & r[t + 3]) == 128) {
                s.push((7 & r[t]) << 18 | (63 & r[t + 1]) << 12 | (63 & r[t + 2]) << 6 | 63 & r[t + 3]);
            }
        }
        return String.fromCharCode.apply(null, s);
    }
}
export class T {
    name;
    root;
    compression;
    littleEndian;
    bedrockHeader;
    static DEFAULT_NAME = "";
    static DEFAULT_BEDROCK_HEADER = 4;
    constructor(e, t, r, s, n){
        this.name = e;
        this.root = t;
        this.compression = r;
        this.littleEndian = s;
        this.bedrockHeader = n;
    }
    writeNamedTag(e) {
        e.writeByte(t$.Compound);
        e.writeString(this.name);
        this.root.toBytes(e);
    }
    write() {
        let e = new a({
            littleEndian: this.littleEndian === true || this.bedrockHeader !== undefined,
            offset: this.bedrockHeader && 8
        });
        this.writeNamedTag(e);
        if (this.bedrockHeader !== undefined) {
            let t = e.offset;
            e.offset = 0;
            e.writeInt(this.bedrockHeader);
            e.writeInt(t - 8);
            e.offset = t;
        }
        let t = e.getData();
        if (this.compression === "gzip") {
            return Ay.gzip(t);
        }
        if (this.compression === "zlib") {
            return Ay.deflate(t);
        }
        return t;
    }
    static readNamedTag(e) {
        if (e.readByte() !== t$.Compound) {
            throw Error("Top tag should be a compound");
        }
        return {
            name: e.readString(),
            root: G.fromBytes(e)
        };
    }
    static create(e = {}) {
        let t = e.name ?? T.DEFAULT_NAME;
        let r = G.create();
        let s = e.compression ?? "none";
        let n = typeof e.bedrockHeader === "boolean" ? T.DEFAULT_BEDROCK_HEADER : e.bedrockHeader;
        return new T(t, r, s, e.littleEndian ?? e.bedrockHeader !== undefined, n);
    }
    static read(e, t = {}) {
        let r;
        let n = typeof t.bedrockHeader === "number" ? t.bedrockHeader : t.bedrockHeader ? ((e)=>{
            let t = e.slice(0, 8);
            let r = new DataView(t.buffer, t.byteOffset);
            let s = r.getUint32(0, true);
            let n = r.getUint32(4, true);
            if (t.length === 8 && s > 0 && s < 100 && n === e.byteLength - 8) {
                return s;
            }
        })(e) : undefined;
        let i = t.compression === "gzip" || !n && t.compression === undefined && (r = e.slice(0, 2)).length === 2 && r[0] === 31 && r[1] === 139;
        let a = t.compression === "zlib" || !n && t.compression === undefined && ((e)=>{
            let t = e.slice(0, 2);
            return t.length === 2 && t[0] === 120 && (t[1] === 1 || t[1] === 94 || t[1] === 156 || t[2] === 218);
        })(e);
        let u = a || i ? Ay.inflate(e) : e;
        let littleEndian = t.littleEndian || n !== undefined;
        let l = new o(u, {
            littleEndian,
            offset: n && 8
        });
        let { name, root } = T.readNamedTag(l);
        return new T(t.name ?? name, root, i ? "gzip" : a ? "zlib" : "none", littleEndian, n);
    }
    toJson() {
        return {
            name: this.name,
            root: this.root.toJson(),
            compression: this.compression,
            littleEndian: this.littleEndian,
            bedrockHeader: this.bedrockHeader ?? null
        };
    }
    static fromJson(e) {
        let t = LM.readObject(e) ?? {};
        let r = LM.readString(t.name) ?? "";
        let s = G.fromJson(t.root ?? {});
        let i = LM.readString(t.compression) ?? "none";
        return new T(r, s, i, LM.readBoolean(t.littleEndian) ?? false, LM.readNumber(t.bedrockHeader));
    }
}
