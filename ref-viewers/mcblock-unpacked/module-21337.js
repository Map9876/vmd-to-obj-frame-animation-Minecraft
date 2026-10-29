import { Qr, Tl, Z8, eL, hs, vt } from "./module-85250.js";
import { OP, gw } from "./module-45723.js";
import { t$ } from "./module-23273.js";
import { Q1 } from "./module-13402.js";
import { I } from "./module-39080.js";
import { z } from "./module-29849.js";
import { V } from "./module-73475.js";
import { e as e_1 } from "./module-31206.js";
export let y;
function d(e, t, r, s, tintindex) {
    let a = s.up ? 16 : [
        14.2,
        12.5,
        10.5,
        9,
        7,
        5.3,
        3.7,
        1.9,
        16,
        16,
        16,
        16,
        16,
        16,
        16,
        16
    ][t];
    return new z(undefined, {
        still: `block/${e}_still`,
        flow: `block/${e}_flow`
    }, [
        {
            from: [
                0,
                0,
                0
            ],
            to: [
                16,
                a,
                16
            ],
            faces: {
                up: {
                    texture: "#still",
                    tintindex,
                    cullface: OP.UP
                },
                down: {
                    texture: "#still",
                    tintindex,
                    cullface: OP.DOWN
                },
                north: {
                    texture: "#flow",
                    tintindex,
                    cullface: OP.NORTH
                },
                east: {
                    texture: "#flow",
                    tintindex,
                    cullface: OP.EAST
                },
                south: {
                    texture: "#flow",
                    tintindex,
                    cullface: OP.SOUTH
                },
                west: {
                    texture: "#flow",
                    tintindex,
                    cullface: OP.WEST
                }
            }
        }
    ]).getMesh(r, s, I[e]?.({}));
}
let f = {
    white: Q1.intToRgb(16383998),
    orange: Q1.intToRgb(16351261),
    magenta: Q1.intToRgb(13061821),
    light_blue: Q1.intToRgb(3847130),
    yellow: Q1.intToRgb(16701501),
    lime: Q1.intToRgb(8439583),
    pink: Q1.intToRgb(15961002),
    gray: Q1.intToRgb(4673362),
    light_gray: Q1.intToRgb(10329495),
    cyan: Q1.intToRgb(1481884),
    purple: Q1.intToRgb(8991416),
    blue: Q1.intToRgb(3949738),
    brown: Q1.intToRgb(8606770),
    green: Q1.intToRgb(6192150),
    red: Q1.intToRgb(11546150),
    black: Q1.intToRgb(1908001)
};
((e)=>{
    function t(e) {
        return new z(undefined, {
            0: "entity/decorated_pot/decorated_pot_side",
            1: "entity/decorated_pot/decorated_pot_base"
        }, [
            {
                from: [
                    1,
                    0,
                    1
                ],
                to: [
                    15,
                    16,
                    15
                ],
                faces: {
                    north: {
                        uv: [
                            1,
                            0,
                            15,
                            16
                        ],
                        texture: "#0"
                    },
                    east: {
                        uv: [
                            1,
                            0,
                            15,
                            16
                        ],
                        texture: "#0"
                    },
                    south: {
                        uv: [
                            1,
                            0,
                            15,
                            16
                        ],
                        texture: "#0"
                    },
                    west: {
                        uv: [
                            1,
                            0,
                            15,
                            16
                        ],
                        texture: "#0"
                    },
                    up: {
                        uv: [
                            0,
                            6.5,
                            7,
                            13.5
                        ],
                        texture: "#1"
                    },
                    down: {
                        uv: [
                            7,
                            6.5,
                            14,
                            13.5
                        ],
                        texture: "#1"
                    }
                }
            },
            {
                from: [
                    5,
                    16,
                    5
                ],
                to: [
                    11,
                    17,
                    11
                ],
                faces: {
                    north: {
                        uv: [
                            0,
                            5.5,
                            3,
                            6
                        ],
                        texture: "#1"
                    },
                    east: {
                        uv: [
                            3,
                            5.5,
                            6,
                            6
                        ],
                        texture: "#1"
                    },
                    south: {
                        uv: [
                            6,
                            5.5,
                            9,
                            6
                        ],
                        texture: "#1"
                    },
                    west: {
                        uv: [
                            9,
                            5.5,
                            12,
                            6
                        ],
                        texture: "#1"
                    }
                }
            },
            {
                from: [
                    4,
                    17,
                    4
                ],
                to: [
                    12,
                    20,
                    12
                ],
                faces: {
                    north: {
                        uv: [
                            0,
                            4,
                            4,
                            5.5
                        ],
                        texture: "#1"
                    },
                    east: {
                        uv: [
                            4,
                            4,
                            8,
                            5.5
                        ],
                        texture: "#1"
                    },
                    south: {
                        uv: [
                            8,
                            4,
                            12,
                            5.5
                        ],
                        texture: "#1"
                    },
                    west: {
                        uv: [
                            12,
                            4,
                            16,
                            5.5
                        ],
                        texture: "#1"
                    },
                    up: {
                        uv: [
                            4,
                            0,
                            8,
                            4
                        ],
                        texture: "#1"
                    },
                    down: {
                        uv: [
                            8,
                            0,
                            12,
                            4
                        ],
                        texture: "#1"
                    }
                }
            }
        ]).getMesh(e, V.none());
    }
    function r(e) {
        return new z(undefined, {
            0: "entity/conduit/base"
        }, [
            {
                from: [
                    5,
                    5,
                    5
                ],
                to: [
                    11,
                    11,
                    11
                ],
                faces: {
                    north: {
                        uv: [
                            3,
                            6,
                            6,
                            12
                        ],
                        texture: "#0"
                    },
                    east: {
                        uv: [
                            0,
                            6,
                            3,
                            12
                        ],
                        texture: "#0"
                    },
                    south: {
                        uv: [
                            9,
                            6,
                            12,
                            12
                        ],
                        texture: "#0"
                    },
                    west: {
                        uv: [
                            6,
                            6,
                            9,
                            12
                        ],
                        texture: "#0"
                    },
                    up: {
                        uv: [
                            6,
                            6,
                            3,
                            0
                        ],
                        texture: "#0"
                    },
                    down: {
                        uv: [
                            9,
                            0,
                            6,
                            6
                        ],
                        texture: "#0"
                    }
                }
            }
        ]).getMesh(e, V.none());
    }
    e.chestRenderer = function(e) {
        return (t)=>new z(undefined, {
                0: e.withPrefix("entity/chest/").toString()
            }, [
                {
                    from: [
                        1,
                        0,
                        1
                    ],
                    to: [
                        15,
                        10,
                        15
                    ],
                    faces: {
                        north: {
                            uv: [
                                10.5,
                                8.25,
                                14,
                                10.75
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                7,
                                8.25,
                                10.5,
                                10.75
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                3.5,
                                8.25,
                                7,
                                10.75
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                0,
                                8.25,
                                3.5,
                                10.75
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                7,
                                4.75,
                                10.5,
                                8.25
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                3.5,
                                4.75,
                                7,
                                8.25
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        1,
                        10,
                        1
                    ],
                    to: [
                        15,
                        14,
                        15
                    ],
                    faces: {
                        north: {
                            uv: [
                                10.5,
                                3.75,
                                14,
                                4.75
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                7,
                                3.75,
                                10.5,
                                4.75
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                3.5,
                                3.75,
                                7,
                                4.75
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                0,
                                3.75,
                                3.5,
                                4.75
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                7,
                                0,
                                10.5,
                                3.5
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                3.5,
                                0,
                                7,
                                3.5
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        7,
                        7,
                        0
                    ],
                    to: [
                        9,
                        11,
                        2
                    ],
                    faces: {
                        north: {
                            uv: [
                                0.25,
                                0.25,
                                0.75,
                                1.25
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0,
                                0.25,
                                0.25,
                                1.25
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                1,
                                0.25,
                                1.5,
                                1.25
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                0.75,
                                0.25,
                                1,
                                1.25
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                0.25,
                                0,
                                0.75,
                                0.25
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                0.75,
                                0,
                                1.25,
                                0.25
                            ],
                            rotation: 180,
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(t, V.none());
    };
    e.decoratedPotRenderer = t;
    e.shieldRenderer = function(e, t) {
        let r = {
            0: "entity/shield/shield_base_nopattern"
        };
        let s = [
            {
                from: [
                    -6,
                    -11,
                    -2
                ],
                to: [
                    6,
                    11,
                    -1
                ],
                faces: {
                    north: {
                        uv: [
                            3.5,
                            0.25,
                            6.5,
                            5.75
                        ],
                        texture: "#0"
                    },
                    east: {
                        uv: [
                            3.25,
                            0.25,
                            3.5,
                            5.75
                        ],
                        texture: "#0"
                    },
                    south: {
                        uv: [
                            0.25,
                            0.25,
                            3.25,
                            5.75
                        ],
                        texture: "#0"
                    },
                    west: {
                        uv: [
                            0,
                            0.25,
                            0.25,
                            5.75
                        ],
                        texture: "#0"
                    },
                    up: {
                        uv: [
                            0.25,
                            0,
                            3.25,
                            0.25
                        ],
                        texture: "#0"
                    },
                    down: {
                        uv: [
                            3.25,
                            0,
                            6.25,
                            0.25
                        ],
                        texture: "#0"
                    }
                }
            }
        ];
        let n = [
            ""
        ];
        t?.forEach((e, t)=>{
            let i;
            r[t + 1] = `entity/shield/${e.pattern}`;
            s.push({
                from: [
                    -5,
                    -10,
                    -0.99
                ],
                to: [
                    5,
                    10,
                    -0.99
                ],
                faces: (i = t + 1, {
                    south: {
                        uv: [
                            0.5,
                            0.5,
                            3,
                            5.5
                        ],
                        texture: `#${i}`,
                        tintindex: i
                    }
                })
            });
            n.push(e.color);
        });
        return new z(undefined, r, s).getMesh(e, V.none(), (e)=>f[n[e] ?? ""] ?? [
                1,
                1,
                1
            ]);
    };
    e.headRenderer = function(e, t) {
        return (r)=>new z(undefined, {
                0: e.withPrefix("entity/").toString()
            }, [
                {
                    from: [
                        4,
                        0,
                        4
                    ],
                    to: [
                        12,
                        8,
                        12
                    ],
                    faces: {
                        north: {
                            uv: [
                                6,
                                2 * t,
                                8,
                                4 * t
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                2,
                                2 * t,
                                0,
                                4 * t
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                2,
                                2 * t,
                                4,
                                4 * t
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                6,
                                2 * t,
                                4,
                                4 * t
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                2,
                                0 * t,
                                4,
                                2 * t
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                4,
                                0 * t,
                                6,
                                2 * t
                            ],
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(r, V.none());
    };
    e.dragonHeadRenderer = function(e = gw.create("enderdragon/dragon")) {
        return (t)=>{
            let r = vt();
            Tl(r, r, [
                8,
                8,
                8
            ]);
            hs(r, r, [
                0.75,
                0.75,
                0.75
            ]);
            Z8(r, r, Math.PI);
            Tl(r, r, [
                -8,
                -11.2,
                -8
            ]);
            return new z(undefined, {
                0: e.withPrefix("entity/").toString()
            }, [
                {
                    from: [
                        2,
                        4,
                        -16
                    ],
                    to: [
                        14,
                        9,
                        0
                    ],
                    faces: {
                        north: {
                            uv: [
                                12,
                                3.75,
                                12.75,
                                4.0625
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                11,
                                3.75,
                                12,
                                4.0625
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                13.75,
                                3.75,
                                14.5,
                                4.0625
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                12.75,
                                3.75,
                                13.75,
                                4.0625
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                12.75,
                                3.75,
                                12,
                                2.75
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                13.5,
                                2.75,
                                12.75,
                                3.75
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        0,
                        0,
                        -2
                    ],
                    to: [
                        16,
                        16,
                        14
                    ],
                    faces: {
                        north: {
                            uv: [
                                8,
                                2.875,
                                9,
                                3.875
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                7,
                                2.875,
                                8,
                                3.875
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                10,
                                2.875,
                                11,
                                3.875
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                9,
                                2.875,
                                10,
                                3.875
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                9,
                                2.875,
                                8,
                                1.875
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                10,
                                1.875,
                                9,
                                2.875
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        2,
                        0,
                        -16
                    ],
                    to: [
                        14,
                        4,
                        0
                    ],
                    rotation: {
                        angle: -36 / Math.PI,
                        axis: "x",
                        origin: [
                            8,
                            4,
                            -2
                        ]
                    },
                    faces: {
                        north: {
                            uv: [
                                12,
                                5.0625,
                                12.75,
                                5.3125
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                11,
                                5.0625,
                                12,
                                5.3125
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                13.75,
                                5.0625,
                                14.5,
                                5.3125
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                12.75,
                                5.0625,
                                13.75,
                                5.3125
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                12.75,
                                5.0625,
                                12,
                                4.0625
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                13.5,
                                4.0625,
                                12.75,
                                5.0625
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        3,
                        16,
                        4
                    ],
                    to: [
                        5,
                        20,
                        10
                    ],
                    faces: {
                        north: {
                            uv: [
                                0.375,
                                0.375,
                                0.5,
                                0.625
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0,
                                0.375,
                                0.375,
                                0.625
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                0.875,
                                0.375,
                                1,
                                0.625
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                0.5,
                                0.375,
                                0.875,
                                0.625
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                0.5,
                                0.375,
                                0.375,
                                0
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                0.625,
                                0,
                                0.5,
                                0.375
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        11,
                        16,
                        4
                    ],
                    to: [
                        13,
                        20,
                        10
                    ],
                    faces: {
                        north: {
                            uv: [
                                0.375,
                                0.375,
                                0.5,
                                0.625
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0,
                                0.375,
                                0.375,
                                0.625
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                0.875,
                                0.375,
                                1,
                                0.625
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                0.5,
                                0.375,
                                0.875,
                                0.625
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                0.5,
                                0.375,
                                0.375,
                                0
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                0.625,
                                0,
                                0.5,
                                0.375
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        3,
                        9,
                        -14
                    ],
                    to: [
                        5,
                        11,
                        -10
                    ],
                    faces: {
                        north: {
                            uv: [
                                7.25,
                                0.25,
                                7.375,
                                0.375
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                7,
                                0.25,
                                7.25,
                                0.375
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                7.625,
                                0.25,
                                7.75,
                                0.375
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                7.375,
                                0.25,
                                7.625,
                                0.375
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                7.375,
                                0.25,
                                7.25,
                                0
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                7.5,
                                0,
                                7.375,
                                0.25
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        11,
                        9,
                        -14
                    ],
                    to: [
                        13,
                        11,
                        -10
                    ],
                    faces: {
                        north: {
                            uv: [
                                7.25,
                                0.25,
                                7.375,
                                0.375
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                7,
                                0.25,
                                7.25,
                                0.375
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                7.625,
                                0.25,
                                7.75,
                                0.375
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                7.375,
                                0.25,
                                7.625,
                                0.375
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                7.375,
                                0.25,
                                7.25,
                                0
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                7.5,
                                0,
                                7.375,
                                0.25
                            ],
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(t, V.none()).transform(r);
        };
    };
    e.piglinHeadRenderer = function(e = gw.create("piglin/piglin")) {
        return (t)=>new z(undefined, {
                0: e.withPrefix("entity/").toString()
            }, [
                {
                    from: [
                        3,
                        0,
                        4
                    ],
                    to: [
                        13,
                        8,
                        12
                    ],
                    faces: {
                        north: {
                            uv: [
                                6.5,
                                2,
                                9,
                                4
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                2,
                                2,
                                0,
                                4
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                2,
                                2,
                                4.5,
                                4
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                6.5,
                                2,
                                4.5,
                                4
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                2,
                                0,
                                4.5,
                                2
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                4.5,
                                0,
                                7,
                                2
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        6,
                        0,
                        12
                    ],
                    to: [
                        10,
                        4,
                        13
                    ],
                    faces: {
                        north: {
                            uv: [
                                9.25,
                                0.5,
                                10.25,
                                1.5
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                7.75,
                                0.5,
                                8,
                                1.5
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                8,
                                0.5,
                                9,
                                1.5
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                9,
                                0.5,
                                9.25,
                                1.5
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                8,
                                0.25,
                                9,
                                0.5
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                9,
                                0.25,
                                10,
                                0.5
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        5,
                        0,
                        12
                    ],
                    to: [
                        6,
                        2,
                        13
                    ],
                    faces: {
                        north: {
                            uv: [
                                1.25,
                                0.25,
                                1.5,
                                0.75
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0.5,
                                0.25,
                                0.75,
                                0.75
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                0.75,
                                0.25,
                                1,
                                0.75
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                1,
                                0.25,
                                1.25,
                                0.75
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                0.75,
                                0,
                                1,
                                0.25
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                1,
                                0,
                                1.25,
                                0.25
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        10,
                        0,
                        12
                    ],
                    to: [
                        11,
                        2,
                        13
                    ],
                    faces: {
                        north: {
                            uv: [
                                1.25,
                                1.25,
                                1.5,
                                1.75
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0.5,
                                1.25,
                                0.75,
                                1.75
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                0.75,
                                1.25,
                                1,
                                1.75
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                1,
                                1.25,
                                1.25,
                                1.75
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                0.75,
                                1,
                                1,
                                1.25
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                1,
                                1,
                                1.25,
                                1.25
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        2.5,
                        1.5,
                        6
                    ],
                    to: [
                        3.5,
                        6.5,
                        10
                    ],
                    rotation: {
                        angle: -30,
                        axis: "z",
                        origin: [
                            3,
                            7,
                            8
                        ]
                    },
                    faces: {
                        north: {
                            uv: [
                                12,
                                2.5,
                                12.25,
                                3.75
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                9.75,
                                2.5,
                                10.75,
                                3.75
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                10.75,
                                2.5,
                                11,
                                3.75
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                11,
                                2.5,
                                12,
                                3.75
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                10.75,
                                1.5,
                                11,
                                2.5
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                11,
                                1.5,
                                11.25,
                                2.5
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        12.5,
                        1.5,
                        6
                    ],
                    to: [
                        13.5,
                        6.5,
                        10
                    ],
                    rotation: {
                        angle: 30,
                        axis: "z",
                        origin: [
                            13,
                            7,
                            8
                        ]
                    },
                    faces: {
                        north: {
                            uv: [
                                15.25,
                                2.5,
                                15,
                                3.75
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                15,
                                2.5,
                                14,
                                3.75
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                14,
                                2.5,
                                13.75,
                                3.75
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                13.75,
                                2.5,
                                12.75,
                                3.75
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                14,
                                1.5,
                                13.75,
                                2.5
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                14.25,
                                1.5,
                                14,
                                2.5
                            ],
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(t, V.none());
    };
    e.signRenderer = function(e) {
        return (t)=>new z(undefined, {
                0: e.withPrefix("entity/signs/").toString()
            }, [
                {
                    from: [
                        -4,
                        8,
                        7
                    ],
                    to: [
                        20,
                        20,
                        9
                    ],
                    faces: {
                        north: {
                            uv: [
                                0.5,
                                1,
                                6.5,
                                7
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0,
                                1,
                                0.5,
                                7
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                7,
                                1,
                                13,
                                7
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                6.5,
                                1,
                                7,
                                7
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                6.5,
                                1,
                                0.5,
                                0
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                12.5,
                                0,
                                6.5,
                                1
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        7,
                        -6,
                        7
                    ],
                    to: [
                        9,
                        8,
                        9
                    ],
                    faces: {
                        north: {
                            uv: [
                                0.5,
                                8,
                                1,
                                15
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0,
                                8,
                                0.5,
                                15
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                1.5,
                                8,
                                2,
                                15
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                1,
                                8,
                                1.5,
                                15
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                1,
                                8,
                                0.5,
                                7
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                1.5,
                                7,
                                1,
                                8
                            ],
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(t, V.none());
    };
    e.wallSignRenderer = function(e) {
        return (t)=>new z(undefined, {
                0: e.withPrefix("entity/signs/").toString()
            }, [
                {
                    from: [
                        -4,
                        4,
                        17
                    ],
                    to: [
                        20,
                        16,
                        19
                    ],
                    faces: {
                        north: {
                            uv: [
                                0.5,
                                1,
                                6.5,
                                7
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0,
                                1,
                                0.5,
                                7
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                7,
                                1,
                                13,
                                7
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                6.5,
                                1,
                                7,
                                7
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                6.5,
                                1,
                                0.5,
                                0
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                12.5,
                                0,
                                6.5,
                                1
                            ],
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(t, V.none());
    };
    e.hangingSignRenderer = function(e) {
        return (t, r)=>{
            if (t) {
                return new z(undefined, {
                    0: e.withPrefix("entity/signs/hanging/").toString()
                }, [
                    {
                        from: [
                            1,
                            0,
                            7
                        ],
                        to: [
                            15,
                            10,
                            9
                        ],
                        faces: {
                            north: {
                                uv: [
                                    0.5,
                                    7,
                                    4,
                                    12
                                ],
                                texture: "#0"
                            },
                            east: {
                                uv: [
                                    0,
                                    7,
                                    0.5,
                                    12
                                ],
                                texture: "#0"
                            },
                            south: {
                                uv: [
                                    4.5,
                                    7,
                                    8,
                                    12
                                ],
                                texture: "#0"
                            },
                            west: {
                                uv: [
                                    4,
                                    7,
                                    4.5,
                                    12
                                ],
                                texture: "#0"
                            },
                            up: {
                                uv: [
                                    4,
                                    7,
                                    0.5,
                                    6
                                ],
                                texture: "#0"
                            },
                            down: {
                                uv: [
                                    7.5,
                                    6,
                                    4,
                                    7
                                ],
                                texture: "#0"
                            }
                        }
                    },
                    {
                        from: [
                            2,
                            10,
                            8
                        ],
                        to: [
                            14,
                            16,
                            8
                        ],
                        faces: {
                            north: {
                                uv: [
                                    3.5,
                                    3,
                                    6.5,
                                    6
                                ],
                                texture: "#0"
                            },
                            south: {
                                uv: [
                                    3.5,
                                    3,
                                    6.5,
                                    6
                                ],
                                texture: "#0"
                            }
                        }
                    }
                ]).getMesh(r, V.none());
            }
            return new z(undefined, {
                0: e.withPrefix("entity/signs/hanging/").toString()
            }, [
                {
                    from: [
                        1,
                        0,
                        7
                    ],
                    to: [
                        15,
                        10,
                        9
                    ],
                    faces: {
                        north: {
                            uv: [
                                0.5,
                                7,
                                4,
                                12
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0,
                                7,
                                0.5,
                                12
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                4.5,
                                7,
                                8,
                                12
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                4,
                                7,
                                4.5,
                                12
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                4,
                                7,
                                0.5,
                                6
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                7.5,
                                6,
                                4,
                                7
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        1.5,
                        10,
                        8
                    ],
                    to: [
                        4.5,
                        16,
                        8
                    ],
                    rotation: {
                        angle: 45,
                        axis: "y",
                        origin: [
                            3,
                            12,
                            8
                        ]
                    },
                    faces: {
                        north: {
                            uv: [
                                0,
                                3,
                                0.75,
                                6
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                0,
                                3,
                                0.75,
                                6
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        3,
                        10,
                        6.5
                    ],
                    to: [
                        3,
                        16,
                        9.5
                    ],
                    rotation: {
                        angle: 45,
                        axis: "y",
                        origin: [
                            3,
                            12,
                            8
                        ]
                    },
                    faces: {
                        east: {
                            uv: [
                                1.5,
                                3,
                                2.25,
                                6
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                1.5,
                                3,
                                2.25,
                                6
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        11.5,
                        10,
                        8
                    ],
                    to: [
                        14.5,
                        16,
                        8
                    ],
                    rotation: {
                        angle: 45,
                        axis: "y",
                        origin: [
                            13,
                            12,
                            8
                        ]
                    },
                    faces: {
                        north: {
                            uv: [
                                0,
                                3,
                                0.75,
                                6
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                0,
                                3,
                                0.75,
                                6
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        13,
                        10,
                        6.5
                    ],
                    to: [
                        13,
                        16,
                        9.5
                    ],
                    rotation: {
                        angle: 45,
                        axis: "y",
                        origin: [
                            13,
                            12,
                            8
                        ]
                    },
                    faces: {
                        east: {
                            uv: [
                                1.5,
                                3,
                                2.25,
                                6
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                1.5,
                                3,
                                2.25,
                                6
                            ],
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(r, V.none());
        };
    };
    e.wallHangingSignRenderer = function(e) {
        return (t)=>new z(undefined, {
                0: `entity/signs/hanging/${e}`
            }, [
                {
                    from: [
                        1,
                        0,
                        7
                    ],
                    to: [
                        15,
                        10,
                        9
                    ],
                    faces: {
                        north: {
                            uv: [
                                0.5,
                                7,
                                4,
                                12
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0,
                                7,
                                0.5,
                                12
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                4.5,
                                7,
                                8,
                                12
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                4,
                                7,
                                4.5,
                                12
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                4,
                                7,
                                0.5,
                                6
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                7.5,
                                6,
                                4,
                                7
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        0,
                        14,
                        6
                    ],
                    to: [
                        16,
                        16,
                        10
                    ],
                    faces: {
                        north: {
                            uv: [
                                1,
                                2,
                                5,
                                3
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0,
                                2,
                                1,
                                3
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                6,
                                2,
                                10,
                                3
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                5,
                                2,
                                6,
                                3
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                5,
                                2,
                                1,
                                0
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                9,
                                0,
                                5,
                                2
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        1.5,
                        10,
                        8
                    ],
                    to: [
                        4.5,
                        16,
                        8
                    ],
                    rotation: {
                        angle: 45,
                        axis: "y",
                        origin: [
                            3,
                            12,
                            8
                        ]
                    },
                    faces: {
                        north: {
                            uv: [
                                0,
                                3,
                                0.75,
                                6
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                0,
                                3,
                                0.75,
                                6
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        3,
                        10,
                        6.5
                    ],
                    to: [
                        3,
                        16,
                        9.5
                    ],
                    rotation: {
                        angle: 45,
                        axis: "y",
                        origin: [
                            3,
                            12,
                            8
                        ]
                    },
                    faces: {
                        east: {
                            uv: [
                                1.5,
                                3,
                                2.25,
                                6
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                1.5,
                                3,
                                2.25,
                                6
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        11.5,
                        10,
                        8
                    ],
                    to: [
                        14.5,
                        16,
                        8
                    ],
                    rotation: {
                        angle: 45,
                        axis: "y",
                        origin: [
                            13,
                            12,
                            8
                        ]
                    },
                    faces: {
                        north: {
                            uv: [
                                0,
                                3,
                                0.75,
                                6
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                0,
                                3,
                                0.75,
                                6
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        13,
                        10,
                        6.5
                    ],
                    to: [
                        13,
                        16,
                        9.5
                    ],
                    rotation: {
                        angle: 45,
                        axis: "y",
                        origin: [
                            13,
                            12,
                            8
                        ]
                    },
                    faces: {
                        east: {
                            uv: [
                                1.5,
                                3,
                                2.25,
                                6
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                1.5,
                                3,
                                2.25,
                                6
                            ],
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(t, V.none());
    };
    e.conduitRenderer = r;
    e.shulkerBoxRenderer = function(e) {
        return (t)=>new z(undefined, {
                0: e.withPrefix("entity/shulker/").toString()
            }, [
                {
                    from: [
                        0,
                        0,
                        0
                    ],
                    to: [
                        16,
                        8,
                        16
                    ],
                    faces: {
                        north: {
                            uv: [
                                4,
                                11,
                                8,
                                13
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0,
                                11,
                                4,
                                13
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                12,
                                11,
                                16,
                                13
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                8,
                                11,
                                12,
                                13
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                8,
                                11,
                                4,
                                7
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                12,
                                7,
                                8,
                                11
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        0,
                        4,
                        0
                    ],
                    to: [
                        16,
                        16,
                        16
                    ],
                    faces: {
                        north: {
                            uv: [
                                4,
                                4,
                                8,
                                7
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0,
                                4,
                                4,
                                7
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                12,
                                4,
                                16,
                                7
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                8,
                                4,
                                12,
                                7
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                8,
                                4,
                                4,
                                0
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                12,
                                0,
                                8,
                                4
                            ],
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(t, V.none());
    };
    let s = (e)=>({
            north: {
                uv: [
                    0.25,
                    0.25,
                    5.25,
                    10.25
                ],
                texture: `#${e}`,
                tintindex: e
            },
            east: {
                uv: [
                    0,
                    0.25,
                    0.25,
                    10.25
                ],
                texture: `#${e}`,
                tintindex: e
            },
            south: {
                uv: [
                    5.5,
                    0.25,
                    10.5,
                    10.25
                ],
                texture: `#${e}`,
                tintindex: e
            },
            west: {
                uv: [
                    5.25,
                    0.25,
                    5.5,
                    10.25
                ],
                texture: `#${e}`,
                tintindex: e
            },
            up: {
                uv: [
                    5.25,
                    0.25,
                    0.25,
                    0
                ],
                texture: `#${e}`,
                tintindex: e
            },
            down: {
                uv: [
                    10.25,
                    0,
                    5.25,
                    0.25
                ],
                texture: `#${e}`,
                tintindex: e
            }
        });
    function o(e, t) {
        return (r, s)=>{
            let n = {
                0: "entity/banner/banner_base"
            };
            let a = [
                ...t.base
            ];
            let o = [
                e
            ];
            s?.forEach((e, r)=>{
                let path = gw.parse(e.getString("pattern")).path;
                let u = e.getString("color");
                n[++r] = `entity/banner/${path}`;
                a.push(t.pattern(r));
                o.push(u);
            });
            return new z(undefined, n, a).getMesh(r, V.none(), (e)=>f[o[e]]);
        };
    }
    function u(e) {
        return new z(undefined, {
            0: "entity/bell/bell_body"
        }, [
            {
                from: [
                    5,
                    3,
                    5
                ],
                to: [
                    11,
                    10,
                    11
                ],
                faces: {
                    north: {
                        uv: [
                            3,
                            3,
                            6,
                            6.5
                        ],
                        texture: "#0"
                    },
                    east: {
                        uv: [
                            0,
                            3,
                            3,
                            6.5
                        ],
                        texture: "#0"
                    },
                    south: {
                        uv: [
                            9,
                            3,
                            12,
                            6.5
                        ],
                        texture: "#0"
                    },
                    west: {
                        uv: [
                            6,
                            3,
                            9,
                            6.5
                        ],
                        texture: "#0"
                    },
                    up: {
                        uv: [
                            6,
                            3,
                            3,
                            0
                        ],
                        texture: "#0"
                    },
                    down: {
                        uv: [
                            9,
                            0,
                            6,
                            3
                        ],
                        texture: "#0"
                    }
                }
            },
            {
                from: [
                    4,
                    10,
                    4
                ],
                to: [
                    12,
                    12,
                    12
                ],
                faces: {
                    north: {
                        uv: [
                            4,
                            10.5,
                            8,
                            11.5
                        ],
                        texture: "#0"
                    },
                    east: {
                        uv: [
                            0,
                            10.5,
                            4,
                            11.5
                        ],
                        texture: "#0"
                    },
                    south: {
                        uv: [
                            12,
                            10.5,
                            16,
                            11.5
                        ],
                        texture: "#0"
                    },
                    west: {
                        uv: [
                            8,
                            10.5,
                            12,
                            11.5
                        ],
                        texture: "#0"
                    },
                    up: {
                        uv: [
                            8,
                            10.5,
                            4,
                            6.5
                        ],
                        texture: "#0"
                    },
                    down: {
                        uv: [
                            12,
                            6.5,
                            8,
                            10.5
                        ],
                        texture: "#0"
                    }
                }
            }
        ]).getMesh(e, V.none());
    }
    function m(e, t, r = "") {
        return e.getProperty(t) ?? r;
    }
    function p(e, t, r = "0") {
        return parseInt(e.getProperty(t) ?? r);
    }
    e.bannerRenderer = (e)=>o(e, {
            base: [
                {
                    from: [
                        -2,
                        -8,
                        6
                    ],
                    to: [
                        18,
                        32,
                        7
                    ],
                    faces: s(0)
                },
                {
                    from: [
                        7,
                        -12,
                        7
                    ],
                    to: [
                        9,
                        30,
                        9
                    ],
                    faces: {
                        north: {
                            uv: [
                                11.5,
                                0.5,
                                12,
                                11
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                11,
                                0.5,
                                11.5,
                                11
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                12.5,
                                0.5,
                                13,
                                11
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                12,
                                0.5,
                                12.5,
                                11
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                12,
                                0.5,
                                11.5,
                                0
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                12.5,
                                0,
                                12,
                                0.5
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        -2,
                        30,
                        7
                    ],
                    to: [
                        18,
                        32,
                        9
                    ],
                    faces: {
                        north: {
                            uv: [
                                0.5,
                                11,
                                5.5,
                                11.5
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0,
                                11,
                                0.5,
                                11.5
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                6,
                                11,
                                11,
                                11.5
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                5.5,
                                11,
                                6,
                                11.5
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                5.5,
                                11,
                                0.5,
                                10.5
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                10.5,
                                10.5,
                                5.5,
                                11
                            ],
                            texture: "#0"
                        }
                    }
                }
            ],
            pattern: (e)=>({
                    from: [
                        -2,
                        -8,
                        6
                    ],
                    to: [
                        18,
                        32,
                        7
                    ],
                    faces: s(e)
                })
        });
    e.wallBannerRenderer = (e)=>o(e, {
            base: [
                {
                    from: [
                        -2,
                        -8,
                        -1.5
                    ],
                    to: [
                        18,
                        32,
                        -0.5
                    ],
                    faces: s(0)
                },
                {
                    from: [
                        -2,
                        30,
                        -3.5
                    ],
                    to: [
                        18,
                        32,
                        -1.5
                    ],
                    faces: {
                        north: {
                            uv: [
                                0.5,
                                11,
                                5.5,
                                11.5
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                0,
                                11,
                                0.5,
                                11.5
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                6,
                                11,
                                11,
                                11.5
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                5.5,
                                11,
                                6,
                                11.5
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                5.5,
                                11,
                                0.5,
                                10.5
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                10.5,
                                10.5,
                                5.5,
                                11
                            ],
                            texture: "#0"
                        }
                    }
                }
            ],
            pattern: (e)=>({
                    from: [
                        -2,
                        -8,
                        -1.5
                    ],
                    to: [
                        18,
                        32,
                        -0.5
                    ],
                    faces: s(e)
                })
        });
    e.bellRenderer = u;
    e.bedRenderer = function(e) {
        return (t, r)=>{
            if (t === "foot") {
                return new z(undefined, {
                    0: e.withPrefix("entity/bed/").toString()
                }, [
                    {
                        from: [
                            0,
                            3,
                            0
                        ],
                        to: [
                            16,
                            9,
                            16
                        ],
                        faces: {
                            north: {
                                uv: [
                                    5.5,
                                    5.5,
                                    9.5,
                                    7
                                ],
                                rotation: 180,
                                texture: "#0"
                            },
                            east: {
                                uv: [
                                    0,
                                    7,
                                    1.5,
                                    11
                                ],
                                rotation: 270,
                                texture: "#0"
                            },
                            west: {
                                uv: [
                                    5.5,
                                    7,
                                    7,
                                    11
                                ],
                                rotation: 90,
                                texture: "#0"
                            },
                            up: {
                                uv: [
                                    5.5,
                                    11,
                                    1.5,
                                    7
                                ],
                                texture: "#0"
                            },
                            down: {
                                uv: [
                                    11,
                                    7,
                                    7,
                                    11
                                ],
                                texture: "#0"
                            }
                        }
                    },
                    {
                        from: [
                            0,
                            0,
                            0
                        ],
                        to: [
                            3,
                            3,
                            3
                        ],
                        faces: {
                            north: {
                                uv: [
                                    12.5,
                                    5.25,
                                    13.25,
                                    6
                                ],
                                texture: "#0"
                            },
                            east: {
                                uv: [
                                    14.75,
                                    5.25,
                                    15.5,
                                    6
                                ],
                                texture: "#0"
                            },
                            south: {
                                uv: [
                                    14,
                                    5.25,
                                    14.75,
                                    6
                                ],
                                texture: "#0"
                            },
                            west: {
                                uv: [
                                    13.25,
                                    5.25,
                                    14,
                                    6
                                ],
                                texture: "#0"
                            },
                            up: {
                                uv: [
                                    13.25,
                                    4.5,
                                    14,
                                    5.25
                                ],
                                texture: "#0"
                            },
                            down: {
                                uv: [
                                    14,
                                    4.5,
                                    14.75,
                                    5.25
                                ],
                                texture: "#0"
                            }
                        }
                    },
                    {
                        from: [
                            13,
                            0,
                            0
                        ],
                        to: [
                            16,
                            3,
                            3
                        ],
                        faces: {
                            north: {
                                uv: [
                                    13.25,
                                    3.75,
                                    14,
                                    4.5
                                ],
                                texture: "#0"
                            },
                            east: {
                                uv: [
                                    12.5,
                                    3.75,
                                    13.25,
                                    4.5
                                ],
                                texture: "#0"
                            },
                            south: {
                                uv: [
                                    14.75,
                                    3.75,
                                    15.5,
                                    4.5
                                ],
                                texture: "#0"
                            },
                            west: {
                                uv: [
                                    14,
                                    3.75,
                                    14.75,
                                    4.5
                                ],
                                texture: "#0"
                            },
                            up: {
                                uv: [
                                    13.25,
                                    3,
                                    14,
                                    3.75
                                ],
                                texture: "#0"
                            },
                            down: {
                                uv: [
                                    14,
                                    3,
                                    14.75,
                                    3.75
                                ],
                                texture: "#0"
                            }
                        }
                    }
                ]).getMesh(r, V.none());
            }
            return new z(undefined, {
                0: e.withPrefix("entity/bed/").toString()
            }, [
                {
                    from: [
                        0,
                        3,
                        0
                    ],
                    to: [
                        16,
                        9,
                        16
                    ],
                    faces: {
                        east: {
                            uv: [
                                0,
                                1.5,
                                1.5,
                                5.5
                            ],
                            rotation: 270,
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                1.5,
                                0,
                                5.5,
                                1.5
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                5.5,
                                1.5,
                                7,
                                5.5
                            ],
                            rotation: 90,
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                5.5,
                                5.5,
                                1.5,
                                1.5
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                11,
                                1.5,
                                7,
                                5.5
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        0,
                        0,
                        13
                    ],
                    to: [
                        3,
                        3,
                        16
                    ],
                    faces: {
                        north: {
                            uv: [
                                14.75,
                                0.75,
                                15.5,
                                1.5
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                14,
                                0.75,
                                14.75,
                                1.5
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                13.25,
                                0.75,
                                14,
                                1.5
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                12.5,
                                0.75,
                                13.25,
                                1.5
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                13.25,
                                0,
                                14,
                                0.75
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                14,
                                0,
                                14.75,
                                0.75
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        13,
                        0,
                        13
                    ],
                    to: [
                        16,
                        3,
                        16
                    ],
                    faces: {
                        north: {
                            uv: [
                                14,
                                2.25,
                                14.75,
                                3
                            ],
                            texture: "#0"
                        },
                        east: {
                            uv: [
                                13.25,
                                2.25,
                                14,
                                3
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                12.5,
                                2.25,
                                13.25,
                                3
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                14.75,
                                2.25,
                                15.5,
                                3
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                13.25,
                                1.5,
                                14,
                                2.25
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                14,
                                1.5,
                                14.75,
                                2.25
                            ],
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(r, V.none());
        };
    };
    e.copperGolemStatueRenderer = function(e) {
        return (t, r)=>{
            let s = new z(undefined, {
                0: e.withPrefix("entity/copper_golem/").toString()
            }, [
                {
                    from: [
                        4,
                        11,
                        3
                    ],
                    to: [
                        12,
                        16,
                        13
                    ],
                    faces: {
                        east: {
                            uv: [
                                0,
                                2.5,
                                2.5,
                                3.75
                            ],
                            texture: "#0"
                        },
                        north: {
                            uv: [
                                2.5,
                                2.5,
                                4.5,
                                3.75
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                4.5,
                                2.5,
                                6.5,
                                3.75
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                7,
                                2.5,
                                9,
                                3.75
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                2.5,
                                0,
                                4.5,
                                2.5
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                4.5,
                                0,
                                6.5,
                                2.5
                            ],
                            rotation: 180,
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        7,
                        10,
                        2
                    ],
                    to: [
                        9,
                        13,
                        4
                    ],
                    faces: {
                        east: {
                            uv: [
                                14,
                                0.5,
                                14.5,
                                1.25
                            ],
                            texture: "#0"
                        },
                        north: {
                            uv: [
                                14.5,
                                0.5,
                                15,
                                1.25
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                15,
                                0.5,
                                15.5,
                                1.25
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                15.5,
                                0.5,
                                16,
                                1.25
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                14.5,
                                0,
                                15,
                                0.5
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                15,
                                0,
                                15.5,
                                0.5
                            ],
                            rotation: 180,
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        7,
                        16,
                        7
                    ],
                    to: [
                        9,
                        20,
                        9
                    ],
                    faces: {
                        east: {
                            uv: [
                                9.25,
                                2.5,
                                9.75,
                                3.5
                            ],
                            texture: "#0"
                        },
                        north: {
                            uv: [
                                9.75,
                                2.5,
                                10.25,
                                3.5
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                10.25,
                                2.5,
                                10.75,
                                3.5
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                10.75,
                                2.5,
                                11.25,
                                3.5
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                9.75,
                                2,
                                10.25,
                                2.5
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                10.25,
                                2,
                                10.75,
                                2.5
                            ],
                            texture: "#0"
                        }
                    }
                },
                {
                    from: [
                        6,
                        20,
                        6
                    ],
                    to: [
                        10,
                        24,
                        10
                    ],
                    faces: {
                        east: {
                            uv: [
                                9.25,
                                1,
                                10.25,
                                2
                            ],
                            texture: "#0"
                        },
                        north: {
                            uv: [
                                10.25,
                                1,
                                11.25,
                                2
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                11.25,
                                1,
                                12.25,
                                2
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                12.25,
                                1,
                                13.25,
                                2
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                10.25,
                                0,
                                11.25,
                                1
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                11.25,
                                0,
                                12.25,
                                1
                            ],
                            rotation: 180,
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(t, V.none());
            let i = new z(undefined, {
                0: e.withPrefix("entity/copper_golem/").toString()
            }, [
                {
                    from: [
                        4,
                        5,
                        5
                    ],
                    to: [
                        12,
                        11,
                        11
                    ],
                    faces: {
                        east: {
                            uv: [
                                0,
                                5.25,
                                1.5,
                                6.75
                            ],
                            texture: "#0"
                        },
                        north: {
                            uv: [
                                1.5,
                                5.25,
                                3.5,
                                6.75
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                3.5,
                                5.25,
                                5,
                                6.75
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                5,
                                5.25,
                                7,
                                6.75
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                1.5,
                                3.75,
                                3.5,
                                5.25
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                3.5,
                                3.75,
                                5.5,
                                5.25
                            ],
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(t, V.none());
            let a = new z(undefined, {
                0: e.withPrefix("entity/copper_golem/").toString()
            }, [
                {
                    from: [
                        12,
                        2,
                        6
                    ],
                    to: [
                        15,
                        12,
                        10
                    ],
                    faces: {
                        east: {
                            uv: [
                                9,
                                5,
                                10,
                                7.5
                            ],
                            texture: "#0"
                        },
                        north: {
                            uv: [
                                10,
                                5,
                                10.75,
                                7.5
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                10.75,
                                5,
                                11.75,
                                7.5
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                11.75,
                                5,
                                12.5,
                                7.5
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                10,
                                4,
                                10.75,
                                5
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                10.75,
                                4,
                                11.5,
                                5
                            ],
                            rotation: 180,
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(t, V.none());
            let o = new z(undefined, {
                0: e.withPrefix("entity/copper_golem/").toString()
            }, [
                {
                    from: [
                        1,
                        2,
                        6
                    ],
                    to: [
                        4,
                        12,
                        10
                    ],
                    faces: {
                        east: {
                            uv: [
                                12.5,
                                5,
                                13.5,
                                7.5
                            ],
                            texture: "#0"
                        },
                        north: {
                            uv: [
                                13.5,
                                5,
                                14.25,
                                7.5
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                14.25,
                                5,
                                15.25,
                                7.5
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                15.25,
                                5,
                                16,
                                7.5
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                13.5,
                                4,
                                14.25,
                                5
                            ],
                            rotation: 180,
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                14.25,
                                4,
                                15,
                                5
                            ],
                            rotation: 180,
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(t, V.none());
            let u = new z(undefined, {
                0: e.withPrefix("entity/copper_golem/").toString()
            }, [
                {
                    from: [
                        8,
                        0,
                        6
                    ],
                    to: [
                        12,
                        5,
                        10
                    ],
                    faces: {
                        east: {
                            uv: [
                                0,
                                7.75,
                                1,
                                9
                            ],
                            texture: "#0"
                        },
                        north: {
                            uv: [
                                1,
                                7.75,
                                2,
                                9
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                2,
                                7.75,
                                3,
                                9
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                3,
                                7.75,
                                4,
                                9
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                1,
                                6.75,
                                2,
                                7.75
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                2,
                                6.75,
                                3,
                                7.75
                            ],
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(t, V.none());
            let d = new z(undefined, {
                0: e.withPrefix("entity/copper_golem/").toString()
            }, [
                {
                    from: [
                        4,
                        0,
                        6
                    ],
                    to: [
                        8,
                        5,
                        10
                    ],
                    faces: {
                        east: {
                            uv: [
                                4,
                                7.75,
                                5,
                                9
                            ],
                            texture: "#0"
                        },
                        north: {
                            uv: [
                                5,
                                7.75,
                                6,
                                9
                            ],
                            texture: "#0"
                        },
                        west: {
                            uv: [
                                6,
                                7.75,
                                7,
                                9
                            ],
                            texture: "#0"
                        },
                        south: {
                            uv: [
                                7,
                                7.75,
                                8,
                                9
                            ],
                            texture: "#0"
                        },
                        up: {
                            uv: [
                                5,
                                6.75,
                                6,
                                7.75
                            ],
                            texture: "#0"
                        },
                        down: {
                            uv: [
                                6,
                                6.75,
                                7,
                                7.75
                            ],
                            texture: "#0"
                        }
                    }
                }
            ]).getMesh(t, V.none());
            let f = new e_1;
            switch(r){
                case "sitting":
                    let m = vt();
                    Tl(m, m, [
                        0,
                        -5,
                        2
                    ]);
                    f.merge(i.transform(m));
                    let p = new z(undefined, {
                        0: e.withPrefix("entity/copper_golem/").toString()
                    }, [
                        {
                            from: [
                                5,
                                6,
                                6
                            ],
                            to: [
                                11,
                                7,
                                12
                            ],
                            faces: {
                                east: {
                                    uv: [
                                        0.75,
                                        6.25,
                                        2.25,
                                        6.5
                                    ],
                                    texture: "#0"
                                },
                                north: {
                                    uv: [
                                        2.25,
                                        6.25,
                                        3.75,
                                        6.5
                                    ],
                                    texture: "#0"
                                },
                                west: {
                                    uv: [
                                        3.75,
                                        6.25,
                                        5.25,
                                        6.5
                                    ],
                                    texture: "#0"
                                },
                                south: {
                                    uv: [
                                        5.25,
                                        6.25,
                                        6.75,
                                        6.5
                                    ],
                                    texture: "#0"
                                },
                                up: {
                                    uv: [
                                        2.25,
                                        4.75,
                                        3.75,
                                        6.25
                                    ],
                                    texture: "#0"
                                },
                                down: {
                                    uv: [
                                        3.75,
                                        4.75,
                                        5.25,
                                        6.25
                                    ],
                                    texture: "#0"
                                }
                            }
                        },
                        {
                            from: [
                                4,
                                1,
                                4
                            ],
                            to: [
                                12,
                                7,
                                7
                            ],
                            faces: {
                                east: {
                                    uv: [
                                        0.75,
                                        5.25,
                                        1.5,
                                        6.75
                                    ],
                                    rotation: 180,
                                    texture: "#0"
                                },
                                north: {
                                    uv: [
                                        1.5,
                                        5.25,
                                        3.5,
                                        6.75
                                    ],
                                    rotation: 180,
                                    texture: "#0"
                                },
                                west: {
                                    uv: [
                                        3.5,
                                        5.25,
                                        4.25,
                                        6.75
                                    ],
                                    rotation: 180,
                                    texture: "#0"
                                },
                                south: {
                                    uv: [
                                        4.25,
                                        5.25,
                                        6.25,
                                        6.75
                                    ],
                                    rotation: 180,
                                    texture: "#0"
                                },
                                up: {
                                    uv: [
                                        1.5,
                                        4.5,
                                        3.5,
                                        5.25
                                    ],
                                    rotation: 180,
                                    texture: "#0"
                                },
                                down: {
                                    uv: [
                                        3.5,
                                        4.75,
                                        5.5,
                                        5.5
                                    ],
                                    rotation: 180,
                                    texture: "#0"
                                }
                            }
                        }
                    ]).getMesh(t, V.none());
                    f.merge(p);
                    let g = vt();
                    Tl(g, g, [
                        0,
                        -4,
                        0
                    ]);
                    f.merge(s.transform(g));
                    let x = vt();
                    Tl(x, x, [
                        0,
                        5.5,
                        6.5
                    ]);
                    eL(x, x, 0.61086524);
                    Tl(x, x, [
                        0,
                        -7,
                        -8
                    ]);
                    f.merge(a.transform(x));
                    f.merge(o.transform(x));
                    let w = vt();
                    Tl(w, w, [
                        2.5,
                        2.5,
                        2
                    ]);
                    eL(w, w, Math.PI / 2);
                    Tl(w, w, [
                        -2.5,
                        -1,
                        -7.5
                    ]);
                    f.merge(u.transform(w));
                    f.merge(d.transform(w));
                    break;
                case "running":
                    let v = vt();
                    Tl(v, v, [
                        0,
                        0,
                        -2
                    ]);
                    f.merge(s.transform(v));
                    let b = vt();
                    Tl(b, b, [
                        0,
                        0,
                        -2
                    ]);
                    Tl(b, b, [
                        -8,
                        -8,
                        -6
                    ]);
                    eL(b, b, -0.120399);
                    Z8(b, b, 0.0064);
                    Qr(b, b, -0.0779);
                    Tl(b, b, [
                        6.4,
                        7.5,
                        9.5
                    ]);
                    f.merge(i.transform(b));
                    let y = vt();
                    Tl(y, y, [
                        0,
                        7,
                        8
                    ]);
                    eL(y, y, -1.003564);
                    Tl(y, y, [
                        0,
                        -7,
                        -5
                    ]);
                    f.merge(a.transform(y));
                    let _ = vt();
                    Tl(_, _, [
                        0,
                        7,
                        8
                    ]);
                    eL(_, _, 0.872665);
                    Z8(_, _, 0.0535);
                    Qr(_, _, -0.0449);
                    Tl(_, _, [
                        0,
                        -7,
                        -10.25
                    ]);
                    f.merge(o.transform(_));
                    let M = vt();
                    Tl(M, M, [
                        10,
                        2.5,
                        4.6
                    ]);
                    eL(M, M, 0.872665);
                    Tl(M, M, [
                        -10.6,
                        -1.5,
                        -7.5
                    ]);
                    f.merge(u.transform(M));
                    let S = vt();
                    Tl(S, S, [
                        6,
                        2.5,
                        10
                    ]);
                    eL(S, S, -0.7854);
                    Tl(S, S, [
                        -6.4,
                        -1.5,
                        -8
                    ]);
                    f.merge(d.transform(S));
                    break;
                case "star":
                    f.merge(s);
                    f.merge(i);
                    let I = vt();
                    Tl(I, I, [
                        11,
                        10,
                        8
                    ]);
                    Qr(I, I, 1.91986);
                    Tl(I, I, [
                        -13.5,
                        -7,
                        -8
                    ]);
                    f.merge(a.transform(I));
                    let L = vt();
                    Tl(L, L, [
                        5,
                        10,
                        8
                    ]);
                    Qr(L, L, -1.91986);
                    Tl(L, L, [
                        -2.5,
                        -7,
                        -8
                    ]);
                    f.merge(o.transform(L));
                    let E = vt();
                    Tl(E, E, [
                        10.75,
                        3,
                        8
                    ]);
                    Qr(E, E, 0.2618);
                    Tl(E, E, [
                        -10,
                        -2.5,
                        -8
                    ]);
                    f.merge(u.transform(E));
                    let N = vt();
                    Tl(N, N, [
                        5.25,
                        3,
                        8
                    ]);
                    Qr(N, N, -0.2618);
                    Tl(N, N, [
                        -6,
                        -2.5,
                        -8
                    ]);
                    f.merge(d.transform(N));
                    break;
                default:
                    f.merge(i);
                    f.merge(s);
                    f.merge(a);
                    f.merge(o);
                    f.merge(u);
                    f.merge(d);
            }
            return f;
        };
    };
    let g = new Map(Object.entries({
        "minecraft:chest": e.chestRenderer(gw.create("normal")),
        "minecraft:ender_chest": e.chestRenderer(gw.create("ender")),
        "minecraft:trapped_chest": e.chestRenderer(gw.create("trapped")),
        "minecraft:copper_chest": e.chestRenderer(gw.create("copper")),
        "minecraft:exposed_copper_chest": e.chestRenderer(gw.create("copper_exposed")),
        "minecraft:weathered_copper_chest": e.chestRenderer(gw.create("copper_weathered")),
        "minecraft:oxidized_copper_chest": e.chestRenderer(gw.create("copper_oxidized")),
        "minecraft:waxed_copper_chest": e.chestRenderer(gw.create("copper")),
        "minecraft:waxed_exposed_copper_chest": e.chestRenderer(gw.create("copper_exposed")),
        "minecraft:waxed_weathered_copper_chest": e.chestRenderer(gw.create("copper_weathered")),
        "minecraft:waxed_oxidized_copper_chest": e.chestRenderer(gw.create("copper_oxidized"))
    }));
    let x = new Map(Object.entries({
        "minecraft:skeleton_skull": e.headRenderer(gw.create("skeleton/skeleton"), 2),
        "minecraft:wither_skeleton_skull": e.headRenderer(gw.create("skeleton/wither_skeleton"), 2),
        "minecraft:zombie_head": e.headRenderer(gw.create("zombie/zombie"), 1),
        "minecraft:creeper_head": e.headRenderer(gw.create("creeper/creeper"), 2),
        "minecraft:dragon_head": e.dragonHeadRenderer(),
        "minecraft:piglin_head": e.piglinHeadRenderer(),
        "minecraft:player_head": e.headRenderer(gw.create("player/wide/steve"), 1)
    }));
    let w = [
        "oak",
        "spruce",
        "birch",
        "jungle",
        "acacia",
        "dark_oak",
        "mangrove",
        "cherry",
        "pale_oak",
        "bamboo",
        "crimson",
        "warped"
    ];
    let v = new Map(w.map((t)=>[
            `minecraft:${t}_sign`,
            e.signRenderer(gw.create(t))
        ]));
    let b = new Map(w.map((t)=>[
            `minecraft:${t}_wall_sign`,
            e.wallSignRenderer(gw.create(t))
        ]));
    let y = new Map(w.map((t)=>[
            `minecraft:${t}_hanging_sign`,
            e.hangingSignRenderer(gw.create(t))
        ]));
    let _ = new Map(w.map((t)=>[
            `minecraft:${t}_wall_hanging_sign`,
            e.wallHangingSignRenderer(t)
        ]));
    let M = new Map(Object.keys(f).map((t)=>[
            `minecraft:${t}_shulker_box`,
            e.shulkerBoxRenderer(gw.create(`shulker_${t}`))
        ]));
    let S = new Map(Object.keys(f).map((t)=>[
            `minecraft:${t}_bed`,
            e.bedRenderer(gw.create(t))
        ]));
    let I = new Map(Object.keys(f).map((t)=>[
            `minecraft:${t}_banner`,
            e.bannerRenderer(t)
        ]));
    let L = new Map(Object.keys(f).map((t)=>[
            `minecraft:${t}_wall_banner`,
            e.wallBannerRenderer(t)
        ]));
    let E = new Map(Object.entries({
        "minecraft:copper_golem_statue": e.copperGolemStatueRenderer(gw.create("copper_golem")),
        "minecraft:exposed_copper_golem_statue": e.copperGolemStatueRenderer(gw.create("copper_golem_exposed")),
        "minecraft:weathered_copper_golem_statue": e.copperGolemStatueRenderer(gw.create("copper_golem_weathered")),
        "minecraft:oxidized_copper_golem_statue": e.copperGolemStatueRenderer(gw.create("copper_golem_oxidized")),
        "minecraft:waxed_copper_golem_statue": e.copperGolemStatueRenderer(gw.create("copper_golem")),
        "minecraft:waxed_exposed_copper_golem_statue": e.copperGolemStatueRenderer(gw.create("copper_golem_exposed")),
        "minecraft:waxed_weathered_copper_golem_statue": e.copperGolemStatueRenderer(gw.create("copper_golem_weathered")),
        "minecraft:waxed_oxidized_copper_golem_statue": e.copperGolemStatueRenderer(gw.create("copper_golem_oxidized"))
    }));
    e.getBlockMesh = function(e, s, i, o) {
        let c = new e_1;
        if (e.is("water")) {
            c.merge(d("water", p(e, "level"), i, o, 0));
        }
        if (e.is("lava")) {
            c.merge(d("lava", p(e, "level"), i, o));
        }
        let h = g.get(e.getName().toString());
        if (h !== undefined) {
            let t = m(e, "facing", "south");
            let r = vt();
            Tl(r, r, [
                8,
                8,
                8
            ]);
            Z8(r, r, t === "west" ? Math.PI / 2 : t === "south" ? Math.PI : t === "east" ? 3 * Math.PI / 2 : 0);
            Tl(r, r, [
                -8,
                -8,
                -8
            ]);
            c.merge(h(i).transform(r));
        }
        if (e.is("decorated_pot")) {
            c.merge(t(i));
        }
        let f = x.get(e.getName().toString());
        if (f !== undefined) {
            let t = p(e, "rotation") / 16 * Math.PI * 2;
            let r = vt();
            Tl(r, r, [
                8,
                8,
                8
            ]);
            Z8(r, r, t);
            Tl(r, r, [
                -8,
                -8,
                -8
            ]);
            c.merge(f(i).transform(r));
        }
        let w = v.get(e.getName().toString());
        if (w !== undefined) {
            let t = p(e, "rotation") / 16 * Math.PI * 2;
            let r = vt();
            Tl(r, r, [
                8,
                8,
                8
            ]);
            Z8(r, r, t);
            hs(r, r, [
                2 / 3,
                2 / 3,
                2 / 3
            ]);
            Tl(r, r, [
                -8,
                -8,
                -8
            ]);
            c.merge(w(i).transform(r));
        }
        let N = b.get(e.getName().toString());
        if (N !== undefined) {
            let t = m(e, "facing", "south");
            let r = vt();
            Tl(r, r, [
                8,
                8,
                8
            ]);
            Z8(r, r, t === "west" ? Math.PI / 2 : t === "south" ? Math.PI : t === "east" ? 3 * Math.PI / 2 : 0);
            hs(r, r, [
                2 / 3,
                2 / 3,
                2 / 3
            ]);
            Tl(r, r, [
                -8,
                -8,
                -8
            ]);
            c.merge(N(i).transform(r));
        }
        let T = y.get(e.getName().toString());
        if (T !== undefined) {
            let t = m(e, "attached", "false") === "true";
            let r = p(e, "rotation") / 16 * Math.PI * 2;
            let s = vt();
            Tl(s, s, [
                8,
                8,
                8
            ]);
            Z8(s, s, r);
            Tl(s, s, [
                -8,
                -8,
                -8
            ]);
            c.merge(T(t, i).transform(s));
        }
        let A = _.get(e.getName().toString());
        if (A !== undefined) {
            let t = m(e, "facing", "south");
            let r = vt();
            Tl(r, r, [
                8,
                8,
                8
            ]);
            Z8(r, r, t === "west" ? Math.PI / 2 : t === "south" ? Math.PI : t === "east" ? 3 * Math.PI / 2 : 0);
            Tl(r, r, [
                -8,
                -8,
                -8
            ]);
            c.merge(A(i).transform(r));
        }
        if (e.is("conduit")) {
            c.merge(r(i));
        }
        let R = M.get(e.getName().toString());
        if (R !== undefined) {
            let t = m(e, "facing", "up");
            let r = vt();
            Tl(r, r, [
                8,
                8,
                8
            ]);
            if (t === "down") {
                eL(r, r, Math.PI);
            } else if (t !== "up") {
                Z8(r, r, t === "east" ? Math.PI / 2 : t === "north" ? Math.PI : t === "west" ? 3 * Math.PI / 2 : 0);
                eL(r, r, Math.PI / 2);
            }
            Tl(r, r, [
                -8,
                -8,
                -8
            ]);
            c.merge(R(i).transform(r));
        }
        if (e.is("bell")) {
            let e = vt();
            Tl(e, e, [
                8,
                8,
                8
            ]);
            hs(e, e, [
                1,
                -1,
                -1
            ]);
            Tl(e, e, [
                -8,
                -8,
                -8
            ]);
            c.merge(u(i).transform(e));
        }
        let k = S.get(e.getName().toString());
        if (k !== undefined) {
            let t = m(e, "part", "head");
            let r = m(e, "facing", "south");
            let s = vt();
            Tl(s, s, [
                8,
                8,
                8
            ]);
            Z8(s, s, r === "east" ? Math.PI / 2 : r === "north" ? Math.PI : r === "west" ? 3 * Math.PI / 2 : 0);
            Tl(s, s, [
                -8,
                -8,
                -8
            ]);
            c.merge(k(t, i).transform(s));
        }
        let B = I.get(e.getName().toString());
        if (B !== undefined) {
            let t = p(e, "rotation") / 16 * Math.PI * 2;
            let r = vt();
            Tl(r, r, [
                8,
                24,
                8
            ]);
            Z8(r, r, t);
            hs(r, r, [
                2 / 3,
                2 / 3,
                2 / 3
            ]);
            Tl(r, r, [
                -8,
                -24,
                -8
            ]);
            c.merge(B(i, s?.getList("patterns", t$.Compound)).transform(r));
        }
        let C = L.get(e.getName().toString());
        if (C !== undefined) {
            let t = m(e, "facing", "south");
            let r = vt();
            Tl(r, r, [
                8,
                8,
                8
            ]);
            Z8(r, r, t === "east" ? Math.PI / 2 : t === "north" ? Math.PI : t === "west" ? 3 * Math.PI / 2 : 0);
            hs(r, r, [
                2 / 3,
                2 / 3,
                2 / 3
            ]);
            Tl(r, r, [
                -8,
                -23.2,
                -8
            ]);
            c.merge(C(i, s?.getList("patterns", t$.Compound)).transform(r));
        }
        let O = E.get(e.getName().toString());
        if (O !== undefined) {
            let t = m(e, "facing", "south");
            let r = m(e, "copper_golem_pose", "standing");
            let s = vt();
            Tl(s, s, [
                8,
                8,
                8
            ]);
            Z8(s, s, t === "west" ? Math.PI / 2 : t === "south" ? Math.PI : t === "east" ? 3 * Math.PI / 2 : 0);
            Tl(s, s, [
                -8,
                -8,
                -8
            ]);
            c.merge(O(i, r).transform(s));
        }
        if (!e.is("water") && !e.is("lava") && e.isWaterlogged()) {
            c.merge(d("water", 0, i, o, 0));
        }
        let P = vt();
        hs(P, P, [
            0.0625,
            0.0625,
            0.0625
        ]);
        return c.transform(P);
    };
})(y = y || (y = {}));
