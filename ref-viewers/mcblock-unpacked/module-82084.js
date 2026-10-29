import { gw } from "./module-45723.js";
import { Hj, r6 } from "./module-19023.js";
import { I } from "./module-39080.js";
import { Tl, Z8, eL, hs, vt } from "./module-85250.js";
import { DF } from "./module-97633.js";
import { V } from "./module-73475.js";
import { e as e_1 } from "./module-31206.js";
import "./module-16947.js";
import "./module-29169.js";
import "./module-47795.js";
import "./module-19881.js";
import "./module-63281.js";
import "./module-94619.js";
import "./module-99498.js";
import "./module-40302.js";
export { I as IM } from "./module-39080.js";
export { z as zg } from "./module-29849.js";
export { IX } from "./module-45723.js";
export { OP } from "./module-45723.js";
export { gw } from "./module-45723.js";
export { LM } from "./module-13402.js";
export { e } from "./module-31206.js";
export { zj as SG } from "./module-23273.js";
export { EU } from "./module-23273.js";
export { GJ } from "./module-23273.js";
export { QU } from "./module-23273.js";
export { TD } from "./module-23273.js";
export { Nt } from "./module-23273.js";
export { QT } from "./module-23273.js";
export { PP } from "./module-23273.js";
export { Jp } from "./module-23273.js";
export { l0 } from "./module-23273.js";
export { Uq } from "./module-23273.js";
export { pT } from "./module-23273.js";
export { Gz } from "./module-23273.js";
export { t$ } from "./module-23273.js";
export { k as kO } from "./module-3420.js";
export { y as y6 } from "./module-21337.js";
export { Mi } from "./module-19023.js";
export { L as Li } from "./module-98169.js";
export class Ts {
    variants;
    multipart;
    constructor(t, e){
        this.variants = t;
        this.multipart = e;
    }
    getModelVariants(t) {
        if (this.variants) {
            let e = Object.keys(this.variants).filter((e)=>this.matchesVariant(e, t));
            if (e.length === 0) {
                return [];
            }
            let r = this.variants[e[0]];
            return [
                Array.isArray(r) ? r[0] : r
            ];
        }
        if (this.multipart) {
            return this.multipart.filter((e)=>!e.when || this.matchesCase(e.when, t)).map((t)=>{
                if (Array.isArray(t.apply)) {
                    return t.apply[0];
                }
                return t.apply;
            });
        }
        return [];
    }
    getMesh(t, e, r, a, i) {
        let c = this.getModelVariants(e);
        let f = new e_1;
        for (let h of c){
            let c = V.rotate(i, h.x ?? 0, h.y ?? 0);
            let g = a.getBlockModel(gw.parse(h.model));
            if (!g) {
                throw Error(`Cannot find block model ${h.model}`);
            }
            let p = t ? I[t.path]?.(e) : undefined;
            let d = g.getMesh(r, c, p);
            if (h.x || h.y) {
                let t = vt();
                Tl(t, t, [
                    8,
                    8,
                    8
                ]);
                Z8(t, t, -DF(h.y ?? 0));
                eL(t, t, -DF(h.x ?? 0));
                Tl(t, t, [
                    -8,
                    -8,
                    -8
                ]);
                d.transform(t);
            }
            f.merge(d);
        }
        let g = vt();
        hs(g, g, [
            0.0625,
            0.0625,
            0.0625
        ]);
        return f.transform(g);
    }
    matchesVariant(t, e) {
        return t.split(",").every((t)=>{
            let [r, n] = t.split("=");
            return e[r] === n;
        });
    }
    matchesCase(t, e) {
        if (Array.isArray(t.OR)) {
            return t.OR.some((t)=>this.matchesCase(t, e));
        }
        if (Array.isArray(t.AND)) {
            return t.AND.every((t)=>this.matchesCase(t, e));
        }
        if (Array.isArray(t.AND)) {
            return t.AND.every((t)=>this.matchesCase(t, e));
        }
        return Object.keys(t).every((r)=>t[r].split("|").includes(e[r]));
    }
    static fromJson(t) {
        return new Ts(t.variants, t.multipart);
    }
}
export class Lw {
    img;
    idMap;
    part;
    constructor(t, e){
        this.img = t;
        this.idMap = e;
        if (!r6(t.width) || !r6(t.height)) {
            throw Error(`Expected texture atlas dimensions to be powers of two, got ${t.width}x${t.height}.`);
        }
        this.part = 16 / t.width;
    }
    getTextureAtlas() {
        return this.img;
    }
    getTextureUV(t) {
        return this.idMap[t.toString()] ?? [
            0,
            0,
            this.part,
            this.part
        ];
    }
    getPixelSize() {
        return this.part / 16;
    }
    static async fromBlobs(t) {
        let e = Math.sqrt(Object.keys(t).length + 1);
        let r = Hj(e);
        let n = 16 * r;
        let i = 1 / r;
        let s = document.createElement("canvas");
        s.width = n;
        s.height = n;
        let l = s.getContext("2d");
        this.drawInvalidTexture(l);
        let u = {};
        let o = 1;
        await Promise.all(Object.keys(t).map(async (e)=>{
            let n = o % r;
            let a = Math.floor(o / r);
            o += 1;
            u[e] = [
                i * n,
                i * a,
                i * n + i,
                i * a + i
            ];
            let s = await createImageBitmap(t[e]);
            l.drawImage(s, 0, 0, 16, 16, 16 * n, 16 * a, 16, 16);
        }));
        return new Lw(l.getImageData(0, 0, n, n), u);
    }
    static empty() {
        let t = document.createElement("canvas");
        t.width = 16;
        t.height = 16;
        let e = t.getContext("2d");
        Lw.drawInvalidTexture(e);
        return new Lw(e.getImageData(0, 0, 16, 16), {});
    }
    static drawInvalidTexture(t) {
        t.fillStyle = "black";
        t.fillRect(0, 0, 16, 16);
        t.fillStyle = "magenta";
        t.fillRect(0, 0, 8, 8);
        t.fillRect(8, 8, 8, 8);
    }
}
