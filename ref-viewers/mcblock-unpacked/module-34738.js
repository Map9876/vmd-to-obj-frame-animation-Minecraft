import n from "./module-80413.js";
import { hasAdjacentParameterIssues, normalizeAdjacentParameters, stripParameterSeparators } from "./module-31693.js";
export function safePathToRegexp(e, t, r) {
    if (typeof e !== "string") {
        return n.pathToRegexp(e, t, r);
    }
    let o = hasAdjacentParameterIssues(e);
    let i = o ? normalizeAdjacentParameters(e) : e;
    try {
        return n.pathToRegexp(i, t, r);
    } catch (error) {
        if (!o) {
            try {
                let o = normalizeAdjacentParameters(e);
                return n.pathToRegexp(o, t, r);
            } catch (e) {}
        }
        throw error;
    }
}
export function safeCompile(e, t) {
    let r = hasAdjacentParameterIssues(e);
    let o = r ? normalizeAdjacentParameters(e) : e;
    try {
        return n.compile(o, t);
    } catch (error) {
        if (!r) {
            try {
                let r = normalizeAdjacentParameters(e);
                return n.compile(r, t);
            } catch (e) {}
        }
        throw error;
    }
}
export function safeRegexpToFunction(e, t) {
    let r = n.regexpToFunction(e, t || []);
    return (e)=>{
        let t = r(e);
        return !!t && {
            ...t,
            params: stripParameterSeparators(t.params)
        };
    };
}
export function safeRouteMatcher(e) {
    return (t)=>{
        let r = e(t);
        return !!r && stripParameterSeparators(r);
    };
}
