import { Ct } from "./chunk_dt.js";
import { Sa, _a, ba, ga, xa, ya } from "./chunk_ca.js";
import { pa } from "./chunk_la.js";
import { Ba, Fa, Ha, Ia, La, Ra, Ua, Va, Wa, za } from "./chunk_va.js";
import { $a, Ca, Ea, Ga, Ka, Oa, Ta, Xa, Ya, eo, io, qa, wa } from "./chunk_Ca_2.js";
import { Da, ja, ka } from "./chunk_Da.js";
import { so } from "./chunk_Qa.js";
function Aa(name, properties) {
    let n = properties.axis ?? `y`;
    let [r, i] = wa[n];
    let a = [
        ka(Oa[name], n)
    ];
    if (properties.top_shaft === `true`) {
        a.push(Da(r));
    }
    if (properties.bottom_shaft === `true`) {
        a.push(Da(i));
    }
    return a;
}
function co(properties) {
    if (properties.face === `ceiling`) {
        return `down`;
    }
    if (properties.face === `wall`) {
        return properties.facing ?? `north`;
    }
    return `up`;
}
const lo = 6 / 16;
const uo = 14 / 16;
function fo(e, t) {
    return Fa(Ia(0.5, 0.5, 0.5), Ra(Ua(e)), La(Wa(e) + 90), Ra(t ? -90 : 0), Ia(-0.5, -0.5, -0.5));
}
function po(properties, t) {
    let n = co(properties);
    let r = Ta[n];
    let i = t?.getNeighbor(n, 2);
    let a = Ta[properties.facing ?? `north`];
    let o = i?.properties.axis ?? (r === `y` ? a === `z` ? `x` : `z` : `y`);
    let s = r !== `y` && o === `y` || r === `y` && o === `z`;
    let c = lo * Math.sin(0) - Math.sqrt(uo ** 2 - (lo * Math.cos(0)) ** 2);
    let l = Math.abs(c - lo * Math.sin(0));
    let u = Math.acos(l / uo) * (Math.cos(0) >= 0 ? 1 : -1) * 180 / Math.PI;
    let d = fo(n, s);
    let f = c + 20 / 16;
    return [
        {
            model: `create:block/steam_engine/piston`,
            matrix: Fa(d, Ia(0, f, 0))
        },
        {
            model: `create:block/steam_engine/linkage`,
            matrix: Fa(d, Ia(0, 1, 0), Ia(0, f, 0), Ia(0, 4 / 16, 8 / 16), La(u), Ia(0, -4 / 16, -8 / 16))
        },
        {
            model: `create:block/steam_engine/shaft_connector`,
            matrix: Fa(d, Ia(0, 2, 0), Ia(0.5, 0.5, 0.5), La(-90), Ia(-0.5, -0.5, -0.5))
        }
    ];
}
function mo(properties) {
    let t = properties.slope ?? `horizontal`;
    let n = properties.facing ?? `south`;
    let r = t === `upward` || t === `downward`;
    let i = properties.part ?? `middle`;
    let a = i === `start` || i === `end` || i === `pulley`;
    let o = i === `pulley` ? `middle` : i;
    let s = pa(Sa(n, t));
    let c = (r ? [
        `create:block/belt/diagonal_${o}`
    ] : [
        `create:block/belt/${o}`,
        `create:block/belt/${o}_bottom`
    ]).map((model)=>({
            ...s,
            model
        }));
    if (properties.casing === `true`) {
        let e = r ? `diagonal` : t === `sideways` ? `sideways` : `horizontal`;
        let n = a ? `pulley` : `middle`;
        c.push({
            ...s,
            model: `create:block/belt_casing/${e}_${n}`
        });
    }
    if (a) {
        c.push({
            ...pa(xa(n, t)),
            model: `create:block/belt_pulley`
        });
    }
    return c;
}
export function ho() {
    Ct(`create`, ({ name, properties }, n)=>{
        if (name === `fluid_pipe`) {
            return io(properties, n);
        }
        if (name === `blaze_burner`) {
            return so(n);
        }
        if (name === `gearbox`) {
            return Ca[properties.axis ?? `y`].map(Da);
        }
        if (Ea.has(name)) {
            return wa[properties.axis ?? `y`].map(Da);
        }
        if (name in Oa) {
            return Aa(name, properties);
        }
        if (name === `belt`) {
            return mo(properties);
        }
        if (name === `steam_engine`) {
            return po(properties, n);
        }
        if (name === `mechanical_mixer`) {
            return [
                {
                    model: `create:block/cogwheel_shaftless`
                },
                {
                    model: `create:block/mechanical_mixer/pole`
                },
                {
                    model: `create:block/mechanical_mixer/head`
                }
            ];
        }
        if (name === `mechanical_crafter`) {
            return [
                {
                    model: `create:block/cogwheel_shaftless`
                },
                {
                    model: `create:block/mechanical_crafter/lid`
                },
                {
                    model: `create:block/mechanical_crafter/arrow`
                },
                {
                    model: `create:block/mechanical_crafter/belt`
                }
            ];
        }
        if (name === `millstone`) {
            return [
                {
                    model: `create:block/millstone/inner`
                }
            ];
        }
        if (name === `spout`) {
            return [
                {
                    model: `create:block/spout/top`
                },
                {
                    model: `create:block/spout/middle`
                },
                {
                    model: `create:block/spout/bottom`
                }
            ];
        }
        if (name === `rotation_speed_controller`) {
            return eo(properties);
        }
        if (name === `mechanical_arm`) {
            return Ya(properties);
        }
        if (name === `fluid_valve`) {
            return Xa(properties);
        }
        if (name === `stressometer` || name === `speedometer`) {
            return $a(name, properties, n);
        }
        let r = properties.facing ?? `north`;
        if (name === `mechanical_drill` || name === `drill`) {
            return [
                _a(`create:block/mechanical_drill/head`, r)
            ];
        }
        if (name === `mechanical_pump`) {
            return [
                _a(`create:block/mechanical_pump/cog`, r)
            ];
        }
        if (name === `mechanical_press`) {
            return [
                _a(`create:block/mechanical_press/head`, properties.horizontal_facing ?? r)
            ];
        }
        if (name === `encased_fan`) {
            let e = Va[r];
            return [
                _a(`create:block/encased_fan/propeller`, e),
                {
                    ...pa(ga(e)),
                    model: `create:block/shaft_half`
                }
            ];
        }
        if (name === `mechanical_saw`) {
            return qa(properties);
        }
        if (name === `deployer`) {
            return Ka(properties);
        }
        if (name === `hand_crank`) {
            return [
                ya(`create:block/hand_crank/handle`, properties.facing ?? `up`)
            ];
        }
        if (name === `mechanical_bearing` || name === `clockwork_bearing`) {
            return Ga(properties, `create:block/bearing/top`);
        }
        if (name === `windmill_bearing`) {
            return Ga(properties, `create:block/bearing/top_wooden`);
        }
        if (name === `water_wheel`) {
            return [
                ba(r)
            ];
        }
        return [];
    }, [
        `fluid_pipe`,
        `blaze_burner`,
        `stressometer`,
        `speedometer`,
        `steam_engine`
    ]);
    Ct(`simulated`, ({ name, properties })=>{
        if (name === `directional_gearshift`) {
            return ja(properties);
        }
        if (name === `throttle_lever`) {
            return [
                {
                    model: `simulated:block/throttle_lever/handle`
                },
                {
                    model: `simulated:block/throttle_lever/button`
                },
                {
                    model: `simulated:block/throttle_lever/diode`
                }
            ];
        }
        return [];
    });
    Ct(`offroad`, ({ name, properties })=>{
        if (name !== `rockcutting_wheel`) {
            return [];
        }
        let n = properties.facing ?? `south`;
        let r = properties.axis_along_first === `true` || properties.axis_along_first_coordinate === `true`;
        let i = (Ta[n] === `z` || Ta[n] === `y`) !== r;
        let a = Ba(Ha[n]);
        return [
            {
                model: `offroad:block/rockcutting_wheel/wheel`,
                matrix: i ? Fa(a, Ba(za(90)), Ia(0.625, 0.5, 0)) : Fa(a, Ba(La(90)), Ia(0, 0.5, -0.625))
            }
        ];
    });
    Ct(`aeronautics`, ({ name, properties })=>{
        let n = properties.reversed === `true` ? `propeller_reversed` : `propeller`;
        if (name === `andesite_propeller`) {
            return [
                {
                    model: `aeronautics:block/andesite_propeller/${n}`
                }
            ];
        }
        if (name === `wooden_propeller`) {
            return [
                {
                    model: `aeronautics:block/wooden_propeller/${n}`
                }
            ];
        }
        return [];
    });
}
