import { t as t_1 } from "../clamp-D2lSjr8C.js";
function U({ values, index, nextValue, min, max, step, minStepsBetweenValues, initialValues }) {
    if (values.length === 0) {
        return [];
    }
    let c = values.slice();
    let l = step * minStepsBetweenValues;
    let u = c.length - 1;
    let d = initialValues ?? values;
    c[index] = t_1(nextValue, min + index * l, max - (u - index) * l);
    for(let e = index + 1; e <= u; e += 1){
        let t = c[e - 1] + l;
        let n = max - (u - e) * l;
        let r = d[e] ?? c[e];
        let a = Math.max(c[e], t);
        if (r < a) {
            a = Math.max(r, t);
        }
        c[e] = t_1(a, t, n);
    }
    for(let e = index - 1; e >= 0; --e){
        let t = c[e + 1] - l;
        let n = min + e * l;
        let i = d[e] ?? c[e];
        let a = Math.min(c[e], t);
        if (i > a) {
            a = Math.min(i, t);
        }
        c[e] = t_1(a, n, t);
    }
    for(let e = 0; e <= u; e += 1){
        c[e] = Number(c[e].toFixed(12));
    }
    return c;
}
export function Oe({ behavior, values, currentValues, initialValues, pressedIndex, nextValue, min, max, step, minStepsBetweenValues }) {
    let values_1 = currentValues ?? values;
    let d = initialValues ?? values;
    if (!(values_1.length > 1)) {
        return {
            value: nextValue,
            thumbIndex: 0,
            didSwap: false
        };
    }
    let f = step * minStepsBetweenValues;
    switch(behavior){
        case `swap`:
            {
                let e = values_1[pressedIndex];
                let t = 1e-7;
                let n = values_1.slice();
                let r = n[pressedIndex - 1];
                let p = n[pressedIndex + 1];
                let m = t_1(nextValue, r == null ? min : r + f, p == null ? max : p - f);
                let h = Number(m.toFixed(12));
                n[pressedIndex] = h;
                let g = nextValue > e;
                let _ = nextValue < e;
                let v = g && p != null && nextValue >= p - t;
                let ee = _ && r != null && nextValue <= r + t;
                if (!v && !ee) {
                    return {
                        value: n,
                        thumbIndex: pressedIndex,
                        didSwap: false
                    };
                }
                let y = v ? pressedIndex + 1 : pressedIndex - 1;
                let initialValues_1 = n.map((e, t)=>{
                    if (t === pressedIndex) {
                        return h;
                    }
                    return d[t] ?? values_1[t];
                });
                let nextValue_1 = nextValue;
                nextValue_1 = v ? Math.max(nextValue, n[y]) : Math.min(nextValue, n[y]);
                let x = U({
                    values: n,
                    index: y,
                    nextValue: nextValue_1,
                    min,
                    max,
                    step,
                    minStepsBetweenValues,
                    initialValues: initialValues_1
                });
                let S = v ? y - 1 : y + 1;
                if (S >= 0 && S < x.length) {
                    let e = x[S - 1];
                    let t = x[S + 1];
                    let n = e == null ? min : e + f;
                    n = Math.max(n, min + S * f);
                    let r = t == null ? max : t - f;
                    r = Math.min(r, max - (x.length - 1 - S) * f);
                    let i = t_1(h, n, r);
                    x[S] = Number(i.toFixed(12));
                }
                return {
                    value: x,
                    thumbIndex: y,
                    didSwap: true
                };
            }
        case `push`:
            return {
                value: U({
                    values: values_1,
                    index: pressedIndex,
                    nextValue,
                    min,
                    max,
                    step,
                    minStepsBetweenValues
                }),
                thumbIndex: pressedIndex,
                didSwap: false
            };
        default:
            {
                let e = values_1.slice();
                let t = e[pressedIndex - 1];
                let n = e[pressedIndex + 1];
                let r = t_1(nextValue, t == null ? min : t + f, n == null ? max : n - f);
                e[pressedIndex] = Number(r.toFixed(12));
                return {
                    value: e,
                    thumbIndex: pressedIndex,
                    didSwap: false
                };
            }
    }
}
