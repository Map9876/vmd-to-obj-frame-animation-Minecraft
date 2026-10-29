import { S, v } from "./session-BGIR8kU0/chunk_v.js";
import { C, D, E, T, w } from "./session-BGIR8kU0/chunk_C.js";
import { z } from "./session-BGIR8kU0/chunk_z.js";
import { n as n_1, s as s_1 } from "./jsx-runtime-Db0DjQYK.js";
import { n } from "./ClientOnly-BiCdmN1s.js";
import { M as M_1, O, T as T_1, c as c_1, f, g, h, k as k_1, s as s_2, v as v_1, x } from "./keys-CMeqocw_.js";
import { J, M as M_2, k as k_2, o } from "./browser-I-D20JeN.js";
export function r(e) {
    return !!(e && !e.user.isGuest);
}
function k(e, t) {
    return e != null && t != null && e.user.handle === t;
}
export function u(e) {
    let t = n();
    let { data } = w();
    return t && k(data, e);
}
export function d() {
    let e = n();
    let { data } = w();
    return e && M(data);
}
function M(data) {
    return (data?.user.roles.length ?? 0) > 0;
}
export function t({ user }) {
    if (user.identityClaimed) {
        return user.displayName;
    }
    return user.profile.name ?? user.email ?? user.displayName;
}
export function c(e) {
    let { data, isPending } = w();
    return {
        granted: data?.user.capabilities.includes(e) ?? false,
        known: !isPending
    };
}
export function s(e) {
    let { data } = w();
    return data?.user.capabilities.includes(e) ?? false;
}
const I = [
    [
        `max`,
        `Max`
    ],
    [
        `pro`,
        `Pro`
    ],
    [
        `plus`,
        `Plus`
    ]
];
export function i(e) {
    return I.find(([t])=>t === e)?.[1] ?? null;
}
export function p() {
    let { data } = w();
    let t = data?.user.plans ?? [];
    return I.find(([e])=>t.includes(e))?.[1] ?? null;
}
export { v as _, C as a, T as f, S as g, D as h, E as l, w as m, k as n, z as o };
