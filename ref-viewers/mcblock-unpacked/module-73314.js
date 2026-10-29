import { T } from "./module-61571.js";
import { Hd } from "./module-60567.js";
import { Yz } from "./module-43275.js";
import { bJ, tH, vq, xH } from "./module-16649.js";
export function GS(e, t, r) {
    if (!(t in e)) {
        return;
    }
    let a = e[t];
    if (typeof a !== "function") {
        return;
    }
    let i = r(a);
    if (typeof i === "function") {
        pO(i, a);
    }
    try {
        e[t] = i;
    } catch  {
        if (T) {
            Yz.log(`Failed to replace method "${t}" in object`, e);
        }
    }
}
export function my(e, t, value) {
    try {
        Object.defineProperty(e, t, {
            value,
            writable: true,
            configurable: true
        });
    } catch  {
        if (T) {
            Yz.log(`Failed to add non-enumerable property "${t}" to object`, e);
        }
    }
}
export function pO(e, t) {
    try {
        let r = t.prototype || {};
        e.prototype = t.prototype = r;
        my(e, "__sentry_original__", t);
    } catch  {}
}
export function sp(e) {
    return e.__sentry_original__;
}
export function W4(e) {
    if (bJ(e)) {
        return {
            message: e.message,
            name: e.name,
            stack: e.stack,
            ...p(e)
        };
    }
    if (!xH(e)) {
        return e;
    }
    {
        let t = {
            type: e.type,
            target: d(e.target),
            currentTarget: d(e.currentTarget),
            ...p(e)
        };
        if (typeof CustomEvent !== "undefined" && tH(e, CustomEvent)) {
            t.detail = e.detail;
        }
        return t;
    }
}
function d(e) {
    try {
        if (vq(e)) {
            return Hd(e);
        }
        return Object.prototype.toString.call(e);
    } catch  {
        return "<unknown>";
    }
}
function p(e) {
    if (typeof e === "object" && e !== null) {
        return Object.fromEntries(Object.entries(e));
    }
    return {};
}
export function HF(e) {
    let t = Object.keys(W4(e));
    t.sort();
    if (t[0]) {
        return t.join(", ");
    }
    return "[object has no keys]";
}
