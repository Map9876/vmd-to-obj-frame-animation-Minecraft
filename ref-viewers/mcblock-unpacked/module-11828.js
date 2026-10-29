import "./module-86897.js";
import { useEffect, useMemo, useState } from "./module-61426.js";
import { $EB, GOR, G_z, LoY, O9p, PTz, Pq0, Q1f, Tap, V9B, bdM, cj9, er$, ghU, hB5 as side, hxR, iNn, kn4, qtW } from "./module-85339.js";
import { D } from "./module-59040.js";
import { E as E_1 } from "./module-46923.js";
import { gw } from "./module-82084.js";
import { nV } from "./module-37578.js";
import { hG, hu, qA } from "./module-8652.js";
import { fu } from "./module-65227.js";
import * as h from "./module-15409.js";
import { n } from "./module-78356.js";
import { IO } from "./module-46422.js";
import { f } from "./module-56624.js";
import { Pc, Xq, _, fH, iw } from "./module-85336.js";
import { cw } from "./module-28857.js";
import { B } from "./module-88124.js";
import { Cx } from "./module-18514.js";
import { d0 } from "./module-79812.js";
import { NR, On, YY } from "./module-25145.js";
import { hL, w2 } from "./module-13663.js";
let c = 1 / 32;
let m = 1 / 64;
let x = {
    scale: [
        0.5,
        0.5,
        0.5
    ]
};
let g = Math.PI / 180;
function p(e) {
    switch(e){
        case "north":
            return [
                0,
                Math.PI,
                0
            ];
        case "east":
            return [
                0,
                Math.PI / 2,
                0
            ];
        case "west":
            return [
                0,
                -Math.PI / 2,
                0
            ];
        case "up":
            return [
                -Math.PI / 2,
                0,
                0
            ];
        case "down":
            return [
                Math.PI / 2,
                0,
                0
            ];
        default:
            return [
                0,
                0,
                0
            ];
    }
}
function b(e) {
    let i = e.itemId === "minecraft:filled_map" ? e.itemRotation % 4 * 2 : e.itemRotation;
    let r = new kn4().makeTranslation(0, 0, c).multiply(new kn4().makeRotationZ(-(45 * i) * g));
    if (e.kind === "flat") {
        return r.multiply(new kn4().makeTranslation(0, 0, m));
    }
    return r.multiply(new kn4().makeRotationY(Math.PI)).multiply(new kn4().makeScale(0.5, 0.5, 0.5)).multiply(((e)=>{
        let t = e?.translation ?? [
            0,
            0,
            0
        ];
        let s = e?.rotation ?? [
            0,
            0,
            0
        ];
        let a = e?.scale ?? [
            1,
            1,
            1
        ];
        return new kn4().compose(new Pq0(t[0] / 16, t[1] / 16, t[2] / 16), new PTz().setFromEuler(new O9p(s[0] * g, s[1] * g, s[2] * g, "XYZ")), new Pq0(a[0], a[1], a[2]));
    })(e.fixed ?? x)).multiply(new kn4().makeTranslation(-0.5, -0.5, -0.5));
}
let release = ()=>{};
let v = new WeakMap;
let C = new WeakMap;
function z(e, o) {
    let i = Object.keys(o).sort().map((e)=>`${e}=${o[e]}`);
    if (i.length > 0) {
        return `${e}[${i.join(",")}]`;
    }
    return e;
}
function P(e, o, i, r) {
    let t = e.get(o);
    if (!t) {
        let r = i();
        if (!r) {
            return {
                value: null,
                release
            };
        }
        t = {
            value: r,
            refs: 0,
            disposeTimer: null
        };
        e.set(o, t);
    }
    if (t.disposeTimer) {
        clearTimeout(t.disposeTimer);
        t.disposeTimer = null;
    }
    t.refs += 1;
    let n = t;
    let s = false;
    return {
        value: n.value,
        release: ()=>{
            if (!s) {
                s = true;
                n.refs = Math.max(0, n.refs - 1);
                if (!(n.refs > 0)) {
                    n.disposeTimer = setTimeout(()=>{
                        if (!(n.refs > 0 || e.get(o) !== n)) {
                            e.delete(o);
                            r(n.value);
                        }
                    }, 0);
                }
            }
        }
    };
}
function w(e, o, resources, r) {
    let s = v.get(resources);
    if (!s) {
        s = new Map;
        v.set(resources, s);
    }
    let a = P(s, `${resources.bundleId ?? "legacy"}|render-compat-v1|${z(e, n(e, o, resources))}`, ()=>{
        try {
            return qA(e, o, resources);
        } catch (e) {
            return null;
        }
    }, (e)=>e.dispose());
    if (r?.rejectMagentaFallback && a.value?.userData.magentaFallback) {
        a.release();
        return {
            value: null,
            release
        };
    }
    return a;
}
function k(e, o, atlasTexture, r) {
    let s = C.get(atlasTexture);
    if (!s) {
        s = new Map;
        C.set(atlasTexture, s);
    }
    let a = r?.userData.alphaClasses ?? [
        "legacy"
    ];
    let d = !!r?.userData.classifiedFromAtlas;
    return P(s, `${z(e, o)}|${d}:${a.join(",")}`, ()=>{
        let r = h.T(e, o);
        let t = a.map((e)=>fu({
                kind: "lambert",
                atlasTexture,
                visualProfile: h.a(r, d ? e : "legacy"),
                defaultSide: $EB
            }));
        if (t.length === 1) {
            return t[0];
        }
        return t;
    }, (e)=>(Array.isArray(e) ? e : [
            e
        ]).forEach((e)=>e.dispose()));
}
let j = {
    ancient_debris: "minecraft:block/ancient_debris_side",
    azalea: "minecraft:block/azalea_side",
    barrel: "minecraft:block/barrel_side",
    basalt: "minecraft:block/basalt_side",
    bee_nest: "minecraft:block/bee_nest_front",
    beehive: "minecraft:block/beehive_front",
    big_dripleaf: "minecraft:block/big_dripleaf_side",
    blast_furnace: "minecraft:block/blast_furnace_side",
    bone_block: "minecraft:block/bone_block_side",
    cactus: "minecraft:block/cactus_side",
    calibrated_sculk_sensor: "minecraft:block/sculk_sensor_side",
    cartography_table: "minecraft:block/cartography_table_top",
    chain_command_block: "minecraft:block/chain_command_block_side",
    chipped_anvil: "minecraft:block/chipped_anvil_top",
    chiseled_bookshelf: "minecraft:block/chiseled_bookshelf_side",
    command_block: "minecraft:block/command_block_side",
    composter: "minecraft:block/composter_side",
    copper_golem_statue: "minecraft:block/copper_block",
    crafter: "minecraft:block/crafter_north",
    crafting_table: "minecraft:block/crafting_table_front",
    damaged_anvil: "minecraft:block/damaged_anvil_top",
    daylight_detector: "minecraft:block/daylight_detector_side",
    decorated_pot: "minecraft:entity/decorated_pot/decorated_pot_side",
    dirt_path: "minecraft:block/dirt_path_side",
    dispenser: "minecraft:block/dispenser_front",
    dried_ghast: "minecraft:block/dried_ghast_hydration_0_top",
    dried_kelp_block: "minecraft:block/dried_kelp_side",
    dropper: "minecraft:block/dropper_front",
    enchanting_table: "minecraft:block/enchanting_table_top",
    end_portal_frame: "minecraft:block/end_portal_frame_side",
    exposed_copper_golem_statue: "minecraft:block/exposed_copper",
    fletching_table: "minecraft:block/fletching_table_front",
    flowering_azalea: "minecraft:block/flowering_azalea_side",
    furnace: "minecraft:block/furnace_side",
    grass_block: "minecraft:block/grass_block_side",
    grindstone: "minecraft:block/grindstone_side",
    hay_block: "minecraft:block/hay_block_side",
    heavy_weighted_pressure_plate: "minecraft:block/gold_block",
    honey_block: "minecraft:block/honey_block_side",
    infested_chiseled_stone_bricks: "minecraft:block/chiseled_stone_bricks",
    infested_cobblestone: "minecraft:block/cobblestone",
    infested_cracked_stone_bricks: "minecraft:block/cracked_stone_bricks",
    infested_deepslate: "minecraft:block/deepslate",
    infested_mossy_stone_bricks: "minecraft:block/mossy_stone_bricks",
    infested_stone: "minecraft:block/stone",
    infested_stone_bricks: "minecraft:block/stone_bricks",
    jigsaw: "minecraft:block/jigsaw_top",
    jukebox: "minecraft:block/jukebox_top",
    large_fern: "minecraft:block/large_fern_top",
    lectern: "minecraft:block/lectern_front",
    light_weighted_pressure_plate: "minecraft:block/iron_block",
    lilac: "minecraft:block/lilac_top",
    lodestone: "minecraft:block/lodestone_side",
    loom: "minecraft:block/loom_front",
    magma_block: "minecraft:block/magma",
    mangrove_roots: "minecraft:block/mangrove_roots_side",
    melon: "minecraft:block/melon_side",
    muddy_mangrove_roots: "minecraft:block/muddy_mangrove_roots_side",
    mycelium: "minecraft:block/mycelium_side",
    observer: "minecraft:block/observer_front",
    ochre_froglight: "minecraft:block/ochre_froglight_side",
    oxidized_copper_golem_statue: "minecraft:block/oxidized_copper",
    pearlescent_froglight: "minecraft:block/pearlescent_froglight_side",
    peony: "minecraft:block/peony_top",
    petrified_oak_slab: "minecraft:block/oak_planks",
    piston: "minecraft:block/piston_top",
    podzol: "minecraft:block/podzol_side",
    polished_basalt: "minecraft:block/polished_basalt_side",
    pumpkin: "minecraft:block/pumpkin_side",
    quartz_block: "minecraft:block/quartz_block_side",
    quartz_slab: "minecraft:block/quartz_block_side",
    quartz_stairs: "minecraft:block/quartz_block_side",
    reinforced_deepslate: "minecraft:block/reinforced_deepslate_side",
    repeating_command_block: "minecraft:block/repeating_command_block_side",
    respawn_anchor: "minecraft:block/respawn_anchor_side0",
    rose_bush: "minecraft:block/rose_bush_top",
    scaffolding: "minecraft:block/scaffolding_side",
    sculk_catalyst: "minecraft:block/sculk_catalyst_side",
    sculk_sensor: "minecraft:block/sculk_sensor_side",
    sculk_shrieker: "minecraft:block/sculk_shrieker_side",
    small_dripleaf: "minecraft:block/small_dripleaf_top",
    smithing_table: "minecraft:block/smithing_table_front",
    smoker: "minecraft:block/smoker_side",
    smooth_quartz: "minecraft:block/quartz_block_bottom",
    smooth_quartz_slab: "minecraft:block/quartz_block_bottom",
    smooth_quartz_stairs: "minecraft:block/quartz_block_bottom",
    smooth_red_sandstone: "minecraft:block/red_sandstone_top",
    smooth_red_sandstone_slab: "minecraft:block/red_sandstone_top",
    smooth_red_sandstone_stairs: "minecraft:block/red_sandstone_top",
    smooth_sandstone: "minecraft:block/sandstone_top",
    smooth_sandstone_slab: "minecraft:block/sandstone_top",
    smooth_sandstone_stairs: "minecraft:block/sandstone_top",
    snow_block: "minecraft:block/snow",
    sticky_piston: "minecraft:block/piston_top_sticky",
    stonecutter: "minecraft:block/stonecutter_side",
    sunflower: "minecraft:block/sunflower_front",
    suspicious_gravel: "minecraft:block/suspicious_gravel_0",
    suspicious_sand: "minecraft:block/suspicious_sand_0",
    tall_grass: "minecraft:block/tall_grass_top",
    target: "minecraft:block/target_top",
    test_block: "minecraft:block/test_block_accept",
    tnt: "minecraft:block/tnt_side",
    trial_spawner: "minecraft:block/trial_spawner_side_inactive",
    twisting_vines: "minecraft:block/twisting_vines_plant",
    vault: "minecraft:block/vault_side_off",
    verdant_froglight: "minecraft:block/verdant_froglight_side",
    weathered_copper_golem_statue: "minecraft:block/weathered_copper",
    weeping_vines: "minecraft:block/weeping_vines_plant"
};
let T = {
    crossbow: "minecraft:item/crossbow_standby",
    debug_stick: "minecraft:item/stick",
    enchanted_golden_apple: "minecraft:item/golden_apple",
    shield: "minecraft:entity/shield/base",
    tipped_arrow: "minecraft:item/tipped_arrow_head"
};
let R = [
    [
        "_fence_gate",
        [
            "_planks",
            ""
        ]
    ],
    [
        "_pressure_plate",
        [
            "_planks",
            ""
        ]
    ],
    [
        "_stairs",
        [
            "_planks",
            "",
            "s",
            "_block"
        ]
    ],
    [
        "_slab",
        [
            "_planks",
            "",
            "s",
            "_block"
        ]
    ],
    [
        "_button",
        [
            "_planks",
            ""
        ]
    ],
    [
        "_carpet",
        [
            "_wool",
            "_block"
        ]
    ],
    [
        "_fence",
        [
            "_planks",
            "s",
            ""
        ]
    ],
    [
        "_hyphae",
        [
            "_stem"
        ]
    ],
    [
        "_wall",
        [
            "",
            "s",
            "_block"
        ]
    ],
    [
        "_pane",
        [
            "",
            "s"
        ]
    ],
    [
        "_wood",
        [
            "_log"
        ]
    ]
];
let O = {
    chest: "minecraft:entity/chest/normal",
    copper_chest: "minecraft:entity/chest/copper",
    ender_chest: "minecraft:entity/chest/ender",
    exposed_copper_chest: "minecraft:entity/chest/copper_exposed",
    oxidized_copper_chest: "minecraft:entity/chest/copper_oxidized",
    trapped_chest: "minecraft:entity/chest/trapped",
    weathered_copper_chest: "minecraft:entity/chest/copper_weathered"
};
function M(e) {
    if (!e) {
        return null;
    }
    let o = e.replace("minecraft:", "");
    let i = O[o.startsWith("waxed_") ? o.slice(6) : o];
    if (i) {
        return [
            {
                textureId: i,
                crop: [
                    0.65625,
                    8.25 / 16,
                    0.875,
                    0.671875
                ],
                rotation: 180,
                rect: [
                    0,
                    4 / 14,
                    1,
                    1
                ]
            },
            {
                textureId: i,
                crop: [
                    0.65625,
                    3.5 / 16,
                    0.875,
                    4.75 / 16
                ],
                rotation: 180,
                rect: [
                    0,
                    0,
                    1,
                    5 / 14
                ]
            },
            {
                textureId: i,
                crop: [
                    1 / 16,
                    0.25 / 16,
                    1.5 / 16,
                    1.25 / 16
                ],
                rotation: 180,
                rect: [
                    6 / 14,
                    3 / 14,
                    8 / 14,
                    0.5
                ]
            }
        ];
    }
    return null;
}
let F = new WeakMap;
let I = ()=>{};
let J = new WeakMap;
function E(e) {
    return e && Object.keys(e).sort().map((o)=>`${o}:${e[o].map((e)=>Number(e.toFixed(6))).join(",")}`).join("|") || "static";
}
function Q1Component({ model, textureId, resources, atlasTexture, textureLayers, poseOverrides, opacity = 1, color = 16777215, polygonOffset = false, modelScale = 1, fallback = null, standaloneTexture, alphaTest, children }) {
    let v = E(poseOverrides);
    let signature = textureLayers?.join("|") ?? "";
    let [z, setZ] = useState(null);
    let w = z?.signature === signature ? z.texture : null;
    let k = !!standaloneTexture || !!w;
    let map = standaloneTexture ?? w ?? atlasTexture;
    let [j, setJ] = useState(null);
    useEffect(()=>{
        if (!textureLayers || textureLayers.length <= 1) {
            return;
        }
        let i = ((resources_1, atlasTexture_1, textureLayers_1, r = 64, t = 64)=>{
            if (textureLayers_1.length === 0) {
                return null;
            }
            let s = F.get(resources_1);
            if (!s) {
                s = new Map;
                F.set(resources_1, s);
            }
            let a = `${atlasTexture_1.uuid}|${r}x${t}|${textureLayers_1.join("|")}`;
            let l = s.get(a);
            if (!l) {
                let texture = ((resources_1_1, atlasTexture_1_1, textureLayers_1_1, r, t)=>{
                    if (typeof document === "undefined" || textureLayers_1_1.length === 0) {
                        return null;
                    }
                    let s = ((e)=>{
                        let n = e.userData?.sourceCanvas ?? e.image;
                        if (n && Number.isFinite(n.width) && Number.isFinite(n.height) && !((n.width ?? 0) <= 0) && !((n.height ?? 0) <= 0)) {
                            return n;
                        }
                        return null;
                    })(atlasTexture_1_1);
                    if (!s) {
                        return null;
                    }
                    let a = textureLayers_1_1.map((o)=>{
                        try {
                            let i = resources_1_1.atlas.getTextureUV(gw.parse(o));
                            if (!i || i.length !== 4) {
                                return null;
                            }
                            return {
                                textureId: o,
                                x: Math.round(i[0] * s.width),
                                y: Math.round(i[1] * s.height),
                                width: Math.round((i[2] - i[0]) * s.width),
                                height: Math.round((i[3] - i[1]) * s.height)
                            };
                        } catch (e) {
                            return null;
                        }
                    });
                    if (a.some((e)=>!e || e.width <= 0 || e.height <= 0)) {
                        return null;
                    }
                    let l = document.createElement("canvas");
                    l.width = r;
                    l.height = t;
                    let u = l.getContext("2d");
                    if (!u) {
                        return null;
                    }
                    for (let e of (u.imageSmoothingEnabled = false, u.clearRect(0, 0, r, t), a)){
                        let o = s.data;
                        if (o) {
                            let { x, y, width, height } = e;
                            if (x < 0 || y < 0 || x + width > s.width || y + height > s.height || o.length !== s.width * s.height * 4) {
                                return null;
                            }
                            let l = document.createElement("canvas");
                            l.width = width;
                            l.height = height;
                            let c = l.getContext("2d");
                            if (!c) {
                                return null;
                            }
                            let m = c.createImageData(width, height);
                            for(let e = 0; e < height; e++){
                                let r = ((y + e) * s.width + x) * 4;
                                m.data.set(o.subarray(r, r + 4 * width), e * width * 4);
                            }
                            c.putImageData(m, 0, 0);
                            u.drawImage(l, 0, 0, width, height, 0, 0, r, t);
                            l.width = 0;
                            l.height = 0;
                            continue;
                        }
                        u.drawImage(s, e.x, e.y, e.width, e.height, 0, 0, r, t);
                    }
                    let c = new GOR(l);
                    c.name = `entity-skin:${textureLayers_1_1.join("+")}`;
                    c.magFilter = hxR;
                    c.minFilter = hxR;
                    c.generateMipmaps = false;
                    c.colorSpace = er$;
                    c.flipY = false;
                    c.needsUpdate = true;
                    return c;
                })(resources_1, atlasTexture_1, textureLayers_1, r, t);
                if (!texture) {
                    return null;
                }
                l = {
                    texture,
                    refs: 0,
                    disposeTimer: null
                };
                s.set(a, l);
            }
            if (l.disposeTimer) {
                clearTimeout(l.disposeTimer);
                l.disposeTimer = null;
            }
            l.refs += 1;
            let u = false;
            return {
                texture: l.texture,
                release: ()=>{
                    if (!u) {
                        u = true;
                        l.refs = Math.max(0, l.refs - 1);
                        if (!(l.refs > 0)) {
                            l.disposeTimer = setTimeout(()=>{
                                if (!(l.refs > 0 || s.get(a) !== l)) {
                                    s.delete(a);
                                    l.texture.dispose();
                                }
                            }, 0);
                        }
                    }
                }
            };
        })(resources, atlasTexture, textureLayers, model.material?.xTexSize || 64, model.material?.yTexSize || 64);
        if (i) {
            setZ({
                signature,
                texture: i.texture
            });
            return i.release;
        }
    }, [
        model,
        resources,
        atlasTexture,
        signature
    ]);
    useEffect(()=>{
        let e = ((model_1, textureId_1, resources_1, r)=>{
            let t = J.get(resources_1);
            if (!t) {
                t = new WeakMap;
                J.set(resources_1, t);
            }
            let n = t.get(model_1);
            if (!n) {
                n = new Map;
                t.set(model_1, n);
            }
            let s = r?.standaloneTexture ? "standalone" : textureId_1;
            let a = `${s}|${E(r?.poseOverrides)}`;
            let d = n.get(a);
            if (!d) {
                let t = f(model_1, textureId_1, resources_1, r);
                if (!t) {
                    return {
                        geometry: null,
                        release: ()=>{}
                    };
                }
                d = {
                    geometry: t,
                    refs: 0,
                    disposeTimer: null
                };
                n.set(a, d);
            }
            if (d.disposeTimer) {
                clearTimeout(d.disposeTimer);
                d.disposeTimer = null;
            }
            d.refs += 1;
            let l = false;
            return {
                geometry: d.geometry,
                release: ()=>{
                    if (!l) {
                        l = true;
                        d.refs = Math.max(0, d.refs - 1);
                        if (!(d.refs > 0)) {
                            d.disposeTimer = setTimeout(()=>{
                                if (!(d.refs > 0 || n.get(a) !== d)) {
                                    n.delete(a);
                                    d.geometry.dispose();
                                }
                            }, 0);
                        }
                    }
                }
            };
        })(model, textureId, resources, {
            poseOverrides,
            standaloneTexture: k
        });
        setJ(e.geometry);
        return e.release;
    }, [
        model,
        textureId,
        resources,
        v,
        k
    ]);
    let R = useMemo(()=>{
        let e = new G_z({
            map,
            color,
            transparent: true,
            alphaTest: opacity < 1 ? 0.01 : 0.5,
            opacity,
            depthWrite: opacity >= 1,
            side: $EB,
            polygonOffset,
            polygonOffsetFactor: polygonOffset ? -1 : 0,
            polygonOffsetUnits: polygonOffset ? -1 : 0
        });
        if (alphaTest !== undefined) {
            e.alphaTest = alphaTest;
        }
        return e;
    }, [
        map,
        opacity,
        color,
        polygonOffset,
        alphaTest
    ]);
    useEffect(()=>()=>{
            R.dispose();
        }, [
        R
    ]);
    if (j) {
        return <group scale={[
            modelScale,
            modelScale,
            modelScale
        ]}><mesh geometry={j} material={R} castShadow receiveShadow raycast={I}/>{children}</group>;
    }
    return <>{fallback}</>;
}
const K = require(75342);
let G = new Map;
let V = null;
function U(e) {
    e.colorSpace = er$;
    e.magFilter = hxR;
    e.minFilter = hxR;
    e.generateMipmaps = false;
    e.wrapS = ghU;
    e.wrapT = ghU;
    e.needsUpdate = true;
    return e;
}
function $(e) {
    let o = G.get(e);
    if (o) {
        return o;
    }
    let i = hL().then(()=>(V != null || (V = new Tap), V).loadAsync(w2(`mcmeta/paintings/${e}.png`))).then(U).catch(()=>null);
    G.set(e, i);
    return i;
}
let X = ()=>{};
export function A({ entities, hiddenLayers, hiddenPositions, layerCutoff, layerMode = "slice", explodeSpacing = 0, explodeMinY = 0, teachingMode, currentIndex = -1, entityStepIndex, onEntityClick, onEntityPointerDown, onEntityHover, selectedEntity, isEntitySelected, resources, atlasTexture, showGenericEntities = true, forceEntityModelFallback = false }) {
    let z = useMemo(()=>{
        if (entities && entities.length !== 0) {
            return entities.filter((e)=>{
                if (!showGenericEntities && e.kind === "generic") {
                    return false;
                }
                let o = Math.floor(e.position[0]);
                let r = Math.floor(e.position[1]);
                let t = Math.floor(e.position[2]);
                return !(hiddenPositions?.has(`${o},${r},${t}`) || hiddenLayers?.has(r)) && (layerCutoff == null || (layerMode !== "gallery" || r === layerCutoff) && (layerMode === "gallery" || !(r > layerCutoff))) && !IO(e.position[1], entityStepIndex?.get(e), teachingMode, currentIndex);
            });
        }
        return [];
    }, [
        entities,
        entityStepIndex,
        hiddenLayers,
        hiddenPositions,
        layerCutoff,
        layerMode,
        teachingMode,
        currentIndex,
        showGenericEntities
    ]);
    if (z.length === 0) {
        return null;
    }
    return <group name="ProjectionEntities">{z.map((entity, o)=>{
        var s;
        let [a, d, c] = entity.position;
        let m = Math.floor(d);
        let x = (s = entity).kind !== "item_frame" && s.kind !== "painting" && s.kind !== "leash_knot" ? cj9.degToRad(-(entity.rotation?.[0] ?? 0)) : 0;
        return <group key={`${entity.entityId}-${o}-${a}-${d}-${c}`} position={[
            a,
            d + (m - explodeMinY) * explodeSpacing,
            c
        ]} rotation={[
            0,
            x,
            0
        ]}><QComponent entity={entity} onEntityClick={onEntityClick} onEntityPointerDown={onEntityPointerDown} onEntityHover={onEntityHover}/>{(entity === selectedEntity || isEntitySelected?.(entity)) && <EoComponent entity={entity}/>}<EiComponent entity={entity} resources={resources ?? null} atlasTexture={atlasTexture ?? null} forceEntityModelFallback={forceEntityModelFallback}/></group>;
    })}</group>;
}
function QComponent({ entity, onEntityClick, onEntityPointerDown, onEntityHover }) {
    if (!onEntityClick) {
        return null;
    }
    let { position, args } = On(entity);
    let d = ee(entity);
    let l = <mesh position={position} onClick={(e)=>{
        if (typeof e.delta === "number" && e.delta > 6) {
            return;
        }
        e.stopPropagation();
        let e_nativeEvent = e.nativeEvent;
        onEntityClick(entity, {
            ctrlKey: !!(e_nativeEvent?.ctrlKey || e_nativeEvent?.metaKey)
        });
    }} onPointerDown={onEntityPointerDown ? (e)=>{
        onEntityPointerDown(entity, e.button, e.clientX, e.clientY);
    } : undefined} onPointerMove={onEntityHover ? (e)=>{
        e.stopPropagation();
        onEntityHover(entity, ((e)=>{
            let r = e.normal ?? e.face?.normal;
            if (!r) {
                return;
            }
            let t = r.clone().transformDirection(e.object.matrixWorld);
            return d0([
                t.x,
                t.y,
                t.z
            ], [
                e.point.x,
                e.point.y,
                e.point.z
            ], [
                e.ray.direction.x,
                e.ray.direction.y,
                e.ray.direction.z
            ]);
        })(e));
    } : undefined} onPointerOut={onEntityHover ? ()=>onEntityHover(null) : undefined}><boxGeometry args={args}/><meshBasicMaterial color="#ffffff" transparent opacity={0.001} depthWrite={false}/></mesh>;
    if (d) {
        return <group rotation={p(d)}>{l}</group>;
    }
    return l;
}
function ee(entity) {
    if (entity.kind === "painting") {
        return entity.painting?.facing;
    }
    if (entity.kind === "item_frame") {
        return entity.itemFrame?.facing;
    }
}
function EoComponent({ entity }) {
    let { position, size } = NR(entity);
    let d = ee(entity);
    let [l, u, c] = size;
    let [m, x, g] = position;
    let b = useMemo(()=>new Cx, []);
    let y = useMemo(()=>{
        let e = new iNn(l, u, c);
        e.translate(0.5, 0.5, 0.5);
        return e;
    }, [
        l,
        u,
        c
    ]);
    useEffect(()=>{
        b.setGeometry(y);
        b.setPosition(m - 0.5, x - 0.5, g - 0.5);
    }, [
        b,
        y,
        m,
        x,
        g
    ]);
    useEffect(()=>()=>{
            y.dispose();
        }, [
        y
    ]);
    useEffect(()=>()=>{
            b.dispose();
        }, [
        b
    ]);
    D(({ clock })=>b.updateTime(clock.getElapsedTime()));
    let object = b.getObject3D();
    if (d) {
        return <group rotation={p(d)}><primitive object={object}/></group>;
    }
    return <primitive object={object}/>;
}
function EiComponent({ entity, resources, atlasTexture, forceEntityModelFallback }) {
    switch(entity.kind){
        case "armor_stand":
            return <EsComponent entity={entity} resources={resources} atlasTexture={atlasTexture} forceEntityModelFallback={forceEntityModelFallback}/>;
        case "minecart":
            return <EgComponent entity={entity} resources={resources} atlasTexture={atlasTexture} forceEntityModelFallback={forceEntityModelFallback}/>;
        case "boat":
            return <EhComponent entity={entity} resources={resources} atlasTexture={atlasTexture} forceEntityModelFallback={forceEntityModelFallback}/>;
        case "item_frame":
            return <E1Component entity={entity} resources={resources} atlasTexture={atlasTexture} forceFallback={forceEntityModelFallback}/>;
        case "painting":
            return <EwComponent entity={entity} forceFallback={forceEntityModelFallback}/>;
        case "display":
            return <EtComponent blockState={entity.blockId ? {
                blockId: entity.blockId,
                properties: {}
            } : undefined} resources={resources} atlasTexture={atlasTexture} fallbackBlockId={entity.blockId}/>;
        case "block_display":
            return <EnComponent transform={entity.blockDisplay?.transform}><EtComponent blockState={entity.blockDisplay?.blockState} resources={resources} atlasTexture={atlasTexture} fallbackBlockId={entity.blockDisplay?.blockState?.blockId}/></EnComponent>;
        case "item_display":
            return <EnComponent transform={entity.itemDisplay?.transform}><EOComponent item={entity.itemDisplay?.item} resources={resources} atlasTexture={atlasTexture}/></EnComponent>;
        case "text_display":
            return <ETComponent entity={entity}/>;
        case "falling_block":
            return <EtComponent blockState={entity.fallingBlock ?? (entity.blockId ? {
                blockId: entity.blockId,
                properties: {}
            } : undefined)} resources={resources} atlasTexture={atlasTexture} fallbackBlockId={entity.blockId}/>;
        case "tnt":
            return <EtComponent blockState={{
                blockId: "minecraft:tnt",
                properties: {}
            }} resources={resources} atlasTexture={atlasTexture} fallbackBlockId="minecraft:tnt"/>;
        case "end_crystal":
            return <EAComponent showBottom={entity.endCrystal?.showBottom !== false}/>;
        case "leash_knot":
            return <EBComponent entity={entity} resources={resources} atlasTexture={atlasTexture} forceEntityModelFallback={forceEntityModelFallback}/>;
        case "marker":
            return <EKComponent/>;
        case "interaction":
            return <ELComponent entity={entity}/>;
        default:
            {
                let e = forceEntityModelFallback ? null : Pc(entity);
                if (e && resources && atlasTexture) {
                    return <Q1Component model={e.model} textureId={e.texture} textureLayers={e.textureLayers} color={e.color} resources={resources} atlasTexture={atlasTexture} fallback=<EDComponent entityId={entity.entityId}/>>{e.overlays?.map((e, o)=><Q1Component key={`${e.texture}-${o}`} model={e.model} textureId={e.texture} resources={resources} atlasTexture={atlasTexture} color={e.color} polygonOffset/>)}</Q1Component>;
                }
                return <EDComponent entityId={entity.entityId}/>;
            }
    }
}
function ErComponent({ position, args, color, opacity = 1, rotation, wireframe = false }) {
    return <mesh position={position} rotation={rotation} castShadow receiveShadow raycast={X}><boxGeometry args={args}/><meshLambertMaterial color={color} transparent={opacity < 1} opacity={opacity} wireframe={wireframe}/></mesh>;
}
function EtComponent({ blockState, resources, atlasTexture, fallbackBlockId, scale = 1, centered = false, rejectMagentaFallback = false, fallback }) {
    let c = blockState?.blockId;
    let m = blockState?.properties;
    let x = c ? z(c, m ?? {}) : null;
    let [g, setG] = useState(null);
    let [b, setB] = useState(null);
    let h = B(m);
    let f = h ?? atlasTexture;
    useEffect(()=>{
        if (!resources || !c) {
            return void setG(null);
        }
        let e = w(c, m ?? {}, resources, {
            rejectMagentaFallback
        });
        setG(e.value);
        return e.release;
    }, [
        resources,
        c,
        x,
        rejectMagentaFallback
    ]);
    useEffect(()=>{
        if (!f || !c) {
            return void setB(null);
        }
        let e = k(c, m ?? {}, f, g);
        setB(e.value);
        return e.release;
    }, [
        f,
        c,
        x,
        g
    ]);
    if (h === null) {
        return null;
    }
    if (g && b) {
        return <mesh geometry={g} material={b} position={[
            -0.5 * scale,
            centered ? -0.5 * scale : 0,
            -0.5 * scale
        ]} scale={[
            scale,
            scale,
            scale
        ]} castShadow receiveShadow raycast={X}/>;
    }
    return <>{fallback ?? <EqComponent blockId={fallbackBlockId ?? c}/>}</>;
}
function EnComponent({ transform, children }) {
    let d = JSON.stringify(transform ?? {});
    let l = useMemo(()=>{
        if (!transform?.matrix || transform.matrix.length !== 16) {
            return null;
        }
        let e = new kn4;
        e.fromArray(transform.matrix);
        return e;
    }, [
        d
    ]);
    let quaternion = useMemo(()=>{
        let e = new PTz;
        if (transform?.leftRotation) {
            e.multiply(new PTz(...transform.leftRotation));
        }
        if (transform?.rightRotation) {
            e.multiply(new PTz(...transform.rightRotation));
        }
        return e;
    }, [
        d
    ]);
    if (l) {
        return <group matrix={l} matrixAutoUpdate={false}>{children}</group>;
    }
    return <group position={transform?.translation ?? [
        0,
        0,
        0
    ]} scale={transform?.scale ?? [
        1,
        1,
        1
    ]} quaternion={quaternion}>{children}</group>;
}
function EsComponent({ entity, resources, atlasTexture, forceEntityModelFallback }) {
    let a = forceEntityModelFallback ? null : Pc(entity);
    let d = <EdComponent entity={entity} resources={resources} atlasTexture={atlasTexture}/>;
    if (!a || !resources || !atlasTexture) {
        return <group name="Entity_ArmorStand_Facing" rotation={[
            0,
            Math.PI,
            0
        ]}>{d}</group>;
    }
    let entity_armorStand = entity.armorStand;
    let modelScale = (entity_armorStand?.marker ? 0.35 : 1) * (entity_armorStand?.small ? 0.5 : 1);
    let poseOverrides = _(entity);
    return <group name="Entity_ArmorStand_Facing" rotation={[
        0,
        Math.PI,
        0
    ]}><group name="Entity_ArmorStand_Precise" position={[
        0,
        0.001 * modelScale,
        0
    ]}><Q1Component model={a.model} textureId={a.texture} resources={resources} atlasTexture={atlasTexture} poseOverrides={poseOverrides} opacity={entity_armorStand?.invisible ? 0.28 : 1} modelScale={modelScale} fallback={d}>{a.overlays?.map((e, o)=><Q1Component key={`${e.texture}-${o}`} model={e.model} textureId={e.texture} resources={resources} atlasTexture={atlasTexture} poseOverrides={poseOverrides} color={e.color} polygonOffset/>)}<EaComponent entity={entity} resources={resources} atlasTexture={atlasTexture} poseOverrides={poseOverrides}/><ElComponent entity={entity} resources={resources} atlasTexture={atlasTexture}/></Q1Component></group></group>;
}
function EaComponent({ entity, resources, atlasTexture, poseOverrides }) {
    let a = useMemo(()=>fH(entity), [
        entity
    ]);
    let d = B(a?.skinProperties);
    if (a && d !== null) {
        return <Q1Component model={a.model} textureId={a.texture} resources={resources} atlasTexture={atlasTexture} poseOverrides={poseOverrides} standaloneTexture={d} alphaTest={0.1}/>;
    }
    return null;
}
function EdComponent({ entity, resources, atlasTexture }) {
    let entity_armorStand = entity.armorStand;
    let d = entity_armorStand?.equipment ?? {};
    let l = entity_armorStand?.small ? 0.5 : 1;
    let opacity = entity_armorStand?.invisible ? 0.38 : 1;
    let c = entity_armorStand?.showArms || !!(d.mainHand || d.offHand);
    let m = entity_armorStand?.invisible ? "#b98546" : "#9b6a36";
    let x = entity_armorStand?.pose ?? {};
    if (entity_armorStand?.marker) {
        return <group name="Entity_ArmorStand_Marker" scale={[
            l,
            l,
            l
        ]}><ErComponent position={[
            0,
            0.05,
            0
        ]} args={[
            0.3,
            0.04,
            0.3
        ]} color="#d6a55a" opacity={0.65}/><ErComponent position={[
            0,
            0.35,
            0
        ]} args={[
            0.06,
            0.6,
            0.06
        ]} color="#d6a55a" opacity={0.65}/></group>;
    }
    return <group name="Entity_ArmorStand" scale={[
        l,
        l,
        l
    ]}>{!entity_armorStand?.noBasePlate && <ErComponent position={[
        0,
        0.035,
        0
    ]} args={[
        0.72,
        0.07,
        0.72
    ]} color="#5f3f21" opacity={opacity}/>}<group rotation={ex(x.body)}><ErComponent position={[
        0,
        0.74,
        0
    ]} args={[
        0.07,
        1.28,
        0.07
    ]} color={m} opacity={opacity}/><ErComponent position={[
        0,
        1.36,
        0
    ]} args={[
        0.62,
        0.075,
        0.075
    ]} color={m} opacity={opacity}/><ErComponent position={[
        0,
        0.78,
        0
    ]} args={[
        0.42,
        0.065,
        0.065
    ]} color={m} opacity={opacity}/><ErComponent position={[
        0,
        1.02,
        -0.035
    ]} args={[
        0.18,
        0.52,
        0.07
    ]} color={m} opacity={opacity}/></group><group position={[
        0,
        1.52,
        0
    ]} rotation={ex(x.head)}><ErComponent position={[
        0,
        0.18,
        0
    ]} args={[
        0.26,
        0.26,
        0.26
    ]} color={m} opacity={opacity}/>{d.head && <EuComponent itemId={d.head} slot="head" resources={resources} atlasTexture={atlasTexture}/>}</group>{c && <><EcComponent pivot={[
        -0.35,
        1.32,
        0
    ]} length={0.72} thickness={0.065} color={m} pose={x.leftArm} opacity={opacity}/><EcComponent pivot={[
        0.35,
        1.32,
        0
    ]} length={0.72} thickness={0.065} color={m} pose={x.rightArm} opacity={opacity}/>{d.mainHand && <EmComponent side="right" itemId={d.mainHand} pose={x.rightArm} resources={resources} atlasTexture={atlasTexture}/>}{d.offHand && <EmComponent side="left" itemId={d.offHand} pose={x.leftArm} resources={resources} atlasTexture={atlasTexture}/>}</>}<EcComponent pivot={[
        -0.16,
        0.7,
        0
    ]} length={0.67} thickness={0.065} color={m} pose={x.leftLeg} opacity={opacity}/><EcComponent pivot={[
        0.16,
        0.7,
        0
    ]} length={0.67} thickness={0.065} color={m} pose={x.rightLeg} opacity={opacity}/>{d.chest && <ErComponent position={[
        0,
        1.03,
        -0.055
    ]} args={[
        0.46,
        0.6,
        0.08
    ]} color={eV(d.chest)} opacity={0.88}/>}{d.legs && <><ErComponent position={[
        -0.16,
        0.46,
        -0.035
    ]} args={[
        0.13,
        0.44,
        0.08
    ]} color={eV(d.legs)} opacity={0.88}/><ErComponent position={[
        0.16,
        0.46,
        -0.035
    ]} args={[
        0.13,
        0.44,
        0.08
    ]} color={eV(d.legs)} opacity={0.88}/></>}{d.feet && <><ErComponent position={[
        -0.16,
        0.15,
        -0.035
    ]} args={[
        0.18,
        0.14,
        0.16
    ]} color={eV(d.feet)} opacity={0.88}/><ErComponent position={[
        0.16,
        0.15,
        -0.035
    ]} args={[
        0.18,
        0.14,
        0.16
    ]} color={eV(d.feet)} opacity={0.88}/></>}</group>;
}
function ElComponent({ entity, resources, atlasTexture }) {
    let entity_armorStand = entity.armorStand;
    let a = entity_armorStand?.equipment ?? {};
    let d = Xq(entity);
    let l = entity_armorStand?.showArms || !!(a.mainHand || a.offHand);
    return <group name="Entity_ArmorStand_Equipment">{a.head && !iw(a.head, "head") && !fH(entity) && <group position={[
        0,
        1.52,
        0
    ]} rotation={ex(d.head)}><EuComponent itemId={a.head} slot="head" resources={resources} atlasTexture={atlasTexture}/></group>}{l && a.mainHand && <EmComponent side="right" itemId={a.mainHand} pose={d.rightArm} resources={resources} atlasTexture={atlasTexture}/>}{l && a.offHand && <EmComponent side="left" itemId={a.offHand} pose={d.leftArm} resources={resources} atlasTexture={atlasTexture}/>}{a.chest && !iw(a.chest, "chest") && <ErComponent position={[
        0,
        1.03,
        -0.055
    ]} args={[
        0.46,
        0.6,
        0.08
    ]} color={eV(a.chest)} opacity={0.88}/>}{a.legs && !iw(a.legs, "legs") && <><ErComponent position={[
        -0.16,
        0.46,
        -0.035
    ]} args={[
        0.13,
        0.44,
        0.08
    ]} color={eV(a.legs)} opacity={0.88}/><ErComponent position={[
        0.16,
        0.46,
        -0.035
    ]} args={[
        0.13,
        0.44,
        0.08
    ]} color={eV(a.legs)} opacity={0.88}/></>}{a.feet && !iw(a.feet, "feet") && <><ErComponent position={[
        -0.16,
        0.15,
        -0.035
    ]} args={[
        0.18,
        0.14,
        0.16
    ]} color={eV(a.feet)} opacity={0.88}/><ErComponent position={[
        0.16,
        0.15,
        -0.035
    ]} args={[
        0.18,
        0.14,
        0.16
    ]} color={eV(a.feet)} opacity={0.88}/></>}</group>;
}
function EuComponent({ itemId, slot, resources, atlasTexture }) {
    if (slot === "head" && itemId.includes("block")) {
        return <group position={[
            0,
            -0.1,
            0
        ]} scale={[
            0.42,
            0.42,
            0.42
        ]}><EtComponent blockState={{
            blockId: itemId,
            properties: {}
        }} resources={resources} atlasTexture={atlasTexture} fallbackBlockId={itemId}/></group>;
    }
    return <ErComponent position={[
        0,
        0.18,
        0
    ]} args={[
        0.34,
        0.32,
        0.34
    ]} color={eV(itemId)} opacity={0.88}/>;
}
function EcComponent({ pivot, length, thickness, color, pose, opacity = 1 }) {
    return <group position={pivot} rotation={ex(pose)}><ErComponent position={[
        0,
        -length / 2,
        0
    ]} args={[
        thickness,
        length,
        thickness
    ]} color={color} opacity={opacity}/></group>;
}
function EmComponent({ side, itemId, pose, resources, atlasTexture }) {
    return <group position={[
        side === "left" ? -0.35 : 0.35,
        1.32,
        0
    ]} rotation={ex(pose)}><group position={[
        0,
        -0.74,
        -0.08
    ]} rotation={[
        cj9.degToRad(-18),
        0,
        cj9.degToRad(side === "left" ? -8 : 8)
    ]}><EOComponent item={{
        itemId
    }} resources={resources} atlasTexture={atlasTexture} width={0.28} height={0.28}/></group></group>;
}
function ex(e) {
    if (e) {
        return [
            cj9.degToRad(e[0] || 0),
            cj9.degToRad(e[1] || 0),
            cj9.degToRad(e[2] || 0)
        ];
    }
    return [
        0,
        0,
        0
    ];
}
function EgComponent({ entity, resources, atlasTexture, forceEntityModelFallback }) {
    let s = forceEntityModelFallback ? null : Pc(entity);
    if (s && resources && atlasTexture) {
        return <group name="Entity_Minecart_Precise"><Q1Component model={s.model} textureId={s.texture} resources={resources} atlasTexture={atlasTexture} fallback=<EpComponent entity={entity} resources={resources} atlasTexture={atlasTexture}/>><EbComponent entity={entity} resources={resources} atlasTexture={atlasTexture}/></Q1Component></group>;
    }
    return <EpComponent entity={entity} resources={resources} atlasTexture={atlasTexture}/>;
}
function EpComponent({ entity, resources, atlasTexture }) {
    return <group name="Entity_Minecart_Fallback"><ErComponent position={[
        0,
        0.22,
        0
    ]} args={[
        0.9,
        0.16,
        0.9
    ]} color="#3c3f46"/><ErComponent position={[
        0,
        0.46,
        -0.43
    ]} args={[
        0.9,
        0.38,
        0.08
    ]} color="#565a63"/><ErComponent position={[
        0,
        0.46,
        0.43
    ]} args={[
        0.9,
        0.38,
        0.08
    ]} color="#565a63"/><ErComponent position={[
        -0.43,
        0.46,
        0
    ]} args={[
        0.08,
        0.38,
        0.9
    ]} color="#565a63"/><ErComponent position={[
        0.43,
        0.46,
        0
    ]} args={[
        0.08,
        0.38,
        0.9
    ]} color="#565a63"/><ErComponent position={[
        -0.32,
        0.09,
        -0.48
    ]} args={[
        0.18,
        0.18,
        0.08
    ]} color="#16181d"/><ErComponent position={[
        0.32,
        0.09,
        -0.48
    ]} args={[
        0.18,
        0.18,
        0.08
    ]} color="#16181d"/><ErComponent position={[
        -0.32,
        0.09,
        0.48
    ]} args={[
        0.18,
        0.18,
        0.08
    ]} color="#16181d"/><ErComponent position={[
        0.32,
        0.09,
        0.48
    ]} args={[
        0.18,
        0.18,
        0.08
    ]} color="#16181d"/><EbComponent entity={entity} resources={resources} atlasTexture={atlasTexture}/></group>;
}
function EbComponent({ entity, resources, atlasTexture }) {
    let u = entity.minecart?.variant ?? "normal";
    let blockState = entity.minecart?.displayBlock;
    let m = ((entity.minecart?.displayOffset ?? 6) - 6) / 16;
    return <group name="Entity_Minecart_Payload">{blockState && <group position={[
        0,
        0.56 + m,
        0
    ]} scale={[
        0.58,
        0.58,
        0.58
    ]}><EtComponent blockState={blockState} resources={resources} atlasTexture={atlasTexture} fallbackBlockId={blockState.blockId}/></group>}{!blockState && u !== "normal" && <EyComponent variant={u}/>}</group>;
}
function EyComponent({ variant }) {
    let t = {
        chest: "#a46b2d",
        hopper: "#353942",
        tnt: "#d13f2f",
        furnace: "#6f737a",
        command_block: "#b8894d",
        spawner: "#34495e"
    }[variant] ?? "#8b8f98";
    return <ErComponent position={[
        0,
        0.72,
        0
    ]} args={[
        0.58,
        0.42,
        0.58
    ]} color={t}/>;
}
function EhComponent({ entity, resources, atlasTexture, forceEntityModelFallback }) {
    let a = <EfComponent entity={entity}/>;
    let d = forceEntityModelFallback ? null : Pc(entity);
    if (!d || !resources || !atlasTexture) {
        return a;
    }
    let l = !!(entity.boat?.chest || entity.entityId.endsWith("_chest_boat"));
    return <group name={l ? "Entity_ChestBoat_Precise" : "Entity_Boat_Precise"}><Q1Component model={d.model} textureId={d.texture} resources={resources} atlasTexture={atlasTexture} fallback={a}/></group>;
}
function EfComponent({ entity }) {
    let entity_boat = entity.boat;
    let t = !!(entity_boat?.chest || entity.entityId.endsWith("_chest_boat"));
    let s = !!entity_boat?.raft;
    let a = ((e)=>{
        let i = {
            oak: "#8a5a2b",
            spruce: "#5b3b21",
            birch: "#b89a5a",
            jungle: "#9b653d",
            acacia: "#a8562c",
            dark_oak: "#3f2b1b",
            mangrove: "#7a342d",
            cherry: "#d9949b",
            bamboo: "#c7a957",
            pale_oak: "#c6b990"
        };
        return i[e ?? "oak"] ?? i.oak;
    })(entity_boat?.woodType);
    let d = ((e)=>{
        const o = 0.72;
        let i = new Q1f(e);
        i.multiplyScalar(0.72);
        return `#${i.getHexString()}`;
    })(a);
    if (s) {
        return <group name="Entity_Raft">{[
            -0.45,
            -0.15,
            0.15,
            0.45
        ].map((e)=><ErComponent key={e} position={[
                e,
                0.2,
                0
            ]} args={[
                0.18,
                0.16,
                1.05
            ]} color={a}/>)}<ErComponent position={[
            0,
            0.3,
            -0.28
        ]} args={[
            1.15,
            0.08,
            0.12
        ]} color={d}/><ErComponent position={[
            0,
            0.3,
            0.28
        ]} args={[
            1.15,
            0.08,
            0.12
        ]} color={d}/>{t && <ErComponent position={[
            0.22,
            0.58,
            0
        ]} args={[
            0.42,
            0.36,
            0.42
        ]} color="#a46b2d"/>}</group>;
    }
    return <group name="Entity_Boat"><ErComponent position={[
        0,
        0.18,
        0
    ]} args={[
        1.15,
        0.18,
        0.58
    ]} color={a}/><ErComponent position={[
        0,
        0.38,
        -0.34
    ]} args={[
        1.05,
        0.38,
        0.12
    ]} color={d}/><ErComponent position={[
        0,
        0.38,
        0.34
    ]} args={[
        1.05,
        0.38,
        0.12
    ]} color={d}/><ErComponent position={[
        -0.56,
        0.38,
        0
    ]} args={[
        0.12,
        0.38,
        0.58
    ]} color={d}/><ErComponent position={[
        0.56,
        0.38,
        0
    ]} args={[
        0.12,
        0.38,
        0.58
    ]} color={d}/><ErComponent position={[
        -0.38,
        0.48,
        -0.55
    ]} args={[
        0.12,
        0.06,
        0.44
    ]} color={d} rotation={[
        0,
        0,
        cj9.degToRad(-20)
    ]}/><ErComponent position={[
        0.38,
        0.48,
        0.55
    ]} args={[
        0.12,
        0.06,
        0.44
    ]} color={d} rotation={[
        0,
        0,
        cj9.degToRad(20)
    ]}/>{t && <ErComponent position={[
        0.18,
        0.68,
        0
    ]} args={[
        0.42,
        0.36,
        0.42
    ]} color="#a46b2d"/>}</group>;
}
function E1Component({ entity, resources, atlasTexture, forceFallback }) {
    let entity_itemFrame = entity.itemFrame;
    return <EHComponent facing={entity_itemFrame?.facing}><group name="Entity_ItemFrame">{!forceFallback && resources && atlasTexture ? <EvComponent glow={!!entity_itemFrame?.glow} resources={resources} atlasTexture={atlasTexture}/> : <EPComponent glow={!!entity_itemFrame?.glow}/>}{entity_itemFrame?.item && <ECComponent item={entity_itemFrame.item} itemRotation={entity_itemFrame.itemRotation ?? 0} resources={resources} atlasTexture={atlasTexture}/>}</group></EHComponent>;
}
function EvComponent({ glow, resources, atlasTexture }) {
    let a = glow ? "minecraft:block/glow_item_frame" : "minecraft:block/item_frame";
    let d = useMemo(()=>hu(a, resources), [
        a,
        resources
    ]);
    let l = useMemo(()=>new kn4().makeTranslation(0.5, -0.5, 1 - 1 / 32).multiply(new kn4().makeRotationY(Math.PI)).multiply(new kn4().makeScale(1 / 16, 1 / 16, 1 / 16)), []);
    let c = useMemo(()=>{
        let i = h.T("minecraft:item_frame", {});
        let r = (d?.userData.alphaClasses ?? [
            "legacy"
        ]).map((e)=>{
            let visualProfile = h.a(i, e);
            if (glow) {
                return new V9B({
                    map: atlasTexture,
                    vertexColors: true,
                    side: $EB,
                    alphaTest: visualProfile.alphaTest,
                    transparent: visualProfile.transparent,
                    opacity: visualProfile.opacity
                });
            }
            return fu({
                kind: "lambert",
                atlasTexture,
                visualProfile,
                defaultSide: $EB
            });
        });
        if (r.length === 1) {
            return r[0];
        }
        return r;
    }, [
        atlasTexture,
        glow,
        d
    ]);
    useEffect(()=>()=>{
            d?.dispose();
        }, [
        d
    ]);
    useEffect(()=>()=>{
            (Array.isArray(c) ? c : [
                c
            ]).forEach((e)=>e.dispose());
        }, [
        c
    ]);
    if (d) {
        return <mesh name="Entity_ItemFrame_Precise" geometry={d} material={c} matrix={l} matrixAutoUpdate={false} castShadow={!glow} receiveShadow={!glow} raycast={X}/>;
    }
    return <EPComponent glow={glow}/>;
}
function ECComponent({ item, itemRotation, resources, atlasTexture }) {
    let item_itemId = item.itemId;
    let l = eR(item_itemId, resources);
    let modelId = useMemo(()=>{
        if (l && resources) {
            return ((item_itemId_1, o)=>{
                let i = item_itemId_1.replace(/^minecraft:/, "");
                let r = [];
                for (let e of (i.endsWith("_trapdoor") && r.push(`${i}_bottom`), (/_(fence|wall|button)$/.test(i) || i === "piston" || i === "sticky_piston") && r.push(`${i}_inventory`), r.push(i), r)){
                    let i = `minecraft:block/${e}`;
                    if (o(i)) {
                        return i;
                    }
                }
                return null;
            })(item_itemId, (e)=>resources.blockModels.getBlockModel(gw.parse(e)) !== null);
        }
        return null;
    }, [
        l,
        item_itemId,
        resources
    ]);
    let fixed = modelId && resources ? ((e, modelId_1)=>{
        let r = e.getBlockModel(gw.parse(modelId_1));
        return r?.display?.fixed;
    })(resources.blockModels, modelId) : undefined;
    let m = useMemo(()=>b({
            itemId: item_itemId,
            itemRotation,
            kind: "block",
            fixed
        }), [
        item_itemId,
        itemRotation,
        fixed
    ]);
    let x = useMemo(()=>b({
            itemId: item_itemId,
            itemRotation,
            kind: "flat"
        }), [
        item_itemId,
        itemRotation
    ]);
    let g = <group name="Entity_ItemFrame_Item" matrix={x} matrixAutoUpdate={false}><ENComponent item={item} resources={resources} atlasTexture={atlasTexture} width={0.5} height={0.5}/></group>;
    if (l && resources) {
        return <EzComponent itemId={item_itemId} skull={item.skull} modelId={modelId} matrix={m} resources={resources} atlasTexture={atlasTexture} fallback={g}/>;
    }
    return g;
}
function EzComponent({ itemId, skull, modelId, matrix, resources, atlasTexture, fallback }) {
    let c = useMemo(()=>{
        if (modelId) {
            return hG(modelId, itemId, resources);
        }
        return null;
    }, [
        modelId,
        itemId,
        resources
    ]);
    useEffect(()=>()=>{
            c?.dispose();
        }, [
        c
    ]);
    let m = useMemo(()=>cw(itemId, skull) ?? {}, [
        itemId,
        skull
    ]);
    let x = z(itemId, m);
    let g = B(m);
    let p = g ?? atlasTexture;
    let [b, setB] = useState(null);
    useEffect(()=>{
        if (c) {
            return void setB(null);
        }
        let e = w(itemId, m, resources, {
            rejectMagentaFallback: true
        });
        setB(e.value);
        return e.release;
    }, [
        c,
        itemId,
        resources,
        x
    ]);
    let [h, setH] = useState(null);
    useEffect(()=>{
        if (!p) {
            return void setH(null);
        }
        let e = k(itemId, m, p, c ?? b);
        setH(e.value);
        return e.release;
    }, [
        p,
        itemId,
        x,
        c,
        b
    ]);
    let _ = c ?? b;
    if (g === null) {
        return null;
    }
    if (_ && h) {
        return <group name="Entity_ItemFrame_Item" matrix={matrix} matrixAutoUpdate={false}><mesh geometry={_} material={h} castShadow receiveShadow raycast={X}/></group>;
    }
    return <>{fallback}</>;
}
function EPComponent({ glow }) {
    return <group name="Entity_ItemFrame_Fallback"><ErComponent position={[
        0,
        0,
        -0.028
    ]} args={[
        0.92,
        0.92,
        0.055
    ]} color={glow ? "#d8b45a" : "#6f4325"}/><ErComponent position={[
        0,
        0,
        0
    ]} args={[
        0.62,
        0.62,
        0.035
    ]} color={glow ? "#f3e4a6" : "#caa56a"}/></group>;
}
function EwComponent({ entity, forceFallback }) {
    let d = K.Vs(entity.painting?.variant ?? entity.painting?.motive);
    let [width, height] = YY(entity);
    let frontTexture = useEk(forceFallback ? undefined : d, false);
    let backTexture = useEk(forceFallback ? undefined : "back", true);
    return <EHComponent facing={entity.painting?.facing}>{!forceFallback && frontTexture && backTexture ? <ESComponent width={width} height={height} frontTexture={frontTexture} backTexture={backTexture}/> : <EjComponent width={width} height={height} variant={d}/>}</EHComponent>;
}
function useEk(e, o) {
    let [i, setI] = useState(null);
    useEffect(()=>{
        if (!e) {
            return;
        }
        let i = true;
        (o ? $("back") : ((e)=>{
            let o = K.Vs(e);
            if (o) {
                return $(o);
            }
            return Promise.resolve(null);
        })(e)).then((texture)=>{
            if (i) {
                setI({
                    key: e,
                    texture
                });
            }
        });
        return ()=>{
            i = false;
        };
    }, [
        o,
        e
    ]);
    if (i && i.key === e) {
        return i.texture;
    }
    return null;
}
function ESComponent({ width, height, frontTexture, backTexture }) {
    let d = 1 / 16;
    let l = useMemo(()=>new bdM(width, height), [
        width,
        height
    ]);
    let u = useMemo(()=>((width_1, height_1, i)=>{
            let r = [];
            let t = [];
            let s = [];
            let a = width_1 / 2;
            let d = height_1 / 2;
            let l = i / 2;
            let u = (e, o = [
                0,
                0,
                1,
                1
            ])=>{
                let i = r.length / 3;
                for (let o of e){
                    r.push(...o);
                }
                let [n, a, d, l] = o;
                t.push(n, a, d, a, n, l, d, l);
                s.push(i, i + 1, i + 2, i + 2, i + 1, i + 3);
            };
            for(let i = 0; i < width_1; i++){
                for(let e = 0; e < height_1; e++){
                    let o = -a + i;
                    let r = o + 1;
                    let t = -d + e;
                    let n = t + 1;
                    u([
                        [
                            r,
                            t,
                            -l
                        ],
                        [
                            o,
                            t,
                            -l
                        ],
                        [
                            r,
                            n,
                            -l
                        ],
                        [
                            o,
                            n,
                            -l
                        ]
                    ]);
                }
            }
            for(let o = 0; o < width_1; o++){
                let e = -a + o;
                let i = e + 1;
                u([
                    [
                        e,
                        d,
                        l
                    ],
                    [
                        i,
                        d,
                        l
                    ],
                    [
                        e,
                        d,
                        -l
                    ],
                    [
                        i,
                        d,
                        -l
                    ]
                ], [
                    0,
                    0,
                    1,
                    1 / 16
                ]);
                u([
                    [
                        e,
                        -d,
                        -l
                    ],
                    [
                        i,
                        -d,
                        -l
                    ],
                    [
                        e,
                        -d,
                        l
                    ],
                    [
                        i,
                        -d,
                        l
                    ]
                ], [
                    0,
                    15 / 16,
                    1,
                    1
                ]);
            }
            for(let e = 0; e < height_1; e++){
                let o = -d + e;
                let i = o + 1;
                u([
                    [
                        -a,
                        o,
                        -l
                    ],
                    [
                        -a,
                        o,
                        l
                    ],
                    [
                        -a,
                        i,
                        -l
                    ],
                    [
                        -a,
                        i,
                        l
                    ]
                ], [
                    0,
                    0,
                    1 / 16,
                    1
                ]);
                u([
                    [
                        a,
                        o,
                        l
                    ],
                    [
                        a,
                        o,
                        -l
                    ],
                    [
                        a,
                        i,
                        l
                    ],
                    [
                        a,
                        i,
                        -l
                    ]
                ], [
                    15 / 16,
                    0,
                    1,
                    1
                ]);
            }
            let c = new LoY;
            c.setAttribute("position", new qtW(r, 3));
            c.setAttribute("uv", new qtW(t, 2));
            c.setIndex(s);
            c.computeVertexNormals();
            return c;
        })(width, height, d), [
        width,
        height
    ]);
    let c = useMemo(()=>new G_z({
            map: frontTexture,
            transparent: true,
            alphaTest: 0.01,
            side
        }), [
        frontTexture
    ]);
    let m = useMemo(()=>new G_z({
            map: backTexture,
            side: $EB
        }), [
        backTexture
    ]);
    useEffect(()=>()=>{
            l.dispose();
        }, [
        l
    ]);
    useEffect(()=>()=>{
            u.dispose();
        }, [
        u
    ]);
    useEffect(()=>()=>{
            c.dispose();
        }, [
        c
    ]);
    useEffect(()=>()=>{
            m.dispose();
        }, [
        m
    ]);
    return <group name="Entity_Painting_Precise"><mesh geometry={l} material={c} position={[
        0,
        0,
        d / 2 + 0.0005
    ]} castShadow receiveShadow raycast={X}/><mesh geometry={u} material={m} castShadow receiveShadow raycast={X}/></group>;
}
function EjComponent({ width, height, variant }) {
    let s = ((variant_1)=>{
        let i = (variant_1 == null ? undefined : variant_1.toLowerCase().replace("minecraft:", "")) ?? "";
        let r = 0;
        for(let e = 0; e < i.length; e++){
            r = 31 * r + i.charCodeAt(e) >>> 0;
        }
        return new Q1f().setHSL(r % 360 / 360, 0.38, 0.55).getHex();
    })(variant);
    return <group name="Entity_Painting_Fallback"><ErComponent position={[
        0,
        0,
        0
    ]} args={[
        width,
        height,
        0.07
    ]} color="#3b2a1d"/><ErComponent position={[
        0,
        0,
        0.045
    ]} args={[
        Math.max(0.1, width - 0.14),
        Math.max(0.1, height - 0.14),
        0.035
    ]} color={s}/></group>;
}
function ETComponent({ entity }) {
    let entity_textDisplay = entity.textDisplay;
    let s = entity_textDisplay?.text || entity.customName || "text";
    let maxWidth = Math.max(0.8, Math.min(4, (entity_textDisplay?.lineWidth ?? 120) / 80));
    let l = entity_textDisplay?.alignment ?? "center";
    let fillOpacity = entity_textDisplay?.textOpacity !== undefined ? Math.max(0.15, Math.min(1, entity_textDisplay.textOpacity / 255)) : 1;
    return <EnComponent transform={entity_textDisplay?.transform}><group name="Entity_TextDisplay" position={[
        0,
        0.5,
        0
    ]}>{!entity_textDisplay?.defaultBackground && <ErComponent position={[
        0,
        0,
        -0.015
    ]} args={[
        maxWidth + 0.2,
        0.48,
        0.035
    ]} color="#f4efe2" opacity={0.82}/>}<E_1 position={[
        0,
        0,
        0.03
    ]} fontSize={0.18} maxWidth={maxWidth} color="#15120c" anchorX={l} anchorY="middle" textAlign={l} fillOpacity={fillOpacity} raycast={X}>{s}</E_1></group></EnComponent>;
}
function eR(e, resources) {
    return !!e && !!resources && !!(e && resources && resources.blockIds.has(e)) && !resources.flatIconItemIds.has(e);
}
function EOComponent({ item, resources, atlasTexture, width = 0.62, height = 0.62 }) {
    if (eR(item?.itemId, resources)) {
        return <EMComponent item={item} resources={resources} atlasTexture={atlasTexture} size={Math.min(width, height)} fallback=<ENComponent item={item} resources={resources} atlasTexture={atlasTexture} width={width} height={height}/>/>;
    }
    return <ENComponent item={item} resources={resources} atlasTexture={atlasTexture} width={width} height={height}/>;
}
function EMComponent({ item, resources, atlasTexture, size, fallback }) {
    let blockId = item?.itemId;
    let l = item?.skull;
    let blockState = useMemo(()=>{
        if (blockId) {
            return {
                blockId,
                properties: cw(blockId, l) ?? {}
            };
        }
    }, [
        blockId,
        l
    ]);
    return <group name="Entity_ItemBlock"><EtComponent blockState={blockState} resources={resources} atlasTexture={atlasTexture} scale={size} centered rejectMagentaFallback fallback={fallback}/><EEComponent count={item?.count} width={size} height={size}/></group>;
}
function ENComponent({ item, resources, atlasTexture, width, height }) {
    if (M(item?.itemId)) {
        return <EIComponent item={item} resources={resources} atlasTexture={atlasTexture} width={width} height={height}/>;
    }
    return <EFComponent item={item} resources={resources} atlasTexture={atlasTexture} width={width} height={height}/>;
}
function EFComponent({ item, resources, atlasTexture, width, height }) {
    let l = useMemo(()=>((e)=>{
            if (!e) {
                return [];
            }
            let o = e.replace("minecraft:", "");
            let i = [];
            let r = new Set;
            (function e(o, i, r, t) {
                if (!o || r > 3) {
                    return;
                }
                if (!t) {
                    i(`minecraft:item/${o}`);
                    i(`minecraft:item/${o}_00`);
                }
                let s = j[o] ?? (t ? undefined : T[o]);
                for (let [n, a] of (s && i(s), i(`minecraft:block/${o}`), t || i(`minecraft:entity/${o}/${o}`), o.endsWith("_bed") && i(`minecraft:entity/bed/${o.slice(0, -4)}`), o.endsWith("_banner") && i("minecraft:entity/banner/base"), o.startsWith("waxed_") && e(o.slice(6), i, r + 1, t), R)){
                    if (!o.endsWith(n) || o.length === n.length) {
                        continue;
                    }
                    let t = o.slice(0, -n.length);
                    for (let e of a){
                        i(`minecraft:block/${t}${e}`);
                    }
                    e(t, i, r + 1, true);
                    break;
                }
            })(o, (e)=>{
                if (!r.has(e)) {
                    r.add(e);
                    i.push(e);
                }
            }, 0, false);
            return i;
        })(item?.itemId), [
        item?.itemId
    ]);
    let u = useMemo(()=>eW(resources, l), [
        resources,
        l
    ]);
    let c = useMemo(()=>{
        if (u) {
            return (([r, t, s, a], width_1, height_1)=>{
                let d = new LoY;
                d.setAttribute("position", new qtW([
                    -width_1 / 2,
                    -height_1 / 2,
                    0,
                    width_1 / 2,
                    -height_1 / 2,
                    0,
                    -width_1 / 2,
                    height_1 / 2,
                    0,
                    width_1 / 2,
                    height_1 / 2,
                    0
                ], 3));
                d.setAttribute("uv", new qtW([
                    r,
                    a,
                    s,
                    a,
                    r,
                    t,
                    s,
                    t
                ], 2));
                d.setIndex([
                    0,
                    1,
                    2,
                    2,
                    1,
                    3
                ]);
                d.computeVertexNormals();
                return d;
            })(u, width, height);
        }
        return null;
    }, [
        u,
        width,
        height
    ]);
    let m = useMemo(()=>{
        if (atlasTexture && u) {
            return new V9B({
                map: atlasTexture,
                transparent: true,
                alphaTest: 0.08,
                side: $EB
            });
        }
        return null;
    }, [
        atlasTexture,
        u
    ]);
    useEffect(()=>()=>{
            c?.dispose();
        }, [
        c
    ]);
    useEffect(()=>()=>{
            m?.dispose();
        }, [
        m
    ]);
    if (c && m) {
        return <group><mesh geometry={c} material={m} raycast={X}/><EEComponent count={item?.count} width={width} height={height}/></group>;
    }
    return <EJComponent item={item} width={width} height={height}/>;
}
function EIComponent({ item, resources, atlasTexture, width, height }) {
    let l = item?.itemId;
    let u = useMemo(()=>{
        let e = M(l);
        if (!e || !resources) {
            return null;
        }
        let o = [];
        for (let [r, t] of e.entries()){
            let e = eW(resources, [
                t.textureId
            ]);
            if (!e) {
                for (let e of o){
                    e.dispose();
                }
                return null;
            }
            o.push((([s, a, d, l], o, width_1, height_1, t)=>{
                let [u, c, m, x] = o.crop;
                let g = s + (d - s) * u;
                let p = a + (l - a) * c;
                let b = s + (d - s) * m;
                let y = a + (l - a) * x;
                let [h, f, _, v] = o.rect;
                let C = -width_1 / 2 + h * width_1;
                let z = -width_1 / 2 + _ * width_1;
                let P = height_1 / 2 - f * height_1;
                let w = height_1 / 2 - v * height_1;
                let k = new LoY;
                k.setAttribute("position", new qtW([
                    C,
                    w,
                    t,
                    z,
                    w,
                    t,
                    C,
                    P,
                    t,
                    z,
                    P,
                    t
                ], 3));
                let S = o.rotation === 180 ? [
                    [
                        b,
                        p
                    ],
                    [
                        g,
                        p
                    ],
                    [
                        b,
                        y
                    ],
                    [
                        g,
                        y
                    ]
                ] : [
                    [
                        g,
                        y
                    ],
                    [
                        b,
                        y
                    ],
                    [
                        g,
                        p
                    ],
                    [
                        b,
                        p
                    ]
                ];
                k.setAttribute("uv", new qtW(S.flat(), 2));
                k.setIndex([
                    0,
                    1,
                    2,
                    2,
                    1,
                    3
                ]);
                k.computeVertexNormals();
                return k;
            })(e, t, width, height, 0.004 * r));
        }
        return o;
    }, [
        l,
        resources,
        width,
        height
    ]);
    let c = useMemo(()=>{
        if (atlasTexture && u) {
            return new V9B({
                map: atlasTexture,
                transparent: true,
                alphaTest: 0.08,
                side: $EB
            });
        }
        return null;
    }, [
        atlasTexture,
        u
    ]);
    useEffect(()=>()=>{
            if (u) {
                for (let e of u){
                    e.dispose();
                }
            }
        }, [
        u
    ]);
    useEffect(()=>()=>{
            c?.dispose();
        }, [
        c
    ]);
    if (u && c) {
        return <group>{u.map((geometry, key)=><mesh key={key} geometry={geometry} material={c} raycast={X}/>)}<EEComponent count={item?.count} width={width} height={height}/></group>;
    }
    return <EJComponent item={item} width={width} height={height}/>;
}
function EJComponent({ item, width, height }) {
    return <ErComponent position={[
        0,
        0,
        0
    ]} args={[
        0.58 * width,
        0.58 * height,
        0.045
    ]} color={eV(item?.itemId)}/>;
}
function EEComponent({ count, width, height }) {
    if (!count || count <= 1) {
        return null;
    }
    return <E_1 position={[
        0.36 * width,
        -(0.34 * height),
        0.02
    ]} fontSize={0.09} color="#ffffff" anchorX="right" anchorY="bottom" raycast={X}>{String(count)}</E_1>;
}
function EqComponent({ blockId }) {
    return <group name="Entity_DisplayBlock"><ErComponent position={[
        0,
        0.5,
        0
    ]} args={[
        0.82,
        0.82,
        0.82
    ]} color={eG(blockId)} opacity={0.92}/></group>;
}
function EAComponent({ showBottom }) {
    return <group name="Entity_EndCrystal">{showBottom && <><ErComponent position={[
        0,
        0.12,
        0
    ]} args={[
        0.62,
        0.14,
        0.62
    ]} color="#302245"/><ErComponent position={[
        0,
        0.24,
        0
    ]} args={[
        0.42,
        0.14,
        0.42
    ]} color="#534061"/></>}<mesh position={[
        0,
        0.78,
        0
    ]} rotation={[
        0.4,
        0.4,
        0.2
    ]} raycast={X}><octahedronGeometry args={[
        0.36,
        0
    ]}/><meshLambertMaterial color="#f3d7ff" transparent opacity={0.72}/></mesh><mesh position={[
        0,
        0.78,
        0
    ]} rotation={[
        -0.2,
        0.8,
        0.2
    ]} raycast={X}><octahedronGeometry args={[
        0.22,
        0
    ]}/><meshLambertMaterial color="#a95cff" emissive="#3c0f72" emissiveIntensity={0.35}/></mesh></group>;
}
function EBComponent({ entity, resources, atlasTexture, forceEntityModelFallback }) {
    let s = forceEntityModelFallback ? null : Pc(entity);
    if (s && resources && atlasTexture) {
        return <group name="Entity_LeashKnot_Precise"><Q1Component model={s.model} textureId={s.texture} resources={resources} atlasTexture={atlasTexture} fallback=<EYComponent/>/></group>;
    }
    return <EYComponent/>;
}
function EYComponent() {
    return <group name="Entity_LeashKnot_Fallback"><mesh position={[
        0,
        0,
        0.045
    ]} raycast={X}><torusGeometry args={[
        0.14,
        0.035,
        8,
        18
    ]}/><meshLambertMaterial color="#6d4a2b"/></mesh><ErComponent position={[
        0,
        0,
        0
    ]} args={[
        0.1,
        0.1,
        0.1
    ]} color="#8a633d"/></group>;
}
function EKComponent() {
    return <group name="Entity_Marker"><ErComponent position={[
        0,
        0.2,
        0
    ]} args={[
        0.34,
        0.34,
        0.34
    ]} color="#6cc6ff" opacity={0.28} wireframe/><ErComponent position={[
        0,
        0.2,
        0
    ]} args={[
        0.04,
        0.42,
        0.04
    ]} color="#6cc6ff" opacity={0.45}/><ErComponent position={[
        0,
        0.2,
        0
    ]} args={[
        0.42,
        0.04,
        0.04
    ]} color="#6cc6ff" opacity={0.45}/><ErComponent position={[
        0,
        0.2,
        0
    ]} args={[
        0.04,
        0.04,
        0.42
    ]} color="#6cc6ff" opacity={0.45}/></group>;
}
function ELComponent({ entity }) {
    let a = Math.max(0.2, entity.interaction?.width ?? 1);
    let d = Math.max(0.2, entity.interaction?.height ?? 1);
    return <group name="Entity_Interaction"><ErComponent position={[
        0,
        d / 2,
        0
    ]} args={[
        a,
        d,
        a
    ]} color="#b36cff" opacity={0.18} wireframe/></group>;
}
function EDComponent({ entityId }) {
    return <group name="Entity_Generic"><ErComponent position={[
        0,
        0.4,
        0
    ]} args={[
        0.42,
        0.42,
        0.42
    ]} color={eU(entityId)}/><ErComponent position={[
        0,
        0.92,
        0
    ]} args={[
        0.18,
        0.62,
        0.18
    ]} color={eU(entityId)} opacity={0.85}/></group>;
}
function EHComponent({ facing, children }) {
    return <group rotation={p(facing)}>{children}</group>;
}
function eW(resources, o) {
    if (!resources) {
        return null;
    }
    for (let i of o){
        if (nV(i)) {
            try {
                let o = resources.atlas.getTextureUV(gw.parse(i));
                if (o && o.length === 4) {
                    return [
                        o[0],
                        o[1],
                        o[2],
                        o[3]
                    ];
                }
            } catch (e) {}
        }
    }
    return null;
}
function eG(e) {
    if (!e) {
        return "#8b8f98";
    }
    let o = e.replace("minecraft:", "");
    if (o.includes("redstone") || o.includes("tnt")) {
        return "#d13f2f";
    }
    if (o.includes("gold") || o.includes("honey")) {
        return "#d6a931";
    }
    if (o.includes("diamond") || o.includes("ice")) {
        return "#4aaecf";
    }
    if (o.includes("emerald") || o.includes("slime")) {
        return "#3fab5f";
    }
    if (o.includes("wood") || o.includes("planks") || o.includes("log")) {
        return "#8a5a2b";
    }
    if (o.includes("stone") || o.includes("ore") || o.includes("deepslate")) {
        return "#777b82";
    }
    return "#8b8f98";
}
function eV(e) {
    if (!e) {
        return "#8b8f98";
    }
    let o = e.replace("minecraft:", "");
    if (o.includes("netherite")) {
        return "#3a303d";
    }
    if (o.includes("diamond")) {
        return "#46c8d8";
    }
    if (o.includes("gold") || o.includes("golden")) {
        return "#f0c644";
    }
    if (o.includes("iron") || o.includes("chainmail")) {
        return "#c9ced4";
    }
    if (o.includes("copper")) {
        return "#c8793b";
    }
    if (o.includes("leather")) {
        return "#8f5a34";
    }
    if (o.includes("shield")) {
        return "#7b5430";
    }
    if (o.includes("sword") || o.includes("axe") || o.includes("pickaxe") || o.includes("shovel") || o.includes("hoe")) {
        return "#b7bcc5";
    }
    if (o.includes("bow") || o.includes("crossbow") || o.includes("stick")) {
        return "#8a5a2b";
    }
    if (o.includes("redstone") || o.includes("tnt")) {
        return "#d13f2f";
    }
    return eG(e);
}
function eU(entityId) {
    let o = 0;
    for(let i = 0; i < entityId.length; i++){
        o = 31 * o + entityId.charCodeAt(i) >>> 0;
    }
    let i = o % 360 / 360;
    return new Q1f().setHSL(i, 0.55, 0.52).getHex();
}
let e$ = A;
export { e$ as h };
