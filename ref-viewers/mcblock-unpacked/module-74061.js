import { ensureLeadingSlash } from "./module-76196.js";
import { isGroupSegment } from "./module-65360.js";
export function normalizeAppPath(e) {
    return ensureLeadingSlash(e.split("/").reduce((acc, item, index, n)=>{
        if (!item || isGroupSegment(item) || item[0] === "@" || (item === "page" || item === "route") && index === n.length - 1) {
            return acc;
        }
        return `${acc}/${item}`;
    }, ""));
}
export function normalizeRscURL(e) {
    return e.replace(/\.rsc($|\?)/, "$1");
}
