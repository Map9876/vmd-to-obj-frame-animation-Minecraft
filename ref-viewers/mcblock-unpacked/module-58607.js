import { getLocationOrigin, isAbsoluteUrl } from "./module-62296.js";
import { hasBasePath } from "./module-92929.js";
export function isLocalURL(e) {
    if (!isAbsoluteUrl(e)) {
        return true;
    }
    try {
        let t = getLocationOrigin();
        let r = new URL(e, t);
        return r.origin === t && hasBasePath(r.pathname);
    } catch (e) {
        return false;
    }
}
