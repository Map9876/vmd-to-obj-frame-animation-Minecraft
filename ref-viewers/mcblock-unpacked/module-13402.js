import { L } from "./module-91305.js";
export { L as LM } from "./module-91305.js";
export let Q1;
((e)=>{
    function t(e) {
        return [
            (e >> 16 & 255) / 255,
            (e >> 8 & 255) / 255,
            (255 & e) / 255
        ];
    }
    e.fromJson = function(e) {
        let r = L.readNumber(e);
        if (r) {
            return t(r);
        }
        let s = L.readArray(e, (e)=>L.readNumber(e) ?? 0);
        if (s !== undefined && s.length === 3) {
            return s;
        }
    };
    e.fromNbt = function(e) {
        if (e.isNumber()) {
            return t(e.getAsNumber());
        }
        if (!e.isListOrArray()) {
            return;
        }
        let r = e.getItems();
        if (!(r.length < 3)) {
            return r.map((e)=>e.getAsNumber());
        }
    };
    e.intToRgb = t;
})(Q1 = Q1 || (Q1 = {}));
export class r {
    source;
    cursor;
    constructor(e){
        this.source = e;
        this.cursor = 0;
    }
    get remainingLength() {
        return this.source.length - this.cursor;
    }
    get totalLength() {
        return this.source.length;
    }
    getRead(e = 0) {
        return this.source.substring(e, this.cursor);
    }
    getRemaining() {
        return this.source.substring(this.cursor);
    }
    canRead(e = 1) {
        return this.cursor + e <= this.source.length;
    }
    peek(e = 0) {
        return this.source.charAt(this.cursor + e);
    }
    read() {
        return this.source.charAt(this.cursor++);
    }
    skip() {
        this.cursor += 1;
    }
    skipWhitespace() {
        while(this.canRead() && r.isWhitespace(this.peek())){
            this.skip();
        }
    }
    expect(e, t = false) {
        if (t) {
            this.skipWhitespace();
        }
        if (!this.canRead() || this.peek() !== e) {
            throw this.createError(`Expected '${e}'`);
        }
        this.skip();
    }
    readInt() {
        let cursor = this.cursor;
        while(this.canRead() && r.isAllowedInNumber(this.peek())){
            this.skip();
        }
        let t = this.getRead(cursor);
        if (t.length === 0) {
            throw this.createError("Expected integer");
        }
        try {
            let e = Number(t);
            if (isNaN(e) || !Number.isInteger(e)) {
                throw Error();
            }
            return e;
        } catch (r) {
            this.cursor = cursor;
            throw this.createError(`Invalid integer '${t}'`);
        }
    }
    readFloat() {
        let cursor = this.cursor;
        while(this.canRead() && r.isAllowedInNumber(this.peek())){
            this.skip();
        }
        let t = this.getRead(cursor);
        if (t.length === 0) {
            throw this.createError("Expected float");
        }
        try {
            let e = Number(t);
            if (isNaN(e)) {
                throw Error();
            }
            return e;
        } catch (r) {
            this.cursor = cursor;
            throw this.createError(`Invalid float '${t}'`);
        }
    }
    readUnquotedString() {
        let cursor = this.cursor;
        while(this.canRead() && r.isAllowedInUnquotedString(this.peek())){
            this.skip();
        }
        return this.getRead(cursor);
    }
    readQuotedString() {
        if (!this.canRead()) {
            return "";
        }
        let e = this.peek();
        if (!r.isQuotedStringStart(e)) {
            throw this.createError("Expected quote to start a string");
        }
        this.skip();
        return this.readStringUntil(e);
    }
    readString() {
        if (!this.canRead()) {
            return "";
        }
        let e = this.peek();
        if (r.isQuotedStringStart(e)) {
            this.skip();
            return this.readStringUntil(e);
        }
        return this.readUnquotedString();
    }
    readStringUntil(e) {
        let t = [];
        let r = false;
        while(this.canRead()){
            let s = this.read();
            if (r) {
                if (s === e || s === "\\") {
                    t.push(s);
                    r = false;
                } else {
                    this.cursor -= 1;
                    throw this.createError(`Invalid escape sequence '${s}' in quoted string`);
                }
            } else if (s === "\\") {
                r = true;
            } else {
                if (s === e) {
                    return t.join("");
                }
                t.push(s);
            }
        }
        throw this.createError("Unclosed quoted string");
    }
    readBoolean() {
        let cursor = this.cursor;
        let t = this.readUnquotedString();
        if (t.length === 0) {
            throw this.createError("Expected bool");
        }
        if (t === "true") {
            return true;
        }
        if (t === "false") {
            return false;
        }
        this.cursor = cursor;
        throw this.createError(`Invalid bool, expected true or false but found '${t}'`);
    }
    static isAllowedInNumber(e) {
        return e >= "0" && e <= "9" || e === "." || e === "-";
    }
    static isAllowedInUnquotedString(e) {
        return e >= "0" && e <= "9" || e >= "A" && e <= "Z" || e >= "a" && e <= "z" || e === "_" || e === "-" || e === "." || e === "+";
    }
    static isQuotedStringStart(e) {
        return e === "'" || e === '"';
    }
    static isWhitespace(e) {
        return e === " " || e === "	" || e === "\n" || e === "\r";
    }
    createError(e) {
        let t = Math.min(this.source.length, this.cursor);
        let r = (t > 10 ? "..." : "") + this.source.substring(Math.max(0, t - 10), t);
        return Error(`${e} at position ${this.cursor}: ${r}<--[HERE]`);
    }
}
export function EB(e, t, r) {
    let s = e.get(t);
    if (s !== undefined) {
        return s;
    }
    let n = r(t);
    e.set(t, n);
    return n;
}
export function SK(e, t, r, s) {
    let n = e.get(t) ?? r;
    s(n, t);
    e.set(t, n);
    return n;
}
