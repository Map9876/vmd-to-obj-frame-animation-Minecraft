import { l as l_1 } from "../dist-C5TDMOul.js";
import { g, h, p as p_1 } from "../dist-C66QuM2X.js";
import { c as c_1, l as l_2, u as u_1 } from "../blockStateParser-3kR-Ucao.js";
import { G, K, W, c, s } from "./chunk_kc.js";
import { B, V, l, tc } from "./chunk_$s.js";
import { J, Jc, Tl, Wc, Y, cl, d, u } from "./chunk_Vc.js";
import { Js, Ko, Ks, No, Po, So, Uo, Wo, _, p, qs, vo } from "./chunk_go.js";
import { X, Ys } from "./chunk_Ys.js";
import { dc, lc, oc } from "./chunk_ac.js";
import { Ac, U } from "./chunk_fc.js";
export const v = (e)=>1 - (1 - e) ** 3;
export class y {
    constructor(e){
        this.host = e;
        this.mode = `orbit`;
        this.transition = null;
    }
    get current() {
        return this.mode;
    }
    get target() {
        return this.transition?.to ?? this.mode;
    }
    get isTransitioning() {
        return this.transition !== null;
    }
    get inputLocked() {
        return this.transition !== null;
    }
    to(to) {
        if (to === this.target && this.transition === null) {
            return;
        }
        if (this.transition) {
            if (to === this.transition.to) {
                return;
            }
            this.host.prepareMode(this.transition.from, to);
            this.transition = {
                from: this.transition.from,
                to,
                elapsed: 0,
                duration: this.startMove(this.transition.from, to)
            };
            this.settleIfInstant();
            return;
        }
        let mode = this.mode;
        this.host.prepareMode(mode, to);
        this.host.exitMode(mode);
        this.transition = {
            from: mode,
            to,
            elapsed: 0,
            duration: this.startMove(mode, to)
        };
        this.settleIfInstant();
    }
    update(e) {
        let transition = this.transition;
        if (!transition) {
            return;
        }
        transition.elapsed += e;
        let n = Math.min(1, transition.elapsed / transition.duration);
        this.host.advanceCameraMove(v(n));
        if (n >= 1) {
            this.settle();
        }
    }
    cancel() {
        if (this.transition) {
            this.settle();
        }
    }
    startMove(e, t) {
        this.host.resetCameraBaseline();
        return Math.max(0, this.host.beginCameraMove(e, t));
    }
    settleIfInstant() {
        if (this.transition && this.transition.duration <= 0) {
            this.host.advanceCameraMove(1);
            this.settle();
        }
    }
    settle() {
        let transition = this.transition;
        if (transition) {
            this.transition = null;
            this.mode = transition.to;
            this.host.enterMode(transition.to);
        }
    }
}
export const Pl = class e {
    constructor(e, t = 1, n = 1000){
        this.isFog = true;
        this.name = ``;
        this.color = new X(e);
        this.near = t;
        this.far = n;
    }
    clone() {
        return new e(this.color, this.near, this.far);
    }
    toJSON() {
        return {
            type: `Fog`,
            name: this.name,
            color: this.color.getHex(),
            near: this.near,
            far: this.far
        };
    }
};
export class Fl extends Tl {
    constructor(){
        super();
        this.isScene = true;
        this.type = `Scene`;
        this.background = null;
        this.environment = null;
        this.fog = null;
        this.backgroundBlurriness = 0;
        this.backgroundIntensity = 1;
        this.backgroundRotation = new cl;
        this.environmentIntensity = 1;
        this.environmentRotation = new cl;
        this.overrideMaterial = null;
        if (typeof __THREE_DEVTOOLS__ < `u`) {
            __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`, {
                detail: this
            }));
        }
    }
    copy(e, t) {
        super.copy(e, t);
        if (e.background !== null) {
            this.background = e.background.clone();
        }
        if (e.environment !== null) {
            this.environment = e.environment.clone();
        }
        if (e.fog !== null) {
            this.fog = e.fog.clone();
        }
        this.backgroundBlurriness = e.backgroundBlurriness;
        this.backgroundIntensity = e.backgroundIntensity;
        this.backgroundRotation.copy(e.backgroundRotation);
        this.environmentIntensity = e.environmentIntensity;
        this.environmentRotation.copy(e.environmentRotation);
        if (e.overrideMaterial !== null) {
            this.overrideMaterial = e.overrideMaterial.clone();
        }
        this.matrixAutoUpdate = e.matrixAutoUpdate;
        return this;
    }
    toJSON(e) {
        let t = super.toJSON(e);
        if (this.fog !== null) {
            t.object.fog = this.fog.toJSON();
        }
        if (this.backgroundBlurriness > 0) {
            t.object.backgroundBlurriness = this.backgroundBlurriness;
        }
        if (this.backgroundIntensity !== 1) {
            t.object.backgroundIntensity = this.backgroundIntensity;
        }
        t.object.backgroundRotation = this.backgroundRotation.toArray();
        if (this.environmentIntensity !== 1) {
            t.object.environmentIntensity = this.environmentIntensity;
        }
        t.object.environmentRotation = this.environmentRotation.toArray();
        return t;
    }
}
const Il = new G;
const Ll = new G;
const Rl = new G;
const zl = new G;
const Bl = new G;
const Vl = new G;
const Hl = new G;
const Ul = new G;
const Wl = new G;
const Gl = new G;
const Kl = new J;
const ql = new J;
const Jl = new J;
const Yl = class e {
    constructor(e = new G, t = new G, n = new G){
        this.a = e;
        this.b = t;
        this.c = n;
    }
    static getNormal(e, t, n, r) {
        r.subVectors(n, t);
        Il.subVectors(e, t);
        r.cross(Il);
        let i = r.lengthSq();
        if (i > 0) {
            return r.multiplyScalar(1 / Math.sqrt(i));
        }
        return r.set(0, 0, 0);
    }
    static getBarycoord(e, t, n, r, i) {
        Il.subVectors(r, t);
        Ll.subVectors(n, t);
        Rl.subVectors(e, t);
        let a = Il.dot(Il);
        let o = Il.dot(Ll);
        let s = Il.dot(Rl);
        let c = Ll.dot(Ll);
        let l = Ll.dot(Rl);
        let u = a * c - o * o;
        if (u === 0) {
            i.set(0, 0, 0);
            return null;
        }
        let d = 1 / u;
        let f = (c * s - o * l) * d;
        let p = (a * l - o * s) * d;
        return i.set(1 - f - p, p, f);
    }
    static containsPoint(e, t, n, r) {
        if (this.getBarycoord(e, t, n, r, zl) === null) {
            return false;
        }
        return zl.x >= 0 && zl.y >= 0 && zl.x + zl.y <= 1;
    }
    static getInterpolation(e, t, n, r, i, a, o, s) {
        if (this.getBarycoord(e, t, n, r, zl) === null) {
            s.x = 0;
            s.y = 0;
            if (`z` in s) {
                s.z = 0;
            }
            if (`w` in s) {
                s.w = 0;
            }
            return null;
        }
        s.setScalar(0);
        s.addScaledVector(i, zl.x);
        s.addScaledVector(a, zl.y);
        s.addScaledVector(o, zl.z);
        return s;
    }
    static getInterpolatedAttribute(e, t, n, r, i, a) {
        Kl.setScalar(0);
        ql.setScalar(0);
        Jl.setScalar(0);
        Kl.fromBufferAttribute(e, t);
        ql.fromBufferAttribute(e, n);
        Jl.fromBufferAttribute(e, r);
        a.setScalar(0);
        a.addScaledVector(Kl, i.x);
        a.addScaledVector(ql, i.y);
        a.addScaledVector(Jl, i.z);
        return a;
    }
    static isFrontFacing(e, t, n, r) {
        Il.subVectors(n, t);
        Ll.subVectors(e, t);
        return Il.cross(Ll).dot(r) < 0;
    }
    set(e, t, n) {
        this.a.copy(e);
        this.b.copy(t);
        this.c.copy(n);
        return this;
    }
    setFromPointsAndIndices(e, t, n, r) {
        this.a.copy(e[t]);
        this.b.copy(e[n]);
        this.c.copy(e[r]);
        return this;
    }
    setFromAttributeAndIndices(e, t, n, r) {
        this.a.fromBufferAttribute(e, t);
        this.b.fromBufferAttribute(e, n);
        this.c.fromBufferAttribute(e, r);
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(e) {
        this.a.copy(e.a);
        this.b.copy(e.b);
        this.c.copy(e.c);
        return this;
    }
    getArea() {
        Il.subVectors(this.c, this.b);
        Ll.subVectors(this.a, this.b);
        return Il.cross(Ll).length() * 0.5;
    }
    getMidpoint(e) {
        return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
    }
    getNormal(t) {
        return e.getNormal(this.a, this.b, this.c, t);
    }
    getPlane(e) {
        return e.setFromCoplanarPoints(this.a, this.b, this.c);
    }
    getBarycoord(t, n) {
        return e.getBarycoord(t, this.a, this.b, this.c, n);
    }
    getInterpolation(t, n, r, i, a) {
        return e.getInterpolation(t, this.a, this.b, this.c, n, r, i, a);
    }
    containsPoint(t) {
        return e.containsPoint(t, this.a, this.b, this.c);
    }
    isFrontFacing(t) {
        return e.isFrontFacing(this.a, this.b, this.c, t);
    }
    intersectsBox(e) {
        return e.intersectsTriangle(this);
    }
    closestPointToPoint(e, t) {
        let n = this.a;
        let r = this.b;
        let i = this.c;
        let a;
        let o;
        Bl.subVectors(r, n);
        Vl.subVectors(i, n);
        Ul.subVectors(e, n);
        let s = Bl.dot(Ul);
        let c = Vl.dot(Ul);
        if (s <= 0 && c <= 0) {
            return t.copy(n);
        }
        Wl.subVectors(e, r);
        let l = Bl.dot(Wl);
        let u = Vl.dot(Wl);
        if (l >= 0 && u <= l) {
            return t.copy(r);
        }
        let d = s * u - l * c;
        if (d <= 0 && s >= 0 && l <= 0) {
            a = s / (s - l);
            return t.copy(n).addScaledVector(Bl, a);
        }
        Gl.subVectors(e, i);
        let f = Bl.dot(Gl);
        let p = Vl.dot(Gl);
        if (p >= 0 && f <= p) {
            return t.copy(i);
        }
        let m = f * c - s * p;
        if (m <= 0 && c >= 0 && p <= 0) {
            o = c / (c - p);
            return t.copy(n).addScaledVector(Vl, o);
        }
        let h = l * p - f * u;
        if (h <= 0 && u - l >= 0 && f - p >= 0) {
            Hl.subVectors(i, r);
            o = (u - l) / (u - l + (f - p));
            return t.copy(r).addScaledVector(Hl, o);
        }
        let g = 1 / (h + m + d);
        a = m * g;
        o = d * g;
        return t.copy(n).addScaledVector(Bl, a).addScaledVector(Vl, o);
    }
    equals(e) {
        return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
    }
};
export class Xl {
    constructor(e = new G(Infinity, Infinity, Infinity), t = new G(-Infinity, -Infinity, -Infinity)){
        this.isBox3 = true;
        this.min = e;
        this.max = t;
    }
    set(e, t) {
        this.min.copy(e);
        this.max.copy(t);
        return this;
    }
    setFromArray(e) {
        this.makeEmpty();
        for(let t = 0, n = e.length; t < n; t += 3){
            this.expandByPoint(Ql.fromArray(e, t));
        }
        return this;
    }
    setFromBufferAttribute(e) {
        this.makeEmpty();
        for(let t = 0, n = e.count; t < n; t++){
            this.expandByPoint(Ql.fromBufferAttribute(e, t));
        }
        return this;
    }
    setFromPoints(e) {
        this.makeEmpty();
        for(let t = 0, n = e.length; t < n; t++){
            this.expandByPoint(e[t]);
        }
        return this;
    }
    setFromCenterAndSize(e, t) {
        let n = Ql.copy(t).multiplyScalar(0.5);
        this.min.copy(e).sub(n);
        this.max.copy(e).add(n);
        return this;
    }
    setFromObject(e, t = false) {
        this.makeEmpty();
        return this.expandByObject(e, t);
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(e) {
        this.min.copy(e.min);
        this.max.copy(e.max);
        return this;
    }
    makeEmpty() {
        this.min.x = this.min.y = this.min.z = Infinity;
        this.max.x = this.max.y = this.max.z = -Infinity;
        return this;
    }
    isEmpty() {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }
    getCenter(e) {
        if (this.isEmpty()) {
            return e.set(0, 0, 0);
        }
        return e.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
    getSize(e) {
        if (this.isEmpty()) {
            return e.set(0, 0, 0);
        }
        return e.subVectors(this.max, this.min);
    }
    expandByPoint(e) {
        this.min.min(e);
        this.max.max(e);
        return this;
    }
    expandByVector(e) {
        this.min.sub(e);
        this.max.add(e);
        return this;
    }
    expandByScalar(e) {
        this.min.addScalar(-e);
        this.max.addScalar(e);
        return this;
    }
    expandByObject(e, t = false) {
        e.updateWorldMatrix(false, false);
        let e_geometry = e.geometry;
        if (e_geometry !== undefined) {
            let r = e_geometry.getAttribute(`position`);
            if (t === true && r !== undefined && e.isInstancedMesh !== true) {
                for(let t = 0, n = r.count; t < n; t++){
                    if (e.isMesh === true) {
                        e.getVertexPosition(t, Ql);
                    } else {
                        Ql.fromBufferAttribute(r, t);
                    }
                    Ql.applyMatrix4(e.matrixWorld);
                    this.expandByPoint(Ql);
                }
            } else {
                if (e.boundingBox === undefined) {
                    if (e_geometry.boundingBox === null) {
                        e_geometry.computeBoundingBox();
                    }
                    $l.copy(e_geometry.boundingBox);
                } else {
                    if (e.boundingBox === null) {
                        e.computeBoundingBox();
                    }
                    $l.copy(e.boundingBox);
                }
                $l.applyMatrix4(e.matrixWorld);
                this.union($l);
            }
        }
        let e_children = e.children;
        for(let e = 0, n = e_children.length; e < n; e++){
            this.expandByObject(e_children[e], t);
        }
        return this;
    }
    containsPoint(e) {
        return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
    }
    containsBox(e) {
        return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
    }
    getParameter(e, t) {
        return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
    }
    intersectsBox(e) {
        return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
    }
    intersectsSphere(e) {
        this.clampPoint(e.center, Ql);
        return Ql.distanceToSquared(e.center) <= e.radius * e.radius;
    }
    intersectsPlane(e) {
        let t;
        let n;
        if (e.normal.x > 0) {
            t = e.normal.x * this.min.x;
            n = e.normal.x * this.max.x;
        } else {
            t = e.normal.x * this.max.x;
            n = e.normal.x * this.min.x;
        }
        if (e.normal.y > 0) {
            t += e.normal.y * this.min.y;
            n += e.normal.y * this.max.y;
        } else {
            t += e.normal.y * this.max.y;
            n += e.normal.y * this.min.y;
        }
        if (e.normal.z > 0) {
            t += e.normal.z * this.min.z;
            n += e.normal.z * this.max.z;
        } else {
            t += e.normal.z * this.max.z;
            n += e.normal.z * this.min.z;
        }
        return t <= -e.constant && n >= -e.constant;
    }
    intersectsTriangle(e) {
        if (this.isEmpty()) {
            return false;
        }
        this.getCenter(ou);
        su.subVectors(this.max, ou);
        eu.subVectors(e.a, ou);
        tu.subVectors(e.b, ou);
        nu.subVectors(e.c, ou);
        ru.subVectors(tu, eu);
        iu.subVectors(nu, tu);
        au.subVectors(eu, nu);
        let t = [
            0,
            -ru.z,
            ru.y,
            0,
            -iu.z,
            iu.y,
            0,
            -au.z,
            au.y,
            ru.z,
            0,
            -ru.x,
            iu.z,
            0,
            -iu.x,
            au.z,
            0,
            -au.x,
            -ru.y,
            ru.x,
            0,
            -iu.y,
            iu.x,
            0,
            -au.y,
            au.x,
            0
        ];
        if (!uu(t, eu, tu, nu, su) || (t = [
            1,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            1
        ], !uu(t, eu, tu, nu, su))) {
            return false;
        }
        cu.crossVectors(ru, iu);
        t = [
            cu.x,
            cu.y,
            cu.z
        ];
        return uu(t, eu, tu, nu, su);
    }
    clampPoint(e, t) {
        return t.copy(e).clamp(this.min, this.max);
    }
    distanceToPoint(e) {
        return this.clampPoint(e, Ql).distanceTo(e);
    }
    getBoundingSphere(e) {
        if (this.isEmpty()) {
            e.makeEmpty();
        } else {
            this.getCenter(e.center);
            e.radius = this.getSize(Ql).length() * 0.5;
        }
        return e;
    }
    intersect(e) {
        this.min.max(e.min);
        this.max.min(e.max);
        if (this.isEmpty()) {
            this.makeEmpty();
        }
        return this;
    }
    union(e) {
        this.min.min(e.min);
        this.max.max(e.max);
        return this;
    }
    applyMatrix4(e) {
        if (this.isEmpty()) {
            return this;
        }
        Zl[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e);
        Zl[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e);
        Zl[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e);
        Zl[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e);
        Zl[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e);
        Zl[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e);
        Zl[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e);
        Zl[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e);
        this.setFromPoints(Zl);
        return this;
    }
    translate(e) {
        this.min.add(e);
        this.max.add(e);
        return this;
    }
    equals(e) {
        return e.min.equals(this.min) && e.max.equals(this.max);
    }
    toJSON() {
        return {
            min: this.min.toArray(),
            max: this.max.toArray()
        };
    }
    fromJSON(e) {
        this.min.fromArray(e.min);
        this.max.fromArray(e.max);
        return this;
    }
}
var Zl = [
    new G,
    new G,
    new G,
    new G,
    new G,
    new G,
    new G,
    new G
];
var Ql = new G;
var $l = new Xl;
var eu = new G;
var tu = new G;
var nu = new G;
var ru = new G;
var iu = new G;
var au = new G;
var ou = new G;
var su = new G;
var cu = new G;
var lu = new G;
function uu(e, t, n, r, i) {
    for(let a = 0, o = e.length - 3; a <= o; a += 3){
        lu.fromArray(e, a);
        let o = i.x * Math.abs(lu.x) + i.y * Math.abs(lu.y) + i.z * Math.abs(lu.z);
        let s = t.dot(lu);
        let c = n.dot(lu);
        let l = r.dot(lu);
        if (Math.max(-Math.max(s, c, l), Math.min(s, c, l)) > o) {
            return false;
        }
    }
    return true;
}
const du = new G;
const fu = new W;
let pu = 0;
export class mu {
    constructor(e, t, n = false){
        if (Array.isArray(e)) {
            throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);
        }
        this.isBufferAttribute = true;
        Object.defineProperty(this, "id", {
            value: pu++
        });
        this.name = ``;
        this.array = e;
        this.itemSize = t;
        this.count = e === undefined ? 0 : e.length / t;
        this.normalized = n;
        this.usage = qs;
        this.updateRanges = [];
        this.gpuType = Po;
        this.version = 0;
    }
    onUploadCallback() {}
    set needsUpdate(e) {
        if (e === true) {
            this.version++;
        }
    }
    setUsage(e) {
        this.usage = e;
        return this;
    }
    addUpdateRange(e, t) {
        this.updateRanges.push({
            start: e,
            count: t
        });
    }
    clearUpdateRanges() {
        this.updateRanges.length = 0;
    }
    copy(e) {
        this.name = e.name;
        this.array = new e.array.constructor(e.array);
        this.itemSize = e.itemSize;
        this.count = e.count;
        this.normalized = e.normalized;
        this.usage = e.usage;
        this.gpuType = e.gpuType;
        return this;
    }
    copyAt(e, t, n) {
        e *= this.itemSize;
        n *= t.itemSize;
        for(let r = 0, i = this.itemSize; r < i; r++){
            this.array[e + r] = t.array[n + r];
        }
        return this;
    }
    copyArray(e) {
        this.array.set(e);
        return this;
    }
    applyMatrix3(e) {
        if (this.itemSize === 2) {
            for(let t = 0, n = this.count; t < n; t++){
                fu.fromBufferAttribute(this, t);
                fu.applyMatrix3(e);
                this.setXY(t, fu.x, fu.y);
            }
        } else if (this.itemSize === 3) {
            for(let t = 0, n = this.count; t < n; t++){
                du.fromBufferAttribute(this, t);
                du.applyMatrix3(e);
                this.setXYZ(t, du.x, du.y, du.z);
            }
        }
        return this;
    }
    applyMatrix4(e) {
        for(let t = 0, n = this.count; t < n; t++){
            du.fromBufferAttribute(this, t);
            du.applyMatrix4(e);
            this.setXYZ(t, du.x, du.y, du.z);
        }
        return this;
    }
    applyNormalMatrix(e) {
        for(let t = 0, n = this.count; t < n; t++){
            du.fromBufferAttribute(this, t);
            du.applyNormalMatrix(e);
            this.setXYZ(t, du.x, du.y, du.z);
        }
        return this;
    }
    transformDirection(e) {
        for(let t = 0, n = this.count; t < n; t++){
            du.fromBufferAttribute(this, t);
            du.transformDirection(e);
            this.setXYZ(t, du.x, du.y, du.z);
        }
        return this;
    }
    set(e, t = 0) {
        this.array.set(e, t);
        return this;
    }
    getComponent(e, t) {
        let n = this.array[e * this.itemSize + t];
        if (this.normalized) {
            n = Ac(n, this.array);
        }
        return n;
    }
    setComponent(e, t, n) {
        if (this.normalized) {
            n = U(n, this.array);
        }
        this.array[e * this.itemSize + t] = n;
        return this;
    }
    getX(e) {
        let t = this.array[e * this.itemSize];
        if (this.normalized) {
            t = Ac(t, this.array);
        }
        return t;
    }
    setX(e, t) {
        if (this.normalized) {
            t = U(t, this.array);
        }
        this.array[e * this.itemSize] = t;
        return this;
    }
    getY(e) {
        let t = this.array[e * this.itemSize + 1];
        if (this.normalized) {
            t = Ac(t, this.array);
        }
        return t;
    }
    setY(e, t) {
        if (this.normalized) {
            t = U(t, this.array);
        }
        this.array[e * this.itemSize + 1] = t;
        return this;
    }
    getZ(e) {
        let t = this.array[e * this.itemSize + 2];
        if (this.normalized) {
            t = Ac(t, this.array);
        }
        return t;
    }
    setZ(e, t) {
        if (this.normalized) {
            t = U(t, this.array);
        }
        this.array[e * this.itemSize + 2] = t;
        return this;
    }
    getW(e) {
        let t = this.array[e * this.itemSize + 3];
        if (this.normalized) {
            t = Ac(t, this.array);
        }
        return t;
    }
    setW(e, t) {
        if (this.normalized) {
            t = U(t, this.array);
        }
        this.array[e * this.itemSize + 3] = t;
        return this;
    }
    setXY(e, t, n) {
        e *= this.itemSize;
        if (this.normalized) {
            t = U(t, this.array);
            n = U(n, this.array);
        }
        this.array[e + 0] = t;
        this.array[e + 1] = n;
        return this;
    }
    setXYZ(e, t, n, r) {
        e *= this.itemSize;
        if (this.normalized) {
            t = U(t, this.array);
            n = U(n, this.array);
            r = U(r, this.array);
        }
        this.array[e + 0] = t;
        this.array[e + 1] = n;
        this.array[e + 2] = r;
        return this;
    }
    setXYZW(e, t, n, r, i) {
        e *= this.itemSize;
        if (this.normalized) {
            t = U(t, this.array);
            n = U(n, this.array);
            r = U(r, this.array);
            i = U(i, this.array);
        }
        this.array[e + 0] = t;
        this.array[e + 1] = n;
        this.array[e + 2] = r;
        this.array[e + 3] = i;
        return this;
    }
    onUpload(e) {
        this.onUploadCallback = e;
        return this;
    }
    clone() {
        return new this.constructor(this.array, this.itemSize).copy(this);
    }
    toJSON() {
        let e = {
            itemSize: this.itemSize,
            type: this.array.constructor.name,
            array: Array.from(this.array),
            normalized: this.normalized
        };
        if (this.name !== ``) {
            e.name = this.name;
        }
        if (this.usage !== 35044) {
            e.usage = this.usage;
        }
        return e;
    }
}
export class hu extends mu {
    constructor(e, t, n){
        super(new Uint16Array(e), t, n);
    }
}
export class gu extends mu {
    constructor(e, t, n){
        super(new Uint32Array(e), t, n);
    }
}
export class Z extends mu {
    constructor(e, t, n){
        super(new Float32Array(e), t, n);
    }
}
const _u = new Xl;
const vu = new G;
const yu = new G;
export class bu {
    constructor(e = new G, t = -1){
        this.isSphere = true;
        this.center = e;
        this.radius = t;
    }
    set(e, t) {
        this.center.copy(e);
        this.radius = t;
        return this;
    }
    setFromPoints(e, t) {
        let center = this.center;
        if (t === undefined) {
            _u.setFromPoints(e).getCenter(center);
        } else {
            center.copy(t);
        }
        let r = 0;
        for(let t = 0, i = e.length; t < i; t++){
            r = Math.max(r, center.distanceToSquared(e[t]));
        }
        this.radius = Math.sqrt(r);
        return this;
    }
    copy(e) {
        this.center.copy(e.center);
        this.radius = e.radius;
        return this;
    }
    isEmpty() {
        return this.radius < 0;
    }
    makeEmpty() {
        this.center.set(0, 0, 0);
        this.radius = -1;
        return this;
    }
    containsPoint(e) {
        return e.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(e) {
        return e.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(e) {
        let t = this.radius + e.radius;
        return e.center.distanceToSquared(this.center) <= t * t;
    }
    intersectsBox(e) {
        return e.intersectsSphere(this);
    }
    intersectsPlane(e) {
        return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(e, t) {
        let n = this.center.distanceToSquared(e);
        t.copy(e);
        if (n > this.radius * this.radius) {
            t.sub(this.center).normalize();
            t.multiplyScalar(this.radius).add(this.center);
        }
        return t;
    }
    getBoundingBox(e) {
        if (this.isEmpty()) {
            e.makeEmpty();
            return e;
        }
        e.set(this.center, this.center);
        e.expandByScalar(this.radius);
        return e;
    }
    applyMatrix4(e) {
        this.center.applyMatrix4(e);
        this.radius *= e.getMaxScaleOnAxis();
        return this;
    }
    translate(e) {
        this.center.add(e);
        return this;
    }
    expandByPoint(e) {
        if (this.isEmpty()) {
            this.center.copy(e);
            this.radius = 0;
            return this;
        }
        vu.subVectors(e, this.center);
        let t = vu.lengthSq();
        if (t > this.radius * this.radius) {
            let e = Math.sqrt(t);
            let n = (e - this.radius) * 0.5;
            this.center.addScaledVector(vu, n / e);
            this.radius += n;
        }
        return this;
    }
    union(e) {
        if (e.isEmpty()) {
            return this;
        }
        if (this.isEmpty()) {
            this.copy(e);
            return this;
        }
        if (this.center.equals(e.center) === true) {
            this.radius = Math.max(this.radius, e.radius);
        } else {
            yu.subVectors(e.center, this.center).setLength(e.radius);
            this.expandByPoint(vu.copy(e.center).add(yu));
            this.expandByPoint(vu.copy(e.center).sub(yu));
        }
        return this;
    }
    equals(e) {
        return e.center.equals(this.center) && e.radius === this.radius;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    toJSON() {
        return {
            radius: this.radius,
            center: this.center.toArray()
        };
    }
    fromJSON(e) {
        this.radius = e.radius;
        this.center.fromArray(e.center);
        return this;
    }
}
let xu = 0;
const Su = new Y;
const Cu = new Tl;
const wu = new G;
const Tu = new Xl;
const Eu = new Xl;
const Du = new G;
export const Ou = class e extends oc {
    constructor(){
        super();
        this.isBufferGeometry = true;
        Object.defineProperty(this, "id", {
            value: xu++
        });
        this.uuid = dc();
        this.name = ``;
        this.type = `BufferGeometry`;
        this.index = null;
        this.indirect = null;
        this.indirectOffset = 0;
        this.attributes = {};
        this.morphAttributes = {};
        this.morphTargetsRelative = false;
        this.groups = [];
        this.boundingBox = null;
        this.boundingSphere = null;
        this.drawRange = {
            start: 0,
            count: Infinity
        };
        this.userData = {};
    }
    getIndex() {
        return this.index;
    }
    setIndex(e) {
        if (Array.isArray(e)) {
            this.index = new (Ys(e) ? gu : hu)(e, 1);
        } else {
            this.index = e;
        }
        return this;
    }
    setIndirect(e, t = 0) {
        this.indirect = e;
        this.indirectOffset = t;
        return this;
    }
    getIndirect() {
        return this.indirect;
    }
    getAttribute(e) {
        return this.attributes[e];
    }
    setAttribute(e, t) {
        this.attributes[e] = t;
        return this;
    }
    deleteAttribute(e) {
        delete this.attributes[e];
        return this;
    }
    hasAttribute(e) {
        return this.attributes[e] !== undefined;
    }
    addGroup(e, t, materialIndex = 0) {
        this.groups.push({
            start: e,
            count: t,
            materialIndex
        });
    }
    clearGroups() {
        this.groups = [];
    }
    setDrawRange(e, t) {
        this.drawRange.start = e;
        this.drawRange.count = t;
    }
    applyMatrix4(e) {
        let position = this.attributes.position;
        if (position !== undefined) {
            position.applyMatrix4(e);
            position.needsUpdate = true;
        }
        let normal = this.attributes.normal;
        if (normal !== undefined) {
            let t = new K().getNormalMatrix(e);
            normal.applyNormalMatrix(t);
            normal.needsUpdate = true;
        }
        let tangent = this.attributes.tangent;
        if (tangent !== undefined) {
            tangent.transformDirection(e);
            tangent.needsUpdate = true;
        }
        if (this.boundingBox !== null) {
            this.computeBoundingBox();
        }
        if (this.boundingSphere !== null) {
            this.computeBoundingSphere();
        }
        return this;
    }
    applyQuaternion(e) {
        Su.makeRotationFromQuaternion(e);
        this.applyMatrix4(Su);
        return this;
    }
    rotateX(e) {
        Su.makeRotationX(e);
        this.applyMatrix4(Su);
        return this;
    }
    rotateY(e) {
        Su.makeRotationY(e);
        this.applyMatrix4(Su);
        return this;
    }
    rotateZ(e) {
        Su.makeRotationZ(e);
        this.applyMatrix4(Su);
        return this;
    }
    translate(e, t, n) {
        Su.makeTranslation(e, t, n);
        this.applyMatrix4(Su);
        return this;
    }
    scale(e, t, n) {
        Su.makeScale(e, t, n);
        this.applyMatrix4(Su);
        return this;
    }
    lookAt(e) {
        Cu.lookAt(e);
        Cu.updateMatrix();
        this.applyMatrix4(Cu.matrix);
        return this;
    }
    center() {
        this.computeBoundingBox();
        this.boundingBox.getCenter(wu).negate();
        this.translate(wu.x, wu.y, wu.z);
        return this;
    }
    setFromPoints(e) {
        let t = this.getAttribute(`position`);
        if (t === undefined) {
            let t = [];
            for(let n = 0, r = e.length; n < r; n++){
                let r = e[n];
                t.push(r.x, r.y, r.z || 0);
            }
            this.setAttribute(`position`, new Z(t, 3));
        } else {
            let n = Math.min(e.length, t.count);
            for(let r = 0; r < n; r++){
                let n = e[r];
                t.setXYZ(r, n.x, n.y, n.z || 0);
            }
            if (e.length > t.count) {
                B(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`);
            }
            t.needsUpdate = true;
        }
        return this;
    }
    computeBoundingBox() {
        if (this.boundingBox === null) {
            this.boundingBox = new Xl;
        }
        let position = this.attributes.position;
        let position_1 = this.morphAttributes.position;
        if (position && position.isGLBufferAttribute) {
            V(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`, this);
            this.boundingBox.set(new G(-Infinity, -Infinity, -Infinity), new G(Infinity, Infinity, Infinity));
            return;
        }
        if (position !== undefined) {
            this.boundingBox.setFromBufferAttribute(position);
            if (position_1) {
                for(let e = 0, n = position_1.length; e < n; e++){
                    let n = position_1[e];
                    Tu.setFromBufferAttribute(n);
                    if (this.morphTargetsRelative) {
                        Du.addVectors(this.boundingBox.min, Tu.min);
                        this.boundingBox.expandByPoint(Du);
                        Du.addVectors(this.boundingBox.max, Tu.max);
                        this.boundingBox.expandByPoint(Du);
                    } else {
                        this.boundingBox.expandByPoint(Tu.min);
                        this.boundingBox.expandByPoint(Tu.max);
                    }
                }
            }
        } else {
            this.boundingBox.makeEmpty();
        }
        if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {
            V(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`, this);
        }
    }
    computeBoundingSphere() {
        if (this.boundingSphere === null) {
            this.boundingSphere = new bu;
        }
        let position = this.attributes.position;
        let position_1 = this.morphAttributes.position;
        if (position && position.isGLBufferAttribute) {
            V(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`, this);
            this.boundingSphere.set(new G, Infinity);
            return;
        }
        if (position) {
            let n = this.boundingSphere.center;
            Tu.setFromBufferAttribute(position);
            if (position_1) {
                for(let e = 0, n = position_1.length; e < n; e++){
                    let n = position_1[e];
                    Eu.setFromBufferAttribute(n);
                    if (this.morphTargetsRelative) {
                        Du.addVectors(Tu.min, Eu.min);
                        Tu.expandByPoint(Du);
                        Du.addVectors(Tu.max, Eu.max);
                        Tu.expandByPoint(Du);
                    } else {
                        Tu.expandByPoint(Eu.min);
                        Tu.expandByPoint(Eu.max);
                    }
                }
            }
            Tu.getCenter(n);
            let r = 0;
            for(let t = 0, i = position.count; t < i; t++){
                Du.fromBufferAttribute(position, t);
                r = Math.max(r, n.distanceToSquared(Du));
            }
            if (position_1) {
                for(let i = 0, a = position_1.length; i < a; i++){
                    let a = position_1[i];
                    let o = this.morphTargetsRelative;
                    for(let t = 0, i = a.count; t < i; t++){
                        Du.fromBufferAttribute(a, t);
                        if (o) {
                            wu.fromBufferAttribute(position, t);
                            Du.add(wu);
                        }
                        r = Math.max(r, n.distanceToSquared(Du));
                    }
                }
            }
            this.boundingSphere.radius = Math.sqrt(r);
            if (isNaN(this.boundingSphere.radius)) {
                V(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`, this);
            }
        }
    }
    computeTangents() {
        let index = this.index;
        let attributes = this.attributes;
        if (index === null || attributes.position === undefined || attributes.normal === undefined || attributes.uv === undefined) {
            V(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);
            return;
        }
        let t_position = attributes.position;
        let t_normal = attributes.normal;
        let attributes_uv = attributes.uv;
        if (this.hasAttribute(`tangent`) === false) {
            this.setAttribute(`tangent`, new mu(new Float32Array(4 * t_position.count), 4));
        }
        let a = this.getAttribute(`tangent`);
        let o = [];
        let s = [];
        for(let e = 0; e < t_position.count; e++){
            o[e] = new G;
            s[e] = new G;
        }
        let c = new G;
        let l = new G;
        let u = new G;
        let d = new W;
        let f = new W;
        let p = new W;
        let m = new G;
        let h = new G;
        function g(e, t, r) {
            c.fromBufferAttribute(t_position, e);
            l.fromBufferAttribute(t_position, t);
            u.fromBufferAttribute(t_position, r);
            d.fromBufferAttribute(attributes_uv, e);
            f.fromBufferAttribute(attributes_uv, t);
            p.fromBufferAttribute(attributes_uv, r);
            l.sub(c);
            u.sub(c);
            f.sub(d);
            p.sub(d);
            let a = 1 / (f.x * p.y - p.x * f.y);
            if (isFinite(a)) {
                m.copy(l).multiplyScalar(p.y).addScaledVector(u, -f.y).multiplyScalar(a);
                h.copy(u).multiplyScalar(f.x).addScaledVector(l, -p.x).multiplyScalar(a);
                o[e].add(m);
                o[t].add(m);
                o[r].add(m);
                s[e].add(h);
                s[t].add(h);
                s[r].add(h);
            }
        }
        let groups = this.groups;
        if (groups.length === 0) {
            groups = [
                {
                    start: 0,
                    count: index.count
                }
            ];
        }
        for(let t = 0, n = groups.length; t < n; ++t){
            let group = groups[t];
            let r = group.start;
            let i = group.count;
            for(let t = r, n = r + i; t < n; t += 3){
                g(index.getX(t + 0), index.getX(t + 1), index.getX(t + 2));
            }
        }
        let v = new G;
        let y = new G;
        let b = new G;
        let x = new G;
        function S(e) {
            b.fromBufferAttribute(t_normal, e);
            x.copy(b);
            let t = o[e];
            v.copy(t);
            v.sub(b.multiplyScalar(b.dot(t))).normalize();
            y.crossVectors(x, t);
            let n = y.dot(s[e]) < 0 ? -1 : 1;
            a.setXYZW(e, v.x, v.y, v.z, n);
        }
        for(let t = 0, n = groups.length; t < n; ++t){
            let group = groups[t];
            let r = group.start;
            let i = group.count;
            for(let t = r, n = r + i; t < n; t += 3){
                S(index.getX(t + 0));
                S(index.getX(t + 1));
                S(index.getX(t + 2));
            }
        }
    }
    computeVertexNormals() {
        let index = this.index;
        let t = this.getAttribute(`position`);
        if (t !== undefined) {
            let n = this.getAttribute(`normal`);
            if (n === undefined) {
                n = new mu(new Float32Array(t.count * 3), 3);
                this.setAttribute(`normal`, n);
            } else {
                for(let e = 0, t = n.count; e < t; e++){
                    n.setXYZ(e, 0, 0, 0);
                }
            }
            let r = new G;
            let i = new G;
            let a = new G;
            let o = new G;
            let s = new G;
            let c = new G;
            let l = new G;
            let u = new G;
            if (index) {
                for(let d = 0, f = index.count; d < f; d += 3){
                    let f = index.getX(d + 0);
                    let p = index.getX(d + 1);
                    let m = index.getX(d + 2);
                    r.fromBufferAttribute(t, f);
                    i.fromBufferAttribute(t, p);
                    a.fromBufferAttribute(t, m);
                    l.subVectors(a, i);
                    u.subVectors(r, i);
                    l.cross(u);
                    o.fromBufferAttribute(n, f);
                    s.fromBufferAttribute(n, p);
                    c.fromBufferAttribute(n, m);
                    o.add(l);
                    s.add(l);
                    c.add(l);
                    n.setXYZ(f, o.x, o.y, o.z);
                    n.setXYZ(p, s.x, s.y, s.z);
                    n.setXYZ(m, c.x, c.y, c.z);
                }
            } else {
                for(let e = 0, o = t.count; e < o; e += 3){
                    r.fromBufferAttribute(t, e + 0);
                    i.fromBufferAttribute(t, e + 1);
                    a.fromBufferAttribute(t, e + 2);
                    l.subVectors(a, i);
                    u.subVectors(r, i);
                    l.cross(u);
                    n.setXYZ(e + 0, l.x, l.y, l.z);
                    n.setXYZ(e + 1, l.x, l.y, l.z);
                    n.setXYZ(e + 2, l.x, l.y, l.z);
                }
            }
            this.normalizeNormals();
            n.needsUpdate = true;
        }
    }
    normalizeNormals() {
        let normal = this.attributes.normal;
        for(let t = 0, n = normal.count; t < n; t++){
            Du.fromBufferAttribute(normal, t);
            Du.normalize();
            normal.setXYZ(t, Du.x, Du.y, Du.z);
        }
    }
    toNonIndexed() {
        function t(e, array) {
            let e_array = e.array;
            let e_itemSize = e.itemSize;
            let e_normalized = e.normalized;
            let a = new e_array.constructor(array.length * e_itemSize);
            let o = 0;
            let s = 0;
            for(let i = 0, c = array.length; i < c; i++){
                o = e.isInterleavedBufferAttribute ? array[i] * e.data.stride + e.offset : array[i] * e_itemSize;
                for(let e = 0; e < e_itemSize; e++){
                    a[s++] = e_array[o++];
                }
            }
            return new mu(a, e_itemSize, e_normalized);
        }
        if (this.index === null) {
            B(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`);
            return this;
        }
        let n = new e;
        let array = this.index.array;
        let attributes = this.attributes;
        for(let e in attributes){
            let a = attributes[e];
            let o = t(a, array);
            n.setAttribute(e, o);
        }
        let morphAttributes = this.morphAttributes;
        for(let e in morphAttributes){
            let i = [];
            let o = morphAttributes[e];
            for(let e = 0, n = o.length; e < n; e++){
                let n = o[e];
                let a = t(n, array);
                i.push(a);
            }
            n.morphAttributes[e] = i;
        }
        n.morphTargetsRelative = this.morphTargetsRelative;
        let groups = this.groups;
        for(let e = 0, t = groups.length; e < t; e++){
            let group = groups[e];
            n.addGroup(group.start, group.count, group.materialIndex);
        }
        return n;
    }
    toJSON() {
        let e = {
            metadata: {
                version: 4.7,
                type: `BufferGeometry`,
                generator: `BufferGeometry.toJSON`
            }
        };
        e.uuid = this.uuid;
        e.type = this.type;
        if (this.name !== ``) {
            e.name = this.name;
        }
        if (Object.keys(this.userData).length > 0) {
            e.userData = this.userData;
        }
        if (this.parameters !== undefined) {
            let t = this.parameters;
            for(let n in t){
                if (t[n] !== undefined) {
                    e[n] = t[n];
                }
            }
            return e;
        }
        e.data = {
            attributes: {}
        };
        let index = this.index;
        if (index !== null) {
            e.data.index = {
                type: index.array.constructor.name,
                array: Array.prototype.slice.call(index.array)
            };
        }
        let attributes = this.attributes;
        for(let t in attributes){
            let r = attributes[t];
            e.data.attributes[t] = r.toJSON(e.data);
        }
        let r = {};
        let i = false;
        for(let t in this.morphAttributes){
            let n = this.morphAttributes[t];
            let a = [];
            for(let t = 0, r = n.length; t < r; t++){
                let r = n[t];
                a.push(r.toJSON(e.data));
            }
            if (a.length > 0) {
                r[t] = a;
                i = true;
            }
        }
        if (i) {
            e.data.morphAttributes = r;
            e.data.morphTargetsRelative = this.morphTargetsRelative;
        }
        let groups = this.groups;
        if (groups.length > 0) {
            e.data.groups = JSON.parse(JSON.stringify(groups));
        }
        let boundingSphere = this.boundingSphere;
        if (boundingSphere !== null) {
            e.data.boundingSphere = boundingSphere.toJSON();
        }
        return e;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(e) {
        this.index = null;
        this.attributes = {};
        this.morphAttributes = {};
        this.groups = [];
        this.boundingBox = null;
        this.boundingSphere = null;
        let t = {};
        this.name = e.name;
        let e_index = e.index;
        if (e_index !== null) {
            this.setIndex(e_index.clone());
        }
        let e_attributes = e.attributes;
        for(let e in e_attributes){
            let n = e_attributes[e];
            this.setAttribute(e, n.clone(t));
        }
        let e_morphAttributes = e.morphAttributes;
        for(let e in e_morphAttributes){
            let n = [];
            let r = e_morphAttributes[e];
            for(let e = 0, i = r.length; e < i; e++){
                n.push(r[e].clone(t));
            }
            this.morphAttributes[e] = n;
        }
        this.morphTargetsRelative = e.morphTargetsRelative;
        let e_groups = e.groups;
        for(let e = 0, t = e_groups.length; e < t; e++){
            let group = e_groups[e];
            this.addGroup(group.start, group.count, group.materialIndex);
        }
        let e_boundingBox = e.boundingBox;
        if (e_boundingBox !== null) {
            this.boundingBox = e_boundingBox.clone();
        }
        let e_boundingSphere = e.boundingSphere;
        if (e_boundingSphere !== null) {
            this.boundingSphere = e_boundingSphere.clone();
        }
        this.drawRange.start = e.drawRange.start;
        this.drawRange.count = e.drawRange.count;
        this.userData = e.userData;
        return this;
    }
    dispose() {
        this.dispatchEvent({
            type: `dispose`
        });
    }
};
export class ku {
    constructor(e, t){
        this.isInterleavedBuffer = true;
        this.array = e;
        this.stride = t;
        this.count = e === undefined ? 0 : e.length / t;
        this.usage = qs;
        this.updateRanges = [];
        this.version = 0;
        this.uuid = dc();
    }
    onUploadCallback() {}
    set needsUpdate(e) {
        if (e === true) {
            this.version++;
        }
    }
    setUsage(e) {
        this.usage = e;
        return this;
    }
    addUpdateRange(e, t) {
        this.updateRanges.push({
            start: e,
            count: t
        });
    }
    clearUpdateRanges() {
        this.updateRanges.length = 0;
    }
    copy(e) {
        this.array = new e.array.constructor(e.array);
        this.count = e.count;
        this.stride = e.stride;
        this.usage = e.usage;
        return this;
    }
    copyAt(e, t, n) {
        e *= this.stride;
        n *= t.stride;
        for(let r = 0, i = this.stride; r < i; r++){
            this.array[e + r] = t.array[n + r];
        }
        return this;
    }
    set(e, t = 0) {
        this.array.set(e, t);
        return this;
    }
    clone(e) {
        if (e.arrayBuffers === undefined) {
            e.arrayBuffers = {};
        }
        if (this.array.buffer._uuid === undefined) {
            this.array.buffer._uuid = dc();
        }
        if (e.arrayBuffers[this.array.buffer._uuid] === undefined) {
            e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer;
        }
        let t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]);
        let n = new this.constructor(t, this.stride);
        n.setUsage(this.usage);
        return n;
    }
    onUpload(e) {
        this.onUploadCallback = e;
        return this;
    }
    toJSON(e) {
        if (e.arrayBuffers === undefined) {
            e.arrayBuffers = {};
        }
        if (this.array.buffer._uuid === undefined) {
            this.array.buffer._uuid = dc();
        }
        if (e.arrayBuffers[this.array.buffer._uuid] === undefined) {
            e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer));
        }
        return {
            uuid: this.uuid,
            buffer: this.array.buffer._uuid,
            type: this.array.constructor.name,
            stride: this.stride
        };
    }
}
const Au = new G;
export const ju = class e {
    constructor(e, t, n, r = false){
        this.isInterleavedBufferAttribute = true;
        this.name = ``;
        this.data = e;
        this.itemSize = t;
        this.offset = n;
        this.normalized = r;
    }
    get count() {
        return this.data.count;
    }
    get array() {
        return this.data.array;
    }
    set needsUpdate(e) {
        this.data.needsUpdate = e;
    }
    applyMatrix4(e) {
        for(let t = 0, n = this.data.count; t < n; t++){
            Au.fromBufferAttribute(this, t);
            Au.applyMatrix4(e);
            this.setXYZ(t, Au.x, Au.y, Au.z);
        }
        return this;
    }
    applyNormalMatrix(e) {
        for(let t = 0, n = this.count; t < n; t++){
            Au.fromBufferAttribute(this, t);
            Au.applyNormalMatrix(e);
            this.setXYZ(t, Au.x, Au.y, Au.z);
        }
        return this;
    }
    transformDirection(e) {
        for(let t = 0, n = this.count; t < n; t++){
            Au.fromBufferAttribute(this, t);
            Au.transformDirection(e);
            this.setXYZ(t, Au.x, Au.y, Au.z);
        }
        return this;
    }
    getComponent(e, t) {
        let n = this.array[e * this.data.stride + this.offset + t];
        if (this.normalized) {
            n = Ac(n, this.array);
        }
        return n;
    }
    setComponent(e, t, n) {
        if (this.normalized) {
            n = U(n, this.array);
        }
        this.data.array[e * this.data.stride + this.offset + t] = n;
        return this;
    }
    setX(e, t) {
        if (this.normalized) {
            t = U(t, this.array);
        }
        this.data.array[e * this.data.stride + this.offset] = t;
        return this;
    }
    setY(e, t) {
        if (this.normalized) {
            t = U(t, this.array);
        }
        this.data.array[e * this.data.stride + this.offset + 1] = t;
        return this;
    }
    setZ(e, t) {
        if (this.normalized) {
            t = U(t, this.array);
        }
        this.data.array[e * this.data.stride + this.offset + 2] = t;
        return this;
    }
    setW(e, t) {
        if (this.normalized) {
            t = U(t, this.array);
        }
        this.data.array[e * this.data.stride + this.offset + 3] = t;
        return this;
    }
    getX(e) {
        let t = this.data.array[e * this.data.stride + this.offset];
        if (this.normalized) {
            t = Ac(t, this.array);
        }
        return t;
    }
    getY(e) {
        let t = this.data.array[e * this.data.stride + this.offset + 1];
        if (this.normalized) {
            t = Ac(t, this.array);
        }
        return t;
    }
    getZ(e) {
        let t = this.data.array[e * this.data.stride + this.offset + 2];
        if (this.normalized) {
            t = Ac(t, this.array);
        }
        return t;
    }
    getW(e) {
        let t = this.data.array[e * this.data.stride + this.offset + 3];
        if (this.normalized) {
            t = Ac(t, this.array);
        }
        return t;
    }
    setXY(e, t, n) {
        e = e * this.data.stride + this.offset;
        if (this.normalized) {
            t = U(t, this.array);
            n = U(n, this.array);
        }
        this.data.array[e + 0] = t;
        this.data.array[e + 1] = n;
        return this;
    }
    setXYZ(e, t, n, r) {
        e = e * this.data.stride + this.offset;
        if (this.normalized) {
            t = U(t, this.array);
            n = U(n, this.array);
            r = U(r, this.array);
        }
        this.data.array[e + 0] = t;
        this.data.array[e + 1] = n;
        this.data.array[e + 2] = r;
        return this;
    }
    setXYZW(e, t, n, r, i) {
        e = e * this.data.stride + this.offset;
        if (this.normalized) {
            t = U(t, this.array);
            n = U(n, this.array);
            r = U(r, this.array);
            i = U(i, this.array);
        }
        this.data.array[e + 0] = t;
        this.data.array[e + 1] = n;
        this.data.array[e + 2] = r;
        this.data.array[e + 3] = i;
        return this;
    }
    clone(t) {
        if (t === undefined) {
            tc(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);
            let e = [];
            for(let t = 0; t < this.count; t++){
                let n = t * this.data.stride + this.offset;
                for(let t = 0; t < this.itemSize; t++){
                    e.push(this.data.array[n + t]);
                }
            }
            return new mu(new this.array.constructor(e), this.itemSize, this.normalized);
        } else {
            if (t.interleavedBuffers === undefined) {
                t.interleavedBuffers = {};
            }
            if (t.interleavedBuffers[this.data.uuid] === undefined) {
                t.interleavedBuffers[this.data.uuid] = this.data.clone(t);
            }
            return new e(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
        }
    }
    toJSON(e) {
        if (e === undefined) {
            tc(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);
            let array = [];
            for(let t = 0; t < this.count; t++){
                let n = t * this.data.stride + this.offset;
                for(let t = 0; t < this.itemSize; t++){
                    array.push(this.data.array[n + t]);
                }
            }
            return {
                itemSize: this.itemSize,
                type: this.array.constructor.name,
                array,
                normalized: this.normalized
            };
        } else {
            if (e.interleavedBuffers === undefined) {
                e.interleavedBuffers = {};
            }
            if (e.interleavedBuffers[this.data.uuid] === undefined) {
                e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e);
            }
            return {
                isInterleavedBufferAttribute: true,
                itemSize: this.itemSize,
                data: this.data.uuid,
                offset: this.offset,
                normalized: this.normalized
            };
        }
    }
};
let Mu = 0;
export class Nu extends oc {
    constructor(){
        super();
        this.isMaterial = true;
        Object.defineProperty(this, "id", {
            value: Mu++
        });
        this.uuid = dc();
        this.name = ``;
        this.type = `Material`;
        this.blending = 1;
        this.side = 0;
        this.vertexColors = false;
        this.opacity = 1;
        this.transparent = false;
        this.alphaHash = false;
        this.blendSrc = 204;
        this.blendDst = 205;
        this.blendEquation = 100;
        this.blendSrcAlpha = null;
        this.blendDstAlpha = null;
        this.blendEquationAlpha = null;
        this.blendColor = new X(0, 0, 0);
        this.blendAlpha = 0;
        this.depthFunc = 3;
        this.depthTest = true;
        this.depthWrite = true;
        this.stencilWriteMask = 255;
        this.stencilFunc = 519;
        this.stencilRef = 0;
        this.stencilFuncMask = 255;
        this.stencilFail = Ks;
        this.stencilZFail = Ks;
        this.stencilZPass = Ks;
        this.stencilWrite = false;
        this.clippingPlanes = null;
        this.clipIntersection = false;
        this.clipShadows = false;
        this.shadowSide = null;
        this.colorWrite = true;
        this.precision = null;
        this.polygonOffset = false;
        this.polygonOffsetFactor = 0;
        this.polygonOffsetUnits = 0;
        this.dithering = false;
        this.alphaToCoverage = false;
        this.premultipliedAlpha = false;
        this.forceSinglePass = false;
        this.allowOverride = true;
        this.visible = true;
        this.toneMapped = true;
        this.userData = {};
        this.version = 0;
        this._alphaTest = 0;
    }
    get alphaTest() {
        return this._alphaTest;
    }
    set alphaTest(e) {
        if (this._alphaTest > 0 != e > 0) {
            this.version++;
        }
        this._alphaTest = e;
    }
    onBeforeRender() {}
    onBeforeCompile() {}
    customProgramCacheKey() {
        return this.onBeforeCompile.toString();
    }
    setValues(e) {
        if (e !== undefined) {
            for(let t in e){
                let n = e[t];
                if (n === undefined) {
                    B(`Material: parameter '${t}' has value of undefined.`);
                    continue;
                }
                let r = this[t];
                if (r === undefined) {
                    B(`Material: '${t}' is not a property of THREE.${this.type}.`);
                    continue;
                }
                if (r && r.isColor) {
                    r.set(n);
                } else if (r && r.isVector3 && n && n.isVector3) {
                    r.copy(n);
                } else {
                    this[t] = n;
                }
            }
        }
    }
    toJSON(e) {
        let t = e === undefined || typeof e == `string`;
        if (t) {
            e = {
                textures: {},
                images: {}
            };
        }
        let n = {
            metadata: {
                version: 4.7,
                type: `Material`,
                generator: `Material.toJSON`
            }
        };
        n.uuid = this.uuid;
        n.type = this.type;
        if (this.name !== ``) {
            n.name = this.name;
        }
        if (this.color && this.color.isColor) {
            n.color = this.color.getHex();
        }
        if (this.roughness !== undefined) {
            n.roughness = this.roughness;
        }
        if (this.metalness !== undefined) {
            n.metalness = this.metalness;
        }
        if (this.sheen !== undefined) {
            n.sheen = this.sheen;
        }
        if (this.sheenColor && this.sheenColor.isColor) {
            n.sheenColor = this.sheenColor.getHex();
        }
        if (this.sheenRoughness !== undefined) {
            n.sheenRoughness = this.sheenRoughness;
        }
        if (this.emissive && this.emissive.isColor) {
            n.emissive = this.emissive.getHex();
        }
        if (this.emissiveIntensity !== undefined && this.emissiveIntensity !== 1) {
            n.emissiveIntensity = this.emissiveIntensity;
        }
        if (this.specular && this.specular.isColor) {
            n.specular = this.specular.getHex();
        }
        if (this.specularIntensity !== undefined) {
            n.specularIntensity = this.specularIntensity;
        }
        if (this.specularColor && this.specularColor.isColor) {
            n.specularColor = this.specularColor.getHex();
        }
        if (this.shininess !== undefined) {
            n.shininess = this.shininess;
        }
        if (this.clearcoat !== undefined) {
            n.clearcoat = this.clearcoat;
        }
        if (this.clearcoatRoughness !== undefined) {
            n.clearcoatRoughness = this.clearcoatRoughness;
        }
        if (this.clearcoatMap && this.clearcoatMap.isTexture) {
            n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid;
        }
        if (this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture) {
            n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid;
        }
        if (this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture) {
            n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid;
            n.clearcoatNormalScale = this.clearcoatNormalScale.toArray();
        }
        if (this.sheenColorMap && this.sheenColorMap.isTexture) {
            n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid;
        }
        if (this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture) {
            n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid;
        }
        if (this.dispersion !== undefined) {
            n.dispersion = this.dispersion;
        }
        if (this.iridescence !== undefined) {
            n.iridescence = this.iridescence;
        }
        if (this.iridescenceIOR !== undefined) {
            n.iridescenceIOR = this.iridescenceIOR;
        }
        if (this.iridescenceThicknessRange !== undefined) {
            n.iridescenceThicknessRange = this.iridescenceThicknessRange;
        }
        if (this.iridescenceMap && this.iridescenceMap.isTexture) {
            n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid;
        }
        if (this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture) {
            n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid;
        }
        if (this.anisotropy !== undefined) {
            n.anisotropy = this.anisotropy;
        }
        if (this.anisotropyRotation !== undefined) {
            n.anisotropyRotation = this.anisotropyRotation;
        }
        if (this.anisotropyMap && this.anisotropyMap.isTexture) {
            n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid;
        }
        if (this.map && this.map.isTexture) {
            n.map = this.map.toJSON(e).uuid;
        }
        if (this.matcap && this.matcap.isTexture) {
            n.matcap = this.matcap.toJSON(e).uuid;
        }
        if (this.alphaMap && this.alphaMap.isTexture) {
            n.alphaMap = this.alphaMap.toJSON(e).uuid;
        }
        if (this.lightMap && this.lightMap.isTexture) {
            n.lightMap = this.lightMap.toJSON(e).uuid;
            n.lightMapIntensity = this.lightMapIntensity;
        }
        if (this.aoMap && this.aoMap.isTexture) {
            n.aoMap = this.aoMap.toJSON(e).uuid;
            n.aoMapIntensity = this.aoMapIntensity;
        }
        if (this.bumpMap && this.bumpMap.isTexture) {
            n.bumpMap = this.bumpMap.toJSON(e).uuid;
            n.bumpScale = this.bumpScale;
        }
        if (this.normalMap && this.normalMap.isTexture) {
            n.normalMap = this.normalMap.toJSON(e).uuid;
            n.normalMapType = this.normalMapType;
            n.normalScale = this.normalScale.toArray();
        }
        if (this.displacementMap && this.displacementMap.isTexture) {
            n.displacementMap = this.displacementMap.toJSON(e).uuid;
            n.displacementScale = this.displacementScale;
            n.displacementBias = this.displacementBias;
        }
        if (this.roughnessMap && this.roughnessMap.isTexture) {
            n.roughnessMap = this.roughnessMap.toJSON(e).uuid;
        }
        if (this.metalnessMap && this.metalnessMap.isTexture) {
            n.metalnessMap = this.metalnessMap.toJSON(e).uuid;
        }
        if (this.emissiveMap && this.emissiveMap.isTexture) {
            n.emissiveMap = this.emissiveMap.toJSON(e).uuid;
        }
        if (this.specularMap && this.specularMap.isTexture) {
            n.specularMap = this.specularMap.toJSON(e).uuid;
        }
        if (this.specularIntensityMap && this.specularIntensityMap.isTexture) {
            n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid;
        }
        if (this.specularColorMap && this.specularColorMap.isTexture) {
            n.specularColorMap = this.specularColorMap.toJSON(e).uuid;
        }
        if (this.envMap && this.envMap.isTexture) {
            n.envMap = this.envMap.toJSON(e).uuid;
            if (this.combine !== undefined) {
                n.combine = this.combine;
            }
        }
        if (this.envMapRotation !== undefined) {
            n.envMapRotation = this.envMapRotation.toArray();
        }
        if (this.envMapIntensity !== undefined) {
            n.envMapIntensity = this.envMapIntensity;
        }
        if (this.reflectivity !== undefined) {
            n.reflectivity = this.reflectivity;
        }
        if (this.refractionRatio !== undefined) {
            n.refractionRatio = this.refractionRatio;
        }
        if (this.gradientMap && this.gradientMap.isTexture) {
            n.gradientMap = this.gradientMap.toJSON(e).uuid;
        }
        if (this.transmission !== undefined) {
            n.transmission = this.transmission;
        }
        if (this.transmissionMap && this.transmissionMap.isTexture) {
            n.transmissionMap = this.transmissionMap.toJSON(e).uuid;
        }
        if (this.thickness !== undefined) {
            n.thickness = this.thickness;
        }
        if (this.thicknessMap && this.thicknessMap.isTexture) {
            n.thicknessMap = this.thicknessMap.toJSON(e).uuid;
        }
        if (this.attenuationDistance !== undefined && this.attenuationDistance !== Infinity) {
            n.attenuationDistance = this.attenuationDistance;
        }
        if (this.attenuationColor !== undefined) {
            n.attenuationColor = this.attenuationColor.getHex();
        }
        if (this.size !== undefined) {
            n.size = this.size;
        }
        if (this.shadowSide !== null) {
            n.shadowSide = this.shadowSide;
        }
        if (this.sizeAttenuation !== undefined) {
            n.sizeAttenuation = this.sizeAttenuation;
        }
        if (this.blending !== 1) {
            n.blending = this.blending;
        }
        if (this.side !== 0) {
            n.side = this.side;
        }
        if (this.vertexColors === true) {
            n.vertexColors = true;
        }
        if (this.opacity < 1) {
            n.opacity = this.opacity;
        }
        if (this.transparent === true) {
            n.transparent = true;
        }
        if (this.blendSrc !== 204) {
            n.blendSrc = this.blendSrc;
        }
        if (this.blendDst !== 205) {
            n.blendDst = this.blendDst;
        }
        if (this.blendEquation !== 100) {
            n.blendEquation = this.blendEquation;
        }
        if (this.blendSrcAlpha !== null) {
            n.blendSrcAlpha = this.blendSrcAlpha;
        }
        if (this.blendDstAlpha !== null) {
            n.blendDstAlpha = this.blendDstAlpha;
        }
        if (this.blendEquationAlpha !== null) {
            n.blendEquationAlpha = this.blendEquationAlpha;
        }
        if (this.blendColor && this.blendColor.isColor) {
            n.blendColor = this.blendColor.getHex();
        }
        if (this.blendAlpha !== 0) {
            n.blendAlpha = this.blendAlpha;
        }
        if (this.depthFunc !== 3) {
            n.depthFunc = this.depthFunc;
        }
        if (this.depthTest === false) {
            n.depthTest = this.depthTest;
        }
        if (this.depthWrite === false) {
            n.depthWrite = this.depthWrite;
        }
        if (this.colorWrite === false) {
            n.colorWrite = this.colorWrite;
        }
        if (this.stencilWriteMask !== 255) {
            n.stencilWriteMask = this.stencilWriteMask;
        }
        if (this.stencilFunc !== 519) {
            n.stencilFunc = this.stencilFunc;
        }
        if (this.stencilRef !== 0) {
            n.stencilRef = this.stencilRef;
        }
        if (this.stencilFuncMask !== 255) {
            n.stencilFuncMask = this.stencilFuncMask;
        }
        if (this.stencilFail !== 7680) {
            n.stencilFail = this.stencilFail;
        }
        if (this.stencilZFail !== 7680) {
            n.stencilZFail = this.stencilZFail;
        }
        if (this.stencilZPass !== 7680) {
            n.stencilZPass = this.stencilZPass;
        }
        if (this.stencilWrite === true) {
            n.stencilWrite = this.stencilWrite;
        }
        if (this.rotation !== undefined && this.rotation !== 0) {
            n.rotation = this.rotation;
        }
        if (this.polygonOffset === true) {
            n.polygonOffset = true;
        }
        if (this.polygonOffsetFactor !== 0) {
            n.polygonOffsetFactor = this.polygonOffsetFactor;
        }
        if (this.polygonOffsetUnits !== 0) {
            n.polygonOffsetUnits = this.polygonOffsetUnits;
        }
        if (this.linewidth !== undefined && this.linewidth !== 1) {
            n.linewidth = this.linewidth;
        }
        if (this.dashSize !== undefined) {
            n.dashSize = this.dashSize;
        }
        if (this.gapSize !== undefined) {
            n.gapSize = this.gapSize;
        }
        if (this.scale !== undefined) {
            n.scale = this.scale;
        }
        if (this.dithering === true) {
            n.dithering = true;
        }
        if (this.alphaTest > 0) {
            n.alphaTest = this.alphaTest;
        }
        if (this.alphaHash === true) {
            n.alphaHash = true;
        }
        if (this.alphaToCoverage === true) {
            n.alphaToCoverage = true;
        }
        if (this.premultipliedAlpha === true) {
            n.premultipliedAlpha = true;
        }
        if (this.forceSinglePass === true) {
            n.forceSinglePass = true;
        }
        if (this.allowOverride === false) {
            n.allowOverride = false;
        }
        if (this.wireframe === true) {
            n.wireframe = true;
        }
        if (this.wireframeLinewidth > 1) {
            n.wireframeLinewidth = this.wireframeLinewidth;
        }
        if (this.wireframeLinecap !== `round`) {
            n.wireframeLinecap = this.wireframeLinecap;
        }
        if (this.wireframeLinejoin !== `round`) {
            n.wireframeLinejoin = this.wireframeLinejoin;
        }
        if (this.flatShading === true) {
            n.flatShading = true;
        }
        if (this.visible === false) {
            n.visible = false;
        }
        if (this.toneMapped === false) {
            n.toneMapped = false;
        }
        if (this.fog === false) {
            n.fog = false;
        }
        if (Object.keys(this.userData).length > 0) {
            n.userData = this.userData;
        }
        function r(e) {
            let t = [];
            for(let n in e){
                let r = e[n];
                delete r.metadata;
                t.push(r);
            }
            return t;
        }
        if (t) {
            let t = r(e.textures);
            let i = r(e.images);
            if (t.length > 0) {
                n.textures = t;
            }
            if (i.length > 0) {
                n.images = i;
            }
        }
        return n;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(e) {
        this.name = e.name;
        this.blending = e.blending;
        this.side = e.side;
        this.vertexColors = e.vertexColors;
        this.opacity = e.opacity;
        this.transparent = e.transparent;
        this.blendSrc = e.blendSrc;
        this.blendDst = e.blendDst;
        this.blendEquation = e.blendEquation;
        this.blendSrcAlpha = e.blendSrcAlpha;
        this.blendDstAlpha = e.blendDstAlpha;
        this.blendEquationAlpha = e.blendEquationAlpha;
        this.blendColor.copy(e.blendColor);
        this.blendAlpha = e.blendAlpha;
        this.depthFunc = e.depthFunc;
        this.depthTest = e.depthTest;
        this.depthWrite = e.depthWrite;
        this.stencilWriteMask = e.stencilWriteMask;
        this.stencilFunc = e.stencilFunc;
        this.stencilRef = e.stencilRef;
        this.stencilFuncMask = e.stencilFuncMask;
        this.stencilFail = e.stencilFail;
        this.stencilZFail = e.stencilZFail;
        this.stencilZPass = e.stencilZPass;
        this.stencilWrite = e.stencilWrite;
        let e_clippingPlanes = e.clippingPlanes;
        let n = null;
        if (e_clippingPlanes !== null) {
            let e = e_clippingPlanes.length;
            n = Array(e);
            for(let r = 0; r !== e; ++r){
                n[r] = e_clippingPlanes[r].clone();
            }
        }
        this.clippingPlanes = n;
        this.clipIntersection = e.clipIntersection;
        this.clipShadows = e.clipShadows;
        this.shadowSide = e.shadowSide;
        this.colorWrite = e.colorWrite;
        this.precision = e.precision;
        this.polygonOffset = e.polygonOffset;
        this.polygonOffsetFactor = e.polygonOffsetFactor;
        this.polygonOffsetUnits = e.polygonOffsetUnits;
        this.dithering = e.dithering;
        this.alphaTest = e.alphaTest;
        this.alphaHash = e.alphaHash;
        this.alphaToCoverage = e.alphaToCoverage;
        this.premultipliedAlpha = e.premultipliedAlpha;
        this.forceSinglePass = e.forceSinglePass;
        this.allowOverride = e.allowOverride;
        this.visible = e.visible;
        this.toneMapped = e.toneMapped;
        this.userData = JSON.parse(JSON.stringify(e.userData));
        return this;
    }
    dispose() {
        this.dispatchEvent({
            type: `dispose`
        });
    }
    set needsUpdate(e) {
        if (e === true) {
            this.version++;
        }
    }
}
export class Pu extends Nu {
    constructor(e){
        super();
        this.isSpriteMaterial = true;
        this.type = `SpriteMaterial`;
        this.color = new X(16777215);
        this.map = null;
        this.alphaMap = null;
        this.rotation = 0;
        this.sizeAttenuation = true;
        this.transparent = true;
        this.fog = true;
        this.setValues(e);
    }
    copy(e) {
        super.copy(e);
        this.color.copy(e.color);
        this.map = e.map;
        this.alphaMap = e.alphaMap;
        this.rotation = e.rotation;
        this.sizeAttenuation = e.sizeAttenuation;
        this.fog = e.fog;
        return this;
    }
}
let Fu;
const Iu = new G;
const Lu = new G;
const Ru = new G;
const zu = new W;
const Bu = new W;
const Vu = new Y;
const Hu = new G;
const Uu = new G;
const Wu = new G;
const Gu = new W;
const Ku = new W;
const qu = new W;
export class Ju extends Tl {
    constructor(e = new Pu){
        super();
        this.isSprite = true;
        this.type = `Sprite`;
        if (Fu === undefined) {
            Fu = new Ou;
            let e = new ku(new Float32Array([
                -0.5,
                -0.5,
                0,
                0,
                0,
                0.5,
                -0.5,
                0,
                1,
                0,
                0.5,
                0.5,
                0,
                1,
                1,
                -0.5,
                0.5,
                0,
                0,
                1
            ]), 5);
            Fu.setIndex([
                0,
                1,
                2,
                0,
                2,
                3
            ]);
            Fu.setAttribute(`position`, new ju(e, 3, 0, false));
            Fu.setAttribute(`uv`, new ju(e, 2, 3, false));
        }
        this.geometry = Fu;
        this.material = e;
        this.center = new W(0.5, 0.5);
        this.count = 1;
    }
    raycast(e, t) {
        if (e.camera === null) {
            V(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`);
        }
        Lu.setFromMatrixScale(this.matrixWorld);
        Vu.copy(e.camera.matrixWorld);
        this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld);
        Ru.setFromMatrixPosition(this.modelViewMatrix);
        if (e.camera.isPerspectiveCamera && this.material.sizeAttenuation === false) {
            Lu.multiplyScalar(-Ru.z);
        }
        let rotation = this.material.rotation;
        let r;
        let i;
        if (rotation !== 0) {
            i = Math.cos(rotation);
            r = Math.sin(rotation);
        }
        let center = this.center;
        Yu(Hu.set(-0.5, -0.5, 0), Ru, center, Lu, r, i);
        Yu(Uu.set(0.5, -0.5, 0), Ru, center, Lu, r, i);
        Yu(Wu.set(0.5, 0.5, 0), Ru, center, Lu, r, i);
        Gu.set(0, 0);
        Ku.set(1, 0);
        qu.set(1, 1);
        let o = e.ray.intersectTriangle(Hu, Uu, Wu, false, Iu);
        if (o === null && (Yu(Uu.set(-0.5, 0.5, 0), Ru, center, Lu, r, i), Ku.set(0, 1), o = e.ray.intersectTriangle(Hu, Wu, Uu, false, Iu), o === null)) {
            return;
        }
        let s = e.ray.origin.distanceTo(Iu);
        if (!(s < e.near || s > e.far)) {
            t.push({
                distance: s,
                point: Iu.clone(),
                uv: Yl.getInterpolation(Iu, Hu, Uu, Wu, Gu, Ku, qu, new W),
                face: null,
                object: this
            });
        }
    }
    copy(e, t) {
        super.copy(e, t);
        if (e.center !== undefined) {
            this.center.copy(e.center);
        }
        this.material = e.material;
        return this;
    }
}
function Yu(e, t, center, r, i, a) {
    zu.subVectors(e, center).addScalar(0.5).multiply(r);
    if (i === undefined) {
        Bu.copy(zu);
    } else {
        Bu.x = a * zu.x - i * zu.y;
        Bu.y = i * zu.x + a * zu.y;
    }
    e.copy(t);
    e.x += Bu.x;
    e.y += Bu.y;
    e.applyMatrix4(Vu);
}
const Xu = new G;
const Zu = new G;
const Qu = new G;
const $u = new G;
const ed = new G;
const td = new G;
const nd = new G;
export class rd {
    constructor(e = new G, t = new G(0, 0, -1)){
        this.origin = e;
        this.direction = t;
    }
    set(e, t) {
        this.origin.copy(e);
        this.direction.copy(t);
        return this;
    }
    copy(e) {
        this.origin.copy(e.origin);
        this.direction.copy(e.direction);
        return this;
    }
    at(e, t) {
        return t.copy(this.origin).addScaledVector(this.direction, e);
    }
    lookAt(e) {
        this.direction.copy(e).sub(this.origin).normalize();
        return this;
    }
    recast(e) {
        this.origin.copy(this.at(e, Xu));
        return this;
    }
    closestPointToPoint(e, t) {
        t.subVectors(e, this.origin);
        let n = t.dot(this.direction);
        if (n < 0) {
            return t.copy(this.origin);
        }
        return t.copy(this.origin).addScaledVector(this.direction, n);
    }
    distanceToPoint(e) {
        return Math.sqrt(this.distanceSqToPoint(e));
    }
    distanceSqToPoint(e) {
        let t = Xu.subVectors(e, this.origin).dot(this.direction);
        if (t < 0) {
            return this.origin.distanceToSquared(e);
        }
        Xu.copy(this.origin).addScaledVector(this.direction, t);
        return Xu.distanceToSquared(e);
    }
    distanceSqToSegment(e, t, n, r) {
        Zu.copy(e).add(t).multiplyScalar(0.5);
        Qu.copy(t).sub(e).normalize();
        $u.copy(this.origin).sub(Zu);
        let i = e.distanceTo(t) * 0.5;
        let a = -this.direction.dot(Qu);
        let o = $u.dot(this.direction);
        let s = -$u.dot(Qu);
        let c = $u.lengthSq();
        let l = Math.abs(1 - a * a);
        let u;
        let d;
        let f;
        let p;
        if (l > 0) {
            u = a * s - o;
            d = a * o - s;
            p = i * l;
            if (u >= 0) {
                if (d >= -p) {
                    if (d <= p) {
                        let e = 1 / l;
                        u *= e;
                        d *= e;
                        f = u * (u + a * d + 2 * o) + d * (a * u + d + 2 * s) + c;
                    } else {
                        d = i;
                        u = Math.max(0, -(a * d + o));
                        f = -u * u + d * (d + 2 * s) + c;
                    }
                } else {
                    d = -i;
                    u = Math.max(0, -(a * d + o));
                    f = -u * u + d * (d + 2 * s) + c;
                }
            } else {
                if (d <= -p) {
                    u = Math.max(0, -(-a * i + o));
                    d = u > 0 ? -i : Math.min(Math.max(-i, -s), i);
                    f = -u * u + d * (d + 2 * s) + c;
                } else if (d <= p) {
                    u = 0;
                    d = Math.min(Math.max(-i, -s), i);
                    f = d * (d + 2 * s) + c;
                } else {
                    u = Math.max(0, -(a * i + o));
                    d = u > 0 ? i : Math.min(Math.max(-i, -s), i);
                    f = -u * u + d * (d + 2 * s) + c;
                }
            }
        } else {
            d = a > 0 ? -i : i;
            u = Math.max(0, -(a * d + o));
            f = -u * u + d * (d + 2 * s) + c;
        }
        if (n) {
            n.copy(this.origin).addScaledVector(this.direction, u);
        }
        if (r) {
            r.copy(Zu).addScaledVector(Qu, d);
        }
        return f;
    }
    intersectSphere(e, t) {
        Xu.subVectors(e.center, this.origin);
        let n = Xu.dot(this.direction);
        let r = Xu.dot(Xu) - n * n;
        let i = e.radius * e.radius;
        if (r > i) {
            return null;
        }
        let a = Math.sqrt(i - r);
        let o = n - a;
        let s = n + a;
        if (s < 0) {
            return null;
        }
        if (o < 0) {
            return this.at(s, t);
        }
        return this.at(o, t);
    }
    intersectsSphere(e) {
        if (e.radius < 0) {
            return false;
        }
        return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
    }
    distanceToPlane(e) {
        let t = e.normal.dot(this.direction);
        if (t === 0) {
            if (e.distanceToPoint(this.origin) === 0) {
                return 0;
            }
            return null;
        }
        let n = -(this.origin.dot(e.normal) + e.constant) / t;
        if (n >= 0) {
            return n;
        }
        return null;
    }
    intersectPlane(e, t) {
        let n = this.distanceToPlane(e);
        if (n === null) {
            return null;
        }
        return this.at(n, t);
    }
    intersectsPlane(e) {
        let t = e.distanceToPoint(this.origin);
        return t === 0 || e.normal.dot(this.direction) * t < 0;
    }
    intersectBox(e, t) {
        let n;
        let r;
        let i;
        let a;
        let o;
        let s;
        let c = 1 / this.direction.x;
        let l = 1 / this.direction.y;
        let u = 1 / this.direction.z;
        let origin = this.origin;
        if (c >= 0) {
            n = (e.min.x - origin.x) * c;
            r = (e.max.x - origin.x) * c;
        } else {
            n = (e.max.x - origin.x) * c;
            r = (e.min.x - origin.x) * c;
        }
        if (l >= 0) {
            i = (e.min.y - origin.y) * l;
            a = (e.max.y - origin.y) * l;
        } else {
            i = (e.max.y - origin.y) * l;
            a = (e.min.y - origin.y) * l;
        }
        if (n > a || i > r || ((i > n || isNaN(n)) && (n = i), (a < r || isNaN(r)) && (r = a), u >= 0 ? (o = (e.min.z - origin.z) * u, s = (e.max.z - origin.z) * u) : (o = (e.max.z - origin.z) * u, s = (e.min.z - origin.z) * u), n > s || o > r) || ((o > n || n !== n) && (n = o), (s < r || r !== r) && (r = s), r < 0)) {
            return null;
        }
        return this.at(n >= 0 ? n : r, t);
    }
    intersectsBox(e) {
        return this.intersectBox(e, Xu) !== null;
    }
    intersectTriangle(e, t, n, r, i) {
        ed.subVectors(t, e);
        td.subVectors(n, e);
        nd.crossVectors(ed, td);
        let a = this.direction.dot(nd);
        let o;
        if (a > 0) {
            if (r) {
                return null;
            }
            o = 1;
        } else if (a < 0) {
            o = -1;
            a = -a;
        } else {
            return null;
        }
        $u.subVectors(this.origin, e);
        let s = o * this.direction.dot(td.crossVectors($u, td));
        if (s < 0) {
            return null;
        }
        let c = o * this.direction.dot(ed.cross($u));
        if (c < 0 || s + c > a) {
            return null;
        }
        let l = -o * $u.dot(nd);
        if (l < 0) {
            return null;
        }
        return this.at(l / a, i);
    }
    applyMatrix4(e) {
        this.origin.applyMatrix4(e);
        this.direction.transformDirection(e);
        return this;
    }
    equals(e) {
        return e.origin.equals(this.origin) && e.direction.equals(this.direction);
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
export class id extends Nu {
    constructor(e){
        super();
        this.isMeshBasicMaterial = true;
        this.type = `MeshBasicMaterial`;
        this.color = new X(16777215);
        this.map = null;
        this.lightMap = null;
        this.lightMapIntensity = 1;
        this.aoMap = null;
        this.aoMapIntensity = 1;
        this.specularMap = null;
        this.alphaMap = null;
        this.envMap = null;
        this.envMapRotation = new cl;
        this.combine = 0;
        this.reflectivity = 1;
        this.refractionRatio = 0.98;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.wireframeLinecap = `round`;
        this.wireframeLinejoin = `round`;
        this.fog = true;
        this.setValues(e);
    }
    copy(e) {
        super.copy(e);
        this.color.copy(e.color);
        this.map = e.map;
        this.lightMap = e.lightMap;
        this.lightMapIntensity = e.lightMapIntensity;
        this.aoMap = e.aoMap;
        this.aoMapIntensity = e.aoMapIntensity;
        this.specularMap = e.specularMap;
        this.alphaMap = e.alphaMap;
        this.envMap = e.envMap;
        this.envMapRotation.copy(e.envMapRotation);
        this.combine = e.combine;
        this.reflectivity = e.reflectivity;
        this.refractionRatio = e.refractionRatio;
        this.wireframe = e.wireframe;
        this.wireframeLinewidth = e.wireframeLinewidth;
        this.wireframeLinecap = e.wireframeLinecap;
        this.wireframeLinejoin = e.wireframeLinejoin;
        this.fog = e.fog;
        return this;
    }
}
const ad = new Y;
const od = new rd;
const sd = new bu;
const cd = new G;
const ld = new G;
const ud = new G;
const dd = new G;
const fd = new G;
const pd = new G;
const md = new G;
const hd = new G;
export class gd extends Tl {
    constructor(e = new Ou, t = new id){
        super();
        this.isMesh = true;
        this.type = `Mesh`;
        this.geometry = e;
        this.material = t;
        this.morphTargetDictionary = undefined;
        this.morphTargetInfluences = undefined;
        this.count = 1;
        this.updateMorphTargets();
    }
    copy(e, t) {
        super.copy(e, t);
        if (e.morphTargetInfluences !== undefined) {
            this.morphTargetInfluences = e.morphTargetInfluences.slice();
        }
        if (e.morphTargetDictionary !== undefined) {
            this.morphTargetDictionary = {
                ...e.morphTargetDictionary
            };
        }
        this.material = Array.isArray(e.material) ? e.material.slice() : e.material;
        this.geometry = e.geometry;
        return this;
    }
    updateMorphTargets() {
        let morphAttributes = this.geometry.morphAttributes;
        let t = Object.keys(morphAttributes);
        if (t.length > 0) {
            let n = morphAttributes[t[0]];
            if (n !== undefined) {
                this.morphTargetInfluences = [];
                this.morphTargetDictionary = {};
                for(let e = 0, t = n.length; e < t; e++){
                    let t = n[e].name || String(e);
                    this.morphTargetInfluences.push(0);
                    this.morphTargetDictionary[t] = e;
                }
            }
        }
    }
    getVertexPosition(e, t) {
        let geometry = this.geometry;
        let position = geometry.attributes.position;
        let position_1 = geometry.morphAttributes.position;
        let n_morphTargetsRelative = geometry.morphTargetsRelative;
        t.fromBufferAttribute(position, e);
        let morphTargetInfluences = this.morphTargetInfluences;
        if (position_1 && morphTargetInfluences) {
            pd.set(0, 0, 0);
            for(let n = 0, r = position_1.length; n < r; n++){
                let r = morphTargetInfluences[n];
                let s = position_1[n];
                if (r !== 0) {
                    fd.fromBufferAttribute(s, e);
                    if (n_morphTargetsRelative) {
                        pd.addScaledVector(fd, r);
                    } else {
                        pd.addScaledVector(fd.sub(t), r);
                    }
                }
            }
            t.add(pd);
        }
        return t;
    }
    raycast(e, t) {
        let geometry = this.geometry;
        let material = this.material;
        let matrixWorld = this.matrixWorld;
        if (material !== undefined) {
            if (geometry.boundingSphere === null) {
                geometry.computeBoundingSphere();
            }
            sd.copy(geometry.boundingSphere);
            sd.applyMatrix4(matrixWorld);
            od.copy(e.ray).recast(e.near);
            if (!(sd.containsPoint(od.origin) === false && (od.intersectSphere(sd, cd) === null || od.origin.distanceToSquared(cd) > (e.far - e.near) ** 2))) {
                ad.copy(matrixWorld).invert();
                od.copy(e.ray).applyMatrix4(ad);
                if (!(geometry.boundingBox !== null && od.intersectsBox(geometry.boundingBox) === false)) {
                    this._computeIntersections(e, t, od);
                }
            }
        }
    }
    _computeIntersections(e, t, n) {
        let r;
        let geometry = this.geometry;
        let material = this.material;
        let i_index = geometry.index;
        let position = geometry.attributes.position;
        let c = geometry.attributes.uv;
        let uv1 = geometry.attributes.uv1;
        let normal = geometry.attributes.normal;
        let i_groups = geometry.groups;
        let i_drawRange = geometry.drawRange;
        if (i_index !== null) {
            if (Array.isArray(material)) {
                for(let i = 0, s = i_groups.length; i < s; i++){
                    let group = i_groups[i];
                    let p = material[group.materialIndex];
                    let m = Math.max(group.start, i_drawRange.start);
                    let h = Math.min(i_index.count, Math.min(group.start + group.count, i_drawRange.start + i_drawRange.count));
                    for(let i = m, a = h; i < a; i += 3){
                        let a = i_index.getX(i);
                        let d = i_index.getX(i + 1);
                        let f = i_index.getX(i + 2);
                        r = vd(this, p, e, n, c, uv1, normal, a, d, f);
                        if (r) {
                            r.faceIndex = Math.floor(i / 3);
                            r.face.materialIndex = group.materialIndex;
                            t.push(r);
                        }
                    }
                }
            } else {
                let i = Math.max(0, i_drawRange.start);
                let s = Math.min(i_index.count, i_drawRange.start + i_drawRange.count);
                for(let d = i, f = s; d < f; d += 3){
                    let i = i_index.getX(d);
                    let s = i_index.getX(d + 1);
                    let f = i_index.getX(d + 2);
                    r = vd(this, material, e, n, c, uv1, normal, i, s, f);
                    if (r) {
                        r.faceIndex = Math.floor(d / 3);
                        t.push(r);
                    }
                }
            }
        } else if (position !== undefined) {
            if (Array.isArray(material)) {
                for(let i = 0, o = i_groups.length; i < o; i++){
                    let group = i_groups[i];
                    let p = material[group.materialIndex];
                    let m = Math.max(group.start, i_drawRange.start);
                    let h = Math.min(position.count, Math.min(group.start + group.count, i_drawRange.start + i_drawRange.count));
                    for(let i = m, a = h; i < a; i += 3){
                        let a = i;
                        let s = i + 1;
                        let d = i + 2;
                        r = vd(this, p, e, n, c, uv1, normal, a, s, d);
                        if (r) {
                            r.faceIndex = Math.floor(i / 3);
                            r.face.materialIndex = group.materialIndex;
                            t.push(r);
                        }
                    }
                }
            } else {
                let i = Math.max(0, i_drawRange.start);
                let o = Math.min(position.count, i_drawRange.start + i_drawRange.count);
                for(let s = i, d = o; s < d; s += 3){
                    let i = s;
                    let o = s + 1;
                    let d = s + 2;
                    r = vd(this, material, e, n, c, uv1, normal, i, o, d);
                    if (r) {
                        r.faceIndex = Math.floor(s / 3);
                        t.push(r);
                    }
                }
            }
        }
    }
}
function _d(e, t, n, r, i, a, o, s) {
    let c;
    c = t.side === 1 ? r.intersectTriangle(o, a, i, true, s) : r.intersectTriangle(i, a, o, t.side === 0, s);
    if (c === null) {
        return null;
    }
    hd.copy(s);
    hd.applyMatrix4(e.matrixWorld);
    let l = n.ray.origin.distanceTo(hd);
    if (l < n.near || l > n.far) {
        return null;
    }
    return {
        distance: l,
        point: hd.clone(),
        object: e
    };
}
function vd(e, t, n, r, i, a, normal, a_1, b, c_2) {
    e.getVertexPosition(a_1, ld);
    e.getVertexPosition(b, ud);
    e.getVertexPosition(c_2, dd);
    let u = _d(e, t, n, r, ld, ud, dd, md);
    if (u) {
        let e = new G;
        Yl.getBarycoord(md, ld, ud, dd, e);
        if (i) {
            u.uv = Yl.getInterpolatedAttribute(i, a_1, b, c_2, e, new W);
        }
        if (a) {
            u.uv1 = Yl.getInterpolatedAttribute(a, a_1, b, c_2, e, new W);
        }
        if (normal) {
            u.normal = Yl.getInterpolatedAttribute(normal, a_1, b, c_2, e, new G);
            if (u.normal.dot(r.direction) > 0) {
                u.normal.multiplyScalar(-1);
            }
        }
        let t = {
            a: a_1,
            b,
            c: c_2,
            normal: new G,
            materialIndex: 0
        };
        Yl.getNormal(ld, ud, dd, t.normal);
        u.face = t;
        u.barycoord = e;
    }
    return u;
}
const yd = new G;
const bd = new J;
const xd = new J;
const Sd = new G;
const Cd = new Y;
const wd = new G;
const Td = new bu;
const Ed = new Y;
const Dd = new rd;
export class Od extends gd {
    constructor(e, t){
        super(e, t);
        this.isSkinnedMesh = true;
        this.type = `SkinnedMesh`;
        this.bindMode = vo;
        this.bindMatrix = new Y;
        this.bindMatrixInverse = new Y;
        this.boundingBox = null;
        this.boundingSphere = null;
    }
    computeBoundingBox() {
        let geometry = this.geometry;
        if (this.boundingBox === null) {
            this.boundingBox = new Xl;
        }
        this.boundingBox.makeEmpty();
        let t = geometry.getAttribute(`position`);
        for(let e = 0; e < t.count; e++){
            this.getVertexPosition(e, wd);
            this.boundingBox.expandByPoint(wd);
        }
    }
    computeBoundingSphere() {
        let geometry = this.geometry;
        if (this.boundingSphere === null) {
            this.boundingSphere = new bu;
        }
        this.boundingSphere.makeEmpty();
        let t = geometry.getAttribute(`position`);
        for(let e = 0; e < t.count; e++){
            this.getVertexPosition(e, wd);
            this.boundingSphere.expandByPoint(wd);
        }
    }
    copy(e, t) {
        super.copy(e, t);
        this.bindMode = e.bindMode;
        this.bindMatrix.copy(e.bindMatrix);
        this.bindMatrixInverse.copy(e.bindMatrixInverse);
        this.skeleton = e.skeleton;
        if (e.boundingBox !== null) {
            this.boundingBox = e.boundingBox.clone();
        }
        if (e.boundingSphere !== null) {
            this.boundingSphere = e.boundingSphere.clone();
        }
        return this;
    }
    raycast(e, t) {
        let material = this.material;
        let matrixWorld = this.matrixWorld;
        if (material !== undefined) {
            if (this.boundingSphere === null) {
                this.computeBoundingSphere();
            }
            Td.copy(this.boundingSphere);
            Td.applyMatrix4(matrixWorld);
            if (e.ray.intersectsSphere(Td) !== false) {
                Ed.copy(matrixWorld).invert();
                Dd.copy(e.ray).applyMatrix4(Ed);
                if (!(this.boundingBox !== null && Dd.intersectsBox(this.boundingBox) === false)) {
                    this._computeIntersections(e, t, Dd);
                }
            }
        }
    }
    getVertexPosition(e, t) {
        super.getVertexPosition(e, t);
        this.applyBoneTransform(e, t);
        return t;
    }
    bind(e, t) {
        this.skeleton = e;
        if (t === undefined) {
            this.updateMatrixWorld(true);
            this.skeleton.calculateInverses();
            t = this.matrixWorld;
        }
        this.bindMatrix.copy(t);
        this.bindMatrixInverse.copy(t).invert();
    }
    pose() {
        this.skeleton.pose();
    }
    normalizeSkinWeights() {
        let e = new J;
        let skinWeight = this.geometry.attributes.skinWeight;
        for(let n = 0, r = skinWeight.count; n < r; n++){
            e.fromBufferAttribute(skinWeight, n);
            let r = 1 / e.manhattanLength();
            if (r === Infinity) {
                e.set(1, 0, 0, 0);
            } else {
                e.multiplyScalar(r);
            }
            skinWeight.setXYZW(n, e.x, e.y, e.z, e.w);
        }
    }
    updateMatrixWorld(e) {
        super.updateMatrixWorld(e);
        if (this.bindMode === `attached`) {
            this.bindMatrixInverse.copy(this.matrixWorld).invert();
        } else if (this.bindMode === `detached`) {
            this.bindMatrixInverse.copy(this.bindMatrix).invert();
        } else {
            B(`SkinnedMesh: Unrecognized bindMode: ` + this.bindMode);
        }
    }
    applyBoneTransform(e, t) {
        let skeleton = this.skeleton;
        let geometry = this.geometry;
        bd.fromBufferAttribute(geometry.attributes.skinIndex, e);
        xd.fromBufferAttribute(geometry.attributes.skinWeight, e);
        yd.copy(t).applyMatrix4(this.bindMatrix);
        t.set(0, 0, 0);
        for(let e = 0; e < 4; e++){
            let r = xd.getComponent(e);
            if (r !== 0) {
                let i = bd.getComponent(e);
                Cd.multiplyMatrices(skeleton.bones[i].matrixWorld, skeleton.boneInverses[i]);
                t.addScaledVector(Sd.copy(yd).applyMatrix4(Cd), r);
            }
        }
        return t.applyMatrix4(this.bindMatrixInverse);
    }
}
export class kd extends Tl {
    constructor(){
        super();
        this.isBone = true;
        this.type = `Bone`;
    }
}
export class Ad extends Jc {
    constructor(data = null, t = 1, n = 1, r, i, a, o, s, c = So, l = So, u, d){
        super(null, a, o, s, c, l, r, i, u, d);
        this.isDataTexture = true;
        this.image = {
            data,
            width: t,
            height: n
        };
        this.generateMipmaps = false;
        this.flipY = false;
        this.unpackAlignment = 1;
    }
}
const jd = new Y;
const Md = new Y;
export const Nd = class e {
    constructor(e = [], t = []){
        this.uuid = dc();
        this.bones = e.slice(0);
        this.boneInverses = t;
        this.boneMatrices = null;
        this.previousBoneMatrices = null;
        this.boneTexture = null;
        this.init();
    }
    init() {
        let bones = this.bones;
        let boneInverses = this.boneInverses;
        this.boneMatrices = new Float32Array(bones.length * 16);
        if (boneInverses.length === 0) {
            this.calculateInverses();
        } else if (bones.length !== boneInverses.length) {
            B(`Skeleton: Number of inverse bone matrices does not match amount of bones.`);
            this.boneInverses = [];
            for(let e = 0, t = this.bones.length; e < t; e++){
                this.boneInverses.push(new Y);
            }
        }
    }
    calculateInverses() {
        this.boneInverses.length = 0;
        for(let e = 0, t = this.bones.length; e < t; e++){
            let t = new Y;
            if (this.bones[e]) {
                t.copy(this.bones[e].matrixWorld).invert();
            }
            this.boneInverses.push(t);
        }
    }
    pose() {
        for(let e = 0, t = this.bones.length; e < t; e++){
            let bone = this.bones[e];
            if (bone) {
                bone.matrixWorld.copy(this.boneInverses[e]).invert();
            }
        }
        for(let e = 0, t = this.bones.length; e < t; e++){
            let bone = this.bones[e];
            if (bone) {
                if (bone.parent && bone.parent.isBone) {
                    bone.matrix.copy(bone.parent.matrixWorld).invert();
                    bone.matrix.multiply(bone.matrixWorld);
                } else {
                    bone.matrix.copy(bone.matrixWorld);
                }
                bone.matrix.decompose(bone.position, bone.quaternion, bone.scale);
            }
        }
    }
    update() {
        let bones = this.bones;
        let boneInverses = this.boneInverses;
        let boneMatrices = this.boneMatrices;
        let boneTexture = this.boneTexture;
        for(let r = 0, i = bones.length; r < i; r++){
            let i = bones[r] ? bones[r].matrixWorld : Md;
            jd.multiplyMatrices(i, boneInverses[r]);
            jd.toArray(boneMatrices, r * 16);
        }
        if (boneTexture !== null) {
            boneTexture.needsUpdate = true;
        }
    }
    clone() {
        return new e(this.bones, this.boneInverses);
    }
    computeBoneTexture() {
        let e = Math.sqrt(this.bones.length * 4);
        e = Math.ceil(e / 4) * 4;
        e = Math.max(e, 4);
        let t = new Float32Array(e * e * 4);
        t.set(this.boneMatrices);
        let n = new Ad(t, e, e, Uo, Po);
        n.needsUpdate = true;
        this.boneMatrices = t;
        this.boneTexture = n;
        return this;
    }
    getBoneByName(e) {
        for(let t = 0, n = this.bones.length; t < n; t++){
            let bone = this.bones[t];
            if (bone.name === e) {
                return bone;
            }
        }
    }
    dispose() {
        if (this.boneTexture !== null) {
            this.boneTexture.dispose();
            this.boneTexture = null;
        }
    }
    fromJSON(e, t) {
        this.uuid = e.uuid;
        for(let n = 0, r = e.bones.length; n < r; n++){
            let bone = e.bones[n];
            let i = t[bone];
            if (i === undefined) {
                B(`Skeleton: No bone found with UUID:`, bone);
                i = new kd;
            }
            this.bones.push(i);
            this.boneInverses.push(new Y().fromArray(e.boneInverses[n]));
        }
        this.init();
        return this;
    }
    toJSON() {
        let e = {
            metadata: {
                version: 4.7,
                type: `Skeleton`,
                generator: `Skeleton.toJSON`
            },
            bones: [],
            boneInverses: []
        };
        e.uuid = this.uuid;
        let bones = this.bones;
        let boneInverses = this.boneInverses;
        for(let r = 0, i = bones.length; r < i; r++){
            let bone = bones[r];
            e.bones.push(bone.uuid);
            let a = boneInverses[r];
            e.boneInverses.push(a.toArray());
        }
        return e;
    }
};
export class Pd extends mu {
    constructor(e, t, n, r = 1){
        super(e, t, n);
        this.isInstancedBufferAttribute = true;
        this.meshPerAttribute = r;
    }
    copy(e) {
        super.copy(e);
        this.meshPerAttribute = e.meshPerAttribute;
        return this;
    }
    toJSON() {
        let e = super.toJSON();
        e.meshPerAttribute = this.meshPerAttribute;
        e.isInstancedBufferAttribute = true;
        return e;
    }
}
const Fd = new Y;
const Id = new Y;
const Ld = [];
const Rd = new Xl;
const zd = new Y;
const Bd = new gd;
const Vd = new bu;
export class Hd extends gd {
    constructor(e, t, n){
        super(e, t);
        this.isInstancedMesh = true;
        this.instanceMatrix = new Pd(new Float32Array(n * 16), 16);
        this.previousInstanceMatrix = null;
        this.instanceColor = null;
        this.morphTexture = null;
        this.count = n;
        this.boundingBox = null;
        this.boundingSphere = null;
        for(let e = 0; e < n; e++){
            this.setMatrixAt(e, zd);
        }
    }
    computeBoundingBox() {
        let geometry = this.geometry;
        let count = this.count;
        if (this.boundingBox === null) {
            this.boundingBox = new Xl;
        }
        if (geometry.boundingBox === null) {
            geometry.computeBoundingBox();
        }
        this.boundingBox.makeEmpty();
        for(let n = 0; n < count; n++){
            this.getMatrixAt(n, Fd);
            Rd.copy(geometry.boundingBox).applyMatrix4(Fd);
            this.boundingBox.union(Rd);
        }
    }
    computeBoundingSphere() {
        let geometry = this.geometry;
        let count = this.count;
        if (this.boundingSphere === null) {
            this.boundingSphere = new bu;
        }
        if (geometry.boundingSphere === null) {
            geometry.computeBoundingSphere();
        }
        this.boundingSphere.makeEmpty();
        for(let n = 0; n < count; n++){
            this.getMatrixAt(n, Fd);
            Vd.copy(geometry.boundingSphere).applyMatrix4(Fd);
            this.boundingSphere.union(Vd);
        }
    }
    copy(e, t) {
        super.copy(e, t);
        this.instanceMatrix.copy(e.instanceMatrix);
        if (e.previousInstanceMatrix !== null) {
            this.previousInstanceMatrix = e.previousInstanceMatrix.clone();
        }
        if (e.morphTexture !== null) {
            this.morphTexture = e.morphTexture.clone();
        }
        if (e.instanceColor !== null) {
            this.instanceColor = e.instanceColor.clone();
        }
        this.count = e.count;
        if (e.boundingBox !== null) {
            this.boundingBox = e.boundingBox.clone();
        }
        if (e.boundingSphere !== null) {
            this.boundingSphere = e.boundingSphere.clone();
        }
        return this;
    }
    getColorAt(e, t) {
        t.fromArray(this.instanceColor.array, e * 3);
    }
    getMatrixAt(e, t) {
        t.fromArray(this.instanceMatrix.array, e * 16);
    }
    getMorphAt(e, { morphTargetInfluences }) {
        let data = this.morphTexture.source.data.data;
        let i = e * (morphTargetInfluences.length + 1) + 1;
        for(let e = 0; e < morphTargetInfluences.length; e++){
            morphTargetInfluences[e] = data[i + e];
        }
    }
    raycast(e, t) {
        let matrixWorld = this.matrixWorld;
        let count = this.count;
        Bd.geometry = this.geometry;
        Bd.material = this.material;
        if (Bd.material !== undefined && (this.boundingSphere === null && this.computeBoundingSphere(), Vd.copy(this.boundingSphere), Vd.applyMatrix4(matrixWorld), e.ray.intersectsSphere(Vd) !== false)) {
            for(let i = 0; i < count; i++){
                this.getMatrixAt(i, Fd);
                Id.multiplyMatrices(matrixWorld, Fd);
                Bd.matrixWorld = Id;
                Bd.raycast(e, Ld);
                for(let e = 0, n = Ld.length; e < n; e++){
                    let n = Ld[e];
                    n.instanceId = i;
                    n.object = this;
                    t.push(n);
                }
                Ld.length = 0;
            }
        }
    }
    setColorAt(e, t) {
        if (this.instanceColor === null) {
            this.instanceColor = new Pd(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3);
        }
        t.toArray(this.instanceColor.array, e * 3);
    }
    setMatrixAt(e, t) {
        t.toArray(this.instanceMatrix.array, e * 16);
    }
    setMorphAt(e, { morphTargetInfluences }) {
        let r = morphTargetInfluences.length + 1;
        if (this.morphTexture === null) {
            this.morphTexture = new Ad(new Float32Array(r * this.count), r, this.count, Ko, Po);
        }
        let data = this.morphTexture.source.data.data;
        let a = 0;
        for(let e = 0; e < morphTargetInfluences.length; e++){
            a += morphTargetInfluences[e];
        }
        let o = this.geometry.morphTargetsRelative ? 1 : 1 - a;
        let s = r * e;
        data[s] = o;
        data.set(morphTargetInfluences, s + 1);
    }
    updateMorphTargets() {}
    dispose() {
        this.dispatchEvent({
            type: `dispose`
        });
        if (this.morphTexture !== null) {
            this.morphTexture.dispose();
            this.morphTexture = null;
        }
    }
}
const Ud = new G;
const Wd = new G;
const Gd = new K;
export class Kd {
    constructor(e = new G(1, 0, 0), t = 0){
        this.isPlane = true;
        this.normal = e;
        this.constant = t;
    }
    set(e, t) {
        this.normal.copy(e);
        this.constant = t;
        return this;
    }
    setComponents(e, t, n, r) {
        this.normal.set(e, t, n);
        this.constant = r;
        return this;
    }
    setFromNormalAndCoplanarPoint(e, t) {
        this.normal.copy(e);
        this.constant = -t.dot(this.normal);
        return this;
    }
    setFromCoplanarPoints(e, t, n) {
        let r = Ud.subVectors(n, t).cross(Wd.subVectors(e, t)).normalize();
        this.setFromNormalAndCoplanarPoint(r, e);
        return this;
    }
    copy(e) {
        this.normal.copy(e.normal);
        this.constant = e.constant;
        return this;
    }
    normalize() {
        let e = 1 / this.normal.length();
        this.normal.multiplyScalar(e);
        this.constant *= e;
        return this;
    }
    negate() {
        this.constant *= -1;
        this.normal.negate();
        return this;
    }
    distanceToPoint(e) {
        return this.normal.dot(e) + this.constant;
    }
    distanceToSphere(e) {
        return this.distanceToPoint(e.center) - e.radius;
    }
    projectPoint(e, t) {
        return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
    }
    intersectLine(e, t) {
        let n = e.delta(Ud);
        let r = this.normal.dot(n);
        if (r === 0) {
            if (this.distanceToPoint(e.start) === 0) {
                return t.copy(e.start);
            }
            return null;
        }
        let i = -(e.start.dot(this.normal) + this.constant) / r;
        if (i < 0 || i > 1) {
            return null;
        }
        return t.copy(e.start).addScaledVector(n, i);
    }
    intersectsLine(e) {
        let t = this.distanceToPoint(e.start);
        let n = this.distanceToPoint(e.end);
        return t < 0 && n > 0 || n < 0 && t > 0;
    }
    intersectsBox(e) {
        return e.intersectsPlane(this);
    }
    intersectsSphere(e) {
        return e.intersectsPlane(this);
    }
    coplanarPoint(e) {
        return e.copy(this.normal).multiplyScalar(-this.constant);
    }
    applyMatrix4(e, t) {
        let n = t || Gd.getNormalMatrix(e);
        let r = this.coplanarPoint(Ud).applyMatrix4(e);
        let i = this.normal.applyMatrix3(n).normalize();
        this.constant = -r.dot(i);
        return this;
    }
    translate(e) {
        this.constant -= e.dot(this.normal);
        return this;
    }
    equals(e) {
        return e.normal.equals(this.normal) && e.constant === this.constant;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
const qd = new bu;
const Jd = new W(0.5, 0.5);
const Yd = new G;
export class Xd {
    constructor(e = new Kd, t = new Kd, n = new Kd, r = new Kd, i = new Kd, a = new Kd){
        this.planes = [
            e,
            t,
            n,
            r,
            i,
            a
        ];
    }
    set(e, t, n, r, i, a) {
        let planes = this.planes;
        planes[0].copy(e);
        planes[1].copy(t);
        planes[2].copy(n);
        planes[3].copy(r);
        planes[4].copy(i);
        planes[5].copy(a);
        return this;
    }
    copy(e) {
        let planes = this.planes;
        for(let n = 0; n < 6; n++){
            planes[n].copy(e.planes[n]);
        }
        return this;
    }
    setFromProjectionMatrix(e, t = Js, n = false) {
        let planes = this.planes;
        let e_elements = e.elements;
        let a = e_elements[0];
        let o = e_elements[1];
        let s = e_elements[2];
        let c = e_elements[3];
        let l = e_elements[4];
        let u = e_elements[5];
        let d = e_elements[6];
        let f = e_elements[7];
        let p = e_elements[8];
        let m = e_elements[9];
        let h = e_elements[10];
        let g = e_elements[11];
        let _ = e_elements[12];
        let v = e_elements[13];
        let y = e_elements[14];
        let b = e_elements[15];
        planes[0].setComponents(c - a, f - l, g - p, b - _).normalize();
        planes[1].setComponents(c + a, f + l, g + p, b + _).normalize();
        planes[2].setComponents(c + o, f + u, g + m, b + v).normalize();
        planes[3].setComponents(c - o, f - u, g - m, b - v).normalize();
        if (n) {
            planes[4].setComponents(s, d, h, y).normalize();
            planes[5].setComponents(c - s, f - d, g - h, b - y).normalize();
        } else {
            planes[4].setComponents(c - s, f - d, g - h, b - y).normalize();
            if (t === 2000) {
                planes[5].setComponents(c + s, f + d, g + h, b + y).normalize();
            } else if (t === 2001) {
                planes[5].setComponents(s, d, h, y).normalize();
            } else {
                throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: ` + t);
            }
        }
        return this;
    }
    intersectsObject(e) {
        if (e.boundingSphere !== undefined) {
            if (e.boundingSphere === null) {
                e.computeBoundingSphere();
            }
            qd.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
        } else {
            let t = e.geometry;
            if (t.boundingSphere === null) {
                t.computeBoundingSphere();
            }
            qd.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
        }
        return this.intersectsSphere(qd);
    }
    intersectsSprite(e) {
        qd.center.set(0, 0, 0);
        qd.radius = 0.7071067811865476 + Jd.distanceTo(e.center);
        qd.applyMatrix4(e.matrixWorld);
        return this.intersectsSphere(qd);
    }
    intersectsSphere(e) {
        let planes = this.planes;
        let e_center = e.center;
        let r = -e.radius;
        for(let e = 0; e < 6; e++){
            if (planes[e].distanceToPoint(e_center) < r) {
                return false;
            }
        }
        return true;
    }
    intersectsBox(e) {
        let planes = this.planes;
        for(let n = 0; n < 6; n++){
            let r = planes[n];
            Yd.x = r.normal.x > 0 ? e.max.x : e.min.x;
            Yd.y = r.normal.y > 0 ? e.max.y : e.min.y;
            Yd.z = r.normal.z > 0 ? e.max.z : e.min.z;
            if (r.distanceToPoint(Yd) < 0) {
                return false;
            }
        }
        return true;
    }
    containsPoint(e) {
        let planes = this.planes;
        for(let n = 0; n < 6; n++){
            if (planes[n].distanceToPoint(e) < 0) {
                return false;
            }
        }
        return true;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
export class Zd extends Nu {
    constructor(e){
        super();
        this.isLineBasicMaterial = true;
        this.type = `LineBasicMaterial`;
        this.color = new X(16777215);
        this.map = null;
        this.linewidth = 1;
        this.linecap = `round`;
        this.linejoin = `round`;
        this.fog = true;
        this.setValues(e);
    }
    copy(e) {
        super.copy(e);
        this.color.copy(e.color);
        this.map = e.map;
        this.linewidth = e.linewidth;
        this.linecap = e.linecap;
        this.linejoin = e.linejoin;
        this.fog = e.fog;
        return this;
    }
}
const Qd = new G;
const $d = new G;
const ef = new Y;
const tf = new rd;
const nf = new bu;
const rf = new G;
const af = new G;
export class of extends Tl {
    constructor(e = new Ou, t = new Zd){
        super();
        this.isLine = true;
        this.type = `Line`;
        this.geometry = e;
        this.material = t;
        this.morphTargetDictionary = undefined;
        this.morphTargetInfluences = undefined;
        this.updateMorphTargets();
    }
    copy(e, t) {
        super.copy(e, t);
        this.material = Array.isArray(e.material) ? e.material.slice() : e.material;
        this.geometry = e.geometry;
        return this;
    }
    computeLineDistances() {
        let geometry = this.geometry;
        if (geometry.index === null) {
            let t = geometry.attributes.position;
            let n = [
                0
            ];
            for(let e = 1, r = t.count; e < r; e++){
                Qd.fromBufferAttribute(t, e - 1);
                $d.fromBufferAttribute(t, e);
                n[e] = n[e - 1];
                n[e] += Qd.distanceTo($d);
            }
            geometry.setAttribute(`lineDistance`, new Z(n, 1));
        } else {
            B(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);
        }
        return this;
    }
    raycast(e, t) {
        let geometry = this.geometry;
        let matrixWorld = this.matrixWorld;
        let threshold = e.params.Line.threshold;
        let n_drawRange = geometry.drawRange;
        if (geometry.boundingSphere === null) {
            geometry.computeBoundingSphere();
        }
        nf.copy(geometry.boundingSphere);
        nf.applyMatrix4(matrixWorld);
        nf.radius += threshold;
        if (e.ray.intersectsSphere(nf) === false) {
            return;
        }
        ef.copy(matrixWorld).invert();
        tf.copy(e.ray).applyMatrix4(ef);
        let o = threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3);
        let s = o * o;
        let c = this.isLineSegments ? 2 : 1;
        let n_index = geometry.index;
        let position = geometry.attributes.position;
        if (n_index !== null) {
            let n = Math.max(0, n_drawRange.start);
            let r = Math.min(n_index.count, n_drawRange.start + n_drawRange.count);
            for(let i = n, a = r - 1; i < a; i += c){
                let n = n_index.getX(i);
                let r = n_index.getX(i + 1);
                let a = sf(this, e, tf, s, n, r, i);
                if (a) {
                    t.push(a);
                }
            }
            if (this.isLineLoop) {
                let i = n_index.getX(r - 1);
                let a = n_index.getX(n);
                let o = sf(this, e, tf, s, i, a, r - 1);
                if (o) {
                    t.push(o);
                }
            }
        } else {
            let n = Math.max(0, n_drawRange.start);
            let r = Math.min(position.count, n_drawRange.start + n_drawRange.count);
            for(let i = n, a = r - 1; i < a; i += c){
                let n = sf(this, e, tf, s, i, i + 1, i);
                if (n) {
                    t.push(n);
                }
            }
            if (this.isLineLoop) {
                let i = sf(this, e, tf, s, r - 1, n, r - 1);
                if (i) {
                    t.push(i);
                }
            }
        }
    }
    updateMorphTargets() {
        let morphAttributes = this.geometry.morphAttributes;
        let t = Object.keys(morphAttributes);
        if (t.length > 0) {
            let n = morphAttributes[t[0]];
            if (n !== undefined) {
                this.morphTargetInfluences = [];
                this.morphTargetDictionary = {};
                for(let e = 0, t = n.length; e < t; e++){
                    let t = n[e].name || String(e);
                    this.morphTargetInfluences.push(0);
                    this.morphTargetDictionary[t] = e;
                }
            }
        }
    }
}
function sf(e, t, n, r, i, a, o) {
    let position = e.geometry.attributes.position;
    Qd.fromBufferAttribute(position, i);
    $d.fromBufferAttribute(position, a);
    if (n.distanceSqToSegment(Qd, $d, rf, af) > r) {
        return;
    }
    rf.applyMatrix4(e.matrixWorld);
    let c = t.ray.origin.distanceTo(rf);
    if (!(c < t.near || c > t.far)) {
        return {
            distance: c,
            point: af.clone().applyMatrix4(e.matrixWorld),
            index: o,
            face: null,
            faceIndex: null,
            barycoord: null,
            object: e
        };
    }
}
const cf = new G;
const lf = new G;
export class uf extends of {
    constructor(e, t){
        super(e, t);
        this.isLineSegments = true;
        this.type = `LineSegments`;
    }
    computeLineDistances() {
        let geometry = this.geometry;
        if (geometry.index === null) {
            let t = geometry.attributes.position;
            let n = [];
            for(let e = 0, r = t.count; e < r; e += 2){
                cf.fromBufferAttribute(t, e);
                lf.fromBufferAttribute(t, e + 1);
                n[e] = e === 0 ? 0 : n[e - 1];
                n[e + 1] = n[e] + cf.distanceTo(lf);
            }
            geometry.setAttribute(`lineDistance`, new Z(n, 1));
        } else {
            B(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);
        }
        return this;
    }
}
export class df extends of {
    constructor(e, t){
        super(e, t);
        this.isLineLoop = true;
        this.type = `LineLoop`;
    }
}
export class ff extends Nu {
    constructor(e){
        super();
        this.isPointsMaterial = true;
        this.type = `PointsMaterial`;
        this.color = new X(16777215);
        this.map = null;
        this.alphaMap = null;
        this.size = 1;
        this.sizeAttenuation = true;
        this.fog = true;
        this.setValues(e);
    }
    copy(e) {
        super.copy(e);
        this.color.copy(e.color);
        this.map = e.map;
        this.alphaMap = e.alphaMap;
        this.size = e.size;
        this.sizeAttenuation = e.sizeAttenuation;
        this.fog = e.fog;
        return this;
    }
}
const pf = new Y;
const mf = new rd;
const hf = new bu;
const gf = new G;
export class _f extends Tl {
    constructor(e = new Ou, t = new ff){
        super();
        this.isPoints = true;
        this.type = `Points`;
        this.geometry = e;
        this.material = t;
        this.morphTargetDictionary = undefined;
        this.morphTargetInfluences = undefined;
        this.updateMorphTargets();
    }
    copy(e, t) {
        super.copy(e, t);
        this.material = Array.isArray(e.material) ? e.material.slice() : e.material;
        this.geometry = e.geometry;
        return this;
    }
    raycast(e, t) {
        let geometry = this.geometry;
        let matrixWorld = this.matrixWorld;
        let threshold = e.params.Points.threshold;
        let n_drawRange = geometry.drawRange;
        if (geometry.boundingSphere === null) {
            geometry.computeBoundingSphere();
        }
        hf.copy(geometry.boundingSphere);
        hf.applyMatrix4(matrixWorld);
        hf.radius += threshold;
        if (e.ray.intersectsSphere(hf) === false) {
            return;
        }
        pf.copy(matrixWorld).invert();
        mf.copy(e.ray).applyMatrix4(pf);
        let o = threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3);
        let s = o * o;
        let n_index = geometry.index;
        let position = geometry.attributes.position;
        if (n_index !== null) {
            let n = Math.max(0, n_drawRange.start);
            let i = Math.min(n_index.count, n_drawRange.start + n_drawRange.count);
            for(let a = n, o = i; a < o; a++){
                let n = n_index.getX(a);
                gf.fromBufferAttribute(position, n);
                vf(gf, n, s, matrixWorld, e, t, this);
            }
        } else {
            let n = Math.max(0, n_drawRange.start);
            let i = Math.min(position.count, n_drawRange.start + n_drawRange.count);
            for(let a = n, o = i; a < o; a++){
                gf.fromBufferAttribute(position, a);
                vf(gf, a, s, matrixWorld, e, t, this);
            }
        }
    }
    updateMorphTargets() {
        let morphAttributes = this.geometry.morphAttributes;
        let t = Object.keys(morphAttributes);
        if (t.length > 0) {
            let n = morphAttributes[t[0]];
            if (n !== undefined) {
                this.morphTargetInfluences = [];
                this.morphTargetDictionary = {};
                for(let e = 0, t = n.length; e < t; e++){
                    let t = n[e].name || String(e);
                    this.morphTargetInfluences.push(0);
                    this.morphTargetDictionary[t] = e;
                }
            }
        }
    }
}
function vf(e, t, n, matrixWorld, i, a, object) {
    let s = mf.distanceSqToPoint(e);
    if (s < n) {
        let point = new G;
        mf.closestPointToPoint(e, point);
        point.applyMatrix4(matrixWorld);
        let c = i.ray.origin.distanceTo(point);
        if (c < i.near || c > i.far) {
            return;
        }
        a.push({
            distance: c,
            distanceToRay: Math.sqrt(s),
            point,
            index: t,
            face: null,
            faceIndex: null,
            barycoord: null,
            object
        });
    }
}
export class yf extends Jc {
    constructor(e = [], t = 301, n, r, i, a, o, s, c, l){
        super(e, t, n, r, i, a, o, s, c, l);
        this.isCubeTexture = true;
        this.flipY = false;
    }
    get images() {
        return this.image;
    }
    set images(e) {
        this.image = e;
    }
}
export class bf extends Jc {
    constructor(e, t, n, r, i, a, o, s, c){
        super(e, t, n, r, i, a, o, s, c);
        this.isCanvasTexture = true;
        this.needsUpdate = true;
    }
}
export class xf extends Jc {
    constructor(e, t, n = No, r, i, a, o = So, s = So, c, l = Wo, depth = 1){
        if (l !== 1026 && l !== 1027) {
            throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);
        }
        super({
            width: e,
            height: t,
            depth
        }, r, i, a, o, s, l, n, c);
        this.isDepthTexture = true;
        this.flipY = false;
        this.generateMipmaps = false;
        this.compareFunction = null;
    }
    copy(e) {
        super.copy(e);
        this.source = new Wc({
            ...e.image
        });
        this.compareFunction = e.compareFunction;
        return this;
    }
    toJSON(e) {
        let t = super.toJSON(e);
        if (this.compareFunction !== null) {
            t.compareFunction = this.compareFunction;
        }
        return t;
    }
}
export class Sf extends xf {
    constructor(e, t = No, n = 301, r, i, a = So, o = So, s, c = Wo){
        let l = {
            width: e,
            height: e,
            depth: 1
        };
        let u = [
            l,
            l,
            l,
            l,
            l,
            l
        ];
        super(e, e, t, n, r, i, a, o, s, c);
        this.image = u;
        this.isCubeDepthTexture = true;
        this.isCubeTexture = true;
    }
    get images() {
        return this.image;
    }
    set images(e) {
        this.image = e;
    }
}
export class Cf extends Jc {
    constructor(e = null){
        super();
        this.sourceTexture = e;
        this.isExternalTexture = true;
    }
    copy(e) {
        super.copy(e);
        this.sourceTexture = e.sourceTexture;
        return this;
    }
}
export const wf = class e extends Ou {
    constructor(e = 1, t = 1, depth = 1, r = 1, i = 1, depthSegments = 1){
        super();
        this.type = `BoxGeometry`;
        this.parameters = {
            width: e,
            height: t,
            depth,
            widthSegments: r,
            heightSegments: i,
            depthSegments
        };
        let o = this;
        r = Math.floor(r);
        i = Math.floor(i);
        depthSegments = Math.floor(depthSegments);
        let s = [];
        let c = [];
        let l = [];
        let u = [];
        let d = 0;
        let f = 0;
        p(`z`, `y`, `x`, -1, -1, depth, t, e, depthSegments, i, 0);
        p(`z`, `y`, `x`, 1, -1, depth, t, -e, depthSegments, i, 1);
        p(`x`, `z`, `y`, 1, 1, e, depth, t, r, depthSegments, 2);
        p(`x`, `z`, `y`, 1, -1, e, depth, -t, r, depthSegments, 3);
        p(`x`, `y`, `z`, 1, -1, e, t, depth, r, i, 4);
        p(`x`, `y`, `z`, -1, -1, e, t, -depth, r, i, 5);
        this.setIndex(s);
        this.setAttribute(`position`, new Z(c, 3));
        this.setAttribute(`normal`, new Z(l, 3));
        this.setAttribute(`uv`, new Z(u, 2));
        function p(e, t, n, r, i, a, p, m, h, g, _) {
            let v = a / h;
            let y = p / g;
            let b = a / 2;
            let x = p / 2;
            let S = m / 2;
            let C = h + 1;
            let w = g + 1;
            let T = 0;
            let E = 0;
            let D = new G;
            for(let a = 0; a < w; a++){
                let o = a * y - x;
                for(let s = 0; s < C; s++){
                    D[e] = (s * v - b) * r;
                    D[t] = o * i;
                    D[n] = S;
                    c.push(D.x, D.y, D.z);
                    D[e] = 0;
                    D[t] = 0;
                    D[n] = m > 0 ? 1 : -1;
                    l.push(D.x, D.y, D.z);
                    u.push(s / h);
                    u.push(1 - a / g);
                    T += 1;
                }
            }
            for(let e = 0; e < g; e++){
                for(let t = 0; t < h; t++){
                    let n = d + t + C * e;
                    let r = d + t + C * (e + 1);
                    let i = d + (t + 1) + C * (e + 1);
                    let a = d + (t + 1) + C * e;
                    s.push(n, r, a);
                    s.push(r, i, a);
                    E += 6;
                }
            }
            o.addGroup(f, E, _);
            f += E;
            d += T;
        }
    }
    copy(e) {
        super.copy(e);
        this.parameters = {
            ...e.parameters
        };
        return this;
    }
    static fromJSON(t) {
        return new e(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
    }
};
export const Tf = class e extends Ou {
    constructor(e = 1, segments = 32, n = 0, r = Math.PI * 2){
        super();
        this.type = `CircleGeometry`;
        this.parameters = {
            radius: e,
            segments,
            thetaStart: n,
            thetaLength: r
        };
        segments = Math.max(3, segments);
        let i = [];
        let a = [];
        let o = [];
        let s = [];
        let c = new G;
        let l = new W;
        a.push(0, 0, 0);
        o.push(0, 0, 1);
        s.push(0.5, 0.5);
        for(let i = 0, u = 3; i <= segments; i++, u += 3){
            let d = n + i / segments * r;
            c.x = e * Math.cos(d);
            c.y = e * Math.sin(d);
            a.push(c.x, c.y, c.z);
            o.push(0, 0, 1);
            l.x = (a[u] / e + 1) / 2;
            l.y = (a[u + 1] / e + 1) / 2;
            s.push(l.x, l.y);
        }
        for(let e = 1; e <= segments; e++){
            i.push(e, e + 1, 0);
        }
        this.setIndex(i);
        this.setAttribute(`position`, new Z(a, 3));
        this.setAttribute(`normal`, new Z(o, 3));
        this.setAttribute(`uv`, new Z(s, 2));
    }
    copy(e) {
        super.copy(e);
        this.parameters = {
            ...e.parameters
        };
        return this;
    }
    static fromJSON(t) {
        return new e(t.radius, t.segments, t.thetaStart, t.thetaLength);
    }
};
const Ef = class e extends Ou {
    constructor(radiusTop = 1, radiusBottom = 1, n = 1, r = 32, i = 1, a = false, o = 0, s = Math.PI * 2){
        super();
        this.type = `CylinderGeometry`;
        this.parameters = {
            radiusTop,
            radiusBottom,
            height: n,
            radialSegments: r,
            heightSegments: i,
            openEnded: a,
            thetaStart: o,
            thetaLength: s
        };
        let c = this;
        r = Math.floor(r);
        i = Math.floor(i);
        let l = [];
        let u = [];
        let d = [];
        let f = [];
        let p = 0;
        let m = [];
        let h = n / 2;
        let g = 0;
        _();
        if (a === false) {
            if (radiusTop > 0) {
                v(true);
            }
            if (radiusBottom > 0) {
                v(false);
            }
        }
        this.setIndex(l);
        this.setAttribute(`position`, new Z(u, 3));
        this.setAttribute(`normal`, new Z(d, 3));
        this.setAttribute(`uv`, new Z(f, 2));
        function _() {
            let a = new G;
            let _ = new G;
            let v = 0;
            let y = (radiusBottom - radiusTop) / n;
            for(let c = 0; c <= i; c++){
                let l = [];
                let g = c / i;
                let v = g * (radiusBottom - radiusTop) + radiusTop;
                for(let e = 0; e <= r; e++){
                    let t = e / r;
                    let i = t * s + o;
                    let c = Math.sin(i);
                    let m = Math.cos(i);
                    _.x = v * c;
                    _.y = -g * n + h;
                    _.z = v * m;
                    u.push(_.x, _.y, _.z);
                    a.set(c, y, m).normalize();
                    d.push(a.x, a.y, a.z);
                    f.push(t, 1 - g);
                    l.push(p++);
                }
                m.push(l);
            }
            for(let n = 0; n < r; n++){
                for(let r = 0; r < i; r++){
                    let a = m[r][n];
                    let o = m[r + 1][n];
                    let s = m[r + 1][n + 1];
                    let c = m[r][n + 1];
                    if (radiusTop > 0 || r !== 0) {
                        l.push(a, o, c);
                        v += 3;
                    }
                    if (radiusBottom > 0 || r !== i - 1) {
                        l.push(o, s, c);
                        v += 3;
                    }
                }
            }
            c.addGroup(g, v, 0);
            g += v;
        }
        function v(n) {
            let i = p;
            let a = new W;
            let m = new G;
            let _ = 0;
            let v = n === true ? radiusTop : radiusBottom;
            let y = n === true ? 1 : -1;
            for(let e = 1; e <= r; e++){
                u.push(0, h * y, 0);
                d.push(0, y, 0);
                f.push(0.5, 0.5);
                p++;
            }
            let b = p;
            for(let e = 0; e <= r; e++){
                let t = e / r * s + o;
                let n = Math.cos(t);
                let i = Math.sin(t);
                m.x = v * i;
                m.y = h * y;
                m.z = v * n;
                u.push(m.x, m.y, m.z);
                d.push(0, y, 0);
                a.x = n * 0.5 + 0.5;
                a.y = i * 0.5 * y + 0.5;
                f.push(a.x, a.y);
                p++;
            }
            for(let e = 0; e < r; e++){
                let t = i + e;
                let r = b + e;
                if (n === true) {
                    l.push(r, r + 1, t);
                } else {
                    l.push(r + 1, r, t);
                }
                _ += 3;
            }
            c.addGroup(g, _, n === true ? 1 : 2);
            g += _;
        }
    }
    copy(e) {
        super.copy(e);
        this.parameters = {
            ...e.parameters
        };
        return this;
    }
    static fromJSON(t) {
        return new e(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
    }
};
export const Df = class e extends Ef {
    constructor(e = 1, t = 1, n = 32, r = 1, i = false, a = 0, o = Math.PI * 2){
        super(0, e, t, n, r, i, a, o);
        this.type = `ConeGeometry`;
        this.parameters = {
            radius: e,
            height: t,
            radialSegments: n,
            heightSegments: r,
            openEnded: i,
            thetaStart: a,
            thetaLength: o
        };
    }
    static fromJSON(t) {
        return new e(t.radius, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
    }
};
const Of = new G;
const kf = new G;
const Af = new G;
const jf = new Yl;
export class Mf extends Ou {
    constructor(e = null, thresholdAngle = 1){
        super();
        this.type = `EdgesGeometry`;
        this.parameters = {
            geometry: e,
            thresholdAngle
        };
        if (e !== null) {
            let n = 10 ** 4;
            let r = Math.cos(lc * thresholdAngle);
            let i = e.getIndex();
            let a = e.getAttribute(`position`);
            let o = i ? i.count : a.count;
            let s = [
                0,
                0,
                0
            ];
            let c = [
                `a`,
                `b`,
                `c`
            ];
            let l = [
                ,
                ,
                , 
            ];
            let u = {};
            let d = [];
            for(let e = 0; e < o; e += 3){
                if (i) {
                    s[0] = i.getX(e);
                    s[1] = i.getX(e + 1);
                    s[2] = i.getX(e + 2);
                } else {
                    s[0] = e;
                    s[1] = e + 1;
                    s[2] = e + 2;
                }
                let { a: a_1, b, c: c_1 } = jf;
                a_1.fromBufferAttribute(a, s[0]);
                b.fromBufferAttribute(a, s[1]);
                c_1.fromBufferAttribute(a, s[2]);
                jf.getNormal(Af);
                l[0] = `${Math.round(a_1.x * n)},${Math.round(a_1.y * n)},${Math.round(a_1.z * n)}`;
                l[1] = `${Math.round(b.x * n)},${Math.round(b.y * n)},${Math.round(b.z * n)}`;
                l[2] = `${Math.round(c_1.x * n)},${Math.round(c_1.y * n)},${Math.round(c_1.z * n)}`;
                if (!(l[0] === l[1] || l[1] === l[2] || l[2] === l[0])) {
                    for(let e = 0; e < 3; e++){
                        let t = (e + 1) % 3;
                        let n = l[e];
                        let i = l[t];
                        let a = jf[c[e]];
                        let o = jf[c[t]];
                        let f = `${n}_${i}`;
                        let p = `${i}_${n}`;
                        if (p in u && u[p]) {
                            if (Af.dot(u[p].normal) <= r) {
                                d.push(a.x, a.y, a.z);
                                d.push(o.x, o.y, o.z);
                            }
                            u[p] = null;
                        } else if (!(f in u)) {
                            u[f] = {
                                index0: s[e],
                                index1: s[t],
                                normal: Af.clone()
                            };
                        }
                    }
                }
            }
            for(let e in u){
                if (u[e]) {
                    let { index0, index1 } = u[e];
                    Of.fromBufferAttribute(a, index0);
                    kf.fromBufferAttribute(a, index1);
                    d.push(Of.x, Of.y, Of.z);
                    d.push(kf.x, kf.y, kf.z);
                }
            }
            this.setAttribute(`position`, new Z(d, 3));
        }
    }
    copy(e) {
        super.copy(e);
        this.parameters = {
            ...e.parameters
        };
        return this;
    }
}
export const Nf = class e extends Ou {
    constructor(e = 1, t = 1, n = 1, r = 1){
        super();
        this.type = `PlaneGeometry`;
        this.parameters = {
            width: e,
            height: t,
            widthSegments: n,
            heightSegments: r
        };
        let i = e / 2;
        let a = t / 2;
        let o = Math.floor(n);
        let s = Math.floor(r);
        let c = o + 1;
        let l = s + 1;
        let u = e / o;
        let d = t / s;
        let f = [];
        let p = [];
        let m = [];
        let h = [];
        for(let e = 0; e < l; e++){
            let t = e * d - a;
            for(let n = 0; n < c; n++){
                let r = n * u - i;
                p.push(r, -t, 0);
                m.push(0, 0, 1);
                h.push(n / o);
                h.push(1 - e / s);
            }
        }
        for(let e = 0; e < s; e++){
            for(let t = 0; t < o; t++){
                let n = t + c * e;
                let r = t + c * (e + 1);
                let i = t + 1 + c * (e + 1);
                let a = t + 1 + c * e;
                f.push(n, r, a);
                f.push(r, i, a);
            }
        }
        this.setIndex(f);
        this.setAttribute(`position`, new Z(p, 3));
        this.setAttribute(`normal`, new Z(m, 3));
        this.setAttribute(`uv`, new Z(h, 2));
    }
    copy(e) {
        super.copy(e);
        this.parameters = {
            ...e.parameters
        };
        return this;
    }
    static fromJSON(t) {
        return new e(t.width, t.height, t.widthSegments, t.heightSegments);
    }
};
export const Pf = class e extends Ou {
    constructor(innerRadius = 0.5, outerRadius = 1, thetaSegments = 32, phiSegments = 1, i = 0, a = Math.PI * 2){
        super();
        this.type = `RingGeometry`;
        this.parameters = {
            innerRadius,
            outerRadius,
            thetaSegments,
            phiSegments,
            thetaStart: i,
            thetaLength: a
        };
        thetaSegments = Math.max(3, thetaSegments);
        phiSegments = Math.max(1, phiSegments);
        let o = [];
        let s = [];
        let c = [];
        let l = [];
        let u = innerRadius;
        let d = (outerRadius - innerRadius) / phiSegments;
        let f = new G;
        let p = new W;
        for(let e = 0; e <= phiSegments; e++){
            for(let e = 0; e <= thetaSegments; e++){
                let r = i + e / thetaSegments * a;
                f.x = u * Math.cos(r);
                f.y = u * Math.sin(r);
                s.push(f.x, f.y, f.z);
                c.push(0, 0, 1);
                p.x = (f.x / outerRadius + 1) / 2;
                p.y = (f.y / outerRadius + 1) / 2;
                l.push(p.x, p.y);
            }
            u += d;
        }
        for(let e = 0; e < phiSegments; e++){
            let t = e * (thetaSegments + 1);
            for(let e = 0; e < thetaSegments; e++){
                let r = e + t;
                let i = r;
                let a = r + thetaSegments + 1;
                let s = r + thetaSegments + 2;
                let c = r + 1;
                o.push(i, a, c);
                o.push(a, s, c);
            }
        }
        this.setIndex(o);
        this.setAttribute(`position`, new Z(s, 3));
        this.setAttribute(`normal`, new Z(c, 3));
        this.setAttribute(`uv`, new Z(l, 2));
    }
    copy(e) {
        super.copy(e);
        this.parameters = {
            ...e.parameters
        };
        return this;
    }
    static fromJSON(t) {
        return new e(t.innerRadius, t.outerRadius, t.thetaSegments, t.phiSegments, t.thetaStart, t.thetaLength);
    }
};
export const Ff = class e extends Ou {
    constructor(e = 1, t = 32, n = 16, phiStart = 0, phiLength = Math.PI * 2, a = 0, o = Math.PI){
        super();
        this.type = `SphereGeometry`;
        this.parameters = {
            radius: e,
            widthSegments: t,
            heightSegments: n,
            phiStart,
            phiLength,
            thetaStart: a,
            thetaLength: o
        };
        t = Math.max(3, Math.floor(t));
        n = Math.max(2, Math.floor(n));
        let s = Math.min(a + o, Math.PI);
        let c = 0;
        let l = [];
        let u = new G;
        let d = new G;
        let f = [];
        let p = [];
        let m = [];
        let h = [];
        for(let f = 0; f <= n; f++){
            let g = [];
            let _ = f / n;
            let v = 0;
            if (f === 0 && a === 0) {
                v = 0.5 / t;
            } else if (f === n && s === Math.PI) {
                v = -0.5 / t;
            }
            for(let n = 0; n <= t; n++){
                let s = n / t;
                u.x = -e * Math.cos(phiStart + s * phiLength) * Math.sin(a + _ * o);
                u.y = e * Math.cos(a + _ * o);
                u.z = e * Math.sin(phiStart + s * phiLength) * Math.sin(a + _ * o);
                p.push(u.x, u.y, u.z);
                d.copy(u).normalize();
                m.push(d.x, d.y, d.z);
                h.push(s + v, 1 - _);
                g.push(c++);
            }
            l.push(g);
        }
        for(let e = 0; e < n; e++){
            for(let r = 0; r < t; r++){
                let t = l[e][r + 1];
                let i = l[e][r];
                let o = l[e + 1][r];
                let c = l[e + 1][r + 1];
                if (e !== 0 || a > 0) {
                    f.push(t, i, c);
                }
                if (e !== n - 1 || s < Math.PI) {
                    f.push(i, o, c);
                }
            }
        }
        this.setIndex(f);
        this.setAttribute(`position`, new Z(p, 3));
        this.setAttribute(`normal`, new Z(m, 3));
        this.setAttribute(`uv`, new Z(h, 2));
    }
    copy(e) {
        super.copy(e);
        this.parameters = {
            ...e.parameters
        };
        return this;
    }
    static fromJSON(t) {
        return new e(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
    }
};
export class If extends Ou {
    constructor(e = null){
        super();
        this.type = `WireframeGeometry`;
        this.parameters = {
            geometry: e
        };
        if (e !== null) {
            let t = [];
            let n = new Set;
            let r = new G;
            let i = new G;
            if (e.index !== null) {
                let a = e.attributes.position;
                let o = e.index;
                let s = e.groups;
                if (s.length === 0) {
                    s = [
                        {
                            start: 0,
                            count: o.count,
                            materialIndex: 0
                        }
                    ];
                }
                for(let e = 0, c = s.length; e < c; ++e){
                    let c = s[e];
                    let l = c.start;
                    let u = c.count;
                    for(let e = l, s = l + u; e < s; e += 3){
                        for(let s = 0; s < 3; s++){
                            let c = o.getX(e + s);
                            let l = o.getX(e + (s + 1) % 3);
                            r.fromBufferAttribute(a, c);
                            i.fromBufferAttribute(a, l);
                            if (Lf(r, i, n) === true) {
                                t.push(r.x, r.y, r.z);
                                t.push(i.x, i.y, i.z);
                            }
                        }
                    }
                }
            } else {
                let a = e.attributes.position;
                for(let e = 0, o = a.count / 3; e < o; e++){
                    for(let o = 0; o < 3; o++){
                        let s = 3 * e + o;
                        let c = 3 * e + (o + 1) % 3;
                        r.fromBufferAttribute(a, s);
                        i.fromBufferAttribute(a, c);
                        if (Lf(r, i, n) === true) {
                            t.push(r.x, r.y, r.z);
                            t.push(i.x, i.y, i.z);
                        }
                    }
                }
            }
            this.setAttribute(`position`, new Z(t, 3));
        }
    }
    copy(e) {
        super.copy(e);
        this.parameters = {
            ...e.parameters
        };
        return this;
    }
}
function Lf(e, t, n) {
    let r = `${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`;
    let i = `${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;
    if (n.has(r) === true || n.has(i) === true) {
        return false;
    }
    n.add(r);
    n.add(i);
    return true;
}
