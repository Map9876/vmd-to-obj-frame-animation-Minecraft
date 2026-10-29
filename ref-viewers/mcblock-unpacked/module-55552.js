export function y(e, t, r, n) {
    let l = new Uint8Array(t * r);
    let a = new Int32Array(0);
    let i = {
        rects: 0,
        filledTexels: 0
    };
    let o = (n, o, c, f)=>{
        let s = Math.max(0, n);
        let u = Math.max(0, o);
        let m = Math.min(t, n + c);
        let d = Math.min(r, o + f);
        if (m <= s || d <= u) {
            return;
        }
        let h = (m - s) * (d - u);
        if (a.length < h) {
            a = new Int32Array(h);
        }
        let g = 0;
        let w = 0;
        for(let r = u; r < d; r++){
            for(let n = s; n < m; n++){
                let i = r * t + n;
                if (e[4 * i + 3] > 0) {
                    l[i] = 1;
                    a[w++] = i;
                }
            }
        }
        i.rects++;
        if (w === 0 || w === h) {
            return;
        }
        let p = 0;
        while(g < w){
            let r = a[g++];
            let n = r % t;
            let i = (r - n) / t;
            let o = 4 * r;
            let c = r - 1;
            if (n > s && !l[c]) {
                l[c] = 1;
                e[4 * c] = e[o];
                e[4 * c + 1] = e[o + 1];
                e[4 * c + 2] = e[o + 2];
                a[w++] = c;
                p++;
            }
            c = r + 1;
            if (n + 1 < m && !l[c]) {
                l[c] = 1;
                e[4 * c] = e[o];
                e[4 * c + 1] = e[o + 1];
                e[4 * c + 2] = e[o + 2];
                a[w++] = c;
                p++;
            }
            c = r - t;
            if (i > u && !l[c]) {
                l[c] = 1;
                e[4 * c] = e[o];
                e[4 * c + 1] = e[o + 1];
                e[4 * c + 2] = e[o + 2];
                a[w++] = c;
                p++;
            }
            c = r + t;
            if (i + 1 < d && !l[c]) {
                l[c] = 1;
                e[4 * c] = e[o];
                e[4 * c + 1] = e[o + 1];
                e[4 * c + 2] = e[o + 2];
                a[w++] = c;
                p++;
            }
        }
        i.filledTexels += p;
    };
    for (let [e, t, r, l] of n){
        if (!(r > 0 && l > 0)) {
            continue;
        }
        let n = l > r ? r : l;
        for(let a = t; a < t + l; a += n){
            o(e, a, r, Math.min(n, t + l - a));
        }
    }
    return i;
}
