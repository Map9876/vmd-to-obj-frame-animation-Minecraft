function zo(e) {
    return e.length;
}
export function Bo(e, t) {
    let n = t || {};
    let r = (n.align || []).concat();
    let i = n.stringLength || zo;
    let a = [];
    let o = [];
    let s = [];
    let c = [];
    let l = 0;
    let u = -1;
    while(++u < e.length){
        let t = [];
        let r = [];
        let a = -1;
        for(e[u].length > l && (l = e[u].length); ++a < e[u].length;){
            let o = Vo(e[u][a]);
            if (n.alignDelimiters !== false) {
                let e = i(o);
                r[a] = e;
                if (c[a] === undefined || e > c[a]) {
                    c[a] = e;
                }
            }
            t.push(o);
        }
        o[u] = t;
        s[u] = r;
    }
    let d = -1;
    if (typeof r == `object` && `length` in r) {
        while(++d < l){
            a[d] = Ho(r[d]);
        }
    } else {
        let e = Ho(r);
        while(++d < l){
            a[d] = e;
        }
    }
    d = -1;
    let f = [];
    let p = [];
    while(++d < l){
        let e = a[d];
        let t = ``;
        let r = ``;
        switch(e){
            case 99:
                t = `:`;
                r = `:`;
                break;
            case 108:
                t = `:`;
                break;
            default:
                if (e === 114) {
                    r = `:`;
                }
        }
        let i = n.alignDelimiters === false ? 1 : Math.max(1, c[d] - t.length - r.length);
        let o = t + `-`.repeat(i) + r;
        if (n.alignDelimiters !== false) {
            i = t.length + i + r.length;
            if (i > c[d]) {
                c[d] = i;
            }
            p[d] = i;
        }
        f[d] = o;
    }
    o.splice(1, 0, f);
    s.splice(1, 0, p);
    u = -1;
    let m = [];
    while(++u < o.length){
        let e = o[u];
        let t = s[u];
        d = -1;
        let r = [];
        while(++d < l){
            let i = e[d] || ``;
            let o = ``;
            let s = ``;
            if (n.alignDelimiters !== false) {
                let e = c[d] - (t[d] || 0);
                let n = a[d];
                switch(n){
                    case 114:
                        o = ` `.repeat(e);
                        break;
                    case 99:
                        if (e % 2) {
                            o = ` `.repeat(e / 2 + 0.5);
                            s = ` `.repeat(e / 2 - 0.5);
                        } else {
                            o = ` `.repeat(e / 2);
                            s = o;
                        }
                        break;
                    default:
                        s = ` `.repeat(e);
                }
            }
            if (n.delimiterStart !== false && !d) {
                r.push(`|`);
            }
            if (n.padding !== false && !(n.alignDelimiters === false && i === ``) && (n.delimiterStart !== false || d)) {
                r.push(` `);
            }
            if (n.alignDelimiters !== false) {
                r.push(o);
            }
            r.push(i);
            if (n.alignDelimiters !== false) {
                r.push(s);
            }
            if (n.padding !== false) {
                r.push(` `);
            }
            if (n.delimiterEnd !== false || d !== l - 1) {
                r.push(`|`);
            }
        }
        m.push(n.delimiterEnd === false ? r.join(``).replace(/ +$/, ``) : r.join(``));
    }
    return m.join(`
`);
}
function Vo(e) {
    if (e == null) {
        return ``;
    }
    return String(e);
}
function Ho(e) {
    let t = typeof e == `string` ? e.codePointAt(0) : 0;
    if (t === 67 || t === 99) {
        return 99;
    }
    if (t === 76 || t === 108) {
        return 108;
    }
    if (t === 82 || t === 114) {
        return 114;
    }
    return 0;
}
