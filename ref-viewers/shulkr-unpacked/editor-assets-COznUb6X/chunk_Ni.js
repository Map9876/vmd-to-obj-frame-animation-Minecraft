export let Ni = `/editor`;
export function Pi(e) {
    Ni = e.replace(/\/+$/, ``);
}
export function Fi() {
    return Ni;
}
