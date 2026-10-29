export function rr(e, t, n) {
    if (e == null || t == null) {
        return Object.is(e, t);
    }
    return n(e, t);
}
export function ir(e, t, n) {
    if (!e || e.length === 0) {
        return false;
    }
    return e.some((e)=>{
        if (e === undefined) {
            return false;
        }
        return rr(t, e, n);
    });
}
export function ar(e, t, n) {
    if (!e || e.length === 0) {
        return -1;
    }
    return e.findIndex((e)=>{
        if (e === undefined) {
            return false;
        }
        return rr(e, t, n);
    });
}
export function or(e, t, n) {
    return e.filter((e)=>!rr(t, e, n));
}
