import "./module-88945.js";
import { forwardRef, useLayoutEffect, useMemo, useRef, useState } from "./module-61426.js";
import a from "./module-12669.js";
import { $EB as side, I9Y, Pq0, qUd, ubm } from "./module-85339.js";
import * as c from "./module-59040.js";
let n;
let r;
let d = new Pq0;
let u = new Pq0;
let f = new Pq0;
let m = new I9Y;
function h(e, t, i) {
    let n = d.setFromMatrixPosition(e.matrixWorld);
    n.project(t);
    let r = i.width / 2;
    let o = i.height / 2;
    return [
        n.x * r + r,
        -(n.y * o) + o
    ];
}
let p = (e)=>{
    if (Math.abs(e) < 1e-10) {
        return 0;
    }
    return e;
};
function v(e, t, i = "") {
    let n = "matrix3d(";
    for(let i = 0; i !== 16; i++){
        n += p(t[i] * e.elements[i]) + (i !== 15 ? "," : ")");
    }
    return i + n;
}
n = [
    1,
    -1,
    1,
    1,
    1,
    -1,
    1,
    1,
    1,
    -1,
    1,
    1,
    1,
    -1,
    1,
    1
];
let y = (matrixWorldInverse)=>v(matrixWorldInverse, n);
r = (e)=>[
        1 / e,
        1 / e,
        1 / e,
        1,
        -1 / e,
        -1 / e,
        -1 / e,
        -1,
        1 / e,
        1 / e,
        1 / e,
        1,
        1,
        1,
        1,
        1
    ];
let g = (e, t)=>v(e, r(t), "translate(-50%,-50%)");
export let E = forwardRef(({ children, eps = 0.001, style, className, prepend, center, fullscreen, portal, distanceFactor, sprite = false, transform = false, occlude, onOcclude, castShadow, receiveShadow, material, geometry, zIndexRange = [
    16777271,
    0
], calculatePosition = h, as = "div", wrapperClass, pointerEvents = "auto", ...rest }, ref)=>{
    let { gl, camera, scene, size, raycaster, events, viewport } = c.C();
    let [F] = useState(()=>document.createElement(as));
    let $RefRef = useRef(null);
    let GRef = useRef(null);
    let VRef = useRef(0);
    let QRef = useRef([
        0,
        0
    ]);
    let YRef = useRef(null);
    let XRef = useRef(null);
    let Z = portal?.current || events.connected || gl.domElement.parentNode;
    let JRef = useRef(null);
    let KRef = useRef(false);
    let ee = useMemo(()=>occlude && occlude !== "blending" || Array.isArray(occlude) && occlude.length && ((e)=>e && typeof e === "object" && "current" in e)(occlude[0]), [
        occlude
    ]);
    useLayoutEffect(()=>{
        let gl_domElement = gl.domElement;
        if (occlude && occlude === "blending") {
            gl_domElement.style.zIndex = `${Math.floor(zIndexRange[0] / 2)}`;
            gl_domElement.style.position = "absolute";
            gl_domElement.style.pointerEvents = "none";
        } else {
            gl_domElement.style.zIndex = null;
            gl_domElement.style.position = null;
            gl_domElement.style.pointerEvents = null;
        }
    }, [
        occlude
    ]);
    useLayoutEffect(()=>{
        if (GRef.current) {
            let e = $RefRef.current = a.createRoot(F);
            scene.updateMatrixWorld();
            if (transform) {
                F.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";
            } else {
                let e = calculatePosition(GRef.current, camera, size);
                F.style.cssText = `position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`;
            }
            if (Z) {
                if (prepend) {
                    Z.prepend(F);
                } else {
                    Z.appendChild(F);
                }
            }
            return ()=>{
                if (Z) {
                    Z.removeChild(F);
                }
                e.unmount();
            };
        }
    }, [
        Z,
        transform
    ]);
    useLayoutEffect(()=>{
        if (wrapperClass) {
            F.className = wrapperClass;
        }
    }, [
        wrapperClass
    ]);
    let et = useMemo(()=>{
        if (transform) {
            return {
                position: "absolute",
                top: 0,
                left: 0,
                width: size.width,
                height: size.height,
                transformStyle: "preserve-3d",
                pointerEvents: "none"
            };
        }
        return {
            position: "absolute",
            transform: center ? "translate3d(-50%,-50%,0)" : "none",
            ...fullscreen && {
                top: -size.height / 2,
                left: -size.width / 2,
                width: size.width,
                height: size.height
            },
            ...style
        };
    }, [
        style,
        center,
        fullscreen,
        size,
        transform
    ]);
    let ei = useMemo(()=>({
            position: "absolute",
            pointerEvents
        }), [
        pointerEvents
    ]);
    useLayoutEffect(()=>{
        var t;
        var r;
        KRef.current = false;
        if (transform) {
            if ((t = $RefRef.current) != null) {
                t.render(<div ref={YRef} style={et}><div ref={XRef} style={ei}><div ref={ref} className={className} style={style} children={children}/></div></div>);
            }
        } else if ((r = $RefRef.current) != null) {
            r.render(<div ref={ref} style={et} className={className} children={children}/>);
        }
    });
    let enRef = useRef(true);
    c.D((e)=>{
        if (GRef.current) {
            camera.updateMatrixWorld();
            GRef.current.updateWorldMatrix(true, false);
            let e = transform ? QRef.current : calculatePosition(GRef.current, camera, size);
            if (transform || Math.abs(VRef.current - camera.zoom) > eps || Math.abs(QRef.current[0] - e[0]) > eps || Math.abs(QRef.current[1] - e[1]) > eps) {
                let t = ((e, camera_1)=>{
                    let i = d.setFromMatrixPosition(e.matrixWorld);
                    let n = u.setFromMatrixPosition(camera_1.matrixWorld);
                    let r = i.sub(n);
                    let o = camera_1.getWorldDirection(f);
                    return r.angleTo(o) > Math.PI / 2;
                })(GRef.current, camera);
                let i = false;
                if (ee) {
                    if (Array.isArray(occlude)) {
                        i = occlude.map((e)=>e.current);
                    } else if (occlude !== "blending") {
                        i = [
                            scene
                        ];
                    }
                }
                let n = enRef.current;
                if (i) {
                    enRef.current = ((e, camera_1, raycaster_1, n)=>{
                        let r = d.setFromMatrixPosition(e.matrixWorld);
                        let o = r.clone();
                        o.project(camera_1);
                        m.set(o.x, o.y);
                        raycaster_1.setFromCamera(m, camera_1);
                        let s = raycaster_1.intersectObjects(n, true);
                        if (s.length) {
                            let e = s[0].distance;
                            return r.distanceTo(raycaster_1.ray.origin) < e;
                        }
                        return true;
                    })(GRef.current, camera, raycaster, i) && !t;
                } else {
                    enRef.current = !t;
                }
                if (n !== enRef.current) {
                    if (onOcclude) {
                        onOcclude(!enRef.current);
                    } else {
                        F.style.display = enRef.current ? "block" : "none";
                    }
                }
                let r = Math.floor(zIndexRange[0] / 2);
                let o = occlude ? ee ? [
                    zIndexRange[0],
                    r
                ] : [
                    r - 1,
                    0
                ] : zIndexRange;
                F.style.zIndex = `${((e, camera_1, i)=>{
                    if (camera_1 instanceof ubm || camera_1 instanceof qUd) {
                        let n = d.setFromMatrixPosition(e.matrixWorld);
                        let r = u.setFromMatrixPosition(camera_1.matrixWorld);
                        let o = n.distanceTo(r);
                        let s = (i[1] - i[0]) / (camera_1.far - camera_1.near);
                        let a = i[1] - s * camera_1.far;
                        return Math.round(s * o + a);
                    }
                })(GRef.current, camera, o)}`;
                if (transform) {
                    let [e, t] = [
                        size.width / 2,
                        size.height / 2
                    ];
                    let i = camera.projectionMatrix.elements[5] * t;
                    let { isOrthographicCamera, top, left, bottom, right } = camera;
                    let l = y(camera.matrixWorldInverse);
                    let c = isOrthographicCamera ? `scale(${i})translate(${p(-(right + left) / 2)}px,${p((top + bottom) / 2)}px)` : `translateZ(${i}px)`;
                    let d = GRef.current.matrixWorld;
                    if (sprite) {
                        (d = camera.matrixWorldInverse.clone().transpose().copyPosition(d).scale(GRef.current.scale)).elements[3] = d.elements[7] = d.elements[11] = 0;
                        d.elements[15] = 1;
                    }
                    F.style.width = `${size.width}px`;
                    F.style.height = `${size.height}px`;
                    F.style.perspective = isOrthographicCamera ? "" : `${i}px`;
                    if (YRef.current && XRef.current) {
                        YRef.current.style.transform = `${c}${l}translate(${e}px,${t}px)`;
                        XRef.current.style.transform = g(d, 1 / ((distanceFactor || 10) / 400));
                    }
                } else {
                    let t = distanceFactor === undefined ? 1 : ((e, camera_1)=>{
                        if (camera_1 instanceof qUd) {
                            return camera_1.zoom;
                        }
                        if (!(camera_1 instanceof ubm)) {
                            return 1;
                        }
                        {
                            let i = d.setFromMatrixPosition(e.matrixWorld);
                            let n = u.setFromMatrixPosition(camera_1.matrixWorld);
                            return 1 / (2 * Math.tan(camera_1.fov * Math.PI / 180 / 2) * i.distanceTo(n));
                        }
                    })(GRef.current, camera) * distanceFactor;
                    F.style.transform = `translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`;
                }
                QRef.current = e;
                VRef.current = camera.zoom;
            }
        }
        if (!ee && JRef.current && !KRef.current) {
            if (transform) {
                if (YRef.current) {
                    let e = YRef.current.children[0];
                    if (e?.clientWidth && e != null && e.clientHeight) {
                        let { isOrthographicCamera } = camera;
                        if (isOrthographicCamera || geometry) {
                            if (rest.scale) {
                                if (Array.isArray(rest.scale)) {
                                    if (rest.scale instanceof Pq0) {
                                        JRef.current.scale.copy(rest.scale.clone().divideScalar(1));
                                    } else {
                                        JRef.current.scale.set(1 / rest.scale[0], 1 / rest.scale[1], 1 / rest.scale[2]);
                                    }
                                } else {
                                    JRef.current.scale.setScalar(1 / rest.scale);
                                }
                            }
                        } else {
                            let t = (distanceFactor || 10) / 400;
                            let i = e.clientWidth * t;
                            let n = e.clientHeight * t;
                            JRef.current.scale.set(i, n, 1);
                        }
                        KRef.current = true;
                    }
                }
            } else {
                let t = F.children[0];
                if (t?.clientWidth && t != null && t.clientHeight) {
                    let e = 1 / viewport.factor;
                    let i = t.clientWidth * e;
                    let n = t.clientHeight * e;
                    JRef.current.scale.set(i, n, 1);
                    KRef.current = true;
                }
                JRef.current.lookAt(e.camera.position);
            }
        }
    });
    let er = useMemo(()=>({
            vertexShader: transform ? undefined : `
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,
            fragmentShader: `
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `
        }), [
        transform
    ]);
    return <group {...rest} ref={GRef}>{occlude && !ee && <mesh castShadow={castShadow} receiveShadow={receiveShadow} ref={JRef}>{geometry || <planeGeometry/>}{material || <shaderMaterial side={side} vertexShader={er.vertexShader} fragmentShader={er.fragmentShader}/>}</mesh>}</group>;
});
