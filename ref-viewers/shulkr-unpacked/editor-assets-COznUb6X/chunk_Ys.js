import { l } from "../dist-C5TDMOul.js";
import { g, h } from "../dist-C66QuM2X.js";
import { B } from "./chunk_$s.js";
import { Al, jl, kl } from "./chunk_Vc.js";
import { Hs } from "./chunk_go.js";
import { H } from "./chunk_ac.js";
import { fc, hc, zc } from "./chunk_fc.js";
import { Bc, q } from "./chunk_Rc.js";
export function Ys(e) {
    for(let t = e.length - 1; t >= 0; --t){
        if (e[t] >= 65535) {
            return true;
        }
    }
    return false;
}
function Ml(e, t, n) {
    if (n < 0) {
        n += 1;
    }
    if (n > 1) {
        --n;
    }
    if (n < 1 / 6) {
        return e + (t - e) * 6 * n;
    }
    if (n < 1 / 2) {
        return t;
    }
    if (n < 2 / 3) {
        return e + (t - e) * 6 * (2 / 3 - n);
    }
    return e;
}
export class X {
    constructor(e, t, n){
        this.isColor = true;
        this.r = 1;
        this.g = 1;
        this.b = 1;
        return this.set(e, t, n);
    }
    set(e, t, n) {
        if (t === undefined && n === undefined) {
            let t = e;
            if (t && t.isColor) {
                this.copy(t);
            } else if (typeof t == `number`) {
                this.setHex(t);
            } else if (typeof t == `string`) {
                this.setStyle(t);
            }
        } else {
            this.setRGB(e, t, n);
        }
        return this;
    }
    setScalar(e) {
        this.r = e;
        this.g = e;
        this.b = e;
        return this;
    }
    setHex(e, t = Hs) {
        e = Math.floor(e);
        this.r = (e >> 16 & 255) / 255;
        this.g = (e >> 8 & 255) / 255;
        this.b = (e & 255) / 255;
        q.colorSpaceToWorking(this, t);
        return this;
    }
    setRGB(e, t, n, r = q.workingColorSpace) {
        this.r = e;
        this.g = t;
        this.b = n;
        q.colorSpaceToWorking(this, r);
        return this;
    }
    setHSL(e, t, n, r = q.workingColorSpace) {
        e = fc(e, 1);
        t = H(t, 0, 1);
        n = H(n, 0, 1);
        if (t === 0) {
            this.r = this.g = this.b = n;
        } else {
            let r = n <= 0.5 ? n * (1 + t) : n + t - n * t;
            let i = 2 * n - r;
            this.r = Ml(i, r, e + 1 / 3);
            this.g = Ml(i, r, e);
            this.b = Ml(i, r, e - 1 / 3);
        }
        q.colorSpaceToWorking(this, r);
        return this;
    }
    setStyle(e, t = Hs) {
        function n(t) {
            if (t !== undefined && parseFloat(t) < 1) {
                B(`Color: Alpha component of ` + e + ` will be ignored.`);
            }
        }
        let r;
        if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
            let i;
            let a = r[1];
            let o = r[2];
            switch(a){
                case `rgb`:
                case `rgba`:
                    if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) {
                        n(i[4]);
                        return this.setRGB(Math.min(255, parseInt(i[1], 10)) / 255, Math.min(255, parseInt(i[2], 10)) / 255, Math.min(255, parseInt(i[3], 10)) / 255, t);
                    }
                    if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) {
                        n(i[4]);
                        return this.setRGB(Math.min(100, parseInt(i[1], 10)) / 100, Math.min(100, parseInt(i[2], 10)) / 100, Math.min(100, parseInt(i[3], 10)) / 100, t);
                    }
                    break;
                case `hsl`:
                case `hsla`:
                    if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) {
                        n(i[4]);
                        return this.setHSL(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, t);
                    }
                    break;
                default:
                    B(`Color: Unknown color model ` + e);
            }
        } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
            let n = r[1];
            let i = n.length;
            if (i === 3) {
                return this.setRGB(parseInt(n.charAt(0), 16) / 15, parseInt(n.charAt(1), 16) / 15, parseInt(n.charAt(2), 16) / 15, t);
            }
            if (i === 6) {
                return this.setHex(parseInt(n, 16), t);
            }
            B(`Color: Invalid hex color ` + e);
        } else if (e && e.length > 0) {
            return this.setColorName(e, t);
        }
        return this;
    }
    setColorName(e, t = Hs) {
        let n = kl[e.toLowerCase()];
        if (n === undefined) {
            B(`Color: Unknown color ` + e);
        } else {
            this.setHex(n, t);
        }
        return this;
    }
    clone() {
        return new this.constructor(this.r, this.g, this.b);
    }
    copy(e) {
        this.r = e.r;
        this.g = e.g;
        this.b = e.b;
        return this;
    }
    copySRGBToLinear(e) {
        this.r = zc(e.r);
        this.g = zc(e.g);
        this.b = zc(e.b);
        return this;
    }
    copyLinearToSRGB(e) {
        this.r = Bc(e.r);
        this.g = Bc(e.g);
        this.b = Bc(e.b);
        return this;
    }
    convertSRGBToLinear() {
        this.copySRGBToLinear(this);
        return this;
    }
    convertLinearToSRGB() {
        this.copyLinearToSRGB(this);
        return this;
    }
    getHex(e = Hs) {
        q.workingToColorSpace(Nl.copy(this), e);
        return Math.round(H(Nl.r * 255, 0, 255)) * 65536 + Math.round(H(Nl.g * 255, 0, 255)) * 256 + Math.round(H(Nl.b * 255, 0, 255));
    }
    getHexString(e = Hs) {
        return (`000000` + this.getHex(e).toString(16)).slice(-6);
    }
    getHSL(e, t = q.workingColorSpace) {
        q.workingToColorSpace(Nl.copy(this), t);
        let n = Nl.r;
        let r = Nl.g;
        let i = Nl.b;
        let a = Math.max(n, r, i);
        let o = Math.min(n, r, i);
        let s;
        let c;
        let l = (o + a) / 2;
        if (o === a) {
            s = 0;
            c = 0;
        } else {
            let e = a - o;
            c = l <= 0.5 ? e / (a + o) : e / (2 - a - o);
            switch(a){
                case n:
                    s = (r - i) / e + (r < i ? 6 : 0);
                    break;
                case r:
                    s = (i - n) / e + 2;
                    break;
                case i:
                    s = (n - r) / e + 4;
                    break;
            }
            s /= 6;
        }
        e.h = s;
        e.s = c;
        e.l = l;
        return e;
    }
    getRGB(e, t = q.workingColorSpace) {
        q.workingToColorSpace(Nl.copy(this), t);
        e.r = Nl.r;
        e.g = Nl.g;
        e.b = Nl.b;
        return e;
    }
    getStyle(e = Hs) {
        q.workingToColorSpace(Nl.copy(this), e);
        let t = Nl.r;
        let n = Nl.g;
        let r = Nl.b;
        if (e === `srgb`) {
            return `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
        }
        return `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`;
    }
    offsetHSL(e, t, n) {
        this.getHSL(Al);
        return this.setHSL(Al.h + e, Al.s + t, Al.l + n);
    }
    add(e) {
        this.r += e.r;
        this.g += e.g;
        this.b += e.b;
        return this;
    }
    addColors(e, t) {
        this.r = e.r + t.r;
        this.g = e.g + t.g;
        this.b = e.b + t.b;
        return this;
    }
    addScalar(e) {
        this.r += e;
        this.g += e;
        this.b += e;
        return this;
    }
    sub(e) {
        this.r = Math.max(0, this.r - e.r);
        this.g = Math.max(0, this.g - e.g);
        this.b = Math.max(0, this.b - e.b);
        return this;
    }
    multiply(e) {
        this.r *= e.r;
        this.g *= e.g;
        this.b *= e.b;
        return this;
    }
    multiplyScalar(e) {
        this.r *= e;
        this.g *= e;
        this.b *= e;
        return this;
    }
    lerp(e, t) {
        this.r += (e.r - this.r) * t;
        this.g += (e.g - this.g) * t;
        this.b += (e.b - this.b) * t;
        return this;
    }
    lerpColors(e, t, n) {
        this.r = e.r + (t.r - e.r) * n;
        this.g = e.g + (t.g - e.g) * n;
        this.b = e.b + (t.b - e.b) * n;
        return this;
    }
    lerpHSL(e, t) {
        this.getHSL(Al);
        e.getHSL(jl);
        let n = hc(Al.h, jl.h, t);
        let r = hc(Al.s, jl.s, t);
        let i = hc(Al.l, jl.l, t);
        this.setHSL(n, r, i);
        return this;
    }
    setFromVector3(e) {
        this.r = e.x;
        this.g = e.y;
        this.b = e.z;
        return this;
    }
    applyMatrix3(e) {
        let t = this.r;
        let n = this.g;
        let r = this.b;
        let e_elements = e.elements;
        this.r = e_elements[0] * t + e_elements[3] * n + e_elements[6] * r;
        this.g = e_elements[1] * t + e_elements[4] * n + e_elements[7] * r;
        this.b = e_elements[2] * t + e_elements[5] * n + e_elements[8] * r;
        return this;
    }
    equals(e) {
        return e.r === this.r && e.g === this.g && e.b === this.b;
    }
    fromArray(e, t = 0) {
        this.r = e[t];
        this.g = e[t + 1];
        this.b = e[t + 2];
        return this;
    }
    toArray(e = [], t = 0) {
        e[t] = this.r;
        e[t + 1] = this.g;
        e[t + 2] = this.b;
        return e;
    }
    fromBufferAttribute(e, t) {
        this.r = e.getX(t);
        this.g = e.getY(t);
        this.b = e.getZ(t);
        return this;
    }
    toJSON() {
        return this.getHex();
    }
    *[Symbol.iterator]() {
        yield this.r;
        yield this.g;
        yield this.b;
    }
}
var Nl = new X;
