import { _a, ca, ga } from "./chunk_ca.js";
import { ma, pa } from "./chunk_la.js";
import { Ba, Fa, Ia, La, Pa, Ra, Ua, Va, Wa, za } from "./chunk_va.js";
import { ka } from "./chunk_Da.js";
import { Qa } from "./chunk_Qa.js";
export const Ca = {
    x: [
        `up`,
        `down`,
        `north`,
        `south`
    ],
    y: [
        `north`,
        `south`,
        `east`,
        `west`
    ],
    z: [
        `up`,
        `down`,
        `east`,
        `west`
    ]
};
export const wa = {
    x: [
        `east`,
        `west`
    ],
    y: [
        `up`,
        `down`
    ],
    z: [
        `north`,
        `south`
    ]
};
export const Ta = {
    east: `x`,
    west: `x`,
    up: `y`,
    down: `y`,
    north: `z`,
    south: `z`
};
export const Ea = new Set([
    `gearshift`,
    `clutch`,
    `andesite_encased_shaft`,
    `brass_encased_shaft`,
    `metal_girder_encased_shaft`,
    `encased_chain_drive`
]);
export const Oa = {
    andesite_encased_cogwheel: `create:block/cogwheel_shaftless`,
    brass_encased_cogwheel: `create:block/cogwheel_shaftless`,
    andesite_encased_large_cogwheel: `create:block/large_cogwheel_shaftless`,
    brass_encased_large_cogwheel: `create:block/large_cogwheel_shaftless`
};
export function Ga(e, t) {
    let n = e.facing ?? `up`;
    let r = n !== `up` && n !== `down` ? [
        Ba(Ra(Ua(Va[n]))),
        Ba(La(-90 - Wa(n)))
    ] : [
        Ba(La(-90 - Wa(n)))
    ];
    return [
        {
            ...pa(ga(Va[n])),
            model: `create:block/shaft_half`
        },
        {
            model: t,
            matrix: Fa(...r)
        }
    ];
}
export function Ka(e) {
    let t = e.facing ?? `up`;
    let n = e.axis_along_first === `true` || e.axis_along_first_coordinate === `true`;
    let r = Za(t, n);
    let i = t === `up` ? 270 : t === `down` ? 90 : 0;
    let a = n === (Ta[t] === `z`) ? 0 : 90;
    let o = (e)=>Fa(Ba(Ra(Ua(t))), Ba(La(i)), ...e && a ? [
            Ba(za(a))
        ] : []);
    return [
        ka(`create:block/shaft`, r),
        {
            model: `create:block/deployer/pole`,
            matrix: o(true)
        },
        {
            model: `create:block/deployer/hand_pointing`,
            matrix: o(false)
        }
    ];
}
export function qa(e) {
    let t = e.facing ?? `up`;
    let n = t === `up` || t === `down`;
    let r = n ? `create:block/mechanical_saw/blade_vertical_inactive` : `create:block/mechanical_saw/blade_horizontal_inactive`;
    let i = e.axis_along_first === `true` || e.axis_along_first_coordinate === `true`;
    return [
        n && i ? {
            ...pa((e)=>ca(ga(t)(e), `y`, 90)),
            model: r
        } : _a(r, t),
        n ? ka(`create:block/shaft`, Za(t, i)) : {
            ...pa(ga(Va[t])),
            model: `create:block/shaft_half`
        }
    ];
}
const Ja = `create:block/mechanical_arm`;
export function Ya(e) {
    let t = Fa(e.ceiling === `true` ? Fa(Ia(0.5, 0.5, 0.5), La(180)) : Ia(0.5, 0.5, 0.5), Ia(0, 4 / 16, 0));
    let n = Fa(t, Ia(0, 2 / 16, 0), La(135));
    let r = Fa(n, Ia(0, 0, -14 / 16), La(-135));
    let i = Fa(r, Ia(0, 0, -15 / 16), La(-45));
    return [
        {
            model: `${Ja}/cog`
        },
        {
            model: `${Ja}/base`,
            matrix: t
        },
        {
            model: `${Ja}/lower_body`,
            matrix: n
        },
        {
            model: `${Ja}/upper_body`,
            matrix: r
        },
        {
            model: `${Ja}/claw_base`,
            matrix: i
        },
        {
            model: `${Ja}/lower_claw_grip`,
            matrix: Fa(i, Ia(0, -1 / 16, -6 / 16))
        },
        {
            model: `${Ja}/upper_claw_grip`,
            matrix: Fa(i, Ia(0, 1 / 16, -6 / 16))
        }
    ];
}
export function Xa(e) {
    let t = e.facing ?? `north`;
    let n = e.axis_along_first === `true` || e.axis_along_first_coordinate === `true`;
    let r = Ta[t];
    let i = r === `x` ? n ? `y` : `z` : r === `y` ? n ? `x` : `z` : n ? `x` : `y`;
    let a = ([
        `x`,
        `y`,
        `z`
    ].find((e)=>e !== r && e !== i) ?? `z`) === `y` || i === `x` ? 90 : 0;
    let o = e.enabled === `true`;
    let s = Fa(Ia(0.5, 0.5, 0.5), Ra(ma(t)), La(t === `up` ? 0 : t === `down` ? 180 : 90), Ra(a + (o ? -90 : 0)), Ia(-0.5, -0.5, -0.5));
    return [
        ka(`create:block/shaft`, i),
        {
            model: `create:block/fluid_valve/pointer`,
            matrix: s
        }
    ];
}
function Za(e, t) {
    let n = Ta[e];
    if (n === `x`) {
        if (t) {
            return `y`;
        }
        return `z`;
    }
    if (n === `y`) {
        if (t) {
            return `x`;
        }
        return `z`;
    }
    if (t) {
        return `x`;
    }
    return `y`;
}
export function $a(e, t, n) {
    let r = t.facing ?? `up`;
    let i = Za(r, t.axis_along_first === `true` || t.axis_along_first_coordinate === `true`);
    let a = e === `speedometer` ? `create:block/gauge/speedometer/head` : `create:block/gauge/stressometer/head`;
    let o = [
        ka(`create:block/shaft`, i)
    ];
    for (let e of [
        `north`,
        `south`,
        `east`,
        `west`
    ]){
        if (Ta[e] === i || e === Va[r] || i === `y` && e !== r || n?.getNeighbor(e)) {
            continue;
        }
        let t = Ba(Ra(-Qa[e] - 90));
        o.push({
            model: `create:block/gauge/dial`,
            matrix: t
        });
        o.push({
            model: a,
            matrix: t
        });
    }
    return o;
}
export function eo(e) {
    let t = (e.horizontal_axis ?? e.axis) === `x`;
    return [
        ka(`create:block/shaft`, t ? `x` : `z`),
        {
            model: `create:block/rotation_speed_controller/bracket`,
            matrix: Pa(Ba(Ra(t ? 180 : 90)), Ia(0, 1, 0))
        }
    ];
}
const to = [
    `down`,
    `up`,
    `north`,
    `south`,
    `east`,
    `west`
];
const no = new Set([
    `fluid_pipe`,
    `glass_fluid_pipe`,
    `smart_fluid_pipe`,
    `encased_fluid_pipe`
]);
const ro = {
    texture: `create:block/pipes_connected`,
    uv: [
        4,
        8,
        8,
        12
    ]
};
export function io(e, t) {
    let n = [];
    let r = (t)=>e[t] === `true`;
    let faces = {};
    for (let e of [
        `x`,
        `y`,
        `z`
    ]){
        let t = wa[e];
        if (to.filter((e)=>!t.includes(e) && r(e)).length >= 3) {
            for (let e of t){
                if (!r(e)) {
                    faces[e] = ro;
                }
            }
        }
    }
    if (Object.keys(faces).length > 0) {
        n.push({
            elements: [
                {
                    from: [
                        4,
                        4,
                        4
                    ],
                    to: [
                        12,
                        12,
                        12
                    ],
                    faces
                }
            ]
        });
    }
    for (let r of to){
        if (e[r] !== `true`) {
            continue;
        }
        let i = t?.getNeighbor(r) ?? null;
        if (i && i.namespace === `create` && no.has(i.name)) {
            n.push({
                model: `create:block/fluid_pipe/connection/${r}`
            });
        } else if (i) {
            n.push({
                model: `create:block/fluid_pipe/rim_connector/${r}`
            }, {
                model: `create:block/fluid_pipe/drain/${r}`
            });
        } else {
            n.push({
                model: `create:block/fluid_pipe/rim_connector/${r}`
            }, {
                model: `create:block/fluid_pipe/rim/${r}`
            });
        }
    }
    return n;
}
