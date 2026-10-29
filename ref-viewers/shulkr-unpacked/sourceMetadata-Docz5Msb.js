import { _, w } from "./sourceMetadata-Docz5Msb/chunk_n.js";
import { i as i_1, n as n_1 } from "./dataVersions.generated-BxN2PDux.js";
export function n() {
    return {
        name: null,
        author: null,
        description: null,
        software: null,
        savedAt: null,
        modifiedAt: null,
        declaredMods: [],
        version: null
    };
}
function T(e) {
    if (typeof e == `object` && e && !Array.isArray(e)) {
        return e;
    }
    return {};
}
export function r(e) {
    let t = T(e);
    let n = T(t.Metadata);
    return w({
        name: n.Name,
        author: n.Author,
        description: n.Description,
        software: n.Software,
        savedAt: n.TimeCreated,
        modifiedAt: n.TimeModified,
        edition: `java`,
        versionRaw: t.MinecraftDataVersion
    });
}
export function a(e) {
    return w({
        edition: `java`,
        versionRaw: T(e).DataVersion
    });
}
export function s(e) {
    let t = T(e);
    let n = T(t.Metadata);
    return w({
        name: n.Name,
        author: n.Author,
        description: n.Description,
        software: n.Software,
        savedAt: n.Date,
        edition: `java`,
        versionRaw: t.DataVersion,
        declaredMods: t.RequiredMods ?? n.RequiredMods
    });
}
export function i(e) {
    let t = 0;
    for (let n of e){
        let e = n?.version;
        if (typeof e == `number` && Number.isInteger(e) && e > t) {
            t = e;
        }
    }
    return w({
        edition: `bedrock`,
        versionRaw: t > 0 ? t : undefined
    });
}
export { w as o, _ as t };
