let n = [
    "slim/alex",
    "slim/ari",
    "slim/efe",
    "slim/kai",
    "slim/makena",
    "slim/noor",
    "slim/steve",
    "slim/sunny",
    "slim/zuri",
    "wide/alex",
    "wide/ari",
    "wide/efe",
    "wide/kai",
    "wide/makena",
    "wide/noor",
    "wide/steve",
    "wide/sunny",
    "wide/zuri"
];
let l = new Set(n);
export function xl(e) {
    return typeof e === "string" && l.has(e);
}
export function Cs(e) {
    let r = (((e)=>{
        let t = e.replace(/-/g, "").toLowerCase();
        if (!/^[0-9a-f]{32}$/.test(t)) {
            return 0;
        }
        let r = (e)=>0 | Number.parseInt(t.slice(e, e + 8), 16);
        return r(0) ^ r(16) ^ (r(8) ^ r(24));
    })(e?.uuid ?? (e?.name ? ((e)=>{
        let t = ((e)=>{
            let t = 8 * e.length;
            let r = (e.length + 8 >> 6) + 1 << 6;
            let n = new Uint8Array(r);
            n.set(e);
            n[e.length] = 128;
            let l = new DataView(n.buffer);
            l.setUint32(r - 8, t >>> 0, true);
            l.setUint32(r - 4, Math.floor(t / 4294967296), true);
            let a = 1732584193;
            let i = 4023233417;
            let f = 2562383102;
            let s = 271733878;
            let u = new Uint32Array(16);
            for(let e = 0; e < r; e += 64){
                for(let t = 0; t < 16; t++){
                    u[t] = l.getUint32(e + 4 * t, true);
                }
                let t = a;
                let r = i;
                let n = f;
                let m = s;
                for(let e = 0; e < 64; e++){
                    let l;
                    let a;
                    if (e < 16) {
                        l = r & n | ~r & m;
                        a = e;
                    } else if (e < 32) {
                        l = m & r | ~m & n;
                        a = (5 * e + 1) % 16;
                    } else if (e < 48) {
                        l = r ^ n ^ m;
                        a = (3 * e + 5) % 16;
                    } else {
                        l = n ^ (r | ~m);
                        a = 7 * e % 16;
                    }
                    let i = m;
                    m = n;
                    n = r;
                    let f = t + l + c[e] + u[a] >>> 0;
                    r = r + (f << o[e] | f >>> 32 - o[e]) >>> 0;
                    t = i;
                }
                a = a + t >>> 0;
                i = i + r >>> 0;
                f = f + n >>> 0;
                s = s + m >>> 0;
            }
            let m = new Uint8Array(16);
            let d = new DataView(m.buffer);
            d.setUint32(0, a, true);
            d.setUint32(4, i, true);
            d.setUint32(8, f, true);
            d.setUint32(12, s, true);
            return m;
        })(new TextEncoder().encode(`OfflinePlayer:${e}`));
        t[6] = 15 & t[6] | 48;
        t[8] = 63 & t[8] | 128;
        let r = Array.from(t, (e)=>e.toString(16).padStart(2, "0")).join("");
        return `${r.slice(0, 8)}-${r.slice(8, 12)}-${r.slice(12, 16)}-${r.slice(16, 20)}-${r.slice(20)}`;
    })(e.name) : "00000000-0000-0000-0000-000000000000")) % n.length + n.length) % n.length;
    return n[r];
}
let o = [
    7,
    12,
    17,
    22,
    7,
    12,
    17,
    22,
    7,
    12,
    17,
    22,
    7,
    12,
    17,
    22,
    5,
    9,
    14,
    20,
    5,
    9,
    14,
    20,
    5,
    9,
    14,
    20,
    5,
    9,
    14,
    20,
    4,
    11,
    16,
    23,
    4,
    11,
    16,
    23,
    4,
    11,
    16,
    23,
    4,
    11,
    16,
    23,
    6,
    10,
    15,
    21,
    6,
    10,
    15,
    21,
    6,
    10,
    15,
    21,
    6,
    10,
    15,
    21
];
let c = Array.from({
    length: 64
}, (e, t)=>Math.floor(4294967296 * Math.abs(Math.sin(t + 1))) >>> 0);
