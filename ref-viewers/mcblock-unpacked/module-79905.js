import "./module-95704.js";
function n() {
    const e = Object.create(null);
    function t(e, t) {
        let r;
        self.troikaDefine = function(e) {
            return r = e;
        };
        const n = URL.createObjectURL(new Blob([
            `/** ${e.replace(/\*/g, "")} **/

troikaDefine(
${t}
)`
        ], {
            type: "application/javascript"
        }));
        try {
            importScripts(n);
        } catch (error) {
            console.error(error);
        }
        URL.revokeObjectURL(n);
        delete self.troikaDefine;
        return r;
    }
    self.addEventListener("message", function({ data }) {
        const { messageId, action, data: data_1 } = data;
        try {
            if (action === "registerModule") {
                (function r(data_1_1, a) {
                    const { id, name } = data_1_1;
                    let n_dependencies = data_1_1.dependencies;
                    if (n_dependencies === undefined) {
                        n_dependencies = [];
                    }
                    let n_init = data_1_1.init;
                    if (n_init === undefined) {
                        n_init = function() {};
                    }
                    let n_getTransferables = data_1_1.getTransferables;
                    if (n_getTransferables === undefined) {
                        n_getTransferables = null;
                    }
                    if (!e[id]) {
                        try {
                            n_dependencies = n_dependencies.map((t)=>{
                                if (t && t.isWorkerModule) {
                                    r(t, function(e) {
                                        if (e instanceof Error) {
                                            throw e;
                                        }
                                    });
                                    t = e[t.id].value;
                                }
                                return t;
                            });
                            n_init = t(`<${name}>.init`, n_init);
                            if (n_getTransferables) {
                                n_getTransferables = t(`<${name}>.getTransferables`, n_getTransferables);
                            }
                            let c = null;
                            if (typeof n_init === "function") {
                                c = n_init(...n_dependencies);
                            } else {
                                console.error("worker module init function failed to rehydrate");
                            }
                            e[id] = {
                                id,
                                value: c,
                                getTransferables: n_getTransferables
                            };
                            a(c);
                        } catch (error) {
                            if (!(error && error.noLog)) {
                                console.error(error);
                            }
                            a(error);
                        }
                    }
                })(data_1, (e)=>{
                    if (e instanceof Error) {
                        postMessage({
                            messageId,
                            success: false,
                            error: e.message
                        });
                    } else {
                        postMessage({
                            messageId,
                            success: true,
                            result: {
                                isCallable: typeof e === "function"
                            }
                        });
                    }
                });
            }
            if (action === "callModule") {
                (({ id, args }, r)=>{
                    if (!(e[id] && typeof e[id].value === "function")) {
                        r(Error(`Worker module ${id}: not found or its 'init' did not return a function`));
                    }
                    try {
                        const o = e[id].value(...args);
                        if (o && typeof o.then === "function") {
                            o.then(l, (e)=>r(e instanceof Error ? e : Error(`${e}`)));
                        } else {
                            l(o);
                        }
                    } catch (error) {
                        r(error);
                    }
                    function l(t) {
                        try {
                            let n = e[id].getTransferables && e[id].getTransferables(t);
                            if (!(n && Array.isArray(n) && n.length)) {
                                n = undefined;
                            }
                            r(t, n);
                        } catch (error) {
                            console.error(error);
                            r(error);
                        }
                    }
                })(data_1, (result, t)=>{
                    if (result instanceof Error) {
                        postMessage({
                            messageId,
                            success: false,
                            error: result.message
                        });
                    } else {
                        postMessage({
                            messageId,
                            success: true,
                            result
                        }, t || undefined);
                    }
                });
            }
        } catch (error) {
            postMessage({
                messageId,
                success: false,
                error: error.stack
            });
        }
    });
}
Object.defineProperty(exports, "kl", {
    enumerable: true,
    get: ()=>function e(t) {
            if ((!t || typeof t.init !== "function") && !l) {
                throw Error("requires `options.init` function");
            }
            let r;
            let t_dependencies = t.dependencies;
            const { init, getTransferables } = t;
            let t_workerId = t.workerId;
            r = function() {
                const e = [];
                for(let t = arguments.length; t--;){
                    e[t] = arguments[t];
                }
                return r._getInitResult().then((t)=>{
                    if (typeof t === "function") {
                        return t(...e);
                    }
                    throw Error("Worker module function was called but `init` did not return a callable function");
                });
            };
            r._getInitResult = function() {
                let t_dependencies = t.dependencies;
                const t_init = t.init;
                const a = Promise.all(t_dependencies = Array.isArray(t_dependencies) ? t_dependencies.map((e)=>{
                    if (e && (e = e.onMainThread || e)._getInitResult) {
                        e = e._getInitResult();
                    }
                    return e;
                }) : []).then((e)=>t_init(...e));
                r._getInitResult = function() {
                    return a;
                };
                return a;
            };
            const u = r;
            if (t_workerId == null) {
                t_workerId = "#default";
            }
            const id = `workerModule${++i}`;
            const g = t.name || id;
            let p = null;
            function m() {
                const args = [];
                for(let t = arguments.length; t--;){
                    args[t] = arguments[t];
                }
                if (!a()) {
                    return u(...args);
                }
                if (!p) {
                    p = d(t_workerId, "registerModule", m.workerModuleData);
                    const r = function() {
                        p = null;
                        f[t_workerId].delete(r);
                    };
                    (f[t_workerId] || (f[t_workerId] = new Set)).add(r);
                }
                return p.then((t)=>{
                    if (t.isCallable) {
                        return d(t_workerId, "callModule", {
                            id,
                            args
                        });
                    }
                    throw Error("Worker module function was called but `init` did not return a callable function");
                });
            }
            t_dependencies = t_dependencies && t_dependencies.map((t)=>{
                if (!(typeof t !== "function" || t.workerModuleData)) {
                    l = true;
                    t = e({
                        workerId: t_workerId,
                        name: `<${g}> function dependency: ${t.name}`,
                        init: `function(){return (
${v(t)}
)}`
                    });
                    l = false;
                }
                if (t && t.workerModuleData) {
                    t = t.workerModuleData;
                }
                return t;
            });
            m.workerModuleData = {
                isWorkerModule: true,
                id,
                name: g,
                dependencies: t_dependencies,
                init: v(init),
                getTransferables: getTransferables && v(getTransferables)
            };
            m.onMainThread = u;
            return m;
        }
});
var a = function() {
    let e = false;
    if (typeof window !== "undefined" && window.document !== undefined) {
        try {
            new Worker(URL.createObjectURL(new Blob([
                ""
            ], {
                type: "application/javascript"
            }))).terminate();
            e = true;
        } catch (error) {
            console.log(`Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: [${error.message}]`);
        }
    }
    a = function() {
        return e;
    };
    return e;
};
var i = 0;
var o = 0;
var l = false;
var s = Object.create(null);
var f = Object.create(null);
var c = Object.create(null);
export function Qw(e) {
    if (f[e]) {
        f[e].forEach((e)=>{
            e();
        });
    }
    if (s[e]) {
        s[e].terminate();
        delete s[e];
    }
}
function v(e) {
    let t = e.toString();
    if (!/^function/.test(t) && /^\w+\s*\(/.test(t)) {
        t = `function ${t}`;
    }
    return t;
}
function d(e, action, data) {
    return new Promise((resolve, reject)=>{
        const messageId = ++o;
        c[messageId] = function(e) {
            if (e.success) {
                resolve(e.result);
            } else {
                reject(Error(`Error in worker ${action} call: ${e.error}`));
            }
        };
        ((e)=>{
            let t = s[e];
            if (!t) {
                const r = v(n);
                t = s[e] = new Worker(URL.createObjectURL(new Blob([
                    `/** Worker Module Bootstrap: ${e.replace(/\*/g, "")} **/

;(${r})()`
                ], {
                    type: "application/javascript"
                })));
                t.onmessage = function({ data }) {
                    const data_messageId = data.messageId;
                    const n = c[data_messageId];
                    if (!n) {
                        throw Error("WorkerModule response with empty or unknown messageId");
                    }
                    delete c[data_messageId];
                    n(data);
                };
            }
            return t;
        })(e).postMessage({
            messageId,
            action,
            data
        });
    });
}
