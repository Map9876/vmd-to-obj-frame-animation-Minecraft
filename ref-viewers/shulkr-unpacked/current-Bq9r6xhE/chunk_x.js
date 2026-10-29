import { h } from "./chunk_l.js";
import { v } from "./chunk_g.js";
export function x(e) {
    let t = e.split(`/`)[1] ?? ``;
    if (v(t)) {
        return t;
    }
}
export function S(e, t) {
    let n = x(e);
    let r = n ? e.slice(n.length + 1) || `/` : e;
    if (r === `/`) {
        return `/${t}`;
    }
    return `/${t}${r}`;
}
export const C = ()=>x(window.location.pathname) ?? `en`;
export function w() {
    let { locale } = h({
        strict: false
    });
    if (locale !== undefined && v(locale)) {
        return locale;
    }
    return `en`;
}
