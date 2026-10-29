export let unstable_now;
function r(e, t) {
    let e_length = e.length;
    for(e.push(t); e_length > 0;){
        const n = e_length - 1 >>> 1;
        const a = e[n];
        if (o(a, t) > 0) {
            e[n] = t;
            e[e_length] = a;
            e_length = n;
        } else {
            break;
        }
    }
}
function n(e) {
    if (e.length === 0) {
        return null;
    }
    return e[0];
}
function a(e) {
    if (e.length === 0) {
        return null;
    }
    const t = e[0];
    const r = e.pop();
    if (r !== t) {
        e[0] = r;
        for(let n = 0, a = e.length, i = a >>> 1; n < i;){
            const s = 2 * (n + 1) - 1;
            const l = e[s];
            const u = s + 1;
            const c = e[u];
            if (o(l, r) < 0) {
                if (u < a && o(c, l) < 0) {
                    e[n] = c;
                    e[u] = r;
                    n = u;
                } else {
                    e[n] = l;
                    e[s] = r;
                    n = s;
                }
            } else if (u < a && o(c, r) < 0) {
                e[n] = c;
                e[u] = r;
                n = u;
            } else {
                break;
            }
        }
    }
    return t;
}
function o(e, t) {
    const r = e.sortIndex - t.sortIndex;
    if (r !== 0) {
        return r;
    }
    return e.id - t.id;
}
if (typeof performance === "object" && typeof performance.now === "function") {
    var i;
    const s = performance;
    unstable_now = function() {
        return s.now();
    };
} else {
    const u = Date.now();
    unstable_now = function() {
        return Date.now() - u;
    };
}
const c = [];
const f = [];
let d = 1;
let p = null;
let h = 3;
let _ = false;
let m = false;
let g = false;
let y = false;
const v = typeof setTimeout === "function" ? setTimeout : null;
const b = typeof clearTimeout === "function" ? clearTimeout : null;
const E = typeof setImmediate !== "undefined" ? setImmediate : null;
function R(e) {
    for(let t = n(f); t !== null;){
        if (t.callback === null) {
            a(f);
        } else if (t.startTime <= e) {
            a(f);
            t.sortIndex = t.expirationTime;
            r(c, t);
        } else {
            break;
        }
        t = n(f);
    }
}
function S(e) {
    g = false;
    R(e);
    if (!m) {
        if (n(c) !== null) {
            m = true;
            if (!P) {
                P = true;
                i();
            }
        } else {
            const t = n(f);
            if (t !== null) {
                M(S, t.startTime - e);
            }
        }
    }
}
var P = false;
let O = -1;
let T = 5;
let j = -1;
export function unstable_shouldYield() {
    return !!y || !(unstable_now() - j < T);
}
function x() {
    y = false;
    if (P) {
        let e = unstable_now();
        j = e;
        let r = true;
        try {
            e: {
                m = false;
                if (g) {
                    g = false;
                    b(O);
                    O = -1;
                }
                _ = true;
                const o = h;
                try {
                    t: {
                        R(e);
                        for(p = n(c); p !== null && !(p.expirationTime > e && unstable_shouldYield());){
                            const s = p.callback;
                            if (typeof s === "function") {
                                p.callback = null;
                                h = p.priorityLevel;
                                const l = s(p.expirationTime <= e);
                                e = unstable_now();
                                if (typeof l === "function") {
                                    p.callback = l;
                                    R(e);
                                    r = true;
                                    break t;
                                }
                                if (p === n(c)) {
                                    a(c);
                                }
                                R(e);
                            } else {
                                a(c);
                            }
                            p = n(c);
                        }
                        if (p !== null) {
                            r = true;
                        } else {
                            const u = n(f);
                            if (u !== null) {
                                M(S, u.startTime - e);
                            }
                            r = false;
                        }
                    }
                    break e;
                } finally{
                    p = null;
                    h = o;
                    _ = false;
                }
            }
        } finally{
            if (r) {
                i();
            } else {
                P = false;
            }
        }
    }
}
if (typeof E === "function") {
    i = function() {
        E(x);
    };
} else if (typeof MessageChannel !== "undefined") {
    const A = new MessageChannel;
    const C = A.port2;
    A.port1.onmessage = x;
    i = function() {
        C.postMessage(null);
    };
} else {
    i = function() {
        v(x, 0);
    };
}
function M(e, r) {
    O = v(function() {
        e(unstable_now());
    }, r);
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
export const unstable_forceFrameRate = function(e) {
    if (e < 0 || e > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
    } else {
        T = e > 0 ? Math.floor(1000 / e) : 5;
    }
};
export const unstable_getCurrentPriorityLevel = function() {
    return h;
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
    const r = h;
    h = t;
    try {
        return e();
    } finally{
        h = r;
    }
};
export const unstable_requestPaint = function() {
    y = true;
};
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
    const r = h;
    h = e;
    try {
        return t();
    } finally{
        h = r;
    }
};
export const unstable_scheduleCallback = function(priorityLevel, callback, startTime) {
    const s = unstable_now();
    startTime = typeof startTime === "object" && startTime !== null && typeof (startTime = startTime.delay) === "number" && startTime > 0 ? s + startTime : s;
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
    if (startTime > s) {
        priorityLevel.sortIndex = startTime;
        r(f, priorityLevel);
        if (n(c) === null && priorityLevel === n(f)) {
            if (g) {
                b(O);
                O = -1;
            } else {
                g = true;
            }
            M(S, startTime - s);
        }
    } else {
        priorityLevel.sortIndex = expirationTime;
        r(c, priorityLevel);
        if (!(m || _)) {
            m = true;
            if (!P) {
                P = true;
                i();
            }
        }
    }
    return priorityLevel;
};
export const unstable_wrapCallback = function(e) {
    const t = h;
    return function() {
        const r = h;
        h = t;
        try {
            return e.apply(this, arguments);
        } finally{
            h = r;
        }
    };
};
