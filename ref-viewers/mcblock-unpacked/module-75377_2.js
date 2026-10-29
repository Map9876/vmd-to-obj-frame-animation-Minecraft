import { Wx } from "./module-67261_2.js";
export function DN(e) {
    let t = 0;
    for(let a = 0; a < e.length; a++){
        t += e.charCodeAt(a);
    }
    return (t % 360 + 360) % 360;
}
export function Wb(e) {
    let d;
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
        isFavorited: (d = e.isFavorited) != null && d,
        viewBox: null,
        tintHue: DN(e.id),
        official: Wx(e.tags)
    };
}
export function hR(e) {
    return e.map(Wb);
}
