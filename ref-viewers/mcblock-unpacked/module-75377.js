import { Wx } from "./module-67261.js";
export function DN(e) {
    let t = 0;
    for(let r = 0; r < e.length; r++){
        t += e.charCodeAt(r);
    }
    return (t % 360 + 360) % 360;
}
export function Wb(e) {
    let u;
    return {
        id: e.id,
        name: e.name,
        coverImage: e.coverImage ?? null,
        difficulty: e.difficulty ?? null,
        projectionAuthor: e.projectionAuthor ?? null,
        blockCount: e.blockCount ?? null,
        height: e.height ?? null,
        learnCount: e.learnCount ?? null,
        createdAt: e.createdAt ?? null,
        isFavorited: (u = e.isFavorited) != null && u,
        viewBox: null,
        tintHue: DN(e.id),
        official: Wx(e.tags)
    };
}
export function hR(e) {
    return e.map(Wb);
}
