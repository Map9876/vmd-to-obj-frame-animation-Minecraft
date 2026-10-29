"use strict";
Object.defineProperty(exports, "isNavigatingToNewRootLayout", {
    enumerable: true,
    get: function() {
        return function e(t, r) {
            let n = t[0];
            let a = r[0];
            if (Array.isArray(n) && Array.isArray(a)) {
                if (n[0] !== a[0] || n[2] !== a[2]) {
                    return true;
                }
            } else if (n !== a) {
                return true;
            }
            if (t[4]) {
                return !r[4];
            }
            if (r[4]) {
                return true;
            }
            let o = Object.values(t[1])[0];
            let i = Object.values(r[1])[0];
            return !o || !i || e(o, i);
        };
    }
});
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
