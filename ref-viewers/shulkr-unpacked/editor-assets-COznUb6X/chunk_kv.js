const kv = 8;
const Av = 0.05;
export function jv(e, t) {
    let n = t.max.y - t.min.y + 3;
    let r = t.max.z - t.min.z + 3;
    let i = (e, i, a)=>((e - t.min.x + 1) * n + (i - t.min.y + 1)) * r + (a - t.min.z + 1);
    let a = new Set;
    for (let t of e.blocks.values()){
        a.add(i(t.pos.x, t.pos.y, t.pos.z));
    }
    let o = [];
    let s = new Set;
    for (let e of a){
        if (s.has(e)) {
            continue;
        }
        s.add(e);
        let c = {
            cells: [],
            min: {
                x: Infinity,
                y: Infinity,
                z: Infinity
            },
            max: {
                x: -Infinity,
                y: -Infinity,
                z: -Infinity
            }
        };
        let l = [
            e
        ];
        while(l.length > 0){
            let e = l.pop();
            let o = e % r;
            let u = (e - o) / r;
            let d = u % n;
            let f = (u - d) / n - 1 + t.min.x;
            let p = d - 1 + t.min.y;
            let m = o - 1 + t.min.z;
            c.cells.push(e);
            if (f < c.min.x) {
                c.min.x = f;
            }
            if (p < c.min.y) {
                c.min.y = p;
            }
            if (m < c.min.z) {
                c.min.z = m;
            }
            if (f > c.max.x) {
                c.max.x = f;
            }
            if (p > c.max.y) {
                c.max.y = p;
            }
            if (m > c.max.z) {
                c.max.z = m;
            }
            for(let e = -1; e <= 1; e++){
                for(let t = -1; t <= 1; t++){
                    for(let n = -1; n <= 1; n++){
                        if (e === 0 && t === 0 && n === 0) {
                            continue;
                        }
                        let r = i(f + e, p + t, m + n);
                        if (a.has(r) && !s.has(r)) {
                            s.add(r);
                            l.push(r);
                        }
                    }
                }
            }
        }
        o.push(c);
    }
    let a_size = a.size;
    let l = o.filter((e)=>e.cells.length > kv);
    let u = a_size - l.reduce((acc, item)=>acc + item.cells.length, 0);
    if (l.length === 0 || u === 0 || u > a_size * Av) {
        return {
            bounds: t,
            strays: []
        };
    }
    let d = {
        min: {
            x: Infinity,
            y: Infinity,
            z: Infinity
        },
        max: {
            x: -Infinity,
            y: -Infinity,
            z: -Infinity
        }
    };
    for (let e of l){
        d.min.x = Math.min(d.min.x, e.min.x);
        d.min.y = Math.min(d.min.y, e.min.y);
        d.min.z = Math.min(d.min.z, e.min.z);
        d.max.x = Math.max(d.max.x, e.max.x);
        d.max.y = Math.max(d.max.y, e.max.y);
        d.max.z = Math.max(d.max.z, e.max.z);
    }
    let strays = [];
    for (let e of o){
        if (!(e.cells.length > kv)) {
            for (let i of e.cells){
                let e = i % r;
                let a = (i - e) / r;
                let o = a % n;
                strays.push({
                    x: (a - o) / n - 1 + t.min.x,
                    y: o - 1 + t.min.y,
                    z: e - 1 + t.min.z
                });
            }
        }
    }
    return {
        bounds: d,
        strays
    };
}
