import { l as l_1 } from "../dist-C5TDMOul.js";
import { g as g_1, h as h_1, p as p_1 } from "../dist-C66QuM2X.js";
import { c as c_1, l as l_2, u as u_1 } from "../blockStateParser-3kR-Ucao.js";
import { G, K, Mc, W, c, s } from "./chunk_kc.js";
import { B, V, l } from "./chunk_$s.js";
import { Do, Js, Oo, So, To as minFilter, Uo, bo, g, h, m, p, xo, yo } from "./chunk_go.js";
import { Zs } from "./chunk_Zs.js";
import { H, dc, oc } from "./chunk_ac.js";
import { zc } from "./chunk_fc.js";
export function u(e, t, n) {
    return `${e},${t},${n}`;
}
export function d(e, t, n) {
    return u(c(e), c(t), c(n));
}
export function f(e) {
    let [x, y, z] = e.split(`,`, 3).map(Number);
    return {
        x,
        y,
        z
    };
}
let Vc;
class Hc {
    static getDataURL(e, t = `image/png`) {
        if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > `u`) {
            return e.src;
        }
        let n;
        if (e instanceof HTMLCanvasElement) {
            n = e;
        } else {
            if (Vc === undefined) {
                Vc = Zs(`canvas`);
            }
            Vc.width = e.width;
            Vc.height = e.height;
            let t = Vc.getContext(`2d`);
            if (e instanceof ImageData) {
                t.putImageData(e, 0, 0);
            } else {
                t.drawImage(e, 0, 0, e.width, e.height);
            }
            n = Vc;
        }
        return n.toDataURL(t);
    }
    static sRGBToLinear(e) {
        if (typeof HTMLImageElement < `u` && e instanceof HTMLImageElement || typeof HTMLCanvasElement < `u` && e instanceof HTMLCanvasElement || typeof ImageBitmap < `u` && e instanceof ImageBitmap) {
            let t = Zs(`canvas`);
            t.width = e.width;
            t.height = e.height;
            let n = t.getContext(`2d`);
            n.drawImage(e, 0, 0, e.width, e.height);
            let r = n.getImageData(0, 0, e.width, e.height);
            let i = r.data;
            for(let e = 0; e < i.length; e++){
                i[e] = zc(i[e] / 255) * 255;
            }
            n.putImageData(r, 0, 0);
            return t;
        } else if (e.data) {
            let t = e.data.slice(0);
            for(let e = 0; e < t.length; e++){
                if (t instanceof Uint8Array || t instanceof Uint8ClampedArray) {
                    t[e] = Math.floor(zc(t[e] / 255) * 255);
                } else {
                    t[e] = zc(t[e]);
                }
            }
            return {
                data: t,
                width: e.width,
                height: e.height
            };
        } else {
            B(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`);
            return e;
        }
    }
}
let Uc = 0;
export class Wc {
    constructor(e = null){
        this.isSource = true;
        Object.defineProperty(this, "id", {
            value: Uc++
        });
        this.uuid = dc();
        this.data = e;
        this.dataReady = true;
        this.version = 0;
    }
    getSize(e) {
        let data = this.data;
        if (typeof HTMLVideoElement < `u` && data instanceof HTMLVideoElement) {
            e.set(data.videoWidth, data.videoHeight, 0);
        } else if (typeof VideoFrame < `u` && data instanceof VideoFrame) {
            e.set(data.displayHeight, data.displayWidth, 0);
        } else if (data === null) {
            e.set(0, 0, 0);
        } else {
            e.set(data.width, data.height, data.depth || 0);
        }
        return e;
    }
    set needsUpdate(e) {
        if (e === true) {
            this.version++;
        }
    }
    toJSON(e) {
        let t = e === undefined || typeof e == `string`;
        if (!t && e.images[this.uuid] !== undefined) {
            return e.images[this.uuid];
        }
        let n = {
            uuid: this.uuid,
            url: ``
        };
        let data = this.data;
        if (data !== null) {
            let e;
            if (Array.isArray(data)) {
                e = [];
                for(let t = 0, n = data.length; t < n; t++){
                    if (data[t].isDataTexture) {
                        e.push(Gc(data[t].image));
                    } else {
                        e.push(Gc(data[t]));
                    }
                }
            } else {
                e = Gc(data);
            }
            n.url = e;
        }
        if (!t) {
            e.images[this.uuid] = n;
        }
        return n;
    }
}
function Gc(e) {
    if (typeof HTMLImageElement < `u` && e instanceof HTMLImageElement || typeof HTMLCanvasElement < `u` && e instanceof HTMLCanvasElement || typeof ImageBitmap < `u` && e instanceof ImageBitmap) {
        return Hc.getDataURL(e);
    }
    if (e.data) {
        return {
            data: Array.from(e.data),
            width: e.width,
            height: e.height,
            type: e.data.constructor.name
        };
    }
    B(`Texture: Unable to serialize Texture.`);
    return {};
}
let Kc = 0;
const qc = new G;
export const Jc = class e extends oc {
    constructor(t = e.DEFAULT_IMAGE, n = e.DEFAULT_MAPPING, r = bo, i = bo, a = minFilter, o = Do, s = Uo, c = Oo, l = e.DEFAULT_ANISOTROPY, u = ``){
        super();
        this.isTexture = true;
        Object.defineProperty(this, "id", {
            value: Kc++
        });
        this.uuid = dc();
        this.name = ``;
        this.source = new Wc(t);
        this.mipmaps = [];
        this.mapping = n;
        this.channel = 0;
        this.wrapS = r;
        this.wrapT = i;
        this.magFilter = a;
        this.minFilter = o;
        this.anisotropy = l;
        this.format = s;
        this.internalFormat = null;
        this.type = c;
        this.offset = new W(0, 0);
        this.repeat = new W(1, 1);
        this.center = new W(0, 0);
        this.rotation = 0;
        this.matrixAutoUpdate = true;
        this.matrix = new K;
        this.generateMipmaps = true;
        this.premultiplyAlpha = false;
        this.flipY = true;
        this.unpackAlignment = 4;
        this.colorSpace = u;
        this.userData = {};
        this.updateRanges = [];
        this.version = 0;
        this.onUpdate = null;
        this.renderTarget = null;
        this.isRenderTargetTexture = false;
        this.isArrayTexture = !!(t && t.depth && t.depth > 1);
        this.pmremVersion = 0;
    }
    get width() {
        return this.source.getSize(qc).x;
    }
    get height() {
        return this.source.getSize(qc).y;
    }
    get depth() {
        return this.source.getSize(qc).z;
    }
    get image() {
        return this.source.data;
    }
    set image(e = null) {
        this.source.data = e;
    }
    updateMatrix() {
        this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
    }
    addUpdateRange(start, count) {
        this.updateRanges.push({
            start,
            count
        });
    }
    clearUpdateRanges() {
        this.updateRanges.length = 0;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(e) {
        this.name = e.name;
        this.source = e.source;
        this.mipmaps = e.mipmaps.slice(0);
        this.mapping = e.mapping;
        this.channel = e.channel;
        this.wrapS = e.wrapS;
        this.wrapT = e.wrapT;
        this.magFilter = e.magFilter;
        this.minFilter = e.minFilter;
        this.anisotropy = e.anisotropy;
        this.format = e.format;
        this.internalFormat = e.internalFormat;
        this.type = e.type;
        this.offset.copy(e.offset);
        this.repeat.copy(e.repeat);
        this.center.copy(e.center);
        this.rotation = e.rotation;
        this.matrixAutoUpdate = e.matrixAutoUpdate;
        this.matrix.copy(e.matrix);
        this.generateMipmaps = e.generateMipmaps;
        this.premultiplyAlpha = e.premultiplyAlpha;
        this.flipY = e.flipY;
        this.unpackAlignment = e.unpackAlignment;
        this.colorSpace = e.colorSpace;
        this.renderTarget = e.renderTarget;
        this.isRenderTargetTexture = e.isRenderTargetTexture;
        this.isArrayTexture = e.isArrayTexture;
        this.userData = JSON.parse(JSON.stringify(e.userData));
        this.needsUpdate = true;
        return this;
    }
    setValues(e) {
        for(let t in e){
            let n = e[t];
            if (n === undefined) {
                B(`Texture.setValues(): parameter '${t}' has value of undefined.`);
                continue;
            }
            let r = this[t];
            if (r === undefined) {
                B(`Texture.setValues(): property '${t}' does not exist.`);
                continue;
            }
            if (r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3) {
                r.copy(n);
            } else {
                this[t] = n;
            }
        }
    }
    toJSON(e) {
        let t = e === undefined || typeof e == `string`;
        if (!t && e.textures[this.uuid] !== undefined) {
            return e.textures[this.uuid];
        }
        let n = {
            metadata: {
                version: 4.7,
                type: `Texture`,
                generator: `Texture.toJSON`
            },
            uuid: this.uuid,
            name: this.name,
            image: this.source.toJSON(e).uuid,
            mapping: this.mapping,
            channel: this.channel,
            repeat: [
                this.repeat.x,
                this.repeat.y
            ],
            offset: [
                this.offset.x,
                this.offset.y
            ],
            center: [
                this.center.x,
                this.center.y
            ],
            rotation: this.rotation,
            wrap: [
                this.wrapS,
                this.wrapT
            ],
            format: this.format,
            internalFormat: this.internalFormat,
            type: this.type,
            colorSpace: this.colorSpace,
            minFilter: this.minFilter,
            magFilter: this.magFilter,
            anisotropy: this.anisotropy,
            flipY: this.flipY,
            generateMipmaps: this.generateMipmaps,
            premultiplyAlpha: this.premultiplyAlpha,
            unpackAlignment: this.unpackAlignment
        };
        if (Object.keys(this.userData).length > 0) {
            n.userData = this.userData;
        }
        if (!t) {
            e.textures[this.uuid] = n;
        }
        return n;
    }
    dispose() {
        this.dispatchEvent({
            type: `dispose`
        });
    }
    transformUv(e) {
        if (this.mapping !== 300) {
            return e;
        }
        e.applyMatrix3(this.matrix);
        if (e.x < 0 || e.x > 1) {
            switch(this.wrapS){
                case yo:
                    e.x -= Math.floor(e.x);
                    break;
                case bo:
                    e.x = e.x < 0 ? 0 : 1;
                    break;
                case xo:
                    if (Math.abs(Math.floor(e.x) % 2) === 1) {
                        e.x = Math.ceil(e.x) - e.x;
                    } else {
                        e.x -= Math.floor(e.x);
                    }
                    break;
            }
        }
        if (e.y < 0 || e.y > 1) {
            switch(this.wrapT){
                case yo:
                    e.y -= Math.floor(e.y);
                    break;
                case bo:
                    e.y = e.y < 0 ? 0 : 1;
                    break;
                case xo:
                    if (Math.abs(Math.floor(e.y) % 2) === 1) {
                        e.y = Math.ceil(e.y) - e.y;
                    } else {
                        e.y -= Math.floor(e.y);
                    }
                    break;
            }
        }
        if (this.flipY) {
            e.y = 1 - e.y;
        }
        return e;
    }
    set needsUpdate(e) {
        if (e === true) {
            this.version++;
            this.source.needsUpdate = true;
        }
    }
    set needsPMREMUpdate(e) {
        if (e === true) {
            this.pmremVersion++;
        }
    }
};
export const J = class e {
    constructor(t = 0, n = 0, r = 0, i = 1){
        e.prototype.isVector4 = true;
        this.x = t;
        this.y = n;
        this.z = r;
        this.w = i;
    }
    get width() {
        return this.z;
    }
    set width(e) {
        this.z = e;
    }
    get height() {
        return this.w;
    }
    set height(e) {
        this.w = e;
    }
    set(e, t, n, r) {
        this.x = e;
        this.y = t;
        this.z = n;
        this.w = r;
        return this;
    }
    setScalar(e) {
        this.x = e;
        this.y = e;
        this.z = e;
        this.w = e;
        return this;
    }
    setX(e) {
        this.x = e;
        return this;
    }
    setY(e) {
        this.y = e;
        return this;
    }
    setZ(e) {
        this.z = e;
        return this;
    }
    setW(e) {
        this.w = e;
        return this;
    }
    setComponent(e, t) {
        switch(e){
            case 0:
                this.x = t;
                break;
            case 1:
                this.y = t;
                break;
            case 2:
                this.z = t;
                break;
            case 3:
                this.w = t;
                break;
            default:
                throw Error(`index is out of range: ` + e);
        }
        return this;
    }
    getComponent(e) {
        switch(e){
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            case 3:
                return this.w;
            default:
                throw Error(`index is out of range: ` + e);
        }
    }
    clone() {
        return new this.constructor(this.x, this.y, this.z, this.w);
    }
    copy(e) {
        this.x = e.x;
        this.y = e.y;
        this.z = e.z;
        this.w = e.w === undefined ? 1 : e.w;
        return this;
    }
    add(e) {
        this.x += e.x;
        this.y += e.y;
        this.z += e.z;
        this.w += e.w;
        return this;
    }
    addScalar(e) {
        this.x += e;
        this.y += e;
        this.z += e;
        this.w += e;
        return this;
    }
    addVectors(e, t) {
        this.x = e.x + t.x;
        this.y = e.y + t.y;
        this.z = e.z + t.z;
        this.w = e.w + t.w;
        return this;
    }
    addScaledVector(e, t) {
        this.x += e.x * t;
        this.y += e.y * t;
        this.z += e.z * t;
        this.w += e.w * t;
        return this;
    }
    sub(e) {
        this.x -= e.x;
        this.y -= e.y;
        this.z -= e.z;
        this.w -= e.w;
        return this;
    }
    subScalar(e) {
        this.x -= e;
        this.y -= e;
        this.z -= e;
        this.w -= e;
        return this;
    }
    subVectors(e, t) {
        this.x = e.x - t.x;
        this.y = e.y - t.y;
        this.z = e.z - t.z;
        this.w = e.w - t.w;
        return this;
    }
    multiply(e) {
        this.x *= e.x;
        this.y *= e.y;
        this.z *= e.z;
        this.w *= e.w;
        return this;
    }
    multiplyScalar(e) {
        this.x *= e;
        this.y *= e;
        this.z *= e;
        this.w *= e;
        return this;
    }
    applyMatrix4(e) {
        let t = this.x;
        let n = this.y;
        let r = this.z;
        let i = this.w;
        let e_elements = e.elements;
        this.x = e_elements[0] * t + e_elements[4] * n + e_elements[8] * r + e_elements[12] * i;
        this.y = e_elements[1] * t + e_elements[5] * n + e_elements[9] * r + e_elements[13] * i;
        this.z = e_elements[2] * t + e_elements[6] * n + e_elements[10] * r + e_elements[14] * i;
        this.w = e_elements[3] * t + e_elements[7] * n + e_elements[11] * r + e_elements[15] * i;
        return this;
    }
    divide(e) {
        this.x /= e.x;
        this.y /= e.y;
        this.z /= e.z;
        this.w /= e.w;
        return this;
    }
    divideScalar(e) {
        return this.multiplyScalar(1 / e);
    }
    setAxisAngleFromQuaternion(e) {
        this.w = 2 * Math.acos(e.w);
        let t = Math.sqrt(1 - e.w * e.w);
        if (t < 0.0001) {
            this.x = 1;
            this.y = 0;
            this.z = 0;
        } else {
            this.x = e.x / t;
            this.y = e.y / t;
            this.z = e.z / t;
        }
        return this;
    }
    setAxisAngleFromRotationMatrix(e) {
        let t;
        let n;
        let r;
        let i;
        let a = 0.01;
        let o = 0.1;
        let e_elements = e.elements;
        let c = e_elements[0];
        let l = e_elements[4];
        let u = e_elements[8];
        let d = e_elements[1];
        let f = e_elements[5];
        let p = e_elements[9];
        let m = e_elements[2];
        let h = e_elements[6];
        let g = e_elements[10];
        if (Math.abs(l - d) < a && Math.abs(u - m) < a && Math.abs(p - h) < a) {
            if (Math.abs(l + d) < o && Math.abs(u + m) < o && Math.abs(p + h) < o && Math.abs(c + f + g - 3) < o) {
                this.set(1, 0, 0, 0);
                return this;
            }
            t = Math.PI;
            let e = (c + 1) / 2;
            let s = (f + 1) / 2;
            let _ = (g + 1) / 2;
            let v = (l + d) / 4;
            let y = (u + m) / 4;
            let b = (p + h) / 4;
            if (e > s && e > _) {
                if (e < a) {
                    n = 0;
                    r = 0.707106781;
                    i = 0.707106781;
                } else {
                    n = Math.sqrt(e);
                    r = v / n;
                    i = y / n;
                }
            } else if (s > _) {
                if (s < a) {
                    n = 0.707106781;
                    r = 0;
                    i = 0.707106781;
                } else {
                    r = Math.sqrt(s);
                    n = v / r;
                    i = b / r;
                }
            } else if (_ < a) {
                n = 0.707106781;
                r = 0.707106781;
                i = 0;
            } else {
                i = Math.sqrt(_);
                n = y / i;
                r = b / i;
            }
            this.set(n, r, i, t);
            return this;
        }
        let _ = Math.sqrt((h - p) * (h - p) + (u - m) * (u - m) + (d - l) * (d - l));
        if (Math.abs(_) < 0.001) {
            _ = 1;
        }
        this.x = (h - p) / _;
        this.y = (u - m) / _;
        this.z = (d - l) / _;
        this.w = Math.acos((c + f + g - 1) / 2);
        return this;
    }
    setFromMatrixPosition({ elements }) {
        this.x = elements[12];
        this.y = elements[13];
        this.z = elements[14];
        this.w = elements[15];
        return this;
    }
    min(e) {
        this.x = Math.min(this.x, e.x);
        this.y = Math.min(this.y, e.y);
        this.z = Math.min(this.z, e.z);
        this.w = Math.min(this.w, e.w);
        return this;
    }
    max(e) {
        this.x = Math.max(this.x, e.x);
        this.y = Math.max(this.y, e.y);
        this.z = Math.max(this.z, e.z);
        this.w = Math.max(this.w, e.w);
        return this;
    }
    clamp(e, t) {
        this.x = H(this.x, e.x, t.x);
        this.y = H(this.y, e.y, t.y);
        this.z = H(this.z, e.z, t.z);
        this.w = H(this.w, e.w, t.w);
        return this;
    }
    clampScalar(e, t) {
        this.x = H(this.x, e, t);
        this.y = H(this.y, e, t);
        this.z = H(this.z, e, t);
        this.w = H(this.w, e, t);
        return this;
    }
    clampLength(e, t) {
        let n = this.length();
        return this.divideScalar(n || 1).multiplyScalar(H(n, e, t));
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        this.w = Math.floor(this.w);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        this.w = Math.ceil(this.w);
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        this.w = Math.round(this.w);
        return this;
    }
    roundToZero() {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        this.z = Math.trunc(this.z);
        this.w = Math.trunc(this.w);
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;
    }
    dot(e) {
        return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    setLength(e) {
        return this.normalize().multiplyScalar(e);
    }
    lerp(e, t) {
        this.x += (e.x - this.x) * t;
        this.y += (e.y - this.y) * t;
        this.z += (e.z - this.z) * t;
        this.w += (e.w - this.w) * t;
        return this;
    }
    lerpVectors(e, t, n) {
        this.x = e.x + (t.x - e.x) * n;
        this.y = e.y + (t.y - e.y) * n;
        this.z = e.z + (t.z - e.z) * n;
        this.w = e.w + (t.w - e.w) * n;
        return this;
    }
    equals(e) {
        return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
    }
    fromArray(e, t = 0) {
        this.x = e[t];
        this.y = e[t + 1];
        this.z = e[t + 2];
        this.w = e[t + 3];
        return this;
    }
    toArray(e = [], t = 0) {
        e[t] = this.x;
        e[t + 1] = this.y;
        e[t + 2] = this.z;
        e[t + 3] = this.w;
        return e;
    }
    fromBufferAttribute(e, t) {
        this.x = e.getX(t);
        this.y = e.getY(t);
        this.z = e.getZ(t);
        this.w = e.getW(t);
        return this;
    }
    random() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        this.w = Math.random();
        return this;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
        yield this.w;
    }
};
class Yc extends oc {
    constructor(e = 1, t = 1, n = {}){
        super();
        n = {
            generateMipmaps: false,
            internalFormat: null,
            minFilter,
            depthBuffer: true,
            stencilBuffer: false,
            resolveDepthBuffer: true,
            resolveStencilBuffer: true,
            depthTexture: null,
            samples: 0,
            count: 1,
            depth: 1,
            multiview: false,
            ...n
        };
        this.isRenderTarget = true;
        this.width = e;
        this.height = t;
        this.depth = n.depth;
        this.scissor = new J(0, 0, e, t);
        this.scissorTest = false;
        this.viewport = new J(0, 0, e, t);
        this.textures = [];
        let r = new Jc({
            width: e,
            height: t,
            depth: n.depth
        });
        let i = n.count;
        for(let e = 0; e < i; e++){
            this.textures[e] = r.clone();
            this.textures[e].isRenderTargetTexture = true;
            this.textures[e].renderTarget = this;
        }
        this._setTextureOptions(n);
        this.depthBuffer = n.depthBuffer;
        this.stencilBuffer = n.stencilBuffer;
        this.resolveDepthBuffer = n.resolveDepthBuffer;
        this.resolveStencilBuffer = n.resolveStencilBuffer;
        this._depthTexture = null;
        this.depthTexture = n.depthTexture;
        this.samples = n.samples;
        this.multiview = n.multiview;
    }
    _setTextureOptions(e = {}) {
        let t = {
            minFilter,
            generateMipmaps: false,
            flipY: false,
            internalFormat: null
        };
        if (e.mapping !== undefined) {
            t.mapping = e.mapping;
        }
        if (e.wrapS !== undefined) {
            t.wrapS = e.wrapS;
        }
        if (e.wrapT !== undefined) {
            t.wrapT = e.wrapT;
        }
        if (e.wrapR !== undefined) {
            t.wrapR = e.wrapR;
        }
        if (e.magFilter !== undefined) {
            t.magFilter = e.magFilter;
        }
        if (e.minFilter !== undefined) {
            t.minFilter = e.minFilter;
        }
        if (e.format !== undefined) {
            t.format = e.format;
        }
        if (e.type !== undefined) {
            t.type = e.type;
        }
        if (e.anisotropy !== undefined) {
            t.anisotropy = e.anisotropy;
        }
        if (e.colorSpace !== undefined) {
            t.colorSpace = e.colorSpace;
        }
        if (e.flipY !== undefined) {
            t.flipY = e.flipY;
        }
        if (e.generateMipmaps !== undefined) {
            t.generateMipmaps = e.generateMipmaps;
        }
        if (e.internalFormat !== undefined) {
            t.internalFormat = e.internalFormat;
        }
        for(let e = 0; e < this.textures.length; e++){
            this.textures[e].setValues(t);
        }
    }
    get texture() {
        return this.textures[0];
    }
    set texture(e) {
        this.textures[0] = e;
    }
    set depthTexture(e) {
        if (this._depthTexture !== null) {
            this._depthTexture.renderTarget = null;
        }
        if (e !== null) {
            e.renderTarget = this;
        }
        this._depthTexture = e;
    }
    get depthTexture() {
        return this._depthTexture;
    }
    setSize(e, t, n = 1) {
        if (this.width !== e || this.height !== t || this.depth !== n) {
            this.width = e;
            this.height = t;
            this.depth = n;
            for(let r = 0, i = this.textures.length; r < i; r++){
                this.textures[r].image.width = e;
                this.textures[r].image.height = t;
                this.textures[r].image.depth = n;
                if (this.textures[r].isData3DTexture !== true) {
                    this.textures[r].isArrayTexture = this.textures[r].image.depth > 1;
                }
            }
            this.dispose();
        }
        this.viewport.set(0, 0, e, t);
        this.scissor.set(0, 0, e, t);
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(e) {
        this.width = e.width;
        this.height = e.height;
        this.depth = e.depth;
        this.scissor.copy(e.scissor);
        this.scissorTest = e.scissorTest;
        this.viewport.copy(e.viewport);
        this.textures.length = 0;
        for(let t = 0, n = e.textures.length; t < n; t++){
            this.textures[t] = e.textures[t].clone();
            this.textures[t].isRenderTargetTexture = true;
            this.textures[t].renderTarget = this;
            let n = {
                ...e.textures[t].image
            };
            this.textures[t].source = new Wc(n);
        }
        this.depthBuffer = e.depthBuffer;
        this.stencilBuffer = e.stencilBuffer;
        this.resolveDepthBuffer = e.resolveDepthBuffer;
        this.resolveStencilBuffer = e.resolveStencilBuffer;
        if (e.depthTexture !== null) {
            this.depthTexture = e.depthTexture.clone();
        }
        this.samples = e.samples;
        return this;
    }
    dispose() {
        this.dispatchEvent({
            type: `dispose`
        });
    }
}
export class Xc extends Yc {
    constructor(e = 1, t = 1, n = {}){
        super(e, t, n);
        this.isWebGLRenderTarget = true;
    }
}
export class Zc extends Jc {
    constructor(e = null, t = 1, n = 1, r = 1){
        super(null);
        this.isDataArrayTexture = true;
        this.image = {
            data: e,
            width: t,
            height: n,
            depth: r
        };
        this.magFilter = So;
        this.minFilter = So;
        this.wrapR = bo;
        this.generateMipmaps = false;
        this.flipY = false;
        this.unpackAlignment = 1;
        this.layerUpdates = new Set;
    }
    addLayerUpdate(e) {
        this.layerUpdates.add(e);
    }
    clearLayerUpdates() {
        this.layerUpdates.clear();
    }
}
export class Qc extends Jc {
    constructor(e = null, t = 1, n = 1, r = 1){
        super(null);
        this.isData3DTexture = true;
        this.image = {
            data: e,
            width: t,
            height: n,
            depth: r
        };
        this.magFilter = So;
        this.minFilter = So;
        this.wrapR = bo;
        this.generateMipmaps = false;
        this.flipY = false;
        this.unpackAlignment = 1;
    }
}
export const Y = class e {
    constructor(t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g){
        e.prototype.isMatrix4 = true;
        this.elements = [
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1
        ];
        if (t !== undefined) {
            this.set(t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g);
        }
    }
    set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
        let elements = this.elements;
        elements[0] = e;
        elements[4] = t;
        elements[8] = n;
        elements[12] = r;
        elements[1] = i;
        elements[5] = a;
        elements[9] = o;
        elements[13] = s;
        elements[2] = c;
        elements[6] = l;
        elements[10] = u;
        elements[14] = d;
        elements[3] = f;
        elements[7] = p;
        elements[11] = m;
        elements[15] = h;
        return this;
    }
    identity() {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    }
    clone() {
        return new e().fromArray(this.elements);
    }
    copy(e) {
        let elements = this.elements;
        let e_elements = e.elements;
        elements[0] = e_elements[0];
        elements[1] = e_elements[1];
        elements[2] = e_elements[2];
        elements[3] = e_elements[3];
        elements[4] = e_elements[4];
        elements[5] = e_elements[5];
        elements[6] = e_elements[6];
        elements[7] = e_elements[7];
        elements[8] = e_elements[8];
        elements[9] = e_elements[9];
        elements[10] = e_elements[10];
        elements[11] = e_elements[11];
        elements[12] = e_elements[12];
        elements[13] = e_elements[13];
        elements[14] = e_elements[14];
        elements[15] = e_elements[15];
        return this;
    }
    copyPosition(e) {
        let elements = this.elements;
        let e_elements = e.elements;
        elements[12] = e_elements[12];
        elements[13] = e_elements[13];
        elements[14] = e_elements[14];
        return this;
    }
    setFromMatrix3({ elements }) {
        this.set(elements[0], elements[3], elements[6], 0, elements[1], elements[4], elements[7], 0, elements[2], elements[5], elements[8], 0, 0, 0, 0, 1);
        return this;
    }
    extractBasis(e, t, n) {
        if (this.determinant() === 0) {
            e.set(1, 0, 0);
            t.set(0, 1, 0);
            n.set(0, 0, 1);
            return this;
        }
        e.setFromMatrixColumn(this, 0);
        t.setFromMatrixColumn(this, 1);
        n.setFromMatrixColumn(this, 2);
        return this;
    }
    makeBasis(e, t, n) {
        this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1);
        return this;
    }
    extractRotation(e) {
        if (e.determinant() === 0) {
            return this.identity();
        }
        let elements = this.elements;
        let e_elements = e.elements;
        let r = 1 / $c.setFromMatrixColumn(e, 0).length();
        let i = 1 / $c.setFromMatrixColumn(e, 1).length();
        let a = 1 / $c.setFromMatrixColumn(e, 2).length();
        elements[0] = e_elements[0] * r;
        elements[1] = e_elements[1] * r;
        elements[2] = e_elements[2] * r;
        elements[3] = 0;
        elements[4] = e_elements[4] * i;
        elements[5] = e_elements[5] * i;
        elements[6] = e_elements[6] * i;
        elements[7] = 0;
        elements[8] = e_elements[8] * a;
        elements[9] = e_elements[9] * a;
        elements[10] = e_elements[10] * a;
        elements[11] = 0;
        elements[12] = 0;
        elements[13] = 0;
        elements[14] = 0;
        elements[15] = 1;
        return this;
    }
    makeRotationFromEuler(e) {
        let elements = this.elements;
        let n = e.x;
        let r = e.y;
        let i = e.z;
        let a = Math.cos(n);
        let o = Math.sin(n);
        let s = Math.cos(r);
        let c = Math.sin(r);
        let l = Math.cos(i);
        let u = Math.sin(i);
        if (e.order === `XYZ`) {
            let e = a * l;
            let n = a * u;
            let r = o * l;
            let i = o * u;
            elements[0] = s * l;
            elements[4] = -s * u;
            elements[8] = c;
            elements[1] = n + r * c;
            elements[5] = e - i * c;
            elements[9] = -o * s;
            elements[2] = i - e * c;
            elements[6] = r + n * c;
            elements[10] = a * s;
        } else if (e.order === `YXZ`) {
            let e = s * l;
            let n = s * u;
            let r = c * l;
            let i = c * u;
            elements[0] = e + i * o;
            elements[4] = r * o - n;
            elements[8] = a * c;
            elements[1] = a * u;
            elements[5] = a * l;
            elements[9] = -o;
            elements[2] = n * o - r;
            elements[6] = i + e * o;
            elements[10] = a * s;
        } else if (e.order === `ZXY`) {
            let e = s * l;
            let n = s * u;
            let r = c * l;
            let i = c * u;
            elements[0] = e - i * o;
            elements[4] = -a * u;
            elements[8] = r + n * o;
            elements[1] = n + r * o;
            elements[5] = a * l;
            elements[9] = i - e * o;
            elements[2] = -a * c;
            elements[6] = o;
            elements[10] = a * s;
        } else if (e.order === `ZYX`) {
            let e = a * l;
            let n = a * u;
            let r = o * l;
            let i = o * u;
            elements[0] = s * l;
            elements[4] = r * c - n;
            elements[8] = e * c + i;
            elements[1] = s * u;
            elements[5] = i * c + e;
            elements[9] = n * c - r;
            elements[2] = -c;
            elements[6] = o * s;
            elements[10] = a * s;
        } else if (e.order === `YZX`) {
            let e = a * s;
            let n = a * c;
            let r = o * s;
            let i = o * c;
            elements[0] = s * l;
            elements[4] = i - e * u;
            elements[8] = r * u + n;
            elements[1] = u;
            elements[5] = a * l;
            elements[9] = -o * l;
            elements[2] = -c * l;
            elements[6] = n * u + r;
            elements[10] = e - i * u;
        } else if (e.order === `XZY`) {
            let e = a * s;
            let n = a * c;
            let r = o * s;
            let i = o * c;
            elements[0] = s * l;
            elements[4] = -u;
            elements[8] = c * l;
            elements[1] = e * u + i;
            elements[5] = a * l;
            elements[9] = n * u - r;
            elements[2] = r * u - n;
            elements[6] = o * l;
            elements[10] = i * u + e;
        }
        elements[3] = 0;
        elements[7] = 0;
        elements[11] = 0;
        elements[12] = 0;
        elements[13] = 0;
        elements[14] = 0;
        elements[15] = 1;
        return this;
    }
    makeRotationFromQuaternion(e) {
        return this.compose(tl, e, nl);
    }
    lookAt(e, t, n) {
        let elements = this.elements;
        al.subVectors(e, t);
        if (al.lengthSq() === 0) {
            al.z = 1;
        }
        al.normalize();
        rl.crossVectors(n, al);
        if (rl.lengthSq() === 0) {
            if (Math.abs(n.z) === 1) {
                al.x += 0.0001;
            } else {
                al.z += 0.0001;
            }
            al.normalize();
            rl.crossVectors(n, al);
        }
        rl.normalize();
        il.crossVectors(al, rl);
        elements[0] = rl.x;
        elements[4] = il.x;
        elements[8] = al.x;
        elements[1] = rl.y;
        elements[5] = il.y;
        elements[9] = al.y;
        elements[2] = rl.z;
        elements[6] = il.z;
        elements[10] = al.z;
        return this;
    }
    multiply(e) {
        return this.multiplyMatrices(this, e);
    }
    premultiply(e) {
        return this.multiplyMatrices(e, this);
    }
    multiplyMatrices({ elements }, t) {
        let t_elements = t.elements;
        let elements_1 = this.elements;
        let a = elements[0];
        let o = elements[4];
        let s = elements[8];
        let c = elements[12];
        let l = elements[1];
        let u = elements[5];
        let d = elements[9];
        let f = elements[13];
        let p = elements[2];
        let m = elements[6];
        let h = elements[10];
        let g = elements[14];
        let _ = elements[3];
        let v = elements[7];
        let y = elements[11];
        let b = elements[15];
        let x = t_elements[0];
        let S = t_elements[4];
        let C = t_elements[8];
        let w = t_elements[12];
        let T = t_elements[1];
        let E = t_elements[5];
        let D = t_elements[9];
        let O = t_elements[13];
        let k = t_elements[2];
        let A = t_elements[6];
        let j = t_elements[10];
        let M = t_elements[14];
        let N = t_elements[3];
        let ee = t_elements[7];
        let te = t_elements[11];
        let ne = t_elements[15];
        elements_1[0] = a * x + o * T + s * k + c * N;
        elements_1[4] = a * S + o * E + s * A + c * ee;
        elements_1[8] = a * C + o * D + s * j + c * te;
        elements_1[12] = a * w + o * O + s * M + c * ne;
        elements_1[1] = l * x + u * T + d * k + f * N;
        elements_1[5] = l * S + u * E + d * A + f * ee;
        elements_1[9] = l * C + u * D + d * j + f * te;
        elements_1[13] = l * w + u * O + d * M + f * ne;
        elements_1[2] = p * x + m * T + h * k + g * N;
        elements_1[6] = p * S + m * E + h * A + g * ee;
        elements_1[10] = p * C + m * D + h * j + g * te;
        elements_1[14] = p * w + m * O + h * M + g * ne;
        elements_1[3] = _ * x + v * T + y * k + b * N;
        elements_1[7] = _ * S + v * E + y * A + b * ee;
        elements_1[11] = _ * C + v * D + y * j + b * te;
        elements_1[15] = _ * w + v * O + y * M + b * ne;
        return this;
    }
    multiplyScalar(e) {
        let elements = this.elements;
        elements[0] *= e;
        elements[4] *= e;
        elements[8] *= e;
        elements[12] *= e;
        elements[1] *= e;
        elements[5] *= e;
        elements[9] *= e;
        elements[13] *= e;
        elements[2] *= e;
        elements[6] *= e;
        elements[10] *= e;
        elements[14] *= e;
        elements[3] *= e;
        elements[7] *= e;
        elements[11] *= e;
        elements[15] *= e;
        return this;
    }
    determinant() {
        let elements = this.elements;
        let t = elements[0];
        let n = elements[4];
        let r = elements[8];
        let i = elements[12];
        let a = elements[1];
        let o = elements[5];
        let s = elements[9];
        let c = elements[13];
        let l = elements[2];
        let u = elements[6];
        let d = elements[10];
        let f = elements[14];
        let p = elements[3];
        let m = elements[7];
        let h = elements[11];
        let g = elements[15];
        let _ = s * f - c * d;
        let v = o * f - c * u;
        let y = o * d - s * u;
        let b = a * f - c * l;
        let x = a * d - s * l;
        let S = a * u - o * l;
        return t * (m * _ - h * v + g * y) - n * (p * _ - h * b + g * x) + r * (p * v - m * b + g * S) - i * (p * y - m * x + h * S);
    }
    transpose() {
        let elements = this.elements;
        let t;
        t = elements[1];
        elements[1] = elements[4];
        elements[4] = t;
        t = elements[2];
        elements[2] = elements[8];
        elements[8] = t;
        t = elements[6];
        elements[6] = elements[9];
        elements[9] = t;
        t = elements[3];
        elements[3] = elements[12];
        elements[12] = t;
        t = elements[7];
        elements[7] = elements[13];
        elements[13] = t;
        t = elements[11];
        elements[11] = elements[14];
        elements[14] = t;
        return this;
    }
    setPosition(e, t, n) {
        let elements = this.elements;
        if (e.isVector3) {
            elements[12] = e.x;
            elements[13] = e.y;
            elements[14] = e.z;
        } else {
            elements[12] = e;
            elements[13] = t;
            elements[14] = n;
        }
        return this;
    }
    invert() {
        let elements = this.elements;
        let t = elements[0];
        let n = elements[1];
        let r = elements[2];
        let i = elements[3];
        let a = elements[4];
        let o = elements[5];
        let s = elements[6];
        let c = elements[7];
        let l = elements[8];
        let u = elements[9];
        let d = elements[10];
        let f = elements[11];
        let p = elements[12];
        let m = elements[13];
        let h = elements[14];
        let g = elements[15];
        let _ = t * o - n * a;
        let v = t * s - r * a;
        let y = t * c - i * a;
        let b = n * s - r * o;
        let x = n * c - i * o;
        let S = r * c - i * s;
        let C = l * m - u * p;
        let w = l * h - d * p;
        let T = l * g - f * p;
        let E = u * h - d * m;
        let D = u * g - f * m;
        let O = d * g - f * h;
        let k = _ * O - v * D + y * E + b * T - x * w + S * C;
        if (k === 0) {
            return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
        let A = 1 / k;
        elements[0] = (o * O - s * D + c * E) * A;
        elements[1] = (r * D - n * O - i * E) * A;
        elements[2] = (m * S - h * x + g * b) * A;
        elements[3] = (d * x - u * S - f * b) * A;
        elements[4] = (s * T - a * O - c * w) * A;
        elements[5] = (t * O - r * T + i * w) * A;
        elements[6] = (h * y - p * S - g * v) * A;
        elements[7] = (l * S - d * y + f * v) * A;
        elements[8] = (a * D - o * T + c * C) * A;
        elements[9] = (n * T - t * D - i * C) * A;
        elements[10] = (p * x - m * y + g * _) * A;
        elements[11] = (u * y - l * x - f * _) * A;
        elements[12] = (o * w - a * E - s * C) * A;
        elements[13] = (t * E - n * w + r * C) * A;
        elements[14] = (m * v - p * b - h * _) * A;
        elements[15] = (l * b - u * v + d * _) * A;
        return this;
    }
    scale(e) {
        let elements = this.elements;
        let n = e.x;
        let r = e.y;
        let i = e.z;
        elements[0] *= n;
        elements[4] *= r;
        elements[8] *= i;
        elements[1] *= n;
        elements[5] *= r;
        elements[9] *= i;
        elements[2] *= n;
        elements[6] *= r;
        elements[10] *= i;
        elements[3] *= n;
        elements[7] *= r;
        elements[11] *= i;
        return this;
    }
    getMaxScaleOnAxis() {
        let elements = this.elements;
        let t = elements[0] * elements[0] + elements[1] * elements[1] + elements[2] * elements[2];
        let n = elements[4] * elements[4] + elements[5] * elements[5] + elements[6] * elements[6];
        let r = elements[8] * elements[8] + elements[9] * elements[9] + elements[10] * elements[10];
        return Math.sqrt(Math.max(t, n, r));
    }
    makeTranslation(e, t, n) {
        if (e.isVector3) {
            this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1);
        } else {
            this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1);
        }
        return this;
    }
    makeRotationX(e) {
        let t = Math.cos(e);
        let n = Math.sin(e);
        this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1);
        return this;
    }
    makeRotationY(e) {
        let t = Math.cos(e);
        let n = Math.sin(e);
        this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1);
        return this;
    }
    makeRotationZ(e) {
        let t = Math.cos(e);
        let n = Math.sin(e);
        this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    }
    makeRotationAxis(e, t) {
        let n = Math.cos(t);
        let r = Math.sin(t);
        let i = 1 - n;
        let a = e.x;
        let o = e.y;
        let s = e.z;
        let c = i * a;
        let l = i * o;
        this.set(c * a + n, c * o - r * s, c * s + r * o, 0, c * o + r * s, l * o + n, l * s - r * a, 0, c * s - r * o, l * s + r * a, i * s * s + n, 0, 0, 0, 0, 1);
        return this;
    }
    makeScale(e, t, n) {
        this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1);
        return this;
    }
    makeShear(e, t, n, r, i, a) {
        this.set(1, n, i, 0, e, 1, a, 0, t, r, 1, 0, 0, 0, 0, 1);
        return this;
    }
    compose(e, t, n) {
        let elements = this.elements;
        let i = t._x;
        let a = t._y;
        let o = t._z;
        let s = t._w;
        let c = i + i;
        let l = a + a;
        let u = o + o;
        let d = i * c;
        let f = i * l;
        let p = i * u;
        let m = a * l;
        let h = a * u;
        let g = o * u;
        let _ = s * c;
        let v = s * l;
        let y = s * u;
        let b = n.x;
        let x = n.y;
        let S = n.z;
        elements[0] = (1 - (m + g)) * b;
        elements[1] = (f + y) * b;
        elements[2] = (p - v) * b;
        elements[3] = 0;
        elements[4] = (f - y) * x;
        elements[5] = (1 - (d + g)) * x;
        elements[6] = (h + _) * x;
        elements[7] = 0;
        elements[8] = (p + v) * S;
        elements[9] = (h - _) * S;
        elements[10] = (1 - (d + m)) * S;
        elements[11] = 0;
        elements[12] = e.x;
        elements[13] = e.y;
        elements[14] = e.z;
        elements[15] = 1;
        return this;
    }
    decompose(e, t, n) {
        let elements = this.elements;
        e.x = elements[12];
        e.y = elements[13];
        e.z = elements[14];
        let i = this.determinant();
        if (i === 0) {
            n.set(1, 1, 1);
            t.identity();
            return this;
        }
        let a = $c.set(elements[0], elements[1], elements[2]).length();
        let o = $c.set(elements[4], elements[5], elements[6]).length();
        let s = $c.set(elements[8], elements[9], elements[10]).length();
        if (i < 0) {
            a = -a;
        }
        el.copy(this);
        let c = 1 / a;
        let l = 1 / o;
        let u = 1 / s;
        el.elements[0] *= c;
        el.elements[1] *= c;
        el.elements[2] *= c;
        el.elements[4] *= l;
        el.elements[5] *= l;
        el.elements[6] *= l;
        el.elements[8] *= u;
        el.elements[9] *= u;
        el.elements[10] *= u;
        t.setFromRotationMatrix(el);
        n.x = a;
        n.y = o;
        n.z = s;
        return this;
    }
    makePerspective(e, t, n, r, i, a, o = Js, s = false) {
        let elements = this.elements;
        let l = 2 * i / (t - e);
        let u = 2 * i / (n - r);
        let d = (t + e) / (t - e);
        let f = (n + r) / (n - r);
        let p;
        let m;
        if (s) {
            p = i / (a - i);
            m = a * i / (a - i);
        } else if (o === 2000) {
            p = -(a + i) / (a - i);
            m = -2 * a * i / (a - i);
        } else if (o === 2001) {
            p = -a / (a - i);
            m = -a * i / (a - i);
        } else {
            throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: ` + o);
        }
        elements[0] = l;
        elements[4] = 0;
        elements[8] = d;
        elements[12] = 0;
        elements[1] = 0;
        elements[5] = u;
        elements[9] = f;
        elements[13] = 0;
        elements[2] = 0;
        elements[6] = 0;
        elements[10] = p;
        elements[14] = m;
        elements[3] = 0;
        elements[7] = 0;
        elements[11] = -1;
        elements[15] = 0;
        return this;
    }
    makeOrthographic(e, t, n, r, i, a, o = Js, s = false) {
        let elements = this.elements;
        let l = 2 / (t - e);
        let u = 2 / (n - r);
        let d = -(t + e) / (t - e);
        let f = -(n + r) / (n - r);
        let p;
        let m;
        if (s) {
            p = 1 / (a - i);
            m = a / (a - i);
        } else if (o === 2000) {
            p = -2 / (a - i);
            m = -(a + i) / (a - i);
        } else if (o === 2001) {
            p = -1 / (a - i);
            m = -i / (a - i);
        } else {
            throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: ` + o);
        }
        elements[0] = l;
        elements[4] = 0;
        elements[8] = 0;
        elements[12] = d;
        elements[1] = 0;
        elements[5] = u;
        elements[9] = 0;
        elements[13] = f;
        elements[2] = 0;
        elements[6] = 0;
        elements[10] = p;
        elements[14] = m;
        elements[3] = 0;
        elements[7] = 0;
        elements[11] = 0;
        elements[15] = 1;
        return this;
    }
    equals(e) {
        let elements = this.elements;
        let e_elements = e.elements;
        for(let e = 0; e < 16; e++){
            if (elements[e] !== e_elements[e]) {
                return false;
            }
        }
        return true;
    }
    fromArray(e, t = 0) {
        for(let n = 0; n < 16; n++){
            this.elements[n] = e[n + t];
        }
        return this;
    }
    toArray(e = [], t = 0) {
        let elements = this.elements;
        e[t] = elements[0];
        e[t + 1] = elements[1];
        e[t + 2] = elements[2];
        e[t + 3] = elements[3];
        e[t + 4] = elements[4];
        e[t + 5] = elements[5];
        e[t + 6] = elements[6];
        e[t + 7] = elements[7];
        e[t + 8] = elements[8];
        e[t + 9] = elements[9];
        e[t + 10] = elements[10];
        e[t + 11] = elements[11];
        e[t + 12] = elements[12];
        e[t + 13] = elements[13];
        e[t + 14] = elements[14];
        e[t + 15] = elements[15];
        return e;
    }
};
var $c = new G;
var el = new Y;
var tl = new G(0, 0, 0);
var nl = new G(1, 1, 1);
var rl = new G;
var il = new G;
var al = new G;
const ol = new Y;
const sl = new Mc;
export const cl = class e {
    constructor(t = 0, n = 0, r = 0, i = e.DEFAULT_ORDER){
        this.isEuler = true;
        this._x = t;
        this._y = n;
        this._z = r;
        this._order = i;
    }
    get x() {
        return this._x;
    }
    set x(e) {
        this._x = e;
        this._onChangeCallback();
    }
    get y() {
        return this._y;
    }
    set y(e) {
        this._y = e;
        this._onChangeCallback();
    }
    get z() {
        return this._z;
    }
    set z(e) {
        this._z = e;
        this._onChangeCallback();
    }
    get order() {
        return this._order;
    }
    set order(e) {
        this._order = e;
        this._onChangeCallback();
    }
    set(e, t, n, r = this._order) {
        this._x = e;
        this._y = t;
        this._z = n;
        this._order = r;
        this._onChangeCallback();
        return this;
    }
    clone() {
        return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(e) {
        this._x = e._x;
        this._y = e._y;
        this._z = e._z;
        this._order = e._order;
        this._onChangeCallback();
        return this;
    }
    setFromRotationMatrix({ elements }, t = this._order, n = true) {
        let i = elements[0];
        let a = elements[4];
        let o = elements[8];
        let s = elements[1];
        let c = elements[5];
        let l = elements[9];
        let u = elements[2];
        let d = elements[6];
        let f = elements[10];
        switch(t){
            case `XYZ`:
                this._y = Math.asin(H(o, -1, 1));
                if (Math.abs(o) < 0.9999999) {
                    this._x = Math.atan2(-l, f);
                    this._z = Math.atan2(-a, i);
                } else {
                    this._x = Math.atan2(d, c);
                    this._z = 0;
                }
                break;
            case `YXZ`:
                this._x = Math.asin(-H(l, -1, 1));
                if (Math.abs(l) < 0.9999999) {
                    this._y = Math.atan2(o, f);
                    this._z = Math.atan2(s, c);
                } else {
                    this._y = Math.atan2(-u, i);
                    this._z = 0;
                }
                break;
            case `ZXY`:
                this._x = Math.asin(H(d, -1, 1));
                if (Math.abs(d) < 0.9999999) {
                    this._y = Math.atan2(-u, f);
                    this._z = Math.atan2(-a, c);
                } else {
                    this._y = 0;
                    this._z = Math.atan2(s, i);
                }
                break;
            case `ZYX`:
                this._y = Math.asin(-H(u, -1, 1));
                if (Math.abs(u) < 0.9999999) {
                    this._x = Math.atan2(d, f);
                    this._z = Math.atan2(s, i);
                } else {
                    this._x = 0;
                    this._z = Math.atan2(-a, c);
                }
                break;
            case `YZX`:
                this._z = Math.asin(H(s, -1, 1));
                if (Math.abs(s) < 0.9999999) {
                    this._x = Math.atan2(-l, c);
                    this._y = Math.atan2(-u, i);
                } else {
                    this._x = 0;
                    this._y = Math.atan2(o, f);
                }
                break;
            case `XZY`:
                this._z = Math.asin(-H(a, -1, 1));
                if (Math.abs(a) < 0.9999999) {
                    this._x = Math.atan2(d, c);
                    this._y = Math.atan2(o, i);
                } else {
                    this._x = Math.atan2(-l, f);
                    this._y = 0;
                }
                break;
            default:
                B(`Euler: .setFromRotationMatrix() encountered an unknown order: ` + t);
        }
        this._order = t;
        if (n === true) {
            this._onChangeCallback();
        }
        return this;
    }
    setFromQuaternion(e, t, n) {
        ol.makeRotationFromQuaternion(e);
        return this.setFromRotationMatrix(ol, t, n);
    }
    setFromVector3(e, t = this._order) {
        return this.set(e.x, e.y, e.z, t);
    }
    reorder(e) {
        sl.setFromEuler(this);
        return this.setFromQuaternion(sl, e);
    }
    equals(e) {
        return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
    }
    fromArray(e) {
        this._x = e[0];
        this._y = e[1];
        this._z = e[2];
        if (e[3] !== undefined) {
            this._order = e[3];
        }
        this._onChangeCallback();
        return this;
    }
    toArray(e = [], t = 0) {
        e[t] = this._x;
        e[t + 1] = this._y;
        e[t + 2] = this._z;
        e[t + 3] = this._order;
        return e;
    }
    _onChange(e) {
        this._onChangeCallback = e;
        return this;
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
        yield this._x;
        yield this._y;
        yield this._z;
        yield this._order;
    }
};
export class ll {
    constructor(){
        this.mask = 1;
    }
    set(e) {
        this.mask = (1 << e | 0) >>> 0;
    }
    enable(e) {
        this.mask |= 1 << e | 0;
    }
    enableAll() {
        this.mask = -1;
    }
    toggle(e) {
        this.mask ^= 1 << e | 0;
    }
    disable(e) {
        this.mask &= ~(1 << e | 0);
    }
    disableAll() {
        this.mask = 0;
    }
    test(e) {
        return (this.mask & e.mask) !== 0;
    }
    isEnabled(e) {
        return (this.mask & (1 << e | 0)) != 0;
    }
}
let ul = 0;
const dl = new G;
const fl = new Mc;
const pl = new Y;
const ml = new G;
const hl = new G;
const gl = new G;
const _l = new Mc;
const vl = new G(1, 0, 0);
const yl = new G(0, 1, 0);
const bl = new G(0, 0, 1);
const xl = {
    type: `added`
};
const Sl = {
    type: `removed`
};
const Cl = {
    type: `childadded`,
    child: null
};
const wl = {
    type: `childremoved`,
    child: null
};
export const Tl = class e extends oc {
    constructor(){
        super();
        this.isObject3D = true;
        Object.defineProperty(this, "id", {
            value: ul++
        });
        this.uuid = dc();
        this.name = ``;
        this.type = `Object3D`;
        this.parent = null;
        this.children = [];
        this.up = e.DEFAULT_UP.clone();
        let t = new G;
        let n = new cl;
        let r = new Mc;
        let i = new G(1, 1, 1);
        function a() {
            r.setFromEuler(n, false);
        }
        function o() {
            n.setFromQuaternion(r, undefined, false);
        }
        n._onChange(a);
        r._onChange(o);
        Object.defineProperties(this, {
            position: {
                configurable: true,
                enumerable: true,
                value: t
            },
            rotation: {
                configurable: true,
                enumerable: true,
                value: n
            },
            quaternion: {
                configurable: true,
                enumerable: true,
                value: r
            },
            scale: {
                configurable: true,
                enumerable: true,
                value: i
            },
            modelViewMatrix: {
                value: new Y
            },
            normalMatrix: {
                value: new K
            }
        });
        this.matrix = new Y;
        this.matrixWorld = new Y;
        this.matrixAutoUpdate = e.DEFAULT_MATRIX_AUTO_UPDATE;
        this.matrixWorldAutoUpdate = e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE;
        this.matrixWorldNeedsUpdate = false;
        this.layers = new ll;
        this.visible = true;
        this.castShadow = false;
        this.receiveShadow = false;
        this.frustumCulled = true;
        this.renderOrder = 0;
        this.animations = [];
        this.customDepthMaterial = undefined;
        this.customDistanceMaterial = undefined;
        this.static = false;
        this.userData = {};
        this.pivot = null;
    }
    onBeforeShadow() {}
    onAfterShadow() {}
    onBeforeRender() {}
    onAfterRender() {}
    applyMatrix4(e) {
        if (this.matrixAutoUpdate) {
            this.updateMatrix();
        }
        this.matrix.premultiply(e);
        this.matrix.decompose(this.position, this.quaternion, this.scale);
    }
    applyQuaternion(e) {
        this.quaternion.premultiply(e);
        return this;
    }
    setRotationFromAxisAngle(e, t) {
        this.quaternion.setFromAxisAngle(e, t);
    }
    setRotationFromEuler(e) {
        this.quaternion.setFromEuler(e, true);
    }
    setRotationFromMatrix(e) {
        this.quaternion.setFromRotationMatrix(e);
    }
    setRotationFromQuaternion(e) {
        this.quaternion.copy(e);
    }
    rotateOnAxis(e, t) {
        fl.setFromAxisAngle(e, t);
        this.quaternion.multiply(fl);
        return this;
    }
    rotateOnWorldAxis(e, t) {
        fl.setFromAxisAngle(e, t);
        this.quaternion.premultiply(fl);
        return this;
    }
    rotateX(e) {
        return this.rotateOnAxis(vl, e);
    }
    rotateY(e) {
        return this.rotateOnAxis(yl, e);
    }
    rotateZ(e) {
        return this.rotateOnAxis(bl, e);
    }
    translateOnAxis(e, t) {
        dl.copy(e).applyQuaternion(this.quaternion);
        this.position.add(dl.multiplyScalar(t));
        return this;
    }
    translateX(e) {
        return this.translateOnAxis(vl, e);
    }
    translateY(e) {
        return this.translateOnAxis(yl, e);
    }
    translateZ(e) {
        return this.translateOnAxis(bl, e);
    }
    localToWorld(e) {
        this.updateWorldMatrix(true, false);
        return e.applyMatrix4(this.matrixWorld);
    }
    worldToLocal(e) {
        this.updateWorldMatrix(true, false);
        return e.applyMatrix4(pl.copy(this.matrixWorld).invert());
    }
    lookAt(e, t, n) {
        if (e.isVector3) {
            ml.copy(e);
        } else {
            ml.set(e, t, n);
        }
        let parent = this.parent;
        this.updateWorldMatrix(true, false);
        hl.setFromMatrixPosition(this.matrixWorld);
        if (this.isCamera || this.isLight) {
            pl.lookAt(hl, ml, this.up);
        } else {
            pl.lookAt(ml, hl, this.up);
        }
        this.quaternion.setFromRotationMatrix(pl);
        if (parent) {
            pl.extractRotation(parent.matrixWorld);
            fl.setFromRotationMatrix(pl);
            this.quaternion.premultiply(fl.invert());
        }
    }
    add(e) {
        if (arguments.length > 1) {
            for(let e = 0; e < arguments.length; e++){
                this.add(arguments[e]);
            }
            return this;
        }
        if (e === this) {
            V(`Object3D.add: object can't be added as a child of itself.`, e);
            return this;
        }
        if (e && e.isObject3D) {
            e.removeFromParent();
            e.parent = this;
            this.children.push(e);
            e.dispatchEvent(xl);
            Cl.child = e;
            this.dispatchEvent(Cl);
            Cl.child = null;
        } else {
            V(`Object3D.add: object not an instance of THREE.Object3D.`, e);
        }
        return this;
    }
    remove(e) {
        if (arguments.length > 1) {
            for(let e = 0; e < arguments.length; e++){
                this.remove(arguments[e]);
            }
            return this;
        }
        let t = this.children.indexOf(e);
        if (t !== -1) {
            e.parent = null;
            this.children.splice(t, 1);
            e.dispatchEvent(Sl);
            wl.child = e;
            this.dispatchEvent(wl);
            wl.child = null;
        }
        return this;
    }
    removeFromParent() {
        let parent = this.parent;
        if (parent !== null) {
            parent.remove(this);
        }
        return this;
    }
    clear() {
        return this.remove(...this.children);
    }
    attach(e) {
        this.updateWorldMatrix(true, false);
        pl.copy(this.matrixWorld).invert();
        if (e.parent !== null) {
            e.parent.updateWorldMatrix(true, false);
            pl.multiply(e.parent.matrixWorld);
        }
        e.applyMatrix4(pl);
        e.removeFromParent();
        e.parent = this;
        this.children.push(e);
        e.updateWorldMatrix(false, true);
        e.dispatchEvent(xl);
        Cl.child = e;
        this.dispatchEvent(Cl);
        Cl.child = null;
        return this;
    }
    getObjectById(e) {
        return this.getObjectByProperty(`id`, e);
    }
    getObjectByName(e) {
        return this.getObjectByProperty(`name`, e);
    }
    getObjectByProperty(e, t) {
        if (this[e] === t) {
            return this;
        }
        for(let n = 0, r = this.children.length; n < r; n++){
            let r = this.children[n].getObjectByProperty(e, t);
            if (r !== undefined) {
                return r;
            }
        }
    }
    getObjectsByProperty(e, t, n = []) {
        if (this[e] === t) {
            n.push(this);
        }
        let children = this.children;
        for(let i = 0, a = children.length; i < a; i++){
            children[i].getObjectsByProperty(e, t, n);
        }
        return n;
    }
    getWorldPosition(e) {
        this.updateWorldMatrix(true, false);
        return e.setFromMatrixPosition(this.matrixWorld);
    }
    getWorldQuaternion(e) {
        this.updateWorldMatrix(true, false);
        this.matrixWorld.decompose(hl, e, gl);
        return e;
    }
    getWorldScale(e) {
        this.updateWorldMatrix(true, false);
        this.matrixWorld.decompose(hl, _l, e);
        return e;
    }
    getWorldDirection(e) {
        this.updateWorldMatrix(true, false);
        let elements = this.matrixWorld.elements;
        return e.set(elements[8], elements[9], elements[10]).normalize();
    }
    raycast() {}
    traverse(e) {
        e(this);
        let children = this.children;
        for(let n = 0, r = children.length; n < r; n++){
            children[n].traverse(e);
        }
    }
    traverseVisible(e) {
        if (this.visible === false) {
            return;
        }
        e(this);
        let children = this.children;
        for(let n = 0, r = children.length; n < r; n++){
            children[n].traverseVisible(e);
        }
    }
    traverseAncestors(e) {
        let parent = this.parent;
        if (parent !== null) {
            e(parent);
            parent.traverseAncestors(e);
        }
    }
    updateMatrix() {
        this.matrix.compose(this.position, this.quaternion, this.scale);
        let pivot = this.pivot;
        if (pivot !== null) {
            let t = pivot.x;
            let n = pivot.y;
            let r = pivot.z;
            let i = this.matrix.elements;
            i[12] += t - i[0] * t - i[4] * n - i[8] * r;
            i[13] += n - i[1] * t - i[5] * n - i[9] * r;
            i[14] += r - i[2] * t - i[6] * n - i[10] * r;
        }
        this.matrixWorldNeedsUpdate = true;
    }
    updateMatrixWorld(e) {
        if (this.matrixAutoUpdate) {
            this.updateMatrix();
        }
        if (this.matrixWorldNeedsUpdate || e) {
            if (this.matrixWorldAutoUpdate === true) {
                if (this.parent === null) {
                    this.matrixWorld.copy(this.matrix);
                } else {
                    this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
                }
            }
            this.matrixWorldNeedsUpdate = false;
            e = true;
        }
        let children = this.children;
        for(let n = 0, r = children.length; n < r; n++){
            children[n].updateMatrixWorld(e);
        }
    }
    updateWorldMatrix(e, t) {
        let parent = this.parent;
        if (e === true && parent !== null) {
            parent.updateWorldMatrix(true, false);
        }
        if (this.matrixAutoUpdate) {
            this.updateMatrix();
        }
        if (this.matrixWorldAutoUpdate === true) {
            if (this.parent === null) {
                this.matrixWorld.copy(this.matrix);
            } else {
                this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
            }
        }
        if (t === true) {
            let e = this.children;
            for(let t = 0, n = e.length; t < n; t++){
                e[t].updateWorldMatrix(false, true);
            }
        }
    }
    toJSON(e) {
        let t = e === undefined || typeof e == `string`;
        let n = {};
        if (t) {
            e = {
                geometries: {},
                materials: {},
                textures: {},
                images: {},
                shapes: {},
                skeletons: {},
                animations: {},
                nodes: {}
            };
            n.metadata = {
                version: 4.7,
                type: `Object`,
                generator: `Object3D.toJSON`
            };
        }
        let r = {};
        r.uuid = this.uuid;
        r.type = this.type;
        if (this.name !== ``) {
            r.name = this.name;
        }
        if (this.castShadow === true) {
            r.castShadow = true;
        }
        if (this.receiveShadow === true) {
            r.receiveShadow = true;
        }
        if (this.visible === false) {
            r.visible = false;
        }
        if (this.frustumCulled === false) {
            r.frustumCulled = false;
        }
        if (this.renderOrder !== 0) {
            r.renderOrder = this.renderOrder;
        }
        if (this.static !== false) {
            r.static = this.static;
        }
        if (Object.keys(this.userData).length > 0) {
            r.userData = this.userData;
        }
        r.layers = this.layers.mask;
        r.matrix = this.matrix.toArray();
        r.up = this.up.toArray();
        if (this.pivot !== null) {
            r.pivot = this.pivot.toArray();
        }
        if (this.matrixAutoUpdate === false) {
            r.matrixAutoUpdate = false;
        }
        if (this.morphTargetDictionary !== undefined) {
            r.morphTargetDictionary = {
                ...this.morphTargetDictionary
            };
        }
        if (this.morphTargetInfluences !== undefined) {
            r.morphTargetInfluences = this.morphTargetInfluences.slice();
        }
        if (this.isInstancedMesh) {
            r.type = `InstancedMesh`;
            r.count = this.count;
            r.instanceMatrix = this.instanceMatrix.toJSON();
            if (this.instanceColor !== null) {
                r.instanceColor = this.instanceColor.toJSON();
            }
        }
        if (this.isBatchedMesh) {
            r.type = `BatchedMesh`;
            r.perObjectFrustumCulled = this.perObjectFrustumCulled;
            r.sortObjects = this.sortObjects;
            r.drawRanges = this._drawRanges;
            r.reservedRanges = this._reservedRanges;
            r.geometryInfo = this._geometryInfo.map((e)=>({
                    ...e,
                    boundingBox: e.boundingBox ? e.boundingBox.toJSON() : undefined,
                    boundingSphere: e.boundingSphere ? e.boundingSphere.toJSON() : undefined
                }));
            r.instanceInfo = this._instanceInfo.map((e)=>({
                    ...e
                }));
            r.availableInstanceIds = this._availableInstanceIds.slice();
            r.availableGeometryIds = this._availableGeometryIds.slice();
            r.nextIndexStart = this._nextIndexStart;
            r.nextVertexStart = this._nextVertexStart;
            r.geometryCount = this._geometryCount;
            r.maxInstanceCount = this._maxInstanceCount;
            r.maxVertexCount = this._maxVertexCount;
            r.maxIndexCount = this._maxIndexCount;
            r.geometryInitialized = this._geometryInitialized;
            r.matricesTexture = this._matricesTexture.toJSON(e);
            r.indirectTexture = this._indirectTexture.toJSON(e);
            if (this._colorsTexture !== null) {
                r.colorsTexture = this._colorsTexture.toJSON(e);
            }
            if (this.boundingSphere !== null) {
                r.boundingSphere = this.boundingSphere.toJSON();
            }
            if (this.boundingBox !== null) {
                r.boundingBox = this.boundingBox.toJSON();
            }
        }
        function i(t, n) {
            if (t[n.uuid] === undefined) {
                t[n.uuid] = n.toJSON(e);
            }
            return n.uuid;
        }
        if (this.isScene) {
            if (this.background) {
                if (this.background.isColor) {
                    r.background = this.background.toJSON();
                } else if (this.background.isTexture) {
                    r.background = this.background.toJSON(e).uuid;
                }
            }
            if (this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== true) {
                r.environment = this.environment.toJSON(e).uuid;
            }
        } else if (this.isMesh || this.isLine || this.isPoints) {
            r.geometry = i(e.geometries, this.geometry);
            let t = this.geometry.parameters;
            if (t !== undefined && t.shapes !== undefined) {
                let n = t.shapes;
                if (Array.isArray(n)) {
                    for(let t = 0, r = n.length; t < r; t++){
                        let r = n[t];
                        i(e.shapes, r);
                    }
                } else {
                    i(e.shapes, n);
                }
            }
        }
        if (this.isSkinnedMesh) {
            r.bindMode = this.bindMode;
            r.bindMatrix = this.bindMatrix.toArray();
            if (this.skeleton !== undefined) {
                i(e.skeletons, this.skeleton);
                r.skeleton = this.skeleton.uuid;
            }
        }
        if (this.material !== undefined) {
            if (Array.isArray(this.material)) {
                let t = [];
                for(let n = 0, r = this.material.length; n < r; n++){
                    t.push(i(e.materials, this.material[n]));
                }
                r.material = t;
            } else {
                r.material = i(e.materials, this.material);
            }
        }
        if (this.children.length > 0) {
            r.children = [];
            for(let t = 0; t < this.children.length; t++){
                r.children.push(this.children[t].toJSON(e).object);
            }
        }
        if (this.animations.length > 0) {
            r.animations = [];
            for(let t = 0; t < this.animations.length; t++){
                let animation = this.animations[t];
                r.animations.push(i(e.animations, animation));
            }
        }
        if (t) {
            let t = a(e.geometries);
            let r = a(e.materials);
            let i = a(e.textures);
            let o = a(e.images);
            let s = a(e.shapes);
            let c = a(e.skeletons);
            let l = a(e.animations);
            let u = a(e.nodes);
            if (t.length > 0) {
                n.geometries = t;
            }
            if (r.length > 0) {
                n.materials = r;
            }
            if (i.length > 0) {
                n.textures = i;
            }
            if (o.length > 0) {
                n.images = o;
            }
            if (s.length > 0) {
                n.shapes = s;
            }
            if (c.length > 0) {
                n.skeletons = c;
            }
            if (l.length > 0) {
                n.animations = l;
            }
            if (u.length > 0) {
                n.nodes = u;
            }
        }
        n.object = r;
        return n;
        function a(e) {
            let t = [];
            for(let n in e){
                let r = e[n];
                delete r.metadata;
                t.push(r);
            }
            return t;
        }
    }
    clone(e) {
        return new this.constructor().copy(this, e);
    }
    copy(e, t = true) {
        this.name = e.name;
        this.up.copy(e.up);
        this.position.copy(e.position);
        this.rotation.order = e.rotation.order;
        this.quaternion.copy(e.quaternion);
        this.scale.copy(e.scale);
        if (e.pivot !== null) {
            this.pivot = e.pivot.clone();
        }
        this.matrix.copy(e.matrix);
        this.matrixWorld.copy(e.matrixWorld);
        this.matrixAutoUpdate = e.matrixAutoUpdate;
        this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate;
        this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate;
        this.layers.mask = e.layers.mask;
        this.visible = e.visible;
        this.castShadow = e.castShadow;
        this.receiveShadow = e.receiveShadow;
        this.frustumCulled = e.frustumCulled;
        this.renderOrder = e.renderOrder;
        this.static = e.static;
        this.animations = e.animations.slice();
        this.userData = JSON.parse(JSON.stringify(e.userData));
        if (t === true) {
            for(let t = 0; t < e.children.length; t++){
                let child = e.children[t];
                this.add(child.clone());
            }
        }
        return this;
    }
};
export class El extends Tl {
    constructor(){
        super();
        this.isGroup = true;
        this.type = `Group`;
    }
}
const Dl = {
    type: `move`
};
export class Ol {
    constructor(){
        this._targetRay = null;
        this._grip = null;
        this._hand = null;
    }
    getHandSpace() {
        if (this._hand === null) {
            this._hand = new El;
            this._hand.matrixAutoUpdate = false;
            this._hand.visible = false;
            this._hand.joints = {};
            this._hand.inputState = {
                pinching: false
            };
        }
        return this._hand;
    }
    getTargetRaySpace() {
        if (this._targetRay === null) {
            this._targetRay = new El;
            this._targetRay.matrixAutoUpdate = false;
            this._targetRay.visible = false;
            this._targetRay.hasLinearVelocity = false;
            this._targetRay.linearVelocity = new G;
            this._targetRay.hasAngularVelocity = false;
            this._targetRay.angularVelocity = new G;
        }
        return this._targetRay;
    }
    getGripSpace() {
        if (this._grip === null) {
            this._grip = new El;
            this._grip.matrixAutoUpdate = false;
            this._grip.visible = false;
            this._grip.hasLinearVelocity = false;
            this._grip.linearVelocity = new G;
            this._grip.hasAngularVelocity = false;
            this._grip.angularVelocity = new G;
        }
        return this._grip;
    }
    dispatchEvent(e) {
        if (this._targetRay !== null) {
            this._targetRay.dispatchEvent(e);
        }
        if (this._grip !== null) {
            this._grip.dispatchEvent(e);
        }
        if (this._hand !== null) {
            this._hand.dispatchEvent(e);
        }
        return this;
    }
    connect(e) {
        if (e && e.hand) {
            let t = this._hand;
            if (t) {
                for (let n of e.hand.values()){
                    this._getHandJoint(t, n);
                }
            }
        }
        this.dispatchEvent({
            type: `connected`,
            data: e
        });
        return this;
    }
    disconnect(e) {
        this.dispatchEvent({
            type: `disconnected`,
            data: e
        });
        if (this._targetRay !== null) {
            this._targetRay.visible = false;
        }
        if (this._grip !== null) {
            this._grip.visible = false;
        }
        if (this._hand !== null) {
            this._hand.visible = false;
        }
        return this;
    }
    update(e, t, n) {
        let r = null;
        let i = null;
        let a = null;
        let _targetRay = this._targetRay;
        let _grip = this._grip;
        let _hand = this._hand;
        if (e && t.session.visibilityState !== `visible-blurred`) {
            if (_hand && e.hand) {
                a = true;
                for (let r of e.hand.values()){
                    let e = t.getJointPose(r, n);
                    let i = this._getHandJoint(_hand, r);
                    if (e !== null) {
                        i.matrix.fromArray(e.transform.matrix);
                        i.matrix.decompose(i.position, i.rotation, i.scale);
                        i.matrixWorldNeedsUpdate = true;
                        i.jointRadius = e.radius;
                    }
                    i.visible = e !== null;
                }
                let r = _hand.joints[`index-finger-tip`];
                let i = _hand.joints[`thumb-tip`];
                let o = r.position.distanceTo(i.position);
                if (_hand.inputState.pinching && o > 0.025) {
                    _hand.inputState.pinching = false;
                    this.dispatchEvent({
                        type: `pinchend`,
                        handedness: e.handedness,
                        target: this
                    });
                } else if (!_hand.inputState.pinching && o <= 0.015) {
                    _hand.inputState.pinching = true;
                    this.dispatchEvent({
                        type: `pinchstart`,
                        handedness: e.handedness,
                        target: this
                    });
                }
            } else {
                if (_grip !== null && e.gripSpace) {
                    i = t.getPose(e.gripSpace, n);
                    if (i !== null) {
                        _grip.matrix.fromArray(i.transform.matrix);
                        _grip.matrix.decompose(_grip.position, _grip.rotation, _grip.scale);
                        _grip.matrixWorldNeedsUpdate = true;
                        if (i.linearVelocity) {
                            _grip.hasLinearVelocity = true;
                            _grip.linearVelocity.copy(i.linearVelocity);
                        } else {
                            _grip.hasLinearVelocity = false;
                        }
                        if (i.angularVelocity) {
                            _grip.hasAngularVelocity = true;
                            _grip.angularVelocity.copy(i.angularVelocity);
                        } else {
                            _grip.hasAngularVelocity = false;
                        }
                    }
                }
            }
            if (_targetRay !== null) {
                r = t.getPose(e.targetRaySpace, n);
                if (r === null && i !== null) {
                    r = i;
                }
                if (r !== null) {
                    _targetRay.matrix.fromArray(r.transform.matrix);
                    _targetRay.matrix.decompose(_targetRay.position, _targetRay.rotation, _targetRay.scale);
                    _targetRay.matrixWorldNeedsUpdate = true;
                    if (r.linearVelocity) {
                        _targetRay.hasLinearVelocity = true;
                        _targetRay.linearVelocity.copy(r.linearVelocity);
                    } else {
                        _targetRay.hasLinearVelocity = false;
                    }
                    if (r.angularVelocity) {
                        _targetRay.hasAngularVelocity = true;
                        _targetRay.angularVelocity.copy(r.angularVelocity);
                    } else {
                        _targetRay.hasAngularVelocity = false;
                    }
                    this.dispatchEvent(Dl);
                }
            }
        }
        if (_targetRay !== null) {
            _targetRay.visible = r !== null;
        }
        if (_grip !== null) {
            _grip.visible = i !== null;
        }
        if (_hand !== null) {
            _hand.visible = a !== null;
        }
        return this;
    }
    _getHandJoint(e, t) {
        if (e.joints[t.jointName] === undefined) {
            let n = new El;
            n.matrixAutoUpdate = false;
            n.visible = false;
            e.joints[t.jointName] = n;
            e.add(n);
        }
        return e.joints[t.jointName];
    }
}
export const kl = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
};
export const Al = {
    h: 0,
    s: 0,
    l: 0
};
export const jl = {
    h: 0,
    s: 0,
    l: 0
};
