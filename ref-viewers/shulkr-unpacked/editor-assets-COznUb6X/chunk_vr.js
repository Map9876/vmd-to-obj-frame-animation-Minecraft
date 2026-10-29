import { Br } from "./chunk_Mr.js";
const vr = {
    minX: 0,
    maxX: 16,
    minZ: 0,
    maxZ: 16,
    bottomY: 0
};
export const yr = {
    water: `minecraft:block/water_still`,
    lava: `minecraft:block/lava_still`
};
export const br = {
    water: `minecraft:block/water_flow`,
    lava: `minecraft:block/lava_flow`
};
const xr = `minecraft:block/water_overlay`;
export const Sr = (e, t)=>{
    if (t === `still`) {
        return yr[e];
    }
    if (t === `overlay` && e === `water`) {
        return xr;
    }
    return br[e];
};
export const Cr = [
    `north`,
    `south`,
    `east`,
    `west`
];
export const wr = (e)=>yr[e];
const Tr = (level)=>{
    let t = Number(level ?? `0`);
    if (Number.isFinite(t)) {
        return Math.max(0, Math.min(15, t | 0));
    }
    return 0;
};
const Er = new Set([
    `bubble_column`
]);
const Dr = new Set([
    `kelp`,
    `kelp_plant`,
    `seagrass`,
    `tall_seagrass`
]);
export function Or(e, t) {
    if (e === `water`) {
        return {
            type: `water`,
            level: Tr(t.level),
            waterlogged: false
        };
    }
    if (e === `lava`) {
        return {
            type: `lava`,
            level: Tr(t.level),
            waterlogged: false
        };
    }
    if (Er.has(e)) {
        return {
            type: `water`,
            level: 0,
            waterlogged: false
        };
    }
    if (t.waterlogged === `true` || Dr.has(e)) {
        return {
            type: `water`,
            level: 0,
            waterlogged: true
        };
    }
    return null;
}
export function kr(e) {
    if (e >= 8) {
        return 16;
    }
    if (e === 0) {
        return 14.2;
    }
    return (8 - e) / 9 * 16;
}
export function Ar(e) {
    let t = {
        clipY: 0,
        sprite: `still`
    };
    return {
        height: kr(e),
        topFlow: false,
        flowAngle: 0,
        sides: {
            north: {
                ...t
            },
            south: {
                ...t
            },
            east: {
                ...t
            },
            west: {
                ...t
            }
        },
        footprint: {
            ...vr
        }
    };
}
export function jr(e, t) {
    let n = yr[e];
    let r = br[e];
    let i = e === `water` ? {
        tintindex: 0
    } : {};
    let t_height = t.height;
    let elements = [
        {
            from: [
                0,
                0,
                0
            ],
            to: [
                16,
                t_height,
                16
            ],
            faces: {
                down: {
                    texture: n,
                    cullface: `down`,
                    ...i
                },
                up: t.topFlow ? {
                    texture: r,
                    cullface: `up`,
                    rotation: Br(t.flowAngle),
                    ...i
                } : {
                    texture: n,
                    cullface: `up`,
                    ...i
                }
            }
        }
    ];
    for (let cullface of Cr){
        let r = t.sides[cullface];
        if (r.clipY >= t_height) {
            continue;
        }
        let s = {
            texture: Sr(e, r.sprite),
            cullface,
            ...i
        };
        elements.push({
            from: [
                0,
                r.clipY,
                0
            ],
            to: [
                16,
                t_height,
                16
            ],
            faces: {
                [cullface]: s
            }
        });
    }
    return {
        parts: [
            {
                elements,
                x: 0,
                y: 0,
                uvlock: false
            }
        ],
        fullCube: false,
        opaque: false,
        renderLayer: e === `water` ? `translucent` : `opaque`
    };
}
