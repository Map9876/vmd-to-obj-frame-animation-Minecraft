let n = {
    "minecraft:snow": "layers",
    "minecraft:sea_pickle": "pickles",
    "minecraft:turtle_egg": "eggs",
    "minecraft:pink_petals": "flower_amount"
};
export function c(e, t) {
    if (!t) {
        return 1;
    }
    if (e.endsWith("_slab") && t.type === "double") {
        return 2;
    }
    let i = e.endsWith("candle") ? t.candles : undefined;
    let s = n[e];
    let r = i ?? (s ? t[s] : undefined);
    if (r == null) {
        return 1;
    }
    let l = Number.parseInt(r, 10);
    if (Number.isFinite(l) && l > 1) {
        return l;
    }
    return 1;
}
