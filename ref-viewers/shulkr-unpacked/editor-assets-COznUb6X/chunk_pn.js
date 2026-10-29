import { en, fn } from "./chunk_$t.js";
import { Vn } from "./chunk_Bn.js";
export const pn = 1 / 20;
export const mn = 0.6;
export const hn = 1.8;
const gn = 1.5;
export const _n = 1.62;
const vn = 1.27;
const yn = 0.08;
const bn = 0.98;
const xn = 0.42;
const Sn = 0.2;
const Cn = 0.15;
const wn = 0.2;
const Tn = 0.1;
export const En = 1.3;
const Dn = 0.3;
const On = 0.98;
const kn = 0.02;
const An = 0.91;
const jn = 0.6;
const Mn = {
    ice: 0.98,
    packed_ice: 0.98,
    frosted_ice: 0.98,
    blue_ice: 0.989,
    slime_block: 0.8
};
const Nn = 0.21600002;
export const Pn = (x, y, z)=>({
        x,
        y,
        z,
        vx: 0,
        vy: 0,
        vz: 0,
        onGround: false,
        sneaking: false,
        sprinting: false
    });
function Fn(e) {
    let t = mn / 2;
    return {
        minX: e.x - t,
        minY: e.y,
        minZ: e.z - t,
        maxX: e.x + t,
        maxY: e.y + (e.sneaking ? gn : hn),
        maxZ: e.z + t
    };
}
export const In = (e)=>{
    if (e.sneaking) {
        return vn;
    }
    return _n;
};
export function Ln(e, t, n) {
    let t_sneak = t.sneak;
    let sprinting = t.sprint && t.forward > 0 && !t_sneak;
    let vx = e.vx;
    let vy = e.vy;
    let vz = e.vz;
    let c = e.onGround ? Un(e, n) : jn;
    let l = e.onGround ? c * An : An;
    if (t.jump && e.onGround) {
        vy = xn;
        if (sprinting) {
            vx -= Math.sin(t.yaw) * Sn;
            vz += Math.cos(t.yaw) * Sn;
        }
    }
    let u = Hn(t, t_sneak, e.onGround ? Tn * (sprinting ? En : 1) * (Nn / (c * c * c)) : kn * (sprinting ? En : 1));
    vx += u.x;
    vz += u.z;
    if (zn(e, n)) {
        vx = Rn(vx, Cn);
        vz = Rn(vz, Cn);
        vy = Math.max(vy, -0.15);
        if (t_sneak && vy < 0) {
            vy = 0;
        }
    }
    let d = Fn({
        ...e,
        sneaking: t_sneak
    });
    let [f, p] = [
        vx,
        vz
    ];
    if (t_sneak && e.onGround && vy <= 0) {
        [f, p] = Vn(n, d, vx, vz);
    }
    let m = fn(n, d, f, vy, p, e.onGround, en);
    let h = {
        x: e.x + m.dx,
        y: e.y + m.dy,
        z: e.z + m.dz,
        vx,
        vy,
        vz,
        onGround: m.onGround,
        sneaking: t_sneak,
        sprinting
    };
    if (m.hitX) {
        h.vx = 0;
    }
    if (m.hitZ) {
        h.vz = 0;
    }
    if (m.hitY) {
        h.vy = 0;
    }
    if ((m.hitX || m.hitZ || t.jump) && zn(h, n)) {
        h.vy = wn;
    }
    h.vy = (h.vy - yn) * bn;
    h.vx *= l;
    h.vz *= l;
    return h;
}
var Rn = (e, t)=>Math.min(t, Math.max(-t, e));
function zn(e, t) {
    if (t.isClimbable) {
        return t.isClimbable(Math.floor(e.x), Math.floor(e.y), Math.floor(e.z));
    }
    return false;
}
function Hn(e, t, n) {
    let r = On * (t ? Dn : 1);
    let i = e.forward * r;
    let a = -e.strafe * r;
    let o = i * i + a * a;
    if (o < 1e-7) {
        return {
            x: 0,
            z: 0
        };
    }
    if (o > 1) {
        let e = Math.sqrt(o);
        i /= e;
        a /= e;
    }
    i *= n;
    a *= n;
    let s = Math.sin(e.yaw);
    let c = Math.cos(e.yaw);
    return {
        x: a * c - i * s,
        z: i * c + a * s
    };
}
function Un(e, t) {
    if (!t.groundBlockName) {
        return jn;
    }
    let n = t.groundBlockName(Math.floor(e.x), Math.floor(e.y - 0.02), Math.floor(e.z));
    if (n === null) {
        return jn;
    }
    return Mn[n] ?? 0.6;
}
