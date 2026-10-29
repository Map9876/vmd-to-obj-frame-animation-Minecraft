let r = /^["'](.*)["']$/;
let i = {
    "minecraft:trapdoor": "minecraft:oak_trapdoor"
};
export function C(t) {
    let n = (t ?? "").trim().toLowerCase();
    if (!n) {
        return "minecraft:air";
    }
    let r = n.includes(":") ? n : `minecraft:${n}`;
    return i[r] ?? r;
}
export function G(t) {
    if (!t) {
        return {};
    }
    let e = {};
    for (let [n, i] of Object.entries(t)){
        let t = n.trim().toLowerCase();
        if (!t) {
            continue;
        }
        let o = String(i ?? "").trim().toLowerCase();
        let l = o.match(r);
        if (l) {
            o = l[1].trim().toLowerCase();
        }
        e[t] = o;
    }
    return e;
}
