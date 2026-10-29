function Vo(e, t) {
    return e.min === t.min && e.max === t.max;
}
export function Ho(e, t) {
    return Vo(e.x, t.x) && Vo(e.y, t.y);
}
