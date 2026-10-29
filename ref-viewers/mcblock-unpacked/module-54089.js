export function isThenable(e) {
    return e !== null && typeof e === "object" && "then" in e && typeof e.then === "function";
}
