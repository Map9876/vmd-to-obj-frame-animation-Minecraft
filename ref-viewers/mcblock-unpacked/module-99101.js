import "./module-88945.js";
import { C } from "./module-59040.js";
import { forwardRef, useEffect, useMemo } from "./module-61426.js";
import { O9p, Pq0 } from "./module-85339.js";
import { Q } from "./module-3362.js";
const c = (e, t, i)=>{
    ((e, t, i)=>{
        if (t in e) {
            return Object.defineProperty(e, t, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: i
            });
        }
        return e[t] = i;
    })(e, typeof t !== "symbol" ? `${t}` : t, i);
    return i;
};
let d = new O9p(0, 0, 0, "YXZ");
let u = new Pq0;
let f = {
    type: "change"
};
let m = {
    type: "lock"
};
let h = {
    type: "unlock"
};
let p = Math.PI / 2;
class v extends Q {
    constructor(e, t){
        super();
        c(this, "camera");
        c(this, "domElement");
        c(this, "isLocked");
        c(this, "minPolarAngle");
        c(this, "maxPolarAngle");
        c(this, "pointerSpeed");
        c(this, "onMouseMove", (e)=>{
            if (this.domElement && this.isLocked !== false) {
                d.setFromQuaternion(this.camera.quaternion);
                d.y -= 0.002 * e.movementX * this.pointerSpeed;
                d.x -= 0.002 * e.movementY * this.pointerSpeed;
                d.x = Math.max(p - this.maxPolarAngle, Math.min(p - this.minPolarAngle, d.x));
                this.camera.quaternion.setFromEuler(d);
                this.dispatchEvent(f);
            }
        });
        c(this, "onPointerlockChange", ()=>{
            if (this.domElement) {
                if (this.domElement.ownerDocument.pointerLockElement === this.domElement) {
                    this.dispatchEvent(m);
                    this.isLocked = true;
                } else {
                    this.dispatchEvent(h);
                    this.isLocked = false;
                }
            }
        });
        c(this, "onPointerlockError", ()=>{
            console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
        });
        c(this, "connect", (e)=>{
            this.domElement = e || this.domElement;
            if (this.domElement) {
                this.domElement.ownerDocument.addEventListener("mousemove", this.onMouseMove);
                this.domElement.ownerDocument.addEventListener("pointerlockchange", this.onPointerlockChange);
                this.domElement.ownerDocument.addEventListener("pointerlockerror", this.onPointerlockError);
            }
        });
        c(this, "disconnect", ()=>{
            if (this.domElement) {
                this.domElement.ownerDocument.removeEventListener("mousemove", this.onMouseMove);
                this.domElement.ownerDocument.removeEventListener("pointerlockchange", this.onPointerlockChange);
                this.domElement.ownerDocument.removeEventListener("pointerlockerror", this.onPointerlockError);
            }
        });
        c(this, "dispose", ()=>{
            this.disconnect();
        });
        c(this, "getObject", ()=>this.camera);
        c(this, "direction", new Pq0(0, 0, -1));
        c(this, "getDirection", (e)=>e.copy(this.direction).applyQuaternion(this.camera.quaternion));
        c(this, "moveForward", (e)=>{
            u.setFromMatrixColumn(this.camera.matrix, 0);
            u.crossVectors(this.camera.up, u);
            this.camera.position.addScaledVector(u, e);
        });
        c(this, "moveRight", (e)=>{
            u.setFromMatrixColumn(this.camera.matrix, 0);
            this.camera.position.addScaledVector(u, e);
        });
        c(this, "lock", ()=>{
            if (this.domElement) {
                this.domElement.requestPointerLock();
            }
        });
        c(this, "unlock", ()=>{
            if (this.domElement) {
                this.domElement.ownerDocument.exitPointerLock();
            }
        });
        this.camera = e;
        this.domElement = t;
        this.isLocked = false;
        this.minPolarAngle = 0;
        this.maxPolarAngle = Math.PI;
        this.pointerSpeed = 1;
        if (t) {
            this.connect(t);
        }
    }
}
export let Z = forwardRef(({ domElement, selector, onChange, onLock, onUnlock, enabled = true, makeDefault, ...rest }, ref)=>{
    let { camera, ...rest_1 } = rest;
    let h = C((e)=>e.setEvents);
    let p = C((e)=>e.gl);
    let y = C((e)=>e.camera);
    let g = C((e)=>e.invalidate);
    let x = C((e)=>e.events);
    let w = C((e)=>e.get);
    let E = C((e)=>e.set);
    let S = camera || y;
    let b = domElement || x.connected || p.domElement;
    let M = useMemo(()=>new v(S), [
        S
    ]);
    useEffect(()=>{
        if (enabled) {
            M.connect(b);
            let compute = w().events.compute;
            h({
                compute (e, t) {
                    let i = t.size.width / 2;
                    let n = t.size.height / 2;
                    t.pointer.set(i / t.size.width * 2 - 1, -(2 * (n / t.size.height)) + 1);
                    t.raycaster.setFromCamera(t.pointer, t.camera);
                }
            });
            return ()=>{
                M.disconnect();
                h({
                    compute
                });
            };
        }
    }, [
        enabled,
        M
    ]);
    useEffect(()=>{
        let e = (e)=>{
            g();
            if (onChange) {
                onChange(e);
            }
        };
        M.addEventListener("change", e);
        if (onLock) {
            M.addEventListener("lock", onLock);
        }
        if (onUnlock) {
            M.addEventListener("unlock", onUnlock);
        }
        let n = ()=>M.lock();
        let r = selector ? Array.from(document.querySelectorAll(selector)) : [
            document
        ];
        r.forEach((e)=>e && e.addEventListener("click", n));
        return ()=>{
            M.removeEventListener("change", e);
            if (onLock) {
                M.removeEventListener("lock", onLock);
            }
            if (onUnlock) {
                M.removeEventListener("unlock", onUnlock);
            }
            r.forEach((e)=>{
                if (e) {
                    return e.removeEventListener("click", n);
                }
            });
        };
    }, [
        onChange,
        onLock,
        onUnlock,
        selector,
        M,
        g
    ]);
    useEffect(()=>{
        if (makeDefault) {
            let controls = w().controls;
            E({
                controls: M
            });
            return ()=>E({
                    controls
                });
        }
    }, [
        makeDefault,
        M
    ]);
    return <primitive ref={ref} object={M} {...rest_1}/>;
});
