const Lt = 12;
export function Rt(e, t, n) {
    let r = n;
    for(let n = 1; n < Lt; n++){
        r -= e(r) / t(r);
    }
    return r;
}
