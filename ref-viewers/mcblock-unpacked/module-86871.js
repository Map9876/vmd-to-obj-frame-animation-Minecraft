export let ACTION_REFRESH = "refresh";
export let ACTION_NAVIGATE = "navigate";
export let ACTION_RESTORE = "restore";
export let ACTION_SERVER_PATCH = "server-patch";
export let ACTION_PREFETCH = "prefetch";
export let ACTION_HMR_REFRESH = "hmr-refresh";
export let ACTION_SERVER_ACTION = "server-action";
export const PrefetchKind = {
    AUTO: "auto",
    FULL: "full",
    TEMPORARY: "temporary"
};
export const PrefetchCacheEntryStatus = {
    fresh: "fresh",
    reusable: "reusable",
    expired: "expired",
    stale: "stale"
};
