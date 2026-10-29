export function p(e) {
    if (!m(e)) {
        return false;
    }
    let e_constructor = e.constructor;
    if (e_constructor === undefined) {
        return true;
    }
    let t_prototype = e_constructor.prototype;
    return !(!m(t_prototype) || !t_prototype.hasOwnProperty(`isPrototypeOf`));
}
function m(e) {
    return Object.prototype.toString.call(e) === `[object Object]`;
}
