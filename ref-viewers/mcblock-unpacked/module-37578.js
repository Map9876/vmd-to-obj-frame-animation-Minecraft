import { Lw, Ts, zg } from "./module-82084.js";
import { Cfg, GWd, GYF, OUM, er$, hxR } from "./module-85339.js";
import { y } from "./module-55552.js";
import { ic } from "./module-55671.js";
import { O5, PW, o6 as bundleId } from "./module-13663.js";
let o = new Set([
    "minecraft:item/generated",
    "minecraft:item/handheld",
    "minecraft:item/handheld_rod",
    "minecraft:item/handheld_mace",
    "minecraft:builtin/generated"
]);
let c = (e)=>{
    if (e.startsWith("minecraft:")) {
        return e;
    }
    return `minecraft:${e}`;
};
let s = {
    "minecraft:nether_portal": [
        "minecraft:block/nether_portal"
    ],
    "minecraft:fire": [
        "minecraft:block/fire_0",
        "minecraft:block/fire_1"
    ],
    "minecraft:soul_fire": [
        "minecraft:block/soul_fire_0",
        "minecraft:block/soul_fire_1"
    ],
    "minecraft:lava": [
        "minecraft:block/lava_still",
        "minecraft:block/lava_flow"
    ],
    "minecraft:flowing_lava": [
        "minecraft:block/lava_still",
        "minecraft:block/lava_flow"
    ]
};
let u = null;
let m = null;
let d = null;
let h = new Map;
let g = new Map;
let animatedTexturesByBlockId = new Map;
let p = new Map;
let emissionLightMasksByBlockId = new Map;
let v = [
    "_e",
    "_emissive",
    "_emission",
    "_lightmask",
    "_light_mask",
    "_mask",
    "_bloom"
];
export function y6() {
    return u || (u = P().catch((e)=>{
        u = null;
        throw e;
    }));
}
export function Oe() {
    return m;
}
export function b3() {
    return d;
}
export function nV(e) {
    return p.has(e.includes(":") ? e : `minecraft:${e}`);
}
export function c2(e) {
    let t = e instanceof Error ? e.message : String(e || "");
    if (t.startsWith("MC 方块资源加载失败")) {
        return t;
    }
    if (t) {
        return `MC 方块资源加载失败：${t}`;
    }
    return "MC 方块资源加载失败：网络连接中断，请刷新页面或稍后重试。";
}
export function ae(e) {
    let t = S(e);
    let r = s[t];
    if (r) {
        const n = r;
        let textureIds = Array.from(new Set(n));
        let t = textureIds.map((e)=>h.get(e)).filter((e)=>!!e).sort((e, t)=>t.frameCount - e.frameCount);
        if (!t[0]) {
            return null;
        }
        let l = textureIds.flatMap((e)=>h.get(e)?.regions ?? []);
        return {
            ...t[0],
            textureIds,
            regions: l
        };
    }
    let l = g.get(t);
    return l || null;
}
export function NS(e) {
    return emissionLightMasksByBlockId.get(S(e)) ?? [];
}
function S(e) {
    let r = String(e || "").trim().toLowerCase();
    if (!r) {
        return "minecraft:air";
    }
    let n = r.includes(":") ? r : `minecraft:${r}`;
    return ic[n] ?? n;
}
function C(e) {
    let t = String(e || "").trim().replace(/^#/, "");
    if (t) {
        if (t.includes(":")) {
            return t;
        }
        if (t.includes("/")) {
            return `minecraft:${t}`;
        }
        return "";
    }
    return "";
}
function U(e) {
    return String(e || "").trim().replace(/^minecraft:/, "");
}
function I(e, t) {
    if (e && typeof e === "object") {
        for (let r of (typeof e.model === "string" && t.add(U(e.model)), Object.values(e))){
            I(r, t);
        }
    }
}
function W(e, t) {
    let r = e.trim();
    let n = new Set;
    while(r.startsWith("#")){
        let e = r.slice(1);
        if (n.has(e)) {
            return "";
        }
        n.add(e);
        let l = t[e];
        let a = typeof l === "string" ? l : l?.sprite;
        if (typeof a !== "string") {
            return "";
        }
        r = a.trim();
    }
    return C(r);
}
function A(e, t, r, n, l = new Set) {
    let a = U(e);
    if (!a || l.has(a)) {
        return;
    }
    l.add(a);
    let i = t[a];
    if (!i || typeof i !== "object") {
        return;
    }
    let o = {
        ...i.textures && typeof i.textures === "object" ? i.textures : {},
        ...r
    };
    for (let e of Object.values(o)){
        let t = typeof e === "string" ? e : e?.sprite;
        if (typeof t === "string") {
            let e = W(t, o);
            if (e) {
                n.add(e);
            }
        }
    }
    (function e(t, r, n) {
        if (!t || typeof t !== "object") {
            return;
        }
        let t_texture = t.texture;
        if (typeof t_texture === "string") {
            let e = W(t_texture, r);
            if (e) {
                n.add(e);
            }
        }
        for (let l of Object.values(t)){
            e(l, r, n);
        }
    })(i.elements, o, n);
    if (typeof i.parent === "string") {
        A(i.parent, t, o, n, l);
    }
}
async function P() {
    let M;
    let k;
    let [j, x, O, _, U, W, P, E] = await Promise.all([
        PW("mcmeta/block-definitions.json"),
        PW("mcmeta/block-models.json"),
        PW("mcmeta/atlas-uv.json"),
        O5("mcmeta/atlas.png"),
        PW("mcmeta/block-default-properties.json"),
        PW("mcmeta/legacy-default-properties.json"),
        PW("mcmeta/compat-texture-aliases.json"),
        PW("mcmeta/animation-metadata.json")
    ]);
    let V = new Map;
    for (let [e, t] of Object.entries(j)){
        let r = e.startsWith("minecraft:") ? e : `minecraft:${e}`;
        try {
            let e = t.variants;
            let l = e && Object.hasOwn(e, "") && Object.keys(e).length > 1 ? {
                ...t,
                variants: {
                    ...Object.fromEntries(Object.entries(e).filter(([t])=>t !== "")),
                    "": e[""]
                }
            } : t;
            let a = Ts.fromJson(l);
            V.set(r, a);
        } catch (error) {
            throw Error(`MC 方块资源加载失败：定义解析失败 ${r}`, {
                cause: error
            });
        }
    }
    for (let [e, t] of Object.entries(ic)){
        if (!V.has(e) && V.has(t)) {
            V.set(e, V.get(t));
        }
    }
    let defaultBlockProperties = new Map;
    for (let [e, t] of Object.entries(U)){
        let r = e.startsWith("minecraft:") ? e : `minecraft:${e}`;
        defaultBlockProperties.set(r, t);
    }
    for (let [e, t] of Object.entries(ic)){
        if (!defaultBlockProperties.has(e) && defaultBlockProperties.has(t)) {
            defaultBlockProperties.set(e, {
                ...defaultBlockProperties.get(t)
            });
        }
    }
    let F = new Map;
    for (let [e, t] of Object.entries(x)){
        let r = e.startsWith("minecraft:") ? e : `minecraft:${e}`;
        try {
            let e = zg.fromJson(t);
            F.set(r, e);
        } catch (error) {
            throw Error(`MC 方块资源加载失败：模型解析失败 ${r}`, {
                cause: error
            });
        }
    }
    let flatIconItemIds = ((e)=>{
        let t = new Map;
        for (let [r, n] of Object.entries(e)){
            let e = n?.parent;
            if (typeof e === "string" && e) {
                t.set(c(r), c(e));
            }
        }
        let r = (e, n = 0)=>{
            if (o.has(e)) {
                return true;
            }
            if (n > 8) {
                return false;
            }
            let l = t.get(e);
            return !!l && r(l, n + 1);
        };
        let n = new Set;
        for (let t of Object.keys(e)){
            if (t.startsWith("item/") && r(c(t))) {
                n.add(`minecraft:${t.slice(5)}`);
            }
        }
        return n;
    })(x);
    let blockModels = {
        getBlockModel (e) {
            return F.get(e.toString()) ?? null;
        }
    };
    for (let [e, t] of F){
        try {
            t.flatten(blockModels);
        } catch (error) {
            throw Error(`MC 方块资源加载失败：父模型展开失败 ${e}`, {
                cause: error
            });
        }
    }
    let B = await createImageBitmap(_);
    let L = (e)=>{
        let t = 1;
        while(t < e){
            t <<= 1;
        }
        return t;
    };
    let width = L(B.width);
    let height = L(B.height);
    let J = document.createElement("canvas");
    J.width = width;
    J.height = height;
    try {
        let e = J.getContext("2d");
        if (!e) {
            throw Error("MC 方块资源加载失败：无法读取图集像素");
        }
        e.drawImage(B, 0, 0);
        k = e.getImageData(0, 0, width, height);
    } finally{
        B.close?.();
        J.width = 0;
        J.height = 0;
    }
    y(k.data, width, height, Object.values(O));
    let R = {};
    for (let [e, n] of (p = new Map, Object.entries(O))){
        let l = e.includes(":") ? e : `minecraft:${e}`;
        let a = E[l];
        let i = a ? a.width ?? Math.min(n[2], n[3]) : n[2];
        let o = a ? a.height ?? i : n[3];
        let c = [
            n[0] / width,
            n[1] / height,
            (n[0] + i) / width,
            (n[1] + o) / height
        ];
        R[l] = c;
        p.set(l, {
            textureId: l,
            u0: c[0],
            v0: c[1],
            u1: c[2],
            v1: c[3]
        });
    }
    for (let [e, t] of Object.entries(P)){
        if (!R[t]) {
            throw Error(`兼容纹理校验失败：${t}`);
        }
        R[e] = R[t];
        p.set(e, {
            ...p.get(t),
            textureId: e
        });
    }
    let atlas = new Lw(k, R);
    for (let [e, t] of (h = new Map, Object.entries(O))){
        let r = e.includes(":") ? e : `minecraft:${e}`;
        let n = E[r];
        if (n) {
            let e = n.width ?? Math.min(t[2], t[3]);
            let l = n.height ?? e;
            let frameColumns = t[2] / e;
            let i = frameColumns * t[3] / l;
            let frames = (n.frames ?? Array.from({
                length: i
            }, (e, t)=>t)).map((index)=>{
                if (typeof index === "number") {
                    return {
                        index,
                        ticks: n.frametime ?? 1
                    };
                }
                return {
                    index: index.index,
                    ticks: index.time ?? n.frametime ?? 1
                };
            });
            let c = {
                textureId: r,
                u0: t[0] / width,
                v0: t[1] / height,
                u1: (t[0] + e) / width,
                v1: (t[1] + l) / height,
                frameCount: i,
                vOffsetPerFrame: l / height,
                uOffsetPerFrame: e / width,
                frameColumns,
                frames,
                interpolate: (M = n.interpolate) != null && M
            };
            h.set(r, {
                frameCount: i,
                vOffsetPerFrame: l / height,
                textureIds: [
                    r
                ],
                regions: [
                    c
                ]
            });
        }
    }
    for (let [e, t] of (animatedTexturesByBlockId = ((e, t, r)=>{
        let n = new Map;
        for (let [l, a] of Object.entries(e)){
            let e = new Set;
            I(a, e);
            let i = new Set;
            for (let r of e){
                A(r, t, {}, i);
            }
            let o = [
                ...i
            ].filter((e)=>r.has(e)).sort();
            if (o.length > 0) {
                n.set(S(l), o);
            }
        }
        return n;
    })(j, x, new Set(h.keys())), g = new Map, animatedTexturesByBlockId)){
        let r = t.map((e)=>h.get(e)).filter((e)=>!!e).sort((e, t)=>t.frameCount - e.frameCount);
        if (r[0]) {
            let n = t.flatMap((e)=>h.get(e)?.regions ?? []);
            g.set(e, {
                ...r[0],
                textureIds: t,
                regions: n
            });
        }
    }
    emissionLightMasksByBlockId = ((e, t, r)=>{
        let n = new Map;
        for (let [l, a] of Object.entries(e)){
            let e = new Set;
            I(a, e);
            let i = new Set;
            for (let r of e){
                A(r, t, {}, i);
            }
            let o = new Map;
            for (let e of i){
                let t = ((e, t)=>{
                    let sourceTextureId = C(e);
                    let n = t.get(sourceTextureId);
                    if (!n) {
                        return null;
                    }
                    for (let e of v){
                        let maskTextureId = `${sourceTextureId}${e}`;
                        let a = t.get(maskTextureId);
                        if (a) {
                            return {
                                sourceTextureId,
                                maskTextureId,
                                sourceU0: n.u0,
                                sourceV0: n.v0,
                                sourceU1: n.u1,
                                sourceV1: n.v1,
                                maskU0: a.u0,
                                maskV0: a.v0,
                                maskU1: a.u1,
                                maskV1: a.v1
                            };
                        }
                    }
                    return null;
                })(e, r);
                if (t) {
                    o.set(`${t.sourceTextureId}|${t.maskTextureId}`, t);
                }
            }
            if (o.size > 0) {
                n.set(S(l), Array.from(o.values()));
            }
        }
        return n;
    })(j, x, p);
    let $ = new Uint8Array(k.data.buffer, k.data.byteOffset, k.data.byteLength);
    d = new GYF($, width, height, GWd, OUM);
    d.magFilter = hxR;
    d.minFilter = Cfg;
    d.generateMipmaps = true;
    d.colorSpace = er$;
    d.flipY = false;
    d.needsUpdate = true;
    return m = {
        bundleId,
        legacyDefaultBlockProperties: new Map(Object.entries(W).map(([t, r])=>[
                `minecraft:${t}`,
                r
            ])),
        blockDefinitions: {
            getBlockDefinition (e) {
                return V.get(e.toString()) ?? null;
            }
        },
        blockIds: new Set(V.keys()),
        blockModels,
        atlas,
        defaultBlockProperties,
        animatedTexturesByBlockId,
        emissionLightMasksByBlockId,
        flatIconItemIds,
        alphaSource: {
            width,
            height,
            rgba: k.data,
            animationRegions: Array.from(h.values()).flatMap((e)=>e.regions ?? [])
        }
    };
}
