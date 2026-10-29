import n from "./module-9961.js";
import o from "./module-75476.js";
import a from "./module-33584.js";
import u from "./module-88634.js";
import AsyncIterator from "./module-23410.js";
import keys from "./module-28264.js";
import values from "./module-60614.js";
function l() {
    "use strict";
    const t = o();
    const r = t.m(l);
    const constructor = (Object.getPrototypeOf ? Object.getPrototypeOf(r) : r.__proto__).constructor;
    function isGeneratorFunction(e) {
        const t = typeof e === "function" && e.constructor;
        return !!t && (t === constructor || (t.displayName || t.name) === "GeneratorFunction");
    }
    const d = {
        throw: 1,
        return: 2,
        break: 3,
        continue: 3
    };
    function v(e) {
        let t;
        let r;
        return function(n) {
            if (!t) {
                t = {
                    stop: function() {
                        return r(n.a, 2);
                    },
                    catch: function() {
                        return n.v;
                    },
                    abrupt: function(e, t) {
                        return r(n.a, d[e], t);
                    },
                    delegateYield: function(e, o, a) {
                        t.resultName = o;
                        return r(n.d, values(e), a);
                    },
                    finish: function(e) {
                        return r(n.f, e);
                    }
                };
                r = function(e, r, o) {
                    n.p = t.prev;
                    n.n = t.next;
                    try {
                        return e(r, o);
                    } finally{
                        t.next = n.n;
                    }
                };
            }
            if (t.resultName) {
                t[t.resultName] = n.v;
                t.resultName = undefined;
            }
            t.sent = n.v;
            t.next = n.n;
            try {
                return e.call(this, t);
            } finally{
                n.p = t.prev;
                n.n = t.next;
            }
        };
    }
    return (l = function() {
        return {
            wrap: function(e, r, n, o) {
                return t.w(v(e), r, n, o && o.reverse());
            },
            isGeneratorFunction,
            mark: t.m,
            awrap: function(e, t) {
                return new n(e, t);
            },
            AsyncIterator,
            async: function(e, t, r, n, o) {
                return (isGeneratorFunction(t) ? u : a)(v(e), t, r, n, o);
            },
            keys,
            values
        };
    }, l.__esModule = true, l.default = l)();
}
export { l as default };
l.default = l;
