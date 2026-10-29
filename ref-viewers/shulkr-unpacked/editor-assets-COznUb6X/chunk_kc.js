import { l as l_1 } from "../dist-C5TDMOul.js";
import { g, h, p } from "../dist-C66QuM2X.js";
import { c as c_1, l as l_2, u } from "../blockStateParser-3kR-Ucao.js";
import { B, l } from "./chunk_$s.js";
import { Cc as seededRandom, H as clamp, Tc as radToDeg, dc as generateUUID, lc as DEG2RAD, pc as mapLinear, uc as RAD2DEG, wc as degToRad } from "./chunk_ac.js";
import { Ac as denormalize, Dc as ceilPowerOfTwo, Ec as isPowerOfTwo, Oc as floorPowerOfTwo, Sc as randFloatSpread, U as normalize, _c as pingpong, bc as randInt, fc as euclideanModulo, gc as damp, hc as lerp, mc as inverseLerp, vc as smoothstep, xc as randFloat, yc as smootherstep } from "./chunk_fc.js";
export const s = 256 * 16;
export function c(e) {
    return e >> 4;
}
function setQuaternionFromProperEuler(e, t, n, r, i) {
    let Math_cos = Math.cos;
    let Math_sin = Math.sin;
    let s = Math_cos(n / 2);
    let c = Math_sin(n / 2);
    let l = Math_cos((t + r) / 2);
    let u = Math_sin((t + r) / 2);
    let d = Math_cos((t - r) / 2);
    let f = Math_sin((t - r) / 2);
    let p = Math_cos((r - t) / 2);
    let m = Math_sin((r - t) / 2);
    switch(i){
        case `XYX`:
            e.set(s * u, c * d, c * f, s * l);
            break;
        case `YZY`:
            e.set(c * f, s * u, c * d, s * l);
            break;
        case `ZXZ`:
            e.set(c * d, c * f, s * u, s * l);
            break;
        case `XZX`:
            e.set(s * u, c * m, c * p, s * l);
            break;
        case `YXY`:
            e.set(c * p, s * u, c * m, s * l);
            break;
        case `ZYZ`:
            e.set(c * m, c * p, s * u, s * l);
            break;
        default:
            B(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ` + i);
    }
}
export const jc = {
    DEG2RAD,
    RAD2DEG,
    generateUUID,
    clamp,
    euclideanModulo,
    mapLinear,
    inverseLerp,
    lerp,
    damp,
    pingpong,
    smoothstep,
    smootherstep,
    randInt,
    randFloat,
    randFloatSpread,
    seededRandom,
    degToRad,
    radToDeg,
    isPowerOfTwo,
    ceilPowerOfTwo,
    floorPowerOfTwo,
    setQuaternionFromProperEuler,
    normalize,
    denormalize
};
export const W = class e {
    constructor(t = 0, n = 0){
        e.prototype.isVector2 = true;
        this.x = t;
        this.y = n;
    }
    get width() {
        return this.x;
    }
    set width(e) {
        this.x = e;
    }
    get height() {
        return this.y;
    }
    set height(e) {
        this.y = e;
    }
    set(e, t) {
        this.x = e;
        this.y = t;
        return this;
    }
    setScalar(e) {
        this.x = e;
        this.y = e;
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
    setComponent(e, t) {
        switch(e){
            case 0:
                this.x = t;
                break;
            case 1:
                this.y = t;
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
            default:
                throw Error(`index is out of range: ` + e);
        }
    }
    clone() {
        return new this.constructor(this.x, this.y);
    }
    copy(e) {
        this.x = e.x;
        this.y = e.y;
        return this;
    }
    add(e) {
        this.x += e.x;
        this.y += e.y;
        return this;
    }
    addScalar(e) {
        this.x += e;
        this.y += e;
        return this;
    }
    addVectors(e, t) {
        this.x = e.x + t.x;
        this.y = e.y + t.y;
        return this;
    }
    addScaledVector(e, t) {
        this.x += e.x * t;
        this.y += e.y * t;
        return this;
    }
    sub(e) {
        this.x -= e.x;
        this.y -= e.y;
        return this;
    }
    subScalar(e) {
        this.x -= e;
        this.y -= e;
        return this;
    }
    subVectors(e, t) {
        this.x = e.x - t.x;
        this.y = e.y - t.y;
        return this;
    }
    multiply(e) {
        this.x *= e.x;
        this.y *= e.y;
        return this;
    }
    multiplyScalar(e) {
        this.x *= e;
        this.y *= e;
        return this;
    }
    divide(e) {
        this.x /= e.x;
        this.y /= e.y;
        return this;
    }
    divideScalar(e) {
        return this.multiplyScalar(1 / e);
    }
    applyMatrix3(e) {
        let t = this.x;
        let n = this.y;
        let e_elements = e.elements;
        this.x = e_elements[0] * t + e_elements[3] * n + e_elements[6];
        this.y = e_elements[1] * t + e_elements[4] * n + e_elements[7];
        return this;
    }
    min(e) {
        this.x = Math.min(this.x, e.x);
        this.y = Math.min(this.y, e.y);
        return this;
    }
    max(e) {
        this.x = Math.max(this.x, e.x);
        this.y = Math.max(this.y, e.y);
        return this;
    }
    clamp(e, t) {
        this.x = clamp(this.x, e.x, t.x);
        this.y = clamp(this.y, e.y, t.y);
        return this;
    }
    clampScalar(e, t) {
        this.x = clamp(this.x, e, t);
        this.y = clamp(this.y, e, t);
        return this;
    }
    clampLength(e, t) {
        let n = this.length();
        return this.divideScalar(n || 1).multiplyScalar(clamp(n, e, t));
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
    roundToZero() {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    dot(e) {
        return this.x * e.x + this.y * e.y;
    }
    cross(e) {
        return this.x * e.y - this.y * e.x;
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    angle() {
        return Math.atan2(-this.y, -this.x) + Math.PI;
    }
    angleTo(e) {
        let t = Math.sqrt(this.lengthSq() * e.lengthSq());
        if (t === 0) {
            return Math.PI / 2;
        }
        let n = this.dot(e) / t;
        return Math.acos(clamp(n, -1, 1));
    }
    distanceTo(e) {
        return Math.sqrt(this.distanceToSquared(e));
    }
    distanceToSquared(e) {
        let t = this.x - e.x;
        let n = this.y - e.y;
        return t * t + n * n;
    }
    manhattanDistanceTo(e) {
        return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
    }
    setLength(e) {
        return this.normalize().multiplyScalar(e);
    }
    lerp(e, t) {
        this.x += (e.x - this.x) * t;
        this.y += (e.y - this.y) * t;
        return this;
    }
    lerpVectors(e, t, n) {
        this.x = e.x + (t.x - e.x) * n;
        this.y = e.y + (t.y - e.y) * n;
        return this;
    }
    equals(e) {
        return e.x === this.x && e.y === this.y;
    }
    fromArray(e, t = 0) {
        this.x = e[t];
        this.y = e[t + 1];
        return this;
    }
    toArray(e = [], t = 0) {
        e[t] = this.x;
        e[t + 1] = this.y;
        return e;
    }
    fromBufferAttribute(e, t) {
        this.x = e.getX(t);
        this.y = e.getY(t);
        return this;
    }
    rotateAround(e, t) {
        let n = Math.cos(t);
        let r = Math.sin(t);
        let i = this.x - e.x;
        let a = this.y - e.y;
        this.x = i * n - a * r + e.x;
        this.y = i * r + a * n + e.y;
        return this;
    }
    random() {
        this.x = Math.random();
        this.y = Math.random();
        return this;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
};
export class Mc {
    constructor(e = 0, t = 0, n = 0, r = 1){
        this.isQuaternion = true;
        this._x = e;
        this._y = t;
        this._z = n;
        this._w = r;
    }
    static slerpFlat(e, t, n, r, i, a, o) {
        let s = n[r + 0];
        let c = n[r + 1];
        let l = n[r + 2];
        let u = n[r + 3];
        let d = i[a + 0];
        let f = i[a + 1];
        let p = i[a + 2];
        let m = i[a + 3];
        if (u !== m || s !== d || c !== f || l !== p) {
            let e = s * d + c * f + l * p + u * m;
            if (e < 0) {
                d = -d;
                f = -f;
                p = -p;
                m = -m;
                e = -e;
            }
            let t = 1 - o;
            if (e < 0.9995) {
                let n = Math.acos(e);
                let r = Math.sin(n);
                t = Math.sin(t * n) / r;
                o = Math.sin(o * n) / r;
                s = s * t + d * o;
                c = c * t + f * o;
                l = l * t + p * o;
                u = u * t + m * o;
            } else {
                s = s * t + d * o;
                c = c * t + f * o;
                l = l * t + p * o;
                u = u * t + m * o;
                let e = 1 / Math.sqrt(s * s + c * c + l * l + u * u);
                s *= e;
                c *= e;
                l *= e;
                u *= e;
            }
        }
        e[t] = s;
        e[t + 1] = c;
        e[t + 2] = l;
        e[t + 3] = u;
    }
    static multiplyQuaternionsFlat(e, t, n, r, i, a) {
        let o = n[r];
        let s = n[r + 1];
        let c = n[r + 2];
        let l = n[r + 3];
        let u = i[a];
        let d = i[a + 1];
        let f = i[a + 2];
        let p = i[a + 3];
        e[t] = o * p + l * u + s * f - c * d;
        e[t + 1] = s * p + l * d + c * u - o * f;
        e[t + 2] = c * p + l * f + o * d - s * u;
        e[t + 3] = l * p - o * u - s * d - c * f;
        return e;
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
    get w() {
        return this._w;
    }
    set w(e) {
        this._w = e;
        this._onChangeCallback();
    }
    set(e, t, n, r) {
        this._x = e;
        this._y = t;
        this._z = n;
        this._w = r;
        this._onChangeCallback();
        return this;
    }
    clone() {
        return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(e) {
        this._x = e.x;
        this._y = e.y;
        this._z = e.z;
        this._w = e.w;
        this._onChangeCallback();
        return this;
    }
    setFromEuler({ _x, _y, _z, _order }, t = true) {
        let Math_cos = Math.cos;
        let Math_sin = Math.sin;
        let c = Math_cos(_x / 2);
        let l = Math_cos(_y / 2);
        let u = Math_cos(_z / 2);
        let d = Math_sin(_x / 2);
        let f = Math_sin(_y / 2);
        let p = Math_sin(_z / 2);
        switch(_order){
            case `XYZ`:
                this._x = d * l * u + c * f * p;
                this._y = c * f * u - d * l * p;
                this._z = c * l * p + d * f * u;
                this._w = c * l * u - d * f * p;
                break;
            case `YXZ`:
                this._x = d * l * u + c * f * p;
                this._y = c * f * u - d * l * p;
                this._z = c * l * p - d * f * u;
                this._w = c * l * u + d * f * p;
                break;
            case `ZXY`:
                this._x = d * l * u - c * f * p;
                this._y = c * f * u + d * l * p;
                this._z = c * l * p + d * f * u;
                this._w = c * l * u - d * f * p;
                break;
            case `ZYX`:
                this._x = d * l * u - c * f * p;
                this._y = c * f * u + d * l * p;
                this._z = c * l * p - d * f * u;
                this._w = c * l * u + d * f * p;
                break;
            case `YZX`:
                this._x = d * l * u + c * f * p;
                this._y = c * f * u + d * l * p;
                this._z = c * l * p - d * f * u;
                this._w = c * l * u - d * f * p;
                break;
            case `XZY`:
                this._x = d * l * u - c * f * p;
                this._y = c * f * u - d * l * p;
                this._z = c * l * p + d * f * u;
                this._w = c * l * u + d * f * p;
                break;
            default:
                B(`Quaternion: .setFromEuler() encountered an unknown order: ` + _order);
        }
        if (t === true) {
            this._onChangeCallback();
        }
        return this;
    }
    setFromAxisAngle(e, t) {
        let n = t / 2;
        let r = Math.sin(n);
        this._x = e.x * r;
        this._y = e.y * r;
        this._z = e.z * r;
        this._w = Math.cos(n);
        this._onChangeCallback();
        return this;
    }
    setFromRotationMatrix({ elements }) {
        let n = elements[0];
        let r = elements[4];
        let i = elements[8];
        let a = elements[1];
        let o = elements[5];
        let s = elements[9];
        let c = elements[2];
        let l = elements[6];
        let u = elements[10];
        let d = n + o + u;
        if (d > 0) {
            let e = 0.5 / Math.sqrt(d + 1);
            this._w = 0.25 / e;
            this._x = (l - s) * e;
            this._y = (i - c) * e;
            this._z = (a - r) * e;
        } else if (n > o && n > u) {
            let e = 2 * Math.sqrt(1 + n - o - u);
            this._w = (l - s) / e;
            this._x = 0.25 * e;
            this._y = (r + a) / e;
            this._z = (i + c) / e;
        } else if (o > u) {
            let e = 2 * Math.sqrt(1 + o - n - u);
            this._w = (i - c) / e;
            this._x = (r + a) / e;
            this._y = 0.25 * e;
            this._z = (s + l) / e;
        } else {
            let e = 2 * Math.sqrt(1 + u - n - o);
            this._w = (a - r) / e;
            this._x = (i + c) / e;
            this._y = (s + l) / e;
            this._z = 0.25 * e;
        }
        this._onChangeCallback();
        return this;
    }
    setFromUnitVectors(e, t) {
        let n = e.dot(t) + 1;
        if (n < 1e-8) {
            n = 0;
            if (Math.abs(e.x) > Math.abs(e.z)) {
                this._x = -e.y;
                this._y = e.x;
                this._z = 0;
                this._w = n;
            } else {
                this._x = 0;
                this._y = -e.z;
                this._z = e.y;
                this._w = n;
            }
        } else {
            this._x = e.y * t.z - e.z * t.y;
            this._y = e.z * t.x - e.x * t.z;
            this._z = e.x * t.y - e.y * t.x;
            this._w = n;
        }
        return this.normalize();
    }
    angleTo(e) {
        return 2 * Math.acos(Math.abs(clamp(this.dot(e), -1, 1)));
    }
    rotateTowards(e, t) {
        let n = this.angleTo(e);
        if (n === 0) {
            return this;
        }
        let r = Math.min(1, t / n);
        this.slerp(e, r);
        return this;
    }
    identity() {
        return this.set(0, 0, 0, 1);
    }
    invert() {
        return this.conjugate();
    }
    conjugate() {
        this._x *= -1;
        this._y *= -1;
        this._z *= -1;
        this._onChangeCallback();
        return this;
    }
    dot(e) {
        return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
    }
    lengthSq() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    length() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    normalize() {
        let e = this.length();
        if (e === 0) {
            this._x = 0;
            this._y = 0;
            this._z = 0;
            this._w = 1;
        } else {
            e = 1 / e;
            this._x *= e;
            this._y *= e;
            this._z *= e;
            this._w *= e;
        }
        this._onChangeCallback();
        return this;
    }
    multiply(e) {
        return this.multiplyQuaternions(this, e);
    }
    premultiply(e) {
        return this.multiplyQuaternions(e, this);
    }
    multiplyQuaternions({ _x, _y, _z, _w }, t) {
        let o = t._x;
        let s = t._y;
        let c = t._z;
        let l = t._w;
        this._x = _x * l + _w * o + _y * c - _z * s;
        this._y = _y * l + _w * s + _z * o - _x * c;
        this._z = _z * l + _w * c + _x * s - _y * o;
        this._w = _w * l - _x * o - _y * s - _z * c;
        this._onChangeCallback();
        return this;
    }
    slerp(e, t) {
        let n = e._x;
        let r = e._y;
        let i = e._z;
        let a = e._w;
        let o = this.dot(e);
        if (o < 0) {
            n = -n;
            r = -r;
            i = -i;
            a = -a;
            o = -o;
        }
        let s = 1 - t;
        if (o < 0.9995) {
            let e = Math.acos(o);
            let c = Math.sin(e);
            s = Math.sin(s * e) / c;
            t = Math.sin(t * e) / c;
            this._x = this._x * s + n * t;
            this._y = this._y * s + r * t;
            this._z = this._z * s + i * t;
            this._w = this._w * s + a * t;
            this._onChangeCallback();
        } else {
            this._x = this._x * s + n * t;
            this._y = this._y * s + r * t;
            this._z = this._z * s + i * t;
            this._w = this._w * s + a * t;
            this.normalize();
        }
        return this;
    }
    slerpQuaternions(e, t, n) {
        return this.copy(e).slerp(t, n);
    }
    random() {
        let e = 2 * Math.PI * Math.random();
        let t = 2 * Math.PI * Math.random();
        let n = Math.random();
        let r = Math.sqrt(1 - n);
        let i = Math.sqrt(n);
        return this.set(r * Math.sin(e), r * Math.cos(e), i * Math.sin(t), i * Math.cos(t));
    }
    equals(e) {
        return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
    }
    fromArray(e, t = 0) {
        this._x = e[t];
        this._y = e[t + 1];
        this._z = e[t + 2];
        this._w = e[t + 3];
        this._onChangeCallback();
        return this;
    }
    toArray(e = [], t = 0) {
        e[t] = this._x;
        e[t + 1] = this._y;
        e[t + 2] = this._z;
        e[t + 3] = this._w;
        return e;
    }
    fromBufferAttribute(e, t) {
        this._x = e.getX(t);
        this._y = e.getY(t);
        this._z = e.getZ(t);
        this._w = e.getW(t);
        this._onChangeCallback();
        return this;
    }
    toJSON() {
        return this.toArray();
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
        yield this._w;
    }
}
export const G = class e {
    constructor(t = 0, n = 0, r = 0){
        e.prototype.isVector3 = true;
        this.x = t;
        this.y = n;
        this.z = r;
    }
    set(e, t, n = this.z) {
        this.x = e;
        this.y = t;
        this.z = n;
        return this;
    }
    setScalar(e) {
        this.x = e;
        this.y = e;
        this.z = e;
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
            default:
                throw Error(`index is out of range: ` + e);
        }
    }
    clone() {
        return new this.constructor(this.x, this.y, this.z);
    }
    copy(e) {
        this.x = e.x;
        this.y = e.y;
        this.z = e.z;
        return this;
    }
    add(e) {
        this.x += e.x;
        this.y += e.y;
        this.z += e.z;
        return this;
    }
    addScalar(e) {
        this.x += e;
        this.y += e;
        this.z += e;
        return this;
    }
    addVectors(e, t) {
        this.x = e.x + t.x;
        this.y = e.y + t.y;
        this.z = e.z + t.z;
        return this;
    }
    addScaledVector(e, t) {
        this.x += e.x * t;
        this.y += e.y * t;
        this.z += e.z * t;
        return this;
    }
    sub(e) {
        this.x -= e.x;
        this.y -= e.y;
        this.z -= e.z;
        return this;
    }
    subScalar(e) {
        this.x -= e;
        this.y -= e;
        this.z -= e;
        return this;
    }
    subVectors(e, t) {
        this.x = e.x - t.x;
        this.y = e.y - t.y;
        this.z = e.z - t.z;
        return this;
    }
    multiply(e) {
        this.x *= e.x;
        this.y *= e.y;
        this.z *= e.z;
        return this;
    }
    multiplyScalar(e) {
        this.x *= e;
        this.y *= e;
        this.z *= e;
        return this;
    }
    multiplyVectors(e, t) {
        this.x = e.x * t.x;
        this.y = e.y * t.y;
        this.z = e.z * t.z;
        return this;
    }
    applyEuler(e) {
        return this.applyQuaternion(Pc.setFromEuler(e));
    }
    applyAxisAngle(e, t) {
        return this.applyQuaternion(Pc.setFromAxisAngle(e, t));
    }
    applyMatrix3(e) {
        let t = this.x;
        let n = this.y;
        let r = this.z;
        let e_elements = e.elements;
        this.x = e_elements[0] * t + e_elements[3] * n + e_elements[6] * r;
        this.y = e_elements[1] * t + e_elements[4] * n + e_elements[7] * r;
        this.z = e_elements[2] * t + e_elements[5] * n + e_elements[8] * r;
        return this;
    }
    applyNormalMatrix(e) {
        return this.applyMatrix3(e).normalize();
    }
    applyMatrix4(e) {
        let t = this.x;
        let n = this.y;
        let r = this.z;
        let e_elements = e.elements;
        let a = 1 / (e_elements[3] * t + e_elements[7] * n + e_elements[11] * r + e_elements[15]);
        this.x = (e_elements[0] * t + e_elements[4] * n + e_elements[8] * r + e_elements[12]) * a;
        this.y = (e_elements[1] * t + e_elements[5] * n + e_elements[9] * r + e_elements[13]) * a;
        this.z = (e_elements[2] * t + e_elements[6] * n + e_elements[10] * r + e_elements[14]) * a;
        return this;
    }
    applyQuaternion(e) {
        let t = this.x;
        let n = this.y;
        let r = this.z;
        let i = e.x;
        let a = e.y;
        let o = e.z;
        let s = e.w;
        let c = 2 * (a * r - o * n);
        let l = 2 * (o * t - i * r);
        let u = 2 * (i * n - a * t);
        this.x = t + s * c + a * u - o * l;
        this.y = n + s * l + o * c - i * u;
        this.z = r + s * u + i * l - a * c;
        return this;
    }
    project(e) {
        return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
    }
    unproject(e) {
        return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
    }
    transformDirection(e) {
        let t = this.x;
        let n = this.y;
        let r = this.z;
        let e_elements = e.elements;
        this.x = e_elements[0] * t + e_elements[4] * n + e_elements[8] * r;
        this.y = e_elements[1] * t + e_elements[5] * n + e_elements[9] * r;
        this.z = e_elements[2] * t + e_elements[6] * n + e_elements[10] * r;
        return this.normalize();
    }
    divide(e) {
        this.x /= e.x;
        this.y /= e.y;
        this.z /= e.z;
        return this;
    }
    divideScalar(e) {
        return this.multiplyScalar(1 / e);
    }
    min(e) {
        this.x = Math.min(this.x, e.x);
        this.y = Math.min(this.y, e.y);
        this.z = Math.min(this.z, e.z);
        return this;
    }
    max(e) {
        this.x = Math.max(this.x, e.x);
        this.y = Math.max(this.y, e.y);
        this.z = Math.max(this.z, e.z);
        return this;
    }
    clamp(e, t) {
        this.x = clamp(this.x, e.x, t.x);
        this.y = clamp(this.y, e.y, t.y);
        this.z = clamp(this.z, e.z, t.z);
        return this;
    }
    clampScalar(e, t) {
        this.x = clamp(this.x, e, t);
        this.y = clamp(this.y, e, t);
        this.z = clamp(this.z, e, t);
        return this;
    }
    clampLength(e, t) {
        let n = this.length();
        return this.divideScalar(n || 1).multiplyScalar(clamp(n, e, t));
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    }
    roundToZero() {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        this.z = Math.trunc(this.z);
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }
    dot(e) {
        return this.x * e.x + this.y * e.y + this.z * e.z;
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
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
        return this;
    }
    lerpVectors(e, t, n) {
        this.x = e.x + (t.x - e.x) * n;
        this.y = e.y + (t.y - e.y) * n;
        this.z = e.z + (t.z - e.z) * n;
        return this;
    }
    cross(e) {
        return this.crossVectors(this, e);
    }
    crossVectors({ x, y, z }, t) {
        let a = t.x;
        let o = t.y;
        let s = t.z;
        this.x = y * s - z * o;
        this.y = z * a - x * s;
        this.z = x * o - y * a;
        return this;
    }
    projectOnVector(e) {
        let t = e.lengthSq();
        if (t === 0) {
            return this.set(0, 0, 0);
        }
        let n = e.dot(this) / t;
        return this.copy(e).multiplyScalar(n);
    }
    projectOnPlane(e) {
        Nc.copy(this).projectOnVector(e);
        return this.sub(Nc);
    }
    reflect(e) {
        return this.sub(Nc.copy(e).multiplyScalar(2 * this.dot(e)));
    }
    angleTo(e) {
        let t = Math.sqrt(this.lengthSq() * e.lengthSq());
        if (t === 0) {
            return Math.PI / 2;
        }
        let n = this.dot(e) / t;
        return Math.acos(clamp(n, -1, 1));
    }
    distanceTo(e) {
        return Math.sqrt(this.distanceToSquared(e));
    }
    distanceToSquared(e) {
        let t = this.x - e.x;
        let n = this.y - e.y;
        let r = this.z - e.z;
        return t * t + n * n + r * r;
    }
    manhattanDistanceTo(e) {
        return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
    }
    setFromSpherical(e) {
        return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
    }
    setFromSphericalCoords(e, t, n) {
        let r = Math.sin(t) * e;
        this.x = r * Math.sin(n);
        this.y = Math.cos(t) * e;
        this.z = r * Math.cos(n);
        return this;
    }
    setFromCylindrical(e) {
        return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
    }
    setFromCylindricalCoords(e, t, n) {
        this.x = e * Math.sin(t);
        this.y = n;
        this.z = e * Math.cos(t);
        return this;
    }
    setFromMatrixPosition({ elements }) {
        this.x = elements[12];
        this.y = elements[13];
        this.z = elements[14];
        return this;
    }
    setFromMatrixScale(e) {
        let t = this.setFromMatrixColumn(e, 0).length();
        let n = this.setFromMatrixColumn(e, 1).length();
        let r = this.setFromMatrixColumn(e, 2).length();
        this.x = t;
        this.y = n;
        this.z = r;
        return this;
    }
    setFromMatrixColumn(e, t) {
        return this.fromArray(e.elements, t * 4);
    }
    setFromMatrix3Column(e, t) {
        return this.fromArray(e.elements, t * 3);
    }
    setFromEuler(e) {
        this.x = e._x;
        this.y = e._y;
        this.z = e._z;
        return this;
    }
    setFromColor(e) {
        this.x = e.r;
        this.y = e.g;
        this.z = e.b;
        return this;
    }
    equals(e) {
        return e.x === this.x && e.y === this.y && e.z === this.z;
    }
    fromArray(e, t = 0) {
        this.x = e[t];
        this.y = e[t + 1];
        this.z = e[t + 2];
        return this;
    }
    toArray(e = [], t = 0) {
        e[t] = this.x;
        e[t + 1] = this.y;
        e[t + 2] = this.z;
        return e;
    }
    fromBufferAttribute(e, t) {
        this.x = e.getX(t);
        this.y = e.getY(t);
        this.z = e.getZ(t);
        return this;
    }
    random() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        return this;
    }
    randomDirection() {
        let e = Math.random() * Math.PI * 2;
        let t = Math.random() * 2 - 1;
        let n = Math.sqrt(1 - t * t);
        this.x = n * Math.cos(e);
        this.y = t;
        this.z = n * Math.sin(e);
        return this;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
};
var Nc = new G;
var Pc = new Mc;
export const K = class e {
    constructor(t, n, r, i, a, o, s, c, l){
        e.prototype.isMatrix3 = true;
        this.elements = [
            1,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            1
        ];
        if (t !== undefined) {
            this.set(t, n, r, i, a, o, s, c, l);
        }
    }
    set(e, t, n, r, i, a, o, s, c) {
        let elements = this.elements;
        elements[0] = e;
        elements[1] = r;
        elements[2] = o;
        elements[3] = t;
        elements[4] = i;
        elements[5] = s;
        elements[6] = n;
        elements[7] = a;
        elements[8] = c;
        return this;
    }
    identity() {
        this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
        return this;
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
        return this;
    }
    extractBasis(e, t, n) {
        e.setFromMatrix3Column(this, 0);
        t.setFromMatrix3Column(this, 1);
        n.setFromMatrix3Column(this, 2);
        return this;
    }
    setFromMatrix4({ elements }) {
        this.set(elements[0], elements[4], elements[8], elements[1], elements[5], elements[9], elements[2], elements[6], elements[10]);
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
        let o = elements[3];
        let s = elements[6];
        let c = elements[1];
        let l = elements[4];
        let u = elements[7];
        let d = elements[2];
        let f = elements[5];
        let p = elements[8];
        let m = t_elements[0];
        let h = t_elements[3];
        let g = t_elements[6];
        let _ = t_elements[1];
        let v = t_elements[4];
        let y = t_elements[7];
        let b = t_elements[2];
        let x = t_elements[5];
        let S = t_elements[8];
        elements_1[0] = a * m + o * _ + s * b;
        elements_1[3] = a * h + o * v + s * x;
        elements_1[6] = a * g + o * y + s * S;
        elements_1[1] = c * m + l * _ + u * b;
        elements_1[4] = c * h + l * v + u * x;
        elements_1[7] = c * g + l * y + u * S;
        elements_1[2] = d * m + f * _ + p * b;
        elements_1[5] = d * h + f * v + p * x;
        elements_1[8] = d * g + f * y + p * S;
        return this;
    }
    multiplyScalar(e) {
        let elements = this.elements;
        elements[0] *= e;
        elements[3] *= e;
        elements[6] *= e;
        elements[1] *= e;
        elements[4] *= e;
        elements[7] *= e;
        elements[2] *= e;
        elements[5] *= e;
        elements[8] *= e;
        return this;
    }
    determinant() {
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
        return t * a * l - t * o * c - n * i * l + n * o * s + r * i * c - r * a * s;
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
        let u = l * a - o * c;
        let d = o * s - l * i;
        let f = c * i - a * s;
        let p = t * u + n * d + r * f;
        if (p === 0) {
            return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
        let m = 1 / p;
        elements[0] = u * m;
        elements[1] = (r * c - l * n) * m;
        elements[2] = (o * n - r * a) * m;
        elements[3] = d * m;
        elements[4] = (l * t - r * s) * m;
        elements[5] = (r * i - o * t) * m;
        elements[6] = f * m;
        elements[7] = (n * s - c * t) * m;
        elements[8] = (a * t - n * i) * m;
        return this;
    }
    transpose() {
        let e;
        let elements = this.elements;
        e = elements[1];
        elements[1] = elements[3];
        elements[3] = e;
        e = elements[2];
        elements[2] = elements[6];
        elements[6] = e;
        e = elements[5];
        elements[5] = elements[7];
        elements[7] = e;
        return this;
    }
    getNormalMatrix(e) {
        return this.setFromMatrix4(e).invert().transpose();
    }
    transposeIntoArray(e) {
        let elements = this.elements;
        e[0] = elements[0];
        e[1] = elements[3];
        e[2] = elements[6];
        e[3] = elements[1];
        e[4] = elements[4];
        e[5] = elements[7];
        e[6] = elements[2];
        e[7] = elements[5];
        e[8] = elements[8];
        return this;
    }
    setUvTransform(e, t, n, r, i, a, o) {
        let s = Math.cos(i);
        let c = Math.sin(i);
        this.set(n * s, n * c, -n * (s * a + c * o) + a + e, -r * c, r * s, -r * (-c * a + s * o) + o + t, 0, 0, 1);
        return this;
    }
    scale(e, t) {
        this.premultiply(Fc.makeScale(e, t));
        return this;
    }
    rotate(e) {
        this.premultiply(Fc.makeRotation(-e));
        return this;
    }
    translate(e, t) {
        this.premultiply(Fc.makeTranslation(e, t));
        return this;
    }
    makeTranslation(e, t) {
        if (e.isVector2) {
            this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1);
        } else {
            this.set(1, 0, e, 0, 1, t, 0, 0, 1);
        }
        return this;
    }
    makeRotation(e) {
        let t = Math.cos(e);
        let n = Math.sin(e);
        this.set(t, -n, 0, n, t, 0, 0, 0, 1);
        return this;
    }
    makeScale(e, t) {
        this.set(e, 0, 0, 0, t, 0, 0, 0, 1);
        return this;
    }
    equals(e) {
        let elements = this.elements;
        let e_elements = e.elements;
        for(let e = 0; e < 9; e++){
            if (elements[e] !== e_elements[e]) {
                return false;
            }
        }
        return true;
    }
    fromArray(e, t = 0) {
        for(let n = 0; n < 9; n++){
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
        return e;
    }
    clone() {
        return new this.constructor().fromArray(this.elements);
    }
};
var Fc = new K;
export const Ic = new K().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322);
export const Lc = new K().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
