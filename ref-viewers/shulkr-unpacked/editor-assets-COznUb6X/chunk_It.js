export const It = 1.5;
export const Lt = 0.000001;
export const Rt = new Set(`minecraft:flower.minecraft:tall_flower.minecraft:double_plant.minecraft:tall_grass.minecraft:short_dry_grass.minecraft:tall_dry_grass.minecraft:dry_vegetation.minecraft:bush.minecraft:sapling.minecraft:bamboo_sapling.minecraft:mangrove_propagule.minecraft:mushroom.minecraft:nether_fungus.minecraft:nether_roots.minecraft:nether_sprouts.minecraft:nether_wart.minecraft:wither_rose.minecraft:eyeblossom.minecraft:cactus_flower.minecraft:firefly_bush.minecraft:crop.minecraft:carrot.minecraft:potato.minecraft:beetroot.minecraft:torchflower_crop.minecraft:pitcher_crop.minecraft:stem.minecraft:attached_stem.minecraft:sugar_cane.minecraft:flower_bed.minecraft:leaf_litter.minecraft:spore_blossom.minecraft:small_dripleaf.minecraft:big_dripleaf_stem.minecraft:seagrass.minecraft:tall_seagrass.minecraft:kelp.minecraft:kelp_plant.minecraft:frogspawn.minecraft:coral_plant.minecraft:coral_fan.minecraft:coral_wall_fan.minecraft:base_coral_plant.minecraft:base_coral_fan.minecraft:base_coral_wall_fan.minecraft:vine.minecraft:twisting_vines.minecraft:twisting_vines_plant.minecraft:weeping_vines.minecraft:weeping_vines_plant.minecraft:cave_vines.minecraft:cave_vines_plant.minecraft:hanging_roots.minecraft:hanging_moss.minecraft:glow_lichen.minecraft:sculk_vein.minecraft:multiface.minecraft:rail.minecraft:powered_rail.minecraft:detector_rail.minecraft:redstone_wire.minecraft:button.minecraft:pressure_plate.minecraft:weighted_pressure_plate.minecraft:lever.minecraft:tripwire.minecraft:trip_wire_hook.minecraft:torch.minecraft:wall_torch.minecraft:redstone_torch.minecraft:redstone_wall_torch.minecraft:standing_sign.minecraft:wall_sign.minecraft:ceiling_hanging_sign.minecraft:wall_hanging_sign.minecraft:banner.minecraft:wall_banner.minecraft:air.minecraft:liquid.minecraft:fire.minecraft:soul_fire.minecraft:nether_portal.minecraft:end_portal.minecraft:end_gateway.minecraft:structure_void.minecraft:light.minecraft:bubble_column.minecraft:moving_piston.minecraft:web.minecraft:powder_snow`.split(`.`));
export const zt = 3 / 16;
export const Bt = new Set([
    `minecraft:fence`,
    `minecraft:wall`,
    `minecraft:fence_gate`
]);
export function rn(e, t, n, r) {
    return {
        minX: t < 0 ? e.minX + t : e.minX,
        minY: n < 0 ? e.minY + n : e.minY,
        minZ: r < 0 ? e.minZ + r : e.minZ,
        maxX: t > 0 ? e.maxX + t : e.maxX,
        maxY: n > 0 ? e.maxY + n : e.maxY,
        maxZ: r > 0 ? e.maxZ + r : e.maxZ
    };
}
const an = (e, t)=>e.minX < t.maxX && e.maxX > t.minX && e.minY < t.maxY && e.maxY > t.minY && e.minZ < t.maxZ && e.maxZ > t.minZ;
export function on(e, t) {
    let n = [];
    let r = Math.floor(t.minX);
    let i = Math.floor(t.maxX);
    let a = Math.floor(t.minY - (It - 1));
    let o = Math.floor(t.maxY);
    let s = Math.floor(t.minZ);
    let c = Math.floor(t.maxZ);
    for(let l = r; l <= i; l++){
        for(let r = a; r <= o; r++){
            for(let i = s; i <= c; i++){
                let a = e.boxesAt(l, r, i);
                if (a !== null) {
                    for (let e of a){
                        let a = {
                            minX: l + e[0],
                            minY: r + e[1],
                            minZ: i + e[2],
                            maxX: l + e[3],
                            maxY: r + e[4],
                            maxZ: i + e[5]
                        };
                        if (an(a, t)) {
                            n.push(a);
                        }
                    }
                }
            }
        }
    }
    return n;
}
export function sn(e, t) {
    return on(e, t).length > 0;
}
