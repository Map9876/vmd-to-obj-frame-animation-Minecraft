export function djb2Hash(e) {
    let t = 5381;
    for(let r = 0; r < e.length; r++){
        t = (t << 5) + t + e.charCodeAt(r) | 0;
    }
    return t >>> 0;
}
export function hexHash(e) {
    return djb2Hash(e).toString(36).slice(0, 5);
}
