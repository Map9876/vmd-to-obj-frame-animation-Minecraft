import "./module-86897.js";
import { forwardRef, useCallback, useEffect, useId, useImperativeHandle, useLayoutEffect, useRef } from "./module-61426.js";
import { C, D } from "./module-59040.js";
import { Z } from "./module-99101.js";
import { Pq0 } from "./module-85339.js";
export let W = forwardRef(function({ enabled, moveSpeed = 5, lookSpeed = 1, boundingBox, onLock, onUnlock, speedRef, onToolWheel, onSpeedChange }, t) {
    let { camera, gl } = C();
    let kRef = useRef(null);
    let y = useId();
    useLayoutEffect(()=>{
        if (!enabled) {
            return;
        }
        let gl_domElement = gl.domElement;
        let t = "data-mcb-pointer-lock";
        let r = gl_domElement.getAttribute(t);
        gl_domElement.setAttribute(t, y);
        return ()=>{
            if (r === null) {
                gl_domElement.removeAttribute(t);
            } else {
                gl_domElement.setAttribute(t, r);
            }
        };
    }, [
        enabled,
        gl,
        y
    ]);
    useImperativeHandle(t, ()=>({
            lock: ()=>{
                try {
                    kRef.current?.lock();
                } catch (e) {}
            },
            unlock: ()=>{
                try {
                    kRef.current?.unlock();
                } catch (e) {}
            },
            isLocked: ()=>!!kRef.current?.isLocked
        }), []);
    let wRef = useRef({});
    let SRef = useRef(moveSpeed);
    useEffect(()=>{
        SRef.current = moveSpeed;
    }, [
        moveSpeed
    ]);
    let bRef = useRef(new Pq0);
    let xRef = useRef(new Pq0);
    let CRef = useRef(new Pq0);
    useEffect(()=>{
        if (!enabled) {
            wRef.current = {};
            return;
        }
        let e = (e)=>{
            wRef.current[e.code] = true;
        };
        let t = (e)=>{
            wRef.current[e.code] = false;
        };
        window.addEventListener("keydown", e);
        window.addEventListener("keyup", t);
        return ()=>{
            window.removeEventListener("keydown", e);
            window.removeEventListener("keyup", t);
        };
    }, [
        enabled
    ]);
    useEffect(()=>{
        if (!enabled) {
            return;
        }
        let e = (e)=>{
            e.preventDefault();
            if (kRef.current?.isLocked) {
                if (onToolWheel && !e.shiftKey) {
                    onToolWheel(e.deltaY > 0 ? 1 : -1);
                } else {
                    let t = e.deltaY > 0 ? 0.85 : 1.18;
                    SRef.current = Math.round(Math.max(4, Math.min(60, SRef.current * t)));
                    if (speedRef) {
                        speedRef.current = SRef.current;
                    }
                    onSpeedChange?.(SRef.current);
                }
            }
        };
        let gl_domElement = gl.domElement;
        gl_domElement.addEventListener("wheel", e, {
            passive: false
        });
        return ()=>gl_domElement.removeEventListener("wheel", e);
    }, [
        enabled,
        gl,
        speedRef,
        onToolWheel,
        onSpeedChange
    ]);
    D((e, t)=>{
        if (!enabled) {
            return;
        }
        let wRef_current = wRef.current;
        let l = SRef.current * t;
        let i = !!wRef_current.KeyW - !!wRef_current.KeyS;
        let u = !!wRef_current.KeyD - !!wRef_current.KeyA;
        let a = !!wRef_current.Space - (wRef_current.ShiftLeft || wRef_current.ShiftRight ? 1 : 0);
        if ((i !== 0 || u !== 0 || a !== 0) && (camera.getWorldDirection(xRef.current), xRef.current.y = 0, xRef.current.normalize(), CRef.current.crossVectors(xRef.current, camera.up).normalize(), bRef.current.set(0, 0, 0), bRef.current.addScaledVector(xRef.current, i), bRef.current.addScaledVector(CRef.current, u), bRef.current.y += a, bRef.current.length() > 0 && bRef.current.normalize(), camera.position.addScaledVector(bRef.current, l), boundingBox)) {
            let e = boundingBox.clone().expandByScalar(1.5 * boundingBox.getSize(new Pq0).length());
            camera.position.clamp(e.min, e.max);
        }
    });
    let onLock_1 = useCallback(()=>{
        onLock?.();
    }, [
        onLock
    ]);
    let onUnlock_1 = useCallback(()=>{
        onUnlock?.();
    }, [
        onUnlock
    ]);
    if (enabled) {
        return <Z ref={kRef} domElement={gl.domElement} selector={`[data-mcb-pointer-lock="${y}"]`} onLock={onLock_1} onUnlock={onUnlock_1}/>;
    }
    return null;
});
