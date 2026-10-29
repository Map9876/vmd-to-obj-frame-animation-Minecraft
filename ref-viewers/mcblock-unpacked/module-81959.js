"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClientPageRoot", {
    enumerable: true,
    get: function() {
        return AComponent;
    }
});
let n = require("./module-86897.js");
function AComponent({ Component, searchParams, params, promises }) {
    {
        let { createRenderSearchParamsFromClient } = require("./module-35878.js");
        let searchParams_1 = createRenderSearchParamsFromClient(searchParams);
        let { createRenderParamsFromClient } = require("./module-307.js");
        let params_1 = createRenderParamsFromClient(params);
        return <Component params={params_1} searchParams={searchParams_1}/>;
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
