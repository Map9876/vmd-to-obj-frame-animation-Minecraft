"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeChangedPath", {
    enumerable: true,
    get () {
        return u;
    }
});
Object.defineProperty(exports, "extractPathFromFlightRouterState", {
    enumerable: true,
    get () {
        return l;
    }
});
Object.defineProperty(exports, "getSelectedParams", {
    enumerable: true,
    get () {
        return function e(t, r) {
            for (let n of (r === undefined && (r = {}), Object.values(t[1]))){
                let t = n[0];
                let o = Array.isArray(t);
                let i = o ? t[1] : t;
                if (!(!i || i.startsWith(a.PAGE_SEGMENT_KEY))) {
                    if (o && (t[2] === "c" || t[2] === "oc")) {
                        r[t[0]] = t[1].split("/");
                    } else if (o) {
                        r[t[0]] = t[1];
                    }
                    r = e(n, r);
                }
            }
            return r;
        };
    }
});
let n = require("./module-57630.js");
let a = require("./module-65360.js");
let o = require("./module-7460.js");
let i = (e)=>{
    if (typeof e === "string") {
        if (e === "children") {
            return "";
        }
        return e;
    }
    return e[1];
};
function s(e) {
    return e.reduce((acc, t)=>{
        let r;
        if ((t = (r = t)[0] === "/" ? r.slice(1) : r) === "" || a.isGroupSegment(t)) {
            return acc;
        }
        return `${acc}/${t}`;
    }, "") || "/";
}
function l(e) {
    let r = Array.isArray(e[0]) ? e[0][1] : e[0];
    if (r === a.DEFAULT_SEGMENT_KEY || n.INTERCEPTION_ROUTE_MARKERS.some((e)=>r.startsWith(e))) {
        return;
    }
    if (r.startsWith(a.PAGE_SEGMENT_KEY)) {
        return "";
    }
    let o = [
        i(r)
    ];
    let u = e[1] ?? {};
    let c = u.children ? l(u.children) : undefined;
    if (c !== undefined) {
        o.push(c);
    } else {
        for (let [e, t] of Object.entries(u)){
            if (e === "children") {
                continue;
            }
            let r = l(t);
            if (r !== undefined) {
                o.push(r);
            }
        }
    }
    return s(o);
}
function u(e, t) {
    let r = function e([a, s], r) {
        let [u, c] = r;
        let f = i(a);
        let d = i(u);
        if (n.INTERCEPTION_ROUTE_MARKERS.some((e)=>f.startsWith(e) || d.startsWith(e))) {
            return "";
        }
        if (!o.matchSegment(a, u)) {
            return l(r) ?? "";
        }
        for(let t in s){
            if (c[t]) {
                let r = e(s[t], c[t]);
                if (r !== null) {
                    return `${i(u)}/${r}`;
                }
            }
        }
        return null;
    }(e, t);
    if (r == null || r === "/") {
        return r;
    }
    return s(r.split("/"));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
