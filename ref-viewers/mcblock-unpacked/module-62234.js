import { AS, aj, s5 } from "./module-21010.js";
import { zf } from "./module-87624.js";
import { Kg } from "./module-16649.js";
import { j } from "./module-38599.js";
export let Er = "__sentry_xhr_v3__";
export function Mn(e) {
    s5("xhr", e);
    AS("xhr", u);
}
function u() {
    if (!j.XMLHttpRequest) {
        return;
    }
    let XMLHttpRequest_prototype = XMLHttpRequest.prototype;
    XMLHttpRequest_prototype.open = new Proxy(XMLHttpRequest_prototype.open, {
        apply (e, t, r) {
            let virtualError = Error();
            let startTimestamp = 1000 * zf();
            let method = Kg(r[0]) ? r[0].toUpperCase() : undefined;
            let url = ((e)=>{
                if (Kg(e)) {
                    return e;
                }
                try {
                    return e.toString();
                } catch  {}
            })(r[1]);
            if (!method || !url) {
                return e.apply(t, r);
            }
            t[Er] = {
                method,
                url,
                request_headers: {}
            };
            if (method === "POST" && url.match(/sentry_key/)) {
                t.__sentry_own_request__ = true;
            }
            let f = ()=>{
                let e = t[Er];
                if (e && t.readyState === 4) {
                    try {
                        e.status_code = t.status;
                    } catch  {}
                    let r = {
                        endTimestamp: 1000 * zf(),
                        startTimestamp,
                        xhr: t,
                        virtualError
                    };
                    aj("xhr", r);
                }
            };
            if ("onreadystatechange" in t && typeof t.onreadystatechange === "function") {
                t.onreadystatechange = new Proxy(t.onreadystatechange, {
                    apply: (e, t, r)=>{
                        f();
                        return e.apply(t, r);
                    }
                });
            } else {
                t.addEventListener("readystatechange", f);
            }
            t.setRequestHeader = new Proxy(t.setRequestHeader, {
                apply (e, t, r) {
                    let [n, a] = r;
                    let i = t[Er];
                    if (i && Kg(n) && Kg(a)) {
                        i.request_headers[n.toLowerCase()] = a;
                    }
                    return e.apply(t, r);
                }
            });
            return e.apply(t, r);
        }
    });
    XMLHttpRequest_prototype.send = new Proxy(XMLHttpRequest_prototype.send, {
        apply (e, t, r) {
            let o = t[Er];
            if (!o) {
                return e.apply(t, r);
            }
            if (r[0] !== undefined) {
                o.body = r[0];
            }
            let i = {
                startTimestamp: 1000 * zf(),
                xhr: t
            };
            aj("xhr", i);
            return e.apply(t, r);
        }
    });
}
