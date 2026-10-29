"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "hasInterceptionRouteInCurrentTree", {
    enumerable: true,
    get: function() {
        return function e([r, a]) {
            if (Array.isArray(r) && (r[2] === "di" || r[2] === "ci") || typeof r === "string" && n.isInterceptionRouteAppPath(r)) {
                return true;
            }
            if (a) {
                for(let t in a){
                    if (e(a[t])) {
                        return true;
                    }
                }
            }
            return false;
        };
    }
});
let n = require("./module-57630.js");
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
