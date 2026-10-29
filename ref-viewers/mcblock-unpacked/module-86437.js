import { RedirectStatusCode } from "./module-81099.js";
export let REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
export const RedirectType = {
    push: "push",
    replace: "replace"
};
export function isRedirectError(e) {
    if (typeof e !== "object" || e === null || !("digest" in e) || typeof e.digest !== "string") {
        return false;
    }
    let t = e.digest.split(";");
    let [r, o] = t;
    let i = t.slice(2, -2).join(";");
    let s = Number(t.at(-2));
    return r === REDIRECT_ERROR_CODE && (o === "replace" || o === "push") && typeof i === "string" && !isNaN(s) && s in RedirectStatusCode;
}
