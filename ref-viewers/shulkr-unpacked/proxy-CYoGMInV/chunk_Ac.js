const Ac = [
    `animate`,
    `circle`,
    `defs`,
    `desc`,
    `ellipse`,
    `g`,
    `image`,
    `line`,
    `filter`,
    `marker`,
    `mask`,
    `metadata`,
    `path`,
    `pattern`,
    `polygon`,
    `polyline`,
    `rect`,
    `stop`,
    `switch`,
    `symbol`,
    `svg`,
    `text`,
    `tspan`,
    `use`,
    `view`
];
export function jc(e) {
    if (typeof e != `string` || e.includes(`-`)) {
        return false;
    }
    return !!(Ac.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
