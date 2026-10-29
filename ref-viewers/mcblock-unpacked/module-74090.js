import "./module-32505.js";
import "./module-31520.js";
import u from "./module-10208.js";
import s from "./module-50954.js";
import i from "./module-7398.js";
import c from "./module-72057.js";
import l from "./module-27573.js";
import f from "./module-48618.js";
import module_41216 from "./module-41216.js";
export const adapterErrorHandler = function(e, t) {
    if (e) {
        return Object.keys(e).reduce((acc, key)=>{
            acc[key] = async function r() {
                let a;
                let args;
                let s;
                let i;
                let c;
                const l = arguments;
                try {
                    args = Array(a = l.length);
                    for(s = 0; s < a; s++){
                        args[s] = l[s];
                    }
                    t.debug(`adapter_${key}`, {
                        args
                    });
                    i = e[key];
                    return await i(...args);
                } catch (error) {
                    t.error(`adapter_error_${key}`, error);
                    c = new UnknownError(error);
                    c.name = `${capitalize(key)}Error`;
                    throw c;
                }
            };
            return acc;
        }, {});
    }
};
export const eventsErrorHandler = function(e, t) {
    return Object.keys(e).reduce((acc, key)=>{
        acc[key] = async function r() {
            let a;
            const u = arguments;
            try {
                a = e[key];
                return await a(...u);
            } catch (error) {
                t.error(`${upperSnake(key)}_EVENT_ERROR`, error);
            }
        };
        return acc;
    }, {});
};
function p(e, t, r) {
    t = l(t);
    return c(e, d() ? Reflect.construct(t, r || [], l(e).constructor) : t.apply(e, r));
}
function d() {
    try {
        var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (e) {}
    return (d = function() {
        return !!e;
    })();
}
export var UnknownError = ((e)=>{
    function t(e) {
        let n;
        s(this, t);
        n = p(this, t, [
            e?.message ?? e
        ]);
        n.name = "UnknownError";
        n.code = e.code;
        if (e instanceof Error) {
            n.stack = e.stack;
        }
        return n;
    }
    f(t, e);
    return i(t, [
        {
            key: "toJSON",
            value: function() {
                return {
                    name: this.name,
                    message: this.message,
                    stack: this.stack
                };
            }
        }
    ]);
})(module_41216(Error));
export function upperSnake(e) {
    return e.replace(/([A-Z])/g, "_$1").toUpperCase();
}
export function capitalize(e) {
    return `${e[0].toUpperCase()}${e.slice(1)}`;
}
export const OAuthCallbackError = ((UnknownError_1)=>{
    function t(...n) {
        let e;
        s(this, t);
        e = p(this, t, [
            ...n
        ]);
        u(e, "name", "OAuthCallbackError");
        return e;
    }
    f(t, UnknownError_1);
    return i(t);
})(UnknownError);
export const AccountNotLinkedError = ((UnknownError_1)=>{
    function t(...n) {
        let e;
        s(this, t);
        e = p(this, t, [
            ...n
        ]);
        u(e, "name", "AccountNotLinkedError");
        return e;
    }
    f(t, UnknownError_1);
    return i(t);
})(UnknownError);
export const MissingAPIRoute = ((UnknownError_1)=>{
    function t(...n) {
        let e;
        s(this, t);
        e = p(this, t, [
            ...n
        ]);
        u(e, "name", "MissingAPIRouteError");
        u(e, "code", "MISSING_NEXTAUTH_API_ROUTE_ERROR");
        return e;
    }
    f(t, UnknownError_1);
    return i(t);
})(UnknownError);
export const MissingSecret = ((UnknownError_1)=>{
    function t(...n) {
        let e;
        s(this, t);
        e = p(this, t, [
            ...n
        ]);
        u(e, "name", "MissingSecretError");
        u(e, "code", "NO_SECRET");
        return e;
    }
    f(t, UnknownError_1);
    return i(t);
})(UnknownError);
export const MissingAuthorize = ((UnknownError_1)=>{
    function t(...n) {
        let e;
        s(this, t);
        e = p(this, t, [
            ...n
        ]);
        u(e, "name", "MissingAuthorizeError");
        u(e, "code", "CALLBACK_CREDENTIALS_HANDLER_ERROR");
        return e;
    }
    f(t, UnknownError_1);
    return i(t);
})(UnknownError);
export const MissingAdapter = ((UnknownError_1)=>{
    function t(...n) {
        let e;
        s(this, t);
        e = p(this, t, [
            ...n
        ]);
        u(e, "name", "MissingAdapterError");
        u(e, "code", "EMAIL_REQUIRES_ADAPTER_ERROR");
        return e;
    }
    f(t, UnknownError_1);
    return i(t);
})(UnknownError);
export const MissingAdapterMethods = ((UnknownError_1)=>{
    function t(...n) {
        let e;
        s(this, t);
        e = p(this, t, [
            ...n
        ]);
        u(e, "name", "MissingAdapterMethodsError");
        u(e, "code", "MISSING_ADAPTER_METHODS_ERROR");
        return e;
    }
    f(t, UnknownError_1);
    return i(t);
})(UnknownError);
export const UnsupportedStrategy = ((UnknownError_1)=>{
    function t(...n) {
        let e;
        s(this, t);
        e = p(this, t, [
            ...n
        ]);
        u(e, "name", "UnsupportedStrategyError");
        u(e, "code", "CALLBACK_CREDENTIALS_JWT_ERROR");
        return e;
    }
    f(t, UnknownError_1);
    return i(t);
})(UnknownError);
export const InvalidCallbackUrl = ((UnknownError_1)=>{
    function t(...n) {
        let e;
        s(this, t);
        e = p(this, t, [
            ...n
        ]);
        u(e, "name", "InvalidCallbackUrl");
        u(e, "code", "INVALID_CALLBACK_URL_ERROR");
        return e;
    }
    f(t, UnknownError_1);
    return i(t);
})(UnknownError);
