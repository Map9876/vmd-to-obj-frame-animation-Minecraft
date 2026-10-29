export function vf(e, t) {
    let n = `/api/buildings/${encodeURIComponent(e)}/projection`;
    if (t) {
        return `${n}?v=${((e)=>{
            let t = 2166136261;
            for(let n = 0; n < e.length; n++){
                t ^= e.charCodeAt(n);
                t = Math.imul(t, 16777619) >>> 0;
            }
            return t.toString(36);
        })(t)}`;
    }
    return n;
}
