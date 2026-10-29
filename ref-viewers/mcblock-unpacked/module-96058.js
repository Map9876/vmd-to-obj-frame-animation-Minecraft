import { addPathPrefix } from "./module-73879.js";
import { normalizePathTrailingSlash } from "./module-71239.js";
export function addBasePath(e, t) {
    return normalizePathTrailingSlash(addPathPrefix(e, ""));
}
