export function _(e, t) {
    if (!Object.prototype.hasOwnProperty.call(e, t)) {
        throw TypeError("attempted to use private field on non-instance");
    }
    return e;
}
