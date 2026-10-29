export function omit(e, t) {
    let r = {};
    Object.keys(e).forEach((n)=>{
        if (!t.includes(n)) {
            r[n] = e[n];
        }
    });
    return r;
}
