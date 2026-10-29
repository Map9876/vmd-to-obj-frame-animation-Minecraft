export { RedirectType } from "./module-86437.js";
export { forbidden } from "./module-71099.js";
export { notFound } from "./module-42542.js";
export { permanentRedirect } from "./module-86542.js";
export { redirect } from "./module-86542.js";
export { unauthorized } from "./module-6640.js";
export { unstable_rethrow } from "./module-3860.js";
class u extends Error {
    constructor(){
        super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams");
    }
}
export class ReadonlyURLSearchParams extends URLSearchParams {
    append() {
        throw new u;
    }
    delete() {
        throw new u;
    }
    set() {
        throw new u;
    }
    sort() {
        throw new u;
    }
}
export function unstable_isUnrecognizedActionError() {
    throw Object.defineProperty(Error("`unstable_isUnrecognizedActionError` can only be used on the client."), "__NEXT_ERROR_CODE", {
        value: "E776",
        enumerable: false,
        configurable: true
    });
}
