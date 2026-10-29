import "./module-86897.js";
import { forwardRef } from "./module-61426.js";
import { A } from "./module-64519_9.js";
import { M5, el, s9 } from "./module-68401_7.js";
let Button = forwardRef(({ variant = "primary", size = "md", loading = false, loadingLabel = "加载中", platform = "wechat", controlKind = "button", className, children, type = "button", disabled, ...rest }, ref)=>{
    let size_1 = s9(size);
    let variant_1 = el(variant);
    let disabled_1 = !!(disabled || loading);
    return <button ref={ref} type={type} className={M5({
        size: size_1,
        variant: variant_1,
        platform,
        iconOnly: size === "icon",
        className
    })} disabled={disabled_1} aria-busy={loading || undefined} data-control-kind={controlKind} data-control-size={size_1} data-control-variant={variant_1} {...rest}><span data-control-content="" className={`inline-flex min-w-0 items-center justify-center gap-2 ${loading ? "invisible" : ""}`} aria-hidden={loading || undefined}>{children}</span>{loading && <span className="absolute inset-0 inline-flex items-center justify-center" aria-hidden="true"><A className="animate-spin"/></span>}{loading && <span className="sr-only">{loadingLabel}</span>}</button>;
});
export { Button as $ };
Button.displayName = "Button";
