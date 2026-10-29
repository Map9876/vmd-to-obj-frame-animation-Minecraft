import "./module-28140.js";
import { useContext } from "./module-61426.js";
import Router_1 from "./module-58110.js";
import i from "./module-79862.js";
import s from "./module-42444.js";
import withRouter_1 from "./module-15657.js";
export { Router_1 as Router };
export { withRouter_1 as withRouter };
let u = {
    router: null,
    readyCallbacks: [],
    ready (e) {
        if (this.router) {
            return e();
        }
        this.readyCallbacks.push(e);
    }
};
let c = [
    "pathname",
    "route",
    "query",
    "asPath",
    "components",
    "isFallback",
    "basePath",
    "locale",
    "locales",
    "defaultLocale",
    "isReady",
    "isPreview",
    "isLocaleDomain",
    "domainLocales"
];
let f = [
    "push",
    "replace",
    "reload",
    "back",
    "prefetch",
    "beforePopState"
];
function d() {
    if (!u.router) {
        throw Object.defineProperty(Error('No router instance found.\nYou should only use "next/router" on the client side of your app.\n'), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    return u.router;
}
Object.defineProperty(u, "events", {
    get: ()=>Router_1.events
});
c.forEach((e)=>{
    Object.defineProperty(u, e, {
        get: ()=>d()[e]
    });
});
f.forEach((e)=>{
    u[e] = function(...r) {
        return d()[e](...r);
    };
});
[
    "routeChangeStart",
    "beforeHistoryChange",
    "routeChangeComplete",
    "routeChangeError",
    "hashChangeStart",
    "hashChangeComplete"
].forEach((e)=>{
    u.ready(()=>{
        Router_1.events.on(e, function(...r) {
            let a = `on${e.charAt(0).toUpperCase()}${e.substring(1)}`;
            if (u[a]) {
                try {
                    u[a](...r);
                } catch (error) {
                    console.error(`Error when running the Router event: ${a}`);
                    console.error(s(error) ? `${error.message}
${error.stack}` : `${error}`);
                }
            }
        });
    });
});
let p = u;
export { p as default };
export function useRouter() {
    let e = useContext(i.RouterContext);
    if (!e) {
        throw Object.defineProperty(Error("NextRouter was not mounted. https://nextjs.org/docs/messages/next-router-not-mounted"), "__NEXT_ERROR_CODE", {
            value: "E509",
            enumerable: false,
            configurable: true
        });
    }
    return e;
}
export function createRouter(...t) {
    u.router = new Router_1(...t);
    u.readyCallbacks.forEach((e)=>e());
    u.readyCallbacks = [];
    return u.router;
}
export function makePublicRouterInstance(e) {
    let t = {};
    for (let r of c){
        if (typeof e[r] === "object") {
            t[r] = Object.assign(Array.isArray(e[r]) ? [] : {}, e[r]);
            continue;
        }
        t[r] = e[r];
    }
    t.events = Router_1.events;
    f.forEach((r)=>{
        t[r] = function(...n) {
            return e[r](...n);
        };
    });
    return t;
}
if ((typeof p === "function" || typeof p === "object" && p !== null) && p.__esModule === undefined) {
    Object.defineProperty(p, "__esModule", {
        value: true
    });
    Object.assign(p, {
        Router: Router_1,
        createRouter,
        default: p,
        makePublicRouterInstance,
        useRouter,
        withRouter: withRouter_1
    });
}
