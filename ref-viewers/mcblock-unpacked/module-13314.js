let r = /[|\\{}()[\]^$+*?.-]/;
let n = /[|\\{}()[\]^$+*?.-]/g;
export function escapeStringRegexp(e) {
    if (r.test(e)) {
        return e.replace(n, "\\$&");
    }
    return e;
}
