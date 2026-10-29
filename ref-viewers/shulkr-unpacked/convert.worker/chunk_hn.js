export function hn(e) {
    return typeof e == `object` && !!e && !Array.isArray(e);
}
export function gn(e) {
    if (hn(e) === false) {
        return false;
    }
    let e_constructor = e.constructor;
    if (e_constructor === undefined || typeof e_constructor != `function`) {
        return true;
    }
    let t_prototype = e_constructor.prototype;
    return !(hn(t_prototype) === false || Object.prototype.hasOwnProperty.call(t_prototype, `isPrototypeOf`) === false);
}
export function _n(e) {
    if (gn(e)) {
        return {
            ...e
        };
    }
    if (Array.isArray(e)) {
        return [
            ...e
        ];
    }
    if (e instanceof Map) {
        return new Map(e);
    }
    if (e instanceof Set) {
        return new Set(e);
    }
    return e;
}
