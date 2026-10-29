import { l } from "../dist-C5TDMOul.js";
import { g } from "../dist-C66QuM2X.js";
import { s } from "./chunk_kc.js";
import { d, f } from "./chunk_Vc.js";
import { h, m, p } from "./chunk_go.js";
const D = 0;
const O = 255;
class k {
    constructor(){
        this.palette = [
            null
        ];
        this.paletteByKey = new Map;
        this.indices = new Uint8Array(s);
        this._nonAir = 0;
    }
    get nonAir() {
        return this._nonAir;
    }
    get isEmpty() {
        return this._nonAir === 0;
    }
    getByLocalIndex(e) {
        return this.palette[this.indices[e]];
    }
    getLocal(e, t, n) {
        return this.getByLocalIndex(m(e, t, n));
    }
    setByLocalIndex(e, t) {
        let n = this.indices[e];
        let r = this.palette[n];
        if (t === null) {
            if (n !== D) {
                this.indices[e] = D;
                this._nonAir--;
            }
            return r;
        }
        let i = this.internIntoPalette(t);
        if (i !== n) {
            if (n === D) {
                this._nonAir++;
            }
            this.indices[e] = i;
        }
        return r;
    }
    setLocal(e, t, n, r) {
        return this.setByLocalIndex(m(e, t, n), r);
    }
    forEachLocal(e) {
        if (this._nonAir !== 0) {
            for(let t = 0; t < s; t++){
                let n = this.indices[t];
                if (n === D) {
                    continue;
                }
                let r = this.palette[n];
                if (r) {
                    e(t & 15, t >> 8 & 15, t >> 4 & 15, r);
                }
            }
        }
    }
    internIntoPalette(e) {
        let t = this.paletteByKey.get(e.stateKey);
        if (t !== undefined) {
            return t;
        }
        let length = this.palette.length;
        this.palette.push(e);
        this.paletteByKey.set(e.stateKey, length);
        if (length > O && this.indices instanceof Uint8Array) {
            let e = new Uint16Array(s);
            e.set(this.indices);
            this.indices = e;
        }
        return length;
    }
}
class A {
    constructor(){
        this.chunks = new Map;
    }
    get(e) {
        return this.chunks.get(e);
    }
    getOrCreate(e) {
        let t = this.chunks.get(e);
        if (!t) {
            t = new k;
            this.chunks.set(e, t);
        }
        return t;
    }
    delete(e) {
        this.chunks.delete(e);
    }
    has(e) {
        return this.chunks.has(e);
    }
    keys() {
        return this.chunks.keys();
    }
    get size() {
        return this.chunks.size;
    }
}
export class j {
    constructor(e = new A){
        this.blockEntities = new Map;
        this.rawBlockEntities = new Map;
        this.store = e;
    }
    getBlock(e, t, n) {
        let r = this.store.get(d(e, t, n));
        if (r) {
            return r.getByLocalIndex(h(e, t, n));
        }
        return null;
    }
    setBlock(e, t, n, next) {
        let i = d(e, t, n);
        let a = h(e, t, n);
        let o = this.store.get(i);
        let prev = o ? o.getByLocalIndex(a) : null;
        if (prev === next) {
            return null;
        }
        let c = o ?? this.store.getOrCreate(i);
        c.setByLocalIndex(a, next);
        if (c.isEmpty) {
            this.store.delete(i);
        }
        return {
            pos: {
                x: e,
                y: t,
                z: n
            },
            prev,
            next
        };
    }
    getBlockEntity(e, t, n) {
        return this.blockEntities.get(p(e, t, n));
    }
    setBlockEntity(e, t, n, r) {
        let i = p(e, t, n);
        if (r == null) {
            this.blockEntities.delete(i);
        } else {
            this.blockEntities.set(i, r);
        }
    }
    getRawBlockEntity(e, t, n) {
        let r = p(e, t, n);
        return this.rawBlockEntities.get(r) ?? this.blockEntities.get(r);
    }
    setRawBlockEntity(e, t, n, r) {
        let i = p(e, t, n);
        if (r == null) {
            this.rawBlockEntities.delete(i);
        } else {
            this.rawBlockEntities.set(i, r);
        }
    }
    forEachBlock(e) {
        for (let t of this.store.keys()){
            let n = this.store.get(t);
            if (!n) {
                continue;
            }
            let r = f(t);
            let i = r.x * 16;
            let a = r.y * 16;
            let o = r.z * 16;
            n.forEachLocal((t, n, r, s)=>e(i + t, a + n, o + r, s));
        }
    }
    forEachInRegion(e, t) {
        for (let n of this.store.keys()){
            let r = this.store.get(n);
            if (!r) {
                continue;
            }
            let i = f(n);
            let a = i.x * 16;
            let o = i.y * 16;
            let s = i.z * 16;
            if (!(a > e.max.x || a + 16 - 1 < e.min.x || o > e.max.y || o + 16 - 1 < e.min.y || s > e.max.z || s + 16 - 1 < e.min.z)) {
                r.forEachLocal((n, r, i, c)=>{
                    let l = a + n;
                    let u = o + r;
                    let d = s + i;
                    if (l >= e.min.x && l <= e.max.x && u >= e.min.y && u <= e.max.y && d >= e.min.z && d <= e.max.z) {
                        t(l, u, d, c);
                    }
                });
            }
        }
    }
    computeBounds() {
        let e = false;
        let t = Infinity;
        let n = Infinity;
        let r = Infinity;
        let i = -Infinity;
        let a = -Infinity;
        let o = -Infinity;
        this.forEachBlock((s, c, l)=>{
            e = true;
            if (s < t) {
                t = s;
            }
            if (c < n) {
                n = c;
            }
            if (l < r) {
                r = l;
            }
            if (s > i) {
                i = s;
            }
            if (c > a) {
                a = c;
            }
            if (l > o) {
                o = l;
            }
        });
        if (e) {
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
        return null;
    }
    maxAlong(e) {
        let t = new Set;
        for (let n of this.store.keys()){
            let r = f(n);
            t.add(e === 0 ? r.x : e === 1 ? r.y : r.z);
        }
        for (let n of [
            ...t
        ].sort((e, t)=>t - e)){
            let t = -Infinity;
            for (let r of this.store.keys()){
                let i = f(r);
                if ((e === 0 ? i.x : e === 1 ? i.y : i.z) !== n) {
                    continue;
                }
                let a = this.store.get(r);
                if (!a) {
                    continue;
                }
                let o = n * 16;
                a.forEachLocal((n, r, i)=>{
                    let a = o + (e === 0 ? n : e === 1 ? r : i);
                    if (a > t) {
                        t = a;
                    }
                });
            }
            if (t > -Infinity) {
                return t;
            }
        }
        return null;
    }
    get chunkCount() {
        return this.store.size;
    }
    chunkKeys() {
        return this.store.keys();
    }
}
export class M {
    constructor(e = new j, t = {}){
        this.undoStack = [];
        this.redoStack = [];
        this.active = null;
        this.listeners = new Set;
        this.editContext = {
            get: (e, t, n)=>this.world.getBlock(e, t, n),
            set: (e, t, n, r)=>{
                let i = this.world.setBlock(e, t, n, r);
                if (i) {
                    this.active.push(i);
                }
            }
        };
        this.world = e;
        this.behavior = t.behavior ?? null;
        this.maxHistory = t.maxHistory ?? 200;
        this.onChange = t.onChange ?? null;
    }
    getBlock(e, t, n) {
        return this.world.getBlock(e, t, n);
    }
    bounds() {
        return this.world.computeBounds();
    }
    get canUndo() {
        return this.undoStack.length > 0;
    }
    get canRedo() {
        return this.redoStack.length > 0;
    }
    get undoDepth() {
        return this.undoStack.length;
    }
    addChangeListener(e) {
        this.listeners.add(e);
        return ()=>this.listeners.delete(e);
    }
    emit(e, t) {
        this.onChange?.(e, t);
        for (let n of this.listeners){
            n(e, t);
        }
    }
    setBlock(e, t, n, r) {
        if (this.active) {
            this.applyPrimary(e, t, n, r);
            return;
        }
        this.transaction(()=>this.applyPrimary(e, t, n, r));
    }
    transaction(e) {
        if (this.active) {
            e();
            return null;
        }
        this.active = [];
        try {
            e();
        } finally{
            let changes = this.active;
            this.active = null;
            if (changes.length === 0) {
                return null;
            }
            let t = {
                changes
            };
            this.undoStack.push(t);
            if (this.undoStack.length > this.maxHistory) {
                this.undoStack.shift();
            }
            this.redoStack.length = 0;
            this.emit(t, `do`);
            return t;
        }
    }
    undo() {
        let e = this.undoStack.pop();
        if (!e) {
            return null;
        }
        for(let t = e.changes.length - 1; t >= 0; t--){
            let n = e.changes[t];
            this.world.setBlock(n.pos.x, n.pos.y, n.pos.z, n.prev);
        }
        this.redoStack.push(e);
        this.emit(e, `undo`);
        return e;
    }
    redo() {
        let e = this.redoStack.pop();
        if (!e) {
            return null;
        }
        for (let t of e.changes){
            this.world.setBlock(t.pos.x, t.pos.y, t.pos.z, t.next);
        }
        this.undoStack.push(e);
        this.emit(e, `redo`);
        return e;
    }
    placeCells(e) {
        return this.transaction(()=>{
            let t = [];
            for (let n of e){
                let e = this.world.setBlock(n.pos.x, n.pos.y, n.pos.z, n.state);
                if (e) {
                    this.active.push(e);
                    t.push(n);
                }
            }
            for (let e of t){
                this.behavior?.(e.pos, e.state, this.editContext);
            }
        });
    }
    setBlocksRaw(e) {
        return this.transaction(()=>{
            for (let t of e){
                let e = this.world.setBlock(t.pos.x, t.pos.y, t.pos.z, t.state);
                if (e) {
                    this.active.push(e);
                }
            }
        });
    }
    previewEdit(e, t, n, r) {
        let i = new Map;
        let a = (e, t, n)=>`${e},${t},${n}`;
        let o = {
            get: (e, t, n)=>{
                let r = a(e, t, n);
                if (i.has(r)) {
                    return i.get(r);
                }
                return this.world.getBlock(e, t, n);
            },
            set: (e, t, n, r)=>{
                i.set(a(e, t, n), r);
            }
        };
        o.set(e, t, n, r);
        this.behavior?.({
            x: e,
            y: t,
            z: n
        }, r, o);
        let s = [];
        for (let [e, t] of i){
            let [n, r, i] = e.split(`,`).map(Number);
            s.push({
                pos: {
                    x: n,
                    y: r,
                    z: i
                },
                state: t
            });
        }
        return s;
    }
    previewCells(e) {
        let t = new Map;
        let n = (e, t, n)=>`${e},${t},${n}`;
        let r = {
            get: (e, r, i)=>{
                let a = n(e, r, i);
                if (t.has(a)) {
                    return t.get(a);
                }
                return this.world.getBlock(e, r, i);
            },
            set: (e, r, i, a)=>{
                t.set(n(e, r, i), a);
            }
        };
        for (let t of e){
            r.set(t.pos.x, t.pos.y, t.pos.z, t.state);
        }
        for (let t of e){
            this.behavior?.(t.pos, t.state, r);
        }
        let i = [];
        for (let [e, n] of t){
            let [t, r, a] = e.split(`,`).map(Number);
            i.push({
                pos: {
                    x: t,
                    y: r,
                    z: a
                },
                state: n
            });
        }
        return i;
    }
    clearHistory() {
        this.undoStack.length = 0;
        this.redoStack.length = 0;
    }
    applyPrimary(e, t, n, r) {
        let i = this.world.setBlock(e, t, n, r);
        if (i) {
            this.active.push(i);
            this.behavior?.({
                x: e,
                y: t,
                z: n
            }, r, this.editContext);
        }
    }
}
export const N = {
    north: `east`,
    east: `south`,
    south: `west`,
    west: `north`
};
export function ee(e, t) {
    let n = e;
    let r = (t % 4 + 4) % 4;
    for(let e = 0; e < r; e++){
        n = N[n];
    }
    return n;
}
export const oe = [
    {
        dir: `north`,
        dx: 0,
        dz: -1,
        opposite: `south`
    },
    {
        dir: `south`,
        dx: 0,
        dz: 1,
        opposite: `north`
    },
    {
        dir: `west`,
        dx: -1,
        dz: 0,
        opposite: `east`
    },
    {
        dir: `east`,
        dx: 1,
        dz: 0,
        opposite: `west`
    }
];
export const se = {
    down: 1,
    up: 2,
    north: 4,
    south: 8,
    west: 16,
    east: 32
};
export const ce = [
    {
        x: 0,
        y: 0,
        z: 0
    },
    {
        x: 0,
        y: -1,
        z: 0
    },
    {
        x: 0,
        y: 1,
        z: 0
    },
    {
        x: 0,
        y: 0,
        z: -1
    },
    {
        x: 0,
        y: 0,
        z: 1
    },
    {
        x: -1,
        y: 0,
        z: 0
    },
    {
        x: 1,
        y: 0,
        z: 0
    }
];
export const le = [
    {
        x: 1,
        y: 1,
        z: 0
    },
    {
        x: -1,
        y: 1,
        z: 0
    },
    {
        x: 0,
        y: 1,
        z: 1
    },
    {
        x: 0,
        y: 1,
        z: -1
    },
    {
        x: 1,
        y: -1,
        z: 0
    },
    {
        x: -1,
        y: -1,
        z: 0
    },
    {
        x: 0,
        y: -1,
        z: 1
    },
    {
        x: 0,
        y: -1,
        z: -1
    }
];
export const P = {
    north: {
        dx: 0,
        dz: -1
    },
    south: {
        dx: 0,
        dz: 1
    },
    west: {
        dx: -1,
        dz: 0
    },
    east: {
        dx: 1,
        dz: 0
    }
};
export const me = {
    north: `south`,
    south: `north`,
    west: `east`,
    east: `west`
};
export const he = {
    north: `west`,
    west: `south`,
    south: `east`,
    east: `north`
};
export const ge = {
    north: `z`,
    south: `z`,
    west: `x`,
    east: `x`
};
export function ve(e, t, n) {
    return !!e && n[e.id]?.family === `stairs` && e.properties.half === t;
}
