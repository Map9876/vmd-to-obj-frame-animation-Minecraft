export function ensureLeadingSlash(e) {
    if (e.startsWith("/")) {
        return e;
    }
    return `/${e}`;
}
