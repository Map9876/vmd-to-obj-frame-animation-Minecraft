import { Tf } from "./module-17975.js";
const r = require(55822);
let o = [
    "Text1",
    "Text2",
    "Text3",
    "Text4"
];
export let xJ = 4325;
function a(t, e) {
    if (!t) {
        return null;
    }
    if (t.isCompound() && t.has("")) {
        return a(t.get(""), e);
    }
    if (t.isCompound() || t.isList()) {
        let e = Tf(t.toSimplifiedJson());
        if (e.trim()) {
            return e;
        }
        return null;
    }
    let n = t.getAsString();
    if (e !== undefined && e >= xJ) {
        if (n.trim()) {
            return n;
        }
        return null;
    }
    let r = n.trim();
    if (!r) {
        return null;
    }
    try {
        let t = Tf(JSON.parse(r));
        if (t.trim()) {
            return t;
        }
        return null;
    } catch (t) {
        return r;
    }
}
function u(t, e, n) {
    let r = [];
    let i = t.get(e);
    if (!i?.isCompound()) {
        return r;
    }
    let o = i.get("messages");
    if (!o?.isListOrArray()) {
        return r;
    }
    for (let t of o.getItems()){
        let e = a(t, n);
        if (e) {
            r.push(e);
        }
    }
    return r;
}
export function oT(t, e, n) {
    return Kc(t, e, (t)=>((t, e)=>{
            let r = t.get("Data");
            let i = r?.isCompound() ? r : t;
            let signFront = u(i, "front_text", e);
            let signBack = u(i, "back_text", e);
            for (let t of o){
                let n = a(i.get(t), e);
                if (n) {
                    signFront.push(n);
                }
            }
            let customName = a(i.get("CustomName") ?? i.get("custom_name"), e);
            if (signFront.length !== 0 || signBack.length !== 0 || customName) {
                return {
                    ...signFront.length > 0 ? {
                        signFront
                    } : {},
                    ...signBack.length > 0 ? {
                        signBack
                    } : {},
                    ...customName ? {
                        customName
                    } : {}
                };
            }
        })(t, n));
}
export function Kc(t, [i, o, l], n) {
    let a = new Map;
    let u = new Set;
    for (let e of t){
        if (!u.has(e)) {
            for (let t of (u.add(e), [
                "TileEntities",
                "BlockEntities",
                "tile_entities",
                "block_entities"
            ])){
                let u;
                if (e.has(t)) {
                    try {
                        u = e.getList(t, 10);
                    } catch (t) {
                        continue;
                    }
                    for(let t = 0; t < u.length; t++){
                        let e = u.getCompound(t);
                        let c = r.MV(e);
                        if (!c) {
                            continue;
                        }
                        let [s, f, d] = c.map(Math.floor);
                        if (s < 0 || f < 0 || d < 0 || s >= i || f >= o || d >= l) {
                            continue;
                        }
                        let m = n(e);
                        if (!m) {
                            continue;
                        }
                        let g = (f * l + d) * i + s;
                        if (!a.has(g)) {
                            a.set(g, m);
                        }
                    }
                }
            }
        }
    }
    return a;
}
