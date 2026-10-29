import "./module-86897.js";
import { A } from "./module-64991_8.js";
import { cn } from "./module-25016_7.js";
let o = {
    xs: 16,
    sm: 28,
    md: 44,
    lg: 60,
    xl: 80
};
export function y({ size = "md", className, label }) {
    return <span className={cn("mcb-loader", className)} data-size={size} style={{
        "--mcb-loader-box": `${o[size]}px`
    }} role="status" aria-label={label ?? "加载中"}><A className="mcb-loader-icon"/><span className="sr-only">{label ?? "加载中"}</span></span>;
}
