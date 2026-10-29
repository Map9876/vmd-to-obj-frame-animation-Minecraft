import "./module-86897.js";
import { forwardRef } from "./module-61426.js";
import _n from "./module-52619.js";
import { A } from "./module-64519_8.js";
const c = require(68401);
let ButtonLink1 = forwardRef(({ variant = "primary", size = "md", platform = "wechat", loading = false, loadingLabel = "加载中", disabled = false, className, children, onClick, tabIndex, ...rest }, ref)=>{
    let size_1 = c.s9(size);
    let variant_1 = c.el(variant);
    let x = disabled || loading;
    return <_n ref={ref} className={c.M5({
        size: size_1,
        variant: variant_1,
        platform,
        iconOnly: size === "icon",
        className
    })} onClick={(e)=>{
        if (x) {
            return void e.preventDefault();
        }
        onClick?.(e);
    }} tabIndex={x ? -1 : tabIndex} aria-disabled={x || undefined} aria-busy={loading || undefined} data-control-kind="link" data-control-size={size_1} data-control-variant={variant_1} {...rest}><span data-control-content="" className={`inline-flex min-w-0 items-center justify-center gap-2 ${loading ? "invisible" : ""}`} aria-hidden={loading || undefined}>{children}</span>{loading && <span className="absolute inset-0 inline-flex items-center justify-center" aria-hidden="true"><A className="animate-spin"/></span>}{loading && <span className="sr-only">{loadingLabel}</span>}</_n>;
});
export { ButtonLink1 as ButtonLink };
ButtonLink1.displayName = "ButtonLink";
