export function isGroupSegment(e) {
    return e[0] === "(" && e.endsWith(")");
}
export function isParallelRouteSegment(e) {
    return e.startsWith("@") && e !== "@children";
}
export function addSearchParamsIfPageSegment(e, t) {
    if (e.includes(PAGE_SEGMENT_KEY)) {
        let e = JSON.stringify(t);
        if (e !== "{}") {
            return `${PAGE_SEGMENT_KEY}?${e}`;
        }
        return PAGE_SEGMENT_KEY;
    }
    return e;
}
export let PAGE_SEGMENT_KEY = "__PAGE__";
export let DEFAULT_SEGMENT_KEY = "__DEFAULT__";
