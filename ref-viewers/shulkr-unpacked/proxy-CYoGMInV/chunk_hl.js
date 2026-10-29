function hl(e, t, n) {
    return {
        min: t === undefined ? undefined : e.min + t,
        max: n === undefined ? undefined : e.max + n - (e.max - e.min)
    };
}
export function gl(e, { top, left, bottom, right }) {
    return {
        x: hl(e.x, left, right),
        y: hl(e.y, top, bottom)
    };
}
