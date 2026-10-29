import { n } from "../jsx-runtime-Db0DjQYK.js";
export const K = [
    `no-support`,
    `no-click`
];
export const H = (e)=>e.kind === `place`;
const xe = [
    `_bed`
];
const Se = [
    `_sign`,
    `_banner`
];
function Ce(e) {
    if (xe.some((t)=>e.endsWith(t))) {
        return 1;
    }
    if (Se.some((t)=>e.endsWith(t))) {
        return 16;
    }
    return 64;
}
export const U = (e, t)=>Math.ceil(t / Ce(e));
export const we = (e, t)=>{
    if (H(e)) {
        return {
            item: t[e.state]?.id ?? `minecraft:air`,
            count: e.cells.length,
            state: e.state
        };
    }
    return null;
};
export class G {
    constructor(e){
        this.buffer = e;
        this.at = 0;
        this.view = new DataView(e.buffer, e.byteOffset, e.byteLength);
    }
    get offset() {
        return this.at;
    }
    seek(e) {
        this.at = e;
    }
    get done() {
        return this.at >= this.buffer.length;
    }
    u8() {
        let e = this.buffer[this.at];
        if (e === undefined) {
            throw Error(`instructions: truncated`);
        }
        this.at += 1;
        return e;
    }
    u32() {
        let e = this.view.getUint32(this.at, true);
        this.at += 4;
        return e;
    }
    f64() {
        let e = this.view.getFloat64(this.at, true);
        this.at += 8;
        return e;
    }
    varint() {
        let e = 0;
        let t = 0;
        while(true){
            let n = this.buffer[this.at];
            if (n === undefined) {
                throw Error(`instructions: truncated varint`);
            }
            this.at += 1;
            e |= (n & 127) << t;
            if (!(n & 128)) {
                break;
            }
            t += 7;
            if (t > 35) {
                throw Error(`instructions: varint too long`);
            }
        }
        return e >>> 0;
    }
    signed() {
        let e = this.varint();
        return e >>> 1 ^ -(e & 1);
    }
    string() {
        let e = this.varint();
        let t = this.buffer.subarray(this.at, this.at + e);
        this.at += e;
        return new TextDecoder().decode(t);
    }
}
export const De = 1397442894;
export const Oe = 1;
export const ke = 2;
export const Ae = 3;
export const je = 1;
export const Me = 8;
export const q = 6;
export const Ne = 1;
export const Pe = 2;
