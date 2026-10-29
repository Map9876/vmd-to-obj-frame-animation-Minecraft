import "./module-86897.js";
import { useContext, useEffect, useMemo, useRef } from "./module-61426.js";
import * as i from "./module-53279.js";
import { C } from "./module-59040.js";
import { BKk, I9Y, Q1f, bdM, hB5 as side, q2 } from "./module-85339.js";
import { S } from "./module-24708.js";
import { cr } from "./module-4336.js";
import { $m, ml } from "./module-80362.js";
function useD() {
    let e = useContext(cr);
    return e ?? S;
}
function f(fitRadius) {
    return typeof fitRadius === "number" && Number.isFinite(fitRadius) && fitRadius > 0;
}
export function AA({ center, fitRadius } = {}) {
    let n = useD();
    let i = C((e)=>e.gl);
    let lRef = useRef(null);
    let oRef = useRef(null);
    let n_mainLight = n.mainLight;
    let bounds = f(fitRadius) && n_mainLight.shadowFit ? Math.max(n_mainLight.shadowFitMin, fitRadius * n_mainLight.shadowFitScale + n_mainLight.shadowFitPad) : n_mainLight.shadowCameraBounds;
    useEffect(()=>{
        let lRef_current = lRef.current;
        let oRef_current = oRef.current;
        if (lRef_current && oRef_current) {
            lRef_current.target = oRef_current;
        }
    }, []);
    useEffect(()=>{
        let lRef_current = lRef.current;
        if (lRef_current) {
            lRef_current.position.set(...n_mainLight.position);
            lRef_current.intensity = n_mainLight.intensity;
            lRef_current.color.set(n_mainLight.color);
            lRef_current.castShadow = n_mainLight.castShadow;
        }
    }, [
        n_mainLight.position,
        n_mainLight.intensity,
        n_mainLight.color,
        n_mainLight.castShadow
    ]);
    useEffect(()=>{
        let lRef_current = lRef.current;
        if (lRef_current) {
            ml(lRef_current, {
                mapSize: n_mainLight.shadowMapSize,
                bounds,
                maxTextureSize: i.capabilities.maxTextureSize
            });
        }
    }, [
        i,
        n_mainLight.shadowMapSize,
        bounds
    ]);
    return <><ambientLight intensity={n.ambientLight.intensity}/><hemisphereLight args={[
        n.hemisphereLight.skyColor,
        n.hemisphereLight.groundColor,
        n.hemisphereLight.intensity
    ]}/><object3D ref={oRef} position={center ?? [
        0,
        0,
        0
    ]}/><directionalLight ref={lRef} position={n_mainLight.position} intensity={n_mainLight.intensity} color={n_mainLight.color} castShadow={n_mainLight.castShadow} shadow-camera-left={-bounds} shadow-camera-right={bounds} shadow-camera-top={bounds} shadow-camera-bottom={-bounds}/><directionalLight position={n.fillLight.position} intensity={n.fillLight.intensity} color={n.fillLight.color}/></>;
}
let raycast = ()=>{};
function useG() {
    let e = useMemo(()=>new bdM(1, 1).rotateX(-Math.PI / 2), []);
    useEffect(()=>()=>e.dispose(), [
        e
    ]);
    return e;
}
function M1Component({ center, fitRadius, groundY }) {
    let grid = useD().grid;
    let o = useG();
    let u = useMemo(()=>new BKk({
            transparent: true,
            depthWrite: false,
            toneMapped: false,
            side,
            vertexShader: "varying vec3 vW;\nvoid main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",
            fragmentShader: "uniform vec3 lineColor; uniform vec2 c;\nuniform float cellSize, cellThickness, secSize, secThickness, minorA, majorA, r0, r1, gain;\nvarying vec3 vW;\nfloat gridLine(float size, float th){\n  vec2 r = vW.xz / size;\n  vec2 g = abs(fract(r - 0.5) - 0.5) / (fwidth(r) * th);\n  return 1.0 - min(min(g.x, g.y), 1.0);\n}\nvoid main(){\n  float g1 = gridLine(cellSize, cellThickness);\n  float g2 = gridLine(secSize, secThickness);\n  float d = 1.0 - smoothstep(r0, r1, distance(vW.xz, c));\n  float a = max(g1 * minorA, g2 * majorA) * d * gain;\n  if (a <= 0.002) discard;\n  gl_FragColor = vec4(lineColor, a);\n}",
            uniforms: {
                lineColor: {
                    value: new Q1f(grid.lineColor)
                },
                c: {
                    value: new I9Y
                },
                cellSize: {
                    value: grid.cellSize
                },
                cellThickness: {
                    value: grid.cellThickness
                },
                secSize: {
                    value: grid.sectionSize
                },
                secThickness: {
                    value: grid.sectionThickness
                },
                minorA: {
                    value: grid.minorAlpha
                },
                majorA: {
                    value: grid.majorAlpha
                },
                r0: {
                    value: 1
                },
                r1: {
                    value: 2
                },
                gain: {
                    value: grid.gain
                }
            }
        }), []);
    useEffect(()=>()=>u.dispose(), [
        u
    ]);
    let c = fitRadius * grid.fitScale;
    useEffect(()=>{
        let u_uniforms = u.uniforms;
        u_uniforms.lineColor.value.set(grid.lineColor);
        u_uniforms.c.value.set(center[0], center[2]);
        u_uniforms.cellSize.value = grid.cellSize;
        u_uniforms.cellThickness.value = grid.cellThickness;
        u_uniforms.secSize.value = grid.sectionSize;
        u_uniforms.secThickness.value = grid.sectionThickness;
        u_uniforms.minorA.value = grid.minorAlpha;
        u_uniforms.majorA.value = grid.majorAlpha;
        u_uniforms.gain.value = grid.gain;
        u_uniforms.r0.value = fitRadius * grid.fitInner;
        u_uniforms.r1.value = c;
    }, [
        u,
        grid,
        center,
        fitRadius,
        c
    ]);
    return <mesh geometry={o} material={u} position={[
        center[0],
        groundY - 0.01,
        center[2]
    ]} scale={[
        2.3 * c,
        1,
        2.3 * c
    ]} renderOrder={-2} frustumCulled={false} raycast={raycast}/>;
}
export function sK({ center, fitRadius, groundY = 0 } = {}) {
    let s = useD();
    if (s.grid.visible) {
        if (f(fitRadius)) {
            return <M1Component center={center ?? [
                0,
                0,
                0
            ]} fitRadius={fitRadius} groundY={groundY}/>;
        }
        return <i.x args={[
            200,
            200
        ]} cellSize={s.grid.cellSize} cellThickness={s.grid.cellThickness} cellColor={s.grid.cellColor} sectionSize={s.grid.sectionSize} sectionThickness={s.grid.sectionThickness} sectionColor={s.grid.sectionColor} fadeDistance={s.grid.fadeDistance} fadeStrength={s.grid.fadeStrength} infiniteGrid position={[
            0,
            groundY - 0.01,
            0
        ]} material-opacity={s.grid.opacity} material-transparent={s.grid.opacity < 1}/>;
    }
    return null;
}
export function Pk({ center, fitRadius, groundY = 0 } = {}) {
    let i = useD();
    let a = useG();
    let o = useMemo(()=>new q2({
            opacity: i.groundShadow.opacity,
            depthWrite: false,
            side
        }), []);
    useEffect(()=>{
        o.opacity = i.groundShadow.opacity;
    }, [
        o,
        i.groundShadow.opacity
    ]);
    useEffect(()=>()=>o.dispose(), [
        o
    ]);
    if (!i.groundShadow.enabled) {
        return null;
    }
    let u = center ?? [
        0,
        0,
        0
    ];
    let c = (f(fitRadius) ? fitRadius : 12) * i.grid.fitScale;
    return <mesh geometry={a} material={o} position={[
        u[0],
        groundY + 0.004,
        u[2]
    ]} scale={[
        2.3 * c,
        1,
        2.3 * c
    ]} receiveShadow renderOrder={-1} frustumCulled={false} raycast={raycast}/>;
}
export function $i(e, t) {
    let n;
    let r = e ?? S;
    return {
        shadows: r.renderer.shadows,
        dpr: r.renderer.dpr,
        gl: {
            antialias: false,
            alpha: (n = t?.alpha) != null && n,
            powerPreference: "high-performance"
        }
    };
}
export function yh(e, t, n, r) {
    let s = n ?? S;
    $m(e, t, s, {
        transparent: r?.transparent
    });
}
function x(e, t) {
    let n = /^#?([0-9a-fA-F]{6})$/.exec(e.trim());
    if (!n) {
        return e;
    }
    let r = parseInt(n[1], 16);
    return `#${[
        r >> 16 & 255,
        r >> 8 & 255,
        255 & r
    ].map((e)=>Math.max(0, Math.min(255, e + t))).map((e)=>e.toString(16).padStart(2, "0")).join("")}`;
}
export function ZK(e, t, n) {
    e.style.setProperty("--mcb-vp-bg", t);
    e.style.setProperty("--mcb-vp-bg-hi", x(t, 7));
    e.style.setProperty("--mcb-vp-bg-lo", x(t, -7));
    e.style.setProperty("--mcb-vp-vignette", String(n));
}
export function Kg({ transparent = false } = {}) {
    let t = useD();
    let n = C((e)=>e.scene);
    let r = C((e)=>e.gl);
    useEffect(()=>{
        if (!transparent) {
            return void (n.background instanceof Q1f ? n.background.set(t.background) : n.background = new Q1f(t.background));
        }
        n.background = null;
        let i = r.domElement.closest(".mcb-viewport") ?? r.domElement.parentElement;
        if (i) {
            ZK(i, t.background, t.viewport.vignette);
        }
    }, [
        n,
        r,
        transparent,
        t.background,
        t.viewport.vignette
    ]);
    return null;
}
