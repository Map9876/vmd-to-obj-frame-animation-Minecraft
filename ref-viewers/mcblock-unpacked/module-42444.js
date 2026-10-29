import { isPlainObject } from "./module-16486.js";
function a(e) {
    return typeof e === "object" && e !== null && "name" in e && "message" in e;
}
export { a as default };
export function getProperError(e) {
    if (a(e)) {
        return e;
    }
    return Object.defineProperty(Error(isPlainObject(e) ? ((e)=>{
        let t = new WeakSet;
        return JSON.stringify(e, (e, r)=>{
            if (typeof r === "object" && r !== null) {
                if (t.has(r)) {
                    return "[Circular]";
                }
                t.add(r);
            }
            return r;
        });
    })(e) : `${e}`), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
}
