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
function l(e, r) {
    if (Array.isArray(e)) {
        return l(e[0], r);
    }
    if (!e || typeof e !== "object") {
        return r;
    }
    let t = {
        ...r
    };
    if (typeof e.color === "string") {
        let r = e.color.toLowerCase();
        if (/^#[0-9a-f]{6}$/.test(r) || a[r]) {
            t.color = a[r] ?? r;
        }
    }
    for (let r of [
        "bold",
        "italic",
        "underlined",
        "strikethrough"
    ]){
        if (typeof e[r] === "boolean" || e[r] === 0 || e[r] === 1) {
            t[r] = !!e[r];
        }
    }
    return t;
}
function i(e, r, glowing, a) {
    let lines = Array.from({
        length: 4
    }, (r, t)=>(function e(r, t = {}, o = 0) {
            if (o > 32) {
                return [];
            }
            if (typeof r === "string" || typeof r === "number" || typeof r === "boolean") {
                if (String(r)) {
                    return [
                        {
                            ...t,
                            text: String(r)
                        }
                    ];
                }
                return [];
            }
            if (Array.isArray(r)) {
                let s = e(r[0], t, o + 1);
                let a = l(r[0], t);
                return [
                    ...s,
                    ...r.slice(1).flatMap((r)=>e(r, a, o + 1))
                ];
            }
            if (!r || typeof r !== "object") {
                return [];
            }
            if ("" in r) {
                return e(r[""], t, o + 1);
            }
            let s = l(r, t);
            return [
                ...e(typeof r.text === "string" ? r.text : typeof r.translate === "string" ? r.translate : "", s, o + 1),
                ...Array.isArray(r.with) && r.with.length ? e(` ${r.with.map((r)=>e(r).map((e)=>e.text).join("")).join("")}`, s, o + 1) : [],
                ...Array.isArray(r.extra) ? r.extra.flatMap((r)=>e(r, s, o + 1)) : []
            ];
        })(function e(r, t) {
            if (!r) {
                return "";
            }
            if (r.isCompound() && r.has("")) {
                return e(r.get(""), t);
            }
            if (r.isCompound() || r.isList()) {
                return r.toSimplifiedJson();
            }
            let s = r.getAsString();
            if (t !== undefined && t >= xJ) {
                return s;
            }
            try {
                return JSON.parse(s);
            } catch (e) {
                return s;
            }
        }(e[t], a)));
    if (lines.some((e)=>e.some((e)=>e.text.trim()))) {
        return {
            lines,
            color: Iy[r] ? r : "black",
            glowing
        };
    }
}
export function l5(e, r, t) {
    return Kc(e, r, (e)=>((e, r)=>{
            let t = e.get("Data");
            let o = t?.isCompound() ? t : e;
            let s = (e)=>{
                let t = o.get(e);
                if (!t?.isCompound()) {
                    return;
                }
                let s = t.get("messages");
                if (s?.isListOrArray()) {
                    return i(s.getItems(), t.getString("color"), t.getNumber("has_glowing_text") === 1, r);
                }
            };
            let front = o.has("front_text") ? s("front_text") : i([
                "Text1",
                "Text2",
                "Text3",
                "Text4"
            ].map((e)=>o.get(e)), o.getString("Color"), o.getNumber("GlowingText") === 1, r);
            let back = s("back_text");
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
        })(e, t));
}
