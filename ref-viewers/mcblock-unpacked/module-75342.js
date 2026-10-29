let r = [
    {
        name: "alban",
        size: [
            1,
            1
        ]
    },
    {
        name: "aztec",
        size: [
            1,
            1
        ]
    },
    {
        name: "aztec2",
        size: [
            1,
            1
        ]
    },
    {
        name: "backyard",
        size: [
            3,
            4
        ]
    },
    {
        name: "baroque",
        size: [
            2,
            2
        ]
    },
    {
        name: "bomb",
        size: [
            1,
            1
        ]
    },
    {
        name: "bouquet",
        size: [
            3,
            3
        ]
    },
    {
        name: "burning_skull",
        size: [
            4,
            4
        ]
    },
    {
        name: "bust",
        size: [
            2,
            2
        ]
    },
    {
        name: "cavebird",
        size: [
            3,
            3
        ]
    },
    {
        name: "changing",
        size: [
            4,
            2
        ]
    },
    {
        name: "cotan",
        size: [
            3,
            3
        ]
    },
    {
        name: "courbet",
        size: [
            2,
            1
        ]
    },
    {
        name: "creebet",
        size: [
            2,
            1
        ]
    },
    {
        name: "donkey_kong",
        size: [
            4,
            3
        ]
    },
    {
        name: "earth",
        size: [
            2,
            2
        ]
    },
    {
        name: "endboss",
        size: [
            3,
            3
        ]
    },
    {
        name: "fern",
        size: [
            3,
            3
        ]
    },
    {
        name: "fighters",
        size: [
            4,
            2
        ]
    },
    {
        name: "finding",
        size: [
            4,
            2
        ]
    },
    {
        name: "fire",
        size: [
            2,
            2
        ]
    },
    {
        name: "graham",
        size: [
            1,
            2
        ]
    },
    {
        name: "humble",
        size: [
            2,
            2
        ]
    },
    {
        name: "kebab",
        size: [
            1,
            1
        ]
    },
    {
        name: "lowmist",
        size: [
            4,
            2
        ]
    },
    {
        name: "match",
        size: [
            2,
            2
        ]
    },
    {
        name: "meditative",
        size: [
            1,
            1
        ]
    },
    {
        name: "orb",
        size: [
            4,
            4
        ]
    },
    {
        name: "owlemons",
        size: [
            3,
            3
        ]
    },
    {
        name: "passage",
        size: [
            4,
            2
        ]
    },
    {
        name: "pigscene",
        size: [
            4,
            4
        ]
    },
    {
        name: "plant",
        size: [
            1,
            1
        ]
    },
    {
        name: "pointer",
        size: [
            4,
            4
        ]
    },
    {
        name: "pond",
        size: [
            3,
            4
        ]
    },
    {
        name: "pool",
        size: [
            2,
            1
        ]
    },
    {
        name: "prairie_ride",
        size: [
            1,
            2
        ]
    },
    {
        name: "sea",
        size: [
            2,
            1
        ]
    },
    {
        name: "skeleton",
        size: [
            4,
            3
        ]
    },
    {
        name: "skull_and_roses",
        size: [
            2,
            2
        ]
    },
    {
        name: "stage",
        size: [
            2,
            2
        ]
    },
    {
        name: "sunflowers",
        size: [
            3,
            3
        ]
    },
    {
        name: "sunset",
        size: [
            2,
            1
        ]
    },
    {
        name: "tides",
        size: [
            3,
            3
        ]
    },
    {
        name: "unpacked",
        size: [
            4,
            4
        ]
    },
    {
        name: "void",
        size: [
            2,
            2
        ]
    },
    {
        name: "wanderer",
        size: [
            1,
            2
        ]
    },
    {
        name: "wasteland",
        size: [
            1,
            1
        ]
    },
    {
        name: "water",
        size: [
            2,
            2
        ]
    },
    {
        name: "wind",
        size: [
            2,
            2
        ]
    },
    {
        name: "wither",
        size: [
            2,
            2
        ]
    }
];
export let OS = r.map(({ name })=>name);
let a = new Map(r.map(({ name, size })=>[
        name,
        size
    ]));
export function Vs(e) {
    if (!e) {
        return;
    }
    let t = e.trim().toLowerCase().replace(/^minecraft:/, "").replace(/^painting\//, "");
    if (/^[a-z0-9_.-]+$/.test(t)) {
        return t;
    }
}
export function o(e) {
    let t = Vs(e);
    let n = t ? a.get(t) : undefined;
    if (n) {
        return [
            n[0],
            n[1]
        ];
    }
    return [
        1,
        1
    ];
}
export function Hp(e) {
    let t = Vs(e);
    return !!(t && a.has(t));
}
