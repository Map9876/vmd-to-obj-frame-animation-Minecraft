export let HTTPAccessErrorStatus = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
};
let n = new Set(Object.values(HTTPAccessErrorStatus));
export let HTTP_ERROR_FALLBACK_ERROR_CODE = "NEXT_HTTP_ERROR_FALLBACK";
export function isHTTPAccessFallbackError(e) {
    if (typeof e !== "object" || e === null || !("digest" in e) || typeof e.digest !== "string") {
        return false;
    }
    let [t, r] = e.digest.split(";");
    return t === HTTP_ERROR_FALLBACK_ERROR_CODE && n.has(Number(r));
}
export function getAccessFallbackHTTPStatus(e) {
    return Number(e.digest.split(";")[1]);
}
export function getAccessFallbackErrorTypeByStatus(e) {
    switch(e){
        case 401:
            return "unauthorized";
        case 403:
            return "forbidden";
        case 404:
            return "not-found";
        default:
            return;
    }
}
