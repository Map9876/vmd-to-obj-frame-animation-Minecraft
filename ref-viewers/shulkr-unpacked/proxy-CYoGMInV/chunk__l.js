function _l(e, t) {
    let min = t.min - e.min;
    let max = t.max - e.max;
    if (t.max - t.min < e.max - e.min) {
        [min, max] = [
            max,
            min
        ];
    }
    return {
        min,
        max
    };
}
export function vl(e, t) {
    return {
        x: _l(e.x, t.x),
        y: _l(e.y, t.y)
    };
}
