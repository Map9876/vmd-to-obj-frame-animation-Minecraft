"use strict";
let n;
Object.defineProperty(exports, "__esModule", {
    value: true
});
((exports_1, t)=>{
    for(const r in t){
        Object.defineProperty(exports_1, r, {
            enumerable: true,
            get: t[r]
        });
    }
})(exports, {
    createKey: function() {
        return q;
    },
    default: function() {
        return K;
    },
    matchesMiddleware: function() {
        return L;
    }
});
let a = require("./module-28140.js");
let o = require("./module-49417.js");
let i = require("./module-77700.js");
let s = require("./module-24362.js");
let l = require("./module-41402.js");
let u = o._(require("./module-42444.js"));
let c = require("./module-22461.js");
let f = require("./module-61940.js");
let d = a._(require("./module-82025.js"));
let p = require("./module-62296.js");
let h = require("./module-72421.js");
let _ = require("./module-40579.js");
let m = require("./module-92385.js");
let g = require("./module-98156.js");
let y = require("./module-47670.js");
require("./module-75078.js");
let v = require("./module-5240.js");
let b = require("./module-79785.js");
let E = require("./module-8518.js");
let R = require("./module-51755.js");
let S = require("./module-96058.js");
let P = require("./module-92929.js");
let O = require("./module-20935.js");
let T = require("./module-42742.js");
let j = require("./module-76293.js");
let w = require("./module-52894.js");
let x = require("./module-19649.js");
let A = require("./module-58607.js");
let C = require("./module-93913.js");
let M = require("./module-13644.js");
let N = require("./module-2471.js");
let k = require("./module-84170.js");
let I = require("./module-16832.js");
function D() {
    return Object.assign(Object.defineProperty(Error("Route Cancelled"), "__NEXT_ERROR_CODE", {
        value: "E315",
        enumerable: false,
        configurable: true
    }), {
        cancelled: true
    });
}
async function L(e) {
    let t = await Promise.resolve(e.router.pageLoader.getMiddleware());
    if (!t) {
        return false;
    }
    let { pathname } = v.parsePath(e.asPath);
    let n = P.hasBasePath(pathname) ? R.removeBasePath(pathname) : pathname;
    let a = S.addBasePath(b.addLocale(n, e.locale));
    return t.some((e)=>new RegExp(e.regexp).test(a));
}
function U(e) {
    let t = p.getLocationOrigin();
    if (e.startsWith(t)) {
        return e.substring(t.length);
    }
    return e;
}
function H(e, t, r) {
    let [n, a] = O.resolveHref(e, t, true);
    let o = p.getLocationOrigin();
    let i = n.startsWith(o);
    let s = a && a.startsWith(o);
    n = U(n);
    a = a ? U(a) : a;
    let l = i ? n : S.addBasePath(n);
    let u = r ? U(O.resolveHref(e, r)) : a || n;
    return {
        url: l,
        as: s ? u : S.addBasePath(u)
    };
}
function F(e, t) {
    let r = i.removeTrailingSlash(c.denormalizePagePath(e));
    if (r === "/404" || r === "/_error") {
        return e;
    }
    if (!t.includes(r)) {
        t.some((t)=>{
            if (h.isDynamicRoute(t) && g.getRouteRegex(t).re.test(r)) {
                e = t;
                return true;
            }
        });
    }
    return i.removeTrailingSlash(e);
}
async function $(e) {
    if (!await L(e) || !e.fetchData) {
        return null;
    }
    let t = await e.fetchData();
    let effect = await ((e, t, r)=>{
        let nextConfig = {
            basePath: r.router.basePath,
            i18n: {
                locales: r.router.locales
            },
            trailingSlash: false
        };
        let o = t.headers.get("x-nextjs-rewrite");
        let l = o || t.headers.get("x-nextjs-matched-path");
        let u = t.headers.get(I.MATCHED_PATH_HEADER);
        if (!(!u || l || u.includes("__next_data_catchall") || u.includes("/_error") || u.includes("/404"))) {
            l = u;
        }
        if (l) {
            if (l.startsWith("/")) {
                let parsedAs = _.parseRelativeUrl(l);
                let u = j.getNextPathnameInfo(parsedAs.pathname, {
                    nextConfig,
                    parseData: true
                });
                let c = i.removeTrailingSlash(u.pathname);
                return Promise.all([
                    r.router.pageLoader.getPageList(),
                    s.getClientBuildManifest()
                ]).then(([i, { __rewrites }])=>{
                    let l = b.addLocale(u.pathname, u.locale);
                    if (h.isDynamicRoute(l) || !o && i.includes(f.normalizeLocalePath(R.removeBasePath(l), r.router.locales).pathname)) {
                        let r = j.getNextPathnameInfo(_.parseRelativeUrl(e).pathname, {
                            nextConfig: undefined,
                            parseData: true
                        });
                        parsedAs.pathname = l = S.addBasePath(r.pathname);
                    }
                    {
                        let e = n(l, i, __rewrites, parsedAs.query, (e)=>F(e, i), r.router.locales);
                        if (e.matchedPage) {
                            parsedAs.pathname = e.parsedAs.pathname;
                            l = parsedAs.pathname;
                            Object.assign(parsedAs.query, e.parsedAs.query);
                        }
                    }
                    let resolvedHref = i.includes(c) ? c : F(f.normalizeLocalePath(R.removeBasePath(parsedAs.pathname), r.router.locales).pathname, i);
                    if (h.isDynamicRoute(resolvedHref)) {
                        let e = m.getRouteMatcher(g.getRouteRegex(resolvedHref))(l);
                        Object.assign(parsedAs.query, e || {});
                    }
                    return {
                        type: "rewrite",
                        parsedAs,
                        resolvedHref
                    };
                });
            }
            let t = v.parsePath(e);
            return Promise.resolve({
                type: "redirect-external",
                destination: `${w.formatNextPathnameInfo({
                    ...j.getNextPathnameInfo(t.pathname, {
                        nextConfig,
                        parseData: true
                    }),
                    defaultLocale: r.router.defaultLocale,
                    buildId: ""
                })}${t.query}${t.hash}`
            });
        }
        let destination = t.headers.get("x-nextjs-redirect");
        if (destination) {
            if (destination.startsWith("/")) {
                let e = v.parsePath(destination);
                let t = w.formatNextPathnameInfo({
                    ...j.getNextPathnameInfo(e.pathname, {
                        nextConfig,
                        parseData: true
                    }),
                    defaultLocale: r.router.defaultLocale,
                    buildId: ""
                });
                return Promise.resolve({
                    type: "redirect-internal",
                    newAs: `${t}${e.query}${e.hash}`,
                    newUrl: `${t}${e.query}${e.hash}`
                });
            }
            return Promise.resolve({
                type: "redirect-external",
                destination
            });
        }
        return Promise.resolve({
            type: "next"
        });
    })(t.dataHref, t.response, e);
    return {
        dataHref: t.dataHref,
        json: t.json,
        response: t.response,
        text: t.text,
        cacheKey: t.cacheKey,
        effect
    };
}
n = require("./module-7511.js").A;
let notFound = Symbol("SSG_DATA_NOT_FOUND");
function z(text) {
    try {
        return JSON.parse(text);
    } catch (e) {
        return null;
    }
}
function Y({ dataHref, inflightCache, isPrefetch, hasMiddleware, isServerRender, parseJSON, persistCache, isBackground, unstable_skipClientCache }) {
    let { href } = new URL(dataHref, window.location.href);
    let d = (e)=>(function e(dataHref_1, r, n) {
            return fetch(dataHref_1, {
                credentials: "same-origin",
                method: n.method || "GET",
                headers: {
                    ...n.headers,
                    "x-nextjs-data": "1"
                }
            }).then((a)=>{
                if (!a.ok && r > 1 && a.status >= 500) {
                    return e(dataHref_1, r - 1, n);
                }
                return a;
            });
        })(dataHref, isServerRender ? 3 : 1, {
            headers: {
                ...isPrefetch ? {
                    purpose: "prefetch"
                } : {},
                ...isPrefetch && hasMiddleware ? {
                    "x-middleware-prefetch": "1"
                } : {}
            },
            method: e?.method ?? "GET"
        }).then((response)=>{
            if (response.ok && e?.method === "HEAD") {
                return {
                    dataHref,
                    response,
                    text: "",
                    json: {},
                    cacheKey: href
                };
            }
            return response.text().then((text)=>{
                if (!response.ok) {
                    if (hasMiddleware && [
                        301,
                        302,
                        307,
                        308
                    ].includes(response.status)) {
                        return {
                            dataHref,
                            response,
                            text,
                            json: {},
                            cacheKey: href
                        };
                    }
                    if (response.status === 404) {
                        if (z(text)?.notFound) {
                            return {
                                dataHref,
                                json: {
                                    notFound
                                },
                                response,
                                text,
                                cacheKey: href
                            };
                        }
                    }
                    let i = Object.defineProperty(Error("Failed to load static props"), "__NEXT_ERROR_CODE", {
                        value: "E124",
                        enumerable: false,
                        configurable: true
                    });
                    if (!isServerRender) {
                        s.markAssetError(i);
                    }
                    throw i;
                }
                return {
                    dataHref,
                    json: parseJSON ? z(text) : null,
                    response,
                    text,
                    cacheKey: href
                };
            });
        }).then((e)=>{
            if (!(persistCache && e.response.headers.get("x-middleware-cache") !== "no-cache")) {
                delete inflightCache[href];
            }
            return e;
        }).catch((e)=>{
            if (!unstable_skipClientCache) {
                delete inflightCache[href];
            }
            if (e.message === "Failed to fetch" || e.message === "NetworkError when attempting to fetch resource." || e.message === "Load failed") {
                s.markAssetError(e);
            }
            throw e;
        });
    if (unstable_skipClientCache && persistCache) {
        return d({}).then((e)=>{
            if (e.response.headers.get("x-middleware-cache") !== "no-cache") {
                inflightCache[href] = Promise.resolve(e);
            }
            return e;
        });
    }
    if (inflightCache[href] !== undefined) {
        return inflightCache[href];
    }
    return inflightCache[href] = d(isBackground ? {
        method: "HEAD"
    } : {});
}
function q() {
    return Math.random().toString(36).slice(2, 10);
}
function W({ url, router }) {
    if (url === S.addBasePath(b.addLocale(router.asPath, router.locale))) {
        throw Object.defineProperty(Error(`Invariant: attempted to hard navigate to the same URL ${url} ${location.href}`), "__NEXT_ERROR_CODE", {
            value: "E282",
            enumerable: false,
            configurable: true
        });
    }
    window.location.href = url;
}
let X = ({ route, router })=>{
    let n = false;
    let a = router.clc = ()=>{
        n = true;
    };
    return ()=>{
        if (n) {
            let e = Object.defineProperty(Error(`Abort fetching component for route: "${route}"`), "__NEXT_ERROR_CODE", {
                value: "E483",
                enumerable: false,
                configurable: true
            });
            e.cancelled = true;
            throw e;
        }
        if (a === router.clc) {
            router.clc = null;
        }
    };
};
class K {
    reload() {
        window.location.reload();
    }
    back() {
        window.history.back();
    }
    forward() {
        window.history.forward();
    }
    push(e, t, r = {}) {
        ({ url: e, as: t } = H(this, e, t));
        return this.change("pushState", e, t, r);
    }
    replace(e, t, r = {}) {
        ({ url: e, as: t } = H(this, e, t));
        return this.change("replaceState", e, t, r);
    }
    async _bfl(e, as_1, n, a) {
        {
            if (!this._bfl_s && !this._bfl_d) {
                let t;
                let o;
                let { BloomFilter } = require("./module-71727.js");
                try {
                    ({ __routerFilterStatic: t, __routerFilterDynamic: o } = await s.getClientBuildManifest());
                } catch (error) {
                    console.error(error);
                    if (a) {
                        return true;
                    }
                    W({
                        url: S.addBasePath(b.addLocale(e, n || this.locale, this.defaultLocale)),
                        router: this
                    });
                    return new Promise(()=>{});
                }
                if (t?.numHashes) {
                    this._bfl_s = new BloomFilter(t.numItems, t.errorRate);
                    this._bfl_s.import(t);
                }
                if (o?.numHashes) {
                    this._bfl_d = new BloomFilter(o.numItems, o.errorRate);
                    this._bfl_d.import(o);
                }
            }
            let c = false;
            let f = false;
            for (let { as, allowMatchCurrent } of [
                {
                    as: e
                },
                {
                    as: as_1
                }
            ]){
                if (as) {
                    let t = i.removeTrailingSlash(new URL(as, "http://n").pathname);
                    let d = S.addBasePath(b.addLocale(t, n || this.locale));
                    if (allowMatchCurrent || t !== i.removeTrailingSlash(new URL(this.asPath, "http://n").pathname)) {
                        for (let e of (c = c || !!this._bfl_s?.contains(t) || !!this._bfl_s?.contains(d), [
                            t,
                            d
                        ])){
                            let t = e.split("/");
                            for(let e = 0; !f && e < t.length + 1; e++){
                                let r = t.slice(0, e).join("/");
                                if (r && this._bfl_d?.contains(r)) {
                                    f = true;
                                    break;
                                }
                            }
                        }
                        if (c || f) {
                            if (a) {
                                return true;
                            }
                            W({
                                url: S.addBasePath(b.addLocale(e, n || this.locale, this.defaultLocale)),
                                router: this
                            });
                            return new Promise(()=>{});
                        }
                    }
                }
            }
        }
        return false;
    }
    async change(e, t, r, a, o) {
        let I;
        let U;
        if (!A.isLocalURL(t)) {
            W({
                url: t,
                router: this
            });
            return false;
        }
        let $ = a._h === 1;
        if (!($ || a.shallow)) {
            await this._bfl(r, undefined, a.locale);
        }
        let z = $ || a._shouldResolveHref || v.parsePath(t).pathname === v.parsePath(r).pathname;
        let Y = {
            ...this.state
        };
        let q = this.isReady !== true;
        this.isReady = true;
        let isSsr = this.isSsr;
        if (!$) {
            this.isSsr = false;
        }
        if ($ && this.clc) {
            return false;
        }
        let Y_locale = Y.locale;
        if (p.ST) {
            performance.mark("routeChange");
        }
        let { shallow = false, scroll = true } = a;
        let routeProps = {
            shallow
        };
        if (this._inFlightRoute && this.clc) {
            if (!isSsr) {
                K.events.emit("routeChangeError", D(), this._inFlightRoute, routeProps);
            }
            this.clc();
            this.clc = null;
        }
        r = S.addBasePath(b.addLocale(P.hasBasePath(r) ? R.removeBasePath(r) : r, a.locale, this.defaultLocale));
        let Z = E.removeLocale(P.hasBasePath(r) ? R.removeBasePath(r) : r, Y.locale);
        this._inFlightRoute = r;
        let ee = Y_locale !== Y.locale;
        if (!$ && this.onlyAHashChange(Z) && !ee) {
            Y.asPath = Z;
            K.events.emit("hashChangeStart", r, routeProps);
            this.changeState(e, t, r, {
                ...a,
                scroll: false
            });
            if (scroll) {
                this.scrollToHash(Z);
            }
            try {
                await this.set(Y, this.components[Y.route], null);
            } catch (error) {
                if (u.default(error) && error.cancelled) {
                    K.events.emit("routeChangeError", error, Z, routeProps);
                }
                throw error;
            }
            K.events.emit("hashChangeComplete", r, routeProps);
            return true;
        }
        let et = _.parseRelativeUrl(t);
        let { pathname, query } = et;
        try {
            [I, { __rewrites: U }] = await Promise.all([
                this.pageLoader.getPageList(),
                s.getClientBuildManifest(),
                this.pageLoader.getMiddleware()
            ]);
        } catch (e) {
            W({
                url: r,
                router: this
            });
            return false;
        }
        if (!(this.urlIsNew(Z) || ee)) {
            e = "replaceState";
        }
        let resolvedAs = r;
        pathname = pathname ? i.removeTrailingSlash(R.removeBasePath(pathname)) : pathname;
        let eo = i.removeTrailingSlash(pathname);
        let ei = r.startsWith("/") && _.parseRelativeUrl(r).pathname;
        if (this.components[pathname]?.__appRouter) {
            W({
                url: r,
                router: this
            });
            return new Promise(()=>{});
        }
        let isMiddlewareRewrite = !!(ei && eo !== ei && (!h.isDynamicRoute(eo) || !m.getRouteMatcher(g.getRouteRegex(eo))(ei)));
        let hasMiddleware = !a.shallow && await L({
            asPath: r,
            locale: Y.locale,
            router: this
        });
        if ($ && hasMiddleware) {
            z = false;
        }
        if (z && pathname !== "/_error") {
            a._shouldResolveHref = true;
            if (r.startsWith("/")) {
                let e = n(S.addBasePath(b.addLocale(Z, Y.locale), true), I, U, query, (e)=>F(e, I), this.locales);
                if (e.externalDest) {
                    W({
                        url: r,
                        router: this
                    });
                    return true;
                }
                if (!hasMiddleware) {
                    resolvedAs = e.asPath;
                }
                if (e.matchedPage && e.resolvedHref) {
                    pathname = e.resolvedHref;
                    et.pathname = S.addBasePath(pathname);
                    if (!hasMiddleware) {
                        t = y.formatWithValidation(et);
                    }
                }
            } else {
                et.pathname = F(pathname, I);
                if (et.pathname !== pathname) {
                    pathname = et.pathname;
                    et.pathname = S.addBasePath(pathname);
                    if (!hasMiddleware) {
                        t = y.formatWithValidation(et);
                    }
                }
            }
        }
        if (!A.isLocalURL(r)) {
            W({
                url: r,
                router: this
            });
            return false;
        }
        resolvedAs = E.removeLocale(R.removeBasePath(resolvedAs), Y.locale);
        eo = i.removeTrailingSlash(pathname);
        let eu = false;
        if (h.isDynamicRoute(eo)) {
            let e = _.parseRelativeUrl(resolvedAs);
            let n = e.pathname;
            let a = g.getRouteRegex(eo);
            eu = m.getRouteMatcher(a)(n);
            let o = eo === n;
            let i = o ? N.interpolateAs(eo, n, query) : {};
            if (eu && (!o || i.result)) {
                if (o) {
                    r = y.formatWithValidation({
                        ...e,
                        pathname: i.result,
                        query: M.omit(query, i.params)
                    });
                } else {
                    Object.assign(query, eu);
                }
            } else {
                let e = Object.keys(a.groups).filter((e)=>!query[e] && !a.groups[e].optional);
                if (e.length > 0 && !hasMiddleware) {
                    throw Object.defineProperty(Error(`${o ? `The provided \`href\` (${t}) value is missing query values (${e.join(", ")}) to be interpolated properly. ` : `The provided \`as\` value (${n}) is incompatible with the \`href\` value (${eo}). `}Read more: https://nextjs.org/docs/messages/${o ? "href-interpolation-failed" : "incompatible-href-as"}`), "__NEXT_ERROR_CODE", {
                        value: "E344",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
        if (!$) {
            K.events.emit("routeChangeStart", r, routeProps);
        }
        let ec = this.pathname === "/404" || this.pathname === "/_error";
        try {
            let n = await this.getRouteInfo({
                route: eo,
                pathname,
                query,
                as: r,
                resolvedAs,
                routeProps,
                locale: Y.locale,
                isPreview: Y.isPreview,
                hasMiddleware,
                unstable_skipClientCache: a.unstable_skipClientCache,
                isQueryUpdating: $ && !this.isFallback,
                isMiddlewareRewrite
            });
            if (!($ || a.shallow)) {
                await this._bfl(r, "resolvedAs" in n ? n.resolvedAs : undefined, Y.locale);
            }
            if ("route" in n && hasMiddleware) {
                eo = pathname = n.route || eo;
                if (!routeProps.shallow) {
                    query = {
                        ...n.query || {},
                        ...query
                    };
                }
                let e = P.hasBasePath(et.pathname) ? R.removeBasePath(et.pathname) : et.pathname;
                if (eu && pathname !== e) {
                    Object.keys(eu).forEach((e)=>{
                        if (eu && query[e] === eu[e]) {
                            delete query[e];
                        }
                    });
                }
                if (h.isDynamicRoute(pathname)) {
                    let e = !routeProps.shallow && n.resolvedAs ? n.resolvedAs : S.addBasePath(b.addLocale(new URL(r, location.href).pathname, Y.locale), true);
                    if (P.hasBasePath(e)) {
                        e = R.removeBasePath(e);
                    }
                    let t = g.getRouteRegex(pathname);
                    let a = m.getRouteMatcher(t)(new URL(e, location.href).pathname);
                    if (a) {
                        Object.assign(query, a);
                    }
                }
            }
            if ("type" in n) {
                if (n.type === "redirect-internal") {
                    return this.change(e, n.newUrl, n.newAs, a);
                } else {
                    W({
                        url: n.destination,
                        router: this
                    });
                    return new Promise(()=>{});
                }
            }
            let i = n.Component;
            if (i && i.unstable_scriptLoader) {
                [].concat(i.unstable_scriptLoader()).forEach((e)=>{
                    l.handleClientScriptLoad(e.props);
                });
            }
            if ((n.__N_SSG || n.__N_SSP) && n.props) {
                if (n.props.pageProps && n.props.pageProps.__N_REDIRECT) {
                    a.locale = false;
                    let t = n.props.pageProps.__N_REDIRECT;
                    if (t.startsWith("/") && n.props.pageProps.__N_REDIRECT_BASE_PATH !== false) {
                        let r = _.parseRelativeUrl(t);
                        r.pathname = F(r.pathname, I);
                        let { url, as } = H(this, t, t);
                        return this.change(e, url, as, a);
                    }
                    W({
                        url: t,
                        router: this
                    });
                    return new Promise(()=>{});
                }
                Y.isPreview = !!n.props.__N_PREVIEW;
                if (n.props.notFound === notFound) {
                    let e;
                    try {
                        await this.fetchComponent("/404");
                        e = "/404";
                    } catch (t) {
                        e = "/_error";
                    }
                    n = await this.getRouteInfo({
                        route: e,
                        pathname: e,
                        query,
                        as: r,
                        resolvedAs,
                        routeProps: {
                            shallow: false
                        },
                        locale: Y.locale,
                        isPreview: Y.isPreview,
                        isNotFound: true
                    });
                    if ("type" in n) {
                        throw Object.defineProperty(Error("Unexpected middleware effect on /404"), "__NEXT_ERROR_CODE", {
                            value: "E158",
                            enumerable: false,
                            configurable: true
                        });
                    }
                }
            }
            if ($ && this.pathname === "/_error" && self.__NEXT_DATA__.props?.pageProps?.statusCode === 500 && n.props?.pageProps) {
                n.props.pageProps.statusCode = 500;
            }
            let s = a.shallow && Y.route === (n.route ?? eo);
            let c = a.scroll ?? (!$ && !s);
            let p = o ?? (c ? {
                x: 0,
                y: 0
            } : null);
            let y = {
                ...Y,
                route: eo,
                pathname,
                query,
                asPath: Z,
                isFallback: false
            };
            if ($ && ec) {
                n = await this.getRouteInfo({
                    route: this.pathname,
                    pathname: this.pathname,
                    query,
                    as: r,
                    resolvedAs,
                    routeProps: {
                        shallow: false
                    },
                    locale: Y.locale,
                    isPreview: Y.isPreview,
                    isQueryUpdating: $ && !this.isFallback
                });
                if ("type" in n) {
                    throw Object.defineProperty(Error(`Unexpected middleware effect on ${this.pathname}`), "__NEXT_ERROR_CODE", {
                        value: "E225",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (this.pathname === "/_error" && self.__NEXT_DATA__.props?.pageProps?.statusCode === 500 && n.props?.pageProps) {
                    n.props.pageProps.statusCode = 500;
                }
                try {
                    await this.set(y, n, p);
                } catch (error) {
                    if (u.default(error) && error.cancelled) {
                        K.events.emit("routeChangeError", error, Z, routeProps);
                    }
                    throw error;
                }
                return true;
            }
            K.events.emit("beforeHistoryChange", r, routeProps);
            this.changeState(e, t, r, a);
            if (!($ && !p && !q && !ee && x.compareRouterStates(y, this.state))) {
                try {
                    await this.set(y, n, p);
                } catch (error) {
                    if (error.cancelled) {
                        n.error = n.error || error;
                    } else {
                        throw error;
                    }
                }
                if (n.error) {
                    if (!$) {
                        K.events.emit("routeChangeError", n.error, Z, routeProps);
                    }
                    throw n.error;
                }
                if (!$) {
                    K.events.emit("routeChangeComplete", r, routeProps);
                }
                if (c && /#.+$/.test(r)) {
                    this.scrollToHash(r);
                }
            }
            return true;
        } catch (error) {
            if (u.default(error) && error.cancelled) {
                return false;
            }
            throw error;
        }
    }
    changeState(e, t, r, options = {}) {
        if (e !== "pushState" || p.getURL() !== r) {
            this._shallow = options.shallow;
            window.history[e]({
                url: t,
                as: r,
                options,
                __N: true,
                key: this._key = e !== "pushState" ? this._key : q()
            }, "", r);
        }
    }
    async handleRouteInfoError(e, t, query, n, a, o) {
        if (e.cancelled) {
            throw e;
        }
        if (s.isAssetError(e) || o) {
            K.events.emit("routeChangeError", e, n, a);
            W({
                url: n,
                router: this
            });
            throw D();
        }
        console.error(e);
        try {
            let props;
            let { page, styleSheets } = await this.fetchComponent("/_error");
            let i = {
                props,
                Component: page,
                styleSheets,
                err: e,
                error: e
            };
            if (!i.props) {
                try {
                    i.props = await this.getInitialProps(page, {
                        err: e,
                        pathname: t,
                        query
                    });
                } catch (error) {
                    console.error("Error in error page `getInitialProps`: ", error);
                    i.props = {};
                }
            }
            return i;
        } catch (error) {
            return this.handleRouteInfoError(u.default(error) ? error : Object.defineProperty(Error(`${error}`), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            }), t, query, n, a, true);
        }
    }
    async getRouteInfo({ route, pathname, query, as, resolvedAs, routeProps, locale, hasMiddleware, isPreview, unstable_skipClientCache, isQueryUpdating, isMiddlewareRewrite, isNotFound }) {
        let g = route;
        try {
            let e = this.components[g];
            if (routeProps.shallow && e && this.route === g) {
                return e;
            }
            let t = X({
                route: g,
                router: this
            });
            if (hasMiddleware) {
                e = undefined;
            }
            let u = !e || "initial" in e ? undefined : e;
            let P = {
                dataHref: this.pageLoader.getDataHref({
                    href: y.formatWithValidation({
                        pathname,
                        query
                    }),
                    skipInterpolation: true,
                    asPath: isNotFound ? "/404" : resolvedAs,
                    locale
                }),
                hasMiddleware: true,
                isServerRender: this.isSsr,
                parseJSON: true,
                inflightCache: isQueryUpdating ? this.sbc : this.sdc,
                persistCache: !isPreview,
                isPrefetch: false,
                unstable_skipClientCache,
                isBackground: isQueryUpdating
            };
            let O = isQueryUpdating && !isMiddlewareRewrite ? null : await $({
                fetchData: ()=>Y(P),
                asPath: isNotFound ? "/404" : resolvedAs,
                locale,
                router: this
            }).catch((e)=>{
                if (isQueryUpdating) {
                    return null;
                }
                throw e;
            });
            if (O && (pathname === "/_error" || pathname === "/404")) {
                O.effect = undefined;
            }
            if (isQueryUpdating) {
                if (O) {
                    O.json = self.__NEXT_DATA__.props;
                } else {
                    O = {
                        json: self.__NEXT_DATA__.props
                    };
                }
            }
            t();
            if (O?.effect?.type === "redirect-internal" || O?.effect?.type === "redirect-external") {
                return O.effect;
            }
            if (O?.effect?.type === "rewrite") {
                let t = i.removeTrailingSlash(O.effect.resolvedHref);
                let a = await this.pageLoader.getPageList();
                if ((!isQueryUpdating || a.includes(t)) && (g = t, pathname = O.effect.resolvedHref, query = {
                    ...query,
                    ...O.effect.parsedAs.query
                }, resolvedAs = R.removeBasePath(f.normalizeLocalePath(O.effect.parsedAs.pathname, this.locales).pathname), e = this.components[g], routeProps.shallow && e && this.route === g && !hasMiddleware)) {
                    return {
                        ...e,
                        route: g
                    };
                }
            }
            if (T.isAPIRoute(g)) {
                W({
                    url: as,
                    router: this
                });
                return new Promise(()=>{});
            }
            let j = u || await this.fetchComponent(g).then((e)=>({
                    Component: e.page,
                    styleSheets: e.styleSheets,
                    __N_SSG: e.mod.__N_SSG,
                    __N_SSP: e.mod.__N_SSP
                }));
            let w = O?.response?.headers.get("x-middleware-skip");
            let x = j.__N_SSG || j.__N_SSP;
            if (w && O?.dataHref) {
                delete this.sdc[O.dataHref];
            }
            let { props, cacheKey } = await this._getData(async ()=>{
                if (x) {
                    if (O?.json && !w) {
                        return {
                            cacheKey: O.cacheKey,
                            props: O.json
                        };
                    }
                    let dataHref = O?.dataHref ? O.dataHref : this.pageLoader.getDataHref({
                        href: y.formatWithValidation({
                            pathname,
                            query
                        }),
                        asPath: resolvedAs,
                        locale
                    });
                    let t = await Y({
                        dataHref,
                        isServerRender: this.isSsr,
                        parseJSON: true,
                        inflightCache: w ? {} : this.sdc,
                        persistCache: !isPreview,
                        isPrefetch: false,
                        unstable_skipClientCache
                    });
                    return {
                        cacheKey: t.cacheKey,
                        props: t.json || {}
                    };
                }
                return {
                    headers: {},
                    props: await this.getInitialProps(j.Component, {
                        pathname,
                        query,
                        asPath: as,
                        locale,
                        locales: this.locales,
                        defaultLocale: this.defaultLocale
                    })
                };
            });
            if (j.__N_SSP && P.dataHref && cacheKey) {
                delete this.sdc[cacheKey];
            }
            if (!(this.isPreview || !j.__N_SSG || isQueryUpdating)) {
                Y({
                    ...P,
                    isBackground: true,
                    persistCache: false,
                    inflightCache: this.sbc
                }).catch(()=>{});
            }
            props.pageProps = {
                ...props.pageProps
            };
            j.props = props;
            j.route = g;
            j.query = query;
            j.resolvedAs = resolvedAs;
            this.components[g] = j;
            return j;
        } catch (error) {
            return this.handleRouteInfoError(u.getProperError(error), pathname, query, as, routeProps);
        }
    }
    set(e, t, r) {
        this.state = e;
        return this.sub(t, this.components["/_app"].Component, r);
    }
    beforePopState(e) {
        this._bps = e;
    }
    onlyAHashChange(e) {
        if (!this.asPath) {
            return false;
        }
        let [t, r] = this.asPath.split("#", 2);
        let [n, a] = e.split("#", 2);
        return !!a && t === n && r === a || t === n && r !== a;
    }
    scrollToHash(e) {
        let [, t = ""] = e.split("#", 2);
        k.disableSmoothScrollDuringRouteTransition(()=>{
            if (t === "" || t === "top") {
                return void window.scrollTo(0, 0);
            }
            let e = decodeURIComponent(t);
            let r = document.getElementById(e);
            if (r) {
                return void r.scrollIntoView();
            }
            let n = document.getElementsByName(e)[0];
            if (n) {
                n.scrollIntoView();
            }
        }, {
            onlyHashChange: this.onlyAHashChange(e)
        });
    }
    urlIsNew(e) {
        return this.asPath !== e;
    }
    async prefetch(href, t = href, r = {}) {
        if (C.isBot(window.navigator.userAgent)) {
            return;
        }
        let a = _.parseRelativeUrl(href);
        let a_pathname = a.pathname;
        let { pathname, query } = a;
        let pathname_1 = pathname;
        let f = await this.pageLoader.getPageList();
        let d = t;
        let locale = r.locale !== undefined ? r.locale || undefined : this.locale;
        let P = await L({
            asPath: t,
            locale,
            router: this
        });
        if (t.startsWith("/")) {
            let r;
            ({ __rewrites: r } = await s.getClientBuildManifest());
            let o = n(S.addBasePath(b.addLocale(t, this.locale), true), f, r, a.query, (e)=>F(e, f), this.locales);
            if (o.externalDest) {
                return;
            }
            if (!P) {
                d = E.removeLocale(R.removeBasePath(o.asPath), this.locale);
            }
            if (o.matchedPage && o.resolvedHref) {
                a.pathname = pathname = o.resolvedHref;
                if (!P) {
                    href = y.formatWithValidation(a);
                }
            }
        }
        a.pathname = F(a.pathname, f);
        if (h.isDynamicRoute(a.pathname)) {
            pathname = a.pathname;
            a.pathname = pathname;
            Object.assign(query, m.getRouteMatcher(g.getRouteRegex(a.pathname))(v.parsePath(t).pathname) || {});
            if (!P) {
                href = y.formatWithValidation(a);
            }
        }
        let O = await $({
            fetchData: ()=>Y({
                    dataHref: this.pageLoader.getDataHref({
                        href: y.formatWithValidation({
                            pathname: pathname_1,
                            query
                        }),
                        skipInterpolation: true,
                        asPath: d,
                        locale
                    }),
                    hasMiddleware: true,
                    isServerRender: false,
                    parseJSON: true,
                    inflightCache: this.sdc,
                    persistCache: !this.isPreview,
                    isPrefetch: true
                }),
            asPath: t,
            locale,
            router: this
        });
        if (O?.effect.type === "rewrite") {
            a.pathname = O.effect.resolvedHref;
            pathname = O.effect.resolvedHref;
            query = {
                ...query,
                ...O.effect.parsedAs.query
            };
            d = O.effect.parsedAs.pathname;
            href = y.formatWithValidation(a);
        }
        if (O?.effect.type === "redirect-external") {
            return;
        }
        let T = i.removeTrailingSlash(pathname);
        if (await this._bfl(t, d, r.locale, true)) {
            this.components[a_pathname] = {
                __appRouter: true
            };
        }
        await Promise.all([
            this.pageLoader._isSsg(T).then((t)=>!!t && Y({
                    dataHref: O?.json ? O?.dataHref : this.pageLoader.getDataHref({
                        href,
                        asPath: d,
                        locale
                    }),
                    isServerRender: false,
                    parseJSON: true,
                    inflightCache: this.sdc,
                    persistCache: !this.isPreview,
                    isPrefetch: true,
                    unstable_skipClientCache: r.unstable_skipClientCache || r.priority && true
                }).then(()=>false).catch(()=>false)),
            this.pageLoader[r.priority ? "loadPage" : "prefetch"](T)
        ]);
    }
    async fetchComponent(e) {
        let t = X({
            route: e,
            router: this
        });
        try {
            let r = await this.pageLoader.loadPage(e);
            t();
            return r;
        } catch (error) {
            t();
            throw error;
        }
    }
    _getData(e) {
        let t = false;
        let r = ()=>{
            t = true;
        };
        this.clc = r;
        return e().then((e)=>{
            if (r === this.clc) {
                this.clc = null;
            }
            if (t) {
                let e = Object.defineProperty(Error("Loading initial props cancelled"), "__NEXT_ERROR_CODE", {
                    value: "E405",
                    enumerable: false,
                    configurable: true
                });
                e.cancelled = true;
                throw e;
            }
            return e;
        });
    }
    getInitialProps(Component_1, ctx) {
        let { Component } = this.components["/_app"];
        let AppTree = this._wrapApp(Component);
        ctx.AppTree = AppTree;
        return p.loadGetInitialProps(Component, {
            AppTree,
            Component: Component_1,
            router: this,
            ctx
        });
    }
    get route() {
        return this.state.route;
    }
    get pathname() {
        return this.state.pathname;
    }
    get query() {
        return this.state.query;
    }
    get asPath() {
        return this.state.asPath;
    }
    get locale() {
        return this.state.locale;
    }
    get isFallback() {
        return this.state.isFallback;
    }
    get isPreview() {
        return this.state.isPreview;
    }
    constructor(e, query, r, { initialProps, pageLoader, App, wrapApp, Component, err, subscription, isFallback, locale, locales, defaultLocale, domainLocales, isPreview }){
        this.sdc = {};
        this.sbc = {};
        this.isFirstPopStateEvent = true;
        this._key = q();
        this.onPopState = (e)=>{
            let t;
            let { isFirstPopStateEvent } = this;
            this.isFirstPopStateEvent = false;
            let e_state = e.state;
            if (!e_state) {
                let { pathname: pathname_1, query } = this;
                this.changeState("replaceState", y.formatWithValidation({
                    pathname: S.addBasePath(pathname_1),
                    query
                }), p.getURL());
                return;
            }
            if (e_state.__NA) {
                return void window.location.reload();
            }
            if (!e_state.__N || isFirstPopStateEvent && this.locale === e_state.options.locale && e_state.as === this.asPath) {
                return;
            }
            let { url, as, options, key } = e_state;
            this._key = key;
            let { pathname } = _.parseRelativeUrl(url);
            if ((!this.isSsr || as !== S.addBasePath(this.asPath) || pathname !== S.addBasePath(this.pathname)) && (!this._bps || this._bps(e_state))) {
                this.change("replaceState", url, as, {
                    ...options,
                    shallow: options.shallow && this._shallow,
                    locale: options.locale || this.defaultLocale,
                    _h: 0
                }, t);
            }
        };
        let E = i.removeTrailingSlash(e);
        this.components = {};
        if (e !== "/_error") {
            this.components[E] = {
                Component,
                initial: true,
                props: initialProps,
                err,
                __N_SSG: initialProps && initialProps.__N_SSG,
                __N_SSP: initialProps && initialProps.__N_SSP
            };
        }
        this.components["/_app"] = {
            Component: App,
            styleSheets: []
        };
        this.events = K.events;
        this.pageLoader = pageLoader;
        let R = h.isDynamicRoute(e) && self.__NEXT_DATA__.autoExport;
        this.basePath = "";
        this.sub = subscription;
        this.clc = null;
        this._wrapApp = wrapApp;
        this.isSsr = true;
        this.isLocaleDomain = false;
        this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || self.__NEXT_DATA__.isExperimentalCompile || self.__NEXT_DATA__.appGip && !self.__NEXT_DATA__.gsp || !R && !self.location.search && 0);
        this.state = {
            route: E,
            pathname: e,
            query,
            asPath: R ? e : r,
            isPreview: !!isPreview,
            locale: undefined,
            isFallback
        };
        this._initialMatchesMiddlewarePromise = Promise.resolve(false);
        if (!r.startsWith("//")) {
            let n = {
                locale
            };
            let a = p.getURL();
            this._initialMatchesMiddlewarePromise = L({
                router: this,
                locale,
                asPath: a
            }).then((o)=>{
                n._shouldResolveHref = r !== e;
                this.changeState("replaceState", o ? a : y.formatWithValidation({
                    pathname: S.addBasePath(e),
                    query
                }), a, n);
                return o;
            });
        }
        window.addEventListener("popstate", this.onPopState);
    }
}
K.events = d.default();
