import { normalizeAppPath } from "./module-74061.js";
export let INTERCEPTION_ROUTE_MARKERS = [
    "(..)(..)",
    "(.)",
    "(..)",
    "(...)"
];
export function isInterceptionRouteAppPath(e) {
    return e.split("/").find((e)=>INTERCEPTION_ROUTE_MARKERS.find((t)=>e.startsWith(t))) !== undefined;
}
export function extractInterceptionRouteInformation(e) {
    let interceptingRoute;
    let r;
    let interceptedRoute;
    for (let n of e.split("/")){
        if (r = INTERCEPTION_ROUTE_MARKERS.find((e)=>n.startsWith(e))) {
            [interceptingRoute, interceptedRoute] = e.split(r, 2);
            break;
        }
    }
    if (!interceptingRoute || !r || !interceptedRoute) {
        throw Object.defineProperty(Error(`Invalid interception route: ${e}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", {
            value: "E269",
            enumerable: false,
            configurable: true
        });
    }
    interceptingRoute = normalizeAppPath(interceptingRoute);
    switch(r){
        case "(.)":
            interceptedRoute = interceptingRoute === "/" ? `/${interceptedRoute}` : `${interceptingRoute}/${interceptedRoute}`;
            break;
        case "(..)":
            if (interceptingRoute === "/") {
                throw Object.defineProperty(Error(`Invalid interception route: ${e}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", {
                    value: "E207",
                    enumerable: false,
                    configurable: true
                });
            }
            interceptedRoute = interceptingRoute.split("/").slice(0, -1).concat(interceptedRoute).join("/");
            break;
        case "(...)":
            interceptedRoute = `/${interceptedRoute}`;
            break;
        case "(..)(..)":
            let i = interceptingRoute.split("/");
            if (i.length <= 2) {
                throw Object.defineProperty(Error(`Invalid interception route: ${e}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", {
                    value: "E486",
                    enumerable: false,
                    configurable: true
                });
            }
            interceptedRoute = i.slice(0, -2).concat(interceptedRoute).join("/");
            break;
        default:
            throw Object.defineProperty(Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", {
                value: "E112",
                enumerable: false,
                configurable: true
            });
    }
    return {
        interceptingRoute,
        interceptedRoute
    };
}
