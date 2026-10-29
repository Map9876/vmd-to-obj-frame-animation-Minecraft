import { jsx } from "./module-86897.js";
import { Fragment as Fragment_1, Suspense, lazy } from "./module-61426.js";
import { BailoutToCSR } from "./module-24437_2.js";
import "./module-36552_2.js";
function s(e) {
    return {
        default: e && "default" in e ? e.default : e
    };
}
let i = {
    loader: ()=>Promise.resolve(s(()=>null)),
    loading: null,
    ssr: true
};
let o = function(e) {
    let t = {
        ...i,
        ...e
    };
    let r = lazy(()=>t.loader().then(s));
    let t_loading = t.loading;
    function LoadableComponent(e) {
        let fallback = t_loading ? jsx(t_loading, {
            isLoading: true,
            pastDelay: true,
            error: null
        }) : null;
        let i = !t.ssr || !!t.loading;
        let c = i ? Suspense : Fragment_1;
        let children = t.ssr ? <>{jsx(r, {
            ...e
        })}</> : <BailoutToCSR reason="next/dynamic">{jsx(r, {
            ...e
        })}</BailoutToCSR>;
        return jsx(c, {
            ...i ? {
                fallback
            } : {},
            children
        });
    }
    LoadableComponent.displayName = "LoadableComponent";
    return LoadableComponent;
};
export { o as default };
