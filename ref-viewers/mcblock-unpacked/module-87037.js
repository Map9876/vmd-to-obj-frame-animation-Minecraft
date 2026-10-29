import { escapeStringRegexp } from "./module-13314.js";
import { parseUrl } from "./module-62032.js";
import { INTERCEPTION_ROUTE_MARKERS, isInterceptionRouteAppPath } from "./module-57630.js";
import i from "./module-59059.js";
import { safeCompile, safePathToRegexp } from "./module-34738.js";
function l(e) {
    return e.replace(/__ESC_COLON_/gi, ":");
}
export function matchHas(e, t, r = [], n = []) {
    let a = {};
    let o = (r)=>{
        let n;
        let r_key = r.key;
        switch(r.type){
            case "header":
                r_key = r_key.toLowerCase();
                n = e.headers[r_key];
                break;
            case "cookie":
                n = "cookies" in e ? e.cookies[r.key] : i.getCookieParser(e.headers)()[r.key];
                break;
            case "query":
                n = t[r_key];
                break;
            case "host":
                {
                    let { host } = e?.headers || {};
                    n = host == null ? undefined : host.split(":", 1)[0].toLowerCase();
                }
        }
        if (!r.value && n) {
            a[((r_key_1)=>{
                let t = "";
                for(let r = 0; r < r_key_1.length; r++){
                    let n = r_key_1.charCodeAt(r);
                    if (n > 64 && n < 91 || n > 96 && n < 123) {
                        t += r_key_1[r];
                    }
                }
                return t;
            })(r_key)] = n;
            return true;
        }
        if (n) {
            let e = RegExp(`^${r.value}\$`);
            let t = Array.isArray(n) ? n.slice(-1)[0].match(e) : n.match(e);
            if (t) {
                if (Array.isArray(t)) {
                    if (t.groups) {
                        Object.keys(t.groups).forEach((e)=>{
                            a[e] = t.groups[e];
                        });
                    } else if (r.type === "host" && t[0]) {
                        a.host = t[0];
                    }
                }
                return true;
            }
        }
        return false;
    };
    return !(!r.every((e)=>o(e)) || n.some((e)=>o(e))) && a;
}
export function compileNonPath(e, t) {
    if (!e.includes(":")) {
        return e;
    }
    for (let r of Object.keys(t)){
        if (e.includes(`:${r}`)) {
            e = e.replace(RegExp(`:${r}\\*`, "g"), `:${r}--ESCAPED_PARAM_ASTERISKS`).replace(RegExp(`:${r}\\?`, "g"), `:${r}--ESCAPED_PARAM_QUESTION`).replace(RegExp(`:${r}\\+`, "g"), `:${r}--ESCAPED_PARAM_PLUS`).replace(RegExp(`:${r}(?!\\w)`, "g"), `--ESCAPED_PARAM_COLON${r}`);
        }
    }
    e = e.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, "\\$1").replace(/--ESCAPED_PARAM_PLUS/g, "+").replace(/--ESCAPED_PARAM_COLON/g, ":").replace(/--ESCAPED_PARAM_QUESTION/g, "?").replace(/--ESCAPED_PARAM_ASTERISKS/g, "*");
    return safeCompile(`/${e}`, {
        validate: false
    })(t).slice(1);
}
export function parseDestination(e) {
    let e_destination = e.destination;
    for (let r of Object.keys({
        ...e.params,
        ...e.query
    })){
        if (r) {
            e_destination = e_destination.replace(RegExp(`:${escapeStringRegexp(r)}`, "g"), `__ESC_COLON_${r}`);
        }
    }
    let r = parseUrl(e_destination);
    let r_pathname = r.pathname;
    if (r_pathname) {
        r_pathname = l(r_pathname);
    }
    let r_href = r.href;
    if (r_href) {
        r_href = l(r_href);
    }
    let r_hostname = r.hostname;
    if (r_hostname) {
        r_hostname = l(r_hostname);
    }
    let r_hash = r.hash;
    if (r_hash) {
        r_hash = l(r_hash);
    }
    let r_search = r.search;
    if (r_search) {
        r_search = l(r_search);
    }
    return {
        ...r,
        pathname: r_pathname,
        hostname: r_hostname,
        href: r_href,
        hash: r_hash,
        search: r_search
    };
}
export function prepareDestination(e) {
    let t;
    let newUrl;
    let parsedDestination = parseDestination(e);
    let { hostname, query, search } = parsedDestination;
    let n_pathname = parsedDestination.pathname;
    if (parsedDestination.hash) {
        n_pathname = `${n_pathname}${parsedDestination.hash}`;
    }
    let p = [];
    let h = [];
    for (let e of (safePathToRegexp(n_pathname, h), h)){
        p.push(e.name);
    }
    if (hostname) {
        let e = [];
        for (let t of (safePathToRegexp(hostname, e), e)){
            p.push(t.name);
        }
    }
    let _ = safeCompile(n_pathname, {
        validate: false
    });
    for (let [r, n] of (hostname && (t = safeCompile(hostname, {
        validate: false
    })), Object.entries(query))){
        if (Array.isArray(n)) {
            query[r] = n.map((t)=>compileNonPath(l(t), e.params));
        } else if (typeof n === "string") {
            query[r] = compileNonPath(l(n), e.params);
        }
    }
    let m = Object.keys(e.params).filter((e)=>e !== "nextInternalLocale");
    if (e.appendParamsToQuery && !m.some((e)=>p.includes(e))) {
        for (let t of m){
            if (!(t in query)) {
                query[t] = e.params[t];
            }
        }
    }
    if (isInterceptionRouteAppPath(n_pathname)) {
        for (let t of n_pathname.split("/")){
            let r = INTERCEPTION_ROUTE_MARKERS.find((e)=>t.startsWith(e));
            if (r) {
                if (r === "(..)(..)") {
                    e.params[0] = "(..)";
                    e.params[1] = "(..)";
                } else {
                    e.params[0] = r;
                }
                break;
            }
        }
    }
    try {
        let [a, o] = (newUrl = _(e.params)).split("#", 2);
        if (t) {
            parsedDestination.hostname = t(e.params);
        }
        parsedDestination.pathname = a;
        parsedDestination.hash = (o ? "#" : "") + (o || "");
        parsedDestination.search = search ? compileNonPath(search, e.params) : "";
    } catch (error) {
        if (error.message.match(/Expected .*? to not repeat, but got an array/)) {
            throw Object.defineProperty(Error("To use a multi-match in the destination you must add `*` at the end of the param name to signify it should repeat. https://nextjs.org/docs/messages/invalid-multi-match"), "__NEXT_ERROR_CODE", {
                value: "E329",
                enumerable: false,
                configurable: true
            });
        }
        throw error;
    }
    parsedDestination.query = {
        ...e.query,
        ...parsedDestination.query
    };
    return {
        newUrl,
        destQuery: query,
        parsedDestination
    };
}
