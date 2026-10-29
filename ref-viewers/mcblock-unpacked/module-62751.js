let r = Object.freeze({
    maxDepth: 32,
    maxUnits: 3000000,
    weights: Object.freeze({
        entry: 1,
        scalar: 1,
        long: 2,
        string: 2,
        array: 2,
        list: 4,
        compound: 4
    }),
    stringBytesPerUnit: 64
});
export let MI = {
    maxUploadBytes: 10485760,
    maxInflatedBytes: 67108864,
    maxSizeX: 300,
    maxSizeY: 200,
    maxSizeZ: 300,
    maxVolumeCells: 18000000,
    maxBlocks: 400000,
    perUserPending: 10,
    nameMax: 30,
    authorMax: 20,
    homeUrlMax: 200,
    rejectNoteMax: 100,
    coverMaxBytes: 31457280,
    emailTokenTtlMs: 1800000,
    codeAttemptsMax: 8,
    codeAttemptsWindowMs: 600000,
    inspectFailMax: 10,
    inspectFailWindowMs: 600000,
    nbtMaxDepth: r.maxDepth,
    nbtMaxUnits: r.maxUnits,
    nbtLitematicMaxUnits: 4000000,
    nbtWeights: r.weights,
    nbtStringBytesPerUnit: r.stringBytesPerUnit
};
export let S6 = [
    "space.bilibili.com",
    "b23.tv",
    "www.douyin.com",
    "v.douyin.com",
    "www.kuaishou.com",
    "v.kuaishou.com"
];
export function r9(e) {
    let r = /\.([a-z]+)$/i.exec(e.trim())?.[1]?.toLowerCase();
    if (r === "litematic" || r === "schem") {
        return r;
    }
    return null;
}
let o = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function e0(e) {
    if (typeof e !== "string") {
        return null;
    }
    let t = e.trim().toLowerCase();
    if (t.length <= 254 && o.test(t)) {
        return t;
    }
    return null;
}
let s = [
    {
        below: 4000,
        value: "beginner"
    },
    {
        below: 9000,
        value: "intermediate"
    },
    {
        below: 20000,
        value: "advanced"
    },
    {
        below: null,
        value: "expert"
    }
];
export function JC(e) {
    return s.find((t)=>t.below === null || e < t.below).value;
}
export let Ih = {
    not_original: "不是本人作品，也没有原作者授权",
    duplicate: "和建筑库里已有的建筑重复",
    inappropriate: "名称或画面含不适宜的内容",
    broken_file: "文件有问题，打开后不完整",
    other: "其他原因"
};
export function jP(e, t) {
    let n;
    if (typeof e !== "string" || !Object.hasOwn(Ih, e)) {
        return null;
    }
    n = MI.rejectNoteMax;
    let r = typeof t !== "string" ? "" : Array.from(Array.from(t).filter((e)=>{
        let t = e.charCodeAt(0);
        return t >= 32 && t !== 127;
    }).join("").replace(/[<>]/g, "").replace(/\s+/g, " ").trim()).slice(0, n).join("");
    if (!r) {
        return null;
    }
    let i = Ih[e];
    return `${i}：${r}`;
}
