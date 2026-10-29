import { useContext, useMemo } from "./module-61426.js";
import { AppRouterContext, LayoutRouterContext } from "./module-46752.js";
import { PathParamsContext, PathnameContext, SearchParamsContext } from "./module-3865.js";
import { getSegmentValue } from "./module-26381.js";
import { DEFAULT_SEGMENT_KEY, PAGE_SEGMENT_KEY } from "./module-65360.js";
import { ReadonlyURLSearchParams } from "./module-35439.js";
export { ReadonlyURLSearchParams } from "./module-35439.js";
export { RedirectType } from "./module-35439.js";
export { ServerInsertedHTMLContext } from "./module-72103.js";
export { forbidden } from "./module-35439.js";
export { notFound } from "./module-35439.js";
export { permanentRedirect } from "./module-35439.js";
export { redirect } from "./module-35439.js";
export { unauthorized } from "./module-35439.js";
export { unstable_isUnrecognizedActionError } from "./module-12845.js";
export { unstable_rethrow } from "./module-35439.js";
export { useServerInsertedHTML } from "./module-72103.js";
let f;
export function useSearchParams() {
    let e = useContext(SearchParamsContext);
    return useMemo(()=>{
        if (e) {
            return new ReadonlyURLSearchParams(e);
        }
        return null;
    }, [
        e
    ]);
}
export function usePathname() {
    f?.("usePathname()");
    return useContext(PathnameContext);
}
export function useRouter() {
    let e = useContext(AppRouterContext);
    if (e === null) {
        throw Object.defineProperty(Error("invariant expected app router to be mounted"), "__NEXT_ERROR_CODE", {
            value: "E238",
            enumerable: false,
            configurable: true
        });
    }
    return e;
}
export function useParams() {
    f?.("useParams()");
    return useContext(PathParamsContext);
}
export function useSelectedLayoutSegments(e = "children") {
    f?.("useSelectedLayoutSegments()");
    let t = useContext(LayoutRouterContext);
    if (t) {
        return function e(t, r, n = true, a = []) {
            let o;
            if (n) {
                o = t[1][r];
            } else {
                let e = t[1];
                o = e.children ?? Object.values(e)[0];
            }
            if (!o) {
                return a;
            }
            let u = o[0];
            let c = getSegmentValue(u);
            if (!c || c.startsWith(PAGE_SEGMENT_KEY)) {
                return a;
            }
            a.push(c);
            return e(o, r, false, a);
        }(t.parentTree, e);
    }
    return null;
}
export function useSelectedLayoutSegment(e = "children") {
    f?.("useSelectedLayoutSegment()");
    let t = useSelectedLayoutSegments(e);
    if (!t || t.length === 0) {
        return null;
    }
    let r = e === "children" ? t[0] : t[t.length - 1];
    if (r === DEFAULT_SEGMENT_KEY) {
        return null;
    }
    return r;
}
