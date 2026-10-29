export function searchParamsToUrlQuery(e) {
    let t = {};
    for (let [r, n] of e.entries()){
        let e = t[r];
        if (e === undefined) {
            t[r] = n;
        } else if (Array.isArray(e)) {
            e.push(n);
        } else {
            t[r] = [
                e,
                n
            ];
        }
    }
    return t;
}
function n(e) {
    if (typeof e === "string") {
        return e;
    }
    if ((typeof e !== "number" || isNaN(e)) && typeof e !== "boolean") {
        return "";
    }
    return String(e);
}
export function urlQueryToSearchParams(e) {
    let t = new URLSearchParams;
    for (let [r, a] of Object.entries(e)){
        if (Array.isArray(a)) {
            for (let e of a){
                t.append(r, n(e));
            }
        } else {
            t.set(r, n(a));
        }
    }
    return t;
}
export function assign(e, ...r_1) {
    for (let t of r_1){
        for (let r of t.keys()){
            e.delete(r);
        }
        for (let [r, n] of t.entries()){
            e.append(r, n);
        }
    }
    return e;
}
