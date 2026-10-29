export function x(e, t) {
    return Math.max(t.min, Math.min(e, t.max));
}
export function S(e, t) {
    let n = x(e.top, t);
    if (n >= t.max && !e.isolate) {
        return null;
    }
    return n + 1;
}
export function C(e, t) {
    if (e.isolate) {
        return x(e.top, t);
    }
    return null;
}
export const te = {
    down: `y`,
    up: `y`,
    north: `z`,
    south: `z`,
    west: `x`,
    east: `x`
};
export const ne = {
    down: `up`,
    up: `down`,
    north: `south`,
    south: `north`,
    west: `east`,
    east: `west`
};
export const re = new Set([
    `observer`,
    `piston`,
    `sticky_piston`
]);
