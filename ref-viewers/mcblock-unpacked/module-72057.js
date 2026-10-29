import n from "./module-92639.js";
import o from "./module-56046.js";
export default function(e, t) {
    if (t && (n(t) == "object" || typeof t === "function")) {
        return t;
    }
    if (t !== undefined) {
        throw TypeError("Derived constructors may only return object or undefined");
    }
    return o(e);
};
