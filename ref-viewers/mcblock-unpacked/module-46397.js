export let dH = [
    "leaves",
    "glass",
    "slab",
    "stair",
    "fence",
    "wall",
    "pane",
    "door",
    "trapdoor",
    "gate",
    "torch",
    "lantern",
    "chain",
    "candle",
    "flower",
    "allium",
    "orchid",
    "tulip",
    "daisy",
    "cornflower",
    "lily",
    "poppy",
    "dandelion",
    "sunflower",
    "lilac",
    "peony",
    "rose_bush",
    "petal",
    "bluet",
    "dead_bush",
    "pitcher",
    "grass",
    "fern",
    "sapling",
    "bamboo",
    "sugar_cane",
    "cactus",
    "kelp",
    "seagrass",
    "vine",
    "hanging",
    "dripleaf",
    "azalea",
    "spore_blossom",
    "moss_carpet",
    "water",
    "lava",
    "ice",
    "honey_block",
    "slime_block",
    "fire",
    "soul_fire",
    "nether_portal",
    "end_portal",
    "rail",
    "sign",
    "banner",
    "carpet",
    "pressure_plate",
    "button",
    "lever",
    "redstone",
    "repeater",
    "comparator",
    "tripwire",
    "mushroom",
    "fungus",
    "nether_sprouts",
    "nether_wart",
    "roots",
    "propagule",
    "snow_layer",
    "snow",
    "sculk_vein",
    "sculk_sensor",
    "amethyst_cluster",
    "amethyst_bud",
    "pointed_dripstone",
    "lightning_rod",
    "end_rod",
    "iron_bars",
    "coral",
    "sea_pickle",
    "turtle_egg",
    "frogspawn",
    "campfire",
    "soul_campfire",
    "brewing_stand",
    "bell",
    "grindstone",
    "ladder",
    "scaffolding",
    "web",
    "cobweb",
    "head",
    "skull",
    "pot",
    "decorated_pot",
    "armor_stand",
    "crops",
    "wheat",
    "carrots",
    "potatoes",
    "beetroots",
    "melon_stem",
    "pumpkin_stem",
    "sweet_berry",
    "cave_vines",
    "glow_lichen",
    "cocoa",
    "chest",
    "ender_chest",
    "trapped_chest",
    "shulker_box",
    "enchanting_table",
    "anvil",
    "hopper",
    "cauldron",
    "composter",
    "bed",
    "cake",
    "tinted_glass",
    "conduit",
    "red_shrub",
    "sulfur_spike",
    "copper_golem_statue"
];
export let bD = [
    "leaves",
    "vine",
    "hanging",
    "grass",
    "fern",
    "sapling",
    "bamboo",
    "flower",
    "allium",
    "orchid",
    "tulip",
    "daisy",
    "cornflower",
    "lily",
    "poppy",
    "dandelion",
    "sunflower",
    "lilac",
    "peony",
    "rose_bush",
    "petal",
    "bluet",
    "dead_bush",
    "pitcher",
    "sugar_cane",
    "kelp",
    "seagrass",
    "dripleaf",
    "azalea",
    "spore_blossom",
    "mushroom",
    "fungus",
    "nether_sprouts",
    "nether_wart",
    "roots",
    "propagule",
    "coral",
    "crops",
    "wheat",
    "carrots",
    "potatoes",
    "beetroots",
    "sweet_berry",
    "cave_vines",
    "glow_lichen",
    "cocoa",
    "moss_carpet",
    "sculk_vein",
    "cobweb",
    "web",
    "ladder",
    "rail",
    "iron_bars",
    "chain",
    "lantern",
    "torch",
    "campfire",
    "soul_campfire",
    "fire",
    "soul_fire",
    "nether_portal",
    "amethyst_bud",
    "amethyst_cluster",
    "brewing_stand",
    "candle",
    "sign",
    "door",
    "trapdoor",
    "banner",
    "head",
    "skull",
    "tripwire",
    "pressure_plate",
    "button",
    "lever",
    "end_rod",
    "lightning_rod",
    "pointed_dripstone",
    "scaffolding",
    "hopper",
    "carpet"
];
export let cO = [
    "water",
    "ice",
    "glass",
    "tinted_glass",
    "honey_block",
    "slime_block"
];
let n = new Set([
    "fire",
    "soul_fire",
    "redstone_torch",
    "redstone_wall_torch",
    "tripwire_hook",
    "bamboo_shelf"
]);
function l(e) {
    return n.has(e.replace("minecraft:", ""));
}
export { l as d };
let i = new Set([
    "snow_block",
    "packed_ice",
    "blue_ice",
    "redstone_block",
    "red_mushroom_block",
    "brown_mushroom_block",
    "mushroom_stem",
    "coral_block",
    "dead_brain_coral_block",
    "dead_bubble_coral_block",
    "dead_fire_coral_block",
    "dead_horn_coral_block",
    "dead_tube_coral_block",
    "brain_coral_block",
    "bubble_coral_block",
    "fire_coral_block",
    "horn_coral_block",
    "tube_coral_block"
]);
export function a9(e, r) {
    let t = e.replace("minecraft:", "");
    return !i.has(t) && r.some((e)=>t.includes(e));
}
export let nK = [
    "glowstone",
    "sea_lantern",
    "lava",
    "magma_block",
    "shroomlight",
    "jack_o_lantern",
    "soul_lantern",
    "lantern",
    "soul_torch",
    "torch",
    "soul_campfire",
    "campfire",
    "redstone_lamp",
    "end_rod",
    "beacon",
    "conduit",
    "glow_lichen",
    "pearlescent_froglight",
    "verdant_froglight",
    "ochre_froglight",
    "amethyst_cluster",
    "copper_bulb",
    "candle",
    "soul_fire",
    "fire",
    "nether_portal",
    "end_portal",
    "crying_obsidian",
    "respawn_anchor",
    "sculk_catalyst",
    "sculk_sensor",
    "blast_furnace",
    "furnace",
    "smoker",
    "redstone_ore"
];
let f = {
    glowstone: "#ffcc33",
    sea_lantern: "#aaddff",
    lava: "#ff6600",
    magma_block: "#cc4400",
    shroomlight: "#ffaa44",
    jack_o_lantern: "#ff9922",
    soul_lantern: "#55cccc",
    lantern: "#ffbb44",
    soul_torch: "#55cccc",
    torch: "#ffbb44",
    soul_campfire: "#55cccc",
    campfire: "#ff8833",
    redstone_lamp: "#ff6644",
    end_rod: "#eeddff",
    beacon: "#aaeeff",
    conduit: "#66ccdd",
    glow_lichen: "#88cc88",
    pearlescent_froglight: "#eeccff",
    verdant_froglight: "#88ee88",
    ochre_froglight: "#eedd88",
    amethyst_cluster: "#bb88ff",
    copper_bulb: "#ff8855",
    candle: "#ffbb44",
    soul_fire: "#55cccc",
    fire: "#ff6600",
    nether_portal: "#9944ff",
    end_portal: "#6633cc",
    crying_obsidian: "#8844cc",
    respawn_anchor: "#aa44cc",
    sculk_catalyst: "#44bbbb",
    sculk_sensor: "#44bbbb",
    blast_furnace: "#ff7722",
    furnace: "#ff7722",
    smoker: "#ff7722",
    redstone_ore: "#ff3322"
};
let d = [
    "fire_coral",
    "dead_fire_coral",
    "torchflower",
    "end_portal_frame"
];
let u = [
    "redstone_lamp",
    "copper_bulb",
    "soul_campfire",
    "campfire",
    "candle",
    "blast_furnace",
    "furnace",
    "smoker",
    "redstone_ore"
];
let p = {
    lava: 1.35,
    fire: 1.25,
    soul_fire: 1.25,
    nether_portal: 1.2,
    beacon: 1.2,
    conduit: 1.15,
    candle: 0.65,
    glow_lichen: 0.7,
    amethyst_cluster: 0.75,
    sculk_sensor: 0.8,
    sculk_catalyst: 0.8
};
let h = {
    magma_block: {
        threshold: 0.36,
        softness: 0.18
    },
    jack_o_lantern: {
        threshold: 0.46,
        softness: 0.2
    },
    soul_lantern: {
        threshold: 0.38,
        softness: 0.22
    },
    lantern: {
        threshold: 0.62,
        softness: 0.18
    },
    soul_torch: {
        threshold: 0.36,
        softness: 0.22
    },
    torch: {
        threshold: 0.56,
        softness: 0.18
    },
    soul_campfire: {
        threshold: 0.36,
        softness: 0.22
    },
    campfire: {
        threshold: 0.52,
        softness: 0.2
    },
    redstone_lamp: {
        threshold: 0.44,
        softness: 0.22
    },
    end_rod: {
        threshold: 0.32,
        softness: 0.2
    },
    glow_lichen: {
        threshold: 0.42,
        softness: 0.24
    },
    amethyst_cluster: {
        threshold: 0.42,
        softness: 0.22
    },
    copper_bulb: {
        threshold: 0.46,
        softness: 0.2
    },
    candle: {
        threshold: 0.54,
        softness: 0.2
    },
    crying_obsidian: {
        threshold: 0.28,
        softness: 0.22
    },
    respawn_anchor: {
        threshold: 0.36,
        softness: 0.22
    },
    sculk_catalyst: {
        threshold: 0.3,
        softness: 0.24
    },
    sculk_sensor: {
        threshold: 0.3,
        softness: 0.24
    },
    blast_furnace: {
        threshold: 0.5,
        softness: 0.2
    },
    furnace: {
        threshold: 0.5,
        softness: 0.2
    },
    smoker: {
        threshold: 0.48,
        softness: 0.2
    },
    redstone_ore: {
        threshold: 0.48,
        softness: 0.22
    }
};
export function D9(e, r = {}) {
    let t = e.replace("minecraft:", "");
    if (d.some((e)=>t.includes(e))) {
        return m();
    }
    for (let e of nK){
        if (t.includes(e)) {
            if (!((e, r)=>{
                if (e === "respawn_anchor" && r.charges !== undefined) {
                    return Number.parseInt(r.charges, 10) > 0;
                }
                return !u.some((r)=>e.includes(r)) || r.lit === undefined || r.lit === "true";
            })(t, r)) {
                return m();
            }
            let l = h[e];
            return {
                needsEmissive: true,
                color: f[e] ?? null,
                intensityMultiplier: p[e] ?? 1,
                luminanceThreshold: l?.threshold ?? 0,
                luminanceSoftness: l?.softness ?? 0.2
            };
        }
    }
    return m();
}
function m() {
    return {
        needsEmissive: false,
        color: null,
        intensityMultiplier: 1,
        luminanceThreshold: 0,
        luminanceSoftness: 0.2
    };
}
