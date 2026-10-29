import { Qr, Tl, Z8, e$, eL, hs, vt } from "./module-85250.js";
import { fA, ze } from "./module-50923.js";
import { DF } from "./module-97633.js";
import { gw } from "./module-45723.js";
import { Mi } from "./module-19023.js";
import { e as e_1 } from "./module-31206.js";
import { k } from "./module-3420.js";
let h = {
    0: [
        0,
        3,
        2,
        3,
        2,
        1,
        0,
        1
    ],
    90: [
        2,
        3,
        2,
        1,
        0,
        1,
        0,
        3
    ],
    180: [
        2,
        1,
        0,
        1,
        0,
        3,
        2,
        3
    ],
    270: [
        0,
        1,
        0,
        3,
        2,
        3,
        2,
        1
    ]
};
let c = {
    x: [
        1,
        0,
        0
    ],
    y: [
        0,
        1,
        0
    ],
    z: [
        0,
        0,
        1
    ]
};
let f = {
    x: [
        1,
        1.41421356237,
        1.41421356237
    ],
    y: [
        1.41421356237,
        1,
        1.41421356237
    ],
    z: [
        1.41421356237,
        1.41421356237,
        1
    ]
};
export class z {
    parent;
    textures;
    elements;
    display;
    guiLight;
    static BUILTIN_GENERATED = gw.create("builtin/generated");
    static GENERATED_LAYERS = [
        "layer0",
        "layer1",
        "layer2",
        "layer3",
        "layer4"
    ];
    generationMarker = false;
    constructor(t, e, r, n, a){
        this.parent = t;
        this.textures = e;
        this.elements = r;
        this.display = n;
        this.guiLight = a;
    }
    getDisplayTransform(t) {
        let e = this.display?.[t];
        let r = vt();
        Tl(r, r, [
            8,
            8,
            8
        ]);
        if (e?.translation) {
            Tl(r, r, e.translation);
        }
        if (e?.rotation) {
            eL(r, r, e.rotation[0] * Math.PI / 180);
            Z8(r, r, e.rotation[1] * Math.PI / 180);
            Qr(r, r, -e.rotation[2] * Math.PI / 180);
        }
        if (e?.scale) {
            hs(r, r, e.scale);
        }
        Tl(r, r, [
            -8,
            -8,
            -8
        ]);
        return r;
    }
    getMesh(t, e, r) {
        let n = new e_1;
        let a = (t)=>{
            if (r === undefined || t === undefined || t < 0) {
                return [
                    1,
                    1,
                    1
                ];
            }
            if (typeof r === "function") {
                return r(t);
            }
            return r;
        };
        for (let r of this.elements ?? []){
            n.merge(this.getElementMesh(r, t, e, a));
        }
        return n;
    }
    getElementMesh(t, e, r, s) {
        let g = new e_1;
        let [p, d, m] = t.from;
        let [v, y, M] = t.to;
        let x = (t, r, n)=>{
            let a = k.fromPoints(new Mi(n[0], n[1], n[2]), new Mi(n[3], n[4], n[5]), new Mi(n[6], n[7], n[8]), new Mi(n[9], n[10], n[11]));
            let i = s(t.tintindex);
            a.setColor(i);
            let [u, c, f, p] = e.getTextureUV(this.getTexture(t.texture));
            let d = (f - u) / 16;
            let m = (p - c) / 16;
            r[0] = (t.uv?.[0] ?? r[0]) * d;
            r[1] = (t.uv?.[1] ?? r[1]) * m;
            r[2] = (t.uv?.[2] ?? r[2]) * d;
            r[3] = (t.uv?.[3] ?? r[3]) * m;
            let v = h[t.rotation ?? 0];
            a.setTexture([
                u + r[v[0]],
                c + r[v[1]],
                u + r[v[2]],
                c + r[v[3]],
                u + r[v[4]],
                c + r[v[5]],
                u + r[v[6]],
                c + r[v[7]]
            ], [
                u + Math.min(r[0], r[2]),
                c + Math.min(r[1], r[3]),
                u + Math.max(r[0], r[2]),
                c + Math.max(r[1], r[3])
            ]);
            g.quads.push(a);
        };
        if (!(!t.faces?.up?.texture || t.faces.up.cullface && r[t.faces.up.cullface])) {
            x(t.faces.up, [
                p,
                16 - M,
                v,
                16 - m
            ], [
                p,
                y,
                M,
                v,
                y,
                M,
                v,
                y,
                m,
                p,
                y,
                m
            ]);
        }
        if (!(!t.faces?.down?.texture || t.faces.down.cullface && r[t.faces.down.cullface])) {
            x(t.faces.down, [
                16 - M,
                16 - v,
                16 - m,
                16 - p
            ], [
                p,
                d,
                m,
                v,
                d,
                m,
                v,
                d,
                M,
                p,
                d,
                M
            ]);
        }
        if (!(!t.faces?.south?.texture || t.faces.south.cullface && r[t.faces.south.cullface])) {
            x(t.faces.south, [
                p,
                16 - y,
                v,
                16 - d
            ], [
                p,
                d,
                M,
                v,
                d,
                M,
                v,
                y,
                M,
                p,
                y,
                M
            ]);
        }
        if (!(!t.faces?.north?.texture || t.faces.north.cullface && r[t.faces.north.cullface])) {
            x(t.faces.north, [
                16 - v,
                16 - y,
                16 - p,
                16 - d
            ], [
                v,
                d,
                m,
                p,
                d,
                m,
                p,
                y,
                m,
                v,
                y,
                m
            ]);
        }
        if (!(!t.faces?.east?.texture || t.faces.east.cullface && r[t.faces.east.cullface])) {
            x(t.faces.east, [
                16 - M,
                16 - y,
                16 - m,
                16 - d
            ], [
                v,
                d,
                M,
                v,
                d,
                m,
                v,
                y,
                m,
                v,
                y,
                M
            ]);
        }
        if (!(!t.faces?.west?.texture || t.faces.west.cullface && r[t.faces.west.cullface])) {
            x(t.faces.west, [
                m,
                16 - y,
                M,
                16 - d
            ], [
                p,
                d,
                m,
                p,
                d,
                M,
                p,
                y,
                M,
                p,
                y,
                m
            ]);
        }
        let I = vt();
        if (t.rotation) {
            let e = fA(...t.rotation.origin);
            Tl(I, I, e);
            e$(I, I, DF(t.rotation.angle), c[t.rotation.axis]);
            if (t.rotation.rescale) {
                hs(I, I, f[t.rotation.axis]);
            }
            ze(e, e);
            Tl(I, I, e);
        }
        return g.transform(I);
    }
    getTexture(t) {
        t = t.startsWith("#") ? t.slice(1) : t;
        for(t = this.resolveTextureRef(t); t.startsWith("#");){
            t = this.resolveTextureRef(t.slice(1));
        }
        return gw.parse(t);
    }
    resolveTextureRef(t) {
        let e = this.textures?.[t];
        if (typeof e === "object" && e !== null) {
            return e.sprite;
        }
        return e ?? "";
    }
    flatten(t) {
        if (!this.parent) {
            return;
        }
        if (this.parent.equals(z.BUILTIN_GENERATED)) {
            this.generationMarker = true;
            return;
        }
        let e = this.getParent(t);
        if (!e) {
            console.warn(`parent ${this.parent} does not exist!`);
            this.parent = undefined;
            return;
        }
        e.flatten(t);
        if (!this.elements) {
            this.elements = e.elements;
        }
        if (!this.textures) {
            this.textures = {};
        }
        Object.keys(e.textures ?? {}).forEach((t)=>{
            if (!this.textures[t]) {
                this.textures[t] = e.textures[t];
            }
        });
        if (!this.display) {
            this.display = {};
        }
        Object.keys(e.display ?? {}).forEach((t)=>{
            if (this.display[t]) {
                Object.keys(e.display[t] ?? {}).forEach((r)=>{
                    if (!this.display[t][r]) {
                        this.display[t][r] = e.display[t][r];
                    }
                });
            } else {
                this.display[t] = e.display[t];
            }
        });
        if (!this.guiLight) {
            this.guiLight = e.guiLight;
        }
        if (e.generationMarker) {
            this.generationMarker = true;
        }
        if (this.generationMarker && (this.elements?.length ?? 0) === 0) {
            for(let tintindex = 0; tintindex < z.GENERATED_LAYERS.length; tintindex += 1){
                let e = z.GENERATED_LAYERS[tintindex];
                if (!Object.hasOwn(this.textures, e)) {
                    break;
                }
                if (!this.elements) {
                    this.elements = [];
                }
                this.elements.push({
                    from: [
                        0,
                        0,
                        0
                    ],
                    to: [
                        16,
                        16,
                        0
                    ],
                    faces: {
                        south: {
                            texture: `#${e}`,
                            tintindex
                        }
                    }
                });
            }
        }
        this.parent = undefined;
    }
    getParent(t) {
        if (this.parent) {
            return t.getBlockModel(this.parent);
        }
        return null;
    }
    static fromJson(t) {
        return new z(t.parent === undefined ? undefined : gw.parse(t.parent), t.textures, t.elements, t.display);
    }
}
