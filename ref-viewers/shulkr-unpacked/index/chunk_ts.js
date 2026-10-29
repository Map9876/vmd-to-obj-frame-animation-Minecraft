import { T, y } from "../keys-CMeqocw_.js";
function ts(e) {
    return e;
}
export function ns(e, t, n) {
    if (typeof t != `object` || !t) {
        return;
    }
    let r = e.getMutationCache();
    let i = e.getQueryCache();
    let a = n?.defaultOptions?.deserializeData ?? e.getDefaultOptions().hydrate?.deserializeData ?? ts;
    let o = t.mutations || [];
    let s = t.queries || [];
    o.forEach(({ state, ...rest })=>{
        r.build(e, {
            ...e.getDefaultOptions().hydrate?.mutations,
            ...n?.defaultOptions?.mutations,
            ...rest
        }, state);
    });
    s.forEach(({ queryKey, state, queryHash, meta, promise, dehydratedAt, queryType })=>{
        let d = promise ? y(promise) : undefined;
        let f = state.data === undefined ? d?.data : state.data;
        let p = f === undefined ? f : a(f);
        let m = i.get(queryHash);
        let h = m?.state.status === `pending`;
        let g = m?.state.fetchStatus === `fetching`;
        if (m) {
            let e = d && dehydratedAt !== undefined && dehydratedAt > m.state.dataUpdatedAt;
            if (state.dataUpdatedAt > m.state.dataUpdatedAt || e) {
                let { fetchStatus, ...rest } = state;
                m.setState({
                    ...rest,
                    data: p,
                    ...state.status === `pending` && p !== undefined && {
                        status: `success`,
                        dataUpdatedAt: dehydratedAt ?? Date.now(),
                        ...!g && {
                            fetchStatus: `idle`
                        }
                    }
                });
            }
        } else {
            m = i.build(e, {
                ...e.getDefaultOptions().hydrate?.queries,
                ...n?.defaultOptions?.queries,
                queryKey,
                queryHash,
                meta,
                _type: queryType
            }, {
                ...state,
                data: p,
                fetchStatus: `idle`,
                status: state.status === `pending` && p !== undefined ? `success` : state.status,
                ...state.status === `pending` && p !== undefined && {
                    dataUpdatedAt: dehydratedAt ?? Date.now()
                }
            });
        }
        if (promise && !d && !h && !g && (dehydratedAt === undefined || dehydratedAt > m.state.dataUpdatedAt)) {
            m.fetch(undefined, {
                initialPromise: Promise.resolve(promise).then(a)
            }).catch(T);
        }
    });
}
