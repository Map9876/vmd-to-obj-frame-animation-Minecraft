import { g as g_1, h as h_1 } from "../dist-C66QuM2X.js";
import { l } from "./chunk_$s.js";
export function p(e, t, n) {
    return `${e},${t},${n}`;
}
export function m(e, t, n) {
    return t << 8 | n << 4 | e;
}
export function h(e, t, n) {
    return m(l(e), l(t), l(n));
}
export const g = new Map;
export function _(e) {
    let { id, namespace, name } = g_1(e.id ?? `${e.namespace ?? `minecraft`}:${e.name ?? ``}`);
    let o = e.properties ? {
        ...e.properties
    } : {};
    let stateKey = e.stateKey ?? h_1(id, o);
    let c = g.get(stateKey);
    if (c) {
        return c;
    }
    let l = Object.freeze({
        id,
        namespace,
        name,
        properties: Object.freeze(o),
        stateKey
    });
    g.set(stateKey, l);
    return l;
}
export const go = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2
};
export const _o = {
    ROTATE: 0,
    PAN: 1,
    DOLLY_PAN: 2,
    DOLLY_ROTATE: 3
};
export const vo = `attached`;
export const yo = 1000;
export const bo = 1001;
export const xo = 1002;
export const So = 1003;
export const Co = 1004;
export const wo = 1005;
export const To = 1006;
export const Eo = 1007;
export const Do = 1008;
export const Oo = 1009;
export const ko = 1010;
export const Ao = 1011;
export const jo = 1012;
export const Mo = 1013;
export const No = 1014;
export const Po = 1015;
export const Fo = 1016;
export const Io = 1017;
export const Lo = 1018;
export const Ro = 1020;
export const zo = 35902;
export const Bo = 35899;
export const Vo = 1021;
export const Ho = 1022;
export const Uo = 1023;
export const Wo = 1026;
export const Go = 1027;
export const Ko = 1028;
export const qo = 1029;
export const Jo = 1030;
export const Yo = 1031;
export const Xo = 1033;
export const Zo = 33776;
export const Qo = 33777;
export const $o = 33778;
export const es = 33779;
export const ts = 35840;
export const ns = 35841;
export const rs = 35842;
export const is = 35843;
export const as = 36196;
export const os = 37492;
export const ss = 37496;
export const cs = 37488;
export const ls = 37489;
export const us = 37490;
export const ds = 37491;
export const fs = 37808;
export const ps = 37809;
export const ms = 37810;
export const hs = 37811;
export const gs = 37812;
export const _s = 37813;
export const vs = 37814;
export const ys = 37815;
export const bs = 37816;
export const xs = 37817;
export const Ss = 37818;
export const Cs = 37819;
export const ws = 37820;
export const Ts = 37821;
export const Es = 36492;
export const Ds = 36494;
export const Os = 36495;
export const ks = 36283;
export const As = 36284;
export const js = 36285;
export const Ms = 36286;
export const Ns = 2300;
export const Ps = 2301;
export const Fs = 2302;
export const Is = 2303;
export const Ls = 2400;
export const Rs = 2401;
export const zs = 2402;
export const Bs = 2500;
export const Vs = 3200;
export const Hs = `srgb`;
export const Us = `srgb-linear`;
export const Ws = `linear`;
export const Gs = `srgb`;
export const Ks = 7680;
export const qs = 35044;
export const Js = 2000;
