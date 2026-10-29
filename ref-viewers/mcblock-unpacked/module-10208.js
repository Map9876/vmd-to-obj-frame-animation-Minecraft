import n from "./module-80797.js";
export default function(e, t, r) {
    if ((t = n(t)) in e) {
        Object.defineProperty(e, t, {
            value: r,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        e[t] = r;
    }
    return e;
};
