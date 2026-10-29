import { Kc, xJ } from "./module-74002.js";
export let Iy = {
    white: "#ffffff",
    orange: "#ff681f",
    magenta: "#ff00ff",
    light_blue: "#9ac0cd",
    yellow: "#ffff00",
    lime: "#bfff00",
    pink: "#ff69b4",
    gray: "#808080",
    light_gray: "#d3d3d3",
    cyan: "#00ffff",
    purple: "#a020f0",
    blue: "#0000ff",
    brown: "#8b4513",
    green: "#00ff00",
    red: "#ff0000",
    black: "#000000"
};
let a = {
    black: "#000000",
    dark_blue: "#0000aa",
    dark_green: "#00aa00",
    dark_aqua: "#00aaaa",
    dark_red: "#aa0000",
    dark_purple: "#aa00aa",
    gold: "#ffaa00",
    gray: "#aaaaaa",
    dark_gray: "#555555",
    blue: "#5555ff",
    green: "#55ff55",
    aqua: "#55ffff",
    red: "#ff5555",
    light_purple: "#ff55ff",
    yellow: "#ffff55",
    white: "#ffffff"
};
export function Qv(e) {
    return /^minecraft:[a-z_]+_(?:wall_)?(?:hanging_)?sign$/.test(e);
}
function l(e, t) {
    if (Array.isArray(e)) {
        return l(e[0], t);
    }
    if (!e || typeof e !== "object") {
        return t;
    }
    let n = {
        ...t
    };
    if (typeof e.color === "string") {
        let t = e.color.toLowerCase();
        if (/^#[0-9a-f]{6}$/.test(t) || a[t]) {
            n.color = a[t] ?? t;
        }
    }
    for (let t of [
        "bold",
        "italic",
        "underlined",
        "strikethrough"
    ]){
        if (typeof e[t] === "boolean" || e[t] === 0 || e[t] === 1) {
            n[t] = !!e[t];
        }
    }
    return n;
}
function s(e, t, glowing, a) {
    let lines = Array.from({
        length: 4
    }, (t, n)=>(function e(t, n = {}, r = 0) {
            if (r > 32) {
                return [];
            }
            if (typeof t === "string" || typeof t === "number" || typeof t === "boolean") {
                if (String(t)) {
                    return [
                        {
                            ...n,
                            text: String(t)
                        }
                    ];
                }
                return [];
            }
            if (Array.isArray(t)) {
                let i = e(t[0], n, r + 1);
                let a = l(t[0], n);
                return [
                    ...i,
                    ...t.slice(1).flatMap((t)=>e(t, a, r + 1))
                ];
            }
            if (!t || typeof t !== "object") {
                return [];
            }
            if ("" in t) {
                return e(t[""], n, r + 1);
            }
            let i = l(t, n);
            return [
                ...e(typeof t.text === "string" ? t.text : typeof t.translate === "string" ? t.translate : "", i, r + 1),
                ...Array.isArray(t.with) && t.with.length ? e(` ${t.with.map((t)=>e(t).map((e)=>e.text).join("")).join("")}`, i, r + 1) : [],
                ...Array.isArray(t.extra) ? t.extra.flatMap((t)=>e(t, i, r + 1)) : []
            ];
        })(function e(t, n) {
            if (!t) {
                return "";
            }
            if (t.isCompound() && t.has("")) {
                return e(t.get(""), n);
            }
            if (t.isCompound() || t.isList()) {
                return t.toSimplifiedJson();
            }
            let i = t.getAsString();
            if (n !== undefined && n >= xJ) {
                return i;
            }
            try {
                return JSON.parse(i);
            } catch (e) {
                return i;
            }
        }(e[n], a)));
    if (lines.some((e)=>e.some((e)=>e.text.trim()))) {
        return {
            lines,
            color: Iy[t] ? t : "black",
            glowing
        };
    }
}
export function l5(e, t, n) {
    return Kc(e, t, (e)=>((e, t)=>{
            let n = e.get("Data");
            let r = n?.isCompound() ? n : e;
            let i = (e)=>{
                let n = r.get(e);
                if (!n?.isCompound()) {
                    return;
                }
                let i = n.get("messages");
                if (i?.isListOrArray()) {
                    return s(i.getItems(), n.getString("color"), n.getNumber("has_glowing_text") === 1, t);
                }
            };
            let front = r.has("front_text") ? i("front_text") : s([
                "Text1",
                "Text2",
                "Text3",
                "Text4"
            ].map((e)=>r.get(e)), r.getString("Color"), r.getNumber("GlowingText") === 1, t);
            let back = i("back_text");
            if (front || back) {
                return {
                    ...front ? {
                        front
                    } : {},
                    ...back ? {
                        back
                    } : {}
                };
            }
        })(e, n));
}
