(()=>{
    "use strict";
    if (typeof __nccwpck_require__ !== "undefined") {
        __nccwpck_require__.ab = "//";
    }
    var t = {};
    (()=>{
        function e(e, t = {}) {
            for(var r = ((e)=>{
                const t = [];
                for(var index = 0; index < e.length;){
                    const n = e[index];
                    if (n === "*" || n === "+" || n === "?") {
                        t.push({
                            type: "MODIFIER",
                            index,
                            value: e[index++]
                        });
                        continue;
                    }
                    if (n === "\\") {
                        t.push({
                            type: "ESCAPED_CHAR",
                            index: index++,
                            value: e[index++]
                        });
                        continue;
                    }
                    if (n === "{") {
                        t.push({
                            type: "OPEN",
                            index,
                            value: e[index++]
                        });
                        continue;
                    }
                    if (n === "}") {
                        t.push({
                            type: "CLOSE",
                            index,
                            value: e[index++]
                        });
                        continue;
                    }
                    if (n === ":") {
                        let a = "";
                        for(var o = index + 1; o < e.length;){
                            const i = e.charCodeAt(o);
                            if (i >= 48 && i <= 57 || i >= 65 && i <= 90 || i >= 97 && i <= 122 || i === 95) {
                                a += e[o++];
                                continue;
                            }
                            break;
                        }
                        if (!a) {
                            throw TypeError(`Missing parameter name at ${index}`);
                        }
                        t.push({
                            type: "NAME",
                            index,
                            value: a
                        });
                        index = o;
                        continue;
                    }
                    if (n === "(") {
                        let s = 1;
                        let l = "";
                        var o = index + 1;
                        if (e[o] === "?") {
                            throw TypeError(`Pattern cannot start with "?" at ${o}`);
                        }
                        while(o < e.length){
                            if (e[o] === "\\") {
                                l += e[o++] + e[o++];
                                continue;
                            }
                            if (e[o] === ")") {
                                if (--s == 0) {
                                    o++;
                                    break;
                                }
                            } else if (e[o] === "(" && (s++, e[o + 1] !== "?")) {
                                throw TypeError(`Capturing groups are not allowed at ${o}`);
                            }
                            l += e[o++];
                        }
                        if (s) {
                            throw TypeError(`Unbalanced pattern at ${index}`);
                        }
                        if (!l) {
                            throw TypeError(`Missing pattern at ${index}`);
                        }
                        t.push({
                            type: "PATTERN",
                            index,
                            value: l
                        });
                        index = o;
                        continue;
                    }
                    t.push({
                        type: "CHAR",
                        index,
                        value: e[index++]
                    });
                }
                t.push({
                    type: "END",
                    index,
                    value: ""
                });
                return t;
            })(e), n = t.prefixes, o = n === undefined ? "./" : n, i = t.delimiter, s = i === undefined ? "/#?" : i, l = [], u = 0, c = 0, f = "", d = (e)=>{
                if (c < r.length && r[c].type === e) {
                    return r[c++].value;
                }
            }, p = (e)=>{
                const t = d(e);
                if (t !== undefined) {
                    return t;
                }
                const n = r[c];
                const { type, index } = n;
                throw TypeError(`Unexpected ${type} at ${index}, expected ${e}`);
            }, h = ()=>{
                let e;
                let t = "";
                while(e = d("CHAR") || d("ESCAPED_CHAR")){
                    t += e;
                }
                return t;
            }, _ = (e)=>{
                for (const r of s){
                    if (e.indexOf(r) > -1) {
                        return true;
                    }
                }
                return false;
            }, m = (prefix)=>{
                const t = l[l.length - 1];
                const r = prefix || (t && typeof t === "string" ? t : "");
                if (t && !r) {
                    throw TypeError(`Must have text between two parameters, missing text after "${t.name}"`);
                }
                if (!r || _(r)) {
                    return `[^${a(s)}]+?`;
                }
                return `(?:(?!${a(r)})[^${a(s)}])+?`;
            }; c < r.length;){
                const g = d("CHAR");
                const y = d("NAME");
                const v = d("PATTERN");
                if (y || v) {
                    var prefix = g || "";
                    if (o.indexOf(prefix) === -1) {
                        f += prefix;
                        prefix = "";
                    }
                    if (f) {
                        l.push(f);
                        f = "";
                    }
                    l.push({
                        name: y || u++,
                        prefix,
                        suffix: "",
                        pattern: v || m(prefix),
                        modifier: d("MODIFIER") || ""
                    });
                    continue;
                }
                const E = g || d("ESCAPED_CHAR");
                if (E) {
                    f += E;
                    continue;
                }
                if (f) {
                    l.push(f);
                    f = "";
                }
                if (d("OPEN")) {
                    var prefix = h();
                    const R = d("NAME") || "";
                    const S = d("PATTERN") || "";
                    const suffix = h();
                    p("CLOSE");
                    l.push({
                        name: R || (S ? u++ : ""),
                        pattern: R && !S ? m(prefix) : S,
                        prefix,
                        suffix,
                        modifier: d("MODIFIER") || ""
                    });
                    continue;
                }
                p("END");
            }
            return l;
        }
        function r(e, t = {}) {
            const r = o(t);
            const t_encode = t.encode;
            const a = t_encode === undefined ? (e)=>e : t_encode;
            const t_validate = t.validate;
            const s = t_validate === undefined || t_validate;
            const l = e.map((e)=>{
                if (typeof e === "object") {
                    return new RegExp(`^(?:${e.pattern})\$`, r);
                }
            });
            return function(t) {
                let r = "";
                for(let n = 0; n < e.length; n++){
                    const o = e[n];
                    if (typeof o === "string") {
                        r += o;
                        continue;
                    }
                    const i = t ? t[o.name] : undefined;
                    const u = o.modifier === "?" || o.modifier === "*";
                    const c = o.modifier === "*" || o.modifier === "+";
                    if (Array.isArray(i)) {
                        if (!c) {
                            throw TypeError(`Expected "${o.name}" to not repeat, but got an array`);
                        }
                        if (i.length === 0) {
                            if (u) {
                                continue;
                            }
                            throw TypeError(`Expected "${o.name}" to not be empty`);
                        }
                        for(let f = 0; f < i.length; f++){
                            var d = a(i[f], o);
                            if (s && !l[n].test(d)) {
                                throw TypeError(`Expected all "${o.name}" to match "${o.pattern}", but got "${d}"`);
                            }
                            r += o.prefix + d + o.suffix;
                        }
                        continue;
                    }
                    if (typeof i === "string" || typeof i === "number") {
                        var d = a(String(i), o);
                        if (s && !l[n].test(d)) {
                            throw TypeError(`Expected "${o.name}" to match "${o.pattern}", but got "${d}"`);
                        }
                        r += o.prefix + d + o.suffix;
                        continue;
                    }
                    if (!u) {
                        const p = c ? "an array" : "a string";
                        throw TypeError(`Expected "${o.name}" to be ${p}`);
                    }
                }
                return r;
            };
        }
        function n(e, t, { decode = function(e) {
            return e;
        } } = {}) {
            return function(r) {
                const n = e.exec(r);
                if (!n) {
                    return false;
                }
                const path = n[0];
                const n_index = n.index;
                const params = Object.create(null);
                for(let l = 1; l < n.length; l++){
                    ((e)=>{
                        if (n[e] !== undefined) {
                            const r = t[e - 1];
                            if (r.modifier === "*" || r.modifier === "+") {
                                params[r.name] = n[e].split(r.prefix + r.suffix).map((e)=>decode(e, r));
                            } else {
                                params[r.name] = decode(n[e], r);
                            }
                        }
                    })(l);
                }
                return {
                    path,
                    index: n_index,
                    params
                };
            };
        }
        function a(e) {
            return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
        }
        function o(e) {
            if (e && e.sensitive) {
                return "";
            }
            return "i";
        }
        function i(e, t, r = {}) {
            const r_strict = r.strict;
            const i = r_strict !== undefined && r_strict;
            const { start, end, encode } = r;
            const c = encode === undefined ? (e)=>e : encode;
            const { delimiter, endsWith } = r;
            const p = `[${a(endsWith === undefined ? "" : endsWith)}]|\$`;
            const h = `[${a(delimiter === undefined ? "/#?" : delimiter)}]`;
            let _ = start === undefined || start ? "^" : "";
            for (const g of e){
                if (typeof g === "string") {
                    _ += a(c(g));
                } else {
                    const y = a(c(g.prefix));
                    const v = a(c(g.suffix));
                    if (g.pattern) {
                        if (t) {
                            t.push(g);
                        }
                        if (y || v) {
                            if (g.modifier === "+" || g.modifier === "*") {
                                const b = g.modifier === "*" ? "?" : "";
                                _ += `(?:${y}((?:${g.pattern})(?:${v}${y}(?:${g.pattern}))*)${v})${b}`;
                            } else {
                                _ += `(?:${y}(${g.pattern})${v})${g.modifier}`;
                            }
                        } else {
                            if (g.modifier === "+" || g.modifier === "*") {
                                throw TypeError(`Can not repeat "${g.name}" without a prefix and suffix`);
                            }
                            _ += `(${g.pattern})${g.modifier}`;
                        }
                    } else {
                        _ += `(?:${y}${v})${g.modifier}`;
                    }
                }
            }
            if (end === undefined || end) {
                if (!i) {
                    _ += `${h}?`;
                }
                _ += r.endsWith ? `(?=${p})` : "$";
            } else {
                const E = e[e.length - 1];
                const R = typeof E === "string" ? h.indexOf(E[E.length - 1]) > -1 : E === undefined;
                if (!i) {
                    _ += `(?:${h}(?=${p}))?`;
                }
                if (!R) {
                    _ += `(?=${h}|${p})`;
                }
            }
            return new RegExp(_, o(r));
        }
        function s(t, r, n) {
            if (t instanceof RegExp) {
                var a;
                if (!r) {
                    return t;
                }
                const l = /\((?:\?<(.*?)>)?(?!\?)/g;
                let u = 0;
                for(let c = l.exec(t.source); c;){
                    r.push({
                        name: c[1] || u++,
                        prefix: "",
                        suffix: "",
                        modifier: "",
                        pattern: ""
                    });
                    c = l.exec(t.source);
                }
                return t;
            }
            if (Array.isArray(t)) {
                a = t.map((e)=>s(e, r, n).source);
                return new RegExp(`(?:${a.join("|")})`, o(n));
            }
            return i(e(t, n), r, n);
        }
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        t.pathToRegexp = t.tokensToRegexp = t.regexpToFunction = t.match = t.tokensToFunction = t.compile = t.parse = undefined;
        t.parse = e;
        t.compile = function(t, n) {
            return r(e(t, n), n);
        };
        t.tokensToFunction = r;
        t.match = function(e, t) {
            const r = [];
            return n(s(e, r, t), r, t);
        };
        t.regexpToFunction = n;
        t.tokensToRegexp = i;
        t.pathToRegexp = s;
    })();
    module.exports = t;
})();
