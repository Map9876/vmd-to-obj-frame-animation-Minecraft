export function l(e) {
    return e & 15;
}
const $s = {};
const ec = null;
export function tc(...e) {
    let t = `THREE.` + e.shift();
    if (ec) {
        ec(`log`, t, ...e);
    } else {
        console.log(t, ...e);
    }
}
function nc(e) {
    let t = e[0];
    if (typeof t == `string` && t.startsWith(`TSL:`)) {
        let t = e[1];
        if (t && t.isStackTrace) {
            e[0] += ` ` + t.getLocation();
        } else {
            e[1] = `Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`;
        }
    }
    return e;
}
export function B(...e) {
    e = nc(e);
    let t = `THREE.` + e.shift();
    if (ec) {
        ec(`warn`, t, ...e);
    } else {
        let n = e[0];
        if (n && n.isStackTrace) {
            console.warn(n.getError(t));
        } else {
            console.warn(t, ...e);
        }
    }
}
export function V(...e) {
    e = nc(e);
    let t = `THREE.` + e.shift();
    if (ec) {
        ec(`error`, t, ...e);
    } else {
        let n = e[0];
        if (n && n.isStackTrace) {
            console.error(n.getError(t));
        } else {
            console.error(t, ...e);
        }
    }
}
export function rc(...e) {
    let t = e.join(` `);
    if (!(t in $s)) {
        $s[t] = true;
        B(...e);
    }
}
