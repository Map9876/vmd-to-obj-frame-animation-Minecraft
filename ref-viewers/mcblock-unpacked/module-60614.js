import n from "./module-92639.js";
export default function(e) {
    if (e != null) {
        const t = e[typeof Symbol === "function" && Symbol.iterator || "@@iterator"];
        let r = 0;
        if (t) {
            return t.call(e);
        }
        if (typeof e.next === "function") {
            return e;
        }
        if (!isNaN(e.length)) {
            return {
                next: function() {
                    if (e && r >= e.length) {
                        e = undefined;
                    }
                    return {
                        value: e && e[r++],
                        done: !e
                    };
                }
            };
        }
    }
    throw TypeError(`${n(e)} is not iterable`);
};
