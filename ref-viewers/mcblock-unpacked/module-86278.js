import a from "./module-1150.js";
function n(e, t) {
    let n = {};
    if (typeof e === "function") {
        n.loader = e;
    }
    let r = {
        ...n,
        ...t
    };
    return a({
        ...r,
        modules: r.loadableGenerated?.modules
    });
}
export { n as default };
if ((typeof n === "function" || typeof n === "object" && n !== null) && n.__esModule === undefined) {
    Object.defineProperty(n, "__esModule", {
        value: true
    });
    n.default = n;
}
