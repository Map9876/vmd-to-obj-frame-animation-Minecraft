export function getSegmentValue(e) {
    if (Array.isArray(e)) {
        return e[1];
    }
    return e;
}
