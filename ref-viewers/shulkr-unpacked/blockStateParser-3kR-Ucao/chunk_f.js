const f = Object.freeze({
    min: {
        x: 0,
        y: 0,
        z: 0
    },
    max: {
        x: 0,
        y: 0,
        z: 0
    }
});
export function p(e) {
    let t = Infinity;
    let n = Infinity;
    let r = Infinity;
    let i = -Infinity;
    let a = -Infinity;
    let o = -Infinity;
    let s = false;
    for (let c of e){
        s = true;
        let { x, y, z } = c.pos;
        if (x < t) {
            t = x;
        }
        if (y < n) {
            n = y;
        }
        if (z < r) {
            r = z;
        }
        if (x > i) {
            i = x;
        }
        if (y > a) {
            a = y;
        }
        if (z > o) {
            o = z;
        }
    }
    if (s) {
        return {
            min: {
                x: t,
                y: n,
                z: r
            },
            max: {
                x: i,
                y: a,
                z: o
            }
        };
    }
    return f;
}
