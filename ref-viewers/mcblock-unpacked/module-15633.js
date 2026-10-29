import { fl, x6 } from "./module-73975.js";
import { lP, nI } from "./module-87829_2.js";
let l = [
    [
        "head",
        "头部"
    ],
    [
        "chest",
        "胸部"
    ],
    [
        "legs",
        "腿部"
    ],
    [
        "feet",
        "脚部"
    ],
    [
        "mainHand",
        "主手"
    ],
    [
        "offHand",
        "副手"
    ]
];
let i = (e)=>e.replace(/^minecraft:/, "");
export function v(e, t) {
    let v = (e)=>t(e) ?? i(e);
    if (e.kind === "generic") {
        let iconItemId = `minecraft:${i(e.entityId)}_spawn_egg`;
        let a = t(iconItemId)?.replace(/刷怪蛋$/, "");
        return {
            title: x6(e.customName) || a || i(e.entityId),
            entityId: e.entityId,
            iconItemId,
            groups: []
        };
    }
    let groups = [];
    let I = (e, value, mono)=>{
        groups.push({
            rows: [
                mono ? {
                    label: e,
                    value,
                    mono
                } : {
                    label: e,
                    value
                }
            ]
        });
    };
    let N = e.itemFrame?.item?.itemId;
    if (N) {
        I("框内物品", v(N));
    }
    let S = e.armorStand?.equipment;
    if (S) {
        let rows = l.filter(([t])=>S[t]).map(([t, r])=>({
                label: r,
                value: v(S[t])
            }));
        if (rows.length > 0) {
            groups.push({
                label: "装备",
                rows
            });
        }
    }
    let C = e.painting?.variant ?? e.painting?.motive;
    if (C) {
        let t = e.painting?.size;
        I("画作", t ? `${i(C)} · ${t[0]}×${t[1]}` : i(C), true);
    }
    if (e.kind === "minecart") {
        let t = lP(e);
        if (t.length > 0) {
            groups.push({
                rows: t.map((e)=>({
                        label: "装载",
                        value: v(e)
                    }))
            });
        }
    }
    let $ = e.blockDisplay?.blockState?.blockId ?? e.fallingBlock?.blockId;
    if ($) {
        I("方块", v($));
    }
    let E = e.itemDisplay?.item?.itemId;
    if (E) {
        I("物品", v(E));
    }
    let j = e.textDisplay?.text?.trim();
    if (j) {
        I("文字", j);
    }
    return {
        title: fl(e),
        entityId: e.entityId,
        iconItemId: nI(e),
        groups
    };
}
