import i from "./module-95704.js";
import "./module-92639.js";
import p from "./module-32505.js";
import d from "./module-10208.js";
import v from "./module-31520.js";
import h from "./module-48358.js";
import * as x from "./module-61426.js";
import y, { proxyLogger } from "./module-56445.js";
import b from "./module-36880.js";
import { BroadcastChannel, apiBaseUrl, fetchData, now } from "./module-32943.js";
import "./module-86897.js";
export const SessionProvider = function(e) {
    if (!SessionContext) {
        throw Error("React Context is unavailable in Server Components");
    }
    let t;
    let r;
    let n;
    let o;
    let a;
    let u;
    const { children, basePath, refetchInterval, refetchWhenOffline } = e;
    if (basePath) {
        j.basePath = basePath;
    }
    const f = e.session !== undefined;
    j._lastSync = f ? now() : 0;
    const d = x.useState(function() {
        if (f) {
            j._session = e.session;
        }
        return e.session;
    });
    const y = h(d, 2);
    const b = y[0];
    const w = y[1];
    const O = x.useState(!f);
    const m = h(O, 2);
    const S = m[0];
    const E = m[1];
    x.useEffect(function() {
        j._getSession = v(p.mark(function e() {
            let t;
            let r;
            const n = arguments;
            return p.wrap(function(e) {
                while(true){
                    switch(e.prev = e.next){
                        case 0:
                            t = (n.length > 0 && n[0] !== undefined ? n[0] : {}).event;
                            e.prev = 1;
                            if (!((r = t === "storage") || j._session === undefined)) {
                                e.next = 10;
                                break;
                            }
                            j._lastSync = now();
                            e.next = 7;
                            return getSession({
                                broadcast: !r
                            });
                        case 7:
                            j._session = e.sent;
                            w(j._session);
                            return e.abrupt("return");
                        case 10:
                            if (!(!t || j._session === null || now() < j._lastSync)) {
                                e.next = 12;
                                break;
                            }
                            return e.abrupt("return");
                        case 12:
                            j._lastSync = now();
                            e.next = 15;
                            return getSession();
                        case 15:
                            j._session = e.sent;
                            w(j._session);
                            e.next = 22;
                            break;
                        case 19:
                            e.prev = 19;
                            e.t0 = e.catch(1);
                            P.error("CLIENT_SESSION_ERROR", e.t0);
                        case 22:
                            e.prev = 22;
                            E(false);
                            return e.finish(22);
                        case 25:
                        case "end":
                            return e.stop();
                    }
                }
            }, e, null, [
                [
                    1,
                    19,
                    22,
                    25
                ]
            ]);
        }));
        j._getSession();
        return function() {
            j._lastSync = 0;
            j._session = undefined;
            j._getSession = function() {};
        };
    }, []);
    x.useEffect(function() {
        const e = k.receive(function() {
            return j._getSession({
                event: "storage"
            });
        });
        return function() {
            return e();
        };
    }, []);
    x.useEffect(function() {
        const e_refetchOnWindowFocus = e.refetchOnWindowFocus;
        const r = e_refetchOnWindowFocus === undefined || e_refetchOnWindowFocus;
        const n = function() {
            if (r && document.visibilityState === "visible") {
                j._getSession({
                    event: "visibilitychange"
                });
            }
        };
        document.addEventListener("visibilitychange", n, false);
        return function() {
            return document.removeEventListener("visibilitychange", n, false);
        };
    }, [
        e.refetchOnWindowFocus
    ]);
    t = x.useState(typeof navigator !== "undefined" && navigator.onLine);
    n = (r = h(t, 2))[0];
    o = r[1];
    a = function() {
        return o(true);
    };
    u = function() {
        return o(false);
    };
    x.useEffect(function() {
        window.addEventListener("online", a);
        window.addEventListener("offline", u);
        return function() {
            window.removeEventListener("online", a);
            window.removeEventListener("offline", u);
        };
    }, []);
    const U = refetchWhenOffline !== false || n;
    x.useEffect(function() {
        if (refetchInterval && U) {
            const e = setInterval(()=>{
                if (j._session) {
                    j._getSession({
                        event: "poll"
                    });
                }
            }, 1000 * refetchInterval);
            return function() {
                return clearInterval(e);
            };
        }
    }, [
        refetchInterval,
        U
    ]);
    const value = x.useMemo(function() {
        return {
            data: b,
            status: S ? "loading" : b ? "authenticated" : "unauthenticated",
            update: function(e) {
                return v(p.mark(function t() {
                    let r;
                    return p.wrap(function(t) {
                        while(true){
                            switch(t.prev = t.next){
                                case 0:
                                    if (!(S || !b)) {
                                        t.next = 2;
                                        break;
                                    }
                                    return t.abrupt("return");
                                case 2:
                                    E(true);
                                    t.t0 = fetchData;
                                    t.t1 = j;
                                    t.t2 = P;
                                    t.next = 8;
                                    return getCsrfToken();
                                case 8:
                                    t.t3 = t.sent;
                                    t.t4 = e;
                                    t.t5 = {
                                        csrfToken: t.t3,
                                        data: t.t4
                                    };
                                    t.t6 = {
                                        body: t.t5
                                    };
                                    t.t7 = {
                                        req: t.t6
                                    };
                                    t.next = 15;
                                    return t.t0("session", t.t1, t.t2, t.t7);
                                case 15:
                                    r = t.sent;
                                    E(false);
                                    if (r) {
                                        w(r);
                                        k.post({
                                            event: "session",
                                            data: {
                                                trigger: "getSession"
                                            }
                                        });
                                    }
                                    return t.abrupt("return", r);
                                case 19:
                                case "end":
                                    return t.stop();
                            }
                        }
                    }, t);
                }))();
            }
        };
    }, [
        b,
        S
    ]);
    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
export const signIn = function(e, t, r) {
    return N.apply(this, arguments);
};
export const signOut = function(e) {
    return I.apply(this, arguments);
};
export const useSession = function(e) {
    if (!SessionContext) {
        throw Error("React Context is unavailable in Server Components");
    }
    const t = x.useContext(SessionContext);
    const r = e ?? {};
    const { required, onUnauthenticated } = r;
    const a = required && t.status === "unauthenticated";
    x.useEffect(function() {
        if (a) {
            const e = `/api/auth/signin?${new URLSearchParams({
                error: "SessionRequired",
                callbackUrl: window.location.href
            })}`;
            if (onUnauthenticated) {
                onUnauthenticated();
            } else {
                window.location.href = e;
            }
        }
    }, [
        a,
        onUnauthenticated
    ]);
    if (a) {
        return {
            data: t.data,
            update: t.update,
            status: "loading"
        };
    }
    return t;
};
function S(e, t) {
    const r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        let n = Object.getOwnPropertySymbols(e);
        if (t) {
            n = n.filter((t)=>Object.getOwnPropertyDescriptor(e, t).enumerable);
        }
        r.push(...n);
    }
    return r;
}
function E(e) {
    for(let t = 1; t < arguments.length; t++){
        var r = arguments[t] ?? {};
        if (t % 2) {
            S(Object(r), true).forEach((t)=>{
                d(e, t, r[t]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(e, Object.getOwnPropertyDescriptors(r));
        } else {
            S(Object(r)).forEach((t)=>{
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
            });
        }
    }
    return e;
}
export * from "./module-98404.js";
var j = {
    baseUrl: b(i.env.NEXTAUTH_URL ?? i.env.VERCEL_URL).origin,
    basePath: b(i.env.NEXTAUTH_URL).path,
    baseUrlServer: b(i.env.NEXTAUTH_URL_INTERNAL ?? i.env.NEXTAUTH_URL ?? i.env.VERCEL_URL).origin,
    basePathServer: b(i.env.NEXTAUTH_URL_INTERNAL ?? i.env.NEXTAUTH_URL).path,
    _lastSync: 0,
    _session: undefined,
    _getSession: function() {}
};
var k = BroadcastChannel();
var P = proxyLogger(y, j.basePath);
export var SessionContext = x.createContext?.(undefined);
export async function getSession(t) {
    let r;
    let n;
    n = await fetchData("session", j, P, t);
    if ((r = t?.broadcast) == null || r) {
        k.post({
            event: "session",
            data: {
                trigger: "getSession"
            }
        });
    }
    return n;
}
export async function getCsrfToken(t) {
    let r;
    r = await fetchData("csrf", j, P, t);
    return r?.csrfToken;
}
export async function getProviders() {
    return await fetchData("providers", j, P);
}
function N() {
    return (N = v(p.mark(function e(t, r, n) {
        let o;
        let callbackUrl;
        let s;
        let i;
        let c;
        let l;
        let f;
        let d;
        let v;
        let h;
        let x;
        let y;
        let b;
        let w;
        let error;
        return p.wrap(function(e) {
            while(true){
                switch(e.prev = e.next){
                    case 0:
                        ({ callbackUrl = window.location.href } = o = r ?? {});
                        i = (s = o.redirect) === undefined || s;
                        c = apiBaseUrl(j);
                        e.next = 4;
                        return getProviders();
                    case 4:
                        if (l = e.sent) {
                            e.next = 8;
                            break;
                        }
                        window.location.href = `${c}/error`;
                        return e.abrupt("return");
                    case 8:
                        if (!(!t || !(t in l))) {
                            e.next = 11;
                            break;
                        }
                        window.location.href = `${c}/signin?${new URLSearchParams({
                            callbackUrl
                        })}`;
                        return e.abrupt("return");
                    case 11:
                        f = l[t].type === "credentials";
                        d = l[t].type === "email";
                        v = f || d;
                        h = `${c}/${f ? "callback" : "signin"}/${t}`;
                        x = `${h}${n ? `?${new URLSearchParams(n)}` : ""}`;
                        e.t0 = fetch;
                        e.t1 = x;
                        e.t2 = {
                            "Content-Type": "application/x-www-form-urlencoded"
                        };
                        e.t3 = URLSearchParams;
                        e.t4 = E;
                        e.t5 = {
                            ...r
                        };
                        e.t6 = {};
                        e.next = 25;
                        return getCsrfToken();
                    case 25:
                        e.t7 = e.sent;
                        e.t8 = callbackUrl;
                        e.t9 = {
                            csrfToken: e.t7,
                            callbackUrl: e.t8,
                            json: true
                        };
                        e.t10 = e.t4(e.t5, e.t6, e.t9);
                        e.t11 = new e.t3(e.t10);
                        e.t12 = {
                            method: "post",
                            headers: e.t2,
                            body: e.t11
                        };
                        e.next = 33;
                        return e.t0(e.t1, e.t12);
                    case 33:
                        y = e.sent;
                        e.next = 36;
                        return y.json();
                    case 36:
                        b = e.sent;
                        if (!(i || !v)) {
                            e.next = 42;
                            break;
                        }
                        w = b.url ?? callbackUrl;
                        window.location.href = w;
                        if (w.includes("#")) {
                            window.location.reload();
                        }
                        return e.abrupt("return");
                    case 42:
                        error = new URL(b.url).searchParams.get("error");
                        if (!y.ok) {
                            e.next = 46;
                            break;
                        }
                        e.next = 46;
                        return j._getSession({
                            event: "storage"
                        });
                    case 46:
                        return e.abrupt("return", {
                            error,
                            status: y.status,
                            ok: y.ok,
                            url: error ? null : b.url
                        });
                    case 47:
                    case "end":
                        return e.stop();
                }
            }
        }, e);
    }))).apply(this, arguments);
}
function I() {
    return (I = v(p.mark(function e(t) {
        let r;
        let n;
        let o;
        let a;
        let u;
        let s;
        let i;
        let l;
        return p.wrap(function(e) {
            while(true){
                switch(e.prev = e.next){
                    case 0:
                        o = (n = (t ?? {}).callbackUrl) === undefined ? window.location.href : n;
                        a = apiBaseUrl(j);
                        e.t0 = {
                            "Content-Type": "application/x-www-form-urlencoded"
                        };
                        e.t1 = URLSearchParams;
                        e.next = 6;
                        return getCsrfToken();
                    case 6:
                        e.t2 = e.sent;
                        e.t3 = o;
                        e.t4 = {
                            csrfToken: e.t2,
                            callbackUrl: e.t3,
                            json: true
                        };
                        e.t5 = new e.t1(e.t4);
                        u = {
                            method: "post",
                            headers: e.t0,
                            body: e.t5
                        };
                        e.next = 13;
                        return fetch(`${a}/signout`, u);
                    case 13:
                        s = e.sent;
                        e.next = 16;
                        return s.json();
                    case 16:
                        i = e.sent;
                        k.post({
                            event: "session",
                            data: {
                                trigger: "signout"
                            }
                        });
                        if (!((r = t?.redirect) == null || r)) {
                            e.next = 23;
                            break;
                        }
                        l = i.url ?? o;
                        window.location.href = l;
                        if (l.includes("#")) {
                            window.location.reload();
                        }
                        return e.abrupt("return");
                    case 23:
                        e.next = 25;
                        return j._getSession({
                            event: "storage"
                        });
                    case 25:
                        return e.abrupt("return", i);
                    case 26:
                    case "end":
                        return e.stop();
                }
            }
        }, e);
    }))).apply(this, arguments);
}
