import { c, f, s } from "../keys-CMeqocw_.js";
import { J, M, k, o } from "../browser-I-D20JeN.js";
import { S } from "./chunk_v.js";
export const C = [
    `session`
];
export function w() {
    return c({
        queryKey: C,
        queryFn: ()=>k(),
        staleTime: 300 * 1000,
        retry: false,
        refetchOnWindowFocus: false
    });
}
export function T() {
    let e = f();
    return S({
        mutationFn: M,
        onSuccess: ()=>{
            e.setQueryData(C, null);
        }
    });
}
export function E() {
    let e = f();
    let t = s();
    return S({
        mutationFn: o,
        onSuccess: async (n)=>{
            e.setQueryData(C, (e)=>e && {
                    ...e,
                    user: n.user
                });
            await t();
        }
    });
}
export function D() {
    let e = f();
    let t = s();
    return S({
        mutationFn: J,
        onSuccess: async (n)=>{
            e.setQueryData(C, (e)=>e && {
                    ...e,
                    user: n.user
                });
            await t();
        }
    });
}
