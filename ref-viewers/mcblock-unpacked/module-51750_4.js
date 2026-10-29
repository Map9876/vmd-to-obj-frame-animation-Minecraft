import "./module-86897.js";
const n = require(64991);
const s = require(25016);
let l = {
    xs: 16,
    sm: 28,
    md: 44,
    lg: 60,
    xl: 80
};
export function y({ size = "md", className, label }) {
    return <span className={s.cn("mcb-loader", className)} data-size={size} style={{
        "--mcb-loader-box": `${l[size]}px`
    }} role="status" aria-label={label ?? "加载中"}><n.A className="mcb-loader-icon"/><span className="sr-only">{label ?? "加载中"}</span></span>;
}
