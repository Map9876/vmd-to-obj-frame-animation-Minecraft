import "./module-86897.js";
import { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "./module-61426.js";
import { C as C_1, D } from "./module-59040.js";
import * as a from "./module-38381.js";
import { MB, Vu, eF, oF, s0, se } from "./module-13303.js";
import { Df, G_z, I9Y, OUM, _4j, eaF, ix0 as frameBufferType, jf0, tXL, uSd, veJ } from "./module-85339.js";
import { S } from "./module-24708.js";
import { cr } from "./module-4336.js";
import { _ } from "./module-11046.js";
let d = {
    outline: [],
    bloom: [],
    lights: []
};
let f = /(grid|measure|gizmo|selection|outline|helper|wireframe|marker)/i;
function h(e) {
    if (Array.isArray(e.material)) {
        return e.material;
    }
    return [
        e.material
    ];
}
function p(e) {
    return [
        e.outline,
        e.bloom,
        e.lights
    ].map((e)=>e.map((e)=>e.uuid).join(",")).join("|");
}
class g {
    scan(e) {
        let t = ((e)=>{
            let outline = [];
            let bloom = [];
            let lights = [];
            e.traverse((e)=>{
                if (e instanceof veJ) {
                    return void lights.push(e);
                }
                if (!(!(e instanceof eaF) || ((e)=>{
                    for(let t = e; t; t = t.parent){
                        if (f.test(t.name) || t.userData.postProcessing === false || t.userData.isHelper === true || t.userData.isMeasurement === true || t.userData.isSelection === true) {
                            return true;
                        }
                    }
                    return false;
                })(e)) && !(e.renderOrder >= 900) && h(e).some((e)=>e instanceof _4j || e instanceof G_z || e instanceof tXL || e instanceof uSd || e instanceof Df)) {
                    outline.push(e);
                    if (h(e).some((e)=>{
                        let blockEmissionIntensityValue = e.userData.blockEmissionIntensityValue;
                        return typeof blockEmissionIntensityValue === "number" && Number.isFinite(blockEmissionIntensityValue) && blockEmissionIntensityValue > 0;
                    })) {
                        bloom.push(e);
                    }
                }
            });
            return {
                outline,
                bloom,
                lights
            };
        })(e);
        let n = p(t);
        if (n === this.signature) {
            return this.current;
        }
        this.signature = n;
        this.current = t;
        return t;
    }
    dispose() {
        this.signature = p(d);
        this.current = d;
    }
    constructor(){
        this.current = d;
        this.signature = p(d);
    }
}
function w({ effects }) {
    if (Array.isArray(effects)) {
        return effects;
    }
    return [];
}
class v {
    activePasses(e) {
        return [
            ...this.states.entries()
        ].flatMap(([n, r])=>{
            if (n === e) {
                return [];
            }
            return r.passes;
        });
    }
    disposePass(e, t) {
        if (this.disposedPasses.has(e)) {
            return;
        }
        let n = w(e);
        if (n.length > 0) {
            let r = new Set(t.flatMap(w));
            let s = n.filter((e)=>r.has(e));
            if (s.length > 0) {
                if (e.listener) {
                    for (let t of s){
                        t.removeEventListener("change", e.listener);
                    }
                }
                e.effects = n.filter((e)=>!r.has(e));
            }
        }
        this.disposedPasses.add(e);
        e.dispose();
    }
    observe(e) {
        let t = this.states.get(e);
        if (!t) {
            return void this.states.set(e, {
                passes: [
                    ...e.passes
                ],
                generation: 1
            });
        }
        t.generation += 1;
        let n = new Set(e.passes);
        let r = [
            ...e.passes,
            ...this.activePasses(e)
        ];
        for (let e of t.passes){
            if (!n.has(e)) {
                this.disposePass(e, r);
            }
        }
        t.passes = [
            ...e.passes
        ];
    }
    scheduleDispose(e) {
        if (this.disposedComposers.has(e)) {
            return;
        }
        let n = this.states.get(e) ?? {
            passes: [
                ...e.passes
            ],
            generation: 0
        };
        this.states.set(e, n);
        let r = ++n.generation;
        let s = [
            ...n.passes
        ];
        queueMicrotask(()=>{
            let t = new Set(e.passes);
            let i = [
                ...e.passes,
                ...this.activePasses(e)
            ];
            for (let e of s){
                if (!t.has(e)) {
                    this.disposePass(e, i);
                }
            }
            if (r !== n.generation || this.states.get(e) !== n) {
                return;
            }
            let a = this.activePasses(e);
            for (let t of e.passes){
                this.disposePass(t, a);
            }
            e.passes = [];
            e.dispose();
            this.disposedComposers.add(e);
            this.states.delete(e);
        });
    }
    constructor(){
        this.states = new Map;
        this.disposedPasses = new WeakSet;
        this.disposedComposers = new WeakSet;
    }
}
class y extends oF {
    render(e, t) {
        let e_autoClear = e.autoClear;
        try {
            e.initRenderTarget(t);
            e.setRenderTarget(null);
            e.autoClear = true;
            e.render(this.sourceScene, this.sourceCamera);
            e.copyFramebufferToTexture(t.texture);
        } finally{
            e.autoClear = e_autoClear;
        }
    }
    constructor(e, t){
        super("SmaaScenePass");
        this.sourceScene = e;
        this.sourceCamera = t;
        this.needsSwap = false;
    }
}
function BComponent({ renderFrameRef }) {
    let { gl, scene, camera, size, invalidate } = C_1();
    let dRef = useRef(null);
    let fRef = useRef(null);
    useLayoutEffect(()=>{
        let gl_autoClear = gl.autoClear;
        let s = new s0(gl, {
            multisampling: 0,
            frameBufferType: OUM
        });
        gl.autoClear = gl_autoClear;
        s.inputBuffer.texture.colorSpace = jf0;
        s.outputBuffer.texture.colorSpace = jf0;
        let i = new eF({
            preset: MB.HIGH
        });
        let u = ()=>invalidate();
        i.addEventListener("load", u);
        s.addPass(new y(scene, camera));
        let h = new Vu(camera, i);
        h.encodeOutput = false;
        s.addPass(h);
        dRef.current = s;
        let p = new I9Y;
        let g = (e)=>{
            if (s.inputBuffer.width !== gl.domElement.width || s.inputBuffer.height !== gl.domElement.height) {
                gl.getSize(p);
                s.setSize(p.x, p.y);
            }
            s.render(e);
        };
        fRef.current = g;
        let m = ()=>g(0);
        if (renderFrameRef) {
            renderFrameRef.current = m;
        }
        invalidate();
        return ()=>{
            if (renderFrameRef?.current === m) {
                renderFrameRef.current = null;
            }
            if (fRef.current === g) {
                fRef.current = null;
            }
            if (dRef.current === s) {
                dRef.current = null;
            }
            i.removeEventListener("load", u);
            s.dispose();
        };
    }, [
        gl,
        scene,
        camera,
        invalidate,
        renderFrameRef
    ]);
    useLayoutEffect(()=>{
        dRef.current?.setSize(size.width, size.height);
    }, [
        gl,
        scene,
        camera,
        size.width,
        size.height,
        renderFrameRef
    ]);
    D((e, t)=>fRef.current?.(t), 1);
    return null;
}
let x = {
    outline: [],
    bloom: [],
    lights: []
};
export function I({ renderFrameRef } = {}) {
    let t;
    let d = useContext(cr) ?? S;
    let f = C_1((e)=>e.gl);
    let hRef = useRef(null);
    let p = useMemo(()=>new v, []);
    let d_postProcessing = d.postProcessing;
    let hasBloom = d_postProcessing.enabled && d_postProcessing.bloom.enabled && d_postProcessing.bloom.intensity > 0;
    let hasVignette = d_postProcessing.enabled && d_postProcessing.vignette.enabled && d_postProcessing.vignette.darkness > 0;
    let hasOutline = d_postProcessing.enabled && d_postProcessing.outline.enabled;
    let k = ((e)=>{
        let { scene } = C_1();
        let n = useMemo(()=>new g, [
            scene
        ]);
        let [r, setR] = useState(x);
        let lRef = useRef(x);
        let oRef = useRef(0);
        D((r, s)=>{
            if (!e || (oRef.current += s, oRef.current < 0.25)) {
                return;
            }
            oRef.current = 0;
            let i = n.scan(scene);
            if (lRef.current !== i) {
                lRef.current = i;
                setR(i);
            }
        });
        useEffect(()=>{
            if (e) {
                let e = n.scan(scene);
                lRef.current = e;
                setR(e);
                return;
            }
            n.dispose();
            lRef.current = x;
            oRef.current = 0;
            setR(x);
        }, [
            e,
            scene,
            n
        ]);
        useEffect(()=>()=>n.dispose(), [
            n
        ]);
        return r;
    })(hasOutline || hasBloom);
    let C = [];
    let E = (t = {
        hasBloom,
        hasVignette,
        hasOutline,
        outlineTargetCount: k.outline.length
    }).hasBloom || t.hasVignette || t.hasOutline && t.outlineTargetCount > 0;
    useEffect(()=>{
        if (E) {
            return _(f);
        }
    }, [
        f,
        E
    ]);
    useLayoutEffect(()=>{
        let hRef_current = hRef.current;
        if (hRef_current) {
            p.observe(hRef_current);
            return ()=>p.scheduleDispose(hRef_current);
        }
    }, [
        p,
        C
    ]);
    useLayoutEffect(()=>{
        let hRef_current = hRef.current;
        if (!renderFrameRef || !hRef_current) {
            return;
        }
        let t = ()=>hRef_current.render(0);
        renderFrameRef.current = t;
        return ()=>{
            if (renderFrameRef.current === t) {
                renderFrameRef.current = null;
            }
        };
    }, [
        renderFrameRef,
        C
    ]);
    if (!E) {
        return <BComponent renderFrameRef={renderFrameRef}/>;
    }
    if (hasBloom && k.bloom.length > 0 && k.lights.length > 0) {
        C.push(<a.iS key="bloom" selection={k.bloom} lights={k.lights} ignoreBackground intensity={d_postProcessing.bloom.intensity} luminanceThreshold={d_postProcessing.bloom.luminanceThreshold} luminanceSmoothing={d_postProcessing.bloom.luminanceSmoothing} mipmapBlur={d_postProcessing.bloom.mipmapBlur}/>);
    }
    if (hasVignette) {
        C.push(<a.fE key="vignette" offset={d_postProcessing.vignette.offset} darkness={d_postProcessing.vignette.darkness}/>);
    }
    if (hasOutline && k.outline.length > 0) {
        C.push(<a.Rc key="outline" selection={k.outline} edgeStrength={d_postProcessing.outline.edgeStrength} visibleEdgeColor={Number.parseInt(d_postProcessing.outline.visibleEdgeColor.slice(1), 16)} hiddenEdgeColor={Number.parseInt(d_postProcessing.outline.hiddenEdgeColor.slice(1), 16)} blur={d_postProcessing.outline.blur} xRay={d_postProcessing.outline.xRay}/>);
    }
    let mode = ((e)=>{
        switch(e){
            case "Linear":
                return se.LINEAR;
            case "Reinhard":
                return se.REINHARD;
            case "ACESFilmic":
                return se.ACES_FILMIC;
            default:
                return null;
        }
    })(d.renderer.toneMapping);
    if (mode !== null) {
        C.push(<a.bt key="tone-mapping" mode={mode}/>);
    }
    C.push(<a.Jp key="smaa" preset={MB.HIGH}/>);
    return <a.s0 ref={hRef} multisampling={0} frameBufferType={frameBufferType}>{C}</a.s0>;
}
