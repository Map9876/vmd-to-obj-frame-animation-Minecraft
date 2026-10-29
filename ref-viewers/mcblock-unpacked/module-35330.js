import { CmU, LuO, NRn, Pq0, XJ7, eHs, iyt, qtW } from "./module-85339.js";
let a = new NRn;
let r = new Pq0;
export class n extends CmU {
    constructor(){
        super();
        this.isLineSegmentsGeometry = true;
        this.type = "LineSegmentsGeometry";
        this.setIndex([
            0,
            2,
            1,
            2,
            3,
            1,
            2,
            4,
            3,
            4,
            5,
            3,
            4,
            6,
            5,
            6,
            7,
            5
        ]);
        this.setAttribute("position", new qtW([
            -1,
            2,
            0,
            1,
            2,
            0,
            -1,
            1,
            0,
            1,
            1,
            0,
            -1,
            0,
            0,
            1,
            0,
            0,
            -1,
            -1,
            0,
            1,
            -1,
            0
        ], 3));
        this.setAttribute("uv", new qtW([
            -1,
            2,
            1,
            2,
            -1,
            1,
            1,
            1,
            -1,
            -1,
            1,
            -1,
            -1,
            -2,
            1,
            -2
        ], 2));
    }
    applyMatrix4(e) {
        let instanceStart = this.attributes.instanceStart;
        let instanceEnd = this.attributes.instanceEnd;
        if (instanceStart !== undefined) {
            instanceStart.applyMatrix4(e);
            instanceEnd.applyMatrix4(e);
            instanceStart.needsUpdate = true;
        }
        if (this.boundingBox !== null) {
            this.computeBoundingBox();
        }
        if (this.boundingSphere !== null) {
            this.computeBoundingSphere();
        }
        return this;
    }
    setPositions(e) {
        let t;
        if (e instanceof Float32Array) {
            t = e;
        } else if (Array.isArray(e)) {
            t = new Float32Array(e);
        }
        let i = new LuO(t, 6, 1);
        this.setAttribute("instanceStart", new eHs(i, 3, 0));
        this.setAttribute("instanceEnd", new eHs(i, 3, 3));
        this.instanceCount = this.attributes.instanceStart.count;
        this.computeBoundingBox();
        this.computeBoundingSphere();
        return this;
    }
    setColors(e) {
        let t;
        if (e instanceof Float32Array) {
            t = e;
        } else if (Array.isArray(e)) {
            t = new Float32Array(e);
        }
        let i = new LuO(t, 6, 1);
        this.setAttribute("instanceColorStart", new eHs(i, 3, 0));
        this.setAttribute("instanceColorEnd", new eHs(i, 3, 3));
        return this;
    }
    fromWireframeGeometry(e) {
        this.setPositions(e.attributes.position.array);
        return this;
    }
    fromEdgesGeometry(e) {
        this.setPositions(e.attributes.position.array);
        return this;
    }
    fromMesh(e) {
        this.fromWireframeGeometry(new XJ7(e.geometry));
        return this;
    }
    fromLineSegments({ geometry }) {
        this.setPositions(geometry.attributes.position.array);
        return this;
    }
    computeBoundingBox() {
        if (this.boundingBox === null) {
            this.boundingBox = new NRn;
        }
        let instanceStart = this.attributes.instanceStart;
        let instanceEnd = this.attributes.instanceEnd;
        if (instanceStart !== undefined && instanceEnd !== undefined) {
            this.boundingBox.setFromBufferAttribute(instanceStart);
            a.setFromBufferAttribute(instanceEnd);
            this.boundingBox.union(a);
        }
    }
    computeBoundingSphere() {
        if (this.boundingSphere === null) {
            this.boundingSphere = new iyt;
        }
        if (this.boundingBox === null) {
            this.computeBoundingBox();
        }
        let instanceStart = this.attributes.instanceStart;
        let instanceEnd = this.attributes.instanceEnd;
        if (instanceStart !== undefined && instanceEnd !== undefined) {
            let i = this.boundingSphere.center;
            this.boundingBox.getCenter(i);
            let n = 0;
            for(let a = 0, s = instanceStart.count; a < s; a++){
                r.fromBufferAttribute(instanceStart, a);
                n = Math.max(n, i.distanceToSquared(r));
                r.fromBufferAttribute(instanceEnd, a);
                n = Math.max(n, i.distanceToSquared(r));
            }
            this.boundingSphere.radius = Math.sqrt(n);
            if (isNaN(this.boundingSphere.radius)) {
                console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
            }
        }
    }
    toJSON() {}
}
