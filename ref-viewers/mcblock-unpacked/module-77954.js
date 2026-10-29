import "./module-86897.js";
import { useCallback, useEffect, useRef } from "./module-61426.js";
import { C } from "./module-59040.js";
import { N } from "./module-90724.js";
import { W } from "./module-18082.js";
let Math_PI = Math.PI;
export { Math_PI as S };
export function m({ mode, onModeChange, boundingBox, orbitConfig, orbitRef, touches, enabled = true, moveSpeed, onSpeedChange }) {
    let t;
    let f;
    let g;
    let m;
    let { camera } = C();
    let _RefRef = useRef(null);
    useEffect(()=>{
        if (mode === "firstPerson" && orbitRef?.current) {
            _RefRef.current = {
                position: camera.position.clone(),
                target: orbitRef.current.target.clone()
            };
        }
    }, [
        mode,
        camera,
        orbitRef
    ]);
    let onUnlock = useCallback(()=>{
        if (mode === "firstPerson") {
            if (onModeChange != null) {
                onModeChange("orbit");
            }
            if (_RefRef.current && orbitRef?.current) {
                orbitRef.current.target.copy(_RefRef.current.target);
                orbitRef.current.update();
            }
        }
    }, [
        mode,
        onModeChange,
        orbitRef
    ]);
    return <>{mode === "orbit" && <N ref={orbitRef} enabled={enabled} enableDamping={(t = orbitConfig?.enableDamping) == null || t} dampingFactor={orbitConfig?.dampingFactor ?? 0.05} minDistance={orbitConfig?.minDistance ?? 3} maxDistance={orbitConfig?.maxDistance ?? 200} maxPolarAngle={orbitConfig?.maxPolarAngle ?? Math_PI} target={orbitConfig?.target} touches={touches} enablePan={(f = orbitConfig?.enablePan) == null || f} enableZoom={(g = orbitConfig?.enableZoom) == null || g} autoRotate={(m = orbitConfig?.autoRotate) != null && m} autoRotateSpeed={orbitConfig?.autoRotateSpeed ?? 2}/>}<W enabled={enabled && mode === "firstPerson"} boundingBox={boundingBox} moveSpeed={moveSpeed} onSpeedChange={onSpeedChange} onUnlock={onUnlock}/></>;
}
