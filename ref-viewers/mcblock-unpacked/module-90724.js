import "./module-88945.js";
import * as o from "./module-59040.js";
import { forwardRef, useEffect, useMemo } from "./module-61426.js";
import { I9Y, PTz, Pq0, RlV, YHV, Zcv, kBv, qUd, ubm, wtR } from "./module-85339.js";
import { Q } from "./module-3362.js";
const c = (e, t, n)=>{
    ((e, t, n)=>{
        if (t in e) {
            return Object.defineProperty(e, t, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: n
            });
        }
        return e[t] = n;
    })(e, typeof t !== "symbol" ? `${t}` : t, n);
    return n;
};
let u = new RlV;
let p = new Zcv;
let d = Math.cos(Math.PI / 180 * 70);
let f = (e, t)=>(e % t + t) % t;
class h extends Q {
    constructor(e, t){
        super();
        c(this, "object");
        c(this, "domElement");
        c(this, "enabled", true);
        c(this, "target", new Pq0);
        c(this, "minDistance", 0);
        c(this, "maxDistance", Infinity);
        c(this, "minZoom", 0);
        c(this, "maxZoom", Infinity);
        c(this, "minPolarAngle", 0);
        c(this, "maxPolarAngle", Math.PI);
        c(this, "minAzimuthAngle", -Infinity);
        c(this, "maxAzimuthAngle", Infinity);
        c(this, "enableDamping", false);
        c(this, "dampingFactor", 0.05);
        c(this, "enableZoom", true);
        c(this, "zoomSpeed", 1);
        c(this, "enableRotate", true);
        c(this, "rotateSpeed", 1);
        c(this, "enablePan", true);
        c(this, "panSpeed", 1);
        c(this, "screenSpacePanning", true);
        c(this, "keyPanSpeed", 7);
        c(this, "zoomToCursor", false);
        c(this, "autoRotate", false);
        c(this, "autoRotateSpeed", 2);
        c(this, "reverseOrbit", false);
        c(this, "reverseHorizontalOrbit", false);
        c(this, "reverseVerticalOrbit", false);
        c(this, "keys", {
            LEFT: "ArrowLeft",
            UP: "ArrowUp",
            RIGHT: "ArrowRight",
            BOTTOM: "ArrowDown"
        });
        c(this, "mouseButtons", {
            LEFT: kBv.ROTATE,
            MIDDLE: kBv.DOLLY,
            RIGHT: kBv.PAN
        });
        c(this, "touches", {
            ONE: wtR.ROTATE,
            TWO: wtR.DOLLY_PAN
        });
        c(this, "target0");
        c(this, "position0");
        c(this, "zoom0");
        c(this, "_domElementKeyEvents", null);
        c(this, "getPolarAngle");
        c(this, "getAzimuthalAngle");
        c(this, "setPolarAngle");
        c(this, "setAzimuthalAngle");
        c(this, "getDistance");
        c(this, "getZoomScale");
        c(this, "listenToKeyEvents");
        c(this, "stopListenToKeyEvents");
        c(this, "saveState");
        c(this, "reset");
        c(this, "update");
        c(this, "connect");
        c(this, "dispose");
        c(this, "dollyIn");
        c(this, "dollyOut");
        c(this, "getScale");
        c(this, "setScale");
        this.object = e;
        this.domElement = t;
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.zoom0 = this.object.zoom;
        this.getPolarAngle = ()=>m.phi;
        this.getAzimuthalAngle = ()=>m.theta;
        this.setPolarAngle = (e)=>{
            let t = f(e, 2 * Math.PI);
            let m_phi = m.phi;
            if (m_phi < 0) {
                m_phi += 2 * Math.PI;
            }
            if (t < 0) {
                t += 2 * Math.PI;
            }
            let o = Math.abs(t - m_phi);
            if (2 * Math.PI - o < o) {
                if (t < m_phi) {
                    t += 2 * Math.PI;
                } else {
                    m_phi += 2 * Math.PI;
                }
            }
            v.phi = t - m_phi;
            n.update();
        };
        this.setAzimuthalAngle = (e)=>{
            let t = f(e, 2 * Math.PI);
            let m_theta = m.theta;
            if (m_theta < 0) {
                m_theta += 2 * Math.PI;
            }
            if (t < 0) {
                t += 2 * Math.PI;
            }
            let o = Math.abs(t - m_theta);
            if (2 * Math.PI - o < o) {
                if (t < m_theta) {
                    t += 2 * Math.PI;
                } else {
                    m_theta += 2 * Math.PI;
                }
            }
            v.theta = t - m_theta;
            n.update();
        };
        this.getDistance = ()=>n.object.position.distanceTo(n.target);
        this.listenToKeyEvents = (e)=>{
            e.addEventListener("keydown", ee);
            this._domElementKeyEvents = e;
        };
        this.stopListenToKeyEvents = ()=>{
            this._domElementKeyEvents.removeEventListener("keydown", ee);
            this._domElementKeyEvents = null;
        };
        this.saveState = ()=>{
            n.target0.copy(n.target);
            n.position0.copy(n.object.position);
            n.zoom0 = n.object.zoom;
        };
        this.reset = ()=>{
            n.target.copy(n.target0);
            n.object.position.copy(n.position0);
            n.object.zoom = n.zoom0;
            n.object.updateProjectionMatrix();
            n.dispatchEvent(r);
            n.update();
            s = l.NONE;
        };
        this.update = (()=>{
            let t = new Pq0;
            let o = new Pq0(0, 1, 0);
            let i = new PTz().setFromUnitVectors(e.up, o);
            let c = i.clone().invert();
            let f = new Pq0;
            let y = new PTz;
            let w = 2 * Math.PI;
            return function() {
                let position = n.object.position;
                i.setFromUnitVectors(e.up, o);
                c.copy(i).invert();
                t.copy(position).sub(n.target);
                t.applyQuaternion(i);
                m.setFromVector3(t);
                if (n.autoRotate && s === l.NONE) {
                    L(2 * Math.PI / 60 / 60 * n.autoRotateSpeed);
                }
                if (n.enableDamping) {
                    m.theta += v.theta * n.dampingFactor;
                    m.phi += v.phi * n.dampingFactor;
                } else {
                    m.theta += v.theta;
                    m.phi += v.phi;
                }
                let n_minAzimuthAngle = n.minAzimuthAngle;
                let n_maxAzimuthAngle = n.maxAzimuthAngle;
                if (isFinite(n_minAzimuthAngle) && isFinite(n_maxAzimuthAngle)) {
                    if (n_minAzimuthAngle < -Math.PI) {
                        n_minAzimuthAngle += w;
                    } else if (n_minAzimuthAngle > Math.PI) {
                        n_minAzimuthAngle -= w;
                    }
                    if (n_maxAzimuthAngle < -Math.PI) {
                        n_maxAzimuthAngle += w;
                    } else if (n_maxAzimuthAngle > Math.PI) {
                        n_maxAzimuthAngle -= w;
                    }
                    if (n_minAzimuthAngle <= n_maxAzimuthAngle) {
                        m.theta = Math.max(n_minAzimuthAngle, Math.min(n_maxAzimuthAngle, m.theta));
                    } else {
                        m.theta = m.theta > (n_minAzimuthAngle + n_maxAzimuthAngle) / 2 ? Math.max(n_minAzimuthAngle, m.theta) : Math.min(n_maxAzimuthAngle, m.theta);
                    }
                }
                m.phi = Math.max(n.minPolarAngle, Math.min(n.maxPolarAngle, m.phi));
                m.makeSafe();
                if (n.enableDamping === true) {
                    n.target.addScaledVector(g, n.dampingFactor);
                } else {
                    n.target.add(g);
                }
                if (n.zoomToCursor && k || n.object.isOrthographicCamera) {
                    m.radius = F(m.radius);
                } else {
                    m.radius = F(m.radius * b);
                }
                t.setFromSpherical(m);
                t.applyQuaternion(c);
                position.copy(n.target).add(t);
                if (!n.object.matrixAutoUpdate) {
                    n.object.updateMatrix();
                }
                n.object.lookAt(n.target);
                if (n.enableDamping === true) {
                    v.theta *= 1 - n.dampingFactor;
                    v.phi *= 1 - n.dampingFactor;
                    g.multiplyScalar(1 - n.dampingFactor);
                } else {
                    v.set(0, 0, 0);
                    g.set(0, 0, 0);
                }
                let C = false;
                if (n.zoomToCursor && k) {
                    let r = null;
                    if (n.object instanceof ubm && n.object.isPerspectiveCamera) {
                        let e = t.length();
                        r = F(e * b);
                        let o = e - r;
                        n.object.position.addScaledVector(T, o);
                        n.object.updateMatrixWorld();
                    } else if (n.object.isOrthographicCamera) {
                        let e = new Pq0(S.x, S.y, 0);
                        e.unproject(n.object);
                        n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / b));
                        n.object.updateProjectionMatrix();
                        C = true;
                        let o = new Pq0(S.x, S.y, 0);
                        o.unproject(n.object);
                        n.object.position.sub(o).add(e);
                        n.object.updateMatrixWorld();
                        r = t.length();
                    } else {
                        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.");
                        n.zoomToCursor = false;
                    }
                    if (r !== null) {
                        if (n.screenSpacePanning) {
                            n.target.set(0, 0, -1).transformDirection(n.object.matrix).multiplyScalar(r).add(n.object.position);
                        } else {
                            u.origin.copy(n.object.position);
                            u.direction.set(0, 0, -1).transformDirection(n.object.matrix);
                            if (Math.abs(n.object.up.dot(u.direction)) < d) {
                                e.lookAt(n.target);
                            } else {
                                p.setFromNormalAndCoplanarPoint(n.object.up, n.target);
                                u.intersectPlane(p, n.target);
                            }
                        }
                    }
                } else {
                    if (n.object instanceof qUd && n.object.isOrthographicCamera && (C = b !== 1)) {
                        n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / b));
                        n.object.updateProjectionMatrix();
                    }
                }
                b = 1;
                k = false;
                return !!(C || f.distanceToSquared(n.object.position) > h || 8 * (1 - y.dot(n.object.quaternion)) > h) && (n.dispatchEvent(r), f.copy(n.object.position), y.copy(n.object.quaternion), C = false, true);
            };
        })();
        this.connect = (e)=>{
            n.domElement = e;
            n.domElement.style.touchAction = "none";
            n.domElement.addEventListener("contextmenu", et);
            n.domElement.addEventListener("pointerdown", $);
            n.domElement.addEventListener("pointercancel", Q);
            n.domElement.addEventListener("wheel", J);
        };
        this.dispose = ()=>{
            if (n.domElement) {
                n.domElement.style.touchAction = "auto";
            }
            n.domElement?.removeEventListener("contextmenu", et);
            n.domElement?.removeEventListener("pointerdown", $);
            n.domElement?.removeEventListener("pointercancel", Q);
            n.domElement?.removeEventListener("wheel", J);
            n.domElement?.ownerDocument.removeEventListener("pointermove", G);
            n.domElement?.ownerDocument.removeEventListener("pointerup", Q);
            if (n._domElementKeyEvents !== null) {
                n._domElementKeyEvents.removeEventListener("keydown", ee);
            }
        };
        let n = this;
        let r = {
            type: "change"
        };
        let o = {
            type: "start"
        };
        let i = {
            type: "end"
        };
        let l = {
            NONE: -1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_PAN: 4,
            TOUCH_DOLLY_PAN: 5,
            TOUCH_DOLLY_ROTATE: 6
        };
        let s = l.NONE;
        let h = 0.000001;
        let m = new YHV;
        let v = new YHV;
        let b = 1;
        let g = new Pq0;
        let y = new I9Y;
        let w = new I9Y;
        let j = new I9Y;
        let E = new I9Y;
        let P = new I9Y;
        let C = new I9Y;
        let O = new I9Y;
        let x = new I9Y;
        let M = new I9Y;
        let T = new Pq0;
        let S = new I9Y;
        let k = false;
        let A = [];
        let _ = {};
        function I() {
            return 0.95 ** n.zoomSpeed;
        }
        function L(e) {
            if (n.reverseOrbit || n.reverseHorizontalOrbit) {
                v.theta += e;
            } else {
                v.theta -= e;
            }
        }
        function R(e) {
            if (n.reverseOrbit || n.reverseVerticalOrbit) {
                v.phi += e;
            } else {
                v.phi -= e;
            }
        }
        let z = (()=>{
            let e = new Pq0;
            return function(t, n) {
                e.setFromMatrixColumn(n, 0);
                e.multiplyScalar(-t);
                g.add(e);
            };
        })();
        let D = (()=>{
            let e = new Pq0;
            return function(t, r) {
                if (n.screenSpacePanning === true) {
                    e.setFromMatrixColumn(r, 1);
                } else {
                    e.setFromMatrixColumn(r, 0);
                    e.crossVectors(n.object.up, e);
                }
                e.multiplyScalar(t);
                g.add(e);
            };
        })();
        let N = (()=>{
            let e = new Pq0;
            return function(t, r) {
                let n_domElement = n.domElement;
                if (n_domElement && n.object instanceof ubm && n.object.isPerspectiveCamera) {
                    let i = n.object.position;
                    e.copy(i).sub(n.target);
                    let a = e.length();
                    z(2 * t * (a *= Math.tan(n.object.fov / 2 * Math.PI / 180)) / n_domElement.clientHeight, n.object.matrix);
                    D(2 * r * a / n_domElement.clientHeight, n.object.matrix);
                } else {
                    if (n_domElement && n.object instanceof qUd && n.object.isOrthographicCamera) {
                        z(t * (n.object.right - n.object.left) / n.object.zoom / n_domElement.clientWidth, n.object.matrix);
                        D(r * (n.object.top - n.object.bottom) / n.object.zoom / n_domElement.clientHeight, n.object.matrix);
                    } else {
                        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
                        n.enablePan = false;
                    }
                }
            };
        })();
        function H(e) {
            if (n.object instanceof ubm && n.object.isPerspectiveCamera || n.object instanceof qUd && n.object.isOrthographicCamera) {
                b = e;
            } else {
                console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
                n.enableZoom = false;
            }
        }
        function Y(e) {
            if (!n.zoomToCursor || !n.domElement) {
                return;
            }
            k = true;
            let t = n.domElement.getBoundingClientRect();
            let r = e.clientX - t.left;
            let o = e.clientY - t.top;
            let t_width = t.width;
            let t_height = t.height;
            S.x = r / t_width * 2 - 1;
            S.y = -(o / t_height * 2) + 1;
            T.set(S.x, S.y, 1).unproject(n.object).sub(n.object.position).normalize();
        }
        function F(e) {
            return Math.max(n.minDistance, Math.min(n.maxDistance, e));
        }
        function q(e) {
            y.set(e.clientX, e.clientY);
        }
        function U(e) {
            E.set(e.clientX, e.clientY);
        }
        function V() {
            if (A.length == 1) {
                y.set(A[0].pageX, A[0].pageY);
            } else {
                let e = 0.5 * (A[0].pageX + A[1].pageX);
                let t = 0.5 * (A[0].pageY + A[1].pageY);
                y.set(e, t);
            }
        }
        function B() {
            if (A.length == 1) {
                E.set(A[0].pageX, A[0].pageY);
            } else {
                let e = 0.5 * (A[0].pageX + A[1].pageX);
                let t = 0.5 * (A[0].pageY + A[1].pageY);
                E.set(e, t);
            }
        }
        function X() {
            let e = A[0].pageX - A[1].pageX;
            let t = A[0].pageY - A[1].pageY;
            let n = Math.sqrt(e * e + t * t);
            O.set(0, n);
        }
        function Z(e) {
            if (A.length == 1) {
                w.set(e.pageX, e.pageY);
            } else {
                let t = er(e);
                let n = 0.5 * (e.pageX + t.x);
                let r = 0.5 * (e.pageY + t.y);
                w.set(n, r);
            }
            j.subVectors(w, y).multiplyScalar(n.rotateSpeed);
            let n_domElement = n.domElement;
            if (n_domElement) {
                L(2 * Math.PI * j.x / n_domElement.clientHeight);
                R(2 * Math.PI * j.y / n_domElement.clientHeight);
            }
            y.copy(w);
        }
        function W(e) {
            if (A.length == 1) {
                P.set(e.pageX, e.pageY);
            } else {
                let t = er(e);
                let n = 0.5 * (e.pageX + t.x);
                let r = 0.5 * (e.pageY + t.y);
                P.set(n, r);
            }
            C.subVectors(P, E).multiplyScalar(n.panSpeed);
            N(C.x, C.y);
            E.copy(P);
        }
        function K(e) {
            let t;
            let r = er(e);
            let o = e.pageX - r.x;
            let i = e.pageY - r.y;
            let a = Math.sqrt(o * o + i * i);
            x.set(0, a);
            M.set(0, (x.y / O.y) ** n.zoomSpeed);
            t = M.y;
            H(b / t);
            O.copy(x);
        }
        function $(e) {
            let t;
            let r;
            let i;
            if (n.enabled !== false) {
                if (A.length === 0) {
                    if ((t = n.domElement) != null) {
                        t.ownerDocument.addEventListener("pointermove", G);
                    }
                    if ((r = n.domElement) != null) {
                        r.ownerDocument.addEventListener("pointerup", Q);
                    }
                }
                i = e;
                A.push(i);
                if (e.pointerType === "touch") {
                    ((e)=>{
                        en(e);
                        switch(A.length){
                            case 1:
                                switch(n.touches.ONE){
                                    case wtR.ROTATE:
                                        if (n.enableRotate === false) {
                                            return;
                                        }
                                        V();
                                        s = l.TOUCH_ROTATE;
                                        break;
                                    case wtR.PAN:
                                        if (n.enablePan === false) {
                                            return;
                                        }
                                        B();
                                        s = l.TOUCH_PAN;
                                        break;
                                    default:
                                        s = l.NONE;
                                }
                                break;
                            case 2:
                                switch(n.touches.TWO){
                                    case wtR.DOLLY_PAN:
                                        if (n.enableZoom === false && n.enablePan === false) {
                                            return;
                                        }
                                        if (n.enableZoom) {
                                            X();
                                        }
                                        if (n.enablePan) {
                                            B();
                                        }
                                        s = l.TOUCH_DOLLY_PAN;
                                        break;
                                    case wtR.DOLLY_ROTATE:
                                        if (n.enableZoom === false && n.enableRotate === false) {
                                            return;
                                        }
                                        if (n.enableZoom) {
                                            X();
                                        }
                                        if (n.enableRotate) {
                                            V();
                                        }
                                        s = l.TOUCH_DOLLY_ROTATE;
                                        break;
                                    default:
                                        s = l.NONE;
                                }
                                break;
                            default:
                                s = l.NONE;
                        }
                        if (s !== l.NONE) {
                            n.dispatchEvent(o);
                        }
                    })(e);
                } else {
                    ((e)=>{
                        let t;
                        switch(e.button){
                            case 0:
                                t = n.mouseButtons.LEFT;
                                break;
                            case 1:
                                t = n.mouseButtons.MIDDLE;
                                break;
                            case 2:
                                t = n.mouseButtons.RIGHT;
                                break;
                            default:
                                t = -1;
                        }
                        switch(t){
                            case kBv.DOLLY:
                                if (n.enableZoom === false) {
                                    return;
                                }
                                Y(e);
                                O.set(e.clientX, e.clientY);
                                s = l.DOLLY;
                                break;
                            case kBv.ROTATE:
                                if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                    if (n.enablePan === false) {
                                        return;
                                    }
                                    U(e);
                                    s = l.PAN;
                                } else {
                                    if (n.enableRotate === false) {
                                        return;
                                    }
                                    q(e);
                                    s = l.ROTATE;
                                }
                                break;
                            case kBv.PAN:
                                if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                    if (n.enableRotate === false) {
                                        return;
                                    }
                                    q(e);
                                    s = l.ROTATE;
                                } else {
                                    if (n.enablePan === false) {
                                        return;
                                    }
                                    U(e);
                                    s = l.PAN;
                                }
                                break;
                            default:
                                s = l.NONE;
                        }
                        if (s !== l.NONE) {
                            n.dispatchEvent(o);
                        }
                    })(e);
                }
            }
        }
        function G(e) {
            if (n.enabled !== false) {
                if (e.pointerType === "touch") {
                    ((e)=>{
                        en(e);
                        switch(s){
                            case l.TOUCH_ROTATE:
                                if (n.enableRotate === false) {
                                    return;
                                }
                                Z(e);
                                n.update();
                                break;
                            case l.TOUCH_PAN:
                                if (n.enablePan === false) {
                                    return;
                                }
                                W(e);
                                n.update();
                                break;
                            case l.TOUCH_DOLLY_PAN:
                                if (n.enableZoom === false && n.enablePan === false) {
                                    return;
                                }
                                if (n.enableZoom) {
                                    K(e);
                                }
                                if (n.enablePan) {
                                    W(e);
                                }
                                n.update();
                                break;
                            case l.TOUCH_DOLLY_ROTATE:
                                if (n.enableZoom === false && n.enableRotate === false) {
                                    return;
                                }
                                if (n.enableZoom) {
                                    K(e);
                                }
                                if (n.enableRotate) {
                                    Z(e);
                                }
                                n.update();
                                break;
                            default:
                                s = l.NONE;
                        }
                    })(e);
                } else {
                    ((e)=>{
                        if (n.enabled !== false) {
                            switch(s){
                                case l.ROTATE:
                                    if (n.enableRotate === false) {
                                        return;
                                    }
                                    w.set(e.clientX, e.clientY);
                                    j.subVectors(w, y).multiplyScalar(n.rotateSpeed);
                                    let t = n.domElement;
                                    if (t) {
                                        L(2 * Math.PI * j.x / t.clientHeight);
                                        R(2 * Math.PI * j.y / t.clientHeight);
                                    }
                                    y.copy(w);
                                    n.update();
                                    break;
                                case l.DOLLY:
                                    let r;
                                    let o;
                                    if (n.enableZoom === false) {
                                        return;
                                    }
                                    x.set(e.clientX, e.clientY);
                                    M.subVectors(x, O);
                                    if (M.y > 0) {
                                        r = I();
                                        H(b / r);
                                    } else if (M.y < 0) {
                                        o = I();
                                        H(b * o);
                                    }
                                    O.copy(x);
                                    n.update();
                                    break;
                                case l.PAN:
                                    if (n.enablePan === false) {
                                        return;
                                    }
                                    P.set(e.clientX, e.clientY);
                                    C.subVectors(P, E).multiplyScalar(n.panSpeed);
                                    N(C.x, C.y);
                                    E.copy(P);
                                    n.update();
                            }
                        }
                    })(e);
                }
            }
        }
        function Q(e) {
            let t;
            let r;
            let o;
            ((e)=>{
                delete _[e.pointerId];
                for(let t = 0; t < A.length; t++){
                    if (A[t].pointerId == e.pointerId) {
                        return void A.splice(t, 1);
                    }
                }
            })(e);
            if (A.length === 0) {
                if ((t = n.domElement) != null) {
                    t.releasePointerCapture(e.pointerId);
                }
                if ((r = n.domElement) != null) {
                    r.ownerDocument.removeEventListener("pointermove", G);
                }
                if ((o = n.domElement) != null) {
                    o.ownerDocument.removeEventListener("pointerup", Q);
                }
            }
            n.dispatchEvent(i);
            s = l.NONE;
        }
        function J(e) {
            if (n.enabled !== false && n.enableZoom !== false && (s === l.NONE || s === l.ROTATE)) {
                let t;
                let r;
                e.preventDefault();
                n.dispatchEvent(o);
                Y(e);
                if (e.deltaY < 0) {
                    t = I();
                    H(b * t);
                } else if (e.deltaY > 0) {
                    r = I();
                    H(b / r);
                }
                n.update();
                n.dispatchEvent(i);
            }
        }
        function ee(e) {
            if (n.enabled !== false && n.enablePan !== false) {
                let t = false;
                switch(e.code){
                    case n.keys.UP:
                        N(0, n.keyPanSpeed);
                        t = true;
                        break;
                    case n.keys.BOTTOM:
                        N(0, -n.keyPanSpeed);
                        t = true;
                        break;
                    case n.keys.LEFT:
                        N(n.keyPanSpeed, 0);
                        t = true;
                        break;
                    case n.keys.RIGHT:
                        N(-n.keyPanSpeed, 0);
                        t = true;
                }
                if (t) {
                    e.preventDefault();
                    n.update();
                }
            }
        }
        function et(e) {
            if (n.enabled !== false) {
                e.preventDefault();
            }
        }
        function en(e) {
            let t = _[e.pointerId];
            if (t === undefined) {
                t = new I9Y;
                _[e.pointerId] = t;
            }
            t.set(e.pageX, e.pageY);
        }
        function er(e) {
            return _[(e.pointerId === A[0].pointerId ? A[1] : A[0]).pointerId];
        }
        this.dollyIn = (e = I())=>{
            H(b * e);
            n.update();
        };
        this.dollyOut = (e = I())=>{
            H(b / e);
            n.update();
        };
        this.getScale = ()=>b;
        this.setScale = (e)=>{
            H(e);
            n.update();
        };
        this.getZoomScale = ()=>I();
        if (t !== undefined) {
            this.connect(t);
        }
        this.update();
    }
}
export let N = forwardRef(({ makeDefault, camera, regress, domElement, enableDamping = true, keyEvents = false, onChange, onStart, onEnd, ...rest }, ref)=>{
    let m = o.C((e)=>e.invalidate);
    let v = o.C((e)=>e.camera);
    let b = o.C((e)=>e.gl);
    let g = o.C((e)=>e.events);
    let y = o.C((e)=>e.setEvents);
    let w = o.C((e)=>e.set);
    let j = o.C((e)=>e.get);
    let E = o.C((e)=>e.performance);
    let P = camera || v;
    let C = domElement || g.connected || b.domElement;
    let O = useMemo(()=>new h(P), [
        P
    ]);
    o.D(()=>{
        if (O.enabled) {
            O.update();
        }
    }, -1);
    useEffect(()=>{
        if (keyEvents) {
            O.connect(keyEvents === true ? C : keyEvents);
        }
        O.connect(C);
        return ()=>void O.dispose();
    }, [
        keyEvents,
        C,
        regress,
        O,
        m
    ]);
    useEffect(()=>{
        let e = (e)=>{
            m();
            if (regress) {
                E.regress();
            }
            if (onChange) {
                onChange(e);
            }
        };
        let t = (e)=>{
            if (onStart) {
                onStart(e);
            }
        };
        let r = (e)=>{
            if (onEnd) {
                onEnd(e);
            }
        };
        O.addEventListener("change", e);
        O.addEventListener("start", t);
        O.addEventListener("end", r);
        return ()=>{
            O.removeEventListener("start", t);
            O.removeEventListener("end", r);
            O.removeEventListener("change", e);
        };
    }, [
        onChange,
        onStart,
        onEnd,
        O,
        m,
        y
    ]);
    useEffect(()=>{
        if (makeDefault) {
            let controls = j().controls;
            w({
                controls: O
            });
            return ()=>w({
                    controls
                });
        }
    }, [
        makeDefault,
        O
    ]);
    return <primitive ref={ref} object={O} enableDamping={enableDamping} {...rest}/>;
});
