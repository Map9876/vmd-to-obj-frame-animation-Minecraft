import o from "./module-32505.js";
import "./module-10208.js";
import u from "./module-31520.js";
export const BroadcastChannel = function(e = "nextauth.message") {
    return {
        receive: function(t) {
            const r = function(r) {
                if (r.key === e) {
                    const o = JSON.parse(r.newValue ?? "{}");
                    if (o?.event === "session" && o != null && o.data) {
                        t(o);
                    }
                }
            };
            window.addEventListener("storage", r);
            return function() {
                return window.removeEventListener("storage", r);
            };
        },
        post: function(t) {
            if (typeof window !== "undefined") {
                try {
                    localStorage.setItem(e, JSON.stringify({
                        ...t,
                        timestamp: now()
                    }));
                } catch (e) {}
            }
        }
    };
};
export const fetchData = function(e, t, r) {
    return c.apply(this, arguments);
};
function c() {
    return (c = u(o.mark(function e(t, r, n) {
        let a;
        let u;
        let c;
        let url;
        let p;
        let d;
        let v;
        let h;
        const x = arguments;
        return o.wrap(function(e) {
            while(true){
                switch(e.prev = e.next){
                    case 0:
                        ({ ctx: u, req: c = u?.req } = a = x.length > 3 && x[3] !== undefined ? x[3] : {});
                        url = `${apiBaseUrl(r)}/${t}`;
                        e.prev = 2;
                        d = {
                            headers: {
                                "Content-Type": "application/json",
                                ...c != null && (p = c.headers) != null && p.cookie ? {
                                    cookie: c.headers.cookie
                                } : {}
                            }
                        };
                        if (c != null && c.body) {
                            d.body = JSON.stringify(c.body);
                            d.method = "POST";
                        }
                        e.next = 7;
                        return fetch(url, d);
                    case 7:
                        v = e.sent;
                        e.next = 10;
                        return v.json();
                    case 10:
                        h = e.sent;
                        if (v.ok) {
                            e.next = 13;
                            break;
                        }
                        throw h;
                    case 13:
                        return e.abrupt("return", Object.keys(h).length > 0 ? h : null);
                    case 16:
                        e.prev = 16;
                        e.t0 = e.catch(2);
                        n.error("CLIENT_FETCH_ERROR", {
                            error: e.t0,
                            url
                        });
                        return e.abrupt("return", null);
                    case 20:
                    case "end":
                        return e.stop();
                }
            }
        }, e, null, [
            [
                2,
                16
            ]
        ]);
    }))).apply(this, arguments);
}
export function apiBaseUrl(e) {
    if (typeof window === "undefined") {
        return `${e.baseUrlServer}${e.basePathServer}`;
    }
    return e.basePath;
}
export function now() {
    return Math.floor(Date.now() / 1000);
}
