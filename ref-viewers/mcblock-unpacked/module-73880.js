import { LM } from "./module-13402.js";
import { I } from "./module-992.js";
import { El, uE } from "./module-96185.js";
export let m;
(function(e) {
    e.fromJson = function e(s, i) {
        if (typeof s === "number") {
            return new t(s);
        }
        let a = LM.readObject(s) ?? {};
        let o = new r(i(a.coordinate));
        let u = LM.readArray(a.points, (e)=>LM.readObject(e) ?? {}) ?? [];
        if (u.length === 0) {
            return new t(0);
        }
        for (let t of u){
            let r = LM.readNumber(t.location) ?? 0;
            let s = e(t.value, i);
            let a = LM.readNumber(t.derivative) ?? 0;
            o.addPoint(r, s, a);
        }
        return o;
    };
    class t {
        value;
        constructor(e){
            this.value = e;
        }
        compute() {
            return this.value;
        }
        range() {
            return I.of(this.value, this.value);
        }
        mapCoordinates() {
            return this;
        }
    }
    e.Constant = t;
    class r {
        coordinate;
        locations;
        values;
        derivatives;
        constructor(e, t = [], r = [], s = []){
            this.coordinate = e;
            this.locations = t;
            this.values = r;
            this.derivatives = s;
        }
        compute(e) {
            let t = this.coordinate.compute(e);
            let r = El(0, this.locations.length, (e)=>t < this.locations[e]) - 1;
            let s = this.locations.length - 1;
            if (r < 0) {
                return Math.fround(this.values[0].compute(e) + Math.fround(this.derivatives[0] * Math.fround(t - this.locations[0])));
            }
            if (r === s) {
                return Math.fround(this.values[s].compute(e) + Math.fround(this.derivatives[s] * Math.fround(t - this.locations[s])));
            }
            let n = this.locations[r];
            let i = this.locations[r + 1];
            let o = this.derivatives[r];
            let u = this.derivatives[r + 1];
            let c = Math.fround(Math.fround(t - n) / Math.fround(i - n));
            let h = this.values[r].compute(e);
            let l = this.values[r + 1].compute(e);
            let d = Math.fround(Math.fround(o * Math.fround(i - n)) - Math.fround(l - h));
            let f = Math.fround(Math.fround(-u * Math.fround(i - n)) + Math.fround(l - h));
            return Math.fround(uE(c, h, l) + Math.fround(Math.fround(c * Math.fround(1 - c)) * uE(c, d, f)));
        }
        mapCoordinates(e) {
            return new r(e(this.coordinate), this.locations, this.values.map((t)=>t.mapCoordinates(e)), this.derivatives);
        }
        addPoint(t, r, s = 0) {
            this.locations.push(Math.fround(t));
            this.values.push(typeof r === "number" ? new e.Constant(Math.fround(r)) : r);
            this.derivatives.push(Math.fround(s));
            return this;
        }
        range() {
            let e = this.locations.length - 1;
            let t = Infinity;
            let s = -Infinity;
            let n = this.coordinate.range();
            if (n.isNaI()) {
                return n;
            }
            if (n.min < this.locations[0]) {
                let e = this.values[0].range();
                let n = r.linearExtend(e.min, this.locations, e.min, this.derivatives, 0);
                let i = r.linearExtend(e.min, this.locations, e.min, this.derivatives, 0);
                t = Math.min(t, Math.min(n, i));
                s = Math.max(s, Math.max(n, i));
            }
            if (n.max > this.locations[e]) {
                let n = this.values[e].range();
                let i = r.linearExtend(n.max, this.locations, n.min, this.derivatives, e);
                let a = r.linearExtend(n.max, this.locations, n.max, this.derivatives, e);
                t = Math.min(t, Math.min(i, a));
                s = Math.max(s, Math.max(i, a));
            }
            let a = this.values.map((e)=>e.range());
            for (let e of a){
                t = Math.min(t, e.min);
                s = Math.max(s, e.max);
            }
            for(let o = 0; o < e; ++o){
                let e = this.locations[o];
                let r = Math.fround(this.locations[o + 1] - e);
                let n = a[o];
                let i = a[o + 1];
                let u = this.derivatives[o];
                let c = this.derivatives[o + 1];
                if (u !== 0 || c !== 0) {
                    let e = Math.fround(u * r);
                    let a = Math.fround(c * r);
                    let o = Math.min(n.min, i.min);
                    let h = Math.max(n.max, i.max);
                    let l = Math.fround(Math.fround(e - i.max) + n.min);
                    let d = Math.fround(Math.fround(e - i.min) + n.max);
                    let f = Math.fround(Math.fround(-a + i.min) - n.max);
                    let m = Math.max(d, Math.fround(Math.fround(-a + i.max) - n.min));
                    t = Math.min(t, Math.fround(o + Math.fround(0.25 * Math.min(l, f))));
                    s = Math.max(s, Math.fround(h + Math.fround(0.25 * m)));
                }
            }
            return I.of(t, s);
        }
        static linearExtend(e, t, r, s, n) {
            let i = s[n];
            if (i == 0) {
                return r;
            }
            return Math.fround(r + Math.fround(i * Math.fround(e - t[n])));
        }
    }
    e.MultiPoint = r;
})(m = m || (m = {}));
