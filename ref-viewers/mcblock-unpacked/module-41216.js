import n from "./module-27573.js";
import o from "./module-94089.js";
import a from "./module-7861.js";
import u from "./module-70355.js";
function s(t) {
    const r = typeof Map === "function" ? new Map : undefined;
    s = function(e) {
        if (e === null || !a(e)) {
            return e;
        }
        if (typeof e !== "function") {
            throw TypeError("Super expression must either be null or a function");
        }
        if (r !== undefined) {
            if (r.has(e)) {
                return r.get(e);
            }
            r.set(e, t);
        }
        function t() {
            return u(e, arguments, n(this).constructor);
        }
        t.prototype = Object.create(e.prototype, {
            constructor: {
                value: t,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return o(t, e);
    };
    s.default = s;
    return s(t);
}
export { s as default };
s.default = s;
