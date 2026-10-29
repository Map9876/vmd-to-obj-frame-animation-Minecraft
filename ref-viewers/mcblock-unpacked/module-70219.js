function a(e, t, n) {
    return (t[0] - e[0]) * (n[1] - e[1]) - (t[1] - e[1]) * (n[0] - e[0]);
}
function r(e, t, n, r) {
    let l = a(e, t, r);
    let o = a(t, n, r);
    let i = a(n, e, r);
    return !(l < 0 || o < 0 || i < 0) || !(l > 0 || o > 0 || i > 0);
}
let l = [
    "opaque",
    "cutout",
    "blend",
    "blend-cutout",
    "legacy"
];
export function $(e, t, n, a = 0) {
    if (!t) {
        let t = n(e);
        if (a > 0) {
            t.addGroup(0, (e.length - a) * 6, 0);
            t.addGroup((e.length - a) * 6, 6 * a, 1);
        }
        return {
            geometry: t,
            alphaClasses: [
                "legacy"
            ]
        };
    }
    let o = e.slice(0, e.length - a);
    let i = a > 0 ? e.slice(-a) : [];
    let c = new Map(l.map((e)=>[
            e,
            []
        ]));
    for (let e of o){
        c.get(((e, t)=>{
            let f = e.vertices().map((e)=>e.texture);
            if (f.some((e)=>!e || !Number.isFinite(e[0]) || !Number.isFinite(e[1]))) {
                t.onInvalidUv?.("missing-or-nonfinite-uv");
                return "legacy";
            }
            if (f.some(([t, n])=>t < 0 || t > 1 || n < 0 || n > 1)) {
                t.onInvalidUv?.("out-of-range-uv");
                return "legacy";
            }
            let u = t.animationRegions.find((e)=>f.every(([n, a])=>n >= e.u0 - 1e-8 && n <= e.u1 + 1e-8 && a >= e.v0 - 1e-8 && a <= e.v1 + 1e-8));
            let d = u?.frameCount ?? 1;
            let h = u?.vOffsetPerFrame ?? 0;
            let g = u?.frameColumns ?? 1;
            let _ = u?.uOffsetPerFrame ?? 0;
            let m = false;
            let b = false;
            let w = false;
            for(let e = 0; e < d; e++){
                let n = e % g * _;
                let a = Math.floor(e / g) * h;
                let l = f.map(([r, l])=>[
                        (r + n) * t.width,
                        (l + a) * t.height
                    ]);
                let o = Math.max(0, Math.floor(Math.min(...l.map((e)=>e[0]))));
                let i = Math.min(t.width, Math.ceil(Math.max(...l.map((e)=>e[0]))));
                let c = Math.max(0, Math.floor(Math.min(...l.map((e)=>e[1]))));
                let s = Math.min(t.height, Math.ceil(Math.max(...l.map((e)=>e[1]))));
                let u = false;
                for(let e = c; e < s; e++){
                    for(let n = o; n < i; n++){
                        let a = [
                            n + 0.5,
                            e + 0.5
                        ];
                        if (!r(l[0], l[1], l[2], a) && !r(l[0], l[2], l[3], a)) {
                            continue;
                        }
                        let o = t.rgba[(e * t.width + n) * 4 + 3];
                        u = true;
                        w = true;
                        if (!m) {
                            m = o === 0;
                        }
                        if (!b) {
                            b = o > 0 && o < 255;
                        }
                    }
                }
                if (!u) {
                    let e = f.reduce((acc, item)=>acc + item[0], 0) / f.length + n;
                    let r = f.reduce((acc, item)=>acc + item[1], 0) / f.length + a;
                    let l = Math.min(t.width - 1, Math.floor(e * t.width));
                    let o = Math.min(t.height - 1, Math.floor(r * t.height));
                    if (l < 0 || o < 0 || l >= t.width || o >= t.height) {
                        continue;
                    }
                    let i = t.rgba[(o * t.width + l) * 4 + 3];
                    w = true;
                    if (!m) {
                        m = i === 0;
                    }
                    if (!b) {
                        b = i > 0 && i < 255;
                    }
                }
            }
            if (w) {
                if (b) {
                    if (m) {
                        return "blend-cutout";
                    }
                    return "blend";
                }
                if (m) {
                    return "cutout";
                }
                return "opaque";
            }
            t.onInvalidUv?.("uncovered-or-out-of-range-uv");
            return "legacy";
        })(e, t)).push(e);
    }
    let alphaClasses = l.filter((e)=>c.get(e).length > 0);
    if (alphaClasses.length === 0) {
        alphaClasses.push("legacy");
    }
    let f = n(alphaClasses.flatMap((e)=>c.get(e)).concat(i));
    let u = 0;
    for (let [e, t] of alphaClasses.entries()){
        let n = 6 * c.get(t).length;
        f.addGroup(u, n, e);
        u += n;
    }
    if (i.length > 0) {
        f.addGroup(u, 6 * i.length, alphaClasses.length);
    }
    if (u + 6 * i.length !== f.getIndex().count) {
        throw Error("透明材质组未覆盖全部模型面");
    }
    return {
        geometry: f,
        alphaClasses
    };
}
