import { NEXT_INTERCEPTION_MARKER_PREFIX, NEXT_QUERY_PARAM_PREFIX } from "./module-16832.js";
import { INTERCEPTION_ROUTE_MARKERS } from "./module-57630.js";
import { escapeStringRegexp } from "./module-13314.js";
import { removeTrailingSlash } from "./module-77700.js";
import { PARAMETER_PATTERN, parseMatchedParameter } from "./module-25403.js";
function l(e, t, r) {
    let groups = {};
    let l = 1;
    let u = [];
    for (let c of removeTrailingSlash(e).slice(1).split("/")){
        let e = INTERCEPTION_ROUTE_MARKERS.find((e)=>c.startsWith(e));
        let i = c.match(PARAMETER_PATTERN);
        if (e && i && i[2]) {
            let { key, optional, repeat } = parseMatchedParameter(i[2]);
            groups[key] = {
                pos: l++,
                repeat,
                optional
            };
            u.push(`/${escapeStringRegexp(e)}([^/]+?)`);
        } else if (i && i[2]) {
            let { key, repeat, optional } = parseMatchedParameter(i[2]);
            groups[key] = {
                pos: l++,
                repeat,
                optional
            };
            if (r && i[1]) {
                u.push(`/${escapeStringRegexp(i[1])}`);
            }
            let c = repeat ? optional ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
            if (r && i[1]) {
                c = c.substring(1);
            }
            u.push(c);
        } else {
            u.push(`/${escapeStringRegexp(c)}`);
        }
        if (t && i && i[3]) {
            u.push(escapeStringRegexp(i[3]));
        }
    }
    return {
        parameterizedRoute: u.join(""),
        groups
    };
}
export function getRouteRegex(e, { includeSuffix = false, includePrefix = false, excludeOptionalTrailingSlash = false } = {}) {
    let { parameterizedRoute, groups } = l(e, includeSuffix, includePrefix);
    let s = parameterizedRoute;
    if (!excludeOptionalTrailingSlash) {
        s += "(?:/)?";
    }
    return {
        re: RegExp(`^${s}\$`),
        groups
    };
}
function c({ interceptionMarker, getSafeRouteKey, segment, routeKeys, keyPrefix, backreferenceDuplicateKeys }) {
    let t;
    let { key, optional, repeat } = parseMatchedParameter(segment);
    let p = key.replace(/\W/g, "");
    if (keyPrefix) {
        p = `${keyPrefix}${p}`;
    }
    let h = false;
    if (p.length === 0 || p.length > 30) {
        h = true;
    }
    if (!isNaN(parseInt(p.slice(0, 1)))) {
        h = true;
    }
    if (h) {
        p = getSafeRouteKey();
    }
    let _ = p in routeKeys;
    if (keyPrefix) {
        routeKeys[p] = `${keyPrefix}${key}`;
    } else {
        routeKeys[p] = key;
    }
    let m = interceptionMarker ? escapeStringRegexp(interceptionMarker) : "";
    t = _ && backreferenceDuplicateKeys ? `\\k<${p}>` : repeat ? `(?<${p}>.+?)` : `(?<${p}>[^/]+?)`;
    if (optional) {
        return `(?:/${m}${t})?`;
    }
    return `/${m}${t}`;
}
function f(e, t, r, l, backreferenceDuplicateKeys) {
    let f = 0;
    let getSafeRouteKey = ()=>{
        let e = "";
        let t = ++f;
        while(t > 0){
            e += String.fromCharCode(97 + (t - 1) % 26);
            t = Math.floor((t - 1) / 26);
        }
        return e;
    };
    let routeKeys = {};
    let h = [];
    for (let f of removeTrailingSlash(e).slice(1).split("/")){
        let e = INTERCEPTION_ROUTE_MARKERS.some((e)=>f.startsWith(e));
        let i = f.match(PARAMETER_PATTERN);
        if (e && i && i[2]) {
            h.push(c({
                getSafeRouteKey,
                interceptionMarker: i[1],
                segment: i[2],
                routeKeys,
                keyPrefix: t ? NEXT_INTERCEPTION_MARKER_PREFIX : undefined,
                backreferenceDuplicateKeys
            }));
        } else if (i && i[2]) {
            if (l && i[1]) {
                h.push(`/${escapeStringRegexp(i[1])}`);
            }
            let e = c({
                getSafeRouteKey,
                segment: i[2],
                routeKeys,
                keyPrefix: t ? NEXT_QUERY_PARAM_PREFIX : undefined,
                backreferenceDuplicateKeys
            });
            if (l && i[1]) {
                e = e.substring(1);
            }
            h.push(e);
        } else {
            h.push(`/${escapeStringRegexp(f)}`);
        }
        if (r && i && i[3]) {
            h.push(escapeStringRegexp(i[3]));
        }
    }
    return {
        namedParameterizedRoute: h.join(""),
        routeKeys
    };
}
export function getNamedRouteRegex(e, t) {
    let r;
    let n;
    let a;
    let o = f(e, t.prefixRouteKeys, (r = t.includeSuffix) != null && r, (n = t.includePrefix) != null && n, (a = t.backreferenceDuplicateKeys) != null && a);
    let o_namedParameterizedRoute = o.namedParameterizedRoute;
    if (!t.excludeOptionalTrailingSlash) {
        o_namedParameterizedRoute += "(?:/)?";
    }
    return {
        ...getRouteRegex(e, t),
        namedRegex: `^${o_namedParameterizedRoute}\$`,
        routeKeys: o.routeKeys
    };
}
export function getNamedMiddlewareRegex(e, t) {
    let { parameterizedRoute } = l(e, false, false);
    let { catchAll = true } = t;
    if (parameterizedRoute === "/") {
        return {
            namedRegex: `^/${catchAll ? ".*" : ""}\$`
        };
    }
    let { namedParameterizedRoute } = f(e, false, false, false, false);
    return {
        namedRegex: `^${namedParameterizedRoute}${catchAll ? "(?:(/.*)?)" : ""}\$`
    };
}
