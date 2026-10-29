function vo(e) {
    if (e.startsWith(`matrix3d(`)) {
        let t = e.slice(9, -1).split(/, /);
        return {
            x: +t[12],
            y: +t[13],
            scaleX: +t[0],
            scaleY: +t[5]
        };
    } else if (e.startsWith(`matrix(`)) {
        let t = e.slice(7, -1).split(/, /);
        return {
            x: +t[4],
            y: +t[5],
            scaleX: +t[0],
            scaleY: +t[3]
        };
    }
    return null;
}
export function yo(e, t, n) {
    let r = vo(t);
    if (!r) {
        return e;
    }
    let { scaleX, scaleY, x, y } = r;
    let left = e.left - x - (1 - scaleX) * parseFloat(n);
    let top = e.top - y - (1 - scaleY) * parseFloat(n.slice(n.indexOf(` `) + 1));
    let width = scaleX ? e.width / scaleX : e.width;
    let height = scaleY ? e.height / scaleY : e.height;
    return {
        width,
        height,
        top,
        right: left + width,
        bottom: top + height,
        left
    };
}
