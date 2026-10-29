import { S, pe } from "./dist-C5TDMOul/chunk_pe.js";
import { _e, be, k, ve, xe, ye } from "./dist-C5TDMOul/chunk_ye.js";
import { M, N as upload, P } from "./dist-C5TDMOul/chunk_M.js";
import { ot } from "./dist-C5TDMOul/chunk_rt.js";
import { Bt, Ct, Et as worldSize, It as title, Lt, Nt, Ot, Q as turn, Rt, Tt, X, Z, jt, kt, wt, zt } from "./dist-C5TDMOul/chunk_Ct.js";
import { a, c, d, h as h_1, l, n, o, p as p_1, r, s, u } from "./schemas-Y3Thg5L-.js";
import { t } from "./coerce-DKh1SG0-.js";
import { _ as __1 } from "./dist-C66QuM2X.js";
d({
    error: p_1(),
    message: p_1()
});
d({
    status: c(`ok`),
    uptime: u(),
    db: n([
        `up`,
        `down`
    ]),
    inngest: d({
        status: n([
            `registered`,
            `skipped`,
            `failed`
        ]),
        at: p_1().nullable(),
        error: p_1().nullable()
    }),
    turns: n([
        `consuming`,
        `starting`,
        `off`
    ])
});
d({
    message: p_1().min(1).max(500)
});
d({
    id: p_1(),
    message: p_1(),
    createdAt: p_1()
});
const f = n([
    `build_mode`,
    `no_ads`,
    `editor`,
    `badge`,
    `test_servers`
]);
const allowances = d({
    testServerMinutes: u().int().positive().optional()
});
const p = n([
    `purple`,
    `gold`
]).nullable().default(null);
d({
    capabilities: r(f),
    plans: r(d({
        id: p_1(),
        source: n([
            `subscription`,
            `purchase`,
            `admin`,
            `promo`
        ]),
        endsAt: p_1().nullable()
    }))
});
const ne = n([
    `browse`,
    `view_3d`,
    `publish`,
    `convert`,
    `funds_development`
]);
const re = [
    {
        slug: `building`
    },
    {
        slug: `farm`
    },
    {
        slug: `redstone`
    },
    {
        slug: `decoration`
    },
    {
        slug: `landscape`
    }
];
const ie = [
    {
        slug: `villager`
    },
    {
        slug: `iron-golem`
    },
    {
        slug: `zombified-piglin`
    },
    {
        slug: `piglin`
    },
    {
        slug: `enderman`
    },
    {
        slug: `guardian`
    },
    {
        slug: `blaze`
    },
    {
        slug: `creeper`
    },
    {
        slug: `skeleton`
    },
    {
        slug: `zombie`
    },
    {
        slug: `spider`
    },
    {
        slug: `cave-spider`
    },
    {
        slug: `slime`
    },
    {
        slug: `witch`
    },
    {
        slug: `wither-skeleton`
    },
    {
        slug: `ghast`
    },
    {
        slug: `magma-cube`
    },
    {
        slug: `shulker`
    },
    {
        slug: `drowned`
    },
    {
        slug: `squid`
    },
    {
        slug: `warden`
    },
    {
        slug: `hoglin`
    },
    {
        slug: `pillager`
    },
    {
        slug: `wither`
    },
    {
        slug: `ender-dragon`
    },
    {
        slug: `snow-golem`
    },
    {
        slug: `chicken`
    },
    {
        slug: `cow`
    },
    {
        slug: `sheep`
    },
    {
        slug: `bee`
    },
    {
        slug: `turtle`
    },
    {
        slug: `frog`
    },
    {
        slug: `goat`
    },
    {
        slug: `sniffer`
    },
    {
        slug: `axolotl`
    },
    {
        slug: `cat`
    },
    {
        slug: `fish`
    },
    {
        slug: `creaking`
    },
    {
        slug: `allay`
    }
];
const ae = [
    {
        slug: `medieval`
    },
    {
        slug: `modern`
    },
    {
        slug: `fantasy`
    },
    {
        slug: `sci-fi`
    },
    {
        slug: `rustic`
    },
    {
        slug: `cozy`
    },
    {
        slug: `industrial`
    },
    {
        slug: `japanese`
    },
    {
        slug: `mediterranean`
    },
    {
        slug: `desert`
    },
    {
        slug: `egyptian`
    },
    {
        slug: `gothic`
    },
    {
        slug: `steampunk`
    },
    {
        slug: `nordic`
    },
    {
        slug: `greek`
    },
    {
        slug: `mesoamerican`
    },
    {
        slug: `nether`
    },
    {
        slug: `end`
    },
    {
        slug: `halloween`
    },
    {
        slug: `christmas`
    }
];
const oe = [
    {
        slug: `mob`
    },
    {
        slug: `animal`
    },
    {
        slug: `person`
    },
    {
        slug: `character`
    },
    {
        slug: `creature`
    },
    {
        slug: `vehicle-subject`
    },
    {
        slug: `landmark`
    },
    {
        slug: `emblem`
    },
    {
        slug: `flag`
    },
    {
        slug: `plant`
    },
    {
        slug: `food-object`
    },
    {
        slug: `object`
    },
    {
        slug: `robot`
    }
];
const m = [
    {
        slug: `aircraft`,
        category: `building`,
        priority: 3,
        aliases: [
            `plane`,
            `flying vehicle`,
            `spaceship`
        ]
    },
    {
        slug: `airport`,
        category: `building`,
        priority: 2,
        aliases: [
            `terminal`,
            `hangar`
        ]
    },
    {
        slug: `airship`,
        category: `building`,
        priority: 3
    },
    {
        slug: `apartment`,
        category: `building`,
        priority: 2,
        aliases: [
            `apartment building`,
            `flats`
        ]
    },
    {
        slug: `arena`,
        category: `building`,
        priority: 1,
        aliases: [
            `colosseum`,
            `pvp arena`,
            `battle arena`
        ]
    },
    {
        slug: `barn`,
        category: `building`,
        priority: 3
    },
    {
        slug: `base`,
        category: `building`,
        priority: 1,
        aliases: [
            `survival base`,
            `stash`,
            `hideout`
        ]
    },
    {
        slug: `blacksmith`,
        category: `building`,
        priority: 3
    },
    {
        slug: `bridge`,
        category: `building`,
        priority: 2
    },
    {
        slug: `bunker`,
        category: `building`,
        priority: 2,
        aliases: [
            `fallout shelter`
        ]
    },
    {
        slug: `castle`,
        category: `building`,
        priority: 1
    },
    {
        slug: `church`,
        category: `building`,
        priority: 1,
        aliases: [
            `cathedral`,
            `chapel`
        ]
    },
    {
        slug: `city`,
        category: `building`,
        priority: 1
    },
    {
        slug: `factory`,
        category: `building`,
        priority: 2
    },
    {
        slug: `gas-station`,
        category: `building`,
        priority: 3,
        aliases: [
            `petrol station`
        ]
    },
    {
        slug: `greenhouse`,
        category: `building`,
        priority: 2
    },
    {
        slug: `harbour`,
        category: `building`,
        priority: 3
    },
    {
        slug: `hospital`,
        category: `building`,
        priority: 3,
        aliases: [
            `clinic`
        ]
    },
    {
        slug: `hotel`,
        category: `building`,
        priority: 2,
        aliases: [
            `resort`
        ]
    },
    {
        slug: `house`,
        category: `building`,
        priority: 1,
        aliases: [
            `home`,
            `cottage`,
            `survival house`,
            `starter house`
        ]
    },
    {
        slug: `inn-tavern`,
        category: `building`,
        priority: 3,
        aliases: [
            `tavern`,
            `inn`,
            `pub`
        ]
    },
    {
        slug: `library`,
        category: `building`,
        priority: 3
    },
    {
        slug: `lighthouse`,
        category: `building`,
        priority: 3
    },
    {
        slug: `mansion`,
        category: `building`,
        priority: 1,
        aliases: [
            `manor`,
            `estate`,
            `large house`
        ]
    },
    {
        slug: `maze`,
        category: `building`,
        priority: 3
    },
    {
        slug: `museum`,
        category: `building`,
        priority: 3
    },
    {
        slug: `nether-hub`,
        category: `building`,
        priority: 2,
        aliases: [
            `portal hub`,
            `nether tunnel hub`
        ]
    },
    {
        slug: `nether-portal`,
        category: `building`,
        priority: 1,
        aliases: [
            `portal design`,
            `portal frame`
        ]
    },
    {
        slug: `pagoda`,
        category: `building`,
        priority: 2,
        aliases: [
            `stupa`
        ]
    },
    {
        slug: `railway`,
        category: `building`,
        priority: 1,
        aliases: [
            `train station`,
            `rail network`,
            `train line`,
            `transportation`
        ]
    },
    {
        slug: `restaurant`,
        category: `building`,
        priority: 2,
        aliases: [
            `cafe`,
            `diner`,
            `fast food`
        ]
    },
    {
        slug: `rollercoaster`,
        category: `building`,
        priority: 3
    },
    {
        slug: `school`,
        category: `building`,
        priority: 3,
        aliases: [
            `university`,
            `college`
        ]
    },
    {
        slug: `ship`,
        category: `building`,
        priority: 1,
        aliases: [
            `boat`,
            `galleon`,
            `sailing ship`
        ]
    },
    {
        slug: `shop`,
        category: `building`,
        priority: 2
    },
    {
        slug: `skyscraper`,
        category: `building`,
        priority: 1,
        aliases: [
            `high rise`,
            `tall building`
        ]
    },
    {
        slug: `stable`,
        category: `building`,
        priority: 3
    },
    {
        slug: `temple`,
        category: `building`,
        priority: 1
    },
    {
        slug: `tower`,
        category: `building`,
        priority: 1
    },
    {
        slug: `treehouse`,
        category: `building`,
        priority: 2,
        aliases: [
            `tree house`,
            `tree base`
        ]
    },
    {
        slug: `tunnel`,
        category: `building`,
        priority: 3
    },
    {
        slug: `vehicle`,
        category: `building`,
        priority: 3,
        aliases: [
            `car`,
            `truck`,
            `tank`
        ]
    },
    {
        slug: `village`,
        category: `building`,
        priority: 1
    },
    {
        slug: `wall`,
        category: `building`,
        priority: 3,
        aliases: [
            `wall and gate`,
            `gatehouse`,
            `perimeter wall`
        ]
    },
    {
        slug: `warehouse`,
        category: `building`,
        priority: 1
    },
    {
        slug: `windmill`,
        category: `building`,
        priority: 3
    },
    {
        slug: `banner-design`,
        category: `decoration`,
        priority: 3
    },
    {
        slug: `enchanting-room`,
        category: `decoration`,
        priority: 2
    },
    {
        slug: `firework-show`,
        category: `decoration`,
        priority: 3
    },
    {
        slug: `fountain`,
        category: `decoration`,
        priority: 2
    },
    {
        slug: `furniture`,
        category: `decoration`,
        priority: 2
    },
    {
        slug: `garden`,
        category: `decoration`,
        priority: 2
    },
    {
        slug: `interior`,
        category: `decoration`,
        priority: 2,
        aliases: [
            `interior design`,
            `room design`,
            `furnishing`
        ]
    },
    {
        slug: `lighting`,
        category: `decoration`,
        priority: 3
    },
    {
        slug: `map-art`,
        category: `decoration`,
        priority: 2,
        aliases: [
            `map wall`
        ]
    },
    {
        slug: `pixel-art`,
        category: `decoration`,
        priority: 1,
        aliases: [
            `block art`
        ]
    },
    {
        slug: `roof`,
        category: `decoration`,
        priority: 3
    },
    {
        slug: `statue`,
        category: `decoration`,
        priority: 1
    },
    {
        slug: `amethyst-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `axolotl-farm`,
        category: `farm`,
        priority: 3,
        mobs: [
            `axolotl`
        ]
    },
    {
        slug: `bamboo-farm`,
        category: `farm`,
        priority: 2
    },
    {
        slug: `basalt-generator`,
        category: `farm`,
        priority: 3,
        aliases: [
            `basalt farm`
        ]
    },
    {
        slug: `bee-farm`,
        category: `farm`,
        priority: 2,
        aliases: [
            `honey farm`,
            `honeycomb farm`
        ],
        mobs: [
            `bee`
        ]
    },
    {
        slug: `blaze-farm`,
        category: `farm`,
        priority: 2,
        mobs: [
            `blaze`
        ]
    },
    {
        slug: `bone-meal-farm`,
        category: `farm`,
        priority: 2,
        aliases: [
            `bonemeal farm`,
            `composter farm`
        ]
    },
    {
        slug: `cactus-farm`,
        category: `farm`,
        priority: 2
    },
    {
        slug: `carrot-farm`,
        category: `farm`,
        priority: 2,
        mobs: [
            `villager`
        ]
    },
    {
        slug: `cat-farm`,
        category: `farm`,
        priority: 3,
        mobs: [
            `cat`
        ]
    },
    {
        slug: `chicken-farm`,
        category: `farm`,
        priority: 2,
        mobs: [
            `chicken`
        ]
    },
    {
        slug: `chorus-fruit-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `clay-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `cobblestone-generator`,
        category: `farm`,
        priority: 2,
        aliases: [
            `cobblestone farm`,
            `cobble gen`,
            `stone farm`
        ]
    },
    {
        slug: `cocoa-bean-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `coral-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `cow-farm`,
        category: `farm`,
        priority: 2,
        mobs: [
            `cow`
        ]
    },
    {
        slug: `creeper-farm`,
        category: `farm`,
        priority: 1,
        mobs: [
            `creeper`
        ]
    },
    {
        slug: `crop-farm`,
        category: `farm`,
        priority: 2,
        aliases: [
            `villager crop farm`,
            `farmer crop farm`,
            `food farm`,
            `bone meal crop farm`
        ],
        mobs: [
            `villager`
        ]
    },
    {
        slug: `dripstone-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `drowned-farm`,
        category: `farm`,
        priority: 3,
        aliases: [
            `trident farm`,
            `copper farm`,
            `nautilus shell farm`
        ],
        mobs: [
            `drowned`
        ]
    },
    {
        slug: `ender-dragon-farm`,
        category: `farm`,
        priority: 3,
        mobs: [
            `ender-dragon`
        ]
    },
    {
        slug: `enderman-farm`,
        category: `farm`,
        priority: 2,
        aliases: [
            `ender pearl farm`,
            `endermen farm`
        ],
        mobs: [
            `enderman`
        ]
    },
    {
        slug: `fish-farm`,
        category: `farm`,
        priority: 2,
        mobs: [
            `fish`
        ]
    },
    {
        slug: `foliage-farm`,
        category: `farm`,
        priority: 3,
        aliases: [
            `plant farm`,
            `grass farm`,
            `leaves farm`,
            `vine farm`,
            `seagrass farm`,
            `ground cover farm`
        ]
    },
    {
        slug: `flower-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `frog-farm`,
        category: `farm`,
        priority: 3,
        aliases: [
            `froglight farm`
        ],
        mobs: [
            `frog`,
            `magma-cube`
        ]
    },
    {
        slug: `ghast-farm`,
        category: `farm`,
        priority: 3,
        mobs: [
            `ghast`
        ]
    },
    {
        slug: `glow-berry-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `glow-lichen-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `goat-horn-farm`,
        category: `farm`,
        priority: 3,
        mobs: [
            `goat`
        ]
    },
    {
        slug: `gold-farm`,
        category: `farm`,
        priority: 1,
        aliases: [
            `zombified piglin farm`,
            `piglin farm`
        ],
        mobs: [
            `zombified-piglin`
        ]
    },
    {
        slug: `guardian-farm`,
        category: `farm`,
        priority: 2,
        aliases: [
            `monument farm`,
            `prismarine farm`
        ],
        mobs: [
            `guardian`
        ]
    },
    {
        slug: `hoglin-farm`,
        category: `farm`,
        priority: 3,
        mobs: [
            `hoglin`
        ]
    },
    {
        slug: `ice-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `iron-farm`,
        category: `farm`,
        priority: 1,
        aliases: [
            `iron golem farm`
        ],
        mobs: [
            `villager`,
            `iron-golem`
        ]
    },
    {
        slug: `kelp-farm`,
        category: `farm`,
        priority: 2
    },
    {
        slug: `lava-farm`,
        category: `farm`,
        priority: 2
    },
    {
        slug: `magma-cube-farm`,
        category: `farm`,
        priority: 3,
        mobs: [
            `magma-cube`
        ]
    },
    {
        slug: `melon-farm`,
        category: `farm`,
        priority: 2
    },
    {
        slug: `mob-farm`,
        category: `farm`,
        priority: 1,
        aliases: [
            `dark room farm`,
            `general mob farm`,
            `mob grinder`,
            `monster spawner farm`,
            `dungeon farm`
        ],
        mobs: [
            `zombie`,
            `skeleton`,
            `creeper`,
            `spider`
        ]
    },
    {
        slug: `moss-farm`,
        category: `farm`,
        priority: 3,
        aliases: [
            `dirt farm`
        ]
    },
    {
        slug: `mud-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `mushroom-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `nether-wart-farm`,
        category: `farm`,
        priority: 2
    },
    {
        slug: `obsidian-farm`,
        category: `farm`,
        priority: 2
    },
    {
        slug: `piglin-barter-farm`,
        category: `farm`,
        priority: 2,
        aliases: [
            `barter farm`,
            `bartering farm`,
            `gold trading farm`
        ],
        mobs: [
            `piglin`
        ]
    },
    {
        slug: `potato-farm`,
        category: `farm`,
        priority: 2,
        mobs: [
            `villager`
        ]
    },
    {
        slug: `propagule-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `pumpkin-farm`,
        category: `farm`,
        priority: 2
    },
    {
        slug: `raid-farm`,
        category: `farm`,
        priority: 2,
        aliases: [
            `totem farm`,
            `pillager farm`
        ],
        mobs: [
            `pillager`
        ]
    },
    {
        slug: `resin-farm`,
        category: `farm`,
        priority: 2,
        mobs: [
            `creaking`
        ]
    },
    {
        slug: `rooted-dirt-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `sea-pickle-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `sheep-farm`,
        category: `farm`,
        priority: 2,
        aliases: [
            `wool farm`
        ],
        mobs: [
            `sheep`
        ]
    },
    {
        slug: `shroom-light-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `shulker-farm`,
        category: `farm`,
        priority: 2,
        mobs: [
            `shulker`
        ]
    },
    {
        slug: `skeleton-farm`,
        category: `farm`,
        priority: 2,
        mobs: [
            `skeleton`
        ]
    },
    {
        slug: `slime-block-farm`,
        category: `farm`,
        priority: 3,
        mobs: [
            `slime`
        ]
    },
    {
        slug: `slime-farm`,
        category: `farm`,
        priority: 2,
        mobs: [
            `slime`
        ]
    },
    {
        slug: `sniffer-farm`,
        category: `farm`,
        priority: 3,
        mobs: [
            `sniffer`
        ]
    },
    {
        slug: `snow-farm`,
        category: `farm`,
        priority: 3,
        mobs: [
            `snow-golem`
        ]
    },
    {
        slug: `spider-farm`,
        category: `farm`,
        priority: 2,
        aliases: [
            `cave spider farm`,
            `string farm`,
            `spider eye farm`
        ],
        mobs: [
            `spider`,
            `cave-spider`
        ]
    },
    {
        slug: `squid-farm`,
        category: `farm`,
        priority: 3,
        mobs: [
            `squid`
        ]
    },
    {
        slug: `stone-generator`,
        category: `farm`,
        priority: 2,
        aliases: [
            `smooth stone farm`
        ]
    },
    {
        slug: `sugarcane-farm`,
        category: `farm`,
        priority: 2,
        aliases: [
            `sugar cane farm`,
            `paper farm`
        ]
    },
    {
        slug: `sweet-berry-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `tree-farm`,
        category: `farm`,
        priority: 2,
        aliases: [
            `wood farm`,
            `lumber farm`
        ]
    },
    {
        slug: `trial-spawner-farm`,
        category: `farm`,
        priority: 2,
        aliases: [
            `vault farm`,
            `trial chamber farm`,
            `ominous farm`
        ],
        mobs: [
            `zombie`,
            `skeleton`,
            `spider`
        ]
    },
    {
        slug: `turtle-farm`,
        category: `farm`,
        priority: 3,
        aliases: [
            `scute farm`
        ],
        mobs: [
            `turtle`
        ]
    },
    {
        slug: `villager-breeder`,
        category: `farm`,
        priority: 2,
        aliases: [
            `villager breeding`
        ],
        mobs: [
            `villager`
        ]
    },
    {
        slug: `villager-curing`,
        category: `farm`,
        priority: 2,
        mobs: [
            `villager`,
            `zombie`
        ]
    },
    {
        slug: `villager-trading-hall`,
        category: `farm`,
        priority: 2,
        aliases: [
            `trading hall`,
            `villager hall`
        ],
        mobs: [
            `villager`
        ]
    },
    {
        slug: `warden-farm`,
        category: `farm`,
        priority: 3,
        aliases: [
            `sculk farm`,
            `skulk farm`
        ],
        mobs: [
            `warden`
        ]
    },
    {
        slug: `wheat-farm`,
        category: `farm`,
        priority: 2,
        mobs: [
            `villager`
        ]
    },
    {
        slug: `witch-farm`,
        category: `farm`,
        priority: 2,
        mobs: [
            `witch`
        ]
    },
    {
        slug: `wither-rose-farm`,
        category: `farm`,
        priority: 3,
        mobs: [
            `wither`
        ]
    },
    {
        slug: `wither-skeleton-farm`,
        category: `farm`,
        priority: 2,
        aliases: [
            `wither skull farm`
        ],
        mobs: [
            `wither-skeleton`
        ]
    },
    {
        slug: `zombie-farm`,
        category: `farm`,
        priority: 2,
        mobs: [
            `zombie`
        ]
    },
    {
        slug: `cave`,
        category: `landscape`,
        priority: 3
    },
    {
        slug: `custom-tree`,
        category: `landscape`,
        priority: 1,
        aliases: [
            `giant tree`,
            `hand built tree`
        ]
    },
    {
        slug: `island`,
        category: `landscape`,
        priority: 1
    },
    {
        slug: `lake-pond`,
        category: `landscape`,
        priority: 3,
        aliases: [
            `pond`,
            `lake`
        ]
    },
    {
        slug: `mountain`,
        category: `landscape`,
        priority: 2
    },
    {
        slug: `park`,
        category: `landscape`,
        priority: 3
    },
    {
        slug: `path-road`,
        category: `landscape`,
        priority: 3,
        aliases: [
            `road`,
            `pathway`
        ]
    },
    {
        slug: `rock-formation`,
        category: `landscape`,
        priority: 3,
        aliases: [
            `boulders`,
            `landscaping items`,
            `misc landscaping`
        ]
    },
    {
        slug: `terrain`,
        category: `landscape`,
        priority: 2,
        aliases: [
            `landscaping`,
            `terraforming`,
            `custom terrain`
        ]
    },
    {
        slug: `waterfall`,
        category: `landscape`,
        priority: 3
    },
    {
        slug: `armor-equipper`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `auto-crafter`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `crafting system`,
            `auto crafting`,
            `crafter`
        ]
    },
    {
        slug: `automated-mining`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `quarry`,
            `drill`,
            `auto miner`
        ]
    },
    {
        slug: `bedrock-breaker`,
        category: `redstone`,
        priority: 3,
        aliases: [
            `bedrock remover`
        ]
    },
    {
        slug: `brewing-system`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `potion brewer`,
            `brewing stand array`
        ]
    },
    {
        slug: `carpet-duper`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `chunk-loader`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `chunk loaders`
        ]
    },
    {
        slug: `collection-system`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `collection systems`,
            `item collection`
        ]
    },
    {
        slug: `concrete-converter`,
        category: `redstone`,
        priority: 3,
        aliases: [
            `concrete powder convertor`,
            `concrete maker`,
            `concrete factory`
        ]
    },
    {
        slug: `contraption`,
        category: `redstone`,
        priority: 1,
        aliases: [
            `moving contraption`,
            `assembly`
        ]
    },
    {
        slug: `elevator`,
        category: `redstone`,
        priority: 2
    },
    {
        slug: `flying-machine`,
        category: `redstone`,
        priority: 2
    },
    {
        slug: `goat-launcher`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `horse-tester`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `item-sorter`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `sorting system`,
            `auto sorter`
        ]
    },
    {
        slug: `lava-remover`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `logic-gate`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `minecart-station`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `mob-switch`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `mobswitch`,
            `mob cap filler`
        ]
    },
    {
        slug: `mob-trap`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `trap`,
            `mob grinder trap`
        ]
    },
    {
        slug: `note-block-machine`,
        category: `redstone`,
        priority: 3,
        aliases: [
            `note block song`,
            `music machine`,
            `noteblock`
        ]
    },
    {
        slug: `ocean-drainer`,
        category: `redstone`,
        priority: 3,
        aliases: [
            `ocean remover`,
            `water remover`,
            `perimeter drainer`
        ]
    },
    {
        slug: `piston-door`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `hidden door`,
            `vault door`,
            `secret door`
        ]
    },
    {
        slug: `player-trap`,
        category: `redstone`,
        priority: 3,
        aliases: [
            `pvp trap`,
            `tnt trap`,
            `prank machine`,
            `prank`
        ]
    },
    {
        slug: `power-generation`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `windmill generator`,
            `water wheel`,
            `steam engine`,
            `kinetic power`
        ]
    },
    {
        slug: `processing-line`,
        category: `redstone`,
        priority: 1,
        aliases: [
            `production line`,
            `create factory`,
            `processing plant`
        ]
    },
    {
        slug: `rail-duper`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `redstone-clock`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `redstone-computer`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `cpu`,
            `calculator`,
            `alu`,
            `redstone display`
        ]
    },
    {
        slug: `sand-duper`,
        category: `redstone`,
        priority: 3,
        aliases: [
            `gravity block duper`,
            `gravity block factory`
        ]
    },
    {
        slug: `shulker-loader`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `shulker box loader`,
            `shulker unloader`
        ]
    },
    {
        slug: `storage-system`,
        category: `redstone`,
        priority: 1,
        aliases: [
            `storage room`,
            `bulk storage`,
            `warehouse system`
        ]
    },
    {
        slug: `string-duper`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `super-smelter`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `furnace bank`,
            `smelter array`,
            `furnace array`
        ]
    },
    {
        slug: `timer`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `tnt-cannon`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `tnt-duper`,
        category: `redstone`,
        priority: 2
    },
    {
        slug: `trash-can`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `tunnel-bore`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `tunnel borer`,
            `mining machine`,
            `perimeter machine`,
            `trencher`
        ]
    },
    {
        slug: `wither-killer`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `world-eater`,
        category: `redstone`,
        priority: 2,
        aliases: [
            `terrain eater`,
            `tnt world eater`
        ]
    },
    {
        slug: `other-building`,
        category: `building`,
        priority: 3
    },
    {
        slug: `other-farm`,
        category: `farm`,
        priority: 3
    },
    {
        slug: `other-redstone`,
        category: `redstone`,
        priority: 3
    },
    {
        slug: `other-decoration`,
        category: `decoration`,
        priority: 3
    },
    {
        slug: `other-landscape`,
        category: `landscape`,
        priority: 3
    }
];
const se = [
    {
        slug: `early-game`
    },
    {
        slug: `skyblock`
    },
    {
        slug: `cubecraft-skyblock`
    },
    {
        slug: `hypixel-skyblock`
    },
    {
        slug: `donutsmp`
    },
    {
        slug: `tileable`
    },
    {
        slug: `uses-dupers`
    },
    {
        slug: `playerless`
    },
    {
        slug: `multi-dimension`
    }
];
const h = (e)=>e.map((e)=>e.slug);
const g = h(re);
const ce = h(m);
h(ie);
h(oe);
const _ = h(ae);
export const U = h(se);
const le = n(g);
const subtype = n(ce);
const style = n(_);
const tag = n(U);
const ue = m;
new Map(ue.map((e)=>[
        e.slug,
        e
    ]));
function de(e) {
    return ue.filter((t)=>t.category === e);
}
function fe(e) {
    return [
        e.slug.replace(/-/g, ` `),
        ...e.aliases ?? []
    ];
}
const me = n([
    `processing`,
    `ready`,
    `failed`
]);
const imageStatus = n([
    `pending`,
    `ready`,
    `failed`
]);
const visibility = n([
    `private`,
    `unlisted`,
    `public`
]);
const category = le;
const ge = g;
const edition = n([
    `java`,
    `bedrock`
]);
const E = d({
    supported: a(),
    min: p_1().nullable(),
    max: p_1().nullable()
});
const compatibility = d({
    java: E.nullable(),
    bedrock: E.nullable()
});
const O = d({
    edition,
    name: p_1()
});
d({
    java: r(O),
    bedrock: r(O)
});
d({
    url: p_1(),
    codecVersion: u()
});
const Se = 32 * 1024 * 1024;
export function F(e) {
    return e.trim().split(/\s+/).filter(Boolean).length;
}
const Ce = [
    `mainFile`,
    `category`,
    `description`,
    `publicName`
];
function we(e, t) {
    let n = [];
    if (e.publishedAt === null) {
        if (e.primaryFileId === null) {
            n.push(`mainFile`);
        }
        if (e.category === null) {
            n.push(`category`);
        }
        if ((e.description ? F(e.description) : 0) < 20) {
            n.push(`description`);
        }
    }
    if (!t.publicNameChosen) {
        n.push(`publicName`);
    }
    return n;
}
const j = p_1().trim().max(600);
function Te(e, t) {
    if (t.member) {
        if (t.publicNameChosen) {
            if (e.primaryFileId === null) {
                return `mainFile`;
            }
            return null;
        }
        return `publicName`;
    }
    return `signIn`;
}
d({
    size: u().int().positive(),
    fileName: p_1().min(1).max(255).optional()
});
d({
    uploadId: p_1(),
    uploadUrl: p_1(),
    expiresAt: p_1().optional()
});
d({
    uploadId: p_1(),
    fileId: p_1()
});
d({
    title: p_1().min(1).max(120),
    description: P.optional(),
    visibility: visibility.optional(),
    upload: upload.optional(),
    name: M.optional()
});
d({
    error: c(`duplicate`),
    message: p_1(),
    existing: d({
        id: p_1(),
        slug: p_1(),
        url: p_1()
    })
});
d({
    name: M
});
d({
    title: p_1().min(1).max(120),
    summary: p_1().max(400).nullable(),
    description: P.nullable(),
    visibility,
    subtype: subtype.nullable(),
    style: style.nullable(),
    tags: r(tag).max(6),
    category: category.nullable(),
    compatibility,
    youtubeVideoId: p_1().regex(S).nullable(),
    translationsEnabled: a()
}).partial();
d({
    id: p_1(),
    slug: p_1(),
    url: p_1(),
    fileId: p_1().nullable()
});
d({
    name: M,
    makePrimary: a().optional(),
    upload,
    contentHash: p_1().length(64).optional()
});
o(`field`, [
    d({
        field: c(`classification`),
        hint: j.optional()
    }),
    d({
        field: c(`description`),
        category: category.nullable().optional(),
        subtype: subtype.nullable().optional(),
        hint: j.optional()
    }),
    d({
        field: c(`summary`),
        description: p_1().trim().min(1).max(10000),
        category: category.nullable().optional(),
        subtype: subtype.nullable().optional()
    })
]);
o(`field`, [
    d({
        field: c(`classification`),
        category,
        subtype,
        confidence: n([
            `high`,
            `medium`,
            `low`
        ])
    }),
    d({
        field: c(`description`),
        description: p_1()
    }),
    d({
        field: c(`summary`),
        summary: p_1()
    })
]);
d({
    liked: a(),
    likeCount: u()
});
d({
    bookmarked: a(),
    bookmarkCount: u()
});
d({
    likeCount: u(),
    viewCount: u(),
    downloadCount: u(),
    commentCount: u()
});
const Ee = d({
    id: p_1(),
    name: p_1(),
    count: u()
});
const De = d({
    id: p_1(),
    slug: p_1(),
    updatedAt: p_1()
});
d({
    total: u(),
    items: r(De)
});
export const w = n([
    `trending`,
    `recent`,
    `likes`,
    `downloads`,
    `views`
]);
export const C = n([
    `s`,
    `m`,
    `l`,
    `xl`,
    `xxl`
]);
const I_options = C.options;
const ke = [
    `en`,
    `fr`,
    `ru`,
    `es`,
    `pt`,
    `zh`,
    `de`
];
d({
    q: p_1().trim().max(120).optional(),
    category: category.optional(),
    subtype: subtype.optional(),
    style: style.optional(),
    tag: tag.optional(),
    edition: edition.optional(),
    version: p_1().optional(),
    mods: n([
        `vanilla`
    ]).optional(),
    size: C.optional(),
    locale: p_1().max(10).optional(),
    sort: w.default(`trending`),
    page: t().int().min(1).default(1)
});
const Ae = d({
    edition,
    resolved: p_1().nullable()
});
const L = d({
    id: p_1(),
    slug: p_1(),
    title: p_1(),
    authorName: p_1(),
    authorHandle: p_1(),
    authorIsGuest: a(),
    authorBadge: p,
    imageUrl: p_1().nullable(),
    category: category.nullable(),
    subtype: subtype.nullable(),
    style: style.nullable(),
    tags: r(tag),
    sizeTier: C.nullable(),
    hasMods: a(),
    likeCount: u(),
    viewCount: u(),
    downloadCount: u()
});
const je = d({
    subtype,
    count: u()
});
const Me = d({
    style,
    count: u()
});
const Ne = d({
    edition,
    version: p_1(),
    count: u()
});
const Pe = d({
    tag,
    count: u()
});
d({
    items: r(L),
    subtypeFacets: r(je),
    styleFacets: r(Me),
    tagFacets: r(Pe),
    versionFacets: r(Ne),
    total: u(),
    page: u(),
    pageSize: u(),
    totalPages: u()
});
const Fe = d({
    id: p_1(),
    name: p_1(),
    isPrimary: a(),
    createdAt: p_1(),
    downloadCount: u(),
    dimensions: d({
        x: u(),
        y: u(),
        z: u()
    }).nullable(),
    blockCount: u().nullable(),
    paletteSize: u().nullable(),
    sizeTier: C.nullable(),
    sourceVersion: Ae.nullable(),
    sourceFormat: p_1().nullable(),
    namespaces: r(d({
        namespace: p_1(),
        count: u()
    })),
    mods: r(p_1()),
    hasMods: a(),
    previewImageUrl: p_1(),
    images: r(d({
        name: p_1(),
        label: p_1(),
        url: p_1()
    }))
});
const Ie = d({
    fileId: p_1(),
    imageUrl: p_1()
});
d({
    materials: r(Ee)
});
d({
    files: r(d({
        id: p_1(),
        name: p_1(),
        isPrimary: a(),
        createdAt: p_1(),
        status: me,
        imageStatus,
        error: p_1().nullable(),
        previewImageUrl: p_1().nullable()
    }))
}).extend({
    fileId: p_1()
});
d({
    ids: r(p_1()).min(1).max(200)
});
const R = d({
    id: p_1(),
    handle: p_1(),
    name: p_1(),
    badge: p
});
const z = d({
    id: p_1(),
    slug: p_1(),
    title: p_1()
});
const Le = d({
    users: r(R),
    schematics: r(z)
});
d({
    users: r(p_1().max(20)).max(50).default([]),
    handles: r(p_1().max(20)).max(50).default([]),
    schematics: r(p_1().max(20)).max(50).default([])
});
d({
    users: r(R),
    handles: r(R),
    schematics: r(z)
});
const B = d({
    relation: n([
        `identical`,
        `matches`,
        `contains`,
        `part_of`
    ]),
    id: p_1(),
    slug: p_1(),
    title: p_1(),
    ownerName: p_1().nullable(),
    ownerBadge: p,
    imageUrl: p_1().nullable(),
    publishedAt: p_1().nullable()
});
const V = d({
    hashes: r(u().int().nonnegative().max(2 ** 52)).max(55000),
    features: u().int().nonnegative().max(2 ** 31)
});
d({
    version: u().int().positive(),
    contentHash: p_1().regex(/^[0-9a-f]{64}$/),
    shape: V,
    material: V
});
d({
    matches: r(B)
});
d({
    id: p_1(),
    slug: p_1(),
    title: p_1(),
    description: p_1().nullable(),
    summary: p_1().nullable(),
    category: category.nullable(),
    subtype: subtype.nullable(),
    style: style.nullable(),
    tags: r(tag),
    compatibility,
    visibility,
    owner: d({
        handle: p_1(),
        name: p_1(),
        isGuest: a(),
        badge: p
    }),
    createdAt: p_1(),
    updatedAt: p_1(),
    publishedAt: p_1().nullable(),
    likeCount: u(),
    bookmarkCount: u(),
    viewCount: u(),
    downloadCount: u(),
    commentCount: u().default(0),
    youtubeVideoId: p_1().nullable().default(null),
    translationsEnabled: a().default(true),
    translation: d({
        sourceLocale: p_1(),
        createdAt: p_1(),
        original: d({
            title: p_1(),
            summary: p_1().nullable(),
            description: p_1().nullable()
        })
    }).nullable().default(null),
    relatedWorks: r(B).default([]),
    references: Le.default({
        users: [],
        schematics: []
    }),
    cover: Ie.nullable(),
    primaryFileId: p_1().nullable(),
    files: r(Fe)
});
export const b = [
    `youtube`,
    `x`,
    `discord`,
    `twitch`,
    `tiktok`,
    `instagram`,
    `github`,
    `website`
];
const socials = d(Object.fromEntries(b.map((e)=>[
        e,
        p_1().url().max(300).optional()
    ])));
const profile = d({
    name: p_1().nullable(),
    givenName: p_1().nullable(),
    familyName: p_1().nullable(),
    avatarUrl: p_1().nullable(),
    locale: p_1().nullable()
});
export const v = /^[a-z0-9][a-z0-9-]{1,18}[a-z0-9]$/;
const handle = p_1().regex(v, `3-20 chars: a-z, 0-9, hyphens (not at the edges)`);
d({
    available: a(),
    reason: n([
        `invalid`,
        `reserved`,
        `taken`
    ]).optional()
});
const Be = n([
    `admin`,
    `moderator`
]);
const user = d({
    id: p_1(),
    email: p_1().nullable(),
    emailVerified: a(),
    isGuest: a(),
    hasBilling: a(),
    capabilities: r(f),
    plans: r(p_1()),
    handle: p_1(),
    displayName: p_1(),
    identityClaimed: a(),
    socials,
    editions: r(edition),
    assistantCreditsMicro: u(),
    roles: r(Be),
    profile
});
d({
    displayName: p_1().trim().min(1).max(40).optional(),
    socials: socials.optional(),
    editions: r(edition).max(2).optional()
});
d({
    handle,
    displayName: p_1().trim().min(1).max(40).optional(),
    editions: r(edition).max(2).optional()
});
d({
    user
});
d({
    provider: p_1().nullable()
});
const email = p_1().trim().toLowerCase().pipe(s().max(254));
d({
    email,
    locale: n(ke)
});
d({
    error: c(`rate_limited`),
    retryAfterSeconds: u().int().positive()
});
d({
    email,
    code: p_1().trim().regex(/^\d{6}$/)
});
d({
    needsIdentity: a()
});
d({
    expiresAt: p_1(),
    extended: a()
});
d({
    user,
    expiresAt: p_1()
});
const stats = d({
    builds: u(),
    downloads: u(),
    likes: u()
});
d({
    handle: p_1(),
    displayName: p_1(),
    badge: p,
    joinedAt: p_1(),
    followerCount: u(),
    followingCount: u(),
    socials,
    stats
});
const schematics = p_1().optional().transform((e)=>{
    if (e) {
        return [
            ...new Set(e.split(`,`).map((e)=>e.trim()).filter(Boolean))
        ];
    }
    return [];
});
d({
    schematics,
    users: schematics.transform((e)=>[
            ...new Set(e.map((e)=>e.toLowerCase()))
        ])
}).refine((e)=>e.schematics.length + e.users.length <= 100, {
    message: `At most 100 ids per lookup`
});
d({
    liked: r(p_1()),
    bookmarked: r(p_1()),
    following: r(p_1())
});
d({
    following: a(),
    followerCount: u()
});
export const y = n([
    `builds`,
    `drafts`,
    `saved`,
    `liked`
]);
const Ue = y.exclude([
    `builds`
]);
const We = (e)=>Ue.safeParse(e).success;
d({
    tab: y.default(`builds`),
    page: t().int().min(1).default(1)
});
d({
    items: r(L.extend({
        visibility: n([
            `private`,
            `unlisted`,
            `public`
        ]),
        isPublished: a()
    })),
    total: u(),
    page: u(),
    pageSize: u(),
    totalPages: u()
});
d({
    clientName: p_1().trim().min(1).max(60),
    hostname: p_1().trim().max(60).optional()
});
d({
    deviceCode: p_1(),
    userCode: p_1(),
    confirmationCode: p_1(),
    verificationUrl: p_1(),
    expiresAt: p_1(),
    pollIntervalMs: u()
});
d({
    confirmationCode: p_1(),
    clientName: p_1(),
    hostname: p_1().nullable(),
    requestedAt: p_1(),
    expiresAt: p_1()
});
d({
    userCode: p_1().min(1).max(120)
});
d({
    deviceCode: p_1().min(1).max(120)
});
d({
    token: p_1(),
    expiresAt: p_1(),
    user
});
n([
    `authorization_pending`,
    `slow_down`,
    `expired_token`
]);
const Ge = p_1().trim().min(1).max(2000);
const Ke = d({
    handle: p_1(),
    name: p_1(),
    badge: p
});
const qe = d({
    id: p_1(),
    body: p_1(),
    author: Ke.nullable(),
    isCreator: a(),
    deleted: a(),
    createdAt: p_1()
});
const Je = qe;
d({
    items: r(qe.extend({
        replyCount: u(),
        replies: r(Je)
    })),
    total: u(),
    page: u(),
    pageSize: u(),
    totalPages: u()
});
d({
    items: r(Je),
    total: u(),
    page: u(),
    pageSize: u(),
    totalPages: u()
});
d({
    body: Ge,
    parentId: p_1().optional()
});
const Ye = n([
    `comment_on_work`,
    `reply_to_comment`,
    `mention_user`,
    `mention_work`,
    `new_follower`,
    `milestone`
]);
const Xe = d({
    handle: p_1(),
    name: p_1(),
    badge: p
});
const Ze = d({
    id: p_1(),
    slug: p_1(),
    title: p_1(),
    imageUrl: p_1().nullable()
});
d({
    items: r(d({
        id: p_1(),
        kind: Ye,
        actor: Xe.nullable(),
        work: Ze.nullable(),
        commentId: p_1().nullable(),
        milestone: d({
            threshold: u()
        }).nullable(),
        seen: a(),
        read: a(),
        createdAt: p_1()
    })),
    unseenCount: u(),
    total: u(),
    page: u(),
    pageSize: u(),
    totalPages: u()
});
d({
    unseenCount: u(),
    latestAt: p_1().nullable()
});
d({
    ids: r(p_1()).max(100).optional()
});
d({
    unseenCount: u()
});
const Qe = 4000;
const $e = p_1().trim().min(1).max(Qe);
const surface = n([
    `assistant`,
    `viewer`,
    `schematic_page`,
    `editor`,
    `upload`,
    `convert`,
    `download`,
    `embed`,
    `global`
]);
const tt = o(`kind`, [
    d({
        kind: c(`work`),
        schematicId: p_1().max(64),
        fileId: p_1().max(64).optional()
    }),
    d({
        kind: c(`local`),
        filename: p_1().max(200),
        format: p_1().max(20)
    }),
    d({
        kind: c(`conversation`),
        conversationId: p_1().max(64)
    })
]);
const nt = d({
    appVersion: p_1().max(100).optional(),
    url: p_1().max(2000).optional(),
    locale: p_1().max(20).optional(),
    userAgent: p_1().max(500).optional(),
    viewport: p_1().max(20).optional(),
    posthogSessionId: p_1().max(100).optional(),
    webglRenderer: p_1().max(200).optional()
}).catch({});
d({
    body: $e,
    surface,
    subject: tt.nullable().catch(null).default(null),
    client: nt.optional()
});
d({
    ok: c(true)
});
const st = `[0-9A-Za-z]{12}`;
const ct = new RegExp(String.raw`@\[(${st})\]`, `g`);
const lt = /(?<![A-Za-z0-9._%+/-])@([a-z0-9][a-z0-9-]{1,18}[a-z0-9])(?![a-z0-9-])/g;
const ut = new RegExp(String.raw`/schematics/(${st})(?![0-9A-Za-z])`, `g`);
const dt = /\[\[(?:([a-z0-9_.-]+):)?([a-z0-9_/.-]+)\]\]/g;
function ft(e) {
    let t = [];
    let n = null;
    for (let r of e.split(`
`)){
        let e = /^ {0,3}(`{3,}|~{3,})/.exec(r);
        if (n === null && e) {
            n = e[1];
            continue;
        }
        if (n !== null) {
            if (e && e[1][0] === n[0] && e[1].length >= n.length) {
                n = null;
            }
            continue;
        }
        t.push(r.replace(/(`+)[^`]*\1/g, ` `));
    }
    return t;
}
const J = (e)=>[
        ...new Set(e)
    ].slice(0, 50);
const Y = (e, t, n = 1)=>{
    let r = [];
    for (let i of e.matchAll(t)){
        r.push(i[n]);
    }
    return r;
};
function pt(e) {
    let t = ft(e).join(`
`);
    return {
        users: J(Y(t, ct)),
        handles: J(Y(t, lt)),
        schematics: J(Y(t, ut)),
        blocks: J([
            ...t.matchAll(dt)
        ].map((e)=>`${e[1] ?? `minecraft`}:${e[2]}`))
    };
}
function mt(e) {
    if (e.includes(`:`)) {
        return e;
    }
    return `minecraft:${e}`;
}
const name = n([
    `iso-ne`,
    `iso-nw`,
    `iso-se`,
    `iso-sw`,
    `top`
]);
const gt = [
    {
        name: `iso-ne`,
        label: `3/4 right`,
        az: -45,
        el: 30
    },
    {
        name: `iso-nw`,
        label: `3/4 left`,
        az: 45,
        el: 30
    },
    {
        name: `iso-se`,
        label: `Rear right`,
        az: -135,
        el: 30
    },
    {
        name: `iso-sw`,
        label: `Rear left`,
        az: 135,
        el: 30
    },
    {
        name: `top`,
        label: `Top`,
        az: 0,
        el: 78
    }
];
const _t = 1200;
const vt = d({
    name,
    uploadUrl: p_1().url()
});
d({
    schematicId: p_1(),
    buildUrl: p_1().url(),
    angles: r(vt).min(1),
    width: u().int().positive().default(_t),
    height: u().int().positive().default(750)
});
const yt = [
    `iso_ne`,
    `iso_nw`,
    `iso_se`,
    `iso_sw`,
    `front`,
    `back`,
    `left`,
    `right`,
    `top`
];
const view = n(yt);
const xt = d({
    x: u().int(),
    y: u().int(),
    z: u().int()
});
const St = d({
    view,
    projection: n([
        `perspective`,
        `orthographic`
    ]).optional(),
    focus: d({
        min: xt,
        max: xt
    }).optional(),
    cutawayAbove: u().int().min(0).optional(),
    uploadUrl: p_1().url().optional()
});
d({
    world: p_1(),
    canvas: d({
        width: u().int().positive(),
        height: u().int().positive(),
        depth: u().int().positive()
    }),
    shots: r(St).min(1).max(8),
    composite: d({
        uploadUrl: p_1().url().optional()
    }).optional()
});
o(`kind`, [
    d({
        kind: c(`user_message`),
        turn,
        payload: Z
    }),
    d({
        kind: c(`assistant_message`),
        turn,
        payload: Z
    }),
    d({
        kind: c(`world_edit`),
        turn,
        payload: zt
    }),
    d({
        kind: c(`title`),
        turn,
        payload: Rt
    }),
    d({
        kind: c(`plan`),
        turn,
        payload: Bt
    })
]);
const Vt = n([
    `user_message`,
    `assistant_message`,
    `world_edit`,
    `title`,
    `plan`
]);
d({
    firstSeq: u().int(),
    nextSeq: u().int(),
    updatedAt: p_1()
});
d({
    id: p_1(),
    title: p_1().nullable(),
    titleActor: Lt.nullable(),
    worldSize,
    createdAt: p_1(),
    updatedAt: p_1()
});
d({
    worldSize
});
d({
    items: r(d({
        id: p_1(),
        title: p_1().nullable(),
        updatedAt: p_1()
    })),
    total: u(),
    page: u(),
    pageSize: u(),
    totalPages: u()
});
d({
    events: r(d({
        seq: u().int(),
        turn: u().int(),
        kind: Vt,
        payload: l({})
    })),
    nextAfter: u().int().nullable()
});
d({
    title
});
d({
    size: u().int().positive()
});
d({
    uploadUrl: p_1(),
    imageId: p_1()
});
d({
    balanceMicro: u(),
    unlocked: a()
});
const Ht = n([
    `queued`,
    `running`,
    `finished`,
    `failed`,
    `cancelled`
]);
const Ut = d({
    imageId: p_1().min(1).max(64),
    name: p_1().max(200).optional()
});
d({
    text: p_1().max(20000),
    images: r(Ut).max(4).optional(),
    mode: wt.default(Tt)
});
d({
    id: p_1(),
    conversationId: p_1(),
    turn: u().int(),
    mode: wt,
    status: Ht,
    error: p_1().nullable(),
    costMicro: u().int(),
    calls: u().int(),
    cancelRequested: a(),
    createdAt: p_1(),
    startedAt: p_1().nullable(),
    finishedAt: p_1().nullable()
});
const Wt = n([
    `pending`,
    `ready`,
    `failed`
]);
const Gt = n([
    `survival`,
    `creative`
]);
d({
    mode: Gt.default(`survival`)
});
d({
    planId: p_1(),
    status: Wt,
    downloadUrl: p_1().optional(),
    digest: p_1().optional(),
    totalSteps: u().int().optional(),
    improvisedSteps: u().int().optional(),
    placements: u().int().optional(),
    error: p_1().optional(),
    stepIndex: u().int().optional(),
    newerAvailable: a().optional()
});
d({
    stepIndex: u().int().min(0)
});
d({
    planId: p_1(),
    stepIndex: u().int(),
    updatedAt: p_1()
});
d({
    items: r(d({
        schematicId: p_1(),
        fileId: p_1(),
        planId: p_1(),
        mode: Gt,
        title: p_1(),
        stepIndex: u().int(),
        totalSteps: u().int().nullable(),
        updatedAt: p_1()
    }))
});
const Kt = 60000;
d({
    packs: r(d({
        id: p_1(),
        amountMinor: u().int().positive(),
        currency: p_1(),
        creditsMicro: u().int().positive()
    })),
    available: a()
});
d({
    packId: p_1().min(1).max(64),
    locale: p_1().min(2).max(8),
    returnTo: p_1().max(200).regex(/^\/(?!\/)[\w\-/.]*$/).optional()
});
d({
    url: p_1().url()
});
d({
    locale: p_1().min(2).max(8),
    returnTo: p_1().max(200).regex(/^\/(?!\/)[\w\-/.]*$/).optional()
});
d({
    url: p_1().url()
});
d({
    hasPurchases: a()
});
d({
    available: a(),
    plans: r(d({
        id: p_1(),
        capabilities: r(f),
        perks: r(ne),
        allowances,
        currency: p_1(),
        prices: r(d({
            interval: n([
                `month`,
                `year`
            ]),
            amountMinor: u().int()
        }))
    }))
});
const qt = n([
    `support_nudge`
]);
d({
    planId: p_1(),
    interval: n([
        `month`,
        `year`
    ]),
    locale: p_1(),
    returnTo: p_1().max(200).regex(/^\/(?!\/)[\w\-/.]*$/).optional(),
    from: qt.optional()
});
p_1().regex(/^[a-z0-9]{10}$/);
const version = p_1().regex(/^\d+(\.\d+){1,2}$/);
const settings = d({
    version
});
const state = n([
    `starting`,
    `online`,
    `stopping`,
    `stopped`,
    `failed`
]);
const Zt = n([
    `host`,
    `idle`,
    `cap`,
    `allowance`,
    `capacity`,
    `error`
]);
d({
    schematicId: p_1(),
    fileId: p_1().optional(),
    settings,
    replace: a().optional()
});
const Qt = d({
    at: p_1(),
    reason: n([
        `idle`,
        `cap`,
        `allowance`
    ])
});
d({
    items: r(d({
        id: p_1(),
        state,
        address: p_1(),
        schematicId: p_1(),
        fileId: p_1(),
        buildTitle: p_1(),
        region: p_1(),
        settings,
        createdAt: p_1(),
        onlineAt: p_1().nullable(),
        stoppedAt: p_1().nullable(),
        stopReason: Zt.nullable(),
        playerCount: u().int(),
        msPerTick: u().nullable(),
        nextStop: Qt.nullable()
    }))
});
d({
    includedMinutes: u().int().nonnegative(),
    usedMinutes: u().int().nonnegative(),
    leftMinutes: u().int().nonnegative(),
    resetsAt: p_1()
});
d({
    error: c(`allowance_used`),
    message: p_1(),
    resetsAt: p_1()
});
d({
    error: p_1(),
    message: p_1(),
    previousStopped: c(true).optional()
});
o(`state`, [
    d({
        state: c(`starting`)
    }),
    d({
        state: c(`online`),
        host: p_1(),
        port: u().int().min(1).max(65535)
    }),
    d({
        state: c(`stopped`)
    })
]);
const $ = d({
    x: u().int(),
    y: u().int(),
    z: u().int()
});
d({
    sessionId: p_1(),
    version,
    structureUrl: p_1().url(),
    placeAt: $,
    size: $,
    maxPlayers: u().int().positive(),
    motd: p_1().max(100),
    welcome: p_1().max(300)
});
d({
    ready: a(),
    players: r(p_1()),
    msPerTick: u().nullable()
});
d({
    broadcast: r(p_1().max(200)),
    stop: d({
        message: p_1().max(200)
    }).nullable()
});
const $t = o(`kind`, [
    d({
        kind: c(`builds`),
        count: u().int().positive()
    }),
    d({
        kind: c(`conversations`),
        count: u().int().positive()
    }),
    d({
        kind: c(`credits`),
        micro: u().int().positive()
    }),
    d({
        kind: c(`plan`),
        planId: p_1(),
        source: n([
            `subscription`,
            `purchase`,
            `admin`,
            `promo`
        ]),
        endsAt: p_1().nullable()
    })
]);
d({
    confirm: p_1(),
    forfeits: r($t)
});
n([
    `not_found`,
    `confirm_mismatch`,
    `already_erased`,
    `email_mismatch`,
    `staff_account`,
    `reason_has_email`
]);
d({
    confirm: p_1().max(64)
});
d({
    erased: c(true)
});
export { Se as A, _ as B, xe as D, ve as E, fe as G, subtype as H, Te as I, de as K, ye as L, ge as M, _e as N, k as O, category as P, we as R, I_options as S, edition as T, style as V, tag as W, Qe as _, Ct as a, jt as c, dt as d, lt as f, ot as g, mt as h, Nt as i, Ce as j, be as k, gt as l, pt as m, Kt as n, X as o, ct as p, Ot as r, kt as s, qt as t, yt as u, We as x, pe as z };
