import { RedirectStatusCode } from "./module-81099.js";
import { REDIRECT_ERROR_CODE, RedirectType, isRedirectError } from "./module-86437.js";
let o;
export function getRedirectError(e, t, r = RedirectStatusCode.TemporaryRedirect) {
    let o = Object.defineProperty(Error(REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    o.digest = `${REDIRECT_ERROR_CODE};${t};${e};${r};`;
    return o;
}
export function redirect(e, t) {
    if (t == null) {
        t = o?.getStore()?.isAction ? RedirectType.push : RedirectType.replace;
    }
    throw getRedirectError(e, t, RedirectStatusCode.TemporaryRedirect);
}
export function permanentRedirect(e, t = RedirectType.replace) {
    throw getRedirectError(e, t, RedirectStatusCode.PermanentRedirect);
}
export function getURLFromRedirectError(e) {
    if (isRedirectError(e)) {
        return e.digest.split(";").slice(2, -2).join(";");
    }
    return null;
}
export function getRedirectTypeFromError(e) {
    if (!isRedirectError(e)) {
        throw Object.defineProperty(Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return e.digest.split(";", 2)[1];
}
export function getRedirectStatusCodeFromError(e) {
    if (!isRedirectError(e)) {
        throw Object.defineProperty(Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return Number(e.digest.split(";").at(-2));
}
