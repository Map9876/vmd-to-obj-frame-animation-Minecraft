"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "shouldHardNavigate", {
    enumerable: true,
    get: function() {
        return function e(t, [o, i]) {
            let [s, l] = t;
            if (a.matchSegment(s, o)) {
                return !(t.length <= 2) && e(n.getNextFlightSegmentPath(t), i[l]);
            }
            return !!Array.isArray(s);
        };
    }
});
let n = require("./module-16378.js");
let a = require("./module-7460.js");
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
