import { $ } from "./chunk_dr.js";
const activeTriggerId = $((e)=>e.triggerIdProp ?? e.activeTriggerId);
const open = $((e)=>e.openProp ?? e.open);
const popupId = $((e)=>(e.popupElement?.id ?? e.floatingId) || undefined);
function Kr(e, t) {
    return t !== undefined && open(e) && activeTriggerId(e) === t;
}
function qr(e, t) {
    if (Kr(e, t)) {
        return true;
    }
    return t !== undefined && open(e) && activeTriggerId(e) == null && e.triggerCount === 1;
}
export const Jr = {
    open,
    mounted: $((e)=>e.mounted),
    transitionStatus: $((e)=>e.transitionStatus),
    floatingRootContext: $((e)=>e.floatingRootContext),
    triggerCount: $((e)=>e.triggerCount),
    preventUnmountingOnClose: $((e)=>e.preventUnmountingOnClose),
    payload: $((e)=>e.payload),
    activeTriggerId,
    activeTriggerElement: $((e)=>{
        if (e.mounted) {
            return e.activeTriggerElement;
        }
        return null;
    }),
    popupId,
    isTriggerActive: $((e, t)=>t !== undefined && activeTriggerId(e) === t),
    isOpenedByTrigger: $((e, t)=>Kr(e, t)),
    isMountedByTrigger: $((e, t)=>t !== undefined && activeTriggerId(e) === t && e.mounted),
    triggerProps: $((e, t)=>{
        if (t) {
            return e.activeTriggerProps;
        }
        return e.inactiveTriggerProps;
    }),
    triggerPopupId: $((e, t)=>{
        if (qr(e, t)) {
            return popupId(e);
        }
    }),
    popupProps: $((e)=>e.popupProps),
    popupElement: $((e)=>e.popupElement),
    positionerElement: $((e)=>e.positionerElement)
};
export const Yr = `ArrowUp`;
export const Xr = `ArrowDown`;
export const Zr = `ArrowLeft`;
export const Qr = `ArrowRight`;
export const $r = `Home`;
export const ei = `PageUp`;
export const ti = `PageDown`;
export const ni = new Set([
    Zr,
    Qr
]);
export const ri = new Set([
    Zr,
    Qr,
    $r,
    `End`
]);
export const ii = new Set([
    Yr,
    Xr
]);
export const ai = new Set([
    Yr,
    Xr,
    $r,
    `End`
]);
export const oi = new Set([
    ...ni,
    ...ii
]);
export const si = new Set([
    ...oi,
    $r,
    `End`
]);
export const ci = `Shift`;
export const li = new Set([
    ci,
    `Control`,
    `Alt`,
    `Meta`
]);
