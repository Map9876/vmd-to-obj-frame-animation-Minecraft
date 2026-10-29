import { GJx, I9Y, Q1f, Tap, Y9S, aHM, er$, hB5, h_9, ppV, r6x, tXL } from "./module-85339.js";
export class V extends aHM {
    constructor(e){
        super(e);
    }
    load(e, t, s, r) {
        let a = this;
        let o = this.path === "" ? r6x.extractUrlBase(e) : this.path;
        let n = new Y9S(this.manager);
        n.setPath(this.path);
        n.setRequestHeader(this.requestHeader);
        n.setWithCredentials(this.withCredentials);
        n.load(e, function(s) {
            try {
                t(a.parse(s, o));
            } catch (error) {
                if (r) {
                    r(error);
                } else {
                    console.error(error);
                }
                a.manager.itemError(e);
            }
        }, s, r);
    }
    setMaterialOptions(e) {
        this.materialOptions = e;
        return this;
    }
    parse(e, t) {
        let s = e.split("\n");
        let i = {};
        let r = /\s+/;
        let o = {};
        for (let t of s){
            if ((t = t.trim()).length === 0 || t.charAt(0) === "#") {
                continue;
            }
            let a = t.indexOf(" ");
            let n = a >= 0 ? t.substring(0, a) : t;
            n = n.toLowerCase();
            let l = a >= 0 ? t.substring(a + 1) : "";
            l = l.trim();
            if (n === "newmtl") {
                i = {
                    name: l
                };
                o[l] = i;
            } else if (n === "ka" || n === "kd" || n === "ks" || n === "ke") {
                let e = l.split(r, 3);
                i[n] = [
                    parseFloat(e[0]),
                    parseFloat(e[1]),
                    parseFloat(e[2])
                ];
            } else {
                i[n] = l;
            }
        }
        let n = new a(this.resourcePath || t, this.materialOptions);
        n.setCrossOrigin(this.crossOrigin);
        n.setManager(this.manager);
        n.setMaterials(o);
        return n;
    }
}
class a {
    constructor(e = "", t = {}){
        this.baseUrl = e;
        this.options = t;
        this.materialsInfo = {};
        this.materials = {};
        this.materialsArray = [];
        this.nameLookup = {};
        this.crossOrigin = "anonymous";
        this.side = this.options.side !== undefined ? this.options.side : hB5;
        this.wrap = this.options.wrap !== undefined ? this.options.wrap : GJx;
    }
    setCrossOrigin(e) {
        this.crossOrigin = e;
        return this;
    }
    setManager(e) {
        this.manager = e;
    }
    setMaterials(e) {
        this.materialsInfo = this.convert(e);
        this.materials = {};
        this.materialsArray = [];
        this.nameLookup = {};
    }
    convert(e) {
        if (!this.options) {
            return e;
        }
        let t = {};
        for(let s in e){
            let i = e[s];
            let r = {};
            for(let e in t[s] = r, i){
                let t = true;
                let s = i[e];
                let a = e.toLowerCase();
                switch(a){
                    case "kd":
                    case "ka":
                    case "ks":
                        if (this.options && this.options.normalizeRGB) {
                            s = [
                                s[0] / 255,
                                s[1] / 255,
                                s[2] / 255
                            ];
                        }
                        if (this.options && this.options.ignoreZeroRGBs && s[0] === 0 && s[1] === 0 && s[2] === 0) {
                            t = false;
                        }
                }
                if (t) {
                    r[a] = s;
                }
            }
        }
        return t;
    }
    preload() {
        for(let e in this.materialsInfo){
            this.create(e);
        }
    }
    getIndex(e) {
        return this.nameLookup[e];
    }
    getAsArray() {
        let e = 0;
        for(let t in this.materialsInfo){
            this.materialsArray[e] = this.create(t);
            this.nameLookup[t] = e;
            e++;
        }
        return this.materialsArray;
    }
    create(e) {
        if (this.materials[e] === undefined) {
            this.createMaterial_(e);
        }
        return this.materials[e];
    }
    createMaterial_(e) {
        let t = this;
        let s = this.materialsInfo[e];
        let r = {
            name: e,
            side: this.side
        };
        function a(e, s) {
            let a;
            let o;
            if (r[e]) {
                return;
            }
            let n = t.getTextureParams(s, r);
            let l = t.loadTexture((a = t.baseUrl, typeof (o = n.url) !== "string" || o === "" ? "" : /^https?:\/\//i.test(o) ? o : a + o));
            l.repeat.copy(n.scale);
            l.offset.copy(n.offset);
            l.wrapS = t.wrap;
            l.wrapT = t.wrap;
            if (e === "map" || e === "emissiveMap") {
                l.colorSpace = er$;
            }
            r[e] = l;
        }
        for(let e in s){
            let t;
            let o = s[e];
            if (o !== "") {
                switch(e.toLowerCase()){
                    case "kd":
                        r.color = ppV.colorSpaceToWorking(new Q1f().fromArray(o), er$);
                        break;
                    case "ks":
                        r.specular = ppV.colorSpaceToWorking(new Q1f().fromArray(o), er$);
                        break;
                    case "ke":
                        r.emissive = ppV.colorSpaceToWorking(new Q1f().fromArray(o), er$);
                        break;
                    case "map_kd":
                        a("map", o);
                        break;
                    case "map_ks":
                        a("specularMap", o);
                        break;
                    case "map_ke":
                        a("emissiveMap", o);
                        break;
                    case "norm":
                        a("normalMap", o);
                        break;
                    case "map_bump":
                    case "bump":
                        a("bumpMap", o);
                        break;
                    case "disp":
                        a("displacementMap", o);
                        break;
                    case "map_d":
                        a("alphaMap", o);
                        r.transparent = true;
                        break;
                    case "ns":
                        r.shininess = parseFloat(o);
                        break;
                    case "d":
                        if ((t = parseFloat(o)) < 1) {
                            r.opacity = t;
                            r.transparent = true;
                        }
                        break;
                    case "tr":
                        t = parseFloat(o);
                        if (this.options && this.options.invertTrProperty) {
                            t = 1 - t;
                        }
                        if (t > 0) {
                            r.opacity = 1 - t;
                            r.transparent = true;
                        }
                }
            }
        }
        this.materials[e] = new tXL(r);
        return this.materials[e];
    }
    getTextureParams(e, t) {
        let s;
        let r = {
            scale: new I9Y(1, 1),
            offset: new I9Y(0, 0)
        };
        let a = e.split(/\s+/);
        if ((s = a.indexOf("-bm")) >= 0) {
            t.bumpScale = parseFloat(a[s + 1]);
            a.splice(s, 2);
        }
        if ((s = a.indexOf("-mm")) >= 0) {
            t.displacementBias = parseFloat(a[s + 1]);
            t.displacementScale = parseFloat(a[s + 2]);
            a.splice(s, 3);
        }
        if ((s = a.indexOf("-s")) >= 0) {
            r.scale.set(parseFloat(a[s + 1]), parseFloat(a[s + 2]));
            a.splice(s, 4);
        }
        if ((s = a.indexOf("-o")) >= 0) {
            r.offset.set(parseFloat(a[s + 1]), parseFloat(a[s + 2]));
            a.splice(s, 4);
        }
        r.url = a.join(" ").trim();
        return r;
    }
    loadTexture(e, t, s, r, a) {
        let o = this.manager !== undefined ? this.manager : h_9;
        let n = o.getHandler(e);
        if (n === null) {
            n = new Tap(o);
        }
        if (n.setCrossOrigin) {
            n.setCrossOrigin(this.crossOrigin);
        }
        let l = n.load(e, s, r, a);
        if (t !== undefined) {
            l.mapping = t;
        }
        return l;
    }
}
