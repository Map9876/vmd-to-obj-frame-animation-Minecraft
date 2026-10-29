import "./module-94781.js";
export function disableSmoothScrollDuringRouteTransition(e, t = {}) {
    if (t.onlyHashChange) {
        return void e();
    }
    let document_documentElement = document.documentElement;
    document_documentElement.dataset.scrollBehavior;
    let scrollBehavior = document_documentElement.style.scrollBehavior;
    document_documentElement.style.scrollBehavior = "auto";
    if (!t.dontForceLayout) {
        document_documentElement.getClientRects();
    }
    e();
    document_documentElement.style.scrollBehavior = scrollBehavior;
}
