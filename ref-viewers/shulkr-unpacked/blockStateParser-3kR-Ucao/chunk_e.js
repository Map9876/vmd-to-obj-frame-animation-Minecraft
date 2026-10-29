const e = new Map([
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
const t = new Map([
    [
        `scute`,
        `turtle_scute`
    ]
]);
export function n(t, n) {
    if ((t ?? `minecraft`) === `minecraft`) {
        return e.get(n);
    }
}
export function r(n, r) {
    if ((n ?? `minecraft`) === `minecraft`) {
        return t.get(r) ?? e.get(r);
    }
}
