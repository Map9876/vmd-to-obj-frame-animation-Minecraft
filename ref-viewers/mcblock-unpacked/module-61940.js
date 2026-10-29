let r = new WeakMap;
export function normalizeLocalePath(pathname, t) {
    let detectedLocale;
    if (!t) {
        return {
            pathname
        };
    }
    let a = r.get(t);
    if (!a) {
        a = t.map((e)=>e.toLowerCase());
        r.set(t, a);
    }
    let o = pathname.split("/", 2);
    if (!o[1]) {
        return {
            pathname
        };
    }
    let i = o[1].toLowerCase();
    let s = a.indexOf(i);
    if (s < 0) {
        return {
            pathname
        };
    }
    detectedLocale = t[s];
    return {
        pathname: pathname = pathname.slice(detectedLocale.length + 1) || "/",
        detectedLocale
    };
}
