export const byteLength = function(t) {
    const e = f(t);
    const r = e[0];
    const n = e[1];
    return (r + n) * 3 / 4 - n;
};
export const toByteArray = function(t) {
    let e;
    let r;
    const s = f(t);
    const a = s[0];
    const o = s[1];
    const h = new i((a + o) * 3 / 4 - o);
    let u = 0;
    const l = o > 0 ? a - 4 : a;
    for(r = 0; r < l; r += 4){
        e = n[t.charCodeAt(r)] << 18 | n[t.charCodeAt(r + 1)] << 12 | n[t.charCodeAt(r + 2)] << 6 | n[t.charCodeAt(r + 3)];
        h[u++] = e >> 16 & 255;
        h[u++] = e >> 8 & 255;
        h[u++] = 255 & e;
    }
    if (o === 2) {
        e = n[t.charCodeAt(r)] << 2 | n[t.charCodeAt(r + 1)] >> 4;
        h[u++] = 255 & e;
    }
    if (o === 1) {
        e = n[t.charCodeAt(r)] << 10 | n[t.charCodeAt(r + 1)] << 4 | n[t.charCodeAt(r + 2)] >> 2;
        h[u++] = e >> 8 & 255;
        h[u++] = 255 & e;
    }
    return h;
};
export const fromByteArray = function(t) {
    let e;
    const t_length = t.length;
    const i = t_length % 3;
    const s = [];
    for(let a = 0, o = t_length - i; a < o; a += 16383){
        s.push(((t, e, n)=>{
            let i;
            const s = [];
            for(let a = e; a < n; a += 3){
                i = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]);
                s.push(r[i >> 18 & 63] + r[i >> 12 & 63] + r[i >> 6 & 63] + r[63 & i]);
            }
            return s.join("");
        })(t, a, a + 16383 > o ? o : a + 16383));
    }
    if (i === 1) {
        s.push(`${r[(e = t[t_length - 1]) >> 2] + r[e << 4 & 63]}==`);
    } else if (i === 2) {
        s.push(`${r[(e = (t[t_length - 2] << 8) + t[t_length - 1]) >> 10] + r[e >> 4 & 63] + r[e << 2 & 63]}=`);
    }
    return s.join("");
};
var r = [];
var n = [];
var i = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
const s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(let a = 0, o = s.length; a < o; ++a){
    r[a] = s[a];
    n[s.charCodeAt(a)] = a;
}
function f(t) {
    const t_length = t.length;
    if (t_length % 4 > 0) {
        throw Error("Invalid string. Length must be a multiple of 4");
    }
    let r = t.indexOf("=");
    if (r === -1) {
        r = t_length;
    }
    const n = r === t_length ? 0 : 4 - r % 4;
    return [
        r,
        n
    ];
}
n[45] = 62;
n[95] = 63;
