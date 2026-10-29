import "./module-86897.js";
import { forwardRef } from "./module-61426.js";
const s = require(25016);
let l = {
    neutral: "border-border-hard bg-bg-inset text-text-primary",
    brand: "border-brand-primary bg-brand-primary/15 text-brand-primary",
    success: "border-success bg-success/15 text-success",
    warning: "border-warning bg-warning/15 text-warning",
    danger: "border-error bg-error/15 text-error",
    info: "border-info bg-info/15 text-info",
    expert: "border-difficulty-expert bg-difficulty-expert/15 text-difficulty-expert",
    free: "border-tag-free bg-tag-free/15 text-tag-free",
    featured: "border-tag-featured bg-tag-featured/15 text-tag-featured",
    beginner: "border-tag-beginner bg-tag-beginner/15 text-tag-beginner",
    master: "border-tag-master bg-tag-master/15 text-tag-master",
    category: "border-tag-category bg-tag-category/15 text-tag-category",
    accent: "border-brand-accent bg-brand-accent/15 text-brand-accent"
};
let i = {
    neutral: "border-border-hard bg-bg-inset text-text-primary",
    brand: "border-border-hard bg-brand-primary text-text-on-brand",
    success: "border-border-hard bg-success text-text-on-brand",
    warning: "border-border-hard bg-warning text-text-on-brand",
    danger: "border-border-hard bg-error text-text-primary",
    info: "border-border-hard bg-info text-text-primary",
    expert: "border-border-hard bg-difficulty-expert text-text-primary",
    free: "border-border-hard bg-tag-free text-text-on-brand",
    featured: "border-border-hard bg-tag-featured text-text-on-brand",
    beginner: "border-border-hard bg-tag-beginner text-text-primary",
    master: "border-border-hard bg-tag-master text-text-primary",
    category: "border-border-hard bg-tag-category text-text-on-brand",
    accent: "border-border-hard bg-brand-accent text-text-on-brand"
};
let o = {
    sm: "h-6 px-2 text-xs [&_svg]:h-3 [&_svg]:w-3",
    md: "h-7 px-2.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5"
};
let Badge = forwardRef(({ tone = "neutral", variant = "soft", size = "sm", icon, className, children, ...rest }, ref)=><span ref={ref} className={s.cn("box-border inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-none border-2 font-body font-bold leading-none shadow-none", o[size], variant === "solid" ? i[tone] : l[tone], variant === "solid" && "shadow-block-xs", className)} tabIndex={-1} data-control-kind="badge" data-control-size={size} data-control-variant={variant} {...rest}>{icon}{children}</span>);
export { Badge as E };
Badge.displayName = "Badge";
