export function sl(e) {
    return `${e[0]},${e[1]},${e[2]}`;
}
export function Zi(e, t) {
    return `r${e}.${t}`;
}
let a = {
    north: [
        0,
        0,
        -1
    ],
    south: [
        0,
        0,
        1
    ],
    east: [
        1,
        0,
        0
    ],
    west: [
        -1,
        0,
        0
    ],
    up: [
        0,
        1,
        0
    ],
    down: [
        0,
        -1,
        0
    ]
};
let o = {
    north: "west",
    west: "south",
    south: "east",
    east: "north"
};
export function l$(e) {
    return [
        Math.floor(e.position[0]),
        Math.floor(e.position[1]),
        Math.floor(e.position[2])
    ];
}
export function cn(e, t, n) {
    let r = o[t];
    if (!r) {
        return null;
    }
    let i = a[t];
    let l = a[r];
    let s = 0.5 * (n[0] % 2 == 0);
    let u = 0.5 * (n[1] % 2 == 0);
    let f = [
        e[0] - 0.5 + 0.46875 * i[0] - l[0] * s,
        e[1] - 0.5 - u,
        e[2] - 0.5 + 0.46875 * i[2] - l[2] * s
    ];
    let c = f.map(Math.round);
    if (f.every((e, t)=>Math.abs(e - c[t]) < 0.02)) {
        return c;
    }
    return null;
}
export function sU(e) {
    let i;
    let o = null;
    if (e.kind === "item_frame") {
        if (i = e.itemFrame?.facing) {
            o = l$(e);
        }
    } else if (e.kind === "painting") {
        i = e.painting?.facing;
        let t = e.painting?.size;
        if (i && t) {
            o = cn(e.position, i, t);
        }
    }
    if (!o || !i) {
        return null;
    }
    let u = a[i];
    return [
        o[0] - u[0],
        o[1] - u[1],
        o[2] - u[2]
    ];
}
export function kE(e, t) {
    if (e && t.size !== 0) {
        return e.filter((e)=>{
            if (!e.docKey) {
                return false;
            }
            let n = sU(e);
            return !!n && t.has(sl(n));
        });
    }
    return [];
}
export function B_(e, t, n, i) {
    let a = new Set(t.map((e)=>sl(e.position)));
    let o = new Set([
        ...n
    ].filter((e)=>a.has(e)));
    let l = new Set(i ?? []);
    for (let t of kE(e, o)){
        l.add(t.docKey);
    }
    return (e ?? []).filter((e)=>!!e.docKey && l.has(e.docKey));
}
export function Io(e, t, n) {
    if (e) {
        return e.filter((e)=>!!e.docKey && l$(e).every((e, r)=>e >= t[r] && e <= n[r]));
    }
    return [];
}
export function H9(e, t, n, i) {
    let a = new Set(e.map((e)=>sl(e.position)));
    let o = new Set(t.map(sl).filter((e)=>a.has(e)));
    for (let e of t){
        if (!o.has(sl(e))) {
            continue;
        }
        let t = [
            e[0] + n[0],
            e[1] + n[1],
            e[2] + n[2]
        ];
        let i = sl(t);
        if (a.has(i) && !o.has(i)) {
            return t;
        }
    }
    if (i) {
        for (let e of i){
            if (!sU(e)) {
                continue;
            }
            let t = l$(e);
            let i = [
                t[0] + n[0],
                t[1] + n[1],
                t[2] + n[2]
            ];
            let s = sl(i);
            if (a.has(s) && !o.has(s)) {
                return i;
            }
        }
    }
    return null;
}
export function o4(e, t, n) {
    let i = new Set(e.map((e)=>sl(e.position)));
    for (let e of t){
        if (i.has(sl(e))) {
            return [
                e[0],
                e[1],
                e[2]
            ];
        }
    }
    if (n) {
        for (let e of n){
            if (!sU(e)) {
                continue;
            }
            let t = l$(e);
            let n = sl(t);
            if (i.has(n)) {
                return [
                    t[0],
                    t[1],
                    t[2]
                ];
            }
        }
    }
    return null;
}
export function Rr(e) {
    let min = [
        Infinity,
        Infinity,
        Infinity
    ];
    let max = [
        -Infinity,
        -Infinity,
        -Infinity
    ];
    let i = (e)=>{
        for(let t = 0; t < 3; t++){
            min[t] = Math.min(min[t], e[t]);
            max[t] = Math.max(max[t], e[t]);
        }
    };
    for (let t of e.blocks){
        i(t.position);
    }
    for (let n of e.entities ?? []){
        i(l$(n));
    }
    if (min[0] === Infinity) {
        return null;
    }
    return {
        min,
        max
    };
}
export function qD(e) {
    let t = {
        deleted: 0,
        placed: 0,
        moved: 0,
        pasted: 0,
        replaced: 0,
        deletedEntities: 0
    };
    for (let a of e){
        let e = a.operation;
        let o = a.replacement ?? (e?.type === "replace" ? e.replacement : undefined);
        if (o) {
            t.replaced += o.positions.length;
        }
        if (e) {
            if (e.type === "replace-batch") {
                for (let n of e.replacements){
                    t.replaced += n.positions.length;
                }
            } else {
                if (e.type === "delete") {
                    t.deleted += e.deletedBlocks.length;
                    t.deletedEntities += e.deletedEntities?.length ?? 0;
                } else if (e.type === "delete-entities") {
                    t.deletedEntities += e.entities.length;
                } else if (e.type === "move") {
                    t.moved += e.blocks.length;
                } else if (e.type === "place") {
                    t.placed += e.blocks.length;
                } else if (e.type === "paste") {
                    t.pasted += e.blocks.length;
                }
            }
        }
    }
    return t;
}
