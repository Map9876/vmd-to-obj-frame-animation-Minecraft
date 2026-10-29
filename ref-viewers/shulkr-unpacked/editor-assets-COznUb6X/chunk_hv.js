const hv = 15000280;
const gv = 8157289;
function _v(e) {
    let t = (e >> 16 & 255) / 255;
    let n = (e >> 8 & 255) / 255;
    let r = (e & 255) / 255;
    return 0.299 * t + 0.587 * n + 0.114 * r;
}
export function Cv(e) {
    if (_v(e) > 0.5) {
        return gv;
    }
    return hv;
}
