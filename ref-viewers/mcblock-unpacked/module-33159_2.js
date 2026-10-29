import "./module-86897.js";
import { forwardRef } from "./module-61426.js";
import _a from "./module-52619.js";
import { A } from "./module-64519_5.js";
import { M5, el, s9 } from "./module-68401_4.js";
let ButtonLink1 = forwardRef(({ variant = "primary", size = "md", platform = "wechat", loading = false, loadingLabel = "加载中", disabled = false, className, children, onClick, tabIndex, ...rest }, ref)=>{
    let size_1 = s9(size);
    let variant_1 = el(variant);
    let g = disabled || loading;
    return <_a ref={ref} className={M5({
        size: size_1,
        variant: variant_1,
        platform,
        iconOnly: size === "icon",
        className
    })} onClick={(e)=>{
        if (g) {
            return void e.preventDefault();
        }
        onClick?.(e);
    }} tabIndex={g ? -1 : tabIndex} aria-disabled={g || undefined} aria-busy={loading || undefined} data-control-kind="link" data-control-size={size_1} data-control-variant={variant_1} {...rest}><span data-control-content="" className={`inline-flex min-w-0 items-center justify-center gap-2 ${loading ? "invisible" : ""}`} aria-hidden={loading || undefined}>{children}</span>{loading && <span className="absolute inset-0 inline-flex items-center justify-center" aria-hidden="true"><A className="animate-spin"/></span>}{loading && <span className="sr-only">{loadingLabel}</span>}</_a>;
});
export { ButtonLink1 as ButtonLink };
ButtonLink1.displayName = "ButtonLink";
