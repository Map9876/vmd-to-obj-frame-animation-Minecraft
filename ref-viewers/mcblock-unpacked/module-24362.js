import "./module-28140.js";
import "./module-80749.js";
import { __unsafeCreateTrustedScriptURL } from "./module-35000.js";
import { requestIdleCallback } from "./module-4853.js";
import { getDeploymentIdQueryOrEmptyString } from "./module-98301.js";
import { encodeURIPath } from "./module-77278.js";
function s(e, t, r) {
    let resolve;
    let a = t.get(e);
    if (a) {
        if ("future" in a) {
            return a.future;
        }
        return Promise.resolve(a);
    }
    let future = new Promise((resolvePromise)=>{
        resolve = resolvePromise;
    });
    t.set(e, {
        resolve,
        future
    });
    if (r) {
        return r().then((e)=>{
            resolve(e);
            return e;
        }).catch((r)=>{
            t.delete(e);
            throw r;
        });
    }
    return future;
}
let l = Symbol("ASSET_LOAD_ERROR");
export function markAssetError(e) {
    return Object.defineProperty(e, l, {});
}
export function isAssetError(e) {
    return e && l in e;
}
let f = ((e)=>{
    try {
        e = document.createElement("link");
        return !!window.MSInputMethodContext && !!document.documentMode || e.relList.supports("prefetch");
    } catch (e) {
        return false;
    }
})();
let d = ()=>getDeploymentIdQueryOrEmptyString();
function p(e, t, r) {
    return new Promise((resolve, reject)=>{
        let i = false;
        e.then((e)=>{
            i = true;
            resolve(e);
        }).catch(reject);
        requestIdleCallback(()=>setTimeout(()=>{
                if (!i) {
                    reject(r);
                }
            }, t));
    });
}
export function getClientBuildManifest() {
    if (self.__BUILD_MANIFEST) {
        return Promise.resolve(self.__BUILD_MANIFEST);
    }
    return p(new Promise((resolve)=>{
        let self___BUILD_MANIFEST_CB = self.__BUILD_MANIFEST_CB;
        self.__BUILD_MANIFEST_CB = ()=>{
            resolve(self.__BUILD_MANIFEST);
            if (self___BUILD_MANIFEST_CB) {
                self___BUILD_MANIFEST_CB();
            }
        };
    }), 3800, markAssetError(Object.defineProperty(Error("Failed to load client build manifest"), "__NEXT_ERROR_CODE", {
        value: "E273",
        enumerable: false,
        configurable: true
    })));
}
function _(e, t) {
    return getClientBuildManifest().then((r)=>{
        if (!(t in r)) {
            throw markAssetError(Object.defineProperty(Error(`Failed to lookup route: ${t}`), "__NEXT_ERROR_CODE", {
                value: "E446",
                enumerable: false,
                configurable: true
            }));
        }
        let a = r[t].map((t)=>`${e}/_next/${encodeURIPath(t)}`);
        return {
            scripts: a.filter((e)=>e.endsWith(".js")).map((e)=>__unsafeCreateTrustedScriptURL(e) + d()),
            css: a.filter((e)=>e.endsWith(".css")).map((e)=>e + d())
        };
    });
}
export function createRouteLoader(e) {
    let t = new Map;
    let r = new Map;
    let n = new Map;
    let o = new Map;
    function i(e) {
        {
            let t;
            let n = r.get(e.toString());
            if (n) {
                return n;
            }
            if (document.querySelector(`script[src^="${e}"]`)) {
                return Promise.resolve();
            }
            r.set(e.toString(), n = new Promise((resolve, reject)=>{
                t = document.createElement("script");
                t.onload = resolve;
                t.onerror = ()=>reject(markAssetError(Object.defineProperty(Error(`Failed to load script: ${e}`), "__NEXT_ERROR_CODE", {
                        value: "E74",
                        enumerable: false,
                        configurable: true
                    })));
                t.crossOrigin = undefined;
                t.src = e;
                document.body.appendChild(t);
            }));
            return n;
        }
    }
    function l(href) {
        let t = n.get(href);
        if (!t) {
            n.set(href, t = fetch(href, {
                credentials: "same-origin"
            }).then((t)=>{
                if (!t.ok) {
                    throw Object.defineProperty(Error(`Failed to load stylesheet: ${href}`), "__NEXT_ERROR_CODE", {
                        value: "E189",
                        enumerable: false,
                        configurable: true
                    });
                }
                return t.text().then((content)=>({
                        href,
                        content
                    }));
            }).catch((e)=>{
                throw markAssetError(e);
            }));
        }
        return t;
    }
    return {
        whenEntrypoint: (e)=>s(e, t),
        onEntrypoint (e, r) {
            (r ? Promise.resolve().then(()=>r()).then((exports)=>({
                    component: exports && exports.default || exports,
                    exports
                }), (error)=>({
                    error
                })) : Promise.resolve(undefined)).then((r)=>{
                let n = t.get(e);
                if (n && "resolve" in n) {
                    if (r) {
                        t.set(e, r);
                        n.resolve(r);
                    }
                } else {
                    if (r) {
                        t.set(e, r);
                    } else {
                        t.delete(e);
                    }
                    o.delete(e);
                }
            });
        },
        loadRoute (r, n) {
            return s(r, o, ()=>{
                let a;
                return p(_(e, r).then(({ scripts, css })=>Promise.all([
                        t.has(r) ? [] : Promise.all(scripts.map(i)),
                        Promise.all(css.map(l))
                    ])).then((e)=>this.whenEntrypoint(r).then((entrypoint)=>({
                            entrypoint,
                            styles: e[1]
                        }))), 3800, markAssetError(Object.defineProperty(Error(`Route did not complete loading: ${r}`), "__NEXT_ERROR_CODE", {
                    value: "E12",
                    enumerable: false,
                    configurable: true
                }))).then(({ entrypoint, styles })=>{
                    let n = {
                        styles,
                        ...entrypoint
                    };
                    if ("error" in entrypoint) {
                        return entrypoint;
                    }
                    return n;
                }).catch((error)=>{
                    if (n) {
                        throw error;
                    }
                    return {
                        error
                    };
                }).finally(()=>a?.());
            });
        },
        prefetch (t) {
            let r;
            if ((r = navigator.connection) && (r.saveData || /2g/.test(r.effectiveType))) {
                return Promise.resolve();
            }
            return _(e, t).then((e)=>Promise.all(f ? e.scripts.map((e)=>{
                    var t;
                    var r;
                    var n;
                    t = e.toString();
                    r = "script";
                    return new Promise((resolve, reject)=>{
                        let o = `
      link[rel="prefetch"][href^="${t}"],
      link[rel="preload"][href^="${t}"],
      script[src^="${t}"]`;
                        if (document.querySelector(o)) {
                            return resolve();
                        }
                        n = document.createElement("link");
                        if (r) {
                            n.as = r;
                        }
                        n.rel = "prefetch";
                        n.crossOrigin = undefined;
                        n.onload = resolve;
                        n.onerror = ()=>reject(markAssetError(Object.defineProperty(Error(`Failed to prefetch: ${t}`), "__NEXT_ERROR_CODE", {
                                value: "E268",
                                enumerable: false,
                                configurable: true
                            })));
                        n.href = t;
                        document.head.appendChild(n);
                    });
                }) : [])).then(()=>{
                requestIdleCallback(()=>this.loadRoute(t, true).catch(()=>{}));
            }).catch(()=>{});
        }
    };
}
