import { TsN } from "./module-97497.js";
import { Nc } from "./module-91815.js";
TsN({
    dsn: "https://3b18276862ad81bb88c0cfb371b0ba36@o4511281954160640.ingest.us.sentry.io/4511281962287104",
    environment: "production",
    tracesSampleRate: 0.05,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    sendDefaultPii: false,
    enableLogs: true,
    ignoreErrors: [
        "ResizeObserver loop",
        "ResizeObserver loop completed with undelivered notifications",
        "NetworkError",
        "Failed to fetch",
        "Load failed",
        "AbortError",
        "cancelled",
        /Loading chunk \d+ failed/,
        /ChunkLoadError/,
        /^Script error\.?$/
    ],
    beforeSend (e) {
        let t = e.request?.headers?.["User-Agent"] || "";
        if (/bot|crawler|spider|baidu|googlebot|bingbot|yandex|sogou|bytespider/i.test(t)) {
            return null;
        }
        return e;
    }
});
export let onRouterTransitionStart = Nc;
