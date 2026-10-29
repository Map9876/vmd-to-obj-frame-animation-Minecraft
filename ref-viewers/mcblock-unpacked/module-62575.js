function t(r, n, o, a) {
    let Object_defineProperty = Object.defineProperty;
    try {
        Object_defineProperty({}, "", {});
    } catch (e) {
        Object_defineProperty = 0;
    }
    t = function(e, r, n, o) {
        function a(r, n) {
            t(e, r, function(e) {
                return this._invoke(r, n, e);
            });
        }
        if (r) {
            if (Object_defineProperty) {
                Object_defineProperty(e, r, {
                    value: n,
                    enumerable: !o,
                    configurable: !o,
                    writable: !o
                });
            } else {
                e[r] = n;
            }
        } else {
            a("next", 0);
            a("throw", 1);
            a("return", 2);
        }
    };
    t.default = t;
    t(r, n, o, a);
}
export { t as default };
t.default = t;
