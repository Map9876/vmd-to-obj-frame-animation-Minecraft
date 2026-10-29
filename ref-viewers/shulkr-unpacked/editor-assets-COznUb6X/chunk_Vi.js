const Vi = [
    `blockModels`,
    `blockStates`,
    `textureMetas`,
    `textures`
];
export function Hi(e, t) {
    for (let n of Vi){
        Object.assign(e[n], t[n]);
    }
    if (t.objModels) {
        e.objModels = Object.assign(e.objModels ?? {}, t.objModels);
    }
}
