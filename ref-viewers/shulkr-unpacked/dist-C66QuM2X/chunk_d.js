const d = 4096;
export function f(e, t, n) {
    let r = t;
    let i = r + n;
    let a = [];
    let o = ``;
    while(r < i){
        let t = e[r++];
        if (!(t & 128)) {
            a.push(t);
        } else if ((t & 224) == 192) {
            let n = e[r++] & 63;
            a.push((t & 31) << 6 | n);
        } else if ((t & 240) == 224) {
            let n = e[r++] & 63;
            let i = e[r++] & 63;
            a.push((t & 31) << 12 | n << 6 | i);
        } else if ((t & 248) == 240) {
            let n = e[r++] & 63;
            let i = e[r++] & 63;
            let o = e[r++] & 63;
            let s = (t & 7) << 18 | n << 12 | i << 6 | o;
            if (s > 65535) {
                s -= 65536;
                a.push(s >>> 10 & 1023 | 55296);
                s = 56320 | s & 1023;
            }
            a.push(s);
        } else {
            a.push(t);
        }
        if (a.length >= d) {
            o += String.fromCharCode(...a);
            a.length = 0;
        }
    }
    if (a.length > 0) {
        o += String.fromCharCode(...a);
    }
    return o;
}
