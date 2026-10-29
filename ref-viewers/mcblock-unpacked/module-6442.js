import "./module-86897.js";
import { useEffect, useRef } from "./module-61426.js";
import { D } from "./module-59040.js";
import { qA } from "./module-8652.js";
import { GOR, Pq0, V9B, YJl, bdM, eaF, er$, k6q, kn4 } from "./module-85339.js";
const a = require(67721);
let c = new Pq0(0, 1, 0);
function u(e, t) {
    return `${e.italic ? "italic " : ""}${e.bold ? "bold " : ""}${t}px "Minecraft AE", "Noto Sans SC", monospace`;
}
class d {
    update(e) {
        if (!this.disposed) {
            for (let { block, object } of this.entries){
                object.visible = e(block, object.matrix);
                object.matrixWorldNeedsUpdate = true;
            }
        }
    }
    dispose() {
        if (!this.disposed) {
            for (let e of (this.disposed = true, this.geometries)){
                e.dispose();
            }
            for (let { texture, material, canvas } of this.textures.values()){
                material.dispose();
                texture.dispose();
                canvas.width = 0;
                canvas.height = 0;
            }
            this.group.clear();
            this.entries = [];
            this.geometries = [];
            this.textures.clear();
        }
    }
    constructor(e, t){
        this.group = new YJl;
        this.entries = [];
        this.textures = new Map;
        this.geometries = [];
        this.disposed = false;
        this.group.name = "SignText";
        try {
            for (let block of e){
                if (!a.Qv(block.blockId) || !block.renderData?.sign) {
                    continue;
                }
                let object = new YJl;
                for (let n of ((e, block_1)=>{
                    if (!a.Qv(block_1.blockId) || e.userData.magentaFallback) {
                        return [];
                    }
                    let i = {
                        south: [
                            0,
                            0,
                            1
                        ],
                        north: [
                            0,
                            0,
                            -1
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
                        ]
                    };
                    let l = Number(block_1.properties.rotation ?? 0) * Math.PI / 8;
                    let o = block_1.properties.facing ?? (block_1.blockId.includes("_wall_") ? "north" : undefined);
                    let u = o && i[o] ? new Pq0(...i[o]) : new Pq0(-Math.sin(l), 0, Math.cos(l));
                    let d = e.getAttribute("position");
                    let h = e.getAttribute("normal");
                    if (!d || !h) {
                        return [];
                    }
                    let f = [];
                    for (let side of [
                        "front",
                        "back"
                    ]){
                        let t;
                        let normal = u.clone().multiplyScalar(side === "front" ? 1 : -1);
                        let right = c.clone().cross(normal);
                        for(let i = 0; i + 3 < d.count; i += 4){
                            if (new Pq0().fromBufferAttribute(h, i).dot(normal) < 0.999) {
                                continue;
                            }
                            let l = Array.from({
                                length: 4
                            }, (e, t)=>new Pq0().fromBufferAttribute(d, i + t));
                            let o = l.map((e)=>e.dot(right));
                            let a = l.map((e)=>e.y);
                            let u = Math.min(...o);
                            let f = Math.max(...o);
                            let p = Math.min(...a);
                            let g = Math.max(...a);
                            let width = f - u;
                            let height = g - p;
                            if (!(width < 0.5 || height < 0.25 || width / height < 1.25 || t && t.width * t.height >= width * height)) {
                                t = {
                                    side,
                                    normal,
                                    right,
                                    width,
                                    height,
                                    center: right.clone().multiplyScalar((u + f) / 2).addScaledVector(c, (p + g) / 2).addScaledVector(normal, l[0].dot(normal) + 0.0015)
                                };
                            }
                        }
                        if (t) {
                            f.push(t);
                        }
                    }
                    return f;
                })(t(block), block)){
                    let t = block.renderData.sign[n.side];
                    if (!t || !t.lines.some((e)=>e.some((e)=>e.text.trim()))) {
                        continue;
                    }
                    let i = JSON.stringify([
                        t,
                        n.width / n.height
                    ]);
                    let l = this.textures.get(i);
                    if (!l) {
                        let canvas = document.createElement("canvas");
                        ((canvas_1, t, n)=>{
                            canvas_1.width = 512;
                            canvas_1.height = Math.round(512 / n);
                            let r = canvas_1.getContext("2d");
                            if (!r) {
                                throw Error("无法创建告示牌文字画布");
                            }
                            let i = 0.18 * canvas_1.height;
                            let l = 0.205 * canvas_1.height;
                            r.textBaseline = "middle";
                            r.save();
                            r.beginPath();
                            r.rect(0.08 * canvas_1.width, 0, 0.84 * canvas_1.width, canvas_1.height);
                            r.clip();
                            for(let n = 0; n < 4; n++){
                                let s = t.lines[n] ?? [];
                                let c = s.map((e)=>{
                                    r.font = u(e, i);
                                    return r.measureText(e.text).width;
                                });
                                let d = (canvas_1.width - c.reduce((acc, item)=>acc + item, 0)) / 2;
                                let h = canvas_1.height / 2 + (n - 1.5) * l;
                                s.forEach((e, n)=>{
                                    r.font = u(e, i);
                                    let s = e.color ?? a.Iy[t.color] ?? a.Iy.black;
                                    r.fillStyle = t.glowing && s === "#000000" ? "#f0ebcc" : s;
                                    if (t.glowing) {
                                        r.strokeStyle = s === "#000000" ? "#000000" : "#333333";
                                        r.lineWidth = Math.max(1, i / 10);
                                        r.lineJoin = "round";
                                        r.strokeText(e.text, d, h);
                                    }
                                    r.fillText(e.text, d, h);
                                    if (e.underlined || e.strikethrough) {
                                        for (let t of [
                                            ...e.underlined ? [
                                                0.45 * i
                                            ] : [],
                                            ...e.strikethrough ? [
                                                0
                                            ] : []
                                        ]){
                                            r.fillRect(d, h + t, c[n], Math.max(1, i / 12));
                                        }
                                    }
                                    d += c[n];
                                });
                            }
                            r.restore();
                        })(canvas, t, n.width / n.height);
                        let r = new GOR(canvas);
                        r.colorSpace = er$;
                        r.minFilter = k6q;
                        r.magFilter = k6q;
                        let material = new V9B({
                            map: r,
                            color: t.glowing ? 16777215 : 6710886,
                            transparent: true,
                            alphaTest: 0.01,
                            depthTest: true,
                            depthWrite: false,
                            toneMapped: false
                        });
                        l = {
                            texture: r,
                            material,
                            canvas
                        };
                        this.textures.set(i, l);
                    }
                    let o = new bdM(n.width, n.height);
                    let d = new kn4().makeBasis(n.right, c, n.normal).setPosition(n.center);
                    o.applyMatrix4(d);
                    this.geometries.push(o);
                    let h = new eaF(o, l.material);
                    h.raycast = ()=>{};
                    object.add(h);
                }
                if (object.children.length) {
                    object.matrixAutoUpdate = false;
                    object.visible = false;
                    this.group.add(object);
                    this.entries.push({
                        block,
                        object
                    });
                }
            }
        } catch (error) {
            this.dispose();
            throw error;
        }
    }
}
export function A({ blocks, resources, copyTransform }) {
    let aRef = useRef(null);
    let cRef = useRef(null);
    useEffect(()=>{
        if (!blocks.some((e)=>e.renderData?.sign)) {
            return;
        }
        let e = false;
        (document.fonts ? Promise.all([
            document.fonts.load('32px "Minecraft AE"'),
            document.fonts.load('32px "Noto Sans SC"')
        ]).catch(()=>undefined) : Promise.resolve()).then(()=>{
            if (e) {
                return;
            }
            let r = new Map;
            try {
                let e = new d(blocks, (e)=>{
                    let t = JSON.stringify([
                        e.blockId,
                        e.properties
                    ]);
                    let i = r.get(t);
                    if (!i) {
                        i = qA(e.blockId, e.properties, resources);
                        r.set(t, i);
                    }
                    return i;
                });
                cRef.current = e;
                aRef.current?.add(e.group);
            } catch (error) {
                console.error("告示牌文字加载失败:", error);
            } finally{
                for (let e of r.values()){
                    e.dispose();
                }
            }
        });
        return ()=>{
            e = true;
            if (cRef.current) {
                aRef.current?.remove(cRef.current.group);
                cRef.current.dispose();
                cRef.current = null;
            }
        };
    }, [
        blocks,
        resources
    ]);
    D(()=>cRef.current?.update(copyTransform));
    return <group ref={aRef}/>;
}
