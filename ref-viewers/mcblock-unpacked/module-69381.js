import "./module-86897.js";
import { forwardRef } from "./module-61426.js";
const a = require(25016);
let i = {
    danger: "bg-error text-text-primary",
    brand: "bg-brand-primary text-text-on-brand",
    neutral: "bg-bg-deep text-text-primary"
};
let s = {
    sm: "h-[18px] min-w-[18px] px-1 text-[10px]",
    md: "h-5 min-w-5 px-1.5 text-[11px]"
};
let CountBadge = forwardRef(({ tone = "danger", size = "sm", className, children, ...rest }, ref)=><span ref={ref} className={a.cn("box-border inline-flex items-center justify-center rounded-none border-[1.5px] border-border-hard font-body font-extrabold leading-none shadow-none", i[tone], s[size], className)} tabIndex={-1} data-control-kind="count" data-control-size={size} data-control-variant={tone} {...rest}>{children}</span>);
export { CountBadge as x };
CountBadge.displayName = "CountBadge";
