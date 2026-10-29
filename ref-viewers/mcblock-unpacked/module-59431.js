let n = new Set([
    "marker",
    "interaction"
]);
function a(e) {
    return String(Math.round(1000 * e) / 1000 + 0);
}
export function KO(e) {
    return !(e.kind === "generic" || n.has(e.kind));
}
export function K2(e) {
    let t = new Map;
    let r = [];
    for (let l of e){
        let [e, i, o] = l.position;
        let c = `e:${l.kind}@${a(e)},${a(i)},${a(o)}`;
        let s = t.get(c) ?? 0;
        t.set(c, s + 1);
        r.push(`${c}#${s}`);
    }
    return r;
}
