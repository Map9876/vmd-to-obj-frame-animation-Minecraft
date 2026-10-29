export function Rh(e, t) {
    for(let n = 0, r = t.length; n < r; n++){
        e[n] = t[n];
    }
}
export function Ng(e, t, n) {
    let r = e.createShader(t);
    e.shaderSource(r, n);
    e.compileShader(r);
    return r;
}
function Ig(e, t) {
    let n = e.split(`
`);
    let r = [];
    let i = Math.max(t - 6, 0);
    let a = Math.min(t + 6, n.length);
    for(let e = i; e < a; e++){
        let i = e + 1;
        r.push(`${i === t ? `>` : ` `} ${i}: ${n[e]}`);
    }
    return r.join(`
`);
}
export function zg(e, t, n) {
    let r = e.getShaderParameter(t, e.COMPILE_STATUS);
    let i = (e.getShaderInfoLog(t) || ``).trim();
    if (r && i === ``) {
        return ``;
    }
    let a = /ERROR: 0:(\d+)/.exec(i);
    if (a) {
        let r = parseInt(a[1]);
        return n.toUpperCase() + `

` + i + `

` + Ig(e.getShaderSource(t), r);
    } else {
        return i;
    }
}
