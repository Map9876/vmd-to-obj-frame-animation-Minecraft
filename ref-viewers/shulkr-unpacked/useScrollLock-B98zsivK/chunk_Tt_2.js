const Tt = [
    `left`,
    `right`
];
const Et = [
    `right`,
    `left`
];
const Dt = [
    `top`,
    `bottom`
];
const Ot = [
    `bottom`,
    `top`
];
export function kt(e, t, n) {
    switch(e){
        case `top`:
        case `bottom`:
            if (n) {
                if (t) {
                    return Et;
                }
                return Tt;
            }
            if (t) {
                return Tt;
            }
            return Et;
        case `left`:
        case `right`:
            if (t) {
                return Dt;
            }
            return Ot;
        default:
            return [];
    }
}
