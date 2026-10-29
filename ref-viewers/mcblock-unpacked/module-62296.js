export let WEB_VITALS = [
    "CLS",
    "FCP",
    "FID",
    "INP",
    "LCP",
    "TTFB"
];
export function execOnce(e) {
    let t;
    let r = false;
    return function(...a) {
        if (!r) {
            r = true;
            t = e(...a);
        }
        return t;
    };
}
let a = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
export let isAbsoluteUrl = (e)=>a.test(e);
export function getLocationOrigin() {
    let { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? `:${port}` : ""}`;
}
export function getURL() {
    let { href } = window.location;
    let t = getLocationOrigin();
    return href.substring(t.length);
}
export function getDisplayName(e) {
    if (typeof e === "string") {
        return e;
    }
    return e.displayName || e.name || "Unknown";
}
export function isResSent(e) {
    return e.finished || e.headersSent;
}
export function normalizeRepeatedSlashes(e) {
    let t = e.split("?");
    return t[0].replace(/\\/g, "/").replace(/\/\/+/g, "/") + (t[1] ? `?${t.slice(1).join("?")}` : "");
}
export async function loadGetInitialProps(e, t) {
    let r = t.res || t.ctx && t.ctx.res;
    if (!e.getInitialProps) {
        if (t.ctx && t.Component) {
            return {
                pageProps: await loadGetInitialProps(t.Component, t.ctx)
            };
        }
        return {};
    }
    let n = await e.getInitialProps(t);
    if (r && isResSent(r)) {
        return n;
    }
    if (!n) {
        throw Object.defineProperty(Error(`"${getDisplayName(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    return n;
}
export let SP = typeof performance !== "undefined";
export let ST = SP && [
    "mark",
    "measure",
    "getEntriesByName"
].every((e)=>typeof performance[e] === "function");
export class DecodeError extends Error {
}
export class NormalizeError extends Error {
}
export class PageNotFoundError extends Error {
    constructor(e){
        super();
        this.code = "ENOENT";
        this.name = "PageNotFoundError";
        this.message = `Cannot find module for page: ${e}`;
    }
}
export class MissingStaticPage extends Error {
    constructor(e, t){
        super();
        this.message = `Failed to load static file for page: ${e} ${t}`;
    }
}
export class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = "ENOENT";
        this.message = "Cannot find the middleware module";
    }
}
export function stringifyError(e) {
    return JSON.stringify({
        message: e.message,
        stack: e.stack
    });
}
