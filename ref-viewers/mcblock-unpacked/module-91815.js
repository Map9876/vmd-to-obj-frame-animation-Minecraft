import { k3 } from "./module-87624.js";
import { JD, i_, uT } from "./module-88722.js";
import { O } from "./module-49636.js";
import { jf } from "./module-39619.js";
import { Nt, Sx } from "./module-47848.js";
import { D } from "./module-71702.js";
import c from "./module-95704.js";
let n;
function f(e) {
    if (e.length > 1 && e.endsWith("/")) {
        return e.slice(0, -1);
    }
    return e;
}
export let NI = "incomplete-app-router-transaction";
let p = "router-patch";
let h = {
    current: undefined
};
export function jw(e) {
    let t = f(jf.location.pathname);
    let r = D(t);
    let n = k3();
    Sx(e, {
        name: r ?? t,
        startTime: n ? n / 1000 : undefined,
        attributes: {
            [uT]: "pageload",
            [JD]: "auto.pageload.nextjs.app_router_instrumentation",
            [i_]: r ? "route" : "url"
        }
    });
}
let m = O;
let g = O;
export function q3(e) {
    n = (t, r)=>{
        let n = c.env._sentryBasePath ?? g._sentryBasePath;
        let a = f(new URL(n && !t.startsWith(n) ? `${n}${t}` : t, jf.location.href).pathname);
        let i = D(a);
        let d = i ?? a;
        if (p === "router-patch") {
            p = "transition-start-hook";
        }
        let h_current = h.current;
        if (h_current) {
            h_current.updateName(d);
            h_current.setAttributes({
                "navigation.type": `router.${r}`,
                [i_]: i ? "route" : "url"
            });
            h.current = undefined;
        } else {
            Nt(e, {
                name: d,
                attributes: {
                    [uT]: "navigation",
                    [JD]: "auto.navigation.nextjs.app_router_instrumentation",
                    [i_]: i ? "route" : "url",
                    "navigation.type": `router.${r}`
                }
            });
        }
    };
    jf.addEventListener("popstate", ()=>{
        let t = f(jf.location.pathname);
        let r = D(t);
        if (h.current?.isRecording()) {
            h.current.updateName(r ?? t);
            h.current.setAttribute(i_, r ? "route" : "url");
        } else {
            h.current = Nt(e, {
                name: r ?? t,
                attributes: {
                    [JD]: "auto.navigation.nextjs.app_router_instrumentation",
                    [i_]: r ? "route" : "url",
                    "navigation.type": "browser.popstate"
                }
            });
        }
    });
    let t = false;
    let r = 0;
    let a = setInterval(()=>{
        r++;
        let n = m?.next?.router ?? m?.nd?.router;
        if (t || r > 500) {
            clearInterval(a);
        } else if (n) {
            clearInterval(a);
            t = true;
            E(e, n, h);
            [
                "nd",
                "next"
            ].forEach((t)=>{
                let r = m[t];
                if (r) {
                    m[t] = new Proxy(r, {
                        set: (t, r, n)=>{
                            if (r === "router" && typeof n === "object" && n !== null) {
                                E(e, n, h);
                            }
                            t[r] = n;
                            return true;
                        }
                    });
                }
            });
        }
    }, 20);
}
function v(e) {
    try {
        return new URL(e, "http://example.com/").pathname;
    } catch  {
        return "/";
    }
}
let b = new WeakSet;
function E(e, t, r) {
    if (!b.has(t)) {
        b.add(t);
        [
            "back",
            "forward",
            "push",
            "replace"
        ].forEach((n)=>{
            if (t?.[n]) {
                t[n] = new Proxy(t[n], {
                    apply (t, a, i) {
                        if (p !== "router-patch") {
                            return t.apply(a, i);
                        }
                        let s = NI;
                        let h = {
                            [uT]: "navigation",
                            [JD]: "auto.navigation.nextjs.app_router_instrumentation",
                            [i_]: "url"
                        };
                        let _ = i[0];
                        let m = c.env._sentryBasePath ?? g._sentryBasePath;
                        let y = m && typeof _ === "string" && !_.startsWith(m) ? `${m}${_}` : _;
                        switch(n){
                            case "push":
                                s = f(v(y));
                                h["navigation.type"] = "router.push";
                                break;
                            case "replace":
                                s = f(v(y));
                                h["navigation.type"] = "router.replace";
                                break;
                            case "back":
                                h["navigation.type"] = "router.back";
                                break;
                            default:
                                if (n === "forward") {
                                    h["navigation.type"] = "router.forward";
                                }
                        }
                        let b = D(s);
                        r.current = Nt(e, {
                            name: b ?? s,
                            attributes: {
                                ...h,
                                [i_]: b ? "route" : "url"
                            }
                        });
                        return t.apply(a, i);
                    }
                });
            }
        });
    }
}
export function Nc(e, t) {
    if (n) {
        n(e, t);
    }
}
