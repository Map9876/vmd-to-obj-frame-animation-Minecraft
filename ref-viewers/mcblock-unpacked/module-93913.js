import { HTML_LIMITED_BOT_UA_RE } from "./module-14029.js";
export { HTML_LIMITED_BOT_UA_RE } from "./module-14029.js";
let a = /Googlebot(?!-)|Googlebot$/i;
export let HTML_LIMITED_BOT_UA_RE_STRING = HTML_LIMITED_BOT_UA_RE.source;
function i(e) {
    return HTML_LIMITED_BOT_UA_RE.test(e);
}
export function isBot(e) {
    return a.test(e) || i(e);
}
export function getBotType(e) {
    if (a.test(e)) {
        return "dom";
    }
    if (i(e)) {
        return "html";
    }
}
