import { C2 } from "./module-45723.js";
import { LM, Q1 } from "./module-13402.js";
export let P;
let a = [
    0,
    0,
    0
];
(function(e) {
    e.fromJson = function(e) {
        let n = LM.readObject(e) ?? {};
        let d = LM.readString(n.type)?.replace(/^minecraft:/, "");
        switch(d){
            case "constant":
                return new t(Q1.fromJson(n.value) ?? a);
            case "dye":
                return new r(Q1.fromJson(n.default) ?? a);
            case "grass":
                return new s(LM.readNumber(n.temperature) ?? 0, LM.readNumber(n.downfall) ?? 0);
            case "firework":
                return new o(Q1.fromJson(n.default) ?? a);
            case "potion":
                return new u(Q1.fromJson(n.default) ?? a);
            case "map_color":
                return new c(Q1.fromJson(n.default) ?? a);
            case "custom_model_data":
                return new h(LM.readInt(n.index) ?? 0, Q1.fromJson(n.default) ?? a);
            case "team":
                return new l(Q1.fromJson(n.default) ?? a);
            default:
                throw Error(`Invalid item tint type ${d}`);
        }
    };
    class t {
        value;
        constructor(e){
            this.value = e;
        }
        getTint(e) {
            return this.value;
        }
    }
    e.Constant = t;
    class r {
        default_color;
        constructor(e){
            this.default_color = e;
        }
        getTint(e, t) {
            let r = e.getComponent("dyed_color", t);
            if (r) {
                if (r.isCompound()) {
                    return Q1.intToRgb(r.getNumber("rgb"));
                }
                return Q1.intToRgb(r.getAsNumber());
            }
            return this.default_color;
        }
    }
    e.Dye = r;
    class s {
        temperature;
        downfall;
        constructor(e, t){
            this.temperature = e;
            this.downfall = t;
        }
        getTint(e) {
            return [
                124 / 255,
                189 / 255,
                107 / 255
            ];
        }
    }
    e.Grass = s;
    class o {
        default_color;
        constructor(e){
            this.default_color = e;
        }
        getTint(e, t) {
            let r = e.getComponent("firework_explosion", t);
            if (!r?.isCompound()) {
                return this.default_color;
            }
            let s = r.get("colors");
            if (s && s.isListOrArray()) {
                return (()=>{
                    if (s.length === 1) {
                        return Q1.intToRgb(s.get(0).getAsNumber());
                    }
                    let [e, t, r] = [
                        0,
                        0,
                        0
                    ];
                    for (let n of s.getItems()){
                        e += (16711680 & n.getAsNumber()) >> 16;
                        t += (65280 & n.getAsNumber()) >> 8;
                        r += 255 & n.getAsNumber();
                    }
                    e /= s.length;
                    return [
                        e / 255,
                        (t /= s.length) / 255,
                        (r /= s.length) / 255
                    ];
                })();
            }
            return this.default_color;
        }
    }
    e.Firework = o;
    class u {
        default_color;
        constructor(e){
            this.default_color = e;
        }
        getTint(e, t) {
            let r = e.getComponent("potion_contents", t);
            if (!r) {
                return this.default_color;
            }
            let s = C2.fromNbt(r);
            return C2.getColor(s);
        }
    }
    e.Potion = u;
    class c {
        default_color;
        constructor(e){
            this.default_color = e;
        }
        getTint(e, t) {
            let r = e.getComponent("map_color", t);
            if (r) {
                return Q1.intToRgb(r.getAsNumber());
            }
            return this.default_color;
        }
    }
    e.MapColor = c;
    class h {
        index;
        default_color;
        constructor(e, t){
            this.index = e;
            this.default_color = t;
        }
        getTint(e, t) {
            let r = e.getComponent("custom_model_data", t);
            if (!r?.isCompound()) {
                return this.default_color;
            }
            let s = r.getList("colors").get(this.index);
            if (s) {
                return Q1.fromNbt(s) ?? this.default_color;
            }
            return this.default_color;
        }
    }
    e.CustomModelData = h;
    class l {
        default_color;
        constructor(e){
            this.default_color = e;
        }
        getTint(e, t, r) {
            return r.context_entity_team_color ?? this.default_color;
        }
    }
    e.Team = l;
})(P = P || (P = {}));
