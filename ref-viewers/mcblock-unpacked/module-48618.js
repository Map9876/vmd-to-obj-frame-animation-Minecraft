import n from "./module-94089.js";
export default function(e, t) {
    if (typeof t !== "function" && t !== null) {
        throw TypeError("Super expression must either be null or a function");
    }
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            writable: true,
            configurable: true
        }
    });
    Object.defineProperty(e, "prototype", {
        writable: false
    });
    if (t) {
        n(e, t);
    }
};
