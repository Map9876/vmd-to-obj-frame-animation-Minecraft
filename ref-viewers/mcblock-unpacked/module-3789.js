import "./module-28140.js";
import { isBailoutToCSRError } from "./module-24553.js";
import o from "./module-42444.js";
import { reportGlobalError } from "./module-3463.js";
let s = new WeakSet;
export function isRecoverableError(e) {
    return s.has(e);
}
export let onRecoverableError = (e)=>{
    let t = o(e) && "cause" in e ? e.cause : e;
    if (!isBailoutToCSRError(t)) {
        reportGlobalError(t);
    }
};
