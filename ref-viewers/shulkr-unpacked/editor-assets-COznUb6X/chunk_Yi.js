const Yi = new Set([
    `minecraft:water`,
    `minecraft:lava`
]);
export function Xi(e) {
    let t = [];
    for (let [n, r] of Object.entries(e.blocks)){
        if (!(r.replaceable && !Yi.has(n))) {
            t.push({
                id: n,
                name: n.replace(/^minecraft:/, ``),
                displayName: r.displayName,
                category: r.category,
                defaultState: r.defaultState ?? {}
            });
        }
    }
    t.sort((e, t)=>e.displayName.localeCompare(t.displayName));
    return t;
}
