let r = [];
function o(e, keys, n = (e, t)=>e === t) {
    if (e === keys) {
        return true;
    }
    if (!e || !keys) {
        return false;
    }
    let e_length = e.length;
    if (keys.length !== e_length) {
        return false;
    }
    for(let o = 0; o < e_length; o++){
        if (!n(e[o], keys[o])) {
            return false;
        }
    }
    return true;
}
function i(e, keys = null, n = false, a = {}) {
    for (let i of (keys === null && (keys = [
        e
    ]), r)){
        if (o(keys, i.keys, i.equal)) {
            if (n) {
                return;
            }
            if (Object.prototype.hasOwnProperty.call(i, "error")) {
                throw i.error;
            }
            if (Object.prototype.hasOwnProperty.call(i, "response")) {
                if (a.lifespan && a.lifespan > 0) {
                    if (i.timeout) {
                        clearTimeout(i.timeout);
                    }
                    i.timeout = setTimeout(i.remove, a.lifespan);
                }
                return i.response;
            }
            if (!n) {
                throw i.promise;
            }
        }
    }
    let l = {
        keys,
        equal: a.equal,
        remove: ()=>{
            let e = r.indexOf(l);
            if (e !== -1) {
                r.splice(e, 1);
            }
        },
        promise: (typeof e === "object" && typeof e.then === "function" ? e : e(...keys)).then((e)=>{
            l.response = e;
            if (a.lifespan && a.lifespan > 0) {
                l.timeout = setTimeout(l.remove, a.lifespan);
            }
        }).catch((e)=>l.error = e)
    };
    r.push(l);
    if (!n) {
        throw l.promise;
    }
}
export let DY = (e, t, n)=>i(e, t, false, n);
export let uv = (e, t, n)=>void i(e, t, true, n);
export let IU = (e)=>{
    if (e === undefined || e.length === 0) {
        r.splice(0, r.length);
    } else {
        let t = r.find((t)=>o(e, t.keys, t.equal));
        if (t) {
            t.remove();
        }
    }
};
