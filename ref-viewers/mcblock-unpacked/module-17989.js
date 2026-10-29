"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClientSegmentRoot", {
    enumerable: true,
    get: function() {
        return AComponent;
    }
});
let n = require("./module-86897.js");
function AComponent({ Component, slots, params, promise }) {
    {
        let { createRenderParamsFromClient } = require("./module-307.js");
        let params_1 = createRenderParamsFromClient(params);
        return <Component {...slots} params={params_1}/>;
    }
}
require("./module-48302.js");
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
