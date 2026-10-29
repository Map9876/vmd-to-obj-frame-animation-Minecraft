export function i(e) {
    return typeof e == `function`;
}
export function a(e, t) {
    if (i(e)) {
        return e(t);
    }
    return e;
}
