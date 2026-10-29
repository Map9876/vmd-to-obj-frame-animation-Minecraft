function c(e) {
    let t = e.indexOf(`{`);
    if (t === -1) {
        return null;
    }
    let n = e.indexOf(`}`, t);
    if (n === -1 || t + 1 >= e.length) {
        return null;
    }
    return [
        t,
        n
    ];
}
export function l(e, t, n = new Uint16Array(6)) {
    let r = e.indexOf(`/`, t);
    let i = r === -1 ? e.length : r;
    let a = e.substring(t, i);
    if (!a || !a.includes(`$`)) {
        n[0] = 0;
        n[1] = t;
        n[2] = t;
        n[3] = i;
        n[4] = i;
        n[5] = i;
        return n;
    }
    if (a === `$`) {
        let r = e.length;
        n[0] = 2;
        n[1] = t;
        n[2] = t;
        n[3] = r;
        n[4] = r;
        n[5] = r;
        return n;
    }
    if (a.charCodeAt(0) === 36) {
        n[0] = 1;
        n[1] = t;
        n[2] = t + 1;
        n[3] = i;
        n[4] = i;
        n[5] = i;
        return n;
    }
    let o = c(a);
    if (o) {
        let [r, s] = o;
        let c = a.charCodeAt(r + 1);
        if (c === 45) {
            if (r + 2 < a.length && a.charCodeAt(r + 2) === 36) {
                let e = r + 3;
                let a = s;
                if (e < a) {
                    n[0] = 3;
                    n[1] = t + r;
                    n[2] = t + e;
                    n[3] = t + a;
                    n[4] = t + s + 1;
                    n[5] = i;
                    return n;
                }
            }
        } else if (c === 36) {
            let a = r + 1;
            let o = r + 2;
            if (o === s) {
                n[0] = 2;
                n[1] = t + r;
                n[2] = t + a;
                n[3] = t + o;
                n[4] = t + s + 1;
                n[5] = e.length;
                return n;
            }
            n[0] = 1;
            n[1] = t + r;
            n[2] = t + o;
            n[3] = t + s;
            n[4] = t + s + 1;
            n[5] = i;
            return n;
        }
    }
    n[0] = 0;
    n[1] = t;
    n[2] = t;
    n[3] = i;
    n[4] = i;
    n[5] = i;
    return n;
}
