export let cancelPrefetchTask = ()=>{
    throw Object.defineProperty(Error("Segment Cache experiment is not enabled. This is a bug in Next.js."), "__NEXT_ERROR_CODE", {
        value: "E654",
        enumerable: false,
        configurable: true
    });
};
export let prefetch = cancelPrefetchTask;
export let navigate = cancelPrefetchTask;
export let revalidateEntireCache = cancelPrefetchTask;
export let getCurrentCacheVersion = cancelPrefetchTask;
export let schedulePrefetchTask = cancelPrefetchTask;
export let reschedulePrefetchTask = cancelPrefetchTask;
export let isPrefetchTaskDirty = cancelPrefetchTask;
export let createCacheKey = cancelPrefetchTask;
export const NavigationResultTag = {
    MPA: 0,
    0: "MPA",
    Success: 1,
    1: "Success",
    NoOp: 2,
    2: "NoOp",
    Async: 3,
    3: "Async"
};
export const PrefetchPriority = {
    Intent: 2,
    2: "Intent",
    Default: 1,
    1: "Default",
    Background: 0,
    0: "Background"
};
export const FetchStrategy = {
    LoadingBoundary: 0,
    0: "LoadingBoundary",
    PPR: 1,
    1: "PPR",
    PPRRuntime: 2,
    2: "PPRRuntime",
    Full: 3,
    3: "Full"
};
