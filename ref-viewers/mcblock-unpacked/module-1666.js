"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("./module-28110.js");
let n = require("./module-53663.js");
let a = require("./module-1813.js");
n.appBootstrap(()=>{
    let { hydrate } = require("./module-49781.js");
    require("./module-17297.js");
    require("./module-9766.js").default;
    hydrate(a);
});
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
