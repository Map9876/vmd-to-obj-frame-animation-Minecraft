export let Xn = {
    armor_stand: "盔甲架",
    minecart: "矿车",
    boat: "船",
    item_frame: "展示框",
    painting: "画",
    display: "展示实体",
    block_display: "方块展示实体",
    item_display: "物品展示实体",
    text_display: "文字展示实体",
    falling_block: "下落方块",
    tnt: "TNT",
    end_crystal: "末地水晶",
    leash_knot: "拴绳结",
    marker: "标记实体",
    interaction: "交互实体",
    generic: "未细分实体"
};
export function fl(e) {
    return x6(e.customName) || Xn[e.kind] || "实体";
}
export function x6(e) {
    if (!e) {
        return "";
    }
    let t = e.trim();
    if (!t) {
        return "";
    }
    try {
        let e = JSON.parse(t);
        if (typeof e === "string") {
            return e;
        }
        if (e && typeof e === "object" && typeof e.text === "string") {
            return e.text;
        }
    } catch (e) {}
    return t;
}
export function IO(e) {
    return e.map((e)=>{
        if (Number.isInteger(e)) {
            return String(e);
        }
        return e.toFixed(2);
    }).join(", ");
}
