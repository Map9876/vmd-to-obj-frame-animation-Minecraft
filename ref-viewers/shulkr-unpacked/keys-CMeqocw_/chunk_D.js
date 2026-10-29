export const D = Symbol();
export function O(e, t) {
    if (!e.queryFn && t?.initialPromise) {
        return ()=>t.initialPromise;
    }
    if (!e.queryFn || e.queryFn === D) {
        return ()=>Promise.reject(Error(`Missing queryFn: '${e.queryHash}'`));
    }
    return e.queryFn;
}
