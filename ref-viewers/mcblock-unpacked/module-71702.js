import { O } from "./module-49636.js";
import { Yz } from "./module-43275.js";
import { T } from "./module-5424.js";
let n;
let s = O;
let l = null;
let u = new Map;
let c = new Map;
function f(e) {
    let t = e.split("/").filter(Boolean);
    let r = 0;
    for (let e of t){
        if (e.startsWith(":")) {
            let t = e.substring(1);
            if (t.endsWith("*?")) {
                r += 1000;
            } else if (t.endsWith("*")) {
                r += 100;
            } else {
                r += 10;
            }
        }
    }
    if (t.length > 0) {
        r += 1 / t.length;
    }
    return r;
}
function d(regexString) {
    if (u.has(regexString)) {
        return u.get(regexString) ?? null;
    }
    try {
        let t = new RegExp(regexString);
        u.set(regexString, t);
        return t;
    } catch (error) {
        if (T) {
            Yz.warn("Could not compile regex", {
                regexString,
                error
            });
        }
        return null;
    }
}
function p() {
    if (!s?._sentryRouteManifest || typeof s._sentryRouteManifest !== "string") {
        return null;
    }
    let s__sentryRouteManifest = s._sentryRouteManifest;
    if (l && n === s__sentryRouteManifest) {
        return l;
    }
    u.clear();
    c.clear();
    let t = {
        staticRoutes: [],
        dynamicRoutes: [],
        isrRoutes: []
    };
    try {
        t = JSON.parse(s__sentryRouteManifest);
        if (!Array.isArray(t.staticRoutes) || !Array.isArray(t.dynamicRoutes)) {
            return null;
        }
        l = t;
        n = s__sentryRouteManifest;
        return t;
    } catch  {
        if (T) {
            Yz.warn("Could not extract route manifest");
        }
        return null;
    }
}
export { p as c };
export let D = (e)=>{
    let t = p();
    if (!t) {
        return;
    }
    let r = e.length > 1 && e.endsWith("/") ? e.slice(0, -1) : e;
    if (c.has(r)) {
        return c.get(r);
    }
    let { staticRoutes, dynamicRoutes } = t;
    if (!Array.isArray(staticRoutes) || !Array.isArray(dynamicRoutes)) {
        return;
    }
    let o = ((e, staticRoutes_1, dynamicRoutes_1)=>{
        let n = [];
        if (staticRoutes_1.some((t)=>t.path === e)) {
            return n;
        }
        for (let t of dynamicRoutes_1){
            if (t.regex) {
                let r = d(t.regex);
                if (r?.test(e)) {
                    n.push(t.path);
                }
            }
        }
        if (!e.startsWith("/:")) {
            for (let t of dynamicRoutes_1){
                if (t.hasOptionalPrefix && t.regex) {
                    let r = e === "/" ? "/SENTRY_OPTIONAL_PREFIX" : `/SENTRY_OPTIONAL_PREFIX${e}`;
                    let a = d(t.regex);
                    if (a?.test(r)) {
                        n.push(t.path);
                    }
                }
            }
        }
        return n;
    })(r, staticRoutes, dynamicRoutes).sort((e, t)=>f(e) - f(t))[0];
    c.set(r, o);
    return o;
};
