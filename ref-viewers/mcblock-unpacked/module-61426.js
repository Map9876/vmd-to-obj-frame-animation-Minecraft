import n from "./module-95704.js";
const SYMBOL_REACT_TRANSITIONAL_ELEMENT = Symbol.for("react.transitional.element");
const SYMBOL_REACT_PORTAL = Symbol.for("react.portal");
export const Fragment = Symbol.for("react.fragment");
export const StrictMode = Symbol.for("react.strict_mode");
export const Profiler = Symbol.for("react.profiler");
const SYMBOL_REACT_CONSUMER = Symbol.for("react.consumer");
const SYMBOL_REACT_CONTEXT = Symbol.for("react.context");
const SYMBOL_REACT_FORWARD_REF = Symbol.for("react.forward_ref");
export const Suspense = Symbol.for("react.suspense");
const SYMBOL_REACT_MEMO = Symbol.for("react.memo");
const SYMBOL_REACT_LAZY = Symbol.for("react.lazy");
const m = {
    isMounted: function() {
        return false;
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
};
const y = {};
export class Component {
    constructor(e, t, r){
        this.props = e;
        this.context = t;
        this.refs = y;
        this.updater = r || m;
    }
    setState(e, t) {
        if (typeof e !== "object" && typeof e !== "function" && e != null) {
            throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
        }
        this.updater.enqueueSetState(this, e, t, "setState");
    }
    forceUpdate(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    }
}
function b() {}
export function PureComponent(e, t, r) {
    this.props = e;
    this.context = t;
    this.refs = y;
    this.updater = r || m;
}
Component.prototype.isReactComponent = {};
b.prototype = Component.prototype;
const R = PureComponent.prototype = new b;
R.constructor = PureComponent;
Object.assign(R, Component.prototype);
R.isPureReactComponent = true;
function P() {}
export const __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = {
    H: null,
    A: null,
    T: null,
    S: null
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
function j(e, key, props) {
    const r_ref = props.ref;
    return {
        $$typeof: SYMBOL_REACT_TRANSITIONAL_ELEMENT,
        type: e,
        key,
        ref: r_ref !== undefined ? r_ref : null,
        props
    };
}
export function isValidElement(e) {
    return typeof e === "object" && e !== null && e.$$typeof === SYMBOL_REACT_TRANSITIONAL_ELEMENT;
}
const x = /\/+/g;
function A(e, t) {
    let r;
    let n;
    if (typeof e === "object" && e !== null && e.key != null) {
        r = `${e.key}`;
        n = {
            "=": "=0",
            ":": "=2"
        };
        return `\$${r.replace(/[=:]/g, (e)=>n[e])}`;
    }
    return t.toString(36);
}
function map(e, t, r) {
    if (e == null) {
        return e;
    }
    const n = [];
    let i = 0;
    (function e(t, r, n, i, s) {
        let l;
        let u;
        let c;
        let f = typeof t;
        if (f === "undefined" || f === "boolean") {
            t = null;
        }
        let d = false;
        if (t === null) {
            d = true;
        } else {
            switch(f){
                case "bigint":
                case "string":
                case "number":
                    d = true;
                    break;
                case "object":
                    switch(t.$$typeof){
                        case SYMBOL_REACT_TRANSITIONAL_ELEMENT:
                        case SYMBOL_REACT_PORTAL:
                            d = true;
                            break;
                        case SYMBOL_REACT_LAZY:
                            return e((d = t._init)(t._payload), r, n, i, s);
                    }
            }
        }
        if (d) {
            s = s(t);
            d = i === "" ? `.${A(t, 0)}` : i;
            if (Array.isArray(s)) {
                n = "";
                if (d != null) {
                    n = `${d.replace(x, "$&/")}/`;
                }
                e(s, r, n, "", function(e) {
                    return e;
                });
            } else if (s != null) {
                if (isValidElement(s)) {
                    l = s;
                    u = n + (s.key == null || t && t.key === s.key ? "" : `${`${s.key}`.replace(x, "$&/")}/`) + d;
                    s = j(l.type, u, l.props);
                }
                r.push(s);
            }
            return 1;
        }
        d = 0;
        const p = i === "" ? "." : `${i}:`;
        if (Array.isArray(t)) {
            for(var m = 0; m < t.length; m++){
                f = p + A(i = t[m], m);
                d += e(i, r, n, f, s);
            }
        } else if (typeof (m = (c = t) === null || typeof c !== "object" ? null : typeof (c = Symbol.iterator && c[Symbol.iterator] || c["@@iterator"]) === "function" ? c : null) === "function") {
            t = m.call(t);
            for(m = 0; !(i = t.next()).done;){
                f = p + A(i = i.value, m++);
                d += e(i, r, n, f, s);
            }
        } else if (f === "object") {
            if (typeof t.then === "function") {
                return e(((e)=>{
                    switch(e.status){
                        case "fulfilled":
                            return e.value;
                        case "rejected":
                            throw e.reason;
                        default:
                            if (typeof e.status === "string") {
                                e.then(P, P);
                            } else {
                                e.status = "pending";
                                e.then((t)=>{
                                    if (e.status === "pending") {
                                        e.status = "fulfilled";
                                        e.value = t;
                                    }
                                }, (t)=>{
                                    if (e.status === "pending") {
                                        e.status = "rejected";
                                        e.reason = t;
                                    }
                                });
                            }
                            switch(e.status){
                                case "fulfilled":
                                    return e.value;
                                case "rejected":
                                    throw e.reason;
                            }
                    }
                    throw e;
                })(t), r, n, i, s);
            }
            throw Error(`Objects are not valid as a React child (found: ${(r = String(t)) === "[object Object]" ? `object with keys {${Object.keys(t).join(", ")}}` : r}). If you meant to render a collection of children, use an array instead.`);
        }
        return d;
    })(e, n, "", "", function(e) {
        return t.call(r, e, i++);
    });
    return n;
}
function _init(e) {
    if (e._status === -1) {
        let t = e._result;
        (t = t()).then((t)=>{
            if (e._status === 0 || e._status === -1) {
                e._status = 1;
                e._result = t;
            }
        }, (t)=>{
            if (e._status === 0 || e._status === -1) {
                e._status = 2;
                e._result = t;
            }
        });
        if (e._status === -1) {
            e._status = 0;
            e._result = t;
        }
    }
    if (e._status === 1) {
        return e._result.default;
    }
    throw e._result;
}
const N = typeof reportError === "function" ? reportError : function(error) {
    if (typeof window === "object" && typeof window.ErrorEvent === "function") {
        const t = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: typeof error === "object" && error !== null && typeof error.message === "string" ? String(error.message) : String(error),
            error
        });
        if (!window.dispatchEvent(t)) {
            return;
        }
    } else if (typeof n === "object" && typeof n.emit === "function") {
        return void n.emit("uncaughtException", error);
    }
    console.error(error);
};
export const Children = {
    map,
    forEach: function(e, t, r) {
        map(e, function() {
            t.apply(this, arguments);
        }, r);
    },
    count: function(e) {
        let t = 0;
        map(e, ()=>{
            t++;
        });
        return t;
    },
    toArray: function(e) {
        return map(e, (e)=>e) || [];
    },
    only: function(e) {
        if (!isValidElement(e)) {
            throw Error("React.Children.only expected to receive a single React element child.");
        }
        return e;
    }
};
export const __COMPILER_RUNTIME = {
    __proto__: null,
    c: function(e) {
        return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useMemoCache(e);
    }
};
export const cache = function(e) {
    return function() {
        return e(...arguments);
    };
};
export const cacheSignal = function() {
    return null;
};
export const cloneElement = function(e, t, r) {
    if (e == null) {
        throw Error(`The argument must be a React element, but you passed ${e}.`);
    }
    const n = {
        ...e.props
    };
    let e_key = e.key;
    if (t != null) {
        if (t.key !== undefined) {
            e_key = `${t.key}`;
        }
        for(o in t){
            if (hasOwnProperty.call(t, o) && o !== "key" && o !== "__self" && o !== "__source" && (o !== "ref" || t.ref !== undefined)) {
                n[o] = t[o];
            }
        }
    }
    var o = arguments.length - 2;
    if (o === 1) {
        n.children = r;
    } else if (o > 1) {
        const i = Array(o);
        for(let s = 0; s < o; s++){
            i[s] = arguments[s + 2];
        }
        n.children = i;
    }
    return j(e.type, e_key, n);
};
export const createContext = function(e) {
    e = {
        $$typeof: SYMBOL_REACT_CONTEXT,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null
    };
    e.Provider = e;
    e.Consumer = {
        $$typeof: SYMBOL_REACT_CONSUMER,
        _context: e
    };
    return e;
};
export const createElement = function(e, t, r) {
    let n;
    const a = {};
    let o = null;
    if (t != null) {
        if (t.key !== undefined) {
            o = `${t.key}`;
        }
        for(n in t){
            if (hasOwnProperty.call(t, n) && n !== "key" && n !== "__self" && n !== "__source") {
                a[n] = t[n];
            }
        }
    }
    let i = arguments.length - 2;
    if (i === 1) {
        a.children = r;
    } else if (i > 1) {
        const s = Array(i);
        for(let l = 0; l < i; l++){
            s[l] = arguments[l + 2];
        }
        a.children = s;
    }
    if (e && e.defaultProps) {
        for(n in i = e.defaultProps){
            if (a[n] === undefined) {
                a[n] = i[n];
            }
        }
    }
    return j(e, o, a);
};
export const createRef = function() {
    return {
        current: null
    };
};
export const forwardRef = function(render) {
    return {
        $$typeof: SYMBOL_REACT_FORWARD_REF,
        render
    };
};
export const lazy = function(_result) {
    return {
        $$typeof: SYMBOL_REACT_LAZY,
        _payload: {
            _status: -1,
            _result
        },
        _init
    };
};
export const memo = function(e, t) {
    return {
        $$typeof: SYMBOL_REACT_MEMO,
        type: e,
        compare: t === undefined ? null : t
    };
};
export const startTransition = function(e) {
    const __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_T = __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.T;
    const r = {};
    __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.T = r;
    try {
        const n = e();
        const a = __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.S;
        if (a !== null) {
            a(r, n);
        }
        if (typeof n === "object" && n !== null && typeof n.then === "function") {
            n.then(P, N);
        }
    } catch (error) {
        N(error);
    } finally{
        if (__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_T !== null && r.types !== null) {
            __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_T.types = r.types;
        }
        __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.T = __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE_T;
    }
};
export const unstable_useCacheRefresh = function() {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useCacheRefresh();
};
export const use = function(e) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.use(e);
};
export const useActionState = function(e, t, r) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useActionState(e, t, r);
};
export const useCallback = function(e, t) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useCallback(e, t);
};
export const useContext = function(e) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useContext(e);
};
export const useDebugValue = function() {};
export const useDeferredValue = function(e, t) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useDeferredValue(e, t);
};
export const useEffect = function(e, t) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useEffect(e, t);
};
export const useId = function() {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useId();
};
export const useImperativeHandle = function(e, t, r) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useImperativeHandle(e, t, r);
};
export const useInsertionEffect = function(e, t) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useInsertionEffect(e, t);
};
export const useLayoutEffect = function(e, t) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useLayoutEffect(e, t);
};
export const useMemo = function(e, t) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useMemo(e, t);
};
export const useOptimistic = function(e, t) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useOptimistic(e, t);
};
export const useReducer = function(e, t, r) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useReducer(e, t, r);
};
export const useRef = function(e) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useRef(e);
};
export const useState = function(e) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useState(e);
};
export const useSyncExternalStore = function(e, t, r) {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useSyncExternalStore(e, t, r);
};
export const useTransition = function() {
    return __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useTransition();
};
export const version = "19.2.0-canary-0bdb9206-20250818";
