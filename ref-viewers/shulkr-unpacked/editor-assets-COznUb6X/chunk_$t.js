import { on, rn, sn } from "./chunk_It.js";
export const $t = (e, blockType)=>({
        properties: e.properties,
        blockType
    });
export const en = 0.6;
const tn = 1e-7;
export const nn = (e, t, n, r)=>({
        minX: e.minX + t,
        minY: e.minY + n,
        minZ: e.minZ + r,
        maxX: e.maxX + t,
        maxY: e.maxY + n,
        maxZ: e.maxZ + r
    });
export function cn(e, t, n = en) {
    return sn(e, nn(t, 0, -n, 0));
}
function ln(e, t, n, r) {
    if (n === 0) {
        return 0;
    }
    let [i, a, o, s, c, l] = r === 0 ? [
        `minX`,
        `maxX`,
        `minY`,
        `maxY`,
        `minZ`,
        `maxZ`
    ] : r === 1 ? [
        `minY`,
        `maxY`,
        `minX`,
        `maxX`,
        `minZ`,
        `maxZ`
    ] : [
        `minZ`,
        `maxZ`,
        `minX`,
        `maxX`,
        `minY`,
        `maxY`
    ];
    let u = n;
    for (let n of e){
        if (!(t[s] <= n[o] || t[o] >= n[s] || t[l] <= n[c] || t[c] >= n[l])) {
            if (u > 0 && t[a] <= n[i] + tn) {
                u = Math.min(n[i] - t[a], u);
            } else if (u < 0 && t[i] >= n[a] - tn) {
                u = Math.max(n[a] - t[i], u);
            }
        }
    }
    return u;
}
function un(e, t, n, r, i) {
    let a = t;
    let dy = ln(e, a, r, 1);
    if (dy !== 0) {
        a = nn(a, 0, dy, 0);
    }
    let dx;
    let dz;
    if (Math.abs(n) < Math.abs(i)) {
        dx = ln(e, a, n, 0);
        if (dx !== 0) {
            a = nn(a, dx, 0, 0);
        }
        dz = ln(e, a, i, 2);
    } else {
        dz = ln(e, a, i, 2);
        if (dz !== 0) {
            a = nn(a, 0, 0, dz);
        }
        dx = ln(e, a, n, 0);
    }
    return {
        dx,
        dy,
        dz
    };
}
const dn = (e)=>e.dx * e.dx + e.dz * e.dz;
export function fn(e, t, n, r, i, a, o = en) {
    let s = on(e, rn(rn(t, n, r, i), 0, o > 0 ? o : 0, 0));
    let c = un(s, t, n, r, i);
    let l = c.dx !== n || c.dz !== i;
    let u = a || r < 0 && c.dy !== r;
    let d = c;
    let stepped = false;
    if (o > 0 && u && l) {
        let e = un(s, t, n, o, i);
        if (dn(e) > dn(c)) {
            let n = ln(s, nn(t, e.dx, e.dy, e.dz), r - e.dy, 1);
            d = {
                dx: e.dx,
                dy: e.dy + n,
                dz: e.dz
            };
            stepped = true;
        }
    }
    return {
        dx: d.dx,
        dy: d.dy,
        dz: d.dz,
        hitX: d.dx !== n,
        hitY: d.dy !== r,
        hitZ: d.dz !== i,
        onGround: stepped || r <= 0 && d.dy !== r,
        stepped
    };
}
