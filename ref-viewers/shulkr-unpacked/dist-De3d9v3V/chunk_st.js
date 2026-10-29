function F(stateKey, toJava, n) {
    let fromJava = {};
    for (let [e, i] of Object.entries(toJava)){
        fromJava[i] = n ? Number(e) : e;
    }
    return {
        stateKey,
        toJava,
        fromJava
    };
}
export const I = F(`facing_direction`, {
    0: `down`,
    1: `up`,
    2: `south`,
    3: `north`,
    4: `east`,
    5: `west`
}, true);
export const L = F(`direction`, {
    0: `south`,
    1: `west`,
    2: `north`,
    3: `east`
}, true);
export const R = F(`direction`, {
    0: `north`,
    1: `east`,
    2: `south`,
    3: `west`
}, true);
export const at = F(`coral_direction`, {
    0: `west`,
    1: `east`,
    2: `north`,
    3: `south`
}, true);
export const z = F(`minecraft:block_face`, {
    down: `down`,
    up: `up`,
    north: `north`,
    south: `south`,
    west: `west`,
    east: `east`
}, false);
export const B = F(`minecraft:cardinal_direction`, {
    east: `north`,
    west: `south`,
    north: `west`,
    south: `east`
}, false);
const ot = {
    piston: I,
    sticky_piston: I,
    end_rod: I,
    chiseled_bookshelf: L,
    cocoa: L,
    tripwire_hook: L,
    loom: L,
    grindstone: L,
    bee_nest: L,
    beehive: L,
    bell: R,
    decorated_pot: R,
    amethyst_cluster: z,
    large_amethyst_bud: z,
    medium_amethyst_bud: z,
    small_amethyst_bud: z
};
export function st(e) {
    let t = ot[e];
    if (t) {
        return t;
    }
    if (e.endsWith(`_coral_wall_fan`)) {
        return at;
    }
}
