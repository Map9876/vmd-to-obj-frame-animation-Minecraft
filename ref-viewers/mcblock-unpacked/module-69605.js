let r = "未命名作品";
let i = "mcblock-export";
let a = new Set([
    "",
    "null",
    "undefined",
    "nan",
    "unnamed"
]);
export function A1(e) {
    if (typeof e !== "string") {
        return null;
    }
    let n = (e.split(/[?#]/, 1)[0].split(/[\\/]/).pop() ?? e).replace(/\.(litematic|schem)$/i, "").trim();
    if (a.has(n.toLowerCase())) {
        return null;
    }
    return n;
}
export function ew(e, i = r) {
    return A1(e) ?? A1(i) ?? r;
}
function s(e) {
    return e.replace(/[<>:"/\\|?*\x00-\x1F]+/g, "_").replace(/\s+/g, "_").replace(/[.]+$/g, "").slice(0, 60);
}
export function OZ(e, n = i) {
    let r = s(A1(n) ?? i);
    return s(ew(e, r)) || r || i;
}
