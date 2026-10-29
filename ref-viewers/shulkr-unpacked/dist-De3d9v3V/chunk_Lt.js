function Lt(e) {
    if (e === undefined) {
        return false;
    }
    return e === 1 || e === `1` || e === `true`;
}
export function Rt(e) {
    if (e.name === `powered_comparator`) {
        return true;
    }
    if (e.name === `unpowered_comparator`) {
        return false;
    }
    return Lt(e.states.output_lit_bit);
}
export function zt(e) {
    if (Lt(e.states.output_subtract_bit)) {
        return `subtract`;
    }
    return `compare`;
}
