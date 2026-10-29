import { Jn } from "./chunk_qn.js";
const Wn = [
    `blockStates`,
    `blockModels`,
    `textures`,
    `textureMetas`
];
function Gn(e) {
    if (Array.isArray(e)) {
        return e[0];
    }
    return e;
}
function Kn(e, t = {}) {
    let n = {};
    for (let [r, i] of Object.entries(e.options)){
        let e = {};
        for (let [n, a] of Object.entries(i)){
            let i = t[r]?.[n];
            e[n] = i !== undefined && (Array.isArray(a) ? typeof i == `string` && a.includes(i) : typeof i == `boolean`) ? i : Gn(a);
        }
        n[r] = e;
    }
    return n;
}
export function Yn(e, t, n = {}) {
    let t_pack = t.pack;
    if (!t_pack) {
        return;
    }
    let i = Kn(t_pack, n);
    for (let n of Wn){
        let a = t[n];
        let o = t_pack.resolve[n];
        let s = {
            ...a
        };
        for (let [t, r] of Object.entries(o ?? {})){
            let o = Jn(r, i);
            if (!o) {
                delete s[t];
                continue;
            }
            if (o.from === t) {
                continue;
            }
            let c = a[o.from] ?? e[n][o.from];
            if (c === undefined) {
                delete s[t];
            } else {
                s[t] = c;
            }
        }
        Object.assign(e[n], s);
    }
    if (t.objModels) {
        e.objModels = Object.assign(e.objModels ?? {}, t.objModels);
    }
}
