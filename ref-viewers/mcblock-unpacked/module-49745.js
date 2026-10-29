const r = require(55822);
export let LN = "__mcblock_skull_skin";
export let iy = "__mcblock_skull_default";
let u = new Set([
    "minecraft:player_head",
    "minecraft:player_wall_head"
]);
let o = /^https?:\/\/textures\.minecraft\.net\/texture\/([0-9a-f]+)$/i;
export function CZ(e) {
    return u.has(e.includes(":") ? e : `minecraft:${e}`);
}
export function u5(e) {
    let l = g(e.get("id") ?? e.get("Id"))?.trim().toLowerCase();
    if (l !== "minecraft:player_head" && l !== "player_head") {
        return;
    }
    let i = e.get("components");
    if (i?.isCompound()) {
        let e = i.get("minecraft:profile") ?? i.get("profile");
        if (e) {
            return d(e);
        }
    }
    let u = e.get("tag");
    if (u?.isCompound()) {
        return d(u.get("SkullOwner"));
    }
}
export function jB(e, [n, l, i]) {
    let u = new Map;
    let o = new Set;
    for (let t of e){
        if (!o.has(t)) {
            for (let e of (o.add(t), [
                "TileEntities",
                "BlockEntities",
                "tile_entities",
                "block_entities"
            ])){
                let o;
                if (t.has(e)) {
                    try {
                        o = t.getList(e, 10);
                    } catch (e) {
                        continue;
                    }
                    for(let e = 0; e < o.length; e++){
                        let t = o.getCompound(e);
                        let a = ((e)=>{
                            let r = e.get("Data");
                            let l = r?.isCompound() ? r : e;
                            return d(l.get("profile") ?? l.get("SkullOwner") ?? l.get("Owner"));
                        })(t);
                        if (!a) {
                            continue;
                        }
                        let c = r.MV(t);
                        if (!c) {
                            continue;
                        }
                        let [s, f, g] = c.map(Math.floor);
                        if (s < 0 || f < 0 || g < 0 || s >= n || f >= l || g >= i) {
                            continue;
                        }
                        let m = (f * i + g) * n + s;
                        if (!u.has(m)) {
                            u.set(m, a);
                        }
                    }
                }
            }
        }
    }
    return u;
}
function d(e) {
    if (!e) {
        return;
    }
    if (e.isString()) {
        let t = f(e.getAsString());
        if (t) {
            return {
                name: t
            };
        }
        return undefined;
    }
    if (!e.isCompound()) {
        return;
    }
    let l = {};
    let i = f(g(e.get("Name") ?? e.get("name")));
    if (i) {
        l.name = i;
    }
    let u = ((e)=>{
        let t;
        if (e) {
            if (e.isListOrArray()) {
                let n = e.getItems();
                if (n.length !== 4 || !n.every((e)=>e.isNumber())) {
                    return;
                }
                t = n.map((e)=>(e.getAsNumber() >>> 0).toString(16).padStart(8, "0")).join("");
            } else if (e.isString()) {
                let n = e.getAsString().trim().replace(/-/g, "").toLowerCase();
                if (/^[0-9a-f]{32}$/.test(n)) {
                    t = n;
                }
            }
            if (t) {
                return `${t.slice(0, 8)}-${t.slice(8, 12)}-${t.slice(12, 16)}-${t.slice(16, 20)}-${t.slice(20)}`;
            }
        }
    })(e.get("Id") ?? e.get("id"));
    if (u) {
        l.uuid = u;
    }
    let a = ((e)=>{
        if (e) {
            if (e.isCompound()) {
                let n = e.get("textures");
                if (!n?.isListOrArray()) {
                    return;
                }
                for (let e of n.getItems()){
                    if (e.isString()) {
                        return e.getAsString();
                    }
                    if (e.isCompound()) {
                        let n = g(e.get("Value") ?? e.get("value"));
                        if (n !== undefined) {
                            return n;
                        }
                    }
                }
                return;
            }
            if (e.isListOrArray()) {
                for (let t of e.getItems()){
                    if (!t.isCompound() || g(t.get("name") ?? t.get("Name")) !== "textures") {
                        continue;
                    }
                    let e = g(t.get("value") ?? t.get("Value"));
                    if (e !== undefined) {
                        return e;
                    }
                }
            }
        }
    })(e.get("Properties") ?? e.get("properties"));
    if (a !== undefined) {
        let e = ((e)=>{
            let r = ((e)=>{
                let t = e.replace(/\s+/g, "");
                if (!t || !/^[A-Za-z0-9+/]*={0,2}$/.test(t)) {
                    return;
                }
                let n = t.length % 4 == 0 ? t : t + "=".repeat((4 - t.length % 4) % 4);
                if (n.length % 4 == 0) {
                    try {
                        let e = atob(n);
                        let t = new Uint8Array(e.length);
                        for(let n = 0; n < e.length; n++){
                            t[n] = e.charCodeAt(n);
                        }
                        return new TextDecoder("utf-8", {
                            fatal: true
                        }).decode(t);
                    } catch (e) {
                        return;
                    }
                }
            })(e);
            if (r === undefined) {
                return {
                    textureInvalid: "base64"
                };
            }
            let l = ((e)=>{
                try {
                    return JSON.parse(e);
                } catch (e) {}
                let t = e.replace(/'([^'"\\]*)'/g, '"$1"').replace(/([{,]\s*)([A-Za-z_$][\w$]*)\s*:/g, '$1"$2":');
                try {
                    return JSON.parse(t);
                } catch (e) {
                    return;
                }
            })(r);
            if (!l || typeof l !== "object") {
                return {
                    textureInvalid: "json"
                };
            }
            let i = l.textures?.SKIN;
            if (!i || typeof i.url !== "string") {
                return {
                    textureInvalid: "no-skin"
                };
            }
            let textureHash = ((e)=>{
                let t = o.exec(e.trim());
                if (!t) {
                    return;
                }
                let n = t[1].toLowerCase();
                if (n.length <= 64) {
                    return n;
                }
            })(i.url);
            if (textureHash) {
                if (i.metadata?.model === "slim") {
                    return {
                        textureHash,
                        skinModel: "slim"
                    };
                }
                return {
                    textureHash
                };
            }
            return {
                textureInvalid: "url"
            };
        })(a);
        if (e.textureHash) {
            l.textureHash = e.textureHash;
            if (e.skinModel) {
                l.skinModel = e.skinModel;
            }
        } else if (e.textureInvalid) {
            l.textureInvalid = e.textureInvalid;
        }
    }
    if (Object.keys(l).length > 0) {
        return l;
    }
}
function f(e) {
    if (typeof e === "string" && e.trim() && !(e.length > 64)) {
        return e;
    }
}
function g(e) {
    if (e?.isString()) {
        return e.getAsString();
    }
}
