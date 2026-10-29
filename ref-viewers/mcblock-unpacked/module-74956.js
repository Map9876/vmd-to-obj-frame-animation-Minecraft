import { IUQ, LuO, NRn, Pq0, cZY, cj9, eHs, eaF, iyt, kn4 } from "./module-85339.js";
import { n as n_1 } from "./module-35330.js";
import { G } from "./module-473.js";
let n;
let a;
let l = new IUQ;
let d = new Pq0;
let c = new Pq0;
let u = new IUQ;
let f = new IUQ;
let p = new IUQ;
let h = new Pq0;
let m = new kn4;
let v = new cZY;
let y = new Pq0;
let g = new NRn;
let w = new iyt;
let S = new IUQ;
function x(e, t, resolution) {
    S.set(0, 0, -t, 1).applyMatrix4(e.projectionMatrix);
    S.multiplyScalar(1 / S.w);
    S.x = a / resolution.width;
    S.y = a / resolution.height;
    S.applyMatrix4(e.projectionMatrixInverse);
    S.multiplyScalar(1 / S.w);
    return Math.abs(Math.max(S.x, S.y));
}
class b extends eaF {
    constructor(e = new n_1, t = new G({
        color: 16777215 * Math.random()
    })){
        super(e, t);
        this.isLineSegments2 = true;
        this.type = "LineSegments2";
    }
    computeLineDistances() {
        let geometry = this.geometry;
        let instanceStart = geometry.attributes.instanceStart;
        let instanceEnd = geometry.attributes.instanceEnd;
        let n = new Float32Array(2 * instanceStart.count);
        for(let e = 0, a = 0, r = instanceStart.count; e < r; e++, a += 2){
            d.fromBufferAttribute(instanceStart, e);
            c.fromBufferAttribute(instanceEnd, e);
            n[a] = a === 0 ? 0 : n[a - 1];
            n[a + 1] = n[a] + d.distanceTo(c);
        }
        let a = new LuO(n, 2, 1);
        geometry.setAttribute("instanceDistanceStart", new eHs(a, 1, 0));
        geometry.setAttribute("instanceDistanceEnd", new eHs(a, 1, 1));
        return this;
    }
    raycast(e, t) {
        let i;
        let s;
        let worldUnits = this.material.worldUnits;
        let e_camera = e.camera;
        if (!(e_camera !== null || worldUnits)) {
            console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');
        }
        let d = e.params.Line2 !== undefined && e.params.Line2.threshold || 0;
        n = e.ray;
        let matrixWorld = this.matrixWorld;
        let geometry = this.geometry;
        let material = this.material;
        a = material.linewidth + d;
        if (geometry.boundingSphere === null) {
            geometry.computeBoundingSphere();
        }
        w.copy(geometry.boundingSphere).applyMatrix4(matrixWorld);
        if (worldUnits) {
            i = 0.5 * a;
        } else {
            let e = Math.max(e_camera.near, w.distanceToPoint(n.origin));
            i = x(e_camera, e, material.resolution);
        }
        w.radius += i;
        if (n.intersectsSphere(w) !== false) {
            if (geometry.boundingBox === null) {
                geometry.computeBoundingBox();
            }
            g.copy(geometry.boundingBox).applyMatrix4(matrixWorld);
            if (worldUnits) {
                s = 0.5 * a;
            } else {
                let e = Math.max(e_camera.near, g.distanceToPoint(n.origin));
                s = x(e_camera, e, material.resolution);
            }
            g.expandByScalar(s);
            if (n.intersectsBox(g) !== false) {
                if (worldUnits) {
                    ((e, t)=>{
                        let e_matrixWorld = e.matrixWorld;
                        let e_geometry = e.geometry;
                        let instanceStart = e_geometry.attributes.instanceStart;
                        let instanceEnd = e_geometry.attributes.instanceEnd;
                        let d = Math.min(e_geometry.instanceCount, instanceStart.count);
                        for(let s = 0; s < d; s++){
                            v.start.fromBufferAttribute(instanceStart, s);
                            v.end.fromBufferAttribute(instanceEnd, s);
                            v.applyMatrix4(e_matrixWorld);
                            let d = new Pq0;
                            let c = new Pq0;
                            n.distanceSqToSegment(v.start, v.end, c, d);
                            if (c.distanceTo(d) < 0.5 * a) {
                                t.push({
                                    point: c,
                                    pointOnLine: d,
                                    distance: n.origin.distanceTo(c),
                                    object: e,
                                    face: null,
                                    faceIndex: s,
                                    uv: null,
                                    uv1: null
                                });
                            }
                        }
                    })(this, t);
                } else {
                    ((e, e_camera_1, i)=>{
                        let t_projectionMatrix = e_camera_1.projectionMatrix;
                        let resolution = e.material.resolution;
                        let e_matrixWorld = e.matrixWorld;
                        let e_geometry = e.geometry;
                        let instanceStart = e_geometry.attributes.instanceStart;
                        let instanceEnd = e_geometry.attributes.instanceEnd;
                        let w = Math.min(e_geometry.instanceCount, instanceStart.count);
                        let S = -e_camera_1.near;
                        n.at(1, p);
                        p.w = 1;
                        p.applyMatrix4(e_camera_1.matrixWorldInverse);
                        p.applyMatrix4(t_projectionMatrix);
                        p.multiplyScalar(1 / p.w);
                        p.x *= resolution.x / 2;
                        p.y *= resolution.y / 2;
                        p.z = 0;
                        h.copy(p);
                        m.multiplyMatrices(e_camera_1.matrixWorldInverse, e_matrixWorld);
                        for(let t = 0; t < w; t++){
                            u.fromBufferAttribute(instanceStart, t);
                            f.fromBufferAttribute(instanceEnd, t);
                            u.w = 1;
                            f.w = 1;
                            u.applyMatrix4(m);
                            f.applyMatrix4(m);
                            if (u.z > S && f.z > S) {
                                continue;
                            }
                            if (u.z > S) {
                                let e = u.z - f.z;
                                let t = (u.z - S) / e;
                                u.lerp(f, t);
                            } else if (f.z > S) {
                                let e = f.z - u.z;
                                let t = (f.z - S) / e;
                                f.lerp(u, t);
                            }
                            u.applyMatrix4(t_projectionMatrix);
                            f.applyMatrix4(t_projectionMatrix);
                            u.multiplyScalar(1 / u.w);
                            f.multiplyScalar(1 / f.w);
                            u.x *= resolution.x / 2;
                            u.y *= resolution.y / 2;
                            f.x *= resolution.x / 2;
                            f.y *= resolution.y / 2;
                            v.start.copy(u);
                            v.start.z = 0;
                            v.end.copy(f);
                            v.end.z = 0;
                            let d = v.closestPointToPointParameter(h, true);
                            v.at(d, y);
                            let p = cj9.lerp(u.z, f.z, d);
                            let w = p >= -1 && p <= 1;
                            let x = h.distanceTo(y) < 0.5 * a;
                            if (w && x) {
                                v.start.fromBufferAttribute(instanceStart, t);
                                v.end.fromBufferAttribute(instanceEnd, t);
                                v.start.applyMatrix4(e_matrixWorld);
                                v.end.applyMatrix4(e_matrixWorld);
                                let a = new Pq0;
                                let s = new Pq0;
                                n.distanceSqToSegment(v.start, v.end, s, a);
                                i.push({
                                    point: s,
                                    pointOnLine: a,
                                    distance: n.origin.distanceTo(s),
                                    object: e,
                                    face: null,
                                    faceIndex: t,
                                    uv: null,
                                    uv1: null
                                });
                            }
                        }
                    })(this, e_camera, t);
                }
            }
        }
    }
    onBeforeRender(e) {
        let uniforms = this.material.uniforms;
        if (uniforms && uniforms.resolution) {
            e.getViewport(l);
            this.material.uniforms.resolution.value.set(l.z, l.w);
        }
    }
}
export { b };
