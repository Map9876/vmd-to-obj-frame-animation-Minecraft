import "./module-86897.js";
import { createContext, forwardRef, useContext } from "./module-61426.js";
const l = require(25016);
const n = require(68401);
let OContext = createContext(null);
export function I({ value, onValueChange, size = "md", disabled = false, label, className, children, ...rest }) {
    return <OContext.Provider value={{
        value,
        size,
        disabled,
        onValueChange
    }}><div role="group" aria-label={label} aria-disabled={disabled || undefined} className={l.cn("inline-flex max-w-full items-stretch overflow-x-auto rounded-none border-2 border-border-hard bg-bg-card", className)} data-control-kind="segment-group" data-control-size={size} {...rest}>{children}</div></OContext.Provider>;
}
export let d = forwardRef(({ value, className, children, disabled, onClick, type = "button", ...rest }, ref)=>{
    let u = useContext(OContext);
    if (!u) {
        throw Error("SegmentItem 必须放在 SegmentedControl 内");
    }
    let p = u.value === value;
    let disabled_1 = u.disabled || !!disabled;
    return <button ref={ref} type={type} className={l.cn("box-border inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-none border-0 border-r-2 border-border-hard font-body font-semibold leading-none last:border-r-0 transition-colors duration-fast focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-bg-inset disabled:text-text-disabled", n.hG[u.size], p ? "bg-brand-primary text-text-on-brand" : "bg-transparent text-text-muted hover:bg-bg-inset hover:text-text-primary", className)} disabled={disabled_1} aria-pressed={p} data-control-kind="segment" data-control-size={u.size} data-control-variant={p ? "primary" : "secondary"} data-selected={p ? "true" : "false"} onClick={(e)=>{
        onClick?.(e);
        if (!(e.defaultPrevented || disabled_1)) {
            u.onValueChange(value);
        }
    }} {...rest}>{children}</button>;
});
d.displayName = "SegmentItem";
