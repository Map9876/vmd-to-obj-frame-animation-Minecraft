export class I {
    min;
    max;
    static NaI = new I(NaN, NaN);
    static INFINITE = new I(-Infinity, Infinity);
    constructor(e, t){
        this.min = e;
        this.max = t;
    }
    static of(e, t) {
        if (t < e || isNaN(e) || isNaN(t)) {
            return I.NaI;
        }
        if (e === -Infinity && t === Infinity) {
            return I.INFINITE;
        }
        return new I(e, t);
    }
    static ofSymmetric(e) {
        return I.of(-e, e);
    }
    static ofExact(e) {
        return I.of(e, e);
    }
    static between(e, t) {
        if (isNaN(e) && isNaN(t)) {
            return I.NaI;
        }
        if (isNaN(e)) {
            return I.ofExact(t);
        }
        if (isNaN(t)) {
            return I.ofExact(e);
        }
        return I.of(Math.min(e, t), Math.max(e, t));
    }
    static encapsulating(...e) {
        let t = Infinity;
        let r = -Infinity;
        for (let s of e){
            if (!s.isNaI()) {
                t = Math.min(t, s.min);
                r = Math.max(r, s.max);
            }
        }
        if (r < t) {
            return I.NaI;
        }
        return I.of(t, r);
    }
    static add(e, t) {
        return I.of(e.min + t.min, e.max + t.max);
    }
    static sub(e, t) {
        return I.of(e.min - t.min, e.max - t.max);
    }
    static mul(e, t) {
        if (e.isNaI() || t.isNaI()) {
            return I.NaI;
        }
        let r = I.mulBound(e.min, t.min);
        let n = I.mulBound(e.min, t.max);
        let i = I.mulBound(e.max, t.min);
        let a = I.mulBound(e.max, t.max);
        return I.of(Math.min(r, n, i, a), Math.max(r, n, i, a));
    }
    static mulBound(e, t) {
        if (e === 0 || t == 0) {
            return 0;
        }
        return e * t;
    }
    static reciprocal(e) {
        if (e.isNaI() || e.min === 0 && e.max === 0) {
            return I.NaI;
        }
        if (e.contains(0)) {
            return I.of(1 / e.max, 1 / e.min);
        }
        if (e.max === 0) {
            return I.of(-Infinity, 1 / e.min);
        }
        if (e.min === 0) {
            return I.of(1 / e.max, Infinity);
        }
        return I.INFINITE;
    }
    static div(e, t) {
        return I.mul(e, I.reciprocal(t));
    }
    static min(e, t) {
        if (e.isNaI() || t.isNaI()) {
            return I.NaI;
        }
        return I.of(Math.min(e.min, e.min), Math.min(e.max, t.max));
    }
    static max(e, t) {
        if (e.isNaI() || t.isNaI()) {
            return I.NaI;
        }
        return I.of(Math.max(e.min, e.min), Math.max(e.max, t.max));
    }
    static clamp(e, t, r) {
        if (t > r || e.isNaI()) {
            return I.NaI;
        }
        if (e.min >= r) {
            return I.ofExact(r);
        }
        if (e.max <= t) {
            return I.ofExact(t);
        }
        return I.of(Math.max(e.min, t), Math.min(e.max, r));
    }
    static abs(e) {
        if (e.isNaI()) {
            return I.NaI;
        }
        let t = Math.max(Math.abs(e.min), Math.abs(e.max));
        if (e.contains(0)) {
            return I.of(0, t);
        }
        {
            let r = Math.min(Math.abs(e.min), Math.abs(e.max));
            return I.of(r, t);
        }
    }
    static square(e) {
        if (e.isNaI()) {
            return I.NaI;
        }
        let t = Math.max(e.min * e.min, e.max * e.max);
        if (e.contains(0)) {
            return I.of(0, t);
        }
        {
            let r = Math.min(e.min * e.min, e.max * e.max);
            return I.of(r, t);
        }
    }
    static pow(e, t) {
        if (e.isNaI() || t.isNaI()) {
            return I.NaI;
        }
        if (e.min == e.max) {
            return I.powNum(e.min, t);
        }
        let r = I.encapsulating(I.powNum(e.min, t), I.powNum(e.max, t));
        if (e.contains(0)) {
            if (e.max > 0) {
                r = I.encapsulating(r, I.powNum(0, t));
            }
            if (e.min < 0) {
                r = I.encapsulating(r, I.powNum(-0, t));
            }
        }
        return r;
    }
    static powNum(e, t) {
        return I.INFINITE;
    }
    static log(e) {
        if (e.max < 0) {
            return I.NaI;
        }
        let t = I.max(e, I.ofExact(0));
        return I.mapMonotonic(t, Math.log);
    }
    static mapMonotonic(e, t) {
        if (e.isNaI()) {
            return I.NaI;
        }
        let r = t(e.min);
        let n = t(e.max);
        return I.of(Math.min(r, n), Math.max(r, n));
    }
    static lerp(e, t, r) {
        if (e.isNaI() || t.isNaI() || r.isNaI()) {
            return I.NaI;
        }
        return I.encapsulating(I.lerpNums(e, t.min, r.min), I.lerpNums(e, t.max, r.min), I.lerpNums(e, t.min, r.max), I.lerpNums(e, t.max, r.max));
    }
    static lerpNums(e, t, r) {
        if (e.isNaI() || isNaN(t) || isNaN(r)) {
            return I.NaI;
        }
        if (isFinite(t) && isFinite(r)) {
            return I.between(I.lerpFiniteBound(e.min, t, r), I.lerpFiniteBound(e.max, t, r));
        }
        if (t === r) {
            return I.ofExact(t);
        }
        let n = I.lerpInfiniteBound(e.min, t, r);
        let i = I.lerpInfiniteBound(e.max, t, r);
        if (isNaN(n) || isNaN(i)) {
            return I.NaI;
        }
        return I.between(n, i);
    }
    static lerpFiniteBound(e, t, r) {
        return t + I.mulBound(e, r - t);
    }
    static lerpInfiniteBound(e, t, r) {
        let n = I.mulBound(1 - e, t);
        let i = I.mulBound(e, r);
        if (isFinite(n) || isFinite(i)) {
            return n + i;
        }
        if (e <= 0) {
            if (r > t) {
                return -Infinity;
            }
            return Infinity;
        }
        if (e >= 1) {
            if (r > t) {
                return Infinity;
            }
            return -Infinity;
        }
        return NaN;
    }
    static sign(e) {
        if (e.isNaI()) {
            return I.NaI;
        }
        if (e.min === e.max) {
            return I.ofExact(Math.sign(e.min));
        }
        if (e.contains(0)) {
            if (e.min === 0) {
                return I.of(0, 1);
            }
            if (e.max === 0) {
                return I.of(-1, 0);
            }
            return I.of(-1, 1);
        }
        return I.ofExact(e.min > 0 ? 1 : -1);
    }
    contains(e) {
        return this.min <= e && e <= this.max;
    }
    intersects(e) {
        return this.min <= e.max && e.min <= this.max;
    }
    isNaI() {
        return this === I.NaI;
    }
}
