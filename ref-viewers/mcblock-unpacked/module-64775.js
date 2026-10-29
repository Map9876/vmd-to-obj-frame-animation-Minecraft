import { Cfg, GWd, GYF, OUM, er$, hxR } from "./module-85339.js";
import { gw } from "./module-82084.js";
import { Oe, b3 } from "./module-37578.js";
import { y as y_1 } from "./module-55552.js";
import { xl } from "./module-67454.js";
import { $w, C2, Zb, sn } from "./module-12734.js";
let u = {
    fetch: (e, t)=>fetch(e, t),
    now: ()=>Date.now(),
    setTimeout: (e, t)=>setTimeout(e, t),
    clearTimeout: (e)=>clearTimeout(e)
};
let c = new Map;
let d = [];
let f = 0;
let h = 0;
let p = 0;
let g = false;
let m = new Set;
export function f3(e) {
    m.add(e);
    return ()=>{
        m.delete(e);
    };
}
export let dL = ()=>p;
function y() {
    p += 1;
    if (!g) {
        g = true;
        queueMicrotask(()=>{
            for (let e of (g = false, m)){
                e();
            }
        });
    }
}
export function Yo(e) {
    let failedHashes = [];
    let n = Infinity;
    let retrying = 0;
    for (let s of new Set(e)){
        let e = c.get(s);
        if (e && e.refs !== 0) {
            if (e.state === "failed") {
                failedHashes.push(s);
                n = Math.min(n, e.retryAt);
            } else if (e.manualRetry && (e.state === "queued" || e.state === "loading")) {
                retrying += 1;
            }
        }
    }
    return {
        failedHashes,
        retryAt: Number.isFinite(n) ? n : 0,
        retrying
    };
}
export function fJ(e) {
    let t = 0;
    for (let n of new Set(e)){
        let e = c.get(n);
        if (!(!e || e.refs === 0 || e.state !== "failed" || u.now() < e.retryAt)) {
            for (let [t, n] of (e.state = "queued", e.failure = null, e.manualRetry = true, d.push(e), [
                ...e.listeners
            ])){
                t(n);
            }
            t += 1;
        }
    }
    if (t) {
        y();
        C();
    }
    return t;
}
export function nt(hash, t) {
    if (!C2.test(hash)) {
        return {
            hash,
            state: "failed",
            texture: null,
            failure: "bad-hash",
            release () {}
        };
    }
    let n = c.get(hash);
    if (n?.state === "failed" && u.now() - n.failedAt >= 60000) {
        n.state = "queued";
        n.failure = null;
        d.push(n);
    }
    if (!n) {
        n = {
            hash,
            state: "queued",
            texture: null,
            failure: null,
            failedAt: 0,
            refs: 0,
            lastUsed: 0,
            retryAt: 0,
            manualRetry: false,
            listeners: new Map
        };
        c.set(hash, n);
        d.push(n);
        z();
    }
    n.refs += 1;
    n.lastUsed = u.now();
    let r = n;
    let s = false;
    let i = {
        hash,
        get state () {
            if (r.state === "queued") {
                return "loading";
            }
            return r.state;
        },
        get texture () {
            if (r.state === "ready") {
                return r.texture;
            }
            return null;
        },
        get failure () {
            if (r.state === "failed") {
                return r.failure;
            }
            return null;
        },
        release () {
            if (!s && (s = true, t && r.listeners.delete(t), r.refs = Math.max(0, r.refs - 1), y(), !(r.refs > 0))) {
                if (r.state === "queued") {
                    let e = d.indexOf(r);
                    if (e >= 0) {
                        d.splice(e, 1);
                    }
                    if (c.get(r.hash) === r) {
                        c.delete(r.hash);
                    }
                    return;
                }
                if (r.state === "ready") {
                    T();
                } else if (r.state === "failed") {
                    z();
                }
            }
        }
    };
    if (t) {
        n.listeners.set(t, i);
    }
    y();
    C();
    return i;
}
export function Mz(e) {
    let t = xl(e) ? e : "wide/steve";
    let n = k.get(t);
    if (!n) {
        let texture = ((e)=>{
            let t = Oe();
            let n = b3();
            let a = n?.image;
            if (!t || !a?.data || !a.width || !a.height) {
                return null;
            }
            let l = t.atlas.getTextureUV(gw.parse(`minecraft:entity/player/${e}`));
            let u = Math.round(l[0] * a.width);
            let c = Math.round(l[1] * a.height);
            if (u + sn > a.width || c + sn > a.height) {
                return null;
            }
            let d = new Uint8Array($w);
            for(let e = 0; e < sn; e++){
                let t = ((c + e) * a.width + u) * 4;
                d.set(a.data.subarray(t, t + 4 * sn), e * sn * 4);
            }
            return j(new GYF(d, sn, sn, GWd, OUM));
        })(t);
        if (!texture) {
            return {
                texture: null,
                release () {}
            };
        }
        n = {
            texture,
            refs: 0,
            disposeTimer: null
        };
        k.set(t, n);
    }
    if (n.disposeTimer !== null) {
        u.clearTimeout(n.disposeTimer);
        n.disposeTimer = null;
    }
    n.refs += 1;
    let a = n;
    let c = false;
    return {
        texture: a.texture,
        release () {
            if (!c) {
                c = true;
                a.refs = Math.max(0, a.refs - 1);
                if (!(a.refs > 0)) {
                    a.disposeTimer = u.setTimeout(()=>{
                        if (!(a.refs > 0 || k.get(t) !== a)) {
                            k.delete(t);
                            a.texture.dispose();
                        }
                    }, 0);
                }
            }
        }
    };
}
let k = new Map;
function C() {
    while(f < 4 && d.length > 0){
        let e = d.shift();
        if (e.state === "queued" && c.get(e.hash) === e) {
            E(e);
        }
    }
}
async function E(e) {
    e.state = "loading";
    f += 1;
    h += 1;
    let t = new AbortController;
    let n = u.setTimeout(()=>t.abort(), 5000);
    try {
        let i;
        let n;
        let l;
        try {
            n = await u.fetch(Zb(e.hash) + (e.manualRetry ? "&retry=1" : ""), {
                signal: t.signal,
                credentials: "same-origin",
                ...e.manualRetry ? {
                    cache: "reload"
                } : {}
            });
        } catch (n) {
            A(e, null, t.signal.aborted ? "timeout" : "network");
            return;
        }
        if (!n.ok) {
            let r = Number(n.headers.get("Retry-After"));
            e.retryAt = u.now() + 1000 * Math.max(1, Math.min(600, Number.isFinite(r) ? r : 1));
            n.body?.cancel().catch(()=>{});
            t.abort();
            A(e, null, `http-${n.status}`);
            return;
        }
        try {
            l = new Uint8Array(await n.arrayBuffer());
        } catch (n) {
            A(e, null, t.signal.aborted ? "timeout" : "network");
            return;
        }
        if (l.length !== $w) {
            return void A(e, null, "size");
        }
        A(e, (i = l, y_1(i, sn, sn, [
            [
                0,
                0,
                sn,
                sn
            ]
        ]), j(new GYF(i, sn, sn, GWd, OUM))), null);
    } finally{
        u.clearTimeout(n);
        f -= 1;
        C();
    }
}
function A(e, t, n) {
    if (c.get(e.hash) !== e) {
        t?.dispose();
        return;
    }
    for (let [r, s] of (t ? (e.state = "ready", e.texture = t, e.failure = null, e.manualRetry = false, e.retryAt = 0) : (e.state = "failed", e.failure = n, e.failedAt = u.now(), e.retryAt = Math.max(e.retryAt, u.now() + 1000)), [
        ...e.listeners
    ])){
        r(s);
    }
    y();
    if (!(e.refs > 0)) {
        if (t) {
            T();
        } else {
            z();
        }
    }
}
function T() {
    let e = 0;
    for (let t of c.values()){
        if (t.state === "ready") {
            e += 1;
        }
    }
    while(e > 128){
        let n = null;
        for (let e of c.values()){
            if (!(e.state !== "ready" || e.refs > 0)) {
                if (!n || e.lastUsed < n.lastUsed) {
                    n = e;
                }
            }
        }
        if (!n) {
            return;
        }
        c.delete(n.hash);
        n.texture?.dispose();
        e -= 1;
    }
}
function z() {
    let e = u.now();
    let t = [];
    for (let n of c.values()){
        if (!(n.state !== "failed" || n.refs > 0)) {
            if (e - n.failedAt >= 60000) {
                c.delete(n.hash);
            } else {
                t.push(n);
            }
        }
    }
    if (!(t.length <= 256)) {
        for (let e of (t.sort((e, t)=>e.failedAt - t.failedAt), t.slice(0, t.length - 256))){
            c.delete(e.hash);
        }
    }
}
function j(e) {
    e.magFilter = hxR;
    e.minFilter = Cfg;
    e.generateMipmaps = true;
    e.colorSpace = er$;
    e.flipY = false;
    e.needsUpdate = true;
    return e;
}
