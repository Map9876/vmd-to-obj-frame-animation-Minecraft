import { B } from "./chunk_pe.js";
import { Ae, De, G, K, Me, Ne, Oe, Pe, U, je, ke, q } from "./chunk_be.js";
import { Ie } from "./chunk_Fe.js";
function Le(e, dims, palette) {
    let r = e.varint();
    let i = [];
    let a = 0;
    let o = 0;
    let s = 0;
    let c = 0;
    for(let l = 0; l < r; l++){
        let r = e.u8();
        if (r >> q === Pe) {
            let t = e.varint();
            let items = [];
            for(let i = 0; i < t; i++){
                let state_1 = e.varint();
                let count = e.varint();
                items.push({
                    state: state_1,
                    count,
                    slots: U(palette[state_1]?.name ?? ``, count)
                });
            }
            i.push({
                kind: `restock`,
                items,
                slots: items.reduce((acc, item)=>acc + item.slots, 0)
            });
            continue;
        }
        if (r >> q === Ne) {
            i.push({
                kind: `clear`,
                min: {
                    x: e.signed(),
                    y: e.signed(),
                    z: e.signed()
                },
                max: {
                    x: e.signed(),
                    y: e.signed(),
                    z: e.signed()
                }
            });
            continue;
        }
        let l = (r & je) !== 0;
        let issues = [];
        for(let e = 0; e < K.length; e++){
            if (r & 1 << e + 1) {
                issues.push(K[e]);
            }
        }
        let state = a += e.signed();
        let f = o += e.signed();
        let p = s += e.signed();
        let m = c += e.signed();
        let w = e.varint();
        let h_1 = e.varint();
        let d_1 = e.varint();
        let v = B(dims, f, p, m);
        let anchor = (r & Me) === 0 ? null : {
            cell: v + e.signed(),
            gap: e.varint()
        };
        let b = [];
        for(let e = p; e < p + h_1; e++){
            for(let n = m; n < m + d_1; n++){
                for(let r = f; r < f + w; r++){
                    b.push(B(dims, r, e, n));
                }
            }
        }
        let x = b.length;
        let order = [];
        if (x > 1) {
            for(let t = 0; t < x; t++){
                order.push(b[e.varint()]);
            }
        } else {
            order.push(b[0]);
        }
        i.push({
            kind: `place`,
            shape: {
                kind: `cuboid`,
                w,
                h: h_1,
                d: d_1
            },
            state,
            cells: b,
            order,
            ...l ? {
                issues
            } : {},
            ...anchor ? {
                anchor
            } : {}
        });
    }
    return i;
}
function Re(e) {
    let t = e.varint();
    let n = [];
    let r = 0;
    for(let i = 0; i < t; i++){
        let cell = r += e.signed();
        n.push({
            cell,
            step: e.varint()
        });
    }
    return {
        cells: n
    };
}
const ze = [
    `survival`,
    `creative`
];
export function Be(e) {
    let t = new G(e);
    if (t.u32() !== De) {
        throw Error(`instructions: not a plan`);
    }
    let n = t.varint();
    if (n !== 3) {
        throw Error(`instructions: plan format ${n}, expected 3`);
    }
    let compilerVersion = t.varint();
    let dims = {
        dx: t.varint(),
        dy: t.varint(),
        dz: t.varint()
    };
    let origin = {
        x: t.signed(),
        y: t.signed(),
        z: t.signed()
    };
    let options = {
        mode: ze[t.u8()] ?? `survival`,
        groundPlane: t.u8() === 1
    };
    let s = t.u8();
    let c = new Map;
    for(let e = 0; e < s; e++){
        let e = t.u8();
        c.set(e, {
            offset: t.u32(),
            length: t.u32()
        });
    }
    let l = (t)=>{
        let n = c.get(t);
        if (!n) {
            throw Error(`instructions: plan has no section ${t}`);
        }
        let r = new G(e);
        r.seek(n.offset);
        return r;
    };
    let palette = Ie(l(Oe));
    let d = l(ke);
    let f = d.varint();
    let phases = [];
    for(let e = 0; e < f; e++){
        let label = d.u8() === 1 ? d.string() : null;
        phases.push({
            label,
            steps: Le(d, dims, palette)
        });
    }
    return {
        instructions: {
            compilerVersion,
            options,
            dims,
            origin,
            palette,
            phases
        },
        extras: Re(l(Ae))
    };
}
