function sn(e, t) {
    for(let n = 0, r = t.length; n < r; n++){
        let r = t[n];
        if (!e.has(r)) {
            e.add(r);
            if (r.extends) {
                sn(e, r.extends);
            }
        }
    }
}
export function cn(e) {
    if (e) {
        let t = new Set;
        sn(t, e);
        return [
            ...t
        ];
    }
}
