import n from "./module-59283.js";
import o from "./module-94089.js";
export default function(e, t, r) {
    if (n()) {
        return Reflect.construct.apply(null, arguments);
    }
    const a = [
        null
    ];
    a.push(...t);
    const u = new (e.bind(...a));
    if (r) {
        o(u, r.prototype);
    }
    return u;
};
