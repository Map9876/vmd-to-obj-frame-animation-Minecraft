const gr = 0.12;
const _r = 1.6;
export function vr(x, y, n) {
    let r = Math.hypot(x, y) / n;
    let knob = r > 1 ? {
        x: x / r,
        y: y / r
    } : {
        x,
        y
    };
    if (r <= 0.12) {
        return {
            knob,
            forward: 0,
            strafe: 0
        };
    }
    let a = ((Math.min(r, 1) - gr) / (1 - gr)) ** _r / (r * n);
    return {
        knob,
        forward: -y * a,
        strafe: x * a
    };
}
