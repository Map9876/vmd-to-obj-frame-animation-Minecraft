import n from "./module-1150_2.js";
function a(e, t) {
    let a = {};
    if (typeof e === "function") {
        a.loader = e;
    }
    let l = {
        ...a,
        ...t
    };
    return n({
        ...l,
        modules: l.loadableGenerated?.modules
    });
}
export { a as default };
if ((typeof a === "function" || typeof a === "object" && a !== null) && a.__esModule === undefined) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
    a.default = a;
}
