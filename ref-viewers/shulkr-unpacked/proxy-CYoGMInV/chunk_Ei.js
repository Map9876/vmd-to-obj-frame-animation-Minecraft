const Ei = new Set([
    `INPUT`,
    `SELECT`,
    `TEXTAREA`
]);
export function Di(e) {
    return Ei.has(e.tagName) || e.isContentEditable === true;
}
