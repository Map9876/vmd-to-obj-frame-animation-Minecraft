"use strict";
const n = require("./module-47650.js");
const a = {
    stream: true
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const i = new Map;
function s(e) {
    const t = require(e);
    if (typeof t.then !== "function" || t.status === "fulfilled") {
        return null;
    }
    t.then((e)=>{
        t.status = "fulfilled";
        t.value = e;
    }, (e)=>{
        t.status = "rejected";
        t.reason = e;
    });
    return t;
}
function l() {}
function u(e) {
    for(var t = e[1], n = [], a = 0; a < t.length;){
        const o = t[a++];
        let u = t[a++];
        let c = i.get(o);
        if (c === undefined) {
            f.set(o, u);
            u = require.e(o);
            n.push(u);
            c = i.set.bind(i, o, null);
            u.then(c, l);
            i.set(o, u);
        } else if (c !== null) {
            n.push(c);
        }
    }
    if (e.length === 4) {
        if (n.length === 0) {
            return s(e[0]);
        }
        return Promise.all(n).then(()=>s(e[0]));
    }
    if (n.length > 0) {
        return Promise.all(n);
    }
    return null;
}
function c(e) {
    let t = require(e[0]);
    if (e.length === 4 && typeof t.then === "function") {
        if (t.status === "fulfilled") {
            t = t.value;
        } else {
            throw t.reason;
        }
    }
    if (e[2] === "*") {
        return t;
    }
    if (e[2] === "") {
        if (t.__esModule) {
            return t.default;
        }
        return t;
    }
    if (hasOwnProperty.call(t, e[2])) {
        return t[e[2]];
    }
}
var f = new Map;
const require_u = require.u;
require.u = function(e) {
    const t = f.get(e);
    if (t !== undefined) {
        return t;
    }
    return require_u(e);
};
const n___DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
const SYMBOL_REACT_TRANSITIONAL_ELEMENT = Symbol.for("react.transitional.element");
const SYMBOL_REACT_LAZY = Symbol.for("react.lazy");
const E = new WeakMap;
function R(e, id, bound) {
    if (!E.has(e)) {
        E.set(e, {
            id,
            originalBind: e.bind,
            bound
        });
    }
}
function S(e, t, r) {
    this.status = e;
    this.value = t;
    this.reason = r;
}
function _init(e) {
    switch(e.status){
        case "resolved_model":
            I(e);
            break;
        case "resolved_module":
            D(e);
    }
    switch(e.status){
        case "fulfilled":
            return e.value;
        case "pending":
        case "blocked":
        case "halted":
            throw e;
        default:
            throw e.reason;
    }
}
function O(e, t) {
    for (const n of e){
        if (typeof n === "function") {
            n(t);
        } else {
            F(n, t);
        }
    }
}
function T(e, t) {
    for (const n of e){
        if (typeof n === "function") {
            n(t);
        } else {
            $(n, t);
        }
    }
}
function j(e, t) {
    let chunk = t.handler.chunk;
    if (chunk === null) {
        return null;
    }
    if (chunk === e) {
        return t.handler;
    }
    if ((t = chunk.value) !== null) {
        for(chunk = 0; chunk < t.length; chunk++){
            let n = t[chunk];
            if (typeof n !== "function" && (n = j(e, n)) !== null) {
                return n;
            }
        }
    }
    return null;
}
function w(e, t, r) {
    switch(e.status){
        case "fulfilled":
            O(t, e.value);
            break;
        case "blocked":
            for(var n = 0; n < t.length; n++){
                let a = t[n];
                if (typeof a !== "function") {
                    const o = j(e, a);
                    if (o !== null) {
                        F(a, o.value);
                        t.splice(n, 1);
                        n--;
                        if (r !== null && (a = r.indexOf(a)) !== -1) {
                            r.splice(a, 1);
                        }
                        switch(e.status){
                            case "fulfilled":
                                O(t, e.value);
                                return;
                            case "rejected":
                                if (r !== null) {
                                    T(r, e.reason);
                                }
                                return;
                        }
                    }
                }
            }
        case "pending":
            if (e.value) {
                for(n = 0; n < t.length; n++){
                    e.value.push(t[n]);
                }
            } else {
                e.value = t;
            }
            if (e.reason) {
                if (r) {
                    for(t = 0; t < r.length; t++){
                        e.reason.push(r[t]);
                    }
                }
            } else {
                e.reason = r;
            }
            break;
        case "rejected":
            if (r) {
                T(r, e.reason);
            }
    }
}
function x(e, t, r) {
    if (t.status !== "pending" && t.status !== "blocked") {
        t.reason.error(r);
    } else {
        e = t.reason;
        t.status = "rejected";
        t.reason = r;
        if (e !== null) {
            T(e, r);
        }
    }
}
function A(e, t, r) {
    return new S("resolved_model", `${(r ? '{"done":true,"value":' : '{"done":false,"value":') + t}}`, e);
}
function C(e, t, r, n) {
    M(e, t, `${(n ? '{"done":true,"value":' : '{"done":false,"value":') + r}}`);
}
function M(e, t, r) {
    if (t.status !== "pending") {
        t.reason.enqueueModel(r);
    } else {
        const { value, reason } = t;
        t.status = "resolved_model";
        t.value = r;
        t.reason = e;
        if (value !== null) {
            I(t);
            w(t, value, reason);
        }
    }
}
function N(e, t, r) {
    if (t.status === "pending" || t.status === "blocked") {
        e = t.value;
        const n = t.reason;
        t.status = "resolved_module";
        t.value = r;
        t.reason = null;
        if (e !== null) {
            D(t);
            w(t, e, n);
        }
    }
}
S.prototype = Object.create(Promise.prototype);
S.prototype.then = function(e, t) {
    switch(this.status){
        case "resolved_model":
            I(this);
            break;
        case "resolved_module":
            D(this);
    }
    switch(this.status){
        case "fulfilled":
            if (typeof e === "function") {
                e(this.value);
            }
            break;
        case "pending":
        case "blocked":
            if (typeof e === "function") {
                if (this.value === null) {
                    this.value = [];
                }
                this.value.push(e);
            }
            if (typeof t === "function") {
                if (this.reason === null) {
                    this.reason = [];
                }
                this.reason.push(t);
            }
            break;
        case "halted":
            break;
        default:
            if (typeof t === "function") {
                t(this.reason);
            }
    }
};
var parent = null;
function I(e) {
    const t = parent;
    parent = null;
    const { value, reason } = e;
    e.status = "blocked";
    e.value = null;
    e.reason = null;
    try {
        const a = JSON.parse(value, reason._fromJSON);
        const o = e.value;
        if (o !== null) {
            e.value = null;
            e.reason = null;
            O(o, a);
        }
        if (parent !== null) {
            if (parent.errored) {
                throw parent.reason;
            }
            if (parent.deps > 0) {
                parent.value = a;
                parent.reason = null;
                parent.chunk = e;
                return;
            }
        }
        e.status = "fulfilled";
        e.value = a;
        e.reason = null;
    } catch (error) {
        e.status = "rejected";
        e.reason = error;
    } finally{
        parent = t;
    }
}
function D(e) {
    try {
        const t = c(e.value);
        e.status = "fulfilled";
        e.value = t;
        e.reason = null;
    } catch (error) {
        e.status = "rejected";
        e.reason = error;
    }
}
function L(e, t) {
    e._closed = true;
    e._closedReason = t;
    e._chunks.forEach((r)=>{
        if (r.status === "pending") {
            x(e, r, t);
        } else if (r.status === "fulfilled" && r.reason !== null) {
            r.reason.error(t);
        }
    });
}
function U(_payload) {
    return {
        $$typeof: SYMBOL_REACT_LAZY,
        _payload,
        _init
    };
}
function H(e, t) {
    const e__chunks = e._chunks;
    let n = e__chunks.get(t);
    if (!n) {
        n = e._closed ? new S("rejected", null, e._closedReason) : new S("pending", null, null);
        e__chunks.set(t, n);
    }
    return n;
}
function F(e, t) {
    const { response, handler, parentObject, key, map, path } = e;
    try {
        for(let l = 1; l < path.length; l++){
            while(t.$$typeof === SYMBOL_REACT_LAZY){
                const u = t._payload;
                if (u === handler.chunk) {
                    t = handler.value;
                } else {
                    switch(u.status){
                        case "resolved_model":
                            I(u);
                            break;
                        case "resolved_module":
                            D(u);
                    }
                    switch(u.status){
                        case "fulfilled":
                            t = u.value;
                            continue;
                        case "blocked":
                            const c = j(u, e);
                            if (c !== null) {
                                t = c.value;
                                continue;
                            }
                        case "pending":
                            path.splice(0, l - 1);
                            if (u.value === null) {
                                u.value = [
                                    e
                                ];
                            } else {
                                u.value.push(e);
                            }
                            if (u.reason === null) {
                                u.reason = [
                                    e
                                ];
                            } else {
                                u.reason.push(e);
                            }
                            return;
                        case "halted":
                            return;
                        default:
                            $(e, u.reason);
                            return;
                    }
                }
            }
            t = t[path[l]];
        }
        const f = map(response, t, parentObject, key);
        parentObject[key] = f;
        if (key === "" && handler.value === null) {
            handler.value = f;
        }
        if (parentObject[0] === SYMBOL_REACT_TRANSITIONAL_ELEMENT && typeof handler.value === "object" && handler.value !== null && handler.value.$$typeof === SYMBOL_REACT_TRANSITIONAL_ELEMENT) {
            const d = handler.value;
            if (key === "3") {
                d.props = f;
            }
        }
    } catch (error) {
        $(e, error);
        return;
    }
    handler.deps--;
    if (handler.deps === 0 && (e = handler.chunk) !== null && e.status === "blocked") {
        t = e.value;
        e.status = "fulfilled";
        e.value = handler.value;
        e.reason = handler.reason;
        if (t !== null) {
            O(t, handler.value);
        }
    }
}
function $(e, t) {
    let e_handler = e.handler;
    e = e.response;
    if (!e_handler.errored) {
        e_handler.errored = true;
        e_handler.value = null;
        e_handler.reason = t;
        if ((e_handler = e_handler.chunk) !== null && e_handler.status === "blocked") {
            x(e, e_handler, t);
        }
    }
}
function B(e, parentObject, key, response, map, path) {
    if (parent) {
        var handler = parent;
        handler.deps++;
    } else {
        handler = parent = {
            parent: null,
            chunk: null,
            value: null,
            reason: null,
            deps: 1,
            errored: false
        };
    }
    parentObject = {
        response,
        handler,
        parentObject,
        key,
        map,
        path
    };
    if (e.value === null) {
        e.value = [
            parentObject
        ];
    } else {
        e.value.push(parentObject);
    }
    if (e.reason === null) {
        e.reason = [
            parentObject
        ];
    } else {
        e.reason.push(parentObject);
    }
    return null;
}
function z(e, t, r, n) {
    if (!e._serverReferenceConfig) {
        return ((e, t)=>{
            function r() {
                const e = Array.prototype.slice.call(arguments);
                if (e_bound) {
                    if (e_bound.status === "fulfilled") {
                        return t(n, e_bound.value.concat(e));
                    }
                    return Promise.resolve(e_bound).then((r)=>t(n, r.concat(e)));
                }
                return t(n, e);
            }
            var n = e.id;
            var e_bound = e.bound;
            R(r, n, e_bound);
            return r;
        })(t, e._callServer);
    }
    const a = ((e, t)=>{
        let r = "";
        let n = e[t];
        if (n) {
            r = n.name;
        } else {
            const a = t.lastIndexOf("#");
            if (a !== -1) {
                r = t.slice(a + 1);
                n = e[t.slice(0, a)];
            }
            if (!n) {
                throw Error(`Could not find the module "${t}" in the React Server Manifest. This is probably a bug in the React Server Components bundler.`);
            }
        }
        if (n.async) {
            return [
                n.id,
                n.chunks,
                r,
                1
            ];
        }
        return [
            n.id,
            n.chunks,
            r
        ];
    })(e._serverReferenceConfig, t.id);
    let o = u(a);
    if (o) {
        if (t.bound) {
            o = Promise.all([
                o,
                t.bound
            ]);
        }
    } else {
        if (!t.bound) {
            R(o = c(a), t.id, t.bound);
            return o;
        }
        o = Promise.resolve(t.bound);
    }
    if (parent) {
        var i = parent;
        i.deps++;
    } else {
        i = parent = {
            parent: null,
            chunk: null,
            value: null,
            reason: null,
            deps: 1,
            errored: false
        };
    }
    o.then(()=>{
        let e = c(a);
        if (t.bound) {
            var o = t.bound.value.slice(0);
            o.unshift(null);
            e = e.bind(...o);
        }
        R(e, t.id, t.bound);
        r[n] = e;
        if (n === "" && i.value === null) {
            i.value = e;
        }
        if (r[0] === SYMBOL_REACT_TRANSITIONAL_ELEMENT && typeof i.value === "object" && i.value !== null && i.value.$$typeof === SYMBOL_REACT_TRANSITIONAL_ELEMENT && (o = i.value, n === "3")) {
            o.props = e;
        }
        i.deps--;
        if (i.deps === 0 && (e = i.chunk) !== null && e.status === "blocked") {
            o = e.value;
            e.status = "fulfilled";
            e.value = i.value;
            e.reason = null;
            if (o !== null) {
                O(o, i.value);
            }
        }
    }, (t)=>{
        if (!i.errored) {
            i.errored = true;
            i.value = null;
            i.reason = t;
            const r = i.chunk;
            if (r !== null && r.status === "blocked") {
                x(e, r, t);
            }
        }
    });
    return null;
}
function Y(e, t, r, n, a) {
    let o = parseInt((t = t.split(":"))[0], 16);
    switch((o = H(e, o)).status){
        case "resolved_model":
            I(o);
            break;
        case "resolved_module":
            D(o);
    }
    switch(o.status){
        case "fulfilled":
            let i = o.value;
            for(o = 1; o < t.length; o++){
                while(i.$$typeof === SYMBOL_REACT_LAZY){
                    switch((i = i._payload).status){
                        case "resolved_model":
                            I(i);
                            break;
                        case "resolved_module":
                            D(i);
                    }
                    switch(i.status){
                        case "fulfilled":
                            i = i.value;
                            break;
                        case "blocked":
                        case "pending":
                            return B(i, r, n, e, a, t.slice(o - 1));
                        case "halted":
                            if (parent) {
                                e = parent;
                                e.deps++;
                            } else {
                                parent = {
                                    parent: null,
                                    chunk: null,
                                    value: null,
                                    reason: null,
                                    deps: 1,
                                    errored: false
                                };
                            }
                            return null;
                        default:
                            if (parent) {
                                parent.errored = true;
                                parent.value = null;
                                parent.reason = i.reason;
                            } else {
                                parent = {
                                    parent: null,
                                    chunk: null,
                                    value: null,
                                    reason: i.reason,
                                    deps: 0,
                                    errored: true
                                };
                            }
                            return null;
                    }
                }
                i = i[t[o]];
            }
            return a(e, i, r, n);
        case "pending":
        case "blocked":
            return B(o, r, n, e, a, t);
        case "halted":
            if (parent) {
                e = parent;
                e.deps++;
            } else {
                parent = {
                    parent: null,
                    chunk: null,
                    value: null,
                    reason: null,
                    deps: 1,
                    errored: false
                };
            }
            return null;
        default:
            if (parent) {
                parent.errored = true;
                parent.value = null;
                parent.reason = o.reason;
            } else {
                parent = {
                    parent: null,
                    chunk: null,
                    value: null,
                    reason: o.reason,
                    deps: 0,
                    errored: true
                };
            }
            return null;
    }
}
function q(e, t) {
    return new Map(t);
}
function W(e, t) {
    return new Set(t);
}
function X(e, t) {
    return new Blob(t.slice(1), {
        type: t[0]
    });
}
function K(e, t) {
    e = new FormData;
    for(let r = 0; r < t.length; r++){
        e.append(t[r][0], t[r][1]);
    }
    return e;
}
function G(e, t) {
    return t[Symbol.iterator]();
}
function V(e, t) {
    return t;
}
function J() {
    throw Error('Trying to call a function from "use server" but the callServer option was not implemented in your router runtime.');
}
function Q(e, t, r, n, a, o, i) {
    let s;
    const l = new Map;
    this._bundlerConfig = e;
    this._serverReferenceConfig = t;
    this._moduleLoading = r;
    this._callServer = n !== undefined ? n : J;
    this._encodeFormAction = a;
    this._nonce = o;
    this._chunks = l;
    this._stringDecoder = new TextDecoder;
    this._fromJSON = null;
    this._closed = false;
    this._closedReason = null;
    this._tempRefs = i;
    this._fromJSON = (s = this, function(e, t) {
        if (typeof t === "string") {
            let r = s;
            let n = this;
            const a = e;
            let o = t;
            if (o[0] === "$") {
                if (o === "$") {
                    if (parent !== null && a === "0") {
                        parent = {
                            parent,
                            chunk: null,
                            value: null,
                            reason: null,
                            deps: 0,
                            errored: false
                        };
                    }
                    return SYMBOL_REACT_TRANSITIONAL_ELEMENT;
                }
                switch(o[1]){
                    case "$":
                        return o.slice(1);
                    case "L":
                        return U(r = H(r, n = parseInt(o.slice(2), 16)));
                    case "@":
                        return H(r, n = parseInt(o.slice(2), 16));
                    case "S":
                        return Symbol.for(o.slice(2));
                    case "h":
                        return Y(r, o = o.slice(2), n, a, z);
                    case "T":
                        n = `\$${o.slice(2)}`;
                        if ((r = r._tempRefs) == null) {
                            throw Error("Missing a temporary reference set but the RSC response returned a temporary reference. Pass a temporaryReference option with the set that was used with the reply.");
                        }
                        return r.get(n);
                    case "Q":
                        return Y(r, o = o.slice(2), n, a, q);
                    case "W":
                        return Y(r, o = o.slice(2), n, a, W);
                    case "B":
                        return Y(r, o = o.slice(2), n, a, X);
                    case "K":
                        return Y(r, o = o.slice(2), n, a, K);
                    case "Z":
                        return ea();
                    case "i":
                        return Y(r, o = o.slice(2), n, a, G);
                    case "I":
                        return Infinity;
                    case "-":
                        if (o === "$-0") {
                            return -0;
                        }
                        return -Infinity;
                    case "N":
                        return NaN;
                    case "u":
                        return;
                    case "D":
                        return new Date(Date.parse(o.slice(2)));
                    case "n":
                        return BigInt(o.slice(2));
                    default:
                        return Y(r, o = o.slice(1), n, a, V);
                }
            }
            return o;
        }
        if (typeof t === "object" && t !== null) {
            if (t[0] === SYMBOL_REACT_TRANSITIONAL_ELEMENT) {
                e = {
                    $$typeof: SYMBOL_REACT_TRANSITIONAL_ELEMENT,
                    type: t[1],
                    key: t[2],
                    ref: null,
                    props: t[3]
                };
                if (parent !== null) {
                    parent = (t = parent).parent;
                    if (t.errored) {
                        e = U(e = new S("rejected", null, t.reason));
                    } else if (t.deps > 0) {
                        const i = new S("blocked", null, null);
                        t.value = e;
                        t.chunk = i;
                        e = U(i);
                    }
                }
            } else {
                e = t;
            }
            return e;
        }
        return t;
    });
}
function Z(e, t, r) {
    const n = (e = e._chunks).get(t);
    if (n && n.status !== "pending") {
        n.reason.enqueueValue(r);
    } else {
        e.set(t, new S("fulfilled", r, null));
    }
}
function ee(e, t, r, n) {
    const e__chunks = e._chunks;
    if (e = e__chunks.get(t)) {
        if (e.status === "pending") {
            t = e.value;
            e.status = "fulfilled";
            e.value = r;
            e.reason = n;
            if (t !== null) {
                O(t, e.value);
            }
        }
    } else {
        e__chunks.set(t, new S("fulfilled", r, n));
    }
}
function et(e, t, r) {
    let n = null;
    let a = false;
    r = new ReadableStream({
        type: r,
        start: function(e) {
            n = e;
        }
    });
    let o = null;
    ee(e, t, r, {
        enqueueValue: function(e) {
            if (o === null) {
                n.enqueue(e);
            } else {
                o.then(()=>{
                    n.enqueue(e);
                });
            }
        },
        enqueueModel: function(t) {
            if (o === null) {
                var r = new S("resolved_model", t, e);
                I(r);
                if (r.status === "fulfilled") {
                    n.enqueue(r.value);
                } else {
                    r.then((e)=>n.enqueue(e), (e)=>n.error(e));
                    o = r;
                }
            } else {
                r = o;
                const a = new S("pending", null, null);
                a.then((e)=>n.enqueue(e), (e)=>n.error(e));
                o = a;
                r.then(()=>{
                    if (o === a) {
                        o = null;
                    }
                    M(e, a, t);
                });
            }
        },
        close: function() {
            if (!a) {
                a = true;
                if (o === null) {
                    n.close();
                } else {
                    const e = o;
                    o = null;
                    e.then(()=>n.close());
                }
            }
        },
        error: function(e) {
            if (!a) {
                a = true;
                if (o === null) {
                    n.error(e);
                } else {
                    const t = o;
                    o = null;
                    t.then(()=>n.error(e));
                }
            }
        }
    });
}
function er() {
    return this;
}
function en(e, t, r) {
    const n = [];
    let a = false;
    let o = 0;
    const i = {};
    i[Symbol.asyncIterator] = function() {
        let e;
        let t = 0;
        e = {
            next: e = function(e) {
                if (e !== undefined) {
                    throw Error("Values cannot be passed to next() of AsyncIterables passed to Client Components.");
                }
                if (t === n.length) {
                    if (a) {
                        return new S("fulfilled", {
                            done: true,
                            value: undefined
                        }, null);
                    }
                    n[t] = new S("pending", null, null);
                }
                return n[t++];
            }
        };
        e[Symbol.asyncIterator] = er;
        return e;
    };
    ee(e, t, r ? i[Symbol.asyncIterator]() : i, {
        enqueueValue: function(value_1) {
            if (o === n.length) {
                n[o] = new S("fulfilled", {
                    done: false,
                    value: value_1
                }, null);
            } else {
                const t = n[o];
                const { value, reason } = t;
                t.status = "fulfilled";
                t.value = {
                    done: false,
                    value: value_1
                };
                t.reason = null;
                if (value !== null) {
                    w(t, value, reason);
                }
            }
            o++;
        },
        enqueueModel: function(t) {
            if (o === n.length) {
                n[o] = A(e, t, false);
            } else {
                C(e, n[o], t, false);
            }
            o++;
        },
        close: function(t) {
            if (!a) {
                a = true;
                if (o === n.length) {
                    n[o] = A(e, t, true);
                } else {
                    C(e, n[o], t, true);
                }
                o++;
                while(o < n.length){
                    C(e, n[o++], '"$undefined"', true);
                }
            }
        },
        error: function(t) {
            if (!a) {
                a = true;
                if (o === n.length) {
                    n[o] = new S("pending", null, null);
                }
                while(o < n.length){
                    x(e, n[o++], t);
                }
            }
        }
    });
}
function ea() {
    const e = Error("An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error.");
    e.stack = `Error: ${e.message}`;
    return e;
}
function eo(e, t) {
    for(var r = e.length, n = t.length, a = 0; a < r; a++){
        n += e[a].byteLength;
    }
    n = new Uint8Array(n);
    for(let o = a = 0; o < r; o++){
        const i = e[o];
        n.set(i, a);
        a += i.byteLength;
    }
    n.set(t, a);
    return n;
}
function ei(e, t, r, n, a, o) {
    Z(e, t, a = new a((r = r.length === 0 && n.byteOffset % o == 0 ? n : eo(r, n)).buffer, r.byteOffset, r.byteLength / o));
}
function es(e) {
    return new Q(null, null, null, e && e.callServer ? e.callServer : undefined, undefined, undefined, e && e.temporaryReferences ? e.temporaryReferences : undefined);
}
function el(e, t, r) {
    function n(t) {
        L(e, t);
    }
    const o = {
        _rowState: 0,
        _rowID: 0,
        _rowTag: 0,
        _rowLength: 0,
        _buffer: []
    };
    const i = t.getReader();
    i.read().then(function t(s) {
        let s_value = s.value;
        if (s.done) {
            if (!r) {
                L(e, Error("Connection closed."));
            }
        } else {
            let c = 0;
            let f = o._rowState;
            s = o._rowID;
            let d = o._rowTag;
            let h = o._rowLength;
            const _ = o._buffer;
            for(const m = s_value.length; c < m;){
                let g = -1;
                switch(f){
                    case 0:
                        if ((g = s_value[c++]) === 58) {
                            f = 1;
                        } else {
                            s = s << 4 | (g > 96 ? g - 87 : g - 48);
                        }
                        continue;
                    case 1:
                        if ((f = s_value[c]) === 84 || f === 65 || f === 79 || f === 111 || f === 85 || f === 83 || f === 115 || f === 76 || f === 108 || f === 71 || f === 103 || f === 77 || f === 109 || f === 86) {
                            d = f;
                            f = 2;
                            c++;
                        } else if (f > 64 && f < 91 || f === 35 || f === 114 || f === 120) {
                            d = f;
                            f = 3;
                            c++;
                        } else {
                            d = 0;
                            f = 3;
                        }
                        continue;
                    case 2:
                        if ((g = s_value[c++]) === 44) {
                            f = 4;
                        } else {
                            h = h << 4 | (g > 96 ? g - 87 : g - 48);
                        }
                        continue;
                    case 3:
                        g = s_value.indexOf(10, c);
                        break;
                    case 4:
                        if ((g = c + h) > s_value.length) {
                            g = -1;
                        }
                }
                const y = s_value.byteOffset + c;
                if (g > -1) {
                    ((e, t, r, n, o)=>{
                        switch(r){
                            case 65:
                                Z(e, t, eo(n, o).buffer);
                                return;
                            case 79:
                                ei(e, t, n, o, Int8Array, 1);
                                return;
                            case 111:
                                Z(e, t, n.length === 0 ? o : eo(n, o));
                                return;
                            case 85:
                                ei(e, t, n, o, Uint8ClampedArray, 1);
                                return;
                            case 83:
                                ei(e, t, n, o, Int16Array, 2);
                                return;
                            case 115:
                                ei(e, t, n, o, Uint16Array, 2);
                                return;
                            case 76:
                                ei(e, t, n, o, Int32Array, 4);
                                return;
                            case 108:
                                ei(e, t, n, o, Uint32Array, 4);
                                return;
                            case 71:
                                ei(e, t, n, o, Float32Array, 4);
                                return;
                            case 103:
                                ei(e, t, n, o, Float64Array, 8);
                                return;
                            case 77:
                                ei(e, t, n, o, BigInt64Array, 8);
                                return;
                            case 109:
                                ei(e, t, n, o, BigUint64Array, 8);
                                return;
                            case 86:
                                ei(e, t, n, o, DataView, 1);
                                return;
                        }
                        let e__stringDecoder = e._stringDecoder;
                        let s = "";
                        for(let l = 0; l < n.length; l++){
                            s += e__stringDecoder.decode(n[l], a);
                        }
                        n = s += e__stringDecoder.decode(o);
                        switch(r){
                            case 73:
                                var c = e;
                                const f = t;
                                let d = n;
                                const h = c._chunks;
                                const _ = h.get(f);
                                d = JSON.parse(d, c._fromJSON);
                                var m = ((e, t)=>{
                                    if (e) {
                                        let r = e[t[0]];
                                        if (e = r && r[t[2]]) {
                                            r = e.name;
                                        } else {
                                            if (!(e = r && r["*"])) {
                                                throw Error(`Could not find the module "${t[0]}" in the React Server Consumer Manifest. This is probably a bug in the React Server Components bundler.`);
                                            }
                                            r = t[2];
                                        }
                                        if (t.length === 4) {
                                            return [
                                                e.id,
                                                e.chunks,
                                                r,
                                                1
                                            ];
                                        }
                                        return [
                                            e.id,
                                            e.chunks,
                                            r
                                        ];
                                    }
                                    return t;
                                })(c._bundlerConfig, d);
                                if (d = u(m)) {
                                    if (_) {
                                        var g = _;
                                        g.status = "blocked";
                                    } else {
                                        g = new S("blocked", null, null);
                                        h.set(f, g);
                                    }
                                    d.then(()=>N(c, g, m), (e)=>x(c, g, e));
                                } else {
                                    if (_) {
                                        N(c, _, m);
                                    } else {
                                        h.set(f, new S("resolved_module", m, null));
                                    }
                                }
                                break;
                            case 72:
                                t = n[0];
                                e = JSON.parse(n = n.slice(1), e._fromJSON);
                                n = n___DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.d;
                                switch(t){
                                    case "D":
                                        n.D(e);
                                        break;
                                    case "C":
                                        if (typeof e === "string") {
                                            n.C(e);
                                        } else {
                                            n.C(e[0], e[1]);
                                        }
                                        break;
                                    case "L":
                                        t = e[0];
                                        r = e[1];
                                        if (e.length === 3) {
                                            n.L(t, r, e[2]);
                                        } else {
                                            n.L(t, r);
                                        }
                                        break;
                                    case "m":
                                        if (typeof e === "string") {
                                            n.m(e);
                                        } else {
                                            n.m(e[0], e[1]);
                                        }
                                        break;
                                    case "X":
                                        if (typeof e === "string") {
                                            n.X(e);
                                        } else {
                                            n.X(e[0], e[1]);
                                        }
                                        break;
                                    case "S":
                                        if (typeof e === "string") {
                                            n.S(e);
                                        } else {
                                            n.S(e[0], e[1] === 0 ? undefined : e[1], e.length === 3 ? e[2] : undefined);
                                        }
                                        break;
                                    case "M":
                                        if (typeof e === "string") {
                                            n.M(e);
                                        } else {
                                            n.M(e[0], e[1]);
                                        }
                                }
                                break;
                            case 69:
                                o = (r = e._chunks).get(t);
                                n = JSON.parse(n);
                                e__stringDecoder = ea();
                                e__stringDecoder.digest = n.digest;
                                if (o) {
                                    x(e, o, e__stringDecoder);
                                } else {
                                    r.set(t, new S("rejected", null, e__stringDecoder));
                                }
                                break;
                            case 84:
                                if ((r = (e = e._chunks).get(t)) && r.status !== "pending") {
                                    r.reason.enqueueValue(n);
                                } else {
                                    e.set(t, new S("fulfilled", n, null));
                                }
                                break;
                            case 78:
                            case 68:
                            case 74:
                            case 87:
                                throw Error("Failed to read a RSC payload created by a development version of React on the server while using a production version on the client. Always use matching versions on the server and the client.");
                            case 82:
                                et(e, t, undefined);
                                break;
                            case 114:
                                et(e, t, "bytes");
                                break;
                            case 88:
                                en(e, t, false);
                                break;
                            case 120:
                                en(e, t, true);
                                break;
                            case 67:
                                if ((e = e._chunks.get(t)) && e.status === "fulfilled") {
                                    e.reason.close(n === "" ? '"$undefined"' : n);
                                }
                                break;
                            default:
                                if (o = (r = e._chunks).get(t)) {
                                    M(e, o, n);
                                } else {
                                    r.set(t, new S("resolved_model", n, e));
                                }
                        }
                    })(e, s, d, _, h = new Uint8Array(s_value.buffer, y, g - c));
                    c = g;
                    if (f === 3) {
                        c++;
                    }
                    f = 0;
                    d = 0;
                    s = 0;
                    h = 0;
                    _.length = 0;
                } else {
                    s_value = new Uint8Array(s_value.buffer, y, s_value.byteLength - c);
                    _.push(s_value);
                    h -= s_value.byteLength;
                    break;
                }
            }
            o._rowState = f;
            o._rowID = s;
            o._rowTag = d;
            o._rowLength = h;
            return i.read().then(t).catch(n);
        }
    }).catch(n);
}
exports.createFromFetch = function(e, t) {
    const r = es(t);
    e.then((e)=>{
        el(r, e.body, false);
    }, (e)=>{
        L(r, e);
    });
    return H(r, 0);
};
exports.createFromReadableStream = function(e, t) {
    el(t = es(t), e, false);
    return H(t, 0);
};
exports.createServerReference = function(e, t) {
    function r() {
        const r = Array.prototype.slice.call(arguments);
        return t(e, r);
    }
    R(r, e, null);
    return r;
};
exports.createTemporaryReferenceSet = function() {
    return new Map;
};
exports.encodeReply = function(e, t) {
    return new Promise((resolve, reject)=>{
        const a = ((e, r, resolve_1, reject_1)=>{
            const t = "";
            function o(e, t) {
                t = new Blob([
                    new Uint8Array(t.buffer, t.byteOffset, t.byteLength)
                ]);
                const r = l++;
                if (c === null) {
                    c = new FormData;
                }
                c.append(`${r}`, t);
                return `\$${e}${r.toString(16)}`;
            }
            function i(e, p) {
                if (p === null) {
                    return null;
                }
                if (typeof p === "object") {
                    switch(p.$$typeof){
                        case SYMBOL_REACT_TRANSITIONAL_ELEMENT:
                            if (r !== undefined && e.indexOf(":") === -1) {
                                var R;
                                var S;
                                var P;
                                var O;
                                var T;
                                var j = f.get(this);
                                if (j !== undefined) {
                                    r.set(`${j}:${e}`, p);
                                    return "$T";
                                }
                            }
                            throw Error("React Element cannot be passed to Server Functions from the Client without a temporary reference set. Pass a TemporaryReferenceSet to the options.");
                        case SYMBOL_REACT_LAZY:
                            j = p._payload;
                            const w = p._init;
                            if (c === null) {
                                c = new FormData;
                            }
                            u++;
                            try {
                                const x = w(j);
                                const A = l++;
                                const C = s(x, A);
                                c.append(`${A}`, C);
                                return `\$${A.toString(16)}`;
                            } catch (error) {
                                if (typeof error === "object" && error !== null && typeof error.then === "function") {
                                    u++;
                                    const M = l++;
                                    j = function() {
                                        try {
                                            const e = s(p, M);
                                            const r = c;
                                            r.append(t + M, e);
                                            u--;
                                            if (u === 0) {
                                                resolve_1(r);
                                            }
                                        } catch (err) {
                                            reject_1(err);
                                        }
                                    };
                                    error.then(j, j);
                                    return `\$${M.toString(16)}`;
                                }
                                reject_1(error);
                                return null;
                            } finally{
                                u--;
                            }
                    }
                    j = f.get(p);
                    if (typeof p.then === "function") {
                        if (j !== undefined) {
                            if (d !== p) {
                                return j;
                            } else {
                                d = null;
                            }
                        }
                        if (c === null) {
                            c = new FormData;
                        }
                        u++;
                        const N = l++;
                        e = `\$@${N.toString(16)}`;
                        f.set(p, e);
                        p.then((e)=>{
                            try {
                                const r = f.get(e);
                                const o = r !== undefined ? JSON.stringify(r) : s(e, N);
                                (e = c).append(t + N, o);
                                u--;
                                if (u === 0) {
                                    resolve_1(e);
                                }
                            } catch (error) {
                                reject_1(error);
                            }
                        }, reject_1);
                        return e;
                    }
                    if (j !== undefined) {
                        if (d !== p) {
                            return j;
                        } else {
                            d = null;
                        }
                    } else {
                        if (e.indexOf(":") === -1 && (j = f.get(this)) !== undefined) {
                            e = `${j}:${e}`;
                            f.set(p, e);
                            if (r !== undefined) {
                                r.set(e, p);
                            }
                        }
                    }
                    if (Array.isArray(p)) {
                        return p;
                    }
                    if (p instanceof FormData) {
                        if (c === null) {
                            c = new FormData;
                        }
                        const k = c;
                        const I = `${t + (e = l++)}_`;
                        p.forEach((e, t)=>{
                            k.append(I + t, e);
                        });
                        return `\$K${e.toString(16)}`;
                    }
                    if (p instanceof Map) {
                        e = l++;
                        j = s(Array.from(p), e);
                        if (c === null) {
                            c = new FormData;
                        }
                        c.append(t + e, j);
                        return `\$Q${e.toString(16)}`;
                    }
                    if (p instanceof Set) {
                        e = l++;
                        j = s(Array.from(p), e);
                        if (c === null) {
                            c = new FormData;
                        }
                        c.append(t + e, j);
                        return `\$W${e.toString(16)}`;
                    }
                    if (p instanceof ArrayBuffer) {
                        e = new Blob([
                            p
                        ]);
                        j = l++;
                        if (c === null) {
                            c = new FormData;
                        }
                        c.append(t + j, e);
                        return `\$A${j.toString(16)}`;
                    }
                    if (p instanceof Int8Array) {
                        return o("O", p);
                    }
                    if (p instanceof Uint8Array) {
                        return o("o", p);
                    }
                    if (p instanceof Uint8ClampedArray) {
                        return o("U", p);
                    }
                    if (p instanceof Int16Array) {
                        return o("S", p);
                    }
                    if (p instanceof Uint16Array) {
                        return o("s", p);
                    }
                    if (p instanceof Int32Array) {
                        return o("L", p);
                    }
                    if (p instanceof Uint32Array) {
                        return o("l", p);
                    }
                    if (p instanceof Float32Array) {
                        return o("G", p);
                    }
                    if (p instanceof Float64Array) {
                        return o("g", p);
                    }
                    if (p instanceof BigInt64Array) {
                        return o("M", p);
                    }
                    if (p instanceof BigUint64Array) {
                        return o("m", p);
                    }
                    if (p instanceof DataView) {
                        return o("V", p);
                    }
                    if (typeof Blob === "function" && p instanceof Blob) {
                        if (c === null) {
                            c = new FormData;
                        }
                        e = l++;
                        c.append(t + e, p);
                        return `\$B${e.toString(16)}`;
                    }
                    if (e = (R = p) === null || typeof R !== "object" ? null : typeof (R = Symbol.iterator && R[Symbol.iterator] || R["@@iterator"]) === "function" ? R : null) {
                        if ((j = e.call(p)) === p) {
                            e = l++;
                            j = s(Array.from(j), e);
                            if (c === null) {
                                c = new FormData;
                            }
                            c.append(t + e, j);
                            return `\$i${e.toString(16)}`;
                        }
                        return Array.from(j);
                    }
                    if (typeof ReadableStream === "function" && p instanceof ReadableStream) {
                        return ((e)=>{
                            try {
                                var r;
                                var o;
                                var s;
                                var f;
                                var d;
                                var p;
                                var h;
                                var _ = e.getReader({
                                    mode: "byob"
                                });
                            } catch (f) {
                                r = e.getReader();
                                if (c === null) {
                                    c = new FormData;
                                }
                                o = c;
                                u++;
                                s = l++;
                                r.read().then(function e(l) {
                                    if (l.done) {
                                        o.append(t + s, "C");
                                        if (--u == 0) {
                                            resolve_1(o);
                                        }
                                    } else {
                                        try {
                                            const c = JSON.stringify(l.value, i);
                                            o.append(t + s, c);
                                            r.read().then(e, reject_1);
                                        } catch (error) {
                                            reject_1(error);
                                        }
                                    }
                                }, reject_1);
                                return `\$R${s.toString(16)}`;
                            }
                            f = _;
                            if (c === null) {
                                c = new FormData;
                            }
                            d = c;
                            u++;
                            p = l++;
                            h = [];
                            f.read(new Uint8Array(1024)).then(function e(r) {
                                if (r.done) {
                                    r = l++;
                                    d.append(t + r, new Blob(h));
                                    d.append(t + p, `"\$o${r.toString(16)}"`);
                                    d.append(t + p, "C");
                                    if (--u == 0) {
                                        resolve_1(d);
                                    }
                                } else {
                                    h.push(r.value);
                                    f.read(new Uint8Array(1024)).then(e, reject_1);
                                }
                            }, reject_1);
                            return `\$r${p.toString(16)}`;
                        })(p);
                    }
                    if (typeof (e = p[Symbol.asyncIterator]) === "function") {
                        S = p;
                        P = e.call(p);
                        if (c === null) {
                            c = new FormData;
                        }
                        O = c;
                        u++;
                        T = l++;
                        S = S === P;
                        P.next().then(function e(r) {
                            if (r.done) {
                                if (r.value === undefined) {
                                    O.append(t + T, "C");
                                } else {
                                    try {
                                        const o = JSON.stringify(r.value, i);
                                        O.append(t + T, `C${o}`);
                                    } catch (error) {
                                        reject_1(error);
                                        return;
                                    }
                                }
                                if (--u == 0) {
                                    resolve_1(O);
                                }
                            } else {
                                try {
                                    const s = JSON.stringify(r.value, i);
                                    O.append(t + T, s);
                                    P.next().then(e, reject_1);
                                } catch (error) {
                                    reject_1(error);
                                }
                            }
                        }, reject_1);
                        return `\$${S ? "x" : "X"}${T.toString(16)}`;
                    }
                    if ((e = Object.getPrototypeOf(p)) !== Object.prototype && (e === null || Object.getPrototypeOf(e) !== null)) {
                        if (r === undefined) {
                            throw Error("Only plain objects, and a few built-ins, can be passed to Server Functions. Classes or null prototypes are not supported.");
                        }
                        return "$T";
                    }
                    return p;
                }
                if (typeof p === "string") {
                    if (p[p.length - 1] === "Z" && this[e] instanceof Date) {
                        return `\$D${p}`;
                    }
                    return e = p[0] === "$" ? `\$${p}` : p;
                }
                if (typeof p === "boolean") {
                    return p;
                }
                if (typeof p === "number") {
                    if (Number.isFinite(p)) {
                        if (p === 0 && -Infinity == 1 / p) {
                            return "$-0";
                        }
                        return p;
                    }
                    if (Infinity === p) {
                        return "$Infinity";
                    }
                    if (-Infinity === p) {
                        return "$-Infinity";
                    }
                    return "$NaN";
                }
                if (p === undefined) {
                    return "$undefined";
                }
                if (typeof p === "function") {
                    if ((j = E.get(p)) !== undefined) {
                        e = JSON.stringify({
                            id: j.id,
                            bound: j.bound
                        }, i);
                        if (c === null) {
                            c = new FormData;
                        }
                        j = l++;
                        c.set(t + j, e);
                        return `\$h${j.toString(16)}`;
                    }
                    if (r !== undefined && e.indexOf(":") === -1 && (j = f.get(this)) !== undefined) {
                        r.set(`${j}:${e}`, p);
                        return "$T";
                    }
                    throw Error("Client Functions cannot be passed directly to Server Functions. Only Functions passed from the Server can be passed back again.");
                }
                if (typeof p === "symbol") {
                    if (r !== undefined && e.indexOf(":") === -1 && (j = f.get(this)) !== undefined) {
                        r.set(`${j}:${e}`, p);
                        return "$T";
                    }
                    throw Error("Symbols cannot be passed to a Server Function without a temporary reference set. Pass a TemporaryReferenceSet to the options.");
                }
                if (typeof p === "bigint") {
                    return `\$n${p.toString(10)}`;
                }
                throw Error(`Type ${typeof p} is not supported as an argument to a Server Function.`);
            }
            function s(e, t) {
                if (typeof e === "object" && e !== null) {
                    t = `\$${t.toString(16)}`;
                    f.set(e, t);
                    if (r !== undefined) {
                        r.set(t, e);
                    }
                }
                d = e;
                return JSON.stringify(e, i);
            }
            var l = 1;
            var u = 0;
            var c = null;
            var f = new WeakMap;
            var d = e;
            const p = s(e, 0);
            if (c === null) {
                resolve_1(p);
            } else {
                c.set(`${t}0`, p);
                if (u === 0) {
                    resolve_1(c);
                }
            }
            return function() {
                if (u > 0) {
                    u = 0;
                    if (c === null) {
                        resolve_1(p);
                    } else {
                        resolve_1(c);
                    }
                }
            };
        })(e, t && t.temporaryReferences ? t.temporaryReferences : undefined, resolve, reject);
        if (t && t.signal) {
            const o = t.signal;
            if (o.aborted) {
                a(o.reason);
            } else {
                const i = function() {
                    a(o.reason);
                    o.removeEventListener("abort", i);
                };
                o.addEventListener("abort", i);
            }
        }
    });
};
exports.registerServerReference = function(e, t) {
    R(e, t, null);
    return e;
};
