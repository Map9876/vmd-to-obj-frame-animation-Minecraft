function t() {
    try {
        var r = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (e) {}
    return (t = function() {
        return !!r;
    }, t.__esModule = true, t.default = t)();
}
export { t as default };
t.default = t;
