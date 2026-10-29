import n from "./module-80413.js";
export function getPathMatch(e, t) {
    let r = [];
    let a = n.pathToRegexp(e, r, {
        delimiter: "/",
        sensitive: typeof t?.sensitive === "boolean" && t.sensitive,
        strict: t?.strict
    });
    let o = n.regexpToFunction(t?.regexModifier ? new RegExp(t.regexModifier(a.source), a.flags) : a, r);
    return (e, n)=>{
        if (typeof e !== "string") {
            return false;
        }
        let a = o(e);
        if (!a) {
            return false;
        }
        if (t?.removeUnnamedParams) {
            for (let e of r){
                if (typeof e.name === "number") {
                    delete a.params[e.name];
                }
            }
        }
        return {
            ...n,
            ...a.params
        };
    };
}
