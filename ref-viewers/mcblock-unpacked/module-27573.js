function t(r) {
    t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e);
    };
    t.default = t;
    return t(r);
}
export { t as default };
t.default = t;
