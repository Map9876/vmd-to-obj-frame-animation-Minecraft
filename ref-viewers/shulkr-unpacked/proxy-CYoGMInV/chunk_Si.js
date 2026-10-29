export const Si = (e, t)=>{
    if (t) {
        if (e === t) {
            return true;
        }
        return Si(e, t.parentElement);
    }
    return false;
};
export const Ci = (e)=>{
    if (e.pointerType === `mouse`) {
        return typeof e.button != `number` || e.button <= 0;
    }
    return e.isPrimary !== false;
};
const wi = new Set([
    `BUTTON`,
    `INPUT`,
    `SELECT`,
    `TEXTAREA`,
    `A`
]);
export function Ti(e) {
    return wi.has(e.tagName) || e.isContentEditable === true;
}
