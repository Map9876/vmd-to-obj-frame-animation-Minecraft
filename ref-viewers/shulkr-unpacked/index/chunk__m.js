import { c, f } from "../keys-CMeqocw_.js";
import { g, m } from "../session-BGIR8kU0.js";
import { E, F as mutationFn, P, T as queryFn } from "../browser-I-D20JeN.js";
const queryKey = [
    `notifications`,
    `summary`
];
const vm = (e)=>[
        `notifications`,
        `list`,
        e
    ];
const refetchInterval = 120000;
const staleTime = 60000;
export function xm() {
    let { data } = m();
    let { data: data_1 } = c({
        queryKey,
        queryFn,
        enabled: data != null,
        staleTime,
        refetchInterval,
        refetchOnWindowFocus: true,
        retry: false
    });
    return data_1 ?? {
        unseenCount: 0,
        latestAt: null
    };
}
export function Sm(e) {
    return c({
        queryKey: vm(e),
        queryFn: ()=>E(e),
        staleTime: 0,
        retry: false
    });
}
function Cm(e, { unseenCount }) {
    e.setQueryData(queryKey, (e)=>{
        if (e) {
            return {
                ...e,
                unseenCount
            };
        }
        return {
            unseenCount,
            latestAt: null
        };
    });
}
export function wm() {
    let e = f();
    return g({
        mutationFn,
        onMutate: ()=>{
            e.setQueryData(queryKey, (e)=>e && {
                    ...e,
                    unseenCount: 0
                });
        },
        onSuccess: (t)=>Cm(e, t)
    });
}
export function Tm() {
    let e = f();
    return g({
        mutationFn: (ids)=>P(ids.length ? {
                ids
            } : {}),
        onMutate: (t)=>{
            e.setQueriesData({
                queryKey: [
                    `notifications`,
                    `list`
                ]
            }, (e)=>e && {
                    ...e,
                    items: e.items.map((e)=>{
                        if (t.length === 0 || t.includes(e.id)) {
                            return {
                                ...e,
                                seen: true,
                                read: true
                            };
                        }
                        return e;
                    })
                });
        },
        onSuccess: (t)=>Cm(e, t)
    });
}
