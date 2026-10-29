function Uo(e, t) {
    return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max);
}
export function Wo(e, t) {
    return Uo(e.x, t.x) && Uo(e.y, t.y);
}
