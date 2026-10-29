export let S = {
    background: "#1d1d1d",
    ambientLight: {
        intensity: 0.8
    },
    hemisphereLight: {
        skyColor: "#87CEEB",
        groundColor: "#444444",
        intensity: 0.6
    },
    mainLight: {
        position: [
            -100,
            151,
            50
        ],
        intensity: 4,
        color: "#fffbf0",
        castShadow: true,
        shadowMapSize: 2048,
        shadowCameraBounds: 60,
        shadowFit: true,
        shadowFitScale: 1.7,
        shadowFitPad: 3,
        shadowFitMin: 8
    },
    fillLight: {
        position: [
            -30,
            40,
            -30
        ],
        intensity: 0.3,
        color: "#ffffff"
    },
    grid: {
        cellSize: 1,
        cellThickness: 1,
        sectionSize: 12,
        sectionThickness: 0.8,
        visible: true,
        cellColor: "#575757",
        sectionColor: "#808080",
        fadeDistance: 270,
        fadeStrength: 1,
        opacity: 1,
        lineColor: "#ffffff",
        minorAlpha: 0.075,
        majorAlpha: 0.16,
        gain: 1.3,
        fitInner: 1.05,
        fitScale: 2.7
    },
    groundShadow: {
        enabled: true,
        opacity: 0.55
    },
    viewport: {
        vignette: 0.32
    },
    renderer: {
        toneMapping: "ACESFilmic",
        toneMappingExposure: 1.5,
        dpr: [
            1,
            1.5
        ],
        shadows: true
    },
    camera: {
        fov: 50,
        near: 0.1,
        far: 5000
    },
    postProcessing: {
        enabled: false,
        bloom: {
            enabled: false,
            intensity: 0.35,
            luminanceThreshold: 0.86,
            luminanceSmoothing: 0.12,
            mipmapBlur: true
        },
        vignette: {
            enabled: false,
            offset: 0.3,
            darkness: 0.7
        },
        outline: {
            enabled: false,
            edgeStrength: 2.5,
            visibleEdgeColor: "#000000",
            hiddenEdgeColor: "#000000",
            blur: false,
            xRay: true
        }
    },
    fog: {
        enabled: false,
        type: "exponential",
        color: "#3D3D3D",
        near: 50,
        far: 200,
        density: 0.01
    },
    emissive: {
        enabled: true,
        intensity: 1.8
    }
};
