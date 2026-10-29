import { n as n_1, r, s } from "../jsx-runtime-Db0DjQYK.js";
import { O, a, i, o, p as p_1, t as t_1 } from "../useStore-DX_rDZVw.js";
const l = r((t)=>{
    var n = n_1();
    function r(e) {
        let t = `https://react.dev/errors/` + e;
        if (arguments.length > 1) {
            t += `?args[]=` + encodeURIComponent(arguments[1]);
            for(let n = 2; n < arguments.length; n++){
                t += `&args[]=` + encodeURIComponent(arguments[n]);
            }
        }
        return `Minified React error #` + e + `; visit ` + t + ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`;
    }
    function i() {}
    var a = {
        d: {
            f: i,
            r: function() {
                throw Error(r(522));
            },
            D: i,
            C: i,
            L: i,
            m: i,
            X: i,
            S: i,
            M: i
        },
        p: 0,
        findDOMNode: null
    };
    var $$typeof = Symbol.for(`react.portal`);
    function s(children, containerInfo, implementation, r = null) {
        return {
            $$typeof,
            key: r == null ? null : `` + r,
            children,
            containerInfo,
            implementation
        };
    }
    var n___CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function l(e, crossOrigin) {
        if (e === `font`) {
            return ``;
        }
        if (typeof crossOrigin == `string`) {
            if (crossOrigin === `use-credentials`) {
                return crossOrigin;
            }
            return ``;
        }
    }
    t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a;
    t.createPortal = function(e, t, n = null) {
        if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) {
            throw Error(r(299));
        }
        return s(e, t, null, n);
    };
    t.flushSync = function(e) {
        const n___CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_T = n___CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.T;
        const n = a.p;
        try {
            n___CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.T = null;
            a.p = 2;
            if (e) {
                return e();
            }
        } finally{
            n___CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.T = n___CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_T;
            a.p = n;
            a.d.f();
        }
    };
    t.preconnect = function(e, t) {
        if (typeof e == `string`) {
            if (t) {
                t = t.crossOrigin;
                t = typeof t == `string` ? t === `use-credentials` ? t : `` : undefined;
            } else {
                t = null;
            }
            a.d.C(e, t);
        }
    };
    t.prefetchDNS = function(e) {
        if (typeof e == `string`) {
            a.d.D(e);
        }
    };
    t.preinit = function(e, t) {
        if (typeof e == `string` && t && typeof t.as == `string`) {
            const n = t.as;
            const r = l(n, t.crossOrigin);
            const integrity = typeof t.integrity == `string` ? t.integrity : undefined;
            const fetchPriority = typeof t.fetchPriority == `string` ? t.fetchPriority : undefined;
            if (n === `style`) {
                a.d.S(e, typeof t.precedence == `string` ? t.precedence : undefined, {
                    crossOrigin: r,
                    integrity,
                    fetchPriority
                });
            } else if (n === `script`) {
                a.d.X(e, {
                    crossOrigin: r,
                    integrity,
                    fetchPriority,
                    nonce: typeof t.nonce == `string` ? t.nonce : undefined
                });
            }
        }
    };
    t.preinitModule = function(e, t) {
        if (typeof e == `string`) {
            if (typeof t == `object` && t) {
                if (t.as == null || t.as === `script`) {
                    const n = l(t.as, t.crossOrigin);
                    a.d.M(e, {
                        crossOrigin: n,
                        integrity: typeof t.integrity == `string` ? t.integrity : undefined,
                        nonce: typeof t.nonce == `string` ? t.nonce : undefined
                    });
                }
            } else {
                t ?? a.d.M(e);
            }
        }
    };
    t.preload = function(e, t) {
        if (typeof e == `string` && typeof t == `object` && t && typeof t.as == `string`) {
            const n = t.as;
            const r = l(n, t.crossOrigin);
            a.d.L(e, n, {
                crossOrigin: r,
                integrity: typeof t.integrity == `string` ? t.integrity : undefined,
                nonce: typeof t.nonce == `string` ? t.nonce : undefined,
                type: typeof t.type == `string` ? t.type : undefined,
                fetchPriority: typeof t.fetchPriority == `string` ? t.fetchPriority : undefined,
                referrerPolicy: typeof t.referrerPolicy == `string` ? t.referrerPolicy : undefined,
                imageSrcSet: typeof t.imageSrcSet == `string` ? t.imageSrcSet : undefined,
                imageSizes: typeof t.imageSizes == `string` ? t.imageSizes : undefined,
                media: typeof t.media == `string` ? t.media : undefined
            });
        }
    };
    t.preloadModule = function(e, t) {
        if (typeof e == `string`) {
            if (t) {
                const n = l(t.as, t.crossOrigin);
                a.d.m(e, {
                    as: typeof t.as == `string` && t.as !== `script` ? t.as : undefined,
                    crossOrigin: n,
                    integrity: typeof t.integrity == `string` ? t.integrity : undefined
                });
            } else {
                a.d.m(e);
            }
        }
    };
    t.requestFormReset = function(e) {
        a.d.r(e);
    };
    t.unstable_batchedUpdates = function(e, t) {
        return e(t);
    };
    t.useFormState = function(e, t, n) {
        return n___CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useFormState(e, t, n);
    };
    t.useFormStatus = function() {
        return n___CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useHostTransitionStatus();
    };
    t.version = `19.2.4`;
});
export const u = r((e, t)=>{
    function n() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`)) {
            try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
            } catch (error) {
                console.error(error);
            }
        }
    }
    n();
    t.exports = l();
});
const d = s(n_1(), 1);
const f = {
    get () {},
    subscribe () {
        return {
            unsubscribe () {}
        };
    }
};
export function p(e, t) {
    let nRef = d.useRef();
    return (i)=>{
        let a = e?.select ? e.select(i) : i;
        if (e?.structuralSharing ?? t.options.defaultStructuralSharing) {
            return nRef.current = O(nRef.current, a);
        }
        return a;
    };
}
export function m(e) {
    let t = o();
    let n = d.useContext(e.from ? i : a);
    let r = e.from ? t.stores.getRouteMatchStore(e.from) : t.stores.matchStores.get(n);
    let l = p(e, t);
    let u = t_1(r ?? f, (e)=>{
        if (e) {
            return l(e);
        }
        return f;
    });
    if (u !== f) {
        return u;
    }
    if (e.shouldThrow ?? true) {
        p_1();
    }
}
export function h(e) {
    return m({
        from: e.from,
        shouldThrow: e.shouldThrow,
        structuralSharing: e.structuralSharing,
        strict: e.strict,
        select: (t)=>{
            let n = e.strict === false ? t.params : t._strictParams;
            if (e.select) {
                return e.select(n);
            }
            return n;
        }
    });
}
