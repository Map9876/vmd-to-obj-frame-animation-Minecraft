import { cn } from "./module-25016_6.js";
export let hG = {
    xs: "h-[var(--control-h-xs)] px-[var(--control-px-xs)] text-[length:var(--control-font-xs)] [&_svg]:h-[var(--control-icon-xs)] [&_svg]:w-[var(--control-icon-xs)] max-md:h-[var(--control-touch-min)]",
    sm: "h-[var(--control-h-sm)] px-[var(--control-px-sm)] text-[length:var(--control-font-sm)] [&_svg]:h-[var(--control-icon-sm)] [&_svg]:w-[var(--control-icon-sm)] max-md:h-[var(--control-touch-min)]",
    md: "h-[var(--control-h-md)] px-[var(--control-px-md)] text-[length:var(--control-font-md)] [&_svg]:h-[var(--control-icon-md)] [&_svg]:w-[var(--control-icon-md)] max-md:h-[var(--control-touch-min)]",
    lg: "h-[var(--control-h-lg)] px-[var(--control-px-lg)] text-[length:var(--control-font-lg)] [&_svg]:h-[var(--control-icon-lg)] [&_svg]:w-[var(--control-icon-lg)]",
    xl: "h-[var(--control-h-xl)] px-[var(--control-px-xl)] text-[length:var(--control-font-xl)] [&_svg]:h-[var(--control-icon-xl)] [&_svg]:w-[var(--control-icon-xl)] max-md:h-[var(--control-h-lg)]"
};
export let sf = {
    xs: "w-[var(--control-h-xs)] !px-0 max-md:w-[var(--control-touch-min)]",
    sm: "w-[var(--control-h-sm)] !px-0 max-md:w-[var(--control-touch-min)]",
    md: "w-[var(--control-h-md)] !px-0 max-md:w-[var(--control-touch-min)]",
    lg: "w-[var(--control-h-lg)] !px-0",
    xl: "w-[var(--control-h-xl)] !px-0 max-md:w-[var(--control-h-lg)]"
};
let s = {
    primary: "bg-brand-primary text-text-on-brand shadow-block-sm hover:bg-brand-primary-light hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    secondary: "bg-bg-card text-text-primary shadow-block-sm hover:bg-bg-inset hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    ghost: "bg-transparent text-text-muted shadow-none hover:bg-bg-card hover:text-text-primary active:translate-x-[2px] active:translate-y-[2px]",
    danger: "bg-error text-text-primary shadow-block-sm hover:bg-error/90 hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    warning: "bg-warning text-text-on-brand shadow-block-sm hover:bg-warning/90 hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    platform: "text-text-primary shadow-block-sm hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
};
let i = {
    wechat: "bg-platform-wechat hover:bg-platform-wechat-hover",
    qq: "bg-platform-qq hover:bg-platform-qq-hover"
};
export function s9(e) {
    if (e === "default" || e === "icon") {
        return "md";
    }
    return e;
}
export function el(e) {
    switch(e){
        case "default":
            return "primary";
        case "outline":
            return "secondary";
        default:
            return e;
    }
}
export function M5({ size, variant, platform = "wechat", iconOnly = false, className }) {
    return cn("relative box-border inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-none border-2 border-border-hard font-body font-semibold leading-none transition-[transform,box-shadow,background-color,color,border-color] duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-text-disabled disabled:shadow-inset disabled:translate-x-0 disabled:translate-y-0 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:text-text-disabled aria-disabled:shadow-inset aria-disabled:translate-x-0 aria-disabled:translate-y-0 [&_svg]:shrink-0", hG[size], s[variant], variant === "platform" && i[platform], iconOnly && sf[size], className);
}
