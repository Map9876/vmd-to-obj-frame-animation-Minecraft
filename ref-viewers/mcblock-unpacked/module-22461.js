import { isDynamicRoute } from "./module-55287.js";
import { normalizePathSep } from "./module-78305.js";
export function denormalizePagePath(e) {
    let t = normalizePathSep(e);
    if (t.startsWith("/index/") && !isDynamicRoute(t)) {
        return t.slice(6);
    }
    if (t !== "/index") {
        return t;
    }
    return "/";
}
