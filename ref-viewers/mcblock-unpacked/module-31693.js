let r = "_NEXTSEP_";
export function hasAdjacentParameterIssues(e) {
    return typeof e === "string" && !!(/\/\(\.{1,3}\):[^/\s]+/.test(e) || /:[a-zA-Z_][a-zA-Z0-9_]*:[a-zA-Z_][a-zA-Z0-9_]*/.test(e));
}
export function normalizeAdjacentParameters(e) {
    let t = e;
    return (t = t.replace(/(\([^)]*\)):([^/\s]+)/g, `$1${r}:$2`)).replace(/:([^:/\s)]+)(?=:)/g, `:$1${r}`);
}
export function normalizeTokensForRegexp(e) {
    return e.map((e)=>{
        if (typeof e === "object" && e !== null && "modifier" in e && (e.modifier === "*" || e.modifier === "+") && "prefix" in e && "suffix" in e && e.prefix === "" && e.suffix === "") {
            return {
                ...e,
                prefix: "/"
            };
        }
        return e;
    });
}
export function stripParameterSeparators(e) {
    let t = {};
    for (let [n, a] of Object.entries(e)){
        if (typeof a === "string") {
            t[n] = a.replace(RegExp(`^${r}`), "");
        } else if (Array.isArray(a)) {
            t[n] = a.map((e)=>{
                if (typeof e === "string") {
                    return e.replace(RegExp(`^${r}`), "");
                }
                return e;
            });
        } else {
            t[n] = a;
        }
    }
    return t;
}
