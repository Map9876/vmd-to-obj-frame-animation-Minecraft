function Ce(e) {
    switch(e){
        case `"`:
            return `\\"`;
        case `\\`:
            return `\\\\`;
        case `
`:
            return `\\n`;
        case `\r`:
            return `\\r`;
        case `\b`:
            return `\\b`;
        case `	`:
            return `\\t`;
        case `\f`:
            return `\\f`;
        case `<`:
            return `\\x3C`;
        case `\u2028`:
            return `\\u2028`;
        case `\u2029`:
            return `\\u2029`;
        default:
            return;
    }
}
export function y(e) {
    let t = ``;
    let n = 0;
    let r;
    for(let i = 0, a = e.length; i < a; i++){
        r = Ce(e[i]);
        if (r) {
            t += e.slice(n, i) + r;
            n = i + 1;
        }
    }
    if (n === 0) {
        t = e;
    } else {
        t += e.slice(n);
    }
    return t;
}
