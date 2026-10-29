import { LoY, Pq0, THS, kn4 } from "./module-85339.js";
import { gw } from "./module-82084.js";
export function p(e) {
    let o = -Infinity;
    let i = (e, t)=>{
        let e_partPose = e.partPose;
        let s = new kn4;
        s.makeTranslation(e_partPose?.x || 0, e_partPose?.y || 0, e_partPose?.z || 0);
        if (e_partPose?.zRot) {
            s.multiply(new kn4().makeRotationZ(e_partPose.zRot));
        }
        if (e_partPose?.yRot) {
            s.multiply(new kn4().makeRotationY(e_partPose.yRot));
        }
        if (e_partPose?.xRot) {
            s.multiply(new kn4().makeRotationX(e_partPose.xRot));
        }
        let a = t.clone().multiply(s);
        if (e.cubes) {
            for (let i of e.cubes){
                let e = i.grow || 0;
                let [t, n, s] = i.origin;
                let [d, l, u] = i.dimensions;
                for (let i of [
                    t - e,
                    t + d + e
                ]){
                    for (let t of [
                        n - e,
                        n + l + e
                    ]){
                        for (let n of [
                            s - e,
                            s + u + e
                        ]){
                            let e = new Pq0(i, t, n).applyMatrix4(a);
                            if (e.y > o) {
                                o = e.y;
                            }
                        }
                    }
                }
            }
        }
        if (e.children) {
            for (let o of Object.values(e.children)){
                i(o, a);
            }
        }
    };
    i(e.mesh.root, new kn4);
    if (o === -Infinity) {
        return 0;
    }
    return o;
}
let s = 1 / 16;
export function f(e, o, i, n) {
    let u = e.material?.xTexSize || 64;
    let c = e.material?.yTexSize || 64;
    let m = 0;
    let x = 0;
    let g = 1;
    let p = 1;
    if (!n?.standaloneTexture) {
        let e = ((e, o)=>{
            try {
                let i = e.atlas.getTextureUV(gw.parse(o));
                if (i && i.length === 4) {
                    return [
                        i[0],
                        i[1],
                        i[2],
                        i[3]
                    ];
                }
            } catch (e) {}
            return null;
        })(i, o);
        if (!e) {
            return null;
        }
        let [r, n, s, a] = e;
        m = r;
        x = n;
        g = s;
        p = a;
        let d = i.atlas.getTextureAtlas();
        let l = (s - m) * d.width;
        let b = (a - x) * d.height;
        let y = u / c;
        let h = l / b;
        if (Number.isFinite(h) && h > y + 0.000001) {
            g = m + b * y / d.width;
        } else if (Number.isFinite(h) && h < y - 0.000001) {
            p = x + l / y / d.height;
        }
    }
    let b = (e)=>m + e / u * (g - m);
    let y = (e)=>x + e / c * (p - x);
    let h = [];
    let f = [];
    let _ = [];
    let v = 0;
    let C = e.anchorMaxY ?? -Infinity;
    let z = e.anchorFixed === true && e.anchorMaxY !== undefined;
    function P(e, o, i) {
        let r = [
            {
                corner: e[0],
                uv: [
                    o[2],
                    o[1]
                ]
            },
            {
                corner: e[1],
                uv: [
                    o[0],
                    o[1]
                ]
            },
            {
                corner: e[2],
                uv: [
                    o[0],
                    o[3]
                ]
            },
            {
                corner: e[3],
                uv: [
                    o[2],
                    o[3]
                ]
            }
        ];
        if (i) {
            r.reverse();
        }
        for(let e = 0; e < 4; e++){
            let { corner, uv } = r[e];
            h.push(corner[0], corner[1], corner[2]);
            if (!z && corner[1] > C) {
                C = corner[1];
            }
            f.push(b(uv[0]), y(uv[1]));
        }
        _.push(v, v + 1, v + 2, v, v + 2, v + 3);
        v += 4;
    }
    (function e(o, i, t) {
        let i_partPose = i.partPose;
        let d = n?.poseOverrides?.[o];
        let l = new kn4;
        l.makeTranslation(i_partPose?.x || 0, i_partPose?.y || 0, i_partPose?.z || 0);
        let u = (i_partPose?.xRot || 0) + (d?.[0] || 0);
        let c = (i_partPose?.yRot || 0) + (d?.[1] || 0);
        let m = (i_partPose?.zRot || 0) + (d?.[2] || 0);
        if (m) {
            l.multiply(new kn4().makeRotationZ(m));
        }
        if (c) {
            l.multiply(new kn4().makeRotationY(c));
        }
        if (u) {
            l.multiply(new kn4().makeRotationX(u));
        }
        let x = t.clone().multiply(l);
        if (i.cubes) {
            for (let e of i.cubes){
                ((e, o)=>{
                    let i = e.grow || 0;
                    let [t, n, s] = e.origin;
                    let [a, d, l] = e.dimensions;
                    let u = t - i;
                    let c = t + a + i;
                    let m = n - i;
                    let x = n + d + i;
                    let g = s - i;
                    let p = s + l + i;
                    if (e.mirror) {
                        let e = u;
                        u = c;
                        c = e;
                    }
                    let b = (e, i, t)=>{
                        let n = new Pq0(e, i, t).applyMatrix4(o);
                        return [
                            n.x,
                            n.y,
                            n.z
                        ];
                    };
                    let y = b(u, m, g);
                    let h = b(c, m, g);
                    let f = b(c, x, g);
                    let _ = b(u, x, g);
                    let v = b(u, m, p);
                    let C = b(c, m, p);
                    let z = b(c, x, p);
                    let w = b(u, x, p);
                    let k = ((e, o, i, r, t)=>{
                        let n = e + t;
                        let s = e + t + i;
                        let a = e + 2 * t + i;
                        let d = o + t;
                        let l = o + t + r;
                        return {
                            down: [
                                n,
                                o,
                                s,
                                d
                            ],
                            up: [
                                s,
                                d,
                                e + t + 2 * i,
                                o
                            ],
                            west: [
                                e,
                                d,
                                n,
                                l
                            ],
                            north: [
                                n,
                                d,
                                s,
                                l
                            ],
                            east: [
                                s,
                                d,
                                a,
                                l
                            ],
                            south: [
                                a,
                                d,
                                e + 2 * t + 2 * i,
                                l
                            ]
                        };
                    })(e.texCoord.u, e.texCoord.v, a, d, l);
                    let e_mirror = e.mirror;
                    P([
                        C,
                        v,
                        y,
                        h
                    ], k.down, e_mirror);
                    P([
                        f,
                        _,
                        w,
                        z
                    ], k.up, e_mirror);
                    P([
                        y,
                        v,
                        w,
                        _
                    ], k.west, e_mirror);
                    P([
                        h,
                        y,
                        _,
                        f
                    ], k.north, e_mirror);
                    P([
                        C,
                        h,
                        f,
                        z
                    ], k.east, e_mirror);
                    P([
                        v,
                        C,
                        z,
                        w
                    ], k.south, e_mirror);
                })(e, x);
            }
        }
        if (i.children) {
            for (let [o, r] of Object.entries(i.children)){
                e(o, r, x);
            }
        }
    })("root", e.mesh.root, new kn4);
    if (v === 0) {
        return null;
    }
    let w = new Float32Array(h.length);
    for(let e = 0; e < h.length; e += 3){
        w[e] = -h[e] * s;
        w[e + 1] = (C - h[e + 1]) * s;
        w[e + 2] = h[e + 2] * s;
    }
    let k = new LoY;
    k.setAttribute("position", new THS(w, 3));
    k.setAttribute("uv", new THS(new Float32Array(f), 2));
    k.setIndex(_);
    k.computeVertexNormals();
    k.computeBoundingBox();
    k.computeBoundingSphere();
    return k;
}
