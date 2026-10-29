export let Rf = "__mcblock_banner_base";
export let X1 = "__mcblock_banner_patterns";
let s = [
    "white",
    "orange",
    "magenta",
    "light_blue",
    "yellow",
    "lime",
    "pink",
    "gray",
    "light_gray",
    "cyan",
    "purple",
    "blue",
    "brown",
    "green",
    "red",
    "black"
];
let o = new Set(s);
export let tX = {
    white: [
        0.9764706,
        0.9764706,
        0.9764706
    ],
    orange: [
        0.9019608,
        0.49803922,
        0.1764706
    ],
    magenta: [
        0.7647059,
        0.3137255,
        0.74509805
    ],
    light_blue: [
        0.39215687,
        0.6392157,
        0.8117647
    ],
    yellow: [
        0.8862745,
        0.7647059,
        0.21568628
    ],
    lime: [
        0.49803922,
        0.78431374,
        0.15686275
    ],
    pink: [
        0.9529412,
        0.54509807,
        0.654902
    ],
    gray: [
        0.2784314,
        0.30588236,
        0.32941177
    ],
    light_gray: [
        0.61960787,
        0.627451,
        0.627451
    ],
    cyan: [
        0.16470589,
        0.5254902,
        0.59607846
    ],
    purple: [
        0.5254902,
        0.25882354,
        0.73333335
    ],
    blue: [
        0.21568628,
        0.27450982,
        0.7058824
    ],
    brown: [
        0.49019608,
        0.30588236,
        0.1764706
    ],
    green: [
        0.36862746,
        0.5058824,
        0.14901961
    ],
    red: [
        0.7019608,
        0.17254902,
        0.1764706
    ],
    black: [
        0.11372549,
        0.11372549,
        0.12941177
    ]
};
export let sj = {
    white: "白色",
    orange: "橙色",
    magenta: "品红色",
    light_blue: "淡蓝色",
    yellow: "黄色",
    lime: "黄绿色",
    pink: "粉红色",
    gray: "灰色",
    light_gray: "淡灰色",
    cyan: "青色",
    purple: "紫色",
    blue: "蓝色",
    brown: "棕色",
    green: "绿色",
    red: "红色",
    black: "黑色"
};
export function jD(e) {
    let t = e.replace("minecraft:", "").match(/^([a-z_]+?)_(wall_)?banner$/);
    if (t && o.has(t[1])) {
        return t[1];
    }
}
let c = {
    b: "base",
    bl: "square_bottom_left",
    br: "square_bottom_right",
    tl: "square_top_left",
    tr: "square_top_right",
    bs: "stripe_bottom",
    ts: "stripe_top",
    ls: "stripe_left",
    rs: "stripe_right",
    cs: "stripe_center",
    ms: "stripe_middle",
    drs: "stripe_downright",
    dls: "stripe_downleft",
    ss: "small_stripes",
    cr: "straight_cross",
    sc: "cross",
    bt: "triangle_bottom",
    tt: "triangle_top",
    bts: "triangles_bottom",
    tts: "triangles_top",
    ld: "diagonal_left",
    rd: "diagonal_right",
    lud: "diagonal_up_left",
    rud: "diagonal_up_right",
    vh: "half_vertical",
    vhr: "half_vertical_right",
    hh: "half_horizontal",
    hhb: "half_horizontal_bottom",
    bo: "border",
    cbo: "curly_border",
    bri: "bricks",
    gra: "gradient",
    gru: "gradient_up",
    mc: "circle",
    mr: "rhombus",
    cre: "creeper",
    sku: "skull",
    flo: "flower",
    moj: "mojang",
    glb: "globe",
    pig: "piglin",
    flw: "flow",
    gus: "guster"
};
Object.fromEntries(Object.entries(c).map(([t, r])=>[
        r,
        t
    ]));
let u = new Set([
    "base",
    "border",
    "bricks",
    "circle",
    "creeper",
    "cross",
    "curly_border",
    "diagonal_left",
    "diagonal_right",
    "diagonal_up_left",
    "diagonal_up_right",
    "flow",
    "flower",
    "globe",
    "gradient",
    "gradient_up",
    "guster",
    "half_horizontal",
    "half_horizontal_bottom",
    "half_vertical",
    "half_vertical_right",
    "mojang",
    "piglin",
    "rhombus",
    "skull",
    "small_stripes",
    "square_bottom_left",
    "square_bottom_right",
    "square_top_left",
    "square_top_right",
    "straight_cross",
    "stripe_bottom",
    "stripe_center",
    "stripe_downleft",
    "stripe_downright",
    "stripe_left",
    "stripe_middle",
    "stripe_right",
    "stripe_top",
    "triangle_bottom",
    "triangle_top",
    "triangles_bottom",
    "triangles_top"
]);
export function HP(e) {
    let t = e.replace("minecraft:", "");
    return /(^|_)banner$/.test(t) || /(^|_)wall_banner$/.test(t);
}
export function rm(e) {
    if (typeof e === "number" && Number.isFinite(e)) {
        return s[e] ?? undefined;
    }
    let a = String(e ?? "").trim().toLowerCase();
    if (!a) {
        return;
    }
    let n = Number.parseInt(a, 10);
    if (/^\d+$/.test(a) && Number.isFinite(n)) {
        return s[n] ?? undefined;
    }
    let i = a.replace(/^["']|["']$/g, "").replace(/^minecraft:/, "").replace(/^dye_/, "").replace(/_dye$/, "");
    if (o.has(i)) {
        return i;
    }
}
function h(e) {
    let t = String(e ?? "").trim().toLowerCase();
    if (!t) {
        return;
    }
    let r = t.replace(/^["']|["']$/g, "").replace(/^minecraft:/, "").replace(/^entity\/banner\//, "").replace(/^banner\//, "").replace(/^banner_/, "");
    let a = c[r];
    if (a) {
        if (a === "base") {
            return undefined;
        }
        return a;
    }
    if (u.has(r)) {
        if (r === "base") {
            return undefined;
        }
        return r;
    }
}
export function am(e) {
    if (!e || e.length === 0) {
        return;
    }
    let t = e.map((e)=>{
        let t = h(e.pattern);
        let r = rm(e.color);
        if (t && r) {
            return `${t}:${r}`;
        }
        return null;
    }).filter((e)=>e !== null);
    if (t.length > 0) {
        return t.join("|");
    }
}
export function jL(e) {
    if (!e) {
        return [];
    }
    let t = [];
    for (let r of e.split("|")){
        let [e, a] = r.split(":");
        let n = h(e);
        let s = rm(a);
        if (n && s) {
            t.push({
                pattern: n,
                color: s
            });
        }
    }
    return t;
}
export function Ak(e) {
    let t = e.get("Data");
    let r = t?.isCompound() ? t : e;
    let a = v(e, [
        "id",
        "Id"
    ]);
    let n = typeof a === "string" ? a.toLowerCase() : "";
    let s = r.has("Base") || r.has("base") || r.has("base_color") || r.has("Patterns") || r.has("patterns");
    if (n && !n.includes("banner") && !s || !n && !s) {
        return;
    }
    let baseColor = rm(v(r, [
        "Base",
        "base",
        "base_color",
        "BaseColor",
        "baseColor"
    ]));
    let patterns = ((e)=>{
        let t = ((e, t)=>{
            for (let r of t){
                if (e.has(r)) {
                    try {
                        let t = e.getList(r);
                        if (t.getType() === 10) {
                            return t;
                        }
                    } catch (e) {}
                }
            }
            return null;
        })(e, [
            "Patterns",
            "patterns"
        ]);
        if (!t) {
            return [];
        }
        let r = [];
        for(let e = 0; e < t.length; e++){
            let a = t.get(e);
            if (!a?.isCompound()) {
                continue;
            }
            let n = h(v(a, [
                "Pattern",
                "pattern",
                "pattern_id",
                "PatternId"
            ]));
            let s = rm(v(a, [
                "Color",
                "color",
                "dye_color",
                "DyeColor"
            ]));
            if (n && s) {
                r.push({
                    pattern: n,
                    color: s
                });
            }
        }
        return r;
    })(r);
    if (baseColor || patterns.length !== 0) {
        return {
            ...baseColor ? {
                baseColor
            } : {},
            ...patterns.length > 0 ? {
                patterns
            } : {}
        };
    }
}
export function MV(e) {
    let r = ((e)=>{
        if (!e?.isListOrArray()) {
            return null;
        }
        let t = e.getItems().map((e)=>e.getAsNumber());
        if (t.length < 3) {
            return null;
        }
        return [
            t[0],
            t[1],
            t[2]
        ];
    })(e.get("Pos") ?? e.get("pos"));
    if (r) {
        return r;
    }
    let a = y(e, [
        "x",
        "X"
    ]);
    let n = y(e, [
        "y",
        "Y"
    ]);
    let s = y(e, [
        "z",
        "Z"
    ]);
    if (a !== undefined && n !== undefined && s !== undefined) {
        return [
            a,
            n,
            s
        ];
    }
    return null;
}
function v(e, t) {
    for (let r of t){
        let t = e.get(r);
        if (t) {
            if (t.isNumber()) {
                return t.getAsNumber();
            }
            if (t.isString()) {
                return t.getAsString();
            }
        }
    }
}
function y(e, t) {
    let r = v(e, t);
    if (typeof r === "number" && Number.isFinite(r)) {
        return r;
    }
    if (typeof r === "string") {
        let e = Number.parseInt(r, 10);
        if (Number.isFinite(e)) {
            return e;
        }
    }
}
