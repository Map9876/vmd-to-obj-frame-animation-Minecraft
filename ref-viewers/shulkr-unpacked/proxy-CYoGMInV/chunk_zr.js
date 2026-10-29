export function zr(e) {
    return e.replace(/([A-Z])/g, (e)=>`-${e.toLowerCase()}`);
}
export const Br = `data-` + zr(`framerAppearId`);
export function Vr(e) {
    return e.props[Br];
}
