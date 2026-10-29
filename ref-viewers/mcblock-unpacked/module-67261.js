export let p7 = "官方原创";
function l(e) {
    if (!e) {
        return [];
    }
    if (Array.isArray(e)) {
        return e.map((e)=>String(e ?? "").trim()).filter(Boolean);
    }
    let t = String(e).trim();
    if (!t) {
        return [];
    }
    if (t.startsWith("[")) {
        try {
            let e = JSON.parse(t);
            if (Array.isArray(e)) {
                return e.map((e)=>String(e ?? "").trim()).filter(Boolean);
            }
        } catch (e) {
            return [];
        }
    }
    return t.split(",").map((e)=>e.trim()).filter(Boolean);
}
export function Wx(e) {
    return l(e).includes(p7);
}
export function Mh(e) {
    return l(e).filter((e)=>e !== p7);
}
