import { I } from "./module-992.js";
import { Ew, TF, nX, t$, y8 } from "./module-96185.js";
import { LM } from "./module-13402.js";
class n {
    layers;
    _range;
    constructor(e){
        this.layers = e;
        let t = I.ofExact(0);
        for (let r of e){
            let e = I.mul(r.noise.range(), I.ofExact(r.amplitude));
            t = I.add(t, e);
        }
        this._range = t;
    }
    range() {
        return this._range;
    }
    get2D(e, t) {
        let r = 0;
        for (let s of this.layers){
            r += s.amplitude * s.noise.get2D(e * s.frequency, t * s.frequency);
        }
        return r;
    }
    get3D(e, t, r) {
        let s = 0;
        for (let n of this.layers){
            s += n.amplitude * n.noise.get3D(e * n.frequency, t * n.frequency, r * n.frequency);
        }
        return s;
    }
}
class a {
    static GRADIENT = [
        [
            1,
            1,
            0
        ],
        [
            -1,
            1,
            0
        ],
        [
            1,
            -1,
            0
        ],
        [
            -1,
            -1,
            0
        ],
        [
            1,
            0,
            1
        ],
        [
            -1,
            0,
            1
        ],
        [
            1,
            0,
            -1
        ],
        [
            -1,
            0,
            -1
        ],
        [
            0,
            1,
            1
        ],
        [
            0,
            -1,
            1
        ],
        [
            0,
            1,
            -1
        ],
        [
            0,
            -1,
            -1
        ],
        [
            1,
            1,
            0
        ],
        [
            0,
            -1,
            1
        ],
        [
            -1,
            1,
            0
        ],
        [
            0,
            -1,
            -1
        ]
    ];
    perms;
    offsetX;
    offsetY;
    offsetZ;
    constructor(e, t = 256){
        this.offsetX = e.nextDouble() * t;
        this.offsetY = e.nextDouble() * t;
        this.offsetZ = e.nextDouble() * t;
        this.perms = Array(256);
        for(let e = 0; e < 256; e += 1){
            this.perms[e] = e;
        }
        for(let t = 0; t < 256; t += 1){
            let r = e.nextInt(256 - t);
            let s = this.perms[t];
            this.perms[t] = this.perms[t + r];
            this.perms[t + r] = s;
        }
    }
    permute(e) {
        return 255 & this.perms[255 & e];
    }
    static wrap(e) {
        return e - 33554432 * t$(e / 33554432 + 0.5);
    }
    static gradDot(e, t, r, s) {
        let n = a.GRADIENT[15 & e];
        return n[0] * t + n[1] * r + n[2] * s;
    }
}
class o extends a {
    static RANGE = I.ofSymmetric(2);
    static STANDARD_DEVIATION = 0.2702247831245211;
    constructor(e){
        super(e);
    }
    range() {
        return o.RANGE;
    }
    get2D(e, t) {
        return this.get3D(a.wrap(e), 0, a.wrap(t));
    }
    get3D(e, t, r) {
        let s = a.wrap(e) + this.offsetX;
        let n = a.wrap(t) + this.offsetY;
        let o = a.wrap(r) + this.offsetZ;
        let u = y8(s);
        let c = y8(n);
        let h = y8(o);
        let l = s - u;
        let d = n - c;
        let f = o - h;
        return this.sampleAndLerp(u, c, h, l, d, f, d);
    }
    sampleAndLerp(e, t, r, s, n, o, u) {
        let c = this.permute(e);
        let h = this.permute(e + 1);
        let l = this.permute(c + t);
        let d = this.permute(c + t + 1);
        let f = this.permute(h + t);
        let m = this.permute(h + t + 1);
        let p = a.gradDot(this.permute(l + r), s, n, o);
        let g = a.gradDot(this.permute(f + r), s - 1, n, o);
        let x = a.gradDot(this.permute(d + r), s, n - 1, o);
        let w = a.gradDot(this.permute(m + r), s - 1, n - 1, o);
        let v = a.gradDot(this.permute(l + r + 1), s, n, o - 1);
        let b = a.gradDot(this.permute(f + r + 1), s - 1, n, o - 1);
        let y = a.gradDot(this.permute(d + r + 1), s, n - 1, o - 1);
        let _ = a.gradDot(this.permute(m + r + 1), s - 1, n - 1, o - 1);
        let M = TF(s);
        let S = TF(u);
        let I = TF(o);
        return nX(M, S, I, p, g, x, w, v, b, y, _);
    }
}
let c = [
    "disabled",
    "enabled",
    "legacy"
];
export class ob {
    baseAmplitude;
    baseOctave;
    octaveCount;
    normalize;
    amplitudeModifiers;
    static INPUT_FACTOR = 1.0181268882175227;
    static TARGET_DEVIATION = 0.3333333333333333;
    octaves;
    normalizationFactor;
    range;
    constructor(e, t, r, n, i){
        this.baseAmplitude = e;
        this.baseOctave = t;
        this.octaveCount = r;
        this.normalize = n;
        this.amplitudeModifiers = i;
        this.octaves = ob.buildOctaves(e, t, r, n != "disabled", i);
        let a = this.octaves.reduce((acc, octave)=>acc + Math.abs(octave.amplitude), 0);
        let o = ob.computeNormalizationFactor(a, this.octaves);
        if (n == "legacy" && o != 0) {
            let t = ob.computeParityNormalizationFactor(e, r, i);
            a *= t / o;
            o = t;
        }
        this.normalizationFactor = o;
        this.range = I.ofSymmetric(a * ob.TARGET_DEVIATION * 6);
    }
    create(e) {
        let t = e.forkPositional();
        let r = e.forkPositional();
        let s = [];
        for (let e of this.octaves){
            let n = `octave_${e.index}`;
            let i = new o(t.fromHashOf(n));
            let a = new o(r.fromHashOf(n));
            let amplitude = this.normalizationFactor * e.amplitude;
            s.push({
                noise: i,
                frequency: e.frequency,
                amplitude
            });
            s.push({
                noise: a,
                frequency: e.frequency * ob.INPUT_FACTOR,
                amplitude
            });
        }
        return new n(s);
    }
    createForLegacyNetherBiome(e) {
        let amplitudeModifiers = this.amplitudeModifiers;
        if (amplitudeModifiers.length === 0) {
            amplitudeModifiers = Array(this.octaveCount).fill(1);
        }
        let r = ob.createLegacyNoiseLayers(e, this.baseOctave, amplitudeModifiers);
        let s = ob.createLegacyNoiseLayers(e, this.baseOctave, amplitudeModifiers);
        let i = this.normalizationFactor * this.baseAmplitude;
        return new n([
            ...r.map((e)=>({
                    ...e,
                    amplitude: e.amplitude * i
                })),
            ...s.map((e)=>({
                    ...e,
                    frequency: e.frequency * ob.INPUT_FACTOR,
                    amplitudes: e.amplitude * i
                }))
        ]);
    }
    static createLegacyNoiseLayers(e, t, r) {
        let r_length = r.length;
        let n = -t;
        let i = Array(r_length).fill(undefined);
        let a = new o(e);
        if (n >= 0 && n < r_length && r[n] != 0) {
            i[n] = a;
        }
        for(let t = n - 1; t >= 0; t -= 1){
            if (t < r_length && r[t] != 0) {
                i[t] = new o(e);
            } else {
                e.consume(262);
            }
        }
        let u = 2 ** -n;
        let amplitude = 2 ** (r_length - 1) / (2 ** r_length - 1);
        let h = [];
        for(let e = 0; e < i.length; e += 1){
            let t = i[e];
            if (t != undefined) {
                h.push({
                    noise: t,
                    frequency: u,
                    amplitude
                });
            }
            u *= 2;
            amplitude /= 2;
        }
        return h;
    }
    static computeParityNormalizationFactor(e, t, r) {
        let s = Infinity;
        let n = -Infinity;
        for(let e = 0; e < t; e += 1){
            if ((r[e] ?? 1) != 0) {
                s = Math.min(s, e);
                n = Math.max(n, e);
            }
        }
        let i = 0.1 * (1 + 1 / (n - s + 1));
        return 0.5 * e * ob.TARGET_DEVIATION / i;
    }
    static computeNormalizationFactor(e, t) {
        let r = 0;
        for (let e of t){
            r += Ew(0.2702247831245211 * Math.abs(e.amplitude));
        }
        let s = Math.sqrt(r);
        if (s === 0) {
            return 0;
        }
        return e * ob.TARGET_DEVIATION / (s * Math.sqrt(2));
    }
    static buildOctaves(e, t, r, s, n) {
        let i = 2 ** t;
        let a = e;
        if (s) {
            a *= 0.5 ** -(r - 1) / (0.5 ** -r - 1);
        }
        let o = [];
        for(let e = 0; e < r; e += 1){
            let r = n[e] ?? 1;
            if (r != 0) {
                o.push({
                    index: t + e,
                    frequency: i,
                    amplitude: a * r
                });
            }
            i *= 2;
            a *= 0.5;
        }
        return o;
    }
    static fromJson(e) {
        let t = LM.readObject(e) ?? {};
        let r = typeof t.normalize === "boolean" ? t.normalize ? "enabled" : "disabled" : t.normalize ? LM.readEnum(t.normalize, c) : "enabled";
        return new ob(LM.readNumber(t.base_amplitude) ?? 1, LM.readInt(t.base_octave) ?? 0, LM.readInt(t.octave_count) ?? 1, r, LM.readArray(t.amplitude_modifiers, (e)=>LM.readNumber(e) ?? 0) ?? []);
    }
}
export class hc extends a {
    static RANGE = I.ofSymmetric(2);
    static STANDARD_DEVIATION = 0.42544;
    static F2 = 0.5 * (Math.sqrt(3) - 1);
    static G2 = (3 - Math.sqrt(3)) / 6;
    constructor(e, t){
        super(e, t ? 0 : undefined);
    }
    range() {
        return hc.RANGE;
    }
    get2D(e, t) {
        let r;
        let s;
        let n = e + this.offsetX;
        let a = t + this.offsetY;
        let o = (n + a) * hc.F2;
        let u = y8(n + o);
        let c = y8(a + o);
        let h = (u + c) * hc.G2;
        let d = n - (u - h);
        let f = a - (c - h);
        if (d > f) {
            r = 1;
            s = 0;
        } else {
            r = 0;
            s = 1;
        }
        let m = d - r + hc.G2;
        let p = f - s + hc.G2;
        let g = d - 1 + 2 * hc.G2;
        let x = f - 1 + 2 * hc.G2;
        let w = 255 & u;
        let v = 255 & c;
        let b = this.permute(w + this.permute(v)) % 12;
        let y = this.permute(w + r + this.permute(v + s)) % 12;
        let _ = this.permute(w + 1 + this.permute(v + 1)) % 12;
        let M = this.getCornerNoise3D(b, d, f, 0, 0.5);
        return 70 * (M + this.getCornerNoise3D(y, m, p, 0, 0.5) + this.getCornerNoise3D(_, g, x, 0, 0.5));
    }
    get3D(e, t, r) {
        let s;
        let n;
        let a;
        let o;
        let u;
        let c;
        let h = e + this.offsetX;
        let l = t + this.offsetY;
        let d = r + this.offsetZ;
        let f = (h + l + d) * 0.3333333333333333;
        let m = y8(h + f);
        let p = y8(l + f);
        let g = y8(d + f);
        let x = (m + p + g) * 0.16666666666666666;
        let w = h - (m - x);
        let v = l - (p - x);
        let b = d - (g - x);
        if (w >= v) {
            if (v >= b) {
                s = 1;
                n = 0;
                a = 0;
                o = 1;
                u = 1;
                c = 0;
            } else {
                if (w >= b) {
                    s = 1;
                    n = 0;
                    a = 0;
                } else {
                    s = 0;
                    n = 0;
                    a = 1;
                }
                o = 1;
                u = 0;
                c = 1;
            }
        } else if (v < b) {
            s = 0;
            n = 0;
            a = 1;
            o = 0;
            u = 1;
            c = 1;
        } else if (w < b) {
            s = 0;
            n = 1;
            a = 0;
            o = 0;
            u = 1;
            c = 1;
        } else {
            s = 0;
            n = 1;
            a = 0;
            o = 1;
            u = 1;
            c = 0;
        }
        let y = w - s + 0.16666666666666666;
        let _ = v - n + 0.16666666666666666;
        let M = b - a + 0.16666666666666666;
        let S = w - o + 0.3333333333333333;
        let I = v - u + 0.3333333333333333;
        let L = b - c + 0.3333333333333333;
        let E = 255 & m;
        let N = 255 & p;
        let T = 255 & g;
        let A = this.permute(E + this.permute(N + this.permute(T))) % 12;
        let R = this.permute(E + s + this.permute(N + n + this.permute(T + a))) % 12;
        let k = this.permute(E + o + this.permute(N + u + this.permute(T + c))) % 12;
        let B = this.permute(E + 1 + this.permute(N + 1 + this.permute(T + 1))) % 12;
        let C = this.getCornerNoise3D(A, w, v, b, 0.6);
        let O = this.getCornerNoise3D(R, y, _, M, 0.6);
        return 32 * (C + O + this.getCornerNoise3D(k, S, I, L, 0.6) + this.getCornerNoise3D(B, w - 0.5, v - 0.5, b - 0.5, 0.6));
    }
    getCornerNoise3D(e, t, r, s, n) {
        let i;
        let a = n - t * t - r * r - s * s;
        if (a < 0) {
            i = 0;
        } else {
            a *= a;
            i = a * a * hc.gradDot(e, t, r, s);
        }
        return i;
    }
}
