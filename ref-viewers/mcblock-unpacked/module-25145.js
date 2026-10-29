const r = require(75342);
export function YY(e) {
    let a = e.painting?.size ?? r.o(e.painting?.variant ?? e.painting?.motive);
    return [
        Math.max(1, Math.min(4, Math.round(a[0]))),
        Math.max(1, Math.min(4, Math.round(a[1])))
    ];
}
export function On(e) {
    if (e.kind === "armor_stand") {
        if (e.armorStand?.marker) {
            return {
                position: [
                    0,
                    0.35,
                    0
                ],
                args: [
                    0.55,
                    0.75,
                    0.55
                ]
            };
        }
        let r = e.armorStand?.small ? 0.5 : 1;
        return {
            position: [
                0,
                0.9 * r,
                0
            ],
            args: [
                0.9 * r,
                1.8 * r,
                0.9 * r
            ]
        };
    }
    if (e.kind === "item_frame") {
        return {
            position: [
                0,
                0,
                0
            ],
            args: [
                1,
                1,
                0.24
            ]
        };
    }
    if (e.kind === "painting") {
        let [o, i] = YY(e);
        return {
            position: [
                0,
                0,
                0
            ],
            args: [
                o,
                i,
                0.24
            ]
        };
    }
    if (e.kind === "boat") {
        return {
            position: [
                0,
                0.35,
                0
            ],
            args: [
                1.55,
                0.85,
                0.95
            ]
        };
    }
    if (e.kind === "minecart") {
        return {
            position: [
                0,
                0.45,
                0
            ],
            args: [
                1.05,
                0.9,
                1.05
            ]
        };
    }
    if (e.kind === "display" || e.kind === "block_display" || e.kind === "falling_block" || e.kind === "tnt") {
        return {
            position: [
                0,
                0.5,
                0
            ],
            args: [
                1,
                1,
                1
            ]
        };
    }
    if (e.kind === "item_display") {
        return {
            position: [
                0,
                0.5,
                0
            ],
            args: [
                0.9,
                0.9,
                0.2
            ]
        };
    }
    if (e.kind === "text_display") {
        return {
            position: [
                0,
                0.5,
                0
            ],
            args: [
                1.4,
                0.6,
                0.2
            ]
        };
    }
    if (e.kind === "end_crystal") {
        return {
            position: [
                0,
                0.75,
                0
            ],
            args: [
                0.9,
                1.5,
                0.9
            ]
        };
    }
    if (e.kind === "leash_knot") {
        return {
            position: [
                0,
                0,
                0
            ],
            args: [
                0.45,
                0.45,
                0.25
            ]
        };
    }
    if (e.kind === "interaction") {
        let o = Math.max(0.2, e.interaction?.width ?? 1);
        let i = Math.max(0.2, e.interaction?.height ?? 1);
        return {
            position: [
                0,
                i / 2,
                0
            ],
            args: [
                o,
                i,
                o
            ]
        };
    }
    if (e.kind === "marker") {
        return {
            position: [
                0,
                0.2,
                0
            ],
            args: [
                0.45,
                0.45,
                0.45
            ]
        };
    }
    return {
        position: [
            0,
            0.6,
            0
        ],
        args: [
            0.75,
            1.25,
            0.75
        ]
    };
}
export function NR(e) {
    if (e.kind === "item_frame") {
        return {
            position: [
                0,
                0,
                1 / 16
            ],
            size: [
                0.75,
                0.75,
                3 / 16
            ]
        };
    }
    if (e.kind === "painting") {
        let [o, i] = YY(e);
        return {
            position: [
                0,
                0,
                0
            ],
            size: [
                o,
                i,
                1 / 16
            ]
        };
    }
    if (e.kind === "armor_stand" && !e.armorStand?.marker) {
        let o = e.armorStand?.small ? 0.5 : 1;
        return {
            position: [
                0,
                0.9875 * o,
                0
            ],
            size: [
                0.5 * o,
                1.975 * o,
                0.5 * o
            ]
        };
    }
    let { position, args } = On(e);
    return {
        position,
        size: args
    };
}
