import { CX, gw } from "./module-45723.js";
import { qE } from "./module-19023.js";
import { LM } from "./module-13402.js";
import { V } from "./module-73475.js";
import { L } from "./module-47795.js";
import { P } from "./module-19881.js";
import { e as e_1 } from "./module-31206.js";
import { Qr, Tl, Z8, eL, hs, vt } from "./module-85250.js";
import { GJ, LM as LM_1, gw as gw_1, t$, y6 } from "./module-82084.js";
let s;
let n;
(function(e) {
    e.fromJson = function(e) {
        let d = LM_1.readObject(e) ?? {};
        let g = LM_1.readString(d.type)?.replace(/^minecraft:/, "");
        switch(g){
            case "bed":
                return new t(gw_1.parse(LM_1.readString(d.texture) ?? ""));
            case "banner":
                return new r(LM_1.readString(d.color) ?? "");
            case "conduit":
                return new s;
            case "chest":
                return new n(gw_1.parse(LM_1.readString(d.texture) ?? ""), LM_1.readNumber(d.openness) ?? 0);
            case "head":
                return new i(LM_1.readString(d.kind) ?? "", typeof d.texture === "string" ? gw_1.parse(d.texture) : undefined, LM_1.readNumber(d.animation) ?? 0);
            case "player_head":
                return new i("player", undefined, 0);
            case "shulker_box":
                return new a(gw_1.parse(LM_1.readString(d.texture) ?? ""), LM_1.readNumber(d.openness) ?? 0, LM_1.readString(d.orientation) ?? "up");
            case "shield":
                return new o;
            case "trident":
                return new u;
            case "decorated_pot":
                return new c;
            case "standing_sign":
                return new h(LM_1.readString(d.wood_type) ?? "", typeof d.texture === "string" ? gw_1.parse(d.texture) : undefined);
            case "hanging_sign":
                return new m(LM_1.readString(d.wood_type) ?? "", typeof d.texture === "string" ? gw_1.parse(d.texture) : undefined);
            case "copper_golem_statue":
                {
                    let e = LM_1.readString(d.texture) ?? "";
                    let t = e.substring(e.lastIndexOf("/") + 1);
                    let r = t.endsWith(".png") ? t.slice(0, -4) : t;
                    return new p(gw_1.parse(r));
                }
            default:
                console.warn(`[deepslate]: Unknown special model ${g}`);
                return {
                    getMesh: ()=>new e_1
                };
        }
    };
    class t {
        renderer;
        constructor(e){
            this.renderer = y6.bedRenderer(e);
        }
        getMesh(e, t) {
            let r = this.renderer("head", t);
            let s = this.renderer("foot", t);
            let n = vt();
            Tl(n, n, [
                0,
                0,
                -16
            ]);
            return r.merge(s.transform(n));
        }
    }
    class r {
        renderer;
        constructor(e){
            this.renderer = y6.bannerRenderer(e);
        }
        getMesh(e, t) {
            let r = e.getComponent("banner_patterns", undefined);
            let s = r?.isList() && r.getType() === t$.Compound ? r : undefined;
            let n = vt();
            Tl(n, n, [
                8,
                24,
                8
            ]);
            Z8(n, n, Math.PI);
            hs(n, n, [
                2 / 3,
                2 / 3,
                2 / 3
            ]);
            Tl(n, n, [
                -8,
                -24,
                -8
            ]);
            return this.renderer(t, s).transform(n);
        }
    }
    class s {
        getMesh(e, t) {
            return y6.conduitRenderer(t);
        }
    }
    class n {
        renderer;
        constructor(e, t){
            this.renderer = y6.chestRenderer(e);
        }
        getMesh(e, t) {
            let r = vt();
            Tl(r, r, [
                8,
                8,
                8
            ]);
            Z8(r, r, Math.PI);
            Tl(r, r, [
                -8,
                -8,
                -8
            ]);
            return this.renderer(t).transform(r);
        }
    }
    class i {
        renderer;
        constructor(e, t, r){
            this.renderer = (({
                skeleton: ()=>y6.headRenderer(t ?? gw_1.create("skeleton/skeleton"), 2),
                wither_skeleton: ()=>y6.headRenderer(t ?? gw_1.create("skeleton/wither_skeleton"), 2),
                zombie: ()=>y6.headRenderer(t ?? gw_1.create("zombie/zombie"), 1),
                creeper: ()=>y6.headRenderer(t ?? gw_1.create("creeper/creeper"), 2),
                dragon: ()=>y6.dragonHeadRenderer(t),
                piglin: ()=>y6.piglinHeadRenderer(t),
                player: ()=>y6.headRenderer(t ?? gw_1.create("player/wide/steve"), 1)
            })[e] ?? (()=>()=>new e_1))();
        }
        getMesh(e, t) {
            return this.renderer(t);
        }
    }
    class a {
        renderer;
        constructor(e, t, r){
            this.renderer = y6.shulkerBoxRenderer(e);
        }
        getMesh(e, t) {
            return this.renderer(t);
        }
    }
    class o {
        getMesh(e, t) {
            let r = [];
            let s = e.getComponent("banner_patterns", undefined);
            let n = s?.isList() && s.getType() === t$.Compound ? s : undefined;
            let color = e.getComponent("base_color", undefined)?.getAsString();
            if (!color && (n?.length ?? 0) > 0) {
                color = "white";
            }
            if (color) {
                r.push({
                    color,
                    pattern: "base"
                });
                n?.forEach((e)=>{
                    r.push({
                        pattern: gw_1.parse(e.getString("pattern")).path,
                        color: e.getString("color")
                    });
                });
            }
            let a = y6.shieldRenderer(t, r);
            let o = vt();
            Tl(o, o, [
                -3,
                1,
                0
            ]);
            eL(o, o, -10 * Math.PI / 180);
            Z8(o, o, -10 * Math.PI / 180);
            Qr(o, o, -5 * Math.PI / 180);
            return a.transform(o);
        }
    }
    class u {
        getMesh(e, t) {
            return new e_1;
        }
    }
    class c {
        getMesh(e, t) {
            return y6.decoratedPotRenderer(t);
        }
    }
    class h {
        renderer;
        constructor(e, t){
            this.renderer = y6.signRenderer(t ?? gw_1.create(e));
        }
        getMesh(e, t) {
            return this.renderer(t);
        }
    }
    class m {
        renderer;
        constructor(e, t){
            this.renderer = y6.hangingSignRenderer(t ?? gw_1.create(e));
        }
        getMesh(e, t) {
            return this.renderer(false, t);
        }
    }
    class p {
        renderer;
        constructor(e){
            this.renderer = y6.copperGolemStatueRenderer(e);
        }
        getMesh(e, t) {
            let r = e.getComponent("block_state", undefined);
            let s = "standing";
            if (r instanceof GJ) {
                s = r.getString("copper_golem_pose") || s;
            }
            let n = vt();
            Tl(n, n, [
                8,
                12,
                8
            ]);
            Z8(n, n, Math.PI);
            Qr(n, n, Math.PI);
            Tl(n, n, [
                -8,
                -12,
                -8
            ]);
            return this.renderer(t, s).transform(n);
        }
    }
})(s = s || (s = {}));
let m = new e_1;
(function(e) {
    e.fromJson = function(a) {
        let u = LM.readObject(a) ?? {};
        let c = LM.readString(u.type)?.replace(/^minecraft:/, "");
        switch(c){
            case "empty":
                return new t;
            case "model":
                return new r(gw.parse(LM.readString(u.model) ?? ""), LM.readArray(u.tints, P.fromJson) ?? []);
            case "composite":
                return new n(LM.readArray(u.models, e.fromJson) ?? []);
            case "condition":
                return new d(d.propertyFromJson(u), e.fromJson(u.on_true), e.fromJson(u.on_false));
            case "select":
                return new f(f.propertyFromJson(u), new Map(LM.readArray(u.cases, (e)=>LM.readObject(e) ?? {})?.flatMap((t)=>{
                    let r = e.fromJson(t.model);
                    if (Array.isArray(t.when)) {
                        return t.when.map((e)=>[
                                LM.readString(e) ?? "",
                                r
                            ]);
                    }
                    return [
                        [
                            LM.readString(t.when) ?? "",
                            r
                        ]
                    ];
                })), u.fallback ? e.fromJson(u.fallback) : undefined);
            case "range_dispatch":
                return new p(p.propertyFromJson(u), LM.readNumber(u.scale) ?? 1, LM.readArray(u.entries, (t)=>{
                    let r = LM.readObject(t) ?? {};
                    return {
                        threshold: LM.readNumber(r.threshold) ?? 0,
                        model: e.fromJson(r.model)
                    };
                }) ?? [], u.fallback ? e.fromJson(u.fallback) : undefined);
            case "special":
                return new g(s.fromJson(u.model), gw.parse(LM.readString(u.base) ?? ""));
            case "bundle/selected_item":
                return new x;
            default:
                console.warn(`[deepslate]: Unknown item model type '${c}'`);
                return {
                    getMesh: ()=>new e_1
                };
        }
    };
    class t {
        getMesh(e, t, r) {
            return new e_1;
        }
    }
    e.Empty = t;
    class r {
        modelId;
        tints;
        constructor(e, t){
            this.modelId = e;
            this.tints = t;
        }
        getMesh(e, t, r) {
            let s = t.getBlockModel(this.modelId);
            if (!s) {
                console.warn(`[deepslate]: Model '${this.modelId}' does not exist`);
                return new e_1;
            }
            let n = (s)=>{
                if (s < this.tints.length) {
                    return this.tints[s].getTint(e, t, r);
                }
                return [
                    1,
                    1,
                    1
                ];
            };
            let i = s.getMesh(t, V.none(), n);
            i.transform(s.getDisplayTransform(r.display_context ?? "gui"));
            return i;
        }
    }
    e.Model = r;
    class n {
        models;
        constructor(e){
            this.models = e;
        }
        getMesh(e, t, r) {
            let s = new e_1;
            this.models.forEach((n)=>s.merge(n.getMesh(e, t, r)));
            return s;
        }
    }
    e.Composite = n;
    class d {
        property;
        onTrue;
        onFalse;
        constructor(e, t, r){
            this.property = e;
            this.onTrue = t;
            this.onFalse = r;
        }
        getMesh(e, t, r) {
            return (this.property(e, t, r) ? this.onTrue : this.onFalse).getMesh(e, t, r);
        }
        static propertyFromJson(e) {
            let t = LM.readString(e.property)?.replace(/^minecraft:/, "");
            switch(t){
                case "fishing_rod/cast":
                case "selected":
                case "carried":
                case "extended_view":
                    return (e, r, s)=>s[t] ?? false;
                case "view_entity":
                    return (e, t, r)=>r.context_entity_is_view_entity ?? false;
                case "using_item":
                    return (e, t, r)=>(r.use_duration ?? -1) >= 0;
                case "bundle/has_selected_item":
                    return (e, t, r)=>(r["bundle/selected_item"] ?? -1) >= 0;
                case "broken":
                    return (e, t, r)=>{
                        let s = e.getComponent("damage", t)?.getAsNumber();
                        let n = e.getComponent("max_damage", t)?.getAsNumber();
                        return s !== undefined && n !== undefined && s >= n - 1;
                    };
                case "damaged":
                    return (e, t, r)=>{
                        let s = e.getComponent("damage", t)?.getAsNumber();
                        let n = e.getComponent("max_damage", t)?.getAsNumber();
                        return s !== undefined && n !== undefined && s >= 1;
                    };
                case "has_component":
                    let r = gw.parse(LM.readString(e.component) ?? "");
                    let s = LM.readBoolean(e.ignore_default) ?? false;
                    return (e, t, n)=>e.hasComponent(r, s ? undefined : t);
                case "keybind_down":
                    let n = LM.readString(e.keybind) ?? "";
                    return (e, t, r)=>r.keybind_down?.includes(n) ?? false;
                case "custom_model_data":
                    let a = LM.readInt(e.index) ?? 0;
                    return (e, t, r)=>{
                        let s = e.getComponent("custom_model_data", t);
                        if (!s?.isCompound()) {
                            return false;
                        }
                        let n = s.getList("flags").getNumber(a);
                        return n !== undefined && n !== 0;
                    };
                default:
                    console.warn(`[deepslate]: Unknown condition property '${t}'`);
                    return ()=>false;
            }
        }
    }
    e.Condition = d;
    class f {
        property;
        cases;
        fallback;
        constructor(e, t, r){
            this.property = e;
            this.cases = t;
            this.fallback = r;
        }
        getMesh(e, t, r) {
            let s = this.property(e, t, r);
            return ((s !== null ? this.cases.get(s) : undefined) ?? this.fallback)?.getMesh(e, t, r) ?? m;
        }
        static propertyFromJson(e) {
            let t = LM.readString(e.property)?.replace(/^minecraft:/, "");
            switch(t){
                case "main_hand":
                    return (e, t, r)=>r.main_hand ?? "right";
                case "display_context":
                    return (e, t, r)=>r.display_context ?? "gui";
                case "context_dimension":
                    return (e, t, r)=>r.context_dimension?.toString() ?? null;
                case "charge_type":
                    let r = gw.create("firework_rocket");
                    return (e, t, s)=>{
                        let n = e.getComponent("charged_projectiles", t);
                        if (n?.isList() && n.length !== 0) {
                            if (n.filter((e)=>!!e.isCompound() && gw.parse(e.getString("id")).equals(r)).length > 0) {
                                return "rocket";
                            }
                            return "arrow";
                        }
                        return "none";
                    };
                case "trim_material":
                    return (e, t, r)=>{
                        let s = e.getComponent("trim", t);
                        if (s?.isCompound()) {
                            return gw.parse(s.getString("material")).toString();
                        }
                        return null;
                    };
                case "block_state":
                    let s = LM.readString(e.block_state_property) ?? "";
                    return (e, t, r)=>{
                        let n = e.getComponent("block_state", t);
                        if (n?.isCompound()) {
                            return n.getString(s);
                        }
                        return null;
                    };
                case "local_time":
                    return (e, t, r)=>"NOT IMPLEMENTED";
                case "context_entity_type":
                    return (e, t, r)=>r.context_entity_type?.toString() ?? null;
                case "custom_model_data":
                    let n = LM.readInt(e.index) ?? 0;
                    return (e, t, r)=>{
                        let s = e.getComponent("custom_model_data", t);
                        if (!s?.isCompound()) {
                            return null;
                        }
                        let i = s.getList("strings");
                        if (i.length <= n) {
                            return null;
                        }
                        return i.getString(n);
                    };
                default:
                    console.warn(`[deepslate]: Unknown select property '${t}'`);
                    return ()=>null;
            }
        }
    }
    e.Select = f;
    class p {
        property;
        scale;
        fallback;
        entries;
        constructor(e, t, r, s){
            this.property = e;
            this.scale = t;
            this.fallback = s;
            this.entries = r.sort((e, t)=>e.threshold - t.threshold);
        }
        getMesh(e, t, r) {
            let s = this.property(e, t, r) * this.scale;
            let fallback = this.fallback;
            for (let e of this.entries){
                if (e.threshold <= s) {
                    fallback = e.model;
                } else {
                    break;
                }
            }
            return fallback?.getMesh(e, t, r) ?? m;
        }
        static propertyFromJson(e) {
            let t = LM.readString(e.property)?.replace(/^minecraft:/, "");
            switch(t){
                case "bundle/fullness":
                    return (e, t, r)=>(function e(t, r) {
                            let s = t.getComponent("bundle_contents", r);
                            if (s?.isListOrArray()) {
                                return s.map((e)=>{
                                    if (e.isCompound()) {
                                        return CX.fromNbt(e);
                                    }
                                }).reduce((acc, item)=>{
                                    if (item === undefined) {
                                        return acc;
                                    }
                                    if (item.hasComponent("bundle_contents", r)) {
                                        return acc + e(item, r) + 1 / 16;
                                    }
                                    let n = item.getComponent("bees", r);
                                    if (n?.isListOrArray() && n.length > 0) {
                                        return acc + 1;
                                    }
                                    let i = item.getComponent("max_stack_size", r)?.getAsNumber() ?? 1;
                                    return acc + item.count / i;
                                }, 0);
                            }
                            return 0;
                        })(e, t);
                case "damage":
                    {
                        let t = LM.readBoolean(e.normalize) ?? true;
                        return (e, r, s)=>{
                            let n = e.getComponent("max_damage", r)?.getAsNumber() ?? 0;
                            let i = qE(e.getComponent("damage", r)?.getAsNumber() ?? 0, 0, n);
                            if (t) {
                                return qE(i / n, 0, 1);
                            }
                            return qE(i, 0, n);
                        };
                    }
                case "count":
                    {
                        let t = LM.readBoolean(e.normalize) ?? true;
                        return (e, r, s)=>{
                            let n = e.getComponent("max_stack_size", r)?.getAsNumber() ?? 1;
                            if (t) {
                                return qE(e.count / n, 0, 1);
                            }
                            return qE(e.count, 0, n);
                        };
                    }
                case "cooldown":
                    return (e, t, r)=>{
                        let s = e.getComponent("use_cooldown", t);
                        let n = s?.isCompound() ? gw.parse(s.getString("cooldown_group") ?? e.id) : e.id;
                        return r.cooldown_percentage?.[n.toString()] ?? 0;
                    };
                case "time":
                    switch(LM.readString(e.source) ?? "daytime"){
                        case "moon_phase":
                            return (e, t, r)=>(r.game_time ?? 0) / 24000 % 8 / 8;
                        case "random":
                            return (e, t, r)=>Math.random();
                        default:
                            return (e, t, r)=>{
                                let s = (r.game_time ?? 0) / 24000 % 1 - 0.25;
                                let n = 0.5 - Math.cos(s * Math.PI) / 2;
                                return (2 * s + n) / 3;
                            };
                    }
                case "compass":
                    return (e, t, r)=>r.compass_angle ?? 0;
                case "crossbow/pull":
                    return (e, t, r)=>r["crossbow/pull"] ?? 0;
                case "use_duration":
                    let r = LM.readBoolean(e.remaining) ?? true;
                    return (e, t, s)=>{
                        if (s.use_duration === undefined || s.use_duration < 0) {
                            return 0;
                        }
                        if (r) {
                            return Math.max((s.max_use_duration ?? 0) - s.use_duration, 0);
                        }
                        return s.use_duration;
                    };
                case "use_cycle":
                    let s = LM.readNumber(e.period) ?? 1;
                    return (e, t, r)=>{
                        if (r.use_duration === undefined || r.use_duration < 0) {
                            return 0;
                        }
                        return Math.max((r.max_use_duration ?? 0) - (r.use_duration ?? 0), 0) % s;
                    };
                case "custom_model_data":
                    let n = LM.readInt(e.index) ?? 0;
                    return (e, t, r)=>{
                        let s = e.getComponent("custom_model_data", t);
                        if (s?.isCompound()) {
                            return s.getList("floats").getNumber(n);
                        }
                        return 0;
                    };
                default:
                    console.warn(`[deepslate]: Unknown range dispatch property '${t}'`);
                    return ()=>0;
            }
        }
    }
    e.RangeDispatch = p;
    class g {
        specialModel;
        base;
        constructor(e, t){
            this.specialModel = e;
            this.base = t;
        }
        getMesh(e, t, r) {
            let s = this.specialModel.getMesh(e, t);
            let n = t.getBlockModel(this.base);
            if (n) {
                s.transform(n.getDisplayTransform(r.display_context ?? "gui"));
                return s;
            }
            console.warn(`[deepslate]: Special model base '${this.base}' does not exist`);
            return new e_1;
        }
    }
    e.Special = g;
    class x {
        getMesh(e, t, r) {
            let s = r["bundle/selected_item"];
            if (s === undefined || s < 0) {
                return new e_1;
            }
            let n = e.getComponent("bundle_contents", t);
            if (!n?.isListOrArray()) {
                return new e_1;
            }
            let a = n.get(s);
            if (a === undefined || !a.isCompound()) {
                return new e_1;
            }
            let o = CX.fromNbt(a);
            return L.getItemMesh(o, t, {
                ...r,
                "bundle/selected_item": -1,
                selected: false,
                carried: false,
                use_duration: -1
            });
        }
    }
    e.BundleSelectedItem = x;
})(n = n || (n = {}));
