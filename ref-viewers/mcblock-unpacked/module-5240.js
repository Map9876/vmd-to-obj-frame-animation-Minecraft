export function parsePath(pathname) {
    let t = pathname.indexOf("#");
    let r = pathname.indexOf("?");
    let n = r > -1 && (t < 0 || r < t);
    if (n || t > -1) {
        return {
            pathname: pathname.substring(0, n ? r : t),
            query: n ? pathname.substring(r, t > -1 ? t : undefined) : "",
            hash: t > -1 ? pathname.slice(t) : ""
        };
    }
    return {
        pathname,
        query: "",
        hash: ""
    };
}
