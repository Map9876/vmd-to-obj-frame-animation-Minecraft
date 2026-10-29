import { PW, w2 } from "./module-13663.js";
import { O5, Yg } from "./module-55671.js";
let l = null;
let i = null;
let o = null;
let c = null;
let s = null;
function f(e) {
    return e.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
let u = {
    "minecraft:grass": "Short Grass",
    "minecraft:tallgrass": "Short Grass"
};
export async function initBlockTextureMapper() {
    if (!l) {
        return s || (s = (async ()=>{
            try {
                let [e, t] = await Promise.all([
                    PW("minecraft_blocks_database.json"),
                    PW("block-face-textures.json")
                ]);
                for (let r of (c = t, l = new Map, i = new Map, o = new Map, e)){
                    let e = {
                        chineseName: r.chinese_name,
                        englishName: r.english_name,
                        textureUrl: w2(`images/${r.image_filename}`),
                        imageFilename: r.image_filename
                    };
                    if (r.minecraft_ids) {
                        for (let t of r.minecraft_ids){
                            if (t.id) {
                                ((e, t, r)=>{
                                    if (!l || !i) {
                                        return;
                                    }
                                    let n = ((e, t)=>{
                                        let a = u[t];
                                        if (a) {
                                            if (f(e.english_name) === f(a)) {
                                                return 1000;
                                            }
                                            return -1;
                                        }
                                        if (e.version === "JE26.3" && e.minecraft_ids?.some((e)=>e.id === t)) {
                                            return 2000;
                                        }
                                        let l = t.replace(/^minecraft:/, "").replace(/\[.*\]$/, "").toLowerCase();
                                        let i = 100 * (f(e.english_name) === l);
                                        if (!e.numeric_id) {
                                            i += 10;
                                        }
                                        if (e.version?.includes("JE1.14")) {
                                            i += 5;
                                        }
                                        return i;
                                    })(t, e);
                                    let a = i.get(e);
                                    if (!l.has(e) || n > (a ?? -1)) {
                                        l.set(e, r);
                                        i.set(e, n);
                                    }
                                })(t.id, r, e);
                            }
                        }
                    }
                    let t = `minecraft:${r.english_name.toLowerCase().replace(/\s+/g, "_")}`;
                    if (!l.has(t)) {
                        l.set(t, e);
                    }
                    if (r.chinese_name && (!o.has(r.chinese_name) || r.version === "JE26.3")) {
                        o.set(r.chinese_name, e);
                    }
                }
                for (let [e, t] of (console.log(`✅ Studio 方块纹理映射已加载: ${l.size} 个 minecraft:id`), Object.entries(u))){
                    let r = l.get(e);
                    if (r && f(r.englishName) !== f(t)) {
                        console.error(`${`❌ 歧义 id 裁决失效: ${e} 期望「${t}」实际「${r.englishName}」`} —— 检查 minecraft_blocks_database.json 里该方块是否已改名/删除`);
                    }
                }
            } catch (error) {
                console.error("❌ 加载方块纹理映射失败:", error);
                l = null;
                i = null;
                o = null;
                c = null;
                s = null;
                throw error;
            }
        })());
    }
}
export function getBlockTexture(e) {
    if (!l) {
        return h(e);
    }
    let t = l.get(e);
    if (t) {
        return t;
    }
    let r = e.replace(/^minecraft:/, "");
    for (let [e, t] of l.entries()){
        if (e.endsWith(`:${r}`)) {
            return t;
        }
    }
    let n = _(e);
    if (n !== e) {
        let e = l.get(n);
        if (e) {
            return e;
        }
    }
    if (o) {
        let t = e.replace(/^minecraft:/, "");
        let r = o.get(t);
        if (r) {
            return r;
        }
    }
    return h(e);
}
export function isBlockTextureMapperReady() {
    return l !== null;
}
export function getBlockFaceTextureUrl(e) {
    if (!c) {
        return null;
    }
    let t = c[e];
    if (t) {
        return w2(`block-textures/${t}`);
    }
    let r = e.replace(/^minecraft:/, "");
    let a = `minecraft:${r}`;
    if (c[a]) {
        return w2(`block-textures/${c[a]}`);
    }
    let l = _(e);
    if (l !== e) {
        let e = c[l];
        if (e) {
            return w2(`block-textures/${e}`);
        }
    }
    return null;
}
export function getAllBlocks(e) {
    if (!l) {
        return [];
    }
    let t = new Set;
    let r = [];
    for (let l of e){
        let blockId = O5(l);
        if (!blockId || !Yg(blockId, e) || t.has(blockId)) {
            continue;
        }
        t.add(blockId);
        let o = getBlockTexture(blockId);
        if (blockId === "minecraft:bubble_column" && o.imageFilename === "Barrier.png") {
            o = {
                ...o,
                imageFilename: "Bubble_Column.png",
                textureUrl: w2("images/Bubble_Column.png")
            };
        } else if (blockId === "minecraft:light" && o.imageFilename === "Barrier.png") {
            o = {
                ...o,
                imageFilename: "Light.png",
                textureUrl: w2("images/Light.png")
            };
        }
        if (o.imageFilename !== "Barrier.png") {
            r.push({
                blockId,
                chineseName: o.chineseName,
                englishName: o.englishName,
                textureUrl: o.textureUrl,
                imageFilename: o.imageFilename,
                category: ((blockId_1)=>{
                    let t = blockId_1.replace(/^minecraft:/, "");
                    if (/(_planks|_log|_wood|_stem|_hyphae)$/.test(t) || t.includes("bamboo")) {
                        return "木材";
                    }
                    if (/(_stone|_bricks?|cobblestone|_brick_|deepslate|tuff|calcite)/.test(t)) {
                        return "石材";
                    }
                    if (/(_ore|iron_|gold_|copper_|netherite|anvil)/.test(t)) {
                        return "金属";
                    }
                    if (/glass/.test(t)) {
                        return "玻璃";
                    }
                    if (/(wool|carpet|bed|banner|candle|_dye)/.test(t)) {
                        return "装饰";
                    }
                    if (/(grass|dirt|sand|gravel|clay|mud|moss|leaves|snow|ice|water|lava)/.test(t)) {
                        return "自然";
                    }
                    if (/(concrete|terracotta|glazed)/.test(t)) {
                        return "混凝土";
                    }
                    return "其他";
                })(blockId)
            });
        }
    }
    r.sort((e, t)=>e.chineseName.localeCompare(t.chineseName, "zh"));
    return r;
}
function _(e) {
    return e.replace(/_wall$/, "").replace(/_slab$/, "").replace(/_stairs$/, "").replace(/_fence$/, "").replace(/_fence_gate$/, "").replace(/_door$/, "").replace(/_trapdoor$/, "").replace(/_button$/, "").replace(/_pressure_plate$/, "").replace(/_sign$/, "").replace(/_wall_sign$/, "");
}
function h(e) {
    let t = e.replace(/^minecraft:/, "").replace(/_/g, " ").replace(/\b\w/g, (e)=>e.toUpperCase());
    return {
        chineseName: t,
        englishName: t,
        textureUrl: w2("images/Barrier.png"),
        imageFilename: "Barrier.png"
    };
}
