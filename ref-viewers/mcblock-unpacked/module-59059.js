"use strict";
function n(e) {
    return function() {
        let { cookie } = e;
        if (!cookie) {
            return {};
        }
        let { parse } = require("./module-4300.js");
        return parse(Array.isArray(cookie) ? cookie.join("; ") : cookie);
    };
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCookieParser", {
    enumerable: true,
    get: function() {
        return n;
    }
});
