import "./module-86897.js";
import { g as g_1 } from "./module-78356.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "./module-61426.js";
import { Pq0, ZLX, kn4 } from "./module-85339.js";
import { Ay } from "./module-47605.js";
import * as a from "./module-59040.js";
import { b3, c2, y6 } from "./module-37578.js";
import { Ru } from "./module-87774.js";
import { s as s_1 } from "./module-84817.js";
import { e as e_1 } from "./module-53281.js";
import { _0 } from "./module-46422.js";
import * as v from "./module-11828.js";
import { A } from "./module-6442.js";
function f(e) {
    let t = 0;
    for (let n of e){
        t += Math.max(0, n.end - n.start);
    }
    return t;
}
function p(e) {
    return e > 0 && e <= 256;
}
let g = {
    duration: 0.3,
    stagger: 0.004,
    enableBounce: true,
    bounceAmount: 1.1,
    sortByY: true,
    groupByConnectivity: true,
    groupGap: 0.16,
    maxTotalDelay: 2.4
};
let m = [
    [
        1,
        0,
        0
    ],
    [
        -1,
        0,
        0
    ],
    [
        0,
        1,
        0
    ],
    [
        0,
        -1,
        0
    ],
    [
        0,
        0,
        1
    ],
    [
        0,
        0,
        -1
    ]
];
class y {
    async animateBlocksIn(e, t) {
        let n = {
            ...g,
            ...t
        };
        let r = [];
        for (let [, t] of e){
            let e = new kn4;
            for(let n = t.start; n < t.end; n++){
                t.mesh.getMatrixAt(n, e);
                let i = new Pq0;
                i.setFromMatrixPosition(e);
                this.manager.setInstanceScale(t.mesh, n, 0, 0, 0);
                let l = this.manager.getBlockFromHit(t.mesh, n);
                r.push({
                    mesh: t.mesh,
                    instanceIndex: n,
                    position: i,
                    grid: l ? [
                        l.position[0],
                        l.position[1],
                        l.position[2]
                    ] : null,
                    delay: 0
                });
            }
        }
        if (r.length === 0) {
            return;
        }
        if (n.sortByY) {
            r.sort((e, t)=>e.position.y - t.position.y);
        }
        let i = [];
        if (n.groupByConnectivity) {
            let e = new Map;
            for (let t of r){
                if (t.grid) {
                    e.set(`${t.grid[0]},${t.grid[1]},${t.grid[2]}`, t);
                }
            }
            let t = new Set;
            for (let n of r){
                if (t.has(n)) {
                    continue;
                }
                t.add(n);
                if (!n.grid) {
                    i.push([
                        n
                    ]);
                    continue;
                }
                let r = [];
                let l = [
                    n
                ];
                while(l.length > 0){
                    let n = l.pop();
                    r.push(n);
                    if (n.grid) {
                        for (let [r, i, o] of m){
                            let s = e.get(`${n.grid[0] + r},${n.grid[1] + i},${n.grid[2] + o}`);
                            if (s && !t.has(s)) {
                                t.add(s);
                                l.push(s);
                            }
                        }
                    }
                }
                i.push(r);
            }
            for (let e of i){
                e.sort((e, t)=>e.position.y - t.position.y);
            }
            let n = 0;
            let l = 0;
            let o = 0;
            for (let e of r){
                n += e.grid ? e.grid[0] : e.position.x;
                l += e.grid ? e.grid[2] : e.position.z;
                o += 1;
            }
            if (o > 0) {
                n /= o;
                l /= o;
            }
            let s = new Map(i.map((e)=>[
                    e,
                    ((e)=>{
                        let layer = Infinity;
                        let r = 0;
                        let i = 0;
                        for (let n of e){
                            let e = n.grid ? n.grid[1] : Math.round(n.position.y);
                            if (e < layer) {
                                layer = e;
                            }
                            r += n.grid ? n.grid[0] : n.position.x;
                            i += n.grid ? n.grid[2] : n.position.z;
                        }
                        let o = r / e.length;
                        let s = i / e.length;
                        let a = o - n;
                        let c = s - l;
                        return {
                            layer,
                            angle: a * a + c * c < 0.000001 ? 0 : Math.atan2(c, a)
                        };
                    })(e)
                ]));
            i.sort((e, t)=>{
                let n = s.get(e);
                let r = s.get(t);
                return n.layer - r.layer || n.angle - r.angle;
            });
        } else {
            i.push(r);
        }
        let n_stagger = n.stagger;
        let n_groupGap = n.groupGap;
        let c = (r.length - i.length) * n_stagger + Math.max(0, i.length - 1) * n_groupGap;
        if (c > n.maxTotalDelay && c > 0) {
            let e = n.maxTotalDelay / c;
            n_stagger *= e;
            n_groupGap *= e;
        }
        let u = 0;
        for (let e of i){
            for(let t = 0; t < e.length; t++){
                e[t].delay = u + t * n_stagger;
            }
            u += (e.length - 1) * n_stagger + n_groupGap;
        }
        for (let e of (r.length = 0, i)){
            r.push(...e);
        }
        return new Promise((resolve)=>{
            let i = Ay.timeline({
                onComplete: ()=>{
                    for (let [, t] of e){
                        this.manager.resetInstanceScales(t.mesh, t.start, t.end);
                    }
                    this.removeAnimation(l);
                    resolve();
                }
            });
            for (const t of r){
                let l = {
                    scale: 0
                };
                let o = t.delay;
                if (n.enableBounce) {
                    i.to(l, {
                        scale: n.bounceAmount,
                        duration: 0.7 * n.duration,
                        ease: "power2.out",
                        onUpdate: ()=>{
                            this.manager.setInstanceScale(t.mesh, t.instanceIndex, l.scale, l.scale, l.scale);
                        }
                    }, o).to(l, {
                        scale: 1,
                        duration: 0.3 * n.duration,
                        ease: "power2.in",
                        onUpdate: ()=>{
                            this.manager.setInstanceScale(t.mesh, t.instanceIndex, l.scale, l.scale, l.scale);
                        }
                    }, o + 0.7 * n.duration);
                } else {
                    i.to(l, {
                        scale: 1,
                        duration: n.duration,
                        ease: "power2.inOut",
                        onUpdate: ()=>{
                            this.manager.setInstanceScale(t.mesh, t.instanceIndex, l.scale, l.scale, l.scale);
                        }
                    }, o);
                }
            }
            let l = {
                timeline: i,
                cancel: ()=>{
                    for (let [, t] of (i.kill(), e)){
                        this.manager.resetInstanceScales(t.mesh, t.start, t.end);
                    }
                    resolve();
                }
            };
            this.activeAnimations.push(l);
        });
    }
    async animateBlocksOut(e, t) {
        let n = {
            ...g,
            ...t
        };
        let r = [];
        for (let [, t] of e){
            let e = new kn4;
            for(let n = t.start; n < t.end; n++){
                t.mesh.getMatrixAt(n, e);
                let i = new Pq0;
                i.setFromMatrixPosition(e);
                r.push({
                    mesh: t.mesh,
                    instanceIndex: n,
                    position: i
                });
            }
        }
        if (r.length !== 0) {
            if (n.sortByY) {
                r.sort((e, t)=>t.position.y - e.position.y);
            }
            return new Promise((resolve)=>{
                let i = Ay.timeline({
                    onComplete: ()=>{
                        this.removeAnimation(l);
                        resolve();
                    }
                });
                for(let e = 0; e < r.length; e++){
                    let t = r[e];
                    let l = {
                        scale: 1
                    };
                    let o = e * n.stagger;
                    i.to(l, {
                        scale: 0,
                        duration: n.duration,
                        ease: "power2.in",
                        onUpdate: ()=>{
                            this.manager.setInstanceScale(t.mesh, t.instanceIndex, l.scale, l.scale, l.scale);
                        }
                    }, o);
                }
                let l = {
                    timeline: i,
                    cancel: ()=>{
                        for (let [, t] of (i.kill(), e)){
                            this.manager.resetInstanceScales(t.mesh, t.start, t.end);
                        }
                        resolve();
                    }
                };
                this.activeAnimations.push(l);
            });
        }
    }
    async animateStepForward(e, t, n, r) {
        this.cancelAll();
        let i = this.manager.getNewInstanceRange(e, t, n);
        if (e === "step") {
            this.manager.setVisibleStep(n);
        } else {
            this.manager.setVisibleLayer(n);
        }
        if (p(f(i.values()))) {
            await this.animateBlocksIn(i, r);
        }
    }
    async animateStepBackward(e, t, n, r) {
        this.cancelAll();
        let i = this.manager.getNewInstanceRange(e, n, t);
        if (!p(f(i.values()))) {
            return void (e === "step" ? this.manager.setVisibleStep(n) : this.manager.setVisibleLayer(n));
        }
        await this.animateBlocksOut(i, r);
        if (e === "step") {
            this.manager.setVisibleStep(n);
        } else {
            this.manager.setVisibleLayer(n);
        }
    }
    cancelAll() {
        for (let e of this.activeAnimations){
            e.cancel();
        }
        this.activeAnimations = [];
    }
    isAnimating() {
        return this.activeAnimations.length > 0;
    }
    dispose() {
        this.cancelAll();
    }
    removeAnimation(e) {
        let t = this.activeAnimations.indexOf(e);
        if (t >= 0) {
            this.activeAnimations.splice(t, 1);
        }
    }
    constructor(e){
        this.activeAnimations = [];
        this.manager = e;
    }
}
function MComponent({ model, stepData, mode, currentIndex, enableAnimation = true, stepOutlineMode = "off", selectionContourMode = "object", onBlockClick, onEntityClick, selectedEntity, onReady, onError, highlightedBlockId, controlsRef, resetCameraKey, focusMode = false, explodedSpacing = 0, emissiveConfig, selectedBlockPosition, showDecorEntities = true, showCreatures = false }) {
    let { camera, raycaster } = a.C();
    let FRef = useRef(null);
    let [N, setN] = useState(null);
    let resources = useMemo(()=>{
        if (N) {
            return g_1(N, model);
        }
        return null;
    }, [
        N,
        model.sourceMeta?.dataVersion
    ]);
    let [L, setL] = useState(null);
    let GRef = useRef(null);
    let JRef = useRef(null);
    let HRef = useRef(-1);
    let WRef = useRef(false);
    let KRef = useRef(false);
    let QRef = useRef(null);
    let XRef = useRef(null);
    let ZRef = useRef(false);
    let $RefRef = useRef(0);
    let ee = mode === "step" ? "step" : "layer";
    let etRef = useRef({
        mode: stepOutlineMode
    });
    etRef.current = {
        mode: stepOutlineMode
    };
    let enRef = useRef(selectionContourMode);
    enRef.current = selectionContourMode;
    let explodeMinY = useMemo(()=>{
        if (model.blocks.length === 0) {
            return 0;
        }
        let e = Infinity;
        for (let t of model.blocks){
            if (t.position[1] < e) {
                e = t.position[1];
            }
        }
        if (e === Infinity) {
            return 0;
        }
        return e;
    }, [
        model.blocks
    ]);
    let entities = useMemo(()=>{
        let model_entities = model.entities;
        if (!model_entities?.length) {
            return;
        }
        if (showDecorEntities && showCreatures) {
            return model_entities;
        }
        if (!showDecorEntities && !showCreatures) {
            return;
        }
        let t = model_entities.filter((e)=>{
            if (e.kind === "generic") {
                return showCreatures;
            }
            return showDecorEntities;
        });
        if (t.length > 0) {
            return t;
        }
    }, [
        model.entities,
        showDecorEntities,
        showCreatures
    ]);
    let entityStepIndex = useMemo(()=>_0(model.entities, stepData, stepData?.length ?? 0), [
        model.entities,
        stepData
    ]);
    let eo = useCallback((e)=>onEntityClick?.(e, entityStepIndex.get(e)), [
        onEntityClick,
        entityStepIndex
    ]);
    let copyTransform = useCallback((e, t)=>{
        var r;
        return (r = GRef.current?.copyBlockTransform(e, t)) != null && r;
    }, []);
    useEffect(()=>{
        y6().then(setN).catch((e)=>{
            console.error("MC 资源初始化失败:", e);
            let t = c2(e);
            setL(t);
            onError?.(t);
        });
    }, [
        onError
    ]);
    useEffect(()=>{
        if (!resources) {
            return;
        }
        let s = b3();
        if (!s) {
            return;
        }
        let a = Ru(model, stepData, ee);
        let m = s_1(a.variants, resources);
        let w = new e_1;
        w.initialize(a, m, s, ee, emissiveConfig);
        let v = new y(w);
        if (FRef.current) {
            while(FRef.current.children.length > 0){
                FRef.current.remove(FRef.current.children[0]);
            }
            FRef.current.add(w.getContainer());
        }
        GRef.current = w;
        JRef.current = v;
        QRef.current = a;
        HRef.current = -1;
        w.setStepOutlineMode(etRef.current.mode);
        w.setSelectionContourMode(enRef.current);
        let x = new Map;
        for (let [, e] of a.variants){
            let t = e.blockId;
            x.set(t, (x.get(t) || 0) + e.instances.length);
        }
        let materialStats = Array.from(x.entries()).map(([blockId, count])=>({
                blockId,
                count
            })).sort((e, t)=>t.count - e.count);
        onReady?.({
            stepCount: a.stepCount,
            layerCount: a.layerCount,
            totalBlocks: a.totalBlocks,
            materialStats,
            stepMeta: a.stepMeta,
            layerMeta: a.layerMeta,
            entityCount: model.entities?.length ?? 0,
            decorEntityCount: model.entities?.reduce((e, t)=>e + +(t.kind !== "generic"), 0) ?? 0,
            creatureEntityCount: model.entities?.reduce((e, t)=>e + +(t.kind === "generic"), 0) ?? 0
        });
        switch(mode){
            case "preview":
                w.showAll();
                break;
            case "step":
                w.setVisibleStep(currentIndex);
                break;
            default:
                w.setVisibleLayer(currentIndex);
        }
        HRef.current = currentIndex;
        return ()=>{
            for (let [, e] of (v.dispose(), w.dispose(), m)){
                e.geometry.dispose();
            }
        };
    }, [
        model,
        stepData,
        resources,
        ee,
        emissiveConfig?.enabled,
        emissiveConfig?.intensity
    ]);
    useEffect(()=>{
        let GRef_current = GRef.current;
        let JRef_current = JRef.current;
        if (!GRef_current || !JRef_current) {
            return;
        }
        let HRef_current = HRef.current;
        if (mode === "preview") {
            JRef_current.cancelAll();
            KRef.current = false;
            GRef_current.showAll();
        } else if (mode === "step" || mode === "layer") {
            let r = Math.abs(currentIndex - HRef_current);
            if (enableAnimation && HRef_current >= 0 && HRef_current !== currentIndex && r === 1) {
                JRef_current.cancelAll();
                KRef.current = true;
                if (currentIndex > HRef_current) {
                    JRef_current.animateStepForward(mode, HRef_current, currentIndex).then(()=>{
                        KRef.current = false;
                    });
                } else {
                    JRef_current.animateStepBackward(mode, HRef_current, currentIndex).then(()=>{
                        KRef.current = false;
                    });
                }
            } else {
                JRef_current.cancelAll();
                KRef.current = false;
                if (mode === "step") {
                    GRef_current.setVisibleStep(currentIndex);
                } else {
                    GRef_current.setVisibleLayer(currentIndex);
                }
            }
        }
        HRef.current = currentIndex;
    }, [
        mode,
        currentIndex,
        enableAnimation
    ]);
    useEffect(()=>{
        GRef.current?.setStepOutlineMode(stepOutlineMode);
    }, [
        stepOutlineMode,
        model,
        stepData,
        resources
    ]);
    useEffect(()=>{
        GRef.current?.setSelectionContourMode(selectionContourMode);
    }, [
        selectionContourMode
    ]);
    useEffect(()=>{
        let e;
        if (!resources || WRef.current) {
            return;
        }
        let [t, r, i] = model.size;
        let l = r / Math.max(t, i);
        let s = 1.5 * Math.sqrt(t * t + r * r + i * i);
        let a = 0.25 * Math.PI;
        let c = t / 2 + s * Math.cos(e = l > 2 ? 0.35 * Math.PI : l < 0.5 ? 0.15 * Math.PI : 0.25 * Math.PI) * Math.sin(a);
        let u = r / 2 + s * Math.sin(e);
        let d = i / 2 + s * Math.cos(e) * Math.cos(a);
        camera.position.set(c, u, d);
        let target = new Pq0(t / 2, r / 2, i / 2);
        camera.lookAt(target);
        if ("far" in camera) {
            camera.far = Math.max(1000, 6 * s);
            camera.updateProjectionMatrix();
        }
        XRef.current = {
            position: camera.position.clone(),
            target
        };
        if (controlsRef?.current) {
            controlsRef.current.target.copy(target);
            controlsRef.current.update();
        }
        WRef.current = true;
    }, [
        resources,
        model.size,
        camera,
        controlsRef
    ]);
    useEffect(()=>{
        let GRef_current = GRef.current;
        if (GRef_current) {
            GRef_current.setHighlightByBlockId(highlightedBlockId ?? null);
        }
    }, [
        highlightedBlockId
    ]);
    useEffect(()=>{
        let e = controlsRef?.current;
        if (!e) {
            return;
        }
        let t = ()=>{
            $RefRef.current = Date.now();
            ZRef.current = true;
        };
        e.addEventListener("change", t);
        return ()=>e.removeEventListener("change", t);
    }, [
        controlsRef
    ]);
    useEffect(()=>{
        if (!resetCameraKey || !XRef.current) {
            return;
        }
        let { position, target } = XRef.current;
        Ay.killTweensOf(camera.position);
        Ay.to(camera.position, {
            x: position.x,
            y: position.y,
            z: position.z,
            duration: 0.6,
            ease: "back.out(1.2)",
            onUpdate: ()=>{
                controlsRef?.current?.update();
            }
        });
        if (controlsRef?.current) {
            Ay.killTweensOf(controlsRef.current.target);
            Ay.to(controlsRef.current.target, {
                x: target.x,
                y: target.y,
                z: target.z,
                duration: 0.6,
                ease: "back.out(1.2)",
                onUpdate: ()=>{
                    controlsRef.current.update();
                }
            });
        }
    }, [
        resetCameraKey
    ]);
    useEffect(()=>{
        let GRef_current = GRef.current;
        if (GRef_current) {
            GRef_current.setFocusMode(focusMode);
        }
    }, [
        focusMode
    ]);
    useEffect(()=>{
        let GRef_current = GRef.current;
        if (GRef_current) {
            GRef_current.setExplodedView(explodedSpacing);
        }
    }, [
        explodedSpacing
    ]);
    useEffect(()=>{
        if (mode !== "layer" || !controlsRef?.current || !XRef.current) {
            return;
        }
        let [, e] = model.size;
        let t = (currentIndex + Math.max(1, 0.1 * e)) * (1 + explodedSpacing);
        let controlsRef_current = controlsRef.current;
        let i = t - controlsRef_current.target.y;
        let l = Date.now() - $RefRef.current;
        let o = i * (ZRef.current && l < 3000 ? 0.5 : 1);
        let y_1 = controlsRef_current.target.y + o;
        Ay.killTweensOf(controlsRef_current.target);
        Ay.killTweensOf(camera.position);
        Ay.to(controlsRef_current.target, {
            y: y_1,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: ()=>{
                controlsRef_current.update();
            }
        });
        Ay.to(camera.position, {
            y: camera.position.y + o,
            duration: 0.5,
            ease: "power2.out"
        });
    }, [
        mode,
        currentIndex,
        explodedSpacing
    ]);
    useEffect(()=>{
        if (selectedBlockPosition === null && GRef.current) {
            GRef.current.highlightBlock(null);
        }
    }, [
        selectedBlockPosition
    ]);
    a.D(({ clock })=>{
        let i = clock.getElapsedTime();
        GRef.current?.updateSelectionOutline(i);
        GRef.current?.updateMaterialAnimations(i);
    });
    let onClick = useCallback((e)=>{
        if (!onBlockClick || !GRef.current || !e.intersections || e.intersections.length === 0 || typeof e.delta === "number" && e.delta > 6) {
            return;
        }
        let t = e.intersections.find((e)=>e.object instanceof ZLX && e.instanceId !== undefined);
        if (!t) {
            if (window.__MCB_DEBUG_CLICK) {
                console.warn("[TeachingVoxelRenderer] click missed InstancedMesh, intersections:", e.intersections.map((e)=>({
                        type: e.object.type,
                        name: e.object.name,
                        instanceId: e.instanceId
                    })));
            }
            return;
        }
        e.stopPropagation();
        let n = GRef.current.getBlockFromHit(t.object, t.instanceId);
        if (n) {
            GRef.current.highlightBlock(n.position);
            onBlockClick(n);
        } else if (window.__MCB_DEBUG_CLICK) {
            console.warn("[TeachingVoxelRenderer] getBlockFromHit returned null", {
                meshName: t.object.name,
                instanceId: t.instanceId
            });
        }
    }, [
        onBlockClick
    ]);
    if (resources) {
        return <group><group ref={FRef} onClick={onClick}/><A blocks={model.blocks} resources={resources} copyTransform={copyTransform}/>{entities && <v.h entities={entities} teachingMode={mode} currentIndex={currentIndex} entityStepIndex={entityStepIndex} onEntityClick={onEntityClick ? eo : undefined} selectedEntity={selectedEntity} explodeSpacing={explodedSpacing} explodeMinY={explodeMinY} resources={resources} atlasTexture={b3()}/>}</group>;
    }
    return <group ref={FRef}/>;
}
export { MComponent as default };
