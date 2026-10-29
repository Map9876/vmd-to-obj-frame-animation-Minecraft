function o(e, t, n) {
    let e_length = e.length;
    let i = n;
    let a = 0;
    while(a < e_length){
        let n = e.charCodeAt(a++);
        if (!(n & 4294967168)) {
            t[i++] = n;
            continue;
        } else if (!(n & 4294965248)) {
            t[i++] = n >> 6 & 31 | 192;
        } else {
            if (n >= 55296 && n <= 56319 && a < e_length) {
                let t = e.charCodeAt(a);
                if ((t & 64512) == 56320) {
                    ++a;
                    n = ((n & 1023) << 10) + (t & 1023) + 65536;
                }
            }
            if (n & 4294901760) {
                t[i++] = n >> 18 & 7 | 240;
                t[i++] = n >> 12 & 63 | 128;
                t[i++] = n >> 6 & 63 | 128;
            } else {
                t[i++] = n >> 12 & 15 | 224;
                t[i++] = n >> 6 & 63 | 128;
            }
        }
        t[i++] = n & 63 | 128;
    }
}
const s = new TextEncoder;
const c = 50;
function l(e, t, n) {
    s.encodeInto(e, t.subarray(n));
}
export function u(e, t, n) {
    if (e.length > c) {
        l(e, t, n);
    } else {
        o(e, t, n);
    }
}
