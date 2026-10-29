import { fetchServerResponse } from "./module-32753.js";
import { PrefetchCacheEntryStatus, PrefetchKind } from "./module-86871.js";
import { prefetchQueue } from "./module-43933.js";
function i(url, t, r) {
    let e_pathname = url.pathname;
    if (t) {
        e_pathname += url.search;
    }
    if (r) {
        return `${r}%${e_pathname}`;
    }
    return e_pathname;
}
function s(url, kind, r) {
    return i(url, kind === PrefetchKind.FULL, r);
}
export function getOrCreatePrefetchCacheEntry({ url, nextUrl, tree, prefetchCache, kind, allowAliasing = true }) {
    let u = ((url_1, kind_1, nextUrl_1, prefetchCache_1, allowAliasing_1)=>{
        for (let s of (kind_1 === undefined && (kind_1 = PrefetchKind.TEMPORARY), [
            nextUrl_1,
            null
        ])){
            let r = i(url_1, true, s);
            let l = i(url_1, false, s);
            let u = url_1.search ? r : l;
            let c = prefetchCache_1.get(u);
            if (c && allowAliasing_1) {
                if (c.url.pathname === url_1.pathname && c.url.search !== url_1.search) {
                    return {
                        ...c,
                        aliased: true
                    };
                }
                return c;
            }
            let f = prefetchCache_1.get(l);
            if (allowAliasing_1 && url_1.search && kind_1 !== PrefetchKind.FULL && f && !f.key.includes("%")) {
                return {
                    ...f,
                    aliased: true
                };
            }
        }
        if (kind_1 !== PrefetchKind.FULL && allowAliasing_1) {
            for (let t of prefetchCache_1.values()){
                if (t.url.pathname === url_1.pathname && !t.key.includes("%")) {
                    return {
                        ...t,
                        aliased: true
                    };
                }
            }
        }
    })(url, kind, nextUrl, prefetchCache, allowAliasing);
    if (u) {
        u.status = h(u);
        if (u.kind !== PrefetchKind.FULL && kind === PrefetchKind.FULL) {
            u.data.then((e)=>{
                if (!(Array.isArray(e.flightData) && e.flightData.some((e)=>e.isRootRender && e.seedData !== null))) {
                    return c({
                        tree,
                        url,
                        nextUrl,
                        prefetchCache,
                        kind: kind ?? PrefetchKind.TEMPORARY
                    });
                }
            });
        }
        if (kind && u.kind === PrefetchKind.TEMPORARY) {
            u.kind = kind;
        }
        return u;
    }
    return c({
        tree,
        url,
        nextUrl,
        prefetchCache,
        kind: kind || PrefetchKind.TEMPORARY
    });
}
export function createSeededPrefetchCacheEntry({ nextUrl, tree, prefetchCache, url, data, kind }) {
    let u = data.couldBeIntercepted ? s(url, kind, nextUrl) : s(url, kind);
    let c = {
        treeAtTimeOfPrefetch: tree,
        data: Promise.resolve(data),
        kind,
        prefetchTime: Date.now(),
        lastUsedTime: Date.now(),
        staleTime: data.staleTime,
        key: u,
        status: PrefetchCacheEntryStatus.fresh,
        url
    };
    prefetchCache.set(u, c);
    return c;
}
function c({ url, kind, tree, nextUrl, prefetchCache }) {
    let c = s(url, kind);
    let data = prefetchQueue.enqueue(()=>fetchServerResponse(url, {
            flightRouterState: tree,
            nextUrl,
            prefetchKind: kind
        }).then((e)=>{
            let r;
            if (e.couldBeIntercepted) {
                r = (({ url, nextUrl, prefetchCache, existingCacheKey })=>{
                    let o = prefetchCache.get(existingCacheKey);
                    if (!o) {
                        return;
                    }
                    let i = s(url, o.kind, nextUrl);
                    prefetchCache.set(i, {
                        ...o,
                        key: i
                    });
                    prefetchCache.delete(existingCacheKey);
                    return i;
                })({
                    url,
                    existingCacheKey: c,
                    nextUrl,
                    prefetchCache
                });
            }
            if (e.prerendered) {
                let t = prefetchCache.get(r ?? c);
                if (t) {
                    t.kind = PrefetchKind.FULL;
                    if (e.staleTime !== -1) {
                        t.staleTime = e.staleTime;
                    }
                }
            }
            return e;
        }));
    let d = {
        treeAtTimeOfPrefetch: tree,
        data,
        kind,
        prefetchTime: Date.now(),
        lastUsedTime: null,
        staleTime: -1,
        key: c,
        status: PrefetchCacheEntryStatus.fresh,
        url
    };
    prefetchCache.set(c, d);
    return d;
}
export function prunePrefetchCache(e) {
    for (let [t, r] of e){
        if (h(r) === PrefetchCacheEntryStatus.expired) {
            e.delete(t);
        }
    }
}
export let DYNAMIC_STALETIME_MS = 1000 * Number("0");
export let STATIC_STALETIME_MS = 1000 * Number("300");
function h({ kind, prefetchTime, lastUsedTime }) {
    if (Date.now() < (lastUsedTime ?? prefetchTime) + DYNAMIC_STALETIME_MS) {
        if (lastUsedTime) {
            return PrefetchCacheEntryStatus.reusable;
        }
        return PrefetchCacheEntryStatus.fresh;
    }
    if (kind === PrefetchKind.AUTO && Date.now() < prefetchTime + STATIC_STALETIME_MS) {
        return PrefetchCacheEntryStatus.stale;
    }
    if (kind === PrefetchKind.FULL && Date.now() < prefetchTime + STATIC_STALETIME_MS) {
        return PrefetchCacheEntryStatus.reusable;
    }
    return PrefetchCacheEntryStatus.expired;
}
