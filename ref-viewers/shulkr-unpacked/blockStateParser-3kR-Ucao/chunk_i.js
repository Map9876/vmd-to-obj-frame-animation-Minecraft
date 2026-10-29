const i = new Set([
    `air`,
    `cave_air`,
    `void_air`
]);
const a = new Set([
    `piston_arm_collision`,
    `sticky_piston_arm_collision`
]);
export function o(e) {
    return i.has(e) || a.has(e);
}
