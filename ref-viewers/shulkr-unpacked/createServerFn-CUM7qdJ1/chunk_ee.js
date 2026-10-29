const u = /;\s*v=(\d+)/;
function d(e) {
    let t = e.match(u);
    if (t) {
        return parseInt(t[1], 10);
    }
}
export function ee(e) {
    let t = d(e);
    if (t !== undefined && t !== 1) {
        throw Error(`Incompatible framed protocol version: server=${t}, client=1. Please ensure client and server are using compatible versions.`);
    }
}
