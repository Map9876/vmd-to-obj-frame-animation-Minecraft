export function createHrefFromUrl(e, t = true) {
    return e.pathname + e.search + (t ? e.hash : "");
}
