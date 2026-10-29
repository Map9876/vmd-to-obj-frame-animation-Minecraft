import n from "./module-93826.js";
export default function(e, t) {
    if (e) {
        if (typeof e === "string") {
            return n(e, t);
        }
        let r = Object.prototype.toString.call(e).slice(8, -1);
        if (r === "Object" && e.constructor) {
            r = e.constructor.name;
        }
        if (r === "Map" || r === "Set") {
            return Array.from(e);
        }
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) {
            return n(e, t);
        }
        return undefined;
    }
};
