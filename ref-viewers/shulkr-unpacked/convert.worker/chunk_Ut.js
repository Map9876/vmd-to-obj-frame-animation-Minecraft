let Ut = new Map([
    [
        `grass_path`,
        `dirt_path`
    ],
    [
        `grass`,
        `short_grass`
    ],
    [
        `chain`,
        `iron_chain`
    ]
]);
let Wt = new Map([
    [
        `scute`,
        `turtle_scute`
    ]
]);
export function Gt(e, t) {
    if ((e ?? `minecraft`) === `minecraft`) {
        return Ut.get(t);
    }
}
export function Kt(e, t) {
    if ((e ?? `minecraft`) === `minecraft`) {
        return Wt.get(t) ?? Ut.get(t);
    }
}
