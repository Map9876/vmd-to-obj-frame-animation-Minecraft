import { MV } from "./module-55822_3.js";
export let LN = "__mcblock_skull_skin";
export let iy = "__mcblock_skull_default";
let o = new Set([
    "minecraft:player_head",
    "minecraft:player_wall_head"
]);
let i = /^https?:\/\/textures\.minecraft\.net\/texture\/([0-9a-f]+)$/i;
export function CZ(e) {
    return o.has(e.includes(":") ? e : `minecraft:${e}`);
}
export function u5(e) {
    let n = p(e.get("id") ?? e.get("Id"))?.trim().toLowerCase();
    if (n !== "minecraft:player_head" && n !== "player_head") {
        return;
    }
    let s = e.get("components");
    if (s?.isCompound()) {
        let e = s.get("minecraft:profile") ?? s.get("profile");
        if (e) {
            return u(e);
        }
    }
    let o = e.get("tag");
    if (o?.isCompound()) {
        return u(o.get("SkullOwner"));
    }
}
export function jB(e, [r, n, s]) {
    let o = new Map;
    let i = new Set;
    for (let t of e){
        if (!i.has(t)) {
            for (let e of (i.add(t), [
                "TileEntities",
                "BlockEntities",
                "tile_entities",
                "block_entities"
            ])){
                let i;
                if (t.has(e)) {
                    try {
                        i = t.getList(e, 10);
                    } catch (e) {
                        continue;
                    }
                    for(let e = 0; e < i.length; e++){
                        let t = i.getCompound(e);
                        let l = ((e)=>{
                            let a = e.get("Data");
                            let n = a?.isCompound() ? a : e;
                            return u(n.get("profile") ?? n.get("SkullOwner") ?? n.get("Owner"));
                        })(t);
                        if (!l) {
                            continue;
                        }
                        let d = MV(t);
                        if (!d) {
                            continue;
                        }
                        let [c, b, p] = d.map(Math.floor);
                        if (c < 0 || b < 0 || p < 0 || c >= r || b >= n || p >= s) {
                            continue;
                        }
                        let h = (b * s + p) * r + c;
                        if (!o.has(h)) {
                            o.set(h, l);
                        }
                    }
                }
            }
        }
    }
    return o;
}
function u(e) {
    if (!e) {
        return;
    }
    if (e.isString()) {
        let t = b(e.getAsString());
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
    let n = {};
    let s = b(p(e.get("Name") ?? e.get("name")));
    if (s) {
        n.name = s;
    }
    let o = ((e)=>{
        let t;
        if (e) {
            if (e.isListOrArray()) {
                let r = e.getItems();
                if (r.length !== 4 || !r.every((e)=>e.isNumber())) {
                    return;
                }
                t = r.map((e)=>(e.getAsNumber() >>> 0).toString(16).padStart(8, "0")).join("");
            } else if (e.isString()) {
                let r = e.getAsString().trim().replace(/-/g, "").toLowerCase();
                if (/^[0-9a-f]{32}$/.test(r)) {
                    t = r;
                }
            }
            if (t) {
                return `${t.slice(0, 8)}-${t.slice(8, 12)}-${t.slice(12, 16)}-${t.slice(16, 20)}-${t.slice(20)}`;
            }
        }
    })(e.get("Id") ?? e.get("id"));
    if (o) {
        n.uuid = o;
    }
    let l = ((e)=>{
        if (e) {
            if (e.isCompound()) {
                let r = e.get("textures");
                if (!r?.isListOrArray()) {
                    return;
                }
                for (let e of r.getItems()){
                    if (e.isString()) {
                        return e.getAsString();
                    }
                    if (e.isCompound()) {
                        let r = p(e.get("Value") ?? e.get("value"));
                        if (r !== undefined) {
                            return r;
                        }
                    }
                }
                return;
            }
            if (e.isListOrArray()) {
                for (let t of e.getItems()){
                    if (!t.isCompound() || p(t.get("name") ?? t.get("Name")) !== "textures") {
                        continue;
                    }
                    let e = p(t.get("value") ?? t.get("Value"));
                    if (e !== undefined) {
                        return e;
                    }
                }
            }
        }
    })(e.get("Properties") ?? e.get("properties"));
    if (l !== undefined) {
        let e = ((e)=>{
            let a = ((e)=>{
                let t = e.replace(/\s+/g, "");
                if (!t || !/^[A-Za-z0-9+/]*={0,2}$/.test(t)) {
                    return;
                }
                let r = t.length % 4 == 0 ? t : t + "=".repeat((4 - t.length % 4) % 4);
                if (r.length % 4 == 0) {
                    try {
                        let e = atob(r);
                        let t = new Uint8Array(e.length);
                        for(let r = 0; r < e.length; r++){
                            t[r] = e.charCodeAt(r);
                        }
                        return new TextDecoder("utf-8", {
                            fatal: true
                        }).decode(t);
                    } catch (e) {
                        return;
                    }
                }
            })(e);
            if (a === undefined) {
                return {
                    textureInvalid: "base64"
                };
            }
            let n = ((e)=>{
                try {
                    return JSON.parse(e);
                } catch (e) {}
                let t = e.replace(/'([^'"\\]*)'/g, '"$1"').replace(/([{,]\s*)([A-Za-z_$][\w$]*)\s*:/g, '$1"$2":');
                try {
                    return JSON.parse(t);
                } catch (e) {
                    return;
                }
            })(a);
            if (!n || typeof n !== "object") {
                return {
                    textureInvalid: "json"
                };
            }
            let s = n.textures?.SKIN;
            if (!s || typeof s.url !== "string") {
                return {
                    textureInvalid: "no-skin"
                };
            }
            let textureHash = ((e)=>{
                let t = i.exec(e.trim());
                if (!t) {
                    return;
                }
                let r = t[1].toLowerCase();
                if (r.length <= 64) {
                    return r;
                }
            })(s.url);
            if (textureHash) {
                if (s.metadata?.model === "slim") {
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
        })(l);
        if (e.textureHash) {
            n.textureHash = e.textureHash;
            if (e.skinModel) {
                n.skinModel = e.skinModel;
            }
        } else if (e.textureInvalid) {
            n.textureInvalid = e.textureInvalid;
        }
    }
    if (Object.keys(n).length > 0) {
        return n;
    }
}
function b(e) {
    if (typeof e === "string" && e.trim() && !(e.length > 64)) {
        return e;
    }
}
function p(e) {
    if (e?.isString()) {
        return e.getAsString();
    }
}
