import { ACTION_HMR_REFRESH, ACTION_NAVIGATE, ACTION_PREFETCH, ACTION_REFRESH, ACTION_RESTORE, ACTION_SERVER_ACTION, ACTION_SERVER_PATCH } from "./module-86871.js";
import a from "./module-35737.js";
import { serverPatchReducer } from "./module-36798.js";
import { restoreReducer } from "./module-37854.js";
import { refreshReducer } from "./module-38719.js";
import { prefetchReducer } from "./module-43933.js";
import { hmrRefreshReducer } from "./module-65345.js";
import { serverActionReducer } from "./module-62244.js";
export let reducer = function(e, t) {
    switch(t.type){
        case ACTION_NAVIGATE:
            return a.navigateReducer(e, t);
        case ACTION_SERVER_PATCH:
            return serverPatchReducer(e, t);
        case ACTION_RESTORE:
            return restoreReducer(e, t);
        case ACTION_REFRESH:
            return refreshReducer(e, t);
        case ACTION_HMR_REFRESH:
            return hmrRefreshReducer(e, t);
        case ACTION_PREFETCH:
            return prefetchReducer(e, t);
        case ACTION_SERVER_ACTION:
            return serverActionReducer(e, t);
        default:
            throw Object.defineProperty(Error("Unknown action"), "__NEXT_ERROR_CODE", {
                value: "E295",
                enumerable: false,
                configurable: true
            });
    }
};
