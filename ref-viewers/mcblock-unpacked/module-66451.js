export let unstable_now;
function n(e, t) {
    let e_length = e.length;
    for(e.push(t); e_length > 0;){
        const r = e_length - 1 >>> 1;
        const o = e[r];
        if (i(o, t) > 0) {
            e[r] = t;
            e[e_length] = o;
            e_length = r;
        } else {
            break;
        }
    }
}
function r(e) {
    if (e.length === 0) {
        return null;
    }
    return e[0];
}
function o(e) {
    if (e.length === 0) {
        return null;
    }
    const t = e[0];
    const n = e.pop();
    if (n !== t) {
        e[0] = n;
        for(let r = 0, o = e.length, a = o >>> 1; r < a;){
            const l = 2 * (r + 1) - 1;
            const s = e[l];
            const c = l + 1;
            const u = e[c];
            if (i(s, n) < 0) {
                if (c < o && i(u, s) < 0) {
                    e[r] = u;
                    e[c] = n;
                    r = c;
                } else {
                    e[r] = s;
                    e[l] = n;
                    r = l;
                }
            } else if (c < o && i(u, n) < 0) {
                e[r] = u;
                e[c] = n;
                r = c;
            } else {
                break;
            }
        }
    }
    return t;
}
function i(e, t) {
    const n = e.sortIndex - t.sortIndex;
    if (n !== 0) {
        return n;
    }
    return e.id - t.id;
}
if (typeof performance === "object" && typeof performance.now === "function") {
    var a;
    const l = performance;
    unstable_now = function() {
        return l.now();
    };
} else {
    const c = Date.now();
    unstable_now = function() {
        return Date.now() - c;
    };
}
const u = [];
const p = [];
let d = 1;
let f = null;
let h = 3;
let m = false;
let v = false;
let b = false;
const g = typeof setTimeout === "function" ? setTimeout : null;
const y = typeof clearTimeout === "function" ? clearTimeout : null;
const w = typeof setImmediate !== "undefined" ? setImmediate : null;
function j(e) {
    for(let t = r(p); t !== null;){
        if (t.callback === null) {
            o(p);
        } else if (t.startTime <= e) {
            o(p);
            t.sortIndex = t.expirationTime;
            n(u, t);
        } else {
            break;
        }
        t = r(p);
    }
}
function E(e) {
    b = false;
    j(e);
    if (!v) {
        if (r(u) !== null) {
            v = true;
            A();
        } else {
            const t = r(p);
            if (t !== null) {
                _(E, t.startTime - e);
            }
        }
    }
}
let P = false;
let C = -1;
let O = 5;
let x = -1;
export function unstable_shouldYield() {
    return !(unstable_now() - x < O);
}
function T() {
    if (P) {
        let e = unstable_now();
        x = e;
        let n = true;
        try {
            e: {
                v = false;
                if (b) {
                    b = false;
                    y(C);
                    C = -1;
                }
                m = true;
                const i = h;
                try {
                    t: {
                        j(e);
                        for(f = r(u); f !== null && !(f.expirationTime > e && unstable_shouldYield());){
                            const l = f.callback;
                            if (typeof l === "function") {
                                f.callback = null;
                                h = f.priorityLevel;
                                const s = l(f.expirationTime <= e);
                                e = unstable_now();
                                if (typeof s === "function") {
                                    f.callback = s;
                                    j(e);
                                    n = true;
                                    break t;
                                }
                                if (f === r(u)) {
                                    o(u);
                                }
                                j(e);
                            } else {
                                o(u);
                            }
                            f = r(u);
                        }
                        if (f !== null) {
                            n = true;
                        } else {
                            const c = r(p);
                            if (c !== null) {
                                _(E, c.startTime - e);
                            }
                            n = false;
                        }
                    }
                    break e;
                } finally{
                    f = null;
                    h = i;
                    m = false;
                }
            }
        } finally{
            if (n) {
                a();
            } else {
                P = false;
            }
        }
    }
}
if (typeof w === "function") {
    a = function() {
        w(T);
    };
} else if (typeof MessageChannel !== "undefined") {
    const S = new MessageChannel;
    const k = S.port2;
    S.port1.onmessage = T;
    a = function() {
        k.postMessage(null);
    };
} else {
    a = function() {
        g(T, 0);
    };
}
function A() {
    if (!P) {
        P = true;
        a();
    }
}
function _(e, n) {
    C = g(function() {
        e(unstable_now());
    }, n);
}
export const unstable_IdlePriority = 5;
export const unstable_ImmediatePriority = 1;
export const unstable_LowPriority = 4;
export const unstable_NormalPriority = 3;
export const unstable_Profiling = null;
export const unstable_UserBlockingPriority = 2;
export const unstable_cancelCallback = function(e) {
    e.callback = null;
};
export const unstable_continueExecution = function() {
    if (!(v || m)) {
        v = true;
        A();
    }
};
export const unstable_forceFrameRate = function(e) {
    if (e < 0 || e > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
    } else {
        O = e > 0 ? Math.floor(1000 / e) : 5;
    }
};
export const unstable_getCurrentPriorityLevel = function() {
    return h;
};
export const unstable_getFirstCallbackNode = function() {
    return r(u);
};
export const unstable_next = function(e) {
    switch(h){
        case 1:
        case 2:
        case 3:
            var t = 3;
            break;
        default:
            t = h;
    }
    const n = h;
    h = t;
    try {
        return e();
    } finally{
        h = n;
    }
};
export const unstable_pauseExecution = function() {};
export const unstable_requestPaint = function() {};
export const unstable_runWithPriority = function(e, t) {
    switch(e){
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            e = 3;
    }
    const n = h;
    h = e;
    try {
        return t();
    } finally{
        h = n;
    }
};
export const unstable_scheduleCallback = function(priorityLevel, callback, startTime) {
    const a = unstable_now();
    startTime = typeof startTime === "object" && startTime !== null && typeof (startTime = startTime.delay) === "number" && startTime > 0 ? a + startTime : a;
    switch(priorityLevel){
        case 1:
            var expirationTime = -1;
            break;
        case 2:
            expirationTime = 250;
            break;
        case 5:
            expirationTime = 1073741823;
            break;
        case 4:
            expirationTime = 10000;
            break;
        default:
            expirationTime = 5000;
    }
    expirationTime = startTime + expirationTime;
    priorityLevel = {
        id: d++,
        callback,
        priorityLevel,
        startTime,
        expirationTime,
        sortIndex: -1
    };
    if (startTime > a) {
        priorityLevel.sortIndex = startTime;
        n(p, priorityLevel);
        if (r(u) === null && priorityLevel === r(p)) {
            if (b) {
                y(C);
                C = -1;
            } else {
                b = true;
            }
            _(E, startTime - a);
        }
    } else {
        priorityLevel.sortIndex = expirationTime;
        n(u, priorityLevel);
        if (!(v || m)) {
            v = true;
            A();
        }
    }
    return priorityLevel;
};
export const unstable_wrapCallback = function(e) {
    const t = h;
    return function() {
        const n = h;
        h = t;
        try {
            return e.apply(this, arguments);
        } finally{
            h = n;
        }
    };
};
