export function w(e) {
    if (!T(e)) {
        return false;
    }
    let e_constructor = e.constructor;
    if (e_constructor === undefined) {
        return true;
    }
    let t_prototype = e_constructor.prototype;
    return !(!T(t_prototype) || !t_prototype.hasOwnProperty(`isPrototypeOf`) || Object.getPrototypeOf(e) !== Object.prototype);
}
function T(e) {
    return Object.prototype.toString.call(e) === `[object Object]`;
}
