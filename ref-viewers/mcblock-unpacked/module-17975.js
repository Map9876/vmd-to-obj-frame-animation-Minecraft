import { Bk, TI, Th, Wk, XK, bG, cV, dG, hn, kd, mL, oY, sj, t7, uj } from "./module-56841.js";
import * as i from "./module-5166.js";
const o = require(75342);
const l = require(49745);
let a = {
    down: [
        0,
        -1,
        0
    ],
    up: [
        0,
        1,
        0
    ],
    north: [
        0,
        0,
        -1
    ],
    south: [
        0,
        0,
        1
    ],
    west: [
        -1,
        0,
        0
    ],
    east: [
        1,
        0,
        0
    ]
};
let u = [
    "brown",
    "white",
    "black",
    "white_splotched",
    "gold",
    "salt"
];
let c = uj;
let s = t7;
let f = Th;
let d = kd;
let m = TI.slice(0, 6);
let g = TI.slice(6);
export function pm(t) {
    let e = [];
    let n = new Set;
    for (let container of t){
        if (!n.has(container)) {
            for (let t of (n.add(container), [
                "Entities",
                "entities"
            ])){
                let n;
                if (container.has(t)) {
                    try {
                        n = container.getList(t, 10);
                    } catch (t) {
                        continue;
                    }
                    for(let c = 0; c < n.length; c++){
                        let entity = ((t)=>{
                            let n;
                            let l = ((t)=>{
                                let e = t.get("Data");
                                if (!e?.isCompound()) {
                                    return t;
                                }
                                let n = new Set([
                                    "Pos",
                                    "pos",
                                    "Id",
                                    "id"
                                ]);
                                return {
                                    get: (r)=>{
                                        if (n.has(r)) {
                                            return t.get(r) ?? e.get(r);
                                        }
                                        return e.get(r) ?? t.get(r);
                                    },
                                    has: (r)=>{
                                        if (n.has(r)) {
                                            return t.has(r) || e.has(r);
                                        }
                                        return e.has(r) || t.has(r);
                                    }
                                };
                            })(t);
                            let entityId = ((t)=>{
                                if (typeof t !== "string") {
                                    return null;
                                }
                                let e = t.trim();
                                if (!e) {
                                    return null;
                                }
                                if (e.includes(":")) {
                                    return e.toLowerCase();
                                }
                                let n = p[e.toLowerCase().replace(/_/g, "")];
                                if (n) {
                                    return `minecraft:${n}`;
                                }
                                let r = /[A-Z]/.test(e) ? e.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase() : e.toLowerCase();
                                return `minecraft:${r}`;
                            })(T(l, [
                                "id",
                                "Id",
                                "entity_id",
                                "EntityId"
                            ]));
                            if (!entityId) {
                                return;
                            }
                            let kind = ((entityId_1)=>{
                                let e = entityId_1.replace("minecraft:", "");
                                if (e === "armor_stand") {
                                    return "armor_stand";
                                }
                                if (e.includes("minecart")) {
                                    return "minecart";
                                }
                                if (e.includes("boat") || e.includes("raft")) {
                                    return "boat";
                                }
                                if (e.includes("item_frame")) {
                                    return "item_frame";
                                }
                                if (e === "painting") {
                                    return "painting";
                                }
                                if (e === "block_display") {
                                    return "block_display";
                                }
                                if (e === "item_display") {
                                    return "item_display";
                                }
                                if (e === "text_display") {
                                    return "text_display";
                                }
                                if (e === "falling_block") {
                                    return "falling_block";
                                }
                                if (e === "tnt") {
                                    return "tnt";
                                }
                                if (e === "end_crystal") {
                                    return "end_crystal";
                                }
                                if (e === "leash_knot") {
                                    return "leash_knot";
                                }
                                if (e === "marker") {
                                    return "marker";
                                }
                                if (e === "interaction") {
                                    return "interaction";
                                }
                                return "generic";
                            })(entityId);
                            let position = ((t)=>{
                                let n = A(t.get("Pos") ?? t.get("pos"));
                                if (n) {
                                    return n;
                                }
                                let r = I(t, [
                                    "x",
                                    "X"
                                ]);
                                let i = I(t, [
                                    "y",
                                    "Y"
                                ]);
                                let o = I(t, [
                                    "z",
                                    "Z"
                                ]);
                                if (r !== undefined && i !== undefined && o !== undefined) {
                                    return [
                                        r,
                                        i,
                                        o
                                    ];
                                }
                                let l = b(t);
                                if (!l) {
                                    return null;
                                }
                                let u = L(t, [
                                    "Facing",
                                    "facing",
                                    "Direction",
                                    "direction"
                                ]);
                                if (!u) {
                                    return [
                                        l[0] + 0.5,
                                        l[1] + 0.5,
                                        l[2] + 0.5
                                    ];
                                }
                                let c = a[u];
                                return [
                                    l[0] + 0.5 + 0.501 * c[0],
                                    l[1] + 0.5 + 0.501 * c[1],
                                    l[2] + 0.5 + 0.501 * c[2]
                                ];
                            })(l);
                            if (!position) {
                                return;
                            }
                            let rotation = ((t)=>{
                                let n = N(t.get("Rotation") ?? t.get("rotation"));
                                if (n && n.length >= 2) {
                                    return [
                                        n[0],
                                        n[1]
                                    ];
                                }
                                let r = I(t, [
                                    "yaw",
                                    "Yaw",
                                    "yRot",
                                    "YRot"
                                ]);
                                let i = I(t, [
                                    "pitch",
                                    "Pitch",
                                    "xRot",
                                    "XRot"
                                ]);
                                if (r === undefined && i === undefined) {
                                    return null;
                                }
                                return [
                                    r ?? 0,
                                    i ?? 0
                                ];
                            })(l);
                            let j = T(l, [
                                "CustomName",
                                "custom_name",
                                "Name",
                                "name"
                            ]);
                            let blockState = ((t)=>{
                                let e = _(t, [
                                    "block_state",
                                    "BlockState",
                                    "blockState",
                                    "DisplayState",
                                    "display_state"
                                ]);
                                if (e) {
                                    return e;
                                }
                                let n = T(t, [
                                    "block",
                                    "Block",
                                    "Tile",
                                    "tile",
                                    "block_id",
                                    "BlockId",
                                    "DisplayTile"
                                ]);
                                if (typeof n === "string" && n.trim()) {
                                    return {
                                        blockId: i.C(n),
                                        properties: {}
                                    };
                                }
                            })(l);
                            let armorStand = kind === "armor_stand" ? ((t)=>{
                                let e = ((t)=>{
                                    let n = t.get("Pose") ?? t.get("pose");
                                    if (!n?.isCompound()) {
                                        return;
                                    }
                                    let r = {};
                                    for (let [t, e] of [
                                        [
                                            "head",
                                            [
                                                "Head",
                                                "head"
                                            ]
                                        ],
                                        [
                                            "body",
                                            [
                                                "Body",
                                                "body"
                                            ]
                                        ],
                                        [
                                            "leftArm",
                                            [
                                                "LeftArm",
                                                "left_arm",
                                                "LeftArmPose"
                                            ]
                                        ],
                                        [
                                            "rightArm",
                                            [
                                                "RightArm",
                                                "right_arm",
                                                "RightArmPose"
                                            ]
                                        ],
                                        [
                                            "leftLeg",
                                            [
                                                "LeftLeg",
                                                "left_leg",
                                                "LeftLegPose"
                                            ]
                                        ],
                                        [
                                            "rightLeg",
                                            [
                                                "RightLeg",
                                                "right_leg",
                                                "RightLegPose"
                                            ]
                                        ]
                                    ]){
                                        for (let i of e){
                                            let e = A(n.get(i));
                                            if (e) {
                                                r[t] = e;
                                                break;
                                            }
                                        }
                                    }
                                    if (Object.keys(r).length > 0) {
                                        return r;
                                    }
                                })(t);
                                let n = ((t)=>{
                                    let items = {};
                                    let skulls = {};
                                    let l = (t, e)=>{
                                        if (e?.itemId && !items[t]) {
                                            items[t] = e.itemId;
                                            if (e.skull) {
                                                skulls[t] = e.skull;
                                            }
                                        }
                                    };
                                    let a = w(t, [
                                        "ArmorItems",
                                        "armor_items"
                                    ]) ?? [];
                                    l("feet", a[0]);
                                    l("legs", a[1]);
                                    l("chest", a[2]);
                                    l("head", a[3]);
                                    let u = w(t, [
                                        "HandItems",
                                        "hand_items"
                                    ]) ?? [];
                                    l("mainHand", u[0]);
                                    l("offHand", u[1]);
                                    let c = t.get("equipment");
                                    if (c?.isCompound()) {
                                        l("head", C(c.get("head")));
                                        l("chest", C(c.get("chest")));
                                        l("legs", C(c.get("legs")));
                                        l("feet", C(c.get("feet")));
                                        l("mainHand", C(c.get("mainhand")));
                                        l("offHand", C(c.get("offhand")));
                                    }
                                    let s = w(t, [
                                        "Equipment",
                                        "equipment"
                                    ]) ?? [];
                                    l("mainHand", s[0]);
                                    l("feet", s[1]);
                                    l("legs", s[2]);
                                    l("chest", s[3]);
                                    l("head", s[4]);
                                    if (Object.keys(items).length !== 0) {
                                        if (Object.keys(skulls).length > 0) {
                                            return {
                                                items,
                                                skulls
                                            };
                                        }
                                        return {
                                            items
                                        };
                                    }
                                })(t);
                                let r = {};
                                let i = x(t, [
                                    "Small",
                                    "small"
                                ]);
                                let o = x(t, [
                                    "ShowArms",
                                    "show_arms"
                                ]);
                                let l = x(t, [
                                    "NoBasePlate",
                                    "no_base_plate"
                                ]);
                                let a = x(t, [
                                    "Marker",
                                    "marker"
                                ]);
                                let u = x(t, [
                                    "Invisible",
                                    "invisible"
                                ]);
                                if (i !== undefined) {
                                    r.small = i;
                                }
                                if (o !== undefined) {
                                    r.showArms = o;
                                }
                                if (l !== undefined) {
                                    r.noBasePlate = l;
                                }
                                if (a !== undefined) {
                                    r.marker = a;
                                }
                                if (u !== undefined) {
                                    r.invisible = u;
                                }
                                if (e && Object.keys(e).length > 0) {
                                    r.pose = e;
                                }
                                if (n) {
                                    r.equipment = n.items;
                                    if (n.skulls) {
                                        r.equipmentSkulls = n.skulls;
                                    }
                                }
                                if (Object.keys(r).length > 0) {
                                    return r;
                                }
                            })(l) : undefined;
                            let itemFrame = kind === "item_frame" ? ((t, entityId_1)=>{
                                let n = {
                                    glow: entityId_1.includes("glow")
                                };
                                let r = L(t, [
                                    "Facing",
                                    "facing",
                                    "Direction",
                                    "direction"
                                ]);
                                let i = b(t);
                                let o = k(t, [
                                    "Item",
                                    "item"
                                ]);
                                let l = I(t, [
                                    "ItemRotation",
                                    "item_rotation"
                                ]);
                                if (r) {
                                    n.facing = r;
                                }
                                if (i) {
                                    n.tile = i;
                                }
                                if (o) {
                                    n.item = o;
                                }
                                if (l !== undefined) {
                                    n.itemRotation = l;
                                }
                                return n;
                            })(l, entityId) : undefined;
                            let painting = kind === "painting" ? ((t)=>{
                                let motive = S(t, [
                                    "Motive",
                                    "motive"
                                ]);
                                let n = S(t, [
                                    "variant",
                                    "Variant"
                                ]);
                                let r = o.Vs(n ?? motive);
                                let size = r ? o.o(r) : undefined;
                                let facing = ((t)=>{
                                    let e = [
                                        "facing",
                                        "Facing",
                                        "Direction",
                                        "direction",
                                        "Dir"
                                    ];
                                    let n = T(t, e);
                                    if (typeof n === "number") {
                                        return ({
                                            0: "south",
                                            1: "west",
                                            2: "north",
                                            3: "east"
                                        })[Math.trunc(n)];
                                    }
                                    return L(t, e);
                                })(t);
                                let tile = b(t);
                                return {
                                    ...motive ? {
                                        motive
                                    } : {},
                                    ...n ? {
                                        variant: n
                                    } : {},
                                    ...size ? {
                                        size
                                    } : {},
                                    ...facing ? {
                                        facing
                                    } : {},
                                    ...tile ? {
                                        tile
                                    } : {}
                                };
                            })(l) : undefined;
                            let blockDisplay = kind === "block_display" ? {
                                blockState,
                                transform: y(l)
                            } : undefined;
                            let itemDisplay = kind === "item_display" ? {
                                item: k(l, [
                                    "item",
                                    "Item",
                                    "item_stack",
                                    "ItemStack"
                                ]),
                                transform: y(l),
                                itemDisplay: S(l, [
                                    "item_display",
                                    "ItemDisplay",
                                    "display",
                                    "Display"
                                ])
                            } : undefined;
                            let textDisplay = kind === "text_display" ? ((t)=>{
                                let e = T(t, [
                                    "text",
                                    "Text"
                                ]);
                                let transform = y(t);
                                let r = S(t, [
                                    "alignment",
                                    "Alignment"
                                ]);
                                let i = r === "left" || r === "right" ? r : r === "center" ? "center" : undefined;
                                let o = {
                                    ...e !== undefined ? {
                                        text: O(e)
                                    } : {},
                                    ...transform ? {
                                        transform
                                    } : {}
                                };
                                let l = I(t, [
                                    "line_width",
                                    "LineWidth"
                                ]);
                                let a = I(t, [
                                    "background",
                                    "Background"
                                ]);
                                let u = I(t, [
                                    "text_opacity",
                                    "TextOpacity"
                                ]);
                                let c = x(t, [
                                    "see_through",
                                    "SeeThrough"
                                ]);
                                let s = x(t, [
                                    "default_background",
                                    "DefaultBackground"
                                ]);
                                if (l !== undefined) {
                                    o.lineWidth = l;
                                }
                                if (a !== undefined) {
                                    o.background = a;
                                }
                                if (u !== undefined) {
                                    o.textOpacity = u;
                                }
                                if (i) {
                                    o.alignment = i;
                                }
                                if (c !== undefined) {
                                    o.seeThrough = c;
                                }
                                if (s !== undefined) {
                                    o.defaultBackground = s;
                                }
                                return o;
                            })(l) : undefined;
                            let fallingBlock = kind === "falling_block" ? blockState : undefined;
                            let minecart = kind === "minecart" ? ((t, entityId_1)=>{
                                let r = ((entityId_1_1)=>{
                                    let e = entityId_1_1.replace("minecraft:", "");
                                    if (e.includes("command_block")) {
                                        return "command_block";
                                    }
                                    if (e.includes("spawner")) {
                                        return "spawner";
                                    }
                                    if (e.includes("chest")) {
                                        return "chest";
                                    }
                                    if (e.includes("hopper")) {
                                        return "hopper";
                                    }
                                    if (e.includes("tnt")) {
                                        return "tnt";
                                    }
                                    if (e.includes("furnace")) {
                                        return "furnace";
                                    }
                                    return "normal";
                                })(entityId_1);
                                let displayBlock = _(t, [
                                    "DisplayState",
                                    "display_state"
                                ]) ?? ((t)=>{
                                    if (t === "normal") {
                                        return;
                                    }
                                    let e = {
                                        chest: "minecraft:chest",
                                        hopper: "minecraft:hopper",
                                        tnt: "minecraft:tnt",
                                        furnace: "minecraft:furnace",
                                        command_block: "minecraft:command_block",
                                        spawner: "minecraft:spawner"
                                    }[t];
                                    if (e) {
                                        return {
                                            blockId: e,
                                            properties: {}
                                        };
                                    }
                                })(r);
                                let displayOffset = I(t, [
                                    "DisplayOffset",
                                    "display_offset"
                                ]);
                                return {
                                    variant: r,
                                    ...displayBlock ? {
                                        displayBlock
                                    } : {},
                                    ...displayOffset !== undefined ? {
                                        displayOffset
                                    } : {}
                                };
                            })(l, entityId) : undefined;
                            let boat = kind === "boat" ? ((t, entityId_1)=>{
                                let n = entityId_1.replace("minecraft:", "");
                                let r = S(t, [
                                    "Type",
                                    "type",
                                    "variant",
                                    "Variant"
                                ]);
                                let i = ((t)=>{
                                    let e = t.replace("_chest_boat", "").replace("_boat", "").replace("_chest_raft", "").replace("_raft", "");
                                    if (e && e !== t) {
                                        return e;
                                    }
                                })(n);
                                return {
                                    woodType: ((t)=>{
                                        if (t) {
                                            return t.trim().toLowerCase().replace("minecraft:", "");
                                        }
                                    })(r ?? i),
                                    chest: n.includes("chest"),
                                    raft: n.includes("raft") || r === "bamboo"
                                };
                            })(l, entityId) : undefined;
                            let villager = entityId === "minecraft:villager" || entityId === "minecraft:zombie_villager" ? ((t)=>{
                                let n = t.get("VillagerData") ?? t.get("villager_data");
                                if (!n?.isCompound()) {
                                    return;
                                }
                                let i = ((t)=>{
                                    let e = D(t);
                                    if (Bk.includes(e)) {
                                        return e;
                                    }
                                })(S(n, [
                                    "type",
                                    "Type"
                                ]));
                                let profession = ((t)=>{
                                    let e = D(t);
                                    if (hn.includes(e)) {
                                        return e;
                                    }
                                })(S(n, [
                                    "profession",
                                    "Profession"
                                ]));
                                let l = I(n, [
                                    "level",
                                    "Level"
                                ]);
                                let level = l === undefined ? undefined : Math.max(1, Math.min(5, Math.trunc(l)));
                                if (i || profession || level !== undefined) {
                                    return {
                                        ...i ? {
                                            type: i
                                        } : {},
                                        ...profession ? {
                                            profession
                                        } : {},
                                        ...level !== undefined ? {
                                            level
                                        } : {}
                                    };
                                }
                            })(l) : undefined;
                            let cat = entityId === "minecraft:cat" ? ((t)=>{
                                let e = ((t)=>{
                                    let e = D(t);
                                    if (oY.includes(e)) {
                                        return e;
                                    }
                                })(S(t, [
                                    "variant",
                                    "Variant"
                                ]));
                                if (e) {
                                    return {
                                        variant: e
                                    };
                                }
                                let n = I(t, [
                                    "CatType",
                                    "cat_type"
                                ]);
                                let i = n === undefined ? undefined : oY[Math.trunc(n)];
                                if (i) {
                                    return {
                                        variant: i
                                    };
                                }
                            })(l) : undefined;
                            let pig = entityId === "minecraft:pig" ? ((t)=>{
                                let e = x(t, [
                                    "Saddle",
                                    "saddle"
                                ]);
                                if (e === undefined) {
                                    return undefined;
                                }
                                return {
                                    saddled: e
                                };
                            })(l) : undefined;
                            let sheep = entityId === "minecraft:sheep" ? ((t)=>{
                                let e = R(T(t, [
                                    "Color",
                                    "color"
                                ]));
                                let sheared = x(t, [
                                    "Sheared",
                                    "sheared"
                                ]);
                                if (e || sheared !== undefined) {
                                    return {
                                        ...e ? {
                                            color: e
                                        } : {},
                                        ...sheared !== undefined ? {
                                            sheared
                                        } : {}
                                    };
                                }
                            })(l) : undefined;
                            let wolf = entityId === "minecraft:wolf" ? ((t)=>{
                                let collarColor = R(T(t, [
                                    "CollarColor",
                                    "collar_color"
                                ]));
                                let n = x(t, [
                                    "Tame",
                                    "tame"
                                ]);
                                let r = [
                                    "Owner",
                                    "OwnerUUID",
                                    "owner",
                                    "owner_uuid"
                                ].some((e)=>t.has(e));
                                let i = I(t, [
                                    "AngerTime",
                                    "anger_time"
                                ]);
                                let o = x(t, [
                                    "Angry",
                                    "angry"
                                ]);
                                let tamed = n ?? (!!r || undefined);
                                let a = o ?? (i !== undefined ? i > 0 : undefined);
                                if (collarColor || tamed !== undefined || a !== undefined) {
                                    return {
                                        ...collarColor ? {
                                            collarColor
                                        } : {},
                                        ...tamed !== undefined ? {
                                            tamed
                                        } : {},
                                        ...a !== undefined ? {
                                            angry: a
                                        } : {}
                                    };
                                }
                            })(l) : undefined;
                            let horse = entityId === "minecraft:horse" ? ((t)=>{
                                let e = I(t, [
                                    "Variant",
                                    "variant"
                                ]);
                                if (e === undefined) {
                                    return;
                                }
                                let n = Math.trunc(e);
                                let i = bG[255 & n];
                                let marking = XK[n >> 8 & 255];
                                if (i || marking) {
                                    return {
                                        ...i ? {
                                            color: i
                                        } : {},
                                        ...marking ? {
                                            marking
                                        } : {}
                                    };
                                }
                            })(l) : undefined;
                            let rabbit = entityId === "minecraft:rabbit" ? ((t, e)=>{
                                if (((t)=>typeof t === "string" && O(t)?.trim().toLowerCase() === "toast")(e)) {
                                    return {
                                        variant: "toast"
                                    };
                                }
                                let n = ((t)=>{
                                    let e = D(t);
                                    if (cV.includes(e)) {
                                        return e;
                                    }
                                })(S(t, [
                                    "variant",
                                    "Variant"
                                ]));
                                if (n) {
                                    return {
                                        variant: n
                                    };
                                }
                                let i = I(t, [
                                    "RabbitType",
                                    "rabbit_type"
                                ]);
                                if (i === undefined) {
                                    return;
                                }
                                let o = Math.trunc(i) === 99 ? "caerbannog" : u[Math.trunc(i)];
                                if (o) {
                                    return {
                                        variant: o
                                    };
                                }
                            })(l, j) : undefined;
                            let fox = entityId === "minecraft:fox" ? ((t)=>{
                                let e = ((t)=>{
                                    let e = D(t);
                                    if (sj.includes(e)) {
                                        return e;
                                    }
                                })(S(t, [
                                    "Type",
                                    "type",
                                    "variant",
                                    "Variant"
                                ]));
                                if (e) {
                                    return {
                                        type: e
                                    };
                                }
                            })(l) : undefined;
                            let panda = entityId === "minecraft:panda" ? ((t)=>{
                                let e = B(T(t, [
                                    "MainGene",
                                    "main_gene"
                                ]));
                                if (!e) {
                                    return;
                                }
                                let n = B(T(t, [
                                    "HiddenGene",
                                    "hidden_gene"
                                ]));
                                return {
                                    gene: (e === "brown" || e === "weak") && n !== e ? "normal" : e
                                };
                            })(l) : undefined;
                            let axolotl = entityId === "minecraft:axolotl" ? ((t)=>{
                                let e = ((t)=>{
                                    if (typeof t === "number") {
                                        return s[Math.trunc(t)];
                                    }
                                    let e = D(t);
                                    if (t7.includes(e)) {
                                        return e;
                                    }
                                })(T(t, [
                                    "Variant",
                                    "variant"
                                ]));
                                if (e) {
                                    return {
                                        variant: e
                                    };
                                }
                            })(l) : undefined;
                            let llama = entityId === "minecraft:llama" || entityId === "minecraft:trader_llama" ? ((t)=>{
                                let e = ((t)=>{
                                    if (typeof t === "number") {
                                        return f[Math.trunc(t)];
                                    }
                                    let e = D(t);
                                    if (Th.includes(e)) {
                                        return e;
                                    }
                                })(T(t, [
                                    "Variant",
                                    "variant"
                                ]));
                                let chested = x(t, [
                                    "ChestedHorse",
                                    "chested_horse",
                                    "HasChest",
                                    "has_chest"
                                ]);
                                let i = k(t, [
                                    "DecorItem",
                                    "decor_item"
                                ]);
                                let decorColor = ((t)=>{
                                    if (!t) {
                                        return;
                                    }
                                    let e = t.replace(/^minecraft:/, "").replace(/_carpet$/, "");
                                    if (Wk.includes(e)) {
                                        return e;
                                    }
                                })(i?.itemId);
                                if (e || chested !== undefined || decorColor) {
                                    return {
                                        ...e ? {
                                            variant: e
                                        } : {},
                                        ...chested !== undefined ? {
                                            chested
                                        } : {},
                                        ...decorColor ? {
                                            decorColor
                                        } : {}
                                    };
                                }
                            })(l) : undefined;
                            let bee = entityId === "minecraft:bee" ? ((t)=>{
                                let hasNectar = x(t, [
                                    "HasNectar",
                                    "has_nectar"
                                ]);
                                let hasStung = x(t, [
                                    "HasStung",
                                    "has_stung"
                                ]);
                                let r = I(t, [
                                    "AngerTime",
                                    "anger_time"
                                ]);
                                let i = x(t, [
                                    "Angry",
                                    "angry"
                                ]);
                                let o = i ?? (r !== undefined ? r > 0 : undefined);
                                if (hasNectar !== undefined || hasStung !== undefined || o !== undefined) {
                                    return {
                                        hasNectar,
                                        hasStung,
                                        angry: o
                                    };
                                }
                            })(l) : undefined;
                            let parrot = entityId === "minecraft:parrot" ? ((t)=>{
                                let e = ((t)=>{
                                    if (typeof t === "number") {
                                        return d[Math.trunc(t)];
                                    }
                                    let e = D(t);
                                    if (kd.includes(e)) {
                                        return e;
                                    }
                                })(T(t, [
                                    "Variant",
                                    "variant"
                                ]));
                                if (e) {
                                    return {
                                        variant: e
                                    };
                                }
                            })(l) : undefined;
                            let frog = entityId === "minecraft:frog" ? ((t)=>{
                                let e = ((t)=>{
                                    let e = D(t);
                                    if (mL.includes(e)) {
                                        return e;
                                    }
                                })(S(t, [
                                    "variant",
                                    "Variant"
                                ]));
                                if (e) {
                                    return {
                                        variant: e
                                    };
                                }
                            })(l) : undefined;
                            let mooshroom = entityId === "minecraft:mooshroom" ? ((t)=>{
                                let e = ((t)=>{
                                    let e = D(t);
                                    if (dG.includes(e)) {
                                        return e;
                                    }
                                })(S(t, [
                                    "Type",
                                    "type",
                                    "variant",
                                    "Variant"
                                ]));
                                if (e) {
                                    return {
                                        variant: e
                                    };
                                }
                            })(l) : undefined;
                            let shulker = entityId === "minecraft:shulker" ? ((t)=>{
                                let e = R(T(t, [
                                    "Color",
                                    "color"
                                ]));
                                if (e) {
                                    return {
                                        color: e
                                    };
                                }
                            })(l) : undefined;
                            let creeper = entityId === "minecraft:creeper" ? ((t)=>{
                                let charged = x(t, [
                                    "powered",
                                    "Powered",
                                    "charged",
                                    "Charged"
                                ]);
                                if (charged !== undefined) {
                                    return {
                                        charged
                                    };
                                }
                            })(l) : undefined;
                            let strider = entityId === "minecraft:strider" ? ((t)=>{
                                let cold = x(t, [
                                    "IsCold",
                                    "is_cold",
                                    "Cold",
                                    "cold"
                                ]);
                                let n = x(t, [
                                    "Saddle",
                                    "saddle"
                                ]);
                                if (cold !== undefined || n !== undefined) {
                                    return {
                                        cold,
                                        saddled: n
                                    };
                                }
                            })(l) : undefined;
                            let wither = entityId === "minecraft:wither" ? ((t)=>{
                                let e = I(t, [
                                    "Invul",
                                    "invul",
                                    "InvulnerableTicks"
                                ]);
                                if (e !== undefined) {
                                    return {
                                        invulnerable: e > 0
                                    };
                                }
                            })(l) : undefined;
                            let pufferfish = entityId === "minecraft:pufferfish" ? ((t)=>{
                                let e = I(t, [
                                    "PuffState",
                                    "puff_state"
                                ]);
                                if (e !== undefined) {
                                    return {
                                        puffState: Math.max(0, Math.min(2, Math.trunc(e)))
                                    };
                                }
                            })(l) : undefined;
                            let tropicalFish = entityId === "minecraft:tropical_fish" ? ((t)=>{
                                let e = I(t, [
                                    "Variant",
                                    "variant"
                                ]);
                                if (e === undefined) {
                                    return;
                                }
                                let n = Math.trunc(e) >>> 0;
                                let r = ((255 & n) == 0 ? m : g)[n >>> 8 & 255];
                                let baseColor = R(n >>> 16 & 255);
                                let patternColor = R(n >>> 24 & 255);
                                if (r || baseColor || patternColor) {
                                    return {
                                        ...r ? {
                                            variant: r
                                        } : {},
                                        ...baseColor ? {
                                            baseColor
                                        } : {},
                                        ...patternColor ? {
                                            patternColor
                                        } : {}
                                    };
                                }
                            })(l) : undefined;
                            let tnt = kind === "tnt" ? {
                                fuse: I(l, [
                                    "Fuse",
                                    "fuse"
                                ])
                            } : undefined;
                            let endCrystal = kind === "end_crystal" ? {
                                showBottom: x(l, [
                                    "ShowBottom",
                                    "show_bottom"
                                ])
                            } : undefined;
                            let leashKnot = kind === "leash_knot" ? {
                                tile: b(l) ?? undefined
                            } : undefined;
                            let interaction = kind === "interaction" ? {
                                width: I(n = l, [
                                    "width",
                                    "Width"
                                ]),
                                height: I(n, [
                                    "height",
                                    "Height"
                                ]),
                                response: x(n, [
                                    "response",
                                    "Response"
                                ])
                            } : undefined;
                            return {
                                entityId,
                                position,
                                kind,
                                ...rotation ? {
                                    rotation
                                } : {},
                                ...blockState ? {
                                    blockId: blockState.blockId
                                } : {},
                                ...armorStand ? {
                                    armorStand
                                } : {},
                                ...itemFrame ? {
                                    itemFrame
                                } : {},
                                ...painting ? {
                                    painting
                                } : {},
                                ...blockDisplay ? {
                                    blockDisplay
                                } : {},
                                ...itemDisplay ? {
                                    itemDisplay
                                } : {},
                                ...textDisplay ? {
                                    textDisplay
                                } : {},
                                ...fallingBlock ? {
                                    fallingBlock
                                } : {},
                                ...minecart ? {
                                    minecart
                                } : {},
                                ...boat ? {
                                    boat
                                } : {},
                                ...villager ? {
                                    villager
                                } : {},
                                ...cat ? {
                                    cat
                                } : {},
                                ...pig ? {
                                    pig
                                } : {},
                                ...sheep ? {
                                    sheep
                                } : {},
                                ...wolf ? {
                                    wolf
                                } : {},
                                ...horse ? {
                                    horse
                                } : {},
                                ...rabbit ? {
                                    rabbit
                                } : {},
                                ...fox ? {
                                    fox
                                } : {},
                                ...panda ? {
                                    panda
                                } : {},
                                ...axolotl ? {
                                    axolotl
                                } : {},
                                ...llama ? {
                                    llama
                                } : {},
                                ...bee ? {
                                    bee
                                } : {},
                                ...parrot ? {
                                    parrot
                                } : {},
                                ...frog ? {
                                    frog
                                } : {},
                                ...mooshroom ? {
                                    mooshroom
                                } : {},
                                ...shulker ? {
                                    shulker
                                } : {},
                                ...creeper ? {
                                    creeper
                                } : {},
                                ...strider ? {
                                    strider
                                } : {},
                                ...wither ? {
                                    wither
                                } : {},
                                ...pufferfish ? {
                                    pufferfish
                                } : {},
                                ...tropicalFish ? {
                                    tropicalFish
                                } : {},
                                ...tnt ? {
                                    tnt
                                } : {},
                                ...endCrystal ? {
                                    endCrystal
                                } : {},
                                ...leashKnot ? {
                                    leashKnot
                                } : {},
                                ...interaction ? {
                                    interaction
                                } : {},
                                ...typeof j === "string" && j.trim() ? {
                                    customName: j.trim()
                                } : {}
                            };
                        })(n.getCompound(c));
                        if (entity) {
                            e.push({
                                entity,
                                container,
                                listIndex: t === "Entities" ? c : null
                            });
                        }
                    }
                }
            }
        }
    }
    return e;
}
export function EG(t, position) {
    return {
        ...t,
        position,
        rotation: t.rotation ? [
            ...t.rotation
        ] : undefined
    };
}
let p = {
    minecartrideable: "minecart",
    minecartchest: "chest_minecart",
    minecartfurnace: "furnace_minecart",
    minecarttnt: "tnt_minecart",
    minecarthopper: "hopper_minecart",
    minecartspawner: "spawner_minecart",
    minecartcommandblock: "command_block_minecart",
    lavaslime: "magma_cube",
    pigzombie: "zombified_piglin",
    zombiepigman: "zombified_piglin",
    mushroomcow: "mooshroom",
    snowman: "snow_golem",
    ozelot: "ocelot",
    villagergolem: "iron_golem",
    entityhorse: "horse",
    witherboss: "wither",
    xporb: "experience_orb",
    xpbottle: "experience_bottle",
    thrownexpbottle: "experience_bottle",
    primedtnt: "tnt",
    fallingsand: "falling_block",
    fallingblock: "falling_block",
    endercrystal: "end_crystal",
    thrownenderpearl: "ender_pearl",
    eyeofendersignal: "eye_of_ender",
    thrownpotion: "potion",
    thrownegg: "egg",
    fireworksrocketentity: "firework_rocket",
    itemframe: "item_frame",
    armorstand: "armor_stand",
    leashknot: "leash_knot"
};
function b(t) {
    let n = A(t.get("Tile") ?? t.get("tile"));
    if (n) {
        return [
            Math.floor(n[0]),
            Math.floor(n[1]),
            Math.floor(n[2])
        ];
    }
    let r = I(t, [
        "TileX",
        "tile_x",
        "tileX"
    ]);
    let i = I(t, [
        "TileY",
        "tile_y",
        "tileY"
    ]);
    let o = I(t, [
        "TileZ",
        "tile_z",
        "tileZ"
    ]);
    if (r !== undefined && i !== undefined && o !== undefined) {
        return [
            Math.floor(r),
            Math.floor(i),
            Math.floor(o)
        ];
    }
    return null;
}
function _(t, e) {
    for (let n of e){
        let e = ((t)=>{
            if (!t) {
                return;
            }
            if (t.isString()) {
                let e = i.C(t.getAsString());
                if (e === "minecraft:air") {
                    return undefined;
                }
                return {
                    blockId: e,
                    properties: {}
                };
            }
            if (!t.isCompound()) {
                return;
            }
            let n = T(t, [
                "Name",
                "name",
                "id",
                "Id"
            ]);
            if (typeof n !== "string" || !n.trim()) {
                return;
            }
            let r = t.get("Properties") ?? t.get("properties");
            let o = {};
            if (r?.isCompound()) {
                r.forEach((t, e)=>{
                    if (e.isNumber()) {
                        o[t] = String(e.getAsNumber());
                    }
                    if (e.isString()) {
                        o[t] = e.getAsString();
                    }
                });
            }
            return {
                blockId: i.C(n),
                properties: i.G(o)
            };
        })(t.get(n));
        if (e) {
            return e;
        }
    }
}
function y(t) {
    let l = {};
    let a = t.get("transformation") ?? t.get("Transformation");
    let u = N(a);
    if (u && u.length === 16) {
        l.matrix = u;
    } else if (a?.isCompound()) {
        let t = A(a.get("translation") ?? a.get("Translation"));
        let e = A(a.get("scale") ?? a.get("Scale"));
        let u = M(a.get("left_rotation") ?? a.get("LeftRotation"));
        let c = M(a.get("right_rotation") ?? a.get("RightRotation"));
        if (t) {
            l.translation = t;
        }
        if (e) {
            l.scale = e;
        }
        if (u) {
            l.leftRotation = u;
        }
        if (c) {
            l.rightRotation = c;
        }
    }
    let c = S(t, [
        "billboard",
        "Billboard"
    ]);
    let s = ((t)=>{
        let n = t.get("brightness") ?? t.get("Brightness");
        if (!n?.isCompound()) {
            return;
        }
        let sky = I(n, [
            "sky",
            "Sky"
        ]);
        let block = I(n, [
            "block",
            "Block"
        ]);
        if (sky !== undefined || block !== undefined) {
            return {
                sky,
                block
            };
        }
    })(t);
    let f = I(t, [
        "glow_color_override",
        "GlowColorOverride"
    ]);
    if (c) {
        l.billboard = c;
    }
    if (s) {
        l.brightness = s;
    }
    if (f !== undefined) {
        l.glowColorOverride = f;
    }
    if (Object.keys(l).length > 0) {
        return l;
    }
}
function w(t, e) {
    for (let n of e){
        let e = t.get(n);
        if (e?.isListOrArray()) {
            return e.getItems().map((t)=>{
                if (t.isCompound()) {
                    return C(t);
                }
            });
        }
    }
}
function k(t, e) {
    for (let n of e){
        let e = C(t.get(n));
        if (e) {
            return e;
        }
    }
}
function C(t) {
    if (!t) {
        return;
    }
    if (t.isString()) {
        let e = i.C(t.getAsString());
        if (e === "minecraft:air") {
            return undefined;
        }
        return {
            itemId: e
        };
    }
    if (!t.isCompound()) {
        return;
    }
    let count = I(t, [
        "Count",
        "count"
    ]);
    if (count !== undefined && count <= 0) {
        return;
    }
    let n = T(t, [
        "id",
        "Id",
        "item",
        "Item"
    ]);
    if (typeof n !== "string" || !n.trim()) {
        return;
    }
    let r = i.C(n);
    if (r === "minecraft:air") {
        return;
    }
    let skull = r === "minecraft:player_head" ? l.u5(t) : undefined;
    return {
        itemId: r,
        ...count !== undefined ? {
            count
        } : {},
        ...skull ? {
            skull
        } : {}
    };
}
function T(t, e) {
    for (let n of e){
        let e = t.get(n);
        if (e) {
            if (e.isNumber()) {
                return e.getAsNumber();
            }
            if (e.isString()) {
                return e.getAsString();
            }
        }
    }
}
function S(t, e) {
    let n = T(t, e);
    if (typeof n === "string" && n.trim()) {
        return n.trim();
    }
}
function x(t, e) {
    let n = T(t, e);
    if (typeof n === "number") {
        return n !== 0;
    }
    if (typeof n === "string") {
        let t = n.trim().toLowerCase();
        if (t === "true" || t === "1") {
            return true;
        }
        if (t === "false" || t === "0") {
            return false;
        }
    }
}
function I(t, e) {
    let n = T(t, e);
    if (typeof n === "number" && Number.isFinite(n)) {
        return n;
    }
    if (typeof n === "string") {
        let t = Number.parseFloat(n);
        if (Number.isFinite(t)) {
            return t;
        }
    }
}
function L(t, e) {
    let n = T(t, e);
    if (typeof n === "number") {
        return ({
            0: "down",
            1: "up",
            2: "north",
            3: "south",
            4: "west",
            5: "east"
        })[n];
    }
    if (typeof n === "string") {
        let t = n.trim().toLowerCase().replace("minecraft:", "");
        if (t === "north" || t === "south" || t === "east" || t === "west" || t === "up" || t === "down") {
            return t;
        }
    }
}
function A(t) {
    let e = N(t);
    if (!e || e.length < 3) {
        return null;
    }
    return [
        e[0],
        e[1],
        e[2]
    ];
}
function M(t) {
    let e = N(t);
    if (!e || e.length < 4) {
        return null;
    }
    return [
        e[0],
        e[1],
        e[2],
        e[3]
    ];
}
function N(t) {
    if (!t?.isListOrArray()) {
        return null;
    }
    let e = t.getItems().map((t)=>t.getAsNumber()).filter(Number.isFinite);
    if (e.length > 0) {
        return e;
    }
    return null;
}
function O(t) {
    if (typeof t === "number") {
        return String(t);
    }
    if (typeof t !== "string") {
        return;
    }
    let e = t.trim();
    if (e) {
        try {
            let t = JSON.parse(e);
            return Tf(t) || e;
        } catch (t) {
            return e;
        }
    }
}
export function Tf(t) {
    if (typeof t === "string") {
        return t;
    }
    if (typeof t === "number" || typeof t === "boolean") {
        return String(t);
    }
    if (Array.isArray(t)) {
        return t.map(Tf).join("");
    }
    if (!t || typeof t !== "object") {
        return "";
    }
    let e = typeof t.text === "string" ? t.text : typeof t.translate === "string" ? t.translate : "";
    let n = Array.isArray(t.extra) ? t.extra.map(Tf).join("") : "";
    let r = Array.isArray(t.with) ? t.with.map(Tf).join("") : "";
    return `${e}${r ? ` ${r}` : ""}${n}`;
}
function R(t) {
    if (typeof t === "number") {
        return Wk[Math.trunc(t)];
    }
    let e = D(t);
    if (Wk.includes(e)) {
        return e;
    }
}
function B(t) {
    if (typeof t === "number") {
        return c[Math.trunc(t)];
    }
    let e = D(t);
    if (uj.includes(e)) {
        return e;
    }
}
function D(t) {
    return (t == null ? undefined : t.trim().toLowerCase().replace(/^minecraft:/, "")) ?? "";
}
