export let yF = "?";
let a = /\(error: (.*)\)/;
let o = /captureMessage|captureException/;
export function gd(...e) {
    let t = e.sort((e, t)=>e[0] - t[0]).map((e)=>e[1]);
    return (e, r = 0, i = 0)=>{
        let s = [];
        let u = e.split("\n");
        for(let e = r; e < u.length; e++){
            let r = u[e];
            if (r.length > 1024) {
                r = r.slice(0, 1024);
            }
            let n = a.test(r) ? r.replace(a, "$1") : r;
            if (!n.includes("Error: ")) {
                for (let e of t){
                    let t = e(n);
                    if (t) {
                        s.push(t);
                        break;
                    }
                }
                if (s.length >= 50 + i) {
                    break;
                }
            }
        }
        var c = s.slice(i);
        if (!c.length) {
            return [];
        }
        let f = Array.from(c);
        if (/sentryWrapped/.test(l(f).function || "")) {
            f.pop();
        }
        f.reverse();
        if (o.test(l(f).function || "")) {
            f.pop();
            if (o.test(l(f).function || "")) {
                f.pop();
            }
        }
        return f.slice(0, 50).map((e)=>({
                ...e,
                filename: e.filename || l(f).filename,
                function: e.function || yF
            }));
    };
}
export function vk(e) {
    if (Array.isArray(e)) {
        return gd(...e);
    }
    return e;
}
function l(e) {
    return e[e.length - 1] || {};
}
let u = "<anonymous>";
export function qQ(e) {
    try {
        if (!e || typeof e !== "function") {
            return u;
        }
        return e.name || u;
    } catch  {
        return u;
    }
}
export function RV({ exception }) {
    if (exception) {
        let e = [];
        try {
            exception.values.forEach((t)=>{
                if (t.stacktrace.frames) {
                    e.push(...t.stacktrace.frames);
                }
            });
            return e;
        } catch  {}
    }
}
export function nY(e) {
    if ("__v_isVNode" in e && e.__v_isVNode) {
        return "[VueVNode]";
    }
    return "[VueViewModel]";
}
