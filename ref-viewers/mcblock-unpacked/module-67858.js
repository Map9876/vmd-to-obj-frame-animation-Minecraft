"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unstable_rethrow", {
    enumerable: true,
    get: function() {
        return function e(t) {
            if (a.isNextRouterError(t) || n.isBailoutToCSRError(t)) {
                throw t;
            }
            if (t instanceof Error && "cause" in t) {
                e(t.cause);
            }
        };
    }
});
let n = require("./module-24553.js");
let a = require("./module-5829.js");
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
