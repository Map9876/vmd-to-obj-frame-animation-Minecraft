import "./module-49417.js";
import "./module-86897.js";
import * as l from "./module-61426.js";
import { formatUrl } from "./module-47670.js";
import { AppRouterContext } from "./module-46752.js";
import { useMergedRef } from "./module-83011.js";
import { isAbsoluteUrl } from "./module-62296.js";
import { addBasePath } from "./module-96058.js";
import "./module-94781.js";
import { IDLE_LINK_STATUS, mountLinkInstance, onNavigationIntent, unmountLinkForCurrentNavigation, unmountPrefetchableInstance } from "./module-63499.js";
import { isLocalURL } from "./module-58607.js";
import { dispatchNavigateAction } from "./module-11807.js";
import "./module-17045.js";
import { FetchStrategy } from "./module-66048.js";
function h(e) {
    if (typeof e === "string") {
        return e;
    }
    return formatUrl(e);
}
function BComponent(e) {
    let t;
    let n;
    let r;
    let o;
    let [optimisticIDLE_LINK_STATUS, setOptimisticIDLE_LINK_STATUS] = l.useOptimistic(IDLE_LINK_STATUS);
    let vRef = l.useRef(null);
    let { href, as, children, prefetch = null, passHref, replace, shallow, scroll, onClick, onMouseEnter, onTouchStart, legacyBehavior = false, onNavigate, ref, unstable_dynamicOnHover, ...rest } = e;
    n = children;
    if (legacyBehavior && (typeof n === "string" || typeof n === "number")) {
        n = <a>{n}</a>;
    }
    let K = l.default.useContext(AppRouterContext);
    let U = prefetch !== false;
    let D = prefetch !== false ? (t = prefetch) === null || t === "auto" ? FetchStrategy.PPR : FetchStrategy.Full : FetchStrategy.PPR;
    let { href: href_1, as: as_1 } = l.default.useMemo(()=>{
        let href_2 = h(href);
        return {
            href: href_2,
            as: as ? h(as) : href_2
        };
    }, [
        href,
        as
    ]);
    if (legacyBehavior) {
        r = l.default.Children.only(n);
    }
    let B = legacyBehavior ? r && typeof r === "object" && r.ref : ref;
    let q = l.default.useCallback((e)=>{
        if (K !== null) {
            vRef.current = mountLinkInstance(e, href_1, K, D, U, setOptimisticIDLE_LINK_STATUS);
        }
        return ()=>{
            if (vRef.current) {
                unmountLinkForCurrentNavigation(vRef.current);
                vRef.current = null;
            }
            unmountPrefetchableInstance(e);
        };
    }, [
        U,
        href_1,
        K,
        D,
        setOptimisticIDLE_LINK_STATUS
    ]);
    let z = {
        ref: useMergedRef(q, B),
        onClick (e) {
            if (!(legacyBehavior || typeof onClick !== "function")) {
                onClick(e);
            }
            if (legacyBehavior && r.props && typeof r.props.onClick === "function") {
                r.props.onClick(e);
            }
            if (K) {
                if (!e.defaultPrevented) {
                    ((e, href_1_1, as_1_1, vRef_1, replace_1, scroll_1, onNavigate_1)=>{
                        let { nodeName } = e.currentTarget;
                        if (!(nodeName.toUpperCase() === "A" && ((e)=>{
                            let t = e.currentTarget.getAttribute("target");
                            return t && t !== "_self" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.nativeEvent && e.nativeEvent.which === 2;
                        })(e) || e.currentTarget.hasAttribute("download"))) {
                            if (!isLocalURL(href_1_1)) {
                                if (replace_1) {
                                    e.preventDefault();
                                    location.replace(href_1_1);
                                }
                                return;
                            }
                            e.preventDefault();
                            if (onNavigate_1) {
                                let e = false;
                                onNavigate_1({
                                    preventDefault: ()=>{
                                        e = true;
                                    }
                                });
                                if (e) {
                                    return;
                                }
                            }
                            l.default.startTransition(()=>{
                                dispatchNavigateAction(as_1_1 || href_1_1, replace_1 ? "replace" : "push", scroll_1 == null || scroll_1, vRef_1.current);
                            });
                        }
                    })(e, href_1, as_1, vRef, replace, scroll, onNavigate);
                }
            }
        },
        onMouseEnter (e) {
            if (!(legacyBehavior || typeof onMouseEnter !== "function")) {
                onMouseEnter(e);
            }
            if (legacyBehavior && r.props && typeof r.props.onMouseEnter === "function") {
                r.props.onMouseEnter(e);
            }
            if (K && U) {
                onNavigationIntent(e.currentTarget, unstable_dynamicOnHover === true);
            }
        },
        onTouchStart: function(e) {
            if (!(legacyBehavior || typeof onTouchStart !== "function")) {
                onTouchStart(e);
            }
            if (legacyBehavior && r.props && typeof r.props.onTouchStart === "function") {
                r.props.onTouchStart(e);
            }
            if (K && U) {
                onNavigationIntent(e.currentTarget, unstable_dynamicOnHover === true);
            }
        }
    };
    if (isAbsoluteUrl(as_1)) {
        z.href = as_1;
    } else if (!(legacyBehavior && !passHref && (r.type !== "a" || "href" in r.props))) {
        z.href = addBasePath(as_1);
    }
    o = legacyBehavior ? l.default.cloneElement(r, z) : <a {...rest} {...z}>{n}</a>;
    return <_Context.Provider value={optimisticIDLE_LINK_STATUS}>{o}</_Context.Provider>;
}
export { BComponent as default };
let _Context = l.createContext(IDLE_LINK_STATUS);
export let useLinkStatus = ()=>l.useContext(_Context);
if ((typeof BComponent === "function" || typeof BComponent === "object" && BComponent !== null) && BComponent.__esModule === undefined) {
    Object.defineProperty(BComponent, "__esModule", {
        value: true
    });
    Object.assign(BComponent, {
        default: BComponent,
        useLinkStatus
    });
}
