import { IX, Lx, OR, Rd, Tm, gw, oE, pL } from "./module-45723.js";
import { Ew, IX as IX_1, MV, Mi, Tj, Vc, hc, k4, mu, ob, pT, qE, sb, uE, vz } from "./module-19023.js";
import { EB, LM } from "./module-13402.js";
import "./module-82084.js";
import { L as L_1 } from "./module-91305.js";
import { GJ, Gz } from "./module-23273.js";
let s;
var n;
let i;
let a;
let o;
let u;
let c;
let h;
let l;
let d;
((e)=>{
    function t(e) {
        return ()=>e;
    }
    function r(e) {
        return (t)=>t.minY + e;
    }
    function s(e) {
        return (t)=>t.minY + t.height - 1 - e;
    }
    function n(e) {
        return (t)=>t.seaLevel + e;
    }
    e.fromJson = function(e) {
        let i = LM.readObject(e) ?? {};
        if (i.absolute !== undefined) {
            return t(LM.readNumber(i.absolute) ?? 0);
        }
        if (i.above_bottom !== undefined) {
            return r(LM.readNumber(i.above_bottom) ?? 0);
        }
        if (i.below_top !== undefined) {
            return s(LM.readNumber(i.below_top) ?? 0);
        }
        if (i.relative_to_sea_level !== undefined) {
            return n(LM.readNumber(i.relative_to_sea_level) ?? 0);
        }
        return ()=>0;
    };
    e.absolute = t;
    e.aboveBottom = r;
    e.belowTop = s;
    e.relativeToSeaLevel = n;
})(s = s || (s = {}));
class g {
}
(function(e) {
    e.NOOP = {
        compile: ()=>()=>undefined
    };
    e.fromJson = function(i) {
        if (typeof i === "string") {
            return new t(Rd.reference(w.MATERIAL_RULE, gw.parse(i)));
        }
        let a = LM.readObject(i) ?? {};
        switch(LM.readString(a.type)?.replace(/^minecraft:/, "")){
            case "block":
                return new r(Tm.fromJson(a.result_state));
            case "sequence":
                return new s(LM.readArray(a.sequence, e.fromJson) ?? []);
            case "condition":
                return new n(x.fromJson(a.if_true), e.fromJson(a.then_run));
            default:
                return e.NOOP;
        }
    };
    class t extends e {
        holder;
        constructor(e){
            super();
            this.holder = e;
        }
        compile(e) {
            return this.holder.value().compile(e);
        }
    }
    e.HolderHolder = t;
    class r extends e {
        resultState;
        constructor(e){
            super();
            this.resultState = e;
        }
        compile(e) {
            return ()=>this.resultState;
        }
    }
    e.Block = r;
    class s extends e {
        sequence;
        constructor(e){
            super();
            this.sequence = e;
        }
        compile(e) {
            if (this.sequence.length === 0) {
                return ()=>undefined;
            }
            if (this.sequence.length === 1) {
                return this.sequence[0].compile(e);
            }
            let t = this.sequence.map((t)=>t.compile(e));
            return (e, r, s)=>{
                for (let n of t){
                    let t = n(e, r, s);
                    if (t) {
                        return t;
                    }
                }
            };
        }
    }
    e.Sequence = s;
    class n extends e {
        ifTrue;
        thenRun;
        constructor(e, t){
            super();
            this.ifTrue = e;
            this.thenRun = t;
        }
        compile(e) {
            let t = this.ifTrue.compile(e);
            let r = this.thenRun.compile(e);
            return (e, s, n)=>{
                if (t()) {
                    return r(e, s, n);
                }
            };
        }
    }
    e.Condition = n;
})(g = g || (g = {}));
class x {
}
(function(e) {
    function t(e, t) {
        let r = e.lastUpdateY - 1;
        let s = false;
        return ()=>{
            if (e.lastUpdateY !== r) {
                r = e.lastUpdateY;
                s = t();
            }
            return s;
        };
    }
    e.ALWAYS_FALSE = {
        compile: ()=>()=>false
    };
    e.ALWAYS_TRUE = {
        compile: ()=>()=>true
    };
    e.fromJson = function(t) {
        if (typeof t === "string") {
            return new r(Rd.reference(w.MATERIAL_CONDITION, gw.parse(t)));
        }
        let d = LM.readObject(t) ?? {};
        switch(LM.readString(d.type)?.replace(/^minecraft:/, "")){
            case "above_preliminary_surface":
                return new n;
            case "biome":
                return new i(Lx.parser(w.BIOME)(d.biome_is));
            case "noise_threshold":
                return new a(gw.parse(LM.readString(d.noise) ?? ""), LM.readNumber(d.min_threshold) ?? 0, LM.readNumber(d.max_threshold) ?? 0, LM.readBoolean(d.is_3d) ?? false);
            case "not":
                return new o(e.fromJson(d.invert));
            case "stone_depth":
                return new u(LM.readInt(d.offset) ?? 0, LM.readBoolean(d.add_surface_depth) ?? false, LM.readInt(d.secondary_depth_range) ?? 0, LM.readString(d.surface_type) === "ceiling");
            case "vertical_gradient":
                return new c(gw.parse(LM.readString(d.random_name) ?? ""), s.fromJson(d.true_at_and_below), s.fromJson(d.false_at_and_above));
            case "water":
                return new h(LM.readInt(d.offset) ?? 0, LM.readInt(d.surface_depth_multiplier) ?? 0, LM.readBoolean(d.add_surface_depth) ?? false);
            case "y_above":
                return new l(s.fromJson(d.anchor), LM.readInt(d.surface_depth_multiplier) ?? 0, LM.readBoolean(d.add_surface_depth) ?? false);
        }
        return e.ALWAYS_FALSE;
    };
    class r extends e {
        holder;
        constructor(e){
            super();
            this.holder = e;
        }
        compile(e) {
            return this.holder.value().compile(e);
        }
    }
    e.HolderHolder = r;
    class n extends e {
        compile(e) {
            return ()=>e.blockY >= e.getMinSurfaceLevel();
        }
    }
    e.AbovePreliminarySurface = n;
    class i extends e {
        biomes;
        constructor(e){
            super();
            this.biomes = e;
        }
        compile(e) {
            let r = new Set(Array(...this.biomes.value().getEntries()).map((e)=>e.key().toString()));
            return t(e, ()=>r.has(e.getBiome().toString()));
        }
    }
    e.Biome = i;
    class a extends e {
        noise;
        minThreshold;
        maxThreshold;
        is3d;
        constructor(e, t, r, s){
            super();
            this.noise = e;
            this.minThreshold = t;
            this.maxThreshold = r;
            this.is3d = s;
        }
        compile(e) {
            let t = e.getNoiseSampler(this.noise, this.is3d);
            return ()=>{
                let e = t();
                return this.minThreshold <= e && e <= this.maxThreshold;
            };
        }
    }
    e.NoiseThreshold = a;
    class o extends e {
        invert;
        constructor(e){
            super();
            this.invert = e;
        }
        compile(e) {
            let t = this.invert.compile(e);
            return ()=>!t();
        }
    }
    e.Not = o;
    class u extends e {
        offset;
        addSurfaceDepth;
        secondaryDepthRange;
        ceiling;
        constructor(e, t, r, s){
            super();
            this.offset = e;
            this.addSurfaceDepth = t;
            this.secondaryDepthRange = r;
            this.ceiling = s;
        }
        compile(e) {
            return t(e, ()=>{
                let t = this.ceiling ? e.stoneDepthBelow : e.stoneDepthAbove;
                let r = this.addSurfaceDepth ? e.surfaceDepth : 0;
                let s = this.secondaryDepthRange === 0 ? 0 : Tj(e.getSurfaceSecondary(), -1, 1, 0, this.secondaryDepthRange);
                return t <= 1 + this.offset + r + s;
            });
        }
    }
    e.StoneDepth = u;
    class c extends e {
        randomName;
        trueAtAndBelow;
        falseAtAndAbove;
        constructor(e, t, r){
            super();
            this.randomName = e;
            this.trueAtAndBelow = t;
            this.falseAtAndAbove = r;
        }
        compile(e) {
            let r = e.resolveAnchorY(this.trueAtAndBelow);
            let s = e.resolveAnchorY(this.falseAtAndAbove);
            let n = e.system.getOrCreateRandom(this.randomName);
            return t(e, ()=>{
                if (e.blockY <= r) {
                    return true;
                }
                if (e.blockY >= s) {
                    return false;
                }
                let t = Tj(e.blockY, r, s, 1, 0);
                return n.at(e.blockX, e.blockY, e.blockZ).nextFloat() < t;
            });
        }
    }
    e.VerticalGradient = c;
    class h extends e {
        offset;
        surfaceDepthMultiplier;
        addStoneDepth;
        constructor(e, t, r){
            super();
            this.offset = e;
            this.surfaceDepthMultiplier = t;
            this.addStoneDepth = r;
        }
        compile(e) {
            return t(e, ()=>{
                if (e.waterHeight === Number.MIN_SAFE_INTEGER) {
                    return true;
                }
                let t = this.addStoneDepth ? e.stoneDepthAbove : 0;
                return e.blockY + t >= e.waterHeight + this.offset + e.surfaceDepth * this.surfaceDepthMultiplier;
            });
        }
    }
    e.Water = h;
    class l extends e {
        anchor;
        surfaceDepthMultiplier;
        addStoneDepth;
        constructor(e, t, r){
            super();
            this.anchor = e;
            this.surfaceDepthMultiplier = t;
            this.addStoneDepth = r;
        }
        compile(e) {
            return t(e, ()=>{
                let t = this.addStoneDepth ? e.stoneDepthAbove : 0;
                return e.blockY + t >= e.resolveAnchorY(this.anchor) + e.surfaceDepth * this.surfaceDepthMultiplier;
            });
        }
    }
    e.YAbove = l;
})(x = x || (x = {}));
((e)=>{
    let t = (e)=>new v.HolderHolder(Rd.parser(w.DENSITY_FUNCTION, v.fromJson)(e));
    e.fromJson = function(e) {
        let r = LM.readObject(e) ?? {};
        return {
            temperature: t(r.temperature),
            vegetation: t(r.vegetation),
            continents: t(r.continents),
            erosion: t(r.erosion),
            depth: t(r.depth),
            ridges: t(r.ridges),
            chunkSurfaceLevel: t(r.preliminary_surface_level),
            finalDensity: t(r.final_density)
        };
    };
    e.create = function(e) {
        return {
            temperature: v.Constant.ZERO,
            vegetation: v.Constant.ZERO,
            continents: v.Constant.ZERO,
            erosion: v.Constant.ZERO,
            depth: v.Constant.ZERO,
            ridges: v.Constant.ZERO,
            chunkSurfaceLevel: v.Constant.ZERO,
            finalDensity: v.Constant.ZERO,
            ...e
        };
    };
    e.mapAll = function(e, t) {
        return {
            temperature: e.temperature.mapAll(t),
            vegetation: e.vegetation.mapAll(t),
            continents: e.continents.mapAll(t),
            erosion: e.erosion.mapAll(t),
            depth: e.depth.mapAll(t),
            ridges: e.ridges.mapAll(t),
            chunkSurfaceLevel: e.chunkSurfaceLevel.mapAll(t),
            finalDensity: e.finalDensity.mapAll(t)
        };
    };
})(n = n || (n = {}));
((e)=>{
    e.fromJson = function(e) {
        let t = LM.readObject(e) ?? {};
        return {
            minY: LM.readInt(t.min_y) ?? 0,
            height: LM.readInt(t.height) ?? 256
        };
    };
    e.create = function(e) {
        return {
            minY: 0,
            height: 256,
            ...e
        };
    };
})(i = i || (i = {}));
((e)=>{
    e.fromJson = function(e) {
        let t = LM.readObject(e) ?? {};
        return {
            noise: i.fromJson(t.noise),
            defaultBlock: Tm.fromJson(t.default_block),
            defaultFluid: Tm.fromJson(t.default_fluid),
            noiseRouter: n.fromJson(t.noise_router),
            materialRule: g.fromJson(t.material_rule),
            seaLevel: LM.readInt(t.sea_level) ?? 0,
            aquifers: t.aquifers ? o.fromJson(t.aquifers) : undefined,
            legacyRandomSource: LM.readBoolean(t.legacy_random_source) ?? false
        };
    };
    e.create = function(e) {
        return {
            noise: i.create({}),
            defaultBlock: Tm.STONE,
            defaultFluid: Tm.WATER,
            noiseRouter: n.create({}),
            materialRule: g.NOOP,
            seaLevel: 0,
            aquifers: undefined,
            legacyRandomSource: false,
            ...e
        };
    };
})(a = a || (a = {}));
class w {
    static NOISE = OR.createAndRegister("worldgen/noise", ob.fromJson);
    static DENSITY_FUNCTION = OR.createAndRegister("worldgen/density_function", (e)=>v.fromJson(e));
    static NOISE_SETTINGS = OR.createAndRegister("worldgen/noise_settings", a.fromJson);
    static MATERIAL_RULE = OR.createAndRegister("worldgen/material_rule", g.fromJson);
    static MATERIAL_CONDITION = OR.createAndRegister("worldgen/material_condition", x.fromJson);
    static BIOME = OR.createAndRegister("worldgen/biome");
    static SURFACE_NOISE = w.createNoise("surface", 0.9381732587751008, -6, [
        1,
        1,
        1
    ]);
    static SURFACE_SECONDARY_NOISE = w.createNoise("surface_secondary", 1.0582769165096106, -6, [
        1,
        1,
        0,
        1
    ]);
    static createNoise(e, t, r, s) {
        return w.NOISE.register(gw.create(e), new ob(t, r, s.length, "enabled", s), true);
    }
}
class v {
    computeVolume(e) {
        let t = 0;
        let r = Array(e.size());
        for(let s = 0; s < e.sizeZ; s += 1){
            let n = e.blockZ(s);
            for(let s = 0; s < e.sizeX; s += 1){
                let i = e.blockX(s);
                for(let s = 0; s < e.sizeY; s += 1){
                    let a = e.blockY(s);
                    r[t] = this.compute({
                        x: i,
                        y: a,
                        z: n
                    });
                    t += 1;
                }
            }
        }
        return r;
    }
    mapAll(e) {
        return ({
            apply (t) {
                return e.apply(t.mapChildren(this));
            }
        }).apply(this);
    }
}
(function(e) {
    e.context = function(e, t, r) {
        return {
            x: e,
            y: t,
            z: r
        };
    };
    class t extends e {
        input;
        constructor(e){
            super();
            this.input = e;
        }
        compute(e) {
            return this.transform(e, this.input.compute(e));
        }
    }
    let r = Rd.parser(w.NOISE, ob.fromJson);
    e.fromJson = function t(g, E = t) {
        if (typeof g === "string") {
            return new n(Rd.reference(w.DENSITY_FUNCTION, gw.parse(g)));
        }
        if (typeof g === "number") {
            return new s(g);
        }
        let D = LM.readObject(g) ?? {};
        let J = LM.readString(D.type)?.replace(/^minecraft:/, "");
        switch(J){
            case "blend_alpha":
                return new i(1, 0, 1);
            case "blend_offset":
            case "beardifier":
                return new i(0, -Infinity, Infinity);
            case "old_blended_noise":
                return new a(LM.readNumber(D.xz_scale) ?? 1, LM.readNumber(D.y_scale) ?? 1, LM.readNumber(D.xz_factor) ?? 80, LM.readNumber(D.y_factor) ?? 160, LM.readNumber(D.smear_scale_multiplier) ?? 8);
            case "interpolated":
                return new u(E(D.input ?? D.argument), LM.readInt(D.cell_size_xz) ?? 4, LM.readInt(D.cell_size_y) ?? 4);
            case "cache":
                return new o(E(D.input ?? D.argument));
            case "noise":
                return new c(r(D.noise), LM.readNumber(D.xz_scale) ?? 1, LM.readNumber(D.y_scale) ?? 1, D.shift_x ? E(D.shift_x) : e.Constant.ZERO, D.shift_y ? E(D.shift_y) : e.Constant.ZERO, D.shift_z ? E(D.shift_z) : e.Constant.ZERO);
            case "end_outer_islands":
                return new h;
            case "find_top_surface":
                return new l(E(D.density), E(D.upper_bound), LM.readInt(D.lower_bound) ?? 0, LM.readInt(D.cell_height) ?? 1);
            case "range_choice":
                return new d(E(D.input), LM.readNumber(D.min_inclusive) ?? 0, LM.readNumber(D.max_exclusive) ?? 1, E(D.when_in_range), E(D.when_out_of_range));
            case "shift_a":
                return new x(r(D.noise ?? D.argument));
            case "shift_b":
                return new v(r(D.noise ?? D.argument));
            case "shift":
                return new b(r(D.noise ?? D.argument));
            case "blend_density":
                return new y(E(D.input ?? D.argument));
            case "clamp":
                return new _(E(D.input), LM.readNumber(D.min) ?? 0, LM.readNumber(D.max) ?? 1);
            case "interval_select":
                return new M(E(D.input), LM.readArray(D.thresholds, (e)=>LM.readNumber(e) ?? 0) ?? [], LM.readArray(D.functions, E) ?? []);
            case "abs":
            case "square":
            case "cube":
            case "sqrt":
            case "half_negative":
            case "quarter_negative":
            case "squeeze":
            case "reciprocal":
            case "negate":
            case "log":
            case "sign":
                return new S(J, E(D.input ?? D.argument));
            case "add":
            case "sub":
            case "mul":
            case "div":
            case "min":
            case "max":
                return new L(LM.readEnum(J, I), E(D.left ?? D.argument1), E(D.right ?? D.argument2));
            case "spline":
                return new N(mu.fromJson(D.spline, E));
            case "constant":
                return new s(LM.readNumber(D.value ?? D.argument) ?? 0);
            case "gradient":
                return new R(LM.readEnum(D.axis, T), LM.readEnum(D.tiling, A), LM.readInt(D.from_coordinate) ?? 0, LM.readInt(D.to_coordinate) ?? 1, LM.readNumber(D.from_value) ?? 0, LM.readNumber(D.to_value) ?? 1);
            case "lerp":
                return new k(E(D.alpha), E(D.first), E(D.second));
            case "floor":
            case "round":
            case "ceil":
            case "truncate":
                return new B(J, E(D.input), E(D.multiple));
            case "pow":
                return new C(E(D.base), E(D.exponent));
            case "distance_to_point":
                return new P(((e)=>{
                    let t = LM.readArray(e, (e)=>LM.readNumber(e) ?? 0) ?? [];
                    return new Mi(t[0] ?? 0, t[1] ?? 0, t[2] ?? 0);
                })(D.point), LM.readEnum(D.metric, O));
            case "slice":
                return new z(LM.readEnum(D.axis, T), LM.readInt(D.coordinate) ?? 0, E(D.input));
        }
        return s.ZERO;
    };
    class s extends e {
        value;
        static ZERO = new s(0);
        static ONE = new s(1);
        constructor(e){
            super();
            this.value = e;
        }
        compute() {
            return this.value;
        }
        mapChildren(e) {
            return this;
        }
        range() {
            return IX_1.ofExact(this.value);
        }
    }
    e.Constant = s;
    class n extends e {
        holder;
        constructor(e){
            super();
            this.holder = e;
        }
        compute(e) {
            return this.holder.value().compute(e);
        }
        mapChildren(e) {
            return new n(Rd.direct(e.apply(this.holder.value())));
        }
        range() {
            return this.holder.value().range();
        }
    }
    e.HolderHolder = n;
    class i extends e.Constant {
        min;
        max;
        constructor(e, t, r){
            super(e);
            this.min = t;
            this.max = r;
        }
        range() {
            return IX_1.of(this.min, this.max);
        }
    }
    e.ConstantMinMax = i;
    class a extends e {
        xzScale;
        yScale;
        xzFactor;
        yFactor;
        smearScaleMultiplier;
        blendedNoise;
        constructor(e, t, r, s, n, i){
            super();
            this.xzScale = e;
            this.yScale = t;
            this.xzFactor = r;
            this.yFactor = s;
            this.smearScaleMultiplier = n;
            this.blendedNoise = i;
        }
        compute(e) {
            return this.blendedNoise?.sample(e.x, e.y, e.z) ?? 0;
        }
        mapChildren(e) {
            return this;
        }
        range() {
            if (this.blendedNoise) {
                return this.blendedNoise.range();
            }
            return IX_1.INFINITE;
        }
    }
    e.OldBlendedNoise = a;
    class o extends e {
        input;
        constructor(e){
            super();
            this.input = e;
        }
        compute(e) {
            return this.input.compute(e);
        }
        mapChildren(e) {
            return new o(e.apply(this.input));
        }
        range() {
            return this.input.range();
        }
    }
    e.Cache = o;
    class u extends e {
        input;
        cellSizeXz;
        cellSizeY;
        values;
        constructor(e, t, r){
            super();
            this.input = e;
            this.cellSizeXz = t;
            this.cellSizeY = r;
            this.values = new Map;
        }
        compute({ x, y, z }) {
            let cellSizeXz = this.cellSizeXz;
            let cellSizeY = this.cellSizeY;
            let i = Math.floor(x / cellSizeXz) * cellSizeXz;
            let a = Math.floor(y / cellSizeY) * cellSizeY;
            let o = Math.floor(z / cellSizeXz) * cellSizeXz;
            let u = ()=>this.computeCorner(i, a, o);
            let c = ()=>this.computeCorner(i, a, o + cellSizeXz);
            let h = ()=>this.computeCorner(i, a + cellSizeY, o);
            let l = ()=>this.computeCorner(i, a + cellSizeY, o + cellSizeXz);
            let d = ()=>this.computeCorner(i + cellSizeXz, a, o);
            let f = ()=>this.computeCorner(i + cellSizeXz, a, o + cellSizeXz);
            let p = ()=>this.computeCorner(i + cellSizeXz, a + cellSizeY, o);
            let g = ()=>this.computeCorner(i + cellSizeXz, a + cellSizeY, o + cellSizeXz);
            return pT((x % cellSizeXz + cellSizeXz) % cellSizeXz / cellSizeXz, (y % cellSizeY + cellSizeY) % cellSizeY / cellSizeY, (z % cellSizeXz + cellSizeXz) % cellSizeXz / cellSizeXz, u, d, h, p, c, f, l, g);
        }
        computeCorner(t, r, s) {
            return EB(this.values, `${t} ${r} ${s}`, ()=>this.input.compute(e.context(t, r, s)));
        }
        mapChildren(e) {
            return new u(e.apply(this.input), this.cellSizeXz, this.cellSizeY);
        }
        range() {
            return this.input.range();
        }
    }
    e.Interpolated = u;
    class c extends e {
        noise;
        xzScale;
        yScale;
        shiftX;
        shiftY;
        shiftZ;
        noiseSampler;
        constructor(e, t, r, s, n, i, a){
            super();
            this.noise = e;
            this.xzScale = t;
            this.yScale = r;
            this.shiftX = s;
            this.shiftY = n;
            this.shiftZ = i;
            this.noiseSampler = a;
        }
        compute(e) {
            let t = e.x * this.xzScale + this.shiftX.compute(e);
            let r = e.y * this.yScale + this.shiftY.compute(e);
            let s = e.z * this.xzScale + this.shiftZ.compute(e);
            return this.noiseSampler?.get3D(t, r, s) ?? 0;
        }
        mapChildren(e) {
            return new c(this.noise, this.xzScale, this.yScale, e.apply(this.shiftX), e.apply(this.shiftY), e.apply(this.shiftZ), this.noiseSampler);
        }
        range() {
            if (this.noiseSampler) {
                return this.noiseSampler.range();
            }
            return IX_1.INFINITE;
        }
    }
    e.NoiseFunction = c;
    class h extends e {
        islandNoise;
        constructor(e){
            super();
            let t = new Vc(e ?? BigInt(0));
            t.consume(17292);
            this.islandNoise = new hc(t);
        }
        getHeightValue(e, t) {
            let r = Math.floor(e / 2);
            let s = Math.floor(t / 2);
            let n = e % 2;
            let i = t % 2;
            let a = qE(100 - 8 * Math.sqrt(e * e + t * t), -100, 80);
            for(let e = -12; e <= 12; e += 1){
                for(let t = -12; t <= 12; t += 1){
                    let o = r + e;
                    let u = s + t;
                    if (o * o + u * u <= 4096 || this.islandNoise.get2D(o, u) >= -0.9) {
                        continue;
                    }
                    let c = n + 2 * e;
                    let h = i + 2 * t;
                    let l = 100 - Math.sqrt(c * c + h * h) * ((3439 * Math.abs(o) + 147 * Math.abs(u)) % 13 + 9);
                    a = Math.max(a, qE(l, -100, 80));
                }
            }
            return a;
        }
        compute({ x, y, z }) {
            return (this.getHeightValue(Math.floor(x / 8), Math.floor(z / 8)) - 8) / 128;
        }
        mapChildren(e) {
            return this;
        }
        range() {
            return IX_1.of(-0.84375, 0.5625);
        }
    }
    e.EndOuterIslands = h;
    class l extends e {
        density;
        upperBound;
        lowerBound;
        cellHeight;
        constructor(e, t, r, s){
            super();
            this.density = e;
            this.upperBound = t;
            this.lowerBound = r;
            this.cellHeight = s;
        }
        compute(t) {
            let r = Math.floor(this.upperBound.compute(t) / this.cellHeight) * this.cellHeight;
            if (r < this.lowerBound) {
                return this.lowerBound;
            }
            for(let s = r; s >= this.lowerBound; s -= this.cellHeight){
                if (this.density.compute(e.context(t.x, s, t.z)) > 0) {
                    return s;
                }
            }
            return this.lowerBound;
        }
        mapChildren(e) {
            return new l(e.apply(this.density), e.apply(this.upperBound), this.lowerBound, this.cellHeight);
        }
        range() {
            return IX_1.of(this.lowerBound, Math.max(this.lowerBound, this.upperBound.range().max));
        }
    }
    e.FindTopSurface = l;
    class d extends e {
        input;
        minInclusive;
        maxExclusive;
        whenInRange;
        whenOutOfRange;
        constructor(e, t, r, s, n){
            super();
            this.input = e;
            this.minInclusive = t;
            this.maxExclusive = r;
            this.whenInRange = s;
            this.whenOutOfRange = n;
        }
        compute(e) {
            let t = this.input.compute(e);
            if (this.minInclusive <= t && t < this.maxExclusive) {
                return this.whenInRange.compute(e);
            }
            return this.whenOutOfRange.compute(e);
        }
        mapChildren(e) {
            return new d(e.apply(this.input), this.minInclusive, this.maxExclusive, e.apply(this.whenInRange), e.apply(this.whenOutOfRange));
        }
        range() {
            return IX_1.encapsulating(this.whenInRange.range(), this.whenOutOfRange.range());
        }
    }
    e.RangeChoice = d;
    class g extends e {
        noise;
        noiseSampler;
        constructor(e, t){
            super();
            this.noise = e;
            this.noiseSampler = t;
        }
        compute(e) {
            return (this.noiseSampler?.get3D(0.25 * e.x, 0.25 * e.y, 0.25 * e.z) ?? 0) * 4;
        }
        mapChildren(e) {
            return this;
        }
        range() {
            if (this.noiseSampler) {
                return IX_1.mul(this.noiseSampler.range(), IX_1.ofExact(4));
            }
            return IX_1.INFINITE;
        }
    }
    e.ShiftNoise = g;
    class x extends g {
        constructor(e, t){
            super(e, t);
        }
        compute(t) {
            return super.compute(e.context(t.x, 0, t.z));
        }
        withNewNoise(e) {
            return new x(this.noise, e);
        }
    }
    e.ShiftA = x;
    class v extends g {
        constructor(e, t){
            super(e, t);
        }
        compute(t) {
            return super.compute(e.context(t.z, t.x, 0));
        }
        withNewNoise(e) {
            return new v(this.noise, e);
        }
    }
    e.ShiftB = v;
    class b extends g {
        constructor(e, t){
            super(e, t);
        }
        withNewNoise(e) {
            return new b(this.noise, e);
        }
    }
    e.Shift = b;
    class y extends t {
        constructor(e){
            super(e);
        }
        transform(e, t) {
            return t;
        }
        mapChildren(e) {
            return new y(e.apply(this.input));
        }
        range() {
            return IX_1.INFINITE;
        }
    }
    e.BlendDensity = y;
    class _ extends t {
        min;
        max;
        constructor(e, t, r){
            super(e);
            this.min = t;
            this.max = r;
        }
        transform(e, t) {
            return qE(t, this.min, this.max);
        }
        mapChildren(e) {
            return new _(e.apply(this.input), this.min, this.max);
        }
        range() {
            return IX_1.clamp(this.input.range(), this.min, this.max);
        }
    }
    e.Clamp = _;
    class M extends e {
        input;
        thresholds;
        functions;
        constructor(e, t, r){
            super();
            this.input = e;
            this.thresholds = t;
            this.functions = r;
            let s = Math.min(t.length, r.length);
            this.thresholds = this.thresholds.slice(0, s);
            this.functions = this.functions.slice(0, s);
        }
        compute(e) {
            let t = this.input.compute(e);
            for(let r = 0; r < this.thresholds.length; r += 1){
                if (t < this.thresholds[r]) {
                    return this.functions[r].compute(e);
                }
            }
            return this.functions[this.functions.length - 1].compute(e);
        }
        mapChildren(e) {
            return new M(e.apply(this.input), this.thresholds, this.functions.map((t)=>e.apply(t)));
        }
        range() {
            return IX_1.encapsulating(...this.functions.map((e)=>e.range()));
        }
    }
    e.IntervalSelect = M;
    class S extends t {
        type;
        constructor(e, t){
            super(t);
            this.type = e;
        }
        transform(e, t) {
            return S.transform(this.type, t);
        }
        static transform(e, t) {
            switch(e){
                case "abs":
                    return Math.abs(t);
                case "square":
                    return t * t;
                case "cube":
                    return t * t * t;
                case "half_negative":
                    if (t > 0) {
                        return t;
                    }
                    return 0.5 * t;
                case "quarter_negative":
                    if (t > 0) {
                        return t;
                    }
                    return 0.25 * t;
                case "squeeze":
                    let r = qE(t, -1, 1);
                    return r / 2 - r * r * r / 24;
                case "reciprocal":
                    return 1 / t;
                case "negate":
                    return -t;
                case "sqrt":
                    return Math.sqrt(t);
                case "log":
                    return Math.log(t);
                case "sign":
                    return Math.sign(t);
            }
        }
        mapChildren(e) {
            return new S(this.type, e.apply(this.input));
        }
        range() {
            let e = this.input.range();
            switch(this.type){
                case "abs":
                    return IX_1.abs(e);
                case "square":
                    return IX_1.square(e);
                case "cube":
                case "half_negative":
                case "quarter_negative":
                case "squeeze":
                    return IX_1.mapMonotonic(e, (e)=>S.transform(this.type, e));
                case "reciprocal":
                    return IX_1.reciprocal(e);
                case "negate":
                    return IX_1.sub(IX_1.ofExact(0), e);
                case "sqrt":
                    return IX_1.pow(e, IX_1.ofExact(0.5));
                case "log":
                    return IX_1.log(e);
                case "sign":
                    return IX_1.sign(e);
            }
        }
    }
    e.Unary = S;
    let I = [
        "add",
        "sub",
        "mul",
        "div",
        "min",
        "max"
    ];
    class L extends e {
        type;
        left;
        right;
        rightRange = IX_1.INFINITE;
        constructor(e, t, r){
            super();
            this.type = e;
            this.left = t;
            this.right = r;
        }
        compute(e) {
            let t = this.left.compute(e);
            switch(this.type){
                case "add":
                    return t + this.right.compute(e);
                case "sub":
                    return t - this.right.compute(e);
                case "mul":
                    if (t === 0) {
                        return 0;
                    }
                    return t * this.right.compute(e);
                case "div":
                    if (t === 0) {
                        return 0;
                    }
                    return t / this.right.compute(e);
                case "min":
                    if (t < this.rightRange.min) {
                        return t;
                    }
                    return Math.min(t, this.right.compute(e));
                case "max":
                    if (t > this.rightRange.max) {
                        return t;
                    }
                    return Math.max(t, this.right.compute(e));
            }
        }
        mapChildren(e) {
            return new L(this.type, e.apply(this.left), e.apply(this.right));
        }
        range() {
            let e = this.left.range();
            let t = this.right.range();
            switch(this.type){
                case "add":
                    return IX_1.add(e, t);
                case "sub":
                    return IX_1.sub(e, t);
                case "mul":
                    return IX_1.mul(e, t);
                case "div":
                    return IX_1.div(e, t);
                case "min":
                    return IX_1.min(e, t);
                case "max":
                    return IX_1.max(e, t);
            }
        }
        trySimplify() {
            if (this.type === "mul" || this.type === "add") {
                if (this.left instanceof s) {
                    return new E(this.type, this.right, this.left.value);
                }
                if (this.right instanceof s) {
                    return new E(this.type, this.left, this.right.value);
                }
            }
            this.rightRange = this.right.range();
            return this;
        }
    }
    e.Binary = L;
    class E extends t {
        type;
        value;
        constructor(e, t, r){
            super(t);
            this.type = e;
            this.value = r;
        }
        transform(e, t) {
            switch(this.type){
                case "mul":
                    return t * this.value;
                case "add":
                    return t + this.value;
            }
        }
        mapChildren(e) {
            return new E(this.type, e.apply(this.input), this.value);
        }
        range() {
            switch(this.type){
                case "mul":
                    return IX_1.mul(this.input.range(), IX_1.ofExact(this.value));
                case "add":
                    return IX_1.add(this.input.range(), IX_1.ofExact(this.value));
            }
        }
    }
    e.MulOrAdd = E;
    class N extends e {
        spline;
        constructor(e){
            super();
            this.spline = e;
        }
        compute(e) {
            return this.spline.compute(e);
        }
        mapChildren(t) {
            return new N(this.spline.mapCoordinates((r)=>{
                if (r instanceof e) {
                    return t.apply(r);
                }
                return r;
            }));
        }
        range() {
            return this.spline.range();
        }
    }
    e.Spline = N;
    let T = [
        "x",
        "y",
        "z"
    ];
    let A = [
        "clamp_to_edge",
        "repeat",
        "mirrored_repeat"
    ];
    class R extends e {
        axis;
        tiling;
        fromCoordinate;
        toCoordinate;
        fromValue;
        toValue;
        constructor(e, t, r, s, n, i){
            super();
            this.axis = e;
            this.tiling = t;
            this.fromCoordinate = r;
            this.toCoordinate = s;
            this.fromValue = n;
            this.toValue = i;
        }
        compute(e) {
            let t = this.toCoordinate - this.fromCoordinate;
            let r = e[this.axis] - this.fromCoordinate;
            switch(this.tiling){
                case "clamp_to_edge":
                    break;
                case "repeat":
                    r = (r % t + t) % t;
                    break;
                case "mirrored_repeat":
                    let s = Math.floor(r / t);
                    let n = r - s * t;
                    r = (1 & s) == 0 ? n : t - n;
            }
            return MV(r / t, this.fromValue, this.toValue);
        }
        mapChildren(e) {
            return this;
        }
        range() {
            return IX_1.between(this.fromValue, this.toValue);
        }
    }
    e.Gradient = R;
    class k extends e {
        alpha;
        first;
        second;
        constructor(e, t, r){
            super();
            this.alpha = e;
            this.first = t;
            this.second = r;
        }
        compute(e) {
            let t = this.alpha.compute(e);
            switch(t){
                case 0:
                    return this.first.compute(e);
                case 1:
                    return this.second.compute(e);
                default:
                    return uE(t, this.first.compute(e), this.second.compute(e));
            }
        }
        mapChildren(e) {
            return new k(e.apply(this.alpha), e.apply(this.first), e.apply(this.second));
        }
        range() {
            return IX_1.lerp(this.alpha.range(), this.first.range(), this.second.range());
        }
    }
    e.Lerp = k;
    class B extends e {
        type;
        input;
        multiple;
        constructor(e, t, r){
            super();
            this.type = e;
            this.input = t;
            this.multiple = r;
        }
        compute(e) {
            let t = this.input.compute(e);
            let r = this.multiple.compute(e);
            if (r === 0) {
                return t;
            }
            return this.roundToInteger(t / r) * r;
        }
        roundToInteger(e) {
            switch(this.type){
                case "floor":
                    return Math.floor(e);
                case "round":
                    return Math.round(e);
                case "ceil":
                    return Math.ceil(e);
                case "truncate":
                    return Math.trunc(e);
            }
        }
        mapChildren(e) {
            return new B(this.type, e.apply(this.input), e.apply(this.multiple));
        }
        range() {
            let e = this.multiple.range();
            return IX_1.mul(IX_1.mapMonotonic(IX_1.div(this.input.range(), e), (e)=>this.roundToInteger(e)), e);
        }
    }
    e.Round = B;
    class C extends e {
        base;
        exponent;
        constructor(e, t){
            super();
            this.base = e;
            this.exponent = t;
        }
        compute(e) {
            return this.base.compute(e) ** this.exponent.compute(e);
        }
        mapChildren(e) {
            return new C(e.apply(this.base), e.apply(this.exponent));
        }
        range() {
            return IX_1.pow(this.base.range(), this.exponent.range());
        }
    }
    e.Pow = C;
    let O = [
        "euclidean",
        "euclidean_squared",
        "manhattan",
        "chebyshev"
    ];
    class P extends e {
        point;
        metric;
        constructor(e, t){
            super();
            this.point = e;
            this.metric = t;
        }
        compute(e) {
            let t = this.point.sub(new Mi(e.x, e.y, e.z));
            switch(this.metric){
                case "euclidean":
                    return t.length();
                case "euclidean_squared":
                    return t.lengthSquared();
                case "manhattan":
                    return Math.abs(t.x) + Math.abs(t.y) + Math.abs(t.z);
                case "chebyshev":
                    return Math.max(Math.abs(t.x), Math.abs(t.y), Math.abs(t.z));
            }
        }
        mapChildren(e) {
            return this;
        }
        range() {
            return IX_1.of(0, Infinity);
        }
    }
    e.DistanceToPoint = P;
    class z extends e {
        axis;
        coordinate;
        input;
        constructor(e, t, r){
            super();
            this.axis = e;
            this.coordinate = t;
            this.input = r;
        }
        compute(e) {
            switch(this.axis){
                case "x":
                case "y":
                case "z":
                    return this.input.compute({
                        x: 0,
                        y: e.y,
                        z: e.z
                    });
            }
        }
        mapChildren(e) {
            return new z(this.axis, this.coordinate, e.apply(this.input));
        }
        range() {
            return this.input.range();
        }
    }
    e.Slice = z;
})(v = v || (v = {}));
((e)=>{
    let t = (e)=>new v.HolderHolder(Rd.parser(w.DENSITY_FUNCTION, v.fromJson)(e));
    e.fromJson = function(e) {
        let r = LM.readObject(e) ?? {};
        return {
            barrier: t(r.barrier),
            fluidLevelFloodedness: t(r.fluid_level_floodedness),
            fluidLevelSpread: t(r.fluid_level_spread),
            lava: t(r.lava),
            exclusion: t(r.exclusion),
            surfaceLevel: t(r.surface_level)
        };
    };
    e.mapAll = function(e, t) {
        return {
            barrier: e.barrier.mapAll(t),
            fluidLevelFloodedness: e.fluidLevelFloodedness.mapAll(t),
            fluidLevelSpread: e.fluidLevelSpread.mapAll(t),
            lava: e.lava.mapAll(t),
            exclusion: e.exclusion.mapAll(t),
            surfaceLevel: e.surfaceLevel.mapAll(t)
        };
    };
})(o = o || (o = {}));
u = u || (u = {});
u.createDisabled = function(e) {
    return {
        computeSubstance (t, r, s, n) {
            if (!(n > 0)) {
                return e(t, r, s).at(r);
            }
        }
    };
};
class b {
    shift;
    biomes;
    n;
    constructor(e, t){
        this.shift = e;
        this.biomes = t;
        if (t.length === 0) {
            throw Error("Cannot create checkerboard biome source without biomes");
        }
        this.n = t.length;
    }
    getBiome(e, t, r) {
        let s = (((e >> this.shift) + (r >> this.shift)) % this.n + this.n) % this.n;
        return gw.parse(this.biomes[s].toString());
    }
    static fromJson(e) {
        let t = LM.readObject(e) ?? {};
        return new b((LM.readInt(t.scale) ?? 2) + 2, typeof t.biomes === "string" ? [
            gw.parse(t.biomes)
        ] : LM.readArray(t.biomes, (e)=>gw.parse(LM.readString(e) ?? "")) ?? []);
    }
}
class y {
    biome;
    constructor(e){
        this.biome = e;
    }
    getBiome() {
        return this.biome;
    }
    static fromJson(e) {
        let t = LM.readObject(e) ?? {};
        return new y(gw.parse(LM.readString(t.biome) ?? "plains"));
    }
}
(function(e) {
    function t(e, t) {
        if (typeof e === "number") {
            return new r(e, t ?? e);
        }
        return e;
    }
    e.target = function(e, t, r, s, i, a) {
        return new n(e, t, r, s, i, a);
    };
    e.parameters = function(e, r, n, i, a, o, u) {
        return new s(t(e), t(r), t(n), t(i), t(a), t(o), u);
    };
    e.param = t;
    class r {
        min;
        max;
        constructor(e, t){
            this.min = e;
            this.max = t;
        }
        distance(e) {
            let t = (typeof e === "number" ? e : e.min) - this.max;
            let r = this.min - (typeof e === "number" ? e : e.max);
            if (t > 0) {
                return t;
            }
            return Math.max(r, 0);
        }
        union(e) {
            return new r(Math.min(this.min, e.min), Math.max(this.max, e.max));
        }
        static fromJson(e) {
            if (typeof e === "number") {
                return new r(e, e);
            }
            let [t, s] = LM.readArray(e, (e)=>LM.readNumber(e)) ?? [];
            return new r(t ?? 0, s ?? 0);
        }
    }
    e.Param = r;
    class s {
        temperature;
        humidity;
        continentalness;
        erosion;
        depth;
        weirdness;
        offset;
        constructor(e, t, r, s, n, i, a){
            this.temperature = e;
            this.humidity = t;
            this.continentalness = r;
            this.erosion = s;
            this.depth = n;
            this.weirdness = i;
            this.offset = a;
        }
        fittness(e) {
            return Ew(this.temperature.distance(e.temperature)) + Ew(this.humidity.distance(e.humidity)) + Ew(this.continentalness.distance(e.continentalness)) + Ew(this.erosion.distance(e.erosion)) + Ew(this.depth.distance(e.depth)) + Ew(this.weirdness.distance(e.weirdness)) + Ew(this.offset - e.offset);
        }
        space() {
            return [
                this.temperature,
                this.humidity,
                this.continentalness,
                this.erosion,
                this.depth,
                this.weirdness,
                new r(this.offset, this.offset)
            ];
        }
        static fromJson(e) {
            let t = LM.readObject(e) ?? {};
            return new s(r.fromJson(t.temperature), r.fromJson(t.humidity), r.fromJson(t.continentalness), r.fromJson(t.erosion), r.fromJson(t.depth), r.fromJson(t.weirdness), LM.readNumber(t.offset) ?? 0);
        }
    }
    e.ParamPoint = s;
    class n {
        temperature;
        humidity;
        continentalness;
        erosion;
        depth;
        weirdness;
        constructor(e, t, r, s, n, i){
            this.temperature = e;
            this.humidity = t;
            this.continentalness = r;
            this.erosion = s;
            this.depth = n;
            this.weirdness = i;
        }
        get offset() {
            return 0;
        }
        toArray() {
            return [
                this.temperature,
                this.humidity,
                this.continentalness,
                this.erosion,
                this.depth,
                this.weirdness,
                this.offset
            ];
        }
    }
    e.TargetPoint = n;
    class i {
        things;
        index;
        constructor(e){
            this.things = e;
            this.index = new o(e);
        }
        find(e) {
            return this.index.search(e, (e, t)=>e.distance(t));
        }
    }
    e.Parameters = i;
    class a {
        temperature;
        humidity;
        continentalness;
        erosion;
        depth;
        weirdness;
        constructor(e, t, r, s, n, i){
            this.temperature = e;
            this.humidity = t;
            this.continentalness = r;
            this.erosion = s;
            this.depth = n;
            this.weirdness = i;
        }
        static fromRouter(t) {
            return new e.Sampler(t.temperature, t.vegetation, t.continents, t.erosion, t.depth, t.ridges);
        }
        sample(t, r, s) {
            let n = v.context(t << 2, r << 2, s << 2);
            return e.target(this.temperature.compute(n), this.humidity.compute(n), this.continentalness.compute(n), this.erosion.compute(n), this.depth.compute(n), this.weirdness.compute(n));
        }
    }
    e.Sampler = a;
    class o {
        static CHILDREN_PER_NODE = 10;
        root;
        last_leaf = null;
        constructor(e){
            if (e.length === 0) {
                throw Error("At least one point is required to build search tree");
            }
            this.root = o.build(e.map(([e, t])=>new h(e, t)));
        }
        static build(e) {
            if (e.length === 1) {
                return e[0];
            }
            if (e.length <= o.CHILDREN_PER_NODE) {
                return new c(e.map((e)=>{
                    let t = 0;
                    for(let r = 0; r < 7; r += 1){
                        let s = e.space[r];
                        t += Math.abs((s.min + s.max) / 2);
                    }
                    return {
                        key: t,
                        node: e
                    };
                }).sort((e, t)=>e.key - t.key).map(({ node })=>node));
            }
            let t = Infinity;
            let r = -1;
            let s = [];
            for(let n = 0; n < 7; ++n){
                e = o.sort(e, n, false);
                let i = 0;
                for (let t of s = o.bucketize(e)){
                    i += o.area(t.space);
                }
                if (t > i) {
                    t = i;
                    r = n;
                }
            }
            e = o.sort(e, r, false);
            s = o.bucketize(e);
            return new c((s = o.sort(s, r, true)).map((e)=>o.build(e.children)));
        }
        static sort(e, t, r) {
            return e.map((e)=>{
                let s = e.space[t];
                let n = (s.min + s.max) / 2;
                return {
                    key: r ? Math.abs(n) : n,
                    node: e
                };
            }).sort((e, t)=>e.key - t.key).map(({ node })=>node);
        }
        static bucketize(e) {
            let t = [];
            let r = [];
            let s = 10 ** Math.floor(Math.log(e.length - 0.01) / Math.log(10));
            for (let n of e){
                r.push(n);
                if (!(r.length < s)) {
                    t.push(new c(r));
                    r = [];
                }
            }
            if (r.length !== 0) {
                t.push(new c(r));
            }
            return t;
        }
        static area(e) {
            let t = 0;
            for (let r of e){
                t += Math.abs(r.max - r.min);
            }
            return t;
        }
        search(e, t) {
            let r = this.root.search(e.toArray(), this.last_leaf, t);
            this.last_leaf = r;
            return r.thing();
        }
    }
    e.RTree = o;
    class u {
        space;
        constructor(e){
            this.space = e;
        }
        distance(e) {
            let t = 0;
            for(let r = 0; r < 7; r += 1){
                t += Ew(this.space[r].distance(e[r]));
            }
            return t;
        }
    }
    e.RNode = u;
    class c extends u {
        children;
        constructor(e){
            super(c.buildSpace(e));
            this.children = e;
        }
        static buildSpace(e) {
            let t = [
                ...Array(7)
            ].map(()=>new r(Infinity, -Infinity));
            for (let r of e){
                t = [
                    ...Array(7)
                ].map((e, s)=>t[s].union(r.space[s]));
            }
            return t;
        }
        search(e, t, r) {
            let s = t ? r(t, e) : Infinity;
            let n = t;
            for (let t of this.children){
                let i = r(t, e);
                if (s <= i) {
                    continue;
                }
                let a = t.search(e, n, r);
                if (a === null) {
                    continue;
                }
                let o = t == a ? i : r(a, e);
                if (o === 0) {
                    return a;
                }
                if (!(s <= o)) {
                    s = o;
                    n = a;
                }
            }
            return n;
        }
    }
    e.RSubTree = c;
    class h extends u {
        thing;
        constructor(e, t){
            super(e.space());
            this.thing = t;
        }
        search() {
            return this;
        }
    }
    e.RLeaf = h;
})(c = c || (c = {}));
class _ {
    parameters;
    constructor(e){
        this.parameters = new c.Parameters(e);
    }
    getBiome(e, t, r, s) {
        let n = s.sample(e, t, r);
        return this.parameters.find(n);
    }
    static fromJson(e) {
        let t = LM.readObject(e) ?? {};
        return new _((LM.readArray(t.biomes, (e)=>{
            let t;
            t = LM.readObject(e) ?? {};
            return {
                biome: gw.parse(LM.readString(t.biome) ?? "plains"),
                parameters: c.ParamPoint.fromJson(t.parameters)
            };
        }) ?? []).map((e)=>[
                e.parameters,
                ()=>e.biome
            ]));
    }
}
class M {
    static END = gw.create("the_end");
    static HIGHLANDS = gw.create("end_highlands");
    static MIDLANDS = gw.create("end_midlands");
    static ISLANDS = gw.create("small_end_islands");
    static BARRENS = gw.create("end_barrens");
    getBiome(e, t, r, s) {
        let n = e << 2 >> 4;
        let i = r << 2 >> 4;
        if (n * n + i * i <= 4096) {
            return M.END;
        }
        let a = v.context((2 * n + 1) * 8, t << 2, (2 * i + 1) * 8);
        let o = s.erosion.compute(a);
        if (o > 0.25) {
            return M.HIGHLANDS;
        }
        if (o >= -0.0625) {
            return M.MIDLANDS;
        }
        if (o >= -0.21875) {
            return M.BARRENS;
        }
        return M.ISLANDS;
    }
    static fromJson(e) {
        return new M;
    }
}
((e)=>{
    e.fromJson = function(e) {
        let t = LM.readObject(e) ?? {};
        switch(LM.readString(t.type)?.replace(/^minecraft:/, "")){
            case "fixed":
                return y.fromJson(e);
            case "checkerboard":
                return b.fromJson(e);
            case "multi_noise":
                return _.fromJson(e);
            case "the_end":
                return M.fromJson(e);
            default:
                return new y(gw.create("plains"));
        }
    };
    e.findBiomeHorizontal = function(e, t, r, s, n, i, a, o, u = 1, c = false) {
        if (e instanceof y) {
            if (!i(e.getBiome())) {
                return;
            } else if (c) {
                return {
                    pos: IX.create(t, r, s),
                    biome: e.getBiome()
                };
            } else {
                return {
                    pos: IX.create(t - n + a.nextInt(2 * n + 1), r, s - n + a.nextInt(2 * n + 1)),
                    biome: e.getBiome()
                };
            }
        }
        let h = t >> 2;
        let l = s >> 2;
        let d = n >> 2;
        let m = r >> 2;
        let p;
        let g = 0;
        const x = c ? 0 : d;
        for(let w = x; w <= d; w += u){
            for(let v = -w; v <= w; v += u){
                let t = Math.abs(v) === w;
                for(let b = -w; b <= w; b += u){
                    if (c && Math.abs(b) !== w && !t) {
                        continue;
                    }
                    let s = h + b;
                    let n = l + v;
                    let biome = e.getBiome(s, m, n, o);
                    if (i(biome)) {
                        if ((p === undefined || a.nextInt(g + 1) <= 0.5) && (p = {
                            pos: IX.create(s << 2, r, n << 2),
                            biome
                        }, c)) {
                            return p;
                        }
                        g++;
                    }
                }
            }
        }
        return p;
    };
})(h = h || (h = {}));
l = l || (l = {});
l.fromJson = function(e) {
    if (typeof e === "string" && (e === "WORLD_SURFACE_WG" || e === "WORLD_SURFACE" || e === "OCEAN_FLOOR_WG" || e === "OCEAN_FLOOR" || e === "MOTION_BLOCKING" || e === "MOTION_BLOCKING_NO_LEAVES")) {
        return e;
    }
};
((e)=>{
    function t(e) {
        return (t, r)=>e(r);
    }
    function r(e, t) {
        return (r, s)=>{
            let n = e(s);
            let i = t(s);
            if (n > i) {
                return n;
            }
            return r.nextInt(i - n + 1) + n;
        };
    }
    function n(e, t, r = 1) {
        return (s, n)=>{
            let i = e(n);
            let a = t(n);
            if (a - i - r + 1 <= 0) {
                return i;
            }
            {
                let e = s.nextInt(a - i - r + 1);
                return s.nextInt(e + r) + i;
            }
        };
    }
    function i(e, t, r = 1) {
        return (s, n)=>{
            let i = e(n);
            let a = t(n);
            if (a - i - r + 1 <= 0) {
                return i;
            }
            {
                let e = vz(s, i + r, a);
                let t = vz(s, i, e - 1);
                return vz(s, i, t - 1 + r);
            }
        };
    }
    function a(e, t, r = 0) {
        return (s, n)=>{
            let i = e(n);
            let a = t(n);
            if (i > a) {
                return i;
            }
            {
                let e = a - i;
                if (r >= e) {
                    return sb(s, i, a);
                }
                {
                    let t = (e - r) / 2;
                    return i + sb(s, 0, e - t) + sb(s, 0, t);
                }
            }
        };
    }
    function o(e) {
        let t = e.reduce((acc, item, index)=>acc + item.weight, 0);
        return (r, s)=>{
            let n = r.nextInt(t);
            for (let t of e){
                if ((n -= t.weight) <= 0) {
                    return t.data(r, s);
                }
            }
            return 0;
        };
    }
    e.fromJson = function e(u) {
        let c = LM.readObject(u) ?? {};
        switch(LM.readString(c.type)?.replace(/^minecraft:/, "")){
            case undefined:
                return t(s.fromJson(u));
            case "constant":
                return t(s.fromJson(c.value));
            case "uniform":
                return r(s.fromJson(c.min_inclusive), s.fromJson(c.max_inclusive));
            case "biased_to_bottom":
                return n(s.fromJson(c.min_inclusive), s.fromJson(c.max_inclusive), LM.readInt(c.inner));
            case "very_biased_to_bottom":
                return i(s.fromJson(c.min_inclusive), s.fromJson(c.max_inclusive), LM.readInt(c.inner));
            case "trapezoid":
                return a(s.fromJson(c.min_inclusive), s.fromJson(c.max_inclusive), LM.readInt(c.plateau));
            case "weighted_list":
                return o(LM.readArray(c.distribution, (t)=>{
                    let r = LM.readObject(t) ?? {};
                    return {
                        weight: LM.readInt(r.weight) ?? 1,
                        data: e(r.data)
                    };
                }) ?? []);
        }
        return ()=>0;
    };
    e.constant = t;
    e.uniform = r;
    e.biased_to_bottom = n;
    e.very_biased_to_bottom = i;
    e.trapezoid = a;
    e.weighted_list = o;
})(d = d || (d = {}));
class L {
    static fromJson(e) {
        let t = LM.readObject(e) ?? {};
        switch(LM.readString(t.element_type)?.replace(/^minecraft:/, "")){
            case "single_pool_element":
            case "legacy_single_pool_element":
                let r = gw.parse(LM.readString(t.location) ?? "");
                return new L.SinlgePoolElement({
                    key: ()=>r,
                    value: ()=>oE.REGISTRY.get(r) ?? oE.EMPTY
                });
            case "list_pool_element":
                let s = LM.readArray("elements", L.fromJson) ?? [];
                return new L.ListPoolElement(s);
            case "feature_pool_element":
                return new L.FeaturePoolElement;
            default:
                return new L.EmptyPoolElement;
        }
    }
}
(function(e) {
    class t extends e {
        getBoundingBox(e, t) {
            throw Error("Invalid call of EmptyPoolElement");
        }
        getShuffledJigsawBlocks(e, t) {
            return [];
        }
        toString() {
            return "[Empty Pool Element]";
        }
    }
    e.EmptyPoolElement = t;
    class r extends e {
        defaultJigsawNBT;
        constructor(){
            super();
            let e = new Map;
            e.set("name", new Gz("minecraft:bottom"));
            e.set("final_state", new Gz("minecraft:air"));
            e.set("pool", new Gz("minecraft:empty"));
            e.set("target", new Gz("minecraft:empty"));
            e.set("joint", new Gz("rollable"));
            this.defaultJigsawNBT = new GJ(e);
        }
        getBoundingBox(e, t) {
            return [
                e,
                e
            ];
        }
        getShuffledJigsawBlocks(e, t) {
            return [
                {
                    pos: [
                        0,
                        0,
                        0
                    ],
                    state: new Tm(gw.create("jigsaw"), {
                        orientation: "down_south"
                    }),
                    nbt: this.defaultJigsawNBT
                }
            ];
        }
        toString() {
            return "[Feature Pool Element]";
        }
    }
    e.FeaturePoolElement = r;
    class s extends e {
        template;
        static JIGSAW_ID = gw.parse("jigsaw");
        constructor(e){
            super();
            this.template = e;
        }
        getBoundingBox(e, t) {
            let r = IX.offset(this.template.value().getSize(), -1, -1, -1);
            let s = IX.add(oE.transform(r, t, IX.ZERO), e);
            return [
                IX.create(Math.min(e[0], s[0]), e[1], Math.min(e[2], s[2])),
                IX.create(Math.max(e[0], s[0]), s[1], Math.max(e[2], s[2]))
            ];
        }
        getShuffledJigsawBlocks(e, t) {
            let r = this.template.value().getBlocks().filter((e)=>e.state.getName().equals(s.JIGSAW_ID));
            r.forEach((t)=>t.pos = oE.transform(t.pos, e, IX.ZERO));
            k4(r, t);
            return r;
        }
        toString() {
            return `[Single Pool Element: ${this.template.key()}]`;
        }
    }
    e.SinlgePoolElement = s;
    class n extends e {
        elements;
        constructor(e){
            super();
            this.elements = e;
        }
        getBoundingBox(e, t) {
            let r;
            let s;
            for (let n of this.elements){
                let i = n.getBoundingBox(e, t);
                if (r && s) {
                    r[0] = Math.min(r[0], i[0][0]);
                    r[1] = Math.min(r[1], i[0][1]);
                    r[2] = Math.min(r[2], i[0][2]);
                    s[0] = Math.min(r[0], i[1][0]);
                    s[1] = Math.min(r[1], i[1][1]);
                    s[2] = Math.min(r[2], i[1][2]);
                } else {
                    r = i[0];
                    s = i[1];
                }
            }
            return [
                r,
                s
            ];
        }
        getShuffledJigsawBlocks(e, t) {
            return this.elements[0].getShuffledJigsawBlocks(e, t);
        }
        toString() {
            return `[List Pool Element: ${"; ".concat(...this.elements.map((e)=>e.toString()))}]`;
        }
    }
    e.ListPoolElement = n;
})(L = L || (L = {}));
class E {
    rawTemplates;
    fallback;
    static REGISTRY = OR.createAndRegister("worldgen/template_pool", E.fromJson);
    totalWeight;
    constructor(e, t){
        this.rawTemplates = e;
        this.fallback = t;
        this.totalWeight = e.reduce((acc, item)=>acc + item.weight, 0);
    }
    static structurePoolParser = Rd.parser(E.REGISTRY, E.fromJson);
    static fromJson(e) {
        let t = LM.readObject(e) ?? {};
        let r = E.structurePoolParser(t.fallback ?? "");
        return new E(LM.readArray(t.elements, (e)=>{
            let t = LM.readObject(e) ?? {};
            return {
                element: L.fromJson(t.element),
                weight: LM.readInt(t.weight) ?? 1
            };
        }) ?? [], r);
    }
    getRandomTemplate(e) {
        let t = e.nextInt(this.totalWeight);
        for (let e of this.rawTemplates){
            if ((t -= e.weight) < 0) {
                return e.element;
            }
        }
        return this.rawTemplates[this.rawTemplates.length - 1].element;
    }
}
class N {
    settings;
    constructor(e){
        this.settings = e;
    }
    onTopOfChunkCenter(e, t, r, s = "WORLD_SURFACE_WG") {
        let n = (t << 4) + 8;
        let i = (r << 4) + 8;
        return [
            n,
            e.chunkGenerator.getBaseHeight(n, i, s, e.randomState) - 1,
            i
        ];
    }
    getLowestY(e, t, r, s, n) {
        return Math.min(e.chunkGenerator.getBaseHeight(t, r, "WORLD_SURFACE_WG", e.randomState) - 1, e.chunkGenerator.getBaseHeight(t, r + n, "WORLD_SURFACE_WG", e.randomState) - 1, e.chunkGenerator.getBaseHeight(t + s, r, "WORLD_SURFACE_WG", e.randomState) - 1, e.chunkGenerator.getBaseHeight(t + s, r + n, "WORLD_SURFACE_WG", e.randomState) - 1);
    }
    getLowestYIn5by5BoxOffset7Blocks(e, t, r, s) {
        let n = 5;
        let i = 5;
        if (s === pL.CLOCKWISE_90) {
            n = -5;
        } else if (s === pL.CLOCKWISE_180) {
            n = -5;
            i = -5;
        } else if (s === pL.COUNTERCLOCKWISE_90) {
            i = -5;
        }
        let a = (t << 4) + 7;
        let o = (r << 4) + 7;
        return IX.create(a, this.getLowestY(e, a, o, n, i), o);
    }
    tryGenerate(e, t, r) {
        let s = Vc.fromLargeFeatureSeed(r.seed, e, t);
        let n = this.findGenerationPoint(e, t, s, r);
        if (n === undefined) {
            return;
        }
        let i = r.biomeSource.getBiome(n[0] >> 2, n[1] >> 2, n[2] >> 2, r.randomState.sampler);
        if ([
            ...this.settings.validBiomes.getEntries()
        ].findIndex((e)=>e.key()?.equals(i)) >= 0) {
            return n;
        }
    }
}
(function(e) {
    e.REGISTRY = OR.createAndRegister("worldgen/structure", s);
    class t {
        validBiomes;
        constructor(e){
            this.validBiomes = e;
        }
    }
    e.StructureSettings = t;
    let r = Rd.parser(E.REGISTRY, E.fromJson);
    function s(e) {
        let s = Lx.parser(w.BIOME);
        let i = L_1.readObject(e) ?? {};
        let a = new t(s(i.biomes).value());
        switch(L_1.readString(i.type)?.replace(/^minecraft:/, "")){
            case "buried_treasure":
                break;
            case "desert_pyramid":
                return new c(a);
            case "end_city":
                return new h(a);
            case "fortress":
            case "nether_fossil":
                return new m(a);
            case "igloo":
                return new p(a);
            case "jigsaw":
                let u = d.fromJson(i.start_height);
                let v = r(i.start_pool);
                let L = L_1.readString(i.start_jigsaw_name);
                let E = L ? gw.parse(L) : undefined;
                let A = l.fromJson(i.project_start_to_heightmap);
                let R = n.DimensionPadding.fromJson(i.dimension_padding);
                return new n(a, v, u, A, E, R);
            case "jungle_temple":
                return new g(a);
            case "mineshaft":
                return new x(a, L_1.readString(i.mineshaft_type) === "mesa" ? "mesa" : "normal");
            case "ocean_monument":
                return new b(a);
            case "ocean_ruin":
                return new y(a);
            case "ruined_portal":
                return new _(a);
            case "shipwreck":
                return new M(a, L_1.readBoolean(i.is_beached) ?? false);
            case "stronghold":
                return new I(a);
            case "swamp_hut":
                return new N(a);
            case "woodland_mansion":
                return new T(a);
        }
        return new o(a);
    }
    e.fromJson = s;
    class n extends e {
        startingPoolHolder;
        startHeight;
        projectStartToHeightmap;
        startJigsawName;
        dimensionPadding;
        constructor(e, t, r, s, n, i){
            super(e);
            this.startingPoolHolder = t;
            this.startHeight = r;
            this.projectStartToHeightmap = s;
            this.startJigsawName = n;
            this.dimensionPadding = i;
        }
        findGenerationPoint(e, t, r, s) {
            let i = this.startHeight(r, s.chunkGenerator.getWorldgenContext());
            let a = IX.create(e << 4, i, t << 4);
            let o = pL.getRandom(r);
            let u = this.startingPoolHolder.value().getRandomTemplate(r);
            if (!(u instanceof L.EmptyPoolElement)) {
                let e;
                let t;
                if (this.startJigsawName) {
                    let t = n.getRandomNamedJigsaw(u, this.startJigsawName, o, r);
                    if (t === undefined) {
                        return;
                    }
                    e = t;
                } else {
                    e = IX.ZERO;
                }
                let i = IX.subtract(a, e);
                let c = u.getBoundingBox(i, o);
                let h = (c[1][0] + c[0][0]) / 2 | 0;
                let l = (c[1][2] + c[0][2]) / 2 | 0;
                t = this.projectStartToHeightmap ? a[1] + s.chunkGenerator.getBaseHeight(h, l, this.projectStartToHeightmap, s.randomState) : i[1];
                c.forEach((e)=>e[1] += t - c[0][1] - 1);
                if (n.isStartTooCloseToWorldHeightLimits(this.dimensionPadding, c, s.levelHeight)) {
                    return;
                }
                return IX.create(h, t + e[1], l);
            }
        }
        static isStartTooCloseToWorldHeightLimits(e, t, r) {
            if (e === n.DimensionPadding.ZERO) {
                return false;
            }
            let s = r.minY + e.bottom;
            let i = r.minY + r.height - e.top;
            return t[0][1] < s || t[1][1] > i;
        }
        static getRandomNamedJigsaw(e, t, r, s) {
            for (let n of e.getShuffledJigsawBlocks(r, s)){
                if (gw.parse(n.nbt?.getString("name") ?? "minecraft:empty").equals(t)) {
                    return n.pos;
                }
            }
        }
    }
    e.JigsawStructure = n;
    const i = n = e.JigsawStructure || (e.JigsawStructure = {});
    class a {
        top;
        bottom;
        static ZERO = new a(0, 0);
        constructor(e, t){
            this.top = e;
            this.bottom = t;
        }
        static fromJson(e) {
            if (e === undefined) {
                return a.ZERO;
            }
            if (typeof e === "number") {
                return new a(e, e);
            }
            let t = L_1.readObject(e) ?? {};
            return new a(L_1.readInt(t.top) ?? 0, L_1.readInt(t.bottom) ?? 0);
        }
    }
    i.DimensionPadding = a;
    class o extends e {
        findGenerationPoint(e, t, r, s) {
            return this.onTopOfChunkCenter(s, e, t, "OCEAN_FLOOR_WG");
        }
    }
    e.BuriedTreasureStructure = o;
    class u extends e {
        width;
        depth;
        constructor(e, t, r){
            super(e);
            this.width = t;
            this.depth = r;
        }
        findGenerationPoint(e, t, r, s) {
            if (!(this.getLowestY(s, e << 4, t << 4, this.width, this.depth) < s.chunkGenerator.getWorldgenContext().seaLevel)) {
                return this.onTopOfChunkCenter(s, e, t);
            }
        }
    }
    class c extends u {
        constructor(e){
            super(e, 21, 21);
        }
    }
    e.DesertPyramidStructure = c;
    class h extends e {
        findGenerationPoint(e, t, r, s) {
            let n = pL.getRandom(r);
            let i = this.getLowestYIn5by5BoxOffset7Blocks(s, e, t, n);
            if (!(i[1] < 60)) {
                return i;
            }
        }
    }
    e.EndCityStructure = h;
    class m extends e {
        findGenerationPoint(e, t) {
            return IX.create(e << 4, 64, t << 4);
        }
    }
    e.NetherFortressStructure = m;
    class p extends e {
        findGenerationPoint(e, t, r, s) {
            return this.onTopOfChunkCenter(s, e, t);
        }
    }
    e.IglooStructure = p;
    class g extends u {
        constructor(e){
            super(e, 12, 15);
        }
    }
    e.JungleTempleStructure = g;
    class x extends e {
        type;
        constructor(e, t){
            super(e);
            this.type = t;
        }
        findGenerationPoint(e, t, r, s) {
            throw Error("Method not implemented.");
        }
    }
    e.MineshaftStructure = x;
    class v extends e {
        height;
        constructor(e, t){
            super(e);
            this.height = t;
        }
        findGenerationPoint(e, t) {
            throw Error("Method not implemented.");
        }
    }
    e.NetherFossilStructure = v;
    class b extends e {
        findGenerationPoint(e, t) {
            throw Error("Method not implemented.");
        }
    }
    e.OceanMonumentStructure = b;
    class y extends e {
        findGenerationPoint(e, t, r, s) {
            return this.onTopOfChunkCenter(s, e, t, "OCEAN_FLOOR_WG");
        }
    }
    e.OceanRuinStructure = y;
    class _ extends e {
        findGenerationPoint(e, t) {
            throw Error("Method not implemented.");
        }
    }
    e.RuinedPortalStructure = _;
    class M extends e {
        isBeached;
        constructor(e, t){
            super(e);
            this.isBeached = t;
        }
        findGenerationPoint(e, t, r, s) {
            return this.onTopOfChunkCenter(s, e, t, this.isBeached ? "WORLD_SURFACE_WG" : "OCEAN_FLOOR_WG");
        }
    }
    e.ShipwreckStructure = M;
    class I extends e {
        findGenerationPoint(e, t) {
            return IX.create(e << 4, 0, t << 4);
        }
    }
    e.StrongholdStructure = I;
    class N extends e {
        findGenerationPoint(e, t, r, s) {
            return this.onTopOfChunkCenter(s, e, t);
        }
    }
    e.SwampHutStructure = N;
    class T extends e {
        findGenerationPoint(e, t, r, s) {
            let n = pL.getRandom(r);
            let i = this.getLowestYIn5by5BoxOffset7Blocks(s, e, t, n);
            if (!(i[1] < 60)) {
                return i;
            }
        }
    }
    e.WoodlandMansionStructure = T;
})(N = N || (N = {}));
class T {
    structures;
    placement;
    static REGISTRY = OR.createAndRegister("worldgen/structure_set", T.fromJson);
    constructor(e, t){
        this.structures = e;
        this.placement = t;
    }
    static fromJson(e) {
        let t = LM.readObject(e) ?? {};
        let r = LM.readArray(t.structures, T.StructureSelectionEntry.fromJson) ?? [];
        let s = A.fromJson(t.placement);
        return new T(r, s);
    }
    getStructureInChunk(e, t, r) {
        if ((this.placement.prepare(r.biomeSource, r.randomState.sampler, r.seed), this.placement.isStructureChunk(r.seed, e, t)) && this.structures.length !== 0) {
            if (this.structures.length === 1) {
                let s = this.structures[0].structure.value().tryGenerate(e, t, r);
                if (s !== undefined) {
                    return {
                        id: this.structures[0].structure.key(),
                        pos: s
                    };
                }
            } else {
                let s = Vc.fromLargeFeatureSeed(r.seed, e, t);
                let n = Object.assign([], this.structures);
                let i = n.reduce((acc, item, index)=>acc + item.weight, 0);
                while(n.length > 0){
                    let a;
                    let o;
                    let u = s.nextInt(i);
                    for ([a, o] of n.entries()){
                        if ((u -= o.weight) < 0) {
                            break;
                        }
                    }
                    let c = o.structure.value().tryGenerate(e, t, r);
                    if (c !== undefined) {
                        return {
                            id: o.structure.key(),
                            pos: c
                        };
                    }
                    n.splice(a, 1);
                    i -= o.weight;
                }
            }
        }
    }
}
(function(e) {
    class t {
        structure;
        weight;
        constructor(e, t){
            this.structure = e;
            this.weight = t;
        }
        static fromJson(e) {
            let r = LM.readObject(e) ?? {};
            return new t(Rd.reference(N.REGISTRY, gw.parse(LM.readString(r.structure) ?? "minecraft:empty")), LM.readInt(r.weight) ?? 1);
        }
    }
    e.StructureSelectionEntry = t;
})(T = T || (T = {}));
class A {
    locateOffset;
    frequencyReductionMethod;
    frequency;
    salt;
    exclusionZone;
    constructor(e, t, r, s, n){
        this.locateOffset = e;
        this.frequencyReductionMethod = t;
        this.frequency = r;
        this.salt = s;
        this.exclusionZone = n;
    }
    static fromJson(e) {
        let t = LM.readObject(e) ?? {};
        let r = LM.readString(t.type)?.replace(/^minecraft:/, "");
        let s = IX.fromJson(t.locate_offset);
        let n = A.FrequencyReducer.fromType(LM.readString(t.frequency_reduction_method) ?? "default");
        let i = LM.readNumber(t.frequency) ?? 1;
        let a = LM.readInt(t.salt) ?? 0;
        let o = "exclusion_zone" in t ? A.ExclusionZone.fromJson(t.exclusion_zone) : undefined;
        switch(r){
            case "random_spread":
                let u = LM.readInt(t.spacing) ?? 1;
                let c = LM.readInt(t.separation) ?? 1;
                let h = A.SpreadType.fromJson(t.spread_type);
                return new A.RandomSpreadStructurePlacement(s, n, i, a, o, u, c, h);
            case "concentric_rings":
                let l = LM.readInt(t.distance) ?? 1;
                let d = LM.readInt(t.spread) ?? 1;
                let m = LM.readInt(t.count) ?? 1;
                let g = Lx.parser(w.BIOME)(t.preferred_biomes);
                return new A.ConcentricRingsStructurePlacement(s, n, i, a, o, l, d, m, g);
        }
        return new A.RandomSpreadStructurePlacement([
            0,
            0,
            0
        ], A.FrequencyReducer.ProbabilityReducer, 1, 0, undefined, 1, 1, "linear");
    }
    isStructureChunk(e, t, r) {
        return !!this.isPlacementChunk(e, t, r) && (!(this.frequency < 1) || !!this.frequencyReductionMethod(e, this.salt, t, r, this.frequency)) && !(this.exclusionZone && this.exclusionZone.isPlacementForbidden(e, t, r)) && true;
    }
    prepare(e, t, r) {}
}
(function(e) {
    ((e)=>{
        function t(e, t, r, s, n) {
            return Vc.fromLargeFeatureWithSalt(e, t, r, s).nextFloat() < n;
        }
        function r(e, t, r, s, n) {
            return Vc.fromLargeFeatureSeed(e, r, s).nextDouble() < n;
        }
        function s(e, t, r, s, n) {
            return Vc.fromLargeFeatureWithSalt(e, r, s, 10387320).nextFloat() < n;
        }
        function n(e, t, r, s, n) {
            let i = new Vc(BigInt(r >> 4 ^ s >> 4 << 4) ^ e);
            i.nextInt();
            return i.nextInt(Math.floor(1 / n)) === 0;
        }
        e.fromType = function(e) {
            switch(e){
                case "legacy_type_1":
                    return n;
                case "legacy_type_2":
                    return s;
                case "legacy_type_3":
                    return r;
                default:
                    return t;
            }
        };
        e.ProbabilityReducer = t;
        e.LegacyProbabilityReducerWithDouble = r;
        e.LegacyArbitrarySaltProbabilityReducer = s;
        e.LegacyPillagerOutpostReducer = n;
    })(e.FrequencyReducer || (e.FrequencyReducer = {}));
    class t {
        otherSet;
        chunkCount;
        constructor(e, t){
            this.otherSet = e;
            this.chunkCount = t;
        }
        static fromJson(e) {
            let r = LM.readObject(e) ?? {};
            return new t(Rd.reference(T.REGISTRY, gw.parse(LM.readString(r.other_set) ?? "")), LM.readInt(r.chunk_count) ?? 1);
        }
        isPlacementForbidden(e, t, r) {
            let placement = this.otherSet.value().placement;
            return placement.getPotentialStructureChunks(e, t - this.chunkCount, r - this.chunkCount, t + this.chunkCount, r + this.chunkCount).findIndex((n)=>Math.abs(n[0] - t) <= this.chunkCount && Math.abs(n[1] - r) <= this.chunkCount && placement.isStructureChunk(e, n[0], n[1])) >= 0;
        }
    }
    e.ExclusionZone = t;
    (e.SpreadType || (e.SpreadType = {})).fromJson = function(e) {
        if ((LM.readString(e) ?? "linear") === "triangular") {
            return "triangular";
        }
        return "linear";
    };
    class r extends e {
        spacing;
        separation;
        spreadType;
        constructor(e, t, r, s, n, i, a, o){
            super(e, t, r, s, n);
            this.spacing = i;
            this.separation = a;
            this.spreadType = o;
        }
        evaluateSpread(e, t) {
            switch(this.spreadType){
                case "linear":
                    return e.nextInt(t);
                case "triangular":
                    return Math.floor((e.nextInt(t) + e.nextInt(t)) / 2);
            }
        }
        getPotentialStructureChunk(e, t, r) {
            let s = Math.floor(t / this.spacing);
            let n = Math.floor(r / this.spacing);
            let i = Vc.fromLargeFeatureWithSalt(e, s, n, this.salt);
            let a = this.spacing - this.separation;
            let o = this.evaluateSpread(i, a);
            let u = this.evaluateSpread(i, a);
            return [
                s * this.spacing + o,
                n * this.spacing + u
            ];
        }
        isPlacementChunk(e, t, r) {
            let [s, n] = this.getPotentialStructureChunk(e, t, r);
            return s === t && n === r;
        }
        getPotentialStructureChunks(e, t, r, s, n) {
            let i = [];
            for(let a = Math.floor(t / this.spacing) * this.spacing; a <= s; a += this.spacing){
                for(let t = Math.floor(r / this.spacing) * this.spacing; t <= n; t += this.spacing){
                    i.push(this.getPotentialStructureChunk(e, a, t));
                }
            }
            return i;
        }
    }
    e.RandomSpreadStructurePlacement = r;
    class s extends e {
        distance;
        spread;
        count;
        preferredBiomes;
        positions;
        constructor(e, t, r, s, n, i, a, o, u){
            super(e, t, r, s, n);
            this.distance = i;
            this.spread = a;
            this.count = o;
            this.preferredBiomes = u;
        }
        prepare(e, t, r) {
            if (this.positions !== undefined || (this.positions = [], this.count === 0)) {
                return;
            }
            let s = new Vc(r);
            let n = s.nextDouble() * Math.PI * 2;
            let spread = this.spread;
            let a = 0;
            let o = 0;
            let u = [
                ...this.preferredBiomes.value().getEntries()
            ].flatMap((e)=>e.key() ?? []);
            for(let c = 0; c < this.count; c++){
                let r = 4 * this.distance + this.distance * a * 6 + (s.nextDouble() - 0.5) * this.distance * 2.5;
                let l = Math.round(Math.cos(n) * r);
                let d = Math.round(Math.sin(n) * r);
                let f = (l << 4) + 8;
                let m = (d << 4) + 8;
                let p = s.fork();
                let real = ()=>{
                    let r = h.findBiomeHorizontal(e, f, 0, m, 112, (e)=>u.findIndex((t)=>t.equals(e)) >= 0, p, t);
                    if (r) {
                        return [
                            r.pos[0] >> 4,
                            r.pos[2] >> 4
                        ];
                    }
                    return [
                        l,
                        d
                    ];
                };
                this.positions.push({
                    center: [
                        l,
                        d
                    ],
                    real
                });
                n += 2 * Math.PI / spread;
                if (++o == spread) {
                    a++;
                    o = 0;
                    spread += 2 * spread / (a + 1);
                    spread = Math.min(spread, this.count - c);
                    n += s.nextDouble() * Math.PI * 2;
                }
            }
        }
        isPlacementChunk(e, t, r) {
            if (this.positions === undefined) {
                console.warn("trying to access concentric rings placement before position calculation");
                return false;
            }
            return this.getPotentialStructureChunks(e, t, r, t, r).findIndex((e)=>e[0] === t && e[1] === r) >= 0;
        }
        getPotentialStructureChunks(e, t, r, s, n) {
            if (this.positions === undefined) {
                console.warn("trying to access concentric rings placement before position calculation");
                return [];
            }
            let i = [];
            for (let e of this.positions){
                if (!(e.center[0] < t - 7 || e.center[0] > s + 7 || e.center[1] < r - 7 || e.center[1] > n + 7)) {
                    if (e.real instanceof Function) {
                        e.real = e.real();
                    }
                    i.push(e.real);
                }
            }
            return i;
        }
    }
    e.ConcentricRingsStructurePlacement = s;
})(A = A || (A = {}));
