export function getObjectClassLabel(e) {
    return Object.prototype.toString.call(e);
}
export function isPlainObject(e) {
    if (getObjectClassLabel(e) !== "[object Object]") {
        return false;
    }
    let t = Object.getPrototypeOf(e);
    return t === null || t.hasOwnProperty("isPrototypeOf");
}
