import { GJ, Gz, Jp, QT, t$ } from "./module-23273.js";
import { LM, Q1, r as r_1 } from "./module-13402.js";
import { s as s_1 } from "./module-87118.js";
export let OP;
export let IX;
let i;
let a;
export let C2;
export let Rd;
export let pL;
((e)=>{
    e.UP = "up";
    e.DOWN = "down";
    e.NORTH = "north";
    e.EAST = "east";
    e.SOUTH = "south";
    e.WEST = "west";
})(OP = OP || (OP = {}));
let d = {
    [OP.UP]: [
        0,
        1,
        0
    ],
    [OP.DOWN]: [
        0,
        -1,
        0
    ],
    [OP.NORTH]: [
        0,
        0,
        -1
    ],
    [OP.EAST]: [
        1,
        0,
        0
    ],
    [OP.SOUTH]: [
        0,
        0,
        1
    ],
    [OP.WEST]: [
        -1,
        0,
        0
    ]
};
((e)=>{
    e.ALL = [
        e.UP,
        e.DOWN,
        e.NORTH,
        e.EAST,
        e.SOUTH,
        e.WEST
    ];
    e.normal = function(e) {
        return d[e];
    };
})(OP = OP || (OP = {}));
((e)=>{
    e.create = function(e, t, r) {
        return [
            e,
            t,
            r
        ];
    };
    e.ZERO = e.create(0, 0, 0);
    e.offset = function(e, t, r, s) {
        return [
            e[0] + t,
            e[1] + r,
            e[2] + s
        ];
    };
    e.subtract = function(e, t) {
        return [
            e[0] - t[0],
            e[1] - t[1],
            e[2] - t[2]
        ];
    };
    e.add = function(e, t) {
        return [
            e[0] + t[0],
            e[1] + t[1],
            e[2] + t[2]
        ];
    };
    e.towards = function(t, r) {
        return e.offset(t, ...OP.normal(r));
    };
    e.equals = function(e, t) {
        return e === t || e[0] === t[0] && e[1] === t[1] && e[2] === t[2];
    };
    e.magnitude = function(e) {
        return e[0] * e[0] + e[1] * e[1] + e[2] * e[2];
    };
    e.toNbt = function(e) {
        return new Jp(e.map((e)=>new QT(e)));
    };
    e.fromNbt = function(e) {
        return e.getAsTuple(3, (e)=>{
            if (e?.isInt()) {
                return e.getAsNumber();
            }
            return 0;
        });
    };
    e.fromJson = function(e) {
        let t;
        let r = LM.readArray(e, (e)=>LM.readInt(e) ?? 0) ?? [
            0,
            0,
            0
        ];
        t = r[0];
        return [
            t,
            r[1],
            r[2]
        ];
    };
})(IX = IX || (IX = {}));
export class gw {
    namespace;
    path;
    static DEFAULT_NAMESPACE = "minecraft";
    static SEPARATOR = ":";
    constructor(e, t){
        this.namespace = e;
        this.path = t;
    }
    is(e) {
        return this.equals(gw.parse(e));
    }
    equals(e) {
        return this === e || e instanceof gw && this.namespace === e.namespace && this.path === e.path;
    }
    toString() {
        return this.namespace + gw.SEPARATOR + this.path;
    }
    withPrefix(e) {
        return new gw(this.namespace, e + this.path);
    }
    static create(e) {
        return new gw(this.DEFAULT_NAMESPACE, e);
    }
    static parse(e) {
        let t = e.indexOf(this.SEPARATOR);
        if (t >= 0) {
            return new gw(t >= 1 ? e.substring(0, t) : this.DEFAULT_NAMESPACE, e.substring(t + 1));
        }
        return new gw(this.DEFAULT_NAMESPACE, e);
    }
}
export class Tm {
    properties;
    static AIR = new Tm(gw.create("air"));
    static STONE = new Tm(gw.create("stone"));
    static WATER = new Tm(gw.create("water"), {
        level: "0"
    });
    static LAVA = new Tm(gw.create("lava"), {
        level: "0"
    });
    name;
    constructor(e, t = {}){
        this.properties = t;
        this.name = typeof e === "string" ? gw.parse(e) : e;
    }
    getName() {
        return this.name;
    }
    getProperties() {
        return this.properties;
    }
    getProperty(e) {
        return this.properties[e];
    }
    isFluid() {
        return this.is(Tm.WATER) || this.is(Tm.LAVA);
    }
    isWaterlogged() {
        return this.is(Tm.WATER) || this.is(Tm.LAVA) || this.is("bubble_column") || this.is("kelp") || this.is("kelp_plant") || this.is("seagrass") || this.is("tall_seagrass") || this.properties.waterlogged === "true";
    }
    equals(e) {
        return !!this.name.equals(e.name) && Object.keys(this.properties).length === Object.keys(e.properties).length && Object.keys(this.properties).every((t)=>e.properties[t] === this.properties[t]);
    }
    is(e) {
        if (typeof e === "string") {
            return this.name.equals(gw.parse(e));
        }
        if (e instanceof gw) {
            return this.name.equals(e);
        }
        return this.name.equals(e.name);
    }
    toString() {
        if (Object.keys(this.properties).length === 0) {
            return this.name.toString();
        }
        return `${this.name.toString()}[${Object.entries(this.properties).map(([e, t])=>`${e}=${t}`).join(",")}]`;
    }
    static parse(e) {
        let t = e.indexOf("[");
        if (t === -1) {
            return new Tm(e);
        }
        return new Tm(e.substring(0, t), Object.fromEntries(e.substring(t + 1, e.length - 1).split(",").map((e)=>e.split("="))));
    }
    static fromNbt(e) {
        if (e.isString()) {
            return new Tm(e.getAsString());
        }
        let t = e.isCompound() ? e : new GJ;
        return new Tm(gw.parse(t.hasString("id") ? t.getString("id") : t.getString("Name")), (t.hasCompound("properties") ? t.getCompound("properties") : t.getCompound("Properties")).map((e, t)=>[
                e,
                t.getAsString()
            ]));
    }
    static fromJson(e) {
        if (typeof e === "string") {
            return new Tm(e);
        }
        let t = LM.readObject(e) ?? {};
        return new Tm(gw.parse(LM.readString(t.id ?? t.Name) ?? ""), LM.readMap(t.properties ?? t.Properties, (e)=>LM.readString(e) ?? ""));
    }
}
class p {
    size;
    defaultValue;
    storage;
    palette;
    constructor(e, t){
        this.size = e;
        this.defaultValue = t;
        this.storage = Array(e).fill(0);
        this.palette = [
            t
        ];
    }
    index(e, t, r) {
        return (e << 8) + (t << 4) + r;
    }
    get(e, t, r) {
        let s = this.storage[this.index(e, t, r)];
        return this.palette[s];
    }
    set(e, t, r, s) {
        let n = this.palette.findIndex((e)=>e.equals(s));
        if (n === -1) {
            n = this.palette.length;
            this.palette.push(s);
        }
        this.storage[this.index(e, t, r)] = n;
    }
}
class g {
    minY;
    static WIDTH = 16;
    static SIZE = g.WIDTH * g.WIDTH * g.WIDTH;
    states;
    constructor(e){
        this.minY = e;
        this.states = new p(g.SIZE, Tm.AIR);
    }
    get minBlockY() {
        return this.minY << 4;
    }
    getBlockState(e, t, r) {
        return this.states.get(e, t, r);
    }
    setBlockState(e, t, r, s) {
        this.states.set(e, t, r, s);
    }
}
((e)=>{
    function t(e, t) {
        return BigInt(0 | e) | BigInt(0 | t) << BigInt(32);
    }
    e.create = function(e, t) {
        return [
            e,
            t
        ];
    };
    e.fromBlockPos = function(e) {
        return [
            e[0] >> 4,
            e[2] >> 4
        ];
    };
    e.fromLong = function(e) {
        return [
            0 | Number(e),
            Number(e >> BigInt(32))
        ];
    };
    e.toLong = function(e) {
        return t(e[0], e[1]);
    };
    e.asLong = t;
    e.minBlockX = function(e) {
        return e[0] << 4;
    };
    e.minBlockZ = function(e) {
        return e[1] << 4;
    };
    e.maxBlockX = function(e) {
        return (e[0] << 4) + 15;
    };
    e.maxBlockZ = function(e) {
        return (e[1] << 4) + 15;
    };
})(i = i || (i = {}));
let x = new Map([
    [
        "minecraft:speed",
        3402751
    ],
    [
        "minecraft:slowness",
        9154528
    ],
    [
        "minecraft:haste",
        14270531
    ],
    [
        "minecraft:mining_fatigue",
        4866583
    ],
    [
        "minecraft:strength",
        16762624
    ],
    [
        "minecraft:instant_health",
        16262179
    ],
    [
        "minecraft:instant_damage",
        11101546
    ],
    [
        "minecraft:jump_boost",
        16646020
    ],
    [
        "minecraft:nausea",
        5578058
    ],
    [
        "minecraft:regeneration",
        13458603
    ],
    [
        "minecraft:resistance",
        9520880
    ],
    [
        "minecraft:fire_resistance",
        16750848
    ],
    [
        "minecraft:water_breathing",
        10017472
    ],
    [
        "minecraft:invisibility",
        16185078
    ],
    [
        "minecraft:blindness",
        2039587
    ],
    [
        "minecraft:night_vision",
        12779366
    ],
    [
        "minecraft:hunger",
        5797459
    ],
    [
        "minecraft:weakness",
        4738376
    ],
    [
        "minecraft:poison",
        8889187
    ],
    [
        "minecraft:wither",
        7561558
    ],
    [
        "minecraft:health_boost",
        16284963
    ],
    [
        "minecraft:absorption",
        2445989
    ],
    [
        "minecraft:saturation",
        16262179
    ],
    [
        "minecraft:glowing",
        9740385
    ],
    [
        "minecraft:levitation",
        13565951
    ],
    [
        "minecraft:luck",
        5882118
    ],
    [
        "minecraft:unluck",
        12624973
    ],
    [
        "minecraft:slow_falling",
        15978425
    ],
    [
        "minecraft:conduit_power",
        1950417
    ],
    [
        "minecraft:dolphins_grace",
        8954814
    ],
    [
        "minecraft:bad_omen",
        745784
    ],
    [
        "minecraft:hero_of_the_village",
        4521796
    ],
    [
        "minecraft:darkness",
        2696993
    ],
    [
        "minecraft:trial_omen",
        1484454
    ],
    [
        "minecraft:raid_omen",
        14565464
    ],
    [
        "minecraft:wind_charged",
        12438015
    ],
    [
        "minecraft:weaving",
        7891290
    ],
    [
        "minecraft:oozing",
        10092451
    ],
    [
        "minecraft:infested",
        9214860
    ]
]);
a = a || (a = {});
a.fromNbt = function(e) {
    return {
        effect: gw.parse(e.getString("id")),
        duration: e.getNumber("duration"),
        amplifier: e.getNumber("amplifier")
    };
};
let w = new Map([
    [
        "minecraft:empty",
        []
    ],
    [
        "minecraft:water",
        []
    ],
    [
        "minecraft:mundane",
        []
    ],
    [
        "minecraft:thick",
        []
    ],
    [
        "minecraft:awkward",
        []
    ],
    [
        "minecraft:night_vision",
        [
            {
                effect: gw.create("night_vision"),
                duration: 3600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:long_night_vision",
        [
            {
                effect: gw.create("night_vision"),
                duration: 9600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:invisibility",
        [
            {
                effect: gw.create("invisibility"),
                duration: 3600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:long_invisibility",
        [
            {
                effect: gw.create("invisibility"),
                duration: 9600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:leaping",
        [
            {
                effect: gw.create("jump_boost"),
                duration: 3600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:long_leaping",
        [
            {
                effect: gw.create("jump_boost"),
                duration: 9600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:strong_leaping",
        [
            {
                effect: gw.create("jump_boost"),
                duration: 1800,
                amplifier: 1
            }
        ]
    ],
    [
        "minecraft:fire_resistance",
        [
            {
                effect: gw.create("fire_resistance"),
                duration: 3600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:long_fire_resistance",
        [
            {
                effect: gw.create("fire_resistance"),
                duration: 9600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:swiftness",
        [
            {
                effect: gw.create("speed"),
                duration: 3600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:long_swiftness",
        [
            {
                effect: gw.create("speed"),
                duration: 9600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:strong_swiftness",
        [
            {
                effect: gw.create("speed"),
                duration: 1800,
                amplifier: 1
            }
        ]
    ],
    [
        "minecraft:slowness",
        [
            {
                effect: gw.create("slowness"),
                duration: 1800,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:long_slowness",
        [
            {
                effect: gw.create("slowness"),
                duration: 4800,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:strong_slowness",
        [
            {
                effect: gw.create("slowness"),
                duration: 400,
                amplifier: 3
            }
        ]
    ],
    [
        "minecraft:turtle_master",
        [
            {
                effect: gw.create("slowness"),
                duration: 400,
                amplifier: 3
            },
            {
                effect: gw.create("resistance"),
                duration: 400,
                amplifier: 2
            }
        ]
    ],
    [
        "minecraft:long_turtle_master",
        [
            {
                effect: gw.create("slowness"),
                duration: 800,
                amplifier: 3
            },
            {
                effect: gw.create("resistance"),
                duration: 800,
                amplifier: 2
            }
        ]
    ],
    [
        "minecraft:strong_turtle_master",
        [
            {
                effect: gw.create("slowness"),
                duration: 400,
                amplifier: 5
            },
            {
                effect: gw.create("resistance"),
                duration: 400,
                amplifier: 3
            }
        ]
    ],
    [
        "minecraft:water_breathing",
        [
            {
                effect: gw.create("water_breathing"),
                duration: 3600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:long_water_breathing",
        [
            {
                effect: gw.create("water_breathing"),
                duration: 9600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:healing",
        [
            {
                effect: gw.create("instant_health"),
                duration: 1,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:strong_healing",
        [
            {
                effect: gw.create("instant_health"),
                duration: 1,
                amplifier: 1
            }
        ]
    ],
    [
        "minecraft:harming",
        [
            {
                effect: gw.create("instant_damage"),
                duration: 1,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:strong_harming",
        [
            {
                effect: gw.create("instant_damage"),
                duration: 1,
                amplifier: 1
            }
        ]
    ],
    [
        "minecraft:poison",
        [
            {
                effect: gw.create("poison"),
                duration: 900,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:long_poison",
        [
            {
                effect: gw.create("poison"),
                duration: 1800,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:strong_poison",
        [
            {
                effect: gw.create("poison"),
                duration: 432,
                amplifier: 1
            }
        ]
    ],
    [
        "minecraft:regeneration",
        [
            {
                effect: gw.create("regeneration"),
                duration: 900,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:long_regeneration",
        [
            {
                effect: gw.create("regeneration"),
                duration: 1800,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:strong_regeneration",
        [
            {
                effect: gw.create("regeneration"),
                duration: 450,
                amplifier: 1
            }
        ]
    ],
    [
        "minecraft:strength",
        [
            {
                effect: gw.create("strength"),
                duration: 3600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:long_strength",
        [
            {
                effect: gw.create("strength"),
                duration: 9600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:strong_strength",
        [
            {
                effect: gw.create("strength"),
                duration: 1800,
                amplifier: 1
            }
        ]
    ],
    [
        "minecraft:weakness",
        [
            {
                effect: gw.create("weakness"),
                duration: 1800,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:long_weakness",
        [
            {
                effect: gw.create("weakness"),
                duration: 4800,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:luck",
        [
            {
                effect: gw.create("luck"),
                duration: 6000,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:slow_falling",
        [
            {
                effect: gw.create("slow_falling"),
                duration: 1800,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:long_slow_falling",
        [
            {
                effect: gw.create("slow_falling"),
                duration: 4800,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:wind_charged",
        [
            {
                effect: gw.create("wind_charged"),
                duration: 3600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:weaving",
        [
            {
                effect: gw.create("weaving"),
                duration: 3600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:oozing",
        [
            {
                effect: gw.create("oozing"),
                duration: 3600,
                amplifier: 0
            }
        ]
    ],
    [
        "minecraft:infested",
        [
            {
                effect: gw.create("infested"),
                duration: 3600,
                amplifier: 0
            }
        ]
    ]
]);
((e)=>{
    function t(e) {
        let t = [];
        if (e.potion) {
            t.push(...w.get(e.potion.toString()) ?? []);
        }
        if (e.customEffects) {
            t.push(...e.customEffects);
        }
        return t;
    }
    e.fromNbt = function(e) {
        let t = {};
        if (e.isString()) {
            t.potion = gw.parse(e.getAsString());
        } else {
            if (e.isCompound()) {
                if (e.hasString("potion")) {
                    t.potion = gw.parse(e.getString("potion"));
                }
                if (e.hasNumber("custom_color")) {
                    t.customColor = e.getNumber("custom_color");
                }
                if (e.hasList("custom_effects")) {
                    t.customEffects = e.getList("custom_effects", t$.Compound).map(a.fromNbt);
                }
            }
        }
        return t;
    };
    e.getColor = function(e) {
        if (e.customColor) {
            return Q1.intToRgb(e.customColor);
        }
        return ((e)=>{
            let [t, r, s] = [
                0,
                0,
                0
            ];
            let n = 0;
            for (let i of e){
                let e = x.get(i.effect.toString());
                if (e === undefined) {
                    continue;
                }
                let a = Q1.intToRgb(e);
                let o = i.amplifier + 1;
                t += o * a[0];
                r += o * a[1];
                s += o * a[2];
                n += o;
            }
            if (n === 0) {
                return Q1.intToRgb(-13083194);
            }
            return [
                t /= n,
                r /= n,
                s /= n
            ];
        })(t(e));
    };
    e.getAllEffects = t;
})(C2 = C2 || (C2 = {}));
((e)=>{
    function t(e, t) {
        return {
            value: ()=>e,
            key: ()=>t
        };
    }
    function r(e, t, s = true) {
        if (s) {
            return {
                value: ()=>e.getOrThrow(t),
                key: ()=>t
            };
        }
        return {
            value: ()=>e.get(t),
            key: ()=>t
        };
    }
    e.parser = function(e, s) {
        return (n)=>{
            if (typeof n === "string") {
                return r(e, gw.parse(n));
            }
            return t(s(n));
        };
    };
    e.direct = t;
    e.reference = r;
})(Rd = Rd || (Rd = {}));
export class Lx {
    entries;
    constructor(e){
        this.entries = e;
    }
    static parser(e, t) {
        let r = t ?? ((t)=>Rd.reference(e, gw.parse(LM.readString(t) ?? "")));
        return (t)=>{
            if (typeof t !== "string") {
                return Rd.direct(new Lx(LM.readArray(t, r) ?? []) ?? []);
            }
            if (t.startsWith("#")) {
                return Rd.reference(e.getTagRegistry(), gw.parse(t.substring(1)));
            }
            return Rd.direct(new Lx([
                Rd.reference(e, gw.parse(t))
            ]));
        };
    }
    static fromJson(e, t, r) {
        let s = LM.readObject(t) ?? {};
        let n = LM.readBoolean(s.replace) ?? false;
        let i = LM.readArray(s.values, (t)=>{
            var r = true;
            var s = "";
            if (typeof t === "string") {
                s = t;
            } else {
                let e = LM.readObject(t) ?? {};
                r = LM.readBoolean(e.required) ?? false;
                s = LM.readString(e.id) ?? "";
            }
            if (s.startsWith("#")) {
                return Rd.reference(e.getTagRegistry(), gw.parse(s.substring(1)), r);
            }
            return Rd.reference(e, gw.parse(s), r);
        }) ?? [];
        if (r && !n && e.getTagRegistry().has(r)) {
            i?.push(Rd.direct(e.getTagRegistry().get(r)));
        }
        return new Lx(i);
    }
    *getEntries() {
        for (let e of this.entries){
            let t = e.value();
            if (t !== undefined) {
                if (t instanceof Lx) {
                    yield* t.getEntries();
                } else {
                    yield e;
                }
            }
        }
    }
}
export class CX {
    id;
    count;
    components;
    constructor(e, t, r = new Map){
        this.id = e;
        this.count = t;
        this.components = r;
    }
    getComponent(e, t) {
        if (typeof e === "string") {
            e = gw.parse(e);
        }
        if (this.components.has(`!${e.toString()}`)) {
            return;
        }
        let r = this.components.get(e.toString());
        return r || (t ? t.getItemComponents(this.id)?.get(e.toString()) : undefined);
    }
    hasComponent(e, t) {
        if (typeof e === "string") {
            e = gw.parse(e);
        }
        return !this.components.has(`!${e.toString()}`) && (!!this.components.has(e.toString()) || !!t && t.getItemComponents(this.id)?.has(e.toString()));
    }
    clone() {
        let e = new Map(this.components);
        return new CX(this.id, this.count, e);
    }
    is(e) {
        if (typeof e === "string") {
            return this.id.equals(gw.parse(e));
        }
        if (e instanceof gw) {
            return this.id.equals(e);
        }
        return this.id.equals(e.id);
    }
    equals(e) {
        return this === e || e instanceof CX && this.count === e.count && this.isSameItemSameComponents(e);
    }
    isSameItemSameComponents(e) {
        if (!this.id.equals(e.id) || this.components.size !== e.components.size) {
            return false;
        }
        for (let [t, r] of this.components){
            let s = e.components.get(t);
            if (r.toString() !== s?.toString()) {
                return false;
            }
        }
        return true;
    }
    toString() {
        let e = this.id.toString();
        if (this.components.size > 0) {
            e += `[${[
                ...this.components.entries()
            ].map(([e, t])=>{
                if (e.startsWith("!")) {
                    return e;
                }
                return `${e}=${t.toString()}`;
            }).join(",")}]`;
        }
        if (this.count > 1) {
            e += ` ${this.count}`;
        }
        return e;
    }
    static fromString(e) {
        let t = new r_1(e);
        while(t.canRead() && t.peek() !== "["){
            t.skip();
        }
        let r = gw.parse(t.getRead());
        if (!t.canRead()) {
            return new CX(r, 1);
        }
        let s = new Map;
        t.skip();
        if (t.peek() === "]") {
            return new CX(r, 1, s);
        }
        do {
            if (t.peek() === "!") {
                t.skip();
                t.skipWhitespace();
                let e = t.cursor;
                while(t.canRead() && t.peek() !== "]" && t.peek() !== ","){
                    t.skip();
                }
                s.set(`!${gw.parse(t.getRead(e).trim()).toString()}`, new GJ);
            } else {
                t.skipWhitespace();
                let e = t.cursor;
                while(t.canRead() && t.peek() !== "="){
                    t.skip();
                }
                let r = gw.parse(t.getRead(e).trim()).toString();
                if (!t.canRead()) {
                    break;
                }
                t.skip();
                t.skipWhitespace();
                let n = s_1.readTag(t);
                s.set(r, n);
            }
            t.skipWhitespace();
            if (!t.canRead()) {
                break;
            }
            if (t.peek() === "]") {
                return new CX(r, 1, s);
            }
            if (t.peek() !== ",") {
                throw Error("Expected , or ]");
            }
            t.skip();
        }while (t.canRead())
        throw Error("Missing closing ]");
    }
    toNbt() {
        let e = new GJ().set("id", new Gz(this.id.toString()));
        if (this.count > 1) {
            e.set("count", new QT(this.count));
        }
        if (this.components.size > 0) {
            e.set("components", new GJ(this.components));
        }
        return e;
    }
    static fromNbt(e) {
        let t = gw.parse(e.getString("id"));
        return new CX(t, e.hasNumber("count") ? e.getNumber("count") : 1, new Map(Object.entries(e.getCompound("components").map((e, t)=>{
            if (e.startsWith("!")) {
                return [
                    `!${gw.parse(e).toString()}`,
                    new GJ
                ];
            }
            return [
                gw.parse(e).toString(),
                t
            ];
        }))));
    }
}
export class OR {
    key;
    parser;
    static REGISTRY = new OR(gw.create("root"));
    storage = new Map;
    builtin = new Map;
    tags = undefined;
    constructor(e, t){
        this.key = e;
        this.parser = t;
    }
    static createAndRegister(e, t) {
        let r = new OR(gw.create(e), t);
        OR.REGISTRY.register(r.key, r);
        return r;
    }
    register(e, t, r) {
        this.storage.set(e.toString(), t);
        if (r) {
            this.builtin.set(e.toString(), t);
        }
        return Rd.reference(this, e);
    }
    delete(e) {
        let t = this.storage.delete(e.toString());
        this.builtin.delete(e.toString());
        return t;
    }
    keys() {
        return [
            ...this.storage.keys()
        ].map((e)=>gw.parse(e));
    }
    has(e) {
        return this.storage.has(e.toString());
    }
    get(e) {
        let t = this.storage.get(e.toString());
        if (t instanceof Function) {
            t = t();
            this.storage.set(e.toString(), t);
        }
        return t;
    }
    getOrThrow(e) {
        let t = this.get(e);
        if (t === undefined) {
            throw Error(`Missing key in ${this.key.toString()}: ${e.toString()}`);
        }
        return t;
    }
    parse(e) {
        if (!this.parser) {
            throw Error(`No parser exists for ${this.key.toString()}`);
        }
        return this.parser(e);
    }
    clear() {
        for (let [e, t] of (this.storage.clear(), this.builtin.entries())){
            this.storage.set(e, t);
        }
        if (this.tags) {
            this.tags.clear();
        }
        return this;
    }
    assign(e) {
        if (!this.key.equals(e.key)) {
            throw Error(`Cannot assign registry of type ${e.key.toString()} to registry of type ${this.key.toString()}`);
        }
        for (let t of e.keys()){
            this.storage.set(t.toString(), e.getOrThrow(t));
        }
        return this;
    }
    cloneEmpty() {
        return new OR(this.key, this.parser);
    }
    forEach(e) {
        for (let [t, r] of this.storage.entries()){
            e(gw.parse(t), r instanceof Function ? r() : r, this);
        }
    }
    map(e) {
        return [
            ...this.storage.entries()
        ].map(([t, r])=>e(gw.parse(t), r instanceof Function ? r() : r, this));
    }
    getTagRegistry() {
        if (this.tags === undefined) {
            this.tags = new OR(new gw(this.key.namespace, `tags/${this.key.path}`));
        }
        return this.tags;
    }
}
((e)=>{
    e.NONE = "none";
    e.CLOCKWISE_90 = "clockwise_90";
    e.CLOCKWISE_180 = "180";
    e.COUNTERCLOCKWISE_90 = "counterclockwise_90";
})(pL = pL || (pL = {}));
((e)=>{
    e.getRandom = function(t) {
        return [
            e.NONE,
            e.CLOCKWISE_90,
            e.CLOCKWISE_180,
            e.COUNTERCLOCKWISE_90
        ][t.nextInt(4)];
    };
})(pL = pL || (pL = {}));
export class oE {
    size;
    palette;
    blocks;
    static REGISTRY = OR.createAndRegister("structures");
    static EMPTY = new oE(IX.ZERO);
    blocksMap = [];
    constructor(e, t = [], r = []){
        this.size = e;
        this.palette = t;
        this.blocks = r;
        r.forEach((t)=>{
            if (!this.isInside(t.pos)) {
                throw Error(`Found block at ${t.pos} which is outside the structure bounds ${this.size}`);
            }
            this.blocksMap[t.pos[0] * e[1] * e[2] + t.pos[1] * e[2] + t.pos[2]] = t;
        });
    }
    getSize() {
        return this.size;
    }
    addBlock(pos, t, r, nbt) {
        if (!this.isInside(pos)) {
            throw Error(`Cannot add block at ${pos} outside the structure bounds ${this.size}`);
        }
        let n = new Tm(t, r);
        let i = this.palette.findIndex((e)=>e.equals(n));
        if (i === -1) {
            i = this.palette.length;
            this.palette.push(n);
        }
        this.blocks.push({
            pos,
            state: i,
            nbt
        });
        this.blocksMap[pos[0] * this.size[1] * this.size[2] + pos[1] * this.size[2] + pos[2]] = {
            pos,
            state: i,
            nbt
        };
        return this;
    }
    getBlocks() {
        return this.blocks.map((e)=>this.toPlacedBlock(e));
    }
    getBlock(e) {
        if (!this.isInside(e)) {
            return null;
        }
        let t = this.blocksMap[e[0] * this.size[1] * this.size[2] + e[1] * this.size[2] + e[2]];
        if (t) {
            return this.toPlacedBlock(t);
        }
        return null;
    }
    toPlacedBlock(e) {
        let t = this.palette[e.state];
        if (!t) {
            throw Error(`Block at ${e.pos.join(" ")} in structure references invalid palette index ${e.state}`);
        }
        return {
            pos: e.pos,
            state: t,
            nbt: e.nbt
        };
    }
    isInside(e) {
        return e[0] >= 0 && e[0] < this.size[0] && e[1] >= 0 && e[1] < this.size[1] && e[2] >= 0 && e[2] < this.size[2];
    }
    static fromNbt(e) {
        let t = IX.fromNbt(e.getList("size"));
        return new oE(t, e.getList("palette", t$.Compound).map((e)=>Tm.fromNbt(e)), e.getList("blocks", t$.Compound).map((e)=>{
            let pos = IX.fromNbt(e.getList("pos"));
            let state = e.getNumber("state");
            let s = e.getCompound("nbt");
            return {
                pos,
                state,
                nbt: s.size > 0 ? s : undefined
            };
        }));
    }
    static transform(e, t, r) {
        switch(t){
            case pL.COUNTERCLOCKWISE_90:
                return IX.create(r[0] - r[2] + e[2], e[1], r[0] + r[2] - e[0]);
            case pL.CLOCKWISE_90:
                return IX.create(r[0] + r[2] - e[2], e[1], r[2] - r[0] + e[0]);
            case pL.CLOCKWISE_180:
                return IX.create(r[0] + r[0] - e[0], e[1], r[2] + r[2] - e[2]);
            default:
                return e;
        }
    }
}
