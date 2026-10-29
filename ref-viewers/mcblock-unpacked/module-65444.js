import "./module-28140.js";
import { isNextRouterError } from "./module-5829.js";
import { isBailoutToCSRError } from "./module-24553.js";
import { reportGlobalError } from "./module-3463.js";
import s from "./module-88785.js";
import l from "./module-57150.js";
let u = {
    decorateDevError: (e)=>e,
    handleClientError: ()=>{},
    originConsoleError: console.error.bind(console)
};
export function onCaughtError(e, t) {
    let n;
    let i = t.errorBoundary?.constructor;
    if (n = n || i === s.ErrorBoundaryHandler && t.errorBoundary.props.errorComponent === l) {
        return onUncaughtError(e);
    }
    if (!(isBailoutToCSRError(e) || isNextRouterError(e))) {
        u.originConsoleError(e);
    }
}
export function onUncaughtError(e) {
    if (!(isBailoutToCSRError(e) || isNextRouterError(e))) {
        reportGlobalError(e);
    }
}
