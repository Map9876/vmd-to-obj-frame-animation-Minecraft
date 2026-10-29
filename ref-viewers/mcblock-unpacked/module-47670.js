import { urlQueryToSearchParams } from "./module-33078.js";
let a = /https?|ftp|gopher|file/;
export function formatUrl(e) {
    let { auth, hostname } = e;
    let o = e.protocol || "";
    let i = e.pathname || "";
    let s = e.hash || "";
    let l = e.query || "";
    let u = false;
    auth = auth ? `${encodeURIComponent(auth).replace(/%3A/i, ":")}@` : "";
    if (e.host) {
        u = auth + e.host;
    } else if (hostname) {
        u = auth + (~hostname.indexOf(":") ? `[${hostname}]` : hostname);
        if (e.port) {
            u += `:${e.port}`;
        }
    }
    if (l && typeof l === "object") {
        l = String(urlQueryToSearchParams(l));
    }
    let c = e.search || l && `?${l}` || "";
    if (o && !o.endsWith(":")) {
        o += ":";
    }
    if (e.slashes || (!o || a.test(o)) && u !== false) {
        u = `//${u || ""}`;
        if (i && i[0] !== "/") {
            i = `/${i}`;
        }
    } else if (!u) {
        u = "";
    }
    if (s && s[0] !== "#") {
        s = `#${s}`;
    }
    if (c && c[0] !== "?") {
        c = `?${c}`;
    }
    return `${o}${u}${i = i.replace(/[?#]/g, encodeURIComponent)}${c = c.replace("#", "%23")}${s}`;
}
export let urlObjectKeys = [
    "auth",
    "hash",
    "host",
    "hostname",
    "href",
    "path",
    "pathname",
    "port",
    "protocol",
    "query",
    "search",
    "slashes"
];
export function formatWithValidation(e) {
    return formatUrl(e);
}
