import { KU } from "./module-2257.js";
export function f(e) {
    if (typeof __SENTRY_TRACING__ === "boolean" && !__SENTRY_TRACING__) {
        return false;
    }
    let t = e || KU()?.getOptions();
    return !!t && (t.tracesSampleRate != null || !!t.tracesSampler);
}
