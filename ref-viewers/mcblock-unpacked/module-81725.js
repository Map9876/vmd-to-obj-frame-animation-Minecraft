import { KU } from "./module-2257.js";
import { bJ, ks } from "./module-16649.js";
import { GS, my } from "./module-73314.js";
import { m7 } from "./module-51217.js";
import { zf } from "./module-87624.js";
import { O } from "./module-49636.js";
import { AS, aj, s5 } from "./module-21010.js";
export function ur(e, t) {
    let r = "fetch";
    s5(r, e);
    AS(r, ()=>d(undefined, t));
}
export function B$(e) {
    let t = "fetch-body-resolved";
    s5(t, e);
    AS(t, ()=>d(h));
}
function d(e, t = false) {
    if (!t || m7()) {
        GS(O, "fetch", function(t) {
            return function(...args) {
                let virtualError = Error();
                let { method, url } = ((args_1)=>{
                    if (args_1.length === 0) {
                        return {
                            method: "GET",
                            url: ""
                        };
                    }
                    if (args_1.length === 2) {
                        let [t, r] = args_1;
                        return {
                            url: m(t),
                            method: _(r, "method") ? String(r.method).toUpperCase() : ks(t) && _(t, "method") ? String(t.method).toUpperCase() : "GET"
                        };
                    }
                    let t = args_1[0];
                    return {
                        url: m(t),
                        method: _(t, "method") ? String(t.method).toUpperCase() : "GET"
                    };
                })(args);
                let d = {
                    args,
                    fetchData: {
                        method,
                        url
                    },
                    startTimestamp: 1000 * zf(),
                    virtualError,
                    headers: (([t, r])=>{
                        try {
                            if (typeof r === "object" && r !== null && "headers" in r && r.headers) {
                                return new Headers(r.headers);
                            }
                            if (ks(t)) {
                                return new Headers(t.headers);
                            }
                        } catch  {}
                    })(args)
                };
                if (!e) {
                    aj("fetch", {
                        ...d
                    });
                }
                return t.apply(O, args).then(async (t)=>{
                    if (e) {
                        e(t);
                    } else {
                        aj("fetch", {
                            ...d,
                            endTimestamp: 1000 * zf(),
                            response: t
                        });
                    }
                    return t;
                }, (error)=>{
                    aj("fetch", {
                        ...d,
                        endTimestamp: 1000 * zf(),
                        error
                    });
                    if (bJ(error) && error.stack === undefined) {
                        error.stack = virtualError.stack;
                        my(error, "framesToPop", 1);
                    }
                    let t = KU();
                    let r = t?.getOptions().enhanceFetchErrorMessages ?? "always";
                    if (r !== false && error instanceof TypeError && (error.message === "Failed to fetch" || error.message === "Load failed" || error.message === "NetworkError when attempting to fetch resource.")) {
                        try {
                            let t = new URL(d.fetchData.url).host;
                            if (r === "always") {
                                error.message = `${error.message} (${t})`;
                            } else {
                                my(error, "__sentry_fetch_url_host__", t);
                            }
                        } catch  {}
                    }
                    throw error;
                });
            };
        });
    }
}
async function p(e, t) {
    if (e?.body) {
        let r = e.body;
        let n = r.getReader();
        let a = setTimeout(()=>{
            r.cancel().then(null, ()=>{});
        }, 90000);
        let o = true;
        while(o){
            let e;
            try {
                e = setTimeout(()=>{
                    r.cancel().then(null, ()=>{});
                }, 5000);
                let { done } = await n.read();
                clearTimeout(e);
                if (done) {
                    t();
                    o = false;
                }
            } catch  {
                o = false;
            } finally{
                clearTimeout(e);
            }
        }
        clearTimeout(a);
        n.releaseLock();
        r.cancel().then(null, ()=>{});
    }
}
function h(e) {
    let t;
    try {
        t = e.clone();
    } catch  {
        return;
    }
    p(t, ()=>{
        aj("fetch-body-resolved", {
            endTimestamp: 1000 * zf(),
            response: e
        });
    });
}
function _(e, t) {
    return !!e && typeof e === "object" && !!e[t];
}
function m(e) {
    if (typeof e === "string") {
        return e;
    }
    if (e) {
        if (_(e, "url")) {
            return e.url;
        }
        if (e.toString) {
            return e.toString();
        }
        return "";
    }
    return "";
}
