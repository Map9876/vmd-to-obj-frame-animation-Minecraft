import { L2, mE } from "./module-16649.js";
import { W4 } from "./module-73314.js";
import { nY, qQ } from "./module-85236.js";
Object.defineProperty(exports, "cd", {
    enumerable: true,
    get: ()=>function e(t, r = 3, n = 102400) {
            let a = S8(t, r);
            if (~-encodeURI(JSON.stringify(a)).split(/%..|./).length > n) {
                return e(t, r - 1, n);
            }
            return a;
        }
});
export function S8(e, t = 100, r = Infinity) {
    try {
        return function e(t, r, i = Infinity, s = Infinity, l = (()=>{
            let e = new WeakSet;
            return [
                function(t) {
                    return !!e.has(t) || (e.add(t), false);
                },
                function(t) {
                    e.delete(t);
                }
            ];
        })()) {
            let [u, c] = l;
            if (r == null || [
                "boolean",
                "string"
            ].includes(typeof r) || typeof r === "number" && Number.isFinite(r)) {
                return r;
            }
            let f = ((e, t)=>{
                try {
                    if (e === "domain" && t && typeof t === "object" && t._events) {
                        return "[Domain]";
                    }
                    if (e === "domainEmitter") {
                        return "[DomainEmitter]";
                    }
                    if (typeof global !== "undefined" && t === global) {
                        return "[Global]";
                    }
                    if (typeof window !== "undefined" && t === window) {
                        return "[Window]";
                    }
                    if (typeof document !== "undefined" && t === document) {
                        return "[Document]";
                    }
                    if (L2(t)) {
                        return nY(t);
                    }
                    if (mE(t)) {
                        return "[SyntheticEvent]";
                    }
                    if (typeof t === "number" && !Number.isFinite(t)) {
                        return `[${t}]`;
                    }
                    if (typeof t === "function") {
                        return `[Function: ${qQ(t)}]`;
                    }
                    if (typeof t === "symbol") {
                        return `[${String(t)}]`;
                    }
                    if (typeof t === "bigint") {
                        return `[BigInt: ${String(t)}]`;
                    }
                    let r = ((e)=>{
                        let t = Object.getPrototypeOf(e);
                        if (t?.constructor) {
                            return t.constructor.name;
                        }
                        return "null prototype";
                    })(t);
                    if (/^HTML(\w*)Element$/.test(r)) {
                        return `[HTMLElement: ${r}]`;
                    }
                    return `[object ${r}]`;
                } catch (error) {
                    return `**non-serializable** (${error})`;
                }
            })(t, r);
            if (!f.startsWith("[object ")) {
                return f;
            }
            if (r.__sentry_skip_normalization__) {
                return r;
            }
            let d = typeof r.__sentry_override_normalization_depth__ === "number" ? r.__sentry_override_normalization_depth__ : i;
            if (d === 0) {
                return f.replace("object ", "");
            }
            if (u(r)) {
                return "[Circular ~]";
            }
            if (r && typeof r.toJSON === "function") {
                try {
                    let t = r.toJSON();
                    return e("", t, d - 1, s, l);
                } catch  {}
            }
            let p = Array.isArray(r) ? [] : {};
            let h = 0;
            let _ = W4(r);
            for(let t in _){
                if (!Object.prototype.hasOwnProperty.call(_, t)) {
                    continue;
                }
                if (h >= s) {
                    p[t] = "[MaxProperties ~]";
                    break;
                }
                let r = _[t];
                p[t] = e(t, r, d - 1, s, l);
                h++;
            }
            c(r);
            return p;
        }("", e, t, r);
    } catch (error) {
        return {
            ERROR: `**non-serializable** (${error})`
        };
    }
}
