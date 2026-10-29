import { addBasePath } from "./module-96058.js";
export function assignLocation(e, t) {
    if (e.startsWith(".")) {
        let r = t.origin + t.pathname;
        return new URL((r.endsWith("/") ? r : `${r}/`) + e);
    }
    return new URL(addBasePath(e), t.href);
}
