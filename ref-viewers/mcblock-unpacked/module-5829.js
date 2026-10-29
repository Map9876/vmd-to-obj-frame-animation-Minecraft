import { isHTTPAccessFallbackError } from "./module-37099.js";
import { isRedirectError } from "./module-86437.js";
export function isNextRouterError(e) {
    return isRedirectError(e) || isHTTPAccessFallbackError(e);
}
