import "./module-61426.js";
import { createHrefFromUrl } from "./module-29658.js";
export function handleHardNavError(e) {
    return !!e && !!window.next.__pendingUrl && createHrefFromUrl(new URL(window.location.href)) !== createHrefFromUrl(window.next.__pendingUrl) && (console.error("Error occurred during navigation, falling back to hard navigation", e), window.location.href = window.next.__pendingUrl.toString(), true);
}
export function useNavFailureHandler() {}
