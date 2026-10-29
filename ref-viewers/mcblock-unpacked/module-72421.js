import { extractInterceptionRouteInformation, isInterceptionRouteAppPath } from "./module-57630.js";
let a = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/;
let o = /\/\[[^/]+\](?=\/|$)/;
export function isDynamicRoute(e, t) {
    if (t === undefined) {
        t = true;
    }
    if (isInterceptionRouteAppPath(e)) {
        e = extractInterceptionRouteInformation(e).interceptedRoute;
    }
    if (t) {
        return o.test(e);
    }
    return a.test(e);
}
