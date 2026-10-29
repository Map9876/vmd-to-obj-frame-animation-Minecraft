import { qE } from "./module-19023.js";
import { Q1 } from "./module-13402.js";
let i = [
    124 / 255,
    189 / 255,
    107 / 255
];
let a = Q1.intToRgb(6396257);
let o = Q1.intToRgb(8431445);
let u = Q1.intToRgb(4764952);
let c = Q1.intToRgb(4159204);
let h = Q1.intToRgb(2129968);
let l = (e)=>[
        e / 8,
        1 - e / 32,
        e / 64
    ];
export let I = {
    large_fern: ()=>i,
    tall_grass: ()=>i,
    grass_block: ()=>i,
    fern: ()=>i,
    grass: ()=>i,
    short_grass: ()=>i,
    potted_fern: ()=>i,
    pink_petals: ()=>i,
    wildflowers: ()=>i,
    bush: ()=>i,
    spruce_leaves: ()=>a,
    birch_leaves: ()=>o,
    oak_leaves: ()=>u,
    jungle_leaves: ()=>u,
    acacia_leaves: ()=>u,
    dark_oak_leaves: ()=>u,
    vine: ()=>u,
    mangrove_leaves: ()=>u,
    water: ()=>c,
    bubble_column: ()=>c,
    cauldron: ()=>c,
    water_cauldron: ()=>c,
    redstone_wire: (e)=>((e)=>{
            let t = e / 15;
            let r = qE(t * t * 0.7 - 0.5, 0, 1);
            let n = qE(t * t * 0.6 - 0.7, 0, 1);
            return [
                0.6 * t + (t > 0 ? 0.4 : 0.3),
                r,
                n
            ];
        })(parseInt(e.power ?? "0")),
    sugar_cane: ()=>i,
    attached_melon_stem: ()=>l(7),
    attached_pumpkin_stem: ()=>l(7),
    melon_stem: (e)=>l(parseInt(e.age ?? "0")),
    pumpkin_stem: (e)=>l(parseInt(e.age ?? "0")),
    lily_pad: ()=>h
};
