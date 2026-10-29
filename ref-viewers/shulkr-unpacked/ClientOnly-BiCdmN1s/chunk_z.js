import { l } from "./chunk_c.js";
function z(e, params, decoder) {
    let r = params[e];
    if (typeof r == `string`) {
        if (e === `_splat`) {
            if (/^[a-zA-Z0-9\-._~!/]*$/.test(r)) {
                return r;
            }
            return r.split(`/`).map((e)=>V(e, decoder)).join(`/`);
        }
        return V(r, decoder);
    }
    return r;
}
export function B({ path, params, decoder, ...rest }) {
    let isMissingParams = false;
    let usedParams = Object.create(null);
    if (!path || path === `/`) {
        return {
            interpolatedPath: `/`,
            usedParams,
            isMissingParams
        };
    }
    if (!path.includes(`$`)) {
        return {
            interpolatedPath: path,
            usedParams,
            isMissingParams
        };
    }
    let path_length = path.length;
    let s = 0;
    let c;
    let u = ``;
    while(s < path_length){
        let r = s;
        c = l(path, r, c);
        let o = c[5];
        s = o + 1;
        if (r === o) {
            continue;
        }
        let d = c[0];
        if (d === 0) {
            u += `/` + path.substring(r, o);
            continue;
        }
        if (d === 2) {
            let s = params._splat;
            usedParams._splat = s;
            usedParams[`*`] = s;
            let l = path.substring(r, c[1]);
            let d = path.substring(c[4], o);
            if (!s) {
                isMissingParams = true;
                if (l || d) {
                    u += `/` + l + d;
                }
                continue;
            }
            let f = z(`_splat`, params, decoder);
            u += `/` + l + f + d;
            continue;
        }
        if (d === 1) {
            let s = path.substring(c[2], c[3]);
            if (!isMissingParams && !(s in params)) {
                isMissingParams = true;
            }
            usedParams[s] = params[s];
            let l = path.substring(r, c[1]);
            let d = path.substring(c[4], o);
            let f = z(s, params, decoder) ?? `undefined`;
            u += `/` + l + f + d;
            continue;
        }
        if (d === 3) {
            let i = path.substring(c[2], c[3]);
            let s = params[i];
            if (s == null) {
                continue;
            }
            usedParams[i] = s;
            let l = path.substring(r, c[1]);
            let d = path.substring(c[4], o);
            let f = z(i, params, decoder) ?? ``;
            u += `/` + l + f + d;
            continue;
        }
    }
    if (path.endsWith(`/`)) {
        u += `/`;
    }
    return {
        usedParams,
        interpolatedPath: u || `/`,
        isMissingParams
    };
}
function V(e, decoder) {
    let n = encodeURIComponent(e);
    return decoder?.(n) ?? n;
}
