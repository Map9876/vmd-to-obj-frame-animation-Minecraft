export function d0(e, o, i) {
    let r = e[0] * i[0] + e[1] * i[1] + e[2] * i[2] > 0 ? [
        -e[0],
        -e[1],
        -e[2]
    ] : [
        e[0],
        e[1],
        e[2]
    ];
    let t = Math.max(Math.abs(r[0]), Math.abs(r[1]), Math.abs(r[2])) < 0.9 ? [
        -i[0],
        -i[1],
        -i[2]
    ] : r;
    return {
        normal: ((e, o, i)=>{
            let r = Math.abs(e);
            let t = Math.abs(o);
            let n = Math.abs(i);
            if (Number.isFinite(r) && Number.isFinite(t) && Number.isFinite(n) && r + t + n !== 0) {
                if (r >= t && r >= n) {
                    return [
                        e > 0 ? 1 : -1,
                        0,
                        0
                    ];
                }
                if (t >= n) {
                    return [
                        0,
                        o > 0 ? 1 : -1,
                        0
                    ];
                }
                return [
                    0,
                    0,
                    i > 0 ? 1 : -1
                ];
            }
            return [
                0,
                1,
                0
            ];
        })(t[0], t[1], t[2]),
        point: [
            o[0],
            o[1],
            o[2]
        ]
    };
}
