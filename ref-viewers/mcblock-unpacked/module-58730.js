import { __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE } from "./module-61426.js";
function a(e) {
    let t = `https://react.dev/errors/${e}`;
    if (arguments.length > 1) {
        t += `?args[]=${encodeURIComponent(arguments[1])}`;
        for(let r = 2; r < arguments.length; r++){
            t += `&args[]=${encodeURIComponent(arguments[r])}`;
        }
    }
    return `Minified React error #${e}; visit ${t} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`;
}
function o() {}
export const __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = {
    d: {
        f: o,
        r: function() {
            throw Error(a(522));
        },
        D: o,
        C: o,
        L: o,
        m: o,
        X: o,
        S: o,
        M: o
    },
    p: 0,
    findDOMNode: null
};
const SYMBOL_REACT_PORTAL = Symbol.for("react.portal");
const __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_1 = __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function u(e, crossOrigin) {
    if (e === "font") {
        return "";
    }
    if (typeof crossOrigin === "string") {
        if (crossOrigin === "use-credentials") {
            return crossOrigin;
        }
        return "";
    }
}
export const createPortal = function(e, t, r = null) {
    if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) {
        throw Error(a(299));
    }
    return ((children, containerInfo, implementation, n = null)=>({
            $$typeof: SYMBOL_REACT_PORTAL,
            key: n == null ? null : `${n}`,
            children,
            containerInfo,
            implementation
        }))(e, t, null, r);
};
export const flushSync = function(e) {
    const __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_1_T = __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_1.T;
    const __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_p = __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.p;
    try {
        __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_1.T = null;
        __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.p = 2;
        if (e) {
            return e();
        }
    } finally{
        __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_1.T = __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_1_T;
        __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.p = __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_p;
        __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.d.f();
    }
};
export const preconnect = function(e, t) {
    if (typeof e === "string") {
        t = t ? typeof (t = t.crossOrigin) === "string" ? t === "use-credentials" ? t : "" : undefined : null;
        __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.d.C(e, t);
    }
};
export const prefetchDNS = function(e) {
    if (typeof e === "string") {
        __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.d.D(e);
    }
};
export const preinit = function(e, t) {
    if (typeof e === "string" && t && typeof t.as === "string") {
        const r = t.as;
        const n = u(r, t.crossOrigin);
        const integrity = typeof t.integrity === "string" ? t.integrity : undefined;
        const fetchPriority = typeof t.fetchPriority === "string" ? t.fetchPriority : undefined;
        if (r === "style") {
            __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.d.S(e, typeof t.precedence === "string" ? t.precedence : undefined, {
                crossOrigin: n,
                integrity,
                fetchPriority
            });
        } else if (r === "script") {
            __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.d.X(e, {
                crossOrigin: n,
                integrity,
                fetchPriority,
                nonce: typeof t.nonce === "string" ? t.nonce : undefined
            });
        }
    }
};
export const preinitModule = function(e, t) {
    if (typeof e === "string") {
        if (typeof t === "object" && t !== null) {
            if (t.as == null || t.as === "script") {
                const r = u(t.as, t.crossOrigin);
                __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.d.M(e, {
                    crossOrigin: r,
                    integrity: typeof t.integrity === "string" ? t.integrity : undefined,
                    nonce: typeof t.nonce === "string" ? t.nonce : undefined
                });
            }
        } else {
            if (t == null) {
                __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.d.M(e);
            }
        }
    }
};
export const preload = function(e, t) {
    if (typeof e === "string" && typeof t === "object" && t !== null && typeof t.as === "string") {
        const r = t.as;
        const n = u(r, t.crossOrigin);
        __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.d.L(e, r, {
            crossOrigin: n,
            integrity: typeof t.integrity === "string" ? t.integrity : undefined,
            nonce: typeof t.nonce === "string" ? t.nonce : undefined,
            type: typeof t.type === "string" ? t.type : undefined,
            fetchPriority: typeof t.fetchPriority === "string" ? t.fetchPriority : undefined,
            referrerPolicy: typeof t.referrerPolicy === "string" ? t.referrerPolicy : undefined,
            imageSrcSet: typeof t.imageSrcSet === "string" ? t.imageSrcSet : undefined,
            imageSizes: typeof t.imageSizes === "string" ? t.imageSizes : undefined,
            media: typeof t.media === "string" ? t.media : undefined
        });
    }
};
export const preloadModule = function(e, t) {
    if (typeof e === "string") {
        if (t) {
            const r = u(t.as, t.crossOrigin);
            __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.d.m(e, {
                as: typeof t.as === "string" && t.as !== "script" ? t.as : undefined,
                crossOrigin: r,
                integrity: typeof t.integrity === "string" ? t.integrity : undefined
            });
        } else {
            __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.d.m(e);
        }
    }
};
export const requestFormReset = function(e) {
    __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.d.r(e);
};
export const unstable_batchedUpdates = function(e, t) {
    return e(t);
};
export const useFormState = function(e, t, r) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_1.H.useFormState(e, t, r);
};
export const useFormStatus = function() {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_1.H.useHostTransitionStatus();
};
export const version = "19.2.0-canary-0bdb9206-20250818";
