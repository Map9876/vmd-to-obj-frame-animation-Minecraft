import { useContext, useEffect } from "./module-61426.js";
import { C } from "./module-59040.js";
import { cr } from "./module-4336.js";
import { S } from "./module-24708.js";
import { ZK } from "./module-5838.js";
import { $m, ZG } from "./module-80362.js";
let c = {
    teaching: {
        toneMapping: true,
        background: true,
        fog: true,
        shadows: true,
        dpr: true,
        maxDpr: 2
    },
    studio: {
        toneMapping: true,
        background: true,
        fog: true,
        shadows: true,
        dpr: true,
        maxDpr: 2
    },
    "scene-tuner": {
        toneMapping: true,
        background: true,
        fog: true,
        shadows: true,
        dpr: true,
        maxDpr: 2
    }
};
function useD({ entry, transparent = false }) {
    let u = useContext(cr) ?? S;
    let { gl, scene, setDpr } = C();
    let capabilities = c[entry];
    useEffect(()=>{
        $m(gl, scene, u, {
            transparent,
            capabilities
        });
        if (transparent && capabilities.background) {
            let t = gl.domElement.closest(".mcb-viewport") ?? gl.domElement.parentElement;
            let n = u.postProcessing.enabled && u.postProcessing.vignette.enabled && u.postProcessing.vignette.darkness > 0;
            if (t) {
                ZK(t, u.background, n ? 0 : u.viewport.vignette);
            }
        }
    }, [
        gl,
        scene,
        u,
        transparent,
        capabilities
    ]);
    useEffect(()=>{
        let e = ZG(u.renderer.dpr, window.devicePixelRatio, capabilities);
        if (e !== null) {
            setDpr(e);
        }
    }, [
        u.renderer.dpr,
        capabilities,
        setDpr
    ]);
    return null;
}
export { useD as c };
