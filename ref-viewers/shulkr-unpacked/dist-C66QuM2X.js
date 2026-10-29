import { u } from "./dist-C66QuM2X/chunk_o.js";
import { f } from "./dist-C66QuM2X/chunk_d.js";
import { g, m, p } from "./dist-C66QuM2X/chunk_p.js";
import { N } from "./dist-C66QuM2X/chunk_M.js";
import { $, ot, st } from "./dist-C66QuM2X/chunk_st.js";
import { a as a_1 } from "./jsx-runtime-Db0DjQYK.js";
const t = [
    `litematic`,
    `schem`,
    `nbt`,
    `mcstructure`
];
function n(e) {
    let t = e.indexOf(`:`);
    if (t === -1) {
        return {
            namespace: `minecraft`,
            name: e,
            id: `minecraft:${e}`
        };
    }
    return {
        namespace: e.slice(0, t),
        name: e.slice(t + 1),
        id: e
    };
}
export function h(e, t) {
    if (!t) {
        return e;
    }
    let n = Object.keys(t);
    if (n.length === 0) {
        return e;
    }
    n.sort();
    return `${e}[${n.map((e)=>`${e}=${t[e]}`).join(`,`)}]`;
}
const i = `skproj`;
function a(e) {
    let e_length = e.length;
    let n = 0;
    let r = 0;
    while(r < e_length){
        let i = e.charCodeAt(r++);
        if (!(i & 4294967168)) {
            n++;
            continue;
        } else if (!(i & 4294965248)) {
            n += 2;
        } else {
            if (i >= 55296 && i <= 56319 && r < e_length) {
                let t = e.charCodeAt(r);
                if ((t & 64512) == 56320) {
                    ++r;
                    i = ((i & 1023) << 10) + (t & 1023) + 65536;
                }
            }
            if (i & 4294901760) {
                n += 4;
            } else {
                n += 3;
            }
        }
    }
    return n;
}
class _ {
    type;
    data;
    constructor(e, t){
        this.type = e;
        this.data = t;
    }
}
var v = class e extends Error {
    constructor(t){
        super(t);
        let n = Object.create(e.prototype);
        Object.setPrototypeOf(this, n);
        Object.defineProperty(this, "name", {
            configurable: true,
            enumerable: false,
            value: e.name
        });
    }
};
function y(view, pos, n) {
    let r = n / 4294967296;
    let i = n;
    view.setUint32(pos, r);
    view.setUint32(pos + 4, i);
}
function b(e, t, n) {
    let r = Math.floor(n / 4294967296);
    let i = n;
    e.setUint32(t, r);
    e.setUint32(t + 4, i);
}
function x(e, t) {
    let n = e.getInt32(t);
    let r = e.getUint32(t + 4);
    return n * 4294967296 + r;
}
function S(view, pos) {
    let n = view.getUint32(pos);
    let r = view.getUint32(pos + 4);
    return n * 4294967296 + r;
}
const C = 4294967295;
const w = 17179869183;
function T({ sec, nsec }) {
    if (sec >= 0 && nsec >= 0 && sec <= w) {
        if (nsec === 0 && sec <= C) {
            let t = new Uint8Array(4);
            new DataView(t.buffer).setUint32(0, sec);
            return t;
        } else {
            let n = sec / 4294967296;
            let r = sec & 4294967295;
            let i = new Uint8Array(8);
            let a = new DataView(i.buffer);
            a.setUint32(0, nsec << 2 | n & 3);
            a.setUint32(4, r);
            return i;
        }
    } else {
        let n = new Uint8Array(12);
        let r = new DataView(n.buffer);
        r.setUint32(0, nsec);
        b(r, 4, sec);
        return n;
    }
}
function E(e) {
    let t = e.getTime();
    let n = Math.floor(t / 1000);
    let r = (t - n * 1000) * 1000000;
    let i = Math.floor(r / 1000000000);
    return {
        sec: n + i,
        nsec: r - i * 1000000000
    };
}
function encode(e) {
    if (e instanceof Date) {
        return T(E(e));
    }
    return null;
}
function O(e) {
    let t = new DataView(e.buffer, e.byteOffset, e.byteLength);
    switch(e.byteLength){
        case 4:
            return {
                sec: t.getUint32(0),
                nsec: 0
            };
        case 8:
            {
                let e = t.getUint32(0);
                let n = t.getUint32(4);
                return {
                    sec: (e & 3) * 4294967296 + n,
                    nsec: e >>> 2
                };
            }
        case 12:
            return {
                sec: x(t, 4),
                nsec: t.getUint32(0)
            };
        default:
            throw new v(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${e.length}`);
    }
}
function decode(e) {
    let t = O(e);
    return new Date(t.sec * 1000 + t.nsec / 1000000);
}
const A = {
    type: -1,
    encode,
    decode
};
const j = class e {
    static defaultCodec = new e;
    __brand;
    builtInEncoders = [];
    builtInDecoders = [];
    encoders = [];
    decoders = [];
    constructor(){
        this.register(A);
    }
    register({ type, encode, decode }) {
        if (type >= 0) {
            this.encoders[type] = encode;
            this.decoders[type] = decode;
        } else {
            let r = -1 - type;
            this.builtInEncoders[r] = encode;
            this.builtInDecoders[r] = decode;
        }
    }
    tryToEncode(e, t) {
        for(let n = 0; n < this.builtInEncoders.length; n++){
            let builtInEncoder = this.builtInEncoders[n];
            if (builtInEncoder != null) {
                let i = builtInEncoder(e, t);
                if (i != null) {
                    return new _(-1 - n, i);
                }
            }
        }
        for(let n = 0; n < this.encoders.length; n++){
            let encoder = this.encoders[n];
            if (encoder != null) {
                let i = encoder(e, t);
                if (i != null) {
                    return new _(n, i);
                }
            }
        }
        if (e instanceof _) {
            return e;
        }
        return null;
    }
    decode(e, t, n) {
        let r = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
        if (r) {
            return r(e, t, n);
        }
        return new _(t, e);
    }
};
const P = class e {
    extensionCodec;
    context;
    useBigInt64;
    maxDepth;
    initialBufferSize;
    sortKeys;
    forceFloat32;
    ignoreUndefined;
    forceIntegerToFloat;
    pos;
    view;
    bytes;
    entered = false;
    constructor(e){
        this.extensionCodec = e?.extensionCodec ?? j.defaultCodec;
        this.context = e?.context;
        this.useBigInt64 = e?.useBigInt64 ?? false;
        this.maxDepth = e?.maxDepth ?? 100;
        this.initialBufferSize = e?.initialBufferSize ?? 2048;
        this.sortKeys = e?.sortKeys ?? false;
        this.forceFloat32 = e?.forceFloat32 ?? false;
        this.ignoreUndefined = e?.ignoreUndefined ?? false;
        this.forceIntegerToFloat = e?.forceIntegerToFloat ?? false;
        this.pos = 0;
        this.view = new DataView(new ArrayBuffer(this.initialBufferSize));
        this.bytes = new Uint8Array(this.view.buffer);
    }
    clone() {
        return new e({
            extensionCodec: this.extensionCodec,
            context: this.context,
            useBigInt64: this.useBigInt64,
            maxDepth: this.maxDepth,
            initialBufferSize: this.initialBufferSize,
            sortKeys: this.sortKeys,
            forceFloat32: this.forceFloat32,
            ignoreUndefined: this.ignoreUndefined,
            forceIntegerToFloat: this.forceIntegerToFloat
        });
    }
    reinitializeState() {
        this.pos = 0;
    }
    encodeSharedRef(e) {
        if (this.entered) {
            return this.clone().encodeSharedRef(e);
        }
        try {
            this.entered = true;
            this.reinitializeState();
            this.doEncode(e, 1);
            return this.bytes.subarray(0, this.pos);
        } finally{
            this.entered = false;
        }
    }
    encode(e) {
        if (this.entered) {
            return this.clone().encode(e);
        }
        try {
            this.entered = true;
            this.reinitializeState();
            this.doEncode(e, 1);
            return this.bytes.slice(0, this.pos);
        } finally{
            this.entered = false;
        }
    }
    doEncode(e, t) {
        if (t > this.maxDepth) {
            throw Error(`Too deep objects in depth ${t}`);
        }
        if (e == null) {
            this.encodeNil();
        } else if (typeof e == `boolean`) {
            this.encodeBoolean(e);
        } else if (typeof e == `number`) {
            if (this.forceIntegerToFloat) {
                this.encodeNumberAsFloat(e);
            } else {
                this.encodeNumber(e);
            }
        } else if (typeof e == `string`) {
            this.encodeString(e);
        } else if (this.useBigInt64 && typeof e == `bigint`) {
            this.encodeBigInt64(e);
        } else {
            this.encodeObject(e, t);
        }
    }
    ensureBufferSizeToWrite(e) {
        let t = this.pos + e;
        if (this.view.byteLength < t) {
            this.resizeBuffer(t * 2);
        }
    }
    resizeBuffer(e) {
        let t = new ArrayBuffer(e);
        let n = new Uint8Array(t);
        let r = new DataView(t);
        n.set(this.bytes);
        this.view = r;
        this.bytes = n;
    }
    encodeNil() {
        this.writeU8(192);
    }
    encodeBoolean(e) {
        if (e === false) {
            this.writeU8(194);
        } else {
            this.writeU8(195);
        }
    }
    encodeNumber(e) {
        if (!this.forceIntegerToFloat && Number.isSafeInteger(e)) {
            if (e >= 0) {
                if (e < 128) {
                    this.writeU8(e);
                } else if (e < 256) {
                    this.writeU8(204);
                    this.writeU8(e);
                } else if (e < 65536) {
                    this.writeU8(205);
                    this.writeU16(e);
                } else if (e < 4294967296) {
                    this.writeU8(206);
                    this.writeU32(e);
                } else if (this.useBigInt64) {
                    this.encodeNumberAsFloat(e);
                } else {
                    this.writeU8(207);
                    this.writeU64(e);
                }
            } else if (e >= -32) {
                this.writeU8(224 | e + 32);
            } else if (e >= -128) {
                this.writeU8(208);
                this.writeI8(e);
            } else if (e >= -32768) {
                this.writeU8(209);
                this.writeI16(e);
            } else if (e >= -2147483648) {
                this.writeU8(210);
                this.writeI32(e);
            } else if (this.useBigInt64) {
                this.encodeNumberAsFloat(e);
            } else {
                this.writeU8(211);
                this.writeI64(e);
            }
        } else {
            this.encodeNumberAsFloat(e);
        }
    }
    encodeNumberAsFloat(e) {
        if (this.forceFloat32) {
            this.writeU8(202);
            this.writeF32(e);
        } else {
            this.writeU8(203);
            this.writeF64(e);
        }
    }
    encodeBigInt64(e) {
        if (e >= BigInt(0)) {
            this.writeU8(207);
            this.writeBigUint64(e);
        } else {
            this.writeU8(211);
            this.writeBigInt64(e);
        }
    }
    writeStringHeader(e) {
        if (e < 32) {
            this.writeU8(160 + e);
        } else if (e < 256) {
            this.writeU8(217);
            this.writeU8(e);
        } else if (e < 65536) {
            this.writeU8(218);
            this.writeU16(e);
        } else if (e < 4294967296) {
            this.writeU8(219);
            this.writeU32(e);
        } else {
            throw Error(`Too long string: ${e} bytes in UTF-8`);
        }
    }
    encodeString(e) {
        let t = a(e);
        this.ensureBufferSizeToWrite(5 + t);
        this.writeStringHeader(t);
        u(e, this.bytes, this.pos);
        this.pos += t;
    }
    encodeObject(e, t) {
        let n = this.extensionCodec.tryToEncode(e, this.context);
        if (n != null) {
            this.encodeExtension(n);
        } else if (Array.isArray(e)) {
            this.encodeArray(e, t);
        } else if (ArrayBuffer.isView(e)) {
            this.encodeBinary(e);
        } else if (typeof e == `object`) {
            this.encodeMap(e, t);
        } else {
            throw Error(`Unrecognized object: ${Object.prototype.toString.apply(e)}`);
        }
    }
    encodeBinary(e) {
        let e_byteLength = e.byteLength;
        if (e_byteLength < 256) {
            this.writeU8(196);
            this.writeU8(e_byteLength);
        } else if (e_byteLength < 65536) {
            this.writeU8(197);
            this.writeU16(e_byteLength);
        } else if (e_byteLength < 4294967296) {
            this.writeU8(198);
            this.writeU32(e_byteLength);
        } else {
            throw Error(`Too large binary: ${e_byteLength}`);
        }
        let n = N(e);
        this.writeU8a(n);
    }
    encodeArray(e, t) {
        let e_length = e.length;
        if (e_length < 16) {
            this.writeU8(144 + e_length);
        } else if (e_length < 65536) {
            this.writeU8(220);
            this.writeU16(e_length);
        } else if (e_length < 4294967296) {
            this.writeU8(221);
            this.writeU32(e_length);
        } else {
            throw Error(`Too large array: ${e_length}`);
        }
        for (let n of e){
            this.doEncode(n, t + 1);
        }
    }
    countWithoutUndefined(e, t) {
        let n = 0;
        for (let r of t){
            if (e[r] !== undefined) {
                n++;
            }
        }
        return n;
    }
    encodeMap(e, t) {
        let n = Object.keys(e);
        if (this.sortKeys) {
            n.sort();
        }
        let r = this.ignoreUndefined ? this.countWithoutUndefined(e, n) : n.length;
        if (r < 16) {
            this.writeU8(128 + r);
        } else if (r < 65536) {
            this.writeU8(222);
            this.writeU16(r);
        } else if (r < 4294967296) {
            this.writeU8(223);
            this.writeU32(r);
        } else {
            throw Error(`Too large map object: ${r}`);
        }
        for (let r of n){
            let n = e[r];
            if (!(this.ignoreUndefined && n === undefined)) {
                this.encodeString(r);
                this.doEncode(n, t + 1);
            }
        }
    }
    encodeExtension(e) {
        if (typeof e.data == `function`) {
            let t = e.data(this.pos + 6);
            let n = t.length;
            if (n >= 4294967296) {
                throw Error(`Too large extension object: ${n}`);
            }
            this.writeU8(201);
            this.writeU32(n);
            this.writeI8(e.type);
            this.writeU8a(t);
            return;
        }
        let length = e.data.length;
        if (length === 1) {
            this.writeU8(212);
        } else if (length === 2) {
            this.writeU8(213);
        } else if (length === 4) {
            this.writeU8(214);
        } else if (length === 8) {
            this.writeU8(215);
        } else if (length === 16) {
            this.writeU8(216);
        } else if (length < 256) {
            this.writeU8(199);
            this.writeU8(length);
        } else if (length < 65536) {
            this.writeU8(200);
            this.writeU16(length);
        } else if (length < 4294967296) {
            this.writeU8(201);
            this.writeU32(length);
        } else {
            throw Error(`Too large extension object: ${length}`);
        }
        this.writeI8(e.type);
        this.writeU8a(e.data);
    }
    writeU8(e) {
        this.ensureBufferSizeToWrite(1);
        this.view.setUint8(this.pos, e);
        this.pos++;
    }
    writeU8a(e) {
        let e_length = e.length;
        this.ensureBufferSizeToWrite(e_length);
        this.bytes.set(e, this.pos);
        this.pos += e_length;
    }
    writeI8(e) {
        this.ensureBufferSizeToWrite(1);
        this.view.setInt8(this.pos, e);
        this.pos++;
    }
    writeU16(e) {
        this.ensureBufferSizeToWrite(2);
        this.view.setUint16(this.pos, e);
        this.pos += 2;
    }
    writeI16(e) {
        this.ensureBufferSizeToWrite(2);
        this.view.setInt16(this.pos, e);
        this.pos += 2;
    }
    writeU32(e) {
        this.ensureBufferSizeToWrite(4);
        this.view.setUint32(this.pos, e);
        this.pos += 4;
    }
    writeI32(e) {
        this.ensureBufferSizeToWrite(4);
        this.view.setInt32(this.pos, e);
        this.pos += 4;
    }
    writeF32(e) {
        this.ensureBufferSizeToWrite(4);
        this.view.setFloat32(this.pos, e);
        this.pos += 4;
    }
    writeF64(e) {
        this.ensureBufferSizeToWrite(8);
        this.view.setFloat64(this.pos, e);
        this.pos += 8;
    }
    writeU64(e) {
        this.ensureBufferSizeToWrite(8);
        y(this.view, this.pos, e);
        this.pos += 8;
    }
    writeI64(e) {
        this.ensureBufferSizeToWrite(8);
        b(this.view, this.pos, e);
        this.pos += 8;
    }
    writeBigUint64(e) {
        this.ensureBufferSizeToWrite(8);
        this.view.setBigUint64(this.pos, e);
        this.pos += 8;
    }
    writeBigInt64(e) {
        this.ensureBufferSizeToWrite(8);
        this.view.setBigInt64(this.pos, e);
        this.pos += 8;
    }
};
function F(e, t) {
    return new P(t).encodeSharedRef(e);
}
function ee(e) {
    return `${e < 0 ? `-` : ``}0x${Math.abs(e).toString(16).padStart(2, `0`)}`;
}
const I = 16;
const L = 16;
class R {
    hit = 0;
    miss = 0;
    caches;
    maxKeyLength;
    maxLengthPerKey;
    constructor(e = I, t = L){
        this.maxKeyLength = e;
        this.maxLengthPerKey = t;
        this.caches = [];
        for(let e = 0; e < this.maxKeyLength; e++){
            this.caches.push([]);
        }
    }
    canBeCached(e) {
        return e > 0 && e <= this.maxKeyLength;
    }
    find(e, t, n) {
        let r = this.caches[n - 1];
        FIND_CHUNK: for (let i of r){
            let r = i.bytes;
            for(let i = 0; i < n; i++){
                if (r[i] !== e[t + i]) {
                    continue FIND_CHUNK;
                }
            }
            return i.str;
        }
        return null;
    }
    store(bytes, str) {
        let n = this.caches[bytes.length - 1];
        let r = {
            bytes,
            str
        };
        if (n.length >= this.maxLengthPerKey) {
            n[Math.random() * n.length | 0] = r;
        } else {
            n.push(r);
        }
    }
    decode(e, t, n) {
        let r = this.find(e, t, n);
        if (r != null) {
            this.hit++;
            return r;
        }
        this.miss++;
        let i = f(e, t, n);
        let a = Uint8Array.prototype.slice.call(e, t, t + n);
        this.store(a, i);
        return i;
    }
}
const z = `array`;
const B = `map_key`;
const V = `map_value`;
const te = (e)=>{
    if (typeof e == `string` || typeof e == `number`) {
        return e;
    }
    throw new v(`The type of key must be string or number but ` + typeof e);
};
class ne {
    stack = [];
    stackHeadPosition = -1;
    get length() {
        return this.stackHeadPosition + 1;
    }
    top() {
        return this.stack[this.stackHeadPosition];
    }
    pushArrayState(e) {
        let t = this.getUninitializedStateFromPool();
        t.type = z;
        t.position = 0;
        t.size = e;
        t.array = Array(e);
    }
    pushMapState(e) {
        let t = this.getUninitializedStateFromPool();
        t.type = B;
        t.readCount = 0;
        t.size = e;
        t.map = {};
    }
    getUninitializedStateFromPool() {
        this.stackHeadPosition++;
        if (this.stackHeadPosition === this.stack.length) {
            this.stack.push({
                type: undefined,
                size: 0,
                array: undefined,
                position: 0,
                readCount: 0,
                map: undefined,
                key: null
            });
        }
        return this.stack[this.stackHeadPosition];
    }
    release(e) {
        if (this.stack[this.stackHeadPosition] !== e) {
            throw Error(`Invalid stack state. Released state is not on top of the stack.`);
        }
        if (e.type === z) {
            let t = e;
            t.size = 0;
            t.array = undefined;
            t.position = 0;
            t.type = undefined;
        }
        if (e.type === B || e.type === V) {
            let t = e;
            t.size = 0;
            t.map = undefined;
            t.readCount = 0;
            t.type = undefined;
        }
        this.stackHeadPosition--;
    }
    reset() {
        this.stack.length = 0;
        this.stackHeadPosition = -1;
    }
}
const H = -1;
const U = new DataView(new ArrayBuffer(0));
const re = new Uint8Array(U.buffer);
try {
    U.getInt8(0);
} catch (error) {
    if (!(error instanceof RangeError)) {
        throw Error(`This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access`);
    }
}
const ie = RangeError(`Insufficient data`);
const ae = new R;
const oe = class e {
    extensionCodec;
    context;
    useBigInt64;
    rawStrings;
    maxStrLength;
    maxBinLength;
    maxArrayLength;
    maxMapLength;
    maxExtLength;
    keyDecoder;
    mapKeyConverter;
    totalPos = 0;
    pos = 0;
    view = U;
    bytes = re;
    headByte = H;
    stack = new ne;
    entered = false;
    constructor(e){
        this.extensionCodec = e?.extensionCodec ?? j.defaultCodec;
        this.context = e?.context;
        this.useBigInt64 = e?.useBigInt64 ?? false;
        this.rawStrings = e?.rawStrings ?? false;
        this.maxStrLength = e?.maxStrLength ?? 4294967295;
        this.maxBinLength = e?.maxBinLength ?? 4294967295;
        this.maxArrayLength = e?.maxArrayLength ?? 4294967295;
        this.maxMapLength = e?.maxMapLength ?? 4294967295;
        this.maxExtLength = e?.maxExtLength ?? 4294967295;
        this.keyDecoder = e?.keyDecoder === undefined ? ae : e.keyDecoder;
        this.mapKeyConverter = e?.mapKeyConverter ?? te;
    }
    clone() {
        return new e({
            extensionCodec: this.extensionCodec,
            context: this.context,
            useBigInt64: this.useBigInt64,
            rawStrings: this.rawStrings,
            maxStrLength: this.maxStrLength,
            maxBinLength: this.maxBinLength,
            maxArrayLength: this.maxArrayLength,
            maxMapLength: this.maxMapLength,
            maxExtLength: this.maxExtLength,
            keyDecoder: this.keyDecoder
        });
    }
    reinitializeState() {
        this.totalPos = 0;
        this.headByte = H;
        this.stack.reset();
    }
    setBuffer(e) {
        let t = N(e);
        this.bytes = t;
        this.view = new DataView(t.buffer, t.byteOffset, t.byteLength);
        this.pos = 0;
    }
    appendBuffer(e) {
        if (this.headByte === H && !this.hasRemaining(1)) {
            this.setBuffer(e);
        } else {
            let t = this.bytes.subarray(this.pos);
            let n = N(e);
            let r = new Uint8Array(t.length + n.length);
            r.set(t);
            r.set(n, t.length);
            this.setBuffer(r);
        }
    }
    hasRemaining(e) {
        return this.view.byteLength - this.pos >= e;
    }
    createExtraByteError(e) {
        let { view, pos } = this;
        return RangeError(`Extra ${view.byteLength - pos} of ${view.byteLength} byte(s) found at buffer[${e}]`);
    }
    decode(e) {
        if (this.entered) {
            return this.clone().decode(e);
        }
        try {
            this.entered = true;
            this.reinitializeState();
            this.setBuffer(e);
            let t = this.doDecodeSync();
            if (this.hasRemaining(1)) {
                throw this.createExtraByteError(this.pos);
            }
            return t;
        } finally{
            this.entered = false;
        }
    }
    *decodeMulti(e) {
        if (this.entered) {
            yield* this.clone().decodeMulti(e);
            return;
        }
        try {
            this.entered = true;
            this.reinitializeState();
            this.setBuffer(e);
            while(this.hasRemaining(1)){
                yield this.doDecodeSync();
            }
        } finally{
            this.entered = false;
        }
    }
    async decodeAsync(e) {
        if (this.entered) {
            return this.clone().decodeAsync(e);
        }
        try {
            this.entered = true;
            let t = false;
            let n;
            for await (let r of e){
                if (t) {
                    this.entered = false;
                    throw this.createExtraByteError(this.totalPos);
                }
                this.appendBuffer(r);
                try {
                    n = this.doDecodeSync();
                    t = true;
                } catch (error) {
                    if (!(error instanceof RangeError)) {
                        throw error;
                    }
                }
                this.totalPos += this.pos;
            }
            if (t) {
                if (this.hasRemaining(1)) {
                    throw this.createExtraByteError(this.totalPos);
                }
                return n;
            }
            let { headByte, pos, totalPos } = this;
            throw RangeError(`Insufficient data in parsing ${ee(headByte)} at ${totalPos} (${pos} in the current buffer)`);
        } finally{
            this.entered = false;
        }
    }
    decodeArrayStream(e) {
        return this.decodeMultiAsync(e, true);
    }
    decodeStream(e) {
        return this.decodeMultiAsync(e, false);
    }
    async *decodeMultiAsync(e, t) {
        if (this.entered) {
            yield* this.clone().decodeMultiAsync(e, t);
            return;
        }
        try {
            this.entered = true;
            let n = t;
            let r = -1;
            for await (let i of e){
                if (t && r === 0) {
                    throw this.createExtraByteError(this.totalPos);
                }
                this.appendBuffer(i);
                if (n) {
                    r = this.readArraySize();
                    n = false;
                    this.complete();
                }
                try {
                    while(yield this.doDecodeSync(), --r !== 0);
                } catch (error) {
                    if (!(error instanceof RangeError)) {
                        throw error;
                    }
                }
                this.totalPos += this.pos;
            }
        } finally{
            this.entered = false;
        }
    }
    doDecodeSync() {
        DECODE: while(true){
            let e = this.readHeadByte();
            let t;
            if (e >= 224) {
                t = e - 256;
            } else if (e < 192) {
                if (e < 128) {
                    t = e;
                } else if (e < 144) {
                    let n = e - 128;
                    if (n !== 0) {
                        this.pushMapState(n);
                        this.complete();
                        continue DECODE;
                    } else {
                        t = {};
                    }
                } else if (e < 160) {
                    let n = e - 144;
                    if (n !== 0) {
                        this.pushArrayState(n);
                        this.complete();
                        continue DECODE;
                    } else {
                        t = [];
                    }
                } else {
                    let n = e - 160;
                    t = this.decodeString(n, 0);
                }
            } else if (e === 192) {
                t = null;
            } else if (e === 194) {
                t = false;
            } else if (e === 195) {
                t = true;
            } else if (e === 202) {
                t = this.readF32();
            } else if (e === 203) {
                t = this.readF64();
            } else if (e === 204) {
                t = this.readU8();
            } else if (e === 205) {
                t = this.readU16();
            } else if (e === 206) {
                t = this.readU32();
            } else if (e === 207) {
                t = this.useBigInt64 ? this.readU64AsBigInt() : this.readU64();
            } else if (e === 208) {
                t = this.readI8();
            } else if (e === 209) {
                t = this.readI16();
            } else if (e === 210) {
                t = this.readI32();
            } else if (e === 211) {
                t = this.useBigInt64 ? this.readI64AsBigInt() : this.readI64();
            } else if (e === 217) {
                let e = this.lookU8();
                t = this.decodeString(e, 1);
            } else if (e === 218) {
                let e = this.lookU16();
                t = this.decodeString(e, 2);
            } else if (e === 219) {
                let e = this.lookU32();
                t = this.decodeString(e, 4);
            } else if (e === 220) {
                let e = this.readU16();
                if (e !== 0) {
                    this.pushArrayState(e);
                    this.complete();
                    continue DECODE;
                } else {
                    t = [];
                }
            } else if (e === 221) {
                let e = this.readU32();
                if (e !== 0) {
                    this.pushArrayState(e);
                    this.complete();
                    continue DECODE;
                } else {
                    t = [];
                }
            } else if (e === 222) {
                let e = this.readU16();
                if (e !== 0) {
                    this.pushMapState(e);
                    this.complete();
                    continue DECODE;
                } else {
                    t = {};
                }
            } else if (e === 223) {
                let e = this.readU32();
                if (e !== 0) {
                    this.pushMapState(e);
                    this.complete();
                    continue DECODE;
                } else {
                    t = {};
                }
            } else if (e === 196) {
                let e = this.lookU8();
                t = this.decodeBinary(e, 1);
            } else if (e === 197) {
                let e = this.lookU16();
                t = this.decodeBinary(e, 2);
            } else if (e === 198) {
                let e = this.lookU32();
                t = this.decodeBinary(e, 4);
            } else if (e === 212) {
                t = this.decodeExtension(1, 0);
            } else if (e === 213) {
                t = this.decodeExtension(2, 0);
            } else if (e === 214) {
                t = this.decodeExtension(4, 0);
            } else if (e === 215) {
                t = this.decodeExtension(8, 0);
            } else if (e === 216) {
                t = this.decodeExtension(16, 0);
            } else if (e === 199) {
                let e = this.lookU8();
                t = this.decodeExtension(e, 1);
            } else if (e === 200) {
                let e = this.lookU16();
                t = this.decodeExtension(e, 2);
            } else if (e === 201) {
                let e = this.lookU32();
                t = this.decodeExtension(e, 4);
            } else {
                throw new v(`Unrecognized type byte: ${ee(e)}`);
            }
            this.complete();
            let n = this.stack;
            while(n.length > 0){
                let e = n.top();
                if (e.type === z) {
                    e.array[e.position] = t;
                    e.position++;
                    if (e.position === e.size) {
                        t = e.array;
                        n.release(e);
                    } else {
                        continue DECODE;
                    }
                } else if (e.type === B) {
                    if (t === `__proto__`) {
                        throw new v(`The key __proto__ is not allowed`);
                    }
                    e.key = this.mapKeyConverter(t);
                    e.type = V;
                    continue DECODE;
                } else {
                    e.map[e.key] = t;
                    e.readCount++;
                    if (e.readCount === e.size) {
                        t = e.map;
                        n.release(e);
                    } else {
                        e.key = null;
                        e.type = B;
                        continue DECODE;
                    }
                }
            }
            return t;
        }
    }
    readHeadByte() {
        if (this.headByte === H) {
            this.headByte = this.readU8();
        }
        return this.headByte;
    }
    complete() {
        this.headByte = H;
    }
    readArraySize() {
        let e = this.readHeadByte();
        switch(e){
            case 220:
                return this.readU16();
            case 221:
                return this.readU32();
            default:
                if (e < 160) {
                    return e - 144;
                }
                throw new v(`Unrecognized array type byte: ${ee(e)}`);
        }
    }
    pushMapState(e) {
        if (e > this.maxMapLength) {
            throw new v(`Max length exceeded: map length (${e}) > maxMapLengthLength (${this.maxMapLength})`);
        }
        this.stack.pushMapState(e);
    }
    pushArrayState(e) {
        if (e > this.maxArrayLength) {
            throw new v(`Max length exceeded: array length (${e}) > maxArrayLength (${this.maxArrayLength})`);
        }
        this.stack.pushArrayState(e);
    }
    decodeString(e, t) {
        if (!this.rawStrings || this.stateIsMapKey()) {
            return this.decodeUtf8String(e, t);
        }
        return this.decodeBinary(e, t);
    }
    decodeUtf8String(e, t) {
        if (e > this.maxStrLength) {
            throw new v(`Max length exceeded: UTF-8 byte length (${e}) > maxStrLength (${this.maxStrLength})`);
        }
        if (this.bytes.byteLength < this.pos + t + e) {
            throw ie;
        }
        let n = this.pos + t;
        let r;
        r = this.stateIsMapKey() && this.keyDecoder?.canBeCached(e) ? this.keyDecoder.decode(this.bytes, n, e) : g(this.bytes, n, e);
        this.pos += t + e;
        return r;
    }
    stateIsMapKey() {
        if (this.stack.length > 0) {
            return this.stack.top().type === B;
        }
        return false;
    }
    decodeBinary(e, t) {
        if (e > this.maxBinLength) {
            throw new v(`Max length exceeded: bin length (${e}) > maxBinLength (${this.maxBinLength})`);
        }
        if (!this.hasRemaining(e + t)) {
            throw ie;
        }
        let n = this.pos + t;
        let r = this.bytes.subarray(n, n + e);
        this.pos += t + e;
        return r;
    }
    decodeExtension(e, t) {
        if (e > this.maxExtLength) {
            throw new v(`Max length exceeded: ext length (${e}) > maxExtLength (${this.maxExtLength})`);
        }
        let n = this.view.getInt8(this.pos + t);
        let r = this.decodeBinary(e, t + 1);
        return this.extensionCodec.decode(r, n, this.context);
    }
    lookU8() {
        return this.view.getUint8(this.pos);
    }
    lookU16() {
        return this.view.getUint16(this.pos);
    }
    lookU32() {
        return this.view.getUint32(this.pos);
    }
    readU8() {
        let e = this.view.getUint8(this.pos);
        this.pos++;
        return e;
    }
    readI8() {
        let e = this.view.getInt8(this.pos);
        this.pos++;
        return e;
    }
    readU16() {
        let e = this.view.getUint16(this.pos);
        this.pos += 2;
        return e;
    }
    readI16() {
        let e = this.view.getInt16(this.pos);
        this.pos += 2;
        return e;
    }
    readU32() {
        let e = this.view.getUint32(this.pos);
        this.pos += 4;
        return e;
    }
    readI32() {
        let e = this.view.getInt32(this.pos);
        this.pos += 4;
        return e;
    }
    readU64() {
        let e = S(this.view, this.pos);
        this.pos += 8;
        return e;
    }
    readI64() {
        let e = x(this.view, this.pos);
        this.pos += 8;
        return e;
    }
    readU64AsBigInt() {
        let e = this.view.getBigUint64(this.pos);
        this.pos += 8;
        return e;
    }
    readI64AsBigInt() {
        let e = this.view.getBigInt64(this.pos);
        this.pos += 8;
        return e;
    }
    readF32() {
        let e = this.view.getFloat32(this.pos);
        this.pos += 4;
        return e;
    }
    readF64() {
        let e = this.view.getFloat64(this.pos);
        this.pos += 8;
        return e;
    }
};
function se(e, t) {
    return new oe(t).decode(e);
}
function ce(e) {
    let t = [];
    let n = new Map;
    let r = [];
    for (let i of e.blocks.values()){
        let e = n.get(i.stateKey);
        if (e === undefined) {
            e = t.length;
            n.set(i.stateKey, e);
            t.push({
                namespace: i.namespace,
                name: i.name,
                id: i.id,
                stateKey: i.stateKey,
                ...i.properties ? {
                    properties: i.properties
                } : {}
            });
        }
        r.push({
            pos: [
                i.pos.x,
                i.pos.y,
                i.pos.z
            ],
            palette: e,
            ...i.blockEntity ? {
                blockEntity: i.blockEntity
            } : {},
            ...i.debug ? {
                debug: i.debug
            } : {}
        });
    }
    return {
        mcVersion: e.mcVersion,
        sourceFormat: e.sourceFormat,
        bounds: e.bounds,
        palette: t,
        entries: r
    };
}
function le(e) {
    let blocks = new Map;
    for (let n of e.entries){
        let r = e.palette[n.palette];
        if (!r) {
            throw Error(`Build is corrupt: block references palette slot ${n.palette}, which doesn't exist.`);
        }
        let [i, a, o] = n.pos;
        let s = {
            namespace: r.namespace,
            name: r.name,
            id: r.id,
            pos: {
                x: i,
                y: a,
                z: o
            },
            stateKey: r.stateKey,
            ...r.properties ? {
                properties: r.properties
            } : {},
            ...n.blockEntity ? {
                blockEntity: n.blockEntity
            } : {},
            ...n.debug ? {
                debug: n.debug
            } : {}
        };
        blocks.set(`${i}-${a}-${o}`, s);
    }
    return {
        mcVersion: e.mcVersion,
        sourceFormat: e.sourceFormat,
        bounds: e.bounds,
        blocks
    };
}
function ue(e, t) {
    let modifiedAt = Date.now();
    return {
        schemaVersion: 1,
        appVersion: t.appVersion,
        assetBundleVersion: t.assetBundleVersion,
        metadata: {
            name: t.name,
            createdAt: t.createdAt ?? modifiedAt,
            modifiedAt,
            ...t.author ? {
                author: t.author
            } : {}
        },
        build: ce(e)
    };
}
function de(e) {
    return le(e.build);
}
const fe = {
    useBigInt64: true
};
function pe(e) {
    return F(e, fe);
}
function me(e) {
    return he(se(e, fe));
}
function he(e) {
    if (e.schemaVersion > 1) {
        throw Error(`Project was saved by a newer version (schema ${e.schemaVersion} > 1).`);
    }
    e.metadata.createdAt = Number(e.metadata.createdAt);
    e.metadata.modifiedAt = Number(e.metadata.modifiedAt);
    return e;
}
const _e = new Uint8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    0,
    0,
    0
]);
const ve = new Uint8Array([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    0,
    0
]);
const ye = new Uint8Array([
    16,
    17,
    18,
    0,
    8,
    7,
    9,
    6,
    10,
    5,
    11,
    4,
    12,
    3,
    13,
    2,
    14,
    1,
    15
]);
const be = (e, t)=>{
    const b_3 = new Uint16Array(31);
    for(var r = 0; r < 31; ++r){
        b_3[r] = t += 1 << e[r - 1];
    }
    const i = new Int32Array(b_3[30]);
    for(var r = 1; r < 30; ++r){
        for(let a = b_3[r]; a < b_3[r + 1]; ++a){
            i[a] = a - b_3[r] << 5 | r;
        }
    }
    return {
        b: b_3,
        r: i
    };
};
const xe = be(_e, 2);
const { b: b_1, r: r_1 } = xe;
b_1[28] = 258;
r_1[258] = 28;
const we = be(ve, 0);
const { b: b_2, r: r_2 } = we;
const De = new Uint16Array(32768);
for(var K = 0; K < 32768; ++K){
    let q = (K & 43690) >> 1 | (K & 21845) << 1;
    q = (q & 52428) >> 2 | (q & 13107) << 2;
    q = (q & 61680) >> 4 | (q & 3855) << 4;
    De[K] = ((q & 65280) >> 8 | (q & 255) << 8) >> 1;
}
const J = (e, t, n)=>{
    for(var r = e.length, i = 0, a = new Uint16Array(t); i < r; ++i){
        if (e[i]) {
            ++a[e[i] - 1];
        }
    }
    const o = new Uint16Array(t);
    for(i = 1; i < t; ++i){
        o[i] = o[i - 1] + a[i - 1] << 1;
    }
    let s;
    if (n) {
        s = new Uint16Array(1 << t);
        const c = 15 - t;
        for(i = 0; i < r; ++i){
            if (e[i]) {
                const l = i << 4 | e[i];
                const u = t - e[i];
                for(let d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d){
                    s[De[d] >> c] = l;
                }
            }
        }
    } else {
        s = new Uint16Array(r);
        for(i = 0; i < r; ++i){
            if (e[i]) {
                s[i] = De[o[e[i] - 1]++] >> 15 - e[i];
            }
        }
    }
    return s;
};
const Y = new Uint8Array(288);
for(var K = 0; K < 144; ++K){
    Y[K] = 8;
}
for(var K = 144; K < 256; ++K){
    Y[K] = 9;
}
for(var K = 256; K < 280; ++K){
    Y[K] = 7;
}
for(var K = 280; K < 288; ++K){
    Y[K] = 8;
}
const Oe = new Uint8Array(32);
for(var K = 0; K < 32; ++K){
    Oe[K] = 5;
}
const ke = J(Y, 9, 0);
const Ae = J(Y, 9, 1);
const je = J(Oe, 5, 0);
const Me = J(Oe, 5, 1);
const Ne = (e)=>{
    let t = e[0];
    for(let n = 1; n < e.length; ++n){
        if (e[n] > t) {
            t = e[n];
        }
    }
    return t;
};
const X = (e, t, n)=>{
    const r = t / 8 | 0;
    return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
};
const Pe = (e, t)=>{
    const n = t / 8 | 0;
    return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
};
const Fe = (e)=>(e + 7) / 8 | 0;
const Ie = (e, t, n)=>{
    if (t == null || t < 0) {
        t = 0;
    }
    if (n == null || n > e.length) {
        n = e.length;
    }
    return new Uint8Array(e.subarray(t, n));
};
const Le = [
    `unexpected EOF`,
    `invalid block type`,
    `invalid length/literal`,
    `invalid distance`,
    `stream finished`,
    `no stream handler`,
    ,
    `no callback`,
    `invalid UTF-8 data`,
    `extra field too long`,
    `date not in range 1980-2099`,
    `filename too long`,
    `stream finishing`,
    `invalid zip data`
];
const Z = function(e, t, n) {
    const r = Error(t || Le[e]);
    r.code = e;
    if (Error.captureStackTrace) {
        Error.captureStackTrace(r, Z);
    }
    if (!n) {
        throw r;
    }
    return r;
};
const Re = (e, t, n, r)=>{
    const e_length = e.length;
    const a = r ? r.length : 0;
    if (!e_length || t.f && !t.l) {
        return n || new Uint8Array(0);
    }
    const o = !n;
    const s = o || t.i != 2;
    const c = t.i;
    if (o) {
        n = new Uint8Array(e_length * 3);
    }
    const l = (e)=>{
        const n_length = n.length;
        if (e > n_length) {
            const r = new Uint8Array(Math.max(n_length * 2, e));
            r.set(n);
            n = r;
        }
    };
    let u = t.f || 0;
    let d = t.p || 0;
    let f = t.b || 0;
    let p = t.l;
    let m = t.d;
    let h = t.m;
    let g = t.n;
    const _ = e_length * 8;
    do {
        if (!p) {
            u = X(e, d, 1);
            const v = X(e, d + 1, 3);
            d += 3;
            if (!v) {
                var y = Fe(d) + 4;
                const b = e[y - 4] | e[y - 3] << 8;
                const x = y + b;
                if (x > e_length) {
                    if (c) {
                        Z(0);
                    }
                    break;
                }
                if (s) {
                    l(f + b);
                }
                n.set(e.subarray(y, x), f);
                t.b = f += b;
                t.p = d = x * 8;
                t.f = u;
                continue;
            } else if (v == 1) {
                p = Ae;
                m = Me;
                h = 9;
                g = 5;
            } else if (v == 2) {
                const S = X(e, d, 31) + 257;
                const C = X(e, d + 10, 15) + 4;
                const w = S + X(e, d + 5, 31) + 1;
                d += 14;
                const T = new Uint8Array(w);
                const E = new Uint8Array(19);
                for(var D = 0; D < C; ++D){
                    E[ye[D]] = X(e, d + D * 3, 7);
                }
                d += C * 3;
                const O = Ne(E);
                const k = (1 << O) - 1;
                const A = J(E, O, 1);
                for(var D = 0; D < w;){
                    const j = A[X(e, d, k)];
                    d += j & 15;
                    var y = j >> 4;
                    if (y < 16) {
                        T[D++] = y;
                    } else {
                        var M = 0;
                        let N = 0;
                        for(y == 16 ? (N = 3 + X(e, d, 3), d += 2, M = T[D - 1]) : y == 17 ? (N = 3 + X(e, d, 7), d += 3) : y == 18 && (N = 11 + X(e, d, 127), d += 7); N--;){
                            T[D++] = M;
                        }
                    }
                }
                const P = T.subarray(0, S);
                var F = T.subarray(S);
                h = Ne(P);
                g = Ne(F);
                p = J(P, h, 1);
                m = J(F, g, 1);
            } else {
                Z(1);
            }
            if (d > _) {
                if (c) {
                    Z(0);
                }
                break;
            }
        }
        if (s) {
            l(f + 131072);
        }
        const ee = (1 << h) - 1;
        const I = (1 << g) - 1;
        let L = d;
        for(;; L = d){
            var M = p[Pe(e, d) & ee];
            const R = M >> 4;
            d += M & 15;
            if (d > _) {
                if (c) {
                    Z(0);
                }
                break;
            }
            if (!M) {
                Z(2);
            }
            if (R < 256) {
                n[f++] = R;
            } else if (R == 256) {
                L = d;
                p = null;
                break;
            } else {
                let z = R - 254;
                if (R > 264) {
                    var D = R - 257;
                    var B = _e[D];
                    z = X(e, d, (1 << B) - 1) + b_1[D];
                    d += B;
                }
                const V = m[Pe(e, d) & I];
                const te = V >> 4;
                if (!V) {
                    Z(3);
                }
                d += V & 15;
                var F = b_2[te];
                if (te > 3) {
                    var B = ve[te];
                    F += Pe(e, d) & (1 << B) - 1;
                    d += B;
                }
                if (d > _) {
                    if (c) {
                        Z(0);
                    }
                    break;
                }
                if (s) {
                    l(f + 131072);
                }
                const ne = f + z;
                if (f < F) {
                    const H = a - F;
                    const U = Math.min(F, ne);
                    for(H + f < 0 && Z(3); f < U; ++f){
                        n[f] = r[H + f];
                    }
                }
                for(; f < ne; ++f){
                    n[f] = n[f - F];
                }
            }
        }
        t.l = p;
        t.p = L;
        t.b = f;
        t.f = u;
        if (p) {
            u = 1;
            t.m = h;
            t.d = m;
            t.n = g;
        }
    }while (!u)
    if (f != n.length && o) {
        return Ie(n, 0, f);
    }
    return n.subarray(0, f);
};
const Q = (e, t, n)=>{
    n <<= t & 7;
    const r = t / 8 | 0;
    e[r] |= n;
    e[r + 1] |= n >> 8;
};
const ze = (e, t, n)=>{
    n <<= t & 7;
    const r = t / 8 | 0;
    e[r] |= n;
    e[r + 1] |= n >> 8;
    e[r + 2] |= n >> 16;
};
const Be = (e, t)=>{
    const n = [];
    for(var s_1 = 0; s_1 < e.length; ++s_1){
        if (e[s_1]) {
            n.push({
                s: s_1,
                f: e[s_1]
            });
        }
    }
    const n_length = n.length;
    const a = n.slice();
    if (!n_length) {
        return {
            t: qe,
            l: 0
        };
    }
    if (n_length == 1) {
        const o = new Uint8Array(n[0].s + 1);
        o[n[0].s] = 1;
        return {
            t: o,
            l: 1
        };
    }
    n.sort((e, t)=>e.f - t.f);
    n.push({
        s: -1,
        f: 25001
    });
    let s = n[0];
    let c = n[1];
    let l = 0;
    let u = 1;
    let d = 2;
    for(n[0] = {
        s: -1,
        f: s.f + c.f,
        l: s,
        r: c
    }; u != n_length - 1;){
        s = n[n[l].f < n[d].f ? l++ : d++];
        c = n[l != u && n[l].f < n[d].f ? l++ : d++];
        n[u++] = {
            s: -1,
            f: s.f + c.f,
            l: s,
            r: c
        };
    }
    let f = a[0].s;
    for(var s_1 = 1; s_1 < n_length; ++s_1){
        if (a[s_1].s > f) {
            f = a[s_1].s;
        }
    }
    const p = new Uint16Array(f + 1);
    let m = Ve(n[u - 1], p, 0);
    if (m > t) {
        var s_1 = 0;
        let h = 0;
        const g = m - t;
        const _ = 1 << g;
        for(a.sort((e, t)=>p[t.s] - p[e.s] || e.f - t.f); s_1 < n_length; ++s_1){
            const v = a[s_1].s;
            if (p[v] > t) {
                h += _ - (1 << m - p[v]);
                p[v] = t;
            } else {
                break;
            }
        }
        for(h >>= g; h > 0;){
            const y = a[s_1].s;
            if (p[y] < t) {
                h -= 1 << t - p[y]++ - 1;
            } else {
                ++s_1;
            }
        }
        for(; s_1 >= 0 && h; --s_1){
            const b = a[s_1].s;
            if (p[b] == t) {
                --p[b];
                ++h;
            }
        }
        m = t;
    }
    return {
        t: new Uint8Array(p),
        l: m
    };
};
var Ve = (e, t, n)=>{
    if (e.s == -1) {
        return Math.max(Ve(e.l, t, n + 1), Ve(e.r, t, n + 1));
    }
    return t[e.s] = n;
};
const He = (e)=>{
    for(var n_1 = e.length; n_1 && !e[--n_1];);
    const n = new Uint16Array(++n_1);
    let r = 0;
    let i = e[0];
    let a = 1;
    const o = (e)=>{
        n[r++] = e;
    };
    for(let s = 1; s <= n_1; ++s){
        if (e[s] == i && s != n_1) {
            ++a;
        } else {
            if (!i && a > 2) {
                for(; a > 138; a -= 138){
                    o(32754);
                }
                if (a > 2) {
                    o(a > 10 ? a - 11 << 5 | 28690 : a - 3 << 5 | 12305);
                    a = 0;
                }
            } else if (a > 3) {
                o(i);
                --a;
                for(; a > 6; a -= 6){
                    o(8304);
                }
                if (a > 2) {
                    o(a - 3 << 5 | 8208);
                    a = 0;
                }
            }
            while(a--){
                o(i);
            }
            a = 1;
            i = e[s];
        }
    }
    return {
        c: n.subarray(0, r),
        n: n_1
    };
};
const Ue = (e, t)=>{
    let n = 0;
    for(let r = 0; r < t.length; ++r){
        n += e[r] * t[r];
    }
    return n;
};
const We = (e, t, n)=>{
    const n_length = n.length;
    const i = Fe(t + 2);
    e[i] = n_length & 255;
    e[i + 1] = n_length >> 8;
    e[i + 2] = e[i] ^ 255;
    e[i + 3] = e[i + 1] ^ 255;
    for(let a = 0; a < n_length; ++a){
        e[i + a + 4] = n[a];
    }
    return (i + 4 + n_length) * 8;
};
const Ge = (e, t, n, r, i, a, o, s, c, l, u)=>{
    Q(t, u++, n);
    ++i[256];
    const d = Be(i, 15);
    const { t: t_1, l: l_1 } = d;
    const m = Be(a, 15);
    const { t: t_2, l: l_2 } = m;
    const _ = He(t_1);
    for(var v = _.c, y = _.n, b = He(t_2), x = b.c, S = b.n, C = new Uint16Array(19), w = 0; w < v.length; ++w){
        ++C[v[w] & 31];
    }
    for(var w = 0; w < x.length; ++w){
        ++C[x[w] & 31];
    }
    const T = Be(C, 7);
    for(var E = T.t, D = T.l, O = 19; O > 4 && !E[ye[O - 1]]; --O);
    const k = l + 5 << 3;
    const A = Ue(i, Y) + Ue(a, Oe) + o;
    const j = Ue(i, t_1) + Ue(a, t_2) + o + 14 + 3 * O + Ue(C, E) + 2 * C[16] + 3 * C[17] + 7 * C[18];
    if (c >= 0 && k <= A && k <= j) {
        return We(t, u, e.subarray(c, c + l));
    }
    let M;
    let N;
    let P;
    let F;
    Q(t, u, 1 + (j < A));
    u += 2;
    if (j < A) {
        M = J(t_1, l_1, 0);
        N = t_1;
        P = J(t_2, l_2, 0);
        F = t_2;
        const ee = J(E, D, 0);
        Q(t, u, y - 257);
        Q(t, u + 5, S - 1);
        Q(t, u + 10, O - 4);
        u += 14;
        for(var w = 0; w < O; ++w){
            Q(t, u + 3 * w, E[ye[w]]);
        }
        u += 3 * O;
        const I = [
            v,
            x
        ];
        for(let L = 0; L < 2; ++L){
            for(var R = I[L], w = 0; w < R.length; ++w){
                var z = R[w] & 31;
                Q(t, u, ee[z]);
                u += E[z];
                if (z > 15) {
                    Q(t, u, R[w] >> 5 & 127);
                    u += R[w] >> 12;
                }
            }
        }
    } else {
        M = ke;
        N = Y;
        P = je;
        F = Oe;
    }
    for(var w = 0; w < s; ++w){
        const B = r[w];
        if (B > 255) {
            var z = B >> 18 & 31;
            ze(t, u, M[z + 257]);
            u += N[z + 257];
            if (z > 7) {
                Q(t, u, B >> 23 & 31);
                u += _e[z];
            }
            const V = B & 31;
            ze(t, u, P[V]);
            u += F[V];
            if (V > 3) {
                ze(t, u, B >> 5 & 8191);
                u += ve[V];
            }
        } else {
            ze(t, u, M[B]);
            u += N[B];
        }
    }
    ze(t, u, M[256]);
    return u + N[256];
};
const Ke = new Int32Array([
    65540,
    131080,
    131088,
    131104,
    262176,
    1048704,
    1048832,
    2114560,
    2117632
]);
var qe = new Uint8Array(0);
const Je = (e, t, n, r, i, a)=>{
    const o = a.z || e.length;
    const s = new Uint8Array(r + o + 5 * (1 + Math.ceil(o / 7000)) + i);
    const c = s.subarray(r, s.length - i);
    const l = a.l;
    let u = (a.r || 0) & 7;
    if (t) {
        if (u) {
            c[0] = a.r >> 3;
        }
        const d = Ke[t - 1];
        const f = d >> 13;
        const p = d & 8191;
        const m = (1 << n) - 1;
        const h = a.p || new Uint16Array(32768);
        const g = a.h || new Uint16Array(m + 1);
        const _ = Math.ceil(n / 3);
        const v = 2 * _;
        const y = (t)=>(e[t] ^ e[t + 1] << _ ^ e[t + 2] << v) & m;
        const b = new Int32Array(25000);
        const x = new Uint16Array(288);
        const S = new Uint16Array(32);
        let C = 0;
        let w = 0;
        for(var T = a.i || 0, E = 0, D = a.w || 0, O = 0; T + 2 < o; ++T){
            const k = y(T);
            let A = T & 32767;
            let j = g[k];
            h[A] = j;
            g[k] = A;
            if (D <= T) {
                const M = o - T;
                if ((C > 7000 || E > 24576) && (M > 423 || !l)) {
                    u = Ge(e, c, 0, b, x, S, w, E, O, T - O, u);
                    w = 0;
                    C = 0;
                    E = 0;
                    O = T;
                    for(var N = 0; N < 286; ++N){
                        x[N] = 0;
                    }
                    for(var N = 0; N < 30; ++N){
                        S[N] = 0;
                    }
                }
                let P = 2;
                let F = 0;
                let ee = p;
                let I = A - j & 32767;
                if (M > 2 && k == y(T - I)) {
                    const L = Math.min(f, M) - 1;
                    for(const R = Math.min(32767, T), z = Math.min(258, M); I <= R && --ee && A != j;){
                        if (e[T + P] == e[T + P - I]) {
                            for(var B = 0; B < z && e[T + B] == e[T + B - I]; ++B);
                            if (B > P) {
                                P = B;
                                F = I;
                                if (B > L) {
                                    break;
                                }
                                for(var V = Math.min(I, B - 2), te = 0, N = 0; N < V; ++N){
                                    const ne = T - I + N & 32767;
                                    const H = ne - h[ne] & 32767;
                                    if (H > te) {
                                        te = H;
                                        j = ne;
                                    }
                                }
                            }
                        }
                        A = j;
                        j = h[A];
                        I += A - j & 32767;
                    }
                }
                if (F) {
                    b[E++] = 268435456 | r_1[P] << 18 | r_2[F];
                    const U = r_1[P] & 31;
                    const re = r_2[F] & 31;
                    w += _e[U] + ve[re];
                    ++x[257 + U];
                    ++S[re];
                    D = T + P;
                    ++C;
                } else {
                    b[E++] = e[T];
                    ++x[e[T]];
                }
            }
        }
        for(T = Math.max(T, D); T < o; ++T){
            b[E++] = e[T];
            ++x[e[T]];
        }
        u = Ge(e, c, l, b, x, S, w, E, O, T - O, u);
        if (!l) {
            a.r = u & 7 | c[u / 8 | 0] << 3;
            u -= 7;
            a.h = g;
            a.p = h;
            a.i = T;
            a.w = D;
        }
    } else {
        for(var T = a.w || 0; T < o + l; T += 65535){
            let ie = T + 65535;
            if (ie >= o) {
                c[u / 8 | 0] = l;
                ie = o;
            }
            u = We(c, u + 1, e.subarray(T, ie));
        }
        a.i = o;
    }
    return Ie(s, 0, r + Fe(u) + i);
};
const Ye = (()=>{
    const e = new Int32Array(256);
    for(let t = 0; t < 256; ++t){
        let n = t;
        for(let r = 9; --r;){
            n = (n & 1 && -306674912) ^ n >>> 1;
        }
        e[t] = n;
    }
    return e;
})();
const Xe = ()=>{
    let e = -1;
    return {
        p: function(t) {
            let n = e;
            for(let r = 0; r < t.length; ++r){
                n = Ye[n & 255 ^ t[r]] ^ n >>> 8;
            }
            e = n;
        },
        d: function() {
            return ~e;
        }
    };
};
const Ze = (e, t, n, r, i)=>{
    if (!i && (i = {
        l: 1
    }, t.dictionary)) {
        const a = t.dictionary.subarray(-32768);
        const o = new Uint8Array(a.length + e.length);
        o.set(a);
        o.set(e, a.length);
        e = o;
        i.w = a.length;
    }
    return Je(e, t.level ?? 6, t.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, r, i);
};
const Qe = (e, t, n)=>{
    for(; n; ++t){
        e[t] = n;
        n >>>= 8;
    }
};
const $e = (e, t)=>{
    const t_filename = t.filename;
    e[0] = 31;
    e[1] = 139;
    e[2] = 8;
    e[8] = t.level < 2 ? 4 : t.level == 9 ? 2 : 0;
    e[9] = 3;
    if (t.mtime != 0) {
        Qe(e, 4, Math.floor(new Date(t.mtime || Date.now()) / 1000));
    }
    if (t_filename) {
        e[3] = 8;
        for(let r = 0; r <= t_filename.length; ++r){
            e[r + 10] = t_filename.charCodeAt(r);
        }
    }
};
const et = (e)=>{
    if (e[0] != 31 || e[1] != 139 || e[2] != 8) {
        Z(6, `invalid gzip data`);
    }
    const t = e[3];
    let n = 10;
    if (t & 4) {
        n += (e[10] | e[11] << 8) + 2;
    }
    for(let r = (t >> 3 & 1) + (t >> 4 & 1); r > 0; r -= !e[n++]);
    return n + (t & 2);
};
const tt = (e)=>10 + (e.filename ? e.filename.length + 1 : 0);
const nt = (()=>{
    function e(e, t) {
        if (typeof e == `function`) {
            t = e;
            e = {};
        }
        this.ondata = t;
        const n = e && e.dictionary && e.dictionary.subarray(-32768);
        this.s = {
            i: 0,
            b: n ? n.length : 0
        };
        this.o = new Uint8Array(32768);
        this.p = new Uint8Array(0);
        if (n) {
            this.o.set(n);
        }
    }
    e.prototype.e = function(e) {
        if (!this.ondata) {
            Z(5);
        }
        if (this.d) {
            Z(4);
        }
        if (!this.p.length) {
            this.p = e;
        } else if (e.length) {
            const t = new Uint8Array(this.p.length + e.length);
            t.set(this.p);
            t.set(e, this.p.length);
            this.p = t;
        }
    };
    e.prototype.c = function(e) {
        this.s.i = +(this.d = e || false);
        const t = this.s.b;
        const n = Re(this.p, this.s, this.o);
        this.ondata(Ie(n, t, this.s.b), this.d);
        this.o = Ie(n, this.s.b - 32768);
        this.s.b = this.o.length;
        this.p = Ie(this.p, this.s.p / 8 | 0);
        this.s.p &= 7;
    };
    e.prototype.push = function(e, t) {
        this.e(e);
        this.c(t);
    };
    return e;
})();
function rt(e, t) {
    t ||= {};
    const n = Xe();
    const e_length = e.length;
    n.p(e);
    const i = Ze(e, t, tt(t), 8);
    const i_length = i.length;
    $e(i, t);
    Qe(i, i_length - 8, n.d());
    Qe(i, i_length - 4, e_length);
    return i;
}
class it {
    constructor(e, t){
        this.v = 1;
        this.r = 0;
        nt.call(this, e, t);
    }
    push(e, t) {
        nt.prototype.e.call(this, e);
        this.r += e.length;
        if (this.v) {
            const n = this.p.subarray(this.v - 1);
            const r = n.length > 3 ? et(n) : 4;
            if (r > n.length) {
                if (!t) {
                    return;
                }
            } else {
                if (this.v > 1 && this.onmember) {
                    this.onmember(this.r - n.length);
                }
            }
            this.p = n.subarray(r);
            this.v = 0;
        }
        nt.prototype.c.call(this, 0);
        if (this.s.f && !this.s.l) {
            this.v = Fe(this.s.p) + 9;
            this.s = {
                i: 0
            };
            this.o = new Uint8Array(0);
            this.push(new Uint8Array(0), t);
        } else if (t) {
            nt.prototype.c.call(this, t);
        }
    }
}
const at = typeof TextDecoder < `u` && new TextDecoder;
try {
    at.decode(qe, {
        stream: true
    });
} catch  {}
const ct = {
    useBigInt64: true
};
const lt = 256 * 1024 * 1024;
function ut(e, t) {
    let n = [];
    let r = 0;
    let i = false;
    let a = new it((e)=>{
        r += e.length;
        if (r > t) {
            i = true;
            return;
        }
        n.push(e);
    });
    let o = 64 * 1024;
    for(let t = 0; t < e.length && !i; t += o){
        let n = Math.min(t + o, e.length);
        a.push(e.subarray(t, n), n >= e.length);
    }
    if (i) {
        throw Error(`Build file is too large: decompresses to over ${(t / (1024 * 1024)).toFixed(0)} MB.`);
    }
    let s = new Uint8Array(r);
    let c = 0;
    for (let e of n){
        s.set(e, c);
        c += e.length;
    }
    return s;
}
class dt {
    constructor(){
        this.buf = new Uint8Array(1024);
        this.len = 0;
    }
    push(e) {
        if (this.len === this.buf.length) {
            let e = new Uint8Array(this.buf.length * 2);
            e.set(this.buf);
            this.buf = e;
        }
        this.buf[this.len++] = e;
    }
    uint(e) {
        let t = e >>> 0;
        do {
            let e = t & 127;
            t >>>= 7;
            if (t) {
                e |= 128;
            }
            this.push(e);
        }while (t)
    }
    int(e) {
        this.uint((e << 1 ^ e >> 31) >>> 0);
    }
    bytes() {
        return this.buf.slice(0, this.len);
    }
}
class ft {
    constructor(e){
        this.buf = e;
        this.off = 0;
    }
    uint() {
        let e = 0;
        let t = 0;
        while(true){
            let n = this.buf[this.off++];
            e |= (n & 127) << t;
            if (!(n & 128)) {
                return e >>> 0;
            }
            t += 7;
        }
    }
    int() {
        let e = this.uint();
        return e >>> 1 ^ -(e & 1);
    }
}
function pt(e) {
    let t = [
        ...e.entries
    ].sort((e, t)=>e.pos[1] - t.pos[1] || e.pos[2] - t.pos[2] || e.pos[0] - t.pos[0]);
    let n = new dt;
    let r = new dt;
    let blockEntities = [];
    let a = [];
    let o = 0;
    let s = 0;
    let c = 0;
    t.forEach((e, t)=>{
        n.int(e.pos[0] - o);
        n.int(e.pos[1] - s);
        n.int(e.pos[2] - c);
        [o, s, c] = e.pos;
        r.uint(e.palette);
        if (e.blockEntity) {
            blockEntities.push([
                t,
                e.blockEntity
            ]);
        }
        if (e.debug) {
            a.push([
                t,
                e.debug
            ]);
        }
    });
    let l = rt(F({
        mcVersion: e.mcVersion,
        sourceFormat: e.sourceFormat,
        bounds: e.bounds,
        palette: e.palette,
        count: t.length,
        pos: n.bytes(),
        slots: r.bytes(),
        blockEntities,
        debug: a
    }, ct));
    let u = new Uint8Array(5 + l.length);
    u.set($, 0);
    u[4] = 2;
    u.set(l, 5);
    return u;
}
function mt(e) {
    if (e.length < 6 || e[0] !== $[0] || e[1] !== $[1] || e[2] !== $[2] || e[3] !== $[3]) {
        throw Error(`Not a shulkr build file`);
    }
    let t = e[4];
    if (t > 2) {
        throw Error(`Build file version ${t} is newer than this reader`);
    }
    let n = se(ut(e.subarray(5), lt), ct);
    if (!(n.pos instanceof Uint8Array) || !(n.slots instanceof Uint8Array)) {
        throw Error(`Build file is corrupt: position/slot streams are missing.`);
    }
    let r = Math.min(n.slots.length, Math.floor(n.pos.length / 3));
    if (!Number.isInteger(n.count) || n.count < 0 || n.count > r) {
        throw Error(`Build file is corrupt: declares ${n.count} entries but carries data for at most ${r}.`);
    }
    let i = new ft(n.pos);
    let a = new ft(n.slots);
    let o = new Map(n.blockEntities);
    let s = new Map(n.debug ?? []);
    let c = Array(n.count);
    let l = 0;
    let u = 0;
    let d = 0;
    for(let e = 0; e < n.count; e++){
        l += i.int();
        u += i.int();
        d += i.int();
        let blockEntity = o.get(e);
        let n = s.get(e);
        c[e] = {
            pos: [
                l,
                u,
                d
            ],
            palette: a.uint(),
            ...blockEntity ? {
                blockEntity
            } : {},
            ...n ? {
                debug: n
            } : {}
        };
    }
    return {
        mcVersion: n.mcVersion,
        sourceFormat: n.sourceFormat,
        bounds: n.bounds,
        palette: n.palette,
        entries: c
    };
}
function ht(e) {
    let { min, max } = e.bounds;
    let dimensions = {
        x: max.x - min.x + 1,
        y: max.y - min.y + 1,
        z: max.z - min.z + 1
    };
    let i = Array(e.palette.length).fill(0);
    for (let t of e.entries){
        i[t.palette] = (i[t.palette] ?? 0) + 1;
    }
    let a = new Map;
    e.palette.forEach((e, t)=>{
        let n = a.get(e.id);
        if (n) {
            n.count += i[t] ?? 0;
        } else {
            a.set(e.id, {
                id: e.id,
                name: e.name,
                count: i[t] ?? 0
            });
        }
    });
    let materials = [
        ...a.values()
    ].sort((e, t)=>t.count - e.count);
    let s = new Map;
    e.palette.forEach((e, t)=>{
        s.set(e.namespace, (s.get(e.namespace) ?? 0) + (i[t] ?? 0));
    });
    let namespaces = [
        ...s.entries()
    ].map(([namespace, count])=>({
            namespace,
            count
        })).sort((e, t)=>t.count - e.count);
    return {
        dimensions,
        blockCount: e.entries.length,
        paletteSize: e.palette.length,
        mcVersion: e.mcVersion,
        sourceFormat: e.sourceFormat,
        materials,
        namespaces
    };
}
async function gt(e) {
    let t = e.entries.map((t)=>{
        let n = e.palette[t.palette]?.stateKey ?? `?`;
        let r = `${t.pos[0]},${t.pos[1]},${t.pos[2]}\t${n}`;
        let i = _t(t);
        if (i) {
            return `${r}\t${i}`;
        }
        return r;
    });
    t.sort();
    let n = `${e.entries.length}
${t.join(`
`)}`;
    let r = await crypto.subtle.digest(`SHA-256`, new TextEncoder().encode(n));
    return [
        ...new Uint8Array(r)
    ].map((e)=>e.toString(16).padStart(2, `0`)).join(``);
}
function _t(e) {
    let e_blockEntity = e.blockEntity;
    let n = e.debug?.residualBlockEntity;
    let r = e_blockEntity !== undefined && Object.keys(e_blockEntity).length > 0;
    let i = n !== undefined && Object.keys(n).length > 0;
    if (!r && !i) {
        return ``;
    }
    return vt({
        ...r ? {
            be: e_blockEntity
        } : {},
        ...i ? {
            r: n
        } : {}
    });
}
function vt(e) {
    if (e == null) {
        return `null`;
    }
    let t = typeof e;
    if (t === `string`) {
        return JSON.stringify(e);
    }
    if (t === `number`) {
        if (Number.isFinite(e)) {
            return String(e);
        }
        return `null`;
    }
    if (t === `bigint`) {
        return `${e}n`;
    }
    if (t === `boolean`) {
        if (e) {
            return `true`;
        }
        return `false`;
    }
    if (Array.isArray(e)) {
        return `[${e.map(vt).join(`,`)}]`;
    }
    if (t === `object`) {
        let t = e;
        return `{${Object.keys(t).sort().map((e)=>`${JSON.stringify(e)}:${vt(t[e])}`).join(`,`)}}`;
    }
    return JSON.stringify(String(e));
}
const yt = new Set(`hopper.dropper.dispenser.observer.comparator.repeater.lever.piston.sticky_piston.piston_head.moving_piston.note_block.daylight_detector.tripwire.tripwire_hook.target.sculk_sensor.calibrated_sculk_sensor.crafter.tnt.rail.chest.trapped_chest.ender_chest.barrel.shulker_box.lectern.cauldron.bell`.split(`.`));
const bt = [
    `_button`,
    `_pressure_plate`,
    `_rail`,
    `_chest`,
    `_shulker_box`
];
const xt = new Set([
    `jack_o_lantern`,
    `sea_lantern`
]);
const St = new Set(`iron_bars.chain.ladder.snow.torch.soul_torch.lantern.soul_lantern.candle.cactus.anvil.brewing_stand.grindstone.amethyst_cluster.pointed_dripstone.pitcher_plant.wildflowers.leaf_litter.golden_dandelion.end_rod.lightning_rod.scaffolding.cobweb.vine.glow_lichen.sculk_vein.flower_pot.campfire.soul_campfire.cake.conduit.short_grass.grass.tall_grass.fern.large_fern.dead_bush.seagrass.tall_seagrass.kelp.kelp_plant.bamboo.sugar_cane.lily_pad.dandelion.poppy.cornflower.allium.azure_bluet.oxeye_daisy.lily_of_the_valley.wither_rose.torchflower.sunflower.lilac.rose_bush.peony.sweet_berry_bush.wheat.carrots.potatoes.beetroots.nether_wart`.split(`.`));
const Ct = `_slab._stairs._wall._fence._fence_gate._pane._trapdoor._door._carpet._sign._banner._torch._sapling._coral._coral_fan._coral_wall_fan._candle._cake._bed._head._skull._tulip._orchid._pot._anvil._chain._bars._lantern._mushroom._fungus._amethyst_bud._petals._lightning_rod`.split(`.`);
const wt = [
    `potted_`
];
function Tt(e) {
    let { name } = n(e);
    if (name.includes(`redstone`) || yt.has(name)) {
        return 3;
    }
    for (let e of bt){
        if (name.endsWith(e)) {
            return 3;
        }
    }
    if (xt.has(name)) {
        return 1;
    }
    if (St.has(name)) {
        return 2;
    }
    for (let e of Ct){
        if (name.endsWith(e)) {
            return 2;
        }
    }
    for (let e of wt){
        if (name.startsWith(e)) {
            return 2;
        }
    }
    return 1;
}
const Et = 2 ** 52;
const Dt = Math.floor(Et / 200);
const Ot = [
    (e, t)=>[
            e,
            t
        ],
    (e, t)=>[
            t,
            -e
        ],
    (e, t)=>[
            -e,
            -t
        ],
    (e, t)=>[
            -t,
            e
        ],
    (e, t)=>[
            -e,
            t
        ],
    (e, t)=>[
            t,
            e
        ],
    (e, t)=>[
            e,
            -t
        ],
    (e, t)=>[
            -t,
            -e
        ]
];
const kt = (()=>{
    let e = new Uint8Array(216);
    Ot.forEach((t, n)=>{
        for(let r = -1; r <= 1; r++){
            for(let i = -1; i <= 1; i++){
                for(let a = -1; a <= 1; a++){
                    let o = a + 1 + 3 * (i + 1) + 9 * (r + 1);
                    let [s, c] = t(a, i);
                    e[n * 27 + o] = s + 1 + 3 * (c + 1) + 9 * (r + 1);
                }
            }
        }
    });
    return e;
})();
function At(e) {
    let t = 2166136261;
    for(let n = 0; n < e.length; n++){
        t ^= e.charCodeAt(n);
        t = Math.imul(t, 16777619);
    }
    t ^= t >>> 16;
    t = Math.imul(t, 2246822507);
    t ^= t >>> 13;
    if (t === 0) {
        return 2654435769;
    }
    return t | 0;
}
class jt {
    constructor(){
        this.below = new Set;
        this.heap = new Float64Array(200);
        this.inHeap = new Set;
        this.size = 0;
        this.saturated = false;
    }
    add(e) {
        if (e < Dt) {
            this.below.add(e);
        }
        if (!this.saturated) {
            if (this.inHeap.has(e)) {
                return;
            }
            this.heap[this.size] = e;
            this.inHeap.add(e);
            this.siftUp(this.size++);
            if (this.size === 200) {
                this.saturated = true;
            }
            return;
        }
        if (!(e >= this.heap[0] || this.inHeap.has(e))) {
            this.inHeap.delete(this.heap[0]);
            this.inHeap.add(e);
            this.heap[0] = e;
            this.siftDown();
        }
    }
    finish() {
        let hashes = this.below.size >= 200 ? Float64Array.from(this.below) : this.heap.slice(0, this.size);
        hashes.sort();
        return {
            hashes,
            features: this.saturated ? Math.max(this.below.size * 200, 200) : this.size
        };
    }
    siftUp(e) {
        let heap = this.heap;
        while(e > 0){
            let n = e - 1 >> 1;
            if (heap[n] >= heap[e]) {
                break;
            }
            let r = heap[n];
            heap[n] = heap[e];
            heap[e] = r;
            e = n;
        }
    }
    siftDown() {
        let heap = this.heap;
        let size = this.size;
        let n = 0;
        while(true){
            let r = 2 * n + 1;
            let i = r + 1;
            let a = n;
            if (r < size && heap[r] > heap[a]) {
                a = r;
            }
            if (i < size && heap[i] > heap[a]) {
                a = i;
            }
            if (a === n) {
                return;
            }
            let o = heap[a];
            heap[a] = heap[n];
            heap[n] = o;
            n = a;
        }
    }
}
function Mt(e) {
    let { min, max } = e.bounds;
    let r = max.x - min.x + 1;
    let i = max.y - min.y + 1;
    let a = max.z - min.z + 1;
    let o = r + 2;
    let s = a + 2;
    let c = o * (i + 2) * s;
    let l = new Uint8Array(c);
    let u = new Int32Array(c);
    let d = e.palette.map((e)=>Tt(e.id));
    let f = e.palette.map((e)=>At(e.id));
    for (let n of e.entries){
        let e = n.pos[0] - min.x + 1 + o * (n.pos[2] - min.z + 1 + s * (n.pos[1] - min.y + 1));
        l[e] = d[n.palette] ?? 0;
        u[e] = f[n.palette] ?? 0;
    }
    let p = new Int32Array(27);
    for(let e = -1; e <= 1; e++){
        for(let t = -1; t <= 1; t++){
            for(let n = -1; n <= 1; n++){
                p[n + 1 + 3 * (t + 1) + 9 * (e + 1)] = n + o * (t + s * e);
            }
        }
    }
    let m = new jt;
    let h = new jt;
    let g = new Int32Array(27);
    let _ = new Int32Array(27);
    for (let n of e.entries){
        let e = n.pos[0] - min.x + 1 + o * (n.pos[2] - min.z + 1 + s * (n.pos[1] - min.y + 1));
        for(let t = 0; t < 27; t++){
            let n = e + p[t];
            g[t] = l[n];
            _[t] = u[n];
        }
        m.add(Nt(g, 1));
        h.add(Nt(_, 2));
    }
    return {
        version: 1,
        shape: m.finish(),
        material: h.finish()
    };
}
function Nt(e, t) {
    let n = Infinity;
    for(let r = 0; r < 8; r++){
        let i = r * 27;
        let a = 2654435769 ^ t;
        let o = 2246822519 + t | 0;
        for(let t = 0; t < 27; t++){
            let n = e[kt[i + t]];
            a = Math.imul(a ^ n, 2246822507);
            a ^= a >>> 13;
            o = Math.imul(o ^ n, 3266489909);
            o ^= o >>> 11;
        }
        a ^= a >>> 16;
        a = Math.imul(a, 2146121005);
        a ^= a >>> 15;
        o ^= o >>> 16;
        o = Math.imul(o, 2221713035);
        o ^= o >>> 16;
        let s = (a >>> 0) * 1048576 + (o >>> 12);
        if (s < n) {
            n = s;
        }
    }
    return n;
}
const Pt = 0.85;
const Ft = 0.8;
const It = 0.85;
const Lt = 0.7;
const Rt = 0.5;
const zt = 0.6;
const Bt = 1000;
function Vt(e) {
    let length = e.hashes.length;
    if (length === 0) {
        return Dt;
    }
    let n = e.hashes[length - 1];
    if (n >= Dt) {
        return n + 1;
    }
    return Dt;
}
function Ht(e, t) {
    let n = Math.min(Vt(e), Vt(t));
    let r = 0;
    let i = 0;
    let shared = 0;
    let e_hashes = e.hashes;
    let t_hashes = t.hashes;
    while(r < e_hashes.length && e_hashes[r] < n && i < t_hashes.length && t_hashes[i] < n){
        let e = e_hashes[r];
        let t = t_hashes[i];
        if (e === t) {
            shared++;
            r++;
            i++;
        } else if (e < t) {
            r++;
        } else {
            i++;
        }
    }
    while(r < e_hashes.length && e_hashes[r] < n){
        r++;
    }
    while(i < t_hashes.length && t_hashes[i] < n){
        i++;
    }
    let sizeA = r;
    let sizeB = i;
    let u = sizeA + sizeB - shared;
    return {
        jaccard: u > 0 ? shared / u : 0,
        containAInB: sizeA > 0 ? shared / sizeA : 0,
        containBInA: sizeB > 0 ? shared / sizeB : 0,
        shared,
        sizeA,
        sizeB,
        features: Math.min(e.features, t.features),
        effective: Math.min(e.features, t.features) >= 300
    };
}
function Ut(e, t) {
    let verdict = `weak`;
    let r = 0;
    let i = 0;
    let a = (e, t, features)=>{
        if (t > r) {
            verdict = e;
            r = t;
            i = features;
        }
    };
    if (t.effective && t.jaccard >= 0.85) {
        a(`similar`, t.jaccard, t.features);
    }
    if (e.effective && e.jaccard >= 0.8) {
        a(`similar`, e.jaccard, e.features);
    }
    if (verdict === `weak`) {
        for (let n of [
            e,
            t
        ]){
            if (n.effective) {
                if (n.containBInA >= 0.85 && n.sizeB <= 0.7 * n.sizeA) {
                    a(`a_contains_b`, n.containBInA, n.features);
                }
                if (n.containAInB >= 0.85 && n.sizeA <= 0.7 * n.sizeB) {
                    a(`b_contains_a`, n.containAInB, n.features);
                }
            }
        }
    }
    if (verdict !== `weak`) {
        return {
            store: true,
            verdict,
            confidence: Wt(r, i)
        };
    }
    for (let n of [
        e,
        t
    ]){
        if (!n.effective) {
            continue;
        }
        if (n.jaccard >= 0.5) {
            a(`weak`, n.jaccard, n.features);
        }
        let e = Math.max(n.containAInB, n.containBInA);
        if (e >= 0.6) {
            a(`weak`, e, n.features);
        }
    }
    if (r > 0) {
        return {
            store: true,
            verdict: `weak`,
            confidence: Wt(r, i)
        };
    }
    return {
        store: false,
        verdict: `weak`,
        confidence: 0
    };
}
function Wt(e, t) {
    return e * Math.min(1, t / Bt);
}
const Gt = a_1({
    BUILD_CODEC_VERSION: ()=>2,
    BUILD_EXTENSION: ()=>ot,
    CONFIDENCE_FULL_FEATURES: ()=>Bt,
    CONTAIN_SIZE_RATIO: ()=>Lt,
    FOOTPRINT_FLOOR: ()=>200,
    FOOTPRINT_HASH_SPACE: ()=>Et,
    FOOTPRINT_SCALE: ()=>200,
    FOOTPRINT_THRESHOLD: ()=>Dt,
    FOOTPRINT_VERSION: ()=>1,
    MAX_BUILD_DECOMPRESSED_BYTES: ()=>lt,
    MIN_EFFECTIVE_FEATURES: ()=>300,
    PROJECT_EXTENSION: ()=>i,
    PROJECT_SCHEMA_VERSION: ()=>1,
    SCHEMATIC_FORMATS: ()=>t,
    SHAPE_AIR: ()=>0,
    SHAPE_FULL: ()=>1,
    SHAPE_FUNCTIONAL: ()=>3,
    SHAPE_PARTIAL: ()=>2,
    STORE_CONTAINMENT: ()=>zt,
    STORE_JACCARD: ()=>Rt,
    VERDICT_CONTAINMENT: ()=>It,
    VERDICT_MATERIAL_JACCARD: ()=>Pt,
    VERDICT_SHAPE_JACCARD: ()=>Ft,
    blueprintFromProject: ()=>de,
    canonicalString: ()=>vt,
    computeFootprint: ()=>Mt,
    computeStateKey: ()=>h,
    contentHash: ()=>gt,
    decodeBuild: ()=>mt,
    decodeProject: ()=>me,
    deriveMetadata: ()=>ht,
    encodeBuild: ()=>pt,
    encodeProject: ()=>pe,
    isEncodedBuild: ()=>st,
    judgeMatch: ()=>Ut,
    materialLabel: ()=>At,
    packBuild: ()=>ce,
    parseBlockId: ()=>n,
    projectFromBlueprint: ()=>ue,
    scoreChannel: ()=>Ht,
    shapeClass: ()=>Tt,
    unpackBuild: ()=>le
});
export { t as _, st as a, me as c, ue as d, le as f, n as g, mt as i, pe as l, i as m, gt as n, it as o, se as p, ot as r, de as s, Gt as t, ce as u };
