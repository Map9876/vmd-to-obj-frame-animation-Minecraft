import { BH$, DXC, LoY, ONl, Pq0, Q1f, Y9S, YJl, aHM, eaF, er$, imn, mrM, qtW, tXL } from "./module-85339.js";
let r = /^[og]\s*(.+)?/;
let a = /^mtllib /;
let o = /^usemtl /;
let n = /^usemap /;
let l = /\s+/;
let h = new Pq0;
let c = new Pq0;
let p = new Pq0;
let u = new Pq0;
let m = new Pq0;
let d = new Q1f;
function f() {
    let e = {
        objects: [],
        object: {},
        vertices: [],
        normals: [],
        colors: [],
        uvs: [],
        materials: {},
        materialLibraries: [],
        startObject: function(e, t) {
            if (this.object && this.object.fromDeclaration === false) {
                this.object.name = e;
                this.object.fromDeclaration = t !== false;
                return;
            }
            let s = this.object && typeof this.object.currentMaterial === "function" ? this.object.currentMaterial() : undefined;
            if (this.object && typeof this.object._finalize === "function") {
                this.object._finalize(true);
            }
            this.object = {
                name: e || "",
                fromDeclaration: t !== false,
                geometry: {
                    vertices: [],
                    normals: [],
                    colors: [],
                    uvs: [],
                    hasUVIndices: false
                },
                materials: [],
                smooth: true,
                startMaterial: function(e, t) {
                    let s = this._finalize(false);
                    if (s && (s.inherited || s.groupCount <= 0)) {
                        this.materials.splice(s.index, 1);
                    }
                    let i = {
                        index: this.materials.length,
                        name: e || "",
                        mtllib: Array.isArray(t) && t.length > 0 ? t[t.length - 1] : "",
                        smooth: s !== undefined ? s.smooth : this.smooth,
                        groupStart: s !== undefined ? s.groupEnd : 0,
                        groupEnd: -1,
                        groupCount: -1,
                        inherited: false,
                        clone: function(e) {
                            let t = {
                                index: typeof e === "number" ? e : this.index,
                                name: this.name,
                                mtllib: this.mtllib,
                                smooth: this.smooth,
                                groupStart: 0,
                                groupEnd: -1,
                                groupCount: -1,
                                inherited: false
                            };
                            t.clone = this.clone.bind(t);
                            return t;
                        }
                    };
                    this.materials.push(i);
                    return i;
                },
                currentMaterial: function() {
                    if (this.materials.length > 0) {
                        return this.materials[this.materials.length - 1];
                    }
                },
                _finalize: function(e) {
                    let t = this.currentMaterial();
                    if (t && t.groupEnd === -1) {
                        t.groupEnd = this.geometry.vertices.length / 3;
                        t.groupCount = t.groupEnd - t.groupStart;
                        t.inherited = false;
                    }
                    if (e && this.materials.length > 1) {
                        for(let e = this.materials.length - 1; e >= 0; e--){
                            if (this.materials[e].groupCount <= 0) {
                                this.materials.splice(e, 1);
                            }
                        }
                    }
                    if (e && this.materials.length === 0) {
                        this.materials.push({
                            name: "",
                            smooth: this.smooth
                        });
                    }
                    return t;
                }
            };
            if (s && s.name && typeof s.clone === "function") {
                let e = s.clone(0);
                e.inherited = true;
                this.object.materials.push(e);
            }
            this.objects.push(this.object);
        },
        finalize: function() {
            if (this.object && typeof this.object._finalize === "function") {
                this.object._finalize(true);
            }
        },
        parseVertexIndex: function(e, t) {
            let s = parseInt(e, 10);
            return (s >= 0 ? s - 1 : s + t / 3) * 3;
        },
        parseNormalIndex: function(e, t) {
            let s = parseInt(e, 10);
            return (s >= 0 ? s - 1 : s + t / 3) * 3;
        },
        parseUVIndex: function(e, t) {
            let s = parseInt(e, 10);
            return (s >= 0 ? s - 1 : s + t / 2) * 2;
        },
        addVertex: function(e, t, s) {
            let vertices = this.vertices;
            let vertices_1 = this.object.geometry.vertices;
            vertices_1.push(vertices[e + 0], vertices[e + 1], vertices[e + 2]);
            vertices_1.push(vertices[t + 0], vertices[t + 1], vertices[t + 2]);
            vertices_1.push(vertices[s + 0], vertices[s + 1], vertices[s + 2]);
        },
        addVertexPoint: function(e) {
            let vertices = this.vertices;
            this.object.geometry.vertices.push(vertices[e + 0], vertices[e + 1], vertices[e + 2]);
        },
        addVertexLine: function(e) {
            let vertices = this.vertices;
            this.object.geometry.vertices.push(vertices[e + 0], vertices[e + 1], vertices[e + 2]);
        },
        addNormal: function(e, t, s) {
            let normals = this.normals;
            let normals_1 = this.object.geometry.normals;
            normals_1.push(normals[e + 0], normals[e + 1], normals[e + 2]);
            normals_1.push(normals[t + 0], normals[t + 1], normals[t + 2]);
            normals_1.push(normals[s + 0], normals[s + 1], normals[s + 2]);
        },
        addFaceNormal: function(e, t, s) {
            let vertices = this.vertices;
            let normals = this.object.geometry.normals;
            h.fromArray(vertices, e);
            c.fromArray(vertices, t);
            p.fromArray(vertices, s);
            m.subVectors(p, c);
            u.subVectors(h, c);
            m.cross(u);
            m.normalize();
            normals.push(m.x, m.y, m.z);
            normals.push(m.x, m.y, m.z);
            normals.push(m.x, m.y, m.z);
        },
        addColor: function(e, t, s) {
            let colors = this.colors;
            let colors_1 = this.object.geometry.colors;
            if (colors[e] !== undefined) {
                colors_1.push(colors[e + 0], colors[e + 1], colors[e + 2]);
            }
            if (colors[t] !== undefined) {
                colors_1.push(colors[t + 0], colors[t + 1], colors[t + 2]);
            }
            if (colors[s] !== undefined) {
                colors_1.push(colors[s + 0], colors[s + 1], colors[s + 2]);
            }
        },
        addUV: function(e, t, s) {
            let uvs = this.uvs;
            let uvs_1 = this.object.geometry.uvs;
            uvs_1.push(uvs[e + 0], uvs[e + 1]);
            uvs_1.push(uvs[t + 0], uvs[t + 1]);
            uvs_1.push(uvs[s + 0], uvs[s + 1]);
        },
        addDefaultUV: function() {
            let uvs = this.object.geometry.uvs;
            uvs.push(0, 0);
            uvs.push(0, 0);
            uvs.push(0, 0);
        },
        addUVLine: function(e) {
            let uvs = this.uvs;
            this.object.geometry.uvs.push(uvs[e + 0], uvs[e + 1]);
        },
        addFace: function(e, t, s, i, r, a, o, n, l) {
            let length = this.vertices.length;
            let c = this.parseVertexIndex(e, length);
            let p = this.parseVertexIndex(t, length);
            let u = this.parseVertexIndex(s, length);
            this.addVertex(c, p, u);
            this.addColor(c, p, u);
            if (o !== undefined && o !== "") {
                let e = this.normals.length;
                c = this.parseNormalIndex(o, e);
                p = this.parseNormalIndex(n, e);
                u = this.parseNormalIndex(l, e);
                this.addNormal(c, p, u);
            } else {
                this.addFaceNormal(c, p, u);
            }
            if (i !== undefined && i !== "") {
                let e = this.uvs.length;
                c = this.parseUVIndex(i, e);
                p = this.parseUVIndex(r, e);
                u = this.parseUVIndex(a, e);
                this.addUV(c, p, u);
                this.object.geometry.hasUVIndices = true;
            } else {
                this.addDefaultUV();
            }
        },
        addPointGeometry: function(e) {
            this.object.geometry.type = "Points";
            let length = this.vertices.length;
            for(let s = 0, i = e.length; s < i; s++){
                let i = this.parseVertexIndex(e[s], length);
                this.addVertexPoint(i);
                this.addColor(i);
            }
        },
        addLineGeometry: function(e, t) {
            this.object.geometry.type = "Line";
            let length = this.vertices.length;
            let length_1 = this.uvs.length;
            for(let t = 0, i = e.length; t < i; t++){
                this.addVertexLine(this.parseVertexIndex(e[t], length));
            }
            for(let e = 0, s = t.length; e < s; e++){
                this.addUVLine(this.parseUVIndex(t[e], length_1));
            }
        }
    };
    e.startObject("", false);
    return e;
}
export class L extends aHM {
    constructor(e){
        super(e);
        this.materials = null;
    }
    load(e, t, s, r) {
        let a = this;
        let o = new Y9S(this.manager);
        o.setPath(this.path);
        o.setRequestHeader(this.requestHeader);
        o.setWithCredentials(this.withCredentials);
        o.load(e, function(s) {
            try {
                t(a.parse(s));
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
    setMaterials(e) {
        this.materials = e;
        return this;
    }
    parse(e) {
        let t = new f;
        if (e.indexOf("\r\n") !== -1) {
            e = e.replace(/\r\n/g, "\n");
        }
        if (e.indexOf("\\\n") !== -1) {
            e = e.replace(/\\\n/g, "");
        }
        let s = e.split("\n");
        let h = [];
        for(let e = 0, c = s.length; e < c; e++){
            let c = s[e].trimStart();
            if (c.length === 0) {
                continue;
            }
            let p = c.charAt(0);
            if (p !== "#") {
                if (p === "v") {
                    let e = c.split(l);
                    switch(e[0]){
                        case "v":
                            t.vertices.push(parseFloat(e[1]), parseFloat(e[2]), parseFloat(e[3]));
                            if (e.length >= 7) {
                                d.setRGB(parseFloat(e[4]), parseFloat(e[5]), parseFloat(e[6]), er$);
                                t.colors.push(d.r, d.g, d.b);
                            } else {
                                t.colors.push(undefined, undefined, undefined);
                            }
                            break;
                        case "vn":
                            t.normals.push(parseFloat(e[1]), parseFloat(e[2]), parseFloat(e[3]));
                            break;
                        case "vt":
                            t.uvs.push(parseFloat(e[1]), parseFloat(e[2]));
                    }
                } else if (p === "f") {
                    let e = c.slice(1).trim().split(l);
                    let s = [];
                    for(let t = 0, i = e.length; t < i; t++){
                        let i = e[t];
                        if (i.length > 0) {
                            let e = i.split("/");
                            s.push(e);
                        }
                    }
                    let i = s[0];
                    for(let e = 1, r = s.length - 1; e < r; e++){
                        let r = s[e];
                        let a = s[e + 1];
                        t.addFace(i[0], r[0], a[0], i[1], r[1], a[1], i[2], r[2], a[2]);
                    }
                } else if (p === "l") {
                    let e = c.substring(1).trim().split(" ");
                    let s = [];
                    let i = [];
                    if (c.indexOf("/") === -1) {
                        s = e;
                    } else {
                        for(let t = 0, r = e.length; t < r; t++){
                            let r = e[t].split("/");
                            if (r[0] !== "") {
                                s.push(r[0]);
                            }
                            if (r[1] !== "") {
                                i.push(r[1]);
                            }
                        }
                    }
                    t.addLineGeometry(s, i);
                } else if (p === "p") {
                    let e = c.slice(1).trim().split(" ");
                    t.addPointGeometry(e);
                } else if ((h = r.exec(c)) !== null) {
                    let e = ` ${h[0].slice(1).trim()}`.slice(1);
                    t.startObject(e);
                } else if (o.test(c)) {
                    t.object.startMaterial(c.substring(7).trim(), t.materialLibraries);
                } else if (a.test(c)) {
                    t.materialLibraries.push(c.substring(7).trim());
                } else if (n.test(c)) {
                    console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');
                } else if (p === "s") {
                    if ((h = c.split(" ")).length > 1) {
                        let e = h[1].trim().toLowerCase();
                        t.object.smooth = e !== "0" && e !== "off";
                    } else {
                        t.object.smooth = true;
                    }
                    let e = t.object.currentMaterial();
                    if (e) {
                        e.smooth = t.object.smooth;
                    }
                } else {
                    if (c === "\0") {
                        continue;
                    }
                    console.warn(`THREE.OBJLoader: Unexpected line: "${c}"`);
                }
            }
        }
        t.finalize();
        let c = new YJl;
        c.materialLibraries = [].concat(t.materialLibraries);
        if ((t.objects.length !== 1 || t.objects[0].geometry.vertices.length !== 0) == true) {
            for(let e = 0, s = t.objects.length; e < s; e++){
                let s;
                let object = t.objects[e];
                let a = object.geometry;
                let o = object.materials;
                let n = a.type === "Line";
                let l = a.type === "Points";
                let h = false;
                if (a.vertices.length === 0) {
                    continue;
                }
                let p = new LoY;
                p.setAttribute("position", new qtW(a.vertices, 3));
                if (a.normals.length > 0) {
                    p.setAttribute("normal", new qtW(a.normals, 3));
                }
                if (a.colors.length > 0) {
                    h = true;
                    p.setAttribute("color", new qtW(a.colors, 3));
                }
                if (a.hasUVIndices === true) {
                    p.setAttribute("uv", new qtW(a.uvs, 2));
                }
                let u = [];
                for(let e = 0, s = o.length; e < s; e++){
                    let s = o[e];
                    let r = `${s.name}_${s.smooth}_${h}`;
                    let a = t.materials[r];
                    if (this.materials !== null) {
                        a = this.materials.create(s.name);
                        if (!n || !a || a instanceof mrM) {
                            if (l && a && !(a instanceof BH$)) {
                                let e = new BH$({
                                    size: 10,
                                    sizeAttenuation: false
                                });
                                imn.prototype.copy.call(e, a);
                                e.color.copy(a.color);
                                e.map = a.map;
                                a = e;
                            }
                        } else {
                            let e = new mrM;
                            imn.prototype.copy.call(e, a);
                            e.color.copy(a.color);
                            a = e;
                        }
                    }
                    if (a === undefined) {
                        a = n ? new mrM : l ? new BH$({
                            size: 1,
                            sizeAttenuation: false
                        }) : new tXL;
                        a.name = s.name;
                        a.flatShading = !s.smooth;
                        a.vertexColors = h;
                        t.materials[r] = a;
                    }
                    u.push(a);
                }
                if (u.length > 1) {
                    for(let e = 0, t = o.length; e < t; e++){
                        let t = o[e];
                        p.addGroup(t.groupStart, t.groupCount, e);
                    }
                    s = n ? new DXC(p, u) : l ? new ONl(p, u) : new eaF(p, u);
                } else {
                    s = n ? new DXC(p, u[0]) : l ? new ONl(p, u[0]) : new eaF(p, u[0]);
                }
                s.name = object.name;
                c.add(s);
            }
        } else if (t.vertices.length > 0) {
            let e = new BH$({
                size: 1,
                sizeAttenuation: false
            });
            let s = new LoY;
            s.setAttribute("position", new qtW(t.vertices, 3));
            if (t.colors.length > 0 && t.colors[0] !== undefined) {
                s.setAttribute("color", new qtW(t.colors, 3));
                e.vertexColors = true;
            }
            let r = new ONl(s, e);
            c.add(r);
        }
        return c;
    }
}
