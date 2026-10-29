function t(r, n) {
    t = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
        e.__proto__ = t;
        return e;
    };
    t.default = t;
    return t(r, n);
}
export { t as default };
t.default = t;
