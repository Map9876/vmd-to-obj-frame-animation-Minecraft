import n from "./module-62575.js";
function o() {
    let v_1;
    let r;
    const a = typeof Symbol === "function" ? Symbol : {};
    const u = a.iterator || "@@iterator";
    const s = a.toStringTag || "@@toStringTag";
    function w(e, o, a, u) {
        const s = Object.create((o && o.prototype instanceof l ? o : l).prototype);
        n(s, "_invoke", ((e, n, o)=>{
            let a;
            let u;
            let s;
            let i = 0;
            const l = o || [];
            let done = false;
            var p = {
                p: 0,
                n: 0,
                v: v_1,
                a: a_1,
                f: a_1.bind(v_1, 4),
                d: function(e, r) {
                    a = e;
                    u = 0;
                    s = v_1;
                    p.n = r;
                    return c;
                }
            };
            function a_1(e, n) {
                u = e;
                s = n;
                for(r = 0; !done && i && !o && r < l.length; r++){
                    var o;
                    const a = l[r];
                    const d = p.p;
                    const v = a[2];
                    if (e > 3) {
                        if (o = v === n) {
                            s = a[(u = a[4]) ? 5 : (u = 3, 3)];
                            a[4] = a[5] = v_1;
                        }
                    } else if (a[0] <= d) {
                        if (o = e < 2 && d < a[1]) {
                            u = 0;
                            p.v = n;
                            p.n = a[1];
                        } else if (d < v && (o = e < 3 || a[0] > n || n > v)) {
                            a[4] = e;
                            a[5] = n;
                            p.n = v;
                            u = 0;
                        }
                    }
                }
                if (o || e > 1) {
                    return c;
                }
                done = true;
                throw n;
            }
            return function(o, l, v) {
                if (i > 1) {
                    throw TypeError("Generator is already running");
                }
                if (done && l === 1) {
                    a_1(l, v);
                }
                u = l;
                for(s = v; (r = u < 2 ? v_1 : s) || !done;){
                    if (!a) {
                        if (u) {
                            if (u < 3) {
                                if (u > 1) {
                                    p.n = -1;
                                }
                                a_1(u, s);
                            } else {
                                p.n = s;
                            }
                        } else {
                            p.v = s;
                        }
                    }
                    try {
                        i = 2;
                        if (a) {
                            if (!u) {
                                o = "next";
                            }
                            if (r = a[o]) {
                                if (!(r = r.call(a, s))) {
                                    throw TypeError("iterator result is not an object");
                                }
                                if (!r.done) {
                                    return r;
                                }
                                s = r.value;
                                if (u < 2) {
                                    u = 0;
                                }
                            } else {
                                if (u === 1 && (r = a.return)) {
                                    r.call(a);
                                }
                                if (u < 2) {
                                    s = TypeError(`The iterator does not provide a '${o}' method`);
                                    u = 1;
                                }
                            }
                            a = v_1;
                        } else if ((r = (done = p.n < 0) ? s : e.call(n, p)) !== c) {
                            break;
                        }
                    } catch (error) {
                        a = v_1;
                        u = 1;
                        s = error;
                    } finally{
                        i = 1;
                    }
                }
                return {
                    value: r,
                    done
                };
            };
        })(e, a, u), true);
        return s;
    }
    var c = {};
    function l() {}
    function GeneratorFunction() {}
    function p() {}
    r = Object.getPrototypeOf;
    const d = p.prototype = l.prototype = Object.create([][u] ? r(r([][u]())) : (n(r = {}, u, function() {
        return this;
    }), r));
    function m(e) {
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(e, p);
        } else {
            e.__proto__ = p;
            n(e, s, "GeneratorFunction");
        }
        e.prototype = Object.create(d);
        return e;
    }
    GeneratorFunction.prototype = p;
    n(d, "constructor", p);
    n(p, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = "GeneratorFunction";
    n(p, s, "GeneratorFunction");
    n(d);
    n(d, s, "Generator");
    n(d, u, function() {
        return this;
    });
    n(d, "toString", function() {
        return "[object Generator]";
    });
    return (o = function() {
        return {
            w,
            m
        };
    }, o.__esModule = true, o.default = o)();
}
export { o as default };
o.default = o;
