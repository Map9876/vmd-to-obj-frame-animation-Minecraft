import { BY } from "./module-60057.js";
import { T } from "./module-61571.js";
import { O } from "./module-49636.js";
export let Ow = [
    "debug",
    "info",
    "warn",
    "error",
    "log",
    "assert",
    "trace"
];
export let Z9 = {};
export function pq(e) {
    if (!("console" in O)) {
        return e();
    }
    let O_console = O.console;
    let r = {};
    let n = Object.keys(Z9);
    n.forEach((e)=>{
        let n = Z9[e];
        r[e] = O_console[e];
        O_console[e] = n;
    });
    try {
        return e();
    } finally{
        n.forEach((e)=>{
            O_console[e] = r[e];
        });
    }
}
function isEnabled() {
    return f().enabled;
}
function c(e, ...t) {
    if (T && isEnabled()) {
        pq(()=>{
            O.console[e](`Sentry Logger [${e}]:`, ...t);
        });
    }
}
function f() {
    if (T) {
        return BY("loggerSettings", ()=>({
                enabled: false
            }));
    }
    return {
        enabled: false
    };
}
export let Yz = {
    enable: function() {
        f().enabled = true;
    },
    disable: function() {
        f().enabled = false;
    },
    isEnabled,
    log: function(...e) {
        c("log", ...e);
    },
    warn: function(...e) {
        c("warn", ...e);
    },
    error: function(...e) {
        c("error", ...e);
    }
};
