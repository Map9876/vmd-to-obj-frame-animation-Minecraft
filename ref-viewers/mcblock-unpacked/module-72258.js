export let QE = {
    residential: "住宅",
    commercial: "商业建筑",
    castle_tower: "城堡与塔楼",
    public_production: "公共与生产设施",
    landscape_component: "庭院景观与构件",
    settlement_scene: "聚落与综合场景",
    vehicle_transport: "交通载具",
    sculpture_figure: "雕塑与造型",
    plant_nature: "植物与自然",
    interior_sample: "独立内饰样板",
    general_building: "楼宇与场馆"
};
export let rY = {
    medieval: "中世纪",
    modern: "现代",
    chinese: "中式",
    japanese: "日式",
    european: "欧式",
    fantasy: "幻想",
    industrial: "工业",
    scifi: "科幻",
    desert: "沙漠",
    western: "西部",
    ancient: "古文明",
    rustic: "乡村田园",
    minimal: "简约"
};
export let a0 = {
    unknown: "未确认",
    present: "确认含内饰",
    absent: "确认无内饰",
    not_applicable: "内饰不适用"
};
export let Ke = {
    beginner: "新手入门",
    intermediate: "进阶挑战",
    advanced: "高阶建筑",
    expert: "大师级"
};
export let Gv = {
    courtyard: "庭院",
    farmland: "农田"
};
export let mX = {
    recommended: "推荐",
    latest: "最新",
    popular: "热门",
    blocks: "方块数",
    area: "占地",
    layers: "建筑高度",
    "most-learned": "学习次数"
};
export class P3 extends Error {
    constructor(e, t = 400, r = "DISCOVERY_INVALID"){
        super(e);
        this.status = t;
        this.code = r;
        this.name = "DiscoveryError";
    }
}
let d = (e, t)=>Object.hasOwn(e, t);
function u(e) {
    if (typeof e !== "string") {
        return null;
    }
    let t = {
        easy: "beginner",
        medium: "intermediate",
        hard: "advanced",
        master: "expert"
    };
    let r = d(t, e) ? t[e] : e;
    if (d(Ke, r)) {
        return r;
    }
    return null;
}
function h(e, t, r) {
    if (e == null || e === "") {
        return [];
    }
    let a = Array.isArray(e) ? e : String(e).split(",");
    if (a.length > 20 || a.some((e)=>typeof e !== "string" || !d(t, e))) {
        throw new P3(`${r}条件不正确`);
    }
    return Object.keys(t).filter((e)=>a.includes(e));
}
function m(e) {
    if (e == null || e === "") {
        return null;
    }
    let t = Number(e);
    if (!Number.isSafeInteger(t) || t < 0 || t > 1000000000) {
        throw new P3("体量范围不正确");
    }
    return t;
}
export function hv(x = {}) {
    let search = String(x.search ?? "").trim();
    if (search.length > 100) {
        throw new P3("搜索内容太长");
    }
    let scope = x.scope ?? "all";
    let sort = x.sort ?? "recommended";
    if (String(scope) === "submissions") {
        throw new P3("投稿筛选已移除，请改用全部建筑或精选");
    }
    if (![
        "all",
        "featured"
    ].includes(scope) || !d(mX, sort)) {
        throw new P3("范围或排序条件不正确");
    }
    let primaryType = x.primaryType || null;
    if (primaryType && !d(QE, primaryType)) {
        throw new P3("建筑类型条件不正确");
    }
    let y = (x.difficulties ?? []).map(u);
    if (y.some((e)=>e === null)) {
        throw new P3("难度条件不正确");
    }
    let w = x.versions ?? [];
    if (!Array.isArray(w) || w.length > 20 || w.some((e)=>typeof e !== "string" || e !== "unknown" && !/^\d{1,2}\.\d{1,2}$/.test(e))) {
        throw new P3("投影版本条件不正确");
    }
    let j = {
        search,
        scope,
        sort,
        primaryType,
        versions: [
            ...new Set(w)
        ].sort(),
        styles: h(x.styles, rY, "风格"),
        difficulties: h(y, Ke, "难度"),
        features: h(x.features, Gv, "特点"),
        interiorOnly: x.interiorOnly === true,
        teachingOnly: x.teachingOnly === true,
        minBlocks: m(x.minBlocks),
        maxBlocks: m(x.maxBlocks),
        maxWidth: m(x.maxWidth),
        maxDepth: m(x.maxDepth),
        legacyCategory: x.legacyCategory || null,
        legacyTag: x.legacyTag || null,
        authorId: x.authorId || null
    };
    if (j.minBlocks !== null && j.maxBlocks !== null && j.minBlocks > j.maxBlocks) {
        throw new P3("最少方块不能超过最多方块范围");
    }
    if ([
        j.legacyCategory,
        j.legacyTag,
        j.authorId
    ].some((e)=>e && e.length > 100)) {
        throw new P3("旧筛选条件不正确");
    }
    return {
        ...j,
        versions: [
            ...new Set(w)
        ].sort()
    };
}
export function Dl(e) {
    let u = typeof e === "string" ? new URLSearchParams(e) : e;
    let h = new Set([
        "search",
        "q",
        "scope",
        "sort",
        "type",
        "styles",
        "difficulty",
        "mcVersions",
        "features",
        "interior",
        "teaching",
        "minBlocks",
        "maxBlocks",
        "maxWidth",
        "maxDepth",
        "category",
        "tag",
        "authorId",
        "page",
        "snapshot",
        "cursor",
        "asOf",
        "version",
        "limit",
        "preview"
    ]);
    for (let e of u.keys()){
        if (!h.has(e)) {
            throw new P3(`不支持的筛选条件：${e}`);
        }
    }
    for (let e of h){
        if (u.getAll(e).length > 1) {
            throw new P3(`筛选条件不能重复：${e}`);
        }
    }
    for (let e of [
        "interior",
        "teaching"
    ]){
        if (u.has(e) && ![
            "0",
            "1"
        ].includes(u.get(e))) {
            throw new P3("能力条件不正确");
        }
    }
    let difficulties = (u.get("difficulty") ?? "").split(",").filter((e)=>e && e !== "all");
    let filters = hv({
        search: u.get("search") ?? u.get("q") ?? "",
        scope: u.get("scope") ?? "all",
        sort: u.get("sort") ?? "recommended",
        primaryType: u.get("type"),
        styles: u.get("styles")?.split(",").filter(Boolean),
        difficulties,
        versions: u.get("mcVersions")?.split(",").filter(Boolean),
        features: u.get("features")?.split(",").filter(Boolean),
        interiorOnly: u.get("interior") === "1",
        teachingOnly: u.get("teaching") === "1",
        minBlocks: u.get("minBlocks"),
        maxBlocks: u.get("maxBlocks"),
        maxWidth: u.get("maxWidth"),
        maxDepth: u.get("maxDepth"),
        legacyCategory: u.get("category") === "all" ? null : u.get("category"),
        legacyTag: u.get("tag") === "all" ? null : u.get("tag"),
        authorId: u.get("authorId")
    });
    let legacyPage = Number(u.get("page") ?? 1);
    if (!Number.isSafeInteger(legacyPage) || legacyPage < 1 || legacyPage > 100) {
        throw new P3("旧页码不正确");
    }
    return {
        filters,
        warnings: [],
        legacyPage
    };
}
export function bb(e) {
    let t = hv(e);
    let r = new URLSearchParams;
    for (let [e, a] of (t.search && r.set("search", t.search), t.scope !== "all" && r.set("scope", t.scope), t.sort !== "recommended" && r.set("sort", t.sort), t.primaryType && r.set("type", t.primaryType), [
        [
            "styles",
            t.styles
        ],
        [
            "difficulty",
            t.difficulties
        ],
        [
            "mcVersions",
            t.versions
        ],
        [
            "features",
            t.features
        ]
    ])){
        if (a.length) {
            r.set(e, a.join(","));
        }
    }
    for (let e of (t.interiorOnly && r.set("interior", "1"), t.teachingOnly && r.set("teaching", "1"), [
        "minBlocks",
        "maxBlocks",
        "maxWidth",
        "maxDepth"
    ])){
        if (t[e] !== null) {
            r.set(e, String(t[e]));
        }
    }
    for (let [e, a] of [
        [
            "category",
            t.legacyCategory
        ],
        [
            "tag",
            t.legacyTag
        ],
        [
            "authorId",
            t.authorId
        ]
    ]){
        if (a) {
            r.set(e, a);
        }
    }
    if (r.size) {
        return `?${r.toString()}`;
    }
    return "";
}
