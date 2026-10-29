import n from "./module-92639.js";
export default function(e, t) {
    if (n(e) != "object" || !e) {
        return e;
    }
    const r = e[Symbol.toPrimitive];
    if (r !== undefined) {
        const o = r.call(e, t || "default");
        if (n(o) != "object") {
            return o;
        }
        throw TypeError("@@toPrimitive must return a primitive value.");
    }
    return (t === "string" ? String : Number)(e);
};
