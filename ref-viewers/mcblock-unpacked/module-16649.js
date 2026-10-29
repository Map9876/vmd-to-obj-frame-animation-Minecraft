let toString = Object.prototype.toString;
export function bJ(e) {
    switch(toString.call(e)){
        case "[object Error]":
        case "[object Exception]":
        case "[object DOMException]":
        case "[object WebAssembly.Exception]":
            return true;
        default:
            return tH(e, Error);
    }
}
function o(e, t) {
    return toString.call(e) === `[object ${t}]`;
}
export function T2(e) {
    return o(e, "ErrorEvent");
}
export function BD(e) {
    return o(e, "DOMError");
}
export function W6(e) {
    return o(e, "DOMException");
}
export function Kg(e) {
    return o(e, "String");
}
export function NF(e) {
    return typeof e === "object" && e !== null && "__sentry_template_string__" in e && "__sentry_template_values__" in e;
}
export function sO(e) {
    return e === null || NF(e) || typeof e !== "object" && typeof e !== "function";
}
export function Qd(e) {
    return o(e, "Object");
}
export function xH(e) {
    return typeof Event !== "undefined" && tH(e, Event);
}
export function vq(e) {
    return typeof Element !== "undefined" && tH(e, Element);
}
export function gd(e) {
    return o(e, "RegExp");
}
export function Qg(e) {
    return !!(e?.then && typeof e.then === "function");
}
export function mE(e) {
    return Qd(e) && "nativeEvent" in e && "preventDefault" in e && "stopPropagation" in e;
}
export function tH(e, t) {
    try {
        return e instanceof t;
    } catch  {
        return false;
    }
}
export function L2(e) {
    return !!(typeof e === "object" && e !== null && (e.__isVue || e._isVue || e.__v_isVNode));
}
export function ks(e) {
    return typeof Request !== "undefined" && tH(e, Request);
}
