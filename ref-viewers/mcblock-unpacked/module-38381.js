import { jsx } from "./module-86897.js";
import { createContext, forwardRef, memo, useContext, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef } from "./module-61426.js";
import { I9Y, LoY, ix0, y_p } from "./module-85339.js";
import * as l from "./module-59040.js";
import { D } from "./module-59040.js";
import { AH, K1, Mj, SP, To, Vu, Xe, bv, d4, eF, hH, i, i4, oF, s0, st } from "./module-13303.js";
import "./module-81948.js";
new I9Y;
new I9Y;
function c(e, t) {
    if (!(e instanceof t)) {
        throw TypeError("Cannot call a class as a function");
    }
}
const f = function e(t, r, n) {
    const o = this;
    c(this, e);
    this.dot2 = function(e, t) {
        return o.x * e + o.y * t;
    };
    this.dot3 = function(e, t, r) {
        return o.x * e + o.y * t + o.z * r;
    };
    this.x = t;
    this.y = r;
    this.z = n;
};
const u = [
    new f(1, 1, 0),
    new f(-1, 1, 0),
    new f(1, -1, 0),
    new f(-1, -1, 0),
    new f(1, 0, 1),
    new f(-1, 0, 1),
    new f(1, 0, -1),
    new f(-1, 0, -1),
    new f(0, 1, 1),
    new f(0, -1, 1),
    new f(0, 1, -1),
    new f(0, -1, -1)
];
const d = [
    151,
    160,
    137,
    91,
    90,
    15,
    131,
    13,
    201,
    95,
    96,
    53,
    194,
    233,
    7,
    225,
    140,
    36,
    103,
    30,
    69,
    142,
    8,
    99,
    37,
    240,
    21,
    10,
    23,
    190,
    6,
    148,
    247,
    120,
    234,
    75,
    0,
    26,
    197,
    62,
    94,
    252,
    219,
    203,
    117,
    35,
    11,
    32,
    57,
    177,
    33,
    88,
    237,
    149,
    56,
    87,
    174,
    20,
    125,
    136,
    171,
    168,
    68,
    175,
    74,
    165,
    71,
    134,
    139,
    48,
    27,
    166,
    77,
    146,
    158,
    231,
    83,
    111,
    229,
    122,
    60,
    211,
    133,
    230,
    220,
    105,
    92,
    41,
    55,
    46,
    245,
    40,
    244,
    102,
    143,
    54,
    65,
    25,
    63,
    161,
    1,
    216,
    80,
    73,
    209,
    76,
    132,
    187,
    208,
    89,
    18,
    169,
    200,
    196,
    135,
    130,
    116,
    188,
    159,
    86,
    164,
    100,
    109,
    198,
    173,
    186,
    3,
    64,
    52,
    217,
    226,
    250,
    124,
    123,
    5,
    202,
    38,
    147,
    118,
    126,
    255,
    82,
    85,
    212,
    207,
    206,
    59,
    227,
    47,
    16,
    58,
    17,
    182,
    189,
    28,
    42,
    223,
    183,
    170,
    213,
    119,
    248,
    152,
    2,
    44,
    154,
    163,
    70,
    221,
    153,
    101,
    155,
    167,
    43,
    172,
    9,
    129,
    22,
    39,
    253,
    19,
    98,
    108,
    110,
    79,
    113,
    224,
    232,
    178,
    185,
    112,
    104,
    218,
    246,
    97,
    228,
    251,
    34,
    242,
    193,
    238,
    210,
    144,
    12,
    191,
    179,
    162,
    241,
    81,
    51,
    145,
    235,
    249,
    14,
    239,
    107,
    49,
    192,
    214,
    31,
    181,
    199,
    106,
    157,
    184,
    84,
    204,
    176,
    115,
    121,
    50,
    45,
    127,
    4,
    150,
    254,
    138,
    236,
    205,
    93,
    222,
    114,
    67,
    29,
    24,
    72,
    243,
    141,
    128,
    195,
    78,
    66,
    215,
    61,
    156,
    180
];
const m = Array(512);
const p = Array(512);
(()=>{
    let e = 0;
    if (e > 0 && e < 1) {
        e *= 65536;
    }
    if ((e = Math.floor(e)) < 256) {
        e |= e << 8;
    }
    let t;
    for(let r = 0; r < 256; r++){
        t = 1 & r ? d[r] ^ 255 & e : d[r] ^ e >> 8 & 255;
        m[r] = m[r + 256] = t;
        p[r] = p[r + 256] = u[t % 12];
    }
})();
function h(e) {
    let t = ((e)=>{
        if (typeof e === "number") {
            e = Math.abs(e);
        } else if (typeof e === "string") {
            const t = e;
            e = 0;
            for(let r = 0; r < t.length; r++){
                e = (e + (r + 1) * (t.charCodeAt(r) % 96)) % 2147483647;
            }
        }
        if (e === 0) {
            e = 311;
        }
        return e;
    })(e);
    return function() {
        const e = 48271 * t % 2147483647;
        t = e;
        return e / 2147483647;
    };
}
new function e(t) {
    const r = this;
    c(this, e);
    this.seed = 0;
    this.init = function(e) {
        r.seed = e;
        r.value = h(e);
    };
    this.value = h(this.seed);
    this.init(t);
}(Math.random());
LoY;
let GContext = createContext(null);
let VContext = createContext(null);
let w = (e)=>(2 & e.getAttributes()) == 2;
let P = memo(forwardRef(({ children, camera, scene, resolutionScale, enabled = true, renderPriority = 1, autoClear = true, depthBuffer, enableNormalPass, stencilBuffer, multisampling = 8, frameBufferType = ix0 }, P)=>{
    let { gl, scene: scene_1, camera: camera_1, size } = l.C();
    let scene_2 = scene || scene_1;
    let camera_2 = camera || camera_1;
    let [M, E, j] = useMemo(()=>{
        let e = new s0(gl, {
            depthBuffer,
            stencilBuffer,
            multisampling,
            frameBufferType
        });
        e.addPass(new AH(scene_2, camera_2));
        let t = null;
        let r = null;
        if (enableNormalPass) {
            r = new Xe(scene_2, camera_2);
            r.enabled = false;
            e.addPass(r);
            if (resolutionScale !== undefined) {
                t = new SP({
                    normalBuffer: r.texture,
                    resolutionScale
                });
                t.enabled = false;
                e.addPass(t);
            }
        }
        return [
            e,
            r,
            t
        ];
    }, [
        camera_2,
        gl,
        depthBuffer,
        stencilBuffer,
        multisampling,
        frameBufferType,
        scene_2,
        enableNormalPass,
        resolutionScale
    ]);
    useEffect(()=>M?.setSize(size.width, size.height), [
        M,
        size
    ]);
    D((e, t)=>{
        if (enabled) {
            let e = gl.autoClear;
            gl.autoClear = autoClear;
            if (stencilBuffer && !autoClear) {
                gl.clearStencil();
            }
            M.render(t);
            gl.autoClear = e;
        }
    }, enabled ? renderPriority : 0);
    let zRef = useRef(null);
    useLayoutEffect(()=>{
        let e = [];
        let __r3f = zRef.current.__r3f;
        if (__r3f && M) {
            let r = __r3f.children;
            for(let t = 0; t < r.length; t++){
                let n = r[t].object;
                if (n instanceof Mj) {
                    let o = [
                        n
                    ];
                    if (!w(n)) {
                        let e = null;
                        while((e = r[t + 1]?.object) instanceof Mj && !w(e)){
                            o.push(e);
                            t++;
                        }
                    }
                    let i = new Vu(camera_2, ...o);
                    e.push(i);
                } else {
                    if (n instanceof oF) {
                        e.push(n);
                    }
                }
            }
            for (let t of e){
                M?.addPass(t);
            }
            if (E) {
                E.enabled = true;
            }
            if (j) {
                j.enabled = true;
            }
        }
        return ()=>{
            for (let t of e){
                M?.removePass(t);
            }
            if (E) {
                E.enabled = false;
            }
            if (j) {
                j.enabled = false;
            }
        };
    }, [
        M,
        children,
        camera_2,
        E,
        j
    ]);
    useEffect(()=>{
        let gl_toneMapping = gl.toneMapping;
        gl.toneMapping = y_p;
        return ()=>{
            gl.toneMapping = gl_toneMapping;
        };
    }, [
        gl
    ]);
    let value = useMemo(()=>({
            composer: M,
            normalPass: E,
            downSamplingPass: j,
            resolutionScale,
            camera: camera_2,
            scene: scene_2
        }), [
        M,
        E,
        j,
        resolutionScale,
        camera_2,
        scene_2
    ]);
    useImperativeHandle(P, ()=>M, [
        M
    ]);
    return <VContext.Provider value={value}><group ref={zRef}>{children}</group></VContext.Provider>;
}));
export { P as s0 };
let x = (e)=>{
    if (typeof e === "object" && e != null && "current" in e) {
        return e.current;
    }
    return e;
};
let b = 0;
let y = new WeakMap;
let C = (e, t)=>function({ blendFunction = t?.blendFunction, opacity = t?.opacity, ...rest }) {
        let s = y.get(e);
        if (!s) {
            let t = `@react-three/postprocessing/${e.name}-${b++}`;
            l.e({
                [t]: e
            });
            y.set(e, s = t);
        }
        let camera = l.C((e)=>e.camera);
        let args = useMemo(()=>[
                ...t?.args ?? [],
                ...rest.args ?? [
                    {
                        ...t,
                        ...rest
                    }
                ]
            ], [
            JSON.stringify(rest)
        ]);
        return jsx(s, {
            camera,
            "blendMode-blendFunction": blendFunction,
            "blendMode-opacity-value": opacity,
            ...rest,
            args
        });
    };
Mj;
bv;
i;
export let Rc = forwardRef(function({ selection = [], selectionLayer = 10, blendFunction, patternTexture, edgeStrength, pulseSpeed, visibleEdgeColor, hiddenEdgeColor, width, height, kernelSize, blur, xRay, ...rest }, b) {
    let y = l.C((e)=>e.invalidate);
    let { scene, camera } = useContext(VContext);
    let _ = useMemo(()=>new st(scene, camera, {
            blendFunction,
            patternTexture,
            edgeStrength,
            pulseSpeed,
            visibleEdgeColor,
            hiddenEdgeColor,
            width,
            height,
            kernelSize,
            blur,
            xRay,
            ...rest
        }), [
        blendFunction,
        blur,
        camera,
        edgeStrength,
        height,
        hiddenEdgeColor,
        kernelSize,
        patternTexture,
        pulseSpeed,
        scene,
        visibleEdgeColor,
        width,
        xRay
    ]);
    let M = useContext(GContext);
    useEffect(()=>{
        if (!M && selection) {
            _.selection.set(Array.isArray(selection) ? selection.map(x) : [
                x(selection)
            ]);
            y();
            return ()=>{
                _.selection.clear();
                y();
            };
        }
    }, [
        _,
        selection,
        M,
        y
    ]);
    useEffect(()=>{
        _.selectionLayer = selectionLayer;
        y();
    }, [
        _,
        y,
        selectionLayer
    ]);
    useRef(undefined);
    useEffect(()=>{
        if (M && M.enabled && M.selected?.length) {
            _.selection.set(M.selected);
            y();
            return ()=>{
                _.selection.clear();
                y();
            };
        }
    }, [
        M,
        _.selection,
        y
    ]);
    useEffect(()=>()=>{
            _.dispose();
        }, [
        _
    ]);
    return <primitive ref={b} object={_}/>;
});
hH;
export let iS = forwardRef(function({ selection = [], selectionLayer = 10, lights = [], inverted = false, ignoreBackground = false, luminanceThreshold, luminanceSmoothing, intensity, width, height, kernelSize, mipmapBlur, ...rest }, P) {
    if (lights.length === 0) {
        console.warn("SelectiveBloom requires lights to work.");
    }
    let b = l.C((e)=>e.invalidate);
    let { scene, camera } = useContext(VContext);
    let S = useMemo(()=>{
        let e = new d4(scene, camera, {
            blendFunction: 0,
            luminanceThreshold,
            luminanceSmoothing,
            intensity,
            width,
            height,
            kernelSize,
            mipmapBlur,
            ...rest
        });
        e.inverted = inverted;
        e.ignoreBackground = ignoreBackground;
        return e;
    }, [
        scene,
        camera,
        luminanceThreshold,
        luminanceSmoothing,
        intensity,
        width,
        height,
        kernelSize,
        mipmapBlur,
        inverted,
        ignoreBackground,
        rest
    ]);
    let _ = useContext(GContext);
    useEffect(()=>{
        if (!_ && selection) {
            S.selection.set(Array.isArray(selection) ? selection.map(x) : [
                x(selection)
            ]);
            b();
            return ()=>{
                S.selection.clear();
                b();
            };
        }
    }, [
        S,
        selection,
        _,
        b
    ]);
    useEffect(()=>{
        S.selection.layer = selectionLayer;
        b();
    }, [
        S,
        b,
        selectionLayer
    ]);
    useEffect(()=>{
        if (lights && lights.length > 0) {
            lights.forEach((e)=>{
                let t;
                t = x(e);
                return t.layers.enable(S.selection.layer);
            });
            b();
            return ()=>{
                lights.forEach((e)=>{
                    let t;
                    t = x(e);
                    return t.layers.disable(S.selection.layer);
                });
                b();
            };
        }
    }, [
        S,
        b,
        lights,
        selectionLayer
    ]);
    useEffect(()=>{
        if (_ && _.enabled && _.selected?.length) {
            S.selection.set(_.selected);
            b();
            return ()=>{
                S.selection.clear();
                b();
            };
        }
    }, [
        _,
        S.selection,
        b
    ]);
    return <primitive ref={P} object={S} dispose={null}/>;
});
export let Jp = C(eF);
const E = {
    Linear: 0,
    0: "Linear",
    Radial: 1,
    1: "Radial",
    MirroredLinear: 2,
    2: "MirroredLinear"
};
Mj;
export let bt = C(i4);
export let fE = C(K1);
To;
let k = {
    fragmentShader: `

    // original shader by Evan Wallace

    #define MAX_ITERATIONS 100

    uniform float blur;
    uniform float taper;
    uniform vec2 start;
    uniform vec2 end;
    uniform vec2 direction;
    uniform int samples;

    float random(vec3 scale, float seed) {
        /* use the fragment position for a different seed per-pixel */
        return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec4 color = vec4(0.0);
        float total = 0.0;
        vec2 startPixel = vec2(start.x * resolution.x, start.y * resolution.y);
        vec2 endPixel = vec2(end.x * resolution.x, end.y * resolution.y);
        float f_samples = float(samples);
        float half_samples = f_samples / 2.0;

        // use screen diagonal to normalize blur radii
        float maxScreenDistance = distance(vec2(0.0), resolution); // diagonal distance
        float gradientRadius = taper * (maxScreenDistance);
        float blurRadius = blur * (maxScreenDistance / 16.0);

        /* randomize the lookup values to hide the fixed number of samples */
        float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
        vec2 normal = normalize(vec2(startPixel.y - endPixel.y, endPixel.x - startPixel.x));
        float radius = smoothstep(0.0, 1.0, abs(dot(uv * resolution - startPixel, normal)) / gradientRadius) * blurRadius;

        #pragma unroll_loop_start
        for (int i = 0; i <= MAX_ITERATIONS; i++) {
            if (i >= samples) { break; } // return early if over sample count
            float f_i = float(i);
            float s_i = -half_samples + f_i;
            float percent = (s_i + offset - 0.5) / half_samples;
            float weight = 1.0 - abs(percent);
            vec4 sample_i = texture2D(inputBuffer, uv + normalize(direction) / resolution * percent * radius);
            /* switch to pre-multiplied alpha to correctly blur transparent images */
            sample_i.rgb *= sample_i.a;
            color += sample_i * weight;
            total += weight;
        }
        #pragma unroll_loop_end

        outputColor = color / total;

        /* switch back from pre-multiplied alpha */
        outputColor.rgb /= outputColor.a + 0.00001;
    }
    `
};
Mj;
Mj;
Mj;
