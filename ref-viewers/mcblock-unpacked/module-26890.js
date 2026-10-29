export class M {
    x;
    y;
    z;
    constructor(e, t, r){
        this.x = e;
        this.y = t;
        this.z = r;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    distance(e) {
        return this.sub(e).length();
    }
    distanceSquared(e) {
        return this.sub(e).lengthSquared();
    }
    abs() {
        return new M(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
    }
    add(e) {
        return new M(this.x + e.x, this.y + e.y, this.z + e.z);
    }
    sub(e) {
        return new M(this.x - e.x, this.y - e.y, this.z - e.z);
    }
    mul(e) {
        return new M(this.x * e.x, this.y * e.y, this.z * e.z);
    }
    div(e) {
        return new M(this.x / e.x, this.y / e.y, this.z / e.z);
    }
    scale(e) {
        return new M(this.x * e, this.y * e, this.z * e);
    }
    dot(e) {
        return this.x * e.x + this.y * e.y + this.z * e.z;
    }
    cross(e) {
        let t = this.y * e.z - this.z * e.y;
        return new M(t, this.z * e.x - this.x * e.z, this.x * e.y - this.y * e.x);
    }
    normalize() {
        if (this.x == 0 && this.y == 0 && this.z == 0) {
            return this;
        }
        let e = 1 / this.length();
        return new M(this.x * e, this.y * e, this.z * e);
    }
    components() {
        return [
            this.x,
            this.y,
            this.z
        ];
    }
    toString() {
        return `[${this.x} ${this.y} ${this.z}]`;
    }
}
