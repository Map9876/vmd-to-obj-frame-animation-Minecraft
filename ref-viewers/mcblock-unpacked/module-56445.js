import o from "./module-32505.js";
import "./module-10208.js";
import u from "./module-31520.js";
import { UnknownError } from "./module-74090.js";
export const proxyLogger = function(e = l, t) {
    try {
        if (typeof window === "undefined") {
            return e;
        }
        const r = {};
        const n = (level)=>{
            let n;
            r[level] = (n = u(o.mark(function r(code, u) {
                let s;
                let body;
                return o.wrap(function(r) {
                    while(true){
                        switch(r.prev = r.next){
                            case 0:
                                l[level](code, u);
                                if (level === "error") {
                                    u = c(u);
                                }
                                u.client = true;
                                s = `${t}/_log`;
                                body = new URLSearchParams({
                                    level,
                                    code,
                                    ...u
                                });
                                if (!navigator.sendBeacon) {
                                    r.next = 8;
                                    break;
                                }
                                return r.abrupt("return", navigator.sendBeacon(s, body));
                            case 8:
                                r.next = 10;
                                return fetch(s, {
                                    method: "POST",
                                    body,
                                    keepalive: true
                                });
                            case 10:
                                return r.abrupt("return", r.sent);
                            case 11:
                            case "end":
                                return r.stop();
                        }
                    }
                }, r);
            })), function(e, t) {
                return n.apply(this, arguments);
            });
        };
        for(const s in e){
            n(s);
        }
        return r;
    } catch (e) {
        return l;
    }
};
export const setLogger = function(e = {}, t) {
    if (!t) {
        l.debug = function() {};
    }
    if (e.error) {
        l.error = e.error;
    }
    if (e.warn) {
        l.warn = e.warn;
    }
    if (e.debug) {
        l.debug = e.debug;
    }
};
function i(e, t) {
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
function c(e) {
    let t;
    if (e instanceof Error && !(e instanceof UnknownError)) {
        return {
            message: e.message,
            stack: e.stack,
            name: e.name
        };
    }
    if ((t = e) != null && t.error) {
        e.error = c(e.error);
        e.message = e.message ?? e.error.message;
    }
    return e;
}
var l = {
    error: function(e, t) {
        t = c(t);
        console.error(`[next-auth][error][${e}]`, `
https://next-auth.js.org/errors#${e.toLowerCase()}`, t.message, t);
    },
    warn: function(e) {
        console.warn(`[next-auth][warn][${e}]`, `
https://next-auth.js.org/warnings#${e.toLowerCase()}`);
    },
    debug: function(e, t) {
        console.log(`[next-auth][debug][${e}]`, t);
    }
};
export default l;
