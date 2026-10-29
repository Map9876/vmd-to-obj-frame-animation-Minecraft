import { jsx } from "./module-86897.js";
import { Fragment as Fragment_1, Suspense, lazy } from "./module-61426.js";
import { BailoutToCSR } from "./module-24437.js";
import "./module-36552.js";
function d(e) {
    return {
        default: e && "default" in e ? e.default : e
    };
}
let o = {
    loader: ()=>Promise.resolve(d(()=>null)),
    loading: null,
    ssr: true
};
let s = function(e) {
    let t = {
        ...o,
        ...e
    };
    let l = lazy(()=>t.loader().then(d));
    let t_loading = t.loading;
    function LoadableComponent(e) {
        let fallback = t_loading ? jsx(t_loading, {
            isLoading: true,
            pastDelay: true,
            error: null
        }) : null;
        let o = !t.ssr || !!t.loading;
        let u = o ? Suspense : Fragment_1;
        let children = t.ssr ? <>{jsx(l, {
            ...e
        })}</> : <BailoutToCSR reason="next/dynamic">{jsx(l, {
            ...e
        })}</BailoutToCSR>;
        return jsx(u, {
            ...o ? {
                fallback
            } : {},
            children
        });
    }
    LoadableComponent.displayName = "LoadableComponent";
    return LoadableComponent;
};
export { s as default };
