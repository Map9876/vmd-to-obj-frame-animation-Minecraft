import { fromByteArray, toByteArray } from "./module-51746.js";
import { read, write } from "./module-55459.js";
let s = typeof Symbol === "function" && typeof Symbol.for === "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
function a(t) {
    if (t > 2147483647) {
        throw RangeError(`The value "${t}" is invalid for option "size"`);
    }
    let e = new Uint8Array(t);
    Object.setPrototypeOf(e, hp.prototype);
    return e;
}
export function hp(t, e, r) {
    if (typeof t === "number") {
        if (typeof e === "string") {
            throw TypeError('The "string" argument must be of type string. Received type number');
        }
        return u(t);
    }
    return f(t, e, r);
}
function f(t, e, r) {
    if (typeof t === "string") {
        const n = t;
        let i = e;
        if (typeof i !== "string" || i === "") {
            i = "utf8";
        }
        if (!hp.isEncoding(i)) {
            throw TypeError(`Unknown encoding: ${i}`);
        }
        let r = 0 | p(n, i);
        let s = a(r);
        let f = s.write(n, i);
        if (f !== r) {
            s = s.slice(0, f);
        }
        return s;
    }
    if (ArrayBuffer.isView(t)) {
        const s = t;
        if (L(s, Uint8Array)) {
            let t = new Uint8Array(s);
            return c(t.buffer, t.byteOffset, t.byteLength);
        }
        return l(s);
    }
    if (t == null) {
        throw TypeError(`The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ${typeof t}`);
    }
    if (L(t, ArrayBuffer) || t && L(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer !== "undefined" && (L(t, SharedArrayBuffer) || t && L(t.buffer, SharedArrayBuffer))) {
        return c(t, e, r);
    }
    if (typeof t === "number") {
        throw TypeError('The "value" argument must not be of type number. Received type number');
    }
    let f = t.valueOf && t.valueOf();
    if (f != null && f !== t) {
        return hp.from(f, e, r);
    }
    let h = ((t)=>{
        if (hp.isBuffer(t)) {
            let e = 0 | d(t.length);
            let r = a(e);
            if (r.length !== 0) {
                t.copy(r, 0, 0, e);
            }
            return r;
        }
        if (t.length !== undefined) {
            if (typeof t.length !== "number" || ((t)=>t != t)(t.length)) {
                return a(0);
            }
            return l(t);
        }
        if (t.type === "Buffer" && Array.isArray(t.data)) {
            return l(t.data);
        }
    })(t);
    if (h) {
        return h;
    }
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof t[Symbol.toPrimitive] === "function") {
        return hp.from(t[Symbol.toPrimitive]("string"), e, r);
    }
    throw TypeError(`The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ${typeof t}`);
}
function h(t) {
    if (typeof t !== "number") {
        throw TypeError('"size" argument must be of type number');
    }
    if (t < 0) {
        throw RangeError(`The value "${t}" is invalid for option "size"`);
    }
}
function u(t) {
    h(t);
    return a(t < 0 ? 0 : 0 | d(t));
}
function l(t) {
    let e = t.length < 0 ? 0 : 0 | d(t.length);
    let r = a(e);
    for(let n = 0; n < e; n += 1){
        r[n] = 255 & t[n];
    }
    return r;
}
function c(t, e, r) {
    let n;
    if (e < 0 || t.byteLength < e) {
        throw RangeError('"offset" is outside of buffer bounds');
    }
    if (t.byteLength < e + (r || 0)) {
        throw RangeError('"length" is outside of buffer bounds');
    }
    Object.setPrototypeOf(n = e === undefined && r === undefined ? new Uint8Array(t) : r === undefined ? new Uint8Array(t, e) : new Uint8Array(t, e, r), hp.prototype);
    return n;
}
function d(t) {
    if (t >= 2147483647) {
        throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");
    }
    return 0 | t;
}
function p(t, e) {
    if (hp.isBuffer(t)) {
        return t.length;
    }
    if (ArrayBuffer.isView(t) || L(t, ArrayBuffer)) {
        return t.byteLength;
    }
    if (typeof t !== "string") {
        throw TypeError(`The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ${typeof t}`);
    }
    let t_length = t.length;
    let n = arguments.length > 2 && arguments[2] === true;
    if (!n && t_length === 0) {
        return 0;
    }
    let i = false;
    while(true){
        switch(e){
            case "ascii":
            case "latin1":
            case "binary":
                return t_length;
            case "utf8":
            case "utf-8":
                return U(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * t_length;
            case "hex":
                return t_length >>> 1;
            case "base64":
                return D(t).length;
            default:
                if (i) {
                    if (n) {
                        return -1;
                    }
                    return U(t).length;
                }
                e = `${e}`.toLowerCase();
                i = true;
        }
    }
}
function m(t, e, r) {
    let i = false;
    if (e === undefined || e < 0) {
        e = 0;
    }
    if (e > this.length || ((r === undefined || r > this.length) && (r = this.length), r <= 0 || (r >>>= 0) <= (e >>>= 0))) {
        return "";
    }
    for(t || (t = "utf8");;){
        switch(t){
            case "hex":
                return ((t, e, r)=>{
                    let t_length = t.length;
                    if (!e || e < 0) {
                        e = 0;
                    }
                    if (!r || r < 0 || r > t_length) {
                        r = t_length;
                    }
                    let i = "";
                    for(let n = e; n < r; ++n){
                        i += N[t[n]];
                    }
                    return i;
                })(this, e, r);
            case "utf8":
            case "utf-8":
                return b(this, e, r);
            case "ascii":
                return ((t, e, r)=>{
                    let n = "";
                    r = Math.min(t.length, r);
                    for(let i = e; i < r; ++i){
                        n += String.fromCharCode(127 & t[i]);
                    }
                    return n;
                })(this, e, r);
            case "latin1":
            case "binary":
                return ((t, e, r)=>{
                    let n = "";
                    r = Math.min(t.length, r);
                    for(let i = e; i < r; ++i){
                        n += String.fromCharCode(t[i]);
                    }
                    return n;
                })(this, e, r);
            case "base64":
                let s;
                let a;
                let o;
                s = this;
                a = e;
                o = r;
                if (a === 0 && o === s.length) {
                    return fromByteArray(s);
                }
                return fromByteArray(s.slice(a, o));
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return ((t, e, r)=>{
                    let n = t.slice(e, r);
                    let i = "";
                    for(let t = 0; t < n.length - 1; t += 2){
                        i += String.fromCharCode(n[t] + 256 * n[t + 1]);
                    }
                    return i;
                })(this, e, r);
            default:
                if (i) {
                    throw TypeError(`Unknown encoding: ${t}`);
                }
                t = `${t}`.toLowerCase();
                i = true;
        }
    }
}
function g(t, e, r) {
    let n = t[e];
    t[e] = t[r];
    t[r] = n;
}
function _(t, e, r, n, i) {
    let s;
    if (t.length === 0) {
        return -1;
    }
    if (typeof r === "string") {
        n = r;
        r = 0;
    } else if (r > 2147483647) {
        r = 2147483647;
    } else if (r < -2147483648) {
        r = -2147483648;
    }
    if ((s = r *= 1) != s) {
        r = i ? 0 : t.length - 1;
    }
    if (r < 0) {
        r = t.length + r;
    }
    if (r >= t.length) {
        if (i) {
            return -1;
        } else {
            r = t.length - 1;
        }
    } else if (r < 0) {
        if (!i) {
            return -1;
        } else {
            r = 0;
        }
    }
    if (typeof e === "string") {
        e = hp.from(e, n);
    }
    if (hp.isBuffer(e)) {
        if (e.length === 0) {
            return -1;
        }
        return y(t, e, r, n, i);
    }
    if (typeof e === "number") {
        e &= 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
            if (i) {
                return Uint8Array.prototype.indexOf.call(t, e, r);
            } else {
                return Uint8Array.prototype.lastIndexOf.call(t, e, r);
            }
        }
        return y(t, [
            e
        ], r, n, i);
    }
    throw TypeError("val must be string, number or Buffer");
}
function y(t, e, r, n, i) {
    let s;
    let a = 1;
    let t_length = t.length;
    let e_length = e.length;
    if (n !== undefined && ((n = String(n).toLowerCase()) === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
        if (t.length < 2 || e.length < 2) {
            return -1;
        }
        a = 2;
        t_length /= 2;
        e_length /= 2;
        r /= 2;
    }
    function h(t, e) {
        if (a === 1) {
            return t[e];
        }
        return t.readUInt16BE(e * a);
    }
    if (i) {
        let n = -1;
        for(s = r; s < t_length; s++){
            if (h(t, s) === h(e, n === -1 ? 0 : s - n)) {
                if (n === -1) {
                    n = s;
                }
                if (s - n + 1 === e_length) {
                    return n * a;
                }
            } else {
                if (n !== -1) {
                    s -= s - n;
                }
                n = -1;
            }
        }
    } else {
        if (r + e_length > t_length) {
            r = t_length - e_length;
        }
        for(s = r; s >= 0; s--){
            let r = true;
            for(let n = 0; n < e_length; n++){
                if (h(t, s + n) !== h(e, n)) {
                    r = false;
                    break;
                }
            }
            if (r) {
                return s;
            }
        }
    }
    return -1;
}
function b(t, e, r) {
    r = Math.min(t.length, r);
    let n = [];
    let i = e;
    while(i < r){
        let e = t[i];
        let s = null;
        let a = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
        if (i + a <= r) {
            let r;
            let n;
            let o;
            let f;
            switch(a){
                case 1:
                    if (e < 128) {
                        s = e;
                    }
                    break;
                case 2:
                    if ((192 & (r = t[i + 1])) == 128 && (f = (31 & e) << 6 | 63 & r) > 127) {
                        s = f;
                    }
                    break;
                case 3:
                    r = t[i + 1];
                    n = t[i + 2];
                    if ((192 & r) == 128 && (192 & n) == 128 && (f = (15 & e) << 12 | (63 & r) << 6 | 63 & n) > 2047 && (f < 55296 || f > 57343)) {
                        s = f;
                    }
                    break;
                case 4:
                    r = t[i + 1];
                    n = t[i + 2];
                    o = t[i + 3];
                    if ((192 & r) == 128 && (192 & n) == 128 && (192 & o) == 128 && (f = (15 & e) << 18 | (63 & r) << 12 | (63 & n) << 6 | 63 & o) > 65535 && f < 1114112) {
                        s = f;
                    }
            }
        }
        if (s === null) {
            s = 65533;
            a = 1;
        } else if (s > 65535) {
            s -= 65536;
            n.push(s >>> 10 & 1023 | 55296);
            s = 56320 | 1023 & s;
        }
        n.push(s);
        i += a;
    }
    const s = n;
    let s_length = s.length;
    if (s_length <= 4096) {
        return String.fromCharCode(...s);
    }
    let o = "";
    let f = 0;
    while(f < s_length){
        o += String.fromCharCode(...s.slice(f, f += 4096));
    }
    return o;
}
function v(t, e, r) {
    if (t % 1 != 0 || t < 0) {
        throw RangeError("offset is not uint");
    }
    if (t + e > r) {
        throw RangeError("Trying to access beyond buffer length");
    }
}
function w(t, e, r, n, i, s) {
    if (!hp.isBuffer(t)) {
        throw TypeError('"buffer" argument must be a Buffer instance');
    }
    if (e > i || e < s) {
        throw RangeError('"value" argument is out of bounds');
    }
    if (r + n > t.length) {
        throw RangeError("Index out of range");
    }
}
function k(t, e, r, n, i) {
    z(e, n, i, t, r, 7);
    let s = Number(e & BigInt(4294967295));
    t[r++] = s;
    s >>= 8;
    t[r++] = s;
    s >>= 8;
    t[r++] = s;
    s >>= 8;
    t[r++] = s;
    let a = Number(e >> BigInt(32) & BigInt(4294967295));
    t[r++] = a;
    a >>= 8;
    t[r++] = a;
    a >>= 8;
    t[r++] = a;
    a >>= 8;
    t[r++] = a;
    return r;
}
function x(t, e, r, n, i) {
    z(e, n, i, t, r, 7);
    let s = Number(e & BigInt(4294967295));
    t[r + 7] = s;
    s >>= 8;
    t[r + 6] = s;
    s >>= 8;
    t[r + 5] = s;
    s >>= 8;
    t[r + 4] = s;
    let a = Number(e >> BigInt(32) & BigInt(4294967295));
    t[r + 3] = a;
    a >>= 8;
    t[r + 2] = a;
    a >>= 8;
    t[r + 1] = a;
    a >>= 8;
    t[r] = a;
    return r + 8;
}
function E(t, e, r, n, i, s) {
    if (r + n > t.length || r < 0) {
        throw RangeError("Index out of range");
    }
}
function A(t, e, r, n, s) {
    e *= 1;
    r >>>= 0;
    if (!s) {
        E(t, e, r, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
    }
    write(t, e, r, n, 23, 4);
    return r + 4;
}
function S(t, e, r, n, s) {
    e *= 1;
    r >>>= 0;
    if (!s) {
        E(t, e, r, 8, 1.7976931348623157e+308, -1.7976931348623157e+308);
    }
    write(t, e, r, n, 52, 8);
    return r + 8;
}
export const IS = 50;
hp.TYPED_ARRAY_SUPPORT = (()=>{
    try {
        let t = new Uint8Array(1);
        let e = {
            foo: function() {
                return 42;
            }
        };
        Object.setPrototypeOf(e, Uint8Array.prototype);
        Object.setPrototypeOf(t, e);
        return t.foo() === 42;
    } catch (t) {
        return false;
    }
})();
if (!(hp.TYPED_ARRAY_SUPPORT || typeof console === "undefined" || typeof console.error !== "function")) {
    console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
}
Object.defineProperty(hp.prototype, "parent", {
    enumerable: true,
    get: function() {
        if (hp.isBuffer(this)) {
            return this.buffer;
        }
    }
});
Object.defineProperty(hp.prototype, "offset", {
    enumerable: true,
    get: function() {
        if (hp.isBuffer(this)) {
            return this.byteOffset;
        }
    }
});
hp.poolSize = 8192;
hp.from = function(t, e, r) {
    return f(t, e, r);
};
Object.setPrototypeOf(hp.prototype, Uint8Array.prototype);
Object.setPrototypeOf(hp, Uint8Array);
hp.alloc = function(t, e, r) {
    h(t);
    if (t <= 0) {
        return a(t);
    }
    if (e !== undefined) {
        if (typeof r === "string") {
            return a(t).fill(e, r);
        }
        return a(t).fill(e);
    }
    return a(t);
};
hp.allocUnsafe = function(t) {
    return u(t);
};
hp.allocUnsafeSlow = function(t) {
    return u(t);
};
hp.isBuffer = function(t) {
    return t != null && t._isBuffer === true && t !== hp.prototype;
};
hp.compare = function(t, e) {
    if (L(t, Uint8Array)) {
        t = hp.from(t, t.offset, t.byteLength);
    }
    if (L(e, Uint8Array)) {
        e = hp.from(e, e.offset, e.byteLength);
    }
    if (!hp.isBuffer(t) || !hp.isBuffer(e)) {
        throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    }
    if (t === e) {
        return 0;
    }
    let t_length = t.length;
    let e_length = e.length;
    for(let i = 0, s = Math.min(t_length, e_length); i < s; ++i){
        if (t[i] !== e[i]) {
            t_length = t[i];
            e_length = e[i];
            break;
        }
    }
    if (t_length < e_length) {
        return -1;
    }
    return +(e_length < t_length);
};
hp.isEncoding = function(t) {
    switch(String(t).toLowerCase()){
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return true;
        default:
            return false;
    }
};
hp.concat = function(t, e) {
    let r;
    if (!Array.isArray(t)) {
        throw TypeError('"list" argument must be an Array of Buffers');
    }
    if (t.length === 0) {
        return hp.alloc(0);
    }
    if (e === undefined) {
        r = 0;
        for(e = 0; r < t.length; ++r){
            e += t[r].length;
        }
    }
    let n = hp.allocUnsafe(e);
    let i = 0;
    for(r = 0; r < t.length; ++r){
        let e = t[r];
        if (L(e, Uint8Array)) {
            if (i + e.length > n.length) {
                if (!hp.isBuffer(e)) {
                    e = hp.from(e);
                }
                e.copy(n, i);
            } else {
                Uint8Array.prototype.set.call(n, e, i);
            }
        } else if (hp.isBuffer(e)) {
            e.copy(n, i);
        } else {
            throw TypeError('"list" argument must be an Array of Buffers');
        }
        i += e.length;
    }
    return n;
};
hp.byteLength = p;
hp.prototype._isBuffer = true;
hp.prototype.swap16 = function() {
    let length = this.length;
    if (length % 2 != 0) {
        throw RangeError("Buffer size must be a multiple of 16-bits");
    }
    for(let e = 0; e < length; e += 2){
        g(this, e, e + 1);
    }
    return this;
};
hp.prototype.swap32 = function() {
    let length = this.length;
    if (length % 4 != 0) {
        throw RangeError("Buffer size must be a multiple of 32-bits");
    }
    for(let e = 0; e < length; e += 4){
        g(this, e, e + 3);
        g(this, e + 1, e + 2);
    }
    return this;
};
hp.prototype.swap64 = function() {
    let length = this.length;
    if (length % 8 != 0) {
        throw RangeError("Buffer size must be a multiple of 64-bits");
    }
    for(let e = 0; e < length; e += 8){
        g(this, e, e + 7);
        g(this, e + 1, e + 6);
        g(this, e + 2, e + 5);
        g(this, e + 3, e + 4);
    }
    return this;
};
hp.prototype.toString = function() {
    let length = this.length;
    if (length === 0) {
        return "";
    }
    if (arguments.length == 0) {
        return b(this, 0, length);
    }
    return m.apply(this, arguments);
};
hp.prototype.toLocaleString = hp.prototype.toString;
hp.prototype.equals = function(t) {
    if (!hp.isBuffer(t)) {
        throw TypeError("Argument must be a Buffer");
    }
    return this === t || hp.compare(this, t) === 0;
};
hp.prototype.inspect = function() {
    let t = "";
    let r = IS;
    t = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > r) {
        t += " ... ";
    }
    return `<Buffer ${t}>`;
};
if (s) {
    hp.prototype[s] = hp.prototype.inspect;
}
hp.prototype.compare = function(t, e = 0, r, n = 0, i) {
    if (L(t, Uint8Array)) {
        t = hp.from(t, t.offset, t.byteLength);
    }
    if (!hp.isBuffer(t)) {
        throw TypeError(`The "target" argument must be one of type Buffer or Uint8Array. Received type ${typeof t}`);
    }
    if (r === undefined) {
        r = t ? t.length : 0;
    }
    if (i === undefined) {
        i = this.length;
    }
    if (e < 0 || r > t.length || n < 0 || i > this.length) {
        throw RangeError("out of range index");
    }
    if (n >= i && e >= r) {
        return 0;
    }
    if (n >= i) {
        return -1;
    }
    if (e >= r) {
        return 1;
    }
    e >>>= 0;
    r >>>= 0;
    n >>>= 0;
    i >>>= 0;
    if (this === t) {
        return 0;
    }
    let s = i - n;
    let a = r - e;
    let f = Math.min(s, a);
    let h = this.slice(n, i);
    let u = t.slice(e, r);
    for(let t = 0; t < f; ++t){
        if (h[t] !== u[t]) {
            s = h[t];
            a = u[t];
            break;
        }
    }
    if (s < a) {
        return -1;
    }
    return +(a < s);
};
hp.prototype.includes = function(t, e, r) {
    return this.indexOf(t, e, r) !== -1;
};
hp.prototype.indexOf = function(t, e, r) {
    return _(this, t, e, r, true);
};
hp.prototype.lastIndexOf = function(t, e, r) {
    return _(this, t, e, r, false);
};
hp.prototype.write = function(t, e, r, n) {
    let i;
    let s;
    let a;
    let o;
    let f;
    let h;
    let u;
    let l;
    if (e === undefined) {
        n = "utf8";
        r = this.length;
        e = 0;
    } else if (r === undefined && typeof e === "string") {
        n = e;
        r = this.length;
        e = 0;
    } else if (isFinite(e)) {
        e >>>= 0;
        if (isFinite(r)) {
            r >>>= 0;
            if (n === undefined) {
                n = "utf8";
            }
        } else {
            n = r;
            r = undefined;
        }
    } else {
        throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    }
    let c = this.length - e;
    if (r === undefined || r > c) {
        r = c;
    }
    if (t.length > 0 && (r < 0 || e < 0) || e > this.length) {
        throw RangeError("Attempt to write outside buffer bounds");
    }
    if (!n) {
        n = "utf8";
    }
    let d = false;
    while(true){
        switch(n){
            case "hex":
                return ((t, e, r, n)=>{
                    let i;
                    r = Number(r) || 0;
                    let s = t.length - r;
                    if (n) {
                        if ((n = Number(n)) > s) {
                            n = s;
                        }
                    } else {
                        n = s;
                    }
                    let e_length = e.length;
                    if (n > e_length / 2) {
                        n = e_length / 2;
                    }
                    for(i = 0; i < n; ++i){
                        let o;
                        let n = parseInt(e.substr(2 * i, 2), 16);
                        if ((o = n) != o) {
                            break;
                        }
                        t[r + i] = n;
                    }
                    return i;
                })(this, t, e, r);
            case "utf8":
            case "utf-8":
                i = e;
                s = r;
                return F(U(t, this.length - i), this, i, s);
            case "ascii":
            case "latin1":
            case "binary":
                a = e;
                o = r;
                return F(((t)=>{
                    let e = [];
                    for(let r = 0; r < t.length; ++r){
                        e.push(255 & t.charCodeAt(r));
                    }
                    return e;
                })(t), this, a, o);
            case "base64":
                f = e;
                h = r;
                return F(D(t), this, f, h);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                u = e;
                l = r;
                return F(((t, e)=>{
                    let r;
                    let n;
                    let i = [];
                    for(let s = 0; s < t.length && !((e -= 2) < 0); ++s){
                        n = (r = t.charCodeAt(s)) >> 8;
                        i.push(r % 256);
                        i.push(n);
                    }
                    return i;
                })(t, this.length - u), this, u, l);
            default:
                if (d) {
                    throw TypeError(`Unknown encoding: ${n}`);
                }
                n = `${n}`.toLowerCase();
                d = true;
        }
    }
};
hp.prototype.toJSON = function() {
    return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
    };
};
hp.prototype.slice = function(t, e) {
    let length = this.length;
    t = ~~t;
    e = e === undefined ? length : ~~e;
    if (t < 0) {
        if ((t += length) < 0) {
            t = 0;
        }
    } else if (t > length) {
        t = length;
    }
    if (e < 0) {
        if ((e += length) < 0) {
            e = 0;
        }
    } else if (e > length) {
        e = length;
    }
    if (e < t) {
        e = t;
    }
    let n = this.subarray(t, e);
    Object.setPrototypeOf(n, hp.prototype);
    return n;
};
hp.prototype.readUintLE = hp.prototype.readUIntLE = function(t, e, r) {
    t >>>= 0;
    e >>>= 0;
    if (!r) {
        v(t, e, this.length);
    }
    let n = this[t];
    let i = 1;
    let s = 0;
    while(++s < e && (i *= 256)){
        n += this[t + s] * i;
    }
    return n;
};
hp.prototype.readUintBE = hp.prototype.readUIntBE = function(t, e, r) {
    t >>>= 0;
    e >>>= 0;
    if (!r) {
        v(t, e, this.length);
    }
    let n = this[t + --e];
    let i = 1;
    while(e > 0 && (i *= 256)){
        n += this[t + --e] * i;
    }
    return n;
};
hp.prototype.readUint8 = hp.prototype.readUInt8 = function(t, e) {
    t >>>= 0;
    if (!e) {
        v(t, 1, this.length);
    }
    return this[t];
};
hp.prototype.readUint16LE = hp.prototype.readUInt16LE = function(t, e) {
    t >>>= 0;
    if (!e) {
        v(t, 2, this.length);
    }
    return this[t] | this[t + 1] << 8;
};
hp.prototype.readUint16BE = hp.prototype.readUInt16BE = function(t, e) {
    t >>>= 0;
    if (!e) {
        v(t, 2, this.length);
    }
    return this[t] << 8 | this[t + 1];
};
hp.prototype.readUint32LE = hp.prototype.readUInt32LE = function(t, e) {
    t >>>= 0;
    if (!e) {
        v(t, 4, this.length);
    }
    return (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
};
hp.prototype.readUint32BE = hp.prototype.readUInt32BE = function(t, e) {
    t >>>= 0;
    if (!e) {
        v(t, 4, this.length);
    }
    return 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
};
hp.prototype.readBigUInt64LE = P(function(t) {
    O(t >>>= 0, "offset");
    let e = this[t];
    let r = this[t + 7];
    if (e === undefined || r === undefined) {
        R(t, this.length - 8);
    }
    let n = e + 256 * this[++t] + 65536 * this[++t] + 16777216 * this[++t];
    let i = this[++t] + 256 * this[++t] + 65536 * this[++t] + 16777216 * r;
    return BigInt(n) + (BigInt(i) << BigInt(32));
});
hp.prototype.readBigUInt64BE = P(function(t) {
    O(t >>>= 0, "offset");
    let e = this[t];
    let r = this[t + 7];
    if (e === undefined || r === undefined) {
        R(t, this.length - 8);
    }
    let n = 16777216 * e + 65536 * this[++t] + 256 * this[++t] + this[++t];
    let i = 16777216 * this[++t] + 65536 * this[++t] + 256 * this[++t] + r;
    return (BigInt(n) << BigInt(32)) + BigInt(i);
});
hp.prototype.readIntLE = function(t, e, r) {
    t >>>= 0;
    e >>>= 0;
    if (!r) {
        v(t, e, this.length);
    }
    let n = this[t];
    let i = 1;
    let s = 0;
    while(++s < e && (i *= 256)){
        n += this[t + s] * i;
    }
    if (n >= (i *= 128)) {
        n -= 2 ** (8 * e);
    }
    return n;
};
hp.prototype.readIntBE = function(t, e, r) {
    t >>>= 0;
    e >>>= 0;
    if (!r) {
        v(t, e, this.length);
    }
    let n = e;
    let i = 1;
    let s = this[t + --n];
    while(n > 0 && (i *= 256)){
        s += this[t + --n] * i;
    }
    if (s >= (i *= 128)) {
        s -= 2 ** (8 * e);
    }
    return s;
};
hp.prototype.readInt8 = function(t, e) {
    t >>>= 0;
    if (!e) {
        v(t, 1, this.length);
    }
    if (128 & this[t]) {
        return -((255 - this[t] + 1) * 1);
    }
    return this[t];
};
hp.prototype.readInt16LE = function(t, e) {
    t >>>= 0;
    if (!e) {
        v(t, 2, this.length);
    }
    let r = this[t] | this[t + 1] << 8;
    if (32768 & r) {
        return 4294901760 | r;
    }
    return r;
};
hp.prototype.readInt16BE = function(t, e) {
    t >>>= 0;
    if (!e) {
        v(t, 2, this.length);
    }
    let r = this[t + 1] | this[t] << 8;
    if (32768 & r) {
        return 4294901760 | r;
    }
    return r;
};
hp.prototype.readInt32LE = function(t, e) {
    t >>>= 0;
    if (!e) {
        v(t, 4, this.length);
    }
    return this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
};
hp.prototype.readInt32BE = function(t, e) {
    t >>>= 0;
    if (!e) {
        v(t, 4, this.length);
    }
    return this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
};
hp.prototype.readBigInt64LE = P(function(t) {
    O(t >>>= 0, "offset");
    let e = this[t];
    let r = this[t + 7];
    if (e === undefined || r === undefined) {
        R(t, this.length - 8);
    }
    return (BigInt(this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (r << 24)) << BigInt(32)) + BigInt(e + 256 * this[++t] + 65536 * this[++t] + 16777216 * this[++t]);
});
hp.prototype.readBigInt64BE = P(function(t) {
    O(t >>>= 0, "offset");
    let e = this[t];
    let r = this[t + 7];
    if (e === undefined || r === undefined) {
        R(t, this.length - 8);
    }
    return (BigInt((e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t]) << BigInt(32)) + BigInt(16777216 * this[++t] + 65536 * this[++t] + 256 * this[++t] + r);
});
hp.prototype.readFloatLE = function(t, e) {
    t >>>= 0;
    if (!e) {
        v(t, 4, this.length);
    }
    return read(this, t, true, 23, 4);
};
hp.prototype.readFloatBE = function(t, e) {
    t >>>= 0;
    if (!e) {
        v(t, 4, this.length);
    }
    return read(this, t, false, 23, 4);
};
hp.prototype.readDoubleLE = function(t, e) {
    t >>>= 0;
    if (!e) {
        v(t, 8, this.length);
    }
    return read(this, t, true, 52, 8);
};
hp.prototype.readDoubleBE = function(t, e) {
    t >>>= 0;
    if (!e) {
        v(t, 8, this.length);
    }
    return read(this, t, false, 52, 8);
};
hp.prototype.writeUintLE = hp.prototype.writeUIntLE = function(t, e, r, n) {
    t *= 1;
    e >>>= 0;
    r >>>= 0;
    if (!n) {
        let n = 2 ** (8 * r) - 1;
        w(this, t, e, r, n, 0);
    }
    let i = 1;
    let s = 0;
    for(this[e] = 255 & t; ++s < r && (i *= 256);){
        this[e + s] = t / i & 255;
    }
    return e + r;
};
hp.prototype.writeUintBE = hp.prototype.writeUIntBE = function(t, e, r, n) {
    t *= 1;
    e >>>= 0;
    r >>>= 0;
    if (!n) {
        let n = 2 ** (8 * r) - 1;
        w(this, t, e, r, n, 0);
    }
    let i = r - 1;
    let s = 1;
    for(this[e + i] = 255 & t; --i >= 0 && (s *= 256);){
        this[e + i] = t / s & 255;
    }
    return e + r;
};
hp.prototype.writeUint8 = hp.prototype.writeUInt8 = function(t, e, r) {
    t *= 1;
    e >>>= 0;
    if (!r) {
        w(this, t, e, 1, 255, 0);
    }
    this[e] = 255 & t;
    return e + 1;
};
hp.prototype.writeUint16LE = hp.prototype.writeUInt16LE = function(t, e, r) {
    t *= 1;
    e >>>= 0;
    if (!r) {
        w(this, t, e, 2, 65535, 0);
    }
    this[e] = 255 & t;
    this[e + 1] = t >>> 8;
    return e + 2;
};
hp.prototype.writeUint16BE = hp.prototype.writeUInt16BE = function(t, e, r) {
    t *= 1;
    e >>>= 0;
    if (!r) {
        w(this, t, e, 2, 65535, 0);
    }
    this[e] = t >>> 8;
    this[e + 1] = 255 & t;
    return e + 2;
};
hp.prototype.writeUint32LE = hp.prototype.writeUInt32LE = function(t, e, r) {
    t *= 1;
    e >>>= 0;
    if (!r) {
        w(this, t, e, 4, 4294967295, 0);
    }
    this[e + 3] = t >>> 24;
    this[e + 2] = t >>> 16;
    this[e + 1] = t >>> 8;
    this[e] = 255 & t;
    return e + 4;
};
hp.prototype.writeUint32BE = hp.prototype.writeUInt32BE = function(t, e, r) {
    t *= 1;
    e >>>= 0;
    if (!r) {
        w(this, t, e, 4, 4294967295, 0);
    }
    this[e] = t >>> 24;
    this[e + 1] = t >>> 16;
    this[e + 2] = t >>> 8;
    this[e + 3] = 255 & t;
    return e + 4;
};
hp.prototype.writeBigUInt64LE = P(function(t, e = 0) {
    return k(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
});
hp.prototype.writeBigUInt64BE = P(function(t, e = 0) {
    return x(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
});
hp.prototype.writeIntLE = function(t, e, r, n) {
    t *= 1;
    e >>>= 0;
    if (!n) {
        let n = 2 ** (8 * r - 1);
        w(this, t, e, r, n - 1, -n);
    }
    let i = 0;
    let s = 1;
    let a = 0;
    for(this[e] = 255 & t; ++i < r && (s *= 256);){
        if (t < 0 && a === 0 && this[e + i - 1] !== 0) {
            a = 1;
        }
        this[e + i] = (t / s | 0) - a & 255;
    }
    return e + r;
};
hp.prototype.writeIntBE = function(t, e, r, n) {
    t *= 1;
    e >>>= 0;
    if (!n) {
        let n = 2 ** (8 * r - 1);
        w(this, t, e, r, n - 1, -n);
    }
    let i = r - 1;
    let s = 1;
    let a = 0;
    for(this[e + i] = 255 & t; --i >= 0 && (s *= 256);){
        if (t < 0 && a === 0 && this[e + i + 1] !== 0) {
            a = 1;
        }
        this[e + i] = (t / s | 0) - a & 255;
    }
    return e + r;
};
hp.prototype.writeInt8 = function(t, e, r) {
    t *= 1;
    e >>>= 0;
    if (!r) {
        w(this, t, e, 1, 127, -128);
    }
    if (t < 0) {
        t = 255 + t + 1;
    }
    this[e] = 255 & t;
    return e + 1;
};
hp.prototype.writeInt16LE = function(t, e, r) {
    t *= 1;
    e >>>= 0;
    if (!r) {
        w(this, t, e, 2, 32767, -32768);
    }
    this[e] = 255 & t;
    this[e + 1] = t >>> 8;
    return e + 2;
};
hp.prototype.writeInt16BE = function(t, e, r) {
    t *= 1;
    e >>>= 0;
    if (!r) {
        w(this, t, e, 2, 32767, -32768);
    }
    this[e] = t >>> 8;
    this[e + 1] = 255 & t;
    return e + 2;
};
hp.prototype.writeInt32LE = function(t, e, r) {
    t *= 1;
    e >>>= 0;
    if (!r) {
        w(this, t, e, 4, 2147483647, -2147483648);
    }
    this[e] = 255 & t;
    this[e + 1] = t >>> 8;
    this[e + 2] = t >>> 16;
    this[e + 3] = t >>> 24;
    return e + 4;
};
hp.prototype.writeInt32BE = function(t, e, r) {
    t *= 1;
    e >>>= 0;
    if (!r) {
        w(this, t, e, 4, 2147483647, -2147483648);
    }
    if (t < 0) {
        t = 4294967295 + t + 1;
    }
    this[e] = t >>> 24;
    this[e + 1] = t >>> 16;
    this[e + 2] = t >>> 8;
    this[e + 3] = 255 & t;
    return e + 4;
};
hp.prototype.writeBigInt64LE = P(function(t, e = 0) {
    return k(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
hp.prototype.writeBigInt64BE = P(function(t, e = 0) {
    return x(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
hp.prototype.writeFloatLE = function(t, e, r) {
    return A(this, t, e, true, r);
};
hp.prototype.writeFloatBE = function(t, e, r) {
    return A(this, t, e, false, r);
};
hp.prototype.writeDoubleLE = function(t, e, r) {
    return S(this, t, e, true, r);
};
hp.prototype.writeDoubleBE = function(t, e, r) {
    return S(this, t, e, false, r);
};
hp.prototype.copy = function(t, e, r, n) {
    if (!hp.isBuffer(t)) {
        throw TypeError("argument should be a Buffer");
    }
    if (!r) {
        r = 0;
    }
    if (!(n || n === 0)) {
        n = this.length;
    }
    if (e >= t.length) {
        e = t.length;
    }
    if (!e) {
        e = 0;
    }
    if (n > 0 && n < r) {
        n = r;
    }
    if (n === r || t.length === 0 || this.length === 0) {
        return 0;
    }
    if (e < 0) {
        throw RangeError("targetStart out of bounds");
    }
    if (r < 0 || r >= this.length) {
        throw RangeError("Index out of range");
    }
    if (n < 0) {
        throw RangeError("sourceEnd out of bounds");
    }
    if (n > this.length) {
        n = this.length;
    }
    if (t.length - e < n - r) {
        n = t.length - e + r;
    }
    let i = n - r;
    if (this === t && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(e, r, n);
    } else {
        Uint8Array.prototype.set.call(t, this.subarray(r, n), e);
    }
    return i;
};
hp.prototype.fill = function(t, e, r, n) {
    let i;
    if (typeof t === "string") {
        if (typeof e === "string") {
            n = e;
            e = 0;
            r = this.length;
        } else if (typeof r === "string") {
            n = r;
            r = this.length;
        }
        if (n !== undefined && typeof n !== "string") {
            throw TypeError("encoding must be a string");
        }
        if (typeof n === "string" && !hp.isEncoding(n)) {
            throw TypeError(`Unknown encoding: ${n}`);
        }
        if (t.length === 1) {
            let e = t.charCodeAt(0);
            if (n === "utf8" && e < 128 || n === "latin1") {
                t = e;
            }
        }
    } else {
        if (typeof t === "number") {
            t &= 255;
        } else if (typeof t === "boolean") {
            t = Number(t);
        }
    }
    if (e < 0 || this.length < e || this.length < r) {
        throw RangeError("Out of range index");
    }
    if (r <= e) {
        return this;
    }
    e >>>= 0;
    r = r === undefined ? this.length : r >>> 0;
    if (!t) {
        t = 0;
    }
    if (typeof t === "number") {
        for(i = e; i < r; ++i){
            this[i] = t;
        }
    } else {
        let s = hp.isBuffer(t) ? t : hp.from(t, n);
        let a = s.length;
        if (a === 0) {
            throw TypeError(`The value "${t}" is invalid for argument "value"`);
        }
        for(i = 0; i < r - e; ++i){
            this[i + e] = s[i % a];
        }
    }
    return this;
};
let B = {};
function I(t, e, r) {
    B[t] = class extends r {
        constructor(){
            super();
            Object.defineProperty(this, "message", {
                value: e.apply(this, arguments),
                writable: true,
                configurable: true
            });
            this.name = `${this.name} [${t}]`;
            this.stack;
            delete this.name;
        }
        get code() {
            return t;
        }
        set code(value) {
            Object.defineProperty(this, "code", {
                configurable: true,
                enumerable: true,
                value,
                writable: true
            });
        }
        toString() {
            return `${this.name} [${t}]: ${this.message}`;
        }
    };
}
function C(t) {
    let e = "";
    let t_length = t.length;
    let n = +(t[0] === "-");
    for(; t_length >= n + 4; t_length -= 3){
        e = `_${t.slice(t_length - 3, t_length)}${e}`;
    }
    return `${t.slice(0, t_length)}${e}`;
}
function z(t, e, r, n, i, s) {
    if (t > r || t < e) {
        let n;
        let i = typeof e === "bigint" ? "n" : "";
        n = s > 3 ? e === 0 || e === BigInt(0) ? `>= 0${i} and < 2${i} ** ${(s + 1) * 8}${i}` : `>= -(2${i} ** ${(s + 1) * 8 - 1}${i}) and < 2 ** ${(s + 1) * 8 - 1}${i}` : `>= ${e}${i} and <= ${r}${i}`;
        throw new B.ERR_OUT_OF_RANGE("value", n, t);
    }
    O(i, "offset");
    if (n[i] === undefined || n[i + s] === undefined) {
        R(i, n.length - (s + 1));
    }
}
function O(t, e) {
    if (typeof t !== "number") {
        throw new B.ERR_INVALID_ARG_TYPE(e, "number", t);
    }
}
function R(t, e, r) {
    if (Math.floor(t) !== t) {
        O(t, r);
        throw new B.ERR_OUT_OF_RANGE(r || "offset", "an integer", t);
    }
    if (e < 0) {
        throw new B.ERR_BUFFER_OUT_OF_BOUNDS;
    }
    throw new B.ERR_OUT_OF_RANGE(r || "offset", `>= ${+!!r} and <= ${e}`, t);
}
I("ERR_BUFFER_OUT_OF_BOUNDS", function(t) {
    if (t) {
        return `${t} is outside of buffer bounds`;
    }
    return "Attempt to access memory outside buffer bounds";
}, RangeError);
I("ERR_INVALID_ARG_TYPE", function(t, e) {
    return `The "${t}" argument must be of type number. Received type ${typeof e}`;
}, TypeError);
I("ERR_OUT_OF_RANGE", function(t, e, r) {
    let n = `The value of "${t}" is out of range.`;
    let i = r;
    if (Number.isInteger(r) && Math.abs(r) > 4294967296) {
        i = C(String(r));
    } else if (typeof r === "bigint") {
        i = String(r);
        if (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) {
            i = C(i);
        }
        i += "n";
    }
    return n += ` It must be ${e}. Received ${i}`;
}, RangeError);
let T = /[^+/0-9A-Za-z-_]/g;
function U(t, e) {
    let r;
    e = e || Infinity;
    let t_length = t.length;
    let i = null;
    let s = [];
    for(let a = 0; a < t_length; ++a){
        if ((r = t.charCodeAt(a)) > 55295 && r < 57344) {
            if (!i) {
                if (r > 56319 || a + 1 === t_length) {
                    if ((e -= 3) > -1) {
                        s.push(239, 191, 189);
                    }
                    continue;
                }
                i = r;
                continue;
            }
            if (r < 56320) {
                if ((e -= 3) > -1) {
                    s.push(239, 191, 189);
                }
                i = r;
                continue;
            }
            r = (i - 55296 << 10 | r - 56320) + 65536;
        } else {
            if (i && (e -= 3) > -1) {
                s.push(239, 191, 189);
            }
        }
        i = null;
        if (r < 128) {
            if ((e -= 1) < 0) {
                break;
            }
            s.push(r);
        } else if (r < 2048) {
            if ((e -= 2) < 0) {
                break;
            }
            s.push(r >> 6 | 192, 63 & r | 128);
        } else if (r < 65536) {
            if ((e -= 3) < 0) {
                break;
            }
            s.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
        } else if (r < 1114112) {
            if ((e -= 4) < 0) {
                break;
            }
            s.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
        } else {
            throw Error("Invalid code point");
        }
    }
    return s;
}
function D(t) {
    return toByteArray(((t)=>{
        if ((t = (t = t.split("=")[0]).trim().replace(T, "")).length < 2) {
            return "";
        }
        while(t.length % 4 != 0){
            t += "=";
        }
        return t;
    })(t));
}
function F(t, e, r, n) {
    let i;
    for(i = 0; i < n && !(i + r >= e.length) && !(i >= t.length); ++i){
        e[i + r] = t[i];
    }
    return i;
}
function L(t, e) {
    return t instanceof e || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === e.name;
}
let N = (()=>{
    let t = "0123456789abcdef";
    let e = Array(256);
    for(let r = 0; r < 16; ++r){
        let n = 16 * r;
        for(let i = 0; i < 16; ++i){
            e[n + i] = t[r] + t[i];
        }
    }
    return e;
})();
function P(t) {
    if (typeof BigInt === "undefined") {
        return j;
    }
    return t;
}
function j() {
    throw Error("BigInt not supported");
}
