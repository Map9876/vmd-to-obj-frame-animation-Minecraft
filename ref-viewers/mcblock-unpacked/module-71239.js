import { removeTrailingSlash } from "./module-77700.js";
import { parsePath } from "./module-5240.js";
export let normalizePathTrailingSlash = (e)=>{
    if (!e.startsWith("/")) {
        return e;
    }
    let { pathname, query, hash } = parsePath(e);
    return `${removeTrailingSlash(pathname)}${query}${hash}`;
};
