function Mt(e) {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...e
    };
}
export function Nt(e) {
    if (typeof e == `number`) {
        return {
            top: e,
            right: e,
            bottom: e,
            left: e
        };
    }
    return Mt(e);
}
