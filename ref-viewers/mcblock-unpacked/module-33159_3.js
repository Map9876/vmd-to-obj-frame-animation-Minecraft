import "./module-86897.js";
import { forwardRef } from "./module-61426.js";
import _o from "./module-52619.js";
import { A } from "./module-64519_6.js";
import { M5, el, s9 } from "./module-68401_5.js";
let ButtonLink1 = forwardRef(({ variant = "primary", size = "md", platform = "wechat", loading = false, loadingLabel = "加载中", disabled = false, className, children, onClick, tabIndex, ...rest }, ref)=>{
    let size_1 = s9(size);
    let variant_1 = el(variant);
    let f = disabled || loading;
    return <_o ref={ref} className={M5({
        size: size_1,
        variant: variant_1,
        platform,
        iconOnly: size === "icon",
        className
    })} onClick={(e)=>{
        if (f) {
            return void e.preventDefault();
        }
        onClick?.(e);
    }} tabIndex={f ? -1 : tabIndex} aria-disabled={f || undefined} aria-busy={loading || undefined} data-control-kind="link" data-control-size={size_1} data-control-variant={variant_1} {...rest}><span data-control-content="" className={`inline-flex min-w-0 items-center justify-center gap-2 ${loading ? "invisible" : ""}`} aria-hidden={loading || undefined}>{children}</span>{loading && <span className="absolute inset-0 inline-flex items-center justify-center" aria-hidden="true"><A className="animate-spin"/></span>}{loading && <span className="sr-only">{loadingLabel}</span>}</_o>;
});
export { ButtonLink1 as ButtonLink };
ButtonLink1.displayName = "ButtonLink";
