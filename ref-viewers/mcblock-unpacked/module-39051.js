import { S as S_1 } from "./module-24708.js";
import { Ikc, KCZ, PVZ, YjP, aig, euz, k5n, zMY } from "./module-44405.js";
let o = aig().finite();
let a = YjP().regex(/^#[0-9a-fA-F]{6}$/, "必须是 #RRGGBB 颜色");
let position = PVZ([
    o.min(-10000).max(10000),
    o.min(-10000).max(10000),
    o.min(-10000).max(10000)
]);
let ambientLight = Ikc({
    intensity: o.min(0).max(3)
}).strict();
let hemisphereLight = Ikc({
    skyColor: a,
    groundColor: a,
    intensity: o.min(0).max(3)
}).strict();
let mainLight = Ikc({
    position,
    intensity: o.min(0).max(10),
    color: a,
    castShadow: zMY(),
    shadowMapSize: KCZ([
        euz(512),
        euz(1024),
        euz(2048),
        euz(4096)
    ]),
    shadowCameraBounds: o.positive().max(10000),
    shadowFit: zMY(),
    shadowFitScale: o.positive().max(10),
    shadowFitPad: o.min(0).max(1000),
    shadowFitMin: o.positive().max(1000)
}).strict();
let fillLight = Ikc({
    position,
    intensity: o.min(0).max(3),
    color: a
}).strict();
let grid = Ikc({
    cellSize: o.min(0.5).max(5),
    cellThickness: o.min(0.1).max(3),
    sectionSize: o.min(1).max(50),
    sectionThickness: o.min(0.1).max(5),
    visible: zMY(),
    cellColor: a,
    sectionColor: a,
    fadeDistance: o.min(10).max(500),
    fadeStrength: o.min(0).max(1),
    opacity: o.min(0).max(1),
    lineColor: a,
    minorAlpha: o.min(0).max(0.5),
    majorAlpha: o.min(0).max(0.5),
    gain: o.min(0.2).max(2.2),
    fitInner: o.min(0.1).max(4),
    fitScale: o.min(1.3).max(4)
}).strict().refine((e)=>e.fitScale > e.fitInner, {
    message: "淡出外半径必须大于内半径",
    path: [
        "fitScale"
    ]
});
let groundShadow = Ikc({
    enabled: zMY(),
    opacity: o.min(0).max(1)
}).strict();
let viewport = Ikc({
    vignette: o.min(0).max(0.85)
}).strict();
let renderer = Ikc({
    toneMapping: k5n([
        "None",
        "ACESFilmic",
        "Reinhard",
        "Linear"
    ]),
    toneMappingExposure: o.min(0.1).max(5),
    dpr: PVZ([
        o.min(0.5).max(2),
        o.min(0.5).max(2)
    ]).superRefine(([i, t], r)=>{
        if (i > t) {
            r.addIssue({
                code: "custom",
                message: "DPR 最小值不能大于最大值",
                path: []
            });
        }
    }),
    shadows: zMY()
}).strict();
let camera = Ikc({
    fov: o.min(20).max(120),
    near: o.min(0.01).max(10),
    far: o.min(100).max(10000)
}).strict().refine((e)=>e.far > e.near, {
    message: "far 必须大于 near",
    path: [
        "far"
    ]
});
let bloom = Ikc({
    enabled: zMY(),
    intensity: o.min(0).max(3),
    luminanceThreshold: o.min(0).max(5),
    luminanceSmoothing: o.min(0).max(1),
    mipmapBlur: zMY()
}).strict();
let vignette = Ikc({
    enabled: zMY(),
    offset: o.min(0).max(1),
    darkness: o.min(0).max(2)
}).strict();
let outline = Ikc({
    enabled: zMY(),
    edgeStrength: o.min(0).max(10),
    visibleEdgeColor: a,
    hiddenEdgeColor: a,
    blur: zMY(),
    xRay: zMY()
}).strict();
let postProcessing = Ikc({
    enabled: zMY(),
    bloom,
    vignette,
    outline
}).strict();
let fog = Ikc({
    enabled: zMY(),
    type: k5n([
        "linear",
        "exponential"
    ]),
    color: a,
    near: o.min(0).max(500),
    far: o.min(0).max(1000),
    density: o.min(0).max(0.1)
}).strict().refine((e)=>e.far > e.near, {
    message: "far 必须大于 near",
    path: [
        "far"
    ]
});
let emissive = Ikc({
    enabled: zMY(),
    intensity: o.min(0).max(10)
}).strict();
let k = Ikc({
    background: a,
    ambientLight,
    hemisphereLight,
    mainLight,
    fillLight,
    grid,
    groundShadow,
    viewport,
    renderer,
    camera,
    postProcessing,
    fog,
    emissive
}).strict();
let A = Ikc({
    background: a.optional(),
    ambientLight: ambientLight.partial().optional(),
    hemisphereLight: hemisphereLight.partial().optional(),
    mainLight: mainLight.partial().optional(),
    fillLight: fillLight.partial().optional(),
    grid: grid.partial().optional(),
    groundShadow: groundShadow.partial().optional(),
    viewport: viewport.partial().optional(),
    renderer: renderer.partial().optional(),
    camera: camera.partial().optional(),
    postProcessing: Ikc({
        enabled: zMY().optional(),
        bloom: bloom.partial().optional(),
        vignette: vignette.partial().optional(),
        outline: outline.partial().optional()
    }).strict().optional(),
    fog: fog.partial().optional(),
    emissive: emissive.partial().optional()
}).strict();
function E(error) {
    return error.issues.map((e)=>{
        let r = e.path.length > 0 ? e.path.join(".") : "renderer_config";
        return `${r}: ${e.message}`;
    }).join("; ");
}
export function S(e) {
    let r = ((e)=>{
        if (e == null) {
            throw Error("renderer_config 不能为空");
        }
        if (typeof e !== "string") {
            return e;
        }
        try {
            return JSON.parse(e);
        } catch (e) {
            throw Error("renderer_config 不是有效的 JSON");
        }
    })(e);
    if (r === null || typeof r !== "object" || Array.isArray(r)) {
        throw Error("renderer_config 必须是对象");
    }
    (function e(r, i = "renderer_config") {
        if (r !== null && typeof r === "object") {
            if (Array.isArray(r)) {
                return void r.forEach((r, t)=>e(r, `${i}.${t}`));
            }
            if (Object.getPrototypeOf(r) !== Object.prototype) {
                throw Error(`${i} 必须是普通对象`);
            }
            for (let [t, n] of Object.entries(r)){
                e(n, `${i}.${t}`);
            }
        }
    })(r);
    let i = A.safeParse(r);
    if (!i.success) {
        throw Error(E(i.error));
    }
    let n = function e(S_1_1, i) {
        if (Array.isArray(i)) {
            return [
                ...i
            ];
        }
        if (i === null || typeof i !== "object") {
            return i;
        }
        let t = S_1_1 === null || typeof S_1_1 !== "object" || Array.isArray(S_1_1) ? {} : S_1_1;
        let n = {
            ...t
        };
        for (let [r, o] of Object.entries(i)){
            n[r] = e(t[r], o);
        }
        return n;
    }(S_1, i.data);
    let o = k.safeParse(n);
    if (!o.success) {
        throw Error(E(o.error));
    }
    return o.data;
}
