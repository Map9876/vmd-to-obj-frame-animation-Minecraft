(()=>{
    "use strict";
    if (typeof __nccwpck_require__ !== "undefined") {
        __nccwpck_require__.ab = "//";
    }
    var t = {};
    (()=>{
        t.parse = function(t, r) {
            if (typeof t !== "string") {
                throw TypeError("argument str must be a string");
            }
            const a = {};
            for(let o = t.split(n), i = (r || {}).decode || e, s = 0; s < o.length; s++){
                const l = o[s];
                let u = l.indexOf("=");
                if (!(u < 0)) {
                    const c = l.substr(0, u).trim();
                    let f = l.substr(++u, l.length).trim();
                    if (f[0] == '"') {
                        f = f.slice(1, -1);
                    }
                    if (a[c] == undefined) {
                        a[c] = ((e, t)=>{
                            try {
                                return t(e);
                            } catch (t) {
                                return e;
                            }
                        })(f, i);
                    }
                }
            }
            return a;
        };
        t.serialize = function(e, t, n) {
            const o = n || {};
            const i = o.encode || r;
            if (typeof i !== "function") {
                throw TypeError("option encode is invalid");
            }
            if (!a.test(e)) {
                throw TypeError("argument name is invalid");
            }
            const s = i(t);
            if (s && !a.test(s)) {
                throw TypeError("argument val is invalid");
            }
            let l = `${e}=${s}`;
            if (o.maxAge != null) {
                const u = o.maxAge - 0;
                if (isNaN(u) || !isFinite(u)) {
                    throw TypeError("option maxAge is invalid");
                }
                l += `; Max-Age=${Math.floor(u)}`;
            }
            if (o.domain) {
                if (!a.test(o.domain)) {
                    throw TypeError("option domain is invalid");
                }
                l += `; Domain=${o.domain}`;
            }
            if (o.path) {
                if (!a.test(o.path)) {
                    throw TypeError("option path is invalid");
                }
                l += `; Path=${o.path}`;
            }
            if (o.expires) {
                if (typeof o.expires.toUTCString !== "function") {
                    throw TypeError("option expires is invalid");
                }
                l += `; Expires=${o.expires.toUTCString()}`;
            }
            if (o.httpOnly) {
                l += "; HttpOnly";
            }
            if (o.secure) {
                l += "; Secure";
            }
            if (o.sameSite) {
                switch(typeof o.sameSite === "string" ? o.sameSite.toLowerCase() : o.sameSite){
                    case true:
                    case "strict":
                        l += "; SameSite=Strict";
                        break;
                    case "lax":
                        l += "; SameSite=Lax";
                        break;
                    case "none":
                        l += "; SameSite=None";
                        break;
                    default:
                        throw TypeError("option sameSite is invalid");
                }
            }
            return l;
        };
        var e = decodeURIComponent;
        var r = encodeURIComponent;
        var n = /; */;
        var a = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    })();
    module.exports = t;
})();
