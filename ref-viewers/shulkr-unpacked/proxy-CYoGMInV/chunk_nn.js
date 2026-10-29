const nn = (e)=>e !== null;
export function rn(e, { repeat, repeatType = `loop` }, r, i = 1) {
    let a = e.filter(nn);
    let o = i < 0 || repeat && repeatType !== `loop` && repeat % 2 == 1 ? 0 : a.length - 1;
    if (!o || r === undefined) {
        return a[o];
    }
    return r;
}
