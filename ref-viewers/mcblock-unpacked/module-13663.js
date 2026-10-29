import _n from "./module-7496.js";
let l = JSON.parse('{"qc":13145043,"Wv":"97ead233c4f772b4541cc4e0e02bc1e1e47ca4da90539f563995637b6b54c119","WW":"java-26.3-mcblock-v1.3","dL":"6f351435ab974f554db2c61dbd30c37df1ef5938a29426fae2703311d4e337b5"}');
async function i(e, method = "GET", headers) {
    let n = new AbortController;
    let a = setTimeout(()=>n.abort(), 25000);
    try {
        let response = await fetch(e, {
            method,
            headers,
            signal: n.signal,
            credentials: "same-origin",
            cache: "no-cache"
        });
        if (!response.ok) {
            throw Error(`HTTP ${response.status}`);
        }
        return {
            response,
            bytes: new Uint8Array(await response.arrayBuffer())
        };
    } finally{
        clearTimeout(a);
    }
}
async function o(e) {
    let { response } = await i(e, "HEAD");
    let r = Number(response.headers.get("content-length"));
    if (!Number.isSafeInteger(r) || r <= 0 || r > 134217728) {
        throw Error("资源包长度无效");
    }
    let n = new Uint8Array(r);
    for(let t = 0; t < r;){
        let a;
        let l = Math.min(t + 262144 - 1, r - 1);
        for(let r = 0; r < 3; r++){
            try {
                a = await i(e, "GET", {
                    Range: `bytes=${t}-${l}`
                });
                break;
            } catch (error) {
                if (r === 2) {
                    throw error;
                }
            }
        }
        if (!a) {
            throw Error("资源分段下载失败");
        }
        if (a.response.status === 200 && t === 0 && a.bytes.length === r) {
            return a.bytes;
        }
        if (a.response.status !== 206 || a.response.headers.get("content-range") !== `bytes ${t}-${l}/${r}` || a.bytes.length !== l - t + 1) {
            throw Error("资源 Range 边界校验失败");
        }
        n.set(a.bytes, t);
        t = l + 1;
    }
    return n;
}
async function c(e) {
    let t;
    for(let r = 0; r < 3; r++){
        try {
            return (await i(e)).bytes;
        } catch (error) {
            t = error;
        }
    }
    try {
        return await o(e);
    } catch (error) {
        throw Error(`MC 方块资源加载失败：资源包下载失败（${error instanceof Error ? error.message : String(t)}）`);
    }
}
export let o6 = l.WW;
let f = `/uploads/buildings/blockID/releases/${o6}`;
let u = `${f}/bundle.zip`;
let m = `mcblock-resource-bundle-${o6}`;
let g = null;
let d = null;
let b = new Map;
async function p(e) {
    if (globalThis.crypto?.subtle) {
        return Array.from(new Uint8Array(await globalThis.crypto.subtle.digest("SHA-256", e.slice().buffer)), (e)=>e.toString(16).padStart(2, "0")).join("");
    }
    let r = [
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
    ];
    let n = [
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
    ];
    let a = new Uint8Array(64 * Math.ceil((e.length + 9) / 64));
    a.set(e);
    a[e.length] = 128;
    let l = new DataView(a.buffer);
    l.setUint32(a.length - 8, Math.floor(e.length / 536870912));
    l.setUint32(a.length - 4, 8 * e.length);
    let i = (e, t)=>e >>> t | e << 32 - t;
    let o = new Int32Array(64);
    for(let e = 0; e < a.length; e += 64){
        for(let t = 0; t < 16; t++){
            o[t] = l.getInt32(e + 4 * t);
        }
        for(let e = 16; e < 64; e++){
            let t = o[e - 15];
            let r = o[e - 2];
            o[e] = o[e - 16] + (i(t, 7) ^ i(t, 18) ^ t >>> 3) + o[e - 7] + (i(r, 17) ^ i(r, 19) ^ r >>> 10);
        }
        let [t, a, c, s, f, u, m, g] = n;
        for(let e = 0; e < 64; e++){
            let n = g + (i(f, 6) ^ i(f, 11) ^ i(f, 25)) + (f & u ^ ~f & m) + r[e] + o[e] | 0;
            let l = (i(t, 2) ^ i(t, 13) ^ i(t, 22)) + (t & a ^ t & c ^ a & c) | 0;
            g = m;
            m = u;
            u = f;
            f = s + n | 0;
            s = c;
            c = a;
            a = t;
            t = n + l | 0;
        }
        for (let [e, r] of [
            t,
            a,
            c,
            s,
            f,
            u,
            m,
            g
        ].entries()){
            n[e] = n[e] + r | 0;
        }
    }
    return n.map((e)=>(e >>> 0).toString(16).padStart(8, "0")).join("");
}
async function _(e) {
    if (e.length !== l.qc || await p(e) !== l.Wv) {
        throw Error("MC 方块资源加载失败：整包哈希校验失败");
    }
    let r = await _n.loadAsync(e);
    let n = await r.file("manifest.json")?.async("uint8array");
    if (!n || await p(n) !== l.dL) {
        throw Error("MC 方块资源加载失败：manifest 哈希校验失败");
    }
    let manifest = JSON.parse(new TextDecoder().decode(n));
    if (manifest.schema !== 1 || manifest.bundleId !== o6 || manifest.gameVersion !== "26.3" || manifest.dataVersion !== 5023) {
        throw Error("MC 方块资源加载失败：版本校验失败");
    }
    let files = new Map;
    let c = Object.keys(manifest.files);
    for(let e = 0; e < c.length; e += 16){
        await Promise.all(c.slice(e, e + 16).map(async (e)=>{
            if (e.startsWith("/") || e.split("/").includes("..")) {
                throw Error("资源路径校验失败");
            }
            let n = manifest.files[e];
            let a = await r.file(e)?.async("uint8array");
            if (!a || a.length !== n.bytes || await p(a) !== n.sha256) {
                throw Error(`MC 方块资源加载失败：文件哈希校验失败 ${e}`);
            }
            files.set(e, a);
        }));
    }
    return {
        manifest,
        files
    };
}
async function h() {
    try {
        if (typeof caches === "undefined") {
            return null;
        }
        return await caches.open(m);
    } catch (e) {
        return null;
    }
}
export function hL() {
    return g || (g = (async ()=>{
        let e;
        let t = await h();
        let href = new URL(u, window.location.origin).href;
        if (t) {
            try {
                let n = await t.match(href);
                if (n) {
                    e = new Uint8Array(await n.arrayBuffer());
                    let t = await _(e);
                    d = t;
                    return t;
                }
            } catch (e) {
                await t.delete(href).catch(()=>{});
            }
        }
        e = await c(u);
        let n = await _(e);
        if (t) {
            await t.put(href, new Response(e.slice().buffer, {
                headers: {
                    "Content-Type": "application/zip"
                }
            })).catch(()=>{});
        }
        d = n;
        return n;
    })().catch((e)=>{
        g = null;
        throw e;
    }));
}
export async function PW(e) {
    let t = (await hL()).files.get(e);
    if (!t) {
        throw Error(`资源包缺失：${e}`);
    }
    return JSON.parse(new TextDecoder().decode(t));
}
export async function O5(e) {
    let t = (await hL()).files.get(e);
    if (!t) {
        throw Error(`资源包缺失：${e}`);
    }
    return new Blob([
        t.slice().buffer
    ], {
        type: e.endsWith(".png") ? "image/png" : "application/octet-stream"
    });
}
export function w2(e) {
    if (e.startsWith("/") || e.split("/").includes("..")) {
        throw Error("资源路径无效");
    }
    let t = d == null ? undefined : d.files.get(e);
    if (!t) {
        return `${f}/${e}`;
    }
    let r = b.get(e);
    if (!r) {
        r = URL.createObjectURL(new Blob([
            t.slice().buffer
        ], {
            type: e.endsWith(".png") ? "image/png" : "application/octet-stream"
        }));
        b.set(e, r);
    }
    return r;
}
