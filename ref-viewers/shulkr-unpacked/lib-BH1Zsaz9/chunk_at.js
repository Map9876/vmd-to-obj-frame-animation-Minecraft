const at = document.createElement(`i`);
export function ot(e) {
    let t = `&` + e + `;`;
    at.innerHTML = t;
    let at_textContent = at.textContent;
    if (at_textContent.charCodeAt(at_textContent.length - 1) === 59 && e !== `semi` || at_textContent === t) {
        return false;
    }
    return at_textContent;
}
