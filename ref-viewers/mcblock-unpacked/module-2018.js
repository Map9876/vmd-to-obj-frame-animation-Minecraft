import { parsePath } from "./module-5240.js";
export function pathHasPrefix(e, t) {
    if (typeof e !== "string") {
        return false;
    }
    let { pathname } = parsePath(e);
    return pathname === t || pathname.startsWith(`${t}/`);
}
