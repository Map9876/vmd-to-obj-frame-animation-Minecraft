import "./module-86897.js";
import { forwardRef } from "./module-61426.js";
import _a from "./module-52619.js";
const i = require(64519);
const l = require(68401);
let ButtonLink1 = forwardRef(({ variant = "primary", size = "md", platform = "wechat", loading = false, loadingLabel = "加载中", disabled = false, className, children, onClick, tabIndex, ...rest }, ref)=>{
    let size_1 = l.s9(size);
    let variant_1 = l.el(variant);
    let j = disabled || loading;
    return <_a ref={ref} className={l.M5({
        size: size_1,
        variant: variant_1,
        platform,
        iconOnly: size === "icon",
        className
    })} onClick={(e)=>{
        if (j) {
            return void e.preventDefault();
        }
        onClick?.(e);
    }} tabIndex={j ? -1 : tabIndex} aria-disabled={j || undefined} aria-busy={loading || undefined} data-control-kind="link" data-control-size={size_1} data-control-variant={variant_1} {...rest}><span data-control-content="" className={`inline-flex min-w-0 items-center justify-center gap-2 ${loading ? "invisible" : ""}`} aria-hidden={loading || undefined}>{children}</span>{loading && <span className="absolute inset-0 inline-flex items-center justify-center" aria-hidden="true"><i.A className="animate-spin"/></span>}{loading && <span className="sr-only">{loadingLabel}</span>}</_a>;
});
export { ButtonLink1 as ButtonLink };
ButtonLink1.displayName = "ButtonLink";
