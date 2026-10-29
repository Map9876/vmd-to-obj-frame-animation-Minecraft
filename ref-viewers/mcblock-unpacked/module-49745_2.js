import { MV } from "./module-55822_2.js";
export let LN = "__mcblock_skull_skin";
export let iy = "__mcblock_skull_default";
let s = new Set([
    "minecraft:player_head",
    "minecraft:player_wall_head"
]);
let i = /^https?:\/\/textures\.minecraft\.net\/texture\/([0-9a-f]+)$/i;
export function CZ(e) {
    return s.has(e.includes(":") ? e : `minecraft:${e}`);
}
export function u5(e) {
    let a = h(e.get("id") ?? e.get("Id"))?.trim().toLowerCase();
    if (a !== "minecraft:player_head" && a !== "player_head") {
        return;
    }
    let l = e.get("components");
    if (l?.isCompound()) {
        let e = l.get("minecraft:profile") ?? l.get("profile");
        if (e) {
            return d(e);
        }
    }
    let s = e.get("tag");
    if (s?.isCompound()) {
        return d(s.get("SkullOwner"));
    }
}
export function jB(e, [r, a, l]) {
    let s = new Map;
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
                        let o = ((e)=>{
                            let n = e.get("Data");
                            let a = n?.isCompound() ? n : e;
                            return d(a.get("profile") ?? a.get("SkullOwner") ?? a.get("Owner"));
                        })(t);
                        if (!o) {
                            continue;
                        }
                        let c = MV(t);
                        if (!c) {
                            continue;
                        }
                        let [u, m, h] = c.map(Math.floor);
                        if (u < 0 || m < 0 || h < 0 || u >= r || m >= a || h >= l) {
                            continue;
                        }
                        let b = (m * l + h) * r + u;
                        if (!s.has(b)) {
                            s.set(b, o);
                        }
                    }
                }
            }
        }
    }
    return s;
}
function d(e) {
    if (!e) {
        return;
    }
    if (e.isString()) {
        let t = m(e.getAsString());
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
    let a = {};
    let l = m(h(e.get("Name") ?? e.get("name")));
    if (l) {
        a.name = l;
    }
    let s = ((e)=>{
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
    if (s) {
        a.uuid = s;
    }
    let o = ((e)=>{
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
                        let r = h(e.get("Value") ?? e.get("value"));
                        if (r !== undefined) {
                            return r;
                        }
                    }
                }
                return;
            }
            if (e.isListOrArray()) {
                for (let t of e.getItems()){
                    if (!t.isCompound() || h(t.get("name") ?? t.get("Name")) !== "textures") {
                        continue;
                    }
                    let e = h(t.get("value") ?? t.get("Value"));
                    if (e !== undefined) {
                        return e;
                    }
                }
            }
        }
    })(e.get("Properties") ?? e.get("properties"));
    if (o !== undefined) {
        let e = ((e)=>{
            let n = ((e)=>{
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
            if (n === undefined) {
                return {
                    textureInvalid: "base64"
                };
            }
            let a = ((e)=>{
                try {
                    return JSON.parse(e);
                } catch (e) {}
                let t = e.replace(/'([^'"\\]*)'/g, '"$1"').replace(/([{,]\s*)([A-Za-z_$][\w$]*)\s*:/g, '$1"$2":');
                try {
                    return JSON.parse(t);
                } catch (e) {
                    return;
                }
            })(n);
            if (!a || typeof a !== "object") {
                return {
                    textureInvalid: "json"
                };
            }
            let l = a.textures?.SKIN;
            if (!l || typeof l.url !== "string") {
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
            })(l.url);
            if (textureHash) {
                if (l.metadata?.model === "slim") {
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
        })(o);
        if (e.textureHash) {
            a.textureHash = e.textureHash;
            if (e.skinModel) {
                a.skinModel = e.skinModel;
            }
        } else if (e.textureInvalid) {
            a.textureInvalid = e.textureInvalid;
        }
    }
    if (Object.keys(a).length > 0) {
        return a;
    }
}
function m(e) {
    if (typeof e === "string" && e.trim() && !(e.length > 64)) {
        return e;
    }
}
function h(e) {
    if (e?.isString()) {
        return e.getAsString();
    }
}
