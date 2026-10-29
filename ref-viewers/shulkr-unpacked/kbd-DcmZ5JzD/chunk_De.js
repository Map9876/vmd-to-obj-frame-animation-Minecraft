export function H(e) {
    if (e === 0) {
        return 0;
    }
    if (Math.abs(e) < 1) {
        let t = e.toExponential().split(`e-`);
        let n = t[0].split(`.`)[1];
        return (n ? n.length : 0) + parseInt(t[1], 10);
    }
    let t = e.toString().split(`.`)[1];
    if (t) {
        return t.length;
    }
    return 0;
}
export function De(e, t, n) {
    let r = Math.round((e - n) / t) * t + n;
    return Number(r.toFixed(Math.max(H(t), H(n))));
}
