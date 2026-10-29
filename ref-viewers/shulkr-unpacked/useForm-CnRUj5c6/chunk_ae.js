const ae = 46;
const k = 91;
const A = 93;
const oe = 48;
const se = 57;
export function ce(e) {
    if (Array.isArray(e)) {
        return [
            ...e
        ];
    }
    if (typeof e != `string`) {
        throw Error(`Path must be a string.`);
    }
    let e_length = e.length;
    let n = [];
    let r = +(e_length > 0 && e.charCodeAt(0) === k);
    let i = true;
    let a = -1;
    for(let o = r; o <= e_length; o++){
        let s = o < e_length ? e.charCodeAt(o) : -1;
        if (o === e_length || s === ae || s === k || s === A) {
            let t = o - r;
            if (t > 0) {
                let a = i && (t === 1 || e.charCodeAt(r) !== oe);
                let s = e.slice(r, o);
                if (a) {
                    let e = parseInt(s, 10);
                    if (t <= 15 || String(e) === s) {
                        n.push(e);
                    } else {
                        n.push(s);
                    }
                } else {
                    n.push(s);
                }
            } else {
                if (a !== A && !(a === -1 && s === A) && !(a === s && (s === ae || s === k))) {
                    n.push(``);
                }
            }
            r = o + 1;
            i = true;
        } else {
            if (s < oe || s > se) {
                i = false;
            }
        }
        a = s;
    }
    if (!n.length) {
        n.push(``);
    }
    return n;
}
