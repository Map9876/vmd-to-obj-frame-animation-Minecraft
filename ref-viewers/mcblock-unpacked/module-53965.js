(()=>{
    const t = {
        229: function(e) {
            let t;
            let r;
            let n;
            const a = e.exports = {};
            function o() {
                throw Error("setTimeout has not been defined");
            }
            function i() {
                throw Error("clearTimeout has not been defined");
            }
            try {
                t = typeof setTimeout === "function" ? setTimeout : o;
            } catch (e) {
                t = o;
            }
            try {
                r = typeof clearTimeout === "function" ? clearTimeout : i;
            } catch (e) {
                r = i;
            }
            function s(e) {
                if (t === setTimeout) {
                    return setTimeout(e, 0);
                }
                if ((t === o || !t) && setTimeout) {
                    t = setTimeout;
                    return setTimeout(e, 0);
                }
                try {
                    return t(e, 0);
                } catch (r) {
                    try {
                        return t.call(null, e, 0);
                    } catch (r) {
                        return t.call(this, e, 0);
                    }
                }
            }
            let l = [];
            let u = false;
            let c = -1;
            function f() {
                if (u && n) {
                    u = false;
                    if (n.length) {
                        l = n.concat(l);
                    } else {
                        c = -1;
                    }
                    if (l.length) {
                        d();
                    }
                }
            }
            function d() {
                if (!u) {
                    const e = s(f);
                    u = true;
                    for(let t = l.length; t;){
                        n = l;
                        for(l = []; ++c < t;){
                            if (n) {
                                n[c].run();
                            }
                        }
                        c = -1;
                        t = l.length;
                    }
                    n = null;
                    u = false;
                    (function(e) {
                        if (r === clearTimeout) {
                            return clearTimeout(e);
                        }
                        if ((r === i || !r) && clearTimeout) {
                            r = clearTimeout;
                            return clearTimeout(e);
                        }
                        try {
                            r(e);
                        } catch (t) {
                            try {
                                return r.call(null, e);
                            } catch (t) {
                                return r.call(this, e);
                            }
                        }
                    })(e);
                }
            }
            class p {
                constructor(e, t){
                    this.fun = e;
                    this.array = t;
                }
                run() {
                    this.fun.apply(null, this.array);
                }
            }
            function h() {}
            a.nextTick = function(e) {
                const t = Array(arguments.length - 1);
                if (arguments.length > 1) {
                    for(let r = 1; r < arguments.length; r++){
                        t[r - 1] = arguments[r];
                    }
                }
                l.push(new p(e, t));
                if (!(l.length !== 1 || u)) {
                    s(d);
                }
            };
            a.title = "browser";
            a.browser = true;
            a.env = {};
            a.argv = [];
            a.version = "";
            a.versions = {};
            a.on = h;
            a.addListener = h;
            a.once = h;
            a.off = h;
            a.removeListener = h;
            a.removeAllListeners = h;
            a.emit = h;
            a.prependListener = h;
            a.prependOnceListener = h;
            a.listeners = function(e) {
                return [];
            };
            a.binding = function(e) {
                throw Error("process.binding is not supported");
            };
            a.cwd = function() {
                return "/";
            };
            a.chdir = function(e) {
                throw Error("process.chdir is not supported");
            };
            a.umask = function() {
                return 0;
            };
        }
    };
    const r = {};
    function n(e) {
        const a = r[e];
        if (a !== undefined) {
            return a.exports;
        }
        const o = r[e] = {
            exports: {}
        };
        let i = true;
        try {
            t[e](o, o.exports, n);
            i = false;
        } finally{
            if (i) {
                delete r[e];
            }
        }
        return o.exports;
    }
    n.ab = "//";
    module.exports = n(229);
})();
