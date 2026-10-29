export function $(...args) {
    let e;
    let r;
    for(var o = 0, t = "", l = args.length; o < l; o++){
        if ((e = args[o]) && (r = function e(r) {
            let o;
            let t;
            let l = "";
            if (typeof r === "string" || typeof r === "number") {
                l += r;
            } else if (typeof r === "object") {
                if (Array.isArray(r)) {
                    const a = r.length;
                    for(o = 0; o < a; o++){
                        if (r[o] && (t = e(r[o]))) {
                            if (l) {
                                l += " ";
                            }
                            l += t;
                        }
                    }
                } else {
                    for(t in r){
                        if (r[t]) {
                            if (l) {
                                l += " ";
                            }
                            l += t;
                        }
                    }
                }
            }
            return l;
        }(e))) {
            if (t) {
                t += " ";
            }
            t += r;
        }
    }
    return t;
}
