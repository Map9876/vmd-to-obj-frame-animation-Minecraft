"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return LComponent;
    }
});
let n = require("./module-28140.js");
let a = require("./module-86897.js");
require("./module-61426.js");
let o = n._(require("./module-77759.js"));
let i = require("./module-88785.js");
let s = require("./module-93913.js").isBot(window.navigator.userAgent);
function LComponent({ children, errorComponent, errorStyles, errorScripts }) {
    if (s) {
        return <o.default>{children}</o.default>;
    }
    return <i.ErrorBoundary errorComponent={errorComponent} errorStyles={errorStyles} errorScripts={errorScripts}>{children}</i.ErrorBoundary>;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
